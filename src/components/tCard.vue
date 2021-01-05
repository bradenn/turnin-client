<template>
    <b-card no-body class="mb-3 px-3 pt-2 pb-3">
      <div class="d-flex justify-content-between" :class="top?'align-items-start':'align-items-end'">
        <div>
          <div class="card-title">{{ title }}</div>
          <div class="card-subtitle mb-2">{{ subtitle }}</div>
        </div>
        <div>
          <div class="mb-2">
            <slot name="button"></slot>
          </div>
        </div>
      </div>
      <slot name="body"></slot>
    </b-card>
</template>

<script>

export default {
  name: "t-card",
  props: {
    title: String,
    subtitle: String,
    loading: Boolean,
    top: Boolean
  },
  methods: {}
}
</script>

<style scoped>
.card {
  background-color: var(--bg);
  border: var(--border);
  box-shadow: var(--box-shadow);
}
</style>
