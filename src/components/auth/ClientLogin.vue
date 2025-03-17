<template>
  <main class="min-h-screen flex flex-col md:flex-row items-center justify-center p-6 gap-8">
    <!-- Login Form Section -->
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Portal Exclusivo</h1>
        <p class="text-gray-600">Accede a precios especiales y ofertas personalizadas para clientes o puedes simplemente...</p>
        <!-- Added home link -->
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
      
      <!-- Login Form -->
      <div class="bg-white p-8 rounded-xl shadow-md border border-purple-100">
        <div class="flex justify-end">
          <span class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800 font-medium mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Área de Clientes
          </span>
        </div>
        <form @submit.prevent="handleLogin" class="space-y-6">
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
            <div class="flex justify-between items-center">
              <label for="client-password" class="block text-sm font-medium text-gray-700">Contraseña</label>
              <button 
                type="button"
                @click="forgotPassword" 
                class="text-xs text-purple-600 hover:text-purple-800"
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
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
            {{ authStore.loading ? "Iniciando sesión..." : "Acceder a mi cuenta" }}
          </button>
          
          <div class="text-xs text-center text-gray-500">
            Inicia sesión para ver tus ofertas personalizadas
          </div>
          
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <span class="w-full border-t border-gray-200" />
            </div>
            <div class="relative flex justify-center text-xs uppercase">
              <span class="bg-white px-2 text-gray-500">O continúa con</span>
            </div>
          </div>
          
          <div class="grid grid-cols-1 gap-4">
            <button 
              type="button" 
              class="py-2 px-4 border border-purple-200 hover:bg-purple-50 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300 flex items-center justify-center"
            >
              <span>Microsoft 365</span>
            </button>
          </div>
        </form>
      </div>
      
      <div class="mt-6 text-center text-sm">
        <p class="text-gray-600">
          ¿No tienes una cuenta todavía?
          <router-link to="/register" class="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium ml-1">
            Regístrate ahora
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </router-link>
        </p>
      </div>
      <div class="mt-6 text-center text-sm">
        <p class="text-gray-600">
          ¿No tienes acceso a los descuentos exclusivos?
          <a href="/contacto" class="text-purple-600 hover:text-purple-800 font-medium ml-1">
            Solicítalo ahora
          </a>
        </p>
      </div>
    </div>
    
    <!-- Side Panel (Hidden on Mobile) -->
    <div class="hidden md:block w-full max-w-md relative">
      <div class="absolute -top-20 -left-20 w-40 h-40 opacity-20">
        <img 
          src="https://v0.dev/placeholder.svg?height=160&width=160" 
          alt="Decorative element" 
          class="transform rotate-45"
        />
      </div>
      <div class="bg-gradient-to-br from-purple-200 to-pink-100 p-8 rounded-xl shadow-lg">
        <div class="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 text-purple-700 font-medium text-sm mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Ofertas por tiempo limitado
        </div>
        <h2 class="text-2xl font-bold text-gray-800 mb-4">Beneficios exclusivos para clientes</h2>
        <ul class="space-y-2 mb-6 text-gray-700">
          <li class="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-purple-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Precios especiales y descuentos exclusivos</span>
          </li>
          <li class="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-purple-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Gestión rápida de pedidos y seguimiento</span>
          </li>
          <li class="flex items-start">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-purple-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Catálogo completo con disponibilidad en tiempo real</span>
          </li>
        </ul>
        <a 
          href="/business" 
          class="inline-flex items-center text-purple-700 font-medium hover:text-purple-900"
        >
          Ver todas las ventajas
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
      <div class="absolute -bottom-10 -right-10 w-32 h-32 opacity-20">
        <img 
          src="https://v0.dev/placeholder.svg?height=128&width=128" 
          alt="Decorative element" 
          class="transform -rotate-12"
        />
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useClientAuthStore } from '../../stores/authClients'

const router = useRouter()
const authStore = useClientAuthStore()
const showPassword = ref(false)

const form = ref({
  email: '',
  password: ''
})

// Toggle password visibility
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

async function handleLogin() {
  const success = await authStore.login(form.value.email, form.value.password)
  if (success) {
    router.push('/client-dashboard') // Different redirect for clients
  }
}

async function forgotPassword() {
  if (!form.value.email) {
    alert('Por favor ingrese su dirección de email primero')
    return
  }
  
  const success = await authStore.resetPassword(form.value.email)
  if (success) {
    alert('Se ha enviado un correo con instrucciones para restablecer su contraseña')
  }
}
</script>