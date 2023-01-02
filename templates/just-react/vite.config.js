import { defineConfig } from 'vite';
import ViteReactPlugin from '@vitejs/plugin-react';

export default defineConfig(() => {
  return {
    plugins: [ViteReactPlugin()],
    preview: { open: true },
    server: {
      open: true,
      port: 3000,
      hmr: { overlay: false },
    },
  };
});
