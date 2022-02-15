import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue') 
  },
  {
    path: '/orders',
    name: 'Orders',
    component: () => import('../views/Orders.vue') 
  },
  {
    path: '/order/:id',
    name: 'Order',
    component: () => import('../views/Order.vue') 
  },
  {
    path: '/sendings',
    name: 'Sendings',
    component: () => import('../views/Sendings.vue') 
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
