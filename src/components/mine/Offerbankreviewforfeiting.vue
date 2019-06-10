<template id="">
  <div class="offerbankreviewforfeiting-main clearfix">
    <div class="offerbankreviewforfeiting-center clearfix">
      <h1>{{$t('myPrice.myPrice')}}</h1>
      <el-form :inline="true" :model="formData" :rules="rulesForm" ref="ruleForm">
        <div>
          <!--资产类型-->
          <el-form-item :label="$t('MyAssets.assetType')" prop="assetsType" style="display:inline-block">
            <el-radio-group v-model="formData.assetsType">
              <router-link to="offerbankrunreviewforfeiting">
                <el-radio label="1">{{$t('MyAssets.forfaiting')}}</el-radio>
              </router-link>
              <router-link to="offerbankreviewfactoring">
                <el-radio label="2">{{$t('MyAssets.factoring')}}</el-radio>
              </router-link>
            </el-radio-group>
          </el-form-item>
          <!-- 资产状态 -->
          <el-form-item :label="$t('MyAssets.assetStatus')" prop="recheckState" style="display:inline-block">
            <el-radio-group v-model="formData.recheckState">
              <el-radio label="104">{{$t('MyAssets.offer')}}</el-radio>
              <el-radio label="0000">{{$t('MyAssets.matchSuccess')}}</el-radio>
              <el-radio label="130">{{$t('MyAssets.tradeComplete')}}</el-radio>
              <el-radio label="4444">{{$t('MyAssets.Canceled')}}</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
        <!-- 币种 -->
        <div class="bottomMargin">
          <el-form-item :label="$t('MyAssets.acceptanceCurrency')" prop="currency" style="display:inline-block">
            <el-radio-group v-model="formData.currency">
              <el-radio label="CNY"></el-radio>
              <el-radio label="USD"></el-radio>
              <el-radio label="EUR"></el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 贴现率范围 -->
          <el-form-item :label="$t('MyAssets.discountRateRange')" prop="minDiscountRate maxDiscountRate"
                        style="display:inline-block;font-size: 12px;">
            <el-form-item prop="minDiscountRate" style="margin:0;">
              <el-input v-model="formData.minDiscountRate" class="offerbankrunforfeiting-input" name="Number"
                        style="font-size: 12px;width:150px;"
                        @blur="FixedRate('minDiscountRate', 4)"></el-input>
            </el-form-item>
            &nbsp;-
            <el-form-item prop="maxDiscountRate" style="margin:0;">
              <el-input v-model="formData.maxDiscountRate" class="offerbankrunforfeiting-input" name="Number"
                        style="font-size: 12px;width:150px;"
                        @blur="FixedRate('maxDiscountRate', 4)"></el-input>
            </el-form-item>
          </el-form-item>
        </div>
        <!--承兑金额限制-->
        <div>
          <el-form-item :label="$t('MyAssets.amountCount')"
                        style="display:inline-block">
            <el-form-item prop="minimum" style="margin:0;">
              <el-input type="Number" v-model="formData.minimum" class="myassets-input"
                        @blur="FixedRate('minimum', 2)"></el-input>
            </el-form-item>
            &nbsp;-
            <el-form-item prop="maximum" style="margin:0;">
              <el-input type="Number" v-model="formData.maximum" class="myassets-input"
                        @blur="FixedRate('maximum', 2)"></el-input>
            </el-form-item>
          </el-form-item>
          <!-- 地区 -->
          <el-form-item :label="$t('marketForfeiting.areaAndCountry')" prop="areaId countryId">
            <el-select v-model="formData.areaId" :placeholder="$t('addTellerPage.pleaseSelect')" id="reg-type3"
                       @change="getCountryId">
              <el-option
                v-for="item in selectData.areaId.data"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
            <el-select v-model="formData.countryId" :placeholder="$t('addTellerPage.pleaseSelect')" class="reg-type2">
              <el-option
                v-for="item in selectData.countryId.data"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <!-- 升降序排列 -->
        <div>
          <el-form-item :label="$t('MyAssets.orderByFiled')" prop="orderBy" style="display:inline-block">
            <el-select v-model="formData.orderBy" :placeholder="$t('addTellerPage.pleaseSelect')">
              <el-option :label="$t('MyAssets.maturity')" value="maturity"></el-option>
              <el-option :label="$t('MyAssets.acceptanceAmount')" value="amount"></el-option>
              <el-option :label="$t('MyAssets.discountRate')" value="discount_rate"></el-option>
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
          <!-- 开户行 -->
          <el-form-item :label="$t('MyAssets.openFullName')" prop="openFullName" style="display:inline-block">
            <el-input v-model="formData.openFullName" class="offerbankrunforfeiting-input"
                      style="font-size: 12px;"></el-input>
          </el-form-item>
        </div>
        <!-- 类型 -->
        <el-form-item :label="$t('MyAssets.forfaitingType')" prop="debtType" style="display:inline-block">
          <el-radio-group v-model="formData.debtType">
            <el-radio label="1">{{$t('MyAssets.dsForfaiting')}}</el-radio>
            <el-radio label="2">{{$t('MyAssets.inlForfaiting')}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- button按钮 -->
        <el-form-item>
          <el-button type="primary" @click="submitForm(1)">{{$t('MyAssets.select')}}</el-button>
          <el-button type="primary" @click="resetForm()">{{$t('common.reset')}}</el-button>
        </el-form-item>
      </el-form>
      <!-- table表格查询 -->
      <template>
        <el-table :data="tableData" style="width: 100%; text-align: center" class="asset-table"
                  :row-class-name="tableRowClassName"
                  @cell-mouse-enter="affectRow" :empty-text="$t('tableEmpty.empty')">
          <el-table-column prop="assetsNo" :label="$t('MyAssets.assetsNo')" class="asset-mum"
                           :width="$i18n.locale == 'cn'? '110' : '120'"
                           header-align="center">
            <template slot-scope="scope">
              <p>{{scope.row.assetsNo}}</p>
              <span v-if="scope.row.isnBlockChain === '1'" style="color: #b6b6b6;">BLOCKCHAIN</span>
              <!--显示报价信息-->
              <div
                v-if="(scope.row.priceState == 108 && scope.row.recheckState == '104' && scope.row.rejectOpinion != '' && (scope.row.recheckState != '150' && scope.row.yn !=0 ) && scope.row.rejectOpinion != null ) "
                style="color: #fff;background: #409eff;">
                {{$t('publishForfeiting.dismissQuotati')}}
              </div>
              <div
                v-else-if="(scope.row.discountRateOld == 0 || scope.row.discountRateOld == '' || scope.row.discountRateOld == null)&& (scope.row.recheckState != '150' && scope.row.yn !=0 ) && (scope.row.recheckState != 130 && scope.row.recheckState != 108 && scope.row.recheckState != 120 &&scope.row.recheckState != 125) "
                style="color: #fff;background: #409eff;">
                {{$t('publishForfeiting.firstPrice')}} {{scope.row.discountRate}}%
                {{$t('publishForfeiting.HandSubmit')}}
              </div>
              <div
                v-else-if="scope.row.discountRateOld != 0 && scope.row.discountRateOld != '' && scope.row.discountRateOld != null && (scope.row.recheckState != '150' && scope.row.yn !=0 ) && (scope.row.recheckState != 130 && scope.row.recheckState != 108 && scope.row.recheckState != 120 &&scope.row.recheckState != 125)"
                style="color: #fff;background: #409eff;">
                {{$t('publishForfeiting.editUpdate')}}{{scope.row.discountRate}}%
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="title" :label="$t('MyAssets.title')" class="asset-mum" header-align="center">
          </el-table-column>
          <el-table-column prop="amount" :label="$t('MyAssets.acceptanceAmount')" class="asset-mum"
                           :width="$i18n.locale == 'cn'? '80' : '100'"
                           header-align="center">
          </el-table-column>
          <el-table-column prop="currency" :label="$t('MyAssets.acceptanceCurrency')" class="asset-mum"
                           :width="$i18n.locale == 'cn'? '90' : '160'"
                           header-align="center">
          </el-table-column>
          <el-table-column prop="assetsDiscountRate" :label="$t('MyAssets.discountRate')" class="asset-mum"
                           :width="$i18n.locale == 'cn'? '90' : '140'"
                           header-align="center">
          </el-table-column>
          <el-table-column prop="maturity" :label="$t('MyAssets.maturity')" :width="$i18n.locale == 'cn'? '90' : '120'"
                           class="asset-mum"
                           header-align="center">
          </el-table-column>
          <el-table-column prop="indateMessage" :label="$t('MyAssets.indateMessage')"
                           :width="$i18n.locale == 'cn'? '90' : '155'" class="asset-mum"
                           header-align="center">
          </el-table-column>
          <el-table-column prop="openFullName" :label="$t('marketForfeiting.keyword')" class="asset-mum"
                           :width="$i18n.locale == 'cn'? '80' : '145'"
                           header-align="center">
          </el-table-column>
          <el-table-column :label="$t('marketForfeiting.areaName')" class="asset-mum"
                           :width="$i18n.locale == 'cn'? '50' : '80'"
                           header-align="center">
            <template slot-scope="scope">
              {{$i18n.locale == 'cn'? scope.row.areaName: scope.row.enAreaName}}
            </template>
          </el-table-column>
          <el-table-column :label="$t('marketForfeiting.countryName')" class="asset-mum"
                           :width="$i18n.locale == 'cn'? '50' : '80'"
                           header-align="center">
            <template slot-scope="scope">
              {{$i18n.locale == 'cn'? scope.row.countryName: scope.row.enCountryName}}
            </template>
          </el-table-column>
          <el-table-column prop="recheckState" :label="$t('MyAssets.assetStatus')" class="asset-mum"
                           :width="$i18n.locale == 'cn'? '90' : '115'"
                           header-align="center">
            <template slot-scope="scope">
              <!-- 过滤器 -->
              <div v-if="( scope.row.recheckState == 150 || scope.row.recheckState == 104) && scope.row.yn == 0 ">
                {{$t('MyAssets.Canceled')}}
              </div>
              <div v-else>
                {{ scope.row.recheckState | resetForm($i18n.locale).state }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="debtType" :label="$t('MyAssets.forfaitingType')" class="asset-mum"
                           :width="$i18n.locale == 'cn'? '100' : '80'"
                           header-align="center">
            <template slot-scope="scope">
              {{scope.row.debtType == "1" ?
              $t('creditLetterType.nationalName'):$t('creditLetterType.internationalName')}}
            </template>
          </el-table-column>
          <!-- 表格的数据 -->
          <el-table-column fixed="right" :label="$t('MyAssets.operation')" class="asset-mum" width="145"
                           header-align="center">
            <template slot-scope="scope">
              <!--提交和编辑-->
              <div v-if="scope.row.priceState === '105' && scope.row.yn !=0">
                <div v-if="scope.row.recheckState == 104 && scope.row.discountRateOld == 0">
                  <el-button type="text" size="mini" @click="Submission(scope)">{{$t('MyAssets.submit')}}</el-button>
                  <el-button type="text" size="mini" @click="returnWhy(scope)">{{$t('MyAssets.reject')}}</el-button>
                </div>
                <div v-else-if="scope.row.discountRateOld !== 0 && scope.row.recheckState == 104 "
                >
                  <el-button type="text" size="mini" slot="reference" @click="Submission(scope)">
                    {{$t('MyAssets.submit')}}
                  </el-button>
                  <el-button type="text" size="mini" @click="returnWhy(scope)">{{$t('MyAssets.reject')}}</el-button>
                </div>
              </div>
              <!--查看要约函-->
              <div
                v-if="(scope.row.recheckState == 120 || scope.row.recheckState == 125 || scope.row.recheckState == '108'|| scope.row.recheckState == '130'|| scope.row.recheckState == '150') &&scope.row.isStruck == '2' ">
                <el-button type="text" size="mini" @click="checkInfomation(scope)">{{$t('MyAssets.selectKeyCulvert')}}
                </el-button>
              </div>
              <!--确认按钮-->
              <div
                v-if="(scope.row.recheckState == '108' || scope.row.recheckState == '120')  && scope.row.isStruck == '2'">
                <el-button type="text" size="mini" @click="confirmButton(scope)">{{$t('AssetsForSalePage.confirm')}}
                </el-button>
              </div>
              <!--取消按钮-->
              <div
                v-if="( scope.row.recheckState == '108') && scope.row.updateTranLetter == 0">
                <el-button type="text" size="mini" @click="cancelMessage(scope)">{{$t('MyAssets.cancel')}}</el-button>
              </div>
              <!-- 再次发布按钮 -->
              <div
                v-if="scope.row.recheckState == '130' && scope.row.republishFlag == 0 && scope.row.ownOrgId == republishFlagId">
                <el-button type="text" size="mini" @click="confirmResult(scope)">{{$t('MyAssets.againRelease')}}
                </el-button>
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
    assetsBuyCancel,
    buyCancel,
    buyConfirm,
    forfeitingRepublish,
    assetsBuyConfirm
  } from '../../assets/js/const';
  import Cookies from 'js-cookie';
  // import {assetsState} from '../../assets/js/utils';
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
          provinceI: '',
          total: null,
          page: 1,
          pageSize: 10,
          assetsType: '1',
          recheckState: '',
          currency: '',
          minimum: '',
          maximum: '',
          minDiscountRate: '',
          maxDiscountRate: '',
          debtType: '',
          openFullName: '',
          ascDesc: 'desc',
          orderBy: 'publish_time'
        },
        gridData: [],
        dialogTableVisible: false,
        returnDialogVisible: false,
        rulesForm: {
          assetsType: [
            {required: true, message: this.$t('clues.writeAssetsName'), trigger: 'blur'}
          ],
          recheckState: [
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
          minDiscountRate: [
            {
              required: true,
              trigger: 'blur',
              numSection: this.$t('publishFactoring.numSection'),
              numDecimal: this.$t('publishFactoring.numDecimal'),
              validator: checkDiscountRate
            }
          ],
          maxDiscountRate: [
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
      // this.queryMessage()
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
        this.formData.minDiscountRate = '';
        this.formData.maxDiscountRate = '';
      },
      // 截取利率
      FixedRate(el, num) {
        let _value = Number(this.formData[el]);
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
      // 驳回，填写原因。然后提交
      returnWhy(scope) {
        // console.log(scope);
        this.textarea = '';
        this.scopeId = scope.row.priceId;
        this.dialogVisible = true;
      },
      // 点击进行驳回原因的处理
      confirmInfoMust() {
        if (this.textarea.length <= 0) return this.$message.error(this.$t('clues.messagNotEmpty'));
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
      // 用户机构不相等，让本条数据置灰
      tableRowClassName({row, rowIndex}) {
        if (row.recheckState === '130') {
          let companyId = Cookies.get('companyId');
          if ((row.ownOrgId + '') !== (companyId + '')) {
            return 'warning-row';
          }
        }
        return '';
      },
      // 页面跳转
      toDetails(scope) {
        this.$router.push({
          name: 'ForfeitingDetails',
          params: {assetsName: this.formData.assetsType, id: scope.id, 'type': 1}
        });
      },
      // 再次发布
      confirmResult(scope) {
        this.POST(
          forfeitingRepublish,
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
        this.$confirm(this.$t('transferRateHobby.confirmInfo'), this.$t('MyAssets.tips'), {
          confirmButtonText: this.$t('MyAssets.confirm'),
          cancelButtonText: this.$t('MyAssets.cancel'),
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: this.$t('MyAssets.cancelSuccess')
          });
          this.POST(assetsBuyCancel, {body: {id: scope.row.id}}, res => {
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
      // 确认报价的详情
      confirmButton(scope) {
        this.POST(assetsBuyConfirm, {body: {id: scope.row.id}}, res => {
          if (res.code !== 300) return this.$message.error(this.$t('clues.conMessageFail'));
          this.submitForm(1);
          this.$message.success(this.$t('clues.conSuccess'));
        });
      },
      // 再次发布,如果目前拥有者ownOrgId和当前用户机构ID相等，且republishFlag为0（可再次发布）显示“再次发布”按钮
      returnRepublishFlag(scope) {
        let companyId = Cookies.get('companyId');
        this.republishFlagId = companyId;
      },
      // 查看要约函
      checkInfomation(scope) {
        // this.$router.push({'name': 'invitationLetter','params': {'id': scope.row.id}, 'query': {'read': 1}})
        this.POST(downloadTransactorRead, {'body': {'id': scope.row.id}}, function (response) {
          if (response.code === 300) {
            window.open(response.data);
          }
        });
      },
      // 鼠标经过触发的事件
      affectRow(row) {
      }
    }
  };
</script>
<style media="screen" lang="less">
  .offerbankreviewforfeiting-main {
    width: 1100px;
    margin: 0 auto;
    .offerbankreviewforfeiting-center {
      float: left;
      width: 1100px;
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

  .el-table .warning-row {
    background: #ccc;
  }

  .el-radio {
    margin-left: 15px;
  }

  .offerbankreviewforfeiting-input {
    width: 120px;
    /*height: 30px;*/
  }

  .el-form-item__label {
    padding: 0 12px 0 0;
    font-weight: bold;
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
