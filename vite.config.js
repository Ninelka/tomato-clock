import path from 'path'
import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? 'https://ninelka.github.io/tomato-clock/' : './',
  build: {
    outDir: 'docs'
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src')
    }
  },
  plugins: [reactRefresh()]
})