<template>
  <div>
    <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" @select="handleSelect"
             background-color="#3967c3"
             text-color="#fff" active-text-color="#ffd04b" router>
      <el-menu-item index="/index" class="nav-item">首页</el-menu-item>
      <el-menu-item index="/buyforfeiting" class="nav-item">在售市场</el-menu-item>
      <!-- <el-menu-item index="/saleforfaiting" class="nav-item">发布</el-menu-item> -->
      <el-menu-item index="/company" class="nav-item">会员中心</el-menu-item>
      <el-menu-item index="/aboutplatform" class="nav-item">关于我们</el-menu-item>
    </el-menu>
    <router-view></router-view>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        // activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
        // this.activeIndex = index;
      }
    },
    watch: {
      $router() {
        // this.handleSelect(index)
      }
    }
  };
</script>
<style media="screen">
  .nav-item {
    width: 25%;
    font-size: 18px;
    text-align: center;
  }
</style>
