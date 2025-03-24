<template>
  <div class="min-h-screen bg-purple-50">
    <main class="p-4 md:p-8 max-w-7xl mx-auto w-full">
      <!-- Summary Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <!-- Sales Card -->
        <div class="bg-white rounded-xl shadow-sm p-6 flex justify-between items-center">
          <div>
            <h3 class="text-base font-medium text-gray-600 mb-2">Ventas Totales</h3>
            <p class="text-2xl font-bold text-gray-800 mb-2">$24,580</p>
            <p class="flex items-center text-sm text-green-600">
              <TrendingUpIcon class="h-4 w-4 mr-1" /> 
              +12.5% desde el mes pasado
            </p>
          </div>
          <div class="bg-purple-100 rounded-full h-14 w-14 flex items-center justify-center">
            <DollarSignIcon class="h-6 w-6 text-purple-600" />
          </div>
        </div>

        <!-- Orders Card -->
        <div class="bg-white rounded-xl shadow-sm p-6 flex justify-between items-center">
          <div>
            <h3 class="text-base font-medium text-gray-600 mb-2">Órdenes Nuevas</h3>
            <p class="text-2xl font-bold text-gray-800 mb-2">156</p>
            <p class="flex items-center text-sm text-green-600">
              <TrendingUpIcon class="h-4 w-4 mr-1" /> 
              +8.2% desde el mes pasado
            </p>
          </div>
          <div class="bg-purple-100 rounded-full h-14 w-14 flex items-center justify-center">
            <ShoppingCartIcon class="h-6 w-6 text-purple-600" />
          </div>
        </div>

        <!-- Shipments Card -->
        <div class="bg-white rounded-xl shadow-sm p-6 flex justify-between items-center">
          <div>
            <h3 class="text-base font-medium text-gray-600 mb-2">Envíos Pendientes</h3>
            <p class="text-2xl font-bold text-gray-800 mb-2">38</p>
            <p class="flex items-center text-sm text-red-600">
              <TrendingDownIcon class="h-4 w-4 mr-1" /> 
              -5.1% desde el mes pasado
            </p>
          </div>
          <div class="bg-purple-100 rounded-full h-14 w-14 flex items-center justify-center">
            <TruckIcon class="h-6 w-6 text-purple-600" />
          </div>
        </div>

        <!-- Customers Card -->
        <div class="bg-white rounded-xl shadow-sm p-6 flex justify-between items-center">
          <div>
            <h3 class="text-base font-medium text-gray-600 mb-2">Clientes Nuevos</h3>
            <p class="text-2xl font-bold text-gray-800 mb-2">92</p>
            <p class="flex items-center text-sm text-green-600">
              <TrendingUpIcon class="h-4 w-4 mr-1" /> 
              +15.3% desde el mes pasado
            </p>
          </div>
          <div class="bg-purple-100 rounded-full h-14 w-14 flex items-center justify-center">
            <UsersIcon class="h-6 w-6 text-purple-600" />
          </div>
        </div>
      </div>

      <!-- Dashboard Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Sales Chart -->
        <div class="bg-white rounded-xl shadow-sm p-6 col-span-1 lg:col-span-2">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-lg font-medium text-gray-800">Ventas Mensuales</h3>
            <select class="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300">
              <option>Últimos 7 días</option>
              <option selected>Últimos 30 días</option>
              <option>Últimos 90 días</option>
            </select>
          </div>
          <div class="h-[300px] flex items-end">
            <div class="w-full flex justify-between items-end h-full">
              <div class="w-[12%] bg-purple-500 rounded-t-md" style="height: 30%"></div>
              <div class="w-[12%] bg-purple-500 rounded-t-md" style="height: 50%"></div>
              <div class="w-[12%] bg-purple-500 rounded-t-md" style="height: 70%"></div>
              <div class="w-[12%] bg-purple-500 rounded-t-md" style="height: 60%"></div>
              <div class="w-[12%] bg-purple-500 rounded-t-md" style="height: 80%"></div>
              <div class="w-[12%] bg-purple-500 rounded-t-md" style="height: 90%"></div>
              <div class="w-[12%] bg-purple-500 rounded-t-md" style="height: 75%"></div>
            </div>
          </div>
        </div>

        <!-- Recent Orders -->
        <div class="bg-white rounded-xl shadow-sm p-6">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-lg font-medium text-gray-800">Órdenes Recientes</h3>
            <button class="text-purple-600 font-medium text-sm">Ver todas</button>
          </div>
          <div class="flex flex-col divide-y">
            <!-- Order Item 1 -->
            <div class="py-3 flex flex-row items-center sm:flex-row">
              <div class="flex-1">
                <p class="font-medium text-gray-800">#ORD-5289</p>
                <p class="text-sm text-gray-600">María González</p>
              </div>
              <div class="sm:flex-1 sm:text-center my-2 sm:my-0">
                <span class="inline-block px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Completada</span>
              </div>
              <div class="sm:flex-1 sm:text-right font-medium">$128.50</div>
              <div class="sm:flex-1 sm:text-right text-sm text-gray-600">Hoy, 14:30</div>
            </div>
            
            <!-- Order Item 2 -->
            <div class="py-3 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="flex-1">
                <p class="font-medium text-gray-800">#ORD-5288</p>
                <p class="text-sm text-gray-600">Carlos Rodríguez</p>
              </div>
              <div class="sm:flex-1 sm:text-center my-2 sm:my-0">
                <span class="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">En proceso</span>
              </div>
              <div class="sm:flex-1 sm:text-right font-medium">$85.20</div>
              <div class="sm:flex-1 sm:text-right text-sm text-gray-600">Hoy, 12:15</div>
            </div>
            
            <!-- Order Item 3 -->
            <div class="py-3 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="flex-1">
                <p class="font-medium text-gray-800">#ORD-5287</p>
                <p class="text-sm text-gray-600">Ana Martínez</p>
              </div>
              <div class="sm:flex-1 sm:text-center my-2 sm:my-0">
                <span class="inline-block px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">Enviada</span>
              </div>
              <div class="sm:flex-1 sm:text-right font-medium">$210.75</div>
              <div class="sm:flex-1 sm:text-right text-sm text-gray-600">Ayer, 18:45</div>
            </div>
            
            <!-- Order Items 4 & 5 (same pattern) -->
            <div class="py-3 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="flex-1">
                <p class="font-medium text-gray-800">#ORD-5286</p>
                <p class="text-sm text-gray-600">Juan Pérez</p>
              </div>
              <div class="sm:flex-1 sm:text-center my-2 sm:my-0">
                <span class="inline-block px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">Completada</span>
              </div>
              <div class="sm:flex-1 sm:text-right font-medium">$56.30</div>
              <div class="sm:flex-1 sm:text-right text-sm text-gray-600">Ayer, 15:20</div>
            </div>
            
            <div class="py-3 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="flex-1">
                <p class="font-medium text-gray-800">#ORD-5285</p>
                <p class="text-sm text-gray-600">Laura Sánchez</p>
              </div>
              <div class="sm:flex-1 sm:text-center my-2 sm:my-0">
                <span class="inline-block px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">Cancelada</span>
              </div>
              <div class="sm:flex-1 sm:text-right font-medium">$145.00</div>
              <div class="sm:flex-1 sm:text-right text-sm text-gray-600">16 Mar, 09:10</div>
            </div>
          </div>
        </div>

        <!-- Pending Shipments -->
        <div class="bg-white rounded-xl shadow-sm p-6">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-lg font-medium text-gray-800">Envíos Pendientes</h3>
            <button class="text-purple-600 font-medium text-sm">Ver todos</button>
          </div>
          <div class="flex flex-col divide-y">
            <!-- Shipment Item 1 -->
            <div class="py-3 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="flex-1">
                <p class="font-medium text-gray-800">#ENV-1024</p>
                <p class="text-sm text-gray-600">#ORD-5280</p>
              </div>
              <div class="sm:flex-1 my-2 sm:my-0">Elena Torres</div>
              <div class="sm:flex-1 w-full my-2 sm:my-0">
                <div class="w-full bg-gray-200 rounded-full h-2 mb-1">
                  <div class="bg-purple-500 h-2 rounded-full" style="width: 75%"></div>
                </div>
                <span class="text-xs text-gray-600">En tránsito</span>
              </div>
              <div class="sm:flex-1 sm:text-right text-sm text-gray-600">Entrega: 18 Mar</div>
            </div>
            
            <!-- Shipment Item 2 -->
            <div class="py-3 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="flex-1">
                <p class="font-medium text-gray-800">#ENV-1023</p>
                <p class="text-sm text-gray-600">#ORD-5275</p>
              </div>
              <div class="sm:flex-1 my-2 sm:my-0">Roberto Díaz</div>
              <div class="sm:flex-1 w-full my-2 sm:my-0">
                <div class="w-full bg-gray-200 rounded-full h-2 mb-1">
                  <div class="bg-purple-500 h-2 rounded-full" style="width: 25%"></div>
                </div>
                <span class="text-xs text-gray-600">Procesando</span>
              </div>
              <div class="sm:flex-1 sm:text-right text-sm text-gray-600">Entrega: 20 Mar</div>
            </div>
            
            <!-- Shipment Items 3 & 4 (same pattern) -->
            <div class="py-3 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="flex-1">
                <p class="font-medium text-gray-800">#ENV-1022</p>
                <p class="text-sm text-gray-600">#ORD-5268</p>
              </div>
              <div class="sm:flex-1 my-2 sm:my-0">Carmen López</div>
              <div class="sm:flex-1 w-full my-2 sm:my-0">
                <div class="w-full bg-gray-200 rounded-full h-2 mb-1">
                  <div class="bg-purple-500 h-2 rounded-full" style="width: 50%"></div>
                </div>
                <span class="text-xs text-gray-600">Enviado</span>
              </div>
              <div class="sm:flex-1 sm:text-right text-sm text-gray-600">Entrega: 19 Mar</div>
            </div>
            
            <div class="py-3 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="flex-1">
                <p class="font-medium text-gray-800">#ENV-1021</p>
                <p class="text-sm text-gray-600">#ORD-5262</p>
              </div>
              <div class="sm:flex-1 my-2 sm:my-0">Miguel Fernández</div>
              <div class="sm:flex-1 w-full my-2 sm:my-0">
                <div class="w-full bg-gray-200 rounded-full h-2 mb-1">
                  <div class="bg-purple-500 h-2 rounded-full" style="width: 90%"></div>
                </div>
                <span class="text-xs text-gray-600">Llegando hoy</span>
              </div>
              <div class="sm:flex-1 sm:text-right text-sm text-gray-600">Entrega: Hoy</div>
            </div>
          </div>
        </div>

        <!-- Top Products -->
        <div class="bg-white rounded-xl shadow-sm p-6">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-lg font-medium text-gray-800">Productos Más Vendidos</h3>
            <button class="text-purple-600 font-medium text-sm">Ver todos</button>
          </div>
          <div class="flex flex-col divide-y">
            <!-- Product Item 1 -->
            <div class="py-3 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="bg-purple-100 h-12 w-12 rounded-lg mr-4"></div>
              <div class="flex-grow my-2 sm:my-0">
                <p class="font-medium text-gray-800">Vestido Elegancia</p>
                <p class="text-sm text-gray-600">Vestidos</p>
              </div>
              <div class="sm:text-right">
                <p class="font-medium">128 vendidos</p>
                <p class="text-sm text-gray-600">$12,800</p>
              </div>
            </div>
            
            <!-- Product Item 2 -->
            <div class="py-3 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="bg-purple-100 h-12 w-12 rounded-lg mr-4"></div>
              <div class="flex-grow my-2 sm:my-0">
                <p class="font-medium text-gray-800">Blusa Primavera</p>
                <p class="text-sm text-gray-600">Blusas</p>
              </div>
              <div class="sm:text-right">
                <p class="font-medium">96 vendidos</p>
                <p class="text-sm text-gray-600">$5,760</p>
              </div>
            </div>
            
            <!-- Product Items 3 & 4 (same pattern) -->
            <div class="py-3 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="bg-purple-100 h-12 w-12 rounded-lg mr-4"></div>
              <div class="flex-grow my-2 sm:my-0">
                <p class="font-medium text-gray-800">Pantalón Confort</p>
                <p class="text-sm text-gray-600">Pantalones</p>
              </div>
              <div class="sm:text-right">
                <p class="font-medium">85 vendidos</p>
                <p class="text-sm text-gray-600">$6,800</p>
              </div>
            </div>
            
            <div class="py-3 flex flex-col sm:flex-row items-start sm:items-center">
              <div class="bg-purple-100 h-12 w-12 rounded-lg mr-4"></div>
              <div class="flex-grow my-2 sm:my-0">
                <p class="font-medium text-gray-800">Chaqueta Urbana</p>
                <p class="text-sm text-gray-600">Chaquetas</p>
              </div>
              <div class="sm:text-right">
                <p class="font-medium">72 vendidos</p>
                <p class="text-sm text-gray-600">$9,360</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import { 
  Search as SearchIcon, 
  Bell as BellIcon, 
  User as UserIcon, 
  ShoppingBag as ShoppingBagIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  DollarSign as DollarSignIcon,
  ShoppingCart as ShoppingCartIcon,
  Truck as TruckIcon,
  Users as UsersIcon
} from 'lucide-vue-next'

export default {
  name: 'Dashboard',
  components: {
    SearchIcon,
    BellIcon,
    UserIcon,
    ShoppingBagIcon,
    TrendingUpIcon,
    TrendingDownIcon,
    DollarSignIcon,
    ShoppingCartIcon,
    TruckIcon,
    UsersIcon
  },
  data() {
    return {
      // Aquí podrías agregar datos dinámicos para el dashboard
    }
  },
  methods: {
    // Métodos para interactuar con el dashboard
  }
}
</script>