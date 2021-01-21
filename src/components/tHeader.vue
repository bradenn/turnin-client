<template>
  <div class="header mb-4">
    <b-container>

      <div class="pt-3">
        <div class="d-flex justify-content-between mb-3">
          <div>
            <div class="card-subtitle mb-0">
              <slot name="breadcrumbs"></slot>
            </div>
            <span class="nested-title">{{ previous }} <span class="text-muted bold">/</span> <span
                class="bold">{{ current }}</span></span>

          </div>
          <div class="align-self-end">
            <component :is="button"></component>
          </div>
        </div>
        <b-nav tabs>
          <b-nav-item v-for="item in items" :key="item.path" :to="`${parent}${item.path}`" exact
                      exact-active-class="active">
            <i class="fa-fw mr-2" :class="item.icon"></i>{{ item.name }}
          </b-nav-item>
        </b-nav>
      </div>
    </b-container>
  </div>
</template>

<script>

export default {
  name: "t-header",
  props: {
    loading: Boolean,
    previous: String,
    current: String,
    button: Object,
    subtitle: String,
    items: Array,
    parent: String
  },
  data() {
    return {
      title: this.$router.currentRoute.name,
      comp: this.$route.meta.button,
    }
  },
  methods: {}
}
</script>

<style scoped>
.nested-title {
  color: var(--primary);
  font-size: 20px;
  font-weight: 400 !important;
  width: auto;
}

.back {
  margin-left: -1.5em;
  margin-bottom: -1.5em;
  display: inline;
}

.bold {
  font-weight: 700;
}

.header {

  background-color: var(--foreground);
  border-bottom: var(--border);
}
</style>
