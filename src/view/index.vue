<template>
  <div class="container">
    <div class="product-wrap">
      <div
        v-for="(product, index) in products"
        :key="product.id"
        class="product-item"
        @mouseenter="activeProductIndex = index"
        @mouseleave="activeProductIndex = null">
        <div class="product-item-img-wrap">
          <transition name="fade">
            <div v-if="activeProductIndex === index" class="product-item--hover">
              <div class="product-item-qrcode">
                <img
                  :src="`/image/products/${product.number}/qrcode_${selectedTheme[product.id]}.jpg`" 
                  :alt="product.title"
                  @click="openSlidesWindow(product)"
                  style="cursor: pointer;"
                >
              </div>
              <p class="product-item-text">请扫描二维码预览模板<br>For iOS & Android</p>
              <div class="product-item-btn-group">
                <button class="product-item-btn" @click="selectTemplate(product.number, selectedTheme[product.id], 'color')">选择纯换色</button>
                <button class="product-item-btn" @click="selectTemplate(product.number, selectedTheme[product.id], 'custom')">选择客制化</button>
              </div>
            </div>
          </transition>
          <!-- 改用 selectedTheme[product.id] -->
          <img class="product-item-img" :src="`/image/products/${product.number}/theme_${selectedTheme[product.id]}.jpg`" :alt="product.title">
        </div>
        <div class="product-item-info">
          <div class="product-item-infor">
            <h3 class="product-item-title">{{ product.title }}</h3>
            <p class="product-item-date">{{ product.date }}</p>
          </div>
          <div class="product-item-theme-switch">
            <button
              :class="['product-item-theme-btn', { active: selectedTheme[product.id] === 'dark' }]"
              @click="selectedTheme[product.id] = 'dark'">
              深色版
            </button>
            <button
              :class="['product-item-theme-btn', { active: selectedTheme[product.id] === 'light' }]"
              @click="selectedTheme[product.id] = 'light'">
              浅色版
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="process-wrap">
      <div class="process-header">
        <div class="process-slogan"></div>
      </div>
      <div class="process-step-wrap">
        <div class="process-step-header">
          <h2 class="process-step-header-text">客製化流程</h2>
          <p class="process-step-header-subtext">Customization Process</p>
        </div>
        <div class="process-step-content">
          <Swiper
            class="process-step-card"
            :modules="[Navigation]"
            :navigation="{
              nextEl: '.process-card-btn--next',
              prevEl: '.process-card-btn--prev',
            }"
            :loop="false"
            :space-between="10"
            :slides-per-view="2"
            :breakpoints="{
              1024: {
                slidesPerView: 2,
              },
              1600: {
                slidesPerView: 3,
              }
            }">
            <SwiperSlide v-for="item in process" :key="item.id">
              <div class="process-card-wrap">
                <div :class="['process-card', `process-card--${item.step}`]">
                  <div class="process-card-icon">{{ item.step }}</div>
                  <p class="process-card-title">{{ item.title }}</p>
                  <p class="process-card-description">{{ item.description }}</p>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
          <div class="process-card-btn-group">
            <button class="process-card-btn--prev"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m4 12l6-6m-6 6l6 6m-6-6h10.5m5.5 0h-2.5"/></svg> PREV </button>
            <button class="process-card-btn--next">NEXT <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 12h2.5M20 12l-6-6m6 6l-6 6m6-6H9.5"/></svg></button>
          </div>
        </div>
      </div>
    </div>
    <div class="platform-wrap">
      <div class="platform-header">
        <h2 class="platform-header-text">豐富的遊戲平台</h2>
        <p class="platform-header-subtext">Rich Gaming Platforms</p>
        <div class="platform-header-line"><span></span><span></span><span></span></div>
      </div>
      <Swiper
        class="platform-card-wrap"
        :modules="[Autoplay]"
        :loop="true"
        :space-between="10"
        :speed="5000"
        :autoplay="{
          delay: 0,
          stopOnLastSlide: false,
          disableOnInteraction: false,
        }"
        :slides-per-view="5"
        :breakpoints="{
          1024: {
            slidesPerView: 6,
          },
          1600: {
            slidesPerView: 7,
          }
        }">
        <SwiperSlide v-for="platform in ['bb','saba','pt','kt','jdb','ne','crown','cq9']" :key="platform">
          <div class="platform-card-image">
            <img :src="`/image/platform/${platform}.png`" :alt="platform">
          </div>
        </SwiperSlide>
      </Swiper>
      <Swiper
        class="platform-card-wrap"
        :modules="[Autoplay]"
        :loop="true"
        :space-between="10"
        :speed="5000"
        :autoplay="{
          delay: 0,
          stopOnLastSlide: false,
          disableOnInteraction: false,
          reverseDirection: true,
        }"
        :slides-per-view="5"
        :breakpoints="{
          1024: {
            slidesPerView: 6,
          },
          1600: {
            slidesPerView: 7,
          }
        }">
        <SwiperSlide v-for="platform in ['panda','mg','pp','mt','fg','r88','db','bbcasino']" :key="platform">
          <div class="platform-card-image">
            <img :src="`/image/platform/${platform}.png`" :alt="platform">
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import templateList from '@/data/templateList.json'

const router = useRouter()
const activeProductIndex = ref<number | null>(null)
const products = ref(templateList.products)

const selectTemplate = (number: string, theme: 'dark' | 'light', type: 'color' | 'custom') => {
  router.push({
    path: `/${number}/${theme}`,
    query: { type }
  })
}

const selectedTheme = ref<Record<number, 'light' | 'dark'>>({})
templateList.products.forEach(product => {
  selectedTheme.value[product.id] = product.defaultTheme || 'light'
})

// 開啟 Slides 新視窗 (加入錯誤處理)
const openSlidesWindow = (product: any) => {
  console.log('🔍 點擊產品:', product)

  const theme = selectedTheme.value[product.id]
  console.log('🎨 選擇主題:', theme)
  try {
    const route = router.resolve({
      name: 'product-slides',
      params: {
        number: product.number,
        theme: theme
      }
    })
    console.log('🔗 解析路由:', route)
    console.log('📍 URL:', route.href)
    // 開啟新分頁
    const newWindow = window.open(route.href, '_blank')
    if (!newWindow) {
      console.error('❌ 瀏覽器阻擋彈出視窗')
      alert('請允許彈出視窗,或檢查瀏覽器設定')
    } else {
      console.log('✅ 成功開啟新視窗')
    }
  } catch (error) {
    console.error('❌ 開啟視窗錯誤:', error)
  }
}

const process = ref([
  {
    id: 1,
    step: 1,
    title: '选择版型',
    description: '我们目前提供 四款专业设计版型，可于网站上即时预览效果，并选择最符合您品牌形象与需求的版型，作为专案的设计基础。'
  },
  {
    id: 2,
    step: 2,
    title: '客制范围',
    description: '确认所选版型中可进行修改与延伸的范围，包含颜色、排版、功能模组等项目，并可下载相关设计档案，作为后续制作与调整的依据。'
  },
  {
    id: 3,
    step: 3,
    title: '完成制作',
    description: '依据所选版型及客制化范围，准备并提供必要的素材与档案。完成后提交给本公司，由专业团队进行整合与制作，并安排订制流程。'
  }
])
</script>