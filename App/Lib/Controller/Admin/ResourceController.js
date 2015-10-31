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
            header_index:2,
            title : "管理后台-资源管理",
            courses : courses
          })
          self.display()
        }else if(self.isPost()){
          var data = self.post();
          var ogv = self.file('ogv');
          var webmv = self.file('webmv');
          var m4v = self.file('m4v');
          var poster = self.file('poster');
          var p_arr = [];
          if(ogv && ogv.originalFilename){
            p_arr.push(oss.put(ogv , {bucket:'finace-english', key : ''}));
          }
          if(webmv && webmv.originalFilename){
            p_arr.push(oss.put(webmv , {bucket:'finace-english', key : ''}))
          }
          if(m4v && m4v.originalFilename){
            p_arr.push(oss.put(m4v ,{bucket:'finace-english', key : ''}))
          }
          p_arr.push(oss.put(poster, {bucket:'finace-english', key : 'poster/'}));
          Promise.all(p_arr).then(function(datas){
            Service.addResource({
              title : data.title,
              artist : data.artist,
              m4v : datas[2].url,
              ogv : datas[0].url,
              webmv : datas[1].url,
              poster : datas[3].url,
              course : data.course - 0
            }).then(function(content){
              self.success(content)
            })
          }).catch(function(err){
            self.error(err)
          })
        }
      }
    }
  };
});
