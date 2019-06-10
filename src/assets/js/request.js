import axios from 'axios';
import Cookies from 'js-cookie';
import {baseUrl, upLodeUrl} from './env';

function cloneObj(oldObj) { // 复制对象方法
  if (typeof oldObj !== 'object') return oldObj;
  if (oldObj == null) return oldObj;
  var newObj = {};
  for (var i in oldObj) {
    // 递归调用得方式将数据clone到新定义得对象中
    newObj[i] = cloneObj(oldObj[i]);
  }
  return newObj;
};

function extendObj() { // 扩展对象
  var args = arguments;
  if (args.length < 2) return;
  var temp = cloneObj(args[0]); // 调用复制对象方法
  for (var n = 1; n < args.length; n++) {
    for (var i in args[n]) {
      temp[i] = args[n][i];
    }
  }
  return temp;
}

export const UpLoad = async function () {
  let url = arguments[0];
  if (url.indexOf('/') === 0) {
    url = upLodeUrl + url;
  }
  let data = arguments[1];
  if (!data) {
    data = {};
  }
  let callback = arguments[2];
  let formData = new FormData();
  formData.append('userName', Cookies.get('currentId') || '');
  formData.append('language', 'cn');
  formData.append('token', Cookies.get('token') || '');
  if (data.config) {
    formData.append('file', data.data);
    axios.post(url, formData, data.config)
      .then(function (response) {
        if (response.data.code === 200) {
          callback(response.data);
        } else {
          let e = {'code': response.data.code, 'message': response.data.message};
          callback(e);
        }
      });
    return;
  }
  axios.post(url, data.data)
    .then(function (response) {
    });
};
export const POST = async function () {
  let url = arguments[0];
  if (url.indexOf('/') === 0) {
    url = baseUrl + url;
  }
  let data = arguments[1];
  if (!data) {
    data = {};
  }
  let callback = arguments[2];
  // 接口文档中 参数位置是 Param 的数据传递
  // if (data && data._param) {
  //   url += '&' + querystring.stringify(data._param);
  //   delete data._param;
  // }
  // console.log('====== 请求信息 ======');
  // console.log('url：' + url);
  // console.log('请求数据：');
  let newData = {};
  newData.header = {
    'channel': 1,
    'language': arguments[3]
  };
  let _sessionId = Cookies.get('token');
  let _currentId = Cookies.get('currentId');
  if (_sessionId) {
    newData.header.token = _sessionId;
    newData.header.currentId = _currentId;
  }
  newData.body = {};
  var _dataHeader = extendObj(newData.header, data.header);
  var _dataBody = extendObj(newData.body, data.body);
  var _data = JSON.stringify({'header': _dataHeader, 'body': _dataBody});
  axios.post(url, _data, {headers: {'Content-Type': 'application/json'}})
    .then(function (response) {
      // console.log('====== 返回信息 ======');
      console.log('url：' + url);
      // console.log('返回数据：');
      console.log(response.data);
      if (response.data.code === 300) {
        callback(response.data);
      } else {
        let e = {'code': response.data.code, 'message': response.data.message};
        callback(e);
      }
    })
    .catch(function (error) {
      console.log('====== 请求出错 ======');
      console.log('url：' + url);
      console.log('错误信息：');
      console.log(error);
      // if (error.response) {
      //   let code = error.code;
      //   let msg = error.message;
      //   switch (code) {
      //     case 400:
      //       msg = '请求信息有误';
      //       break;
      //   }
      //   let e = {'statusCode': code, 'statusMessage': msg};
      //   callback(e);
      // } else {
      //   let e = {'statusCode': 600, 'statusMessage': error.message === 'Network Error' ? '网络异常, 请检查网络稍后再试' : '数据处理错误'};
      //   callback(e);
      // }
    });
};
