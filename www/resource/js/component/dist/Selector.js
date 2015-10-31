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

	module.exports = __webpack_require__(2);


/***/ },
/* 1 */,
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

/***/ }
/******/ ]);