define(function (require, exports, moudle) {
    alifenxi.track("course_view_view");
    var login = require('../index.js');
    var focus_btn = $("#focus-btn");
    var needpay = $('#c_needpay').val();
    var haspay = $('#c_haspay').val();
    var course_id = $('#c_id').val();
    $(function () {
        var is_login = $('#signin_user').length == 0 ? false : true;
        if (is_login) {
            if(needpay == 1 && haspay == "0"){
                $('#start_learn').attr({
                    href: '/pay?id=' + course_id
                })
                $('#learn_mater').attr({
                    href: '/pay?id=' + course_id
                })
            }else{
                $('#start_learn').attr({
                    href: $('#start_learn').attr('data-href')
                })
                $('#learn_mater').attr({
                    href: $('#learn_mater').attr('data-href')
                })
            }
        } else {
            $('#start_learn').on('click', function (e) {
                login.signin();
            });
            $('#learn_mater').on('click', function (e) {
                login.signin();
            })
        }
    });

    var sendFocus = function (isFocus, id) {
        var reverse_flag = isFocus == 'true' ? 'false' : 'true';
        $.post('/course/setfocus/', {focus: reverse_flag, id: id}, 'json').done(function (res) {
            if (res.errno == 0) {
                focus_btn.attr("data-focused", reverse_flag);
            }
        }).error(function (res) {
            focus_btn.attr("data-focused", reverse_flag);
        });
    };
    focus_btn.on("click", function (e) {
        var is_login = $('#signin_user').length == 0 ? false : true;
        var course_id = focus_btn.attr("data-id");
        if (is_login) {
            sendFocus(focus_btn.attr("data-focused"), course_id);
        } else {
            login.signin();
        }
    });
});