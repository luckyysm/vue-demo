import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/Home'
import About from '@/page/About'
import Login from '@/page/Login'
import Personal from '@/personal/Index'
import Mywallet from '@/personal/mywallet'
import Records from '@/personal/Records'
import Aboutus from '@/personal/Aboutus'

// import Amap from '@/page/Amap'

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
    },{
      path: '/page/about',
      name: 'About',
      component: About
    }, {
      path: '/page/amap',
      name: 'Amap',
      // component: Amap
    }, {
      path: '/page/login',
      name: 'Login',
      component: Login
    }, {
      path: '/personal/Index',
      name: 'Personal',
      component: Personal
    }, {
      path: '/personal',
      redirect: '/personal/Index',
    }, {
      path: '/personal/Mywallet',
      name: 'Mywallet',
      component: Mywallet
    }, {
      path: '/personal/Records',
      name: 'Records',
      component: Records
    }, {
      path: '/personal/Aboutus',
      name: 'Aboutus',
      component: Aboutus
    },
    
    
    
  ]
})

