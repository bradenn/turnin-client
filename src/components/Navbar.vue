<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="/dashboard"><i class="fas fa-code"></i>&nbsp;Turnin | CSUChico</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText"
              aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarText">
        <ul class="navbar-nav mr-0">
          <li class="nav-item d-flex">
            <a data-toggle="modal" href="#joinClass" class="nav-link"> <span class="fa-stack nav-stack"
                                                                             style="vertical-align: top;">
                                  <i class="fas fa-circle fa-stack-2x"></i>
                                  <i class="fas fa-plus fa-stack-1x fa-inverse"></i>
                                </span></a>
          </li>
          <li class="nav-item d-flex">
            <a href="/toggledarkmode" class="nav-link"> <span class="fa-stack nav-stack"
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
      user: JSON.parse(localStorage.getItem("user"))
    }
  }
}
</script>

<style>

</style>
