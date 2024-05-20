<template>
  <div class="pane-phone">
    <el-form label-width="60px" size="large">
      <el-form-item label="手机号" prop="name">
        <el-input />
      </el-form-item>
      <el-form-item label="验证码" prop="verify">
        <div class="verify-code">
          <el-input />
          <el-button class="get-btn" type="primary">验证码</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.pane-phone {
  .verify-code {
    display: flex;
  }

  .get-btn {
    margin-left: 10px;
    width: 80px;
  }
}
</style>
