export default {
  router: {
    extendRoutes (routes, resolve) {
      // 添加router  name,path,component,meta，children
      // routes.push({
      //   name: 'common/custom',
      //   path: '/404',
      //   children: [],
      //   meta: { title: '错误404', permissionArray: [1, 2, 3], icon: 'form', newTime: '' },
      //   component: resolve(__dirname, 'views/404.vue')
      // })

      // 扩展配置
      // routes.forEach((item) => {
      //   if (item.path === '/') {
      //     item.meta = { title: '首页配置', permissionArray: [1, 2, 3], icon: 'form', newTime: '' }
      //   }
      // })
    }
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'ff',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '~/assets/index'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui',
    '~/plugins/route',
    '@/plugins/svg-icon', // 注册svg插件文件
    { src: '@/plugins/eleComponent', ssr: false }

  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
    // https://go.nuxtjs.dev/stylelint
    // '@nuxtjs/stylelint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa'
    // '@nuxtjs/style-resources'
  ],
  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/],
    extend (config, ctx) {
      // 排除 nuxt 原配置的影响,Nuxt 默认有vue-loader,会处理svg,img等
      // 找到匹配.svg的规则,然后将存放svg文件的目录排除
      const svgRule = config.module.rules.find(rule => rule.test.test('.svg'))
      // eslint-disable-next-line no-undef
      svgRule.exclude = [resolve('assets/icons/svg')]
      // 添加loader规则
      config.module.rules.push({
        test: /\.svg$/, // 匹配.svg
        // eslint-disable-next-line no-undef
        include: [resolve('assets/icons/svg')], // 将存放svg的目录加入到loader处理目录
        use: [{ loader: 'svg-sprite-loader', options: { symbolId: 'icon-[name]' } }]
      })
    }
  }
}
// eslint-disable-next-line nuxt/no-cjs-in-config
const path = require('path')

function resolve (dir) {
  return path.join(__dirname, dir)
}
