<template id="">
  <div class="my-score clearfix">
    <div class="myscore-center">
      <h1>{{$t('Myscore.myCredit')}}</h1>
      <table class="table">
        <tr>
          <td>
            <p>{{$t('Myscore.availableCredit')}}</p>
          </td>
          <td>{{userIntegral}}</td>
        </tr>
      </table>
      <template>
        <el-table :data="tableData" style="width: 100%;text-align: center" class="asset-table">
          <el-table-column :prop="this.$i18n.locale=='cn'?'integralDesc':'integralDescEn'"
                           :label="$t('Myscore.integralDescription')" class="asset-mum">
          </el-table-column>
          <el-table-column prop="integralDate" :label="$t('Myscore.integralTime')" class="asset-mum">
          </el-table-column>
          <el-table-column prop="integralState" :label="$t('Myscore.integralState')" class="asset-mum">
            <template slot-scope="scope">
              <div v-if="scope.row.integralState==1">{{$t('Myscore.increase')}}</div>
              <div v-if="scope.row.integralState==2">{{$t('Myscore.reduce')}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="integralValue" :label="$t('Myscore.integralValue')" class="asset-mum">
          </el-table-column>
        </el-table>
      </template>
      <!-- 分页 -->
      <div class="block">
        <el-pagination
          @current-change="handleCurrentChange"
          layout="prev, pager, next"
          :current-page="page"
          :page-size="pageSize"
          :total="totalCount" style="text-align: center">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
  import {selectIntegralDetail} from '../../assets/js/const';

  export default {
    data() {
      return {
        integralDetailList: {},
        userIntegral: '',
        tableData: [],
        totalCount: null,
        language: '',
        page: 1,
        pageSize: 10
      };
    },
    components: {},
    methods: {
      initData(val) {
        let that = this;
        this.POST(selectIntegralDetail, {'body': {'page': val, 'pageSize': this.pageSize}}, function (response) {
          console.log(response);
          that.tableData = response.data.integralDetailList;
          that.userIntegral = response.data.userIntegral;
          that.totalCount = response.totalCount;
        });
      },
      //  获取数据 并 分页
      handleCurrentChange(val) {
        this.initData(val);
      }
    },
    created() {
      this.initData(1);
    }
  };
</script>
<style media="screen" lang="less">
  .my-score {
    width: 1100px;
    margin: 0 auto;
    .myscore-center {
      float: left;
      width: 100%;
    }
  }

  /*.myscore-center td{
    width: 380px;
    height: 80px;
  }*/
  .myscore-center table {
    border-collapse: collapse;
  }

  .myscore-center td {
    border-top: 1px solid #f5f7fa;
    height: 60px;
    width: 10%;
  }

  .myscore-center tr:hover {
    background: #f5f7fa;
  }

  .el-table th {
    background: #409eff;
  }

  .el-table th > .cell {
    font-size: 16px;
    color: #fff;
    text-align: center;
  }

  .el-table .cell {
    font-size: 14px;
  }

  .el-button--mini, .el-button--small {
    font-size: 14px;
  }

</style>
