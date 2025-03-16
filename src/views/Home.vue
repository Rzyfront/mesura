<template>
    <main class="flex-1">
      <!-- Hero Section -->
      <section class="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
        <div class="container px-4 md:px-6">
          <div class="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div class="space-y-4">
              <h1 class="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Elegancia en cada detalle
              </h1>
              <p class="max-w-[600px] text-muted-foreground md:text-xl">
                Descubre nuestra colección de prendas diseñadas para la mujer moderna. Calidad, estilo y confort en
                cada pieza.
              </p>
              <div class="flex flex-col gap-2 min-[400px]:flex-row">
                <router-link 
                  to="/products"
                  class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  Ver Colección <ArrowRight class="ml-2 h-4 w-4" />
                </router-link>
                <button 
                  class="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                >
                  Novedades
                </button>
              </div>
            </div>
            <img
              src="@/assets/images/test1.jpeg"
              alt="Hero Image"
              class="mx-auto aspect-[4/5] overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
            />
          </div>
        </div>
      </section>
  
      <!-- Featured Products -->
      <section class="w-full py-12 md:py-24 lg:py-32">
        <div class="container px-4 md:px-6">
          <div class="flex flex-col items-center justify-center space-y-4 text-center">
            <div class="space-y-2">
              <div class="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Destacados</div>
              <h2 class="text-3xl font-bold tracking-tighter md:text-4xl">Nuestros Favoritos</h2>
              <p class="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Descubre las piezas más populares de nuestra colección actual
              </p>
            </div>
          </div>
          <div class="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 sm:grid-cols-2 md:grid-cols-3 lg:gap-8">
            <ProductCard
              v-for="product in featuredProducts"
              :key="product.slug"
              :name="product.name"
              :price="product.price"
              :image="product.image"
              :slug="product.slug"
            />
          </div>
          <div class="flex justify-center">
            <router-link 
              to="/products"
              class="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
            >
              Ver todos los productos <ArrowRight class="ml-2 h-4 w-4" />
            </router-link>
          </div>
        </div>
      </section>
  
      <!-- Categories -->
      <section class="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
        <div class="container px-4 md:px-6">
          <div class="flex flex-col items-center justify-center space-y-4 text-center">
            <div class="space-y-2">
              <h2 class="text-3xl font-bold tracking-tighter md:text-4xl">Categorías</h2>
              <p class="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Explora nuestra colección por categorías
              </p>
            </div>
          </div>
          <div class="grid grid-cols-1 gap-4 mt-8 md:grid-cols-3">
            <div v-for="category in categories" :key="category.name" class="overflow-hidden rounded-lg border border-border bg-card text-card-foreground shadow-sm">
              <div class="p-0">
                <router-link :to="category.url" class="block relative">
                  <img
                    :src="category.image"
                    :alt="category.name"
                    class="w-full h-[200px] object-cover transition-all hover:scale-105"
                  />
                  <div class="absolute inset-0 bg-black/20 flex items-center justify-center">
                    <h3 class="text-white text-2xl font-bold">{{ category.name }}</h3>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Newsletter -->
      <section class="w-full py-12 md:py-24 lg:py-32">
        <div class="container px-4 md:px-6">
          <div class="flex flex-col items-center justify-center space-y-4 text-center">
            <div class="space-y-2">
              <h2 class="text-3xl font-bold tracking-tighter md:text-4xl">Únete a nuestra newsletter</h2>
              <p class="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Recibe las últimas novedades y ofertas exclusivas directamente en tu correo
              </p>
            </div>
            <div class="w-full max-w-sm space-y-2">
              <form class="flex space-x-2" @submit.prevent="subscribe">
                <input
                  v-model="email"
                  class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Email"
                  type="email"
                  required
                />
                <button 
                  type="submit"
                  class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  Suscribirse
                </button>
              </form>
              <p class="text-xs text-muted-foreground">Al suscribirte, aceptas nuestra política de privacidad.</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { ArrowRight } from 'lucide-vue-next'
  import ProductCard from '../components/ProductCard.vue'
  
  const email = ref('')
  
  const featuredProducts = [
    {
      name: "Blusa Primavera",
      price: "$45.99",
      image: "/src/assets/images/test1.jpeg",
      slug: "blusa-primavera",
    },
    {
      name: "Vestido Floral",
      price: "$89.99",
      image: "/src/assets/images/test1.jpeg",
      slug: "vestido-floral",
    },
    {
      name: "Pantalón Elegante",
      price: "$65.99",
      image: "/src/assets/images/test1.jpeg",
      slug: "pantalon-elegante",
    },
  ]
  
  const categories = [
    {
      name: "Tops",
      image: "/src/assets/images/test1.jpeg",
      url: "/products/category/tops",
    },
    {
      name: "Vestidos",
      image: "/src/assets/images/test1.jpeg",
      url: "/products/category/dresses",
    },
    {
      name: "Accesorios",
      image: "/src/assets/images/test1.jpeg",
      url: "/products/category/accessories",
    },
  ]
  
  function subscribe() {
    console.log('Subscribed with email:', email.value)
    // Implement newsletter subscription
    email.value = ''
    alert('¡Gracias por suscribirte a nuestra newsletter!')
  }
  </script>