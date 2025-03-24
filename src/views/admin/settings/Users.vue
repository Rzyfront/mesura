<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <div>
        <h3 class="text-xl font-semibold text-gray-900">Usuarios del Sistema</h3>
        <p class="text-sm text-gray-500">Gestiona los usuarios administradores y super administradores</p>
      </div>
      <button class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center gap-2">
        <UserPlus class="h-5 w-5" />
        Nuevo Usuario
      </button>
    </div>

    <!-- Tabla de usuarios -->
    <div class="border rounded-lg overflow-hidden">
      <table class="w-full">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="user in users" :key="user.id">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                  <User class="h-5 w-5 text-purple-600" />
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ user.email }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="[
                'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                user.role === 'super_admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
              ]">
                {{ user.role === 'super_admin' ? 'Super Admin' : 'Admin' }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span :class="[
                'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                user.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              ]">
                {{ user.active ? 'Activo' : 'Inactivo' }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button class="text-purple-600 hover:text-purple-900 mr-3">
                <Pencil class="h-5 w-5" />
              </button>
              <button class="text-red-600 hover:text-red-900">
                <Trash2 class="h-5 w-5" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { User, UserPlus, Pencil, Trash2 } from 'lucide-vue-next'

// Datos de ejemplo
const users = ref([
  {
    id: 1,
    name: 'Rafael Martinez',
    email: 'rafael@mesura.com',
    role: 'super_admin',
    active: true
  },
  {
    id: 2,
    name: 'Ana García',
    email: 'ana@mesura.com',
    role: 'admin',
    active: true
  },
  {
    id: 3,
    name: 'Carlos López',
    email: 'carlos@mesura.com',
    role: 'admin',
    active: false
  }
])
</script> 