import Vue from 'vue'
import VueRouter from 'vue-router'
import SignupForm from '../components/SignupForm.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'SignupForm',
    component: SignupForm
  }
]

const router = new VueRouter({
  routes
})

export default router
