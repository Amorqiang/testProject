# demo1

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


<!-- 文件上传  -->
<!-- 示例：html -->
<!-- accept=".xls,.doc,.txt,.pdf" input添加accept可默认上传文件类型 -->
<input type="file" style="font-size: medium;" @change="getFile($event)">
<button style="font-size: medium;" @click="submitForm($event)" value="">提交</button>
<!-- script -->
<!-- change 检测获取input参数 -->
getFile(event) {
  this.file = event.target.files[0];
  console.log(this.file)
},
<!-- 提交 -->
submitForm(event) {
  event.preventDefault();
  let config = {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }
  <!-- {}config为上传需添加，data为请求参数 -->
  this.UpLoad(接口地址-const, {'config': config, 'data': this.file}, function (response) {
    if (response.code === 200) {
      console.log('文件上传成功', response)
    }
  })
}
