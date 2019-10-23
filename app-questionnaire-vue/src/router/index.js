import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Inscription from '../views/Inscription.vue'
import Test from '../views/Test.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/inscription',
    name: 'inscritpion',
    component: Inscription
  },
  {
    path: '/Test',
    name: 'test',
    component: Test
  }
]

const router = new VueRouter({
  routes
})

export default router
