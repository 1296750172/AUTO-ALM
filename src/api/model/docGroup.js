/*
 * @Author: happain
 * @Date: 2022-10-04 03:44:24
 * @LastEditors: happain
 * @LastEditTime: 2022-10-16 21:04:54
 * @Description:
 */
import http from "@/utils/request"

export default {
	query: {
		url: '/api/alm/doc/group/cus/query',
		name: "查询文档组",
		post: async function (data = {}) {
			return await http.post(this.url, data);
		}
	},
	upd: {
		url: '/api/alm/doc/group/cus/upd',
		name: "更新",
		post: async function (data = {}) {
			return await http.post(this.url, data);
		}
	},
	add: {
		url: '/api/alm/doc/group/cus/add',
		name: "添加",
		post: async function (data = {}) {
			return await http.post(this.url, data);
		}
	},
	del: {
		url: '/api/alm/doc/group/cus/del',
		name: "删除",
		post: async function (data = {}) {
			return await http.post(this.url, data);
		}
	}

}
