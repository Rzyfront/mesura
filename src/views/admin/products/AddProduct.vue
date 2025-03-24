<template>
  <div class="space-y-6 p-8">
    <div class="flex items-center gap-4">
      <button 
        @click="router.back()"
        class="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
      >
        <ArrowLeft class="h-4 w-4 mr-1" />
        Volver
      </button>
      <h3 class="text-xl font-medium text-gray-900">Nuevo Producto</h3>
    </div>

    <div class="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <p class="text-gray-500 mb-6">
        Formulario en desarrollo...
      </p>
      <button
        @click="router.back()"
        class="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
      >
        Cancelar
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ArrowLeft } from 'lucide-vue-next'

const router = useRouter()
</script>
