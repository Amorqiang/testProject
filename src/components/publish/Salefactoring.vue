<template id="">
  <div class="salefactoring-main clearfix">
    <div class="salefactoring-center" style="padding-bottom:70px">
      <h1>{{$t('publishFactoring.saleOfFactoringEntryPage')}}</h1>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm"   class="saleforfaiting-form"
               style="margin-top: 5px; margin-bottom: 10px">
        <el-card v-show="showCurrent(0)">
          <el-form-item :label="$t('assetsType.resource')" prop="resource" style="margin-left: 4px">
            <el-radio-group v-model="ruleForm.resource">
              <router-link v-if="!this.$route.query.iea" to="saleforfaiting">
                <el-radio label="forfeiting" style="margin-right: 20px">{{$t('assetsType.forfeiting')}}</el-radio>
              </router-link>
              <el-radio label="factoring">{{$t('assetsType.factoring')}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <div class="salefactoring-main-stepone" style="border-top: 1px solid #dcdfe6;
          padding-top: 70px;border-bottom: 1px solid #dcdfe6;padding-bottom:70px">


          <div class="salefactoring-left">

            <el-form-item :label="$t('publishFactoring.seller')" prop="seller" class="saleforfaiting-title">
              <el-input v-model="ruleForm.seller" class="el-input"></el-input>
            </el-form-item>
            <el-form-item :label="$t('publishFactoring.country')" :placeholder="$t('checkInfo.pleaseCheck')" prop="areaId countryId" style="margin-left: 4px">
              <el-select v-model="ruleForm.countryId" :placeholder="$t('checkInfo.pleaseCheck')" class="reg-type2" style="margin-left: -4px">
                <el-option
                  v-for="item in selectData.countryId.data"
                  :key="item.name"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('publishFactoring.amount')" prop="amount"
                          style="">
              <el-input v-model="ruleForm.amount" class="el-input" ></el-input>
            </el-form-item>
            <el-form-item :label="$t('publishFactoring.indateMessage')">
              <el-form-item prop="indateMessage">
                <el-date-picker type="date" v-model="ruleForm.indateMessage"
                                :placeholder="$t('checkInfo.pleaseCheckInvalidDate')"
                                style="width: 200px;" value-format="yyyy-MM-dd"></el-date-picker>
              </el-form-item>
            </el-form-item>
            <el-form-item :label="$t('publishFactoring.maturity')" prop="maturity" required>
              <el-date-picker type="date" v-model="ruleForm.maturity" :placeholder="$t('checkInfo.pleaseCheck')"
                              style="width: 200px" value-format="yyyy-MM-dd">
              </el-date-picker>
            </el-form-item>
            <el-form-item :label="$t('publishFactoring.originators')" prop="originators" class="saleforfaiting-title">
              <el-input v-model="ruleForm.originators" class="el-input"></el-input>
            </el-form-item>

            <el-form-item :label="$t('publishFactoring.isCove')"  prop="isCove" style="margin-left: 4px">
              <el-radio-group v-model="ruleForm.isCove">
                <!--<router-link v-if="!this.$route.query.iea" to="saleforfaiting">-->
                  <el-radio label="1" style="margin-right: 20px">{{$t('publishFactoring.coveYes')}}</el-radio>
                <!--</router-link>-->
                <el-radio label="factoring">{{$t('publishFactoring.coveNo')}}</el-radio>
              </el-radio-group>
            </el-form-item>

            <!--<el-form-item :label="$t('publishFactoring.isCove')" prop="isCove">-->
              <!--<el-select v-model="ruleForm.isCove" :placeholder="$t('checkInfo.pleaseCheck')"-->
                         <!--class="reg-input1 el-input">-->
                <!--<el-option :label="$t('publishFactoring.coveYes')" value="1"></el-option>-->
                <!--<el-option :label="$t('publishFactoring.coveNo')" value="2"></el-option>-->
              <!--</el-select>-->
            <!--</el-form-item>-->



          </div>
          <div class="salefactoring-right" :class="{'en-salefactoring-right': $i18n.locale === 'en'}">
            <el-form-item :label="$t('publishFactoring.area')"  prop="areaId countryId" style="margin-left: 4px">
            <el-select v-model="ruleForm.areaId" :placeholder="$t('checkInfo.pleaseCheck')" id="reg-type3" @change="getCountryId"
            style="margin-left: -4px">
            <el-option
            v-for="item in selectData.areaId.data"
            :key="item.name"
            :label="item.name"
            :value="item.id">
            </el-option>
            </el-select>
            </el-form-item>
            <el-form-item :label="$t('publishFactoring.factoringType')" prop="factoringType">
              <el-select v-model="ruleForm.factoringType" :placeholder="$t('checkInfo.pleaseCheck')"
                         class="reg-input1 el-input">
                <el-option :label="$t('publishFactoring.typeOne')" value="1"></el-option>
                <el-option :label="$t('publishFactoring.typeTwo')" value="2"></el-option>
                <el-option :label="$t('publishFactoring.typeThree')" value="3"></el-option>
                <el-option :label="$t('publishFactoring.typeFour')" value="4"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('publishFactoring.currency')" prop="currency">
              <el-select v-model="ruleForm.currency" :placeholder="$t('checkInfo.pleaseCheck')"
                         class="reg-input1 el-input">
                <el-option label="CNY" value="CNY"></el-option>
                <el-option label="USD" value="USD"></el-option>
                <el-option label="EUR" value="EUR"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('publishFactoring.transferRate')" prop="transferRate">
              <el-input v-model.number="ruleForm.transferRate" class="el-input"></el-input>
            </el-form-item>
            <el-form-item :label="$t('publishFactoring.factoringName')" prop="factoringName"
                          class="saleforfaiting-title">
              <el-input v-model="ruleForm.factoringName" class="el-input"></el-input>
            </el-form-item>
            <el-form-item :label="$t('publishFactoring.obligors')" prop="obligors" class="saleforfaiting-title">
            <el-input v-model="ruleForm.obligors" class="el-input"></el-input>
            </el-form-item>
            <el-form-item :label="$t('publishFactoring.insurer')" prop="insurer" class="saleforfaiting-title">
              <el-input v-model="ruleForm.insurer" class="el-input"></el-input>
            </el-form-item>
          </div>
        </div>
          <el-form-item class="el-button_self" style="margin-left: 40%;margin-top:50px">
            <el-button style="width: 210px;height: 35px;background: #0183fd;" type="primary" @click="next">{{$t('publishFactoring.nextBtn')}}</el-button>
          </el-form-item>
        </el-card>
        <el-card v-show="showCurrent(1)">
          <el-form-item :label="$t('assetsType.resource')" prop="resource" style="margin-left: 4px">
            <el-radio-group v-model="ruleForm.resource">
              <router-link v-if="!this.$route.query.iea" to="saleforfaiting">
                <el-radio label="forfeiting" style="margin-right: 20px">{{$t('assetsType.forfeiting')}}</el-radio>
              </router-link>
              <el-radio label="factoring">{{$t('assetsType.factoring')}}</el-radio>
            </el-radio-group>
          </el-form-item>
          <div class="salefactoring-upload">
            <!--保理合同上传-->
            <!--{{fileListST0204}}-->
            <div class="nextsalefactoring-div" style="color: #ff0000">
              <el-form-item :label="$t('publishFactoring.ST0204')" prop="ST0204">
                <el-upload class="nextsalefactoring-upload" action="uploadFileUrl" :on-preview="handlePreviewST0204"
                           :on-remove="handleRemoveST0204" :before-remove="beforeRemove" multiple :limit="6"
                           :on-exceed="handleExceed"
                           :file-list="fileListST0204" :onError="uploadError" :before-upload="beforeUploadST0204" list-type="picture">
                  <el-button v-if="fileListST0204.length<6" size="small" style="font-size: 12px;width:150px;height:95px;background: #eaeaea;float: left;outline: none;border: none;color: black;" type="primary">{{$t('publishFactoring.upload')}}</el-button>
                  <el-input v-model="ruleForm.ST0204" class="el-input_upload" hidden></el-input>
                </el-upload>
                <div class="fileListST0204-dialog" :style="{'left': fileListST0204DialogImgIndex + 'px'}" v-if="isfileListST0204Dialog"
                     @click="isfileListST0204Dialog = false">
                  <img :src="fileListST0204DialogImg" alt="">
                </div>
              </el-form-item>
            </div>
            <!--货物保险单-->
            <div class="nextsalefactoring-div">
              <el-form-item :label="$t('publishFactoring.ST0209')">
                <el-upload action="uploadFileUrl" :on-preview="handlePreviewST0209"
                           :on-remove="handleRemoveST0209" :before-remove="beforeRemove" multiple :limit="6"
                           :on-exceed="handleExceed"
                           :file-list="fileListST0209" :onError="uploadError" :before-upload="beforeUploadST0209" list-type="picture">
                  <el-button v-if="fileListST0209.length<6" style="font-size: 12px;width:150px;height:95px;background: #eaeaea;float: left;outline: none;border: none;color: black;" size="small" type="primary">{{$t('publishFactoring.upload')}}</el-button>
                  <el-input v-model="ruleForm.ST0209" class="el-input_upload" hidden></el-input>
                </el-upload>
                <div class="fileListST0209-dialog" :style="{'left': fileListST0209DialogImgIndex + 'px'}" v-if="isfileListST0209Dialog"
                     @click="isfileListST0209Dialog = false">
                  <img :src="fileListST0209DialogImg" alt="">
                </div>
              </el-form-item>
            </div>
            <!--运输单据-->
            <div class="nextsalefactoring-div">
              <el-form-item :label="$t('publishFactoring.ST0206')">
                <el-upload action="uploadFileUrl" :on-preview="handlePreviewST0206"
                           :on-remove="handleRemoveST0206" :before-remove="beforeRemove" multiple :limit="6"
                           :on-exceed="handleExceed"
                           :file-list="fileListST0206" :onError="uploadError" :before-upload="beforeUploadST0206"  list-type="picture">
                  <el-button v-if="fileListST0206.length<6" style="font-size: 12px;width:150px;height:95px;background: #eaeaea;float: left;outline: none;border: none;color: black" size="small" type="primary">{{$t('publishFactoring.upload')}}</el-button>
                  <el-input v-model="ruleForm.ST0206" class="el-input_upload" hidden></el-input>
                </el-upload>
                <div class="fileListST0206-dialog" :style="{'left': fileListST0206DialogImgIndex + 'px'}" v-if="isfileListST0206Dialog"
                     @click="isfileListST0206Dialog = false">
                  <img :src="fileListST0206DialogImg" alt="">
                </div>

              </el-form-item>
            </div>
            <!--应收账款通知书-->
            <div class="nextsalefactoring-div">
              <el-form-item :label="$t('publishFactoring.ST0207')" style="color: #ff0000" prop="ST0207">
                <el-upload action="uploadFileUrl" :on-preview="handlePreviewST0207"
                           :on-remove="handleRemoveST0207" :before-remove="beforeRemove" multiple :limit="6"
                           :on-exceed="handleExceed"
                           :file-list="fileListST0207" :onError="uploadError" :before-upload="beforeUploadST0207" list-type="picture">
                  <el-button v-if="fileListST0207.length<6" style="font-size: 12px;width:150px;height:95px;background: #eaeaea;float: left;outline: none;border: none;color: black;" size="small" type="primary">{{$t('publishFactoring.upload')}}</el-button>
                  <el-input v-model="ruleForm.ST0207" class="el-input_upload" hidden></el-input>
                </el-upload>
                <div class="fileListST0207-dialog" :style="{'left': fileListST0207DialogImgIndex + 'px'}" v-if="isfileListST0207Dialog"
                     @click="isfileListST0207Dialog = false">
                  <img :src="fileListST0207DialogImg" alt="">
                </div>
              </el-form-item>
            </div>
            <!--财务报表上传-->
          <div class="nextsalefactoring-div">
            <el-form-item :label="$t('publishFactoring.ST0208')" style="color: #ff0000" prop="ST0208">
              <el-upload action="uploadFileUrl" :on-preview="handlePreviewST0208"
                         :on-remove="handleRemoveST0208" :before-remove="beforeRemove" multiple :limit="6"
                         :on-exceed="handleExceed"
                         :file-list="fileListST0208" :onError="uploadError" :before-upload="beforeUploadST0208" list-type="picture">
                <el-button v-if="fileListST0208.length<6" size="small" type="primary" style="font-size: 12px;width:150px;height:95px;background: #eaeaea;float: left;outline: none;border: none;color: black;">{{$t('publishFactoring.upload')}}</el-button>
                <el-input v-model="ruleForm.ST0208" class="el-input_upload" hidden></el-input>
              </el-upload>
              <div class="fileListST0208-dialog" :style="{'left': fileListST0208DialogImgIndex + 'px'}" v-if="isfileListST0208Dialog"
                   @click="isfileListST0208Dialog = false">

                <img :src="fileListST0208DialogImg" alt="">
              </div>
            </el-form-item>
          </div>
            <!--贸易合同-->
          <div class="nextsalefactoring-div">
            <el-form-item :label="$t('publishFactoring.ST0205')">
              <el-upload action="uploadFileUrl" :on-preview="handlePreviewST0205"
                         :on-remove="handleRemoveST0205" :before-remove="beforeRemove" multiple :limit="6"
                         :on-exceed="handleExceed"
                         :file-list="fileListST0205" :onError="uploadError" :before-upload="beforeUploadST0205" list-type="picture">
                <el-button v-if="fileListST0205.length<6" style="font-size: 12px;width:150px;height:95px;background: #eaeaea;float: left;outline: none;border: none;color: black" size="small" type="primary">{{$t('publishFactoring.upload')}}</el-button>
                <el-input v-model="ruleForm.ST0205" class="el-input_upload" hidden></el-input>
              </el-upload>
              <div class="fileListST0205-dialog" :style="{'left': fileListST0205DialogImgIndex + 'px'}" v-if="isfileListST0205Dialog"
                   @click="isfileListST0205Dialog = false">
                <img :src="fileListST0205DialogImg" alt="">
              </div>

            </el-form-item>
          </div>
          <div style="margin-left: 150px">
            <el-form-item>
              <el-button type="default" @click="prev" style="width: 85px;height: 35px;background: #0183fd;color:#fff;">{{$t('publishFactoring.prevBtn')}}</el-button>
              <el-button type="primary"
                         style="width: 210px;height: 35px;background: #0183fd;margin-left: 150px;
    margin-top: 100px;" @click="submitForm('ruleForm', '1')">
                {{$t('publishFactoring.saveBtn')}}
              </el-button>
              <el-button type="primary" @click="submitForm('ruleForm', '2')" style="width: 210px;height: 35px;margin-left: 480px;background: #0183fd;margin-top: -40px;
    float: left;">
                {{$t('publishFactoring.submitBtn')}}
              </el-button>
            </el-form-item>
          </div>
          </div>
        </el-card>
      </el-form>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {
    queryAllCountry,
    queryAllArea,
    factoryingInsert,
    selectUpdateData,
    factoryingUpdate,
    findBussAttachmentById,
    upLoadFile
  } from '../../assets/js/const';

  export default {
    components: {},
    data() {
      var checkTransferRate = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.$t('publishFactoring.inputTransferRate')));
        } else {
          let reg = /^(([1-9][0-9]*)|(([0]\.\d{1,4}|[1-9][0-9]*\.\d{1,4})))$/;
          if (!reg.test(value)) {
            callback(new Error(this.$t('publishFactoring.numDecimal')));
          }
          if (parseInt(value)) {
            if (reg.test(value)) {
              if (parseInt(value) < 100) {
                // 保留小数点后四位的过滤器，尾数不四舍五入
                this.ruleForm.transferRate = Number(this.ruleForm.transferRate).toFixed(4);
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
      var checkAmount = (rule, value, callback) => {
        let reg = /^([1-9]\d{0,10})([.]?|(\.\d{1,2})?)$/;
        if (!value) {
          callback(new Error(this.$t('publishFactoring.inputAmount')));
        } else if (!reg.test(value) && value) {
          callback(new Error(this.$t('publishForfeiting.inputValidAmount')));
        } else {
          // 保留小数点后两位的过滤器，尾数不四舍五入
          this.ruleForm.amount = Number(this.ruleForm.amount).toFixed(2);
          callback();
        }
      };
      var checkST0208 = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.$t('publishFactoring.inputST0208')));
        } else {
          callback();
        }
      };
      var checkST0204 = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.$t('publishFactoring.inputST0204')));
        } else {
          callback();
        }
      };
      var checkST0207 = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.$t('publishFactoring.inputST0207')));
        } else {
          callback();
        }
      };
      return {
        filepdf: '',
        isfileListST0208Dialog: false,
        fileListST0208DialogImg: '',
        fileListST0208DialogImgIndex: null,
        fileListST0208: [],
        isfileListST0204Dialog: false,
        fileListST0204DialogImg: '',
        fileListST0204DialogImgIndex: null,
        fileListST0204: [],
        isfileListST0207Dialog: false,
        fileListST0207DialogImg: '',
        fileListST0207DialogImgIndex: null,
        fileListST0207: [],
        isfileListST0209Dialog: false,
        fileListST0209DialogImg: '',
        fileListST0209DialogImgIndex: null,
        fileListST0209: [],
        isfileListST0206Dialog: false,
        fileListST0206DialogImg: '',
        fileListST0206DialogImgIndex: null,
        fileListST0206: [],
        isfileListST0205Dialog: false,
        fileListST0205DialogImg: '',
        fileListST0205DialogImgIndex: null,
        fileListST0205: [],
        // 国家地区
        selectData: {
          areaId: {},
          countryId: {}
        },
        labelPosition: 'right',
        active: 0,
        isInputShow: {
          'ST0204': false,
          'ST0205': false,
          'ST0206': false,
          'ST0207': false,
          'ST0208': false,
          'ST0209': false
        },
        fileList: [],
        ruleForm: {
          factoringName: '',
          countryId: '',
          areaId: '',
          commitType: '',
          seller: '',
          factoringType: '',
          currency: '',
          amount: '',
          transferRate: '',
          maturity: '',
          indateMessage: '',
          originators: '',
          obligors: '',
          isCove: '',
          insurer: '',
          'ST0204': '',
          'ST0205': '',
          'ST0206': '',
          'ST0207': '',
          'ST0208': '',
          'ST0209': '',
          resource: 'factoring',
          desc: ''
        },
        rules: {
          seller: [
            {required: true, message: this.$t('publishFactoring.inputSeller'), trigger: 'blur'}
          ],
          factoringName: [
            {required: true, message: this.$t('publishFactoring.inputFactorFullName'), trigger: 'blur'}
          ],
          factoringType: [
            {required: true, message: this.$t('publishFactoring.inputFactoringType'), trigger: 'change'}
          ],
          currency: [
            {required: true, message: this.$t('publishFactoring.inputCurrency'), trigger: 'change'}
          ],
          amount: [
            {validator: checkAmount, trigger: 'blur'}
          ],
          transferRate: [
            {validator: checkTransferRate, trigger: 'blur'}
          ],
          isCove: [
            {required: true, message: this.$t('publishFactoring.inputIsCove'), trigger: 'change'}
          ],
          countryId: [
            {required: true, message: this.$t('address.checkCountry'), trigger: 'change'}
          ],
          areaId: [
            {required: true, message: this.$t('address.checkArea'), trigger: 'change'}
          ],
          maturity: [
            {type: 'string', required: true, message: this.$t('publishFactoring.inputMaturity'), trigger: 'change'}
          ],
          indateMessage: [
            {
              type: 'string',
              required: true,
              message: this.$t('publishFactoring.inputInvalidateMessage'),
              trigger: 'change'
            }
          ],
          // originators: [
          //   {required: true, message: '请输入原始债权人', trigger: 'change'}
          // ],
          // obligors: [
          //   {required: true, message: '请输入原始债务人', trigger: 'change'}
          // ],
          ST0204: [
            {validator: checkST0204, trigger: 'change'}
          ],
          // ST0205: [
          //   { required: true, message: '请上传贸易合同', trigger: 'blur'}
          // ],
          // ST0206: [
          //   { required: true, message: '请上传运输单据', trigger: 'blur'}
          // ],
          ST0207: [
            {validator: checkST0207, trigger: 'change'}
          ],
          ST0208: [
            {validator: checkST0208, trigger: 'change'}
          ]
          // ST0209: [
          //   { required: true, message: '请上传保险合同', trigger: 'blur'}
          // ]
        }
      };
    },
    watch: {
      '$i18n.locale': function (newval, oldval) {
        console.log('newval:', newval, 'oldval:', oldval);
        this.getArea();
      }
    },
    created() {
      this.getArea();
    },
    mounted() {
      if (this.$route.query.id) {
        this.assetsReload(this.$route.query.id);
      }
    },
    methods: {
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
      assetsReload(id) {
        let that = this;
        this.POST(selectUpdateData, {'body': {'id': id}}, function (response) {
          that.ruleForm = response.data;
          that.ruleForm.resource = 'factoring';
          that.ruleForm.debtType = response.data.debtType + '';
          that.ruleForm.factoringType = response.data.factoringType + '';
          that.ruleForm.isCove = response.data.isCove + '';
          that.ruleForm.areaId = Number(response.data.areaId);
          that.ruleForm.countryId = Number(response.data.countryId);
          var file204 = {};
          file204.url = response.data.ST0204;
          that.fileListST0204.push(file204);
          this.isfileListST0204Dialog = false;
          var file205 = {};
          file205.url = response.data.ST0205;
          that.fileListST0205.push(file205);
          this.isfileListST0205Dialog = false;
          var file206 = {};
          file206.url = response.data.ST0206;
          that.fileListST0206.push(file206);
          this.isfileListST0206Dialog = false;
          var file207 = {};
          file207.url = response.data.ST0207;
          that.fileListST0207.push(file207);
          this.isfileListST0207Dialog = false;
          var file208 = {};
          file208.url = response.data.ST0208;
          that.fileListST0208.push(file208);
          this.isfileListST0208Dialog = false;
          var file209 = {};
          file209.url = response.data.ST0209;
          that.fileListST0209.push(file209);
          this.isfileListST0209Dialog = false;
          that.POST(findBussAttachmentById, {'body': {'id': id}}, function (response) {
            response.data.forEach(function (item, index) {
              that.ruleForm[item.paramCode] = item.attachmentUrl;
              console.log(that.ruleForm[item.paramCode], '====', item.attachmentUrl);
            });
          });
        });
      },
      showCurrent(step) {
        return this.active === step;
      },
      prev() {
        if (this.active >= 0) this.active--;
      },
      next() {
        if (this.active < 1) this.active++;
      },
      onSubmit() {
        // this.active++
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.$message({
            type: 'success',
            message: this.$t('marketForfeiting.formSubmittedSuccessfully')
          });
          this.active = 0;
        }, 500);
      },
      submitForm(formName, btnType) {
        let that = this;
        console.log(that.ruleForm.maturity);

        let params = {};
        var str;
        if (btnType === '1') {
          str = that.$t('publishFactoring.saveSuccess');
        } else {
          str = that.$t('publishFactoring.submitSuccess');
        }
        params.body = that.ruleForm;
        params.body.commitType = btnType;
        let jsonObject = params;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.$route.query.id) {
              let _data = jsonObject;
              _data.body.id = that.$route.query.id;
              this.POST(factoryingUpdate, _data, function (response) {
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
            } else {
              that.POST(factoryingInsert, jsonObject, function (response) {
                if (response.code === 300) {
                  // 添加管理员柜员成功
                  that.$message({
                    showClose: true,
                    message: str,
                    type: 'success'
                  });
                  that.$router.push({path: '/myassets'});
                } else if (response.code === 400) {
                  that.$message({
                    showClose: true,
                    message: response.message,
                    type: 'error'
                  });
                }
              });
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
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
          // that.ruleForm.countryId = response.data[0].id;
          that.selectData.countryId = response;
        });
      },
      // 保理合同上传
      beforeUploadST0204(file, response) {
        console.log('上传文件', response);
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
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        };
        that.uploadFileUrl = this.UpLoad(upLoadFile, {'config': config, 'data': file}, function (response) {
          console.log(response);
          if (response.code === 200) {
            that.$message(that.$t('publishFactoring.uploadSuccess'));
            // that.isInputShow.ST0204 = true;
            that.ruleForm.ST0204 = response.url;
            that.imgUpload = response.url;
            var files = {};
            if (file.name.split('.')[1] === 'jpg' || file.name.split('.')[1] === 'png' || file.name.split('.')[1] === 'jpeg') {
              files.url = response.url;
            } else if (file.name.split('.')[1] === 'pdf') {
              that.filepdf = response.url;
              files.url = '/static/img/pdf.png';
            } else if (file.name.split('.')[1] === 'rar') {
              that.filepdf = response.url;
              files.url = '/static/img/rar.png';
            } else if (file.name.split('.')[1] === 'zip') {
              that.filepdf = response.url;
              files.url = '/static/img/zip.png';
            }
            // files.url = response.url;
            files.name = file.name;
            that.fileListST0204.push(files);
            console.log(that.fileListST0204);
          } else {
            that.$message(that.$t('publishFactoring.uploadFailed'));
          }
        }, true);
      },
      // 保理合同图片放大
      handlePreviewST0204(files) {
        this.fileListST0204DialogImg = files.url;
        this.isfileListST0204Dialog = true;
        console.log(files.name);
        var suffix = files.name.split('.')[1];
        console.log(suffix);
        this.fileListST0204.forEach((item, index) => {
          if (suffix === 'pdf' && files.uid === item.uid) {
            window.open(this.filepdf);
            this.isfileListST0204Dialog = false;
          }
          if (suffix === 'zip' && files.uid === item.uid) {
            // window.open(this.filepdf);
            this.isfileListST0204Dialog = false;
          }
          if (suffix === 'rar' && files.uid === item.uid) {
            // window.open(this.filepdf);
            this.isfileListST0204Dialog = false;
          }
          if ((suffix === 'jpg' || suffix === 'png' || suffix === 'jpeg') && files.uid === item.uid && (document.documentElement.clientWidth || document.body.clientWidth) > 1700) {
            this.fileListST0204DialogImgIndex = (this.fileListST0204.length === 6) ? index * 140 : (index * 140) + 350;
          } else if (files.uid === item.uid && (document.documentElement.clientWidth || document.body.clientWidth) < 1700) {
            this.fileListST0204DialogImgIndex = (this.fileListST0204.length === 6) ? index * 140 : (index * 140) + 150;
          }
        });
      },
      // 当图片超过六张之后上传按钮自动消失
      handleRemoveST0204(file, fileList) {
          this.fileListST0204 = fileList;
      },
      beforeUploadST0205(file, response) {
        console.log('上传文件', response);
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
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        };
        that.uploadFileUrl = this.UpLoad(upLoadFile, {'config': config, 'data': file}, function (response) {
          console.log(response);
          if (response.code === 200) {
            that.$message(that.$t('publishFactoring.uploadSuccess'));
            // that.isInputShow.ST0205 = true;
            that.ruleForm.ST0205 = response.url;
            that.imgUpload = response.url;
            var files = {};
            if (file.name.split('.')[1] === 'jpg' || file.name.split('.')[1] === 'png' || file.name.split('.')[1] === 'jpeg') {
              files.url = response.url;
            } else if (file.name.split('.')[1] === 'pdf') {
              that.filepdf = response.url;
              files.url = '/static/img/pdf.png';
            } else if (file.name.split('.')[1] === 'rar') {
              that.filepdf = response.url;
              files.url = '/static/img/rar.png';
            } else if (file.name.split('.')[1] === 'zip') {
              that.filepdf = response.url;
              files.url = '/static/img/zip.png';
            }
            // files.url = response.url;
            files.name = file.name;
            that.fileListST0205.push(files);
            console.log(that.fileListST0204);
          } else {
            that.$message(that.$t('publishFactoring.uploadFailed'));
          }
        }, true);
      },
      // 贸易合同图片放大
      handlePreviewST0205(files) {
        this.fileListST0205DialogImg = files.url;
        this.isfileListST0205Dialog = true;
        console.log(files.name);
        var suffix = files.name.split('.')[1];
        console.log(suffix);
        this.fileListST0205.forEach((item, index) => {
          if (suffix === 'pdf' && files.uid === item.uid) {
            window.open(this.filepdf);
            this.isfileListST0205Dialog = false;
          }
          if (suffix === 'zip' && files.uid === item.uid) {
            // window.open(this.filepdf);
            this.isfileListST0205Dialog = false;
          }
          if (suffix === 'rar' && files.uid === item.uid) {
            // window.open(this.filepdf);
            this.isfileListST0205Dialog = false;
          }
          if ((suffix === 'jpg' || suffix === 'png' || suffix === 'jpeg') && files.uid === item.uid && (document.documentElement.clientWidth || document.body.clientWidth) > 1700) {
            this.fileListST0205DialogImgIndex = (this.fileListST0205.length === 6) ? index * 140 : (index * 140) + 150;
          } else if (files.uid === item.uid && (document.documentElement.clientWidth || document.body.clientWidth) < 1700) {
            this.fileListST0205DialogImgIndex = (this.fileListST0205.length === 6) ? index * 140 : (index * 140) + 150;
          }
        });
      },
      // 当图片超过六张之后上传按钮自动消失
      handleRemoveST0205(file, fileList) {
        this.fileListST0205 = fileList;
      },
      beforeUploadST0206(file, response) {
        console.log('上传文件', response);
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
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        };
        that.uploadFileUrl = this.UpLoad(upLoadFile, {'config': config, 'data': file}, function (response) {
          console.log(response);
          if (response.code === 200) {
            that.$message(that.$t('publishFactoring.uploadSuccess'));
            that.isInputShow.ST0206 = true;
            that.ruleForm.ST0206 = response.url;
            that.imgUpload = response.url;
            var files = {};
            if (file.name.split('.')[1] === 'jpg' || file.name.split('.')[1] === 'png' || file.name.split('.')[1] === 'jpeg') {
              files.url = response.url;
            } else if (file.name.split('.')[1] === 'pdf') {
              that.filepdf = response.url;
              files.url = '/static/img/pdf.png';
            } else if (file.name.split('.')[1] === 'rar') {
              that.filepdf = response.url;
              files.url = '/static/img/rar.png';
            } else if (file.name.split('.')[1] === 'zip') {
              that.filepdf = response.url;
              files.url = '/static/img/zip.png';
            }
            // files.url = response.url;
            files.name = file.name;
            that.fileListST0206.push(files);
            console.log(that.fileListST0206);
          }
        }, true);
      },
      handlePreviewST0206(files) {
        this.fileListST0206DialogImg = files.url;
        this.isfileListST0206Dialog = true;
        console.log(files.name);
        var suffix = files.name.split('.')[1];
        console.log(suffix);
        this.fileListST0206.forEach((item, index) => {
          if (suffix === 'pdf' && files.uid === item.uid) {
            window.open(this.filepdf);
            this.isfileListST0206Dialog = false;
          }
          if (suffix === 'zip' && files.uid === item.uid) {
            // window.open(this.filepdf);
            this.isfileListST0206Dialog = false;
          }
          if (suffix === 'rar' && files.uid === item.uid) {
            // window.open(this.filepdf);
            this.isfileListST0206Dialog = false;
          }
          if ((suffix === 'jpg' || suffix === 'png' || suffix === 'jpeg') && files.uid === item.uid && (document.documentElement.clientWidth || document.body.clientWidth) > 1700) {
            this.fileListST0206DialogImgIndex = (this.fileListST0206.length === 6) ? index * 140 : (index * 140) + 150;
          } else if (files.uid === item.uid && (document.documentElement.clientWidth || document.body.clientWidth) < 1700) {
            this.fileListST0206DialogImgIndex = (this.fileListST0206.length === 6) ? index * 140 : (index * 140) + 150;
          }
        });
      },
      handleRemoveST0206(file, fileList) {
        this.fileListST0206 = fileList;
      },
      beforeUploadST0207(file, response) {
        console.log('上传文件', response);
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
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        };
        that.uploadFileUrl = this.UpLoad(upLoadFile, {'config': config, 'data': file}, function (response) {
          console.log(response);
          if (response.code === 200) {
            that.$message(that.$t('publishForfeiting.uploadSuccess'));
            that.ruleForm.ST0207 = response.url;
            that.imgUpload = response.url;
            var files = {};
            if (file.name.split('.')[1] === 'jpg' || file.name.split('.')[1] === 'png' || file.name.split('.')[1] === 'jpeg') {
              files.url = response.url;
            } else if (file.name.split('.')[1] === 'pdf') {
              that.filepdf = response.url;
              files.url = '/static/img/pdf.png';
            } else if (file.name.split('.')[1] === 'rar') {
              that.filepdf = response.url;
              files.url = '/static/img/rar.png';
            } else if (file.name.split('.')[1] === 'zip') {
              that.filepdf = response.url;
              files.url = '/static/img/zip.png';
            }
            // files.url = response.url;
            files.name = file.name;
            // files.name = response.name;
            that.fileListST0207.push(files);
            console.log(that.fileListST0207);
          } else {
            that.$message(that.$t('publishForfeiting.uploadFailed'));
          }
        }, true);
      },
      // 应收账款图片放大
      handlePreviewST0207(files) {
        this.fileListST0207DialogImg = files.url;
        this.isfileListST0207Dialog = true;
        console.log(files.name);
        var suffix = files.name.split('.')[1];
        console.log(suffix);
        this.fileListST0207.forEach((item, index) => {
          if (suffix === 'pdf' && files.uid === item.uid) {
            window.open(this.filepdf);
            this.isfileListST0207Dialog = false;
          }
          if (suffix === 'zip' && files.uid === item.uid) {
            // window.open(this.filepdf);
            this.isfileListST0207Dialog = false;
          }
          if (suffix === 'rar' && files.uid === item.uid) {
            // window.open(this.filepdf);
            this.isfileListST0207Dialog = false;
          }
          if ((suffix === 'jpg' || suffix === 'png' || suffix === 'jpeg') && files.uid === item.uid && (document.documentElement.clientWidth || document.body.clientWidth) > 1700) {
            this.fileListST0207DialogImgIndex = (this.fileListST0207.length === 6) ? index * 140 : (index * 140) + 150;
          } else if (files.uid === item.uid && (document.documentElement.clientWidth || document.body.clientWidth) < 1700) {
            this.fileListST0207DialogImgIndex = (this.fileListST0207.length === 6) ? index * 140 : (index * 140) + 150;
          }
        });
      },
      // 当图片超过六张之后上传按钮自动消失
      handleRemoveST0207(file, fileList) {
        this.fileListST0207 = fileList;
      },
      // 财务报表上传
      beforeUploadST0208(file, response) {
        console.log('上传文件', response);
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
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        };
        that.uploadFileUrl = this.UpLoad(upLoadFile, {'config': config, 'data': file}, function (response) {
          console.log(response);
          if (response.code === 200) {
            that.$message(that.$t('publishFactoring.uploadSuccess'));
            that.ruleForm.ST0208 = response.url;
            that.imgUpload = response.url;
            var files = {};
            if (file.name.split('.')[1] === 'jpg' || file.name.split('.')[1] === 'png' || file.name.split('.')[1] === 'jpeg') {
              files.url = response.url;
            } else if (file.name.split('.')[1] === 'pdf') {
              that.filepdf = response.url;
              files.url = '/static/img/pdf.png';
            } else if (file.name.split('.')[1] === 'rar') {
              that.filepdf = response.url;
              files.url = '/static/img/rar.png';
            } else if (file.name.split('.')[1] === 'zip') {
              that.filepdf = response.url;
              files.url = '/static/img/zip.png';
            }
            // files.url = response.url;
            files.name = file.name;
            that.fileListST0208.push(files);
            console.log(that.fileListST0208);
          } else {
            that.$message(that.$t('publishFactoring.uploadFailed'));
          }
        }, true);
      },
      // 财务报表图片放大
      handlePreviewST0208(files) {
        this.fileListST0208DialogImg = files.url;
        this.isfileListST0208Dialog = true;
        console.log(files.name);
        var suffix = files.name.split('.')[1];
        console.log(suffix);
        this.fileListST0208.forEach((item, index) => {
          if (suffix === 'pdf' && files.uid === item.uid) {
            window.open(this.filepdf);
            this.isfileListST0208Dialog = false;
          }
          if (suffix === 'zip' && files.uid === item.uid) {
            // window.open(this.filepdf);
            this.isfileListST0208Dialog = false;
          }
          if (suffix === 'rar' && files.uid === item.uid) {
            // window.open(this.filepdf);
            this.isfileListST0208Dialog = false;
          }
          if ((suffix === 'jpg' || suffix === 'png' || suffix === 'jpeg') && files.uid === item.uid && files.uid === item.uid && (document.documentElement.clientWidth || document.body.clientWidth) > 1700) {
            this.fileListST0208DialogImgIndex = (this.fileListST0208.length === 6) ? index * 140 : (index * 140) + 291;
          } else if (files.uid === item.uid && (document.documentElement.clientWidth || document.body.clientWidth) < 1700) {
            this.fileListST0208DialogImgIndex = (this.fileListST0208.length === 6) ? index * 140 : (index * 140) + 350;
          }
        });
      },
      // 当图片超过六张之后上传按钮自动消失
      handleRemoveST0208(file, fileList) {
        this.fileListST0208 = fileList;
      },
      // 货物保险单
      beforeUploadST0209(file, response) {
        console.log('上传文件', response);
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
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        };
        that.uploadFileUrl = this.UpLoad(upLoadFile, {'config': config, 'data': file}, function (response) {
          console.log(response);
          if (response.code === 200) {
            that.$message(that.$t('publishFactoring.uploadSuccess'));
            // that.isInputShow.ST0209 = true;
            that.ruleForm.ST0209 = response.url;
            that.imgUpload = response.url;
            var files = {};
            if (file.name.split('.')[1] === 'jpg' || file.name.split('.')[1] === 'png' || file.name.split('.')[1] === 'jpeg') {
              files.url = response.url;
            } else if (file.name.split('.')[1] === 'pdf') {
              that.filepdf = response.url;
              files.url = '/static/img/pdf.png';
            } else if (file.name.split('.')[1] === 'rar') {
              // that.filepdf = response.url;
              files.url = '/static/img/rar.png';
            } else if (file.name.split('.')[1] === 'zip') {
              // that.filepdf = response.url;
              files.url = '/static/img/zip.png';
            }
            // files.url = response.url;
            files.name = file.name;
            that.fileListST0209.push(files);
            console.log(that.fileListST0209);
          } else {
            that.$message(that.$t('publishFactoring.uploadFailed'));
          }
        }, true);
      },
      // 货物保险单图片放大
      handlePreviewST0209(files) {
        this.fileListST0209DialogImg = files.url;
        this.isfileListST0209Dialog = true;
        console.log(files.name);
        var suffix = files.name.split('.')[1];
        console.log(suffix);
        this.fileListST0209.forEach((item, index) => {
          if (suffix === 'pdf' && files.uid === item.uid) {
            window.open(this.filepdf);
            this.isfileListST0209Dialog = false;
          }
          if (suffix === 'zip' && files.uid === item.uid) {
            // window.open(this.filepdf);
            this.isfileListST0209Dialog = false;
          }
          if (suffix === 'rar' && files.uid === item.uid) {
            // window.open(this.filepdf);
            this.isfileListST0209Dialog = false;
          }
          if ((suffix === 'jpg' || suffix === 'png' || suffix === 'jpeg') && files.uid === item.uid && (document.documentElement.clientWidth || document.body.clientWidth) > 1700) {
            this.fileListST0209DialogImgIndex = (this.fileListST0209.length === 6) ? index * 140 : (index * 140) + 291;
          } else if (files.uid === item.uid && (document.documentElement.clientWidth || document.body.clientWidth) < 1700) {
            this.fileListST0209DialogImgIndex = (this.fileListST0209.length === 6) ? index * 140 : (index * 140) + 150;
          }
        });
      },
      // 当图片超过六张之后上传按钮自动消失
      handleRemoveST0209(file, fileList) {
        this.fileListST0209 = fileList;
      },
      // 上传错误
      uploadError(response, file, fileList) {
        console.log('上传失败，请重试！');
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove() {

      },

      handlePreview() {

      }
    }
  };
</script>
<style media="screen" lang="less">
  .salefactoring-main {
    .el-card__body {
      margin-left: -20px;
    }
    .el-form-item.is-required .el-form-item__label:before {
      content: '';
      color: #f56c6c;
      margin-right: 4px;
    }
    .el-upload-list__item-name {
      opacity: 0;
      -moz-opacity: 0;
      -khtml-opacity: 0;
    }
    width: 1100px;
    margin: 0 auto;
    .salefactoring-center {
      width: 100%;
    }
    .salefactoring-upload {
      .el-form-item__error {
        left: 200px;
     }
    }
    .el-form-item {
      width: 510px;
    }
    .el-form-item__error {
      width: 230px;
    }
    .salefactoring-left {
      width: 550px;
      .el-form-item__label{
        width: 152px;
      }
      .el-form-item__error {
        left: 190px;
      }
    }

    .el-form-item__label {
      text-align: right;
      font-size: 14px;
      color: #606266;
      line-height: 40px;
      padding: 0px;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      margin-right: 50px;
    }
    .el-input {
      width: 200px;
    }
    .salefactoring-right:after {
      content: "";
      clear: both;
      height: 0;
      overflow: hidden;
      visibility: hidden;
      display: block;
    }
    .en-salefactoring-right {
      margin-top: -633px !important;
    }
    .salefactoring-right {
      float:left;
      margin-left: 580px;
      margin-top: -450px;
      .el-form-item__error {
        left: 220px;
      }
      .el-form-item__label {
        text-align: right;
        font-size: 14px;
        color: #606266;
        line-height: 40px;
        padding: 0px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        margin-right: 50px;
      }
      .el-form-item__label{
        width: 168px;
      }
    }
    .salefactoring-date {
      width: 570px;
    }

    .el-input_upload {
      width: 550px;
      font-size: 12px;
      margin-left: 15px;
    }
    .self_lable {
      width: 120px;
    }
    .el-button_self {
      margin-left: 300px;
      width: 210px;
      height: 35px;
      background: #0183fd;
    }
    .el-card.is-always-shadow, .el-card.is-hover-shadow:focus, .el-card.is-hover-shadow:hover {
       -webkit-box-shadow: none;
       box-shadow: none;
    }
    .el-card {
       border: none;
       -webkit-transition: none;
       transition: none
    }
    // 图片上传部分
    .nextsalefactoring-div {
      .el-form-item__label {
        text-align: left;
        float: left;
        font-size: 14px;
        color: #606266;
        line-height: 40px;
        padding: 0px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        margin-right: 50px;
        width: 150px;
      }
      .el-form-item__content {
        width: 1300px;
      }
      .fileListST0208-dialog, .fileListST0205-dialog, .fileListST0204-dialog, .fileListST0206-dialog, .fileListST0207-dialog, .fileListST0209-dialog{
        position: absolute;
        width: 470px;
        height: 310px;
        z-index: 1000000000000000000000000000;
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
        content: "";
        clear: both;
        height: 0;
        display: block;
      }
      .el-upload-list__item {
        border: none;
        width: 140px;
        height: 95px;
        float: left;
      }
      .el-upload-list--picture {
        float: left;
        zoom: 1;
        border: none;
        .el-upload-list__item.is-success {
          margin-top: 0;
          padding: 0;
          margin-left: 5px;
          .el-upload-list__item-thumbnail {
            margin: 0;
            width: 100%;
            height: 95px;
          }
          .el-upload-list__item-name {
            position: absolute;
            width: 100%;
            height: 95px;
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
    }
  }
</style>
