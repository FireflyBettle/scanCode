import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
import NavBar from '@/components/lz-navBar/navBar.vue'
Vue.config.productionTip = false
App.mpType = 'app'

Vue.component("NavBar", NavBar);

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