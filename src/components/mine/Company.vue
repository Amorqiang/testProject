<template id="">
  <div class="company clearfix">
    <div class="company-center" style=" display: flex; align-items:left; flex-direction: column;">
      <div>
        <h1>{{$t('companInformation.myCompanInformation')}}</h1>
        <div v-if="checkState == '待补充' && userType == '1'">
          <h2 align="right" v-if="toComType==1">
            <router-link :to="{ path: 'datasupplement', query: { companyId: companyId}}">
              <button type="button" style="width: auto" name="button">{{$t('companInformation.supplementButton')}}</button>
            </router-link>
          </h2>
          <h2 align="right" v-if="toComType==2">
            <router-link :to="{ path: 'dataUnbackSupplement', query: { companyId: companyId}}">
              <button type="button" style="width: auto" name="button">{{$t('companInformation.supplementButton')}}</button>
            </router-link>
          </h2>
          <h2 align="right" v-if="toComType==3">
            <router-link :to="{ path: 'dataBusinessSupplement', query: { companyId: companyId}}">
              <button type="button" style="width: auto" name="button">{{$t('companInformation.supplementButton')}}</button>
            </router-link>
          </h2>
        </div>
        <div v-if="checkState == '审核中' && userType == '1'">
          <h1 align="right" style="color:red ; font-size:20px">{{$t('companInformation.auditing')}}</h1>
        </div>
        <div v-if="checkState == '审核不通过' && userType == '1'">
          <h2 align="right" v-if="toComType==1">
            <router-link :to="{ path: 'datasupplement', query: { companyId: companyId}}">
              <button type="button" name="button">{{$t('companInformation.auditFailed')}}</button>
            </router-link>
          </h2>
          <!-- <h1 align="right" style="color:red ; font-size:20px">{{$t('companInformation.auditFailed')}}</h1> -->
          <h2 align="right" v-if="toComType==2">
            <router-link :to="{ path: 'dataUnbackSupplement', query: { companyId: companyId}}">
              <button type="button" name="button">{{$t('companInformation.auditFailed')}}</button>
            </router-link>
          </h2>
          <h2 align="right" v-if="toComType==3">
            <router-link :to="{ path: 'dataBusinessSupplement', query: { companyId: companyId}}">
              <button type="button" name="button">{{$t('companInformation.auditFailed')}}</button>
            </router-link>
          </h2>
        </div>
        <table width="1110px">
          <tr>
            <td>{{$t('companInformation.companType')}}</td>
            <td class="self_td">{{companyData.companyTypeId1}}&nbsp;&nbsp;&nbsp;&nbsp;{{companyData.companyTypeId2}}
            </td>
          </tr>
          <tr>
            <td>{{$t('companInformation.companyName')}}</td>
            <td class="self_td">{{companyData.companyName}}</td>
          </tr>
          <tr>
            <td>{{$t('companInformation.companyDomicile')}}</td>
            <td class="self_td">{{companyData.companyDomicile}}</td>
          </tr>
          <tr>
            <td>{{$t('companInformation.contactName')}}</td>
            <td class="self_td">{{companyData.contactName}}</td>
          </tr>
          <tr>
            <td>{{$t('companInformation.companyEmail')}}</td>
            <td class="self_td">{{companyData.email}}</td>
          </tr>
          <tr>
            <td>{{$t('companInformation.contactTel')}}</td>
            <td class="self_td">{{companyData.contactTel}}</td>
          </tr>
          <tr>
            <td>{{$t('companInformation.licenseNo')}}</td>
            <td class="self_td">
              {{companyData.licenseNo}}
            </td>
          </tr>
          <tr>
            <td>{{$t('companInformation.licenseUrl')}}</td>
            <td class="self_td">
              <button @click="doSth">{{$t('companInformation.see')}}</button>
            </td>
          </tr>
          <tr>
            <td>SWIFT CODE</td>
            <td class="self_td">
              {{companyData.swiftCode}}
            </td>
          </tr>
          <tr>
            <td>{{$t('companInformation.productCode')}}</td>
            <td class="self_td"><span class="company-span" v-for='list in companyData.productList'>

               <div v-if="list.productCode == 1">{{$t('MyAssets.forfaiting')}}</div>
               <div v-if="list.productCode == 2">{{$t('MyAssets.factoring')}}</div>
             </span>
            </td>
          </tr>
          <tr v-show="linkShow && blockShow">
            <td>{{$t('companInformation.certificate')}}</td>
            <!-- <span>待完善</span> -->
            <td class="self_td">
              <button type="button" name="button" class="check" @click="check()">{{$t('companInformation.see')}}
              </button>
            </td>
          </tr>
          <tr v-show="isShow">
            <td>{{$t('companInformation.companyBlock')}}</td>
            <td class="self_td">{{certificate}}
              <button type="button" name="button" class="check" @click="stop()">{{$t('companInformation.takeUp')}}
              </button>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>

</template>

<script type="text/javascript">
  import Cookies from 'js-cookie';
  import {getOrgByUserId} from '../../assets/js/const';

  export default {
    data() {
      return {
        userType: Cookies.get('userType'),
        companyData: {},
        companyId: '',
        checkState: '',
        toComType: '',
        productList: {},
        typeOrg: '',
        certificate: '',
        linkShow: false,
        isShow: false,
        blockShow: false
      };
    },
    components: {},
    methods: {
      initData() {
        let that = this;
        this.POST(getOrgByUserId, {'body': {}}, function (response) {
          that.companyData = response.data;
          if (that.companyData.checkState === 100) {
            that.checkState = '待补充';
          }
          if (that.companyData.checkState === 102 || that.companyData.checkState === 104 ||
            that.companyData.checkState === 105 || that.companyData.checkState === 107 || that.companyData.checkState === 108 ||
            that.companyData.checkState === 110 || that.companyData.checkState === 101) {
            that.checkState = '审核中';
          }
          if (that.companyData.companyTypeId1En === 'bankUser') {
            that.toComType = 1;
          }
          if (that.companyData.companyTypeId1En === 'financialInstitution') {
            that.toComType = 2;
          }
          if (that.companyData.companyTypeId1En === 'company') {
            that.toComType = 3;
          }
          if (that.companyData.checkState === 111) {
            that.blockShow = true;
          }
          if (that.companyData.userType === '1') {
            that.linkShow = true;
          }
          if (that.companyData.checkState === 103 || that.companyData.checkState === 106 || that.companyData.checkState === 109 || that.companyData.checkState === 112) {
            that.checkState = '审核不通过';
          }
        });
      },
      //  点击显示区块链证书1
      check() {
        var th = this;
        var body = {};
        body.bussId = this.id;
        let data = {'body': body};
        th.POST('/owner/blockChain/selectAgencyById', data, function (res) {
          th.certificate = res.data.certificate;
        });
        this.isShow = true;
      },
      //  点击隐藏区块链证书
      stop() {
        this.isShow = false;
        //  $('.blockchain').hide()
      },
      doSth: function () {
        let that = this;
        if (that.companyData.licenseUrl == null || that.companyData.licenseUrl === '') {
          that.$message({
            showClose: true,
            message: this.$t('clues.notUpload'),
            type: 'error'
          });
        } else {
          window.open(that.companyData.licenseUrl);
        }
      }
    },
    mounted() {
      this.initData();
    },
    created() {
    }
  };
</script>
<style media="screen" scope lang="less">
  .company {
    width: 1100px;
    margin: 0 auto;
    .company-center {
      float: left;
      width: 100%;
      margin-bottom: 100px;
      .self_td {
        text-align: right;
        width: 100px;
      }
    }
  }

  .company-center table {
    border-collapse: collapse;
    align: center;
  }

  .company-center td {
    border-top: 1px solid #f5f7fa;
    height: 60px;
    width: 100px;
  }

  .company-center th {
    text-align: left;
    border-width: 0px;
    font-size: 20px;
    padding: 8px;

    border-color: #a9c6c9;
    width: 10%;
  }

  .company-center tr:hover {
    background: #f5f7fa;
  }

  .company-center button {
    background: #3967c3;
    border: none;
    outline: none;
    color: white;
    width: 100px;
    height: 40px;
    font-size: 15px;

  }

  .company-span {
    /*float: left;*/
    /*color: lightgray;*/
    margin-left: -50px;
    margin-right: 20px;
  }
</style>
