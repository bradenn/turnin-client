<template>
  <div>
    <b-container class="mt-3">
      <b-form-row>
        <b-col cols="8">
          <b-button-toolbar class="mb-2" aria-label="Toolbar with button groups and input groups">

            <b-button size="sm" @click="back" class="mr-1">
              <b-icon-arrow-left scale="1"></b-icon-arrow-left>
            </b-button>
            <b-button-group size="sm" class="mr-1">
              <b-button target="_blank">Open Workspace</b-button>
              <b-button>Download Workspace</b-button>
            </b-button-group>
            <b-dropdown center size="sm" text="Options">
              <b-dropdown-item size="sm"><i class="fas fa-question fa-fw mr-2"></i>Get Help</b-dropdown-item>
              <b-dropdown-item size="sm"><i class="fas fa-bong fa-fw mr-2"></i>Request extension</b-dropdown-item>
            </b-dropdown>
          </b-button-toolbar>
        </b-col>
        <b-col cols="8">
          <t-card :title="`Submit ${assignment.name}`"
                  :subtitle="`Required files: ${assignment.specification.requiredFiles.join(', ')}`">
            <template slot="table">
              <b-form-group description="Drag and drop the required files or browse your computer.">
                <b-form-file multiple @change="uploadSubmission" placeholder="No files selected"></b-form-file>
              </b-form-group>
              <div v-if="loading.uploadFiles">
                <b-spinner small variant="primary" class="mr-2 mt-1"></b-spinner>
                <strong>Working on it...</strong>
              </div>
            </template>
          </t-card>
          <t-card :title="`Tests`"
                  :subtitle="`This assignment has ${assignment.specification.tests.length} tests`">
            <template slot="table">
              <b-table :items="assignment.specification.tests" sort-by="name"
                       :fields="['name']" class="justify-content-between"
                       show-empty>
                <template #empty>
                  No tests specified.
                </template>
                <template #cell(name)="row">
                  <div class="d-flex justify-content-between" v-if="row.item.hidden">
                  </div>
                  <div class="d-flex justify-content-between" v-else>
                    <div>{{ row.item.name }}</div>
                    <div class="d-flex justify-content-start">
                      <b-badge class="mr-1" :variant="row.item.testContext.includes('in')?'primary':'light'">IN
                      </b-badge>
                      <b-badge class="mr-1" :variant="row.item.testContext.includes('args')?'primary':'light'">ARGS
                      </b-badge>
                      <b-badge class="mr-1" :variant="row.item.testContext.includes('args')?'primary':'light'">ENV
                      </b-badge>
                      <div class="v-sep"></div>
                      <b-badge class="mr-1" :variant="row.item.testContext.includes('out')?'primary':'light'">OUT
                      </b-badge>
                      <b-badge class="mr-1" :variant="row.item.testContext.includes('err')?'primary':'light'">ERR
                      </b-badge>
                      <b-badge class="mr-1" :variant="row.item.testContext.includes('exit')?'primary':'light'">EXIT
                      </b-badge>
                      <div class="v-sep"></div>
                      <b-badge class="mr-1" :variant="row.item.testContext.includes('timeout')?'primary':'light'">TIME
                      </b-badge>
                      <b-badge class="mr-1" :variant="row.item.testContext.includes('leaks')?'primary':'light'">LEAK
                      </b-badge>
                      <b-badge class="mr-1" :variant="row.item.testContext.includes('hidden')?'primary':'light'">HIDE
                      </b-badge>
                    </div>
                    <b-icon icon="chevron-down" @click="row.toggleDetails"></b-icon>
                  </div>
                  <b-link size="sm" variant="primary">
                  </b-link>
                </template>
              </b-table>
            </template>
          </t-card>
        </b-col>
        <b-col cols="4">
          <t-card :title="`Structure`"
                  :subtitle="`Required files: ${assignment.specification.requiredFiles.join(', ')}`">
            <template slot="table">
              <ul class="file-list">
                <li class="folder">
                  <b-icon-folder></b-icon-folder>&nbsp;root
                  <ul>
                    <li class="folder">
                      <b-link @click="showTests = !showTests">
                        <b-icon-folder></b-icon-folder>&nbsp;tests
                      </b-link>
                      <ul v-if="showTests">
                        <div v-for="test in assignment.specification.tests" :key="test._id">
                          <li v-if="test.stdin">
                            <b-link :to="`/file/${test.stdin._id}`">
                              <b-icon-file-earmark></b-icon-file-earmark>&nbsp;{{ test.stdin.name }}
                            </b-link>
                          </li>
                          <li v-if="test.stdout">
                            <b-icon-file-earmark></b-icon-file-earmark>&nbsp;{{ test.stdout.name }}
                          </li>
                          <li v-if="test.stderr">
                            <b-icon-file-earmark></b-icon-file-earmark>&nbsp;{{ test.stderr.name || '' }}
                          </li>
                        </div>
                      </ul>
                    </li>
                    <li v-for="file in assignment.specification.requiredFiles" :key="file">
                      <b-icon-file-earmark></b-icon-file-earmark>&nbsp;{{ file }}
                    </li>
                    <li v-for="file in assignment.specification.providedFiles" :key="file._id">
                      <b-icon-file-earmark></b-icon-file-earmark>&nbsp;<b-link :to="`/file/${file._id}`">
                      {{ file.name }}
                    </b-link>
                    </li>
                  </ul>
                </li>

              </ul>
            </template>
          </t-card>
        </b-col>

        <b-col cols="8" align-self="center">

        </b-col>


      </b-form-row>
    </b-container>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import TCard from "@/components/tCard";


const UPLOAD_SUBMISSION =
    gql`mutation uploadSubmission($assignmentId: ObjectId!, $submissionUpload: [Upload!]!){
          uploadSubmission(assignmentId: $assignmentId, submissionUpload: $submissionUpload){
            _id
          }
        }`;

const GET_ASSIGNMENT =
    gql`query assignment($assignmentId: ObjectId!){
          assignment(assignmentId: $assignmentId){
              name,
              assigned,
              specification {
                tests {
                    name,
                    hidden,
                    stdin {name, _id},
                    stdout {name, _id},
                    stderr {name, _id},
                    testContext
                },
                requiredFiles,
                providedFiles {name, _id}
              },
              due,
              created
          }
        }`;


export default {
  name: 'Submit',
  components: {TCard},
  data() {
    return {
      assignment: {},
      showTests: false,
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
    assignment: {
      query: GET_ASSIGNMENT,
      loadingKey: 'loading',
      variables() {
        return {
          assignmentId: this.$route.params.assignmentId,
        }
      }
    },
  },
  methods: {
    back: function () {
      this.$router.back()
    },

    uploadSubmission: function ({target: {files = []}}) {
      this.loading.uploadFiles = true;
      this.$apollo.mutate({
        mutation: UPLOAD_SUBMISSION,
        variables: {
          assignmentId: this.$route.params.assignmentId,
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
<style scoped>

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

</style>
