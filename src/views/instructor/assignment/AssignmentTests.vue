<template>
  <div>
    <b-row>
      <b-col cols="8">
      </b-col>
      <b-col cols="8">
        <t-card title="StandardIO Tests"
                subtitle="All of the following tests will be run and evaluated on all assignment submissions.">
          <template slot="table">

            <b-table :items="assignment.assignmentSpecification.specificationTests" sort-by="testName"
                     :fields="['tests']" class="justify-content-between" small show-empty>
              <template #empty>
                No tests specified.
              </template>
              <template #cell(tests)="row">
                <b-link size="sm" variant="primary" @click="row.toggleDetails">
                  <div class="d-flex justify-content-between">
                    <div>{{ row.item.testName }}</div>
                    <div>
                      <i class="fas" :class="row.detailsShowing?'fa-chevron-down':'fa-chevron-left'"></i>
                    </div>
                  </div>
                </b-link>
              </template>

              <template #row-details="row">
                <b-card>
                  <b-form-row class="">
                    <b-col cols="6" class="border-right" style="border-color: var(--muted) !important;">
                      <strong class="mb-2">Runtime Options</strong>
                      <b-form-checkbox v-model="row.item.testMemoryLeaks" style="line-height: 1.75em;"
                                       name="check-button"
                                       switch>
                        Check for Memory Leaks
                      </b-form-checkbox>
                      <b-form-checkbox v-model="checked" style="line-height: 1.75em;" name="check-button" switch>
                        Log program heap
                      </b-form-checkbox>
                      <b-form-checkbox v-model="checked" style="line-height: 1.75em;" name="check-button" switch>
                        Hide test from students
                      </b-form-checkbox>
                    </b-col>
                    <b-col cols="6" class="pl-3">
                      <b>Test Files</b>
                      <div class="d-flex justify-content-between">
                        <div>{{ row.item.testInput.fileName }}</div>
                        <b-link :href="`${row.item.testInput.fileLink}`" v-if="row.item.testInput" target="_blank">view
                          raw
                        </b-link>
                      </div>
                      <div class="d-flex justify-content-between" v-if="row.item.testOutput">
                        <div>{{ row.item.testOutput.fileName }}</div>
                        <div>
                          <b-link :href="`${row.item.testOutput.fileLink}`" target="_blank">view
                            raw
                          </b-link>
                        </div>
                      </div>
                      <div class="d-flex justify-content-between" v-if="row.item.testError">
                        <div>{{ row.item.testError.fileName }}</div>
                        <div>
                          <b-link :href="`${row.item.testError.fileLink}`" target="_blank">view
                            raw/""""
                          </b-link>
                        </div>
                      </div>
                    </b-col>

                  </b-form-row>
                </b-card>
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
        <b-card>
          <b-form-file type="file" @change="uploadCompressedTests">
          </b-form-file>
          <div v-if="loading.uploadTests">
            <b-spinner small variant="primary" class="mr-2"></b-spinner>
            <strong>Uploading...</strong>
          </div>
        </b-card>
      </b-col>

    </b-row>
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
              assignmentName,
              assignmentIsAssigned,
              assignmentDueDate,
              assignmentSpecification {
                  specificationTests {
                    testName,
                    testIsHidden,
                    testInput { _id, fileReference, fileName, fileLink },
                    testOutput { _id, fileReference, fileName, fileLink },
                    testArguments,
                    _id
                  },
                  _id
              },
              dateCreated
          }
        }`;

export default {
  name: 'AssignmentFiles',
  components: {TCard},
  data() {
    return {
      assignment: {
        assignmentSpecification: {
          specificationRequiredFiles: [],
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
          SpecificationId: this.assignment.assignmentSpecification._id,
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

</style>
