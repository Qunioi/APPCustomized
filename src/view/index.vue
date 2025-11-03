<template>
  <div class="container">
    <div class="product-wrap">
      <div
        v-for="(product, index) in products"
        :key="product.id"
        class="product-item"
        >
        <div class="product-item-img-wrap"
          @mouseenter="activeProductIndex = index"
          @mouseleave="activeProductIndex = null"
          >
          <transition name="fade">
            <div v-if="activeProductIndex === index" class="product-item--hover">
              <div class="product-item-qrcode">
                <img
                  :src="getQRCodeUrl(product)"
                  :alt="product.title"
                  @click="openSlidesWindow(product)"
                >
              </div>
              <p class="product-item-text">请扫描二维码预览模板<br>For iOS & Android</p>
              <div class="product-item-btn-group">
                <button class="product-item-btn" @click="selectTemplate(product.number, selectedTheme[product.id], 'color')">选择改色</button>
                <button class="product-item-btn" @click="selectTemplate(product.number, selectedTheme[product.id], 'custom')">选择客制化</button>
              </div>
            </div>
          </transition>
          <img
            class="product-item-img"
            :src="$getImagePath(`template/${product.number}/theme_${selectedTheme[product.id]}.jpg`)"
            :alt="product.title"
          >
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
          <h2 class="process-step-header-text">客制化流程</h2>
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
        <h2 class="platform-header-text">丰富的游戏平台</h2>
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
            <img :src="$getImagePath(`platform/${platform}.png`)" :alt="platform">
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
            <img :src="$getImagePath(`platform/${platform}.png`)" :alt="platform">
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
const env = import.meta.env
const activeProductIndex = ref<number | null>(null)
const products = ref(templateList.products)

// 生成 QR Code URL
const getQRCodeUrl = (product: any) => {
  const theme = selectedTheme.value[product.id]
  const fileName = env.VITE_FILE_NAME || 'appCustomized'
  const url = `${window.location.origin}/${fileName}/#/${product.number}/${theme}?type=slides`
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`
}

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

// 开启 Slides 新视窗 (加入错误处理)
const openSlidesWindow = (product: any) => {
  const theme = selectedTheme.value[product.id]
  try {
    const route = router.resolve({
      path: `/${product.number}/${theme}`,
      query: { type: 'slides' }
    })

    const newWindow = window.open(route.href, '_blank')
    if (!newWindow) {
      console.error('❌ 浏览器阻挡弹出视窗')
      alert('请允许弹出视窗,或检查浏览器设定')
    }
  } catch (error) {
    console.error('❌ 开启视窗错误:', error)
  }
}

const process = ref([
  {
    id: 1,
    step: 1,
    title: '选择版型',
    description: '我们目前提供四款专业设计版型，您可即时于网站预览，挑选最符合您网站品牌形象与需求的基础版型。'
  },
  {
    id: 2,
    step: 2,
    title: '客制范围',
    description: '确认所选版型可客制化的范围，包括颜色、排版与功能模组，并可下载相关设计档案，作为后续制作与调整依据。'
  },
  {
    id: 3,
    step: 3,
    title: '完成制作',
    description: '需依据选定版型与客制化需求，提供必要素材与档案给BBIN，后续将由专业团队协助您整合制作。'
  }
])
</script>