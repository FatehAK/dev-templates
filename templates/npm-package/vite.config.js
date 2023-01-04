import { resolve } from 'path';
import { defineConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';
import pkg from './package.json';

export default defineConfig(() => {
  return {
    build: {
      // TODO: We don't minify packages used during bundling, you can turn it on if it will be served from browser
      minify: false,
      lib: {
        entry: resolve(__dirname, 'src/index.js'), // TODO: update your entry point if required
        name: 'MyNpmPackage', // TODO: update this with your exposed var
        formats: ['es', 'cjs'],
        fileName: 'index',
      },
      rollupOptions: {
        // TODO: configure deps to excluded from the bundle and external deps like node's fs or path modules
        external: [...Object.keys(pkg.dependencies)],
        plugins: [
          visualizer({
            filename: 'reports/build-stats.html',
            gzipSize: true,
            brotliSize: true,
          }),
        ],
        output: {
          globals: {}, // TODO: map externals to vars referred in code
        },
      },
    },
  };
});
