<template id="">
  <div class="tellermanage-main clearfix">
    <div class="tellermanage-center">
      <h1>{{$t('TellerManagementPage.tellerManagement')}}</h1>
      <!-- <router-link to="/telleradd">
        <el-button type="primary" icon="el-icon-circle-plus-outline">添加柜员</el-button>
      </router-link> -->
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="addUser()" style="margin-bottom: 10px;">
        {{$t('TellerManagementPage.addTeller')}}
      </el-button>
      <template id="">
        <el-table :data="tableData" border style="width: 100%; text-align: center" :empty-text="$t('tableEmpty.empty')">
          <el-table-column prop="id" :label="$t('TellerManagementPage.number')" header-align="center" width="80">
          </el-table-column>
          <el-table-column prop="realName" :label="$t('TellerManagementPage.name')" header-align="center" width="180">
          </el-table-column>
          <el-table-column prop="userType" :label="$t('TellerManagementPage.role')" header-align="center"
                           :formatter="formatUserType"
                           width="180">
          </el-table-column>
          <el-table-column prop="phone" :label="$t('TellerManagementPage.phoneNumber')" header-align="center"
                           width="180">
          </el-table-column>
          <el-table-column prop="email" :label="$t('TellerManagementPage.email')" header-align="center" width="180">
          </el-table-column>
          <el-table-column prop="certificate" :label="$t('TellerManagementPage.blockChain')" header-align="center"
                           class="asset-mum"
                           width="290">
          </el-table-column>
          <el-table-column prop="createTime" :label="$t('TellerManagementPage.createTime')" header-align="center"
                           width="176">
          </el-table-column>
          <el-table-column prop="lockState" :label="$t('TellerManagementPage.state')" header-align="center"
                           :formatter="formatLockState"
                           width="80">
          </el-table-column>
          <el-table-column :label="$t('TellerManagementPage.operation')" header-align="center" width="320">
            <template slot-scope="scope">
              <el-button :disabled="isDisabledButton" size="mini" type="primary small" icon="el-icon-edit"
                         @click="editUser(scope.$index, scope.row)">{{$t('TellerManagementPage.modify')}}
              </el-button>
              <el-button :disabled="isDisabledButton" size="mini" type="warning" icon="el-icon-sold-out"
                         @click="lockOrUnLockUserOp(scope.$index, scope.row, '2')" v-if="scope.row.lockState == 1">
                {{$t('TellerManagementPage.lock')}}
              </el-button>
              <el-button :disabled="isDisabledButton" size="mini" type="warning" icon="el-icon-sold-out"
                         @click="lockOrUnLockUserOp(scope.$index, scope.row, '1')" v-if="scope.row.lockState == 2">
                {{$t('TellerManagementPage.unlock')}}
              </el-button>
              <el-button :disabled="isDisabledButton" size="mini" type="danger" icon="el-icon-delete"
                         @click="cancelUser(scope.$index, scope.row)">{{$t('TellerManagementPage.cancellation')}}
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- pagination 分页 -->
        <div class="block">
          <div align="center" style="margin-top:15px; margin-bottom:15px;">
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
      </template>
    </div>

    <el-dialog :title="dialogTitle" :visible.sync="recordFormShow" :before-close="handleClose" width="500px">
      <el-card class="box-card" v-loading="formloading">
        <el-form :model="record" :rules="rules" ref="recordForm" size="mini" label-width="90px">
          <el-form-item label="ID" prop="id" style="display:none">
            <el-input type="text" v-model="record.id"></el-input>
          </el-form-item>
          <el-form-item :label="$t('TellerManagementPage.name')" prop="realName">
            <el-input type="text" v-model="record.realName" :disabled="isDisabled.realName"
                      class="el-input-width"></el-input>
          </el-form-item>
          <el-form-item :label="$t('TellerManagementPage.phoneNumber')" prop="phone">
            <el-input type="text" v-model="record.phone" :disabled="isDisabled.phone" class="el-input-width"
                      @blur="isPhoneExists()"></el-input>
            <el-button size="mini" @click="isDisabled.phone = false" v-show="isShowBtn.phone">
              {{$t('addTellerPage.edit')}}
            </el-button>
          </el-form-item>
          <el-form-item :label="$t('TellerManagementPage.email')" prop="email">
            <el-input type="text" v-model="record.email" :disabled="isDisabled.email" class="el-input-width"
                      @blur="isEmailExists()"></el-input>
            <el-button size="mini" @click="isDisabled.email = false" v-show="isShowBtn.email">
              {{$t('addTellerPage.edit')}}
            </el-button>
          </el-form-item>
          <el-form-item :label="$t('TellerManagementPage.pwd')" prop="userPassword" class="log-input">
            <el-input type="password" v-model="record.userPassword" :disabled="isDisabled.userPassword"
                      class="el-input-width"></el-input>
            <el-button size="mini" @click="isDisabled.userPassword = false" v-show="isShowBtn.userPassword">
              {{$t('addTellerPage.edit')}}
            </el-button>
          </el-form-item>
          <el-form-item :label="$t('addTellerPage.selectRloe')" prop="region">
            <el-select v-model="record.userType" :placeholder="$t('addTellerPage.pleaseSelect')" style="width: 240px">
              <!-- <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option> -->
              <el-option :label="$t('TellerManagementPage.operator')" value="2"></el-option>
              <el-option :label="$t('TellerManagementPage.OperatingReviewer')" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('TellerManagementPage.blockChain')" prop="certificate"
                        :hidden="isDisabled.certificate" class="log-input">
            <el-input v-model="record.certificate" :disabled="isDisabled.certificateInput"
                      :hidden="isDisabled.certificate" class="el-input-width"></el-input>
          </el-form-item>
        </el-form>
        <div style="float: right;margin-bottom:20px;">
          <el-button size="mini" type="primary" @click="recordFormSubmit('recordForm')">{{$t('addTellerPage.submit')}}
          </el-button>
          <el-button size="mini" @click="recordFormShow = false">{{$t('addTellerPage.cancel')}}</el-button>
        </div>
      </el-card>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
  import {
    usreAdd,
    userLock,
    userCancle,
    companyUserList,
    userModify
  } from '../../assets/js/const';
  import Cookies from 'js-cookie';
  import {isvalidEmail} from '../../assets/js/utils';

  export default {
    data() {
      var checkPassword = (rule, value, callback) => {
        if (!value) {
          (!this.isDisabled.userPassword) ? callback(new Error(this.$t('addTellerPage.passwordRequired'))) : callback();
        } else {
          let reg = /^(?![^A-Z]+$)(?![^a-z]+$)(?!\D+$)[0-9A-Za-z]{8,16}$/;
          if (!reg.test(value)) {
            callback(new Error(this.$t('Passwordreset.rule')));
          } else {
            callback();
          }
        }
      };
      return {
        isDisabledButton: ((Cookies.get('companyStatus') + '') !== '111') || false,
        tableData: [],
        totalCount: 0,
        currentPage: 1,
        pagesize: 10,
        recordFormShow: false,
        recordForm: [],
        dialogTitle: '',
        formloading: false,
        record: {},
        // 修改页面，点击修改可编辑
        isDisabled: {
          phone: true,
          email: true,
          userPassword: true,
          realName: true,
          certificate: false,
          certificateInput: true
        },
        // 新增修改页面，用于控制是否显示"点击修改"按钮
        isShowBtn: {
          phone: true,
          email: true,
          userPassword: true
        },
        // 表单验证
        rules: {
          realName: [
            {required: true, message: this.$t('addTellerPage.usernameRequired'), trigger: 'blur'}
          ],
          phone: [
            {min: 11, max: 11, required: true, message: this.$t('addTellerPage.phoneLength'), trigger: 'blur'}
            // {min: 1, max: 11, required: true, message: this.$t('addTellerPage.phoneRequired'), trigger: 'blur'},
            // {min: 1, max: 11, message: this.$t('addTellerPage.phoneLength'), trigger: 'blur'}
          ],
          email: [
            {required: true, message: this.$t('addTellerPage.emailRequired'), trigger: 'blur', validator: isvalidEmail}
          ],
          userPassword: [
            {validator: checkPassword, trigger: 'blur'}
          ],
          userType: [
            {required: true, message: this.$t('addTellerPage.userTypeRequired'), trigger: 'blur'}
          ]
        }
      };
    },
    components: {},
    methods: {
      // 角色转换
      formatLockState: function (row, column) {
        return row.lockState === 1 ? this.$t('TellerManagementPage.normal') : this.$t('TellerManagementPage.locked');
      },
      formatUserType: function (row, column) {
        return row.userType === '2' ? this.$t('TellerManagementPage.operator') : this.$t('TellerManagementPage.OperatingReviewer');
      },
      handleSizeChange(val) {
      },
      // 校验手机号是否存在
      isCorrectSwift() {
        let reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
        let userEmail = this.record.email;
        if (reg.test(userEmail)) {
        } else {
          this.$message.error(this.$t('addTellerPage.emailRequired'));
        }
      },
      // 校验手机号是否存在
      isPhoneExists() {
        var that = this;
        if (that.record.phone && that.record.phone !== '') {
          that.POST('/common/companyOrg/checkEailOrPhoneModify', {
            'body': {
              'id': that.record.id,
              'phone': that.record.phone
            }
          }, function (response) {
            if (response.code === 300) {
              // console.log('手机号可用')
            } else if (response.code === 400) {
              that.$message({
                showClose: true,
                message: response.message,
                type: 'error'
              });
            }
          });
        }
      },
      // 校验邮箱是否存在
      isEmailExists() {
        let that = this;
        if (that.record.email && that.record.email !== '') {
          // let reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
          let reg = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
          let userEmail = this.record.email;
          if (reg.test(userEmail) && userEmail.length <= 50) {
          } else {
            that.$message.error(that.$t('addTellerPage.emailRequired'));
          }
          that.POST('/common/companyOrg/checkEailOrPhoneModify', {
            'body': {
              'id': that.record.id,
              'email': that.record.email
            }
          }, function (response) {
            if (response.code === 300) {
              // console.log('可用')
            } else if (response.code === 400) {
              that.$message({
                showClose: true,
                message: response.message,
                type: 'error'
              });
            }
          });
        }
      },
      handleCurrentChange(val) {
        var self = this;
        let that = this;
        let params = {};
        params.body = {};
        params.body.page = val;
        params.body.pageSize = 10;
        let jsonObject = params;
        // let userIdList = [];
        // let userBlockChainInfo = [];
        this.POST(companyUserList, jsonObject, function (res) {
          if (res.code === 300) {
            self.tableData = res.data;
            self.totalCount = res.totalCount;
            self.currentPage = res.page;
            self.pagesize = res.pageSize;
            // res.data.forEach(function(item, index) {
            //   userIdList.push(item.id + "");
            // });
            // that.POST(selectStuffsById, {'body': {"bussIds" : userIdList}}, function (res) {
            //   if(res.code === 300) {
            //     that.userBlockChainInfo = res.data;
            //     self.tableData.forEach(function(dataitem, dataindex) {
            //
            //       res.data.forEach(function(Infitem, Infindex) {
            //         // self.tableData[dataindex]['certificate'] = that.userBlockChainInf[Infindex].certificate;
            //         // console.log(dataitem.id, '=======', Infitem.bussId);
            //         if (dataitem.id == Infitem.bussId) {
            //           // console.log(self.tableData[dataindex]['certificate'] = '000')
            //         }
            //       })
            //
            //       // for (let j = 0 ; j < that.userBlockChainInfo.length ; j++) {
            //       //   if (userIdList[i] == that.userBlockChainInfo[j].bussId) {
            //       //   }
            //       // }
            //     });
            //   }
            // });
          } else if (res.code === 400) {
            that.$message({
              showClose: true,
              message: res.message,
              type: 'error'
            });
          }
        });
      },

      // 锁定/启用
      lockOrUnLockUserOp(index, row, opVal) {
        let confirmStr;
        let succeedStr;
        let that = this;
        let params = {};
        params.body = {};
        params.body.id = row.id;
        params.body.code = opVal;
        let jsonObject = params;
        if (opVal === '1') {
          confirmStr = this.$t('TellerManagementPage.sureEnable');
          succeedStr = this.$t('TellerManagementPage.success');
        } else {
          confirmStr = this.$t('TellerManagementPage.sureLock');
          succeedStr = this.$t('TellerManagementPage.success');
        }
        that.$confirm(confirmStr, this.$t('TellerManagementPage.tips'), {
          confirmButtonText: this.$t('TellerManagementPage.confirm'),
          cancelButtonText: this.$t('TellerManagementPage.cancel'),
          type: 'warning'
        })
          .then(() => {
            that.loading = true;
            that.POST(userLock, jsonObject, function (response) {
              if (response.code === 300) {
                // 注销成功
                that.$message({
                  showClose: true,
                  message: succeedStr,
                  type: 'success'
                });
                // 注销后刷新列表
                that.handleCurrentChange(1);
              } else if (response.code === 400) {
                that.$message({
                  showClose: true,
                  message: response.message,
                  type: 'error'
                });
              }
            });
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: this.$t('TellerManagementPage.canceled')
            });
          });
      },

      // 新增柜员
      addUser(recordForm) {
        this.record = {};
        // 清除验证信息
        if (this.$refs['recordForm']) {
          this.$refs['recordForm'].clearValidate();
        }
        if ((Cookies.get('companyStatus') + '') !== '111') {
          this.$message({
            showClose: true,
            message: this.$t('TellerManagementPage.companyUnPass'),
            type: 'error'
          });
          this.formloading = false;
          this.recordFormShow = false;
          return;
        }
        this.dialogTitle = this.$t('addTellerPage.addTitle');
        this.record = {};
        this.recordFormShow = true;
        // 新增页面，input可编辑
        this.isDisabled.userPassword = false;
        this.isDisabled.realName = false;
        this.isDisabled.phone = false;
        this.isDisabled.email = false;
        // 新增页面，不显示"点击修改"按钮
        this.isShowBtn.userPassword = false;
        this.isShowBtn.phone = false;
        this.isShowBtn.email = false;
        this.isDisabled.certificate = true;
      },

      // 修改柜员
      editUser(index, row) {
        // 清除验证信息
        if (this.$refs['recordForm']) {
          this.$refs['recordForm'].clearValidate();
        }
        this.dialogTitle = this.$t('addTellerPage.editTitle');
        this.record = JSON.parse(JSON.stringify(row)); // es6对象深拷贝
        this.recordFormShow = true;
        // 新增页面，input可编辑
        this.isDisabled.userPassword = true;
        this.isDisabled.realName = true;
        this.isDisabled.phone = true;
        this.isDisabled.email = true;
        // 新增页面，不显示"点击修改"按钮
        this.isShowBtn.userPassword = true;
        this.isShowBtn.phone = true;
        this.isShowBtn.email = true;
        this.isDisabled.certificate = false;
      },
      // 注销
      cancelUser(index, row) {
        let that = this;
        let params = {};
        params.body = {};
        params.body.id = row.id;
        let jsonObject = params;

        that.$confirm(this.$t('TellerManagementPage.sureRemove'), this.$t('TellerManagementPage.tips'), {
          confirmButtonText: this.$t('TellerManagementPage.confirm'),
          cancelButtonText: this.$t('TellerManagementPage.cancel'),
          type: 'warning'
        })
          .then(() => {
            that.loading = true;
            this.POST(userCancle, jsonObject, function (response) {
              if (response.code === 300) {
                // 注销成功
                that.$message({
                  showClose: true,
                  message: that.$t('TellerManagementPage.success'),
                  type: 'success'
                });
                // 注销后刷新列表
                that.handleCurrentChange(1);
              } else if (response.code === 400) {
                that.$message({
                  showClose: true,
                  message: response.message,
                  type: 'error'
                });
              }
            });
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: this.$t('TellerManagementPage.canceled')
            });
          });
      },
      handleClose() {
        this.$confirm(this.$t('TellerManagementPage.sureClose'), this.$t('TellerManagementPage.tips'), {
          confirmButtonText: this.$t('TellerManagementPage.confirm'),
          cancelButtonText: this.$t('TellerManagementPage.cancel'),
          type: 'warning'
        })
          .then(_ => {
            this.recordFormShow = false;
            // done();
          })
          .catch(_ => {
          });
      },

      // 柜员修改提交
      recordFormSubmit() {
        let that = this;
        if ((Cookies.get('companyStatus') + '') !== '111') {
          that.$message({
            showClose: true,
            message: that.$t('TellerManagementPage.companyUnPass'),
            type: 'error'
          });
          that.formloading = false;
          that.recordFormShow = false;
          return;
        }

        // TODO 做表单校验逻辑
        let params = {};
        params.body = {};
        params.body = that.record;
        this.formloading = true;
        let jsonObject = params;
        if (!this.record.id) {
          this.$refs['recordForm'].validate((valid) => {
            if (valid) {
              that.POST(usreAdd, jsonObject, function (response) {
                if (response.code === 300) {
                  // 添加管理员柜员成功
                  that.$message({
                    showClose: true,
                    message: that.$t('TellerManagementPage.success'),
                    type: 'success'
                  });
                  that.handleCurrentChange(1);
                }
              });
              that.formloading = false;
              that.recordFormShow = false;
            } else {
              that.formloading = false;
              return false;
            }
          });
        } else {
          this.$refs['recordForm'].validate((valid) => {
            if (valid) {
              that.POST(userModify, jsonObject, function (response) {
                if (response.code === 300) {
                  // 添加管理员柜员成功
                  that.$message({
                    showClose: true,
                    message: that.$t('TellerManagementPage.success'),
                    type: 'success'
                  });
                  that.handleCurrentChange(1);
                } else if (response.code === 400) {
                  that.$message({
                    showClose: true,
                    message: response.message,
                    type: 'error'
                  });
                }
              });
              that.formloading = false;
              that.recordFormShow = false;
            } else {
              that.formloading = false;
              return false;
            }
          });
        }
      }
      // 密码格式校验
      // passwordFormatValid() {
      //   let passwd = this.record.userPassword;
      //   let reg = /^(?![^A-Z]+$)(?![^a-z]+$)(?!\\D+$).{8,16}$/;
      //   if (reg.test(passwd)) {
      //     console.log('password format is true');
      //   } else {
      //     this.$message.error(this.$t('Passwordreset.rule'));
      //   }
      // }
    },
    created() {
      this.handleCurrentChange(1);
    }
  };
</script>
<style media="screen" lang="less">
  .tellermanage-main {
    width: 1100px;
    margin: 0 auto;
    .tellermanage-center {
      width: 100%;
    }
    .el-form-item--mini {
      .el-form-item__error {
        position: static;
      }
    }
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

  .add-teller {
    width: 90px;
    height: 30px;
    background: #3967c3;
    color: white;
    border-radius: 5px;
    border: none;
    outline: none;
    cursor: pointer;
  }

  .el-input-width {
    width: 73%;
  }
</style>
