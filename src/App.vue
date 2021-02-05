<template>
  <div id="app">
    <div id="nav">
      <h4>我的个人博客</h4>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss" scoped>
#app {

  text-align: center;
  color: #d9dde2;
  background-color: #4e4f50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
