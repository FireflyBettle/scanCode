<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{title}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {
			uni.login({ 
				provider: 'weixin', // 使用微信登录 
				success: (res) => {
				  console.log(' 获取code:', res.code);  // 获取临时登录凭证 
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
				  console.error(' 登录失败:', err);
				  uni.showToast({  title: '登录失败', icon: 'none' })
				}
			  })
		},
		methods: {

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
