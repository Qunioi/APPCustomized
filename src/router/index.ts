import { createRouter, createWebHistory } from 'vue-router'
import Index from '../view/index.vue'
import ProductDetail from '../view/ProductDetail.vue'

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/:number/:theme',
    name: 'ProductDetail',
    component: ProductDetail
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router