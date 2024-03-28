import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // 打包配置
  build: {
    lib: {
      entry:  'src/xrender.jsx', // 设置入口文件
      name: 'XRender', // 起个名字，安装、引入用
      fileName: 'index', // 打包后的文件名
      outDir: 'D:\\Users\\AIYONG\\Desktop\\projects\\ad-pc\\src\\pages\\advertisement\\implament', // 输出目录
    },
    sourcemap: false, // 输出.map文件,
    outDir: 'D:\\Users\\AIYONG\\Desktop\\projects\\ad-pc\\src\\pages\\advertisement\\implament', // 输出目录
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.less']
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
})
