import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'
import fs from 'fs'

// Plugin to copy _redirects into dist
const copyRedirects = () => {
  return {
    name: 'copy-redirects',
    closeBundle() {
      const src = resolve(__dirname, 'public/_redirects')
      const dest = resolve(__dirname, 'dist/_redirects')
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest)
        console.log('✅ Copied _redirects to dist/')
      } else {
        console.warn('⚠️ _redirects file not found in public/')
      }
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(),tailwindcss(),copyRedirects()],
})
