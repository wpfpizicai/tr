define(function (require, exports, module) {
    function checkOrder(id){
        $.post('/pay/check', {order_id : id}, 'json').done(function (res) {
            if (res.errno == 0) {
                $('#pay_modal').modal('hide')
                ALERT(res.data.haspay == 1 ? "支付成功！" : "支付失败！");
                setTimeout(function(){
                    location.href = res.data.showurl;
                },2000)
            }
        }).error(function (res) {
            $('#pay_modal').modal('hide')
            ALERT("验证失败，请重新验证");
            setTimeout(function(){
                location.reload()
            },2000)
        });
    };
    function delOrder(id){
        $.post('/pay/del', {order_id : id}, 'json').done(function (res) {
            if (res.errno == 0) {
                if(res.data.errno == 0){
                    $('#order_'+ id).remove();
                    ALERT(res.data.msg || "操作成功！");
                }else{
                    ALERT(res.data.msg || "操作成功！");
                }
            }
        }).error(function (res) {
            ALERT("验证失败，请重新验证");
            setTimeout(function(){
                location.reload()
            },2000)
        });
    }
    $(function(){
        $(document.body).on('click',function(e){
            var _target = $(e.target);
            if($(_target).hasClass('repay')){
                $('#pay_modal').attr('data-id',$(_target).data('id')).modal('show')
            }
            if($(_target).hasClass('delpay')){
                delOrder($(_target).data('id'))
            }
            if($(_target).hasClass('pay-success')){
                checkOrder($('#pay_modal').data('id'))
            }else if($(_target).hasClass('pay-error')){
                checkOrder($('#pay_modal').data('id'))
            }
        })
    })
})