/*
 * @Author: happain
 * @Date: 2022-09-10 03:53:35
 * @LastEditors: happain
 * @LastEditTime: 2022-10-05 05:43:11
 * @Description:
 */
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/display.css'
import scui from './scui'
import i18n from './locales'
import router from './router'
import store from './store'
import { createApp } from 'vue'
import App from './App.vue'
import 'animate.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 树形展示图
import vue3TreeOrg from 'vue3-tree-org';
import "vue3-tree-org/lib/vue3-tree-org.css";


const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component)
}
app.use(store);
app.use(vue3TreeOrg);
app.use(router);
app.use(ElementPlus);
app.use(i18n);
app.use(scui);

//挂载app
app.mount('#app');
