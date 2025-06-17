<template>
  <div>
    <custom-navbar :title="title" />
    <scroll-view scroll-y class="scroll-view" :style="{ height: scrollHeight }">
      <div class="container">
        <template v-if="couponCode">
          <div class="status-title">{{ couponName }}</div>
          <div class="status-amount" :class="isGrayColor ? 'grayDes' : ''">
            <div>
              <span>¥</span>
              {{ amount }}
            </div>
            <div class="des">
              {{ statusDes }}
            </div>
          </div>
          <ul class="status-content">
            <li>
              <div class="name">当前状态</div>
              <div class="des">{{ statusDes }}</div>
            </li>
            <li v-if="!operate">
              <div class="name">核销时间</div>
              <div class="des">{{ checkTime }}</div>
            </li>
            <li v-if="!operate">
              <div class="name">流水号</div>
              <div class="des">{{ tx_no }}</div>
            </li>
            <li v-if="operate">
              <div class="name">过期时间</div>
              <div class="des">{{ expireTime }}</div>
            </li>
            <li>
              <div class="name">券码</div>
              <div class="des">{{ couponCode }}</div>
            </li>
            <li>
              <div class="name">商户名称</div>
              <div class="des">{{ merchantName }}</div>
            </li>
            <li>
              <div class="name">商户ID</div>
              <div class="des">{{ merchantId }}</div>
            </li>
            <li v-if="!operate">
              <div class="name">核销门店</div>
              <div class="des">{{ storeName }}</div>
            </li>
            <li v-if="!operate">
              <div class="name">门店ID</div>
              <div class="des">{{ storeId }}</div>
            </li>
          </ul>
          <template v-if="operate">
            <div v-if="status === 0" class="button sure" @click="verify">
              核销
            </div>
            <div v-if="status === 0" class="button gray canel" @click="cancel">
              取消
            </div>
            <div v-if="status === 1" class="button gray back" @click="back">
              <span style="margin-right: 7rpx">返回</span
              ><span v-if="time">({{ time }}) </span>
            </div>
          </template>
        </template>
      </div>
    </scroll-view>
    <Toast ref="toast" />
  </div>
</template>

<script>
import * as request from "@/api/api.js";
export default {
  data() {
    return {
      couponName: "",
      amount: "",
      expireTime: "",
      merchantName: "",
      merchantId: "",
      couponCode: "",
      checkTime: "",
      tx_no: "",
      storeName: "",
      storeId: "",
      status: "", // //状态，0-待核销，1-已核销，2-冲正
      statusDes: "",
      time: "",
      operate: false,
      scrollHeight: 500, // 根据窗口动态计算更佳
    };
  },
  computed: {
    isGrayColor() {
      return !this.operate && this.status === 1;
    },
  },
  onLoad(options) {
    this.operate = options.operate;
    this.couponCode = options.couponCode;
    this.getInitData(options.couponCode);
  },
  computed: {
    title() {
      if (!this.operate) return "核销记录";
      if (this.status === 2) return "核销结果";
      return "券码核销";
    },
    isGrayColor() {
      return !this.operate && this.status === 2;
    },
  },
  mounted() {
    // this.$refs.toast.show('年纪大凯撒年纪大凯撒')
    this.calcScrollHeight();
  },
  methods: {
    calcScrollHeight() {
      const { windowHeight, statusBarHeight } = uni.getSystemInfoSync();
      this.scrollHeight = `calc(${windowHeight - statusBarHeight}px - 88rpx)`; // 减去导航栏高度
    },
    getInitData(couponCode, success) {
      request
        .coupon({
          couponCode,
          // couponCode: "252900000003",
        })
        .then((res) => {
          // if (res.code !== 0) {
          //   return uni.showToast({
          //     title: res.msg,
          //     icon: "none",
          //     duration: 2000,
          //   });
          // }
          if (res.code !== 0) {
            return this.$refs.toast.show(res.msg);
          }
          const { data } = res;
          const statusObj = {
            0: "待核销",
            1: "已核销",
            2: "冲正",
            3: "已取消",
            4: "已过期",
          };
          this.couponName = data.couponName;
          this.expireTime = data.expireTime;
          this.checkTime = data.checkTime;
          this.tx_no = data.tx_no;
          this.storeName = data.storeName;
          this.storeId = data.storeId;
          this.merchantName = data.merchantName;
          this.merchantId = data.merchantId;
          this.couponCode = data.couponCode;
          this.status = +data.status;
          this.amount = data.amount / 100;
          this.statusDes = statusObj[+data.status];
          if (success) {
            return this.$refs.toast.show('核销成功');
            uni.showToast({
              title: "核销成功",
              icon: "success",
              duration: 3000,
            });
          }
        });
    },
    verify() {
      uni.showModal({
        title: "",
        content: "您确定核销吗？",
        confirmText: "确定",
        cancelText: "取消",
        success: (res) => {
          if (res.confirm) {
            request
              .verify({
                couponCode: this.couponCode,
              })
              .then((res) => {
                if (res.code !== 0) {
                  return this.$refs.toast.show(res.msg);
                }
                this.getInitData(this.couponCode, true);
                this.time = 5;
                const timer = setInterval(() => {
                  if (this.time === 0) {
                    clearInterval(timer);
                    uni.reLaunch({
                      url: `/pages/main/main`,
                    });
                  }
                  this.time--;
                }, 1000);
              });
            // 执行确认后的操作
          } else if (res.cancel) {
            console.log(" 用户点击取消");
            // 执行取消后的操作
          }
        },
      });
    },
    cancel() {
      uni.navigateBack();
      return;
    },
    back() {
      uni.reLaunch({
        url: `/pages/main/main`,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  min-height: 800rpx;
  display: flex;
  justify-content: center;
  flex-direction: column;
  border-top-left-radius: 24rpx;
  border-top-right-radius: 24rpx;
  background: #fff;
  padding: 32rpx 48rpx;
  .status-title {
    font-family: PingFang SC;
    font-size: 40rpx;
    font-weight: 600;
  }
  .status-amount {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 80rpx 0;
    font-size: 64rpx;
    font-weight: 600;
    span {
      position: relative;
      bottom: 4rpx;
      font-size: 32rpx;
      margin-right: 4rpx;
      font-weight: normal;
    }
    .des {
      font-size: 32rpx;
    }
  }
  .status-content {
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 80rpx;
    li {
      display: flex;
      justify-content: space-between;
      font-size: 28rpx;
      margin-bottom: 24rpx;
      .name {
        color: rgba(0, 0, 0, 0.45);
      }
      .des {
        color: rgba(0, 0, 0, 0.85);
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
    margin-bottom: 40rpx;
  }
  .gray {
    background: rgba(212, 212, 216, 0.4);
    color: rgba(0, 0, 0, 1);
  }
  .grayDes {
    color: rgba(0, 0, 0, 0.45);
  }
}
</style>
