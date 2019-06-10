<template>
  <div class="myhobbyfactoring-main clearfix">
    <div class="myhobbyfactoring-center">
      <h1>{{$t('header.myPreference')}}</h1>
      <div class="inquiry">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" :inline="true">
          <!--资产名称-->
          <el-form-item :label="$t('MyAssets.assetName')" prop="resource" style="display:block">
            <el-radio-group v-model="ruleForm.resource">
              <router-link to="myhobbyforfeiting">
                <el-radio v-model="ruleForm.radio" label="1">{{$t('MyAssets.forfaiting')}}&nbsp;&nbsp;&nbsp;</el-radio>
              </router-link>
              <!--<router-link to="myhobbyfactoring">-->
                <el-radio v-model="ruleForm.radio" label="2">{{$t('MyAssets.factoring')}}</el-radio>
              <!--</router-link>-->
            </el-radio-group>
          </el-form-item>
          <!--保理类型-->
          <el-form-item :label="$t('publishFactoring.factoringType')" style="display:inline-block" :class="{'myhobbyfactoring-type-en': this.$i18n.locale == 'en'}">
            <el-radio-group v-model="ruleForm.factoringType">
              <el-radio label="1">{{$t('publishFactoring.typeOne')}}</el-radio>
              <el-radio label="2">{{$t('publishFactoring.typeTwo')}}</el-radio>
              <el-radio label="3">{{$t('publishFactoring.typeThree')}}</el-radio>
              <el-radio label="4">{{$t('publishFactoring.typeFour')}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <!--承兑币种-->
          <el-form-item :label="$t('MyAssets.currencyType')" style="display:block">
            <el-radio-group v-model="ruleForm.currency">
              <el-radio label="CNY"></el-radio>
              <el-radio label="USD"></el-radio>
              <el-radio label="EUR"></el-radio>
            </el-radio-group>
          </el-form-item>
          <!--贴现率范围-->
          <el-form-item :label="$t('MyAssets.transferRateRange')">
            <el-form-item prop="rateBegin" style="margin:0;">
              <el-input type="number" v-model="ruleForm.rateBegin" class="myassets-input" @blur="FixedRate('rateBegin', 4)"></el-input>
            </el-form-item>&nbsp;-
            <el-form-item prop="rateEnd" style="margin:0;">
              <el-input type="number" v-model="ruleForm.rateEnd" class="myassets-input" @blur="FixedRate('rateEnd', 4)"></el-input>
            </el-form-item>
          </el-form-item>
          <!--金额范围-->
          <el-form-item :label="$t('marketfactoring.amountCount')">
            <el-form-item prop="amountBegin" style="margin:0;">
              <el-input type="number" v-model="ruleForm.amountBegin" class="myassets-input" @blur="FixedRate('amountBegin', 2)"></el-input>
            </el-form-item>&nbsp;-
            <el-form-item prop="amountEnd" style="margin:0;">
              <el-input type="number" v-model="ruleForm.amountEnd" class="myassets-input" @blur="FixedRate('amountEnd', 2)"></el-input>
            </el-form-item>
          </el-form-item>
          <!--地区国家-->
          <div>
            <el-form-item :label="$t('marketForfeiting.areaAndCountry')" prop="areaId countryId">
              <el-select v-model="ruleForm.areaId" :placeholder="$t('addTellerPage.pleaseSelect')" id="reg-type3" @change="getCountryId">
                <el-option
                  v-for="item in selectData.areaId.data"
                  :key="item.name"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
              <el-select v-model="ruleForm.countryId" :placeholder="$t('addTellerPage.pleaseSelect')" class="reg-type2">
                <el-option
                  v-for="item in selectData.countryId.data"
                  :key="item.name"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <!--排序-->
          <el-form-item :label="$t('marketForfeiting.region')" prop="orderBy">
            <el-select v-model="ruleForm.orderBy" :placeholder="$t('addTellerPage.pleaseSelect')">
              <!--<el-option :label="$t('marketForfeiting.select')" value=""></el-option>-->
              <el-option :label="$t('factoringDetail.maturity')" value="maturity"></el-option>
              <el-option :label="$t('AssetsForSalePage.amount')" value="amount"></el-option>
              <el-option :label="$t('customerService.TransferRate')" value="transfer_rate"></el-option>
            </el-select>
          </el-form-item>
          <!--升降序-->
          <el-form-item :label="$t('MyAssets.orderByType')" prop="ascDesc">
            <el-select v-model="ruleForm.ascDesc" :placeholder="$t('addTellerPage.pleaseSelect')">
              <!--<el-option :label="$t('marketForfeiting.select')" value=""></el-option>-->
              <el-option :label="$t('MyAssets.asOrder')" value="asc"></el-option>
              <el-option :label="$t('MyAssets.deOrder')" value="desc"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submit(1)">{{$t('MyAssets.select')}}</el-button>
            <el-button type="primary" @click="resetForm('ruleForm')">{{$t('common.reset')}}</el-button>
          </el-form-item>
        </el-form>
      </div>
      <template id="">
        <el-table :data="tableData" style="text-align: center;width: 100%" class="asset-table" :empty-text="$t('tableEmpty.empty')">
          <el-table-column prop="factoringType" :label="$t('MyAssets.factoringType')" class="asset-mum" :width="$i18n.locale == 'cn'? '120':'150'">
            <template slot-scope="scope">
              <div v-if="scope.row.factoringType==1">{{$t('publishFactoring.typeOne')}}</div>
              <div v-if="scope.row.factoringType==2">{{$t('publishFactoring.typeTwo')}}</div>
              <div v-if="scope.row.factoringType==3">{{$t('publishFactoring.typeThree')}}</div>
              <div v-if="scope.row.factoringType==4">{{$t('publishFactoring.typeFour')}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="amount" :label="$t('MyAssets.amount')" class="asset-mum" :width="$i18n.locale == 'cn'? '120':'180'">
          </el-table-column>
          <el-table-column prop="currency" :label="$t('MyAssets.currency')" class="asset-mum" :width="$i18n.locale == 'cn'? '120':'180'">
          </el-table-column>
          <el-table-column prop="maturity" :label="$t('MyAssets.factoringMaturity')" class="asset-mum" :width="$i18n.locale == 'cn'? '120':'180'">
          </el-table-column>
          <el-table-column prop="transferRate" :label="$t('MyAssets.transferRate')" class="asset-mum" :width="$i18n.locale == 'cn'? '120':'180'">
          </el-table-column>
          <el-table-column prop="indateMessage" :label="$t('MyAssets.indateMessage')" class="asset-mum" :width="$i18n.locale == 'cn'? '120':'190'">
          </el-table-column>
          <el-table-column prop="areaName" :label="$t('MyAssets.area')" class="asset-mum" :width="$i18n.locale == 'cn'? '120':'180'">
            <template slot-scope="scope">
              {{$i18n.locale == 'cn'? scope.row.areaName: scope.row.areaNameEn}}
            </template>
          </el-table-column>
          <el-table-column prop="countryName" :label="$t('MyAssets.country')" class="asset-mum" :width="$i18n.locale == 'cn'? '120':'180'">
            <template slot-scope="scope">
              {{$i18n.locale == 'cn'? scope.row.countryName: scope.row.countryNameEn}}
            </template>
          </el-table-column>
          <el-table-column fixed="right" :label="$t('MyAssets.operation')" class="asset-mum":width="$i18n.locale == 'cn'? '120':'100'">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="toUpdate(scope)" v-show="isShow">{{$t('MyAssets.edit')}}
              </el-button>
              <el-button type="text" size="small" @click="toDelete(scope)" v-show="isShow">{{$t('MyAssets.delete')}}
              </el-button>
              <el-button type="text" size="small" @click="toDetail(scope)">{{$t('MyAssets.selectDetil')}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <!-- 分页 -->
      <div class="block">
        <el-pagination
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :current-page="ruleForm.page"
          :total="totalCount" style="text-align: center">
        </el-pagination>
      </div>
    </div>
  </div>

</template>
<script type="text/javascript">
  import {myBuyingList, queryAllArea, queryAllCountry, factoryingBuyingDelete} from '../../assets/js/const';
  import {checkDiscountRate, checkAmount} from '../../assets/js/utils';
  import Cookies from 'js-cookie';

  export default {
    data() {
      return {
        selectData: {
          areaId: {},
          countryId: {}
        },
        ruleForm: {
          factoringType: '',
          resource: '2',
          currency: '',
          amountBegin: '',
          amountEnd: '',
          rateBegin: '',
          rateEnd: '',
          areaId: '',
          countryId: '',
          orderBy: '',
          ascDesc: ''
        },
        rules: {
          rateBegin: [
            {
              required: true,
              trigger: 'blur',
              numSection: this.$t('publishFactoring.numSection'),
              numDecimal: this.$t('publishFactoring.numDecimal'),
              validator: checkDiscountRate
            }
          ],
          rateEnd: [
            {
              required: true,
              trigger: 'blur',
              numSection: this.$t('publishFactoring.numSection'),
              numDecimal: this.$t('publishFactoring.numDecimal'),
              validator: checkDiscountRate
            }
          ],
          amountBegin: [
            {
              required: true,
              trigger: 'blur',
              message: this.$t('publishForfeiting.inputTwo'),
              validator: checkAmount
            }
          ],
          amountEnd: [
            {
              required: true,
              trigger: 'blur',
              message: this.$t('publishForfeiting.inputTwo'),
              validator: checkAmount
            }
          ]
        },
        tableData: [],
        totalCount: null,
        isShow: false
      };
    },
    components: {},
    mounted() {
      // 按钮权限控制
      var userType = Cookies.get('userType');
      if ((userType + '') === '2') {
        this.isShow = true;
      }
      this.initData();
    },
    methods: {
      resetForm () {
        // 如果form中存在prop校验，调用resetfields方法
        // 例如 我的资产页筛选条件 （smallRate，bigRate，smallAmount，bigAmount）
        this.$refs['ruleForm'].resetFields();
        // 没存在prop校验的字段，强制赋值为空
        // this.ruleForm.resource = '';
        this.ruleForm.factoringType = '';
        this.ruleForm.currency = '';
        // this.ruleForm.rateEnd = '';
        // this.ruleForm.amountBegin= '';
        // this.ruleForm.amountEnd = '';
        this.ruleForm.orderBy = '';
        this.ruleForm.ascDesc = '';
        this.ruleForm.areaId = '';
        this.ruleForm.countryId = '';
        // this.ruleForm.debtType = '';
      },
      // 截取利率
      FixedRate (el, num) {
        let _value = Number(this.ruleForm[el]);
        if (_value > 0) {
          this.ruleForm[el] = Number(this.ruleForm[el]).toFixed(num);
        }
      },
      // 搜索地区
      initData() {
        var that = this;
        that.POST(queryAllArea, {}, function (response) {
          that.selectData.areaId = response;
        });
      },
      submit(val) {
        var self = this;
        var factoringType = self.ruleForm.factoringType;
        let data = {
          'body': {
            'type': 1,
            'page': val,
            'pageSize': 14,
            'assetsType': 2,
            'factoringType': factoringType,
            'currency': self.ruleForm.currency,
            'rateBegin': self.ruleForm.rateBegin,
            'rateEnd': self.ruleForm.rateEnd,
            'amountBegin': self.ruleForm.amountBegin,
            'amountEnd': self.ruleForm.amountEnd,
            'areaId': self.ruleForm.areaId,
            'countryIds': self.ruleForm.countryId,
            'orderBy': self.ruleForm.orderBy,
            'ascDesc': self.ruleForm.ascDesc
          }
        };
        console.log(data);
        this.POST(myBuyingList, data, function (response) {
          self.tableData = response.data;
          self.totalCount = response.totalCount;
        });
      },
      // 获取国家ID
      getCountryId() {
        var that = this;
        that.ruleForm.countryId = '';
        that.POST(queryAllCountry, {'body': {'areaId': that.ruleForm.areaId || 1}}, function (response) {
          if (!response.data.length > 0) {
            // that.ruleForm.countryId = '';
            that.selectData.countryId = {};
            return;
          }
          that.ruleForm.countryId = '';
          that.selectData.countryId = response;
        });
      },
      toDetail(scope) {
        this.$router.push({'path': '/Hobbyfactoringdetail', 'query': {'id': scope.row.id}});
      },
      toUpdate(scope) {
        this.$router.push({'path': '/Hobbyfactoringupdate', 'query': {'id': scope.row.id}});
      },
      toDelete(scope) {
        const h = this.$createElement;
        let that = this;
        that.$msgbox({
          title: '',
          message: h('p', null, [
            h('span', null, that.$t('TellerManagementPage.sureRemove'))
          ]),
          showCancelButton: true,
          confirmButtonText: that.$t('MyAssets.determine'),
          cancelButtonText: that.$t('MyAssets.cancel'),
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              that.POST(factoryingBuyingDelete, {'body': {'id': scope.row.id}}, function (response) {
                if (response.code === 300) {
                  that.$message(that.$t('MyAssets.DeleteSuccess'));
                  that.submit(1);
                } else {
                  that.$message(that.$t('MyAssets.DeleteFailure') + response.message);
                }
              });
              done();
            } else {
              done();
            }
          }
        });
      },
      // 获取数据 并 分页
      handleCurrentChange(val) {
        this.submit(val);
      }
    },
    created() {
      this.submit(1);
    }
  };
</script>
<style media="screen" lang="less">
  .myhobbyfactoring-main {
    width: 1100px;
    margin: 0 auto;
    .myhobbyfactoring-center {
      float: left;
      width: 100%;
    }
    .el-form-item__label {
      font-weight: bold;
    }
    .myhobbyfactoring-type-en {
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

  .myhobbyfactoring-input {
    width: 120px;
  }

  .el-table th {
    background: #409eff;
  }

  .el-table th > .cell {
    font-size: 16px;
    color: #fff;
    text-align: center;
  }

  .el-table .cell {
    font-size: 13px;
  }

  .el-button--mini, .el-button--small {
    font-size: 13px;
  }

</style>
