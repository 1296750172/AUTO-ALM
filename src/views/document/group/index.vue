<!--
 * @Author: happain
 * @Date: 2022-09-19 23:30:21
 * @LastEditors: happain
 * @LastEditTime: 2022-10-15 02:31:07
 * @Description:
-->
<script setup>
import DocumentContent from "./components/documentContent.vue";
// const app = getCurrentInstance().appContext.config.globalProperties;
/*初始化区*/
/*数据定义区*/
const projectFilter = ref();
const groupData = ref([
	{
		id: "",
		label: "所有",
	},
	{
		id: "1",
		label: "华东总部",
		children: [
			{
				id: "11",
				label: "售前客服部",
			},
			{
				id: "12",
				label: "技术研发部",
			},
			{
				id: "13",
				label: "行政人事部",
			},
		],
	},
	{
		id: "2",
		label: "华难总部",
		children: [
			{
				id: "21",
				label: "售前客服部",
			},
			{
				id: "22",
				label: "技术研发部",
			},
		],
	},
]);

/*ref引用区*/
const group = ref();
/*方法区*/
/*内部方法区*/
</script>

<template>
	<div class="document">
		<el-container>
			<el-aside width="200px">
				<el-container>
					<el-header>
						<el-input
							placeholder="输入关键字进行过滤"
							v-model="projectFilter"
							clearable
						></el-input>
					</el-header>
					<el-main class="nopadding">
						<el-tree
							ref="group"
							class="menu"
							node-key="id"
							:data="groupData"
							:current-node-key="''"
							:highlight-current="true"
							:expand-on-click-node="false"
						></el-tree>
					</el-main>
				</el-container>
			</el-aside>
			<DocumentContent></DocumentContent>
		</el-container>
	</div>
</template>

<style scoped lang="less">
.document {
	height: 100%;
}
</style>
