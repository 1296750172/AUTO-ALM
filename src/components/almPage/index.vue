<!--
 * @Author: happain
 * @Date: 2022-10-06 20:42:18
 * @LastEditors: happain
 * @LastEditTime: 2022-10-06 21:33:19
 * @Description:
-->
<script setup>
/*初始化区*/
const props = defineProps({
	page: {
		type: Object,
		default: () => {
			return { pageNum: 1, pageSize: 20, total: 0 };
		},
	},
});
const emits = defineEmits(["changePage"]);
/*数据定义区*/
/*ref引用区*/
/*方法区*/
const handleSizeChange = (value) => {
	emits("changePage", value);
};
const handleCurrentChange = (value) => {
	emits("changePage", value);
};
/*内部方法区*/
</script>

<template>
	<div class="page">
		<el-pagination
			:currentPage="props.page.pageNum"
			:page-size="props.page.pageSize"
			background
			small
			layout="total, sizes, prev, pager, next, jumper"
			:total="props.page.total"
			@size-change="handleSizeChange"
			@current-change="handleCurrentChange"
		/>
	</div>
</template>

<style scoped lang="less">
.page {
	width: "100%";
	padding: 10px;
}
</style>
