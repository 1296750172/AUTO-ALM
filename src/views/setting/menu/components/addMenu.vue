<!--
 * @Author: happain
 * @Date: 2022-10-05 20:34:38
 * @LastEditors: happain
 * @LastEditTime: 2022-10-14 00:02:08
 * @Description:
-->
<script setup>
import scIconSelect from "@/components/scIconSelect";
const app = getCurrentInstance().appContext.config.globalProperties;
const emits = defineEmits(["added"]);
// 初始化数据
const initData = (currentMenu, allMenu) => {
	if (currentMenu != null) {
		updMenuform.value.parentId = currentMenu;
	} // 赋值表单数据
	//
	menuData.value = tranMenu(null, allMenu);
};
// 转换菜单格式
const tranMenu = (id, allMenu) => {
	const map = [];
	allMenu.forEach((item) => {
		// 如果是自身的节点就跳过
		if (id == item.id) {
			return;
		}
		var obj = {
			...item,
			children:
				item.children && item.children.length > 0
					? tranMenu(id, item.children)
					: null,
			...item.meta,
		};
		// 删除对象属性
		Reflect.deleteProperty(obj, "meta");
		map.push(obj);
	});
	return map;
};
// 表单
const updMenuform = ref({
	id: "",
	parentId: "0",
	name: "",
	path: "",
	sort: "",
	component: "",
	redirect: "",

	title: "",
	icon: "",
	active: "",
	affix: "",
	color: "",
	type: "menu",
	hidden: false,
	hiddenBreadCrumb: false,
	fullpage: false,
	// 权限列表
	apiList: [],
});
const updMenuFormRef = ref();
const updMenuFormRules = ref({
	title: [
		{
			required: true,
			message: "名称不能为空",
			trigger: "blur",
		},
	],
	parentId: [
		{
			required: true,
			message: "父级菜单不能为空",
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
	name: [
		{
			required: true,
			message: "菜单key值不能为空",
			trigger: "blur",
		},
	],
	path: [
		{
			required: true,
			message: "路径不能为空",
			trigger: "blur",
		},
	],
	sort: [
		{
			required: true,
			message: "顺序不能为空",
			trigger: "blur",
		},
		{ type: "number", message: "必须是数字" },
	],
	icon: [
		{
			required: true,
			message: "图标不能为空",
			trigger: "blur",
		},
	],
});

// 总菜单数据
const menuData = ref();
const menuProps = ref({
	value: "id",
	label: "title",
	checkStrictly: true,
});
// 预制的颜色
const predefineColors = ref([
	"#ff4500",
	"#ff8c00",
	"#ffd700",
	"#67C23A",
	"#00ced1",
	"#409EFF",
	"#c71585",
]);
const apiListAddTemplate = ref({
	code: "",
	url: "",
});
const loading = ref(false);
// 添加
const updMenu = async (form) => {
	loading.value = true;
	if (!form) {
		return;
	}
	await form.validate(async (valid) => {
		// 验证通过
		if (valid) {
			const result = await app.$API.menu.add.post({
				...updMenuform.value,
			});
			if (result.code == 200) {
				app.$message.success(result.message);
				emits("added");
			}
		}
	});
	loading.value = false;
};
// 选中父级菜单事件
const casChange = (value) => {
	if (!value) {
		updMenuform.value.parentId = 0;
	} else {
		updMenuform.value.parentId = value.at(-1);
	}
	// if (value.at(-1) == updMenuform.value.id) {
	// 	app.$message.error("不能选自身为父级菜单");
	// }
};
defineExpose({ initData });
</script>

<template>
	<div class="add-menu">
		<el-row :gutter="40">
			<el-col :lg="12">
				<h2>添加菜单</h2>
				<el-form
					:model="updMenuform"
					:rules="updMenuFormRules"
					ref="updMenuFormRef"
					label-width="80px"
					label-position="left"
				>
					<el-form-item label="名称" prop="title">
						<el-input
							v-model="updMenuform.title"
							clearable
							placeholder="菜单显示名字"
						></el-input>
					</el-form-item>
					<el-form-item label="上级菜单" prop="parentId">
						<el-cascader
							v-model="updMenuform.parentId"
							:options="menuData"
							:props="menuProps"
							:show-all-levels="true"
							placeholder="顶级菜单"
							clearable
							@change="casChange"
						></el-cascader>
					</el-form-item>
					<el-form-item label="类型" prop="type">
						<el-radio-group v-model="updMenuform.type">
							<el-radio-button label="menu">菜单</el-radio-button>
							<el-radio-button label="iframe"
								>Iframe</el-radio-button
							>
							<el-radio-button label="link">外链</el-radio-button>
							<el-radio-button label="button"
								>按钮</el-radio-button
							>
						</el-radio-group>
					</el-form-item>
					<el-form-item label="key值" prop="name">
						<el-input
							v-model="updMenuform.name"
							clearable
							placeholder="菜单key值"
						></el-input>
						<div class="el-form-item-msg">
							系统唯一且与内置组件名一致，否则导致缓存失效。如类型为Iframe的菜单，别名将代替源地址显示在地址栏
						</div>
					</el-form-item>
					<el-form-item label="菜单图标" prop="icon">
						<sc-icon-select
							v-model="updMenuform.icon"
							clearable
						></sc-icon-select>
					</el-form-item>
					<el-form-item label="路由地址" prop="path">
						<el-input
							v-model="updMenuform.path"
							clearable
							placeholder=""
						></el-input>
					</el-form-item>
					<el-form-item label="顺序" prop="sort">
						<el-input
							v-model.number="updMenuform.sort"
							clearable
							placeholder=""
						></el-input>
					</el-form-item>
					<el-form-item label="视图" prop="component">
						<el-input
							v-model="updMenuform.component"
							clearable
							placeholder=""
						>
							<template #prepend>views/</template>
						</el-input>
						<div class="el-form-item-msg">
							如父节点、链接或Iframe等没有视图的菜单不需要填写
						</div>
					</el-form-item>
					<el-form-item label="重定向" prop="redirect">
						<el-input
							v-model="updMenuform.redirect"
							clearable
							placeholder=""
						></el-input>
					</el-form-item>
					<el-form-item label="菜单高亮" prop="active">
						<el-input
							v-model="updMenuform.active"
							clearable
							placeholder=""
						></el-input>
						<div class="el-form-item-msg">
							子节点或详情页需要高亮的上级菜单路由地址
						</div>
					</el-form-item>

					<el-form-item label="颜色" prop="color">
						<el-color-picker
							v-model="updMenuform.color"
							:predefine="predefineColors"
						></el-color-picker>
					</el-form-item>
					<el-form-item label="是否隐藏" prop="hidden">
						<el-checkbox v-model="updMenuform.hidden"
							>隐藏菜单</el-checkbox
						>
						<el-checkbox v-model="updMenuform.hiddenBreadcrumb"
							>隐藏面包屑</el-checkbox
						>
						<div class="el-form-item-msg">
							菜单不显示在导航中，但用户依然可以访问，例如详情页
						</div>
					</el-form-item>
					<el-form-item label="整页路由" prop="fullpage">
						<el-switch v-model="updMenuform.fullpage" />
					</el-form-item>

					<el-form-item>
						<el-button
							type="primary"
							@click="updMenu(updMenuFormRef)"
							:loading="loading"
							>添加</el-button
						>
					</el-form-item>
				</el-form>
			</el-col>
			<el-col :lg="12" class="apilist">
				<h2>接口权限</h2>
				<sc-form-table
					v-model="updMenuform.apiList"
					:addTemplate="apiListAddTemplate"
					placeholder="暂无匹配接口权限"
				>
					<el-table-column prop="code" label="标识" width="150">
						<template #default="scope">
							<el-input
								v-model="scope.row.code"
								placeholder="请输入内容"
							></el-input>
						</template>
					</el-table-column>
					<el-table-column prop="url" label="Api url">
						<template #default="scope">
							<el-input
								v-model="scope.row.url"
								placeholder="请输入内容"
							></el-input>
						</template>
					</el-table-column>
				</sc-form-table>
			</el-col>
		</el-row>
	</div>
</template>

<style scoped lang="less">
.add-menu {
}
h2 {
	font-size: 17px;
	color: #3c4a54;
	padding: 0 0 30px 0;
}
.apilist {
	border-left: 1px solid #eee;
}

[data-theme="dark"] h2 {
	color: #fff;
}
[data-theme="dark"] .apilist {
	border-color: #434343;
}
.add-menu {
}
</style>
