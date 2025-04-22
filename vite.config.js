import { defineConfig } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    // 端口配置
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://xn3xjz.natappfree.cc/',
        secure: false, // 是否 https 接口
        ws: false, // 是否代理websockets
        changeOrigin: true,
        // 重写路径
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})
