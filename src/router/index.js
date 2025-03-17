import { createRouter, createWebHistory } from 'vue-router'
import { watch } from 'vue'
import Home from '../views/Home.vue'
import ProductsPage from '../views/ProductsPage.vue'
import ProductDetail from '../views/ProductDetail.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import { useUserAuthStore } from '../stores/authUser'

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
  {
    path: '/admin/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { 
      requiresAuth: true, 
      requiresAdmin: true 
    }
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

  // Check if route requires authentication
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // If user is not authenticated
    if (!userStore.isAuthenticated) {
      return next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
    
    // If route requires admin privileges
    if (to.matched.some(record => record.meta.requiresAdmin)) {
      // Ensure user details are loaded
      if (!userStore.userDetails) {
        await userStore.fetchUserDetails()
      }
      
      // Use the isAdmin getter from the store for role verification
      if (!userStore.isAdmin) {
        console.log('Access denied: User is not an admin')
        return next({ path: '/' })
      }
    }
  }
  
  // If we reach here, allow the navigation
  next()
})

export default router