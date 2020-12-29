<template>
  <div id="app">
    <div v-if="$router.currentRoute.meta.requiresAuth">
      <Navbar></Navbar>
      <div class="grid-fluid">
        <SideBar></SideBar>
        <div class="mx-3" id="content-view">
          <router-view></router-view>
        </div>
      </div>
    </div>
    <div v-else>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar"
import SideBar from "@/components/Sidebar"

export default {
  name: 'App',
  components: {
    SideBar,
    Navbar
  }
}
</script>

<style>
@import './assets/custom.css';

#content-view {
  max-width: 1200px;
}
</style>
