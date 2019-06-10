<template id="">
  <div class="mine-page">
    <!--引入头部文件 和导航栏文件 -->
    <!-- <Header></Header> -->
    <!-- <nav-menu></nav-menu> -->
    <el-row class="tac">
      <el-col :span="12">
        <!-- <h5>自定义颜色</h5> -->
        <el-menu default-active="1" class="mine-slider" @open="handleOpen" @close="handleClose"
                 background-color="#3967c3"
                 text-color="#fff" active-text-color="#ffd04b" router>
          <el-menu-item index="/company">
            <i class="el-icon-menu"></i>
            <span slot="title" style="font-size:18px">我的</span>
          </el-menu-item>
          <el-menu-item index="/company">
            <i class="el-icon-menu"></i>
            <span slot="title">企业信息</span>
          </el-menu-item>
          <el-menu-item index="/myassets">
            <i class="el-icon-menu"></i>
            <span slot="title">我的资产</span>
          </el-menu-item>
          <el-menu-item index="/offerbankrunforfeiting">
            <i class="el-icon-menu"></i>
            <span slot="title">我的报价</span>
          </el-menu-item>
          <el-menu-item index="/myhobbyforfeiting">
            <i class="el-icon-menu"></i>
            <span slot="title">我的偏好</span>
          </el-menu-item>
          <el-menu-item index="/myscore">
            <i class="el-icon-menu"></i>
            <span slot="title">我的积分</span>
          </el-menu-item>
          <el-menu-item index="/tellermanage">
            <i class="el-icon-menu"></i>
            <span slot="title">柜员管理</span>
          </el-menu-item>
          <el-menu-item index="/mynews">
            <i class="el-icon-menu"></i>
            <span slot="title">我的消息</span>
          </el-menu-item>
          <el-menu-item index="/passwordreset">
            <i class="el-icon-menu"></i>
            <span slot="title">密码重置</span>
          </el-menu-item>


        </el-menu>
      </el-col>
    </el-row>
    <!-- <div class="two-code">
      <img src="../../assets/twoCode.jpg" alt="">
      <div class="">
        <p>扫一扫</p>
        <p>下载newnew数字资产手机客户端</p>

      </div>


    </div> -->

  </div>
</template>

<script>
  // import Header from './Header.vue'
  export default {
    components: {
      // Header,
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  };
</script>
<style media="screen">
  .mine-page {
    width: 200px;
    float: left;
    margin-right: 0px;
  }

  .mine-slider {
    width: 150px;
    float: left;
    margin-right: 0px;
  }

  .two-code {
    width: 198px;
    /*position: absolute;*/
    top: 502px;
    bottom: 0;
    height: 30%;
    overflow: hidden;
    /*height: 100vh;*/
    border: 1px solid gray;
    text-align: center;
    padding-top: 100px;
  }

  .two-code img {
    width: 150px;
    height: 150px;
  }
</style>
