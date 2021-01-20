<template>
  <div>
    <div>
      <b-form-row>
        <b-col cols="12">
          <b-alert show variant="primary" class="d-flex justify-content-between align-items-center">
            {{ assignment.name }} is not assigned. Would you like to assign it
            to {{ assignment.course.courseFullName }}?
            <b-button variant="primary" size="md">Assign</b-button>
          </b-alert>
        </b-col>
        <b-col cols="8">
          <b-card>
            // Todo
          </b-card>
        </b-col>
        <b-col cols="4">
          <t-card
              title="Assignment Statistics"
              subtitle="See how students are responding to your assignment"
              align-top>
            <template slot="body">
              <b-progress class="mt-2" :max="100" animated show-value height="1rem">
                <b-progress-bar :value="73" :label="`73%`"></b-progress-bar>
              </b-progress>
              <hr>
            </template>
          </t-card>
        </b-col>
      </b-form-row>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import tCard from "@/components/tCard";

const GET_ASSIGNMENT =
    gql`query assignment($assignmentId: ObjectId!){
          assignment(assignmentId: $assignmentId){
              name,
              course {
                courseFullName
              },
              assigned,
              due,
              created
          }
        }`;

export default {
  name: 'AssignmentOverview',
  components: {
    tCard
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
.progress-bar {
  height: 100% !important;
}

</style>
