import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import VueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueDevTools(),
  ],
  test: {
    coverage: {
      provider: 'v8', // usa @vitest/coverage-v8
      reporter: ['text', 'lcov'], // lcov é necessário pro SonarCloud
    },
    // Evita erro se não encontrar testes
    passWithNoTests: true,
  }, // fechou o test aqui
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
