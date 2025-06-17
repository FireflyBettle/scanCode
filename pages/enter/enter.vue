<!--
 * @Author: chenyourong
 * @Date: 2025-05-28 16:25:26
 * @LastEditors: chenyourong
 * @LastEditTime: 2025-06-17 18:17:12
 * @Description: 
 * @FilePath: /scanCode/pages/enter/enter.vue
-->
<template>
  <div class="entering">
    <custom-navbar title="录入核销" />
    <scroll-view scroll-y class="scroll-view" :style="{ height: scrollHeight }">
      <div class="container">
        <div class="title">优惠券</div>
        <div class="input">
          <view class="input-item">
            <input v-model="couponCode" placeholder="请输入优惠券码" />
          </view>
        </div>
        <div class="button" @click="submit">确认</div>
      </div>
    </scroll-view>
    <Toast ref="toast" />
  </div>
</template>

<script>
import * as request from "@/api/api.js";
import Toast from "@/components/toast.vue";

export default {
  components: {
    Toast,
  },
  data() {
    return {
      couponCode: "",
      scrollHeight: 500, // 根据窗口动态计算更佳
      visible: false,
    };
  },
  onLoad(options) {
    this.couponCode = options.couponCode;
  },
  mounted() {
    this.calcScrollHeight();
    if (this.couponCode) {
      this.initData();
    }
  },
  methods: {
    calcScrollHeight() {
      const { windowHeight, statusBarHeight } = uni.getSystemInfoSync();
      this.scrollHeight = `calc(${windowHeight - statusBarHeight}px - 88rpx)`; // 减去导航栏高度
    },
    initData() {
      request
        .coupon({
          couponCode: this.couponCode,
          // couponCode: "252900000003",
        })
        .then((res) => {
          if (res.code !== 0) {
            return this.$refs.toast.show(res.msg);
          }
          uni.navigateTo({
            url: `/pages/status/status?operate=true&couponCode=${this.couponCode}`,
          });
        });
    },
    submit() {
      if (!this.couponCode) {
        return this.$refs.toast.show('请输入优惠券码');
        // return uni.showToast({
        //   title: "请输入优惠券码",
        //   icon: "none",
        // });
      }
      request
        .coupon({
          couponCode: this.couponCode,
          // couponCode: "252900000003",
        })
        .then((res) => {
          if (res.code !== 0) {
            return this.$refs.toast.show(res.msg);
          }
          uni.navigateTo({
            url: `/pages/status/status?operate=true&couponCode=${this.couponCode}`,
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
/* 通用方案 */
.uni-toast__content {
  font-size: 38px !important;
}
.container {
  position: relative;
  min-height: 800rpx;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  border-top-left-radius: 24rpx;
  border-top-right-radius: 24rpx;
  background: #fff;
  padding: 32rpx 48rpx;
  height: 600rpx;
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
