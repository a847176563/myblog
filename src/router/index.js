import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index.vue'
import Login from '../views/login.vue'
import Regist from '../views/regist.vue'
import Write from '../views/write.vue'
import BlogDetail from '../views/blogDetail.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/index',
    name: 'Index',
    component: Index
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },{
    path: '/regist',
    name: 'Regist',
    component: Regist
  },{
    path: '/write',
    name: 'Write',
    component: Write
  },{
    path: '/blog/detail/:blogId',
    name: 'BlogDetail',
    component: BlogDetail
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
