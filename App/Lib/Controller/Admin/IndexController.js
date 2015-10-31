/**
 * controller
 * @return
 */
module.exports = Controller("Admin/BaseController", function() {
  "use strict";


  var Service = require("../../Service/Service");
  var oss = require("../../Service/Oss");


  return {
    loginAction: function() {
      var self = this;
      if(self.isGet()){
        return self.display();
      }else if(self.isPost()){
        var data = self.post();
        if(!data.email || !data.pwd){
          return self.err("请输入正确的用户名和密码")
        }
        Service.loginUser({
          username : data.email,
          password : data.pwd
        }).then(function(content){
          if(isNumber(content)){
            if(content == -1){
              throw new Error("没有找到该用户！")
            }else if(content == -2){
              throw new Error("用户名或者密码错误！")
            }else{
              Service.getUserById({id : content}).then(function(u_content){
                if(u_content && u_content[0]){
                  var userInfo = u_content[0];
                  if(userInfo.isAdmin == 1){
                    self.session('userInfo',u_content[0])
                    return self.success();
                  }else{
                    return self.redirect("/")
                  }
                }
              })
            }
          }else{
            throw new Error("系统异常，请稍后再试！")
          }
        }).catch(function(err){
          self.error(err.message || "系统异常，请稍后再试！");
        })
      }
    },
    logoutAction: function(){
      var self = this;
      self.session("userInfo","");
      self.redirect("/login");
    },

    indexAction: function(){
      var self = this;
      self.redirect('/')
    },

    manageAction : function(){
      var self = this;
      if(self.userInfo && self.userInfo.isAdmin == 1){
        if(self.isGet()){
          self.assign({
            header_index:1,
            title : "管理后台-课程管理",
            userInfo : self.userInfo
          })
          return self.display()
        }else if(self.isPost()){
          var file = self.file('file');
          var img = self.file('img');
          getPromise([oss.put(file),oss.put(img)]).then(function(data){
            self.success(data)
          }).catch(function(err){
            self.error(err)
          })
          // oss.put(file).then(function(data){
          //   self.success(data)
          // }).catch(function(err){
          //   self.error(err)
          // })
        }
      }else{
        self.redirect("/")
      }
    },

    addcourseAction : function(){
      var self = this;
      if(self.userInfo && self.userInfo.isAdmin == 1){
        if(self.isPost()){
          var data = self.post();
          if(!data.partner){
            return self.error("请选择合适的合作方！")
          }
          Service.addCourse(data).then(function(content){
            self.success(content);
          }).catch(function(err){
            self.error(err);
          })
        }
      }
    },

    addteacherAction : function(){
      var self = this;
      if(self.userInfo && self.userInfo.isAdmin == 1){
        if(self.isPost()){
          var data = self.post();
          if(!data.course){
            return self.error("请选择合适的课程！")
          }
          Service.addTeacher(data).then(function(content){
            self.success(content);
          }).catch(function(err){
            self.error(err);
          })
        }
      }
    },

    addpartnerAction : function(){
      var self = this;
      if(self.userInfo && self.userInfo.isAdmin == 1){
        if(self.isPost()){
          var data = self.post();
          Service.addPatner(data).then(function(content){
            self.success(content)
          }).catch(function(err){
            self.error(err);
          })
        }
      }
    },

    addresourceAction : function(){
      var self = this;
      if(self.userInfo && self.userInfo.isAdmin == 1){
        if(self.isPost()){
          var data = self.post();
          Service.addResource(data).then(function(content){
            self.success(content)
          }).catch(function(err){
            self.error(err)
          })
        }
      }
    }
  };
});
