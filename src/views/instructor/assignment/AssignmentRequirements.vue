<template>
  <div>
    <b-form-row>
      <b-col cols="8">
        {{error.errors}}
        <div class="py-3 d-flex justify-content-between align-items-end">
          <div>
            <h3>Required File Names</h3>
            <span>Student's must submit all required files for their submission to be validated.</span>
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
      </b-col>
      <b-col cols="8">
        <div class="py-3 d-flex justify-content-between align-items-end">
          <div>
            <h3>Provided Files</h3>
            <span>These files will be included with the required file during compilation.</span>
          </div>
          <div>
            <b-form-file accept="*" @change="addProvidedFile" type="file" size="sm"></b-form-file>
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
      </b-col>
    </b-form-row>

  </div>
</template>

<script>
import gql from 'graphql-tag'

const ADD_FILE =
    gql`mutation addRequiredFile($stdIOSpecificationId: ObjectId!, $file: String!){
          addRequiredFile(stdIOSpecificationId: $stdIOSpecificationId, file: $file){
               _id
          }
        }`;

const UPLOAD_PROVIDED_FILE =
    gql`mutation addProvidedFile($stdIOSpecificationId: ObjectId!, $fileUpload: Upload!){
          addProvidedFile(stdIOSpecificationId: $stdIOSpecificationId, fileUpload: $fileUpload){
               _id
          }
        }`;

const REMOVE_FILE =
    gql`mutation removeRequiredFile($stdIOSpecificationId: ObjectId!, $file: String!){
          removeRequiredFile(stdIOSpecificationId: $stdIOSpecificationId, file: $file){
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

                  specificationRequiredFiles,
                  _id
              },
              dateCreated
          }
        }`;

export default {
  name: 'AssignmentRequirements',
  components: {},
  data() {
    return {
      assignment: {
        assignmentSpecification: {
          specificationRequiredFiles: [],
          _id: ""
        }
      },
      loading: 0,
      form: {
        addFileName: "",
        addProvidedFile: File
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
    getRequiredFiles() {
      const files = this.assignment.assignmentSpecification.specificationRequiredFiles;
      return files.map(fileName => {
        return {fileName}
      });
    },
    createCourse() {
      this.$apollo.mutate({
        mutation: GET_ASSIGNMENT,
        variables: {
          sessionId: this.$user()._id,
          courseName: this.form.courseName,
          courseSection: this.form.courseSection
        }
      }).then(response => this.$router.push(`/course/${response.data.createCourse._id}`))
          .catch(doc => console.log(doc));
    },
    addProvidedFile({ target: { files = [] } }) {
      console.log(files[0])
      this.$apollo.mutate({
        mutation: UPLOAD_PROVIDED_FILE,
        variables: {
          stdIOSpecificationId: this.assignment.assignmentSpecification._id,
          fileUpload: files[0]
        },
        context: {
          hasUpload: true
        }
      }).then((dat) => {
        console.log(dat)
        this.$apollo.queries.assignment.refresh();
      }).catch(doc => {
        this.error = doc;
      });
    },
    addRequiredFile: function (e) {
      e.preventDefault();
      this.$apollo.mutate({
        mutation: ADD_FILE,
        variables: {
          stdIOSpecificationId: this.assignment.assignmentSpecification._id,
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
          stdIOSpecificationId: this.assignment.assignmentSpecification._id,
          file: fileName
        }
      }).then(() => {
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
