define(function(require, exports, moudle) {
  // body...
    //alert global function
    (function (scope) {
        scope.ALERT = function (title, content,callback,isCallBackAuto) {
            var d = new Date().getTime();
            var select = '#g-alert-' + d;
            var str = [ '<div class="g-alert init" id="g-alert-', d, '">',
                '<div class="alert-title">', title, '</div>',
                '<div class="alert-content">', content, '</div>',
                '</div>' ].join("");

            var hide = function () {
                $(select).addClass("finish");
                var t = setTimeout(function () {
                    $(select).unbind("click");
                    $(select).remove();
                    clearTimeout(t);
                    if(isCallBackAuto){
                        callback&&callback();
                    }
                }, 800);
            };

            $("body").append(str);
            var ss = setTimeout(function(){
                $(select).removeClass("init");
                clearTimeout(ss);
            },300);

            var s = setTimeout(function () {
                hide();

                clearTimeout(s);
            }, 2000);
            $(select).on("click", function () {
                if(!isCallBackAuto){
                    callback&&callback();
                }
                hide();
            });
        }
    })(window);

    var getNew = function(){
        $.post('/user/getNew',{
            lasttime : 1
        },'json').done(function(res){
            if(res.errno == 0){
                if(res.data > 0){
                    $('#header_message').addClass('unread').attr('data-msg',res.data);
                      ALERT('消息提示','您有'+res.data+'条消息,点击查看',function(){
                          window.location.href="/user/message";
                      },false);
                }else{
                    $('#header_message').removeClass('unread');
                }

            }
        });
    };

    (function(){
        getNew();
        var s = setInterval(getNew,90*1000);
    })();
})