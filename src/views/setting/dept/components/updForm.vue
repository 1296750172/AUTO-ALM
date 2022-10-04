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

// 显示
const open = (data) => {
	console.log(data);
	vis.value = true;
};
// 表单部分
const formData = reactive({
	orgName: "",
	orgValue: "",
	orgDesc: "",
	orgPersonId: "",
	parentId: "",
});
const formRef = ref();
const formRule = ref({
	orgName: [
		{
			required: true,
			message: "请输入组织名",
			trigger: "blur",
		},
	],
	orgValue: [
		{
			required: true,
			message: "请输入key值",
			trigger: "blur",
		},
	],
	orgDesc: [
		{
			required: true,
			message: "请输入组织描述",
			trigger: "blur",
		},
	],
	orgPersonId: [
		{
			required: true,
			message: "xxx",
			trigger: "blur",
		},
	],
	parentId: [
		{
			required: true,
			message: "xxx",
			trigger: "blur",
		},
	],
});
// 添加
const submit = async (form) => {
	if (!form) {
		return;
	}
	await form.validate(async (valid) => {
		// 验证通过
		if (valid) {
			const result = await app.$API.organ.add.post({ ...formData });
			if (result.code == 200) {
				app.$message.success(result.message);
				vis.value = false;
				form.resetFields();
			}
		}
	});
};
// 重置表单
const reset = (form) => {
	if (!form) {
		return;
	}
	form.resetFields();
};
// // 查询用户
// const searchUser = () => {};
// const searchLoading = ref(false);
// // 部门列表
// const organList = ref([]);

onMounted(() => {});
// 暴露的方法
defineExpose({ open });
</script>

<template>
	<div class="add-dialog">
		<el-dialog v-model="vis" :title="props.title" :width="props.width">
			<div class="add-form">
				<el-form
					ref="formRef"
					:model="formData"
					:rules="formRule"
					label-width="auto"
					status-icon
				>
					<el-form-item label="名称" prop="orgName">
						<el-input v-model="formData.orgName" />
					</el-form-item>
					<el-form-item label="key值" prop="orgValue">
						<el-input v-model="formData.orgValue" />
					</el-form-item>
					<el-form-item label="描述" prop="orgDesc">
						<el-input v-model="formData.orgDesc" />
					</el-form-item>
					<!--组织负责人 -->
					<el-form-item label="组织负责人" prop="orgPersonId">
						<!-- <el-select
							v-model="formData.orgPersonId"
							remote
							:clearable="true"
							placeholder="选择组织负责人"
							:remote-method="searchUser"
							remote-show-suffix
							:loading="searchLoading"
						>
						</el-select> -->
						<el-input v-model="formData.orgPersonId" />
					</el-form-item>
					<!-- 父组织 -->
					<el-form-item label="上级组织" prop="parentId">
						<!-- <el-tree-v2></el-tree-v2> -->
						<el-input v-model="formData.parentId" />
					</el-form-item>

					<el-form-item>
						<el-button type="primary" @click="submit(formRef)"
							>创建</el-button
						>
						<el-button type="danger" @click="reset(formRef)"
							>重置</el-button
						>
					</el-form-item>
				</el-form>
			</div>
		</el-dialog>
	</div>
</template>

<style scoped lang="less">
.add-dialog {
	.add-form {
	}
}
</style>
