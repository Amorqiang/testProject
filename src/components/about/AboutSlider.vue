<template id="">
  <div class="about-page">
    <el-row class="tac">
      <el-col :span="12">
        <!-- <h5>自定义颜色</h5> -->
        <el-menu default-active="1" class="about-slider"  @open="handleOpen"  @close="handleClose"  background-color="#3967c3"
        text-color="#fff"  active-text-color="#ffd04b" router>

        <el-menu-item index="/aboutplatform">
          <i class="el-icon-menu"></i>
          <span slot="title" style="font-size:18px">{{$t('about.about')}}</span>
        </el-menu-item>
        <el-menu-item index="/aboutplatform">
          <i class="el-icon-menu"></i>
          <span slot="title">{{$t('about.introduction')}}</span>
        </el-menu-item>
        <el-menu-item index="/news">
          <i class="el-icon-menu"></i>
          <span slot="title">{{$t('about.information')}}</span>
        </el-menu-item>
        <el-menu-item index="/customerservice">
          <i class="el-icon-menu"></i>
          <span slot="title">{{$t('about.customerService')}}</span>
        </el-menu-item>


      </el-menu>
    </el-col>
  </el-row>
  <!-- <div class="two-code4">
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
.about-page{
  width: 200px;
  float: left;
  margin-right: 0px;
}
.about-slider{
  width: 175px;
  float: left;
  margin-right: 0px;
}
.two-code4{
  width: 198px;
  /*position: absolute;*/
  top: 502px;
  bottom: 0;
  height: 450px;
  overflow: hidden;
  /*height: 100vh;*/
  border: 1px solid gray;
  text-align: center;
  padding-top: 100px;
}
.two-code4 img{
  width: 150px;
  height: 150px;
}
</style>
