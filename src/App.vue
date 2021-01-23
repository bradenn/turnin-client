<template>
  <div id="app">
    <div v-if="$router.currentRoute.meta.requiresAuth">
      <Navbar></Navbar>
      <div class="container-fluid no-gutters">
        <div class="" id="content-view">
          <router-view></router-view>
          <div class="footer">
            <b-container>
              <div class="d-flex justify-content-between">
                <span class="text-muted">Copyright 2021 &copy; BNM</span>
                <div>
                  <b-link to="/legal/privacy" class="mr-2">privacy</b-link>
                  <b-link to="/legal/terms">terms</b-link>
                </div>
              </div>
            </b-container>
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
import Navbar from "@/components/Navbar";

export default {
  name: 'App',
  components: {
    Navbar,
  },
  data() {
    return {}
  },
  mounted() {
    let localTheme = localStorage.getItem('theme'); //gets stored theme value if any
    document.documentElement.setAttribute('data-theme', localTheme); // updates the data-theme attribute
  }

}
</script>

<style>
/*@import './assets/custom.css';*/

@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&display=swap');


html, body {
  font-family: 'Roboto Condensed', sans-serif;
  font-weight: 400 !important;
}


#content-view {
  width: 100%;
}

.no-gutters {
  padding-left: 0 !important;
  padding-right: 0 !important;
}
</style>
