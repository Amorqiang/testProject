<template id="">
  <div class="saleforfaiting-main clearfix">

    <!-- <p>123456</p> -->
    <div class="saleforfaiting-center">
      <h1>出售保理录入页</h1>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="140px" class="saleforfaiting-form">
        <div class="nextsalefactoring-div">


          <p>请点击右侧上传保理合同</p>
          <el-upload class="nextsalefactoring-upload" action="https://jsonplaceholder.typicode.com/posts/"
                     multiple :limit="3"
          >
            <el-button size="small" type="primary">点击上传</el-button>

          </el-upload>
        </div>
        <div class="nextsalefactoring-div">
          <p>请点击右侧上传保险合同</p>
          <el-upload class="nextsalefactoring-upload" action="https://jsonplaceholder.typicode.com/posts/"
                     multiple :limit="3"
          >
            <el-button size="small" type="primary">点击上传</el-button>

          </el-upload>
        </div>
        <div class="nextsalefactoring-div">
          <p>请点击右侧上传运输单据</p>
          <el-upload class="nextsalefactoring-upload" action="https://jsonplaceholder.typicode.com/posts/"
                     multiple :limit="3"
          >
            <el-button size="small" type="primary">点击上传</el-button>

          </el-upload>
        </div>
        <div class="nextsalefactoring-div">
          <p>请点击右侧上传应收账款转让通知书</p>
          <el-upload class="nextsalefactoring-upload" action="https://jsonplaceholder.typicode.com/posts/"
                     multiple :limit="3"
          >
            <el-button size="small" type="primary">点击上传</el-button>

          </el-upload>
        </div>
        <div class="nextsalefactoring-div">
          <p>请点击右侧上传财务报表</p>
          <el-upload class="nextsalefactoring-upload" action="https://jsonplaceholder.typicode.com/posts/"
                     multiple :limit="3"
          >
            <el-button size="small" type="primary">点击上传</el-button>

          </el-upload>
        </div>
        <div class="nextsalefactoring-div">
          <p>请点击右侧上传贸易合同</p>
          <el-upload class="nextsalefactoring-upload" action="https://jsonplaceholder.typicode.com/posts/"
                     multiple :limit="3"
          >
            <el-button size="small" type="primary">点击上传</el-button>

          </el-upload>
        </div>

        <el-form-item class="saleforfaiting-button">
          <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
          <router-link to="forsalebankrunfactoring">
            <el-button @click="resetForm('ruleForm')">提交</el-button>
          </router-link>
        </el-form-item>
      </el-form>

    </div>

  </div>

</template>
<script type="text/javascript">
  export default {
    components: {
      // Footer
    },
    data() {
      return {
        labelPosition: 'right',
        ruleForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        rules: {
          name: [
            {required: true, message: '请输入', trigger: 'blur'},
            {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
          ],
          region: [
            {required: true, message: '请选择活动区域', trigger: 'change'}
          ],
          date1: [
            {type: 'date', required: true, message: '请选择日期', trigger: 'change'}
          ],
          date2: [
            {type: 'date', required: true, message: '请选择时间', trigger: 'change'}
          ],
          type: [
            {type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change'}
          ],
          resource: [
            {required: true, message: '请选择活动资源', trigger: 'change'}
          ],
          desc: [
            {required: true, message: '请填写活动形式', trigger: 'blur'}
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
<style media="screen" lang="less">
  .saleforfaiting-main {
    width: 1100px;
    margin: 0 auto;
  }

  .saleforfaiting-center {
    width: 100%;
  }

  .el-form-item__label {
    text-align: left;
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

  .saleforfaiting-button {
    display: -webkit-flex;
    text-align: center;
    .el-form-item__content {
      display: inline-block;
      margin: 40px auto 40px;
    }
  }

  .nextsalefactoring-upload {
    float: right;
    margin-top: -20px;
    margin-right: 50px;
  }

  .nextsalefactoring-div {
    margin-top: 50px;
  }


</style>
