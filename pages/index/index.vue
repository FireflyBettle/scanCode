<template>
	<view class="index-container">
		<view class="tab_nav">
			<view class="navTitle" v-for="(item,index) in navList" :key="index" >
				<view class="nav-item" :class="{'active':isActive === index}" @click="checked(index)">
					{{item.title}}
				</view>
			</view>
		</view>
		<view class="nav_item" v-if="isActive==0">
			<view class="content-container">
				<!-- 轮播图 -->
					<view class="swiper-container">
						<uni-swiper-dot class="uni-swiper-dot-box" @clickItem=clickItem :info="info" :current="current" :mode="mode"
							:dots-styles="dotsStyles" field="content">
							<swiper class="swiper-box" @change="change" :current="swiperDotIndex" autoplay="true">
								<swiper-item v-for="(item, index) in info" :key="index">
									<image class="image-item" :src="item.url" mode="widthFix"></image>
									<!-- <view class="swiper-item" :class="'swiper-item' + index"> -->
										<!-- <text style="color: #fff; font-size: 32px;">{{index+1}}</text> -->
									<!-- </view> -->
								</swiper-item>
							</swiper>
						</uni-swiper-dot>
					</view>
					<!-- 简介 -->
					<view class="info-container">
						<text>
							鼎尚私人会所是一家集餐饮、商务会谈、茶室于一体的高端商务会所。别墅拥有三层213.88平方建筑面积，曲径通幽、私密天然、宁静和谐，装修风格古色古香的中式格调，让人身心宁静舒适。
						</text>
					</view>
			</view>
		</view>
		<view class="nav_item" v-if="isActive==1">
			1
		</view>
		<view class="nav_item" v-if="isActive==2">
			2
		</view>
		<button class="one" open-type="getPhoneNumber" @getphonenumber="getphone">一键获取</button>
	</view>
</template>

<script>
	import * as request from '@/api/api.js';
	export default {
		options: {
		    styleIsolation: 'shared', //
		  },
		data() {
			return {
				isActive: 0,
				navList:[
					{
						index: 0,
						title: '会所介绍'
					},{
						index: 1,
						title: "用餐服务"
					},{
						index: 2,
						title: "饮茶服务"
					}
				],
				info: [
					{
						url: 'https://images.jyblife.com/boxes/image610893552128-banner.png'
					},
					{
						url: 'https://images.jyblife.com/boxes/image610893552128-banner.png'
					},
					{
						url: 'https://images.jyblife.com/boxes/image610893552128-banner.png'
					}
				],
				current: 0,
				mode: 'default',
				dotsStyles: {},
				swiperDotIndex: 0
			}
		},
		onLoad() {
			this.wxLogin();
		},
		methods: {
			//登录---目的拿到code
			wxLogin () {
			  let _this = this
			  // 获取登录用户code
			  uni.login({
			    provider: 'weixin',
			    success: function (res) {
			      //console.log(res);
			      if (res.code) {
							console.log(res)
			        //将用户登录code传递到后台置换用户SessionKey、OpenId等信息 可参照此篇文章： https://ask.dcloud.net.cn/article/37452
			        // 1.拿code调后端接口1 也就是getOpenid() 换取到SessionKey、OpenId(这个是唯一且固定不变)
			        // 2.拿openId 调后端自己写的登录接口2  获取到cookie等信息 （这个cookie后期请求放在请求头上的） 登陆成功进行存储和跳转页面

			        // 这是我们的后端接口1--换取到SessionKey、OpenId
			        let params = { login_code: res.code}
			        request.login(params).then((res) => {
			          console.log('拿code调后端接口1 换取到SessionKey、OpenId', res)
			          // uni.setStorageSync('session_key', res.data.session_key)
			          // uni.setStorageSync('openid', res.data.openid)
			        })
			      } else {
			        uni.showToast({ title: '获取logon_code失败', duration: 2000 })
			        console.log('获取logon_code失败' + res.errMsg)
			        _this.wxLogin()
			      }
			    },
			    fail: (res) => {
			      uni.showToast({ title: '获取logon_code失败', duration: 2000 })
			      console.log('获取logon_code失败' + res.errMsg)
			      _this.wxLogin()
			    }
			  })
			},
			checked(index) {
				this.isActive = index
			},
			change(e) {
				this.current = e.detail.current
			},
			selectStyle(index) {
				this.dotsStyles = this.dotStyle[index]
				this.styleIndex = index
			},
			selectMode(mode, index) {
				this.mode = mode
				this.modeIndex = index
				this.styleIndex = -1
				this.dotsStyles = this.dotStyle[0]
			},
			clickItem(e) {
				this.swiperDotIndex = e
			},
			onBanner(index) {
				console.log(22222, index);
			}
		},
	}
</script>

<style lang="scss" scoped>

	.index-container {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-top: 34rpx;

		.tab_nav  .navTitle {
			width: 33.3%;
			text-align: center;
			font-size: 32rpx;
			font-family: Alibaba PuHuiTi;
			color: #333;

			.nav-item {
				font-family: PingFangSC;
				font-size:32rpx;
				font-weight: 600;
				line-height: 1.31;
				color: #9c6034;
			}
		}
		.tab_nav{
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			padding-bottom: 24rpx;
		}
		.navTitle {
			// width: 128rpx;
		}

		.active {
			position: relative;
			color: #1F75FE;
		}
		.active::after {
			content: "";
			position: absolute;
			left: 0px;
			right: 0px;
			bottom: -10rpx;
			margin: auto;

			width: 40rpx;
			height: 6rpx;
			border-radius: 4rpx;
			background-color: #9c6034;
		}

		.content-container {
			padding: 0 .33rpx;
			.swiper-container {
				.swiper-box {
					width: 686rpx;
					height: 300rpx;
					border-radius: 9rpx;
					overflow: hidden;
				}

				.swiper-item {
					/* #ifndef APP-NVUE */
					display: flex;
					/* #endif */
					flex-direction: column;
					justify-content: center;
					align-items: center;
					width: 686rpx;
					height: 300rpx!important;
					color: #fff;
					border-radius: 10px;
					overflow: hidden;
				}
				.active {
					border-style: solid;
					border-color: #007aff;
					border-width: 1px;
				}
				/deep/ .uni-swiper__warp {
					flex-direction: row;
					justify-content: center;
				}
			}
			.info-container {
				padding: 0 33rpx;
				margin-top: 24rpx;
				color: #333333;
				font-size: 28rpx;
				font-family: 'PingFang SC';
				text-align: justify;
			}
		}
	}



</style>
