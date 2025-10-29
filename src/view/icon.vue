<template>
  <div class="page-wrap">
    <div class="page-container">
      <div class="page-header">
        <div class="page-header-top">
          <h2 class="page-header-title">ICON樣式</h2>
        </div>
        <div class="page-header-bottom">
          <div class="page-header-tips">ICON图档案名称请依照ICON图包尺寸以及命名提供</div>
          <div class="page-header-date">表單更新時間：2025/07/08</div>
        </div>
      </div>
      <div class="page-content">
        <div class="icon-wrap">
          <div class="icon-item" v-for="(icon) in iconList.icons" :key="icon.id">
            <div class="icon-item-img">
              <img src="" alt="">
            </div>
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
import { inject } from 'vue'
import iconList from '@/data/iconList.json'

const openIconDialog = inject<(data: any) => void>('openIconDialog')

const handleViewIcon = (icon: any) => {
  openIconDialog?.(icon)
}
</script>