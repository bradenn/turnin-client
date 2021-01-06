<template>
  <div>
    <span class="text-muted">
          <b-link href="/dashboard">Dashboard</b-link> / <b-link :href="prevLink">{{prev}}</b-link> / {{page}}
    </span>
  </div>
</template>

<script>

export default {
  name: "t-breadcrumbs",
  props: {
    prevLink: String,
    prev: String,
    page: String
  },
  methods: {}
}
</script>

<style scoped>
.card {
  background-color: var(--foreground);
  border: var(--border);
  box-shadow: var(--box-shadow);
}
</style>
