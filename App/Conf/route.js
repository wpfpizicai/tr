/**
 * 自定义路由
 * @type {Object}
 */
module.exports = [
  [/^login\/?$/, "admin/index/login"],
  [/^logout\/?$/, "admin/index/logout"],
  [/^manage$/, "admin/course/index"],
  [/^manage\/course\/?$/, "admin/course/index"],
  [/^manage\/partner\/?$/, "admin/partner/index"],
  [/^manage\/resource\/?$/, "admin/resource/index"],
  [/^manage\/teacher\/?$/, "admin/teacher/index"],
  [/^manage\/notice$/, "admin/notice/index"],

  //消息公告的增删改查
  ['manage/notice/list', "admin/notice/list"],
  ['manage/notice/add', "admin/notice/add"],
  ['manage/notice/update', "admin/notice/update"],
  ['manage/notice/delete', "admin/notice/delete"],

  ["user/see/:id", "user/see"],
  ["user/avator/:id", "user/avator"],
  ["user/verifyemail/:id", "user/verifyemail"],
  ["user/setpwd/:id", "user/setpwd"],
  ["user/mycourse/:id", "user/mycourse"],
  ["course/view/:id", "course/view"],
  ["course/video/:id/:v_id", "course/video"],
  ["partner/view/:id", "partner/view"]
]
