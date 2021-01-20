<template>
  <div>
    <b-row>
      <b-col cols="12">
        <div class="mb-3">
          <h3>Assignment Settings</h3>
          <span>The full instructions for the assignment. Upload a markup file, pdf, or docx file.</span>
        </div>
      </b-col>
      <b-col cols="8">

            <b-form @submit="pushUpdates">
              <h5>General Settings</h5>
              <b-form-group
                  label="Assignment Course"
                  label-for="input-formatter"
                  description="Once assigned, this course will be responsible for completing this assignment. This cannot be changed.">
                <b-form-input type="text"
                              v-model="assignment.course.courseFullName" disabled></b-form-input>
              </b-form-group>

              <h5>Compilation Settings</h5>
              <b-form-group
                  label="Compilation Command"
                  label-for="input-formatter"
                  description="This command will be used to compile the submitted project."
                  >
                <b-form-input type="text"
                              v-model="assignment.specification.specificationCompilationCommand"></b-form-input>
              </b-form-group>

              <b-form-group
                  label="Compilation Timeout"
                  label-for="input-formatter"
                  description="The compilation will timeout after 5000ms by default."
                  >
                <b-form-spinbutton id="demo-sb"
                                   v-model="assignment.specification.specificationCompilationTimeout"
                                   min="200" step="500" max="20000"></b-form-spinbutton>
              </b-form-group>
              <div class="d-flex justify-content-between align-items-center mt-2">
                <div>
                  <div v-if="loading.updateSettings">
                    <b-spinner small variant="primary" class="mr-2"></b-spinner> <strong>Updating...</strong>
                  </div>
                </div>
                <b-button variant="primary" type="submit">
                  Update
                </b-button>
              </div>
            </b-form>

      </b-col>
    </b-row>

  </div>
</template>

<script>
import gql from 'graphql-tag'

const UPDATE_SETTINGS =
    gql`mutation updateSpecification($SpecificationId: ObjectId!, $SpecificationInput: SpecificationInput!){
          updateSpecification(SpecificationId: $SpecificationId, SpecificationInput: $SpecificationInput){
               _id
          }
        }`;

const GET_ASSIGNMENT =
    gql`query assignment($assignmentId: ObjectId!){
          assignment(assignmentId: $assignmentId){
              name,
              assigned,
              due,
              course {
                courseFullName
              },
              specification {
                  specificationCompilationCommand,
                  specificationCompilationTimeout,
                  specificationProvidedFiles {
                    name,
                    reference,
                    _id
                  },
                  specificationRequiredFiles,
                  _id
              },
              created
          }
        }`;

export default {
  name: 'AssignmentSettings',
  components: {},
  data() {
    return {
      assignment: {
        specification: {
          specificationRequiredFiles: [],
          _id: ""
        }
      },
      loading: {
        updateSettings: false
      },
      error: ""
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

    pushUpdates: function (e) {
      this.loading.updateSettings = true;
      e.preventDefault();
      this.$apollo.mutate({
        mutation: UPDATE_SETTINGS,
        variables: {
          SpecificationId: this.assignment.specification._id,
          SpecificationInput: {
            specificationCompilationCommand: this.assignment.specification.specificationCompilationCommand,
            specificationCompilationTimeout: this.assignment.specification.specificationCompilationTimeout
          }
        }
      }).then(() => {
        this.$apollo.queries.assignment.refresh();
        this.loading.updateSettings = false;
      }).catch(doc => {
        this.error = doc;
      });
    }
  }
}
</script>

<style scoped>

</style>
