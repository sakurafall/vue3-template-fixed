<template>
  <div class="header-tabs">
    <template v-for="item in navTabs" :key="item.name">
      <el-tag class="tag-item" effect="plain" type="info" color="#fff" size="large" closable
        @close="handleTagClose(item)" @click="handleTagClick(item)">
        {{ item.name }}
      </el-tag>
    </template>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useLoginStore from '@/stores/login/login'
import useMainStore from '@/stores/main/main'
import { mapPathToTab } from '@/utils/map-menus'
const route = useRoute()
const router = useRouter()
const userMenus = useLoginStore().userMenus
const mainStore = useMainStore()
const { navTabs } = mainStore


mainStore.addNavTabAction(...mapPathToTab(route.path, userMenus))

console.log(navTabs)
console.log('userMenus', userMenus)
console.log('useRoute', route)
console.log('useRouter', router)

function handleTagClick(item) {
  router.push(item.path)
}

function handleTagClose(item) {
  mainStore.removeNavTabAction(item.path)
}

</script>

<style lang="scss" scoped>
.header-tabs {
  .tag-item {
    color: #262824;
    font-weight: 700;
    margin-right: 6px;
    cursor: pointer;
  }
}

.tabs-active {}
</style>
