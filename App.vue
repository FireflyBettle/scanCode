<!--
 * @Author: chenyourong
 * @Date: 2025-05-30 09:48:15
 * @LastEditors: chenyourong
 * @LastEditTime: 2025-06-17 17:00:59
 * @Description: 
 * @FilePath: /scanCode/App.vue
-->
<script>
export default {
  onLaunch: function () {
    console.log("App Launch");
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

/*每个页面公共css */
	// 在App.vue 的style中添加全局样式 
	<style lang="scss">
.uni-page-head {
  background: url("/static/logo.png") no-repeat center !important;
  background-size: 100% auto !important;
  height: 180rpx !important; /* 根据图片比例调整 */
}
.uni-page-head__title {
  color: transparent !important; /* 隐藏原标题 */
}
</style>
