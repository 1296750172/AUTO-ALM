/*
 * @Author: happain
 * @Date: 2022-09-10 03:53:35
 * @LastEditors: happain
 * @LastEditTime: 2022-10-03 20:13:44
 * @Description:
 */
import http from "@/utils/request"

export default {
	login: {
		url: '/api/alm/user/login',
		name: "登录获取TOKEN",
		post: async function (data = {}) {
			return await http.post(this.url, data);
		}
	},
	getUserInfo: {
		url: '/api/alm/user/getUserInfo',
		name: "获取用户信息",
		post: async function (data = {}) {
			return await http.post(this.url, data);
		}
	},
	getMenuByRole: {
		url: '/api/alm/menu/getMenu',
		name: "根据角色获取菜单信息",
		post: async function (data = {}) {
			return await http.post(this.url, data);
		}
	},

}
