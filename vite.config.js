import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { compression } from 'vite-plugin-compression2';
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    compression({
      algorithms: ['gzip', 'brotliCompress'],
      threshold: 1024, // only compress files >1KB
      skipIfLargerOrEqual: true, // skip if compression doesn't help
      deleteOriginalAssets: false, // keep originals for fallback
    }),
  ],
  build: { minify: 'esbuild', sourcemap: false, target: 'esnext' },
});
