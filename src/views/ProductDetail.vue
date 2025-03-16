<template>
    <main class="flex-1">
      <section class="w-full py-12 md:py-24">
        <div class="container px-4 md:px-6">
          <router-link 
            to="/products"
            class="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground mb-6"
          >
            <ArrowLeft class="mr-2 h-4 w-4" />
            Volver a productos
          </router-link>
  
          <div class="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div class="flex flex-col gap-4">
              <div class="overflow-hidden rounded-lg">
                <img
                  :src="product.images[selectedImage] || '/placeholder.svg'"
                  :alt="product.name"
                  class="aspect-[3/4] w-full object-cover"
                />
              </div>
              <div class="grid grid-cols-3 gap-2">
                <div 
                  v-for="(image, index) in product.images" 
                  :key="index" 
                  class="overflow-hidden rounded-lg cursor-pointer"
                  @click="selectedImage = index"
                >
                  <img
                    :src="image || '/placeholder.svg'"
                    :alt="`${product.name} - Vista ${index + 1}`"
                    class="aspect-square w-full object-cover"
                    :class="{ 'ring-2 ring-primary': selectedImage === index }"
                  />
                </div>
              </div>
            </div>
            <div class="flex flex-col gap-4">
              <div class="space-y-2">
                <h1 class="text-3xl font-bold">{{ product.name }}</h1>
                <div class="flex items-center gap-2">
                  <div class="flex">
                    <Star
                      v-for="i in 5"
                      :key="i"
                      :class="`h-5 w-5 ${
                        i <= Math.floor(product.rating)
                          ? 'fill-primary text-primary'
                          : i <= product.rating
                            ? 'fill-primary text-primary'
                            : 'text-muted-foreground'
                      }`"
                    />
                  </div>
                  <span class="text-sm text-muted-foreground">({{ product.reviews }} reseñas)</span>
                </div>
                <p class="text-2xl font-bold">{{ product.price }}</p>
              </div>
              <p class="text-muted-foreground">{{ product.description }}</p>
              <div class="space-y-4 pt-4">
                <div class="space-y-2">
                  <div class="font-medium">Talla</div>
                  <div class="flex flex-wrap gap-2">
                    <button 
                      v-for="size in product.sizes" 
                      :key="size"
                      class="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                      :class="{ 'bg-primary text-primary-foreground': selectedSize === size }"
                      @click="selectedSize = size"
                    >
                      {{ size }}
                    </button>
                  </div>
                </div>
                <div class="space-y-2">
                  <div class="font-medium">Color</div>
                  <div class="flex flex-wrap gap-2">
                    <button 
                      v-for="color in product.colors" 
                      :key="color"
                      class="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1.5 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                      :class="{ 'bg-primary text-primary-foreground': selectedColor === color }"
                      @click="selectedColor = color"
                    >
                      {{ color }}
                    </button>
                  </div>
                </div>
                <div class="space-y-2">
                  <div class="font-medium">Cantidad</div>
                  <div class="flex items-center gap-2">
                    <button 
                      class="inline-flex h-8 w-8 items-center justify-center rounded-md border border-input"
                      @click="quantity > 1 ? quantity-- : quantity"
                    >
                      -
                    </button>
                    <span class="w-8 text-center">{{ quantity }}</span>
                    <button 
                      class="inline-flex h-8 w-8 items-center justify-center rounded-md border border-input"
                      @click="quantity++"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
              <div class="flex flex-col gap-2 pt-4 sm:flex-row">
                <button 
                  class="flex-1 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                  @click="addToCart"
                >
                  <ShoppingBag class="mr-2 h-5 w-5" />
                  Añadir al carrito
                </button>
                <button 
                  class="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                  @click="addToWishlist"
                >
                  <Heart class="mr-2 h-5 w-5" />
                  Añadir a favoritos
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRoute } from 'vue-router'
  import { ArrowLeft, Heart, ShoppingBag, Star } from 'lucide-vue-next'
  
  const route = useRoute()
  const slug = route.params.slug
  
  // In a real app, you would fetch the product data based on the slug
  // This is just a placeholder
  const product = {
    name: "Vestido Floral",
    price: "$89.99",
    description:
      "Un hermoso vestido floral perfecto para la primavera y el verano. Confeccionado con tela ligera y transpirable que te mantendrá fresca durante todo el día. El estampado floral añade un toque femenino y elegante a tu look.",
    images: [
      "/placeholder.svg?height=600&width=400",
      "/placeholder.svg?height=600&width=400",
      "/placeholder.svg?height=600&width=400",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Blanco", "Negro", "Rosa"],
    rating: 4.5,
    reviews: 24,
  }
  
  const selectedImage = ref(0)
  const selectedSize = ref('')
  const selectedColor = ref('')
  const quantity = ref(1)
  
  function addToCart() {
    if (!selectedSize.value || !selectedColor.value) {
      alert('Por favor selecciona una talla y un color')
      return
    }
    
    console.log('Added to cart:', {
      product: product.name,
      size: selectedSize.value,
      color: selectedColor.value,
      quantity: quantity.value
    })
    
    alert('Producto añadido al carrito')
  }
  
  function addToWishlist() {
    console.log('Added to wishlist:', product.name)
    alert('Producto añadido a favoritos')
  }
  </script>