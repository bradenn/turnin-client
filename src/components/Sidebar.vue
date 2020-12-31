<template>
  <div class="menu">

    <a href="/profile" class="no-bs">
      <div class="d-flex align-items-center">
        <div class="mr-2 pl-0">
          <span class="fa-stack nav-stack fa-1x" style="font-size: 1.3em;">
            <i class="fas fa-circle fa-stack-2x"></i>
            <i class="fas fa-user fa-stack-1x fa-inverse"></i>
          </span>
        </div>
        <div>
          <div class="mb-0 pb-0 align-items-center">
            <strong>
              {{ user.firstname }} {{ user.lastname }}
            </strong>
          </div>
          <div class="text-muted mt-0 pt-0">{{ user.account }}</div>
        </div>
      </div>
    </a>
    <hr>
    <ul class="list-group menu-list">
      <SidebarMenuItem name="Dashboard" link="/dashboard" icon="fas fa-home"></SidebarMenuItem>
      <SidebarMenuItem name="Assignments" link="/assignments" icon="fas fa-file-invoice"></SidebarMenuItem>
      <SidebarMenuItem name="Templates" link="/templates" icon="fas fa-file-archive"></SidebarMenuItem>
      <SidebarMenuItem name="Courses" link="/courses" icon="fas fa-users-cog"></SidebarMenuItem>
    </ul>
    <hr>
    <span class="navbar-text">My Courses</span>

    <ul class="list-group menu-list" v-for="course in instructorCourses" :key="course._id">

      <SidebarMenuItem :name="`${course.courseName}.${course.courseSection}`" link="/courses"
                       icon="fas fa-users"></SidebarMenuItem>

        <ul class="list-group menu-list pl-3" v-for="assignment in course.courseAssignments" :key="assignment._id">
          <SidebarMenuItem :name="`${assignment.assignmentName}`" :link="`/assignment/${assignment._id}`"
                           icon="fas fa-file"></SidebarMenuItem>
        </ul>

    </ul>


    <div class="menu-bottom">
      <div class="d-flex justify-content-between">
        <div>
          <div class="align-items-center">
                    <span data-toggle="tooltip" data-placement="top" title="Container: "><i
                        class="fas fa-code"></i>&nbsp;Turnin v</span><br>
            <span class="text-muted">Copyright &copy; <a href="https://www.bradenn.com"
                                                         class="no-bs">BN Media</a> {{
                new Date().getFullYear()
              }}</span>
          </div>
        </div>
        <div class="">


        </div>
      </div>

    </div>
  </div>
</template>

<script>

import SidebarMenuItem from "@/components/SidebarMenuItem";
import gql from "graphql-tag";

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
        courseInstructor,
        _id
    }
}`;

export default {
  name: 'Sidebar',
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
      instructorCourses: [],
      loading: 0,
    }
  },
  components: {
    SidebarMenuItem
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
  props: {
    items: [
      {
        itemName: "Dashboard",
        itemIcon: "fas fa-code"
      }
    ]
  }
}
</script>

<style>

</style>
