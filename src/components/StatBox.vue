<template>
  <div style="width: 100%;">
    <b-card no-body style="width: 96%;">
      <div class="card-title">{{ title }}</div>
      <div class="card-subtitle" v-if="subtitle !== null">{{ subtitle }}</div>
      <div class="d-flex align-items-end">
        <h2 class="display-4 mb-0 mr-1 pb-0">{{ large }}</h2>
        <span>{{ units }}</span>
      </div>
    </b-card>
  </div>
</template>

<script>

export default {
  name: 'StatBox',
  props: {
    title: String,
    subtitle: String,
    large: String,
    units: String
  },
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user"))
    }
  }
}
</script>

<style>

</style>
