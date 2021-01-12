<template>
  <div>
    <b-container>
      <b-row>

        <b-col cols="8">
          {{ error.errors }}
          <div class="py-3 d-flex justify-content-between align-items-end">
            <div>
              <h4 class="mb-1">Submit Assignment</h4>
              <span class="mt-0 text-muted">The following assignments are due</span>
            </div>
            <div>

            </div>
          </div>
        </b-col>

        <b-col cols="8">
          <b-card>
            <b-form-file multiple @change="uploadSubmission">Upload</b-form-file>
            <div v-if="loading.uploadFiles">
              <b-spinner small variant="primary" class="mr-2"></b-spinner>
              <strong>Working on it...</strong>
            </div>
          </b-card>
        </b-col>

      </b-row>
    </b-container>
  </div>
</template>

<script>
import gql from 'graphql-tag'


const UPLOAD_SUBMISSION =
    gql`mutation uploadSubmission($assignmentId: ObjectId!, $submissionUpload: [Upload!]!){
          uploadSubmission(assignmentId: $assignmentId, submissionUpload: $submissionUpload){
            assignmentName
          }
        }`;


export default {
  name: 'Submit',
  components: {},
  data() {
    return {
      loading: {
        page: false,
        uploadFiles: false,
      },
      error: "",
      show: false
    }
  },
  mounted() {
  },
  methods: {

    uploadSubmission: function ({target: {files = []}}) {
      this.loading.uploadFiles = true;
      this.$apollo.mutate({
        mutation: UPLOAD_SUBMISSION,
        variables: {
          assignmentId: "5ff8d1e8dc0d1314fbd2aae6",
          submissionUpload: files
        }
      }).then((res) => {
        console.log(res)
        this.loading.uploadFiles = false;
      }).catch(doc => {
        this.error = doc;
        this.loading.uploadFiles = false;
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
