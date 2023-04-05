import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'
import { VitePluginFonts } from 'vite-plugin-fonts'

const ENV_PREFIX = ['GAMBA_', 'VITE_']

export default defineConfig(() => ({
  // optimizeDeps: { exclude: ['gamba'] }, // For building with a linked package
  // base: '/flip/', // for Github pages
  envPrefix: ENV_PREFIX,
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
}))
