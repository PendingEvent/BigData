// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Element from 'element-ui'
import Echarts from 'echarts'
import VueJson from 'vue-jsonp'


import 'element-ui/lib/theme-chalk/index.css'
Vue.prototype.echarts = Echarts



Vue.use(Element)
Vue.use(Echarts)
Vue.use(VueJson)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})