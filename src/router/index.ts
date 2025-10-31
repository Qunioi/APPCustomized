import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/view/index.vue'
import Detail from '@/view/detail.vue'
import Slide from '@/view/slides.vue'
import Icon from '@/view/icon.vue'
import Game from '@/view/game.vue'
import Faq from '@/view/faq.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Index,
      meta: { showInfo: true }
    },
    {
      path: '/:number/:theme',
      name: 'product-detail',
      component: Detail,
      meta: { showInfo: true }
    },
    {
      path: '/slides/:number/:theme',
      name: 'product-slides',
      component: Slide,
      meta: { showInfo: false }
    },
    {
      path: '/icon',
      name: 'icon',
      component: Icon,
      meta: { showInfo: true }
    },
    {
      path: '/game',
      name: 'game',
      component: Game,
      meta: { showInfo: true }
    },
    {
      path: '/faq',
      name: 'faq',
      component: Faq,
      meta: { showInfo: true }
    }
  ]
})

export default router