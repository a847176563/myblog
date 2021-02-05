<template>
  <div class="container">
    <div class="userinfo">
      <div class="nav-left">
        <div class="first">
          <a @click="goWrite">发表文章</a>
        </div>

        <div class="second">
          <a @click="goLogin">登录</a>
        </div>

        <div class="third">
          <a @click="goRegist">注册</a>
        </div>
      </div>
    </div>

    <div class="blog-list">
      <div class="blog" v-for="item in blogList" :key="item.blog_id">
        <h3 class="blog-title">
          <!-- <a href="/blog/detail/">{{item.title}}</a> -->
          <router-link :to="{ path: '/blog/detail/' + item.blog_id }">{{
            item.title
          }}</router-link>
        </h3>
        <p class="blog-content">{{ item.content }}</p>
        <span class="post-time">{{ item.postTime }}</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      blogList: [],
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.$http.get("/blog/list").then((res) => {
        let { state } = res.data;
        if (state == "auth-fail") {
          alert("请求未授权-then!");
        } else if (state == "success") {
          let { blogs } = res.data;
          this.blogList = blogs;
          console.log(blogs);
        }
      });
    },
    goWrite() {
      this.$router.push("/write");
    },
    goLogin() {
      this.$router.push("/login");
    },
    goRegist() {
      this.$router.push("/regist");
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 1700px;
  background-color: white;
  background-size: cover;
  position: absolute;
}
.blog-list {
  width: 815px;
  height: 700px;
  margin: 20px auto;
  background-color: white;
}
.blog {
  background: white;
  padding: 20px;
  margin: 20px auto;
  border-bottom: 2px solid black;
}
.blog-title,
.blog-content,
.post-time {
  margin: 20px 0;
  color: #000;
}
.nav-left {
  background-color: #4e4f50;
  color: white;
  width: 200px;
  height: 475px;
  position: absolute;
  top: 100px;
  left: 20px;
}
.first,
.second,
.third {
  margin-top: 100px;
  text-align: center;
  color: #d9dde2;
  background-color: #4e4f50;
}
</style>
