<template>
  <div class="default-content">
    <p>找不到对应的产品组件</p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  theme: 'dark' | 'light'
  type: 'color' | 'custom'
  productNumber: string
}>()
</script>

<style scoped>
.default-content {
  padding: 2rem;
  text-align: center;
  color: #999;
}
</style>