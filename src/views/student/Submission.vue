<template>
  <div>
    <b-container>
      <b-row>

        <b-col cols="8">
          {{ error }}
          <div class="py-3 d-flex justify-content-between align-items-end">
            <div>
              <h4 class="mb-1">Submission Results</h4>
              <span class="mt-0 text-muted">The following results to your previous submission</span>
            </div>
            <div>
            </div>
          </div>
        </b-col>

        <b-col cols="8">
          <div class="table-responsive mb-0">
            <b-table :items="submission.submissionResults" sort-by="resultTest.testName"
                     :fields="['testName', 'memoryUsed', 'testElapsedTime', 'options']" class="justify-content-between"
                     small show-empty>
              <template #empty>
                No tests specified.
              </template>
              <template #cell(testName)="data">
                <b-icon-patch-check-fll variant="success" class="mr-2"
                                        v-if="data.item.testPassed"></b-icon-patch-check-fll>
                <b-icon-patch-exclamation-fll variant="danger" class="mr-2" v-else></b-icon-patch-exclamation-fll>
                {{ data.item.resultTest.testName }}
              </template>
              <template #cell(memoryUsed)="data">
                {{ parseSize(data.item.memoryUsed) }}
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
                    <b-col cols="12">

                      <pre v-highlightjs>
                        <code class="shell">
                          {{ row.item.testOutput.join("\n") }}
                        </code>
                      </pre>

                    </b-col>
                    <b-col cols="4">
                      StdErr Diff<br>

                    </b-col>
                    <b-col cols="4">
                      Exit Code<br>
                      <code>{{ row.item.exitCode }}</code><br>
                      Expected Code<br>
                      <code>{{ row.item.resultTest.testExitCode }}</code>
                    </b-col>

                  </b-form-row>

                </b-card>
              </template>
            </b-table>
          </div>
        </b-col>
        <b-col cols="8 mt-3">
          <b-card>
            <span>Compilation Time: {{ submission.submissionCompilationTime }}</span><br>
            <pre v-highlightjs>
                <code class="shell">
                  {{ submission.submissionCompilationOutput.join("\n") || "FUCK" }}
                </code>
            </pre>
            <div>
            </div>
          </b-card>
        </b-col>

      </b-row>
    </b-container>
  </div>
</template>

<script>
import gql from 'graphql-tag'

const UPLOAD_SUBMISSION =
    gql`mutation uploadSubmission($assignmentId: ObjectId!, $submissionUpload: [Upload!]!){
          uploadSubmission(assignmentId: $assignmentId, submissionUpload: $submissionUpload){
            _id
          }
        }`;

const GET_SUBMISSION =
    gql`query submission($submissionId: ObjectId!){
          submission(submissionId: $submissionId){
            _id
            submissionCompilationOutput,
            submissionCompilationTime,
            submissionResults {
                testPassed,
                memoryUsed,
                exitCode,
                testElapsedTime,
                testOutput,
                testError,
                resultTest {
                    testExitCode,
                  testName,
                      _id
                }
            }
          }
        }`;


export default {
  name: 'Submit',
  components: {},
  data() {
    return {
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
    join: function (array) {
      return array.join("/n")
    },
    parseSize: function formatBytes(a, b = 2) {
      if (0 === a) return "0 Bytes";
      const c = 0 > b ? 0 : b, d = Math.floor(Math.log(a) / Math.log(1024));
      return parseFloat((a / Math.pow(1024, d)).toFixed(c)) + " " + ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][d]
    },
    uploadSubmission: function ({target: {files = []}}) {
      this.loading.uploadFiles = true;
      this.$apollo.mutate({
        mutation: UPLOAD_SUBMISSION,
        variables: {
          assignmentId: "6000a25ec2a42f066ff66b63",
          submissionUpload: files
        }
      }).then((res) => {
        this.loading.uploadFiles = false;
        this.$router.push(`/submission/${res.data.uploadSubmission._id}`)
      }).catch(doc => {
        this.error = doc;
        console.log(doc)
        this.loading.uploadFiles = false;
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
