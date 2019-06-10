<template id="">
  <div class="my-news clearfix">
    <div class="mynews-center">
      <h1>{{$t('messageContent.myInformation')}}</h1>

      <div>
        <span>{{$t('messageContent.typeInfo')}}</span>&nbsp;&nbsp;
        <el-radio-group v-model="mType">
          <el-radio :label="0">{{$t('messageContent.transactionMessage')}}</el-radio>
          <el-radio :label="1">{{$t('systemNotificationInfo.systemNotification')}}</el-radio>
        </el-radio-group>
      </div>
      <br>
      <!-- <span>消息类型</span>
        <input type="radio" name="mType" v-model="mType" value="0">业务消息</input>
        <input type="radio" name="mType" v-model="mType" value="1">系统公告</input><br> -->

      <template id="">


        <el-table :data="tableData" style="width: 100%" class="asset-table" v-show="showNotice"
                  :empty-text="$t('tableEmpty.empty')">
          <el-table-column prop="content" :label="$t('messageContent.messageContentInfo')" width="740" class="asset-mum"
                           height="30">
          </el-table-column>
          <el-table-column prop="publishDate" :label="$t('messageContent.sendingTime')" width="180" class="asset-mum">
          </el-table-column>
          <el-table-column prop="remark" :label="$t('messageContent.typeInfo')" class="asset-mum" width="180">
          </el-table-column>
        </el-table>

        <el-table :data="tableData" style="width: 100%" class="asset-table" v-show="showMsg" @row-click="updateState">
          <el-table-column :label="$t('messageContent.messageContentInfo')" width="740" class="asset-mum" height="30">
            <template slot-scope="scope">
              <p v-html="scope.row.messageNotice"></p>
            </template>
          </el-table-column>
          <el-table-column prop="updateTime" :label="$t('messageContent.sendingTime')" width="180" class="asset-mum">
          </el-table-column>
          <el-table-column prop="remark" :label="$t('messageContent.typeInfo')" class="my-news-table-td" width="180">
            <template slot-scope="scope">
              {{scope.row.remark}}
              <i class="my-news-unread" v-if="scope.row.readState === 1"></i>
            </template>
          </el-table-column>
        </el-table>


      </template>

      <div class="block" v-show="showMsg">
        <div align="center">
          <el-pagination
            layout="prev, pager, next"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :total="totalCount"
            :page-size="pagesize">
          </el-pagination>
        </div>
      </div>
      <div class="block" v-show="showNotice">
        <div align="center">
          <el-pagination
            layout="prev, pager, next"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChangeNotice"
            :current-page="currentPage"
            :total="totalCount"
            :page-size="pagesize">
          </el-pagination>
        </div>
      </div>

    </div>

  </div>

</template>
<script type="text/javascript">
  import {selectAllNotice, msgList, updateState} from '../../assets/js/const';

  export default {
    data() {
      return {
        mType: 0,
        showNotice: false,
        showMsg: false,
        tableData: [],
        totalCount: 0,
        currentPage: 1,
        pagesize: 10
      };
    },
    components: {},
    methods: {
      updateState(row, event, column) {
        console.log(row, event, column);
        this.POST(updateState, {'body': {'id': row.id}}, () => {
          this.$emit('unreadQuery');
          this.handleCurrentChange(this.currentPage);
        });
      },
      handleSizeChange(val) {
      },
      handleCurrentChange(val) {
        var that = this;
        // var params = {};
        // params.header = {};
        var body = {};
        // params.header.channel = 1;
        // params.header.language = "cn";
        // params.header.token = "2d9e211d657d49f58c4368f5168ea195";
        // params.header.currentId = "2098";
        body.page = val;
        body.pageSize = 10;
        // var jsonObject = JSON.stringify(params);
        // console.log(body);
        // this.$http.post("http://139.199.116.36:8005/owner/message/msgList",jsonObject, {headers: {"Content-Type": "application/json"}}
        // ).then(res => {
        //   console.log(res.data);
        //   self.showMsg=true;
        //   self.showNotice=false;
        //   self.tableData = res.data.data;
        //   for (var i = 0; i < self.tableData.length; i++) {
        //     self.tableData[i].remark="业务消息";
        //   }
        //   self.totalCount = res.data.totalCount;
        //   self.currentPage = res.data.page;
        //   self.pagesize = res.data.pageSize;
        // })

        this.POST(msgList, {'body': body}, function (res) {
          if (res.code === 300) {
            that.showMsg = true;
            that.showNotice = false;
            that.tableData = res.list;
            for (var i = 0; i < that.tableData.length; i++) {
              that.tableData[i].remark = that.$t('messageContent.transactionMessage');
              if ((that.tableData[i].cType) === 3) { // 判断是不是偏好相关信息
                var linkAsset = '';
                if ((that.tableData[i].assetsType) === 1) { // 福费廷详情
                  linkAsset = '<a href="/#/detailforfeiting/' + that.tableData[i].assetsId + '" target="_blank">' + that.tableData[i].linkName + '</a>';
                } else { // 保理详情
                  linkAsset = '<a href="/#/detailfactoring/' + that.tableData[i].assetsId + '" target="_blank" >' + that.tableData[i].linkName + '</a>';
                }

                that.tableData[i].messageNotice = that.tableData[i].messageNotice.replace(that.tableData[i].linkName, linkAsset);
              }
            }
            that.totalCount = res.totalCount;
            that.currentPage = res.page;
            that.pagesize = res.pageSize;
          } else {
            alert(res.message);
          }
        });
      },
      handleCurrentChangeNotice(val) {
        var self = this;
        // var params = {};
        // params.header = {};
        var body = {};
        // params.header.channel = 1;
        // params.header.language = "cn";
        body.page = val;
        body.pageSize = 10;
        body.type = 3;
        // var jsonObject = JSON.stringify(params);
        // console.log(jsonObject);
        // this.$http.post("http://139.199.116.36:8005/common/knowledge/selectAll",jsonObject, {headers: {"Content-Type": "application/json"}}
        // ).then(res => {
        // console.log(res.data);
        // self.showMsg=false;
        // self.showNotice=true;
        // self.tableData = res.data.data;
        // for (var i = 0; i < self.tableData.length; i++) {
        //   self.tableData[i].remark="系统公告";
        // }
        // self.totalCount = res.data.totalCount;
        // self.currentPage = res.data.page;
        // self.pagesize = res.data.pageSize;

        // })

        this.POST(selectAllNotice, {'body': body}, function (res) {
          if (res.code === 300) {
            console.log(res.data);
            self.showMsg = false;
            self.showNotice = true;
            self.tableData = res.data;
            for (var i = 0; i < self.tableData.length; i++) {
              self.tableData[i].remark = self.$t('messageContent.systemNotification');
            }
            self.totalCount = res.totalCount;
            self.currentPage = res.page;
            self.pagesize = res.pageSize;
          } else {
            alert(res.message);
          }
        });
      }
    },
    watch: {
      mType(oldval, newval) {
        // console.log("this.mType====" + this.mType);
        if ((this.mType + '') === '0') {
          this.handleCurrentChange(1);
        }
        if ((this.mType + '') === '1') {
          this.handleCurrentChangeNotice(1);
        }
      }
    },
    created() {
      this.handleCurrentChange(1);
    }
  };
</script>
<style media="screen" lang="less">
  .my-news {
    width: 1100px;
    margin: 0 auto;
    .mynews-center {
      float: left;
      width: 100%;
    }
    .my-news-table-td {
      position: relative;
    }
    .my-news-unread {
      display: block;
      width: 8px;
      height: 8px;
      /*float: right;*/
      /*margin: 0 20px 0 0;*/
      position: absolute;
      top: 20%;
      right: 20px;
      background: #f40;
      -webkit-border-radius: 10px;
      -moz-border-radius: 10px;
      border-radius: 10px;
    }
  }

  .asset-table {
    width: 80%;
    /*height: 30px;*/
  }

  .el-table th {
    background: #409eff;
  }

  .el-table th > .cell {
    font-size: 16px;
    color: #fff;
  }

  .el-table .cell {
    font-size: 14px;
  }

  .el-button--mini, .el-button--small {
    font-size: 14px;
  }


</style>
