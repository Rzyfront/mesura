<template>
  <div class="space-y-6">
    <div>
      <h3 class="text-lg font-medium leading-6 text-gray-900">Configuración de Pedidos</h3>
      <p class="mt-1 text-sm text-gray-500">
        Gestiona la configuración general de los pedidos de tu tienda.
      </p>
    </div>

    <div class="mt-6 divide-y divide-gray-200">
      <!-- Configuración de notificaciones -->
      <div class="py-6">
        <h4 class="text-sm font-medium leading-6 text-gray-900">Notificaciones de Pedidos</h4>
        <div class="mt-2 max-w-xl text-sm text-gray-500">
          <p>Configura las notificaciones para nuevos pedidos y actualizaciones.</p>
        </div>
        <div class="mt-4 space-y-4">
          <div class="flex items-center">
            <Switch
              v-model="settings.emailNotifications"
              :class="[settings.emailNotifications ? 'bg-primary' : 'bg-gray-200', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2']"
            >
              <span class="sr-only">Notificaciones por email</span>
              <span
                :class="[settings.emailNotifications ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']"
              />
            </Switch>
            <span class="ml-3">
              <span class="text-sm font-medium text-gray-900">Notificaciones por email</span>
              <span class="text-sm text-gray-500">&nbsp;- Recibe emails cuando lleguen nuevos pedidos</span>
            </span>
          </div>

          <div class="flex items-center">
            <Switch
              v-model="settings.statusNotifications"
              :class="[settings.statusNotifications ? 'bg-primary' : 'bg-gray-200', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2']"
            >
              <span class="sr-only">Notificaciones de estado</span>
              <span
                :class="[settings.statusNotifications ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']"
              />
            </Switch>
            <span class="ml-3">
              <span class="text-sm font-medium text-gray-900">Notificaciones de estado</span>
              <span class="text-sm text-gray-500">&nbsp;- Notifica a los clientes cuando cambie el estado de su pedido</span>
            </span>
          </div>
        </div>
      </div>

      <!-- Configuración de estados de pedido -->
      <div class="py-6">
        <h4 class="text-sm font-medium leading-6 text-gray-900">Estados de Pedido</h4>
        <div class="mt-2 max-w-xl text-sm text-gray-500">
          <p>Personaliza los estados disponibles para los pedidos.</p>
        </div>
        <div class="mt-4 space-y-4">
          <div class="flex items-center">
            <Switch
              v-model="settings.customStatuses"
              :class="[settings.customStatuses ? 'bg-primary' : 'bg-gray-200', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2']"
            >
              <span class="sr-only">Estados personalizados</span>
              <span
                :class="[settings.customStatuses ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']"
              />
            </Switch>
            <span class="ml-3">
              <span class="text-sm font-medium text-gray-900">Estados personalizados</span>
              <span class="text-sm text-gray-500">&nbsp;- Habilita estados de pedido personalizados</span>
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
  emailNotifications: true,
  statusNotifications: true,
  customStatuses: false
})

const saveSettings = () => {
  // Aquí iría la lógica para guardar la configuración
  showToast('Configuración guardada correctamente', 'success')
}
</script>