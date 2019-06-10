<template>
  <div class="factoring-product">
    <div class="factoring-info">
      <div class="factoring-all">
        <div class="factoring-title">
          <h6>{{data.factoringNo || data.assetsNo}} {{data.seller}}</h6>
          <ul class="factoring-tag">
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
            <li style="text-align: center">
              <template v-if="data.factoringType + '' === '1' || data.factoringType + '' === '2'">
                <el-tooltip v-if="$i18n.locale === 'en'" :content="$t('customerService.singleFactoring')"
                            placement="top">
                  <p>{{$t('customerService.singleFactoring') | openFullNamesubstring()}}</p>
                </el-tooltip>
                <template v-else>
                  {{$t('customerService.singleFactoring')}}
                </template>
              </template>
              <template v-else>
                <el-tooltip v-if="$i18n.locale === 'en'" :content="$t('customerService.doubleFactoring')"
                            placement="top">
                  <p>{{$t('customerService.doubleFactoring') | openFullNamesubstring()}}</p>
                </el-tooltip>
                <template v-else>
                  {{$t('customerService.doubleFactoring')}}
                </template>
              </template>
            </li>
            <li style="text-align: center">
              <template v-if="data.factoringType + '' === '1' || data.factoringType + '' === '3'">
                <el-tooltip v-if="$i18n.locale === 'en'" :content="$t('customerService.disclosedFactoring')"
                            placement="top">
                  <p>{{$t('customerService.disclosedFactoring') | openFullNamesubstring()}}</p>
                </el-tooltip>
                <template v-else>
                  {{$t('customerService.disclosedFactoring')}}
                </template>
              </template>
              <template v-else>
                <el-tooltip v-if="$i18n.locale === 'en'" :content="$t('customerService.undisclosedFactoring')"
                            placement="top">
                  <p>{{$t('customerService.undisclosedFactoring') | openFullNamesubstring()}}</p>
                </el-tooltip>
                <template v-else>
                  {{$t('customerService.undisclosedFactoring')}}
                </template>
              </template>
            </li>
          </ul>
        </div>
        <div class="factoring-time clearfix">
          <p>{{this.$t('body.fed')}} : {{data.maturity}}</p>
          <p>{{this.$t('body.ivp')}} : {{data.indateMessage}}</p>
        </div>
      </div>
      <div class="factoring-main" :class="{'factoring-main-en': $i18n.locale === 'en'}">
        <el-row>
          <el-col :span="$i18n.locale === 'en'? 7: 6">
            <span>{{data.amount}}</span>
            <p>{{this.$t('publishForfeiting.amount')}}</p>
          </el-col>
          <el-col :span="$i18n.locale === 'en'? 7: 5">
            <span>{{data.currency}}</span>
            <p>{{this.$t('body.AcceptanceCurrency')}}</p>
          </el-col>
          <el-col :span="$i18n.locale === 'en'? 5: 6">
            <span>{{data.discountRate}}</span>
            <p>{{this.$t('customerService.TransferRate')}}</p>
          </el-col>
          <el-col :span="$i18n.locale === 'en'? 5: 7">
            <el-tooltip v-if="$i18n.locale === 'cn' && data.factoringName && data.factoringName.length > 9" :content="data.factoringName"
                        placement="top">
              <span>{{data.factoringName | openFullNamesubstring(9)}}</span>
            </el-tooltip>
            <el-tooltip v-if="$i18n.locale === 'en' && data.factoringName && data.factoringName.length > 6" :content="data.factoringName"
                        placement="top">
              <span>{{data.factoringName | openFullNamesubstring(6)}}</span>
            </el-tooltip>
            <span v-else>{{data.factoringName}}</span>
            <p>{{this.$t('body.fName')}}</p>
          </el-col>
        </el-row>
      </div>
      <div class="factoring-handle">
        <slot name="handle">
        </slot>
      </div>
    </div>
    <p class="factoring-state" :class="{'factoring-state-en': $i18n.locale === 'en'}" v-if="factoringState"
       :style="{'background': $options.filters.assetsStateChange(factoringState).bg, 'color': $options.filters.assetsStateChange(factoringState).color}">
      {{factoringState | assetsStateChange($i18n.locale).state}}
    </p>
    <div class="factoring-myAssets" v-if="myAssets === '1'">
      <img :src="'/static/img/' + (this.$i18n.locale === 'cn' ? 'I-released-it.png' : 'I-released-it-en.png')" alt="">
    </div>
  </div>
</template>

<script>
  import {assetsState} from '../../assets/js/utils';

  export default {
    props: {
      'data': Object,
      'factoringState': String | Number,
      'newAssets': Boolean,
      'blockChain': String,
      'myAssets': String
    },
    data() {
      return {
        areaName: '',
        countryName: ''
      };
    },
    filters: {
      openFullNamesubstring: function (value, length) {
        if (length && value.length > length) {
          return value.substring(0, length) + '...';
        } else if (!length && value.length > 4) {
          return value.substring(0, 4) + '...';
        } else {
          return value;
        }
      },
      assetsStateChange(value, lang) {
        return assetsState(value, lang);
      }
    },
    mounted () {
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
  .factoring-product {
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
    .factoring-info {
      height: 162px;
      float: left;
      .factoring-all {
        border-bottom: 1px solid #e5e5e5;
      }
      .factoring-title {
        height: 24px;
        .factoring-tooltip {
          cursor: pointer;
        }
        h6 {
          width: 220px;
          float: left;
          font-size: 18px;
          line-height: 24px;
          white-space: nowrap;
          text-overflow: ellipsis;
          -o-text-overflow: ellipsis;
          overflow: hidden;
        }
        .factoring-tag {
          float: left;
          li {
            float: left;
            font-size: 15px;
            padding: 2px 10px;
            line-height: 16px;
            color: #a1a1a1;
            border: 1px solid #a1a1a1;
            -webkit-border-radius: 5px;
            -moz-border-radius: 5px;
            border-radius: 5px;
            margin: 0 9px;
          }
        }
        .factoring-blockChain {
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
      .factoring-time {
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
      .factoring-main {
        height: 89px;
        width: 638px;
        margin-left: -38px;
        &.factoring-main-en {
          width: 670px;
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
    .factoring-state {
      float: left;
      min-width: 110px;
      padding: 0 10px;
      margin: 60px 0 0 40px;
      height: 24px;
      background: #dff7f7;
      -webkit-border-radius: 24px;
      -moz-border-radius: 24px;
      border-radius: 24px;
      font-size: 15px;
      text-align: center;
      line-height: 24px;
      box-sizing: border-box;
      &.factoring-state-en {
        margin-left: 25px;
      }
    }
    .Domestic-letter-of-credit {
      position: absolute;
      top: 0;
      right: 0;
    }
    .factoring-handle {
      position: absolute;
      top: 50%;
      right: 55px;
      width: 200px;
      transform: translate(0, -50%);
    }
    .factoring-newAssets {
      position: absolute;
      top: 50%;
      right: 250px;
      transform: translate(0, -50%);
    }
    .factoring-myAssets {
      position: absolute;
      top: 50%;
      right: 230px;
      transform: translate(0, -50%);
    }
  }
</style>
