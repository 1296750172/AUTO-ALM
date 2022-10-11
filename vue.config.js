/*
 * @Author: happain
 * @Date: 2022-09-10 03:53:33
 * @LastEditors: happain
 * @LastEditTime: 2022-10-07 02:36:50
 * @Description:
 */
const { defineConfig } = require('@vue/cli-service');
const AutoImport = require("unplugin-auto-import/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");
const IconsResolver = require('unplugin-icons/resolver')
// 打包压缩插件去除打印
const TerserPlugin = require("terser-webpack-plugin");


const initTerserPlugin = () => {
	if (process.env.NODE_ENV === 'production') {
		return new TerserPlugin({
			cache: true,
			sourceMap: false,
			// 多进程
			parallel: true,
			terserOptions: {
				ecma: undefined,
				warnings: false,
				parse: {},
				compress: {
					drop_console: true,
					drop_debugger: false,
					pure_funcs: ['console.log'], // 移除console
				},
			},
		})
	}
}

module.exports = defineConfig({
	//设置为空打包后不分更目录还是多级目录
	publicPath: '/',
	//build编译后存放静态文件的目录
	//assetsDir: "static",

	// build编译后不生成资源MAP文件
	productionSourceMap: process.env.NODE_ENV === 'production' ? false : true,

	//开发服务,build后的生产模式还需nginx代理
	devServer: {
		hot: true,
		open: false, //运行后自动打开浏览器
		port: process.env.VUE_APP_PORT, //挂载端口
		proxy: {
			'/api': {
				target: process.env.VUE_APP_API_BASEURL,
				ws: true,
				secure: process.env.NODE_ENV === 'production' ? true : false,
				changeOrigin: true,
				pathRewrite: {
					'^/api': '/'
				}
			},
			'/happain': {
				target: 'https://www.fastmock.site/mock/5039c4361c39a7e3252c5b55971f1bd3/api',
				changeOrigin: true,
				secure: process.env.NODE_ENV === 'production' ? true : false,
				ws: true,
				pathRewrite: {
					'^/happain': '/'
				}
			}
		}
	},
	// 默认es6语法编译
	// transpileDependencies: true,

	chainWebpack: config => {
		// 移除 prefetch 插件
		config.plugins.delete('preload');
		config.plugins.delete('prefetch');
		config.resolve.alias.set('vue-i18n', 'vue-i18n/dist/vue-i18n.cjs.js');
	},

	configureWebpack: () => {

		return {
			plugins: [
				AutoImport({
					imports: ['vue'],
					resolvers: [ElementPlusResolver(), IconsResolver({
						prefix: 'Icon',
					}),],
					// eslint报错解决
					eslintrc: {
						enabled: false, // Default `false`
						filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
						globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
					},
				}),
				new TerserPlugin({
					cache: true,
					sourceMap: false,
					// 多进程
					parallel: true,
					terserOptions: {
						ecma: undefined,
						warnings: false,
						parse: {},
						compress: {
							drop_console: true,
							drop_debugger: false,
							pure_funcs: ['console.log'], // 移除console
						},
					},
				})
			],
			//性能提示
			performance: {
				hints: false
			},
			optimization: {
				splitChunks: {
					chunks: "all",
					automaticNameDelimiter: '~',
					name: "scuiChunks",
					cacheGroups: {
						//第三方库抽离
						vendor: {
							name: "modules",
							test: /[\\/]node_modules[\\/]/,
							priority: -10
						},
						elicons: {
							name: "elicons",
							test: /[\\/]node_modules[\\/]@element-plus[\\/]icons-vue[\\/]/
						},
						tinymce: {
							name: "tinymce",
							test: /[\\/]node_modules[\\/]tinymce[\\/]/
						},
						echarts: {
							name: "echarts",
							test: /[\\/]node_modules[\\/]echarts[\\/]/
						},
						xgplayer: {
							name: "xgplayer",
							test: /[\\/]node_modules[\\/]xgplayer.*[\\/]/
						},
						codemirror: {
							name: "codemirror",
							test: /[\\/]node_modules[\\/]codemirror[\\/]/
						}
					}
				}
			}
		}
	}
})
