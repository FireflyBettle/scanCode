<template>
  <!-- <view class="navbar-container" :style="containerStyle"> -->
  <view class="navbar-container" :style='{ height: height }'>
    <image :src="bgImage" class="bg-image" mode="widthFix"  :style="{ opacity: bgOpacity }" />
    <!-- 标题区 -->
    <text class="title" :style="{ color: titleColor }">{{ title }}</text>
    <!-- 返回按钮（条件渲染） -->
    <view v-if="showBack" @click="handleBack" class="back-btn">
      <image src="/static/arrow_left.png" mode="aspectFit" />
    </view>
  </view>
</template>

<script>
export default {
  props: {
    title: String,
    bgImage: {
      type: String,
      default: "/static/bac.png",
    },
    titleColor: {
      type: String,
      default: "#FFFFFF",
    },
    showBack: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      height: 0
    };
  },
  computed: {
    containerStyle() {
      const { statusBarHeight } = uni.getSystemInfoSync();
      console.log(
        "🔍 ~ containerStyle ~ components/custom-navbar.vue:32 ~ statusBarHeight:",
        statusBarHeight
      );
      return {
        paddingTop: statusBarHeight + "px",
        height: `calc(${statusBarHeight}px + 88rpx)`,
      };
    },
  },
  mounted() {
    // 获取系统信息
    const { statusBarHeight } = uni.getSystemInfoSync();
    this.height = `calc(${statusBarHeight}px + 88rpx)`;
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
  .bg-image {
    position: fixed;
  }
  image {
    width: 100%;
  }
}
.back-btn {
  image {
    width: 18rpx;
    height: 34rpx;
  }
}
</style>
