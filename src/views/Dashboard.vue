<template>
  <div>
    <Title></Title>
    <b-form-row>
      <b-col cols="8">
        <t-card
            title="Upcoming Assignments"
            subtitle="Assignments due in the next two weeks.">
          <template slot="body">

          </template>
        </t-card>
      </b-col>
      <b-col cols="4">dd</b-col>
    </b-form-row>
  </div>
</template>

<script>
import Title from "@/components/Title";
import TCard from "@/components/tCard";

export default {
  name: 'Dashboard',
  components: {
    TCard,
    Title
  },
  props: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
