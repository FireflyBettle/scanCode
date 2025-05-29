<!--
 * @Author: chenyourong
 * @Date: 2025-05-28 16:25:26
 * @LastEditors: chenyourong
 * @LastEditTime: 2025-05-29 15:36:43
 * @Description: 
 * @FilePath: /scanCode/pages/enter/enter.vue
-->
<template>
  <div class="entering">
    <div class="title">优惠券</div>
    <div class="input">
      <view class="input-item">
        <input v-model="couponCode" placeholder="请输入优惠券码" />
      </view>
    </div>
    <div class="button" @click="submit">确认</div>
  </div>
</template>

<script>
import * as request from "@/api/api.js";
export default {
  data() {
    return {
      couponCode: "",
    };
  },
  onLoad(options) {
    this.couponCode = options.couponCode;
  },
  methods: {
    submit() {
      if (!this.couponCode) {
        return uni.showToast({
          title: "请输入优惠券码",
          icon: "error",
        });
      }
      uni.navigateTo({
        url: `/pages/status/status?operate=true&couponCode=${this.couponCode}`,
      });
    },
  },
};
</script>

<style lang='scss' scoped>
.entering {
  display: flex;
  justify-content: center;
  flex-direction: column;
  border-top-left-radius: 24rpx;
  border-top-right-radius: 24rpx;
  background: #fff;
  padding: 32rpx 48rpx;
  .title {
    font-family: PingFang SC;
    font-weight: 600;
    font-size: 40rpx;
  }
  .input {
    margin: 80rpx 0 40rpx;
    font-family: Inter;
    font-weight: 400;
    font-size: 28rpx;
    .input-item {
      border: 2rpx solid rgba(228, 228, 231, 1);
      border-radius: 32rpx;
      height: 96rpx;
      line-height: 96rpx;
      input {
        height: 96rpx;
        line-height: 96rpx;
        padding-left: 24rpx;
      }
    }
  }
  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 92rpx;
    border-radius: 32rpx;
    background: rgba(0, 111, 238, 1);
    color: #fff;
    font-size: 28rpx;
  }
}
</style>