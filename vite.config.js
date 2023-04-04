import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'
import { VitePluginFonts } from 'vite-plugin-fonts'

export default defineConfig({
  // optimizeDeps: { exclude: ['gamba'] },
  envPrefix: 'GAMBA_',
  server: { port: 4080 },
  resolve: { alias: { '@src': path.resolve(__dirname, './src') } },
  define: { 'process.env.ANCHOR_BROWSER': true },
  plugins: [
    react(),
    VitePluginFonts({
      google: {
        preconnect: true,
        families: [
          {
            name: 'Roboto Mono',
            styles: 'wght@400;700',
          },
        ],
      },
    }),
  ],
})
