<template>
  <span 
    class="text-blue tooltip-trigger" 
    @mouseenter="showTooltip" 
    @mouseleave="hideTooltip">
    {{ title }}
    <div v-show="isVisible" class="tooltip">
      <div class="tooltip-tips">{{ tips }}</div>
      <img :src="getImagePath(imageSrc)" :alt="title" class="tooltip-image">
    </div>
  </span>
</template>

<script setup lang="ts">
interface Props {
  title: string
  imageSrc: string
  tips: string
}

const props = defineProps<Props>()
const isVisible = ref(false)

// 簡單的圖片路徑處理
const instance = getCurrentInstance()
const $getImagePath = instance?.proxy?.$getImagePath

const getImagePath = (filename: string) => {
  return $getImagePath(`${filename}`)
}

const showTooltip = () => {
  isVisible.value = true
}

const hideTooltip = () => {
  isVisible.value = false
}
</script>