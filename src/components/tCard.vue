<template>
  <b-aspect :aspect="aspect">
    <b-card no-body class="mb-3 px-3 pt-2 pb-3 h-100">
      <div class="d-flex justify-content-between" :class="top?'align-items-start':'align-items-end'">
        <div>
          <div class="card-title">{{ title }}</div>
          <div class="card-subtitle mb-2">{{ subtitle }}</div>

        </div>

        <div>
          <div class="mb-2 d-flex flex-column justify-content-between">
            <slot name="tagline"></slot>
            <slot name="button"></slot>
          </div>
        </div>
      </div>
      <slot name="body"></slot>
      <slot name="table"></slot>
    </b-card>
  </b-aspect>
</template>

<script>

export default {
  name: "t-card",
  props: {
    title: String,
    subtitle: String,
    aspect: String,
    loading: Boolean,
    top: Boolean
  },
  methods: {}
}
</script>

<style scoped>
.card-title {
  font-size: 1.5em;
  font-family: Roboto, sans-serif;
  font-weight: 500;
}

.card-subtitle {
  font-size: 1em;
  font-family: Roboto, sans-serif;
  font-weight: 400;
}
</style>
