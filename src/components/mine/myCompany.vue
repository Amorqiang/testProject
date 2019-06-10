<template>
  <div class="myCompany clearfix myCompany-main-xq">
    <div class="myCompany-center" style=" display: flex; align-items:left; flex-direction: column;">
      <h1 style="text-align: center">{{$t('companInformation.myCompanInformation')}}</h1>
      <!--企业信息补录-->
      <div style="width: 1100px;" v-show="okShow">
        <table>
          <!--机构类型-->
          <tr>
            <td>{{$t('regist.organizationType')}}</td>
            <td class="self_td">{{companyData.companyTypeId1}}&nbsp;&nbsp;&nbsp;&nbsp;{{companyData.companyTypeId2}}
            </td>
          </tr>
          <!--企业营业执照名称-->
          <tr>
            <td>{{$t('companInformation.companyName')}}</td>
            <td class="self_td">{{companyData.companyName}}</td>
          </tr>
          <!--机构注册地-->
          <tr>
            <td>{{$t('companInformation.companyDomicile')}}</td>
            <td class="self_td">{{companyData.companyDomicile}}</td>
          </tr>
          <!--状态-->
          <tr v-show="checkStateShow">
            <td></td>
            <td class="self_td">
              <p v-if="checkState == '待补充'">{{$t('MyAssets.perfect')}}</p>
              <p style="color: #FF722B" v-if="checkState == '审核中'">{{$t('MyAssets.underReview')}}</p>
              <p style="color: red" v-if="checkState == '审核不通过'">{{$t('MyAssets.auditFailed')}}</p>
            </td>
          </tr>
          <!--营业执照电子版-->
          <tr class="myCompany-change">
            <td>{{$t('companInformation.licenseUrl')}}</td>
            <td class="self_td">
              <el-upload action="uploadFileUrl" :on-preview="licenseImgPreview" :disabled="disabled"
                         :on-remove="licenseImgRemove" multiple :limit="6"
                         :file-list="licenseImgUrlList"
                         :before-upload="submitLicenseImgForm" list-type="picture">
                <el-button v-show="uplodShow" :disabled="disabled" v-if="licenseImgUrlList.length<6"
                           class="upload-button" type="primary"
                           style="font-size: 10px;width:150px;height:95px;background: rgba(0,0,0,0.1);border: none;margin-top: 10px;">
                  {{$t('publishForfeiting.upload')}}
                </el-button>
              </el-upload>
              <div class="fileList1-dialog" v-if="isfileList1Dialog"
                   @click="isfileList1Dialog = false">
                <img :src="fileList1DialogImg" alt="">
              </div>
            </td>
          </tr>
          <!--统一社会信用代码-->
          <tr class="myCompany-change">
            <td>{{$t('companInformation.creditCode')}}</td>
            <td class="self_td">
              <input :disabled="disabled" class="self_td" type="text" name="" v-model.trim="uscc" ref="uscc"
                     :placeholder="$t('inSupp.pleaseEnter')">
            </td>
          </tr>
          <!--swiftcode-->
          <tr class="myCompany-change">
            <td>SWIFT CODE</td>
            <td class="self_td">
              <input :disabled="disabled" class="self_td" type="text" name=""
                     :placeholder="$t('inSupp.pleaseEnterSWIFTCODE')" v-model.trim="swiftCode" ref="swiftCode"
                     @change="checkSwiftCode()">
            </td>
          </tr>
          <!--办公地址-->
          <tr class="myCompany-change">
            <td>{{$t('inSupp.officeAddr')}}</td>
            <td class="self_td"><input :disabled="disabled" class="self_td" type="text" name="" v-model="officeAddr"
                                       :placeholder="$t('inSupp.pleaseEnter')"></td>
          </tr>
          <!--近12个月财务报表-->
          <tr class="myCompany-change">
            <td>{{$t('inSupp.finaSfm')}}</td>
            <td class="self_td">
              <el-upload action="uploadFileUrl" :on-preview="yearFinancialTablePreview" :disabled="disabled"
                         :on-remove="yearFinancialTableRemove" multiple :limit="6"
                         :file-list="yearFinancialTableList"
                         :before-upload="submitYearFinancialTableForm" list-type="picture">
                <el-button v-show="uplodShow" :disabled="disabled" v-if="yearFinancialTableList.length<6"
                           class="upload-button" type="primary"
                           style="font-size: 10px;width:150px;height:95px;background: rgba(0,0,0,0.1);border: none;margin-top: 10px;">
                  {{$t('publishForfeiting.upload')}}
                </el-button>
              </el-upload>
              <div class="fileList1-dialog" v-if="isfileList2Dialog"
                   @click="isfileList2Dialog = false">
                <img :src="yearfileList1DialogImg" alt="">
              </div>
            </td>
          </tr>
          <!--交易资产类型-->
          <tr class="myCompany-change">
            <td>{{$t('companInformation.productCode')}}</td>
            <td class="self_td">
              <el-checkbox :disabled="disabled" v-model="forfeitingType">{{$t('MyAssets.forfaiting')}}</el-checkbox>
              <el-checkbox :disabled="disabled" v-model="factoringType">{{$t('MyAssets.factoring')}}</el-checkbox>
            </td>
          </tr>
          <!--联系人姓名-->
          <tr>
            <td>{{$t('companInformation.contactName')}}</td>
            <td class="self_td">{{companyData.contactName}}</td>
          </tr>
          <!--联系人手机号-->
          <tr>
            <td>{{$t('companInformation.contactTel')}}</td>
            <td class="self_td">{{companyData.contactTel}}</td>
          </tr>
          <!--手机验证码-->
          <tr v-show="phoneBindShow">
            <td>{{$t('inSupp.phoneVerificationCode')}}&nbsp;&nbsp;&nbsp;&nbsp;
              <input class="myCompany-change" style="width:150px" type="text" v-model="code" value=""
                     :placeholder="$t('inSupp.inputCode')">
            </td>
            <td id="self_rd">
              <button v-show="show" type="primary" @click="sendCode()" name="primary">
                {{$t('inSupp.sendCode')}}
              </button>
              <button style="background:gray" v-show="!show" type="info">
                {{$t('login.reSend')}}{{count}}s
              </button>
              <button @click="bangding()" type="primary" name="primary" class="binding">
                {{$t('inSupp.binDing')}}
              </button>
            </td>
          </tr>
          <!--企业邮箱-->
          <tr>
            <td>{{$t('companInformation.companyEmail')}}</td>
            <td class="self_td">{{companyData.email}}</td>
          </tr>
          <!--区块链信息-->
          <tr v-show="seeShow">
            <td>{{$t('companInformation.certificate')}}</td>
            <td class="self_td">
              <button type="button" name="button" class="check" @click="check()">{{$t('companInformation.see')}}
              </button>
            </td>
          </tr>
          <tr v-show="isShow">
            <td>{{$t('companInformation.companyBlock')}}</td>
            <td class="self_td">{{certificate}}
              <button type="button" name="button" class="check" @click="stop()">{{$t('companInformation.takeUp')}}
              </button>
            </td>
          </tr>
        </table>
        <div v-show="subShow" class="myCompany-center-submit-div">
          <button type="button" name="" @click="saveData()">{{$t('inSupp.save')}}</button>
        </div>
      </div>
      <!--非银行金融机构补录信息-->
      <div style="width: 1100px;" v-show="inShow">
        <table>
          <!--机构类型-->
          <tr>
            <td>{{$t('regist.organizationType')}}</td>
            <td class="self_td">{{companyData.companyTypeId1}}&nbsp;&nbsp;&nbsp;&nbsp;{{companyData.companyTypeId2}}
            </td>
          </tr>
          <!--企业营业执照名称-->
          <tr>
            <td>{{$t('companInformation.companyName')}}</td>
            <td class="self_td">{{companyData.companyName}}</td>
          </tr>
          <!--机构注册地-->
          <tr>
            <td>{{$t('companInformation.companyDomicile')}}</td>
            <td class="self_td">{{companyData.companyDomicile}}</td>
          </tr>
          <!--状态-->
          <tr v-show="checkStateShow">
            <td></td>
            <td class="self_td">
              <p v-if="checkState == '待补充'">{{$t('MyAssets.perfect')}}</p>
              <p style="color: #FF722B" v-if="checkState == '审核中'">{{$t('MyAssets.underReview')}}</p>
              <p style="color: red" v-if="checkState == '审核不通过'">{{$t('MyAssets.auditFailed')}}</p>
            </td>
          </tr>
          <!--金融机构许可证名称-->
          <tr class="myCompany-change">
            <td>{{$t('inSupp.permitName')}}</td>
            <td class="self_td"><input :disabled="disabled" class="self_td" type="text" name="" v-model="permitName"
                       :placeholder="$t('inSupp.pleaseEnter')">
            </td>
          </tr>
          <!--金融机构许可证编号-->
          <tr class="myCompany-change">
            <td>{{$t('inSupp.permitNo')}}</td>
            <td class="self_td"><input :disabled="disabled" class="self_td" type="text" name="" v-model="permitNo"
                       :placeholder="$t('inSupp.pleaseEnter')">
            </td>
          </tr>
          <!--营业执照电子版-->
          <tr class="myCompany-change">
            <td>{{$t('companInformation.licenseUrl')}}</td>
            <td class="self_td">
              <el-upload action="uploadFileUrl" :on-preview="licenseImgPreview" :disabled="disabled"
                         :on-remove="licenseImgRemove" multiple :limit="6"
                         :file-list="licenseImgUrlList"
                         :before-upload="submitLicenseImgForm" list-type="picture">
                <el-button v-show="uplodShow" :disabled="disabled" v-if="licenseImgUrlList.length<6"
                           class="upload-button" type="primary"
                           style="font-size: 10px;width:150px;height:95px;background: rgba(0,0,0,0.1);border: none;margin-top: 10px;">
                  {{$t('publishForfeiting.upload')}}
                </el-button>
              </el-upload>
              <div class="fileList1-dialog" v-if="isfileList1Dialog"
                   @click="isfileList1Dialog = false">
                <img :src="fileList1DialogImg" alt="">
              </div>
            </td>
          </tr>
          <!--统一社会信用代码-->
          <tr class="myCompany-change">
            <td>{{$t('companInformation.creditCode')}}</td>
            <td class="self_td">
              <input :disabled="disabled" class="self_td" type="text" name="" v-model.trim="uscc" ref="uscc"
                     :placeholder="$t('inSupp.pleaseEnter')">
            </td>
          </tr>
          <!--法定代表人-->
          <tr class="myCompany-change">
            <td>{{$t('inSupp.legalPerson')}}</td>
            <td class="self_td"><input :disabled="disabled" class="self_td" type="text" name="" v-model="legalPerson"
                       :placeholder="$t('inSupp.pleaseEnter')">
            </td>
          </tr>
          <!--swiftcode-->
          <tr class="myCompany-change">
            <td>SWIFT CODE</td>
            <td class="self_td">
              <input :disabled="disabled" class="self_td" type="text" name=""
                     :placeholder="$t('inSupp.pleaseEnterSWIFTCODE')" v-model.trim="swiftCode" ref="swiftCode"
                     @change="checkSwiftCode()">
            </td>
          </tr>
          <!--办公地址-->
          <tr class="myCompany-change">
            <td>{{$t('inSupp.officeAddr')}}</td>
            <td class="self_td"><input :disabled="disabled" class="self_td" type="text" name="" v-model="officeAddr"
                                       :placeholder="$t('inSupp.pleaseEnter')"></td>
          </tr>
          <!--交易资产类型-->
          <tr class="myCompany-change">
            <td>{{$t('companInformation.productCode')}}</td>
            <td class="self_td">
              <el-checkbox :disabled="disabled" v-model="forfeitingType">{{$t('MyAssets.forfaiting')}}</el-checkbox>
              <el-checkbox :disabled="disabled" v-model="factoringType">{{$t('MyAssets.factoring')}}</el-checkbox>
            </td>
          </tr>
          <!--联系人姓名-->
          <tr>
            <td>{{$t('companInformation.contactName')}}</td>
            <td class="self_td">{{companyData.contactName}}</td>
          </tr>
          <!--联系人手机号-->
          <tr>
            <td>{{$t('companInformation.contactTel')}}</td>
            <td class="self_td">{{companyData.contactTel}}</td>
          </tr>
          <!--手机验证码-->
          <tr v-show="phoneBindShow">
            <td>{{$t('inSupp.phoneVerificationCode')}}&nbsp;&nbsp;&nbsp;&nbsp;
              <input class="myCompany-change" style="width:150px" type="text" v-model="code" value=""
                     :placeholder="$t('inSupp.inputCode')">
            </td>
            <td class="self_td">
              <button v-show="show" type="primary" @click="sendCode()" name="button">
                {{$t('inSupp.sendCode')}}
              </button>
              <button style="background:gray" v-show="!show" type="info">
                {{$t('login.reSend')}}{{count}}s
              </button>
              <button @click="bangding()" type="primary" name="button" class="binding">
                {{$t('inSupp.binDing')}}
              </button>
            </td>
          </tr>
          <!--企业邮箱-->
          <tr>
            <td>{{$t('companInformation.companyEmail')}}</td>
            <td class="self_td">{{companyData.email}}</td>
          </tr>
          <!--区块链信息-->
          <tr v-show="seeShow">
            <td>{{$t('companInformation.certificate')}}</td>
            <td class="self_td">
              <button type="button" name="button" class="check" @click="check()">{{$t('companInformation.see')}}
              </button>
            </td>
          </tr>
          <tr v-show="isShow">
            <td>{{$t('companInformation.companyBlock')}}</td>
            <td class="self_td">{{certificate}}
              <button type="button" name="button" class="check" @click="stop()">{{$t('companInformation.takeUp')}}
              </button>
            </td>
          </tr>
        </table>
        <div v-show="subShow" class="myCompany-center-submit-div">
          <button type="button" name="" @click="subData()">{{$t('inSupp.save')}}</button>
        </div>
      </div>
      <!--银行补录信息-->
      <div style="width: 1100px;" v-show="bankShow">
        <table>
          <!--机构类型-->
          <tr>
            <td>{{$t('regist.organizationType')}}</td>
            <td class="self_td">{{companyData.companyTypeId1}}&nbsp;&nbsp;&nbsp;&nbsp;{{companyData.companyTypeId2}}
            </td>
          </tr>
          <!--企业营业执照名称-->
          <tr>
            <td>{{$t('companInformation.companyName')}}</td>
            <td class="self_td">{{companyData.companyName}}</td>
          </tr>
          <!--机构注册地-->
          <tr>
            <td>{{$t('companInformation.companyDomicile')}}</td>
            <td class="self_td">{{companyData.companyDomicile}}</td>
          </tr>
          <!--状态-->
          <tr v-show="checkStateShow">
            <td></td>
            <td class="self_td">
              <p v-if="checkState == '待补充'">{{$t('MyAssets.perfect')}}</p>
              <p style="color: #FF722B" v-if="checkState == '审核中'">{{$t('MyAssets.underReview')}}</p>
              <p style="color: red" v-if="checkState == '审核不通过'">{{$t('MyAssets.auditFailed')}}</p>
            </td>
          </tr>
          <!--营业执照电子版-->
          <tr class="myCompany-change">
            <td>{{$t('companInformation.licenseUrl')}}</td>
            <td class="self_td">
              <el-upload action="uploadFileUrl" :on-preview="licenseImgPreview" :disabled="disabled"
                         :on-remove="licenseImgRemove" multiple :limit="6"
                         :file-list="licenseImgUrlList"
                         :before-upload="submitLicenseImgForm" list-type="picture">
                <el-button v-show="uplodShow" :disabled="disabled" v-if="licenseImgUrlList.length<6"
                           class="upload-button" type="primary"
                           style="font-size: 10px;width:150px;height:95px;background: rgba(0,0,0,0.1);border: none;margin-top: 10px;">
                  {{$t('publishForfeiting.upload')}}
                </el-button>
              </el-upload>
              <div class="fileList1-dialog" v-if="isfileList1Dialog"
                   @click="isfileList1Dialog = false">
                <img :src="fileList1DialogImg" alt="">
              </div>
            </td>
          </tr>
          <!--统一社会信用代码-->
          <tr class="myCompany-change">
            <td>{{$t('companInformation.creditCode')}}</td>
            <td class="self_td">
              <input :disabled="disabled" class="self_td" type="text" name="" v-model.trim="uscc" ref="uscc"
                     :placeholder="$t('inSupp.pleaseEnter')">
            </td>
          </tr>
          <!--swiftcode-->
          <tr class="myCompany-change">
            <td>SWIFT CODE</td>
            <td class="self_td">
              <input :disabled="disabled" class="self_td" type="text" name=""
                     :placeholder="$t('inSupp.pleaseEnterSWIFTCODE')" v-model.trim="swiftCode" ref="swiftCode"
                     @change="checkSwiftCode()">
            </td>
          </tr>
          <!--交易资产类型-->
          <tr class="myCompany-change">
            <td>{{$t('companInformation.productCode')}}</td>
            <td class="self_td">
              <el-checkbox :disabled="disabled" v-model="forfeitingType">{{$t('MyAssets.forfaiting')}}</el-checkbox>
              <el-checkbox :disabled="disabled" v-model="factoringType">{{$t('MyAssets.factoring')}}</el-checkbox>
            </td>
          </tr>
          <!--联系人姓名-->
          <tr>
            <td>{{$t('companInformation.contactName')}}</td>
            <td class="self_td">{{companyData.contactName}}</td>
          </tr>
          <!--联系人手机号-->
          <tr>
            <td>{{$t('companInformation.contactTel')}}</td>
            <td class="self_td">{{companyData.contactTel}}</td>
          </tr>
          <!--手机验证码-->
          <tr v-show="phoneBindShow">
            <td>{{$t('inSupp.phoneVerificationCode')}}&nbsp;&nbsp;&nbsp;&nbsp;
              <input class="myCompany-change" style="width:150px" type="text" v-model="code"
                     value="" :placeholder="$t('inSupp.inputCode')">
            </td>
            <td class="self_td">
              <button v-show="show" type="primary" @click="sendCode()" name="primary">
                {{$t('inSupp.sendCode')}}
              </button>
              <button style="background:gray" v-show="!show" type="info">
                {{$t('login.reSend')}}{{count}}s
              </button>
              <button @click="bangding()" type="primary" name="primary" class="binding">
                {{$t('inSupp.binDing')}}
              </button>
            </td>
          </tr>
          <!--企业邮箱-->
          <tr>
            <td>{{$t('companInformation.companyEmail')}}</td>
            <td class="self_td">{{companyData.email}}</td>
          </tr>
          <!--区块链信息-->
          <tr v-show="seeShow">
            <td>{{$t('companInformation.certificate')}}</td>
            <td class="self_td">
              <button type="button" name="button" class="check" @click="check()">{{$t('companInformation.see')}}
              </button>
            </td>
          </tr>
          <tr v-show="isShow">
            <td>{{$t('companInformation.companyBlock')}}</td>
            <td class="self_td">{{certificate}}
              <button type="button" name="button" class="check" @click="stop()">{{$t('companInformation.takeUp')}}
              </button>
            </td>
          </tr>
        </table>
        <div v-show="subShow" class="myCompany-center-submit-div">
          <button type="button" name="" @click="subData()">{{$t('inSupp.save')}}</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {getOrgByUserId, sendPhoneCode, valiCode, mackupCompany} from '../../assets/js/const';

  export default {
    components: {},
    data() {
      return {
        fileList1DialogImg: '',
        yearfileList1DialogImg: '',
        isfileList1Dialog: false,
        isfileList2Dialog: false,
        seeShow: true,
        checkStateShow: true,
        uplodShow: true,
        phoneBindShow: true,
        disabled: false,
        bankShow: false,
        inShow: false,
        subShow: true,
        okShow: false,
        isShow: false,
        show: true,
        count: '',
        checkState: '',
        permitName: '',
        permitNo: '',
        legalPerson: '',
        uscc: '',
        officeAddr: '',
        swiftCode: '',
        code: '',
        licenseImgUrlList: [],
        companyDomicile: '',
        productList: [],
        forfeitingType: false,
        factoringType: false,
        yearFinancialTableList: [],
        certificate: '',
        companyData: {},
        licenseImgUrl: '',
        yearFinancialTable: '',
        urls: [],
        urlList: []
      };
    },
    methods: {
      checkSwiftCode() { // swiftcode正则校验
        var RegExp = /(^[A-Z]{6}[A-Z0-9]{2}$)|(^[A-Z]{6}[A-Z0-9]{5}$)/;
        if (this.swiftCode == null && this.swiftCode === '') {
          this.$message(this.$t('publishForfeiting.inputTenderSwift'));
          return false;
          // callback(new Error(this.$t('publishForfeiting.inputTenderSwift')));
        } else if (!RegExp.test(this.swiftCode)) {
          this.$message(this.$t('publishForfeiting.swiftCodeFormat'));
          return false;
          // callback(new Error(this.$t('publishForfeiting.swiftCodeFormat')));
        } else if (this.swiftCode.length === 8) {
          this.swiftCode = this.swiftCode + 'XXX';
          return false;
        }
      },
      licenseImgRemove(file, licenseImgUrlList) {
        for (var i = 0; i < licenseImgUrlList.length; i++) {
          if ((file.uid + '') === (licenseImgUrlList[i].uid + '')) {
            licenseImgUrlList.splice(i, 1);
          }
        }
        this.licenseImgUrlList = licenseImgUrlList;
      },
      licenseImgPreview(file) {
        console.log(file);
        let _downloadUrl = file.downloadUrl;
        if (_downloadUrl.substr(_downloadUrl.lastIndexOf('.')) === '.jpg' || _downloadUrl.substr(_downloadUrl.lastIndexOf('.')) === '.jpeg' || _downloadUrl.substr(_downloadUrl.lastIndexOf('.')) === '.png') {
          this.fileList1DialogImg = _downloadUrl;
          this.isfileList1Dialog = true;
        } else if (_downloadUrl.substr(_downloadUrl.lastIndexOf('.')) === '.pdf') {
          window.open(_downloadUrl);
        } else if (_downloadUrl.substr(_downloadUrl.lastIndexOf('.')) === '.zip') {
          window.open(_downloadUrl);
        } else if (_downloadUrl.substr(_downloadUrl.lastIndexOf('.')) === '.rar') {
          window.open(_downloadUrl);
        }
      },
      submitLicenseImgForm(file) {
        var that = this;
        const isformat = file.name.split('.')[1] === 'jpg' || file.name.split('.')[1] === 'jpeg' || file.name.split('.')[1] === 'png' || file.name.split('.')[1] === 'zip' || file.name.split('.')[1] === 'rar' || file.name.split('.')[1] === 'pdf';
        if (!isformat) {
          that.$message.warning(this.$t('publishForfeiting.fileFormat'));
          return;
        }
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        };
        this.UpLoad('/upload/file', {'config': config, 'data': file}, function (response) {
          if (response.code === 200) {
            that.$message(that.$t('inSupp.uploadSuccess'));
            let _url = '';
            if (file.name.split('.')[1] === 'jpg' || file.name.split('.')[1] === 'jpeg' || file.name.split('.')[1] === 'png') {
              _url = response.url;
            } else if (file.name.split('.')[1] === 'pdf') {
              _url = '/static/img/pdf2.png';
            } else if (file.name.split('.')[1] === 'zip') {
              _url = '/static/img/zip.png';
            } else if (file.name.split('.')[1] === 'rar') {
              _url = '/static/img/rar1.png';
            }
            that.licenseImgUrlList.push({uid: file.uid, url: _url, downloadUrl: response.url});
          } else {
            that.$message(response.message);
          }
        });
      },
      yearFinancialTableRemove(files, yearFinancialTableList) {
        for (var i = 0; i < yearFinancialTableList.length; i++) {
          if (files.uid === yearFinancialTableList[i].uid) {
            yearFinancialTableList.splice(i, 1);
          }
        }
        this.yearFinancialTableList = yearFinancialTableList;
      },
      yearFinancialTablePreview(files) {
        console.log(files);
        let _downloadUrl = files.downloadUrls;
        if (_downloadUrl.substr(_downloadUrl.lastIndexOf('.')) === '.jpg' || _downloadUrl.substr(_downloadUrl.lastIndexOf('.')) === '.jpeg' || _downloadUrl.substr(_downloadUrl.lastIndexOf('.')) === '.png') {
          this.fileList1DialogImg = _downloadUrl;
          this.isfileList1Dialog = true;
        } else if (_downloadUrl.substr(_downloadUrl.lastIndexOf('.')) === '.pdf') {
          window.open(_downloadUrl);
        } else if (_downloadUrl.substr(_downloadUrl.lastIndexOf('.')) === '.zip') {
          window.open(_downloadUrl);
        } else if (_downloadUrl.substr(_downloadUrl.lastIndexOf('.')) === '.rar') {
          window.open(_downloadUrl);
        }
      },
      submitYearFinancialTableForm(files) {
        var that = this;
        const isformat = files.name.split('.')[1] === 'jpg' || files.name.split('.')[1] === 'jpeg' || files.name.split('.')[1] === 'png' || files.name.split('.')[1] === 'zip' || files.name.split('.')[1] === 'rar' || files.name.split('.')[1] === 'pdf';
        if (!isformat) {
          that.$message.warning(this.$t('publishForfeiting.fileFormat'));
          return;
        }
        //  event.preventDefault();
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        };
        this.UpLoad('/upload/file', {'config': config, 'data': files}, function (response) {
          if (response.code === 200) {
            that.$message(that.$t('inSupp.uploadSuccess'));
            let _urls = '';
            if (files.name.split('.')[1] === 'jpg' || files.name.split('.')[1] === 'jpeg' || files.name.split('.')[1] === 'png') {
              _urls = response.url;
            } else if (files.name.split('.')[1] === 'pdf') {
              _urls = '/static/img/pdf2.png';
            } else if (files.name.split('.')[1] === 'zip') {
              _urls = '/static/img/zip.png';
            } else if (files.name.split('.')[1] === 'rar') {
              _urls = '/static/img/rar1.png';
            }
            that.yearFinancialTableList.push({
              // name: files.name,
              uid: files.uid,
              url: _urls,
              downloadUrls: response.url
            });
          } else {
            that.$message(response.message);
          }
        });
      },
      //  点击显示区块链证书1
      check() {
        var that = this;
        var body = {};
        body.bussId = this.id;
        let data = {'body': body};
        that.POST('/owner/blockChain/selectAgencyById', data, function (res) {
          that.certificate = res.data.certificate;
        });
        this.isShow = true;
      },
      //  点击隐藏区块链证书
      stop() {
        this.isShow = false;
      },
      sendCode() {
        var that = this;
        var body = {};
        body.mobile = that.companyData.contactTel;
        this.POST(sendPhoneCode, {'body': body}, function (response) {
          if (response.code === 300) {
            // 如果成功之后计时验证码
            let TIME_COUNT = 180; // 总计时60秒
            if (!that.timer) {
              that.count = TIME_COUNT;
              that.show = false;
              that.timer = setInterval(() => {
                if (that.count > 0 && that.count <= TIME_COUNT) {
                  that.count--;
                } else {
                  that.show = true;
                  clearInterval(that.timer);
                  that.timer = null;
                }
              }, 1000);
            }
          } else {
            alert(response.message);
          }
        });
      },
      // 点击绑定按钮后颜色置灰
      bangding() {
        if (this.code === '') {
          this.$message({
            showClose: true,
            message: this.$t('inSupp.pleaseEnterCaptcha'),
            type: 'error'
          });
          return false;
        }
        var body = {};
        body.mobile = this.companyData.contactTel;
        body.code = this.code;
        this.POST(valiCode, {'body': body}, (response) => {
          if (response.code === 300) {
            this.$message(this.$t('inSupp.bindSuccess'));
          } else {
            this.$message(response.message);
          }
        });
      },
      initData() {
        let that = this;
        this.POST(getOrgByUserId, {'body': {}}, function (response) {
          that.companyData = response.data;
          that.phoneBind = response.data.phoneBind;
          that.productList = response.data.productList;
          that.companyDomicile = response.data.companyDomicile;
          that.uscc = response.data.uscc;
          if (that.companyData.checkState === 100) {
            that.checkState = '待补充';
            that.checkStateShow = true;
            that.disabled = false;
            that.seeShow = false;
          }
          // if (that.companyData.checkState === 101) {
          //   that.checkState = '审核中';
          //   that.checkStateShow = true;
          //   that.disabled = false;
          // }
          if (that.companyData.checkState === 101 || that.companyData.checkState === 102 || that.companyData.checkState === 104 ||
            that.companyData.checkState === 105 || that.companyData.checkState === 107 || that.companyData.checkState === 108 ||
            that.companyData.checkState === 110) {
            that.checkState = '审核中';
            that.checkStateShow = true;
            that.disabled = true;
            that.subShow = false;
            that.disabled = true;
            that.hideShow = false;
            that.uplodShow = false;
          }
          if (that.companyData.checkState === 103 || that.companyData.checkState === 106 || that.companyData.checkState === 109 || that.companyData.checkState === 112) {
            that.checkState = '审核不通过';
            that.checkStateShow = true;
            that.disabled = false;
          }
          if (that.companyData.checkState === 111) {
            that.checkState = '成功，成功不允许修改';
            that.checkStateShow = false;
            that.subShow = false;
            that.disabled = true;
            that.hideShow = false;
            that.uplodShow = false;
          }
          if (that.companyData.companyTypeId1 === '银行用户' && that.companyData.companyTypeId1En === 'bankUser') {
            that.okShow = false;
            that.inShow = false;
            that.bankShow = true;
            that.toComType = 1;
          }
          if (that.companyData.companyTypeId1En === 'financialInstitution' && that.companyData.companyTypeId1 === '非银行金融机构') {
            that.okShow = false;
            that.inShow = true;
            that.bankShow = false;
            that.toComType = 2;
          }
          if (that.companyData.companyTypeId1En === 'company' && that.companyData.companyTypeId1 === '公司企业') {
            that.okShow = true;
            that.inShow = false;
            that.bankShow = false;
            that.toComType = 3;
          }
          if (that.phoneBind === 1) {
            that.phoneBindShow = false;
          }
          if (response.data.orgDetail != null && response.data.orgDetail !== '') {
            var orgDetail = JSON.parse(response.data.orgDetail);
            that.officeAddr = orgDetail.officeAddr;
            that.swiftCode = orgDetail.swiftCode;
            that.permitName = orgDetail.permitName;
            that.permitNo = orgDetail.permitNo;
            that.legalPerson = orgDetail.legalPerson;
            if (orgDetail.licenseImgUrl != null && orgDetail.licenseImgUrl !== '' && orgDetail.licenseImgUrl !== undefined) {
              let _urls = orgDetail.licenseImgUrl.split(';');
              for (let j = 0; j < _urls.length; j++) {
                if (_urls[j] !== null && _urls[j] !== '') {
                  let _url = '';
                  if (_urls[j].substr(_urls[j].lastIndexOf('.')) === '.jpg' || _urls[j].substr(_urls[j].lastIndexOf('.')) === '.jpeg' || _urls[j].substr(_urls[j].lastIndexOf('.')) === '.png') {
                    _url = _urls[j];
                  } else if (_urls[j].substr(_urls[j].lastIndexOf('.')) === '.pdf') {
                    _url = '/static/img/pdf2.png';
                  } else if (_urls[j].substr(_urls[j].lastIndexOf('.')) === '.zip') {
                    _url = '/static/img/zip.png';
                  } else if (_urls[j].substr(_urls[j].lastIndexOf('.')) === '.rar') {
                    _url = '/static/img/rar1.png';
                  }
                  that.licenseImgUrlList.push({name: '', uid: j, url: _url, downloadUrl: _urls[j]});
                }
              }
            }
            if (orgDetail.yearFinancialTable != null && orgDetail.yearFinancialTable !== '' && orgDetail.yearFinancialTable !== undefined) {
              let _urls = orgDetail.yearFinancialTable.split(';');
              for (let j = 0; j < _urls.length; j++) {
                if (_urls[j] !== null && _urls[j] !== '') {
                  let _url = '';
                  if (_urls[j].substr(_urls[j].lastIndexOf('.')) === '.jpg' || _urls[j].substr(_urls[j].lastIndexOf('.')) === '.jpeg' || _urls[j].substr(_urls[j].lastIndexOf('.')) === '.png') {
                    _url = _urls[j];
                  } else if (_urls[j].substr(_urls[j].lastIndexOf('.')) === '.pdf') {
                    _url = '/static/img/pdf2.png';
                  } else if (_urls[j].substr(_urls[j].lastIndexOf('.')) === '.zip') {
                    _url = '/static/img/zip.png';
                  } else if (_urls[j].substr(_urls[j].lastIndexOf('.')) === '.rar') {
                    _url = '/static/img/rar1.png';
                  }
                  that.yearFinancialTableList.push({name: '', uid: j, url: _url, downloadUrls: _urls[j]});
                }
              }
            }
            if (that.productList.length > 1) {
              that.forfeitingType = true;
              that.factoringType = true;
            } else {
              ((that.productList[0].productCode + '') === '1') ? that.forfeitingType = true : that.factoringType = true;
            }
          }
        });
      },
      saveData: function () {
        var self = this;
        var body = {};
        body.jsonProduct = {};
        body.jsonOrg = {};
        body.jsonProduct.forfeiting = {};
        body.jsonProduct.factoring = {};
        body.orgType = self.companyData.companyTypeId1En;
        body.jsonOrg.permitName = self.permitName;
        body.jsonOrg.permitNo = self.permitNo;
        body.jsonOrg.legalPerson = self.legalPerson;
        var reg = /^[0-9A-Z]+$/;
        if (self.uscc === '' || !reg.test(self.uscc) || self.uscc.length !== 18) {
          self.$message(this.$t('clues.uscc'));
          this.$refs.uscc.focus();
          return false;
        }
        body.jsonOrg.uscc = self.uscc;
        // swiftcode正则校验
        var RegExp = /(^[A-Z]{6}[A-Z0-9]{2}$)|(^[A-Z]{6}[A-Z0-9]{5}$)/;
        if (this.swiftCode == null && this.swiftCode === '') {
          this.$message(this.$t('publishForfeiting.inputTenderSwift'));
          return false;
          // callback(new Error(this.$t('publishForfeiting.inputTenderSwift')));
        } else if (!RegExp.test(this.swiftCode)) {
          this.$message(this.$t('publishForfeiting.swiftCodeFormat'));
          return false;
          // callback(new Error(this.$t('publishForfeiting.swiftCodeFormat')));
        } else if (this.swiftCode.length === 8) {
          this.swiftCode = this.swiftCode + 'XXX';
          return false;
        }
        body.jsonOrg.swiftCode = self.swiftCode;
        body.jsonOrg.officeAddr = self.officeAddr;
        body.jsonOrg.orgRegisterAddr = self.companyDomicile;
        body.jsonOrg.orgId = self.companyData.id;
        body.jsonOrg.mobile = self.companyData.contactTel;
        body.jsonProduct.forfeiting.assetsType = (self.forfeitingType) ? '1' : '';
        body.jsonProduct.factoring.assetsType = (self.factoringType) ? '2' : '';
        for (var i = 0; i < self.licenseImgUrlList.length; i++) {
          self.licenseImgUrl += self.licenseImgUrlList[i].downloadUrl + ';';
        }
        if (self.licenseImgUrlList.length < 1) {
          self.$message(self.$t('inSupp.businessLicenseRequired'));
          return false;
        }
        for (var j = 0; j < self.yearFinancialTableList.length; j++) {
          self.yearFinancialTable += self.yearFinancialTableList[j].downloadUrls + ';';
        }
        if (self.yearFinancialTableList.length < 1) {
          self.$message(self.$t('inSupp.12FinancialUnUpload'));
          return false;
        }
        ;
        body.jsonOrg.licenseImgUrl = self.licenseImgUrl;
        body.jsonOrg.yearFinancialTable = self.yearFinancialTable;
        //  var jsonObject1 = JSON.stringify(body);
        if (!self.forfeitingType && !self.factoringType) {
          self.$message({
            showClose: true,
            message: self.$t('inSupp.productTypeRequired'),
            type: 'error'
          });
          return false;
        }
        this.POST(mackupCompany, {'body': body}, function (response) {
          self.$router.go(0);
        });
      },
      subData: function () {
        var self = this;
        var body = {};
        body.jsonProduct = {};
        body.jsonOrg = {};
        body.jsonProduct.forfeiting = {};
        body.jsonProduct.factoring = {};
        body.orgType = self.companyData.companyTypeId1En;
        body.jsonOrg.permitName = self.permitName;
        body.jsonOrg.permitNo = self.permitNo;
        body.jsonOrg.legalPerson = self.legalPerson;
        var reg = /^[0-9A-Z]+$/;
        if (self.uscc === '' || !reg.test(self.uscc) || self.uscc.length !== 18) {
          self.$message(this.$t('clues.uscc'));
          this.$refs.uscc.focus();
          return false;
        }
        body.jsonOrg.uscc = self.uscc;
        // swiftcode正则校验
        var RegExp = /(^[A-Z]{6}[A-Z0-9]{2}$)|(^[A-Z]{6}[A-Z0-9]{5}$)/;
        if (this.swiftCode == null && this.swiftCode === '') {
          this.$message(this.$t('publishForfeiting.inputTenderSwift'));
          return false;
          // callback(new Error(this.$t('publishForfeiting.inputTenderSwift')));
        } else if (!RegExp.test(this.swiftCode)) {
          this.$message(this.$t('publishForfeiting.swiftCodeFormat'));
          return false;
          // callback(new Error(this.$t('publishForfeiting.swiftCodeFormat')));
        } else if (this.swiftCode.length === 8) {
          this.swiftCode = this.swiftCode + 'XXX';
          return false;
        }
        body.jsonOrg.swiftCode = self.swiftCode;
        body.jsonOrg.officeAddr = self.officeAddr;
        body.jsonOrg.orgRegisterAddr = self.companyDomicile;
        body.jsonOrg.orgId = self.companyData.id;
        body.jsonOrg.mobile = self.companyData.contactTel;
        body.jsonProduct.forfeiting.assetsType = (self.forfeitingType) ? '1' : '';
        body.jsonProduct.factoring.assetsType = (self.factoringType) ? '2' : '';
        for (var i = 0; i < self.licenseImgUrlList.length; i++) {
          self.licenseImgUrl += self.licenseImgUrlList[i].downloadUrl + ';';
        }
        if (self.licenseImgUrlList.length < 1) {
          self.$message(self.$t('inSupp.businessLicenseRequired'));
          return false;
        }
        body.jsonOrg.licenseImgUrl = self.licenseImgUrl;
        if (!self.forfeitingType && !self.factoringType) {
          self.$message({
            showClose: true,
            message: self.$t('inSupp.productTypeRequired'),
            type: 'error'
          });
          return false;
        }
        this.POST(mackupCompany, {'body': body}, function (response) {
          if (response.code === 300) {
            self.$router.go(0);
          } else {
            alert(response.message);
          }
        });
      },
      doSth: function (type) {
        let that = this;
        if (type === 'licenseImgUrl') {
          if (that.licenseImgUrl == null || that.licenseImgUrl === '') {
            that.$notify.info({
              title: that.$t('TellerManagementPage.tips'),
              message: that.$t('inSupp.businessLicenseUnUpload')
            });
          } else {
            window.open(that.licenseImgUrl);
          }
        }
        if (type === 'yearFinancialTable') {
          if (that.yearFinancialTable == null || that.yearFinancialTable === '') {
            that.$notify.info({
              title: that.$t('TellerManagementPage.tips'),
              message: that.$t('inSupp.12FinancialUnUpload')
            });
          } else {
            window.open(that.yearFinancialTable);
          }
        }
      }
    },
    mounted() {
      this.initData();
    }
  };
</script>
<style media="screen" scope lang="less">
  .myCompany {
    width: 1100px;
    margin: 0 auto;
    .myCompany-center {
      float: left;
      width: 100%;
      margin-bottom: 100px;
      .self_td {
        text-align: right;
        width: 576px;
      }
    }
    #self_rd {
      text-align: right;
    }
    .el-upload-list {
      display: inline-block;
    }
    .el-upload-list--picture .el-upload-list__item {
      background: rgba(0, 0, 0, 0.1);
      float: right;
      border: none;
      width: 150px;
      height: 95px;
      margin-right: 10px;
      /*margin-top: 10px;*/
    }
    .el-upload-list__item-thumbnail {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 90%;
      height: 90%;
    }
    .el-upload {
      vertical-align: bottom;
      float: right;
    }
  }

  .myCompany-main-xq {
    .fileList1-dialog {
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
  }

  /*.el-upload-list, .el-upload {*/
  /*display: block;*/
  /*}*/
  .el-upload-list--picture:after {
    content: ".";
    clear: both;
    height: 0;
    overflow: hidden;
    visibility: hidden;
    display: block;
  }

  .el-upload-list--picture {
    float: right;
    zoom: 1;
    .el-upload-list__item.is-success {
      margin-top: 10px;
      padding: 0;
      .el-upload-list__item-thumbnail {
        margin: 0;
      }
      .el-upload-list__item-name {
        position: absolute;
        width: 100%;
        height: 100%;
        text-align: center;
        line-height: 164px;
        z-index: 1;
      }
    }
  }

  .el-upload-list__item-status-label, .el-icon-close, .el-icon-close-tip {
    z-index: 3;
  }

  /*.el-upload--picture {*/
  /*float: left;*/
  /*}*/
  /*.myCompany-change {*/
  /*background: lightgray;*/
  /*}*/

  .myCompany-change input {
    background: #ffffff;
    height: 100%;
    width: 100%;
    outline: none;
    border: none;
  }

  .myCompany-center table {
    border-collapse: collapse;
    width: 100%;
  }

  .myCompany-center td {
    border-top: 1px solid #f5f7fa;
    height: 60px;
    width: 100px;
  }

  .myCompany-center button {
    background: #3967c3;
    border: none;
    outline: none;
    color: white;
    width: 100px;
    height: 30px;
    font-size: 13px;
    cursor: pointer;
  }

  .myCompany-center-submit-div {
    text-align: center;
    margin-top: 100px;
  }
</style>
