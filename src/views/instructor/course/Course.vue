<template>
  <div>
    <t-header
        :loading="loading"
        :previous="course.name"
        :current="this.$route.meta.title"
        subtitle=""
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
import THeader from "@/components/tHeader";

const GET_COURSE =
    gql`query course($courseId: ObjectId!){
          course(courseId: $courseId){
              name,
              section,
              locked
          }
        }`;

const CREATE_COURSE =
    gql`mutation createCourse($sessionId: String!, $courseName: String!, $courseSection: Int!){
          createCourse(sessionId: $sessionId, name: $courseName, section: $courseSection){
            _id
          }
        }`;

export default {
  name: 'Courses',
  components: {
    THeader
  },
  data() {
    return {
      course: {},
      loading: 0,
      parent: `/course/${this.$route.params.courseId}/`,
      navItems: [
        {name: "Overview", path: '', icon: "fas fa-layer-group"},
        {name: "Grades", path: 'grades', icon: "fas fa-book"},
        {name: "Students", path: 'students', icon: "fas fa-users"},
        {name: "Settings", path: 'settings', icon: "fas fa-cog"}
      ]
    }
  },
  apollo: {
    course: {
      query: GET_COURSE,
      loadingKey: 'loading',
      variables() {
        return {
          courseId: this.$route.params.courseId,
        }
      }
    },
  },
  mounted() {
    this.loadCourse();
  },
  methods: {
    loadCourse() {
      this.$apollo.query({
        query: GET_COURSE,
        variables: {
          courseId: this.$route.params.courseId
        }
      }).then(doc => {
        this.instructorCourse = doc.data.instructorCourse;
        this.loading = doc.loading
      }).catch(error => {
        this.error = error;
      })
    },
    createCourse() {
      this.$apollo.mutate({
        mutation: CREATE_COURSE,
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
#card-tabs {
  margin: 0;
  padding: 0;
}

.card-header {
  padding: 0 !important;
  margin: 0;
}

.card {
  padding: 0 0;
}
</style>
