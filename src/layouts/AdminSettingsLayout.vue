<template>
  <div class="container py-6 min-h-[calc(100vh-80px)]">
    <div class="flex gap-6 h-full">
      <!-- Panel lateral de opciones (30%) -->
      <div class="w-1/4 bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <nav class="space-y-2">
          <router-link
            v-for="option in settingsOptions"
            :key="option.name"
            :to="option.route"
            class="flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors"
            :class="[
              $route.path === option.route
                ? 'text-white bg-primary'
                : 'text-gray-700 dark:text-gray-200 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700'
            ]"
          >
            <component :is="option.icon" class="w-5 h-5 mr-2" />
            {{ option.name }}
          </router-link>
        </nav>
      </div>

      <!-- Contenido principal (70%) -->
      <div class="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow p-6">
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
    name: 'Productos',
    icon: Package,
    route: '/admin/settings/products'
  },
  {
    name: 'Ordenes',
    icon: ShoppingCart,
    route: '/admin/settings/orders'
  },
  {
    name: 'Clientes',
    icon: Users,
    route: '/admin/settings/customers'
  },
  {
    name: 'Usuarios',
    icon: Users,
    route: '/admin/settings/users'
  },
  {
    name: 'Mi Perfil',
    icon: User,
    route: '/admin/settings/profile'
  },
  {
    name: 'Apariencia',
    icon: Palette,
    route: '/admin/settings/appearance'
  }
]
</script> 