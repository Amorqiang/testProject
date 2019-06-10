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
          <td>{{$t('inSupp.permitName')}}</td>
          <td><input class="self_td" type="text" name="" v-model="permitName" :placeholder="$t('inSupp.pleaseEnter')">
          </td>
        </tr>
        <tr class="datasup-change">
          <td>{{$t('inSupp.permitNo')}}</td>
          <td><input class="self_td" type="text" name="" v-model="permitNo" :placeholder="$t('inSupp.pleaseEnter')">
          </td>
        </tr>
        <tr class="datasup-change">
          <td>{{$t('inSupp.legalPerson')}}</td>
          <td><input class="self_td" type="text" name="" v-model="legalPerson" :placeholder="$t('inSupp.pleaseEnter')">
          </td>
        </tr>
        <tr class="datasup-change">
          <td>{{$t('forfeitingdetail.license_no')}}</td>
          <td><input class="self_td" type="text" name="" v-model.trim="licenseNO" ref="licenseNO"
                     :placeholder="$t('inSupp.pleaseEnter')"></td>
        </tr>
        <tr class="datasup-change">
          <td>{{$t('inSupp.officeAddr')}}</td>
          <td><input class="self_td" type="text" name="" v-model="officeAddr" :placeholder="$t('inSupp.pleaseEnter')">
          </td>
        </tr>
        <tr class="datasup-change">
          <td>{{$t('companInformation.companyDomicile')}}</td>
          <td><input class="self_td" type="text" name="" v-model="companyDomicile"
                     :placeholder="$t('inSupp.pleaseEnter')"></td>
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
            >
              <el-button size="small" type="primary">{{$t('inSupp.clickUpload')}}</el-button>
              <div slot="tip" class="el-upload__tip">{{$t('inSupp.uploadLimit')}}</div>
            </el-upload>
          </td>
        </tr>
        <tr class="datasup-change">
          <td>SWIFT CODE</td>
          <td><input class="self_td" type="text" name="" ref="swiftCode"
                     :placeholder="$t('inSupp.pleaseEnterSWIFTCODE')" v-model.trim="swiftCode"
                     @change="checkSwiftCode()"></td>
        </tr>
        <tr class="datasup-change">
          <td>{{$t('inSupp.uploadFile')}}</td>
          <td class="self_td">
            <el-upload
              class="upload-demo"
              action=""
              :before-upload="submitDataUploadUrlForm"
              :on-preview="dataUploadUrlPreview"
              :on-remove="dataUploadUrlRemove"
              :file-list="dataUploadUrlList"
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
                                                                                    style="width:280px；height: 60px;background: #fff; border: 0;" type="text"
                                                                                    v-model="code" value=""
                                                                                    :placeholder="$t('inSupp.inputCode')">
          </td>
          <td class="self_td">
            <button v-show="show" type="button" @click="sendCode()" name="button">{{$t('inSupp.sendCaptcha')}}</button>
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
            <el-checkbox v-model="forfeitingType">{{$t('assetsType.forfeiting')}}</el-checkbox>
            <el-checkbox v-model="factoringType">{{$t('assetsType.factoring')}}</el-checkbox>
          </td>
          <!-- <td><input type="checkbox" name="assetsType" v-model="assetsTypeVal" value="1" style="height: 1%;width: 1%;" >福费廷</td>
          <td><input type="checkbox" name="assetsType" v-model="assetsTypeVal" value="2" style="height: 1%;width: 1%;" >保理</td> -->
          <!-- <button type="checkbox" name="button">福费廷</button> -->
          <!-- <button type="checkbox" name="button">保理</button> -->
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
    components: {},
    data() {
      return {
        show: true,
        count: '',
        companyData: {},
        permitName: '',
        permitNo: '',
        legalPerson: '',
        licenseNO: '',
        officeAddr: '',
        productList: [],
        forfeitingType: false,
        factoringType: false,
        licenseImgUrl: '',
        dataUploadUrl: '',
        code: '',
        companyDomicile: '',
        phoneBind: false,
        licenseImgUrlList: [],
        dataUploadUrlList: [],
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
        let that = this;
        var body = {};
        body.mobile = this.companyData.contactTel;
        this.POST(sendPhoneCode, {'body': body}, function (response) {
          if (response.code === 300) {
            // 如果成功之后计时验证码
            let TIME_COUNT = 180; // 总计时180秒
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
            this.$message(response.message);
          }
        });
      },
      // 点击绑定按钮后颜色置灰
      bangding() {
        let that = this;
        if (that.code === '') {
          that.$message({
            showClose: true,
            message: this.$t('inSupp.pleaseEnterCaptcha'),
            type: 'error'
          });
          return false;
        }
        var body = {};
        body.mobile = that.companyData.contactTel;
        body.code = that.code;
        that.POST(valiCode, {'body': body}, function (response) {
          if (response.code === 300) {
            that.$message(that.$t('inSupp.bindSuccess'));
          } else {
            that.$message(response.message);
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
      dataUploadUrlRemove(file, dataUploadUrlList) {
        for (var i = 0; i < dataUploadUrlList.length; i++) {
          if ((file.uid + '') === (dataUploadUrlList[i].uid + '')) {
            dataUploadUrlList.splice(i, 1);
          }
        }
        this.dataUploadUrlList = dataUploadUrlList;
      },
      dataUploadUrlPreview(file) {
        window.open(file.url);
      },
      submitDataUploadUrlForm(file) {
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
            that.dataUploadUrlList = [];
            that.dataUploadUrlList.push({name: file.name, uid: file.uid, url: response.url});
          } else {
            that.$message(response.message);
          }
        });
      },
      initData() {
        let that = this;
        this.POST(getOrgByUserId, {'body': {}}, function (response) {
          that.companyData = response.data;
          that.productList = response.data.productList;
          that.companyDomicile = response.data.companyDomicile;
          if (response.data.orgDetail != null && response.data.orgDetail !== '') {
            var orgDetail = JSON.parse(response.data.orgDetail);
            that.permitName = orgDetail.permitName;
            that.permitNo = orgDetail.permitNo;
            that.legalPerson = orgDetail.legalPerson;
            that.officeAddr = orgDetail.officeAddr;
            that.swiftCode = orgDetail.swiftCode;
            if (orgDetail.licenseImgUrl != null || orgDetail.licenseImgUrl !== '') {
              // var licenseImgUrlArr =  orgDetail.licenseImgUrl.split(';');
              // for (var i = 0; i < licenseImgUrlArr.length; i++) {
              //   if(licenseImgUrlArr[i]!=null&&licenseImgUrlArr[i]!=''){
              //     that.licenseImgUrlList.push({name: "营业执照"+i,uid: i,url:  orgDetail.licenseImgUrl});
              //   }
              // }
              that.licenseImgUrlList.push({
                name: that.$t('inSupp.businessLicense'),
                uid: 1,
                url: orgDetail.licenseImgUrl
              });
            }
            if (orgDetail.dataUploadUrl != null || orgDetail.dataUploadUrl !== '') {
              that.dataUploadUrlList.push({
                name: that.$t('inSupp.relatedDocuments'),
                uid: 1,
                url: orgDetail.dataUploadUrl
              });
            }
          }
          that.licenseNO = response.data.licenseNo;
          if ((response.data.phoneBind + '') === '0') {
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
        body.jsonOrg.licenseImgUrl = {};
        body.jsonOrg.dataUploadUrl = {};
        body.jsonProduct.forfeiting = {};
        body.jsonProduct.factoring = {};
        body.orgType = self.companyData.companyTypeId1En;
        body.jsonOrg.permitName = self.permitName;
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
        body.jsonOrg.permitNo = self.permitNo;
        body.jsonOrg.legalPerson = self.legalPerson;
        var reg1 = /^[0-9a-zA-Z]+$/;
        if (self.licenseNO === '' || !reg1.test(self.licenseNO)) {
          self.$message(this.$t('clues.checkLicenseNO'));
          this.$refs.licenseNO.focus();
          return false;
        }
        body.jsonOrg.licenseNO = self.licenseNO;
        body.jsonOrg.officeAddr = self.officeAddr;
        body.jsonOrg.orgRegisterAddr = self.companyDomicile;
        body.jsonOrg.orgId = self.companyData.id;
        body.jsonOrg.mobile = self.companyData.contactTel;
        body.jsonProduct.forfeiting.assetsType = (self.forfeitingType) ? '1' : '';
        body.jsonProduct.factoring.assetsType = (self.factoringType) ? '2' : '';
        // console.log("dataUploadUrlList=========" + self.dataUploadUrlList);
        // console.log("licenseImgUrlList=========" + self.licenseImgUrlList);
        if (self.licenseImgUrlList.length < 1) {
          // self.$message("请上传营业执照！");
          self.$message({
            showClose: true,
            message: self.$t('inSupp.businessLicenseRequired'),
            type: 'error'
          });
          return false;
        }
        self.licenseImgUrl = self.licenseImgUrlList[self.licenseImgUrlList.length - 1].url;
        if (self.dataUploadUrlList.length < 1) {
          // self.$message("请上相关资料！");
          self.$message({
            showClose: true,
            message: self.$t('inSupp.relatedDocumentsRequired'),
            type: 'error'
          });
          return false;
        }
        self.dataUploadUrl = self.dataUploadUrlList[self.dataUploadUrlList.length - 1].url;
        // for (var i = 0; i < self.licenseImgUrlList.length; i++) {
        //   self.licenseImgUrl+=self.licenseImgUrlList[i].url+";";
        // }
        // console.log("licenseImgUrl==============" + self.licenseImgUrl);
        // console.log("dataUploadUrl==============" + self.dataUploadUrl);
        body.jsonOrg.licenseImgUrl = self.licenseImgUrl;
        body.jsonOrg.dataUploadUrl = self.dataUploadUrl;
        if (!self.forfeitingType && !self.factoringType) {
          // self.$message("请选择产品类型！");
          self.$message({
            showClose: true,
            message: self.$t('inSupp.productTypeRequired'),
            type: 'error'
          });
          return false;
        }
        //  var jsonObject1 = JSON.stringify(body);
        this.POST(mackupCompany, {'body': body}, function (response) {
          if (response.code === 300) {
            self.$router.push({name: 'Companymsg'});
          } else {
            alert(response.message);
          }
        });
      },
      doSth: function (type) {
        let that = this;
        if (type === 'licenseImgUrl') {
          if (that.licenseImgUrl == null || that.licenseImgUrl === '') {
            that.$notify.info({
              title: that.$t('TellerManagementPage.tips'),
              message: that.$t('inSupp.businessLicenseRequired')
            });
          } else {
            window.open(that.licenseImgUrl);
          }
        }
        if (type === 'dataUploadUrl') {
          if (that.dataUploadUrl == null || that.dataUploadUrl === '') {
            that.$notify.info({
              title: that.$t('TellerManagementPage.tips'),
              message: that.$t('inSupp.relatedDocumentsRequired')
            });
          } else {
            window.open(that.dataUploadUrl);
          }
        }
      }
    },
    watch: {},
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
