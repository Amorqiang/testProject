// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// import $ from 'jquery';
import {POST, UpLoad} from './assets/js/request';

import VueAwesomeSwiper from 'vue-awesome-swiper';
import Cookies from 'js-cookie';
import i18n from './i18n/i18n';
require('swiper/dist/css/swiper.css');
require('es6-promise').polyfill();

Vue.use(VueAwesomeSwiper);
Vue.use(ElementUI);
// Vue.use(Button)

Vue.config.productionTip = false;

// 将axios配置给原型的$http
Vue.prototype.$http = axios;

/* eslint-disable no-new */
var vm = new Vue({
  el: '#app',
  router,
  i18n,
  data() {
    return {
      loading: null
    };
  },
  components: {App},
  methods: {
    responseHandler: function (response, callback, showToast) {
      if (showToast) {
        this.loading.close();
      }
      let code = response.code;
      code = Number.parseInt(code, 10);
      if (code === 300 || code === 200) {
        callback(response);
        return;
      }
      let msg = response.message || '';
      switch (code) {
        // 举例固定报错code
        case 411:
          if (response.message === '参数验证失败,请登录后操作') {
            (this.$route.path === '/login') ? this.$router.go(0) : this.$router.push({'name': 'Login'});
            Cookies.remove('token');
            Cookies.remove('companyId');
            Cookies.remove('currentId');
            Cookies.remove('userType');
            // response.message = '请登录！'
          } else if (response.message === 'Parameter verification failed, please login operation') {
            (this.$route.path === '/login') ? this.$router.go(0) : this.$router.push({'name': 'Login'});
            Cookies.remove('token');
            Cookies.remove('companyId');
            Cookies.remove('currentId');
            Cookies.remove('userType');
            // response.message = 'Please login!'
          }
          // this.$message({
          //   showClose: true,
          //   message: response.message,
          //   type: 'error'
          // });
          break;
        case 410:
          Cookies.remove('token');
          Cookies.remove('companyId');
          Cookies.remove('currentId');
          Cookies.remove('userType');
          (this.$route.path === '/login') ? this.$router.go(0) : this.$router.push({'name': 'Login'});
          break;
        case 415:
          Cookies.remove('token');
          this.$confirm(this.$t('prompt.loginExpired'), this.$t('TellerManagementPage.tips'), {
            confirmButtonText: this.$t('TellerManagementPage.confirm'),
            cancelButtonText: this.$t('TellerManagementPage.cancel'),
            type: 'warning'
          }).then(() => {
            (this.$route.path === '/login') ? this.$router.go(0) : this.$router.push({'name': 'Login'});
          });
          break;
        case 400:
          this.$message({
            showClose: true,
            message: response.message,
            type: 'error'
          });
          break;
        case 500:
          this.$message({
            showClose: true,
            message: response.message,
            type: 'error'
          });
          break;
        default:
          if (!showToast || typeof showToast === 'string') {
            callback(response);
            return;
          }
          if (msg != null && msg !== undefined && msg !== '') {
            msg = (msg === 'NSURLErrorDomain') ? '获取网络数据失败，请稍后重试' : msg;
          } else {
            msg = '获取网络数据失败，请稍后重试';
          }
          break;
      }
    },
    showLoading() {
      this.loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
    }
  },
  mounted() {
    // console.log('index', responseHandler);
    // this.showLoading()
  },
  template: '<App/>'
});

Vue.prototype.POST = function (url, data, callback, showLoading) {
  if (showLoading) {
    vm.showLoading();
  }
  // if (showLoading === undefined) {
  //   showLoading = true;
  // }
  // if (showLoading) {
  //   Vue.showLoading();
  // }
  POST(url, data, function (response) {
    // callback(response)
    vm.responseHandler(response, callback, showLoading);
  }, vm.$i18n.locale);
};
Vue.prototype.UpLoad = function (url, data, callback, showLoading) {
  if (showLoading) {
    vm.showLoading();
  }
  UpLoad(url, data, function (response) {
    // callback(response)
    // if (showLoading) {
    //   Vue.hideLoading();
    // }
    vm.responseHandler(response, callback, showLoading);
  });
};
