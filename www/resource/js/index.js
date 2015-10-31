define(function(require, exports, moudle) {
  require("./widget/placeholder.js");
  require("./widget/modal_btn.js");
  require("./widget/validate.js");
  require('css/login.css');

  function signupTpl(){
    /*
    <div id="signup" class="rl-modal ">
      <div class="rl-modal-header">
        <button type="button" class="rl-close" data-dismiss="modal" aria-hidden="true"></button>
        <h1>
        <span data-fromto="signup:signin">登录</span>
        <span class="active-title">注册</span>
        </h1>
      </div>
      <div class="rl-modal-body">
        <form id="signup-form">
        <div class="rlf-group">
          <input  type="text" name="email" data-validate="email" class="ipt ipt-email" autocomplete="off" placeholder="请输入登录邮箱"/>
          <p class="rlf-tip-wrap"><span style="display:none">邮箱将作为您主要的身份识别，请输入您有效的邮箱</span></p>
          <input style="display:none;">
        </div>
        <div class="rlf-group">
          <input  type="password" name="password" data-validate="password" class="ipt ipt-pwd" autocomplete="off" placeholder="请输入密码"/>
          <p class="rlf-tip-wrap"><span style="display:none">请输入6-16位密码，区分大小写，不能使用空格</span></p>
        </div>
        <div class="rlf-group">
          <input  type="password" name="cfmpwd" class="ipt ipt-pwd" placeholder="请再次输入密码" autocomplete="off"/>
          <p class="rlf-tip-wrap"><span style="display:none">请再次输入密码</span></p>
        </div>
        <div class="rlf-group">
          <input  type="text" name="nick" data-validate="nick" class="ipt ipt-nick" placeholder="请输入用户昵称"/>
          <p class="rlf-tip-wrap"><span style="display:none">请输入昵称，2-18位中英文、数字或下划线！</span></p>
        </div>
        <div class="rlf-group clearfix">
          <p class="rlf-tip-wrap rlf-g-tip" id="signup-globle-error"></p>
          <input  type="button" id="signup-btn" value="注册" hidefocus="true" class="btn-red btn-full r"/>
        </div>
        </form>
      </div>
    </div>
    */
  };

  function signinTpl(){
    /*
    <div id="signin" class="rl-modal">
      <div class="rl-modal-header">
        <h1>
        <span class="active-title">登录</span>
        <span data-fromto="signin:signup">注册</span>
        </h1>
        <button type="button" class="rl-close" data-dismiss="modal" hidefocus="true" aria-hidden="true"></button>
      </div>
      <div class="rl-modal-body">
        <div class="clearfix">
        <div class="l-left-wrap l">
          <form id="signup-form" autocomplete="off">
            <div class="rlf-group">
              <input  type="text" name="email" data-validate="email" class="ipt ipt-email" placeholder="请输入登录邮箱"/>
              <p class="rlf-tip-wrap"></p>
              <input style="display:none;">
            </div>
            <div class="rlf-group">
              <input  type="password" name="password" class="ipt ipt-pwd" placeholder="请输入密码" autocomplete="off"/>
              <p class="rlf-tip-wrap"></p>
            </div>
            <div class="rlf-group rlf-appendix clearfix">
              <label for="auto-signin" class="l" hidefocus="true"><input type="checkbox" checked="checked" id="auto-signin">自动登录</label>
              <a href="/user/forget" class="rlf-forget r" target="_blank" hidefocus="true">忘记密码 </a>
            </div>
            <div class="rlf-group clearfix">
              <p class="rlf-tip-wrap " id="signin-globle-error"></p>
              <input  type="button" id="signin-btn" value="登录" hidefocus="true" class="btn-red btn-full"/>
            </div>
            </form>
        </div>
        </div>
      </div>
    </div>
    */
  };

  var tpl = {
    signup:signupTpl,
    signin:signinTpl
  };

  function getTpl(m){
    var r=/\/\*([\S\s]*?)\*\//m,
      m=r.exec(tpl[m].toString());
    return m&&m[1]||m;
  };

  var m={
    signin:function(){
      var tpl=getTpl("signin");
      return function(){
        var m=$("#signin");
        if(m.length) m.remove();
        $("body").append(getTpl("signin"));
        m=$("#signin");
        m.on("shown",function(){
          $(this).find("form").validateSetup({
            fields:{
              password:{
                rules:[function(cb,v){
                  if(!v){
                    return "密码不能为空！";
                  }
                }],
                keyup:function(e){
                  if(e.keyCode=="13"){
                    $("#signin-btn").trigger("click");
                  }
                  else{
                    $(this).validate();
                  }

                }
              }
            },
            onerror:function(e){
              var $t,$d;
              if(e._relateField&&e.tip){
                $t=$(e._relateField);
                $t.addClass("ipt-error").next(".rlf-tip-wrap").html(e.tip).addClass("rlf-tip-error");
                ($d=$t.data("placeholder-textinput"))&&$d.addClass("ipt-error");
              }
              $("#signin-globle-error").removeClass("rlf-tip-error").empty();
            },
            onvalid:function(e){
              var $t,$d;
              if(e._relateField){
                $t=$(e._relateField);
                $t.removeClass("ipt-error").next(".rlf-tip-wrap").removeClass("rlf-tip-error").empty();
                ($d=$t.data("placeholder-textinput"))&&$d.removeClass("ipt-error");
              }
              $("#signin-globle-error").removeClass("rlf-tip-error").empty();
            }
          });

          $("#signin-btn").button({loadingText:"正在登录..."}).on("click",function(){
            var $this=$(this);
            if($this.hasClass("disabled")){ return;}
            $this.button("loading");
            $this.closest("form").validate({
              success:function(vals){
                var remember=$("#auto-signin")[0].checked?"1":"0";
                $.ajax({
                  url:"/user/login",
                  data:{
                    username:vals.email,
                    password:vals.password,
                    remember:remember
                  },
                  type :"post",
                  dataType:"json",
                  success:function(data){
                    if(data.errno===0){
                      window.location.reload();
                      return ;
                    }
                    else {
                       $("#signin-globle-error").addClass("rlf-tip-error").html(data.errmsg);
                      return ;
                    }
                    // $("#signin-globle-error").addClass("rlf-tip-error").html(data.msg);
                    // window.location.reload();
                  },
                  error:function(){
                    $("#signin-globle-error").addClass("rlf-tip-error").html("服务错误，稍后重试");
                  },
                  complete:function(){
                    $("#signin-btn").button("reset");
                  }

                });

              },
              error:function(){
                setTimeout('$("#signin-btn").button("reset");',1);
              }
            })
          });
          $(this).find("input").placeholder();
        }).on("hidden",function(){
          $(this).remove();
        });
        m.modal("show");
      }
    }(),
    signup:function(){
      var tpl=getTpl("signup");
      return function(){
        var m=$("#signup");
        if(m.length) m.remove();
        $("body").append(getTpl("signup"));
        m=$("#signup");
        m.on("shown",function(){
          $(this).find("form").validateSetup({
            fields:{
              email:{
                rules:[{
                  rule:function(cb,v){
                    return $.ajax({
                      url:"/user/checkemail",
                      type:"post",
                      data:{username:v},
                      dataType:"json",
                      success:function(data){
                        var data = data.data;
                        if(data.num==0){
                          cb();
                        }
                        else{
                          cb(data.msg)
                        }
                      }
                    })
                  }
                }],
                keyup:(function(){
                  var interval=300,timer;
                  return function(e){
                    var $this=$(this);
                    if(timer) clearTimeout(timer);
                    timer=setTimeout(function(){
                      $this.validate(e);
                    },interval);
                  }
                })(),
                blur:function(e){
                  $(this).next(".rlf-tip-wrap").find("span").hide();
                  $(this).validate(e);
                },
                focus:function(){
                  $(this).next(".rlf-tip-wrap").find("span").show();
                }
              },
              password:{
                blur:function(e){
                  $(this).next(".rlf-tip-wrap").find("span").hide();
                  $(this).validate(e);
                },
                focus:function(){
                  $(this).next(".rlf-tip-wrap").find("span").show();
                },
                onvalid: function(e) {
                  $('input[name="cfmpwd"]', this.form).validate(e);
                }
              },
              nick:{
                blur:function(e){
                  $(this).next(".rlf-tip-wrap").find("span").hide();
                  $(this).validate(e);
                },
                focus:function(){
                  $(this).next(".rlf-tip-wrap").find("span").show();
                }
              },
              cfmpwd:{
                rules:[function(cb,v) {
                  if(!v) {
                    return "验证密码不能为空！";
                  }
                  if($('input[name="password"]',this.form).val() !== v) {
                    return '两次密码不一致！';
                  }
                }],
                blur:function(e){
                  $(this).next(".rlf-tip-wrap").find("span").hide();
                  $(this).validate(e);
                },
                focus:function(){
                  $(this).next(".rlf-tip-wrap").find("span").show();
                }
              }
            },
            onerror:function(e){
              var $t,$d;
              if(e._relateField&&e.tip){
                $t=$(e._relateField);
                $t.addClass("ipt-error").next(".rlf-tip-wrap").html(e.tip).addClass("rlf-tip-error");
                ($d=$t.data("placeholder-textinput"))&&$d.addClass("ipt-error");
              }
            },
            onvalid:function(e){
              var $t,$d;
              if(e._relateField){
                $t=$(e._relateField);
                $t.removeClass("ipt-error").next(".rlf-tip-wrap").removeClass("rlf-tip-error").empty();
                ($d=$t.data("placeholder-textinput"))&&$d.removeClass("ipt-error");
              }
              $("#signup-globle-error").removeClass("rlf-tip-error").empty();
            }
          });

          $(this).find("input").placeholder();

          $("#signup-btn").button({loadingText:"正在注册..."})
          .on("click",function(){
            var $this=$(this);
            if($this.hasClass("disabled")){ return;}
            $this.button("loading");
            $this.closest("form").validate({
              success:function(vals){
                $.ajax({
                  url:"/user/signin",
                  data:{
                    username:vals.email,
                    password:vals.password,
                    nickname:vals.nick
                  },
                  type:"post",
                  dataType:"json",
                  success:function(data){
                    if(data.errno===0){
                      window.location.reload();
                      return ;
                    }
                    $("#signup-globle-error").addClass("rlf-tip-error").html(data.msg);

                  },
                  error:function(){
                    $("#signup-globle-error").addClass("rlf-tip-error").html("服务错误，稍后重试");
                  },
                  complete:function(){
                    $("#signup-btn").button("reset");
                  }
                });

              },
              error:function(){
                setTimeout('$("#signup-btn").button("reset")',1);
              }
            })
          });

        }).on("hidden",function(){
          $(this).remove();
        });
        m.modal("show");
      }
    }()
  };
  function canShowNotice(){
    var nkey = "noticetime";
    var ltime = localStorage[nkey];
    if(ltime){
      if(Math.floor(new Date().getTime()/1000) - ltime >= 5*24*60*60){
        localStorage[nkey] = "";
        return true;
      }else{
        return false;
      }
    }else{
      return true
    }
  }
  function getMsg(){
    var sign_user = $('#user_head_icon');
    if(sign_user[0] && canShowNotice()){
      $.get('/user/notice', {}, 'json').done(function(res){
        if(res.errno == 0  && res.data){
          if(res.data.title){
            sign_user.attr('title', res.data.title)
          }
          if(res.data.content){
            sign_user.attr('data-content', res.data.content);
            sign_user.attr('data-placement', 'bottom');
            sign_user.popover({html : true});
            sign_user.popover('show').on('hidden.bs.popover', function () {
              localStorage['noticetime'] = res.data.time || Math.floor(new Date().getTime()/1000);
            });
          }
        }
      })
    }
  }
  $(function(){
    $(document).on("click","[data-fromto]",function(e){
      e.preventDefault();
      var d=$(this).attr("data-fromto").split(":");
      $("#"+d[0]).modal("hide");
      d[1]&&m[d[1]]();
    });
    $('#signin_btn').on('click',function(e){
      alifenxi.track("login_show");
      m.signin();
    })
    $('#signup_btn').on('click',function(e){
      alifenxi.track("signin_show");
      m.signup();
    })
    getMsg();
  });

  moudle.exports = m;
})




