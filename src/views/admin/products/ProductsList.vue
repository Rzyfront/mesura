<template>
  <div class="container space-y-6 mt-2 p-1 md:p-6">
    <div class="flex justify-between items-center">
      <div class="flex items-center gap-4">
        <!-- Back button -->
        <button 
          @click="router.back()"
          class="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft class="h-4 w-4" />
          <span class="hidden md:inline ml-1">Volver</span>
        </button>

        <div>
          <h3 class="text-lg md:text-xl font-medium text-gray-900">Gestión de Productos</h3>
          <small class="text-[11px] md:text-sm text-gray-500 block">
            Administra el catálogo de productos de tu tienda.
          </small>
        </div>
      </div>

      <button
        type="button"
        class="inline-flex items-center px-2 py-1 md:px-4 md:py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        @click="router.push('/admin/products/add')"
      >
        <PlusIcon class="w-4 h-4 md:mr-2" />
        <span class="hidden md:inline">Nuevo Producto</span>
        <span class="inline md:hidden">Nuevo</span>
      </button>
    </div>

    <!-- Filtros y búsqueda -->
    <div class="space-y-4">
      <div class="flex gap-4 items-center">
        <!-- Barra de búsqueda siempre visible -->
        <div class="flex-1">
          <label for="search" class="sr-only">Buscar</label>
          <div class="relative rounded-md shadow-sm">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon class="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="search"
              id="search"
              v-model="searchQuery"
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-primary focus:border-primary"
              placeholder="Buscar productos..."
            />
          </div>
        </div>

        <!-- Botón de filtros -->
        <div class="relative">
          <button
            @click="showFilters = !showFilters"
            class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            <FilterIcon class="h-4 w-4 mr-2" />
            Filtros
            <span 
              v-if="hasActiveFilters"
              class="ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary text-white"
            >
              {{ activeFiltersCount }}
            </span>
          </button>

          <!-- Panel de filtros flotante -->
          <transition
            enter-active-class="transition ease-out duration-200"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-150"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <div 
              v-show="showFilters" 
              class="origin-top-right absolute right-0 mt-2 w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
            >
              <div class="p-4 divide-y divide-gray-200">
                <div class="space-y-4">
                  <div class="w-full">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Categoría</label>
                    <select
                      v-model="filterCategory"
                      class="block w-full py-2 px-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-primary focus:border-primary"
                    >
                      <option value="">Todas las categorías</option>
                      <option v-for="category in categories" :key="category.id" :value="category.id">
                        {{ category.name }}
                      </option>
                    </select>
                  </div>
                  <div class="w-full">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Ordenar por</label>
                    <select
                      v-model="sortBy"
                      class="block w-full py-2 px-3 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-primary focus:border-primary"
                    >
                      <option value="name">Nombre (A-Z)</option>
                      <option value="-name">Nombre (Z-A)</option>
                      <option value="price">Precio (Menor a Mayor)</option>
                      <option value="-price">Precio (Mayor a Menor)</option>
                      <option value="-createdAt">Fecha (Más reciente)</option>
                      <option value="createdAt">Fecha (Más antiguo)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>

    <!-- Lista de productos -->
    <div class="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Producto
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              SKU
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Categoría
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Precio
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Stock
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Estado
            </th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-if="loading" class="animate-pulse">
            <td colspan="7" class="px-6 py-4 text-center text-sm text-gray-500">
              Cargando productos...
            </td>
          </tr>
          <tr v-else-if="filteredProducts.length === 0" class="hover:bg-gray-50">
            <td colspan="7" class="px-6 py-4 text-center text-sm text-gray-500">
              No se encontraron productos.
            </td>
          </tr>
          <tr v-for="product in paginatedProducts" :key="product.id" class="hover:bg-gray-50">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="h-10 w-10 flex-shrink-0">
                  <img class="h-10 w-10 rounded-md object-cover" :src="product.thumbnail" alt="" />
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">
                    {{ product.name }}
                  </div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ product.sku }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ getCategoryName(product.categoryId) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ formatPrice(product.price) }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ product.stock }}
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span
                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                :class="{
                  'bg-green-100 text-green-800': product.active,
                  'bg-gray-100 text-gray-800': !product.active
                }"
              >
                {{ product.active ? 'Activo' : 'Inactivo' }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <div class="flex justify-end space-x-2">
                <button
                  @click="editProduct(product)"
                  class="text-primary hover:text-primary-700"
                >
                  <PencilIcon class="h-5 w-5" />
                </button>
                <button
                  @click="duplicateProduct(product)"
                  class="text-blue-600 hover:text-blue-800"
                >
                  <CopyIcon class="h-5 w-5" />
                </button>
                <button
                  @click="confirmDelete(product)"
                  class="text-red-600 hover:text-red-800"
                >
                  <TrashIcon class="h-5 w-5" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      
      <!-- Paginación -->
      <div class="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
        <div class="flex-1 flex justify-between sm:hidden">
          <button
            @click="currentPage > 1 ? currentPage-- : null"
            :disabled="currentPage === 1"
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Anterior
          </button>
          <button
            @click="currentPage < totalPages ? currentPage++ : null"
            :disabled="currentPage === totalPages"
            class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Siguiente
          </button>
        </div>
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              Mostrando <span class="font-medium">{{ paginationStart }}</span> a
              <span class="font-medium">{{ paginationEnd }}</span> de
              <span class="font-medium">{{ filteredProducts.length }}</span> resultados
            </p>
          </div>
          <div>
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Paginación">
              <button
                @click="currentPage = 1"
                :disabled="currentPage === 1"
                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span class="sr-only">Primera</span>
                <ChevronsLeftIcon class="h-5 w-5" />
              </button>
              <button
                @click="currentPage--"
                :disabled="currentPage === 1"
                class="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span class="sr-only">Anterior</span>
                <ChevronLeftIcon class="h-5 w-5" />
              </button>
              <span
                v-for="page in visiblePages"
                :key="page"
                @click="currentPage = page"
                :class="[
                  currentPage === page
                    ? 'z-10 bg-primary border-primary text-white'
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                  'relative inline-flex items-center px-4 py-2 border text-sm font-medium cursor-pointer'
                ]"
              >
                {{ page }}
              </span>
              <button
                @click="currentPage++"
                :disabled="currentPage === totalPages"
                class="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span class="sr-only">Siguiente</span>
                <ChevronRightIcon class="h-5 w-5" />
              </button>
              <button
                @click="currentPage = totalPages"
                :disabled="currentPage === totalPages"
                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span class="sr-only">Última</span>
                <ChevronsRightIcon class="h-5 w-5" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { 
  Plus as PlusIcon, 
  Search as SearchIcon, 
  Pencil as PencilIcon, 
  Trash as TrashIcon, 
  ChevronLeft as ChevronLeftIcon, 
  ChevronRight as ChevronRightIcon,
  ChevronsLeft as ChevronsLeftIcon,
  ChevronsRight as ChevronsRightIcon,
  Copy as CopyIcon,
  ArrowLeft,
  Filter as FilterIcon
} from 'lucide-vue-next'
import { useCustomToast } from '../../../composables/useToast'
import { useRouter } from 'vue-router'

const router = useRouter()
const { showToast } = useCustomToast()

// Productos mock
const products = ref([])
const categories = ref([
  { id: 1, name: 'Electrónicos' },
  { id: 2, name: 'Ropa' },
  { id: 3, name: 'Hogar' },
  { id: 4, name: 'Deportes' }
])
const loading = ref(true)

// Estados de filtrado y ordenamiento
const searchQuery = ref('')
const filterCategory = ref('')
const sortBy = ref('name')
const currentPage = ref(1)
const itemsPerPage = 10
const showFilters = ref(false)

// Generar datos de ejemplo
const generateMockProducts = () => {
  const mockProducts = []
  for (let i = 1; i <= 50; i++) {
    const categoryId = Math.ceil(Math.random() * 4)
    mockProducts.push({
      id: i,
      name: `Producto de ejemplo ${i}`,
      sku: `SKU-${100 + i}`,
      price: Math.floor(Math.random() * 10000) / 100,
      stock: Math.floor(Math.random() * 100),
      categoryId,
      active: Math.random() > 0.2, // 80% de productos activos
      thumbnail: `https://picsum.photos/seed/${i}/200/200`
    })
  }
  return mockProducts
}

// Calcular productos filtrados y paginados
const filteredProducts = computed(() => {
  let result = [...products.value]

  // Aplicar búsqueda
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(p => 
      p.name.toLowerCase().includes(query) || 
      p.sku.toLowerCase().includes(query)
    )
  }

  // Aplicar filtro de categoría
  if (filterCategory.value) {
    result = result.filter(p => p.categoryId === parseInt(filterCategory.value))
  }

  // Ordenar resultados
  const field = sortBy.value.startsWith('-') ? sortBy.value.slice(1) : sortBy.value
  const desc = sortBy.value.startsWith('-')
  
  result.sort((a, b) => {
    if (field === 'name') {
      return desc 
        ? b.name.localeCompare(a.name) 
        : a.name.localeCompare(b.name)
    } else if (field === 'price' || field === 'createdAt') {
      return desc ? b[field] - a[field] : a[field] - b[field]
    }
    return 0
  })

  return result
})

// Paginación
const paginatedProducts = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage
  return filteredProducts.value.slice(startIndex, startIndex + itemsPerPage)
})

const totalPages = computed(() => 
  Math.max(1, Math.ceil(filteredProducts.value.length / itemsPerPage))
)

const paginationStart = computed(() => 
  filteredProducts.value.length > 0 ? ((currentPage.value - 1) * itemsPerPage) + 1 : 0
)

const paginationEnd = computed(() => 
  Math.min(currentPage.value * itemsPerPage, filteredProducts.value.length)
)

const visiblePages = computed(() => {
  const totalVisible = 5
  const pages = []
  
  if (totalPages.value <= totalVisible) {
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i)
    }
  } else {
    let start = Math.max(1, currentPage.value - 2)
    let end = Math.min(totalPages.value, start + totalVisible - 1)
    
    if (end - start < totalVisible - 1) {
      start = Math.max(1, end - totalVisible + 1)
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
  }
  
  return pages
})

// Funciones de utilidad
const formatPrice = (price) => {
  return `$${price.toFixed(2)}`
}

const getCategoryName = (categoryId) => {
  const category = categories.value.find(c => c.id === categoryId)
  return category ? category.name : 'Sin categoría'
}

// Acciones sobre productos
const openCreateModal = () => {
  showToast('Función en desarrollo: Crear nuevo producto', 'info')
}

const editProduct = (product) => {
  router.push(`/admin/products/edit/${product.id}`)
}

const duplicateProduct = (product) => {
  showToast(`Función en desarrollo: Duplicar ${product.name}`, 'info')
}

const confirmDelete = (product) => {
  if (confirm(`¿Estás seguro de que deseas eliminar el producto "${product.name}"?`)) {
    // Aquí iría la lógica para eliminar el producto
    products.value = products.value.filter(p => p.id !== product.id)
    showToast('Producto eliminado correctamente', 'success')
  }
}

// Compute if there are active filters
const hasActiveFilters = computed(() => {
  return filterCategory.value !== '' || sortBy.value !== 'name'
})

// Count active filters
const activeFiltersCount = computed(() => {
  let count = 0
  if (filterCategory.value) count++
  if (sortBy.value !== 'name') count++
  return count
})

// Ciclo de vida
onMounted(async () => {
  // Simular carga de datos
  await new Promise(resolve => setTimeout(resolve, 800))
  products.value = generateMockProducts()
  loading.value = false
})
</script>