import Vue from 'vue'
import Router from 'vue-router'
import "../assets/css/index.css"


import login from '@/pages/login'
import Index from '@/pages/index'

Vue.use(Router)

export default new Router({
  routes: [
    {path:'/',name:'index',component:Index},
    {path:'/login',name:'login',component:login},
    {path:'*',redirect:'/'}
  ]
})
