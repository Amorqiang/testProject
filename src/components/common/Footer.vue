<template id="">
  <div class="footer" :class="{'en-footer': $i18n.locale == 'en'}">
    <div class="footer-main clearfix">
      <div class="footer-members">
        <h2>{{$t('body.menbers')}}</h2>
        <ul class="clearfix">
          <li>{{$t('body.cif')}}</li>
          <li>{{$t('body.cifl')}}</li>
          <li>{{$t('body.nbzfl')}}</li>
          <li>{{$t('body.ciam')}}</li>
          <li>{{$t('body.spfl')}}</li>
          <li>{{$t('body.ciamtj')}}</li>
          <li>{{$t('body.bcifso')}}</li>
        </ul>
      </div>
      <div class="footer-contact">
        <!--投部旗下成员 联系我们  -->
        <h2>{{$t('body.callus')}}</h2>
        <ul class="clearfix">
          <li><span>{{$t('footer.phone')}}：</span>86-10-85172637-857</li>
          <li><span>{{$t('footer.email')}}：</span>services@newnewchain.com</li>
          <li><span>{{$t('footer.address')}}：</span>{{$t('about.addressValue')}}</li>
          <li>{{$t('footer.time')}}</li>
        </ul>
      </div>
      <div class="footer-code clearfix" :class="{'footer-code-en':  $i18n.locale == 'en'}">
        <h2 style="margin-bottom: 18px;">{{$t('footer.FollowUs')}}</h2>
        <div class="foooter-code-img">
          <img src="../../assets/img/footer-code1.png" alt="">
          <template v-if="$i18n.locale == 'cn'">
            <p>{{$t('body.focs')}}</p>
            <p>{{$t('body.focs1')}}</p>
          </template>
          <template v-else>
            <p>{{$t('body.focs')}}</p>
          </template>
        </div>
        <div class="foooter-download-img" style="float: right;">
          <img src="../../assets/img/downloadApp.png" alt="">
          <template v-if="$i18n.locale == 'cn'">
            <p>{{$t('body.download')}}</p>
            <p>{{$t('body.download1')}}</p>
          </template>
          <template v-else>
            <p>{{$t('body.download')}}</p>
          </template>
        </div>
      </div>
    </div>
    <div class="footer-Record">
      <p>{{$t('footer.friendlyLink')}}</p>
      <p>{{$t('footer.reserved')}}</p>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {baseUrl} from '../../assets/js/env';
  export default {
    data () {
      return {
        baseUrl: baseUrl
      };
    }
  };
</script>
<style media="screen" scoped lang="less">
  /*去掉所有li元素的自带样式*/
  .footer ul, p, h6 {
    padding: 0;
    margin: 0;
  }

  .footer ul > li {
    list-style: none;
  }

  /*footer得设置*/
  .footer {
    width: 100%;
    min-width: 1100px;
    background: #2f3033;
    color: white;
    .footer-main {
      width: 1100px;
      min-height: 224px;
      margin: 0 auto;
      .footer-members, .footer-contact {
        width: 377px;
        float: left;
        padding-top: 20px;
        h2 {
          width: 377px;
          height: 58px;
          margin: 0;
          line-height: 58px;
          font-size: 18px;
          font-weight: normal;
        }
        ul {
          width: 377px;
          padding-top: 10px;
          padding-bottom: 35px;
          li {
            float: left;
            width: 377px;
            font-size: 14px;
            line-height: 28px;
          }
        }
      }
      .footer-contact {
        width: 485px;
        h2 {
          width: 485px;
        }
        ul {
          width: 485px;
          padding-bottom: 0px;
          li {
            width: 485px;
          }
        }
      }

      .footer-code {
        padding-top: 20px;
        width: 238px;
        float: left;
        h2 {
          width: 238px;
          height: 58px;
          margin: 0;
          line-height: 58px;
          font-size: 18px;
          font-weight: normal;
        }
        .foooter-code-img, .foooter-download-img {
          width: 94px;
          float: left;
          margin-left: 7px;
          img {
            display: block;
            width: 94px;
            margin-bottom: 6px;
          }
          p {
            width: 60px;
            font-size: 10px;
            line-height: 18px;
            text-align: center;
            margin: 0 auto;
          }
        }
        .foooter-download-img {
          p {
            width: 75px;
          }
        }
        &.footer-code-en {
          .foooter-code-img, .foooter-download-img {
            p {
              width: auto;
            }
          }
        }
      }
    }
    .footer-Record {
      width: 100%;
      background: #2f3033;
      border-top: 1px solid #828385;
      padding: 24px 0 20px 0;
      p {
        width: 1100px;
        margin: 0 auto;
        text-align: center;
        line-height: 24px;
        font-weight: normal;
        font-size: 14px;
      }
    }
  }
</style>
