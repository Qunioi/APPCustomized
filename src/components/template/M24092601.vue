<template>
  <div>
    <!-- 改色内容 -->
    <div v-if="type === 'color'" class="article-wrap">
      <div class="article-content-tips">
        仅红框处可改色
      </div>
      <div class="article-title">起始、Loading : 仅Logo可更换</div>
      <ul class="article-image-list">
        <li><img :src="getImagePath('rules-color-1-1.jpg')"></li>
        <li><img :src="getImagePath('rules-color-1-2.jpg')"></li>
      </ul>

      <div class="article-title">账密登入</div>
      <ul class="article-image-list">
        <li><img :src="getImagePath('rules-color-2-1.jpg')"></li>
        <li><img :src="getImagePath('rules-color-2-2.jpg')"></li>
        <li><img :src="getImagePath('rules-color-2-3.jpg')"></li>
        <li><img :src="getImagePath('rules-color-2-4.jpg')"></li>
      </ul>

      <div class="article-title">开户协议、隐私权政策</div>
      <ul class="article-image-list">
        <li><img :src="getImagePath('rules-color-3-1.jpg')"></li>
        <li><img :src="getImagePath('rules-color-3-2.jpg')"></li>
      </ul>

      <div class="article-title">注册</div>
      <ul class="article-image-list">
        <li><img :src="getImagePath('rules-color-4-1.jpg')"></li>
      </ul>

      <div class="article-title">切换其他账号、修改密码</div>
      <ul class="article-image-list">
        <li><img :src="getImagePath('rules-color-5-1.jpg')"></li>
        <li><img :src="getImagePath('rules-color-5-2.jpg')"></li>
      </ul>

      <div class="article-title">系统弹窗</div>
      <ul class="article-image-list">
        <li><img :src="getImagePath('rules-color-6-1.jpg')"></li>
        <li><img :src="getImagePath('rules-color-6-2.jpg')"></li>
        <li><img :src="getImagePath('rules-color-6-3.jpg')"></li>
      </ul>

      <div class="article-title">会员中心</div>
      <ul class="article-image-list">
        <li><img :src="getImagePath('rules-color-7-1.jpg')"></li>
        <li><img :src="getImagePath('rules-color-7-2.jpg')"></li>
      </ul>

      <div class="article-title">首页大厅</div>
      <ul class="article-image-list">
        <li><img :src="getImagePath('rules-color-8-1.jpg')"></li>
        <li><img :src="getImagePath('rules-color-8-2.jpg')"></li>
        <li><img :src="getImagePath('rules-color-8-3.jpg')"></li>
      </ul>

      <div class="article-title">首页大厅(左侧开)</div>
      <ul class="article-image-list">
        <li><img :src="getImagePath('rules-color-9-1.jpg')"></li>
      </ul>

      <div class="article-title">本站推荐</div>
      <ul class="article-image-list">
        <li><img :src="getImagePath('rules-color-10-1.jpg')"></li>
        <li><img :src="getImagePath('rules-color-10-2.jpg')"></li>
      </ul>

      <div class="article-title">BB电子、BB棋牌</div>
      <ul class="article-image-list">
        <li><img :src="getImagePath('rules-color-11-1.jpg')"></li>
        <li><img :src="getImagePath('rules-color-11-2.jpg')"></li>
        <li><img :src="getImagePath('rules-color-11-3.jpg')"></li>
      </ul>
    </div>

    <!-- 客制化内容 -->
    <div v-else class="article-wrap">
      <div class="article-content-tips">
        可客制化范围<a href="#" @click.prevent="handleSwitchToColor">包含改色范围</a>，在此基础上进行进一步内容或版面调整。
      </div>

      <div class="article-title">首页皆可客制</div>
      <div class="article-content">
        <ol>
          <li><span class="article-num">❶</span>轮播图尺寸固定 (640x225)</li>
          <li><span class="article-num">❷</span>ICON变更样式需提供编辑档 (<a href="#" @click.prevent="handleResource('icon')">请参照范本</a>)</li>
          <li><span class="article-num">❸</span>厂商游戏图不可客制</li>
          <li><span class="article-num">❹</span>平台入口图需提供全部编辑档 (<a href="#" @click.prevent="handleResource('game')">请参照列表</a>)</li>
        </ol>
      </div>
      <ul class="article-image-list">
        <li><img :src="getImagePath('rules-custom-1-1.jpg')"></li>
        <li><img :src="getImagePath('rules-custom-1-2.jpg')"></li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  theme: 'dark' | 'light'
  type: 'color' | 'custom'
  productNumber: string
}

const props = defineProps<Props>()
const emit = defineEmits<{
  switchType: [type: 'color' | 'custom']
}>()

const instance = getCurrentInstance()
const $getImagePath = instance?.proxy?.$getImagePath

const getImagePath = (filename: string) => {
  return $getImagePath(`template/${props.productNumber}/${props.theme}/${filename}`)
}

// 從父組件注入
const switchType = inject<(type: 'color' | 'custom') => void>('switchType')
const handleResource = inject<(type: 'gameList' | 'iconList') => void>('handleResource')

// 處理切換到改色規範
const handleSwitchToColor = () => {
  if (switchType) {
    switchType('color')
  }
}
</script>