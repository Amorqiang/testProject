<template>
  <div class="index">
    <div class="main">
      <div class="banner">
        <!--<swiper :options="swiperOption" v-if="bannerList.length > 0 && bannerList.length !== 1">-->
        <!--<template v-for="(item, index) in bannerList">-->
        <!--<swiper-slide v-if="item.url" :key="index">-->
        <!--<a :href="item.link || 'javascript:;'" target="_blank">-->
        <!--<p-->
        <!--:style="{'background': 'url(' + item.url + ') no-repeat center top', 'background-size': 'auto 100%'}">-->
        <!--</p>-->
        <!--</a>-->
        <!--</swiper-slide>-->
        <!--</template>-->
        <!--<div class="swiper-pagination" slot="pagination"></div>-->
        <!--</swiper>-->
        <!--<div class="replace-swiper" v-else-if="bannerList.length > 0 && bannerList.length === 1">-->
        <!--<a :href="bannerList[0].link || 'javascript:;'" target="_blank">-->
        <!--<p-->
        <!--:style="{'background': 'url(' + bannerList[0].url + ') no-repeat center top', 'background-size': 'auto 100%'}">-->
        <!--</p>-->
        <!--</a>-->
        <!--</div>-->
        <div class="banner-static">
          <a href="javascript:;" target="_blank">
            <!--<p style="background: url(/static/img/Chinese-version-banner.jpg) no-repeat center top;background-size: auto 100%" class="banner-swiper">-->
            <!--</p>-->
            <p
              :style="{'background': 'url(' + '/static/img/' + (this.$i18n.locale == 'en' ? 'English-version-banner':'Chinese-version-banner') +'.jpg' + ') no-repeat center top', 'background-size': '100% 100%'}"
              class="banner-swiper">
            </p>
          </a>
        </div>
        <div class="jc"></div>
        <div class="information">
          <div class="info-bor">
            <el-row>
              <template v-for="(item, index) in infoBor">
                <el-col :span="8"><p>{{item.name}} {{$t('header.index')}} <span
                  :style="{'color': index === 1 && '#006dff' || index === 0 && '#ab07bf' || index === 2 && '#e18a00'}">{{item.value}}</span>
                </p></el-col>
              </template>
            </el-row>
          </div>
        </div>
      </div>
      <div class="Products">
        <div class="Products-main" :class="{'Products-text-en': this.$i18n.locale == 'en'}">
          <h2>{{$t('header.Products')}}</h2>
          <div class="Products-Forfeiting">
            <div class="Products-text">
              <h3>{{$t('header.Forfeiting')}}</h3>
              <p>{{$t('header.ForfeitingInfo')}}</p>
            </div>
            <div class="Products-img">
              <img src="../assets/img/Products-Forfeiting.jpg" alt="">
            </div>
          </div>
          <div class="Products-Factoring">
            <div class="Products-img">
              <img src="../assets/img/Products-Factoring.jpg" alt="">
            </div>
            <div class="Products-text">
              <h3>{{$t('header.Factoring')}}</h3>
              <p>{{$t('header.FactoringInfo')}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="Professional">
        <div class="Professional-main">
          <h2>{{$t('header.Professional')}}</h2>
          <div class="Professional-list">
            <el-row :gutter="this.$i18n.locale == 'en'? 10: 168">
              <el-col :span="8">
                <img src="../assets/img/icon-1.png" alt="">
                <h4>{{$t('header.Professional1')}}</h4>
                <p v-if="this.$i18n.locale == 'cn'">{{$t('header.Professional1Cont')}}</p>
                <p v-else>
                  <span>The AssetX offers global services</span>
                  <span>for 7/24 in multi-currencies.</span>
                  <span>It facilitates the registration and</span>
                  <span>release of the financial assets of multiple</span>
                  <span>categories and currencies, including</span>
                  <span>forfeiting and factoring assets.</span>
                </p>
              </el-col>
              <el-col :span="8">
                <img src="../assets/img/icon-2.png" alt="">
                <h4>{{$t('header.Professional2')}}</h4>
                <p v-if="this.$i18n.locale == 'cn'">{{$t('header.Professional2Cont')}}</p>
                <p v-else>
                  <span>It provides multi-channel asset inquiries</span>
                  <span>and enables asset transactions to be inquired,</span>
                  <span>traceable, and transparent through blockchain</span>
                  <span>technology. Matching messages can be quickly</span>
                  <span>released to efficiently share information for</span>
                  <span>time- and cost-saving.</span>
                </p>
              </el-col>
              <el-col :span="8">
                <img src="../assets/img/icon-3.png" alt="">
                <h4>{{$t('header.Professional3')}}</h4>
                <p v-if="this.$i18n.locale == 'cn'">{{$t('header.Professional3Cont')}}</p>
                <p v-else>
                  <span>Meet the needs of users in terms of digital</span>
                  <span>transaction and transfer of forfeiting and</span>
                  <span>factoring assets, in order to facilitate the</span>
                  <span>management of the whole life cycle of the assets.</span>
                  <span>To maximize the simplicity of customer's</span>
                  <span>operation and to speed up the transaction</span>
                  <span>process in the secondary market.</span>
                </p>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>
      <div class="Branding">
        <div class="Branding-main">
          <h2>{{$t('header.Branding')}}</h2>
          <div class="hint">
            <div class="hint-main">
              <el-row :gutter="47">
                <el-col :span="6">
                  <div class="el-col-main">
                    <img src="../assets/img/icon-4.png" alt="">
                    <p>{{$t('body.security')}}</p>
                    <span>{{$t('body.blockScr')}}</span>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="el-col-main">
                    <img src="../assets/img/icon-5.png" alt="">
                    <p>{{$t('body.efficiency')}}</p>
                    <span>{{$t('body.fast')}}</span>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="el-col-main">
                    <img src="../assets/img/icon-6.png" alt="">
                    <p>{{$t('body.transparency')}}</p>
                    <span>{{$t('body.tradeOpen')}}</span>
                  </div>
                </el-col>
                <el-col :span="6">
                  <div class="el-col-main">
                    <img src="../assets/img/icon-7.png" alt="">
                    <p>{{$t('body.pm')}}</p>
                    <span>{{$t('body.pService')}}</span>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    dictionarygetNumberList,
    mine,
    getBanner
  } from '../assets/js/const';
  import {toFixed} from '../assets/js/utils';
  import Cookies from 'js-cookie';

  export default {
    data() {
      return {
        bannerList: [],
        swiperOption: {
          autoplay: {
            delay: 3000,
            disableOnInteraction: false
          },
          simulateTouch: false,
          loop: true
          // pagination: {
          //   el: '.swiper-pagination',
          //   clickable: true,
          //   bulletClass: 'my-bullet',
          //   bulletActiveClass: 'my-bullet-active'
          // }
        },
        // infoTrade: {},
        infoBor: [],
        MarketAssets: [],
        MarketFactoring: [],
        dialogVisible: false
      };
    },
    components: {},
    filters: {
      openFullNamesubstring: function (value) {
        if (value.length > 4) {
          return value.substring(0, 4) + '...';
        } else {
          return value;
        }
      },
      NumFormat: function (value) {
        if (!value) return '0.00';
        var intPart = Number(value).toFixed(0); // 获取整数部分
        var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); // 将整数部分逢三一断
        return intPartFormat;
      }
    },
    methods: {
      Company() {
        this.dialogVisible = false;
        this.$router.push({name: 'Company'});
      },
      toDetails(id, type, isMine) {
        let that = this;
        this.POST(mine, {}, function () {
          let _url = '';
          if (type === '1') {
            if (isMine === '1') {
              _url = 'sellerdetailforfeiting';
            } else if (isMine === '0') {
              _url = 'Detailforfeiting';
            }
          } else {
            if (isMine === '1') {
              _url = 'sellerdetailfactoring';
            } else if (isMine === '0') {
              _url = 'detailfactoring';
            }
          }
          that.$router.push({
            'name': _url,
            'params': {
              'id': id
            }
          });
        });
      },
      initData() {
        toFixed();
        let that = this;
        this.POST(getBanner, {}, function (response) {
          that.bannerList = response.data;
        });
        // this.POST(getNumberList, {}, function (response) {
        //   that.infoTrade = response.data;
        // });
        this.POST(dictionarygetNumberList, {}, function (response) {
          that.infoBor = response.data;
        });
        if (Cookies.get('userType') === '1' && Cookies.get('companyStatus') !== '111') {
          this.dialogVisible = true;
        }
        if (/(iPhone)/i.test(navigator.userAgent)) {
          alert('因您使用的是IOS系统，影响页面完整和美观，请您使用安卓移动端或pc端进入平台首页');
        }
      }
    },
    mounted() {
      this.initData();
    }
  };
</script>
<style lang="less">
  .swiper-pagination {
    width: auto !important;
    left: 50% !important;
    transform: translate(-50%, -50%);
    height: 14px;
    .my-bullet {
      outline: none;
      display: block;
      float: left;
      margin: 0 8px;
      width: 14px;
      height: 14px;
      background: #fff;
      -webkit-border-radius: 14px;
      -moz-border-radius: 14px;
      border-radius: 14px;
      cursor: pointer;
    }
    .my-bullet-active {
      background: #666;
    }
  }

  body {
    margin: 0 auto;
  }

  .text_overflow {
    width: 320px;
    white-space: nowrap;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    overflow: hidden;
  }

  .index {
    .main {
      width: 100%;
      min-width: 1100px;
      background: #f5f5f5;
      .banner {
        width: 100%;
        position: relative;
        .swiper-slide {
        }
        p.banner-swiper {
          width: 100%;
          height: 0;
          padding-top: 50%;
          margin: 0;
        }
        .banner-static {
          position: relative;
        }
      }
      .information {
        width: 100%;
        height: 90px;
        position: absolute;
        background: rgba(255, 255, 255, .6);
        z-index: 10;
        bottom: 0;
        left: 0;
        .info-bor {
          width: 1100px;
          margin: 0 auto;
          height: 90px;
          border-bottom: 1px solid #f3f3f3;
          p {
            font-size: 14px;
            color: #000000;
            height: 90px;
            line-height: 90px;
            text-align: center;
            margin: 0;
            span {
              font-size: 18px;
              color: #e18a00;
            }
          }
        }
      }
      .Products {
        width: 100%;
        background: #ffffff;
        .Products-main {
          width: 1100px;
          margin: 0 auto;
          height: 874px;
          h2 {
            font-size: 30px;
            line-height: 150px;
            color: #0b0205;
            font-weight: normal;
            margin: 0;
            text-align: center;
            font-weight: normal;
          }
          .Products-Forfeiting, .Products-Factoring {
            width: 939px;
            height: 311px;
            background: #062e62;
          }
          .Products-text {
            width: 311px;
            height: 311px;
            float: left;
            h3 {
              font-size: 24px;
              line-height: 24px;
              color: #ffffff;
              margin: 55px 0 14px 40px;
              font-weight: normal;
            }
            p {
              width: 230px;
              margin-left: 40px;
              padding-left: 20px;
              font-size: 14px;
              color: #fff;
              line-height: 30px;
              background: url("../assets/img/Products-arrows.png") no-repeat left 8px;
            }
          }
          .Products-img {
            width: 628px;
            height: 311px;
            float: left;
            img {
              display: block;
              width: 100%;
            }
          }
          .Products-Factoring {
            background: #c58735;
            margin-left: 161px;
            .Products-text h3 {
              margin: 83px 0 14px 40px;
            }
          }
          &.Products-text-en {
            .Products-text {
              h3 {
                margin: 25px 0 14px 40px;
              }
              p {
                line-height: 24px;
              }
            }
          }
        }
      }
      .Professional {
        width: 100%;
        height: 608px;
        background: #ffffff url("../assets/img/Professional.jpg") no-repeat center top;
        background-size: cover;
        .Professional-main {
          width: 1100px;
          margin: 0 auto;
          overflow: hidden;
          h2 {
            font-size: 30px;
            line-height: 170px;
            color: #0b0205;
            margin: 0;
            text-align: center;
            font-weight: normal;
          }
          .Professional-list {
            width: 100%;
            height: 390px;
            margin-top: 40px;
            img {
              display: block;
              margin: 0 auto 16px;
            }
            h4 {
              font-size: 24px;
              line-height: 46px;
              text-align: center;
              margin: 0;
              font-weight: normal;
            }
            p {
              font-size: 14px;
              line-height: 30px;
              color: #525151;
              text-align: center;
            }
            span {
              display: block;
              color: #525151;
              text-align: center;
            }
          }
        }
      }
      .Branding {
        width: 100%;
        height: 478px;
        background: #fff;
        .Branding-main {
          width: 1100px;
          margin: 0 auto;
          h2 {
            font-size: 30px;
            line-height: 190px;
            color: #0b0205;
            margin: 0;
            text-align: center;
            font-weight: normal;
          }
          .hint {
            width: 1100px;
            margin: 0 auto;
            height: 288px;
            background: #fff;
            overflow: hidden;
            .el-col-main {
              width: 100%;
              height: 288px;
              img {
                display: block;
                margin: 0 auto 10px;
              }
              p {
                font-size: 24px;
                line-height: 40px;
                color: #515151;
                text-align: center;
              }
              span {
                display: block;
                font-size: 14px;
                line-height: 24px;
                color: #a3a3a3;
                text-align: center;
              }
            }
          }
        }
      }
    }
  }


</style>
