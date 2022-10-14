<script setup>
import addMenuCom from "./components/addMenu.vue";
import updMenuCom from "./components/updMenu.vue";
const app = getCurrentInstance().appContext.config.globalProperties;

// 菜单加载
const menuloading = ref(false);
// 菜单列表
const menuList = ref([]);
// tree配置
const menuProps = ref({
	label: (data) => {
		return data.meta.title;
	},
});
const menuRef = ref();
const updMenuRef = ref();
const addMenuRef = ref();
// 菜单搜索字段
const menuFilterText = ref("");
// 监听搜索
watch(menuFilterText, (newval) => {
	menuRef.value.filter(newval);
});
// 当前节点
const nodeCurrent = ref(null);
// 添加组件
const addVis = ref(false);
// 菜单过滤方法
const menuFilterNode = (value, data) => {
	if (!value) return true;
	var targetText = data.meta.title;
	return targetText.indexOf(value) !== -1;
};
// 初始化
const menuInit = async () => {
	menuloading.value = true;
	const result = await app.$API.menu.tree.post();
	if (result.code == 200) {
		menuList.value = result.result;
	}
	menuloading.value = false;
};
// 添加菜单
const addMenu = (node) => {
	addMenuRef.value.initData(
		node != null ? node.data.id : null,
		menuList.value
	);
	addVis.value = true;
};
// 更新菜单
const updMenu = (data) => {
	addVis.value = false;
	nodeCurrent.value = data;
	updMenuRef.value.initData(nodeCurrent.value, menuList.value);
};
// 删除菜单
const delMenu = async () => {
	const result = await app.$API.menu.del.post({ id: nodeCurrent.value.id });
	if (result.code == 200) {
		app.$message.success(result.message);
		menuInit();
		addVis.value = false;
	}
};
onMounted(() => {
	menuInit();
});
</script>

<template>
	<el-container>
		<el-aside width="300px" v-loading="menuloading">
			<el-container>
				<el-header>
					<el-input
						placeholder="输入关键字进行过滤"
						v-model="menuFilterText"
						clearable
					></el-input>
				</el-header>

				<el-main class="nopadding">
					<div class="search">
						<el-button
							type="primary"
							icon="el-icon-plus"
							@click="addMenu()"
							>添加</el-button
						>
						<el-button
							type="danger"
							plain
							icon="el-icon-delete"
							:disabled="nodeCurrent == null"
							@click="delMenu()"
							>删除</el-button
						>
					</div>
					<div class="tree">
						<el-tree
							ref="menuRef"
							class="menu"
							node-key="id"
							:data="menuList"
							:props="menuProps"
							highlight-current
							:expand-on-click-node="true"
							check-strictly
							:filter-node-method="menuFilterNode"
							@node-click="updMenu"
						>
							<template #default="{ node, data }">
								<span
									class="custom-tree-node el-tree-node__label"
								>
									<span class="label">
										{{ node.label }}
									</span>
									<span class="do">
										<el-icon
											@click.stop="addMenu(node, data)"
											><el-icon-plus
										/></el-icon>
									</span>
								</span>
							</template>
						</el-tree>
					</div>
				</el-main>
			</el-container>
		</el-aside>
		<el-container>
			<el-main class="nopadding" style="padding: 20px" ref="main">
				<!-- 添加菜单组件 -->
				<addMenuCom
					ref="addMenuRef"
					v-show="addVis"
					@added="menuInit()"
				></addMenuCom>
				<!-- 更新菜单组件 -->
				<updMenuCom
					ref="updMenuRef"
					v-show="!addVis"
					@upded="menuInit()"
				></updMenuCom>
			</el-main>
		</el-container>
	</el-container>
</template>

<style scoped lang="less">
.search {
	height: 40px;
	width: 100%;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	padding: 30px 20px;
}
.tree {
	width: 100%;
}
.custom-tree-node {
	display: flex;
	flex: 1;
	align-items: center;
	justify-content: space-between;
	font-size: 14px;
	padding-right: 24px;
	height: 100%;
}
.custom-tree-node .label {
	display: flex;
	align-items: center;
	height: 100%;
}
.custom-tree-node .label .el-tag {
	margin-left: 5px;
}
.custom-tree-node .do {
	display: none;
}
.custom-tree-node .do i {
	margin-left: 5px;
	color: #999;
}
.custom-tree-node .do i:hover {
	color: #333;
}

.custom-tree-node:hover .do {
	display: inline-block;
}
</style>
