/**
 * 项目里的Controller基类
 * 这里做一些通用的处理逻辑，其他Controller继承该类
 * @param  {[type]}
 * @return {[type]}         [description]
 */
module.exports = Controller(function(){
  'use strict';

  return {
    init: function(http){
      var self = this;
      self.super("init", http);
      if (self.http.action != "login") {
        return this.session("userInfo").then(function(value){
          if(value){
            self.userInfo = value;
          }else{
            var auth_info = self.cookie(AUTH_ID);
            if(auth_info){
              auth_info = decrypt(auth_info);
              auth_info = auth_info.split('\t');
              self.userInfo = {
                username : auth_info[0],
                id : auth_info[1] - 0,
                avator : auth_info[2] - 0
              }
            }else{
              self.userInfo = null;
            }
          }

          //self.assign('userInfo', value);
        })
      };
    }
  }
})