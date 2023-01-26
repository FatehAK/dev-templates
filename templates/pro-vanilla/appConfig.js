// TODO: update the app config according your app
export const APP_CONFIG = {
  META: {
    name: 'APP_NAME',
    description: 'APP_DESCRIPTION',
    shortDescription: 'APP_SHORT_DESCRIPTION',
    keywords: 'APP_KEYWORDS',
    app: {
      background: '#fff',
    },
    social: {
      twitter: 'TWITTER_TAG',
    },
  },
  CLOUDFLARE_ANALYTICS_TOKEN: 'CA_TOKEN', // TODO: remove this prop if not using CF analytics
  PROD_BASE_URL: 'APP_PROD_URL',
};

export const META_TAGS = [
  {
    name: 'keywords',
    content: APP_CONFIG.META.keywords,
  },
  {
    name: 'name',
    content: `${APP_CONFIG.META.name} • ${APP_CONFIG.META.shortDescription}`,
  },
  {
    name: 'description',
    content: APP_CONFIG.META.description,
  },
  {
    name: 'image',
    content: `${APP_CONFIG.PROD_BASE_URL}/banner.png`, // TODO: add a banner image
  },
  // Open Graph tags
  {
    property: 'og:title',
    content: `${APP_CONFIG.META.name} • ${APP_CONFIG.META.shortDescription}`,
  },
  {
    property: 'og:description',
    content: APP_CONFIG.META.description,
  },
  {
    property: 'og:image',
    content: `${APP_CONFIG.PROD_BASE_URL}/banner.png`, // TODO: add a banner image
  },
  {
    property: 'og:url',
    content: APP_CONFIG.PROD_BASE_URL,
  },
  {
    property: 'og:type',
    content: 'website',
  },
  // Twitter tags
  {
    name: 'twitter:card',
    content: 'summary_large_image',
  },
  {
    name: 'twitter:site',
    content: APP_CONFIG.META.social.twitter,
  },
  {
    name: 'twitter:creator',
    content: APP_CONFIG.META.social.twitter,
  },
  {
    name: 'twitter:title',
    content: `${APP_CONFIG.META.name} • ${APP_CONFIG.META.shortDescription}`,
  },
  {
    name: 'twitter:description',
    content: APP_CONFIG.META.description,
  },
  {
    name: 'twitter:image',
    content: `${APP_CONFIG.PROD_BASE_URL}/banner.png`, // TODO: add a banner image
  },
  // Add to homescreen for Chrome on Android. Fallback for PWA
  {
    name: 'application-name',
    content: APP_CONFIG.META.name,
  },
  // Windows phone tile icon
  {
    name: 'msapplication-TileImage',
    content: `${APP_CONFIG.PROD_BASE_URL}/icons/icon-512-512.png`, // TODO: add a 512x512 app icon
  },
  {
    name: 'msapplication-TileColor',
    content: APP_CONFIG.META.app.background,
  },
  {
    name: 'msapplication-tap-highlight',
    content: 'no',
  },
  // iOS Safari
  {
    name: 'apple-mobile-web-app-title',
    content: APP_CONFIG.META.name,
  },
  {
    name: 'apple-mobile-web-app-capable',
    content: 'yes',
  },
  {
    name: 'apple-mobile-web-app-status-bar-style',
    content: 'black',
  },
  // PWA
  {
    name: 'theme-color',
    content: APP_CONFIG.META.app.background,
  },
  {
    name: 'mask-icon',
    content: '/icons/icon-512-512.png', // TODO: add a 512x512 app icon
    color: APP_CONFIG.META.app.background,
  },
];

// TODO: remove below config if not creating a PWA
export const PWA_CONFIG = {
  base: '/',
  registerType: 'autoUpdate',
  // TODO: add specified icon assets in the /public directory with correct sizes
  // you can use this site: https://www.pwabuilder.com/imageGenerator
  includeAssets: ['icons/favicon.ico', 'robots.txt', 'icons/*.png', 'icons/*.svg'],
  manifest: {
    name: APP_CONFIG.META.name,
    short_name: APP_CONFIG.META.name,
    description: APP_CONFIG.META.shortDescription,
    background_color: APP_CONFIG.META.app.background,
    theme_color: APP_CONFIG.META.app.background,
    start_url: '.',
    orientation: 'any',
    display: 'standalone',
    icons: [
      {
        src: '/icons/icon-512-512.png',
        sizes: '512x512',
        type: 'image/png',
        // eslint-disable-next-line sonarjs/no-duplicate-string
        purpose: 'any maskable',
      },
      {
        src: '/icons/icon-192-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/icons/icon-144-144.png',
        sizes: '144x144',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/icons/icon-96-96.png',
        sizes: '96x96',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/icons/icon-72-72.png',
        sizes: '72x72',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/icons/icon-48-48.png',
        sizes: '48x48',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
  },
  workbox: {
    sourcemap: false,
    cleanupOutdatedCaches: true,
    maximumFileSizeToCacheInBytes: 4194304,
    globPatterns: ['**/*.{html,css,js,svg,png,ico,json,woff2,txt}'],
    // TODO: adjust runtime caching according to the required cdn assets urls
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'google-fonts-cache',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      {
        urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'gstatic-fonts-cache',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      {
        urlPattern: /^https:\/\/cdnjs\.cloudflare\.com\/.*/i,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'cloudflare-cdn-cache',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 7, // <== 7 days
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  },
};
