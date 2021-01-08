<template>
  <div>
    <t-header
        :loading="false"
        previous="Dashboard"
        :current="this.$route.meta.title"
        subtitle=""
        :parent="parent"
        :button="this.$route.meta.button"
        :items="navItems">
    </t-header>
    <b-container>
      <router-view></router-view>
    </b-container>
  </div>
</template>

<script>
import THeader from "@/components/tHeader";


export default {
  name: 'Dashboard',
  components: {
    THeader,
  },
  data() {
    return {
      parent: `/dashboard/`,
      navItems: [
        {name: "Overview", path: '', icon: "fas fa-layer-group"},
        {name: "Courses", path: 'courses', icon: "fas fa-asterisk"},
        {name: "Assignments", path: 'assignments', icon: "fas fa-book"},
        {name: "Students", path: 'students', icon: "fas fa-users"},
        {name: "Settings", path: 'settings', icon: "fas fa-cog"}
      ]
    }
  },
  props: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
