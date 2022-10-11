<!--
 * @Author: happain
 * @Date: 2022-10-06 19:15:34
 * @LastEditors: happain
 * @LastEditTime: 2022-10-12 00:21:57
 * @Description:
-->
<script setup>
import almPage from "@/components/almPage";
import UserForm from "./components/userForm";
import UserSearch from "./components/userSearch";
/*初始化区*/
const app = getCurrentInstance().appContext.config.globalProperties;
/*数据定义区*/
const tableData = ref();
const page = ref({
	pageNum: 1,
	pageSize: 20,
	total: 0,
});
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
	let pageparm = {
		pageNum: 1,
		pageSize: 20,
	};
	if (pagedata != null) {
		pageparm.pageNum = page.value.pageNum;
		pageparm.pageSize = page.value.pageSize;
	}
	const result = await app.$API.user.query.post({
		pageNum: pageparm.pageNum,
		pageSize: pageparm.pageSize,
		...searchdata,
	});
	if (result.code == 200) {
		tableData.value = result.result.list;
		page.value.pageNum = result.result.pageNum;
		page.value.pageSize = result.result.pageSize;
		page.value.total = result.result.total;
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
		const result = await app.$API.user.del.post({ id: data.id });
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
	<div class="user">
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
				<UserSearch ref="searchRef" @search="search"></UserSearch>
				<div class="content">
					<el-table
						ref="tableRef"
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
						<el-table-column prop="username" label="账号" />
						<el-table-column prop="number" label="编号" />
						<el-table-column prop="nickname" label="姓名" />
						<el-table-column prop="sex" label="性别" />
						<el-table-column prop="phone" label="电话号码" />
						<el-table-column prop="email" label="邮箱" />
						<el-table-column prop="level" label="职级" />
						<el-table-column prop="position" label="职位" />
						<el-table-column prop="leader" label="领导" />
						<el-table-column label="角色列表">
							<template #default="scope">
								{{ scope.row.roleList }}
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
				<almPage :page="page" @changePage="changePage"></almPage>
			</el-main>
		</el-container>
		<!-- 表单 -->
		<UserForm
			ref="formRef"
			@added="initData()"
			@upded="initData()"
		></UserForm>
	</div>
</template>

<style scoped lang="less">
.user {
}
.content {
}
.menu-tree {
	max-height: 100px;
	overflow-y: auto;
	width: 100%;
}
</style>
