export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: 'Free Online Gym Timer',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, viewport-fit=cover',
      },
      {
        hid: 'description',
        name: 'description',
        content:
          'A simple online stopwatch with a customisable break timer, audio feedback, keyboard shortcuts and a light/dark mode. The key to your perfekt workout.',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
      {
        rel: 'apple-touch-icon',
        href: '/apple-touch-icon.png',
      },
      {
        rel: 'mask-icon',
        href: '/safari-pinned-tab.svg',
        color: '#1a202c',
      },
    ],
    script: [
      {
        src: 'https://sa.gymtimer.io/app.js',
        async: true,
        defer: true,
        body: true,
      },
    ],
    noscript: [
      {
        innerHTML: '<img src="https://sa.gymtimer.io/image.gif" alt="">',
        body: true,
      },
    ],
    __dangerouslyDisableSanitizers: ['noscript'],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@nuxt/typescript-build',
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/pwa'],
  /*
   ** Nuxt.js PWA Workbox Moduoe
   */
  pwa: {
    manifest: {
      name: 'Gym Timer',
      short_name: 'GymTimer',
      description:
        'A simple online stopwatch with a customisable break timer, audio feedback, keyboard shortcuts and a light/dark mode. The key to your perfekt workout.',
      theme_color: '#4fd1c5',
      background_color: '#1a202c',
      display: 'fullscreen',
      scope: '/',
      lang: 'en',
      icons: [
        {
          src: 'images/icons/icon-72x72.png',
          sizes: '72x72',
          type: 'image/png',
        },
        {
          src: 'images/icons/icon-96x96.png',
          sizes: '96x96',
          type: 'image/png',
        },
        {
          src: 'images/icons/icon-128x128.png',
          sizes: '128x128',
          type: 'image/png',
        },
        {
          src: 'images/icons/icon-144x144.png',
          sizes: '144x144',
          type: 'image/png',
        },
        {
          src: 'images/icons/icon-152x152.png',
          sizes: '152x152',
          type: 'image/png',
        },
        {
          src: 'images/icons/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'images/icons/icon-384x384.png',
          sizes: '384x384',
          type: 'image/png',
        },
        {
          src: 'images/icons/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
    workbox: {
      offlineAssets: ['/sounds/beep.wav', '/sounds/bong.mp3'],
    },
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    extend(config, ctx) {
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      });
    },
  },
};
