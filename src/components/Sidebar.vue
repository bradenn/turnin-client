<template>
  <div class="menu">

    <a href="/profile" class="no-bs">
      <div class="d-flex align-items-center">
        <div class="mr-2 pl-0">
          <span class="fa-stack nav-stack fa-1x" style="font-size: 1.3em;">
            <i class="fas fa-circle fa-stack-2x"></i>
            <i class="fas fa-user fa-stack-1x fa-inverse"></i>
          </span>
        </div>
        <div>
          <div class="mb-0 pb-0 align-items-center">
            <strong>
              {{ user.firstname }} {{ user.lastname }}
            </strong>
          </div>
          <div class="text-muted mt-0 pt-0">{{ user.account }}</div>
        </div>
      </div>
    </a>
    <hr>
    <ul class="list-group menu-list">
      <SidebarMenuItem name="Dashboard" link="/dashboard" icon="fas fa-home"></SidebarMenuItem>
      <SidebarMenuItem name="Assignments" link="/assignments" icon="fas fa-file-invoice"></SidebarMenuItem>
      <SidebarMenuItem name="Templates" link="/templates" icon="fas fa-file-archive"></SidebarMenuItem>
      <SidebarMenuItem name="Courses" link="/courses" icon="fas fa-users-cog"></SidebarMenuItem>
    </ul>


    <div class="menu-bottom">
      <div class="d-flex justify-content-between">
        <div>
          <div class="align-items-center">
                    <span data-toggle="tooltip" data-placement="top" title="Container: "><i
                        class="fas fa-code"></i>&nbsp;Turnin v</span><br>
            <span class="text-muted">Copyright &copy; <a href="https://www.bradenn.com"
                                                         class="no-bs">BN Media</a> {{
                new Date().getFullYear()
              }}</span>
          </div>
        </div>
        <div class="">


        </div>
      </div>

    </div>
  </div>
</template>

<script>

import SidebarMenuItem from "@/components/SidebarMenuItem";

export default {
  name: 'Sidebar',
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user"))
    }
  },
  components: {
    SidebarMenuItem
  },
  props: {
    items: [
      {
        itemName: "Dashboard",
        itemIcon: "fas fa-code"
      }
    ]
  }
}
</script>

<style>

</style>
