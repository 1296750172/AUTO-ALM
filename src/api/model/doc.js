/*
 * @Author: happain
 * @Date: 2022-10-04 03:44:24
 * @LastEditors: happain
 * @LastEditTime: 2022-10-14 23:31:56
 * @Description:
 */
import http from "@/utils/request"

export default {
	query: {
		url: '/api/alm/doc/cus/query',
		name: "查询客户需求文档",
		post: async function (data = {}) {
			return await http.post(this.url, data);
		}
	},
	upd: {
		url: '/api/alm/doc/cus/upd',
		name: "更新",
		post: async function (data = {}) {
			return await http.post(this.url, data);
		}
	},
	add: {
		url: '/api/alm/doc/cus/add',
		name: "添加",
		post: async function (data = {}) {
			return await http.post(this.url, data);
		}
	},
	del: {
		url: '/api/alm/doc/cus/del',
		name: "删除",
		post: async function (data = {}) {
			return await http.post(this.url, data);
		}
	}

}
