<template>

  <div class="body login-main">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <!-- 头部登录部分 -->
      <!--<div class="quc-head">
        <img src="../assets/logo_02.gif" alt="" class="quc-head-img">
        <span class="quc-head-title">NEWNEW数字资产交易平台</span>
      </div>-->
      <div></div>
      <!-- 用户名部分 -->
      <el-form-item :label="$t('login.userName')" prop="userName" class="log-input">
        <el-input v-model="ruleForm.userName" @blur="findUser" @keyup.native="replaceFullName"
                  :placeholder="$t('login.userNamePlaceholder')"></el-input>
      </el-form-item>
      <!-- 密码部分 -->

      <el-form-item :label="$t('login.userPassword')" prop="userPassword" class="log-input">
        <el-tooltip effect="dark" :value="isCapsLock" manual :content="$t('login.capsLockIsOn')" placement="right">
          <el-input type="password" v-model="ruleForm.userPassword" @blur="findUser"
                    :placeholder="$t('login.PwdPlaceholder')" @keypress.native="testCapsLock"></el-input>
        </el-tooltip>
      </el-form-item>
      <!-- 选择登录方式 -->
      <!-- <el-form-item label="方式" prop="region">
        <el-select v-model="ruleForm.region" placeholder="请选择方式">
          <el-option label="手机" value="13377772222"></el-option>
          <el-option label="邮箱" value="12346@163.com"></el-option>
        </el-select>
      </el-form-item> -->
      <!-- 验证码部分 -->
      <el-form-item :label="$t('login.identifying')" prop="identifying" class="identifying-input">
        <el-input maxlength="4" v-model="ruleForm.identifying"></el-input>
        <el-button v-show="show && isSendCode" class="identifying-button" style="background:#3967c3" type="info"
                   @click="getCode">{{$t('login.getIdentifying')}}
        </el-button>
        <el-button v-show="show && !isSendCode" class="identifying-button" type="info" @click="getCode" disabled>
          {{$t('login.getIdentifying')}}
        </el-button>
        <el-button v-show="!show" class="identifying-button" type="info">{{$t('login.reSend')}}{{count}}s</el-button>

      </el-form-item>
      <!--记住账号部分  -->
      <el-checkbox-group v-model="rememberPassword" class="remember">
        <el-checkbox :label="$t('login.remember')" prop="remember" name="type"></el-checkbox>
      </el-checkbox-group>
      <!--登录提交部分  -->
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')" class="quc-submit">{{$t('login.login')}}</el-button>
      </el-form-item>

      <!--底部注册账号忘记密码  -->
      <div class="quc-footer">
        <router-link to="/register"><a href="#" class="quc-link" id="quc-link">{{$t('login.createAnAccount')}}</a>
        </router-link>
        <router-link to="/findpwd"><a href="#" class="quc-link">{{$t('login.forgetPwd')}}</a></router-link>

      </div>
    </el-form>

    <!-- <router-link to="/navmenu"><a href="#" class="quc-link">导航栏</a></router-link>
    <router-link to="/marketslider"><a href="#" class="quc-link">市场侧边栏</a></router-link>
    <router-link to="/header"><a href="#" class="quc-link">头部</a></router-link>
    <router-link to="/saleforfaiting"><a href="#" class="quc-link">录入</a></router-link>
    <router-link to="/buyslider"><a href="#" class="quc-link">买入录入</a></router-link>
    <router-link to="/buyforfaiting"><a href="#" class="quc-link">买入录入</a></router-link> -->
    <!-- <router-link to="/footer"><a href="#" class="quc-link">底部</a></router-link> -->
  </div>
</template>
<script>
  import {findByNameAndPwd, sendCode, Login, isEntryAuth} from '../assets/js/const';
  import Cookies from 'js-cookie';
  import {validEmailPhone} from '../assets/js/utils';

  export default {
    data() {
      return {
        // 发送验证码声名
        show: true,
        count: '',
        timer: null,
        rememberPassword: Cookies.get('rememberUN') === '1' || false,
        ruleForm: {
          userName: Cookies.get('rememberUN') ? Cookies.get('userName') : '',
          userPassword: '',
          identifying: ''
        },

        rules: {
          userName: [
            // { required: true, message: this.$t('login.inputAcc'), trigger: 'blur' },
            {required: true, trigger: 'blur', message: this.$t('login.inputAcc'), validator: validEmailPhone}
          ],
          userPassword: [
            {required: true, message: this.$t('login.inputPwd'), trigger: 'blur'}
            // { min: 8, max: 16, message: '密码长度8-16位（内含数字、大小字母及特殊字符）', trigger: 'blur' }
          ],
          identifying: [
            {required: true, min: 4, max: 4, message: this.$t('login.inputYzm'), trigger: 'blur'}
          ]
        },
        isSendCode: false,
        isCapsLock: false
      };
    },
    methods: {
      // 截取空格
      replaceFullName() {
        this.ruleForm.userName = this.ruleForm.userName.replace(/\s+/g, '');
      },
      testCapsLock(e) {
        let keyCode = e.keyCode || e.which; // 按键的keyCode
        let isShift = e.shiftKey || ((keyCode + '') === '16') || false; // shift键是否按住
        if (
          ((keyCode >= 65 && keyCode <= 90) && !isShift) || ((keyCode >= 97 && keyCode <= 122) && isShift)
        ) {
          this.isCapsLock = true;
        } else {
          this.isCapsLock = false;
        }
      },
      findUser() {
        this.isCapsLock = false;
        if (this.ruleForm.userName && this.ruleForm.userPassword) {
          let that = this;
          let params = {};
          params.body = {};
          params.body.userName = this.ruleForm.userName;
          params.body.userPassword = this.ruleForm.userPassword;
          that.isSendCode = false;
          that.POST(findByNameAndPwd, params, function (response) {
            that.isSendCode = true;
          });
        }
      },
      // 点击登录按钮向后台传送用户输入的值
      submitForm(formName) {
        let that = this;
        if (that.rememberPassword === false) {
          Cookies.remove('rememberUN');
        } else {
          Cookies.set('rememberUN', 1);
        }
        Cookies.set('userName', that.ruleForm.userName);
        that.$refs[formName].validate((valid) => {
          if (valid) {
            let params = {};
            params.userName = that.ruleForm.userName;
            params.userPassword = that.ruleForm.userPassword;
            params.code = that.ruleForm.identifying;
            that.POST(Login, {'body': params}, function (response) {
              if (response.code === 300) {
                that.$emit('changeUserType', {
                  'userType': response.data.userType,
                  'isLogin': response.data.companyId,
                  'companyName': response.data.companyName + ' ' + response.data.realName
                });
                Cookies.set('token', response.data.token);
                Cookies.set('companyName', response.data.companyName + ' ' + response.data.realName);
                Cookies.set('userType', response.data.userType);
                Cookies.set('currentId', response.data.currentId);
                Cookies.set('companyId', response.data.companyId);
                Cookies.set('companyStatus', response.data.status);
                if (response.data.userType === '2') {
                  that.POST(isEntryAuth, {}, function (response) {
                    // localStorage.setItem('EntryAuthForfeiting', response.data.forfeiting);
                    // localStorage.setItem('EntryAuthFactoring', response.data.factoring);
                    let _entry = 0;
                    if (response.data.forfeiting === 1 && response.data.factoring === 1) {
                      _entry = 3;
                    } else if (response.data.forfeiting === 1 && response.data.factoring !== 1) {
                      _entry = 1;
                    } else if (response.data.forfeiting !== 1 && response.data.factoring === 1) {
                      _entry = 2;
                    }
                    that.$emit('emitEntryAuthUrl', {'EntryAuthUrl': _entry});
                    localStorage.setItem('EntryAuthUrl', _entry);
                    if (Number(response.data.updatepwdFlag) === 0 || Number(response.data.threeMonthUpdate) === 0) {
                      that.$router.push({'name': 'Passwordreset'});
                    } else {
                      that.$router.push({'name': 'Index'});
                    }
                  });
                } else {
                  if (Number(response.data.updatepwdFlag) === 0 || Number(response.data.threeMonthUpdate) === 0) {
                    that.$router.push({'name': 'Passwordreset'});
                  } else {
                    that.$router.push({'name': 'Index'});
                  }
                }
              }
            });
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      // 点击发送验证码按钮倒计时
      getCode() {
        // 先验证用户名存量是否存在
        let that = this;
        let params = {};
        params.body = {};
        params.body.userName = this.ruleForm.userName;
        params.body.userPassword = this.ruleForm.userPassword;
        let jsonObject = params;
        that.POST(sendCode, jsonObject, function (response) {
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
          }
        });
      }
    },
    mounted() {
      let userType = Cookies.get('userType') || 0;
      let isLogin = Cookies.get('companyId') || '';
      let companyName = Cookies.get('companyName') || '';
      this.$emit('changeUserType', {'userType': userType, 'isLogin': isLogin, 'companyName': companyName});
    }
  };
</script>
<style lang="less">
  .login-main {
    .demo-ruleForm {
      width: 490px;
      background: #fff;
      position: absolute;
      left: 50%;
      top: 180px;
      margin-left: -220px;
      z-index: 99;
      border-radius: 15px 15px 15px 15px;

    }
    .log-input {
      width: 400px;
      /*margin-top: 30px;*/

    }
    .log-input:nth-of-type(2) {
      margin-top: 30px;
    }
    .identifying-input {
      width: 260px;
      display: inline-block;
    }
    .identifying-button {
      position: absolute;
      left: 180px;
      bottom: 0px;
      width: 121px;
    }
    .el-button + .el-button {
      margin: 0;
    }
    .remember {
      margin: 10px 0 10px 100px;
    }
    .quc-footer {
      margin-top: 10px;
      border-top: 1px solid #a9d5ea;
      padding: 5px 0 17px;
      text-align: center;
    }
    .quc-link {
      font-size: 12px;
    }
    #quc-link {
      color: #999;
      border-right: 1px solid #a9d5ea;
      padding-right: 15px;
    }

    .quc-link:nth-of-type(2) {
      padding-left: 13px;
    }
    .quc-link:hover {
      text-decoration: underline;
    }
    .quc-submit {
      width: 290px;
      background: #3967c3;
    }
    .el-form-item.is-required .el-form-item__label:before {
      content: '';
      color: #f56c6c;
      margin-right: 4px;
    }
  }

  .body {
    width: 100%;
    min-width: 1100px;
    height: 700px;
    background: url(../assets/login.jpg) no-repeat;
    background-size: 100% 100%;
  }
</style>
