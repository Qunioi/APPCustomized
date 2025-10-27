<template>
  <div class="page-wrap">
    <div class="page-container">
      <details
        v-for="faq in faqList.faqs"
        :key="faq.id"
        class="page-details">
        <summary class="page-summary">
          {{ faq.title }}
        </summary>
        <div class="page-content">
          {{ faq.content }}
        </div>
      </details>
    </div>
  </div>
</template>

<script setup lang="ts">
import faqList from '@/data/faqList.json'
</script>