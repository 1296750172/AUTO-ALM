<!--
 * @Author: happain
 * @Date: 2022-10-05 03:03:09
 * @LastEditors: happain
 * @LastEditTime: 2022-10-05 05:57:18
 * @Description:
-->
<script setup>
const app = getCurrentInstance().appContext.config.globalProperties;

// 初始化
const props = defineProps({
	title: {
		type: String,
		default: "添加",
	},
	width: {
		type: String,
		default: "30%",
	},
});

const vis = ref(false);
// 属性值
const orgData = ref();
const orgProp = ref({
	label: "orgName",
	children: "children",
	id: "id",
	pid: "parentId",
});
const treeVis = ref(false);
// 显示
const open = (data) => {
	if (data == null) {
		app.$message.error("数据不能为空");
		return;
	}
	orgData.value = data[0];
	console.log(orgData.value);
	treeVis.value = true;

	vis.value = true;
};

onMounted(() => {});
// 暴露的方法
defineExpose({ open });
</script>

<template>
	<div class="tree-dialog">
		<el-dialog v-model="vis" :title="props.title" :width="props.width">
			<div class="tree">
				<vue3-tree-org
					v-if="treeVis"
					:data="orgData"
					:props="orgProp"
					:collapsable="true"
					:node-draggable="false"
					:clone-node-drag="false"
					:only-one-node="false"
				>
				</vue3-tree-org>
			</div>
		</el-dialog>
	</div>
</template>

<style scoped lang="less">
.tree-dialog {
	.tree {
		height: 600px;
	}
}
</style>
