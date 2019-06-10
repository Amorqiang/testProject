<template id="">
  <div class="offerbankreviewforfeiting-main clearfix">
    <div class="offerbankreviewforfeiting-center clearfix">
      <h1>{{$t('myPrice.myPrice')}}</h1>
      <el-form :inline="true" :model="formData" :rules="rules" ref="ruleForm">
        <div>
          <!--资产类型-->
          <el-form-item :label="$t('MyAssets.assetType')" prop="assetsType" style="display:inline-block">
            <el-radio-group v-model="formData.assetsType">
              <router-link to="offerbankreviewforfeiting">
                <el-radio label="1">{{$t('MyAssets.forfaiting')}}</el-radio>
              </router-link>
              <router-link to="offerbankreviewfactoring">
                <el-radio label="2">{{$t('MyAssets.factoring')}}</el-radio>
              </router-link>
            </el-radio-group>
          </el-form-item>
          <!-- 保理状态 -->
          <el-form-item :label="$t('MyAssets.factoringType')" prop="factoringType" style="display:inline-block"
                        :class="{'offerbankreviewfactoring-type-en': this.$i18n.locale == 'en'}">
            <el-radio-group v-model="formData.factoringType">
              <el-radio label="1">{{$t('MyAssets.factoringType1')}}</el-radio>
              <el-radio label="2">{{$t('MyAssets.factoringType2')}}</el-radio>
              <el-radio label="3">{{$t('MyAssets.factoringType3')}}</el-radio>
              <el-radio label="4">{{$t('MyAssets.factoringType4')}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <!-- 资产状态 -->
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
          <el-form-item :label="$t('MyAssets.acceptanceCurrency')" prop="currency" style="display:inline-block">
            <el-radio-group v-model="formData.currency">
              <el-radio label="CNY"></el-radio>
              <el-radio label="USD"></el-radio>
              <el-radio label="EUR"></el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <!-- 转让利率范围 -->
        <div class="bottomMargin">
          <el-form-item :label="$t('publishFactoring.transferRate')" prop="minDiscountRate maxDiscountRate"
                        style="display:inline-block;font-size: 12px;">
            <el-form-item prop="minTransferRate" style="margin:0;">
              <el-input v-model="formData.minTransferRate" class="offerbankrunforfeiting-input" name="Number"
                        type="Number"

                        style="font-size: 12px;width:150px;" @blur="FixedRate('minTransferRate', 4)"></el-input>
            </el-form-item>
            &nbsp;-
            <el-form-item prop="maxTransferRate" style="margin:0;">
              <el-input v-model="formData.maxTransferRate" class="offerbankrunforfeiting-input" name="Number"
                        type="Number"

                        style="font-size: 12px;width:150px;" @blur="FixedRate('maxTransferRate', 4)"></el-input>
            </el-form-item>
          </el-form-item>
          <!-- 金额限制 -->
          <el-form-item :label="$t('MyAssets.amountCount')" prop="minimum maximum"
                        style="display:inline-block">
            <el-input v-model="formData.minimum" class="offerbankrunforfeiting-input" name="Number" type="Number"
                      style="font-size: 12px;width: 150px;"
                      @blur="FixedRate('minimum', 2)"></el-input>&nbsp;-
            <el-input v-model="formData.maximum" class="offerbankrunforfeiting-input" name="Number" type="Number"
                      style="font-size: 12px;width: 150px;"
                      @blur="FixedRate('maximum', 2)"></el-input>
          </el-form-item>
        </div>
        <!-- 地区 -->
        <div>
          <el-form-item :label="$t('marketForfeiting.areaAndCountry')" prop="areaId countryId">
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
        <!--查询按扭和重置按钮-->
        <el-form-item>
          <el-button type="primary" @click="submitForm(1)">{{$t('MyAssets.select')}}</el-button>
          <el-button type="primary" @click="resetForm()">{{$t('common.reset')}}</el-button>
        </el-form-item>
      </el-form>
      <!-- table表格渲染 -->
      <template>
        <el-table :data="tableData" style="width: 100%; text-align: center" class="asset-table"
                  :row-class-name="tableRowClassName"
                  @cell-mouse-enter="affectRow" :empty-text="$t('tableEmpty.empty')">
          <el-table-column prop="factoringNo" :label="$t('MyAssets.assetsNo')" class="asset-mum"
                           :width="$i18n.locale == 'cn'? '110' : '120'"
                           header-align="center">
            <template slot-scope="scope">
              <p>{{scope.row.factoringNo}}</p>
              <!--显示报价信息-->
              <div
                v-if="(scope.row.priceState == 108 && scope.row.checkState == 104) && (scope.row.checkState != '150' && scope.row.yn !=0 )"
                style="color: #fff;background: #409eff;">
                {{$t('publishForfeiting.dismissQuotati')}}
              </div>
              <div
                v-else-if="(scope.row.oldDiscountRate == 0 || scope.row.oldDiscountRate == '' || scope.row.oldDiscountRate == null)&& (scope.row.checkState != '150' && scope.row.yn !=0 ) && (scope.row.checkState != 130 && scope.row.checkState != 108 && scope.row.checkState != 120 &&scope.row.checkState != 125 )"
                style="color: #fff;background: #409eff;">
                {{$t('publishForfeiting.firstPrice')}} {{scope.row.discountRate}}%
                {{$t('publishForfeiting.HandSubmit')}}
              </div>
              <div
                v-else-if="scope.row.oldDiscountRate != 0 && scope.row.oldDiscountRate != '' && scope.row.oldDiscountRate != null && (scope.row.checkState != '150' && scope.row.yn !=0 ) && (scope.row.checkState != 130 && scope.row.checkState != 108 && scope.row.checkState != 120 &&scope.row.checkState != 125 )"
                style="color: #fff;background: #409eff;">
                {{$t('transferRateHobby.factoringTransferChange')}}{{scope.row.discountRate}}%
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="seller" :label="$t('MyAssets.seller')" class="asset-mum"
                           :width="$i18n.locale == 'cn'? '100' : '100'"
                           header-align="center">
          </el-table-column>
          <el-table-column prop="factoringType" :label="$t('MyAssets.factoringType')" class="asset-mum"
                           :width="$i18n.locale == 'cn'? '100' : '100'"
                           header-align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.factoringType == 1">{{$t('MyAssets.factoringType1')}}</span>
              <span v-if="scope.row.factoringType == 2">{{$t('MyAssets.factoringType2')}}</span>
              <span v-if="scope.row.factoringType == 3">{{$t('MyAssets.factoringType3')}}</span>
              <span v-if="scope.row.factoringType == 4">{{$t('MyAssets.factoringType4')}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="amount" :label="$t('MyAssets.amount')" class="asset-mum" header-align="center"
                           :width="$i18n.locale == 'cn'? '80' : '80'">
          </el-table-column>
          <el-table-column prop="currency" :label="$t('MyAssets.currency')" class="asset-mum" header-align="center"
                           :width="$i18n.locale == 'cn'? '80' : '80'">
          </el-table-column>
          <el-table-column prop="maturity" :label="$t('MyAssets.factoringMaturity')"
                           :width="$i18n.locale == 'cn'? '100' : '145'" class="asset-mum"
                           header-align="center">
          </el-table-column>
          <el-table-column prop="indateMessage" :label="$t('MyAssets.indateMessage')"
                           :width="$i18n.locale == 'cn'? '100' : '155'" class="asset-mum"
                           header-align="center">
          </el-table-column>
          <el-table-column prop="transferRate" :label="$t('MyAssets.transferRate')" class="asset-mum"
                           :width="$i18n.locale == 'cn'? '100' : '80'"
                           header-align="center">
          </el-table-column>
          <el-table-column prop="factoringName" :label="$t('MyAssets.factoringName')" class="asset-mum"
                           :width="$i18n.locale == 'cn'? '100' : '100'"
                           header-align="center">
          </el-table-column>
          <el-table-column :label="$t('marketForfeiting.areaName')" class="asset-mum"
                           header-align="center">
            <template slot-scope="scope">
              {{$i18n.locale == 'cn'? scope.row.areaName: scope.row.enAreaName}}
            </template>
          </el-table-column>
          <el-table-column :label="$t('marketForfeiting.countryName')" class="asset-mum"
                           header-align="center">
            <template slot-scope="scope">
              {{$i18n.locale == 'cn'? scope.row.countryName: scope.row.enCountryName}}
            </template>
          </el-table-column>
          <el-table-column prop="checkState" :label="$t('MyAssets.assetStatus')" class="asset-mum" width="115"
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
          <!-- 表格的操作 -->
          <el-table-column fixed="right" :label="$t('MyAssets.operation')" width="150" class="asset-mum"
                           header-align="center">
            <template slot-scope="scope">
              <!-- 表格的操作步骤 -->
              <!-- 修改了编辑的提交的按钮的功能和显示 -->
              <div v-if="scope.row.priceState == '105' && scope.row.yn !=0 ">
                <div v-if="scope.row.checkState == 104 && scope.row.oldDiscountRate == 0 ">
                  <el-button type="text" size="mini" @click="Submission(scope)">{{$t('MyAssets.submit')}}</el-button>
                  <el-button type="text" size="mini" @click="returnWhy(scope)">{{$t('MyAssets.reject')}}</el-button>
                </div>
                <div v-else-if="scope.row.oldDiscountRate !== 0 && scope.row.checkState == 104 ">
                  <el-button type="text" size="mini" slot="reference" @click="Submission(scope)">
                    {{$t('MyAssets.submit')}}
                  </el-button>
                  <el-button type="text" size="mini" @click="returnWhy(scope)">{{$t('MyAssets.reject')}}</el-button>
                </div>
              </div>
              <!--确认按钮的显示-->
              <div
                v-if="(scope.row.checkState == '108'|| scope.row.checkState == 120  )  && scope.row.isStruck == '2'">
                <el-button type="text" size="mini" @click="confirmButton(scope)">{{$t('AssetsForSalePage.confirm')}}
                </el-button>
              </div>
              <!-- 取消的数据接口确认 -->
              <div
                v-if="(scope.row.checkState == 108 ) && scope.row.updateTranLetter == 0 ">
                <el-button type="text" size="mini" @click="cancelMessage(scope)">{{$t('MyAssets.cancel')}}</el-button>
              </div>
              <el-button type="text" size="small" @click="toDetails(scope.row)">{{$t('MyAssets.selectDetil')}}
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <!-- 点击驳回的对话框显示，填写内容 -->
      <el-dialog
        :title="$t('MyAssets.reasonForRejection')"
        :visible.sync="dialogVisible"
        width="30%">
            <span>
                <el-input
                  type="textarea"
                  :rows="5"
                  :placeholder="$t('clues.enterContent')"
                  v-model="textarea">
                </el-input>
            </span>
        <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">{{$t('MyAssets.cancel')}}</el-button>
              <el-button type="primary" @click="confirmInfoMust">{{$t('MyAssets.determine')}}</el-button>
            </span>
      </el-dialog>
      <!-- 分页数据的使用 -->
      <div class="block">
        <el-pagination
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :page-size="formData.pageSize"
          :current-page="formData.page"
          :center="true"
          :total="formData.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {
    myOfferAssets,
    queryAllArea,
    queryAllCountry,
    downloadTransactorRead,
    buyCancel,
    buyConfirm,
    factoryingPublish,
    factoryingBuyConfirm,
    factoryingBuyCancel
  } from '../../assets/js/const';
  import Cookies from 'js-cookie';
  import {assetsState, checkDiscountRate, checkAmount} from '../../assets/js/utils';

  export default {
    data() {
      return {
        companyId: Cookies.get('companyId'),
        selectData: {
          companyTypeId1: {},
          companyTypeId2: {},
          areaId: {},
          countryId: {}
        },
        advise: '',
        disabled: false,
        dialogVisible: false,
        textarea: '',
        scopeId: '',
        content: '',
        republishFlagId: '',
        formData: {
          areaId: null,
          countryId: '',
          provinceId: '',
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
            {required: true, message: this.$t('clues.writeAssetsName'), trigger: 'blur'}
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
              message: this.$t('publishForfeiting.inputTwo'),
              validator: checkAmount
            }
          ],
          maximum: [
            {
              required: true,
              trigger: 'blur',
              message: this.$t('publishForfeiting.inputTwo'),
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
        tableData: []
      };
    },
    components: {},
    filters: {
      resetForm(value, lang) {
        return assetsState(Number(value), lang);
      }
    },
    mounted() {
      this.initData();
      this.submitForm(1);
      this.returnRepublishFlag();
    },
    methods: {
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
        // console.log(el,num);
        let _value = Number(this.formData[el]);
        console.log(_value);
        if (_value > 0) {
          this.formData[el] = Number(this.formData[el]).toFixed(num);
        }
      },
      initData() {
        var that = this;
        // 查询地区
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
            that.formData.countryId = '';
            that.selectData.countryId = response;
          }
        );
      },
      // 查询数据
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
      // 请求数据
      handleCurrentChange(val) {
        this.submitForm(val);
      },
      submitForm(page) {
        this.formData.page = page;
        let that = this;
        this.POST(myOfferAssets, {body: this.changeData()}, function (response) {
          that.tableData = response.data;
          that.formData.total = response.totalCount;
        });
      },
      // 点击下载
      dialogInfo(scope) {
        this.POST(downloadTransactorRead, {body: {id: scope.row.id}}, res => {
          if (res.code === 411) this.$message.error(this.$t('clues.UnauthorizAccess'));
          if (res.code !== 300) return;
          // 跳转到新的页面展示
          window.location.href = res.data;
        });
      },
      // 驳回，填写原因。然后提交
      returnWhy(scope) {
        this.textarea = '';
        this.scopeId = scope.row.priceId;
        this.dialogVisible = true;
      },
      // 点击进行驳回原因的处理
      confirmInfoMust() {
        if (this.textarea.length <= 0) {
          return this.$message.error(this.$t('clues.messagNotEmpty'));
        }
        this.POST(
          buyCancel,
          {body: {id: this.scopeId, refuseAdvice: this.textarea}},
          res => {
            this.submitForm(1);
            if (res.code === 300) return this.$message.success(this.$t('clues.rejectSuccess'));
          }
        );
        this.dialogVisible = false;
      },
      // 提交,直接进行数据的操作.入参只有一个参数
      Submission(scope) {
        this.POST(buyConfirm, {body: {id: scope.row.priceId}}, res => {
          if (res.code !== 300) return this.$message.error(this.$t('clues.failedSubmit'));
          this.$message.success(this.$t('clues.successSubmit'));
          this.submitForm(1);
        });
      },
      // 确认按钮，改变状态。让状态变为交易完成
      confirmInfo(scope) {
        if (this.tableData.id === scope.row.id) {
          this.submitForm(1);
        }
      },
      // 用户机构与本人id不相等，让本条数据置灰
      tableRowClassName({row, rowIndex}) {
        if ((row.checkState + '') === '130') {
          let companyId = Cookies.get('companyId');
          if ((row.ownOrgId + '') !== (companyId + '')) {
            return 'warning-row';
          }
        }
        return '';
      },
      // 页面跳转，等把保理的详情页面写完之后就可以将路由的跳转的页面更改完之后就可以了。
      toDetails(scope) {
        this.$router.push({
          name: 'FactoringDetails',
          params: {assetsName: this.formData.assetsType, id: scope.id, type: 1}
        });
      },
      // 保理资产再次发布
      confirmResult(scope) {
        let currentId = Cookies.get('currentId');
        if (scope.ownOrgId !== currentId) return;
        this.POST(
          factoryingPublish,
          {
            body: {
              id: scope.row.id,
              indateMessage: scope.row.indateMessage,
              discountRate: scope.row.discountRate
            }
          },
          res => {
            if (res.code !== 300) return this.$message.error(this.$t('clues.againMessageFail'));
            this.$message.success(this.$t('clues.sendMessageSuccess'));
            this.submitForm(1);
          }
        );
      },
      // 取消按钮
      cancelMessage(scope) {
        // this.POST(factoryingBuyCancel, {body: {id: scope.row.id}}, res => {
        //   if (res.code !== 300) return this.$message.error(this.$t('clues.cancelFailure'));
        //   this.$message.success(this.$t('clues.cancelSuccess'));
        //   this.submitForm(1);
        // });
        this.$confirm(this.$t('transferRateHobby.confirmInfo'), this.$t('MyAssets.tips'), {
          confirmButtonText: this.$t('MyAssets.confirm'),
          cancelButtonText: this.$t('MyAssets.cancel'),
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: this.$t('MyAssets.cancelSuccess')
          });
          this.POST(factoryingBuyCancel, {body: {id: scope.row.id}}, res => {
            if (res.code !== 300) return this.$message.error(this.$t('clues.cancelFailure'));
            this.$message.success(this.$t('clues.cancelSuccess'));
            this.submitForm(1);
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: this.$t('AssetsForSalePage.canceled')
          });
        });
      },
      // 确认保理报价
      confirmButton(scope) {
        this.POST(factoryingBuyConfirm, {body: {id: scope.row.id}}, res => {
          if (res.code !== 300) return this.$message.error(this.$t('clues.conMessageFail'));
          this.submitForm(1);
          this.$message.success(this.$t('clues.conSuccess'));
        });
      },
      // 再次发布,获取用户的id
      returnRepublishFlag(scope) {
        let companyId = Cookies.get('companyId');
        this.republishFlagId = companyId;
      },
      // 查看要约函的数据接口
      checkInfomation(scope) {
        this.POST(
          downloadTransactorRead,
          {body: {id: scope.row.id}},
          function (response) {
            if (response.code === 300) {
              window.open(response.data);
            }
          }
        );
      },
      // 鼠标经过出发的事件，经过之后触发的事件。如果在这里使用鼠标移上去之后显示不同的按钮信息。就在这个事件里面操作
      affectRow(row) {
        // elementui中的鼠标经过让每一行的都有相应的数据的变化
      }
    }
  };
</script>
<style media="screen" lang="less">
  .offerbankreviewforfeiting-main {
    width: 1100px;
    margin: 0 auto;
    .el-radio {
      margin-left: 15px;
    }
    .offerbankreviewforfeiting-center {
      float: left;
      width: 1100px;
    }
    .offerbankreviewfactoring-type-en {
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

  .bottomMargin {
    margin-bottom: 10px;
  }

  .el-table th > .cell {
    font-size: 13px;
    color: #fff;
  }

  .el-table .cell {
    font-size: 12px;
  }

  .el-button--mini,
  .el-button--small {
    font-size: 12px;
  }

  .el-form-item__label {
    padding: 0 12px 0 0;
    font-weight: bold;
  }

  .el-table .warning-row {
    background: #ccc;
  }

  /*.block {*/
  /*display: -webkit-flex;*/
  /*text-align: center;*/
  /*}*/

  .offerbankreviewforfeiting-input {
    width: 120px;
    /*height: 30px;*/
  }

  .block {
    display: -webkit-flex;
    text-align: center;
  }

  .el-pagination {
    display: inline-block;
    margin: 20px auto 40px;
  }
</style>
