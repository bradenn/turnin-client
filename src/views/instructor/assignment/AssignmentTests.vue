<template>
  <div>
    <b-row>
      <b-col cols="12">

      </b-col>
      <b-col cols="8">
        {{ error.errors }}
        <div class="py-3 d-flex justify-content-between align-items-end">
          <div>
            <h3>StandardIO Tests</h3>
            <span>These files will be included with the required file during compilation.</span>
          </div>
          <div>

          </div>

        </div>
        <div class="table-responsive mb-0">
          <b-table :items="assignment.assignmentSpecification.specificationTests"
                   :fields="['testName', '_id']" small show-empty>
            <template #empty>
              No tests specified.
            </template>
            <template #cell(fileName)="data">
              <b-link :href="`https://swfs.turnin.co/csuchico/${data.item.fileReference}`">{{ data.item.fileName }}</b-link>
            </template>
            <template #cell(options)="">
              <b-link>Remove</b-link>
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
          <b-form-file type="file" @change="uploadCompressedTests" >
          </b-form-file>
          <div v-if="loading.uploadTests">
            <b-spinner small variant="primary" class="mr-2"></b-spinner> <strong>Uploading...</strong>
          </div>
        </b-card>



      </b-col>

    </b-row>

  </div>
</template>

<script>
import gql from 'graphql-tag'


const UPLOAD_TESTS =
    gql`mutation addCompressedTests($stdIOSpecificationId: ObjectId!, $fileUpload: Upload!){
          addCompressedTests(stdIOSpecificationId: $stdIOSpecificationId, fileUpload: $fileUpload){
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
                    testInput { _id },
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
          stdIOSpecificationId: this.assignment.assignmentSpecification._id,
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
.progress-bar {
  height: 100% !important;
}

</style>
