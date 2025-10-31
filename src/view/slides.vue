<template>
  <div class="slides-wrap">
    <div class="slides-header">
      <div class="slides-header-left">
        <div class="slides-info">
          <h1 class="slides-title">{{ product?.title }}</h1>
        </div>
      </div>
    </div>

    <!-- 进度条 -->
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

    <!-- 主轮播 (全屏) -->
    <div class="slides-story-container">
      <swiper
        :modules="modules"
        :loop="slideCount >= 3"
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
              :src="$getImagePath(`template/${productNumber}/${currentTheme}/view${String(index).padStart(3, '0')}.jpg`)"
              :alt="`Slide ${index}`"
              draggable="false"
            />
          </div>
        </swiper-slide>
      </swiper>

      <!-- 左右点击区域 -->
      <div class="story-nav">
        <div class="story-nav-prev" @click="prevSlide"></div>
        <div class="story-nav-next" @click="nextSlide"></div>
      </div>
    </div>

    <!-- 底部操作区 -->
    <div class="slides-footer">
      <!-- 主题切换 -->
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
          浅色版
        </button>
      </div>

      <!-- 缩图导航 -->
      <div class="slides-thumbs">
        <div
          v-for="index in slideCount"
          :key="index"
          :class="['thumb-item', { active: currentSlide === index - 1 }]"
          @click="goToSlide(index - 1)"
        >
          <img
            :src="$getImagePath(`template/${productNumber}/${currentTheme}/view${String(index).padStart(3, '0')}.jpg`)"
            :alt="`Thumb ${index}`"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import templateList from '@/data/templateList.json'

import 'swiper/css'
import 'swiper/css/navigation'

const modules = [Navigation]
const route = useRoute()
const router = useRouter()

const productNumber = ref('')
const currentTheme = ref<'light' | 'dark'>('light')
const mainSwiper = ref<SwiperType | null>(null)
const currentSlide = ref(0)
const progressValues = ref<number[]>(Array(12).fill(0))
let progressInterval: number | null = null

const product = computed(() => {
  return templateList.products.find(p => p.number === productNumber.value)
})

// 动态取得 slide 数量
const slideCount = computed(() => {
  return parseInt(product.value?.slideView || '1')
})

const showThemeSwitch = computed(() => {
  return product.value?.defaultTheme && product.value.defaultTheme !== 'none'
})

const setMainSwiper = (swiper: SwiperType) => {
  mainSwiper.value = swiper
}

const onRealIndexChange = (swiper: SwiperType) => {
  currentSlide.value = swiper.realIndex
  resetProgress()
  startProgress()
}

const onSlideChange = (swiper: SwiperType) => {
  // console.log('🔄 Slide 改变:', swiper.activeIndex, '真实索引:', swiper.realIndex)
}

const switchTheme = (theme: 'light' | 'dark') => {
  currentTheme.value = theme

  router.replace({
    path: `/${productNumber.value}/${theme}`,
    query: { type: 'slides' }
  })
}

const closeWindow = () => {
  window.close()
}

const prevSlide = () => {
  mainSwiper.value?.slidePrev()
}

const nextSlide = () => {
  mainSwiper.value?.slideNext()
}

const goToSlide = (index: number) => {
  mainSwiper.value?.slideToLoop(index)
}

// 进度条动画
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

// 键盘控制
const handleKeyPress = (e: KeyboardEvent) => {
  if (e.key === 'ArrowLeft') prevSlide()
  if (e.key === 'ArrowRight') nextSlide()
  if (e.key === 'Escape') closeWindow()
}

onMounted(() => {
  if (route.query.type !== 'slides') {
    console.error('❌ 非 slides 模式')
    return
  }

  document.body.classList.add('page-slides')
  productNumber.value = route.params.number as string
  currentTheme.value = (route.params.theme as 'light' | 'dark') || 'light'

  if (product.value) {
    document.title = `${product.value.title} - 预览`
  }

  window.addEventListener('keydown', handleKeyPress)
  startProgress()
})

onUnmounted(() => {
  document.body.classList.remove('page-slides')
  if (progressInterval) clearInterval(progressInterval)
  window.removeEventListener('keydown', handleKeyPress)
})
</script>