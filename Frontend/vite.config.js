import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'
import fs from 'fs'

const copyRedirects = () => {
  return {
    name: 'copy-redirects',
    buildEnd() {
      const src = resolve(__dirname, 'public/_redirects')
      const dest = resolve(__dirname, 'dist/_redirects')
      fs.copyFileSync(src, dest)
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react(),tailwindcss(),copyRedirects()],
})
