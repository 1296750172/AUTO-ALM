/*
 * @Author: happain
 * @Date: 2022-09-10 03:53:36
 * @LastEditors: happain
 * @LastEditTime: 2022-09-20 23:37:43
 * @Description:
 */
// 静态路由配置
// 书写格式与动态路由格式一致，全部经由框架统一转换
// 比较动态路由在meta中多加入了role角色权限，为数组类型。一个菜单是否有权限显示，取决于它以及后代菜单是否有权限。
// routes 显示在左侧菜单中的路由(显示顺序在动态路由之前)
// 示例如下

// const routes = [
// 	{
// 		name: "demo",
// 		path: "/demo",
// 		meta: {
// 			icon: "el-icon-eleme-filled",
// 			title: "演示",
// 			role: ["SA"]
// 		},
// 		children: [{
// 			name: "demopage",
// 			path: "/demopage",
// 			component: "test/autocode/index",
// 			meta: {
// 				icon: "el-icon-menu",
// 				title: "演示页面",
// 				role: ["SA"]
// 			}
// 		}]
// 	}
// ]

const routes = [
	// 需求文档
	{
		name: "Need",
		path: "/needs",
		meta: {
			title: "需求管理",
			icon: "el-icon-document",
			// role: ["SA"]
		},
		children: [

			{
				name: "Need",
				path: "/need",
				meta: {
					icon: "el-icon-List",
					title: "需求文档",
					// role: ["SA"]
				},
				component: 'needs/need'
			},
		],
	}
]

export default routes;
