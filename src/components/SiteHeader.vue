<template>
    <header class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div class="container flex h-16 items-center">
        <div v-if="isMobileMenuOpen" class="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm" @click="isMobileMenuOpen = false"></div>
        
        <div 
          class="fixed inset-y-0 left-0 z-50 w-[300px] sm:w-[400px] bg-background p-6 shadow-lg transform transition-transform duration-300"
          :class="isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'"
        >
          <nav class="flex flex-col gap-4 mt-8">
            <router-link to="/" class="text-lg font-medium transition-colors hover:text-primary" @click="isMobileMenuOpen = false">
              Inicio
            </router-link>
            <router-link to="/products" class="text-lg font-medium transition-colors hover:text-primary" @click="isMobileMenuOpen = false">
              Productos
            </router-link>
            <router-link to="/products/category/new" class="text-lg font-medium transition-colors hover:text-primary" @click="isMobileMenuOpen = false">
              Novedades
            </router-link>
            <router-link to="/products/category/sale" class="text-lg font-medium transition-colors hover:text-primary" @click="isMobileMenuOpen = false">
              Ofertas
            </router-link>
            <router-link to="/about" class="text-lg font-medium transition-colors hover:text-primary" @click="isMobileMenuOpen = false">
              Nosotros
            </router-link>
            <router-link to="/contact" class="text-lg font-medium transition-colors hover:text-primary" @click="isMobileMenuOpen = false">
              Contacto
            </router-link>
          </nav>
        </div>
        
        <button 
          class="md:hidden inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-accent hover:text-accent-foreground"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        >
          <Menu class="h-5 w-5" />
          <span class="sr-only">Toggle menu</span>
        </button>
        
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
        
        <div class="flex md:hidden flex-1 items-center justify-center">
          <router-link to="/" class="flex items-center">
            <Logo class="h-8 w-auto" />
            <span class="sr-only">MESURA</span>
          </router-link>
        </div>
        
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
          
          <button class="hidden sm:flex items-center justify-center rounded-md p-2 text-foreground hover:bg-accent hover:text-accent-foreground">
            <Search class="h-5 w-5" />
            <span class="sr-only">Buscar</span>
          </button>
          
          <button class="hidden sm:flex items-center justify-center rounded-md p-2 text-foreground hover:bg-accent hover:text-accent-foreground">
            <User class="h-5 w-5" />
            <span class="sr-only">Cuenta</span>
          </button>
          
          <button class="inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-accent hover:text-accent-foreground">
            <Heart class="h-5 w-5" />
            <span class="sr-only">Favoritos</span>
          </button>
          
          <button class="inline-flex items-center justify-center rounded-md p-2 text-foreground hover:bg-accent hover:text-accent-foreground">
            <ShoppingBag class="h-5 w-5" />
            <span class="sr-only">Carrito</span>
          </button>
        </div>
      </div>
    </header>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { Menu, Search, User, Heart, ShoppingBag } from 'lucide-vue-next'
  import Logo from './Logo.vue'
  
  const isMobileMenuOpen = ref(false)
  const searchQuery = ref('')
  
  function search() {
    console.log('Searching for:', searchQuery.value)
    // Implement search functionality
  }
  </script>