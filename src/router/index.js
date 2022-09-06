import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    // 路由懒加载
    component: () => import('@/views/Login'),
    meta: '登录'
  }
]

const router = new VueRouter({
  routes
})

export default router
