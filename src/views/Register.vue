<template>
  <main class="min-h-screen flex flex-col md:flex-row items-center justify-center p-6 gap-8">
    <div class="fixed top-0 left-0 flex items-center pt-4 pl-10 cursor-pointer" @click="router.push('/products')">
      <Logo class="h-8 w-auto" />
    </div>
    <!-- Registration Form Section -->
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Registrate!</h1>
        <p class="text-gray-600">Crea una cuenta para acceder a precios especiales y ofertas personalizadas o puedes simplemente...</p>
        <!-- Back to products link -->
        <router-link 
          to="/products" 
          class="inline-flex items-center text-sm text-purple-600 hover:text-purple-800 mt-2 font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Volver a la página principal y comprar!
        </router-link>
      </div>
      
      <!-- Registration Form -->
      <div class="bg-white p-8 rounded-xl shadow-md border border-purple-100">
        <div class="flex justify-end">
          <span class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800 font-medium mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Registro de Clientes
          </span>
        </div>
        <form @submit.prevent="handleRegister" class="space-y-6">
          <div class="space-y-2">
            <label for="client-name" class="block text-sm font-medium text-gray-700">Nombre completo</label>
            <input
              id="client-name"
              v-model="form.name"
              type="text"
              placeholder="Tu nombre completo"
              required
              class="w-full px-3 py-2 border border-purple-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
            />
          </div>
          
          <div class="space-y-2">
            <label for="client-email" class="block text-sm font-medium text-gray-700">Correo electrónico</label>
            <input
              id="client-email"
              v-model="form.email"
              type="email"
              placeholder="correo@empresa.com"
              required
              class="w-full px-3 py-2 border border-purple-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
            />
          </div>
          
          <div class="space-y-2">
            <label for="client-password" class="block text-sm font-medium text-gray-700">Contraseña</label>
            <div class="relative">
              <input
                id="client-password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
                required
                class="w-full px-3 py-2 border border-purple-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400 pr-10"
              />
              <button
                type="button"
                @click="togglePasswordVisibility"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <svg v-if="showPassword" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
          </div>
          
          <div v-if="authStore.error" class="bg-red-50 text-red-600 p-3 rounded-md text-sm">
            {{ authStore.error }}
          </div>
          
          <button
            type="submit"
            :disabled="authStore.loading"
            class="w-full py-2 px-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
          >
            {{ authStore.loading ? "Registrando..." : "Crear mi cuenta" }}
          </button>
          
          <div class="text-xs text-center text-gray-500">
            Al registrarte, aceptas nuestros <a href="/terminos" class="text-purple-600 hover:text-purple-800">términos y condiciones</a>
          </div>
        </form>
        
        <div class="mt-6 text-center text-sm">
          <p class="text-gray-600">
            ¿Ya tienes una cuenta?
            <router-link to="/login" class="text-purple-600 hover:text-purple-800 font-medium ml-1">
              Iniciar sesión
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useClientAuthStore } from '../stores/authClients'
import { useCustomToast } from '../composables/useToast'
import Logo from '../components/Logo.vue'

const router = useRouter()
const authStore = useClientAuthStore()
const { showSuccess, showError } = useCustomToast()

// Form visibility states
const showPassword = ref(false)

// Form data
const form = ref({
  name: '',
  email: '',
  password: ''
})

// Toggle password visibility function
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

async function handleRegister() {
  try {
    const success = await authStore.register(form.value.name, form.value.email, form.value.password)
    if (success) {
      showSuccess('¡Cuenta creada exitosamente! Bienvenido a Mesura.')
      router.push('/client-dashboard')
    } else {
      showError('Error al crear la cuenta')
    }
  } catch (error) {
    showError('Error en el registro')
  }
}
</script>