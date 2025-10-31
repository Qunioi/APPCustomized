import { createRouter, createWebHistory } from 'vue-router'
import Index from '@/view/index.vue'
import Detail from '@/view/detail.vue'
import Slide from '@/view/slide.vue'
import Icon from '@/view/icon.vue'
import Game from '@/view/game.vue'
import Faq from '@/view/faq.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Index
    },
    {
      path: '/:number/:theme',
      name: 'product-detail',
      component: Detail
    },
    // 新增這個路由!
    {
      path: '/slides/:number/:theme',
      name: 'product-slides',  // 這個名稱要對應
      component: Slide
    },
    {
      path: '/icon',
      name: 'icon',
      component: Icon
    },
    {
      path: '/game',
      name: 'game',
      component: Game
    },
    {
      path: '/faq',
      name: 'faq',
      component: Faq
    }
  ]
})

export default router