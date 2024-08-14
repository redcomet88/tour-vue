import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/styles/global.css'; // 引入全局样式覆盖文件
import router from './router'
import MessagePlugin from './plugins/message'; // 引入插件

import ECharts from 'vue-echarts';
import 'echarts';
Vue.component('v-chart', ECharts);

Vue.use(ElementUI)
Vue.use(MessagePlugin); // 使用插件

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
