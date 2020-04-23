import Vue from 'vue'
import App from './App'
import index from'./utils/index'
import snow from'./utils/snow'
Vue.config.productionTip = false
Vue.prototype.$index = index
Vue.prototype.$snow = snow
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
