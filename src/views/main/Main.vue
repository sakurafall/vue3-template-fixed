<template>
  <div class="main">
    <!-- TODO: 多种布局方式 -->
    <el-container class="main-content">
      <el-aside :width="isFold ? '60px' : '210px'">
        <main-menu :is-fold="isFold" />
      </el-aside>
      <el-container>
        <el-header height="88px">
          <main-header @fold-change="foldChange" />
        </el-header>
        <el-main>
          <router-view />
        </el-main>
        <!-- <el-footer>Footer</el-footer> -->
      </el-container>
    </el-container>

    <!-- <el-container>
      <el-header>Header</el-header>
      <el-main>Main</el-main>
      <el-footer>Footer</el-footer>
    </el-container> -->
  </div>
</template>

<script setup>
import { ref } from 'vue'
import MainMenu from '@/components/main-menu/main-menu.vue'
import MainHeader from '@/components/main-header/main-header.vue'

// 处理main-header中折叠的变化
const isFold = ref(false)
const foldChange = (fold) => {
  isFold.value = fold
}
</script>

<style lang="scss" scoped>
.main {
  height: 100%;
  // background-image: url(../../assets/img/weiqing.png);
  background-size: cover;
  background-position: center;
}

.main-content {
  height: 100%;

  .el-aside {
    overflow-x: hidden;
    overflow-y: auto;
    line-height: 200px;
    text-align: left;
    cursor: pointer;
    transition: width 0.3s linear;
    /* firefox */
    scrollbar-width: none;
    /* IE 10+ */
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .el-main {
    background: #f4f6f8;
  }

  .el-footer {
    color: #333;
    background: #c6e2ff;
  }
}
</style>
