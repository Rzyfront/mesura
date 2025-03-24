<template>
  <div class="container py-6 min-h-[calc(100vh-80px)]">
    <div class="flex gap-6 h-full">
      <!-- Panel lateral de opciones (30%) -->
      <div class="w-[30%] bg-white rounded-lg border shadow-sm h-full flex flex-col">
        <div class="p-4 border-b">
          <h2 class="text-lg font-semibold text-gray-900">Configuración</h2>
          <p class="text-sm text-gray-500">Gestiona las opciones de tu tienda</p>
        </div>
        
        <nav class="p-2 flex-1">
          <button
            v-for="(option, index) in settingsOptions"
            :key="index"
            @click="selectedOption = option.id"
            :class="[
              'w-full text-left px-4 py-3 rounded-md flex items-center gap-3 transition-colors',
              selectedOption === option.id
                ? 'bg-purple-50 text-purple-900'
                : 'text-gray-700 hover:bg-gray-50'
            ]"
          >
            <component :is="option.icon" class="h-5 w-5" :class="selectedOption === option.id ? 'text-purple-600' : 'text-gray-400'" />
            <span class="font-medium">{{ option.name }}</span>
          </button>
        </nav>
      </div>

      <!-- Área de contenido (70%) -->
      <div class="flex-1 bg-white rounded-lg border shadow-sm h-full flex flex-col">
        <div class="p-6 flex-1">
          <template v-if="selectedOption === 'general'">
            <h3 class="text-xl font-semibold text-gray-900 mb-6">Configuración General</h3>
            <div class="space-y-6">
              <div class="grid gap-4">
                <label class="text-sm font-medium text-gray-700">Nombre de la tienda</label>
                <input type="text" class="w-full px-4 py-2 border rounded-md" placeholder="MESURA" />
              </div>
              <div class="grid gap-4">
                <label class="text-sm font-medium text-gray-700">Descripción</label>
                <textarea class="w-full px-4 py-2 border rounded-md" rows="3" placeholder="Describe tu tienda..."></textarea>
              </div>
              <div class="grid gap-4">
                <label class="text-sm font-medium text-gray-700">Zona horaria</label>
                <select class="w-full px-4 py-2 border rounded-md">
                  <option>Madrid (GMT+1)</option>
                  <option>Barcelona (GMT+1)</option>
                </select>
              </div>
            </div>
          </template>

          <template v-else-if="selectedOption === 'appearance'">
            <h3 class="text-xl font-semibold text-gray-900 mb-6">Apariencia</h3>
            <div class="space-y-6">
              <div class="grid gap-4">
                <label class="text-sm font-medium text-gray-700">Logo</label>
                <div class="flex items-center gap-4">
                  <img src="@/assets/images/logo.webp" alt="Logo actual" class="h-12 w-12 rounded-md" />
                  <button class="px-4 py-2 border rounded-md hover:bg-gray-50">Cambiar logo</button>
                </div>
              </div>
              <div class="grid gap-4">
                <label class="text-sm font-medium text-gray-700">Color principal</label>
                <input type="color" class="h-10 w-20" value="#9333EA" />
              </div>
            </div>
          </template>

          <template v-else-if="selectedOption === 'notifications'">
            <h3 class="text-xl font-semibold text-gray-900 mb-6">Notificaciones</h3>
            <div class="space-y-6">
              <div class="flex items-center justify-between py-3 border-b">
                <div>
                  <p class="font-medium text-gray-900">Notificaciones por email</p>
                  <p class="text-sm text-gray-500">Recibe actualizaciones sobre nuevos pedidos</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" class="sr-only peer" checked>
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
              <div class="flex items-center justify-between py-3 border-b">
                <div>
                  <p class="font-medium text-gray-900">Notificaciones push</p>
                  <p class="text-sm text-gray-500">Recibe notificaciones en tiempo real</p>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" class="sr-only peer">
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                </label>
              </div>
            </div>
          </template>

          <template v-else-if="selectedOption === 'security'">
            <h3 class="text-xl font-semibold text-gray-900 mb-6">Seguridad</h3>
            <div class="space-y-6">
              <div class="grid gap-4">
                <label class="text-sm font-medium text-gray-700">Contraseña actual</label>
                <input type="password" class="w-full px-4 py-2 border rounded-md" />
              </div>
              <div class="grid gap-4">
                <label class="text-sm font-medium text-gray-700">Nueva contraseña</label>
                <input type="password" class="w-full px-4 py-2 border rounded-md" />
              </div>
              <div class="grid gap-4">
                <label class="text-sm font-medium text-gray-700">Confirmar nueva contraseña</label>
                <input type="password" class="w-full px-4 py-2 border rounded-md" />
              </div>
              <button class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors">
                Actualizar contraseña
              </button>
            </div>
          </template>

          <template v-else-if="selectedOption === 'billing'">
            <h3 class="text-xl font-semibold text-gray-900 mb-6">Facturación</h3>
            <div class="space-y-6">
              <div class="p-4 bg-gray-50 rounded-lg">
                <p class="text-sm text-gray-600">Plan actual: <span class="font-medium text-purple-600">Premium</span></p>
                <p class="text-xs text-gray-500 mt-1">Facturación mensual</p>
              </div>
              <div class="grid gap-4">
                <label class="text-sm font-medium text-gray-700">Método de pago</label>
                <div class="flex items-center gap-4 p-4 border rounded-md">
                  <div class="h-8 w-12 bg-gray-100 rounded"></div>
                  <span class="text-gray-600">•••• •••• •••• 4242</span>
                </div>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { 
  Settings, 
  Palette, 
  Bell, 
  Shield, 
  CreditCard 
} from 'lucide-vue-next'

const selectedOption = ref('general')

const settingsOptions = [
  {
    id: 'general',
    name: 'General',
    icon: Settings
  },
  {
    id: 'appearance',
    name: 'Apariencia',
    icon: Palette
  },
  {
    id: 'notifications',
    name: 'Notificaciones',
    icon: Bell
  },
  {
    id: 'security',
    name: 'Seguridad',
    icon: Shield
  },
  {
    id: 'billing',
    name: 'Facturación',
    icon: CreditCard
  }
]
</script> 