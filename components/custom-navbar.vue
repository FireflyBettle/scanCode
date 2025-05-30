<!--
 * @Author: chenyourong
 * @Date: 2025-05-30 09:48:15
 * @LastEditors: chenyourong
 * @LastEditTime: 2025-05-30 15:58:35
 * @Description: 
 * @FilePath: /scanCode/components/custom-navbar.vue
-->
<template>
  <!-- <view class="navbar-container" :style="containerStyle"> -->
  <view class="navbar-container" :style="{ height: height }">
    <image
      :src="bgImage"
      class="bg-image"
      mode="widthFix"
      :style="{ opacity: bgOpacity }"
    />
    <!-- 标题区 -->
    <div class="tab" :style="{ top, height: barHeight + 'px' }">
      <!-- 返回按钮（条件渲染） -->
      <view v-if="showBack" @click="handleBack" class="back-btn">
        <image src="/static/arrow_left.png" mode="aspectFit" />
      </view>
      <view v-if="showLogo" class="logo">
        <image src="/static/logo.png" mode="widthFix" />
      </view>
      <text class="title" :style="{ color: titleColor }">{{ title }}</text>
    </div>
  </view>
</template>

<script>
export default {
  props: {
    title: String,
    bgImage: {
      type: String,
      default: "/static/bac.jpg",
    },
    titleColor: {
      type: String,
      default: "#FFFFFF",
    },
    showBack: {
      type: Boolean,
      default: true,
    },
    showLogo: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      height: 0,
      barHeight: 44, // 默认值
      top: 0,
    };
  },
  mounted() {
    // 获取系统信息
    const { statusBarHeight } = uni.getSystemInfoSync();
    this.top = statusBarHeight + "px";
    this.height = `calc(${statusBarHeight}px + 88rpx)`;
    const { top, height } = wx.getMenuButtonBoundingClientRect();
    // 自定义导航栏高度 = 胶囊高度 + 胶囊的padding*2, 如果获取不到设置为38
    this.barHeight = height ? height + (top - statusBarHeight) * 2 : 38;
  },
  methods: {
    handleBack() {
      uni.navigateBack();
    },
  },
};
</script>
<style lang="scss" scoped>
.navbar-container {
  width: 100%;
  .tab {
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 34rpx;
    .title {
      font-size: 34rpx;
    }
  }
  .bg-image {
    position: fixed;
  }
  image {
    width: 100%;
  }
}
.back-btn {
  display: flex;
  image {
    width: 18rpx;
    height: 34rpx;
    margin-right: 24rpx;
  }
}
.logo {
  display: flex;
  width: 110rpx;
  margin-right: 24rpx;
  image {
    width: 100%;
  }
}
</style>
