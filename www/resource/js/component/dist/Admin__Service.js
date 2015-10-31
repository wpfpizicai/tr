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

	module.exports = __webpack_require__(3);


/***/ },
/* 1 */,
/* 2 */,
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