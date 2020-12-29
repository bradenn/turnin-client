<template>
  <div class="mt-3 mb-3">
    <div class="d-flex justify-content-between">
      <div>
        <h2 class="mb-0"><span v-if="titleOverride">{{titleOverride}}</span><span v-else>{{ title }}</span></h2>
        <div class="card-subtitle mb-0" v-if="subtitle">{{subtitle}}</div>
      </div>
      <div class="align-self-end d-flex">
        <slot></slot>
      </div>
    </div>
    <hr>
  </div>
</template>

<script>

export default {
  name: "Title",
  props: {
    titleOverride: String,
    subtitle: String
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
