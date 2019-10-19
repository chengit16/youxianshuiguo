import Vue from 'vue'
import App from './App'
import store from './store'
import http from './common/http.js'
import filter from './common/filter.js'

Vue.prototype.$store = store;
Vue.config.productionTip = false

Vue.prototype.$http = http
Vue.prototype.filter = filter

App.mpType = 'app'

const app = new Vue({
	store,
    ...App
})
app.$mount()
