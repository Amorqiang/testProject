<template>
  <div class="forfeiting-product">
    <div class="forfeiting-info">
      <div class="forfeiting-all">
        <div class="forfeiting-title">
          <!--<el-tooltip class="forfeiting-tooltip" :content="data.title" placement="left">-->
          <h6>{{data.assetsNo}} {{data.title}}</h6>
          <!--</el-tooltip>-->
          <ul class="forfeiting-tag">
            <li>
              <el-tooltip v-if="areaName && areaName.length > 4" :content="areaName"
                          placement="top">
                <p>{{areaName | openFullNamesubstring()}}</p>
              </el-tooltip>
              <template v-else>
                {{areaName}}
              </template>
            </li>
            <li>
              <el-tooltip v-if="countryName && countryName.length > 4" :content="countryName"
                          placement="top">
                <p>{{countryName | openFullNamesubstring()}}</p>
              </el-tooltip>
              <template v-else>
                {{countryName}}
              </template>
            </li>
            <li style="min-width: 75px;text-align: center">
              <el-tooltip v-if="data.openFullName && data.openFullName.length > 4" :content="data.openFullName"
                          placement="top">
                <p>{{data.openFullName | openFullNamesubstring()}}</p>
              </el-tooltip>
              <template v-else>
                {{data.openFullName}}
              </template>
            </li>
          </ul>
          <p class="forfeiting-blockChain" v-if="blockChain === '1'">
            Blockchain
          </p>
          <p class="forfeiting-state" v-if="forfeitingState"
             :style="{'background': $options.filters.assetsStateChange(forfeitingState).bg, 'color': $options.filters.assetsStateChange(forfeitingState).color}">
            {{forfeitingState | assetsStateChange($i18n.locale).state}}
          </p>
        </div>
        <div class="forfeiting-time clearfix">
          <p>{{this.$t('body.aed')}} : {{data.maturity}}</p>
          <p>{{this.$t('body.ivp')}} : {{data.indateMessage}}</p>
        </div>
      </div>
      <div class="forfeiting-main" :class="{'forfeiting-main-en': $i18n.locale === 'en'}">
        <el-row>
          <el-col :span="6">
            <span>{{data.amount}}</span>
            <p>{{this.$t('publishForfeiting.amount')}}</p>
          </el-col>
          <el-col :span="5">
            <span>{{data.currency}}</span>
            <p>{{this.$t('body.AcceptanceCurrency')}}</p>
          </el-col>
          <el-col :span="6">
            <span>{{data.discountRate}}</span>
            <p>{{this.$t('body.discountRate')}}</p>
          </el-col>
          <el-col :span="7">
            <span>
              <template v-if="(data.debtType + '') === '1'">
                {{$t('MyAssets.dsForfaiting')}}
              </template>
              <template v-else-if="(data.debtType + '') === '2'">
                {{$t('MyAssets.inlForfaiting')}}
              </template>
              <template v-else>
                {{data.debtType}}
              </template>
            </span>
            <p>{{this.$t('HobbyForfeiting.debtType')}}</p>
          </el-col>
        </el-row>
      </div>
      <div class="forfeiting-handle">
        <slot name="handle">

        </slot>
      </div>
    </div>
    <div v-if="data.debtType === '国内信用证' || data.debtType === 'Domestic L/C' || data.debtType + '' === '1'"
         class="Domestic-letter-of-credit">
      <img :src="'/static/img/' + (this.$i18n.locale === 'cn' ? 'Domestic-letter-of-credit.png' : 'Domestic-letter-of-credit-en.png')" alt="">
    </div>
    <div class="forfeiting-newAssets" v-if="newAssets && forfeitingState === 101">
      <img :src="'/static/img/' + (this.$i18n.locale === 'cn' ? 'New-assets.png' : 'New-assets-en.png')" alt="">
    </div>
    <div class="forfeiting-myAssets" v-if="myAssets === '1'">
      <img :src="'/static/img/' + (this.$i18n.locale === 'cn' ? 'I-released-it.png' : 'I-released-it-en.png')" alt="">
    </div>
  </div>
</template>

<script>
  import {assetsState} from '../../assets/js/utils';

  export default {
    props: {
      'data': Object,
      'forfeitingState': String | Number,
      'newAssets': Boolean,
      'blockChain': String,
      'myAssets': String,
      'source': String
    },
    data() {
      return {
        areaName: '',
        countryName: ''
      };
    },
    filters: {
      openFullNamesubstring: function (value) {
        if (value && value.length > 4) {
          return value.substring(0, 4) + '...';
        } else {
          return value;
        }
      },
      assetsStateChange(value, lang) {
        return assetsState(value, lang);
      }
    },
    mounted() {
      let lang = this.$i18n.locale;
      if (this.source === 'MyAssets' && lang === 'en') {
        this.areaName = this.data.enAreaName;
        this.countryName = this.data.enCountryName;
      } else if (this.source === 'Market' && lang === 'en') {
        this.areaName = this.data.areaNameEn;
        this.countryName = this.data.countryNameEn;
      } else {
        this.areaName = this.data.areaName;
        this.countryName = this.data.countryName;
      }
    }
  };
</script>

<style scoped lang="less">
  .forfeiting-product {
    width: 1098px;
    height: 192px;
    margin: 11px auto;
    border: 1px solid #d9d9d9;
    -webkit-border-radius: 6px;
    -moz-border-radius: 6px;
    border-radius: 6px;
    box-sizing: border-box;
    padding: 24px 0 0 38px;
    position: relative;
    .forfeiting-info {
      height: 162px;
      float: left;
      .forfeiting-all {
        border-bottom: 1px solid #e5e5e5;
      }
      .forfeiting-title {
        height: 24px;
        .forfeiting-tooltip {
          cursor: pointer;
        }
        h6 {
          width: 310px;
          float: left;
          font-size: 18px;
          line-height: 24px;
          white-space: nowrap;
          text-overflow: ellipsis;
          -o-text-overflow: ellipsis;
          overflow: hidden;
        }
        .forfeiting-tag {
          float: left;
          li {
            float: left;
            font-size: 15px;
            padding: 2px 5px;
            line-height: 16px;
            color: #a1a1a1;
            border: 1px solid #a1a1a1;
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            border-radius: 5px;
            margin: 0 9px;
          }
        }
        .forfeiting-state {
          float: right;
          min-width: 110px;
          padding: 0 10px;
          margin: 0 9px;
          height: 24px;
          background: #dff7f7;
          -webkit-border-radius: 24px;
          -moz-border-radius: 24px;
          border-radius: 24px;
          font-size: 15px;
          text-align: center;
          line-height: 24px;
          box-sizing: border-box;
        }
        .forfeiting-blockChain {
          float: left;
          font-size: 15px;
          padding: 2px 5px;
          line-height: 16px;
          color: #0688ea;
          border: 1px solid #0688ea;
          -webkit-border-radius: 5px;
          -moz-border-radius: 5px;
          border-radius: 5px;
          margin: 0 9px;
        }
      }
      .forfeiting-time {
        width: 679px;
        padding-bottom: 6px;
        p {
          float: left;
          min-width: 180px;
          line-height: 47px;
          font-size: 15px;
          color: #a4a4a4;
          margin-right: 20px;
        }
      }
      .forfeiting-main {
        height: 89px;
        width: 638px;
        margin-left: -38px;
        &.forfeiting-main-en {
          width: 770px;
        }
        span {
          display: block;
          text-align: center;
          line-height: 24px;
          font-size: 20px;
          color: #ef8300;
          margin-top: 19px;
        }
        p {
          font-size: 16px;
          text-align: center;
          color: #a0a0a0;
          line-height: 32px;
        }
      }
    }
    .Domestic-letter-of-credit {
      position: absolute;
      top: 0;
      right: 0;
    }
    .forfeiting-handle {
      position: absolute;
      top: 50%;
      right: 55px;
      width: 200px;
      transform: translate(0, -50%);
    }
    .forfeiting-newAssets {
      position: absolute;
      top: 50%;
      right: 250px;
      transform: translate(0, -50%);
    }
    .forfeiting-myAssets {
      position: absolute;
      top: 50%;
      right: 213px;
      transform: translate(0, -50%);
    }
  }
</style>
