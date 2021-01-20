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
            label-for="name">
          <b-form-input id="name" v-model="form.name" placeholder="Lab 1" trim></b-form-input>
        </b-form-group>
        <b-form-group
            label="Assignment Course"
            description="Which course should be assigned this assignment?"
            label-for="course">
          <b-form-select id="course" v-model="form.course" :options="instructorCourses"></b-form-select>
        </b-form-group>
        <b-form-group
            label="Due Date"
            :description="form.due.toString()"
            label-for="due">
          <b-form-datepicker id="due" v-model="form.due" :value-as-date="true" class="mb-2"></b-form-datepicker>
        </b-form-group>
        <b-form-group
            label="Late Date"
            :description="form.late.toString()"
            label-for="late">
          <b-form-datepicker id="late" v-model="form.late" :min="form.due" :value-as-date="true"
                             class="mb-2"></b-form-datepicker>
        </b-form-group>
      </form>
      <template #modal-footer>
        <div class="d-flex justify-content-between align-items-baseline" style="width: 100%;">
          <div class="text-muted" v-if="form.name === ''">An assignment name is required.</div>
          <div></div>
          <div>
            <b-button type="submit" @click="createAssignment" variant="primary" :disabled="form.name === ''">
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
  components: {},
  data() {
    return {
      show: false,
      instructorCourses: {},
      form: {
        name: "",
        course: 0,
        due: new Date(),
        late: new Date()
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
    createAssignment() {
      this.$apollo.mutate({
        mutation: CREATE_ASSIGNMENT,
        variables: {
          assignmentInput: {
            name: this.form.name,
            course: this.form.course,
            due: this.form.due,
            late: this.form.late
          }
        }
      }).then(response => {
        this.$router.push(`/assignment/${response.data.createAssignment._id}`)
      }).catch(doc => console.log(doc));
    }
  }
}
</script>
