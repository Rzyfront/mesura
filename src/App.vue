<template>
  <ThemeProvider :default-theme="'light'" :enable-system="true">
    <div class="flex min-h-screen flex-col bg-background text-foreground">
      <!-- Show AdminHeader for admin users -->
      <AdminHeader v-if="!isAuthPage && isAdmin" />
      
      <!-- Show SiteHeader for regular users -->
      <SiteHeader v-if="!isAuthPage && !isAdmin" />
      
      <router-view />
      <SiteFooter v-if="!isAuthPage" />
    </div>
  </ThemeProvider>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useUserAuthStore } from './stores/authUser'
import ThemeProvider from './components/ThemeProvider.vue'
import SiteHeader from './components/SiteHeader.vue'
import AdminHeader from './components/AdminHeader.vue'
import SiteFooter from './components/SiteFooter.vue'

const route = useRoute()
const userStore = useUserAuthStore()

// Check if current route is an authentication page (login, register, etc.)
const isAuthPage = computed(() => {
  const authRoutes = ['/login', '/register', '/recuperar-contrasena']
  return authRoutes.includes(route.path)
})

// Check if current user is an admin or super_admin
const isAdmin = computed(() => {
  return userStore.isAuthenticated && userStore.isAdmin
})
</script>