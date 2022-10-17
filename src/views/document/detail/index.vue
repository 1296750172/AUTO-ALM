<!--
 * @Author: happain
 * @Date: 2022-10-17 00:09:23
 * @LastEditors: happain
 * @LastEditTime: 2022-10-18 00:26:53
 * @Description:
-->
<script setup>
import { useRoute } from "vue-router";
import useTabs from "@/utils/useTabs";
const app = getCurrentInstance().appContext.config.globalProperties;
const route = useRoute();
console.log(app);

/*初始化区*/
/*数据定义区*/
/*ref引用区*/
/*方法区*/
/*内部方法区*/
onMounted(() => {
	useTabs.setTitle(route.params.title);
});
</script>

<template>
	<div>2222</div>
</template>

<style scoped lang="less"></style>
