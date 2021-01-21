<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand mr-0" href="/dashboard">
        <span class="text-light ml-2 " style="font-family: JetBrainsMonoBold, monospace;">
        <span style="letter-spacing: -2px;">&lt;&#47;&gt;</span>&nbsp;Turnin</span>
      </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText"
              aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-between" id="navbarText">
        <ul class="navbar-nav">
                    <li class="nav-item">
                      <b-link to="/dashboard" active-class="active" exact class="nav-link">Dashboard</b-link>
                    </li>
          <li class="nav-item">
            <b-link to="/submit" active-class="active" exact class="nav-link">Submit</b-link>
          </li>
        </ul>
        <ul class="navbar-nav mr-0">
          <li class="nav-item">
            <a @click="toggleTheme" class="nav-link">
              <span class="fa-stack nav-stack"
                    style="vertical-align: top;">
                                  <i class="fas fa-circle fa-stack-2x"></i>
                                  <i class="fas fa-stack-1x fa-inverse"
                                     :class="theme === 'dark'?'fa-sun':'fa-moon'"></i>
                                </span>
            </a>
          </li>
          <li class="nav-item d-flex">
            <a @click="show = true" class="nav-link"> <span class="fa-stack nav-stack"
                                                                             style="vertical-align: top;">
                                  <i class="fas fa-circle fa-stack-2x"></i>
                                  <i class="fas fa-plus fa-stack-1x fa-inverse"></i>
                                </span></a>
          </li>
          <li class="nav-item d-flex">
            <a @click="toggleTheme" class="nav-link"> <span class="fa-stack nav-stack"
                                                            style="vertical-align: top;">
                                  <i class="fas fa-circle fa-stack-2x"></i>
                                  <i class="fas fa-bell fa-stack-1x fa-inverse"></i>
                        </span><span class="badge badge-pill badge-primary notifications">0</span></a>
          </li>
          <b-nav-item-dropdown right>
            <template #button-content>
                 <span class="fa-stack nav-stack" style="vertical-align: top;">
                                  <i class="fas fa-circle fa-stack-2x"></i>
                                  <i class="fas fa-user fa-stack-1x fa-inverse"></i>
                                </span>{{ user.username }}
            </template>
            <b-dropdown-item href="/profile">
              <i class="fas fa-user fa-fw mr-2"></i>Profile
            </b-dropdown-item>
            <b-dropdown-item href="/logout">
              <i class="fas fa-sign-out-alt fa-fw mr-2"></i>Logout
            </b-dropdown-item>
          </b-nav-item-dropdown>
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
}

.nav-item .nav-link {
  color: var(--nav-muted) !important;
}
</style>
