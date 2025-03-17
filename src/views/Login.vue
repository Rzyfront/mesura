<template>
  <div class="flex flex-col min-h-screen bg-gradient-to-b from-white to-purple-50">
    <!-- Logo and Title (Header-like element) -->

      <div class="fixed top-0 left-0 flex items-center pt-4 pl-10 cursor-pointer" @click="setUserTab">
        <Logo class="h-8 w-auto" />
      </div>
      <UserLogin v-if="activeTab === 'user'" />
      <ClientLogin v-else />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import UserLogin from '../components/auth/UserLogin.vue'
import ClientLogin from '../components/auth/ClientLogin.vue'
import Logo from '../components/Logo.vue'
  
const activeTab = ref('client')

const setUserTab = () => {
  activeTab.value = 'user'
}
</script>