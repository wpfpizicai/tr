/**
 * controller
 * @return
 */
module.exports = Controller("Admin/BaseController", function () {
  "use strict";


  var Service = require("../../Service/Service");
  var oss = require("../../Service/Oss");


  return {
    indexAction: function () {
      var self = this;
      if (self.userInfo && self.userInfo.id && self.userInfo.isAdmin == 1) {
        if (self.isGet()) {
          self.assign({
            header_index: 5,
            title: "管理后台-通知管理",
            user_id: self.userInfo.id,
          });
          self.display();
        }
      }
    },
    addAction: function () {
      var self = this;

      if (self.isPost()) {
        var data = self.post();

        Service.addNotice({
            user_id: self.userInfo.id,
            title: self.post('title'),
            content: self.post('content'),
            days: parseInt(self.post('days'))
          })
          .then(function (content) {
            self.success(content)
          })
          .catch(function (err) {
            self.error(err)
          })
      }
    },
    listAction: function () {
      var self = this;

      if (self.isGet()) {
        Service.getNoticeList(self.get())
          .then(function (content) {
            self.success(content)
          })
          .catch(function (err) {
            self.error(err)
          })
      }
    },
    updateAction: function () {
      var self = this;

      if (self.isPost()) {
        var data = self.post();
        data.user_id = self.userInfo.id;
        Service.updateNotice(data)
          .then(function (content) {
            self.success(content)
          })
          .catch(function (err) {
            self.error(err)
          })
      }
    },
    deleteAction: function () {
      var self = this;

      if (self.isPost()) {
        var data = self.post();
        data.user_id = self.userInfo.id;
        Service.deleteNotice(data)
          .then(function (content) {
            self.success(content)
          })
          .catch(function (err) {
            self.error(err)
          })
      }
    }
  }

});
