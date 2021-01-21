<template>
  <div>
    <b-form-row>
      <b-col cols="8">
        {{ error.errors }}

        <t-card title="Required Files"
                subtitle="Required files must be uploaded to complete a submission.">
          <template slot="table">

            <b-table :items="assignment.specification.requiredFiles"
                     :fields="['name']" show-empty>
              <template #empty>
                No files specified.
              </template>
              <template #cell(name)="data">
                <div class="d-flex justify-content-between">
                  {{ data.item }}
                  <b-link @click="removeRequiredFile(data.item)">Remove</b-link>
                </div>
              </template>
            </b-table>
          </template>
        </t-card>
      </b-col>
      <b-col cols="4">
        <t-card title="Add Required File"
                subtitle="Type the names of any required files.">
          <template slot="body">
            <div>
              <b-form inline @submit="addRequiredFile">
                <b-form-input type="text" v-model="form.addFileName" class="mr-1" placeholder="main.cpp"
                              size="sm"></b-form-input>
                <b-button variant="primary" type="submit" size="sm">Add File</b-button>
              </b-form>
            </div>
          </template>
        </t-card>
      </b-col>
      <b-col cols="8">
        <t-card title="Provided Files"
                subtitle="These files will be included with the required file during compilation.">
          <template slot="table">
            <b-table :items="assignment.specification.providedFiles"
                     :fields="['name']" show-empty>
              <template #empty>
                No files specified.
              </template>
              <template #cell(name)="data">
                <div class="d-flex justify-content-between">
                  <span>{{ data.item.name }}</span>
                  <div>
                    <b-link :to="`/file/${data.item._id}`" target="_blank">View</b-link>&nbsp;|&nbsp;
                    <b-link @click="removeProvidedFile(data.item._id)">Delete</b-link>
                  </div>
                </div>
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
        <t-card title="Upload Provided File"
                subtitle="Upload any required make files or dependencies.">
          <template slot="body">
            <div>
              <b-form-file accept="*" :busy="loading.addProvidedFile" @change="addProvidedFile" type="file" size="sm">
              </b-form-file>
              <div v-if="loading.addProvidedFile">
                <b-spinner class="mr-2 mt-2" variant="primary" small></b-spinner>
                <strong>Uploading...</strong>
              </div>
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
              name,
              assigned,
              due,
              specification {
                  command,
                  timeout,
                  providedFiles {
                    name,
                    reference,
                    link,
                    _id
                  },
                  requiredFiles,
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
          SpecificationId: this.assignment.specification._id,
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
          SpecificationId: this.assignment.specification._id,
          file: this.form.addFileName
        }
      }).then(() => {
        this.$apollo.queries.assignment.refresh();
      }).catch(doc => {
        this.error = doc;
      });
    },
    removeRequiredFile(name) {
      this.$apollo.mutate({
        mutation: REMOVE_FILE,
        variables: {
          SpecificationId: this.assignment.specification._id,
          file: name
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
          SpecificationId: this.assignment.specification._id,
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
