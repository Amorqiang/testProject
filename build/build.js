'use strict' // 严格模式代码检查

// 检查NodeJS 和 npm 版本
require('./check-versions')()

// 设置当前环境为生产环境
process.env.NODE_ENV = 'production'
process.env.NODE_VERSION = process.env.npm_package_config_version || '';
console.log('版本号:' + process.env.NODE_VERSION);
// ora，一个可以在终端显示spinner的插件
const ora = require('ora')
// rm，用于删除文件或文件夹的插件
const rm = require('rimraf')
// node自带的文件路径工具
const path = require('path')
// chalk，用于在控制台输出带颜色字体的插件
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')
config.build.env.NODE_VERSION = '"' + process.env.NODE_VERSION + '"';
console.log(config.build.env);
// 文件操作
const fs = require('fs')
// 打zip
const archiver = require('archiver');

// 开启loading动画
const spinner = ora('building for production...')
spinner.start()
// 首先将整个dist文件夹以及里面的内容删除，以免遗留旧的没用的文件
// 删除完成后才开始webpack构建打包
rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  // 执行webpack构建打包，完成之后在终端输出构建完成的相关信息或者输出报错信息并退出程序
  webpack(webpackConfig, function (err, stats) {
    // 停止 loading动画
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))

    // 开始打包有更新的文件
    // hotUpdate(config.build.versionDirectory)
  })
})

function hotUpdate(dir) {
  if (!dir) {
    return;
  }
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  let disFiles = fs.readdirSync(dir);
  for (let i in disFiles) {
    let disFile = disFiles[i];
    let path = dir + '/' + disFile;
    if (fs.statSync(path).isDirectory()) {
      let changeFileList = [];
      let deleteFileList = [];
      let zipFiles = [];
      let allFiles = [];
      getDirAllFiles(path, allFiles);
      for (let p in allFiles) {
        // 文件的相对路径
        let rpath = allFiles[p].replace(path,'');
        // 当前编译目录下的文件
        let cfile = config.build.assetsRoot + rpath;
        if(fs.existsSync(cfile)) {
          if (fs.statSync(allFiles[p]).size !== fs.statSync(cfile).size) {
            changeFileList.push(rpath);
            zipFiles.push(cfile);
          }
        } else {
          deleteFileList.push(rpath);
        }
      }
      // 检查所有编译好的资源文件：
      let compilationFiles =  [];
      getDirAllFiles(config.build.assetsRoot, compilationFiles);
      for (let j in compilationFiles) {
        let name = compilationFiles[j].replace(config.build.assetsRoot,'');
        if(!fs.existsSync(path + name)) {
          changeFileList.push(name);
          zipFiles.push(compilationFiles[j]);
        }
      }
      if (changeFileList.length === 0) {
        return;
      }
      changeFileList.push('/index.html');
      zipFiles.push(config.build.assetsRoot + '/index.html');

      let json = {};
      json.changeFiles = changeFileList;
      json.deleteFiles = deleteFileList;
      // 写入更新信息到文件
      fs.writeFileSync(path + '/updateInfo.json', JSON.stringify(json));
      zipFiles.push(path + '/updateInfo.json');
      // 打变更zip包
      let archive = archiver('zip');
      let output = fs.createWriteStream(path + '/update.zip');
      archive.pipe(output);
      for (let z = 0; z < zipFiles.length; z++) {
        let filePath = zipFiles[z];
        archive.append(fs.createReadStream(zipFiles[z]), {'name': filePath.substring(filePath.lastIndexOf('/')+1)});
      }
      archive.finalize();
    }
  }
  let versionDirName = config.build.assetsRoot.substring(config.build.assetsRoot.lastIndexOf('/') + 1);
  fs.renameSync(config.build.assetsRoot, config.build.versionDirectory + '/' + versionDirName + config.build.version);
}

function getDirAllFiles (dir, arr) {
  let files = fs.readdirSync(dir);
  for (let i in files) {
    let path = dir + '/' + files[i]
    let state = fs.statSync(path);
    if (state.isFile() && files[i].indexOf('.') !== 0
      && !files[i].endsWith('updateInfo.json')
      && !files[i].endsWith('update.zip')
      && !files[i].endsWith('index.html')) {
      arr.push(path);
    } else if (state.isDirectory()) {
      getDirAllFiles(path, arr)
    }
  }
}
