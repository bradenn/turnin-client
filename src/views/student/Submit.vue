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

        <b-col cols="8">
          <b-card>
            <code>{{ error }}</code>
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
            _id
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
          assignmentId: "6000a25ec2a42f066ff66b63",
          submissionUpload: files
        }
      }).then((res) => {
        this.loading.uploadFiles = false;
        this.$router.push(`/submission/${res.data.uploadSubmission._id}`)
      }).catch(doc => {
        this.error = doc;
        console.log(doc)
        this.loading.uploadFiles = false;
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
