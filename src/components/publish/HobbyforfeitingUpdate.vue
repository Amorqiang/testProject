<template id="">
  <div class="saleforfaiting-main clearfix hobbyforfeitingupdate">

    <!-- <p>123456</p> -->
    <h1>{{$t('HobbyForfeiting.ForfaitinChange')}}</h1>
    <div class="saleforfaiting-center asset-info">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="300px" class="saleforfaiting-form">
        <!-- <el-form-item label="资产名称" prop="resource">
         <el-radio-group v-model="ruleForm.resource">
         <el-radio label="1">福费廷</el-radio>
         <router-link to="hobbyfactoring"><el-radio label="2">保理</el-radio></router-link>
         </el-radio-group>
       </el-form-item> -->

        <el-form-item :label="$t('MyAssets.forfaitingType')" required prop="debtType">
          <el-select v-model="ruleForm.debtType" :placeholder="$t('checkInfo.pleaseCheck')" class="reg-input1 el-input">
            <el-option :label="$t('MyAssets.dsForfaiting')" value="1"></el-option>
            <el-option :label="$t('MyAssets.inlForfaiting')" value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item :label="$t('marketForfeiting.currency')" required prop="currency">
          <el-select v-model="ruleForm.currency" :placeholder="$t('checkInfo.pleaseCheck')" class="reg-input1 el-input">
            <el-option label="CNY" value="CNY"></el-option>
            <el-option label="USD" value="USD"></el-option>
            <el-option label="EUR" value="EUR"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item :label="$t('body.acceptanceAmount')" required prop="amount" class="saleforfaiting-title">
          <el-input v-model="ruleForm.amount" class="el-input"></el-input>
        </el-form-item>

        <el-form-item :label="$t('HobbyForfeiting.discountRate')" prop="discountRate" class="saleforfaiting-title">
          <el-input v-model.number="ruleForm.discountRate" class="el-input"></el-input>
        </el-form-item>

        <el-form-item :label="$t('HobbyForfeiting.deadLine')" class="salefactoring-date">
          <el-col :span="11">
            <el-form-item prop="deadLine">
              <el-date-picker type="date" :placeholder="$t('checkInfo.pleaseCheckDate')" v-model="ruleForm.deadLine"
                              style="width: 200px;" value-format="yyyy-MM-dd"
                              class="el-input"></el-date-picker>
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

        <el-form-item :label="$t('body.ivp')" required class="salefactoring-date">
          <el-col :span="11">
            <el-form-item prop="indateMessage">
              <el-date-picker type="date" :placeholder="$t('checkInfo.pleaseCheckDate')"
                              v-model="ruleForm.indateMessage" style="width: 200px;" value-format="yyyy-MM-dd"
                              class="el-input"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item :label="$t('regist.regionCountry')" prop="areaId countryId">
          <el-select v-model="ruleForm.areaId" :placeholder="$t('checkInfo.pleaseCheck')" id="reg-type3"
                     @change="getCountryId('0')">
            <el-option
              v-for="item in selectData.areaId.data"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <el-select v-model="ruleForm.countryId" :placeholder="$t('checkInfo.pleaseCheck')" class="reg-type2">
            <el-option
              v-for="item in selectData.countryId.data"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="saleforfaiting-button">
          <!-- <router-link to="myhobbyforfeiting"><el-button type="primary" @click="submitForm()">提交</el-button></router-link> -->
          <el-button type="primary" @click="submitForm()">{{$t('login.submit')}}</el-button>
          <router-link to="myhobbyforfeiting">
            <el-button type="primary">{{$t('HobbyForfeiting.back')}}</el-button>
          </router-link>
        </el-form-item>
      </el-form>

    </div>

  </div>

</template>
<script type="text/javascript">
  import {queryAllArea, queryAllCountry, assetsBuyingupdate, assetsBuyingDetail} from '../../assets/js/const';

  export default {
    data() {
      var chekDiscountRate = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.$t('HobbyForfeiting.pleaseInputDiscountRate')));
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
        selectData: {
          companyTypeId1: {},
          companyTypeId2: {},
          areaId: {},
          countryId: {}
        },
        labelPosition: 'right',
        ruleForm: {
          id: '',
          title: '',
          currency: '',
          deadLine: '',
          amount: '',
          creditType: '',
          indateMessage: '',
          discountRate: '',
          areaId: '',
          countryId: '',
          // areaName:'',
          // countryName:'',
          debtType: ''
        },
        rules: {

          debtType: [
            {required: true, message: this.$t('MyAssets.PleaseEnterForfaitingType'), trigger: 'blur'}
          ],
          currency: [
            {required: true, message: this.$t('publishForfeiting.inputCurrency'), trigger: 'blur'}
          ],
          amount: [
            {required: true, message: this.$t('publishForfeiting.inputAmount'), trigger: 'blur'}
          ],
          discountRate: [
            {validator: chekDiscountRate, trigger: 'blur'}
          ],
          deadLine: [
            {required: true, message: this.$t('HobbyFactoring.pleaseInputMaturity'), trigger: 'change'}
          ],
          indateMessage: [
            {
              type: 'string',
              required: true,
              message: this.$t('HobbyForfeiting.pleaseInputIndateMessage'),
              trigger: 'change'
            }
          ],
          countryId: [
            {required: true, message: this.$t('address.checkCountry'), trigger: 'change'}
          ],
          areaId: [
            {required: true, message: this.$t('address.checkArea'), trigger: 'change'}
          ]

        }
      };
    },
    watch: {
      // ruleForm() {
      //   this.getCountryId();
      // },

      '$i18n.locale': function (newval, oldval) {
        console.log('newval:', newval, 'oldval:', oldval);
        this.getArea();
      }
    },
    mounted() {
      this.initData();
      this.buyingDetail();
    },
    methods: {
      initData() {
        let that = this;
        that.POST(queryAllArea, {}, function (response) {
          console.log(response);
          that.selectData.areaId = response;
          // that.ruleForm.areaId = response.data[0].id;
          // 查询国家
          that.getCountryId();
        });
      },
      // 查询国家
      getCountryId(val) {
        var that = this;
        that.POST(queryAllCountry, {'body': {'areaId': that.ruleForm.areaId}}, function (response) {
          if (!response.data.length > 0) {
            that.ruleForm.countryId = '';
            that.selectData.countryId = {};
            return;
          }
          if (val === '0') {
            that.ruleForm.countryId = response.data[0].id;
          }
          that.selectData.countryId = response;
        });
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
      // 调详情接口渲染数据
      buyingDetail() {
        let that = this;
        that.POST(assetsBuyingDetail, {body: {'id': that.$route.query.id}}, function (response) {
          that.ruleForm = response.data;
          response.data.areaId && (response.data.areaId = Number(response.data.areaId));
          response.data.countryId && (response.data.countryId = Number(response.data.countryId));
          that.getArea();
        });
      },
      submitForm: function (formName) {
        let that = this;
        // var date = new Date(that.ruleForm.indateMessage); //  信息有效日
        // var date1 = new Date(that.ruleForm.deadLine);   //  保理到期日
        // if ((date1.getTime() - date.getTime()) < (3 * 1000 * 60 * 60 * 24)) {
        //   that.$message(that.$t('MyAssets.InfoHasFun'));
        //   return;
        // }
        var RegExp = /^([1-9]\d{0,10})([.]?|(\.\d{1,2})?)$/;
        if (!RegExp.test(that.ruleForm.amount)) {
          that.$message(that.$t('publishForfeiting.inputValidAmount'));
          return;
        }
        var params = {};
        params.body = {};
        params.body.id = that.$route.query.id;
        params.body.title = that.ruleForm.title;
        params.body.currency = that.ruleForm.currency;
        params.body.amount = that.ruleForm.amount;
        params.body.deadLine = that.ruleForm.deadLine;
        params.body.creditType = that.ruleForm.creditType;
        params.body.indateMessage = that.ruleForm.indateMessage;
        params.body.discountRate = that.ruleForm.discountRate;
        params.body.areaId = that.ruleForm.areaId;
        params.body.countryId = that.ruleForm.countryId;
        params.body.debtType = that.ruleForm.debtType;
        console.log(params.body);
        // this.$refs[formName].validate((valid) => {
        // if(valid){
        this.POST(assetsBuyingupdate, {'body': params.body}, function (response) {
          if (response.code === 300) {
            that.$message({
              showClose: true,
              message: that.$t('forfeitingdetail.editsuccess'),
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
        // }
        // })
      }
    }
  };
</script>
<style lang="less">
  .hobbyforfeitingupdate {
    .saleforfaiting-center {
      width: 100%;
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

  .saleforfaiting-main {
    width: 1100px;
    margin: 0 auto;
  }

  .saleforfaiting-main .saleforfaiting-center {
    width: 70%;
    padding: 20px;
  }

</style>
