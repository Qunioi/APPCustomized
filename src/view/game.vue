<template>
  <div class="page-wrap">
    <div class="page-container">
      <div class="page-header">
        <div class="page-header-top">
          <h2 class="page-header-title">游戏介接清单</h2>
          <button class="page-header-download-btn"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 19H20V12H22V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V12H4V19ZM14 9H19L12 16L5 9H10V3H14V9Z" fill="currentColor"/></svg>入口图ID表单下载</button>
        </div>
        <div class="page-header-bottom">
          <div class="page-header-tips">平台入口图档案名称请依照 ID 号码命名，并依照类别分资料夹存放</div>
          <div class="page-header-date">表单更新时间：2025/07/08</div>
        </div>
      </div>
      <div class="page-content">
        <details
          v-for="(category, key) in gameList"
          :key="key"
          class="page-details">
          <summary class="page-summary">
            {{ category.name }} <span>({{ category.platforms.length }})</span>
          </summary>
          <div class="page-content">
            <div class="gameList-table">
              <div class="game-item game-item-title" v-for="n in 4">
                <div class="gameItem-id">ID</div>
                <div class="gameItem-name">平台名称</div>
              </div>
              <div class="game-item" v-for="platform in category.platforms" :key="platform.id">
                <div class="gameItem-id">{{ platform.id }}</div>
                <div class="gameItem-name">{{ platform.name }}</div>
              </div>
            </div>
          </div>
        </details>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import gameList from '@/data/gameList.json'
</script>