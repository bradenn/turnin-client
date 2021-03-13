<template>
  <div>
    <b-form-row>
      <b-col cols="8">
        <t-card
            title="Assignments Due"
            subtitle="The following assignments are due in the next 2 weeks.">
          <template slot="body">
            <div v-for="assignment in studentAssignments" :key="assignment._id">
              <div class="mb-1">
                <b-card no-body class="pb-0 bg-dark" :class="``" style="border-radius: 4px;">
                  <div class="d-flex justify-content-between my-1 mx-1">
                    <div>
                      <b-icon-check-circle-fill class="mx-2" variant="success"></b-icon-check-circle-fill>
                      <span>{{ assignment.name }}</span>
                    </div>
                    <div class="d-flex justify-content-end mr-0">
                      <div>
                        <span class="text-muted"
                              v-if="!late(assignment.due)">Due in {{ prettyDate(assignment.due) }}</span>
                        <span class="text-warning" v-else>Due {{ prettyDate(assignment.late) }} ago</span>
                      </div>
                      <div class="vf-sep"></div>
                      <div style="width: 8em" class="mr-1">
                        <b-dropdown size="xsm" class="mr-1 w-100" :text="`Attempts`"
                                    v-if="assignment.submissions.length >= 1">
                          <b-dropdown-item v-for="(submission, k) in assignment.submissions" :key="submission._id"
                                           :to="`/submission/${submission._id}`">
                            <b-icon :icon="!!submission.passed?'check-circle-fill':'exclamation-octagon-fill'"
                                    class="mr-1" :variant="!!submission.passed?'success':'danger'"
                                    scale="0.75"></b-icon>
                            Attempt {{ k + 1 }}
                          </b-dropdown-item>
                        </b-dropdown>
                        <b-button size="xsm" class="mr-1 w-100" disabled v-else>No Attempts</b-button>
                      </div>
                      <b-button size="xsm" variant="secondary" :to="`/submit/${assignment._id}`">Submit</b-button>

                    </div>
                  </div>
                </b-card>
              </div>
            </div>
          </template>
        </t-card>
        <t-card
            title="Past Assignments"
            subtitle="The following assignments are due in the next 2 weeks.">
          <template slot="body">
            <div v-for="assignment in studentAssignments" :key="assignment._id">
              <div class="mb-1">
                <b-card no-body class="pb-0 bg-dark" :class="``" style="border-radius: 4px;">
                  <div class="d-flex justify-content-between my-1 mx-1">
                    <div>
                      <b-icon-check-circle-fill class="mx-2" variant="success"></b-icon-check-circle-fill>
                      <span>{{ assignment.name }}</span>
                    </div>
                    <div class="d-flex justify-content-end mr-0" style="text-align: left !important;">
                      <div>
                        <span class="text-muted"
                              v-if="!late(assignment.due)">Due in {{ prettyDate(assignment.due) }}</span>
                        <span class="text-warning" v-else>Due {{ prettyDate(assignment.late) }} ago</span>
                      </div>
                      <div class="v-sep"></div>
                      <div style="width: 8em" class="mr-1">
                        <b-dropdown size="xsm" class="mr-1 w-100" :text="`Attempts`"
                                    v-if="assignment.submissions.length >= 1">
                          <b-dropdown-item v-for="(submission, k) in assignment.submissions" :key="submission._id"
                                           :to="`/submission/${submission._id}`">
                            <b-icon :icon="!!submission.passed?'check-circle-fill':'exclamation-octagon-fill'"
                                    class="mr-1" :variant="!!submission.passed?'success':'danger'"
                                    scale="0.75"></b-icon>
                            Attempt {{ k + 1 }}
                          </b-dropdown-item>
                        </b-dropdown>
                        <b-button size="xsm" class="mr-1 w-100" disabled v-else>No Attempts</b-button>
                      </div>
                      <b-button size="xsm" variant="secondary" :to="`/submit/${assignment._id}`">Submit</b-button>

                    </div>
                  </div>
                </b-card>
              </div>
            </div>
          </template>
        </t-card>
      </b-col>
      <b-col cols="4">
        <t-card
            title="Enrollment"
            :subtitle="`Enroll in a course`">
          <template slot="body">
            <b-form>
              <b-form-group>
                <b-select size="sm">
                  <b-select-option value="ss">sss
                  </b-select-option>
                </b-select>
              </b-form-group>
            </b-form>
          </template>
        </t-card>
      </b-col>
    </b-form-row>
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
            passed,
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
    },
    late: function (date) {
      if (typeof date !== 'object') {
        date = new Date(date);
      }
      let seconds = Math.floor((new Date() - date) / 1000);
      return (1 > seconds)
    },
    prettyDate: function (date) {
      if (typeof date !== 'object') {
        date = new Date(date);
      }

      let seconds = Math.abs(Math.floor((new Date() - date) / 1000));
      let intervalType;

      let interval = Math.floor(seconds / 31536000);
      if (interval >= 1) {
        intervalType = 'year';
      } else {
        interval = Math.floor(seconds / 2592000);
        if (interval >= 1) {
          intervalType = 'month';
        } else {
          interval = Math.floor(seconds / 86400);
          if (interval >= 1) {
            intervalType = 'day';
          } else {
            interval = Math.floor(seconds / 3600);
            if (interval >= 1) {
              intervalType = "hour";
            } else {
              interval = Math.floor(seconds / 60);
              if (interval >= 1) {
                intervalType = "minute";
              } else {
                interval = seconds;
                intervalType = "second";
              }
            }
          }
        }
      }

      if (interval > 1 || interval === 0) {
        intervalType += 's';
      }

      return interval + ' ' + intervalType;
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

.btn-xsm {
  padding: 0 0.75em !important;
  font-size: 14px !important;
  border-radius: 2px !important;
}

.vf-sep {
  width: 1px;
  margin: 0 1em;
  vertical-align: center;
  background-color: var(--border-color);
}

</style>
