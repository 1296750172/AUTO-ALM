<template>
	<el-form
		ref="loginForm"
		:model="form"
		:rules="rules"
		label-width="0"
		size="large"
	>
		<el-form-item prop="user">
			<el-input
				v-model="form.user"
				prefix-icon="el-icon-user"
				clearable
				:placeholder="$t('login.userPlaceholder')"
			>
			</el-input>
		</el-form-item>
		<el-form-item prop="password">
			<el-input
				v-model="form.password"
				prefix-icon="el-icon-lock"
				clearable
				show-password
				:placeholder="$t('login.PWPlaceholder')"
			></el-input>
		</el-form-item>
		<el-form-item style="margin-bottom: 10px">
			<el-col :span="24" class="login-forgot">
				<router-link to="/reset_password"
					>{{ $t("login.forgetPassword") }}？</router-link
				>
			</el-col>
		</el-form-item>
		<el-form-item>
			<el-button
				type="primary"
				style="width: 100%"
				:loading="islogin"
				round
				@click="login"
				>{{ $t("login.signIn") }}</el-button
			>
		</el-form-item>
	</el-form>
</template>

<script>
export default {
	data() {
		return {
			form: {
				user: "chenzh07",
				password: "123456",
			},
			rules: {
				user: [
					{
						required: true,
						message: this.$t("login.userError"),
						trigger: "blur",
					},
				],
				password: [
					{
						required: true,
						message: this.$t("login.PWError"),
						trigger: "blur",
					},
				],
			},
			islogin: false,
		};
	},
	watch: {},
	mounted() {},
	methods: {
		// 登陆的逻辑
		async login() {
			// 验证表单
			var validate = await this.$refs.loginForm
				.validate()
				.catch(() => {});
			if (!validate) {
				return false;
			}
			//
			this.islogin = false;
			var data = {
				username: this.form.user,
				// password: this.$TOOL.crypto.MD5(this.form.password),
				password: this.form.password,
			};
			//获取token
			var user = await this.$API.user.login.post(data);

			if (user.code == 200) {
				// 设置cookie 登陆token期限
				this.$TOOL.cookie.set("TOKEN", user.result.token, {
					expires: 24 * 60 * 60 * 7,
				});
				// 获取用户信息
				const userInfo = await this.$API.user.getUserInfo.post();
				console.log(userInfo);
				// 存储到local里
				this.$TOOL.data.set("USER_INFO", userInfo.result);
				this.$TOOL.data.set(
					"ROLES",
					userInfo.result.roleList.map((role) => role.roleValue)
				);
				this.$TOOL.data.set(
					"PERMISSIONS",
					userInfo.result.permissionList.map(
						(permission) => permission.permissionValue
					)
				);
			} else {
				this.islogin = false;
				this.$message.warning(user.message);
				return false;
			}

			// 获取菜单
			var menu = null;
			menu = await this.$API.user.getMenuByRole.post();
			// 系统的菜单
			let res = await this.$API.system.menu.myMenus.get();
			console.log(res);
			if (menu.code == 200) {
				if (menu.result.length == 0) {
					this.islogin = false;
					this.$alert(
						"当前用户无任何菜单权限，请联系系统管理员",
						"无权限访问",
						{
							type: "error",
							center: true,
						}
					);
					return false;
				}
				this.$TOOL.data.set("MENU", menu.result);
			} else {
				this.islogin = false;
				this.$message.warning(menu.message);
				return false;
			}

			this.$router.replace({
				path: "/",
			});
			this.$message.success(`登录成功,欢迎回来`);
			this.islogin = false;
		},
	},
};
</script>

<style></style>
