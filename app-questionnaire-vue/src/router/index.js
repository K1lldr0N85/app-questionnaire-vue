import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Connexion from '../views/Connexion.vue'
import Question from '../views/Question.vue'
import Administration from '../views/Administration.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/connexion',
    name: 'connexion',
    component: Connexion
  },
  {
    path: '/Question',
    name: 'question',
    component: Question
  },
  {
    path: '/Administration',
    name: 'Administration',
    component: Administration
  }
]

const router = new VueRouter({
  routes
})

export default router
