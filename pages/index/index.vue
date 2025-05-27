<!--
 * @Author: chenyourong
 * @Date: 2025-05-27 16:50:32
 * @LastEditors: chenyourong
 * @LastEditTime: 2025-05-27 17:48:02
 * @Description: 
 * @FilePath: /scanCode/pages/index/index.vue
-->
<template>
  <div class="login">
    <div class="header">
      <image src="../../static/header.png" mode="aspectFit"  alt="">
    </div>
    <view class="container"> 
    <!-- 页面标题 --> 
    <view class="title">账号登录</view> 
    <!-- 表单部分 --> 
    <form @submit="onSubmit"> 
      <!-- 账号输入框 --> 
      <view class="input-item"> 
        <label>账号：</label> 
        <input v-model="account" placeholder="请输入账号" /> 
      </view> 
      <!-- 密码输入框 --> 
      <view class="input-item"> 
        <label>密码：</label> 
        <input v-model="password" type="password" placeholder="请输入密码" /> 
      </view> 
      <!-- 登录按钮 --> 
      <button form-type="submit">登录</button> 
    </form> 
  </view> 
  </div>
</template>

<script>
export default {
  data() {
    return {
      account: "",
      password: "",
    };
  },
  methods: {
    onSubmit() {
      // 简单的表单验证
      if (!this.account || !this.password) {
        uni.showToast({
          title: "账号和密码不能为空",
          icon: "none",
        });
        return;
      }
      // 模拟登录请求，实际开发中需要替换为真实的接口调用
      setTimeout(() => {
        uni.showToast({
          title: "登录成功",
          icon: "success",
        });
        // 登录成功后可以进行页面跳转等操作
        // uni.navigateTo({
        //   url: '/pages/home/home'
        // });
      }, 1000);
    },
  },
};
</script> 

<style lang='scss' scoped>
.login {
  .header {
    width: 750rpx;
    background: #1b6fe3;
    image {
      width: 750rpx;
    }
  }
  .container {
    width: 750rpx;
    padding: 32rpx 48rpx;
    border-top-left-radius: 24rpx;
    border-top-right-radius: 24rpx;
  }
  .title {
    font-size: 40rpx;
    text-align: left;
    margin-bottom: 20rpx;
  }
  .input-item {
    width: 654rpx;
    margin-bottom: 15px;
  }
  .input-item label {
    display: block;
    margin-bottom: 5px;
  }
  .input-item input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  button {
    width: 100%;
    padding: 10px;
    background-color: #007aff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
}
</style>