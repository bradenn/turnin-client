import Vue from 'vue'
import App from './App.vue'
import Axios from 'axios'
import router from './router'
import {BootstrapVue, BootstrapVueIcons} from 'bootstrap-vue'
import {ApolloClient} from 'apollo-client'
import {InMemoryCache} from 'apollo-cache-inmemory'
import {ApolloLink} from 'apollo-link'
import VueApollo from 'vue-apollo'
import {createUploadLink} from 'apollo-upload-client'
import VueCodemirror from 'vue-codemirror'


import './assets/turnin.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@fortawesome/fontawesome-free/css/all.css'
import './assets/custom.css'
import '../public/highlight.min.css'
import '../node_modules/codemirror/lib/codemirror.css'
import '../public/one-dark.css'
import '../public/one-light.css'
import '../node_modules/codemirror/mode/clike/clike'
import '../node_modules/codemirror/mode/diff/diff'

Vue.config.productionTip = false

Vue.prototype.$http = Axios;
Vue.prototype.$user = () => JSON.parse(localStorage.getItem("user"));
Vue.prototype.$token = () => localStorage.getItem("token");

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueCodemirror)

document.title = "Turnin"

const server = "localhost:3000";


/*const httpLink = new HttpLink({ uri: `http://${server}/graphql` })*/

let token = localStorage.getItem("token")

const middlewareLink = new ApolloLink((operation, forward) => {
    operation.setContext({
        headers: {
            Authorization: token ? `Bearer ${token}` : "",
        }
    })
    return forward(operation)
})

/*const httpLinkAuth = middlewareLink.concat(httpLink)*/
const secureUploadLink = middlewareLink.concat(createUploadLink({ uri: `http://${server}/graphql` }))


/*
const link = split(
    // split based on operation type
    operation => operation.getContext().hasUpload,
    secureUploadLink,
    httpLinkAuth
)
*/


// apollo client setup
const client = new ApolloClient({
    link: secureUploadLink,
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

