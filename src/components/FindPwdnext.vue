<template>
  <div class="findpwdnext-main">


<el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="findpwdnext">
  <div class="findpwdnext-head">
    <span class="findpwdnext-head-title">欢迎登录</span>
  </div>
  <el-form-item label="密码" prop="pass" class="findpwdnext-input">
    <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
  </el-form-item>

  <el-form-item label="确认密码" prop="checkPass" class="findpwdnext-input">
    <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off"></el-input>
  </el-form-item>

  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm2')"  class="findpwdnext-submit">提交</el-button>
    <!-- <el-button @click="resetForm('ruleForm2')">重置</el-button> -->
  </el-form-item>
</el-form>
</div>
</template>
<script>
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm2: {
          pass: '',
          checkPass: ''

        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  };
</script>
<style media="screen">
.findpwdnext-main{
  width: 100%;
  height: 100vh;
  background: url(../assets/login.jpg) no-repeat;
  background-size: 100% 100%;
}
.findpwdnext{
  height: 330px;
  width: 490px;
  background: #e7f8ff;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -245px;
  margin-top: -184px;
  z-index: 99;
}
.findpwdnext-head{
  border-bottom: 1px solid #fff;
  height: 50px;
  line-height: 50px;
  background: #fff;
  text-align: center;

}
.findpwdnext-head-title{
  display: inline-block;
  font-size: 16px;
  color: gray;

}
.findpwdnext-input{
  width: 400px;
  margin-top: 30px;

}
.findpwdnext-submit{
  width: 290px;
}
</style>
