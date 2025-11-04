<template>
  <div class="page-wrap">
    <!-- GoTop 按钮 -->
    <div class="gotop-wrap">
      <Transition name="go-top" appear>
        <button
          v-show="showGoTop"
          class="gotop-btn"
          @click="scrollToTop">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L7 7L8.41 8.41L11 5.83V22H13V5.83L15.59 8.41L17 7L12 2Z" fill="currentColor"/>
          </svg>
        </button>
      </Transition>
    </div>
    <div class="page-container">
      <!-- 【选择改色】需求问题 -->
      <details class="page-details">
        <summary class="page-summary">
          【选择改色】需求问题
        </summary>
        <div class="page-content">
          <div class="faq-wrap">
            <ul class="faq-list">
              <li>
                <div class="faq-title">Q1：申请改色，需要先准备哪些资料？</div>
                <div class="faq-content">A：建议您先参考<FaqTooltip title="《改色规范文件》" image-src="faq01.jpg" tips="版型选择 > 选择改色" />，确认希望调整的区域与色系，并<span class="text-red">提供设计稿或色码资料</span>。若您有文件外其他想微调的 UI 项目请事先提出，我们的专案窗口将协助评估可行性，并给予最合适的建议。</div>
              </li>
              <li>
                <div class="faq-title">Q2：改色需求的作业时程大约多久？</div>
                <div class="faq-content">A：时程会依调整范围、同阶段案件量与系统模组化程度有所差异。<br>在您提供完整需求后，平均约需 XX 个工作天 完成。<br>待确认合作范畴与详细需求后，我们将提供正式排程并与您保持进度同步。</div>
              </li>
            </ul>
          </div>
        </div>
      </details>
      <!-- 【选择客制化】需求问题 -->
      <details class="page-details">
        <summary class="page-summary">
          【选择客制化】需求问题
        </summary>
        <div class="page-content">
          <div class="faq-wrap">
            <ul class="faq-list">
              <li>
                <div class="faq-title">Q1：进行客制化需要提供哪些资料？</div>
                <div class="faq-content">A：客制化主要集中于 <span class="text-red">首页设计与颜色调整</span>，您可参考<FaqTooltip title="《改色规范文件》" image-src="faq01.jpg" tips="版型选择 > 选择改色" />与<FaqTooltip title="《客制化规范文件》" image-src="faq02.jpg" tips="版型选择 > 选择客制化" />，以了解目前可支援的方向。若有更进阶的视觉或功能需求，也欢迎提出，我们会协助评估可行性与最佳执行方式。</div>
              </li>
              <li>
                <div class="faq-title">Q2：客制化需求的作业时程为多久？</div>
                <div class="faq-content">A：时程将依内容复杂度、系统模组化程度与同时间需求量调整。<br>在确认完整需求后，平均约需 XX 个工作天 完成。<br>正式时程将于评估需求后提供，并全程由专案窗口陪伴您推动进度。</div>
              </li>
              <li>
                <div class="faq-title">Q3：目前提供四款版型，是否可以做更多延伸？</div>
                <div class="faq-content">A：若您的设计方向与现有四款版型差异较大，我们建议您先汇整想法，并与专案窗口讨论可行性。若评估可行，您再投入设计资源完成详细需求，BBIN将依约定方向协助完成客制化。<br><br>提醒您：<span class="text-red">超出既有框架的客制化，通常需要较长制作期</span>；确认执行细节与提供需求内容后，BBIN会提供排程资讯给您。</div>
              </li>
            </ul>
          </div>
        </div>
      </details>
      <!-- 【其他】问题 -->
      <details class="page-details">
        <summary class="page-summary">
          【其他】问题
        </summary>
        <div class="page-content">
          <div class="faq-wrap">
            <ul class="faq-list">
              <li>
                <div class="faq-title">Q1：我要如何创立我要的APP站？</div>
                <div class="faq-content">A：我们目前提供 四款专业设计版型，可于网站上即时预览效果，并选择最符合您品牌形象与需求的版型，作为专案的设计基础。</div>
              </li>
              <li>
                <div class="faq-title">Q2：是否可以先预览模板？</div>
                <div class="faq-content">A：可以的！在首页选择模板时，滑鼠移至模板上方即可显示预览用的 QR Code。您可以点击进入浏览，或使用手机扫描 QR Code，即可于行动装置上预览实际效果。</div>
              </li>
              <li>
                <div class="faq-title">Q3:：完成后是否还能再调整内容？</div>
                <div class="faq-content">A：为确保交付品质，我们的专案在完成后即进入最终封版；因此一般情况下无法再做内容更动。建议您于交付前务必仔细确认文字、图片与设定，如需我们协助一次性校对，我们也很乐意配合。</div>
              </li>
              <li>
                <div class="faq-title">Q4：是否后续只能付费来新增版型？</div>
                <div class="faq-content">A：BBIN仍会持续开发新的公版版型，并于完成后开放至您的网站后台提供选择；如有明确资讯专员都会通知各位伙伴。</div>
              </li>
            </ul>
          </div>
        </div>
      </details>
    </div>
  </div>
</template>

<script setup lang="ts">
import FaqTooltip from '@/components/FaqTooltip.vue'


const showGoTop = ref(false)

// 监听滚动事件，更新 GoTop 显示
const handleScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop
  showGoTop.value = scrollTop > 100
}

// 滚动到顶部
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

// 生命周期
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>