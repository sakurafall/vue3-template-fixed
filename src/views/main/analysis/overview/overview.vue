<template>
  <div class="overview">
    <h4>核心技术</h4>
    <div v-for="(item, index) in listCore" :key="index">
      <h5>· {{ item }}</h5>
    </div>

    <h4>系统支持</h4>
    <div v-for="(item, index) in listSupport" :key="index">
      <h5>· {{ item }}</h5>
    </div>

    <h4>TODO</h4>
    <div v-for="(item, index) in listTodo" :key="index">
      <h5>· {{ item }}</h5>
    </div>
  </div>
</template>

<script setup>
const listCore = ['vue3 前端框架', 'router 路由管理', 'pinia 状态管理', 'vite 构建工具', 'axios 网络请求', 'sass CSS预处理', 'Element-Plus UI组件库', 'normalize.css 默认css样式', 'day.js 日期格式化', 'eslint 代码检验', 'prettier 代码格式化',]
const listSupport = ['登录退出', '动态路由', '权限管理', '请求封装']
const listTodo = ['个性化主题', '暗黑色模式', '历史标签页']
</script>

<style lang="scss" scoped></style>
