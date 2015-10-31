/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Selector = __webpack_require__(2);
	var AS = __webpack_require__(3);
	var SendMessageController = React.createClass({ displayName: "SendMessageController",
	  getInitialState: function getInitialState() {
	    return {
	      title: this.props.title || null,
	      content: this.props.content || null,
	      days: this.props.days || null,
	      isUpdate: this.props.isUpdate == undefined ? false : this.props.isUpdate,
	      status: this.props.status == undefined ? false : this.props.status
	    };
	  },
	  render: function render() {
	    return React.createElement("button", { className: "modal-bg", style: { 'display': this.state.status ? 'none' : 'block' } }, React.createElement("div", { className: 'row message-box card', style: { 'width': '800px' } }, React.createElement("div", { className: 'row' }, React.createElement("h1", null, this.state.isUpdate ? '修改公告' : '新建公告')), React.createElement("div", { className: 'row' }, React.createElement("div", { className: 'col col-left' }, React.createElement("span", { className: "txt" }, "公告标题")), React.createElement("div", { className: 'col col-right' }, React.createElement("input", { className: 'input input-long', "data-role": "input", value: this.state.title, onChange: this.changeTitle, placeholder: "请输入消息标题" }))), React.createElement("div", { className: 'row' }, React.createElement("div", { className: 'col col-left' }, React.createElement("span", { className: "txt" }, "公告内容")), React.createElement("div", { className: 'col col-right' }, React.createElement("textarea", { className: 'input input-long',
	      style: { height: '200px', resize: 'vertical' },
	      "data-role": "input",
	      value: this.state.content,
	      onChange: this.changeContent,
	      placeholder: "请输入消息内容,输入链接请使用这种格式 <a href=\"链接地址\">链接名称</a> ,如: <a href=\"http://www.google.com.hk/\">谷歌</a>" }))), React.createElement("div", { className: 'row ' + (this.state.isPushNow ? 'hide' : '') }, React.createElement("div", { className: 'col col-left' }, React.createElement("span", { className: 'txt' }, "有效天数(发布算起)")), React.createElement("div", { className: 'col col-right' }, React.createElement("input", { type: "text", className: 'input input-tiny', "data-role": "input", value: this.state.days, onChange: this.changeDays, placeholder: "公告有效天数" }))), React.createElement("div", { className: 'row' }, React.createElement("div", { className: 'col col-left' }), React.createElement("div", { className: 'col col-right' }, React.createElement("span", { className: "radiusBtn square style_1 auto", onClick: this.pushMessage }, this.state.isUpdate ? '保存修改' : '发布公告'), React.createElement("span", { className: "radiusBtn square style_1 auto", onClick: this.pushMessage, onClick: this.cancelEdit }, "取消编辑")))));
	  },
	  changeTitle: function changeTitle(ev) {
	    this.state.title = ev.target.value;
	    this.setState(this.state);
	  },
	  changeContent: function changeContent(ev) {
	    this.state.content = ev.target.value;
	    this.setState(this.state);
	  },
	  changeDays: function changeDays(ev) {
	    this.state.days = ev.target.value;
	    this.setState(this.state);
	  },

	  pushMessage: function pushMessage(ev) {

	    console.log('消息json如下');
	    var message = {
	      title: this.state.title,
	      content: this.state.content
	    };
	    var flag = true;
	    if (!this.state.title) {
	      alert('标题不能为空');
	      flag = false;
	    }
	    if (!this.state.content) {
	      alert('内容不能为空');
	      flag = false;
	    }
	    if (this.state.days - 0 <= 0) {
	      alert('持续时间至少为一天!');
	      flag = false;
	    }

	    if (flag) {
	      this.publishMessage();
	    } else {
	      return false;
	    }
	  },
	  publishMessage: function publishMessage() {
	    var _this = this;

	    if (confirm('确认要发布消息吗')) {
	      console.log(this.state);
	      if (!this.state.isUpdate) {
	        AS.notice.add(this.state).done(function () {
	          _this.state.status = true;
	          alert('发布成功!');
	          _this.props.onSave && _this.props.onSave();
	          _this.setState(_this.state);
	        });
	      } else {
	        var data = {
	          notice_id: this.props.notice_id,
	          title: this.state.title,
	          content: this.state.content,
	          days: this.state.days
	        };
	        AS.notice.update(data).done(function () {
	          _this.state.status = true;
	          alert('修改成功!');
	          _this.props.onSave && _this.props.onSave();
	          _this.setState(_this.state);
	        });
	      }
	    }
	  },
	  cancelEdit: function cancelEdit() {
	    if (confirm('确认要放弃编辑吗?')) {
	      this.state.status = true;
	      this.setState(this.state);
	    }
	  }
	});

	var MessageListController = React.createClass({ displayName: "MessageListController",
	  getInitialState: function getInitialState() {
	    this.state = {
	      list: null,
	      days: this.props.days == undefined ? 30 : this.props.days
	    };
	    this.getList();
	    return this.state;
	  },
	  getList: function getList() {
	    var me = this;
	    AS.notice.list({ days: this.state.days }).done(function (list) {
	      if (list && list.length > 0) {
	        me.state.list = list.concat();
	        me.setState(me.state);
	      }
	    });
	  },
	  render: function render() {
	    return React.createElement("div", { className: "card" }, React.createElement("div", { className: "row" }, React.createElement("div", { className: "col" }, React.createElement("h1", { className: "txt" }, "查询公告")), React.createElement("div", { className: "col" }, React.createElement("span", { className: "radiusBtn style_1 square short-height auto", onClick: this.createNotice }, "创建公告"))), React.createElement("div", { className: "row" }, React.createElement("div", { className: "col col-left" }, React.createElement("span", { className: "txt" }, "请输入默认查询区间(距今的天数)")), React.createElement("div", { className: "col col-right" }, React.createElement("input", { className: "input input-tiny", value: this.state.days, onChange: this.setDays, placeholder: '请输入天数,默认' + this.props.days + '天' }), React.createElement("span", { className: "txt" }, "  天")), React.createElement("div", { className: "col col-right" }, React.createElement("span", { className: "radiusBtn style_2 short-height square auto", onClick: this.triggerRetrieve }, "查询"))), React.createElement("div", { className: "row" }, this.renderTable()));
	  },
	  renderTable: function renderTable() {

	    if (this.state.list) {
	      return React.createElement("table", null, React.createElement("thead", null, React.createElement("tr", null, React.createElement("th", { width: "20%" }, "标题"), React.createElement("th", { width: "20%" }, "内容"), React.createElement("th", { width: "20%" }, "创建时间"), React.createElement("th", { width: "20%" }, "过期时间"), React.createElement("th", { width: "20%" }, "操作"))), React.createElement("tbody", null, this.renderListItems()));
	    } else {
	      return React.createElement("span", { className: "txt" }, "暂时没有查询结果!");
	    }
	  },
	  renderListItems: function renderListItems() {
	    var _this2 = this;

	    return _.map(this.state.list, function (val, i) {
	      var expireDate = new Date(val.expire_date).toLocaleString();
	      var createDate = new Date(val.create_date).toLocaleString();
	      return React.createElement("tr", { key: val.notice_id }, React.createElement("td", null, React.createElement("h3", null, val.title)), React.createElement("td", null, React.createElement("section", null, val.content)), React.createElement("td", null, createDate), React.createElement("td", null, expireDate), React.createElement("td", null, React.createElement("span", { className: "radiusBtn style_2 auto square short-height", onClick: _this2.triggerUpdate, "data-notice-id": val.notice_id, "data-index": i }, "修改"), React.createElement("span", { className: "radiusBtn style_8 auto square short-height", onClick: _this2.triggerDelete, "data-notice-id": val.notice_id, "data-index": i }, "删除")));
	    });
	  },
	  setDays: function setDays(ev) {
	    this.state.days = ev.target.value;
	    this.setState(this.state);
	  },
	  triggerUpdate: function triggerUpdate(ev) {
	    var notice_id = parseInt(ev.target.getAttribute('data-notice-id')),
	        index = parseInt(ev.target.getAttribute('data-index'));
	    var key = 'qwer_' + Date.now();
	    var container = document.getElementById('m_c');

	    var id = notice_id == undefined ? null : notice_id;
	    var data = this.state.list[index];
	    var days = Math.ceil((new Date(data.expire_date) - new Date(data.create_date)) / 86400000);
	    React.render(React.createElement(SendMessageController, {
	      key: key,
	      status: false,
	      notice_id: notice_id,
	      title: data.title,
	      content: data.content,
	      days: days,
	      isUpdate: true,
	      onSave: this.triggerRetrieve }), container);
	  },
	  triggerDelete: function triggerDelete(ev) {
	    var _this3 = this;

	    var notice_id = parseInt(ev.target.getAttribute('data-notice-id')),
	        index = parseInt(ev.target.getAttribute('data-index'));
	    if (confirm('确认要删除此条公告吗?')) {
	      AS.notice['delete']({
	        notice_id: notice_id
	      }).done(function () {
	        alert('删除成功!');
	        _this3.state.list.splice(index, 1);
	        _this3.setState(_this3.state);
	      });
	    }
	  },
	  triggerRetrieve: function triggerRetrieve() {
	    this.getList();
	  },
	  createNotice: function createNotice(notice_id) {
	    var key = 'qwer_' + Date.now();
	    var container = document.getElementById('m_c');
	    React.render(React.createElement(SendMessageController, { key: key, status: false, onSave: this.triggerRetrieve }), container);
	  }
	});

	var container_1 = document.getElementsByClassName('container')[0];
	React.render(React.createElement(MessageListController, { days: 0 }), container_1);

/***/ },
/* 2 */
/***/ function(module, exports) {

	/**
	 * Created by wungcq on 15/9/23.
	 */

	//let React = require('React');

	"use strict";

	var SelectorListItem = React.createClass({ displayName: "SelectorListItem",
	  getInitialState: function getInitialState() {
	    return { selected: this.props.selected };
	  },
	  onSelect: function onSelect(val, index, label) {
	    this.props.onSelect(val, index, label);
	  },

	  select: function select() {
	    this.state.selected = !this.state.selected;
	    this.onSelect(this.props.value, this.props.index, this.props.label);
	  },

	  render: function render() {
	    return React.createElement("li", {
	      className: this.props.selected ? 's-cur' : '',
	      onClick: this.select }, React.createElement("div", { className: "text" }, this.props.label));
	  }
	});

	var Selector = React.createClass({ displayName: "Selector",

	  setValue: function setValue(value, index, label) {
	    var OldValue = this.state.value;
	    this.state.value = value;
	    var OldIndex = this.state.index;
	    this.state.index = index;
	    this.state.label = label;
	    //脏检查判断新旧值，发生改变则调用onChange
	    if (OldIndex != index) {
	      this.onChange(value, index, label, OldValue, OldIndex);
	    }
	    if (this.state.isOpen) {
	      this.setOpen(false);
	    }
	  },
	  onChange: function onChange(value, index, label, OldValue, OldIndex) {
	    if (typeof this.props.onChange == 'function') {
	      this.props.onChange.apply(null, arguments);
	    }
	    return;
	  },
	  onSelect: function onSelect(value, index, label) {
	    if (typeof this.props.onSelect == 'function') {
	      this.props.onSelect.apply(null, arguments);
	    }
	    return;
	  },
	  setOpen: function setOpen(isOpen) {
	    var newState = this.state;
	    newState.isOpen = isOpen;
	    this.setState(newState);
	  },
	  getInitialState: function getInitialState() {
	    return {
	      isOpen: false,
	      index: this.props.index,
	      value: this.props.value,
	      label: this.props.label
	    };
	  },

	  toggleDropMenu: function toggleDropMenu(e) {
	    var isOpen = !this.state.isOpen;
	    this.setOpen(isOpen);
	  },

	  getScrollHeight: function getScrollHeight() {
	    var liHeight = 34;
	    var scrollNum = this.props.scrollNum;
	    if (!scrollNum) {
	      return '280px'; //默认值
	    } else {
	        return scrollNum * liHeight + 8 + "px";
	      }
	  },

	  getHtml: function getHtml() {
	    var _this = this;

	    return this.props.options.map(function (option, index) {
	      return React.createElement(SelectorListItem, {
	        value: option.value,
	        label: option.label,
	        index: index,
	        selected: _this.state.index == index,
	        onSelect: _this.setValue });
	    });
	  },
	  getSelectorClass: function getSelectorClass() {
	    return "widget-selector  " + this.props.theme + " " + (this.props.direction || 'down') + " " + (this.state.isOpen ? 'show' : '') + " }";
	  },

	  getSelectorScrollViewStyle: function getSelectorScrollViewStyle() {
	    return {
	      width: "auto",
	      maxHeight: this.getScrollHeight(),
	      overflowY: "scroll"
	    };
	  },

	  render: function render() {
	    return React.createElement("span", { className: this.getSelectorClass(), style: { width: 'auto' }, onblur: this.toggleDropMenu }, React.createElement("em", { className: "w-show-sel", onClick: this.toggleDropMenu }, this.state.label || this.props.label || '请点击此处展开下拉列表选择'), React.createElement("span", { className: "w-arr" }), React.createElement("ul", { className: "w-lists" }, React.createElement("div", { className: "scroll-view", style: this.getSelectorScrollViewStyle() }, this.getHtml())));
	  }
	});

	module.exports = Selector;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	var Service = function Service() {
	  this.root = '/manage/';
	};

	Service.prototype = {
	  user_id: function user_id() {
	    return window.user_id;
	  },
	  notice: {
	    list: function list(data) {
	      var cb = null,
	          error_cb = null;

	      function c() {
	        $.ajax({
	          url: '/manage/notice/list',
	          type: "GET",
	          data: data,
	          dataType: 'json'
	        }).success(function (req) {
	          if (req.errno == 0) {
	            cb && cb.call(null, req.data);
	          } else {
	            error_cb && error_cb.call(null, req.errmsg);
	          }
	        });
	      }

	      return {
	        done: function done(fun) {
	          cb = fun;
	          c();
	        },
	        error: function error(fun) {
	          error_cb = fun;
	        }
	      };
	    },
	    add: function add(data) {
	      var cb = null,
	          error_cb = null;

	      function c() {
	        $.ajax({
	          url: '/manage/notice/add',
	          type: "POST",
	          data: data,
	          dataType: 'json'
	        }).success(function (req) {
	          if (req.errno == 0) {
	            cb && cb.call(null, req.data);
	          } else {
	            error_cb && error_cb.call(null, req.errmsg);
	          }
	        });
	      }

	      return {
	        done: function done(fun) {
	          cb = fun;
	          c();
	        },
	        error: function error(fun) {
	          error_cb = fun;
	        }
	      };
	    },
	    update: function update(data) {
	      var cb = null,
	          error_cb = null;

	      function c() {
	        $.ajax({
	          url: '/manage/notice/update',
	          type: "POST",
	          data: data,
	          dataType: 'json'
	        }).success(function (req) {
	          if (req.errno == 0) {
	            cb && cb.call(null, req.data);
	          } else {
	            error_cb && error_cb.call(null, req.errmsg);
	          }
	        });
	      }

	      return {
	        done: function done(fun) {
	          cb = fun;
	          c();
	        },
	        error: function error(fun) {
	          error_cb = fun;
	        }
	      };
	    },
	    'delete': function _delete(data) {
	      var cb = null,
	          error_cb = null;

	      function c() {
	        $.ajax({
	          url: '/manage/notice/delete',
	          type: "POST",
	          data: data,
	          dataType: 'json'
	        }).success(function (req) {
	          if (req.errno == 0) {
	            cb && cb.call(null, req.data);
	          } else {
	            error_cb && error_cb.call(null, req.errmsg);
	          }
	        });
	      }

	      return {
	        done: function done(fun) {
	          cb = fun;
	          c();
	        },
	        error: function error(fun) {
	          error_cb = fun;
	        }
	      };
	    }

	  }
	};

	var entity = new Service();
	var me = entity;
	module.exports = entity;

/***/ }
/******/ ]);