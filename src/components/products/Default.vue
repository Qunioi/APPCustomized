<template>
  <div class="article-wrap">
    <div class="article-content-tips">
      此產品暫無詳細內容
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  theme: 'dark' | 'light'
  type: 'color' | 'custom'
  productNumber: string
}

defineProps<Props>()
</script>