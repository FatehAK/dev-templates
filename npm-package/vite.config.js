import { resolve } from 'path';
import { defineConfig } from 'vite';
import strip from '@rollup/plugin-strip';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';
  console.log(`✨ Running in ${isProd ? 'Production' : 'Development'}.\n`);

  return {
    build: {
      minify: isProd ? 'esbuild' : false,
      lib: {
        entry: resolve(__dirname, 'src/index.js'), // TODO: update your entry point if required
        name: 'MyNpmPackage', // TODO: update this with your exposed var
        formats: ['es', 'cjs'],
        fileName: 'index',
      },
      rollupOptions: {
        external: [], // TODO: configure if you are using externals like node's fs or path modules
        plugins: [
          isProd && strip(), // strips console and debugger statements from prod build
          visualizer({
            filename: 'reports/build-stats.html',
            gzipSize: true,
            brotliSize: true,
          }),
        ],
        output: {
          globals: {}, // TODO: map externals to vars referred in code (only if using externals)
        },
      },
    },
  };
});
