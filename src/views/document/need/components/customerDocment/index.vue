<!--
 * @Author: happain
 * @Date: 2022-10-14 01:26:14
 * @LastEditors: happain
 * @LastEditTime: 2022-10-15 04:46:53
 * @Description:
-->
<script setup>
import almPage from "@/components/almPage";
import FormCom from "./components/form.vue";
import SearchCom from "./components/search.vue";
/*初始化区*/
const app = getCurrentInstance().appContext.config.globalProperties;
/*数据定义区*/
const tableData = ref();
const page = ref({
	pageNum: 1,
	pageSize: 20,
	total: 0,
});
const tableLoading = ref(true);
const chooseData = ref();
/*ref引用区*/
const tableRef = ref();
const formRef = ref();
const searchRef = ref();
/*方法区*/
const handleSelectionChange = (value) => {
	chooseData.value = value;
};
const initData = async (pagedata, searchdata) => {
	tableLoading.value = true;
	let pageparm = {
		pageNum: 1,
		pageSize: 20,
	};
	if (pagedata != null) {
		pageparm.pageNum = page.value.pageNum;
		pageparm.pageSize = page.value.pageSize;
	}
	const result = await app.$API.doc.query.post({
		pageNum: pageparm.pageNum,
		pageSize: pageparm.pageSize,
		...searchdata,
	});
	if (result.code == 200) {
		tableData.value = result.result.list;
		page.value.pageNum = result.result.pageNum;
		page.value.pageSize = result.result.pageSize;
		page.value.total = result.result.total;
		tableLoading.value = false;
	}
};
const changePage = (pagenum) => {
	page.value.pageNum = pagenum;
	initData(page.value);
};
const refresh = () => {
	initData();
	app.$message.success("刷新成功");
};
// 搜索
const search = (value) => {
	initData(null, value);
};
const delHandler = async (data) => {
	// 单个删除
	if (data != null) {
		const result = await app.$API.doc.del.post({ id: data.id });
		if (result.code == 200) {
			app.$message.success(result.message);
			initData();
		}
	}
	// 批量删除
	else {
		const idlist = [];
		chooseData.value.map((item) => {
			idlist.push(item.id);
		});
		console.log(idlist);
	}
};

/*内部方法区*/
onMounted(() => {
	initData();
});
</script>

<template>
	<div class="customer">
		<el-container>
			<el-header>
				<div class="left-panel">
					<el-button
						type="primary"
						icon="el-icon-plus"
						@click="formRef.changeVis(true)"
						>添加</el-button
					>
					<el-button
						type="danger"
						icon="el-icon-delete"
						@click="delHandler()"
						:disabled="chooseData == null || chooseData.length == 0"
						>批量删除</el-button
					>
				</div>

				<div class="rigth-panel">
					<el-button icon="el-icon-refresh" @click="refresh()"
						>刷新</el-button
					>
				</div>
			</el-header>
			<el-main class="nopadding">
				<SearchCom ref="searchRef" @search="search"></SearchCom>
				<div class="content">
					<el-table
						ref="tableRef"
						v-loading="tableLoading"
						:data="tableData"
						row-key="id"
						border
						max-height="700"
						style="width: 100%"
						stripe
						highlight-current-row
						@selection-change="handleSelectionChange"
					>
						<el-table-column type="selection" width="55" />
						<el-table-column prop="id" label="id" width="80" />
						<el-table-column prop="status" label="类型">
							<template #default="scope">
								{{ scope.row.type }}
							</template>
						</el-table-column>
						<el-table-column
							prop="title"
							label="标题"
							width="300"
						/>
						<el-table-column prop="status" label="状态">
							<template #default="scope">
								<el-tag>
									{{ scope.row.status }}
								</el-tag>
							</template>
						</el-table-column>

						<el-table-column props="createUser" label="创建人">
							<template #default="scope">
								<el-tag>
									{{ scope.row.createUser }}
								</el-tag>
							</template>
						</el-table-column>

						<el-table-column
							prop="createTime"
							label="创建时间"
							sortable
						/>

						<el-table-column fixed="right" label="操作" width="180">
							<template #default="scope">
								<el-button
									link
									type="primary"
									size="small"
									@click="formRef.changeVis(true, scope.row)"
									>查看</el-button
								>
								<el-button
									link
									type="primary"
									size="small"
									@click="formRef.changeVis(true, scope.row)"
									>编辑</el-button
								>
								<el-button
									link
									type="danger"
									size="small"
									@click="delHandler(scope.row)"
									>删除</el-button
								>
							</template>
						</el-table-column>
					</el-table>
					<!-- 分页组件 -->
				</div>
				<!-- 分页组件 -->
				<alm-page :page="page" @changePage="changePage"></alm-page>
			</el-main>
		</el-container>
		<FormCom
			ref="formRef"
			@added="initData()"
			@upded="initData()"
		></FormCom>
	</div>
</template>

<style scoped lang="less">
.customer {
}
</style>
