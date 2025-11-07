<template>
  <Transition name="dialog-fade">
    <dialog class="dialog-wrap"
      v-if="isOpen"
      ref="dialogRef"
      @click.self="closeDialog"
      >

      <!-- Feedback 内容 -->
      <div v-if="dialogType === 'feedback'" class="feedback-wrap" @animationend="onAnimationEnd">
        <div class="feedback-header">
          <div class="feedback-header-title">问题回馈</div>
          <div class="feedback-header-description">若您对APP客制化流程有任何问题或建议，<br>欢迎填写表单回馈，我们将派专人与您联系。</div>
          <button class="feedback-close-btn" @click="closeDialog">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.61763 9.00002L0 1.3824L1.3824 0L9.00002 7.61754L16.6176 0L18 1.3824L10.3824 9.00002L18 16.6175L16.6176 18L9.00002 10.3824L1.3824 18L0 16.6175L7.61763 9.00002Z" fill="black"/></svg>
          </button>
        </div>
        <div class="feedback-content">
          <form
            class="feedback-form"
            @submit.prevent="handleSubmit"
          >
            <div class="feedback-form-group">
              <label for="name" class="feedback-form-label">昵称 / 姓名 *</label>
              <input
                id="name"
                v-model="formData.name"
                type="text"
                class="feedback-form-input"
                :class="{ 'error': validationErrors.name }"
                @input="validateName"
                maxlength="20"
                required
              />
              <div v-if="validationErrors.name" class="error-message">{{ validationErrors.name }}</div>
            </div>
            <div class="feedback-form-group">
              <label for="unicode" class="feedback-form-label">网站后置码 *</label>
              <div class="unicode-prefix-wrap">
                <span class="unicode-prefix">@</span>
                <input
                  id="unicode"
                  v-model="formData.unicode"
                  type="text"
                  class="feedback-form-input"
                  :class="{ 'error': validationErrors.unicode }"
                  @input="validateUnicode"
                  maxlength="20"
                  required
                />
              </div>
              <div v-if="validationErrors.unicode" class="error-message">{{ validationErrors.unicode }}</div>
            </div>
            <div class="feedback-form-group">
              <label for="message" class="feedback-form-label">问题内容 *</label>
              <textarea
                id="message"
                v-model="formData.message"
                class="feedback-form-textarea"
                :class="{ 'error': validationErrors.message }"
                @input="validateMessage"
                rows="5"
                maxlength="500"
                required
              ></textarea>
              <div class="char-count">{{ formData.message.length }}/500</div>
              <div v-if="validationErrors.message" class="error-message">{{ validationErrors.message }}</div>
            </div>
            <div class="feedback-form-group">
              <div class="feedback-upload-group">
                <div class="image-upload-area">
                  <input
                    id="image"
                    ref="fileInput"
                    type="file"
                    accept="image/*"
                    class="image-input"
                    @change="handleFileChange"
                  />
                  <label for="image" class="image-upload-label">
                    <div v-if="!imagePreview" class="image-upload-btn"><div class="btn">选择档案</div><span>未选择任何档案</span></div>
                    <img v-if="imagePreview" :src="imagePreview" alt="预览图" class="image-preview" />
                  </label>
                  <button
                    v-if="imagePreview"
                    type="button"
                    class="image-remove-btn"
                    @click="removeImage">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 18L18 6M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                </div>
                <div class="image-upload-hint">※ 图片限制：2 MB / 一张、类型：jpg, png</div>
              </div>
              <button
                type="submit"
                class="feedback-form-submit"
                :disabled="isSubmitting || !formData.name.trim() || !formData.unicode.trim() || !formData.message.trim() || Object.keys(validationErrors).length > 0">
                {{ isSubmitting ? '送出中...' : '送出' }}
              </button>
            </div>
          </form>

          <!-- 成功提示 -->
          <div v-if="showSuccess" class="feedback-success">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <p>提交成功！感谢您的反馈</p>
          </div>

          <!-- 错误提示 -->
          <div v-if="showError" class="feedback-error">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <p>{{ errorMessage }}</p>
          </div>
        </div>
      </div>

      <!-- Icon Dialog 内容 -->
      <div v-else-if="dialogType === 'icon'" class="iconDialog-wrap" @animationend="onAnimationEnd">
        <div class="iconDialog-header">
          <div class="iconDialog-header-title">{{ iconData?.title }}</div>
          <div class="iconDialog-header-date">更新时间：{{ iconData?.date }}</div>
          <button class="iconDialog-close-btn" @click="closeDialog">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.61763 9.00002L0 1.3824L1.3824 0L9.00002 7.61754L16.6176 0L18 1.3824L10.3824 9.00002L18 16.6175L16.6176 18L9.00002 10.3824L1.3824 18L0 16.6175L7.61763 9.00002Z" fill="black"/>
            </svg>
          </button>
        </div>
        <div class="iconDialog-content">
          <div v-if="showThemeSwitch" class="iconDialog-tabs-wrap">
            <button
              :class="['product-item-theme-btn', { active: currentTheme === 'dark' }]"
              @click="switchTheme('dark')">
              深色版
            </button>
            <button
              :class="['product-item-theme-btn', { active: currentTheme === 'light' }]"
              @click="switchTheme('light')">
              浅色版
            </button>
            <div class="iconDialog-tips">※ 提醒您，选择不同的深浅版本会对应不同的ICON配置。</div>
          </div>
          <div class="iconDialog-images-wrap">
            <img :src="currentImagePath" :alt="iconData?.number" class="iconDialog-image">
          </div>
          <div class="iconDialog-download-wrap">
            <button class="iconDialog-download-btn">ICON图包下载</button>
          </div>
        </div>
      </div>
    </dialog>
  </Transition>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const instance = getCurrentInstance()
const $getImagePath = instance?.proxy?.$getImagePath

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwMzUckTYVrcIL_QALK3Br0fUAqpI6UJh_de5xS3mMmi-Fz06KfaG-LOFJdReIRBqlzyw/exec'

const dialogRef = ref<HTMLDialogElement>()
const isOpen = ref(false)
const dialogType = ref<'feedback' | 'icon'>('feedback')
const iconData = ref<any>(null)
const currentTheme = ref<'light' | 'dark'>('light')

const formData = ref({
  name: '',
  unicode: '',
  message: ''
})

const fileInput = ref<HTMLInputElement>()
const imagePreview = ref<string>('')
const imageBase64 = ref<string>('')
const isSubmitting = ref(false)
const showSuccess = ref(false)
const showError = ref(false)
const errorMessage = ref('提交失败，请稍后再试')
const validationErrors = ref<{[key: string]: string}>({})

// 驗證規則
const validateForm = () => {
  const errors: {[key: string]: string} = {}
  
  // 姓名驗證
  if (!formData.value.name.trim()) {
    errors.name = '請輸入姓名'
  } else if (formData.value.name.length < 2) {
    errors.name = '姓名至少需要2個字符'
  } else if (formData.value.name.length > 20) {
    errors.name = '姓名不能超過20個字符'
  }
  
  // 後置碼驗證 - 只能是英文和數字
  if (!formData.value.unicode.trim()) {
    errors.unicode = '請輸入網站後置碼'
  } else if (formData.value.unicode.length < 2) {
    errors.unicode = '後置碼至少需要2個字符'
  } else if (formData.value.unicode.length > 10) {
    errors.unicode = '後置碼不能超過10個字符'
  } else if (!/^[a-zA-Z0-9]+$/.test(formData.value.unicode)) {
    errors.unicode = '後置碼只能包含英文字母和數字'
  }
  
  // 問題內容驗證
  if (!formData.value.message.trim()) {
    errors.message = '請輸入問題內容'
  } else if (formData.value.message.length < 10) {
    errors.message = '問題內容至少需要10個字符'
  } else if (formData.value.message.length > 500) {
    errors.message = '問題內容不能超過500個字符'
  }
  
  validationErrors.value = errors
  return Object.keys(errors).length === 0
}

// 即時驗證後置碼
const validateUnicode = () => {
  const errors = { ...validationErrors.value }
  
  if (formData.value.unicode) {
    // 移除非英文數字字符
    const cleanValue = formData.value.unicode.replace(/[^a-zA-Z0-9]/g, '')
    if (cleanValue !== formData.value.unicode) {
      formData.value.unicode = cleanValue
    }
    
    if (formData.value.unicode.length > 10) {
      errors.unicode = '後置碼不能超過10個字符'
    } else if (formData.value.unicode.length > 0 && formData.value.unicode.length < 2) {
      errors.unicode = '後置碼至少需要2個字符'
    } else {
      delete errors.unicode
    }
  } else {
    delete errors.unicode
  }
  
  validationErrors.value = errors
}

// 即時驗證姓名
const validateName = () => {
  const errors = { ...validationErrors.value }
  
  if (formData.value.name.length > 20) {
    errors.name = '姓名不能超過20個字符'
  } else {
    delete errors.name
  }
  
  validationErrors.value = errors
}

// 即時驗證訊息
const validateMessage = () => {
  const errors = { ...validationErrors.value }
  
  if (formData.value.message.length > 500) {
    errors.message = '問題內容不能超過500個字符'
  } else {
    delete errors.message
  }
  
  validationErrors.value = errors
}

// 提交處理 - 只保留一個
const handleSubmit = async () => {
  if (!validateForm()) {
    errorMessage.value = '請檢查並修正表單錯誤'
    showError.value = true
    setTimeout(() => {
      showError.value = false
    }, 3000)
    return
  }

  isSubmitting.value = true
  showSuccess.value = false
  showError.value = false

  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.value.name.trim(),
        unicode: '@' + formData.value.unicode.trim(),
        message: formData.value.message.trim(),
        image: imageBase64.value
      })
    })

    showSuccess.value = true
    
    // 清空表單和驗證錯誤
    formData.value = {
      name: '',
      unicode: '',
      message: ''
    }
    validationErrors.value = {}
    removeImage()

    setTimeout(() => {
      showSuccess.value = false
      closeDialog()
    }, 3000)

  } catch (error) {
    console.error('❌ 提交失败:', error)
    errorMessage.value = '提交失败，请稍后再试'
    showError.value = true
    setTimeout(() => {
      showError.value = false
    }, 3000)
  } finally {
    isSubmitting.value = false
  }
}

// 判断是否显示主题切换按钮
const showThemeSwitch = computed(() => {
  return iconData.value?.defaultTheme && iconData.value.defaultTheme !== 'none'
})

// 计算当前图片路径
const currentImagePath = computed(() => {
  if (!iconData.value) return ''
  
  const { number, defaultTheme } = iconData.value
  
  // 如果没有主题或主题为 none,使用原始图片
  if (!defaultTheme || defaultTheme === 'none') {
    return $getImagePath(`template/${number}-fullview.jpg`)
  }
  
  // 有主题时,根据当前选择的主题显示对应图片
  return $getImagePath(`template/${number}-fullview-${currentTheme.value}.jpg`)
})

// 切换主题
const switchTheme = (theme: 'light' | 'dark') => {
  currentTheme.value = theme
}

// 开启 Feedback Dialog
const openFeedbackDialog = () => {
  dialogType.value = 'feedback'
  isOpen.value = true
  nextTick(() => {
    dialogRef.value?.showModal()
  })
}

// 开启 Icon Dialog
const openIconDialog = (data: any) => {
  dialogType.value = 'icon'
  iconData.value = data
  
  // 设定预设主题
  if (data.defaultTheme && data.defaultTheme !== 'none') {
    currentTheme.value = data.defaultTheme
  }
  
  isOpen.value = true
  nextTick(() => {
    dialogRef.value?.showModal()
  })
}

// 关闭 Dialog
const closeDialog = () => {
  isOpen.value = false
  
  // 如果是 icon 彈窗且當前在 /icon/:id 路由，返回 /icon
  if (dialogType.value === 'icon' && route.params.id) {
    router.push('/icon')
  }
  
  // 清空资料
  setTimeout(() => {
    iconData.value = null
    currentTheme.value = 'light' // 重置主题
    formData.value = {
      name: '',
      unicode: '',
      message: ''
    }
    validationErrors.value = {}
    removeImage()
  }, 300)
}

const onAnimationEnd = (e: AnimationEvent) => {
  if (e.animationName === 'dialog-content-out') {
    dialogRef.value?.close()
  }
}

// 处理图片选择
const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (!file) return

  if (file.size > 2 * 1024 * 1024) {
    errorMessage.value = '图片大小不能超过 2MB，请重新选择'
    showError.value = true
    if (fileInput.value) {
      fileInput.value.value = ''
    }
    setTimeout(() => {
      showError.value = false
    }, 3000)
    return
  }

  if (!file.type.startsWith('image/')) {
    errorMessage.value = '请上传图片文件（支持 JPG、PNG 格式）'
    showError.value = true
    if (fileInput.value) {
      fileInput.value.value = ''
    }
    setTimeout(() => {
      showError.value = false
    }, 3000)
    return
  }

  const reader = new FileReader()

  reader.onload = (e) => {
    const result = e.target?.result as string
    imagePreview.value = result
    imageBase64.value = result
  }

  reader.readAsDataURL(file)
}

const removeImage = () => {
  imagePreview.value = ''
  imageBase64.value = ''
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

defineExpose({
  openFeedbackDialog,
  openIconDialog,
  closeDialog
})
</script>