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
          var partners = Service.getAllPartners();
          self.assign({
            header_index:1,
            title : "管理后台-课程管理",
            partners : partners
          })
          self.display()
        }else if(self.isPost()){
          var data = self.post();
          var img = self.file('img');
          var material = self.file('material');
          if(material && material.originalFilename){
            Promise.all([oss.put(material ,{bucket:'finace-english', key : ''}), oss.put(img , {bucket:'n-course', key : 'pic/'})]).then(function(datas){
              Service.addCourse(extend(data,{img : img.originalFilename,material : 1 , url : datas[0].url})).then(function(content){
                self.success(content)
              })
            }).catch(function(err){
              self.error(err);
            })
          }else{
            oss.put(img , {bucket:'n-course', key : 'pic/'}).then(function(res){
              if(res){
                Service.addCourse(extend(data,{img : img.originalFilename,material:false })).then(function(content){
                  self.success(content)
                })
              }
            }).catch(function(err){
              self.error(err)
            })
          }
        }
      }
    }
  };
});
