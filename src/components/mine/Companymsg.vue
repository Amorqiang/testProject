<template>
  <div class="company-msg clearfix">
    <div class="companymsg-center">

      <h1>{{$t('companInformation.myCompanInformation')}}</h1>
      <div>
        <h1 align="right" style="color:red ; font-size:20px">{{$t('companInformation.notice')}}</h1>
      </div>
      <table>
        <tr>
          <td>{{$t('companInformation.companType')}}</td>
          <td class="self_td">{{companyTypeId1}}&nbsp;&nbsp;&nbsp;&nbsp;{{companyTypeId2}}</td>
        </tr>
        <tr>
          <td>{{$t('companInformation.companyName')}}</td>
          <td class="self_td">{{companyName}}</td>
        </tr>
        <tr>
          <td>{{$t('companInformation.companyDomicile')}}</td>
          <td class="self_td">{{companyDomicile}}</td>
        </tr>
        <tr>
          <td>{{$t('companInformation.contactName')}}</td>
          <td class="self_td">{{contactName}}</td>
        </tr>
        <tr>
          <td>{{$t('companInformation.companyEmail')}}</td>
          <td class="self_td">{{email}}</td>
        </tr>

        <tr>
          <td>{{$t('companInformation.contactTel')}}</td>
          <td class="self_td">{{contactTel}}</td>
        </tr>
        <tr>
          <td>{{$t('companInformation.licenseNo')}}</td>
          <td class="self_td">{{licenseNo}}</td>
        </tr>
        <tr>
          <td>{{$t('companInformation.licenseUrl')}}</td>
          <td class="self_td">
            <button @click="doSth">{{$t('companInformation.see')}}</button>
          </td>
        </tr>
        <tr>
          <td>SWIFT CODE</td>
          <td class="self_td">{{swiftCode}}</td>
        </tr>
        <tr>
          <td>{{$t('companInformation.productCode')}}</td>
          <td class="self_td"><span class="company-span" v-for='list in productList'>

               <div v-if="list.productCode == 1">{{$t('MyAssets.forfaiting')}}</div>
               <div v-if="list.productCode == 2">{{$t('MyAssets.factoring')}}</div>
             </span>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script type="text/javascript">
  export default {
    data() {
      return {
        id: '',
        companyTypeId1: '',
        companyTypeId2: '',
        companyName: '',
        companyDomicile: '',
        contactName: '',
        licenseNo: '',
        licenseUrl: '',
        email: '',
        contactTel: '',
        swiftCode: '',
        productList: [],
        linkShow: false,
        isShow: false,
        licenseImgUrlList: [],
        certificate: ''
      };
    },
    components: {},
    methods: {

      licenseImgPreview(file) {
        window.open(file.url);
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
        if (that.licenseUrl == null || that.licenseUrl === '') {
          that.$message({
            showClose: true,
            message: that.$t('clues.supplement'),
            type: 'error'
          });
        } else {
          window.open(that.licenseUrl);
        }
      }
    },
    created() {
      var self = this;
      let data = {'body': {}};
      this.POST('/owner/companyOrg/getOrgByUserId', data, function (res) {
        console.log(res.data);
        self.id = res.data.id;
        self.companyTypeId1 = res.data.companyTypeId1;
        self.companyTypeId2 = res.data.companyTypeId2;
        self.companyName = res.data.companyName;
        self.companyDomicile = res.data.companyDomicile;
        self.contactName = res.data.contactName;
        self.swiftCode = res.data.swiftCode;
        self.licenseNo = res.data.licenseNo;
        self.licenseUrl = res.data.licenseUrl;
        if (res.data.licenseUrl != null || res.data.licenseUrl !== '') {
          var licenseImgUrlArr = res.data.licenseUrl.split(';');
          for (var i = 0; i < licenseImgUrlArr.length; i++) {
            if (licenseImgUrlArr[i] != null && licenseImgUrlArr[i] !== '') {
              self.licenseImgUrlList.push({
                name: self.$t('inSupp.businessLicense') + i,
                uid: i,
                url: licenseImgUrlArr[i]
              });
            }
          }
        }
        self.email = res.data.email;
        self.contactTel = res.data.contactTel;
        self.productList = res.data.productList;
        if (res.data.userType === '1') {
          self.linkShow = true;
        }
      });
    }
  };
</script>
<style media="screen" lang="less">
  .company-msg {
    width: 1100px;
    margin: 0 auto;
    .companymsg-center {
      width: 100%;
      padding-bottom: 40px;
    }
    .self_td {
      text-align: right;
    }
  }

  .companymsg-center table {
    border-collapse: collapse;

  }

  .companymsg-center td {
    border-top: 1px solid #f5f7fa;
    height: 60px;
    width: 10%;
  }

  .companymsg-center tr:hover {
    background: #f5f7fa;
  }

  .companymsg-center button {
    background: #3967c3;
    border: none;
    outline: none;
    color: white;
    width: 100px;
    height: 30px;
    font-size: 13px;

  }

  .companymsg-span {
    /*float: left;*/
    color: lightgray;
    margin-left: -50px;
    margin-right: 20px;
  }

  .blockchain {
    display: none;
  }

  .upload-demo {
    height: 102px;
  }
</style>
