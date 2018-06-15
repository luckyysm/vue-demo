import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/Home'
import About from '@/page/About'
import Amap from '@/page/Amap'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/page/home',
      name: 'Home',
      component: Home
    }, {
      path: '/',
      redirect: '/page/amap',
    }, {
      path: '/page/about',
      name: 'About',
      component: About
    },
    {
      path: '/page/about',
      name: 'About',
      component: About
    }, {
      path: '/page/amap',
      name: 'Amap',
      component: Amap
    },
  ]
})

