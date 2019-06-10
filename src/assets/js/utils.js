import Vue from 'vue';
// 校验手机号 --- 工具
export const validPhone = function (rule, value, callback) {
  if (!value) {
    callback(new Error(rule.messageEmpty));
  } else if (!isvalidPhone(value)) {
    callback(new Error(rule.messageCorrect));
  } else {
    callback();
  }
};

function isvalidPhone(str) {
  const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
  return reg.test(str);
}

function isvalidEmail(str) {
  // const reg =/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/
  const reg = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
  return reg.test(str);
}

// 同时校验手机号与邮箱 --- 工具
export const validEmailPhone = function (rule, value, callback) {
  if (!value) {
    callback(new Error(rule.message));
  } else if ((isvalidEmail(value) || isvalidPhone(value)) && value.length < 51) {
    callback();
  } else {
    callback(new Error(rule.message));
  }
};
// 校验利率 0 - 99.9999
export const checkDiscountRate = function (rule, value, callback) {
  if (!value) {
    callback();
  } else {
    let reg = /^(([1-9][0-9]*)|(([0]\.\d{1,4}|[1-9][0-9]*\.\d{1,4})))$/;
    if (!reg.test(value)) {
      callback(new Error(rule.numDecimal));
    } else {
      if (parseInt(value) < 100) {
        // 保留小数点后四位的过滤器，尾数不四舍五入
        callback();
      } else {
        callback(new Error(rule.numSection));
      }
    }
  }
};
// 校验金额 1-99999999999.99
export const checkAmount = function (rule, value, callback) {
  if (value && Number(value) <= 0) {
    let reg = /^([1-9]\d{0,10})([.]?|(\.\d{1,2})?)$/;
    if (!reg.test(value)) {
      callback(new Error(rule.message));
    } else {
      callback();
    }
  } else {
    callback();
  }
};
// 校验邮箱 --- 工具
export const validEmail = function (rule, value, callback) {
  if (!value) {
    callback(new Error(rule.messageEmpty));
  } else if (!isvalidEmail(value) || value.length > 50) {
    callback(new Error(rule.messageCorrect));
  } else {
    callback();
  }
};
// 截取url参数 --- 工具 GetUrlParam('name')
export const GetUrlParam = function (paraName) {
  var url = document.location.toString();
  var arrObj = url.split('?');
  if (arrObj.length > 1) {
    var arrPara = arrObj[1].split('&');
    var arr;
    for (var i = 0; i < arrPara.length; i++) {
      arr = arrPara[i].split('=');
      if (arr != null && arr[0] === paraName) {
        return arr[1];
      }
    }
    return '';
  } else {
    return '';
  }
};

// 截取小数点两位
export const toFixed = function () {
  Vue.filter('toFixed', function (val) {
    val = val.toString().replace(/\$|\,/g, '');
    if (isNaN(val)) {
      val = '0';
    }
    let sign = (val === (val = Math.abs(val)));
    val = Math.floor(val * 100 + 0.50000000001);
    let cents = val % 100;
    val = Math.floor(val / 100).toString();
    if (cents < 10) {
      cents = '0' + cents;
    }
    for (var i = 0; i < Math.floor((val.length - (1 + i)) / 3); i++) {
      val = val.substring(0, val.length - (4 * i + 3)) + ',' + val.substring(val.length - (4 * i + 3));
    }
    return (((sign) ? '' : '-') + val + '.' + cents);
  });
};
// 三位数+，
export const NumFormat = function () {
  Vue.filter('NumFormat', function (value) {
    if (!value) return '0.00';
    var intPart = Number(value).toFixed(0); // 获取整数部分
    var intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); // 将整数部分逢三一断
    return intPartFormat;
  });
};
// 资产状态
export const assetsState = function (status, lang) {
  // 101  待提交待提交 102  复核中复核中 103  系统风控已审核(待发布)系统风控已审核(待发布) 104 报价中 108 撮合成功  109 审核失败(卖家) 120 卖家确认 125 买家确定 126 待售已失效 130 交易完成 140 拒绝(黑名单) 150 取消(下降)
  // 201 待运营经办审核(系统) 202 待运营复核审核(系统)  203 待风控经办审核(系统) 204 待风控复核审核(系统)  210 运营审核未通过(系统) 211 风控审核未通过(系统)'
  let color = '';
  let bg = '';
  let state = '';
  switch (status + '') {
    case '101':
      state = (lang === 'cn') ? '待提交' : 'Going to Submit';
      bg = '#e4e4e4';
      color = '#000000';
      break;
    case '102':
      state = (lang === 'cn') ? '复核中' : 'Reviewing';
      bg = '#dff7f7';
      color = '#16c216';
      break;
    case '103':
      state = (lang === 'cn') ? '待发布' : 'Going to Post';
      bg = '#e4e4e4';
      color = '#555555';
      break;
    case '104':
      state = (lang === 'cn') ? '报价中' : 'Quoting';
      bg = '#e4e4e4';
      color = '#000000';
      break;
    case '108':
      state = (lang === 'cn') ? '撮合成功' : 'Matched';
      bg = '#dff7f7';
      color = '#13b917';
      break;
    case '109':
      state = '复核未通过';
      state = (lang === 'cn') ? '复核未通过' : 'Reviewer Rejected';
      bg = '#ffe2e6';
      color = '#ff4d4a';
      break;
    case '120':
      state = (lang === 'cn') ? '撮合成功' : 'Matched';
      bg = '#dff7f7';
      color = '#13b917';
      break;
    case '125':
      state = (lang === 'cn') ? '撮合成功' : 'Matched';
      bg = '#dff7f7';
      color = '#13b917';
      break;
    case '126':
      state = '已失效';
      state = (lang === 'cn') ? '已失效' : 'No sale';
      bg = '#ffe2e6';
      color = '#ff000b';
      break;
    case '130':
      state = (lang === 'cn') ? '交易完成' : 'Transaction Completed';
      bg = '#dff7f7';
      color = '#23bc2c';
      break;
    case '140':
      state = '拒绝(黑名单)';
      state = (lang === 'cn') ? '拒绝(黑名单)' : 'Rejection (blacklist)';
      bg = '#e4e4e4';
      color = '#000000';
      break;
    case '150':
      state = '已取消';
      state = (lang === 'cn') ? '已取消' : 'Cancelled';
      bg = '#e4e4e4';
      color = '#6d6d6d';
      break;
    case '201':
      state = '审核中';
      state = (lang === 'cn') ? '审核中' : 'To audit';
      bg = '#dff7f7';
      color = '#1ac224';
      break;
    case '202':
      state = '审核中';
      state = (lang === 'cn') ? '审核中' : 'To audit';
      bg = '#dff7f7';
      color = '#1ac224';
      break;
    case '203':
      state = '审核中';
      state = (lang === 'cn') ? '审核中' : 'To audit';
      bg = '#dff7f7';
      color = '#1ac224';
      break;
    case '204':
      state = '审核中';
      state = (lang === 'cn') ? '审核中' : 'To audit';
      bg = '#dff7f7';
      color = '#1ac224';
      break;
    case '210':
      state = '审核未通过';
      state = (lang === 'cn') ? '审核未通过' : 'Operator Rejected';
      bg = '#ffe2e6';
      color = '#f8001a';
      break;
    case '211':
      state = '审核未通过';
      state = (lang === 'cn') ? '审核未通过' : 'Operator Rejected';
      bg = '#ffe2e6';
      color = '#f8001a';
      break;
    case '2222':
      state = '已取消';
      state = (lang === 'cn') ? '已取消' : 'Cancelled';
      bg = '#dff7f7';
      color = '#6d6d6d';
      break;
    case '44441':
      state = '已取消';
      state = (lang === 'cn') ? '已取消' : 'Cancelled';
      bg = '#dff7f7';
      color = '#000000';
      break;
    case '44442':
      state = '已取消';
      state = (lang === 'cn') ? '已取消' : 'Cancelled';
      bg = '#dff7f7';
      color = '#000000';
      break;
    default:
      state = '';
  }
  return {
    state: state,
    bg: bg,
    color: color
  };
};
