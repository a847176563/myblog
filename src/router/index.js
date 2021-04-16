import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index.vue'
import Login from '../views/login.vue'
import Regist from '../views/regist.vue'
import Write from '../views/write.vue'
import BlogDetail from '../views/blogDetail.vue'
import Revise from '../views/revise.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
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
  },{
    path: '/revise/detail/:blogId',
    name: 'Revise',
    component: Revise
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
