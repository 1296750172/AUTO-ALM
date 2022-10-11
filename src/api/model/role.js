/*
 * @Author: happain
 * @Date: 2022-10-04 03:44:24
 * @LastEditors: happain
 * @LastEditTime: 2022-10-10 01:54:01
 * @Description:
 */
import http from "@/utils/request"

export default {
	query: {
		url: '/api/alm/role/query',
		name: "查询角色列表",
		post: async function (data = {}) {
			return await http.post(this.url, data);
		}
	},
	add: {
		url: '/api/alm/role/add',
		name: "添加角色",
		post: async function (data = {}) {
			return await http.post(this.url, data);
		}
	},
	upd: {
		url: '/api/alm/role/upd',
		name: "更新角色",
		post: async function (data = {}) {
			return await http.post(this.url, data);
		}
	},
	del: {
		url: '/api/alm/role/del',
		name: "删除角色",
		post: async function (data = {}) {
			return await http.post(this.url, data);
		}
	},

}
