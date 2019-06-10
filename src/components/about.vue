<template>
  <div class="container">
    <h1>伟大的共产党万岁</h1>
    <span>{{msg}}</span>
  </div>
</template>
<script>
  import {location} from '../assets/js/const'
  export default {
    name: 'about',
    data() {
      return {
        msg: 'hello world'
      }
    },
    created(){
      let that = this;
      this.POST(location, {}, function (response) {
        that.msg = response.data.message;
      })
    }
  }
</script>
<style scoped lang="less">
  .container {
    width: 100%;
    height: 100%;
    h2 {
      font-size: 20px;
      font-weight: normal;
      color: red;
      font-family: '微软雅黑 Light';
    }
  }
</style>
