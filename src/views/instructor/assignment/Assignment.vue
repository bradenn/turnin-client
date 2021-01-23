<template>
  <div>
    <t-header
        :loading="loading"
        :back="back"
        :previous="assignment.name"
        :current="this.$route.meta.title"
        :subtitle="assignment.assigned?'This assignment is currently assigned':'This assignment is currently unassigned.'"
        :parent="parent"
        :items="navItems">
    </t-header>
    <b-container>
      <router-view></router-view>
    </b-container>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import tHeader from "@/components/tHeader";

const GET_ASSIGNMENT =
    gql`query assignment($assignmentId: ObjectId!){
          assignment(assignmentId: $assignmentId){
              name,
              course {
                name
              },
              assigned,
              due,
              created
          }
        }`;

export default {
  name: 'Assignment',
  components: {
    tHeader
  },
  data() {

    return {
      assignment: {course: {}},
      loading: !!0,
      back: "",
      director: "",
      error: "",
      show: false,
      parent: `/assignment/${this.$route.params.assignmentId}/`,
      navItems: [
        {name: "Overview", path: '', icon: "fas fa-layer-group"},
        {name: "Submissions", path: 'submissions', icon: "fas fa-book"},

        {name: "Files", path: 'files', icon: "fas fa-file"},
        {name: "Tests", path: 'tests', icon: "fas fa-vial"},
        {name: "Settings", path: 'settings', icon: "fas fa-cog"}
      ]
    }
  },
  mounted() {
    this.loadCourse();
    this.back = "/dashboard/assignments"
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
          name: this.form.name,
          section: this.form.section
        }
      }).then(response => this.$router.push(`/course/${response.data.createCourse._id}`))
          .catch(doc => console.log(doc));
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
