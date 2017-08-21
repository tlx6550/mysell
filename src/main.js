// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueResource from  'vue-resource'
// 在webpack.base.conf.js已经配置了别名 所以可以直接引人components目录下的东西
import goods from  'components/goods/goods'
import seller from  'components/seller/seller'
import ratings from  'components/ratings/ratings'

import 'common/stylus/index.styl'
Vue.use(VueRouter)
Vue.use(VueResource)

Vue.config.productionTip = false
const routes = [
  { path: '/goods', component: goods },
  { path: '/', component: goods },
  { path: '/ratings', component: ratings },
  { path: '/seller', component: seller }
]
// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  linkActiveClass: 'active',
  routes // （缩写）相当于 routes: routes
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

