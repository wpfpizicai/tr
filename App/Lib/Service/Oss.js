var ALY = require('aliyun-sdk');
var fs = require('fs');
var end = 'oss-cn-beijing';

var oss = new ALY.OSS({
  "accessKeyId": "Eyk3M6NGAkd0ps1t",
  "secretAccessKey": "fxKbjanQdGs0aHwofBXipWVCeUgZrS",
  // 根据你的 oss 实例所在地区选择填入
  // 杭州：http://oss-cn-hangzhou.aliyuncs.com
  // 北京：http://oss-cn-beijing.aliyuncs.com
  // 青岛：http://oss-cn-qingdao.aliyuncs.com
  // 深圳：http://oss-cn-shenzhen.aliyuncs.com
  // 香港：http://oss-cn-hongkong.aliyuncs.com
  // 注意：如果你是在 ECS 上连接 OSS，可以使用内网地址，速度快，没有带宽限制。
  // 杭州：http://oss-cn-hangzhou-internal.aliyuncs.com
  // 北京：http://oss-cn-beijing-internal.aliyuncs.com
  // 青岛：http://oss-cn-qingdao-internal.aliyuncs.com
  // 深圳：http://oss-cn-shenzhen-internal.aliyuncs.com
  // 香港：http://oss-cn-hongkong-internal.aliyuncs.com
  endpoint: 'http://' + end + '.aliyuncs.com',
  // 这是 oss sdk 目前支持最新的 api 版本, 不需要修改
  apiVersion: '2013-10-15'
});


function put (file , cfg) {
  var deferred = getDefer();
  var cfg = cfg || {};
  var key = cfg.key || '';
  var bucket = cfg.bucket || 'n-teacher';
  var filename = file.originalFilename;

  fs.readFile(file.path , function (ferr, fdata) {
    if (ferr) {
      deferred.reject(ferr)
    }

    oss.putObject({
        Bucket: bucket,
        Key: key + filename,
        Body: fdata,
        AccessControlAllowOrigin: '',
        ContentType: file.headers['content-type'],
        CacheControl: 'max-age=15552000',
        ContentDisposition: '',
        ContentEncoding: 'utf-8',
        ServerSideEncryption: 'AES256',
        Expires: new Date('2016-12-31')
      },
      function (err, data) {
        if (err) {
          deferred.reject(err)
        }else{
          deferred.resolve(extend(data, {
            url : 'http://' + bucket + '.' + end + '.aliyuncs.com/' + key + filename,
            name : file.originalFilename
          }));
        }
      });
  });
  return deferred.promise;
};

module.exports = {
  'put' : put
};
