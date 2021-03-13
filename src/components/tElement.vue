<template>
  <div v-for="item in sortedList" :key="item._id">
    <template slot="item">
    </template>
  </div>
</template>

<script>

export default {
  name: "t-element",
  props: {
    items: [],
    sortedList: this.items.sort((a, b) => a[this.sortBy] - b[this.sortBy]),
    sortBy: String,
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
