<template id="">
  <div class="forfeiting-blockchain clearfix">
    <!-- <market-slider></market-slider> -->
    <div class="forfeiting-blockchain-center clearfix">
      <div class="buyer-msg">
        <h2>{{$t('blockchain.forfaitingBlockChainInfo')}}</h2>
        <el-steps :active="Number(act)" simple finish-status="success">
          <el-step :title="$t('blockchain.stepOne')" icon="el-icon-edit" :description="$t('blockchain.stepOne')"></el-step>
          <el-step :title="$t('blockchain.stepTwo')" icon="el-icon-edit" :description="$t('blockchain.stepTwo')"></el-step>
          <el-step :title="$t('blockchain.stepThree')" icon="el-icon-picture" :description="$t('blockchain.stepThree')"></el-step>
        </el-steps>

        <el-form :model="ruleForm" :inline="true" ref="ruleForm" label-width="180px" class="saleforfaiting-form">
          <el-card v-if="act == '0'" style="margin-bottom: 20px;margin-top: 15px">
            <div>
              <ul style="margin-top: -15px;">
                <li><span>{{$t('blockchain.assetsNo')}}</span>{{ruleForm.assetsNo}}</li>
                <li><span>{{$t('blockchain.companyName')}}</span>{{ruleForm.ownOrgName}}</li>
                <li><span>{{$t('blockchain.openSwift')}}</span>{{ruleForm.openSwift}}</li>
                <li><span>{{$t('blockchain.tenderSwift')}}</span>{{ruleForm.tenderSwift}}</li>
                <li><span>{{$t('blockchain.amount')}}</span>{{ruleForm.amount}}</li>
                <li><span>{{$t('blockchain.currency')}}</span>{{ruleForm.currency}}</li>
                <li><span>{{$t('blockchain.lcNo')}}</span>{{ruleForm.lcNo}}</li>
                <li><span>{{$t('blockchain.chainDate')}}</span>{{ruleForm.chainDate}}</li>
                <li style="width: 100%;"><span>{{$t('blockchain.blockChainNode')}}</span>
                  <span>{{ruleForm.blockChainNode}}</span>
                </li>
              </ul>
            </div>
            <!-- <el-form-item class="">
              <el-button type="primary" @click="next">下一步</el-button>
            </el-form-item> -->
          </el-card>

          <el-card v-else-if="act == '1'" style="margin-bottom: 20px;margin-top: 15px">
            <div>
              <ul style="margin-top: -15px;">
                <li><span>{{$t('blockchain.assetsNo')}}</span>{{ruleForm.assetsNo}}</li>
                <li><span>{{$t('blockchain.companyName')}}</span>{{ruleForm.ownOrgName}}</li>
                <li><span>{{$t('blockchain.openSwift')}}</span>{{ruleForm.openSwift}}</li>
                <li><span>{{$t('blockchain.tenderSwift')}}</span>{{ruleForm.tenderSwift}}</li>
                <li><span>{{$t('blockchain.amount')}}</span>{{ruleForm.amount}}</li>
                <li><span>{{$t('blockchain.currency')}}</span>{{ruleForm.currency}}</li>
                <li><span>{{$t('blockchain.lcNo')}}</span>{{ruleForm.lcNo}}</li>
                <li><span>{{$t('blockchain.chainDate')}}</span>{{ruleForm.chainDate}}</li>
                <li style="width: 100%;"><span>{{$t('blockchain.blockChainNode')}}</span>
                  <span>{{ruleForm.blockChainNode}}</span>
                </li>
              </ul>
            </div>
            <el-form-item style="margin: 10px 0 0 50px;">
              <el-button type="default" @click="prev">{{$t('blockchain.prevBtn')}}</el-button>
              <!-- <el-button type="primary" @click="next">下一步</el-button> -->
            </el-form-item>
          </el-card>

          <el-card v-else-if="act == '2'" style="margin-bottom: 20px;margin-top: 15px">
            <div>
              <ul style="margin-top: -15px;">
                <li><span>{{$t('blockchain.assetsNo')}}</span>{{ruleForm.assetsNo}}</li>
                <li><span>{{$t('blockchain.companyName')}}</span>{{ruleForm.ownOrgName}}</li>
                <li><span>{{$t('blockchain.openSwift')}}</span>{{ruleForm.openSwift}}</li>
                <li><span>{{$t('blockchain.tenderSwift')}}</span>{{ruleForm.tenderSwift}}</li>
                <li><span>{{$t('blockchain.amount')}}</span>{{ruleForm.amount}}</li>
                <li><span>{{$t('blockchain.currency')}}</span>{{ruleForm.currency}}</li>
                <li><span>{{$t('blockchain.lcNo')}}</span>{{ruleForm.lcNo}}</li>
                <li><span>{{$t('blockchain.chainDate')}}</span>{{ruleForm.chainDate}}</li>
                <li style="width: 100%;"><span>{{$t('blockchain.blockChainNode')}}</span>
                  <span>{{ruleForm.blockChainNode}}</span>
                </li>
              </ul>
            </div>
            <el-form-item style="margin: 10px 0 0 50px;">
              <el-button type="default" @click="prev">{{$t('blockchain.prevBtn')}}</el-button>
            </el-form-item>
          </el-card>

          <div class="rig">
          </div>
        </el-form>

      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {
    queryAssetById
  } from '../../assets/js/const';

  export default {
    data() {
      return {
        id: this.$route.params.id,
        act: this.$route.params.act,
        dialogVisible: false,
        dialogTableVisible: false,
        tableData: [],
        ruleForm: {}
      };
    },
    created() {
      this.initData();
    },
    components: {},
    methods: {
      initData() {
        let that = this;
        that.POST(queryAssetById, {
          body: {
            'bussId': that.id
          }
        }, function (response) {
          if (response.code === 300) {
            that.ruleForm = response.data;
          }
        });
      },
      showCurrent(step) {
        return this.act === step;
      },
      prev() {
        if (this.act > 0) this.act--;
        let that = this;
        that.POST(queryAssetById, {
          body: {
            'bussId': that.id,
            'bussTypeState': this.act + 1
          }
        }, function (response) {
          if (response.code === 300) {
            that.ruleForm = response.data;
          }
        });
      },
      next() {
        if (this.act < 2) this.act++;
      }
    }
  };
</script>
<style media="screen" lang="less">
  .forfeiting-blockchain {
    width: 1100px;
    margin: 0 auto;
    .el-button--primary {
      margin: 20px 0 40px 500px;
    }
    .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
      font-size: 18px;
    }
    .forfeiting-blockchain-center {
      .el-step.is-simple .el-step__title {
        font-size: 14px;
      }
      float: left;
      width: 1100px;
      ul {
        font-size: 16px;
      }
      li {
        float: left;
        width: 50%;
        height: 50px;
        line-height: 30px;
        margin-top: 25px;
      }
      /*span {*/
        /*font-weight: bold;*/
      /*}*/
    }
    .el-radio__label {
      display: none;
    }
  }
  h2{
    font-weight: normal;
  }
  .el-table th {
    background: #409eff;
  }

  .el-table th > .cell {
    font-size: 16px;
    color: #fff;
  }

  .el-table .cell {
    font-size: 15px;
  }
</style>
