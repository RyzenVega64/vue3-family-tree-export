import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig(({ mode }) => {
  const isLib = mode === 'lib'
  
  return {
    plugins: [vue()],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    build: isLib ? {
      lib: {
        entry: resolve(__dirname, 'src/index.js'),
        name: 'Vue3FamilyTreeExport',
        fileName: (format) => `index.${format === 'es' ? 'esm' : format}.js`,
        formats: ['es', 'umd']
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          globals: {
            vue: 'Vue'
          }
        }
      }
    } : {
      outDir: 'demo-dist'
    },
    server: {
      port: 3000,
      open: true
    }
  }
})
