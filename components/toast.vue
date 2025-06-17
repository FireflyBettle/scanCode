<!-- components/custom-toast/custom-toast.vue  -->
<template>
  <view v-if="visible" :class="['custom-toast', `custom-toast--${position}`, type]">
    <!-- <image v-if="icon" :src="icon" class="icon"></image> -->
    <text class="message">{{ message }}</text>
  </view>
</template>
 
<script>
export default {
  props: {
    duration: {
      type: Number,
      default: 2500
    },
    position: {
      type: String,
      default: 'center', // top/center/bottom 
      validator: value => ['top', 'center', 'bottom'].includes(value)
    },
    type: {
      type: String,
      default: 'default', // success/warning/error/loading 
      validator: value => ['default', 'success', 'warning', 'error', 'loading'].includes(value)
    }
  },
  data() {
    return {
      visible: false,
      message: '',
      icon: ''
    }
  },
  created() {
    // 根据类型设置图标 
    this.setIcon() 
  },
  methods: {
    show(message) {
      this.message  = message 
      this.visible  = true 
      this.setIcon() 
      
      if (this.duration  > 0) {
        this.timer  = setTimeout(() => {
          this.hide() 
        }, this.duration) 
      }
    },
    hide() {
      this.visible  = false 
      clearTimeout(this.timer) 
    },
    setIcon() {
      const icons = {
        // success: '/static/toast-success.png', 
        // warning: '/static/toast-warning.png', 
        // error: '/static/toast-error.png', 
        // loading: '/static/loading.gif' 
      }
      this.icon  = icons[this.type] || ''
    }
  }
}
</script>
 
<style scoped>
.custom-toast {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 20rpx 40rpx;
  border-radius: 16rpx;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 750rpx;
  /* box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.15); */
  animation: toast-fade 0.3s;
  text-align: justify;
}
 
.custom-toast--top {
  top: 20%;
}
 
.custom-toast--center {
  top: 50%;
  transform: translate(-50%, -50%);
}
 
.custom-toast--bottom {
  bottom: 20%;
}
 
.icon {
  width: 48rpx;
  height: 48rpx;
  margin-right: 16rpx;
}
 
.message {
  font-size: 34rpx;
  /* height: 50rpx; */
  line-height: 1.5;
  /* line-height: 1.5; */
}
 
/* 主题色 */
.success {
  background: #67C23A !important;
}
 
.warning {
  background: #E6A23C !important;
}
 
.error {
  background: #F56C6C !important;
}
 
@keyframes toast-fade {
  from { opacity: 0}
  to { opacity: 1}
}
</style>