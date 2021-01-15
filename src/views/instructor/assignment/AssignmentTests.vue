<template>
  <div>
    <b-row>
      <b-col cols="12">

      </b-col>
      <b-col cols="8">
        {{ error.errors }}
        <div class="py-3 d-flex justify-content-between align-items-end">
          <div>
            <h4 class="mb-1">StandardIO Tests</h4>
            <span class="mt-0 text-muted">These files will be included with the required file during compilation.</span>
          </div>
          <div>

          </div>

        </div>
        <div class="table-responsive mb-0">
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

                <b-form-row>
                  <b-col cols="8">
                    <b-form-checkbox v-model="row.item.testMemoryLeaks" style="line-height: 1.75em;" name="check-button"
                                     switch>
                      Check for Memory Leaks <i class="fas fa-info-circle" v-b-tooltip.hover
                                                title="This will add significant time to the submission."></i>
                    </b-form-checkbox>
                    <b-form-checkbox v-model="checked" style="line-height: 1.75em;" name="check-button" switch>
                      Hide Test
                    </b-form-checkbox>
                  </b-col>
                  <b-col cols="4">

                  </b-col>
                  <b-col cols="12">

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
        </div>
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
                    testInput { _id, fileReference, fileName },
                    testOutput { _id, fileReference, fileName },
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
  components: {},
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
