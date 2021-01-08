<template>
  <div>
    <b-button variant="primary" size="sm" @click="show = true">New Assignment</b-button>
    <b-modal
        v-model="show"
        title="Create An Assignment">
      <form>
        <b-form-group
            label="Assignment Name"
            description="Students will see this name."
            label-for="assignmentName">
          <b-form-input id="assignmentName" v-model="form.assignmentName" placeholder="Lab 1" trim></b-form-input>
        </b-form-group>
        <b-form-group
            label="Assignment Course"
            description="Which course should be assigned this assignment?"
            label-for="assignmentCourse">
          <b-form-select id="assignmentCourse" v-model="form.assignmentCourse" :options="instructorCourses"></b-form-select>
        </b-form-group>
        <b-form-group
            label="Due Date"
            :description="form.assignmentDueDate.toString()"
            label-for="assignmentDueDate">
          <b-form-datepicker id="assignmentDueDate" v-model="form.assignmentDueDate" :value-as-date="true" class="mb-2"></b-form-datepicker>
        </b-form-group>
        <b-form-group
            label="Late Date"
            :description="form.assignmentLateDate.toString()"
            label-for="assignmentLateDate">
          <b-form-datepicker id="assignmentLateDate" v-model="form.assignmentLateDate" :min="form.assignmentDueDate" :value-as-date="true" class="mb-2"></b-form-datepicker>
        </b-form-group>
      </form>
      <template #modal-footer>
        <div class="d-flex justify-content-between align-items-baseline" style="width: 100%;">
          <div class="text-muted" v-if="form.assignmentName === ''">An assignment name is required.</div>
          <div></div>
          <div>
            <b-button type="submit" @click="createCourse" variant="primary" :disabled="form.assignmentName === ''">
              Create Assignment
            </b-button>
          </div>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import gql from "graphql-tag";

const GET_COURSES = gql`
query instructorCourses{
    instructorCourses{
        text: courseFullName,
        value: _id
    }
}`;

const CREATE_ASSIGNMENT = gql`
mutation createAssignment($assignmentInput: AssignmentInput!){
    createAssignment(assignmentInput: $assignmentInput){
      _id
    }
}`;

export default {
  name: 'DashboardNewAssignment',
  components: {

  },
  data() {
    return {
      show: false,
      instructorCourses: {},
      form: {
        assignmentName: "",
        assignmentCourse: 0,
        assignmentDueDate: new Date(),
        assignmentLateDate: new Date()
      }
    }
  },
  apollo: {
    instructorCourses: {
      query: GET_COURSES,
      loadingKey: 'loading',
      variables() {
        return {
          userId: this.$user()._id,
        }
      }
    },
  },
  methods: {
    addDates: (a, b) => {
      let date = new Date(a)
      /* I was severely unsolder while writing the below line. It looks weird but works :) */
      return date.setHours(...b.split(':').map(x => parseInt(x)));
    },
    createCourse() {
      this.$apollo.mutate({
        mutation: CREATE_ASSIGNMENT,
        variables: {
          courseInput: {
            courseName: this.form.courseName,
            courseSection: this.form.courseSection
          }
        }
      }).then(response => {
        this.$router.push(`/course/${response.data.createCourse._id}`)
      }).catch(doc => console.log(doc));
    }
  }
}
</script>
