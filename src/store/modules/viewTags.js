/*
 * @Author: happain
 * @Date: 2022-09-10 03:53:36
 * @LastEditors: happain
 * @LastEditTime: 2022-10-17 23:17:29
 * @Description:
 */
import router from '@/router'

export default {
	state: {
		viewTags: []
	},
	mutations: {
		pushViewTags(state, route) {
			let backPathIndex = state.viewTags.findIndex(item => item.fullPath == router.options.history.state.back)
			let target = state.viewTags.find((item) => item.fullPath === route.fullPath)
			let isName = route.name
			if (!target && isName) {
				if (backPathIndex == -1) {
					state.viewTags.push(route)
				} else {
					state.viewTags.splice(backPathIndex + 1, 0, route)
				}
			}
		},
		removeViewTags(state, route) {
			state.viewTags.forEach((item, index) => {
				if (item.fullPath === route.fullPath) {
					state.viewTags.splice(index, 1)
				}
			})
		},
		updateViewTags(state, route) {
			state.viewTags.forEach((item) => {
				if (item.fullPath == route.fullPath) {
					item = Object.assign(item, route)
				}
			})
		},
		updateViewTagsTitle(state, title = '') {
			const nowFullPath = location.pathname
			state.viewTags.forEach((item) => {
				if (item.fullPath == nowFullPath) {
					item.meta.title = title
				}
			})
		},
		clearViewTags(state) {
			state.viewTags = []
		}
	}
}
