<template>
  <div class="container">
    <div class="title">
      <h1>发表文章</h1>
      <p>题目：</p>
      <p><input type="text" v-model="title" /></p>
    </div>
    <div class="content">
      <p>
        <textarea
          name=""
          id=""
          cols="30"
          rows="10"
          v-model="content"
        ></textarea>
      </p>
    </div>
    <div class="btn">
      <p>
        <button @click="postBlog">发表</button>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "",
      content: "",
    };
  },
  created() {},
  methods: {
    postBlog() {
      let loginUser = this.$store.state.loginUser;
      if (loginUser) {
        this.$http
          .post("/blog/write", {
            title: this.title,
            content: this.content,
            userId: loginUser.user_id,
          })
          .then((res) => {
            let { state } = res.data;
            if (state == "success") {
              this.$router.push("/index");
            } else {
              alert("发表文章失败!");
            }
          });
      } else {
        alert("你还没登录呢，滚去登录!");
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container{
  height: 1200px;
}
.body {
  background-color: antiquewhite;
}

input,textarea{
  width: 75%;
}

textarea {
  height: 500px;
}
</style>