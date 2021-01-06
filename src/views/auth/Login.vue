<template>
  <b-container>
    <b-row class="justify-content-md-center pt-5">
      <b-col cols="4"></b-col>
      <b-col cols="4">
        <h1 class="text-center pb-2"><i class="fas fa-code"></i>Turnin</h1>
        <t-card
        title="Login"
        subtitle="Sign in with your username and password.">
          <template slot="body">
            <b-form @submit="onSubmit">
              <b-form-group class="mb-2 d-block">
                <b-form-input type="text" v-model="form.username" placeholder="Username"/>
                <small class="text-muted">Your CSU Chico username</small>
              </b-form-group>
              <b-form-group class="mb-2 d-block">
                <b-form-input type="password" v-model="form.password" placeholder="Password"/>
              </b-form-group>
              <div class="d-flex justify-content-between">
                <a href="/register">Create account</a>
                <div>
                  <b-button type="submit" class="btn btn-primary">Login</b-button>
                </div>
              </div>
            </b-form>
          </template>
        </t-card>
      </b-col>
      <b-col cols="4"></b-col>
    </b-row>
  </b-container>
</template>

<script>

import TCard from "@/components/tCard";
export default {
  components: {TCard},
  data() {
    return {
      form: {
        username: "",
        password: ""
      }
    }
  },
  methods: {
    onSubmit(event) {

      event.preventDefault()
      if (this.form.password.length > 0) {

        this.$http.post('http://localhost:3000/auth/login', {
          username: this.form.username,
          password: this.form.password
        }).then(response => {
          console.log(response)
          let isAdmin = response.data.user.account === "instructor";
          localStorage.setItem('user', JSON.stringify(response.data.user))
          localStorage.setItem('token', response.data.token)

          if (localStorage.getItem('token') != null) {
            this.$emit('loggedIn')
            if (this.$route.params.nextUrl != null) {
              this.$router.push(this.$route.params.nextUrl)
            } else {
              if (isAdmin) {
                this.$router.push('instructor')
              } else {
                this.$router.push('dashboard')
              }
            }
          }
        }).catch(error => {
          console.error(error);
        });
      }
    }
  }
}
</script>

<style scoped>
#loginForm {
  max-width: 400px;
}
</style>
