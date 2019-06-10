<template>
  <div class="my-assets-details">
    <h1>
      {{$t('MyAssets.assetsSale')}}
      <template v-if="this.assetsNameView != ''">
        - {{assetsNameView}}
      </template>
    </h1>
    <div class="my-assets-details-main">
      <ul class="clearfix" v-if="this.$route.params.assetsName == '1'">
        <ul class="clearfix details-ul-reset">
          <li><span>{{$t('MyAssets.title')}}：</span>{{detailData.title}}</li>
          <li><span>{{$t('MyAssets.assetsNo')}}：</span>{{detailData.assetsNo}}</li>
          <li><span>{{$t('MyAssets.assetType')}}：</span>
            {{assetsNameView}}
          </li>
        </ul>
        <ul class="clearfix details-ul-reset">
          <li><span>{{$t('MyAssets.forfaitingType')}}：</span>
            {{(detailData.debtType == '1')? $t('creditLetterType.nationalName'):$t('creditLetterType.internationalName')}}
          </li>
          <li><span>{{$t('MyAssets.discountRatehint')}}：</span>{{detailData.discountRate}}%</li>
          <li style="width: 16.5%;"><span>{{$t('MyAssets.area')}}：</span>{{ (this.$i18n.locale == 'cn') ?
            detailData.areaName: detailData.enAreaName}}
          </li>
          <li style="width: 16.5%;"><span>{{$t('MyAssets.country')}}：</span>{{ (this.$i18n.locale == 'cn') ?
            detailData.countryName: detailData.enCountryName}}
          </li>
        </ul>
        <ul class="clearfix details-ul-reset">
          <li><span>{{$t('body.acceptanceAmount')}}：</span>{{detailData.amount}}</li>
          <li><span>{{$t('MyAssets.acceptanceCurrency')}}：</span>{{detailData.currency}}</li>
          <li><span>{{$t('publishForfeiting.acceptanceDate')}}：</span>{{detailData.acceptanceDate}}</li>
        </ul>
        <ul class="clearfix details-ul-reset">
          <li><span>{{$t('MyAssets.maturity')}}：</span>{{detailData.maturity}}</li>
          <li><span>{{$t('MyAssets.indateMessage')}}：</span>{{detailData.indateMessage}}</li>
        </ul>
        <ul class="clearfix details-ul-reset">
          <li><span>{{$t('publishForfeiting.openSwift')}}：</span>{{detailData.openSwift}}</li>
          <li style="width: 66.66%"><span>{{$t('forfeitingdetail.openFullName')}}：</span>{{detailData.openFullName}}</li>
        </ul>
        <ul class="clearfix details-ul-reset">
          <li><span>{{$t('publishForfeiting.reimbursingBankSwiftShow')}}：</span>{{detailData.reimbursingBankSwift}}</li>
          <li style="width: 66.66%"><span>{{$t('publishForfeiting.reimbursingBankNameShow')}}：</span>{{detailData.reimbursingBankName}}
          </li>
        </ul>
        <ul class="clearfix details-ul-reset">
          <li><span>{{$t('publishForfeiting.tenderSwift')}}：</span>{{detailData.tenderSwift}}</li>
          <li style="width: 66.66%"><span>{{$t('publishForfeiting.tenderFullName')}}：</span>{{detailData.tenderFullName}}
          </li>
        </ul>
        <ul class="clearfix details-ul-reset">
          <li><span>{{$t('forfeitingdetail.lcNo')}}：</span>{{detailData.lcNo}}</li>
          <li><span>{{$t('forfeitingdetail.issuingDate')}}：</span>{{detailData.issuingDate}}</li>
        </ul>
        <ul class="clearfix details-ul-reset">
          <li><span>{{$t('forfeitingdetail.creditType')}}：</span>{{detailData.creditType}}</li>
          <li style="width: 66%;"><span>{{$t('forfeitingdetail.forfeitingAgreement')}}：</span>
            <el-button type="primary" style="margin-left: 20px"
                       @click="downloadAsset()">{{$t('forfeitingdetail.download')}}
            </el-button>
          </li>
        </ul>
        <ul class="clearfix details-ul-reset">
          <li style="width: 100%;"><span>{{$t('companInformation.certificate')}}：</span>
            <router-link :to="{'name': 'forfeitingBlockchain', params: {'id': id, 'act': bussTypeState - 1}}">
              <el-button v-if="bussTypeState == '1'" type="primary">{{$t('forfeitingdetail.chainStartTo')}}</el-button>
              <el-button v-if="bussTypeState == '2'" type="primary">{{$t('forfeitingdetail.chainMatchTo')}}</el-button>
              <el-button v-if="bussTypeState == '3'" type="primary">{{$t('forfeitingdetail.chainFinishTo')}}</el-button>
            </router-link>
          </li>
        </ul>
      </ul>
      <ul class="clearfix" v-if="this.$route.params.assetsName == '2'">
        <ul class="clearfix details-ul-reset">
          <li><span>{{$t('MyAssets.assetsNo')}}：</span>{{detailData.factoringNo}}</li>
          <li><span>{{$t('MyAssets.factoringType')}}：</span>
            <template v-if="detailData.factoringType == '1'">
              {{$t('MyAssets.factoringType1')}}
            </template>
            <template v-else-if="detailData.factoringType == '2'">
              {{$t('MyAssets.factoringType2')}}
            </template>
            <template v-else-if="detailData.factoringType == '3'">
              {{$t('MyAssets.factoringType3')}}
            </template>
            <template v-else-if="detailData.factoringType == '4'">
              {{$t('MyAssets.factoringType4')}}
            </template>
          </li>
          <li><span>{{$t('MyAssets.factoringName')}}：</span>{{detailData.factoringName}}</li>
        </ul>
        <ul class="clearfix details-ul-reset">
          <li><span>{{$t('MyAssets.amount')}}：</span>{{detailData.amount}}</li>
          <li style="width: 12.5%;"><span>{{$t('MyAssets.currency')}}：</span>{{detailData.currency}}</li>
          <li style="width: 20.5%;"><span>{{$t('MyAssets.transferRate')}}：</span>{{detailData.transferRate}}%</li>
          <li style="width: 16.5%;"><span>{{$t('MyAssets.area')}}：</span>{{ (this.$i18n.locale == 'cn') ?
            detailData.areaName: detailData.enAreaName}}
          </li>
          <li style="width: 16.5%;"><span>{{$t('MyAssets.country')}}：</span>{{ (this.$i18n.locale == 'cn') ?
            detailData.countryName: detailData.enCountryName}}
          </li>
        </ul>
        <ul class="clearfix details-ul-reset">
          <li><span>{{$t('factoringDetail.maturity')}}：</span>{{detailData.maturity}}</li>
          <li><span>{{$t('MyAssets.indateMessage')}}：</span>{{detailData.indateMessage}}</li>
        </ul>
        <ul class="clearfix details-ul-reset">
          <li><span>{{$t('publishFactoring.isCove')}}：</span>
            <template v-if="detailData.isCove == '1'">
              {{$t('MyAssets.insured')}}
            </template>
            <template v-if="detailData.isCove == '2'">
              {{$t('MyAssets.NoInsured')}}
            </template>
          </li>
          <li><span>{{$t('myPrice.inUnderwriter')}}：</span>{{detailData.insurer}}</li>
        </ul>
        <ul class="clearfix details-ul-reset">
          <li><span>{{$t('MyAssets.seller')}}：</span>{{detailData.seller}}</li>
          <li><span>{{$t('factoringDetail.originators')}}：</span>{{detailData.originators}}</li>
        </ul>
        <ul class="clearfix details-ul-reset">
          <li><span>{{$t('factoringDetail.obligors')}}：</span>{{detailData.obligors}}</li>
          <li style="width: 66.66%"><span>{{$t('factoringDetail.reportInformation')}}</span>
            <el-button type="primary" style="margin-left: 20px" @click="downloadFactoring('ST0208')">
              {{$t('factoringDetail.download')}}
            </el-button>
          </li>
        </ul>
      </ul>
      <downloadDialog v-if="downloadUrl" :show="downloadDialog" v-on:closeDownloadDialog="closeDownloadDialog" :url="downloadUrl"></downloadDialog>
    </div>
  </div>
</template>

<script>
  import {findDetails, queryAssetById, findInfo} from '../../assets/js/const';
  import downloadDialog from '../common/downloadDialog';

  export default {
    data() {
      return {
        assetsName: this.$route.params.assetsName,
        id: this.$route.params.id,
        detailData: {},
        assetsNameView: '',
        bussTypeState: '',
        assetAgreement: [],
        downloadDialog: false,
        downloadUrl: ''
      };
    },
    methods: {
      downloadAsset() {
        // 判断是否有值 如果有则赋值给downloadUrl/并且downloadDialog为true
        console.log(this.detailData.assetAgreement.ST0201);
        if (this.detailData.assetAgreement) {
          this.downloadUrl = this.detailData.assetAgreement.ST0201.attachment_url;
          this.downloadDialog = true;
        } else {
          this.downloadUrl = '';
          this.$message({'message': this.$t('clues.notUpload')}, 3000);
        }
      },
      closeDownloadDialog () {
        this.downloadDialog = false;
      },
      downloadFactoring(val) {
        if (this.detailData.assetAgreement[val].attachment_url) {
          this.downloadUrl = this.detailData.assetAgreement[val].attachment_url;
          this.downloadDialog = true;
        } else {
          this.$message({'message': this.$t('clues.notUpload')}, 3000);
        }
      },
      initData() {
        let that = this;
        let _findDeData = {};
        if (that.assetsName === '1') {
          _findDeData.assertId = that.id;
          this.$route.query.yn === '0' && (_findDeData['yn'] = 0);
          this.assetsNameView = that.$t('marketForfeiting.forfeiting');
          that.POST(findDetails, {body: _findDeData}, function (response) {
            that.detailData = response.data.assets;
            // that.detailData.assetAgreement = 'http://192.144.138.58:80/group1/M00/00/20/rBUQBVst2viAas89AABQCotJo8U759.jpg;http://192.144.138.58:80/group1/M00/00/20/rBUQBVst2viAas89AABQCotJo8U759.jpg;http://192.144.138.58:80/group1/M00/00/20/rBUQBVst2viAK8EaAAA1wwcz4RI228.jpg;http://192.144.138.58:80/group1/M00/00/20/rBUQBVst2viAA6gDAABBXiuimgE141.jpg;http://192.144.138.58:80/group1/M00/00/20/rBUQBVst2vmAQyhDAAjLXu_5VyM070.jpg;http://192.144.138.58:80/group1/M00/00/20/rBUQBVst2vuABT0tAAbVbBMTdvg101.jpg';
            // that.detailData.assetAgreement = 'http://192.144.138.58:80/group1/M00/00/20/rBUQBVst2viAas89AABQCotJo8U759.jpg';
          });
          this.POST(queryAssetById, {'body': {'bussId': this.id}}, function (response) {
            if (response.data) {
              that.bussTypeState = response.data.bussTypeState;
            }
          });
        } else {
          _findDeData.factoringId = that.id;
          this.$route.query.yn === '0' && (_findDeData['yn'] = 0);
          this.assetsNameView = that.$t('marketForfeiting.factoring');
          that.POST(findInfo, {body: _findDeData}, function (response) {
            that.detailData = response.data.factoringResponse;
          });
        }
      }
    },
    mounted() {
      this.initData();
    },
    components: {
      downloadDialog
    }
  };
</script>

<style lang="less" scoped>
  .my-assets-details {
    width: 1100px;
    margin: 0 auto;
    .my-assets-details-main {
      min-height: 500px;
      margin-bottom: 20px;
      border: 1px solid #dcdfe6;
      -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
      li {
        float: left;
        width: 33.33%;
        min-height: 30px;
        line-height: 30px;
        margin-top: 15px;
        span {
          font-weight: bold;
        }
      }
    }
  }
</style>
