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
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-6">
              <ProductCard
                v-for="product in products"
                :key="product.id"
                :name="product.name"
                :price="product.price"
                :image="product.image"
                :slug="product.slug"
              />
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
    {
      id: 1,
      name: "Blusa Primavera",
      price: "$45.99",
      image: "/placeholder.svg?height=400&width=300",
      slug: "blusa-primavera",
    },
    {
      id: 2,
      name: "Vestido Floral",
      price: "$89.99",
      image: "/placeholder.svg?height=400&width=300",
      slug: "vestido-floral",
    },
    {
      id: 3,
      name: "Pantalón Elegante",
      price: "$65.99",
      image: "/placeholder.svg?height=400&width=300",
      slug: "pantalon-elegante",
    },
    {
      id: 4,
      name: "Falda Midi",
      price: "$55.99",
      image: "/placeholder.svg?height=400&width=300",
      slug: "falda-midi",
    },
    {
      id: 5,
      name: "Chaqueta Ligera",
      price: "$95.99",
      image: "/placeholder.svg?height=400&width=300",
      slug: "chaqueta-ligera",
    },
    {
      id: 6,
      name: "Blusa Seda",
      price: "$75.99",
      image: "/placeholder.svg?height=400&width=300",
      slug: "blusa-seda",
    },
    {
      id: 7,
      name: "Vestido Noche",
      price: "$120.99",
      image: "/placeholder.svg?height=400&width=300",
      slug: "vestido-noche",
    },
    {
      id: 8,
      name: "Jeans Premium",
      price: "$85.99",
      image: "/placeholder.svg?height=400&width=300",
      slug: "jeans-premium",
    },
    {
      id: 9,
      name: "Collar Delicado",
      price: "$35.99",
      image: "/placeholder.svg?height=400&width=300",
      slug: "collar-delicado",
    },
  ]
  </script>