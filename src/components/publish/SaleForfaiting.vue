<template id="">
  <div class="saleforfaiting-main clearfix saleforfaiting-main-xq" id="saleforfaiting-main">
    <div class="">
      <h1>{{$t('publishForfeiting.saleOfForfaitingEntryPage')}}</h1>
      <el-form :model="ruleForm" :inline="true" :rules="rules" ref="ruleForm" label-width="180px">
        <div style="border-bottom: 1px solid #dcdfe6;height: 500px" class="saleforfaiting-main-xq-top">
          <el-form-item :label="$t('assetsType.resource')" prop="resource" style="margin-left: 3px;text-align:left">
            <!-- router 跳转页签使用 -->
            <el-radio-group v-model="ruleForm.resource">
              <el-radio label="forfeiting" style="margin-right: 70px">{{$t('assetsType.forfeiting')}}</el-radio>
              <router-link v-if="!this.$route.query.iea" to="salefactoring">
                <el-radio label="factoring">{{$t('assetsType.factoring')}}</el-radio>
              </router-link>
            </el-radio-group>
          </el-form-item>
          <br>
          <el-form-item :label="$t('publishForfeiting.title')" prop="title" style="text-align:left">
            <el-input @blur="testTitle" v-model="ruleForm.title" type="text"
                      :placeholder="$t('publishForfeiting.titleAlert')" style="font-size: 12px"
                      class="el-input"></el-input>
          </el-form-item>
          <br>
          <!--{{fileList1}}-->
          <el-form-item :label="$t('publishForfeiting.ST0212')" prop="ST0212" class="saleforfaiting-title"
                        style="text-align:left;">
            <el-upload action="uploadFileUrl" :on-preview="handlePreviewAcceptanceOfElectricity"
                       :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="6"
                       :on-exceed="handleExceed"
                       :file-list="fileList1" :onError="uploadError"
                       :before-upload="beforeUploadAcceptanceOfElectricity" list-type="picture">
              <el-input v-model="ruleForm.ST0212" class="el-input" style="font-size: 8px;" hidden></el-input>
              <el-button v-if="fileList1.length<6" class="upload-button" type="primary"
                         style="font-size: 12px;width:150px;height:95px;background: #eaeaea;border: none;color: black">
                {{$t('publishForfeiting.upload')}}
              </el-button>
            </el-upload>
            <div class="fileList1-dialog" :style="{'left': fileList1DialogImgIndex + 'px'}" v-if="isfileList1Dialog"
                 @click="isfileList1Dialog = false">
              <img :src="fileList1DialogImg" alt="">
            </div>
          </el-form-item>
          <br>
          <el-form-item :label="$t('publishForfeiting.ST0201')" prop="ST0201" style="text-align:left">
            <el-upload action="" :on-preview="handlePreviewCreditLetter"
                       :on-remove="handleRemove1" :before-remove="beforeRemove" multiple :limit="6"
                       :on-exceed="handleExceed"
                       :file-list="fileList2" :onError="uploadError" :before-upload="beforeUploadCreditLetter"
                       list-type="picture">
              <el-input v-model="ruleForm.ST0201" class="el-input" style="font-size: 8px;" hidden></el-input>
              <el-button v-if="fileList2.length<6" type="primary"
                         style="font-size: 12px;width:150px;height:95px;background: #eaeaea;float: left;outline: none;border: none;color: black">
                {{$t('publishForfeiting.upload')}}
              </el-button>
            </el-upload>
            <div class="fileList2-dialog" :style="{'left': fileList2DialogImgIndex + 'px'}" v-if="isfileList2Dialog"
                 @click="isfileList2Dialog = false">
              <img :src="fileList2DialogImg" alt="">
            </div>
          </el-form-item><br/>
          <el-form-item class="uploadforfeiting" :label="$t('publishForfeiting.ST0202')" prop="ST0202" style="">
            <el-upload action="uploadFileUrl" :on-preview="handlePreviewForfeitingAgree"
                       :on-remove="handleRemove2" :before-remove="beforeRemove" multiple :limit="6"
                       :on-exceed="handleExceed"
                       :file-list="fileList3" :onError="uploadError" :before-upload="beforeUploadST0202" list-type="picture">
              <el-input v-model="ruleForm.ST0202" class="el-input_upload" style="font-size: 8px;width: 0px;" hidden></el-input>
              <el-button type="primary" v-if="fileList3.length<6"
                         style="font-size: 12px;width:150px;height:95px;background: #eaeaea;margin-left:-250px;border: none;margin-left: 1px;color: black">
                {{$t('publishForfeiting.upload')}}
              </el-button>
            </el-upload>

            <div class="fileList3-dialog" :style="{'left': fileList3DialogImgIndex + 'px'}" v-if="isfileList3Dialog"
                 @click="isfileList3Dialog = false">
              <img :src="fileList3DialogImg" alt="">
            </div>
            <!-- <a :href="uploadhref" target="_blank">1</a> -->
          </el-form-item>
        </div>

        <div class="el-form-main-xq el-form-three"
             style="border-bottom: 1px solid #dcdfe6;height: 245px;padding-top: 50px"
             :class="{'en-el-form-main-xq': $i18n.locale === 'en'}">
          <el-form-item :label="$t('publishForfeiting.openSwift')" prop="openSwift">
            <el-input v-model="ruleForm.openSwift" class="el-input"></el-input>
          </el-form-item>
          <el-form-item :label="$t('publishForfeiting.openFullName')" prop="openFullName">
            <el-input v-model="ruleForm.openFullName" class="el-input"></el-input>
          </el-form-item>
          <el-form-item :label="$t('publishForfeiting.tenderSwift')" prop="tenderSwift">
            <el-input v-model="ruleForm.tenderSwift" class="el-input"></el-input>
          </el-form-item>
          <el-form-item :label="$t('publishForfeiting.tenderFullName')" prop="tenderFullName"
                        class="forfeiting_div_margin_left">
            <el-input v-model="ruleForm.tenderFullName" class="el-input"></el-input>
          </el-form-item>
          <el-form-item :label="$t('publishForfeiting.reimbursingBankSwift')" prop="reimbursingBankSwift">
            <el-input v-model="ruleForm.reimbursingBankSwift" class="el-input"
                      style="width: 200px; margin-top: -15px;"></el-input>
          </el-form-item>
          <el-form-item :label="$t('publishForfeiting.reimbursingBankName')" prop="reimbursingBankName">
            <el-input v-model="ruleForm.reimbursingBankName" class="el-input"></el-input>
          </el-form-item>
          <el-form-item :label="$t('publishForfeiting.lcNo')" prop="lcNo" class="" required>
            <el-input v-model="ruleForm.lcNo" class="el-input"></el-input>
          </el-form-item>
          <el-form-item :label="$t('publishForfeiting.issuingDate')" prop="issuingDate" style="margin-left: 0px">
            <el-date-picker type="date" :placeholder="$t('checkInfo.pleaseCheckDate')" value-format="yyyy-MM-dd"
                            v-model="ruleForm.issuingDate" class="el-input">
            </el-date-picker>
          </el-form-item>
        </div>
        <div style="border-bottom: 1px solid #dcdfe6;height: 160px;padding-top: 50px;">

          <el-form-item :label="$t('publishForfeiting.acceptanceDate')">
            <el-form-item prop="acceptanceDate">
              <el-date-picker type="date" :placeholder="$t('checkInfo.pleaseCheckDate')"
                              v-model="ruleForm.acceptanceDate" value-format="yyyy-MM-dd"
                              style="width: 200px;" class="el-input" :picker-options="pickerOptions1">
              </el-date-picker>
            </el-form-item>
          </el-form-item>
          <el-form-item :label="$t('publishForfeiting.maturity')" style="margin-left: 85px">
            <el-form-item prop="maturity">
              <el-date-picker type="date" :placeholder="$t('checkInfo.pleaseCheckDate')"
                              v-model="ruleForm.maturity" class="el-input" value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
          </el-form-item>
          <el-form-item :label="$t('publishForfeiting.amount')" prop="amount">
            <el-input v-model="ruleForm.amount" class="el-input"></el-input>
          </el-form-item>
          <el-form-item :label="$t('publishForfeiting.currency')" style="margin-left: 95px" prop="currency" required>
            <el-select v-model="ruleForm.currency" :placeholder="$t('checkInfo.pleaseCheck')"
                       class="reg-input1 el-input">
              <el-option label="CNY" value="CNY"></el-option>
              <el-option label="USD" value="USD"></el-option>
              <el-option label="EUR" value="EUR"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div style="border-bottom: 1px solid #dcdfe6;height: 245px;padding-top: 50px;padding-bottom: 20px;">
          <el-form-item :label="$t('publishForfeiting.creditType')" prop="creditType" required>
            <el-select v-model="ruleForm.creditType" :placeholder="$t('checkInfo.pleaseCheck')"
                       class="reg-input1 el-input">
              <el-option label="NEGOTIATION" value="NEGOTIATION"></el-option>
              <el-option label="ACCEPTANCE" value="ACCEPTANCE"></el-option>
              <el-option label="DEF PAYMENT" value="DEF PAYMENT"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('publishForfeiting.discountRate')" prop="discountRate" style="margin-left:95px">
            <el-input v-model="ruleForm.discountRate" class="el-input"></el-input>
          </el-form-item>
          <el-form-item :label="$t('publishForfeiting.indateMessage')" style="" required>
            <el-form-item prop="indateMessage">
              <el-date-picker type="date" v-model="ruleForm.indateMessage" value-format="yyyy-MM-dd"
                              :placeholder="$t('checkInfo.pleaseCheckInvalidDate')" class="el-input"
                              :picker-options="pickerOptions0"></el-date-picker>
            </el-form-item>
          </el-form-item>
          <el-form-item :label="$t('publishForfeiting.debtType')" prop="debtType" style="margin-left: 85px">
            <el-select v-model="ruleForm.debtType" :placeholder="$t('checkInfo.pleaseCheck')"
                       class="reg-input1 el-input">
              <el-option :key="$t('creditLetterType.nationalName')" :label="$t('creditLetterType.nationalName')"
                         value="1"></el-option>
              <el-option :key="$t('creditLetterType.internationalName')"
                         :label="$t('creditLetterType.internationalName')" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('address.area')" prop="areaId">
            <el-select v-model="ruleForm.areaId" :placeholder="null" id="reg-type3" @change="getCountryId('0')">
              <el-option
                v-for="item in selectData.areaId.data"
                :key="item.name"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>



          <el-form-item :label="$t('address.country')" prop="countryId" style="margin-left: 95px">
            <el-select v-model="ruleForm.countryId" :placeholder="null" class="reg-type2">
              <el-option
                v-for="item in selectData.countryId.data"
                :key="item.name"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>


        </div>
        <el-form-item class="el-button_self" style="margin-left: 265px;margin-top: 90px;margin-bottom: 100px">
          <!--<el-button type="default" @click="prev">{{$t('publishForfeiting.prevBtn')}}</el-button>-->
          <el-button type="primary" style="width: 210px;height: 35px;background: #0183fd"
                     @click="submitForm('ruleForm', 1)">{{$t('publishForfeiting.saveBtn')}}
          </el-button>
          <el-button type="primary" style="width: 210px;height: 35px;margin-left: 160px;background: #0183fd"
                     @click="submitForm('ruleForm', 2)">{{$t('publishForfeiting.submitBtn')}}
          </el-button>
        </el-form-item>
        <!--</el-card>-->

        <div class="rig">
        </div>
      </el-form>
    </div>
  </div>

</template>
<script type="text/javascript">
  import {
    queryAllCountry,
    queryAllArea,
    forfeitingDetail,
    forfeitingUpdate,
    upLoadFile,
    ocrFileUpload,
    forfeitingInsert
  } from '../../assets/js/const';

  export default {
    components: {
      // Footer
    },
    data() {
      var checkDiscountRate = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.$t('publishForfeiting.inputDiscountRate')));
        } else {
          let reg = /^(([1-9][0-9]*)|(([0]\.\d{1,4}|[1-9][0-9]*\.\d{1,4})))$/;
          if (!reg.test(value)) {
            callback(new Error(this.$t('publishFactoring.numDecimal')));
          }
          if (parseInt(value)) {
            if (reg.test(value)) {
              if (parseInt(value) < 100) {
                // 保留小数点后四位的过滤器，尾数不四舍五入
                this.ruleForm.discountRate = Number(this.ruleForm.discountRate).toFixed(4);
                callback();
              } else {
                callback(new Error(this.$t('publishFactoring.numSection')));
              }
            } else {
              callback(new Error(this.$t('publishFactoring.numDecimal')));
            }
          }
        }
      };
      var testSwiftCode = (rule, value, callback) => {
        // let reg = /^[A-Z0-9]{11}$/;
        let reg = /(^[A-Z]{6}[A-Z0-9]{2}$)|(^[A-Z]{6}[A-Z0-9]{5}$)/;
        if (!value && rule.required && rule.isTenderSwift) {
          callback(new Error(this.$t('publishForfeiting.inputTenderSwift')));
        } else if (!value && rule.required && rule.isOpenSwift) {
          callback(new Error(this.$t('publishForfeiting.inputOpenSwift')));
        } else if (!reg.test(value) && value) {
          callback(new Error(this.$t('publishForfeiting.swiftCodeFormat')));
        } else {
          if (this.ruleForm.openSwift.length === 8) {
            this.ruleForm.openSwift = this.ruleForm.openSwift + 'XXX';
          }
          if (this.ruleForm.tenderSwift.length === 8) {
            this.ruleForm.tenderSwift = this.ruleForm.tenderSwift + 'XXX';
          }
          if (this.ruleForm.reimbursingBankSwift.length === 8) {
            this.ruleForm.reimbursingBankSwift = this.ruleForm.reimbursingBankSwift + 'XXX';
          }
          callback();
        }
      };
      var testAmount = (rule, value, callback) => {
        let reg = /^([1-9]\d{0,10})([.]?|(\.\d{1,2})?)$/;
        if (!value) {
          callback(new Error(this.$t('publishForfeiting.inputAmount')));
        } else if (!reg.test(value) && value) {
          callback(new Error(this.$t('publishForfeiting.inputValidAmount')));
        } else {
          // 保留小数点后两位的过滤器，尾数不四舍五入
          this.ruleForm.amount = Number(this.ruleForm.amount).toFixed(2);
          callback();
        }
      };
      return {
        filepdf: '',
        isfileList1Dialog: false,
        fileList1DialogImg: '',
        fileList1DialogImgIndex: null,
        isfileList2Dialog: false,
        fileList2DialogImg: '',
        fileList2DialogImgIndex: null,
        isfileList3Dialog: false,
        fileList3DialogImg: '',
        fileList3DialogImgIndex: null,
        uploadhref: '',
        pickerOptions0: {
          disabledDate: (time) => {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        pickerOptions1: {
          disabledDate: (time) => {
            return time.getTime() > Date.now();
          }
        },
        // 国家/地区
        selectData: {
          areaId: {},
          countryId: {}
        },
        labelPosition: 'right',
        active: 0,
        fileList1: [],
        fileList2: [],
        fileList3: [],
        acceptanceOfElectricityFileList: [],
        creditLetterFileList: [],
        ruleForm: {
          title: '',
          openSwift: '',
          tenderSwift: '',
          reimbursingBankSwift: '',
          resource: 'forfeiting',
          areaId: '',
          countryId: '',
          lcNo: '',
          openFullName: '',
          tenderFullName: '',
          reimbursingBankName: '',
          issuingDate: '',
          acceptanceDate: '',
          maturity: '',
          amount: '',
          currency: '',
          creditType: '',
          discountRate: '',
          indateMessage: '',
          ST0201: '',
          ST0202: '',
          ST0212: '',
          acceptanceOfElectricity: '',
          debtType: ''
        },
        rules: {
          title: [
            {required: true, message: this.$t('publishForfeiting.inputTitle'), trigger: 'blur'},
            {min: 5, max: 15, message: this.$t('publishForfeiting.titleLength'), trigger: 'blur'}
          ],
          lcNo: [
            {required: true, message: this.$t('publishForfeiting.inputLcNo'), trigger: 'blur'}
          ],
          currency: [
            {required: true, message: this.$t('publishForfeiting.inputCurrency'), trigger: 'blur'}
          ],
          tenderSwift: [
            {
              required: true,
              trigger: 'blur',
              isTenderSwift: true,
              validator: testSwiftCode
            }
          ],
          tenderFullName: [
            {required: true, message: this.$t('publishForfeiting.inputTenderFullName'), trigger: 'blur'},
            {min: 1, max: 50, message: this.$t('publishForfeiting.wordSize'), trigger: 'blur'}
          ],
          reimbursingBankName: [
            {min: 1, max: 50, message: this.$t('publishForfeiting.wordSize'), trigger: 'blur'}
          ],
          openFullName: [
            {required: true, message: this.$t('publishForfeiting.inputOpenFullName'), trigger: 'blur'},
            {min: 1, max: 50, required: true, message: this.$t('publishForfeiting.wordSize'), trigger: 'blur'}
          ],
          openSwift: [
            {
              required: true,
              trigger: 'blur',
              isOpenSwift: true,
              validator: testSwiftCode
            }
          ],
          reimbursingBankSwift: [
            {
              required: false,
              trigger: 'blur',
              validator: testSwiftCode
            }
          ],
          creditType: [
            {required: true, message: this.$t('publishForfeiting.inputCreditType'), trigger: 'blur'}
          ],
          amount: [
            {required: true, validator: testAmount, trigger: 'blur'}
          ],
          discountRate: [
            {required: true, validator: checkDiscountRate, trigger: 'blur'}
          ],
          issuingDate: [
            {type: 'string', required: true, message: this.$t('publishForfeiting.inputIssuingDate'), trigger: 'blur'}
          ],
          acceptanceDate: [
            {type: 'string', required: true, message: this.$t('publishForfeiting.inputAcceptanceDate'), trigger: 'blur'}
          ],
          indateMessage: [
            {
              type: 'string',
              required: true,
              message: this.$t('publishForfeiting.indateMessageAlert'),
              trigger: 'change'
            }
          ],
          countryId: [
            {required: true, message: this.$t('address.checkCountry'), trigger: 'change'}
          ],
          areaId: [
            {required: true, message: this.$t('address.checkArea'), trigger: 'change'}
          ]
        },
        ST0201Url: ''
      };
    },
    watch: {
      ruleForm() {
        this.getCountryId();
      },

      '$i18n.locale': function (newval, oldval) {
        console.log('newval:', newval, 'oldval:', oldval);
        this.getArea();
      }
    },
    created() {
      // 查询地区
      if (this.$route.query.id) {
        this.assetsReload(this.$route.query.id);
      } else {
        this.getArea();
      };
      // reSize();
    },
    mounted() {
    },
    methods: {
      // imgCss() {
      //   var img = document.getElementsByClassName('el-upload-list__item-thumbnail');
      //   console.log(img);
      //   img.style.width = '50px';
      //   img.style.height = '50px';
      // },
      testTitle() {
        let reg = /^([0-9a-zA-Z\u4E00-\u9FA5]+)([,，]{1,1})([0-9a-zA-Z\u4E00-\u9FA5]+)([,，]{1,1})([0-9a-zA-Z\u4E00-\u9FA5]+)$/;
        // 1Aa,2萨德,asdA阿德
        if (!reg.test(this.ruleForm.title)) {
          this.$message({
            type: 'error',
            message: this.$t('publishForfeiting.titleFormat')
          });
        }
        console.log(reg.test(this.ruleForm.title), '如：一年期，出铜，100万');
      },
      getArea() {
        // 查询地区
        let that = this;
        this.POST(queryAllArea, {}, function (response) {
          that.selectData.areaId = response;
          // that.ruleForm.areaId = response.data[0].id;
          // 查询国家
          that.getCountryId();
        });
      },
      assetsReload(id, assetsType) {
        let that = this;
        this.POST(forfeitingDetail, {body: {'id': id}}, function (response) {
          response.data.resource = 'forfeiting';
          that.ruleForm = response.data;
          that.ruleForm.debtType = response.data.debtType + '';
          that.ruleForm.areaId = Number(response.data.areaId);
          that.ruleForm.countryId = Number(response.data.countryId);
          var file201 = {};
          file201.url = response.data.ST0201;
          that.fileList2.push(file201);
          var file212 = {};
          file212.url = response.data.ST0212;
          that.fileList1.push(file212);
          var file202 = {};
          file202.url = response.data.ST0202;
          that.fileList1.push(file202);
          // console.log(response.data.ST0201);
          that.getArea();
        });
      },
      onSubmit() {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.$message({
            type: 'success',
            message: '恭喜你，表单提交成功!'
          });
          this.active = 0;
        }, 500);
      },
      submitForm(formName, btnType) {
        let that = this;
        let params = {};
        var str;
        if (btnType === '1') {
          str = this.$t('publishForfeiting.forfeitingSaveSuccess');
        } else {
          str = this.$t('publishForfeiting.forfeitingSubmitSuccess');
        }
        params.body = that.ruleForm;
        params.body.commitType = btnType;
        let jsonObject = params;
        if (this.$route.query.id) {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              let _data = jsonObject;
              delete _data.body.recheckReason;
              delete _data.body.recheckState;
              delete _data.body.resource;
              delete _data.body.creditLetter;
              _data.body.ST0201 = that.ST0201Url;
              _data.body.id = that.$route.query.id;
              console.log(_data);
              this.POST(forfeitingUpdate, _data, function (response) {
                if (response.code === 300) {
                  that.$message({
                    showClose: true,
                    message: str,
                    type: 'success'
                  });
                  that.$router.push({name: 'Myassets'});
                } else if (response.code === 400) {
                  that.$message({
                    showClose: true,
                    message: response.message,
                    type: 'error'
                  });
                }
              });
            }
          });
        } else {
          this.$refs[formName].validate((valid) => {
            if (valid) {
              let jsonObjectNew = params;
              jsonObjectNew.body.ST0201 = that.ST0201Url;
              console.log('swiftCode = > ' + this.ruleForm.openSwift);
              that.POST(forfeitingInsert, jsonObjectNew, function (response) {
                if (response.code === 300) {
                  // 添加管理员柜员成功
                  that.$message({
                    showClose: true,
                    message: str,
                    type: 'success'
                  });
                  that.$router.push({name: 'Myassets'});
                } else if (response.code === 400) {
                  that.$message({
                    showClose: true,
                    message: response.message,
                    type: 'error'
                  });
                }
              });
            } else {
              console.log('error submit!!');
              console.log('swiftCode = > ' + this.ruleForm.openSwift);
              console.log('swiftCode = > ' + this.ruleForm.openSwift.length);
              return false;
            }
          });
        }
      },
      getCountryId(val) {
        var that = this;
        that.POST(queryAllCountry, {'body': {'areaId': that.ruleForm.areaId}}, function (response) {
          if (!response.data.length > 0) {
            that.ruleForm.countryId = '';
            that.selectData.countryId = {};
            return;
          }
          if (val) {
            that.ruleForm.countryId = response.data[0].id;
            that.$refs['ruleForm'].validateField('areaId');
            that.$refs['ruleForm'].validateField('countryId');
          }
          that.selectData.countryId = response;
        });
      },
      // handleChangeCreditLetter(file, fileList) {
      //   this.creditLetterFileList = fileList;
      // },
      // 信用证上传
      beforeUploadCreditLetter(file, fileList2, response) {
        let that = this;
        console.log(file.name.split('.')[1]);
        const extension2 = file.name.split('.')[1] === 'jpg' || file.name.split('.')[1] === 'png' || file.name.split('.')[1] === 'jpeg' || file.name.split('.')[1] === 'zip' || file.name.split('.')[1] === 'rar' || file.name.split('.')[1] === 'pdf';
        // const isLt2M = file.size / 1024 / 1024 < 2
        if (!extension2) {
          console.log('上传模板只能是 png、jpg 格式!');
          // return extension || extension2 && isLt2M
          that.$message.warning(this.$t('publishForfeiting.picFormat'));
          return;
        }
        // if (!isLt2M) {
        //   console.log('上传模板大小不能超过 2MB!')
        // }
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        };
        that.uploadFileUrl = this.UpLoad(ocrFileUpload, {'config': config, 'data': file}, function (response) {
          console.log(response);
          if (response.code === 200) {
            that.ST0201Url += response.url + ';';
            that.$message(that.$t('publishForfeiting.uploadSuccess'));
            that.ruleForm.ST0201 = response.url;
            var files = {};
            files.url = response.url;
            that.fileList2.push(files);
            response.creditLetterData.date_of_issue && (that.ruleForm.issuingDate = response.creditLetterData.date_of_issue);
            // 信用证编号
            response.creditLetterData.documentary_credit_number && (that.ruleForm.lcNo = response.creditLetterData.documentary_credit_number);
            response.creditLetterData.date_of_expiry && (that.ruleForm.maturity = response.creditLetterData.date_of_expiry);
            // 币种
            response.creditLetterData.currency_code && (that.ruleForm.currency = response.creditLetterData.currency_code);
            // 承兑金额
            response.creditLetterData.amount && (that.ruleForm.amount = response.creditLetterData.amount);
            // 承兑行swift
            response.creditLetterData.drawee_bank && (that.ruleForm.tenderSwift = response.creditLetterData.drawee_bank);
            // 承兑行全名
            response.creditLetterData.drawee_bank_name && (that.ruleForm.tenderFullName = response.creditLetterData.drawee_bank_name);
            // 开证行swift
            response.creditLetterData.send_bank && (that.ruleForm.openSwift = response.creditLetterData.send_bank);
            // 开证行全名
            response.creditLetterData.send_bank_name && (that.ruleForm.openFullName = response.creditLetterData.send_bank_name);
            // 偿付行swift
            response.creditLetterData.recv_bank && (that.ruleForm.reimbursingBankSwift = response.creditLetterData.recv_bank);
            // 偿付行全名
            response.creditLetterData.recv_bank_name && (that.ruleForm.reimbursingBankName = response.creditLetterData.recv_bank_name);
          } else {
            that.$message(that.$t('publishForfeiting.uploadFailed'));
          }
        }, true);
      },
      // 承兑电上传
      beforeUploadAcceptanceOfElectricity(file, fileList1, response) {
        let that = this;
        console.log(file.name.split('.')[1]);
        const extension2 = file.name.split('.')[1] === 'jpg' || file.name.split('.')[1] === 'png' || file.name.split('.')[1] === 'jpeg' || file.name.split('.')[1] === 'zip' || file.name.split('.')[1] === 'rar' || file.name.split('.')[1] === 'pdf';
        // const isLt2M = file.size / 1024 / 1024 < 2
        if (!extension2) {
          console.log('上传模板只能是 png、jpg 格式!');
          // return extension || extension2 && isLt2M
          that.$message.warning(this.$t('publishForfeiting.picFormat'));
          return;
        }
        console.log('上传文件', response);
        // let that = this;
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        };
        that.uploadFileUrl = this.UpLoad(upLoadFile, {'config': config, 'data': file}, function (response) {
          if (response.code === 200) {
            that.$message(that.$t('publishForfeiting.uploadSuccess'));
            that.ruleForm.ST0212 = response.url;
            var files = {};
            if (file.name.split('.')[1] === 'jpg' || file.name.split('.')[1] === 'png' || file.name.split('.')[1] === 'jpeg') {
              files.url = response.url;
            } else if (file.name.split('.')[1] === 'pdf') {
              that.filepdf = response.url;
              files.url = '/static/img/pdf.png';
            }
            files.name = file.name;
            that.fileList1.push(files);
            console.log(that.fileList1);
          } else {
            that.$message(that.$t('publishForfeiting.uploadFailed'));
          }
        }, true);
      },
      // 福费廷协议上传
      beforeUploadST0202(file, response) {
        let that = this;
        console.log(file.name.split('.')[1]);
        const extension2 = file.name.split('.')[1] === 'jpg' || file.name.split('.')[1] === 'png' || file.name.split('.')[1] === 'jpeg' || file.name.split('.')[1] === 'zip' || file.name.split('.')[1] === 'rar' || file.name.split('.')[1] === 'pdf';
        // const isLt2M = file.size / 1024 / 1024 < 2
        if (!extension2) {
          // console.log('上传模板只能是 png、jpg 格式!');
          // return extension || extension2 && isLt2M
          that.$message.warning(this.$t('publishForfeiting.picFormat'));
          return;
        }
        console.log('上传文件', response);
        // let that = this;
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        };
        that.uploadFileUrl = this.UpLoad(upLoadFile, {'config': config, 'data': file}, function (response) {
          console.log(response);
          if (response.code === 200) {
            that.$message(that.$t('publishForfeiting.uploadSuccess'));
            that.ruleForm.ST0202 = response.url;
            var files = {};
            if (file.name.split('.')[1] === 'jpg' || file.name.split('.')[1] === 'png' || file.name.split('.')[1] === 'jpeg') {
              files.url = response.url;
            } else if (file.name.split('.')[1] === 'pdf') {
              that.filepdf = response.url;
              files.url = '/static/img/pdf.png';
            }
            files.name = file.name;
            that.fileList3.push(files);
            console.log(file.name.split('.')[1]);
            console.log(that.fileList3);
          } else {
            that.$message(that.$t('publishForfeiting.uploadFailed'));
          }
        }, true);
      },
      // 上传错误
      uploadError(response, file, fileList) {
        console.log('上传失败，请重试！');
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 6 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove() {

      },
      // 当图片超过六张之后清除按钮
      handleRemove(file, fileList) {
        this.fileList1 = fileList;
      },
      // 当图片超过六张之后清除按钮
      handleRemove1(file, fileList) {
        this.fileList2 = fileList;
      },
      // 当图片超过六张之后清除按钮
      handleRemove2(file, fileList) {
        this.fileList3 = fileList;
        console.log(file.name.split('.')[1]);
      },
      // 承兑电图片放大
      handlePreviewAcceptanceOfElectricity(files) {
        this.fileList1DialogImg = files.url;
        this.isfileList1Dialog = true;
        console.log(name);
        var suffix = files.name.split('.')[1];
        console.log(suffix);
        this.fileList1.forEach((item, index) => {
          if (suffix === 'pdf' && files.uid === item.uid) {
            window.open(this.filepdf);
            this.isfileList1Dialog = false;
          }
          if ((suffix === 'jpg' || suffix === 'png' || suffix === 'jpeg') && files.uid === item.uid && (document.documentElement.clientWidth || document.body.clientWidth) > 1700) {
            this.fileList1DialogImgIndex = (this.fileList1.length === 6) ? index * 140 : (index * 140) + 150;
          } else if (files.uid === item.uid && (document.documentElement.clientWidth || document.body.clientWidth) < 1700) {
            this.fileList1DialogImgIndex = (this.fileList1.length === 6) ? index * 80 : (index * 80) + 150;
          }
        });
      },
      // 信用证图片放大
      handlePreviewCreditLetter(files) {
        this.fileList2DialogImg = files.url;
        this.isfileList2Dialog = true;
        this.fileList2.forEach((item, index) => {
          if (files.uid === item.uid && (document.documentElement.clientWidth || document.body.clientWidth) > 1700) {
            this.fileList2DialogImgIndex = (this.fileList2.length === 6) ? index * 140 : (index * 140) + 150;
          } else if (files.uid === item.uid && (document.documentElement.clientWidth || document.body.clientWidth) < 1700) {
            this.fileList2DialogImgIndex = (this.fileList2.length === 6) ? index * 80 : (index * 80) + 150;
          }
        });
      },
      // 福费廷协议图片放大
      handlePreviewForfeitingAgree(file) {
        this.fileList3DialogImg = file.url;
        this.isfileList3Dialog = true;
        var suffix = file.name.split('.')[1];
        console.log(suffix);
        this.fileList3.forEach((item, index) => {
          if (suffix === 'pdf' && file.uid === item.uid) {
            window.open(this.filepdf);
            this.isfileList3Dialog = false;
          }
          if ((suffix === 'jpg' || suffix === 'png' || suffix === 'jpeg') && file.uid === item.uid && (document.documentElement.clientWidth || document.body.clientWidth) > 1700) {
            // window.open(this.ruleForm.ST0202);
            this.fileList3DialogImgIndex = (this.fileList3.length === 6) ? index * 140 : (index * 140) + 150;
          } else if (file.uid === item.uid && (document.documentElement.clientWidth || document.body.clientWidth) < 1700) {
            this.fileList3DialogImgIndex = (this.fileList3.length === 6) ? index * 80 : (index * 80) + 150;
          }
        });
      }

    }
  };
</script>
<style media="screen" lang="less">

  .saleforfaiting-main {
    .el-form-item.is-required .el-form-item__label:before {
      content: '';
      color: #f56c6c;
      margin-right: 4px;
    }
    .el-form-main-xq > .el-form-item {
      width: 510px;
    }
    width: 1100px;
    margin: 0 auto;
    .saleforfaiting-center {
      width: 100%;
    }
    .el-form-item__error {
      width: 230px;
    }
    .el-form-item__label {
      text-align: right;
      margin-right: 40px;
      font-size: 14px;
      color: #606266;
      line-height: 40px;
      padding: 0px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
    }
    .el-input {
      width: 200px;
    }
    .middle {
      float: left;
      margin-left: 400px;
      margin-top: -600px;
    }
    .rig {
      float: left;
      margin-left: 800px;
      margin-top: -500px;
    }
    .saleforfaiting-button {
      float: left;
    }

    .el-button_self {
      margin-left: 450px;
    }
    .el-upload-list {
      display: inline-block;
    }
    .el-upload-list--picture .el-upload-list__item {
      float: left;
      border: none;
      width: 135px;
      height: 95px;
    }
    .el-upload-list__item-thumbnail {
      width: 135px;
      height: 95px;
    }
    .el-upload {
      vertical-align: bottom;
    }
  }

  .saleforfaiting-main-xq {
    .el-upload-list__item-name {
      opacity: 0;
      -moz-opacity: 0;
      -khtml-opacity: 0;
    }
    .el-icon-close-tip {
      display: none;
    }
    .el-form-three {
      padding-bottom: 50px;
    }
    .saleforfaiting-main-xq-top{
      .el-form-item__label{
        text-align: left;
      }
    }
    .fileList1-dialog, .fileList2-dialog, .fileList3-dialog {
      position: absolute;
      width: 470px;
      height: 310px;
      z-index: 5;
      img {

        position: relative;
        height: 310px;
        display: block;
        width: 100%;
      }
    }
    .el-upload-list, .el-upload {
      display: block;
    }
    .el-upload-list--picture:after {
      content: ".";
      clear: both;
      height: 0;
      overflow: hidden;
      visibility: hidden;
      display: block;
    }
    .el-upload-list--picture {
      float: left;
      zoom: 1;
      .el-upload-list__item.is-success {
        margin-top: 0;
        padding: 0;
        margin-left: 5px;
        .el-upload-list__item-thumbnail {
          margin: 0;
          /*background: '../../../assets/img/pdf.png';*/
        }
        .el-upload-list__item-name {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 20px;
          left: 0px;
          z-index: 1;
        }
      }
    }
    .el-upload-list__item-status-label, .el-icon-close, .el-icon-close-tip {
      z-index: 3;
    }
    .el-upload--picture {
      float: left;
      .el-input {
        display: none;
      }
    }
    .en-el-form-main-xq {
      padding-bottom: 175px;
    }
  }
</style>
