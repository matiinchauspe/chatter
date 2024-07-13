import react from '@vitejs/plugin-react-swc'
import sass from 'sass'
import path from 'node:path'
import { defineConfig, loadEnv } from 'vite'

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return defineConfig({
    plugins: [react()],
    css: {
      preprocessorOptions: {
        scss: {
          implementation: sass
        }
      }
    },
    server: {
      proxy: {
        '/socket.io': {
          target: `${process.env.VITE_API_URL}:${process.env.VITE_PORT}`,
          ws: true
        }
      }
    },
    build: {
      sourcemap: true
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
}
