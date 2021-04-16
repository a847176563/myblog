<template>
  <div>
    <el-form
      ref="loginForm"
      :model="form"
      :rules="rules"
      label-width="80px"
      class="login-box"
    >
      <h3 class="login-title">注册</h3>
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
      <el-form-item label="昵称" prop="nickname">
        <el-input
          type="text"
          placeholder="请输入账号"
          v-model="form.nickname"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('loginForm')"
          >注册</el-button
        >
        <el-button @click="goLogin">去登陆</el-button>
      </el-form-item>
    </el-form>

    <el-dialog title="温馨提示" :visible.sync="dialogVisible" width="30%">
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
        nickname: "",
      },
      dialogVisible: false,
      rules: {
        username: [
          { required: true, message: "账号不能为空", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
        nickname: [
          { required: true, message: "个人昵称不能为空", trigger: "blur" },
          {
            min: 1,
            max: 10,
            message: "长度在 1 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.doRegist();
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
    goLogin() {
      this.$router.push("/login");
    },
    doRegist() {
      this.$http
        .post("/user/regist", {
          username: this.form.username,
          password: this.form.password,
          nickname: this.form.nickname,
        })
        .then((res) => {
          let { state, token, user } = res.data;
          if (state == "success") {
            //   注册成功
            // 存注册用户信息

            // 存储token

            this.$router.push("/login");
          } else {
            //   登录失败
            this.$notify({
              title: "警告",
              message: "请检查信息是否正确！！",
              type: "warning",
            });
          }
        });
    },
  },
};
</script>

<style scoped>
.login-box {
  border: 1px solid #dcdfe6;
  width: 400px;
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