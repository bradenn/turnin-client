<template>
  <div class="menu">
    <div class="d-flex align-items-center pr-3">
      <b-img src="/logo.png" width="36"></b-img>
      <h4 class="sidebar-title mb-0 ml-3">Turnin</h4>
    </div>
    <hr>
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
                        class="fas fa-code"></i>&nbsp;Turnin v3.0.2</span><br>
            <span class="text-muted">Copyright &copy; <a href="https://www.bradenn.com"
                                                         class="no-bs">BN Media</a> 2019 - {{
                new Date().getFullYear()
              }}</span><br>
            <b-link href="/legal/privacy">privacy</b-link>&nbsp;
            <b-link href="/legal/terms">terms</b-link>
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
      user: this.$user(),
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
      loadingKey: 'loading'
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
.sidebar-title{
  font-family: 'Roboto', sans-serif;
  font-weight: 600;
  font-size: 1.75em;
  line-height: 36px;

}
</style>
