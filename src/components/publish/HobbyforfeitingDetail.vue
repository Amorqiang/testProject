<template>
  <div class="my-assets-details">
    <div class="my-assets-details-main">
      <el-card>
        <!--报价中的资产的分类-->
        <h1>{{$t('HobbyForfeiting.FavoringFetingDetails')}}</h1>

        <!--标题和资产编号-->
        <ul class="asset-info clearfix">
          <li>{{$t('MyAssets.assetType')}}</li>
          <li>{{$t('MyAssets.forfaiting')}}</li>
          <li>{{$t('AssetsForSalePage.forfaitingType')}}</li>
          <li>{{detailData.debtType == "1" ? '国内福费廷':'国际福费廷'}}</li>
        </ul>

        <ul class="asset-info clearfix">
          <li>{{$t('MyAssets.acceptanceCurrency')}}</li>
          <li>{{detailData.currency}}</li>
          <li>{{$t('MyAssets.acceptanceAmount')}}</li>
          <li>{{detailData.amount}}</li>
        </ul>

        <ul class="asset-info clearfix">
          <li>{{$t('HobbyForfeiting.discountRate')}}</li>
          <li>{{detailData.discountRate}}</li>
          <li>{{$t('HobbyForfeiting.deadLine')}}</li>
          <li>{{detailData.deadLine}}</li>
        </ul>

        <ul class="asset-info clearfix">
          <li>{{$t('HobbyForfeiting.debtType')}}</li>
          <li>{{detailData.debtType == "1" ? '国内信用证':'国际信用证'}}</li>
          <li>{{$t('HobbyForfeiting.indateMessage')}}</li>
          <li>{{detailData.indateMessage}}</li>
        </ul>

        <ul class="asset-info clearfix">
          <li>{{$t('regist.regionCountry')}}</li>
          <li><span>{{(this.$i18n.locale == 'cn') ? detailData.areaName:
          detailData.areaNameEn}}</span>&nbsp&nbsp&nbsp<span>{{(this.$i18n.locale == 'cn') ? detailData.countryName:
          detailData.countryNameEn}}</span></li>
        </ul>
        <router-link to="myhobbyforfeiting">
          <el-button type="primary" size="mini">{{$t('HobbyForfeiting.back')}}</el-button>
        </router-link>
      </el-card>

    </div>
  </div>
</template>

<script>
  import {assetsBuyingDetail} from '../../assets/js/const';

  export default {
    data() {
      return {
        detailData: {}
      };
    },
    methods: {
      initData() {
        let that = this;
        that.POST(assetsBuyingDetail, {body: {'id': that.$route.query.id}}, function (response) {
          that.detailData = response.data;
          that.detailData.areaId = response.data.areaName;
          that.detailData.countryId = response.data.countryName;
        });
      }
    },
    mounted() {
      this.initData();
    }
  };
</script>

<style lang="less">
  /*.my-assets-details {*/
    /*width: 1100px;*/
    /*margin: 0 auto;*/
    /*overflow: hidden;*/
    /*.my-assets-details-main {*/
      /*float: left;*/
      /*width: 1100px;*/
      /*ul {*/
        /*font-size: 15px;*/
        /*padding-bottom: 15px;*/
      /*}*/
      /*li {*/
        /*float: left;*/
        /*width: 30%;*/
        /*line-height: 30px;*/
        /*margin-top: 15px;*/
      /*}*/
      /*span {*/
        /*font-weight: bold;*/
      /*}*/
      /*.el-table th {*/
        /*background: #409eff;*/
      /*}*/
      /*.el-table th > .cell {*/
        /*font-size: 15px;*/
        /*color: #fff;*/
      /*}*/
      /*.el-table .cell {*/
        /*font-size: 14px;*/
      /*}*/
    /*}*/
  /*}*/
  /*.my-assets-details-main .asset-info {*/
    /*border: 1px solid #dcdfe6;*/
    /*box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);*/
  /*}*/
  /*.my-assets-details-main .offer-info {*/
    /*border: 1px solid #dcdfe6;*/
    /*box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);*/
  /*}*/
  /*.saleforfaiting-button {*/
    /*float: left;*/
    /*margin-top: 40px;*/
  /*}*/
  /*.my-assets-details {*/
    /*width: 1100px;*/
    /*margin: 0 auto;*/
    /*overflow: hidden;*/
    /*.my-assets-details-main {*/
      /*float: left;*/
      /*width: 1100px;*/
      /*ul {*/
        /*font-size: 15px;*/
        /*padding-bottom: 15px;*/
      /*}*/
      /*li {*/
        /*float: left;*/
        /*width: 30%;*/
        /*height: 30px;*/
        /*line-height: 30px;*/
        /*margin-top: 15px;*/
      /*}*/
      /*span {*/
        /*font-weight: bold;*/
      /*}*/
      /*.el-table th {*/
        /*background: #409eff;*/
      /*}*/
      /*.el-table th > .cell {*/
        /*font-size: 15px;*/
        /*color: #fff;*/
      /*}*/
      /*.el-table .cell {*/
        /*font-size: 14px;*/
      /*}*/
    /*}*/
  /*}*/

  /*.my-assets-details-main .asset-info {*/
    /*border: 1px solid #dcdfe6;*/
    /*box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);*/
  /*}*/

  /*.my-assets-details-main .offer-info {*/
    /*border: 1px solid #dcdfe6;*/
    /*box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);*/
  /*}*/

  /*.infoblock {*/
    /*display: block;*/
  /*}*/

  /*.infonone {*/
    /*display: none;*/
  /*}*/

  /*#app {*/
    /*background: #f5f5f5;*/
  /*}*/

  .el-card {
    margin: 30px auto 24px;
    width: 1100px;
    box-sizing: border-box;
    padding: 0 150px 40px;
    background: #fff;
    h1 {
      font-weight: normal;
      text-align: center;
      font-size: 24px;
    }
    ul {
      margin: 1em 0;
      border-bottom: 1px solid #ccc;
      li {
        float: left;
        width: 23%;
        height: 40px;
        text-align: center;
        font-size: 14px;
        line-height: 40px;
      }
      li:nth-child(2n-1) {
        text-align: left;
        padding-right: 20px;
      }
      li:nth-child(2n) {
        text-align: left;
        color: #bababa;
        width: 24%;
      }
    }
    .el-button {
      margin-top: 60px;
    }
  }
</style>
