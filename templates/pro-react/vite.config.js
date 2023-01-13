import { resolve } from 'path';
import { defineConfig, splitVendorChunkPlugin as ViteVendorChunkSplit } from 'vite';
import ViteReactPlugin from '@vitejs/plugin-react';
import ViteLinariaPlugin from '@linaria/vite';
import ViteLegacy from '@vitejs/plugin-legacy';
import ViteHTMLConfig from 'vite-plugin-html-config';
import { ViteMinifyPlugin } from 'vite-plugin-minify';
import { VitePWA } from 'vite-plugin-pwa';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import strip from '@rollup/plugin-strip';
import { visualizer } from 'rollup-plugin-visualizer';
import getTargetBrowsers from 'browserslist-to-esbuild';
import { paramCase } from 'change-case';
import { META_TAGS, APP_CONFIG, PWA_CONFIG } from './appConfig';

export default defineConfig(({ mode }) => {
  const isProd = mode === 'production';
  console.log(`✨ Running in ${isProd ? 'Production' : 'Development'}.\n`);

  return {
    resolve: {
      alias: {
        // TODO: update aliases as required
        pages: resolve(__dirname, 'src/pages'),
        components: resolve(__dirname, 'src/components'),
        theme: resolve(__dirname, 'src/theme'),
        constants: resolve(__dirname, 'src/constants'),
        assets: resolve(__dirname, 'src/assets'),
        appConfig: resolve(__dirname, './appConfig'),
      },
    },
    plugins: [
      ViteReactPlugin(),
      ViteLinariaPlugin({
        include: ['**/*.styles.js', '**/*.jsx'],
        ...(!isProd && {
          sourceMap: true,
          // make classnames readable in dev server and build, else we just get a hash
          classNameSlug: (hash, title) => `${paramCase(title)}_${hash}`,
        }),
      }),
      ViteVendorChunkSplit(), // splits vendor code like react, react-dom into a seperate chunk
      ViteLegacy({
        // inject polyfills here for modern features if needed
        modernPolyfills: [],
        renderLegacyChunks: false,
      }),
      ViteHTMLConfig({
        metas: META_TAGS,
        // TODO: remove the below script injection if not using CF analytics
        ...(isProd && {
          scripts: [
            {
              defer: true,
              src: `https://static.cloudflareinsights.com/beacon.min.js?token=${APP_CONFIG.CLOUDFLARE_ANALYTICS_TOKEN}`,
            },
          ],
        }),
      }),
      isProd &&
        ViteMinifyPlugin({
          // only used to minify html files
          sortAttributes: true,
          removeStyleLinkTypeAttributes: true,
          removeScriptTypeAttributes: true,
          removeRedundantAttributes: true,
        }),
      VitePWA(PWA_CONFIG), // TODO: remove this plugin to opt out of PWA support
      ViteImageOptimizer(), // TODO: remove below plugin to opt out of build time asset optimization, remove 'svgo' and 'sharp' in devdeps
    ],
    preview: { open: true },
    server: {
      open: true,
      port: 3000,
      hmr: { overlay: false },
    },
    build: {
      minify: isProd ? 'esbuild' : false,
      target: getTargetBrowsers(), // reads from browserslist field in package.json to specify target browsers to generate code for
      sourcemap: isProd ? 'hidden' : true, // we hide sourcemaps in prod as they are exposed as artifacts in gh prod workflow
      rollupOptions: {
        output: {
          // TODO: adjust the output build files if required
          // paramCase(someFile.js) -> 'some-file.js'
          entryFileNames: '[name].[hash].js',
          chunkFileNames: file => `chunks/${paramCase(file.name)}.[hash].js`,
          assetFileNames: file => `assets/${paramCase(file.name.split('.')[0])}.[hash].[ext]`,
        },
        plugins: [
          isProd && strip(), // strips console and debugger statements from prod build
          // generate build report in /reports
          visualizer({
            filename: 'reports/build-stats.html',
            gzipSize: true,
            brotliSize: true,
          }),
        ],
      },
    },
  };
});
