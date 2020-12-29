<template>
  <div>

    <Title :loading="loading" :titleOverride="instructorCourse.courseName" :subtitle="instructorCourse.courseSection
    ?`Section ${instructorCourse.courseSection}`:''">
    </Title>
    <div v-if="error">
      {{ error }}
    </div>
    <div v-else>
      <b-card no-body>
        <b-tabs card>
          <b-tab title="Grades" active>
            <div class="d-flex justify-content-between align-items-end">
              <div>
                <b-card-title>Student Grades</b-card-title>
                <b-card-text>
                  With supporting text below as a natural lead-in to additional content.
                </b-card-text>
              </div>
              <div>
                <b-button href="/assignments" variant="primary">Go to Assignments</b-button>
              </div>
            </div>
          </b-tab>
          <b-tab title="Students">
            <b-card-text>Tab contents 2</b-card-text>
          </b-tab>
          <b-tab title="Course Settings">
            <b-card-text>Tab contents 2</b-card-text>
          </b-tab>
        </b-tabs>
      </b-card>

    </div>
  </div>
</template>

<script>
import Title from "@/components/Title";
import gql from 'graphql-tag'

const GET_COURSE =
    gql`query instructorCourse($courseId: String!){
          instructorCourse(courseId: $courseId){
              courseName,
              courseSection,
              courseIsLocked
          }
        }`;
const CREATE_COURSE =
    gql`mutation createCourse($sessionId: String!, $courseName: String!, $courseSection: Int!){
          createCourse(sessionId: $sessionId, courseName: $courseName, courseSection: $courseSection){
            _id
          }
        }`;

export default {
  name: 'Courses',
  components: {
    Title
  },
  data() {
    return {
      instructorCourse: {},
      loading: 0,
      tab: 'students',
      error: "",
      show: false
    }
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
