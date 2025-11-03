<template>
  <span 
    class="text-blue tooltip-trigger" 
    @mouseenter="showTooltip" 
    @mouseleave="hideTooltip">
    {{ title }}
    <div v-show="isVisible" class="tooltip">
      <div class="tooltip-tips">{{ tips }}</div>
      <img :src="imageSrc" :alt="title" class="tooltip-image">
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

const showTooltip = () => {
  isVisible.value = true
}

const hideTooltip = () => {
  isVisible.value = false
}
</script>

<style scoped lang="scss">
.tooltip-trigger {
  position: relative;
  cursor: pointer;
}

.tooltip {
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  z-index: 9999;
  width: 300px;
  margin-top: 8px;

  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 10px 10px 10px;
    border-color: transparent transparent #e5e5e5 transparent;
  }
  &::after {
    content: '';
    position: absolute;
    top: -8px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 9px 9px 9px;
    border-color: transparent transparent white transparent;
  }
}

.tooltip-tips {
  color: #D2281F;
  font-weight: 600;
  margin-bottom: 0.5rem;
  font-size: 12px;
}

.tooltip-image {
  width: 100%;
  border-radius: 8px;
}
</style>