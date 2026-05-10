import federation from '@originjs/vite-plugin-federation'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: 'taximetro_app',
      filename: 'remoteEntry.js',
      exposes: {
        './TaximetroWidget': './src/pages/Taximetro/Taximetro.tsx',
      },
      shared: ['react', 'react-dom']
    })
  ],
  server: {
    port: 3002,
    host: true,
    watch: {
      usePolling: true,
    }
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  }
})