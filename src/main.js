import Vue from 'vue'
import App from './App.vue'
import Axios from 'axios'
import router from './router'
import BV from 'bootstrap-vue'
import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloLink } from 'apollo-link'
import VueApollo from 'vue-apollo'

import './assets/turnin.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@fortawesome/fontawesome-free/css/all.css'
import './assets/custom.css'

Vue.config.productionTip = false

Vue.prototype.$http = Axios;
Vue.prototype.$user = () => JSON.parse(localStorage.getItem("user"));
Vue.prototype.$token = () => localStorage.getItem("token");
Vue.use(BV)

document.title = "Turnin"

const server = "localhost:3000";

const httpLink = new HttpLink({ uri: `http://${server}/graphql` })

let token = localStorage.getItem("token")

const middlewareLink = new ApolloLink((operation, forward) => {
    operation.setContext({
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
        }
    })
    return forward(operation)
})

const httpLinkAuth = middlewareLink.concat(httpLink)

// apollo client setup
const client = new ApolloClient({
    link: httpLinkAuth,
    cache: new InMemoryCache(),
    connectToDevTools: true
})


Vue.use(VueApollo)

const apolloProvider = new VueApollo({
    defaultClient: client
})

new Vue({
    render: h => h(App),
    router,
    apolloProvider,
    data: {
        token
    }
}).$mount('#app')

