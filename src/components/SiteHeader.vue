<template>
  <!-- Mobile menu backdrop - moved outside header -->
  <div v-if="isMobileMenuOpen" class="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm" @click="isMobileMenuOpen = false"></div>
  
  <!-- Enhanced Mobile menu sidebar - moved outside header -->
  <div 
    class="fixed inset-y-0 left-0 z-50 w-[300px] sm:w-[400px] h-screen bg-white shadow-xl transform transition-transform duration-300 flex flex-col"
    :class="isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'"
  >
    <div class="p-6 flex flex-col h-full overflow-y-auto">
      <!-- Close button -->
      <button 
        @click="isMobileMenuOpen = false"
        class="absolute top-5 right-5 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-100 transition-colors"
        aria-label="Close menu"
      >
        <X class="h-5 w-5" />
      </button>
      
      <!-- Logo and title - only show text if Logo doesn't include it -->
      <div class="flex items-center space-x-2 pb-6 border-b border-purple-100">
        <Logo class="h-10 w-auto" />
        <!-- Remove this if Logo already includes MESURA text -->
        <!-- <h2 class="text-2xl font-bold text-purple-800">MESURA</h2> -->
      </div>
      
      <!-- Navigation links -->
      <nav class="flex flex-col gap-5 mt-8">
        <router-link to="/" class="text-lg font-medium transition-colors hover:text-purple-600 flex items-center" @click="isMobileMenuOpen = false">
          <Home class="h-5 w-5 mr-2" />
          Inicio
        </router-link>
        <router-link to="/products" class="text-lg font-medium transition-colors hover:text-purple-600 flex items-center" @click="isMobileMenuOpen = false">
          <ShoppingBag class="h-5 w-5 mr-2" />
          Productos
        </router-link>
        <router-link to="/products/category/new" class="text-lg font-medium transition-colors hover:text-purple-600 flex items-center" @click="isMobileMenuOpen = false">
          <Star class="h-5 w-5 mr-2" />
          Novedades
        </router-link>
        <router-link to="/products/category/sale" class="text-lg font-medium transition-colors hover:text-purple-600 flex items-center" @click="isMobileMenuOpen = false">
          <Tag class="h-5 w-5 mr-2" />
          Ofertas
        </router-link>
        <router-link to="/about" class="text-lg font-medium transition-colors hover:text-purple-600 flex items-center" @click="isMobileMenuOpen = false">
          <Info class="h-5 w-5 mr-2" />
          Nosotros
        </router-link>
        <router-link to="/contact" class="text-lg font-medium transition-colors hover:text-purple-600 flex items-center" @click="isMobileMenuOpen = false">
          <MessageSquare class="h-5 w-5 mr-2" />
          Contacto
        </router-link>
      </nav>
      
      <!-- Spacer to push account section to bottom -->
      <div class="flex-grow"></div>
      
      <!-- Account section - now using clientStore -->
      <div class="mt-6 pt-6 border-t border-purple-100">
        <template v-if="isClientAuthenticated">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
              <User class="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p class="font-medium">{{ clientDetails?.first_name || 'Cliente' }}</p>
              <p class="text-sm text-gray-500">{{ clientDetails?.email || clientStore.client?.email }}</p>
            </div>
          </div>
          
          <button 
            @click="logout"
            class="w-full py-2 flex items-center justify-center rounded-md bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors"
          >
            <LogOut class="h-4 w-4 mr-2" />
            Cerrar sesión
          </button>
        </template>
        <template v-else>
          <router-link 
            to="/login"
            class="w-full py-2 flex items-center justify-center rounded-md bg-purple-600 text-white hover:bg-purple-700 transition-colors"
            @click="isMobileMenuOpen = false"
          >
            <LogIn class="h-4 w-4 mr-2" />
            Iniciar sesión
          </router-link>
          <router-link 
            to="/register"
            class="w-full mt-2 py-2 flex items-center justify-center rounded-md bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors"
            @click="isMobileMenuOpen = false"
          >
            <UserPlus class="h-4 w-4 mr-2" />
            Registrarse
          </router-link>
        </template>
      </div>

      <!-- Decorative element -->
      <div class="mt-6 text-center text-xs text-gray-500">
        <p>© 2025 MESURA</p>
        <div class="flex justify-center space-x-2 mt-2">
          <div class="w-2 h-2 rounded-full bg-purple-200"></div>
          <div class="w-2 h-2 rounded-full bg-purple-300"></div>
          <div class="w-2 h-2 rounded-full bg-purple-400"></div>
        </div>
      </div>
    </div>
  </div>

  <!-- Header - now separate from sidebar -->
  <header class="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div class="container flex h-16 items-center">
      <!-- Mobile menu toggle button -->
      <button 
        class="md:hidden inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-accent hover:text-accent-foreground"
        @click="isMobileMenuOpen = !isMobileMenuOpen"
      >
        <Menu class="h-5 w-5" />
        <span class="sr-only">Toggle menu</span>
      </button>
      
      <!-- Left Side - Logo & Nav -->
      <div class="flex items-center gap-2 md:gap-4">
        <router-link to="/" class="hidden md:flex">
          <Logo class="h-8 w-auto" />
          <span class="sr-only">MESURA</span>
        </router-link>
        <nav class="hidden md:flex gap-4 lg:gap-6 ml-6">
          <router-link to="/" class="text-sm font-medium transition-colors hover:text-primary">
            Inicio
          </router-link>
          <router-link to="/products" class="text-sm font-medium transition-colors hover:text-primary">
            Productos
          </router-link>
          <router-link to="/products/category/new" class="text-sm font-medium transition-colors hover:text-primary">
            Novedades
          </router-link>
          <router-link to="/products/category/sale" class="text-sm font-medium transition-colors hover:text-primary">
            Ofertas
          </router-link>
        </nav>
      </div>
      
      <!-- Center - Mobile Logo -->
      <div class="flex md:hidden flex-1 items-center justify-center">
        <router-link to="/" class="flex items-center">
          <Logo class="h-8 w-auto" />
          <span class="sr-only">MESURA</span>
        </router-link>
      </div>
      
      <!-- Right Side - Actions -->
      <div class="flex flex-1 items-center justify-end gap-2">
        <form class="hidden lg:flex items-center" @submit.prevent="search">
          <input
            type="search"
            v-model="searchQuery"
            placeholder="Buscar..."
            class="w-[200px] lg:w-[300px] rounded-r-none border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button type="submit" class="inline-flex items-center justify-center rounded-l-none rounded-r-md border border-input border-l-0 bg-background px-3 py-2 text-sm font-medium hover:bg-accent">
            <Search class="h-4 w-4" />
            <span class="sr-only">Buscar</span>
          </button>
        </form>

        <button class="inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-accent hover:text-accent-foreground">
          <ShoppingBag class="h-5 w-5" />
          <span class="sr-only">Carrito</span>
        </button>
        
        <router-link to="/login" class="inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-accent hover:text-accent-foreground">
          <Heart class="h-5 w-5" />
          <span class="sr-only">Favoritos</span>
        </router-link>
         
        <!-- User account with dropdown -->
        <div class="relative">
          <button 
            @click="isUserMenuOpen = !isUserMenuOpen"
            class="user-dropdown-button hidden sm:flex items-center justify-center rounded-md p-2 text-foreground hover:bg-accent hover:text-accent-foreground"
            aria-haspopup="true" 
            aria-expanded="false"
          >
            <User class="h-5 w-5" />
            <span class="sr-only">Cuenta</span>
          </button>
          
          <!-- Dropdown menu -->
          <div 
            v-if="isUserMenuOpen" 
            class="user-dropdown absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
            role="menu"
            aria-orientation="vertical"
          >
            <template v-if="isClientAuthenticated">
              <div class="px-4 py-2 text-sm border-b border-gray-100">
                <p class="font-medium text-gray-900">{{ clientDetails?.first_name || 'Cliente' }}</p>
                <p class="text-gray-500 truncate">{{ clientDetails?.email || clientStore.client?.email }}</p>
              </div>
              <router-link to="/perfil" class="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50" @click="isUserMenuOpen = false">
                <div class="flex items-center">
                  <User class="h-4 w-4 mr-2" />
                  Mi perfil
                </div>
              </router-link>
              <router-link to="/mis-compras" class="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50" @click="isUserMenuOpen = false">
                <div class="flex items-center">
                  <ShoppingBag class="h-4 w-4 mr-2" />
                  Mis compras
                </div>
              </router-link>
              <router-link to="/favoritos" class="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50" @click="isUserMenuOpen = false">
                <div class="flex items-center">
                  <Heart class="h-4 w-4 mr-2" />
                  Favoritos
                </div>
              </router-link>
              <button @click="handleLogout" class="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50">
                <div class="flex items-center">
                  <LogOut class="h-4 w-4 mr-2" />
                  Cerrar sesión
                </div>
              </button>
            </template>
            <template v-else>
              <router-link to="/login" class="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50" @click="isUserMenuOpen = false">
                <div class="flex items-center">
                  <LogIn class="h-4 w-4 mr-2" />
                  Iniciar sesión
                </div>
              </router-link>
              <router-link to="/register" class="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50" @click="isUserMenuOpen = false">
                <div class="flex items-center">
                  <UserPlus class="h-4 w-4 mr-2" />
                  Registrarse
                </div>
              </router-link>
            </template>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { 
  Menu, 
  Search, 
  User, 
  Heart, 
  ShoppingBag, 
  X, 
  Home,
  Star,
  Tag,
  Info,
  MessageSquare,
  LogOut,
  LogIn,
  UserPlus
} from 'lucide-vue-next'
import Logo from './Logo.vue'
import { useClientAuthStore } from '../stores/authClients.js'
import { useCustomToast } from '../composables/useToast'

const router = useRouter()
const clientStore = useClientAuthStore()
const { showSuccess } = useCustomToast()
const isMobileMenuOpen = ref(false)
const searchQuery = ref('')
const isUserMenuOpen = ref(false)

// Client authentication check - using ONLY the client store
const isClientAuthenticated = computed(() => {
  return clientStore.isAuthenticated
})

const clientDetails = computed(() => clientStore.clientDetails)

function search() {
  console.log('Searching for:', searchQuery.value)
  // Implement search functionality
}

async function logout() {
  await clientStore.logout()
  isMobileMenuOpen.value = false
  isUserMenuOpen.value = false
  showSuccess('¡Hasta pronto! Recuerda que puedes seguir comprando en nuestra tienda 🛍️')
  router.push('/')
}

function handleLogout() {
  logout()
}

// Close dropdown when clicking outside
function closeUserMenuOnClickOutside(event) {
  if (isUserMenuOpen.value) {
    const dropdown = document.querySelector('.user-dropdown')
    const button = document.querySelector('.user-dropdown-button')
    if (dropdown && !dropdown.contains(event.target) && button && !button.contains(event.target)) {
      isUserMenuOpen.value = false
    }
  }
}

onMounted(() => {
  document.addEventListener('click', closeUserMenuOnClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', closeUserMenuOnClickOutside)
})
</script>