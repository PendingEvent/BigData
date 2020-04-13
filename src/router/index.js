import Vue from 'vue'
import Router from 'vue-router'
import "../assets/css/index.css"


import login from '@/pages/login'
import Index from '@/pages/index'
import Index1 from '@/pages/Index1'
import chinaMap from '@/components/chinaMap'
import YqMap from '@/pages/YqMap'

Vue.use(Router)

export default new Router({
    routes: [
        { path: '/YqMap', name: 'YqMap', component: YqMap },
        { path: '/index1', name: 'index1', component: Index1 },
        { path: '/', name: 'index', component: Index },
        { path: '/login', name: 'login', component: login },
        { path: '/chinaMap', name: 'chinaMap', component: chinaMap },
        { path: '*', redirect: '/', meta: { KeepAlive: false } }
    ]
})