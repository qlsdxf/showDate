import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import md5 from 'js-md5';
Vue.prototype.$axios = axios
axios.defaults.headers.post['Content-Type'] = 'application/json';
Vue.use(ElementUI)
Vue.prototype.$md5 = md5;
Vue.config.productionTip = false
axios.interceptors.request.use(
    config => {
        if (localStorage.getItem('token')) {
            config.headers.Authorization = localStorage.getItem('token')
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
