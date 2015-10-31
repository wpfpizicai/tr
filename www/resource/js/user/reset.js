define(function(require, exports, moudle) {
  function setupMsg(selector){
    $error=$(selector);
    return function(msg){
        var msg=msg||""
            method=msg?"addClass":"removeClass";
        $error[method]("tips-error").html(msg);
    }
  }

  var forgotMsg=setupMsg("#js-g-forgot-error");
  $('#js-reset-submit').on('click',function(e){
    var new_pwd = $.trim($('#js-reset-form .ipt-pwd').val());
    var new_cfpwd = $.trim($('#js-reset-form .ipt-cfpwd').val())
    if(!new_pwd){
      forgotMsg('请输入用户名！');
      return;
    }
    if(new_pwd != new_cfpwd){
      forgotMsg('两次密码不一致！');
      return;
    }
    $.ajax({
      url:"/user/reset",
      data:{
          username : $.trim($('#js-reset-form .ipt-email').val()),
          password: new_pwd
      },
      type:"post",
      dataType:"json",
      success:function(data){
          if(data.errno===0){
            if(data.data > 0){
               $('.mmsg-box').show();
              setTimeout(function(){
                $('.mmsg-box').animate({opacity:0}).hide().css({opacity:1})
              },2000)
            }
          }else{
            forgotMsg(data.errmsg||"");
          }
      },
      error:function(){
          forgotMsg("服务错误，稍后重试");
      }
    });
  })
})