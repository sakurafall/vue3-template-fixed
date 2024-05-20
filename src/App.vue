<template>
  <div class="app">
    <el-config-provider :locale="locale">
      <RouterView />
    </el-config-provider>
  </div>
</template>

<script setup>
// 1.  ConfigProvider 用于全局配置语言国际化
import zhCn from 'element-plus/es/locale/lang/zh-cn'

const locale = zhCn
</script>

<style scoped>
.app {
  width: 100vw;
  height: 100vh;
}
</style>
