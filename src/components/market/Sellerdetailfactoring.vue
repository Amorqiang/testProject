<template>
  <div class="sellerdetail-forfeiting clearfix">
    <!-- <market-slider></market-slider> -->
    <div class="sellerdetailforfeiting-center clearfix">
      <div class="buyer-msg">
        <h2>{{$t('factoringDetail.saleinformation')}}</h2>
        <el-form :model="ruleForm" label-width="180px" class="saleforfaiting-form">
          <el-tabs type="border-card">
            <el-tab-pane :label="$t('factoringDetail.history')">
              <ul class="clearfix" style="margin: 0">
                <li style="width: 100%"><span>{{$t('factoringDetail.companyName')}}：</span>{{ruleForm.companyName}}</li>
                <li><span>{{$t('factoringDetail.tradeSum')}}：</span>{{ruleForm.tradeSum == null || ruleForm.tradeSum ==
                  "" ? 0 : ruleForm.tradeSum}}
                </li>
                <li><span>{{$t('factoringDetail.successSum')}}：</span>{{ruleForm.successSum == null ||
                  ruleForm.successSum == "" ? 0 : ruleForm.successSum}}
                </li>
                <li><span>{{$t('factoringDetail.failSum')}}：</span>{{ruleForm.failSum == null || ruleForm.failSum == ""
                  ? 0 : ruleForm.failSum}}
                </li>
                <li><span>{{$t('factoringDetail.successRate')}}：</span>{{ruleForm.successRate == null ||
                  ruleForm.successRate == "" ? 0 : ruleForm.successRate}}
                </li>
                <li><span>{{$t('factoringDetail.successAmount')}}：</span>{{ruleForm.successAmount == null ||
                  ruleForm.successAmount == "" ? 0 : ruleForm.successAmount}}{{$t('common.dollar')}}
                </li>
              </ul>
            </el-tab-pane>
            <el-tab-pane :label="$t('factoringDetail.introduction')">
              <ul class="clearfix" style="margin: 0">
                <li style="width: 100%"><span>{{$t('factoringDetail.companyName')}}：</span>{{ruleForm.companyName}}</li>
              </ul>
              <ul class="clearfix" style="margin: 0">
                <li><span>{{$t('factoringDetail.adress')}}：</span>{{ruleForm.companyDomicile}}</li>
                <li><span>{{$t('factoringDetail.license_no')}}：</span>{{ruleForm.licenseNo}}</li>
                <li><span>{{$t('factoringDetail.contactName')}}：</span>{{ruleForm.contactName}}</li>
              </ul>
              <ul class="clearfix" style="margin: 0">
                <li><span>{{$t('factoringDetail.contactTel')}}：</span>{{ruleForm.contactTel}}</li>
                <li><span>{{$t('factoringDetail.swiftCode')}}：</span>{{ruleForm.swiftCode}}</li>
              </ul>
            </el-tab-pane>
          </el-tabs>
        </el-form>

      </div>
      <h2>{{$t('factoringDetail.assetsInformation')}}</h2>
      <div class="asset-info clearfix">
        <template>
          <el-form :model="factoringForm" label-width="180px" class="saleforfaiting-form">
            <ul style=" padding: 0;">
              <ul class="clearfix details-ul-reset">
                <li><span>{{$t('factoringDetail.factoringNo')}}：</span>{{factoringForm.factoringNo}}</li>
                <li><span>{{$t('factoringDetail.factoringType')}}：</span>
                  {{map.boolean[factoringForm.factoringType]}}
                </li>
                <li><span>{{$t('marketfactoring.transfer_rate')}}：</span>{{factoringForm.transferRate}}%</li>
              </ul>
              <ul class="clearfix details-ul-reset">
                <li><span>{{$t('factoringDetail.amount')}}：</span>{{factoringForm.amount}}</li>
                <li><span>{{$t('factoringDetail.currency')}}：</span>{{factoringForm.currency}}</li>
                <li><span>{{$t('factoringDetail.factoringName')}}：</span>{{factoringForm.factoringName}}</li>
              </ul>
              <ul class="clearfix details-ul-reset">
                <li><span>{{$t('factoringDetail.maturity')}}：</span>{{factoringForm.maturity}}</li>
                <li><span>{{$t('factoringDetail.indateMessage')}}：</span>{{factoringForm.indateMessage}}</li>
                <li><span>{{$t('factoringDetail.isCove')}}：</span>{{factoringForm.isCove == 1 ?
                  $t('HobbyFactoring.coveYes') : $t('HobbyFactoring.coveNo')}}
                </li>
              </ul>
              <ul class="clearfix details-ul-reset">
                <li><span>{{$t('factoringDetail.insurer')}} ：</span>{{factoringForm.insurer}}</li>
                <li><span>{{$t('factoringDetail.areaName')}}：</span>{{(this.$i18n.locale == 'cn')? factoringForm.areaName: factoringForm.enAreaName}}</li>
                <li><span>{{$t('factoringDetail.countryName')}}：</span>{{(this.$i18n.locale == 'cn')? factoringForm.countryName: factoringForm.enCountryName}}</li>
              </ul>
              <ul class="clearfix details-ul-reset">
                <li><span>{{$t('factoringDetail.seller')}}：</span>{{factoringForm.seller}}</li>
                <li><span>{{$t('factoringDetail.obligors')}}：</span>{{factoringForm.obligors}}</li>
                <li><span>{{$t('factoringDetail.originators')}}：</span>{{factoringForm.originators}}</li>
              </ul>
              <ul class="clearfix details-ul-reset">
                <li style="width: 50%;">
                <span>{{$t('factoringDetail.reportInformation')}}：
                  <el-button type="primary" style="margin: 0 0 0 20px;" @click="downloadAsset">{{$t('factoringDetail.download')}}</el-button>
                </span>
                </li>
              </ul>
              <downloadDialog v-if="downloadUrl" :show="downloadDialog" v-on:closeDownloadDialog="closeDownloadDialog" :url="downloadUrl"></downloadDialog>
              <!--<li style="padding-bottom: 25px;">-->
                <!-- <template slot-scope="scope"> -->
                <!--<span>区块链信息：-->
                <!--<el-button type="primary" style="margin-left: 0px" v-if="bussTypeState == '1'">-->
                <!--<router-link :to="{'name': 'forfeitingBlockchain', 'params': { 'id': id, 'act': 0}}" style="color: #fff;">资产发布上链</router-link>-->
                <!--</el-button>-->
                <!--<el-button type="primary" style="margin-left: 0px" v-else-if="bussTypeState == '2'">-->
                <!--<router-link :to="{'name': 'forfeitingBlockchain', 'params': { 'id': id, 'act': 1}}" style="color: #fff;">资产撮合成功</router-link>-->
                <!--</el-button>-->
                <!--<el-button type="primary" style="margin-left: 0px;" v-else-if="bussTypeState == '3'">-->
                <!--<router-link :to="{'name': 'forfeitingBlockchain', 'params': { 'id': id, 'act': 2}}" style="color: #fff;">资产交易完成</router-link>-->
                <!--</el-button>-->
                <!--</span>-->
                <!-- </template> -->
              <!--</li>-->
            </ul>
          </el-form>
        </template>
      </div>
      <h2 v-if="this.$route.query.mat === '0' && factoringForm.checkState === 130">{{$t('myPrice.transactIn')}}</h2>
      <h2 v-if="this.$route.query.mat !== '0'">{{$t('factoringDetail.bidInfomation')}}</h2>
      <div v-if="this.$route.query.mat !== '0' || factoringForm.checkState === 130" class="offer-info clearfix"
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
            <el-table-column property="discountRate" :label="$t('factoringDetail.transferRate')" width="120">
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
    findFactoringDetails,
    marketPriceRead,
    confirmMatch,
    queryAssetById
  } from '../../assets/js/const';

  export default {
    data() {
      return {
        map: {
          boolean: {
            1: this.$t('marketfactoring.factoringType1'),
            2: this.$t('marketfactoring.factoringType2'),
            3: this.$t('marketfactoring.factoringType3'),
            4: this.$t('marketfactoring.factoringType4')
          }
        },
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
        // bussTypeState: '', // 资产上链发布按钮
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
        factoringForm: {
          id: '',
          factoringNo: '',
          factoringType: '',
          transferRate: '',
          amount: '',
          currency: '',
          factoringName: '',
          isCove: '',
          insurer: '',
          areaName: '',
          countryName: '',
          seller: '',
          obligors: '',
          originators: ''
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
        if (this.factoringForm.assetAgreement && this.factoringForm.assetAgreement !== '') {
          this.downloadUrl = this.factoringForm.assetAgreement.ST0208.attachment_url;
          this.downloadDialog = true;
        } else {
          this.$message({'message': this.$t('factoringDetail.notupload')}, 3000);
        }
      },
      closeDownloadDialog () {
        this.downloadDialog = false;
      },
      initData() {
        let that = this;
        let _findDeData = {};
        _findDeData.factoringId = that.id;
        _findDeData['yn'] = 0;
        that.POST(findFactoringDetails, {
          body: _findDeData
        }, function (response) {
          if (response.code === 300) {
            // 机构信息、交易历史
            // response.data.factoringResponse.assetAgreement.ST0208.attachment_url = 'http://192.144.138.58:80/group1/M00/00/20/rBUQBVst2viAK8EaAAA1wwcz4RI228.jpg;http://192.144.138.58:80/group1/M00/00/20/rBUQBVst2viAA6gDAABBXiuimgE141.jpg;http://192.144.138.58:80/group1/M00/00/20/rBUQBVst2vmAQyhDAAjLXu_5VyM070.jpg;http://192.144.138.58:80/group1/M00/00/20/rBUQBVst2vuABT0tAAbVbBMTdvg101.jpg';
            that.ruleForm = response.data;
            that.ruleForm.companyName = response.data.companyOrg.companyName;
            that.ruleForm.contactName = response.data.companyOrg.contactName;
            that.ruleForm.contactTel = response.data.companyOrg.contactTel;
            that.ruleForm.companyDomicile = response.data.companyOrg.companyDomicile;
            that.ruleForm.swiftCode = response.data.companyOrg.swiftCode;
            that.ruleForm.licenseNo = response.data.companyOrg.licenseNo;
            // 资产信息
            that.factoringForm = response.data.factoringResponse;
          }
        });
        // 市场行情进入，调用接口显示报价列表。
        that.POST(marketPriceRead, {
          body: {
            'assertId': that.id,
            'tradingType': 2
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
            // that.bussTypeState = response.data.bussTypeState;
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
        font-size: 13px;
        color: #fff;
      }
      .el-table .cell {
        font-size: 13px;
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
