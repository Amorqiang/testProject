<template id="">
  <div class="">
    <div class="passwordreset clearfix">
      <div class="passwordreset-center">
        <h1>{{$t('Passwordreset.resetPassword')}}</h1>
        <ul>
          <li class="clearfix">
            <p><span>{{$t('Passwordreset.theOriginalPassword')}}</span></p>
            <div>
              <el-input :type="!checked ? 'password': 'text'" v-model="requestData.oldPwd"
                        :placeholder="$t('Passwordreset.pleaseEnterTheOriginalPassword')"></el-input>
            </div>
          </li>
          <li class="clearfix">
            <p><span>{{$t('Passwordreset.theNewPassword')}}</span></p>
            <div>
              <el-input :type="!checked ? 'password': 'text'" v-model="requestData.newPwd" @blur="isvalidPwd"
                        :placeholder="$t('Passwordreset.pleaseEnteraNewPassword')"></el-input>
            </div>
            <el-alert
              style="padding: 10px 0 10px 16px;width:auto;margin-left:10px;"
              :title="$t('Passwordreset.rule')"
              type="warning"
              :closable="false"
              show-icon>
            </el-alert>
          </li>
          <li class="clearfix">
            <p><span>{{$t('Passwordreset.confirmPassword')}}</span></p>
            <div style="">
              <el-input :type="!checked ? 'password': 'text'" v-model="requestData.confirmPwd" @blur="isvalidPwd"
                        :placeholder="$t('Passwordreset.pleaseConfirmTheNewPasswordAgain')"></el-input>
            </div>
          </li>
        </ul>
        <div class="passwordreset-showpwd">
          <el-checkbox v-model="checked">{{$t('Passwordreset.showPassword')}}</el-checkbox>
        </div>
        <div class="passwordreset-submit-div">
          <el-button :disabled="!isButton" type="primary" @click="confirmChange()" name="" class="passwordreset-submit">
            {{$t('Passwordreset.save')}}
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  // import {GetUrlParam} from '../../assets/js/utils';
  import Cookies from 'js-cookie';
  import {updatePwdById} from '../../assets/js/const';

  export default {
    data() {
      return {
        requestData: {
          oldPwd: '',
          newPwd: '',
          confirmPwd: '',
          userName: Cookies.get('userName')
        },
        checked: false,
        inputType: (this.checked) ? 'text' : 'password',
        isButton: false
      };
    },
    components: {},
    methods: {
      isvalidPwd() {
        let _oldPwd = this.requestData.oldPwd;
        let _newPwd = this.requestData.newPwd;
        let _confirmPwd = this.requestData.confirmPwd;
        if (_oldPwd !== '' && _newPwd !== '' && _confirmPwd !== '') {
          if (_newPwd !== _confirmPwd) {
            this.$message.error(this.$t('Passwordreset.pleaseConfirmTheNewPasswordAgain'));
            this.isButton = false;
          } else {
            this.isButton = true;
          }
        } else {
          this.isButton = false;
        }
      },
      confirmChange() {
        let reg = /^(?![^A-Z]+$)(?![^a-z]+$)(?!\D+$)[0-9A-Za-z]{8,16}$/;
        let that = this;
        if (reg.test(this.requestData.confirmPwd)) {
          that.POST(updatePwdById, {'body': that.requestData}, function (response) {
            if (response.code === 300) {
              that.$alert(that.$t('Passwordreset.nextLogin'), '', {
                confirmButtonText: that.$t('Passwordreset.determine'),
                callback: (action) => {
                  console.log(action === 'confirm');
                  if ((action === 'confirm')) {
                    that.$router.push({'name': 'Index'});
                  } else {
                    that.requestData = {
                      oldPwd: '',
                      newPwd: '',
                      confirmPwd: '',
                      userName: Cookies.get('userName')
                    };
                  }
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
      }
    },
    mounted() {
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

  .passwordreset {
    width: 1100px;
    margin: 0 auto;

    .passwordreset-center {
      width: 1100px;
      float: left;
    }

    .passwordreset-center ul li {
      margin: 50px 50px 0 0;
    }

    .passwordreset-center ul li p {
      float: left;
      line-height: 40px;
      margin: 0 40px 0 0;
      width: 190px;
      text-align: right;
    }

    .passwordreset-center ul li > div {
      float: left;
      width: 300px;
    }

    .passwordreset-submit-div {
      width: 100%;
      text-align: center;
      margin: 10% 50px 10%;
    }

    .passwordreset-submit {
      width: 350px;
      height: 40px;
      background: #3967c3;
      color: white;
      border: none;
      outline: none;
      border-radius: 5px;
    }

    .passwordreset-showpwd {
      margin: 20px 0 0 300px;
    }

  }
</style>
