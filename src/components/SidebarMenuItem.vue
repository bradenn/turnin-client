<template>
  <li class="list-group-item menu-list-item" :class="isActive()">
    <a :href="link" class="menu-link">
      <div class="d-flex justify-content-between">
        <span><i class="fa-fw mr-2" :class="icon"></i>&nbsp;{{ name }}</span>
      </div>
    </a>
  </li>
</template>

<script>
export default {
  name: "SidebarMenuItem",
  props: {
    link: String,
    icon: String,
    name: String
  },
  methods: {
    isActive(){
      return (this.$router.currentRoute.path === this.$props.link)?'active':'';
    }
  }
}
</script>

<style>
.mr-2 {
  margin-right: 0.5em;
}
</style>
