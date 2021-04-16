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
              v-model="blog"
              :disabled="true"
            />
          </div>
          <div class="addBlog-content">
            <textarea
              placeholder="博客内容"
              v-model="detail"
              :disabled="true"
            ></textarea>
          </div>
          <div class="addBlog-author">
            <label>发布时间：</label>
            <span>{{time}}</span>
          </div>
        </form>
      </el-col>
    </el-row>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      blog: "",
      detail: "",
      time:'',
    };
  },
  created() {
    this.getBlogDetail();
  },
  methods: {
    getBlogDetail() {
      let blogId = this.$route.params.blogId;
      this.$http
        .get("/blog/detail", {
          params: {
            blogId: blogId,
          },
        })
        .then((res) => {
          let state = res.data.state;
          //   let { state, blogDetails } = res.data;
          if (state == "success") {
            this.blog = res.data.blogDetails[0].title;
            this.detail = res.data.blogDetails[0].content;
            this.time = res.data.blogDetails[0].post_time;
          } else {
            this.$notify({
              title: "警告",
              message: "报错",
              type: "warning",
            });
          }
        });

      // .catch((err) => {
      //   // alert('请求未授权-catch!');
      //   this.$router.push("/login");
      // });
    },
  },
};
</script>

<style lang="scss" scoped>
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
  background: #b3c0d1;
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
textarea {
  background: rgb(247, 227, 226);
}
</style>