<template>
  <div>
    <b-row>
      <b-col cols="8">
        {{ error.errors }}
        <div class="py-3 d-flex justify-content-between align-items-end">
          <div>
            <h4 class="mb-1">Student Submissions</h4>
            <span
                class="mt-0 text-muted">Student's must submit all required files for their submission to be validated.</span>
          </div>

        </div>

        <div class="table-responsive mb-0">
          <b-table :items="assignment.assignmentSubmissions"
                   :fields="['student', 'options']" small show-empty>
            <template #empty>
              No files specified.
            </template>
            <template #cell(student)="data">
              {{ data.item.submissionOwner.fullName }}
            </template>
            <template #cell(options)="data">
              <b-link @click="removeRequiredFile(data.item)">Remove</b-link>
            </template>
          </b-table>
        </div>
      </b-col>

    </b-row>

  </div>
</template>

<script>
import gql from 'graphql-tag'

const GET_ASSIGNMENT =
    gql`query assignment($assignmentId: ObjectId!){
          assignment(assignmentId: $assignmentId){
              assignmentName,
              assignmentIsAssigned,
              assignmentDueDate,
              assignmentSubmissions {
                 _id,
                 submissionOwner {
                    _id,
                    fullName
                 }
              },
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
  name: 'AssignmentSubmissions',
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
  methods: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.progress-bar {
  height: 100% !important;
}

</style>
