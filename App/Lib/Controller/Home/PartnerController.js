/**
 * controller
 * @return
 */
module.exports = Controller("Home/BaseController", function(){
  "use strict";
  //var courses = [{name:"创造力提升",id:"creativedad",detail:"",source:"UNAM",time:"永久开放",img:"1.jpg"},{name:"跨领域医疗信息学",id:"creativedad",detail:"",source:"Minnesota",time:"永久开放",img:"2.png"},{name:"微观经济学",id:"creativedad",detail:"",source:"Illinois",time:"Dec 22nd",img:"3.jpg"},{name:"遗传学与进化概论",id:"creativedad",detail:"",source:"Duke",time:"Jan 1st",img:"4.jpg"},{name:"探索性数据分析",id:"creativedad",detail:"",source:"约翰霍普金斯大学",time:"3月 2日",img:"5.jpg"},{name:"统计推断",id:"creativedad",detail:"",source:"斯坦福大学",time:"永久开放",img:"6.jpg"}];
  var Service = require("../../Service/Service");
  return {
    indexAction: function(){
      var self = this;
      //var partners = [{name:"斯坦福大学",img:"stanford.jpg"},{name:"博科尼大学",img : "bocconi.jpg"},{name:"巴黎政治学院",img : "sciencespo.jpg"},{name : "威斯康辛大学" , img : "wisconsin.jpg"},{name : "澳大利亚新南威尔士大学",img:"unsw.jpg"},{name : "巴黎综合理工学院",img: "ep.jpg"},{name : '洛桑大学',img :"unil.jpg"},{name : "曼彻斯特大学",img:"manchester.jpg"},{name : "西北大学",img: "northwestern.jpg"},{name : "圣保罗大学",img:"usp.jpg"},{name : "普林斯顿大学", img:"princeton.jpg"},{name : "雷曼基金会",img:"lemann.jpg"}];
      Service.getAllPartners().then(function(data){
        self.assign({
          section : 'partner',
          title : "合作伙伴",
          partners : data,
          userInfo:self.userInfo,
          navLinks : navLinks
        })
        self.display();
      })

    },

    viewAction : function(){
      var self = this;
      if(self.isGet()){
        var partner_id = self.get('id');
        if(!partner_id){
          return self.redirect("/partner")
        }
        var courses = Service.getCourseOrderByWeight({partner : partner_id});
        var partner = Service.getPartnerById({id : partner_id});
        self.assign({
          section : 'partner',
          title : '合作伙伴',
          partner : partner,
          userInfo : self.userInfo,
          navLinks : navLinks,
          courses : courses
        })
        self.display();
      }
    }
  };
})
