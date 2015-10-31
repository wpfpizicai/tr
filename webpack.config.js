/**
 * Created by wungcq on 15/9/30.
 */

var webpack = require('webpack');
var _devPath ='./www/resource/js/component/dev';
var _distPath ='./www/resource/js/component/dist'


module.exports = {
  entry: {
    Selector:[_devPath+'/Selector/index.jsx'],
    Admin__SendMessage: [_devPath+'/Admin/send_Message.jsx'],
    Admin__Service: [_devPath+'/Admin/service.jsx']
  },
  output: {
    path: _distPath,
    filename: '[name].js'
  },

  module: {
    loaders: [{
      test: /\.js$/,
      loader: 'babel-loader'
    }, {
      test: /\.jsx$/,
      loader: 'babel-loader!jsx-loader'
    }]
  },
  resolve: {
    //查找module的话从这里开始查找
    root: './public/react/', //绝对路径
    //自动扩展文件后缀名，意味着我们require模块可以省略不写后缀名
    extensions: ['', '.js', '.jsx','.json', '.scss'],
    //模块别名定义，方便后续直接引用别名，无须多写长长的地址
    //alias: {
    //  React: './public/js/lib/react.js'//后续直接 require('AppStore') 即可
    //}
  },
  externals: {
    // require("jquery") is external and available
    //  on the global var jQuery
    "jquery": "jQuery",
    "react" : "React"
  }
};
