<template>
  <div>
    <b-row>
      <b-col cols="12">
        <t-card
            title="Assignments Due"
            subtitle="The following assignments are due in the next 2 weeks.">
          <template slot="table">
            <b-table :items="studentAssignments" sort-by="test.name"
                     :fields="['name', 'submissions', 'due', 'late', 'options']"
                     class="justify-content-between"
                     small show-empty>
              <template #empty>
                No tests specified.
              </template>
              <template #cell(name)="data">
                <b-icon-patch-check-fll variant="success" class="mr-2"></b-icon-patch-check-fll>
                {{ data.item.name }}
              </template>
              <!--            <template #cell(breif)="data">
                            {{ data.item.brief }}
                          </template>-->
              <template #cell(submissions)="data">
                <span v-if="data.item.submissions.length <= 0">No Submissions</span>
                <b-dropdown text="View More" size="sm" data-boundary="viewport" variant="secondary" v-else>
                  <b-dropdown-item v-for="(submission, index) in data.item.submissions" :key="submission._id"
                                   :href="`/submission/${submission._id}`">
                    <b-icon-patch-check-fll variant="success" class="mr-2"
                                            v-if="submission.passed"></b-icon-patch-check-fll>
                    <b-icon-patch-exclamation-fll variant="danger" class="mr-2" v-else></b-icon-patch-exclamation-fll>
                    Submission {{ index + 1 }}
                  </b-dropdown-item>
                </b-dropdown>
              </template>
              <template #cell(name)="data">
                <b-icon-patch-check-fll variant="success" class="mr-2"
                                        v-if="data.item.passed"></b-icon-patch-check-fll>
                <b-icon-patch-exclamation-fll variant="danger" class="mr-2" v-else></b-icon-patch-exclamation-fll>
                {{ data.item.name }}
              </template>
              <template #cell(options)="data">
                <b-link :to="`/submit/${data.item._id}`">Submit</b-link>
              </template>
            </b-table>
          </template>
        </t-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>

import gql from 'graphql-tag'
import TCard from "@/components/tCard";


const GET_ASSIGNMENTS =
    gql`query studentAssignments {
        studentAssignments {
            name,
            due,
            late,
            brief {
                _id
            },
            submissions {
            created,
                _id
            },
            _id
        }
        }`;

export default {
  name: 'Overview',
  components: {TCard},
  data() {
    return {
      error: "",
      studentAssignments: []
    }
  },
  props: {},
  apollo: {
    studentAssignments: {
      query: GET_ASSIGNMENTS,
      loadingKey: 'loading',
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-first",
      variables() {
        return {}
      }
    },
  },
  methods: {
    parseDate: (date) => {
      return new Date(parseInt(date)).toLocaleString()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

.table-responsive {
  overflow: visible !important;
}

table {
  border-radius: var(--border-radius);
}

.table-responsive td {
  overflow-x: visible;
}

</style>
