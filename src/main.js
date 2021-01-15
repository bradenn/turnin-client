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
import hljs from 'highlight.js'


import './assets/turnin.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '@fortawesome/fontawesome-free/css/all.css'
import './assets/custom.css'
import './assets/highlight.min.css'

Vue.config.productionTip = false

Vue.prototype.$http = Axios;
Vue.prototype.$user = () => JSON.parse(localStorage.getItem("user"));
Vue.prototype.$token = () => localStorage.getItem("token");

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

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

Vue.directive('highlightjs', {
    deep: true,
    bind: function (el, binding) {
        // on first bind, highlight all targets
        let targets = el.querySelectorAll('code')
        targets.forEach((target) => {
            // if a value is directly assigned to the directive, use this
            // instead of the element content.
            if (binding.value) {
                target.textContent = binding.value
            }
            hljs.highlightBlock(target)
        })
    },
    componentUpdated: function (el, binding) {
        // after an update, re-fill the content and then highlight
        let targets = el.querySelectorAll('code')
        targets.forEach((target) => {
            if (binding.value) {
                target.textContent = binding.value
                hljs.highlightBlock(target)
            }
        })
    }
});

new Vue({
    render: h => h(App),
    router,
    apolloProvider,
    data: {
        token
    }
}).$mount('#app')

