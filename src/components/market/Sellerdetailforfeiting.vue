<template>
  <div class="sellerdetail-forfeiting clearfix">
    <!-- <market-slider></market-slider> -->
    <div class="sellerdetailforfeiting-center clearfix">
      <div class="buyer-msg">
        <h2>{{$t('forfeitingdetail.saleinformation')}}</h2>
        <el-form :model="ruleForm" label-width="180px" class="saleforfaiting-form">
          <el-tabs type="border-card">
            <el-tab-pane :label="$t('forfeitingdetail.history')">
              <ul class="clearfix" style="margin: 0">
                <li style="width: 100%"><span>{{$t('forfeitingdetail.companyName')}}：</span>{{ruleForm.companyName}}
                </li>
                <li><span>{{$t('forfeitingdetail.tradeSum')}}：</span>{{ruleForm.tradeSum == null || ruleForm.tradeSum ==
                  "" ? 0 : ruleForm.tradeSum}}
                </li>
                <li><span>{{$t('forfeitingdetail.successSum')}}：</span>{{ruleForm.successSum == null ||
                  ruleForm.successSum == "" ? 0 : ruleForm.successSum}}
                </li>
                <li><span>{{$t('forfeitingdetail.failSum')}}：</span>{{ruleForm.failSum == null || ruleForm.failSum == ""
                  ? 0 : ruleForm.failSum}}
                </li>
                <li><span>{{$t('forfeitingdetail.successRate')}}：</span>{{ruleForm.successRate == null ||
                  ruleForm.successRate == "" ? 0 : ruleForm.successRate}}
                </li>
                <li><span>{{$t('forfeitingdetail.successAmount')}}：</span>{{ruleForm.successAmount == null ||
                  ruleForm.successAmount == "" ? 0 : ruleForm.successAmount}}{{$t('common.dollar')}}
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane :label="$t('forfeitingdetail.introduction')">
              <ul class="clearfix" style="margin: 0">
                <li style="width: 100%"><span>{{$t('forfeitingdetail.companyName')}}：</span>{{ruleForm.companyName}}
                </li>
              </ul>
              <ul class="clearfix" style="margin: 0">
                <li><span>{{$t('forfeitingdetail.adress')}}：</span>{{ruleForm.companyDomicile}}</li>
                <li><span>{{$t('forfeitingdetail.license_no')}}：</span>{{ruleForm.licenseNo}}</li>
                <li><span>{{$t('forfeitingdetail.contactName')}}：</span>{{ruleForm.contactName}}</li>
              </ul>
              <ul class="clearfix" style="margin: 0">
                <li><span>{{$t('forfeitingdetail.contactTel')}}：</span>{{ruleForm.contactTel}}</li>
                <li><span>{{$t('forfeitingdetail.swiftCode')}}：</span>{{ruleForm.swiftCode}}</li>
              </ul>
            </el-tab-pane>
          </el-tabs>
        </el-form>

      </div>
      <h2>{{$t('forfeitingdetail.assetsInformation')}}</h2>
      <div class="asset-info clearfix">
        <template>
          <el-form :model="assetsForm" label-width="180px" class="saleforfaiting-form">
            <ul class="clearfix details-ul-reset">
              <li><span>{{$t('forfeitingdetail.Title')}}：</span>{{assetsForm.title}}</li>
              <li><span>{{$t('forfeitingdetail.assetsNo')}}：</span>{{assetsForm.assetsNo}}</li>
              <li><span>{{$t('forfeitingdetail.assetsName')}}：</span>{{$t('marketForfeiting.forfeiting')}}</li>
            </ul>
            <ul class="clearfix details-ul-reset">
              <li><span>{{$t('forfeitingdetail.debtType')}}：</span>{{assetsForm.debtType == 1 ?
                $t('creditLetterType.nationalName'):$t('creditLetterType.internationalName')}}
              </li>
              <li><span>{{$t('forfeitingdetail.discountRate')}}：</span>{{assetsForm.discountRate}}%</li>
              <li><span>{{$t('forfeitingdetail.areaName')}}：</span>{{(this.$i18n.locale == 'cn')? assetsForm.areaName: assetsForm.enAreaName}}</li>
            </ul>
            <ul class="clearfix details-ul-reset">
              <li><span>{{$t('forfeitingdetail.countryName')}}：</span>{{(this.$i18n.locale == 'cn')? assetsForm.countryName: assetsForm.enCountryName}}</li>
              <li><span>{{$t('forfeitingdetail.amount')}}：</span>{{assetsForm.amount}}</li>
              <li><span>{{$t('forfeitingdetail.currency')}}：</span>{{assetsForm.currency}}</li>
            </ul>
            <ul class="clearfix details-ul-reset">
              <li><span>{{$t('forfeitingdetail.acceptanceDate')}}：</span>{{assetsForm.acceptanceDate}}</li>
              <li><span>{{$t('forfeitingdetail.maturity')}}：</span>{{assetsForm.maturity}}</li>
              <li><span>{{$t('forfeitingdetail.indateMessage')}}：</span>{{assetsForm.indateMessage}}</li>
            </ul>
            <ul class="clearfix details-ul-reset">
              <li><span>{{$t('forfeitingdetail.openSwift')}}：</span>{{assetsForm.openSwift}}</li>
              <li><span>{{$t('forfeitingdetail.openFullName')}}：</span>{{assetsForm.openFullName}}</li>
              <li><span>{{$t('forfeitingdetail.reimbursingBankSwift')}}：</span>{{assetsForm.reimbursingBankSwift}}</li>
            </ul>
            <ul class="clearfix details-ul-reset">
              <li><span>{{$t('forfeitingdetail.reimbursingBankName')}}：</span>{{assetsForm.reimbursingBankName}}</li>
              <li><span>{{$t('forfeitingdetail.tenderSwift')}}：</span>{{assetsForm.tenderSwift}}</li>
              <li><span>{{$t('forfeitingdetail.tenderFullName')}}：</span>{{assetsForm.tenderFullName}}</li>
            </ul>
            <ul class="clearfix details-ul-reset">
              <li><span>{{$t('forfeitingdetail.lcNo')}}(LC NO)：</span>{{assetsForm.lcNo}}</li>
              <li><span>{{$t('forfeitingdetail.issuingDate')}}：</span>{{assetsForm.issuingDate}}</li>
              <li><span>{{$t('forfeitingdetail.creditType')}}：</span>{{assetsForm.creditType}}</li>
            </ul>
            <ul class="clearfix details-ul-reset">
              <li style="padding-bottom: 35px;">
                <span>{{$t('forfeitingdetail.forfeitingAgreement')}}：
                  <el-button type="primary" style="margin-left: 20px" @click="downloadAsset">{{$t('forfeitingdetail.download')}}</el-button>
                </span>
              </li>
              <downloadDialog v-if="downloadUrl" :show="downloadDialog" v-on:closeDownloadDialog="closeDownloadDialog"
                              :url="downloadUrl"></downloadDialog>
              <li style="padding-bottom: 35px; width: 500px">
                <!-- <template slot-scope="scope"> -->
                <span>{{$t('blockchain.blockChainInfo')}}
                <el-button type="primary" style="margin-left: 0px" v-if="bussTypeState == '1'">
                  <router-link :to="{'name': 'forfeitingBlockchain', 'params': { 'id': id, 'act': 0}}"
                               style="color: #fff;">{{$t('forfeitingdetail.chainStartTo')}}</router-link>
                </el-button>
                <el-button type="primary" style="margin-left: 0px" v-else-if="bussTypeState == '2'">
                  <router-link :to="{'name': 'forfeitingBlockchain', 'params': { 'id': id, 'act': 1}}"
                               style="color: #fff;">{{$t('forfeitingdetail.chainMatchTo')}}</router-link>
                </el-button>
                <el-button type="primary" style="margin-left: 0px;" v-else-if="bussTypeState == '3'">
                  <router-link :to="{'name': 'forfeitingBlockchain', 'params': { 'id': id, 'act': 2}}"
                               style="color: #fff;">{{$t('forfeitingdetail.chainFinishTo')}}</router-link>
                </el-button>
              </span>
                <!-- </template> -->
              </li>
            </ul>
          </el-form>
        </template>
      </div>
      <h2 v-if="this.$route.query.mat === '0' && assetsForm.recheckState === 130">{{$t('myPrice.transactIn')}}</h2>
      <h2 v-if="this.$route.query.mat !== '0'">{{$t('factoringDetail.bidInfomation')}}</h2>
      <div v-if="this.$route.query.mat !== '0' || assetsForm.recheckState === 130" class="offer-info clearfix"
           style="margin-bottom: 15px">
        <template id="">
          <el-table ref="marketPriceData" :data="marketPriceData" @row-click="handleCurrentChange"
                    highlight-current-row style="width: 100%" border :empty-text="$t('tableEmpty.empty')">
            <el-table-column type="index" width="50">
            </el-table-column>
            <el-table-column :label="$t('factoringDetail.isSelect')" width="120">
              <template slot-scope="scope">
                <el-radio v-model="radio" :label="scope.row.id"></el-radio>
              </template>
            </el-table-column>
            <el-table-column property="bOrgName" :label="$t('factoringDetail.bOrgName')" width="550">
            </el-table-column>
            <el-table-column property="discountRate" :label="$t('factoringDetail.discountRate')" width="120">
            </el-table-column>
            <el-table-column property="createTime" :label="$t('factoringDetail.createTime')">
            </el-table-column>
          </el-table>
        </template>
      </div>
    </div>
    <el-button v-if="userType == '2' && !isCommitConfirm && this.$route.query.mat !== '0'" type="primary"
               @click="commitConfirm">{{$t('factoringDetail.confirm')}}
    </el-button>
  </div>
</template>
<script type="text/javascript">
  // import MarketSlider from './MarketSlider.vue'
  import Cookies from 'js-cookie';
  import downloadDialog from '../common/downloadDialog';
  import {
    findDetails,
    marketPriceRead,
    confirmMatch,
    queryAssetById
  } from '../../assets/js/const';

  export default {
    data() {
      return {
        downloadDialog: false,
        downloadUrl: '',
        userType: Cookies.get('userType'),
        isCommitConfirm: false,
        gridData: {},
        radio: null,
        id: this.$route.params.id,
        detailData: {},
        assetsNameView: '',
        dialogVisible: false,
        bussTypeState: null, // 资产上链发布按钮
        dialogTableVisible: false,
        ruleForm: {
          companyName: '',
          tradeSum: '',
          successSum: '',
          successRate: '',
          successAmount: '',
          failSum: '',
          swiftCode: '',
          licenseNo: '',
          contactTel: '',
          contactName: '',
          companyDomicile: '',
          countryName: '',
          areaName: ''
        },
        assetsForm: {
          id: '',
          title: '',
          assetsNo: '',
          debtType: '',
          discountRate: '',
          amount: '',
          currency: '',
          acceptanceDate: '',
          maturity: '',
          indateMessage: '',
          openSwift: '',
          openFullName: '',
          issuingDate: '',
          reimbursingBankSwift: '',
          reimbursingBankName: '',
          assetAgreement: '',
          tenderSwift: '',
          tenderFullName: '',
          creditType: '',
          lcNo: ''
        },
        marketPriceData: []
      };
    },
    components: {
      downloadDialog
    },
    created() {
      this.initData();
      this.blockchainBtnShow();
    },
    methods: {
      downloadAsset() {
        if (this.assetsForm.assetAgreement.ST0202) {
          this.downloadUrl = this.assetsForm.assetAgreement.ST0202.attachment_url;
          this.downloadDialog = true;
        } else {
          this.$message({'message': this.$t('clues.notUpload')}, 3000);
        }
      },
      closeDownloadDialog() {
        this.downloadDialog = false;
      },
      initData() {
        let that = this;
        // this.assetsNameView = '福费廷';
        let _findDeData = {};
        _findDeData.assertId = that.id;
        _findDeData['yn'] = 0;
        that.POST(findDetails, {
          body: _findDeData
        }, function (response) {
          if (response.code === 300) {
            // 机构信息、交易历史
            // response.data.assets.assetAgreement = 'http://192.144.138.58:80/group1/M00/00/20/rBUQBVst2viAas89AABQCotJo8U759.jpg;http://192.144.138.58:80/group1/M00/00/20/rBUQBVst2viAK8EaAAA1wwcz4RI228.jpg;http://192.144.138.58:80/group1/M00/00/20/rBUQBVst2viAA6gDAABBXiuimgE141.jpg;http://192.144.138.58:80/group1/M00/00/20/rBUQBVst2vmAQyhDAAjLXu_5VyM070.jpg;http://192.144.138.58:80/group1/M00/00/20/rBUQBVst2vuABT0tAAbVbBMTdvg101.jpg';
            that.ruleForm = response.data;
            that.ruleForm.companyName = response.data.companyOrg.companyName;
            that.ruleForm.contactName = response.data.companyOrg.contactName;
            that.ruleForm.contactTel = response.data.companyOrg.contactTel;
            that.ruleForm.companyDomicile = response.data.companyOrg.companyDomicile;
            that.ruleForm.swiftCode = response.data.companyOrg.swiftCode;
            that.ruleForm.licenseNo = response.data.companyOrg.licenseNo;
            // 资产信息
            that.assetsForm = response.data.assets;
          }
        });
        // 市场行情进入，调用接口显示报价列表。
        that.POST(marketPriceRead, {
          body: {
            'assertId': that.id,
            'tradingType': 1
          }
        }, function (response) {
          if (response.code === 300) {
            that.marketPriceData = response.data;
            response.data.forEach(function (item, index) {
              if ((item.priceState + '') === '107') {
                that.radio = item.id;
                that.isCommitConfirm = true;
              }
            });
          }
        });
      },
      blockchainBtnShow() {
        // 判断区块链按钮显示
        let that = this;
        that.POST(queryAssetById, {
          body: {
            'bussId': that.id
          }
        }, function (response) {
          if (response.code === 300) {
            that.bussTypeState = response.data.bussTypeState;
          }
        });
      },
      handleCurrentChange(val) {
        this.radio = this.marketPriceData.indexOf(val);
      },
      commitConfirm() {
        let that = this;
        that.POST(confirmMatch, {
          body: {
            'id': this.radio
          }
        }, function (response) {
          if (response.code === 300) {
            that.$message({
              showClose: true,
              message: that.$t('factoringDetail.confirmSuccess'),
              type: 'success'
            });
            that.$router.push({
              name: 'Buyforfeiting'
            });
          }
        });
      },
      chainStartTo(forfeitingId) {
        this.$router.push({
          'name': 'forfeitingBlockchain',
          'params': {
            'id': forfeitingId,
            'act': 0
          }
        });
      },
      chainMatchTo(forfeitingId) {
        this.$router.push({
          'name': 'forfeitingBlockchain',
          'params': {
            'id': forfeitingId,
            'act': 1
          }
        });
      },
      chainFinishTo(forfeitingId) {
        this.$router.push({
          'name': 'forfeitingBlockchain',
          'params': {
            'id': forfeitingId,
            'act': 2
          }
        });
      }
    }
  };
</script>
<style media="screen" lang="less">
  .sellerdetail-forfeiting {
    width: 1100px;
    margin: 0 auto;
    .el-button--primary {
      margin: 20px 0 40px 500px;
    }
    .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
      font-size: 15px;
    }
    .sellerdetailforfeiting-center {
      float: left;
      width: 1100px;
      ul {
        font-size: 15px;
      }
      li {
        float: left;
        width: 33%;
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
        font-size: 12px;
        color: #fff;
      }
      .el-table .cell {
        font-size: 14px;
      }
      .a_self {
        margin: 20px 0 40px 500px;
        color: #fff;
        background-color: #409EFF;
        border-color: #409EFF;
      }
      .el-button {
        padding: 9px 20px;
      }
    }
    .el-radio__label {
      display: none;
    }
  }

  .sellerdetailforfeiting-center .buyforfeiting-input {
    width: 120px;
  }

  .sellerdetailforfeiting-center .offerbuyer-button {
    width: 100px;
    height: 30px;
    background: #3967c3;
    color: white;
    border: none;
    outline: none;
    border-radius: 5px;

  }

  .sellerdetailforfeiting-center .asset-info {
    border: 1px solid #dcdfe6;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
  }

  .sellerdetailforfeiting-center .offer-info {
    border: 1px solid #dcdfe6;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
  }

  /*.asset-info span{
    margin-left: 30px;
  }*/
  .sellerdetailforfeiting-center p {
    margin-left: 20px;
  }
</style>
