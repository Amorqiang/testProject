<template id="">
  <div class="datasup-main clearfix">
    <div class="datasup-center">
      <h1>{{$t('inSupp.informationSupplement')}}</h1>
      <div class="datasup-center-title">
        <p>{{$t('inSupp.certificatedInformationSupplement')}}</p>
      </div>
      <table>
        <p>{{$t('inSupp.basicInformation')}}</p>
        <tr>
          <td>{{$t('companInformation.companyName')}}</td>
          <td class="self_td">{{companyData.companyName}}</td>
        </tr>
        <tr class="datasup-change">
          <td>{{$t('companInformation.licenseNo')}}</td>
          <td><input class="self_td" type="text" name="" :placeholder="$t('inSupp.pleaseEnter')"
                     v-model.trim="licenseNO" ref="licenseNO"></td>
        </tr>
        <tr class="datasup-change">
          <td>{{$t('inSupp.orgCode')}}</td>
          <td><input class="self_td" type="text" name="" v-model.trim="orgCode" ref="orgCode"
                     :placeholder="$t('inSupp.pleaseEnter')"></td>
        </tr>
        <tr class="datasup-change">
          <td>{{$t('companInformation.companyDomicile')}}</td>
          <td class="self_td"><input class="self_td" type="text" name="" v-model="companyDomicile"
                                     :placeholder="$t('inSupp.pleaseEnter')"></td>
        </tr>
        <tr class="datasup-change">
          <td>{{$t('inSupp.officeAddr')}}</td>
          <td class="self_td"><input class="self_td" type="text" name="" v-model="officeAddr"
                                     :placeholder="$t('inSupp.pleaseEnter')"></td>
        </tr>
        <tr class="datasup-change">
          <td>SWIFT CODE</td>
          <td><input class="self_td" type="text" name="" :placeholder="$t('inSupp.pleaseEnterSWIFTCODE')"
                     v-model.trim="swiftCode" ref="swiftCode" @change="checkSwiftCode()"></td>
        </tr>
        <tr class="datasup-change">
          <td>{{$t('companInformation.licenseUrl')}}</td>
          <td class="self_td">
            <el-upload
              class="upload-demo"
              action=""
              :before-upload="submitLicenseImgForm"
              :on-preview="licenseImgPreview"
              :on-remove="licenseImgRemove"
              :file-list="licenseImgUrlList"
              multiple:limit="1"
            >
              <el-button size="small" type="primary">{{$t('inSupp.clickUpload')}}</el-button>
              <div slot="tip" class="el-upload__tip">{{$t('inSupp.uploadLimit')}}</div>
            </el-upload>
          </td>
        </tr>
        <tr class="datasup-change">
          <td>{{$t('inSupp.orgIcc')}}</td>
          <td class="self_td">
            <el-upload
              class="upload-demo"
              action=""
              :before-upload="submitOrgCodeImgForm"
              :on-preview="orgCodeImgPreview"
              :on-remove="orgCodeImgRemove"
              :file-list="orgCodeImgUrlList"
            >
              <el-button size="small" type="primary">{{$t('inSupp.clickUpload')}}</el-button>
              <div slot="tip" class="el-upload__tip">{{$t('inSupp.uploadLimit')}}</div>
            </el-upload>
          </td>
        </tr>
        <tr class="datasup-change">
          <td>{{$t('inSupp.finaSfm')}}</td>
          <td class="self_td">
            <el-upload
              class="upload-demo"
              action=""
              :before-upload="submitYearFinancialTableForm"
              :on-preview="yearFinancialTablePreview"
              :on-remove="yearFinancialTableRemove"
              :file-list="yearFinancialTableList"
            >
              <el-button size="small" type="primary">{{$t('inSupp.clickUpload')}}</el-button>
              <div slot="tip" class="el-upload__tip">{{$t('inSupp.uploadLimit')}}</div>
            </el-upload>
          </td>
        </tr>
        <tr>
          <td>{{$t('companInformation.contactTel')}}</td>
          <td class="self_td">{{companyData.contactTel}}</td>
        </tr>
        <tr v-show="phoneBind">
          <td>{{$t('inSupp.phoneVerificationCode')}}&nbsp;&nbsp;&nbsp;&nbsp; <input class="datasup-change"
                                                                                    style="width:280px" type="text"
                                                                                    v-model="code" value=""
                                                                                    :placeholder="$t('inSupp.inputCode')">
          </td>
          <td class="self_td">
            <button v-show="show" type="button" @click="sendCode()" name="button">{{$t('inSupp.sendCode')}}</button>
            <button style="background:gray" v-show="!show" type="info">{{$t('login.reSend')}}{{count}}s</button>
            <button @click="bangding()" type="button" name="button" class="binding">{{$t('inSupp.binDing')}}</button>
          </td>
        </tr>
        <tr>
          <td>{{$t('companInformation.companyEmail')}}</td>
          <td class="self_td">{{companyData.email}}</td>
        </tr>
        <tr class="datasup-change">
          <td>{{$t('companInformation.productCode')}}</td>
          <td class="self_td">
            <el-checkbox v-model="forfeitingType">{{$t('MyAssets.forfaiting')}}</el-checkbox>
            <el-checkbox v-model="factoringType">{{$t('MyAssets.factoring')}}</el-checkbox>
          </td>
        </tr>
      </table>
      <br/>
      <div class="datasup-center-submit-div">
        <button type="button" name="" @click="saveData()">{{$t('inSupp.save')}}</button>
      </div>
      <br/>

    </div>

  </div>
</template>
<script type="text/javascript">
  import {valiCode, getOrgByUserId, mackupCompany, sendPhoneCode} from '../../assets/js/const';

  export default {
    data() {
      return {
        show: true,
        count: '',
        companyData: {},
        orgCode: '',
        licenseNO: '',
        officeAddr: '',
        companyDomicile: '',
        productList: [],
        forfeitingType: false,
        factoringType: false,
        licenseImgUrl: '',
        orgCodeImg: '',
        yearFinancialTable: '',
        code: '',
        phoneBind: false,
        licenseImgUrlList: [],
        orgCodeImgUrlList: [],
        yearFinancialTableList: [],
        swiftCode: ''
      };
    },
    methods: {

      checkSwiftCode() { // swiftcode正则校验
        var RegExp = /(^[A-Z]{6}[A-Z0-9]{2}$)|(^[A-Z]{6}[A-Z0-9]{5}$)/;
        if (this.swiftCode == null && this.swiftCode === '') {
          this.$message(this.$t('publishForfeiting.inputTenderSwift'));
          return false;
          // callback(new Error(this.$t('publishForfeiting.inputTenderSwift')));
        } else if (!RegExp.test(this.swiftCode)) {
          this.$message(this.$t('publishForfeiting.swiftCodeFormat'));
          return false;
          // callback(new Error(this.$t('publishForfeiting.swiftCodeFormat')));
        } else if (this.swiftCode.length === 8) {
          this.swiftCode = this.swiftCode + 'XXX';
          return false;
        }
      },
      sendCode() {
        var that = this;
        var body = {};
        body.mobile = that.companyData.contactTel;
        this.POST(sendPhoneCode, {'body': body}, function (response) {
          if (response.code === 300) {
            // 如果成功之后计时验证码
            let TIME_COUNT = 180; // 总计时60秒
            if (!that.timer) {
              that.count = TIME_COUNT;
              that.show = false;
              that.timer = setInterval(() => {
                if (that.count > 0 && that.count <= TIME_COUNT) {
                  that.count--;
                } else {
                  that.show = true;
                  clearInterval(that.timer);
                  that.timer = null;
                }
              }, 1000);
            }
          } else {
            alert(response.message);
          }
        });
      },
      // 点击绑定按钮后颜色置灰
      bangding() {
        if (this.code === '') {
          this.$message({
            showClose: true,
            message: this.$t('inSupp.pleaseEnterCaptcha'),
            type: 'error'
          });
          return false;
        }
        var body = {};
        body.mobile = this.companyData.contactTel;
        body.code = this.code;
        this.POST(valiCode, {'body': body}, (response) => {
          if (response.code === 300) {
            this.$message(this.$t('inSupp.bindSuccess'));
          } else {
            this.$message(response.message);
          }
        });
      },
      licenseImgRemove(file, licenseImgUrlList) {
        console.log(file, licenseImgUrlList);
        for (var i = 0; i < licenseImgUrlList.length; i++) {
          if ((file.uid + '') === (licenseImgUrlList[i].uid + '')) {
            licenseImgUrlList.splice(i, 1);
          }
        }
        this.licenseImgUrlList = licenseImgUrlList;
      },
      licenseImgPreview(file) {
        window.open(file.url);
      },
      submitLicenseImgForm(file) {
        var that = this;
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        };
        this.UpLoad('/upload/file', {'config': config, 'data': file}, function (response) {
          if (response.code === 200) {
            that.$message(that.$t('inSupp.uploadSuccess'));
            that.licenseImgUrlList = [];
            that.licenseImgUrlList.push({name: file.name, uid: file.uid, url: response.url});
          } else {
            that.$message(response.message);
          }
        });
      },
      orgCodeImgRemove(file, orgCodeImgUrlList) {
        for (var i = 0; i < orgCodeImgUrlList.length; i++) {
          if ((file.uid + '') === (orgCodeImgUrlList[i].uid + '')) {
            orgCodeImgUrlList.splice(i, 1);
          }
        }
        this.orgCodeImgUrlList = orgCodeImgUrlList;
      },
      orgCodeImgPreview(file) {
        window.open(file.url);
      },
      submitOrgCodeImgForm(file) {
        var that = this;
        //  event.preventDefault();
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        };
        this.UpLoad('/upload/file', {'config': config, 'data': file}, function (response) {
          if (response.code === 200) {
            that.$message(that.$t('inSupp.uploadSuccess'));
            that.orgCodeImgUrlList = [];
            that.orgCodeImgUrlList.push({name: file.name, uid: file.uid, url: response.url});
          } else {
            that.$message(response.message);
          }
        });
      },
      yearFinancialTableRemove(file, yearFinancialTableList) {
        console.log(file, yearFinancialTableList);
        for (var i = 0; i < yearFinancialTableList.length; i++) {
          if (file.uid === yearFinancialTableList[i].uid) {
            yearFinancialTableList.splice(i, 1);
          }
        }
        this.yearFinancialTableList = yearFinancialTableList;
      },
      yearFinancialTablePreview(file) {
        window.open(file.url);
      },
      submitYearFinancialTableForm(file) {
        var that = this;
        //  event.preventDefault();
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        };
        this.UpLoad('/upload/file', {'config': config, 'data': file}, function (response) {
          if (response.code === 200) {
            that.$message(that.$t('inSupp.uploadSuccess'));
            that.yearFinancialTableList = [];
            that.yearFinancialTableList.push({name: file.name, uid: file.uid, url: response.url});
          } else {
            that.$message(response.message);
          }
        });
      },
      initData() {
        let that = this;
        this.POST(getOrgByUserId, {'body': {}}, function (response) {
          console.log(response.data);
          that.companyData = response.data;
          that.productList = response.data.productList;
          that.licenseNO = response.data.licenseNo;
          that.companyDomicile = response.data.companyDomicile;
          if (response.data.orgDetail != null && response.data.orgDetail !== '') {
            var orgDetail = JSON.parse(response.data.orgDetail);
            that.orgCode = orgDetail.orgCode;
            that.officeAddr = orgDetail.officeAddr;
            that.swiftCode = orgDetail.swiftCode;
            if (orgDetail.licenseImgUrl != null && orgDetail.licenseImgUrl !== '' && orgDetail.licenseImgUrl !== undefined) {
              that.licenseImgUrlList.push({
                name: that.$t('inSupp.businessLicense'),
                uid: 1,
                url: orgDetail.licenseImgUrl
              });
            }
            if (orgDetail.orgCodeImg != null && orgDetail.orgCodeImg !== '' && orgDetail.orgCodeImg !== undefined) {
              that.orgCodeImgUrlList.push({
                name: that.$t('inSupp.OrganizationCodeCertificate'),
                uid: 1,
                url: orgDetail.orgCodeImg
              });
            }
            if (orgDetail.yearFinancialTable != null && orgDetail.yearFinancialTable !== '' && orgDetail.yearFinancialTable !== undefined) {
              that.yearFinancialTableList.push({
                name: that.$t('inSupp.12Financial'),
                uid: 1,
                url: orgDetail.yearFinancialTable
              });
            }
          }
          if (response.data.phoneBind === 0) {
            that.phoneBind = true;
          }
          if (that.productList.length > 1) {
            that.forfeitingType = true;
            that.factoringType = true;
          } else {
            ((that.productList[0].productCode + '') === '1') ? that.forfeitingType = true : that.factoringType = true;
          }
        });
      },
      saveData: function () {
        var self = this;
        var body = {};
        body.jsonProduct = {};
        body.jsonOrg = {};
        body.jsonProduct.forfeiting = {};
        body.jsonProduct.factoring = {};
        body.orgType = self.companyData.companyTypeId1En;
        var reg = /^[0-9a-zA-Z]+$/;
        if (self.licenseNO === '' || !reg.test(self.licenseNO)) {
          self.$message(this.$t('clues.checkLicenseNO'));
          this.$refs.licenseNO.focus();
          return false;
        }
        body.jsonOrg.licenseNO = self.licenseNO;
        if (self.orgCode === '' || !reg.test(self.orgCode)) {
          self.$message(this.$t('clues.checkOrgCode'));
          this.$refs.orgCode.focus();
          return false;
        }
        body.jsonOrg.orgCode = self.orgCode;
        // swiftcode正则校验
        var RegExp = /(^[A-Z]{6}[A-Z0-9]{2}$)|(^[A-Z]{6}[A-Z0-9]{5}$)/;
        if (this.swiftCode == null && this.swiftCode === '') {
          this.$message(this.$t('publishForfeiting.inputTenderSwift'));
          return false;
          // callback(new Error(this.$t('publishForfeiting.inputTenderSwift')));
        } else if (!RegExp.test(this.swiftCode)) {
          this.$message(this.$t('publishForfeiting.swiftCodeFormat'));
          return false;
          // callback(new Error(this.$t('publishForfeiting.swiftCodeFormat')));
        } else if (this.swiftCode.length === 8) {
          this.swiftCode = this.swiftCode + 'XXX';
          return false;
        }
        body.jsonOrg.swiftCode = self.swiftCode;
        body.jsonOrg.officeAddr = self.officeAddr;
        body.jsonOrg.orgRegisterAddr = self.companyDomicile;
        body.jsonOrg.orgId = self.companyData.id;
        body.jsonOrg.mobile = self.companyData.contactTel;
        body.jsonProduct.forfeiting.assetsType = (self.forfeitingType) ? '1' : '';
        body.jsonProduct.factoring.assetsType = (self.factoringType) ? '2' : '';
        // for (var i = 0; i < self.licenseImgUrlList.length; i++) {
        //   self.licenseImgUrl+=self.licenseImgUrlList[i].url+";";
        // }
        if (self.licenseImgUrlList.length < 1) {
          self.$message(self.$t('inSupp.businessLicenseRequired'));
          return false;
        }
        self.licenseImgUrl = self.licenseImgUrlList[self.licenseImgUrlList.length - 1].url;
        if (self.orgCodeImgUrlList.length < 1) {
          self.$message(self.$t('inSupp.OrganizationCodeCertificateRequired'));
          return false;
        }
        if (self.yearFinancialTableList.length < 1) {
          self.$message(self.$t('inSupp.12FinancialUnUpload'));
          return false;
        }
        self.orgCodeImg = self.orgCodeImgUrlList[self.orgCodeImgUrlList.length - 1].url;
        self.yearFinancialTable = self.yearFinancialTableList[self.yearFinancialTableList.length - 1].url;
        body.jsonOrg.licenseImgUrl = self.licenseImgUrl;
        body.jsonOrg.orgCodeImg = self.orgCodeImg;
        body.jsonOrg.yearFinancialTable = self.yearFinancialTable;
        //  var jsonObject1 = JSON.stringify(body);
        if (!self.forfeitingType && !self.factoringType) {
          self.$message({
            showClose: true,
            message: self.$t('inSupp.productTypeRequired'),
            type: 'error'
          });
          return false;
        }
        console.log(body);
        this.POST(mackupCompany, {'body': body}, function (response) {
          if (response.code === 300) {
            self.$router.push({name: 'Companymsg'});
          } else {
            alert(response.message);
          }
        });
      },
      doSth: function (type) {
        console.log(type);
        let that = this;
        if (type === 'licenseImgUrl') {
          if (that.licenseImgUrl == null || that.licenseImgUrl === '') {
            that.$notify.info({
              title: that.$t('TellerManagementPage.tips'),
              message: that.$t('inSupp.businessLicenseUnUpload')
            });
          } else {
            window.open(that.licenseImgUrl);
          }
        }
        if (type === 'orgCodeImg') {
          if (that.orgCodeImg == null || that.orgCodeImg === '') {
            that.$notify.info({
              title: that.$t('TellerManagementPage.tips'),
              message: that.$t('inSupp.OrganizationCodeCertificateUnUpload')
            });
          } else {
            window.open(that.orgCodeImg);
          }
        }
        if (type === 'yearFinancialTable') {
          if (that.yearFinancialTable == null || that.yearFinancialTable === '') {
            that.$notify.info({
              title: that.$t('TellerManagementPage.tips'),
              message: that.$t('inSupp.12FinancialUnUpload')
            });
          } else {
            window.open(that.yearFinancialTable);
          }
        }
      }
    },
    watch: {
      // assetsTypeVal (oldval, newval) {
      //   if(this.assetsTypeVal==""){
      //     alert("请选择产品类型！");
      //   }else if(this.assetsTypeVal==1){
      //     this.forfeitingType=1;
      //     this.factoringType='';
      //   }else if(this.assetsTypeVal==2){
      //     this.forfeitingType='';
      //     this.factoringType=2;
      //   }else{
      //     this.forfeitingType=1;
      //     this.factoringType=2;
      //   }
      // },
    },
    mounted() {
      this.initData();
    }
  };
</script>
<style media="screen" lang="less">
  .datasup-main {
    width: 1100px;
    margin: 0 auto;
    .datasup-center {
      width: 1100px;
      margin: 0 auto;
      .self_td {
        text-align: right;
      }
    }
  }

  .datasup-center table {
    border-collapse: collapse;

  }

  .datasup-center td {
    border-top: 1px solid #f5f7fa;
    height: 60px;
    width: 10%;
  }

  .datasup-center button {
    background: #3967c3;
    border: none;
    outline: none;
    color: white;
    width: 100px;
    height: 30px;
    font-size: 13px;
    cursor: pointer;

  }

  .datasup-change {
    background: lightgray;
  }

  .datasup-change input {
    background: lightgray;
    height: 100%;
    width: 100%;
    outline: none;
    border: none;
  }

  .datasup-center thead div {
    width: 100%;
    text-align: center;
  }

  .datasup-center-submit {
    width: 500px;
    height: 30px;
    text-align: center;
    background: #3967c3;
    border: none;
    outline: none;
    color: white;
    border-radius: 3px;
  }

  .datasup-center-submit-div {
    text-align: center;
  }

  .datasup-span {

    color: lightgray;
    margin-left: -105px;

  }

  .datasup-center .identifying-input {
    /*width: 100%;*/
    height: 100%;
    margin-left: 50px;
    border: none;

  }

</style>
