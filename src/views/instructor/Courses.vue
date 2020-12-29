<template>
  <div>
    <Title>
      <b-link @click="show=true">New Course</b-link>
    </Title>
    <div class="table-responsive">
      <b-skeleton-table class="table " :rows="2" :columns="4" animation="fade" :table-props="{ striped: true }"
                        v-if="$apollo.loading">
      </b-skeleton-table>
      <b-table striped class="table" :items="instructorCourses" :fields="fields" show-empty v-else>
        <template #cell(courseName)="data">
          <b-link :href="`/course/${data.item._id }`">
          {{ data.item.courseName }}.{{ data.item.courseSection }}
          </b-link>
        </template>
        <template #empty="">
          <span>You do not have any courses.</span>
        </template>
      </b-table>
    </div>
    <b-modal
        v-model="show"
        title="Create Course">
      <form>
        <b-form-group
            description="Students will see this name."
            label="Course Name"
            label-for="input-1">
          <b-form-input id="input-1" v-model="form.courseName" placeholder="CSCI 101" trim></b-form-input>
        </b-form-group>
        <b-form-group
            description="Provided an identifier if the course name is reused."
            label="Course Section"
            label-for="input-1">
          <b-form-spinbutton id="demo-sb" class="" v-model="form.courseSection" min="1" max="20"></b-form-spinbutton>
        </b-form-group>
      </form>
      <template #modal-footer>
        <div class="d-flex justify-content-between align-items-baseline" style="width: 100%;">
          <div class="text-muted" v-if="form.courseName === ''">A course name is required.</div>
          <div></div>
          <div>
            <b-button type="submit" @click="createCourse" variant="primary" :disabled="form.courseName === ''">Create
              Course
            </b-button>
          </div>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import Title from "@/components/Title";
import gql from 'graphql-tag'

const GET_COURSES =
    gql`query instructorCourses{
          instructorCourses{
              courseName,
              courseSection,
              courseIsLocked,
              courseInstructor,
              _id
          }
        }`;
const CREATE_COURSE =
    gql`mutation createCourse($courseName: String!, $courseSection: Int!){
          createCourse(courseName: $courseName, courseSection: $courseSection){
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
      fields: ['courseName'],
      items: [],
      instructorCourses: {},
      loading: 0,
      show: false,
      form: {
        courseName: "", courseSection: 0
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
    createCourse() {
      this.$apollo.mutate({
        mutation: CREATE_COURSE,
        variables: {
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
  border: var(--bg-accent) solid 1px !important;
}

.custom-control-input:checked ~ .custom-control-label::before {
  background-color: var(--primary-dim) !important;
  border: var(--primary) solid 1px !important;
}
</style>
