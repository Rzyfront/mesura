<template>
    <div class="overflow-hidden rounded-lg border border-border bg-card text-card-foreground shadow-sm">
      <div class="p-0">
        <router-link :to="`/products/${slug}`">
          <div class="relative overflow-hidden">
            <img
              :src="image || '/placeholder.svg'"
              :alt="name"
              class="h-[300px] w-full object-cover transition-all hover:scale-105"
            />
            <button
              class="absolute right-2 top-2 h-8 w-8 rounded-full bg-white/80 backdrop-blur-sm inline-flex items-center justify-center border border-input"
              @click.prevent="addToWishlist"
            >
              <Heart class="h-4 w-4" />
              <span class="sr-only">Add to wishlist</span>
            </button>
          </div>
        </router-link>
      </div>
      <div class="flex flex-col items-start gap-2 p-4">
        <router-link :to="`/products/${slug}`" class="hover:underline">
          <h3 class="font-medium">{{ name }}</h3>
        </router-link>
        <div class="flex w-full items-center justify-between">
          <p class="font-bold">{{ price }}</p>
          <button 
            class="h-8 w-8 rounded-full p-0 inline-flex items-center justify-center hover:bg-accent"
            @click="addToCart"
          >
            <ShoppingBag class="h-4 w-4" />
            <span class="sr-only">Add to cart</span>
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { Heart, ShoppingBag } from 'lucide-vue-next'
  
  const props = defineProps({
    name: {
      type: String,
      required: true
    },
    price: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true
    }
  })
  
  function addToWishlist() {
    console.log('Added to wishlist:', props.name)
    // Implement wishlist functionality
  }
  
  function addToCart() {
    console.log('Added to cart:', props.name)
    // Implement cart functionality
  }
  </script>