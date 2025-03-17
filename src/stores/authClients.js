import { defineStore } from 'pinia'
import { ref, computed, onMounted } from 'vue'
import { supabase } from '../supabase.js'

export const useClientAuthStore = defineStore('clientAuth', () => {
  // state
  const client = ref(null)
  const clientDetails = ref(null)
  const session = ref(null)
  const loading = ref(false)
  const error = ref(null)

  // getters
  const isAuthenticated = computed(() => !!client.value)
  const currentClient = computed(() => clientDetails.value)

  // Helper function to fetch customer details from customers table
  async function fetchClientDetails(userId) {
    try {
      const { data, error: fetchError } = await supabase
        .from('customers')
        .select('*')
        .eq('id', userId)
        .single()
      
      if (fetchError) throw fetchError
      
      if (data) {
        clientDetails.value = data
        return data
      } else {
        throw new Error('No se encontró información del cliente')
      }
    } catch (err) {
      console.error('Error fetching client details:', err)
      error.value = 'Error al cargar los datos del cliente'
      return null
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
        client.value = data.session.user
        await fetchClientDetails(client.value.id)
      }
      
      // Set up auth state change listener
      supabase.auth.onAuthStateChange(async (event, newSession) => {
        session.value = newSession
        
        if (newSession?.user) {
          client.value = newSession.user
          await fetchClientDetails(client.value.id)
        } else {
          client.value = null
          clientDetails.value = null
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
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      
      if (authError) throw authError
      
      client.value = data.user
      session.value = data.session
      
      // Fetch associated customer data
      const clientData = await fetchClientDetails(data.user.id)
      if (!clientData) {
        throw new Error('No se encontró un cliente asociado a esta cuenta')
      }
      
      return true
    } catch (err) {
      error.value = err.message || 'Error al iniciar sesión'
      client.value = null
      session.value = null
      return false
    } finally {
      loading.value = false
    }
  }
  
  async function register(name, email, password) {
    loading.value = true
    error.value = null
    
    try {
      // First, register the user with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name
          }
        }
      })
      
      if (authError) throw authError
      
      if (authData.user) {
        // Extract first and last name from full name
        const nameParts = name.split(' ');
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';
        
        // Create a new customer record in the customers table with correct structure
        const { error: insertError } = await supabase
          .from('customers')
          .insert({
            id: authData.user.id,
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone: '', // Empty defaults for fields not collected during registration
            identification: '',
            country: '',
            city: '',
            address: '',
            // created_at and updated_at use database defaults
          })
        
        if (insertError) throw insertError

        // Also create a user record in the users table (temporary)
        const { error: userInsertError } = await supabase
          .from('users')
          .insert({
            id: authData.user.id,
            role: 'client',
            first_name: firstName,
            last_name: lastName,
            email: email,
            phone: '',
            identification: '',
            country: '',
            city: '',
            address: ''
            // created_at and updated_at use database defaults
          })
        
        if (userInsertError) {
          console.error('Error creating user record:', userInsertError);
          // Continue even if user insert fails - this is a temporary addition
        }
        
        client.value = authData.user
        
        // Fetch the newly created customer record
        await fetchClientDetails(authData.user.id)
        
        return true
      } else {
        throw new Error('No se pudo crear la cuenta')
      }
    } catch (err) {
      error.value = err.message || 'Error al registrar cliente'
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
      client.value = null
      clientDetails.value = null
      session.value = null
    } catch (err) {
      error.value = err.message || 'Error al cerrar sesión'
    } finally {
      loading.value = false
    }
  }

  function clearErrors() {
    error.value = null
  }

  function setError(message) {
    error.value = message
  }

  return {
    client,
    clientDetails,
    session,
    loading,
    error,
    isAuthenticated,
    currentClient,
    login,
    register,
    resetPassword,
    logout,
    clearErrors,
    setError
  }
})