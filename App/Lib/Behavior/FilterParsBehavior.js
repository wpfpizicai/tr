var filter = thinkRequire("Filter").filter;
/**
 * 数据过滤行为，对通用的字段数据进行过滤，保证数据安全
 * @return {[type]} [description]
 */
var behavior = module.exports = Behavior(function(){
  return {
    fields: ["id", "ids", "page", "order"],
    run: function(){
      var self = this;
      this.fields.forEach(function(field){
        ["get", "post"].forEach(function(method){
          if (field in self.http[method]) {
            self.http[method][field] = filter(self.http[method][field], field);
          };
        })
      })
    }
  }
})