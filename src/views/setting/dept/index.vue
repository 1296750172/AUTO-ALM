<!--
 * @Author: happain
 * @Date: 2022-09-10 03:53:36
 * @LastEditors: happain
 * @LastEditTime: 2022-10-05 05:33:40
 * @Description:
-->
<script setup>
import addForm from "./components/addForm.vue";
import updForm from "./components/updForm.vue";
import treeOrgan from "./components/treeOrgan.vue";

const app = getCurrentInstance().appContext.config.globalProperties;
// 引用对象
const addFormRef = ref();
const updFormRef = ref();
const treeOrganRef = ref();

// 表格对象
const tableRef = ref();
// 表格数据
const tableData = ref([]);
// 查看组织领导的信息
const showLeader = (data) => {
	console.log(data);
};
// 设置选中的表格id
const selectId = ref(null);
const rowClick = (row) => {
	selectId.value = row.id;
};
// 删除逻辑
const delorg = (row) => {
	app.$TOOL.msg.confirm(`是否删除${row.orgName}`, async () => {
		if (row.children?.length != 0) {
			app.$message.error("该组织存在子节点无法删除");
			return;
		}
		const result = await app.$API.organ.del.post({ id: row.id });
		if (result.code == 200) {
			app.$message.success(result.message);
			tableReflush();
		}
	});
};
// 更新逻辑
const updorg = (row) => {
	updFormRef.value.open(row);
};
// 刷新表格
const tableReflush = () => {
	tableInit();
};
// 初始化表格数据
const tableInit = async () => {
	// 加载表格数据
	const result = await app.$API.system.organ.tree.post();
	console.log(result);
	if (result.code == 200) {
		tableData.value = result.result;
	}
};

onMounted(() => {
	tableInit();
});
</script>

<template>
	<el-container>
		<el-header class="header">
			<el-button
				type="primary"
				icon="el-icon-plus"
				@click="addFormRef.open()"
				>添加组织</el-button
			>
			<el-button
				type="primary"
				icon="el-icon-histogram"
				@click="treeOrganRef.open(tableData)"
			>
				查看组织架构图
			</el-button>
		</el-header>
		<el-main class="nopadding">
			<div class="search"></div>
			<div class="content">
				<el-table
					ref="tableRef"
					:data="tableData"
					row-key="id"
					border
					max-height="800"
					style="width: 100%"
					stripe
					highlight-current-row
					@row-click="rowClick"
				>
					<el-table-column
						prop="id"
						label="Id"
						sortable
						width="100"
					/>
					<el-table-column prop="orgName" label="名称" sortable />
					<el-table-column prop="orgValue" label="标识值" sortable />
					<el-table-column prop="orgDesc" label="描述" sortable />
					<el-table-column prop="orgPersonId" label="责任人">
						<template #default="scope">
							<el-tag @click="showLeader(scope.row.orgUser)">
								{{ scope.row.orgUser.nickname }}
							</el-tag>
						</template>
					</el-table-column>

					<el-table-column fixed="right" label="操作" width="150">
						<template #default="scope">
							<el-button
								link
								type="primary"
								size="small"
								@click="updorg(scope.row)"
								>修改</el-button
							>
							<el-button
								link
								type="primary"
								size="small"
								@click="delorg(scope.row)"
								>删除</el-button
							>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</el-main>
	</el-container>

	<!-- 添加 -->
	<addForm
		title="添加组织"
		ref="addFormRef"
		@added="tableReflush()"
	></addForm>
	<!-- 更新 -->
	<updForm
		title="修改组织"
		ref="updFormRef"
		@upded="tableReflush()"
	></updForm>
	<!-- 树形展示 -->
	<treeOrgan title="组织结构树形图" width="80%" ref="treeOrganRef">
	</treeOrgan>
</template>

<style scoped lang="less">
.header {
	display: flex;
	justify-content: flex-start;
	align-items: center;
}
.search {
}
.content {
}
</style>
