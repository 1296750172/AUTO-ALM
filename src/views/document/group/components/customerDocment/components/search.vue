<!--
 * @Author: happain
 * @Date: 2022-10-06 23:37:46
 * @LastEditors: happain
 * @LastEditTime: 2022-10-16 21:30:53
 * @Description:
-->
<script setup>
/*初始化区*/
const emits = defineEmits(["search"]);
/*数据定义区*/
const formData = ref({
	title: "",
	type: "",
	status: "",
	createUser: "",
});
const rules = ref({});
/*ref引用区*/
const formRef = ref();

/*方法区*/
const search = async (form) => {
	if (!form) {
		return;
	}
	await form.validate(async (valid) => {
		// 验证通过
		if (valid) {
			emits("search", formData.value);
			form.resetFields();
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
</script>

<template>
	<div class="search">
		<el-form ref="formRef" :model="formData" :rules="rules" inline>
			<el-form-item label="标题与内容" prop="title">
				<el-input v-model="formData.title" />
			</el-form-item>
			<el-form-item label="类型" prop="type">
				<el-input v-model="formData.type" />
			</el-form-item>
			<el-form-item label="状态" prop="status">
				<el-input v-model="formData.status" />
			</el-form-item>
			<el-form-item label="创建人" prop="createUser">
				<el-input v-model="formData.createUser" />
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="search(formRef)"
					>搜索</el-button
				>
				<el-button type="danger" @click="reset(formRef)"
					>重置</el-button
				>
			</el-form-item>
		</el-form>
	</div>
</template>

<style scoped lang="less">
.search {
	width: 100%;
	padding: 20px;
}
</style>
