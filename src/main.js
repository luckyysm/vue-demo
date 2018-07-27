// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "./common/css/reset.css"
import "./common/js/adaptation"
import Vue from 'vue'
import App from './App'
import Tips from './components/tips/tips'
//axios
import axios from 'axios'
import router from './router'

Vue.prototype.$http = axios;

// import AMap from 'vue-amap'

Vue.config.productionTip = false
// Vue.use(Tips);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
// Vue.use(AMap);
// 初始化vue-amap
// AMap.initAMapApiLoader({
//   key: 'f6af2ece58d15c88e10a335b0e39cae3',
//   plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch',
//     'AMap.Scale', 'AMap.OverView',
//     'AMap.ToolBar', 'AMap.MapType',
//     'AMap.PolyEditor',
//     'AMap.CircleEditor']
// })