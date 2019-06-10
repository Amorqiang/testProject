<template id="">

  <div class="saleforfaiting-main clearfix hobbyfactoringupdate">

    <!-- <p>123456</p> -->
    <h1>{{$t('HobbyFactoring.Factoringpage')}}</h1>
    <div class="saleforfaiting-center asset-info">

      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="saleforfaiting-form">
        <el-form-item :label="$t('MyAssets.factoringType')" prop="factoringType">
          <el-select v-model="ruleForm.factoringType" @change="test()" placeholder="请选择" class="reg-input1 el-input">
            <el-option :label="$t('MyAssets.factoringType1')" value="1"></el-option>
            <el-option :label="$t('MyAssets.factoringType2')" value="2"></el-option>
            <el-option :label="$t('MyAssets.factoringType3')" value="3"></el-option>
            <el-option :label="$t('MyAssets.factoringType4')" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('MyAssets.acceptanceCurrency')" prop="currency">
          <el-select v-model="ruleForm.currency" :placeholder="$t('checkInfo.pleaseCheck')" class="reg-input1 el-input">
            <el-option label="CNY" value="CNY"></el-option>
            <el-option label="USD" value="USD"></el-option>
            <el-option label="EUR" value="EUR"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('marketForfeiting.amountRange')" prop="amount" class="saleforfaiting-title">
          <el-input v-model="ruleForm.amount" class="el-input"></el-input>
        </el-form-item>
        <el-form-item :label="$t('MyAssets.transferRate')" prop="transferRate" class="saleforfaiting-title">
          <el-input v-model="ruleForm.transferRate" class="el-input"></el-input>
        </el-form-item>
        <el-form-item :label="$t('MyAssets.factoringMaturity')" class="salefactoring-date">
          <el-col :span="11">
            <el-form-item prop="maturity">
              <el-date-picker type="date" :placeholder="$t('checkInfo.pleaseCheckDate')" v-model="ruleForm.maturity" style="width: 100%;"
                              value-format="yyyy-MM-dd"
                              class="el-input"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item :label="$t('MyAssets.indateMessage')" class="salefactoring-date">
          <el-col :span="11">
            <el-form-item prop="indateMessage">
              <el-date-picker type="date" :placeholder="$t('checkInfo.pleaseCheckDate')" v-model="ruleForm.indateMessage" style="width: 100%;"
                              value-format="yyyy-MM-dd"
                              class="el-input"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item :label="$t('HobbyFactoring.isCove')" prop="isCove">
          <el-select v-model="ruleForm.isCove":placeholder="$t('checkInfo.pleaseCheck')" class="reg-input1 el-input">
            <el-option :label="$t('HobbyFactoring.coveYes')" value="1"></el-option>
            <el-option :label="$t('HobbyFactoring.coveNo')" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('marketForfeiting.areaAndCountry')" prop="areaId countryId">
          <el-select v-model="ruleForm.areaId" :placeholder="$t('checkInfo.pleaseCheck')" id="reg-type3" @change="getCountryId('0')">
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
        <el-form-item class="saleforfaiting-button" style="float: none;">
          <el-button type="primary" @click="submitForm()">{{$t('MyAssets.submit')}}</el-button>
          <el-button type="primary" @click="prepage()">{{$t('HobbyForfeiting.back')}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {queryAllArea, queryAllCountry, factoringBuyingupdate, factoringBuyingDetail} from '../../assets/js/const';

  export default {
    components: {
      // Footer
    },
    data() {
      return {
        selectData: {
          companyTypeId1: {},
          companyTypeId2: {},
          areaId: {},
          countryId: {}
        },
        labelPosition: 'right',
        ruleForm: {
          factoringType: '',
          currency: '',
          amount: '',
          transferRate: '',
          maturity: '',
          indateMessage: '',
          isCove: '',
          areaId: '',
          countryId: '',
          resource: '2',
          dataState: ''
        },
        rules: {
          factoringType: [
            {required: true, message: this.$t('publishFactoring.inputFactoringType'), trigger: 'blur'}
          ],
          currency: [
            {required: true, message: this.$t('HobbyForfeiting.pleaseInputCurrency'), trigger: 'blur'}
          ],
          amount: [
            {required: true, message: this.$t('HobbyForfeiting.pleaseInputTheSum'), trigger: 'blur'}
          ],
          transferRate: [
            {required: true, message: this.$t('publishFactoring.inputTransferRate'), trigger: 'change'}
          ],
          maturity: [
            {required: true, message: this.$t('HobbyFactoring.pleaseInputMaturity'), trigger: 'change'}
          ],
          isCove: [
            {required: true, message: this.$t('publishFactoring.inputIsCove'), trigger: 'change'}
          ],
          indateMessage: [
            {
              type: 'string',
              required: true,
              message: this.$t('HobbyFactoring.pleaseInputIndateMessage'),
              trigger: 'change'
            }
          ]
        }
      };
    },
    mounted() {
    },
    created() {
      var that = this;

      that.POST(queryAllArea, {}, function (response) {
        console.log(response);
        that.selectData.areaId = response;
        console.log(that.selectData.areaId);
        that.initData();
      });
    },
    methods: {
      initData() {
        var that = this;
        that.POST(factoringBuyingDetail, {body: {'id': that.$route.query.id}}, function (response) {
          that.ruleForm = response.data;
          response.data.areaId && (response.data.areaId = Number(response.data.areaId));
          response.data.countryId && (response.data.countryId = Number(response.data.countryId));
          that.getCountryId();
        });
      },
      submitForm: function () {
        let that = this;
        // var date = new Date(that.ruleForm.indateMessage); //  信息有效日
        // var date1 = new Date(that.ruleForm.maturity);   //  保理到期日
        // if ((date1.getTime() - date.getTime()) < (3 * 1000 * 60 * 60 * 24)) {
        //   that.$message(that.$t('MyAssets.InfoHasFun'));
        //   return;
        // }
        var RegExp = /^([1-9]\d{0,10})([.]?|(\.\d{1,2})?)$/;
        console.log(RegExp.test(that.ruleForm.amount));
        if (!RegExp.test(that.ruleForm.amount)) {
          that.$message(that.$t('publishForfeiting.inputValidAmount'));
          return;
        }
        // if (that.ruleForm.countryId == null || that.ruleForm.countryId === '') {
        //   that.$message(that.$t('regist.pleaseSelectCountry'));
        //   return;
        // }
        // if (that.ruleForm.areaId == null || that.ruleForm.areaId === '') {
        //   that.$message(that.$t('regist.pleaseSelectRegion'));
        //   return;
        // }
        var params = {};
        params.body = {};
        params.body.factoringType = that.ruleForm.factoringType;
        params.body.currency = that.ruleForm.currency;
        params.body.amount = that.ruleForm.amount;
        params.body.transferRate = that.ruleForm.transferRate;
        params.body.maturity = that.ruleForm.maturity;
        params.body.indateMessage = that.ruleForm.indateMessage;
        params.body.isCove = that.ruleForm.isCove;
        params.body.areaId = that.ruleForm.areaId;
        params.body.countryId = that.ruleForm.countryId;
        params.body.id = that.$route.query.id;
        this.POST(factoringBuyingupdate, {'body': params.body}, function (response) {
          console.log(response);
          if (response.code === 300) {
            that.$message({
              showClose: true,
              message: that.$t('MyAssets.FactoringPreferenceEditing'),
              type: 'success'
            });
            that.$router.push({path: '/myhobbyfactoring'});
          } else if (response.code === 400) {
            that.$message({
              showClose: true,
              message: response.message,
              type: 'error'
            });
          }
        });
      },
      getCountryId(val) {
        console.log(this.ruleForm.areaId);
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
      prepage() {
        this.$router.replace({path: '/myhobbyfactoring'});
      }
    }
  };
</script>
<style lang="less">
  .saleforfaiting-main {
    width: 1100px;
    margin: 0 auto;
  }

  .saleforfaiting-main .saleforfaiting-center {
    width: 50%;
    padding: 20px;
  }

  .hobbyfactoringupdate {
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

    .el-form-item.is-required .el-form-item__label:before {
      content: '';
      color: #f56c6c;
      margin-right: 4px;
    }
  }


</style>
