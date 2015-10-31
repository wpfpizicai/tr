/**
 * Created by wungcq on 15/7/25.
 */
define(function (require, exports, moudle) {
    var submitBtn = $("#js-set-submit");
    var user_id = submitBtn.attr("data-id");
    var inputs = [];
    inputs[0] = $("#origin_pwd");
    inputs[1] = $("#new_pwd");
    inputs[2] = $("#new_pwd_again");
    var pwd = [];

    var checkFormData = function () {
        pwd = [];
        var flag = true;
        pwd.push(inputs[0].val());
        pwd.push(inputs[1].val());
        pwd.push(inputs[2].val());
        for (var i in inputs) {
            inputs[i].next().html("");
        }
        pwd.forEach(function (val, index) {
            if (val.trim().length < 6) {
                inputs[index].next().html("密码不能少于6位");
                flag = false;
            }
        });
        if (pwd[1] != pwd[2]) {
            inputs[2].next().html("请保证修改的密码一致");
            flag = false;
        }

        return flag;
    };

    var setPwd = function () {
        var data =
        {
            "id": user_id,
            "opwd": pwd[0],
            "npwd": pwd[1]
        };
        $.post("/user/setpwd", data, 'json')
            .done(function (res) {
                if (res.errno == 0) {
                    ALERT('修改成功!');
                }
            })
    };
    submitBtn.click(function (e) {
        if (checkFormData()) {
            setPwd(pwd);
        }
    });
});