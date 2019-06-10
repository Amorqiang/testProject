<template id="">
  <div class="aboutplatform-main clearfix">
    <div class="aboutplatform-center">
      <h1>{{$t('about.AboutThePlatform')}}</h1>
      <div class="aboutplatform-center-img">
        <img src="../../assets/logo_02.gif" alt="">
      </div>
      <div class="aboutplatform-center-inner">
<p>{{$t('AboutThePlatform.one')}}</p>
<p>{{$t('AboutThePlatform.two')}}</p>
<br>
      </div>
    </div>
  </div>

</template>
<script type="text/javascript">
export default{
  data() {
    return {
    };
  },
  components: {
  },
  methods: {
  }
};
</script>
<style media="screen" lang="less" scoped>
.aboutplatform-main {
  width: 1100px;
  margin: 0 auto;
  .aboutplatform-center{
    width: 1100px;
    line-height:200%;
  }
}
.aboutplatform-center-img{
  text-align: center;
}
.aboutplatform-center img{
  width: 90px;
  height: 90px;
}
.aboutplatform-center-inner p{
  text-indent: 2rem;
  font-size: 16px;
  line-height: 32px;
  margin: 1em 0;
}

</style>
