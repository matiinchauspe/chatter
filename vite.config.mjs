import react from '@vitejs/plugin-react-swc'
import sass from 'sass'
import path from 'node:path'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        implementation: sass
      }
    }
  },
  resolve: {
    alias: [
      {
        find: 'vars',
        replacement: `${path.resolve(__dirname, 'src')}/styles/_vars.scss`
      },
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src')
      }
    ]
  }
})
