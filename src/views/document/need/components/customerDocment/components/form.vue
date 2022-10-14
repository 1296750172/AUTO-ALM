<script setup>
const scEditor = defineAsyncComponent(() => import("@/components/scEditor"));
const app = getCurrentInstance().appContext.config.globalProperties;

/*初始化区*/
const emits = defineEmits(["added", "upded"]);

/*数据定义区*/
const vis = ref(false);
const formData = ref();
const rules = reactive({
	title: [
		{
			required: true,
			message: "标题不能为空",
			trigger: "blur",
		},
	],
	status: [
		{
			required: true,
			message: "状态不能为空",
			trigger: "blur",
		},
	],
	type: [
		{
			required: true,
			message: "类型不能为空",
			trigger: "blur",
		},
	],
});

const documentTemplate = ref([]);
/*ref引用区*/
const formRef = ref();
/*方法区*/
const init = () => {
	const user = app.$TOOL.data.get("USER_INFO");
	formData.value = {
		id: "",
		title: "",
		status: "新建",
		type: "Car",
		content: "",
		createUser: user.nickname,
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
			// 添加
			if (formData.value.id == "") {
				const result = await app.$API.doc.add.post({
					...formData.value,
				});
				if (result.code == 200) {
					app.$message.success(result.message);
					vis.value = false;
					emits("added");
				}
			} else {
				const result = await app.$API.doc.upd.post({
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
	form.resetFields();
};

/*内部方法区*/
defineExpose({ changeVis });
onBeforeMount(() => {
	init();
});
onMounted(() => {});
</script>

<template>
	<div class="form">
		<el-dialog
			v-model="vis"
			:title="formData.id == '' ? '添加' : '修改'"
			width="70%"
		>
			<div class="dio-form">
				<el-form
					ref="formRef"
					:model="formData"
					:rules="rules"
					label-width="auto"
				>
					<el-form-item label="标题" prop="title">
						<el-input
							type="textarea"
							:autosize="{ minRows: 3, maxRows: 6 }"
							v-model="formData.title"
							placeholder="请输入标题"
						/>
					</el-form-item>
					<el-form-item label="状态" prop="status">
						<el-select
							v-model="formData.status"
							:disabled="formData.id == ''"
						/>
					</el-form-item>
					<el-form-item label="类型" prop="type">
						<el-select
							v-model="formData.type"
							placeholder="请选择类型"
						/>
					</el-form-item>

					<el-form-item label="描述" prop="content">
						<sc-editor
							v-model="formData.content"
							placeholder="请输入内容"
							:templates="documentTemplate"
							:height="300"
						></sc-editor>
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
.form {
	.dio-form {
		.menu-tree {
			padding: 10px;
			height: 300px;
			overflow-y: auto;
			width: 100%;
		}
	}
}
</style>
