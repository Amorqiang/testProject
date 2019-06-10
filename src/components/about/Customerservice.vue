<template id="">
  <div class="customerservice-main clearfix">
    <div class="customerservice-banner">
    </div>
    <div class="customerservice-center">
      <div class="customerservice-center-h2-en">
        <img src="../../assets/img/FREQUENTLY-ASKED-QUESTIONS.png" alt="">
      </div>
      <div class="customerservice-center-h2" v-if="this.$i18n.locale === 'cn'">
        <h2>{{this.$t('about.FAQ')}}</h2>
      </div>
      <div class="FAQ-main">
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item v-for="(item, index) in FAQList" :title="'Q' + (index + (page - 1) * 10 + 1) + '：' +item.title" :name="item.id" :key="item.id">
            <template>
              A{{index + (page - 1) * 10 + 1}}：{{item.content}}
            </template>
          </el-collapse-item>
        </el-collapse>
        <div class="block">
          <el-pagination
            @current-change="handleCurrentChange"
            layout="prev, pager, next"
            :current-page="page"
            :page-size="10"
            :total="totalCount">
          </el-pagination>
        </div>
      </div>
      <div class="customerservice-center-h2-en">
        <img src="../../assets/img/OPERATION-MANUAL.png" alt="">
      </div>
      <div class="customerservice-center-h2" v-if="this.$i18n.locale === 'cn'">
        <h2>{{this.$t('about.operationManual')}}</h2>
      </div>
      <div class="operationManual-main">
        <div v-if="this.$i18n.locale === 'cn' ">
          <a :href="baseUrl+'/common/file/download/30003'" class="operationManual-link">
            <img src="../../assets/img/pdf.png" alt="" >
          </a>
        </div>
        <div v-else>
          <a :href="baseUrl+'/common/file/download/30004'" class="operationManual-link">
            <img src="../../assets/img/pdf.png" alt="">
          </a>
        </div>

      </div>
    </div>
  </div>

</template>
<script type="text/javascript">
  import {baseUrl} from '../../assets/js/env';
  import {selectAllNotice} from '../../assets/js/const';

  export default {
    data() {
      return {
        activeName: '1',
        page: 1,
        totalCount: 0,
        FAQList: [],
        baseUrl: baseUrl
      };
    },
    components: {},
    methods: {
      initData(page, val) {
        this.POST(selectAllNotice, {'body': {'type': '2', 'page': page || '1', 'pageSize': '10'}}, (response) => {
          this.FAQList = response.data;
          this.totalCount = response.totalCount;
          this.page = val || 1;
        });
      },
      handleCurrentChange(val) {
        this.initData(val + '', val);
      }
    },

    mounted() {
      this.initData();
    }
  };
</script>
<style media="screen" lang="less">
  .customerservice-main {
    width: 100%;
    .customerservice-banner {
      background: url("../../assets/img/customerservice-banner.jpg") no-repeat center;
      background-size: cover;
      height: 586px;
    }
    .customerservice-center {
      width: 1100px;
      margin: 0 auto;
      .customerservice-center-h2 {
        margin: 20px auto 43px;
        border-top: 2px solid #cbcbcb;
        width: 150px;
        position: relative;
        h2 {
          margin: 0 0 0 -50px;
          width: 100px;
          color: #636363;
          font-weight: normal;
          font-size: 16px;
          line-height: 24px;
          text-align: center;
          background: #fff;
          position: absolute;
          top: -13px;
          left: 50%;
        }
      }
      .customerservice-center-h2-en {
        margin: 80px 0 26px;
        img {
          display: block;
          margin: 0 auto;
        }
      }
      .FAQ-main {
        .el-collapse,.el-collapse-item__wrap{
          border: none;
          margin-top: 3px;
        }
        .el-collapse-item {
          margin: 26px 0 0;
          .el-collapse-item__arrow {
            width: 5%;
            height: 30px;
            line-height: 30px;
            color: #bebebe;
            margin: auto 0 auto 95%;
            position: absolute;
            top: 0; left: 0; bottom: 0; right: 0;
          }
          .el-icon-arrow-right:before {
            content: "\E603";
            font-size: 28px;
          }
          .el-collapse-item__arrow.is-active {
            -webkit-transform: rotate(0);
            -moz-transform: rotate(0);
            -ms-transform: rotate(0);
            -o-transform: rotate(0);
            transform: rotate(0);
          }
          .el-collapse-item__arrow.is-active:before {
            content: "\E605";
            color: #fff;
          }
          .el-collapse-item__header {
            text-indent: 12px;
            font-size: 16px;
            color: #000;
            height: auto;
            border: none;
            background: #ffffff;
            box-shadow: -1px 1px 1px -1px #999;
            position: relative;
            &.is-active {
              color: #fff;
              background: #0183fd;
            }
          }
          .el-collapse-item__content {
            font-size: 12px;
            color: #262626;
            padding: 0;
            line-height: 38px;
            margin: 20px 0 0 12px;
          }
        }
        .block {
          display: -webkit-flex;
          text-align: center;
        }
        .el-pagination {
          display: inline-block;
          margin: 20px auto 40px;
        }
      }
      .operationManual-main {
        .operationManual-link {
          display: block;
          margin: 32px auto 76px;
          img {
            display: block;
            margin: 0 auto;
          }
        }
      }
    }
  }

</style>

