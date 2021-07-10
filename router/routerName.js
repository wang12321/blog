
// 中间件方法
export function routerFun (routerS) {
  const routerList = []
  routerS.forEach((item) => {
    const routerObj = {}
    routerObj.path = item.path
    routerObj.name = item.name
    routerObj.meta = item.meta

    // router 子路径
    const routerChildren = {
      path: '',
      name: routerObj.name,
      meta: {
        title: '',
        icon: '',
        permissionArray: []
      }
    }
    // router 路径
    const router = {
      path: '',
      meta: {
        title: '',
        icon: '',
        permissionArray: []
      },
      children: []
    }

    const routerArr = routerObj.path.includes('/:id') ? (routerObj.path.substring(0, routerObj.path.indexOf('/:id')).split('/')) : routerObj.path.split('/')
    let isSame = true
    // 过滤所有components下的子组件，无需生成路由
    if (routerArr.includes('common') || routerArr.includes('login') || routerArr.includes('blog')) {
      return
    }
    if (routerObj.name.includes('common')) {
      return
    }
    // 初始化属性值
    const routerAttribute = function (name, attribute, isChildrenName) {
      const init = {
        index: 1,
        icon: 'component',
        name: isChildrenName || name,
        permission: [1, 2, 3],
        newTime: new Date()
      }
      if (!isChildrenName) {
        if (attribute === 'newTime') {
          return (routerName[name] && routerName[name] !== '' && routerName[name][attribute]) ? new Date(routerName[name][attribute]) : init[attribute]
        }
        return (routerName[name] && routerName[name] !== '' && routerName[name][attribute]) ? routerName[name][attribute] : init[attribute]
      } else if (isChildrenName && isChildrenName === name) {
        if (attribute === 'newTime') {
          return (routerName[isChildrenName] && routerName[isChildrenName] !== '' && routerName[isChildrenName][attribute]) ? new Date(routerName[isChildrenName][attribute]) : init[attribute]
        }
        return (routerName[isChildrenName] && routerName[isChildrenName] !== '' && routerName[isChildrenName][attribute]) ? routerName[isChildrenName][attribute] : init[attribute]
      } else {
        if (attribute === 'newTime') {
          return (routerName[name] && routerName[name] !== '' && routerName[name].children && routerName[name].children[isChildrenName] && routerName[name].children[isChildrenName] !== '' && routerName[name].children[isChildrenName][attribute]) ? new Date(routerName[name].children[isChildrenName][attribute]) : init[attribute]
        }
        return (routerName[name] && routerName[name] !== '' && routerName[name].children && routerName[name].children[isChildrenName] && routerName[name].children[isChildrenName] !== '' && routerName[name].children[isChildrenName][attribute]) ? routerName[name].children[isChildrenName][attribute] : init[attribute]
      }
    }
    // 设置父属性值
    const parentAttribute = (parentName, childrenName) => {
      router.index = routerAttribute(parentName, 'index')
      router.meta.icon = routerAttribute(parentName, 'icon')
      router.meta.title = routerAttribute(parentName, 'name')
      router.meta.permissionArray = routerAttribute(parentName, 'permission')
      router.meta.newTime = routerAttribute(parentName, 'newTime')
      childrenAttribute(parentName, childrenName)
    }
    // 设置子属性值
    const childrenAttribute = (parentName, childrenName) => {
      routerChildren.index = routerAttribute(parentName, 'index', childrenName)
      routerChildren.meta.icon = routerAttribute(parentName, 'icon', childrenName)
      routerChildren.meta.title = routerAttribute(parentName, 'name', childrenName)
      routerChildren.meta.newTime = routerAttribute(parentName, 'newTime', childrenName)
      routerChildren.meta.permissionArray = routerAttribute(parentName, 'permission', childrenName)
    }
    switch (routerArr.length) {
      case 2:
        // 当路由不是嵌套路径时 直接push到routerList中
        parentAttribute(routerArr[1], routerArr[1])
        // router.name = routerArr[1] + 'p'
        router.children.push(routerChildren)
        routerChildren.path = routerObj.path
        if (routerObj.meta) {
          router.meta = routerObj.meta
          routerChildren.meta = routerObj.meta
        }
        routerList.push(router)
        break
      case 3:
        // 当路由是嵌套路径时，如果routerList中包含改路径，则在children中加入子路径，否则在routerList中push。
        router.path = routerArr[1] === routerArr[2] ? '/' + routerArr[1] + 'p' : '/' + routerArr[1]
        router.name = routerArr[1] + 'p'
        router.meta.breadcrumb = routerArr[1] !== routerArr[2]
        parentAttribute(routerArr[1], routerArr[2])
        if (routerArr[1] === routerArr[2]) {
          routerChildren.path = routerObj.path
        } else {
          routerChildren.path = routerObj.path
        }
        routerList.forEach((item) => {
          if (routerArr[1] + 'p' === item.name) {
            item.children.push(routerChildren)
            isSame = false
          }
        })
        if (isSame) {
          router.children.push(routerChildren)
          routerList.push(router)
        }
        break
    }
  })
  return routerList
}

// router 配置项
export const routerName = {
  '': {
    name: ' 博客首页',
    icon: 'form',
    index: 1,
    permission: [1, 2, 3]
  },
  PublishedArticles: {
    name: '发布文章',
    icon: 'form',
    index: 2,
    permission: [1, 2, 3]
  },
  articleManagement: {
    name: '文章管理',
    icon: 'form',
    index: 3,
    permission: [1, 2, 3]
  },

  system: {
    name: '系统管理',
    icon: 'component',
    index: 99,
    permission: [1, 2],
    newTime: '2021-07-20',
    children: {
      permisstion: {
        name: '权限管理',
        icon: 'form',
        index: 1,
        permission: [1, 2],
        newTime: '2021-07-20'
      }
    }
  }
}

// 如果是三级菜单，自行配置
export const constantRoutes = [
  // {
  //   name: '404',
  //   meta: { title: '错误401', permissionArray: [1, 2, 3], icon: 'error', newTime: new Date(), noCache: false },
  //   icon: 'form',
  //   path: '/404',
  //   index: 99,
  //   children: []
  // }
  // {
  //   path: '/common',
  //   name: 'home1',
  //   index: 1,
  //   meta: { title: '一级', icon: 'form', newTime: new Date(), noCache: false },
  //   children: [
  //     {
  //       children: [
  //         {
  //           index: 1,
  //           name: 'common-home-home',
  //           meta: { title: '三级', icon: 'form', newTime: new Date(), noCache: false },
  //           path: '/common/home/home',
  //           children: []
  //         }
  //       ],
  //       index: 1,
  //       name: 'home2',
  //       meta: { title: '二级', icon: 'form', newTime: new Date(), noCache: false },
  //       path: '/home'
  //     }
  //   ]
  // }
]
