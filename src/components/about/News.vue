<template id="">
  <div class="news-main clearfix">
    <div class="news-center">
      <h1>{{$t('news.LatestInformation')}}</h1>
      <div class="news-center-inner">

        <table>
          <tr v-for="news in newsList">
            <td style="width:70%;" v-text="news.title" @click="details(news.id)"><p></p></td>
            <td v-text="news.publishDate"><span></span></td>
          </tr>

        </table>


      </div>
      <div class="block">
        <div align="center">
          <el-pagination
            layout="prev, pager, next"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :total="totalCount"
            :page-size="pageSize">
          </el-pagination>
        </div>
      </div>


    </div>

  </div>

</template>
<script type="text/javascript">
  export default {
    data() {
      return {
        newsList: [],
        totalCount: 0,
        currentPage: 1,
        pageSize: 10
      };
    },
    components: {},
    methods: {
      details(id) {
        this.$router.push('/newsdetail?id=' + id);
      },
      handleCurrentChange(val) {
        var self = this;
        let data = {'body': {'type': 1, 'page': val, 'pageSize': 10}};
        this.POST('/common/knowledge/selectAll', data, function (response) {
          console.log(response.data);
          self.newsList = response.data;
          self.totalCount = response.totalCount;
          self.currentPage = response.page;
          self.pageSize = response.pageSize;
        });
      },
      handleSizeChange(val) {
        this.handleCurrentChange(val);
      }
    },
    created() {
      this.handleCurrentChange(1);
    }
  };
</script>
<style media="screen" lang="less" scoped>
  .news-main {
    width: 1100px;
    margin: 0 auto;
    .news-center {
      width: 1100px;
    }
  }

  .news-center-inner table {
    width: 100%;
    border-collapse: collapse;
  }

  .news-center-inner table tr td span {
    margin-left: 40%;
  }

  .news-center-inner td {
    border-top: 1px solid #f5f7fa;
    height: 60px;
    width: 10%;
    font-size: 16px;
    cursor: pointer;
  }

  .news-center-inner tr:hover {
    background: #f5f7fa;
  }

</style>
