define(function(require, exports, moudle) {
  $(function(){
    var  genericEmailLinks="sohu.com::http://mail.sohu.com \
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
    $("span.change-code").click(function(){
      var $p=$(this).prev("img");
      $p.attr("src",$p.attr("src").replace(/\?\d+|$/,"?"+(new Date()).getTime()));
    });
    $('#verify_email').on('click',function(e){
      var email = $('#user_email').html();
      $.post('user/verifyemail', {
        verifycode:$('#verify_code').val(),
        email :email
      },function(data){
        if(data.errno == "0"){
          $("div.my-wrap").hide();
          $(".js-forgot-result").show().find("em").text(email);
          if(link=genericEmailLinksMap[email.match(/[^@]*$/)[0]]){
            $(".js-forgot-result").show().find("p").append("<br /><a href='"+link+"' target='_blank'>查看邮件&gt;&gt;</a>");
          }
          ALERT('提示','发送成功，请查收邮件！');
        }else{
          ALERT('错误',data.errmsg);
        }
      })
    });
  })
})