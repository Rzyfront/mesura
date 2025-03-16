<template>
    <div :class="{ 'dark': isDark }">
      <slot></slot>
    </div>
  </template>
  
  <script setup>
  import { ref, provide, onMounted, onUnmounted, watch } from 'vue'
  
  const props = defineProps({
    defaultTheme: {
      type: String,
      default: 'light'
    },
    enableSystem: {
      type: Boolean,
      default: true
    },
    storageKey: {
      type: String,
      default: 'theme'
    }
  })
  
  const isDark = ref(false)
  const theme = ref(props.defaultTheme)
  
  // Provide theme context to child components
  provide('theme', {
    theme,
    isDark,
    setTheme
  })
  
  function setTheme(newTheme) {
    theme.value = newTheme
    
    if (newTheme === 'system') {
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    } else {
      isDark.value = newTheme === 'dark'
    }
    
    // Save theme preference to localStorage
    localStorage.setItem(props.storageKey, newTheme)
  }
  
  // Watch for system preference changes if system theme is enabled
  function setupSystemThemeDetection() {
    if (props.enableSystem && theme.value === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
      
      const handleChange = (e) => {
        isDark.value = e.matches
      }
      
      mediaQuery.addEventListener('change', handleChange)
      
      // Cleanup
      onUnmounted(() => {
        mediaQuery.removeEventListener('change', handleChange)
      })
    }
  }
  
  // Initialize theme on component mount
  onMounted(() => {
    // Get saved theme from localStorage
    const savedTheme = localStorage.getItem(props.storageKey)
    
    if (savedTheme) {
      setTheme(savedTheme)
    } else if (props.enableSystem) {
      setTheme('system')
    } else {
      setTheme(props.defaultTheme)
    }
    
    setupSystemThemeDetection()
  })
  
  // Watch for theme changes
  watch(theme, (newTheme) => {
    setTheme(newTheme)
  })
  </script>