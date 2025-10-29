<template>
  <Dialog ref="dialogRef" />
  <Header />
  <main>
    <router-view />
  </main>
  <Footer />
</template>

<script setup lang="ts">
import { ref, provide } from 'vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Dialog from './components/Dialog.vue'

const dialogRef = ref()

// 提供開啟 Feedback 的方法
const openFeedback = () => {
  dialogRef.value?.openFeedbackDialog()
}

// 提供開啟 Icon 的方法
const openIconDialog = (data: any) => {
  dialogRef.value?.openIconDialog(data)
}

provide('openFeedback', openFeedback)
provide('openIconDialog', openIconDialog)
</script>