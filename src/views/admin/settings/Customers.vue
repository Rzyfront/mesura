<template>
  <div class="space-y-6">
    <div>
      <h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-white">Configuración de Clientes</h3>
      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Gestiona la configuración general de los clientes de tu tienda.
      </p>
    </div>

    <div class="mt-6 divide-y divide-gray-200 dark:divide-gray-700">
      <!-- Configuración de registro -->
      <div class="py-6">
        <h4 class="text-sm font-medium leading-6 text-gray-900 dark:text-white">Registro de Clientes</h4>
        <div class="mt-2 max-w-xl text-sm text-gray-500 dark:text-gray-400">
          <p>Configura las opciones de registro para nuevos clientes.</p>
        </div>
        <div class="mt-4 space-y-4">
          <div class="flex items-center">
            <Switch
              v-model="settings.requireVerification"
              :class="[settings.requireVerification ? 'bg-primary' : 'bg-gray-200', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2']"
            >
              <span class="sr-only">Verificación de email</span>
              <span
                :class="[settings.requireVerification ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']"
              />
            </Switch>
            <span class="ml-3">
              <span class="text-sm font-medium text-gray-900 dark:text-white">Verificación de email</span>
              <span class="text-sm text-gray-500 dark:text-gray-400">&nbsp;- Requiere verificación de email al registrarse</span>
            </span>
          </div>

          <div class="flex items-center">
            <Switch
              v-model="settings.allowGuestCheckout"
              :class="[settings.allowGuestCheckout ? 'bg-primary' : 'bg-gray-200', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2']"
            >
              <span class="sr-only">Compra como invitado</span>
              <span
                :class="[settings.allowGuestCheckout ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']"
              />
            </Switch>
            <span class="ml-3">
              <span class="text-sm font-medium text-gray-900 dark:text-white">Compra como invitado</span>
              <span class="text-sm text-gray-500 dark:text-gray-400">&nbsp;- Permite realizar compras sin crear una cuenta</span>
            </span>
          </div>
        </div>
      </div>

      <!-- Configuración de comunicaciones -->
      <div class="py-6">
        <h4 class="text-sm font-medium leading-6 text-gray-900 dark:text-white">Comunicaciones</h4>
        <div class="mt-2 max-w-xl text-sm text-gray-500 dark:text-gray-400">
          <p>Configura las opciones de comunicación con los clientes.</p>
        </div>
        <div class="mt-4 space-y-4">
          <div class="flex items-center">
            <Switch
              v-model="settings.autoNewsletter"
              :class="[settings.autoNewsletter ? 'bg-primary' : 'bg-gray-200', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2']"
            >
              <span class="sr-only">Suscripción automática</span>
              <span
                :class="[settings.autoNewsletter ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']"
              />
            </Switch>
            <span class="ml-3">
              <span class="text-sm font-medium text-gray-900 dark:text-white">Suscripción automática</span>
              <span class="text-sm text-gray-500 dark:text-gray-400">&nbsp;- Suscribe automáticamente a los clientes al newsletter</span>
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Botón guardar -->
    <div class="flex justify-end py-4">
      <button
        type="button"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        @click="saveSettings"
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

const settings = ref({
  requireVerification: true,
  allowGuestCheckout: true,
  autoNewsletter: false
})

const saveSettings = () => {
  // Aquí iría la lógica para guardar la configuración
  showToast('Configuración guardada correctamente', 'success')
}
</script> 