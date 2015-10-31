/**
 * 项目里的Controller基类
 * 这里做一些通用的处理逻辑，其他Controller继承该类
 * @param  {[type]}
 * @return {[type]}         [description]
 */
module.exports = Controller(function() {
  'use strict';

  return {
    init: function(http) {
      var self = this;

      self.super("init", http);

      if (self.http.action != "login") {
        return self.session("userInfo").then(function(value){

          if (isEmpty(value)) {
            if (self.isAjax()) {
              return self.error(403);
            }
          }
          self.userInfo = value;
          self.assign('userInfo',value);
        })
      };
    }
  }
});