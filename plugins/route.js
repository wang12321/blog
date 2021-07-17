// import getPageTitle from '@/utils/get-page-title'
import { getToken } from '@/utils/auth'
import { routerFun } from '@/router/routerName'
//

const whiteList = ['/login', '/blog', '/common/home/home', '/login/blogLogin', '/blog/blogXQ', '/blog/blog_message']

export default ({ app, store, route }) => {
  app.router.beforeEach((to, from, next) => {
    // if (process.browser) {
    //    document.title = getPageTitle(to.meta.title)
    // }

    const hasToken = getToken()
    if (hasToken) {
      if (to.path === '/login') {
        // if is logged in, redirect to the home page
        next({ path: '/PublishedArticles' })
      } else if (!store.getters.name) {
        const routerData = routerFun(app.router.options.routes)
        store.dispatch('user/getInfo').then((res) => {
          store.dispatch('permission/generateRoutes', { router: routerData, roles: res }).then(() => {
            if (whiteList.includes(route.path)) {
              next()
            } else {
              // 判断页面是否有权限，暂不支持3级路由
              const routesD = store.getters.permission_routes
              const routeArr = []
              if (routesD.length !== 0) {
                routesD.forEach((item) => {
                  item.children.forEach((childrenItem) => {
                    routeArr.push(item)
                    routeArr.push(childrenItem)
                  })
                })
              }
              if (routeArr.length !== 0 && routeArr.findIndex(target => target.name === route.name) !== -1) {
                next()
              } else {
                next({ path: '/error' })
              }
            }
          })
        })
      } else if (to.path.includes('/:id')) {
        const params = { id: '66' }
        next({ ...to, params })
      } else {
        next()
      }
    } else {
      /* has no token */
      // eslint-disable-next-line no-lonely-if
      if (process.browser && window.location.port === '8083') {
        if (to.path.includes('/blog')) {
          next()
        } else {
          next({ path: '/blog' })
        }
      } else {
        next()
      }
    }
  })

  app.router.afterEach((to, from, next) => {
    // 实现自动生成路由配置文件======================================
  })
}
