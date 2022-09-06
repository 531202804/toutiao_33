import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: '/login'
  },
  {
    path: '/login',
    component: Login,
    meta: '登录'
  }
]

const router = new VueRouter({
  routes
})

export default router
