<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <div>
        <h3 class="text-xl font-semibold text-gray-900">Apariencia</h3>
        <p class="text-sm text-gray-500">Personaliza el aspecto visual de tu tienda</p>
      </div>
      <button class="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center gap-2">
        <Save class="h-5 w-5" />
        Guardar Cambios
      </button>
    </div>

    <div class="grid gap-8">
      <!-- Logo de la tienda -->
      <section class="space-y-4">
        <h4 class="text-lg font-medium text-gray-900">Logo</h4>
        <div class="flex items-start gap-6">
          <div class="flex-shrink-0">
            <div class="w-32 h-32 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center bg-gray-50">
              <img v-if="currentLogo" :src="currentLogo" alt="Logo actual" class="w-full h-full object-contain" />
              <ImagePlus v-else class="h-8 w-8 text-gray-400" />
            </div>
          </div>
          <div class="flex-grow space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Logo principal</label>
              <input type="file" accept="image/*" class="hidden" ref="logoInput" @change="handleLogoChange" />
              <button 
                @click="$refs.logoInput.click()"
                class="px-4 py-2 border rounded-md hover:bg-gray-50 transition-colors"
              >
                Cambiar logo
              </button>
              <p class="mt-2 text-sm text-gray-500">Recomendado: PNG o SVG con fondo transparente. Máximo 2MB.</p>
            </div>
            <div class="flex items-center">
              <Switch
                v-model="settings.showTextWithLogo"
                :class="[settings.showTextWithLogo ? 'bg-purple-600' : 'bg-gray-200']"
                class="relative inline-flex h-6 w-11 items-center rounded-full"
              >
                <span class="sr-only">Mostrar nombre junto al logo</span>
                <span
                  :class="[settings.showTextWithLogo ? 'translate-x-6' : 'translate-x-1']"
                  class="inline-block h-4 w-4 transform rounded-full bg-white transition"
                />
              </Switch>
              <span class="ml-3 text-sm font-medium text-gray-700">Mostrar nombre junto al logo</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Colores -->
      <section class="space-y-4">
        <h4 class="text-lg font-medium text-gray-900">Colores</h4>
        <div class="grid gap-6 md:grid-cols-2">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Color principal</label>
            <div class="flex items-center gap-3">
              <input 
                type="color" 
                v-model="settings.primaryColor"
                class="h-10 w-20 rounded border p-1"
              />
              <input 
                type="text" 
                v-model="settings.primaryColor"
                class="px-3 py-2 border rounded-md w-32"
                placeholder="#000000"
              />
            </div>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Color de acento</label>
            <div class="flex items-center gap-3">
              <input 
                type="color" 
                v-model="settings.accentColor"
                class="h-10 w-20 rounded border p-1"
              />
              <input 
                type="text" 
                v-model="settings.accentColor"
                class="px-3 py-2 border rounded-md w-32"
                placeholder="#000000"
              />
            </div>
          </div>
        </div>
      </section>

      <!-- Tipografía -->
      <section class="space-y-4">
        <h4 class="text-lg font-medium text-gray-900">Tipografía</h4>
        <div class="grid gap-6 md:grid-cols-2">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Fuente principal</label>
            <select 
              v-model="settings.mainFont"
              class="w-full px-3 py-2 border rounded-md"
            >
              <option value="inter">Inter</option>
              <option value="roboto">Roboto</option>
              <option value="opensans">Open Sans</option>
              <option value="lato">Lato</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Fuente de títulos</label>
            <select 
              v-model="settings.headingFont"
              class="w-full px-3 py-2 border rounded-md"
            >
              <option value="playfair">Playfair Display</option>
              <option value="merriweather">Merriweather</option>
              <option value="lora">Lora</option>
              <option value="crimson">Crimson Text</option>
            </select>
          </div>
        </div>
      </section>

      <!-- Vista previa -->
      <section class="space-y-4">
        <h4 class="text-lg font-medium text-gray-900">Vista previa</h4>
        <div class="border rounded-lg p-6 bg-gray-50">
          <div class="max-w-2xl mx-auto">
            <div class="flex items-center justify-between mb-8 p-4 bg-white rounded-lg shadow-sm" :style="{ backgroundColor: settings.primaryColor + '10' }">
              <div class="flex items-center gap-3">
                <div class="w-8 h-8 rounded bg-gray-200"></div>
                <span class="font-medium" :style="{ fontFamily: settings.mainFont }">MESURA</span>
              </div>
              <div class="flex items-center gap-4">
                <span :style="{ fontFamily: settings.mainFont }">Inicio</span>
                <span :style="{ fontFamily: settings.mainFont }">Productos</span>
                <button 
                  class="px-4 py-2 rounded-md text-white"
                  :style="{ backgroundColor: settings.primaryColor }"
                >
                  Contacto
                </button>
              </div>
            </div>
            <div class="space-y-4">
              <h1 
                class="text-3xl font-bold"
                :style="{ 
                  fontFamily: settings.headingFont,
                  color: settings.primaryColor 
                }"
              >
                Título de ejemplo
              </h1>
              <p :style="{ fontFamily: settings.mainFont }">
                Este es un texto de ejemplo para mostrar cómo se verán los diferentes elementos con la configuración actual.
                Los cambios en colores y tipografía se reflejarán aquí.
              </p>
              <button 
                class="px-6 py-3 rounded-md text-white"
                :style="{ backgroundColor: settings.accentColor }"
              >
                Botón de ejemplo
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { Save, ImagePlus } from 'lucide-vue-next'
import { Switch } from '@headlessui/vue'
import { useCustomToast } from '../../../composables/useToast'

const { showSuccess } = useCustomToast()

// Estado
const currentLogo = ref('/src/assets/images/logo.webp')
const logoInput = ref(null)

const settings = reactive({
  showTextWithLogo: true,
  primaryColor: '#9333EA',
  accentColor: '#7C3AED',
  mainFont: 'inter',
  headingFont: 'playfair'
})

// Métodos
function handleLogoChange(event) {
  const file = event.target.files[0]
  if (file) {
    if (file.size > 2 * 1024 * 1024) {
      alert('El archivo es demasiado grande. Máximo 2MB permitido.')
      return
    }
    
    const reader = new FileReader()
    reader.onload = (e) => {
      currentLogo.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

async function saveChanges() {
  // Aquí iría la lógica para guardar los cambios
  showSuccess('Cambios guardados correctamente')
}
</script> 