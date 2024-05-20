<template>
  <div class="pane-account">
    <el-form ref="ruleFormRef" :model="account" :rules="accountRules" label-width="60px" size="large">
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import useLoginStore from '@/stores/login/login'
import { localCache } from '@/utils/cache'

// 定义公用常量
const CACHE_NAME = 'name'
const CACHE_PASSWORD = 'password'

// 1. 定义account数据
const account = reactive({
  name: localCache.getCache(CACHE_NAME) ?? '',
  password: localCache.getCache(CACHE_PASSWORD) ?? ''
})

// 2. 定义校验规则
const accountRules = reactive({
  name: [
    {
      required: true,
      message: '请输入账号',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{6,20}$/,
      message: '长度在 6 到 16 个字符',
      trigger: 'change'
    }
  ],
  password: [
    {
      required: true,
      message: '请输入密码',
      trigger: 'blur'
    }
  ]
})

// 3. 执行账号的登录逻辑
const ruleFormRef = ref()
const loginStore = useLoginStore()
function loginAction(isRemPwd) {
  ruleFormRef.value?.validate((valid) => {
    if (valid) {
      // 1. 获取用户输入的账号和密码
      const name = account.name
      const password = account.password

      // 2. 向服务器发送网络请求(携带账号和密码)
      loginStore.loginAccountAction({ name, password }).then(() => {
        // 3. 判断是否需要记住密码
        if (isRemPwd) {
          localCache.setCache(CACHE_NAME, name)
          localCache.setCache(CACHE_PASSWORD, password)
        } else {
          localCache.removeCache(CACHE_NAME)
          localCache.removeCache(CACHE_PASSWORD)
        }
      })
    } else {
      console.log('error submit!!')
      ElMessage.error('Oops, this is a error message.')
      return false
    }
  })
}

defineExpose({
  loginAction
})
</script>

<style lang="scss" scoped>
.pane-account {}
</style>
