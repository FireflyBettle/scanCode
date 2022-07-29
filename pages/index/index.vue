<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
		<button class="one" open-type="getPhoneNumber" @getphonenumber="getphone">一键获取</button>
	</view>
</template>

<script>
	import * as request from '@/api/api.js';
	export default {
		data() {
			return {
				title: 'Hello'
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
			        request.login(params, false).then((res) => {
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
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
