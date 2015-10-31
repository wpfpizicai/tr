/**
 * controller
 * @return
 */
module.exports = Controller("Admin/BaseController", function() {
  "use strict";


  var Service = require("../../Service/Service");
  var oss = require("../../Service/Oss");


  return {
    indexAction: function(){
      var self = this;
      if(self.userInfo && self.userInfo.isAdmin == 1){
        if(self.isGet()){
          var courses = Service.getAllCourses();
          self.assign({
            header_index:4,
            title : "管理后台-教师管理",
            courses : courses
          })
          self.display()
        }else if(self.isPost()){
          var data = self.post();
          var img = self.file('img');
          oss.put(img , {bucket:'n-teacher', key : 'cft/'}).then(function(res){
            if(res){
              Service.addTeacher(extend(data,{img : img.originalFilename })).then(function(content){
                self.success(content)
              })
            }
          }).catch(function(err){
            self.error(err)
          })
        }
      }
    }
  };
});
