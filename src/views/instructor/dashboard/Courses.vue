<template>
  <div>
    <b-form-row>
      <b-col cols="12">
        <t-card title="Courses"
                subtitle="The courses below belong to you, or have been shared with you.">
          <template slot="table">
            <b-table :items="instructorCourses" sort-by="test.name"
                     :fields="['name', 'description', 'students', 'assignments', 'options']"
                     class="justify-content-between"
                     small show-empty>
              <template #empty>
                No tests specified.
              </template>
              <template #cell(name)="data">
                {{ data.item.fullName }}
              </template>
              <template #cell(students)="data">
                {{ data.item.courseStudentCount }}
              </template>
              <template #cell(assignments)="data">
                {{ data.item.courseAssignmentCount }}
              </template>
              <template #cell(options)="data">
                <b-link :to="`/course/${data.item._id}`">Manage</b-link>
              </template>
            </b-table>
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
        name,
        fullName,
        section,
        description,
        courseStudentCount,
        courseAssignmentCount,
        locked,
        instructor{
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
      fields: ['name'],
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
        name: `${course.name}.${course.section}`,
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

.name {
  font-weight: bold;
  font-size: 1.15em;
  color: var(--primary);
}

a:hover {
  text-decoration: none !important;
  color: inherit !important;
}

</style>
