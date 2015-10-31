module.exports = {
  //配置项: 配置值
  api_host : '127.0.0.1', //java 服务地址
  port: 8360, //监听的端口
  api_host_part : 'onlineLearningService' , //java 服务地址的url的一部分
  db_type: 'mysql', // 数据库类型
  db_host: '127.0.0.1', // 服务器地址
  db_port: '', // 端口
  db_name: 'nodejs', // 数据库名
  db_user: 'nodejs', // 用户名
  db_pwd: '', // 密码
  db_prefix: 'think_', // 数据库表前缀
  app_group_list: ['Home', 'Admin'], //分组列表
  default_action: 'index',
  show_exec_time: true,
  tpl_file_suffix: ".ejs",
  log_console: true, // 是否记录日志，开启后会重写 console.error 等系列方法
  log_console_path: LOG_PATH + '/console', // 日志文件存放路径
  log_console_type: ['error','log'], // 默认只接管 console.error 日志
  url_resource_reg: /^(upload\/|resource\/|static\/|favicon\.ico|robot\.txt)/ ,//判断是否是静态资源的正则
  post_max_file_size: 1024 * 1024 * 1024, //上传文件大小限制，默认1G
  post_max_fields: 100, //最大表单数，默认为100
  post_max_fields_size: 2 * 1024 * 1024, //单个表单长度最大值，默认为2MB
  post_file_upload_path: APP_PATH + '/Runtime/Temp' //文件上传的临时目录
};
