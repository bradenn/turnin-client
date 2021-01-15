<template>
  <div>
    <b-row>
      <b-col cols="8">
        {{ error.errors }}
        <div class="py-3 d-flex justify-content-between align-items-end">
          <div>
            <h4 class="mb-1">Required Files</h4>
            <span
                class="mt-0 text-muted">Student's must submit all required files for their submission to be validated.</span>
          </div>
          <div>
            <b-form inline @submit="addRequiredFile">
              <b-form-input type="text" v-model="form.addFileName" class="mr-1" placeholder="main.cpp"
                            size="sm"></b-form-input>
              <b-button variant="primary" type="submit" size="sm">Add File</b-button>
            </b-form>
          </div>

        </div>

        <div class="table-responsive mb-0">
          <b-table :items="assignment.assignmentSpecification.specificationRequiredFiles"
                   :fields="['fileName', 'options']" small show-empty>
            <template #empty>
              No files specified.
            </template>
            <template #cell(fileName)="data">
              {{ data.item }}
            </template>
            <template #cell(options)="data">
              <b-link @click="removeRequiredFile(data.item)">Remove</b-link>
            </template>
          </b-table>
        </div>

        <div class="py-3 d-flex justify-content-between align-items-end">
          <div>
            <h4 class="mb-1">Provided Files</h4>
            <span class="mt-0 text-muted">These files will be included with the required file during compilation.</span>

          </div>
          <div>
            <b-form-file accept="*" :busy="loading.addProvidedFile" @change="addProvidedFile" type="file" size="sm">

            </b-form-file>
          </div>

        </div>
        <div class="table-responsive mb-0">
          <b-table :items="assignment.assignmentSpecification.specificationProvidedFiles"
                   :fields="['fileName', 'options']" small show-empty>
            <template #empty>
              No files specified.
            </template>
            <template #cell(fileName)="data">
              <b-link :href="`https://swfs.turnin.co${data.item.fileReference}`">{{ data.item.fileName }}</b-link>
            </template>
            <template #cell(options)="data">
              <b-link @click="removeProvidedFile(data.item._id)">Remove</b-link>
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

    </b-row>

  </div>
</template>

<script>
import gql from 'graphql-tag'


const ADD_FILE =
    gql`mutation addRequiredFile($SpecificationId: ObjectId!, $file: String!){
          addRequiredFile(SpecificationId: $SpecificationId, file: $file){
               _id
          }
        }`;

const REMOVE_FILE =
    gql`mutation removeRequiredFile($SpecificationId: ObjectId!, $file: String!){
          removeRequiredFile(SpecificationId: $SpecificationId, file: $file){
               _id
          }
        }`;

const UPLOAD_PROVIDED_FILE =
    gql`mutation addProvidedFile($SpecificationId: ObjectId!, $fileUpload: Upload!){
          addProvidedFile(SpecificationId: $SpecificationId, fileUpload: $fileUpload){
               _id
          }
        }`;

const DELETE_PROVIDED_FILE =
    gql`mutation removeProvidedFile($SpecificationId: ObjectId!, $fileId: ObjectId!){
          removeProvidedFile(SpecificationId: $SpecificationId, fileId: $fileId){
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
                  specificationCompilationCommand,
                  specificationCompilationTimeout,
                  specificationProvidedFiles {
                    fileName,
                    fileReference,
                    _id
                  },
                  specificationRequiredFiles,
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
        addRequiredFile: false,
        addProvidedFile: false,
        removeProvidedFile: false,
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

    addProvidedFile({target: {files = []}}) {
      this.loading.addProvidedFile = true;
      this.$apollo.mutate({
        mutation: UPLOAD_PROVIDED_FILE,
        variables: {
          SpecificationId: this.assignment.assignmentSpecification._id,
          fileUpload: files[0]
        },
        context: {
          hasUpload: true
        }
      }).then(() => {
        this.$apollo.queries.assignment.refresh();
        this.loading.addProvidedFile = false;
      }).catch(doc => {
        this.error = doc;
      });
    },
    addRequiredFile: function (e) {
      e.preventDefault();
      this.$apollo.mutate({
        mutation: ADD_FILE,
        variables: {
          SpecificationId: this.assignment.assignmentSpecification._id,
          file: this.form.addFileName
        }
      }).then(() => {
        this.$apollo.queries.assignment.refresh();
      }).catch(doc => {
        this.error = doc;
      });
    },
    removeRequiredFile(fileName) {
      this.$apollo.mutate({
        mutation: REMOVE_FILE,
        variables: {
          SpecificationId: this.assignment.assignmentSpecification._id,
          file: fileName
        }
      }).then(() => {
        this.$apollo.queries.assignment.refresh();
      }).catch(doc => {
        this.error = doc;
      });
    },
    removeProvidedFile(fileId) {
      this.loading.removeProvidedFile = true;
      this.$apollo.mutate({
        mutation: DELETE_PROVIDED_FILE,
        variables: {
          SpecificationId: this.assignment.assignmentSpecification._id,
          fileId: fileId
        }
      }).then(() => {
        this.loading.removeProvidedFile = false;
        this.$apollo.queries.assignment.refresh();
      }).catch(doc => {
        this.error = doc;
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
