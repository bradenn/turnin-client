<template>
  <div>
    <b-form-row>
      <b-col cols="8">
        <div class="py-3">
          <h3>Required File Names</h3>
          <span>Student's must submit all required files for their submission to be validated. Files names are case sensitive.</span>
        </div>
        <div class="table-responsive mb-0">
          <b-table :fields="['fileName', 'options']" class="px-4" small
                   :items="[{fileName: 'main.cpp', options: 'Remove'}, {fileName: 'tree.cpp', options: 'Remove'}]"></b-table>
        </div>
        <div class="py-3 pt-4">
          <h3>Provided Files</h3>
          <span>Provided files will be used in conjunction with student submitted files during compilation.</span>
        </div>
        <div class="table-responsive mb-0">
          <b-table :fields="['fileName', 'fileSize', 'options']" class="px-4" small
                   :items="[{fileName: 'Makefile', fileSize: '3KB', options: 'Remove'}, {fileName: 'utils.cpp', fileSize: '8KB', options: 'Remove'}]"></b-table>
        </div>
      </b-col>
    </b-form-row>

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
  name: 'AssignmentRequirements',
  components: {},
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
