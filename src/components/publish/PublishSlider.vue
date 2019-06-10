<template id="">
  <div class="market-page">
    <el-row class="tac">
      <el-col :span="12">
        <!-- <h5>自定义颜色</h5> -->
        <el-menu default-active="1" class="market-slider"  @open="handleOpen"  @close="handleClose"  background-color="#35668f"
        text-color="#fff"  active-text-color="#ffd04b" router>

        <el-menu-item index="">
          <i class=""></i>&nbsp;&nbsp;&nbsp;&nbsp;
          <span slot="title" style="font-size:18px">在售市场</span>
        </el-menu-item>
        <el-menu-item index="/buyforfeiting">
          <i class=""><img src="../../assets/img/市场行情.png" alt=""></i>&nbsp;&nbsp;&nbsp;&nbsp;
          <span slot="title">市场行情</span>
        </el-menu-item>
        <el-menu-item index="/saleforfaiting">
          <i class=""><img src="../../assets/img/出售录入.png" alt=""></i>&nbsp;&nbsp;&nbsp;&nbsp;
          <span slot="title">出售录入</span>
        </el-menu-item>
        <el-menu-item index="/hobbyforfeiting">
          <i class=""><img src="../../assets/img/偏好录入.png" alt=""></i>&nbsp;&nbsp;&nbsp;&nbsp;
          <span slot="title">偏好录入</span>
        </el-menu-item>


      </el-menu>
    </el-col>
  </el-row>
 <!--  <div class="two-code3">
    <img src="../../assets/twoCode.jpg" alt="">
    <div class="">
      <p>扫一扫</p>
      <p>下载newnew数字资产手机客户端</p>

    </div>


  </div> -->

</div>
</template>

<script>
export default {
  components:{
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
}
</script>
<style media="screen">
.market-page{
  width: 200px;
  float: left;
  /*margin-right: 0px;*/
}
.market-slider{
  width: 150px;
  float: left;
  margin-right: 0px;
}

</style>
