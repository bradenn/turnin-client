<template>
  <div class="header mb-4">
    <b-container>
      <div class="pt-3">
        <div class="d-flex justify-content-between mb-2">
          <div>
            <div class="d-flex justify-content-start">
              <b-button-toolbar v-if="back">
                <b-button size="sm" :to="back" class="mr-2">
                  <b-icon-arrow-left></b-icon-arrow-left>
                </b-button>
              </b-button-toolbar>
              <div class="nested-title">{{ previous }} <span class="text-muted bold">/</span> <span
                  class="bold">{{ current }}</span></div>
            </div>


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
    back: String,
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
