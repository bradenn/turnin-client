<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand mr-0" href="/dashboard">
        <span class="text-light ml-2 " style="font-family: JetBrainsMono;">turn->in</span>
      </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText"
              aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-between" id="navbarText">
        <ul class="navbar-nav">
          <li class="nav-item d-flex align-items-center mr-n1">
            <div class="v-sep"></div>
          </li>
          <li class="nav-item">
            <b-link to="/dashboard" active-class="active" exact class="nav-link">Dashboard</b-link>
          </li>
          <li class="nav-item">
            <b-link to="/submit" active-class="active" exact class="nav-link">Courses</b-link>
          </li>

          <li class="nav-item">
            <b-link to="/submit" active-class="active" exact class="nav-link">Assignments</b-link>
          </li>

          <li class="nav-item">
            <b-link to="/submit" active-class="active" exact class="nav-link">Students</b-link>
          </li>
        </ul>
        <ul class="navbar-nav mr-0">
          <li class="nav-item">
            <a @click="toggleTheme" class="nav-link">
              <span class="fa-stack nav-stack"
                    style="vertical-align: top;">
                                  <i class="fas fa-circle fa-stack-2x"></i>

                                </span>
            </a>
          </li>
          <li class="nav-item my-auto">
            <b-dropdown size="sm" right>
              <template #button-content>
                <b-icon-person class="mr-1"></b-icon-person>
                {{ user.username }}
              </template>
              <b-dropdown-item href="/profile">
                <b-icon-card-checklist class="mr-2"></b-icon-card-checklist>
                Profile
              </b-dropdown-item>
              <b-dropdown-divider></b-dropdown-divider>
              <b-dropdown-item @click="toggleTheme">
                <b-icon-moon class="mr-2" v-if="theme !== 'dark'"></b-icon-moon>
                <b-icon-sun class="mr-2" v-else></b-icon-sun>
                Enter {{ theme === 'dark' ? 'Light' : 'Dark' }} Mode
              </b-dropdown-item>
              <b-dropdown-item href="/logout">
                <i class="fas fa-sign-out-alt fa-fw mr-2"></i>Logout
              </b-dropdown-item>
            </b-dropdown>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>

export default {
  name: 'Navbar',
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
      theme: localStorage.getItem('theme')
    }
  },
  mounted() {
    document.documentElement.setAttribute('data-theme', this.theme);
  },
  methods: {
    toggleTheme() {
      this.theme = this.theme === 'dark' ? '' : 'dark'; //toggles theme value
      document.documentElement.setAttribute('data-theme', this.theme); // updates the data-theme attribute
      localStorage.setItem('theme', this.theme); // stores theme value in local storage
    }
  }
}
</script>

<style scoped>
.navbar .nav-link {
  font-weight: 400;
}

.nav-item .nav-link.active {
  color: var(--nav-text) !important;
  position: relative;
}


.nav-item .nav-link {
  color: var(--nav-muted) !important;
}
</style>
