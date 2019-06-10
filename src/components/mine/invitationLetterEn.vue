<template id="">
  <div class="datasup-main clearfix">
  <div class="datasup-center">

         <div class="header-title">
          <p class="title"> </p>
         </div>
    <el-form :model="initData" :inline="true" ref="datasup" :inline-message="true" label-width="100px" class="demo-ruleForm">
        <table >
           <tr class="datasup-change">
             <p class="inner-title">Forfeiting Offer &nbsp;&nbsp; No.{{initData.pollicitaNo}}<span></span></p>
           </tr>
           <tr class="datasup-change">
               <p>From:{{initData.sOrgName}}(Name of Seller)</p>
               <P>To:{{initData.bOrgName}}(Name of Buyer)</P>
               <P>Date:{{initData.signDate}}</P>
              <P style="font-weight:bold;">We hereby issue an offer to you (the Buyer).  Please purchase without recourse the following asset upon <br>
                receipt of the relevant qualified documents:</P>
              <P>Asset number:{{initData.bussId}}</P>
           </tr>
           <tr class="datasup-change">
              <p class="inner-title" style="margin-top:20px;">1. Transaction Details：</p>
              <p style="height:50px;">Issuing bank of L/C (full name):{{initData.openFullName}}</p>
              <p style="height:50px;">Accepting bank (if any):	{{initData.tenderFullName}}</p>
              <p style="height:50px;">Type of L/C：
                <el-form-item prop="debtType" :rules="[{ required: true, message: 'Please choose the type of letter of credit', trigger: 'blur' }]">
                  <el-radio disabled v-model="initData.debtType" :label=2>International L/C</el-radio>
                  <el-radio disabled v-model="initData.debtType" :label=1>Domestic forfeiting</el-radio>
                </el-form-item>
              </p>
              <p style="height:50px;">Number of L/C:{{initData.lcNo}}</p>
              <p style="height:50px;">Importer/ Applicant:
                <el-form-item prop="creditApp" :rules="[{ required: true, message: 'Please enter', trigger: 'blur' }]">
                  <el-input :disabled="read" type="text" placeholder="Please enter" v-model="initData.creditApp" style="width: auto"></el-input>
                </el-form-item>
              </p>
              <p style="height:50px;">Exporter/ Beneficiary:
                <el-form-item prop="creditBeneficiary" :rules="[{ required: true, message: 'Please enter', trigger: 'blur' }]">
                  <el-input :disabled="read" type="text" placeholder="Please enter" v-model="initData.creditBeneficiary" style="width: auto"></el-input>
                </el-form-item>
              </p>
              <p style="height:50px;">Underlying transaction: trade in goods/ trade in services	Product name:
                <el-form-item prop="basicTransaction" :rules="[{ required: true, message: 'Please enter', trigger: 'blur' }]">
                  <el-input :disabled="read" type="text" placeholder="Please enter" v-model="initData.basicTransaction" style="width: auto"></el-input>
                </el-form-item>
              </p>
              <p style="height:50px;">Expiration date of L/C:{{initData.deadLine}}</p>
              <p style="height:50px;">Drafts/ invoice value:
                <el-form-item prop="invoiceAmount" :rules="[{ required: true, message: 'Please enter', trigger: 'blur' }]">
                  <el-input :disabled="read" type="text" placeholder="Please enter" v-model="initData.invoiceAmount" style="width: auto"></el-input>
                </el-form-item>
              </p>
              <p style="height:50px;">Acceptance amount and currency:{{initData.amount}}&nbsp;&nbsp;{{initData.currency}}</p>
              <p style="height:50px;">Acceptance maturity date:
                <!--{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                <el-form-item prop="basicTransaction" :rules="[{ required: true, message: '请输入贸易品名', trigger: 'blur' }]">
                </el-form-item>-->
                <el-form-item prop="acceptEndDate" :rules="[{ type: 'string', required: true, message: 'check date', trigger: 'blur' }]">
                  <el-date-picker :disabled="read" type="date" v-model="initData.acceptEndDate" placeholder="check date" class="el-input" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
              </p>
           </tr>
           <tr class="datasup-change">
              <p class="inner-title" style="margin-top:15px;">2. Conditions of Purchase:</p>
              <p>Purchase price:{{initData.rate}}% (LIBOR + ___% P.A. or fixed interest rate)</p>
              <P>(“LIBOR” refers to the London Inter-bank Offered Rate, which shall be determined by the interest rate of relevant currency and period announced by the British Bankers Association prior to 11:00 London time two working days before the discounted date. It can be acquired through the relevant page of Reuters or Bloomberg.)</p>
              <p>Discounting method: Direct discounting</p>
              <p>Discount interest: Principal x Discount rate x Discount period/360</p>
              <p>Interest settlement method:<br>
                <el-form-item prop="InterestRate" :rules="[{ required: true, message: 'please select', trigger: 'click' }]">
                  <el-radio-group v-model="initData.InterestRate">
                    <el-radio :disabled="read" label="1">Advance payment when financing</el-radio>
                    <el-radio :disabled="read" label="2">Repayment of principal and interest at maturity date</el-radio>
                    <el-radio :disabled="read" label="3">Others:</el-radio> &nbsp:
                  </el-radio-group>
                </el-form-item>
                    <template v-if="initData.InterestRate == '3'">
                    <el-form-item prop="InterestRateName" :rules="[{ required: true, message: 'Please enter', trigger: 'blur' }]">
                      <el-input :disabled="read" type="text" placeholder="Please enter" v-model="initData.InterestRateName" style="width: auto"></el-input>
                    </el-form-item>
                    </template>
                    <template v-else>
                      <input :disabled="read" type="text" placeholder="Please enter" v-model="initData.InterestRateName" style="width: auto" class="el-input__inner">
                    </template>
              </p>
              <p>Service fee (if any):
                <el-form-item>
                  <input :disabled="read" type="text" v-model="initData.fee" placeholder="Please enter" class="el-input__inner"/>
                </el-form-item>
              </p>
              <p>Discount period:
                <el-form-item prop="discountPeriodDay" :rules="[{ required: true, message: 'Please enter', trigger: 'blur' }]">
                  <el-input :disabled="read" type="text" placeholder="Please enter" v-model="initData.discountPeriodDay" style="width: auto"></el-input>
                </el-form-item>
                days,
                that is from
                <el-form-item prop="discountPeriodStart" :rules="[{ type: 'string', required: true, message: 'check date', trigger: 'blur' }]">
                  <el-date-picker :disabled="read" type="date" v-model="initData.discountPeriodStart" placeholder="check date" class="el-input" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>

                (payment date of the purchasing bank) to</p>
              <p>
                <el-form-item prop="discountAcceptDate" :rules="[{ type: 'string', required: true, message: 'check date', trigger: 'blur' }]">
                  <el-date-picker :disabled="read" type="date" v-model="initData.discountAcceptDate" placeholder="check date" class="el-input" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
                (acceptance maturity date of the issuing bank)
                plus
                <el-form-item prop="discountPeriodWork" :rules="[{ type: 'string', required: true, message: 'Please enter', trigger: 'blur' }]">
                  <el-input :disabled="read" type="text" placeholder="check date" v-model="initData.discountPeriodWork" style="width: auto"></el-input>
                </el-form-item>
                working day(s) as grace period.</p>
              <p>Bank charges (if any):
                <!--<el-form-item prop="bankCost" :rules="[{ required: true, message: '请输入银行费用', trigger: 'blur' }]">-->
                  <el-input :disabled="read" type="text" placeholder="check date" v-model="initData.bankCost" style="width: auto"></el-input>
                <!--</el-form-item>-->
                (The issuing bank/ reimbursement bank/other bank charges shall be borne by the selling bank) </p>
              <p>Fees to be deducted in advance (if any):
                <!--<el-form-item prop="preCharging" :rules="[{ required: true, message: '请输入预扣费', trigger: 'blur' }]">-->
                  <el-input :disabled="read" type="text" placeholder="check date" v-model="initData.preCharging" style="width: auto"></el-input>
                <!--</el-form-item>-->
                (Reimbursed against the actual fees)</p>
            </tr>
           <tr class="datasup-change">
              <p class="inner-title" style="margin-top:20px;">3. Documents:</p>
              <p>(1) The verified copies of L/C and all modifications (signed and stamped with Certified True Copy); </p>
              <p>(2) The verified copy of the acceptance sent by the issuing bank (signed and stamped with Certified True Copy);</p>
              <p>(3) The verified copy of the Notice for Assignment of the Creditor’s Rights sent by the seller to the debtor (signed and stamped with Certified True Copy);</p>
              <p>(4) The Original of the Agreement for Assignment of the Creditor’s Rights sent by the Seller to the Buyer;</P>
              <p>(5) Upon the Buyer’s request, the Seller needs to provide copies of other transaction documents, including value added tax invoice and delivery documents.</p>
            </tr>
           <tr class="datasup-change">
              <p class="inner-title" style="margin-top:20px;">4. Delivery of documents</p>
              <p>We will deliver the aforementioned documents to the Buyer before
                <el-form-item prop="deliveryDate" :rules="[{ type: 'string', required: true, message: 'check date', trigger: 'blur' }]">
                  <el-date-picker :disabled="read" type="date" v-model="initData.deliveryDate" placeholder="check date" class="el-input" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
                (date).
              </p>
          </tr>
           <tr class="datasup-change">
              <p class="inner-title">5. Payment</p>
              <p>A lump sum, with discount interest and all charges deducted, shall be payable by you to us within
                <el-form-item prop="payBillDay" :rules="[{ required: true, message: 'Please enter', trigger: 'blur' }]">
                  <el-input :disabled="read" type="text" placeholder="Please enter" v-model="initData.payBillDay" style="width: auto"></el-input>
                </el-form-item>
                working days upon receipt of the aforementioned qualified documents.Our A/C number:</p>
              <p>A/C number：
                <el-form-item prop="payAccount" :rules="[{ required: true, message: 'Please enter', trigger: 'blur' }]">
                  <el-input :disabled="read" type="text" placeholder="Please enter" v-model="initData.payAccount" style="width: auto"></el-input>
                </el-form-item>
              </p>
              <p>bank name：
                <el-form-item prop="payAccountBank" :rules="[{ required: true, message: 'Please enter', trigger: 'blur' }]">
                  <el-input :disabled="read" type="text" placeholder="Please enter" v-model="initData.payAccountBank" style="width: auto"></el-input>
                </el-form-item>
              </p>
              <p>payment method specified：
                <el-form-item prop="payAccountApproach" :rules="[{ required: true, message: 'Please enter', trigger: 'blur' }]">
                  <el-input :disabled="read" type="text" placeholder="Please enter" v-model="initData.payAccountApproach" style="width: auto"></el-input>
                </el-form-item>
              </p>
          </tr>
           <tr class="datasup-change" style="height:100px">
              <p class="inner-title">6. Instructions of Offer</p>
              <p>Please sign the Forfeiting Offer Confirmation by
                <el-form-item prop="pollicitaBackDate" :rules="[{ type: 'string', required: true, message: 'check date', trigger: 'blur' }]">
                  <el-date-picker :disabled="read" type="date" v-model="initData.pollicitaBackDate" placeholder="check date" class="el-input" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
                (YY/MM/DD) to confirm your acceptance of our offer.</p>
              <p>If we fail to receive your written Confirmation by
                <el-form-item prop="pollicitaBackEndDate" :rules="[{ type: 'string', required: true, message: 'check date', trigger: 'blur' }]">
                  <el-date-picker :disabled="read" type="date" v-model="initData.pollicitaBackEndDate" placeholder="check date" class="el-input" value-format="yyyy-MM-dd"></el-date-picker>
                </el-form-item>
                (YY/MM/DD) (Subject to the date of our receipt), this Offer shall automatically become null and void. </p>
              <p>The relevant terms of this Offer shall serve as the basis for subsequent offline transactions between the Buyer and the Seller. If the final transaction terms are inconsistent with the terms of this Offer, the formal contract entered into between the Buyer and the Seller shall prevail.</p>
          </tr>
           <tr class="datasup-change">
              <p class="inner-title" style="margin-top:15px;">7. Special terms and conditions (if any)</p>
             <!--<el-form-item prop="specialAgreement" :rules="[{ required: true, message: '请输入内容', trigger: 'blur' }]">-->
               <el-input :disabled="read" type="textarea" :rows="2" placeholder="Please enter the content" v-model="initData.specialAgreement"></el-input>
             <!--</el-form-item>-->
          </tr>

           <tr class="datasup-change" style="text-align:right;">
              <p>Name of Seller:<input :disabled="read" style="border:none" type="text" name="" v-model="initData.sOrgName" class="identifying-input" disabled/></p>
              <p>Authorised signatory:
                <el-form-item prop="signPerson" :rules="[{ required: true, message: 'Please enter', trigger: 'blur' }]">
                  <el-input :disabled="read" type="text" placeholder="Please enter" v-model="initData.signPerson" style="width: auto"></el-input>
                </el-form-item>
              </p>
              <p> Date:<el-date-picker type="date" v-model="initData.createTime" placeholder="" class="el-input" :disabled="true"></el-date-picker></p>
           </tr>
           <tr class="datasup-change">
             <p class="title">Forfeiting Offer Confirmation</p>
           </tr>
           <tr class="datasup-change">
              <p class="inner-title"></p>
              <p style="height:70px">We,&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;（(Name of Buyer) hereby confirm the acceptance of the trading terms contained in the aforementioned Forfeiting Offer,
                and shall make payment to you the corresponding price upon receipt of the relevant documents stipulated in the Forfeiting Offer.</p>
              <p align="right">Name of Buyer:</p>
              <p align="right">Authorised signatory:</p>
              <p align="right">Date:</p>
           </tr>
           <tr class="datasup-change header-title">
             <el-button style="margin: 20px 0;" v-if="!read" type="primary" @click="submit()">send</el-button>
             <el-button style="margin: 20px 0;" v-else type="primary" @click="download()">download</el-button>
           </tr>
       </table>
    </el-form>
    </div>
</div>
</template>

<script  type="text/javascript">
import MineSlider from './MineSlider.vue'
import navMenu from '../NavMenu.vue'
import {saleConfirm, findByAssetsId, downloadTransactorRead} from '../../assets/js/const'
import {SendDocAndConfirm} from '../../assets/js/const'
export default {
  data(){
    return{
      read: this.$route.query.read ? true: false,
      initData: {
        bOrgName:"", //买方
        sOrgName:"", //卖方
        tranDate:"",
        bussId:"",//资产编号
        signDate:"",
        openFullName:"", //信用证开证行全称
        tenderFullName:"",//
        debtType:"", //信用证类型
        currency: "",
        amount: "",
        deadLine:"",//信用证期限
        rate:"",
        lcNo:"", //信用证编号
        pollicitaNo:"", //邀约函编号
        creditApp:"", //信用证申请人
        creditBeneficiary:"", //信用证受益人
        basicTransaction:"", //品名
        invoiceAmount:"", //汇票 发票金额
        acceptEndDate:"", //承兑到期日
        discountAcceptDate:"", //兑现到期日
        discountPeriodStart:"", //买入行付款日
        InterestRate:"",//截息方式
        InterestRateName:"", //截息方式为其它时的取值
        fee:"", //手续费
        discountPeriodWork:"", //宽限期
        discountPeriodDay:"", //贴现期
        bankCost:"", //银行费用
        preCharging:"", //预扣费
        deliveryDate:"", //单据交付日期
        signPerson:"", //有权签约人
        payBillDay:"", //付款工作日
        payAccount:"", //我方帐号
        payAccountBank:"",
        payAccountApproach:"",
        pollicitaBackDate:"", //邀约函回传日
        pollicitaBackEndDate:"", //邀约截止日
        specialAgreement:""//特殊约定
      }
    }
  },
  components:{
    MineSlider,
    navMenu
  },
  methods:{
    download () {
      this.POST(downloadTransactorRead, {'body': {'id': this.$route.params.id}}, function (response) {
        if (response.code == '300') {
          window.open(response.data);
        }
      })
    },
      submit(){
        this.$refs['datasup'].validate((valid) => {
          if (valid) {
            let that = this;
            var params = {};
            params.body = {};
            params.body=this.initData, //信用证申请人
              params.body.id = this.$route.params.id;
            if(this.initData.InterestRate=='1'){  //截息方式
              params.body.InterestRate='Advance payment when financing';
            }else if(this.initData.InterestRate=='2'){
              params.body.InterestRate='Repayment of principal and interest at maturity date';
            }else{
              params.body.InterestRate=this.initData.InterestRateName; //截息方式为其它时的取值
            }
            console.log(params.body);
            this.POST(SendDocAndConfirm,{"body":params.body},function(response){
              if(response.code==300){
                that.$router.push({'name': 'Myassets'})
              }
            });
          } else {
            return false;
          }
        });
      }
  },
  created(){
    let that = this;
    let _url = '';
    if (that.$route.query.read) {
      _url = findByAssetsId;
    } else {
      _url = saleConfirm;
    }
    this.POST(_url,{"body":{"id":this.$route.params.id}},function(response){
      if(response.code==300){
        that.initData=response.data;
      }else{
        that.$message("数据查询失败");
      }
    })
  }
}
</script>

<style media="screen" lang="less">
.datasup-main {
  width: 1100px;
  margin: 0 auto;
}
.datasup-center table{
  border-collapse:collapse;

}
// .datasup-center tr{
//   line-height: 50px;
//
// }
.datasup-center p{
  border-top: 1px ;
  line-height: 40px;
  width: 1100px;
}
.title{
    font-size: 30px;
    color: black;
    text-align:center;//水平居中
  }
  .register-cue{
    color: gray;
  }
  .inner-title{
    font-size: 18px;
    font-weight: 900;
  }
  .header-title{
    text-align: center;
  }
  .datasup-change{
    background: white;
  }
  .datasup-change input{
    background: white;
    height: 30px;
    width: 200px;
    // outline: none;
    border: 1px solid #ccc;
  }
  .datasup-center button{
    background: #3967c3;
  }

</style>
