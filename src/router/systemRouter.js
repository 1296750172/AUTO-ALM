/*
 * @Author: happain
 * @Date: 2022-09-10 03:53:36
 * @LastEditors: happain
 * @LastEditTime: 2022-09-19 22:19:24
 * @Description:
 */
import config from "@/config"


// 静态路由


//系统路由
const routes = [
	{
		name: "layout",
		path: "/",
		component: () => import(/* webpackChunkName: "layout" */ '@/layout'),
		redirect: config.DASHBOARD_URL || '/dashboard',
		children: []
	},
	{
		path: "/login",
		component: () => import(/* webpackChunkName: "login" */ '@/views/login'),
		meta: {
			title: "登录"
		}
	},
	{
		path: "/reset_password",
		component: () => import(/* webpackChunkName: "resetPassword" */ '@/views/login/resetPassword'),
		meta: {
			title: "重置密码"
		}
	}
]

export default routes;
