<template>
  <div class="register-main">
    <div class="register-detail" :class="{'en-register-detail': $i18n.locale === 'en'}">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="register">
        <!--<div class="reg-head">
          <img src="../assets/logo_02.gif" alt="" class="reg-head-img">
          <span class="reg-head-title">NEWNEW数字资产交易平台</span>
        </div>-->
        <el-form-item :label="$t('regist.organizationType')" prop="companyTypeId1" class="reg-type">
          <el-select v-model="ruleForm.companyTypeId1" :placeholder="null" @change="getCompanyType">
            <el-option
              v-for="item in selectData.companyTypeId1.data"
              :key="item.code"
              :label="item.name"
              :value="item.code">
            </el-option>
          </el-select>
          <el-select v-model="ruleForm.companyTypeId2" :placeholder="null" class="reg-type2">
            <el-option
              v-for="item in selectData.companyTypeId2.data"
              :key="item.code"
              :label="item.name"
              :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('regist.regionCountry')" prop="areaId" required>
          <el-select v-model="ruleForm.areaId" :placeholder="$t('checkInfo.pleaseCheck')" id="reg-type3"
                     @change="getCountryId('0')">
            <el-option
              v-for="item in selectData.areaId.data"
              :key="item.code"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <el-form-item prop="countryId" required style="float: right; margin-left: 5px;">
            <el-select v-model="ruleForm.countryId" :placeholder="$t('checkInfo.pleaseCheck')" class="reg-type2">
              <el-option
                v-for="item in selectData.countryId.data"
                :key="item.code"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form-item>
        <el-form-item :label="$t('regist.corporateName')" prop="companyName" class="reg-input">
          <el-input style="margin-top: 20px;" v-model="ruleForm.companyName" auto-complete="off"
                    @blur="testExists('companyName')" @keyup.native="replaceFullName('companyName')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('regist.companyDomicile')" prop="companyDomicile" class="reg-input">
          <el-input v-model="ruleForm.companyDomicile" auto-complete="off"
                    @keyup.native="replaceFullName('companyDomicile')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('regist.contactName')" prop="contactName" class="reg-input">
          <el-input v-model="ruleForm.contactName" auto-complete="off"
                    @keyup.native="replaceFullName('contactName')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('regist.corporationMailbox')" prop="email" class="reg-input">
          <el-input v-model="ruleForm.email" auto-complete="off" @blur="testExists('email')"
                    @keyup.native="replaceFullName('email')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('regist.phoneNumber')" prop="phone" class="reg-input">
          <el-input v-model="ruleForm.phone" auto-complete="off" @blur="testExists('phone')"
                    @keyup.native="replaceFullName('phone')"></el-input>
        </el-form-item>
        <el-form-item :label="$t('login.identifying')" maxlength="4" prop="imgCode" class="reg-identifying-input">
          <el-input v-model="ruleForm.imgCode" @keyup.native="replaceFullName('imgCode')"></el-input>
          <img :src="imgUrl" alt="" @click="pictureCode()" class="picture"/>
        </el-form-item>
        <el-form-item :label="$t('regist.invitationCode')" prop="inviteCode" class="reg-input">
          <el-input v-model="ruleForm.inviteCode" auto-complete="off" :placeholder="$t('regist.notRequired')"
                    @keyup.native="replaceFullName('inviteCode')"></el-input>
        </el-form-item>
        <el-checkbox-group v-model="ruleForm.type" @change="handleOpen" class="agree">
          <el-checkbox :label="$t('regist.clause')" name="type"></el-checkbox>
        </el-checkbox-group>
        <br/>
        <el-form-item class="reg-submit-main">
          <el-button type="primary" @click="submitForm('ruleForm')" class="reg-submit">{{$t('regist.signUp')}}
          </el-button>
          <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
        </el-form-item>

      </el-form>
    </div>
    <el-dialog
      title=""
      :visible.sync="centerDialogVisible"
      width="60%"
      :close-on-press-escape="false"
      :show-close="false"
      :close-on-click-modal="false"
      center>
      <registerProtocol v-show="showCn"></registerProtocol>
      <registerProtocolEn v-show="showEn"></registerProtocolEn>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose('0')">{{this.$t('regist.cancel')}}</el-button>
        <el-button :disabled="timeout.timeoutClick" type="primary" @click="handleClose('1')">{{timeout.text}}{{timeout.time > 0 ? timeout.time + 's' :''}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import {
    companyTypeId,
    queryAllArea,
    queryAllCountry,
    checkCompanyName,
    getImgCode4Register,
    register,
    phoneOrEmailValid
  } from '../assets/js/const';
  import {baseUrl} from '../assets/js/env';
  import registerProtocol from './protocol/register.vue';
  import registerProtocolEn from './protocol/registerEn.vue';
  import {validPhone, validEmail} from '../assets/js/utils';

  export default {
    data() {
      return {
        localLang: this.$i18n.locale,
        showCn: false,
        showEn: false,
        selectData: {
          companyTypeId1: {},
          companyTypeId2: {},
          areaId: {},
          countryId: {}
        },
        value: '',
        code: '',
        timeout: {
          text: this.$t('regist.confirm'),
          time: 30,
          timeoutClick: true
        },
        imgUrl: '',
        ruleForm: {
          companyTypeId1: '',
          companyTypeId2: '',
          areaId: null,
          countryId: '',
          provinceI: '',
          companyName: '',
          companyDomicile: '',
          contactName: '',
          phone: '',
          email: '',
          inviteCode: '',
          accept: 0,
          imgCode: '',
          imgCodeId: ''
        },
        rules: {
          companyName: [
            {required: true, message: this.$t('regist.inputCompany'), trigger: 'blur'}
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          companyDomicile: [
            {required: true, message: this.$t('regist.inputCompanyDomicile'), trigger: 'blur'}
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          contactName: [
            {required: true, message: this.$t('regist.inputContactName'), trigger: 'blur'}
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          areaId: [
            {required: true, message: this.$t('regist.pleaseSelectRegion'), trigger: 'blur'}
          ],
          countryId: [
            {required: true, message: this.$t('regist.pleaseSelectCountry'), trigger: 'blur'}
          ],
          // 'PleaseInputEmail': 'Please enter email',
          // 'PleaseInputCorrectEmail': 'Please enter correct email',
          // 'PleaseInputPhone': 'Please enter phone number',
          // 'PleaseInputCorrectPhone': 'Please enter correct phone number'
          email: [
            {
              required: true,
              trigger: 'blur',
              messageEmpty: this.$t('regist.PleaseInputEmail'),
              messageCorrect: this.$t('regist.PleaseInputCorrectEmail'),
              validator: validEmail
            }
          ],
          phone: [
            {
              required: true,
              trigger: 'blur',
              messageEmpty: this.$t('regist.PleaseInputPhone'),
              messageCorrect: this.$t('regist.PleaseInputCorrectPhone'),
              validator: validPhone
            }
          ],
          imgCode: [
            {required: true, min: 4, max: 4, message: this.$t('login.inputYzm'), trigger: 'blur'}
          ]
        },
        centerDialogVisible: false,
        timer: null,
        nextcompanyName: false,
        nextemail: false,
        nextphone: false
      };
    },
    mounted() {
      this.initData();
    },
    created() {
    },

    methods: {
      // 截取空格
      replaceFullName(val) {
        this.ruleForm[val] = this.ruleForm[val].replace(/\s+/g, '');
      },
      submitForm(formName) {
        let that = this;
        that.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.ruleForm.accept === 1) {
              if (!this.nextcompanyName) {
                this.$message({showClose: true, message: that.$t('regist.ExistsCompany'), type: 'error'});
              } else if (!this.nextemail) {
                this.$message({showClose: true, message: that.$t('regist.ExistsEmail'), type: 'error'});
              } else if (!this.nextphone) {
                this.$message({showClose: true, message: that.$t('regist.ExistsPhone'), type: 'error'});
              } else {
                this.POST(register, {'body': this.ruleForm}, function (response) {
                  if (response.code === 300) {
                    that.$alert(response.message, that.$t('regist.signUp'), {
                      confirmButtonText: that.$t('login.login'),
                      callback: action => {
                        if (action === 'confirm') {
                          that.$router.push({name: 'Login'});
                        } else {
                          that.$router.go(0);
                        }
                      }
                    });
                  } else {
                    that.$message({
                      showClose: true,
                      message: response.message,
                      type: 'error'
                    });
                    that.pictureCode();
                  }
                });
              }
            } else {
              this.$message({
                showClose: true,
                message: that.$t('regist.pleaseConsentClause'),
                type: 'error'
              });
            }
          }
        });
      },
      initData() {
        this.pictureCode();
        var that = this;
        // 查询机构类型
        this.POST(companyTypeId, {'body': {'groupId': 'institutionType'}}, function (response) {
          // 默认机构类型选项
          that.ruleForm.companyTypeId1 = response.data[0].code;
          that.selectData.companyTypeId1 = response;
          // 查询机构类型2
          that.getCompanyType();
        });
        // 查询地区
        this.POST(queryAllArea, {}, function (response) {
          that.selectData.areaId = response;
          // 查询国家
          that.getCountryId();
        });
      },
      getCompanyType() {
        var that = this;
        this.POST(companyTypeId, {'body': {'groupId': that.ruleForm.companyTypeId1}}, function (response) {
          that.ruleForm.companyTypeId2 = response.data[0].code;
          that.selectData.companyTypeId2 = response;
        });
      },
      getCountryId(type) {
        var that = this;
        that.POST(queryAllCountry, {'body': {'areaId': that.ruleForm.areaId}}, function (response) {
          if (!response.data.length > 0) {
            that.ruleForm.countryId = '';
            that.selectData.countryId = {};
            return;
          }
          if (type) {
            that.ruleForm.countryId = '';
          }
          that.selectData.countryId = response;
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      testExists(type) {
        var that = this;
        if (type === 'companyName') {
          if (that.ruleForm.companyName && that.ruleForm.companyName !== '') {
            that.nextcompanyName = false;
            that.POST(checkCompanyName, {'body': {'companyName': that.ruleForm.companyName}}, function () {
              that.nextcompanyName = true;
            });
          }
        } else if (type === 'email') {
          if (that.ruleForm.email && that.ruleForm.email !== '') {
            that.nextemail = false;
            that.POST(phoneOrEmailValid, {'body': {'email': that.ruleForm.email}}, function () {
              that.nextemail = true;
            });
          }
        } else if (type === 'phone') {
          if (that.ruleForm.phone && that.ruleForm.phone !== '') {
            that.nextphone = false;
            that.POST(phoneOrEmailValid, {'body': {'phone': that.ruleForm.phone}}, function () {
              that.nextphone = true;
            });
          }
        }
      },
      // 图片验证码部分
      pictureCode() {
        var myDate = new Date().getTime();
        var code = Math.floor(Math.random() * 9000) + 1000;
        this.ruleForm.imgCodeId = myDate + '' + code;
        this.imgUrl = baseUrl + getImgCode4Register + '?imgCodeId=' + this.ruleForm.imgCodeId;
      },
      handleOpen(value) {
        if (this.localLang === 'cn') {
          this.showCn = true;
          this.showEn = false;
        }
        if (this.localLang === 'en') {
          this.showCn = false;
          this.showEn = true;
        }
        if (value) {
          this.centerDialogVisible = true;
          this.ruleForm.type = false;
          this.timeout.timeoutClick = true;
          this.setInterval(true);
        } else {
          this.timeout.timeoutClick = true;
        }
        this.ruleForm.accept = 0;
      },
      setInterval(isClear) {
        let that = this;
        if (isClear) {
          this.timer = setInterval(function () {
            if (that.timeout.time > 0) {
              that.timeout.time--;
            } else {
              that.timeout.timeoutClick = false;
              clearInterval(that.timer);
            }
          }, 1000);
        } else {
          clearInterval(this.timer);
        }
      },
      handleClose(code) {
        let that = this;
        this.setInterval(false);
        if (code === '0') {
          this.centerDialogVisible = false;
        } else {
          this.centerDialogVisible = false;
          this.ruleForm.type = true;
          this.ruleForm.accept = 1;
        }
        setTimeout(function () {
          that.timeout.time = 30;
        }, 500);
      }
    },
    components: {
      registerProtocol,
      registerProtocolEn
    }
  };
</script>
<style lang="less">
  * {
    margin: 0;
    padding: 0
  }

  html, body {
    height: 100%
  }

  .register-main {
    width: 100%;
    height: 900px;
    min-width: 1100px;
    background: url(../assets/register.jpg) no-repeat;
    background-size: 100% 100%;
    position: relative;

  }

  .register-detail {
    width: 490px;
    height: 690px;
    background: #fff;
    padding-bottom: 30px;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: 100px auto;
    z-index: 99;
    border-radius: 15px 15px 15px 15px;
    .el-form-item__content {
      float: left;
      .el-select {
        width: 180px;
      }
    }
    .el-form-item__label {
      width: 100px;
    }
    .reg-input {
      .el-form-item__content {
        width: 340px;
      }
    }
    .reg-identifying-input {
      .el-form-item__content {
        width: 340px;
      }
      .el-input {
        float: left;
        width: 60%;
      }
      .picture {
        float: left;
        display: block;
        width: 30%;
        margin-left: 10%;
        cursor: pointer;
      }
    }
    .agree {
      margin-left: 100px;
    }
    .reg-type {
      margin-top: 30px;

    }
    .reg-submit-main {
      margin-left: 95px;
      .reg-submit {
        width: 300px;
        background: #3967c3;
      }
    }
  }

  .en-register-detail {
    width: 800px;
    .reg-submit-main {
      margin-left: 250px;
    }
    .el-form-item__label {
      width: 260px;
    }
  }


</style>
