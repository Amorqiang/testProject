<template id="">
  <div class="saleforfaiting-main clearfix">

    <!-- <p>123456</p> -->
    <div class="saleforfaiting-center">
      <h1>福费廷偏好修改页</h1>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="saleforfaiting-form">
        <el-form-item label="资产名称" prop="resource">
         <el-radio-group v-model="ruleForm.resource">
         <el-radio label="1">福费廷</el-radio>
         <router-link to="hobbyfactoring"><el-radio label="2">保理</el-radio></router-link>
         </el-radio-group>
       </el-form-item>

      <el-form-item label="福费廷类型" required prop="debtType">
          <el-select v-model="ruleForm.debtType" placeholder="请选择" class="reg-input1 el-input" >
            <el-option label="国内福费廷" value="1"></el-option>
            <el-option label="国际福费廷" value="2"></el-option>
          </el-select>
       </el-form-item>

       <el-form-item label="承兑币种" required prop="currency">
         <el-select v-model="ruleForm.currency" placeholder="请选择" class="reg-input1 el-input" >
           <el-option label="CNY" value="CNY"></el-option>
           <el-option label="USD" value="USD"></el-option>
           <el-option label="EUR" value="EUR"></el-option>
         </el-select>
       </el-form-item>

        <el-form-item label="承兑金额" required prop="amount" class="saleforfaiting-title">
          <el-input v-model="ruleForm.amount" class="el-input"></el-input>
        </el-form-item>

        <el-form-item label="预期贴现率" required prop="discountRate" class="saleforfaiting-title">
          <el-input v-model="ruleForm.discountRate" class="el-input"></el-input>
        </el-form-item>

        <el-form-item label="期望福费廷资产期限"  class="salefactoring-date">
          <el-col :span="11">
            <el-form-item prop="deadLine">
              <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.deadLine" style="width: 100%;" class="el-input"></el-date-picker>
            </el-form-item>
          </el-col>

        </el-form-item>
        <el-form-item label="信用证类型" prop="creditType">
          <el-select v-model="ruleForm.creditType" placeholder="请选择" class="reg-input1 el-input" >
            <el-option label="国内信用证" value="1"></el-option>
            <el-option label="国外信用证" value="2"></el-option>

          </el-select>
        </el-form-item>

        <el-form-item label="信息有效期" required class="salefactoring-date">
          <el-col :span="11">
            <el-form-item prop="indateMessage">
              <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.indateMessage" style="width: 100%;" class="el-input"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item label="地区/国家" prop="areaId countryId">
           <el-select v-model="ruleForm.areaId" :placeholder="null" id="reg-type3">
             <el-option
              v-for="item in selectData.areaId.data"
              :key="item.name"
              :label="item.name"
              :value="item.id">
             </el-option>
           </el-select>
         <el-select v-model="ruleForm.countryId" :placeholder="null" class="reg-type2">
            <el-option
              v-for="item in selectData.countryId.data"
              :key="item.name"
              :label="item.name"
              :value="item.id">
            </el-option>
         </el-select>
       </el-form-item>

        <el-form-item class="saleforfaiting-button">
          <!-- <router-link to="myhobbyforfeiting"><el-button type="primary" @click="submitForm()">提交</el-button></router-link> -->
          <el-button @click="submitForm('ruleForm')">提交</el-button>
        </el-form-item>
      </el-form>

    </div>

  </div>

</template>
<script type="text/javascript">
import {assetsBuyingDetail} from '../../assets/js/const'
export default {
  data() {
    return {
        selectData: {
          companyTypeId1: {},
          companyTypeId2: {},
          areaId: {},
          countryId: {},
          // ruleForm:{},
          id: this.$route.params.id,

        },
      labelPosition: 'right',
      ruleForm: {
       currency:'',
       resource: '1',
       amount:'',
       discountRate:'',
       deadLine:'',
       creditType:'',
       debtType:'',
       indateMessage:'',
       areaId:'',
       countryId:''
      },
      rules: {
      
        debtType: [
          { required: true, message: '请输入福费廷类型', trigger: 'blur'}
        ],
        currency: [
          { required: true, message: '请输入承兑币种', trigger: 'blur'}
        ],
        amount: [
          { required: true, message: '请输入承兑金额', trigger: 'blur'}
        ],
        discountRate: [
          { required: true, message: '请输入预期贴现率', trigger: 'change'}
        ],
        indateMessage: [
          { type: 'date', required: true, message: '请输入信息有效期', trigger: 'change'}
        ]
      
      }
    };
  },
  mounted(){
    this.initData()
  },
  methods: {
    initData() {
      let that = this;
      this.POST(assetsBuyingDetail,{body:{'id':that.id}},function(response){
        that.ruleForm.data = response.data;
      })
    }
  }
}
</script>
<style media="screen">
.saleforfaiting-main {
  width: 1100px;
  margin: 0 auto;
}
.saleforfaiting-center{
  width: 100%;
}
.el-form-item__label {
  text-align:left;
  float: left;
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
.middle{
  float: left;
  margin-left: 400px;
  margin-top: -600px;
}
.rig{
  float: left;
  margin-left: 800px;
  margin-top: -500px;
}
.saleforfaiting-button{
  float: left;
}
.salefactoring-right{
  float: left;
  margin-left: 500px;
  margin-top: -500px;
}
.salefactoring-date{
  width: 570px;
}



</style>
