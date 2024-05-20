<template>
  <div class="main-header">
    <div class="header-top">
      <div class="menu-icon">
        <el-icon size="30px" @click="handleMenuIcon">
          <component :is="isFold ? 'Expand' : 'Fold'"></component>
        </el-icon>
      </div>
      <div class="content">
        <div class="breadcrumb">
          <header-crumb />
        </div>
        <div class="info">
          <header-info />
        </div>
      </div>
    </div>

    <div class="header-bottom">
      <header-tabs />
    </div>
  </div>


</template>

<script setup>
import { ref } from 'vue'
import HeaderCrumb from './c-cpns/header-crumb.vue'
import HeaderInfo from './c-cpns/header-info.vue'
import HeaderTabs from './c-cpns/header-tabs.vue'


// 0. 内部自定义事件
const emit = defineEmits(['foldChange'])
const isFold = ref(false)

// 1. 记录状态
const handleMenuIcon = () => {
  // 1. 内部改变状态
  isFold.value = !isFold.value
  // 2. 将事件和状态传递给父组件
  emit('foldChange', isFold.value)
}
</script>

<style lang="scss" scoped>
.main-header {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;
  height: 100%;
}

.header-top {
  display: flex;
  align-items: center;

  .menu-icon {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    flex: 1;
    padding: 0 18px;
  }
}

.header-bottom {
  display: flex;
  align-items: center;
  background: #ecf6ff;
  border-top: 1px solid #ccc;

  padding: 6px 0;

}
</style>
