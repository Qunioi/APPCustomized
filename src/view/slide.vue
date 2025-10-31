<template>
  <div class="slides-wrap">
    <div class="slides-header">
      <h1 class="slides-title">{{ product?.title }}</h1>
      <div class="slides-qrcode">
        <img 
          :src="`/image/products/${productNumber}/qrcode_${currentTheme}.jpg`" 
          alt="QR Code"
        >
        <p>手機掃描預覽</p>
      </div>
    </div>
    
    <div class="slides-container">
      <!-- 主輪播 -->
      <swiper
        :modules="modules"
        :loop="true"
        :spaceBetween="10"
        :navigation="true"
        :thumbs="{ swiper: thumbsSwiper }"
        class="slides-main-swiper"
        @swiper="setMainSwiper"
      >
        <swiper-slide v-for="index in 12" :key="index">
          <img 
            :src="`/image/products/${productNumber}/${currentTheme}/view${String(index).padStart(3, '0')}.jpg`" 
            :alt="`Slide ${index}`" 
          />
        </swiper-slide>
      </swiper>

      <!-- 縮圖輪播 -->
      <swiper
        :modules="modules"
        :loop="true"
        :spaceBetween="10"
        :slidesPerView="4"
        :freeMode="true"
        :watchSlidesProgress="true"
        class="slides-thumbs-swiper"
        @swiper="setThumbsSwiper"
      >
        <swiper-slide v-for="index in 12" :key="index">
          <img 
            :src="`/image/products/${productNumber}/${currentTheme}/view${String(index).padStart(3, '0')}.jpg`" 
            :alt="`Thumb ${index}`" 
          />
        </swiper-slide>
      </swiper>
    </div>
    
    <!-- 主題切換按鈕 (如果有主題) -->
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Thumbs, FreeMode } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import templateList from '@/data/templateList.json'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'
import 'swiper/css/free-mode'

const modules = [Navigation, Thumbs, FreeMode]
const route = useRoute()

const productNumber = ref('')
const currentTheme = ref<'light' | 'dark'>('light')
const thumbsSwiper = ref<SwiperType | null>(null)
const mainSwiper = ref<SwiperType | null>(null)

// 從 templateList 獲取產品資料
const product = computed(() => {
  return templateList.products.find(p => p.number === productNumber.value)
})

// 判斷是否顯示主題切換
const showThemeSwitch = computed(() => {
  return product.value?.defaultTheme && product.value.defaultTheme !== 'none'
})

// 設定縮圖 Swiper
const setThumbsSwiper = (swiper: SwiperType) => {
  thumbsSwiper.value = swiper
}

// 設定主要 Swiper
const setMainSwiper = (swiper: SwiperType) => {
  mainSwiper.value = swiper
}

// 切換主題
const switchTheme = (theme: 'light' | 'dark') => {
  currentTheme.value = theme
}

// 初始化
onMounted(() => {
  productNumber.value = route.params.number as string
  currentTheme.value = (route.params.theme as 'light' | 'dark') || 'light'
  
  // 設定頁面標題
  if (product.value) {
    document.title = `${product.value.title} - 預覽`
  }
})
</script>

<style scoped lang="scss">
.slides-wrap {
  width: 100vw;
  min-height: 100vh;
  background: #f5f5f5;
  padding: 20px;
}

.slides-header {
  max-width: 1200px;
  margin: 0 auto 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  .slides-title {
    font-size: 24px;
    font-weight: 600;
    color: #272727;
    margin: 0;
  }
  
  .slides-qrcode {
    text-align: center;
    
    img {
      width: 120px;
      height: 120px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
    }
    
    p {
      margin: 8px 0 0;
      font-size: 14px;
      color: #666;
    }
  }
}

.slides-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

// 主輪播
.slides-main-swiper {
  width: 100%;
  height: 600px;
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  
  :deep(.swiper-slide) {
    display: flex;
    align-items: center;
    justify-content: center;
    
    img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
  }
  
  :deep(.swiper-button-next),
  :deep(.swiper-button-prev) {
    color: #272727;
    background: rgba(255, 255, 255, 0.9);
    width: 44px;
    height: 44px;
    border-radius: 50%;
    
    &::after {
      font-size: 20px;
    }
    
    &:hover {
      background: #fff;
    }
  }
}

// 縮圖輪播
.slides-thumbs-swiper {
  height: 120px;
  width: 100%;
  
  :deep(.swiper-slide) {
    opacity: 0.4;
    cursor: pointer;
    transition: opacity 0.3s ease;
    border: 2px solid transparent;
    border-radius: 8px;
    overflow: hidden;
    background: #fff;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    &:hover {
      opacity: 0.7;
    }
    
    &.swiper-slide-thumb-active {
      opacity: 1;
      border-color: var(--color-primary);
    }
  }
}

// 主題切換按鈕
.slides-theme-switch {
  max-width: 1200px;
  margin: 20px auto 0;
  display: flex;
  gap: 10px;
  justify-content: center;
  
  .theme-btn {
    padding: 12px 32px;
    background: #fff;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      border-color: var(--color-primary);
    }
    
    &.active {
      background: var(--color-primary);
      border-color: var(--color-primary);
      color: #fff;
    }
  }
}

// 響應式
@media (max-width: 768px) {
  .slides-header {
    flex-direction: column;
    gap: 20px;
    
    .slides-qrcode img {
      width: 100px;
      height: 100px;
    }
  }
  
  .slides-main-swiper {
    height: 400px;
  }
  
  .slides-thumbs-swiper {
    height: 80px;
  }
}
</style>