module.exports = {
  //配置项: 配置值
  api_host : '123.57.72.114', //java 服务地址
  api_host_part : 'nebulafeTest' , //java 服务地址的url的一部分
  port: 8361, //监听的端口
  db_type: 'mysql', // 数据库类型
  db_host: '123.57.72.114', // 服务器地址
  db_port: '', // 端口
  db_name: 'nodejs', // 数据库名
  db_user: 'nodejs', // 用户名
  db_pwd: '', // 密码
  db_prefix: 'think_', // 数据库表前缀
  app_group_list: ['Home', 'Admin'], //分组列表
  default_action: 'index',
  tpl_file_suffix: ".ejs",
  url_resource_reg: /^(upload\/|resource\/|static\/|favicon\.ico|robot\.txt)/ ,//判断是否是静态资源的正则
  post_max_file_size: 1024 * 1024 * 1024, //上传文件大小限制，默认1G
  post_max_fields: 100, //最大表单数，默认为100
  post_max_fields_size: 2 * 1024 * 1024, //单个表单长度最大值，默认为2MB
  post_file_upload_path: APP_PATH + '/Runtime/Temp' //文件上传的临时目录
};