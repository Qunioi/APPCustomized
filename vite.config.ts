import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import path from 'node:path'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const base = mode === 'development' ? '/' : `/${env.VITE_VERSION}/`

  return {
    base,
    plugins: [
      vue(),
      AutoImport({
        // 自動導入這些套件的 API
        imports: ['vue', 'vue-router', 'pinia'],
        // 讓 <template> 裡也能用（如直接寫 ref/computed）
        vueTemplate: true,
        // 產生 d.ts，最好放在 src 底下，TS/IDE 比較好抓
        dts: 'src/auto-imports.d.ts',
        // 讓 ESLint 知道這些是全域自動導入，避免 no-undef
        eslintrc: {
          enabled: true,
          globalsPropValue: true,
        },
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
    server: {
      port: Number(env.VITE_PORT) || 3001,
      host: true,
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          silenceDeprecations: ['legacy-js-api'],
        },
      },
    },
  }
})
