<template>
  <div>

    <Title
        :loading="loading"
        :titleOverride="getAssignment.assignmentName">
      <template slot="breadcrumb">

      </template>
    </Title>

    <b-form-row>
      <b-col cols="8">
        <t-card
            title="Required Files"
            subtitle="Students are expected to provide the following files."
            align-top>
          <template slot="button">
            <b-input-group size="sm" class="mt-3">
              <b-form-input placeholder="main.cpp"></b-form-input>
              <b-input-group-append>
                <b-button variant="secondary">Add File</b-button>
              </b-input-group-append>
            </b-input-group>
          </template>
          <template slot="body">
            <!--            <b-form-tags input-id="tags-basic" v-model="value"></b-form-tags>-->
            <div class="table-responsive mb-0">
              <b-table :fields="['fileName', 'options']" striped class="px-4" small
                       :items="[{fileName: 'main.cpp', options: 'Remove'}, {fileName: 'tree.cpp', options: 'Remove'}]"></b-table>
            </div>
          </template>
        </t-card>
      </b-col>
      <b-col cols="4">
        <t-card
            title="Assignment Settings"
            subtitle="Change basic assignment settings.">
          <template slot="body">
            <div class="d-flex justify-content-between">
              <div>Assigned</div>
              <b-form-checkbox v-model="getAssignment.assignmentIsAssigned" name="check-button"
                               switch></b-form-checkbox>
            </div>
            <hr>
            <div class="d-flex justify-content-between">
              <div>Allow Late Work</div>
              <b-form-checkbox name="check-button" switch></b-form-checkbox>
            </div>
            <hr>
            <div class="d-flex justify-content-between">
              <div>Due Date</div>
              {{ getAssignment.assignmentDueDate }}
            </div>
          </template>
        </t-card>
      </b-col>
      <b-col cols="8">
        <t-card
            title="Required Files"
            subtitle="Students are expected to provide the following files.">
        </t-card>
      </b-col>
      <b-col cols="4">
        <t-card
            title="Due Date"
            subtitle="">
          <template slot="body">
            <b-calendar value-as-date block label-help="" v-model="getAssignment.assignmentDueDate" locale="en">
            </b-calendar>
          </template>
        </t-card>
      </b-col>
    </b-form-row>

  </div>
</template>

<script>
import Title from "@/components/Title";
import gql from 'graphql-tag'
import tCard from "@/components/tCard";

const GET_ASSIGNMENT =
    gql`query assignment($assignmentId: String!){
          assignment(assignmentId: $assignmentId){
              assignmentName,
              assignmentCourse,
              assignmentIsAssigned,
              assignmentDueDate,
              dateCreated
          }
        }`;

export default {
  name: 'Courses',
  components: {
    Title,
    tCard
  },
  data() {
    return {
      getAssignment: {},
      loading: 0,
      error: "",
      show: false
    }
  },
  mounted() {
    this.loadCourse();
  },
  apollo: {
    getAssignment: {
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
.b-form-tags-input {
  color: var(--text-color)
}

.b-calendar-grid-help {
  background-color: var(--background);
}

.btn-primary.dropdown-toggle {
  background-color: var(--primary) !important;
}

</style>
