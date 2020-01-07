import Vue from 'vue'
import Router from 'vue-router'
import "../assets/css/index.css"


import login from '@/pages/login'
import Index from '@/pages/index'
import Index1 from '@/pages/Index1'
import chinaMap from '@/components/chinaMap'

Vue.use(Router)

export default new Router({
  routes: [
    {path:'/',name:'index1',component:Index1},
    {path:'/index',name:'index',component:Index},
    {path:'/login',name:'login',component:login},
    {path:'/chinaMap',name:'chinaMap',component:chinaMap},
    {path:'*',redirect:'/'}
  ]
})
