<template>
  <div class="page-wrap">
    <div class="page-container">
      <div class="page-header">
        <div class="page-header-top">
          <h2 class="page-header-title">ICON样式</h2>
        </div>
        <div class="page-header-bottom">
          <div class="page-header-tips">ICON图档案名称请依照ICON图包尺寸以及命名提供</div>
          <div class="page-header-date">表单更新时间：2025/10/31</div>
        </div>
      </div>
      <div class="page-content">
        <div class="icon-wrap">
          <div class="icon-item" @click="handleViewIcon(icon)" v-for="(icon) in iconList.icons" :key="icon.id">
            <div class="icon-item-img" :style="`background-image: url(${$getImagePath(`template/${icon.number}-preview.jpg`)});`"></div>
            <div class="icon-item-info">
              <div class="icon-item-infor">
                <h3 class="icon-item-title">{{ icon.title }}</h3>
                <p class="icon-item-date">{{ icon.date }}</p>
              </div>
              <button class="icon-item-btn" @click="handleViewIcon(icon)">查看全部</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import iconList from '@/data/iconList.json'

const route = useRoute()
const router = useRouter()
const openIconDialog = inject<(data: any) => void>('openIconDialog')

const handleViewIcon = (icon: any) => {
  // 更新網址到 /icon/ICON_ID
  router.push(`/icon/${icon.number}`)
  // 開啟彈窗
  openIconDialog?.(icon)
}

// 監聽路由變化，如果有 icon ID 參數則自動開啟對應彈窗
onMounted(() => {
  const iconId = route.params.id as string
  if (iconId) {
    const icon = iconList.icons.find(item => item.number === iconId)
    if (icon) {
      openIconDialog?.(icon)
    }
  }
})

// 監聽路由變化
watch(() => route.params.id, (newId) => {
  if (newId) {
    const icon = iconList.icons.find(item => item.number === newId)
    if (icon) {
      openIconDialog?.(icon)
    }
  }
})
</script>