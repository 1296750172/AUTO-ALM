/*
 * @Author: happain
 * @Date: 2022-10-04 03:44:24
 * @LastEditors: happain
 * @LastEditTime: 2022-10-06 21:53:08
 * @Description:
 */
import http from "@/utils/request"

export default {
	query: {
		url: '/api/alm/permission/query',
		name: "查询权限列表",
		post: async function (data = {}) {
			return await http.post(this.url, data);
		}
	},
	add: {
		url: '/api/alm/permission/add',
		name: "添加权限",
		post: async function (data = {}) {
			return await http.post(this.url, data);
		}
	},
	upd: {
		url: '/api/alm/permission/upd',
		name: "更新权限",
		post: async function (data = {}) {
			return await http.post(this.url, data);
		}
	},
	del: {
		url: '/api/alm/permission/del',
		name: "删除权限",
		post: async function (data = {}) {
			return await http.post(this.url, data);
		}
	},

}
