<!--
 * @Author: happain
 * @Date: 2022-10-06 21:52:14
 * @LastEditors: happain
 * @LastEditTime: 2022-10-11 02:34:56
 * @Description:
-->
<script setup>
const app = getCurrentInstance().appContext.config.globalProperties;
/*初始化区*/
const emits = defineEmits(["added", "upded"]);

const treeData = ref([]);
/*数据定义区*/
const vis = ref(false);
const formData = ref();
const rules = reactive({
	roleName: [
		{
			required: true,
			message: "请输入角色名",
			trigger: "blur",
		},
	],
	roleValue: [
		{
			required: true,
			message: "请输入key值",
			trigger: "blur",
		},
	],
});
const treeProps = ref({
	label: (data) => {
		return data.meta.title;
	},
});
const menuIds = ref([]);
/*ref引用区*/
const formRef = ref();
const menuTreeRef = ref();
/*方法区*/
const init = () => {
	formData.value = {
		id: "",
		roleName: "",
		roleValue: "",
		menuIds: [],
	};
};
const changeVis = (isvis, formdata) => {
	vis.value = isvis;
	if (formdata != null) {
		formData.value = formdata;
		menuIds.value = formdata.menuIds;
		// 等待树形组件加载成功
		nextTick(() => {
			menuTreeRef.value.setCheckedKeys(formdata.menuIds);
		});
	} else {
		init();
	}
};
const submit = async (form) => {
	if (!form) {
		return;
	}
	await form.validate(async (valid) => {
		// 验证通过
		if (valid) {
			const menulist = menuTreeRef.value.getCheckedNodes();
			formData.value.menuIds = menulist.map((item) => {
				return item.id;
			});
			// 添加
			if (formData.value.id == "") {
				const result = await app.$API.role.add.post({
					...formData.value,
				});
				if (result.code == 200) {
					app.$message.success(result.message);
					vis.value = false;
					emits("added");
				}
			} else {
				// 如果菜单没改变的话
				if (
					menuIds.value.sort().toString() ==
					formData.value.menuIds.sort().toString()
				) {
					formData.value.menuIds = null;
				}
				const result = await app.$API.role.upd.post({
					...formData.value,
				});
				if (result.code == 200) {
					app.$message.success(result.message);
					vis.value = false;
					emits("upded");
				}
			}
		}
	});
};
const reset = (form) => {
	if (!form) {
		return;
	}
	// 清空选中的菜单
	menuTreeRef.value.setCheckedKeys([]);
	form.resetFields();
};

/*内部方法区*/
defineExpose({ changeVis });
// 加载菜单数据
const initPermissionList = async () => {
	const result = await app.$API.menu.tree.post();
	if (result.code == 200) {
		treeData.value = result.result;
	}
};

onBeforeMount(() => {
	init();
	initPermissionList();
});
onMounted(() => {});
</script>

<template>
	<div class="roleform">
		<el-dialog
			v-model="vis"
			:title="formData.id == '' ? '添加' : '修改'"
			width="50%"
		>
			<div class="form">
				<el-form
					ref="formRef"
					:model="formData"
					:rules="rules"
					label-width="auto"
				>
					<el-form-item label="角色名" prop="roleName">
						<el-input v-model="formData.roleName" />
					</el-form-item>
					<el-form-item label="key值" prop="roleValue">
						<el-input v-model="formData.roleValue" />
					</el-form-item>
					<el-form-item label="菜单列表">
						<el-tree
							ref="menuTreeRef"
							:data="treeData"
							:props="treeProps"
							node-key="id"
							show-checkbox
							default-expand-all
							highlight-current
							class="menu-tree"
						>
							<template #default="{ data }">
								<span class="custom-tree-node">
									<span>{{ data.meta.title }}</span>
								</span>
							</template>
						</el-tree>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="submit(formRef)">{{
							formData.id == "" ? "添加" : "修改"
						}}</el-button>
						<el-button
							type="danger"
							@click="reset(formRef)"
							v-if="formData.id == '' ? true : false"
							>重置</el-button
						>
					</el-form-item>
				</el-form>
			</div>
		</el-dialog>
	</div>
</template>

<style scoped lang="less">
.roleform {
	.form {
		.menu-tree {
			padding: 10px;
			height: 300px;
			overflow-y: auto;
			width: 100%;
		}
	}
}
</style>
