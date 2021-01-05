<template>
  <div class="mt-3 mb-3">
    <div class="d-flex justify-content-between">
      <div>
        <h2 class="mb-0"><span v-if="titleOverride">{{titleOverride}}</span><span v-else>{{ title }}</span></h2>
        <div class="card-subtitle mb-0" v-if="subtitle">{{subtitle}}</div>
        <t-breadcrumbs v-if="breadcrumbs"></t-breadcrumbs>
      </div>
      <div class="align-self-end d-flex">
      </div>
    </div>
    <hr>
  </div>
</template>

<script>

import TBreadcrumbs from "@/components/tBreadCrumbs";
export default {
  name: "Title",
  components: {TBreadcrumbs},
  props: {
    titleOverride: String,
    subtitle: String,
    breadcrumbs: Boolean
  },
  data() {
    return {
      title: this.$router.currentRoute.name
    }
  },
  methods: {}
}
</script>

<style>

</style>
