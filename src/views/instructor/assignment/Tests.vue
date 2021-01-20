<template>
  <div>
    <b-form-row>
      <b-col cols="8">
      </b-col>
      <b-col cols="8">
        <t-card title="Submission Tests"
                subtitle="All of the following tests will be run and evaluated on all assignment submissions."
        >
          <template slot="table">

            <b-table :items="assignment.specification.tests" sort-by="name"
                     :fields="['name']" class="justify-content-between"
                     show-empty>
              <template #empty>
                No tests specified.
              </template>
              <template #cell(name)="row">
                <div class="d-flex justify-content-between">
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

              <template #row-details="row">


                <b-row class="mb-3">

                  <b-col cols="6" class="d-flex flex-column justify-content-between"
                         style="border-color: var(--muted) !important;">
                    <b-form>
                      <b-form-group
                          label="Program Timeout (ms)"
                          description="Tests with a timeout above 6000ms will be run separately from the primary tests.">
                        <b-form-input type="number" size="sm" v-model="row.item.timeout"></b-form-input>
                      </b-form-group>
                      <b-form-group
                          label="Exit Code"
                          description="If the program produces an error code other than the one provided, the test will not pass.">
                        <b-form-input type="number" size="sm" v-model="row.item.exit"></b-form-input>
                      </b-form-group>


                    </b-form>
                  </b-col>
                  <b-col cols="6" class="d-flex flex-column justify-content-between">
                    <b-form>
                      <b-form-group
                          label="Memory"
                          description="This operation may add time to the submission process and should not be run on more than 3 tests.">
                        <b-form-checkbox v-model="row.item.leaks" name="check-button" switch>
                          Check for memory leaks
                        </b-form-checkbox>
                      </b-form-group>
                      <b-form-group
                          label="Visibility"
                          description="Hidden tests are visibly hidden and are not counted toward the student's grade.">
                        <b-form-checkbox v-model="row.item.hidden" name="check-button" switch>
                          Hide results from students
                        </b-form-checkbox>
                      </b-form-group>
                    </b-form>
                    <div class="d-flex justify-content-end">
                      <b-button variant="danger" class="mr-2" size="sm">Delete</b-button>
                      <b-button variant="primary" size="sm">Update</b-button>
                    </div>
                  </b-col>

                </b-row>

              </template>

              <template slot="custom-foot" v-if="loading.addProvidedFile">
                <b-th>
                  <strong>Uploading...</strong>
                </b-th>
                <b-th>
                  <b-spinner class="ml-auto" variant="primary" small></b-spinner>
                </b-th>
              </template>
              <template slot="custom-foot" v-if="loading.removeProvidedFile">
                <b-th>
                  <strong>Removing...</strong>
                </b-th>
                <b-th>
                  <b-spinner class="ml-auto" variant="primary" small></b-spinner>
                </b-th>
              </template>
            </b-table>

          </template>
        </t-card>
      </b-col>
      <b-col cols="4">
        <t-card title="Upload Tests"
                subtitle="Upload a *.tar.gz file containing tests, or upload a turnin assignment manifest.">
          <template slot="body">
            <b-form-file type="file" @change="uploadCompressedTests">
            </b-form-file>
            <div v-if="loading.uploadTests">
              <b-spinner small variant="primary" class="mr-2"></b-spinner>
              <strong>Uploading...</strong>
            </div>
          </template>
        </t-card>
      </b-col>

    </b-form-row>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import TCard from "@/components/tCard";


const UPLOAD_TESTS =
    gql`mutation addCompressedTests($SpecificationId: ObjectId!, $fileUpload: Upload!){
          addCompressedTests(SpecificationId: $SpecificationId, fileUpload: $fileUpload){
               _id
          }
        }`;

const GET_ASSIGNMENT =
    gql`query assignment($assignmentId: ObjectId!){
          assignment(assignmentId: $assignmentId){
              name,
              assigned,
              due,
              specification {
                  tests {
                    name,
                    hidden,
                    leaks,
                    exit,
                    stdin { _id, reference, name, link },
                    stdout { _id, reference, name, link },
                    args,
                    testContext,
                    timeout,
                    _id
                  },
                  _id
              },
              created
          }
        }`;

export default {
  name: 'AssignmentFiles',
  components: {TCard},
  data() {
    return {
      assignment: {
        specification: {
          requiredFiles: [],
          _id: ""
        }
      },
      loading: {
        page: false,
        uploadTests: false,
      },
      form: {
        addFileName: "",
        addProvidedFile: File,
        compilationCommand: ""
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
      loadingKey: 'loading.page',
      fetchPolicy: "cache-and-network",
      nextFetchPolicy: "cache-first",
      variables() {
        return {
          assignmentId: this.$route.params.assignmentId,
        }
      }
    },
  },
  methods: {
    updateTest(testId) {
      this.$apollo.mutate({
        mutation: UPLOAD_TESTS,
        variables: {
          specificationId: testId,
          fileUpload: ""
        }
      }).then(() => {
        this.$apollo.queries.assignment.refresh();
        this.loading.uploadTests = false;
      }).catch(doc => {
        this.error = doc;
        this.loading.uploadTests = false;
      });
    },
    uploadCompressedTests: function ({target: {files = []}}) {
      this.loading.uploadTests = true;
      this.$apollo.mutate({
        mutation: UPLOAD_TESTS,
        variables: {
          SpecificationId: this.assignment.specification._id,
          fileUpload: files[0]
        }
      }).then(() => {
        this.$apollo.queries.assignment.refresh();
        this.loading.uploadTests = false;
      }).catch(doc => {
        this.error = doc;
        this.loading.uploadTests = false;
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

.v-sep {
  width: 1px;
  margin: 0.25em 1.25em;
  height: 1em;
  vertical-align: center;
  background-color: var(--muted);
  opacity: 0.5;
}

</style>
