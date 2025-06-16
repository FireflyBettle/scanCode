<!--
 * @Author: chenyourong
 * @Date: 2025-05-28 15:38:41
 * @LastEditors: chenyourong
 * @LastEditTime: 2025-05-30 17:58:49
 * @Description: 
 * @FilePath: /scanCode/pages/main/main.vue
-->
<template>
  <div class="home">
    <custom-navbar title="企福通" :showLogo="true" :showBack="false" />
    <scroll-view scroll-y class="scroll-view" :style="{ height: scrollHeight }">
      <div class="container">
        <div class="home-header">
          <div class="title">{{ name }}</div>
          <div class="loginOut" @click="loginOut">
            <img src="../../static/startContent.png" alt="" />
            <div>登出</div>
          </div>
        </div>
        <div class="home-amount">
          <div>
            <span>¥</span>
            {{ currAmount }}
          </div>
          <div class="des">今天核销金额</div>
        </div>
        <div class="home-picture">
          <img @click="jumpEntering" src="../../static/entering.png" alt="" />
          <img @click="scanCouponCode" src="../../static/scane.png" alt="" />
        </div>
        <div class="home-record">
          <div class="title">核销记录</div>
          <ul class="content">
            <li
              v-for="(item, index) in recordList"
              :key="index"
              @click="jumpStatusPage(item.couponCode)"
            >
              <div class="content-left">
                <div class="name">{{ item.couponName }}</div>
                <div class="time">{{ item.statusTime }}</div>
              </div>
              <div class="content-right">
                <div class="amount"><span>¥</span>{{ item.amount }}</div>
                <div class="status">{{ item.statusDes }}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </scroll-view>
  </div>
</template>

<script>
import * as request from "@/api/api.js";
export default {
  data() {
    return {
      couponCode: "",
      name: "",
      currAmount: "",
      recordList: [],
      scrollHeight: 500, // 根据窗口动态计算更佳
    };
  },
  created() {
    // if (!uni.getStorageSync("token")) {
    //   uni.reLaunch({
    //     url: "/pages/index/index",
    //   });
    // }
    this.getInitData();
  },
  mounted() {
    this.calcScrollHeight();
  },
  methods: {
    calcScrollHeight() {
      const { windowHeight, statusBarHeight } = uni.getSystemInfoSync();
      this.scrollHeight = `calc(${windowHeight - statusBarHeight}px - 88rpx)`; // 减去导航栏高度
    },
    getInitData() {
      request.storeDetail().then((res) => {
        const { data } = res;
        this.name = data.name;
        this.currAmount = data.currAmount / 100;
      });
      request
        .list({
          pageNum: 0,
          pageSize: 10,
        })
        .then((res) => {
          const { data } = res;
          const status = {
            0: "待核销",
            1: "已核销",
            2: "冲正",
          };
          data.list.forEach((val) => {
            val.amount = val.amount ? val.amount / 100 : 0;
            val.statusDes = status[val.status];
          });
          this.recordList = data.list;
        });
    },
    jumpEntering() {
      uni.navigateTo({
        url: "/pages/enter/enter",
      });
    },
    loginOut() {
      uni.removeStorageSync("token");
      uni.reLaunch({
        url: "/pages/index/index",
      });
    },
    jumpStatusPage(couponCode) {
      uni.navigateTo({
        url: `/pages/status/status?couponCode=${couponCode}`,
      });
    },
    scanCouponCode() {
      uni.scanCode({
        onlyFromCamera: false, // 是否只能从相机扫码，false 表示也可以从相册选取二维码
        scanType: ["barCode", "qrCode"], // 扫码类型，支持条形码和二维码
        success: (res) => {
          this.couponCode = res.result; // 将扫码结果赋值给 couponCode
          console.log(" 扫描成功，券码为: ", this.couponCode);
          request
          .coupon({
            couponCode: this.couponCode,
          })
          .then((res) => {
            uni.navigateTo({
              url: `/pages/status/status?operate=true&couponCode=${this.couponCode}`,
            });
          });
          // uni.navigateTo({
          //   // url: `/pages/status/status?operate=true&couponCode=${this.couponCode}`,
          //   url: `/pages/enter/enter?couponCode=${this.couponCode}`,
          // });
          // 这里可以添加后续处理逻辑，比如验证券码的有效性等
        },
        fail: (err) => {
          console.error(" 扫码失败: ", err);
          uni.showToast({
            title: "扫码失败，请重试",
            icon: "none",
          });
        },
      });
    },
  },
};
</script>

<style lang='scss' scoped>
.home {
  .scroll-view {
    .container {
      position: relative;
      min-height: 800rpx;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      border-top-left-radius: 24rpx;
      border-top-right-radius: 24rpx;
      background: #fff;
      padding: 32rpx 48rpx;
    }
  }
  &-header {
    display: flex;
    justify-content: space-between;
    width: 100%;
    .title {
      font-family: PingFang SC;
      font-size: 40rpx;
      font-weight: 600;
    }
    .loginOut {
      width: 160rpx;
      height: 64rpx;
      background: #e6f7ff;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 28rpx;
      border-radius: 24rpx;
      img {
        width: 40rpx;
        height: 40rpx;
      }
    }
  }
  &-amount {
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
  &-picture {
    display: flex;
    justify-content: space-between;
    img {
      width: 314rpx;
      height: 232rpx;
    }
    img:nth-child(1) {
      margin-right: 24rpx;
    }
  }
  &-record {
    width: 100%;
    margin-top: 80rpx;
    .title {
      font-family: PingFang SC;
      font-weight: 600;
      font-size: 36rpx;
      margin-bottom: 40rpx;
    }
    .content {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      li {
        display: flex;
        justify-content: space-between;
        margin-bottom: 40rpx;
        width: 100%;
        .content-left {
          display: flex;
          justify-content: center;
          flex-direction: column;
          .name {
            font-size: 32rpx;
            margin-bottom: 8rpx;
          }
          .time {
            font-size: 28rpx;
            color: rgba(0, 0, 0, 0.45);
          }
        }
        .content-right {
          .amount {
            font-family: PingFang SC;
            font-weight: 600;
            font-size: 32rpx;
            margin-bottom: 8rpx;
            text-align: right;
            span {
              text-align: right;
            }
          }
          .status {
            font-size: 28rpx;
            color: rgba(0, 0, 0, 0.45);
          }
        }
      }
    }
  }
}
</style>