<template>
  <div class="container">
    <div class="blog">
      <div class="comments">
        <div class="diss" v-for="item in blog" :key="item.comm_id">
          <div class="detail-first">
            <p class="diss-front">文章题目</p>
            <span>{{ item.title }}</span>
          </div>
          <div class="detail-second">
            <p class="diss-front">文章内容</p>
            <span class="blog-content">{{ item.content }}</span>
          </div>
          <div class="detail-third">
            <p class="diss-front">发布时间</p>
            <span>{{ item.post_time }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      blog: [],
      detail: [],
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
          console.log(res);
          let state = res.data.state;
          //   let { state, blogDetails } = res.data;
          if (state == "success") {
            this.blog = res.data.blogDetails;

            console.log(this.blog);
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

<style scoped>
.container {
  position: absolute;
}
.blog {
  width: 1650px;
  margin-left: 20px ;
  padding: 20px;
  background: white;
  color: black;
}
.blog-title {
  padding: 10px;
}
.blog-content {
  padding: 10px;
}
.comment {
  padding: 20px;
}
.comment-info {
  float: right;
}

.detail-first{

  border-bottom:2px solid black ;
  text-align: left;
  padding-bottom: 15px;
}
.detail-second{
  height: 700px;
  margin: 10px auto;
  text-align: left;
}
.detail-third {
  text-align: right;
  margin-bottom: 40px;
}
</style>