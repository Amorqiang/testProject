<template>
  <div>
    <el-card>
      <!--报价中的资产的分类-->
      <!--<h1 style="text-align: left;">{{ type === 1 ? $t('myPrice.assetsPriceDetil') : $t('AssetsForSalePage.AssetsDetails')}}-->
      <!--<template v-if="this.assetsNameView != ''">-->
       <!-- - {{assetsNameView}}-->
      <!--</template>-->
      <!--</h1>-->
      <h1 style="text-align: left;margin-left: 18px;">{{$t('AssetsForSalePage.AssetsDetails')}}</h1>

      <!--标题和资产编号-->
      <ul class="clearfix">
        <li>{{$t('myPrice.factoringNo')}}</li>
        <li>{{detailData.factoringNo}}</li>
        <li>{{$t('MyAssets.factoringType')}}</li>
        <li> {{(detailData.factoringType == '1')? $t('MyAssets.factoringType1'):''}}
          {{(detailData.factoringType == '2')? $t('MyAssets.factoringType2'):''}}
          {{(detailData.factoringType == '3')? $t('MyAssets.factoringType3'):''}}
          {{(detailData.factoringType == '4')? $t('MyAssets.factoringType4'):''}}
        </li>
      </ul>

      <ul class="clearfix">
        <li>{{$t('MyAssets.factoringName')}}</li>
        <li>{{detailData.factoringName}}</li>
        <li>{{$t('MyAssets.amount')}}</li>
        <li>{{detailData.amount}}</li>
      </ul>

      <ul class="clearfix">
        <li>{{$t('MyAssets.currency')}}</li>
        <li>{{detailData.currency}}</li>
        <li>{{$t('publishFactoring.transferRate')}}</li>
        <li>{{detailData.transferRate}}%</li>
      </ul>

      <ul class="clearfix">
        <li>{{$t('MyAssets.area')}}</li>
        <li>{{ (this.$i18n.locale == 'cn') ? detailData.areaName:detailData.enAreaName}}</li>
        <li>{{$t('MyAssets.country')}}</li>
        <li>{{ (this.$i18n.locale == 'cn') ? detailData.countryName:detailData.enCountryName}}</li>
      </ul>

      <ul class="clearfix">
        <li>{{$t('factoringDetail.maturity')}}</li>
        <li>{{detailData.maturity}}</li>
        <li>{{$t('MyAssets.indateMessage')}}</li>
        <li>{{detailData.indateMessage}}</li>
      </ul>

      <ul class="clearfix">
        <li>{{$t('publishFactoring.isCove')}}</li>
        <li> {{detailData.isCove == '1'? $t('MyAssets.insured'):$t('MyAssets.NoInsured')}}</li>
        <li> {{$t('myPrice.inUnderwriter')}}</li>
        <li>{{detailData.insurer}}</li>
      </ul>

      <ul class="clearfix">
        <li>{{$t('myPrice.factoringSeller')}}</li>
        <li>{{detailData.seller}}</li>
        <li>{{$t('factoringDetail.originators')}}</li>
        <li>{{detailData.originators}}</li>
      </ul>

      <ul class="clearfix">
        <li>{{$t('factoringDetail.obligors')}}</li>
        <li>{{detailData.obligors}}</li>
        <!--<li>{{$t('factoringDetail.reportInformation')}}</li>-->
        <!--<li><img src="../../assets/img/download.png" @click="downloadAsset" style="cursor: pointer"  :alt="$t('forfeitingdetail.download')"></li>-->
      </ul>

      <ul class="clearfix" v-show="factoringContract != ''">
        <!--保理合同-->
        <li>{{$t('factoringContract.factoringContract')}}</li>
        <div style="width: 500px;height: 50px;">
          <div v-for="item in factoringContract" style="margin: 10px 10px;float: left;width: 150px;height: 100px;background: rgba(0,0,0,0.1);">
            <div style="position: relative;" v-if="item.substr(item.length-4) == '.pdf'">
              <img  src="../../assets/img/pdf.png" style="height: 44px; width: 37px;left: 54px;position: absolute;top: 30px;"
                    @click="downloadAsset(item)" alt="">
              <a class="down-style">
                <img src="../../assets/img/download.png" @click="downloadAsset(item)" alt="">
              </a>
              <img class="yulan" src="../../assets/img/Sale-of-entry-zoom-in.png" @click="downloadAsset(item)" alt="">
            </div>
            <div style="position: relative;" v-if="item.substr(item.length-4) == '.rar'">
              <img src="../../assets/img/rar.png" style="height: 44px; width: 37px;left: 54px;position: absolute;top: 30px;"
                   @click="downloadAsset(item)" alt="">
              <a class="down-style">
                <img src="../../assets/img/download.png" @click="downloadAsset(item)" alt="">
              </a>
            </div>
            <div style="position: relative;" v-show="item.substr(item.length-4) == '.zip'">
              <img src="../../assets/img/zip.png" style="height: 44px; width: 37px;left: 54px;position: absolute;top: 30px;"
                   @click="downloadAsset(item)" alt="">
              <a class="down-style">
                <img src="../../assets/img/download.png" @click="downloadAsset(item)" alt="">
              </a>
            </div>
            <div style="position: relative;" v-show="(item.substr(item.lastIndexOf('.') ) == '.png') || (item.substr(item.lastIndexOf('.') ) == '.jpg') ||(item.substr(item.lastIndexOf('.') ) == '.jpeg')">
              <img class="cener-style"  :src=item style="height: 80px; width: 120px;left: 17px;position: absolute;top: 10px;"
                   alt="">
              <a class="down-style">
                <img src="../../assets/img/download.png" @click="downloadAsset(item)" alt="">
              </a>
              <img class="yulan" src="../../assets/img/Sale-of-entry-zoom-in.png" @click="downloadAsset1(item)" alt="">
            </div>
          </div>
        </div>
      </ul>

      <ul class="clearfix" v-show="factoringList != ''">
        <!--货物保险单-->
        <li>{{$t('factoringContract.factoringList')}}</li>
        <div style="width: 500px;height: 50px;">
          <div v-for="item in factoringList" style="margin: 10px 10px;float: left;width: 150px;height: 100px;background: rgba(0,0,0,0.1);">
            <div style="position: relative;" v-if="item.substr(item.length-4) == '.pdf'">
              <img  src="../../assets/img/pdf.png" style="height: 44px; width: 37px;left: 54px;position: absolute;top: 30px;"
                    @click="downloadAsset(item)" alt="">
              <a class="down-style">
                <img src="../../assets/img/download.png" @click="downloadAsset(item)" alt="">
              </a>
              <img class="yulan" src="../../assets/img/Sale-of-entry-zoom-in.png" @click="downloadAsset(item)" alt="">
            </div>
            <div style="position: relative;" v-if="item.substr(item.length-4) == '.rar'">
              <img src="../../assets/img/rar.png" style="height: 44px; width: 37px;left: 54px;position: absolute;top: 30px;"
                   @click="downloadAsset(item)" alt="">
              <a class="down-style">
                <img src="../../assets/img/download.png" @click="downloadAsset(item)" alt="">
              </a>
            </div>
            <div style="position: relative;" v-show="item.substr(item.length-4) == '.zip'">
              <img src="../../assets/img/zip.png" style="height: 44px; width: 37px;left: 54px;position: absolute;top: 30px;"
                   @click="downloadAsset(item)" alt="">
              <a class="down-style">
                <img src="../../assets/img/download.png" @click="downloadAsset(item)" alt="">
              </a>
            </div>
            <div style="position: relative;" v-show="(item.substr(item.lastIndexOf('.') ) == '.png') || (item.substr(item.lastIndexOf('.') ) == '.jpg') ||(item.substr(item.lastIndexOf('.') ) == '.jpeg')">
              <img class="cener-style"  :src=item style="height: 80px; width: 120px;left: 17px;position: absolute;top: 10px;"
                   alt="">
              <a class="down-style">
                <img src="../../assets/img/download.png" @click="downloadAsset(item)" alt="">
              </a>
              <img class="yulan" src="../../assets/img/Sale-of-entry-zoom-in.png" @click="downloadAsset1(item)" alt="">
            </div>
          </div>
        </div>
      </ul>

      <ul class="clearfix" v-show="factoringDocument != ''">
        <!--运输单据-->
        <li>{{$t('factoringContract.factoringDocument')}}</li>
        <div style="width: 500px;height: 50px;">
          <div v-for="item in factoringDocument" style="margin: 10px 10px;float: left;width: 150px;height: 100px;background: rgba(0,0,0,0.1);">
            <div style="position: relative;" v-if="item.substr(item.length-4) == '.pdf'">
              <img  src="../../assets/img/pdf.png" style="height: 44px; width: 37px;left: 54px;position: absolute;top: 30px;"
                    @click="downloadAsset(item)" alt="">
              <a class="down-style">
                <img src="../../assets/img/download.png" @click="downloadAsset(item)" alt="">
              </a>
              <img class="yulan" src="../../assets/img/Sale-of-entry-zoom-in.png" @click="downloadAsset(item)" alt="">
            </div>
            <div style="position: relative;" v-if="item.substr(item.length-4) == '.rar'">
              <img src="../../assets/img/rar.png" style="height: 44px; width: 37px;left: 54px;position: absolute;top: 30px;"
                   @click="downloadAsset(item)" alt="">
              <a class="down-style">
                <img src="../../assets/img/download.png" @click="downloadAsset(item)" alt="">
              </a>
            </div>
            <div style="position: relative;" v-show="item.substr(item.length-4) == '.zip'">
              <img src="../../assets/img/zip.png" style="height: 44px; width: 37px;left: 54px;position: absolute;top: 30px;"
                   @click="downloadAsset(item)" alt="">
              <a class="down-style">
                <img src="../../assets/img/download.png" @click="downloadAsset(item)" alt="">
              </a>
            </div>
            <div style="position: relative;" v-show="(item.substr(item.lastIndexOf('.') ) == '.png') || (item.substr(item.lastIndexOf('.') ) == '.jpg') ||(item.substr(item.lastIndexOf('.') ) == '.jpeg')">
              <img class="cener-style"  :src=item style="height: 80px; width: 120px;left: 17px;position: absolute;top: 10px;"
                   alt="">
              <a class="down-style">
                <img src="../../assets/img/download.png" @click="downloadAsset(item)" alt="">
              </a>
              <img class="yulan" src="../../assets/img/Sale-of-entry-zoom-in.png" @click="downloadAsset1(item)" alt="">
            </div>
          </div>
        </div>
      </ul>

      <ul class="clearfix" v-show="downloadUrl != ''">
        <!--财务报表-->
        <li>{{$t('factoringDetail.reportInformation')}}</li>
        <div style="width: 500px;">
          <div v-for="item in downloadUrl" style="margin: 10px 10px;float: left;width: 150px;height: 100px;background: rgba(0,0,0,0.1);">
            <div style="position: relative;" v-if="item.substr(item.length-4) == '.pdf'">
              <img  src="../../assets/img/pdf.png" style="height: 44px; width: 37px;left: 54px;position: absolute;top: 30px;"
                    @click="downloadAsset(item)" alt="">
              <a class="down-style">
                <img src="../../assets/img/download.png" @click="downloadAsset(item)" alt="">
              </a>
              <img class="yulan" src="../../assets/img/Sale-of-entry-zoom-in.png" @click="downloadAsset(item)" alt="">
            </div>
            <div style="position: relative;" v-if="item.substr(item.length-4) == '.rar'">
              <img src="../../assets/img/rar.png" style="height: 44px; width: 37px;left: 54px;position: absolute;top: 30px;"
                   @click="downloadAsset(item)" alt="">
              <a class="down-style">
                <img src="../../assets/img/download.png" @click="downloadAsset(item)" alt="">
              </a>
            </div>
            <div style="position: relative;" v-show="item.substr(item.length-4) == '.zip'">
              <img src="../../assets/img/zip.png" style="height: 44px; width: 37px;left: 54px;position: absolute;top: 30px;"
                   @click="downloadAsset(item)" alt="">
              <a class="down-style">
                <img src="../../assets/img/download.png" @click="downloadAsset(item)" alt="">
              </a>
            </div>
            <div style="position: relative;" v-show="(item.substr(item.lastIndexOf('.') ) == '.png') || (item.substr(item.lastIndexOf('.') ) == '.jpg') ||(item.substr(item.lastIndexOf('.') ) == '.jpeg')">
              <img class="cener-style"  :src=item style="height: 80px; width: 120px;left: 17px;position: absolute;top: 10px;"
                   alt="">
              <a class="down-style">
                <img src="../../assets/img/download.png" @click="downloadAsset(item)" alt="">
              </a>
              <img class="yulan" src="../../assets/img/Sale-of-entry-zoom-in.png" @click="downloadAsset1(item)" alt="">
            </div>
          </div>
        </div>
      </ul>

      <ul class="clearfix" v-show="factoringCom != ''">
        <!--贸易合同-->
        <li>{{$t('factoringContract.factoringCom')}}</li>
        <div style="width: 1000px; height: 50px;">
          <!--</div>-->
          <!--<div v-for="item in factoringCom" style="margin: 10px 10px;float: left;width: 150px;height: 100px;background: rgba(0,0,0,0.1);">-->
            <!--<div style="position: relative;">-->
              <!--<img class="cener-style"  :src="item.substr(item.lastIndexOf('.') ) == ('.jpg' ||'.png'|| '.jpeg') ? item : ('/static/img/' + item.substr(item.length-3) + '.png')" style="height: 80px; width: 120px;left: 17px;position: absolute;top: 10px;"-->
                   <!--alt="">-->
              <!--<template v-if="item.substr(item.lastIndexOf('.') ) == ('.jpg' ||'.png'|| '.jpeg')">-->
                <!--<img class="yulan" src="../../assets/img/Sale-of-entry-zoom-in.png" @click="downloadAsset1(item)" alt="">-->
                <!--<a class="down-style">-->
                  <!--<img src="../../assets/img/download.png" @click="downloadAsset(item)" alt="">-->
                <!--</a>-->
              <!--</template>-->
              <!--<template v-else-if="item.substr(item.lastIndexOf('.') ) == '.pdf'">-->
                <!--<img class="yulan" src="../../assets/img/Sale-of-entry-zoom-in.png" @click="downloadAsset(item)" alt="">-->
                <!--<a class="down-style">-->
                  <!--<img src="../../assets/img/download.png" @click="downloadAsset(item)" alt="">-->
                <!--</a>-->
              <!--</template>-->
            <!--</div>-->
          <!--</div>-->
          <div v-for="item in factoringCom" style="margin: 10px 10px;float: left;width: 150px;height: 100px;background: rgba(0,0,0,0.1);">
            <div style="position: relative;" v-if="item.substr(item.length-4) == '.pdf'">
              <img  src="../../assets/img/pdf.png" style="height: 44px; width: 37px;left: 54px;position: absolute;top: 30px;"
                    @click="downloadAsset(item)" alt="">
              <a class="down-style">
                <img src="../../assets/img/download.png" @click="downloadAsset(item)" alt="">
              </a>
              <img class="yulan" src="../../assets/img/Sale-of-entry-zoom-in.png" @click="downloadAsset(item)" alt="">
            </div>
            <div style="position: relative;" v-if="item.substr(item.length-4) == '.rar'">
              <img src="../../assets/img/rar.png" style="height: 44px; width: 37px;left: 54px;position: absolute;top: 30px;"
                   @click="downloadAsset(item)" alt="">
              <a class="down-style">
                <img src="../../assets/img/download.png" @click="downloadAsset(item)" alt="">
              </a>
            </div>
            <div style="position: relative;" v-show="item.substr(item.length-4) == '.zip'">
              <img src="../../assets/img/zip.png" style="height: 44px; width: 37px;left: 54px;position: absolute;top: 30px;"
                   @click="downloadAsset(item)" alt="">
              <a class="down-style">
                <img src="../../assets/img/download.png" @click="downloadAsset(item)" alt="">
              </a>
            </div>
            <div style="position: relative;" v-show="(item.substr(item.lastIndexOf('.') ) == '.png') || (item.substr(item.lastIndexOf('.') ) == '.jpg') ||(item.substr(item.lastIndexOf('.') ) == '.jpeg')">
              <img class="cener-style"  :src=item style="height: 80px; width: 120px;left: 17px;position: absolute;top: 10px;"
                   alt="">
              <a class="down-style">
                <img src="../../assets/img/download.png" @click="downloadAsset(item)" alt="">
              </a>
              <img class="yulan" src="../../assets/img/Sale-of-entry-zoom-in.png" @click="downloadAsset1(item)" alt="">
            </div>
          </div>
        </div>
      </ul>
      <el-dialog
        title=""
        :visible.sync="dialogVisible"
        width="360px">
        <span><img :src=imgHref style="width: 300px; height: 300px;" alt=""></span>
      </el-dialog>
    </el-card>
    <!--<downloadDialog v-if="downloadUrl" :show="downloadDialog" v-on:closeDownloadDialog="closeDownloadDialog"-->
    <!--:url="downloadUrl"></downloadDialog>-->
    <el-card :class="detailData.checkState === 130 ? 'infoblock':'infonone'">
      <h2 class="center-two">{{$t('myPrice.transactIn')}}</h2>

      <div v-for="(item,index) in marketPriceData" :key="index">
        <ul class="clearfix">
          <li>{{$t('myPrice.tradiParty')}}</li>
          <li>{{item.bOrgName}}</li>
          <li>{{$t('marketfactoring.transfer_rate')}}</li>
          <li>{{item.discountRate}}%</li>
        </ul>
      </div>
    </el-card>
  </div>

  <!--CREDIT("ST-02-01", "福费廷资产录入信用证参数编码"),
      PROTOCOL("ST-02-02", "福费廷资产录入福费廷协议参数编码"),
      TRADE_CONTRACT("ST-02-05", "贸易合同参数编码"),
      CARRY("ST-02-06", "运输单据参数编码"),
      ADVICE("ST-02-07", "应收账款转让通知书参数编码"),
      FINANCE_REPORT("ST-02-08", "财务报表参数编码"),
      BUY("ST-02-09", "获取购买方确权参数编码"),
      ASSETS_TRANSFER("ST-02-10", "福费廷让渡函参数编码"),
      FACTORING_TRANSFER("ST-02-11", "保理让渡函参数编码"),
      ASSETS_CREDIT_ACCEPTANCE("ST-02-12", "福费廷信用证承兑电参数编码"),
      ASSETS_OFFER_LETTER("ST-02-13", "福费廷要约函参数编码"),
  -->

</template>

<script>
  import {findInfo, marketPriceRead, queryAssetById} from '../../assets/js/const';
  import {assetsState} from '../../assets/js/utils';
  import downloadDialog from '../common/downloadDialog';

  export default {
    data() {
      return {
        assetsName: this.$route.params.assetsName,
        id: this.$route.params.id,
        type: this.$route.params.type,
        detailData: {},
        detailInfo: [],
        bussTypeState: null,
        assetsNameView: '',
        ST0207: '',
        ST0208: '',
        ST0204: '',
        imgHref: '',
        downloadDialog: false,
        dialogVisible: false,
        marketPriceData: [],
        downloadUrl: [], // 财务报表
        factoringContract: [], // 保理合同
        factoringList: [], // 货物保险单
        factoringDocument: [], // 运输单据
        factoringCom: []     // 贸易合同
      };
    },
    filters: {
      resetForm(value, lang) {
        return assetsState(Number(value), lang);
      }
    },
    methods: {
      downloadAsset(item) {
        window.open(item);
        // if (this.detailData.assetAgreement && this.detailData.assetAgreement.length !== 0) {
        //   this.downloadUrl = this.detailData.assetAgreement.ST0208.attachment_url;
        //   this.downloadDialog = true;
        // } else {
        //   this.$message({'message': '未上传保理协议'}, 3000);
        // }
      },
      downloadAsset1(item) {
        this.dialogVisible = true;
        this.imgHref = item;
      },
      closeDownloadDialog() {
        this.downloadDialog = false;
      },
      initData() {
        // console.log(this.id);
        let that = this;
        if ((that.assetsName + '') === '2') {
          this.assetsNameView = this.$t('assetsType.factoring');
          that.POST(findInfo, {body: {'factoringId': that.id}}, function (response) {
            console.log(1);
            console.log(response.data.factoringResponse);
            // console.log('响应参数的集合：' + response.data.factoringResponse.assetAgreement.ST0204.attachment_url);
            that.factoringContract = response.data.factoringResponse.assetAgreement.ST0204 && response.data.factoringResponse.assetAgreement.ST0204.attachment_url.split(';');
            that.factoringList = response.data.factoringResponse.assetAgreement.ST0209 && response.data.factoringResponse.assetAgreement.ST0209.attachment_url.split(';');
            that.factoringDocument = response.data.factoringResponse.assetAgreement.ST0206 && response.data.factoringResponse.assetAgreement.ST0206.attachment_url.split(';');
            that.factoringCom = response.data.factoringResponse.assetAgreement.ST0208 && response.data.factoringResponse.assetAgreement.ST0208.attachment_url.split(';');
            that.downloadUrl = response.data.factoringResponse.assetAgreement.ST0205 && response.data.factoringResponse.assetAgreement.ST0205.attachment_url.split(';');
            that.detailData = response.data.factoringResponse;
            console.log(that.detailData);
          });
          that.POST(marketPriceRead, {
            body: {
              'assertId': that.id,
              'tradingType': this.assetsName
            }
          }, function (response) {
            if (response.code === 300) {
              that.marketPriceData = response.data;
              console.log(that.marketPriceReadData);
            }
          });
        }
        this.POST(queryAssetById, {'body': {'bussId': this.id}}, function (response) {
          that.bussTypeState = response.data.bussTypeState;
        });
      }
    },
    components: {
      downloadDialog
    },
    mounted() {
      this.initData();
    }
  };
</script>

<style lang="less" scoped>

  .el-card {
    margin: 30px auto 24px;
    width: 1100px;
    /*box-sizing: border-box;*/
    border: 0;
    /*padding: 0 150px 40px;*/
    padding: 0 22px 40px 180px;
    background: #fff;
    box-shadow:none;
    h1 {
      font-weight: normal;
      text-align: center;
      font-size: 24px;
      margin-left: 38px;
      margin-bottom: 30px;
    }
    ul {
      margin: 1em 0 1em 20px;

      /*border-bottom: 1px solid #ccc;*/
      li {
        float: left;
        width: 23%;
        height: 40px;
        /*text-align: center;*/
        font-size: 13px;
        line-height: 40px;
        img {
          cursor: pointer;
        }
      }
      li:nth-child(2n-1) {
        /*text-align: right;*/
        /*padding-right: 20px;*/
        width: 19%;
      }
      li:nth-child(2n) {
        text-align: left;
        color: #bababa;
        width: 30%;
      }
    }
  }

  .infoblock {
    display: block;
  }

  .infonone {
    display: none;
  }

  .center-two {
    text-align: center;
    font-weight: normal;
    margin-bottom: 20px;
  }

  .my-assets-details {
    width: 1100px;
    margin: 0 auto;
    overflow: hidden;
    .my-assets-details-main {
      float: left;
      width: 1100px;
      ul {
        font-size: 15px;
        padding-bottom: 15px;
      }
      li {
        float: left;
        width: 30%;
        line-height: 30px;
        margin-top: 15px;
      }
      span {
        font-weight: bold;
      }
      .el-table th {
        background: #409eff;
      }
      .el-table th > .cell {
        font-size: 15px;
        color: #fff;
      }
      .el-table .cell {
        font-size: 14px;
      }
    }
  }
  .down-style{
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(217%, 367%);
    color: #ccc;
  }
  .yulan{
    position: absolute;
    top: 80%;
    left: 4%;
    transform: translate(30%, 368%);
  }
  /*.my-assets-details-main .asset-info {*/
    /*border: 1px solid #dcdfe6;*/
    /*box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);*/
  /*}*/

  /*.my-assets-details-main .offer-info {*/
    /*border: 1px solid #dcdfe6;*/
    /*box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);*/
  /*}*/
</style>
