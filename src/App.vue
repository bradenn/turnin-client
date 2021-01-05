<template>
  <div id="app">
    <div v-if="$router.currentRoute.meta.requiresAuth">
      <div class="grid-fluid">
        <SideBar></SideBar>
        <div class="d-flex justify-content-start">
          <div class="mx-3" id="content-view">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
/*import Navbar from "@/components/Navbar"*/
import SideBar from "@/components/Sidebar"

export default {
  name: 'App',
  components: {
    SideBar
  }
}
</script>

<style>
@import './assets/custom.css';
@import url('https://fonts.googleapis.com/css?family=Roboto');
html, body {
  font-family: 'Roboto', sans-serif;
}
#content-view {
  width: 100%;
  max-width: 1600px;
}
</style>
