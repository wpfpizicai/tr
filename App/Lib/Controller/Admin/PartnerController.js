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
          // for(var i =2 ; i <=7; i++){
          //   Service.deletePartnerById({id : i});
          // }

          self.assign({
            header_index:3,
            title : "管理后台-机构管理"
          })
          self.display()
        }else if(self.isPost()){
          var data = self.post();
          var banner = self.file('banner');
          var logo = self.file('img');
          var long_logo = self.file('long_img');

          Promise.all([oss.put(banner ,{bucket:'n-partner', key : 'banner/'}),oss.put(logo , {bucket:'n-partner', key : 'logo_120/'}), oss.put(long_logo , {bucket:'n-partner', key : 'logo_long/'})]).then(function(datas){
            Service.addPartner({
              'banner' : banner.originalFilename,
              'img' : logo.originalFilename,
              'long_img' : long_logo.originalFilename,
              'name' : data.name,
              'introduction' : data.introduction
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
