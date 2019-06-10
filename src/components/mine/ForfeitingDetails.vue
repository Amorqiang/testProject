<template>

  <!--<el-card></el-card>-->
  <div>
    <el-card>
      <!--报价中的资产的分类-->
      <!--<h1>{{ type === 1 ? $t('myPrice.assetsPriceDetil') : $t('AssetsForSalePage.AssetsDetails')}}-->
        <!--<template v-if="this.assetsNameView != ''">-->
            <!-- - {{assetsNameView}}-->
        <!--</template>-->
      <!--</h1>-->
      <h1 style="text-align: left;margin-left: 3px;">{{$t('AssetsForSalePage.AssetsDetails')}}</h1>

      <!--标题和资产编号-->
      <ul class="clearfix">
        <li>{{$t('MyAssets.title')}}</li>
        <li>{{detailData.title}}</li>
        <li>{{$t('MyAssets.assetsNo')}}</li>
        <li>{{detailData.assetsNo}}</li>
      </ul>

      <ul class="clearfix">
        <li>{{$t('MyAssets.assetType')}}</li>
        <li>{{assetsNameView}}</li>
        <li>{{$t('MyAssets.forfaitingType')}}</li>
        <li>{{detailData.debtType == '1' ?
          $t('creditLetterType.nationalName'):$t('creditLetterType.internationalName')}}
        </li>
      </ul>

      <ul class="clearfix">
        <li>{{$t('MyAssets.discount')}}</li>
        <li>{{detailData.discountRate}}%</li>
        <li>{{$t('MyAssets.area')}}</li>
        <li>{{ (this.$i18n.locale == 'cn') ? detailData.areaName:detailData.enAreaName}}</li>
      </ul>

      <ul class="clearfix">
        <li>{{$t('MyAssets.country')}}</li>
        <li>{{ (this.$i18n.locale == 'cn') ? detailData.countryName:detailData.enCountryName}}</li>
        <li>{{$t('body.acceptanceAmount')}}</li>
        <li>{{detailData.amount}}</li>
      </ul>

      <ul class="clearfix">
        <li>{{$t('MyAssets.acceptanceCurrency')}}</li>
        <li>{{detailData.currency}}</li>
        <li>{{$t('MyAssets.indateMessage')}}</li>
        <li>{{detailData.indateMessage}}</li>
      </ul>

      <ul class="clearfix">
        <li>{{$t('MyAssets.maturity')}}</li>
        <li>{{detailData.maturity}}</li>
        <li>{{$t('publishForfeiting.openSwift')}}</li>
        <li>{{detailData.openSwift}}</li>
      </ul>

      <ul class="clearfix">
        <li>{{$t('forfeitingdetail.openFullName')}}</li>
        <li>{{detailData.openFullName}}</li>
        <li>{{$t('forfeitingdetail.reimbursingBankSwift')}}</li>
        <li>{{detailData.reimbursingBankSwift}}</li>
      </ul>

      <ul class="clearfix">
        <li>{{$t('forfeitingdetail.reimbursingBankName')}}</li>
        <li>{{detailData.reimbursingBankName}}</li>
        <li>{{$t('publishForfeiting.acceptanceDate')}}</li>
        <li>{{detailData.acceptanceDate}}</li>
      </ul>

      <ul class="clearfix">
        <li>{{$t('publishForfeiting.tenderSwift')}}</li>
        <li>{{detailData.tenderSwift}}</li>
        <li>{{$t('publishForfeiting.tenderFullName')}}</li>
        <li>{{detailData.tenderFullName}}</li>
      </ul>

      <ul class="clearfix">
        <li>{{$t('forfeitingdetail.lcNo')}}</li>
        <li>{{detailData.lcNo}}</li>
        <li>{{$t('forfeitingdetail.issuingDate')}}</li>
        <li>{{detailData.issuingDate}}</li>
      </ul>

      <ul class="clearfix">
        <li>{{$t('publishForfeiting.creditType')}}</li>
        <li>{{detailData.creditType}}</li>
        <li>{{$t('companInformation.certificate')}}</li>
        <li>
          <router-link :to="{'name': 'forfeitingBlockchain', params: {'id': id, 'act': bussTypeState - 1}}">
            <el-button size="mini" v-if="bussTypeState == '1'" type="primary">{{$t('forfeitingdetail.chainStartTo')}}
            </el-button>
            <el-button size="mini" v-if="bussTypeState == '2'" type="primary">{{$t('forfeitingdetail.chainMatchTo')}}
            </el-button>
            <el-button size="mini" v-if="bussTypeState == '3'" type="primary">{{$t('forfeitingdetail.chainFinishTo')}}
            </el-button>
          </router-link>
        </li>
      </ul>

      <ul class="clearfix" v-show="downloadUrl !== undefined" style="border-bottom: 0;padding-bottom: 70px;">
        <li>{{$t('forfeitingdetail.forfeitingAgreement')}}</li>
        <li style="width: 1100px;">
          <div v-for="item in downloadUrl" style="margin: 10px 10px;float: left;width: 150px;height: 100px;background: rgba(0,0,0,0.1);">
            <div style="position: relative;" v-if="item.substr(item.length-4) == '.pdf'">
              <img  src="../../assets/img/pdf.png" style="height: 44px; width: 37px;left: 53px;position: absolute;top: 29px;"
                   @click="downloadAsset(item)" alt="">
              <img class="yulan" src="../../assets/img/Sale-of-entry-zoom-in.png" @click="downloadAsset(item)" alt="">
              <a class="down-style">
                <img src="../../assets/img/download.png" @click="downloadAsset(item)" alt="">
              </a>
            </div>
            <div style="position: relative;" v-if="item.substr(item.length-4) == '.rar'">
              <img src="../../assets/img/rar.png" style="height: 44px; width: 37px;left: 53px;position: absolute;top: 29px;"
                   @click="downloadAsset(item)" alt="">
              <a class="down-style">
                <img src="../../assets/img/download.png" @click="downloadAsset(item)" alt="">
              </a>
            </div>
            <div style="position: relative;" v-show="item.substr(item.length-4) == '.zip'">
              <img src="../../assets/img/zip.png" style="height: 44px; width: 37px;left: 53px;position: absolute;top: 29px;"
                   @click="downloadAsset(item)" alt="">
              <a class="down-style">
                <img src="../../assets/img/download.png" @click="downloadAsset(item)" alt="">
              </a>
            </div>
            <div style="position: relative;" v-show="(item.substr(item.lastIndexOf('.') ) == '.png') || (item.substr(item.lastIndexOf('.') ) == '.jpg') ||(item.substr(item.lastIndexOf('.') ) == '.jpeg') ">
              <img class="cener-style"  :src=item style="height: 80px; width: 110px;left: 19px;position: absolute;top: 10px;"
                   alt="">
              <a class="down-style">
                <img src="../../assets/img/download.png" @click="downloadAsset(item)" alt="">
              </a>
              <img class="yulan" src="../../assets/img/Sale-of-entry-zoom-in.png" @click="downloadAsset1(item)" alt="">
            </div>
          </div>
        </li>
        <!--<listforvue v-if="downloadUrl" :url="downloadUrl"></listforvue>-->
      </ul>

      <ul class="clearfix" v-show="downloadUrl1 !== undefined" style="border-bottom: 0;padding-bottom: 70px;">
        <li>{{$t('factoringContract.Letterofcreditacceptance')}}</li>
        <li style="width: 1100px;">
          <div v-for="item in downloadUrl1" style="margin: 10px 10px;float: left;width: 150px;height: 100px;background: rgba(0,0,0,0.1);">
            <div style="position: relative;" v-if="item.substr(item.length-4) == '.pdf'">
              <img  src="../../assets/img/pdf.png" style="height: 44px; width: 37px;left: 53px;position: absolute;top: 29px;"
                    @click="downloadAsset(item)" alt="">
              <img class="yulan" src="../../assets/img/Sale-of-entry-zoom-in.png" @click="downloadAsset(item)" alt="">
              <a class="down-style">
                <img src="../../assets/img/download.png" @click="downloadAsset(item)" alt="">
              </a>
            </div>
            <div style="position: relative;" v-if="item.substr(item.length-4) == '.rar'">
              <img src="../../assets/img/rar.png" style="height: 44px; width: 37px;left: 53px;position: absolute;top: 29px;"
                   @click="downloadAsset(item)" alt="">
              <a class="down-style">
                <img src="../../assets/img/download.png" @click="downloadAsset(item)" alt="">
              </a>
            </div>
            <div style="position: relative;" v-show="item.substr(item.length-4) == '.zip'">
              <img src="../../assets/img/zip.png" style="height: 44px; width: 37px;left: 53px;position: absolute;top: 29px;"
                   @click="downloadAsset(item)" alt="">
              <a class="down-style">
                <img src="../../assets/img/download.png" @click="downloadAsset(item)" alt="">
              </a>
            </div>
            <div style="position: relative;" v-show="(item.substr(item.lastIndexOf('.') ) == '.png') || (item.substr(item.lastIndexOf('.') ) == '.jpg') ||(item.substr(item.lastIndexOf('.') ) == '.jpeg') ">
              <img class="cener-style"  :src=item style="height: 80px; width: 110px;left: 19px;position: absolute;top: 10px;"
                   alt="">
              <a class="down-style">
                <img src="../../assets/img/download.png" @click="downloadAsset(item)" alt="">
              </a>
              <img class="yulan" src="../../assets/img/Sale-of-entry-zoom-in.png" @click="downloadAsset1(item)" alt="">
            </div>
          </div>
        </li>
        <!--<listforvue v-if="downloadUrl" :url="downloadUrl"></listforvue>-->
      </ul>

      <ul class="clearfix" v-show="downloadUrl2 !== undefined" style="border-bottom: 0;padding-bottom: 40px;">
        <li>{{$t('factoringContract.Letterofcredit')}}</li>
        <li style="width: 1100px;">
          <div v-for="item in downloadUrl2" style="margin: 10px 10px;float: left;width: 150px;height: 100px;background: rgba(0,0,0,0.1);">
            <div style="position: relative;" v-if="item.substr(item.length-4) == '.pdf'">
              <img  src="../../assets/img/pdf.png" style="height: 44px; width: 37px;left: 53px;position: absolute;top: 29px;"
                    @click="downloadAsset(item)" alt="">
              <img class="yulan" src="../../assets/img/Sale-of-entry-zoom-in.png" @click="downloadAsset(item)" alt="">
              <a class="down-style">
                <img src="../../assets/img/download.png" @click="downloadAsset(item)" alt="">
              </a>
            </div>
            <div style="position: relative;" v-if="item.substr(item.length-4) == '.rar'">
              <img src="../../assets/img/rar.png" style="height: 44px; width: 37px;left: 53px;position: absolute;top: 29px;"
                   @click="downloadAsset(item)" alt="">
              <a class="down-style">
                <img src="../../assets/img/download.png" @click="downloadAsset(item)" alt="">
              </a>
            </div>
            <div style="position: relative;" v-show="item.substr(item.length-4) == '.zip'">
              <img src="../../assets/img/zip.png" style="height: 44px; width: 37px;left: 53px;position: absolute;top: 29px;"
                   @click="downloadAsset(item)" alt="">
              <a class="down-style">
                <img src="../../assets/img/download.png" @click="downloadAsset(item)" alt="">
              </a>
            </div>
            <div style="position: relative;" v-show="(item.substr(item.lastIndexOf('.') ) == '.png') || (item.substr(item.lastIndexOf('.') ) == '.jpg') ||(item.substr(item.lastIndexOf('.') ) == '.jpeg') ">
              <img class="cener-style"  :src=item style="height: 80px; width: 110px;left: 19px;position: absolute;top: 10px;"
                   alt="">
              <a class="down-style">
                <img src="../../assets/img/download.png" @click="downloadAsset(item)" alt="">
              </a>
              <img class="yulan" src="../../assets/img/Sale-of-entry-zoom-in.png" @click="downloadAsset1(item)" alt="">
            </div>
          </div>
        </li>
        <!--<listforvue v-if="downloadUrl" :url="downloadUrl"></listforvue>-->
      </ul>



      <!--福费庭协议下载-->
      <!--<downloadDialog v-if="downloadUrl" :show="downloadDialog" v-on:closeDownloadDialog="closeDownloadDialog"-->
                      <!--:url="downloadUrl"></downloadDialog>-->
      <el-dialog
        title=""
        :visible.sync="dialogVisible"
        width="360px">
        <span><img :src=imgHref style="width: 300px; height: 300px;" alt=""></span>
      </el-dialog>
    </el-card>
    <el-card :class="detailData.recheckState === 130 ? 'infoblock':'infonone'">
        <h2 class="center-two">{{$t('myPrice.transactIn')}}</h2>

        <div  v-for="(item,index) in marketPriceData" :key="index">
          <ul class="clearfix" >
            <li>{{$t('myPrice.tradiParty')}}</li>
            <li>{{item.bOrgName}}</li>
            <li>{{$t('MyAssets.discount')}}</li>
            <li>{{item.discountRate}}%</li>
          </ul>
        </div>
    </el-card>
  </div>
</template>

<script>
  import {findDetails, marketPriceRead, queryAssetById} from '../../assets/js/const';
  import downloadDialog from '../common/downloadDialog';
  import {baseUrl} from '../../assets/js/env';
  // import listforvue from '../common/listforvue';

  export default {
    data() {
      return {
        assetsName: this.$route.params.assetsName,
        id: this.$route.params.id,
        type: this.$route.params.type,
        detailData: {},
        detailInfo: [],
        bussTypeState: '',
        assetsNameView: '',
        imgHref: '',
        dialogVisible: false,
        marketPriceData: [],
        downloadDialog: false,
        downloadUrl: [],
        downloadUrl1: [],
        downloadUrl2: [],
        baseUrl: baseUrl
      };
    },
    methods: {
      downloadAsset(item) {
        console.log(this.downloadUrl);
        window.open(item);
        // 判断是否有值 如果有则赋值给downloadUrl/并且downloadDialog为true
        // console.log(this.detailData.assetAgreement.ST0202);
        // if (this.detailData.assetAgreement.ST0202) {
        //   this.downloadUrl = this.detailData.assetAgreement.ST0202.attachment_url;
        //   // console.log(this.detailData.assetAgreement.ST0202.attachment_url);
        //   // this.downloadDialog = true;
        //   console.log(this.downloadUrl);
        //   // window.open('http://139.199.116.36:8088/group1/M00/00/0A/rBUABlsPl0WACbhIAAAPV7zaEuw620.png');
        //   // console.log(this.downloadUrl);
        // } else {
        //   this.downloadUrl = '';
        //   this.$message({'message': this.$t('clues.notUpload')}, 3000);
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
        let that = this;
        if ((that.assetsName + '') === '1') {
          this.assetsNameView = this.$t('marketForfeiting.forfeiting');
          that.POST(findDetails, {body: {'assertId': that.id, 'yn': 0}}, function (response) {
            that.detailData = response.data.assets;
            console.log(that.detailData);
            console.log(response.data.assets.assetAgreement);
            that.downloadUrl = response.data.assets.assetAgreement.ST0202 && response.data.assets.assetAgreement.ST0202.attachment_url.split(';');
            that.downloadUrl1 = response.data.assets.assetAgreement.ST0201 && response.data.assets.assetAgreement.ST0201.attachment_url.split(';');
            that.downloadUrl2 = response.data.assets.assetAgreement.ST0212 && response.data.assets.assetAgreement.ST0212.attachment_url.split(';');
            console.log(that.downloadUrl);
            // that.downloadUrl = ['http://139.199.116.36:8088/group1/M00/00/0A/rBUABlsPl0WACbhIAAAPV7zaEuw620.png', 'http://139.199.116.36:8088/group1/M00/00/0A/rBUABlsPl0WACbhIAAAPV7zaEuw620.pdf', 'http://139.199.116.36:8088/group1/M00/00/0A/rBUABlsPl0WACbhIAAAPV7zaEuw620.zip', 'http://139.199.116.36:8088/group1/M00/00/0A/rBUABlsPl0WACbhIAAAPV7zaEuw620.rar', 'http://139.199.116.36:8088/group1/M00/00/0A/rBUABlsPl0WACbhIAAAPV7zaEuw620.png'];
            console.log(this.downloadUrl);
            // that.detailData.assetAgreement = 'http://192.144.138.58:80/group1/M00/00/20/rBUQBVst2viAas89AABQCotJo8U759.jpg;http://192.144.138.58:80/group1/M00/00/20/rBUQBVst2viAas89AABQCotJo8U759.jpg;http://192.144.138.58:80/group1/M00/00/20/rBUQBVst2viAK8EaAAA1wwcz4RI228.jpg;http://192.144.138.58:80/group1/M00/00/20/rBUQBVst2viAA6gDAABBXiuimgE141.jpg;http://192.144.138.58:80/group1/M00/00/20/rBUQBVst2vmAQyhDAAjLXu_5VyM070.jpg;http://192.144.138.58:80/group1/M00/00/20/rBUQBVst2vuABT0tAAbVbBMTdvg101.jpg';
            // that.detailData.assetAgreement = 'http://192.144.138.58:80/group1/M00/00/20/rBUQBVst2viAas89AABQCotJo8U759.jpg';
          });
          that.POST(marketPriceRead, {
            body: {
              'assertId': that.id,
              'tradingType': this.assetsName
            }
          }, function (response) {
            if (response.code === 300) {
              that.marketPriceData = response.data;
              console.log(that.marketPriceData);
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

<style lang="less">
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
        height: 30px;
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

  .my-assets-details-main .asset-info {
    /*border: 1px solid #dcdfe6;*/
    /*box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);*/
  }

  .my-assets-details-main .offer-info {
    /*border: 1px solid #dcdfe6;*/
    /*box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);*/
  }

  .infoblock {
    display: block;
  }

  .infonone {
    display: none;
  }

  #app {
    background: #fff;
  }

  .el-card {
    margin: 30px auto 24px;
    width: 1100px;
    /*box-sizing: border-box;*/
    padding: 0 150px 40px;
    background: #fff;
    border: 0;
    box-shadow: none;
    h1 {
      font-weight: normal;
      text-align: center;
      /*margin-left: 38px;*/
      margin-bottom: 30px;
      font-size: 24px;
    }
    ul {
      margin: 1em 0;
      /*border-bottom: 1px solid #ccc;*/
      li {
        float: left;
        width: 20%;
        height: 40px;
        text-align: left;
        font-size: 13px;
        line-height: 40px;
        img{
          cursor: pointer;
        }
      }
      li:nth-child(2n-1) {
        /*text-align: right;*/
        /*padding-right: 20px;*/
        width: 26%;
      }
      li:nth-child(2n) {
        /*text-align: left;*/
        color: #bababa;
        width: 20%;
      }
    }
  }
  .el-card.is-always-shadow, .el-card.is-hover-shadow:focus, .el-card.is-hover-shadow:hover{
    box-shadow:none;
  }
  .center-two{
    text-align: center;
    font-weight: normal;
    margin-bottom: 20px;
  }
  .down-style{
    position: absolute;
    top: 60%;
    left: 50%;
    transform: translate(208%, 148%);
  }
  .yulan{
    position: absolute;
    top: -4%;
    left: 4%;
    transform: translate(16%, 366%);
  }
  img {
    vertical-align: middle;
    text-align: center;
  }
</style>
