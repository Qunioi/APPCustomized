<template>
  <div class="page-wrap">
    <div class="page-container">
      <div class="page-header">
        <div class="page-header-top">
          <h2 class="page-header-title">游戏介接清单</h2>
          <a 
            :href="fileUrl" 
            download="入口图ID表单.zip"
            class="page-header-download-btn">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 19H20V12H22V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V12H4V19ZM14 9H19L12 16L5 9H10V3H14V9Z" fill="currentColor"/>
            </svg>
            入口图ID表单下载
          </a>
        </div>
        <div class="page-header-bottom">
          <div class="page-header-tips">平台入口图档案名称请依照 ID 号码命名，并依照类别分资料夹存放</div>
          <div class="page-header-date">表单更新时间：{{ formattedUpdateTime }}</div>
        </div>
      </div>
      <div class="page-content">
        <details
          v-for="(category, key) in gameCategories"
          :key="key"
          class="page-details">
          <summary class="page-summary">
            {{ category.name }} <span>({{ category.platforms.length }})</span>
          </summary>
          <div class="page-content">
            <div
              class="gameList-table"
              :style="{ gridTemplateColumns: `repeat(${getColumnsCount(category.platforms.length)}, 1fr)` }">
              <!-- 標題數量根據平台數量調整 -->
              <div
                class="game-item game-item-title"
                v-for="n in getColumnsCount(category.platforms.length)"
                :key="`title-${n}`">
                <div class="gameItem-id">ID</div>
                <div class="gameItem-name">平台名称</div>
              </div>
              <!-- 使用補齊後的平台列表 -->
              <div class="game-item" v-for="(platform, index) in getPaddedPlatforms(category.platforms)" :key="`platform-${index}`">
                <div class="gameItem-id">{{ platform?.id || '' }}</div>
                <div class="gameItem-name">{{ platform?.name || '' }}</div>
              </div>
            </div>
          </div>
        </details>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import gameListData from '@/data/gameList.json'
import { useAssets } from '@/composables/useAssets'

// 加入檔案路徑處理
const { getFilePath } = useAssets()
const fileUrl = getFilePath('game_list.zip')

// 提取遊戲分類（排除 updateTime）
const gameCategories = computed(() => {
  const { updateTime, ...categories } = gameListData
  return categories
})

// 格式化更新時間
const formattedUpdateTime = computed(() => {
  const date = new Date(gameListData.updateTime)
  return date.toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  }).replace(/\//g, '/')
})

// 根據平台數量決定列數
const getColumnsCount = (platformCount: number) => {
  return Math.min(platformCount, 4)
}

// 補齊平台列表到 4 的倍數 (僅當數量 >= 4 時)
const getPaddedPlatforms = (platforms: any[]) => {
  // 如果數量少於 4，直接返回原陣列
  if (platforms.length < 4) {
    return platforms
  }
  
  const remainder = platforms.length % 4
  if (remainder === 0) return platforms
  
  const paddingCount = 4 - remainder
  const paddedArray = [...platforms]
  
  // 補齊空項目
  for (let i = 0; i < paddingCount; i++) {
    paddedArray.push(null)
  }
  
  return paddedArray
}
</script>