<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <div>
        <h3 class="text-xl font-semibold text-gray-900">
          {{ showForm ? (isEditMode ? 'Editar Usuario' : 'Agregar Nuevo Usuario') : 'Usuarios del Sistema' }}
        </h3>
        <p class="text-sm text-gray-500 hidden sm:block">
          {{ showForm ? (isEditMode ? 'Modifica los datos del usuario' : 'Completa el formulario para crear un nuevo usuario') : 'Gestiona los usuarios administradores y super administradores' }}
        </p>
      </div>
      <button 
        v-if="!showForm"
        @click="openNewUserForm"
        class="px-2 py-1 sm:px-4 sm:py-2 bg-primary text-white rounded-md hover:bg-primary-700 transition-colors flex items-center gap-1 sm:gap-2 text-xs sm:text-base whitespace-nowrap"
      >
        <UserPlus class="h-4 w-4 sm:h-5 sm:w-5" />
        <span class="hidden md:inline lg:hidden">Nuevo</span>
        <span class="hidden lg:inline">Nuevo Usuario</span>
      </button>
      <button 
        v-else
        @click="cancelUserForm"
        class="px-2 py-1 sm:px-4 sm:py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors flex items-center gap-1 sm:gap-2 text-xs sm:text-base"
      >
        <ArrowLeft class="h-4 w-4 sm:h-5 sm:w-5" />
        <span>Volver</span>
      </button>
    </div>

    <!-- Formulario de creación de usuario -->
    <div v-if="showForm" class="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <form @submit.prevent="submitNewUser" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="firstName" class="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
            <input
              id="firstName"
              v-model="newUser.firstName"
              type="text"
              :required="!isEditMode"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-0 focus:outline-none sm:text-sm"
              placeholder="Nombre"
            />
          </div>
          
          <div>
            <label for="lastName" class="block text-sm font-medium text-gray-700 mb-1">Apellidos</label>
            <input
              id="lastName"
              v-model="newUser.lastName"
              type="text"
              :required="!isEditMode"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-0 focus:outline-none sm:text-sm"
              placeholder="Apellidos"
            />
          </div>
          
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
            <input
              id="email"
              v-model="newUser.email"
              type="email"
              :required="!isEditMode"
              :disabled="isEditMode"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-0 focus:outline-none sm:text-sm disabled:bg-gray-50 disabled:text-gray-500"
              placeholder="correo@ejemplo.com"
            />
            <p v-if="emailExists" class="mt-1 text-sm text-red-600">Este correo ya está registrado.</p>
          </div>
          
          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
            <input
              id="phone"
              v-model="newUser.phone"
              type="tel"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-0 focus:outline-none sm:text-sm"
              placeholder="Número de teléfono (opcional)"
            />
          </div>
          
          <div v-if="!isEditMode">
            <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
            <input
              id="password"
              v-model="newUser.password"
              type="password"
              required
              minlength="8"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-0 focus:outline-none sm:text-sm"
              placeholder="Mínimo 8 caracteres"
            />
          </div>
          
          <div v-if="!isEditMode">
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">Confirmar contraseña</label>
            <input
              id="confirmPassword"
              v-model="newUser.confirmPassword"
              type="password"
              required
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-0 focus:outline-none sm:text-sm"
              placeholder="Repite la contraseña"
            />
            <p v-if="passwordMismatch" class="mt-1 text-sm text-red-600">Las contraseñas no coinciden.</p>
          </div>
          
          <div>
            <label for="role" class="block text-sm font-medium text-gray-700 mb-1">Rol del usuario</label>
            <select
              id="role"
              v-model="newUser.role"
              :required="!isEditMode"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-0 focus:outline-none sm:text-sm"
            >
              <option value="admin">Administrador</option>
              <option value="super_admin">Super Administrador</option>
            </select>
          </div>

          <div>
            <label for="identification" class="block text-sm font-medium text-gray-700 mb-1">Identificación</label>
            <input
              id="identification"
              v-model="newUser.identification"
              type="text"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-0 focus:outline-none sm:text-sm"
              placeholder="Identificación (opcional)"
            />
          </div>

          <div>
            <label for="country" class="block text-sm font-medium text-gray-700 mb-1">País</label>
            <input
              id="country"
              v-model="newUser.country"
              type="text"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-0 focus:outline-none sm:text-sm"
              placeholder="País (opcional)"
            />
          </div>

          <div>
            <label for="city" class="block text-sm font-medium text-gray-700 mb-1">Ciudad</label>
            <input
              id="city"
              v-model="newUser.city"
              type="text"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-0 focus:outline-none sm:text-sm"
              placeholder="Ciudad (opcional)"
            />
          </div>

          <div>
            <label for="address" class="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
            <input
              id="address"
              v-model="newUser.address"
              type="text"
              class="block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-0 focus:outline-none sm:text-sm"
              placeholder="Dirección (opcional)"
            />
          </div>
        </div>
        
        <div class="flex justify-end space-x-3">
          <button
            type="button"
            @click="cancelUserForm"
            class="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors focus:outline-none"
          >
            Cancelar
          </button>
          <button
            type="submit"
            :disabled="isSubmitting || (!isEditMode && !formValid)"
            class="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none"
          >
            <div v-if="isSubmitting" class="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
            <span>{{ isSubmitting ? 'Guardando...' : (isEditMode ? 'Actualizar Usuario' : 'Guardar Usuario') }}</span>
          </button>
        </div>
      </form>
    </div>

    <!-- Contenido principal (tabla o estado de carga) -->
    <div v-else>
      <!-- Estado de carga -->
      <div v-if="localLoading || userStore.loading" class="text-center py-8">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-solid border-primary border-r-transparent"></div>
        <p class="mt-2 text-gray-600">Cargando usuarios...</p>
      </div>

      <!-- Mensaje de error -->
      <div v-else-if="userStore.error" class="bg-red-50 border border-red-200 text-red-800 rounded-lg p-4 mb-6">
        <p>{{ userStore.error }}</p>
        <button @click="refreshUserList" class="mt-2 text-sm font-medium text-red-600 hover:text-red-800">
          Intentar nuevamente
        </button>
      </div>

      <!-- Tabla de usuarios -->
      <div v-else-if="userStore.users.length > 0" class="border rounded-lg overflow-x-auto">
        <table class="w-full">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario</th>
              <th class="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Email</th>
              <th class="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Teléfono</th>
              <th class="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
              <th class="px-2 sm:px-6 py-2 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
              <th class="px-2 sm:px-6 py-2 sm:py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <!-- Parte relevante con correcciones -->
          <tbody class="bg-white divide-y divide-gray-200">
            <!-- Bucle principal correcto -->
            <template v-for="user in userStore.users" :key="user.id">
              <!-- Fila principal del usuario -->
              <tr @click="toggleUserDetails(user)" class="cursor-pointer md:cursor-default">
                <td class="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="h-8 w-8 sm:h-10 sm:w-10 rounded-full bg-primary bg-opacity-10 flex items-center justify-center">
                      <User class="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    </div>
                    <div class="ml-2 sm:ml-4">
                      <div class="text-xs sm:text-sm font-medium text-gray-900 truncate max-w-[100px] sm:max-w-none">{{ getUserFullName(user) }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap hidden md:table-cell">
                  <div class="text-xs sm:text-sm text-gray-900 truncate max-w-[150px] lg:max-w-none">{{ user.email }}</div>
                </td>
                <td class="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap hidden lg:table-cell">
                  <div class="text-xs sm:text-sm text-gray-900">{{ user.phone || '-' }}</div>
                </td>
                <td class="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                  <span :class="[
                    'px-1 sm:px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                    user.role === 'super_admin' ? 'bg-primary bg-opacity-10 text-primary' : 'bg-blue-100 text-blue-800'
                  ]">
                    {{ user.role === 'super_admin' ? 'Super' : 'Admin' }}
                  </span>
                </td>
                <td class="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap">
                  <span :class="[
                    'px-1 sm:px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                    user.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  ]">
                    {{ user.status ? 'Activo' : 'Inactivo' }}
                  </span>
                </td>
                <td class="px-2 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div class="flex justify-end space-x-1 sm:space-x-3">
                    <button 
                      @click.stop="openEditUserModal(user)"
                      class="text-primary hover:text-primary-700"
                    >
                      <Pencil class="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                    <button 
                      @click.stop="confirmDeleteUser(user)"
                      class="text-red-600 hover:text-red-900"
                    >
                      <Trash2 class="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                  </div>
                </td>
              </tr>
              
              <!-- Fila de detalles (separada correctamente) -->
              <tr v-if="selectedUserId === user.id" class="md:hidden bg-gray-50">
                <td colspan="6" class="px-4 py-2">
                  <div class="grid grid-cols-1 gap-1 text-xs">
                    <div><span class="font-medium">Email:</span> {{ user.email }}</div>
                    <div><span class="font-medium">Teléfono:</span> {{ user.phone || '-' }}</div>
                    <div><span class="font-medium">País:</span> {{ user.country || '-' }}</div>
                    <div><span class="font-medium">Ciudad:</span> {{ user.city || '-' }}</div>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>

      <!-- Estado sin datos -->
      <div v-else class="bg-white rounded-lg shadow-sm p-8 text-center">
        <User class="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 class="text-lg font-medium text-gray-900 mb-1">No hay usuarios</h3>
        <p class="text-gray-500 mb-4">No se encontraron usuarios administradores en el sistema.</p>
        <button 
          @click="showForm = true"
          class="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-700 transition-colors"
        >
          <UserPlus class="h-5 w-5 mr-2" />
          Crear Primer Usuario
        </button>
      </div>
    </div>
    <ConfirmModal
      v-if="showConfirmModal"
      :title="confirmModalTitle"
      :message="confirmModalMessage"
      :confirm-text="confirmModalConfirmText"
      @confirm="handleConfirmAction"
      @close="showConfirmModal = false"
    />
  </div>
</template>

<script setup>
import { onMounted, ref, computed, watch } from 'vue'
import { User, UserPlus, Pencil, Trash2, ArrowLeft } from 'lucide-vue-next'
import { useUserStore } from '../../../stores/userStore'
import { useCustomToast } from '../../../composables/useToast'
import { supabase } from '../../../supabase'
import ConfirmModal from '../../../components/ConfirmModal.vue'

const userStore = useUserStore()
const { showSuccess, showError, showInfo, showWarning } = useCustomToast()

// Estado local para la interfaz
const localLoading = ref(true) // Empezamos con carga activa
const showForm = ref(false)

// Estado para el formulario de nuevo usuario
const newUser = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  role: 'admin',
  identification: '',
  country: '',
  city: '',
  address: ''
})

// Estado de la validación y envío
const isSubmitting = ref(false)
const emailExists = ref(false)

// Validaciones computadas
const passwordMismatch = computed(() => {
  if (!newUser.value.confirmPassword) return false
  return newUser.value.password !== newUser.value.confirmPassword
})

const formValid = computed(() => {
  if (isEditMode.value) {
    return true // En modo edición, todos los campos son opcionales
  }
  
  // Validación para nuevo usuario
  return (
    newUser.value.firstName.trim() !== '' &&
    newUser.value.lastName.trim() !== '' &&
    newUser.value.email.trim() !== '' &&
    newUser.value.password.trim() !== '' &&
    newUser.value.confirmPassword.trim() !== '' &&
    !passwordMismatch.value
  )
})

// Función para abrir el formulario de nuevo usuario
const isEditMode = ref(false)
const editingUserId = ref(null)

function openNewUserForm() {
  isEditMode.value = false
  editingUserId.value = null
  resetForm()
  showForm.value = true
  showInfo('Completa el formulario para crear un nuevo usuario')
}

// Función para cancelar el formulario de usuario
function cancelUserForm() {
  if (Object.values(newUser.value).some(value => value !== '' && value !== 'admin')) {
    confirmModalTitle.value = 'Cancelar creación'
    confirmModalMessage.value = '¿Estás seguro de que deseas cancelar? Se perderán los datos ingresados.'
    confirmModalConfirmText.value = 'Sí, cancelar'
    pendingAction.value = 'cancel-form'
    showConfirmModal.value = true
  } else {
    showForm.value = false
  }
}

// Cargar usuarios cuando el componente se monta
onMounted(async () => {
  try {
    localLoading.value = true
    await userStore.fetchUsers()
    
    if (userStore.users.length > 0) {
      showInfo(`Se han cargado ${userStore.users.length} usuarios`)
    }
  } catch (error) {
    console.error('Error loading users:', error)
    showError('Error al cargar los usuarios')
  } finally {
    localLoading.value = false
    // Asegurarse de que el loading del store también termine
    if (userStore.loading) {
      userStore.forceEndLoading()
    }
  }
})

// Observar cambios en el estado de carga del store
watch(() => userStore.loading, (newValue) => {
  if (newValue === true) {
    // Si comienza a cargar, configuramos un temporizador de seguridad
    const timer = setTimeout(() => {
      if (userStore.loading) {
        console.warn('Forcing loading state to end after timeout')
        userStore.forceEndLoading()
      }
    }, 5000) // Reducido a 5 segundos para una mejor experiencia
    
    // Limpiamos el temporizador cuando el loading cambia a false
    watch(() => userStore.loading, (nextValue) => {
      if (!nextValue) {
        clearTimeout(timer)
      }
    }, { immediate: true, once: true })
  }
})

// Función para obtener el nombre completo del usuario
function getUserFullName(user) {
  if (user.first_name || user.last_name) {
    return `${user.first_name || ''} ${user.last_name || ''}`.trim()
  }
  return 'Sin nombre'
}

// Función para verificar si el email ya existe
async function checkEmailExists(email) {
  try {
    // Verificar si el email existe en la tabla users
    const { data, error } = await supabase
      .from('users')
      .select('email')
      .eq('email', email)
      .single()
    
    if (error && error.code !== 'PGRST116') { // PGRST116 = No se encontró el registro
      console.error('Error checking email existence:', error)
      return false
    }
    
    // Si encontramos datos, el email ya existe
    return !!data
  } catch (err) {
    console.error('Error checking email existence:', err)
    return false
  }
}

// Función para enviar el formulario de nuevo usuario
async function submitNewUser() {
  if (!formValid.value) {
    showWarning('Por favor, completa todos los campos requeridos')
    return
  }
  
  if (isEditMode.value) {
    await updateExistingUser()
  } else {
    // Existing create user logic
    if (passwordMismatch.value) {
      showWarning('Las contraseñas no coinciden')
      return
    }
    
    isSubmitting.value = true
    emailExists.value = false
    
    try {
      // Verificar si el email ya existe
      const exists = await checkEmailExists(newUser.value.email)
      if (exists) {
        emailExists.value = true
        isSubmitting.value = false
        showWarning('Este correo ya está registrado en el sistema')
        return
      }
      
      // Usar la función del store para crear el usuario con todos los campos necesarios
      const result = await userStore.createUser({
        firstName: newUser.value.firstName,
        lastName: newUser.value.lastName,
        email: newUser.value.email,
        phone: newUser.value.phone,
        password: newUser.value.password,
        role: newUser.value.role,
        identification: newUser.value.identification,
        country: newUser.value.country,
        city: newUser.value.city,
        address: newUser.value.address
      })
      
      if (!result.success) {
        throw new Error(result.error || 'Error al crear el usuario')
      }
      
      // Mostrar mensaje de éxito y actualizar la lista
      showSuccess(`Usuario ${newUser.value.firstName} ${newUser.value.lastName} creado correctamente`)
      resetForm()
      showForm.value = false
      
    } catch (error) {
      console.error('Error creating user:', error)
      showError(error.message || 'Error al crear el usuario')
    } finally {
      isSubmitting.value = false
    }
  }
}

// Función para reiniciar el formulario
function resetForm() {
  newUser.value = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'admin',
    identification: '',
    country: '',
    city: '',
    address: ''
  }
  emailExists.value = false
}

// Función para editar un usuario
function openEditUserModal(user) {
  isEditMode.value = true
  editingUserId.value = user.id
  newUser.value = {
    firstName: user.first_name || '',
    lastName: user.last_name || '',
    email: user.email,
    phone: user.phone || '',
    password: '',
    confirmPassword: '',
    role: user.role,
    identification: user.identification || '',
    country: user.country || '',
    city: user.city || '',
    address: user.address || ''
  }
  showForm.value = true
  showInfo(`Editando usuario: ${getUserFullName(user)}`)
}

// Función para confirmar eliminación de usuario
function confirmDeleteUser(user) {
  const fullName = getUserFullName(user)
  confirmModalTitle.value = 'Desactivar usuario'
  confirmModalMessage.value = `¿Estás seguro de que deseas desactivar al usuario ${fullName}?`
  confirmModalConfirmText.value = 'Sí, desactivar'
  pendingAction.value = 'delete-user'
  actionData.value = user
  showConfirmModal.value = true
}

// Función para actualizar la lista de usuarios con manejo mejorado de errores
async function refreshUserList() {
  try {
    localLoading.value = true
    showInfo('Actualizando lista de usuarios...')
    
    await userStore.fetchUsers()
    
    if (userStore.error) {
      throw new Error(userStore.error)
    }
    
    showSuccess('Lista de usuarios actualizada')
  } catch (error) {
    console.error('Error refreshing users:', error)
    showError('Error al actualizar la lista de usuarios: ' + error.message)
  } finally {
    localLoading.value = false
    // Aseguramos que el estado de carga del store también esté reseteado
    if (userStore.loading) {
      userStore.forceEndLoading()
    }
  }
}

// Añade esta nueva parte a tu setup script
const selectedUserId = ref(null)

function toggleUserDetails(user) {
  if (selectedUserId.value === user.id) {
    selectedUserId.value = null
  } else {
    selectedUserId.value = user.id
  }
}

// Añade estas variables reactivas
const showConfirmModal = ref(false)
const confirmModalTitle = ref('')
const confirmModalMessage = ref('')
const confirmModalConfirmText = ref('Confirmar')
const pendingAction = ref(null)
const actionData = ref(null)

// Añade esta nueva función para manejar las confirmaciones del modal
async function handleConfirmAction() {
  showConfirmModal.value = false
  
  if (pendingAction.value === 'cancel-form') {
    resetForm()
    showForm.value = false
    showInfo('Creación de usuario cancelada')
  } 
  else if (pendingAction.value === 'delete-user' && actionData.value) {
    try {
      const user = actionData.value
      const fullName = getUserFullName(user)
      const result = await userStore.deleteUser(user.id)
      
      if (result.success) {
        showSuccess(`Usuario ${fullName} desactivado correctamente`)
      } else {
        throw new Error(result.error || 'Error al desactivar el usuario')
      }
    } catch (error) {
      console.error('Error deleting user:', error)
      showError(error.message || 'Error al desactivar el usuario')
    }
  }
  
  // Reset action data
  pendingAction.value = null
  actionData.value = null
}

// Add this new function to handle user updates
async function updateExistingUser() {
  isSubmitting.value = true
  
  try {
    // Create update data object only with modified fields
    const updateData = {}
    
    // Check each field and only include if it has a value
    if (newUser.value.firstName.trim()) {
      updateData.first_name = newUser.value.firstName
    }
    if (newUser.value.lastName.trim()) {
      updateData.last_name = newUser.value.lastName
    }
    if (newUser.value.phone) {
      updateData.phone = newUser.value.phone
    }
    if (newUser.value.role) {
      updateData.role = newUser.value.role
    }
    if (newUser.value.identification) {
      updateData.identification = newUser.value.identification
    }
    if (newUser.value.country) {
      updateData.country = newUser.value.country
    }
    if (newUser.value.city) {
      updateData.city = newUser.value.city
    }
    if (newUser.value.address) {
      updateData.address = newUser.value.address
    }

    // Only proceed with update if there are changes
    if (Object.keys(updateData).length === 0) {
      showWarning('No hay cambios para guardar')
      return
    }

    // Call the store's update method
    const result = await userStore.updateUser(editingUserId.value, updateData)
    
    if (!result.success) {
      throw new Error(result.error || 'Error al actualizar el usuario')
    }
    
    showSuccess(`Usuario ${newUser.value.firstName} ${newUser.value.lastName} actualizado correctamente`)
    resetForm()
    showForm.value = false
    isEditMode.value = false
    editingUserId.value = null
    
  } catch (error) {
    console.error('Error updating user:', error)
    showError(error.message || 'Error al actualizar el usuario')
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
@media (max-width: 640px) {
  .overflow-x-auto {
    -webkit-overflow-scrolling: touch;
  }
  
  /* Para ocultar el scrollbar horizontal pero permitir scroll */
  .overflow-x-auto::-webkit-scrollbar {
    display: none;
  }
  
  /* Para navegadores que soportan */
  .overflow-x-auto {
    scrollbar-width: none;
  }
}
</style>