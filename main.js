/*
 * @Author: chenyourong
 * @Date: 2025-05-30 09:48:15
 * @LastEditors: chenyourong
 * @LastEditTime: 2025-06-17 18:05:21
 * @Description: 
 * @FilePath: /scanCode/main.js
 */
import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
// main.js  

Vue.config.productionTip = false
App.mpType = 'app'

import CustomNavbar from '@/components/custom-navbar.vue' 
import Toast from '@/components/toast.vue' 
Vue.component('custom-navbar',  CustomNavbar)
Vue.component('Toast',  Toast)


const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif