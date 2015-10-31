/**
 * controller
 * @return
 */
module.exports = Controller("Home/BaseController", function(){
  "use strict";
  var Service = require("../../Service/Service");
  var c_data = {
    navLinks : navLinks,
    section : 'home'
  };
  return {
    indexAction: function(){
      var self = this;
      var courses = Service.getCourseOrderByWeight({_limit:6,_page:1 });
      self.assign(extend({
        courses:courses,
        title : "首页",
        userInfo : self.userInfo
      },c_data))
      self.display();
    }
  };
});
