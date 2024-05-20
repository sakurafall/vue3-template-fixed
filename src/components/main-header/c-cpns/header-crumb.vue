<template>
  <div class="header-crumb">
    <el-breadcrumb separator-icon="ArrowRight">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import useLoginStore from '@/stores/login/login'
import { mapPathToBreadcrumb } from '@/utils/map-menus'
const route = useRoute()
const userMenus = useLoginStore().userMenus

const breadcrumbs = computed(() => {
  return mapPathToBreadcrumb(route.path, userMenus)
})
</script>

<style lang="scss" scoped>
.header-crumb {
  display: flex;
  align-items: center;
  height: 100%;
}
</style>
