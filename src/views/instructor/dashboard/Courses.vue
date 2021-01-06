<template>
  <div>

    <b-form-row>
      <b-col cols="8">
        <div class="table-responsive mb-0 ">
          <b-skeleton-table class="table " :rows="2" :columns="4" animation="fade" :table-props="{ striped: true }"
                            v-if="$apollo.loading">
          </b-skeleton-table>
          <b-table small class="table" :items="instructorCourses"
                   :fields="['courseName']"
                   show-empty v-else>

            <template #cell(courseName)="data">
              <b-link :to="`/course/${data.item._id}`">{{ data.item.courseName }}.{{ data.item.courseSection }}</b-link>
            </template>

            <template #empty="">
              <span>This course does not have any assignments.</span>
            </template>
          </b-table>
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



export default {
  name: 'Courses',
  components: {TCard},
  data() {
    return {
      fields: ['courseName'],
      items: [],
      instructorCourses: [],
      loading: 0,

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
