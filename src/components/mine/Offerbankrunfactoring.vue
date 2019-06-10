<template>
  <div class="offerbankrunforfeiting-main clearfix">
    <div class="offerbankrunforfeiting-center">
      <h1>{{$t('myPrice.myPrice')}}</h1>
      <div class="inquiry">
        <el-form :inline="true" :model="formData" :rules="rules" ref="ruleForm">
          <div>
            <!--资产类型-->
            <el-form-item :label="$t('MyAssets.assetType')" prop="assetsType" style="display:inline-block">
              <el-radio-group v-model="formData.assetsType">
                <router-link to="offerbankrunforfeiting">
                  <el-radio label="1">{{$t('MyAssets.forfaiting')}}</el-radio>
                </router-link>
                <el-radio label="2">{{$t('MyAssets.factoring')}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <!-- 资产状态 -->
            <el-form-item :label="$t('MyAssets.factoringType')" prop="factoringType" style="display:inline-block" :class="{'offerbankrunfactoring-type-en': this.$i18n.locale == 'en'}">
              <el-radio-group v-model="formData.factoringType">
                <el-radio label="1">{{$t('MyAssets.factoringType1')}}</el-radio>
                <el-radio label="2">{{$t('MyAssets.factoringType2')}}</el-radio>
                <el-radio label="3">{{$t('MyAssets.factoringType3')}}</el-radio>
                <el-radio label="4">{{$t('MyAssets.factoringType4')}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
          <!-- 报价状态 -->
          <div>
            <el-form-item :label="$t('MyAssets.assetStatus')" prop="checkState" style="display:inline-block">
              <el-radio-group v-model="formData.checkState">
                <el-radio label="104">{{$t('MyAssets.offer')}}</el-radio>
                <el-radio label="0000">{{$t('MyAssets.matchSuccess')}}</el-radio>
                <el-radio label="130">{{$t('MyAssets.tradeComplete')}}</el-radio>
                <el-radio label="4444">{{$t('MyAssets.Canceled')}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <!-- 币种 -->
            <el-form-item :label="$t('MyAssets.currencyType')" prop="currency" style="display:inline-block">
              <el-radio-group v-model="formData.currency">
                <el-radio label="CNY"></el-radio>
                <el-radio label="USD"></el-radio>
                <el-radio label="EUR"></el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
          <!-- 转让利率范围 -->
          <div class="bottomMargin">
            <el-form-item :label="$t('MyAssets.transferRateRange')"
                          style="display:inline-block;font-size: 12px;">
              <el-form-item prop="minTransferRate" style="margin:0;">
                <el-input v-model="formData.minTransferRate" class="offerbankrunforfeiting-input" name="Number"

                          style="font-size: 12px;width:150px;" @blur="FixedRate('minTransferRate', 4)"></el-input>
              </el-form-item>
              &nbsp;-
              <el-form-item prop="maxTransferRate" style="margin:0;">
                <el-input v-model="formData.maxTransferRate" class="offerbankrunforfeiting-input" name="Number"

                          style="font-size: 12px;width:150px;" @blur="FixedRate('maxTransferRate', 4)"></el-input>
              </el-form-item>
            </el-form-item>
            <!-- 金额限制 -->
            <el-form-item :label="$t('marketfactoring.amountCount')"
                          style="display:inline-block">
              <el-form-item prop="minimum" style="margin:0;">
                <el-input v-model="formData.minimum" class="offerbankrunforfeiting-input" type="Number"
                          style="font-size: 12px;"
                          @blur="FixedRate('minimum', 0)"></el-input>
              </el-form-item>&nbsp;-
              <el-form-item prop="maximum" style="margin:0;">
                <el-input v-model="formData.maximum" class="offerbankrunforfeiting-input" type="Number"
                          style="font-size: 12px;"
                          @blur="FixedRate('maximum', 0)"></el-input>
              </el-form-item>
            </el-form-item>
          </div>
          <!-- 地区 -->
          <div>
            <el-form-item :label="$t('marketForfeiting.areaAndCountry')" prop="areaId countryId"
                          style="display:inline-block">
              <el-select v-model="formData.areaId" :placeholder="$t('addTellerPage.pleaseSelect')" id="reg-type3"
                         @change="getCountryId">
                <el-option
                  v-for="item in selectData.areaId.data"
                  :key="item.name"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
              <el-select v-model="formData.countryId" :placeholder="$t('addTellerPage.pleaseSelect')" class="reg-type2">
                <el-option
                  v-for="item in selectData.countryId.data"
                  :key="item.name"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <!-- 升降序排列 -->
          <el-form-item :label="$t('MyAssets.orderByFiled')" prop="orderBy" style="display:inline-block">
            <el-select v-model="formData.orderBy" :placeholder="$t('addTellerPage.pleaseSelect')">
              <el-option :label="$t('publishFactoring.maturity')" value="maturity"></el-option>
              <el-option :label="$t('MyAssets.amount')" value="amount"></el-option>
              <el-option :label="$t('MyAssets.transferRate')" value="transfer_rate"></el-option>
              <el-option :label="$t('marketForfeiting.publish_time')" value="publish_time"></el-option>
            </el-select>
          </el-form-item>
          <!-- 升降序 -->
          <el-form-item :label="$t('MyAssets.orderByType')" prop="ascDesc" style="display:inline-block">
            <el-select v-model="formData.ascDesc" :placeholder="$t('addTellerPage.pleaseSelect')">
              <el-option :label="$t('MyAssets.asOrder')" value="asc"></el-option>
              <el-option :label="$t('MyAssets.deOrder')" value="desc"></el-option>
            </el-select>
          </el-form-item>
          <!-- button按钮 -->
          <el-form-item style="display:inline-block">
            <el-button type="primary" @click="submitForm(1)">{{$t('MyAssets.select')}}</el-button>
            <el-button type="primary" @click="resetForm()">{{$t('common.reset')}}</el-button>
          </el-form-item>
        </el-form>
      </div>
      <template id="">
        <el-table :data="tableData" style="width: 100%; text-align: center" class="asset-table"
                  :empty-text="$t('tableEmpty.empty')"
                  :row-class-name="tableRowClassName">
          <el-table-column prop="factoringNo" :label="$t('MyAssets.assetsNo')" class="asset-mum" header-align="center"
                           width="115">
            <template slot-scope="scope">
              <p>{{scope.row.factoringNo}}</p>
              <!--显示报价信息-->
              <div v-if="usertype != '1' && (scope.row.checkState != '150' && scope.row.yn !=0 ) && (scope.row.priceState == 108 && scope.row.checkState == 104 && scope.row.rejectOpinion && scope.row.rejectOpinion.length > 0)" style="color: #fff;background: #409eff;">
                {{$t('publishForfeiting.dismissQuotati')}}
              </div>
              <div
                v-else-if="usertype != '1' && (scope.row.checkState != '150' && scope.row.yn !=0 ) && (scope.row.oldDiscountRate == 0 || scope.row.oldDiscountRate == '' || scope.row.oldDiscountRate == null) && (scope.row.checkState != 130 && scope.row.checkState != 108 && scope.row.checkState != 120 &&scope.row.checkState != 125 )"
                style="color: #fff;background: #409eff;">
                {{$t('publishForfeiting.firstPrice')}} {{scope.row.discountRate}}%
                {{$t('publishForfeiting.HandSubmit')}}
              </div>
              <div
                v-else-if="usertype != '1' && (scope.row.checkState != '150' && scope.row.yn !=0 ) && scope.row.oldDiscountRate != 0 && scope.row.oldDiscountRate!= '' && scope.row.oldDiscountRate != null  && (scope.row.checkState != 130 && scope.row.checkState != 108 && scope.row.checkState != 120 &&scope.row.checkState != 125 )"
                style="color: #fff;background: #409eff;">
                {{$t('transferRateHobby.factoringTransferChange')}}{{scope.row.discountRate}}%
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="seller" :label="$t('MyAssets.seller')" class="asset-mum" header-align="center" :width="$i18n.locale == 'cn'? '90' : '110'">
          </el-table-column>
          <el-table-column prop="factoringType" :label="$t('MyAssets.factoringType')" class="asset-mum"
                           header-align="center" :width="$i18n.locale == 'cn'? '100' : '120'">
            <template slot-scope="scope">
              <span v-if="scope.row.factoringType == 1">{{$t('MyAssets.factoringType1')}}</span>
              <span v-if="scope.row.factoringType == 2">{{$t('MyAssets.factoringType2')}}</span>
              <span v-if="scope.row.factoringType == 3">{{$t('MyAssets.factoringType3')}}</span>
              <span v-if="scope.row.factoringType == 4">{{$t('MyAssets.factoringType4')}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="amount" :label="$t('MyAssets.amount')" class="asset-mum" header-align="center" :width="$i18n.locale == 'cn'? '80' : '110'">
          </el-table-column>
          <el-table-column prop="currency" :label="$t('MyAssets.currency')" class="asset-mum" header-align="center">
          </el-table-column>
          <el-table-column prop="maturity" :label="$t('MyAssets.factoringMaturity')" class="asset-mum" :width="$i18n.locale == 'cn'? '100' : '145'"
                           header-align="center">
          </el-table-column>
          <el-table-column prop="indateMessage" :label="$t('MyAssets.indateMessage')" class="asset-mum" :width="$i18n.locale == 'cn'? '100' : '153'"
                           header-align="center">
          </el-table-column>
          <el-table-column prop="transferRate" :label="$t('MyAssets.transferRate')" class="asset-mum" :width="$i18n.locale == 'cn'? '100' : '115'"
                           header-align="center">
          </el-table-column>
          <el-table-column prop="factoringName" :label="$t('publishFactoring.factoringName')" class="asset-mum" :width="$i18n.locale == 'cn'? '90' : '100'"
                           header-align="center">
          </el-table-column>
          <el-table-column :label="$t('marketForfeiting.areaName')" class="asset-mum" :width="$i18n.locale == 'cn'? '50' : '70'"
                           header-align="center">
            <template slot-scope="scope">
              {{$i18n.locale == 'cn'? scope.row.areaName: scope.row.enAreaName}}
            </template>
          </el-table-column>
          <el-table-column :label="$t('marketForfeiting.countryName')" class="asset-mum" :width="$i18n.locale == 'cn'? '50' : '80'"
                           header-align="center">
            <template slot-scope="scope">
              {{$i18n.locale == 'cn'? scope.row.countryName: scope.row.enCountryName}}
            </template>
          </el-table-column>
          <el-table-column prop="checkState" :label="$t('MyAssets.assetStatus')" class="asset-mum" :width="$i18n.locale == 'cn'? '90' : '115'"
                           header-align="center">
            <template slot-scope="scope">
              <div v-if="( scope.row.checkState == 150 || scope.row.checkState == 104) && scope.row.yn === 0 ">
                {{$t('MyAssets.Canceled')}}
              </div>
              <div v-else>
                {{ scope.row.checkState | resetForm($i18n.locale).state }}
              </div>
            </template>
          </el-table-column>
          <!-- 操作按钮的详情也的信息 -->
          <el-table-column fixed="right" :label="$t('MyAssets.operation')" width="150" class="asset-mum"
                           header-align="center">
            <template slot-scope="scope">
              <!--编辑和查看要约函-->
              <div v-if="scope.row.checkState == '104' && scope.row.priceState == '108' &&  scope.row.yn !=0 && usertype != '1'">
                <el-button type="text" size="mini" @click="editOfferBankForFeiting(scope)">{{$t('MyAssets.edit')}}
                </el-button>
                <el-button type="text" size="mini" @click="returnMessage(scope)">{{$t('MyAssets.reasonForRejection')}}
                </el-button>
              </div>
              <!-- 查看详情页面跳转不变 -->
              <el-button type="text" size="small" @click="toDetails(scope.row)">{{$t('MyAssets.selectDetil')}}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 保理报价的弹出对话框 -->
        <el-dialog :title="$t('factoringDetail.nowBid')" ref="resetTable" :visible.sync="dialogTableVisible"
                   width="40%">
          <el-table :data="gridData" align="center">
            <el-table-column property="factoringNo" :label="$t('MyAssets.assetsNo')" width="120"></el-table-column>
            <el-table-column property="amount" :label="$t('MyAssets.amount')" width="100"></el-table-column>
            <el-table-column property="discountRate" :label="$t('MyAssets.transferRate')" width="150">
              <template slot-scope="scope">
                <el-input v-model="discountRate" :placeholder="$t('clues.enterContent')" style="width:80px;"
                          size="mini"  @input="checkNumber"></el-input>
                <span>%</span>
              </template>
            </el-table-column>
            <el-table-column property="maturity" :label="$t('MyAssets.maturity')" width="200"></el-table-column>
            <el-table-column property="indateMessage" :label="$t('MyAssets.indateMessage')"></el-table-column>

          </el-table>
          <span slot="footer" class="dialog-footer">
                 <el-button @click="clearFormData">{{$t('MyAssets.cancel')}}</el-button>
                 <el-button type="primary" @click="sendInfoMation(gridData)">{{$t('MyAssets.submit')}}</el-button>
                </span>
        </el-dialog>
        <!-- 分页数据的使用 -->
        <div class="block">
          <el-pagination
            @current-change="handleCurrentChange"
            layout="prev, pager, next"
            :page-size="formData.pageSize"
            :current-page="formData.page"
            :total="formData.total">
          </el-pagination>
        </div>
      </template>
      <!-- 显示驳回原因的对话框 -->
      <el-dialog
        :title="$t('MyAssets.reasonForRejection')"
        :visible.sync="returnDialogVisible"
        width="40%">
        <span>{{advise}}</span>
        <span slot="footer" class="dialog-footer">
              <el-button @click="returnDialogVisible = false">{{$t('companInformation.takeUp')}}</el-button>
            </span>
      </el-dialog>
    </div>
  </div>

</template>
<script type="text/javascript">
  import {
    myOfferAssets,
    queryAllArea,
    queryAllCountry,
    downloadTransactorRead,
    offerUpdate
  } from '../../assets/js/const';
  import {assetsState, checkDiscountRate, checkAmount} from '../../assets/js/utils';
  import Cookies from 'js-cookie';

  export default {
    data() {
      return {
        usertype: Cookies.get('userType'),
        companyId: Cookies.get('companyId'),
        selectData: {
          companyTypeId1: {},
          companyTypeId2: {},
          areaId: {},
          countryId: {}
        },
        advise: '',
        total: '',
        disabled: false,
        // 所有查询的数据
        formData: {
          areaId: null,
          countryId: '',
          provinceI: '',
          total: null,
          page: 1,
          pageSize: 10,
          assetsType: '2',
          factoringType: '',
          currency: '',
          minimum: '',
          maximum: '',
          minTransferRate: '',
          maxTransferRate: '',
          debtType: '',
          openFullName: '',
          ascDesc: 'desc',
          orderBy: 'publish_time'
        },
        gridData: [],
        dialogTableVisible: false,
        returnDialogVisible: false,
        rules: {
          assetsType: [
            {required: true, message: this.$t('clues.writeAssetsName'), trigger: 'change'}
          ],
          checkState: [
            {required: true, message: this.$t('clues.selectAssetsStat'), trigger: 'change'}
          ],
          currency: [
            {required: true, message: this.$t('clues.selectCurrency'), trigger: 'change'}
          ],
          minimum: [
            {
              required: true,
              trigger: 'blur',
              message: this.$t('MyAssets.positiveInteger'),
              validator: checkAmount
            }
          ],
          maximum: [
            {
              required: true,
              trigger: 'blur',
              message: this.$t('MyAssets.positiveInteger'),
              validator: checkAmount
            }
          ],
          minTransferRate: [
            {
              required: true,
              trigger: 'blur',
              numSection: this.$t('clues.minimumTransfeRate'),
              numDecimal: this.$t('clues.maximumTransfeRate'),
              validator: checkDiscountRate
            }
          ],
          maxTransferRate: [
            {
              required: true,
              trigger: 'blur',
              numSection: this.$t('publishFactoring.numSection'),
              numDecimal: this.$t('publishFactoring.numDecimal'),
              validator: checkDiscountRate
            }
          ],
          debtType: [
            {required: true, message: this.$t('clues.chooseType'), trigger: 'change'}
          ],
          countryId: [
            {required: true, message: this.$t('clues.selectCountryArea'), trigger: 'change'}
          ],
          openFullName: [
            {required: true, message: this.$t('clues.writeOpeningBank'), trigger: 'change'}
          ]
        },
        tableData: [],
        discountRate: ''
      };
    },
    filters: {
      resetForm(value, lang) {
        return assetsState(Number(value), lang);
      }
    },
    mounted() {
      this.initData();
      this.submitForm(1);
    },
    methods: {
      checkNumber(scope) {
        // console.log(scope);
        let count = this.discountRate;
        var regex = /^([1-9]\d{0,15}|0)(\.\d{1,4})?$/;
        // var regex = /^-?\d+\.?\d{1,4}$/;
        var isTrue = regex.test(count);
        if (!isTrue) {
          return false;
        } else {
          return true;
        }
      },
      resetForm() {
        // 如果form中存在prop校验，调用resetfields方法
        // 例如 我的资产页筛选条件 （smallRate，bigRate，smallAmount，bigAmount）
        this.$refs.ruleForm.resetFields();
        // 没存在prop校验的字段，强制赋值为空
        this.formData.assetsCurrency = '';
        this.formData.areaId = '';
        this.formData.assetsState = '';
        this.formData.countryId = '';
        this.formData.orderByFiled = '';
        this.formData.ascDesc = '';
        this.formData.orderBy = '';
        this.formData.openFullName = '';
        this.formData.minimum = '';
        this.formData.maximum = '';
        this.formData.minTransferRate = '';
        this.formData.maxTransferRate = '';
      },
      // 截取利率
      FixedRate(el, num) {
        let _value = Number(this.formData[el]);
        if (_value > 0) {
          this.formData[el] = Number(this.formData[el]).toFixed(num);
        }
      },
      FixedRateDiscountRate() {
        this.discountRate = Number(this.discountRate).toFixed(4);
      },
      // 搜索地区
      queryArea() {
        let that = this;
        this.POST(queryAllArea, {}, res => {
          if (res.code !== 300) return that.$message.error(that.$t('clues.failedData'));
          that.resourceList = res.data;
        });
      },
      initData() {
        var that = this;
        this.POST(queryAllArea, {}, function (response) {
          that.selectData.areaId = response;
          // that.formData.areaId = response.data[0].id;
          // 查询国家
          that.getCountryId();
        });
      },
      // 获取国家的id
      getCountryId() {
        var that = this;
        that.POST(
          queryAllCountry,
          {body: {areaId: that.formData.areaId}},
          function (response) {
            if (!response.data.length > 0) {
              that.formData.countryId = '';
              that.selectData.countryId = {};
              return;
            }
            // that.formData.countryId = response.data[0].id;
            that.formData.countryId = '';
            that.selectData.countryId = response;
          }
        );
      },
      // 处理请求的的参数
      changeData() {
        let _ruleForm = this.formData;
        let BodyData = {};
        for (var i in _ruleForm) {
          if (
            _ruleForm[i] !== 'undefined' &&
            _ruleForm[i] !== '' &&
            _ruleForm[i] !== null
          ) {
            BodyData[i] = _ruleForm[i];
          }
        }
        return BodyData;
      },
      handleCurrentChange(val) {
        this.submitForm(val);
      },
      submitForm(page) {
        this.formData.page = page;
        let that = this;
        console.log(that.formData.minimum, that.formData.maximum);
        if (that.formData.minimum > that.formData.maximum) {
          that.$message({
            message: that.$t('MyAssets.selectionRange'),
            type: 'warning'
          });
        } else {
          this.POST(myOfferAssets, {body: this.changeData()}, function (response) {
            that.tableData = response.data;
            that.formData.total = response.totalCount;
          });
        }
      },
      resetFormMethods() {
        this.dialogTableVisible = false;
      },
      // 编辑事件
      editOfferBankForFeiting(scope) {
        if (this.gridData.length > 0) {
          this.gridData = [];
        }
        this.discountRate = JSON.parse(JSON.stringify(scope.row.discountRate));
        this.gridData.push(scope.row);
        this.dialogTableVisible = true;
      },
      // 驳回原因
      returnMessage(scope) {
        this.advise = scope.row.rejectOpinion;
        this.returnDialogVisible = true;
      },
      // 点击取消按钮
      clearFormData() {
        // this.$refs.resetTable.resetFields();
        this.dialogTableVisible = false;
      },
      // 查看详情页
      toDetails(scope) {
        this.$router.push({
          name: 'FactoringDetails',
          params: {assetsName: this.formData.assetsType, id: scope.id, type: 1}
        });
      },
      // 点击提交按钮进行数据的提交
      sendInfoMation(gridData) {
        if (!this.checkNumber()) return this.$message.error(this.$t('transferRate.resultCount'));
        this.POST(
          offerUpdate,
          {
            body: {
              id: gridData[0].priceId,
              discountRate: this.discountRate
            }
          },
          res => {
            if (res.code === 411) {
              return this.$message.error(this.$t('clues.notPermission'));
            }

            if (res.code !== 300) return this.$message.error(this.$t('clues.failedSubmit'));
            this.$message.success(this.$t('transferRate.transferCount'));
            this.submitForm(1);
          }
        );
        this.dialogTableVisible = false;
      },
      // 交易成功背景颜色设置成灰色
      tableRowClassName({row, rowIndex}) {
        if ((row.checkState + '') === '130') {
          let companyId = Cookies.get('companyId');
          if ((row.ownOrgId + '') !== (companyId + '')) {
            return 'warning-row';
          }
        }
        return '';
      },
      // 查看要约函
      checkInfomation(scope) {
        // this.$router.push({'name': 'invitationLetter','params': {'id': scope.row.id}, 'query': {'read': 1}})
        this.POST(downloadTransactorRead, {'body': {'id': scope.row.id}}, function (response) {
          if (response.code === 300) {
            window.open(response.data);
          }
        });
      }
    }
  };
</script>
<style media="screen" lang="less">
  .offerbankrunforfeiting-main {
    width: 1100px;
    margin: 0 auto;
    .offerbankrunforfeiting-center {
      float: left;
      width: 100%;
    }
    .offerbankrunfactoring-type-en {
      .el-form-item__content {
        width: 680px;
      }
      .el-radio {
        width: 300px;
        margin-bottom: 10px;
        margin-left: 0px;
      }
    }
  }

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

  .bottomMargin {
    margin-bottom: 10px;
  }

  .el-button--mini,
  .el-button--small {
    font-size: 12px;
  }

  .offerbankrunforfeiting-input {
    width: 120px;
  }

  .block {
    display: -webkit-flex;
    text-align: center;
  }

  .el-table .warning-row {
    background: #ccc;
  }

  .block {
    display: -webkit-flex;
    text-align: center;
  }

  .el-pagination {
    display: inline-block;
    margin: 20px auto 40px;
  }

  .el-radio {
    margin-left: 15px;
  }

  /*.el-pagination {*/
  /*margin-top: 20px;*/
  /*text-align: center;*/
  /*margin-bottom: 20px;*/
  /*}*/
</style>
