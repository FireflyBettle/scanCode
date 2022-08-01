import {service} from './request.js'//request向外暴露的方法

export function login(data) {
//传入对应的配置对象
  return service({
    url: '',//接口地址
    method: 'POST',//请求方法
    data: {
			"cmd": "com.jyblife.base.mp-common-srv.IWxLogin",
			"mp_code":"3069f03c91f3e43f4c4bef48f120d657",
			...data
		}//请求接口需要的参数
  })
}
