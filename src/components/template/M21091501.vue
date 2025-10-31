<template>
  <div>
    <!-- 纯换色内容 -->
    <div v-if="type === 'color'" class="article-wrap">
      <div class="article-title">▼ 起始、Loading : 仅Logo可更换</div>
      <ul class="article-image-list">
        <li><img :src="getImagePath('rules-color-1-1.jpg')"></li>
        <li><img :src="getImagePath('rules-color-1-2.jpg')"></li>
      </ul>

      <div class="article-title">▼ 账密登入 : 仅红框处可换色</div>
      <ul class="article-image-list">
        <li><img :src="getImagePath('rules-color-2-1.jpg')"></li>
        <li><img :src="getImagePath('rules-color-2-2.jpg')"></li>
        <li><img :src="getImagePath('rules-color-2-3.jpg')"></li>
        <li><img :src="getImagePath('rules-color-2-4.jpg')"></li>
      </ul>

      <div class="article-title">▼ 开户协议、隐私权政策 :仅红框处可换色</div>
      <ul class="article-image-list">
        <li><img :src="getImagePath('rules-color-3-1.jpg')"></li>
        <li><img :src="getImagePath('rules-color-3-2.jpg')"></li>
      </ul>

      <div class="article-title">▼ 注册 : 仅红框处可换色</div>
      <ul class="article-image-list">
        <li><img :src="getImagePath('rules-color-4-1.jpg')"></li>
      </ul>

      <div class="article-title">▼ 切换其他帐号、修改密码 : 仅红框处可换色</div>
      <ul class="article-image-list">
        <li><img :src="getImagePath('rules-color-5-1.jpg')"></li>
        <li><img :src="getImagePath('rules-color-5-2.jpg')"></li>
      </ul>

      <div class="article-title">▼ 系统弹窗 : 仅红框处可换色</div>
      <ul class="article-image-list">
        <li><img :src="getImagePath('rules-color-6-1.jpg')"></li>
        <li><img :src="getImagePath('rules-color-6-2.jpg')"></li>
        <li><img :src="getImagePath('rules-color-6-3.jpg')"></li>
      </ul>

      <div class="article-title">▼ 会员中心 : 仅红框处可换色</div>
      <ul class="article-image-list">
        <li><img :src="getImagePath('rules-color-7-1.jpg')"></li>
        <li><img :src="getImagePath('rules-color-7-2.jpg')"></li>
      </ul>

      <div class="article-title">▼ 首页大厅 : 仅红框处可更换&换色</div>
      <ul class="article-image-list">
        <li><img :src="getImagePath('rules-color-8-1.jpg')"></li>
        <li><img :src="getImagePath('rules-color-8-2.jpg')"></li>
      </ul>

      <div class="article-title">▼ 首页大厅(左侧开) : 仅红框处可换色</div>
      <ul class="article-image-list">
        <li><img :src="getImagePath('rules-color-9-1.jpg')"></li>
        <li><img :src="getImagePath('rules-color-9-2.jpg')"></li>
      </ul>

      <div class="article-title">▼ 本站推荐 : 仅红框处可换色</div>
      <ul class="article-image-list">
        <li><img :src="getImagePath('rules-color-10-1.jpg')"></li>
        <li><img :src="getImagePath('rules-color-10-2.jpg')"></li>
      </ul>

      <div class="article-title">▼ BB电子、BB棋牌 : 仅红框处可换色</div>
      <ul class="article-image-list">
        <li><img :src="getImagePath('rules-color-11-1.jpg')"></li>
        <li><img :src="getImagePath('rules-color-11-2.jpg')"></li>
        <li><img :src="getImagePath('rules-color-11-3.jpg')"></li>
        <li><img :src="getImagePath('rules-color-11-4.jpg')"></li>
      </ul>
    </div>

    <!-- 客制化内容 -->
    <div v-else class="article-wrap">
      <div class="article-content-tips">
        客制化范围<span class="mask-yellow">包含纯换色范围</span>，在此基础上进行进一步内容或版面调整。
      </div>

      <div class="article-title">▼ 首页皆可客制</div>
      <div class="article-content">
        <ol>
          <li>轮播图尺寸固定(640x225)</li>
          <li>厂商游戏图不可客制</li>
          <li>平台入口图需提供全部档案(<a href="#">请参照列表</a>)</li>
        </ol>
      </div>
      <ul class="article-image-list">
        <li><img :src="getImagePath('rules-custom-1-1.jpg')"></li>
        <li><img :src="getImagePath('rules-custom-1-2.jpg')"></li>
      </ul>

      <div class="article-title">▼ 捕鱼、体育、视讯、彩票、热门内页依照首页需求是否客制内页，若客制内页，平台入口图建议跟首页一致。</div>
      <ul class="article-image-list">
        <li><img :src="getImagePath('rules-custom-2-1.jpg')"></li>
        <li><img :src="getImagePath('rules-custom-2-2.jpg')"></li>
        <li><img :src="getImagePath('rules-custom-2-3.jpg')"></li>
        <li><img :src="getImagePath('rules-custom-2-4.jpg')"></li>
        <li><img :src="getImagePath('rules-custom-2-5.jpg')"></li>
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

const instance = getCurrentInstance()
const $getImagePath = instance?.proxy?.$getImagePath

const getImagePath = (filename: string) => {
  return $getImagePath(`template/${props.productNumber}/${props.theme}/${filename}`)
}
</script>