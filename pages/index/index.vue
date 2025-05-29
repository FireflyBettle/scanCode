<!--
 * @Author: chenyourong
 * @Date: 2025-05-27 16:50:32
 * @LastEditors: chenyourong
 * @LastEditTime: 2025-05-29 17:58:14
 * @Description: 
 * @FilePath: /scanCode/pages/index/index.vue
-->
<template>
  <div class="login">
    <view class="custom-nav-bar">
         <text class="back-button" @click="goBack">返回</text>
         <text class="title">标题</text>
         <!-- 这里可以添加其他导航栏元素 -->
       </view>
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
        <!-- <label>账号：</label>  -->
        <input v-model="phone" type="number" placeholder="请输入账号" /> 
      </view> 
      <!-- 密码输入框 --> 
      <view class="input-item"> 
        <!-- <label>密码：</label>  -->
        <input v-model="passwd" type="password" placeholder="请输入密码" /> 
      </view> 
      <!-- 登录按钮 --> 
      <button form-type="submit">登录</button> 
    </form> 
  </view> 
  </div>
</template>

<script>
import * as request from "@/api/api.js";
import md5 from '@/utils/md5.js'
// console.log("🚀 ~ md5:", md5.hex_md5(1))
export default {
  data() {
    return {
      phone: "",
      passwd: "",
      code: "",
    };
  },
  created() {},
  onLoad() {
    uni.login({
      provider: "weixin", // 使用微信登录
      success: (res) => {
        this.code = res.code;
        console.log(" 获取code:", res.code); // 获取临时登录凭证
        // 发送code到后端换取openid/token
        // uni.request({
        //   url: 'https://your-api.com/login',
        //   method: 'POST',
        //   data: { code: res.code  },
        //   success: (apiRes) => {
        //     uni.setStorageSync('token',  apiRes.data.token)  // 存储token
        //     uni.showToast({  title: '登录成功' })
        //   }
        // })
      },
      fail: (err) => {
        console.error(" 登录失败:", err);
        uni.showToast({ title: "登录失败", icon: "none" });
      },
    });
  },
  methods: {
    onSubmit() {
      // 简单的表单验证
      if (!this.phone || !this.passwd) {
        uni.showToast({
          title: "账号和密码不能为空",
          icon: "none",
        });
        return;
      }

      request
        .login({
          code: this.code,
          phone: this.phone,
          passwd: md5.hex_md5(md5.hex_md5(this.passwd)),
        })
        .then((res) => {
          const { data, code } = res;
          if (code === 0) {
            uni.setStorageSync('token', data.token);
            uni.showToast({
              title: "登录成功",
              icon: "success",
            });
            // uni.setTimeout
            setTimeout(() => {
              uni.navigateTo({
                url: "/pages/main/main",
              });
            }, 1500);
          }
        });
    },
  },
};
</script> 

<style lang='scss' scoped>
@import "/static/css/common.css";
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
    font-size: 28rpx;
  }
  .title {
    font-size: 40rpx;
    text-align: left;
    margin-bottom: 40rpx;
  }
  .input-item {
    width: 654rpx;
    margin-bottom: 40rpx;
    input {
      width: 614rpx !important;
    }
  }
  .input-item label {
    display: block;
    margin-bottom: 10rpx;
  }
  .input-item input {
    width: 100%;
    padding: 20rpx;
    border: 2rpx solid #ccc;
    border-radius: 10rpx;
  }
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 654rpx;
    height: 92rpx;
    gap: 16rpx;
    padding-right: 32rpx;
    padding-left: 32rpx;
    border-radius: 32rpx;
    background: #006fee;
    margin: 0;
    color: #fff;
    font-size: 28rpx;
    cursor: pointer;
  }
}
</style>