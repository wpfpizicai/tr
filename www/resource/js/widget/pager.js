define(function(require, exports, moudle) {
  require('css/widget/pager.css');
  var formatString = function(c, a) {
    c = String(c);
    var b = Array.prototype.slice.call(arguments, 1),
        d = Object.prototype.toString;
    if (b.length) {
        b = b.length == 1 ? (a !== null && (/\[object Array\]|\[object Object\]/.test(d.call(a))) ? a : b) : b;
        return c.replace(/#\{(.+?)\}/g, function (f, i) {
            var g = b[i];
            if ("[object Function]" == d.call(g)) {
                g = g(i)
            }
            return ("undefined" == typeof g ? "" : g)
        })
    }
    return c
  };

  var Page = function(config){
    var _ = {
      tpl : [
          '<div class="mobile-widget-page">',
            '<div class="page-head">',
              '<em>共</em><em class="e-sum">#{sum}</em><em>条记录</em>',
              '<span style="#{isdisplay}">',
                '<em>，每页显示</em>',
                '<span class="page-count-select">',
                  '<span class="e-count">#{count}</span>',
                  '<span class="e-arr"></span>',
                  '#{p_selects}',
                '</span>',
                '<em>条</em>',
              '</span>',
            '</div>',
            '<div class="page-body">',
              '<div class="page-control-back" id="page_control_back">',
                '<span class="control-item c-first">|&lt;</span>',
                '<span class="control-item c-back">&lt;</span>',
              '</div>',
              '<div class="lists-content" style="width:#{c_width}px;">',
                '<ul id="page_body_list" class="page-body-list" style="width:#{u_width}px;">#{lists}</ul>',
              '</div>',
              '<div class="page-control-front" id="page_control_front">',
                '<span class="control-item c-front">&gt;</span>',
                '<span class="control-item c-last">&gt;|</span>',
              '</div>',
            '</div>',
          '</div>'
        ].join(""),
      sum : 0 ,// 总项数
      step : 10 ,//项数的步长
      count : 10,//每页显示几项
      start : 0 ,// 开始显示的页数
      display : 7,//显示多少个页数
      onChange : null//当页数发生变化时的回调
    }

    this.get = function(key){
            return _[key];
        };
        this.set = function(key, value){
            _[key] = value;
        };

        this.configure(config);

  };

  Page.prototype = {

    configure : function(config){
      var me = this;
      me.set('container', config['container'] || document.body);
      me.set('sum', config['sum'] || 0);
      me.set('start', config['start'] || 0);
      me.set('count', config['count'] || 10);
      me.set('step', config['step'] || 10);
      me.set('stepCount', config['stepCount'] || 5);
      me.set('display', config['display'] || 7);
      me.set('showCount',config['showCount'] === void 0 ? true : config['showCount']);
      me.set('onChange', config['onChange']);
      me.set('pageWidth', config['pageWidth'] || 30);
    },

    getListsHtml : function(){
      var me = this,
        html = "" ,
        pageSum = me.get('pageSum');

      for(var i = 0; i < pageSum; i++){
        html += "<li class='control-item " + (me.get('start') == i ? "page-cur" : "") + "'>" + (i + 1) + "</li>";
      }
      return html;
    },

    getPageSelectsHtml : function(){
      var me = this,
        step = me.get('step'),
        stepCount = me.get('stepCount'),
        html = '<ul class="step-selects">';

      for(var i = stepCount; i >= 0; i--){
        html += '<li class="step-count-item">'+ (step * (i + 1)) + '</li>';
      }

      html += '</ul>';
      return html;
    },

    draw : function(){
      var me = this,
        pageSum = me.get('pageSum'),
        display = me.get('display'),
        c_width = me.get('pageWidth') * display,
        u_width = me.get('pageWidth') * pageSum;
      $(me.get('container')).html(formatString(me.get('tpl'),{
        sum : me.get('sum'),
        count : me.get('count'),
        isdisplay : me.get('showCount') ? "" : "display:none;" ,
        p_selects : me.getPageSelectsHtml(),
        lists : me.getListsHtml(),
        c_width : (pageSum > display ? c_width : u_width),
        u_width : u_width
      }))
      me.set('pageLists',$('#page_body_list',me.get('container')));
      me.addCurStyle();
    },

    addCurStyle : function(){
      var me = this,
        cur = me.get('start'),
        style = {},
        pageSum = me.get('pageSum');

      if(cur == 0 && pageSum == 1){
        style = {
          borderLeft : 'none' ,
          borderRight : 'none'
        }
      }else if(cur == 0){
        style = {
          borderLeft :' none'
        }
      }else if(cur == pageSum - 1){
        style = {
          borderRight :' none'
        }
      }else {
        style = {}
      }

      $('li.page-cur', me.get('pageLists')).removeClass('page-cur').attr('style',"");
      $(me.get('pageLists')).find('li').eq(cur).addClass('page-cur').css(style);

    },

    bind : function(){
      var me = this,
        _backCon = $('#page_control_back', me.get('container')),
        _frontCon = $('#page_control_front', me.get('container')),
        _firstBtn = $('.c-first',_backCon),
        _backBtn = $('.c-back',_backCon),
        _fontBtn = $('.c-front',_frontCon),
        _lastBtn = $('.c-last',_frontCon);

      $(_firstBtn).click(function(e){
        me.goPageByNum(0)
      })
      $(_lastBtn).click(function(e){
        me.goPageByNum(me.get('pageSum') - 1)
      })
      $(_backBtn).click(function(e){
        me.goPageByNum(me.get('start') - 1)
      })
      $(_fontBtn).click(function(e){
        me.goPageByNum(me.get('start') + 1)
      })
      $('#page_body_list',me.get('container')).click(function(e){
        var target = $(e.target);
        if(target && $(target).hasClass('control-item')){
          me.goPageByNum(($(target).html() | 0) - 1)
        }
      })

      me.bindPageSelects()
    },

    bindPageSelects : function(){
      var me = this,
        onChange = me.get('onChange'),
        _pageSelect = $('.page-count-select', me.get('container'));
      $(_pageSelect).click(function(e){
        var target = $(e.target),
          count = me.get('count');
        $('.step-selects', this).toggle();
        if(target && $(target).hasClass('step-count-item')){
          var newCount = $(target).html() | 0;
          if(newCount != count){
            me.set('start' , 0)
            me.set('count', newCount);
            onChange && onChange(0, newCount , 0);
            me.init();
          }
        }
      })
    },

    goPageByNum : function(num){
      var me = this;
      if(num < 0 || num > (me.get('pageSum') - 1)){
        return ;
      }
      me.move(num);
    },

    move : function(num){
      var me = this,
        cur = me.get('start'),
        display = me.get('display'),
        pageSum = me.get('pageSum'),
        pageWidth = me.get('pageWidth'),
        halfDisplay = Math.floor(display / 2),
        onChange = me.get('onChange'),
        mleft = "";
      if(num == cur){
        return
      }
      me.set('start', num);
      onChange && onChange(num, me.get('count') , num);
      if(pageSum > display){
        if(num - halfDisplay < 0){
          mleft = '0px';
        }else if(num + halfDisplay > pageSum - 1){
          mleft = (display - pageSum) * pageWidth + 'px'
        }else{
          mleft = (halfDisplay - num) * pageWidth + 'px'
        }
        $(me.get('pageLists')).animate({
          marginLeft : mleft
        })
      }
      me.addCurStyle();
    },

    init : function(){
      var me = this;
      // pageSum 是一个动态值 需要在每次初始化的时候进行一次计算
      me.set('pageSum' , Math.ceil(me.get('sum')/me.get('count')));
      me.draw();
      me.bind();
    }
  };

  moudle.exports = Page;
})