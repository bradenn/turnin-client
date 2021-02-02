<template>
  <div>
    <b-container class="mt-3">
      <b-form-row style="max-height: 1900px;">

        <b-col cols="8">
          <b-button-toolbar class="mb-2" size="sm">
            <b-button size="sm" @click="back" class="mr-1">
              <b-icon-arrow-left scale="1"></b-icon-arrow-left>
            </b-button>
            <b-button size="sm" @click="back" class="mr-1">
              <b-icon-download scale="1"></b-icon-download>
            </b-button>
          </b-button-toolbar>
        </b-col>
        <b-col cols="8">
          <t-card title="Submission" aspect="8:11" subtitle="The following results to your previous submission">
            <template slot="tagline">
              <div class="d-flex justify-content-end align-items-start">
              </div>

            </template>
            <template slot="button">
              <div class="d-flex align-items-center mr-1">
                <span>
                 <b-icon icon="exclamation-diamond-fill" class="mr-2" variant="info"></b-icon>
                  {{ submission.results.filter(a => a.leak).length }}
                </span>
                <div class="v-sep"></div>
                <span>
                  <b-icon icon="exclamation-triangle-fill" class="mr-2" variant="warning"></b-icon>
                  {{ submission.results.filter(a => a.timeout).length }}
               </span>
                <div class="v-sep"></div>
                <span>
                 <b-icon icon="exclamation-octagon-fill" class="mr-2" variant="danger"></b-icon>
                  {{ submission.results.filter(a => (!a.timeout && !a.passed)).length }}
               </span>
                <div class="v-sep"></div>
                <span>
                 <b-icon icon="check-circle-fill" class="mr-2" variant="success"></b-icon>
                 {{ submission.results.filter(a => (!a.timeout && a.passed)).length }}
               </span>
              </div>
            </template>
            <template slot="body">
              <div v-for="result in submission.results" :key="result._id">
                <div class="mb-1">
                  <b-card no-body class="pb-0" style="border-radius: 4px;">
                    <div class="d-flex justify-content-between my-1 mx-1">
                      <div>
                        <b-icon-patch-check-fll variant="success" class="mx-2"
                                                v-if="!!result.passed"></b-icon-patch-check-fll>
                        <b-icon icon="exclamation-triangle-fill" variant="warning" class="mx-2"
                                v-else-if="result.timeout"></b-icon>
                        <b-icon-patch-exclamation-fll variant="danger" class="mx-2"
                                                      v-else></b-icon-patch-exclamation-fll>
                        {{ result.test.name }}
                      </div>

                      <div class="d-flex justify-content-end">
                        <b-link class="mx-2">View More</b-link>
                      </div>
                    </div>
                  </b-card>
                </div>
              </div>
            </template>
          </t-card>
        </b-col>

        <b-col cols="4">
          <b-aspect aspect="5:11">
            <t-card title="Submission Files" aspect="4:5" subtitle="The following results to your previous submission">
              <template slot="body">
                <div v-for="file in submission.files" :key="file._id" class="file-row">
                  {{ file.name }}
                </div>
              </template>
            </t-card>
            <t-card title="Compilation Details" aspect="4:6" class="mt-2 pt-1 mb-2"
                    subtitle="The following results to your previous submission">

              <template slot="body">
                <div class="d-flex justify-content-between my-3 mb-3">
                  <span class="bold">Elapsed Time</span>
                  <code>{{ submission.duration }}</code>
                </div>
                <hr>
                <div class="d-flex justify-content-between mt-3">
                  <span>Standard Output/Error</span>
                  <code>{{ submission.stdout.length }} lines</code>
                </div>
                <div class="d-flex justify-content-between mt-1 mx-2">
                  <codemirror :value="submission.stdout.join('\n')" class="bg-transparent" :options="options">
                  </codemirror>
                </div>
              </template>
            </t-card>
          </b-aspect>

        </b-col>
      </b-form-row>
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
            files { name, _id },
            results {
            passed,
            timeout,
                test {
                    name,
                    exit
                },
                diffout,
                leak {
                    _id
                },
                differr,
                memory,
                _id,
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
        mode: 'text/x-diff',
        theme: 'one-dark',
        lineNumbers: false,
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
    largest(list) {
      return list.reduce((a, b) => b > a ? b : a)
    },
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

.text-info {
  color: rgb(88, 166, 255) !important;
}

.progress {
  background-color: var(--background);
  border: var(--border);
  border-radius: var(--border-radius);
}

.progress {
  background-color: var(--background);
  border: var(--border);
  border-radius: var(--border-radius);
}

.bg-primary {
  background-color: var(--primary) !important;
}

.v-sep {
  width: 1px;
  margin: 0.25em 1.25em;
  height: 1em;
  vertical-align: center;
  background-color: var(--muted);
  opacity: 0.5;
}

hr {
  margin-top: 0.25em;
  margin-bottom: 0;
}


.file-list li {
  list-style: none;
  margin-left: -1em;
  padding-top: 4px;
}

.file-list ul {
  margin-left: 10px;
  padding-left: 20px;

  border-left: 1px dashed var(--muted);
}

.file-list li:before {
  margin-right: 2px;
  content: "";
  height: 20px;
  vertical-align: middle;
  width: 3px;
  background-repeat: no-repeat;
  display: inline-block;
  color: white;

}

.file-list li.folder:before {
  /* folder icon if folder class is specified */

  background-position: center top;
  background-size: 75% auto;
}

.file-row {
  border-bottom: var(--border);
  padding-left: 1em;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
}

.file-row:last-of-type {
  border-bottom: none;
}

</style>
