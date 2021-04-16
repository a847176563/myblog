<template>
  <el-container direction="vertical" class="addBlog-main">
    <el-row>
      <el-col>
        <form id="submit-form">
          <div class="addBlog-title">
            <el-input
              type="text"
              placeholder="博客标题"
              required="required"
              v-model="title"
            />
          </div>
          <div class="addBlog-content">
            <textarea placeholder="博客内容" v-model="content"></textarea>
          </div>
          <div class="addBlog-author">
            <label>作者：</label>
            <span>{{ loginUser }}</span>
          </div>
          <el-button class="addBlog-btn" @click="postBlog">更新博客</el-button>
        </form>
      </el-col>
    </el-row>
  </el-container>
</template>
<script>
export default {
  data() {
    return {
      title: "",
      content: "",
      blogId: "",
      loginUser:'',
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    getUser() {
      console.log(666);
      if (this.$store.state.loginUser) {
        this.loginUser = this.$store.state.loginUser;
      } else {
        this.$notify({
          title: "警告",
          message: "token过期了，去登陆！",
          type: "warning",
        });
        this.$router.push("/login");
        console.log();
      }
    },
    postBlog() {
      this.blogId = this.$store.state.blogId;
      if (this.title == "") {
        this.$notify({
          title: "警告",
          message: "标题不能为空！",
          type: "warning",
        });
        return;
      } else if (this.content == "") {
        this.$notify({
          title: "警告",
          message: "内容不能为空！",
          type: "warning",
        });
        return;
      } else {
        if (this.$store.state.loginUser) {
          if (this.title == "") {
            this.$notify({
              title: "警告",
              message: "标题不能为空！",
              type: "warning",
            });
            return;
          }
          this.$http
            .post("/blog/revise", {
              title: this.title ,
              content: this.content,
              blogId: this.blogId,
            })
            .then((res) => {
              let { state } = res.data;
              if (state == "success") {
                this.$notify({
                  title: "成功",
                  message: "博客修改成功！",
                  type: "success",
                });
                this.$router.push("/");
              } else {
                this.$notify({
                  title: "警告",
                  message: "修改失败!",
                  type: "warning",
                });
              }
            });
        } else {
          this.$notify({
            title: "警告",
            message: "你还没登录或token过期",
            type: "warning",
          });
          this.$router.push("/login");
        }
      }
    },
  },
};
</script>

<style scoped>
#submit-form {
  padding: 20px;
}
.addBlog-title,
.addBlog-content,
.addBlog-category,
.addBlog-author {
  margin-bottom: 20px;
}
.addBlog-main {
  margin: 200px auto 0;
  width: 850px;
  background: #818d9c;
  color: #fff;
  -webkit-border-radius: 8px;
  -moz-border-radius: 8px;
  border-radius: 8px;
  padding: 20px;
  z-index: 0;
}
.addBlog-content textarea {
  width: 97.5%;
  min-height: 200px;
  border: 0;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  padding: 10px;
}
.addBlog-category {
  float: left;
}
.addBlog-category input {
  margin-right: 20px;
}
.addBlog-author {
  float: right;
  margin-right: 30px;
}
.addBlog-author select {
  min-width: 150px;
  height: 25px;
  padding: 0 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
}
.el-button {
  float: right;
  margin-right: 30px;
}
.preview-blog-head {
  text-align: center;
}
.preview-content {
  background: rgb(247, 227, 226);
  color: #696969;
  margin: 10px 20px;
  padding: 20px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  line-height: 30px;
  overflow: auto;
  -ms-word-wrap: break-word;
  word-wrap: break-word;
}
.preview-content h2 {
  text-align: center;
  margin-bottom: 10px;
}
.preview-blog-article {
  text-indent: 2em;
  font-size: 15px;
}
.addBlog-btn {
  position: absolute;
  left: 20px;
}
</style>
