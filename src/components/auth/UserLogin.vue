<template>
    <main class="min-h-screen flex flex-col md:flex-row items-center justify-center p-6 gap-8">
      <!-- Login Form Section -->
      <div class="w-full max-w-md">
        <div class="text-center mb-8">
          <h1 class="text-3xl font-bold text-gray-800 mb-2">Portal Administrativo</h1>
          <p class="text-gray-600">Inicia sesión para gestionar tu plataforma</p>
        </div>
        
        <!-- Login Form -->
        <div class="bg-white p-8 rounded-xl shadow-md border border-purple-100">
          <div class="flex justify-end">
          <span class="inline-flex items-center px-2 py-1 rounded-full text-xs bg-purple-100 text-purple-800 font-medium mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Área de administración
          </span>
        </div>
          <form @submit.prevent="handleLogin" class="space-y-6">
            <div class="space-y-2">
              <label for="user-email" class="block text-sm font-medium text-gray-700">Correo electrónico</label>
              <input
                id="user-email"
                v-model="form.email"
                type="email"
                placeholder="admin@mesura.com"
                required
                class="w-full px-3 py-2 border border-purple-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-200 focus:border-purple-400"
              />
            </div>
            
            <div class="space-y-2">
              <div class="flex justify-between items-center">
                <label for="user-password" class="block text-sm font-medium text-gray-700">Contraseña</label>
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
                  id="user-password"
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
              {{ authStore.loading ? "Verificando credenciales..." : "Acceder al sistema" }}
            </button>
            
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <span class="w-full border-t border-gray-200" />
              </div>
              <div class="relative flex justify-center text-xs uppercase">
                <span class="bg-white px-2 text-gray-500">Acceso seguro</span>
              </div>
            </div>
            
            <div class="text-center text-xs text-gray-500">
              <p>Este es un sistema protegido. El acceso no autorizado está prohibido y puede ser objeto de acciones legales.</p>
            </div>
          </form>
        </div>
        
        <div class="mt-6 text-center text-sm">
          <p class="text-gray-600">
            ¿Problemas de acceso?
            <a href="/soporte" class="text-purple-600 hover:text-purple-800 font-medium ml-1">
              Contacta con soporte técnico
            </a>
          </p>
          
          <p class="text-gray-600 mt-3">
            ¿No eres administrador?
            <router-link to="/products" class="text-purple-600 hover:text-purple-800 font-medium ml-1">
              Volver al sitio para clientes
            </router-link>
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
        <div class="bg-gradient-to-br from-purple-200 to-blue-100 p-8 rounded-xl shadow-lg">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">Panel de Administración</h2>
          <p class="text-gray-700 mb-6">
            Gestiona productos, órdenes, inventario y usuarios. Accede a estadísticas y reportes en tiempo real.
          </p>
          <div class="space-y-4">
            <div class="flex items-start">
              <div class="flex-shrink-0 h-5 w-5 text-purple-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </div>
              <p class="ml-3 text-sm text-gray-700">Análisis completo de ventas</p>
            </div>
            <div class="flex items-start">
              <div class="flex-shrink-0 h-5 w-5 text-purple-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </div>
              <p class="ml-3 text-sm text-gray-700">Gestión de inventario</p>
            </div>
            <div class="flex items-start">
              <div class="flex-shrink-0 h-5 w-5 text-purple-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </div>
              <p class="ml-3 text-sm text-gray-700">Control de usuarios y permisos</p>
            </div>
          </div>
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
import { useUserAuthStore } from '../../stores/authUser'
import { useClientAuthStore } from '../../stores/authClients'
import { useCustomToast } from '../../composables/useToast'

const router = useRouter()
const authStore = useUserAuthStore()
const clientAuthStore = useClientAuthStore()
const showPassword = ref(false)
const { showSuccess, showError, showWarning } = useCustomToast()

const form = ref({
  email: '',
  password: ''
})

// Toggle password visibility
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

async function handleLogin() {
  try {
    // Primero intentamos login como admin
    const success = await authStore.login(form.value.email, form.value.password)
    
    if (success) {
      showSuccess('¡Bienvenido al panel de administración!')
      router.push('/admin/dashboard')
      return
    }
    
    // Si falla, intentamos login como cliente
    const clientSuccess = await clientAuthStore.login(form.value.email, form.value.password)
    
    if (clientSuccess) {
      showWarning('Has iniciado sesión con una cuenta de cliente. Redirigiendo al área de clientes...')
      router.push('/products')
      return
    }
    
    // Si ambos fallan, mostramos error de credenciales
    showError('Credenciales incorrectas')
  } catch (error) {
    showError('Error al iniciar sesión')
  }
}

async function forgotPassword() {
  if (!form.value.email) {
    showError('Por favor ingrese su dirección de email primero')
    return
  }
  
  const success = await authStore.resetPassword(form.value.email)
  if (success) {
    showSuccess('Se ha enviado un correo con instrucciones para restablecer su contraseña')
  }
}
</script>

<style>
/* Estilos adicionales pueden ir aquí si es necesario */
</style>