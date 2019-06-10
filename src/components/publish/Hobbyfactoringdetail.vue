<template id="">
  <div class="hobby-factoring-details clearfix">
    <div>
      <el-card>
        <!--报价中的资产的分类-->
        <h1>{{$t('HobbyFactoring.factingAndFeitingDetails')}}</h1>

        <!--标题和资产编号-->
        <ul class="clearfix">
          <li>{{$t('MyAssets.factoringType')}}</li>
          <li v-if="ruleForm.factoringType==1">{{$t('MyAssets.factoringType1')}}</li>
          <li v-if="ruleForm.factoringType==2">{{$t('MyAssets.factoringType2')}}</li>
          <li v-if="ruleForm.factoringType==3">{{$t('MyAssets.factoringType3')}}</li>
          <li v-if="ruleForm.factoringType==4">{{$t('MyAssets.factoringType4')}}</li>
          <li>{{$t('MyAssets.acceptanceCurrency')}}</li>
          <li>{{ruleForm.currency}}</li>
        </ul>

        <ul class="clearfix">
          <li>{{$t('MyAssets.acceptanceAmount')}}</li>
          <li>{{ruleForm.amount}}</li>
          <li>{{$t('MyAssets.transferRate')}}</li>
          <li>{{ruleForm.transferRate}}</li>
        </ul>

        <ul class="clearfix">
          <li>{{$t('MyAssets.factoringMaturity')}}</li>
          <li>{{ruleForm.maturity}}</li>
          <li>{{$t('MyAssets.indateMessage')}}</li>
          <li>{{ruleForm.indateMessage}}</li>
        </ul>

        <ul class="clearfix">
          <li>{{$t('HobbyFactoring.isCove')}}</li>
          <li v-if="ruleForm.isCove==1">{{$t('HobbyFactoring.coveYes')}}</li>
          <li v-if="ruleForm.isCove==2">{{$t('HobbyFactoring.coveNo')}}</li>
          <li>{{$t('marketForfeiting.areaAndCountry')}}</li>
          <li>{{(this.$i18n.locale == 'cn') ? ruleForm.areaName : ruleForm.areaNameEn }}&nbsp;&nbsp;{{(this.$i18n.locale
            == 'cn') ? ruleForm.countryName : ruleForm.countryNameEn}}</li>
        </ul>
        <el-button @click="prepage()" type="primary" size="mini">{{$t('HobbyForfeiting.back')}}</el-button>
      </el-card>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {factoringBuyingDetail} from '../../assets/js/const';

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
          dataState: '',
          countryName: '',
          areaName: '',
          areaNameEn: '',
          countryNameEn: ''
        }
      };
    },
    mounted() {
      this.initData();
    },
    methods: {
      initData() {
        var that = this;
        that.POST(factoringBuyingDetail, {body: {'id': that.$route.query.id}}, function (response) {
          that.ruleForm = response.data;
          that.ruleForm.areaId = response.data.areaName;
          that.ruleForm.countryId = response.data.countryName;
        });
      },
      prepage() {
        this.$router.replace({path: '/myhobbyfactoring'});
      }
    }
  };
</script>
<style lang="less">
  /*.hobby-factoring-details {*/
    /*width: 1100px;*/
    /*margin: 0 auto;*/
    /*.hobby-factoring-details-form {*/
      /*width: 50%;*/
      /*border: 1px solid #dcdfe6;*/
      /*box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);*/
    /*}*/
  /*}*/
  .el-card {
    margin: 30px auto 24px;
    width: 1100px;
    box-sizing: border-box;
    padding: 0 150px 40px;
    background: #fff;
    h1 {
      font-weight: normal;
      text-align: center;
      font-size: 24px;
    }
    ul {
      margin: 1em 0;
      border-bottom: 1px solid #ccc;
      li {
        float: left;
        width: 23%;
        height: 40px;
        text-align: center;
        font-size: 14px;
        line-height: 40px;
      }
      li:nth-child(2n-1) {
        text-align: left;
        padding-right: 20px;
      }
      li:nth-child(2n) {
        text-align: left;
        color: #bababa;
        width: 24%;
      }
    }
    .el-button {
      margin-top: 60px;
    }
  }
</style>
