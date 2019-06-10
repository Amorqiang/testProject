<template id="">
  <div class="hobbyForfeiting-main clearfix">

    <h1>{{$t('HobbyForfeiting.forfaitingPreferencePage')}}</h1>
    <div class="HobbyForfeiting-center asset-info">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" class="saleforfaiting-form">
        <el-form-item :label="$t('assetsType.resource')" prop="resource">
          <el-radio-group v-model="ruleForm.resource">
            <el-radio label="1">{{$t('assetsType.forfeiting')}}&nbsp;&nbsp;</el-radio>
            <router-link to="hobbyfactoring">
              <el-radio label="2">{{$t('assetsType.factoring')}}</el-radio>
            </router-link>
          </el-radio-group>
        </el-form-item>

        <el-form-item :label="$t('HobbyForfeiting.debtType')" prop="debtType">
          <el-select v-model="ruleForm.debtType" :placeholder="$t('checkInfo.pleaseCheck')" class="reg-input1 el-input">
            <el-option :key="$t('creditLetterType.nationalName')" :label="$t('creditLetterType.nationalName')"
                       value="1"></el-option>
            <el-option :key="$t('creditLetterType.internationalName')" :label="$t('creditLetterType.internationalName')"
                       value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item :label="$t('HobbyForfeiting.currency')" prop="currency">
          <el-select v-model="ruleForm.currency" :placeholder="$t('checkInfo.pleaseCheck')" class="reg-input1 el-input">
            <el-option label="CNY" value="CNY"></el-option>
            <el-option label="USD" value="USD"></el-option>
            <el-option label="EUR" value="EUR"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item :label="$t('HobbyForfeiting.amount')" prop="amount" class="saleforfaiting-title">
          <el-input v-model="ruleForm.amount" class="el-input"></el-input>
        </el-form-item>

        <el-form-item :label="$t('HobbyForfeiting.discountRate')" prop="discountRate" class="saleforfaiting-title">
          <el-input v-model="ruleForm.discountRate" class="el-input"></el-input>
        </el-form-item>

        <el-form-item :label="$t('HobbyForfeiting.deadLine')" class="salefactoring-date">
          <el-col :span="11">
            <el-form-item prop="deadLine">
              <el-date-picker type="date" :placeholder="$t('checkInfo.pleaseCheckDate')" v-model="ruleForm.deadLine"
                              class="el-input" style="width: 200px"></el-date-picker>
            </el-form-item>
          </el-col>

        </el-form-item>
        <el-form-item :label="$t('HobbyForfeiting.creditType')" prop="creditType">
          <el-select v-model="ruleForm.creditType" :placeholder="$t('checkInfo.pleaseCheck')"
                     class="reg-input1 el-input">
            <el-option label="NEGOTIATION" value="NEGOTIATION"></el-option>
            <el-option label="ACCEPTANCE" value="ACCEPTANCE"></el-option>
            <el-option label="DEF PAYMENT" value="DEF PAYMENT"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item :label="$t('HobbyForfeiting.indateMessage')" class="salefactoring-date">
          <el-col :span="11">
            <el-form-item prop="indateMessage">
              <el-date-picker type="date" :placeholder="$t('checkInfo.pleaseCheckDate')"
                              v-model="ruleForm.indateMessage" class="" style="width: 200px"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item :label="$t('HobbyForfeiting.areaIdCountryId')" prop="areaId countryId">
          <el-select v-model="ruleForm.areaId" :placeholder="$t('checkInfo.pleaseCheck')" id="reg-type3"
                     @change="getCountryId">
            <el-option
              v-for="item in selectData.areaId.data"
              :key="item.name"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <el-select v-model="ruleForm.countryId" :placeholder="$t('checkInfo.pleaseCheck')" class="reg-type2">
            <el-option
              v-for="item in selectData.countryId.data"
              :key="item.name"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="saleforfaiting-button">
          <!-- <router-link to="myhobbyforfeiting"><el-button type="primary" @click="submitForm()">提交</el-button></router-link> -->
          <el-button type="primary" @click="submitForm('ruleForm')">{{$t('HobbyForfeiting.submitBtn')}}</el-button>
        </el-form-item>
      </el-form>

    </div>

  </div>

</template>
<script type="text/javascript">
  import {queryAllArea, queryAllCountry, assetsBuyingInsert} from '../../assets/js/const';

  export default {
    components: {
      // Footer
    },
    data() {
      var checkTransferRate = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.$t('publishForfeiting.inputDiscountRate')));
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
      var testAmount = (rule, value, callback) => {
        let reg = /^([1-9]\d{0,10})([.]?|(\.\d{1,2})?)$/;
        if (!value) {
          callback(new Error(this.$t('publishForfeiting.inputAmount')));
        } else if (!reg.test(value) && value) {
          callback(new Error(this.$t('publishForfeiting.inputValidAmount')));
        } else {
          // 保留小数点后两位的过滤器，尾数不四舍五入
          this.ruleForm.amount = Number(this.ruleForm.amount).toFixed(2);
          callback();
        }
      };
      return {
        selectData: {
          companyTypeId1: {},
          companyTypeId2: {},
          areaId: {},
          countryId: {}

        },
        labelPosition: 'right',
        ruleForm: {
          currency: '',
          resource: '1',
          amount: '',
          discountRate: '',
          deadLine: '',
          creditType: '',
          debtType: '',
          indateMessage: '',
          areaId: '',
          countryId: ''
        },
        rules: {

          debtType: [
            {required: true, message: this.$t('HobbyForfeiting.pleaseInputDebtType'), trigger: 'blur'}
          ],
          currency: [
            {required: true, message: this.$t('HobbyForfeiting.pleaseInputCurrency'), trigger: 'blur'}
          ],
          amount: [
            {required: true, validator: testAmount, trigger: 'blur'}
          ],
          discountRate: [
            {validator: checkTransferRate, trigger: 'blur'}
          ],
          deadLine: [
            {required: true, message: this.$t('publishForfeiting.inputDeadLine'), trigger: 'blur'}
          ],
          indateMessage: [
            {
              type: 'date',
              required: true,
              message: this.$t('HobbyForfeiting.pleaseInputIndateMessage'),
              trigger: 'change'
            }
          ]

        }
      };
    },
    mounted() {
      // this.$refs.myPic.innerHTML = 123;
      this.initData();
    },
    watch: {
      '$i18n.locale': function (newval, oldval) {
        console.log('newval:', newval, 'oldval:', oldval);
        this.getArea();
      }
    },
    methods: {
      initData() {
        // 查询地区
        this.getArea();
      },
      getArea() {
        // 查询地区
        let that = this;
        this.POST(queryAllArea, {}, function (response) {
          that.selectData.areaId = response;
          // that.ruleForm.areaId = response.data[0].id;
          // 查询国家
          that.getCountryId();
        });
      },
      submitForm: function (formName) {
        let that = this;
        var params = {};
        params.body = {};
        if (that.ruleForm.discountRate > 100) {
          that.$message({
            showClose: true,
            message: '贴现率不可大于100',
            type: 'error'
          });
          return false;
        }
        if (that.ruleForm.areaId != null && that.ruleForm.areaId !== '') {
          if (that.ruleForm.countryId == null || that.ruleForm.countryId === '') {
            that.$message({
              showClose: true,
              message: that.$t('address.checkCountry'),
              type: 'error'
            });
            return false;
          }
        }
        params.body.debtType = that.ruleForm.debtType;
        params.body.currency = that.ruleForm.currency;
        params.body.amount = that.ruleForm.amount;
        params.body.discountRate = that.ruleForm.discountRate;
        params.body.indateMessage = that.ruleForm.indateMessage;
        params.body.areaId = that.ruleForm.areaId;
        params.body.countryId = that.ruleForm.countryId;
        params.body.deadLine = that.ruleForm.deadLine;
        params.body.creditType = that.ruleForm.creditType;
        let jsonObject = params;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            that.POST(assetsBuyingInsert, jsonObject, function (response) {
              if (response.code === 300) {
                that.$message({
                  showClose: true,
                  message: '福费廷偏好录入成功',
                  type: 'success'
                });
                that.$router.push({path: '/myhobbyforfeiting'});
              } else if (response.code === 400) {
                that.$message({
                  showClose: true,
                  message: response.message,
                  type: 'error'
                });
              }
            });
          }
        });
      },
      getCountryId() {
        var that = this;
        that.POST(queryAllCountry, {'body': {'areaId': that.ruleForm.areaId}}, function (response) {
          if (!response.data.length > 0) {
            that.ruleForm.countryId = '';
            that.selectData.countryId = {};
            return;
          }
          // that.ruleForm.countryId = response.data[0].id;
          that.ruleForm.countryId = '';
          that.selectData.countryId = response;
        });
      }
    }
  };
</script>
<style media="screen" lang="less">
  .hobbyForfeiting-main {
    width: 1100px;
    margin: 0 auto;
    margin-left: 33%;
    .HobbyForfeiting-center {
      width: 55%;
      padding: 20px;
      .el-form-item__content {
        margin-left: 0px;
      }
    }
    .el-form-item__label {
      text-align: left;
      float: left;
      font-size: 14px;
      color: #606266;
      line-height: 40px;
      padding: 0px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      content: '';
    }
    .el-form-item.is-required .el-form-item__label:before {
      content: '';
      color: #f56c6c;
      margin-right: 4px;
    }
    .el-input {
      width: 200px;
    }
    .middle {
      float: left;
      margin-left: 400px;
      margin-top: -600px;
    }
    .rig {
      float: left;
      margin-left: 800px;
      margin-top: -500px;
    }
    .saleforfaiting-button {
      float: left;
      margin-top: 40px;
      margin-left: 50px;
    }
    .salefactoring-right {
      float: left;
      margin-left: 500px;
      margin-top: -500px;
    }
    .salefactoring-date {
      width: 570px;
    }
    .asset-info {
      border: 1px solid #dcdfe6;
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
    }
  }
</style>
