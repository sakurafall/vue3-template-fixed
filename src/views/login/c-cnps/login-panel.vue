<template>
  <div class="login-panel">
    <!-- 顶部标题 -->
    <h1 class="title">金卫软件 · 互联网后台</h1>

    <!-- 中间的tabs切换 -->
    <div class="tabs">
      <!-- 1. 账号登录的Pane -->
      <el-tabs v-model="actionName" type="border-card" stretch>
        <el-tab-pane label="账号登录" name="account">
          <template #label>
            <div class="label">
              <el-icon>
                <Avatar />
              </el-icon>
              <span class="text">账号登录</span>
            </div>
          </template>
          <pane-account ref="accountRef" />
        </el-tab-pane>

        <!-- 2. 手机登录的Pane -->
        <el-tab-pane label="手机登录" name="phone">
          <template #label>
            <div class="label">
              <el-icon>
                <Iphone />
              </el-icon>
              <span class="text">手机登录</span>
            </div>
          </template>
          <pane-phone />
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 底部区域 -->
    <div class="control">
      <el-checkbox v-model="isRemPwd" label=" 记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button class="login-btn" type="primary" size="large" @click="handleLoginBtnClick">
      登录
    </el-button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import PaneAccount from './pane-account.vue'
import PanePhone from './pane-phone.vue'
import { localCache } from '@/utils/cache'

const isRemPwd = ref(localCache.getCache('isRemPwd') ?? false)
const actionName = ref('account')
const accountRef = ref()

// 保存记住密码的状态
watch(isRemPwd, (newValue) => {
  localCache.setCache('isRemPwd', newValue)
})

// 点击登录处理函数
function handleLoginBtnClick() {
  if (actionName.value === 'account') {
    accountRef.value?.loginAction(isRemPwd.value)
  } else {
    console.log('手机登录')
  }
}
</script>

<style lang="scss" scoped>
.login-panel {
  width: 330px;
  margin-bottom: 150px;

  .title {
    text-align: center;
    margin-bottom: 15px;
  }

  .label {
    display: flex;
    justify-content: center;
    align-items: center;

    .text {
      margin-left: 5px;
    }
  }

  .control {
    display: flex;
    justify-content: space-between;
    margin-top: 12px;
  }

  .login-btn {
    margin-top: 10px;
    width: 100%;
  }
}
</style>
