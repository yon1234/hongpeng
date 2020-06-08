import Vue from 'vue'
import App from './App'
import index from'./utils/index'
import snow from'./utils/snow'
import Api from "./https/api"
Vue.config.productionTip = false
Vue.prototype.$index = index
Vue.prototype.$snow = snow

Vue.prototype.$Api = Api

App.mpType = 'app'

const app = new Vue(App)


app.$mount()
Vue.prototype.globalData = getApp().globalData