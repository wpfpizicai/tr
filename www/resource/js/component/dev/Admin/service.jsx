
let Service = function(){
  this.root = '/manage/';

};



Service.prototype = {
  user_id(){
    return window.user_id;
  },
  notice:{
    list(data){
      var cb = null,error_cb = null;

      function c(){
        $.ajax({
                  url: '/manage/notice/list',
                  type: "GET",
                  data: data,
                  dataType: 'json'
              }).success(function (req) {
                  if(req.errno == 0){
                    cb && cb.call(null,req.data);
                  }else{
                    error_cb && error_cb.call(null,req.errmsg);
                  }
              });
          }

      return {
        done:function(fun){
          cb = fun;
          c();
        },
        error: function(fun){
          error_cb = fun;
        }
      };

    },
    add(data){
      var cb = null,error_cb = null;

      function c(){
        $.ajax({
                  url: '/manage/notice/add',
                  type: "POST",
                  data: data,
                  dataType: 'json'
                }).success(function (req) {
                  if(req.errno == 0){
                    cb && cb.call(null,req.data);
                  }else{
                    error_cb && error_cb.call(null,req.errmsg);
                  }
              });
          }

      return {
        done:function(fun){
          cb = fun;
          c();
        },
        error: function(fun){
          error_cb = fun;
        }
      }

    },
    update(data){
      var cb = null,error_cb = null;

      function c(){
        $.ajax({
                  url: '/manage/notice/update',
                  type: "POST",
                  data: data,
                  dataType: 'json'
              }).success(function (req) {
                  if(req.errno == 0){
                    cb && cb.call(null,req.data);
                  }else{
                    error_cb && error_cb.call(null,req.errmsg);
                  }
              });
          }

      return {
        done:function(fun){
          cb = fun;
          c();
        },
        error: function(fun){
          error_cb = fun;
        }
      }

    },
    delete(data){
      var cb = null,error_cb = null;

      function c(){
        $.ajax({
                  url: '/manage/notice/delete',
                  type: "POST",
                  data: data,
                  dataType: 'json'
              }).success(function (req) {
                  if(req.errno == 0){
                    cb && cb.call(null,req.data);
                  }else{
                    error_cb && error_cb.call(null,req.errmsg);
                  }
              });
          }

      return {
        done:function(fun){
          cb = fun;
          c();
        },
        error: function(fun){
          error_cb = fun;
        }
      }

    }

  }
}

var entity = new Service();
var me = entity;
module.exports = entity;
