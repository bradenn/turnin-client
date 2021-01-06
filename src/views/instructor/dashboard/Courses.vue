<template>
  <div>
    {{ this.$route.name }}
  </div>
  <!--
      <b-modal
          v-model="show"
          title="Create Assignment">
        <form>
          <b-form-group
              description="Students will see this name."
              label="Assignment Name"
              label-for="input-1">
            <b-form-input id="input-1" v-model="form.assignmentName" placeholder="Lab 1" trim></b-form-input>
          </b-form-group>
          <b-form-group
              description="Choose a course to assign to."
              label="Assignment Course"
              label-for="input-1">
            <b-form-select v-model="form.assignmentCourse">
              <b-form-select-option v-for="course in instructorCourses" :key="course._id" :value="course._id">
                {{ course.courseName }}.{{ course.courseSection }}
              </b-form-select-option>
            </b-form-select>
          </b-form-group>
          <b-form-group
              :description="form.assignmentDueDate.toString()"
              label="Assignment due date."
              label-for="assignmentDueDate">
            <b-form-datepicker id="assignmentDueDate" v-model="form.assignmentDueDate" :value-as-date="true" class="mb-2"></b-form-datepicker>
          </b-form-group>
          <b-form-group
              description="Provided an identifier if the course name is reused."
              label="Assignment late due date."
              label-for="assignmentLateDate">
            <b-form-datepicker id="assignmentLateDate" v-model="form.assignmentLateDate" :value-as-date="true" class="mb-2"></b-form-datepicker>
          </b-form-group>

        </form>
        <template #modal-footer>
          <div class="d-flex justify-content-between align-items-baseline" style="width: 100%;">
            <div class="text-muted" v-if="form.courseName === ''">A course name is required.</div>
            <div></div>
            <div>
              <b-button type="submit" @click="createAssignment" variant="primary" :disabled="form.courseName === ''">
                Create
                Course
              </b-button>
            </div>
          </div>
        </template>
      </b-modal>-->

</template>

<script>
import gql from 'graphql-tag'

const GET_COURSES = gql`
query instructorCourses{
    instructorCourses{
        courseName,
        courseSection,
        courseAssignments {
            _id,
            assignmentName,
            assignmentDueDate,
            assignmentLateDate
        },
        courseIsLocked,
        courseInstructor{
            _id
        },
        _id
    }
}`;

/*const CREATE_ASSIGNMENT = gql`
mutation createAssignment($assignmentName: String!, $assignmentCourse: String!, $assignmentDueDate: String!, $assignmentLateDate: String!){
    createAssignment(assignmentName: $assignmentName, assignmentCourse: $assignmentCourse, assignmentDueDate: $assignmentDueDate, assignmentLateDate: $assignmentLateDate){
      _id,
      assignmentCourse
    }
}`;*/

export default {
  name: 'Courses',
  components: {},
  data() {
    return {
      fields: ['courseName'],
      items: [],
      instructorCourses: [],
      loading: 0,
      show: false,
      form: {
        assignmentName: "",
        assignmentCourse: "",
        assignmentDueDate: "",
        assignmentLateDate: "",
        acceptLateWork: true
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
  mounted() {

  },
  /*methods: {
    createAssignment() {
      this.$apollo.mutate({
        mutation: CREATE_ASSIGNMENT,
        variables: {
          assignmentName: this.form.assignmentName,
          assignmentCourse: this.form.assignmentCourse,
          assignmentDueDate: this.form.assignmentDueDate.toString(),
          assignmentLateDate: this.form.assignmentLateDate.toString()
        }
      }).then(response => {
        console.log(response)
        this.$router.push(`/assignment/${response.data.createAssignment._id}`)
      })
          .catch(doc => console.log(doc));
    }
  }*/
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.b-skeleton {
  background-color: var(--muted);
  opacity: 0.8;
}

.form-control.focus {
  background-color: var(--background) !important;
  color: var(--muted) !important;
  border-color: var(--primary) !important;
  outline: 0;
  box-shadow: 0 0 0 0.2rem var(--primary-dim) !important;
}

.form-control:focus {
  background-color: var(--background) !important;
  color: var(--muted) !important;
  border-color: var(--primary) !important;
  outline: 0;
  box-shadow: 0 0 0 0.2rem var(--primary-dim) !important;
}

.btn-primary.disabled, .btn-primary:disabled {
  color: var(--primary) !important;
  background-color: rgba(0, 0, 0, 0) !important;
  border-color: var(--primary) !important;
}

.b-icon {
  color: var(--text-color) !important;
}

.custom-control-label::before {
  background-color: var(--background) !important;
  border: var(--foreground-accent) solid 1px !important;
}

.custom-control-input:checked ~ .custom-control-label::before {
  background-color: var(--primary-dim) !important;
  border: var(--primary) solid 1px !important;
}

.custom-select {
  background-color: var(--background) !important;
  border: var(--border) !important;
  font-size: 1rem !important;
  font-weight: 400 !important;
  line-height: 1.5 !important;
}

.clr {
  padding: 1em;
  margin: 1em;
  background-color: var(--foreground);
  border: var(--border);
  box-shadow: var(--box-shadow);
}

.btn.btn-primary.btn-sm {
  padding: 0.25em 0.5em;
}

</style>
