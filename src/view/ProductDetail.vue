<template>
  <div class="product-detail">
    <div class="product-content">
      <div class="product-image">
        <img :src="`/image/products/${product.number}/theme_${currentTheme}.jpg`" :alt="product.title">
      </div>
      <div class="product-item-info">
        <div class="product-item-left">
          <h3 class="product-item-title">{{ product.title }}</h3>
          <p class="product-item-date">{{ product.date }}</p>
        </div>
        <div class="product-item-right">
          <button
            :class="['product-item-theme-btn', { active: currentTheme === 'dark' }]"
            @click="switchTheme('dark')">
            深色版
          </button>
          <button
            :class="['product-item-theme-btn', { active: currentTheme === 'light' }]"
            @click="switchTheme('light')">
            浅色版
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import data from '@/data/data.json'

const route = useRoute()
const router = useRouter()

// 從路由參數獲取產品編號和主題
const productNumber = computed(() => route.params.number as string)
const currentTheme = ref<'dark' | 'light'>(route.params.theme as 'dark' | 'light')

// 根據產品編號查找產品資料
const product = computed(() => {
  return data.products.find(p => p.number === productNumber.value)
})

// 切換主題
const switchTheme = (theme: 'dark' | 'light') => {
  currentTheme.value = theme
  // 更新路由 URL
  router.push(`/${productNumber.value}/${theme}`)
}

// 監聽路由變化，同步更新主題
watch(() => route.params.theme, (newTheme) => {
  if (newTheme) {
    currentTheme.value = newTheme as 'dark' | 'light'
  }
})

console.log('產品編號:', productNumber.value)
console.log('主題:', currentTheme.value)
console.log('產品資料:', product.value)
</script>