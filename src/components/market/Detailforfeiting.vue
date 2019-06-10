<template id="">
  <div class="detai-forfeiting clearfix">
    <div class="detailforfeiting-center">
      <h2>{{$t('forfeitingdetail.saleinformation')}}</h2>
      <div class="buyer-msg clearfix">
        <el-tabs>
          <el-tab-pane :label="$t('forfeitingdetail.history')">
            <ul style="margin: 0;">
              <li><span>{{$t('forfeitingdetail.companyName')}}：</span>{{ruleForm.companyName}}</li>
              <li><span>{{$t('forfeitingdetail.tradeSum')}}: </span>{{ruleForm.tradeSum}}</li>
              <li><span>{{$t('forfeitingdetail.successSum')}}: </span>{{ruleForm.successSum}}</li>
              <li><span>{{$t('forfeitingdetail.failSum')}}: </span>{{ruleForm.failSum}}</li>
              <li><span>{{$t('forfeitingdetail.successRate')}}: </span>{{ruleForm.successRate}}</li>
              <li style="padding-bottom: 30px"><span>{{$t('forfeitingdetail.successAmount')}}: </span>{{ruleForm.successAmount}}{{$t('common.dollar')}}
              </li>
            </ul>
          </el-tab-pane>
          <el-tab-pane :label="$t('forfeitingdetail.introduction')">
            <ul class="clearfix" style="margin: 0;">
              <li><span>{{$t('forfeitingdetail.companyName')}}：</span>{{companyOrg.companyName}}</li>
              <li><span>{{$t('forfeitingdetail.adress')}}: </span>{{companyOrg.companyDomicile}}</li>
              <li><span>{{$t('forfeitingdetail.license_no')}}：</span>{{companyOrg.licenseNo}}</li>
            </ul>
            <ul class="clearfix" style="margin: 0;">
              <li><span>{{$t('forfeitingdetail.contactName')}}：</span>{{companyOrg.contactName}}</li>
              <li><span>{{$t('forfeitingdetail.contactTel')}}：</span>{{companyOrg.contactTel}}</li>
              <li style="padding-bottom: 30px"><span>{{$t('forfeitingdetail.swiftCode')}}：</span>{{companyOrg.swiftCode}}
              </li>
            </ul>
          </el-tab-pane>
        </el-tabs>
      </div>
      <h2>{{$t('forfeitingdetail.assetsInformation')}}</h2>
      <div class="asset-info clearfix">
        <template id="">
          <el-form :model="assets" label-width="180px" class="saleforfaiting-form">
            <ul class="clearfix details-ul-reset">
              <li><span>{{$t('forfeitingdetail.Title')}}：</span>{{assets.title}}</li>
              <li><span>{{$t('forfeitingdetail.assetsNo')}}：</span>{{assets.assetsNo}}</li>
              <li><span>{{$t('forfeitingdetail.assetsName')}}：</span>{{$t('marketForfeiting.forfeiting')}}</li>
            </ul>
            <ul class="clearfix details-ul-reset">
              <li><span>{{$t('forfeitingdetail.debtType')}}：</span>{{assets.debtType == 1 ?
                $t('creditLetterType.nationalName'):$t('creditLetterType.internationalName')}}
              </li>
              <li><span>{{$t('forfeitingdetail.discountRate')}}：</span>{{assets.discountRate}}%</li>
              <li><span>{{$t('forfeitingdetail.areaName')}}：</span>{{ (this.$i18n.locale == 'cn') ? assets.areaName:
                assets.enAreaName}}
              </li>
            </ul>
            <ul class="clearfix details-ul-reset">
              <li><span>{{$t('forfeitingdetail.countryName')}}：</span>{{ (this.$i18n.locale == 'cn') ?
                assets.countryName:
                assets.enCountryName}}
              </li>
              <li><span>{{$t('forfeitingdetail.amount')}}：</span>{{assets.amount}}</li>
              <li><span>{{$t('forfeitingdetail.currency')}}：</span>{{assets.currency}}</li>
            </ul>
            <ul class="clearfix details-ul-reset">
              <li><span>{{$t('forfeitingdetail.acceptanceDate')}}：</span>{{assets.acceptanceDate}}</li>
              <li><span>{{$t('forfeitingdetail.maturity')}}：</span>{{assets.maturity}}</li>
              <li><span>{{$t('forfeitingdetail.indateMessage')}}：</span>{{assets.indateMessage}}</li>
            </ul>
            <ul class="clearfix details-ul-reset">
              <li><span>{{$t('forfeitingdetail.openSwift')}}：</span>{{assets.openSwift}}</li>
              <li><span>{{$t('forfeitingdetail.openFullName')}}：</span>{{assets.openFullName}}</li>
              <li><span>{{$t('forfeitingdetail.reimbursingBankSwift')}}：</span>{{assets.reimbursingBankSwift}}</li>
            </ul>
            <ul class="clearfix details-ul-reset">
              <li><span>{{$t('forfeitingdetail.reimbursingBankName')}}：</span>{{assets.reimbursingBankName}}</li>
              <li><span>{{$t('forfeitingdetail.tenderSwift')}}：</span>{{assets.tenderSwift}}</li>
              <li><span>{{$t('forfeitingdetail.tenderFullName')}}：</span>{{assets.tenderFullName}}</li>
            </ul>
            <ul class="clearfix details-ul-reset">
              <li><span>{{$t('forfeitingdetail.lcNo')}}(LC NO)：</span>{{assets.lcNo}}</li>
              <li><span>{{$t('forfeitingdetail.issuingDate')}}：</span>{{assets.issuingDate}}</li>
              <li><span>{{$t('forfeitingdetail.creditType')}}：</span>{{assets.creditType}}</li>
            </ul>
            <!--福费庭协议下载-->
            <ul class="clearfix details-ul-reset" v-show="downloadUrl && downloadUrl.length !== 0">
              <p style="margin-top: 20px;">{{$t('forfeitingdetail.forfeitingAgreement')}}：</p>
              <li style="padding-bottom: 35px;width: 1100px;height: 64px;">
                <div style="margin: 0 10px;float: left;width: 150px;height: 100px;background: rgba(0,0,0,0.1);"
                     v-for="item in downloadUrl">
                  <div v-if="item.substr(item.length-4) == '.pdf'" style="position: relative;">
                    <img src="../../assets/img/pdf.png" style="position: absolute;top: 30px; left: 50px;"
                         @click="downloadAsset(item)">
                    <a class="down-style">
                      <img src="../../assets/img/download.png" @click="downloadAsset(item)" alt="">
                    </a>
                    <img class="yulan" src="../../assets/img/Sale-of-entry-zoom-in.png" @click="downloadAsset(item)"
                         alt="">
                  </div>
                  <div v-if="item.substr(item.length-4) == '.rar'" style="position: relative;">
                    <img src="../../assets/img/rar.png" style="position: absolute;top: 30px; left: 50px;"
                         @click="downloadAsset(item)" alt="">
                    <a class="down-style">
                      <img src="../../assets/img/download.png" @click="downloadAsset(item)" alt="">
                    </a>
                  </div>
                  <div v-if="item.substr(item.length-4) == '.zip'" style="position: relative;">
                    <img src="../../assets/img/zip.png" style="position: absolute;top: 30px; left: 50px;"
                         @click="downloadAsset(item)" alt="">
                    <a class="down-style">
                      <img src="../../assets/img/download.png" @click="downloadAsset(item)" alt="">
                    </a>
                  </div>
                  <div style="position: relative;"
                       v-if="(item.substr(item.lastIndexOf('.') ) == '.png') || (item.substr(item.lastIndexOf('.') ) == '.jpg') ||(item.substr(item.lastIndexOf('.') ) == '.jpeg')">
                    <img class="cener-style" :src=item style="height: 80px; width: 120px;left: 6px;"
                         alt="">
                    <!--下载-->
                    <a class="down-style">
                      <img src="../../assets/img/download.png" @click="downloadAsset(item)" alt="">
                    </a>
                    <!--预览-->
                    <img class="yulan" src="../../assets/img/Sale-of-entry-zoom-in.png" @click="downloadAsset1(item)"
                         alt="">
                  </div>
                </div>
              </li>
              <!--{{downloadUrl}}-->
              <!--<listforvue :url="downloadUrl"></listforvue>-->
              <!--<downloadDialog v-if="downloadUrl" :show="downloadDialog" v-on:closeDownloadDialog="closeDownloadDialog" :url="downloadUrl"></downloadDialog>-->
            </ul>
            <ul class="clearfix details-ul-reset">
              <li style="padding-bottom: 35px; width: 500px">
              <span>{{$t('forfeitingdetail.blockchainInformation')}}：
                <el-button type="primary" style="margin-left: 0px" v-if="assetsChainStartVisible"
                           @click="chainStartTo(assets.id)">{{$t('forfeitingdetail.chainStartTo')}}</el-button>
              </span>
                <span>
                <el-button type="primary" style="margin-left: 0px" v-if="assetsChainMatchVisible"
                           @click="chainMatchTo(assets.id)">{{$t('forfeitingdetail.chainMatchTo')}}</el-button>
              </span>
                <span>
                <el-button type="primary" style="margin-left: 0px" v-if="assetsChainFinishVisible"
                           @click="chainFinishTo(assets.id)">{{$t('forfeitingdetail.chainFinishTo')}}</el-button>
              </span>
              </li>
            </ul>
            <el-dialog
              title=""
              :visible.sync="dialogVisible"
              width="360px">
              <span><img :src=imgHref style="width: 300px; height: 300px;" alt=""></span>
            </el-dialog>
          </el-form>
        </template>
      </div>
      <h2>{{$t('forfeitingdetail.bidInfomation')}}</h2>
      <div class="offer-info clearfix" style="width: 1060px;margin-bottom: 30px;margin-left: 42px;">
        <!--<template id="">-->
        <el-table :data="marketPriceReadData" style="width: 1100px;font-weight: normal" border header-algin="center"
                  :empty-text="$t('tableEmpty.empty')">
          <el-table-column prop="bOrgName" :label="$t('forfeitingdetail.bOrgName')" width="360" class="asset-mum"
                           align="left"
                           height="30">
          </el-table-column>
          <el-table-column prop="discountRate" :label="$t('factoringDetail.discountRate')" width="298" align="center"
                           class="asset-mum">
          </el-table-column>
          <el-table-column prop="createTime" :label="$t('forfeitingdetail.createTime')" class="asset-mum"
                           align="center" width="400">
          </el-table-column>
        </el-table>
        <!--</template>-->
      </div>
      <br/>
      <!--<el-button v-if="userType =='2' && isnPrice != '1' " style="margin: 30px 0 50px 480px;" type="primary"-->
      <!--@click="dialogTableVisible=true">{{$t('forfeitingdetail.bidBuy')}}-->
      <!--</el-button>-->

      <div top="0" width="100%" :title="$t('forfeitingdetail.nowBid')" :visible.sync="dialogTableVisible"
           style="width:100%;margin:auto;top: 10%;text-align:center;padding-bottom: 60px;"
           v-show="userType =='2' && isnPrice != '1'">
        <h2 style="text-align: left">{{$t('forfeitingdetail.nowBid')}}</h2>
        <el-form :model="assets" :rules="rules" ref="assets" label-width="0"
                 class="saleforfaiting-form">
          <table border="1" width="100%" bordercolor="#e0e0e0">
            <thead style="background: #f2f2f2;">
            <th style="height: 50px;font-weight: normal;font-size: 16px;">{{$t('forfeitingdetail.assetsNo')}}</th>
            <th style="height: 50px;font-weight: normal;font-size: 16px;">{{$t('forfeitingdetail.amount')}}</th>
            <th style="height: 50px;font-weight: normal;font-size: 16px;">{{$t('forfeitingdetail.openFullName')}}</th>
            <th style="height: 50px;font-weight: normal;font-size: 16px;">{{$t('forfeitingdetail.discountRate')}}</th>
            <th style="height: 50px;font-weight: normal;font-size: 16px;">{{$t('forfeitingdetail.maturity')}}</th>
            <th style="height: 50px;font-weight: normal;font-size: 16px;">{{$t('forfeitingdetail.indateMessage')}}</th>
            </thead>
            <tbody>
            <tr style="height: 50px;font-size: 14px">
              <td>{{assets.assetsNo}}</td>
              <td>{{assets.amount}}</td>
              <td>{{assets.openFullName}}</td>
              <td style="width: 120px;">
                <el-input v-model="assets.newDiscountRate" placeholder="" class="login-form-input"
                          style="width:90px;"></el-input>
                %
              </td>
              <td>{{assets.maturity}}</td>
              <td>{{assets.indateMessage}}</td>
            </tr>
            </tbody>
          </table>
        </el-form>
        <span slot="footer"  style="display:block;margin-top: 30px;">
           <el-button @click="dialogTableVisible = false" style="margin: 0 20px;">{{$t('forfeitingdetail.cancel')}}</el-button>
           <el-button type="primary" @click="insertPrise()">{{$t('forfeitingdetail.submit')}}</el-button>
         </span>
      </div>
    </div>
  </div>

</template>
<script type="text/javascript">
  // import {findDetails} from '../../assets/js/const'
  // import {marketPriceRead} from '../../assets/js/const'
  import {
    insert,
    findDetails,
    queryAssetById,
    marketPriceRead
  } from '../../assets/js/const';
  import Cookies from 'js-cookie';
  import downloadDialog from '../common/downloadDialog';
  import {baseUrl} from '../../assets/js/env';

  export default {
    data() {
      return {
        userType: Cookies.get('userType'),
        assetsName: this.$route.params.assetsName,
        id: this.$route.params.id,
        assetsNameView: '',
        dialogTableVisible: true,
        assetsChainStartVisible: false, // 资产上链发布按钮
        assetsChainMatchVisible: false, // 资产撮合成功按钮
        assetsChainFinishVisible: false, // 资产交易完成按钮
        isnPrice: '',
        downloadDialog: false,
        imgHref: '',
        baseUrl: baseUrl,
        dialogVisible: false,
        downloadUrl: [],
        record: {},
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
            assetsNo: '',
            amount: '',
            openFullName: '',
            discountRate: '',
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
        assets: {
          title: '',
          assetsNo: '',
          debtType: '',
          discountRate: '',
          areaName: '',
          countryName: '',
          amount: '',
          currency: '',
          acceptanceDate: '',
          maturity: '',
          indateMessage: '',
          openSwift: '',
          reimbursingBankSwift: '',
          reimbursingBankName: '',
          tenderSwift: '',
          tenderFullName: '',
          lcNo: '',
          issuingDate: '',
          creditType: '',
          assetAgreement: '',
          openFullName: '',
          newDiscountRate: '',
          id: ''

        },
        marketPriceReadData: [],
        rules: {
          discountRate: [
            {required: true, message: this.$t('HobbyFactoring.pleaseInputCurrency'), trigger: 'blur'}
          ]
        }
      };
    },
    created() {
      this.initData();
      this.blockchainBtnShow();
    },
    components: {
      downloadDialog
    },
    methods: {
      downloadAsset(item) {
        console.log(this.downloadUrl);
        window.open(item);
      },
      downloadAsset1(item) {
        this.dialogVisible = true;
        this.imgHref = item;
      },
      initData() {
        let that = this;
//  买方在售市场详情展示
        that.POST(findDetails, {body: {'assertId': that.id, 'yn': 0}}, function (response) {
          if (response.code === 300) {
            that.ruleForm = response.data;
            that.ruleForm.companyName = response.data.companyOrg.companyName;
            that.companyOrg = response.data.companyOrg;
            that.assets = response.data.assets;
            console.log(that.assets.isnPrice);
            console.log(2);
            that.ruleForm1[0] = response.data.assets;
            if (response.data.assets.assetAgreement.ST0202) {
              that.downloadUrl = response.data.assets.assetAgreement.ST0202.attachment_url.split(';');
              // that.downloadUrl = ['http://139.199.116.36:8088/group1/M00/00/0A/rBUABlsPl0WACbhIAAAPV7zaEuw620.png', 'http://139.199.116.36:8088/group1/M00/00/0A/rBUABlsPl0WACbhIAAAPV7zaEuw620.pdf', 'http://139.199.116.36:8088/group1/M00/00/0A/rBUABlsPl0WACbhIAAAPV7zaEuw620.zip', 'http://139.199.116.36:8088/group1/M00/00/0A/rBUABlsPl0WACbhIAAAPV7zaEuw620.rar', 'http://139.199.116.36:8088/group1/M00/00/0A/rBUABlsPl0WACbhIAAAPV7zaEuw620.png'];
              console.log(that.downloadUrl);
            } else {
              that.downloadUrl = '';
            }
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
            console.log(1);
            if (that.assets.isnPrice === 1) {
              that.isnPrice = '1';
              console.log(this.isnPrice);
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
        that.POST(marketPriceRead, {body: {'assertId': that.id, 'tradingType': 1}}, function (response) {
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
      doSth() {
// 判断是否有值 如果有则赋值给downloadUrl/并且downloadDialog为true
        if (this.assets.assetAgreement.ST0202) {
          this.downloadUrl = this.assets.assetAgreement.ST0202.attachment_url;
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
        that.assets.newDiscountRate = that.assets.newDiscountRate.replace(/(^\s*)|(\s*$)/g, '');
        if (that.assets.newDiscountRate == null || that.assets.newDiscountRate === '') {
          that.$message({
            showClose: true,
            message: that.$t('factoringDetail.rateNotIsNUll'),
            type: 'error'
          });
        } else {
          var params = {};
          params.body = {};
          params.body.bussId = that.id;
          params.body.tradingType = 1;
          var regu = /^\d+\.?\d{0,4}$/;
          if (that.assets.newDiscountRate !== '' && that.assets.newDiscountRate != null) {
            if (!regu.test(that.assets.newDiscountRate)) {
              that.$message({
                showClose: true,
                message: that.$t('factoringDetail.discountRateMsg'),
                type: 'error'
              });
              return false;
            } else if (parseInt(that.assets.newDiscountRate) > 99.9999) {
              that.$message({
                showClose: true,
                message: that.$t('factoringDetail.discountRateSize'),
                type: 'error'
              });
              return false;
            }
          }
          params.body.discountRate = that.assets.newDiscountRate;
          let jsonObject = params;
          this.$confirm('确认报价买入吗, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.POST(insert, jsonObject, function (response) {
              if (response.code === 300) {
                that.$message({
                  showClose: true,
                  message: that.$t('factoringDetail.bidSuccess'),
                  type: 'success'
                });
                that.$router.push({path: '/offerbankrunforfeiting'});
              } else if (response.code === 400) {
                that.$message({
                  showClose: true,
                  message: response.message,
                  type: 'error'
                });
              }
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消报价'
            });
          });
          // this.POST(insert, jsonObject, function (response) {
          //   if (response.code === 300) {
          //     that.$message({
          //       showClose: true,
          //       message: that.$t('factoringDetail.bidSuccess'),
          //       type: 'success'
          //     });
          //     that.$router.push({path: '/offerbankrunforfeiting'});
          //   } else if (response.code === 400) {
          //     that.$message({
          //       showClose: true,
          //       message: response.message,
          //       type: 'error'
          //     });
          //   }
          // });
//      }
// });
        }
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
            if (response.data.bussTypeState === 1) {
              that.assetsChainStartVisible = true;
            }
            if (response.data.bussTypeState === 2) {
              that.assetsChainMatchVisible = true;
            }
            if (response.data.bussTypeState === 3) {
              that.assetsChainFinishVisible = true;
            }
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
  .detai-forfeiting {
    width: 1100px;
    margin: 0 auto;
    .detailforfeiting-center {
      width: 1100px;
      h2 {
        display: block;
        font-size: 1.5em;
        -webkit-margin-before: 0.83em;
        -webkit-margin-after: 0.83em;
        -webkit-margin-start: 0px;
        -webkit-margin-end: 0px;
        font-weight: normal;
        /*border-bottom: 1px solid #ccc;*/
        margin-left: 43px;
      }
      ul {
        font-size: 15px
      }
      li {
        float: left;
        width: 33%;
        line-height: 30px;
        margin-top: 15px;
        font-size: 14px;
        color: #4f4f4f;
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
        background: #f2f2f2;
        color: #000;
        text-align: center;
        font-weight: normal
      }
      .el-tabs__header {
        border-top: 1px solid #ccc;
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
        border-top: 1px solid #dcdfe6;
        /*box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);*/
      }
      table {
        border-collapse: collapse;
        /*margin-left: -100px;*/
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
      img {
        vertical-align: middle;
        text-align: center;
      }
      .el-tabs__nav {
        margin-left: 43px;
      }
      .el-tabs__active-bar {
        height: 0;
      }
      .el-tabs__nav-wrap::after {
        content: "";
        position: absolute;
        left: 194px;
        bottom: 0;
        width: 2px;
        height: 20px;
        background-color: #e4e7ed;
        z-index: 1;
      }
      .buyer-msg {
        margin-bottom: 20px;
        border-bottom: 1px solid #ccc;
      }
      .el-tabs__item {
        padding: 11px 100px;
      }
      .el-table th > .cell {
        color: #000;
      }
      .saleforfaiting-form {
        margin-left: 0;
      }
      .login-form-input .el-input__inner {
        border: 0 none;
        border-bottom: 1px solid #ccc;
        border-radius: 0px;
        height: 20px;
      }
      .cener-style {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(7%, 14%);
        /*transform: translateY(-50%);*/
      }
      .down-style {
        position: absolute;
        top: 60%;
        left: 50%;
        transform: translate(217%, 234%);
        color: #ccc;
      }
      .yulan {
        position: absolute;
        top: 80%;
        left: 4%;
        transform: translate(30%, 383%);
      }
      .el-tabs__content {
        margin-left: 42px;
      }
      .saleforfaiting-form {
        margin-left: 42px;
      }
      /*.el-form-item{*/
      /*border: 1px solid #ccc;*/
      /*}*/
      /*.el-tabs__item.is-active::after{*/
      /*content: "";*/
      /*position: absolute;*/
      /*left: 119px;*/
      /*bottom: -8px;*/
      /*width: 2px;*/
      /*height: 30px;*/
      /*background-color: #e4e7ed;*/
      /*z-index: 1;*/
      /*}*/
    }
  }

</style>
