<template>
  <div class="container space-y-6">
    <div>
      <h3 class="text-2xl font-bold tracking-tight">Configuración de Clientes</h3>
      <p class="text-muted-foreground">
        Gestiona la configuración general de los clientes de tu tienda.
      </p>
    </div>

    <div class="divide-y divide-border">
      <!-- Configuración de registro -->
      <div class="py-6">
        <h4 class="text-lg font-semibold">Registro de Clientes</h4>
        <div class="mt-2 text-sm text-muted-foreground">
          <p>Configura las opciones de registro para nuevos clientes.</p>
        </div>
        <div class="mt-4 space-y-4">
          <div class="flex items-center">
            <Switch
              v-model="settings.requireVerification"
              :class="[settings.requireVerification ? 'bg-primary' : 'bg-muted', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed']"
              :disabled="loading"
            >
              <span class="sr-only">Verificación de email</span>
              <span
                :class="[settings.requireVerification ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']"
              />
            </Switch>
            <span class="ml-3">
              <span class="text-sm font-medium leading-none">Verificación de email</span>
              <span class="text-sm text-muted-foreground">&nbsp;- Requiere verificación de email al registrarse</span>
            </span>
          </div>

          <div class="flex items-center">
            <Switch
              v-model="settings.allowGuestCheckout"
              :class="[settings.allowGuestCheckout ? 'bg-primary' : 'bg-muted', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed']"
              :disabled="loading"
            >
              <span class="sr-only">Compra como invitado</span>
              <span
                :class="[settings.allowGuestCheckout ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']"
              />
            </Switch>
            <span class="ml-3">
              <span class="text-sm font-medium leading-none">Compra como invitado</span>
              <span class="text-sm text-muted-foreground">&nbsp;- Permite realizar compras sin crear una cuenta</span>
            </span>
          </div>
        </div>
      </div>

      <!-- Configuración de comunicaciones -->
      <div class="py-6">
        <h4 class="text-lg font-semibold">Comunicaciones</h4>
        <div class="mt-2 text-sm text-muted-foreground">
          <p>Configura las opciones de comunicación con los clientes.</p>
        </div>
        <div class="mt-4 space-y-4">
          <div class="flex items-center">
            <Switch
              v-model="settings.autoNewsletter"
              :class="[settings.autoNewsletter ? 'bg-primary' : 'bg-muted', 'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed']"
              :disabled="loading"
            >
              <span class="sr-only">Suscripción automática</span>
              <span
                :class="[settings.autoNewsletter ? 'translate-x-5' : 'translate-x-0', 'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out']"
              />
            </Switch>
            <span class="ml-3">
              <span class="text-sm font-medium leading-none">Suscripción automática</span>
              <span class="text-sm text-muted-foreground">&nbsp;- Suscribe automáticamente a los clientes al newsletter</span>
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Botón guardar -->
    <div class="flex justify-end py-4">
      <button
        type="button"
        class="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed bg-primary text-primary-foreground hover:bg-primary/90"
        @click="saveSettings"
        :disabled="loading"
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

const loading = ref(false)

const saveSettings = async () => {
  loading.value = true
  // Aquí iría la lógica para guardar la configuración
  await new Promise(resolve => setTimeout(resolve, 1000)) // Simula una llamada a la API
  showToast('Configuración guardada correctamente', 'success')
  loading.value = false
}
</script>