<template>
  <div>
    <b-form-row>
      <b-col cols="12">
        <div class="mb-3">
          <h3>Your Courses</h3>
          <span>The courses below belong to you, or have been shared with you.</span>
        </div>
      </b-col>
      <b-col cols="8">
        <div v-for="course in instructorCourses" :key="course._id">
          <b-link :to="`/course/${course._id}`">
            <b-card no-body class="mb-3 px-3 py-3">
              <div class="d-flex justify-content-between">
                <div class="courseName">{{ course.courseName }}.{{ course.courseSection }}</div>
                <div class="d-flex justify-content-start mr-n2">
                  <div class="mr-1 mr-2"><i class="fas fa-user fa-fw mr-1"></i>
                    <b-badge pill variant="primary" class="badge-top-right">{{ course.courseStudentCount }}</b-badge>
                  </div>
                  <div class="mr-1"><i class="fas fa-book fa-fw mr-1"></i>
                    <b-badge pill variant="primary" class="badge-top-right">{{ course.courseAssignmentCount }}</b-badge>
                  </div>
                </div>
              </div>

              <div class="mb-2">{{ course.courseDescription }}</div>

            </b-card>
          </b-link>
        </div>
      </b-col>
      <b-col cols="4">
        <t-card
            title="Statistics"
            subtitle="Aggregated information about your courses.">
          <template slot="body">
            <div class="d-flex justify-content-between">
              <span>Total Students</span>
              <strong>123</strong>
            </div>
            <hr>
          </template>
        </t-card>
      </b-col>
    </b-form-row>

  </div>


</template>

<script>
import gql from 'graphql-tag'
import TCard from "@/components/tCard";

const GET_COURSES = gql`
query instructorCourses{
    instructorCourses{
        courseName,
        courseSection,
        courseDescription,
        courseStudentCount,
        courseAssignmentCount,
        courseIsLocked,
        courseInstructor{
            _id
        },
        _id
    }
}`;


export default {
  name: 'Courses',
  components: {TCard},
  data() {
    return {
      fields: ['courseName'],
      items: [],
      instructorCourses: [],
      loading: 0,
      courseList: []
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
    this.courseList = this.instructorCourses.map(course => {
      return {
        name: `${course.courseName}.${course.courseSection}`,
        link: `/course/${course._id}`,
        key: course._id
      }
    });
  },
  methods: {}
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

.courseName {
  font-weight: bold;
  font-size: 1.15em;
  color: var(--primary);
}

a:hover{
  text-decoration: none !important;
  color: inherit !important;
}

</style>
