<template>
    <main class="flex-1">
      <section class="w-full py-12 md:py-24 lg:py-32">
        <div class="container px-4 md:px-6">
          <div class="flex flex-col items-start gap-4">
            <router-link 
              to="/"
              class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground mb-2"
            >
              <ArrowLeft class="mr-2 h-4 w-4" />
              Volver
            </router-link>
            <div class="space-y-2">
              <h1 class="text-3xl font-bold tracking-tighter sm:text-5xl">Todos los Productos</h1>
              <p class="max-w-[600px] text-muted-foreground md:text-xl">
                Explora nuestra colección completa de prendas y accesorios
              </p>
            </div>
            
            <!-- Display products grid when products exist -->
            <div v-if="products.length > 0" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-6 w-full">
              <ProductCard
                v-for="product in products"
                :key="product.id"
                :name="product.name"
                :price="product.price"
                :image="product.image"
                :slug="product.slug"
              />
            </div>
            
            <!-- Empty state when no products are available -->
            <div v-else class="w-full text-center py-12 px-4 bg-gray-50 rounded-lg mt-6">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <h3 class="text-xl font-semibold text-gray-800 mb-2">No hay productos disponibles</h3>
              <p class="text-gray-600 max-w-md mx-auto">
                En este momento no hay productos para mostrar. Por favor, vuelve a consultar más tarde.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  </template>
  
  <script setup>
  import { ArrowLeft } from 'lucide-vue-next'
  import ProductCard from '../components/ProductCard.vue'
  
  const products = [
    
  ]
  </script>