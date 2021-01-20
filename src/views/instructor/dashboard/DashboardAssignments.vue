<template>
  <div>
    <b-form-row>
      <b-col cols="12">
        <div class="mb-3">
          <h3>Your Assignments</h3>
          <span>The assignments below belong to you, or have been shared with you.</span>
        </div>
      </b-col>
      <b-col cols="8">
        <div v-for="course in instructorCourses" :key="course._id">
          <h5>{{ course.name }}.{{ course.section }}</h5>
          <div v-for="assignment in course.courseAssignments" :key="assignment._id">
            <b-link :to="`/assignment/${assignment._id}`">
              <b-card no-body class="mb-3 px-3 py-3">
                <div class="d-flex justify-content-between">
                  <div class="name">{{ assignment.name }}</div>
                  <div class="d-flex justify-content-start mr-n2">
                    <div class="mr-1 mr-2"><i class="fas fa-user fa-fw mr-1"></i>
                      <b-badge pill variant="primary" class="badge-top-right">12</b-badge>
                    </div>
                    <div class="mr-1"><i class="fas fa-book fa-fw mr-1"></i>
                      <b-badge pill variant="primary" class="badge-top-right">16</b-badge>
                    </div>
                  </div>
                </div>

                <div class="mb-2">{{ assignment.assignmentDescription || 'No Description' }}</div>

              </b-card>
            </b-link>
          </div>
        </div>
      </b-col>
    </b-form-row>

    <b-modal
        v-model="show"
        title="Create Assignment">
      <form>
        <b-form-group
            description="Students will see this name."
            label="Assignment Name"
            label-for="input-1">
          <b-form-input id="input-1" v-model="form.name" placeholder="Lab 1" trim></b-form-input>
        </b-form-group>
        <b-form-group
            description="Choose a course to assign to."
            label="Assignment Course"
            label-for="input-1">
          <b-form-select v-model="form.course">
            <b-form-select-option v-for="course in instructorCourses" :key="course._id" :value="course._id">
              {{ course.name }}.{{ course.section }}
            </b-form-select-option>
          </b-form-select>
        </b-form-group>
        <b-form-group
            :description="form.due.toString()"
            label="Assignment due date."
            label-for="due">
          <b-form-datepicker id="due" v-model="form.due" :value-as-date="true"
                             class="mb-2"></b-form-datepicker>
        </b-form-group>
        <b-form-group
            description="Provided an identifier if the course name is reused."
            label="Assignment late due date."
            label-for="late">
          <b-form-datepicker id="late" v-model="form.late" :value-as-date="true"
                             class="mb-2"></b-form-datepicker>
        </b-form-group>

      </form>
      <template #modal-footer>
        <div class="d-flex justify-content-between align-items-baseline" style="width: 100%;">
          <div class="text-muted" v-if="form.name === ''">A course name is required.</div>
          <div></div>
          <div>
            <b-button type="submit" @click="createAssignment" variant="primary" :disabled="form.name === ''">
              Create
              Course
            </b-button>
          </div>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>

import gql from 'graphql-tag'

const GET_COURSES = gql`
query instructorCourses{
    instructorCourses{
        name,
        section,
        courseAssignments {
            _id,
            name,
            due,
            late
        },
        locked,
        instructor {
        _id
        },
        _id
    }
}`;

const CREATE_ASSIGNMENT = gql`
mutation createAssignment($assignmentName: String!, $assignmentCourse: String!, $assignmentDueDate: String!, $assignmentLateDate: String!){
    createAssignment(name: $assignmentName, course: $assignmentCourse, due: $assignmentDueDate, late: $assignmentLateDate){
      _id,
      course
    }
}`;

export default {
  name: 'Courses',
  components: {},
  data() {
    return {
      fields: ['name'],
      items: [],
      instructorCourses: [],
      loading: 0,
      show: false,
      form: {
        name: "",
        course: "",
        due: "",
        late: "",
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
  methods: {
    createAssignment() {
      this.$apollo.mutate({
        mutation: CREATE_ASSIGNMENT,
        variables: {
          name: this.form.name,
          course: this.form.course,
          due: this.form.due.toString(),
          late: this.form.late.toString()
        }
      }).then(response => {
        console.log(response)
        this.$router.push(`/assignment/${response.data.createAssignment._id}`)
      })
          .catch(doc => console.log(doc));
    }
  }
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


.clr {
  padding: 1em;
  margin: 1em;
  background-color: var(--foreground);
  border: var(--border);
  box-shadow: var(--bs);
}
</style>
