/**
 * 加载本地路由
 * @returns localRoutes: 所有路由对象
 */
function loadLocalRoutes() {
  // 1. 动态获取所有的路由对象，放到数组中
  // * 路由对象都在独立的文件中
  // * 从文件中将所有路由对象像读取到数组中
  const localRoutes = []
  // 1.1. 读取router/main所有的ts文件
  const files = import.meta.glob('@/router/main/**/*.js', {
    eager: true
  })
  // 1.2. 将加载的对象放到localRoutes
  for (const key in files) {
    const module = files[key]
    localRoutes.push(module.default)
  }

  return localRoutes
}

/**
 *  根据菜单去匹配正确的路由
 * @param userMenus 后端返回的菜单
 * @returns routes 返回根据菜单匹配的路由
 */
export let firstMenu = null
export function mapMenusToRoutes(userMenus) {
  // 1. 加载本地路由
  const localRoutes = loadLocalRoutes()

  // 2. 根据菜单去匹配正确的路由
  const routes = []
  for (const menu of userMenus) {
    for (const subMenu of menu.children) {
      const route = localRoutes.find((item) => item.path === subMenu.url)
      if (route) {
        // 1. 给route的顶层菜单增加重定向功能(但是只需添加一次)
        if (!routes.find((item) => item.path === menu.url)) {
          routes.push({ path: menu.url, redirect: subMenu.url })
        }
        // 2. 添加二级菜单对应的路径
        routes.push(route)
      }
      // 记录第一个被匹配到的菜单
      if (!firstMenu && routes) firstMenu = subMenu
    }
  }

  return routes
}

/**
 * 根据路径去匹配需要显示的菜单
 * @param path 需要匹配的路径
 * @param userMenus 所有的菜单
 * @returns 匹配后的菜单
 */
export function mapPathToMenu(path, userMenus) {
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        return submenu
      }
    }
  }
}

/**
 * 根据路径去匹配面包屑需要的路由
 * @param path 需要匹配的路径
 * @param userMenus 所有的路由
 */

export function mapPathToBreadcrumb(path, userMenus) {
  // 1. 定义面包屑
  const breadcrumbs = []

  // 2. 获取面包屑
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        // 1. 顶层菜单
        breadcrumbs.push({ name: menu.name, path: menu.url })
        // 2. 二级菜单
        breadcrumbs.push({ name: submenu.name, path: submenu.url })
      }
    }
  }

  return breadcrumbs
}

/**
 * 根据路径去匹配导航标签页需要的路由
 * @param path 需要匹配的路径
 * @param userMenus 所有的路由
 */

export function mapPathToTab(path, userMenus) {
  // 1. 定义导航标签页
  const tabs = []

  // 2. 获取面包屑
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (submenu.url === path) {
        // 添加当前菜单
        tabs.push({ name: submenu.name, path: submenu.url })
      }
    }
  }

  return tabs
}

/**
 * 菜单映射到id的列表
 * @param menuList
 */
export function mapMenuListToIds(menuList) {
  const ids = []

  function recursiveGetId(menus) {
    for (const item of menus) {
      if (item.children) {
        recursiveGetId(item.children)
      } else {
        ids.push(item.id)
      }
    }
  }
  recursiveGetId(menuList)

  return ids
}

/**
 * 菜单映射到permission的列表
 * @param menuList 用户菜单列表
 * @returns 权限列表
 */
export function mapMenusToPermissions(menuList) {
  const permissions = []

  function recursiveGetPermissions(menus) {
    for (const item of menus) {
      if (item.type === 3) {
        permissions.push(item.permission)
      } else {
        recursiveGetPermissions(item.children ?? [])
      }
    }
  }
  recursiveGetPermissions(menuList)

  return permissions
}
