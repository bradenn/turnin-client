<template>
  <div>
    <b-button variant="primary" size="sm" @click="show = true">New Course</b-button>
    <b-modal
        v-model="show"
        title="Create Course">
      <form>
        <b-form-group
            description="Students will see this name."
            label="Course Name"
            label-for="input-1">
          <b-form-input id="input-1" v-model="form.courseName" placeholder="Lab 1" trim></b-form-input>
        </b-form-group>
        <b-form-group
            description="Use a section number to differentiate between duplicate classes."
            label="Course Section"
            label-for="input-1">
          <b-form-spinbutton id="demo-sb" v-model="form.courseSection" min="0" max="100"></b-form-spinbutton>
        </b-form-group>
      </form>
      <template #modal-footer>
        <div class="d-flex justify-content-between align-items-baseline" style="width: 100%;">
          <div class="text-muted" v-if="form.courseName === ''">A course name is required.</div>
          <div></div>
          <div>
            <b-button type="submit" @click="createCourse" variant="primary" :disabled="form.courseName === ''">
              Create Course
            </b-button>
          </div>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
import gql from "graphql-tag";


const CREATE_COURSE = gql`
mutation createCourse($courseInput: CourseInput!){
    createCourse(courseInput: $courseInput){
      _id
    }
}`;



export default {
  name: 'Courses',
  components: {

  },
  data() {
    return {
      show: false,

      form: {
        courseName: "",
        courseSection: 0
      }
    }
  },
  methods: {
    createCourse() {
      this.$apollo.mutate({
        mutation: CREATE_COURSE,
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
