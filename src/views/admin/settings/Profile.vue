<template>
  <div class="space-y-6">
    <div>
      <h3 class="text-lg font-medium leading-6 text-gray-900">Mi Perfil</h3>
      <p class="mt-1 text-sm text-gray-500">
        Gestiona tu información personal y preferencias.
      </p>
    </div>

    <div class="mt-6 divide-y divide-gray-200">
      <!-- Información personal -->
      <div class="py-6">
        <h4 class="text-sm font-medium leading-6 text-gray-900">Información Personal</h4>
        <div class="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <div class="mt-1">
              <input
                type="text"
                v-model="profile.name"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div class="mt-1">
              <input
                type="email"
                v-model="profile.email"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Cambiar contraseña -->
      <div class="py-6">
        <h4 class="text-sm font-medium leading-6 text-gray-900">Cambiar Contraseña</h4>
        <div class="mt-4 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">
              Contraseña actual
            </label>
            <div class="mt-1">
              <input
                type="password"
                v-model="password.current"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">
              Nueva contraseña
            </label>
            <div class="mt-1">
              <input
                type="password"
                v-model="password.new"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">
              Confirmar nueva contraseña
            </label>
            <div class="mt-1">
              <input
                type="password"
                v-model="password.confirm"
                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Preferencias -->
      <div class="py-6">
        <h4 class="text-sm font-medium leading-6 text-gray-900">Preferencias</h4>
        <div class="mt-4 space-y-4">
          <div class="flex items-center">
            <Switch
              v-model="preferences.emailNotifications"
              :class="[preferences.emailNotifications ? 'bg-primary' : 'bg-gray-200', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2']"
            >
              <span class="sr-only">Notificaciones por email</span>
              <span
                :class="[preferences.emailNotifications ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']"
              />
            </Switch>
            <span class="ml-3">
              <span class="text-sm font-medium text-gray-900">Notificaciones por email</span>
              <span class="text-sm text-gray-500">&nbsp;- Recibe notificaciones sobre actividad importante</span>
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Botón guardar -->
    <div class="flex justify-end py-4">
      <button
        type="button"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        @click="saveProfile"
      >
        <Save class="w-4 h-4 mr-2" />
        Guardar cambios
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Switch } from '@headlessui/vue'
import { Save } from 'lucide-vue-next'
import { useCustomToast } from '../../../composables/useToast'

const { showToast } = useCustomToast()

const profile = ref({
  name: 'Admin Usuario',
  email: 'admin@example.com'
})

const password = ref({
  current: '',
  new: '',
  confirm: ''
})

const preferences = ref({
  emailNotifications: true
})

const saveProfile = () => {
  // Aquí iría la lógica para guardar el perfil
  showToast('Perfil actualizado correctamente', 'success')
}
</script>