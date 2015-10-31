/**
 * Created by wungcq on 15/7/25.
 */
define(function (require, exports, moudle) {
    var userInfo = {
        "avator": $("#userInfo").attr("data-avator"),
        "id": $("#userInfo").attr("data-id")
    };
    var cur_avator = 1;

    var setAvator = function (avator) {
        $.post("/user/update", {"avator": avator,"id":userInfo.id}, 'json')
            .done(function (res) {
                if(res.errno == 0){
                    cur_avator = avator;
                    $("#heads-pool .selected").removeClass("selected");
                    $("#heads-pool .user-head-"+avator).addClass("selected");
                    $('#user_head_icon').attr('class', 'user-head-icon user-head-' + avator)
                    $("#current-head").attr("class","current-head user-head-icon user-head-"+avator);
                }
            });
    };

    $("#heads-pool").on("click", function (e) {
        if (e.target.classList.contains("heads")) {
            setAvator(e.target.getAttribute("data-avator"));
        }
    });

    $('#change_avator').on('click',function(e){
        var tmp = Math.floor((Math.random()*1000)%20)
        if(tmp==0 || cur_avator == tmp){
            tmp ++;
        }
        setAvator(tmp)
    })

});