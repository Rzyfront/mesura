<template>
  <!-- AdminSettingsLayout.vue -->
  <div class="container px-1 md:px-6 py-6 min-h-[calc(100vh-80px)]">
    <div class="flex flex-col lg:flex-row gap-6 h-full">
      <!-- Panel lateral de opciones -->
      <div class="w-full lg:w-1/4 bg-white rounded-lg shadow-sm border border-gray-100 p-2 lg:p-4">
        <h2 class="text-xl font-semibold text-gray-800 mb-1 px-3">Configuración</h2>
        <p class="text-sm text-gray-500 mb-4 px-3">Administra los ajustes de tu tienda y cuenta</p>
        <nav class="space-y-2">
          <router-link
            v-for="option in settingsOptions"
            :key="option.name"
            :to="option.route"
            class="flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors"
            :class="[
              $route.path === option.route
                ? 'text-white bg-primary shadow-sm'
                : 'text-gray-700 hover:text-primary-700 hover:bg-gray-50'
            ]"
          >
            <component :is="option.icon" class="w-5 h-5 mr-2" />
            {{ option.name }}
          </router-link>
        </nav>
      </div>

      <!-- Contenido principal -->
      <div class="flex-1 bg-white rounded-lg shadow-sm border border-gray-100 p-2 sm:p-6">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  Palette, 
  Users,
  User,
  Package,
  ShoppingCart
} from 'lucide-vue-next'

const settingsOptions = [
  {
    name: 'Mi Perfil',
    icon: User,
    route: '/admin/settings/profile'
  },
  {
    name: 'Usuarios',
    icon: Users,
    route: '/admin/settings/users'
  },
  {
    name: 'Clientes',
    icon: Users,
    route: '/admin/settings/customers'
  },
  {
    name: 'Ordenes',
    icon: ShoppingCart,
    route: '/admin/settings/orders'
  },
  {
    name: 'Productos',
    icon: Package,
    route: '/admin/settings/products'
  },
  {
    name: 'Apariencia',
    icon: Palette,
    route: '/admin/settings/appearance'
  }
]
</script>