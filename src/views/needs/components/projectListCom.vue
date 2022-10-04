<!--
 * @Author: happain
 * @Date: 2022-09-20 23:38:32
 * @LastEditors: happain
 * @LastEditTime: 2022-09-22 00:31:06
 * @Description:
-->
<script setup>
const hideFlashRef = ref(false);
const hideFlashClass = computed(() => ({
	"need-flash": hideFlashRef.value,
	"hide-need-flash": !hideFlashRef.value,
	animate__animated: true,
}));

// 隐藏菜单
const hideFlash = () => {
	hideFlashRef.value = !hideFlashRef.value;
};
</script>

<template>
	<div :class="hideFlashClass">
		<div class="hide-flash" v-show="!hideFlashRef" @click="hideFlash()">
			<el-icon :size="20"><Expand /></el-icon>
		</div>
		<div class="flash-header" v-show="hideFlashRef">
			<div>
				<span class="title">项目列表</span>
			</div>
			<div class="flash-show" @click="hideFlash()">
				<el-icon :size="20"><Fold /></el-icon>
			</div>
		</div>
		<div class="flash-content" v-show="hideFlashRef">
			<div class="op">
				<el-button type="primary">添加项目</el-button>
				<el-button type="danger">全部清除</el-button>
			</div>
			<div class="content"></div>
		</div>
	</div>
</template>

<style scoped lang="less">
.hide-need-flash {
	margin-top: 2px;
	padding: 20px 0px;
	box-shadow: 0px 0px 5px #a09f9f;
}

.hide-flash {
	padding: 8px 8px;
}

.hide-flash:hover {
	background-color: #e5e5e5;
}

.need-flash:hover {
	box-shadow: 0px 0px 5px #a09f9f;
}

.need-flash {
	background-color: #fff;
	animation: fadeInLeft 0.5s;
	padding: 0px 15px 0 20px;
	margin-right: 10px;
	flex: 1;
	min-width: 20%;

	.flash-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		height: 10%;
		.title {
			font-size: 17px;
			letter-spacing: 1px;
			font-weight: bold;
		}
		.flash-show {
			padding: 8px;
		}

		.flash-show:hover {
			background-color: #e5e5e5;
		}
	}

	.flash-content {
		padding-top: 10px;
		height: auto;
		width: 100%;
		display: flex;
		flex-direction: column;

		.op {
			width: auto;
			display: flex;
			justify-content: space-start;
			flex-wrap: wrap;
			align-items: center;

			div {
				padding-right: 10px;
				padding-bottom: 10px;
			}
		}

		.content {
			height: 400px;
			overflow-y: auto;
		}
	}
}
</style>
