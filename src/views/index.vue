<template>
  <el-container style="height: 100%; border: 2px solid #eee">
    <el-header style="height: 120px; text-align: right; font-size: 12px">
      <div class="my-blog">
        <span class="my-welcome">王同学的博客</span>
        <span class="my-user">当前用户：{{ this.username }}</span>
      </div>
    </el-header>

    <el-container>
      <el-aside
        class="my-aside"
        width="332px"
        style="background-color: rgb(238, 241, 246)"
      >
        <el-menu :default-openeds="['1', '3']">
          <el-submenu index="1">
            <template slot="title"
              ><i class="el-icon-message"></i>文章操作</template
            >
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="1-1" @click="goWrite">写文章</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"
              ><i class="el-icon-menu"></i>账号操作</template
            >
            <el-menu-item-group>
              <template slot="title">分组一</template>
              <el-menu-item index="2-1" @click="goLogin">更换账户</el-menu-item>
              <el-menu-item index="2-2" @click="goRegist"
                >注册新用户</el-menu-item
              >
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"
              ><i class="el-icon-setting"></i>导航三</template
            >
            <el-menu-item-group>
              <template slot="title">杂项</template>
              <el-menu-item index="3-1">测试页</el-menu-item>
              <el-menu-item index="3-2">选项2</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
        <div class="cale">
          <el-calendar v-model="value"> </el-calendar>
        </div>
      </el-aside>

      <el-main class="blog-container">
        <div class="blog" v-for="item in blogList" :key="item.blog_id">
          <el-container>
            <el-header class="blog-header">
              <h3 class="blog-title">
                <a @click="goDetil(item.blog_id)">{{ item.title }}</a>
              </h3>
            </el-header>
            <el-main class="blog-main">
              <div class="blog-list">
                <p class="blog-content">{{ item.content }}</p>
                <span class="post-time">{{ item.postTime }}</span>
                <div class="blog-main-btn">
                  <el-button class="btn1" plain @click="goChange(item.blog_id)">修改</el-button>
                  <el-button class="btn2" type="danger" plain @click="del(item.blog_id)"
                    >删除</el-button
                  >
                </div>
              </div>
            </el-main>
          </el-container>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      blogList: [],
      username: "",
      value: new Date(),
    };
  },
  created() {
    this.getData();
  },
  methods: {
    del(id){
      this.$http.post("/blog/delete",{
        blogId : id
      }).then((res)=>{
        this.$router.go(0);
        if(res.data.state == 'success'){
          this.$notify({
              title: "成功",
              message: "删除成功！",
              type: "success",
            });
        }
        
      })
    },
    goChange(id){
      this.$store.state.blogId = id
      this.$router.push("/revise/detail/" + id);
    },
    getData() {
      this.$http.get("/blog/list").then((res) => {
        let { state } = res.data;
        if (this.$store.state.loginUser) {
          this.username = this.$store.state.loginUser;
        } else {
          this.username = "暂时没有用户或token过期，请登录";
        }
        if (state == "auth-fail") {
          this.$notify({
            title: "警告",
            message: "请求未授权-then!",
            type: "warning",
          });
        } else if (state == "success") {
          let { blogs } = res.data;
          this.blogList = blogs;
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
    goDetil(id) {
      this.$router.push("/blog/detail/" + id);
    },
  },
};
</script>

<style scoped>
.cale {
  margin: 5px auto;
}
.el-header {
  background-color: #818d9c;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
  margin-top: 20px;
  border: 2px solid rgb(238, 241, 246);
}

.blog-title {
  text-align: center;
  margin: auto;
  font-size: 12px;
}
.el-calendar {
  border: solid 2px rgb(238, 241, 246);
}

.my-welcome {
  position: absolute;
  left: auto;
  font-size: 30px;
  color: #444444;
}
.my-user {
  position: absolute;
  top: 60px;
  right: 0;
  color: #444444;
}
.my-blog {
  position: relative;
  display: block;
  margin: auto;
  text-align: center;
}
.blog-container {
}
.blog-header {
  border-radius: 20px 20px 0 0;
}
.blog-main {
  border-radius: 0 0 20px 20px;
  border: solid 1px rgb(238, 241, 246);
  background: rgb(245, 240, 240);
  margin-bottom: 10px;
}
.blog-main-btn{
  position: relative;
}
.btn2{
  position: absolute;
  right: 0%;
}
</style>
