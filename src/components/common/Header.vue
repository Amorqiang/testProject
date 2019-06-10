<template id="">
  <div class="header-i18n">
    <div class="i18n">
      <div class="i18n-main">
        <el-select v-model="lang" @change="changeLanguage" popper-class="i18n-main-select">
          <el-option
            :key="'cn'"
            :label="'简体中文'"
            :value="'cn'">
          </el-option>
          <el-option
            :key="'en'"
            :label="'English'"
            :value="'en'">
          </el-option>
        </el-select>
      </div>
    </div>
    <!--<div class="header">-->
    <div class="header" :class="{'header-lucency': isHeaderLucency}">
      <div class="header-main clearfix">
        <div class="logo">
          <router-link to="/index"><img
            :src="require('../../assets/img/' + (this.$i18n.locale === 'en' ? '7-13-logo-en.png' : '7-13-logo.png'))" alt="">
          </router-link>
        </div>
        <div class="header-nav">
          <el-menu ref="headerNav" :collapse="false" :unique-opened="true" @select="selectMenu"
                   :default-active="$route.path" class="el-menu-newnew" menu-trigger="hover" mode="horizontal"
                   background-color="#fcfcfc"
                   text-color="#060606" active-text-color="#4162b1">
            <el-menu-item style="padding: 0 60px" index="/index" class="nav-item">{{$t('header.home')}}</el-menu-item>
            <el-submenu :popper-append-to-body="true" index="/buyforfeiting" popper-class="header-submenu">
              <template slot="title">{{$t('header.market')}}</template>
              <el-menu-item index="/buyforfeiting" style="height:45px;line-height:45px;">
                <span slot="title">{{$t('header.quotation')}}</span>
              </el-menu-item>
              <el-menu-item index="/saleforfaiting" v-show="userType == '2' && EntryAuthUrl == 3"
                            style="height:45px;line-height:45px;">
                <span slot="title">{{$t('header.enteringSell')}}</span>
              </el-menu-item>
              <el-menu-item index="/saleforfaiting?iea=1"
                            v-show="userType == '2' && EntryAuthUrl == 1" style="height:45px;line-height:45px;">
                <span slot="title">{{$t('header.enteringSell')}}</span>
              </el-menu-item>
              <el-menu-item index="/salefactoring?iea=1"
                            v-show="userType == '2' && EntryAuthUrl == 2" style="height:45px;line-height:45px;">
                <span slot="title">{{$t('header.enteringSell')}}</span>
              </el-menu-item>
              <el-menu-item index="/hobbyforfeiting" v-show="userType == '2'" style="height:45px;line-height:45px;">
                <span slot="title">{{$t('header.preference')}}</span>
              </el-menu-item>
            </el-submenu>
            <el-submenu :popper-append-to-body="true" index="/company" popper-class="header-submenu">
              <template slot="title">{{$t('header.member')}}</template>
              <el-menu-item index="/myCompany" v-show="userType == '1'" style="height:45px;line-height:45px;">
                <span slot="title">{{$t('header.Information')}}</span>
              </el-menu-item>
              <el-menu-item index="/myassets" style="height:45px;line-height:45px;">
                <span slot="title">{{$t('header.myAsset')}}</span>
              </el-menu-item>
              <!--<el-menu-item index="/admin" v-show="userType == '1'"  style="height:45px;line-height:45px;">-->
              <!--<i class="el-icon-menu"></i>-->
              <!--<span slot="title">{{$t('header.myQuotation')}}</span>-->
              <!--</el-menu-item>-->
              <el-menu-item index="/offerbankrunforfeiting" v-show="userType == '2' || userType == '1'"
                            style="height:45px;line-height:45px;">
                <span slot="title">{{$t('header.myQuotation')}}</span>
              </el-menu-item>
              <el-menu-item index="/offerbankreviewforfeiting" v-show="userType == '3'"
                            style="height:45px;line-height:45px;">
                <span slot="title">{{$t('header.myQuotation')}}</span>
              </el-menu-item>
              <el-menu-item index="/myhobbyforfeiting" style="height:45px;line-height:45px;">
                <span slot="title">{{$t('header.myPreference')}}</span>
              </el-menu-item>
              <el-menu-item index="/myscore" style="height:45px;line-height:45px;">
                <span slot="title">{{$t('header.myCredit')}}</span>
              </el-menu-item>
              <el-menu-item index="/tellermanage" v-show="userType == '1'" style="height:45px;line-height:45px;">
                <span slot="title">{{$t('header.teller')}}</span>
              </el-menu-item>
              <el-menu-item index="/mynews" style="height:45px;line-height:45px;">
                <span slot="title">{{$t('header.myMessage')}}</span>
              </el-menu-item>
              <el-menu-item v-if="isLogin" index="/passwordreset" style="height:45px;line-height:45px;">
                <span slot="title">{{$t('header.resetPassword')}}</span>
              </el-menu-item>
            </el-submenu>
            <!--<el-menu-item index="/aboutplatform" class="nav-item">{{$t('header.aboutUs')}}</el-menu-item>-->
            <el-submenu :popper-append-to-body="true" index="/aboutplatform" popper-class="header-submenu">
              <template slot="title">{{$t('header.aboutUs')}}</template>
              <el-menu-item index="/aboutplatform" style="height:45px;line-height:45px;">
                <span slot="title">{{$t('about.introduction')}}</span>
              </el-menu-item>
              <el-menu-item index="/news" style="height:45px;line-height:45px;">
                <span slot="title">{{$t('about.information')}}</span>
              </el-menu-item>
              <el-menu-item index="/customerservice" style="height:45px;line-height:45px;">
                <span slot="title">{{$t('about.customerService')}}</span>
              </el-menu-item>
            </el-submenu>
          </el-menu>
          <div class="loginOrReg" v-if="!isLogin">
            <router-link to="/login">{{$t('header.login')}}</router-link> &nbsp;|&nbsp;
            <router-link to="/register">{{$t('header.regist')}}</router-link>
          </div>
          <div class="loginOrReg" v-if="isLogin">
            <router-link style="float: left; margin-top: 4px; line-height: 73px;" to="/mynews"><i
              style="width: 45px;font-size: 20px;" class="el-icon-message"><p class="header-unread" v-if="unread > 0"
                                                                              :style="{'right': unread > 99? '13px': '15px'}"
                                                                              v-html="unread > 99 ? unread: unread"></p>
            </i>
            </router-link>
            <el-tooltip :content="companyName" placement="bottom">
              <!-- <el-button>{{isLogin}}</el-button> -->
              <span style="cursor: pointer">{{isLogin}}</span>
            </el-tooltip>&nbsp;&nbsp;|&nbsp;&nbsp;
            <a href="javascript:;" @click="exit">{{$t('header.logout')}}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import Cookies from 'js-cookie';
  import {logout, msgCountNoRead} from '../../assets/js/const';

  export default {
    props: ['userType', 'isLogin', 'companyName', 'unread', 'EntryAuthUrl', 'isHeaderLucency'],
    data() {
      return {
        lang: ''
      };
    },
    methods: {
      selectMenu(key, keyPath) {
        console.log(key, keyPath);
        if (key === '/index' || key === '/buyforfeiting' || key === '/buyfactoring' || key === '/aboutplatform' || key === '/news' || key === '/customerservice' || key === '/newsdetail') {
          this.$router.push({'path': key});
          return false;
        }
        this.POST(msgCountNoRead, {'body': {'id': '000'}}, (response) => {
          this.$router.push({'path': key});
        });
      },
      exit() {
        let that = this;
        this.POST(logout, {}, function () {
          Cookies.remove('token');
          Cookies.remove('companyId');
          Cookies.remove('currentId');
          Cookies.remove('userType');
          that.$router.push({'name': 'Login'});
        });
      },
      changeLanguage(langue) {
        this.$router.go(0);
        localStorage.setItem('lang', langue);
      }
    },
    mounted() {
      let _langue = localStorage.getItem('lang');
      this.$i18n.locale = _langue || 'cn';
      this.lang = _langue || 'cn';
    }
  };
</script>
<style media="screen" lang="less">
  .i18n {
    width: 100%;
    height: 30px;
    text-align: right;
    font-size: 12px;
    color: #000;
    background: #ececec;
    .i18n-main {
      width: 1100px;
      margin: 0 auto;
      .el-input {
        width: 70px;
      }
      .el-input__suffix {
        right: 0;
      }
      .el-input__inner {
        border: none;
        height: 30px;
        line-height: 30px;
        background: #ececec;
        font-size: 12px;
        padding: 0;
      }
      .el-input__icon {
        line-height: 30px;
        color: #000000;
        width: 14px;
      }
    }
    a {
      color: #000;
      &.i18nActive {
        text-decoration: underline;
        color: dodgerblue;
      }
    }
  }

  .header-submenu.el-menu--horizontal {
    margin-top: -4px;
    .el-menu .el-menu-item{
      height: 78px;
      line-height: 78px;
      font-size: 16px;
      padding: 0 20px 0 0;
      span {
        display: block;
        text-align: left;
        text-indent: 30px;
      }
    }
    .el-menu--collapse .el-menu .el-submenu, .el-menu--popup {
      min-width: 120px;
      box-shadow: none;
    }
  }
  .header {
    width: 100%;
    min-width: 1100px;
    background: #fcfcfc;
    font-size: 16px;
    line-height: 30px;
    .el-submenu.is-active,.el-menu-item.is-active{
      font-weight: bold;
      .el-submenu__icon-arrow {
        color: rgb(65, 98, 177);
      }
    }
    &.header-lucency {
      position: absolute;
      top: 30px;
      left: 0;
      z-index: 10;
      background-color: rgba(255, 255, 255, .6);
    }
    .header-main {
      width: 1100px;
      margin: 0 auto;
      .logo {
        float: left;
        img {
          display: block;
          margin: 17px 0 0 0;
        }
      }
      .header-nav {
        float: right;
        .el-menu--horizontal {
          float: left;
          border: none;
          .el-menu-item, .el-submenu__title {
            height: 78px;
            line-height: 78px;
            font-size: 16px;
            padding: 0 30px;
          }
        }
        .loginOrReg {
          float: left;
          color: #000000;
          line-height: 78px;
          a {
            color: #000000;
          }
          margin-left: 40px;
          font-size: 16px;
        }
      }
    }
    .el-icon-message {
      position: relative;
      .header-unread {
        font-family: '黑体' !important;
        min-width: 12px;
        padding: 0 2px;
        height: 16px;
        font-size: 12px;
        line-height: 16px;
        text-align: center;
        background: #f40;
        color: #fff;
        -webkit-border-radius: 20px;
        -moz-border-radius: 20px;
        border-radius: 20px;
        position: absolute;
        right: 15px;
        top: -6px;
      }
    }
    .el-menu-newnew,.el-menu-item,.el-submenu__title {
      background: none !important;
      border: none!important;
    }
  }

</style>
