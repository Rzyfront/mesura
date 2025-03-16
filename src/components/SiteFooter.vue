<template>
    <footer class="w-full border-t bg-accent">
      <div class="container flex flex-col gap-8 px-4 py-10 md:px-6 lg:flex-row lg:gap-12">
        <div class="flex flex-col gap-4 lg:w-1/3">
          <router-link to="/" class="flex items-center gap-2">
            <Logo class="h-8 w-auto" />
          </router-link>
          <p class="text-sm text-muted-foreground">
            Moda elegante y accesible para la mujer moderna. Descubre nuestra colección de prendas diseñadas con amor y
            atención al detalle.
          </p>
          <div class="flex gap-4">
            <a href="#" class="text-muted-foreground hover:text-foreground">
              <Facebook class="h-5 w-5" />
              <span class="sr-only">Facebook</span>
            </a>
            <a href="#" class="text-muted-foreground hover:text-foreground">
              <Instagram class="h-5 w-5" />
              <span class="sr-only">Instagram</span>
            </a>
            <a href="#" class="text-muted-foreground hover:text-foreground">
              <Twitter class="h-5 w-5" />
              <span class="sr-only">Twitter</span>
            </a>
          </div>
        </div>
        <div class="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-3">
          <div class="flex flex-col gap-2">
            <h3 class="text-base font-medium">Compras</h3>
            <ul class="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>
                <router-link to="/products" class="hover:text-foreground">
                  Todos los productos
                </router-link>
              </li>
              <li>
                <router-link to="/products/category/new" class="hover:text-foreground">
                  Novedades
                </router-link>
              </li>
              <li>
                <router-link to="/products/category/sale" class="hover:text-foreground">
                  Ofertas
                </router-link>
              </li>
              <li>
                <router-link to="/gift-cards" class="hover:text-foreground">
                  Tarjetas regalo
                </router-link>
              </li>
            </ul>
          </div>
          <div class="flex flex-col gap-2">
            <h3 class="text-base font-medium">Información</h3>
            <ul class="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>
                <router-link to="/about" class="hover:text-foreground">
                  Nosotros
                </router-link>
              </li>
              <li>
                <router-link to="/blog" class="hover:text-foreground">
                  Blog
                </router-link>
              </li>
              <li>
                <router-link to="/sustainability" class="hover:text-foreground">
                  Sostenibilidad
                </router-link>
              </li>
              <li>
                <router-link to="/careers" class="hover:text-foreground">
                  Empleo
                </router-link>
              </li>
            </ul>
          </div>
          <div class="flex flex-col gap-2">
            <h3 class="text-base font-medium">Atención al cliente</h3>
            <ul class="flex flex-col gap-2 text-sm text-muted-foreground">
              <li>
                <router-link to="/contact" class="hover:text-foreground">
                  Contacto
                </router-link>
              </li>
              <li>
                <router-link to="/shipping" class="hover:text-foreground">
                  Envíos
                </router-link>
              </li>
              <li>
                <router-link to="/returns" class="hover:text-foreground">
                  Devoluciones
                </router-link>
              </li>
              <li>
                <router-link to="/faq" class="hover:text-foreground">
                  Preguntas frecuentes
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="border-t border-muted">
        <div class="container flex flex-col gap-4 px-4 py-6 text-center text-sm text-muted-foreground md:px-6 md:flex-row md:text-left">
          <p>© 2024 MESURA. Todos los derechos reservados.</p>
          <nav class="flex flex-col gap-4 md:ml-auto md:flex-row md:gap-6">
            <router-link to="/privacy" class="hover:text-foreground">
              Política de privacidad
            </router-link>
            <router-link to="/terms" class="hover:text-foreground">
              Términos y condiciones
            </router-link>
            <router-link to="/cookies" class="hover:text-foreground">
              Política de cookies
            </router-link>
          </nav>
        </div>
      </div>
    </footer>
  </template>
  
  <script setup>
  import { Facebook, Instagram, Twitter } from 'lucide-vue-next'
  import Logo from './Logo.vue'
  </script>