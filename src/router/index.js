import { createRouter, createWebHistory } from 'vue-router'
import { watch } from 'vue'
import Home from '../views/Home.vue'
import ProductsPage from '../views/ProductsPage.vue'
import ProductDetail from '../views/ProductDetail.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import { useUserAuthStore } from '../stores/authUser'
import { useClientAuthStore } from '../stores/authClients'
import { useCustomToast } from '../composables/useToast'
import AdminLayout from '../layouts/AdminLayout.vue'
import AdminSettingsLayout from '../layouts/AdminSettingsLayout.vue'
import Appearance from '@/views/admin/settings/Appearance.vue'
import Products from '@/views/admin/settings/Products.vue'
import Orders from '@/views/admin/settings/Orders.vue'
import Customers from '@/views/admin/settings/Customers.vue'
import Users from '@/views/admin/settings/Users.vue'
import Profile from '@/views/admin/settings/Profile.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/products',
    name: 'Products',
    component: ProductsPage
  },
  {
    path: '/products/:slug',
    name: 'ProductDetail',
    component: ProductDetail,
    props: true
  },
  {
    path: '/products/category/:category',
    name: 'ProductCategory',
    component: ProductsPage
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  // Admin routes
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAdmin: true },
    children: [
      {
        path: 'dashboard',
        name: 'AdminDashboard',
        component: () => import('../views/admin/Dashboard.vue')
      },
      {
        path: 'products',
        name: 'AdminProducts',
        component: () => import('../views/admin/settings/Products.vue')
      },
      {
        path: 'orders',
        name: 'AdminOrders',
        component: () => import('../views/admin/settings/Orders.vue')
      },
      {
        path: 'customers',
        name: 'AdminCustomers',
        component: () => import('../views/admin/settings/Customers.vue')
      },
      {
        path: 'settings',
        component: AdminSettingsLayout,
        children: [
          {
            path: '',
            redirect: { name: 'admin-settings-profile' }
          },
          {
            path: 'products',
            name: 'admin-settings-products',
            component: () => import('../views/admin/settings/Products.vue')
          },
          {
            path: 'orders',
            name: 'admin-settings-orders',
            component: () => import('../views/admin/settings/Orders.vue')
          },
          {
            path: 'customers',
            name: 'admin-settings-customers',
            component: () => import('../views/admin/settings/Customers.vue')
          },
          {
            path: 'users',
            name: 'admin-settings-users',
            component: () => import('../views/admin/settings/Users.vue')
          },
          {
            path: 'profile',
            name: 'admin-settings-profile',
            component: () => import('../views/admin/settings/Profile.vue')
          },
          {
            path: 'appearance',
            name: 'admin-settings-appearance',
            component: () => import('../views/admin/settings/Appearance.vue')
          }
        ]
      }
    ]
  },
  // Redirect all non-existent routes to home page
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

// Navigation guard for protected routes
router.beforeEach(async (to, from, next) => {
  const userStore = useUserAuthStore()
  const clientStore = useClientAuthStore()
  const { showError, showInfo } = useCustomToast()
  
  // Wait for authentication to initialize if needed
  if (userStore.loading) {
    await new Promise(resolve => {
      const unwatch = watch(() => userStore.loading, (isLoading) => {
        if (!isLoading) {
          unwatch()
          resolve()
        }
      })
    })
  }

  // Check if route requires admin privileges
  if (to.matched.some(record => record.meta.requiresAdmin)) {
    console.log('Route requires admin:', to.path)
    console.log('Auth state:', {
      isAuthenticated: userStore.isAuthenticated,
      userDetails: userStore.userDetails,
      role: userStore.userDetails?.role,
      isAdmin: userStore.isAdmin
    })

    // If not authenticated at all
    if (!userStore.isAuthenticated) {
      console.log('Not authenticated, redirecting to login')
      showInfo("Por favor, inicia sesión para acceder")
      return next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }

    // Ensure user details are loaded
    if (!userStore.userDetails) {
      console.log('Loading user details...')
      await userStore.fetchUserDetails()
    }

    // Final admin check
    if (!userStore.isAdmin) {
      console.log('Not admin, access denied')
      showError("No tienes permisos para acceder al panel de administración")
      return next({ path: '/products' })
    }

    console.log('Admin access granted')
    return next()
  }

  // For non-admin routes, just proceed
  next()
})

export default router