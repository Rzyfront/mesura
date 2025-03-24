import { defineStore } from 'pinia'
import { ref, computed, onMounted } from 'vue'
import { supabase } from '../supabase.js'

export const useUserAuthStore = defineStore('auth', () => {
  // state
  const user = ref(null)
  const userDetails = ref(null) // Store user details including role
  const session = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // getters
  const isAuthenticated = computed(() => !!user.value)
  const currentUser = computed(() => user.value)
  const isAdmin = computed(() => {
    console.log('Computing isAdmin:', {
      userDetails: userDetails.value,
      role: userDetails.value?.role,
      normalizedRole: userDetails.value?.role?.toLowerCase()
    })
    const role = userDetails.value?.role?.toLowerCase()
    return role === 'admin' || role === 'super_admin'
  })
  const isSuperAdmin = computed(() => {
    const role = userDetails.value?.role?.toLowerCase()
    return role === 'super_admin'
  })

  // Helper function to fetch user details from users table
  async function fetchUserDetails() {
    if (!user.value) return null
    
    try {
      loading.value = true
      
      const { data, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('id', user.value.id)
        .single()
      
      if (fetchError) throw fetchError
      
      if (data) {
        userDetails.value = data
        console.log('User details loaded:', {
          id: data.id,
          email: data.email,
          role: data.role,
          isAdmin: data.role === 'admin' || data.role === 'super_admin'
        })
        return data
      } else {
        throw new Error('No se encontró información del usuario')
      }
    } catch (err) {
      console.error('Error fetching user details:', err)
      error.value = 'Error al cargar los datos del usuario'
      return null
    } finally {
      loading.value = false
    }
  }

  // Initialize the auth state from existing session (if any)
  onMounted(async () => {
    loading.value = true
    
    try {
      // Check for active session
      const { data } = await supabase.auth.getSession()
      session.value = data.session
      
      if (data.session?.user) {
        user.value = data.session.user
        await fetchUserDetails()
      }
      
      // Set up auth state change listener
      supabase.auth.onAuthStateChange(async (event, newSession) => {
        session.value = newSession
        
        if (newSession?.user) {
          user.value = newSession.user
          await fetchUserDetails()
        } else {
          user.value = null
          userDetails.value = null
        }
      })
    } catch (err) {
      console.error('Auth initialization error:', err)
      error.value = 'Error al inicializar la autenticación'
    } finally {
      loading.value = false
    }
  })

  // actions
  async function login(email, password) {
    loading.value = true
    error.value = null
    
    try {
      console.log('Attempting login for:', email)
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      
      if (authError) throw authError
      
      console.log('Auth successful, user:', data.user)
      user.value = data.user
      session.value = data.session
      
      // After successful login, fetch user details including role
      const userInfo = await fetchUserDetails()
      
      if (!userInfo) {
        throw new Error('No se pudo cargar la información del usuario')
      }

      // Log the role check
      console.log('Role check:', {
        role: userInfo.role,
        isAdmin: userInfo.role === 'admin' || userInfo.role === 'super_admin'
      })

      return true
    } catch (err) {
      console.error('Login error:', err)
      error.value = err.message || 'Error al iniciar sesión'
      user.value = null
      session.value = null
      userDetails.value = null
      return false
    } finally {
      loading.value = false
    }
  }
  
  async function register(email, password, options = {}) {
    loading.value = true
    error.value = null
    
    try {
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options
      })
      
      if (authError) throw authError
      
      return true
    } catch (err) {
      error.value = err.message || 'Error al registrar usuario'
      return false
    } finally {
      loading.value = false
    }
  }
  
  async function resetPassword(email) {
    loading.value = true
    error.value = null
    
    try {
      const { error: authError } = await supabase.auth.resetPasswordForEmail(email)
      
      if (authError) throw authError
      
      return true
    } catch (err) {
      error.value = err.message || 'Error al enviar correo de recuperación'
      return false
    } finally {
      loading.value = false
    }
  }
  
  async function logout() {
    loading.value = true
    
    try {
      await supabase.auth.signOut()
      user.value = null
      session.value = null
      userDetails.value = null
    } catch (err) {
      error.value = err.message || 'Error al cerrar sesión'
    } finally {
      loading.value = false
    }
  }

  return {
    user,
    userDetails,
    session,
    loading,
    error,
    isAuthenticated,
    isAdmin,
    isSuperAdmin,
    currentUser,
    login,
    register,
    resetPassword,
    logout,
    fetchUserDetails
  }
})