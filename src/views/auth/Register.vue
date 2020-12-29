<template>
  <b-container>
    <b-row class="justify-content-md-center pt-5">
      <b-col cols="4"></b-col>
      <b-col cols="4">
        <h1 class="text-center pb-2"><i class="fas fa-code"></i>Turnin</h1>
        <b-card no-body id="loginForm">
          <b-form @submit="onSubmit">
            <div class="card-title">Register</div>
            <div class="card-subtitle">Sign up for a turnin account.</div>
            <b-form-group class="mb-2 d-block">
              <b-form-input type="text" name="username" v-model="form.username" placeholder="Username"/>
              <small class="text-muted">Your Institution username</small>
            </b-form-group>
            <b-form-group class="mb-2 d-block">
              <b-form-input type="text" name="email" v-model="form.email" placeholder="Email"/>
              <small class="text-muted">Your email will <strong>only</strong> be used for critical notifications.</small>
            </b-form-group>
            <b-form-group class="mb-2 d-block">
              <b-form-input type="text" name="firstname" v-model="form.firstname" placeholder="Firstname"/>
              <small class="text-muted">Your legal firstname</small>
            </b-form-group>
            <b-form-group class="mb-2 d-block">
              <b-form-input type="text" name="lastname" v-model="form.lastname" placeholder="Lastname"/>
              <small class="text-muted">Your legal last name</small>
            </b-form-group>
            <b-form-group class="mb-2 d-block">
              <b-form-input type="password" name="789897" v-model="form.password" placeholder="Password"/>
              <small class="text-muted">Think of something witty-- yet unique.</small>
            </b-form-group>
            <div class="d-flex justify-content-between">
              <a href="/login">Login</a>
              <div>
                <b-button type="submit" class="btn btn-primary">Register</b-button>
              </div>
            </div>
          </b-form>
        </b-card>
      </b-col>
      <b-col cols="4"></b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {

  name: 'Register',
  data() {
    return {
      form: {
        username: "",
        password: "",
        email: "",
        firstname: "",
        lastname: ""
      }
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      if (this.form.password.length > 0) {
        this.$http.post('http://localhost:3000/register', {
          username: this.form.username,
          password: this.form.password,
          email: this.form.email,
          firstname: this.form.firstname,
          lastname: this.form.lastname,
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

<style>
</style>
