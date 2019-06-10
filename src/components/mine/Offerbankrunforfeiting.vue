<template id="">
  <div class="offerbankrunforfeiting-main clearfix">
    <div class="offerbankrunforfeiting-center">
      <h1>{{$t('myPrice.myPrice')}}</h1>
      <div class="inquiry">
        <el-form :inline="true" :model="formData" :rules="rules" ref="ruleForm">
          <div>
            <!--资产类型-->
            <el-form-item :label="$t('MyAssets.assetType')" prop="assetsType" style="display:inline-block">
              <el-radio-group v-model="formData.assetsType">
                <el-radio label="1">{{$t('MyAssets.forfaiting')}}</el-radio>
                <router-link to="offerbankrunfactoring">
                  <el-radio label="2">{{$t('MyAssets.factoring')}}</el-radio>
                </router-link>
                <!-- <router-link to="myassets"><el-radio label="1">福费廷</el-radio></router-link>
                <router-link to="forsalebankrunfactoring"><el-radio label="2">保理</el-radio></router-link> -->
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

                          style="font-size: 12px;width:150px;" @blur="FixedRate('minDiscountRate', 4)"></el-input>
              </el-form-item>
              &nbsp;-
              <el-form-item prop="maxDiscountRate" style="margin:0;">
                <el-input v-model="formData.maxDiscountRate" class="offerbankrunforfeiting-input" name="Number"

                          style="font-size: 12px;width:150px;" @blur="FixedRate('maxDiscountRate', 4)"></el-input>
              </el-form-item>
            </el-form-item>
          </div>
          <!-- 承兑金额限制 -->
          <div>
            <el-form-item :label="$t('MyAssets.amountCount')"
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
            <!-- 地区  国家-->
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
          <div>
            <!-- 信用证类型 -->
            <el-form-item :label="$t('MyAssets.forfaitingType')" prop="debtType" style="display:inline-block">
              <el-radio-group v-model="formData.debtType">
                <el-radio label="1">{{$t('MyAssets.dsForfaiting')}}</el-radio>
                <el-radio label="2">{{$t('MyAssets.inlForfaiting')}}</el-radio>
              </el-radio-group>
            </el-form-item>
            <!-- 开户行 -->
            <el-form-item :label="$t('MyAssets.openFullName')" prop="openFullName" style="display:inline-block">
              <el-input v-model="formData.openFullName" class="offerbankrunforfeiting-input"
                        style="font-size: 12px;"></el-input>
            </el-form-item>
          </div>
          <!--排序-->
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
          <!-- button按钮 -->
          <el-form-item>
            <!-- <el-button type="primary" @click="queryMessage">查询</el-button> -->
            <el-button type="primary" @click="submitForm(1)">{{$t('MyAssets.select')}}</el-button>
            <el-button type="primary" @click="resetForm()">{{$t('common.reset')}}</el-button>
          </el-form-item>
        </el-form>
      </div>
      <template>
        <el-table :data="tableData" style="width: 100%; text-align: center" class="asset-table"
                  :row-class-name="tableRowClassName"
                  @cell-mouse-enter="affectRow" :empty-text="$t('tableEmpty.empty')">
          <el-table-column prop="assetsNo" :label="$t('MyAssets.assetsNo')" class="asset-mum" width="115"
                           header-align="center">
            <template slot-scope="scope">
              <p>{{scope.row.assetsNo}}</p>
              <span v-if="scope.row.isnBlockChain === '1'" style="color: #b6b6b6;">BLOCKCHAIN</span>
              <!--显示报价信息-->
              <div
                v-if="(scope.row.priceState === '108'&& scope.row.recheckState == '104' && (scope.row.recheckState != '150' && scope.row.yn !=0 )  && scope.row.rejectOpinion !='' && scope.row.rejectOpinion !=null )&& usertype != '1'"
                style="color: #fff;background: #409eff;">
                {{$t('publishForfeiting.dismissQuotati')}}
              </div>
              <div
                v-else-if="usertype != '1' && (scope.row.discountRateOld == 0 || scope.row.discountRateOld == '' || scope.row.discountRateOld == null) && (scope.row.recheckState != '150'  && scope.row.yn !=0 ) && (scope.row.recheckState != 130 && scope.row.recheckState != 108 && scope.row.recheckState != 120 &&scope.row.recheckState != 125)"
                style="color: #fff;background: #409eff;">
                {{$t('publishForfeiting.firstPrice')}} {{scope.row.discountRate}}%
                {{$t('publishForfeiting.HandSubmit')}}
              </div>
              <div
                v-else-if="usertype != '1' && scope.row.discountRateOld != 0 && scope.row.discountRateOld != '' && (scope.row.recheckState != '150'  && scope.row.yn !=0 ) && scope.row.discountRateOld != null && (scope.row.recheckState != 130 && scope.row.recheckState != 108 && scope.row.recheckState != 120 &&scope.row.recheckState != 125)"
                style="color: #fff;background: #409eff;">
                {{$t('publishForfeiting.editUpdate')}}{{scope.row.discountRate}}%
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="title" :label="$t('MyAssets.title')" class="asset-mum"
                           :width="$i18n.locale == 'cn'? '100' : '120'"
                           header-align="center">
          </el-table-column>
          <el-table-column prop="amount" :label="$t('body.acceptanceAmount')" class="asset-mum"
                           :width="$i18n.locale == 'cn'? '100' : '100'"
                           header-align="center">
          </el-table-column>
          <el-table-column prop="currency" :label="$t('MyAssets.acceptanceCurrency')" class="asset-mum"
                           :width="$i18n.locale == 'cn'? '100' : '160'"
                           header-align="center">
          </el-table-column>
          <el-table-column prop="assetsDiscountRate" :label="$t('MyAssets.discountRate')" class="asset-mum" width="90"
                           header-align="center">
          </el-table-column>
          <el-table-column prop="maturity" :label="$t('MyAssets.maturity')" :width="$i18n.locale == 'cn'? '90' : '120'"
                           class="asset-mum"
                           header-align="center">
          </el-table-column>
          <el-table-column prop="indateMessage" :label="$t('MyAssets.indateMessage')"
                           :width="$i18n.locale == 'cn'? '90' : '160'" class="asset-mum"
                           header-align="center">
          </el-table-column>
          <el-table-column prop="openFullName" :label="$t('marketForfeiting.keyword')" class="asset-mum"
                           :width="$i18n.locale == 'cn'? '80' : '140'"
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
                           :width="$i18n.locale == 'cn'? '100' : '120'"
                           header-align="center">
            <template slot-scope="scope">

              <div v-if="scope.row.recheckState === '4444' || scope.row.recheckState === '44441'">
                {{$t('MyAssets.Canceled')}}
              </div>
              <div v-else>
                {{ scope.row.recheckState | resetForm($i18n.locale).state }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="debtType" :label="$t('MyAssets.forfaitingType')" class="asset-mum"
                           :width="$i18n.locale == 'cn'? '100' : '120'"
                           header-align="center">
            <template slot-scope="scope">
              {{scope.row.debtType == "1" ?
              $t('creditLetterType.nationalName'):$t('creditLetterType.internationalName')}}
            </template>
          </el-table-column>

          <el-table-column fixed="right" :label="$t('MyAssets.operation')" class="asset-mum" width="145"
                           header-align="center">
            <template slot-scope="scope">
              <!--编辑和驳回原因-->
              <div v-if="scope.row.recheckState == '104' && scope.row.priceState == '108' && usertype != '1'">
                <el-button type="text" size="mini" @click="editOfferBankForFeiting(scope)">{{$t('MyAssets.edit')}}
                </el-button>
                <el-button type="text" size="mini" @click="returnMessage(scope)">{{$t('MyAssets.reasonForRejection')}}
                </el-button>
              </div>
              <!--查看要约函-->
              <div
                v-if="usertype !== '1' && (scope.row.recheckState == 120 || scope.row.recheckState == 125 || scope.row.recheckState == '108'|| scope.row.recheckState == '130'|| scope.row.recheckState == '150' || scope.row.recheckState === '44441') && scope.row.isStruck == '2' ">
                <el-button type="text" size="mini" @click="checkInfomation(scope)">{{$t('MyAssets.selectKeyCulvert')}}
                </el-button>
              </div>
              <!--项目使用的版本的查看详情页-->
              <div>
                <el-button type="text" size="small" @click="toDetails(scope.row)">{{$t('MyAssets.selectDetil')}}
                </el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog :title="$t('forfeitingdetail.nowBid')" ref="resetTable" :visible.sync="dialogTableVisible">
          <el-table :data="gridData" align="center">
            <el-table-column property="assetsNo" :label="$t('MyAssets.assetsNo')" width="120"></el-table-column>
            <el-table-column property="amount" :label="$t('MyAssets.amount')" width="100"></el-table-column>
            <el-table-column property="openFullName" :label="$t('MyAssets.openFullName')"></el-table-column>
            <el-table-column property="discountRate" :label="$t('MyAssets.discountRate')" width="150">
              <template slot-scope="scope">
                <el-input v-model="discountRate" :placeholder="$t('clues.enterContent')" style="width:80px"
                          size="mini" @input="checkNumber"></el-input>
                <span>%</span>
              </template>
            </el-table-column>
            <el-table-column property="maturity" :label="$t('MyAssets.maturity')" width="200"></el-table-column>
            <el-table-column property="indateMessage" :label="$t('MyAssets.indateMessage')"></el-table-column>

          </el-table>
          <span slot="footer" class="dialog-footer">
                 <el-button @click="clearFormData">{{$t('MyAssets.cancel')}}</el-button>
                 <el-button type="primary" @click="sendInfoMation(gridData)">{{$t('MyAssets.submit')}}</el-button>
            <!-- <router-link to="/Offerbankreviewforfeiting"><el-button type="primary" @click="sendInfoMation(gridData)">提交</el-button></router-link> -->
                </span>
        </el-dialog>
        <div class="block">
          <el-pagination
            @current-change="handleCurrentChange"
            layout="prev, pager, next"
            :page-size="formData.pageSize"
            :current-page="formData.page"
            :total="formData.total">
          </el-pagination>
        </div>
        <el-dialog
          :title="$t('MyAssets.reasonForRejection')"
          :visible.sync="returnDialogVisible"
          width="40%">
          <span>{{advise}}</span>
          <span slot="footer" class="dialog-footer">
              <el-button @click="returnDialogVisible = false">{{$t('companInformation.takeUp')}}</el-button>
            </span>
        </el-dialog>
      </template>
      <!-- 分页数据的使用 -->

      <!--显示弹出层显示对应的消息-->
    </div>
  </div>

</template>
<script type="text/javascript">
  import {
    myOfferAssets,
    queryAllArea,
    queryAllCountry,
    downloadTransactorRead,
    offerUpdate,
    buyConfirm,
    assetsBuyCancel
  } from '../../assets/js/const';
  // import {log} from 'util';
  import Cookies from 'js-cookie';
  import {assetsState, checkDiscountRate, checkAmount} from '../../assets/js/utils';
  export default {
    data() {
      return {
        usertype: Cookies.get('userType'),
        companyId: Cookies.get('companyId'),
        // copy的界面
        selectData: {
          companyTypeId1: {},
          companyTypeId2: {},
          areaId: {},
          countryId: {}
        },
        advise: '',
        flag: false,
        disabled: false,
        // 所有查询的数据
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
        rules: {
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
        console.log('isTrue', isTrue);
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
      FixedRateDiscountRate() {
        this.discountRate = Number(this.discountRate).toFixed(4);
      },
      // 搜索地区
      initData() {
        var that = this;
        this.POST(queryAllArea, {}, function (response) {
          that.selectData.areaId = response;
          that.getCountryId();
        });
      },
      // 获取国家的id
      getCountryId() {
        var that = this;
        that.POST(queryAllCountry, {'body': {'areaId': that.formData.areaId}}, function (response) {
          if (!response.data.length > 0) {
            that.formData.countryId = '';
            that.selectData.countryId = {};
            return;
          }
          that.formData.countryId = '';
          that.selectData.countryId = response;
        });
      },
      // 处理请求的的参数
      changeData() {
        let _ruleForm = this.formData;
        let BodyData = {};
        for (var i in _ruleForm) {
          if (_ruleForm[i] !== 'undefined' && _ruleForm[i] !== '' && _ruleForm[i] !== null) {
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
        if (that.formData.minimum > that.formData.maximum) {
          that.$message({
            message: that.$t('MyAssets.selectionRange'),
            type: 'warning'
          });
        } else {
          this.POST(myOfferAssets, {'body': this.changeData()}, function (response) {
            that.tableData = response.data;
            that.formData.total = response.totalCount;
            that.tableData.forEach(function (item, index) {
              if (that.formData.recheckState === '4444' && response.data[index].recheckState === '104') {
                that.tableData[index].recheckState = '4444';
              } else if (that.formData.assetsState === '4444' && response.data[index].recheckState !== '104') {
                that.tableData[index].recheckState = '44441';
              }
            });
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
      // 点击下载
      dialogInfo(scope) {
        this.POST(downloadTransactorRead, {'body': {'id': scope.row.id}}, (res) => {
          if (res.code === 411) this.$message.error(this.$t('clues.UnauthorizAccess'));
          if (res.code !== 300) return;
          location.href = res.data;
        });
      },
      // 驳回原因
      returnMessage(scope) {
        this.advise = scope.row.rejectOpinion;
        this.returnDialogVisible = true;
      },
      // 点击取消按钮，关闭按钮
      clearFormData() {
        this.dialogTableVisible = false;
      },
      // 点击提交按钮进行数据的提交
      sendInfoMation(gridData) {
        // if(this.checkNumber() === false) return this.$message.error(this.$t('transferRate.resultCount'));
        // console.log(!this.checkNumber());
        if (!this.checkNumber()) return this.$message.error(this.$t('transferRate.resultCount'));
        this.POST(offerUpdate, {'body': {id: gridData[0].priceId, discountRate: this.discountRate}}, (res) => {
          if (res.code === 411) return this.$message.error(this.$t('clues.notPermission'));
          if (res.code !== 300) return this.$message.error(this.$t('clues.failedSubmit'));
          this.$message.success(this.$t('clues.updateDataSuccess'));
          this.submitForm(1);
        });
        this.dialogTableVisible = false;
      },
      // 卖家复核提交的功能
      Submission(scope) {
        // console.log(scope);
        this.POST(buyConfirm, {'body': {id: scope.row.priceId}}, (res) => {
          if (res.code !== 300) return this.$message.error(this.$t('clues.updateDataDiscountRate'));
          if (res.code === 411) return this.$message.error(this.$t('clues.UnauthorizAccess'));
          this.$message.success(this.$t('clues.updateSuccess'));
          this.submitForm(1);
        });
      },
      // 背景置灰显示
      tableRowClassName({row, rowIndex}) {
        if (row.recheckState === '130') {
          let companyId = Cookies.get('companyId');
          // console.log(companyId)
          if ((row.ownOrgId + '') !== (companyId + '')) {
            return 'warning-row';
          }
        }
        return '';
      },
      // 查看详情页
      toDetails(scope) {
        this.$router.push({
          'name': 'ForfeitingDetails',
          'params': {'assetsName': this.formData.assetsType, 'id': scope.id, 'type': 1}
        });
      },
      // 点击取消按钮
      cancelMessage(scope) {
        this.POST(assetsBuyCancel, {'body': {id: scope.row.id}}, (res) => {
          if (res.code !== 300) return this.$message.error(this.$t('clues.cancelSuccess'));
          this.$message.success(this.$t('clues.cancelFailure'));
        });
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
      // 当鼠标移入后的样式，每一行的数据的变化。
      affectRow(row, column, cell, event) {
        // console.log(row.id);
        // console.log(row, column, cell, event);
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
  }

  /*.el-form-item {
    margin:0 18px 22px 0;
  }*/
  .el-table th {
    background: #409eff;
  }

  .bottomMargin {
    margin-bottom: 10px;
  }

  /*.el-pagination {*/
  /*display: -webkit-flex;*/
  /*text-align: center;*/
  /*}*/
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

  .el-form-item__label {
    padding: 0 12px 0 0;
    font-weight: bold;
  }

  .el-table .warning-row {
    background: #ccc;
  }

  .offerbankrunforfeiting-input {
    width: 120px;
  }

  .router-link {
    margin-left: 20px;
  }

  .el-radio {
    margin-left: 15px;
  }

  .el-pagination {
    margin-top: 20px;
    text-align: center;
    margin-bottom: 20px;
  }
</style>
