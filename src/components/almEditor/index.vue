<!--
 * @Author: happain
 * @Date: 2022-10-15 20:23:15
 * @LastEditors: happain
 * @LastEditTime: 2022-10-15 21:54:00
 * @Description:
-->
<script setup>
import Editor from "@tinymce/tinymce-vue";
import tinymce from "tinymce/tinymce";
import "tinymce/themes/silver";
import "tinymce/icons/default";
import "tinymce/models/dom";

// 引入编辑器插件
import "tinymce/plugins/code"; //编辑源码
import "tinymce/plugins/image"; //插入编辑图片
import "tinymce/plugins/media"; //插入视频
import "tinymce/plugins/link"; //超链接
import "tinymce/plugins/preview"; //预览
import "tinymce/plugins/template"; //模板
import "tinymce/plugins/table"; //表格
import "tinymce/plugins/pagebreak"; //分页
import "tinymce/plugins/lists"; //列
import "tinymce/plugins/advlist"; //列
import "tinymce/plugins/quickbars"; //快速工具条
const app = getCurrentInstance().appContext.config.globalProperties;
/*初始化区*/
const emits = defineEmits(["onClick", "update:modelValue"]);
const props = defineProps({
	modelValue: {
		type: String,
		default: "",
	},
	placeholder: {
		type: String,
		default: "",
	},
	height: {
		type: Number,
		default: 300,
	},
	disabled: {
		type: Boolean,
		default: false,
	},
	plugins: {
		type: [String, Array],
		default:
			"code image media link preview table quickbars template pagebreak lists advlist",
	},
	toolbar: {
		type: [String, Array],
		default:
			"undo redo |  forecolor backcolor bold italic underline strikethrough link | blocks fontfamily fontsize | \
					alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | pagebreak | \
					image media table template preview | code selectall",
	},
	templates: {
		type: Array,
		default: () => [],
	},
});

/*数据定义区*/
const initData = ref({
	language_url: "/tinymce/langs/zh_CN.js",
	language: "zh_CN",
	skin_url: "/tinymce/skins/ui/oxide",
	content_css: "/tinymce/skins/content/default/content.css",
	menubar: false,
	statusbar: true,
	plugins: props.plugins,
	toolbar: props.toolbar,
	toolbar_mode: "sliding",
	font_size_formats: "12px 14px 16px 18px 22px 24px 36px 72px",
	height: props.height,
	placeholder: props.placeholder,
	branding: false,
	resize: true,
	elementpath: true,
	content_style: "",
	templates: props.templates,
	quickbars_selection_toolbar:
		"forecolor backcolor bold italic underline strikethrough link",
	quickbars_image_toolbar: "alignleft aligncenter alignright",
	quickbars_insert_toolbar: false,
	image_caption: true,
	image_advtab: true,
	images_upload_handler: (blobInfo) => {
		return new Promise((resolve, reject) => {
			const data = new FormData();
			data.append("file", blobInfo.blob(), blobInfo.filename());
			app.$API.common.upload
				.post(data)
				.then((res) => {
					if (res.code != 200) {
						reject();
					} else {
						resolve(res.result.filePath);
						app.$message.success("上传成功");
					}
				})
				.catch(() => {
					reject();
				});
		});
	},
});
const contentValue = ref(props.modelValue);
/*ref引用区*/
/*方法区*/
const init = () => {
	nextTick(() => {
		tinymce.init({});
		tinymce.on("init", () => {
			this.getBody().style.fontSize = "14px";
		});
		tinymce.on("OpenWindow", function (e) {
			//FIX 编辑器在el-drawer中，编辑器的弹框无法获得焦点
			var D = document.querySelector(".el-drawer.open");
			var E = e.target.editorContainer;
			if (D && D.contains(E)) {
				var nowDA = document.activeElement;
				setTimeout(() => {
					document.activeElement.blur();
					nowDA.focus();
				}, 0);
			}
		});
	});
};
const onClick = (e) => {
	emits("onClick", e, tinymce);
};
/*内部方法区*/
watch(
	() => props.modelValue,
	(newValue) => {
		contentValue.value = newValue;
	},
	{}
);
watch(
	contentValue,
	(newValue) => {
		emits("update:modelValue", newValue);
	},
	{}
);
onMounted(() => {
	init();
});
</script>

<template>
	<div class="sceditor alm-editor">
		<Editor
			v-model="contentValue"
			ref="editorRef"
			:init="initData"
			:disabled="disabled"
			:placeholder="placeholder"
			@onClick="onClick"
		/>
	</div>
</template>

<style scoped lang="less">
.alm-editor {
	width: 100%;
}
</style>
