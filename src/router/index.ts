import { createRouter, createWebHistory } from 'vue-router'
import Index from '../view/index.vue'
import Detail from '../view/detail.vue'
import Icon from '../view/icon.vue'
import Game from '../view/game.vue'
import FAQ from '../view/faq.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Index
    },
    {
      path: '/game',
      name: 'game',
      component: Game
    },
    {
      path: '/faq',
      name: 'faq',
      component: FAQ
    },
    {
      path: '/icon',
      name: 'icon',
      component: Icon
    },
    {
      path: '/:number/:theme',
      name: 'detail',
      component: Detail
    }
  ]
})

export default router