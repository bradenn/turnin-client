<template>
  <div>
    <div>
      <b-form-row>
        <b-col cols="12">
          <div class="mb-3">

            <h4 class="mb-1">Assignment Brief</h4>
            <span class="mt-0 text-muted">The full instructions for the assignment. Upload a markup file, pdf, or docx file.</span>
          </div>
        </b-col>
        <b-col cols="8">
          <b-card>
            <b-aspect aspect="8.5:11">
              README.md
            </b-aspect>
          </b-card>
        </b-col>
        <b-col cols="4">
          <b-card></b-card>
        </b-col>
      </b-form-row>
    </div>
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
              dateCreated
          }
        }`;

export default {
  name: 'AssignmentOverview',
  components: {

  },
  data() {
    return {
      assignment: {},
      loading: 0,
      error: "",
      show: false
    }
  },
  mounted() {
    this.loadCourse();
  },
  apollo: {
    assignment: {
      query: GET_ASSIGNMENT,
      loadingKey: 'loading',
      variables() {
        return {
          assignmentId: this.$route.params.assignmentId,
        }
      }
    },
  },
  methods: {
    loadCourse() {
      return "";
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
