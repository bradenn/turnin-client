<template>
  <div>
    <b-row>

      <b-col cols="8">
        {{ error }}
        <div class="py-3 d-flex justify-content-between align-items-end">
          <div>
            <h4 class="mb-1">Assignments Due</h4>
            <span class="mt-0 text-muted">The following assignments are due in the next 2 weeks.</span>
          </div>
          <div>
          </div>
        </div>
      </b-col>
      <b-col cols="12">
        <div class="table-responsive mb-0">
          <b-table :items="studentAssignments" sort-by="test.name"
                   :fields="['name', 'brief', 'submissions', 'due', 'late', 'options']"
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
              <b-dropdown text="Submissions" size="sm" data-boundary="viewport" variant="primary">
                <b-dropdown-item v-for="(submission, index) in data.item.assignmentSubmissions" :key="submission._id"
                                 :href="`/submission/${submission._id}`">
                  <b-icon-patch-check-fll variant="success" class="mr-2"
                                          v-if="submission.submissionPassedTests"></b-icon-patch-check-fll>
                  <b-icon-patch-exclamation-fll variant="danger" class="mr-2" v-else></b-icon-patch-exclamation-fll>
                  Submission {{ index + 1 }}
                </b-dropdown-item>
              </b-dropdown>
            </template>
            <template #cell(name)="data">
              <b-icon-patch-check-fll variant="success" class="mr-2"
                                      v-if="data.item.passed"></b-icon-patch-check-fll>
              <b-icon-patch-exclamation-fll variant="danger" class="mr-2" v-else></b-icon-patch-exclamation-fll>
              {{ data.item.test.name }}
            </template>
            <template #cell(options)="data">
              <b-link :to="`/submit/${data.item._id}`">Submit</b-link>
            </template>
          </b-table>
        </div>
      </b-col>
    </b-row>
  </div>
</template>

<script>

import gql from 'graphql-tag'


const GET_ASSIGNMENTS =
    gql`query studentAssignments {
        studentAssignments {
            name,
            due,
            late,
            brief {
                _id
            },
            assignmentSubmissions {
            created,
                _id
            },
            _id
        }
        }`;

export default {
  name: 'Overview',
  components: {},
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
