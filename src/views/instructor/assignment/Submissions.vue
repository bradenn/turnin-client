<template>
  <div>
    <b-form-row>
      <b-col cols="8">
        {{ error.errors }}

        <t-card title="Assignment Settings"
                subtitle="The full instructions for the assignment. Upload a markup file, pdf, or docx file.">
          <template slot="body">

            <b-table :items="assignment.submissions"
                     :fields="['student', 'options']" small show-empty>
              <template #empty>
                No files specified.
              </template>
              <template #cell(student)="data">
                {{ data.item.owner.fullName }}
              </template>
              <template #cell(options)="data">
                <b-link :to="`/submission/${data.item._id}`">View</b-link>
                |
                <b-link @click="removeRequiredFile(data.item)">Remove</b-link>
              </template>
            </b-table>

          </template>
        </t-card>
      </b-col>


    </b-form-row>

  </div>
</template>

<script>
import gql from 'graphql-tag'
import TCard from "@/components/tCard";


const GET_ASSIGNMENT =
    gql`query assignment($assignmentId: ObjectId!){
          assignment(assignmentId: $assignmentId){
              name,
              assigned,
              due,
              submissions {
                 _id,
                 owner {
                    _id,
                    fullName
                 }
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
  name: 'AssignmentSubmissions',
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
  methods: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.progress-bar {
  height: 100% !important;
}

</style>
