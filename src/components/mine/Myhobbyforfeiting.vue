<template id="">
  <div class="myhobbyforfeiting-main clearfix">
    <div class="myhobbyforfeiting-center">
      <h1>{{$t('memberCenter.myPreference')}}</h1>
      <div class="inquiry">
        <el-form :model="ruleForm" :inline="true" :rules="rules" ref="ruleForm">
          <!-- 资产名称 -->
          <el-form-item :label="$t('MyAssets.assetName')" prop="assetsType" style="display:block">
            <el-radio-group v-model="ruleForm.assetsType">
              <el-radio label="1">{{$t('MyAssets.forfaiting')}}&nbsp;&nbsp;&nbsp;</el-radio>
              <router-link to="Myhobbyfactoring">
                <el-radio label="2">{{$t('MyAssets.factoring')}}</el-radio>
              </router-link>
            </el-radio-group>
          </el-form-item>
          <!-- 币种 -->
          <el-form-item :label="$t('MyAssets.acceptanceCurrency')" prop="currency" style="display:block">
            <el-radio-group v-model="ruleForm.currency">
              <el-radio label="CNY"></el-radio>
              <el-radio label="USD"></el-radio>
              <el-radio label="EUR"></el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 贴现率范围 -->
          <el-form-item :label="$t('MyAssets.discountRateRange')">
            <el-form-item prop="rateBegin" style="margin:0;">
              <el-input type="number" v-model="ruleForm.rateBegin" class="myassets-input"
                        @blur="FixedRate('rateBegin', 4)"></el-input>
            </el-form-item>&nbsp;-
            <el-form-item prop="rateEnd" style="margin:0;">
              <el-input type="number" v-model="ruleForm.rateEnd" class="myassets-input"
                        @blur="FixedRate('rateEnd', 4)"></el-input>
            </el-form-item>
          </el-form-item>
          <!-- 承兑金额范围 -->
          <el-form-item :label="$t('MyAssets.amountCount')">
            <el-form-item prop="amountBegin" style="margin:0;">
              <el-input type="number" v-model="ruleForm.amountBegin" class="myassets-input"
                        @blur="FixedRate('amountBegin', 2)"></el-input>
            </el-form-item>&nbsp;-
            <el-form-item prop="amountEnd" style="margin:0;">
              <el-input type="number" v-model="ruleForm.amountEnd" class="myassets-input"
                        @blur="FixedRate('amountEnd', 2)"></el-input>
            </el-form-item>
          </el-form-item>
          <div>
            <!-- 升降序排列 -->
            <el-form-item :label="$t('MyAssets.orderByFiled')" prop="orderBy" style="display:inline-block">
              <el-select v-model="ruleForm.orderBy" :placeholder="$t('marketForfeiting.select')">
                <!--<el-option :label="$t('marketForfeiting.select')" value=""></el-option>-->
                <el-option :label="$t('body.aed')" value="dead_line"></el-option>
                <el-option :label="$t('body.AcceptanceAmount')" value="amount"></el-option>
                <el-option :label="$t('body.discountRate')" value="discount_rate"></el-option>
              </el-select>
            </el-form-item>
            <!-- 升降序 -->
            <el-form-item :label="$t('MyAssets.orderByType')" prop="ascDesc">
              <el-select v-model="ruleForm.ascDesc" :placeholder="$t('marketForfeiting.select')">
                <!--<el-option :label="$t('marketForfeiting.select')" value=""></el-option>-->
                <el-option :label="$t('MyAssets.asOrder')" value="asc"></el-option>
                <el-option :label="$t('MyAssets.deOrder')" value="desc"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <!-- 地区国家 -->
          <div>
            <el-form-item :label="$t('regist.regionCountry')" prop="areaId countryId">
              <el-select v-model="ruleForm.areaId" :placeholder="$t('marketForfeiting.select')" id="reg-type3"
                         @change="getCountryId">
                <el-option
                  v-for="item in selectData.areaId.data"
                  :key="item.name"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
              <el-select v-model="ruleForm.countryId" :placeholder="$t('marketForfeiting.select')" class="reg-type2">
                <el-option
                  v-for="item in selectData.countryId.data"
                  :key="item.name"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
          <!-- 信用证类型 -->
          <el-form-item :label="$t('MyAssets.forfaitingType')" prop="debtType">
            <el-radio-group v-model="ruleForm.debtType">
              <el-radio label="1">{{$t('MyAssets.dsForfaiting')}}</el-radio>
              <el-radio label="2">{{$t('MyAssets.inlForfaiting')}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm(1)">{{$t('AssetsForSalePage.query')}}</el-button>
            <el-button type="primary" @click="resetForm('ruleForm')">{{$t('common.reset')}}</el-button>
          </el-form-item>
        </el-form>
      </div>
      <template id="">
        <el-table :data="tableData" style="width: 100%;text-align: center" :empty-text="$t('tableEmpty.empty')">
          <el-table-column prop="amount" :label="$t('forfeitingdetail.amount')" class="asset-mum" header-align="center" :width="$i18n.locale == 'cn'? '120':'180'">
          </el-table-column>
          <el-table-column prop="currency" :label="$t('forfeitingdetail.currency')" class="asset-mum" header-align="center" :width="$i18n.locale == 'cn'? '120':'180'">
          </el-table-column>
          <el-table-column prop="discountRate" :label="$t('body.discountRate')" class="asset-mum" header-align="center" :width="$i18n.locale == 'cn'? '120':'180'">
          </el-table-column>
          <el-table-column prop="indateMessage" :label="$t('forfeitingdetail.indateMessage')" class="asset-mum" header-align="center" :width="$i18n.locale == 'cn'? '120':'170'">
          </el-table-column>
          <el-table-column prop="deadLine" :label="$t('forfeitingdetail.maturity')" class="asset-mum" header-align="center" :width="$i18n.locale == 'cn'? '120':'180'">
          </el-table-column>
          <el-table-column prop="debtType" :label="$t('MyAssets.forfaitingType')" class="asset-mum" header-align="center" :width="$i18n.locale == 'cn'? '120':'150'">
            <template slot-scope="scope">
              {{scope.row.debtType == "1" ?
              $t('creditLetterType.nationalName'):$t('creditLetterType.internationalName')}}
            </template>
          </el-table-column>
          <el-table-column prop="areaName" :label="$t('MyAssets.area')" class="asset-mum" header-align="center" :width="$i18n.locale == 'cn'? '120':'170'">
            <template slot-scope="scope">
              {{$i18n.locale == 'cn'? scope.row.areaName: scope.row.areaNameEn}}
            </template>
          </el-table-column>
          <el-table-column prop="countryName" :label="$t('MyAssets.country')" class="asset-mum" header-align="center" :width="$i18n.locale == 'cn'? '120':'170'">
            <template slot-scope="scope">
              {{$i18n.locale == 'cn'? scope.row.countryName: scope.row.countryNameEn}}
            </template>
          </el-table-column>
          <el-table-column fixed="right" :label="$t('MyAssets.operation')" width="100" class="asset-mum" header-align="center">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="toUpdate(scope)" v-show="isShow">{{$t('MyAssets.edit')}}
              </el-button>
              <el-button type="text" size="small" @click="toDelete(scope)" v-show="isShow">{{$t('MyAssets.delete')}}
              </el-button>
              <el-button type="text" size="small" @click="toDetail(scope)">{{$t('MyAssets.selectDetil')}}</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
      <!-- 分页 -->
      <div class="block">
        <el-pagination
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :current-page="ruleForm.page"
          :total="totalCount" style="text-align: center">
        </el-pagination>
      </div>
    </div>
  </div>
  </div>
</template>
<script type="text/javascript">
  import {myBuyingList, queryAllCountry, queryAllArea, assetsBuyingDelete} from '../../assets/js/const';
  import {checkDiscountRate, checkAmount} from '../../assets/js/utils';
  import Cookies from 'js-cookie';

  export default {
    data() {
      return {
        selectData: {
          areaId: [],
          countryId: []
        },
        ruleForm: {
          areaId: null,
          countryId: '',
          assetsType: '1',
          currency: '',
          page: 1,
          pageSize: 1,
          rateBegin: null,
          rateEnd: null,
          deadLine: '',
          debtType: '',
          orderBy: '',
          ascDesc: ''
        },
        rules: {
          rateBegin: [
            {
              required: true,
              trigger: 'blur',
              numSection: this.$t('publishFactoring.numSection'),
              numDecimal: this.$t('publishFactoring.numDecimal'),
              validator: checkDiscountRate
            }
          ],
          rateEnd: [
            {
              required: true,
              trigger: 'blur',
              numSection: this.$t('publishFactoring.numSection'),
              numDecimal: this.$t('publishFactoring.numDecimal'),
              validator: checkDiscountRate
            }
          ],
          amountBegin: [
            {
              required: true,
              trigger: 'blur',
              message: this.$t('publishForfeiting.inputTwo'),
              validator: checkAmount
            }
          ],
          amountEnd: [
            {
              required: true,
              trigger: 'blur',
              message: this.$t('publishForfeiting.inputTwo'),
              validator: checkAmount
            }
          ]
        },
        tableData: [],
        totalCount: null,
        isShow: false
      };
    },
    mounted() {
      //  按钮权限控制
      var userType = Cookies.get('userType');
      if (userType === '2') {
        this.isShow = true;
      }
      this.initData();
      // this.submitForm(1);
    },
    methods: {
      resetForm() {
        // 如果form中存在prop校验，调用resetfields方法
        // 例如 我的资产页筛选条件 （smallRate，bigRate，smallAmount，bigAmount）
        this.$refs['ruleForm'].resetFields();
        // 没存在prop校验的字段，强制赋值为空
        // this.ruleForm.assetsType = '';
        this.ruleForm.currency = '';
        // this.ruleForm.rateBegin = '';
        // this.ruleForm.rateEnd = '';
        // this.ruleForm.amountBegin= '';
        // this.ruleForm.amountEnd = '';
        this.ruleForm.orderBy = '';
        this.ruleForm.ascDesc = '';
        this.ruleForm.areaId = '';
        this.ruleForm.countryId = '';
        this.ruleForm.debtType = '';
      },
      // 截取利率
      FixedRate(el, num) {
        let _value = Number(this.ruleForm[el]);
        if (_value > 0) {
          this.ruleForm[el] = Number(this.ruleForm[el]).toFixed(num);
        }
      },
      // 搜索地区
      initData() {
        let that = this;
        this.POST(queryAllArea, {}, function (response) {
          that.selectData.areaId = response;
          // that.ruleForm.areaId = response.data[0].id;
          // 查询国家
          that.getCountryId();
        });
      },
      // 获取国家ID
      getCountryId() {
        var that = this;
        that.POST(queryAllCountry, {'body': {'areaId': that.ruleForm.areaId}}, function (response) {
          console.log(response.data.length);
          if (!response.data.length > 0) {
            that.ruleForm.countryId = '';
            that.selectData.countryId = {};
            return;
          }
          that.ruleForm.countryId = '';
          that.selectData.countryId = response;
        });
      },
      submitForm(page) {
        this.ruleForm.page = page;
        var that = this;
        let data = {
          'body': {
            'type': 1,
            'page': page,
            'pageSize': 10,
            'assetsType': 1,
            'currency': that.ruleForm.currency,
            'debtType': that.ruleForm.debtType,
            'rateBegin': that.ruleForm.rateBegin,
            'amountEnd': that.ruleForm.amountEnd,
            'amountBegin': that.ruleForm.amountBegin,
            'rateEnd': that.ruleForm.rateEnd,
            'countryIds': that.ruleForm.countryId,
            'areaId': that.ruleForm.areaId,
            'orderBy': that.ruleForm.orderBy,
            'ascDesc': that.ruleForm.ascDesc
          }
        };
        this.POST(myBuyingList, data, function (response) {
          that.tableData = response.data;
          that.totalCount = response.totalCount;
        });
      },
      // 编辑按钮
      toUpdate(scope) {
        this.$router.push({'path': '/HobbyForfeitingUpdate', 'query': {'id': scope.row.id}});
      },
      // 删除按钮
      // toDelete(scope){
      //   var that = this;
      //   this.$alert('确定删除该条记录？', '', {
      //     confirmButtonText: '确定',
      //     callback: action => {
      //       this.POST(assetsBuyingDelete, {'body':{'id':scope.row.id}}, function (response) {
      //           if(response.code==300){
      //               that.$message("删除成功！");
      //               that.submitForm(1);
      //           }else{
      //               that.$message("删除失败："+response.message);
      //           }
      //       })
      //     }
      //   });
      // },
      toDelete(scope) {
        const h = this.$createElement;
        let that = this;
        that.$msgbox({
          title: '',
          message: h('p', null, [
            h('span', null, that.$t('TellerManagementPage.sureRemove'))
          ]),
          showCancelButton: true,
          confirmButtonText: that.$t('TellerManagementPage.confirm'),
          cancelButtonText: that.$t('TellerManagementPage.cancel'),
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              that.POST(assetsBuyingDelete, {'body': {'id': scope.row.id}}, function (response) {
                that.$message(that.$t('MyAssets.DeleteSuccess'));
                that.submitForm(1);
              });
              done();
            } else {
              done();
            }
          }
        });
      },
      // toDelete(scope){
      //   var that = this;
      //   this.$alert(this.$t('TellerManagementPage.sureRemove'), '', {
      //     confirmButtonText: this.$t('TellerManagementPage.confirm'),
      //      confirmButtonText: this.$t('TellerManagementPage.cancel'),
      //     callback: action => {
      //       this.POST(assetsBuyingDelete, {'body':{'id':scope.row.id}}, function (response) {
      //           if(response.code==300){
      //               that.$message(this.$t('MyAssets.DeleteSuccess'));
      //               that.submitForm(1);
      //           }else{
      //               that.$message(this.$t('MyAssets.DeleteFailure')+response.message);
      //           }
      //       })
      //     }
      //   });
      // },
      //  查看详情
      toDetail(scope) {
        this.$router.push({'path': '/HobbyForfeitingDetail', 'query': {'id': scope.row.id}});
      },
      // 获取数据 并 分页
      handleCurrentChange(val) {
        this.submitForm(val);
      }
    },
    created() {
      this.submitForm(1);
    }
  };
</script>
<style media="screen" lang="less">
  .myhobbyforfeiting-main {
    width: 1100px;
    margin: 0 auto;
    .myhobbyforfeiting-center {
      float: left;
      width: 100%;
    }
    .el-table th {
      background: #409eff;
    }
    .el-table th > .cell {
      font-size: 14px;
      color: #fff;
    }
    .el-table .cell {
      font-size: 13px;
    }
    .el-button--mini, .el-button--small {
      font-size: 13px;
    }
    .el-form-item__label {
      font-weight: bold;
    }
  }

  .myhobbyforfeiting-input {
    width: 120px;
  }

  /*.inquiry-submit{
    border: none;
    outline: none;
    background: #3967c3;
    color: white;
    width:150px;
    height: 40px;
    border-radius: 5px;
    margin-left: 10px;
  }*/

</style>

