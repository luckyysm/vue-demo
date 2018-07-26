import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/Home'
import Lists from '@/page/Lists'
import Login from '@/page/Login'
import Map from '@/page/Map'
import Filter from '@/page/Filter'
import Sitedetails from '@/page/Sitedetails'
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
      redirect: '/page/map',
    }, {
      path: '/page/lists',
      name: 'Lists',
      component: Lists
    }, {
      path: '/page/map',
      name: 'Map',
      component:Map
    }, {
      path: '/page/login',
      name: 'Login',
      component: Login
    }, {
      path: '/page/sitedetails',
      name: 'Sitedetails',
      component: Sitedetails
    }, {
      path: '/page/filter',
      name: 'Filter',
      component: Filter
    },{
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

