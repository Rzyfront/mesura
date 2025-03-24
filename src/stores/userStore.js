import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '../supabase'

export const useUserStore = defineStore('users', () => {
  const users = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Función para obtener todos los usuarios administradores
  async function fetchUsers() {
    loading.value = true
    error.value = null
    
    try {
      // Obtener usuarios administradores de la tabla users
      const { data, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .in('role', ['admin', 'super_admin'])
        .order('created_at', { ascending: false })
      
      if (fetchError) throw fetchError
      
      users.value = data || []
      return data
    } catch (err) {
      console.error('Error fetching users:', err)
      error.value = err.message || 'Error al cargar los usuarios'
      return []
    } finally {
      loading.value = false
    }
  }

  // Función para crear un nuevo usuario administrador
  async function createUser(userData) {
    loading.value = true
    error.value = null
    
    try {
      // 1. Crear el usuario usando el método de registro estándar
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
        options: {
          data: {
            first_name: userData.firstName,
            last_name: userData.lastName,
            role: userData.role
          }
        }
      })
      
      if (authError) throw authError
      
      if (!authData.user) {
        throw new Error('No se pudo crear el usuario en el sistema de autenticación')
      }
      
      // 2. Crear el registro en la tabla users con todos los campos requeridos
      const { error: insertError } = await supabase
        .from('users')
        .insert({
          id: authData.user.id,
          role: userData.role,
          first_name: userData.firstName,
          last_name: userData.lastName,
          phone: userData.phone || '',
          identification: userData.identification || '',
          country: userData.country || '',
          city: userData.city || '',
          email: userData.email,
          address: userData.address || '',
          status: true
          // No incluimos created_at y updated_at para usar los valores predeterminados de la base de datos
        })
      
      if (insertError) throw insertError
      
      // 3. Actualizar la lista de usuarios
      await fetchUsers()
      
      return { 
        success: true, 
        userId: authData.user.id 
      }
    } catch (err) {
      console.error('Error creating user:', err)
      error.value = err.message || 'Error al crear el usuario'
      return { 
        success: false, 
        error: err.message || 'Error al crear el usuario' 
      }
    } finally {
      loading.value = false
    }
  }

  // Función para eliminar (desactivar) un usuario
  async function deleteUser(userId) {
    loading.value = true
    error.value = null
    
    try {
      // Actualizar el estado del usuario a false (inactivo) en lugar de eliminarlo realmente
      const { error: updateError } = await supabase
        .from('users')
        .update({ status: false })
        .eq('id', userId)
      
      if (updateError) throw updateError
      
      // Actualizar la lista de usuarios
      await fetchUsers()
      
      return { success: true }
    } catch (err) {
      console.error('Error deleting user:', err)
      error.value = err.message || 'Error al desactivar el usuario'
      return { 
        success: false, 
        error: err.message || 'Error al desactivar el usuario' 
      }
    } finally {
      loading.value = false
    }
  }

  // Función para actualizar un usuario
  async function updateUser(userId, userData) {
    loading.value = true
    error.value = null
    
    try {
      // Update user data in users table
      const { error: updateError } = await supabase
        .from('users')
        .update({
          first_name: userData.first_name,
          last_name: userData.last_name,
          phone: userData.phone,
          role: userData.role,
          identification: userData.identification,
          country: userData.country,
          city: userData.city,
          address: userData.address
        })
        .eq('id', userId)

      if (updateError) throw updateError

      // Refresh users list
      await fetchUsers()

      return { success: true }
    } catch (err) {
      console.error('Error updating user:', err)
      error.value = err.message || 'Error al actualizar el usuario'
      return { 
        success: false, 
        error: err.message || 'Error al actualizar el usuario' 
      }
    } finally {
      loading.value = false
    }
  }

  // Añade esta función a tu store para forzar el fin del estado de carga
  function forceEndLoading() {
    loading.value = false
  }

  return {
    users,
    loading,
    error,
    fetchUsers,
    createUser,
    deleteUser,
    updateUser,
    forceEndLoading
  }
})