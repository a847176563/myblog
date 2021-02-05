<template>
    <div class="container">
        <div class="login-form">
            <h3>用户登录</h3>
            <p>
                用户名：<input type="text" name="username" v-model="username">
            </p>
            <p>
                密码：<input type="password" name="password" v-model="password">
            </p>
            <p>
                昵称：<input type="text" name="nickname" v-model="nickname">
            </p>

            <p>
                <button @click="doRegist" class="btn">注册</button>
            </p>
        </div>
    </div>
</template>


<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      nickname:'',
    };
  },
  methods: {
    doRegist() {
      this.$http
        .post("/user/regist", {
          username: this.username,
          password: this.password,
          nickname:this.nickname,
        })
        .then((res) => {
          let {state, token, user} = res.data;
          if (state == "success") {
            //   注册成功
            // 存注册用户信息
           
            // 存储token
            
            this.$router.push('/login');
          } else {
            //   登录失败
            alert('用户名不能为空!');
          }
        });
    },
  },
};
</script>

<style scoped>
.container {
  background-color: white ;
  background-size: cover;
}
.login-form {
  width: 650px;
  background: #cccccc;
  margin: 1px auto;
  padding: 40px 0;
  text-align: center;
  color: black;
}
.login-form p {
  padding: 20px 0;
}
.btn {
  width: 70px;
}
</style>