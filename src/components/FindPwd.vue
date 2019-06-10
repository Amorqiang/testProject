<template id="">
  <div class="find-main">
    <el-form v-if="!isNext" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="find-pwd">
      <div class="find-head">
        <span class="find-head-title">{{$t('login.resetPwd')}}</span>
      </div>
      <el-form-item :label="$t('login.userName')" prop="userName" class="find-input">
        <el-input v-model="ruleForm.userName" @blur="TestUser"
                  :placeholder="$t('login.forgetUserNamePlaceholder')"></el-input>
      </el-form-item>
      <el-form-item :label="$t('login.identifying')" prop="code" class="find-identifying-input">
        <el-input v-model="ruleForm.code"></el-input>
        <el-button v-if="!sedCode && show" type="info" disabled class="find-identifying-button">
          {{$t('login.getIdentifying')}}
        </el-button>
        <el-button v-else-if="sedCode && show" type="info" @click="getCode" style="background:#3967c3"
                   class="find-identifying-button">
          {{$t('login.getIdentifying')}}
        </el-button>
        <el-button v-show="!show" type="info" class="find-identifying-button">{{$t('login.reSend')}}{{count}}s
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" class="find-submit">{{$t('login.next')}}</el-button>
      </el-form-item>
    </el-form>
    <el-form v-else :model="ruleForm2" ref="ruleForm2" :label-width="findPwaNextWidth" class="findpwdnext"
             :class="{'en-findpwdnext': this.$i18n.locale === 'en'}">
      <div class="findpwdnext-head">
        <span class="findpwdnext-head-title">{{$t('login.confirmPwd')}}</span>
      </div>
      <el-form-item :label="$t('login.newUserPassword')" class="findpwdnext-input">
        <el-input :type="!checked ? 'password': 'text'" v-model="ruleForm2.newPwd" auto-complete="off"></el-input>
      </el-form-item>
      <el-alert
        style="
      padding: 10px 0px 10px 16px;
      margin: 0 30px;"
        :title="$t('Passwordreset.rule')"
        type="warning"
        :closable="false"
        show-icon>
      </el-alert>
      <el-form-item :label="$t('login.confirmPwd')" class="findpwdnext-input">
        <el-input :type="!checked ? 'password': 'text'" v-model="ruleForm2.confirmPwd" auto-complete="off"></el-input>
      </el-form-item>

      <div style="margin-left: 64px;">
        <el-checkbox v-model="checked">{{$t('Passwordreset.showPassword')}}</el-checkbox>
      </div>
      <el-form-item>
        <el-button type="primary" @click="submitForm2('ruleForm2')" class="findpwdnext-submit">{{$t('login.submit')}}
        </el-button>
        <!-- <el-button @click="resetForm('ruleForm2')">重置</el-button> -->
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import {validEmail} from '../assets/js/utils';
  import {backPwd, validBackPwdCode, updatePwd} from '../assets/js/const';

  export default {
    data() {
      return {
        checked: false,
        // 发送验证码声名
        findPwaNextWidth: this.$i18n.locale === 'en' ? '200px' : '100px',
        sedCode: false,
        show: true,
        count: '',
        isNext: false,
        timer: null,
        ruleForm: {
          userName: '',
          code: ''
        },
        ruleForm2: {
          newPwd: '',
          confirmPwd: '',
          userName: ''
        },
        rules: {
          userName: [
            {
              required: true,
              trigger: 'blur',
              messageEmpty: this.$t('regist.PleaseInputEmail'),
              messageCorrect: this.$t('regist.PleaseInputCorrectEmail'),
              validator: validEmail
            }
            // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          code: [
            {required: true, min: 4, max: 4, message: this.$t('login.inputYzm'), trigger: 'blur'}
          ]
        }
      };
    },
    methods: {
      TestUser() {
        if (this.ruleForm.userName === '') {
          this.sedCode = false;
        } else {
          this.sedCode = true;
        }
      },
      submitForm(formName) {
        let that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(valid);
            this.POST(validBackPwdCode, {'body': that.ruleForm}, function (response) {
              if (response.code === 300) {
                that.isNext = true;
              }
            });
          }
        });
      },
      submitForm2() {
        let that = this;
        let _newPwd = this.ruleForm2.newPwd;
        let _confirmPwd = this.ruleForm2.confirmPwd;
        that.ruleForm2.userName = that.ruleForm.userName;
        if (_newPwd === '') {
          this.$message.error(that.$t('Passwordreset.pleaseEnteraNewPassword'));
        } else if (_confirmPwd === '') {
          this.$message.error(that.$t('Passwordreset.pleaseConfirmTheNewPasswordAgain'));
        } else {
          if (_newPwd === _confirmPwd) {
            let reg = /^(?![^A-Z]+$)(?![^a-z]+$)(?!\D+$)[0-9A-Za-z]{8,16}$/;
            let that = this;
            if (reg.test(_confirmPwd)) {
              that.POST(updatePwd, {'body': that.ruleForm2}, function (response) {
                if (response.code === 300) {
                  that.$alert(that.$t('Passwordreset.nextLogin'), '', {
                    confirmButtonText: that.$t('Passwordreset.determine'),
                    callback: () => {
                      that.$router.push({'name': 'Login'});
                    }
                  });
                } else {
                  that.$message({
                    showClose: true,
                    message: response.message,
                    type: 'error'
                  });
                }
              });
            } else {
              that.$message.error(that.$t('Passwordreset.rule'));
            }
          } else {
            this.$message.error(that.$t('Passwordreset.pleaseConfirmTheNewPasswordAgain'));
          }
        }
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      getCode() {
        function isvalidEmail(str) {
          const reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
          return reg.test(str);
        }
        if (isvalidEmail(this.ruleForm.userName)) {
          let that = this;
          this.POST(backPwd, {'body': {'userName': that.ruleForm.userName}}, function () {
            let TIME_COUNT = 180;
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
          });
        }
      }
    }
  };
</script>
<style lang="less">
  .find-main {
    width: 100%;
    height: 100vh;
    background: url(../assets/login.jpg) no-repeat;
    background-size: 100% 100%;
  }

  .find-pwd {
    height: 300px;
    width: 490px;
    background: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -245px;
    margin-top: -184px;
    z-index: 99;
    border-radius: 10px;
  }

  .find-head {
    border-bottom: 1px solid #f7f7f7;
    height: 50px;
    line-height: 50px;
    background: #fff;
    text-align: center;
    border-radius: 10px;
  }

  .find-head-title {
    display: inline-block;
    font-size: 16px;
    color: gray;

  }

  .find-input {
    width: 400px;
    margin-top: 30px;

  }

  .find-identifying-input {
    width: 260px;
    display: inline-block;
  }

  .find-identifying-button {
    position: absolute;
    left: 180px;
    bottom: 0px;
  }

  .find-submit {
    width: 290px;
  }

  .el-form-item.is-required .el-form-item__label:before {
    content: '';
    color: #f56c6c;
    margin-right: 4px;
  }

  .findpwdnext-main {
    width: 100%;
    height: 100vh;
    background: url(../assets/bg.png) no-repeat;
    background-size: 100% 100%;
  }

  .findpwdnext {
    height: 385px;
    width: 490px;
    background: #fff;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -245px;
    margin-top: -184px;
    z-index: 99;
    border-radius: 10px;
    .el-alert {
      width: 370px;
    }
  }

  .en-findpwdnext {
    width: 590px;
    .el-alert {
      width: 470px;
    }
  }

  .findpwdnext-head {
    border-bottom: 1px solid #f7f7f7;
    height: 50px;
    line-height: 50px;
    background: #fff;
    text-align: center;
    border-radius: 10px;

  }

  .findpwdnext-head-title {
    display: inline-block;
    font-size: 16px;
    color: gray;

  }

  .findpwdnext-input {
    width: 85%;
    margin-top: 30px;

  }

  .findpwdnext-submit {
    margin-top: 10px;
    width: 290px;
  }
</style>
