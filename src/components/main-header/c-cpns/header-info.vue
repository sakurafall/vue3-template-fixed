<template>
  <div class="header-info">
    <!-- 1. 操作小图标 -->
    <div class="operation">
      <span>
        <el-icon>
          <Bell />
        </el-icon>
      </span>
      <span>
        <span class="dot"></span>
        <el-icon>
          <ChatLineRound />
        </el-icon>
      </span>
      <span>
        <el-icon>
          <Postcard />
        </el-icon>
      </span>
    </div>

    <!-- 2. 个人信息 -->
    <div class="info">
      <el-avatar :size="30" :src="avatarUrl" />
      <el-dropdown>
        <span class="user-info">
          <span class="name">{{ userInfo.name }}</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <el-icon>
                <InfoFilled />
              </el-icon>
              <span>个人信息</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <el-icon>
                <Unlock />
              </el-icon>
              <span>修改密码</span>
            </el-dropdown-item>
            <el-dropdown-item divided @click="handleExitClick">
              <el-icon>
                <SwitchButton />
              </el-icon>
              <span>退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constant'
import useLoginStore from '@/stores/login/login'

const loginStore = useLoginStore()
const { userInfo } = loginStore
const avatarUrl =
  'https://gd-hbimg.huaban.com/c046f4f7f9bf38d2b93ab146138126142e8d14931e930-adLhbn_fw236'

// 退出登录逻辑
const router = useRouter()
const handleExitClick = () => {
  // 1. 清除登录token
  localCache.removeCache(LOGIN_TOKEN)

  // 2. 跳转到登录页
  router.push('/login')
}
</script>

<style lang="scss" scoped>
.header-info {
  display: flex;
  align-items: center;
}

.operation {
  display: inline-flex;
  margin-right: 20px;

  span {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 35px;

    &:hover {
      background: #f2f2f2;
    }

    i {
      font-size: 20px;
    }

    .dot {
      position: absolute;
      top: 3px;
      right: 3px;
      z-index: 10;
      width: 6px;
      height: 6px;
      background: red;
      border-radius: 100%;
    }
  }
}

.user-info {
  display: flex;
  align-items: center;
  outline: none;
  cursor: pointer;

  .name {
    margin-left: 8px;
  }
}

.info {
  display: flex;
  align-items: center;

  :global(.el-dropdown-menu__item) {
    line-height: 36px !important;
    padding: 6px 22px;
  }
}
</style>
