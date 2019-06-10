<template id="">
  <div class="buy-factoring clearfix">
    <div class="buyforfeiting-center">
      <h1>{{$t('marketfactoring.market')}}</h1>
      <el-form :model="ruleForm" :inline="true" :rules="rules" ref="ruleForm">
        <el-form-item :label="$t('marketfactoring.resource')" prop="resource" style="margin-right: 37px">
          <el-radio-group v-model="assetsType" @change="assetsTypeChange()">
            <el-radio label="1">{{$t('marketfactoring.forfeiting')}}</el-radio>
            <el-radio label="2" style="margin-left: 20px">{{$t('marketfactoring.factoring')}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('marketfactoring.factoringType')" prop="factoringType" :class="{'buyfactoring-type-en': this.$i18n.locale == 'en'}">
          <el-radio-group v-model="ruleForm.factoringType" style="width: 680px;">
            <el-radio style="margin-left: 30px;" label="1">{{$t('marketfactoring.factoringType1')}}</el-radio>
            <el-radio label="2">{{$t('marketfactoring.factoringType2')}}</el-radio>
            <el-radio label="3">{{$t('marketfactoring.factoringType3')}}</el-radio>
            <el-radio label="4">{{$t('marketfactoring.factoringType4')}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="$t('marketfactoring.currency')" prop="currency">
          <el-radio-group v-model="ruleForm.currency">
            <el-radio label="CNY"></el-radio>
            <el-radio label="USD" style="margin-left: 20px"></el-radio>
            <el-radio label="EUR" style="margin-left: 20px"></el-radio>
          </el-radio-group>
        </el-form-item>
        <!--<br>-->

        <el-form-item :label="$t('marketfactoring.amountCount')" style="margin-left: 5px">
          <el-form-item prop="amountStart" style="margin:0;">
            <el-input type="number" v-model="ruleForm.amountStart" class="buyforfeiting-input"
                      @blur="FixedRate('amountStart', 0)"></el-input>
          </el-form-item>&nbsp;-
          <el-form-item prop="amountEnd" style="margin:0;">
            <el-input type="number" v-model="ruleForm.amountEnd" class="buyforfeiting-input"
                      @blur="FixedRate('amountEnd', 0)"></el-input>
          </el-form-item>
        </el-form-item>
        <!-- <el-form-item label="福费廷类型" prop="resource">
          <el-radio-group v-model="ruleForm.resource">
            <el-radio label="国际福费廷"></el-radio>
            <el-radio label="国内福费廷"></el-radio>

          </el-radio-group>
        </el-form-item> -->

        <el-form-item :label="$t('marketfactoring.areaAndCountry')" prop="areaId countryId">
          <el-select v-model="ruleForm.areaId" :placeholder="$t('checkInfo.pleaseCheck')" id="reg-type3"
                     @change="getCountryId">
            <el-option
              v-for="item in selectData.areaId.data"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
          <el-select v-model="ruleForm.countryId" :placeholder="$t('checkInfo.pleaseCheck')" class="reg-type2">
            <el-option
              v-for="item in selectData.countryId.data"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <br>
        <el-form-item :label="$t('marketfactoring.orderBy')" prop="orderBy">
          <el-select v-model="ruleForm.orderBy" :placeholder="$t('checkInfo.pleaseCheck')">
            <!--<el-option :label="$t('marketfactoring.select')" value=""></el-option>-->
            <el-option :label="$t('marketfactoring.publish_time')" value="publish_time"></el-option>
            <el-option :label="$t('marketfactoring.maturity')" value="maturity"></el-option>
            <el-option :label="$t('marketfactoring.amount')" value="amount"></el-option>
            <el-option :label="$t('marketfactoring.transfer_rate')" value="transfer_rate"></el-option>

          </el-select>
        </el-form-item>
        <el-form-item :label="$t('marketfactoring.ascDesc')" prop="ascDesc">
          <el-select v-model="ruleForm.ascDesc" :placeholder="$t('checkInfo.pleaseCheck')">
            <!--<el-option :label="$t('marketfactoring.select')" value=""></el-option>-->
            <el-option :label="$t('marketfactoring.asc')" value="asc"></el-option>
            <el-option :label="$t('marketfactoring.desc')" value="desc"></el-option>


          </el-select>
        </el-form-item>

        <el-form-item style="margin-left: 60px">
          <el-button type="primary" @click="buyfactoringForm(1)">{{$t('marketfactoring.Search')}}</el-button>
          <el-button type="primary" @click="resetForm()">{{$t('common.reset')}}</el-button>
        </el-form-item>
      </el-form>
      <template id="">
        <factoring v-for="item in tableData" :key="item.id" :data="item"
                   :factoringState="item.recheckState" :myAssets="item.myAssets" :source="'Market'">
          <div slot="handle">
            <el-tooltip effect="dark" :content="$t('MyAssets.selectDetil')" placement="top">
              <i class="handleDetails" @click="toDetails(item)"></i>
            </el-tooltip>
          </div>
        </factoring>
      </template>
      <!--暂无数据-->
      <div class="noDate" v-if="tableData && tableData.length === 0">
        <p>{{this.$t('tableEmpty.empty')}}</p>
      </div>
      <div class="block">
        <div align="center" style="margin-top:15px; margin-bottom:15px;">
          <el-pagination
            layout="prev, pager, next"
            @current-change="handleCurrentChange"
            :current-page="page"
            :total="totalCount"
            :page-size="pagesize">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import factoring from '../common/factoring';
  import {findMarketFactoring, queryAllArea, queryAllCountry, msgCountNoRead} from '../../assets/js/const';
  import {checkAmount} from '../../assets/js/utils';

  export default {
    data() {
      return {
        localLang: this.$i18n.locale,
        showEn: '', // en show areaNameEn countryNameEn
        showCn: '', // cn show areaName countryName
        map: {
          boolean: {
            1: this.$t('marketfactoring.factoringType1'),
            2: this.$t('marketfactoring.factoringType2'),
            3: this.$t('marketfactoring.factoringType3'),
            4: this.$t('marketfactoring.factoringType4')
          }
        },
        totalCount: 0,
        page: 1,
        pagesize: 10,
        assetsType: '2', // 资产类型
        selectData: {
          areaId: {},
          countryId: {}
        },
        ruleForm: {
          areaId: null,           // 地区              非空        50
          countryId: '',        // 国家              非空     50
          provinceI: '',
          name: '',
          region: '',
          type: [],
          resource: '2',
          totalCount: 0,
          page: 1,
          pagesize: 10,
          factoringType: '',  // 保理类型  1 单保理、明保理 2 单保理、暗保理  3、            双保理、明保理  4、双保理、暗保理' ,
          currency: '',   // 币种
          amountStart: '',   // 金额 开始
          amountEnd: '',    // 金额 结束
          limitDate: '',       // 资产期限    月份为单位
          trsTimes: '',       // 交易次数
          AscDesc: '',    // 排序方式， 升序降序
          maturity: '',
          amount: '',
          transfer_rate: '',
          publish_time: ''

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
          ],
          name: [
            {required: true, message: this.$t('inSupp.pleaseEnter'), trigger: 'blur'},
            {min: 3, max: 5, message: this.$t('marketfactoring.length'), trigger: 'blur'}
          ],
          region: [
            {required: true, message: this.$t('marketForfeiting.select'), trigger: 'change'}
          ],
          type: [
            {type: 'array', required: true, message: this.$t('marketfactoring.leastOne'), trigger: 'change'}
          ],
          resource: [
            {required: true, message: this.$t('marketfactoring.activityResource'), trigger: 'change'}
          ]
        },
        tableData: []
      };
    },
    components: {
      factoring
    },
    created() {
      this.buyfactoringForm(1);
    },
    mounted() {
      this.initData();
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
        this.ruleForm.assetsType = '';
        this.ruleForm.currency = '';
        this.ruleForm.amountStart = '';
        this.ruleForm.amountEnd = '';
        this.ruleForm.factoringType = '';
        this.ruleForm.areaId = '';
        this.ruleForm.countryId = '';
        this.ruleForm.orderBy = '';
        this.ruleForm.ascDesc = '';
        // 筛选条件本地保存清空
      },
      assetsTypeChange() {
        if (this.assetsType === '1') {
          this.$router.push(
            '/buyforfeiting'
          );
        } else {
          this.$router.push(
            '/buyfactoring'
          );
        }
      },
      //  角色转换
      factoringTypeName: function (row) {
        let factoringTypeName;
        let _factoringType = row.factoringType + '';
        if (_factoringType === '1') {
          factoringTypeName = this.$t('marketfactoring.factoringType1');
        } else if (_factoringType === '2') {
          factoringTypeName = this.$t('marketfactoring.factoringType2');
        } else if (_factoringType === '3') {
          factoringTypeName = this.$t('marketfactoring.factoringType3');
        } else {
          factoringTypeName = this.$t('marketfactoring.factoringType4');
        }
        return factoringTypeName;
      },
      // 跳转买方/卖方
      toDetails(scope) {
        if (scope.myAssets === '1') {
          this.POST(msgCountNoRead, {'body': {'id': '000'}}, () => {
            this.$router.push({
              'name': 'sellerdetailfactoring',
              'params': {
                'id': scope.id
              }
            });
          });
        } else if (scope.myAssets === '0') {
          this.POST(msgCountNoRead, {'body': {'id': '000'}}, () => {
            this.$router.push({
              'name': 'detailfactoring',
              'params': {
                'id': scope.id
              }
            });
          });
        }
      },
      //  参数的处理
      changeData() {
        let _ruleForm = this.ruleForm;
        let BodyData = {};
        // BodyData.page = 1 ;
        // BodyData.pagesize = 10;
        for (let i in _ruleForm) {
          if (_ruleForm[i] !== 'undefined' && _ruleForm[i] !== '' && _ruleForm[i] !== null) {
            BodyData[i] = _ruleForm[i];
          }
        }
        return BodyData;
      },
      //  分页切换
      handleCurrentChange(val) {
        //  var self = this;
        this.buyfactoringForm(val);
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
      //  查询国家地区
      initData() {
        let that = this;
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
        let that = this;
        that.POST(queryAllCountry, {'body': {'areaId': that.ruleForm.areaId}}, function (response) {
          if (!response.data.length > 0) {
            that.ruleForm.countryId = '';
            that.selectData.countryId = {};
            return;
          }
          // that.ruleForm.countryId = response.data[0].id;
          that.ruleForm.countryId = '';
          that.selectData.countryId = response;
        });
      },
      // 点击搜索
      buyfactoringForm(page) {
        this.ruleForm.page = page;
        console.log(page);
        let that = this;
        if ((Number(this.ruleForm.amountStart) > Number(this.ruleForm.amountEnd)) || Number(this.ruleForm.amountStart) < 0 || Number(this.ruleForm.amountEnd) < 0) {
          this.$message({
            message: that.$t('MyAssets.selectionRange'),
            type: 'warning'
          });
        } else {
          that.POST(findMarketFactoring, {'body': this.changeData()}, function (response) {
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
      }
    }
  };
</script>
<style media="screen" lang="less">
  .buy-factoring {
    width: 1100px;
    margin: 0 auto;
    .el-form-item__label {
      font-weight: bold;
    }
    .buyforfeiting-center {
      float: left;
      width: 1100px;
    }
    .buyfactoring-type-en {
      .el-radio {
        width: 300px;
        margin-bottom: 10px;
      }
    }
  }

  .buyforfeiting-input {
    width: 120px;
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

  .el-table .my-image {
    background: url('../../assets/img/minecn.png') no-repeat;
  }

  .el-table .my-image1 {
    background: url('../../assets/img/mineen.png') no-repeat;
  }

</style>
