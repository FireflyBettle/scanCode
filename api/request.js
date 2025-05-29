/*
 * @Author: chenyourong
 * @Date: 2022-09-26 17:07:46
 * @LastEditors: chenyourong
 * @LastEditTime: 2025-05-29 15:55:03
 * @Description: 
 * @FilePath: /scanCode/api/request.js
 */
// let server_url = '';  //请求根路径（服务器地址）
let token = '';//token令牌
// process.env.NODE_ENV === 'development' ? 'http://192.168**:6002' : 'http://***/api'; //环境配置

import baseUrl from './config'

//向外暴露一个方法，传入一个空对象
export function service(options = {}) {
	uni.getStorageSync('token') && (token = uni.getStorageSync('token'));//从本地缓存中获取token
	// options.url = options.url ? `${baseUrl}${options.url}` : baseUrl;//前面为你的服务器地址，后面为具体接口地址
	options.url = options.url ? `${baseUrl}${options.url}` : 'https://sweb.jjdzmall.com';//前面为你的服务器地址，后面为具体接口地址
	// options.url = `https://sweb-sit.jjdzmall.com${options.url}`;//前面为你的服务器地址，后面为具体接口地址
	options.method = options.method || 'POST'
	//配置请求头
	options.header = {
		'content-type': 'application/json',//默认请求头，可不写
		'x-token': `${token}` //Bearer ，你请求数据需要的自定义请求头（令牌）
	};
	
	if (!options.noShowLoading) {
		uni.showLoading({
				title: "加载中",
				mask: true,
			});
	}
// 创建promise
	return new Promise((resolved, rejected) => {
		//成功
		options.success = (res) => {
      uni.hideLoading();
      if (res.data.code === 1003) {
        uni.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        })
        setTimeout(() => {
          uni.reLaunch({
            url: "/pages/index/index",
          });
        }, 1000);
      }
      if (res.data.code != 0) return uni.showToast({
        title: res.data.msg,
        icon: 'none',
        duration: 2000
      })
			// if (Number(res.data.code) == 0) { //请求成功
      resolved(res.data);//请求成功时返回接口数据
			// } else {
			// 	uni.showToast({
			// 		icon: 'none',
			// 		duration: 3000,
			// 		title: `${res.data.msg}`
			// 	});
			// 	rejected(res.data); //请求失败时返回错误信息
			// }

		}
		//错误
		options.fail = (err) => {
			uni.hideLoading();
			uni.showToast({
				title: '请求超时',
				icon: 'none',
				duration: 15000
			})
			rejected(err); //请求失败时返回错误信息
		}
		uni.request(options);//传入配置好的对象

	});
}