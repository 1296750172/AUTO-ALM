/*
 * @Author: happain
 * @Date: 2022-09-10 03:53:35
 * @LastEditors: happain
 * @LastEditTime: 2022-09-17 19:40:17
 * @Description:
 */
import config from "@/config"
import http from "@/utils/request"

export default {
	token: {
		url: `${config.API_URL}/token`,
		name: "登录获取TOKEN",
		post: async function (data = {}) {
			return await http.post(this.url, data);
		}
	}
}
