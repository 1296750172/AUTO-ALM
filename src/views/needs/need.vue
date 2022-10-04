<!--
 * @Author: happain
 * @Date: 2022-09-19 23:30:21
 * @LastEditors: happain
 * @LastEditTime: 2022-09-21 22:36:32
 * @Description:
-->
<script setup>
import ProjectListCom from "./components/projectListCom.vue";
import NeedContent from "./components/needContent.vue";
</script>

<template>
	<div class="need">
		<!-- 左边项目栏 -->
		<ProjectListCom></ProjectListCom>
		<!-- 右边需求文档模块 -->
		<NeedContent></NeedContent>
	</div>
</template>

<style scoped lang="less">
.need {
	display: flex;
	justify-content: flex-start;
	margin: 0;
	padding: 15px 0px;
	width: 100%;
	height: 100%;
}
</style>
