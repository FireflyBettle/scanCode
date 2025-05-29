/*
 * @Author: chenyourong
 * @Date: 2025-05-27 16:49:16
 * @LastEditors: chenyourong
 * @LastEditTime: 2025-05-29 10:57:12
 * @Description: 
 * @FilePath: /scanCode/api/api.js
 */
import {service} from './request.js'//request向外暴露的方法

export function login(data) {
  //传入对应的配置对象
  return service({
    url: '/miniprogram/login',
    data: {
      ...data
    }//请求接口需要的参数
  })
}
// 门店详情
export function storeDetail(data) {
  //传入对应的配置对象
  return service({
    url: '/miniprogram/store/detail',
    data: {
      ...data
    }//请求接口需要的参数
  })
}
//核销记录列表
export function list(data) {
  //传入对应的配置对象
  return service({
    url: '/miniprogram/list',
    data: {
      ...data
    }//请求接口需要的参数
  })
}
// 券码详情
export function coupon(data) {
  //传入对应的配置对象
  return service({
    url: '/miniprogram/coupon/detail',
    data: {
      ...data
    }//请求接口需要的参数
  })
}
// 券码核销
export function verify(data) {
  //传入对应的配置对象
  return service({
    url: '/miniprogram/coupon/verify',
    data: {
      ...data
    }//请求接口需要的参数
  })
}
