<template>
  <div>
    <el-form
      ref="loginForm"
      :rules="rules"
      label-width="80px"
      class="login-box"
      :model="form"
    >
      <h3 class="login-title">欢迎登录</h3>
      <el-form-item label="账号" prop="username">
        <el-input
          type="text"
          placeholder="请输入账号"
          v-model="form.username"
        />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          type="password"
          placeholder="请输入密码"
          v-model="form.password"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('loginForm')">登录</el-button>
        <el-button @click="goRes">注册</el-button>
      </el-form-item>
    </el-form>

    <el-dialog
      title="温馨提示"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span>请输入账号和密码</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
      dialogVisible: false,
      rules: {
        username: [
          { required: true, message: "账号不能为空", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.doLogin()
        } else {
          this.$notify({
            title: "警告",
            message: "请检查信息是否正确！！",
            type: "warning",
          });
          return false;
        }
      });
    },
    doLogin() {
      this.$http
        .post("/user/login", {
          username: this.form.username,
          password: this.form.password,
        })
        .then((res) => {
          let { state, token, user } = res.data;
          console.log(user);
          if (state == "success") {
            this.$notify({
              title: "成功",
              message: "登录成功！",
              type: "success",
            });
            //   登录成功
            // 存登录用户信息
            this.$store.commit("storeLoginUser", user);
            this.$store.state.loginUser = this.form.username
            // 存储token
            this.$store.dispatch("setToken", token);
            this.$router.push("/");
          } else {
            //   登录失败
            this.$notify({
              title: "警告",
              message: "请输入正确的账号密码！",
              type: "warning",
            });
          }
        });
    },
    goRes() {
      this.$router.push("/regist");
    },
  },
};
</script>

<style scoped>
.login-box {
  border: 1px solid #dcdfe6;
  width: 350px;
  margin: 180px auto;
  padding: 35px 65px 15px 35px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px #909399;
}

.login-title {
  text-align: center;
  margin: 0 auto 40px auto;
  color: #303133;
}
</style>