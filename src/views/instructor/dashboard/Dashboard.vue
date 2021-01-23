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

const DEFAULT_TRANSITION = 'fade';
export default {
  name: 'Dashboard',
  components: {
    THeader,
  },
  data() {
    return {
      parent: `/dashboard/`,
      transitionName: DEFAULT_TRANSITION,
      navItems: [
        {name: "Overview", path: '', icon: "fas fa-layer-group"},
        {name: "Courses", path: 'courses', icon: "fas fa-asterisk"},
        {name: "Assignments", path: 'assignments', icon: "fas fa-book"},
        {name: "Students", path: 'students', icon: "fas fa-users"},
        {name: "Settings", path: 'settings', icon: "fas fa-cog"}
      ]
    }
  },
  created() {
    this.$router.beforeEach((to, from, next) => {
      let transitionName = to.meta.transitionName || from.meta.transitionName;

      if (transitionName === 'slide') {
        const toDepth = to.path.split('/').length;
        const fromDepth = from.path.split('/').length;
        transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
      }

      this.transitionName = transitionName;

      next();
    });
  },
  props: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
