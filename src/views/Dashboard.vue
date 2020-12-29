<template>
  <div>
    <Title></Title>
    <div class="d-flex justify-content-between">
      <StatBox title="Assignments" subtitle="Currently assigned" large="4" units="assignments"></StatBox>
      <StatBox></StatBox>
      <StatBox></StatBox>
    </div>
  </div>
</template>

<script>
import Title from "@/components/Title";
import StatBox from "@/components/StatBox";

export default {
  name: 'Dashboard',
  components: {
    Title,
    StatBox
  },
  props: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
