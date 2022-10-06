/*
 * @Author: happain
 * @Date: 2022-10-04 03:44:24
 * @LastEditors: happain
 * @LastEditTime: 2022-10-06 04:41:33
 * @Description:
 */
import http from "@/utils/request"

export default {
	tree: {
		url: '/api/alm/menu/tree',
		name: "查询菜单",
		post: async function (data = {}) {
			return await http.post(this.url, data);
		}
	},
	upd: {
		url: '/api/alm/menu/upd',
		name: "更新菜单",
		post: async function (data = {}) {
			return await http.post(this.url, data);
		}
	},
	add: {
		url: '/api/alm/menu/add',
		name: "添加菜单",
		post: async function (data = {}) {
			return await http.post(this.url, data);
		}
	},
	del: {
		url: '/api/alm/menu/del',
		name: "删除菜单",
		post: async function (data = {}) {
			return await http.post(this.url, data);
		}
	}

}
