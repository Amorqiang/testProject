<template id="">
  <div class="buy-forfeiting clearfix">
    <div class="buyforfeiting-center">
      <h1>{{$t('marketForfeiting.market')}}</h1>
      <el-form :model="ruleForm" :inline="true" :rules="rules" ref="ruleForm">
        <el-form-item :label="$t('marketForfeiting.resource')">
          <el-radio-group v-model="assetsTy" @change="assetsTyChange()" style="margin-left: 15px">
            <el-radio label="1">{{$t('marketForfeiting.forfeiting')}}</el-radio>
            <!-- <router-link to="buyfactoring"> -->
            <el-radio label="2">{{$t('marketForfeiting.factoring')}}</el-radio>
            <!-- </router-link> -->
          </el-radio-group>
        </el-form-item>
        <!--<br>-->

        <el-form-item :label="$t('marketForfeiting.currency')" prop="currency" style="margin: 0 35px 0 35px">
          <el-radio-group v-model="ruleForm.currency">
            <el-radio label="CNY"></el-radio>
            <el-radio label="USD"></el-radio>
            <el-radio label="EUR"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('marketForfeiting.amountRange')">
          <el-form-item prop="amountStart" style="margin:0;">
            <el-input type="number" v-model="ruleForm.amountStart" class="buyforfeiting-input"
                      @blur="FixedRate('amountStart', 0)"></el-input>
          </el-form-item>&nbsp;-
          <el-form-item prop="amountEnd" style="margin:0;">
            <el-input type="number" v-model="ruleForm.amountEnd" class="buyforfeiting-input"
                      @blur="FixedRate('amountEnd', 0)"></el-input>
          </el-form-item>
        </el-form-item>
        <!--<br>-->
        <el-form-item :label="$t('marketForfeiting.debtType')" prop="debtType" style="margin-right: 15px">
          <el-radio-group v-model="ruleForm.debtType">
            <el-radio label="1">{{$t('marketForfeiting.national')}}</el-radio>
            <el-radio label="2">{{$t('marketForfeiting.International')}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('marketForfeiting.keyword')" prop="openFullName">
          <el-input v-model="ruleForm.openFullName" class="buyforfeiting-input"></el-input>
        </el-form-item>
        <!--<br>-->
        <el-form-item :label="$t('marketForfeiting.areaAndCountry')" prop="areaId countryId">
          <el-select v-model="ruleForm.areaId" id="reg-type3" @change="getCountryId"
                     :placeholder="$t('checkInfo.pleaseCheck')">
            <el-option v-for="item in selectData.areaId.data" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
          <el-select v-model="ruleForm.countryId" class="reg-type2" :placeholder="$t('checkInfo.pleaseCheck')">
            <el-option v-for="item in selectData.countryId.data" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="width:100px">
        </el-form-item>
        <br>
        <el-form-item :label="$t('marketForfeiting.region')" prop="orderBy">
          <el-select v-model="ruleForm.orderBy" :placeholder="$t('checkInfo.pleaseCheck')">
            <!--<el-option label="" value="">{{$t('marketForfeiting.select')}}</el-option>-->
            <el-option :label="$t('marketForfeiting.publish_time')" value="publish_time"></el-option>
            <el-option :label="$t('marketForfeiting.maturity')" value="maturity"></el-option>
            <el-option :label="$t('marketForfeiting.amount')" value="amount"></el-option>
            <el-option :label="$t('marketForfeiting.transfer_rate')" value="discount_rate"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('marketForfeiting.ascDesc')" prop="ascDesc">
          <el-select v-model="ruleForm.ascDesc" :placeholder="$t('checkInfo.pleaseCheck')">
            <!--<el-option :label="$t('marketForfeiting.select')" value=""></el-option>-->
            <el-option :label="$t('marketForfeiting.asc')" value="asc"></el-option>
            <el-option :label="$t('marketForfeiting.desc')" value="desc"></el-option>
          </el-select>
        </el-form-item>


        <!-- <el-form-item style="width:100px">
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click="buyforfeitingForm(1)" style="margin-left: 45px">
            {{$t('marketForfeiting.search')}}
          </el-button>
          <el-button type="primary" @click="resetForm()">{{$t('common.reset')}}</el-button>
          <!-- <button type="button" name="button" @click="isBlockChain()"></button> -->

        </el-form-item>
      </el-form>
      <template id="">
        <forfeiting v-for="item in tableData" :key="item.id" :data="item"
                    :forfeitingState="item.recheckState" :myAssets="item.myAssets" :blockChain="item.isnBlockChain" :source="'Market'">
        <div slot="handle">
          <el-tooltip effect="dark" :content="$t('MyAssets.selectDetil')" placement="top">
            <i class="handleDetails" @click="toDetails(item)"></i>
          </el-tooltip>
        </div>
        </forfeiting>
        <!--暂无数据-->
        <div class="noDate" v-if="tableData && tableData.length === 0">
          <p>{{this.$t('tableEmpty.empty')}}</p>
        </div>
        <div class="block">
          <div align="center" style="margin-top:15px; margin-bottom:15px;">
            <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange"
                           :current-page="ruleForm.page" :total="totalCount" :page-size="ruleForm.pagesize">
            </el-pagination>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script type="text/javascript">
  import forfeiting from '../common/forfeiting';
  import {findMarketAssets, queryAllArea, queryAllCountry, msgCountNoRead}
    from '../../assets/js/const';
  import {checkAmount} from '../../assets/js/utils';

  export default {
    data() {
      return {
        localLang: this.$i18n.locale,
        showEn: '', // en show areaNameEn countryNameEn
        showCn: '', // cn show areaName countryName
        totalCount: null,
        ids: '',
        selectData: {
          areaId: {},
          countryId: {}
        },
        assetsTy: '1',
        ruleForm: {
          name: '',
          region: '',
          assetsName: '1',
          // totalCount: null,
          page: 1,
          pagesize: 10, // 当前页必输
          // 每页显示的条目数必输
          provinceI: '',
          currency: '', // 币种
          amountStart: '', // 金额开始”
          amountEnd: '', // 金额结束”
          limitDate: '', // 资产期限（1~12）月为单位
          countryIds: '', // 多个国家id用英文逗号隔开
          openFullName: '', // 开证行
          trsTimes: '', // 交易次数
          areaId: '', // 区域id
          countryId: '', // 国家id
          ascDesc: '', // 排序方式   asc 升序   desc 降序
          orderBy: '', // 排序字段
          maturity: '', // 资产到期日
          amount: '', // 金额
          discount_rate: '', // 贴现率
          title: ''
        },
        rules: {
          amountStart: [
            {
              trigger: 'blur',
              message: this.$t('MyAssets.positiveInteger'),
              validator: checkAmount
            }
          ],
          amountEnd: [
            {
              trigger: 'blur',
              message: this.$t('MyAssets.positiveInteger'),
              validator: checkAmount
            }
          ]
        },
        tableData: []
      };
    },
    components: {
      forfeiting
    },
    created() {
      // this.initData();
    },
    mounted() {
      // this.$refs.myPic.innerHTML = 123;
      this.initData();
      this.buyforfeitingForm(1);
    },
    methods: {
      // 截取利率、承兑金额范围
      FixedRate(el, num) {
        let _value = Number(this.ruleForm[el]);
        if (_value > 0) {
          this.ruleForm[el] = Number(this.ruleForm[el]).toFixed(num);
        }
      },
      resetForm() {
        // 如果form中存在prop校验，调用resetfields方法
        // 例如 我的资产页筛选条件 （smallRate，bigRate，smallAmount，bigAmount）
        this.$refs['ruleForm'].resetFields();
        // 没存在prop校验的字段，强制赋值为空
        this.ruleForm.assetsTy = '';
        this.ruleForm.currency = '';
        this.ruleForm.amountStart = '';
        this.ruleForm.amountEnd = '';
        this.ruleForm.openFullName = '';
        this.ruleForm.debtType = '';
        this.ruleForm.areaId = '';
        this.ruleForm.countryId = '';
        this.ruleForm.orderBy = '';
        this.ruleForm.ascDesc = '';
        // 筛选条件本地保存清空
      },
      assetsTyChange() {
        if ((this.assetsTy + '') === '1') {
          this.$router.push(
            '/buyforfeiting'
          );
        } else {
          this.$router.push(
            '/buyfactoring'
          );
        }
      },
      toDetails(scope) {
        if (scope.myAssets === '1') {
          this.POST(msgCountNoRead, {'body': {'id': '000'}}, () => {
            this.$router.push({
              'name': 'sellerdetailforfeiting',
              'params': {
                'id': scope.id
              }
            });
          });
        } else if (scope.myAssets === '0') {
          this.POST(msgCountNoRead, {'body': {'id': '000'}}, () => {
            this.$router.push({
              'name': 'Detailforfeiting',
              'params': {
                'id': scope.id
              }
            });
          });
        }
      },
      // 参数的处理
      changeData() {
        let _ruleForm = this.ruleForm;
        let BodyData = {};
        // BodyData.page = 1 ;
        // BodyData.pagesize = 10;
        for (var i in _ruleForm) {
          if (_ruleForm[i] !== 'undefined' && _ruleForm[i] !== '' && _ruleForm[i] !== null) {
            BodyData[i] = _ruleForm[i];
          }
        }
        return BodyData;
      },
      handleCurrentChange(val) {
        //  var self = this;
        this.buyforfeitingForm(val);
      },
      buyforfeitingForm(page) {
        this.ruleForm.page = page;
        // console.log(page);
        let that = this;
        if ((Number(this.ruleForm.amountStart) > Number(this.ruleForm.amountEnd)) || Number(this.ruleForm.amountStart) < 0 || Number(this.ruleForm.amountEnd) < 0
        ) {
          this.$message({
            message: that.$t('MyAssets.selectionRange'),
            type: 'warning'
          });
        } else {
          that.POST(findMarketAssets, {'body': this.changeData()}, function (response) {
            that.tableData = response.data;
            if (that.localLang === 'cn') {
              that.showCn = true;
              that.showEn = false;
            } else {
              that.showCn = false;
              that.showEn = true;
            }
            that.totalCount = response.totalCount;
          });
        }
      },
      // 判断资产是否是我发布的
      cell({row, column, rowIndex, columnIndex}) {
        // 第一列添加image类
        if (row.myAssets === '1' && columnIndex === 0) {
          return this.$i18n.locale === 'cn' ? 'my-image' : 'my-image1';
        }
        // 某一行其中的一个变量applies值如果大于0，并且在第六列，即确定一个具体的单元格需要确定行和列
        // if(parseFloat(row.applies) >0 && columnIndex == 5){
        //   return 'red'
        // }
      },
      initData() {
        var that = this;
        // 查询机构类型
        // 查询地区
        this.POST(queryAllArea, {}, function (response) {
          that.selectData.areaId = response;
          // that.ruleForm.areaId = response.data[0].id;
          // 查询国家
          that.getCountryId();
        });
      },
      getCountryId() {
        var that = this;
        that.POST(queryAllCountry, {'body': {'areaId': that.ruleForm.areaId}}, function (response) {
          if (!response.data.length > 0) {
            that.ruleForm.countryId = '';
            that.selectData.countryId = {};
            return;
          }
          that.ruleForm.countryId = '';
          that.selectData.countryId = response;
        });
      }
    }
  };
</script>
<style media="screen" lang="less">
  .buy-forfeiting {
    width: 1100px;
    margin: 0 auto;
    .buyforfeiting-center {
      float: left;
      width: 1100px;
      .el-form-item.is-success .el-input__inner, .el-form-item.is-success .el-input__inner:focus, .el-form-item.is-success .el-textarea__inner, .el-form-item.is-success .el-textarea__inner:focus {
        border-color: #dcdfe6;
      }
      .el-form-item__label {
        font-weight: bold;
      }
      .el-select {
        width: 180px;
      }
      .el-radio-group .el-radio {
        margin-left: 10px;
      }
      .el-table th {
        background: #409eff;
      }
      .el-table th > .cell {
        font-size: 13px;
        color: #fff;
      }
      .el-table .cell {
        font-size: 13px;
      }
      .el-button--mini, .el-button--small {
        font-size: 13px;
      }
    }
  }

  .buyforfeiting-input {
    width: 145px;
  }

  .inquiry {
    min-width: 800px;
  }

  .el-table .my-image {
    background: url('../../assets/img/minecn.png') no-repeat;
    /*background-size: 55px 55px;*/

    /*background-position:100px;*/

  }

  .el-table .my-image1 {
    background: url('../../assets/img/mineen.png') no-repeat;
    /*background-size: 55px 55px;*/

    /*background-position:100px;*/

  }

</style>
