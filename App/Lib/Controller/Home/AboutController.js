/**
 * controller
 * @return
 */
module.exports = Controller("Home/BaseController", function(){
  "use strict";
  return {
    indexAction: function(){
      var self = this;
      this.assign({
        section : 'about',
        title : "关于我们",
        userInfo:self.userInfo,
        navLinks : navLinks
      })
      this.display();
    },

    joinusAction:function(){
      var self = this;
      this.assign({
        section : 'about',
        title : "加入我们",
        userInfo:self.userInfo,
        navLinks : navLinks
      })
      this.display();
    }
  };
})