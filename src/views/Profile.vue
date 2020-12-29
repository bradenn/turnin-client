<template>
  <div>
    <Title></Title>
    <b-card no-body id="loginForm">
      <b-form @submit="onSubmit">
        <div class="card-title">Your Profile</div>
        <div class="card-subtitle">View or update your profile information.</div>
        <b-form-group id="fieldset-horizontal"
                      label-cols-sm="4"
                      label-cols-lg="3"
                      content-cols-sm="8"
                      content-cols-lg="9"
                      description="Your username cannot be changed without admin intervention."
                      label="Username"
                      label-for="input-horizontal">
          <b-form-input type="text" v-model="form.username" disabled :placeholder="form.username"/>
        </b-form-group>
        <b-form-group id="fieldset-horizontal"
                      label-cols-sm="4"
                      label-cols-lg="3"
                      content-cols-sm="8"
                      content-cols-lg="9"
                      description="Email is only used for critical notifications."
                      label="Email"
                      label-for="input-horizontal">
          <b-form-input type="text" v-model="form.email" :placeholder="form.email"/>
        </b-form-group>
        <div class="d-flex justify-content-end">
          <div>
            <b-button type="submit" class="btn btn-primary">Save Changes</b-button>
          </div>
        </div>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import Title from "@/components/Title";
export default {
  name: 'Profile',
  components: {
    Title
  },
  data() {
    let user = this.$user()
    return {
      changed: false,
      form: {
        username: user.username,
        email: user.email,
      }
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      if (this.form.email !== this.$user.email) {
        let query = `mutation {
          updateUser(sessionId: ${this.$token()})
        }`;
        this.$http.post(process.env.SERVER, {
          query: query
        }).then(res => {
          this.form = res.data.data;
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
