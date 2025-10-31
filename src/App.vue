<template>
  <Dialog ref="dialogRef" />
  <Header v-if="showInfo" />
  <main>
    <router-view />
  </main>
  <Footer v-if="showInfo" />
</template>

<script setup lang="ts">
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Dialog from './components/Dialog.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const dialogRef = ref()

const showInfo = computed(() => {
  return route.meta.showInfo !== false
})

const openFeedback = () => {
  dialogRef.value?.openFeedbackDialog()
}

const openIconDialog = (data: any) => {
  dialogRef.value?.openIconDialog(data)
}

provide('openFeedback', openFeedback)
provide('openIconDialog', openIconDialog)
</script>