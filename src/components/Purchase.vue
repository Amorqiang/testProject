<template>
  <div class="outer">


  <div class="">
    <span class="pur-span">标题</span>
    <input class="pur-input" type="text" name="" value="">

  </div>
  <div class="">
    <span class="pur-span">金额</span>
    <input class="pur-input" type="text" name="" value="">

  </div>
  <div class="">
    <span class="pur-span">币种</span>
    <select class="pur-input"  name="">
      <option value="">请选择</option>
      <option value="">CNY</option>
      <option value="">USD</option>
      <option value="">EUR</option>

    </select>11

  </div>
  <div class="">
    <span class="pur-span">底价</span>
    <input class="pur-input ne-input" type="text" name="" value="">
    <input class="pur-input ne-input" type="text" name="" value="">

  </div>
  <div class="">
    <span class="pur-span">资产期限</span>
    <input class="pur-input ne-input" type="text" name="" value="">
    <input class="pur-input ne-input" type="text" name="" value="">

  </div>
  <div class="">
    <span class="pur-span">信用证类型</span>
    <select class="pur-input"  name="">
      <option value="">NEGOTIATION</option>
      <option value="">ACCEPTANCE</option>
      <option value="">DEF PAYMENT</option>


    </select>

  </div>
  <div class="">
    <span class="pur-span">信息有效期</span>
    <input class="pur-input ne-input" type="text" name="" value="">
    <input class="pur-input ne-input" type="text" name="" value="">

  </div>
  <div class="">
    <span class="pur-span">地区</span>
    <select class="pur-input"  name="">
      <option value="">亚洲</option>
      <option value="">欧洲</option>
      <option value="">美洲</option>
      <option value="">大洋洲</option>
      <option value="">非洲</option>


    </select>

  </div>
  <div class="">
    <span class="pur-span">国家</span>
    <select class="pur-input" name="">
      <option value="">中国</option>
      <option value="">新加坡</option>
      <option value="">泰国</option>
      <option value="">马来西亚</option>
    </select>

  </div>
  <footer class="foot">
    <router-link to="/login">
      <div>登录</div>
    </router-link>
    <router-link to="/register">
      <div>注册</div>
    </router-link>
    <router-link to="/purchase">
      <div>求购</div>
    </router-link>

  </footer>
</div>
</template>
<script>

</script>
<style scoped>
.outer{
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
.pur-span{
  color: #333;
  display: inline-block;
  font-size: 14px;
  margin-right: 10px;
  text-align: right;
  width: 70px;
  margin-top: 20px;
  margin-left: 40px;
}
.pur-input{
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
.ne-input{
  width: 98px;
}


</style>
