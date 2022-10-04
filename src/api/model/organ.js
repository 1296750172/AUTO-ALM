/*
 * @Author: happain
 * @Date: 2022-10-04 03:44:24
 * @LastEditors: happain
 * @LastEditTime: 2022-10-05 01:42:07
 * @Description:
 */
import http from "@/utils/request"

export default {
	add: {
		url: '/api/alm/org/add',
		name: "添加组织",
		post: async function (data = {}) {
			return await http.post(this.url, data);
		}
	},
	del: {
		url: '/api/alm/org/del',
		name: "删除组织",
		post: async function (data = {}) {
			return await http.post(this.url, data);
		}
	}

}
