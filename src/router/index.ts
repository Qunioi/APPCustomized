import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '@/view/index.vue'
import Detail from '@/view/detail.vue'
import Slides from '@/view/slides.vue'
import Icon from '@/view/icon.vue'
import Game from '@/view/game.vue'
import Faq from '@/view/faq.vue'

const router = createRouter({
  // history: createWebHistory(import.meta.env.BASE_URL),
  history: createWebHashHistory(import.meta.env.BASE_URL), // 改用 Hash 模式
  routes: [
    {
      path: '/',
      name: 'home',
      component: Index,
      meta: { showInfo: true }
    },
    {
      path: '/:number/:theme',
      name: 'product',
      component: Detail,
      meta: { showInfo: true },
      beforeEnter: (to) => {
        if (to.query.type === 'slides') {
          to.meta.showInfo = false
          return {
            name: 'product-slides',
            params: to.params,
            query: to.query
          }
        }
      }
    },
    {
      path: '/:number/:theme',
      name: 'product-slides',
      component: Slides,
      meta: { showInfo: false }
    },
    {
      path: '/icon',
      name: 'icon',
      component: Icon,
      meta: { showInfo: true }
    },
    {
      path: '/icon/:id',
      name: 'iconDetail',
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