<template id="">
  <div class="">
    <div class="my-assets-mian clearfix">
      <div class="myassets-center">
        <h1>{{$t('MyAssets.myAssets')}}</h1>
        <div class="inquiry">
          <el-form :model="ruleForm" :rules="myAssetRule" :inline="true" ref="MyassetsRuleForm">
            <el-form-item :label="$t('MyAssets.assetType')">
              <el-radio-group v-model="assetsType" @change="changeAssetsType">
                <el-radio label="1" value="">{{$t('MyAssets.assetsWaiting')}}</el-radio>
                <el-radio label="2" value="">{{$t('MyAssets.assetsBeing')}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item :label="$t('MyAssets.assetName')">
              <el-radio-group v-model="ruleForm.assetsName" @change="submitForm(1)" prop>
                <el-radio label="1" key="1">{{$t('MyAssets.forfaiting')}}</el-radio>
                <el-radio label="2" key="2">{{$t('MyAssets.factoring')}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <br>
            <el-form-item :label="$t('MyAssets.assetStatus')">
              <el-radio-group v-show="assetsType == '1'" v-model="ruleForm.assetsState">
                <el-radio v-show="userType === '2' || userType === '1'" label="101">{{$t('MyAssets.waitSubmission')}}
                </el-radio>
                <el-radio label="102">{{$t('MyAssets.underRecheck')}}</el-radio>
                <el-radio v-show="userType === '2' || userType === '1'" label="109">{{$t('MyAssets.verFailedAgain')}}
                </el-radio>
                <el-radio label="1111">{{$t('MyAssets.underReview')}}</el-radio>
                <el-radio label="0000">{{$t('MyAssets.auditFailed')}}</el-radio>
                <el-radio label="103">{{$t('MyAssets.waitingRelease')}}</el-radio>
                <el-radio label="2222">{{$t('MyAssets.Canceled')}}</el-radio>
                <el-radio label="126">{{$t('MyAssets.Failed')}}</el-radio>
              </el-radio-group>
              <el-radio-group v-show="assetsType == '2'" v-model="ruleForm.assetsState">
                <el-radio label="104">{{$t('MyAssets.offer')}}</el-radio>
                <el-radio label="3333">{{$t('MyAssets.matchSuccess')}}</el-radio>
                <el-radio label="130">{{$t('MyAssets.tradeComplete')}}</el-radio>
                <el-radio label="4444">{{$t('MyAssets.Canceled')}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <br>
            <!-- <el-form-item :label="$t('MyAssets.acceptanceCurrency')"> -->
            <el-form-item :label="ruleForm.assetsName == '1'?$t('MyAssets.acceptanceCurrency'):$t('MyAssets.currency')">
              <el-radio-group v-model="ruleForm.assetsCurrency">
                <el-radio label="CNY">CNY</el-radio>
                <el-radio label="USD">USD</el-radio>
                <el-radio label="EUR">EUR</el-radio>
              </el-radio-group>

            </el-form-item>
            <br>
            <el-form-item
              :label="ruleForm.assetsName == '1'?$t('MyAssets.DiscountRate'):$t('MyAssets.InterestRateOfTransfer')">
              <el-form-item prop="smallRate" style="margin:0;">
                <el-input type="number" v-model="ruleForm.smallRate" class="myassets-input"
                          @blur="FixedRate('smallRate', 4)"></el-input>
              </el-form-item>&nbsp;-
              <el-form-item prop="bigRate" style="margin:0;">
                <el-input type="number" v-model="ruleForm.bigRate" class="myassets-input"
                          @blur="FixedRate('bigRate', 4)"></el-input>
              </el-form-item>
            </el-form-item>
            <el-form-item
              :label="ruleForm.assetsName == '1'?$t('AssetsForSalePage.AcceptanceRange'):$t('MyAssets.RangeOfAcceptanceAmount')">
              <el-form-item prop="smallAmount" style="margin:0;">
                <el-input type="number" v-model="ruleForm.smallAmount" class="myassets-input"
                          @blur="FixedRate('smallAmount', 0)"></el-input>
              </el-form-item>&nbsp;-
              <el-form-item prop="bigAmount" style="margin:0;">
                <el-input type="number" v-model="ruleForm.bigAmount" class="myassets-input"
                          @blur="FixedRate('bigAmount', 0)"></el-input>
              </el-form-item>
            </el-form-item>
            <br v-show="ruleForm.assetsName == '1'">
            <el-form-item :label="$t('MyAssets.forfaitingType')" v-show="ruleForm.assetsName == '1'">
              <el-radio-group v-model="ruleForm.debtType">
                <el-radio label="2">{{$t('MyAssets.inlForfaiting')}}</el-radio>
                <el-radio label="1">{{$t('MyAssets.dsForfaiting')}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item :label="$t('MyAssets.openFullName')" v-show="ruleForm.assetsName == '1'">
              <el-input v-model="ruleForm.openFullName" type="text" @keyup.native="replaceFullName"
                        class="myassets-input"></el-input>
            </el-form-item>
            <br>
            <el-form-item :label="$t('MyAssets.area')">
              <el-select v-model="ruleForm.areaId" @change="getCountryId"
                         :placeholder="$t('addTellerPage.pleaseSelect')">
                <el-option
                  v-for="item in selectData.areaId.data"
                  :key="item.name"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('MyAssets.country')">
              <el-select v-model="ruleForm.countryId" :placeholder="$t('addTellerPage.pleaseSelect')">
                <el-option
                  v-for="item in selectData.countryId.data"
                  :key="item.name"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <br>
            <el-form-item :label="$t('MyAssets.orderByFiled')">
              <el-select v-model="ruleForm.orderByFiled" :placeholder="$t('addTellerPage.pleaseSelect')">
                <el-option v-show="assetsType == '1'" :label="$t('MyAssets.assetsEntryDate')" value="4"></el-option>
                <el-option v-show="assetsType == '2'" :label="$t('MyAssets.releaseDate')" value="1"></el-option>
                <el-option
                  :label="ruleForm.assetsName == '1'? $t('MyAssets.maturity'): $t('MyAssets.factoringMaturity')"
                  value="2"></el-option>
                <el-option :label="ruleForm.assetsName == '1'? $t('MyAssets.acceptanceAmount') : $t('MyAssets.amount')"
                           value="3"></el-option>
                <el-option :label="ruleForm.assetsName == '1'? $t('MyAssets.discount'): $t('MyAssets.transferRate')"
                           value="5"></el-option>
              </el-select>
            </el-form-item>
            &nbsp;<el-form-item :label="$t('MyAssets.orderByType')">
            <el-select v-model="ruleForm.orderByType" :placeholder="$t('addTellerPage.pleaseSelect')">
              <el-option :label="$t('MyAssets.asOrder')" value="1"></el-option>
              <el-option :label="$t('MyAssets.deOrder')" value="2"></el-option>
            </el-select>
          </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm(1)">{{$t('MyAssets.select')}}</el-button>
              <el-button type="primary" @click="resetForm()">{{$t('common.reset')}}</el-button>
            </el-form-item>
          </el-form>
        </div>
        <template id="">
          <!--data---单个数据 forfeitingState---状态判断（调用assetsStateChange）newAssets---新增购入 blockChain---是否上链-->
          <forfeiting v-if="ruleForm.assetsName == '1'" v-for="item in tableData" :key="item.id" :data="item"
                      :forfeitingState="item.recheckState" :newAssets="item.trsTimes > 0"
                      :blockChain="item.isnBlockChain" :source="'MyAssets'">
            <div slot="handle">
              <template>
                <!-- 经办操作 -->
                <!--待提交 复核未通过(删除{{$t('MyAssets.delete')}}/编辑{{$t('MyAssets.edit')}}/提交{{$t('MyAssets.submit')}})-->
                <el-tooltip effect="dark" :content="$t('MyAssets.delete')" placement="top"
                            v-if="userType === '2' && (item.recheckState === 101 || item.recheckState === 109)">
                  <i class="handleDelete" @click="assetsDelete(item.id)"></i>
                </el-tooltip>
                <el-tooltip effect="dark" :content="$t('MyAssets.edit')" placement="top"
                            v-if="userType === '2' && (item.recheckState === 101 || item.recheckState === 109)">
                  <i class="handleEdit" @click="assetsReload(item.id)"></i>
                </el-tooltip>
                <el-tooltip effect="dark" :content="$t('MyAssets.submit')" placement="top"
                            v-if="userType === '2' && (item.recheckState === 101 || item.recheckState === 109)">
                  <i class="handleSubmit" @click="assetsCommit(item.id)"></i>
                </el-tooltip>
                <!--复核未通过 (驳回原因){{$t('MyAssets.reasonForRejection')}}-->
                <el-tooltip effect="dark" :content="$t('MyAssets.reasonForRejection')" placement="top"
                            v-if="userType === '2' && item.recheckState === 109">
                  <i class="handleRejectReason" @click="assetsFindAdvise(item.id)"></i>
                </el-tooltip>
                <!--报价中 (报价详情){{$t('MyAssets.priceDetil')}}-->
                <el-tooltip effect="dark" :content="$t('MyAssets.priceDetil')" placement="top"
                            v-if="userType === '2' && item.recheckState === 104">
                  <i class="handleQuotationDetails" @click="handlePrices(item.id, '2')"></i>
                </el-tooltip>
                <!--撮合成功 (查看要约函){{$t('MyAssets.selectKeyCulvert')}}-->
                <el-tooltip effect="dark" :content="$t('MyAssets.selectKeyCulvert')" placement="top"
                            v-if="userType === '2' && (item.recheckState === 108 || item.recheckState === 125 || item.recheckState === 120 || item.recheckState === 44441 || item.recheckState === 130)">
                  <i class="handleDownload" @click="downloadLetter(item.id, '1')"></i>
                </el-tooltip>
                <!-- 复核操作 -->
                <!--复核中 审核未通过 (驳回){{$t('MyAssets.reject')}}-->
                <el-tooltip effect="dark" :content="$t('MyAssets.reject')" placement="top"
                            v-if="userType === '3' && (item.recheckState === 102 || item.recheckState === 210 || item.recheckState === 211)">
                  <i class="handleReject" @click="reviewHandle(item.id, '2', item.recheckState)"></i>
                </el-tooltip>
                <!--复核中 (提交){{$t('MyAssets.submit')}}-->
                <el-tooltip effect="dark" :content="$t('MyAssets.submit')" placement="top"
                            v-if="userType === '3' && item.recheckState === 102">
                  <i class="handleSubmit" @click="reviewHandle(item.id, '1')"></i>
                </el-tooltip>
                <!--审核未通过 (驳回原因){{$t('MyAssets.reasonForRejection')}}-->
                <el-tooltip effect="dark" :content="$t('MyAssets.reasonForRejection')" placement="top"
                            v-if="userType === '3' && (item.recheckState === 210 || item.recheckState === 211)">
                  <i class="handleRejectReason" @click="assetsFindAdvise(item.id)"></i>
                </el-tooltip>
                <!--待发布 (发布{{$t('MyAssets.release')}}/取消{{$t('MyAssets.cancel')}})-->
                <el-tooltip effect="dark" :content="$t('MyAssets.release')" placement="top"
                            v-if="userType === '3' && item.recheckState === 103">
                  <i class="handleRelease" @click="assetsIssue(item.id)"></i>
                </el-tooltip>
                <el-tooltip effect="dark" :content="$t('MyAssets.cancel')" placement="top"
                            v-if="userType === '3' && item.recheckState === 103">
                  <i class="handleCancelFail" @click="reviewHandle(item.id, '3')"></i>
                </el-tooltip>
                <!--报价中 (报价详情{{$t('MyAssets.priceDetil')}}/取消{{$t('MyAssets.cancel')}})-->
                <el-tooltip effect="dark" :content="$t('MyAssets.priceDetil')" placement="top"
                            v-if="userType === '3' && item.recheckState === 104">
                  <i class="handleQuotationDetails" @click="handlePrices(item.id, '3')"></i>
                </el-tooltip>
                <el-tooltip effect="dark" :content="$t('MyAssets.cancel')" placement="top"
                            v-if="userType === '3' && item.recheckState === 104">
                  <i class="handleCancelFail" @click="reviewHandle(item.id, '3')"></i>
                </el-tooltip>
                <!--撮合成功 买家确认 卖家确认 (查看要约函{{$t('MyAssets.selectKeyCulvert')}})-->
                <el-tooltip effect="dark" :content="$t('MyAssets.selectKeyCulvert')" placement="top"
                            v-if="userType === '3' && (item.recheckState === 108 || item.recheckState === 125 || item.recheckState === 120 || item.recheckState === 44441 || item.recheckState === 130)">
                  <i class="handleDownload" @click="downloadLetter(item.id, '1')"></i>
                </el-tooltip>
                <!--撮合成功 买家确认 (取消{{$t('MyAssets.cancel')}}/提交让渡函{{$t('MyAssets.uploadAlienationLetter')}})-->
                <el-tooltip effect="dark" :content="$t('MyAssets.cancel')" placement="top"
                            v-if="userType === '3' && (item.recheckState === 108 || item.recheckState === 125)">
                  <i class="handleCancelFail" @click="handleCancel(item.id)"></i>
                </el-tooltip>
                <el-tooltip effect="dark" :content="$t('MyAssets.uploadAlienationLetter')" placement="top"
                            v-if="userType === '3' && (item.recheckState === 108 || item.recheckState === 125)">
                  <div @click="submitreleaseID = item.id" style="float: right;">
                    <el-upload
                      class="upload-demo"
                      action=""
                      :before-upload="submitrelease"
                      :show-file-list="false"
                      list-type="picture">
                      <i class="handleSubmit"></i>
                    </el-upload>
                  </div>
                </el-tooltip>
                <!--查看详情{{$t('MyAssets.selectDetil')}}-->
                <el-tooltip effect="dark" :content="$t('MyAssets.selectDetil')" placement="top">
                  <i class="handleDetails" @click="toDetails(item)"></i>
                </el-tooltip>
              </template>
            </div>
          </forfeiting>
          <factoring v-if="ruleForm.assetsName == '2'" v-for="item in tableData" :key="item.id" :data="item"
                     :factoringState="item.recheckState">
            <div slot="handle">
              <template>
                <!-- <el-button v-show="isOperation" type="text" size="small">提交</el-button> -->
                <!-- 经办操作 -->
                <!--待提交 复核未通过(删除/编辑/提交)-->
                <el-tooltip effect="dark" :content="$t('MyAssets.delete')" placement="top"
                            v-if="userType === '2' && (item.recheckState === 101 || item.recheckState === 109)">
                  <i class="handleDelete" @click="assetsDelete(item.id)"></i>
                </el-tooltip>
                <el-tooltip effect="dark" :content="$t('MyAssets.edit')" placement="top"
                            v-if="userType === '2' && (item.recheckState === 101 || item.recheckState === 109)">
                  <i class="handleEdit" @click="assetsReload(item.id)"></i>
                </el-tooltip>
                <el-tooltip effect="dark" :content="$t('MyAssets.submit')" placement="top"
                            v-if="userType === '2' && (item.recheckState === 101 || item.recheckState === 109)">
                  <i class="handleSubmit" @click="assetsCommit(item.id)"></i>
                </el-tooltip>
                <!--复核未通过(驳回原因)-->
                <el-tooltip effect="dark" :content="$t('MyAssets.reasonForRejection')" placement="top"
                            v-if="userType === '2' && item.recheckState === 109">
                  <i class="handleRejectReason" @click="assetsFindAdvise(item.id)"></i>
                </el-tooltip>
                <!--报价中 (报价详情)-->
                <el-tooltip effect="dark" :content="$t('MyAssets.priceDetil')" placement="top"
                            v-if="userType === '2' && item.recheckState === 104">
                  <i class="handleQuotationDetails" @click="handlePrices(item.id, '2')"></i>
                </el-tooltip>
                <!-- 复核操作 -->
                <!--复核中 审核未通过(驳回)-->
                <el-tooltip effect="dark" :content="$t('MyAssets.reject')" placement="top"
                            v-if="userType === '3' && (item.recheckState === 102 || item.recheckState === 210 || item.recheckState === 211)">
                  <i class="handleReject" @click="reviewHandle(item.id, '2', item.recheckState)"></i>
                </el-tooltip>
                <!--复核中 (提交)-->
                <el-tooltip effect="dark" :content="$t('MyAssets.submit')" placement="top"
                            v-if="userType === '3' && item.recheckState === 102">
                  <i class="handleSubmit" @click="reviewHandle(item.id, '1')"></i>
                </el-tooltip>
                <!--审核未通过(驳回原因)-->
                <el-tooltip effect="dark" :content="$t('MyAssets.reasonForRejection')" placement="top"
                            v-if="userType === '3' && (item.recheckState === 210 || item.recheckState === 211)">
                  <i class="handleRejectReason" @click="assetsFindAdvise(item.id)"></i>
                </el-tooltip>
                <!--待发布 (发布)-->
                <el-tooltip effect="dark" :content="$t('MyAssets.release')" placement="top"
                            v-if="userType === '3' && item.recheckState === 103">
                  <i class="handleRelease" @click="assetsIssue(item.id)"></i>
                </el-tooltip>
                <el-tooltip effect="dark" :content="$t('MyAssets.cancel')" placement="top"
                            v-if="userType === '3' && item.recheckState === 103">
                  <i class="handleCancelFail" @click="reviewHandle(item.id, '3')"></i>
                </el-tooltip>
                <!--报价中 (报价详情)-->
                <el-tooltip effect="dark" :content="$t('MyAssets.priceDetil')" placement="top"
                            v-if="userType === '3' && item.recheckState === 104">
                  <i class="handleQuotationDetails" @click="handlePrices(item.id, '3')"></i>
                </el-tooltip>
                <el-tooltip effect="dark" :content="$t('MyAssets.cancel')" placement="top"
                            v-if="userType === '3' && item.recheckState === 104">
                  <i class="handleCancelFail" @click="reviewHandle(item.id, '3')"></i>
                </el-tooltip>
                <!--撮合成功 买家确认 (取消/提交让渡函)-->
                <el-tooltip effect="dark" :content="$t('MyAssets.cancel')" placement="top"
                            v-if="userType === '3' && (item.recheckState === 108 || item.recheckState === 125)">
                  <i class="handleCancelFail" @click="handleCancel(item.id)"></i>
                </el-tooltip>
                <el-tooltip effect="dark" :content="$t('MyAssets.uploadAlienationLetter')" placement="top"
                            v-if="userType === '3' && (item.recheckState === 108 || item.recheckState === 125)">
                  <div @click="submitreleaseID = item.id" style="float: right;">
                    <el-upload
                      class="upload-demo"
                      action=""
                      :before-upload="submitrelease"
                      :show-file-list="false"
                      list-type="picture">
                      <i class="handleSubmit"></i>
                    </el-upload>
                  </div>
                </el-tooltip>
                <!--查看详情{{$t('MyAssets.selectDetil')}}-->
                <el-tooltip effect="dark" :content="$t('MyAssets.selectDetil')" placement="top">
                  <i class="handleDetails" @click="toDetails(item)"></i>
                </el-tooltip>
              </template>
            </div>
          </factoring>
          <div class="block">
            <el-pagination
              @current-change="handleCurrentChange"
              layout="prev, pager, next"
              :current-page="ruleForm.page"
              :total="totalCount">
            </el-pagination>
          </div>
          <el-dialog :title="$t('MyAssets.quoteInformation')" width="800px" :visible.sync="dialogTableVisible"
                     class="myassets-dialogTableVisible">
            <el-dialog
              width="30%"
              :title="$t('MyAssets.reasonForRejection')"
              :visible.sync="innerVisible"
              append-to-body>
              {{innerVisibleText}}
            </el-dialog>
            <el-table :data="PricesData" :empty-text="$t('tableEmpty.empty')">
              <el-table-column :label="$t('MyAssets.choice')" width="80">
                <template slot-scope="scope">
                  <el-radio v-model="radio" :disabled="PricesDataDisabled" :label="scope.row.id"></el-radio>
                </template>
              </el-table-column>
              <el-table-column style="text-align: center" property="bOrgName" :label="$t('MyAssets.quotationParty')"
                               width="220"></el-table-column>
              <el-table-column style="text-align: center"
                               :label="ruleForm.assetsName == '1' ? $t('body.discountRate'):$t('publishFactoring.transferRate')"
                               width="150">
                <template slot-scope="scope">
                  {{scope.row.discountRate}}%
                </template>
              </el-table-column>
              <el-table-column style="text-align: center" property="createTime"
                               :label="$t('MyAssets.discountDate')"></el-table-column>
              <el-table-column style="text-align: center" :label="''">
                <template slot-scope="scope" style="color:red">
                  <el-button size="mini" v-if="userType === '2' && scope.row.rejectOpinion"
                             @click="showInnerVisible(scope.row.rejectOpinion)">{{$t('MyAssets.reasonForRejection')}}
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
          <el-button v-show="userType === '2'" @click="handleDialog('0')">{{$t('MyAssets.cancel')}}</el-button>
          <el-button v-show="userType === '2' && ishandlePrices" type="primary"
                     @click="handleDialog('2')">{{$t('MyAssets.determine')}}</el-button>
          <el-button v-show="userType === '3' && PricesData.length > 0" @click="handleDialog('1')">{{$t('MyAssets.reject')}}</el-button>
          <el-button v-show="userType === '3' && PricesData.length > 0" type="primary"
                     @click="handleDialog('3')">{{$t('MyAssets.determine')}}</el-button>
          </span>
          </el-dialog>
          <!--暂无数据-->
          <div class="noDate" v-if="tableData && tableData.length === 0">
            <p>{{this.$t('tableEmpty.empty')}}</p>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import forfeiting from '../common/forfeiting';
  import factoring from '../common/factoring';
  import {
    findMyAssetsWaitList,
    findMyAssetsNowList,
    queryAllArea,
    queryAllCountry,
    forfeitingDelete,
    forfeitingCommit,
    forfeitingAssetsReview,
    findAdvise,
    forfeitingPublish,
    factoryingDelete,
    factoryingCommit,
    factoryingAssetsReview,
    factoryingPublish,
    ownPricesTransactorRead,
    downloadTransactorRead,
    ownPricesRecheckRead,
    saleCancel,
    confirmMatch,
    assetsSaleCancel,
    forfeitingConfirm,
    saleConfirm,
    factoryingSaleConfirm,
    factoryingSaleCancel
  } from '../../assets/js/const';
  import {assetsState, checkDiscountRate, checkAmount} from '../../assets/js/utils';
  import Cookies from 'js-cookie';

  export default {
    data() {
      return {
        innerVisible: false,
        innerVisibleText: '',
        ishandlePrices: true,
        submitreleaseID: '',
        submitreleaseUrl: '',
        PricesDataDisabled: false,
        radio: null,
        PricesData: [],
        dialogTableVisible: false,
        selectData: {
          areaId: {},
          countryId: {}
        },
        assetsType: '1', // 资产类型
        userType: Cookies.get('userType'),
        ruleForm: {
          assetsName: '1',  //  资产名称 1.福费廷  2.保理 （必填项）
          assetsState: '', // 审核状态
          debtType: '', // 债权类型：1 国内证、2 国际证
          assetsCurrency: '',  // 资产币种CNY USD EUR
          bigRate: '',  // 最大利率
          smallRate: '', // 最小利率
          bigAmount: '', // 最大金额
          smallAmount: '', // 最小金额
          residueDate: '',  // 资产剩余天数 30 60 90
          areaId: '', // 地区
          countryId: '', // 国家编码
          orderByFiled: '', // 排序字段 1.发布时间 2.到期日 3.金额
          orderByType: '', // 1.升序 2.降序
          openFullName: '',  // 开证行
          page: 1,
          pageSize: 10
        },
        myAssetRule: {
          smallRate: [
            {
              trigger: 'blur',
              numSection: this.$t('publishFactoring.numSection'),
              numDecimal: this.$t('publishFactoring.numDecimal'),
              validator: checkDiscountRate
            }
          ],
          bigRate: [
            {
              trigger: 'blur',
              numSection: this.$t('publishFactoring.numSection'),
              numDecimal: this.$t('publishFactoring.numDecimal'),
              validator: checkDiscountRate
            }
          ],
          smallAmount: [
            {
              trigger: 'blur',
              message: this.$t('MyAssets.positiveInteger'),
              validator: checkAmount
            }
          ],
          bigAmount: [
            {
              trigger: 'blur',
              message: this.$t('MyAssets.positiveInteger'),
              validator: checkAmount
            }
          ]
        },
        tableData: [],
        totalCount: null
      };
    },
    methods: {
      //  弹框确认，回掉函数/确定按钮/取消按钮/提示内容
      confirmCancel(callback, confirm, cancel, content) {
        this.$confirm(content, this.$t('MyAssets.tips'), {
          confirmButtonText: confirm,
          cancelButtonText: cancel,
          type: 'warning'
        }).then(() => {
          callback();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('MyAssets.canceled')
          });
        });
      },
      resetForm() {
        // 如果form中存在prop校验，调用resetfields方法
        // 例如 我的资产页筛选条件 （smallRate，bigRate，smallAmount，bigAmount）
        this.$refs['MyassetsRuleForm'].resetFields();
        // 没存在prop校验的字段，强制赋值为空
        this.ruleForm.assetsCurrency = '';
        this.ruleForm.areaId = '';
        this.ruleForm.assetsState = '';
        this.ruleForm.countryId = '';
        this.ruleForm.orderByFiled = '';
        this.ruleForm.orderByType = '';
        this.ruleForm.debtType = '';
        this.ruleForm.openFullName = '';
        // 筛选条件本地保存清空
        sessionStorage.setItem('myAssetsScreen', '');
      },
      // 截取 利率
      FixedRate(el, num) {
        let _value = Number(this.ruleForm[el]);
        if (_value > 0) {
          this.ruleForm[el] = Number(this.ruleForm[el]).toFixed(num);
        }
      },
      // 截取空格
      replaceFullName() {
        this.ruleForm.openFullName = this.ruleForm.openFullName.replace(/\s+/g, '');
      },
      showInnerVisible(val) {
        this.innerVisible = true;
        this.innerVisibleText = val;
      },
      // 判断资产是否是新增
      tableRowClassName({row, column, rowIndex, columnIndex}) {
        if (row.trsTimes > 0 && columnIndex === 0) {
          return this.$i18n.locale === 'cn' ? 'AddedBuy' : 'AddedBuy-en';
        }
        return '';
      },
      changeAssetsType() {
        this.ruleForm.assetsState = '';
        this.ruleForm.orderByFiled = this.assetsType === '1' ? '4' : '1';
        this.ruleForm.orderByType = '2';
      },
      submitrelease(file) {
        var that = this;
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        };
        this.UpLoad('/upload/file', {'config': config, 'data': file}, function (response) {
          if (response.code === 200) {
            let _url = '';
            if (that.ruleForm.assetsName === '1') {
              _url = forfeitingConfirm;
            } else {
              _url = factoryingSaleConfirm;
            }
            that.POST(_url, {
              'body': {
                'id': that.submitreleaseID,
                'ST0210': response.url
              }
            }, function (response) {
              that.$message({message: that.$t('messageContent.submittedAssignmentLetter'), type: 'success'});
              that.initData();
            });
          } else {
            that.$message(response.message);
          }
        }, true);
      },
      // 在售复核取消（撮合成功）
      handleCancel(id) {
        let _url = '';
        let that = this;
        if ((this.ruleForm.assetsName + '') === '2') {
          _url = factoryingSaleCancel;
        } else {
          _url = assetsSaleCancel;
        }
        that.confirmCancel(function () {
          that.POST(_url, {'body': {'id': id}}, function (response) {
            if (response.code === 300) {
              that.$message({message: this.$t('messageContent.transactionCancelled'), type: 'success'});
            }
            that.initData();
          });
        }, this.$t('MyAssets.determine'), this.$t('MyAssets.cancel'), this.$t('MyAssets.sureCancel'));
      },
      // 在售报价按钮操作
      handleDialog(type) {
        let that = this;
        let _radio = that.radio;
        if (type === '1') {
          this.$prompt(that.$t('MyAssets.PleaseEnterReasons'), that.$t('MyAssets.tips'), {
            confirmButtonText: that.$t('MyAssets.confirm'),
            cancelButtonText: that.$t('MyAssets.cancel'),
            inputPattern: /^.{1,20}$/,
            inputErrorMessage: that.$t('MyAssets.inputRejectionReason')
          }).then(({value}) => {
            that.POST(saleCancel, {'body': {'id': _radio, 'refuseAdvice': value}}, function (response) {
              if (response.code === 300) {
                that.$message({message: that.$t('MyAssets.HasBeenRejected'), type: 'success'});
              } else {
                that.$message({message: that.$t('MyAssets.HasBeenRejected'), type: 'error'});
              }
              that.initData();
            });
          });
        } else if (type === '2') {
          if (_radio) {
            that.POST(confirmMatch, {'body': {'id': _radio}}, function (response) {
              if (response.code === 300) {
                that.$message({message: that.$t('MyAssets.SubmittedForReview'), type: 'success'});
              } else {
                that.$message({message: response.message, type: 'error'});
              }
              that.initData();
            });
          } else {
            if (that.PricesData.length > 0) {
              that.$message({message: that.$t('checkInfo.pleaseCheck'), type: 'error'});
            } else {
              that.$message({message: that.$t('tableEmpty.empty'), type: 'error'});
            }
            return;
          }
        } else if (type === '3') {
          if ((this.ruleForm.assetsName + '') === '1') {
            this.$router.push({'name': 'invitationLetter', 'params': {'id': that.radio}});
          } else {
            this.POST(saleConfirm, {'body': {'id': _radio}}, function (response) {
              if (response.code === 300) {
                that.$message({message: that.$t('factoringDetail.confirmSuccess'), type: 'success'});
              }
              that.initData();
            });
          }
        }
        that.dialogTableVisible = false;
      },
      // 在售下载 查看 邀约函
      downloadLetter(id, isDn) {
        // isDn = 1 下载
        if (isDn === '1') {
          // this.$router.push({'name': 'invitationLetter','params': {'id': id}, 'query': {'read': 1}})
          this.POST(downloadTransactorRead, {'body': {'id': id}}, function (response) {
            if (response.code === 300) {
              window.open(response.data);
            }
          });
        }
      },
      // 在售报价操作
      handlePrices(id, role) {
        let that = this;
        that.PricesDataDisabled = false;
        that.PricesData = [];
        that.radio = null;
        let _url = '';
        // 经办
        if (role === '2') {
          _url = ownPricesTransactorRead;
        } else {
          _url = ownPricesRecheckRead;
        }
        this.dialogTableVisible = true;
        this.POST(_url, {'body': {'assertId': id, 'tradingType': this.ruleForm.assetsName}}, function (response) {
          if (response.data.length > 0) {
            if (role === '3') {
              that.radio = response.data[0].id;
            }
            that.PricesData = response.data;
            that.ishandlePrices = true;
            response.data.forEach(function (item, index) {
              if (item.priceState === 107) {
                that.PricesDataDisabled = true;
                that.radio = item.id;
                that.ishandlePrices = false;
              }
            });
          }
        });
      },
      // 复核发布操作
      assetsIssue(id) {
        let that = this;
        let _url = '';
        if ((that.ruleForm.assetsName + '') === '1') {
          _url = forfeitingPublish;
        } else {
          _url = factoryingPublish;
        }
        this.POST(_url, {'body': {'id': id}}, function (response) {
          if (response.code === 300) {
            that.$message({message: that.$t('messageContent.publishedSuccessfully'), type: 'success'});
          } else {
            that.$message({message: response.message, type: 'error'});
          }
          that.initData();
        });
      },
      // 复核驳回意见
      assetsFindAdvise(id) {
        let that = this;
        let _auditType = '';
        if ((that.ruleForm.assetsName + '') === '1') {
          _auditType = '2';
        } else if ((that.ruleForm.assetsName + '') === '2') {
          _auditType = '3';
        }
        this.POST(findAdvise, {'body': {'auditId': id, 'auditType': _auditType}}, function (response) {
          if (response.code === 300) {
            that.$alert(response.data.advise, that.$t('MyAssets.reasonForRejection'), {
              confirmButtonText: that.$t('MyAssets.confirm'),
              callback: action => {
              }
            });
          } else {
            that.$message({message: response.message, type: 'error'});
          }
        });
      },
      // 经办删除操作 (确认框)
      assetsDelete(id) {
        let that = this;
        let _url = '';
        let _data = {
          'id': id
        };
        if ((this.ruleForm.assetsName + '') === '1') {
          _url = forfeitingDelete;
        } else {
          _url = factoryingDelete;
          _data.companyOrgId = Cookies.get('companyId');
        }
        this.confirmCancel(function () {
          that.POST(_url, {'body': _data}, function (response) {
            if (response.code === 300) {
              that.$message({message: that.$t('MyAssets.DeleteSuccess'), type: 'success'});
            } else {
              that.$message({message: response.message, type: 'error'});
            }
            that.initData();
          });
        }, this.$t('MyAssets.delete'), this.$t('MyAssets.cancel'), this.$t('MyAssets.sureDelete'));
      },
      // 经办编辑操作
      assetsReload(id) {
        if ((this.ruleForm.assetsName + '') === '1') {
          this.$router.push({'name': 'SaleForfaiting', 'query': {'id': id, 'iea': 1}});
        } else {
          this.$router.push({'name': 'salefactoring', 'query': {'id': id, 'iea': 1}});
        }
      },
      // 经办提交操作
      assetsCommit(id) {
        let _url = '';
        if ((this.ruleForm.assetsName + '') === '1') {
          _url = forfeitingCommit;
        } else {
          _url = factoryingCommit;
        }
        let that = this;
        that.POST(_url, {'body': {'id': id}}, function (response) {
          if (response.code === 300) {
            that.$message({message: that.$t('MyAssets.SubmittedForReview'), type: 'success'});
          } else {
            that.$message({message: response.message, type: 'error'});
          }
          that.initData();
        });
      },
      // 复核操作
      reviewHandle(id, operate, operateStatus) {
        let that = this;
        let _data = {
          'id': id,
          'operateButton': operate
        };
        let _url = '';

        if ((this.ruleForm.assetsName + '') === '1') {
          _url = forfeitingAssetsReview;
        } else {
          _url = factoryingAssetsReview;
        }
        // let _message = '';
        // if (operate == '1') {
        //   _message = '已提交'
        // } else if (operate == '3') {
        //   _message = '已取消'
        // } else {
        //   _message = '已驳回'
        // }
        if (operate === '2') {
          if (operateStatus && (operateStatus === 210 || operateStatus === 211)) {
            that.POST(_url, {'body': _data}, function (response) {
              if (response.code === 300) {
                that.$message({message: that.$t('MyAssets.HasBeenRejected'), type: 'success'});
              } else {
                that.$message({message: that.$t('MyAssets.HasBeenRejected'), type: 'error'});
              }
              that.initData();
            });
          } else {
            this.$prompt(this.$t('MyAssets.reasonForRejection'), this.$t('MyAssets.tips'), {
              confirmButtonText: this.$t('MyAssets.determine'),
              cancelButtonText: this.$t('MyAssets.cancel'),
              inputPattern: /^.{1,20}$/,
              inputErrorMessage: this.$t('MyAssets.inputRejectionReason')
            }).then(({value}) => {
              _data.advise = value;
              that.POST(_url, {'body': _data}, function (response) {
                that.$message({message: that.$t('MyAssets.HasBeenRejected'), type: 'success'});
                that.initData();
              });
            });
          }
        } else if (operate === '3') {
          that.confirmCancel(function () {
            that.POST(_url, {'body': _data}, function (response) {
              if (response.code === 300) {
                that.$message({message: that.$t('MyAssets.cancelSuccess'), type: 'success'});
              }
              that.initData();
            }, true);
          }, this.$t('MyAssets.determine'), this.$t('MyAssets.cancel'), this.$t('MyAssets.sureCancel'));
        } else {
          that.POST(_url, {'body': _data}, function (response) {
            if (response.code === 300) {
              that.$message({message: that.$t('MyAssets.SubmittedForReview'), type: 'success'});
            }
            that.initData();
          }, true);
        }
      },
      toDetails(scope) {
        if ((this.assetsType + '') === '1') {
          this.$router.push({
            'name': (this.ruleForm.assetsName + '') === '1' ? 'ForfeitingDetails' : 'FactoringDetails',
            'params': {'assetsName': this.ruleForm.assetsName, 'id': scope.id},
            'query': {'yn': (this.ruleForm.assetsState === '2222') ? '0' : ''}
          });
        } else {
          this.$router.push({
            'name': (this.ruleForm.assetsName + '') === '1' ? 'ForfeitingDetails' : 'FactoringDetails',
            'params': {'assetsName': this.ruleForm.assetsName, 'id': scope.id},
            'query': {'yn': (this.ruleForm.assetsState === '2222') ? '0' : ''}
          });
          // if ((this.ruleForm.assetsName + '') === '1') {
          //   this.$router.push({
          //     'name': 'sellerdetailforfeiting',
          //     'params': {'id': scope.id},
          //     query: {'mat': '0', 'yn': (this.ruleForm.assetsState === '4444') ? '0' : ''}
          //   });
          // } else {
          //   this.$router.push({
          //     'name': 'sellerdetailfactoring',
          //     'params': {'id': scope.id},
          //     query: {'mat': '0', 'yn': (this.ruleForm.assetsState === '4444') ? '0' : ''}
          //   });
          // }
        }
      },
      changeData() {
        let _ruleForm = this.ruleForm;
        let BodyData = {};
        for (var i in _ruleForm) {
          if (_ruleForm[i] !== 'undefined' && _ruleForm[i] !== '' && _ruleForm[i] !== null) {
            BodyData[i] = _ruleForm[i];
          }
        }
        return BodyData;
      },
      initData() {
        let that = this;
        if (sessionStorage.getItem('myAssetsScreen')) {
          let _myAssetsScreen = sessionStorage.getItem('myAssetsScreen').split(',');
          that.assetsType = _myAssetsScreen[0];
          that.ruleForm.assetsName = _myAssetsScreen[1];
          that.ruleForm.assetsState = _myAssetsScreen[2];
          that.ruleForm.debtType = _myAssetsScreen[3];
          that.ruleForm.assetsCurrency = _myAssetsScreen[4];
          that.ruleForm.bigRate = _myAssetsScreen[5];
          that.ruleForm.smallRate = _myAssetsScreen[6];
          that.ruleForm.bigAmount = _myAssetsScreen[7];
          that.ruleForm.smallAmount = _myAssetsScreen[8];
          that.ruleForm.residueDate = _myAssetsScreen[9];
          that.ruleForm.orderByFiled = this.assetsType === '1' ? '4' : '1';
          ;
          that.ruleForm.orderByType = '2';
          that.ruleForm.openFullName = _myAssetsScreen[12];
        }
        let _url = '';
        if ((this.assetsType + '') === '1') {
          _url = findMyAssetsWaitList;
        } else {
          _url = findMyAssetsNowList;
        }
        this.POST(_url, {'body': this.changeData()}, function (response) {
          that.tableData = response.data;
          that.tableData.forEach(function (item, index) {
            that.tableData[index].debtType = ((item.debtType + '') === '1') ? that.$t('MyAssets.dsForfaiting') : that.$t('MyAssets.inlForfaiting');
            if (that.ruleForm.assetsState === '2222') {
              that.tableData[index].recheckState = 2222;
            } else if (that.ruleForm.assetsState === '4444' && response.data[index].recheckState !== 104) {
              that.tableData[index].recheckState = 44441;
            } else if (that.ruleForm.assetsState === '4444' && response.data[index].recheckState === 104) {
              that.tableData[index].recheckState = 44442;
            }
            that.totalCount = response.totalCount;
          });
        }, true);
        // 查询地区
        this.POST(queryAllArea, {}, function (response) {
          that.selectData.areaId = response;
          // 查询国家
          that.getCountryId();
        });
      },
      getCountryId() {
        var that = this;
        that.POST(queryAllCountry, {'body': {'areaId': that.ruleForm.areaId || 1}}, function (response) {
          if (!response.data.length > 0) {
            that.ruleForm.countryId = '';
            that.selectData.countryId = {};
            return;
          }
          that.ruleForm.countryId = '';
          that.selectData.countryId = response;
        });
      },
      submitForm(page) {
        let _myAssetsScreen = this.assetsType +
          ',' + this.ruleForm.assetsName +
          ',' + this.ruleForm.assetsState +
          ',' + this.ruleForm.debtType +
          ',' + this.ruleForm.assetsCurrency +
          ',' + this.ruleForm.bigRate +
          ',' + this.ruleForm.smallRate +
          ',' + this.ruleForm.bigAmount +
          ',' + this.ruleForm.smallAmount +
          ',' + this.ruleForm.residueDate +
          ',' + this.ruleForm.orderByFiled +
          ',' + this.ruleForm.orderByType +
          ',' + this.ruleForm.openFullName;
        sessionStorage.setItem('myAssetsScreen', _myAssetsScreen);
        let _url = '';
        if ((this.assetsType + '') === '1') {
          _url = findMyAssetsWaitList;
        } else {
          _url = findMyAssetsNowList;
        }
        this.ruleForm.page = page;
        let that = this;
        this.$refs['MyassetsRuleForm'].validate((valid) => {
          if (valid) {
            if ((Number(this.ruleForm.smallRate) && Number(this.ruleForm.bigRate)) && Number(this.ruleForm.smallRate) > Number(this.ruleForm.bigRate)) {
              this.$message({
                message: that.$t('MyAssets.selectionRange'),
                type: 'warning'
              });
            } else if ((Number(this.ruleForm.smallAmount) && Number(this.ruleForm.bigAmount)) && Number(this.ruleForm.smallAmount) > Number(this.ruleForm.bigAmount)) {
              this.$message({
                message: that.$t('MyAssets.selectionRange'),
                type: 'warning'
              });
            } else {
              that.POST(_url, {'body': that.changeData()}, function (response) {
                that.tableData = response.data;
                that.tableData.forEach(function (item, index) {
                  that.tableData[index].debtType = ((item.debtType + '') === '1') ? that.$t('MyAssets.dsForfaiting') : that.$t('MyAssets.inlForfaiting');
                  if (that.ruleForm.assetsState === '2222') {
                    that.tableData[index].recheckState = 2222;
                  } else if (that.ruleForm.assetsState === '4444' && response.data[index].recheckState !== 104) {
                    that.tableData[index].recheckState = 44441;
                  } else if (that.ruleForm.assetsState === '4444' && response.data[index].recheckState === 104) {
                    that.tableData[index].recheckState = 44442;
                  }
                });
                that.totalCount = response.totalCount;
              }, true);
            }
          }
        });
      },
      handleClick() {
      },
      handleCurrentChange(val) {
        this.submitForm(val);
      }
    },
    mounted() {
      this.initData();
    },
    filters: {
      assetsStateChange(value, lang) {
        return assetsState(value, lang);
      }
    },
    components: {
      forfeiting,
      factoring
    }
  };
</script>
<style media="screen" lang="less">
  .el-table__body-wrapper, .el-table__footer-wrapper, .el-table__header-wrapper {

    width: 101%;
  }

  .my-assets-mian {
    .el-form-item.is-success .el-input__inner, .el-form-item.is-success .el-input__inner:focus, .el-form-item.is-success .el-textarea__inner, .el-form-item.is-success .el-textarea__inner:focus {
      border-color: #dcdfe6;
    }
    width: 1100px;
    margin: 0 auto;
    .el-form--inline {
      .el-form-item {
        margin: 0 40px 22px 0;
      }
    }
    .AddedBuy {
      background: url('../../assets/img/AddedBuy.png') no-repeat;
    }
    .AddedBuy-en {
      background: url('../../assets/img/AddedBuy-en.png') no-repeat;
    }
    .el-button + .el-button, .el-button {
      margin: 0 5px;
    }
    .el-select {
      width: 180px;
    }
    .el-form-item__label {
      padding: 0 12px 0 0;
      font-weight: bold;
    }
    .myassets-center {
      float: left;
      width: 1100px;
      .el-table th {
        background: #409eff;
      }
      .el-table th > .cell {
        font-size: 13px;
        color: #fff;
      }
      .el-table .cell {
        font-size: 12px;
      }
      .el-button--mini, .el-button--small {
        font-size: 12px;
      }
      .el-radio-group .el-radio {
        margin-left: 10px;
      }
      .block {
        display: -webkit-flex;
        text-align: center;
      }
      .el-pagination {
        display: inline-block;
        margin: 20px auto 40px;
      }
      .myassets-dialogTableVisible {
        .el-radio__label {
          display: none;
        }
        .el-table__row, .has-gutter {
          th, td {
            text-align: center;
          }
        }
      }
    }
  }

  .inquiry {
    min-width: 800px;
  }

  .myassets-input {
    width: 120px;
  }
</style>
