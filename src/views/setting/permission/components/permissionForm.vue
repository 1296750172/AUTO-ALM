<!--
 * @Author: happain
 * @Date: 2022-10-06 21:52:14
 * @LastEditors: happain
 * @LastEditTime: 2022-10-07 00:06:11
 * @Description:
-->
<script setup>
const app = getCurrentInstance().appContext.config.globalProperties;
/*初始化区*/
const emits = defineEmits(["added", "upded"]);
/*数据定义区*/
const vis = ref(false);
const formData = ref();
const rules = reactive({
	permissionName: [
		{
			required: true,
			message: "请输入权限名",
			trigger: "blur",
		},
	],
	permissionValue: [
		{
			required: true,
			message: "请输入key值",
			trigger: "blur",
		},
	],
});
/*ref引用区*/
const formRef = ref();
/*方法区*/
const init = () => {
	formData.value = {
		id: "",
		permissionName: "",
		permissionValue: "",
	};
};
const changeVis = (isvis, formdata) => {
	vis.value = isvis;
	if (formdata != null) {
		formData.value = formdata;
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
			if (formData.value.id == "") {
				const result = await app.$API.permission.add.post({
					...formData.value,
				});
				if (result.code == 200) {
					app.$message.success(result.message);
					vis.value = false;
					emits("added");
				}
			} else {
				const result = await app.$API.permission.upd.post({
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
	form.resetFields();
};

/*内部方法区*/
defineExpose({ changeVis });

onBeforeMount(() => {
	init();
});
</script>

<template>
	<div class="per-form">
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
					<el-form-item label="权限名" prop="permissionName">
						<el-input v-model="formData.permissionName" />
					</el-form-item>
					<el-form-item label="key值" prop="permissionValue">
						<el-input v-model="formData.permissionValue" />
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="submit(formRef)">{{
							formData.id == "" ? "添加" : "修改"
						}}</el-button>
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
.per-form {
	.form {
	}
}
</style>
