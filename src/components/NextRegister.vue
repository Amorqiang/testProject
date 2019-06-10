<template>
  <div class="wrapper">
    <div class="inner">
      <!-- 头部信息 -->
      <div class="next-head">
        <span class="next-head-title">欢迎注册</span>
      </div>
      <!-- 中间信息 -->
      <form class="next-form" method="post">
       <div class="next-body">

        <div class="line">
          <span class="next-span">公司名称</span>
          <input @focus="checkcopName" @blur="none" class="next-input" type="text" placeholder="请输入公司名称" name="" value="" v-model="corporateName">


        </div>
        <div class="check">{{msgcopName}}</div>
        <div class="line">
          <span class="next-span">机构注册地</span>
          <input @focus="checkaddress" @blur="none" class="next-input" type="text" placeholder="请选择注册地" name="" value="" v-model="address">


        </div>
        <div class="check">{{msgaddress}}</div>
        <div class="line">
          <span class="next-span">联系人姓名</span>
          <input @focus="checkname" @blur="none" class="next-input" type="text" placeholder="请输入联系人姓名" name="" value="" v-model="name">


        </div>
        <div class="check">{{msgname}}</div>
        <div class="line">
          <span class="next-span">邮箱</span>
          <input @focus="checkemail" @blur="none" type="text" class="next-input" placeholder="请输入邮箱" name="" value="" v-model="email">


        </div>
        <div class="check">{{msgmail}}</div>
        <div class="line">
          <span class="next-span">手机号</span>
          <input @focus="checktelep" @blur="none" type="text" class="next-input" placeholder="请输入手机号" name="" value="" v-model="telephone">


        </div>
        <div class="check">{{msgtelep}}</div>
        <div class="line">
          <span class="next-span">验证码</span>
          <input type="text" class="next-input identification" placeholder="请输入手机验证码" name="" value="" v-model="identifyingCode">
          <button v-show="show" type="button" class="next-button-blue next-blue" name="button" @click="getCode">免费获取验证码</button>
          <button v-show="!show" id="next-button-blue" type="button" name="button" class="count">重新发送{{count}}s</button>
        </div>
        <div class="line">
          <span class="next-span">邀请码</span>
          <input type="text" class="next-input" placeholder="请输入邀请码" name="" value="" v-model="invitationCode">
        </div>
        <div class="line">
          <input type="checkbox" class="next-checkbox" name="" value="">
          <span class="next-agree">同意协议条款：</span>
          <label class="next-agree zichan">资产交易平台各项法律相关条款</label>
        </div>

          <input class="next-submit" type="submit" name="" value="注册" @click="submit">
      </div>
      </form>
      <!-- <form method="post" enctype="multipart/form-data">
        <input type="file" name="file" />
        <input type="text" name="channel" />
        <input type="text" name="token" />
        <input type="text" name="token" />
        <input type="text" name="token" />
        <input type="text" name="token" />
        <input type="text" name="token" />
        <input type="submit" value="提交"/>
      </form> -->

    </div>

  </div>
</template>
<script>
export default {
   data() {
     return {
        corporateName: '',
        address: '',
        name: '',
        email: '',
        telephone: '',
        identifyingCode: '',
        invitationCode: '',
        show: true,
        count: '',
        timer: null,
        msgcopName: '',
        msgaddress: '',
        msgmail: '',
        msgname: '',
        msgtelep: ''

        },
			 },

		 methods:{
			// 点击向后台提交数据
      submit(){
        var params = {
          corporateName: this.corporateName,
          address:this.address,
          name:this.name,
          postbox:this.postbox,
          telephone:this.telephone,
          identifyingCode:this.identifyingCode,
          invitationCode:this.invitationCode
      }
      console.log(123);
      this.$http.post("/api/companyOrg/register",{withCredentials:true},params).then(res => {
        console.log(res.data);
      })
    },
    // 点击验证码按钮发送验证码
    getCode(){
     const TIME_COUNT = 180;
     if (!this.timer) {
       this.count = TIME_COUNT;
       this.show = false;
       this.timer = setInterval(() => {
       if (this.count > 0 && this.count <= TIME_COUNT) {
         this.count--;
        } else {
         this.show = true;
         clearInterval(this.timer);
         this.timer = null;
        }
       }, 1000)
      }



    },
    // 表单验证事件公司名
    checkcopName(){
      if(this.corporateName==""){
        this.msgcopName = "公司名不能为空";
      }else{
        this.msgcopName ="";
      }

    },
    // 表单验证事件地址名
    checkaddress(){
      if(this.address==""){
        this.msgaddress = "地址不能为空";
      }else{
        this.msgaddress ="";
      }

    },
    // 表单验证事件人名
    checkname(){
      if(this.name==""){
        this.msgname = "姓名不能为空";
      }else{
        this.msgname ="";
      }
    },
    // 表单验证事件邮件

    checkemail(){
        var regEmail=/^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;

        if(this.email==''){
          this.msgmail="请输入邮箱";
        }else if(!regEmail.test(this.email)){
          this.msgmail="邮箱格式不正确";
        }else if (regEmail.test(this.email)) {
          this.msgmail="";
        }
      },
      // 表单验证事件手机号
      checktelep(){
        var regTelep = /^1[34578]\d{9}$/;
        if (this.telephone == "") {
          this.msgtelep = "手机号不能为空";

        }else if (!regTelep.test(this.telephone)) {
          this.msgtelep = "请输入有效的手机号码";

        }else {
          this.msgtelep = "";
        }
      },

      none(){
          this.msgcopName ="";
          this.msgaddress ="";
          this.msgname ="";
          this.msgmail="";
          this.msgtelep=''
      }

		}

  }



</script>
<style media="screen">
  @import '../../static/css/normalize.css';
</style>
<style scoped>
.wrapper{
  width: 440px;
  height:640px;
  background: #e7f8ff;
  position: absolute;
  left: 50%;
  top: 50%;
  border-radius: 10px 10px;
  margin-left: -220px;
  margin-top: -320px;
  z-index: 99;
}
/*.inner{
  padding: 5px;
}*/
.next-head{
  border-bottom: 1px solid #f7f7f7;
  height: 50px;
  line-height: 50px;
  background: #d0f0fb;
}
.next-head-title{
  display: inline-block;
  font-size: 16px;
  margin-left: 180px;
  color: gray;
}
.next-span{
  color: #333;
  display: inline-block;
  font-size: 14px;
  margin-right: 10px;
  text-align: right;
  width: 70px;
  margin-top: 20px;
  margin-left: 40px;
}
.next-input{
  background-color: #fff;
  border: none;
  box-sizing: content-box;
  color: grey;
  font-size: 12px;
  height: 21px;
  line-height: 20px;
  margin: 5px 4px 3px;
  outline: none;
  padding: 6px 7px;
  width: 247px;
}
.identification{
  width: 150px;
}
#next-button-blue{
  background-color: #def4fc;
  border: 1px solid #a9d5ea;
  color: #2c7aa6;
  font-size: 12px;
  position: relative;
  top: 1px;
  width: 100px;
  background-position: 0 0!important;
  border-radius: 3px;
  cursor: pointer;
  display: inline-block;
  line-height: 32px;
  outline: none;
  text-align: center;
  transition: .1s;
}
.next-button-blue{
  background-color: #def4fc;
  border: 1px solid #a9d5ea;
  color: #2c7aa6;
  font-size: 12px;
  position: relative;
  top: 1px;
  width: 100px;
  background-position: 0 0!important;
  border-radius: 3px;
  cursor: pointer;
  display: inline-block;
  line-height: 32px;
  outline: none;
  text-align: center;
  transition: .1s;
}
.next-checkbox{
  margin-right: 5px;
  vertical-align: middle;
  margin-left: 120px;
  color: gray;
  border: none;
}
.next-agree{
  font-size: 12px;
}
.zichan{
  color:#5562d7;
}
.next-submit{
  width: 256px;
  margin-left: 115px;
  line-height: 34px;
  background: #0088dd;
  color: #fff;
  outline: none;
  border: none;
  cursor: pointer;
  margin-top: 15px;

}
.next-submit:hover{
  background: yellowgreen;
}

.next-button-blue:hover{
   background-color: #def4ea;
}
.check{
  color: #c5c5c5;
  height: 10px;
  font-size: 12px;
  margin-left: 130px;

}
.line{

  margin-top: 10px;
}


</style>
