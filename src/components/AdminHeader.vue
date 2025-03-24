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
      
      <!-- Admin logo and title -->
      <div class="flex items-center space-x-2 pb-6 border-b border-purple-100">
        <Logo class="h-10 w-auto" />
        <div class="flex flex-col">
          <h2 class="text-xl font-bold text-purple-800">ADMIN</h2>
          <span class="text-xs text-gray-500">Panel de administración</span>
        </div>
      </div>
      
      <!-- Admin Navigation links -->
      <nav class="flex flex-col gap-5 mt-8">
        <router-link to="/admin/dashboard" class="text-lg font-medium transition-colors hover:text-purple-600 flex items-center" @click="isMobileMenuOpen = false">
          <LayoutDashboard class="h-5 w-5 mr-2" />
          Dashboard
        </router-link>
        <router-link to="/admin/settings/products" class="text-lg font-medium transition-colors hover:text-purple-600 flex items-center" @click="isMobileMenuOpen = false">
          <ShoppingBag class="h-5 w-5 mr-2" />
          Productos
        </router-link>
        <router-link to="/admin/settings/orders" class="text-lg font-medium transition-colors hover:text-purple-600 flex items-center" @click="isMobileMenuOpen = false">
          <ClipboardList class="h-5 w-5 mr-2" />
          Pedidos
        </router-link>
        <router-link to="/admin/settings/customers" class="text-lg font-medium transition-colors hover:text-purple-600 flex items-center" @click="isMobileMenuOpen = false">
          <Users class="h-5 w-5 mr-2" />
          Clientes
        </router-link>
        <router-link to="/admin/settings/users" class="text-lg font-medium transition-colors hover:text-purple-600 flex items-center" @click="isMobileMenuOpen = false">
          <Users class="h-5 w-5 mr-2" />
          Usuarios
        </router-link>
      </nav>
      
      <!-- Spacer to push account section to bottom -->
      <div class="flex-grow"></div>
      
      <!-- Account section -->
      <div class="mt-6 pt-6 border-t border-purple-100">
        <div class="flex items-center mb-4">
          <div class="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
            <User class="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <p class="font-medium">{{ userDetails?.first_name || 'Admin' }}</p>
            <p class="text-sm text-gray-500">{{ userDetails?.email || userStore.user?.email }}</p>
          </div>
        </div>
        
        <button 
          @click="handleLogout"
          class="w-full py-2 flex items-center justify-center rounded-md bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors"
        >
          <LogOut class="h-4 w-4 mr-2" />
          Cerrar sesión
        </button>
      </div>

      <!-- Decorative element -->
      <div class="mt-6 text-center text-xs text-gray-500">
        <p>© 2025 MESURA Admin</p>
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
      
      <!-- Left Side - Logo & Admin text -->
      <div class="flex items-center gap-2 md:gap-4">
        <router-link to="/admin/dashboard" class="hidden md:flex">
          <Logo class="h-8 w-auto" />
          <span class="sr-only">MESURA Admin</span>
        </router-link>
        <nav class="hidden md:flex gap-4 lg:gap-6 ml-6">
          <router-link to="/admin/dashboard" class="text-sm font-medium transition-colors hover:text-primary">
            Dashboard
          </router-link>
          <router-link to="/admin/settings/users" class="text-sm font-medium transition-colors hover:text-primary">
            Usuarios
          </router-link>
          <router-link to="/admin/settings/customers" class="text-sm font-medium transition-colors hover:text-primary">
            Clientes
          </router-link>
          <router-link to="/admin/settings/products" class="text-sm font-medium transition-colors hover:text-primary">
            Productos
          </router-link>
          <router-link to="/admin/settings/orders" class="text-sm font-medium transition-colors hover:text-primary">
            Pedidos
          </router-link>
        </nav>
      </div>
      
      <!-- Center - Mobile Logo -->
      <div class="flex md:hidden flex-1 items-center justify-center">
        <router-link to="/admin/dashboard" class="flex items-center">
          <Logo class="h-8 w-auto" />
          <span class="sr-only">MESURA Admin</span>
        </router-link>
      </div>
      
      <!-- Right Side - Admin Actions -->
      <div class="flex flex-1 items-center justify-end gap-2">
        <!-- Notification Button -->
        <div class="relative">
          <button class="inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-accent hover:text-accent-foreground">
            <Bell class="h-5 w-5" />
            <!-- Notification indicator -->
            <span class="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-purple-600 text-[10px] font-medium text-white">3</span>
            <span class="sr-only">Notificaciones</span>
          </button>
        </div>
        
        <!-- Settings Button -->
        <router-link to="/admin/settings" class="inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-accent hover:text-accent-foreground">
          <Settings class="h-5 w-5" />
          <span class="sr-only">Configuración</span>
        </router-link>
        
        <!-- User Menu with dropdown -->
        <div class="relative">
          <button 
            @click="isUserMenuOpen = !isUserMenuOpen"
            class="admin-dropdown-button flex items-center gap-2 p-2 rounded-md text-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <div class="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
              <User class="h-4 w-4 text-purple-600" />
            </div>
            <span class="hidden md:block text-sm font-medium">{{ userDetails?.first_name || 'Admin' }}</span>
          </button>
          
          <!-- Admin Dropdown Menu - only shows when authenticated -->
          <div 
            v-if="isUserMenuOpen && isAuthenticated" 
            class="admin-dropdown absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
            role="menu"
            aria-orientation="vertical"
          >
            <div class="px-4 py-2 text-sm border-b border-gray-100">
              <p class="font-medium text-gray-900">{{ userDetails?.first_name || 'Admin' }}</p>
              <p class="text-gray-500 truncate">{{ userDetails?.email || userStore.user?.email }}</p>
            </div>
            <router-link to="/admin/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-purple-50" @click="isUserMenuOpen = false">
              <div class="flex items-center">
                <User class="h-4 w-4 mr-2" />
                Mi perfil
              </div>
            </router-link>
            <button 
              @click="handleLogout"
              class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-purple-50"
              role="menuitem"
            >
              <div class="flex items-center">
                <LogOut class="h-4 w-4 mr-2" />
                Cerrar sesión
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { 
  Menu, 
  User, 
  X, 
  LogOut,
  LayoutDashboard,
  ShoppingBag,
  ClipboardList,
  Users,
  Settings,
  Bell
} from 'lucide-vue-next'
import Logo from './Logo.vue'
import { useUserAuthStore } from '../stores/authUser'
import { useCustomToast } from '../composables/useToast'

const router = useRouter()
const userStore = useUserAuthStore()
const isMobileMenuOpen = ref(false)
const isUserMenuOpen = ref(false)

const isAuthenticated = computed(() => userStore.isAuthenticated)
const userDetails = computed(() => userStore.userDetails)

// Array of farewell messages
const farewellMessages = [
  "¡Que tengas un excelente descanso! Has hecho un gran trabajo hoy 🌟",
  "¡Hasta pronto! Gracias por mantener todo en orden, tómate un merecido descanso ✨",
  "¡Nos vemos! Recuerda que tu dedicación hace la diferencia, ahora es momento de recargar energías 🌙",
  "¡Que descanses! Tu esfuerzo hace que MESURA sea mejor cada día 💫",
  "¡Hasta la próxima! Es momento de relajarse después de un productivo día de trabajo 🎯"
]

async function handleLogout() {
  const { showSuccess } = useCustomToast()
  const randomMessage = farewellMessages[Math.floor(Math.random() * farewellMessages.length)]
  await userStore.logout()
  isMobileMenuOpen.value = false
  isUserMenuOpen.value = false
  showSuccess(randomMessage)
  router.push('/')
}
</script>