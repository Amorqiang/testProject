<template id="">
  <div class="detai-factoring clearfix">
    <div class="detailfactoring-center">
      <h2>{{$t('factoringDetail.saleinformation')}}</h2>
      <div class="buyer-msg clearfix">
        <el-tabs>
          <el-tab-pane :label="$t('factoringDetail.history')">
            <ul style="margin: 0;">
              <li><span>{{$t('factoringDetail.companyName')}}：</span>{{ruleForm.companyName}}</li>
              <li><span>{{$t('factoringDetail.tradeSum')}}: </span>{{ruleForm.tradeSum}}</li>
              <li><span>{{$t('factoringDetail.successSum')}}: </span>{{ruleForm.successSum}}</li>
              <li><span>{{$t('factoringDetail.failSum')}}: </span>{{ruleForm.failSum}}</li>
              <li><span>{{$t('factoringDetail.successRate')}}: </span>{{ruleForm.successRate}}</li>
              <li style="margin-bottom: 20px;"><span>{{$t('factoringDetail.successAmount')}}: </span>{{ruleForm.successAmount}}{{$t('common.dollar')}}
              </li>
            </ul>
          </el-tab-pane>
          <el-tab-pane :label="$t('factoringDetail.introduction')">
            <ul class="clearfix" style="margin: 0">
              <li><span>{{$t('factoringDetail.companyName')}}：</span>{{companyOrg.companyName}}</li>
              <li><span>{{$t('factoringDetail.adress')}}: </span>{{companyOrg.companyDomicile}}</li>
              <li><span>{{$t('factoringDetail.license_no')}}：</span>{{companyOrg.licenseNo}}</li>
            </ul>
            <ul class="clearfix" style="margin: 0;">
              <li><span>{{$t('factoringDetail.contactName')}}：</span>{{companyOrg.contactName}}</li>
              <li><span>{{$t('factoringDetail.contactTel')}}：</span>{{companyOrg.contactTel}}</li>
              <li style="margin-bottom: 20px;"><span>{{$t('factoringDetail.swiftCode')}}：</span>{{companyOrg.swiftCode}}</li>
            </ul>
          </el-tab-pane>
        </el-tabs>
      </div>
      <h2>{{$t('factoringDetail.assetsInformation')}}</h2>
      <div class="asset-info clearfix">
        <template id="">
          <el-form :model="factoring" label-width="180px" class="saleforfaiting-form clearfix">
            <ul style="padding:0;">
              <ul class="clearfix details-ul-reset">
                <li><span>{{$t('factoringDetail.factoringNo')}}：</span>{{factoring.factoringNo}}</li>
                <li><span>{{$t('factoringDetail.factoringType')}}：</span>{{map.boolean[factoring.factoringType]}}</li>
                <li><span>{{$t('factoringDetail.factoringName')}}：</span>{{factoring.factoringName}}</li>
              </ul>
              <ul class="clearfix details-ul-reset">
                <li><span>{{$t('factoringDetail.amount')}}：</span>{{factoring.amount}}</li>
                <li><span>{{$t('factoringDetail.currency')}}：</span>{{factoring.currency}}</li>
                <li><span>{{$t('marketfactoring.transfer_rate')}}：</span>{{factoring.transferRate}}%</li>
              </ul>
              <ul class="clearfix details-ul-reset">
                <li><span>{{$t('factoringDetail.areaName')}}：</span>{{(this.$i18n.locale == 'cn')? factoring.areaName:
                  factoring.enAreaName}}
                </li>
                <li><span>{{$t('factoringDetail.countryName')}}：</span>{{(this.$i18n.locale == 'cn')?
                  factoring.countryName: factoring.enCountryName}}
                </li>
                <li><span>{{$t('factoringDetail.maturity')}}：</span>{{factoring.maturity}}</li>
              </ul>
              <ul class="clearfix details-ul-reset">
                <li><span>{{$t('factoringDetail.indateMessage')}}：</span>{{factoring.indateMessage}}</li>
                <li><span>{{$t('factoringDetail.isCove')}}：</span>{{factoring.isCove == 1 ? $t('HobbyFactoring.coveYes')
                  :
                  $t('HobbyFactoring.coveNo')}}
                </li>
                <li><span>{{$t('factoringDetail.insurer')}}：</span>{{factoring.insurer}}</li>
              </ul>
              <ul class="clearfix details-ul-reset">
                <li><span>{{$t('factoringDetail.seller')}}：</span>{{factoring.seller}}</li>
                <li><span>{{$t('factoringDetail.originators')}}：</span>{{factoring.originators}}</li>
                <li><span>{{$t('factoringDetail.obligors')}}：</span>{{factoring.obligors}}</li>
              </ul>
              <ul class="clearfix details-ul-reset">
                <li style="padding-bottom: 35px;"><span>{{$t('factoringDetail.reportInformation')}}
                <el-button type="primary" style="margin-left: 20px"
                           @click="doSth">{{$t('factoringDetail.download')}}</el-button></span>
                </li>
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
              </ul>
              <downloadDialog v-if="downloadUrl" :show="downloadDialog" v-on:closeDownloadDialog="closeDownloadDialog"
                              :url="downloadUrl" style="center"></downloadDialog>
              <!--     <li style="padding-bottom: 35px; width: 500px">
                       <span>区块链信息：
                         <el-button type="primary" style="margin-left: 0px" v-if="assetsChainStartVisible"
                             @click="chainStartTo(factoring.id)">资产发布上链</el-button>
                       </span>
                       <span>
                         <el-button type="primary" style="margin-left: 0px" v-if="assetsChainMatchVisible"
                             @click="chainMatchTo(factoring.id)">资产撮合成功</el-button>
                       </span>
                       <span>
                         <el-button type="primary" style="margin-left: 0px" v-if="assetsChainFinishVisible"
                             @click="chainFinishTo(factoring.id)">资产交易完成</el-button>
                       </span>
                       </li> -->
            </ul>
          </el-form>
        </template>
        <!--报价弹出框-->
        <el-dialog top="0" width="100%" :title="$t('factoringDetail.nowBid')" :visible.sync="dialogTableVisible"
                   style="width:800px; margin:auto;top: 10%;text-align:center">
          <el-form :model="factoring" :rules="rules" ref="factoring" label-width="200px"
                   class="saleforfaiting-form" style="margin-left: 120px;">
            <el-form-item :label="$t('factoringDetail.factoringNo')">{{factoring.factoringNo}}</el-form-item>
            <el-form-item :label="$t('factoringDetail.amount')">{{factoring.amount}}</el-form-item>
            <el-form-item :label="$t('factoringDetail.currency')">{{factoring.currency}}</el-form-item>
            <el-form-item :label="$t('factoringDetail.seller')">{{factoring.seller}}</el-form-item>
            <el-form-item :label="$t('factoringDetail.maturity')">{{factoring.maturity}}</el-form-item>
            <el-form-item :label="$t('factoringDetail.indateMessage')">{{factoring.indateMessage}}</el-form-item>
            <el-form-item :label="$t('factoringDetail.transferRate')" required prop="transferRate"
                          class="saleforfaiting-title">
              <el-input v-model="factoring.newDiscountRate" placeholder="" class="el-input"
                        style="width:120px"></el-input>
              %
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer" style="text-align: center;display:block;">
         <el-button @click="dialogTableVisible = false">{{$t('factoringDetail.cancel')}}</el-button>
         <el-button type="primary" @click="insertPrise()">{{$t('factoringDetail.submit')}}</el-button>
         </span>
        </el-dialog>
      </div>
      <h2>{{$t('factoringDetail.bidInfomation')}}</h2>
      <div class="offer-info clearfix">
        <template id="">
          <el-table :data="marketPriceReadData" highlight-current-row style="width: 100%" border
                    :empty-text="$t('tableEmpty.empty')">
            <el-table-column prop="bOrgName" :label="$t('factoringDetail.bOrgName')" width="300" class="asset-mum"
                             height="30">
            </el-table-column>
            <el-table-column prop="discountRate" :label="$t('factoringDetail.transferRate')" width="200"
                             class="asset-mum">
            </el-table-column>
            <el-table-column prop="createTime" :label="$t('factoringDetail.createTime')" class="asset-mum">
            </el-table-column>
          </el-table>
        </template>
      </div>
      <br/>
      <el-button v-if="userType =='2' && isnPrice != 1" style="margin: 30px 0 50px 480px;" type="primary"
                 @click="dialogTableVisible=true">{{$t('forfeitingdetail.bidBuy')}}
      </el-button>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {
    insert,
    findFactoringDetails,
    // queryAssetById,
    marketPriceRead
  } from '../../assets/js/const';
  import Cookies from 'js-cookie';
  import downloadDialog from '../common/downloadDialog';

  export default {
    data() {
      var checkTransferRate = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.$t('publishFactoring.inputTransferRate')));
        } else {
          if (Number.isInteger(value)) {
            if (Number(value) < 100) {
              callback();
            } else {
              callback(new Error(this.$t('publishFactoring.numSection')));
            }
          } else {
            if (!/^(([1-9][0-9]*)|(([0]\.\d{1,4}|[1-9][0-9]*\.\d{1,4})))$/.test(value)) {
              callback(new Error(this.$t('publishFactoring.numDecimal')));
            } else {
              callback();
            }
          }
        }
      };
      return {
        map: {
          boolean: {
            1: this.$t('marketfactoring.factoringType1'),
            2: this.$t('marketfactoring.factoringType2'),
            3: this.$t('marketfactoring.factoringType3'),
            4: this.$t('marketfactoring.factoringType4')
          }
        },
        userType: Cookies.get('userType'),
        assetsName: this.$route.params.assetsName,
        id: this.$route.params.id,
        assetsNameView: '',
        isnPrice: '',
        downloadDialog: false,
        downloadUrl: '',
        dialogTableVisible: false,
        assetsChainStartVisible: false, // 资产上链发布按钮
        assetsChainMatchVisible: false, // 资产撮合成功按钮
        assetsChainFinishVisible: false, // 资产交易完成按钮
        ruleForm: {
          tradeSum: '',
          successSum: '',
          failSum: '',
          successRate: '',
          successAmount: '',
          companyName: ''
        },
        ruleForm1: [
          {

            factoringNo: '',
            amount: '',
            transferRate: '',
            maturity: '',
            indateMessage: ''
          }
        ],
        companyOrg: {
          companyName: '',
          companyDomicile: '',
          license_no: '',
          contactName: '',
          contactTel: '',
          swiftCode: ''
        },
        factoring: {
          factoringNo: '',
          factoringType: '',
          factoringName: '',
          amount: '',
          currency: '',
          areaName: '',
          countryName: '',
          maturity: '',
          indateMessage: '',
          isCove: '',
          insurer: '',
          seller: '',
          originators: '',
          obligors: '',
          newDiscountRate: '',
          id: '',
          assetAgreement: ''
        },
        marketPriceReadData: [],
        rules: {
          transferRate: [
            // {required: true, message: this.$t('HobbyFactoring.pleaseInputCurrency'), trigger: 'blur'}
            {validator: checkTransferRate, trigger: 'blur'}
          ]
        }
      };
    },
    created() {
      this.initData();
      // this.blockchainBtnShow();
    },
    components: {
      downloadDialog
    },
    methods: {
      initData() {
        let that = this;
        //  买方在售市场详情展示
        that.POST(findFactoringDetails, {body: {'factoringId': that.id, 'yn': 0}}, function (response) {
          if (response.code === 300) {
            that.ruleForm = response.data;
            that.ruleForm.companyName = response.data.companyOrg.companyName;
            that.companyOrg = response.data.companyOrg;
            that.factoring = response.data.factoringResponse;
            that.ruleForm1[0] = response.data.factoringResponse;
            if (that.ruleForm.tradeSum === null || that.ruleForm.tradeSum === '') {
              that.ruleForm.tradeSum = 0;
            }
            if (that.ruleForm.successSum === null || that.ruleForm.successSum === '') {
              that.ruleForm.successSum = 0;
            }
            if (that.ruleForm.failSum === null || that.ruleForm.failSum === '') {
              that.ruleForm.failSum = 0;
            }
            if (that.ruleForm.successRate === null || that.ruleForm.successRate === '') {
              that.ruleForm.successRate = 0;
            }
            if (that.ruleForm.successAmount === null || that.ruleForm.successAmount === '') {
              that.ruleForm.successAmount = 0;
            }
            if (that.factoring.isnPrice === 1) {
              that.isnPrice = 1;
            }
          } else if (response.code === 400) {
            that.$message({
              showClose: true,
              message: response.message,
              type: 'error'
            });
          }
        });
        //  报价信息查询
        that.POST(marketPriceRead, {body: {'assertId': that.id, 'tradingType': 2}}, function (response) {
          if (response.code === 300) {
            that.marketPriceReadData = response.data;
          } else if (response.code === 400) {
            that.$message({
              showClose: true,
              message: response.message,
              type: 'error'
            });
          }
        });
      },
      // doSth: function () {
      //   let that = this;
      //   if (that.factoring.assetAgreement == null || that.factoring.assetAgreement === '') {
      //     that.$message({
      //       showClose: true,
      //       message: this.$t('factoringDetail.fileIsNullMessage'),
      //       type: 'error'
      //     });
      //   } else {
      //     window.open(that.factoring.assetAgreement.ST0208.attachment_url);
      //   }
      // },
      doSth() {
        // 判断是否有值 如果有则赋值给downloadUrl/并且downloadDialog为true
        if (this.factoring.assetAgreement.ST0208) {
          // this.downloadUrl = this.factoring.assetAgreement;
          this.downloadUrl = this.factoring.assetAgreement.ST0208.attachment_url;
          this.downloadDialog = true;
        } else {
          this.downloadUrl = '';
          this.$message({'message': this.$t('clues.notUpload')}, 3000);
        }
      },
      closeDownloadDialog() {
        this.downloadDialog = false;
      },
      insertPrise: function (formName) {
        let that = this;
        that.factoring.newDiscountRate = that.factoring.newDiscountRate.replace(/(^\s*)|(\s*$)/g, '');
        if (that.factoring.newDiscountRate == null || that.factoring.newDiscountRate === '') {
          that.$message({
            showClose: true,
            message: this.$t('factoringDetail.rateNotIsNUll'),
            type: 'error'
          });
        } else {
          var params = {};
          params.body = {};
          params.body.bussId = that.id;
          params.body.tradingType = 2;
          var regu = /^\d+\.?\d{0,4}$/;

          if (that.factoring.newDiscountRate !== '' && that.factoring.newDiscountRate != null) {
            if (!regu.test(that.factoring.newDiscountRate)) {
              that.$message({
                showClose: true,
                message: this.$t('factoringDetail.discountRateMsg'),
                type: 'error'
              });
              return false;
            } else if (parseInt(that.factoring.newDiscountRate) > 99.9999) {
              that.$message({
                showClose: true,
                message: that.$t('factoringDetail.transferRateSize'),
                type: 'error'
              });
              return false;
            }
          }
          // that.factoring.newDiscountRate = that.factoring.newDiscountRate.replace(/(^\s*)|(\s*$)/g, "");
          params.body.discountRate = that.factoring.newDiscountRate;
          let jsonObject = params;
          this.POST(insert, jsonObject, function (response) {
            if (response.code === 300) {
              that.$message({
                showClose: true,
                message: that.$t('factoringDetail.bidSuccess'),
                type: 'success'
              });
              that.$router.push({path: '/offerbankrunfactoring'});
            } else if (response.code === 400) {
              that.$message({
                showClose: true,
                message: response.message,
                type: 'error'
              });
            }
          });
        }
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
  .detai-factoring {
    width: 1100px;
    margin: 0 auto;
    .el-dialog {
      margin: 0 auto;
    }
    .detailfactoring-center {
      width: 1200px;

      ul {
        font-size: 15px
      }
      li {
        float: left;
        width: 30%;
        line-height: 30px;
        margin-top: 15px;
        /*span {*/
          /*font-weight: bold;*/
        /*}*/
      }
      .el-button {
        padding: 9px 20px;
      }
      .buyforfeiting-input {
        width: 120px;
      }
      .el-table th {
        background: #409eff;
      }
      .el-table th > .cell {
        font-size: 16px;
        color: #fff;
      }
      .offerbuyer-button {
        width: 100px;
        height: 30px;
        background: #3967c3;
        color: white;
        border: none;
        outline: none;
        border-radius: 5px;

      }
      .asset-info {
        margin-top: 20px;
        border-top: 1px solid #ccc;
        /*border: 1px solid #dcdfe6;*/
        /*box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);*/
      }
      .detailforfeiting-center p {
        margin-left: 30px;
      }
      .el-table th > .cell {
        font-size: 16px;
      }
      .el-table .cell {
        font-size: 15px;
      }
      .el-form-item__label {
        text-align: left;
        float: left;
        font-size: 15px;
        color: #606266;
        line-height: 40px;
        padding: 0 12px 0 0;
        box-sizing: border-box;
        margin-right: 120px;
      }
      .el-form-item__content {
        line-height: 40px;
        position: relative;
        font-size: 15px;
        text-align: left;
        margin-left: 300px;
      }
    }
    .el-dialog__wrapper {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      overflow: auto;
      margin: 0;
    }
    .el-tabs__nav-wrap::after {
      content: "";
      position: absolute;
      left: 138px;
      bottom: 9px;
      width: 2px;
      height: 20px;
      background-color: #e4e7ed;
      z-index: 1;
    }
    h2{
      font-weight: normal;
      margin-left: 20px;
    }
    .el-tabs__active-bar {
      position: absolute;
      bottom: 0;
      left: 0;
      height: 0px;
      background-color: #409EFF;
      z-index: 1;
    }
    .buyer-msg {
      margin-bottom: 20px;
      border-bottom: 1px solid #ccc;
      border-top: 1px solid #ccc;
      margin-top: 20px;
    }
    .el-tabs__nav-scroll {
      margin-left: 20px;
    }
    .el-tabs--bottom .el-tabs__item.is-bottom:last-child, .el-tabs--bottom .el-tabs__item.is-top:last-child, .el-tabs--top .el-tabs__item.is-bottom:last-child, .el-tabs--top .el-tabs__item.is-top:last-child{
      margin-left: 100px;
    }
    .el-tab-pane{
      margin-left: 20px;
    }
    .el-form{
      margin-left: 20px;
    }

  }

</style>
