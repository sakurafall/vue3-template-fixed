<template>
  <div class="main-menu">
    <div class="logo">
      <img class="img" src="@/assets/img/logo/logo.svg" alt="" />
      <h2 v-show="!isFold" class="title">GHSOFT</h2>
    </div>
    <div class="menu">
      <el-menu :collapse="isFold" :default-active="defaultActive" text-color="#b7bdc3" active-text-color="#fff"
        background-color="#001529">
        <template v-for="item in userMenus" :key="item.id">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon>
                <component :is="item.icon.split('-icon-')[1]"></component>
              </el-icon>
              <span>{{ item.name }}</span>
            </template>
            <template v-for="subItem in item.children" :key="subItem.id">
              <el-menu-item :index="subItem.id + ''" @click="handleMenuClick(subItem)">
                <span>{{ subItem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useLoginStore from '@/stores/login/login'
import useMainStore from '@/stores/main/main'
import { mapPathToMenu, mapPathToTab } from '@/utils/map-menus'

// 0. 定义props
const props = defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})

// 1. 获取动态的菜单
const loginStore = useLoginStore()
const userMenus = loginStore.userMenus

const mainStore = useMainStore()
const { navTabs } = mainStore

// 2. 监听item的点击
const router = useRouter()
const handleMenuClick = (item) => {
  router.push(item.url)

  // 2.2. 点击item，判断navTabs是否存在该item，不存在则添加
  if (navTabs.find(every => every.path === item.url)) return
  mainStore.addNavTabAction(...mapPathToTab(item.url, userMenus))
}

// 3. ElMenu的默认菜单
const route = useRoute()
// 使用 computed 来计算 defaultActive 的值
const defaultActive = computed(() => {
  const pathMenu = mapPathToMenu(route.path, userMenus)
  // 确保 pathMenu 存在，并避免可能的 null 或 undefined
  return pathMenu ? pathMenu.id + '' : ''
})
</script>

<style lang="scss" scoped>
.main-menu {
  height: 100%;
  background: #fff;
}

.logo {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
  height: 28px;
  padding: 12px 10px 8px 10px;

  .img {
    height: 100%;
    margin: 0 10px;
  }

  .title {
    color: #154ec1;
    font-size: 16px;
    font-weight: 700;
    white-space: nowrap;
  }
}

// 整个菜单栏
.el-menu {
  color: #262824;
  font-weight: 700;
  border-right: none;
  user-select: none;
  background: #fff;
}

// 第二层菜单栏item 默认颜色 hover颜色 选择颜色调增
.el-sub-menu {
  .el-menu-item {
    color: #262824;
    padding-left: 50px;
    background: #fff;
  }

  .el-menu-item:hover {
    background: #ecf6ff;
  }

  .el-menu-item.is-active {
    color: #154ec1;
    background: #c8e5ff;
  }
}

// Bug的问题是：el-menu展开和收起子菜单卡顿;
// 是el-icon的样式font-size使用了18px导致的;
// 这里只需要给font-size设置为1em就可以，既保持了18px又不会出现bug;
:deep(.el-icon) {
  font-size: 1em;
}

// 最外层菜单栏item 文字颜色
:deep(.el-sub-menu__title) {
  color: #262824;
}

// 最外层菜单栏item hover效果
:deep(.el-sub-menu__title:hover) {
  background: #ecf6ff;
}

// 缩小后图片颜色
:deep(.el-menu--collapse .el-sub-menu.is-active .el-sub-menu__title) {
  color: #154ec1;
}

.el-popper.is-light {
  background: #fff;
}
</style>
