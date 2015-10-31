/**
 * Created by wungcq on 15/8/29.
 */
define(function (require, exports, moudle) {
  var helper = {};
  var template_right =
    '<%_.each(data,function(msg){%>' +
    '<section class="message msg-<%-msg.action%> isread-<%-msg.isread%>" data-msg-id="<%-msg.messageid%>">' +

    '<time class="time"><%-new Date(msg.update_time).toLocaleDateString()%>' +
    '<%-new Date(msg.update_time).toLocaleTimeString()%></time>' +
    '<div class="user-content" data-nickname="<%- msg.fromnickname %>">' +
    '<div class="user-head-icon' +
    ' user-head-<%- msg.fromavator %>"></div>' +
    '</div>' +

    '<div class="msg-content">' +
    '<div class="txt latest-message-abs">' +
    '<%="<h4>"+msg.title+"</h4>"%>' +
    '<article>' +
    '<%-msg.content %>' +
    '</article>' +
    '</div>' +
    '</div>' +
    '</section> ' + '<%})%>';

  var template_left = '<% _.each(msgs,function(m){ %>' +
    '<section class="user-abs read-<%= m.isread %>" data-from-id="<%- m.fromid %>">' +
    '<div class="left-content">' +
    '<div class="user-head-icon user-head-<%= m.fromavator %>"></div>' +
    '</div>' +

    '<div class="right-content">' +
    '<a class="txt user-name"><%= m.fromnickname %></a>' +
    '<div class="txt latest-message-abs"><%= m.title %></div>' +
    '</div>' +
    '</section>' +

    '<% }); %>';


  var messagePage = function () {
    var me = this;
    var settings = (function () {
      var s = {
        'userId': null,
        '': null,
        'recentViewDialog': null
      };
      var fn = {
        get: function (name) {
          return s[name];
        },
        set: function (name, val) {
          s[name] = val;
          return val;
        }
      };
      return fn;
    })();
    me.get = settings.get;
    me.set = settings.set;
    return this;
  };

  messagePage.prototype = {
    init: function () {
      var me = this;
      me.getElements().bind().getHashParam().openDialog();
    },
    getElements: function () {
      var me = this;
      me.sendBtn = $('#msg_submit');
      me.dialogLeft = $('#middle_users_view');
      me.dialogView = $('#msg_detail_view');
      me.msgEditor = $('#msg_editor');
      return me;
    },
    getHashParam: function () {
      var me = this;
      if (window.location.hash == '') {
        me.set('recentViewDialog', null);
      } else {
        var diaLogUserId = parseInt(window.location.hash.substring(1));
        me.set('recentViewDialog', diaLogUserId);
        }
      return me;
    },
    getDialogMessages: function () {
      var me = this;
      return function (cb) {
        $.post(
          '/user/getMsgWihtId/',
          {'otherid': me.get('recentViewDialog')},
          'json'
        ).done(function (res) {
            cb && cb(res);
          })
      }
    },
    openDialog: function () {
      var me = this;
      var dialogUserId = me.get('recentViewDialog');

      if (dialogUserId) {


        me.getDialogMessages()(function (res) {
          if (res.errno == 0) {
            $('.user-abs.active').removeClass('active');
            $('.user-abs[data-from-id="'+dialogUserId+'"]').eq(0).addClass('active');

            window.location.hash = dialogUserId;
            res.data = res.data.reverse();
            me.renderRightMessage(res);
            me.bindCheckReadMessage();
            $('.m-editor.hide').removeClass('hide');
            me.dialogView.get(0).scrollTop = 10000000;
          }
        })
      }

      //dialogUserId
    },
    fillDialog: function () {

    },
    bind: function () {
      var me = this;
      me.dialogLeft.on('click', function (e) {
        var target = $(e.target);
        if (target.hasClass('user-abs')) {
          if (me.get('recentViewDialog') != target.attr('data-from-id')) {
            me.set('recentViewDialog', target.attr('data-from-id'));
            //添加active


            //打开对话框
            me.openDialog();
          }
        } else if (target.hasClass('left-content') || target.hasClass('right-content')) {
          target.parent().trigger('click');
        } else if (target.hasClass('user-head') || target.hasClass('txt')) {
          target.parent().parent().trigger('click');
        }
      });
      me.dialogView.on('mouseover', function (e) {
        var target = $(e.target);
        if (target.hasClass('message') && target.hasClass("isread-0")) {
          me.setMsgRead(target.get(0));
        }
      });

      me.sendBtn.click(function () {
        me.sendMessage();
      });
      return me;
    },
    renderRightMessage: function (data) {
      var me = this;
      me.get('rightTemplate') || me.set('rightTemplate', template_right);
      var rightRender = me.get('rightRender') || me.set('rightRender', _.template(me.get('rightTemplate')));
      var html = rightRender(data);
      me.dialogView.html(html);
      return me;
    },
    sendMessage: function () {
      var me = this;
      var content = me.msgEditor.val();
      var user_id = me.sendBtn.attr('data-user-id');
      var avator = me.sendBtn.attr('data-avator');
      var nickname = me.sendBtn.attr('data-nickname');
      var update_time = new Date();

      var renderData = {
        data: [
          {
            'content': content,
            'fromavator': avator,
            'fromnickname': nickname,
            'update_time': update_time,
            'action': 'send',
            'title': '',
            'isread': true
          }
        ]
      };

      $.ajax({
        url: '/user/sendMsg',
        type: 'POST',
        data: {
          toid: me.get('recentViewDialog'),
          title: '',
          content: content
        },
        dataType: 'json'
      }).done(function (res) {
        if (res.errno == 0) {
          //me.renderRightMessage(renderData);
          me.msgEditor.val('');
          me.dialogView.append(me.get('rightRender')(renderData));
          ALERT('提示', '发送成功');

        } else {
          ALERT('发送失败', res.msg);
        }

      });

    },
    bindCheckReadMessage: function () {
      var me = this;
      var scrollHeight = me.dialogView.height();
      console.log(scrollHeight);
      me.dialogView.on('scroll', function (e) {
        var top = me.dialogView.scrollTop();
        me.checkUnread(top, scrollHeight);
      });
    },
    checkUnread: function (top, scrollHeight) {
      var me = this;
      $('.message.msg-receive.isread-0', me.dialogView).each(function () {
        if ((top <= this.offsetTop) && (this.offsetTop < top + scrollHeight - 100)) {
          me.setMsgRead(this);
        }
      });

    },
    setMsgRead: function (elem) {
      var me = this;
      console.log(elem.scrollTop);
      var data = {messageid: elem.getAttribute('data-msg-id')};
      $(elem).removeClass('isread-0');
      $.post('/user/readMsg', data, 'json').done(function (res) {
        if (res.errno == 0) {
          if ($('.message.msg-receive.isread-0', me.dialogView).length == 0) {
            var id = me.get('recentViewDialog');
            $('.user-abs.read-0[data-from-id="' + id + '"]').removeClass('read-0');

          }
        }
      });
    }

  };

  var entity = new messagePage();
  entity.init();
  moudle.exports = entity;

});
