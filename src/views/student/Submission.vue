<template>
  <div>
    <b-container class="mt-3">
      <b-row>

        <b-col cols="8">
          <b-button-toolbar class="mb-2" size="sm">
            <b-button size="sm" @click="back" class="mr-1">
              <b-icon-arrow-left scale="1"></b-icon-arrow-left>
            </b-button>
          </b-button-toolbar>
        </b-col>
        <b-col cols="8">
          <t-card title="Submission Results" subtitle="The following results to your previous submission">
            <template slot="body">
              <b-table :items="submission.results" sort-by="test.name"
                       :fields="['name', 'memory', 'duration', 'options']" class="justify-content-between"
                       small show-empty>
                <template #empty>
                  No tests specified.
                </template>
                <template #cell(name)="data">
                  <b-icon-patch-check-fll variant="success" class="mr-2"
                                          v-if="data.item"></b-icon-patch-check-fll>
                  <b-icon-patch-exclamation-fll variant="danger" class="mr-2" v-else></b-icon-patch-exclamation-fll>
                  {{ data.item.test.name }}
                </template>
                <template #cell(memory)="data">
                  {{ parseSize(data.item.memory) }}
                </template>
                <template #cell(options)="row">
                  <b-link size="sm" class="no-bs" variant="primary" @click="row.toggleDetails">
                    <div>
                      <i class="fas mr-2" :class="row.detailsShowing?'fa-chevron-down':'fa-chevron-left'"></i>&nbsp;More
                      Info
                    </div>
                  </b-link>
                </template>

                <template #row-details="row">
                  <b-card>
                    <b-form-row>
                      <b-col cols="6">
                        <h5>Standard Output</h5>
                        <codemirror v-model="row.item.stdout" :options="options">

                        </codemirror>
                      </b-col>
                      <b-col cols="4">
                        <h5>Standard Error</h5>
                        <code>
                          {{ row.item.stderr.join("\n") || "" }}
                        </code>
                      </b-col>
                      <b-col cols="4">
                        Exit Code<br>
                        <code>{{ row.item.exit }}</code><br>
                        Expected Code<br>
                        <code>{{ row.item.test.exit }}</code>
                      </b-col>

                    </b-form-row>

                  </b-card>
                </template>
              </b-table>
            </template>
          </t-card>
        </b-col>

        <b-col cols="4">
          {{ error }}
          <div class="py-3 d-flex justify-content-between align-items-end">
            <div>
              <h4 class="mb-1">Compilation Details</h4>
              <span class="mt-0 text-muted">The following results to your previous submission</span>
            </div>
            <div>
            </div>
          </div>
          <hr class="mt-1">
          <div class="d-flex justify-content-between">
            <span class="bold">Elapsed Time</span>
            <code>{{ submission.duration }}</code>
          </div>
          <hr>
          <div class="d-flex justify-content-between">
            <span>Standard Output/Error</span>
            <code>{{ submission.stdout.length }} lines</code>
          </div>
          <codemirror :value="submission.stdout.join('\n')" class="bg-transparent" :options="options">

          </codemirror>
          <hr>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import TCard from "@/components/tCard";

const GET_SUBMISSION =
    gql`query submission($submissionId: ObjectId!){
          submission(submissionId: $submissionId){
            _id
            stdout,
            duration,

            results {
                test {
                    name
                },
                memory
                exit,
                duration,
                stdout,
                stderr,

            }
          }
        }`;


export default {
  name: 'Submit',
  components: {TCard},
  data() {
    return {
      options: {
        tabSize: 4,
        mode: 'diff',
        theme: 'one-dark',
        lineNumbers: true,
        line: true,
        readOnly: true
      },
      submission: {
        submissionCompilationOutput: [""], submissionCompilationTime: "", submissionResults: []
      },
      loading: {
        page: false,
        uploadFiles: false,
      },
      error: "",
      show: false
    }
  },
  mounted() {
  },
  apollo: {
    submission: {
      query: GET_SUBMISSION,
      loadingKey: 'loading',
      variables() {
        return {
          submissionId: this.$route.params.submissionId
        }
      }
    },
  },
  methods: {
    back: function () {
      this.$router.back()
    },
    join: function (array) {
      return array.join("/n")
    },
    parseSize: function formatBytes(a, b = 2) {
      if (0 === a) return "0 Bytes";
      const c = 0 > b ? 0 : b, d = Math.floor(Math.log(a) / Math.log(1024));
      return parseFloat((a / Math.pow(1024, d)).toFixed(c)) + " " + ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][d]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
hr {
  margin-top: 2em;
  margin-bottom: 2em;
}
</style>
