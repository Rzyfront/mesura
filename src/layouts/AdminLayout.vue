<template>
  <!-- AdminLayout.vue -->
  <div class="min-h-screen bg-gray-50">
    <!-- AdminHeader ya está siendo manejado en App.vue -->
    
    <!-- Contenido principal -->
    <main class="min-h-[calc(100vh-64px)]">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
// El AdminHeader ya está siendo manejado globalmente en App.vue
// Este layout solo proporciona el contenedor principal y el fondo
</script> 