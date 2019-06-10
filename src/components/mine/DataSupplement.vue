<template id="">
  <div class="datasup-main clearfix">
    <div class="datasup-center">
      <div>
        <h1>{{$t('inSupp.informationSupplement')}}</h1>
        <div class="datasup-center-title">
          <h3>{{$t('inSupp.certificatedInformationSupplement')}}</h3>
        </div>
        <table width="1110px">
          <p>{{$t('inSupp.basicInformation')}}</p>
          <tr>
            <td>{{$t('companInformation.companyName')}}</td>
            <td class="self_td">{{companyName}}</td>
          </tr>
          <tr class="datasup-change">
            <td>{{$t('companInformation.companyDomicile')}}</td>
            <td class="self_td"><input class="self_td" type="text" name=""
                                       :placeholder="$t('inSupp.writeCompanyAddress')" v-model.trim="companyDomicile">
            </td>
          </tr>
          <tr class="datasup-change">
            <td>{{$t('companInformation.licenseNo')}}</td>
            <td><input class="self_td" type="text" name="" :placeholder="$t('inSupp.writeBusiness')"
                       v-model.trim="licenseNo"></td>
          </tr>
          <tr class="datasup-change">
            <td>{{$t('companInformation.licenseUrl')}}</td>

            <td class="self_td">
              <el-upload class="upload-demo" action="" :before-upload="submitForm" :on-remove="handleRemove"
                         :on-preview="handlePreview" multiple:limit="1" :file-list="fileList">
                <el-button size="small" type="primary">{{$t('inSupp.clickUpload')}}</el-button>
              </el-upload>
            </td>
          </tr>
          <tr class="datasup-change">
            <td>SWIFT CODE</td>
            <td><input class="self_td" type="text" name="" :placeholder="$t('inSupp.writeSWIFICODE')"
                       v-model.trim="swiftCode" @change="checkSwiftCode()"></td>
          </tr>
          <tr>
            <td>{{$t('companInformation.contactTel')}}</td>
            <td class="self_td">{{contactTel}}</td>
          </tr>
          <tr v-show="isShow">
            <td>{{$t('inSupp.phoneVerificationCode')}}<input type="text" style="width:280px" name="" value=""
                                                             :placeholder="$t('inSupp.phoneVerification')"
                                                             v-model="code" class="identifying-input"></td>
            <td class="self_td">
              <button v-show="show" type="button" name="button" @click="sendCode()">{{$t('inSupp.sendCode')}}</button>
              <button v-show="!show" class="identifying-button" type="info" style="background:#ccc">
                {{$t('login.reSend')}}{{count}}s
              </button>
              <button @click="binding()" type="button" name="button" :class="{'bindingdisabled': disabled}"
                      class="binding" :disabled="disabled">{{$t('inSupp.binDing')}}
              </button>
            </td>
          </tr>
          <tr>
            <td>{{$t('companInformation.companyEmail')}}</td>
            <td class="self_td">{{email}}</td>
          </tr>
          <tr>
            <td>{{$t('companInformation.productCode')}}</td>
            <div class="self_td" style="margin:15px">
              <el-checkbox-group v-model="checkedName">
                <el-checkbox label="1">{{$t('MyAssets.forfaiting')}}</el-checkbox>
                <el-checkbox label="2">{{$t('MyAssets.factoring')}}</el-checkbox>
              </el-checkbox-group>
            </div>
          </tr>

        </table>
        <!--  <router-link to="/companymsg"> -->
        <div class="datasup-center-submit-div">
          <button type="button" name="" @click="saveData()">{{$t('inSupp.save')}}</button>
        </div>
        <br/>
        <!--</router-link> -->

      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import navMenu from '../NavMenu.vue';
  import {getOrgByUserId, valiCode, sendPhoneCode, mackupCompany} from '../../assets/js/const';

  export default {
    data() {
      return {
        companyName: '',
        companyDomicile: '',
        licenseNo: '',
        contactTel: '',
        email: '',
        swiftCode: '',
        licenseImgUrl: '',
        orgId: '',
        companyTypeId1En: '',
        code: '', //  短信验证码
        checkedName: [],
        fileList: [],
        disabled: false,
        isShow: true,
        show: true, //  倒计时按钮显示
        count: '' // 倒计时秒数
      };
    },
    components: {
      navMenu
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

        // if (!(RegExp.test(this.swiftCode) && (this.swiftCode.length === 8 || this.swiftCode.length === 11))) {
        //   this.$message(this.$t('clues.checkSwiftCode'))
        // }
      },
      getFile(event) {
        this.file = event.target.files[0];
      },
      submitForm(file) {
        let that = this;

        var suffix = file.name.split('.').reverse()[0];
        if (suffix !== 'jpg' && suffix !== 'png') {
          that.$message(that.$t('clues.imageUpload'));
          return false;
        }
        var allowSize = 2 * 1024 * 1024;// 2M
        var size = file.size;
        if (size > allowSize) {
          that.$message(that.$t('clues.fileSize'));
          return false;
        }
        //  event.preventDefault();
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        };
        this.UpLoad('/upload/file', {'config': config, 'data': file}, function (response) {
          if (response.code === 200) {
            that.$message(that.$t('clues.successFile'));
            that.licenseImgUrl = response.url;
            var files = {};
            that.fileList = [];
            files.name = file.name;
            files.src = response.url;
            that.fileList.push(files);
          } else {
            that.$message(that.$t('clues.failFile'));
          }
        });
      },
      handleRemove(file, fileList) {
        this.fileList = [];
        this.licenseImgUrl = '';
      },
      handlePreview(file) {
        window.open(this.licenseImgUrl);
      },
      binding() {
        let that = this;
        this.POST(valiCode, {'body': {'mobile': this.contactTel, 'code': this.code}}, function (response) {
          if (response.code === 300) {
            that.$message(that.$t('clues.binDingSuccess'));
            that.disabled = true;
          } else {
            that.$message(that.$t('clues.binDingFailure') + response.message);
          }
        });
      },
      sendCode: function () {
        let that = this;
        that.POST(sendPhoneCode, {'body': {'mobile': this.contactTel}}, function (response) {
          if (response.code === 300) {
            that.$message(that.$t('clues.sendSuccess'));
            // 如果成功之后计时验证码
            let TIME_COUNT = 180; //  总计时180秒
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
            that.$message(that.$t('clues.sendFile') + response.message);
          }
        });
      },
      saveData: function () {
        let that = this;
        var jsonProduct = {};
        if (this.checkedName.length === 2) {
          jsonProduct.forfeiting = {};
          jsonProduct.factoring = {};
          jsonProduct.forfeiting.assetsType = '1';
          jsonProduct.forfeiting.id = '';
          jsonProduct.factoring.assetsType = '2';
          jsonProduct.factoring.id = ' ';
        } else {
          if (this.checkedName[0] === '1') {
            jsonProduct.forfeiting = {};
            jsonProduct.forfeiting.assetsType = 1;
            jsonProduct.forfeiting.id = '';
          } else if (this.checkedName[0] === '2') {
            jsonProduct.factoring = {};
            jsonProduct.factoring.assetsType = 2;
            jsonProduct.factoring.id = '';
          } else {
            that.$message(that.$t('clues.selectAssets'));
            return;
          }
        }

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

        //  swiftcode正则校验
        // var reg = /^[A-Z\d]+$/;
        // if (!(reg.test(this.swiftCode) && (this.swiftCode.length === 8 || this.swiftCode.length === 11))) {
        //   that.$message(this.$t('clues.checkSwiftCode'));
        //   return;
        // }
        // 去除特殊字符
        // var RegExp1 = /[`~!@#$%^&*(){}+=]/g;
        // this.licenseNo = this.licenseNo.replace(RegExp1,'');
        // this.companyDomicile = this.companyDomicile.replace(RegExp1,'');

        this.POST(mackupCompany, {
          'body': {
            'orgType': this.companyTypeId1En,
            'jsonOrg': {
              'licenseNO': this.licenseNo,
              'swiftCode': this.swiftCode,
              'orgRegisterAddr': this.companyDomicile,
              'licenseImgUrl': this.licenseImgUrl,
              'orgId': this.orgId,
              'mobile': this.contactTel
            },
            'jsonProduct': jsonProduct
          }
        }, function (response) {
          if (response.code === 300) {
            that.$message(that.$t('clues.saveSuccess'));
            that.$router.replace({path: 'companymsg'});
          } else {
            that.$message(that.$t('clues.saveFailure') + response.message);
          }
        });
      }
    },
    created() {
      let that = this;
      this.POST(getOrgByUserId, {'body': {}}, function (response) {
        console.log(response);
        that.companyName = response.data.companyName;
        that.companyDomicile = response.data.companyDomicile;
        that.licenseNo = response.data.licenseNo;
        that.contactTel = response.data.contactTel;
        that.swiftCode = response.data.swiftCode;
        that.email = response.data.email;
        that.orgId = response.data.id;
        that.companyTypeId1En = response.data.companyTypeId1En;
        if (response.data.licenseUrl != null && response.data.licenseUrl !== '') {
          that.licenseImgUrl = response.data.licenseUrl;
          var files = {};
          that.fileList = [];
          files.name = that.licenseNo;
          files.src = that.licenseImgUrl;
          that.fileList.push(files);
        }
        var ischeck = response.data.productList;
        if (ischeck.length === 2) {
          that.checkedName.push(ischeck[0].productCode);
          that.checkedName.push(ischeck[1].productCode);
        } else if (ischeck.length === 1) {
          that.checkedName.push(ischeck[0].productCode);
        } else {

        }

        if (response.data.phoneBind === 1) {
          that.isShow = false;
        }
      });
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
      table td button.bindingdisabled {
        background: #ccc;
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
    width: 100px;
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
