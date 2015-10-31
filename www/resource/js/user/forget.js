define(function(require, exports, moudle) {
  require("../widget/validate.js");

  $("span.js-change-verify-code").click(function(){
    var $p=$(this).prev("img");
    $p.attr("src",$p.attr("src").replace(/\?\d+|$/,"?"+(new Date()).getTime()));
  });

  function setupMsg(selector){
    $error=$(selector);
    return function(msg){
        var msg=msg||""
            method=msg?"addClass":"removeClass";
        $error[method]("tips-error").html(msg);
    }
  }

  var forgotMsg=setupMsg("#js-g-forgot-error"),
    genericEmailLinks="sohu.com::http://mail.sohu.com \
                    |sina.com,sina.cn :: http://mail.sina.com \
                    |vip.sina.com :: http://vip.sina.com.cn \
                    |126.com :: http://www.126.com \
                    |163.com :: http://mail.163.com \
                    |vip.163.com :: http://vip.163.com \
                    |vip.126.com :: http://vip.126.com \
                    |qq.com,vip.qq.com :: http://mail.qq.com \
                    |msn.com,outlook.com,hotmail.com,live.cn,live.com :: http://outlook.com \
                    |gmail.com :: http://www.gmail.com \
                    |yahoo.com.cn,yahoo.cn,aliyun.com :: http://mail.aliyun.com \
                    |yahoo.com.tw :: http://mail.yahoo.com.tw \
                    |21cn.com :: http://mail.21cn.com \
                    |tom.com :: http://mail.tom.com/ ",
    genericEmailLinksMap={};

  $.each(genericEmailLinks.split("|"),function(index,v){
    var val=v.split("::"),
        v=$.trim(val[1]),
        i,len;
    val=val[0].split(",");
    for(i=0,len=val.length;i<len;i++){
        genericEmailLinksMap[$.trim(val[i])]=v;
    }
  });

  //$("#js-forgot-form input").placeholder();
  $("#js-forgot-form").validateSetup({
    fields:{
        verify:{
            rules:[{
                rule:function(el,v){
                    if(!/[0-9]{4}/.test(v)){
                        return "请输入正确的验证码！";
                    }
                }
            }]
        }
    },
    onerror:function(e){
        if(e._relateField&&e.tip){
            $(e._relateField).addClass("ipt-error").siblings(".tips").html(e.tip).addClass("tips-error");
        }
        forgotMsg();
    },
    onvalid:function(e){
        if(e._relateField){
            $(e._relateField).removeClass("ipt-error").siblings(".tips").removeClass("tips-error").empty();
        }
        forgotMsg();
    }
  });

  $("#js-forgot-submit").button({loadingText:"正在提交..."}).on("click",function(){
    var $this=$(this);
    if($this.hasClass("disabled")){ return;}
    $this.button("loading");
    $this.closest("form").validate({
      success:function(vals){
        $.ajax({
            url:"/user/forget",
            data:{
                email:vals.email,
                verifycode:vals.verify
            },
            type:"post",
            dataType:"json",
            success:function(data){
                var lc=window.location,link;
                if(data.errno===0){
                    $(".js-forgotpwd-form-wrap").hide();
                    $(".js-forgot-result").show().find("em").text(vals.email);
                    if(link=genericEmailLinksMap[vals.email.match(/[^@]*$/)[0]]){
                        $(".js-forgot-result").show().find("p").append("<br /><a href='"+link+"' target='_blank'>查看邮件&gt;&gt;</a>");
                    }
                }else{
                  forgotMsg(data.errmsg||"");
                }
                $("#js-forgot-submit").button("reset");

            },
            error:function(){
                forgotMsg("服务错误，稍后重试");
            }
          });
      },
      error:function(){
          setTimeout('$("#js-forgot-submit").button("reset")',1);
      }
    })
  })
})
