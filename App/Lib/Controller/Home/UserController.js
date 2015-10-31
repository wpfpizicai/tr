/**
 * controller
 * @return
 */
module.exports = Controller("Home/BaseController", function(){
  "use strict";
  var Service = require("../../Service/Service");
  var captchapng = require('captchapng');

  return {
    updateAction: function(){
      var self = this;
      if(self.isGet()){
        return self.redirect("/");
      }else if(self.isPost()){
        var user_id = self.post('id');
        var _user_id = self.userInfo.id;
        if (_user_id) {
          if(_user_id == user_id){
            var data = self.post();
            Service.updateUserById(data).then(function(content){
              if(content == 0){
                if((data.avator - 0) > 0){
                  self.session('userInfo').then(function(value){
                    if(value){
                      self.session('userInfo',extend(value,data))
                    }else{
                      var c_value = self.cookie(AUTH_ID)
                      c_value = decrypt(c_value);
                      c_value = c_value.split('\t');
                      c_value[2] = data.avator;
                      self.cookie(AUTH_ID, encrypt(c_value.join("\t")), {
                          domain: "",
                          path: "/",
                          httponly: true,
                          timeout: 60 * 60 * 24 * 30
                      })
                    }
                  }).then(function(){
                    return self.success()
                  })
                }else{
                  return self.success()
                }
              }else if(content == -1){
                throw new Error('没有找到该用户！')
              }
            }).catch(function(err){
              return self.error(err.message || "系统异常，请稍后再试！")
            })
          }else{
            self.session('userInfo', '');
            self.redirect('/');
          }
        }else{
          self.redirect('/');
        }
      }
    },

    logoutAction: function() {
      var self = this;
      if(self.isGet()){
        self.session('userInfo', '');
        self.cookie(AUTH_ID, '',  {
            domain: "",
            path: "/",
            httponly: true,
            timeout: 0
        });
        self.redirect('/');
      }
    },

    signinAction: function(){
      var self = this;
      if(self.isGet()){

      }else if(self.isPost()){
        var data = self.post();
        if(!data.username || !data.password){
          return self.error("请输入正确的用户名和密码")
        }
        Service.createUser(data).then(function(content){
          if(isNumber(content)){
            if(content == -1){
              throw new Error("用户已经存在！")
            }else if(content == -2){
              throw new Error("系统异常，请稍后再试！")
            }else{
              self.session('userInfo',extend({},data,{id:content}))
              return self.success(content);
            }
          }else{
            throw new Error("系统异常，请稍后再试！")
          }
        }).catch(function(err){
          return self.error(err.message || "系统异常，请稍后再试！")
        })
      }
    },

    loginAction: function(){
      var self = this;
      if(self.isGet()){

      }else if(self.isPost()){
        var data = self.post();
        if(!data.username || !data.password){
          return self.err("请输入正确的用户名和密码")
        }
        Service.loginUser(data).then(function(content){
          if(isNumber(content)){
            if(content == -1){
              throw new Error("没有找到该用户！")
            }else if(content == -2){
              throw new Error("用户名或者密码错误！")
            }else{
              Service.getUserById({id : content}).then(function(u_content){
                if(data.remember == 1){
                  self.cookie(AUTH_ID, encrypt(data.username + '\t' + content  + '\t' + u_content[0].avator), {
                      domain: "",
                      path: "/",
                      httponly: true,
                      timeout: 60 * 60 * 24 * 30
                  })
                }
                self.session('userInfo',{id:content,avator : u_content[0].avator,username:u_content[0].username})
                return self.success();
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

    checkemailAction: function(){
      var self = this;
      Service.checkEmail({"username" : this.param('username')}).then(function(content){
        if(content == 0){
          return self.success({num : content})
        }else if(content == 1){
          return self.success({num : content , msg : "用户已经存在！"})
        }
      }).catch(function(err){
        self.error(err);
      })
    },

    forgetAction: function(){
      var self = this;
      if(self.isGet()){
        self.assign({
          title : "忘记密码",
          section : 'user',
          link: 'forget',
          userInfo : self.userInfo
        })
        return self.display()
      }else if(self.isPost()){
        var data = self.post();
        self.session('captchacode').then(function(res){
          if(data.verifycode == res){
            Service.sendEmail({
              email: data.email,
              subject : "找回密码",
              link:'forget',
              message : "http://www.nebulafe.com/user/reset/?verify=" + encrypt(data.email)
            })
            return self.success();
          }else{
            self.error("验证码错误！");
          }
        })
      }
    },

    // for the same user
    seeAction: function(){
      var self = this;
      if(self.isGet()){
        var user_id = self.get('id');
        if(!user_id){
          return self.redirect("/");
        }
        var value = self.userInfo;
        Service.getUserById({id:user_id}).then(function(content){
          self.assign({
            title : "查看用户",
            section : 'user',
            link:'see',
            userInfo : content[0]
          })
          return self.display()
        }).catch(function(err){})
      }
    },

    // for the other user
    profileAction : function(){
      var  self = this;
      if(self.isGet()){
        var user_id = self.get('id');
        if(!user_id){
          return self.redirect("/")
        }
        var value = self.userInfo;
        if(value && value.id == user_id){
          return self.redirect("/user/see/" + user_id)
        }
        Service.getUserById({id : user_id}).then(function(content){
          self.assign({
            title : "查看用户",
            section : 'user',
            link : 'see',
            avator : content[0].avator,
            nickname : content[0].nickname
          })
          return self.display()
        })
      }
    },

    avatorAction : function(){
      var self = this;
      if(self.isGet()){
        var user_id = self.get('id');
        if(!user_id){
          return self.redirect("/");
        }
        var value = self.userInfo;
        Service.getUserById({id:user_id}).then(function(content){
          self.assign({
            title : "设置头像",
            section : 'user',
            link:'avator',
            userInfo : content[0]
          })
          return self.display()
        }).catch(function(err){})
      }
    },

    verifyemailAction : function(){
      var self = this;
      if(self.isGet()){
        var user_id = self.get('id');
        if(!user_id){
          return self.redirect("/");
        }
        var value = self.userInfo;
        Service.getUserById({id:user_id}).then(function(content){
          self.assign({
            title : "验证邮箱",
            section : 'user',
            link:'verifyemail',
            userInfo : content[0]
          })
          return self.display()
        }).catch(function(err){})
      }else if(self.isPost()){
        var data = self.post();
        self.session('captchacode').then(function(res){
          if(data.verifycode == res){
            Service.sendEmail({
              email: data.email,
              subject : "验证邮箱",
              message : "http://www.nebulafe.com/user/activate/?verify=" + encrypt(data.email)
            })
            return self.success();
          }else{
            self.error("验证码错误！");
          }
        })
      }
    },

    setpwdAction : function(){
      var self = this;
      if(self.isGet()){
        var user_id = self.get('id');
        if(!user_id){
          return self.redirect("/");
        }
        var value = self.userInfo;
        Service.getUserById({id:user_id}).then(function(content){
          self.assign({
            title : "修改密码",
            section : 'user',
            link:'setpwd',
            userInfo : content[0]
          })
          return self.display()
        }).catch(function(err){})
      }else if(self.isPost()){
        var value = self.userInfo;
        var data = self.post();
        if(data.id != value.id){
          self.session();
          return self.error("你无权修改其他用户的密码！")
        }else{
          Service.getUserById({id : data.id}).then(function(content){
            if(content[0].username){
              Service.loginUser({
                username : content[0].username,
                password : data.opwd
              }).then(function(u_content){
                if(u_content > 0){
                  Service.resetPwd({
                    username : content[0].username,
                    password : data.npwd
                  }).then(function(r_content){
                    if(content == -1){
                      throw new Error("不存在此用户！")
                    }else if(content == -2){
                      throw new Error("重置失败！")
                    }else{
                      return self.success()
                    }
                  })
                }else{
                  throw new Error("原密码错误，请重新输入！")
                }
              }).catch(function(err){
                return self.error(err.message || "系统异常，请稍后再试！");
              })
            }else{
              self.session();
              self.cookie(AUTH_ID, '',  {
                  domain: "",
                  path: "/",
                  httponly: true,
                  timeout: 0
              });
              throw new Error("不存在此用户")
            }
          }).catch(function(err){
            return self.error(err.message || "系统异常，请稍后再试！");
          })
        }
      }
    },

    resetAction: function(){
      var self = this;
      if(self.isGet()){
        var id = self.get('verify');
        if(!id){
          self.redirect("/")
        }else{
          try{
            var email = decrypt(id);
            if(!isEmail(email)){
              self.redirect("/")
            }
            self.assign({
              title : "重置密码",
              section : 'user',
              link:'reset',
              userInfo : self.userInfo,
              email: email
            });
            self.display()
          }catch(e){
            return self.redirect("/")
          }
        }
      }else if(self.isPost()){
        var data = self.post();
        Service.resetPwd(data).then(function(res){
          self.success(res)
        }).catch(function(e){
          self.error("系统异常，请稍后再试！");
        })
      }
    },

    getcodeAction: function(){
      var self = this;
      var captchacode = parseInt(Math.random()*9000+1000);
      self.session('captchacode', captchacode);
      var p = new captchapng(70,38,captchacode);
      p.color(0, 12, 0, 0);
      p.color(80, 80, 200, 255);

      var img = p.getBase64();
      var imgbase64 = new Buffer(img,'base64');
      self.header({
          'Content-Type': 'image/png'
      })
      self.end(imgbase64);
    },

    activateAction : function(){
      var self = this;
      if(self.isGet()){
        var id = self.get('verify');
        if(!id){
          self.redirect("/")
        }else{
          try{
            var email = decrypt(id);
            if(!isEmail(email)){
              return self.redirect("/")
            }
            Service.getUserById({"username" : email}).then(function(content){
              if(content && content[0]){
                Service.setUserStatus({
                  "id": content[0].id,
                  "activate_email" : true
                })
                return self.redirect('/')
              }
            })
          }catch(e){
            return self.redirect("/")
          }
        }
      }
    },

    mycourseAction : function(){
      var self = this;
      if(self.isGet()){
        var user_id = self.get('id');
        if(!user_id){
          return self.redirect("/");
        }
        var value = self.userInfo;
        if(!value){
          return self.redirect("/");
        }

        Service.getUserFocus({userid : user_id}).then(function(content){
          self.assign({
            title : "我的课程",
            section : 'user',
            link:'mycourse',
            userInfo : value,
            f_courses :content
          })
          return self.display()
        })
      }
    },

    studycourseAction : function(){
      var self = this;
      var value = self.userInfo;
      var user_id = self.get('id');
      if(!user_id){
        return self.redirect("/")
      }
      if(value && value.id > 0){
        Service.getStudyProgress({userid : user_id}).then(function(content){
          return self.success(content) ;
        }).catch(function(err){
          self.error("系统异常，请稍后再试！");
        })
      }
    },

    messageAction : function(){
      var self = this;
      if(self.isGet()){
        var value = self.userInfo;
        if(!value || !value.id){
          return self.redirect("/");
        }
        var toid = self.get('to');
        var toUser = null;
        Service.getUserById({id:value.id}).then(function(content){
          Service.getUserListsById({userid : value.id}).then(function (mcontent) {
            var mmcon  =  [];
            for(var i = 0, len = mcontent.length; i < len ; i++){
              if(toid && mcontent[i].otherid == toid){
                toUser = mcontent[i]
              }else{
                mmcon.push(mcontent[i])
              }
            }

            if(toid){
              if(toUser){
                mmcon.unshift(toUser);
              }else{
                return Service.getUserById({id : toid}).then(function(ucontent){
                  if(!ucontent || ucontent.length == 0){
                    return self.redirect("/");
                  }
                  mmcon.unshift({
                    otherid : ucontent[0].id,
                    avator : ucontent[0].avator,
                    nickname : ucontent[0].nickname
                  });
                  self.assign({
                    title : "查看消息",
                    section : 'user',
                    link:'see',
                    msgs : mmcon,
                    userInfo : content[0]
                  })
                  return self.display()
                })

              }
            }

            self.assign({
              title : "查看消息",
              section : 'user',
              link:'see',
              msgs : mmcon,
              userInfo : content[0]
            })
            return self.display()
          });

        }).catch(function(err){})
      }
    },

    getMsgWihtIdAction : function(){
      var self = this;
      if(self.isPost()){
        var value = self.userInfo;
        if(!value || !value.id){
          return self.redirect("/");
        }
        var data = self.post();
        if(!data || !data.otherid){
          return self.error("请选择正确的会话对象！")
        }
        Service.getUserSessionsById({
          userid : value.id,
          otherid : data.otherid
        }).then(function(content){
          return self.success(content);
        })
      }
    },

    sendMsgAction : function(){
      var self = this;
      if(self.isPost()){
        var value = self.userInfo;
        if(!value || !value.id){
          return self.redirect("/");
        }
        var data = self.post();
        if(!data || !data.toid){
          return self.error("请选择正确的会话对象！")
        }
        if(!data.title){
          data.title = data.content.slice(0,10);
        }
        if(data.toid == value.id){
          return self.error("自己不能给自己发送消息！")
        }
        Service.sendMsg({
          fromid : value.id,
          toid : data.toid,
          title : data.title,
          content : data.content
        }).then(function(content){
          if(content === 0){
            return self.success(content);
          }else{
            return self.error("请稍后再试，服务异常！")
          }
        })
      }
    },

    readMsgAction : function(){
      var self = this;
      if(self.isPost()){
        var value = self.userInfo;
        if(!value || !value.id){
          return self.redirect("/");
        }
        var data = self.post();
        if(!data || !data.messageid){
          return self.error("请选择正确的会话对象！")
        }
        Service.readMsg({
          userid : value.id,
          messageid : data.messageid
        }).then(function(content){
          if(content === 0){
            return self.success(content);
          }else{
            return self.error("请稍后再试，服务异常！")
          }
        })
      }
    },

    getNewAction : function(){
      var self = this;
      if(self.isPost()){
        var value = self.userInfo;
        if(!value || !value.id){
          return self.redirect("/");
        }
        var data = self.post();
        Service.getNewCountById({
          userid : value.id,
          timestamp : data.lasttime
        }).then(function(content){
          if(typeof content === 'number'){
            return self.success(content);
          }else{
            return self.error("请稍后再试，服务异常！")
          }
        })
      }
    },

    myorderAction : function(){
      var self = this;
      if(self.isGet()){
        var value = self.userInfo;
        if(!value || !value.id){
          return self.redirect("/")
        }
        Service.getOrderList({userid : value.id}).then(function(content){
          self.assign({
            title : "我的订单",
            section : 'user',
            link:'myorder',
            userInfo : value,
            orders : content
          })
          self.display()
          //return self.success(content)
        }).catch(function(err){
          return self.error("请稍后再试，服务异常！" || err.msg);
        })
      }
    },

    noticeAction : function(){
      var self = this;
      var data = {
          time : Math.floor(new Date().getTime()/1000),
          title :"提醒",
          content : '星云用户之间可以互相发消息，互相学习，<a href="/user/message">欢迎体验</a>'
        };
      if(self.isGet()){
        return self.success();
      }
    }


  };
})
