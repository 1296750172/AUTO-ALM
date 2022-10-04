<!--
 * @Author: happain
 * @Date: 2022-09-21 22:27:28
 * @LastEditors: happain
 * @LastEditTime: 2022-09-22 00:33:29
 * @Description:
-->
<script setup>
import { DocumentAdd } from "@element-plus/icons-vue";
import needData from "../needData.js";

// tab数据
const needTypeList = ref(needData.needTypeList);
// 默认激活的tab
const needActive = ref(needData.needTypeList[0].name);
// 新建的标题
const needTitle = ref(needData.needTypeList[0].label);
const needTabChange = (tab) => {
	console.log(tab);
	needTitle.value = tab.props.label;
};
</script>

<template>
	<div class="need-content">
		<el-card class="card" shadow="hover">
			<template #header>
				<div class="card-header">
					<span>需求文档列表</span>
					<el-button type="primary" text :icon="DocumentAdd"
						>新建{{ needTitle }}</el-button
					>
				</div>
			</template>
			<div class="card-content">
				<el-tabs
					v-model="needActive"
					class="card-tab"
					@tab-click="needTabChange"
				>
					<el-tab-pane
						v-for="item in needTypeList"
						:label="item.label"
						:name="item.name"
						:key="item.name"
						>User</el-tab-pane
					>
				</el-tabs>
			</div>
		</el-card>
	</div>
</template>

<style scoped lang="less">
.need-content {
	margin-left: 5px;
	flex: auto;
	height: 100%;
	width: 100%;
	// margin-left: 20px;
	.card {
		padding: 10px;
		width: 100%;
		.card-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		.card-content {
			.card-tab {
			}
		}
	}
}
</style>
