<template>
  <div>
    <b-form-row>
      <b-col cols="8">
        <t-card title="Assignment Settings"
                subtitle="The full instructions for the assignment. Upload a markup file, pdf, or docx file.">
          <template slot="body">
            <b-form @submit="pushUpdates">
              <b-form-group
                  label="Compilation Command"
                  label-for="input-formatter"
                  description="This command will be used to compile the submitted project."
              >
                <b-form-input type="text" size="sm"
                              v-model="assignment.specification.command"></b-form-input>
              </b-form-group>

              <b-form-group
                  label="Compilation Timeout"
                  label-for="input-formatter"
                  description="The compilation will timeout after 5000ms by default."
              >
                <b-form-spinbutton id="demo-sb" size="sm"
                                   v-model="assignment.specification.timeout"
                                   min="200" step="500" max="20000"></b-form-spinbutton>
              </b-form-group>
              <div class="d-flex justify-content-between align-items-center mt-2">
                <div>
                  <div v-if="loading.updateSettings">
                    <b-spinner small variant="primary" class="mr-2"></b-spinner>
                    <strong>Updating...</strong>
                  </div>
                </div>
                <b-button variant="primary" type="submit">
                  Update
                </b-button>
              </div>
            </b-form>
          </template>
        </t-card>

      </b-col>
    </b-form-row>

  </div>
</template>

<script>
import gql from 'graphql-tag'
import TCard from "@/components/tCard";

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
                  command,
                  timeout,
                  providedFiles {
                    name,
                    reference,
                    _id
                  },
                  requiredFiles,
                  _id
              },
              created
          }
        }`;

export default {
  name: 'AssignmentSettings',
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
            command: this.assignment.specification.command,
            timeout: this.assignment.specification.timeout
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
