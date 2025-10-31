<template>
  <div class="slides-wrap">
    <!-- Instagram 風格頂部資訊條 -->
    <div class="slides-header">
      <div class="slides-header-left">
        <!-- <div class="slides-avatar">
          <img src="/image/logo.png" alt="Avatar">
        </div> -->
        <div class="slides-info">
          <h1 class="slides-title">{{ product?.title }}</h1>
        </div>
      </div>
      <!-- <button class="slides-close-btn" @click="closeWindow">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6L6 18M6 6L18 18" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button> -->
    </div>

    <!-- 進度條 -->
    <div class="slides-progress-bar">
      <div
        v-for="index in slideCount"
        :key="index"
        class="progress-segment"
        :class="{ active: currentSlide >= index - 1 }"
      >
        <div class="progress-fill" :style="getProgressStyle(index)"></div>
      </div>
    </div>

    <!-- 主輪播 (全屏) -->
    <div class="slides-story-container">
      <swiper
        :modules="modules"
        :loop="true"
        :simulateTouch="true"
        :touchRatio="1"
        :spaceBetween="0"
        :speed="300"
        :autoplay="false"
        :allowTouchMove="true"
        :touchStartPreventDefault="false"
        class="slides-main-swiper"
        @swiper="setMainSwiper"
        @slideChange="onSlideChange"
        @realIndexChange="onRealIndexChange"
      >
        <swiper-slide v-for="index in slideCount" :key="index">
          <div class="story-slide">
            <img
              :src="`/image/products/${productNumber}/${currentTheme}/view${String(index).padStart(3, '0')}.jpg`" 
              :alt="`Slide ${index}`"
              draggable="false"
            />
          </div>
        </swiper-slide>
      </swiper>

      <!-- 左右點擊區域 -->
      <div class="story-nav">
        <div class="story-nav-prev" @click="prevSlide"></div>
        <div class="story-nav-next" @click="nextSlide"></div>
      </div>
    </div>

    <!-- 底部操作區 -->
    <div class="slides-footer">
      <!-- 主題切換 -->
      <div v-if="showThemeSwitch" class="slides-theme-switch">
        <button
          :class="['theme-btn', { active: currentTheme === 'dark' }]"
          @click="switchTheme('dark')"
        >
          深色版
        </button>
        <button
          :class="['theme-btn', { active: currentTheme === 'light' }]"
          @click="switchTheme('light')"
        >
          淺色版
        </button>
      </div>

      <!-- 縮圖導航 -->
      <div class="slides-thumbs">
        <div 
          v-for="index in slideCount" 
          :key="index"
          :class="['thumb-item', { active: currentSlide === index - 1 }]"
          @click="goToSlide(index - 1)"
        >
          <img 
            :src="`/image/products/${productNumber}/${currentTheme}/view${String(index).padStart(3, '0')}.jpg`" 
            :alt="`Thumb ${index}`" 
          />
          <span class="thumb-number">{{ index }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import templateList from '@/data/templateList.json'

import 'swiper/css'
import 'swiper/css/navigation'

const modules = [Navigation]
const route = useRoute()

const productNumber = ref('')
const currentTheme = ref<'light' | 'dark'>('light')
const mainSwiper = ref<SwiperType | null>(null)
const currentSlide = ref(0)
const progressValues = ref<number[]>(Array(12).fill(0))
let progressInterval: number | null = null

const product = computed(() => {
  return templateList.products.find(p => p.number === productNumber.value)
})

// 動態取得 slide 數量
const slideCount = computed(() => {
  return parseInt(product.value?.slideView || '1')
})

const showThemeSwitch = computed(() => {
  return product.value?.defaultTheme && product.value.defaultTheme !== 'none'
})

const setMainSwiper = (swiper: SwiperType) => {
  mainSwiper.value = swiper
  console.log('✅ Swiper 初始化:', swiper)
}

// 使用 realIndexChange 來追蹤真實索引 (loop 模式下)
const onRealIndexChange = (swiper: SwiperType) => {
  currentSlide.value = swiper.realIndex
  console.log('📍 真實索引:', swiper.realIndex)
  resetProgress()
  startProgress()
}

const onSlideChange = (swiper: SwiperType) => {
  console.log('🔄 Slide 改變:', swiper.activeIndex, '真實索引:', swiper.realIndex)
}

const switchTheme = (theme: 'light' | 'dark') => {
  currentTheme.value = theme
}

const closeWindow = () => {
  window.close()
}

const prevSlide = () => {
  console.log('⬅️ 上一張')
  mainSwiper.value?.slidePrev()
}

const nextSlide = () => {
  console.log('➡️ 下一張')
  mainSwiper.value?.slideNext()
}

const goToSlide = (index: number) => {
  console.log('🎯 跳到第', index + 1, '張')
  // loop 模式下使用 slideToLoop
  mainSwiper.value?.slideToLoop(index)
}

// 進度條動畫
const startProgress = () => {
  if (progressInterval) clearInterval(progressInterval)
  
  const duration = 5000 // 5秒
  const interval = 50
  let elapsed = 0

  progressInterval = window.setInterval(() => {
    elapsed += interval
    const progress = Math.min((elapsed / duration) * 100, 100)
    progressValues.value[currentSlide.value] = progress

    if (progress >= 100) {
      clearInterval(progressInterval!)
      // loop 模式下會自動循環,不需要檢查最後一張
      nextSlide()
    }
  }, interval)
}

const resetProgress = () => {
  if (progressInterval) clearInterval(progressInterval)
  progressValues.value = Array(slideCount.value).fill(0)
}

const getProgressStyle = (index: number) => {
  const slideIndex = index - 1
  if (slideIndex < currentSlide.value) {
    return { width: '100%' }
  } else if (slideIndex === currentSlide.value) {
    return { width: `${progressValues.value[slideIndex]}%` }
  }
  return { width: '0%' }
}

// 鍵盤控制
const handleKeyPress = (e: KeyboardEvent) => {
  if (e.key === 'ArrowLeft') prevSlide()
  if (e.key === 'ArrowRight') nextSlide()
  if (e.key === 'Escape') closeWindow()
}

onMounted(() => {
  document.body.classList.add('page-slides')
  productNumber.value = route.params.number as string
  currentTheme.value = (route.params.theme as 'light' | 'dark') || 'light'
  
  if (product.value) {
    document.title = `${product.value.title} - 預覽`
  }

  window.addEventListener('keydown', handleKeyPress)
  startProgress()

  console.log('🚀 頁面載入完成')
})

onUnmounted(() => {
  document.body.classList.remove('page-slides')
  if (progressInterval) clearInterval(progressInterval)
  window.removeEventListener('keydown', handleKeyPress)
})
</script>