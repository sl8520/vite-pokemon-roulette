import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return defineConfig({
    plugins: [
      vue(),
    ],
    base: process.env.NODE_ENV === 'production' ? '/vite-pokemon-roulette/' : '/',
    server: {
      open: true,
      port: 3500,
      strictPort: true,
      proxy: {
        [process.env.VITE_APP_BASE_API]: {
          target: process.env.VITE_APP_PROXY_API,
          changeOrigin: true,
          rewrite: path => path.replace(new RegExp(`^${process.env.VITE_APP_BASE_API}`), ''),
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  })
}
