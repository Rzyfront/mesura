<template>
  <ThemeProvider :default-theme="'light'" :enable-system="true">
    <div class="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <router-view />
      <SiteFooter />
    </div>
  </ThemeProvider>
</template>

<script setup>
import ThemeProvider from './components/ThemeProvider.vue'
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>