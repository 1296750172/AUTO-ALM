/*
 * @Author: happain
 * @Date: 2022-09-10 03:53:36
 * @LastEditors: happain
 * @LastEditTime: 2022-10-13 01:27:54
 * @Description:
 */
import store from '@/store'
import { nextTick } from 'vue'

export function beforeEach(to, from) {
	var adminMain = document.querySelector('#adminui-main')
	if (!adminMain) { return false }
	store.commit("updateViewTags", {
		fullPath: from.fullPath,
		scrollTop: adminMain.scrollTop
	})
}

export function afterEach(to) {
	var adminMain = document.querySelector('#adminui-main')
	if (!adminMain) { return false }
	nextTick(() => {
		var beforeRoute = store.state.viewTags.viewTags.filter(v => v.fullPath == to.fullPath)[0]
		if (beforeRoute) {
			adminMain.scrollTop = beforeRoute.scrollTop || 0
		}
	})
}
