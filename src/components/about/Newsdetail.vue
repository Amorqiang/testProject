<template id="">
  <div class="newsdetail-main clearfix">
    <div class="newsdetail-center">

      <div class="newsdetail-center-inner">
        <center><h1>{{title}}</h1></center>
        <p><span>{{$t('news.Source')}}：{{source}}</span><span>{{$t('news.ReleaseDate')}}：{{publishDate}}</span></p>
        <br/>
        <p v-html=content></p>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {selectById} from '../../assets/js/const.js';

  export default {
    data() {
      return {
        title: {},
        source: {},
        publishDate: {},
        content: {}
      };
    },
    components: {},
    methods: {},
    created() {
      var self = this;
      let data = {'body': {'id': this.$route.query.id + ''}};
      this.POST(selectById, data, function (res) {
        console.log(res.data);
        self.title = res.data.title;
        self.content = res.data.content;
        self.source = res.data.source;
        self.publishDate = res.data.publishDate;
      });
    }
  };
</script>
<style media="screen" lang="less">
  .newsdetail-main {
    width: 1100px;
    margin: 0 auto;
    .newsdetail-center {
      width: 1100px;
    }
  }

  .newsdetail-center-inner span {
    margin-left: 20%;
  }

  .newsdetail-center-inner p {
    text-indent: 2rem
  }

  /*.news-center-inner table{
    width: 100%;
    border-collapse:collapse;
  }
  .news-center-inner table tr td span {
    margin-left: 40%;
  }

  .news-center-inner td{
    border-top: 1px solid #f5f7fa;
    height: 60px;
    width: 10%;
  }

  .news-center-inner tr:hover{
    background: #f5f7fa;
  }*/

</style>
