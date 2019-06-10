<template>
  <div id="app">
    <app-header :userType="userType" :isLogin="isLogin" :companyName="companyName" :unread="unread"
                :EntryAuthUrl="EntryAuthUrl" :isHeaderLucency="isHeaderLucency"></app-header>
    <router-view class="main" v-on:changeUserType="changeUserType" v-on:emitEntryAuthUrl="emitEntryAuthUrl"
                 v-on:unreadQuery="unreadQuery" :style="{'min-height': mainH + 'px'}"></router-view>
    <app-footer></app-footer>
  </div>
</template>

<script>
  import Cookies from 'js-cookie';
  import AppFooter from './components/common/Footer.vue';
  import AppHeader from './components/common/Header.vue';
  import {msgCountNoRead} from './assets/js/const';

  export default {
    name: 'App',
    data() {
      return {
        userType: 0,
        isLogin: '',
        companyName: '',
        mainH: (window.innerHeight || document.documentElement.clientHeight) - 285 - 78,
        unread: null,
        EntryAuthUrl: 0,
        isHeaderLucency: false
      };
    },
    methods: {
      changeUserType(data) {
        this.userType = data.userType;
        this.isLogin = data.isLogin;
        this.companyName = data.companyName;
      },
      emitEntryAuthUrl(data) {
        console.log(data);
        this.EntryAuthUrl = data.EntryAuthUrl;
      },
      unreadQuery() {
        this.POST(msgCountNoRead, {'body': {'id': this.isLogin}}, (response) => {
          this.unread = response.data;
        });
      }
    },
    mounted() {
      this.userType = Cookies.get('userType') || 0;
      this.isLogin = Cookies.get('companyId') || '';
      this.companyName = Cookies.get('companyName') || '';
      this.EntryAuthUrl = localStorage.getItem('EntryAuthUrl') || '';
      console.log((window.innerHeight || document.documentElement.clientHeight) - 285 - 78);
      (function hasScrollbar() {
        return document.body.scrollHeight > (window.innerHeight || document.documentElement.clientHeight);
      })();
      document.getElementsByTagName('title')[0].innerText = this.$t('title.title');
    },
    watch: {
      '$route'(val) {
        this.isLogin !== '' && this.unreadQuery();
        if (val.name === 'Index' || val.name === 'Customerservice') {
          this.isHeaderLucency = true;
        } else {
          this.isHeaderLucency = false;
        }
      }
    },
    components: {
      AppFooter,
      AppHeader
    }
  };
</script>

<style>
  @import '../static/css/normalize.css';

  /*#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }*/
</style>
