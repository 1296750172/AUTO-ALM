<!--
 * @Author: happain
 * @Date: 2022-09-21 22:27:28
 * @LastEditors: happain
 * @LastEditTime: 2022-10-18 00:22:44
 * @Description:
-->
<script setup>
import CustomerDocument from "./customerDocment";
import SystemDocument from "./systemDocment";
const app = getCurrentInstance().appContext.config.globalProperties;
/*初始化区*/
/*数据定义区*/
const documentTypeList = ref([
	{
		label: "客户需求",
		name: "custom",
		tabcom: markRaw(CustomerDocument),
	},
	{
		label: "系统需求",
		name: "system",
		tabcom: markRaw(SystemDocument),
	},
	{
		label: "系统架构",
		name: "system_arc",
		tabcom: markRaw(CustomerDocument),
	},
	{
		label: "软件需求",
		name: "software",
		tabcom: markRaw(CustomerDocument),
	},
	{
		label: "软件架构",
		name: "software_arc",
		tabcom: markRaw(CustomerDocument),
	},
	{
		label: "硬件需求",
		name: "hardware",
		tabcom: markRaw(CustomerDocument),
	},
]);
// 默认激活的tab
const documentActive = ref(documentTypeList.value[0].name);
// 默认激活的组件
const documentCom = ref(documentTypeList.value[0].tabcom);
/*ref引用区*/
/*方法区*/
const documentTabChange = (tab) => {
	// 切换组件
	documentCom.value = documentTypeList.value[tab.index].tabcom;
	console.log(app);
};
/*内部方法区*/
</script>

<template>
	<div class="document-content">
		<el-container>
			<el-main class="nopadding">
				<el-tabs
					v-model="documentActive"
					@tab-click="documentTabChange"
				>
					<el-tab-pane
						v-for="item in documentTypeList"
						:label="item.label"
						:name="item.name"
						:key="item.name"
					>
						<Component :is="documentCom"></Component>
					</el-tab-pane>
				</el-tabs>
			</el-main>
		</el-container>
	</div>
</template>

<style scoped lang="less">
.document-content {
	flex: auto;
	height: 100%;
	width: 100%;
	.nopadding {
		padding: 5px 20px;
	}
}
</style>
