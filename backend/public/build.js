/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';
	
	var _vue = __webpack_require__(1);
	
	var _vue2 = _interopRequireDefault(_vue);
	
	var _vueRouter = __webpack_require__(2);
	
	var _vueRouter2 = _interopRequireDefault(_vueRouter);
	
	var _bootstrapVue = __webpack_require__(3);
	
	var _bootstrapVue2 = _interopRequireDefault(_bootstrapVue);
	
	__webpack_require__(5);
	
	__webpack_require__(10);
	
	var _app = __webpack_require__(12);
	
	var _app2 = _interopRequireDefault(_app);
	
	var _EventContainer = __webpack_require__(33);
	
	var _EventContainer2 = _interopRequireDefault(_EventContainer);
	
	var _EventShow = __webpack_require__(39);
	
	var _EventShow2 = _interopRequireDefault(_EventShow);
	
	var _EventNew = __webpack_require__(42);
	
	var _EventNew2 = _interopRequireDefault(_EventNew);
	
	var _EventEdit = __webpack_require__(53);
	
	var _EventEdit2 = _interopRequireDefault(_EventEdit);
	
	var _mainMap = __webpack_require__(56);
	
	var _mainMap2 = _interopRequireDefault(_mainMap);
	
	var _panelPoint = __webpack_require__(63);
	
	var _panelPoint2 = _interopRequireDefault(_panelPoint);
	
	var _panelEditPoint = __webpack_require__(68);
	
	var _panelEditPoint2 = _interopRequireDefault(_panelEditPoint);
	
	var _panelMyPoint = __webpack_require__(73);
	
	var _panelMyPoint2 = _interopRequireDefault(_panelMyPoint);
	
	var _panelNewPoint = __webpack_require__(78);
	
	var _panelNewPoint2 = _interopRequireDefault(_panelNewPoint);
	
	var _store = __webpack_require__(89);
	
	var _store2 = _interopRequireDefault(_store);
	
	var _types = __webpack_require__(51);
	
	var mutationsTypes = _interopRequireWildcard(_types);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_vue2.default.use(_vueRouter2.default);
	_vue2.default.use(_bootstrapVue2.default);
	
	//mode: 'history,
	var router = new _vueRouter2.default({
	  history: false,
	  base: __dirname,
	  routes: [{ path: '/', component: _EventContainer2.default }, { path: '/events', component: _EventContainer2.default }, { path: '/events_new', component: _EventNew2.default }, { path: '/events/:id', component: _EventShow2.default }, { path: '/events/:id/edit', component: _EventEdit2.default }, { path: '/map', component: _mainMap2.default, children: [{ path: 'new', component: _panelNewPoint2.default }, { path: 'my', component: _panelMyPoint2.default }, { path: ':id', component: _panelPoint2.default }, { path: ':id/edit', component: _panelEditPoint2.default }] }]
	});
	
	router.beforeEach(function (to, from, next) {
	  if (from.path == "/events_new") {
	    _store2.default.commit('events/' + mutationsTypes.CLEAR_CURRENT_EVENT_ERRORS);
	  };
	  next();
	});
	
	// TODO как то засунуть это в store
	window.router = router;
	
	new _vue2.default({
	  el: '#app',
	  store: _store2.default,
	  router: router,
	  render: function render(h) {
	    return h(_app2.default);
	  }
	});
	/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {/*!
	 * Vue.js v2.3.3
	 * (c) 2014-2017 Evan You
	 * Released under the MIT License.
	 */
	(function (global, factory) {
		 true ? module.exports = factory() :
		typeof define === 'function' && define.amd ? define(factory) :
		(global.Vue = factory());
	}(this, (function () { 'use strict';
	
	/*  */
	
	// these helpers produces better vm code in JS engines due to their
	// explicitness and function inlining
	function isUndef (v) {
	  return v === undefined || v === null
	}
	
	function isDef (v) {
	  return v !== undefined && v !== null
	}
	
	function isTrue (v) {
	  return v === true
	}
	
	function isFalse (v) {
	  return v === false
	}
	/**
	 * Check if value is primitive
	 */
	function isPrimitive (value) {
	  return typeof value === 'string' || typeof value === 'number'
	}
	
	/**
	 * Quick object check - this is primarily used to tell
	 * Objects from primitive values when we know the value
	 * is a JSON-compliant type.
	 */
	function isObject (obj) {
	  return obj !== null && typeof obj === 'object'
	}
	
	var _toString = Object.prototype.toString;
	
	/**
	 * Strict object type check. Only returns true
	 * for plain JavaScript objects.
	 */
	function isPlainObject (obj) {
	  return _toString.call(obj) === '[object Object]'
	}
	
	function isRegExp (v) {
	  return _toString.call(v) === '[object RegExp]'
	}
	
	/**
	 * Convert a value to a string that is actually rendered.
	 */
	function toString (val) {
	  return val == null
	    ? ''
	    : typeof val === 'object'
	      ? JSON.stringify(val, null, 2)
	      : String(val)
	}
	
	/**
	 * Convert a input value to a number for persistence.
	 * If the conversion fails, return original string.
	 */
	function toNumber (val) {
	  var n = parseFloat(val);
	  return isNaN(n) ? val : n
	}
	
	/**
	 * Make a map and return a function for checking if a key
	 * is in that map.
	 */
	function makeMap (
	  str,
	  expectsLowerCase
	) {
	  var map = Object.create(null);
	  var list = str.split(',');
	  for (var i = 0; i < list.length; i++) {
	    map[list[i]] = true;
	  }
	  return expectsLowerCase
	    ? function (val) { return map[val.toLowerCase()]; }
	    : function (val) { return map[val]; }
	}
	
	/**
	 * Check if a tag is a built-in tag.
	 */
	var isBuiltInTag = makeMap('slot,component', true);
	
	/**
	 * Remove an item from an array
	 */
	function remove (arr, item) {
	  if (arr.length) {
	    var index = arr.indexOf(item);
	    if (index > -1) {
	      return arr.splice(index, 1)
	    }
	  }
	}
	
	/**
	 * Check whether the object has the property.
	 */
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	function hasOwn (obj, key) {
	  return hasOwnProperty.call(obj, key)
	}
	
	/**
	 * Create a cached version of a pure function.
	 */
	function cached (fn) {
	  var cache = Object.create(null);
	  return (function cachedFn (str) {
	    var hit = cache[str];
	    return hit || (cache[str] = fn(str))
	  })
	}
	
	/**
	 * Camelize a hyphen-delimited string.
	 */
	var camelizeRE = /-(\w)/g;
	var camelize = cached(function (str) {
	  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
	});
	
	/**
	 * Capitalize a string.
	 */
	var capitalize = cached(function (str) {
	  return str.charAt(0).toUpperCase() + str.slice(1)
	});
	
	/**
	 * Hyphenate a camelCase string.
	 */
	var hyphenateRE = /([^-])([A-Z])/g;
	var hyphenate = cached(function (str) {
	  return str
	    .replace(hyphenateRE, '$1-$2')
	    .replace(hyphenateRE, '$1-$2')
	    .toLowerCase()
	});
	
	/**
	 * Simple bind, faster than native
	 */
	function bind (fn, ctx) {
	  function boundFn (a) {
	    var l = arguments.length;
	    return l
	      ? l > 1
	        ? fn.apply(ctx, arguments)
	        : fn.call(ctx, a)
	      : fn.call(ctx)
	  }
	  // record original fn length
	  boundFn._length = fn.length;
	  return boundFn
	}
	
	/**
	 * Convert an Array-like object to a real Array.
	 */
	function toArray (list, start) {
	  start = start || 0;
	  var i = list.length - start;
	  var ret = new Array(i);
	  while (i--) {
	    ret[i] = list[i + start];
	  }
	  return ret
	}
	
	/**
	 * Mix properties into target object.
	 */
	function extend (to, _from) {
	  for (var key in _from) {
	    to[key] = _from[key];
	  }
	  return to
	}
	
	/**
	 * Merge an Array of Objects into a single Object.
	 */
	function toObject (arr) {
	  var res = {};
	  for (var i = 0; i < arr.length; i++) {
	    if (arr[i]) {
	      extend(res, arr[i]);
	    }
	  }
	  return res
	}
	
	/**
	 * Perform no operation.
	 */
	function noop () {}
	
	/**
	 * Always return false.
	 */
	var no = function () { return false; };
	
	/**
	 * Return same value
	 */
	var identity = function (_) { return _; };
	
	/**
	 * Generate a static keys string from compiler modules.
	 */
	function genStaticKeys (modules) {
	  return modules.reduce(function (keys, m) {
	    return keys.concat(m.staticKeys || [])
	  }, []).join(',')
	}
	
	/**
	 * Check if two values are loosely equal - that is,
	 * if they are plain objects, do they have the same shape?
	 */
	function looseEqual (a, b) {
	  var isObjectA = isObject(a);
	  var isObjectB = isObject(b);
	  if (isObjectA && isObjectB) {
	    try {
	      return JSON.stringify(a) === JSON.stringify(b)
	    } catch (e) {
	      // possible circular reference
	      return a === b
	    }
	  } else if (!isObjectA && !isObjectB) {
	    return String(a) === String(b)
	  } else {
	    return false
	  }
	}
	
	function looseIndexOf (arr, val) {
	  for (var i = 0; i < arr.length; i++) {
	    if (looseEqual(arr[i], val)) { return i }
	  }
	  return -1
	}
	
	/**
	 * Ensure a function is called only once.
	 */
	function once (fn) {
	  var called = false;
	  return function () {
	    if (!called) {
	      called = true;
	      fn.apply(this, arguments);
	    }
	  }
	}
	
	var SSR_ATTR = 'data-server-rendered';
	
	var ASSET_TYPES = [
	  'component',
	  'directive',
	  'filter'
	];
	
	var LIFECYCLE_HOOKS = [
	  'beforeCreate',
	  'created',
	  'beforeMount',
	  'mounted',
	  'beforeUpdate',
	  'updated',
	  'beforeDestroy',
	  'destroyed',
	  'activated',
	  'deactivated'
	];
	
	/*  */
	
	var config = ({
	  /**
	   * Option merge strategies (used in core/util/options)
	   */
	  optionMergeStrategies: Object.create(null),
	
	  /**
	   * Whether to suppress warnings.
	   */
	  silent: false,
	
	  /**
	   * Show production mode tip message on boot?
	   */
	  productionTip: "development" !== 'production',
	
	  /**
	   * Whether to enable devtools
	   */
	  devtools: "development" !== 'production',
	
	  /**
	   * Whether to record perf
	   */
	  performance: false,
	
	  /**
	   * Error handler for watcher errors
	   */
	  errorHandler: null,
	
	  /**
	   * Ignore certain custom elements
	   */
	  ignoredElements: [],
	
	  /**
	   * Custom user key aliases for v-on
	   */
	  keyCodes: Object.create(null),
	
	  /**
	   * Check if a tag is reserved so that it cannot be registered as a
	   * component. This is platform-dependent and may be overwritten.
	   */
	  isReservedTag: no,
	
	  /**
	   * Check if an attribute is reserved so that it cannot be used as a component
	   * prop. This is platform-dependent and may be overwritten.
	   */
	  isReservedAttr: no,
	
	  /**
	   * Check if a tag is an unknown element.
	   * Platform-dependent.
	   */
	  isUnknownElement: no,
	
	  /**
	   * Get the namespace of an element
	   */
	  getTagNamespace: noop,
	
	  /**
	   * Parse the real tag name for the specific platform.
	   */
	  parsePlatformTagName: identity,
	
	  /**
	   * Check if an attribute must be bound using property, e.g. value
	   * Platform-dependent.
	   */
	  mustUseProp: no,
	
	  /**
	   * Exposed for legacy reasons
	   */
	  _lifecycleHooks: LIFECYCLE_HOOKS
	});
	
	/*  */
	
	var emptyObject = Object.freeze({});
	
	/**
	 * Check if a string starts with $ or _
	 */
	function isReserved (str) {
	  var c = (str + '').charCodeAt(0);
	  return c === 0x24 || c === 0x5F
	}
	
	/**
	 * Define a property.
	 */
	function def (obj, key, val, enumerable) {
	  Object.defineProperty(obj, key, {
	    value: val,
	    enumerable: !!enumerable,
	    writable: true,
	    configurable: true
	  });
	}
	
	/**
	 * Parse simple path.
	 */
	var bailRE = /[^\w.$]/;
	function parsePath (path) {
	  if (bailRE.test(path)) {
	    return
	  }
	  var segments = path.split('.');
	  return function (obj) {
	    for (var i = 0; i < segments.length; i++) {
	      if (!obj) { return }
	      obj = obj[segments[i]];
	    }
	    return obj
	  }
	}
	
	/*  */
	
	var warn = noop;
	var tip = noop;
	var formatComponentName = (null); // work around flow check
	
	{
	  var hasConsole = typeof console !== 'undefined';
	  var classifyRE = /(?:^|[-_])(\w)/g;
	  var classify = function (str) { return str
	    .replace(classifyRE, function (c) { return c.toUpperCase(); })
	    .replace(/[-_]/g, ''); };
	
	  warn = function (msg, vm) {
	    if (hasConsole && (!config.silent)) {
	      console.error("[Vue warn]: " + msg + (
	        vm ? generateComponentTrace(vm) : ''
	      ));
	    }
	  };
	
	  tip = function (msg, vm) {
	    if (hasConsole && (!config.silent)) {
	      console.warn("[Vue tip]: " + msg + (
	        vm ? generateComponentTrace(vm) : ''
	      ));
	    }
	  };
	
	  formatComponentName = function (vm, includeFile) {
	    if (vm.$root === vm) {
	      return '<Root>'
	    }
	    var name = typeof vm === 'string'
	      ? vm
	      : typeof vm === 'function' && vm.options
	        ? vm.options.name
	        : vm._isVue
	          ? vm.$options.name || vm.$options._componentTag
	          : vm.name;
	
	    var file = vm._isVue && vm.$options.__file;
	    if (!name && file) {
	      var match = file.match(/([^/\\]+)\.vue$/);
	      name = match && match[1];
	    }
	
	    return (
	      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
	      (file && includeFile !== false ? (" at " + file) : '')
	    )
	  };
	
	  var repeat = function (str, n) {
	    var res = '';
	    while (n) {
	      if (n % 2 === 1) { res += str; }
	      if (n > 1) { str += str; }
	      n >>= 1;
	    }
	    return res
	  };
	
	  var generateComponentTrace = function (vm) {
	    if (vm._isVue && vm.$parent) {
	      var tree = [];
	      var currentRecursiveSequence = 0;
	      while (vm) {
	        if (tree.length > 0) {
	          var last = tree[tree.length - 1];
	          if (last.constructor === vm.constructor) {
	            currentRecursiveSequence++;
	            vm = vm.$parent;
	            continue
	          } else if (currentRecursiveSequence > 0) {
	            tree[tree.length - 1] = [last, currentRecursiveSequence];
	            currentRecursiveSequence = 0;
	          }
	        }
	        tree.push(vm);
	        vm = vm.$parent;
	      }
	      return '\n\nfound in\n\n' + tree
	        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
	            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
	            : formatComponentName(vm))); })
	        .join('\n')
	    } else {
	      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
	    }
	  };
	}
	
	/*  */
	
	function handleError (err, vm, info) {
	  if (config.errorHandler) {
	    config.errorHandler.call(null, err, vm, info);
	  } else {
	    {
	      warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
	    }
	    /* istanbul ignore else */
	    if (inBrowser && typeof console !== 'undefined') {
	      console.error(err);
	    } else {
	      throw err
	    }
	  }
	}
	
	/*  */
	/* globals MutationObserver */
	
	// can we use __proto__?
	var hasProto = '__proto__' in {};
	
	// Browser environment sniffing
	var inBrowser = typeof window !== 'undefined';
	var UA = inBrowser && window.navigator.userAgent.toLowerCase();
	var isIE = UA && /msie|trident/.test(UA);
	var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
	var isEdge = UA && UA.indexOf('edge/') > 0;
	var isAndroid = UA && UA.indexOf('android') > 0;
	var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);
	var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
	
	var supportsPassive = false;
	if (inBrowser) {
	  try {
	    var opts = {};
	    Object.defineProperty(opts, 'passive', ({
	      get: function get () {
	        /* istanbul ignore next */
	        supportsPassive = true;
	      }
	    } )); // https://github.com/facebook/flow/issues/285
	    window.addEventListener('test-passive', null, opts);
	  } catch (e) {}
	}
	
	// this needs to be lazy-evaled because vue may be required before
	// vue-server-renderer can set VUE_ENV
	var _isServer;
	var isServerRendering = function () {
	  if (_isServer === undefined) {
	    /* istanbul ignore if */
	    if (!inBrowser && typeof global !== 'undefined') {
	      // detect presence of vue-server-renderer and avoid
	      // Webpack shimming the process
	      _isServer = global['process'].env.VUE_ENV === 'server';
	    } else {
	      _isServer = false;
	    }
	  }
	  return _isServer
	};
	
	// detect devtools
	var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
	
	/* istanbul ignore next */
	function isNative (Ctor) {
	  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
	}
	
	var hasSymbol =
	  typeof Symbol !== 'undefined' && isNative(Symbol) &&
	  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);
	
	/**
	 * Defer a task to execute it asynchronously.
	 */
	var nextTick = (function () {
	  var callbacks = [];
	  var pending = false;
	  var timerFunc;
	
	  function nextTickHandler () {
	    pending = false;
	    var copies = callbacks.slice(0);
	    callbacks.length = 0;
	    for (var i = 0; i < copies.length; i++) {
	      copies[i]();
	    }
	  }
	
	  // the nextTick behavior leverages the microtask queue, which can be accessed
	  // via either native Promise.then or MutationObserver.
	  // MutationObserver has wider support, however it is seriously bugged in
	  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
	  // completely stops working after triggering a few times... so, if native
	  // Promise is available, we will use it:
	  /* istanbul ignore if */
	  if (typeof Promise !== 'undefined' && isNative(Promise)) {
	    var p = Promise.resolve();
	    var logError = function (err) { console.error(err); };
	    timerFunc = function () {
	      p.then(nextTickHandler).catch(logError);
	      // in problematic UIWebViews, Promise.then doesn't completely break, but
	      // it can get stuck in a weird state where callbacks are pushed into the
	      // microtask queue but the queue isn't being flushed, until the browser
	      // needs to do some other work, e.g. handle a timer. Therefore we can
	      // "force" the microtask queue to be flushed by adding an empty timer.
	      if (isIOS) { setTimeout(noop); }
	    };
	  } else if (typeof MutationObserver !== 'undefined' && (
	    isNative(MutationObserver) ||
	    // PhantomJS and iOS 7.x
	    MutationObserver.toString() === '[object MutationObserverConstructor]'
	  )) {
	    // use MutationObserver where native Promise is not available,
	    // e.g. PhantomJS IE11, iOS7, Android 4.4
	    var counter = 1;
	    var observer = new MutationObserver(nextTickHandler);
	    var textNode = document.createTextNode(String(counter));
	    observer.observe(textNode, {
	      characterData: true
	    });
	    timerFunc = function () {
	      counter = (counter + 1) % 2;
	      textNode.data = String(counter);
	    };
	  } else {
	    // fallback to setTimeout
	    /* istanbul ignore next */
	    timerFunc = function () {
	      setTimeout(nextTickHandler, 0);
	    };
	  }
	
	  return function queueNextTick (cb, ctx) {
	    var _resolve;
	    callbacks.push(function () {
	      if (cb) {
	        try {
	          cb.call(ctx);
	        } catch (e) {
	          handleError(e, ctx, 'nextTick');
	        }
	      } else if (_resolve) {
	        _resolve(ctx);
	      }
	    });
	    if (!pending) {
	      pending = true;
	      timerFunc();
	    }
	    if (!cb && typeof Promise !== 'undefined') {
	      return new Promise(function (resolve, reject) {
	        _resolve = resolve;
	      })
	    }
	  }
	})();
	
	var _Set;
	/* istanbul ignore if */
	if (typeof Set !== 'undefined' && isNative(Set)) {
	  // use native Set when available.
	  _Set = Set;
	} else {
	  // a non-standard Set polyfill that only works with primitive keys.
	  _Set = (function () {
	    function Set () {
	      this.set = Object.create(null);
	    }
	    Set.prototype.has = function has (key) {
	      return this.set[key] === true
	    };
	    Set.prototype.add = function add (key) {
	      this.set[key] = true;
	    };
	    Set.prototype.clear = function clear () {
	      this.set = Object.create(null);
	    };
	
	    return Set;
	  }());
	}
	
	/*  */
	
	
	var uid = 0;
	
	/**
	 * A dep is an observable that can have multiple
	 * directives subscribing to it.
	 */
	var Dep = function Dep () {
	  this.id = uid++;
	  this.subs = [];
	};
	
	Dep.prototype.addSub = function addSub (sub) {
	  this.subs.push(sub);
	};
	
	Dep.prototype.removeSub = function removeSub (sub) {
	  remove(this.subs, sub);
	};
	
	Dep.prototype.depend = function depend () {
	  if (Dep.target) {
	    Dep.target.addDep(this);
	  }
	};
	
	Dep.prototype.notify = function notify () {
	  // stabilize the subscriber list first
	  var subs = this.subs.slice();
	  for (var i = 0, l = subs.length; i < l; i++) {
	    subs[i].update();
	  }
	};
	
	// the current target watcher being evaluated.
	// this is globally unique because there could be only one
	// watcher being evaluated at any time.
	Dep.target = null;
	var targetStack = [];
	
	function pushTarget (_target) {
	  if (Dep.target) { targetStack.push(Dep.target); }
	  Dep.target = _target;
	}
	
	function popTarget () {
	  Dep.target = targetStack.pop();
	}
	
	/*
	 * not type checking this file because flow doesn't play well with
	 * dynamically accessing methods on Array prototype
	 */
	
	var arrayProto = Array.prototype;
	var arrayMethods = Object.create(arrayProto);[
	  'push',
	  'pop',
	  'shift',
	  'unshift',
	  'splice',
	  'sort',
	  'reverse'
	]
	.forEach(function (method) {
	  // cache original method
	  var original = arrayProto[method];
	  def(arrayMethods, method, function mutator () {
	    var arguments$1 = arguments;
	
	    // avoid leaking arguments:
	    // http://jsperf.com/closure-with-arguments
	    var i = arguments.length;
	    var args = new Array(i);
	    while (i--) {
	      args[i] = arguments$1[i];
	    }
	    var result = original.apply(this, args);
	    var ob = this.__ob__;
	    var inserted;
	    switch (method) {
	      case 'push':
	        inserted = args;
	        break
	      case 'unshift':
	        inserted = args;
	        break
	      case 'splice':
	        inserted = args.slice(2);
	        break
	    }
	    if (inserted) { ob.observeArray(inserted); }
	    // notify change
	    ob.dep.notify();
	    return result
	  });
	});
	
	/*  */
	
	var arrayKeys = Object.getOwnPropertyNames(arrayMethods);
	
	/**
	 * By default, when a reactive property is set, the new value is
	 * also converted to become reactive. However when passing down props,
	 * we don't want to force conversion because the value may be a nested value
	 * under a frozen data structure. Converting it would defeat the optimization.
	 */
	var observerState = {
	  shouldConvert: true,
	  isSettingProps: false
	};
	
	/**
	 * Observer class that are attached to each observed
	 * object. Once attached, the observer converts target
	 * object's property keys into getter/setters that
	 * collect dependencies and dispatches updates.
	 */
	var Observer = function Observer (value) {
	  this.value = value;
	  this.dep = new Dep();
	  this.vmCount = 0;
	  def(value, '__ob__', this);
	  if (Array.isArray(value)) {
	    var augment = hasProto
	      ? protoAugment
	      : copyAugment;
	    augment(value, arrayMethods, arrayKeys);
	    this.observeArray(value);
	  } else {
	    this.walk(value);
	  }
	};
	
	/**
	 * Walk through each property and convert them into
	 * getter/setters. This method should only be called when
	 * value type is Object.
	 */
	Observer.prototype.walk = function walk (obj) {
	  var keys = Object.keys(obj);
	  for (var i = 0; i < keys.length; i++) {
	    defineReactive$$1(obj, keys[i], obj[keys[i]]);
	  }
	};
	
	/**
	 * Observe a list of Array items.
	 */
	Observer.prototype.observeArray = function observeArray (items) {
	  for (var i = 0, l = items.length; i < l; i++) {
	    observe(items[i]);
	  }
	};
	
	// helpers
	
	/**
	 * Augment an target Object or Array by intercepting
	 * the prototype chain using __proto__
	 */
	function protoAugment (target, src) {
	  /* eslint-disable no-proto */
	  target.__proto__ = src;
	  /* eslint-enable no-proto */
	}
	
	/**
	 * Augment an target Object or Array by defining
	 * hidden properties.
	 */
	/* istanbul ignore next */
	function copyAugment (target, src, keys) {
	  for (var i = 0, l = keys.length; i < l; i++) {
	    var key = keys[i];
	    def(target, key, src[key]);
	  }
	}
	
	/**
	 * Attempt to create an observer instance for a value,
	 * returns the new observer if successfully observed,
	 * or the existing observer if the value already has one.
	 */
	function observe (value, asRootData) {
	  if (!isObject(value)) {
	    return
	  }
	  var ob;
	  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
	    ob = value.__ob__;
	  } else if (
	    observerState.shouldConvert &&
	    !isServerRendering() &&
	    (Array.isArray(value) || isPlainObject(value)) &&
	    Object.isExtensible(value) &&
	    !value._isVue
	  ) {
	    ob = new Observer(value);
	  }
	  if (asRootData && ob) {
	    ob.vmCount++;
	  }
	  return ob
	}
	
	/**
	 * Define a reactive property on an Object.
	 */
	function defineReactive$$1 (
	  obj,
	  key,
	  val,
	  customSetter
	) {
	  var dep = new Dep();
	
	  var property = Object.getOwnPropertyDescriptor(obj, key);
	  if (property && property.configurable === false) {
	    return
	  }
	
	  // cater for pre-defined getter/setters
	  var getter = property && property.get;
	  var setter = property && property.set;
	
	  var childOb = observe(val);
	  Object.defineProperty(obj, key, {
	    enumerable: true,
	    configurable: true,
	    get: function reactiveGetter () {
	      var value = getter ? getter.call(obj) : val;
	      if (Dep.target) {
	        dep.depend();
	        if (childOb) {
	          childOb.dep.depend();
	        }
	        if (Array.isArray(value)) {
	          dependArray(value);
	        }
	      }
	      return value
	    },
	    set: function reactiveSetter (newVal) {
	      var value = getter ? getter.call(obj) : val;
	      /* eslint-disable no-self-compare */
	      if (newVal === value || (newVal !== newVal && value !== value)) {
	        return
	      }
	      /* eslint-enable no-self-compare */
	      if ("development" !== 'production' && customSetter) {
	        customSetter();
	      }
	      if (setter) {
	        setter.call(obj, newVal);
	      } else {
	        val = newVal;
	      }
	      childOb = observe(newVal);
	      dep.notify();
	    }
	  });
	}
	
	/**
	 * Set a property on an object. Adds the new property and
	 * triggers change notification if the property doesn't
	 * already exist.
	 */
	function set (target, key, val) {
	  if (Array.isArray(target) && typeof key === 'number') {
	    target.length = Math.max(target.length, key);
	    target.splice(key, 1, val);
	    return val
	  }
	  if (hasOwn(target, key)) {
	    target[key] = val;
	    return val
	  }
	  var ob = (target ).__ob__;
	  if (target._isVue || (ob && ob.vmCount)) {
	    "development" !== 'production' && warn(
	      'Avoid adding reactive properties to a Vue instance or its root $data ' +
	      'at runtime - declare it upfront in the data option.'
	    );
	    return val
	  }
	  if (!ob) {
	    target[key] = val;
	    return val
	  }
	  defineReactive$$1(ob.value, key, val);
	  ob.dep.notify();
	  return val
	}
	
	/**
	 * Delete a property and trigger change if necessary.
	 */
	function del (target, key) {
	  if (Array.isArray(target) && typeof key === 'number') {
	    target.splice(key, 1);
	    return
	  }
	  var ob = (target ).__ob__;
	  if (target._isVue || (ob && ob.vmCount)) {
	    "development" !== 'production' && warn(
	      'Avoid deleting properties on a Vue instance or its root $data ' +
	      '- just set it to null.'
	    );
	    return
	  }
	  if (!hasOwn(target, key)) {
	    return
	  }
	  delete target[key];
	  if (!ob) {
	    return
	  }
	  ob.dep.notify();
	}
	
	/**
	 * Collect dependencies on array elements when the array is touched, since
	 * we cannot intercept array element access like property getters.
	 */
	function dependArray (value) {
	  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
	    e = value[i];
	    e && e.__ob__ && e.__ob__.dep.depend();
	    if (Array.isArray(e)) {
	      dependArray(e);
	    }
	  }
	}
	
	/*  */
	
	/**
	 * Option overwriting strategies are functions that handle
	 * how to merge a parent option value and a child option
	 * value into the final value.
	 */
	var strats = config.optionMergeStrategies;
	
	/**
	 * Options with restrictions
	 */
	{
	  strats.el = strats.propsData = function (parent, child, vm, key) {
	    if (!vm) {
	      warn(
	        "option \"" + key + "\" can only be used during instance " +
	        'creation with the `new` keyword.'
	      );
	    }
	    return defaultStrat(parent, child)
	  };
	}
	
	/**
	 * Helper that recursively merges two data objects together.
	 */
	function mergeData (to, from) {
	  if (!from) { return to }
	  var key, toVal, fromVal;
	  var keys = Object.keys(from);
	  for (var i = 0; i < keys.length; i++) {
	    key = keys[i];
	    toVal = to[key];
	    fromVal = from[key];
	    if (!hasOwn(to, key)) {
	      set(to, key, fromVal);
	    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
	      mergeData(toVal, fromVal);
	    }
	  }
	  return to
	}
	
	/**
	 * Data
	 */
	strats.data = function (
	  parentVal,
	  childVal,
	  vm
	) {
	  if (!vm) {
	    // in a Vue.extend merge, both should be functions
	    if (!childVal) {
	      return parentVal
	    }
	    if (typeof childVal !== 'function') {
	      "development" !== 'production' && warn(
	        'The "data" option should be a function ' +
	        'that returns a per-instance value in component ' +
	        'definitions.',
	        vm
	      );
	      return parentVal
	    }
	    if (!parentVal) {
	      return childVal
	    }
	    // when parentVal & childVal are both present,
	    // we need to return a function that returns the
	    // merged result of both functions... no need to
	    // check if parentVal is a function here because
	    // it has to be a function to pass previous merges.
	    return function mergedDataFn () {
	      return mergeData(
	        childVal.call(this),
	        parentVal.call(this)
	      )
	    }
	  } else if (parentVal || childVal) {
	    return function mergedInstanceDataFn () {
	      // instance merge
	      var instanceData = typeof childVal === 'function'
	        ? childVal.call(vm)
	        : childVal;
	      var defaultData = typeof parentVal === 'function'
	        ? parentVal.call(vm)
	        : undefined;
	      if (instanceData) {
	        return mergeData(instanceData, defaultData)
	      } else {
	        return defaultData
	      }
	    }
	  }
	};
	
	/**
	 * Hooks and props are merged as arrays.
	 */
	function mergeHook (
	  parentVal,
	  childVal
	) {
	  return childVal
	    ? parentVal
	      ? parentVal.concat(childVal)
	      : Array.isArray(childVal)
	        ? childVal
	        : [childVal]
	    : parentVal
	}
	
	LIFECYCLE_HOOKS.forEach(function (hook) {
	  strats[hook] = mergeHook;
	});
	
	/**
	 * Assets
	 *
	 * When a vm is present (instance creation), we need to do
	 * a three-way merge between constructor options, instance
	 * options and parent options.
	 */
	function mergeAssets (parentVal, childVal) {
	  var res = Object.create(parentVal || null);
	  return childVal
	    ? extend(res, childVal)
	    : res
	}
	
	ASSET_TYPES.forEach(function (type) {
	  strats[type + 's'] = mergeAssets;
	});
	
	/**
	 * Watchers.
	 *
	 * Watchers hashes should not overwrite one
	 * another, so we merge them as arrays.
	 */
	strats.watch = function (parentVal, childVal) {
	  /* istanbul ignore if */
	  if (!childVal) { return Object.create(parentVal || null) }
	  if (!parentVal) { return childVal }
	  var ret = {};
	  extend(ret, parentVal);
	  for (var key in childVal) {
	    var parent = ret[key];
	    var child = childVal[key];
	    if (parent && !Array.isArray(parent)) {
	      parent = [parent];
	    }
	    ret[key] = parent
	      ? parent.concat(child)
	      : [child];
	  }
	  return ret
	};
	
	/**
	 * Other object hashes.
	 */
	strats.props =
	strats.methods =
	strats.computed = function (parentVal, childVal) {
	  if (!childVal) { return Object.create(parentVal || null) }
	  if (!parentVal) { return childVal }
	  var ret = Object.create(null);
	  extend(ret, parentVal);
	  extend(ret, childVal);
	  return ret
	};
	
	/**
	 * Default strategy.
	 */
	var defaultStrat = function (parentVal, childVal) {
	  return childVal === undefined
	    ? parentVal
	    : childVal
	};
	
	/**
	 * Validate component names
	 */
	function checkComponents (options) {
	  for (var key in options.components) {
	    var lower = key.toLowerCase();
	    if (isBuiltInTag(lower) || config.isReservedTag(lower)) {
	      warn(
	        'Do not use built-in or reserved HTML elements as component ' +
	        'id: ' + key
	      );
	    }
	  }
	}
	
	/**
	 * Ensure all props option syntax are normalized into the
	 * Object-based format.
	 */
	function normalizeProps (options) {
	  var props = options.props;
	  if (!props) { return }
	  var res = {};
	  var i, val, name;
	  if (Array.isArray(props)) {
	    i = props.length;
	    while (i--) {
	      val = props[i];
	      if (typeof val === 'string') {
	        name = camelize(val);
	        res[name] = { type: null };
	      } else {
	        warn('props must be strings when using array syntax.');
	      }
	    }
	  } else if (isPlainObject(props)) {
	    for (var key in props) {
	      val = props[key];
	      name = camelize(key);
	      res[name] = isPlainObject(val)
	        ? val
	        : { type: val };
	    }
	  }
	  options.props = res;
	}
	
	/**
	 * Normalize raw function directives into object format.
	 */
	function normalizeDirectives (options) {
	  var dirs = options.directives;
	  if (dirs) {
	    for (var key in dirs) {
	      var def = dirs[key];
	      if (typeof def === 'function') {
	        dirs[key] = { bind: def, update: def };
	      }
	    }
	  }
	}
	
	/**
	 * Merge two option objects into a new one.
	 * Core utility used in both instantiation and inheritance.
	 */
	function mergeOptions (
	  parent,
	  child,
	  vm
	) {
	  {
	    checkComponents(child);
	  }
	
	  if (typeof child === 'function') {
	    child = child.options;
	  }
	
	  normalizeProps(child);
	  normalizeDirectives(child);
	  var extendsFrom = child.extends;
	  if (extendsFrom) {
	    parent = mergeOptions(parent, extendsFrom, vm);
	  }
	  if (child.mixins) {
	    for (var i = 0, l = child.mixins.length; i < l; i++) {
	      parent = mergeOptions(parent, child.mixins[i], vm);
	    }
	  }
	  var options = {};
	  var key;
	  for (key in parent) {
	    mergeField(key);
	  }
	  for (key in child) {
	    if (!hasOwn(parent, key)) {
	      mergeField(key);
	    }
	  }
	  function mergeField (key) {
	    var strat = strats[key] || defaultStrat;
	    options[key] = strat(parent[key], child[key], vm, key);
	  }
	  return options
	}
	
	/**
	 * Resolve an asset.
	 * This function is used because child instances need access
	 * to assets defined in its ancestor chain.
	 */
	function resolveAsset (
	  options,
	  type,
	  id,
	  warnMissing
	) {
	  /* istanbul ignore if */
	  if (typeof id !== 'string') {
	    return
	  }
	  var assets = options[type];
	  // check local registration variations first
	  if (hasOwn(assets, id)) { return assets[id] }
	  var camelizedId = camelize(id);
	  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
	  var PascalCaseId = capitalize(camelizedId);
	  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
	  // fallback to prototype chain
	  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
	  if ("development" !== 'production' && warnMissing && !res) {
	    warn(
	      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
	      options
	    );
	  }
	  return res
	}
	
	/*  */
	
	function validateProp (
	  key,
	  propOptions,
	  propsData,
	  vm
	) {
	  var prop = propOptions[key];
	  var absent = !hasOwn(propsData, key);
	  var value = propsData[key];
	  // handle boolean props
	  if (isType(Boolean, prop.type)) {
	    if (absent && !hasOwn(prop, 'default')) {
	      value = false;
	    } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
	      value = true;
	    }
	  }
	  // check default value
	  if (value === undefined) {
	    value = getPropDefaultValue(vm, prop, key);
	    // since the default value is a fresh copy,
	    // make sure to observe it.
	    var prevShouldConvert = observerState.shouldConvert;
	    observerState.shouldConvert = true;
	    observe(value);
	    observerState.shouldConvert = prevShouldConvert;
	  }
	  {
	    assertProp(prop, key, value, vm, absent);
	  }
	  return value
	}
	
	/**
	 * Get the default value of a prop.
	 */
	function getPropDefaultValue (vm, prop, key) {
	  // no default, return undefined
	  if (!hasOwn(prop, 'default')) {
	    return undefined
	  }
	  var def = prop.default;
	  // warn against non-factory defaults for Object & Array
	  if ("development" !== 'production' && isObject(def)) {
	    warn(
	      'Invalid default value for prop "' + key + '": ' +
	      'Props with type Object/Array must use a factory function ' +
	      'to return the default value.',
	      vm
	    );
	  }
	  // the raw prop value was also undefined from previous render,
	  // return previous default value to avoid unnecessary watcher trigger
	  if (vm && vm.$options.propsData &&
	    vm.$options.propsData[key] === undefined &&
	    vm._props[key] !== undefined
	  ) {
	    return vm._props[key]
	  }
	  // call factory function for non-Function types
	  // a value is Function if its prototype is function even across different execution context
	  return typeof def === 'function' && getType(prop.type) !== 'Function'
	    ? def.call(vm)
	    : def
	}
	
	/**
	 * Assert whether a prop is valid.
	 */
	function assertProp (
	  prop,
	  name,
	  value,
	  vm,
	  absent
	) {
	  if (prop.required && absent) {
	    warn(
	      'Missing required prop: "' + name + '"',
	      vm
	    );
	    return
	  }
	  if (value == null && !prop.required) {
	    return
	  }
	  var type = prop.type;
	  var valid = !type || type === true;
	  var expectedTypes = [];
	  if (type) {
	    if (!Array.isArray(type)) {
	      type = [type];
	    }
	    for (var i = 0; i < type.length && !valid; i++) {
	      var assertedType = assertType(value, type[i]);
	      expectedTypes.push(assertedType.expectedType || '');
	      valid = assertedType.valid;
	    }
	  }
	  if (!valid) {
	    warn(
	      'Invalid prop: type check failed for prop "' + name + '".' +
	      ' Expected ' + expectedTypes.map(capitalize).join(', ') +
	      ', got ' + Object.prototype.toString.call(value).slice(8, -1) + '.',
	      vm
	    );
	    return
	  }
	  var validator = prop.validator;
	  if (validator) {
	    if (!validator(value)) {
	      warn(
	        'Invalid prop: custom validator check failed for prop "' + name + '".',
	        vm
	      );
	    }
	  }
	}
	
	var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;
	
	function assertType (value, type) {
	  var valid;
	  var expectedType = getType(type);
	  if (simpleCheckRE.test(expectedType)) {
	    valid = typeof value === expectedType.toLowerCase();
	  } else if (expectedType === 'Object') {
	    valid = isPlainObject(value);
	  } else if (expectedType === 'Array') {
	    valid = Array.isArray(value);
	  } else {
	    valid = value instanceof type;
	  }
	  return {
	    valid: valid,
	    expectedType: expectedType
	  }
	}
	
	/**
	 * Use function string name to check built-in types,
	 * because a simple equality check will fail when running
	 * across different vms / iframes.
	 */
	function getType (fn) {
	  var match = fn && fn.toString().match(/^\s*function (\w+)/);
	  return match ? match[1] : ''
	}
	
	function isType (type, fn) {
	  if (!Array.isArray(fn)) {
	    return getType(fn) === getType(type)
	  }
	  for (var i = 0, len = fn.length; i < len; i++) {
	    if (getType(fn[i]) === getType(type)) {
	      return true
	    }
	  }
	  /* istanbul ignore next */
	  return false
	}
	
	/*  */
	
	var mark;
	var measure;
	
	{
	  var perf = inBrowser && window.performance;
	  /* istanbul ignore if */
	  if (
	    perf &&
	    perf.mark &&
	    perf.measure &&
	    perf.clearMarks &&
	    perf.clearMeasures
	  ) {
	    mark = function (tag) { return perf.mark(tag); };
	    measure = function (name, startTag, endTag) {
	      perf.measure(name, startTag, endTag);
	      perf.clearMarks(startTag);
	      perf.clearMarks(endTag);
	      perf.clearMeasures(name);
	    };
	  }
	}
	
	/* not type checking this file because flow doesn't play well with Proxy */
	
	var initProxy;
	
	{
	  var allowedGlobals = makeMap(
	    'Infinity,undefined,NaN,isFinite,isNaN,' +
	    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
	    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
	    'require' // for Webpack/Browserify
	  );
	
	  var warnNonPresent = function (target, key) {
	    warn(
	      "Property or method \"" + key + "\" is not defined on the instance but " +
	      "referenced during render. Make sure to declare reactive data " +
	      "properties in the data option.",
	      target
	    );
	  };
	
	  var hasProxy =
	    typeof Proxy !== 'undefined' &&
	    Proxy.toString().match(/native code/);
	
	  if (hasProxy) {
	    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta');
	    config.keyCodes = new Proxy(config.keyCodes, {
	      set: function set (target, key, value) {
	        if (isBuiltInModifier(key)) {
	          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
	          return false
	        } else {
	          target[key] = value;
	          return true
	        }
	      }
	    });
	  }
	
	  var hasHandler = {
	    has: function has (target, key) {
	      var has = key in target;
	      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
	      if (!has && !isAllowed) {
	        warnNonPresent(target, key);
	      }
	      return has || !isAllowed
	    }
	  };
	
	  var getHandler = {
	    get: function get (target, key) {
	      if (typeof key === 'string' && !(key in target)) {
	        warnNonPresent(target, key);
	      }
	      return target[key]
	    }
	  };
	
	  initProxy = function initProxy (vm) {
	    if (hasProxy) {
	      // determine which proxy handler to use
	      var options = vm.$options;
	      var handlers = options.render && options.render._withStripped
	        ? getHandler
	        : hasHandler;
	      vm._renderProxy = new Proxy(vm, handlers);
	    } else {
	      vm._renderProxy = vm;
	    }
	  };
	}
	
	/*  */
	
	var VNode = function VNode (
	  tag,
	  data,
	  children,
	  text,
	  elm,
	  context,
	  componentOptions
	) {
	  this.tag = tag;
	  this.data = data;
	  this.children = children;
	  this.text = text;
	  this.elm = elm;
	  this.ns = undefined;
	  this.context = context;
	  this.functionalContext = undefined;
	  this.key = data && data.key;
	  this.componentOptions = componentOptions;
	  this.componentInstance = undefined;
	  this.parent = undefined;
	  this.raw = false;
	  this.isStatic = false;
	  this.isRootInsert = true;
	  this.isComment = false;
	  this.isCloned = false;
	  this.isOnce = false;
	};
	
	var prototypeAccessors = { child: {} };
	
	// DEPRECATED: alias for componentInstance for backwards compat.
	/* istanbul ignore next */
	prototypeAccessors.child.get = function () {
	  return this.componentInstance
	};
	
	Object.defineProperties( VNode.prototype, prototypeAccessors );
	
	var createEmptyVNode = function () {
	  var node = new VNode();
	  node.text = '';
	  node.isComment = true;
	  return node
	};
	
	function createTextVNode (val) {
	  return new VNode(undefined, undefined, undefined, String(val))
	}
	
	// optimized shallow clone
	// used for static nodes and slot nodes because they may be reused across
	// multiple renders, cloning them avoids errors when DOM manipulations rely
	// on their elm reference.
	function cloneVNode (vnode) {
	  var cloned = new VNode(
	    vnode.tag,
	    vnode.data,
	    vnode.children,
	    vnode.text,
	    vnode.elm,
	    vnode.context,
	    vnode.componentOptions
	  );
	  cloned.ns = vnode.ns;
	  cloned.isStatic = vnode.isStatic;
	  cloned.key = vnode.key;
	  cloned.isComment = vnode.isComment;
	  cloned.isCloned = true;
	  return cloned
	}
	
	function cloneVNodes (vnodes) {
	  var len = vnodes.length;
	  var res = new Array(len);
	  for (var i = 0; i < len; i++) {
	    res[i] = cloneVNode(vnodes[i]);
	  }
	  return res
	}
	
	/*  */
	
	var normalizeEvent = cached(function (name) {
	  var passive = name.charAt(0) === '&';
	  name = passive ? name.slice(1) : name;
	  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
	  name = once$$1 ? name.slice(1) : name;
	  var capture = name.charAt(0) === '!';
	  name = capture ? name.slice(1) : name;
	  return {
	    name: name,
	    once: once$$1,
	    capture: capture,
	    passive: passive
	  }
	});
	
	function createFnInvoker (fns) {
	  function invoker () {
	    var arguments$1 = arguments;
	
	    var fns = invoker.fns;
	    if (Array.isArray(fns)) {
	      for (var i = 0; i < fns.length; i++) {
	        fns[i].apply(null, arguments$1);
	      }
	    } else {
	      // return handler return value for single handlers
	      return fns.apply(null, arguments)
	    }
	  }
	  invoker.fns = fns;
	  return invoker
	}
	
	function updateListeners (
	  on,
	  oldOn,
	  add,
	  remove$$1,
	  vm
	) {
	  var name, cur, old, event;
	  for (name in on) {
	    cur = on[name];
	    old = oldOn[name];
	    event = normalizeEvent(name);
	    if (isUndef(cur)) {
	      "development" !== 'production' && warn(
	        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
	        vm
	      );
	    } else if (isUndef(old)) {
	      if (isUndef(cur.fns)) {
	        cur = on[name] = createFnInvoker(cur);
	      }
	      add(event.name, cur, event.once, event.capture, event.passive);
	    } else if (cur !== old) {
	      old.fns = cur;
	      on[name] = old;
	    }
	  }
	  for (name in oldOn) {
	    if (isUndef(on[name])) {
	      event = normalizeEvent(name);
	      remove$$1(event.name, oldOn[name], event.capture);
	    }
	  }
	}
	
	/*  */
	
	function mergeVNodeHook (def, hookKey, hook) {
	  var invoker;
	  var oldHook = def[hookKey];
	
	  function wrappedHook () {
	    hook.apply(this, arguments);
	    // important: remove merged hook to ensure it's called only once
	    // and prevent memory leak
	    remove(invoker.fns, wrappedHook);
	  }
	
	  if (isUndef(oldHook)) {
	    // no existing hook
	    invoker = createFnInvoker([wrappedHook]);
	  } else {
	    /* istanbul ignore if */
	    if (isDef(oldHook.fns) && isTrue(oldHook.merged)) {
	      // already a merged invoker
	      invoker = oldHook;
	      invoker.fns.push(wrappedHook);
	    } else {
	      // existing plain hook
	      invoker = createFnInvoker([oldHook, wrappedHook]);
	    }
	  }
	
	  invoker.merged = true;
	  def[hookKey] = invoker;
	}
	
	/*  */
	
	function extractPropsFromVNodeData (
	  data,
	  Ctor,
	  tag
	) {
	  // we are only extracting raw values here.
	  // validation and default values are handled in the child
	  // component itself.
	  var propOptions = Ctor.options.props;
	  if (isUndef(propOptions)) {
	    return
	  }
	  var res = {};
	  var attrs = data.attrs;
	  var props = data.props;
	  if (isDef(attrs) || isDef(props)) {
	    for (var key in propOptions) {
	      var altKey = hyphenate(key);
	      {
	        var keyInLowerCase = key.toLowerCase();
	        if (
	          key !== keyInLowerCase &&
	          attrs && hasOwn(attrs, keyInLowerCase)
	        ) {
	          tip(
	            "Prop \"" + keyInLowerCase + "\" is passed to component " +
	            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
	            " \"" + key + "\". " +
	            "Note that HTML attributes are case-insensitive and camelCased " +
	            "props need to use their kebab-case equivalents when using in-DOM " +
	            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
	          );
	        }
	      }
	      checkProp(res, props, key, altKey, true) ||
	      checkProp(res, attrs, key, altKey, false);
	    }
	  }
	  return res
	}
	
	function checkProp (
	  res,
	  hash,
	  key,
	  altKey,
	  preserve
	) {
	  if (isDef(hash)) {
	    if (hasOwn(hash, key)) {
	      res[key] = hash[key];
	      if (!preserve) {
	        delete hash[key];
	      }
	      return true
	    } else if (hasOwn(hash, altKey)) {
	      res[key] = hash[altKey];
	      if (!preserve) {
	        delete hash[altKey];
	      }
	      return true
	    }
	  }
	  return false
	}
	
	/*  */
	
	// The template compiler attempts to minimize the need for normalization by
	// statically analyzing the template at compile time.
	//
	// For plain HTML markup, normalization can be completely skipped because the
	// generated render function is guaranteed to return Array<VNode>. There are
	// two cases where extra normalization is needed:
	
	// 1. When the children contains components - because a functional component
	// may return an Array instead of a single root. In this case, just a simple
	// normalization is needed - if any child is an Array, we flatten the whole
	// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
	// because functional components already normalize their own children.
	function simpleNormalizeChildren (children) {
	  for (var i = 0; i < children.length; i++) {
	    if (Array.isArray(children[i])) {
	      return Array.prototype.concat.apply([], children)
	    }
	  }
	  return children
	}
	
	// 2. When the children contains constructs that always generated nested Arrays,
	// e.g. <template>, <slot>, v-for, or when the children is provided by user
	// with hand-written render functions / JSX. In such cases a full normalization
	// is needed to cater to all possible types of children values.
	function normalizeChildren (children) {
	  return isPrimitive(children)
	    ? [createTextVNode(children)]
	    : Array.isArray(children)
	      ? normalizeArrayChildren(children)
	      : undefined
	}
	
	function isTextNode (node) {
	  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
	}
	
	function normalizeArrayChildren (children, nestedIndex) {
	  var res = [];
	  var i, c, last;
	  for (i = 0; i < children.length; i++) {
	    c = children[i];
	    if (isUndef(c) || typeof c === 'boolean') { continue }
	    last = res[res.length - 1];
	    //  nested
	    if (Array.isArray(c)) {
	      res.push.apply(res, normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i)));
	    } else if (isPrimitive(c)) {
	      if (isTextNode(last)) {
	        // merge adjacent text nodes
	        // this is necessary for SSR hydration because text nodes are
	        // essentially merged when rendered to HTML strings
	        (last).text += String(c);
	      } else if (c !== '') {
	        // convert primitive to vnode
	        res.push(createTextVNode(c));
	      }
	    } else {
	      if (isTextNode(c) && isTextNode(last)) {
	        // merge adjacent text nodes
	        res[res.length - 1] = createTextVNode(last.text + c.text);
	      } else {
	        // default key for nested array children (likely generated by v-for)
	        if (isTrue(children._isVList) &&
	          isDef(c.tag) &&
	          isUndef(c.key) &&
	          isDef(nestedIndex)) {
	          c.key = "__vlist" + nestedIndex + "_" + i + "__";
	        }
	        res.push(c);
	      }
	    }
	  }
	  return res
	}
	
	/*  */
	
	function ensureCtor (comp, base) {
	  return isObject(comp)
	    ? base.extend(comp)
	    : comp
	}
	
	function resolveAsyncComponent (
	  factory,
	  baseCtor,
	  context
	) {
	  if (isTrue(factory.error) && isDef(factory.errorComp)) {
	    return factory.errorComp
	  }
	
	  if (isDef(factory.resolved)) {
	    return factory.resolved
	  }
	
	  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
	    return factory.loadingComp
	  }
	
	  if (isDef(factory.contexts)) {
	    // already pending
	    factory.contexts.push(context);
	  } else {
	    var contexts = factory.contexts = [context];
	    var sync = true;
	
	    var forceRender = function () {
	      for (var i = 0, l = contexts.length; i < l; i++) {
	        contexts[i].$forceUpdate();
	      }
	    };
	
	    var resolve = once(function (res) {
	      // cache resolved
	      factory.resolved = ensureCtor(res, baseCtor);
	      // invoke callbacks only if this is not a synchronous resolve
	      // (async resolves are shimmed as synchronous during SSR)
	      if (!sync) {
	        forceRender();
	      }
	    });
	
	    var reject = once(function (reason) {
	      "development" !== 'production' && warn(
	        "Failed to resolve async component: " + (String(factory)) +
	        (reason ? ("\nReason: " + reason) : '')
	      );
	      if (isDef(factory.errorComp)) {
	        factory.error = true;
	        forceRender();
	      }
	    });
	
	    var res = factory(resolve, reject);
	
	    if (isObject(res)) {
	      if (typeof res.then === 'function') {
	        // () => Promise
	        if (isUndef(factory.resolved)) {
	          res.then(resolve, reject);
	        }
	      } else if (isDef(res.component) && typeof res.component.then === 'function') {
	        res.component.then(resolve, reject);
	
	        if (isDef(res.error)) {
	          factory.errorComp = ensureCtor(res.error, baseCtor);
	        }
	
	        if (isDef(res.loading)) {
	          factory.loadingComp = ensureCtor(res.loading, baseCtor);
	          if (res.delay === 0) {
	            factory.loading = true;
	          } else {
	            setTimeout(function () {
	              if (isUndef(factory.resolved) && isUndef(factory.error)) {
	                factory.loading = true;
	                forceRender();
	              }
	            }, res.delay || 200);
	          }
	        }
	
	        if (isDef(res.timeout)) {
	          setTimeout(function () {
	            if (isUndef(factory.resolved)) {
	              reject(
	                "timeout (" + (res.timeout) + "ms)"
	              );
	            }
	          }, res.timeout);
	        }
	      }
	    }
	
	    sync = false;
	    // return in case resolved synchronously
	    return factory.loading
	      ? factory.loadingComp
	      : factory.resolved
	  }
	}
	
	/*  */
	
	function getFirstComponentChild (children) {
	  if (Array.isArray(children)) {
	    for (var i = 0; i < children.length; i++) {
	      var c = children[i];
	      if (isDef(c) && isDef(c.componentOptions)) {
	        return c
	      }
	    }
	  }
	}
	
	/*  */
	
	/*  */
	
	function initEvents (vm) {
	  vm._events = Object.create(null);
	  vm._hasHookEvent = false;
	  // init parent attached events
	  var listeners = vm.$options._parentListeners;
	  if (listeners) {
	    updateComponentListeners(vm, listeners);
	  }
	}
	
	var target;
	
	function add (event, fn, once$$1) {
	  if (once$$1) {
	    target.$once(event, fn);
	  } else {
	    target.$on(event, fn);
	  }
	}
	
	function remove$1 (event, fn) {
	  target.$off(event, fn);
	}
	
	function updateComponentListeners (
	  vm,
	  listeners,
	  oldListeners
	) {
	  target = vm;
	  updateListeners(listeners, oldListeners || {}, add, remove$1, vm);
	}
	
	function eventsMixin (Vue) {
	  var hookRE = /^hook:/;
	  Vue.prototype.$on = function (event, fn) {
	    var this$1 = this;
	
	    var vm = this;
	    if (Array.isArray(event)) {
	      for (var i = 0, l = event.length; i < l; i++) {
	        this$1.$on(event[i], fn);
	      }
	    } else {
	      (vm._events[event] || (vm._events[event] = [])).push(fn);
	      // optimize hook:event cost by using a boolean flag marked at registration
	      // instead of a hash lookup
	      if (hookRE.test(event)) {
	        vm._hasHookEvent = true;
	      }
	    }
	    return vm
	  };
	
	  Vue.prototype.$once = function (event, fn) {
	    var vm = this;
	    function on () {
	      vm.$off(event, on);
	      fn.apply(vm, arguments);
	    }
	    on.fn = fn;
	    vm.$on(event, on);
	    return vm
	  };
	
	  Vue.prototype.$off = function (event, fn) {
	    var this$1 = this;
	
	    var vm = this;
	    // all
	    if (!arguments.length) {
	      vm._events = Object.create(null);
	      return vm
	    }
	    // array of events
	    if (Array.isArray(event)) {
	      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
	        this$1.$off(event[i$1], fn);
	      }
	      return vm
	    }
	    // specific event
	    var cbs = vm._events[event];
	    if (!cbs) {
	      return vm
	    }
	    if (arguments.length === 1) {
	      vm._events[event] = null;
	      return vm
	    }
	    // specific handler
	    var cb;
	    var i = cbs.length;
	    while (i--) {
	      cb = cbs[i];
	      if (cb === fn || cb.fn === fn) {
	        cbs.splice(i, 1);
	        break
	      }
	    }
	    return vm
	  };
	
	  Vue.prototype.$emit = function (event) {
	    var vm = this;
	    {
	      var lowerCaseEvent = event.toLowerCase();
	      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
	        tip(
	          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
	          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
	          "Note that HTML attributes are case-insensitive and you cannot use " +
	          "v-on to listen to camelCase events when using in-DOM templates. " +
	          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
	        );
	      }
	    }
	    var cbs = vm._events[event];
	    if (cbs) {
	      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
	      var args = toArray(arguments, 1);
	      for (var i = 0, l = cbs.length; i < l; i++) {
	        cbs[i].apply(vm, args);
	      }
	    }
	    return vm
	  };
	}
	
	/*  */
	
	/**
	 * Runtime helper for resolving raw children VNodes into a slot object.
	 */
	function resolveSlots (
	  children,
	  context
	) {
	  var slots = {};
	  if (!children) {
	    return slots
	  }
	  var defaultSlot = [];
	  for (var i = 0, l = children.length; i < l; i++) {
	    var child = children[i];
	    // named slots should only be respected if the vnode was rendered in the
	    // same context.
	    if ((child.context === context || child.functionalContext === context) &&
	      child.data && child.data.slot != null
	    ) {
	      var name = child.data.slot;
	      var slot = (slots[name] || (slots[name] = []));
	      if (child.tag === 'template') {
	        slot.push.apply(slot, child.children);
	      } else {
	        slot.push(child);
	      }
	    } else {
	      defaultSlot.push(child);
	    }
	  }
	  // ignore whitespace
	  if (!defaultSlot.every(isWhitespace)) {
	    slots.default = defaultSlot;
	  }
	  return slots
	}
	
	function isWhitespace (node) {
	  return node.isComment || node.text === ' '
	}
	
	function resolveScopedSlots (
	  fns, // see flow/vnode
	  res
	) {
	  res = res || {};
	  for (var i = 0; i < fns.length; i++) {
	    if (Array.isArray(fns[i])) {
	      resolveScopedSlots(fns[i], res);
	    } else {
	      res[fns[i].key] = fns[i].fn;
	    }
	  }
	  return res
	}
	
	/*  */
	
	var activeInstance = null;
	
	function initLifecycle (vm) {
	  var options = vm.$options;
	
	  // locate first non-abstract parent
	  var parent = options.parent;
	  if (parent && !options.abstract) {
	    while (parent.$options.abstract && parent.$parent) {
	      parent = parent.$parent;
	    }
	    parent.$children.push(vm);
	  }
	
	  vm.$parent = parent;
	  vm.$root = parent ? parent.$root : vm;
	
	  vm.$children = [];
	  vm.$refs = {};
	
	  vm._watcher = null;
	  vm._inactive = null;
	  vm._directInactive = false;
	  vm._isMounted = false;
	  vm._isDestroyed = false;
	  vm._isBeingDestroyed = false;
	}
	
	function lifecycleMixin (Vue) {
	  Vue.prototype._update = function (vnode, hydrating) {
	    var vm = this;
	    if (vm._isMounted) {
	      callHook(vm, 'beforeUpdate');
	    }
	    var prevEl = vm.$el;
	    var prevVnode = vm._vnode;
	    var prevActiveInstance = activeInstance;
	    activeInstance = vm;
	    vm._vnode = vnode;
	    // Vue.prototype.__patch__ is injected in entry points
	    // based on the rendering backend used.
	    if (!prevVnode) {
	      // initial render
	      vm.$el = vm.__patch__(
	        vm.$el, vnode, hydrating, false /* removeOnly */,
	        vm.$options._parentElm,
	        vm.$options._refElm
	      );
	    } else {
	      // updates
	      vm.$el = vm.__patch__(prevVnode, vnode);
	    }
	    activeInstance = prevActiveInstance;
	    // update __vue__ reference
	    if (prevEl) {
	      prevEl.__vue__ = null;
	    }
	    if (vm.$el) {
	      vm.$el.__vue__ = vm;
	    }
	    // if parent is an HOC, update its $el as well
	    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
	      vm.$parent.$el = vm.$el;
	    }
	    // updated hook is called by the scheduler to ensure that children are
	    // updated in a parent's updated hook.
	  };
	
	  Vue.prototype.$forceUpdate = function () {
	    var vm = this;
	    if (vm._watcher) {
	      vm._watcher.update();
	    }
	  };
	
	  Vue.prototype.$destroy = function () {
	    var vm = this;
	    if (vm._isBeingDestroyed) {
	      return
	    }
	    callHook(vm, 'beforeDestroy');
	    vm._isBeingDestroyed = true;
	    // remove self from parent
	    var parent = vm.$parent;
	    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
	      remove(parent.$children, vm);
	    }
	    // teardown watchers
	    if (vm._watcher) {
	      vm._watcher.teardown();
	    }
	    var i = vm._watchers.length;
	    while (i--) {
	      vm._watchers[i].teardown();
	    }
	    // remove reference from data ob
	    // frozen object may not have observer.
	    if (vm._data.__ob__) {
	      vm._data.__ob__.vmCount--;
	    }
	    // call the last hook...
	    vm._isDestroyed = true;
	    // invoke destroy hooks on current rendered tree
	    vm.__patch__(vm._vnode, null);
	    // fire destroyed hook
	    callHook(vm, 'destroyed');
	    // turn off all instance listeners.
	    vm.$off();
	    // remove __vue__ reference
	    if (vm.$el) {
	      vm.$el.__vue__ = null;
	    }
	    // remove reference to DOM nodes (prevents leak)
	    vm.$options._parentElm = vm.$options._refElm = null;
	  };
	}
	
	function mountComponent (
	  vm,
	  el,
	  hydrating
	) {
	  vm.$el = el;
	  if (!vm.$options.render) {
	    vm.$options.render = createEmptyVNode;
	    {
	      /* istanbul ignore if */
	      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
	        vm.$options.el || el) {
	        warn(
	          'You are using the runtime-only build of Vue where the template ' +
	          'compiler is not available. Either pre-compile the templates into ' +
	          'render functions, or use the compiler-included build.',
	          vm
	        );
	      } else {
	        warn(
	          'Failed to mount component: template or render function not defined.',
	          vm
	        );
	      }
	    }
	  }
	  callHook(vm, 'beforeMount');
	
	  var updateComponent;
	  /* istanbul ignore if */
	  if ("development" !== 'production' && config.performance && mark) {
	    updateComponent = function () {
	      var name = vm._name;
	      var id = vm._uid;
	      var startTag = "vue-perf-start:" + id;
	      var endTag = "vue-perf-end:" + id;
	
	      mark(startTag);
	      var vnode = vm._render();
	      mark(endTag);
	      measure((name + " render"), startTag, endTag);
	
	      mark(startTag);
	      vm._update(vnode, hydrating);
	      mark(endTag);
	      measure((name + " patch"), startTag, endTag);
	    };
	  } else {
	    updateComponent = function () {
	      vm._update(vm._render(), hydrating);
	    };
	  }
	
	  vm._watcher = new Watcher(vm, updateComponent, noop);
	  hydrating = false;
	
	  // manually mounted instance, call mounted on self
	  // mounted is called for render-created child components in its inserted hook
	  if (vm.$vnode == null) {
	    vm._isMounted = true;
	    callHook(vm, 'mounted');
	  }
	  return vm
	}
	
	function updateChildComponent (
	  vm,
	  propsData,
	  listeners,
	  parentVnode,
	  renderChildren
	) {
	  // determine whether component has slot children
	  // we need to do this before overwriting $options._renderChildren
	  var hasChildren = !!(
	    renderChildren ||               // has new static slots
	    vm.$options._renderChildren ||  // has old static slots
	    parentVnode.data.scopedSlots || // has new scoped slots
	    vm.$scopedSlots !== emptyObject // has old scoped slots
	  );
	
	  vm.$options._parentVnode = parentVnode;
	  vm.$vnode = parentVnode; // update vm's placeholder node without re-render
	  if (vm._vnode) { // update child tree's parent
	    vm._vnode.parent = parentVnode;
	  }
	  vm.$options._renderChildren = renderChildren;
	
	  // update props
	  if (propsData && vm.$options.props) {
	    observerState.shouldConvert = false;
	    {
	      observerState.isSettingProps = true;
	    }
	    var props = vm._props;
	    var propKeys = vm.$options._propKeys || [];
	    for (var i = 0; i < propKeys.length; i++) {
	      var key = propKeys[i];
	      props[key] = validateProp(key, vm.$options.props, propsData, vm);
	    }
	    observerState.shouldConvert = true;
	    {
	      observerState.isSettingProps = false;
	    }
	    // keep a copy of raw propsData
	    vm.$options.propsData = propsData;
	  }
	  // update listeners
	  if (listeners) {
	    var oldListeners = vm.$options._parentListeners;
	    vm.$options._parentListeners = listeners;
	    updateComponentListeners(vm, listeners, oldListeners);
	  }
	  // resolve slots + force update if has children
	  if (hasChildren) {
	    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
	    vm.$forceUpdate();
	  }
	}
	
	function isInInactiveTree (vm) {
	  while (vm && (vm = vm.$parent)) {
	    if (vm._inactive) { return true }
	  }
	  return false
	}
	
	function activateChildComponent (vm, direct) {
	  if (direct) {
	    vm._directInactive = false;
	    if (isInInactiveTree(vm)) {
	      return
	    }
	  } else if (vm._directInactive) {
	    return
	  }
	  if (vm._inactive || vm._inactive === null) {
	    vm._inactive = false;
	    for (var i = 0; i < vm.$children.length; i++) {
	      activateChildComponent(vm.$children[i]);
	    }
	    callHook(vm, 'activated');
	  }
	}
	
	function deactivateChildComponent (vm, direct) {
	  if (direct) {
	    vm._directInactive = true;
	    if (isInInactiveTree(vm)) {
	      return
	    }
	  }
	  if (!vm._inactive) {
	    vm._inactive = true;
	    for (var i = 0; i < vm.$children.length; i++) {
	      deactivateChildComponent(vm.$children[i]);
	    }
	    callHook(vm, 'deactivated');
	  }
	}
	
	function callHook (vm, hook) {
	  var handlers = vm.$options[hook];
	  if (handlers) {
	    for (var i = 0, j = handlers.length; i < j; i++) {
	      try {
	        handlers[i].call(vm);
	      } catch (e) {
	        handleError(e, vm, (hook + " hook"));
	      }
	    }
	  }
	  if (vm._hasHookEvent) {
	    vm.$emit('hook:' + hook);
	  }
	}
	
	/*  */
	
	
	var MAX_UPDATE_COUNT = 100;
	
	var queue = [];
	var activatedChildren = [];
	var has = {};
	var circular = {};
	var waiting = false;
	var flushing = false;
	var index = 0;
	
	/**
	 * Reset the scheduler's state.
	 */
	function resetSchedulerState () {
	  index = queue.length = activatedChildren.length = 0;
	  has = {};
	  {
	    circular = {};
	  }
	  waiting = flushing = false;
	}
	
	/**
	 * Flush both queues and run the watchers.
	 */
	function flushSchedulerQueue () {
	  flushing = true;
	  var watcher, id;
	
	  // Sort queue before flush.
	  // This ensures that:
	  // 1. Components are updated from parent to child. (because parent is always
	  //    created before the child)
	  // 2. A component's user watchers are run before its render watcher (because
	  //    user watchers are created before the render watcher)
	  // 3. If a component is destroyed during a parent component's watcher run,
	  //    its watchers can be skipped.
	  queue.sort(function (a, b) { return a.id - b.id; });
	
	  // do not cache length because more watchers might be pushed
	  // as we run existing watchers
	  for (index = 0; index < queue.length; index++) {
	    watcher = queue[index];
	    id = watcher.id;
	    has[id] = null;
	    watcher.run();
	    // in dev build, check and stop circular updates.
	    if ("development" !== 'production' && has[id] != null) {
	      circular[id] = (circular[id] || 0) + 1;
	      if (circular[id] > MAX_UPDATE_COUNT) {
	        warn(
	          'You may have an infinite update loop ' + (
	            watcher.user
	              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
	              : "in a component render function."
	          ),
	          watcher.vm
	        );
	        break
	      }
	    }
	  }
	
	  // keep copies of post queues before resetting state
	  var activatedQueue = activatedChildren.slice();
	  var updatedQueue = queue.slice();
	
	  resetSchedulerState();
	
	  // call component updated and activated hooks
	  callActivatedHooks(activatedQueue);
	  callUpdateHooks(updatedQueue);
	
	  // devtool hook
	  /* istanbul ignore if */
	  if (devtools && config.devtools) {
	    devtools.emit('flush');
	  }
	}
	
	function callUpdateHooks (queue) {
	  var i = queue.length;
	  while (i--) {
	    var watcher = queue[i];
	    var vm = watcher.vm;
	    if (vm._watcher === watcher && vm._isMounted) {
	      callHook(vm, 'updated');
	    }
	  }
	}
	
	/**
	 * Queue a kept-alive component that was activated during patch.
	 * The queue will be processed after the entire tree has been patched.
	 */
	function queueActivatedComponent (vm) {
	  // setting _inactive to false here so that a render function can
	  // rely on checking whether it's in an inactive tree (e.g. router-view)
	  vm._inactive = false;
	  activatedChildren.push(vm);
	}
	
	function callActivatedHooks (queue) {
	  for (var i = 0; i < queue.length; i++) {
	    queue[i]._inactive = true;
	    activateChildComponent(queue[i], true /* true */);
	  }
	}
	
	/**
	 * Push a watcher into the watcher queue.
	 * Jobs with duplicate IDs will be skipped unless it's
	 * pushed when the queue is being flushed.
	 */
	function queueWatcher (watcher) {
	  var id = watcher.id;
	  if (has[id] == null) {
	    has[id] = true;
	    if (!flushing) {
	      queue.push(watcher);
	    } else {
	      // if already flushing, splice the watcher based on its id
	      // if already past its id, it will be run next immediately.
	      var i = queue.length - 1;
	      while (i > index && queue[i].id > watcher.id) {
	        i--;
	      }
	      queue.splice(i + 1, 0, watcher);
	    }
	    // queue the flush
	    if (!waiting) {
	      waiting = true;
	      nextTick(flushSchedulerQueue);
	    }
	  }
	}
	
	/*  */
	
	var uid$2 = 0;
	
	/**
	 * A watcher parses an expression, collects dependencies,
	 * and fires callback when the expression value changes.
	 * This is used for both the $watch() api and directives.
	 */
	var Watcher = function Watcher (
	  vm,
	  expOrFn,
	  cb,
	  options
	) {
	  this.vm = vm;
	  vm._watchers.push(this);
	  // options
	  if (options) {
	    this.deep = !!options.deep;
	    this.user = !!options.user;
	    this.lazy = !!options.lazy;
	    this.sync = !!options.sync;
	  } else {
	    this.deep = this.user = this.lazy = this.sync = false;
	  }
	  this.cb = cb;
	  this.id = ++uid$2; // uid for batching
	  this.active = true;
	  this.dirty = this.lazy; // for lazy watchers
	  this.deps = [];
	  this.newDeps = [];
	  this.depIds = new _Set();
	  this.newDepIds = new _Set();
	  this.expression = expOrFn.toString();
	  // parse expression for getter
	  if (typeof expOrFn === 'function') {
	    this.getter = expOrFn;
	  } else {
	    this.getter = parsePath(expOrFn);
	    if (!this.getter) {
	      this.getter = function () {};
	      "development" !== 'production' && warn(
	        "Failed watching path: \"" + expOrFn + "\" " +
	        'Watcher only accepts simple dot-delimited paths. ' +
	        'For full control, use a function instead.',
	        vm
	      );
	    }
	  }
	  this.value = this.lazy
	    ? undefined
	    : this.get();
	};
	
	/**
	 * Evaluate the getter, and re-collect dependencies.
	 */
	Watcher.prototype.get = function get () {
	  pushTarget(this);
	  var value;
	  var vm = this.vm;
	  if (this.user) {
	    try {
	      value = this.getter.call(vm, vm);
	    } catch (e) {
	      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
	    }
	  } else {
	    value = this.getter.call(vm, vm);
	  }
	  // "touch" every property so they are all tracked as
	  // dependencies for deep watching
	  if (this.deep) {
	    traverse(value);
	  }
	  popTarget();
	  this.cleanupDeps();
	  return value
	};
	
	/**
	 * Add a dependency to this directive.
	 */
	Watcher.prototype.addDep = function addDep (dep) {
	  var id = dep.id;
	  if (!this.newDepIds.has(id)) {
	    this.newDepIds.add(id);
	    this.newDeps.push(dep);
	    if (!this.depIds.has(id)) {
	      dep.addSub(this);
	    }
	  }
	};
	
	/**
	 * Clean up for dependency collection.
	 */
	Watcher.prototype.cleanupDeps = function cleanupDeps () {
	    var this$1 = this;
	
	  var i = this.deps.length;
	  while (i--) {
	    var dep = this$1.deps[i];
	    if (!this$1.newDepIds.has(dep.id)) {
	      dep.removeSub(this$1);
	    }
	  }
	  var tmp = this.depIds;
	  this.depIds = this.newDepIds;
	  this.newDepIds = tmp;
	  this.newDepIds.clear();
	  tmp = this.deps;
	  this.deps = this.newDeps;
	  this.newDeps = tmp;
	  this.newDeps.length = 0;
	};
	
	/**
	 * Subscriber interface.
	 * Will be called when a dependency changes.
	 */
	Watcher.prototype.update = function update () {
	  /* istanbul ignore else */
	  if (this.lazy) {
	    this.dirty = true;
	  } else if (this.sync) {
	    this.run();
	  } else {
	    queueWatcher(this);
	  }
	};
	
	/**
	 * Scheduler job interface.
	 * Will be called by the scheduler.
	 */
	Watcher.prototype.run = function run () {
	  if (this.active) {
	    var value = this.get();
	    if (
	      value !== this.value ||
	      // Deep watchers and watchers on Object/Arrays should fire even
	      // when the value is the same, because the value may
	      // have mutated.
	      isObject(value) ||
	      this.deep
	    ) {
	      // set new value
	      var oldValue = this.value;
	      this.value = value;
	      if (this.user) {
	        try {
	          this.cb.call(this.vm, value, oldValue);
	        } catch (e) {
	          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
	        }
	      } else {
	        this.cb.call(this.vm, value, oldValue);
	      }
	    }
	  }
	};
	
	/**
	 * Evaluate the value of the watcher.
	 * This only gets called for lazy watchers.
	 */
	Watcher.prototype.evaluate = function evaluate () {
	  this.value = this.get();
	  this.dirty = false;
	};
	
	/**
	 * Depend on all deps collected by this watcher.
	 */
	Watcher.prototype.depend = function depend () {
	    var this$1 = this;
	
	  var i = this.deps.length;
	  while (i--) {
	    this$1.deps[i].depend();
	  }
	};
	
	/**
	 * Remove self from all dependencies' subscriber list.
	 */
	Watcher.prototype.teardown = function teardown () {
	    var this$1 = this;
	
	  if (this.active) {
	    // remove self from vm's watcher list
	    // this is a somewhat expensive operation so we skip it
	    // if the vm is being destroyed.
	    if (!this.vm._isBeingDestroyed) {
	      remove(this.vm._watchers, this);
	    }
	    var i = this.deps.length;
	    while (i--) {
	      this$1.deps[i].removeSub(this$1);
	    }
	    this.active = false;
	  }
	};
	
	/**
	 * Recursively traverse an object to evoke all converted
	 * getters, so that every nested property inside the object
	 * is collected as a "deep" dependency.
	 */
	var seenObjects = new _Set();
	function traverse (val) {
	  seenObjects.clear();
	  _traverse(val, seenObjects);
	}
	
	function _traverse (val, seen) {
	  var i, keys;
	  var isA = Array.isArray(val);
	  if ((!isA && !isObject(val)) || !Object.isExtensible(val)) {
	    return
	  }
	  if (val.__ob__) {
	    var depId = val.__ob__.dep.id;
	    if (seen.has(depId)) {
	      return
	    }
	    seen.add(depId);
	  }
	  if (isA) {
	    i = val.length;
	    while (i--) { _traverse(val[i], seen); }
	  } else {
	    keys = Object.keys(val);
	    i = keys.length;
	    while (i--) { _traverse(val[keys[i]], seen); }
	  }
	}
	
	/*  */
	
	var sharedPropertyDefinition = {
	  enumerable: true,
	  configurable: true,
	  get: noop,
	  set: noop
	};
	
	function proxy (target, sourceKey, key) {
	  sharedPropertyDefinition.get = function proxyGetter () {
	    return this[sourceKey][key]
	  };
	  sharedPropertyDefinition.set = function proxySetter (val) {
	    this[sourceKey][key] = val;
	  };
	  Object.defineProperty(target, key, sharedPropertyDefinition);
	}
	
	function initState (vm) {
	  vm._watchers = [];
	  var opts = vm.$options;
	  if (opts.props) { initProps(vm, opts.props); }
	  if (opts.methods) { initMethods(vm, opts.methods); }
	  if (opts.data) {
	    initData(vm);
	  } else {
	    observe(vm._data = {}, true /* asRootData */);
	  }
	  if (opts.computed) { initComputed(vm, opts.computed); }
	  if (opts.watch) { initWatch(vm, opts.watch); }
	}
	
	var isReservedProp = {
	  key: 1,
	  ref: 1,
	  slot: 1
	};
	
	function initProps (vm, propsOptions) {
	  var propsData = vm.$options.propsData || {};
	  var props = vm._props = {};
	  // cache prop keys so that future props updates can iterate using Array
	  // instead of dynamic object key enumeration.
	  var keys = vm.$options._propKeys = [];
	  var isRoot = !vm.$parent;
	  // root instance props should be converted
	  observerState.shouldConvert = isRoot;
	  var loop = function ( key ) {
	    keys.push(key);
	    var value = validateProp(key, propsOptions, propsData, vm);
	    /* istanbul ignore else */
	    {
	      if (isReservedProp[key] || config.isReservedAttr(key)) {
	        warn(
	          ("\"" + key + "\" is a reserved attribute and cannot be used as component prop."),
	          vm
	        );
	      }
	      defineReactive$$1(props, key, value, function () {
	        if (vm.$parent && !observerState.isSettingProps) {
	          warn(
	            "Avoid mutating a prop directly since the value will be " +
	            "overwritten whenever the parent component re-renders. " +
	            "Instead, use a data or computed property based on the prop's " +
	            "value. Prop being mutated: \"" + key + "\"",
	            vm
	          );
	        }
	      });
	    }
	    // static props are already proxied on the component's prototype
	    // during Vue.extend(). We only need to proxy props defined at
	    // instantiation here.
	    if (!(key in vm)) {
	      proxy(vm, "_props", key);
	    }
	  };
	
	  for (var key in propsOptions) loop( key );
	  observerState.shouldConvert = true;
	}
	
	function initData (vm) {
	  var data = vm.$options.data;
	  data = vm._data = typeof data === 'function'
	    ? getData(data, vm)
	    : data || {};
	  if (!isPlainObject(data)) {
	    data = {};
	    "development" !== 'production' && warn(
	      'data functions should return an object:\n' +
	      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
	      vm
	    );
	  }
	  // proxy data on instance
	  var keys = Object.keys(data);
	  var props = vm.$options.props;
	  var i = keys.length;
	  while (i--) {
	    if (props && hasOwn(props, keys[i])) {
	      "development" !== 'production' && warn(
	        "The data property \"" + (keys[i]) + "\" is already declared as a prop. " +
	        "Use prop default value instead.",
	        vm
	      );
	    } else if (!isReserved(keys[i])) {
	      proxy(vm, "_data", keys[i]);
	    }
	  }
	  // observe data
	  observe(data, true /* asRootData */);
	}
	
	function getData (data, vm) {
	  try {
	    return data.call(vm)
	  } catch (e) {
	    handleError(e, vm, "data()");
	    return {}
	  }
	}
	
	var computedWatcherOptions = { lazy: true };
	
	function initComputed (vm, computed) {
	  var watchers = vm._computedWatchers = Object.create(null);
	
	  for (var key in computed) {
	    var userDef = computed[key];
	    var getter = typeof userDef === 'function' ? userDef : userDef.get;
	    {
	      if (getter === undefined) {
	        warn(
	          ("No getter function has been defined for computed property \"" + key + "\"."),
	          vm
	        );
	        getter = noop;
	      }
	    }
	    // create internal watcher for the computed property.
	    watchers[key] = new Watcher(vm, getter, noop, computedWatcherOptions);
	
	    // component-defined computed properties are already defined on the
	    // component prototype. We only need to define computed properties defined
	    // at instantiation here.
	    if (!(key in vm)) {
	      defineComputed(vm, key, userDef);
	    } else {
	      if (key in vm.$data) {
	        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
	      } else if (vm.$options.props && key in vm.$options.props) {
	        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
	      }
	    }
	  }
	}
	
	function defineComputed (target, key, userDef) {
	  if (typeof userDef === 'function') {
	    sharedPropertyDefinition.get = createComputedGetter(key);
	    sharedPropertyDefinition.set = noop;
	  } else {
	    sharedPropertyDefinition.get = userDef.get
	      ? userDef.cache !== false
	        ? createComputedGetter(key)
	        : userDef.get
	      : noop;
	    sharedPropertyDefinition.set = userDef.set
	      ? userDef.set
	      : noop;
	  }
	  Object.defineProperty(target, key, sharedPropertyDefinition);
	}
	
	function createComputedGetter (key) {
	  return function computedGetter () {
	    var watcher = this._computedWatchers && this._computedWatchers[key];
	    if (watcher) {
	      if (watcher.dirty) {
	        watcher.evaluate();
	      }
	      if (Dep.target) {
	        watcher.depend();
	      }
	      return watcher.value
	    }
	  }
	}
	
	function initMethods (vm, methods) {
	  var props = vm.$options.props;
	  for (var key in methods) {
	    vm[key] = methods[key] == null ? noop : bind(methods[key], vm);
	    {
	      if (methods[key] == null) {
	        warn(
	          "method \"" + key + "\" has an undefined value in the component definition. " +
	          "Did you reference the function correctly?",
	          vm
	        );
	      }
	      if (props && hasOwn(props, key)) {
	        warn(
	          ("method \"" + key + "\" has already been defined as a prop."),
	          vm
	        );
	      }
	    }
	  }
	}
	
	function initWatch (vm, watch) {
	  for (var key in watch) {
	    var handler = watch[key];
	    if (Array.isArray(handler)) {
	      for (var i = 0; i < handler.length; i++) {
	        createWatcher(vm, key, handler[i]);
	      }
	    } else {
	      createWatcher(vm, key, handler);
	    }
	  }
	}
	
	function createWatcher (vm, key, handler) {
	  var options;
	  if (isPlainObject(handler)) {
	    options = handler;
	    handler = handler.handler;
	  }
	  if (typeof handler === 'string') {
	    handler = vm[handler];
	  }
	  vm.$watch(key, handler, options);
	}
	
	function stateMixin (Vue) {
	  // flow somehow has problems with directly declared definition object
	  // when using Object.defineProperty, so we have to procedurally build up
	  // the object here.
	  var dataDef = {};
	  dataDef.get = function () { return this._data };
	  var propsDef = {};
	  propsDef.get = function () { return this._props };
	  {
	    dataDef.set = function (newData) {
	      warn(
	        'Avoid replacing instance root $data. ' +
	        'Use nested data properties instead.',
	        this
	      );
	    };
	    propsDef.set = function () {
	      warn("$props is readonly.", this);
	    };
	  }
	  Object.defineProperty(Vue.prototype, '$data', dataDef);
	  Object.defineProperty(Vue.prototype, '$props', propsDef);
	
	  Vue.prototype.$set = set;
	  Vue.prototype.$delete = del;
	
	  Vue.prototype.$watch = function (
	    expOrFn,
	    cb,
	    options
	  ) {
	    var vm = this;
	    options = options || {};
	    options.user = true;
	    var watcher = new Watcher(vm, expOrFn, cb, options);
	    if (options.immediate) {
	      cb.call(vm, watcher.value);
	    }
	    return function unwatchFn () {
	      watcher.teardown();
	    }
	  };
	}
	
	/*  */
	
	function initProvide (vm) {
	  var provide = vm.$options.provide;
	  if (provide) {
	    vm._provided = typeof provide === 'function'
	      ? provide.call(vm)
	      : provide;
	  }
	}
	
	function initInjections (vm) {
	  var result = resolveInject(vm.$options.inject, vm);
	  if (result) {
	    Object.keys(result).forEach(function (key) {
	      /* istanbul ignore else */
	      {
	        defineReactive$$1(vm, key, result[key], function () {
	          warn(
	            "Avoid mutating an injected value directly since the changes will be " +
	            "overwritten whenever the provided component re-renders. " +
	            "injection being mutated: \"" + key + "\"",
	            vm
	          );
	        });
	      }
	    });
	  }
	}
	
	function resolveInject (inject, vm) {
	  if (inject) {
	    // inject is :any because flow is not smart enough to figure out cached
	    // isArray here
	    var isArray = Array.isArray(inject);
	    var result = Object.create(null);
	    var keys = isArray
	      ? inject
	      : hasSymbol
	        ? Reflect.ownKeys(inject)
	        : Object.keys(inject);
	
	    for (var i = 0; i < keys.length; i++) {
	      var key = keys[i];
	      var provideKey = isArray ? key : inject[key];
	      var source = vm;
	      while (source) {
	        if (source._provided && provideKey in source._provided) {
	          result[key] = source._provided[provideKey];
	          break
	        }
	        source = source.$parent;
	      }
	    }
	    return result
	  }
	}
	
	/*  */
	
	function createFunctionalComponent (
	  Ctor,
	  propsData,
	  data,
	  context,
	  children
	) {
	  var props = {};
	  var propOptions = Ctor.options.props;
	  if (isDef(propOptions)) {
	    for (var key in propOptions) {
	      props[key] = validateProp(key, propOptions, propsData || {});
	    }
	  } else {
	    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
	    if (isDef(data.props)) { mergeProps(props, data.props); }
	  }
	  // ensure the createElement function in functional components
	  // gets a unique context - this is necessary for correct named slot check
	  var _context = Object.create(context);
	  var h = function (a, b, c, d) { return createElement(_context, a, b, c, d, true); };
	  var vnode = Ctor.options.render.call(null, h, {
	    data: data,
	    props: props,
	    children: children,
	    parent: context,
	    listeners: data.on || {},
	    injections: resolveInject(Ctor.options.inject, context),
	    slots: function () { return resolveSlots(children, context); }
	  });
	  if (vnode instanceof VNode) {
	    vnode.functionalContext = context;
	    vnode.functionalOptions = Ctor.options;
	    if (data.slot) {
	      (vnode.data || (vnode.data = {})).slot = data.slot;
	    }
	  }
	  return vnode
	}
	
	function mergeProps (to, from) {
	  for (var key in from) {
	    to[camelize(key)] = from[key];
	  }
	}
	
	/*  */
	
	// hooks to be invoked on component VNodes during patch
	var componentVNodeHooks = {
	  init: function init (
	    vnode,
	    hydrating,
	    parentElm,
	    refElm
	  ) {
	    if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
	      var child = vnode.componentInstance = createComponentInstanceForVnode(
	        vnode,
	        activeInstance,
	        parentElm,
	        refElm
	      );
	      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
	    } else if (vnode.data.keepAlive) {
	      // kept-alive components, treat as a patch
	      var mountedNode = vnode; // work around flow
	      componentVNodeHooks.prepatch(mountedNode, mountedNode);
	    }
	  },
	
	  prepatch: function prepatch (oldVnode, vnode) {
	    var options = vnode.componentOptions;
	    var child = vnode.componentInstance = oldVnode.componentInstance;
	    updateChildComponent(
	      child,
	      options.propsData, // updated props
	      options.listeners, // updated listeners
	      vnode, // new parent vnode
	      options.children // new children
	    );
	  },
	
	  insert: function insert (vnode) {
	    var context = vnode.context;
	    var componentInstance = vnode.componentInstance;
	    if (!componentInstance._isMounted) {
	      componentInstance._isMounted = true;
	      callHook(componentInstance, 'mounted');
	    }
	    if (vnode.data.keepAlive) {
	      if (context._isMounted) {
	        // vue-router#1212
	        // During updates, a kept-alive component's child components may
	        // change, so directly walking the tree here may call activated hooks
	        // on incorrect children. Instead we push them into a queue which will
	        // be processed after the whole patch process ended.
	        queueActivatedComponent(componentInstance);
	      } else {
	        activateChildComponent(componentInstance, true /* direct */);
	      }
	    }
	  },
	
	  destroy: function destroy (vnode) {
	    var componentInstance = vnode.componentInstance;
	    if (!componentInstance._isDestroyed) {
	      if (!vnode.data.keepAlive) {
	        componentInstance.$destroy();
	      } else {
	        deactivateChildComponent(componentInstance, true /* direct */);
	      }
	    }
	  }
	};
	
	var hooksToMerge = Object.keys(componentVNodeHooks);
	
	function createComponent (
	  Ctor,
	  data,
	  context,
	  children,
	  tag
	) {
	  if (isUndef(Ctor)) {
	    return
	  }
	
	  var baseCtor = context.$options._base;
	
	  // plain options object: turn it into a constructor
	  if (isObject(Ctor)) {
	    Ctor = baseCtor.extend(Ctor);
	  }
	
	  // if at this stage it's not a constructor or an async component factory,
	  // reject.
	  if (typeof Ctor !== 'function') {
	    {
	      warn(("Invalid Component definition: " + (String(Ctor))), context);
	    }
	    return
	  }
	
	  // async component
	  if (isUndef(Ctor.cid)) {
	    Ctor = resolveAsyncComponent(Ctor, baseCtor, context);
	    if (Ctor === undefined) {
	      // return nothing if this is indeed an async component
	      // wait for the callback to trigger parent update.
	      return
	    }
	  }
	
	  // resolve constructor options in case global mixins are applied after
	  // component constructor creation
	  resolveConstructorOptions(Ctor);
	
	  data = data || {};
	
	  // transform component v-model data into props & events
	  if (isDef(data.model)) {
	    transformModel(Ctor.options, data);
	  }
	
	  // extract props
	  var propsData = extractPropsFromVNodeData(data, Ctor, tag);
	
	  // functional component
	  if (isTrue(Ctor.options.functional)) {
	    return createFunctionalComponent(Ctor, propsData, data, context, children)
	  }
	
	  // extract listeners, since these needs to be treated as
	  // child component listeners instead of DOM listeners
	  var listeners = data.on;
	  // replace with listeners with .native modifier
	  data.on = data.nativeOn;
	
	  if (isTrue(Ctor.options.abstract)) {
	    // abstract components do not keep anything
	    // other than props & listeners
	    data = {};
	  }
	
	  // merge component management hooks onto the placeholder node
	  mergeHooks(data);
	
	  // return a placeholder vnode
	  var name = Ctor.options.name || tag;
	  var vnode = new VNode(
	    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
	    data, undefined, undefined, undefined, context,
	    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children }
	  );
	  return vnode
	}
	
	function createComponentInstanceForVnode (
	  vnode, // we know it's MountedComponentVNode but flow doesn't
	  parent, // activeInstance in lifecycle state
	  parentElm,
	  refElm
	) {
	  var vnodeComponentOptions = vnode.componentOptions;
	  var options = {
	    _isComponent: true,
	    parent: parent,
	    propsData: vnodeComponentOptions.propsData,
	    _componentTag: vnodeComponentOptions.tag,
	    _parentVnode: vnode,
	    _parentListeners: vnodeComponentOptions.listeners,
	    _renderChildren: vnodeComponentOptions.children,
	    _parentElm: parentElm || null,
	    _refElm: refElm || null
	  };
	  // check inline-template render functions
	  var inlineTemplate = vnode.data.inlineTemplate;
	  if (isDef(inlineTemplate)) {
	    options.render = inlineTemplate.render;
	    options.staticRenderFns = inlineTemplate.staticRenderFns;
	  }
	  return new vnodeComponentOptions.Ctor(options)
	}
	
	function mergeHooks (data) {
	  if (!data.hook) {
	    data.hook = {};
	  }
	  for (var i = 0; i < hooksToMerge.length; i++) {
	    var key = hooksToMerge[i];
	    var fromParent = data.hook[key];
	    var ours = componentVNodeHooks[key];
	    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
	  }
	}
	
	function mergeHook$1 (one, two) {
	  return function (a, b, c, d) {
	    one(a, b, c, d);
	    two(a, b, c, d);
	  }
	}
	
	// transform component v-model info (value and callback) into
	// prop and event handler respectively.
	function transformModel (options, data) {
	  var prop = (options.model && options.model.prop) || 'value';
	  var event = (options.model && options.model.event) || 'input';(data.props || (data.props = {}))[prop] = data.model.value;
	  var on = data.on || (data.on = {});
	  if (isDef(on[event])) {
	    on[event] = [data.model.callback].concat(on[event]);
	  } else {
	    on[event] = data.model.callback;
	  }
	}
	
	/*  */
	
	var SIMPLE_NORMALIZE = 1;
	var ALWAYS_NORMALIZE = 2;
	
	// wrapper function for providing a more flexible interface
	// without getting yelled at by flow
	function createElement (
	  context,
	  tag,
	  data,
	  children,
	  normalizationType,
	  alwaysNormalize
	) {
	  if (Array.isArray(data) || isPrimitive(data)) {
	    normalizationType = children;
	    children = data;
	    data = undefined;
	  }
	  if (isTrue(alwaysNormalize)) {
	    normalizationType = ALWAYS_NORMALIZE;
	  }
	  return _createElement(context, tag, data, children, normalizationType)
	}
	
	function _createElement (
	  context,
	  tag,
	  data,
	  children,
	  normalizationType
	) {
	  if (isDef(data) && isDef((data).__ob__)) {
	    "development" !== 'production' && warn(
	      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
	      'Always create fresh vnode data objects in each render!',
	      context
	    );
	    return createEmptyVNode()
	  }
	  if (!tag) {
	    // in case of component :is set to falsy value
	    return createEmptyVNode()
	  }
	  // support single function children as default scoped slot
	  if (Array.isArray(children) &&
	    typeof children[0] === 'function'
	  ) {
	    data = data || {};
	    data.scopedSlots = { default: children[0] };
	    children.length = 0;
	  }
	  if (normalizationType === ALWAYS_NORMALIZE) {
	    children = normalizeChildren(children);
	  } else if (normalizationType === SIMPLE_NORMALIZE) {
	    children = simpleNormalizeChildren(children);
	  }
	  var vnode, ns;
	  if (typeof tag === 'string') {
	    var Ctor;
	    ns = config.getTagNamespace(tag);
	    if (config.isReservedTag(tag)) {
	      // platform built-in elements
	      vnode = new VNode(
	        config.parsePlatformTagName(tag), data, children,
	        undefined, undefined, context
	      );
	    } else if (isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
	      // component
	      vnode = createComponent(Ctor, data, context, children, tag);
	    } else {
	      // unknown or unlisted namespaced elements
	      // check at runtime because it may get assigned a namespace when its
	      // parent normalizes children
	      vnode = new VNode(
	        tag, data, children,
	        undefined, undefined, context
	      );
	    }
	  } else {
	    // direct component options / constructor
	    vnode = createComponent(tag, data, context, children);
	  }
	  if (isDef(vnode)) {
	    if (ns) { applyNS(vnode, ns); }
	    return vnode
	  } else {
	    return createEmptyVNode()
	  }
	}
	
	function applyNS (vnode, ns) {
	  vnode.ns = ns;
	  if (vnode.tag === 'foreignObject') {
	    // use default namespace inside foreignObject
	    return
	  }
	  if (isDef(vnode.children)) {
	    for (var i = 0, l = vnode.children.length; i < l; i++) {
	      var child = vnode.children[i];
	      if (isDef(child.tag) && isUndef(child.ns)) {
	        applyNS(child, ns);
	      }
	    }
	  }
	}
	
	/*  */
	
	/**
	 * Runtime helper for rendering v-for lists.
	 */
	function renderList (
	  val,
	  render
	) {
	  var ret, i, l, keys, key;
	  if (Array.isArray(val) || typeof val === 'string') {
	    ret = new Array(val.length);
	    for (i = 0, l = val.length; i < l; i++) {
	      ret[i] = render(val[i], i);
	    }
	  } else if (typeof val === 'number') {
	    ret = new Array(val);
	    for (i = 0; i < val; i++) {
	      ret[i] = render(i + 1, i);
	    }
	  } else if (isObject(val)) {
	    keys = Object.keys(val);
	    ret = new Array(keys.length);
	    for (i = 0, l = keys.length; i < l; i++) {
	      key = keys[i];
	      ret[i] = render(val[key], key, i);
	    }
	  }
	  if (isDef(ret)) {
	    (ret)._isVList = true;
	  }
	  return ret
	}
	
	/*  */
	
	/**
	 * Runtime helper for rendering <slot>
	 */
	function renderSlot (
	  name,
	  fallback,
	  props,
	  bindObject
	) {
	  var scopedSlotFn = this.$scopedSlots[name];
	  if (scopedSlotFn) { // scoped slot
	    props = props || {};
	    if (bindObject) {
	      extend(props, bindObject);
	    }
	    return scopedSlotFn(props) || fallback
	  } else {
	    var slotNodes = this.$slots[name];
	    // warn duplicate slot usage
	    if (slotNodes && "development" !== 'production') {
	      slotNodes._rendered && warn(
	        "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
	        "- this will likely cause render errors.",
	        this
	      );
	      slotNodes._rendered = true;
	    }
	    return slotNodes || fallback
	  }
	}
	
	/*  */
	
	/**
	 * Runtime helper for resolving filters
	 */
	function resolveFilter (id) {
	  return resolveAsset(this.$options, 'filters', id, true) || identity
	}
	
	/*  */
	
	/**
	 * Runtime helper for checking keyCodes from config.
	 */
	function checkKeyCodes (
	  eventKeyCode,
	  key,
	  builtInAlias
	) {
	  var keyCodes = config.keyCodes[key] || builtInAlias;
	  if (Array.isArray(keyCodes)) {
	    return keyCodes.indexOf(eventKeyCode) === -1
	  } else {
	    return keyCodes !== eventKeyCode
	  }
	}
	
	/*  */
	
	/**
	 * Runtime helper for merging v-bind="object" into a VNode's data.
	 */
	function bindObjectProps (
	  data,
	  tag,
	  value,
	  asProp
	) {
	  if (value) {
	    if (!isObject(value)) {
	      "development" !== 'production' && warn(
	        'v-bind without argument expects an Object or Array value',
	        this
	      );
	    } else {
	      if (Array.isArray(value)) {
	        value = toObject(value);
	      }
	      var hash;
	      for (var key in value) {
	        if (key === 'class' || key === 'style') {
	          hash = data;
	        } else {
	          var type = data.attrs && data.attrs.type;
	          hash = asProp || config.mustUseProp(tag, type, key)
	            ? data.domProps || (data.domProps = {})
	            : data.attrs || (data.attrs = {});
	        }
	        if (!(key in hash)) {
	          hash[key] = value[key];
	        }
	      }
	    }
	  }
	  return data
	}
	
	/*  */
	
	/**
	 * Runtime helper for rendering static trees.
	 */
	function renderStatic (
	  index,
	  isInFor
	) {
	  var tree = this._staticTrees[index];
	  // if has already-rendered static tree and not inside v-for,
	  // we can reuse the same tree by doing a shallow clone.
	  if (tree && !isInFor) {
	    return Array.isArray(tree)
	      ? cloneVNodes(tree)
	      : cloneVNode(tree)
	  }
	  // otherwise, render a fresh tree.
	  tree = this._staticTrees[index] =
	    this.$options.staticRenderFns[index].call(this._renderProxy);
	  markStatic(tree, ("__static__" + index), false);
	  return tree
	}
	
	/**
	 * Runtime helper for v-once.
	 * Effectively it means marking the node as static with a unique key.
	 */
	function markOnce (
	  tree,
	  index,
	  key
	) {
	  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
	  return tree
	}
	
	function markStatic (
	  tree,
	  key,
	  isOnce
	) {
	  if (Array.isArray(tree)) {
	    for (var i = 0; i < tree.length; i++) {
	      if (tree[i] && typeof tree[i] !== 'string') {
	        markStaticNode(tree[i], (key + "_" + i), isOnce);
	      }
	    }
	  } else {
	    markStaticNode(tree, key, isOnce);
	  }
	}
	
	function markStaticNode (node, key, isOnce) {
	  node.isStatic = true;
	  node.key = key;
	  node.isOnce = isOnce;
	}
	
	/*  */
	
	function initRender (vm) {
	  vm._vnode = null; // the root of the child tree
	  vm._staticTrees = null;
	  var parentVnode = vm.$vnode = vm.$options._parentVnode; // the placeholder node in parent tree
	  var renderContext = parentVnode && parentVnode.context;
	  vm.$slots = resolveSlots(vm.$options._renderChildren, renderContext);
	  vm.$scopedSlots = emptyObject;
	  // bind the createElement fn to this instance
	  // so that we get proper render context inside it.
	  // args order: tag, data, children, normalizationType, alwaysNormalize
	  // internal version is used by render functions compiled from templates
	  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
	  // normalization is always applied for the public version, used in
	  // user-written render functions.
	  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };
	}
	
	function renderMixin (Vue) {
	  Vue.prototype.$nextTick = function (fn) {
	    return nextTick(fn, this)
	  };
	
	  Vue.prototype._render = function () {
	    var vm = this;
	    var ref = vm.$options;
	    var render = ref.render;
	    var staticRenderFns = ref.staticRenderFns;
	    var _parentVnode = ref._parentVnode;
	
	    if (vm._isMounted) {
	      // clone slot nodes on re-renders
	      for (var key in vm.$slots) {
	        vm.$slots[key] = cloneVNodes(vm.$slots[key]);
	      }
	    }
	
	    vm.$scopedSlots = (_parentVnode && _parentVnode.data.scopedSlots) || emptyObject;
	
	    if (staticRenderFns && !vm._staticTrees) {
	      vm._staticTrees = [];
	    }
	    // set parent vnode. this allows render functions to have access
	    // to the data on the placeholder node.
	    vm.$vnode = _parentVnode;
	    // render self
	    var vnode;
	    try {
	      vnode = render.call(vm._renderProxy, vm.$createElement);
	    } catch (e) {
	      handleError(e, vm, "render function");
	      // return error render result,
	      // or previous vnode to prevent render error causing blank component
	      /* istanbul ignore else */
	      {
	        vnode = vm.$options.renderError
	          ? vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e)
	          : vm._vnode;
	      }
	    }
	    // return empty vnode in case the render function errored out
	    if (!(vnode instanceof VNode)) {
	      if ("development" !== 'production' && Array.isArray(vnode)) {
	        warn(
	          'Multiple root nodes returned from render function. Render function ' +
	          'should return a single root node.',
	          vm
	        );
	      }
	      vnode = createEmptyVNode();
	    }
	    // set parent
	    vnode.parent = _parentVnode;
	    return vnode
	  };
	
	  // internal render helpers.
	  // these are exposed on the instance prototype to reduce generated render
	  // code size.
	  Vue.prototype._o = markOnce;
	  Vue.prototype._n = toNumber;
	  Vue.prototype._s = toString;
	  Vue.prototype._l = renderList;
	  Vue.prototype._t = renderSlot;
	  Vue.prototype._q = looseEqual;
	  Vue.prototype._i = looseIndexOf;
	  Vue.prototype._m = renderStatic;
	  Vue.prototype._f = resolveFilter;
	  Vue.prototype._k = checkKeyCodes;
	  Vue.prototype._b = bindObjectProps;
	  Vue.prototype._v = createTextVNode;
	  Vue.prototype._e = createEmptyVNode;
	  Vue.prototype._u = resolveScopedSlots;
	}
	
	/*  */
	
	var uid$1 = 0;
	
	function initMixin (Vue) {
	  Vue.prototype._init = function (options) {
	    var vm = this;
	    // a uid
	    vm._uid = uid$1++;
	
	    var startTag, endTag;
	    /* istanbul ignore if */
	    if ("development" !== 'production' && config.performance && mark) {
	      startTag = "vue-perf-init:" + (vm._uid);
	      endTag = "vue-perf-end:" + (vm._uid);
	      mark(startTag);
	    }
	
	    // a flag to avoid this being observed
	    vm._isVue = true;
	    // merge options
	    if (options && options._isComponent) {
	      // optimize internal component instantiation
	      // since dynamic options merging is pretty slow, and none of the
	      // internal component options needs special treatment.
	      initInternalComponent(vm, options);
	    } else {
	      vm.$options = mergeOptions(
	        resolveConstructorOptions(vm.constructor),
	        options || {},
	        vm
	      );
	    }
	    /* istanbul ignore else */
	    {
	      initProxy(vm);
	    }
	    // expose real self
	    vm._self = vm;
	    initLifecycle(vm);
	    initEvents(vm);
	    initRender(vm);
	    callHook(vm, 'beforeCreate');
	    initInjections(vm); // resolve injections before data/props
	    initState(vm);
	    initProvide(vm); // resolve provide after data/props
	    callHook(vm, 'created');
	
	    /* istanbul ignore if */
	    if ("development" !== 'production' && config.performance && mark) {
	      vm._name = formatComponentName(vm, false);
	      mark(endTag);
	      measure(((vm._name) + " init"), startTag, endTag);
	    }
	
	    if (vm.$options.el) {
	      vm.$mount(vm.$options.el);
	    }
	  };
	}
	
	function initInternalComponent (vm, options) {
	  var opts = vm.$options = Object.create(vm.constructor.options);
	  // doing this because it's faster than dynamic enumeration.
	  opts.parent = options.parent;
	  opts.propsData = options.propsData;
	  opts._parentVnode = options._parentVnode;
	  opts._parentListeners = options._parentListeners;
	  opts._renderChildren = options._renderChildren;
	  opts._componentTag = options._componentTag;
	  opts._parentElm = options._parentElm;
	  opts._refElm = options._refElm;
	  if (options.render) {
	    opts.render = options.render;
	    opts.staticRenderFns = options.staticRenderFns;
	  }
	}
	
	function resolveConstructorOptions (Ctor) {
	  var options = Ctor.options;
	  if (Ctor.super) {
	    var superOptions = resolveConstructorOptions(Ctor.super);
	    var cachedSuperOptions = Ctor.superOptions;
	    if (superOptions !== cachedSuperOptions) {
	      // super option changed,
	      // need to resolve new options.
	      Ctor.superOptions = superOptions;
	      // check if there are any late-modified/attached options (#4976)
	      var modifiedOptions = resolveModifiedOptions(Ctor);
	      // update base extend options
	      if (modifiedOptions) {
	        extend(Ctor.extendOptions, modifiedOptions);
	      }
	      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
	      if (options.name) {
	        options.components[options.name] = Ctor;
	      }
	    }
	  }
	  return options
	}
	
	function resolveModifiedOptions (Ctor) {
	  var modified;
	  var latest = Ctor.options;
	  var extended = Ctor.extendOptions;
	  var sealed = Ctor.sealedOptions;
	  for (var key in latest) {
	    if (latest[key] !== sealed[key]) {
	      if (!modified) { modified = {}; }
	      modified[key] = dedupe(latest[key], extended[key], sealed[key]);
	    }
	  }
	  return modified
	}
	
	function dedupe (latest, extended, sealed) {
	  // compare latest and sealed to ensure lifecycle hooks won't be duplicated
	  // between merges
	  if (Array.isArray(latest)) {
	    var res = [];
	    sealed = Array.isArray(sealed) ? sealed : [sealed];
	    extended = Array.isArray(extended) ? extended : [extended];
	    for (var i = 0; i < latest.length; i++) {
	      // push original options and not sealed options to exclude duplicated options
	      if (extended.indexOf(latest[i]) >= 0 || sealed.indexOf(latest[i]) < 0) {
	        res.push(latest[i]);
	      }
	    }
	    return res
	  } else {
	    return latest
	  }
	}
	
	function Vue$3 (options) {
	  if ("development" !== 'production' &&
	    !(this instanceof Vue$3)
	  ) {
	    warn('Vue is a constructor and should be called with the `new` keyword');
	  }
	  this._init(options);
	}
	
	initMixin(Vue$3);
	stateMixin(Vue$3);
	eventsMixin(Vue$3);
	lifecycleMixin(Vue$3);
	renderMixin(Vue$3);
	
	/*  */
	
	function initUse (Vue) {
	  Vue.use = function (plugin) {
	    /* istanbul ignore if */
	    if (plugin.installed) {
	      return this
	    }
	    // additional parameters
	    var args = toArray(arguments, 1);
	    args.unshift(this);
	    if (typeof plugin.install === 'function') {
	      plugin.install.apply(plugin, args);
	    } else if (typeof plugin === 'function') {
	      plugin.apply(null, args);
	    }
	    plugin.installed = true;
	    return this
	  };
	}
	
	/*  */
	
	function initMixin$1 (Vue) {
	  Vue.mixin = function (mixin) {
	    this.options = mergeOptions(this.options, mixin);
	    return this
	  };
	}
	
	/*  */
	
	function initExtend (Vue) {
	  /**
	   * Each instance constructor, including Vue, has a unique
	   * cid. This enables us to create wrapped "child
	   * constructors" for prototypal inheritance and cache them.
	   */
	  Vue.cid = 0;
	  var cid = 1;
	
	  /**
	   * Class inheritance
	   */
	  Vue.extend = function (extendOptions) {
	    extendOptions = extendOptions || {};
	    var Super = this;
	    var SuperId = Super.cid;
	    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
	    if (cachedCtors[SuperId]) {
	      return cachedCtors[SuperId]
	    }
	
	    var name = extendOptions.name || Super.options.name;
	    {
	      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
	        warn(
	          'Invalid component name: "' + name + '". Component names ' +
	          'can only contain alphanumeric characters and the hyphen, ' +
	          'and must start with a letter.'
	        );
	      }
	    }
	
	    var Sub = function VueComponent (options) {
	      this._init(options);
	    };
	    Sub.prototype = Object.create(Super.prototype);
	    Sub.prototype.constructor = Sub;
	    Sub.cid = cid++;
	    Sub.options = mergeOptions(
	      Super.options,
	      extendOptions
	    );
	    Sub['super'] = Super;
	
	    // For props and computed properties, we define the proxy getters on
	    // the Vue instances at extension time, on the extended prototype. This
	    // avoids Object.defineProperty calls for each instance created.
	    if (Sub.options.props) {
	      initProps$1(Sub);
	    }
	    if (Sub.options.computed) {
	      initComputed$1(Sub);
	    }
	
	    // allow further extension/mixin/plugin usage
	    Sub.extend = Super.extend;
	    Sub.mixin = Super.mixin;
	    Sub.use = Super.use;
	
	    // create asset registers, so extended classes
	    // can have their private assets too.
	    ASSET_TYPES.forEach(function (type) {
	      Sub[type] = Super[type];
	    });
	    // enable recursive self-lookup
	    if (name) {
	      Sub.options.components[name] = Sub;
	    }
	
	    // keep a reference to the super options at extension time.
	    // later at instantiation we can check if Super's options have
	    // been updated.
	    Sub.superOptions = Super.options;
	    Sub.extendOptions = extendOptions;
	    Sub.sealedOptions = extend({}, Sub.options);
	
	    // cache constructor
	    cachedCtors[SuperId] = Sub;
	    return Sub
	  };
	}
	
	function initProps$1 (Comp) {
	  var props = Comp.options.props;
	  for (var key in props) {
	    proxy(Comp.prototype, "_props", key);
	  }
	}
	
	function initComputed$1 (Comp) {
	  var computed = Comp.options.computed;
	  for (var key in computed) {
	    defineComputed(Comp.prototype, key, computed[key]);
	  }
	}
	
	/*  */
	
	function initAssetRegisters (Vue) {
	  /**
	   * Create asset registration methods.
	   */
	  ASSET_TYPES.forEach(function (type) {
	    Vue[type] = function (
	      id,
	      definition
	    ) {
	      if (!definition) {
	        return this.options[type + 's'][id]
	      } else {
	        /* istanbul ignore if */
	        {
	          if (type === 'component' && config.isReservedTag(id)) {
	            warn(
	              'Do not use built-in or reserved HTML elements as component ' +
	              'id: ' + id
	            );
	          }
	        }
	        if (type === 'component' && isPlainObject(definition)) {
	          definition.name = definition.name || id;
	          definition = this.options._base.extend(definition);
	        }
	        if (type === 'directive' && typeof definition === 'function') {
	          definition = { bind: definition, update: definition };
	        }
	        this.options[type + 's'][id] = definition;
	        return definition
	      }
	    };
	  });
	}
	
	/*  */
	
	var patternTypes = [String, RegExp];
	
	function getComponentName (opts) {
	  return opts && (opts.Ctor.options.name || opts.tag)
	}
	
	function matches (pattern, name) {
	  if (typeof pattern === 'string') {
	    return pattern.split(',').indexOf(name) > -1
	  } else if (isRegExp(pattern)) {
	    return pattern.test(name)
	  }
	  /* istanbul ignore next */
	  return false
	}
	
	function pruneCache (cache, current, filter) {
	  for (var key in cache) {
	    var cachedNode = cache[key];
	    if (cachedNode) {
	      var name = getComponentName(cachedNode.componentOptions);
	      if (name && !filter(name)) {
	        if (cachedNode !== current) {
	          pruneCacheEntry(cachedNode);
	        }
	        cache[key] = null;
	      }
	    }
	  }
	}
	
	function pruneCacheEntry (vnode) {
	  if (vnode) {
	    vnode.componentInstance.$destroy();
	  }
	}
	
	var KeepAlive = {
	  name: 'keep-alive',
	  abstract: true,
	
	  props: {
	    include: patternTypes,
	    exclude: patternTypes
	  },
	
	  created: function created () {
	    this.cache = Object.create(null);
	  },
	
	  destroyed: function destroyed () {
	    var this$1 = this;
	
	    for (var key in this$1.cache) {
	      pruneCacheEntry(this$1.cache[key]);
	    }
	  },
	
	  watch: {
	    include: function include (val) {
	      pruneCache(this.cache, this._vnode, function (name) { return matches(val, name); });
	    },
	    exclude: function exclude (val) {
	      pruneCache(this.cache, this._vnode, function (name) { return !matches(val, name); });
	    }
	  },
	
	  render: function render () {
	    var vnode = getFirstComponentChild(this.$slots.default);
	    var componentOptions = vnode && vnode.componentOptions;
	    if (componentOptions) {
	      // check pattern
	      var name = getComponentName(componentOptions);
	      if (name && (
	        (this.include && !matches(this.include, name)) ||
	        (this.exclude && matches(this.exclude, name))
	      )) {
	        return vnode
	      }
	      var key = vnode.key == null
	        // same constructor may get registered as different local components
	        // so cid alone is not enough (#3269)
	        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
	        : vnode.key;
	      if (this.cache[key]) {
	        vnode.componentInstance = this.cache[key].componentInstance;
	      } else {
	        this.cache[key] = vnode;
	      }
	      vnode.data.keepAlive = true;
	    }
	    return vnode
	  }
	};
	
	var builtInComponents = {
	  KeepAlive: KeepAlive
	};
	
	/*  */
	
	function initGlobalAPI (Vue) {
	  // config
	  var configDef = {};
	  configDef.get = function () { return config; };
	  {
	    configDef.set = function () {
	      warn(
	        'Do not replace the Vue.config object, set individual fields instead.'
	      );
	    };
	  }
	  Object.defineProperty(Vue, 'config', configDef);
	
	  // exposed util methods.
	  // NOTE: these are not considered part of the public API - avoid relying on
	  // them unless you are aware of the risk.
	  Vue.util = {
	    warn: warn,
	    extend: extend,
	    mergeOptions: mergeOptions,
	    defineReactive: defineReactive$$1
	  };
	
	  Vue.set = set;
	  Vue.delete = del;
	  Vue.nextTick = nextTick;
	
	  Vue.options = Object.create(null);
	  ASSET_TYPES.forEach(function (type) {
	    Vue.options[type + 's'] = Object.create(null);
	  });
	
	  // this is used to identify the "base" constructor to extend all plain-object
	  // components with in Weex's multi-instance scenarios.
	  Vue.options._base = Vue;
	
	  extend(Vue.options.components, builtInComponents);
	
	  initUse(Vue);
	  initMixin$1(Vue);
	  initExtend(Vue);
	  initAssetRegisters(Vue);
	}
	
	initGlobalAPI(Vue$3);
	
	Object.defineProperty(Vue$3.prototype, '$isServer', {
	  get: isServerRendering
	});
	
	Object.defineProperty(Vue$3.prototype, '$ssrContext', {
	  get: function get () {
	    /* istanbul ignore next */
	    return this.$vnode.ssrContext
	  }
	});
	
	Vue$3.version = '2.3.3';
	
	/*  */
	
	// these are reserved for web because they are directly compiled away
	// during template compilation
	var isReservedAttr = makeMap('style,class');
	
	// attributes that should be using props for binding
	var acceptValue = makeMap('input,textarea,option,select');
	var mustUseProp = function (tag, type, attr) {
	  return (
	    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
	    (attr === 'selected' && tag === 'option') ||
	    (attr === 'checked' && tag === 'input') ||
	    (attr === 'muted' && tag === 'video')
	  )
	};
	
	var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');
	
	var isBooleanAttr = makeMap(
	  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
	  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
	  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
	  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
	  'required,reversed,scoped,seamless,selected,sortable,translate,' +
	  'truespeed,typemustmatch,visible'
	);
	
	var xlinkNS = 'http://www.w3.org/1999/xlink';
	
	var isXlink = function (name) {
	  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
	};
	
	var getXlinkProp = function (name) {
	  return isXlink(name) ? name.slice(6, name.length) : ''
	};
	
	var isFalsyAttrValue = function (val) {
	  return val == null || val === false
	};
	
	/*  */
	
	function genClassForVnode (vnode) {
	  var data = vnode.data;
	  var parentNode = vnode;
	  var childNode = vnode;
	  while (isDef(childNode.componentInstance)) {
	    childNode = childNode.componentInstance._vnode;
	    if (childNode.data) {
	      data = mergeClassData(childNode.data, data);
	    }
	  }
	  while (isDef(parentNode = parentNode.parent)) {
	    if (parentNode.data) {
	      data = mergeClassData(data, parentNode.data);
	    }
	  }
	  return genClassFromData(data)
	}
	
	function mergeClassData (child, parent) {
	  return {
	    staticClass: concat(child.staticClass, parent.staticClass),
	    class: isDef(child.class)
	      ? [child.class, parent.class]
	      : parent.class
	  }
	}
	
	function genClassFromData (data) {
	  var dynamicClass = data.class;
	  var staticClass = data.staticClass;
	  if (isDef(staticClass) || isDef(dynamicClass)) {
	    return concat(staticClass, stringifyClass(dynamicClass))
	  }
	  /* istanbul ignore next */
	  return ''
	}
	
	function concat (a, b) {
	  return a ? b ? (a + ' ' + b) : a : (b || '')
	}
	
	function stringifyClass (value) {
	  if (isUndef(value)) {
	    return ''
	  }
	  if (typeof value === 'string') {
	    return value
	  }
	  var res = '';
	  if (Array.isArray(value)) {
	    var stringified;
	    for (var i = 0, l = value.length; i < l; i++) {
	      if (isDef(value[i])) {
	        if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
	          res += stringified + ' ';
	        }
	      }
	    }
	    return res.slice(0, -1)
	  }
	  if (isObject(value)) {
	    for (var key in value) {
	      if (value[key]) { res += key + ' '; }
	    }
	    return res.slice(0, -1)
	  }
	  /* istanbul ignore next */
	  return res
	}
	
	/*  */
	
	var namespaceMap = {
	  svg: 'http://www.w3.org/2000/svg',
	  math: 'http://www.w3.org/1998/Math/MathML'
	};
	
	var isHTMLTag = makeMap(
	  'html,body,base,head,link,meta,style,title,' +
	  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
	  'div,dd,dl,dt,figcaption,figure,hr,img,li,main,ol,p,pre,ul,' +
	  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
	  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
	  'embed,object,param,source,canvas,script,noscript,del,ins,' +
	  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
	  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
	  'output,progress,select,textarea,' +
	  'details,dialog,menu,menuitem,summary,' +
	  'content,element,shadow,template'
	);
	
	// this map is intentionally selective, only covering SVG elements that may
	// contain child elements.
	var isSVG = makeMap(
	  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,font-face,' +
	  'foreignObject,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
	  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
	  true
	);
	
	var isPreTag = function (tag) { return tag === 'pre'; };
	
	var isReservedTag = function (tag) {
	  return isHTMLTag(tag) || isSVG(tag)
	};
	
	function getTagNamespace (tag) {
	  if (isSVG(tag)) {
	    return 'svg'
	  }
	  // basic support for MathML
	  // note it doesn't support other MathML elements being component roots
	  if (tag === 'math') {
	    return 'math'
	  }
	}
	
	var unknownElementCache = Object.create(null);
	function isUnknownElement (tag) {
	  /* istanbul ignore if */
	  if (!inBrowser) {
	    return true
	  }
	  if (isReservedTag(tag)) {
	    return false
	  }
	  tag = tag.toLowerCase();
	  /* istanbul ignore if */
	  if (unknownElementCache[tag] != null) {
	    return unknownElementCache[tag]
	  }
	  var el = document.createElement(tag);
	  if (tag.indexOf('-') > -1) {
	    // http://stackoverflow.com/a/28210364/1070244
	    return (unknownElementCache[tag] = (
	      el.constructor === window.HTMLUnknownElement ||
	      el.constructor === window.HTMLElement
	    ))
	  } else {
	    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
	  }
	}
	
	/*  */
	
	/**
	 * Query an element selector if it's not an element already.
	 */
	function query (el) {
	  if (typeof el === 'string') {
	    var selected = document.querySelector(el);
	    if (!selected) {
	      "development" !== 'production' && warn(
	        'Cannot find element: ' + el
	      );
	      return document.createElement('div')
	    }
	    return selected
	  } else {
	    return el
	  }
	}
	
	/*  */
	
	function createElement$1 (tagName, vnode) {
	  var elm = document.createElement(tagName);
	  if (tagName !== 'select') {
	    return elm
	  }
	  // false or null will remove the attribute but undefined will not
	  if (vnode.data && vnode.data.attrs && vnode.data.attrs.multiple !== undefined) {
	    elm.setAttribute('multiple', 'multiple');
	  }
	  return elm
	}
	
	function createElementNS (namespace, tagName) {
	  return document.createElementNS(namespaceMap[namespace], tagName)
	}
	
	function createTextNode (text) {
	  return document.createTextNode(text)
	}
	
	function createComment (text) {
	  return document.createComment(text)
	}
	
	function insertBefore (parentNode, newNode, referenceNode) {
	  parentNode.insertBefore(newNode, referenceNode);
	}
	
	function removeChild (node, child) {
	  node.removeChild(child);
	}
	
	function appendChild (node, child) {
	  node.appendChild(child);
	}
	
	function parentNode (node) {
	  return node.parentNode
	}
	
	function nextSibling (node) {
	  return node.nextSibling
	}
	
	function tagName (node) {
	  return node.tagName
	}
	
	function setTextContent (node, text) {
	  node.textContent = text;
	}
	
	function setAttribute (node, key, val) {
	  node.setAttribute(key, val);
	}
	
	
	var nodeOps = Object.freeze({
		createElement: createElement$1,
		createElementNS: createElementNS,
		createTextNode: createTextNode,
		createComment: createComment,
		insertBefore: insertBefore,
		removeChild: removeChild,
		appendChild: appendChild,
		parentNode: parentNode,
		nextSibling: nextSibling,
		tagName: tagName,
		setTextContent: setTextContent,
		setAttribute: setAttribute
	});
	
	/*  */
	
	var ref = {
	  create: function create (_, vnode) {
	    registerRef(vnode);
	  },
	  update: function update (oldVnode, vnode) {
	    if (oldVnode.data.ref !== vnode.data.ref) {
	      registerRef(oldVnode, true);
	      registerRef(vnode);
	    }
	  },
	  destroy: function destroy (vnode) {
	    registerRef(vnode, true);
	  }
	};
	
	function registerRef (vnode, isRemoval) {
	  var key = vnode.data.ref;
	  if (!key) { return }
	
	  var vm = vnode.context;
	  var ref = vnode.componentInstance || vnode.elm;
	  var refs = vm.$refs;
	  if (isRemoval) {
	    if (Array.isArray(refs[key])) {
	      remove(refs[key], ref);
	    } else if (refs[key] === ref) {
	      refs[key] = undefined;
	    }
	  } else {
	    if (vnode.data.refInFor) {
	      if (Array.isArray(refs[key]) && refs[key].indexOf(ref) < 0) {
	        refs[key].push(ref);
	      } else {
	        refs[key] = [ref];
	      }
	    } else {
	      refs[key] = ref;
	    }
	  }
	}
	
	/**
	 * Virtual DOM patching algorithm based on Snabbdom by
	 * Simon Friis Vindum (@paldepind)
	 * Licensed under the MIT License
	 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
	 *
	 * modified by Evan You (@yyx990803)
	 *
	
	/*
	 * Not type-checking this because this file is perf-critical and the cost
	 * of making flow understand it is not worth it.
	 */
	
	var emptyNode = new VNode('', {}, []);
	
	var hooks = ['create', 'activate', 'update', 'remove', 'destroy'];
	
	function sameVnode (a, b) {
	  return (
	    a.key === b.key &&
	    a.tag === b.tag &&
	    a.isComment === b.isComment &&
	    isDef(a.data) === isDef(b.data) &&
	    sameInputType(a, b)
	  )
	}
	
	// Some browsers do not support dynamically changing type for <input>
	// so they need to be treated as different nodes
	function sameInputType (a, b) {
	  if (a.tag !== 'input') { return true }
	  var i;
	  var typeA = isDef(i = a.data) && isDef(i = i.attrs) && i.type;
	  var typeB = isDef(i = b.data) && isDef(i = i.attrs) && i.type;
	  return typeA === typeB
	}
	
	function createKeyToOldIdx (children, beginIdx, endIdx) {
	  var i, key;
	  var map = {};
	  for (i = beginIdx; i <= endIdx; ++i) {
	    key = children[i].key;
	    if (isDef(key)) { map[key] = i; }
	  }
	  return map
	}
	
	function createPatchFunction (backend) {
	  var i, j;
	  var cbs = {};
	
	  var modules = backend.modules;
	  var nodeOps = backend.nodeOps;
	
	  for (i = 0; i < hooks.length; ++i) {
	    cbs[hooks[i]] = [];
	    for (j = 0; j < modules.length; ++j) {
	      if (isDef(modules[j][hooks[i]])) {
	        cbs[hooks[i]].push(modules[j][hooks[i]]);
	      }
	    }
	  }
	
	  function emptyNodeAt (elm) {
	    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
	  }
	
	  function createRmCb (childElm, listeners) {
	    function remove$$1 () {
	      if (--remove$$1.listeners === 0) {
	        removeNode(childElm);
	      }
	    }
	    remove$$1.listeners = listeners;
	    return remove$$1
	  }
	
	  function removeNode (el) {
	    var parent = nodeOps.parentNode(el);
	    // element may have already been removed due to v-html / v-text
	    if (isDef(parent)) {
	      nodeOps.removeChild(parent, el);
	    }
	  }
	
	  var inPre = 0;
	  function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested) {
	    vnode.isRootInsert = !nested; // for transition enter check
	    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
	      return
	    }
	
	    var data = vnode.data;
	    var children = vnode.children;
	    var tag = vnode.tag;
	    if (isDef(tag)) {
	      {
	        if (data && data.pre) {
	          inPre++;
	        }
	        if (
	          !inPre &&
	          !vnode.ns &&
	          !(config.ignoredElements.length && config.ignoredElements.indexOf(tag) > -1) &&
	          config.isUnknownElement(tag)
	        ) {
	          warn(
	            'Unknown custom element: <' + tag + '> - did you ' +
	            'register the component correctly? For recursive components, ' +
	            'make sure to provide the "name" option.',
	            vnode.context
	          );
	        }
	      }
	      vnode.elm = vnode.ns
	        ? nodeOps.createElementNS(vnode.ns, tag)
	        : nodeOps.createElement(tag, vnode);
	      setScope(vnode);
	
	      /* istanbul ignore if */
	      {
	        createChildren(vnode, children, insertedVnodeQueue);
	        if (isDef(data)) {
	          invokeCreateHooks(vnode, insertedVnodeQueue);
	        }
	        insert(parentElm, vnode.elm, refElm);
	      }
	
	      if ("development" !== 'production' && data && data.pre) {
	        inPre--;
	      }
	    } else if (isTrue(vnode.isComment)) {
	      vnode.elm = nodeOps.createComment(vnode.text);
	      insert(parentElm, vnode.elm, refElm);
	    } else {
	      vnode.elm = nodeOps.createTextNode(vnode.text);
	      insert(parentElm, vnode.elm, refElm);
	    }
	  }
	
	  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
	    var i = vnode.data;
	    if (isDef(i)) {
	      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
	      if (isDef(i = i.hook) && isDef(i = i.init)) {
	        i(vnode, false /* hydrating */, parentElm, refElm);
	      }
	      // after calling the init hook, if the vnode is a child component
	      // it should've created a child instance and mounted it. the child
	      // component also has set the placeholder vnode's elm.
	      // in that case we can just return the element and be done.
	      if (isDef(vnode.componentInstance)) {
	        initComponent(vnode, insertedVnodeQueue);
	        if (isTrue(isReactivated)) {
	          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
	        }
	        return true
	      }
	    }
	  }
	
	  function initComponent (vnode, insertedVnodeQueue) {
	    if (isDef(vnode.data.pendingInsert)) {
	      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
	    }
	    vnode.elm = vnode.componentInstance.$el;
	    if (isPatchable(vnode)) {
	      invokeCreateHooks(vnode, insertedVnodeQueue);
	      setScope(vnode);
	    } else {
	      // empty component root.
	      // skip all element-related modules except for ref (#3455)
	      registerRef(vnode);
	      // make sure to invoke the insert hook
	      insertedVnodeQueue.push(vnode);
	    }
	  }
	
	  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
	    var i;
	    // hack for #4339: a reactivated component with inner transition
	    // does not trigger because the inner node's created hooks are not called
	    // again. It's not ideal to involve module-specific logic in here but
	    // there doesn't seem to be a better way to do it.
	    var innerNode = vnode;
	    while (innerNode.componentInstance) {
	      innerNode = innerNode.componentInstance._vnode;
	      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
	        for (i = 0; i < cbs.activate.length; ++i) {
	          cbs.activate[i](emptyNode, innerNode);
	        }
	        insertedVnodeQueue.push(innerNode);
	        break
	      }
	    }
	    // unlike a newly created component,
	    // a reactivated keep-alive component doesn't insert itself
	    insert(parentElm, vnode.elm, refElm);
	  }
	
	  function insert (parent, elm, ref) {
	    if (isDef(parent)) {
	      if (isDef(ref)) {
	        if (ref.parentNode === parent) {
	          nodeOps.insertBefore(parent, elm, ref);
	        }
	      } else {
	        nodeOps.appendChild(parent, elm);
	      }
	    }
	  }
	
	  function createChildren (vnode, children, insertedVnodeQueue) {
	    if (Array.isArray(children)) {
	      for (var i = 0; i < children.length; ++i) {
	        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
	      }
	    } else if (isPrimitive(vnode.text)) {
	      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text));
	    }
	  }
	
	  function isPatchable (vnode) {
	    while (vnode.componentInstance) {
	      vnode = vnode.componentInstance._vnode;
	    }
	    return isDef(vnode.tag)
	  }
	
	  function invokeCreateHooks (vnode, insertedVnodeQueue) {
	    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
	      cbs.create[i$1](emptyNode, vnode);
	    }
	    i = vnode.data.hook; // Reuse variable
	    if (isDef(i)) {
	      if (isDef(i.create)) { i.create(emptyNode, vnode); }
	      if (isDef(i.insert)) { insertedVnodeQueue.push(vnode); }
	    }
	  }
	
	  // set scope id attribute for scoped CSS.
	  // this is implemented as a special case to avoid the overhead
	  // of going through the normal attribute patching process.
	  function setScope (vnode) {
	    var i;
	    var ancestor = vnode;
	    while (ancestor) {
	      if (isDef(i = ancestor.context) && isDef(i = i.$options._scopeId)) {
	        nodeOps.setAttribute(vnode.elm, i, '');
	      }
	      ancestor = ancestor.parent;
	    }
	    // for slot content they should also get the scopeId from the host instance.
	    if (isDef(i = activeInstance) &&
	      i !== vnode.context &&
	      isDef(i = i.$options._scopeId)
	    ) {
	      nodeOps.setAttribute(vnode.elm, i, '');
	    }
	  }
	
	  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
	    for (; startIdx <= endIdx; ++startIdx) {
	      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
	    }
	  }
	
	  function invokeDestroyHook (vnode) {
	    var i, j;
	    var data = vnode.data;
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
	      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
	    }
	    if (isDef(i = vnode.children)) {
	      for (j = 0; j < vnode.children.length; ++j) {
	        invokeDestroyHook(vnode.children[j]);
	      }
	    }
	  }
	
	  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
	    for (; startIdx <= endIdx; ++startIdx) {
	      var ch = vnodes[startIdx];
	      if (isDef(ch)) {
	        if (isDef(ch.tag)) {
	          removeAndInvokeRemoveHook(ch);
	          invokeDestroyHook(ch);
	        } else { // Text node
	          removeNode(ch.elm);
	        }
	      }
	    }
	  }
	
	  function removeAndInvokeRemoveHook (vnode, rm) {
	    if (isDef(rm) || isDef(vnode.data)) {
	      var i;
	      var listeners = cbs.remove.length + 1;
	      if (isDef(rm)) {
	        // we have a recursively passed down rm callback
	        // increase the listeners count
	        rm.listeners += listeners;
	      } else {
	        // directly removing
	        rm = createRmCb(vnode.elm, listeners);
	      }
	      // recursively invoke hooks on child component root node
	      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
	        removeAndInvokeRemoveHook(i, rm);
	      }
	      for (i = 0; i < cbs.remove.length; ++i) {
	        cbs.remove[i](vnode, rm);
	      }
	      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
	        i(vnode, rm);
	      } else {
	        rm();
	      }
	    } else {
	      removeNode(vnode.elm);
	    }
	  }
	
	  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
	    var oldStartIdx = 0;
	    var newStartIdx = 0;
	    var oldEndIdx = oldCh.length - 1;
	    var oldStartVnode = oldCh[0];
	    var oldEndVnode = oldCh[oldEndIdx];
	    var newEndIdx = newCh.length - 1;
	    var newStartVnode = newCh[0];
	    var newEndVnode = newCh[newEndIdx];
	    var oldKeyToIdx, idxInOld, elmToMove, refElm;
	
	    // removeOnly is a special flag used only by <transition-group>
	    // to ensure removed elements stay in correct relative positions
	    // during leaving transitions
	    var canMove = !removeOnly;
	
	    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
	      if (isUndef(oldStartVnode)) {
	        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
	      } else if (isUndef(oldEndVnode)) {
	        oldEndVnode = oldCh[--oldEndIdx];
	      } else if (sameVnode(oldStartVnode, newStartVnode)) {
	        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
	        oldStartVnode = oldCh[++oldStartIdx];
	        newStartVnode = newCh[++newStartIdx];
	      } else if (sameVnode(oldEndVnode, newEndVnode)) {
	        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
	        oldEndVnode = oldCh[--oldEndIdx];
	        newEndVnode = newCh[--newEndIdx];
	      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
	        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
	        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
	        oldStartVnode = oldCh[++oldStartIdx];
	        newEndVnode = newCh[--newEndIdx];
	      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
	        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
	        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
	        oldEndVnode = oldCh[--oldEndIdx];
	        newStartVnode = newCh[++newStartIdx];
	      } else {
	        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
	        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : null;
	        if (isUndef(idxInOld)) { // New element
	          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
	          newStartVnode = newCh[++newStartIdx];
	        } else {
	          elmToMove = oldCh[idxInOld];
	          /* istanbul ignore if */
	          if ("development" !== 'production' && !elmToMove) {
	            warn(
	              'It seems there are duplicate keys that is causing an update error. ' +
	              'Make sure each v-for item has a unique key.'
	            );
	          }
	          if (sameVnode(elmToMove, newStartVnode)) {
	            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
	            oldCh[idxInOld] = undefined;
	            canMove && nodeOps.insertBefore(parentElm, newStartVnode.elm, oldStartVnode.elm);
	            newStartVnode = newCh[++newStartIdx];
	          } else {
	            // same key but different element. treat as new element
	            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
	            newStartVnode = newCh[++newStartIdx];
	          }
	        }
	      }
	    }
	    if (oldStartIdx > oldEndIdx) {
	      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
	      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
	    } else if (newStartIdx > newEndIdx) {
	      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
	    }
	  }
	
	  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
	    if (oldVnode === vnode) {
	      return
	    }
	    // reuse element for static trees.
	    // note we only do this if the vnode is cloned -
	    // if the new node is not cloned it means the render functions have been
	    // reset by the hot-reload-api and we need to do a proper re-render.
	    if (isTrue(vnode.isStatic) &&
	      isTrue(oldVnode.isStatic) &&
	      vnode.key === oldVnode.key &&
	      (isTrue(vnode.isCloned) || isTrue(vnode.isOnce))
	    ) {
	      vnode.elm = oldVnode.elm;
	      vnode.componentInstance = oldVnode.componentInstance;
	      return
	    }
	    var i;
	    var data = vnode.data;
	    if (isDef(data) && isDef(i = data.hook) && isDef(i = i.prepatch)) {
	      i(oldVnode, vnode);
	    }
	    var elm = vnode.elm = oldVnode.elm;
	    var oldCh = oldVnode.children;
	    var ch = vnode.children;
	    if (isDef(data) && isPatchable(vnode)) {
	      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
	      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
	    }
	    if (isUndef(vnode.text)) {
	      if (isDef(oldCh) && isDef(ch)) {
	        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
	      } else if (isDef(ch)) {
	        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
	        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
	      } else if (isDef(oldCh)) {
	        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
	      } else if (isDef(oldVnode.text)) {
	        nodeOps.setTextContent(elm, '');
	      }
	    } else if (oldVnode.text !== vnode.text) {
	      nodeOps.setTextContent(elm, vnode.text);
	    }
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
	    }
	  }
	
	  function invokeInsertHook (vnode, queue, initial) {
	    // delay insert hooks for component root nodes, invoke them after the
	    // element is really inserted
	    if (isTrue(initial) && isDef(vnode.parent)) {
	      vnode.parent.data.pendingInsert = queue;
	    } else {
	      for (var i = 0; i < queue.length; ++i) {
	        queue[i].data.hook.insert(queue[i]);
	      }
	    }
	  }
	
	  var bailed = false;
	  // list of modules that can skip create hook during hydration because they
	  // are already rendered on the client or has no need for initialization
	  var isRenderedModule = makeMap('attrs,style,class,staticClass,staticStyle,key');
	
	  // Note: this is a browser-only function so we can assume elms are DOM nodes.
	  function hydrate (elm, vnode, insertedVnodeQueue) {
	    {
	      if (!assertNodeMatch(elm, vnode)) {
	        return false
	      }
	    }
	    vnode.elm = elm;
	    var tag = vnode.tag;
	    var data = vnode.data;
	    var children = vnode.children;
	    if (isDef(data)) {
	      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
	      if (isDef(i = vnode.componentInstance)) {
	        // child component. it should have hydrated its own tree.
	        initComponent(vnode, insertedVnodeQueue);
	        return true
	      }
	    }
	    if (isDef(tag)) {
	      if (isDef(children)) {
	        // empty element, allow client to pick up and populate children
	        if (!elm.hasChildNodes()) {
	          createChildren(vnode, children, insertedVnodeQueue);
	        } else {
	          var childrenMatch = true;
	          var childNode = elm.firstChild;
	          for (var i$1 = 0; i$1 < children.length; i$1++) {
	            if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue)) {
	              childrenMatch = false;
	              break
	            }
	            childNode = childNode.nextSibling;
	          }
	          // if childNode is not null, it means the actual childNodes list is
	          // longer than the virtual children list.
	          if (!childrenMatch || childNode) {
	            if ("development" !== 'production' &&
	              typeof console !== 'undefined' &&
	              !bailed
	            ) {
	              bailed = true;
	              console.warn('Parent: ', elm);
	              console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
	            }
	            return false
	          }
	        }
	      }
	      if (isDef(data)) {
	        for (var key in data) {
	          if (!isRenderedModule(key)) {
	            invokeCreateHooks(vnode, insertedVnodeQueue);
	            break
	          }
	        }
	      }
	    } else if (elm.data !== vnode.text) {
	      elm.data = vnode.text;
	    }
	    return true
	  }
	
	  function assertNodeMatch (node, vnode) {
	    if (isDef(vnode.tag)) {
	      return (
	        vnode.tag.indexOf('vue-component') === 0 ||
	        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
	      )
	    } else {
	      return node.nodeType === (vnode.isComment ? 8 : 3)
	    }
	  }
	
	  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
	    if (isUndef(vnode)) {
	      if (isDef(oldVnode)) { invokeDestroyHook(oldVnode); }
	      return
	    }
	
	    var isInitialPatch = false;
	    var insertedVnodeQueue = [];
	
	    if (isUndef(oldVnode)) {
	      // empty mount (likely as component), create new root element
	      isInitialPatch = true;
	      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
	    } else {
	      var isRealElement = isDef(oldVnode.nodeType);
	      if (!isRealElement && sameVnode(oldVnode, vnode)) {
	        // patch existing root node
	        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
	      } else {
	        if (isRealElement) {
	          // mounting to a real element
	          // check if this is server-rendered content and if we can perform
	          // a successful hydration.
	          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute(SSR_ATTR)) {
	            oldVnode.removeAttribute(SSR_ATTR);
	            hydrating = true;
	          }
	          if (isTrue(hydrating)) {
	            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
	              invokeInsertHook(vnode, insertedVnodeQueue, true);
	              return oldVnode
	            } else {
	              warn(
	                'The client-side rendered virtual DOM tree is not matching ' +
	                'server-rendered content. This is likely caused by incorrect ' +
	                'HTML markup, for example nesting block-level elements inside ' +
	                '<p>, or missing <tbody>. Bailing hydration and performing ' +
	                'full client-side render.'
	              );
	            }
	          }
	          // either not server-rendered, or hydration failed.
	          // create an empty node and replace it
	          oldVnode = emptyNodeAt(oldVnode);
	        }
	        // replacing existing element
	        var oldElm = oldVnode.elm;
	        var parentElm$1 = nodeOps.parentNode(oldElm);
	        createElm(
	          vnode,
	          insertedVnodeQueue,
	          // extremely rare edge case: do not insert if old element is in a
	          // leaving transition. Only happens when combining transition +
	          // keep-alive + HOCs. (#4590)
	          oldElm._leaveCb ? null : parentElm$1,
	          nodeOps.nextSibling(oldElm)
	        );
	
	        if (isDef(vnode.parent)) {
	          // component root element replaced.
	          // update parent placeholder node element, recursively
	          var ancestor = vnode.parent;
	          while (ancestor) {
	            ancestor.elm = vnode.elm;
	            ancestor = ancestor.parent;
	          }
	          if (isPatchable(vnode)) {
	            for (var i = 0; i < cbs.create.length; ++i) {
	              cbs.create[i](emptyNode, vnode.parent);
	            }
	          }
	        }
	
	        if (isDef(parentElm$1)) {
	          removeVnodes(parentElm$1, [oldVnode], 0, 0);
	        } else if (isDef(oldVnode.tag)) {
	          invokeDestroyHook(oldVnode);
	        }
	      }
	    }
	
	    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
	    return vnode.elm
	  }
	}
	
	/*  */
	
	var directives = {
	  create: updateDirectives,
	  update: updateDirectives,
	  destroy: function unbindDirectives (vnode) {
	    updateDirectives(vnode, emptyNode);
	  }
	};
	
	function updateDirectives (oldVnode, vnode) {
	  if (oldVnode.data.directives || vnode.data.directives) {
	    _update(oldVnode, vnode);
	  }
	}
	
	function _update (oldVnode, vnode) {
	  var isCreate = oldVnode === emptyNode;
	  var isDestroy = vnode === emptyNode;
	  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
	  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);
	
	  var dirsWithInsert = [];
	  var dirsWithPostpatch = [];
	
	  var key, oldDir, dir;
	  for (key in newDirs) {
	    oldDir = oldDirs[key];
	    dir = newDirs[key];
	    if (!oldDir) {
	      // new directive, bind
	      callHook$1(dir, 'bind', vnode, oldVnode);
	      if (dir.def && dir.def.inserted) {
	        dirsWithInsert.push(dir);
	      }
	    } else {
	      // existing directive, update
	      dir.oldValue = oldDir.value;
	      callHook$1(dir, 'update', vnode, oldVnode);
	      if (dir.def && dir.def.componentUpdated) {
	        dirsWithPostpatch.push(dir);
	      }
	    }
	  }
	
	  if (dirsWithInsert.length) {
	    var callInsert = function () {
	      for (var i = 0; i < dirsWithInsert.length; i++) {
	        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
	      }
	    };
	    if (isCreate) {
	      mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', callInsert);
	    } else {
	      callInsert();
	    }
	  }
	
	  if (dirsWithPostpatch.length) {
	    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'postpatch', function () {
	      for (var i = 0; i < dirsWithPostpatch.length; i++) {
	        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
	      }
	    });
	  }
	
	  if (!isCreate) {
	    for (key in oldDirs) {
	      if (!newDirs[key]) {
	        // no longer present, unbind
	        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
	      }
	    }
	  }
	}
	
	var emptyModifiers = Object.create(null);
	
	function normalizeDirectives$1 (
	  dirs,
	  vm
	) {
	  var res = Object.create(null);
	  if (!dirs) {
	    return res
	  }
	  var i, dir;
	  for (i = 0; i < dirs.length; i++) {
	    dir = dirs[i];
	    if (!dir.modifiers) {
	      dir.modifiers = emptyModifiers;
	    }
	    res[getRawDirName(dir)] = dir;
	    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
	  }
	  return res
	}
	
	function getRawDirName (dir) {
	  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
	}
	
	function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
	  var fn = dir.def && dir.def[hook];
	  if (fn) {
	    try {
	      fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
	    } catch (e) {
	      handleError(e, vnode.context, ("directive " + (dir.name) + " " + hook + " hook"));
	    }
	  }
	}
	
	var baseModules = [
	  ref,
	  directives
	];
	
	/*  */
	
	function updateAttrs (oldVnode, vnode) {
	  if (isUndef(oldVnode.data.attrs) && isUndef(vnode.data.attrs)) {
	    return
	  }
	  var key, cur, old;
	  var elm = vnode.elm;
	  var oldAttrs = oldVnode.data.attrs || {};
	  var attrs = vnode.data.attrs || {};
	  // clone observed objects, as the user probably wants to mutate it
	  if (isDef(attrs.__ob__)) {
	    attrs = vnode.data.attrs = extend({}, attrs);
	  }
	
	  for (key in attrs) {
	    cur = attrs[key];
	    old = oldAttrs[key];
	    if (old !== cur) {
	      setAttr(elm, key, cur);
	    }
	  }
	  // #4391: in IE9, setting type can reset value for input[type=radio]
	  /* istanbul ignore if */
	  if (isIE9 && attrs.value !== oldAttrs.value) {
	    setAttr(elm, 'value', attrs.value);
	  }
	  for (key in oldAttrs) {
	    if (isUndef(attrs[key])) {
	      if (isXlink(key)) {
	        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
	      } else if (!isEnumeratedAttr(key)) {
	        elm.removeAttribute(key);
	      }
	    }
	  }
	}
	
	function setAttr (el, key, value) {
	  if (isBooleanAttr(key)) {
	    // set attribute for blank value
	    // e.g. <option disabled>Select one</option>
	    if (isFalsyAttrValue(value)) {
	      el.removeAttribute(key);
	    } else {
	      el.setAttribute(key, key);
	    }
	  } else if (isEnumeratedAttr(key)) {
	    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
	  } else if (isXlink(key)) {
	    if (isFalsyAttrValue(value)) {
	      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
	    } else {
	      el.setAttributeNS(xlinkNS, key, value);
	    }
	  } else {
	    if (isFalsyAttrValue(value)) {
	      el.removeAttribute(key);
	    } else {
	      el.setAttribute(key, value);
	    }
	  }
	}
	
	var attrs = {
	  create: updateAttrs,
	  update: updateAttrs
	};
	
	/*  */
	
	function updateClass (oldVnode, vnode) {
	  var el = vnode.elm;
	  var data = vnode.data;
	  var oldData = oldVnode.data;
	  if (
	    isUndef(data.staticClass) &&
	    isUndef(data.class) && (
	      isUndef(oldData) || (
	        isUndef(oldData.staticClass) &&
	        isUndef(oldData.class)
	      )
	    )
	  ) {
	    return
	  }
	
	  var cls = genClassForVnode(vnode);
	
	  // handle transition classes
	  var transitionClass = el._transitionClasses;
	  if (isDef(transitionClass)) {
	    cls = concat(cls, stringifyClass(transitionClass));
	  }
	
	  // set the class
	  if (cls !== el._prevClass) {
	    el.setAttribute('class', cls);
	    el._prevClass = cls;
	  }
	}
	
	var klass = {
	  create: updateClass,
	  update: updateClass
	};
	
	/*  */
	
	var validDivisionCharRE = /[\w).+\-_$\]]/;
	
	function parseFilters (exp) {
	  var inSingle = false;
	  var inDouble = false;
	  var inTemplateString = false;
	  var inRegex = false;
	  var curly = 0;
	  var square = 0;
	  var paren = 0;
	  var lastFilterIndex = 0;
	  var c, prev, i, expression, filters;
	
	  for (i = 0; i < exp.length; i++) {
	    prev = c;
	    c = exp.charCodeAt(i);
	    if (inSingle) {
	      if (c === 0x27 && prev !== 0x5C) { inSingle = false; }
	    } else if (inDouble) {
	      if (c === 0x22 && prev !== 0x5C) { inDouble = false; }
	    } else if (inTemplateString) {
	      if (c === 0x60 && prev !== 0x5C) { inTemplateString = false; }
	    } else if (inRegex) {
	      if (c === 0x2f && prev !== 0x5C) { inRegex = false; }
	    } else if (
	      c === 0x7C && // pipe
	      exp.charCodeAt(i + 1) !== 0x7C &&
	      exp.charCodeAt(i - 1) !== 0x7C &&
	      !curly && !square && !paren
	    ) {
	      if (expression === undefined) {
	        // first filter, end of expression
	        lastFilterIndex = i + 1;
	        expression = exp.slice(0, i).trim();
	      } else {
	        pushFilter();
	      }
	    } else {
	      switch (c) {
	        case 0x22: inDouble = true; break         // "
	        case 0x27: inSingle = true; break         // '
	        case 0x60: inTemplateString = true; break // `
	        case 0x28: paren++; break                 // (
	        case 0x29: paren--; break                 // )
	        case 0x5B: square++; break                // [
	        case 0x5D: square--; break                // ]
	        case 0x7B: curly++; break                 // {
	        case 0x7D: curly--; break                 // }
	      }
	      if (c === 0x2f) { // /
	        var j = i - 1;
	        var p = (void 0);
	        // find first non-whitespace prev char
	        for (; j >= 0; j--) {
	          p = exp.charAt(j);
	          if (p !== ' ') { break }
	        }
	        if (!p || !validDivisionCharRE.test(p)) {
	          inRegex = true;
	        }
	      }
	    }
	  }
	
	  if (expression === undefined) {
	    expression = exp.slice(0, i).trim();
	  } else if (lastFilterIndex !== 0) {
	    pushFilter();
	  }
	
	  function pushFilter () {
	    (filters || (filters = [])).push(exp.slice(lastFilterIndex, i).trim());
	    lastFilterIndex = i + 1;
	  }
	
	  if (filters) {
	    for (i = 0; i < filters.length; i++) {
	      expression = wrapFilter(expression, filters[i]);
	    }
	  }
	
	  return expression
	}
	
	function wrapFilter (exp, filter) {
	  var i = filter.indexOf('(');
	  if (i < 0) {
	    // _f: resolveFilter
	    return ("_f(\"" + filter + "\")(" + exp + ")")
	  } else {
	    var name = filter.slice(0, i);
	    var args = filter.slice(i + 1);
	    return ("_f(\"" + name + "\")(" + exp + "," + args)
	  }
	}
	
	/*  */
	
	function baseWarn (msg) {
	  console.error(("[Vue compiler]: " + msg));
	}
	
	function pluckModuleFunction (
	  modules,
	  key
	) {
	  return modules
	    ? modules.map(function (m) { return m[key]; }).filter(function (_) { return _; })
	    : []
	}
	
	function addProp (el, name, value) {
	  (el.props || (el.props = [])).push({ name: name, value: value });
	}
	
	function addAttr (el, name, value) {
	  (el.attrs || (el.attrs = [])).push({ name: name, value: value });
	}
	
	function addDirective (
	  el,
	  name,
	  rawName,
	  value,
	  arg,
	  modifiers
	) {
	  (el.directives || (el.directives = [])).push({ name: name, rawName: rawName, value: value, arg: arg, modifiers: modifiers });
	}
	
	function addHandler (
	  el,
	  name,
	  value,
	  modifiers,
	  important,
	  warn
	) {
	  // warn prevent and passive modifier
	  /* istanbul ignore if */
	  if (
	    "development" !== 'production' && warn &&
	    modifiers && modifiers.prevent && modifiers.passive
	  ) {
	    warn(
	      'passive and prevent can\'t be used together. ' +
	      'Passive handler can\'t prevent default event.'
	    );
	  }
	  // check capture modifier
	  if (modifiers && modifiers.capture) {
	    delete modifiers.capture;
	    name = '!' + name; // mark the event as captured
	  }
	  if (modifiers && modifiers.once) {
	    delete modifiers.once;
	    name = '~' + name; // mark the event as once
	  }
	  /* istanbul ignore if */
	  if (modifiers && modifiers.passive) {
	    delete modifiers.passive;
	    name = '&' + name; // mark the event as passive
	  }
	  var events;
	  if (modifiers && modifiers.native) {
	    delete modifiers.native;
	    events = el.nativeEvents || (el.nativeEvents = {});
	  } else {
	    events = el.events || (el.events = {});
	  }
	  var newHandler = { value: value, modifiers: modifiers };
	  var handlers = events[name];
	  /* istanbul ignore if */
	  if (Array.isArray(handlers)) {
	    important ? handlers.unshift(newHandler) : handlers.push(newHandler);
	  } else if (handlers) {
	    events[name] = important ? [newHandler, handlers] : [handlers, newHandler];
	  } else {
	    events[name] = newHandler;
	  }
	}
	
	function getBindingAttr (
	  el,
	  name,
	  getStatic
	) {
	  var dynamicValue =
	    getAndRemoveAttr(el, ':' + name) ||
	    getAndRemoveAttr(el, 'v-bind:' + name);
	  if (dynamicValue != null) {
	    return parseFilters(dynamicValue)
	  } else if (getStatic !== false) {
	    var staticValue = getAndRemoveAttr(el, name);
	    if (staticValue != null) {
	      return JSON.stringify(staticValue)
	    }
	  }
	}
	
	function getAndRemoveAttr (el, name) {
	  var val;
	  if ((val = el.attrsMap[name]) != null) {
	    var list = el.attrsList;
	    for (var i = 0, l = list.length; i < l; i++) {
	      if (list[i].name === name) {
	        list.splice(i, 1);
	        break
	      }
	    }
	  }
	  return val
	}
	
	/*  */
	
	/**
	 * Cross-platform code generation for component v-model
	 */
	function genComponentModel (
	  el,
	  value,
	  modifiers
	) {
	  var ref = modifiers || {};
	  var number = ref.number;
	  var trim = ref.trim;
	
	  var baseValueExpression = '$$v';
	  var valueExpression = baseValueExpression;
	  if (trim) {
	    valueExpression =
	      "(typeof " + baseValueExpression + " === 'string'" +
	        "? " + baseValueExpression + ".trim()" +
	        ": " + baseValueExpression + ")";
	  }
	  if (number) {
	    valueExpression = "_n(" + valueExpression + ")";
	  }
	  var assignment = genAssignmentCode(value, valueExpression);
	
	  el.model = {
	    value: ("(" + value + ")"),
	    expression: ("\"" + value + "\""),
	    callback: ("function (" + baseValueExpression + ") {" + assignment + "}")
	  };
	}
	
	/**
	 * Cross-platform codegen helper for generating v-model value assignment code.
	 */
	function genAssignmentCode (
	  value,
	  assignment
	) {
	  var modelRs = parseModel(value);
	  if (modelRs.idx === null) {
	    return (value + "=" + assignment)
	  } else {
	    return "var $$exp = " + (modelRs.exp) + ", $$idx = " + (modelRs.idx) + ";" +
	      "if (!Array.isArray($$exp)){" +
	        value + "=" + assignment + "}" +
	      "else{$$exp.splice($$idx, 1, " + assignment + ")}"
	  }
	}
	
	/**
	 * parse directive model to do the array update transform. a[idx] = val => $$a.splice($$idx, 1, val)
	 *
	 * for loop possible cases:
	 *
	 * - test
	 * - test[idx]
	 * - test[test1[idx]]
	 * - test["a"][idx]
	 * - xxx.test[a[a].test1[idx]]
	 * - test.xxx.a["asa"][test1[idx]]
	 *
	 */
	
	var len;
	var str;
	var chr;
	var index$1;
	var expressionPos;
	var expressionEndPos;
	
	function parseModel (val) {
	  str = val;
	  len = str.length;
	  index$1 = expressionPos = expressionEndPos = 0;
	
	  if (val.indexOf('[') < 0 || val.lastIndexOf(']') < len - 1) {
	    return {
	      exp: val,
	      idx: null
	    }
	  }
	
	  while (!eof()) {
	    chr = next();
	    /* istanbul ignore if */
	    if (isStringStart(chr)) {
	      parseString(chr);
	    } else if (chr === 0x5B) {
	      parseBracket(chr);
	    }
	  }
	
	  return {
	    exp: val.substring(0, expressionPos),
	    idx: val.substring(expressionPos + 1, expressionEndPos)
	  }
	}
	
	function next () {
	  return str.charCodeAt(++index$1)
	}
	
	function eof () {
	  return index$1 >= len
	}
	
	function isStringStart (chr) {
	  return chr === 0x22 || chr === 0x27
	}
	
	function parseBracket (chr) {
	  var inBracket = 1;
	  expressionPos = index$1;
	  while (!eof()) {
	    chr = next();
	    if (isStringStart(chr)) {
	      parseString(chr);
	      continue
	    }
	    if (chr === 0x5B) { inBracket++; }
	    if (chr === 0x5D) { inBracket--; }
	    if (inBracket === 0) {
	      expressionEndPos = index$1;
	      break
	    }
	  }
	}
	
	function parseString (chr) {
	  var stringQuote = chr;
	  while (!eof()) {
	    chr = next();
	    if (chr === stringQuote) {
	      break
	    }
	  }
	}
	
	/*  */
	
	var warn$1;
	
	// in some cases, the event used has to be determined at runtime
	// so we used some reserved tokens during compile.
	var RANGE_TOKEN = '__r';
	var CHECKBOX_RADIO_TOKEN = '__c';
	
	function model (
	  el,
	  dir,
	  _warn
	) {
	  warn$1 = _warn;
	  var value = dir.value;
	  var modifiers = dir.modifiers;
	  var tag = el.tag;
	  var type = el.attrsMap.type;
	
	  {
	    var dynamicType = el.attrsMap['v-bind:type'] || el.attrsMap[':type'];
	    if (tag === 'input' && dynamicType) {
	      warn$1(
	        "<input :type=\"" + dynamicType + "\" v-model=\"" + value + "\">:\n" +
	        "v-model does not support dynamic input types. Use v-if branches instead."
	      );
	    }
	    // inputs with type="file" are read only and setting the input's
	    // value will throw an error.
	    if (tag === 'input' && type === 'file') {
	      warn$1(
	        "<" + (el.tag) + " v-model=\"" + value + "\" type=\"file\">:\n" +
	        "File inputs are read only. Use a v-on:change listener instead."
	      );
	    }
	  }
	
	  if (tag === 'select') {
	    genSelect(el, value, modifiers);
	  } else if (tag === 'input' && type === 'checkbox') {
	    genCheckboxModel(el, value, modifiers);
	  } else if (tag === 'input' && type === 'radio') {
	    genRadioModel(el, value, modifiers);
	  } else if (tag === 'input' || tag === 'textarea') {
	    genDefaultModel(el, value, modifiers);
	  } else if (!config.isReservedTag(tag)) {
	    genComponentModel(el, value, modifiers);
	    // component v-model doesn't need extra runtime
	    return false
	  } else {
	    warn$1(
	      "<" + (el.tag) + " v-model=\"" + value + "\">: " +
	      "v-model is not supported on this element type. " +
	      'If you are working with contenteditable, it\'s recommended to ' +
	      'wrap a library dedicated for that purpose inside a custom component.'
	    );
	  }
	
	  // ensure runtime directive metadata
	  return true
	}
	
	function genCheckboxModel (
	  el,
	  value,
	  modifiers
	) {
	  var number = modifiers && modifiers.number;
	  var valueBinding = getBindingAttr(el, 'value') || 'null';
	  var trueValueBinding = getBindingAttr(el, 'true-value') || 'true';
	  var falseValueBinding = getBindingAttr(el, 'false-value') || 'false';
	  addProp(el, 'checked',
	    "Array.isArray(" + value + ")" +
	      "?_i(" + value + "," + valueBinding + ")>-1" + (
	        trueValueBinding === 'true'
	          ? (":(" + value + ")")
	          : (":_q(" + value + "," + trueValueBinding + ")")
	      )
	  );
	  addHandler(el, CHECKBOX_RADIO_TOKEN,
	    "var $$a=" + value + "," +
	        '$$el=$event.target,' +
	        "$$c=$$el.checked?(" + trueValueBinding + "):(" + falseValueBinding + ");" +
	    'if(Array.isArray($$a)){' +
	      "var $$v=" + (number ? '_n(' + valueBinding + ')' : valueBinding) + "," +
	          '$$i=_i($$a,$$v);' +
	      "if($$c){$$i<0&&(" + value + "=$$a.concat($$v))}" +
	      "else{$$i>-1&&(" + value + "=$$a.slice(0,$$i).concat($$a.slice($$i+1)))}" +
	    "}else{" + (genAssignmentCode(value, '$$c')) + "}",
	    null, true
	  );
	}
	
	function genRadioModel (
	    el,
	    value,
	    modifiers
	) {
	  var number = modifiers && modifiers.number;
	  var valueBinding = getBindingAttr(el, 'value') || 'null';
	  valueBinding = number ? ("_n(" + valueBinding + ")") : valueBinding;
	  addProp(el, 'checked', ("_q(" + value + "," + valueBinding + ")"));
	  addHandler(el, CHECKBOX_RADIO_TOKEN, genAssignmentCode(value, valueBinding), null, true);
	}
	
	function genSelect (
	    el,
	    value,
	    modifiers
	) {
	  var number = modifiers && modifiers.number;
	  var selectedVal = "Array.prototype.filter" +
	    ".call($event.target.options,function(o){return o.selected})" +
	    ".map(function(o){var val = \"_value\" in o ? o._value : o.value;" +
	    "return " + (number ? '_n(val)' : 'val') + "})";
	
	  var assignment = '$event.target.multiple ? $$selectedVal : $$selectedVal[0]';
	  var code = "var $$selectedVal = " + selectedVal + ";";
	  code = code + " " + (genAssignmentCode(value, assignment));
	  addHandler(el, 'change', code, null, true);
	}
	
	function genDefaultModel (
	  el,
	  value,
	  modifiers
	) {
	  var type = el.attrsMap.type;
	  var ref = modifiers || {};
	  var lazy = ref.lazy;
	  var number = ref.number;
	  var trim = ref.trim;
	  var needCompositionGuard = !lazy && type !== 'range';
	  var event = lazy
	    ? 'change'
	    : type === 'range'
	      ? RANGE_TOKEN
	      : 'input';
	
	  var valueExpression = '$event.target.value';
	  if (trim) {
	    valueExpression = "$event.target.value.trim()";
	  }
	  if (number) {
	    valueExpression = "_n(" + valueExpression + ")";
	  }
	
	  var code = genAssignmentCode(value, valueExpression);
	  if (needCompositionGuard) {
	    code = "if($event.target.composing)return;" + code;
	  }
	
	  addProp(el, 'value', ("(" + value + ")"));
	  addHandler(el, event, code, null, true);
	  if (trim || number || type === 'number') {
	    addHandler(el, 'blur', '$forceUpdate()');
	  }
	}
	
	/*  */
	
	// normalize v-model event tokens that can only be determined at runtime.
	// it's important to place the event as the first in the array because
	// the whole point is ensuring the v-model callback gets called before
	// user-attached handlers.
	function normalizeEvents (on) {
	  var event;
	  /* istanbul ignore if */
	  if (isDef(on[RANGE_TOKEN])) {
	    // IE input[type=range] only supports `change` event
	    event = isIE ? 'change' : 'input';
	    on[event] = [].concat(on[RANGE_TOKEN], on[event] || []);
	    delete on[RANGE_TOKEN];
	  }
	  if (isDef(on[CHECKBOX_RADIO_TOKEN])) {
	    // Chrome fires microtasks in between click/change, leads to #4521
	    event = isChrome ? 'click' : 'change';
	    on[event] = [].concat(on[CHECKBOX_RADIO_TOKEN], on[event] || []);
	    delete on[CHECKBOX_RADIO_TOKEN];
	  }
	}
	
	var target$1;
	
	function add$1 (
	  event,
	  handler,
	  once$$1,
	  capture,
	  passive
	) {
	  if (once$$1) {
	    var oldHandler = handler;
	    var _target = target$1; // save current target element in closure
	    handler = function (ev) {
	      var res = arguments.length === 1
	        ? oldHandler(ev)
	        : oldHandler.apply(null, arguments);
	      if (res !== null) {
	        remove$2(event, handler, capture, _target);
	      }
	    };
	  }
	  target$1.addEventListener(
	    event,
	    handler,
	    supportsPassive
	      ? { capture: capture, passive: passive }
	      : capture
	  );
	}
	
	function remove$2 (
	  event,
	  handler,
	  capture,
	  _target
	) {
	  (_target || target$1).removeEventListener(event, handler, capture);
	}
	
	function updateDOMListeners (oldVnode, vnode) {
	  if (isUndef(oldVnode.data.on) && isUndef(vnode.data.on)) {
	    return
	  }
	  var on = vnode.data.on || {};
	  var oldOn = oldVnode.data.on || {};
	  target$1 = vnode.elm;
	  normalizeEvents(on);
	  updateListeners(on, oldOn, add$1, remove$2, vnode.context);
	}
	
	var events = {
	  create: updateDOMListeners,
	  update: updateDOMListeners
	};
	
	/*  */
	
	function updateDOMProps (oldVnode, vnode) {
	  if (isUndef(oldVnode.data.domProps) && isUndef(vnode.data.domProps)) {
	    return
	  }
	  var key, cur;
	  var elm = vnode.elm;
	  var oldProps = oldVnode.data.domProps || {};
	  var props = vnode.data.domProps || {};
	  // clone observed objects, as the user probably wants to mutate it
	  if (isDef(props.__ob__)) {
	    props = vnode.data.domProps = extend({}, props);
	  }
	
	  for (key in oldProps) {
	    if (isUndef(props[key])) {
	      elm[key] = '';
	    }
	  }
	  for (key in props) {
	    cur = props[key];
	    // ignore children if the node has textContent or innerHTML,
	    // as these will throw away existing DOM nodes and cause removal errors
	    // on subsequent patches (#3360)
	    if (key === 'textContent' || key === 'innerHTML') {
	      if (vnode.children) { vnode.children.length = 0; }
	      if (cur === oldProps[key]) { continue }
	    }
	
	    if (key === 'value') {
	      // store value as _value as well since
	      // non-string values will be stringified
	      elm._value = cur;
	      // avoid resetting cursor position when value is the same
	      var strCur = isUndef(cur) ? '' : String(cur);
	      if (shouldUpdateValue(elm, vnode, strCur)) {
	        elm.value = strCur;
	      }
	    } else {
	      elm[key] = cur;
	    }
	  }
	}
	
	// check platforms/web/util/attrs.js acceptValue
	
	
	function shouldUpdateValue (
	  elm,
	  vnode,
	  checkVal
	) {
	  return (!elm.composing && (
	    vnode.tag === 'option' ||
	    isDirty(elm, checkVal) ||
	    isInputChanged(elm, checkVal)
	  ))
	}
	
	function isDirty (elm, checkVal) {
	  // return true when textbox (.number and .trim) loses focus and its value is not equal to the updated value
	  return document.activeElement !== elm && elm.value !== checkVal
	}
	
	function isInputChanged (elm, newVal) {
	  var value = elm.value;
	  var modifiers = elm._vModifiers; // injected by v-model runtime
	  if ((isDef(modifiers) && modifiers.number) || elm.type === 'number') {
	    return toNumber(value) !== toNumber(newVal)
	  }
	  if (isDef(modifiers) && modifiers.trim) {
	    return value.trim() !== newVal.trim()
	  }
	  return value !== newVal
	}
	
	var domProps = {
	  create: updateDOMProps,
	  update: updateDOMProps
	};
	
	/*  */
	
	var parseStyleText = cached(function (cssText) {
	  var res = {};
	  var listDelimiter = /;(?![^(]*\))/g;
	  var propertyDelimiter = /:(.+)/;
	  cssText.split(listDelimiter).forEach(function (item) {
	    if (item) {
	      var tmp = item.split(propertyDelimiter);
	      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
	    }
	  });
	  return res
	});
	
	// merge static and dynamic style data on the same vnode
	function normalizeStyleData (data) {
	  var style = normalizeStyleBinding(data.style);
	  // static style is pre-processed into an object during compilation
	  // and is always a fresh object, so it's safe to merge into it
	  return data.staticStyle
	    ? extend(data.staticStyle, style)
	    : style
	}
	
	// normalize possible array / string values into Object
	function normalizeStyleBinding (bindingStyle) {
	  if (Array.isArray(bindingStyle)) {
	    return toObject(bindingStyle)
	  }
	  if (typeof bindingStyle === 'string') {
	    return parseStyleText(bindingStyle)
	  }
	  return bindingStyle
	}
	
	/**
	 * parent component style should be after child's
	 * so that parent component's style could override it
	 */
	function getStyle (vnode, checkChild) {
	  var res = {};
	  var styleData;
	
	  if (checkChild) {
	    var childNode = vnode;
	    while (childNode.componentInstance) {
	      childNode = childNode.componentInstance._vnode;
	      if (childNode.data && (styleData = normalizeStyleData(childNode.data))) {
	        extend(res, styleData);
	      }
	    }
	  }
	
	  if ((styleData = normalizeStyleData(vnode.data))) {
	    extend(res, styleData);
	  }
	
	  var parentNode = vnode;
	  while ((parentNode = parentNode.parent)) {
	    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
	      extend(res, styleData);
	    }
	  }
	  return res
	}
	
	/*  */
	
	var cssVarRE = /^--/;
	var importantRE = /\s*!important$/;
	var setProp = function (el, name, val) {
	  /* istanbul ignore if */
	  if (cssVarRE.test(name)) {
	    el.style.setProperty(name, val);
	  } else if (importantRE.test(val)) {
	    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
	  } else {
	    var normalizedName = normalize(name);
	    if (Array.isArray(val)) {
	      // Support values array created by autoprefixer, e.g.
	      // {display: ["-webkit-box", "-ms-flexbox", "flex"]}
	      // Set them one by one, and the browser will only set those it can recognize
	      for (var i = 0, len = val.length; i < len; i++) {
	        el.style[normalizedName] = val[i];
	      }
	    } else {
	      el.style[normalizedName] = val;
	    }
	  }
	};
	
	var prefixes = ['Webkit', 'Moz', 'ms'];
	
	var testEl;
	var normalize = cached(function (prop) {
	  testEl = testEl || document.createElement('div');
	  prop = camelize(prop);
	  if (prop !== 'filter' && (prop in testEl.style)) {
	    return prop
	  }
	  var upper = prop.charAt(0).toUpperCase() + prop.slice(1);
	  for (var i = 0; i < prefixes.length; i++) {
	    var prefixed = prefixes[i] + upper;
	    if (prefixed in testEl.style) {
	      return prefixed
	    }
	  }
	});
	
	function updateStyle (oldVnode, vnode) {
	  var data = vnode.data;
	  var oldData = oldVnode.data;
	
	  if (isUndef(data.staticStyle) && isUndef(data.style) &&
	    isUndef(oldData.staticStyle) && isUndef(oldData.style)
	  ) {
	    return
	  }
	
	  var cur, name;
	  var el = vnode.elm;
	  var oldStaticStyle = oldData.staticStyle;
	  var oldStyleBinding = oldData.normalizedStyle || oldData.style || {};
	
	  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
	  var oldStyle = oldStaticStyle || oldStyleBinding;
	
	  var style = normalizeStyleBinding(vnode.data.style) || {};
	
	  // store normalized style under a different key for next diff
	  // make sure to clone it if it's reactive, since the user likley wants
	  // to mutate it.
	  vnode.data.normalizedStyle = isDef(style.__ob__)
	    ? extend({}, style)
	    : style;
	
	  var newStyle = getStyle(vnode, true);
	
	  for (name in oldStyle) {
	    if (isUndef(newStyle[name])) {
	      setProp(el, name, '');
	    }
	  }
	  for (name in newStyle) {
	    cur = newStyle[name];
	    if (cur !== oldStyle[name]) {
	      // ie9 setting to null has no effect, must use empty string
	      setProp(el, name, cur == null ? '' : cur);
	    }
	  }
	}
	
	var style = {
	  create: updateStyle,
	  update: updateStyle
	};
	
	/*  */
	
	/**
	 * Add class with compatibility for SVG since classList is not supported on
	 * SVG elements in IE
	 */
	function addClass (el, cls) {
	  /* istanbul ignore if */
	  if (!cls || !(cls = cls.trim())) {
	    return
	  }
	
	  /* istanbul ignore else */
	  if (el.classList) {
	    if (cls.indexOf(' ') > -1) {
	      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
	    } else {
	      el.classList.add(cls);
	    }
	  } else {
	    var cur = " " + (el.getAttribute('class') || '') + " ";
	    if (cur.indexOf(' ' + cls + ' ') < 0) {
	      el.setAttribute('class', (cur + cls).trim());
	    }
	  }
	}
	
	/**
	 * Remove class with compatibility for SVG since classList is not supported on
	 * SVG elements in IE
	 */
	function removeClass (el, cls) {
	  /* istanbul ignore if */
	  if (!cls || !(cls = cls.trim())) {
	    return
	  }
	
	  /* istanbul ignore else */
	  if (el.classList) {
	    if (cls.indexOf(' ') > -1) {
	      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
	    } else {
	      el.classList.remove(cls);
	    }
	  } else {
	    var cur = " " + (el.getAttribute('class') || '') + " ";
	    var tar = ' ' + cls + ' ';
	    while (cur.indexOf(tar) >= 0) {
	      cur = cur.replace(tar, ' ');
	    }
	    el.setAttribute('class', cur.trim());
	  }
	}
	
	/*  */
	
	function resolveTransition (def$$1) {
	  if (!def$$1) {
	    return
	  }
	  /* istanbul ignore else */
	  if (typeof def$$1 === 'object') {
	    var res = {};
	    if (def$$1.css !== false) {
	      extend(res, autoCssTransition(def$$1.name || 'v'));
	    }
	    extend(res, def$$1);
	    return res
	  } else if (typeof def$$1 === 'string') {
	    return autoCssTransition(def$$1)
	  }
	}
	
	var autoCssTransition = cached(function (name) {
	  return {
	    enterClass: (name + "-enter"),
	    enterToClass: (name + "-enter-to"),
	    enterActiveClass: (name + "-enter-active"),
	    leaveClass: (name + "-leave"),
	    leaveToClass: (name + "-leave-to"),
	    leaveActiveClass: (name + "-leave-active")
	  }
	});
	
	var hasTransition = inBrowser && !isIE9;
	var TRANSITION = 'transition';
	var ANIMATION = 'animation';
	
	// Transition property/event sniffing
	var transitionProp = 'transition';
	var transitionEndEvent = 'transitionend';
	var animationProp = 'animation';
	var animationEndEvent = 'animationend';
	if (hasTransition) {
	  /* istanbul ignore if */
	  if (window.ontransitionend === undefined &&
	    window.onwebkittransitionend !== undefined
	  ) {
	    transitionProp = 'WebkitTransition';
	    transitionEndEvent = 'webkitTransitionEnd';
	  }
	  if (window.onanimationend === undefined &&
	    window.onwebkitanimationend !== undefined
	  ) {
	    animationProp = 'WebkitAnimation';
	    animationEndEvent = 'webkitAnimationEnd';
	  }
	}
	
	// binding to window is necessary to make hot reload work in IE in strict mode
	var raf = inBrowser && window.requestAnimationFrame
	  ? window.requestAnimationFrame.bind(window)
	  : setTimeout;
	
	function nextFrame (fn) {
	  raf(function () {
	    raf(fn);
	  });
	}
	
	function addTransitionClass (el, cls) {
	  (el._transitionClasses || (el._transitionClasses = [])).push(cls);
	  addClass(el, cls);
	}
	
	function removeTransitionClass (el, cls) {
	  if (el._transitionClasses) {
	    remove(el._transitionClasses, cls);
	  }
	  removeClass(el, cls);
	}
	
	function whenTransitionEnds (
	  el,
	  expectedType,
	  cb
	) {
	  var ref = getTransitionInfo(el, expectedType);
	  var type = ref.type;
	  var timeout = ref.timeout;
	  var propCount = ref.propCount;
	  if (!type) { return cb() }
	  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
	  var ended = 0;
	  var end = function () {
	    el.removeEventListener(event, onEnd);
	    cb();
	  };
	  var onEnd = function (e) {
	    if (e.target === el) {
	      if (++ended >= propCount) {
	        end();
	      }
	    }
	  };
	  setTimeout(function () {
	    if (ended < propCount) {
	      end();
	    }
	  }, timeout + 1);
	  el.addEventListener(event, onEnd);
	}
	
	var transformRE = /\b(transform|all)(,|$)/;
	
	function getTransitionInfo (el, expectedType) {
	  var styles = window.getComputedStyle(el);
	  var transitionDelays = styles[transitionProp + 'Delay'].split(', ');
	  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
	  var transitionTimeout = getTimeout(transitionDelays, transitionDurations);
	  var animationDelays = styles[animationProp + 'Delay'].split(', ');
	  var animationDurations = styles[animationProp + 'Duration'].split(', ');
	  var animationTimeout = getTimeout(animationDelays, animationDurations);
	
	  var type;
	  var timeout = 0;
	  var propCount = 0;
	  /* istanbul ignore if */
	  if (expectedType === TRANSITION) {
	    if (transitionTimeout > 0) {
	      type = TRANSITION;
	      timeout = transitionTimeout;
	      propCount = transitionDurations.length;
	    }
	  } else if (expectedType === ANIMATION) {
	    if (animationTimeout > 0) {
	      type = ANIMATION;
	      timeout = animationTimeout;
	      propCount = animationDurations.length;
	    }
	  } else {
	    timeout = Math.max(transitionTimeout, animationTimeout);
	    type = timeout > 0
	      ? transitionTimeout > animationTimeout
	        ? TRANSITION
	        : ANIMATION
	      : null;
	    propCount = type
	      ? type === TRANSITION
	        ? transitionDurations.length
	        : animationDurations.length
	      : 0;
	  }
	  var hasTransform =
	    type === TRANSITION &&
	    transformRE.test(styles[transitionProp + 'Property']);
	  return {
	    type: type,
	    timeout: timeout,
	    propCount: propCount,
	    hasTransform: hasTransform
	  }
	}
	
	function getTimeout (delays, durations) {
	  /* istanbul ignore next */
	  while (delays.length < durations.length) {
	    delays = delays.concat(delays);
	  }
	
	  return Math.max.apply(null, durations.map(function (d, i) {
	    return toMs(d) + toMs(delays[i])
	  }))
	}
	
	function toMs (s) {
	  return Number(s.slice(0, -1)) * 1000
	}
	
	/*  */
	
	function enter (vnode, toggleDisplay) {
	  var el = vnode.elm;
	
	  // call leave callback now
	  if (isDef(el._leaveCb)) {
	    el._leaveCb.cancelled = true;
	    el._leaveCb();
	  }
	
	  var data = resolveTransition(vnode.data.transition);
	  if (isUndef(data)) {
	    return
	  }
	
	  /* istanbul ignore if */
	  if (isDef(el._enterCb) || el.nodeType !== 1) {
	    return
	  }
	
	  var css = data.css;
	  var type = data.type;
	  var enterClass = data.enterClass;
	  var enterToClass = data.enterToClass;
	  var enterActiveClass = data.enterActiveClass;
	  var appearClass = data.appearClass;
	  var appearToClass = data.appearToClass;
	  var appearActiveClass = data.appearActiveClass;
	  var beforeEnter = data.beforeEnter;
	  var enter = data.enter;
	  var afterEnter = data.afterEnter;
	  var enterCancelled = data.enterCancelled;
	  var beforeAppear = data.beforeAppear;
	  var appear = data.appear;
	  var afterAppear = data.afterAppear;
	  var appearCancelled = data.appearCancelled;
	  var duration = data.duration;
	
	  // activeInstance will always be the <transition> component managing this
	  // transition. One edge case to check is when the <transition> is placed
	  // as the root node of a child component. In that case we need to check
	  // <transition>'s parent for appear check.
	  var context = activeInstance;
	  var transitionNode = activeInstance.$vnode;
	  while (transitionNode && transitionNode.parent) {
	    transitionNode = transitionNode.parent;
	    context = transitionNode.context;
	  }
	
	  var isAppear = !context._isMounted || !vnode.isRootInsert;
	
	  if (isAppear && !appear && appear !== '') {
	    return
	  }
	
	  var startClass = isAppear && appearClass
	    ? appearClass
	    : enterClass;
	  var activeClass = isAppear && appearActiveClass
	    ? appearActiveClass
	    : enterActiveClass;
	  var toClass = isAppear && appearToClass
	    ? appearToClass
	    : enterToClass;
	
	  var beforeEnterHook = isAppear
	    ? (beforeAppear || beforeEnter)
	    : beforeEnter;
	  var enterHook = isAppear
	    ? (typeof appear === 'function' ? appear : enter)
	    : enter;
	  var afterEnterHook = isAppear
	    ? (afterAppear || afterEnter)
	    : afterEnter;
	  var enterCancelledHook = isAppear
	    ? (appearCancelled || enterCancelled)
	    : enterCancelled;
	
	  var explicitEnterDuration = toNumber(
	    isObject(duration)
	      ? duration.enter
	      : duration
	  );
	
	  if ("development" !== 'production' && explicitEnterDuration != null) {
	    checkDuration(explicitEnterDuration, 'enter', vnode);
	  }
	
	  var expectsCSS = css !== false && !isIE9;
	  var userWantsControl = getHookArgumentsLength(enterHook);
	
	  var cb = el._enterCb = once(function () {
	    if (expectsCSS) {
	      removeTransitionClass(el, toClass);
	      removeTransitionClass(el, activeClass);
	    }
	    if (cb.cancelled) {
	      if (expectsCSS) {
	        removeTransitionClass(el, startClass);
	      }
	      enterCancelledHook && enterCancelledHook(el);
	    } else {
	      afterEnterHook && afterEnterHook(el);
	    }
	    el._enterCb = null;
	  });
	
	  if (!vnode.data.show) {
	    // remove pending leave element on enter by injecting an insert hook
	    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', function () {
	      var parent = el.parentNode;
	      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
	      if (pendingNode &&
	        pendingNode.tag === vnode.tag &&
	        pendingNode.elm._leaveCb
	      ) {
	        pendingNode.elm._leaveCb();
	      }
	      enterHook && enterHook(el, cb);
	    });
	  }
	
	  // start enter transition
	  beforeEnterHook && beforeEnterHook(el);
	  if (expectsCSS) {
	    addTransitionClass(el, startClass);
	    addTransitionClass(el, activeClass);
	    nextFrame(function () {
	      addTransitionClass(el, toClass);
	      removeTransitionClass(el, startClass);
	      if (!cb.cancelled && !userWantsControl) {
	        if (isValidDuration(explicitEnterDuration)) {
	          setTimeout(cb, explicitEnterDuration);
	        } else {
	          whenTransitionEnds(el, type, cb);
	        }
	      }
	    });
	  }
	
	  if (vnode.data.show) {
	    toggleDisplay && toggleDisplay();
	    enterHook && enterHook(el, cb);
	  }
	
	  if (!expectsCSS && !userWantsControl) {
	    cb();
	  }
	}
	
	function leave (vnode, rm) {
	  var el = vnode.elm;
	
	  // call enter callback now
	  if (isDef(el._enterCb)) {
	    el._enterCb.cancelled = true;
	    el._enterCb();
	  }
	
	  var data = resolveTransition(vnode.data.transition);
	  if (isUndef(data)) {
	    return rm()
	  }
	
	  /* istanbul ignore if */
	  if (isDef(el._leaveCb) || el.nodeType !== 1) {
	    return
	  }
	
	  var css = data.css;
	  var type = data.type;
	  var leaveClass = data.leaveClass;
	  var leaveToClass = data.leaveToClass;
	  var leaveActiveClass = data.leaveActiveClass;
	  var beforeLeave = data.beforeLeave;
	  var leave = data.leave;
	  var afterLeave = data.afterLeave;
	  var leaveCancelled = data.leaveCancelled;
	  var delayLeave = data.delayLeave;
	  var duration = data.duration;
	
	  var expectsCSS = css !== false && !isIE9;
	  var userWantsControl = getHookArgumentsLength(leave);
	
	  var explicitLeaveDuration = toNumber(
	    isObject(duration)
	      ? duration.leave
	      : duration
	  );
	
	  if ("development" !== 'production' && isDef(explicitLeaveDuration)) {
	    checkDuration(explicitLeaveDuration, 'leave', vnode);
	  }
	
	  var cb = el._leaveCb = once(function () {
	    if (el.parentNode && el.parentNode._pending) {
	      el.parentNode._pending[vnode.key] = null;
	    }
	    if (expectsCSS) {
	      removeTransitionClass(el, leaveToClass);
	      removeTransitionClass(el, leaveActiveClass);
	    }
	    if (cb.cancelled) {
	      if (expectsCSS) {
	        removeTransitionClass(el, leaveClass);
	      }
	      leaveCancelled && leaveCancelled(el);
	    } else {
	      rm();
	      afterLeave && afterLeave(el);
	    }
	    el._leaveCb = null;
	  });
	
	  if (delayLeave) {
	    delayLeave(performLeave);
	  } else {
	    performLeave();
	  }
	
	  function performLeave () {
	    // the delayed leave may have already been cancelled
	    if (cb.cancelled) {
	      return
	    }
	    // record leaving element
	    if (!vnode.data.show) {
	      (el.parentNode._pending || (el.parentNode._pending = {}))[(vnode.key)] = vnode;
	    }
	    beforeLeave && beforeLeave(el);
	    if (expectsCSS) {
	      addTransitionClass(el, leaveClass);
	      addTransitionClass(el, leaveActiveClass);
	      nextFrame(function () {
	        addTransitionClass(el, leaveToClass);
	        removeTransitionClass(el, leaveClass);
	        if (!cb.cancelled && !userWantsControl) {
	          if (isValidDuration(explicitLeaveDuration)) {
	            setTimeout(cb, explicitLeaveDuration);
	          } else {
	            whenTransitionEnds(el, type, cb);
	          }
	        }
	      });
	    }
	    leave && leave(el, cb);
	    if (!expectsCSS && !userWantsControl) {
	      cb();
	    }
	  }
	}
	
	// only used in dev mode
	function checkDuration (val, name, vnode) {
	  if (typeof val !== 'number') {
	    warn(
	      "<transition> explicit " + name + " duration is not a valid number - " +
	      "got " + (JSON.stringify(val)) + ".",
	      vnode.context
	    );
	  } else if (isNaN(val)) {
	    warn(
	      "<transition> explicit " + name + " duration is NaN - " +
	      'the duration expression might be incorrect.',
	      vnode.context
	    );
	  }
	}
	
	function isValidDuration (val) {
	  return typeof val === 'number' && !isNaN(val)
	}
	
	/**
	 * Normalize a transition hook's argument length. The hook may be:
	 * - a merged hook (invoker) with the original in .fns
	 * - a wrapped component method (check ._length)
	 * - a plain function (.length)
	 */
	function getHookArgumentsLength (fn) {
	  if (isUndef(fn)) {
	    return false
	  }
	  var invokerFns = fn.fns;
	  if (isDef(invokerFns)) {
	    // invoker
	    return getHookArgumentsLength(
	      Array.isArray(invokerFns)
	        ? invokerFns[0]
	        : invokerFns
	    )
	  } else {
	    return (fn._length || fn.length) > 1
	  }
	}
	
	function _enter (_, vnode) {
	  if (vnode.data.show !== true) {
	    enter(vnode);
	  }
	}
	
	var transition = inBrowser ? {
	  create: _enter,
	  activate: _enter,
	  remove: function remove$$1 (vnode, rm) {
	    /* istanbul ignore else */
	    if (vnode.data.show !== true) {
	      leave(vnode, rm);
	    } else {
	      rm();
	    }
	  }
	} : {};
	
	var platformModules = [
	  attrs,
	  klass,
	  events,
	  domProps,
	  style,
	  transition
	];
	
	/*  */
	
	// the directive module should be applied last, after all
	// built-in modules have been applied.
	var modules = platformModules.concat(baseModules);
	
	var patch = createPatchFunction({ nodeOps: nodeOps, modules: modules });
	
	/**
	 * Not type checking this file because flow doesn't like attaching
	 * properties to Elements.
	 */
	
	/* istanbul ignore if */
	if (isIE9) {
	  // http://www.matts411.com/post/internet-explorer-9-oninput/
	  document.addEventListener('selectionchange', function () {
	    var el = document.activeElement;
	    if (el && el.vmodel) {
	      trigger(el, 'input');
	    }
	  });
	}
	
	var model$1 = {
	  inserted: function inserted (el, binding, vnode) {
	    if (vnode.tag === 'select') {
	      var cb = function () {
	        setSelected(el, binding, vnode.context);
	      };
	      cb();
	      /* istanbul ignore if */
	      if (isIE || isEdge) {
	        setTimeout(cb, 0);
	      }
	    } else if (vnode.tag === 'textarea' || el.type === 'text' || el.type === 'password') {
	      el._vModifiers = binding.modifiers;
	      if (!binding.modifiers.lazy) {
	        // Safari < 10.2 & UIWebView doesn't fire compositionend when
	        // switching focus before confirming composition choice
	        // this also fixes the issue where some browsers e.g. iOS Chrome
	        // fires "change" instead of "input" on autocomplete.
	        el.addEventListener('change', onCompositionEnd);
	        if (!isAndroid) {
	          el.addEventListener('compositionstart', onCompositionStart);
	          el.addEventListener('compositionend', onCompositionEnd);
	        }
	        /* istanbul ignore if */
	        if (isIE9) {
	          el.vmodel = true;
	        }
	      }
	    }
	  },
	  componentUpdated: function componentUpdated (el, binding, vnode) {
	    if (vnode.tag === 'select') {
	      setSelected(el, binding, vnode.context);
	      // in case the options rendered by v-for have changed,
	      // it's possible that the value is out-of-sync with the rendered options.
	      // detect such cases and filter out values that no longer has a matching
	      // option in the DOM.
	      var needReset = el.multiple
	        ? binding.value.some(function (v) { return hasNoMatchingOption(v, el.options); })
	        : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, el.options);
	      if (needReset) {
	        trigger(el, 'change');
	      }
	    }
	  }
	};
	
	function setSelected (el, binding, vm) {
	  var value = binding.value;
	  var isMultiple = el.multiple;
	  if (isMultiple && !Array.isArray(value)) {
	    "development" !== 'production' && warn(
	      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
	      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
	      vm
	    );
	    return
	  }
	  var selected, option;
	  for (var i = 0, l = el.options.length; i < l; i++) {
	    option = el.options[i];
	    if (isMultiple) {
	      selected = looseIndexOf(value, getValue(option)) > -1;
	      if (option.selected !== selected) {
	        option.selected = selected;
	      }
	    } else {
	      if (looseEqual(getValue(option), value)) {
	        if (el.selectedIndex !== i) {
	          el.selectedIndex = i;
	        }
	        return
	      }
	    }
	  }
	  if (!isMultiple) {
	    el.selectedIndex = -1;
	  }
	}
	
	function hasNoMatchingOption (value, options) {
	  for (var i = 0, l = options.length; i < l; i++) {
	    if (looseEqual(getValue(options[i]), value)) {
	      return false
	    }
	  }
	  return true
	}
	
	function getValue (option) {
	  return '_value' in option
	    ? option._value
	    : option.value
	}
	
	function onCompositionStart (e) {
	  e.target.composing = true;
	}
	
	function onCompositionEnd (e) {
	  // prevent triggering an input event for no reason
	  if (!e.target.composing) { return }
	  e.target.composing = false;
	  trigger(e.target, 'input');
	}
	
	function trigger (el, type) {
	  var e = document.createEvent('HTMLEvents');
	  e.initEvent(type, true, true);
	  el.dispatchEvent(e);
	}
	
	/*  */
	
	// recursively search for possible transition defined inside the component root
	function locateNode (vnode) {
	  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
	    ? locateNode(vnode.componentInstance._vnode)
	    : vnode
	}
	
	var show = {
	  bind: function bind (el, ref, vnode) {
	    var value = ref.value;
	
	    vnode = locateNode(vnode);
	    var transition = vnode.data && vnode.data.transition;
	    var originalDisplay = el.__vOriginalDisplay =
	      el.style.display === 'none' ? '' : el.style.display;
	    if (value && transition && !isIE9) {
	      vnode.data.show = true;
	      enter(vnode, function () {
	        el.style.display = originalDisplay;
	      });
	    } else {
	      el.style.display = value ? originalDisplay : 'none';
	    }
	  },
	
	  update: function update (el, ref, vnode) {
	    var value = ref.value;
	    var oldValue = ref.oldValue;
	
	    /* istanbul ignore if */
	    if (value === oldValue) { return }
	    vnode = locateNode(vnode);
	    var transition = vnode.data && vnode.data.transition;
	    if (transition && !isIE9) {
	      vnode.data.show = true;
	      if (value) {
	        enter(vnode, function () {
	          el.style.display = el.__vOriginalDisplay;
	        });
	      } else {
	        leave(vnode, function () {
	          el.style.display = 'none';
	        });
	      }
	    } else {
	      el.style.display = value ? el.__vOriginalDisplay : 'none';
	    }
	  },
	
	  unbind: function unbind (
	    el,
	    binding,
	    vnode,
	    oldVnode,
	    isDestroy
	  ) {
	    if (!isDestroy) {
	      el.style.display = el.__vOriginalDisplay;
	    }
	  }
	};
	
	var platformDirectives = {
	  model: model$1,
	  show: show
	};
	
	/*  */
	
	// Provides transition support for a single element/component.
	// supports transition mode (out-in / in-out)
	
	var transitionProps = {
	  name: String,
	  appear: Boolean,
	  css: Boolean,
	  mode: String,
	  type: String,
	  enterClass: String,
	  leaveClass: String,
	  enterToClass: String,
	  leaveToClass: String,
	  enterActiveClass: String,
	  leaveActiveClass: String,
	  appearClass: String,
	  appearActiveClass: String,
	  appearToClass: String,
	  duration: [Number, String, Object]
	};
	
	// in case the child is also an abstract component, e.g. <keep-alive>
	// we want to recursively retrieve the real component to be rendered
	function getRealChild (vnode) {
	  var compOptions = vnode && vnode.componentOptions;
	  if (compOptions && compOptions.Ctor.options.abstract) {
	    return getRealChild(getFirstComponentChild(compOptions.children))
	  } else {
	    return vnode
	  }
	}
	
	function extractTransitionData (comp) {
	  var data = {};
	  var options = comp.$options;
	  // props
	  for (var key in options.propsData) {
	    data[key] = comp[key];
	  }
	  // events.
	  // extract listeners and pass them directly to the transition methods
	  var listeners = options._parentListeners;
	  for (var key$1 in listeners) {
	    data[camelize(key$1)] = listeners[key$1];
	  }
	  return data
	}
	
	function placeholder (h, rawChild) {
	  if (/\d-keep-alive$/.test(rawChild.tag)) {
	    return h('keep-alive', {
	      props: rawChild.componentOptions.propsData
	    })
	  }
	}
	
	function hasParentTransition (vnode) {
	  while ((vnode = vnode.parent)) {
	    if (vnode.data.transition) {
	      return true
	    }
	  }
	}
	
	function isSameChild (child, oldChild) {
	  return oldChild.key === child.key && oldChild.tag === child.tag
	}
	
	var Transition = {
	  name: 'transition',
	  props: transitionProps,
	  abstract: true,
	
	  render: function render (h) {
	    var this$1 = this;
	
	    var children = this.$slots.default;
	    if (!children) {
	      return
	    }
	
	    // filter out text nodes (possible whitespaces)
	    children = children.filter(function (c) { return c.tag; });
	    /* istanbul ignore if */
	    if (!children.length) {
	      return
	    }
	
	    // warn multiple elements
	    if ("development" !== 'production' && children.length > 1) {
	      warn(
	        '<transition> can only be used on a single element. Use ' +
	        '<transition-group> for lists.',
	        this.$parent
	      );
	    }
	
	    var mode = this.mode;
	
	    // warn invalid mode
	    if ("development" !== 'production' &&
	      mode && mode !== 'in-out' && mode !== 'out-in'
	    ) {
	      warn(
	        'invalid <transition> mode: ' + mode,
	        this.$parent
	      );
	    }
	
	    var rawChild = children[0];
	
	    // if this is a component root node and the component's
	    // parent container node also has transition, skip.
	    if (hasParentTransition(this.$vnode)) {
	      return rawChild
	    }
	
	    // apply transition data to child
	    // use getRealChild() to ignore abstract components e.g. keep-alive
	    var child = getRealChild(rawChild);
	    /* istanbul ignore if */
	    if (!child) {
	      return rawChild
	    }
	
	    if (this._leaving) {
	      return placeholder(h, rawChild)
	    }
	
	    // ensure a key that is unique to the vnode type and to this transition
	    // component instance. This key will be used to remove pending leaving nodes
	    // during entering.
	    var id = "__transition-" + (this._uid) + "-";
	    child.key = child.key == null
	      ? id + child.tag
	      : isPrimitive(child.key)
	        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
	        : child.key;
	
	    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
	    var oldRawChild = this._vnode;
	    var oldChild = getRealChild(oldRawChild);
	
	    // mark v-show
	    // so that the transition module can hand over the control to the directive
	    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
	      child.data.show = true;
	    }
	
	    if (oldChild && oldChild.data && !isSameChild(child, oldChild)) {
	      // replace old child transition data with fresh one
	      // important for dynamic transitions!
	      var oldData = oldChild && (oldChild.data.transition = extend({}, data));
	      // handle transition mode
	      if (mode === 'out-in') {
	        // return placeholder node and queue update when leave finishes
	        this._leaving = true;
	        mergeVNodeHook(oldData, 'afterLeave', function () {
	          this$1._leaving = false;
	          this$1.$forceUpdate();
	        });
	        return placeholder(h, rawChild)
	      } else if (mode === 'in-out') {
	        var delayedLeave;
	        var performLeave = function () { delayedLeave(); };
	        mergeVNodeHook(data, 'afterEnter', performLeave);
	        mergeVNodeHook(data, 'enterCancelled', performLeave);
	        mergeVNodeHook(oldData, 'delayLeave', function (leave) { delayedLeave = leave; });
	      }
	    }
	
	    return rawChild
	  }
	};
	
	/*  */
	
	// Provides transition support for list items.
	// supports move transitions using the FLIP technique.
	
	// Because the vdom's children update algorithm is "unstable" - i.e.
	// it doesn't guarantee the relative positioning of removed elements,
	// we force transition-group to update its children into two passes:
	// in the first pass, we remove all nodes that need to be removed,
	// triggering their leaving transition; in the second pass, we insert/move
	// into the final desired state. This way in the second pass removed
	// nodes will remain where they should be.
	
	var props = extend({
	  tag: String,
	  moveClass: String
	}, transitionProps);
	
	delete props.mode;
	
	var TransitionGroup = {
	  props: props,
	
	  render: function render (h) {
	    var tag = this.tag || this.$vnode.data.tag || 'span';
	    var map = Object.create(null);
	    var prevChildren = this.prevChildren = this.children;
	    var rawChildren = this.$slots.default || [];
	    var children = this.children = [];
	    var transitionData = extractTransitionData(this);
	
	    for (var i = 0; i < rawChildren.length; i++) {
	      var c = rawChildren[i];
	      if (c.tag) {
	        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
	          children.push(c);
	          map[c.key] = c
	          ;(c.data || (c.data = {})).transition = transitionData;
	        } else {
	          var opts = c.componentOptions;
	          var name = opts ? (opts.Ctor.options.name || opts.tag || '') : c.tag;
	          warn(("<transition-group> children must be keyed: <" + name + ">"));
	        }
	      }
	    }
	
	    if (prevChildren) {
	      var kept = [];
	      var removed = [];
	      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
	        var c$1 = prevChildren[i$1];
	        c$1.data.transition = transitionData;
	        c$1.data.pos = c$1.elm.getBoundingClientRect();
	        if (map[c$1.key]) {
	          kept.push(c$1);
	        } else {
	          removed.push(c$1);
	        }
	      }
	      this.kept = h(tag, null, kept);
	      this.removed = removed;
	    }
	
	    return h(tag, null, children)
	  },
	
	  beforeUpdate: function beforeUpdate () {
	    // force removing pass
	    this.__patch__(
	      this._vnode,
	      this.kept,
	      false, // hydrating
	      true // removeOnly (!important, avoids unnecessary moves)
	    );
	    this._vnode = this.kept;
	  },
	
	  updated: function updated () {
	    var children = this.prevChildren;
	    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
	    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
	      return
	    }
	
	    // we divide the work into three loops to avoid mixing DOM reads and writes
	    // in each iteration - which helps prevent layout thrashing.
	    children.forEach(callPendingCbs);
	    children.forEach(recordPosition);
	    children.forEach(applyTranslation);
	
	    // force reflow to put everything in position
	    var body = document.body;
	    var f = body.offsetHeight; // eslint-disable-line
	
	    children.forEach(function (c) {
	      if (c.data.moved) {
	        var el = c.elm;
	        var s = el.style;
	        addTransitionClass(el, moveClass);
	        s.transform = s.WebkitTransform = s.transitionDuration = '';
	        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
	          if (!e || /transform$/.test(e.propertyName)) {
	            el.removeEventListener(transitionEndEvent, cb);
	            el._moveCb = null;
	            removeTransitionClass(el, moveClass);
	          }
	        });
	      }
	    });
	  },
	
	  methods: {
	    hasMove: function hasMove (el, moveClass) {
	      /* istanbul ignore if */
	      if (!hasTransition) {
	        return false
	      }
	      if (this._hasMove != null) {
	        return this._hasMove
	      }
	      // Detect whether an element with the move class applied has
	      // CSS transitions. Since the element may be inside an entering
	      // transition at this very moment, we make a clone of it and remove
	      // all other transition classes applied to ensure only the move class
	      // is applied.
	      var clone = el.cloneNode();
	      if (el._transitionClasses) {
	        el._transitionClasses.forEach(function (cls) { removeClass(clone, cls); });
	      }
	      addClass(clone, moveClass);
	      clone.style.display = 'none';
	      this.$el.appendChild(clone);
	      var info = getTransitionInfo(clone);
	      this.$el.removeChild(clone);
	      return (this._hasMove = info.hasTransform)
	    }
	  }
	};
	
	function callPendingCbs (c) {
	  /* istanbul ignore if */
	  if (c.elm._moveCb) {
	    c.elm._moveCb();
	  }
	  /* istanbul ignore if */
	  if (c.elm._enterCb) {
	    c.elm._enterCb();
	  }
	}
	
	function recordPosition (c) {
	  c.data.newPos = c.elm.getBoundingClientRect();
	}
	
	function applyTranslation (c) {
	  var oldPos = c.data.pos;
	  var newPos = c.data.newPos;
	  var dx = oldPos.left - newPos.left;
	  var dy = oldPos.top - newPos.top;
	  if (dx || dy) {
	    c.data.moved = true;
	    var s = c.elm.style;
	    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
	    s.transitionDuration = '0s';
	  }
	}
	
	var platformComponents = {
	  Transition: Transition,
	  TransitionGroup: TransitionGroup
	};
	
	/*  */
	
	// install platform specific utils
	Vue$3.config.mustUseProp = mustUseProp;
	Vue$3.config.isReservedTag = isReservedTag;
	Vue$3.config.isReservedAttr = isReservedAttr;
	Vue$3.config.getTagNamespace = getTagNamespace;
	Vue$3.config.isUnknownElement = isUnknownElement;
	
	// install platform runtime directives & components
	extend(Vue$3.options.directives, platformDirectives);
	extend(Vue$3.options.components, platformComponents);
	
	// install platform patch function
	Vue$3.prototype.__patch__ = inBrowser ? patch : noop;
	
	// public mount method
	Vue$3.prototype.$mount = function (
	  el,
	  hydrating
	) {
	  el = el && inBrowser ? query(el) : undefined;
	  return mountComponent(this, el, hydrating)
	};
	
	// devtools global hook
	/* istanbul ignore next */
	setTimeout(function () {
	  if (config.devtools) {
	    if (devtools) {
	      devtools.emit('init', Vue$3);
	    } else if ("development" !== 'production' && isChrome) {
	      console[console.info ? 'info' : 'log'](
	        'Download the Vue Devtools extension for a better development experience:\n' +
	        'https://github.com/vuejs/vue-devtools'
	      );
	    }
	  }
	  if ("development" !== 'production' &&
	    config.productionTip !== false &&
	    inBrowser && typeof console !== 'undefined'
	  ) {
	    console[console.info ? 'info' : 'log'](
	      "You are running Vue in development mode.\n" +
	      "Make sure to turn on production mode when deploying for production.\n" +
	      "See more tips at https://vuejs.org/guide/deployment.html"
	    );
	  }
	}, 0);
	
	/*  */
	
	// check whether current browser encodes a char inside attribute values
	function shouldDecode (content, encoded) {
	  var div = document.createElement('div');
	  div.innerHTML = "<div a=\"" + content + "\">";
	  return div.innerHTML.indexOf(encoded) > 0
	}
	
	// #3663
	// IE encodes newlines inside attribute values while other browsers don't
	var shouldDecodeNewlines = inBrowser ? shouldDecode('\n', '&#10;') : false;
	
	/*  */
	
	var isUnaryTag = makeMap(
	  'area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
	  'link,meta,param,source,track,wbr'
	);
	
	// Elements that you can, intentionally, leave open
	// (and which close themselves)
	var canBeLeftOpenTag = makeMap(
	  'colgroup,dd,dt,li,options,p,td,tfoot,th,thead,tr,source'
	);
	
	// HTML5 tags https://html.spec.whatwg.org/multipage/indices.html#elements-3
	// Phrasing Content https://html.spec.whatwg.org/multipage/dom.html#phrasing-content
	var isNonPhrasingTag = makeMap(
	  'address,article,aside,base,blockquote,body,caption,col,colgroup,dd,' +
	  'details,dialog,div,dl,dt,fieldset,figcaption,figure,footer,form,' +
	  'h1,h2,h3,h4,h5,h6,head,header,hgroup,hr,html,legend,li,menuitem,meta,' +
	  'optgroup,option,param,rp,rt,source,style,summary,tbody,td,tfoot,th,thead,' +
	  'title,tr,track'
	);
	
	/*  */
	
	var decoder;
	
	function decode (html) {
	  decoder = decoder || document.createElement('div');
	  decoder.innerHTML = html;
	  return decoder.textContent
	}
	
	/**
	 * Not type-checking this file because it's mostly vendor code.
	 */
	
	/*!
	 * HTML Parser By John Resig (ejohn.org)
	 * Modified by Juriy "kangax" Zaytsev
	 * Original code by Erik Arvidsson, Mozilla Public License
	 * http://erik.eae.net/simplehtmlparser/simplehtmlparser.js
	 */
	
	// Regular Expressions for parsing tags and attributes
	var singleAttrIdentifier = /([^\s"'<>/=]+)/;
	var singleAttrAssign = /(?:=)/;
	var singleAttrValues = [
	  // attr value double quotes
	  /"([^"]*)"+/.source,
	  // attr value, single quotes
	  /'([^']*)'+/.source,
	  // attr value, no quotes
	  /([^\s"'=<>`]+)/.source
	];
	var attribute = new RegExp(
	  '^\\s*' + singleAttrIdentifier.source +
	  '(?:\\s*(' + singleAttrAssign.source + ')' +
	  '\\s*(?:' + singleAttrValues.join('|') + '))?'
	);
	
	// could use https://www.w3.org/TR/1999/REC-xml-names-19990114/#NT-QName
	// but for Vue templates we can enforce a simple charset
	var ncname = '[a-zA-Z_][\\w\\-\\.]*';
	var qnameCapture = '((?:' + ncname + '\\:)?' + ncname + ')';
	var startTagOpen = new RegExp('^<' + qnameCapture);
	var startTagClose = /^\s*(\/?)>/;
	var endTag = new RegExp('^<\\/' + qnameCapture + '[^>]*>');
	var doctype = /^<!DOCTYPE [^>]+>/i;
	var comment = /^<!--/;
	var conditionalComment = /^<!\[/;
	
	var IS_REGEX_CAPTURING_BROKEN = false;
	'x'.replace(/x(.)?/g, function (m, g) {
	  IS_REGEX_CAPTURING_BROKEN = g === '';
	});
	
	// Special Elements (can contain anything)
	var isPlainTextElement = makeMap('script,style,textarea', true);
	var reCache = {};
	
	var decodingMap = {
	  '&lt;': '<',
	  '&gt;': '>',
	  '&quot;': '"',
	  '&amp;': '&',
	  '&#10;': '\n'
	};
	var encodedAttr = /&(?:lt|gt|quot|amp);/g;
	var encodedAttrWithNewLines = /&(?:lt|gt|quot|amp|#10);/g;
	
	function decodeAttr (value, shouldDecodeNewlines) {
	  var re = shouldDecodeNewlines ? encodedAttrWithNewLines : encodedAttr;
	  return value.replace(re, function (match) { return decodingMap[match]; })
	}
	
	function parseHTML (html, options) {
	  var stack = [];
	  var expectHTML = options.expectHTML;
	  var isUnaryTag$$1 = options.isUnaryTag || no;
	  var canBeLeftOpenTag$$1 = options.canBeLeftOpenTag || no;
	  var index = 0;
	  var last, lastTag;
	  while (html) {
	    last = html;
	    // Make sure we're not in a plaintext content element like script/style
	    if (!lastTag || !isPlainTextElement(lastTag)) {
	      var textEnd = html.indexOf('<');
	      if (textEnd === 0) {
	        // Comment:
	        if (comment.test(html)) {
	          var commentEnd = html.indexOf('-->');
	
	          if (commentEnd >= 0) {
	            advance(commentEnd + 3);
	            continue
	          }
	        }
	
	        // http://en.wikipedia.org/wiki/Conditional_comment#Downlevel-revealed_conditional_comment
	        if (conditionalComment.test(html)) {
	          var conditionalEnd = html.indexOf(']>');
	
	          if (conditionalEnd >= 0) {
	            advance(conditionalEnd + 2);
	            continue
	          }
	        }
	
	        // Doctype:
	        var doctypeMatch = html.match(doctype);
	        if (doctypeMatch) {
	          advance(doctypeMatch[0].length);
	          continue
	        }
	
	        // End tag:
	        var endTagMatch = html.match(endTag);
	        if (endTagMatch) {
	          var curIndex = index;
	          advance(endTagMatch[0].length);
	          parseEndTag(endTagMatch[1], curIndex, index);
	          continue
	        }
	
	        // Start tag:
	        var startTagMatch = parseStartTag();
	        if (startTagMatch) {
	          handleStartTag(startTagMatch);
	          continue
	        }
	      }
	
	      var text = (void 0), rest$1 = (void 0), next = (void 0);
	      if (textEnd >= 0) {
	        rest$1 = html.slice(textEnd);
	        while (
	          !endTag.test(rest$1) &&
	          !startTagOpen.test(rest$1) &&
	          !comment.test(rest$1) &&
	          !conditionalComment.test(rest$1)
	        ) {
	          // < in plain text, be forgiving and treat it as text
	          next = rest$1.indexOf('<', 1);
	          if (next < 0) { break }
	          textEnd += next;
	          rest$1 = html.slice(textEnd);
	        }
	        text = html.substring(0, textEnd);
	        advance(textEnd);
	      }
	
	      if (textEnd < 0) {
	        text = html;
	        html = '';
	      }
	
	      if (options.chars && text) {
	        options.chars(text);
	      }
	    } else {
	      var stackedTag = lastTag.toLowerCase();
	      var reStackedTag = reCache[stackedTag] || (reCache[stackedTag] = new RegExp('([\\s\\S]*?)(</' + stackedTag + '[^>]*>)', 'i'));
	      var endTagLength = 0;
	      var rest = html.replace(reStackedTag, function (all, text, endTag) {
	        endTagLength = endTag.length;
	        if (!isPlainTextElement(stackedTag) && stackedTag !== 'noscript') {
	          text = text
	            .replace(/<!--([\s\S]*?)-->/g, '$1')
	            .replace(/<!\[CDATA\[([\s\S]*?)]]>/g, '$1');
	        }
	        if (options.chars) {
	          options.chars(text);
	        }
	        return ''
	      });
	      index += html.length - rest.length;
	      html = rest;
	      parseEndTag(stackedTag, index - endTagLength, index);
	    }
	
	    if (html === last) {
	      options.chars && options.chars(html);
	      if ("development" !== 'production' && !stack.length && options.warn) {
	        options.warn(("Mal-formatted tag at end of template: \"" + html + "\""));
	      }
	      break
	    }
	  }
	
	  // Clean up any remaining tags
	  parseEndTag();
	
	  function advance (n) {
	    index += n;
	    html = html.substring(n);
	  }
	
	  function parseStartTag () {
	    var start = html.match(startTagOpen);
	    if (start) {
	      var match = {
	        tagName: start[1],
	        attrs: [],
	        start: index
	      };
	      advance(start[0].length);
	      var end, attr;
	      while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
	        advance(attr[0].length);
	        match.attrs.push(attr);
	      }
	      if (end) {
	        match.unarySlash = end[1];
	        advance(end[0].length);
	        match.end = index;
	        return match
	      }
	    }
	  }
	
	  function handleStartTag (match) {
	    var tagName = match.tagName;
	    var unarySlash = match.unarySlash;
	
	    if (expectHTML) {
	      if (lastTag === 'p' && isNonPhrasingTag(tagName)) {
	        parseEndTag(lastTag);
	      }
	      if (canBeLeftOpenTag$$1(tagName) && lastTag === tagName) {
	        parseEndTag(tagName);
	      }
	    }
	
	    var unary = isUnaryTag$$1(tagName) || tagName === 'html' && lastTag === 'head' || !!unarySlash;
	
	    var l = match.attrs.length;
	    var attrs = new Array(l);
	    for (var i = 0; i < l; i++) {
	      var args = match.attrs[i];
	      // hackish work around FF bug https://bugzilla.mozilla.org/show_bug.cgi?id=369778
	      if (IS_REGEX_CAPTURING_BROKEN && args[0].indexOf('""') === -1) {
	        if (args[3] === '') { delete args[3]; }
	        if (args[4] === '') { delete args[4]; }
	        if (args[5] === '') { delete args[5]; }
	      }
	      var value = args[3] || args[4] || args[5] || '';
	      attrs[i] = {
	        name: args[1],
	        value: decodeAttr(
	          value,
	          options.shouldDecodeNewlines
	        )
	      };
	    }
	
	    if (!unary) {
	      stack.push({ tag: tagName, lowerCasedTag: tagName.toLowerCase(), attrs: attrs });
	      lastTag = tagName;
	    }
	
	    if (options.start) {
	      options.start(tagName, attrs, unary, match.start, match.end);
	    }
	  }
	
	  function parseEndTag (tagName, start, end) {
	    var pos, lowerCasedTagName;
	    if (start == null) { start = index; }
	    if (end == null) { end = index; }
	
	    if (tagName) {
	      lowerCasedTagName = tagName.toLowerCase();
	    }
	
	    // Find the closest opened tag of the same type
	    if (tagName) {
	      for (pos = stack.length - 1; pos >= 0; pos--) {
	        if (stack[pos].lowerCasedTag === lowerCasedTagName) {
	          break
	        }
	      }
	    } else {
	      // If no tag name is provided, clean shop
	      pos = 0;
	    }
	
	    if (pos >= 0) {
	      // Close all the open elements, up the stack
	      for (var i = stack.length - 1; i >= pos; i--) {
	        if ("development" !== 'production' &&
	          (i > pos || !tagName) &&
	          options.warn
	        ) {
	          options.warn(
	            ("tag <" + (stack[i].tag) + "> has no matching end tag.")
	          );
	        }
	        if (options.end) {
	          options.end(stack[i].tag, start, end);
	        }
	      }
	
	      // Remove the open elements from the stack
	      stack.length = pos;
	      lastTag = pos && stack[pos - 1].tag;
	    } else if (lowerCasedTagName === 'br') {
	      if (options.start) {
	        options.start(tagName, [], true, start, end);
	      }
	    } else if (lowerCasedTagName === 'p') {
	      if (options.start) {
	        options.start(tagName, [], false, start, end);
	      }
	      if (options.end) {
	        options.end(tagName, start, end);
	      }
	    }
	  }
	}
	
	/*  */
	
	var defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;
	var regexEscapeRE = /[-.*+?^${}()|[\]\/\\]/g;
	
	var buildRegex = cached(function (delimiters) {
	  var open = delimiters[0].replace(regexEscapeRE, '\\$&');
	  var close = delimiters[1].replace(regexEscapeRE, '\\$&');
	  return new RegExp(open + '((?:.|\\n)+?)' + close, 'g')
	});
	
	function parseText (
	  text,
	  delimiters
	) {
	  var tagRE = delimiters ? buildRegex(delimiters) : defaultTagRE;
	  if (!tagRE.test(text)) {
	    return
	  }
	  var tokens = [];
	  var lastIndex = tagRE.lastIndex = 0;
	  var match, index;
	  while ((match = tagRE.exec(text))) {
	    index = match.index;
	    // push text token
	    if (index > lastIndex) {
	      tokens.push(JSON.stringify(text.slice(lastIndex, index)));
	    }
	    // tag token
	    var exp = parseFilters(match[1].trim());
	    tokens.push(("_s(" + exp + ")"));
	    lastIndex = index + match[0].length;
	  }
	  if (lastIndex < text.length) {
	    tokens.push(JSON.stringify(text.slice(lastIndex)));
	  }
	  return tokens.join('+')
	}
	
	/*  */
	
	var onRE = /^@|^v-on:/;
	var dirRE = /^v-|^@|^:/;
	var forAliasRE = /(.*?)\s+(?:in|of)\s+(.*)/;
	var forIteratorRE = /\((\{[^}]*\}|[^,]*),([^,]*)(?:,([^,]*))?\)/;
	
	var argRE = /:(.*)$/;
	var bindRE = /^:|^v-bind:/;
	var modifierRE = /\.[^.]+/g;
	
	var decodeHTMLCached = cached(decode);
	
	// configurable state
	var warn$2;
	var delimiters;
	var transforms;
	var preTransforms;
	var postTransforms;
	var platformIsPreTag;
	var platformMustUseProp;
	var platformGetTagNamespace;
	
	/**
	 * Convert HTML string to AST.
	 */
	function parse (
	  template,
	  options
	) {
	  warn$2 = options.warn || baseWarn;
	  platformGetTagNamespace = options.getTagNamespace || no;
	  platformMustUseProp = options.mustUseProp || no;
	  platformIsPreTag = options.isPreTag || no;
	  preTransforms = pluckModuleFunction(options.modules, 'preTransformNode');
	  transforms = pluckModuleFunction(options.modules, 'transformNode');
	  postTransforms = pluckModuleFunction(options.modules, 'postTransformNode');
	  delimiters = options.delimiters;
	
	  var stack = [];
	  var preserveWhitespace = options.preserveWhitespace !== false;
	  var root;
	  var currentParent;
	  var inVPre = false;
	  var inPre = false;
	  var warned = false;
	
	  function warnOnce (msg) {
	    if (!warned) {
	      warned = true;
	      warn$2(msg);
	    }
	  }
	
	  function endPre (element) {
	    // check pre state
	    if (element.pre) {
	      inVPre = false;
	    }
	    if (platformIsPreTag(element.tag)) {
	      inPre = false;
	    }
	  }
	
	  parseHTML(template, {
	    warn: warn$2,
	    expectHTML: options.expectHTML,
	    isUnaryTag: options.isUnaryTag,
	    canBeLeftOpenTag: options.canBeLeftOpenTag,
	    shouldDecodeNewlines: options.shouldDecodeNewlines,
	    start: function start (tag, attrs, unary) {
	      // check namespace.
	      // inherit parent ns if there is one
	      var ns = (currentParent && currentParent.ns) || platformGetTagNamespace(tag);
	
	      // handle IE svg bug
	      /* istanbul ignore if */
	      if (isIE && ns === 'svg') {
	        attrs = guardIESVGBug(attrs);
	      }
	
	      var element = {
	        type: 1,
	        tag: tag,
	        attrsList: attrs,
	        attrsMap: makeAttrsMap(attrs),
	        parent: currentParent,
	        children: []
	      };
	      if (ns) {
	        element.ns = ns;
	      }
	
	      if (isForbiddenTag(element) && !isServerRendering()) {
	        element.forbidden = true;
	        "development" !== 'production' && warn$2(
	          'Templates should only be responsible for mapping the state to the ' +
	          'UI. Avoid placing tags with side-effects in your templates, such as ' +
	          "<" + tag + ">" + ', as they will not be parsed.'
	        );
	      }
	
	      // apply pre-transforms
	      for (var i = 0; i < preTransforms.length; i++) {
	        preTransforms[i](element, options);
	      }
	
	      if (!inVPre) {
	        processPre(element);
	        if (element.pre) {
	          inVPre = true;
	        }
	      }
	      if (platformIsPreTag(element.tag)) {
	        inPre = true;
	      }
	      if (inVPre) {
	        processRawAttrs(element);
	      } else {
	        processFor(element);
	        processIf(element);
	        processOnce(element);
	        processKey(element);
	
	        // determine whether this is a plain element after
	        // removing structural attributes
	        element.plain = !element.key && !attrs.length;
	
	        processRef(element);
	        processSlot(element);
	        processComponent(element);
	        for (var i$1 = 0; i$1 < transforms.length; i$1++) {
	          transforms[i$1](element, options);
	        }
	        processAttrs(element);
	      }
	
	      function checkRootConstraints (el) {
	        {
	          if (el.tag === 'slot' || el.tag === 'template') {
	            warnOnce(
	              "Cannot use <" + (el.tag) + "> as component root element because it may " +
	              'contain multiple nodes.'
	            );
	          }
	          if (el.attrsMap.hasOwnProperty('v-for')) {
	            warnOnce(
	              'Cannot use v-for on stateful component root element because ' +
	              'it renders multiple elements.'
	            );
	          }
	        }
	      }
	
	      // tree management
	      if (!root) {
	        root = element;
	        checkRootConstraints(root);
	      } else if (!stack.length) {
	        // allow root elements with v-if, v-else-if and v-else
	        if (root.if && (element.elseif || element.else)) {
	          checkRootConstraints(element);
	          addIfCondition(root, {
	            exp: element.elseif,
	            block: element
	          });
	        } else {
	          warnOnce(
	            "Component template should contain exactly one root element. " +
	            "If you are using v-if on multiple elements, " +
	            "use v-else-if to chain them instead."
	          );
	        }
	      }
	      if (currentParent && !element.forbidden) {
	        if (element.elseif || element.else) {
	          processIfConditions(element, currentParent);
	        } else if (element.slotScope) { // scoped slot
	          currentParent.plain = false;
	          var name = element.slotTarget || '"default"';(currentParent.scopedSlots || (currentParent.scopedSlots = {}))[name] = element;
	        } else {
	          currentParent.children.push(element);
	          element.parent = currentParent;
	        }
	      }
	      if (!unary) {
	        currentParent = element;
	        stack.push(element);
	      } else {
	        endPre(element);
	      }
	      // apply post-transforms
	      for (var i$2 = 0; i$2 < postTransforms.length; i$2++) {
	        postTransforms[i$2](element, options);
	      }
	    },
	
	    end: function end () {
	      // remove trailing whitespace
	      var element = stack[stack.length - 1];
	      var lastNode = element.children[element.children.length - 1];
	      if (lastNode && lastNode.type === 3 && lastNode.text === ' ' && !inPre) {
	        element.children.pop();
	      }
	      // pop stack
	      stack.length -= 1;
	      currentParent = stack[stack.length - 1];
	      endPre(element);
	    },
	
	    chars: function chars (text) {
	      if (!currentParent) {
	        {
	          if (text === template) {
	            warnOnce(
	              'Component template requires a root element, rather than just text.'
	            );
	          } else if ((text = text.trim())) {
	            warnOnce(
	              ("text \"" + text + "\" outside root element will be ignored.")
	            );
	          }
	        }
	        return
	      }
	      // IE textarea placeholder bug
	      /* istanbul ignore if */
	      if (isIE &&
	        currentParent.tag === 'textarea' &&
	        currentParent.attrsMap.placeholder === text
	      ) {
	        return
	      }
	      var children = currentParent.children;
	      text = inPre || text.trim()
	        ? isTextTag(currentParent) ? text : decodeHTMLCached(text)
	        // only preserve whitespace if its not right after a starting tag
	        : preserveWhitespace && children.length ? ' ' : '';
	      if (text) {
	        var expression;
	        if (!inVPre && text !== ' ' && (expression = parseText(text, delimiters))) {
	          children.push({
	            type: 2,
	            expression: expression,
	            text: text
	          });
	        } else if (text !== ' ' || !children.length || children[children.length - 1].text !== ' ') {
	          children.push({
	            type: 3,
	            text: text
	          });
	        }
	      }
	    }
	  });
	  return root
	}
	
	function processPre (el) {
	  if (getAndRemoveAttr(el, 'v-pre') != null) {
	    el.pre = true;
	  }
	}
	
	function processRawAttrs (el) {
	  var l = el.attrsList.length;
	  if (l) {
	    var attrs = el.attrs = new Array(l);
	    for (var i = 0; i < l; i++) {
	      attrs[i] = {
	        name: el.attrsList[i].name,
	        value: JSON.stringify(el.attrsList[i].value)
	      };
	    }
	  } else if (!el.pre) {
	    // non root node in pre blocks with no attributes
	    el.plain = true;
	  }
	}
	
	function processKey (el) {
	  var exp = getBindingAttr(el, 'key');
	  if (exp) {
	    if ("development" !== 'production' && el.tag === 'template') {
	      warn$2("<template> cannot be keyed. Place the key on real elements instead.");
	    }
	    el.key = exp;
	  }
	}
	
	function processRef (el) {
	  var ref = getBindingAttr(el, 'ref');
	  if (ref) {
	    el.ref = ref;
	    el.refInFor = checkInFor(el);
	  }
	}
	
	function processFor (el) {
	  var exp;
	  if ((exp = getAndRemoveAttr(el, 'v-for'))) {
	    var inMatch = exp.match(forAliasRE);
	    if (!inMatch) {
	      "development" !== 'production' && warn$2(
	        ("Invalid v-for expression: " + exp)
	      );
	      return
	    }
	    el.for = inMatch[2].trim();
	    var alias = inMatch[1].trim();
	    var iteratorMatch = alias.match(forIteratorRE);
	    if (iteratorMatch) {
	      el.alias = iteratorMatch[1].trim();
	      el.iterator1 = iteratorMatch[2].trim();
	      if (iteratorMatch[3]) {
	        el.iterator2 = iteratorMatch[3].trim();
	      }
	    } else {
	      el.alias = alias;
	    }
	  }
	}
	
	function processIf (el) {
	  var exp = getAndRemoveAttr(el, 'v-if');
	  if (exp) {
	    el.if = exp;
	    addIfCondition(el, {
	      exp: exp,
	      block: el
	    });
	  } else {
	    if (getAndRemoveAttr(el, 'v-else') != null) {
	      el.else = true;
	    }
	    var elseif = getAndRemoveAttr(el, 'v-else-if');
	    if (elseif) {
	      el.elseif = elseif;
	    }
	  }
	}
	
	function processIfConditions (el, parent) {
	  var prev = findPrevElement(parent.children);
	  if (prev && prev.if) {
	    addIfCondition(prev, {
	      exp: el.elseif,
	      block: el
	    });
	  } else {
	    warn$2(
	      "v-" + (el.elseif ? ('else-if="' + el.elseif + '"') : 'else') + " " +
	      "used on element <" + (el.tag) + "> without corresponding v-if."
	    );
	  }
	}
	
	function findPrevElement (children) {
	  var i = children.length;
	  while (i--) {
	    if (children[i].type === 1) {
	      return children[i]
	    } else {
	      if ("development" !== 'production' && children[i].text !== ' ') {
	        warn$2(
	          "text \"" + (children[i].text.trim()) + "\" between v-if and v-else(-if) " +
	          "will be ignored."
	        );
	      }
	      children.pop();
	    }
	  }
	}
	
	function addIfCondition (el, condition) {
	  if (!el.ifConditions) {
	    el.ifConditions = [];
	  }
	  el.ifConditions.push(condition);
	}
	
	function processOnce (el) {
	  var once$$1 = getAndRemoveAttr(el, 'v-once');
	  if (once$$1 != null) {
	    el.once = true;
	  }
	}
	
	function processSlot (el) {
	  if (el.tag === 'slot') {
	    el.slotName = getBindingAttr(el, 'name');
	    if ("development" !== 'production' && el.key) {
	      warn$2(
	        "`key` does not work on <slot> because slots are abstract outlets " +
	        "and can possibly expand into multiple elements. " +
	        "Use the key on a wrapping element instead."
	      );
	    }
	  } else {
	    var slotTarget = getBindingAttr(el, 'slot');
	    if (slotTarget) {
	      el.slotTarget = slotTarget === '""' ? '"default"' : slotTarget;
	    }
	    if (el.tag === 'template') {
	      el.slotScope = getAndRemoveAttr(el, 'scope');
	    }
	  }
	}
	
	function processComponent (el) {
	  var binding;
	  if ((binding = getBindingAttr(el, 'is'))) {
	    el.component = binding;
	  }
	  if (getAndRemoveAttr(el, 'inline-template') != null) {
	    el.inlineTemplate = true;
	  }
	}
	
	function processAttrs (el) {
	  var list = el.attrsList;
	  var i, l, name, rawName, value, modifiers, isProp;
	  for (i = 0, l = list.length; i < l; i++) {
	    name = rawName = list[i].name;
	    value = list[i].value;
	    if (dirRE.test(name)) {
	      // mark element as dynamic
	      el.hasBindings = true;
	      // modifiers
	      modifiers = parseModifiers(name);
	      if (modifiers) {
	        name = name.replace(modifierRE, '');
	      }
	      if (bindRE.test(name)) { // v-bind
	        name = name.replace(bindRE, '');
	        value = parseFilters(value);
	        isProp = false;
	        if (modifiers) {
	          if (modifiers.prop) {
	            isProp = true;
	            name = camelize(name);
	            if (name === 'innerHtml') { name = 'innerHTML'; }
	          }
	          if (modifiers.camel) {
	            name = camelize(name);
	          }
	          if (modifiers.sync) {
	            addHandler(
	              el,
	              ("update:" + (camelize(name))),
	              genAssignmentCode(value, "$event")
	            );
	          }
	        }
	        if (isProp || platformMustUseProp(el.tag, el.attrsMap.type, name)) {
	          addProp(el, name, value);
	        } else {
	          addAttr(el, name, value);
	        }
	      } else if (onRE.test(name)) { // v-on
	        name = name.replace(onRE, '');
	        addHandler(el, name, value, modifiers, false, warn$2);
	      } else { // normal directives
	        name = name.replace(dirRE, '');
	        // parse arg
	        var argMatch = name.match(argRE);
	        var arg = argMatch && argMatch[1];
	        if (arg) {
	          name = name.slice(0, -(arg.length + 1));
	        }
	        addDirective(el, name, rawName, value, arg, modifiers);
	        if ("development" !== 'production' && name === 'model') {
	          checkForAliasModel(el, value);
	        }
	      }
	    } else {
	      // literal attribute
	      {
	        var expression = parseText(value, delimiters);
	        if (expression) {
	          warn$2(
	            name + "=\"" + value + "\": " +
	            'Interpolation inside attributes has been removed. ' +
	            'Use v-bind or the colon shorthand instead. For example, ' +
	            'instead of <div id="{{ val }}">, use <div :id="val">.'
	          );
	        }
	      }
	      addAttr(el, name, JSON.stringify(value));
	    }
	  }
	}
	
	function checkInFor (el) {
	  var parent = el;
	  while (parent) {
	    if (parent.for !== undefined) {
	      return true
	    }
	    parent = parent.parent;
	  }
	  return false
	}
	
	function parseModifiers (name) {
	  var match = name.match(modifierRE);
	  if (match) {
	    var ret = {};
	    match.forEach(function (m) { ret[m.slice(1)] = true; });
	    return ret
	  }
	}
	
	function makeAttrsMap (attrs) {
	  var map = {};
	  for (var i = 0, l = attrs.length; i < l; i++) {
	    if (
	      "development" !== 'production' &&
	      map[attrs[i].name] && !isIE && !isEdge
	    ) {
	      warn$2('duplicate attribute: ' + attrs[i].name);
	    }
	    map[attrs[i].name] = attrs[i].value;
	  }
	  return map
	}
	
	// for script (e.g. type="x/template") or style, do not decode content
	function isTextTag (el) {
	  return el.tag === 'script' || el.tag === 'style'
	}
	
	function isForbiddenTag (el) {
	  return (
	    el.tag === 'style' ||
	    (el.tag === 'script' && (
	      !el.attrsMap.type ||
	      el.attrsMap.type === 'text/javascript'
	    ))
	  )
	}
	
	var ieNSBug = /^xmlns:NS\d+/;
	var ieNSPrefix = /^NS\d+:/;
	
	/* istanbul ignore next */
	function guardIESVGBug (attrs) {
	  var res = [];
	  for (var i = 0; i < attrs.length; i++) {
	    var attr = attrs[i];
	    if (!ieNSBug.test(attr.name)) {
	      attr.name = attr.name.replace(ieNSPrefix, '');
	      res.push(attr);
	    }
	  }
	  return res
	}
	
	function checkForAliasModel (el, value) {
	  var _el = el;
	  while (_el) {
	    if (_el.for && _el.alias === value) {
	      warn$2(
	        "<" + (el.tag) + " v-model=\"" + value + "\">: " +
	        "You are binding v-model directly to a v-for iteration alias. " +
	        "This will not be able to modify the v-for source array because " +
	        "writing to the alias is like modifying a function local variable. " +
	        "Consider using an array of objects and use v-model on an object property instead."
	      );
	    }
	    _el = _el.parent;
	  }
	}
	
	/*  */
	
	var isStaticKey;
	var isPlatformReservedTag;
	
	var genStaticKeysCached = cached(genStaticKeys$1);
	
	/**
	 * Goal of the optimizer: walk the generated template AST tree
	 * and detect sub-trees that are purely static, i.e. parts of
	 * the DOM that never needs to change.
	 *
	 * Once we detect these sub-trees, we can:
	 *
	 * 1. Hoist them into constants, so that we no longer need to
	 *    create fresh nodes for them on each re-render;
	 * 2. Completely skip them in the patching process.
	 */
	function optimize (root, options) {
	  if (!root) { return }
	  isStaticKey = genStaticKeysCached(options.staticKeys || '');
	  isPlatformReservedTag = options.isReservedTag || no;
	  // first pass: mark all non-static nodes.
	  markStatic$1(root);
	  // second pass: mark static roots.
	  markStaticRoots(root, false);
	}
	
	function genStaticKeys$1 (keys) {
	  return makeMap(
	    'type,tag,attrsList,attrsMap,plain,parent,children,attrs' +
	    (keys ? ',' + keys : '')
	  )
	}
	
	function markStatic$1 (node) {
	  node.static = isStatic(node);
	  if (node.type === 1) {
	    // do not make component slot content static. this avoids
	    // 1. components not able to mutate slot nodes
	    // 2. static slot content fails for hot-reloading
	    if (
	      !isPlatformReservedTag(node.tag) &&
	      node.tag !== 'slot' &&
	      node.attrsMap['inline-template'] == null
	    ) {
	      return
	    }
	    for (var i = 0, l = node.children.length; i < l; i++) {
	      var child = node.children[i];
	      markStatic$1(child);
	      if (!child.static) {
	        node.static = false;
	      }
	    }
	  }
	}
	
	function markStaticRoots (node, isInFor) {
	  if (node.type === 1) {
	    if (node.static || node.once) {
	      node.staticInFor = isInFor;
	    }
	    // For a node to qualify as a static root, it should have children that
	    // are not just static text. Otherwise the cost of hoisting out will
	    // outweigh the benefits and it's better off to just always render it fresh.
	    if (node.static && node.children.length && !(
	      node.children.length === 1 &&
	      node.children[0].type === 3
	    )) {
	      node.staticRoot = true;
	      return
	    } else {
	      node.staticRoot = false;
	    }
	    if (node.children) {
	      for (var i = 0, l = node.children.length; i < l; i++) {
	        markStaticRoots(node.children[i], isInFor || !!node.for);
	      }
	    }
	    if (node.ifConditions) {
	      walkThroughConditionsBlocks(node.ifConditions, isInFor);
	    }
	  }
	}
	
	function walkThroughConditionsBlocks (conditionBlocks, isInFor) {
	  for (var i = 1, len = conditionBlocks.length; i < len; i++) {
	    markStaticRoots(conditionBlocks[i].block, isInFor);
	  }
	}
	
	function isStatic (node) {
	  if (node.type === 2) { // expression
	    return false
	  }
	  if (node.type === 3) { // text
	    return true
	  }
	  return !!(node.pre || (
	    !node.hasBindings && // no dynamic bindings
	    !node.if && !node.for && // not v-if or v-for or v-else
	    !isBuiltInTag(node.tag) && // not a built-in
	    isPlatformReservedTag(node.tag) && // not a component
	    !isDirectChildOfTemplateFor(node) &&
	    Object.keys(node).every(isStaticKey)
	  ))
	}
	
	function isDirectChildOfTemplateFor (node) {
	  while (node.parent) {
	    node = node.parent;
	    if (node.tag !== 'template') {
	      return false
	    }
	    if (node.for) {
	      return true
	    }
	  }
	  return false
	}
	
	/*  */
	
	var fnExpRE = /^\s*([\w$_]+|\([^)]*?\))\s*=>|^function\s*\(/;
	var simplePathRE = /^\s*[A-Za-z_$][\w$]*(?:\.[A-Za-z_$][\w$]*|\['.*?']|\[".*?"]|\[\d+]|\[[A-Za-z_$][\w$]*])*\s*$/;
	
	// keyCode aliases
	var keyCodes = {
	  esc: 27,
	  tab: 9,
	  enter: 13,
	  space: 32,
	  up: 38,
	  left: 37,
	  right: 39,
	  down: 40,
	  'delete': [8, 46]
	};
	
	// #4868: modifiers that prevent the execution of the listener
	// need to explicitly return null so that we can determine whether to remove
	// the listener for .once
	var genGuard = function (condition) { return ("if(" + condition + ")return null;"); };
	
	var modifierCode = {
	  stop: '$event.stopPropagation();',
	  prevent: '$event.preventDefault();',
	  self: genGuard("$event.target !== $event.currentTarget"),
	  ctrl: genGuard("!$event.ctrlKey"),
	  shift: genGuard("!$event.shiftKey"),
	  alt: genGuard("!$event.altKey"),
	  meta: genGuard("!$event.metaKey"),
	  left: genGuard("'button' in $event && $event.button !== 0"),
	  middle: genGuard("'button' in $event && $event.button !== 1"),
	  right: genGuard("'button' in $event && $event.button !== 2")
	};
	
	function genHandlers (
	  events,
	  isNative,
	  warn
	) {
	  var res = isNative ? 'nativeOn:{' : 'on:{';
	  for (var name in events) {
	    var handler = events[name];
	    // #5330: warn click.right, since right clicks do not actually fire click events.
	    if ("development" !== 'production' &&
	      name === 'click' &&
	      handler && handler.modifiers && handler.modifiers.right
	    ) {
	      warn(
	        "Use \"contextmenu\" instead of \"click.right\" since right clicks " +
	        "do not actually fire \"click\" events."
	      );
	    }
	    res += "\"" + name + "\":" + (genHandler(name, handler)) + ",";
	  }
	  return res.slice(0, -1) + '}'
	}
	
	function genHandler (
	  name,
	  handler
	) {
	  if (!handler) {
	    return 'function(){}'
	  }
	
	  if (Array.isArray(handler)) {
	    return ("[" + (handler.map(function (handler) { return genHandler(name, handler); }).join(',')) + "]")
	  }
	
	  var isMethodPath = simplePathRE.test(handler.value);
	  var isFunctionExpression = fnExpRE.test(handler.value);
	
	  if (!handler.modifiers) {
	    return isMethodPath || isFunctionExpression
	      ? handler.value
	      : ("function($event){" + (handler.value) + "}") // inline statement
	  } else {
	    var code = '';
	    var genModifierCode = '';
	    var keys = [];
	    for (var key in handler.modifiers) {
	      if (modifierCode[key]) {
	        genModifierCode += modifierCode[key];
	        // left/right
	        if (keyCodes[key]) {
	          keys.push(key);
	        }
	      } else {
	        keys.push(key);
	      }
	    }
	    if (keys.length) {
	      code += genKeyFilter(keys);
	    }
	    // Make sure modifiers like prevent and stop get executed after key filtering
	    if (genModifierCode) {
	      code += genModifierCode;
	    }
	    var handlerCode = isMethodPath
	      ? handler.value + '($event)'
	      : isFunctionExpression
	        ? ("(" + (handler.value) + ")($event)")
	        : handler.value;
	    return ("function($event){" + code + handlerCode + "}")
	  }
	}
	
	function genKeyFilter (keys) {
	  return ("if(!('button' in $event)&&" + (keys.map(genFilterCode).join('&&')) + ")return null;")
	}
	
	function genFilterCode (key) {
	  var keyVal = parseInt(key, 10);
	  if (keyVal) {
	    return ("$event.keyCode!==" + keyVal)
	  }
	  var alias = keyCodes[key];
	  return ("_k($event.keyCode," + (JSON.stringify(key)) + (alias ? ',' + JSON.stringify(alias) : '') + ")")
	}
	
	/*  */
	
	function bind$1 (el, dir) {
	  el.wrapData = function (code) {
	    return ("_b(" + code + ",'" + (el.tag) + "'," + (dir.value) + (dir.modifiers && dir.modifiers.prop ? ',true' : '') + ")")
	  };
	}
	
	/*  */
	
	var baseDirectives = {
	  bind: bind$1,
	  cloak: noop
	};
	
	/*  */
	
	// configurable state
	var warn$3;
	var transforms$1;
	var dataGenFns;
	var platformDirectives$1;
	var isPlatformReservedTag$1;
	var staticRenderFns;
	var onceCount;
	var currentOptions;
	
	function generate (
	  ast,
	  options
	) {
	  // save previous staticRenderFns so generate calls can be nested
	  var prevStaticRenderFns = staticRenderFns;
	  var currentStaticRenderFns = staticRenderFns = [];
	  var prevOnceCount = onceCount;
	  onceCount = 0;
	  currentOptions = options;
	  warn$3 = options.warn || baseWarn;
	  transforms$1 = pluckModuleFunction(options.modules, 'transformCode');
	  dataGenFns = pluckModuleFunction(options.modules, 'genData');
	  platformDirectives$1 = options.directives || {};
	  isPlatformReservedTag$1 = options.isReservedTag || no;
	  var code = ast ? genElement(ast) : '_c("div")';
	  staticRenderFns = prevStaticRenderFns;
	  onceCount = prevOnceCount;
	  return {
	    render: ("with(this){return " + code + "}"),
	    staticRenderFns: currentStaticRenderFns
	  }
	}
	
	function genElement (el) {
	  if (el.staticRoot && !el.staticProcessed) {
	    return genStatic(el)
	  } else if (el.once && !el.onceProcessed) {
	    return genOnce(el)
	  } else if (el.for && !el.forProcessed) {
	    return genFor(el)
	  } else if (el.if && !el.ifProcessed) {
	    return genIf(el)
	  } else if (el.tag === 'template' && !el.slotTarget) {
	    return genChildren(el) || 'void 0'
	  } else if (el.tag === 'slot') {
	    return genSlot(el)
	  } else {
	    // component or element
	    var code;
	    if (el.component) {
	      code = genComponent(el.component, el);
	    } else {
	      var data = el.plain ? undefined : genData(el);
	
	      var children = el.inlineTemplate ? null : genChildren(el, true);
	      code = "_c('" + (el.tag) + "'" + (data ? ("," + data) : '') + (children ? ("," + children) : '') + ")";
	    }
	    // module transforms
	    for (var i = 0; i < transforms$1.length; i++) {
	      code = transforms$1[i](el, code);
	    }
	    return code
	  }
	}
	
	// hoist static sub-trees out
	function genStatic (el) {
	  el.staticProcessed = true;
	  staticRenderFns.push(("with(this){return " + (genElement(el)) + "}"));
	  return ("_m(" + (staticRenderFns.length - 1) + (el.staticInFor ? ',true' : '') + ")")
	}
	
	// v-once
	function genOnce (el) {
	  el.onceProcessed = true;
	  if (el.if && !el.ifProcessed) {
	    return genIf(el)
	  } else if (el.staticInFor) {
	    var key = '';
	    var parent = el.parent;
	    while (parent) {
	      if (parent.for) {
	        key = parent.key;
	        break
	      }
	      parent = parent.parent;
	    }
	    if (!key) {
	      "development" !== 'production' && warn$3(
	        "v-once can only be used inside v-for that is keyed. "
	      );
	      return genElement(el)
	    }
	    return ("_o(" + (genElement(el)) + "," + (onceCount++) + (key ? ("," + key) : "") + ")")
	  } else {
	    return genStatic(el)
	  }
	}
	
	function genIf (el) {
	  el.ifProcessed = true; // avoid recursion
	  return genIfConditions(el.ifConditions.slice())
	}
	
	function genIfConditions (conditions) {
	  if (!conditions.length) {
	    return '_e()'
	  }
	
	  var condition = conditions.shift();
	  if (condition.exp) {
	    return ("(" + (condition.exp) + ")?" + (genTernaryExp(condition.block)) + ":" + (genIfConditions(conditions)))
	  } else {
	    return ("" + (genTernaryExp(condition.block)))
	  }
	
	  // v-if with v-once should generate code like (a)?_m(0):_m(1)
	  function genTernaryExp (el) {
	    return el.once ? genOnce(el) : genElement(el)
	  }
	}
	
	function genFor (el) {
	  var exp = el.for;
	  var alias = el.alias;
	  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
	  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';
	
	  if (
	    "development" !== 'production' &&
	    maybeComponent(el) && el.tag !== 'slot' && el.tag !== 'template' && !el.key
	  ) {
	    warn$3(
	      "<" + (el.tag) + " v-for=\"" + alias + " in " + exp + "\">: component lists rendered with " +
	      "v-for should have explicit keys. " +
	      "See https://vuejs.org/guide/list.html#key for more info.",
	      true /* tip */
	    );
	  }
	
	  el.forProcessed = true; // avoid recursion
	  return "_l((" + exp + ")," +
	    "function(" + alias + iterator1 + iterator2 + "){" +
	      "return " + (genElement(el)) +
	    '})'
	}
	
	function genData (el) {
	  var data = '{';
	
	  // directives first.
	  // directives may mutate the el's other properties before they are generated.
	  var dirs = genDirectives(el);
	  if (dirs) { data += dirs + ','; }
	
	  // key
	  if (el.key) {
	    data += "key:" + (el.key) + ",";
	  }
	  // ref
	  if (el.ref) {
	    data += "ref:" + (el.ref) + ",";
	  }
	  if (el.refInFor) {
	    data += "refInFor:true,";
	  }
	  // pre
	  if (el.pre) {
	    data += "pre:true,";
	  }
	  // record original tag name for components using "is" attribute
	  if (el.component) {
	    data += "tag:\"" + (el.tag) + "\",";
	  }
	  // module data generation functions
	  for (var i = 0; i < dataGenFns.length; i++) {
	    data += dataGenFns[i](el);
	  }
	  // attributes
	  if (el.attrs) {
	    data += "attrs:{" + (genProps(el.attrs)) + "},";
	  }
	  // DOM props
	  if (el.props) {
	    data += "domProps:{" + (genProps(el.props)) + "},";
	  }
	  // event handlers
	  if (el.events) {
	    data += (genHandlers(el.events, false, warn$3)) + ",";
	  }
	  if (el.nativeEvents) {
	    data += (genHandlers(el.nativeEvents, true, warn$3)) + ",";
	  }
	  // slot target
	  if (el.slotTarget) {
	    data += "slot:" + (el.slotTarget) + ",";
	  }
	  // scoped slots
	  if (el.scopedSlots) {
	    data += (genScopedSlots(el.scopedSlots)) + ",";
	  }
	  // component v-model
	  if (el.model) {
	    data += "model:{value:" + (el.model.value) + ",callback:" + (el.model.callback) + ",expression:" + (el.model.expression) + "},";
	  }
	  // inline-template
	  if (el.inlineTemplate) {
	    var inlineTemplate = genInlineTemplate(el);
	    if (inlineTemplate) {
	      data += inlineTemplate + ",";
	    }
	  }
	  data = data.replace(/,$/, '') + '}';
	  // v-bind data wrap
	  if (el.wrapData) {
	    data = el.wrapData(data);
	  }
	  return data
	}
	
	function genDirectives (el) {
	  var dirs = el.directives;
	  if (!dirs) { return }
	  var res = 'directives:[';
	  var hasRuntime = false;
	  var i, l, dir, needRuntime;
	  for (i = 0, l = dirs.length; i < l; i++) {
	    dir = dirs[i];
	    needRuntime = true;
	    var gen = platformDirectives$1[dir.name] || baseDirectives[dir.name];
	    if (gen) {
	      // compile-time directive that manipulates AST.
	      // returns true if it also needs a runtime counterpart.
	      needRuntime = !!gen(el, dir, warn$3);
	    }
	    if (needRuntime) {
	      hasRuntime = true;
	      res += "{name:\"" + (dir.name) + "\",rawName:\"" + (dir.rawName) + "\"" + (dir.value ? (",value:(" + (dir.value) + "),expression:" + (JSON.stringify(dir.value))) : '') + (dir.arg ? (",arg:\"" + (dir.arg) + "\"") : '') + (dir.modifiers ? (",modifiers:" + (JSON.stringify(dir.modifiers))) : '') + "},";
	    }
	  }
	  if (hasRuntime) {
	    return res.slice(0, -1) + ']'
	  }
	}
	
	function genInlineTemplate (el) {
	  var ast = el.children[0];
	  if ("development" !== 'production' && (
	    el.children.length > 1 || ast.type !== 1
	  )) {
	    warn$3('Inline-template components must have exactly one child element.');
	  }
	  if (ast.type === 1) {
	    var inlineRenderFns = generate(ast, currentOptions);
	    return ("inlineTemplate:{render:function(){" + (inlineRenderFns.render) + "},staticRenderFns:[" + (inlineRenderFns.staticRenderFns.map(function (code) { return ("function(){" + code + "}"); }).join(',')) + "]}")
	  }
	}
	
	function genScopedSlots (slots) {
	  return ("scopedSlots:_u([" + (Object.keys(slots).map(function (key) { return genScopedSlot(key, slots[key]); }).join(',')) + "])")
	}
	
	function genScopedSlot (key, el) {
	  if (el.for && !el.forProcessed) {
	    return genForScopedSlot(key, el)
	  }
	  return "{key:" + key + ",fn:function(" + (String(el.attrsMap.scope)) + "){" +
	    "return " + (el.tag === 'template'
	      ? genChildren(el) || 'void 0'
	      : genElement(el)) + "}}"
	}
	
	function genForScopedSlot (key, el) {
	  var exp = el.for;
	  var alias = el.alias;
	  var iterator1 = el.iterator1 ? ("," + (el.iterator1)) : '';
	  var iterator2 = el.iterator2 ? ("," + (el.iterator2)) : '';
	  el.forProcessed = true; // avoid recursion
	  return "_l((" + exp + ")," +
	    "function(" + alias + iterator1 + iterator2 + "){" +
	      "return " + (genScopedSlot(key, el)) +
	    '})'
	}
	
	function genChildren (el, checkSkip) {
	  var children = el.children;
	  if (children.length) {
	    var el$1 = children[0];
	    // optimize single v-for
	    if (children.length === 1 &&
	      el$1.for &&
	      el$1.tag !== 'template' &&
	      el$1.tag !== 'slot'
	    ) {
	      return genElement(el$1)
	    }
	    var normalizationType = checkSkip ? getNormalizationType(children) : 0;
	    return ("[" + (children.map(genNode).join(',')) + "]" + (normalizationType ? ("," + normalizationType) : ''))
	  }
	}
	
	// determine the normalization needed for the children array.
	// 0: no normalization needed
	// 1: simple normalization needed (possible 1-level deep nested array)
	// 2: full normalization needed
	function getNormalizationType (children) {
	  var res = 0;
	  for (var i = 0; i < children.length; i++) {
	    var el = children[i];
	    if (el.type !== 1) {
	      continue
	    }
	    if (needsNormalization(el) ||
	        (el.ifConditions && el.ifConditions.some(function (c) { return needsNormalization(c.block); }))) {
	      res = 2;
	      break
	    }
	    if (maybeComponent(el) ||
	        (el.ifConditions && el.ifConditions.some(function (c) { return maybeComponent(c.block); }))) {
	      res = 1;
	    }
	  }
	  return res
	}
	
	function needsNormalization (el) {
	  return el.for !== undefined || el.tag === 'template' || el.tag === 'slot'
	}
	
	function maybeComponent (el) {
	  return !isPlatformReservedTag$1(el.tag)
	}
	
	function genNode (node) {
	  if (node.type === 1) {
	    return genElement(node)
	  } else {
	    return genText(node)
	  }
	}
	
	function genText (text) {
	  return ("_v(" + (text.type === 2
	    ? text.expression // no need for () because already wrapped in _s()
	    : transformSpecialNewlines(JSON.stringify(text.text))) + ")")
	}
	
	function genSlot (el) {
	  var slotName = el.slotName || '"default"';
	  var children = genChildren(el);
	  var res = "_t(" + slotName + (children ? ("," + children) : '');
	  var attrs = el.attrs && ("{" + (el.attrs.map(function (a) { return ((camelize(a.name)) + ":" + (a.value)); }).join(',')) + "}");
	  var bind$$1 = el.attrsMap['v-bind'];
	  if ((attrs || bind$$1) && !children) {
	    res += ",null";
	  }
	  if (attrs) {
	    res += "," + attrs;
	  }
	  if (bind$$1) {
	    res += (attrs ? '' : ',null') + "," + bind$$1;
	  }
	  return res + ')'
	}
	
	// componentName is el.component, take it as argument to shun flow's pessimistic refinement
	function genComponent (componentName, el) {
	  var children = el.inlineTemplate ? null : genChildren(el, true);
	  return ("_c(" + componentName + "," + (genData(el)) + (children ? ("," + children) : '') + ")")
	}
	
	function genProps (props) {
	  var res = '';
	  for (var i = 0; i < props.length; i++) {
	    var prop = props[i];
	    res += "\"" + (prop.name) + "\":" + (transformSpecialNewlines(prop.value)) + ",";
	  }
	  return res.slice(0, -1)
	}
	
	// #3895, #4268
	function transformSpecialNewlines (text) {
	  return text
	    .replace(/\u2028/g, '\\u2028')
	    .replace(/\u2029/g, '\\u2029')
	}
	
	/*  */
	
	// these keywords should not appear inside expressions, but operators like
	// typeof, instanceof and in are allowed
	var prohibitedKeywordRE = new RegExp('\\b' + (
	  'do,if,for,let,new,try,var,case,else,with,await,break,catch,class,const,' +
	  'super,throw,while,yield,delete,export,import,return,switch,default,' +
	  'extends,finally,continue,debugger,function,arguments'
	).split(',').join('\\b|\\b') + '\\b');
	
	// these unary operators should not be used as property/method names
	var unaryOperatorsRE = new RegExp('\\b' + (
	  'delete,typeof,void'
	).split(',').join('\\s*\\([^\\)]*\\)|\\b') + '\\s*\\([^\\)]*\\)');
	
	// check valid identifier for v-for
	var identRE = /[A-Za-z_$][\w$]*/;
	
	// strip strings in expressions
	var stripStringRE = /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*\$\{|\}(?:[^`\\]|\\.)*`|`(?:[^`\\]|\\.)*`/g;
	
	// detect problematic expressions in a template
	function detectErrors (ast) {
	  var errors = [];
	  if (ast) {
	    checkNode(ast, errors);
	  }
	  return errors
	}
	
	function checkNode (node, errors) {
	  if (node.type === 1) {
	    for (var name in node.attrsMap) {
	      if (dirRE.test(name)) {
	        var value = node.attrsMap[name];
	        if (value) {
	          if (name === 'v-for') {
	            checkFor(node, ("v-for=\"" + value + "\""), errors);
	          } else if (onRE.test(name)) {
	            checkEvent(value, (name + "=\"" + value + "\""), errors);
	          } else {
	            checkExpression(value, (name + "=\"" + value + "\""), errors);
	          }
	        }
	      }
	    }
	    if (node.children) {
	      for (var i = 0; i < node.children.length; i++) {
	        checkNode(node.children[i], errors);
	      }
	    }
	  } else if (node.type === 2) {
	    checkExpression(node.expression, node.text, errors);
	  }
	}
	
	function checkEvent (exp, text, errors) {
	  var stipped = exp.replace(stripStringRE, '');
	  var keywordMatch = stipped.match(unaryOperatorsRE);
	  if (keywordMatch && stipped.charAt(keywordMatch.index - 1) !== '$') {
	    errors.push(
	      "avoid using JavaScript unary operator as property name: " +
	      "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim())
	    );
	  }
	  checkExpression(exp, text, errors);
	}
	
	function checkFor (node, text, errors) {
	  checkExpression(node.for || '', text, errors);
	  checkIdentifier(node.alias, 'v-for alias', text, errors);
	  checkIdentifier(node.iterator1, 'v-for iterator', text, errors);
	  checkIdentifier(node.iterator2, 'v-for iterator', text, errors);
	}
	
	function checkIdentifier (ident, type, text, errors) {
	  if (typeof ident === 'string' && !identRE.test(ident)) {
	    errors.push(("invalid " + type + " \"" + ident + "\" in expression: " + (text.trim())));
	  }
	}
	
	function checkExpression (exp, text, errors) {
	  try {
	    new Function(("return " + exp));
	  } catch (e) {
	    var keywordMatch = exp.replace(stripStringRE, '').match(prohibitedKeywordRE);
	    if (keywordMatch) {
	      errors.push(
	        "avoid using JavaScript keyword as property name: " +
	        "\"" + (keywordMatch[0]) + "\" in expression " + (text.trim())
	      );
	    } else {
	      errors.push(("invalid expression: " + (text.trim())));
	    }
	  }
	}
	
	/*  */
	
	function baseCompile (
	  template,
	  options
	) {
	  var ast = parse(template.trim(), options);
	  optimize(ast, options);
	  var code = generate(ast, options);
	  return {
	    ast: ast,
	    render: code.render,
	    staticRenderFns: code.staticRenderFns
	  }
	}
	
	function makeFunction (code, errors) {
	  try {
	    return new Function(code)
	  } catch (err) {
	    errors.push({ err: err, code: code });
	    return noop
	  }
	}
	
	function createCompiler (baseOptions) {
	  var functionCompileCache = Object.create(null);
	
	  function compile (
	    template,
	    options
	  ) {
	    var finalOptions = Object.create(baseOptions);
	    var errors = [];
	    var tips = [];
	    finalOptions.warn = function (msg, tip$$1) {
	      (tip$$1 ? tips : errors).push(msg);
	    };
	
	    if (options) {
	      // merge custom modules
	      if (options.modules) {
	        finalOptions.modules = (baseOptions.modules || []).concat(options.modules);
	      }
	      // merge custom directives
	      if (options.directives) {
	        finalOptions.directives = extend(
	          Object.create(baseOptions.directives),
	          options.directives
	        );
	      }
	      // copy other options
	      for (var key in options) {
	        if (key !== 'modules' && key !== 'directives') {
	          finalOptions[key] = options[key];
	        }
	      }
	    }
	
	    var compiled = baseCompile(template, finalOptions);
	    {
	      errors.push.apply(errors, detectErrors(compiled.ast));
	    }
	    compiled.errors = errors;
	    compiled.tips = tips;
	    return compiled
	  }
	
	  function compileToFunctions (
	    template,
	    options,
	    vm
	  ) {
	    options = options || {};
	
	    /* istanbul ignore if */
	    {
	      // detect possible CSP restriction
	      try {
	        new Function('return 1');
	      } catch (e) {
	        if (e.toString().match(/unsafe-eval|CSP/)) {
	          warn(
	            'It seems you are using the standalone build of Vue.js in an ' +
	            'environment with Content Security Policy that prohibits unsafe-eval. ' +
	            'The template compiler cannot work in this environment. Consider ' +
	            'relaxing the policy to allow unsafe-eval or pre-compiling your ' +
	            'templates into render functions.'
	          );
	        }
	      }
	    }
	
	    // check cache
	    var key = options.delimiters
	      ? String(options.delimiters) + template
	      : template;
	    if (functionCompileCache[key]) {
	      return functionCompileCache[key]
	    }
	
	    // compile
	    var compiled = compile(template, options);
	
	    // check compilation errors/tips
	    {
	      if (compiled.errors && compiled.errors.length) {
	        warn(
	          "Error compiling template:\n\n" + template + "\n\n" +
	          compiled.errors.map(function (e) { return ("- " + e); }).join('\n') + '\n',
	          vm
	        );
	      }
	      if (compiled.tips && compiled.tips.length) {
	        compiled.tips.forEach(function (msg) { return tip(msg, vm); });
	      }
	    }
	
	    // turn code into functions
	    var res = {};
	    var fnGenErrors = [];
	    res.render = makeFunction(compiled.render, fnGenErrors);
	    var l = compiled.staticRenderFns.length;
	    res.staticRenderFns = new Array(l);
	    for (var i = 0; i < l; i++) {
	      res.staticRenderFns[i] = makeFunction(compiled.staticRenderFns[i], fnGenErrors);
	    }
	
	    // check function generation errors.
	    // this should only happen if there is a bug in the compiler itself.
	    // mostly for codegen development use
	    /* istanbul ignore if */
	    {
	      if ((!compiled.errors || !compiled.errors.length) && fnGenErrors.length) {
	        warn(
	          "Failed to generate render function:\n\n" +
	          fnGenErrors.map(function (ref) {
	            var err = ref.err;
	            var code = ref.code;
	
	            return ((err.toString()) + " in\n\n" + code + "\n");
	        }).join('\n'),
	          vm
	        );
	      }
	    }
	
	    return (functionCompileCache[key] = res)
	  }
	
	  return {
	    compile: compile,
	    compileToFunctions: compileToFunctions
	  }
	}
	
	/*  */
	
	function transformNode (el, options) {
	  var warn = options.warn || baseWarn;
	  var staticClass = getAndRemoveAttr(el, 'class');
	  if ("development" !== 'production' && staticClass) {
	    var expression = parseText(staticClass, options.delimiters);
	    if (expression) {
	      warn(
	        "class=\"" + staticClass + "\": " +
	        'Interpolation inside attributes has been removed. ' +
	        'Use v-bind or the colon shorthand instead. For example, ' +
	        'instead of <div class="{{ val }}">, use <div :class="val">.'
	      );
	    }
	  }
	  if (staticClass) {
	    el.staticClass = JSON.stringify(staticClass);
	  }
	  var classBinding = getBindingAttr(el, 'class', false /* getStatic */);
	  if (classBinding) {
	    el.classBinding = classBinding;
	  }
	}
	
	function genData$1 (el) {
	  var data = '';
	  if (el.staticClass) {
	    data += "staticClass:" + (el.staticClass) + ",";
	  }
	  if (el.classBinding) {
	    data += "class:" + (el.classBinding) + ",";
	  }
	  return data
	}
	
	var klass$1 = {
	  staticKeys: ['staticClass'],
	  transformNode: transformNode,
	  genData: genData$1
	};
	
	/*  */
	
	function transformNode$1 (el, options) {
	  var warn = options.warn || baseWarn;
	  var staticStyle = getAndRemoveAttr(el, 'style');
	  if (staticStyle) {
	    /* istanbul ignore if */
	    {
	      var expression = parseText(staticStyle, options.delimiters);
	      if (expression) {
	        warn(
	          "style=\"" + staticStyle + "\": " +
	          'Interpolation inside attributes has been removed. ' +
	          'Use v-bind or the colon shorthand instead. For example, ' +
	          'instead of <div style="{{ val }}">, use <div :style="val">.'
	        );
	      }
	    }
	    el.staticStyle = JSON.stringify(parseStyleText(staticStyle));
	  }
	
	  var styleBinding = getBindingAttr(el, 'style', false /* getStatic */);
	  if (styleBinding) {
	    el.styleBinding = styleBinding;
	  }
	}
	
	function genData$2 (el) {
	  var data = '';
	  if (el.staticStyle) {
	    data += "staticStyle:" + (el.staticStyle) + ",";
	  }
	  if (el.styleBinding) {
	    data += "style:(" + (el.styleBinding) + "),";
	  }
	  return data
	}
	
	var style$1 = {
	  staticKeys: ['staticStyle'],
	  transformNode: transformNode$1,
	  genData: genData$2
	};
	
	var modules$1 = [
	  klass$1,
	  style$1
	];
	
	/*  */
	
	function text (el, dir) {
	  if (dir.value) {
	    addProp(el, 'textContent', ("_s(" + (dir.value) + ")"));
	  }
	}
	
	/*  */
	
	function html (el, dir) {
	  if (dir.value) {
	    addProp(el, 'innerHTML', ("_s(" + (dir.value) + ")"));
	  }
	}
	
	var directives$1 = {
	  model: model,
	  text: text,
	  html: html
	};
	
	/*  */
	
	var baseOptions = {
	  expectHTML: true,
	  modules: modules$1,
	  directives: directives$1,
	  isPreTag: isPreTag,
	  isUnaryTag: isUnaryTag,
	  mustUseProp: mustUseProp,
	  canBeLeftOpenTag: canBeLeftOpenTag,
	  isReservedTag: isReservedTag,
	  getTagNamespace: getTagNamespace,
	  staticKeys: genStaticKeys(modules$1)
	};
	
	var ref$1 = createCompiler(baseOptions);
	var compileToFunctions = ref$1.compileToFunctions;
	
	/*  */
	
	var idToTemplate = cached(function (id) {
	  var el = query(id);
	  return el && el.innerHTML
	});
	
	var mount = Vue$3.prototype.$mount;
	Vue$3.prototype.$mount = function (
	  el,
	  hydrating
	) {
	  el = el && query(el);
	
	  /* istanbul ignore if */
	  if (el === document.body || el === document.documentElement) {
	    "development" !== 'production' && warn(
	      "Do not mount Vue to <html> or <body> - mount to normal elements instead."
	    );
	    return this
	  }
	
	  var options = this.$options;
	  // resolve template/el and convert to render function
	  if (!options.render) {
	    var template = options.template;
	    if (template) {
	      if (typeof template === 'string') {
	        if (template.charAt(0) === '#') {
	          template = idToTemplate(template);
	          /* istanbul ignore if */
	          if ("development" !== 'production' && !template) {
	            warn(
	              ("Template element not found or is empty: " + (options.template)),
	              this
	            );
	          }
	        }
	      } else if (template.nodeType) {
	        template = template.innerHTML;
	      } else {
	        {
	          warn('invalid template option:' + template, this);
	        }
	        return this
	      }
	    } else if (el) {
	      template = getOuterHTML(el);
	    }
	    if (template) {
	      /* istanbul ignore if */
	      if ("development" !== 'production' && config.performance && mark) {
	        mark('compile');
	      }
	
	      var ref = compileToFunctions(template, {
	        shouldDecodeNewlines: shouldDecodeNewlines,
	        delimiters: options.delimiters
	      }, this);
	      var render = ref.render;
	      var staticRenderFns = ref.staticRenderFns;
	      options.render = render;
	      options.staticRenderFns = staticRenderFns;
	
	      /* istanbul ignore if */
	      if ("development" !== 'production' && config.performance && mark) {
	        mark('compile end');
	        measure(((this._name) + " compile"), 'compile', 'compile end');
	      }
	    }
	  }
	  return mount.call(this, el, hydrating)
	};
	
	/**
	 * Get outerHTML of elements, taking care
	 * of SVG elements in IE as well.
	 */
	function getOuterHTML (el) {
	  if (el.outerHTML) {
	    return el.outerHTML
	  } else {
	    var container = document.createElement('div');
	    container.appendChild(el.cloneNode(true));
	    return container.innerHTML
	  }
	}
	
	Vue$3.compile = compileToFunctions;
	
	return Vue$3;
	
	})));
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	  * vue-router v2.5.3
	  * (c) 2017 Evan You
	  * @license MIT
	  */
	'use strict';
	
	/*  */
	
	function assert (condition, message) {
	  if (!condition) {
	    throw new Error(("[vue-router] " + message))
	  }
	}
	
	function warn (condition, message) {
	  if (("development") !== 'production' && !condition) {
	    typeof console !== 'undefined' && console.warn(("[vue-router] " + message));
	  }
	}
	
	var View = {
	  name: 'router-view',
	  functional: true,
	  props: {
	    name: {
	      type: String,
	      default: 'default'
	    }
	  },
	  render: function render (_, ref) {
	    var props = ref.props;
	    var children = ref.children;
	    var parent = ref.parent;
	    var data = ref.data;
	
	    data.routerView = true;
	
	    // directly use parent context's createElement() function
	    // so that components rendered by router-view can resolve named slots
	    var h = parent.$createElement;
	    var name = props.name;
	    var route = parent.$route;
	    var cache = parent._routerViewCache || (parent._routerViewCache = {});
	
	    // determine current view depth, also check to see if the tree
	    // has been toggled inactive but kept-alive.
	    var depth = 0;
	    var inactive = false;
	    while (parent) {
	      if (parent.$vnode && parent.$vnode.data.routerView) {
	        depth++;
	      }
	      if (parent._inactive) {
	        inactive = true;
	      }
	      parent = parent.$parent;
	    }
	    data.routerViewDepth = depth;
	
	    // render previous view if the tree is inactive and kept-alive
	    if (inactive) {
	      return h(cache[name], data, children)
	    }
	
	    var matched = route.matched[depth];
	    // render empty node if no matched route
	    if (!matched) {
	      cache[name] = null;
	      return h()
	    }
	
	    var component = cache[name] = matched.components[name];
	
	    // attach instance registration hook
	    // this will be called in the instance's injected lifecycle hooks
	    data.registerRouteInstance = function (vm, val) {
	      // val could be undefined for unregistration
	      var current = matched.instances[name];
	      if (
	        (val && current !== vm) ||
	        (!val && current === vm)
	      ) {
	        matched.instances[name] = val;
	      }
	    }
	
	    // also regiseter instance in prepatch hook
	    // in case the same component instance is reused across different routes
	    ;(data.hook || (data.hook = {})).prepatch = function (_, vnode) {
	      matched.instances[name] = vnode.componentInstance;
	    };
	
	    // resolve props
	    data.props = resolveProps(route, matched.props && matched.props[name]);
	
	    return h(component, data, children)
	  }
	};
	
	function resolveProps (route, config) {
	  switch (typeof config) {
	    case 'undefined':
	      return
	    case 'object':
	      return config
	    case 'function':
	      return config(route)
	    case 'boolean':
	      return config ? route.params : undefined
	    default:
	      if (true) {
	        warn(
	          false,
	          "props in \"" + (route.path) + "\" is a " + (typeof config) + ", " +
	          "expecting an object, function or boolean."
	        );
	      }
	  }
	}
	
	/*  */
	
	var encodeReserveRE = /[!'()*]/g;
	var encodeReserveReplacer = function (c) { return '%' + c.charCodeAt(0).toString(16); };
	var commaRE = /%2C/g;
	
	// fixed encodeURIComponent which is more conformant to RFC3986:
	// - escapes [!'()*]
	// - preserve commas
	var encode = function (str) { return encodeURIComponent(str)
	  .replace(encodeReserveRE, encodeReserveReplacer)
	  .replace(commaRE, ','); };
	
	var decode = decodeURIComponent;
	
	function resolveQuery (
	  query,
	  extraQuery,
	  _parseQuery
	) {
	  if ( extraQuery === void 0 ) extraQuery = {};
	
	  var parse = _parseQuery || parseQuery;
	  var parsedQuery;
	  try {
	    parsedQuery = parse(query || '');
	  } catch (e) {
	    ("development") !== 'production' && warn(false, e.message);
	    parsedQuery = {};
	  }
	  for (var key in extraQuery) {
	    var val = extraQuery[key];
	    parsedQuery[key] = Array.isArray(val) ? val.slice() : val;
	  }
	  return parsedQuery
	}
	
	function parseQuery (query) {
	  var res = {};
	
	  query = query.trim().replace(/^(\?|#|&)/, '');
	
	  if (!query) {
	    return res
	  }
	
	  query.split('&').forEach(function (param) {
	    var parts = param.replace(/\+/g, ' ').split('=');
	    var key = decode(parts.shift());
	    var val = parts.length > 0
	      ? decode(parts.join('='))
	      : null;
	
	    if (res[key] === undefined) {
	      res[key] = val;
	    } else if (Array.isArray(res[key])) {
	      res[key].push(val);
	    } else {
	      res[key] = [res[key], val];
	    }
	  });
	
	  return res
	}
	
	function stringifyQuery (obj) {
	  var res = obj ? Object.keys(obj).map(function (key) {
	    var val = obj[key];
	
	    if (val === undefined) {
	      return ''
	    }
	
	    if (val === null) {
	      return encode(key)
	    }
	
	    if (Array.isArray(val)) {
	      var result = [];
	      val.slice().forEach(function (val2) {
	        if (val2 === undefined) {
	          return
	        }
	        if (val2 === null) {
	          result.push(encode(key));
	        } else {
	          result.push(encode(key) + '=' + encode(val2));
	        }
	      });
	      return result.join('&')
	    }
	
	    return encode(key) + '=' + encode(val)
	  }).filter(function (x) { return x.length > 0; }).join('&') : null;
	  return res ? ("?" + res) : ''
	}
	
	/*  */
	
	
	var trailingSlashRE = /\/?$/;
	
	function createRoute (
	  record,
	  location,
	  redirectedFrom,
	  router
	) {
	  var stringifyQuery$$1 = router && router.options.stringifyQuery;
	  var route = {
	    name: location.name || (record && record.name),
	    meta: (record && record.meta) || {},
	    path: location.path || '/',
	    hash: location.hash || '',
	    query: location.query || {},
	    params: location.params || {},
	    fullPath: getFullPath(location, stringifyQuery$$1),
	    matched: record ? formatMatch(record) : []
	  };
	  if (redirectedFrom) {
	    route.redirectedFrom = getFullPath(redirectedFrom, stringifyQuery$$1);
	  }
	  return Object.freeze(route)
	}
	
	// the starting route that represents the initial state
	var START = createRoute(null, {
	  path: '/'
	});
	
	function formatMatch (record) {
	  var res = [];
	  while (record) {
	    res.unshift(record);
	    record = record.parent;
	  }
	  return res
	}
	
	function getFullPath (
	  ref,
	  _stringifyQuery
	) {
	  var path = ref.path;
	  var query = ref.query; if ( query === void 0 ) query = {};
	  var hash = ref.hash; if ( hash === void 0 ) hash = '';
	
	  var stringify = _stringifyQuery || stringifyQuery;
	  return (path || '/') + stringify(query) + hash
	}
	
	function isSameRoute (a, b) {
	  if (b === START) {
	    return a === b
	  } else if (!b) {
	    return false
	  } else if (a.path && b.path) {
	    return (
	      a.path.replace(trailingSlashRE, '') === b.path.replace(trailingSlashRE, '') &&
	      a.hash === b.hash &&
	      isObjectEqual(a.query, b.query)
	    )
	  } else if (a.name && b.name) {
	    return (
	      a.name === b.name &&
	      a.hash === b.hash &&
	      isObjectEqual(a.query, b.query) &&
	      isObjectEqual(a.params, b.params)
	    )
	  } else {
	    return false
	  }
	}
	
	function isObjectEqual (a, b) {
	  if ( a === void 0 ) a = {};
	  if ( b === void 0 ) b = {};
	
	  var aKeys = Object.keys(a);
	  var bKeys = Object.keys(b);
	  if (aKeys.length !== bKeys.length) {
	    return false
	  }
	  return aKeys.every(function (key) { return String(a[key]) === String(b[key]); })
	}
	
	function isIncludedRoute (current, target) {
	  return (
	    current.path.replace(trailingSlashRE, '/').indexOf(
	      target.path.replace(trailingSlashRE, '/')
	    ) === 0 &&
	    (!target.hash || current.hash === target.hash) &&
	    queryIncludes(current.query, target.query)
	  )
	}
	
	function queryIncludes (current, target) {
	  for (var key in target) {
	    if (!(key in current)) {
	      return false
	    }
	  }
	  return true
	}
	
	/*  */
	
	// work around weird flow bug
	var toTypes = [String, Object];
	var eventTypes = [String, Array];
	
	var Link = {
	  name: 'router-link',
	  props: {
	    to: {
	      type: toTypes,
	      required: true
	    },
	    tag: {
	      type: String,
	      default: 'a'
	    },
	    exact: Boolean,
	    append: Boolean,
	    replace: Boolean,
	    activeClass: String,
	    exactActiveClass: String,
	    event: {
	      type: eventTypes,
	      default: 'click'
	    }
	  },
	  render: function render (h) {
	    var this$1 = this;
	
	    var router = this.$router;
	    var current = this.$route;
	    var ref = router.resolve(this.to, current, this.append);
	    var location = ref.location;
	    var route = ref.route;
	    var href = ref.href;
	
	    var classes = {};
	    var globalActiveClass = router.options.linkActiveClass;
	    var globalExactActiveClass = router.options.linkExactActiveClass;
	    // Support global empty active class
	    var activeClassFallback = globalActiveClass == null
	            ? 'router-link-active'
	            : globalActiveClass;
	    var exactActiveClassFallback = globalExactActiveClass == null
	            ? 'router-link-exact-active'
	            : globalExactActiveClass;
	    var activeClass = this.activeClass == null
	            ? activeClassFallback
	            : this.activeClass;
	    var exactActiveClass = this.exactActiveClass == null
	            ? exactActiveClassFallback
	            : this.exactActiveClass;
	    var compareTarget = location.path
	      ? createRoute(null, location, null, router)
	      : route;
	
	    classes[exactActiveClass] = isSameRoute(current, compareTarget);
	    classes[activeClass] = this.exact
	      ? classes[exactActiveClass]
	      : isIncludedRoute(current, compareTarget);
	
	    var handler = function (e) {
	      if (guardEvent(e)) {
	        if (this$1.replace) {
	          router.replace(location);
	        } else {
	          router.push(location);
	        }
	      }
	    };
	
	    var on = { click: guardEvent };
	    if (Array.isArray(this.event)) {
	      this.event.forEach(function (e) { on[e] = handler; });
	    } else {
	      on[this.event] = handler;
	    }
	
	    var data = {
	      class: classes
	    };
	
	    if (this.tag === 'a') {
	      data.on = on;
	      data.attrs = { href: href };
	    } else {
	      // find the first <a> child and apply listener and href
	      var a = findAnchor(this.$slots.default);
	      if (a) {
	        // in case the <a> is a static node
	        a.isStatic = false;
	        var extend = _Vue.util.extend;
	        var aData = a.data = extend({}, a.data);
	        aData.on = on;
	        var aAttrs = a.data.attrs = extend({}, a.data.attrs);
	        aAttrs.href = href;
	      } else {
	        // doesn't have <a> child, apply listener to self
	        data.on = on;
	      }
	    }
	
	    return h(this.tag, data, this.$slots.default)
	  }
	};
	
	function guardEvent (e) {
	  // don't redirect with control keys
	  if (e.metaKey || e.ctrlKey || e.shiftKey) { return }
	  // don't redirect when preventDefault called
	  if (e.defaultPrevented) { return }
	  // don't redirect on right click
	  if (e.button !== undefined && e.button !== 0) { return }
	  // don't redirect if `target="_blank"`
	  if (e.currentTarget && e.currentTarget.getAttribute) {
	    var target = e.currentTarget.getAttribute('target');
	    if (/\b_blank\b/i.test(target)) { return }
	  }
	  // this may be a Weex event which doesn't have this method
	  if (e.preventDefault) {
	    e.preventDefault();
	  }
	  return true
	}
	
	function findAnchor (children) {
	  if (children) {
	    var child;
	    for (var i = 0; i < children.length; i++) {
	      child = children[i];
	      if (child.tag === 'a') {
	        return child
	      }
	      if (child.children && (child = findAnchor(child.children))) {
	        return child
	      }
	    }
	  }
	}
	
	var _Vue;
	
	function install (Vue) {
	  if (install.installed) { return }
	  install.installed = true;
	
	  _Vue = Vue;
	
	  Object.defineProperty(Vue.prototype, '$router', {
	    get: function get () { return this.$root._router }
	  });
	
	  Object.defineProperty(Vue.prototype, '$route', {
	    get: function get () { return this.$root._route }
	  });
	
	  var isDef = function (v) { return v !== undefined; };
	
	  var registerInstance = function (vm, callVal) {
	    var i = vm.$options._parentVnode;
	    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
	      i(vm, callVal);
	    }
	  };
	
	  Vue.mixin({
	    beforeCreate: function beforeCreate () {
	      if (isDef(this.$options.router)) {
	        this._router = this.$options.router;
	        this._router.init(this);
	        Vue.util.defineReactive(this, '_route', this._router.history.current);
	      }
	      registerInstance(this, this);
	    },
	    destroyed: function destroyed () {
	      registerInstance(this);
	    }
	  });
	
	  Vue.component('router-view', View);
	  Vue.component('router-link', Link);
	
	  var strats = Vue.config.optionMergeStrategies;
	  // use the same hook merging strategy for route hooks
	  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.created;
	}
	
	/*  */
	
	var inBrowser = typeof window !== 'undefined';
	
	/*  */
	
	function resolvePath (
	  relative,
	  base,
	  append
	) {
	  var firstChar = relative.charAt(0);
	  if (firstChar === '/') {
	    return relative
	  }
	
	  if (firstChar === '?' || firstChar === '#') {
	    return base + relative
	  }
	
	  var stack = base.split('/');
	
	  // remove trailing segment if:
	  // - not appending
	  // - appending to trailing slash (last segment is empty)
	  if (!append || !stack[stack.length - 1]) {
	    stack.pop();
	  }
	
	  // resolve relative path
	  var segments = relative.replace(/^\//, '').split('/');
	  for (var i = 0; i < segments.length; i++) {
	    var segment = segments[i];
	    if (segment === '..') {
	      stack.pop();
	    } else if (segment !== '.') {
	      stack.push(segment);
	    }
	  }
	
	  // ensure leading slash
	  if (stack[0] !== '') {
	    stack.unshift('');
	  }
	
	  return stack.join('/')
	}
	
	function parsePath (path) {
	  var hash = '';
	  var query = '';
	
	  var hashIndex = path.indexOf('#');
	  if (hashIndex >= 0) {
	    hash = path.slice(hashIndex);
	    path = path.slice(0, hashIndex);
	  }
	
	  var queryIndex = path.indexOf('?');
	  if (queryIndex >= 0) {
	    query = path.slice(queryIndex + 1);
	    path = path.slice(0, queryIndex);
	  }
	
	  return {
	    path: path,
	    query: query,
	    hash: hash
	  }
	}
	
	function cleanPath (path) {
	  return path.replace(/\/\//g, '/')
	}
	
	var index$1 = Array.isArray || function (arr) {
	  return Object.prototype.toString.call(arr) == '[object Array]';
	};
	
	/**
	 * Expose `pathToRegexp`.
	 */
	var index = pathToRegexp;
	var parse_1 = parse;
	var compile_1 = compile;
	var tokensToFunction_1 = tokensToFunction;
	var tokensToRegExp_1 = tokensToRegExp;
	
	/**
	 * The main path matching regexp utility.
	 *
	 * @type {RegExp}
	 */
	var PATH_REGEXP = new RegExp([
	  // Match escaped characters that would otherwise appear in future matches.
	  // This allows the user to escape special characters that won't transform.
	  '(\\\\.)',
	  // Match Express-style parameters and un-named parameters with a prefix
	  // and optional suffixes. Matches appear as:
	  //
	  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
	  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
	  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
	  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
	].join('|'), 'g');
	
	/**
	 * Parse a string for the raw tokens.
	 *
	 * @param  {string}  str
	 * @param  {Object=} options
	 * @return {!Array}
	 */
	function parse (str, options) {
	  var tokens = [];
	  var key = 0;
	  var index = 0;
	  var path = '';
	  var defaultDelimiter = options && options.delimiter || '/';
	  var res;
	
	  while ((res = PATH_REGEXP.exec(str)) != null) {
	    var m = res[0];
	    var escaped = res[1];
	    var offset = res.index;
	    path += str.slice(index, offset);
	    index = offset + m.length;
	
	    // Ignore already escaped sequences.
	    if (escaped) {
	      path += escaped[1];
	      continue
	    }
	
	    var next = str[index];
	    var prefix = res[2];
	    var name = res[3];
	    var capture = res[4];
	    var group = res[5];
	    var modifier = res[6];
	    var asterisk = res[7];
	
	    // Push the current path onto the tokens.
	    if (path) {
	      tokens.push(path);
	      path = '';
	    }
	
	    var partial = prefix != null && next != null && next !== prefix;
	    var repeat = modifier === '+' || modifier === '*';
	    var optional = modifier === '?' || modifier === '*';
	    var delimiter = res[2] || defaultDelimiter;
	    var pattern = capture || group;
	
	    tokens.push({
	      name: name || key++,
	      prefix: prefix || '',
	      delimiter: delimiter,
	      optional: optional,
	      repeat: repeat,
	      partial: partial,
	      asterisk: !!asterisk,
	      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
	    });
	  }
	
	  // Match any characters still remaining.
	  if (index < str.length) {
	    path += str.substr(index);
	  }
	
	  // If the path exists, push it onto the end.
	  if (path) {
	    tokens.push(path);
	  }
	
	  return tokens
	}
	
	/**
	 * Compile a string to a template function for the path.
	 *
	 * @param  {string}             str
	 * @param  {Object=}            options
	 * @return {!function(Object=, Object=)}
	 */
	function compile (str, options) {
	  return tokensToFunction(parse(str, options))
	}
	
	/**
	 * Prettier encoding of URI path segments.
	 *
	 * @param  {string}
	 * @return {string}
	 */
	function encodeURIComponentPretty (str) {
	  return encodeURI(str).replace(/[\/?#]/g, function (c) {
	    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
	  })
	}
	
	/**
	 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
	 *
	 * @param  {string}
	 * @return {string}
	 */
	function encodeAsterisk (str) {
	  return encodeURI(str).replace(/[?#]/g, function (c) {
	    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
	  })
	}
	
	/**
	 * Expose a method for transforming tokens into the path function.
	 */
	function tokensToFunction (tokens) {
	  // Compile all the tokens into regexps.
	  var matches = new Array(tokens.length);
	
	  // Compile all the patterns before compilation.
	  for (var i = 0; i < tokens.length; i++) {
	    if (typeof tokens[i] === 'object') {
	      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
	    }
	  }
	
	  return function (obj, opts) {
	    var path = '';
	    var data = obj || {};
	    var options = opts || {};
	    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;
	
	    for (var i = 0; i < tokens.length; i++) {
	      var token = tokens[i];
	
	      if (typeof token === 'string') {
	        path += token;
	
	        continue
	      }
	
	      var value = data[token.name];
	      var segment;
	
	      if (value == null) {
	        if (token.optional) {
	          // Prepend partial segment prefixes.
	          if (token.partial) {
	            path += token.prefix;
	          }
	
	          continue
	        } else {
	          throw new TypeError('Expected "' + token.name + '" to be defined')
	        }
	      }
	
	      if (index$1(value)) {
	        if (!token.repeat) {
	          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
	        }
	
	        if (value.length === 0) {
	          if (token.optional) {
	            continue
	          } else {
	            throw new TypeError('Expected "' + token.name + '" to not be empty')
	          }
	        }
	
	        for (var j = 0; j < value.length; j++) {
	          segment = encode(value[j]);
	
	          if (!matches[i].test(segment)) {
	            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
	          }
	
	          path += (j === 0 ? token.prefix : token.delimiter) + segment;
	        }
	
	        continue
	      }
	
	      segment = token.asterisk ? encodeAsterisk(value) : encode(value);
	
	      if (!matches[i].test(segment)) {
	        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
	      }
	
	      path += token.prefix + segment;
	    }
	
	    return path
	  }
	}
	
	/**
	 * Escape a regular expression string.
	 *
	 * @param  {string} str
	 * @return {string}
	 */
	function escapeString (str) {
	  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
	}
	
	/**
	 * Escape the capturing group by escaping special characters and meaning.
	 *
	 * @param  {string} group
	 * @return {string}
	 */
	function escapeGroup (group) {
	  return group.replace(/([=!:$\/()])/g, '\\$1')
	}
	
	/**
	 * Attach the keys as a property of the regexp.
	 *
	 * @param  {!RegExp} re
	 * @param  {Array}   keys
	 * @return {!RegExp}
	 */
	function attachKeys (re, keys) {
	  re.keys = keys;
	  return re
	}
	
	/**
	 * Get the flags for a regexp from the options.
	 *
	 * @param  {Object} options
	 * @return {string}
	 */
	function flags (options) {
	  return options.sensitive ? '' : 'i'
	}
	
	/**
	 * Pull out keys from a regexp.
	 *
	 * @param  {!RegExp} path
	 * @param  {!Array}  keys
	 * @return {!RegExp}
	 */
	function regexpToRegexp (path, keys) {
	  // Use a negative lookahead to match only capturing groups.
	  var groups = path.source.match(/\((?!\?)/g);
	
	  if (groups) {
	    for (var i = 0; i < groups.length; i++) {
	      keys.push({
	        name: i,
	        prefix: null,
	        delimiter: null,
	        optional: false,
	        repeat: false,
	        partial: false,
	        asterisk: false,
	        pattern: null
	      });
	    }
	  }
	
	  return attachKeys(path, keys)
	}
	
	/**
	 * Transform an array into a regexp.
	 *
	 * @param  {!Array}  path
	 * @param  {Array}   keys
	 * @param  {!Object} options
	 * @return {!RegExp}
	 */
	function arrayToRegexp (path, keys, options) {
	  var parts = [];
	
	  for (var i = 0; i < path.length; i++) {
	    parts.push(pathToRegexp(path[i], keys, options).source);
	  }
	
	  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));
	
	  return attachKeys(regexp, keys)
	}
	
	/**
	 * Create a path regexp from string input.
	 *
	 * @param  {string}  path
	 * @param  {!Array}  keys
	 * @param  {!Object} options
	 * @return {!RegExp}
	 */
	function stringToRegexp (path, keys, options) {
	  return tokensToRegExp(parse(path, options), keys, options)
	}
	
	/**
	 * Expose a function for taking tokens and returning a RegExp.
	 *
	 * @param  {!Array}          tokens
	 * @param  {(Array|Object)=} keys
	 * @param  {Object=}         options
	 * @return {!RegExp}
	 */
	function tokensToRegExp (tokens, keys, options) {
	  if (!index$1(keys)) {
	    options = /** @type {!Object} */ (keys || options);
	    keys = [];
	  }
	
	  options = options || {};
	
	  var strict = options.strict;
	  var end = options.end !== false;
	  var route = '';
	
	  // Iterate over the tokens and create our regexp string.
	  for (var i = 0; i < tokens.length; i++) {
	    var token = tokens[i];
	
	    if (typeof token === 'string') {
	      route += escapeString(token);
	    } else {
	      var prefix = escapeString(token.prefix);
	      var capture = '(?:' + token.pattern + ')';
	
	      keys.push(token);
	
	      if (token.repeat) {
	        capture += '(?:' + prefix + capture + ')*';
	      }
	
	      if (token.optional) {
	        if (!token.partial) {
	          capture = '(?:' + prefix + '(' + capture + '))?';
	        } else {
	          capture = prefix + '(' + capture + ')?';
	        }
	      } else {
	        capture = prefix + '(' + capture + ')';
	      }
	
	      route += capture;
	    }
	  }
	
	  var delimiter = escapeString(options.delimiter || '/');
	  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter;
	
	  // In non-strict mode we allow a slash at the end of match. If the path to
	  // match already ends with a slash, we remove it for consistency. The slash
	  // is valid at the end of a path match, not in the middle. This is important
	  // in non-ending mode, where "/test/" shouldn't match "/test//route".
	  if (!strict) {
	    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?';
	  }
	
	  if (end) {
	    route += '$';
	  } else {
	    // In non-ending mode, we need the capturing groups to match as much as
	    // possible by using a positive lookahead to the end or next path segment.
	    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)';
	  }
	
	  return attachKeys(new RegExp('^' + route, flags(options)), keys)
	}
	
	/**
	 * Normalize the given path string, returning a regular expression.
	 *
	 * An empty array can be passed in for the keys, which will hold the
	 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
	 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
	 *
	 * @param  {(string|RegExp|Array)} path
	 * @param  {(Array|Object)=}       keys
	 * @param  {Object=}               options
	 * @return {!RegExp}
	 */
	function pathToRegexp (path, keys, options) {
	  if (!index$1(keys)) {
	    options = /** @type {!Object} */ (keys || options);
	    keys = [];
	  }
	
	  options = options || {};
	
	  if (path instanceof RegExp) {
	    return regexpToRegexp(path, /** @type {!Array} */ (keys))
	  }
	
	  if (index$1(path)) {
	    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
	  }
	
	  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
	}
	
	index.parse = parse_1;
	index.compile = compile_1;
	index.tokensToFunction = tokensToFunction_1;
	index.tokensToRegExp = tokensToRegExp_1;
	
	/*  */
	
	var regexpCompileCache = Object.create(null);
	
	function fillParams (
	  path,
	  params,
	  routeMsg
	) {
	  try {
	    var filler =
	      regexpCompileCache[path] ||
	      (regexpCompileCache[path] = index.compile(path));
	    return filler(params || {}, { pretty: true })
	  } catch (e) {
	    if (true) {
	      warn(false, ("missing param for " + routeMsg + ": " + (e.message)));
	    }
	    return ''
	  }
	}
	
	/*  */
	
	function createRouteMap (
	  routes,
	  oldPathList,
	  oldPathMap,
	  oldNameMap
	) {
	  // the path list is used to control path matching priority
	  var pathList = oldPathList || [];
	  var pathMap = oldPathMap || Object.create(null);
	  var nameMap = oldNameMap || Object.create(null);
	
	  routes.forEach(function (route) {
	    addRouteRecord(pathList, pathMap, nameMap, route);
	  });
	
	  // ensure wildcard routes are always at the end
	  for (var i = 0, l = pathList.length; i < l; i++) {
	    if (pathList[i] === '*') {
	      pathList.push(pathList.splice(i, 1)[0]);
	      l--;
	      i--;
	    }
	  }
	
	  return {
	    pathList: pathList,
	    pathMap: pathMap,
	    nameMap: nameMap
	  }
	}
	
	function addRouteRecord (
	  pathList,
	  pathMap,
	  nameMap,
	  route,
	  parent,
	  matchAs
	) {
	  var path = route.path;
	  var name = route.name;
	  if (true) {
	    assert(path != null, "\"path\" is required in a route configuration.");
	    assert(
	      typeof route.component !== 'string',
	      "route config \"component\" for path: " + (String(path || name)) + " cannot be a " +
	      "string id. Use an actual component instead."
	    );
	  }
	
	  var normalizedPath = normalizePath(path, parent);
	  var record = {
	    path: normalizedPath,
	    regex: compileRouteRegex(normalizedPath),
	    components: route.components || { default: route.component },
	    instances: {},
	    name: name,
	    parent: parent,
	    matchAs: matchAs,
	    redirect: route.redirect,
	    beforeEnter: route.beforeEnter,
	    meta: route.meta || {},
	    props: route.props == null
	      ? {}
	      : route.components
	        ? route.props
	        : { default: route.props }
	  };
	
	  if (route.children) {
	    // Warn if route is named and has a default child route.
	    // If users navigate to this route by name, the default child will
	    // not be rendered (GH Issue #629)
	    if (true) {
	      if (route.name && route.children.some(function (child) { return /^\/?$/.test(child.path); })) {
	        warn(
	          false,
	          "Named Route '" + (route.name) + "' has a default child route. " +
	          "When navigating to this named route (:to=\"{name: '" + (route.name) + "'\"), " +
	          "the default child route will not be rendered. Remove the name from " +
	          "this route and use the name of the default child route for named " +
	          "links instead."
	        );
	      }
	    }
	    route.children.forEach(function (child) {
	      var childMatchAs = matchAs
	        ? cleanPath((matchAs + "/" + (child.path)))
	        : undefined;
	      addRouteRecord(pathList, pathMap, nameMap, child, record, childMatchAs);
	    });
	  }
	
	  if (route.alias !== undefined) {
	    if (Array.isArray(route.alias)) {
	      route.alias.forEach(function (alias) {
	        var aliasRoute = {
	          path: alias,
	          children: route.children
	        };
	        addRouteRecord(pathList, pathMap, nameMap, aliasRoute, parent, record.path);
	      });
	    } else {
	      var aliasRoute = {
	        path: route.alias,
	        children: route.children
	      };
	      addRouteRecord(pathList, pathMap, nameMap, aliasRoute, parent, record.path);
	    }
	  }
	
	  if (!pathMap[record.path]) {
	    pathList.push(record.path);
	    pathMap[record.path] = record;
	  }
	
	  if (name) {
	    if (!nameMap[name]) {
	      nameMap[name] = record;
	    } else if (("development") !== 'production' && !matchAs) {
	      warn(
	        false,
	        "Duplicate named routes definition: " +
	        "{ name: \"" + name + "\", path: \"" + (record.path) + "\" }"
	      );
	    }
	  }
	}
	
	function compileRouteRegex (path) {
	  var regex = index(path);
	  if (true) {
	    var keys = {};
	    regex.keys.forEach(function (key) {
	      warn(!keys[key.name], ("Duplicate param keys in route with path: \"" + path + "\""));
	      keys[key.name] = true;
	    });
	  }
	  return regex
	}
	
	function normalizePath (path, parent) {
	  path = path.replace(/\/$/, '');
	  if (path[0] === '/') { return path }
	  if (parent == null) { return path }
	  return cleanPath(((parent.path) + "/" + path))
	}
	
	/*  */
	
	
	function normalizeLocation (
	  raw,
	  current,
	  append,
	  router
	) {
	  var next = typeof raw === 'string' ? { path: raw } : raw;
	  // named target
	  if (next.name || next._normalized) {
	    return next
	  }
	
	  // relative params
	  if (!next.path && next.params && current) {
	    next = assign({}, next);
	    next._normalized = true;
	    var params = assign(assign({}, current.params), next.params);
	    if (current.name) {
	      next.name = current.name;
	      next.params = params;
	    } else if (current.matched) {
	      var rawPath = current.matched[current.matched.length - 1].path;
	      next.path = fillParams(rawPath, params, ("path " + (current.path)));
	    } else if (true) {
	      warn(false, "relative params navigation requires a current route.");
	    }
	    return next
	  }
	
	  var parsedPath = parsePath(next.path || '');
	  var basePath = (current && current.path) || '/';
	  var path = parsedPath.path
	    ? resolvePath(parsedPath.path, basePath, append || next.append)
	    : basePath;
	
	  var query = resolveQuery(
	    parsedPath.query,
	    next.query,
	    router && router.options.parseQuery
	  );
	
	  var hash = next.hash || parsedPath.hash;
	  if (hash && hash.charAt(0) !== '#') {
	    hash = "#" + hash;
	  }
	
	  return {
	    _normalized: true,
	    path: path,
	    query: query,
	    hash: hash
	  }
	}
	
	function assign (a, b) {
	  for (var key in b) {
	    a[key] = b[key];
	  }
	  return a
	}
	
	/*  */
	
	
	function createMatcher (
	  routes,
	  router
	) {
	  var ref = createRouteMap(routes);
	  var pathList = ref.pathList;
	  var pathMap = ref.pathMap;
	  var nameMap = ref.nameMap;
	
	  function addRoutes (routes) {
	    createRouteMap(routes, pathList, pathMap, nameMap);
	  }
	
	  function match (
	    raw,
	    currentRoute,
	    redirectedFrom
	  ) {
	    var location = normalizeLocation(raw, currentRoute, false, router);
	    var name = location.name;
	
	    if (name) {
	      var record = nameMap[name];
	      if (true) {
	        warn(record, ("Route with name '" + name + "' does not exist"));
	      }
	      var paramNames = record.regex.keys
	        .filter(function (key) { return !key.optional; })
	        .map(function (key) { return key.name; });
	
	      if (typeof location.params !== 'object') {
	        location.params = {};
	      }
	
	      if (currentRoute && typeof currentRoute.params === 'object') {
	        for (var key in currentRoute.params) {
	          if (!(key in location.params) && paramNames.indexOf(key) > -1) {
	            location.params[key] = currentRoute.params[key];
	          }
	        }
	      }
	
	      if (record) {
	        location.path = fillParams(record.path, location.params, ("named route \"" + name + "\""));
	        return _createRoute(record, location, redirectedFrom)
	      }
	    } else if (location.path) {
	      location.params = {};
	      for (var i = 0; i < pathList.length; i++) {
	        var path = pathList[i];
	        var record$1 = pathMap[path];
	        if (matchRoute(record$1.regex, location.path, location.params)) {
	          return _createRoute(record$1, location, redirectedFrom)
	        }
	      }
	    }
	    // no match
	    return _createRoute(null, location)
	  }
	
	  function redirect (
	    record,
	    location
	  ) {
	    var originalRedirect = record.redirect;
	    var redirect = typeof originalRedirect === 'function'
	        ? originalRedirect(createRoute(record, location, null, router))
	        : originalRedirect;
	
	    if (typeof redirect === 'string') {
	      redirect = { path: redirect };
	    }
	
	    if (!redirect || typeof redirect !== 'object') {
	      if (true) {
	        warn(
	          false, ("invalid redirect option: " + (JSON.stringify(redirect)))
	        );
	      }
	      return _createRoute(null, location)
	    }
	
	    var re = redirect;
	    var name = re.name;
	    var path = re.path;
	    var query = location.query;
	    var hash = location.hash;
	    var params = location.params;
	    query = re.hasOwnProperty('query') ? re.query : query;
	    hash = re.hasOwnProperty('hash') ? re.hash : hash;
	    params = re.hasOwnProperty('params') ? re.params : params;
	
	    if (name) {
	      // resolved named direct
	      var targetRecord = nameMap[name];
	      if (true) {
	        assert(targetRecord, ("redirect failed: named route \"" + name + "\" not found."));
	      }
	      return match({
	        _normalized: true,
	        name: name,
	        query: query,
	        hash: hash,
	        params: params
	      }, undefined, location)
	    } else if (path) {
	      // 1. resolve relative redirect
	      var rawPath = resolveRecordPath(path, record);
	      // 2. resolve params
	      var resolvedPath = fillParams(rawPath, params, ("redirect route with path \"" + rawPath + "\""));
	      // 3. rematch with existing query and hash
	      return match({
	        _normalized: true,
	        path: resolvedPath,
	        query: query,
	        hash: hash
	      }, undefined, location)
	    } else {
	      if (true) {
	        warn(false, ("invalid redirect option: " + (JSON.stringify(redirect))));
	      }
	      return _createRoute(null, location)
	    }
	  }
	
	  function alias (
	    record,
	    location,
	    matchAs
	  ) {
	    var aliasedPath = fillParams(matchAs, location.params, ("aliased route with path \"" + matchAs + "\""));
	    var aliasedMatch = match({
	      _normalized: true,
	      path: aliasedPath
	    });
	    if (aliasedMatch) {
	      var matched = aliasedMatch.matched;
	      var aliasedRecord = matched[matched.length - 1];
	      location.params = aliasedMatch.params;
	      return _createRoute(aliasedRecord, location)
	    }
	    return _createRoute(null, location)
	  }
	
	  function _createRoute (
	    record,
	    location,
	    redirectedFrom
	  ) {
	    if (record && record.redirect) {
	      return redirect(record, redirectedFrom || location)
	    }
	    if (record && record.matchAs) {
	      return alias(record, location, record.matchAs)
	    }
	    return createRoute(record, location, redirectedFrom, router)
	  }
	
	  return {
	    match: match,
	    addRoutes: addRoutes
	  }
	}
	
	function matchRoute (
	  regex,
	  path,
	  params
	) {
	  var m = path.match(regex);
	
	  if (!m) {
	    return false
	  } else if (!params) {
	    return true
	  }
	
	  for (var i = 1, len = m.length; i < len; ++i) {
	    var key = regex.keys[i - 1];
	    var val = typeof m[i] === 'string' ? decodeURIComponent(m[i]) : m[i];
	    if (key) {
	      params[key.name] = val;
	    }
	  }
	
	  return true
	}
	
	function resolveRecordPath (path, record) {
	  return resolvePath(path, record.parent ? record.parent.path : '/', true)
	}
	
	/*  */
	
	
	var positionStore = Object.create(null);
	
	function setupScroll () {
	  window.addEventListener('popstate', function (e) {
	    saveScrollPosition();
	    if (e.state && e.state.key) {
	      setStateKey(e.state.key);
	    }
	  });
	}
	
	function handleScroll (
	  router,
	  to,
	  from,
	  isPop
	) {
	  if (!router.app) {
	    return
	  }
	
	  var behavior = router.options.scrollBehavior;
	  if (!behavior) {
	    return
	  }
	
	  if (true) {
	    assert(typeof behavior === 'function', "scrollBehavior must be a function");
	  }
	
	  // wait until re-render finishes before scrolling
	  router.app.$nextTick(function () {
	    var position = getScrollPosition();
	    var shouldScroll = behavior(to, from, isPop ? position : null);
	    if (!shouldScroll) {
	      return
	    }
	    var isObject = typeof shouldScroll === 'object';
	    if (isObject && typeof shouldScroll.selector === 'string') {
	      var el = document.querySelector(shouldScroll.selector);
	      if (el) {
	        position = getElementPosition(el);
	      } else if (isValidPosition(shouldScroll)) {
	        position = normalizePosition(shouldScroll);
	      }
	    } else if (isObject && isValidPosition(shouldScroll)) {
	      position = normalizePosition(shouldScroll);
	    }
	
	    if (position) {
	      window.scrollTo(position.x, position.y);
	    }
	  });
	}
	
	function saveScrollPosition () {
	  var key = getStateKey();
	  if (key) {
	    positionStore[key] = {
	      x: window.pageXOffset,
	      y: window.pageYOffset
	    };
	  }
	}
	
	function getScrollPosition () {
	  var key = getStateKey();
	  if (key) {
	    return positionStore[key]
	  }
	}
	
	function getElementPosition (el) {
	  var docEl = document.documentElement;
	  var docRect = docEl.getBoundingClientRect();
	  var elRect = el.getBoundingClientRect();
	  return {
	    x: elRect.left - docRect.left,
	    y: elRect.top - docRect.top
	  }
	}
	
	function isValidPosition (obj) {
	  return isNumber(obj.x) || isNumber(obj.y)
	}
	
	function normalizePosition (obj) {
	  return {
	    x: isNumber(obj.x) ? obj.x : window.pageXOffset,
	    y: isNumber(obj.y) ? obj.y : window.pageYOffset
	  }
	}
	
	function isNumber (v) {
	  return typeof v === 'number'
	}
	
	/*  */
	
	var supportsPushState = inBrowser && (function () {
	  var ua = window.navigator.userAgent;
	
	  if (
	    (ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) &&
	    ua.indexOf('Mobile Safari') !== -1 &&
	    ua.indexOf('Chrome') === -1 &&
	    ua.indexOf('Windows Phone') === -1
	  ) {
	    return false
	  }
	
	  return window.history && 'pushState' in window.history
	})();
	
	// use User Timing api (if present) for more accurate key precision
	var Time = inBrowser && window.performance && window.performance.now
	  ? window.performance
	  : Date;
	
	var _key = genKey();
	
	function genKey () {
	  return Time.now().toFixed(3)
	}
	
	function getStateKey () {
	  return _key
	}
	
	function setStateKey (key) {
	  _key = key;
	}
	
	function pushState (url, replace) {
	  saveScrollPosition();
	  // try...catch the pushState call to get around Safari
	  // DOM Exception 18 where it limits to 100 pushState calls
	  var history = window.history;
	  try {
	    if (replace) {
	      history.replaceState({ key: _key }, '', url);
	    } else {
	      _key = genKey();
	      history.pushState({ key: _key }, '', url);
	    }
	  } catch (e) {
	    window.location[replace ? 'replace' : 'assign'](url);
	  }
	}
	
	function replaceState (url) {
	  pushState(url, true);
	}
	
	/*  */
	
	function runQueue (queue, fn, cb) {
	  var step = function (index) {
	    if (index >= queue.length) {
	      cb();
	    } else {
	      if (queue[index]) {
	        fn(queue[index], function () {
	          step(index + 1);
	        });
	      } else {
	        step(index + 1);
	      }
	    }
	  };
	  step(0);
	}
	
	/*  */
	
	var History = function History (router, base) {
	  this.router = router;
	  this.base = normalizeBase(base);
	  // start with a route object that stands for "nowhere"
	  this.current = START;
	  this.pending = null;
	  this.ready = false;
	  this.readyCbs = [];
	  this.readyErrorCbs = [];
	  this.errorCbs = [];
	};
	
	History.prototype.listen = function listen (cb) {
	  this.cb = cb;
	};
	
	History.prototype.onReady = function onReady (cb, errorCb) {
	  if (this.ready) {
	    cb();
	  } else {
	    this.readyCbs.push(cb);
	    if (errorCb) {
	      this.readyErrorCbs.push(errorCb);
	    }
	  }
	};
	
	History.prototype.onError = function onError (errorCb) {
	  this.errorCbs.push(errorCb);
	};
	
	History.prototype.transitionTo = function transitionTo (location, onComplete, onAbort) {
	    var this$1 = this;
	
	  var route = this.router.match(location, this.current);
	  this.confirmTransition(route, function () {
	    this$1.updateRoute(route);
	    onComplete && onComplete(route);
	    this$1.ensureURL();
	
	    // fire ready cbs once
	    if (!this$1.ready) {
	      this$1.ready = true;
	      this$1.readyCbs.forEach(function (cb) { cb(route); });
	    }
	  }, function (err) {
	    if (onAbort) {
	      onAbort(err);
	    }
	    if (err && !this$1.ready) {
	      this$1.ready = true;
	      this$1.readyErrorCbs.forEach(function (cb) { cb(err); });
	    }
	  });
	};
	
	History.prototype.confirmTransition = function confirmTransition (route, onComplete, onAbort) {
	    var this$1 = this;
	
	  var current = this.current;
	  var abort = function (err) {
	    if (isError(err)) {
	      if (this$1.errorCbs.length) {
	        this$1.errorCbs.forEach(function (cb) { cb(err); });
	      } else {
	        warn(false, 'uncaught error during route navigation:');
	        console.error(err);
	      }
	    }
	    onAbort && onAbort(err);
	  };
	  if (
	    isSameRoute(route, current) &&
	    // in the case the route map has been dynamically appended to
	    route.matched.length === current.matched.length
	  ) {
	    this.ensureURL();
	    return abort()
	  }
	
	  var ref = resolveQueue(this.current.matched, route.matched);
	    var updated = ref.updated;
	    var deactivated = ref.deactivated;
	    var activated = ref.activated;
	
	  var queue = [].concat(
	    // in-component leave guards
	    extractLeaveGuards(deactivated),
	    // global before hooks
	    this.router.beforeHooks,
	    // in-component update hooks
	    extractUpdateHooks(updated),
	    // in-config enter guards
	    activated.map(function (m) { return m.beforeEnter; }),
	    // async components
	    resolveAsyncComponents(activated)
	  );
	
	  this.pending = route;
	  var iterator = function (hook, next) {
	    if (this$1.pending !== route) {
	      return abort()
	    }
	    try {
	      hook(route, current, function (to) {
	        if (to === false || isError(to)) {
	          // next(false) -> abort navigation, ensure current URL
	          this$1.ensureURL(true);
	          abort(to);
	        } else if (
	          typeof to === 'string' ||
	          (typeof to === 'object' && (
	            typeof to.path === 'string' ||
	            typeof to.name === 'string'
	          ))
	        ) {
	          // next('/') or next({ path: '/' }) -> redirect
	          abort();
	          if (typeof to === 'object' && to.replace) {
	            this$1.replace(to);
	          } else {
	            this$1.push(to);
	          }
	        } else {
	          // confirm transition and pass on the value
	          next(to);
	        }
	      });
	    } catch (e) {
	      abort(e);
	    }
	  };
	
	  runQueue(queue, iterator, function () {
	    var postEnterCbs = [];
	    var isValid = function () { return this$1.current === route; };
	    // wait until async components are resolved before
	    // extracting in-component enter guards
	    var enterGuards = extractEnterGuards(activated, postEnterCbs, isValid);
	    var queue = enterGuards.concat(this$1.router.resolveHooks);
	    runQueue(queue, iterator, function () {
	      if (this$1.pending !== route) {
	        return abort()
	      }
	      this$1.pending = null;
	      onComplete(route);
	      if (this$1.router.app) {
	        this$1.router.app.$nextTick(function () {
	          postEnterCbs.forEach(function (cb) { cb(); });
	        });
	      }
	    });
	  });
	};
	
	History.prototype.updateRoute = function updateRoute (route) {
	  var prev = this.current;
	  this.current = route;
	  this.cb && this.cb(route);
	  this.router.afterHooks.forEach(function (hook) {
	    hook && hook(route, prev);
	  });
	};
	
	function normalizeBase (base) {
	  if (!base) {
	    if (inBrowser) {
	      // respect <base> tag
	      var baseEl = document.querySelector('base');
	      base = (baseEl && baseEl.getAttribute('href')) || '/';
	    } else {
	      base = '/';
	    }
	  }
	  // make sure there's the starting slash
	  if (base.charAt(0) !== '/') {
	    base = '/' + base;
	  }
	  // remove trailing slash
	  return base.replace(/\/$/, '')
	}
	
	function resolveQueue (
	  current,
	  next
	) {
	  var i;
	  var max = Math.max(current.length, next.length);
	  for (i = 0; i < max; i++) {
	    if (current[i] !== next[i]) {
	      break
	    }
	  }
	  return {
	    updated: next.slice(0, i),
	    activated: next.slice(i),
	    deactivated: current.slice(i)
	  }
	}
	
	function extractGuards (
	  records,
	  name,
	  bind,
	  reverse
	) {
	  var guards = flatMapComponents(records, function (def, instance, match, key) {
	    var guard = extractGuard(def, name);
	    if (guard) {
	      return Array.isArray(guard)
	        ? guard.map(function (guard) { return bind(guard, instance, match, key); })
	        : bind(guard, instance, match, key)
	    }
	  });
	  return flatten(reverse ? guards.reverse() : guards)
	}
	
	function extractGuard (
	  def,
	  key
	) {
	  if (typeof def !== 'function') {
	    // extend now so that global mixins are applied.
	    def = _Vue.extend(def);
	  }
	  return def.options[key]
	}
	
	function extractLeaveGuards (deactivated) {
	  return extractGuards(deactivated, 'beforeRouteLeave', bindGuard, true)
	}
	
	function extractUpdateHooks (updated) {
	  return extractGuards(updated, 'beforeRouteUpdate', bindGuard)
	}
	
	function bindGuard (guard, instance) {
	  if (instance) {
	    return function boundRouteGuard () {
	      return guard.apply(instance, arguments)
	    }
	  }
	}
	
	function extractEnterGuards (
	  activated,
	  cbs,
	  isValid
	) {
	  return extractGuards(activated, 'beforeRouteEnter', function (guard, _, match, key) {
	    return bindEnterGuard(guard, match, key, cbs, isValid)
	  })
	}
	
	function bindEnterGuard (
	  guard,
	  match,
	  key,
	  cbs,
	  isValid
	) {
	  return function routeEnterGuard (to, from, next) {
	    return guard(to, from, function (cb) {
	      next(cb);
	      if (typeof cb === 'function') {
	        cbs.push(function () {
	          // #750
	          // if a router-view is wrapped with an out-in transition,
	          // the instance may not have been registered at this time.
	          // we will need to poll for registration until current route
	          // is no longer valid.
	          poll(cb, match.instances, key, isValid);
	        });
	      }
	    })
	  }
	}
	
	function poll (
	  cb, // somehow flow cannot infer this is a function
	  instances,
	  key,
	  isValid
	) {
	  if (instances[key]) {
	    cb(instances[key]);
	  } else if (isValid()) {
	    setTimeout(function () {
	      poll(cb, instances, key, isValid);
	    }, 16);
	  }
	}
	
	function resolveAsyncComponents (matched) {
	  return function (to, from, next) {
	    var hasAsync = false;
	    var pending = 0;
	    var error = null;
	
	    flatMapComponents(matched, function (def, _, match, key) {
	      // if it's a function and doesn't have cid attached,
	      // assume it's an async component resolve function.
	      // we are not using Vue's default async resolving mechanism because
	      // we want to halt the navigation until the incoming component has been
	      // resolved.
	      if (typeof def === 'function' && def.cid === undefined) {
	        hasAsync = true;
	        pending++;
	
	        var resolve = once(function (resolvedDef) {
	          // save resolved on async factory in case it's used elsewhere
	          def.resolved = typeof resolvedDef === 'function'
	            ? resolvedDef
	            : _Vue.extend(resolvedDef);
	          match.components[key] = resolvedDef;
	          pending--;
	          if (pending <= 0) {
	            next();
	          }
	        });
	
	        var reject = once(function (reason) {
	          var msg = "Failed to resolve async component " + key + ": " + reason;
	          ("development") !== 'production' && warn(false, msg);
	          if (!error) {
	            error = isError(reason)
	              ? reason
	              : new Error(msg);
	            next(error);
	          }
	        });
	
	        var res;
	        try {
	          res = def(resolve, reject);
	        } catch (e) {
	          reject(e);
	        }
	        if (res) {
	          if (typeof res.then === 'function') {
	            res.then(resolve, reject);
	          } else {
	            // new syntax in Vue 2.3
	            var comp = res.component;
	            if (comp && typeof comp.then === 'function') {
	              comp.then(resolve, reject);
	            }
	          }
	        }
	      }
	    });
	
	    if (!hasAsync) { next(); }
	  }
	}
	
	function flatMapComponents (
	  matched,
	  fn
	) {
	  return flatten(matched.map(function (m) {
	    return Object.keys(m.components).map(function (key) { return fn(
	      m.components[key],
	      m.instances[key],
	      m, key
	    ); })
	  }))
	}
	
	function flatten (arr) {
	  return Array.prototype.concat.apply([], arr)
	}
	
	// in Webpack 2, require.ensure now also returns a Promise
	// so the resolve/reject functions may get called an extra time
	// if the user uses an arrow function shorthand that happens to
	// return that Promise.
	function once (fn) {
	  var called = false;
	  return function () {
	    if (called) { return }
	    called = true;
	    return fn.apply(this, arguments)
	  }
	}
	
	function isError (err) {
	  return Object.prototype.toString.call(err).indexOf('Error') > -1
	}
	
	/*  */
	
	
	var HTML5History = (function (History$$1) {
	  function HTML5History (router, base) {
	    var this$1 = this;
	
	    History$$1.call(this, router, base);
	
	    var expectScroll = router.options.scrollBehavior;
	
	    if (expectScroll) {
	      setupScroll();
	    }
	
	    window.addEventListener('popstate', function (e) {
	      this$1.transitionTo(getLocation(this$1.base), function (route) {
	        if (expectScroll) {
	          handleScroll(router, route, this$1.current, true);
	        }
	      });
	    });
	  }
	
	  if ( History$$1 ) HTML5History.__proto__ = History$$1;
	  HTML5History.prototype = Object.create( History$$1 && History$$1.prototype );
	  HTML5History.prototype.constructor = HTML5History;
	
	  HTML5History.prototype.go = function go (n) {
	    window.history.go(n);
	  };
	
	  HTML5History.prototype.push = function push (location, onComplete, onAbort) {
	    var this$1 = this;
	
	    var ref = this;
	    var fromRoute = ref.current;
	    this.transitionTo(location, function (route) {
	      pushState(cleanPath(this$1.base + route.fullPath));
	      handleScroll(this$1.router, route, fromRoute, false);
	      onComplete && onComplete(route);
	    }, onAbort);
	  };
	
	  HTML5History.prototype.replace = function replace (location, onComplete, onAbort) {
	    var this$1 = this;
	
	    var ref = this;
	    var fromRoute = ref.current;
	    this.transitionTo(location, function (route) {
	      replaceState(cleanPath(this$1.base + route.fullPath));
	      handleScroll(this$1.router, route, fromRoute, false);
	      onComplete && onComplete(route);
	    }, onAbort);
	  };
	
	  HTML5History.prototype.ensureURL = function ensureURL (push) {
	    if (getLocation(this.base) !== this.current.fullPath) {
	      var current = cleanPath(this.base + this.current.fullPath);
	      push ? pushState(current) : replaceState(current);
	    }
	  };
	
	  HTML5History.prototype.getCurrentLocation = function getCurrentLocation () {
	    return getLocation(this.base)
	  };
	
	  return HTML5History;
	}(History));
	
	function getLocation (base) {
	  var path = window.location.pathname;
	  if (base && path.indexOf(base) === 0) {
	    path = path.slice(base.length);
	  }
	  return (path || '/') + window.location.search + window.location.hash
	}
	
	/*  */
	
	
	var HashHistory = (function (History$$1) {
	  function HashHistory (router, base, fallback) {
	    History$$1.call(this, router, base);
	    // check history fallback deeplinking
	    if (fallback && checkFallback(this.base)) {
	      return
	    }
	    ensureSlash();
	  }
	
	  if ( History$$1 ) HashHistory.__proto__ = History$$1;
	  HashHistory.prototype = Object.create( History$$1 && History$$1.prototype );
	  HashHistory.prototype.constructor = HashHistory;
	
	  // this is delayed until the app mounts
	  // to avoid the hashchange listener being fired too early
	  HashHistory.prototype.setupListeners = function setupListeners () {
	    var this$1 = this;
	
	    window.addEventListener('hashchange', function () {
	      if (!ensureSlash()) {
	        return
	      }
	      this$1.transitionTo(getHash(), function (route) {
	        replaceHash(route.fullPath);
	      });
	    });
	  };
	
	  HashHistory.prototype.push = function push (location, onComplete, onAbort) {
	    this.transitionTo(location, function (route) {
	      pushHash(route.fullPath);
	      onComplete && onComplete(route);
	    }, onAbort);
	  };
	
	  HashHistory.prototype.replace = function replace (location, onComplete, onAbort) {
	    this.transitionTo(location, function (route) {
	      replaceHash(route.fullPath);
	      onComplete && onComplete(route);
	    }, onAbort);
	  };
	
	  HashHistory.prototype.go = function go (n) {
	    window.history.go(n);
	  };
	
	  HashHistory.prototype.ensureURL = function ensureURL (push) {
	    var current = this.current.fullPath;
	    if (getHash() !== current) {
	      push ? pushHash(current) : replaceHash(current);
	    }
	  };
	
	  HashHistory.prototype.getCurrentLocation = function getCurrentLocation () {
	    return getHash()
	  };
	
	  return HashHistory;
	}(History));
	
	function checkFallback (base) {
	  var location = getLocation(base);
	  if (!/^\/#/.test(location)) {
	    window.location.replace(
	      cleanPath(base + '/#' + location)
	    );
	    return true
	  }
	}
	
	function ensureSlash () {
	  var path = getHash();
	  if (path.charAt(0) === '/') {
	    return true
	  }
	  replaceHash('/' + path);
	  return false
	}
	
	function getHash () {
	  // We can't use window.location.hash here because it's not
	  // consistent across browsers - Firefox will pre-decode it!
	  var href = window.location.href;
	  var index = href.indexOf('#');
	  return index === -1 ? '' : href.slice(index + 1)
	}
	
	function pushHash (path) {
	  window.location.hash = path;
	}
	
	function replaceHash (path) {
	  var i = window.location.href.indexOf('#');
	  window.location.replace(
	    window.location.href.slice(0, i >= 0 ? i : 0) + '#' + path
	  );
	}
	
	/*  */
	
	
	var AbstractHistory = (function (History$$1) {
	  function AbstractHistory (router, base) {
	    History$$1.call(this, router, base);
	    this.stack = [];
	    this.index = -1;
	  }
	
	  if ( History$$1 ) AbstractHistory.__proto__ = History$$1;
	  AbstractHistory.prototype = Object.create( History$$1 && History$$1.prototype );
	  AbstractHistory.prototype.constructor = AbstractHistory;
	
	  AbstractHistory.prototype.push = function push (location, onComplete, onAbort) {
	    var this$1 = this;
	
	    this.transitionTo(location, function (route) {
	      this$1.stack = this$1.stack.slice(0, this$1.index + 1).concat(route);
	      this$1.index++;
	      onComplete && onComplete(route);
	    }, onAbort);
	  };
	
	  AbstractHistory.prototype.replace = function replace (location, onComplete, onAbort) {
	    var this$1 = this;
	
	    this.transitionTo(location, function (route) {
	      this$1.stack = this$1.stack.slice(0, this$1.index).concat(route);
	      onComplete && onComplete(route);
	    }, onAbort);
	  };
	
	  AbstractHistory.prototype.go = function go (n) {
	    var this$1 = this;
	
	    var targetIndex = this.index + n;
	    if (targetIndex < 0 || targetIndex >= this.stack.length) {
	      return
	    }
	    var route = this.stack[targetIndex];
	    this.confirmTransition(route, function () {
	      this$1.index = targetIndex;
	      this$1.updateRoute(route);
	    });
	  };
	
	  AbstractHistory.prototype.getCurrentLocation = function getCurrentLocation () {
	    var current = this.stack[this.stack.length - 1];
	    return current ? current.fullPath : '/'
	  };
	
	  AbstractHistory.prototype.ensureURL = function ensureURL () {
	    // noop
	  };
	
	  return AbstractHistory;
	}(History));
	
	/*  */
	
	var VueRouter = function VueRouter (options) {
	  if ( options === void 0 ) options = {};
	
	  this.app = null;
	  this.apps = [];
	  this.options = options;
	  this.beforeHooks = [];
	  this.resolveHooks = [];
	  this.afterHooks = [];
	  this.matcher = createMatcher(options.routes || [], this);
	
	  var mode = options.mode || 'hash';
	  this.fallback = mode === 'history' && !supportsPushState;
	  if (this.fallback) {
	    mode = 'hash';
	  }
	  if (!inBrowser) {
	    mode = 'abstract';
	  }
	  this.mode = mode;
	
	  switch (mode) {
	    case 'history':
	      this.history = new HTML5History(this, options.base);
	      break
	    case 'hash':
	      this.history = new HashHistory(this, options.base, this.fallback);
	      break
	    case 'abstract':
	      this.history = new AbstractHistory(this, options.base);
	      break
	    default:
	      if (true) {
	        assert(false, ("invalid mode: " + mode));
	      }
	  }
	};
	
	var prototypeAccessors = { currentRoute: {} };
	
	VueRouter.prototype.match = function match (
	  raw,
	  current,
	  redirectedFrom
	) {
	  return this.matcher.match(raw, current, redirectedFrom)
	};
	
	prototypeAccessors.currentRoute.get = function () {
	  return this.history && this.history.current
	};
	
	VueRouter.prototype.init = function init (app /* Vue component instance */) {
	    var this$1 = this;
	
	  ("development") !== 'production' && assert(
	    install.installed,
	    "not installed. Make sure to call `Vue.use(VueRouter)` " +
	    "before creating root instance."
	  );
	
	  this.apps.push(app);
	
	  // main app already initialized.
	  if (this.app) {
	    return
	  }
	
	  this.app = app;
	
	  var history = this.history;
	
	  if (history instanceof HTML5History) {
	    history.transitionTo(history.getCurrentLocation());
	  } else if (history instanceof HashHistory) {
	    var setupHashListener = function () {
	      history.setupListeners();
	    };
	    history.transitionTo(
	      history.getCurrentLocation(),
	      setupHashListener,
	      setupHashListener
	    );
	  }
	
	  history.listen(function (route) {
	    this$1.apps.forEach(function (app) {
	      app._route = route;
	    });
	  });
	};
	
	VueRouter.prototype.beforeEach = function beforeEach (fn) {
	  return registerHook(this.beforeHooks, fn)
	};
	
	VueRouter.prototype.beforeResolve = function beforeResolve (fn) {
	  return registerHook(this.resolveHooks, fn)
	};
	
	VueRouter.prototype.afterEach = function afterEach (fn) {
	  return registerHook(this.afterHooks, fn)
	};
	
	VueRouter.prototype.onReady = function onReady (cb, errorCb) {
	  this.history.onReady(cb, errorCb);
	};
	
	VueRouter.prototype.onError = function onError (errorCb) {
	  this.history.onError(errorCb);
	};
	
	VueRouter.prototype.push = function push (location, onComplete, onAbort) {
	  this.history.push(location, onComplete, onAbort);
	};
	
	VueRouter.prototype.replace = function replace (location, onComplete, onAbort) {
	  this.history.replace(location, onComplete, onAbort);
	};
	
	VueRouter.prototype.go = function go (n) {
	  this.history.go(n);
	};
	
	VueRouter.prototype.back = function back () {
	  this.go(-1);
	};
	
	VueRouter.prototype.forward = function forward () {
	  this.go(1);
	};
	
	VueRouter.prototype.getMatchedComponents = function getMatchedComponents (to) {
	  var route = to
	    ? to.matched
	      ? to
	      : this.resolve(to).route
	    : this.currentRoute;
	  if (!route) {
	    return []
	  }
	  return [].concat.apply([], route.matched.map(function (m) {
	    return Object.keys(m.components).map(function (key) {
	      return m.components[key]
	    })
	  }))
	};
	
	VueRouter.prototype.resolve = function resolve (
	  to,
	  current,
	  append
	) {
	  var location = normalizeLocation(
	    to,
	    current || this.history.current,
	    append,
	    this
	  );
	  var route = this.match(location, current);
	  var fullPath = route.redirectedFrom || route.fullPath;
	  var base = this.history.base;
	  var href = createHref(base, fullPath, this.mode);
	  return {
	    location: location,
	    route: route,
	    href: href,
	    // for backwards compat
	    normalizedTo: location,
	    resolved: route
	  }
	};
	
	VueRouter.prototype.addRoutes = function addRoutes (routes) {
	  this.matcher.addRoutes(routes);
	  if (this.history.current !== START) {
	    this.history.transitionTo(this.history.getCurrentLocation());
	  }
	};
	
	Object.defineProperties( VueRouter.prototype, prototypeAccessors );
	
	function registerHook (list, fn) {
	  list.push(fn);
	  return function () {
	    var i = list.indexOf(fn);
	    if (i > -1) { list.splice(i, 1); }
	  }
	}
	
	function createHref (base, fullPath, mode) {
	  var path = mode === 'hash' ? '#' + fullPath : fullPath;
	  return base ? cleanPath(base + '/' + path) : path
	}
	
	VueRouter.install = install;
	VueRouter.version = '2.5.3';
	
	if (inBrowser && window.Vue) {
	  window.Vue.use(VueRouter);
	}
	
	module.exports = VueRouter;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	(function (global, factory) {
		 true ? module.exports = factory(__webpack_require__(4)) :
		typeof define === 'function' && define.amd ? define(['tether'], factory) :
		(global.bootstrapVue = factory(global.Tether));
	}(this, (function (Tether) { 'use strict';
	
	Tether = 'default' in Tether ? Tether['default'] : Tether;
	
	var alert = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.localShow)?_c('div',{class:_vm.classObject,attrs:{"role":"alert"}},[(_vm.dismissible)?_c('button',{staticClass:"close",attrs:{"type":"button","data-dismiss":"alert","aria-label":"Close"},on:{"click":function($event){$event.stopPropagation();$event.preventDefault();_vm.dismiss($event);}}},[_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("×")])]):_vm._e(),_vm._t("default")],2):_vm._e()},staticRenderFns: [],
	    data: function data() {
	        return {
	            countDownTimerId: null,
	            dismissed: false
	        };
	    },
	    created: function created() {
	        if (this.state) {
	            console.warn('<b-alrt> state property is deprecated, please use variant instead.');
	        }
	    },
	    computed: {
	        classObject: function classObject() {
	            return ['alert', this.alertVariant, this.dismissible ? 'alert-dismissible' : ''];
	        },
	        alertVariant: function alertVariant() {
	            var variant = this.state || this.variant || 'info';
	            return ("alert-" + variant);
	        },
	        localShow: function localShow() {
	            return !this.dismissed && (this.countDownTimerId || this.show);
	        }
	    },
	    props: {
	        variant: {
	            type: String,
	            default: 'info'
	        },
	        state: {
	            type: String,
	            default: null
	        },
	        dismissible: {
	            type: Boolean,
	            default: false
	        },
	        show: {
	            type: [Boolean, Number],
	            default: false
	        }
	    },
	    watch: {
	        show: function show() {
	            this.showChanged();
	        }
	    },
	    mounted: function mounted() {
	        this.showChanged();
	    },
	    methods: {
	        dismiss: function dismiss() {
	            this.dismissed = true;
	            this.$emit('dismissed');
	            this.clearCounter();
	        },
	        clearCounter: function clearCounter() {
	            if (this.countDownTimerId) {
	                clearInterval(this.countDownTimerId);
	            }
	        },
	        showChanged: function showChanged() {
	            var this$1 = this;
	
	            // Reset dismiss status
	            this.dismissed = false;
	
	            // No timer for boolean values
	            if (this.show === true || this.show === false || this.show === null || this.show === 0) {
	                return;
	            }
	
	            var dismissCountDown = this.show;
	            this.$emit('dismiss-count-down', dismissCountDown);
	
	            // Start counter
	            this.clearCounter();
	            this.countDownTimerId = setInterval(function () {
	                if (dismissCountDown < 2) {
	                    return this$1.dismiss();
	                }
	                dismissCountDown--;
	                this$1.$emit('dismiss-count-down', dismissCountDown);
	            }, 1000);
	        }
	    }
	};
	
	var bLink = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c(_vm.componentType,{tag:"a",attrs:{"active-class":_vm.activeClass,"to":_vm.to,"href":_vm.hrefString,"exact":_vm.exact},on:{"click":_vm.click}},[_vm._t("default")],2)},staticRenderFns: [],
	    computed: {
	        componentType: function componentType() {
	            return (this.$router && this.to) ? 'router-link' : 'a';
	        },
	        hrefString: function hrefString() {
	            if (this.to) {
	                return this.to.path || this.to;
	            }
	            return this.href;
	        }
	    },
	    props: {
	        activeClass: {
	            type: String,
	            default: 'active'
	        },
	        to: {
	            type: [String, Object],
	            default: null
	        },
	        href: {
	            type: String
	        },
	        exact: {
	            type: Boolean,
	            default: false
	        }
	    },
	    methods: {
	        click: function click(e) {
	            this.$emit('click', e);
	            this.$root.$emit('shown::dropdown', this);
	        }
	    }
	};
	
	var breadcrumb = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('ol',{staticClass:"breadcrumb"},[_vm._l((_vm.items),function(item){return (_vm.items)?_c('li',{class:['breadcrumb-item', item.active ? 'active' : null]},[(item.active)?_c('span',{domProps:{"innerHTML":_vm._s(item.text)}}):_c('b-link',{attrs:{"to":item.to||item.href||item.link},domProps:{"innerHTML":_vm._s(item.text)}})],1):_vm._e()}),_vm._t("default")],2)},staticRenderFns: [],
	    components: {bLink: bLink},
	    computed: {
	        componentType: function componentType() {
	            return this.to ? 'router-link' : 'a';
	        }
	    },
	    props: {
	        items: {
	            type: Array,
	            default: function () { return []; },
	            required: true
	        }
	    },
	    methods: {
	        onclick: function onclick(item) {
	            this.$emit('click', item);
	            if (this.$router && this.to) {
	                this.$router.push(this.to);
	            }
	        }
	    }
	};
	
	var bBtn = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c(_vm.componentType,{tag:"button",class:_vm.classObject,attrs:{"to":_vm.to,"href":_vm.href},on:{"click":_vm.onclick}},[_vm._t("default")],2)},staticRenderFns: [],
	    components: {bLink: bLink},
	    computed: {
	        classObject: function classObject() {
	            return [
	                'btn',
	                this.btnVariant,
	                this.btnSize,
	                this.btnBlock,
	                this.btnDisabled,
	                this.inactive ? 'btn-inactive' : ''
	            ];
	        },
	        componentType: function componentType() {
	            return (this.href || this.to) ? 'b-link' : 'button';
	        },
	        btnBlock: function btnBlock() {
	            return this.block ? "btn-block" : '';
	        },
	        btnVariant: function btnVariant() {
	            return this.variant ? ("btn-" + (this.variant)) : "btn-secondary";
	        },
	        btnSize: function btnSize() {
	            return this.size ? ("btn-" + (this.size)) : '';
	        },
	        btnDisabled: function btnDisabled() {
	            return this.disabled ? 'disabled' : '';
	        }
	    },
	    props: {
	        block: {
	            type: Boolean,
	            default: false
	        },
	        disabled: {
	            type: Boolean,
	            default: false
	        },
	        inactive: {
	            type: Boolean,
	            default: false
	        },
	        role: {
	            type: String,
	            default: ''
	        },
	        size: {
	            type: String,
	            default: 'md'
	        },
	        variant: {
	            type: String,
	            default: null
	        },
	        to: {
	            type: [String, Object]
	        },
	        href: {
	            type: String
	        }
	    },
	    methods: {
	        onclick: function onclick(e) {
	            this.$emit('click', e);
	        }
	    }
	};
	
	var buttonGroup = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:_vm.classObject,attrs:{"role":"group"}},[_vm._t("default")],2)},staticRenderFns: [],
	    computed: {
	        classObject: function classObject() {
	            return [
	                'btn-' + (this.toolbar ? 'toolbar' : 'group'),
	                this.vertical ? 'btn-group-vertical' : '',
	                this.size ? ('btn-group-' + this.size) : ''
	            ];
	        }
	    },
	    props: {
	        vertical: {
	            type: Boolean,
	            default: false
	        },
	        toolbar: {
	            type: Boolean,
	            default: false
	        },
	        size: {
	            type: String,
	            default: null
	        }
	    }
	};
	
	var card = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:['card',_vm.cardVariant,_vm.cardAlign,_vm.cardInverse]},[_vm._t("img",[(_vm.img)?_c('img',{staticClass:"card-img",attrs:{"src":_vm.img,"alt":_vm.imgAlt}}):_vm._e()]),(_vm.header || _vm.showHeader)?_c(_vm.headerTag,{tag:"component",staticClass:"card-header"},[_vm._t("header",[_c('div',{domProps:{"innerHTML":_vm._s(_vm.header)}})])],2):_vm._e(),(_vm.noBlock)?[_vm._t("default")]:_c('div',{class:_vm.blockClass},[(_vm.title)?_c('h4',{staticClass:"card-title",domProps:{"innerHTML":_vm._s(_vm.title)}}):_vm._e(),(_vm.subTitle)?_c('h6',{staticClass:"card-subtitle mb-2 text-muted",domProps:{"innerHTML":_vm._s(_vm.subTitle)}}):_vm._e(),_vm._t("default")],2),(_vm.footer || _vm.showFooter)?_c(_vm.footerTag,{tag:"component",staticClass:"card-footer"},[_vm._t("footer",[_c('div',{domProps:{"innerHTML":_vm._s(_vm.footer)}})])],2):_vm._e()],2)},staticRenderFns: [],
	    computed: {
	        blockClass: function blockClass() {
	            return [
	                'card-block',
	                this.overlay ? 'card-img-overlay' : null
	            ];
	        },
	        cardVariant: function cardVariant() {
	            return this.variant ? ("card-" + (this.variant)) : null;
	        },
	        cardInverse: function cardInverse() {
	            if (this.overlay || this.inverse) {
	                return 'card-inverse';
	            }
	            // Auto inverse colored cards
	            if (this.inverse === null && this.variant && this.variant.length > 0 &&
	                this.variant.indexOf('outline') === -1) {
	                return 'card-inverse';
	            }
	        },
	        cardAlign: function cardAlign() {
	            return this.align ? ("text-" + (this.align)) : null;
	        }
	    },
	    props: {
	        align: {
	            type: String,
	            default: null
	        },
	        inverse: {
	            type: Boolean,
	            // It should remain null for auto inverse
	            default: null
	        },
	        variant: {
	            type: String,
	            default: null
	        },
	
	        // Header
	        header: {
	            type: String,
	            default: null
	        },
	        showHeader: {
	            type: Boolean,
	            default: false
	        },
	        headerTag: {
	            type: String,
	            default: 'div'
	        },
	
	        // Footer
	        footer: {
	            type: String,
	            default: null
	        },
	        showFooter: {
	            type: Boolean,
	            default: false
	        },
	        footerTag: {
	            type: String,
	            default: 'div'
	        },
	
	        // Main block
	        title: {
	            type: String,
	            default: null
	        },
	        subTitle: {
	            type: String,
	            default: null
	        },
	        noBlock: {
	            type: Boolean,
	            default: false
	        },
	
	        // Image
	        img: {
	            type: String,
	            default: null
	        },
	        imgAlt: {
	            type: String,
	            default: null
	        },
	        overlay: {
	            type: Boolean,
	            default: false
	        }
	    }
	};
	
	var cardGroup = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:['card-' + _vm.type]},[_vm._t("default")],2)},staticRenderFns: [],
	    computed: {
	        type: function type() {
	            if (this.deck) {
	                return 'deck';
	            }
	
	            if (this.columns) {
	                return 'columns';
	            }
	
	            return 'group';
	        }
	    },
	    props: {
	        deck: {
	            type: Boolean,
	            default: false
	        },
	        columns: {
	            type: Boolean,
	            default: false
	        }
	    }
	};
	
	var DIRECTION = {
	    next: {
	        current: 'carousel-item-left',
	        next: 'carousel-item-right',
	        overlay: 'carousel-item-next'
	    },
	    prev: {
	        current: 'carousel-item-right',
	        next: 'carousel-item-left',
	        overlay: 'carousel-item-prev'
	    }
	};
	
	var carousel = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"carousel slide",style:({background: _vm.background,height: _vm.height}),on:{"mouseenter":_vm.pause,"mouseleave":_vm.start}},[_c('ol',{directives:[{name:"show",rawName:"v-show",value:(_vm.indicators),expression:"indicators"}],staticClass:"carousel-indicators"},_vm._l((_vm.slides.length),function(n){return _c('li',{class:{active:n-1 === _vm.index},on:{"click":function($event){_vm.index=n-1;}}})})),_c('div',{staticClass:"carousel-inner",attrs:{"role":"listbox"}},[_vm._t("default")],2),(_vm.controls)?[_c('a',{staticClass:"carousel-control-prev",attrs:{"href":"#","role":"button","data-slide":"prev"},on:{"click":function($event){$event.stopPropagation();$event.preventDefault();_vm.prev($event);}}},[_c('span',{staticClass:"carousel-control-prev-icon",attrs:{"aria-hidden":"true"}}),_vm._v(" "),_c('span',{staticClass:"sr-only"},[_vm._v("Previous")])]),_c('a',{staticClass:"carousel-control-next",attrs:{"href":"#","role":"button","data-slide":"next"},on:{"click":function($event){$event.stopPropagation();$event.preventDefault();_vm.next($event);}}},[_c('span',{staticClass:"carousel-control-next-icon",attrs:{"aria-hidden":"true"}}),_vm._v(" "),_c('span',{staticClass:"sr-only"},[_vm._v("Next")])])]:_vm._e()],2)},staticRenderFns: [],
	    data: function data() {
	        return {
	            index: 0,
	            isSliding: false,
	            slides: []
	        };
	    },
	    props: {
	        interval: {
	            type: Number,
	            default: 5000
	        },
	        indicators: {
	            type: Boolean,
	            default: false
	        },
	        controls: {
	            type: Boolean,
	            default: false
	        },
	        height: {
	            type: String
	        },
	        background: {
	            type: String
	        }
	    },
	    methods: {
	        // Previous slide
	        prev: function prev() {
	            if (this.index <= 0) {
	                this.index = this.slides.length - 1;
	            } else {
	                this.index--;
	            }
	        },
	
	        // Next slide
	        next: function next() {
	            if (this.index >= this.slides.length - 1) {
	                this.index = 0;
	            } else {
	                this.index++;
	            }
	        },
	
	        // Pause auto rotation
	        pause: function pause() {
	            if (this.interval === 0 || typeof this.interval === 'undefined') {
	                return;
	            }
	            clearInterval(this._intervalId);
	        },
	
	        // Start auto rotate slides
	        start: function start() {
	            var this$1 = this;
	
	            if (this.interval === 0 || typeof this.interval === 'undefined') {
	                return;
	            }
	            this._intervalId = setInterval(function () {
	                this$1.next();
	            }, this.interval);
	        }
	    },
	    mounted: function mounted() {
	        // Get all slides
	        this.slides = this.$el.querySelectorAll('.carousel-item');
	
	        // Set first slide as active
	        this.slides[0].classList.add('active');
	
	        // Auto rotate slides
	        this.start();
	    },
	    watch: {
	        index: function index(val, oldVal) {
	            var this$1 = this;
	
	            if (val === oldVal) {
	                return;
	            }
	
	            if (this.isSliding) {
	                this.index = oldVal;
	                return;
	            }
	
	            // Determine sliding direction
	            var direction = (val > oldVal) ? DIRECTION.next : DIRECTION.prev;
	
	            // Rotates
	            if (oldVal === 0 && val === this.slides.length - 1) {
	                direction = DIRECTION.prev;
	            } else if (oldVal === this.slides.length - 1 && val === 0) {
	                direction = DIRECTION.next;
	            }
	
	            // Determine current and next slides
	            var currentSlide = this.slides[oldVal];
	            var nextSlide = this.slides[val];
	
	            if (!currentSlide || !nextSlide) {
	                return;
	            }
	
	            // Start animating
	            this.isSliding = true;
	
	            nextSlide.classList.add(direction.next, direction.overlay);
	            currentSlide.classList.add(direction.current);
	
	            this._carouselAnimation = setTimeout(function () {
	                this$1.isSliding = false;
	                this$1.$emit('slide', val);
	
	                currentSlide.classList.remove('active');
	                nextSlide.classList.add('active');
	
	                currentSlide.classList.remove(direction.current);
	                nextSlide.classList.remove(direction.next, direction.overlay);
	            }, 500);
	        }
	    },
	    destroyed: function destroyed() {
	        clearTimeout(this._carouselAnimation);
	        clearInterval(this._intervalId);
	    }
	};
	
	var carouselSlide = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"carousel-item",style:({background: _vm.background,height: _vm.height})},[(_vm.img)?_c('img',{staticClass:"d-block img-fluid",attrs:{"src":_vm.img,"alt":_vm.imgAlt}}):_vm._e(),_c('div',{staticClass:"carousel-caption d-none d-md-block"},[(_vm.caption)?_c('h3',{domProps:{"innerHTML":_vm._s(_vm.caption)}}):_vm._e(),(_vm.text)?_c('p',{domProps:{"innerHTML":_vm._s(_vm.text)}}):_vm._e(),_vm._t("default")],2)])},staticRenderFns: [],
	    props: {
	        img: {
	            type: String
	        },
	        imgAlt: {
	            type: String
	        },
	
	        caption: {
	            type: String
	        },
	        text: {
	            type: String
	        },
	
	        background: {
	            type: String
	        },
	        height: {
	            type: String
	        }
	    }
	};
	
	var collapse = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":"collapse"},on:{"enter":_vm.enter,"leave":_vm.leave}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.show),expression:"show"}],class:_vm.classObject},[_vm._t("default")],2)])},staticRenderFns: [],
	
	    data: function data() {
	        return {
	            show: false
	        };
	    },
	
	    computed: {
	        classObject: function classObject() {
	            return {
	                'navbar-collapse': this.isNav,
	                show: this.show
	            };
	        }
	    },
	
	    props: {
	        isNav: {
	            type: Boolean,
	            default: false
	        },
	        id: {
	            type: String,
	            required: true
	        }
	    },
	
	    methods: {
	        toggle: function toggle() {
	            this.show = !this.show;
	        },
	        enter: function enter(el) {
	            var height = 0;
	            Array.prototype.forEach.call(el.children, function (c) {
	                height += parseInt(getComputedStyle(c).height, 10);
	            });
	            el.style.height = height + "px";
	        },
	        leave: function leave(el) {
	            el.style.height = null;
	        }
	    },
	
	    created: function created() {
	        var this$1 = this;
	
	        this.$root.$on('collapse::toggle', function (target) {
	            if (target !== this$1.id) {
	                return;
	            }
	            this$1.toggle();
	        });
	    }
	};
	
	var clickOut = {
	    mounted: function mounted() {
	        if (typeof document !== 'undefined') {
	            document.documentElement.addEventListener('click', this._clickOutListener);
	        }
	    },
	    destroyed: function destroyed() {
	        if (typeof document !== 'undefined') {
	            document.removeEventListener('click', this._clickOutListener);
	        }
	    },
	    methods: {
	        _clickOutListener: function _clickOutListener(e) {
	            if (!this.$el.contains(e.target)) {
	                if (this.clickOutListener) {
	                    this.clickOutListener();
	                }
	            }
	        }
	    }
	};
	
	var dropdown = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:['dropdown','btn-group',_vm.visible?'show':'',_vm.dropup?'dropup':'']},[_c('b-button',{class:[_vm.split?'':'dropdown-toggle'],attrs:{"aria-haspopup":"true","aria-expanded":_vm.visible,"variant":_vm.variant,"size":_vm.size,"disabled":_vm.disabled},on:{"click":_vm.click}},[_vm._t("text",[_vm._v(_vm._s(_vm.text))])],2),(_vm.split)?_c('b-button',{staticClass:"dropdown-toggle dropdown-toggle-split",attrs:{"variant":_vm.variant,"size":_vm.size,"disabled":_vm.disabled},on:{"click":_vm.toggle}},[_c('span',{staticClass:"sr-only"},[_vm._v("Toggle Dropdown")])]):_vm._e(),_c('div',{class:['dropdown-menu',_vm.right?'dropdown-menu-right':'']},[_vm._t("default")],2)],1)},staticRenderFns: [],
	    mixins: [
	        clickOut
	    ],
	    components: {
	        bButton: bBtn
	    },
	    data: function data() {
	        return {
	            visible: false
	        };
	    },
	    props: {
	        split: {
	            type: Boolean,
	            default: false
	        },
	        text: {
	            type: String,
	            default: ''
	        },
	        size: {
	            type: String,
	            default: null
	        },
	        variant: {
	            type: String,
	            default: null
	        },
	        dropup: {
	            type: Boolean,
	            default: false
	        },
	        disabled: {
	            type: Boolean,
	            default: false
	        },
	        right: {
	            type: Boolean,
	            default: false
	        }
	    },
	    created: function created() {
	        var this$1 = this;
	
	        this.$root.$on('shown::dropdown', function (el) {
	            if (el !== this$1) {
	                this$1.visible = false;
	            }
	        });
	    },
	    watch: {
	        visible: function visible(state, old) {
	            if (state === old) {
	                return; // Avoid duplicated emits
	            }
	
	            if (state) {
	                this.$root.$emit('shown::dropdown', this);
	            } else {
	                this.$root.$emit('hidden::dropdown', this);
	            }
	        }
	    },
	    methods: {
	        toggle: function toggle() {
	            this.visible = !this.visible;
	        },
	        clickOutListener: function clickOutListener() {
	            this.visible = false;
	        },
	        click: function click(e) {
	            if (this.split) {
	                this.$emit('click', e);
	                this.$root.$emit('shown::dropdown', this);
	            } else {
	                this.toggle();
	            }
	        }
	    }
	};
	
	var dropdownItem = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c(_vm.itemType,{tag:"a",staticClass:"dropdown-item",attrs:{"to":_vm.to,"href":_vm.hrefString},on:{"click":_vm.click}},[_vm._t("default")],2)},staticRenderFns: [],
	    extends: bLink,
	    computed: {
	        itemType: function itemType() {
	            return (this.href || this.to) ? this.componentType : 'button';
	        }
	    }
	};
	
	var dropdownSelect = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"dropdown-select",class:{open: _vm.show, dropdown: !_vm.dropup, dropup: _vm.dropup}},[_c('button',{class:['btn','dropdown',_vm.dropdownToggle,_vm.btnVariant,_vm.btnSize],attrs:{"id":_vm.id,"role":"button","aria-haspopup":"true","aria-expanded":"show","disabled":_vm.disabled},on:{"click":function($event){$event.preventDefault();_vm.toggle($event);}}},[_c('span',{staticClass:"checked-items",domProps:{"innerHTML":_vm._s(_vm.displayItem)}})]),_c('ul',{staticClass:"dropdown-menu",class:{'dropdown-menu-right' : _vm.position == 'right'},attrs:{"aria-labelledby":"dLabel"}},_vm._l((_vm.list),function(item){return _c('li',[_c('button',{staticClass:"dropdown-item",attrs:{"click":_vm.select(item)}},[_vm._v(_vm._s(item.text))])])}))])},staticRenderFns: [],
	    data: function data() {
	        return {
	            show: false,
	            selected: false
	        };
	    },
	    computed: {
	        btnVariant: function btnVariant() {
	            return !this.variant || this.variant === "default" ? "btn-secondary" : ("btn-" + (this.variant));
	        },
	        btnSize: function btnSize() {
	            return !this.size || this.size === "default" ? "" : ("btn-" + (this.size));
	        },
	        dropdownToggle: function dropdownToggle() {
	            return this.caret ? 'dropdown-toggle' : '';
	        },
	        displayItem: function displayItem() {
	            // If zero show default message
	            if ((this.returnObject && this.model && !this.model.text) || (!this.returnObject && this.model && this.model.length === 0) || this.forceDefault) {
	                return this.defaultText;
	            }
	
	            // Show selected item
	            if (this.returnObject && this.model && this.model.text) {
	                return this.model.text;
	            }
	
	            // Show text that coresponds to the model value
	            if (!this.returnObject && this.model) {
	                var result = this.model || '';
	                this.list.forEach(function (item) {
	                    if (item.value === this.model) {
	                        result = item.text;
	                    }
	                });
	                return result;
	            }
	
	            return '';
	        }
	    },
	    props: {
	        id: {
	            type: String
	        },
	        model: {
	            required: false
	        },
	        list: {
	            type: Array,
	            default: [],
	            required: true
	        },
	        caret: {
	            type: Boolean,
	            default: true
	        },
	        position: {
	            type: String,
	            default: 'left'
	        },
	        size: {
	            type: String,
	            default: ''
	        },
	        variant: {
	            type: String,
	            default: 'default'
	        },
	        defaultText: {
	            type: String,
	            default: 'Plase select one'
	        },
	        forceDefault: {
	            type: Boolean,
	            default: false
	        },
	        returnObject: {
	            type: Boolean,
	            default: false
	        },
	        dropup: {
	            type: Boolean,
	            default: false
	        },
	        disabled: {
	            type: Boolean,
	            default: false
	        }
	    },
	    methods: {
	        toggle: function toggle(e) {
	            // Hide an alert
	            this.show = !this.show;
	            // Dispatch an event from the current vm that propagates all the way up to its $root
	            if (this.show) {
	                this.$root.$emit('shown:dropdown', this.id);
	                e.stopPropagation();
	            } else {
	                this.$root.$emit('hidden::dropdown', this.id);
	            }
	        },
	        select: function select(item) {
	            // We need to set empty model to make model watchers react to it
	            if (this.returnObject) {
	                this.model = item;
	            } else {
	                this.model = item.value;
	            }
	            this.show = false;
	            // Dispatch an event from the current vm that propagates all the way up to its $root
	            this.$root.$emit('selected::dropdown', this.id, this.model);
	        }
	    },
	    created: function created() {
	        var hub = this.$root;
	        hub.$on('hide::dropdown', function () {
	            this.show = false;
	        });
	    }
	};
	
	var form = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('form',{class:_vm.classObject},[_vm._t("default")],2)},staticRenderFns: [],
	    computed: {
	        classObject: function classObject() {
	            return [
	                this.inline ? 'form-inline' : ''
	            ];
	        }
	    },
	    props: {
	        inline: {
	            type: Boolean,
	            default: false
	        }
	    }
	};
	
	var formFieldset = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:['form-group','row',_vm.inputState]},[(_vm.label)?_c('label',{class:['col-form-label',_vm.labelLayout],attrs:{"for":_vm.target},domProps:{"innerHTML":_vm._s(_vm.label)}}):_vm._e(),_c('div',{ref:"content",class:_vm.inputLayout},[_vm._t("default"),(_vm.feedback)?_c('div',{staticClass:"form-text text-muted",domProps:{"innerHTML":_vm._s(_vm.feedback)}}):_vm._e(),(_vm.description)?_c('small',{staticClass:"form-text text-muted",domProps:{"innerHTML":_vm._s(_vm.description)}}):_vm._e()],2)])},staticRenderFns: [],
	    data: function data() {
	        return {
	            target: null
	        };
	    },
	    computed: {
	        inputState: function inputState() {
	            return this.state ? ("has-" + (this.state)) : '';
	        },
	        labelLayout: function labelLayout() {
	            return this.horizontal ? ('col-sm-' + this.labelSize) : 'col-12';
	        },
	        inputLayout: function inputLayout() {
	            return this.horizontal ? ('col-sm-' + (12 - this.labelSize)) : 'col-12';
	        }
	    },
	    mounted: function mounted() {
	        var content = this.$refs.content;
	        if (!content) {
	            return;
	        }
	        this.target = content.children[0].id;
	    },
	    props: {
	        state: {
	            type: String,
	            default: null
	        },
	        horizontal: {
	            type: Boolean,
	            default: false
	        },
	        labelSize: {
	            type: Number,
	            default: 3
	        },
	        label: {
	            type: String,
	            default: null
	        },
	        description: {
	            type: String,
	            default: null
	        },
	        feedback: {
	            type: String,
	            default: null
	        }
	    }
	};
	
	var formMixin = {
	    computed: {
	        inputClass: function inputClass() {
	            return [
	                this.size ? ("form-control-" + (this.size)) : null,
	                this.state ? ("form-control-" + (this.state)) : null
	            ];
	        },
	        custom: function custom() {
	            return !this.plain;
	        }
	    },
	    props: {
	        name: {
	            type: String
	        },
	        disabled: {
	            type: Boolean
	        },
	        plain: {
	            type: Boolean,
	            default: false
	        },
	        state: {
	            type: String
	        },
	        size: {
	            type: String
	        },
	        id: {
	            type: String
	        }
	    }
	};
	
	var formCheckBoxMixin = {
	    computed: {
	        checkboxClass: function checkboxClass() {
	            return {
	                'custom-control': this.custom,
	                'form-check-inline': this.inline
	            };
	        }
	    }
	};
	
	var formCheckbox = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('label',{class:[_vm.inputClass,_vm.checkboxClass,_vm.custom?'custom-checkbox':null]},[_c('input',{class:[_vm.custom?'custom-control-input':null],attrs:{"type":"checkbox","id":_vm.id,"name":_vm.name,"disabled":_vm.disabled},domProps:{"value":_vm.value,"checked":_vm.checked===_vm.value},on:{"change":function($event){_vm.$emit('change',$event.target.checked?_vm.value:_vm.uncheckedValue);}}}),_vm._v(" "),(_vm.custom)?_c('span',{staticClass:"custom-control-indicator"}):_vm._e(),_vm._v(" "),_c('span',{class:[_vm.custom?'custom-control-description':null]},[_vm._t("default")],2)])},staticRenderFns: [],
	    mixins: [formMixin, formCheckBoxMixin],
	    model: {
	        prop: 'checked',
	        event: 'change'
	    },
	    props: {
	        value: {
	            default: true
	        },
	        uncheckedValue: {
	            default: false
	        },
	        checked: {
	            default: true
	        }
	    }
	};
	
	var formOptions = {
	    computed: {
	        formOptions: function formOptions() {
	            var this$1 = this;
	
	            var options = this.options || {};
	
	            if (Array.isArray(options)) {
	                // Normalize flat arrays to object Array
	                options = options.map(function (option) {
	                    if (typeof option === 'object') {
	                        return {
	                            value: option[this$1.valueField],
	                            text: option[this$1.textField]
	                        };
	                    }
	
	                    return {text: String(option), value: option || {}};
	                });
	            } else {
	                // Normalize Objects keys to Array
	                options = Object.keys(options).map(function (value) {
	                    var option = options[value] || {};
	
	                    // Resolve text
	                    if (typeof option !== 'object') {
	                        option = {text: String(option)};
	                    }
	
	                    // Resolve value (uses key as value if not provided)
	                    option.value = option[this$1.valueField] || value;
	
	                    return option;
	                });
	            }
	
	            return options;
	        },
	        selectedValue: function selectedValue() {
	            var this$1 = this;
	
	            var formOptions = this.formOptions;
	            for (var i = 0; i < formOptions.length; i++) {
	                if (formOptions[i].value === this$1.localValue) {
	                    if (this$1.returnObject) {
	                        return formOptions[i];
	                    }
	                    return formOptions[i].value;
	                }
	            }
	        }
	    },
	    props: {
	        valueField: {
	            type: [String],
	            default: 'value'
	        },
	        textField: {
	            type: [String],
	            default: 'text'
	        }
	    },
	    watch: {
	        localValue: function localValue(value, old_value) {
	            if (value === old_value) {
	                return;
	            }
	            this.$emit('input', this.selectedValue);
	        },
	        value: function value(value$1, old_value) {
	            if (value$1 === old_value) {
	                return;
	            }
	            this.localValue = value$1;
	        }
	    }
	};
	
	var formRadio = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:[_vm.inputClass,this.stacked?'custom-controls-stacked':'']},_vm._l((_vm.formOptions),function(option){return _c('label',{class:[_vm.checkboxClass,_vm.custom?'custom-radio':null]},[_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.localValue),expression:"localValue"}],ref:"inputs",refInFor:true,class:_vm.custom?'custom-control-input':null,attrs:{"type":"radio","name":option.name,"id":option.id,"disabled":option.disabled},domProps:{"value":option.value,"checked":_vm._q(_vm.localValue,option.value)},on:{"__c":function($event){_vm.localValue=option.value;}}}),_vm._v(" "),(_vm.custom)?_c('span',{staticClass:"custom-control-indicator"}):_vm._e(),_vm._v(" "),_c('span',{class:_vm.custom?'custom-control-description':null,domProps:{"innerHTML":_vm._s(option.text)}})])}))},staticRenderFns: [],
	    mixins: [formMixin, formCheckBoxMixin, formOptions],
	    data: function data() {
	        return {
	            localValue: this.value
	        };
	    },
	    computed: {
	        inputState: function inputState() {
	            return this.state ? ("has-" + (this.state)) : '';
	        }
	    },
	    props: {
	        value: {},
	        options: {
	            type: [Array, Object],
	            default: null,
	            required: true
	        },
	        stacked: {
	            type: Boolean,
	            default: false
	        },
	        returnObject: {
	            type: Boolean,
	            default: false
	        }
	    }
	};
	
	var formInput = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c(_vm.textarea?'textarea':'input',{ref:"input",tag:"input",class:['form-control',_vm.inputClass],attrs:{"type":_vm.type,"name":_vm.name,"id":_vm.id || ('b_'+_vm._uid),"disabled":_vm.disabled,"rows":_vm.rows || _vm.rowsCount,"placeholder":_vm.placeholder},domProps:{"value":_vm.value},on:{"input":function($event){_vm.onInput($event.target.value);},"change":function($event){_vm.onChange($event.target.value);},"keyup":function($event){_vm.onKeyUp($event);},"focus":function($event){_vm.$emit('focus');},"blur":function($event){_vm.$emit('blur');}}})},staticRenderFns: [],
	    mixins: [formMixin],
	    computed: {
	        rowsCount: function rowsCount() {
	            return (this.value || '').toString().split('\n').length;
	        }
	    },
	    methods: {
	        format: function format(value) {
	            if (this.formatter) {
	                var formattedValue = this.formatter(value);
	                if (formattedValue !== value) {
	                    value = formattedValue;
	                    this.$refs.input.value = formattedValue;
	                }
	            }
	            return value;
	        },
	        onInput: function onInput(value) {
	            if (!this.lazyFormatter) {
	                value = this.format(value);
	            }
	            this.$emit('input', value);
	        },
	        onChange: function onChange(value) {
	            value = this.format(value);
	            this.$emit('input', value);
	            this.$emit('change', value);
	        },
	        onKeyUp: function onKeyUp(e) {
	            this.$emit('keyup', e);
	        }
	    },
	    props: {
	        value: {
	            default: null
	        },
	        type: {
	            type: String,
	            default: 'text'
	        },
	        placeholder: {
	            type: String,
	            default: null
	        },
	        rows: {
	            type: Number,
	            default: null
	        },
	        textarea: {
	            type: Boolean,
	            default: false
	        },
	        formatter: {
	            type: Function
	        },
	        lazyFormatter: {
	            type: Boolean,
	            default: false
	        }
	    }
	};
	
	var formFile = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('label',{class:[_vm.custom?'custom-file':null,_vm.inputClass],on:{"dragover":function($event){$event.stopPropagation();$event.preventDefault();_vm.dragover($event);}}},[(_vm.dragging)?_c('span',{staticClass:"drop-here",attrs:{"data-drop":_vm.dropLabel},on:{"dragover":function($event){$event.stopPropagation();$event.preventDefault();_vm.dragover($event);},"drop":function($event){$event.stopPropagation();$event.preventDefault();_vm.drop($event);},"dragleave":function($event){$event.stopPropagation();$event.preventDefault();_vm.dragging=false;}}}):_vm._e(),_c('input',{ref:"input",staticClass:"custom-file-input",attrs:{"type":"file","name":_vm.name,"id":_vm.id,"disabled":_vm.disabled,"accept":_vm.accept,"multiple":_vm.multiple,"webkitdirectory":_vm.directory},on:{"change":_vm.onFileChange}}),_vm._v(" "),(_vm.custom)?_c('span',{class:['custom-file-control',_vm.dragging?'dragging':null,_vm.inputClass],attrs:{"data-choose":_vm.computedChooseLabel,"data-selected":_vm.selectedLabel}}):_vm._e()])},staticRenderFns: [],
	    mixins: [formMixin],
	    data: function data() {
	        return {
	            selectedFile: null,
	            dragging: false
	        };
	    },
	    computed: {
	        selectedLabel: function selectedLabel() {
	            if (!this.selectedFile || this.selectedFile.length === 0) {
	                return this.placeholder || 'No file chosen';
	            }
	
	            if (this.multiple) {
	                if (this.selectedFile.length === 1) {
	                    return this.selectedFile[0].name;
	                }
	
	                return this.selectedFormat
	                    .replace(':names', this.selectedFile.map(function (file) { return file.name; }).join(','))
	                    .replace(':count', this.selectedFile.length);
	            }
	
	            return this.selectedFile.name;
	        },
	        computedChooseLabel: function computedChooseLabel() {
	            return this.chooseLabel || (this.multiple ? 'Choose Files' : 'Choose File');
	        }
	    },
	    watch: {
	        selectedFile: function selectedFile(newVal, oldVal) {
	            if (newVal === oldVal) {
	                return;
	            }
	
	            if (!newVal && this.multiple) {
	                this.$emit('input', []);
	            } else {
	                this.$emit('input', newVal);
	            }
	        }
	    },
	    methods: {
	        onFileChange: function onFileChange(e) {
	            var this$1 = this;
	
	            // Always emit original event
	            this.$emit('change', e);
	
	            // Check if special `items` prop is available on event (drop mode)
	            // Can be disabled by setting no-traverse
	            var items = e.dataTransfer && e.dataTransfer.items;
	            if (items && !this.noTraverse) {
	                var queue = [];
	                for (var i = 0; i < items.length; i++) {
	                    var item = items[i].webkitGetAsEntry();
	                    if (item) {
	                        queue.push(this$1.traverseFileTree(item));
	                    }
	                }
	                Promise.all(queue).then(function (filesArr) {
	                    this$1.setFiles(Array.prototype.concat.apply([], filesArr));
	                });
	                return;
	            }
	
	            // Normal handling
	            this.setFiles(e.target.files || e.dataTransfer.files);
	        },
	        setFiles: function setFiles(files) {
	            var this$1 = this;
	
	            if (!files) {
	                this.selectedFile = null;
	                return;
	            }
	
	            if (!this.multiple) {
	                this.selectedFile = files[0];
	                return;
	            }
	
	            // Convert files to array
	            var filesArray = [];
	            for (var i = 0; i < files.length; i++) {
	                if (files[i].type.match(this$1.accept)) {
	                    filesArray.push(files[i]);
	                }
	            }
	
	            this.selectedFile = filesArray;
	        },
	        dragover: function dragover(e) {
	            if (this.noDrop) {
	                return;
	            }
	
	            this.dragging = true;
	            e.dataTransfer.dropEffect = 'copy';
	        },
	        drop: function drop(e) {
	            if (this.noDrop) {
	                return;
	            }
	
	            this.dragging = false;
	            if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
	                this.onFileChange(e);
	            }
	        },
	        traverseFileTree: function traverseFileTree(item, path) {
	            var this$1 = this;
	
	            // Based on http://stackoverflow.com/questions/3590058
	            return new Promise(function (resolve) {
	                path = path || '';
	                if (item.isFile) {
	                    // Get file
	                    item.file(function (file) {
	                        file.$path = path; // Inject $path to file obj
	                        resolve(file);
	                    });
	                } else if (item.isDirectory) {
	                    // Get folder contents
	                    item.createReader().readEntries(function (entries) {
	                        var queue = [];
	                        for (var i = 0; i < entries.length; i++) {
	                            queue.push(this$1.traverseFileTree(entries[i], path + item.name + '/'));
	                        }
	                        Promise.all(queue).then(function (filesArr) {
	                            resolve(Array.prototype.concat.apply([], filesArr));
	                        });
	                    });
	                }
	            });
	        }
	    },
	    props: {
	        accept: {
	            type: String,
	            default: ''
	        },
	        placeholder: {
	            type: String,
	            default: null
	        },
	        chooseLabel: {
	            type: String,
	            default: null
	        },
	        multiple: {
	            type: Boolean,
	            default: false
	        },
	        directory: {
	            type: Boolean,
	            default: false
	        },
	        noTraverse: {
	            type: Boolean,
	            default: false
	        },
	        selectedFormat: {
	            type: String,
	            default: ':count Files'
	        },
	        noDrop: {
	            type: Boolean,
	            default: false
	        },
	        dropLabel: {
	            type: String,
	            default: 'Drop files here'
	        }
	    }
	};
	
	var formSelect = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('select',{directives:[{name:"model",rawName:"v-model",value:(_vm.localValue),expression:"localValue"}],ref:"input",class:[_vm.inputClass,_vm.custom?'custom-select':null],attrs:{"name":_vm.name,"id":_vm.id,"disabled":_vm.disabled},on:{"change":function($event){var $$selectedVal = Array.prototype.filter.call($event.target.options,function(o){return o.selected}).map(function(o){var val = "_value" in o ? o._value : o.value;return val}); _vm.localValue=$event.target.multiple ? $$selectedVal : $$selectedVal[0];}}},_vm._l((_vm.formOptions),function(option){return _c('option',{attrs:{"disabled":option.disabled},domProps:{"value":option.value,"innerHTML":_vm._s(option.text)}})}))},staticRenderFns: [],
	    mixins: [formMixin, formOptions],
	    data: function data() {
	        return {
	            localValue: this.value
	        };
	    },
	    props: {
	        value: {},
	        options: {
	            type: [Array, Object],
	            required: true
	        },
	        returnObject: {
	            type: Boolean,
	            default: false
	        }
	    }
	};
	
	var jumbotron = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{class:['jumbotron',_vm.fluid?'jumbotron-fluid':null]},[_c('div',{staticClass:"container"},[(_vm.header)?_c('h1',{staticClass:"display-3",domProps:{"innerHTML":_vm._s(_vm.header)}}):_vm._e(),(_vm.lead)?_c('p',{staticClass:"lead",domProps:{"innerHTML":_vm._s(_vm.lead)}}):_vm._e(),_vm._t("default")],2)])},staticRenderFns: [],
	    computed: {},
	    props: {
	        fluid: {
	            type: Boolean,
	            default: false
	        },
	        header: {
	            type: String,
	            default: null
	        },
	        lead: {
	            type: String,
	            default: null
	        }
	    }
	};
	
	var badge = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{class:['badge',_vm.badgeVariant,_vm.badgePill]},[_vm._t("default")],2)},staticRenderFns: [],
	    computed: {
	        badgeVariant: function badgeVariant() {
	            return !this.variant || this.variant === "default" ? "badge-default" : ("badge-" + (this.variant));
	        },
	        badgePill: function badgePill() {
	            return this.pill ? 'badge-pill' : '';
	        }
	    },
	    props: {
	        variant: {
	            type: String,
	            default: 'default'
	        },
	        pill: {
	            type: Boolean,
	            default: false
	        }
	    }
	};
	
	var listGroup = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c(_vm.tag,{tag:"component",class:['list-group',_vm.flush?'list-group-flush':null]},[_vm._t("default")],2)},staticRenderFns: [],
	    props: {
	        tag: {
	            type: String,
	            default: 'div'
	        },
	        flush: {
	            type: Boolean,
	            default: false
	        }
	    }
	};
	
	var actionTags = ['a', 'router-link', 'button', 'b-link'];
	
	var listGroupItem = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c(_vm.myTag,{ref:"item",tag:"component",class:_vm.classObject,attrs:{"to":_vm.to,"href":_vm.href}},[_vm._t("default")],2)},staticRenderFns: [],
	    components: {bLink: bLink},
	    computed: {
	        classObject: function classObject() {
	            return [
	                'list-group-item',
	                this.listState,
	                this.active ? 'active' : null,
	                this.disabled ? 'disabled' : null,
	                this.isAction ? 'list-group-item-action' : null
	            ];
	        },
	        isAction: function isAction() {
	            if (this.action === false) {
	                return false;
	            }
	            return this.action || this.to || this.href || actionTags.indexOf(this.tag) !== -1;
	        },
	        listState: function listState() {
	            return this.variant ? ("list-group-item-" + (this.variant)) : null;
	        },
	        myTag: function myTag() {
	            if (this.tag) {
	                return this.tag;
	            }
	            return (this.to || this.href) ? 'b-link' : 'div';
	        }
	    },
	    props: {
	        tag: {
	            type: String,
	            default: null
	        },
	        active: {
	            type: Boolean,
	            default: false
	        },
	        action: {
	            type: Boolean,
	            default: null
	        },
	        disabled: {
	            type: Boolean,
	            default: false
	        },
	        variant: {
	            type: String,
	            default: null
	        },
	        to: {
	            type: String,
	            default: null
	        },
	        href: {
	            type: String,
	            default: null
	        }
	    }
	};
	
	var media = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"media"},[(!_vm.rightAlign)?_c('div',{class:['d-flex','mr-3',_vm.verticalAlignClass]},[_vm._t("aside")],2):_vm._e(),_c('div',{staticClass:"media-body"},[_vm._t("default")],2),(_vm.rightAlign)?_c('div',{class:['d-flex','ml-3',_vm.verticalAlignClass]},[_vm._t("aside")],2):_vm._e()])},staticRenderFns: [],
	    computed: {
	        verticalAlignClass: function verticalAlignClass() {
	            return ("align-self-" + (this.verticalAlign));
	        }
	    },
	    props: {
	        rightAlign: {
	            type: Boolean,
	            default: false
	        },
	        verticalAlign: {
	            type: String,
	            default: 'top'
	        }
	    }
	};
	
	var modal = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('transition-group',{attrs:{"enter-class":"hidden","enter-to-class":"show","enter-active-class":"","leave-class":"show","leave-active-class":"","leave-to-class":"hidden"},on:{"after-enter":_vm.afterEnter}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.visible),expression:"visible"}],key:"modal",class:['modal',{fade :_vm.fade}],attrs:{"id":_vm.id},on:{"click":function($event){_vm.onClickOut($event);}}},[_c('div',{class:['modal-dialog','modal-'+_vm.size]},[_c('div',{staticClass:"modal-content",on:{"click":function($event){$event.stopPropagation();}}},[(!_vm.hideHeader)?_c('div',{staticClass:"modal-header"},[_vm._t("modal-header",[_c('h5',{staticClass:"modal-title"},[_vm._t("modal-title",[_vm._v(_vm._s(_vm.title))])],2),_c('button',{staticClass:"close",attrs:{"type":"button","aria-label":"Close"},on:{"click":_vm.hide}},[_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("×")])])])],2):_vm._e(),_c('div',{staticClass:"modal-body"},[_vm._t("default")],2),(!_vm.hideFooter)?_c('div',{staticClass:"modal-footer"},[_vm._t("modal-footer",[_c('b-btn',{attrs:{"variant":"secondary"},on:{"click":function($event){_vm.hide(false);}}},[_vm._v(_vm._s(_vm.closeTitle))]),_c('b-btn',{attrs:{"variant":"primary"},on:{"click":function($event){_vm.hide(true);}}},[_vm._v(_vm._s(_vm.okTitle))])])],2):_vm._e()])])]),(_vm.visible)?_c('div',{key:"modal-backdrop",class:['modal-backdrop',{fade: _vm.fade}]}):_vm._e()])],1)},staticRenderFns: [],
	    components: {bBtn: bBtn},
	    data: function data() {
	        return {
	            visible: false
	        };
	    },
	    computed: {
	        body: function body() {
	            if (typeof document !== 'undefined') {
	                return document.querySelector('body');
	            }
	        }
	    },
	    props: {
	        id: {
	            type: String,
	            default: null
	        },
	        title: {
	            type: String,
	            default: ''
	        },
	        size: {
	            type: String,
	            default: 'md'
	        },
	        fade: {
	            type: Boolean,
	            default: true
	        },
	        closeTitle: {
	            type: String,
	            default: 'Close'
	        },
	        okTitle: {
	            type: String,
	            default: 'OK'
	        },
	        closeOnBackdrop: {
	            type: Boolean,
	            default: true
	        },
	        hideHeader: {
	            type: Boolean,
	            default: false
	        },
	        hideFooter: {
	            type: Boolean,
	            default: false
	        }
	    },
	    methods: {
	        show: function show() {
	            if (this.visible) {
	                return;
	            }
	            this.visible = true;
	            this.$root.$emit('shown::modal', this.id);
	            this.body.classList.add('modal-open');
	            this.$emit('shown');
	        },
	        hide: function hide(isOK) {
	            if (!this.visible) {
	                return;
	            }
	
	            // Create event object
	            var canceled = false;
	            var e = {
	                isOK: isOK,
	                cancel: function cancel() {
	                    canceled = true;
	                }
	            };
	
	            // Emit events
	            this.$emit('hidden', e);
	
	            if (isOK === true) {
	                this.$emit('ok', e);
	            } else if (isOK === false) {
	                this.$emit('cancel', e);
	            }
	
	            // Hide if not canceled
	            if (!canceled) {
	                this.visible = false;
	                this.$root.$emit('hidden::modal', this.id);
	                this.body.classList.remove('modal-open');
	            }
	        },
	        onClickOut: function onClickOut() {
	            // If backdrop clicked, hide modal
	            if (this.closeOnBackdrop) {
	                this.hide();
	            }
	        },
	        pressedButton: function pressedButton(e) {
	            // If not visible don't do anything
	            if (!this.visible) {
	                return;
	            }
	
	            // Support for esc key press
	            var key = e.which || e.keyCode;
	            if (key === 27) { // 27 is esc
	                this.hide();
	            }
	        },
	        afterEnter: function afterEnter(el) {
	            // Add show class to keep el showed just after transition is ended,
	            // Because transition removes all used classes
	            el.classList.add('show');
	        }
	    },
	    created: function created() {
	        var this$1 = this;
	
	        this.$root.$on('show::modal', function (id) {
	            if (id === this$1.id) {
	                this$1.show();
	            }
	        });
	
	        this.$root.$on('hide::modal', function (id) {
	            if (id === this$1.id) {
	                this$1.hide();
	            }
	        });
	    },
	    mounted: function mounted() {
	        if (typeof document !== 'undefined') {
	            document.addEventListener('keydown', this.pressedButton);
	        }
	    },
	    destroyed: function destroyed() {
	        if (typeof document !== 'undefined') {
	            document.removeEventListener('keydown', this.pressedButton);
	        }
	    }
	};
	
	var nav = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c(_vm.type,{tag:"component",class:_vm.classObject},[_vm._t("default")],2)},staticRenderFns: [],
	    computed: {
	        classObject: function classObject() {
	            return {
	                nav: true,
	                'navbar-nav': this.isNavBar,
	                'nav-tabs': this.tabs,
	                'nav-pills': this.pills,
	                'flex-column': this.vertical,
	                'nav-fill': this.fill
	            };
	        }
	    },
	    props: {
	        type: {
	            type: String,
	            default: 'ul'
	        },
	        fill: {
	            type: Boolean,
	            default: false
	        },
	        tabs: {
	            type: Boolean,
	            default: false
	        },
	        pills: {
	            type: Boolean,
	            default: false
	        },
	        vertical: {
	            type: Boolean,
	            default: false
	        },
	        isNavBar: {
	            type: Boolean,
	            default: false
	        }
	    }
	};
	
	var navItem = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('li',{staticClass:"nav-item",on:{"click":_vm.onclick}},[_c('b-link',{class:_vm.classObject,attrs:{"to":_vm.to,"href":_vm.href,"exact":_vm.exact}},[_vm._t("default")],2)],1)},staticRenderFns: [],
	    components: {bLink: bLink},
	    computed: {
	        classObject: function classObject() {
	            return [
	                'nav-link',
	                this.active ? 'active' : '',
	                this.disabled ? 'disabled' : ''
	            ];
	        }
	    },
	    props: {
	        active: {
	            type: Boolean,
	            default: false
	        },
	        disabled: {
	            type: Boolean,
	            default: false
	        },
	        to: {
	            type: [String, Object]
	        },
	        href: {
	            type: String
	        },
	        exact: {
	            type: Boolean
	        }
	    },
	    methods: {
	        onclick: function onclick(e) {
	            // Hide all drop-downs including navbar-toggle
	            this.$root.$emit('shown::dropdown', this);
	            this.$emit('click', e);
	        }
	    }
	};
	
	var navItemDropdown = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('li',{class:{'nav-item': true, show: _vm.visible,dropdown: !_vm.dropup, dropup: _vm.dropup}},[_c('a',{class:['nav-link', _vm.dropdownToggle],attrs:{"href":"","aria-haspopup":"true","aria-expanded":_vm.visible,"disabled":_vm.disabled},on:{"click":function($event){$event.stopPropagation();$event.preventDefault();_vm.toggle($event);}}},[_vm._t("text",[_vm._v(_vm._s(_vm.text))])],2),_c('div',{class:{'dropdown-menu': true, 'dropdown-menu-right': _vm.rightAlignment}},[_vm._t("default")],2)])},staticRenderFns: [],
	    mixins: [
	        clickOut
	    ],
	    data: function data() {
	        return {
	            visible: false
	        };
	    },
	    computed: {
	        dropdownToggle: function dropdownToggle() {
	            return this.caret ? 'dropdown-toggle' : '';
	        }
	    },
	    props: {
	        caret: {
	            type: Boolean,
	            default: true
	        },
	        text: {
	            type: String,
	            default: ''
	        },
	        dropup: {
	            type: Boolean,
	            default: false
	        },
	        rightAlignment: {
	            type: Boolean,
	            default: false
	        },
	        disabled: {
	            type: Boolean,
	            default: false
	        },
	        class: ['class']
	    },
	    created: function created() {
	        var this$1 = this;
	
	        // To keep one dropdown opened at page
	        this.$root.$on('shown::dropdown', function (el) {
	            if (el !== this$1) {
	                this$1.close();
	            }
	        });
	    },
	    watch: {
	        visible: function visible(state, old) {
	            if (state === old) {
	                return; // Avoid duplicated emits
	            }
	
	            if (state) {
	                this.$root.$emit('shown::dropdown', this);
	            } else {
	                this.$root.$emit('hidden::dropdown', this);
	            }
	        }
	    },
	    methods: {
	        toggle: function toggle() {
	            this.visible = !this.visible;
	        },
	        open: function open() {
	            this.visible = true;
	        },
	        close: function close() {
	            this.visible = false;
	        },
	        clickOutListener: function clickOutListener() {
	            this.close();
	        }
	    }
	};
	
	var navToggle = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('button',{class:_vm.classObject,attrs:{"type":"button","aria-label":_vm.label},on:{"click":_vm.onclick}},[_c('span',{staticClass:"navbar-toggler-icon"})])},staticRenderFns: [],
	    computed: {
	        classObject: function classObject() {
	            return [
	                'navbar-toggler',
	                'navbar-toggler-' + this.position
	            ];
	        }
	    },
	
	    props: {
	        label: {
	            type: String,
	            default: 'Toggle navigation'
	        },
	        position: {
	            type: String,
	            default: 'right'
	        },
	        target: {
	            required: true
	        }
	    },
	
	    methods: {
	        onclick: function onclick() {
	            var target = this.target;
	            if (target.toggle) {
	                target.toggle();
	            }
	            this.$root.$emit('collapse::toggle', this.target);
	        }
	    }
	};
	
	var navbar = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('nav',{class:_vm.classObject},[_vm._t("default")],2)},staticRenderFns: [],
	    computed: {
	        classObject: function classObject() {
	            return [
	                'navbar',
	                this.type ? ("navbar-" + (this.type)) : null,
	                this.variant ? ("bg-" + (this.variant)) : null,
	                this.fixed ? ("fixed-" + (this.fixed)) : null,
	                this.sticky ? 'sticky-top' : null,
	                this.toggleable ? ("navbar-toggleable-" + (this.toggleBreakpoint)) : null
	            ];
	        }
	    },
	    props: {
	        type: {
	            type: String,
	            default: 'light'
	        },
	        variant: {
	            type: String
	        },
	        toggleable: {
	            type: Boolean,
	            default: false
	        },
	        toggleBreakpoint: {
	            type: String,
	            default: 'sm'
	        },
	        fixed: {
	            type: String
	        },
	        sticky: {
	            type: String
	        }
	    }
	};
	
	var bPagination = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"btn-group pagination",attrs:{"role":"group","aria-label":"Pagination"}},[_c('button',{class:['btn','btn-'+_vm.secondaryVariant,_vm.btnSize],attrs:{"type":"button","disabled":_vm.currentPage == 1},on:{"click":function($event){$event.preventDefault();(_vm.currentPage == 1) ? _vm._return : _vm.currentPage--;}}},[_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("«")])]),_vm._v(" "),_c('button',{directives:[{name:"show",rawName:"v-show",value:(_vm.showPrev),expression:"showPrev"}],class:['btn','btn-'+_vm.secondaryVariant,_vm.btnSize,_vm.currentPage === 1 ? 'active' : ''],attrs:{"type":"button"},on:{"click":function($event){$event.preventDefault();_vm.currentPage = 1;}}},[_vm._v("1")]),_vm._v(" "),_c('span',{directives:[{name:"show",rawName:"v-show",value:(_vm.showPrev),expression:"showPrev"}],class:['btn','btn-'+_vm.secondaryVariant,_vm.btnSize]},[_vm._v("...")]),_vm._v(" "),_vm._l((_vm.pageLinks),function(item,index){return _c('button',{class:['btn', _vm.btnSize, _vm.btnVariant(index), index + _vm.diff === _vm.currentPage ? 'active' : '', index + _vm.diff !== _vm.currentPage ? 'hidden-xs-down' : ''],attrs:{"type":"button"},on:{"click":function($event){$event.preventDefault();_vm.currentPage = index + _vm.diff;}}},[_vm._v(_vm._s(index + _vm.diff))])}),_vm._v(" "),_c('span',{directives:[{name:"show",rawName:"v-show",value:(_vm.showNext),expression:"showNext"}],class:['btn','btn-'+_vm.secondaryVariant,_vm.btnSize]},[_vm._v("...")]),_vm._v(" "),_c('button',{directives:[{name:"show",rawName:"v-show",value:(_vm.showNext),expression:"showNext"}],class:['btn','btn-'+_vm.secondaryVariant,_vm.btnSize,_vm.numberOfPages === _vm.currentPage ? 'active' : ''],attrs:{"type":"button"},on:{"click":function($event){$event.preventDefault();_vm.currentPage = _vm.numberOfPages;}}},[_vm._v(_vm._s(_vm.numberOfPages))]),_vm._v(" "),_c('button',{class:['btn','btn-'+_vm.secondaryVariant,_vm.btnSize],attrs:{"type":"button","disabled":_vm.currentPage == _vm.numberOfPages},on:{"click":function($event){$event.preventDefault();(_vm.currentPage == _vm.numberOfPages) ? _vm._return : _vm.currentPage++;}}},[_c('span',{attrs:{"aria-hidden":"true"}},[_vm._v("»")])])],2)},staticRenderFns: [],
	    data: function data() {
	        return {
	            diff: 1,
	            showPrev: false,
	            showNext: false,
	            currentPage: this.value
	        };
	    },
	    computed: {
	        numberOfPages: function numberOfPages() {
	            var result = Math.ceil(this.totalRows / this.perPage);
	            return (result < 1) ? 1 : result;
	        },
	        btnSize: function btnSize() {
	            return !this.size || this.size === "default" ? "" : ("btn-" + (this.size));
	        },
	        pageLinks: function pageLinks() {
	            var result = this.limit;
	            if (this.currentPage > this.numberOfPages) {
	                this.currentPage = 1;
	            }
	            this.diff = 1;
	            this.showPrev = false;
	            this.showNext = false;
	            // If less pages than limit just show this pages
	            if (this.numberOfPages <= this.limit) {
	                return this.numberOfPages;
	            }
	            // If at the beggining of the list or at the end show full number of pages within limit - 2
	            // -2 is reserves space for two buttons: "..." and "first/last button"
	            if (this.currentPage <= this.limit - 2) {
	                this.diff = 1;
	                this.showNext = true;
	                result = this.limit - 2;
	            }
	            // At the end of the range
	            if (this.currentPage > this.numberOfPages - this.limit + 2) {
	                this.diff = this.numberOfPages - this.limit + 3;
	                this.showPrev = true;
	                result = this.limit - 2;
	            }
	            // If somehere in the middle show just limit - 4 links in the middle and one button on the left with "..." and on button on the right preceeded with "..."
	            if (this.currentPage >= this.limit - 2 && this.currentPage <= this.numberOfPages - this.limit + 2) {
	                this.diff = this.currentPage - 1;
	                this.showPrev = true;
	                this.showNext = true;
	                result = this.limit - 4;
	            }
	            return result;
	        }
	    },
	    methods: {
	        btnVariant: function btnVariant(index) {
	            return (index + this.diff === this.currentPage) ? ("btn-" + (this.variant)) : ("btn-" + (this.secondaryVariant));
	        },
	        _return: function _return() {
	
	        }
	    },
	    watch: {
	        currentPage: function currentPage(newPage) {
	            this.$emit('input', newPage);
	        },
	        value: function value(newValue, oldValue) {
	            if (newValue !== oldValue) {
	                this.currentPage = newValue;
	            }
	        }
	    },
	    props: {
	        value: {
	            type: Number,
	            default: 1
	        },
	        limit: {
	            type: Number,
	            default: 7
	        },
	        perPage: {
	            type: Number,
	            default: 20
	        },
	        totalRows: {
	            type: Number,
	            default: 20
	        },
	        size: {
	            type: String,
	            default: 'md'
	        },
	        variant: {
	            type: String,
	            default: 'primary'
	        },
	        secondaryVariant: {
	            type: String,
	            default: 'secondary'
	        }
	    }
	};
	
	// Controls which events are mapped for each named trigger, and the expected popover behavior for each.
	var triggerListeners = {
	    click: {click: 'toggle'},
	    hover: {mouseenter: 'show', mouseleave: 'hide'},
	    focus: {focus: 'show', blur: 'hide'}
	};
	
	var bPopover = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('span',{ref:"trigger"},[_vm._t("default")],2),_c('div',{ref:"popover",class:['popover',_vm.popoverAlignment],style:(_vm.popoverStyle),attrs:{"tabindex":"-1"},on:{"focus":function($event){_vm.$emit('focus');},"blur":function($event){_vm.$emit('blur');}}},[_c('div',{staticClass:"popover-arrow"}),(_vm.title)?_c('h3',{staticClass:"popover-title",domProps:{"innerHTML":_vm._s(_vm.title)}}):_vm._e(),_c('div',{staticClass:"popover-content"},[_c('div',{staticClass:"popover-content-wrapper"},[_vm._t("content",[_c('span',{domProps:{"innerHTML":_vm._s(_vm.content)}})])],2)])])])},staticRenderFns: [],
	    props: {
	        placement: {
	            type: String,
	            default: 'top',
	            validator: function validator(value) {
	                return ['top', 'bottom', 'left', 'right'].indexOf(value) !== -1;
	            }
	        },
	        triggers: {
	            type: [Boolean, String, Array],
	            default: function () { return ['click', 'focus']; },
	            validator: function validator(value) {
	                // Allow falsy value to disable all event triggers (equivalent to 'manual') in Bootstrap 4
	                if (value === false || value === '') {
	                    return true;
	                } else if (typeof value === 'string') {
	                    return Object.keys(triggerListeners).indexOf(value) !== -1;
	                } else if (Array.isArray(value)) {
	                    var keys = Object.keys(triggerListeners);
	                    value.forEach(function (item) {
	                        if (keys.indexOf(item) === -1) {
	                            return false;
	                        }
	                    });
	                    return true;
	                }
	                return false;
	            }
	        },
	        title: {
	            type: String,
	            default: ''
	        },
	        content: {
	            type: String,
	            default: ''
	        },
	        show: {
	            type: Boolean,
	            default: false
	        },
	        constraints: {
	            type: Array,
	            default: function default$1() {
	                return [];
	            }
	        },
	        offset: {
	            type: String,
	            default: '0 0',
	            validator: function validator(value) {
	                return /^(\d+\s\d+)$/.test(value);
	            }
	        },
	        delay: {
	            type: [Number, Object],
	            default: 0,
	            validator: function validator(value) {
	                if (typeof value === 'number') {
	                    return value >= 0;
	                } else if (value !== null && typeof value === 'object') {
	                    return typeof value.show === 'number' &&
	                        typeof value.hide === 'number' &&
	                        value.show >= 0 &&
	                        value.hide >= 0;
	                }
	
	                return false;
	            }
	        },
	        debounce: {
	            type: [Number],
	            default: 300,
	            validator: function validator(value) {
	                return value >= 0;
	            }
	        },
	        popoverStyle: {
	            type: Object,
	            default: null
	        }
	    },
	
	    data: function data() {
	        return {
	            showState: this.show,
	            lastEvent: null
	        };
	    },
	
	    computed: {
	        popoverAlignment: function popoverAlignment() {
	            return !this.placement || this.placement === "default" ? "popover-top" : ("popover-" + (this.placement));
	        },
	
	        normalizedTriggers: function normalizedTriggers() {
	            if (this.triggers === false) {
	                return [];
	            } else if (typeof this.triggers === 'string') {
	                return [this.triggers];
	            }
	            return this.triggers;
	        },
	
	        placementParameters: function placementParameters() {
	            switch (this.placement) {
	                case 'bottom':
	                    return {
	                        attachment: 'top center',
	                        targetAttachment: 'bottom center'
	                    };
	                case 'left':
	                    return {
	                        attachment: 'middle right',
	                        targetAttachment: 'middle left'
	                    };
	                case 'right':
	                    return {
	                        attachment: 'middle left',
	                        targetAttachment: 'middle right'
	                    };
	                default:
	                    return {
	                        attachment: 'bottom center',
	                        targetAttachment: 'top center'
	                    };
	            }
	        },
	
	        useDebounce: function useDebounce() {
	            return this.normalizedTriggers.length > 1;
	        },
	
	        tetherOptions: function tetherOptions() {
	            return {
	                element: this._popover,
	                target: this._trigger,
	                offset: this.offset,
	                constraints: this.constraints,
	                attachment: this.placementParameters.attachment,
	                targetAttachment: this.placementParameters.targetAttachment
	            };
	        }
	    },
	
	    watch: {
	        /**
	         * Propagate 'show' property change
	         * @param  {Boolean} newShow
	         */
	        show: function show(newShow) {
	            this.showState = newShow;
	        },
	
	        /**
	         * Affect 'show' state in response to status change
	         * @param  {Boolean} newShowState
	         * @param oldShowState
	         */
	        showState: function showState(newShowState, oldShowState) {
	            var this$1 = this;
	
	            if (newShowState === oldShowState) {
	                return;
	            }
	
	            clearTimeout(this._timeout);
	
	            this._timeout = setTimeout(function () {
	                this$1.$emit('showChange', newShowState);
	                if (newShowState) {
	                    this$1.showPopover();
	                } else {
	                    this$1.hidePopover();
	                }
	            }, this.getDelay(newShowState));
	        },
	
	        normalizedTriggers: function normalizedTriggers(newTriggers, oldTriggers) {
	            this.updateListeners(newTriggers, oldTriggers);
	        },
	
	        placement: function placement() {
	            this.setOptions();
	        },
	
	        offset: function offset() {
	            this.setOptions();
	        },
	
	        constraints: function constraints() {
	            this.setOptions();
	        },
	
	        content: function content() {
	            this.refreshPosition();
	        },
	
	        title: function title() {
	            this.refreshPosition();
	        }
	    },
	
	    methods: {
	        /**
	         * Display popover and fire event
	         */
	        showPopover: function showPopover() {
	            if (this.showState === true) {
	                this.hidePopover();
	            }
	
	            this.showState = true;
	
	            // Let tether do the magic, after element is shown
	            this._popover.style.display = 'block';
	            this._tether = new Tether(this.tetherOptions);
	
	            // Make sure the popup is rendered in the correct location
	            this.refreshPosition();
	
	            this.$root.$emit('shown::popover');
	        },
	
	        /**
	         * Update tether options
	         */
	        setOptions: function setOptions() {
	            if (this._tether) {
	                this._tether.setOptions(this.tetherOptions);
	            }
	        },
	
	        /**
	         * Refresh the Popover position in order to respond to changes
	         */
	        refreshPosition: function refreshPosition() {
	            var this$1 = this;
	
	            if (this._tether) {
	                this.$nextTick(function () {
	                    this$1._tether.position();
	                });
	            }
	        },
	
	        /**
	         * Hide popover and fire event
	         */
	        hidePopover: function hidePopover() {
	            this.showState = false;
	            this._popover.style.display = 'none';
	            this.$root.$emit('hidden::popover');
	
	            if (this._tether) {
	                this._tether.destroy();
	                this._tether = null;
	            }
	        },
	
	        /**
	         * Get the currently applicable popover delay
	         * @returns Number
	         */
	        getDelay: function getDelay(state) {
	            if (typeof this.delay === 'object') {
	                return state ? this.delay.show : this.delay.hide;
	            }
	
	            return this.delay;
	        },
	
	        /**
	         * Handle multiple event triggers
	         * @param  {Object} e
	         */
	        eventHandler: function eventHandler(e) {
	            var this$1 = this;
	
	            // If this event is right after a previous successful event, ignore it
	            if (this.useDebounce && this.debounce > 0 && this.lastEvent !== null && e.timeStamp <= this.lastEvent + this.debounce) {
	                return;
	            }
	
	            // Look up the expected popover action for the event
	            // eslint-disable-next-line guard-for-in
	            for (var trigger in triggerListeners) {
	                for (var event in triggerListeners[trigger]) {
	                    if (event === e.type) {
	                        var action = triggerListeners[trigger][event];
	
	                        // If the expected event action is the opposite of the current state, allow it
	                        if (action === 'toggle' || (this$1.showState && action === 'hide') || (!this$1.showState && action === 'show')) {
	                            this$1.showState = !this$1.showState;
	                            this$1.lastEvent = e.timeStamp;
	                        }
	                        return;
	                    }
	                }
	            }
	        },
	
	        /**
	         * Study the 'triggers' component property and apply all selected triggers
	         * @param {Array} triggers
	         * @param {Array} appliedTriggers
	         */
	        updateListeners: function updateListeners(triggers, appliedTriggers) {
	            var this$1 = this;
	            if ( appliedTriggers === void 0 ) appliedTriggers = [];
	
	            var newTriggers = [];
	            var removeTriggers = [];
	
	            // Look for new events not yet mapped (all of them on first load)
	            triggers.forEach(function (item) {
	                if (appliedTriggers.indexOf(item) === -1) {
	                    newTriggers.push(item);
	                }
	            });
	
	            // Disable any removed event triggers
	            appliedTriggers.forEach(function (item) {
	                if (triggers.indexOf(item) === -1) {
	                    removeTriggers.push(item);
	                }
	            });
	
	            // Apply trigger mapping changes
	            newTriggers.forEach(function (item) { return this$1.addListener(item); });
	            removeTriggers.forEach(function (item) { return this$1.removeListener(item); });
	        },
	
	        /**
	         * Add all event hooks for the given trigger
	         * @param {String} trigger
	         */
	        addListener: function addListener(trigger) {
	            var this$1 = this;
	
	            // eslint-disable-next-line guard-for-in
	            for (var item in triggerListeners[trigger]) {
	                this$1._trigger.addEventListener(item, function (e) { return this$1.eventHandler(e); });
	            }
	        },
	
	        /**
	         * Remove all event hooks for the given trigger
	         * @param {String} trigger
	         */
	        removeListener: function removeListener(trigger) {
	            var this$1 = this;
	
	            // eslint-disable-next-line guard-for-in
	            for (var item in triggerListeners[trigger]) {
	                this$1._trigger.removeEventListener(item, function (e) { return this$1.eventHandler(e); });
	            }
	        },
	
	        /**
	         * Cleanup component listeners
	         */
	        cleanup: function cleanup() {
	            var this$1 = this;
	
	            // Remove all event listeners
	            // eslint-disable-next-line guard-for-in
	            for (var trigger in this$1.normalizedTriggers) {
	                this$1.removeListener(trigger);
	            }
	
	            clearTimeout(this._timeout);
	            this._timeout = null;
	            this.hidePopover();
	        }
	    },
	
	    created: function created() {
	        var this$1 = this;
	
	        var hub = this.$root;
	        hub.$on('hide::popover', function () {
	            this$1.showState = false;
	        });
	
	        // Workaround to resolve issues like #151
	        if (this.$router) {
	            this.$router.beforeEach(function (to, from, next) {
	                next();
	                this$1.cleanup();
	            });
	        }
	
	        var cleanup = function () {
	            this$1.cleanup();
	        };
	
	        hub.$on('hide::modal', cleanup);
	        hub.$on('changed::tab', cleanup);
	    },
	
	    mounted: function mounted() {
	        // Configure tether
	        this._trigger = this.$refs.trigger.children[0];
	        this._popover = this.$refs.popover;
	        this._popover.style.display = 'none';
	        this._timeout = 0;
	
	        // Add listeners for specified triggers and complementary click event
	        this.updateListeners(this.normalizedTriggers);
	
	        // Display popover if prop is set on load
	        if (this.showState) {
	            this.showPopover();
	        }
	    },
	
	    beforeDestroy: function beforeDestroy() {
	        this.cleanup();
	    }
	};
	
	var progress = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"progress"},[_c('transition',[_c('div',{class:_vm.classObject,style:(_vm.styleObject),attrs:{"role":"progressbar","aria-valuenow":_vm.value,"aria-valuemin":0,"aria-valuemax":_vm.max}},[_vm._t("default",[(_vm.showProgress)?[_vm._v(_vm._s(_vm.progress)+"%")]:(_vm.showValue)?[_vm._v(_vm._s(_vm.value))]:_vm._e()])],2)])],1)},staticRenderFns: [],
	    computed: {
	        classObject: function classObject() {
	            return [
	                'progress-bar',
	                this.progressVariant,
	                (this.striped || this.animated) ? 'progress-bar-striped' : '',
	                this.animated ? 'progress-bar-animated' : ''
	            ];
	        },
	        styleObject: function styleObject() {
	            return {
	                width: this.progress + '%'
	            };
	        },
	        progressVariant: function progressVariant() {
	            return this.variant ? ("bg-" + (this.variant)) : null;
	        },
	        progress: function progress() {
	            var p = Math.pow(10, this.precision);
	            return Math.round((100 * p * this.value) / this.max) / p;
	        }
	    },
	    props: {
	        striped: {
	            type: Boolean,
	            default: false
	        },
	        animated: {
	            type: Boolean,
	            default: false
	        },
	        precision: {
	            type: Number,
	            default: 0
	        },
	        value: {
	            type: Number,
	            default: 0
	        },
	        max: {
	            type: Number,
	            default: 100
	        },
	        variant: {
	            type: String,
	            default: null
	        },
	        showProgress: {
	            type: Boolean,
	            default: false
	        },
	        showValue: {
	            type: Boolean,
	            default: false
	        }
	    }
	};
	
	var toString = function (v) {
	    if (!v) {
	        return '';
	    }
	
	    if (v instanceof Object) {
	        return Object.keys(v).map(function (k) { return toString(v[k]); }).join(' ');
	    }
	
	    return String(v);
	};
	
	var defaultSortCompare = function (a, b, sortBy) {
	    return toString(a[sortBy]).localeCompare(toString(b[sortBy]), undefined, {numeric: true});
	};
	
	var table = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('table',{class:['table',_vm.striped?'table-striped':'',_vm.hover?'table-hover':'']},[_c('thead',[_c('tr',_vm._l((_vm.fields),function(field,key){return _c('th',{class:[field.sortable?'sorting':null,_vm.sortBy===key?'sorting_'+(_vm.sortDesc?'desc':'asc'):'',field.class?field.class:null],domProps:{"innerHTML":_vm._s(field.label)},on:{"click":function($event){_vm.headClick(field,key);}}})}))]),_c('tbody',_vm._l((_vm._items),function(item,index){return _c('tr',{key:_vm.items_key,class:[item.state?'table-'+item.state:null],on:{"click":function($event){_vm.rowClicked(item, index);}}},_vm._l((_vm.fields),function(field,key){return _c('td',{class:[field.class?field.class:null]},[_vm._t(key,[_vm._v(_vm._s(item[key]))],{value:item[key],item:item,index:index})],2)}))}))])},staticRenderFns: [],
	    components: {bPagination: bPagination},
	    data: function data() {
	        return {
	            sortBy: null,
	            sortDesc: true
	        };
	    },
	
	    props: {
	        items: {
	            type: Array,
	            default: function () { return []; }
	        },
	        fields: {
	            type: Object,
	            default: function () {
	            }
	        },
	        striped: {
	            type: Boolean,
	            default: false
	        },
	        hover: {
	            type: Boolean,
	            default: false
	        },
	        perPage: {
	            type: Number,
	            default: null
	        },
	        items_key: {
	            type: String,
	            default: null
	        },
	        currentPage: {
	            type: Number,
	            default: 1
	        },
	        filter: {
	            type: [String, RegExp, Function],
	            default: null
	        },
	        sortCompare: {
	            type: Function,
	            default: null
	        },
	        itemsProvider: {
	            type: Function,
	            default: null
	        },
	        value: {
	            type: Array,
	            default: function () { return []; }
	        }
	    },
	
	    computed: {
	        _items: function _items() {
	            var this$1 = this;
	
	            if (!this.items) {
	                return [];
	            }
	
	            if (this.itemsProvider) {
	                return this.itemsProvider(this);
	            }
	
	            var items = this.items;
	
	            // Apply filter
	            if (this.filter) {
	                if (this.filter instanceof Function) {
	                    items = items.filter(this.filter);
	                } else {
	                    var regex;
	                    if (this.filter instanceof RegExp) {
	                        regex = this.filter;
	                    } else {
	                        regex = new RegExp('.*' + this.filter + '.*', 'ig');
	                    }
	                    items = items.filter(function (item) {
	                        var test = regex.test(toString(item));
	                        regex.lastIndex = 0;
	                        return test;
	                    });
	                }
	            }
	
	            // Apply Sort
	            var sortCompare = this.sortCompare || defaultSortCompare;
	            if (this.sortBy) {
	                items = items.sort(function (a, b) {
	                    var r = sortCompare(a, b, this$1.sortBy);
	                    return this$1.sortDesc ? r : r * -1;
	                });
	            }
	
	            this.$emit('input', items);
	
	            // Apply pagination
	            if (this.perPage) {
	                items = items.slice((this.currentPage - 1) * this.perPage, this.currentPage * this.perPage);
	            }
	            return items;
	        }
	    },
	    methods: {
	        rowClicked: function rowClicked(item, index) {
	            this.$emit('row-clicked', item, index);
	        },
	        headClick: function headClick(field, key) {
	            if (!field.sortable) {
	                this.sortBy = null;
	                return;
	            }
	
	            if (key === this.sortBy) {
	                this.sortDesc = !this.sortDesc;
	            }
	
	            this.sortBy = key;
	        }
	    }
	};
	
	/**
	 * Observe a DOM element changes, falls back to eventListener mode
	 * @param {Element} el The DOM element to observe
	 * @param {Function} callback callback to be called on change
	 * @param {object} [opts={childList: true, subtree: true}] observe options
	 * @see http://stackoverflow.com/questions/3219758
	 */
	function observeDOM(el, callback, opts) {
	    var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
	    var eventListenerSupported = window.addEventListener;
	
	    if (MutationObserver) {
	        // Define a new observer
	        var obs = new MutationObserver(function (mutations) {
	            if (mutations[0].addedNodes.length > 0 || mutations[0].removedNodes.length > 0) {
	                callback();
	            }
	        });
	
	        // Have the observer observe foo for changes in children
	        obs.observe(el, Object.assign({childList: true, subtree: true}, opts));
	    } else if (eventListenerSupported) {
	        el.addEventListener('DOMNodeInserted', callback, false);
	        el.addEventListener('DOMNodeRemoved', callback, false);
	    }
	}
	
	var tabs = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"tabs"},[_c('div',{class:{'card-header': _vm.card}},[_c('ul',{class:['nav','nav-' + _vm.navStyle, _vm.card? 'card-header-'+_vm.navStyle: null]},[_vm._l((_vm.tabs),function(tab,index){return _c('li',{staticClass:"nav-item"},[(!tab.headHtml)?_c('a',{class:['nav-link',{small: _vm.small, active: tab.localActive, disabled: tab.disabled}],attrs:{"href":tab.href},on:{"click":function($event){$event.preventDefault();$event.stopPropagation();_vm.setTab(index);}}},[_vm._v(_vm._s(tab.title))]):_c('div',{class:['tab-head',{small: _vm.small, active: tab.localActive, disabled: tab.disabled}],domProps:{"innerHTML":_vm._s(tab.headHtml)}})])}),_vm._t("tabs")],2)]),_c('div',{ref:"tabsContainer",class:['tab-content',{'card-block': _vm.card}]},[_vm._t("default"),(!_vm.tabs || !_vm.tabs.length)?_vm._t("empty"):_vm._e()],2)])},staticRenderFns: [],
	    data: function data() {
	        return {
	            currentTab: this.value,
	            tabs: []
	        };
	    },
	    props: {
	        noFade: {
	            type: Boolean,
	            default: false
	        },
	        card: {
	            type: Boolean,
	            default: false
	        },
	        small: {
	            type: Boolean,
	            default: false
	        },
	        value: {
	            type: Number,
	            default: 0
	        },
	        pills: {
	            type: Boolean,
	            default: false
	        },
	        lazy: {
	            type: Boolean,
	            default: false
	        }
	    },
	    watch: {
	        currentTab: function currentTab(val, old) {
	            if (val === old) {
	                return;
	            }
	
	            this.$root.$emit('changed::tab', this, val, this.tabs[val]);
	            this.$emit('input', val);
	            this.tabs[val].$emit('click');
	        },
	        value: function value(val, old) {
	            if (val === old) {
	                return;
	            }
	
	            this.setTab(val);
	        },
	        fade: function fade(val, old) {
	            var this$1 = this;
	
	            if (val === old) {
	                return;
	            }
	
	            this.tabs.forEach(function (item) {
	                this$1.$set(item, 'fade', val);
	            });
	        }
	    },
	    computed: {
	        fade: function fade() {
	            return !this.noFade;
	        },
	        navStyle: function navStyle() {
	            return this.pills ? 'pills' : 'tabs';
	        }
	    },
	    methods: {
	        /**
	         * Move to next tab
	         */
	        nextTab: function nextTab() {
	            this.setTab(this.currentTab + 1);
	        },
	
	        /**
	         * Move to previous tab
	         */
	        previousTab: function previousTab() {
	            this.setTab(this.currentTab - 1);
	        },
	
	        /**
	         * Set active tab on the tabs collection and the child 'tab' component
	         */
	        setTab: function setTab(index, force) {
	            // Prevent setting same tab!
	            if (!force && index === this.currentTab) {
	                return;
	            }
	
	            var tab = this.tabs[index];
	
	            // Don't go beyond indexes!
	            if (!tab) {
	                return;
	            }
	
	            // Ignore disabled
	            if (tab.disabled) {
	                return;
	            }
	
	            // Deactivate previous active tab
	            if (this.tabs[this.currentTab]) {
	                this.$set(this.tabs[this.currentTab], 'localActive', false);
	            }
	
	            // Set new tab as active
	            this.$set(tab, 'localActive', true);
	
	            // Update currentTab
	            this.currentTab = index;
	        },
	
	        /**
	         * Dynamically update tabs
	         */
	        updateTabs: function updateTabs() {
	            var this$1 = this;
	
	            // Probe tabs
	            if (this.$slots.default) {
	                this.tabs = this.$slots.default.filter(function (tab) { return tab.componentInstance || false; })
	                    .map(function (tab) { return tab.componentInstance; });
	            } else {
	                this.tabs = [];
	            }
	
	            this.tabs.forEach(function (tab) {
	                this$1.$set(tab, 'fade', this$1.fade);
	                this$1.$set(tab, 'lazy', this$1.lazy);
	            });
	
	            // Set initial active tab
	            var tabIndex = this.currentTab;
	
	            if (this.currentTab === null || this.currentTab === undefined) {
	                this.tabs.forEach(function (tab, index) {
	                    if (tab.active) {
	                        tabIndex = index;
	                    }
	                });
	            }
	
	            // Workaround to fix problem when currentTab is removed
	            if (tabIndex > this.tabs.length - 1) {
	                tabIndex = this.tabs.length - 1;
	            }
	
	            this.setTab(tabIndex || 0, true);
	        }
	    },
	    mounted: function mounted() {
	        this.updateTabs();
	
	        // Observe Child changes so we can notify tabs change
	        observeDOM(this.$refs.tabsContainer, this.updateTabs.bind(this), {subtree: false});
	    }
	};
	
	var tab = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"mode":"out-in"},on:{"enter":_vm.enter,"before-leave":_vm.beforeLeave}},[(_vm.localActive || !_vm.lazy)?_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.localActive || _vm.lazy),expression:"localActive || lazy"}],ref:"panel",staticClass:"tab-pane",class:[{show: _vm.show, fade: _vm.fade, disabled: _vm.disabled, active: _vm.localActive}],attrs:{"role":"tabpanel"}},[_vm._t("default")],2):_vm._e()])},staticRenderFns: [],
	    methods: {
	        enter: function enter() {
	            this.show = true;
	        },
	        beforeLeave: function beforeLeave() {
	            this.show = false;
	        }
	    },
	    data: function data() {
	        return {
	            fade: false,
	            localActive: false,
	            lazy: true,
	            show: false
	        };
	    },
	    props: {
	        id: {
	            type: String,
	            default: ''
	        },
	        title: {
	            type: String,
	            default: ''
	        },
	        headHtml: {
	            type: String,
	            default: null
	        },
	        disabled: {
	            type: Boolean,
	            default: false
	        },
	        active: {
	            type: Boolean,
	            default: false
	        },
	        href: {
	            type: String,
	            default: '#'
	        }
	    }
	};
	
	var tooltip = {render: function(){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[_c('span',{ref:"trigger"},[_vm._t("default")],2),_c('div',{ref:"popover",class:['tooltip','tooltip-' + this.placement],style:({opacity:_vm.showState?1:0}),attrs:{"tabindex":"-1"},on:{"focus":function($event){_vm.$emit('focus');},"blur":function($event){_vm.$emit('blur');}}},[_c('div',{staticClass:"tooltip-inner"},[_vm._t("content",[_c('span',{domProps:{"innerHTML":_vm._s(_vm.content || _vm.title)}})])],2)])])},staticRenderFns: [],
	    extends: bPopover,
	    props: {
	        triggers: {
	            type: [Boolean, String, Array],
	            default: 'hover'
	        }
	    }
	};
	
	
	
	var components = Object.freeze({
		bAlert: alert,
		bBreadcrumb: breadcrumb,
		bButton: bBtn,
		bBtn: bBtn,
		bButtonGroup: buttonGroup,
		bCard: card,
		bCardGroup: cardGroup,
		bDropdown: dropdown,
		bDropdownItem: dropdownItem,
		bDropdownSelect: dropdownSelect,
		bForm: form,
		bFormCheckbox: formCheckbox,
		bFormFieldset: formFieldset,
		bFormFile: formFile,
		bFormRadio: formRadio,
		bFormInput: formInput,
		bFormSelect: formSelect,
		bJumbotron: jumbotron,
		bBadge: badge,
		bMedia: media,
		bModal: modal,
		bNavbar: navbar,
		bPagination: bPagination,
		bPopover: bPopover,
		bProgress: progress,
		bTable: table,
		bTooltip: tooltip,
		bTab: tab,
		bTabs: tabs,
		bNav: nav,
		bNavItem: navItem,
		bNavItemDropdown: navItemDropdown,
		bNavToggle: navToggle,
		bListGroupItem: listGroupItem,
		bListGroup: listGroup,
		bCarouselSlide: carouselSlide,
		bCarousel: carousel,
		bCollapse: collapse,
		bLink: bLink
	});
	
	var all_listen_types = {hover: true, click: true, focus: true};
	
	function targets(el, binding, listen_types, fn) {
	    var vm = el.__vue__;
	
	    if (!vm) {
	        console.warn('__vue__ is not available on element', el);
	        return;
	    }
	
	    var targets = Object.keys(binding.modifiers || {})
	        .filter(function (t) { return !all_listen_types[t]; });
	
	    if (binding.value) {
	        targets.push(binding.value);
	    }
	
	    var listener = function () {
	        fn({targets: targets, vm: vm});
	    };
	
	    Object.keys(all_listen_types).forEach(function (type) {
	        if (listen_types[type] || binding.modifiers[type]) {
	            console.log(type);
	            el.addEventListener(type, listener);
	        }
	    });
	}
	
	var listen_types = {click: true};
	
	var toggle = {
	    bind: function bind(el, binding) {
	        targets(el, binding, listen_types, function (ref) {
	            var targets$$1 = ref.targets;
	            var vm = ref.vm;
	
	            targets$$1.forEach(function (target) {
	                vm.$root.$emit('collapse::toggle', target);
	            });
	        });
	    }
	};
	
	var listen_types$1 = {click: true};
	
	var modal$1 = {
	    bind: function bind(el, binding) {
	        targets(el, binding, listen_types$1, function (ref) {
	            var targets$$1 = ref.targets;
	            var vm = ref.vm;
	
	            targets$$1.forEach(function (target) {
	                vm.$root.$emit('show::modal', target);
	            });
	        });
	    }
	};
	
	
	
	var directives = Object.freeze({
		bToggle: toggle,
		bModal: modal$1
	});
	
	/* eslint-disable no-var, no-undef, guard-for-in, object-shorthand */
	
	var VuePlugin = {
	    install: function (Vue) {
	        if (Vue._bootstrap_vue_installed) {
	            return;
	        }
	
	        Vue._bootstrap_vue_installed = true;
	
	        // Register components
	        for (var component in components) {
	            Vue.component(component, components[component]);
	        }
	
	        // Register directives
	        for (var directive in directives) {
	            Vue.directive(directive, directives[directive]);
	        }
	    }
	};
	
	if (typeof window !== 'undefined' && window.Vue) {
	    window.Vue.use(VuePlugin);
	}
	
	return VuePlugin;
	
	})));
	//# sourceMappingURL=bootstrap-vue.js.map


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! tether 1.4.0 */
	
	(function(root, factory) {
	  if (true) {
	    !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	  } else if (typeof exports === 'object') {
	    module.exports = factory(require, exports, module);
	  } else {
	    root.Tether = factory();
	  }
	}(this, function(require, exports, module) {
	
	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var TetherBase = undefined;
	if (typeof TetherBase === 'undefined') {
	  TetherBase = { modules: [] };
	}
	
	var zeroElement = null;
	
	// Same as native getBoundingClientRect, except it takes into account parent <frame> offsets
	// if the element lies within a nested document (<frame> or <iframe>-like).
	function getActualBoundingClientRect(node) {
	  var boundingRect = node.getBoundingClientRect();
	
	  // The original object returned by getBoundingClientRect is immutable, so we clone it
	  // We can't use extend because the properties are not considered part of the object by hasOwnProperty in IE9
	  var rect = {};
	  for (var k in boundingRect) {
	    rect[k] = boundingRect[k];
	  }
	
	  if (node.ownerDocument !== document) {
	    var _frameElement = node.ownerDocument.defaultView.frameElement;
	    if (_frameElement) {
	      var frameRect = getActualBoundingClientRect(_frameElement);
	      rect.top += frameRect.top;
	      rect.bottom += frameRect.top;
	      rect.left += frameRect.left;
	      rect.right += frameRect.left;
	    }
	  }
	
	  return rect;
	}
	
	function getScrollParents(el) {
	  // In firefox if the el is inside an iframe with display: none; window.getComputedStyle() will return null;
	  // https://bugzilla.mozilla.org/show_bug.cgi?id=548397
	  var computedStyle = getComputedStyle(el) || {};
	  var position = computedStyle.position;
	  var parents = [];
	
	  if (position === 'fixed') {
	    return [el];
	  }
	
	  var parent = el;
	  while ((parent = parent.parentNode) && parent && parent.nodeType === 1) {
	    var style = undefined;
	    try {
	      style = getComputedStyle(parent);
	    } catch (err) {}
	
	    if (typeof style === 'undefined' || style === null) {
	      parents.push(parent);
	      return parents;
	    }
	
	    var _style = style;
	    var overflow = _style.overflow;
	    var overflowX = _style.overflowX;
	    var overflowY = _style.overflowY;
	
	    if (/(auto|scroll)/.test(overflow + overflowY + overflowX)) {
	      if (position !== 'absolute' || ['relative', 'absolute', 'fixed'].indexOf(style.position) >= 0) {
	        parents.push(parent);
	      }
	    }
	  }
	
	  parents.push(el.ownerDocument.body);
	
	  // If the node is within a frame, account for the parent window scroll
	  if (el.ownerDocument !== document) {
	    parents.push(el.ownerDocument.defaultView);
	  }
	
	  return parents;
	}
	
	var uniqueId = (function () {
	  var id = 0;
	  return function () {
	    return ++id;
	  };
	})();
	
	var zeroPosCache = {};
	var getOrigin = function getOrigin() {
	  // getBoundingClientRect is unfortunately too accurate.  It introduces a pixel or two of
	  // jitter as the user scrolls that messes with our ability to detect if two positions
	  // are equivilant or not.  We place an element at the top left of the page that will
	  // get the same jitter, so we can cancel the two out.
	  var node = zeroElement;
	  if (!node || !document.body.contains(node)) {
	    node = document.createElement('div');
	    node.setAttribute('data-tether-id', uniqueId());
	    extend(node.style, {
	      top: 0,
	      left: 0,
	      position: 'absolute'
	    });
	
	    document.body.appendChild(node);
	
	    zeroElement = node;
	  }
	
	  var id = node.getAttribute('data-tether-id');
	  if (typeof zeroPosCache[id] === 'undefined') {
	    zeroPosCache[id] = getActualBoundingClientRect(node);
	
	    // Clear the cache when this position call is done
	    defer(function () {
	      delete zeroPosCache[id];
	    });
	  }
	
	  return zeroPosCache[id];
	};
	
	function removeUtilElements() {
	  if (zeroElement) {
	    document.body.removeChild(zeroElement);
	  }
	  zeroElement = null;
	};
	
	function getBounds(el) {
	  var doc = undefined;
	  if (el === document) {
	    doc = document;
	    el = document.documentElement;
	  } else {
	    doc = el.ownerDocument;
	  }
	
	  var docEl = doc.documentElement;
	
	  var box = getActualBoundingClientRect(el);
	
	  var origin = getOrigin();
	
	  box.top -= origin.top;
	  box.left -= origin.left;
	
	  if (typeof box.width === 'undefined') {
	    box.width = document.body.scrollWidth - box.left - box.right;
	  }
	  if (typeof box.height === 'undefined') {
	    box.height = document.body.scrollHeight - box.top - box.bottom;
	  }
	
	  box.top = box.top - docEl.clientTop;
	  box.left = box.left - docEl.clientLeft;
	  box.right = doc.body.clientWidth - box.width - box.left;
	  box.bottom = doc.body.clientHeight - box.height - box.top;
	
	  return box;
	}
	
	function getOffsetParent(el) {
	  return el.offsetParent || document.documentElement;
	}
	
	var _scrollBarSize = null;
	function getScrollBarSize() {
	  if (_scrollBarSize) {
	    return _scrollBarSize;
	  }
	  var inner = document.createElement('div');
	  inner.style.width = '100%';
	  inner.style.height = '200px';
	
	  var outer = document.createElement('div');
	  extend(outer.style, {
	    position: 'absolute',
	    top: 0,
	    left: 0,
	    pointerEvents: 'none',
	    visibility: 'hidden',
	    width: '200px',
	    height: '150px',
	    overflow: 'hidden'
	  });
	
	  outer.appendChild(inner);
	
	  document.body.appendChild(outer);
	
	  var widthContained = inner.offsetWidth;
	  outer.style.overflow = 'scroll';
	  var widthScroll = inner.offsetWidth;
	
	  if (widthContained === widthScroll) {
	    widthScroll = outer.clientWidth;
	  }
	
	  document.body.removeChild(outer);
	
	  var width = widthContained - widthScroll;
	
	  _scrollBarSize = { width: width, height: width };
	  return _scrollBarSize;
	}
	
	function extend() {
	  var out = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	  var args = [];
	
	  Array.prototype.push.apply(args, arguments);
	
	  args.slice(1).forEach(function (obj) {
	    if (obj) {
	      for (var key in obj) {
	        if (({}).hasOwnProperty.call(obj, key)) {
	          out[key] = obj[key];
	        }
	      }
	    }
	  });
	
	  return out;
	}
	
	function removeClass(el, name) {
	  if (typeof el.classList !== 'undefined') {
	    name.split(' ').forEach(function (cls) {
	      if (cls.trim()) {
	        el.classList.remove(cls);
	      }
	    });
	  } else {
	    var regex = new RegExp('(^| )' + name.split(' ').join('|') + '( |$)', 'gi');
	    var className = getClassName(el).replace(regex, ' ');
	    setClassName(el, className);
	  }
	}
	
	function addClass(el, name) {
	  if (typeof el.classList !== 'undefined') {
	    name.split(' ').forEach(function (cls) {
	      if (cls.trim()) {
	        el.classList.add(cls);
	      }
	    });
	  } else {
	    removeClass(el, name);
	    var cls = getClassName(el) + (' ' + name);
	    setClassName(el, cls);
	  }
	}
	
	function hasClass(el, name) {
	  if (typeof el.classList !== 'undefined') {
	    return el.classList.contains(name);
	  }
	  var className = getClassName(el);
	  return new RegExp('(^| )' + name + '( |$)', 'gi').test(className);
	}
	
	function getClassName(el) {
	  // Can't use just SVGAnimatedString here since nodes within a Frame in IE have
	  // completely separately SVGAnimatedString base classes
	  if (el.className instanceof el.ownerDocument.defaultView.SVGAnimatedString) {
	    return el.className.baseVal;
	  }
	  return el.className;
	}
	
	function setClassName(el, className) {
	  el.setAttribute('class', className);
	}
	
	function updateClasses(el, add, all) {
	  // Of the set of 'all' classes, we need the 'add' classes, and only the
	  // 'add' classes to be set.
	  all.forEach(function (cls) {
	    if (add.indexOf(cls) === -1 && hasClass(el, cls)) {
	      removeClass(el, cls);
	    }
	  });
	
	  add.forEach(function (cls) {
	    if (!hasClass(el, cls)) {
	      addClass(el, cls);
	    }
	  });
	}
	
	var deferred = [];
	
	var defer = function defer(fn) {
	  deferred.push(fn);
	};
	
	var flush = function flush() {
	  var fn = undefined;
	  while (fn = deferred.pop()) {
	    fn();
	  }
	};
	
	var Evented = (function () {
	  function Evented() {
	    _classCallCheck(this, Evented);
	  }
	
	  _createClass(Evented, [{
	    key: 'on',
	    value: function on(event, handler, ctx) {
	      var once = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];
	
	      if (typeof this.bindings === 'undefined') {
	        this.bindings = {};
	      }
	      if (typeof this.bindings[event] === 'undefined') {
	        this.bindings[event] = [];
	      }
	      this.bindings[event].push({ handler: handler, ctx: ctx, once: once });
	    }
	  }, {
	    key: 'once',
	    value: function once(event, handler, ctx) {
	      this.on(event, handler, ctx, true);
	    }
	  }, {
	    key: 'off',
	    value: function off(event, handler) {
	      if (typeof this.bindings === 'undefined' || typeof this.bindings[event] === 'undefined') {
	        return;
	      }
	
	      if (typeof handler === 'undefined') {
	        delete this.bindings[event];
	      } else {
	        var i = 0;
	        while (i < this.bindings[event].length) {
	          if (this.bindings[event][i].handler === handler) {
	            this.bindings[event].splice(i, 1);
	          } else {
	            ++i;
	          }
	        }
	      }
	    }
	  }, {
	    key: 'trigger',
	    value: function trigger(event) {
	      if (typeof this.bindings !== 'undefined' && this.bindings[event]) {
	        var i = 0;
	
	        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	          args[_key - 1] = arguments[_key];
	        }
	
	        while (i < this.bindings[event].length) {
	          var _bindings$event$i = this.bindings[event][i];
	          var handler = _bindings$event$i.handler;
	          var ctx = _bindings$event$i.ctx;
	          var once = _bindings$event$i.once;
	
	          var context = ctx;
	          if (typeof context === 'undefined') {
	            context = this;
	          }
	
	          handler.apply(context, args);
	
	          if (once) {
	            this.bindings[event].splice(i, 1);
	          } else {
	            ++i;
	          }
	        }
	      }
	    }
	  }]);
	
	  return Evented;
	})();
	
	TetherBase.Utils = {
	  getActualBoundingClientRect: getActualBoundingClientRect,
	  getScrollParents: getScrollParents,
	  getBounds: getBounds,
	  getOffsetParent: getOffsetParent,
	  extend: extend,
	  addClass: addClass,
	  removeClass: removeClass,
	  hasClass: hasClass,
	  updateClasses: updateClasses,
	  defer: defer,
	  flush: flush,
	  uniqueId: uniqueId,
	  Evented: Evented,
	  getScrollBarSize: getScrollBarSize,
	  removeUtilElements: removeUtilElements
	};
	/* globals TetherBase, performance */
	
	'use strict';
	
	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x6, _x7, _x8) { var _again = true; _function: while (_again) { var object = _x6, property = _x7, receiver = _x8; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x6 = parent; _x7 = property; _x8 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	if (typeof TetherBase === 'undefined') {
	  throw new Error('You must include the utils.js file before tether.js');
	}
	
	var _TetherBase$Utils = TetherBase.Utils;
	var getScrollParents = _TetherBase$Utils.getScrollParents;
	var getBounds = _TetherBase$Utils.getBounds;
	var getOffsetParent = _TetherBase$Utils.getOffsetParent;
	var extend = _TetherBase$Utils.extend;
	var addClass = _TetherBase$Utils.addClass;
	var removeClass = _TetherBase$Utils.removeClass;
	var updateClasses = _TetherBase$Utils.updateClasses;
	var defer = _TetherBase$Utils.defer;
	var flush = _TetherBase$Utils.flush;
	var getScrollBarSize = _TetherBase$Utils.getScrollBarSize;
	var removeUtilElements = _TetherBase$Utils.removeUtilElements;
	
	function within(a, b) {
	  var diff = arguments.length <= 2 || arguments[2] === undefined ? 1 : arguments[2];
	
	  return a + diff >= b && b >= a - diff;
	}
	
	var transformKey = (function () {
	  if (typeof document === 'undefined') {
	    return '';
	  }
	  var el = document.createElement('div');
	
	  var transforms = ['transform', 'WebkitTransform', 'OTransform', 'MozTransform', 'msTransform'];
	  for (var i = 0; i < transforms.length; ++i) {
	    var key = transforms[i];
	    if (el.style[key] !== undefined) {
	      return key;
	    }
	  }
	})();
	
	var tethers = [];
	
	var position = function position() {
	  tethers.forEach(function (tether) {
	    tether.position(false);
	  });
	  flush();
	};
	
	function now() {
	  if (typeof performance !== 'undefined' && typeof performance.now !== 'undefined') {
	    return performance.now();
	  }
	  return +new Date();
	}
	
	(function () {
	  var lastCall = null;
	  var lastDuration = null;
	  var pendingTimeout = null;
	
	  var tick = function tick() {
	    if (typeof lastDuration !== 'undefined' && lastDuration > 16) {
	      // We voluntarily throttle ourselves if we can't manage 60fps
	      lastDuration = Math.min(lastDuration - 16, 250);
	
	      // Just in case this is the last event, remember to position just once more
	      pendingTimeout = setTimeout(tick, 250);
	      return;
	    }
	
	    if (typeof lastCall !== 'undefined' && now() - lastCall < 10) {
	      // Some browsers call events a little too frequently, refuse to run more than is reasonable
	      return;
	    }
	
	    if (pendingTimeout != null) {
	      clearTimeout(pendingTimeout);
	      pendingTimeout = null;
	    }
	
	    lastCall = now();
	    position();
	    lastDuration = now() - lastCall;
	  };
	
	  if (typeof window !== 'undefined' && typeof window.addEventListener !== 'undefined') {
	    ['resize', 'scroll', 'touchmove'].forEach(function (event) {
	      window.addEventListener(event, tick);
	    });
	  }
	})();
	
	var MIRROR_LR = {
	  center: 'center',
	  left: 'right',
	  right: 'left'
	};
	
	var MIRROR_TB = {
	  middle: 'middle',
	  top: 'bottom',
	  bottom: 'top'
	};
	
	var OFFSET_MAP = {
	  top: 0,
	  left: 0,
	  middle: '50%',
	  center: '50%',
	  bottom: '100%',
	  right: '100%'
	};
	
	var autoToFixedAttachment = function autoToFixedAttachment(attachment, relativeToAttachment) {
	  var left = attachment.left;
	  var top = attachment.top;
	
	  if (left === 'auto') {
	    left = MIRROR_LR[relativeToAttachment.left];
	  }
	
	  if (top === 'auto') {
	    top = MIRROR_TB[relativeToAttachment.top];
	  }
	
	  return { left: left, top: top };
	};
	
	var attachmentToOffset = function attachmentToOffset(attachment) {
	  var left = attachment.left;
	  var top = attachment.top;
	
	  if (typeof OFFSET_MAP[attachment.left] !== 'undefined') {
	    left = OFFSET_MAP[attachment.left];
	  }
	
	  if (typeof OFFSET_MAP[attachment.top] !== 'undefined') {
	    top = OFFSET_MAP[attachment.top];
	  }
	
	  return { left: left, top: top };
	};
	
	function addOffset() {
	  var out = { top: 0, left: 0 };
	
	  for (var _len = arguments.length, offsets = Array(_len), _key = 0; _key < _len; _key++) {
	    offsets[_key] = arguments[_key];
	  }
	
	  offsets.forEach(function (_ref) {
	    var top = _ref.top;
	    var left = _ref.left;
	
	    if (typeof top === 'string') {
	      top = parseFloat(top, 10);
	    }
	    if (typeof left === 'string') {
	      left = parseFloat(left, 10);
	    }
	
	    out.top += top;
	    out.left += left;
	  });
	
	  return out;
	}
	
	function offsetToPx(offset, size) {
	  if (typeof offset.left === 'string' && offset.left.indexOf('%') !== -1) {
	    offset.left = parseFloat(offset.left, 10) / 100 * size.width;
	  }
	  if (typeof offset.top === 'string' && offset.top.indexOf('%') !== -1) {
	    offset.top = parseFloat(offset.top, 10) / 100 * size.height;
	  }
	
	  return offset;
	}
	
	var parseOffset = function parseOffset(value) {
	  var _value$split = value.split(' ');
	
	  var _value$split2 = _slicedToArray(_value$split, 2);
	
	  var top = _value$split2[0];
	  var left = _value$split2[1];
	
	  return { top: top, left: left };
	};
	var parseAttachment = parseOffset;
	
	var TetherClass = (function (_Evented) {
	  _inherits(TetherClass, _Evented);
	
	  function TetherClass(options) {
	    var _this = this;
	
	    _classCallCheck(this, TetherClass);
	
	    _get(Object.getPrototypeOf(TetherClass.prototype), 'constructor', this).call(this);
	    this.position = this.position.bind(this);
	
	    tethers.push(this);
	
	    this.history = [];
	
	    this.setOptions(options, false);
	
	    TetherBase.modules.forEach(function (module) {
	      if (typeof module.initialize !== 'undefined') {
	        module.initialize.call(_this);
	      }
	    });
	
	    this.position();
	  }
	
	  _createClass(TetherClass, [{
	    key: 'getClass',
	    value: function getClass() {
	      var key = arguments.length <= 0 || arguments[0] === undefined ? '' : arguments[0];
	      var classes = this.options.classes;
	
	      if (typeof classes !== 'undefined' && classes[key]) {
	        return this.options.classes[key];
	      } else if (this.options.classPrefix) {
	        return this.options.classPrefix + '-' + key;
	      } else {
	        return key;
	      }
	    }
	  }, {
	    key: 'setOptions',
	    value: function setOptions(options) {
	      var _this2 = this;
	
	      var pos = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];
	
	      var defaults = {
	        offset: '0 0',
	        targetOffset: '0 0',
	        targetAttachment: 'auto auto',
	        classPrefix: 'tether'
	      };
	
	      this.options = extend(defaults, options);
	
	      var _options = this.options;
	      var element = _options.element;
	      var target = _options.target;
	      var targetModifier = _options.targetModifier;
	
	      this.element = element;
	      this.target = target;
	      this.targetModifier = targetModifier;
	
	      if (this.target === 'viewport') {
	        this.target = document.body;
	        this.targetModifier = 'visible';
	      } else if (this.target === 'scroll-handle') {
	        this.target = document.body;
	        this.targetModifier = 'scroll-handle';
	      }
	
	      ['element', 'target'].forEach(function (key) {
	        if (typeof _this2[key] === 'undefined') {
	          throw new Error('Tether Error: Both element and target must be defined');
	        }
	
	        if (typeof _this2[key].jquery !== 'undefined') {
	          _this2[key] = _this2[key][0];
	        } else if (typeof _this2[key] === 'string') {
	          _this2[key] = document.querySelector(_this2[key]);
	        }
	      });
	
	      addClass(this.element, this.getClass('element'));
	      if (!(this.options.addTargetClasses === false)) {
	        addClass(this.target, this.getClass('target'));
	      }
	
	      if (!this.options.attachment) {
	        throw new Error('Tether Error: You must provide an attachment');
	      }
	
	      this.targetAttachment = parseAttachment(this.options.targetAttachment);
	      this.attachment = parseAttachment(this.options.attachment);
	      this.offset = parseOffset(this.options.offset);
	      this.targetOffset = parseOffset(this.options.targetOffset);
	
	      if (typeof this.scrollParents !== 'undefined') {
	        this.disable();
	      }
	
	      if (this.targetModifier === 'scroll-handle') {
	        this.scrollParents = [this.target];
	      } else {
	        this.scrollParents = getScrollParents(this.target);
	      }
	
	      if (!(this.options.enabled === false)) {
	        this.enable(pos);
	      }
	    }
	  }, {
	    key: 'getTargetBounds',
	    value: function getTargetBounds() {
	      if (typeof this.targetModifier !== 'undefined') {
	        if (this.targetModifier === 'visible') {
	          if (this.target === document.body) {
	            return { top: pageYOffset, left: pageXOffset, height: innerHeight, width: innerWidth };
	          } else {
	            var bounds = getBounds(this.target);
	
	            var out = {
	              height: bounds.height,
	              width: bounds.width,
	              top: bounds.top,
	              left: bounds.left
	            };
	
	            out.height = Math.min(out.height, bounds.height - (pageYOffset - bounds.top));
	            out.height = Math.min(out.height, bounds.height - (bounds.top + bounds.height - (pageYOffset + innerHeight)));
	            out.height = Math.min(innerHeight, out.height);
	            out.height -= 2;
	
	            out.width = Math.min(out.width, bounds.width - (pageXOffset - bounds.left));
	            out.width = Math.min(out.width, bounds.width - (bounds.left + bounds.width - (pageXOffset + innerWidth)));
	            out.width = Math.min(innerWidth, out.width);
	            out.width -= 2;
	
	            if (out.top < pageYOffset) {
	              out.top = pageYOffset;
	            }
	            if (out.left < pageXOffset) {
	              out.left = pageXOffset;
	            }
	
	            return out;
	          }
	        } else if (this.targetModifier === 'scroll-handle') {
	          var bounds = undefined;
	          var target = this.target;
	          if (target === document.body) {
	            target = document.documentElement;
	
	            bounds = {
	              left: pageXOffset,
	              top: pageYOffset,
	              height: innerHeight,
	              width: innerWidth
	            };
	          } else {
	            bounds = getBounds(target);
	          }
	
	          var style = getComputedStyle(target);
	
	          var hasBottomScroll = target.scrollWidth > target.clientWidth || [style.overflow, style.overflowX].indexOf('scroll') >= 0 || this.target !== document.body;
	
	          var scrollBottom = 0;
	          if (hasBottomScroll) {
	            scrollBottom = 15;
	          }
	
	          var height = bounds.height - parseFloat(style.borderTopWidth) - parseFloat(style.borderBottomWidth) - scrollBottom;
	
	          var out = {
	            width: 15,
	            height: height * 0.975 * (height / target.scrollHeight),
	            left: bounds.left + bounds.width - parseFloat(style.borderLeftWidth) - 15
	          };
	
	          var fitAdj = 0;
	          if (height < 408 && this.target === document.body) {
	            fitAdj = -0.00011 * Math.pow(height, 2) - 0.00727 * height + 22.58;
	          }
	
	          if (this.target !== document.body) {
	            out.height = Math.max(out.height, 24);
	          }
	
	          var scrollPercentage = this.target.scrollTop / (target.scrollHeight - height);
	          out.top = scrollPercentage * (height - out.height - fitAdj) + bounds.top + parseFloat(style.borderTopWidth);
	
	          if (this.target === document.body) {
	            out.height = Math.max(out.height, 24);
	          }
	
	          return out;
	        }
	      } else {
	        return getBounds(this.target);
	      }
	    }
	  }, {
	    key: 'clearCache',
	    value: function clearCache() {
	      this._cache = {};
	    }
	  }, {
	    key: 'cache',
	    value: function cache(k, getter) {
	      // More than one module will often need the same DOM info, so
	      // we keep a cache which is cleared on each position call
	      if (typeof this._cache === 'undefined') {
	        this._cache = {};
	      }
	
	      if (typeof this._cache[k] === 'undefined') {
	        this._cache[k] = getter.call(this);
	      }
	
	      return this._cache[k];
	    }
	  }, {
	    key: 'enable',
	    value: function enable() {
	      var _this3 = this;
	
	      var pos = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
	
	      if (!(this.options.addTargetClasses === false)) {
	        addClass(this.target, this.getClass('enabled'));
	      }
	      addClass(this.element, this.getClass('enabled'));
	      this.enabled = true;
	
	      this.scrollParents.forEach(function (parent) {
	        if (parent !== _this3.target.ownerDocument) {
	          parent.addEventListener('scroll', _this3.position);
	        }
	      });
	
	      if (pos) {
	        this.position();
	      }
	    }
	  }, {
	    key: 'disable',
	    value: function disable() {
	      var _this4 = this;
	
	      removeClass(this.target, this.getClass('enabled'));
	      removeClass(this.element, this.getClass('enabled'));
	      this.enabled = false;
	
	      if (typeof this.scrollParents !== 'undefined') {
	        this.scrollParents.forEach(function (parent) {
	          parent.removeEventListener('scroll', _this4.position);
	        });
	      }
	    }
	  }, {
	    key: 'destroy',
	    value: function destroy() {
	      var _this5 = this;
	
	      this.disable();
	
	      tethers.forEach(function (tether, i) {
	        if (tether === _this5) {
	          tethers.splice(i, 1);
	        }
	      });
	
	      // Remove any elements we were using for convenience from the DOM
	      if (tethers.length === 0) {
	        removeUtilElements();
	      }
	    }
	  }, {
	    key: 'updateAttachClasses',
	    value: function updateAttachClasses(elementAttach, targetAttach) {
	      var _this6 = this;
	
	      elementAttach = elementAttach || this.attachment;
	      targetAttach = targetAttach || this.targetAttachment;
	      var sides = ['left', 'top', 'bottom', 'right', 'middle', 'center'];
	
	      if (typeof this._addAttachClasses !== 'undefined' && this._addAttachClasses.length) {
	        // updateAttachClasses can be called more than once in a position call, so
	        // we need to clean up after ourselves such that when the last defer gets
	        // ran it doesn't add any extra classes from previous calls.
	        this._addAttachClasses.splice(0, this._addAttachClasses.length);
	      }
	
	      if (typeof this._addAttachClasses === 'undefined') {
	        this._addAttachClasses = [];
	      }
	      var add = this._addAttachClasses;
	
	      if (elementAttach.top) {
	        add.push(this.getClass('element-attached') + '-' + elementAttach.top);
	      }
	      if (elementAttach.left) {
	        add.push(this.getClass('element-attached') + '-' + elementAttach.left);
	      }
	      if (targetAttach.top) {
	        add.push(this.getClass('target-attached') + '-' + targetAttach.top);
	      }
	      if (targetAttach.left) {
	        add.push(this.getClass('target-attached') + '-' + targetAttach.left);
	      }
	
	      var all = [];
	      sides.forEach(function (side) {
	        all.push(_this6.getClass('element-attached') + '-' + side);
	        all.push(_this6.getClass('target-attached') + '-' + side);
	      });
	
	      defer(function () {
	        if (!(typeof _this6._addAttachClasses !== 'undefined')) {
	          return;
	        }
	
	        updateClasses(_this6.element, _this6._addAttachClasses, all);
	        if (!(_this6.options.addTargetClasses === false)) {
	          updateClasses(_this6.target, _this6._addAttachClasses, all);
	        }
	
	        delete _this6._addAttachClasses;
	      });
	    }
	  }, {
	    key: 'position',
	    value: function position() {
	      var _this7 = this;
	
	      var flushChanges = arguments.length <= 0 || arguments[0] === undefined ? true : arguments[0];
	
	      // flushChanges commits the changes immediately, leave true unless you are positioning multiple
	      // tethers (in which case call Tether.Utils.flush yourself when you're done)
	
	      if (!this.enabled) {
	        return;
	      }
	
	      this.clearCache();
	
	      // Turn 'auto' attachments into the appropriate corner or edge
	      var targetAttachment = autoToFixedAttachment(this.targetAttachment, this.attachment);
	
	      this.updateAttachClasses(this.attachment, targetAttachment);
	
	      var elementPos = this.cache('element-bounds', function () {
	        return getBounds(_this7.element);
	      });
	
	      var width = elementPos.width;
	      var height = elementPos.height;
	
	      if (width === 0 && height === 0 && typeof this.lastSize !== 'undefined') {
	        var _lastSize = this.lastSize;
	
	        // We cache the height and width to make it possible to position elements that are
	        // getting hidden.
	        width = _lastSize.width;
	        height = _lastSize.height;
	      } else {
	        this.lastSize = { width: width, height: height };
	      }
	
	      var targetPos = this.cache('target-bounds', function () {
	        return _this7.getTargetBounds();
	      });
	      var targetSize = targetPos;
	
	      // Get an actual px offset from the attachment
	      var offset = offsetToPx(attachmentToOffset(this.attachment), { width: width, height: height });
	      var targetOffset = offsetToPx(attachmentToOffset(targetAttachment), targetSize);
	
	      var manualOffset = offsetToPx(this.offset, { width: width, height: height });
	      var manualTargetOffset = offsetToPx(this.targetOffset, targetSize);
	
	      // Add the manually provided offset
	      offset = addOffset(offset, manualOffset);
	      targetOffset = addOffset(targetOffset, manualTargetOffset);
	
	      // It's now our goal to make (element position + offset) == (target position + target offset)
	      var left = targetPos.left + targetOffset.left - offset.left;
	      var top = targetPos.top + targetOffset.top - offset.top;
	
	      for (var i = 0; i < TetherBase.modules.length; ++i) {
	        var _module2 = TetherBase.modules[i];
	        var ret = _module2.position.call(this, {
	          left: left,
	          top: top,
	          targetAttachment: targetAttachment,
	          targetPos: targetPos,
	          elementPos: elementPos,
	          offset: offset,
	          targetOffset: targetOffset,
	          manualOffset: manualOffset,
	          manualTargetOffset: manualTargetOffset,
	          scrollbarSize: scrollbarSize,
	          attachment: this.attachment
	        });
	
	        if (ret === false) {
	          return false;
	        } else if (typeof ret === 'undefined' || typeof ret !== 'object') {
	          continue;
	        } else {
	          top = ret.top;
	          left = ret.left;
	        }
	      }
	
	      // We describe the position three different ways to give the optimizer
	      // a chance to decide the best possible way to position the element
	      // with the fewest repaints.
	      var next = {
	        // It's position relative to the page (absolute positioning when
	        // the element is a child of the body)
	        page: {
	          top: top,
	          left: left
	        },
	
	        // It's position relative to the viewport (fixed positioning)
	        viewport: {
	          top: top - pageYOffset,
	          bottom: pageYOffset - top - height + innerHeight,
	          left: left - pageXOffset,
	          right: pageXOffset - left - width + innerWidth
	        }
	      };
	
	      var doc = this.target.ownerDocument;
	      var win = doc.defaultView;
	
	      var scrollbarSize = undefined;
	      if (win.innerHeight > doc.documentElement.clientHeight) {
	        scrollbarSize = this.cache('scrollbar-size', getScrollBarSize);
	        next.viewport.bottom -= scrollbarSize.height;
	      }
	
	      if (win.innerWidth > doc.documentElement.clientWidth) {
	        scrollbarSize = this.cache('scrollbar-size', getScrollBarSize);
	        next.viewport.right -= scrollbarSize.width;
	      }
	
	      if (['', 'static'].indexOf(doc.body.style.position) === -1 || ['', 'static'].indexOf(doc.body.parentElement.style.position) === -1) {
	        // Absolute positioning in the body will be relative to the page, not the 'initial containing block'
	        next.page.bottom = doc.body.scrollHeight - top - height;
	        next.page.right = doc.body.scrollWidth - left - width;
	      }
	
	      if (typeof this.options.optimizations !== 'undefined' && this.options.optimizations.moveElement !== false && !(typeof this.targetModifier !== 'undefined')) {
	        (function () {
	          var offsetParent = _this7.cache('target-offsetparent', function () {
	            return getOffsetParent(_this7.target);
	          });
	          var offsetPosition = _this7.cache('target-offsetparent-bounds', function () {
	            return getBounds(offsetParent);
	          });
	          var offsetParentStyle = getComputedStyle(offsetParent);
	          var offsetParentSize = offsetPosition;
	
	          var offsetBorder = {};
	          ['Top', 'Left', 'Bottom', 'Right'].forEach(function (side) {
	            offsetBorder[side.toLowerCase()] = parseFloat(offsetParentStyle['border' + side + 'Width']);
	          });
	
	          offsetPosition.right = doc.body.scrollWidth - offsetPosition.left - offsetParentSize.width + offsetBorder.right;
	          offsetPosition.bottom = doc.body.scrollHeight - offsetPosition.top - offsetParentSize.height + offsetBorder.bottom;
	
	          if (next.page.top >= offsetPosition.top + offsetBorder.top && next.page.bottom >= offsetPosition.bottom) {
	            if (next.page.left >= offsetPosition.left + offsetBorder.left && next.page.right >= offsetPosition.right) {
	              // We're within the visible part of the target's scroll parent
	              var scrollTop = offsetParent.scrollTop;
	              var scrollLeft = offsetParent.scrollLeft;
	
	              // It's position relative to the target's offset parent (absolute positioning when
	              // the element is moved to be a child of the target's offset parent).
	              next.offset = {
	                top: next.page.top - offsetPosition.top + scrollTop - offsetBorder.top,
	                left: next.page.left - offsetPosition.left + scrollLeft - offsetBorder.left
	              };
	            }
	          }
	        })();
	      }
	
	      // We could also travel up the DOM and try each containing context, rather than only
	      // looking at the body, but we're gonna get diminishing returns.
	
	      this.move(next);
	
	      this.history.unshift(next);
	
	      if (this.history.length > 3) {
	        this.history.pop();
	      }
	
	      if (flushChanges) {
	        flush();
	      }
	
	      return true;
	    }
	
	    // THE ISSUE
	  }, {
	    key: 'move',
	    value: function move(pos) {
	      var _this8 = this;
	
	      if (!(typeof this.element.parentNode !== 'undefined')) {
	        return;
	      }
	
	      var same = {};
	
	      for (var type in pos) {
	        same[type] = {};
	
	        for (var key in pos[type]) {
	          var found = false;
	
	          for (var i = 0; i < this.history.length; ++i) {
	            var point = this.history[i];
	            if (typeof point[type] !== 'undefined' && !within(point[type][key], pos[type][key])) {
	              found = true;
	              break;
	            }
	          }
	
	          if (!found) {
	            same[type][key] = true;
	          }
	        }
	      }
	
	      var css = { top: '', left: '', right: '', bottom: '' };
	
	      var transcribe = function transcribe(_same, _pos) {
	        var hasOptimizations = typeof _this8.options.optimizations !== 'undefined';
	        var gpu = hasOptimizations ? _this8.options.optimizations.gpu : null;
	        if (gpu !== false) {
	          var yPos = undefined,
	              xPos = undefined;
	          if (_same.top) {
	            css.top = 0;
	            yPos = _pos.top;
	          } else {
	            css.bottom = 0;
	            yPos = -_pos.bottom;
	          }
	
	          if (_same.left) {
	            css.left = 0;
	            xPos = _pos.left;
	          } else {
	            css.right = 0;
	            xPos = -_pos.right;
	          }
	
	          if (window.matchMedia) {
	            // HubSpot/tether#207
	            var retina = window.matchMedia('only screen and (min-resolution: 1.3dppx)').matches || window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 1.3)').matches;
	            if (!retina) {
	              xPos = Math.round(xPos);
	              yPos = Math.round(yPos);
	            }
	          }
	
	          css[transformKey] = 'translateX(' + xPos + 'px) translateY(' + yPos + 'px)';
	
	          if (transformKey !== 'msTransform') {
	            // The Z transform will keep this in the GPU (faster, and prevents artifacts),
	            // but IE9 doesn't support 3d transforms and will choke.
	            css[transformKey] += " translateZ(0)";
	          }
	        } else {
	          if (_same.top) {
	            css.top = _pos.top + 'px';
	          } else {
	            css.bottom = _pos.bottom + 'px';
	          }
	
	          if (_same.left) {
	            css.left = _pos.left + 'px';
	          } else {
	            css.right = _pos.right + 'px';
	          }
	        }
	      };
	
	      var moved = false;
	      if ((same.page.top || same.page.bottom) && (same.page.left || same.page.right)) {
	        css.position = 'absolute';
	        transcribe(same.page, pos.page);
	      } else if ((same.viewport.top || same.viewport.bottom) && (same.viewport.left || same.viewport.right)) {
	        css.position = 'fixed';
	        transcribe(same.viewport, pos.viewport);
	      } else if (typeof same.offset !== 'undefined' && same.offset.top && same.offset.left) {
	        (function () {
	          css.position = 'absolute';
	          var offsetParent = _this8.cache('target-offsetparent', function () {
	            return getOffsetParent(_this8.target);
	          });
	
	          if (getOffsetParent(_this8.element) !== offsetParent) {
	            defer(function () {
	              _this8.element.parentNode.removeChild(_this8.element);
	              offsetParent.appendChild(_this8.element);
	            });
	          }
	
	          transcribe(same.offset, pos.offset);
	          moved = true;
	        })();
	      } else {
	        css.position = 'absolute';
	        transcribe({ top: true, left: true }, pos.page);
	      }
	
	      if (!moved) {
	        if (this.options.bodyElement) {
	          this.options.bodyElement.appendChild(this.element);
	        } else {
	          var offsetParentIsBody = true;
	          var currentNode = this.element.parentNode;
	          while (currentNode && currentNode.nodeType === 1 && currentNode.tagName !== 'BODY') {
	            if (getComputedStyle(currentNode).position !== 'static') {
	              offsetParentIsBody = false;
	              break;
	            }
	
	            currentNode = currentNode.parentNode;
	          }
	
	          if (!offsetParentIsBody) {
	            this.element.parentNode.removeChild(this.element);
	            this.element.ownerDocument.body.appendChild(this.element);
	          }
	        }
	      }
	
	      // Any css change will trigger a repaint, so let's avoid one if nothing changed
	      var writeCSS = {};
	      var write = false;
	      for (var key in css) {
	        var val = css[key];
	        var elVal = this.element.style[key];
	
	        if (elVal !== val) {
	          write = true;
	          writeCSS[key] = val;
	        }
	      }
	
	      if (write) {
	        defer(function () {
	          extend(_this8.element.style, writeCSS);
	          _this8.trigger('repositioned');
	        });
	      }
	    }
	  }]);
	
	  return TetherClass;
	})(Evented);
	
	TetherClass.modules = [];
	
	TetherBase.position = position;
	
	var Tether = extend(TetherClass, TetherBase);
	/* globals TetherBase */
	
	'use strict';
	
	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();
	
	var _TetherBase$Utils = TetherBase.Utils;
	var getBounds = _TetherBase$Utils.getBounds;
	var extend = _TetherBase$Utils.extend;
	var updateClasses = _TetherBase$Utils.updateClasses;
	var defer = _TetherBase$Utils.defer;
	
	var BOUNDS_FORMAT = ['left', 'top', 'right', 'bottom'];
	
	function getBoundingRect(tether, to) {
	  if (to === 'scrollParent') {
	    to = tether.scrollParents[0];
	  } else if (to === 'window') {
	    to = [pageXOffset, pageYOffset, innerWidth + pageXOffset, innerHeight + pageYOffset];
	  }
	
	  if (to === document) {
	    to = to.documentElement;
	  }
	
	  if (typeof to.nodeType !== 'undefined') {
	    (function () {
	      var node = to;
	      var size = getBounds(to);
	      var pos = size;
	      var style = getComputedStyle(to);
	
	      to = [pos.left, pos.top, size.width + pos.left, size.height + pos.top];
	
	      // Account any parent Frames scroll offset
	      if (node.ownerDocument !== document) {
	        var win = node.ownerDocument.defaultView;
	        to[0] += win.pageXOffset;
	        to[1] += win.pageYOffset;
	        to[2] += win.pageXOffset;
	        to[3] += win.pageYOffset;
	      }
	
	      BOUNDS_FORMAT.forEach(function (side, i) {
	        side = side[0].toUpperCase() + side.substr(1);
	        if (side === 'Top' || side === 'Left') {
	          to[i] += parseFloat(style['border' + side + 'Width']);
	        } else {
	          to[i] -= parseFloat(style['border' + side + 'Width']);
	        }
	      });
	    })();
	  }
	
	  return to;
	}
	
	TetherBase.modules.push({
	  position: function position(_ref) {
	    var _this = this;
	
	    var top = _ref.top;
	    var left = _ref.left;
	    var targetAttachment = _ref.targetAttachment;
	
	    if (!this.options.constraints) {
	      return true;
	    }
	
	    var _cache = this.cache('element-bounds', function () {
	      return getBounds(_this.element);
	    });
	
	    var height = _cache.height;
	    var width = _cache.width;
	
	    if (width === 0 && height === 0 && typeof this.lastSize !== 'undefined') {
	      var _lastSize = this.lastSize;
	
	      // Handle the item getting hidden as a result of our positioning without glitching
	      // the classes in and out
	      width = _lastSize.width;
	      height = _lastSize.height;
	    }
	
	    var targetSize = this.cache('target-bounds', function () {
	      return _this.getTargetBounds();
	    });
	
	    var targetHeight = targetSize.height;
	    var targetWidth = targetSize.width;
	
	    var allClasses = [this.getClass('pinned'), this.getClass('out-of-bounds')];
	
	    this.options.constraints.forEach(function (constraint) {
	      var outOfBoundsClass = constraint.outOfBoundsClass;
	      var pinnedClass = constraint.pinnedClass;
	
	      if (outOfBoundsClass) {
	        allClasses.push(outOfBoundsClass);
	      }
	      if (pinnedClass) {
	        allClasses.push(pinnedClass);
	      }
	    });
	
	    allClasses.forEach(function (cls) {
	      ['left', 'top', 'right', 'bottom'].forEach(function (side) {
	        allClasses.push(cls + '-' + side);
	      });
	    });
	
	    var addClasses = [];
	
	    var tAttachment = extend({}, targetAttachment);
	    var eAttachment = extend({}, this.attachment);
	
	    this.options.constraints.forEach(function (constraint) {
	      var to = constraint.to;
	      var attachment = constraint.attachment;
	      var pin = constraint.pin;
	
	      if (typeof attachment === 'undefined') {
	        attachment = '';
	      }
	
	      var changeAttachX = undefined,
	          changeAttachY = undefined;
	      if (attachment.indexOf(' ') >= 0) {
	        var _attachment$split = attachment.split(' ');
	
	        var _attachment$split2 = _slicedToArray(_attachment$split, 2);
	
	        changeAttachY = _attachment$split2[0];
	        changeAttachX = _attachment$split2[1];
	      } else {
	        changeAttachX = changeAttachY = attachment;
	      }
	
	      var bounds = getBoundingRect(_this, to);
	
	      if (changeAttachY === 'target' || changeAttachY === 'both') {
	        if (top < bounds[1] && tAttachment.top === 'top') {
	          top += targetHeight;
	          tAttachment.top = 'bottom';
	        }
	
	        if (top + height > bounds[3] && tAttachment.top === 'bottom') {
	          top -= targetHeight;
	          tAttachment.top = 'top';
	        }
	      }
	
	      if (changeAttachY === 'together') {
	        if (tAttachment.top === 'top') {
	          if (eAttachment.top === 'bottom' && top < bounds[1]) {
	            top += targetHeight;
	            tAttachment.top = 'bottom';
	
	            top += height;
	            eAttachment.top = 'top';
	          } else if (eAttachment.top === 'top' && top + height > bounds[3] && top - (height - targetHeight) >= bounds[1]) {
	            top -= height - targetHeight;
	            tAttachment.top = 'bottom';
	
	            eAttachment.top = 'bottom';
	          }
	        }
	
	        if (tAttachment.top === 'bottom') {
	          if (eAttachment.top === 'top' && top + height > bounds[3]) {
	            top -= targetHeight;
	            tAttachment.top = 'top';
	
	            top -= height;
	            eAttachment.top = 'bottom';
	          } else if (eAttachment.top === 'bottom' && top < bounds[1] && top + (height * 2 - targetHeight) <= bounds[3]) {
	            top += height - targetHeight;
	            tAttachment.top = 'top';
	
	            eAttachment.top = 'top';
	          }
	        }
	
	        if (tAttachment.top === 'middle') {
	          if (top + height > bounds[3] && eAttachment.top === 'top') {
	            top -= height;
	            eAttachment.top = 'bottom';
	          } else if (top < bounds[1] && eAttachment.top === 'bottom') {
	            top += height;
	            eAttachment.top = 'top';
	          }
	        }
	      }
	
	      if (changeAttachX === 'target' || changeAttachX === 'both') {
	        if (left < bounds[0] && tAttachment.left === 'left') {
	          left += targetWidth;
	          tAttachment.left = 'right';
	        }
	
	        if (left + width > bounds[2] && tAttachment.left === 'right') {
	          left -= targetWidth;
	          tAttachment.left = 'left';
	        }
	      }
	
	      if (changeAttachX === 'together') {
	        if (left < bounds[0] && tAttachment.left === 'left') {
	          if (eAttachment.left === 'right') {
	            left += targetWidth;
	            tAttachment.left = 'right';
	
	            left += width;
	            eAttachment.left = 'left';
	          } else if (eAttachment.left === 'left') {
	            left += targetWidth;
	            tAttachment.left = 'right';
	
	            left -= width;
	            eAttachment.left = 'right';
	          }
	        } else if (left + width > bounds[2] && tAttachment.left === 'right') {
	          if (eAttachment.left === 'left') {
	            left -= targetWidth;
	            tAttachment.left = 'left';
	
	            left -= width;
	            eAttachment.left = 'right';
	          } else if (eAttachment.left === 'right') {
	            left -= targetWidth;
	            tAttachment.left = 'left';
	
	            left += width;
	            eAttachment.left = 'left';
	          }
	        } else if (tAttachment.left === 'center') {
	          if (left + width > bounds[2] && eAttachment.left === 'left') {
	            left -= width;
	            eAttachment.left = 'right';
	          } else if (left < bounds[0] && eAttachment.left === 'right') {
	            left += width;
	            eAttachment.left = 'left';
	          }
	        }
	      }
	
	      if (changeAttachY === 'element' || changeAttachY === 'both') {
	        if (top < bounds[1] && eAttachment.top === 'bottom') {
	          top += height;
	          eAttachment.top = 'top';
	        }
	
	        if (top + height > bounds[3] && eAttachment.top === 'top') {
	          top -= height;
	          eAttachment.top = 'bottom';
	        }
	      }
	
	      if (changeAttachX === 'element' || changeAttachX === 'both') {
	        if (left < bounds[0]) {
	          if (eAttachment.left === 'right') {
	            left += width;
	            eAttachment.left = 'left';
	          } else if (eAttachment.left === 'center') {
	            left += width / 2;
	            eAttachment.left = 'left';
	          }
	        }
	
	        if (left + width > bounds[2]) {
	          if (eAttachment.left === 'left') {
	            left -= width;
	            eAttachment.left = 'right';
	          } else if (eAttachment.left === 'center') {
	            left -= width / 2;
	            eAttachment.left = 'right';
	          }
	        }
	      }
	
	      if (typeof pin === 'string') {
	        pin = pin.split(',').map(function (p) {
	          return p.trim();
	        });
	      } else if (pin === true) {
	        pin = ['top', 'left', 'right', 'bottom'];
	      }
	
	      pin = pin || [];
	
	      var pinned = [];
	      var oob = [];
	
	      if (top < bounds[1]) {
	        if (pin.indexOf('top') >= 0) {
	          top = bounds[1];
	          pinned.push('top');
	        } else {
	          oob.push('top');
	        }
	      }
	
	      if (top + height > bounds[3]) {
	        if (pin.indexOf('bottom') >= 0) {
	          top = bounds[3] - height;
	          pinned.push('bottom');
	        } else {
	          oob.push('bottom');
	        }
	      }
	
	      if (left < bounds[0]) {
	        if (pin.indexOf('left') >= 0) {
	          left = bounds[0];
	          pinned.push('left');
	        } else {
	          oob.push('left');
	        }
	      }
	
	      if (left + width > bounds[2]) {
	        if (pin.indexOf('right') >= 0) {
	          left = bounds[2] - width;
	          pinned.push('right');
	        } else {
	          oob.push('right');
	        }
	      }
	
	      if (pinned.length) {
	        (function () {
	          var pinnedClass = undefined;
	          if (typeof _this.options.pinnedClass !== 'undefined') {
	            pinnedClass = _this.options.pinnedClass;
	          } else {
	            pinnedClass = _this.getClass('pinned');
	          }
	
	          addClasses.push(pinnedClass);
	          pinned.forEach(function (side) {
	            addClasses.push(pinnedClass + '-' + side);
	          });
	        })();
	      }
	
	      if (oob.length) {
	        (function () {
	          var oobClass = undefined;
	          if (typeof _this.options.outOfBoundsClass !== 'undefined') {
	            oobClass = _this.options.outOfBoundsClass;
	          } else {
	            oobClass = _this.getClass('out-of-bounds');
	          }
	
	          addClasses.push(oobClass);
	          oob.forEach(function (side) {
	            addClasses.push(oobClass + '-' + side);
	          });
	        })();
	      }
	
	      if (pinned.indexOf('left') >= 0 || pinned.indexOf('right') >= 0) {
	        eAttachment.left = tAttachment.left = false;
	      }
	      if (pinned.indexOf('top') >= 0 || pinned.indexOf('bottom') >= 0) {
	        eAttachment.top = tAttachment.top = false;
	      }
	
	      if (tAttachment.top !== targetAttachment.top || tAttachment.left !== targetAttachment.left || eAttachment.top !== _this.attachment.top || eAttachment.left !== _this.attachment.left) {
	        _this.updateAttachClasses(eAttachment, tAttachment);
	        _this.trigger('update', {
	          attachment: eAttachment,
	          targetAttachment: tAttachment
	        });
	      }
	    });
	
	    defer(function () {
	      if (!(_this.options.addTargetClasses === false)) {
	        updateClasses(_this.target, addClasses, allClasses);
	      }
	      updateClasses(_this.element, addClasses, allClasses);
	    });
	
	    return { top: top, left: left };
	  }
	});
	/* globals TetherBase */
	
	'use strict';
	
	var _TetherBase$Utils = TetherBase.Utils;
	var getBounds = _TetherBase$Utils.getBounds;
	var updateClasses = _TetherBase$Utils.updateClasses;
	var defer = _TetherBase$Utils.defer;
	
	TetherBase.modules.push({
	  position: function position(_ref) {
	    var _this = this;
	
	    var top = _ref.top;
	    var left = _ref.left;
	
	    var _cache = this.cache('element-bounds', function () {
	      return getBounds(_this.element);
	    });
	
	    var height = _cache.height;
	    var width = _cache.width;
	
	    var targetPos = this.getTargetBounds();
	
	    var bottom = top + height;
	    var right = left + width;
	
	    var abutted = [];
	    if (top <= targetPos.bottom && bottom >= targetPos.top) {
	      ['left', 'right'].forEach(function (side) {
	        var targetPosSide = targetPos[side];
	        if (targetPosSide === left || targetPosSide === right) {
	          abutted.push(side);
	        }
	      });
	    }
	
	    if (left <= targetPos.right && right >= targetPos.left) {
	      ['top', 'bottom'].forEach(function (side) {
	        var targetPosSide = targetPos[side];
	        if (targetPosSide === top || targetPosSide === bottom) {
	          abutted.push(side);
	        }
	      });
	    }
	
	    var allClasses = [];
	    var addClasses = [];
	
	    var sides = ['left', 'top', 'right', 'bottom'];
	    allClasses.push(this.getClass('abutted'));
	    sides.forEach(function (side) {
	      allClasses.push(_this.getClass('abutted') + '-' + side);
	    });
	
	    if (abutted.length) {
	      addClasses.push(this.getClass('abutted'));
	    }
	
	    abutted.forEach(function (side) {
	      addClasses.push(_this.getClass('abutted') + '-' + side);
	    });
	
	    defer(function () {
	      if (!(_this.options.addTargetClasses === false)) {
	        updateClasses(_this.target, addClasses, allClasses);
	      }
	      updateClasses(_this.element, addClasses, allClasses);
	    });
	
	    return true;
	  }
	});
	/* globals TetherBase */
	
	'use strict';
	
	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();
	
	TetherBase.modules.push({
	  position: function position(_ref) {
	    var top = _ref.top;
	    var left = _ref.left;
	
	    if (!this.options.shift) {
	      return;
	    }
	
	    var shift = this.options.shift;
	    if (typeof this.options.shift === 'function') {
	      shift = this.options.shift.call(this, { top: top, left: left });
	    }
	
	    var shiftTop = undefined,
	        shiftLeft = undefined;
	    if (typeof shift === 'string') {
	      shift = shift.split(' ');
	      shift[1] = shift[1] || shift[0];
	
	      var _shift = shift;
	
	      var _shift2 = _slicedToArray(_shift, 2);
	
	      shiftTop = _shift2[0];
	      shiftLeft = _shift2[1];
	
	      shiftTop = parseFloat(shiftTop, 10);
	      shiftLeft = parseFloat(shiftLeft, 10);
	    } else {
	      shiftTop = shift.top;
	      shiftLeft = shift.left;
	    }
	
	    top += shiftTop;
	    left += shiftLeft;
	
	    return { top: top, left: left };
	  }
	});
	return Tether;
	
	}));


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(6);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../css-loader/index.js!./bootstrap.css", function() {
				var newContent = require("!!../../../css-loader/index.js!./bootstrap.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports
	
	
	// module
	exports.push([module.id, "/*!\n * Bootstrap v4.0.0-alpha.6 (https://getbootstrap.com)\n * Copyright 2011-2017 The Bootstrap Authors\n * Copyright 2011-2017 Twitter, Inc.\n * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)\n */\n/*! normalize.css v5.0.0 | MIT License | github.com/necolas/normalize.css */\nhtml {\n  font-family: sans-serif;\n  line-height: 1.15;\n  -ms-text-size-adjust: 100%;\n  -webkit-text-size-adjust: 100%;\n}\n\nbody {\n  margin: 0;\n}\n\narticle,\naside,\nfooter,\nheader,\nnav,\nsection {\n  display: block;\n}\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\nfigcaption,\nfigure,\nmain {\n  display: block;\n}\n\nfigure {\n  margin: 1em 40px;\n}\n\nhr {\n  -webkit-box-sizing: content-box;\n          box-sizing: content-box;\n  height: 0;\n  overflow: visible;\n}\n\npre {\n  font-family: monospace, monospace;\n  font-size: 1em;\n}\n\na {\n  background-color: transparent;\n  -webkit-text-decoration-skip: objects;\n}\n\na:active,\na:hover {\n  outline-width: 0;\n}\n\nabbr[title] {\n  border-bottom: none;\n  text-decoration: underline;\n  text-decoration: underline dotted;\n}\n\nb,\nstrong {\n  font-weight: inherit;\n}\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\ncode,\nkbd,\nsamp {\n  font-family: monospace, monospace;\n  font-size: 1em;\n}\n\ndfn {\n  font-style: italic;\n}\n\nmark {\n  background-color: #ff0;\n  color: #000;\n}\n\nsmall {\n  font-size: 80%;\n}\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\naudio,\nvideo {\n  display: inline-block;\n}\n\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\nimg {\n  border-style: none;\n}\n\nsvg:not(:root) {\n  overflow: hidden;\n}\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font-family: sans-serif;\n  font-size: 100%;\n  line-height: 1.15;\n  margin: 0;\n}\n\nbutton,\ninput {\n  overflow: visible;\n}\n\nbutton,\nselect {\n  text-transform: none;\n}\n\nbutton,\nhtml [type=\"button\"],\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button;\n}\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\n\nlegend {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  color: inherit;\n  display: table;\n  max-width: 100%;\n  padding: 0;\n  white-space: normal;\n}\n\nprogress {\n  display: inline-block;\n  vertical-align: baseline;\n}\n\ntextarea {\n  overflow: auto;\n}\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  padding: 0;\n}\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n[type=\"search\"] {\n  -webkit-appearance: textfield;\n  outline-offset: -2px;\n}\n\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button;\n  font: inherit;\n}\n\ndetails,\nmenu {\n  display: block;\n}\n\nsummary {\n  display: list-item;\n}\n\ncanvas {\n  display: inline-block;\n}\n\ntemplate {\n  display: none;\n}\n\n[hidden] {\n  display: none;\n}\n\n@media print {\n  *,\n  *::before,\n  *::after,\n  p::first-letter,\n  div::first-letter,\n  blockquote::first-letter,\n  li::first-letter,\n  p::first-line,\n  div::first-line,\n  blockquote::first-line,\n  li::first-line {\n    text-shadow: none !important;\n    -webkit-box-shadow: none !important;\n            box-shadow: none !important;\n  }\n  a,\n  a:visited {\n    text-decoration: underline;\n  }\n  abbr[title]::after {\n    content: \" (\" attr(title) \")\";\n  }\n  pre {\n    white-space: pre-wrap !important;\n  }\n  pre,\n  blockquote {\n    border: 1px solid #999;\n    page-break-inside: avoid;\n  }\n  thead {\n    display: table-header-group;\n  }\n  tr,\n  img {\n    page-break-inside: avoid;\n  }\n  p,\n  h2,\n  h3 {\n    orphans: 3;\n    widows: 3;\n  }\n  h2,\n  h3 {\n    page-break-after: avoid;\n  }\n  .navbar {\n    display: none;\n  }\n  .badge {\n    border: 1px solid #000;\n  }\n  .table {\n    border-collapse: collapse !important;\n  }\n  .table td,\n  .table th {\n    background-color: #fff !important;\n  }\n  .table-bordered th,\n  .table-bordered td {\n    border: 1px solid #ddd !important;\n  }\n}\n\nhtml {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n\n*,\n*::before,\n*::after {\n  -webkit-box-sizing: inherit;\n          box-sizing: inherit;\n}\n\n@-ms-viewport {\n  width: device-width;\n}\n\nhtml {\n  -ms-overflow-style: scrollbar;\n  -webkit-tap-highlight-color: transparent;\n}\n\nbody {\n  font-family: -apple-system, system-ui, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n  font-size: 1rem;\n  font-weight: normal;\n  line-height: 1.5;\n  color: #292b2c;\n  background-color: #fff;\n}\n\n[tabindex=\"-1\"]:focus {\n  outline: none !important;\n}\n\nh1, h2, h3, h4, h5, h6 {\n  margin-top: 0;\n  margin-bottom: .5rem;\n}\n\np {\n  margin-top: 0;\n  margin-bottom: 1rem;\n}\n\nabbr[title],\nabbr[data-original-title] {\n  cursor: help;\n}\n\naddress {\n  margin-bottom: 1rem;\n  font-style: normal;\n  line-height: inherit;\n}\n\nol,\nul,\ndl {\n  margin-top: 0;\n  margin-bottom: 1rem;\n}\n\nol ol,\nul ul,\nol ul,\nul ol {\n  margin-bottom: 0;\n}\n\ndt {\n  font-weight: bold;\n}\n\ndd {\n  margin-bottom: .5rem;\n  margin-left: 0;\n}\n\nblockquote {\n  margin: 0 0 1rem;\n}\n\na {\n  color: #0275d8;\n  text-decoration: none;\n}\n\na:focus, a:hover {\n  color: #014c8c;\n  text-decoration: underline;\n}\n\na:not([href]):not([tabindex]) {\n  color: inherit;\n  text-decoration: none;\n}\n\na:not([href]):not([tabindex]):focus, a:not([href]):not([tabindex]):hover {\n  color: inherit;\n  text-decoration: none;\n}\n\na:not([href]):not([tabindex]):focus {\n  outline: 0;\n}\n\npre {\n  margin-top: 0;\n  margin-bottom: 1rem;\n  overflow: auto;\n}\n\nfigure {\n  margin: 0 0 1rem;\n}\n\nimg {\n  vertical-align: middle;\n}\n\n[role=\"button\"] {\n  cursor: pointer;\n}\n\na,\narea,\nbutton,\n[role=\"button\"],\ninput,\nlabel,\nselect,\nsummary,\ntextarea {\n  -ms-touch-action: manipulation;\n      touch-action: manipulation;\n}\n\ntable {\n  border-collapse: collapse;\n  background-color: transparent;\n}\n\ncaption {\n  padding-top: 0.75rem;\n  padding-bottom: 0.75rem;\n  color: #636c72;\n  text-align: left;\n  caption-side: bottom;\n}\n\nth {\n  text-align: left;\n}\n\nlabel {\n  display: inline-block;\n  margin-bottom: .5rem;\n}\n\nbutton:focus {\n  outline: 1px dotted;\n  outline: 5px auto -webkit-focus-ring-color;\n}\n\ninput,\nbutton,\nselect,\ntextarea {\n  line-height: inherit;\n}\n\ninput[type=\"radio\"]:disabled,\ninput[type=\"checkbox\"]:disabled {\n  cursor: not-allowed;\n}\n\ninput[type=\"date\"],\ninput[type=\"time\"],\ninput[type=\"datetime-local\"],\ninput[type=\"month\"] {\n  -webkit-appearance: listbox;\n}\n\ntextarea {\n  resize: vertical;\n}\n\nfieldset {\n  min-width: 0;\n  padding: 0;\n  margin: 0;\n  border: 0;\n}\n\nlegend {\n  display: block;\n  width: 100%;\n  padding: 0;\n  margin-bottom: .5rem;\n  font-size: 1.5rem;\n  line-height: inherit;\n}\n\ninput[type=\"search\"] {\n  -webkit-appearance: none;\n}\n\noutput {\n  display: inline-block;\n}\n\n[hidden] {\n  display: none !important;\n}\n\nh1, h2, h3, h4, h5, h6,\n.h1, .h2, .h3, .h4, .h5, .h6 {\n  margin-bottom: 0.5rem;\n  font-family: inherit;\n  font-weight: 500;\n  line-height: 1.1;\n  color: inherit;\n}\n\nh1, .h1 {\n  font-size: 2.5rem;\n}\n\nh2, .h2 {\n  font-size: 2rem;\n}\n\nh3, .h3 {\n  font-size: 1.75rem;\n}\n\nh4, .h4 {\n  font-size: 1.5rem;\n}\n\nh5, .h5 {\n  font-size: 1.25rem;\n}\n\nh6, .h6 {\n  font-size: 1rem;\n}\n\n.lead {\n  font-size: 1.25rem;\n  font-weight: 300;\n}\n\n.display-1 {\n  font-size: 6rem;\n  font-weight: 300;\n  line-height: 1.1;\n}\n\n.display-2 {\n  font-size: 5.5rem;\n  font-weight: 300;\n  line-height: 1.1;\n}\n\n.display-3 {\n  font-size: 4.5rem;\n  font-weight: 300;\n  line-height: 1.1;\n}\n\n.display-4 {\n  font-size: 3.5rem;\n  font-weight: 300;\n  line-height: 1.1;\n}\n\nhr {\n  margin-top: 1rem;\n  margin-bottom: 1rem;\n  border: 0;\n  border-top: 1px solid rgba(0, 0, 0, 0.1);\n}\n\nsmall,\n.small {\n  font-size: 80%;\n  font-weight: normal;\n}\n\nmark,\n.mark {\n  padding: 0.2em;\n  background-color: #fcf8e3;\n}\n\n.list-unstyled {\n  padding-left: 0;\n  list-style: none;\n}\n\n.list-inline {\n  padding-left: 0;\n  list-style: none;\n}\n\n.list-inline-item {\n  display: inline-block;\n}\n\n.list-inline-item:not(:last-child) {\n  margin-right: 5px;\n}\n\n.initialism {\n  font-size: 90%;\n  text-transform: uppercase;\n}\n\n.blockquote {\n  padding: 0.5rem 1rem;\n  margin-bottom: 1rem;\n  font-size: 1.25rem;\n  border-left: 0.25rem solid #eceeef;\n}\n\n.blockquote-footer {\n  display: block;\n  font-size: 80%;\n  color: #636c72;\n}\n\n.blockquote-footer::before {\n  content: \"\\2014   \\A0\";\n}\n\n.blockquote-reverse {\n  padding-right: 1rem;\n  padding-left: 0;\n  text-align: right;\n  border-right: 0.25rem solid #eceeef;\n  border-left: 0;\n}\n\n.blockquote-reverse .blockquote-footer::before {\n  content: \"\";\n}\n\n.blockquote-reverse .blockquote-footer::after {\n  content: \"\\A0   \\2014\";\n}\n\n.img-fluid {\n  max-width: 100%;\n  height: auto;\n}\n\n.img-thumbnail {\n  padding: 0.25rem;\n  background-color: #fff;\n  border: 1px solid #ddd;\n  border-radius: 0.25rem;\n  -webkit-transition: all 0.2s ease-in-out;\n  -o-transition: all 0.2s ease-in-out;\n  transition: all 0.2s ease-in-out;\n  max-width: 100%;\n  height: auto;\n}\n\n.figure {\n  display: inline-block;\n}\n\n.figure-img {\n  margin-bottom: 0.5rem;\n  line-height: 1;\n}\n\n.figure-caption {\n  font-size: 90%;\n  color: #636c72;\n}\n\ncode,\nkbd,\npre,\nsamp {\n  font-family: Menlo, Monaco, Consolas, \"Liberation Mono\", \"Courier New\", monospace;\n}\n\ncode {\n  padding: 0.2rem 0.4rem;\n  font-size: 90%;\n  color: #bd4147;\n  background-color: #f7f7f9;\n  border-radius: 0.25rem;\n}\n\na > code {\n  padding: 0;\n  color: inherit;\n  background-color: inherit;\n}\n\nkbd {\n  padding: 0.2rem 0.4rem;\n  font-size: 90%;\n  color: #fff;\n  background-color: #292b2c;\n  border-radius: 0.2rem;\n}\n\nkbd kbd {\n  padding: 0;\n  font-size: 100%;\n  font-weight: bold;\n}\n\npre {\n  display: block;\n  margin-top: 0;\n  margin-bottom: 1rem;\n  font-size: 90%;\n  color: #292b2c;\n}\n\npre code {\n  padding: 0;\n  font-size: inherit;\n  color: inherit;\n  background-color: transparent;\n  border-radius: 0;\n}\n\n.pre-scrollable {\n  max-height: 340px;\n  overflow-y: scroll;\n}\n\n.container {\n  position: relative;\n  margin-left: auto;\n  margin-right: auto;\n  padding-right: 15px;\n  padding-left: 15px;\n}\n\n@media (min-width: 576px) {\n  .container {\n    padding-right: 15px;\n    padding-left: 15px;\n  }\n}\n\n@media (min-width: 768px) {\n  .container {\n    padding-right: 15px;\n    padding-left: 15px;\n  }\n}\n\n@media (min-width: 992px) {\n  .container {\n    padding-right: 15px;\n    padding-left: 15px;\n  }\n}\n\n@media (min-width: 1200px) {\n  .container {\n    padding-right: 15px;\n    padding-left: 15px;\n  }\n}\n\n@media (min-width: 576px) {\n  .container {\n    width: 540px;\n    max-width: 100%;\n  }\n}\n\n@media (min-width: 768px) {\n  .container {\n    width: 720px;\n    max-width: 100%;\n  }\n}\n\n@media (min-width: 992px) {\n  .container {\n    width: 960px;\n    max-width: 100%;\n  }\n}\n\n@media (min-width: 1200px) {\n  .container {\n    width: 1140px;\n    max-width: 100%;\n  }\n}\n\n.container-fluid {\n  position: relative;\n  margin-left: auto;\n  margin-right: auto;\n  padding-right: 15px;\n  padding-left: 15px;\n}\n\n@media (min-width: 576px) {\n  .container-fluid {\n    padding-right: 15px;\n    padding-left: 15px;\n  }\n}\n\n@media (min-width: 768px) {\n  .container-fluid {\n    padding-right: 15px;\n    padding-left: 15px;\n  }\n}\n\n@media (min-width: 992px) {\n  .container-fluid {\n    padding-right: 15px;\n    padding-left: 15px;\n  }\n}\n\n@media (min-width: 1200px) {\n  .container-fluid {\n    padding-right: 15px;\n    padding-left: 15px;\n  }\n}\n\n.row {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-flex-wrap: wrap;\n      -ms-flex-wrap: wrap;\n          flex-wrap: wrap;\n  margin-right: -15px;\n  margin-left: -15px;\n}\n\n@media (min-width: 576px) {\n  .row {\n    margin-right: -15px;\n    margin-left: -15px;\n  }\n}\n\n@media (min-width: 768px) {\n  .row {\n    margin-right: -15px;\n    margin-left: -15px;\n  }\n}\n\n@media (min-width: 992px) {\n  .row {\n    margin-right: -15px;\n    margin-left: -15px;\n  }\n}\n\n@media (min-width: 1200px) {\n  .row {\n    margin-right: -15px;\n    margin-left: -15px;\n  }\n}\n\n.no-gutters {\n  margin-right: 0;\n  margin-left: 0;\n}\n\n.no-gutters > .col,\n.no-gutters > [class*=\"col-\"] {\n  padding-right: 0;\n  padding-left: 0;\n}\n\n.col-1, .col-2, .col-3, .col-4, .col-5, .col-6, .col-7, .col-8, .col-9, .col-10, .col-11, .col-12, .col, .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm, .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12, .col-md, .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg, .col-xl-1, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-10, .col-xl-11, .col-xl-12, .col-xl {\n  position: relative;\n  width: 100%;\n  min-height: 1px;\n  padding-right: 15px;\n  padding-left: 15px;\n}\n\n@media (min-width: 576px) {\n  .col-1, .col-2, .col-3, .col-4, .col-5, .col-6, .col-7, .col-8, .col-9, .col-10, .col-11, .col-12, .col, .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm, .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12, .col-md, .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg, .col-xl-1, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-10, .col-xl-11, .col-xl-12, .col-xl {\n    padding-right: 15px;\n    padding-left: 15px;\n  }\n}\n\n@media (min-width: 768px) {\n  .col-1, .col-2, .col-3, .col-4, .col-5, .col-6, .col-7, .col-8, .col-9, .col-10, .col-11, .col-12, .col, .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm, .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12, .col-md, .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg, .col-xl-1, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-10, .col-xl-11, .col-xl-12, .col-xl {\n    padding-right: 15px;\n    padding-left: 15px;\n  }\n}\n\n@media (min-width: 992px) {\n  .col-1, .col-2, .col-3, .col-4, .col-5, .col-6, .col-7, .col-8, .col-9, .col-10, .col-11, .col-12, .col, .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm, .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12, .col-md, .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg, .col-xl-1, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-10, .col-xl-11, .col-xl-12, .col-xl {\n    padding-right: 15px;\n    padding-left: 15px;\n  }\n}\n\n@media (min-width: 1200px) {\n  .col-1, .col-2, .col-3, .col-4, .col-5, .col-6, .col-7, .col-8, .col-9, .col-10, .col-11, .col-12, .col, .col-sm-1, .col-sm-2, .col-sm-3, .col-sm-4, .col-sm-5, .col-sm-6, .col-sm-7, .col-sm-8, .col-sm-9, .col-sm-10, .col-sm-11, .col-sm-12, .col-sm, .col-md-1, .col-md-2, .col-md-3, .col-md-4, .col-md-5, .col-md-6, .col-md-7, .col-md-8, .col-md-9, .col-md-10, .col-md-11, .col-md-12, .col-md, .col-lg-1, .col-lg-2, .col-lg-3, .col-lg-4, .col-lg-5, .col-lg-6, .col-lg-7, .col-lg-8, .col-lg-9, .col-lg-10, .col-lg-11, .col-lg-12, .col-lg, .col-xl-1, .col-xl-2, .col-xl-3, .col-xl-4, .col-xl-5, .col-xl-6, .col-xl-7, .col-xl-8, .col-xl-9, .col-xl-10, .col-xl-11, .col-xl-12, .col-xl {\n    padding-right: 15px;\n    padding-left: 15px;\n  }\n}\n\n.col {\n  -webkit-flex-basis: 0;\n      -ms-flex-preferred-size: 0;\n          flex-basis: 0;\n  -webkit-box-flex: 1;\n  -webkit-flex-grow: 1;\n      -ms-flex-positive: 1;\n          flex-grow: 1;\n  max-width: 100%;\n}\n\n.col-auto {\n  -webkit-box-flex: 0;\n  -webkit-flex: 0 0 auto;\n      -ms-flex: 0 0 auto;\n          flex: 0 0 auto;\n  width: auto;\n}\n\n.col-1 {\n  -webkit-box-flex: 0;\n  -webkit-flex: 0 0 8.333333%;\n      -ms-flex: 0 0 8.333333%;\n          flex: 0 0 8.333333%;\n  max-width: 8.333333%;\n}\n\n.col-2 {\n  -webkit-box-flex: 0;\n  -webkit-flex: 0 0 16.666667%;\n      -ms-flex: 0 0 16.666667%;\n          flex: 0 0 16.666667%;\n  max-width: 16.666667%;\n}\n\n.col-3 {\n  -webkit-box-flex: 0;\n  -webkit-flex: 0 0 25%;\n      -ms-flex: 0 0 25%;\n          flex: 0 0 25%;\n  max-width: 25%;\n}\n\n.col-4 {\n  -webkit-box-flex: 0;\n  -webkit-flex: 0 0 33.333333%;\n      -ms-flex: 0 0 33.333333%;\n          flex: 0 0 33.333333%;\n  max-width: 33.333333%;\n}\n\n.col-5 {\n  -webkit-box-flex: 0;\n  -webkit-flex: 0 0 41.666667%;\n      -ms-flex: 0 0 41.666667%;\n          flex: 0 0 41.666667%;\n  max-width: 41.666667%;\n}\n\n.col-6 {\n  -webkit-box-flex: 0;\n  -webkit-flex: 0 0 50%;\n      -ms-flex: 0 0 50%;\n          flex: 0 0 50%;\n  max-width: 50%;\n}\n\n.col-7 {\n  -webkit-box-flex: 0;\n  -webkit-flex: 0 0 58.333333%;\n      -ms-flex: 0 0 58.333333%;\n          flex: 0 0 58.333333%;\n  max-width: 58.333333%;\n}\n\n.col-8 {\n  -webkit-box-flex: 0;\n  -webkit-flex: 0 0 66.666667%;\n      -ms-flex: 0 0 66.666667%;\n          flex: 0 0 66.666667%;\n  max-width: 66.666667%;\n}\n\n.col-9 {\n  -webkit-box-flex: 0;\n  -webkit-flex: 0 0 75%;\n      -ms-flex: 0 0 75%;\n          flex: 0 0 75%;\n  max-width: 75%;\n}\n\n.col-10 {\n  -webkit-box-flex: 0;\n  -webkit-flex: 0 0 83.333333%;\n      -ms-flex: 0 0 83.333333%;\n          flex: 0 0 83.333333%;\n  max-width: 83.333333%;\n}\n\n.col-11 {\n  -webkit-box-flex: 0;\n  -webkit-flex: 0 0 91.666667%;\n      -ms-flex: 0 0 91.666667%;\n          flex: 0 0 91.666667%;\n  max-width: 91.666667%;\n}\n\n.col-12 {\n  -webkit-box-flex: 0;\n  -webkit-flex: 0 0 100%;\n      -ms-flex: 0 0 100%;\n          flex: 0 0 100%;\n  max-width: 100%;\n}\n\n.pull-0 {\n  right: auto;\n}\n\n.pull-1 {\n  right: 8.333333%;\n}\n\n.pull-2 {\n  right: 16.666667%;\n}\n\n.pull-3 {\n  right: 25%;\n}\n\n.pull-4 {\n  right: 33.333333%;\n}\n\n.pull-5 {\n  right: 41.666667%;\n}\n\n.pull-6 {\n  right: 50%;\n}\n\n.pull-7 {\n  right: 58.333333%;\n}\n\n.pull-8 {\n  right: 66.666667%;\n}\n\n.pull-9 {\n  right: 75%;\n}\n\n.pull-10 {\n  right: 83.333333%;\n}\n\n.pull-11 {\n  right: 91.666667%;\n}\n\n.pull-12 {\n  right: 100%;\n}\n\n.push-0 {\n  left: auto;\n}\n\n.push-1 {\n  left: 8.333333%;\n}\n\n.push-2 {\n  left: 16.666667%;\n}\n\n.push-3 {\n  left: 25%;\n}\n\n.push-4 {\n  left: 33.333333%;\n}\n\n.push-5 {\n  left: 41.666667%;\n}\n\n.push-6 {\n  left: 50%;\n}\n\n.push-7 {\n  left: 58.333333%;\n}\n\n.push-8 {\n  left: 66.666667%;\n}\n\n.push-9 {\n  left: 75%;\n}\n\n.push-10 {\n  left: 83.333333%;\n}\n\n.push-11 {\n  left: 91.666667%;\n}\n\n.push-12 {\n  left: 100%;\n}\n\n.offset-1 {\n  margin-left: 8.333333%;\n}\n\n.offset-2 {\n  margin-left: 16.666667%;\n}\n\n.offset-3 {\n  margin-left: 25%;\n}\n\n.offset-4 {\n  margin-left: 33.333333%;\n}\n\n.offset-5 {\n  margin-left: 41.666667%;\n}\n\n.offset-6 {\n  margin-left: 50%;\n}\n\n.offset-7 {\n  margin-left: 58.333333%;\n}\n\n.offset-8 {\n  margin-left: 66.666667%;\n}\n\n.offset-9 {\n  margin-left: 75%;\n}\n\n.offset-10 {\n  margin-left: 83.333333%;\n}\n\n.offset-11 {\n  margin-left: 91.666667%;\n}\n\n@media (min-width: 576px) {\n  .col-sm {\n    -webkit-flex-basis: 0;\n        -ms-flex-preferred-size: 0;\n            flex-basis: 0;\n    -webkit-box-flex: 1;\n    -webkit-flex-grow: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n    max-width: 100%;\n  }\n  .col-sm-auto {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 auto;\n        -ms-flex: 0 0 auto;\n            flex: 0 0 auto;\n    width: auto;\n  }\n  .col-sm-1 {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 8.333333%;\n        -ms-flex: 0 0 8.333333%;\n            flex: 0 0 8.333333%;\n    max-width: 8.333333%;\n  }\n  .col-sm-2 {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 16.666667%;\n        -ms-flex: 0 0 16.666667%;\n            flex: 0 0 16.666667%;\n    max-width: 16.666667%;\n  }\n  .col-sm-3 {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 25%;\n        -ms-flex: 0 0 25%;\n            flex: 0 0 25%;\n    max-width: 25%;\n  }\n  .col-sm-4 {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 33.333333%;\n        -ms-flex: 0 0 33.333333%;\n            flex: 0 0 33.333333%;\n    max-width: 33.333333%;\n  }\n  .col-sm-5 {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 41.666667%;\n        -ms-flex: 0 0 41.666667%;\n            flex: 0 0 41.666667%;\n    max-width: 41.666667%;\n  }\n  .col-sm-6 {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 50%;\n        -ms-flex: 0 0 50%;\n            flex: 0 0 50%;\n    max-width: 50%;\n  }\n  .col-sm-7 {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 58.333333%;\n        -ms-flex: 0 0 58.333333%;\n            flex: 0 0 58.333333%;\n    max-width: 58.333333%;\n  }\n  .col-sm-8 {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 66.666667%;\n        -ms-flex: 0 0 66.666667%;\n            flex: 0 0 66.666667%;\n    max-width: 66.666667%;\n  }\n  .col-sm-9 {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 75%;\n        -ms-flex: 0 0 75%;\n            flex: 0 0 75%;\n    max-width: 75%;\n  }\n  .col-sm-10 {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 83.333333%;\n        -ms-flex: 0 0 83.333333%;\n            flex: 0 0 83.333333%;\n    max-width: 83.333333%;\n  }\n  .col-sm-11 {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 91.666667%;\n        -ms-flex: 0 0 91.666667%;\n            flex: 0 0 91.666667%;\n    max-width: 91.666667%;\n  }\n  .col-sm-12 {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 100%;\n        -ms-flex: 0 0 100%;\n            flex: 0 0 100%;\n    max-width: 100%;\n  }\n  .pull-sm-0 {\n    right: auto;\n  }\n  .pull-sm-1 {\n    right: 8.333333%;\n  }\n  .pull-sm-2 {\n    right: 16.666667%;\n  }\n  .pull-sm-3 {\n    right: 25%;\n  }\n  .pull-sm-4 {\n    right: 33.333333%;\n  }\n  .pull-sm-5 {\n    right: 41.666667%;\n  }\n  .pull-sm-6 {\n    right: 50%;\n  }\n  .pull-sm-7 {\n    right: 58.333333%;\n  }\n  .pull-sm-8 {\n    right: 66.666667%;\n  }\n  .pull-sm-9 {\n    right: 75%;\n  }\n  .pull-sm-10 {\n    right: 83.333333%;\n  }\n  .pull-sm-11 {\n    right: 91.666667%;\n  }\n  .pull-sm-12 {\n    right: 100%;\n  }\n  .push-sm-0 {\n    left: auto;\n  }\n  .push-sm-1 {\n    left: 8.333333%;\n  }\n  .push-sm-2 {\n    left: 16.666667%;\n  }\n  .push-sm-3 {\n    left: 25%;\n  }\n  .push-sm-4 {\n    left: 33.333333%;\n  }\n  .push-sm-5 {\n    left: 41.666667%;\n  }\n  .push-sm-6 {\n    left: 50%;\n  }\n  .push-sm-7 {\n    left: 58.333333%;\n  }\n  .push-sm-8 {\n    left: 66.666667%;\n  }\n  .push-sm-9 {\n    left: 75%;\n  }\n  .push-sm-10 {\n    left: 83.333333%;\n  }\n  .push-sm-11 {\n    left: 91.666667%;\n  }\n  .push-sm-12 {\n    left: 100%;\n  }\n  .offset-sm-0 {\n    margin-left: 0%;\n  }\n  .offset-sm-1 {\n    margin-left: 8.333333%;\n  }\n  .offset-sm-2 {\n    margin-left: 16.666667%;\n  }\n  .offset-sm-3 {\n    margin-left: 25%;\n  }\n  .offset-sm-4 {\n    margin-left: 33.333333%;\n  }\n  .offset-sm-5 {\n    margin-left: 41.666667%;\n  }\n  .offset-sm-6 {\n    margin-left: 50%;\n  }\n  .offset-sm-7 {\n    margin-left: 58.333333%;\n  }\n  .offset-sm-8 {\n    margin-left: 66.666667%;\n  }\n  .offset-sm-9 {\n    margin-left: 75%;\n  }\n  .offset-sm-10 {\n    margin-left: 83.333333%;\n  }\n  .offset-sm-11 {\n    margin-left: 91.666667%;\n  }\n}\n\n@media (min-width: 768px) {\n  .col-md {\n    -webkit-flex-basis: 0;\n        -ms-flex-preferred-size: 0;\n            flex-basis: 0;\n    -webkit-box-flex: 1;\n    -webkit-flex-grow: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n    max-width: 100%;\n  }\n  .col-md-auto {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 auto;\n        -ms-flex: 0 0 auto;\n            flex: 0 0 auto;\n    width: auto;\n  }\n  .col-md-1 {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 8.333333%;\n        -ms-flex: 0 0 8.333333%;\n            flex: 0 0 8.333333%;\n    max-width: 8.333333%;\n  }\n  .col-md-2 {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 16.666667%;\n        -ms-flex: 0 0 16.666667%;\n            flex: 0 0 16.666667%;\n    max-width: 16.666667%;\n  }\n  .col-md-3 {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 25%;\n        -ms-flex: 0 0 25%;\n            flex: 0 0 25%;\n    max-width: 25%;\n  }\n  .col-md-4 {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 33.333333%;\n        -ms-flex: 0 0 33.333333%;\n            flex: 0 0 33.333333%;\n    max-width: 33.333333%;\n  }\n  .col-md-5 {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 41.666667%;\n        -ms-flex: 0 0 41.666667%;\n            flex: 0 0 41.666667%;\n    max-width: 41.666667%;\n  }\n  .col-md-6 {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 50%;\n        -ms-flex: 0 0 50%;\n            flex: 0 0 50%;\n    max-width: 50%;\n  }\n  .col-md-7 {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 58.333333%;\n        -ms-flex: 0 0 58.333333%;\n            flex: 0 0 58.333333%;\n    max-width: 58.333333%;\n  }\n  .col-md-8 {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 66.666667%;\n        -ms-flex: 0 0 66.666667%;\n            flex: 0 0 66.666667%;\n    max-width: 66.666667%;\n  }\n  .col-md-9 {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 75%;\n        -ms-flex: 0 0 75%;\n            flex: 0 0 75%;\n    max-width: 75%;\n  }\n  .col-md-10 {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 83.333333%;\n        -ms-flex: 0 0 83.333333%;\n            flex: 0 0 83.333333%;\n    max-width: 83.333333%;\n  }\n  .col-md-11 {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 91.666667%;\n        -ms-flex: 0 0 91.666667%;\n            flex: 0 0 91.666667%;\n    max-width: 91.666667%;\n  }\n  .col-md-12 {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 100%;\n        -ms-flex: 0 0 100%;\n            flex: 0 0 100%;\n    max-width: 100%;\n  }\n  .pull-md-0 {\n    right: auto;\n  }\n  .pull-md-1 {\n    right: 8.333333%;\n  }\n  .pull-md-2 {\n    right: 16.666667%;\n  }\n  .pull-md-3 {\n    right: 25%;\n  }\n  .pull-md-4 {\n    right: 33.333333%;\n  }\n  .pull-md-5 {\n    right: 41.666667%;\n  }\n  .pull-md-6 {\n    right: 50%;\n  }\n  .pull-md-7 {\n    right: 58.333333%;\n  }\n  .pull-md-8 {\n    right: 66.666667%;\n  }\n  .pull-md-9 {\n    right: 75%;\n  }\n  .pull-md-10 {\n    right: 83.333333%;\n  }\n  .pull-md-11 {\n    right: 91.666667%;\n  }\n  .pull-md-12 {\n    right: 100%;\n  }\n  .push-md-0 {\n    left: auto;\n  }\n  .push-md-1 {\n    left: 8.333333%;\n  }\n  .push-md-2 {\n    left: 16.666667%;\n  }\n  .push-md-3 {\n    left: 25%;\n  }\n  .push-md-4 {\n    left: 33.333333%;\n  }\n  .push-md-5 {\n    left: 41.666667%;\n  }\n  .push-md-6 {\n    left: 50%;\n  }\n  .push-md-7 {\n    left: 58.333333%;\n  }\n  .push-md-8 {\n    left: 66.666667%;\n  }\n  .push-md-9 {\n    left: 75%;\n  }\n  .push-md-10 {\n    left: 83.333333%;\n  }\n  .push-md-11 {\n    left: 91.666667%;\n  }\n  .push-md-12 {\n    left: 100%;\n  }\n  .offset-md-0 {\n    margin-left: 0%;\n  }\n  .offset-md-1 {\n    margin-left: 8.333333%;\n  }\n  .offset-md-2 {\n    margin-left: 16.666667%;\n  }\n  .offset-md-3 {\n    margin-left: 25%;\n  }\n  .offset-md-4 {\n    margin-left: 33.333333%;\n  }\n  .offset-md-5 {\n    margin-left: 41.666667%;\n  }\n  .offset-md-6 {\n    margin-left: 50%;\n  }\n  .offset-md-7 {\n    margin-left: 58.333333%;\n  }\n  .offset-md-8 {\n    margin-left: 66.666667%;\n  }\n  .offset-md-9 {\n    margin-left: 75%;\n  }\n  .offset-md-10 {\n    margin-left: 83.333333%;\n  }\n  .offset-md-11 {\n    margin-left: 91.666667%;\n  }\n}\n\n@media (min-width: 992px) {\n  .col-lg {\n    -webkit-flex-basis: 0;\n        -ms-flex-preferred-size: 0;\n            flex-basis: 0;\n    -webkit-box-flex: 1;\n    -webkit-flex-grow: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n    max-width: 100%;\n  }\n  .col-lg-auto {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 auto;\n        -ms-flex: 0 0 auto;\n            flex: 0 0 auto;\n    width: auto;\n  }\n  .col-lg-1 {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 8.333333%;\n        -ms-flex: 0 0 8.333333%;\n            flex: 0 0 8.333333%;\n    max-width: 8.333333%;\n  }\n  .col-lg-2 {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 16.666667%;\n        -ms-flex: 0 0 16.666667%;\n            flex: 0 0 16.666667%;\n    max-width: 16.666667%;\n  }\n  .col-lg-3 {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 25%;\n        -ms-flex: 0 0 25%;\n            flex: 0 0 25%;\n    max-width: 25%;\n  }\n  .col-lg-4 {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 33.333333%;\n        -ms-flex: 0 0 33.333333%;\n            flex: 0 0 33.333333%;\n    max-width: 33.333333%;\n  }\n  .col-lg-5 {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 41.666667%;\n        -ms-flex: 0 0 41.666667%;\n            flex: 0 0 41.666667%;\n    max-width: 41.666667%;\n  }\n  .col-lg-6 {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 50%;\n        -ms-flex: 0 0 50%;\n            flex: 0 0 50%;\n    max-width: 50%;\n  }\n  .col-lg-7 {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 58.333333%;\n        -ms-flex: 0 0 58.333333%;\n            flex: 0 0 58.333333%;\n    max-width: 58.333333%;\n  }\n  .col-lg-8 {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 66.666667%;\n        -ms-flex: 0 0 66.666667%;\n            flex: 0 0 66.666667%;\n    max-width: 66.666667%;\n  }\n  .col-lg-9 {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 75%;\n        -ms-flex: 0 0 75%;\n            flex: 0 0 75%;\n    max-width: 75%;\n  }\n  .col-lg-10 {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 83.333333%;\n        -ms-flex: 0 0 83.333333%;\n            flex: 0 0 83.333333%;\n    max-width: 83.333333%;\n  }\n  .col-lg-11 {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 91.666667%;\n        -ms-flex: 0 0 91.666667%;\n            flex: 0 0 91.666667%;\n    max-width: 91.666667%;\n  }\n  .col-lg-12 {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 100%;\n        -ms-flex: 0 0 100%;\n            flex: 0 0 100%;\n    max-width: 100%;\n  }\n  .pull-lg-0 {\n    right: auto;\n  }\n  .pull-lg-1 {\n    right: 8.333333%;\n  }\n  .pull-lg-2 {\n    right: 16.666667%;\n  }\n  .pull-lg-3 {\n    right: 25%;\n  }\n  .pull-lg-4 {\n    right: 33.333333%;\n  }\n  .pull-lg-5 {\n    right: 41.666667%;\n  }\n  .pull-lg-6 {\n    right: 50%;\n  }\n  .pull-lg-7 {\n    right: 58.333333%;\n  }\n  .pull-lg-8 {\n    right: 66.666667%;\n  }\n  .pull-lg-9 {\n    right: 75%;\n  }\n  .pull-lg-10 {\n    right: 83.333333%;\n  }\n  .pull-lg-11 {\n    right: 91.666667%;\n  }\n  .pull-lg-12 {\n    right: 100%;\n  }\n  .push-lg-0 {\n    left: auto;\n  }\n  .push-lg-1 {\n    left: 8.333333%;\n  }\n  .push-lg-2 {\n    left: 16.666667%;\n  }\n  .push-lg-3 {\n    left: 25%;\n  }\n  .push-lg-4 {\n    left: 33.333333%;\n  }\n  .push-lg-5 {\n    left: 41.666667%;\n  }\n  .push-lg-6 {\n    left: 50%;\n  }\n  .push-lg-7 {\n    left: 58.333333%;\n  }\n  .push-lg-8 {\n    left: 66.666667%;\n  }\n  .push-lg-9 {\n    left: 75%;\n  }\n  .push-lg-10 {\n    left: 83.333333%;\n  }\n  .push-lg-11 {\n    left: 91.666667%;\n  }\n  .push-lg-12 {\n    left: 100%;\n  }\n  .offset-lg-0 {\n    margin-left: 0%;\n  }\n  .offset-lg-1 {\n    margin-left: 8.333333%;\n  }\n  .offset-lg-2 {\n    margin-left: 16.666667%;\n  }\n  .offset-lg-3 {\n    margin-left: 25%;\n  }\n  .offset-lg-4 {\n    margin-left: 33.333333%;\n  }\n  .offset-lg-5 {\n    margin-left: 41.666667%;\n  }\n  .offset-lg-6 {\n    margin-left: 50%;\n  }\n  .offset-lg-7 {\n    margin-left: 58.333333%;\n  }\n  .offset-lg-8 {\n    margin-left: 66.666667%;\n  }\n  .offset-lg-9 {\n    margin-left: 75%;\n  }\n  .offset-lg-10 {\n    margin-left: 83.333333%;\n  }\n  .offset-lg-11 {\n    margin-left: 91.666667%;\n  }\n}\n\n@media (min-width: 1200px) {\n  .col-xl {\n    -webkit-flex-basis: 0;\n        -ms-flex-preferred-size: 0;\n            flex-basis: 0;\n    -webkit-box-flex: 1;\n    -webkit-flex-grow: 1;\n        -ms-flex-positive: 1;\n            flex-grow: 1;\n    max-width: 100%;\n  }\n  .col-xl-auto {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 auto;\n        -ms-flex: 0 0 auto;\n            flex: 0 0 auto;\n    width: auto;\n  }\n  .col-xl-1 {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 8.333333%;\n        -ms-flex: 0 0 8.333333%;\n            flex: 0 0 8.333333%;\n    max-width: 8.333333%;\n  }\n  .col-xl-2 {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 16.666667%;\n        -ms-flex: 0 0 16.666667%;\n            flex: 0 0 16.666667%;\n    max-width: 16.666667%;\n  }\n  .col-xl-3 {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 25%;\n        -ms-flex: 0 0 25%;\n            flex: 0 0 25%;\n    max-width: 25%;\n  }\n  .col-xl-4 {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 33.333333%;\n        -ms-flex: 0 0 33.333333%;\n            flex: 0 0 33.333333%;\n    max-width: 33.333333%;\n  }\n  .col-xl-5 {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 41.666667%;\n        -ms-flex: 0 0 41.666667%;\n            flex: 0 0 41.666667%;\n    max-width: 41.666667%;\n  }\n  .col-xl-6 {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 50%;\n        -ms-flex: 0 0 50%;\n            flex: 0 0 50%;\n    max-width: 50%;\n  }\n  .col-xl-7 {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 58.333333%;\n        -ms-flex: 0 0 58.333333%;\n            flex: 0 0 58.333333%;\n    max-width: 58.333333%;\n  }\n  .col-xl-8 {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 66.666667%;\n        -ms-flex: 0 0 66.666667%;\n            flex: 0 0 66.666667%;\n    max-width: 66.666667%;\n  }\n  .col-xl-9 {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 75%;\n        -ms-flex: 0 0 75%;\n            flex: 0 0 75%;\n    max-width: 75%;\n  }\n  .col-xl-10 {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 83.333333%;\n        -ms-flex: 0 0 83.333333%;\n            flex: 0 0 83.333333%;\n    max-width: 83.333333%;\n  }\n  .col-xl-11 {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 91.666667%;\n        -ms-flex: 0 0 91.666667%;\n            flex: 0 0 91.666667%;\n    max-width: 91.666667%;\n  }\n  .col-xl-12 {\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 100%;\n        -ms-flex: 0 0 100%;\n            flex: 0 0 100%;\n    max-width: 100%;\n  }\n  .pull-xl-0 {\n    right: auto;\n  }\n  .pull-xl-1 {\n    right: 8.333333%;\n  }\n  .pull-xl-2 {\n    right: 16.666667%;\n  }\n  .pull-xl-3 {\n    right: 25%;\n  }\n  .pull-xl-4 {\n    right: 33.333333%;\n  }\n  .pull-xl-5 {\n    right: 41.666667%;\n  }\n  .pull-xl-6 {\n    right: 50%;\n  }\n  .pull-xl-7 {\n    right: 58.333333%;\n  }\n  .pull-xl-8 {\n    right: 66.666667%;\n  }\n  .pull-xl-9 {\n    right: 75%;\n  }\n  .pull-xl-10 {\n    right: 83.333333%;\n  }\n  .pull-xl-11 {\n    right: 91.666667%;\n  }\n  .pull-xl-12 {\n    right: 100%;\n  }\n  .push-xl-0 {\n    left: auto;\n  }\n  .push-xl-1 {\n    left: 8.333333%;\n  }\n  .push-xl-2 {\n    left: 16.666667%;\n  }\n  .push-xl-3 {\n    left: 25%;\n  }\n  .push-xl-4 {\n    left: 33.333333%;\n  }\n  .push-xl-5 {\n    left: 41.666667%;\n  }\n  .push-xl-6 {\n    left: 50%;\n  }\n  .push-xl-7 {\n    left: 58.333333%;\n  }\n  .push-xl-8 {\n    left: 66.666667%;\n  }\n  .push-xl-9 {\n    left: 75%;\n  }\n  .push-xl-10 {\n    left: 83.333333%;\n  }\n  .push-xl-11 {\n    left: 91.666667%;\n  }\n  .push-xl-12 {\n    left: 100%;\n  }\n  .offset-xl-0 {\n    margin-left: 0%;\n  }\n  .offset-xl-1 {\n    margin-left: 8.333333%;\n  }\n  .offset-xl-2 {\n    margin-left: 16.666667%;\n  }\n  .offset-xl-3 {\n    margin-left: 25%;\n  }\n  .offset-xl-4 {\n    margin-left: 33.333333%;\n  }\n  .offset-xl-5 {\n    margin-left: 41.666667%;\n  }\n  .offset-xl-6 {\n    margin-left: 50%;\n  }\n  .offset-xl-7 {\n    margin-left: 58.333333%;\n  }\n  .offset-xl-8 {\n    margin-left: 66.666667%;\n  }\n  .offset-xl-9 {\n    margin-left: 75%;\n  }\n  .offset-xl-10 {\n    margin-left: 83.333333%;\n  }\n  .offset-xl-11 {\n    margin-left: 91.666667%;\n  }\n}\n\n.table {\n  width: 100%;\n  max-width: 100%;\n  margin-bottom: 1rem;\n}\n\n.table th,\n.table td {\n  padding: 0.75rem;\n  vertical-align: top;\n  border-top: 1px solid #eceeef;\n}\n\n.table thead th {\n  vertical-align: bottom;\n  border-bottom: 2px solid #eceeef;\n}\n\n.table tbody + tbody {\n  border-top: 2px solid #eceeef;\n}\n\n.table .table {\n  background-color: #fff;\n}\n\n.table-sm th,\n.table-sm td {\n  padding: 0.3rem;\n}\n\n.table-bordered {\n  border: 1px solid #eceeef;\n}\n\n.table-bordered th,\n.table-bordered td {\n  border: 1px solid #eceeef;\n}\n\n.table-bordered thead th,\n.table-bordered thead td {\n  border-bottom-width: 2px;\n}\n\n.table-striped tbody tr:nth-of-type(odd) {\n  background-color: rgba(0, 0, 0, 0.05);\n}\n\n.table-hover tbody tr:hover {\n  background-color: rgba(0, 0, 0, 0.075);\n}\n\n.table-active,\n.table-active > th,\n.table-active > td {\n  background-color: rgba(0, 0, 0, 0.075);\n}\n\n.table-hover .table-active:hover {\n  background-color: rgba(0, 0, 0, 0.075);\n}\n\n.table-hover .table-active:hover > td,\n.table-hover .table-active:hover > th {\n  background-color: rgba(0, 0, 0, 0.075);\n}\n\n.table-success,\n.table-success > th,\n.table-success > td {\n  background-color: #dff0d8;\n}\n\n.table-hover .table-success:hover {\n  background-color: #d0e9c6;\n}\n\n.table-hover .table-success:hover > td,\n.table-hover .table-success:hover > th {\n  background-color: #d0e9c6;\n}\n\n.table-info,\n.table-info > th,\n.table-info > td {\n  background-color: #d9edf7;\n}\n\n.table-hover .table-info:hover {\n  background-color: #c4e3f3;\n}\n\n.table-hover .table-info:hover > td,\n.table-hover .table-info:hover > th {\n  background-color: #c4e3f3;\n}\n\n.table-warning,\n.table-warning > th,\n.table-warning > td {\n  background-color: #fcf8e3;\n}\n\n.table-hover .table-warning:hover {\n  background-color: #faf2cc;\n}\n\n.table-hover .table-warning:hover > td,\n.table-hover .table-warning:hover > th {\n  background-color: #faf2cc;\n}\n\n.table-danger,\n.table-danger > th,\n.table-danger > td {\n  background-color: #f2dede;\n}\n\n.table-hover .table-danger:hover {\n  background-color: #ebcccc;\n}\n\n.table-hover .table-danger:hover > td,\n.table-hover .table-danger:hover > th {\n  background-color: #ebcccc;\n}\n\n.thead-inverse th {\n  color: #fff;\n  background-color: #292b2c;\n}\n\n.thead-default th {\n  color: #464a4c;\n  background-color: #eceeef;\n}\n\n.table-inverse {\n  color: #fff;\n  background-color: #292b2c;\n}\n\n.table-inverse th,\n.table-inverse td,\n.table-inverse thead th {\n  border-color: #fff;\n}\n\n.table-inverse.table-bordered {\n  border: 0;\n}\n\n.table-responsive {\n  display: block;\n  width: 100%;\n  overflow-x: auto;\n  -ms-overflow-style: -ms-autohiding-scrollbar;\n}\n\n.table-responsive.table-bordered {\n  border: 0;\n}\n\n.form-control {\n  display: block;\n  width: 100%;\n  padding: 0.5rem 0.75rem;\n  font-size: 1rem;\n  line-height: 1.25;\n  color: #464a4c;\n  background-color: #fff;\n  background-image: none;\n  -webkit-background-clip: padding-box;\n          background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 0.25rem;\n  -webkit-transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\n  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\n}\n\n.form-control::-ms-expand {\n  background-color: transparent;\n  border: 0;\n}\n\n.form-control:focus {\n  color: #464a4c;\n  background-color: #fff;\n  border-color: #5cb3fd;\n  outline: none;\n}\n\n.form-control::-webkit-input-placeholder {\n  color: #636c72;\n  opacity: 1;\n}\n\n.form-control::-moz-placeholder {\n  color: #636c72;\n  opacity: 1;\n}\n\n.form-control:-ms-input-placeholder {\n  color: #636c72;\n  opacity: 1;\n}\n\n.form-control::placeholder {\n  color: #636c72;\n  opacity: 1;\n}\n\n.form-control:disabled, .form-control[readonly] {\n  background-color: #eceeef;\n  opacity: 1;\n}\n\n.form-control:disabled {\n  cursor: not-allowed;\n}\n\nselect.form-control:not([size]):not([multiple]) {\n  height: calc(2.25rem + 2px);\n}\n\nselect.form-control:focus::-ms-value {\n  color: #464a4c;\n  background-color: #fff;\n}\n\n.form-control-file,\n.form-control-range {\n  display: block;\n}\n\n.col-form-label {\n  padding-top: calc(0.5rem - 1px * 2);\n  padding-bottom: calc(0.5rem - 1px * 2);\n  margin-bottom: 0;\n}\n\n.col-form-label-lg {\n  padding-top: calc(0.75rem - 1px * 2);\n  padding-bottom: calc(0.75rem - 1px * 2);\n  font-size: 1.25rem;\n}\n\n.col-form-label-sm {\n  padding-top: calc(0.25rem - 1px * 2);\n  padding-bottom: calc(0.25rem - 1px * 2);\n  font-size: 0.875rem;\n}\n\n.col-form-legend {\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n  margin-bottom: 0;\n  font-size: 1rem;\n}\n\n.form-control-static {\n  padding-top: 0.5rem;\n  padding-bottom: 0.5rem;\n  margin-bottom: 0;\n  line-height: 1.25;\n  border: solid transparent;\n  border-width: 1px 0;\n}\n\n.form-control-static.form-control-sm, .input-group-sm > .form-control-static.form-control,\n.input-group-sm > .form-control-static.input-group-addon,\n.input-group-sm > .input-group-btn > .form-control-static.btn, .form-control-static.form-control-lg, .input-group-lg > .form-control-static.form-control,\n.input-group-lg > .form-control-static.input-group-addon,\n.input-group-lg > .input-group-btn > .form-control-static.btn {\n  padding-right: 0;\n  padding-left: 0;\n}\n\n.form-control-sm, .input-group-sm > .form-control,\n.input-group-sm > .input-group-addon,\n.input-group-sm > .input-group-btn > .btn {\n  padding: 0.25rem 0.5rem;\n  font-size: 0.875rem;\n  border-radius: 0.2rem;\n}\n\nselect.form-control-sm:not([size]):not([multiple]), .input-group-sm > select.form-control:not([size]):not([multiple]),\n.input-group-sm > select.input-group-addon:not([size]):not([multiple]),\n.input-group-sm > .input-group-btn > select.btn:not([size]):not([multiple]) {\n  height: 1.8125rem;\n}\n\n.form-control-lg, .input-group-lg > .form-control,\n.input-group-lg > .input-group-addon,\n.input-group-lg > .input-group-btn > .btn {\n  padding: 0.75rem 1.5rem;\n  font-size: 1.25rem;\n  border-radius: 0.3rem;\n}\n\nselect.form-control-lg:not([size]):not([multiple]), .input-group-lg > select.form-control:not([size]):not([multiple]),\n.input-group-lg > select.input-group-addon:not([size]):not([multiple]),\n.input-group-lg > .input-group-btn > select.btn:not([size]):not([multiple]) {\n  height: 3.166667rem;\n}\n\n.form-group {\n  margin-bottom: 1rem;\n}\n\n.form-text {\n  display: block;\n  margin-top: 0.25rem;\n}\n\n.form-check {\n  position: relative;\n  display: block;\n  margin-bottom: 0.5rem;\n}\n\n.form-check.disabled .form-check-label {\n  color: #636c72;\n  cursor: not-allowed;\n}\n\n.form-check-label {\n  padding-left: 1.25rem;\n  margin-bottom: 0;\n  cursor: pointer;\n}\n\n.form-check-input {\n  position: absolute;\n  margin-top: 0.25rem;\n  margin-left: -1.25rem;\n}\n\n.form-check-input:only-child {\n  position: static;\n}\n\n.form-check-inline {\n  display: inline-block;\n}\n\n.form-check-inline .form-check-label {\n  vertical-align: middle;\n}\n\n.form-check-inline + .form-check-inline {\n  margin-left: 0.75rem;\n}\n\n.form-control-feedback {\n  margin-top: 0.25rem;\n}\n\n.form-control-success,\n.form-control-warning,\n.form-control-danger {\n  padding-right: 2.25rem;\n  background-repeat: no-repeat;\n  background-position: center right 0.5625rem;\n  -webkit-background-size: 1.125rem 1.125rem;\n          background-size: 1.125rem 1.125rem;\n}\n\n.has-success .form-control-feedback,\n.has-success .form-control-label,\n.has-success .col-form-label,\n.has-success .form-check-label,\n.has-success .custom-control {\n  color: #5cb85c;\n}\n\n.has-success .form-control {\n  border-color: #5cb85c;\n}\n\n.has-success .input-group-addon {\n  color: #5cb85c;\n  border-color: #5cb85c;\n  background-color: #eaf6ea;\n}\n\n.has-success .form-control-success {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Cpath fill='%235cb85c' d='M2.3 6.73L.6 4.53c-.4-1.04.46-1.4 1.1-.8l1.1 1.4 3.4-3.8c.6-.63 1.6-.27 1.2.7l-4 4.6c-.43.5-.8.4-1.1.1z'/%3E%3C/svg%3E\");\n}\n\n.has-warning .form-control-feedback,\n.has-warning .form-control-label,\n.has-warning .col-form-label,\n.has-warning .form-check-label,\n.has-warning .custom-control {\n  color: #f0ad4e;\n}\n\n.has-warning .form-control {\n  border-color: #f0ad4e;\n}\n\n.has-warning .input-group-addon {\n  color: #f0ad4e;\n  border-color: #f0ad4e;\n  background-color: white;\n}\n\n.has-warning .form-control-warning {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Cpath fill='%23f0ad4e' d='M4.4 5.324h-.8v-2.46h.8zm0 1.42h-.8V5.89h.8zM3.76.63L.04 7.075c-.115.2.016.425.26.426h7.397c.242 0 .372-.226.258-.426C6.726 4.924 5.47 2.79 4.253.63c-.113-.174-.39-.174-.494 0z'/%3E%3C/svg%3E\");\n}\n\n.has-danger .form-control-feedback,\n.has-danger .form-control-label,\n.has-danger .col-form-label,\n.has-danger .form-check-label,\n.has-danger .custom-control {\n  color: #d9534f;\n}\n\n.has-danger .form-control {\n  border-color: #d9534f;\n}\n\n.has-danger .input-group-addon {\n  color: #d9534f;\n  border-color: #d9534f;\n  background-color: #fdf7f7;\n}\n\n.has-danger .form-control-danger {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23d9534f' viewBox='-2 -2 7 7'%3E%3Cpath stroke='%23d9534f' d='M0 0l3 3m0-3L0 3'/%3E%3Ccircle r='.5'/%3E%3Ccircle cx='3' r='.5'/%3E%3Ccircle cy='3' r='.5'/%3E%3Ccircle cx='3' cy='3' r='.5'/%3E%3C/svg%3E\");\n}\n\n.form-inline {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-flex-flow: row wrap;\n      -ms-flex-flow: row wrap;\n          flex-flow: row wrap;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n\n.form-inline .form-check {\n  width: 100%;\n}\n\n@media (min-width: 576px) {\n  .form-inline label {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    margin-bottom: 0;\n  }\n  .form-inline .form-group {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-flex: 0;\n    -webkit-flex: 0 0 auto;\n        -ms-flex: 0 0 auto;\n            flex: 0 0 auto;\n    -webkit-flex-flow: row wrap;\n        -ms-flex-flow: row wrap;\n            flex-flow: row wrap;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    margin-bottom: 0;\n  }\n  .form-inline .form-control {\n    display: inline-block;\n    width: auto;\n    vertical-align: middle;\n  }\n  .form-inline .form-control-static {\n    display: inline-block;\n  }\n  .form-inline .input-group {\n    width: auto;\n  }\n  .form-inline .form-control-label {\n    margin-bottom: 0;\n    vertical-align: middle;\n  }\n  .form-inline .form-check {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    width: auto;\n    margin-top: 0;\n    margin-bottom: 0;\n  }\n  .form-inline .form-check-label {\n    padding-left: 0;\n  }\n  .form-inline .form-check-input {\n    position: relative;\n    margin-top: 0;\n    margin-right: 0.25rem;\n    margin-left: 0;\n  }\n  .form-inline .custom-control {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n    -webkit-box-pack: center;\n    -webkit-justify-content: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    padding-left: 0;\n  }\n  .form-inline .custom-control-indicator {\n    position: static;\n    display: inline-block;\n    margin-right: 0.25rem;\n    vertical-align: text-bottom;\n  }\n  .form-inline .has-feedback .form-control-feedback {\n    top: 0;\n  }\n}\n\n.btn {\n  display: inline-block;\n  font-weight: normal;\n  line-height: 1.25;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: middle;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  border: 1px solid transparent;\n  padding: 0.5rem 1rem;\n  font-size: 1rem;\n  border-radius: 0.25rem;\n  -webkit-transition: all 0.2s ease-in-out;\n  -o-transition: all 0.2s ease-in-out;\n  transition: all 0.2s ease-in-out;\n}\n\n.btn:focus, .btn:hover {\n  text-decoration: none;\n}\n\n.btn:focus, .btn.focus {\n  outline: 0;\n  -webkit-box-shadow: 0 0 0 2px rgba(2, 117, 216, 0.25);\n          box-shadow: 0 0 0 2px rgba(2, 117, 216, 0.25);\n}\n\n.btn.disabled, .btn:disabled {\n  cursor: not-allowed;\n  opacity: .65;\n}\n\n.btn:active, .btn.active {\n  background-image: none;\n}\n\na.btn.disabled,\nfieldset[disabled] a.btn {\n  pointer-events: none;\n}\n\n.btn-primary {\n  color: #fff;\n  background-color: #0275d8;\n  border-color: #0275d8;\n}\n\n.btn-primary:hover {\n  color: #fff;\n  background-color: #025aa5;\n  border-color: #01549b;\n}\n\n.btn-primary:focus, .btn-primary.focus {\n  -webkit-box-shadow: 0 0 0 2px rgba(2, 117, 216, 0.5);\n          box-shadow: 0 0 0 2px rgba(2, 117, 216, 0.5);\n}\n\n.btn-primary.disabled, .btn-primary:disabled {\n  background-color: #0275d8;\n  border-color: #0275d8;\n}\n\n.btn-primary:active, .btn-primary.active,\n.show > .btn-primary.dropdown-toggle {\n  color: #fff;\n  background-color: #025aa5;\n  background-image: none;\n  border-color: #01549b;\n}\n\n.btn-secondary {\n  color: #292b2c;\n  background-color: #fff;\n  border-color: #ccc;\n}\n\n.btn-secondary:hover {\n  color: #292b2c;\n  background-color: #e6e6e6;\n  border-color: #adadad;\n}\n\n.btn-secondary:focus, .btn-secondary.focus {\n  -webkit-box-shadow: 0 0 0 2px rgba(204, 204, 204, 0.5);\n          box-shadow: 0 0 0 2px rgba(204, 204, 204, 0.5);\n}\n\n.btn-secondary.disabled, .btn-secondary:disabled {\n  background-color: #fff;\n  border-color: #ccc;\n}\n\n.btn-secondary:active, .btn-secondary.active,\n.show > .btn-secondary.dropdown-toggle {\n  color: #292b2c;\n  background-color: #e6e6e6;\n  background-image: none;\n  border-color: #adadad;\n}\n\n.btn-info {\n  color: #fff;\n  background-color: #5bc0de;\n  border-color: #5bc0de;\n}\n\n.btn-info:hover {\n  color: #fff;\n  background-color: #31b0d5;\n  border-color: #2aabd2;\n}\n\n.btn-info:focus, .btn-info.focus {\n  -webkit-box-shadow: 0 0 0 2px rgba(91, 192, 222, 0.5);\n          box-shadow: 0 0 0 2px rgba(91, 192, 222, 0.5);\n}\n\n.btn-info.disabled, .btn-info:disabled {\n  background-color: #5bc0de;\n  border-color: #5bc0de;\n}\n\n.btn-info:active, .btn-info.active,\n.show > .btn-info.dropdown-toggle {\n  color: #fff;\n  background-color: #31b0d5;\n  background-image: none;\n  border-color: #2aabd2;\n}\n\n.btn-success {\n  color: #fff;\n  background-color: #5cb85c;\n  border-color: #5cb85c;\n}\n\n.btn-success:hover {\n  color: #fff;\n  background-color: #449d44;\n  border-color: #419641;\n}\n\n.btn-success:focus, .btn-success.focus {\n  -webkit-box-shadow: 0 0 0 2px rgba(92, 184, 92, 0.5);\n          box-shadow: 0 0 0 2px rgba(92, 184, 92, 0.5);\n}\n\n.btn-success.disabled, .btn-success:disabled {\n  background-color: #5cb85c;\n  border-color: #5cb85c;\n}\n\n.btn-success:active, .btn-success.active,\n.show > .btn-success.dropdown-toggle {\n  color: #fff;\n  background-color: #449d44;\n  background-image: none;\n  border-color: #419641;\n}\n\n.btn-warning {\n  color: #fff;\n  background-color: #f0ad4e;\n  border-color: #f0ad4e;\n}\n\n.btn-warning:hover {\n  color: #fff;\n  background-color: #ec971f;\n  border-color: #eb9316;\n}\n\n.btn-warning:focus, .btn-warning.focus {\n  -webkit-box-shadow: 0 0 0 2px rgba(240, 173, 78, 0.5);\n          box-shadow: 0 0 0 2px rgba(240, 173, 78, 0.5);\n}\n\n.btn-warning.disabled, .btn-warning:disabled {\n  background-color: #f0ad4e;\n  border-color: #f0ad4e;\n}\n\n.btn-warning:active, .btn-warning.active,\n.show > .btn-warning.dropdown-toggle {\n  color: #fff;\n  background-color: #ec971f;\n  background-image: none;\n  border-color: #eb9316;\n}\n\n.btn-danger {\n  color: #fff;\n  background-color: #d9534f;\n  border-color: #d9534f;\n}\n\n.btn-danger:hover {\n  color: #fff;\n  background-color: #c9302c;\n  border-color: #c12e2a;\n}\n\n.btn-danger:focus, .btn-danger.focus {\n  -webkit-box-shadow: 0 0 0 2px rgba(217, 83, 79, 0.5);\n          box-shadow: 0 0 0 2px rgba(217, 83, 79, 0.5);\n}\n\n.btn-danger.disabled, .btn-danger:disabled {\n  background-color: #d9534f;\n  border-color: #d9534f;\n}\n\n.btn-danger:active, .btn-danger.active,\n.show > .btn-danger.dropdown-toggle {\n  color: #fff;\n  background-color: #c9302c;\n  background-image: none;\n  border-color: #c12e2a;\n}\n\n.btn-outline-primary {\n  color: #0275d8;\n  background-image: none;\n  background-color: transparent;\n  border-color: #0275d8;\n}\n\n.btn-outline-primary:hover {\n  color: #fff;\n  background-color: #0275d8;\n  border-color: #0275d8;\n}\n\n.btn-outline-primary:focus, .btn-outline-primary.focus {\n  -webkit-box-shadow: 0 0 0 2px rgba(2, 117, 216, 0.5);\n          box-shadow: 0 0 0 2px rgba(2, 117, 216, 0.5);\n}\n\n.btn-outline-primary.disabled, .btn-outline-primary:disabled {\n  color: #0275d8;\n  background-color: transparent;\n}\n\n.btn-outline-primary:active, .btn-outline-primary.active,\n.show > .btn-outline-primary.dropdown-toggle {\n  color: #fff;\n  background-color: #0275d8;\n  border-color: #0275d8;\n}\n\n.btn-outline-secondary {\n  color: #ccc;\n  background-image: none;\n  background-color: transparent;\n  border-color: #ccc;\n}\n\n.btn-outline-secondary:hover {\n  color: #fff;\n  background-color: #ccc;\n  border-color: #ccc;\n}\n\n.btn-outline-secondary:focus, .btn-outline-secondary.focus {\n  -webkit-box-shadow: 0 0 0 2px rgba(204, 204, 204, 0.5);\n          box-shadow: 0 0 0 2px rgba(204, 204, 204, 0.5);\n}\n\n.btn-outline-secondary.disabled, .btn-outline-secondary:disabled {\n  color: #ccc;\n  background-color: transparent;\n}\n\n.btn-outline-secondary:active, .btn-outline-secondary.active,\n.show > .btn-outline-secondary.dropdown-toggle {\n  color: #fff;\n  background-color: #ccc;\n  border-color: #ccc;\n}\n\n.btn-outline-info {\n  color: #5bc0de;\n  background-image: none;\n  background-color: transparent;\n  border-color: #5bc0de;\n}\n\n.btn-outline-info:hover {\n  color: #fff;\n  background-color: #5bc0de;\n  border-color: #5bc0de;\n}\n\n.btn-outline-info:focus, .btn-outline-info.focus {\n  -webkit-box-shadow: 0 0 0 2px rgba(91, 192, 222, 0.5);\n          box-shadow: 0 0 0 2px rgba(91, 192, 222, 0.5);\n}\n\n.btn-outline-info.disabled, .btn-outline-info:disabled {\n  color: #5bc0de;\n  background-color: transparent;\n}\n\n.btn-outline-info:active, .btn-outline-info.active,\n.show > .btn-outline-info.dropdown-toggle {\n  color: #fff;\n  background-color: #5bc0de;\n  border-color: #5bc0de;\n}\n\n.btn-outline-success {\n  color: #5cb85c;\n  background-image: none;\n  background-color: transparent;\n  border-color: #5cb85c;\n}\n\n.btn-outline-success:hover {\n  color: #fff;\n  background-color: #5cb85c;\n  border-color: #5cb85c;\n}\n\n.btn-outline-success:focus, .btn-outline-success.focus {\n  -webkit-box-shadow: 0 0 0 2px rgba(92, 184, 92, 0.5);\n          box-shadow: 0 0 0 2px rgba(92, 184, 92, 0.5);\n}\n\n.btn-outline-success.disabled, .btn-outline-success:disabled {\n  color: #5cb85c;\n  background-color: transparent;\n}\n\n.btn-outline-success:active, .btn-outline-success.active,\n.show > .btn-outline-success.dropdown-toggle {\n  color: #fff;\n  background-color: #5cb85c;\n  border-color: #5cb85c;\n}\n\n.btn-outline-warning {\n  color: #f0ad4e;\n  background-image: none;\n  background-color: transparent;\n  border-color: #f0ad4e;\n}\n\n.btn-outline-warning:hover {\n  color: #fff;\n  background-color: #f0ad4e;\n  border-color: #f0ad4e;\n}\n\n.btn-outline-warning:focus, .btn-outline-warning.focus {\n  -webkit-box-shadow: 0 0 0 2px rgba(240, 173, 78, 0.5);\n          box-shadow: 0 0 0 2px rgba(240, 173, 78, 0.5);\n}\n\n.btn-outline-warning.disabled, .btn-outline-warning:disabled {\n  color: #f0ad4e;\n  background-color: transparent;\n}\n\n.btn-outline-warning:active, .btn-outline-warning.active,\n.show > .btn-outline-warning.dropdown-toggle {\n  color: #fff;\n  background-color: #f0ad4e;\n  border-color: #f0ad4e;\n}\n\n.btn-outline-danger {\n  color: #d9534f;\n  background-image: none;\n  background-color: transparent;\n  border-color: #d9534f;\n}\n\n.btn-outline-danger:hover {\n  color: #fff;\n  background-color: #d9534f;\n  border-color: #d9534f;\n}\n\n.btn-outline-danger:focus, .btn-outline-danger.focus {\n  -webkit-box-shadow: 0 0 0 2px rgba(217, 83, 79, 0.5);\n          box-shadow: 0 0 0 2px rgba(217, 83, 79, 0.5);\n}\n\n.btn-outline-danger.disabled, .btn-outline-danger:disabled {\n  color: #d9534f;\n  background-color: transparent;\n}\n\n.btn-outline-danger:active, .btn-outline-danger.active,\n.show > .btn-outline-danger.dropdown-toggle {\n  color: #fff;\n  background-color: #d9534f;\n  border-color: #d9534f;\n}\n\n.btn-link {\n  font-weight: normal;\n  color: #0275d8;\n  border-radius: 0;\n}\n\n.btn-link, .btn-link:active, .btn-link.active, .btn-link:disabled {\n  background-color: transparent;\n}\n\n.btn-link, .btn-link:focus, .btn-link:active {\n  border-color: transparent;\n}\n\n.btn-link:hover {\n  border-color: transparent;\n}\n\n.btn-link:focus, .btn-link:hover {\n  color: #014c8c;\n  text-decoration: underline;\n  background-color: transparent;\n}\n\n.btn-link:disabled {\n  color: #636c72;\n}\n\n.btn-link:disabled:focus, .btn-link:disabled:hover {\n  text-decoration: none;\n}\n\n.btn-lg, .btn-group-lg > .btn {\n  padding: 0.75rem 1.5rem;\n  font-size: 1.25rem;\n  border-radius: 0.3rem;\n}\n\n.btn-sm, .btn-group-sm > .btn {\n  padding: 0.25rem 0.5rem;\n  font-size: 0.875rem;\n  border-radius: 0.2rem;\n}\n\n.btn-block {\n  display: block;\n  width: 100%;\n}\n\n.btn-block + .btn-block {\n  margin-top: 0.5rem;\n}\n\ninput[type=\"submit\"].btn-block,\ninput[type=\"reset\"].btn-block,\ninput[type=\"button\"].btn-block {\n  width: 100%;\n}\n\n.fade {\n  opacity: 0;\n  -webkit-transition: opacity 0.15s linear;\n  -o-transition: opacity 0.15s linear;\n  transition: opacity 0.15s linear;\n}\n\n.fade.show {\n  opacity: 1;\n}\n\n.collapse {\n  display: none;\n}\n\n.collapse.show {\n  display: block;\n}\n\ntr.collapse.show {\n  display: table-row;\n}\n\ntbody.collapse.show {\n  display: table-row-group;\n}\n\n.collapsing {\n  position: relative;\n  height: 0;\n  overflow: hidden;\n  -webkit-transition: height 0.35s ease;\n  -o-transition: height 0.35s ease;\n  transition: height 0.35s ease;\n}\n\n.dropup,\n.dropdown {\n  position: relative;\n}\n\n.dropdown-toggle::after {\n  display: inline-block;\n  width: 0;\n  height: 0;\n  margin-left: 0.3em;\n  vertical-align: middle;\n  content: \"\";\n  border-top: 0.3em solid;\n  border-right: 0.3em solid transparent;\n  border-left: 0.3em solid transparent;\n}\n\n.dropdown-toggle:focus {\n  outline: 0;\n}\n\n.dropup .dropdown-toggle::after {\n  border-top: 0;\n  border-bottom: 0.3em solid;\n}\n\n.dropdown-menu {\n  position: absolute;\n  top: 100%;\n  left: 0;\n  z-index: 1000;\n  display: none;\n  float: left;\n  min-width: 10rem;\n  padding: 0.5rem 0;\n  margin: 0.125rem 0 0;\n  font-size: 1rem;\n  color: #292b2c;\n  text-align: left;\n  list-style: none;\n  background-color: #fff;\n  -webkit-background-clip: padding-box;\n          background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 0.25rem;\n}\n\n.dropdown-divider {\n  height: 1px;\n  margin: 0.5rem 0;\n  overflow: hidden;\n  background-color: #eceeef;\n}\n\n.dropdown-item {\n  display: block;\n  width: 100%;\n  padding: 3px 1.5rem;\n  clear: both;\n  font-weight: normal;\n  color: #292b2c;\n  text-align: inherit;\n  white-space: nowrap;\n  background: none;\n  border: 0;\n}\n\n.dropdown-item:focus, .dropdown-item:hover {\n  color: #1d1e1f;\n  text-decoration: none;\n  background-color: #f7f7f9;\n}\n\n.dropdown-item.active, .dropdown-item:active {\n  color: #fff;\n  text-decoration: none;\n  background-color: #0275d8;\n}\n\n.dropdown-item.disabled, .dropdown-item:disabled {\n  color: #636c72;\n  cursor: not-allowed;\n  background-color: transparent;\n}\n\n.show > .dropdown-menu {\n  display: block;\n}\n\n.show > a {\n  outline: 0;\n}\n\n.dropdown-menu-right {\n  right: 0;\n  left: auto;\n}\n\n.dropdown-menu-left {\n  right: auto;\n  left: 0;\n}\n\n.dropdown-header {\n  display: block;\n  padding: 0.5rem 1.5rem;\n  margin-bottom: 0;\n  font-size: 0.875rem;\n  color: #636c72;\n  white-space: nowrap;\n}\n\n.dropdown-backdrop {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 990;\n}\n\n.dropup .dropdown-menu {\n  top: auto;\n  bottom: 100%;\n  margin-bottom: 0.125rem;\n}\n\n.btn-group,\n.btn-group-vertical {\n  position: relative;\n  display: -webkit-inline-box;\n  display: -webkit-inline-flex;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  vertical-align: middle;\n}\n\n.btn-group > .btn,\n.btn-group-vertical > .btn {\n  position: relative;\n  -webkit-box-flex: 0;\n  -webkit-flex: 0 1 auto;\n      -ms-flex: 0 1 auto;\n          flex: 0 1 auto;\n}\n\n.btn-group > .btn:hover,\n.btn-group-vertical > .btn:hover {\n  z-index: 2;\n}\n\n.btn-group > .btn:focus, .btn-group > .btn:active, .btn-group > .btn.active,\n.btn-group-vertical > .btn:focus,\n.btn-group-vertical > .btn:active,\n.btn-group-vertical > .btn.active {\n  z-index: 2;\n}\n\n.btn-group .btn + .btn,\n.btn-group .btn + .btn-group,\n.btn-group .btn-group + .btn,\n.btn-group .btn-group + .btn-group,\n.btn-group-vertical .btn + .btn,\n.btn-group-vertical .btn + .btn-group,\n.btn-group-vertical .btn-group + .btn,\n.btn-group-vertical .btn-group + .btn-group {\n  margin-left: -1px;\n}\n\n.btn-toolbar {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: start;\n  -webkit-justify-content: flex-start;\n      -ms-flex-pack: start;\n          justify-content: flex-start;\n}\n\n.btn-toolbar .input-group {\n  width: auto;\n}\n\n.btn-group > .btn:not(:first-child):not(:last-child):not(.dropdown-toggle) {\n  border-radius: 0;\n}\n\n.btn-group > .btn:first-child {\n  margin-left: 0;\n}\n\n.btn-group > .btn:first-child:not(:last-child):not(.dropdown-toggle) {\n  border-bottom-right-radius: 0;\n  border-top-right-radius: 0;\n}\n\n.btn-group > .btn:last-child:not(:first-child),\n.btn-group > .dropdown-toggle:not(:first-child) {\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0;\n}\n\n.btn-group > .btn-group {\n  float: left;\n}\n\n.btn-group > .btn-group:not(:first-child):not(:last-child) > .btn {\n  border-radius: 0;\n}\n\n.btn-group > .btn-group:first-child:not(:last-child) > .btn:last-child,\n.btn-group > .btn-group:first-child:not(:last-child) > .dropdown-toggle {\n  border-bottom-right-radius: 0;\n  border-top-right-radius: 0;\n}\n\n.btn-group > .btn-group:last-child:not(:first-child) > .btn:first-child {\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0;\n}\n\n.btn-group .dropdown-toggle:active,\n.btn-group.open .dropdown-toggle {\n  outline: 0;\n}\n\n.btn + .dropdown-toggle-split {\n  padding-right: 0.75rem;\n  padding-left: 0.75rem;\n}\n\n.btn + .dropdown-toggle-split::after {\n  margin-left: 0;\n}\n\n.btn-sm + .dropdown-toggle-split, .btn-group-sm > .btn + .dropdown-toggle-split {\n  padding-right: 0.375rem;\n  padding-left: 0.375rem;\n}\n\n.btn-lg + .dropdown-toggle-split, .btn-group-lg > .btn + .dropdown-toggle-split {\n  padding-right: 1.125rem;\n  padding-left: 1.125rem;\n}\n\n.btn-group-vertical {\n  display: -webkit-inline-box;\n  display: -webkit-inline-flex;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-align: start;\n  -webkit-align-items: flex-start;\n      -ms-flex-align: start;\n          align-items: flex-start;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n\n.btn-group-vertical .btn,\n.btn-group-vertical .btn-group {\n  width: 100%;\n}\n\n.btn-group-vertical > .btn + .btn,\n.btn-group-vertical > .btn + .btn-group,\n.btn-group-vertical > .btn-group + .btn,\n.btn-group-vertical > .btn-group + .btn-group {\n  margin-top: -1px;\n  margin-left: 0;\n}\n\n.btn-group-vertical > .btn:not(:first-child):not(:last-child) {\n  border-radius: 0;\n}\n\n.btn-group-vertical > .btn:first-child:not(:last-child) {\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0;\n}\n\n.btn-group-vertical > .btn:last-child:not(:first-child) {\n  border-top-right-radius: 0;\n  border-top-left-radius: 0;\n}\n\n.btn-group-vertical > .btn-group:not(:first-child):not(:last-child) > .btn {\n  border-radius: 0;\n}\n\n.btn-group-vertical > .btn-group:first-child:not(:last-child) > .btn:last-child,\n.btn-group-vertical > .btn-group:first-child:not(:last-child) > .dropdown-toggle {\n  border-bottom-right-radius: 0;\n  border-bottom-left-radius: 0;\n}\n\n.btn-group-vertical > .btn-group:last-child:not(:first-child) > .btn:first-child {\n  border-top-right-radius: 0;\n  border-top-left-radius: 0;\n}\n\n[data-toggle=\"buttons\"] > .btn input[type=\"radio\"],\n[data-toggle=\"buttons\"] > .btn input[type=\"checkbox\"],\n[data-toggle=\"buttons\"] > .btn-group > .btn input[type=\"radio\"],\n[data-toggle=\"buttons\"] > .btn-group > .btn input[type=\"checkbox\"] {\n  position: absolute;\n  clip: rect(0, 0, 0, 0);\n  pointer-events: none;\n}\n\n.input-group {\n  position: relative;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  width: 100%;\n}\n\n.input-group .form-control {\n  position: relative;\n  z-index: 2;\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 auto;\n      -ms-flex: 1 1 auto;\n          flex: 1 1 auto;\n  width: 1%;\n  margin-bottom: 0;\n}\n\n.input-group .form-control:focus, .input-group .form-control:active, .input-group .form-control:hover {\n  z-index: 3;\n}\n\n.input-group-addon,\n.input-group-btn,\n.input-group .form-control {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n}\n\n.input-group-addon:not(:first-child):not(:last-child),\n.input-group-btn:not(:first-child):not(:last-child),\n.input-group .form-control:not(:first-child):not(:last-child) {\n  border-radius: 0;\n}\n\n.input-group-addon,\n.input-group-btn {\n  white-space: nowrap;\n  vertical-align: middle;\n}\n\n.input-group-addon {\n  padding: 0.5rem 0.75rem;\n  margin-bottom: 0;\n  font-size: 1rem;\n  font-weight: normal;\n  line-height: 1.25;\n  color: #464a4c;\n  text-align: center;\n  background-color: #eceeef;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 0.25rem;\n}\n\n.input-group-addon.form-control-sm,\n.input-group-sm > .input-group-addon,\n.input-group-sm > .input-group-btn > .input-group-addon.btn {\n  padding: 0.25rem 0.5rem;\n  font-size: 0.875rem;\n  border-radius: 0.2rem;\n}\n\n.input-group-addon.form-control-lg,\n.input-group-lg > .input-group-addon,\n.input-group-lg > .input-group-btn > .input-group-addon.btn {\n  padding: 0.75rem 1.5rem;\n  font-size: 1.25rem;\n  border-radius: 0.3rem;\n}\n\n.input-group-addon input[type=\"radio\"],\n.input-group-addon input[type=\"checkbox\"] {\n  margin-top: 0;\n}\n\n.input-group .form-control:not(:last-child),\n.input-group-addon:not(:last-child),\n.input-group-btn:not(:last-child) > .btn,\n.input-group-btn:not(:last-child) > .btn-group > .btn,\n.input-group-btn:not(:last-child) > .dropdown-toggle,\n.input-group-btn:not(:first-child) > .btn:not(:last-child):not(.dropdown-toggle),\n.input-group-btn:not(:first-child) > .btn-group:not(:last-child) > .btn {\n  border-bottom-right-radius: 0;\n  border-top-right-radius: 0;\n}\n\n.input-group-addon:not(:last-child) {\n  border-right: 0;\n}\n\n.input-group .form-control:not(:first-child),\n.input-group-addon:not(:first-child),\n.input-group-btn:not(:first-child) > .btn,\n.input-group-btn:not(:first-child) > .btn-group > .btn,\n.input-group-btn:not(:first-child) > .dropdown-toggle,\n.input-group-btn:not(:last-child) > .btn:not(:first-child),\n.input-group-btn:not(:last-child) > .btn-group:not(:first-child) > .btn {\n  border-bottom-left-radius: 0;\n  border-top-left-radius: 0;\n}\n\n.form-control + .input-group-addon:not(:first-child) {\n  border-left: 0;\n}\n\n.input-group-btn {\n  position: relative;\n  font-size: 0;\n  white-space: nowrap;\n}\n\n.input-group-btn > .btn {\n  position: relative;\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 0%;\n      -ms-flex: 1 1 0%;\n          flex: 1 1 0%;\n}\n\n.input-group-btn > .btn + .btn {\n  margin-left: -1px;\n}\n\n.input-group-btn > .btn:focus, .input-group-btn > .btn:active, .input-group-btn > .btn:hover {\n  z-index: 3;\n}\n\n.input-group-btn:not(:last-child) > .btn,\n.input-group-btn:not(:last-child) > .btn-group {\n  margin-right: -1px;\n}\n\n.input-group-btn:not(:first-child) > .btn,\n.input-group-btn:not(:first-child) > .btn-group {\n  z-index: 2;\n  margin-left: -1px;\n}\n\n.input-group-btn:not(:first-child) > .btn:focus, .input-group-btn:not(:first-child) > .btn:active, .input-group-btn:not(:first-child) > .btn:hover,\n.input-group-btn:not(:first-child) > .btn-group:focus,\n.input-group-btn:not(:first-child) > .btn-group:active,\n.input-group-btn:not(:first-child) > .btn-group:hover {\n  z-index: 3;\n}\n\n.custom-control {\n  position: relative;\n  display: -webkit-inline-box;\n  display: -webkit-inline-flex;\n  display: -ms-inline-flexbox;\n  display: inline-flex;\n  min-height: 1.5rem;\n  padding-left: 1.5rem;\n  margin-right: 1rem;\n  cursor: pointer;\n}\n\n.custom-control-input {\n  position: absolute;\n  z-index: -1;\n  opacity: 0;\n}\n\n.custom-control-input:checked ~ .custom-control-indicator {\n  color: #fff;\n  background-color: #0275d8;\n}\n\n.custom-control-input:focus ~ .custom-control-indicator {\n  -webkit-box-shadow: 0 0 0 1px #fff, 0 0 0 3px #0275d8;\n          box-shadow: 0 0 0 1px #fff, 0 0 0 3px #0275d8;\n}\n\n.custom-control-input:active ~ .custom-control-indicator {\n  color: #fff;\n  background-color: #8fcafe;\n}\n\n.custom-control-input:disabled ~ .custom-control-indicator {\n  cursor: not-allowed;\n  background-color: #eceeef;\n}\n\n.custom-control-input:disabled ~ .custom-control-description {\n  color: #636c72;\n  cursor: not-allowed;\n}\n\n.custom-control-indicator {\n  position: absolute;\n  top: 0.25rem;\n  left: 0;\n  display: block;\n  width: 1rem;\n  height: 1rem;\n  pointer-events: none;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  background-color: #ddd;\n  background-repeat: no-repeat;\n  background-position: center center;\n  -webkit-background-size: 50% 50%;\n          background-size: 50% 50%;\n}\n\n.custom-checkbox .custom-control-indicator {\n  border-radius: 0.25rem;\n}\n\n.custom-checkbox .custom-control-input:checked ~ .custom-control-indicator {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3E%3Cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3E%3C/svg%3E\");\n}\n\n.custom-checkbox .custom-control-input:indeterminate ~ .custom-control-indicator {\n  background-color: #0275d8;\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 4'%3E%3Cpath stroke='%23fff' d='M0 2h4'/%3E%3C/svg%3E\");\n}\n\n.custom-radio .custom-control-indicator {\n  border-radius: 50%;\n}\n\n.custom-radio .custom-control-input:checked ~ .custom-control-indicator {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3E%3Ccircle r='3' fill='%23fff'/%3E%3C/svg%3E\");\n}\n\n.custom-controls-stacked {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column;\n}\n\n.custom-controls-stacked .custom-control {\n  margin-bottom: 0.25rem;\n}\n\n.custom-controls-stacked .custom-control + .custom-control {\n  margin-left: 0;\n}\n\n.custom-select {\n  display: inline-block;\n  max-width: 100%;\n  height: calc(2.25rem + 2px);\n  padding: 0.375rem 1.75rem 0.375rem 0.75rem;\n  line-height: 1.25;\n  color: #464a4c;\n  vertical-align: middle;\n  background: #fff url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%23333' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E\") no-repeat right 0.75rem center;\n  -webkit-background-size: 8px 10px;\n          background-size: 8px 10px;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 0.25rem;\n  -moz-appearance: none;\n  -webkit-appearance: none;\n}\n\n.custom-select:focus {\n  border-color: #5cb3fd;\n  outline: none;\n}\n\n.custom-select:focus::-ms-value {\n  color: #464a4c;\n  background-color: #fff;\n}\n\n.custom-select:disabled {\n  color: #636c72;\n  cursor: not-allowed;\n  background-color: #eceeef;\n}\n\n.custom-select::-ms-expand {\n  opacity: 0;\n}\n\n.custom-select-sm {\n  padding-top: 0.375rem;\n  padding-bottom: 0.375rem;\n  font-size: 75%;\n}\n\n.custom-file {\n  position: relative;\n  display: inline-block;\n  max-width: 100%;\n  height: 2.5rem;\n  margin-bottom: 0;\n  cursor: pointer;\n}\n\n.custom-file-input {\n  min-width: 14rem;\n  max-width: 100%;\n  height: 2.5rem;\n  margin: 0;\n  filter: alpha(opacity=0);\n  opacity: 0;\n}\n\n.custom-file-control {\n  position: absolute;\n  top: 0;\n  right: 0;\n  left: 0;\n  z-index: 5;\n  height: 2.5rem;\n  padding: 0.5rem 1rem;\n  line-height: 1.5;\n  color: #464a4c;\n  pointer-events: none;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  background-color: #fff;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 0.25rem;\n}\n\n.custom-file-control:lang(en)::after {\n  content: \"Choose file...\";\n}\n\n.custom-file-control::before {\n  position: absolute;\n  top: -1px;\n  right: -1px;\n  bottom: -1px;\n  z-index: 6;\n  display: block;\n  height: 2.5rem;\n  padding: 0.5rem 1rem;\n  line-height: 1.5;\n  color: #464a4c;\n  background-color: #eceeef;\n  border: 1px solid rgba(0, 0, 0, 0.15);\n  border-radius: 0 0.25rem 0.25rem 0;\n}\n\n.custom-file-control:lang(en)::before {\n  content: \"Browse\";\n}\n\n.nav {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  padding-left: 0;\n  margin-bottom: 0;\n  list-style: none;\n}\n\n.nav-link {\n  display: block;\n  padding: 0.5em 1em;\n}\n\n.nav-link:focus, .nav-link:hover {\n  text-decoration: none;\n}\n\n.nav-link.disabled {\n  color: #636c72;\n  cursor: not-allowed;\n}\n\n.nav-tabs {\n  border-bottom: 1px solid #ddd;\n}\n\n.nav-tabs .nav-item {\n  margin-bottom: -1px;\n}\n\n.nav-tabs .nav-link {\n  border: 1px solid transparent;\n  border-top-right-radius: 0.25rem;\n  border-top-left-radius: 0.25rem;\n}\n\n.nav-tabs .nav-link:focus, .nav-tabs .nav-link:hover {\n  border-color: #eceeef #eceeef #ddd;\n}\n\n.nav-tabs .nav-link.disabled {\n  color: #636c72;\n  background-color: transparent;\n  border-color: transparent;\n}\n\n.nav-tabs .nav-link.active,\n.nav-tabs .nav-item.show .nav-link {\n  color: #464a4c;\n  background-color: #fff;\n  border-color: #ddd #ddd #fff;\n}\n\n.nav-tabs .dropdown-menu {\n  margin-top: -1px;\n  border-top-right-radius: 0;\n  border-top-left-radius: 0;\n}\n\n.nav-pills .nav-link {\n  border-radius: 0.25rem;\n}\n\n.nav-pills .nav-link.active,\n.nav-pills .nav-item.show .nav-link {\n  color: #fff;\n  cursor: default;\n  background-color: #0275d8;\n}\n\n.nav-fill .nav-item {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 auto;\n      -ms-flex: 1 1 auto;\n          flex: 1 1 auto;\n  text-align: center;\n}\n\n.nav-justified .nav-item {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 100%;\n      -ms-flex: 1 1 100%;\n          flex: 1 1 100%;\n  text-align: center;\n}\n\n.tab-content > .tab-pane {\n  display: none;\n}\n\n.tab-content > .active {\n  display: block;\n}\n\n.navbar {\n  position: relative;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  padding: 0.5rem 1rem;\n}\n\n.navbar-brand {\n  display: inline-block;\n  padding-top: .25rem;\n  padding-bottom: .25rem;\n  margin-right: 1rem;\n  font-size: 1.25rem;\n  line-height: inherit;\n  white-space: nowrap;\n}\n\n.navbar-brand:focus, .navbar-brand:hover {\n  text-decoration: none;\n}\n\n.navbar-nav {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  padding-left: 0;\n  margin-bottom: 0;\n  list-style: none;\n}\n\n.navbar-nav .nav-link {\n  padding-right: 0;\n  padding-left: 0;\n}\n\n.navbar-text {\n  display: inline-block;\n  padding-top: .425rem;\n  padding-bottom: .425rem;\n}\n\n.navbar-toggler {\n  -webkit-align-self: flex-start;\n      -ms-flex-item-align: start;\n          align-self: flex-start;\n  padding: 0.25rem 0.75rem;\n  font-size: 1.25rem;\n  line-height: 1;\n  background: transparent;\n  border: 1px solid transparent;\n  border-radius: 0.25rem;\n}\n\n.navbar-toggler:focus, .navbar-toggler:hover {\n  text-decoration: none;\n}\n\n.navbar-toggler-icon {\n  display: inline-block;\n  width: 1.5em;\n  height: 1.5em;\n  vertical-align: middle;\n  content: \"\";\n  background: no-repeat center center;\n  -webkit-background-size: 100% 100%;\n          background-size: 100% 100%;\n}\n\n.navbar-toggler-left {\n  position: absolute;\n  left: 1rem;\n}\n\n.navbar-toggler-right {\n  position: absolute;\n  right: 1rem;\n}\n\n@media (max-width: 575px) {\n  .navbar-toggleable .navbar-nav .dropdown-menu {\n    position: static;\n    float: none;\n  }\n  .navbar-toggleable > .container {\n    padding-right: 0;\n    padding-left: 0;\n  }\n}\n\n@media (min-width: 576px) {\n  .navbar-toggleable {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: row;\n        -ms-flex-direction: row;\n            flex-direction: row;\n    -webkit-flex-wrap: nowrap;\n        -ms-flex-wrap: nowrap;\n            flex-wrap: nowrap;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n  }\n  .navbar-toggleable .navbar-nav {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: row;\n        -ms-flex-direction: row;\n            flex-direction: row;\n  }\n  .navbar-toggleable .navbar-nav .nav-link {\n    padding-right: .5rem;\n    padding-left: .5rem;\n  }\n  .navbar-toggleable > .container {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-flex-wrap: nowrap;\n        -ms-flex-wrap: nowrap;\n            flex-wrap: nowrap;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n  }\n  .navbar-toggleable .navbar-collapse {\n    display: -webkit-box !important;\n    display: -webkit-flex !important;\n    display: -ms-flexbox !important;\n    display: flex !important;\n    width: 100%;\n  }\n  .navbar-toggleable .navbar-toggler {\n    display: none;\n  }\n}\n\n@media (max-width: 767px) {\n  .navbar-toggleable-sm .navbar-nav .dropdown-menu {\n    position: static;\n    float: none;\n  }\n  .navbar-toggleable-sm > .container {\n    padding-right: 0;\n    padding-left: 0;\n  }\n}\n\n@media (min-width: 768px) {\n  .navbar-toggleable-sm {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: row;\n        -ms-flex-direction: row;\n            flex-direction: row;\n    -webkit-flex-wrap: nowrap;\n        -ms-flex-wrap: nowrap;\n            flex-wrap: nowrap;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n  }\n  .navbar-toggleable-sm .navbar-nav {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: row;\n        -ms-flex-direction: row;\n            flex-direction: row;\n  }\n  .navbar-toggleable-sm .navbar-nav .nav-link {\n    padding-right: .5rem;\n    padding-left: .5rem;\n  }\n  .navbar-toggleable-sm > .container {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-flex-wrap: nowrap;\n        -ms-flex-wrap: nowrap;\n            flex-wrap: nowrap;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n  }\n  .navbar-toggleable-sm .navbar-collapse {\n    display: -webkit-box !important;\n    display: -webkit-flex !important;\n    display: -ms-flexbox !important;\n    display: flex !important;\n    width: 100%;\n  }\n  .navbar-toggleable-sm .navbar-toggler {\n    display: none;\n  }\n}\n\n@media (max-width: 991px) {\n  .navbar-toggleable-md .navbar-nav .dropdown-menu {\n    position: static;\n    float: none;\n  }\n  .navbar-toggleable-md > .container {\n    padding-right: 0;\n    padding-left: 0;\n  }\n}\n\n@media (min-width: 992px) {\n  .navbar-toggleable-md {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: row;\n        -ms-flex-direction: row;\n            flex-direction: row;\n    -webkit-flex-wrap: nowrap;\n        -ms-flex-wrap: nowrap;\n            flex-wrap: nowrap;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n  }\n  .navbar-toggleable-md .navbar-nav {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: row;\n        -ms-flex-direction: row;\n            flex-direction: row;\n  }\n  .navbar-toggleable-md .navbar-nav .nav-link {\n    padding-right: .5rem;\n    padding-left: .5rem;\n  }\n  .navbar-toggleable-md > .container {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-flex-wrap: nowrap;\n        -ms-flex-wrap: nowrap;\n            flex-wrap: nowrap;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n  }\n  .navbar-toggleable-md .navbar-collapse {\n    display: -webkit-box !important;\n    display: -webkit-flex !important;\n    display: -ms-flexbox !important;\n    display: flex !important;\n    width: 100%;\n  }\n  .navbar-toggleable-md .navbar-toggler {\n    display: none;\n  }\n}\n\n@media (max-width: 1199px) {\n  .navbar-toggleable-lg .navbar-nav .dropdown-menu {\n    position: static;\n    float: none;\n  }\n  .navbar-toggleable-lg > .container {\n    padding-right: 0;\n    padding-left: 0;\n  }\n}\n\n@media (min-width: 1200px) {\n  .navbar-toggleable-lg {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: row;\n        -ms-flex-direction: row;\n            flex-direction: row;\n    -webkit-flex-wrap: nowrap;\n        -ms-flex-wrap: nowrap;\n            flex-wrap: nowrap;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n  }\n  .navbar-toggleable-lg .navbar-nav {\n    -webkit-box-orient: horizontal;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: row;\n        -ms-flex-direction: row;\n            flex-direction: row;\n  }\n  .navbar-toggleable-lg .navbar-nav .nav-link {\n    padding-right: .5rem;\n    padding-left: .5rem;\n  }\n  .navbar-toggleable-lg > .container {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-flex-wrap: nowrap;\n        -ms-flex-wrap: nowrap;\n            flex-wrap: nowrap;\n    -webkit-box-align: center;\n    -webkit-align-items: center;\n        -ms-flex-align: center;\n            align-items: center;\n  }\n  .navbar-toggleable-lg .navbar-collapse {\n    display: -webkit-box !important;\n    display: -webkit-flex !important;\n    display: -ms-flexbox !important;\n    display: flex !important;\n    width: 100%;\n  }\n  .navbar-toggleable-lg .navbar-toggler {\n    display: none;\n  }\n}\n\n.navbar-toggleable-xl {\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n      -ms-flex-direction: row;\n          flex-direction: row;\n  -webkit-flex-wrap: nowrap;\n      -ms-flex-wrap: nowrap;\n          flex-wrap: nowrap;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n\n.navbar-toggleable-xl .navbar-nav .dropdown-menu {\n  position: static;\n  float: none;\n}\n\n.navbar-toggleable-xl > .container {\n  padding-right: 0;\n  padding-left: 0;\n}\n\n.navbar-toggleable-xl .navbar-nav {\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n      -ms-flex-direction: row;\n          flex-direction: row;\n}\n\n.navbar-toggleable-xl .navbar-nav .nav-link {\n  padding-right: .5rem;\n  padding-left: .5rem;\n}\n\n.navbar-toggleable-xl > .container {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-flex-wrap: nowrap;\n      -ms-flex-wrap: nowrap;\n          flex-wrap: nowrap;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n}\n\n.navbar-toggleable-xl .navbar-collapse {\n  display: -webkit-box !important;\n  display: -webkit-flex !important;\n  display: -ms-flexbox !important;\n  display: flex !important;\n  width: 100%;\n}\n\n.navbar-toggleable-xl .navbar-toggler {\n  display: none;\n}\n\n.navbar-light .navbar-brand,\n.navbar-light .navbar-toggler {\n  color: rgba(0, 0, 0, 0.9);\n}\n\n.navbar-light .navbar-brand:focus, .navbar-light .navbar-brand:hover,\n.navbar-light .navbar-toggler:focus,\n.navbar-light .navbar-toggler:hover {\n  color: rgba(0, 0, 0, 0.9);\n}\n\n.navbar-light .navbar-nav .nav-link {\n  color: rgba(0, 0, 0, 0.5);\n}\n\n.navbar-light .navbar-nav .nav-link:focus, .navbar-light .navbar-nav .nav-link:hover {\n  color: rgba(0, 0, 0, 0.7);\n}\n\n.navbar-light .navbar-nav .nav-link.disabled {\n  color: rgba(0, 0, 0, 0.3);\n}\n\n.navbar-light .navbar-nav .open > .nav-link,\n.navbar-light .navbar-nav .active > .nav-link,\n.navbar-light .navbar-nav .nav-link.open,\n.navbar-light .navbar-nav .nav-link.active {\n  color: rgba(0, 0, 0, 0.9);\n}\n\n.navbar-light .navbar-toggler {\n  border-color: rgba(0, 0, 0, 0.1);\n}\n\n.navbar-light .navbar-toggler-icon {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(0, 0, 0, 0.5)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E\");\n}\n\n.navbar-light .navbar-text {\n  color: rgba(0, 0, 0, 0.5);\n}\n\n.navbar-inverse .navbar-brand,\n.navbar-inverse .navbar-toggler {\n  color: white;\n}\n\n.navbar-inverse .navbar-brand:focus, .navbar-inverse .navbar-brand:hover,\n.navbar-inverse .navbar-toggler:focus,\n.navbar-inverse .navbar-toggler:hover {\n  color: white;\n}\n\n.navbar-inverse .navbar-nav .nav-link {\n  color: rgba(255, 255, 255, 0.5);\n}\n\n.navbar-inverse .navbar-nav .nav-link:focus, .navbar-inverse .navbar-nav .nav-link:hover {\n  color: rgba(255, 255, 255, 0.75);\n}\n\n.navbar-inverse .navbar-nav .nav-link.disabled {\n  color: rgba(255, 255, 255, 0.25);\n}\n\n.navbar-inverse .navbar-nav .open > .nav-link,\n.navbar-inverse .navbar-nav .active > .nav-link,\n.navbar-inverse .navbar-nav .nav-link.open,\n.navbar-inverse .navbar-nav .nav-link.active {\n  color: white;\n}\n\n.navbar-inverse .navbar-toggler {\n  border-color: rgba(255, 255, 255, 0.1);\n}\n\n.navbar-inverse .navbar-toggler-icon {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='rgba(255, 255, 255, 0.5)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 8h24M4 16h24M4 24h24'/%3E%3C/svg%3E\");\n}\n\n.navbar-inverse .navbar-text {\n  color: rgba(255, 255, 255, 0.5);\n}\n\n.card {\n  position: relative;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  background-color: #fff;\n  border: 1px solid rgba(0, 0, 0, 0.125);\n  border-radius: 0.25rem;\n}\n\n.card-block {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 auto;\n      -ms-flex: 1 1 auto;\n          flex: 1 1 auto;\n  padding: 1.25rem;\n}\n\n.card-title {\n  margin-bottom: 0.75rem;\n}\n\n.card-subtitle {\n  margin-top: -0.375rem;\n  margin-bottom: 0;\n}\n\n.card-text:last-child {\n  margin-bottom: 0;\n}\n\n.card-link:hover {\n  text-decoration: none;\n}\n\n.card-link + .card-link {\n  margin-left: 1.25rem;\n}\n\n.card > .list-group:first-child .list-group-item:first-child {\n  border-top-right-radius: 0.25rem;\n  border-top-left-radius: 0.25rem;\n}\n\n.card > .list-group:last-child .list-group-item:last-child {\n  border-bottom-right-radius: 0.25rem;\n  border-bottom-left-radius: 0.25rem;\n}\n\n.card-header {\n  padding: 0.75rem 1.25rem;\n  margin-bottom: 0;\n  background-color: #f7f7f9;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.125);\n}\n\n.card-header:first-child {\n  border-radius: calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0;\n}\n\n.card-footer {\n  padding: 0.75rem 1.25rem;\n  background-color: #f7f7f9;\n  border-top: 1px solid rgba(0, 0, 0, 0.125);\n}\n\n.card-footer:last-child {\n  border-radius: 0 0 calc(0.25rem - 1px) calc(0.25rem - 1px);\n}\n\n.card-header-tabs {\n  margin-right: -0.625rem;\n  margin-bottom: -0.75rem;\n  margin-left: -0.625rem;\n  border-bottom: 0;\n}\n\n.card-header-pills {\n  margin-right: -0.625rem;\n  margin-left: -0.625rem;\n}\n\n.card-primary {\n  background-color: #0275d8;\n  border-color: #0275d8;\n}\n\n.card-primary .card-header,\n.card-primary .card-footer {\n  background-color: transparent;\n}\n\n.card-success {\n  background-color: #5cb85c;\n  border-color: #5cb85c;\n}\n\n.card-success .card-header,\n.card-success .card-footer {\n  background-color: transparent;\n}\n\n.card-info {\n  background-color: #5bc0de;\n  border-color: #5bc0de;\n}\n\n.card-info .card-header,\n.card-info .card-footer {\n  background-color: transparent;\n}\n\n.card-warning {\n  background-color: #f0ad4e;\n  border-color: #f0ad4e;\n}\n\n.card-warning .card-header,\n.card-warning .card-footer {\n  background-color: transparent;\n}\n\n.card-danger {\n  background-color: #d9534f;\n  border-color: #d9534f;\n}\n\n.card-danger .card-header,\n.card-danger .card-footer {\n  background-color: transparent;\n}\n\n.card-outline-primary {\n  background-color: transparent;\n  border-color: #0275d8;\n}\n\n.card-outline-secondary {\n  background-color: transparent;\n  border-color: #ccc;\n}\n\n.card-outline-info {\n  background-color: transparent;\n  border-color: #5bc0de;\n}\n\n.card-outline-success {\n  background-color: transparent;\n  border-color: #5cb85c;\n}\n\n.card-outline-warning {\n  background-color: transparent;\n  border-color: #f0ad4e;\n}\n\n.card-outline-danger {\n  background-color: transparent;\n  border-color: #d9534f;\n}\n\n.card-inverse {\n  color: rgba(255, 255, 255, 0.65);\n}\n\n.card-inverse .card-header,\n.card-inverse .card-footer {\n  background-color: transparent;\n  border-color: rgba(255, 255, 255, 0.2);\n}\n\n.card-inverse .card-header,\n.card-inverse .card-footer,\n.card-inverse .card-title,\n.card-inverse .card-blockquote {\n  color: #fff;\n}\n\n.card-inverse .card-link,\n.card-inverse .card-text,\n.card-inverse .card-subtitle,\n.card-inverse .card-blockquote .blockquote-footer {\n  color: rgba(255, 255, 255, 0.65);\n}\n\n.card-inverse .card-link:focus, .card-inverse .card-link:hover {\n  color: #fff;\n}\n\n.card-blockquote {\n  padding: 0;\n  margin-bottom: 0;\n  border-left: 0;\n}\n\n.card-img {\n  border-radius: calc(0.25rem - 1px);\n}\n\n.card-img-overlay {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  padding: 1.25rem;\n}\n\n.card-img-top {\n  border-top-right-radius: calc(0.25rem - 1px);\n  border-top-left-radius: calc(0.25rem - 1px);\n}\n\n.card-img-bottom {\n  border-bottom-right-radius: calc(0.25rem - 1px);\n  border-bottom-left-radius: calc(0.25rem - 1px);\n}\n\n@media (min-width: 576px) {\n  .card-deck {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-flex-flow: row wrap;\n        -ms-flex-flow: row wrap;\n            flex-flow: row wrap;\n  }\n  .card-deck .card {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 0 0%;\n        -ms-flex: 1 0 0%;\n            flex: 1 0 0%;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n    -webkit-flex-direction: column;\n        -ms-flex-direction: column;\n            flex-direction: column;\n  }\n  .card-deck .card:not(:first-child) {\n    margin-left: 15px;\n  }\n  .card-deck .card:not(:last-child) {\n    margin-right: 15px;\n  }\n}\n\n@media (min-width: 576px) {\n  .card-group {\n    display: -webkit-box;\n    display: -webkit-flex;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-flex-flow: row wrap;\n        -ms-flex-flow: row wrap;\n            flex-flow: row wrap;\n  }\n  .card-group .card {\n    -webkit-box-flex: 1;\n    -webkit-flex: 1 0 0%;\n        -ms-flex: 1 0 0%;\n            flex: 1 0 0%;\n  }\n  .card-group .card + .card {\n    margin-left: 0;\n    border-left: 0;\n  }\n  .card-group .card:first-child {\n    border-bottom-right-radius: 0;\n    border-top-right-radius: 0;\n  }\n  .card-group .card:first-child .card-img-top {\n    border-top-right-radius: 0;\n  }\n  .card-group .card:first-child .card-img-bottom {\n    border-bottom-right-radius: 0;\n  }\n  .card-group .card:last-child {\n    border-bottom-left-radius: 0;\n    border-top-left-radius: 0;\n  }\n  .card-group .card:last-child .card-img-top {\n    border-top-left-radius: 0;\n  }\n  .card-group .card:last-child .card-img-bottom {\n    border-bottom-left-radius: 0;\n  }\n  .card-group .card:not(:first-child):not(:last-child) {\n    border-radius: 0;\n  }\n  .card-group .card:not(:first-child):not(:last-child) .card-img-top,\n  .card-group .card:not(:first-child):not(:last-child) .card-img-bottom {\n    border-radius: 0;\n  }\n}\n\n@media (min-width: 576px) {\n  .card-columns {\n    -webkit-column-count: 3;\n       -moz-column-count: 3;\n            column-count: 3;\n    -webkit-column-gap: 1.25rem;\n       -moz-column-gap: 1.25rem;\n            column-gap: 1.25rem;\n  }\n  .card-columns .card {\n    display: inline-block;\n    width: 100%;\n    margin-bottom: 0.75rem;\n  }\n}\n\n.breadcrumb {\n  padding: 0.75rem 1rem;\n  margin-bottom: 1rem;\n  list-style: none;\n  background-color: #eceeef;\n  border-radius: 0.25rem;\n}\n\n.breadcrumb::after {\n  display: block;\n  content: \"\";\n  clear: both;\n}\n\n.breadcrumb-item {\n  float: left;\n}\n\n.breadcrumb-item + .breadcrumb-item::before {\n  display: inline-block;\n  padding-right: 0.5rem;\n  padding-left: 0.5rem;\n  color: #636c72;\n  content: \"/\";\n}\n\n.breadcrumb-item + .breadcrumb-item:hover::before {\n  text-decoration: underline;\n}\n\n.breadcrumb-item + .breadcrumb-item:hover::before {\n  text-decoration: none;\n}\n\n.breadcrumb-item.active {\n  color: #636c72;\n}\n\n.pagination {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  padding-left: 0;\n  list-style: none;\n  border-radius: 0.25rem;\n}\n\n.page-item:first-child .page-link {\n  margin-left: 0;\n  border-bottom-left-radius: 0.25rem;\n  border-top-left-radius: 0.25rem;\n}\n\n.page-item:last-child .page-link {\n  border-bottom-right-radius: 0.25rem;\n  border-top-right-radius: 0.25rem;\n}\n\n.page-item.active .page-link {\n  z-index: 2;\n  color: #fff;\n  background-color: #0275d8;\n  border-color: #0275d8;\n}\n\n.page-item.disabled .page-link {\n  color: #636c72;\n  pointer-events: none;\n  cursor: not-allowed;\n  background-color: #fff;\n  border-color: #ddd;\n}\n\n.page-link {\n  position: relative;\n  display: block;\n  padding: 0.5rem 0.75rem;\n  margin-left: -1px;\n  line-height: 1.25;\n  color: #0275d8;\n  background-color: #fff;\n  border: 1px solid #ddd;\n}\n\n.page-link:focus, .page-link:hover {\n  color: #014c8c;\n  text-decoration: none;\n  background-color: #eceeef;\n  border-color: #ddd;\n}\n\n.pagination-lg .page-link {\n  padding: 0.75rem 1.5rem;\n  font-size: 1.25rem;\n}\n\n.pagination-lg .page-item:first-child .page-link {\n  border-bottom-left-radius: 0.3rem;\n  border-top-left-radius: 0.3rem;\n}\n\n.pagination-lg .page-item:last-child .page-link {\n  border-bottom-right-radius: 0.3rem;\n  border-top-right-radius: 0.3rem;\n}\n\n.pagination-sm .page-link {\n  padding: 0.25rem 0.5rem;\n  font-size: 0.875rem;\n}\n\n.pagination-sm .page-item:first-child .page-link {\n  border-bottom-left-radius: 0.2rem;\n  border-top-left-radius: 0.2rem;\n}\n\n.pagination-sm .page-item:last-child .page-link {\n  border-bottom-right-radius: 0.2rem;\n  border-top-right-radius: 0.2rem;\n}\n\n.badge {\n  display: inline-block;\n  padding: 0.25em 0.4em;\n  font-size: 75%;\n  font-weight: bold;\n  line-height: 1;\n  color: #fff;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: baseline;\n  border-radius: 0.25rem;\n}\n\n.badge:empty {\n  display: none;\n}\n\n.btn .badge {\n  position: relative;\n  top: -1px;\n}\n\na.badge:focus, a.badge:hover {\n  color: #fff;\n  text-decoration: none;\n  cursor: pointer;\n}\n\n.badge-pill {\n  padding-right: 0.6em;\n  padding-left: 0.6em;\n  border-radius: 10rem;\n}\n\n.badge-default {\n  background-color: #636c72;\n}\n\n.badge-default[href]:focus, .badge-default[href]:hover {\n  background-color: #4b5257;\n}\n\n.badge-primary {\n  background-color: #0275d8;\n}\n\n.badge-primary[href]:focus, .badge-primary[href]:hover {\n  background-color: #025aa5;\n}\n\n.badge-success {\n  background-color: #5cb85c;\n}\n\n.badge-success[href]:focus, .badge-success[href]:hover {\n  background-color: #449d44;\n}\n\n.badge-info {\n  background-color: #5bc0de;\n}\n\n.badge-info[href]:focus, .badge-info[href]:hover {\n  background-color: #31b0d5;\n}\n\n.badge-warning {\n  background-color: #f0ad4e;\n}\n\n.badge-warning[href]:focus, .badge-warning[href]:hover {\n  background-color: #ec971f;\n}\n\n.badge-danger {\n  background-color: #d9534f;\n}\n\n.badge-danger[href]:focus, .badge-danger[href]:hover {\n  background-color: #c9302c;\n}\n\n.jumbotron {\n  padding: 2rem 1rem;\n  margin-bottom: 2rem;\n  background-color: #eceeef;\n  border-radius: 0.3rem;\n}\n\n@media (min-width: 576px) {\n  .jumbotron {\n    padding: 4rem 2rem;\n  }\n}\n\n.jumbotron-hr {\n  border-top-color: #d0d5d8;\n}\n\n.jumbotron-fluid {\n  padding-right: 0;\n  padding-left: 0;\n  border-radius: 0;\n}\n\n.alert {\n  padding: 0.75rem 1.25rem;\n  margin-bottom: 1rem;\n  border: 1px solid transparent;\n  border-radius: 0.25rem;\n}\n\n.alert-heading {\n  color: inherit;\n}\n\n.alert-link {\n  font-weight: bold;\n}\n\n.alert-dismissible .close {\n  position: relative;\n  top: -0.75rem;\n  right: -1.25rem;\n  padding: 0.75rem 1.25rem;\n  color: inherit;\n}\n\n.alert-success {\n  background-color: #dff0d8;\n  border-color: #d0e9c6;\n  color: #3c763d;\n}\n\n.alert-success hr {\n  border-top-color: #c1e2b3;\n}\n\n.alert-success .alert-link {\n  color: #2b542c;\n}\n\n.alert-info {\n  background-color: #d9edf7;\n  border-color: #bcdff1;\n  color: #31708f;\n}\n\n.alert-info hr {\n  border-top-color: #a6d5ec;\n}\n\n.alert-info .alert-link {\n  color: #245269;\n}\n\n.alert-warning {\n  background-color: #fcf8e3;\n  border-color: #faf2cc;\n  color: #8a6d3b;\n}\n\n.alert-warning hr {\n  border-top-color: #f7ecb5;\n}\n\n.alert-warning .alert-link {\n  color: #66512c;\n}\n\n.alert-danger {\n  background-color: #f2dede;\n  border-color: #ebcccc;\n  color: #a94442;\n}\n\n.alert-danger hr {\n  border-top-color: #e4b9b9;\n}\n\n.alert-danger .alert-link {\n  color: #843534;\n}\n\n@-webkit-keyframes progress-bar-stripes {\n  from {\n    background-position: 1rem 0;\n  }\n  to {\n    background-position: 0 0;\n  }\n}\n\n@-o-keyframes progress-bar-stripes {\n  from {\n    background-position: 1rem 0;\n  }\n  to {\n    background-position: 0 0;\n  }\n}\n\n@keyframes progress-bar-stripes {\n  from {\n    background-position: 1rem 0;\n  }\n  to {\n    background-position: 0 0;\n  }\n}\n\n.progress {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  overflow: hidden;\n  font-size: 0.75rem;\n  line-height: 1rem;\n  text-align: center;\n  background-color: #eceeef;\n  border-radius: 0.25rem;\n}\n\n.progress-bar {\n  height: 1rem;\n  color: #fff;\n  background-color: #0275d8;\n}\n\n.progress-bar-striped {\n  background-image: -webkit-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: -o-linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent);\n  -webkit-background-size: 1rem 1rem;\n          background-size: 1rem 1rem;\n}\n\n.progress-bar-animated {\n  -webkit-animation: progress-bar-stripes 1s linear infinite;\n       -o-animation: progress-bar-stripes 1s linear infinite;\n          animation: progress-bar-stripes 1s linear infinite;\n}\n\n.media {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: start;\n  -webkit-align-items: flex-start;\n      -ms-flex-align: start;\n          align-items: flex-start;\n}\n\n.media-body {\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 0%;\n      -ms-flex: 1 1 0%;\n          flex: 1 1 0%;\n}\n\n.list-group {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  padding-left: 0;\n  margin-bottom: 0;\n}\n\n.list-group-item-action {\n  width: 100%;\n  color: #464a4c;\n  text-align: inherit;\n}\n\n.list-group-item-action .list-group-item-heading {\n  color: #292b2c;\n}\n\n.list-group-item-action:focus, .list-group-item-action:hover {\n  color: #464a4c;\n  text-decoration: none;\n  background-color: #f7f7f9;\n}\n\n.list-group-item-action:active {\n  color: #292b2c;\n  background-color: #eceeef;\n}\n\n.list-group-item {\n  position: relative;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-flex-flow: row wrap;\n      -ms-flex-flow: row wrap;\n          flex-flow: row wrap;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  padding: 0.75rem 1.25rem;\n  margin-bottom: -1px;\n  background-color: #fff;\n  border: 1px solid rgba(0, 0, 0, 0.125);\n}\n\n.list-group-item:first-child {\n  border-top-right-radius: 0.25rem;\n  border-top-left-radius: 0.25rem;\n}\n\n.list-group-item:last-child {\n  margin-bottom: 0;\n  border-bottom-right-radius: 0.25rem;\n  border-bottom-left-radius: 0.25rem;\n}\n\n.list-group-item:focus, .list-group-item:hover {\n  text-decoration: none;\n}\n\n.list-group-item.disabled, .list-group-item:disabled {\n  color: #636c72;\n  cursor: not-allowed;\n  background-color: #fff;\n}\n\n.list-group-item.disabled .list-group-item-heading, .list-group-item:disabled .list-group-item-heading {\n  color: inherit;\n}\n\n.list-group-item.disabled .list-group-item-text, .list-group-item:disabled .list-group-item-text {\n  color: #636c72;\n}\n\n.list-group-item.active {\n  z-index: 2;\n  color: #fff;\n  background-color: #0275d8;\n  border-color: #0275d8;\n}\n\n.list-group-item.active .list-group-item-heading,\n.list-group-item.active .list-group-item-heading > small,\n.list-group-item.active .list-group-item-heading > .small {\n  color: inherit;\n}\n\n.list-group-item.active .list-group-item-text {\n  color: #daeeff;\n}\n\n.list-group-flush .list-group-item {\n  border-right: 0;\n  border-left: 0;\n  border-radius: 0;\n}\n\n.list-group-flush:first-child .list-group-item:first-child {\n  border-top: 0;\n}\n\n.list-group-flush:last-child .list-group-item:last-child {\n  border-bottom: 0;\n}\n\n.list-group-item-success {\n  color: #3c763d;\n  background-color: #dff0d8;\n}\n\na.list-group-item-success,\nbutton.list-group-item-success {\n  color: #3c763d;\n}\n\na.list-group-item-success .list-group-item-heading,\nbutton.list-group-item-success .list-group-item-heading {\n  color: inherit;\n}\n\na.list-group-item-success:focus, a.list-group-item-success:hover,\nbutton.list-group-item-success:focus,\nbutton.list-group-item-success:hover {\n  color: #3c763d;\n  background-color: #d0e9c6;\n}\n\na.list-group-item-success.active,\nbutton.list-group-item-success.active {\n  color: #fff;\n  background-color: #3c763d;\n  border-color: #3c763d;\n}\n\n.list-group-item-info {\n  color: #31708f;\n  background-color: #d9edf7;\n}\n\na.list-group-item-info,\nbutton.list-group-item-info {\n  color: #31708f;\n}\n\na.list-group-item-info .list-group-item-heading,\nbutton.list-group-item-info .list-group-item-heading {\n  color: inherit;\n}\n\na.list-group-item-info:focus, a.list-group-item-info:hover,\nbutton.list-group-item-info:focus,\nbutton.list-group-item-info:hover {\n  color: #31708f;\n  background-color: #c4e3f3;\n}\n\na.list-group-item-info.active,\nbutton.list-group-item-info.active {\n  color: #fff;\n  background-color: #31708f;\n  border-color: #31708f;\n}\n\n.list-group-item-warning {\n  color: #8a6d3b;\n  background-color: #fcf8e3;\n}\n\na.list-group-item-warning,\nbutton.list-group-item-warning {\n  color: #8a6d3b;\n}\n\na.list-group-item-warning .list-group-item-heading,\nbutton.list-group-item-warning .list-group-item-heading {\n  color: inherit;\n}\n\na.list-group-item-warning:focus, a.list-group-item-warning:hover,\nbutton.list-group-item-warning:focus,\nbutton.list-group-item-warning:hover {\n  color: #8a6d3b;\n  background-color: #faf2cc;\n}\n\na.list-group-item-warning.active,\nbutton.list-group-item-warning.active {\n  color: #fff;\n  background-color: #8a6d3b;\n  border-color: #8a6d3b;\n}\n\n.list-group-item-danger {\n  color: #a94442;\n  background-color: #f2dede;\n}\n\na.list-group-item-danger,\nbutton.list-group-item-danger {\n  color: #a94442;\n}\n\na.list-group-item-danger .list-group-item-heading,\nbutton.list-group-item-danger .list-group-item-heading {\n  color: inherit;\n}\n\na.list-group-item-danger:focus, a.list-group-item-danger:hover,\nbutton.list-group-item-danger:focus,\nbutton.list-group-item-danger:hover {\n  color: #a94442;\n  background-color: #ebcccc;\n}\n\na.list-group-item-danger.active,\nbutton.list-group-item-danger.active {\n  color: #fff;\n  background-color: #a94442;\n  border-color: #a94442;\n}\n\n.embed-responsive {\n  position: relative;\n  display: block;\n  width: 100%;\n  padding: 0;\n  overflow: hidden;\n}\n\n.embed-responsive::before {\n  display: block;\n  content: \"\";\n}\n\n.embed-responsive .embed-responsive-item,\n.embed-responsive iframe,\n.embed-responsive embed,\n.embed-responsive object,\n.embed-responsive video {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  border: 0;\n}\n\n.embed-responsive-21by9::before {\n  padding-top: 42.857143%;\n}\n\n.embed-responsive-16by9::before {\n  padding-top: 56.25%;\n}\n\n.embed-responsive-4by3::before {\n  padding-top: 75%;\n}\n\n.embed-responsive-1by1::before {\n  padding-top: 100%;\n}\n\n.close {\n  float: right;\n  font-size: 1.5rem;\n  font-weight: bold;\n  line-height: 1;\n  color: #000;\n  text-shadow: 0 1px 0 #fff;\n  opacity: .5;\n}\n\n.close:focus, .close:hover {\n  color: #000;\n  text-decoration: none;\n  cursor: pointer;\n  opacity: .75;\n}\n\nbutton.close {\n  padding: 0;\n  cursor: pointer;\n  background: transparent;\n  border: 0;\n  -webkit-appearance: none;\n}\n\n.modal-open {\n  overflow: hidden;\n}\n\n.modal {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1050;\n  display: none;\n  overflow: hidden;\n  outline: 0;\n}\n\n.modal.fade .modal-dialog {\n  -webkit-transition: -webkit-transform 0.3s ease-out;\n  transition: -webkit-transform 0.3s ease-out;\n  -o-transition: -o-transform 0.3s ease-out;\n  transition: transform 0.3s ease-out;\n  transition: transform 0.3s ease-out, -webkit-transform 0.3s ease-out, -o-transform 0.3s ease-out;\n  -webkit-transform: translate(0, -25%);\n       -o-transform: translate(0, -25%);\n          transform: translate(0, -25%);\n}\n\n.modal.show .modal-dialog {\n  -webkit-transform: translate(0, 0);\n       -o-transform: translate(0, 0);\n          transform: translate(0, 0);\n}\n\n.modal-open .modal {\n  overflow-x: hidden;\n  overflow-y: auto;\n}\n\n.modal-dialog {\n  position: relative;\n  width: auto;\n  margin: 10px;\n}\n\n.modal-content {\n  position: relative;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n      -ms-flex-direction: column;\n          flex-direction: column;\n  background-color: #fff;\n  -webkit-background-clip: padding-box;\n          background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border-radius: 0.3rem;\n  outline: 0;\n}\n\n.modal-backdrop {\n  position: fixed;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1040;\n  background-color: #000;\n}\n\n.modal-backdrop.fade {\n  opacity: 0;\n}\n\n.modal-backdrop.show {\n  opacity: 0.5;\n}\n\n.modal-header {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n  -webkit-justify-content: space-between;\n      -ms-flex-pack: justify;\n          justify-content: space-between;\n  padding: 15px;\n  border-bottom: 1px solid #eceeef;\n}\n\n.modal-title {\n  margin-bottom: 0;\n  line-height: 1.5;\n}\n\n.modal-body {\n  position: relative;\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 1 auto;\n      -ms-flex: 1 1 auto;\n          flex: 1 1 auto;\n  padding: 15px;\n}\n\n.modal-footer {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: end;\n  -webkit-justify-content: flex-end;\n      -ms-flex-pack: end;\n          justify-content: flex-end;\n  padding: 15px;\n  border-top: 1px solid #eceeef;\n}\n\n.modal-footer > :not(:first-child) {\n  margin-left: .25rem;\n}\n\n.modal-footer > :not(:last-child) {\n  margin-right: .25rem;\n}\n\n.modal-scrollbar-measure {\n  position: absolute;\n  top: -9999px;\n  width: 50px;\n  height: 50px;\n  overflow: scroll;\n}\n\n@media (min-width: 576px) {\n  .modal-dialog {\n    max-width: 500px;\n    margin: 30px auto;\n  }\n  .modal-sm {\n    max-width: 300px;\n  }\n}\n\n@media (min-width: 992px) {\n  .modal-lg {\n    max-width: 800px;\n  }\n}\n\n.tooltip {\n  position: absolute;\n  z-index: 1070;\n  display: block;\n  font-family: -apple-system, system-ui, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n  font-style: normal;\n  font-weight: normal;\n  letter-spacing: normal;\n  line-break: auto;\n  line-height: 1.5;\n  text-align: left;\n  text-align: start;\n  text-decoration: none;\n  text-shadow: none;\n  text-transform: none;\n  white-space: normal;\n  word-break: normal;\n  word-spacing: normal;\n  font-size: 0.875rem;\n  word-wrap: break-word;\n  opacity: 0;\n}\n\n.tooltip.show {\n  opacity: 0.9;\n}\n\n.tooltip.tooltip-top, .tooltip.bs-tether-element-attached-bottom {\n  padding: 5px 0;\n  margin-top: -3px;\n}\n\n.tooltip.tooltip-top .tooltip-inner::before, .tooltip.bs-tether-element-attached-bottom .tooltip-inner::before {\n  bottom: 0;\n  left: 50%;\n  margin-left: -5px;\n  content: \"\";\n  border-width: 5px 5px 0;\n  border-top-color: #000;\n}\n\n.tooltip.tooltip-right, .tooltip.bs-tether-element-attached-left {\n  padding: 0 5px;\n  margin-left: 3px;\n}\n\n.tooltip.tooltip-right .tooltip-inner::before, .tooltip.bs-tether-element-attached-left .tooltip-inner::before {\n  top: 50%;\n  left: 0;\n  margin-top: -5px;\n  content: \"\";\n  border-width: 5px 5px 5px 0;\n  border-right-color: #000;\n}\n\n.tooltip.tooltip-bottom, .tooltip.bs-tether-element-attached-top {\n  padding: 5px 0;\n  margin-top: 3px;\n}\n\n.tooltip.tooltip-bottom .tooltip-inner::before, .tooltip.bs-tether-element-attached-top .tooltip-inner::before {\n  top: 0;\n  left: 50%;\n  margin-left: -5px;\n  content: \"\";\n  border-width: 0 5px 5px;\n  border-bottom-color: #000;\n}\n\n.tooltip.tooltip-left, .tooltip.bs-tether-element-attached-right {\n  padding: 0 5px;\n  margin-left: -3px;\n}\n\n.tooltip.tooltip-left .tooltip-inner::before, .tooltip.bs-tether-element-attached-right .tooltip-inner::before {\n  top: 50%;\n  right: 0;\n  margin-top: -5px;\n  content: \"\";\n  border-width: 5px 0 5px 5px;\n  border-left-color: #000;\n}\n\n.tooltip-inner {\n  max-width: 200px;\n  padding: 3px 8px;\n  color: #fff;\n  text-align: center;\n  background-color: #000;\n  border-radius: 0.25rem;\n}\n\n.tooltip-inner::before {\n  position: absolute;\n  width: 0;\n  height: 0;\n  border-color: transparent;\n  border-style: solid;\n}\n\n.popover {\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 1060;\n  display: block;\n  max-width: 276px;\n  padding: 1px;\n  font-family: -apple-system, system-ui, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n  font-style: normal;\n  font-weight: normal;\n  letter-spacing: normal;\n  line-break: auto;\n  line-height: 1.5;\n  text-align: left;\n  text-align: start;\n  text-decoration: none;\n  text-shadow: none;\n  text-transform: none;\n  white-space: normal;\n  word-break: normal;\n  word-spacing: normal;\n  font-size: 0.875rem;\n  word-wrap: break-word;\n  background-color: #fff;\n  -webkit-background-clip: padding-box;\n          background-clip: padding-box;\n  border: 1px solid rgba(0, 0, 0, 0.2);\n  border-radius: 0.3rem;\n}\n\n.popover.popover-top, .popover.bs-tether-element-attached-bottom {\n  margin-top: -10px;\n}\n\n.popover.popover-top::before, .popover.popover-top::after, .popover.bs-tether-element-attached-bottom::before, .popover.bs-tether-element-attached-bottom::after {\n  left: 50%;\n  border-bottom-width: 0;\n}\n\n.popover.popover-top::before, .popover.bs-tether-element-attached-bottom::before {\n  bottom: -11px;\n  margin-left: -11px;\n  border-top-color: rgba(0, 0, 0, 0.25);\n}\n\n.popover.popover-top::after, .popover.bs-tether-element-attached-bottom::after {\n  bottom: -10px;\n  margin-left: -10px;\n  border-top-color: #fff;\n}\n\n.popover.popover-right, .popover.bs-tether-element-attached-left {\n  margin-left: 10px;\n}\n\n.popover.popover-right::before, .popover.popover-right::after, .popover.bs-tether-element-attached-left::before, .popover.bs-tether-element-attached-left::after {\n  top: 50%;\n  border-left-width: 0;\n}\n\n.popover.popover-right::before, .popover.bs-tether-element-attached-left::before {\n  left: -11px;\n  margin-top: -11px;\n  border-right-color: rgba(0, 0, 0, 0.25);\n}\n\n.popover.popover-right::after, .popover.bs-tether-element-attached-left::after {\n  left: -10px;\n  margin-top: -10px;\n  border-right-color: #fff;\n}\n\n.popover.popover-bottom, .popover.bs-tether-element-attached-top {\n  margin-top: 10px;\n}\n\n.popover.popover-bottom::before, .popover.popover-bottom::after, .popover.bs-tether-element-attached-top::before, .popover.bs-tether-element-attached-top::after {\n  left: 50%;\n  border-top-width: 0;\n}\n\n.popover.popover-bottom::before, .popover.bs-tether-element-attached-top::before {\n  top: -11px;\n  margin-left: -11px;\n  border-bottom-color: rgba(0, 0, 0, 0.25);\n}\n\n.popover.popover-bottom::after, .popover.bs-tether-element-attached-top::after {\n  top: -10px;\n  margin-left: -10px;\n  border-bottom-color: #f7f7f7;\n}\n\n.popover.popover-bottom .popover-title::before, .popover.bs-tether-element-attached-top .popover-title::before {\n  position: absolute;\n  top: 0;\n  left: 50%;\n  display: block;\n  width: 20px;\n  margin-left: -10px;\n  content: \"\";\n  border-bottom: 1px solid #f7f7f7;\n}\n\n.popover.popover-left, .popover.bs-tether-element-attached-right {\n  margin-left: -10px;\n}\n\n.popover.popover-left::before, .popover.popover-left::after, .popover.bs-tether-element-attached-right::before, .popover.bs-tether-element-attached-right::after {\n  top: 50%;\n  border-right-width: 0;\n}\n\n.popover.popover-left::before, .popover.bs-tether-element-attached-right::before {\n  right: -11px;\n  margin-top: -11px;\n  border-left-color: rgba(0, 0, 0, 0.25);\n}\n\n.popover.popover-left::after, .popover.bs-tether-element-attached-right::after {\n  right: -10px;\n  margin-top: -10px;\n  border-left-color: #fff;\n}\n\n.popover-title {\n  padding: 8px 14px;\n  margin-bottom: 0;\n  font-size: 1rem;\n  background-color: #f7f7f7;\n  border-bottom: 1px solid #ebebeb;\n  border-top-right-radius: calc(0.3rem - 1px);\n  border-top-left-radius: calc(0.3rem - 1px);\n}\n\n.popover-title:empty {\n  display: none;\n}\n\n.popover-content {\n  padding: 9px 14px;\n}\n\n.popover::before,\n.popover::after {\n  position: absolute;\n  display: block;\n  width: 0;\n  height: 0;\n  border-color: transparent;\n  border-style: solid;\n}\n\n.popover::before {\n  content: \"\";\n  border-width: 11px;\n}\n\n.popover::after {\n  content: \"\";\n  border-width: 10px;\n}\n\n.carousel {\n  position: relative;\n}\n\n.carousel-inner {\n  position: relative;\n  width: 100%;\n  overflow: hidden;\n}\n\n.carousel-item {\n  position: relative;\n  display: none;\n  width: 100%;\n}\n\n@media (-webkit-transform-3d) {\n  .carousel-item {\n    -webkit-transition: -webkit-transform 0.6s ease-in-out;\n    transition: -webkit-transform 0.6s ease-in-out;\n    -o-transition: -o-transform 0.6s ease-in-out;\n    transition: transform 0.6s ease-in-out;\n    transition: transform 0.6s ease-in-out, -webkit-transform 0.6s ease-in-out, -o-transform 0.6s ease-in-out;\n    -webkit-backface-visibility: hidden;\n            backface-visibility: hidden;\n    -webkit-perspective: 1000px;\n            perspective: 1000px;\n  }\n}\n\n@supports ((-webkit-transform: translate3d(0, 0, 0)) or (transform: translate3d(0, 0, 0))) {\n  .carousel-item {\n    -webkit-transition: -webkit-transform 0.6s ease-in-out;\n    transition: -webkit-transform 0.6s ease-in-out;\n    -o-transition: -o-transform 0.6s ease-in-out;\n    transition: transform 0.6s ease-in-out;\n    transition: transform 0.6s ease-in-out, -webkit-transform 0.6s ease-in-out, -o-transform 0.6s ease-in-out;\n    -webkit-backface-visibility: hidden;\n            backface-visibility: hidden;\n    -webkit-perspective: 1000px;\n            perspective: 1000px;\n  }\n}\n\n.carousel-item.active,\n.carousel-item-next,\n.carousel-item-prev {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n}\n\n.carousel-item-next,\n.carousel-item-prev {\n  position: absolute;\n  top: 0;\n}\n\n@media (-webkit-transform-3d) {\n  .carousel-item-next.carousel-item-left,\n  .carousel-item-prev.carousel-item-right {\n    -webkit-transform: translate3d(0, 0, 0);\n            transform: translate3d(0, 0, 0);\n  }\n  .carousel-item-next,\n  .active.carousel-item-right {\n    -webkit-transform: translate3d(100%, 0, 0);\n            transform: translate3d(100%, 0, 0);\n  }\n  .carousel-item-prev,\n  .active.carousel-item-left {\n    -webkit-transform: translate3d(-100%, 0, 0);\n            transform: translate3d(-100%, 0, 0);\n  }\n}\n\n@supports ((-webkit-transform: translate3d(0, 0, 0)) or (transform: translate3d(0, 0, 0))) {\n  .carousel-item-next.carousel-item-left,\n  .carousel-item-prev.carousel-item-right {\n    -webkit-transform: translate3d(0, 0, 0);\n            transform: translate3d(0, 0, 0);\n  }\n  .carousel-item-next,\n  .active.carousel-item-right {\n    -webkit-transform: translate3d(100%, 0, 0);\n            transform: translate3d(100%, 0, 0);\n  }\n  .carousel-item-prev,\n  .active.carousel-item-left {\n    -webkit-transform: translate3d(-100%, 0, 0);\n            transform: translate3d(-100%, 0, 0);\n  }\n}\n\n.carousel-control-prev,\n.carousel-control-next {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n      -ms-flex-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  width: 15%;\n  color: #fff;\n  text-align: center;\n  opacity: 0.5;\n}\n\n.carousel-control-prev:focus, .carousel-control-prev:hover,\n.carousel-control-next:focus,\n.carousel-control-next:hover {\n  color: #fff;\n  text-decoration: none;\n  outline: 0;\n  opacity: .9;\n}\n\n.carousel-control-prev {\n  left: 0;\n}\n\n.carousel-control-next {\n  right: 0;\n}\n\n.carousel-control-prev-icon,\n.carousel-control-next-icon {\n  display: inline-block;\n  width: 20px;\n  height: 20px;\n  background: transparent no-repeat center center;\n  -webkit-background-size: 100% 100%;\n          background-size: 100% 100%;\n}\n\n.carousel-control-prev-icon {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' viewBox='0 0 8 8'%3E%3Cpath d='M4 0l-4 4 4 4 1.5-1.5-2.5-2.5 2.5-2.5-1.5-1.5z'/%3E%3C/svg%3E\");\n}\n\n.carousel-control-next-icon {\n  background-image: url(\"data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='%23fff' viewBox='0 0 8 8'%3E%3Cpath d='M1.5 0l-1.5 1.5 2.5 2.5-2.5 2.5 1.5 1.5 4-4-4-4z'/%3E%3C/svg%3E\");\n}\n\n.carousel-indicators {\n  position: absolute;\n  right: 0;\n  bottom: 10px;\n  left: 0;\n  z-index: 15;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  padding-left: 0;\n  margin-right: 15%;\n  margin-left: 15%;\n  list-style: none;\n}\n\n.carousel-indicators li {\n  position: relative;\n  -webkit-box-flex: 1;\n  -webkit-flex: 1 0 auto;\n      -ms-flex: 1 0 auto;\n          flex: 1 0 auto;\n  max-width: 30px;\n  height: 3px;\n  margin-right: 3px;\n  margin-left: 3px;\n  text-indent: -999px;\n  cursor: pointer;\n  background-color: rgba(255, 255, 255, 0.5);\n}\n\n.carousel-indicators li::before {\n  position: absolute;\n  top: -10px;\n  left: 0;\n  display: inline-block;\n  width: 100%;\n  height: 10px;\n  content: \"\";\n}\n\n.carousel-indicators li::after {\n  position: absolute;\n  bottom: -10px;\n  left: 0;\n  display: inline-block;\n  width: 100%;\n  height: 10px;\n  content: \"\";\n}\n\n.carousel-indicators .active {\n  background-color: #fff;\n}\n\n.carousel-caption {\n  position: absolute;\n  right: 15%;\n  bottom: 20px;\n  left: 15%;\n  z-index: 10;\n  padding-top: 20px;\n  padding-bottom: 20px;\n  color: #fff;\n  text-align: center;\n}\n\n.align-baseline {\n  vertical-align: baseline !important;\n}\n\n.align-top {\n  vertical-align: top !important;\n}\n\n.align-middle {\n  vertical-align: middle !important;\n}\n\n.align-bottom {\n  vertical-align: bottom !important;\n}\n\n.align-text-bottom {\n  vertical-align: text-bottom !important;\n}\n\n.align-text-top {\n  vertical-align: text-top !important;\n}\n\n.bg-faded {\n  background-color: #f7f7f7;\n}\n\n.bg-primary {\n  background-color: #0275d8 !important;\n}\n\na.bg-primary:focus, a.bg-primary:hover {\n  background-color: #025aa5 !important;\n}\n\n.bg-success {\n  background-color: #5cb85c !important;\n}\n\na.bg-success:focus, a.bg-success:hover {\n  background-color: #449d44 !important;\n}\n\n.bg-info {\n  background-color: #5bc0de !important;\n}\n\na.bg-info:focus, a.bg-info:hover {\n  background-color: #31b0d5 !important;\n}\n\n.bg-warning {\n  background-color: #f0ad4e !important;\n}\n\na.bg-warning:focus, a.bg-warning:hover {\n  background-color: #ec971f !important;\n}\n\n.bg-danger {\n  background-color: #d9534f !important;\n}\n\na.bg-danger:focus, a.bg-danger:hover {\n  background-color: #c9302c !important;\n}\n\n.bg-inverse {\n  background-color: #292b2c !important;\n}\n\na.bg-inverse:focus, a.bg-inverse:hover {\n  background-color: #101112 !important;\n}\n\n.border-0 {\n  border: 0 !important;\n}\n\n.border-top-0 {\n  border-top: 0 !important;\n}\n\n.border-right-0 {\n  border-right: 0 !important;\n}\n\n.border-bottom-0 {\n  border-bottom: 0 !important;\n}\n\n.border-left-0 {\n  border-left: 0 !important;\n}\n\n.rounded {\n  border-radius: 0.25rem;\n}\n\n.rounded-top {\n  border-top-right-radius: 0.25rem;\n  border-top-left-radius: 0.25rem;\n}\n\n.rounded-right {\n  border-bottom-right-radius: 0.25rem;\n  border-top-right-radius: 0.25rem;\n}\n\n.rounded-bottom {\n  border-bottom-right-radius: 0.25rem;\n  border-bottom-left-radius: 0.25rem;\n}\n\n.rounded-left {\n  border-bottom-left-radius: 0.25rem;\n  border-top-left-radius: 0.25rem;\n}\n\n.rounded-circle {\n  border-radius: 50%;\n}\n\n.rounded-0 {\n  border-radius: 0;\n}\n\n.clearfix::after {\n  display: block;\n  content: \"\";\n  clear: both;\n}\n\n.d-none {\n  display: none !important;\n}\n\n.d-inline {\n  display: inline !important;\n}\n\n.d-inline-block {\n  display: inline-block !important;\n}\n\n.d-block {\n  display: block !important;\n}\n\n.d-table {\n  display: table !important;\n}\n\n.d-table-cell {\n  display: table-cell !important;\n}\n\n.d-flex {\n  display: -webkit-box !important;\n  display: -webkit-flex !important;\n  display: -ms-flexbox !important;\n  display: flex !important;\n}\n\n.d-inline-flex {\n  display: -webkit-inline-box !important;\n  display: -webkit-inline-flex !important;\n  display: -ms-inline-flexbox !important;\n  display: inline-flex !important;\n}\n\n@media (min-width: 576px) {\n  .d-sm-none {\n    display: none !important;\n  }\n  .d-sm-inline {\n    display: inline !important;\n  }\n  .d-sm-inline-block {\n    display: inline-block !important;\n  }\n  .d-sm-block {\n    display: block !important;\n  }\n  .d-sm-table {\n    display: table !important;\n  }\n  .d-sm-table-cell {\n    display: table-cell !important;\n  }\n  .d-sm-flex {\n    display: -webkit-box !important;\n    display: -webkit-flex !important;\n    display: -ms-flexbox !important;\n    display: flex !important;\n  }\n  .d-sm-inline-flex {\n    display: -webkit-inline-box !important;\n    display: -webkit-inline-flex !important;\n    display: -ms-inline-flexbox !important;\n    display: inline-flex !important;\n  }\n}\n\n@media (min-width: 768px) {\n  .d-md-none {\n    display: none !important;\n  }\n  .d-md-inline {\n    display: inline !important;\n  }\n  .d-md-inline-block {\n    display: inline-block !important;\n  }\n  .d-md-block {\n    display: block !important;\n  }\n  .d-md-table {\n    display: table !important;\n  }\n  .d-md-table-cell {\n    display: table-cell !important;\n  }\n  .d-md-flex {\n    display: -webkit-box !important;\n    display: -webkit-flex !important;\n    display: -ms-flexbox !important;\n    display: flex !important;\n  }\n  .d-md-inline-flex {\n    display: -webkit-inline-box !important;\n    display: -webkit-inline-flex !important;\n    display: -ms-inline-flexbox !important;\n    display: inline-flex !important;\n  }\n}\n\n@media (min-width: 992px) {\n  .d-lg-none {\n    display: none !important;\n  }\n  .d-lg-inline {\n    display: inline !important;\n  }\n  .d-lg-inline-block {\n    display: inline-block !important;\n  }\n  .d-lg-block {\n    display: block !important;\n  }\n  .d-lg-table {\n    display: table !important;\n  }\n  .d-lg-table-cell {\n    display: table-cell !important;\n  }\n  .d-lg-flex {\n    display: -webkit-box !important;\n    display: -webkit-flex !important;\n    display: -ms-flexbox !important;\n    display: flex !important;\n  }\n  .d-lg-inline-flex {\n    display: -webkit-inline-box !important;\n    display: -webkit-inline-flex !important;\n    display: -ms-inline-flexbox !important;\n    display: inline-flex !important;\n  }\n}\n\n@media (min-width: 1200px) {\n  .d-xl-none {\n    display: none !important;\n  }\n  .d-xl-inline {\n    display: inline !important;\n  }\n  .d-xl-inline-block {\n    display: inline-block !important;\n  }\n  .d-xl-block {\n    display: block !important;\n  }\n  .d-xl-table {\n    display: table !important;\n  }\n  .d-xl-table-cell {\n    display: table-cell !important;\n  }\n  .d-xl-flex {\n    display: -webkit-box !important;\n    display: -webkit-flex !important;\n    display: -ms-flexbox !important;\n    display: flex !important;\n  }\n  .d-xl-inline-flex {\n    display: -webkit-inline-box !important;\n    display: -webkit-inline-flex !important;\n    display: -ms-inline-flexbox !important;\n    display: inline-flex !important;\n  }\n}\n\n.flex-first {\n  -webkit-box-ordinal-group: 0;\n  -webkit-order: -1;\n      -ms-flex-order: -1;\n          order: -1;\n}\n\n.flex-last {\n  -webkit-box-ordinal-group: 2;\n  -webkit-order: 1;\n      -ms-flex-order: 1;\n          order: 1;\n}\n\n.flex-unordered {\n  -webkit-box-ordinal-group: 1;\n  -webkit-order: 0;\n      -ms-flex-order: 0;\n          order: 0;\n}\n\n.flex-row {\n  -webkit-box-orient: horizontal !important;\n  -webkit-box-direction: normal !important;\n  -webkit-flex-direction: row !important;\n      -ms-flex-direction: row !important;\n          flex-direction: row !important;\n}\n\n.flex-column {\n  -webkit-box-orient: vertical !important;\n  -webkit-box-direction: normal !important;\n  -webkit-flex-direction: column !important;\n      -ms-flex-direction: column !important;\n          flex-direction: column !important;\n}\n\n.flex-row-reverse {\n  -webkit-box-orient: horizontal !important;\n  -webkit-box-direction: reverse !important;\n  -webkit-flex-direction: row-reverse !important;\n      -ms-flex-direction: row-reverse !important;\n          flex-direction: row-reverse !important;\n}\n\n.flex-column-reverse {\n  -webkit-box-orient: vertical !important;\n  -webkit-box-direction: reverse !important;\n  -webkit-flex-direction: column-reverse !important;\n      -ms-flex-direction: column-reverse !important;\n          flex-direction: column-reverse !important;\n}\n\n.flex-wrap {\n  -webkit-flex-wrap: wrap !important;\n      -ms-flex-wrap: wrap !important;\n          flex-wrap: wrap !important;\n}\n\n.flex-nowrap {\n  -webkit-flex-wrap: nowrap !important;\n      -ms-flex-wrap: nowrap !important;\n          flex-wrap: nowrap !important;\n}\n\n.flex-wrap-reverse {\n  -webkit-flex-wrap: wrap-reverse !important;\n      -ms-flex-wrap: wrap-reverse !important;\n          flex-wrap: wrap-reverse !important;\n}\n\n.justify-content-start {\n  -webkit-box-pack: start !important;\n  -webkit-justify-content: flex-start !important;\n      -ms-flex-pack: start !important;\n          justify-content: flex-start !important;\n}\n\n.justify-content-end {\n  -webkit-box-pack: end !important;\n  -webkit-justify-content: flex-end !important;\n      -ms-flex-pack: end !important;\n          justify-content: flex-end !important;\n}\n\n.justify-content-center {\n  -webkit-box-pack: center !important;\n  -webkit-justify-content: center !important;\n      -ms-flex-pack: center !important;\n          justify-content: center !important;\n}\n\n.justify-content-between {\n  -webkit-box-pack: justify !important;\n  -webkit-justify-content: space-between !important;\n      -ms-flex-pack: justify !important;\n          justify-content: space-between !important;\n}\n\n.justify-content-around {\n  -webkit-justify-content: space-around !important;\n      -ms-flex-pack: distribute !important;\n          justify-content: space-around !important;\n}\n\n.align-items-start {\n  -webkit-box-align: start !important;\n  -webkit-align-items: flex-start !important;\n      -ms-flex-align: start !important;\n          align-items: flex-start !important;\n}\n\n.align-items-end {\n  -webkit-box-align: end !important;\n  -webkit-align-items: flex-end !important;\n      -ms-flex-align: end !important;\n          align-items: flex-end !important;\n}\n\n.align-items-center {\n  -webkit-box-align: center !important;\n  -webkit-align-items: center !important;\n      -ms-flex-align: center !important;\n          align-items: center !important;\n}\n\n.align-items-baseline {\n  -webkit-box-align: baseline !important;\n  -webkit-align-items: baseline !important;\n      -ms-flex-align: baseline !important;\n          align-items: baseline !important;\n}\n\n.align-items-stretch {\n  -webkit-box-align: stretch !important;\n  -webkit-align-items: stretch !important;\n      -ms-flex-align: stretch !important;\n          align-items: stretch !important;\n}\n\n.align-content-start {\n  -webkit-align-content: flex-start !important;\n      -ms-flex-line-pack: start !important;\n          align-content: flex-start !important;\n}\n\n.align-content-end {\n  -webkit-align-content: flex-end !important;\n      -ms-flex-line-pack: end !important;\n          align-content: flex-end !important;\n}\n\n.align-content-center {\n  -webkit-align-content: center !important;\n      -ms-flex-line-pack: center !important;\n          align-content: center !important;\n}\n\n.align-content-between {\n  -webkit-align-content: space-between !important;\n      -ms-flex-line-pack: justify !important;\n          align-content: space-between !important;\n}\n\n.align-content-around {\n  -webkit-align-content: space-around !important;\n      -ms-flex-line-pack: distribute !important;\n          align-content: space-around !important;\n}\n\n.align-content-stretch {\n  -webkit-align-content: stretch !important;\n      -ms-flex-line-pack: stretch !important;\n          align-content: stretch !important;\n}\n\n.align-self-auto {\n  -webkit-align-self: auto !important;\n      -ms-flex-item-align: auto !important;\n              -ms-grid-row-align: auto !important;\n          align-self: auto !important;\n}\n\n.align-self-start {\n  -webkit-align-self: flex-start !important;\n      -ms-flex-item-align: start !important;\n          align-self: flex-start !important;\n}\n\n.align-self-end {\n  -webkit-align-self: flex-end !important;\n      -ms-flex-item-align: end !important;\n          align-self: flex-end !important;\n}\n\n.align-self-center {\n  -webkit-align-self: center !important;\n      -ms-flex-item-align: center !important;\n              -ms-grid-row-align: center !important;\n          align-self: center !important;\n}\n\n.align-self-baseline {\n  -webkit-align-self: baseline !important;\n      -ms-flex-item-align: baseline !important;\n          align-self: baseline !important;\n}\n\n.align-self-stretch {\n  -webkit-align-self: stretch !important;\n      -ms-flex-item-align: stretch !important;\n              -ms-grid-row-align: stretch !important;\n          align-self: stretch !important;\n}\n\n@media (min-width: 576px) {\n  .flex-sm-first {\n    -webkit-box-ordinal-group: 0;\n    -webkit-order: -1;\n        -ms-flex-order: -1;\n            order: -1;\n  }\n  .flex-sm-last {\n    -webkit-box-ordinal-group: 2;\n    -webkit-order: 1;\n        -ms-flex-order: 1;\n            order: 1;\n  }\n  .flex-sm-unordered {\n    -webkit-box-ordinal-group: 1;\n    -webkit-order: 0;\n        -ms-flex-order: 0;\n            order: 0;\n  }\n  .flex-sm-row {\n    -webkit-box-orient: horizontal !important;\n    -webkit-box-direction: normal !important;\n    -webkit-flex-direction: row !important;\n        -ms-flex-direction: row !important;\n            flex-direction: row !important;\n  }\n  .flex-sm-column {\n    -webkit-box-orient: vertical !important;\n    -webkit-box-direction: normal !important;\n    -webkit-flex-direction: column !important;\n        -ms-flex-direction: column !important;\n            flex-direction: column !important;\n  }\n  .flex-sm-row-reverse {\n    -webkit-box-orient: horizontal !important;\n    -webkit-box-direction: reverse !important;\n    -webkit-flex-direction: row-reverse !important;\n        -ms-flex-direction: row-reverse !important;\n            flex-direction: row-reverse !important;\n  }\n  .flex-sm-column-reverse {\n    -webkit-box-orient: vertical !important;\n    -webkit-box-direction: reverse !important;\n    -webkit-flex-direction: column-reverse !important;\n        -ms-flex-direction: column-reverse !important;\n            flex-direction: column-reverse !important;\n  }\n  .flex-sm-wrap {\n    -webkit-flex-wrap: wrap !important;\n        -ms-flex-wrap: wrap !important;\n            flex-wrap: wrap !important;\n  }\n  .flex-sm-nowrap {\n    -webkit-flex-wrap: nowrap !important;\n        -ms-flex-wrap: nowrap !important;\n            flex-wrap: nowrap !important;\n  }\n  .flex-sm-wrap-reverse {\n    -webkit-flex-wrap: wrap-reverse !important;\n        -ms-flex-wrap: wrap-reverse !important;\n            flex-wrap: wrap-reverse !important;\n  }\n  .justify-content-sm-start {\n    -webkit-box-pack: start !important;\n    -webkit-justify-content: flex-start !important;\n        -ms-flex-pack: start !important;\n            justify-content: flex-start !important;\n  }\n  .justify-content-sm-end {\n    -webkit-box-pack: end !important;\n    -webkit-justify-content: flex-end !important;\n        -ms-flex-pack: end !important;\n            justify-content: flex-end !important;\n  }\n  .justify-content-sm-center {\n    -webkit-box-pack: center !important;\n    -webkit-justify-content: center !important;\n        -ms-flex-pack: center !important;\n            justify-content: center !important;\n  }\n  .justify-content-sm-between {\n    -webkit-box-pack: justify !important;\n    -webkit-justify-content: space-between !important;\n        -ms-flex-pack: justify !important;\n            justify-content: space-between !important;\n  }\n  .justify-content-sm-around {\n    -webkit-justify-content: space-around !important;\n        -ms-flex-pack: distribute !important;\n            justify-content: space-around !important;\n  }\n  .align-items-sm-start {\n    -webkit-box-align: start !important;\n    -webkit-align-items: flex-start !important;\n        -ms-flex-align: start !important;\n            align-items: flex-start !important;\n  }\n  .align-items-sm-end {\n    -webkit-box-align: end !important;\n    -webkit-align-items: flex-end !important;\n        -ms-flex-align: end !important;\n            align-items: flex-end !important;\n  }\n  .align-items-sm-center {\n    -webkit-box-align: center !important;\n    -webkit-align-items: center !important;\n        -ms-flex-align: center !important;\n            align-items: center !important;\n  }\n  .align-items-sm-baseline {\n    -webkit-box-align: baseline !important;\n    -webkit-align-items: baseline !important;\n        -ms-flex-align: baseline !important;\n            align-items: baseline !important;\n  }\n  .align-items-sm-stretch {\n    -webkit-box-align: stretch !important;\n    -webkit-align-items: stretch !important;\n        -ms-flex-align: stretch !important;\n            align-items: stretch !important;\n  }\n  .align-content-sm-start {\n    -webkit-align-content: flex-start !important;\n        -ms-flex-line-pack: start !important;\n            align-content: flex-start !important;\n  }\n  .align-content-sm-end {\n    -webkit-align-content: flex-end !important;\n        -ms-flex-line-pack: end !important;\n            align-content: flex-end !important;\n  }\n  .align-content-sm-center {\n    -webkit-align-content: center !important;\n        -ms-flex-line-pack: center !important;\n            align-content: center !important;\n  }\n  .align-content-sm-between {\n    -webkit-align-content: space-between !important;\n        -ms-flex-line-pack: justify !important;\n            align-content: space-between !important;\n  }\n  .align-content-sm-around {\n    -webkit-align-content: space-around !important;\n        -ms-flex-line-pack: distribute !important;\n            align-content: space-around !important;\n  }\n  .align-content-sm-stretch {\n    -webkit-align-content: stretch !important;\n        -ms-flex-line-pack: stretch !important;\n            align-content: stretch !important;\n  }\n  .align-self-sm-auto {\n    -webkit-align-self: auto !important;\n        -ms-flex-item-align: auto !important;\n                -ms-grid-row-align: auto !important;\n            align-self: auto !important;\n  }\n  .align-self-sm-start {\n    -webkit-align-self: flex-start !important;\n        -ms-flex-item-align: start !important;\n            align-self: flex-start !important;\n  }\n  .align-self-sm-end {\n    -webkit-align-self: flex-end !important;\n        -ms-flex-item-align: end !important;\n            align-self: flex-end !important;\n  }\n  .align-self-sm-center {\n    -webkit-align-self: center !important;\n        -ms-flex-item-align: center !important;\n                -ms-grid-row-align: center !important;\n            align-self: center !important;\n  }\n  .align-self-sm-baseline {\n    -webkit-align-self: baseline !important;\n        -ms-flex-item-align: baseline !important;\n            align-self: baseline !important;\n  }\n  .align-self-sm-stretch {\n    -webkit-align-self: stretch !important;\n        -ms-flex-item-align: stretch !important;\n                -ms-grid-row-align: stretch !important;\n            align-self: stretch !important;\n  }\n}\n\n@media (min-width: 768px) {\n  .flex-md-first {\n    -webkit-box-ordinal-group: 0;\n    -webkit-order: -1;\n        -ms-flex-order: -1;\n            order: -1;\n  }\n  .flex-md-last {\n    -webkit-box-ordinal-group: 2;\n    -webkit-order: 1;\n        -ms-flex-order: 1;\n            order: 1;\n  }\n  .flex-md-unordered {\n    -webkit-box-ordinal-group: 1;\n    -webkit-order: 0;\n        -ms-flex-order: 0;\n            order: 0;\n  }\n  .flex-md-row {\n    -webkit-box-orient: horizontal !important;\n    -webkit-box-direction: normal !important;\n    -webkit-flex-direction: row !important;\n        -ms-flex-direction: row !important;\n            flex-direction: row !important;\n  }\n  .flex-md-column {\n    -webkit-box-orient: vertical !important;\n    -webkit-box-direction: normal !important;\n    -webkit-flex-direction: column !important;\n        -ms-flex-direction: column !important;\n            flex-direction: column !important;\n  }\n  .flex-md-row-reverse {\n    -webkit-box-orient: horizontal !important;\n    -webkit-box-direction: reverse !important;\n    -webkit-flex-direction: row-reverse !important;\n        -ms-flex-direction: row-reverse !important;\n            flex-direction: row-reverse !important;\n  }\n  .flex-md-column-reverse {\n    -webkit-box-orient: vertical !important;\n    -webkit-box-direction: reverse !important;\n    -webkit-flex-direction: column-reverse !important;\n        -ms-flex-direction: column-reverse !important;\n            flex-direction: column-reverse !important;\n  }\n  .flex-md-wrap {\n    -webkit-flex-wrap: wrap !important;\n        -ms-flex-wrap: wrap !important;\n            flex-wrap: wrap !important;\n  }\n  .flex-md-nowrap {\n    -webkit-flex-wrap: nowrap !important;\n        -ms-flex-wrap: nowrap !important;\n            flex-wrap: nowrap !important;\n  }\n  .flex-md-wrap-reverse {\n    -webkit-flex-wrap: wrap-reverse !important;\n        -ms-flex-wrap: wrap-reverse !important;\n            flex-wrap: wrap-reverse !important;\n  }\n  .justify-content-md-start {\n    -webkit-box-pack: start !important;\n    -webkit-justify-content: flex-start !important;\n        -ms-flex-pack: start !important;\n            justify-content: flex-start !important;\n  }\n  .justify-content-md-end {\n    -webkit-box-pack: end !important;\n    -webkit-justify-content: flex-end !important;\n        -ms-flex-pack: end !important;\n            justify-content: flex-end !important;\n  }\n  .justify-content-md-center {\n    -webkit-box-pack: center !important;\n    -webkit-justify-content: center !important;\n        -ms-flex-pack: center !important;\n            justify-content: center !important;\n  }\n  .justify-content-md-between {\n    -webkit-box-pack: justify !important;\n    -webkit-justify-content: space-between !important;\n        -ms-flex-pack: justify !important;\n            justify-content: space-between !important;\n  }\n  .justify-content-md-around {\n    -webkit-justify-content: space-around !important;\n        -ms-flex-pack: distribute !important;\n            justify-content: space-around !important;\n  }\n  .align-items-md-start {\n    -webkit-box-align: start !important;\n    -webkit-align-items: flex-start !important;\n        -ms-flex-align: start !important;\n            align-items: flex-start !important;\n  }\n  .align-items-md-end {\n    -webkit-box-align: end !important;\n    -webkit-align-items: flex-end !important;\n        -ms-flex-align: end !important;\n            align-items: flex-end !important;\n  }\n  .align-items-md-center {\n    -webkit-box-align: center !important;\n    -webkit-align-items: center !important;\n        -ms-flex-align: center !important;\n            align-items: center !important;\n  }\n  .align-items-md-baseline {\n    -webkit-box-align: baseline !important;\n    -webkit-align-items: baseline !important;\n        -ms-flex-align: baseline !important;\n            align-items: baseline !important;\n  }\n  .align-items-md-stretch {\n    -webkit-box-align: stretch !important;\n    -webkit-align-items: stretch !important;\n        -ms-flex-align: stretch !important;\n            align-items: stretch !important;\n  }\n  .align-content-md-start {\n    -webkit-align-content: flex-start !important;\n        -ms-flex-line-pack: start !important;\n            align-content: flex-start !important;\n  }\n  .align-content-md-end {\n    -webkit-align-content: flex-end !important;\n        -ms-flex-line-pack: end !important;\n            align-content: flex-end !important;\n  }\n  .align-content-md-center {\n    -webkit-align-content: center !important;\n        -ms-flex-line-pack: center !important;\n            align-content: center !important;\n  }\n  .align-content-md-between {\n    -webkit-align-content: space-between !important;\n        -ms-flex-line-pack: justify !important;\n            align-content: space-between !important;\n  }\n  .align-content-md-around {\n    -webkit-align-content: space-around !important;\n        -ms-flex-line-pack: distribute !important;\n            align-content: space-around !important;\n  }\n  .align-content-md-stretch {\n    -webkit-align-content: stretch !important;\n        -ms-flex-line-pack: stretch !important;\n            align-content: stretch !important;\n  }\n  .align-self-md-auto {\n    -webkit-align-self: auto !important;\n        -ms-flex-item-align: auto !important;\n                -ms-grid-row-align: auto !important;\n            align-self: auto !important;\n  }\n  .align-self-md-start {\n    -webkit-align-self: flex-start !important;\n        -ms-flex-item-align: start !important;\n            align-self: flex-start !important;\n  }\n  .align-self-md-end {\n    -webkit-align-self: flex-end !important;\n        -ms-flex-item-align: end !important;\n            align-self: flex-end !important;\n  }\n  .align-self-md-center {\n    -webkit-align-self: center !important;\n        -ms-flex-item-align: center !important;\n                -ms-grid-row-align: center !important;\n            align-self: center !important;\n  }\n  .align-self-md-baseline {\n    -webkit-align-self: baseline !important;\n        -ms-flex-item-align: baseline !important;\n            align-self: baseline !important;\n  }\n  .align-self-md-stretch {\n    -webkit-align-self: stretch !important;\n        -ms-flex-item-align: stretch !important;\n                -ms-grid-row-align: stretch !important;\n            align-self: stretch !important;\n  }\n}\n\n@media (min-width: 992px) {\n  .flex-lg-first {\n    -webkit-box-ordinal-group: 0;\n    -webkit-order: -1;\n        -ms-flex-order: -1;\n            order: -1;\n  }\n  .flex-lg-last {\n    -webkit-box-ordinal-group: 2;\n    -webkit-order: 1;\n        -ms-flex-order: 1;\n            order: 1;\n  }\n  .flex-lg-unordered {\n    -webkit-box-ordinal-group: 1;\n    -webkit-order: 0;\n        -ms-flex-order: 0;\n            order: 0;\n  }\n  .flex-lg-row {\n    -webkit-box-orient: horizontal !important;\n    -webkit-box-direction: normal !important;\n    -webkit-flex-direction: row !important;\n        -ms-flex-direction: row !important;\n            flex-direction: row !important;\n  }\n  .flex-lg-column {\n    -webkit-box-orient: vertical !important;\n    -webkit-box-direction: normal !important;\n    -webkit-flex-direction: column !important;\n        -ms-flex-direction: column !important;\n            flex-direction: column !important;\n  }\n  .flex-lg-row-reverse {\n    -webkit-box-orient: horizontal !important;\n    -webkit-box-direction: reverse !important;\n    -webkit-flex-direction: row-reverse !important;\n        -ms-flex-direction: row-reverse !important;\n            flex-direction: row-reverse !important;\n  }\n  .flex-lg-column-reverse {\n    -webkit-box-orient: vertical !important;\n    -webkit-box-direction: reverse !important;\n    -webkit-flex-direction: column-reverse !important;\n        -ms-flex-direction: column-reverse !important;\n            flex-direction: column-reverse !important;\n  }\n  .flex-lg-wrap {\n    -webkit-flex-wrap: wrap !important;\n        -ms-flex-wrap: wrap !important;\n            flex-wrap: wrap !important;\n  }\n  .flex-lg-nowrap {\n    -webkit-flex-wrap: nowrap !important;\n        -ms-flex-wrap: nowrap !important;\n            flex-wrap: nowrap !important;\n  }\n  .flex-lg-wrap-reverse {\n    -webkit-flex-wrap: wrap-reverse !important;\n        -ms-flex-wrap: wrap-reverse !important;\n            flex-wrap: wrap-reverse !important;\n  }\n  .justify-content-lg-start {\n    -webkit-box-pack: start !important;\n    -webkit-justify-content: flex-start !important;\n        -ms-flex-pack: start !important;\n            justify-content: flex-start !important;\n  }\n  .justify-content-lg-end {\n    -webkit-box-pack: end !important;\n    -webkit-justify-content: flex-end !important;\n        -ms-flex-pack: end !important;\n            justify-content: flex-end !important;\n  }\n  .justify-content-lg-center {\n    -webkit-box-pack: center !important;\n    -webkit-justify-content: center !important;\n        -ms-flex-pack: center !important;\n            justify-content: center !important;\n  }\n  .justify-content-lg-between {\n    -webkit-box-pack: justify !important;\n    -webkit-justify-content: space-between !important;\n        -ms-flex-pack: justify !important;\n            justify-content: space-between !important;\n  }\n  .justify-content-lg-around {\n    -webkit-justify-content: space-around !important;\n        -ms-flex-pack: distribute !important;\n            justify-content: space-around !important;\n  }\n  .align-items-lg-start {\n    -webkit-box-align: start !important;\n    -webkit-align-items: flex-start !important;\n        -ms-flex-align: start !important;\n            align-items: flex-start !important;\n  }\n  .align-items-lg-end {\n    -webkit-box-align: end !important;\n    -webkit-align-items: flex-end !important;\n        -ms-flex-align: end !important;\n            align-items: flex-end !important;\n  }\n  .align-items-lg-center {\n    -webkit-box-align: center !important;\n    -webkit-align-items: center !important;\n        -ms-flex-align: center !important;\n            align-items: center !important;\n  }\n  .align-items-lg-baseline {\n    -webkit-box-align: baseline !important;\n    -webkit-align-items: baseline !important;\n        -ms-flex-align: baseline !important;\n            align-items: baseline !important;\n  }\n  .align-items-lg-stretch {\n    -webkit-box-align: stretch !important;\n    -webkit-align-items: stretch !important;\n        -ms-flex-align: stretch !important;\n            align-items: stretch !important;\n  }\n  .align-content-lg-start {\n    -webkit-align-content: flex-start !important;\n        -ms-flex-line-pack: start !important;\n            align-content: flex-start !important;\n  }\n  .align-content-lg-end {\n    -webkit-align-content: flex-end !important;\n        -ms-flex-line-pack: end !important;\n            align-content: flex-end !important;\n  }\n  .align-content-lg-center {\n    -webkit-align-content: center !important;\n        -ms-flex-line-pack: center !important;\n            align-content: center !important;\n  }\n  .align-content-lg-between {\n    -webkit-align-content: space-between !important;\n        -ms-flex-line-pack: justify !important;\n            align-content: space-between !important;\n  }\n  .align-content-lg-around {\n    -webkit-align-content: space-around !important;\n        -ms-flex-line-pack: distribute !important;\n            align-content: space-around !important;\n  }\n  .align-content-lg-stretch {\n    -webkit-align-content: stretch !important;\n        -ms-flex-line-pack: stretch !important;\n            align-content: stretch !important;\n  }\n  .align-self-lg-auto {\n    -webkit-align-self: auto !important;\n        -ms-flex-item-align: auto !important;\n                -ms-grid-row-align: auto !important;\n            align-self: auto !important;\n  }\n  .align-self-lg-start {\n    -webkit-align-self: flex-start !important;\n        -ms-flex-item-align: start !important;\n            align-self: flex-start !important;\n  }\n  .align-self-lg-end {\n    -webkit-align-self: flex-end !important;\n        -ms-flex-item-align: end !important;\n            align-self: flex-end !important;\n  }\n  .align-self-lg-center {\n    -webkit-align-self: center !important;\n        -ms-flex-item-align: center !important;\n                -ms-grid-row-align: center !important;\n            align-self: center !important;\n  }\n  .align-self-lg-baseline {\n    -webkit-align-self: baseline !important;\n        -ms-flex-item-align: baseline !important;\n            align-self: baseline !important;\n  }\n  .align-self-lg-stretch {\n    -webkit-align-self: stretch !important;\n        -ms-flex-item-align: stretch !important;\n                -ms-grid-row-align: stretch !important;\n            align-self: stretch !important;\n  }\n}\n\n@media (min-width: 1200px) {\n  .flex-xl-first {\n    -webkit-box-ordinal-group: 0;\n    -webkit-order: -1;\n        -ms-flex-order: -1;\n            order: -1;\n  }\n  .flex-xl-last {\n    -webkit-box-ordinal-group: 2;\n    -webkit-order: 1;\n        -ms-flex-order: 1;\n            order: 1;\n  }\n  .flex-xl-unordered {\n    -webkit-box-ordinal-group: 1;\n    -webkit-order: 0;\n        -ms-flex-order: 0;\n            order: 0;\n  }\n  .flex-xl-row {\n    -webkit-box-orient: horizontal !important;\n    -webkit-box-direction: normal !important;\n    -webkit-flex-direction: row !important;\n        -ms-flex-direction: row !important;\n            flex-direction: row !important;\n  }\n  .flex-xl-column {\n    -webkit-box-orient: vertical !important;\n    -webkit-box-direction: normal !important;\n    -webkit-flex-direction: column !important;\n        -ms-flex-direction: column !important;\n            flex-direction: column !important;\n  }\n  .flex-xl-row-reverse {\n    -webkit-box-orient: horizontal !important;\n    -webkit-box-direction: reverse !important;\n    -webkit-flex-direction: row-reverse !important;\n        -ms-flex-direction: row-reverse !important;\n            flex-direction: row-reverse !important;\n  }\n  .flex-xl-column-reverse {\n    -webkit-box-orient: vertical !important;\n    -webkit-box-direction: reverse !important;\n    -webkit-flex-direction: column-reverse !important;\n        -ms-flex-direction: column-reverse !important;\n            flex-direction: column-reverse !important;\n  }\n  .flex-xl-wrap {\n    -webkit-flex-wrap: wrap !important;\n        -ms-flex-wrap: wrap !important;\n            flex-wrap: wrap !important;\n  }\n  .flex-xl-nowrap {\n    -webkit-flex-wrap: nowrap !important;\n        -ms-flex-wrap: nowrap !important;\n            flex-wrap: nowrap !important;\n  }\n  .flex-xl-wrap-reverse {\n    -webkit-flex-wrap: wrap-reverse !important;\n        -ms-flex-wrap: wrap-reverse !important;\n            flex-wrap: wrap-reverse !important;\n  }\n  .justify-content-xl-start {\n    -webkit-box-pack: start !important;\n    -webkit-justify-content: flex-start !important;\n        -ms-flex-pack: start !important;\n            justify-content: flex-start !important;\n  }\n  .justify-content-xl-end {\n    -webkit-box-pack: end !important;\n    -webkit-justify-content: flex-end !important;\n        -ms-flex-pack: end !important;\n            justify-content: flex-end !important;\n  }\n  .justify-content-xl-center {\n    -webkit-box-pack: center !important;\n    -webkit-justify-content: center !important;\n        -ms-flex-pack: center !important;\n            justify-content: center !important;\n  }\n  .justify-content-xl-between {\n    -webkit-box-pack: justify !important;\n    -webkit-justify-content: space-between !important;\n        -ms-flex-pack: justify !important;\n            justify-content: space-between !important;\n  }\n  .justify-content-xl-around {\n    -webkit-justify-content: space-around !important;\n        -ms-flex-pack: distribute !important;\n            justify-content: space-around !important;\n  }\n  .align-items-xl-start {\n    -webkit-box-align: start !important;\n    -webkit-align-items: flex-start !important;\n        -ms-flex-align: start !important;\n            align-items: flex-start !important;\n  }\n  .align-items-xl-end {\n    -webkit-box-align: end !important;\n    -webkit-align-items: flex-end !important;\n        -ms-flex-align: end !important;\n            align-items: flex-end !important;\n  }\n  .align-items-xl-center {\n    -webkit-box-align: center !important;\n    -webkit-align-items: center !important;\n        -ms-flex-align: center !important;\n            align-items: center !important;\n  }\n  .align-items-xl-baseline {\n    -webkit-box-align: baseline !important;\n    -webkit-align-items: baseline !important;\n        -ms-flex-align: baseline !important;\n            align-items: baseline !important;\n  }\n  .align-items-xl-stretch {\n    -webkit-box-align: stretch !important;\n    -webkit-align-items: stretch !important;\n        -ms-flex-align: stretch !important;\n            align-items: stretch !important;\n  }\n  .align-content-xl-start {\n    -webkit-align-content: flex-start !important;\n        -ms-flex-line-pack: start !important;\n            align-content: flex-start !important;\n  }\n  .align-content-xl-end {\n    -webkit-align-content: flex-end !important;\n        -ms-flex-line-pack: end !important;\n            align-content: flex-end !important;\n  }\n  .align-content-xl-center {\n    -webkit-align-content: center !important;\n        -ms-flex-line-pack: center !important;\n            align-content: center !important;\n  }\n  .align-content-xl-between {\n    -webkit-align-content: space-between !important;\n        -ms-flex-line-pack: justify !important;\n            align-content: space-between !important;\n  }\n  .align-content-xl-around {\n    -webkit-align-content: space-around !important;\n        -ms-flex-line-pack: distribute !important;\n            align-content: space-around !important;\n  }\n  .align-content-xl-stretch {\n    -webkit-align-content: stretch !important;\n        -ms-flex-line-pack: stretch !important;\n            align-content: stretch !important;\n  }\n  .align-self-xl-auto {\n    -webkit-align-self: auto !important;\n        -ms-flex-item-align: auto !important;\n                -ms-grid-row-align: auto !important;\n            align-self: auto !important;\n  }\n  .align-self-xl-start {\n    -webkit-align-self: flex-start !important;\n        -ms-flex-item-align: start !important;\n            align-self: flex-start !important;\n  }\n  .align-self-xl-end {\n    -webkit-align-self: flex-end !important;\n        -ms-flex-item-align: end !important;\n            align-self: flex-end !important;\n  }\n  .align-self-xl-center {\n    -webkit-align-self: center !important;\n        -ms-flex-item-align: center !important;\n                -ms-grid-row-align: center !important;\n            align-self: center !important;\n  }\n  .align-self-xl-baseline {\n    -webkit-align-self: baseline !important;\n        -ms-flex-item-align: baseline !important;\n            align-self: baseline !important;\n  }\n  .align-self-xl-stretch {\n    -webkit-align-self: stretch !important;\n        -ms-flex-item-align: stretch !important;\n                -ms-grid-row-align: stretch !important;\n            align-self: stretch !important;\n  }\n}\n\n.float-left {\n  float: left !important;\n}\n\n.float-right {\n  float: right !important;\n}\n\n.float-none {\n  float: none !important;\n}\n\n@media (min-width: 576px) {\n  .float-sm-left {\n    float: left !important;\n  }\n  .float-sm-right {\n    float: right !important;\n  }\n  .float-sm-none {\n    float: none !important;\n  }\n}\n\n@media (min-width: 768px) {\n  .float-md-left {\n    float: left !important;\n  }\n  .float-md-right {\n    float: right !important;\n  }\n  .float-md-none {\n    float: none !important;\n  }\n}\n\n@media (min-width: 992px) {\n  .float-lg-left {\n    float: left !important;\n  }\n  .float-lg-right {\n    float: right !important;\n  }\n  .float-lg-none {\n    float: none !important;\n  }\n}\n\n@media (min-width: 1200px) {\n  .float-xl-left {\n    float: left !important;\n  }\n  .float-xl-right {\n    float: right !important;\n  }\n  .float-xl-none {\n    float: none !important;\n  }\n}\n\n.fixed-top {\n  position: fixed;\n  top: 0;\n  right: 0;\n  left: 0;\n  z-index: 1030;\n}\n\n.fixed-bottom {\n  position: fixed;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  z-index: 1030;\n}\n\n.sticky-top {\n  position: -webkit-sticky;\n  position: sticky;\n  top: 0;\n  z-index: 1030;\n}\n\n.sr-only {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  padding: 0;\n  margin: -1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0);\n  border: 0;\n}\n\n.sr-only-focusable:active, .sr-only-focusable:focus {\n  position: static;\n  width: auto;\n  height: auto;\n  margin: 0;\n  overflow: visible;\n  clip: auto;\n}\n\n.w-25 {\n  width: 25% !important;\n}\n\n.w-50 {\n  width: 50% !important;\n}\n\n.w-75 {\n  width: 75% !important;\n}\n\n.w-100 {\n  width: 100% !important;\n}\n\n.h-25 {\n  height: 25% !important;\n}\n\n.h-50 {\n  height: 50% !important;\n}\n\n.h-75 {\n  height: 75% !important;\n}\n\n.h-100 {\n  height: 100% !important;\n}\n\n.mw-100 {\n  max-width: 100% !important;\n}\n\n.mh-100 {\n  max-height: 100% !important;\n}\n\n.m-0 {\n  margin: 0 0 !important;\n}\n\n.mt-0 {\n  margin-top: 0 !important;\n}\n\n.mr-0 {\n  margin-right: 0 !important;\n}\n\n.mb-0 {\n  margin-bottom: 0 !important;\n}\n\n.ml-0 {\n  margin-left: 0 !important;\n}\n\n.mx-0 {\n  margin-right: 0 !important;\n  margin-left: 0 !important;\n}\n\n.my-0 {\n  margin-top: 0 !important;\n  margin-bottom: 0 !important;\n}\n\n.m-1 {\n  margin: 0.25rem 0.25rem !important;\n}\n\n.mt-1 {\n  margin-top: 0.25rem !important;\n}\n\n.mr-1 {\n  margin-right: 0.25rem !important;\n}\n\n.mb-1 {\n  margin-bottom: 0.25rem !important;\n}\n\n.ml-1 {\n  margin-left: 0.25rem !important;\n}\n\n.mx-1 {\n  margin-right: 0.25rem !important;\n  margin-left: 0.25rem !important;\n}\n\n.my-1 {\n  margin-top: 0.25rem !important;\n  margin-bottom: 0.25rem !important;\n}\n\n.m-2 {\n  margin: 0.5rem 0.5rem !important;\n}\n\n.mt-2 {\n  margin-top: 0.5rem !important;\n}\n\n.mr-2 {\n  margin-right: 0.5rem !important;\n}\n\n.mb-2 {\n  margin-bottom: 0.5rem !important;\n}\n\n.ml-2 {\n  margin-left: 0.5rem !important;\n}\n\n.mx-2 {\n  margin-right: 0.5rem !important;\n  margin-left: 0.5rem !important;\n}\n\n.my-2 {\n  margin-top: 0.5rem !important;\n  margin-bottom: 0.5rem !important;\n}\n\n.m-3 {\n  margin: 1rem 1rem !important;\n}\n\n.mt-3 {\n  margin-top: 1rem !important;\n}\n\n.mr-3 {\n  margin-right: 1rem !important;\n}\n\n.mb-3 {\n  margin-bottom: 1rem !important;\n}\n\n.ml-3 {\n  margin-left: 1rem !important;\n}\n\n.mx-3 {\n  margin-right: 1rem !important;\n  margin-left: 1rem !important;\n}\n\n.my-3 {\n  margin-top: 1rem !important;\n  margin-bottom: 1rem !important;\n}\n\n.m-4 {\n  margin: 1.5rem 1.5rem !important;\n}\n\n.mt-4 {\n  margin-top: 1.5rem !important;\n}\n\n.mr-4 {\n  margin-right: 1.5rem !important;\n}\n\n.mb-4 {\n  margin-bottom: 1.5rem !important;\n}\n\n.ml-4 {\n  margin-left: 1.5rem !important;\n}\n\n.mx-4 {\n  margin-right: 1.5rem !important;\n  margin-left: 1.5rem !important;\n}\n\n.my-4 {\n  margin-top: 1.5rem !important;\n  margin-bottom: 1.5rem !important;\n}\n\n.m-5 {\n  margin: 3rem 3rem !important;\n}\n\n.mt-5 {\n  margin-top: 3rem !important;\n}\n\n.mr-5 {\n  margin-right: 3rem !important;\n}\n\n.mb-5 {\n  margin-bottom: 3rem !important;\n}\n\n.ml-5 {\n  margin-left: 3rem !important;\n}\n\n.mx-5 {\n  margin-right: 3rem !important;\n  margin-left: 3rem !important;\n}\n\n.my-5 {\n  margin-top: 3rem !important;\n  margin-bottom: 3rem !important;\n}\n\n.p-0 {\n  padding: 0 0 !important;\n}\n\n.pt-0 {\n  padding-top: 0 !important;\n}\n\n.pr-0 {\n  padding-right: 0 !important;\n}\n\n.pb-0 {\n  padding-bottom: 0 !important;\n}\n\n.pl-0 {\n  padding-left: 0 !important;\n}\n\n.px-0 {\n  padding-right: 0 !important;\n  padding-left: 0 !important;\n}\n\n.py-0 {\n  padding-top: 0 !important;\n  padding-bottom: 0 !important;\n}\n\n.p-1 {\n  padding: 0.25rem 0.25rem !important;\n}\n\n.pt-1 {\n  padding-top: 0.25rem !important;\n}\n\n.pr-1 {\n  padding-right: 0.25rem !important;\n}\n\n.pb-1 {\n  padding-bottom: 0.25rem !important;\n}\n\n.pl-1 {\n  padding-left: 0.25rem !important;\n}\n\n.px-1 {\n  padding-right: 0.25rem !important;\n  padding-left: 0.25rem !important;\n}\n\n.py-1 {\n  padding-top: 0.25rem !important;\n  padding-bottom: 0.25rem !important;\n}\n\n.p-2 {\n  padding: 0.5rem 0.5rem !important;\n}\n\n.pt-2 {\n  padding-top: 0.5rem !important;\n}\n\n.pr-2 {\n  padding-right: 0.5rem !important;\n}\n\n.pb-2 {\n  padding-bottom: 0.5rem !important;\n}\n\n.pl-2 {\n  padding-left: 0.5rem !important;\n}\n\n.px-2 {\n  padding-right: 0.5rem !important;\n  padding-left: 0.5rem !important;\n}\n\n.py-2 {\n  padding-top: 0.5rem !important;\n  padding-bottom: 0.5rem !important;\n}\n\n.p-3 {\n  padding: 1rem 1rem !important;\n}\n\n.pt-3 {\n  padding-top: 1rem !important;\n}\n\n.pr-3 {\n  padding-right: 1rem !important;\n}\n\n.pb-3 {\n  padding-bottom: 1rem !important;\n}\n\n.pl-3 {\n  padding-left: 1rem !important;\n}\n\n.px-3 {\n  padding-right: 1rem !important;\n  padding-left: 1rem !important;\n}\n\n.py-3 {\n  padding-top: 1rem !important;\n  padding-bottom: 1rem !important;\n}\n\n.p-4 {\n  padding: 1.5rem 1.5rem !important;\n}\n\n.pt-4 {\n  padding-top: 1.5rem !important;\n}\n\n.pr-4 {\n  padding-right: 1.5rem !important;\n}\n\n.pb-4 {\n  padding-bottom: 1.5rem !important;\n}\n\n.pl-4 {\n  padding-left: 1.5rem !important;\n}\n\n.px-4 {\n  padding-right: 1.5rem !important;\n  padding-left: 1.5rem !important;\n}\n\n.py-4 {\n  padding-top: 1.5rem !important;\n  padding-bottom: 1.5rem !important;\n}\n\n.p-5 {\n  padding: 3rem 3rem !important;\n}\n\n.pt-5 {\n  padding-top: 3rem !important;\n}\n\n.pr-5 {\n  padding-right: 3rem !important;\n}\n\n.pb-5 {\n  padding-bottom: 3rem !important;\n}\n\n.pl-5 {\n  padding-left: 3rem !important;\n}\n\n.px-5 {\n  padding-right: 3rem !important;\n  padding-left: 3rem !important;\n}\n\n.py-5 {\n  padding-top: 3rem !important;\n  padding-bottom: 3rem !important;\n}\n\n.m-auto {\n  margin: auto !important;\n}\n\n.mt-auto {\n  margin-top: auto !important;\n}\n\n.mr-auto {\n  margin-right: auto !important;\n}\n\n.mb-auto {\n  margin-bottom: auto !important;\n}\n\n.ml-auto {\n  margin-left: auto !important;\n}\n\n.mx-auto {\n  margin-right: auto !important;\n  margin-left: auto !important;\n}\n\n.my-auto {\n  margin-top: auto !important;\n  margin-bottom: auto !important;\n}\n\n@media (min-width: 576px) {\n  .m-sm-0 {\n    margin: 0 0 !important;\n  }\n  .mt-sm-0 {\n    margin-top: 0 !important;\n  }\n  .mr-sm-0 {\n    margin-right: 0 !important;\n  }\n  .mb-sm-0 {\n    margin-bottom: 0 !important;\n  }\n  .ml-sm-0 {\n    margin-left: 0 !important;\n  }\n  .mx-sm-0 {\n    margin-right: 0 !important;\n    margin-left: 0 !important;\n  }\n  .my-sm-0 {\n    margin-top: 0 !important;\n    margin-bottom: 0 !important;\n  }\n  .m-sm-1 {\n    margin: 0.25rem 0.25rem !important;\n  }\n  .mt-sm-1 {\n    margin-top: 0.25rem !important;\n  }\n  .mr-sm-1 {\n    margin-right: 0.25rem !important;\n  }\n  .mb-sm-1 {\n    margin-bottom: 0.25rem !important;\n  }\n  .ml-sm-1 {\n    margin-left: 0.25rem !important;\n  }\n  .mx-sm-1 {\n    margin-right: 0.25rem !important;\n    margin-left: 0.25rem !important;\n  }\n  .my-sm-1 {\n    margin-top: 0.25rem !important;\n    margin-bottom: 0.25rem !important;\n  }\n  .m-sm-2 {\n    margin: 0.5rem 0.5rem !important;\n  }\n  .mt-sm-2 {\n    margin-top: 0.5rem !important;\n  }\n  .mr-sm-2 {\n    margin-right: 0.5rem !important;\n  }\n  .mb-sm-2 {\n    margin-bottom: 0.5rem !important;\n  }\n  .ml-sm-2 {\n    margin-left: 0.5rem !important;\n  }\n  .mx-sm-2 {\n    margin-right: 0.5rem !important;\n    margin-left: 0.5rem !important;\n  }\n  .my-sm-2 {\n    margin-top: 0.5rem !important;\n    margin-bottom: 0.5rem !important;\n  }\n  .m-sm-3 {\n    margin: 1rem 1rem !important;\n  }\n  .mt-sm-3 {\n    margin-top: 1rem !important;\n  }\n  .mr-sm-3 {\n    margin-right: 1rem !important;\n  }\n  .mb-sm-3 {\n    margin-bottom: 1rem !important;\n  }\n  .ml-sm-3 {\n    margin-left: 1rem !important;\n  }\n  .mx-sm-3 {\n    margin-right: 1rem !important;\n    margin-left: 1rem !important;\n  }\n  .my-sm-3 {\n    margin-top: 1rem !important;\n    margin-bottom: 1rem !important;\n  }\n  .m-sm-4 {\n    margin: 1.5rem 1.5rem !important;\n  }\n  .mt-sm-4 {\n    margin-top: 1.5rem !important;\n  }\n  .mr-sm-4 {\n    margin-right: 1.5rem !important;\n  }\n  .mb-sm-4 {\n    margin-bottom: 1.5rem !important;\n  }\n  .ml-sm-4 {\n    margin-left: 1.5rem !important;\n  }\n  .mx-sm-4 {\n    margin-right: 1.5rem !important;\n    margin-left: 1.5rem !important;\n  }\n  .my-sm-4 {\n    margin-top: 1.5rem !important;\n    margin-bottom: 1.5rem !important;\n  }\n  .m-sm-5 {\n    margin: 3rem 3rem !important;\n  }\n  .mt-sm-5 {\n    margin-top: 3rem !important;\n  }\n  .mr-sm-5 {\n    margin-right: 3rem !important;\n  }\n  .mb-sm-5 {\n    margin-bottom: 3rem !important;\n  }\n  .ml-sm-5 {\n    margin-left: 3rem !important;\n  }\n  .mx-sm-5 {\n    margin-right: 3rem !important;\n    margin-left: 3rem !important;\n  }\n  .my-sm-5 {\n    margin-top: 3rem !important;\n    margin-bottom: 3rem !important;\n  }\n  .p-sm-0 {\n    padding: 0 0 !important;\n  }\n  .pt-sm-0 {\n    padding-top: 0 !important;\n  }\n  .pr-sm-0 {\n    padding-right: 0 !important;\n  }\n  .pb-sm-0 {\n    padding-bottom: 0 !important;\n  }\n  .pl-sm-0 {\n    padding-left: 0 !important;\n  }\n  .px-sm-0 {\n    padding-right: 0 !important;\n    padding-left: 0 !important;\n  }\n  .py-sm-0 {\n    padding-top: 0 !important;\n    padding-bottom: 0 !important;\n  }\n  .p-sm-1 {\n    padding: 0.25rem 0.25rem !important;\n  }\n  .pt-sm-1 {\n    padding-top: 0.25rem !important;\n  }\n  .pr-sm-1 {\n    padding-right: 0.25rem !important;\n  }\n  .pb-sm-1 {\n    padding-bottom: 0.25rem !important;\n  }\n  .pl-sm-1 {\n    padding-left: 0.25rem !important;\n  }\n  .px-sm-1 {\n    padding-right: 0.25rem !important;\n    padding-left: 0.25rem !important;\n  }\n  .py-sm-1 {\n    padding-top: 0.25rem !important;\n    padding-bottom: 0.25rem !important;\n  }\n  .p-sm-2 {\n    padding: 0.5rem 0.5rem !important;\n  }\n  .pt-sm-2 {\n    padding-top: 0.5rem !important;\n  }\n  .pr-sm-2 {\n    padding-right: 0.5rem !important;\n  }\n  .pb-sm-2 {\n    padding-bottom: 0.5rem !important;\n  }\n  .pl-sm-2 {\n    padding-left: 0.5rem !important;\n  }\n  .px-sm-2 {\n    padding-right: 0.5rem !important;\n    padding-left: 0.5rem !important;\n  }\n  .py-sm-2 {\n    padding-top: 0.5rem !important;\n    padding-bottom: 0.5rem !important;\n  }\n  .p-sm-3 {\n    padding: 1rem 1rem !important;\n  }\n  .pt-sm-3 {\n    padding-top: 1rem !important;\n  }\n  .pr-sm-3 {\n    padding-right: 1rem !important;\n  }\n  .pb-sm-3 {\n    padding-bottom: 1rem !important;\n  }\n  .pl-sm-3 {\n    padding-left: 1rem !important;\n  }\n  .px-sm-3 {\n    padding-right: 1rem !important;\n    padding-left: 1rem !important;\n  }\n  .py-sm-3 {\n    padding-top: 1rem !important;\n    padding-bottom: 1rem !important;\n  }\n  .p-sm-4 {\n    padding: 1.5rem 1.5rem !important;\n  }\n  .pt-sm-4 {\n    padding-top: 1.5rem !important;\n  }\n  .pr-sm-4 {\n    padding-right: 1.5rem !important;\n  }\n  .pb-sm-4 {\n    padding-bottom: 1.5rem !important;\n  }\n  .pl-sm-4 {\n    padding-left: 1.5rem !important;\n  }\n  .px-sm-4 {\n    padding-right: 1.5rem !important;\n    padding-left: 1.5rem !important;\n  }\n  .py-sm-4 {\n    padding-top: 1.5rem !important;\n    padding-bottom: 1.5rem !important;\n  }\n  .p-sm-5 {\n    padding: 3rem 3rem !important;\n  }\n  .pt-sm-5 {\n    padding-top: 3rem !important;\n  }\n  .pr-sm-5 {\n    padding-right: 3rem !important;\n  }\n  .pb-sm-5 {\n    padding-bottom: 3rem !important;\n  }\n  .pl-sm-5 {\n    padding-left: 3rem !important;\n  }\n  .px-sm-5 {\n    padding-right: 3rem !important;\n    padding-left: 3rem !important;\n  }\n  .py-sm-5 {\n    padding-top: 3rem !important;\n    padding-bottom: 3rem !important;\n  }\n  .m-sm-auto {\n    margin: auto !important;\n  }\n  .mt-sm-auto {\n    margin-top: auto !important;\n  }\n  .mr-sm-auto {\n    margin-right: auto !important;\n  }\n  .mb-sm-auto {\n    margin-bottom: auto !important;\n  }\n  .ml-sm-auto {\n    margin-left: auto !important;\n  }\n  .mx-sm-auto {\n    margin-right: auto !important;\n    margin-left: auto !important;\n  }\n  .my-sm-auto {\n    margin-top: auto !important;\n    margin-bottom: auto !important;\n  }\n}\n\n@media (min-width: 768px) {\n  .m-md-0 {\n    margin: 0 0 !important;\n  }\n  .mt-md-0 {\n    margin-top: 0 !important;\n  }\n  .mr-md-0 {\n    margin-right: 0 !important;\n  }\n  .mb-md-0 {\n    margin-bottom: 0 !important;\n  }\n  .ml-md-0 {\n    margin-left: 0 !important;\n  }\n  .mx-md-0 {\n    margin-right: 0 !important;\n    margin-left: 0 !important;\n  }\n  .my-md-0 {\n    margin-top: 0 !important;\n    margin-bottom: 0 !important;\n  }\n  .m-md-1 {\n    margin: 0.25rem 0.25rem !important;\n  }\n  .mt-md-1 {\n    margin-top: 0.25rem !important;\n  }\n  .mr-md-1 {\n    margin-right: 0.25rem !important;\n  }\n  .mb-md-1 {\n    margin-bottom: 0.25rem !important;\n  }\n  .ml-md-1 {\n    margin-left: 0.25rem !important;\n  }\n  .mx-md-1 {\n    margin-right: 0.25rem !important;\n    margin-left: 0.25rem !important;\n  }\n  .my-md-1 {\n    margin-top: 0.25rem !important;\n    margin-bottom: 0.25rem !important;\n  }\n  .m-md-2 {\n    margin: 0.5rem 0.5rem !important;\n  }\n  .mt-md-2 {\n    margin-top: 0.5rem !important;\n  }\n  .mr-md-2 {\n    margin-right: 0.5rem !important;\n  }\n  .mb-md-2 {\n    margin-bottom: 0.5rem !important;\n  }\n  .ml-md-2 {\n    margin-left: 0.5rem !important;\n  }\n  .mx-md-2 {\n    margin-right: 0.5rem !important;\n    margin-left: 0.5rem !important;\n  }\n  .my-md-2 {\n    margin-top: 0.5rem !important;\n    margin-bottom: 0.5rem !important;\n  }\n  .m-md-3 {\n    margin: 1rem 1rem !important;\n  }\n  .mt-md-3 {\n    margin-top: 1rem !important;\n  }\n  .mr-md-3 {\n    margin-right: 1rem !important;\n  }\n  .mb-md-3 {\n    margin-bottom: 1rem !important;\n  }\n  .ml-md-3 {\n    margin-left: 1rem !important;\n  }\n  .mx-md-3 {\n    margin-right: 1rem !important;\n    margin-left: 1rem !important;\n  }\n  .my-md-3 {\n    margin-top: 1rem !important;\n    margin-bottom: 1rem !important;\n  }\n  .m-md-4 {\n    margin: 1.5rem 1.5rem !important;\n  }\n  .mt-md-4 {\n    margin-top: 1.5rem !important;\n  }\n  .mr-md-4 {\n    margin-right: 1.5rem !important;\n  }\n  .mb-md-4 {\n    margin-bottom: 1.5rem !important;\n  }\n  .ml-md-4 {\n    margin-left: 1.5rem !important;\n  }\n  .mx-md-4 {\n    margin-right: 1.5rem !important;\n    margin-left: 1.5rem !important;\n  }\n  .my-md-4 {\n    margin-top: 1.5rem !important;\n    margin-bottom: 1.5rem !important;\n  }\n  .m-md-5 {\n    margin: 3rem 3rem !important;\n  }\n  .mt-md-5 {\n    margin-top: 3rem !important;\n  }\n  .mr-md-5 {\n    margin-right: 3rem !important;\n  }\n  .mb-md-5 {\n    margin-bottom: 3rem !important;\n  }\n  .ml-md-5 {\n    margin-left: 3rem !important;\n  }\n  .mx-md-5 {\n    margin-right: 3rem !important;\n    margin-left: 3rem !important;\n  }\n  .my-md-5 {\n    margin-top: 3rem !important;\n    margin-bottom: 3rem !important;\n  }\n  .p-md-0 {\n    padding: 0 0 !important;\n  }\n  .pt-md-0 {\n    padding-top: 0 !important;\n  }\n  .pr-md-0 {\n    padding-right: 0 !important;\n  }\n  .pb-md-0 {\n    padding-bottom: 0 !important;\n  }\n  .pl-md-0 {\n    padding-left: 0 !important;\n  }\n  .px-md-0 {\n    padding-right: 0 !important;\n    padding-left: 0 !important;\n  }\n  .py-md-0 {\n    padding-top: 0 !important;\n    padding-bottom: 0 !important;\n  }\n  .p-md-1 {\n    padding: 0.25rem 0.25rem !important;\n  }\n  .pt-md-1 {\n    padding-top: 0.25rem !important;\n  }\n  .pr-md-1 {\n    padding-right: 0.25rem !important;\n  }\n  .pb-md-1 {\n    padding-bottom: 0.25rem !important;\n  }\n  .pl-md-1 {\n    padding-left: 0.25rem !important;\n  }\n  .px-md-1 {\n    padding-right: 0.25rem !important;\n    padding-left: 0.25rem !important;\n  }\n  .py-md-1 {\n    padding-top: 0.25rem !important;\n    padding-bottom: 0.25rem !important;\n  }\n  .p-md-2 {\n    padding: 0.5rem 0.5rem !important;\n  }\n  .pt-md-2 {\n    padding-top: 0.5rem !important;\n  }\n  .pr-md-2 {\n    padding-right: 0.5rem !important;\n  }\n  .pb-md-2 {\n    padding-bottom: 0.5rem !important;\n  }\n  .pl-md-2 {\n    padding-left: 0.5rem !important;\n  }\n  .px-md-2 {\n    padding-right: 0.5rem !important;\n    padding-left: 0.5rem !important;\n  }\n  .py-md-2 {\n    padding-top: 0.5rem !important;\n    padding-bottom: 0.5rem !important;\n  }\n  .p-md-3 {\n    padding: 1rem 1rem !important;\n  }\n  .pt-md-3 {\n    padding-top: 1rem !important;\n  }\n  .pr-md-3 {\n    padding-right: 1rem !important;\n  }\n  .pb-md-3 {\n    padding-bottom: 1rem !important;\n  }\n  .pl-md-3 {\n    padding-left: 1rem !important;\n  }\n  .px-md-3 {\n    padding-right: 1rem !important;\n    padding-left: 1rem !important;\n  }\n  .py-md-3 {\n    padding-top: 1rem !important;\n    padding-bottom: 1rem !important;\n  }\n  .p-md-4 {\n    padding: 1.5rem 1.5rem !important;\n  }\n  .pt-md-4 {\n    padding-top: 1.5rem !important;\n  }\n  .pr-md-4 {\n    padding-right: 1.5rem !important;\n  }\n  .pb-md-4 {\n    padding-bottom: 1.5rem !important;\n  }\n  .pl-md-4 {\n    padding-left: 1.5rem !important;\n  }\n  .px-md-4 {\n    padding-right: 1.5rem !important;\n    padding-left: 1.5rem !important;\n  }\n  .py-md-4 {\n    padding-top: 1.5rem !important;\n    padding-bottom: 1.5rem !important;\n  }\n  .p-md-5 {\n    padding: 3rem 3rem !important;\n  }\n  .pt-md-5 {\n    padding-top: 3rem !important;\n  }\n  .pr-md-5 {\n    padding-right: 3rem !important;\n  }\n  .pb-md-5 {\n    padding-bottom: 3rem !important;\n  }\n  .pl-md-5 {\n    padding-left: 3rem !important;\n  }\n  .px-md-5 {\n    padding-right: 3rem !important;\n    padding-left: 3rem !important;\n  }\n  .py-md-5 {\n    padding-top: 3rem !important;\n    padding-bottom: 3rem !important;\n  }\n  .m-md-auto {\n    margin: auto !important;\n  }\n  .mt-md-auto {\n    margin-top: auto !important;\n  }\n  .mr-md-auto {\n    margin-right: auto !important;\n  }\n  .mb-md-auto {\n    margin-bottom: auto !important;\n  }\n  .ml-md-auto {\n    margin-left: auto !important;\n  }\n  .mx-md-auto {\n    margin-right: auto !important;\n    margin-left: auto !important;\n  }\n  .my-md-auto {\n    margin-top: auto !important;\n    margin-bottom: auto !important;\n  }\n}\n\n@media (min-width: 992px) {\n  .m-lg-0 {\n    margin: 0 0 !important;\n  }\n  .mt-lg-0 {\n    margin-top: 0 !important;\n  }\n  .mr-lg-0 {\n    margin-right: 0 !important;\n  }\n  .mb-lg-0 {\n    margin-bottom: 0 !important;\n  }\n  .ml-lg-0 {\n    margin-left: 0 !important;\n  }\n  .mx-lg-0 {\n    margin-right: 0 !important;\n    margin-left: 0 !important;\n  }\n  .my-lg-0 {\n    margin-top: 0 !important;\n    margin-bottom: 0 !important;\n  }\n  .m-lg-1 {\n    margin: 0.25rem 0.25rem !important;\n  }\n  .mt-lg-1 {\n    margin-top: 0.25rem !important;\n  }\n  .mr-lg-1 {\n    margin-right: 0.25rem !important;\n  }\n  .mb-lg-1 {\n    margin-bottom: 0.25rem !important;\n  }\n  .ml-lg-1 {\n    margin-left: 0.25rem !important;\n  }\n  .mx-lg-1 {\n    margin-right: 0.25rem !important;\n    margin-left: 0.25rem !important;\n  }\n  .my-lg-1 {\n    margin-top: 0.25rem !important;\n    margin-bottom: 0.25rem !important;\n  }\n  .m-lg-2 {\n    margin: 0.5rem 0.5rem !important;\n  }\n  .mt-lg-2 {\n    margin-top: 0.5rem !important;\n  }\n  .mr-lg-2 {\n    margin-right: 0.5rem !important;\n  }\n  .mb-lg-2 {\n    margin-bottom: 0.5rem !important;\n  }\n  .ml-lg-2 {\n    margin-left: 0.5rem !important;\n  }\n  .mx-lg-2 {\n    margin-right: 0.5rem !important;\n    margin-left: 0.5rem !important;\n  }\n  .my-lg-2 {\n    margin-top: 0.5rem !important;\n    margin-bottom: 0.5rem !important;\n  }\n  .m-lg-3 {\n    margin: 1rem 1rem !important;\n  }\n  .mt-lg-3 {\n    margin-top: 1rem !important;\n  }\n  .mr-lg-3 {\n    margin-right: 1rem !important;\n  }\n  .mb-lg-3 {\n    margin-bottom: 1rem !important;\n  }\n  .ml-lg-3 {\n    margin-left: 1rem !important;\n  }\n  .mx-lg-3 {\n    margin-right: 1rem !important;\n    margin-left: 1rem !important;\n  }\n  .my-lg-3 {\n    margin-top: 1rem !important;\n    margin-bottom: 1rem !important;\n  }\n  .m-lg-4 {\n    margin: 1.5rem 1.5rem !important;\n  }\n  .mt-lg-4 {\n    margin-top: 1.5rem !important;\n  }\n  .mr-lg-4 {\n    margin-right: 1.5rem !important;\n  }\n  .mb-lg-4 {\n    margin-bottom: 1.5rem !important;\n  }\n  .ml-lg-4 {\n    margin-left: 1.5rem !important;\n  }\n  .mx-lg-4 {\n    margin-right: 1.5rem !important;\n    margin-left: 1.5rem !important;\n  }\n  .my-lg-4 {\n    margin-top: 1.5rem !important;\n    margin-bottom: 1.5rem !important;\n  }\n  .m-lg-5 {\n    margin: 3rem 3rem !important;\n  }\n  .mt-lg-5 {\n    margin-top: 3rem !important;\n  }\n  .mr-lg-5 {\n    margin-right: 3rem !important;\n  }\n  .mb-lg-5 {\n    margin-bottom: 3rem !important;\n  }\n  .ml-lg-5 {\n    margin-left: 3rem !important;\n  }\n  .mx-lg-5 {\n    margin-right: 3rem !important;\n    margin-left: 3rem !important;\n  }\n  .my-lg-5 {\n    margin-top: 3rem !important;\n    margin-bottom: 3rem !important;\n  }\n  .p-lg-0 {\n    padding: 0 0 !important;\n  }\n  .pt-lg-0 {\n    padding-top: 0 !important;\n  }\n  .pr-lg-0 {\n    padding-right: 0 !important;\n  }\n  .pb-lg-0 {\n    padding-bottom: 0 !important;\n  }\n  .pl-lg-0 {\n    padding-left: 0 !important;\n  }\n  .px-lg-0 {\n    padding-right: 0 !important;\n    padding-left: 0 !important;\n  }\n  .py-lg-0 {\n    padding-top: 0 !important;\n    padding-bottom: 0 !important;\n  }\n  .p-lg-1 {\n    padding: 0.25rem 0.25rem !important;\n  }\n  .pt-lg-1 {\n    padding-top: 0.25rem !important;\n  }\n  .pr-lg-1 {\n    padding-right: 0.25rem !important;\n  }\n  .pb-lg-1 {\n    padding-bottom: 0.25rem !important;\n  }\n  .pl-lg-1 {\n    padding-left: 0.25rem !important;\n  }\n  .px-lg-1 {\n    padding-right: 0.25rem !important;\n    padding-left: 0.25rem !important;\n  }\n  .py-lg-1 {\n    padding-top: 0.25rem !important;\n    padding-bottom: 0.25rem !important;\n  }\n  .p-lg-2 {\n    padding: 0.5rem 0.5rem !important;\n  }\n  .pt-lg-2 {\n    padding-top: 0.5rem !important;\n  }\n  .pr-lg-2 {\n    padding-right: 0.5rem !important;\n  }\n  .pb-lg-2 {\n    padding-bottom: 0.5rem !important;\n  }\n  .pl-lg-2 {\n    padding-left: 0.5rem !important;\n  }\n  .px-lg-2 {\n    padding-right: 0.5rem !important;\n    padding-left: 0.5rem !important;\n  }\n  .py-lg-2 {\n    padding-top: 0.5rem !important;\n    padding-bottom: 0.5rem !important;\n  }\n  .p-lg-3 {\n    padding: 1rem 1rem !important;\n  }\n  .pt-lg-3 {\n    padding-top: 1rem !important;\n  }\n  .pr-lg-3 {\n    padding-right: 1rem !important;\n  }\n  .pb-lg-3 {\n    padding-bottom: 1rem !important;\n  }\n  .pl-lg-3 {\n    padding-left: 1rem !important;\n  }\n  .px-lg-3 {\n    padding-right: 1rem !important;\n    padding-left: 1rem !important;\n  }\n  .py-lg-3 {\n    padding-top: 1rem !important;\n    padding-bottom: 1rem !important;\n  }\n  .p-lg-4 {\n    padding: 1.5rem 1.5rem !important;\n  }\n  .pt-lg-4 {\n    padding-top: 1.5rem !important;\n  }\n  .pr-lg-4 {\n    padding-right: 1.5rem !important;\n  }\n  .pb-lg-4 {\n    padding-bottom: 1.5rem !important;\n  }\n  .pl-lg-4 {\n    padding-left: 1.5rem !important;\n  }\n  .px-lg-4 {\n    padding-right: 1.5rem !important;\n    padding-left: 1.5rem !important;\n  }\n  .py-lg-4 {\n    padding-top: 1.5rem !important;\n    padding-bottom: 1.5rem !important;\n  }\n  .p-lg-5 {\n    padding: 3rem 3rem !important;\n  }\n  .pt-lg-5 {\n    padding-top: 3rem !important;\n  }\n  .pr-lg-5 {\n    padding-right: 3rem !important;\n  }\n  .pb-lg-5 {\n    padding-bottom: 3rem !important;\n  }\n  .pl-lg-5 {\n    padding-left: 3rem !important;\n  }\n  .px-lg-5 {\n    padding-right: 3rem !important;\n    padding-left: 3rem !important;\n  }\n  .py-lg-5 {\n    padding-top: 3rem !important;\n    padding-bottom: 3rem !important;\n  }\n  .m-lg-auto {\n    margin: auto !important;\n  }\n  .mt-lg-auto {\n    margin-top: auto !important;\n  }\n  .mr-lg-auto {\n    margin-right: auto !important;\n  }\n  .mb-lg-auto {\n    margin-bottom: auto !important;\n  }\n  .ml-lg-auto {\n    margin-left: auto !important;\n  }\n  .mx-lg-auto {\n    margin-right: auto !important;\n    margin-left: auto !important;\n  }\n  .my-lg-auto {\n    margin-top: auto !important;\n    margin-bottom: auto !important;\n  }\n}\n\n@media (min-width: 1200px) {\n  .m-xl-0 {\n    margin: 0 0 !important;\n  }\n  .mt-xl-0 {\n    margin-top: 0 !important;\n  }\n  .mr-xl-0 {\n    margin-right: 0 !important;\n  }\n  .mb-xl-0 {\n    margin-bottom: 0 !important;\n  }\n  .ml-xl-0 {\n    margin-left: 0 !important;\n  }\n  .mx-xl-0 {\n    margin-right: 0 !important;\n    margin-left: 0 !important;\n  }\n  .my-xl-0 {\n    margin-top: 0 !important;\n    margin-bottom: 0 !important;\n  }\n  .m-xl-1 {\n    margin: 0.25rem 0.25rem !important;\n  }\n  .mt-xl-1 {\n    margin-top: 0.25rem !important;\n  }\n  .mr-xl-1 {\n    margin-right: 0.25rem !important;\n  }\n  .mb-xl-1 {\n    margin-bottom: 0.25rem !important;\n  }\n  .ml-xl-1 {\n    margin-left: 0.25rem !important;\n  }\n  .mx-xl-1 {\n    margin-right: 0.25rem !important;\n    margin-left: 0.25rem !important;\n  }\n  .my-xl-1 {\n    margin-top: 0.25rem !important;\n    margin-bottom: 0.25rem !important;\n  }\n  .m-xl-2 {\n    margin: 0.5rem 0.5rem !important;\n  }\n  .mt-xl-2 {\n    margin-top: 0.5rem !important;\n  }\n  .mr-xl-2 {\n    margin-right: 0.5rem !important;\n  }\n  .mb-xl-2 {\n    margin-bottom: 0.5rem !important;\n  }\n  .ml-xl-2 {\n    margin-left: 0.5rem !important;\n  }\n  .mx-xl-2 {\n    margin-right: 0.5rem !important;\n    margin-left: 0.5rem !important;\n  }\n  .my-xl-2 {\n    margin-top: 0.5rem !important;\n    margin-bottom: 0.5rem !important;\n  }\n  .m-xl-3 {\n    margin: 1rem 1rem !important;\n  }\n  .mt-xl-3 {\n    margin-top: 1rem !important;\n  }\n  .mr-xl-3 {\n    margin-right: 1rem !important;\n  }\n  .mb-xl-3 {\n    margin-bottom: 1rem !important;\n  }\n  .ml-xl-3 {\n    margin-left: 1rem !important;\n  }\n  .mx-xl-3 {\n    margin-right: 1rem !important;\n    margin-left: 1rem !important;\n  }\n  .my-xl-3 {\n    margin-top: 1rem !important;\n    margin-bottom: 1rem !important;\n  }\n  .m-xl-4 {\n    margin: 1.5rem 1.5rem !important;\n  }\n  .mt-xl-4 {\n    margin-top: 1.5rem !important;\n  }\n  .mr-xl-4 {\n    margin-right: 1.5rem !important;\n  }\n  .mb-xl-4 {\n    margin-bottom: 1.5rem !important;\n  }\n  .ml-xl-4 {\n    margin-left: 1.5rem !important;\n  }\n  .mx-xl-4 {\n    margin-right: 1.5rem !important;\n    margin-left: 1.5rem !important;\n  }\n  .my-xl-4 {\n    margin-top: 1.5rem !important;\n    margin-bottom: 1.5rem !important;\n  }\n  .m-xl-5 {\n    margin: 3rem 3rem !important;\n  }\n  .mt-xl-5 {\n    margin-top: 3rem !important;\n  }\n  .mr-xl-5 {\n    margin-right: 3rem !important;\n  }\n  .mb-xl-5 {\n    margin-bottom: 3rem !important;\n  }\n  .ml-xl-5 {\n    margin-left: 3rem !important;\n  }\n  .mx-xl-5 {\n    margin-right: 3rem !important;\n    margin-left: 3rem !important;\n  }\n  .my-xl-5 {\n    margin-top: 3rem !important;\n    margin-bottom: 3rem !important;\n  }\n  .p-xl-0 {\n    padding: 0 0 !important;\n  }\n  .pt-xl-0 {\n    padding-top: 0 !important;\n  }\n  .pr-xl-0 {\n    padding-right: 0 !important;\n  }\n  .pb-xl-0 {\n    padding-bottom: 0 !important;\n  }\n  .pl-xl-0 {\n    padding-left: 0 !important;\n  }\n  .px-xl-0 {\n    padding-right: 0 !important;\n    padding-left: 0 !important;\n  }\n  .py-xl-0 {\n    padding-top: 0 !important;\n    padding-bottom: 0 !important;\n  }\n  .p-xl-1 {\n    padding: 0.25rem 0.25rem !important;\n  }\n  .pt-xl-1 {\n    padding-top: 0.25rem !important;\n  }\n  .pr-xl-1 {\n    padding-right: 0.25rem !important;\n  }\n  .pb-xl-1 {\n    padding-bottom: 0.25rem !important;\n  }\n  .pl-xl-1 {\n    padding-left: 0.25rem !important;\n  }\n  .px-xl-1 {\n    padding-right: 0.25rem !important;\n    padding-left: 0.25rem !important;\n  }\n  .py-xl-1 {\n    padding-top: 0.25rem !important;\n    padding-bottom: 0.25rem !important;\n  }\n  .p-xl-2 {\n    padding: 0.5rem 0.5rem !important;\n  }\n  .pt-xl-2 {\n    padding-top: 0.5rem !important;\n  }\n  .pr-xl-2 {\n    padding-right: 0.5rem !important;\n  }\n  .pb-xl-2 {\n    padding-bottom: 0.5rem !important;\n  }\n  .pl-xl-2 {\n    padding-left: 0.5rem !important;\n  }\n  .px-xl-2 {\n    padding-right: 0.5rem !important;\n    padding-left: 0.5rem !important;\n  }\n  .py-xl-2 {\n    padding-top: 0.5rem !important;\n    padding-bottom: 0.5rem !important;\n  }\n  .p-xl-3 {\n    padding: 1rem 1rem !important;\n  }\n  .pt-xl-3 {\n    padding-top: 1rem !important;\n  }\n  .pr-xl-3 {\n    padding-right: 1rem !important;\n  }\n  .pb-xl-3 {\n    padding-bottom: 1rem !important;\n  }\n  .pl-xl-3 {\n    padding-left: 1rem !important;\n  }\n  .px-xl-3 {\n    padding-right: 1rem !important;\n    padding-left: 1rem !important;\n  }\n  .py-xl-3 {\n    padding-top: 1rem !important;\n    padding-bottom: 1rem !important;\n  }\n  .p-xl-4 {\n    padding: 1.5rem 1.5rem !important;\n  }\n  .pt-xl-4 {\n    padding-top: 1.5rem !important;\n  }\n  .pr-xl-4 {\n    padding-right: 1.5rem !important;\n  }\n  .pb-xl-4 {\n    padding-bottom: 1.5rem !important;\n  }\n  .pl-xl-4 {\n    padding-left: 1.5rem !important;\n  }\n  .px-xl-4 {\n    padding-right: 1.5rem !important;\n    padding-left: 1.5rem !important;\n  }\n  .py-xl-4 {\n    padding-top: 1.5rem !important;\n    padding-bottom: 1.5rem !important;\n  }\n  .p-xl-5 {\n    padding: 3rem 3rem !important;\n  }\n  .pt-xl-5 {\n    padding-top: 3rem !important;\n  }\n  .pr-xl-5 {\n    padding-right: 3rem !important;\n  }\n  .pb-xl-5 {\n    padding-bottom: 3rem !important;\n  }\n  .pl-xl-5 {\n    padding-left: 3rem !important;\n  }\n  .px-xl-5 {\n    padding-right: 3rem !important;\n    padding-left: 3rem !important;\n  }\n  .py-xl-5 {\n    padding-top: 3rem !important;\n    padding-bottom: 3rem !important;\n  }\n  .m-xl-auto {\n    margin: auto !important;\n  }\n  .mt-xl-auto {\n    margin-top: auto !important;\n  }\n  .mr-xl-auto {\n    margin-right: auto !important;\n  }\n  .mb-xl-auto {\n    margin-bottom: auto !important;\n  }\n  .ml-xl-auto {\n    margin-left: auto !important;\n  }\n  .mx-xl-auto {\n    margin-right: auto !important;\n    margin-left: auto !important;\n  }\n  .my-xl-auto {\n    margin-top: auto !important;\n    margin-bottom: auto !important;\n  }\n}\n\n.text-justify {\n  text-align: justify !important;\n}\n\n.text-nowrap {\n  white-space: nowrap !important;\n}\n\n.text-truncate {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.text-left {\n  text-align: left !important;\n}\n\n.text-right {\n  text-align: right !important;\n}\n\n.text-center {\n  text-align: center !important;\n}\n\n@media (min-width: 576px) {\n  .text-sm-left {\n    text-align: left !important;\n  }\n  .text-sm-right {\n    text-align: right !important;\n  }\n  .text-sm-center {\n    text-align: center !important;\n  }\n}\n\n@media (min-width: 768px) {\n  .text-md-left {\n    text-align: left !important;\n  }\n  .text-md-right {\n    text-align: right !important;\n  }\n  .text-md-center {\n    text-align: center !important;\n  }\n}\n\n@media (min-width: 992px) {\n  .text-lg-left {\n    text-align: left !important;\n  }\n  .text-lg-right {\n    text-align: right !important;\n  }\n  .text-lg-center {\n    text-align: center !important;\n  }\n}\n\n@media (min-width: 1200px) {\n  .text-xl-left {\n    text-align: left !important;\n  }\n  .text-xl-right {\n    text-align: right !important;\n  }\n  .text-xl-center {\n    text-align: center !important;\n  }\n}\n\n.text-lowercase {\n  text-transform: lowercase !important;\n}\n\n.text-uppercase {\n  text-transform: uppercase !important;\n}\n\n.text-capitalize {\n  text-transform: capitalize !important;\n}\n\n.font-weight-normal {\n  font-weight: normal;\n}\n\n.font-weight-bold {\n  font-weight: bold;\n}\n\n.font-italic {\n  font-style: italic;\n}\n\n.text-white {\n  color: #fff !important;\n}\n\n.text-muted {\n  color: #636c72 !important;\n}\n\na.text-muted:focus, a.text-muted:hover {\n  color: #4b5257 !important;\n}\n\n.text-primary {\n  color: #0275d8 !important;\n}\n\na.text-primary:focus, a.text-primary:hover {\n  color: #025aa5 !important;\n}\n\n.text-success {\n  color: #5cb85c !important;\n}\n\na.text-success:focus, a.text-success:hover {\n  color: #449d44 !important;\n}\n\n.text-info {\n  color: #5bc0de !important;\n}\n\na.text-info:focus, a.text-info:hover {\n  color: #31b0d5 !important;\n}\n\n.text-warning {\n  color: #f0ad4e !important;\n}\n\na.text-warning:focus, a.text-warning:hover {\n  color: #ec971f !important;\n}\n\n.text-danger {\n  color: #d9534f !important;\n}\n\na.text-danger:focus, a.text-danger:hover {\n  color: #c9302c !important;\n}\n\n.text-gray-dark {\n  color: #292b2c !important;\n}\n\na.text-gray-dark:focus, a.text-gray-dark:hover {\n  color: #101112 !important;\n}\n\n.text-hide {\n  font: 0/0 a;\n  color: transparent;\n  text-shadow: none;\n  background-color: transparent;\n  border: 0;\n}\n\n.invisible {\n  visibility: hidden !important;\n}\n\n.hidden-xs-up {\n  display: none !important;\n}\n\n@media (max-width: 575px) {\n  .hidden-xs-down {\n    display: none !important;\n  }\n}\n\n@media (min-width: 576px) {\n  .hidden-sm-up {\n    display: none !important;\n  }\n}\n\n@media (max-width: 767px) {\n  .hidden-sm-down {\n    display: none !important;\n  }\n}\n\n@media (min-width: 768px) {\n  .hidden-md-up {\n    display: none !important;\n  }\n}\n\n@media (max-width: 991px) {\n  .hidden-md-down {\n    display: none !important;\n  }\n}\n\n@media (min-width: 992px) {\n  .hidden-lg-up {\n    display: none !important;\n  }\n}\n\n@media (max-width: 1199px) {\n  .hidden-lg-down {\n    display: none !important;\n  }\n}\n\n@media (min-width: 1200px) {\n  .hidden-xl-up {\n    display: none !important;\n  }\n}\n\n.hidden-xl-down {\n  display: none !important;\n}\n\n.visible-print-block {\n  display: none !important;\n}\n\n@media print {\n  .visible-print-block {\n    display: block !important;\n  }\n}\n\n.visible-print-inline {\n  display: none !important;\n}\n\n@media print {\n  .visible-print-inline {\n    display: inline !important;\n  }\n}\n\n.visible-print-inline-block {\n  display: none !important;\n}\n\n@media print {\n  .visible-print-inline-block {\n    display: inline-block !important;\n  }\n}\n\n@media print {\n  .hidden-print {\n    display: none !important;\n  }\n}\n/*# sourceMappingURL=bootstrap.css.map */", ""]);
	
	// exports


/***/ }),
/* 7 */
/***/ (function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			// Test for IE <= 9 as proposed by Browserhacks
			// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
			// Tests for existence of standard globals is to allow style-loader 
			// to operate correctly into non-standard environments
			// @see https://github.com/webpack-contrib/style-loader/issues/177
			return window && document && document.all && !window.atob;
		}),
		getElement = (function(fn) {
			var memo = {};
			return function(selector) {
				if (typeof memo[selector] === "undefined") {
					memo[selector] = fn.call(this, selector);
				}
				return memo[selector]
			};
		})(function (styleTarget) {
			return document.querySelector(styleTarget)
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [],
		fixUrls = __webpack_require__(9);
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		options.attrs = typeof options.attrs === "object" ? options.attrs : {};
	
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the <head> element
		if (typeof options.insertInto === "undefined") options.insertInto = "head";
	
		// By default, add <style> tags to the bottom of the target
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	};
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var styleTarget = getElement(options.insertInto)
		if (!styleTarget) {
			throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
		}
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				styleTarget.insertBefore(styleElement, styleTarget.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				styleTarget.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				styleTarget.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			styleTarget.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		options.attrs.type = "text/css";
	
		attachTagAttrs(styleElement, options.attrs);
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		options.attrs.type = "text/css";
		options.attrs.rel = "stylesheet";
	
		attachTagAttrs(linkElement, options.attrs);
		insertStyleElement(options, linkElement);
		return linkElement;
	}
	
	function attachTagAttrs(element, attrs) {
		Object.keys(attrs).forEach(function (key) {
			element.setAttribute(key, attrs[key]);
		});
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement, options);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, options, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;
	
		/* If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
		*/
		var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;
	
		if (options.convertToAbsoluteUrls || autoFixUrls){
			css = fixUrls(css);
		}
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ }),
/* 9 */
/***/ (function(module, exports) {

	
	/**
	 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
	 * embed the css on the page. This breaks all relative urls because now they are relative to a
	 * bundle instead of the current page.
	 *
	 * One solution is to only use full urls, but that may be impossible.
	 *
	 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
	 *
	 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
	 *
	 */
	
	module.exports = function (css) {
	  // get current location
	  var location = typeof window !== "undefined" && window.location;
	
	  if (!location) {
	    throw new Error("fixUrls requires window.location");
	  }
	
		// blank or null?
		if (!css || typeof css !== "string") {
		  return css;
	  }
	
	  var baseUrl = location.protocol + "//" + location.host;
	  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");
	
		// convert each url(...)
		/*
		This regular expression is just a way to recursively match brackets within
		a string.
	
		 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
		   (  = Start a capturing group
		     (?:  = Start a non-capturing group
		         [^)(]  = Match anything that isn't a parentheses
		         |  = OR
		         \(  = Match a start parentheses
		             (?:  = Start another non-capturing groups
		                 [^)(]+  = Match anything that isn't a parentheses
		                 |  = OR
		                 \(  = Match a start parentheses
		                     [^)(]*  = Match anything that isn't a parentheses
		                 \)  = Match a end parentheses
		             )  = End Group
	              *\) = Match anything and then a close parens
	          )  = Close non-capturing group
	          *  = Match anything
	       )  = Close capturing group
		 \)  = Match a close parens
	
		 /gi  = Get all matches, not the first.  Be case insensitive.
		 */
		var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
			// strip quotes (if they exist)
			var unquotedOrigUrl = origUrl
				.trim()
				.replace(/^"(.*)"$/, function(o, $1){ return $1; })
				.replace(/^'(.*)'$/, function(o, $1){ return $1; });
	
			// already a full url? no change
			if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
			  return fullMatch;
			}
	
			// convert the url to a full url
			var newUrl;
	
			if (unquotedOrigUrl.indexOf("//") === 0) {
			  	//TODO: should we add protocol?
				newUrl = unquotedOrigUrl;
			} else if (unquotedOrigUrl.indexOf("/") === 0) {
				// path should be relative to the base url
				newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
			} else {
				// path should be relative to current directory
				newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
			}
	
			// send back the fixed url(...)
			return "url(" + JSON.stringify(newUrl) + ")";
		});
	
		// send back the fixed css
		return fixedCss;
	};


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(11);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(8)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../css-loader/index.js!./bootstrap-vue.css", function() {
				var newContent = require("!!../../css-loader/index.js!./bootstrap-vue.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports
	
	
	// module
	exports.push([module.id, ".collapse-enter-active,.collapse-leave-active{transition:all .35s ease;overflow:hidden}.collapse-enter,.collapse-leave-to{height:0}.custom-file-control{overflow:hidden}.custom-file-control{overflow:hidden}.custom-file-control.dragging{overflow:hidden;filter:blur(3px)}.custom-file-control::after{content:attr(data-selected)}.custom-file-control::before{content:attr(data-choose)}.custom-file .drop-here{position:absolute;left:0;right:0;top:0;bottom:0;background-color:rgba(0,0,0,.5);border-radius:3px;z-index:99999;display:flex;justify-content:center;align-items:center}.custom-file .drop-here::before{color:#fff;content:attr(data-drop)}.hidden{opacity:0!important}.modal{display:block}.progress-bar{transition:all .5s}table thead>tr>td.sorting,table thead>tr>td.sorting_asc,table thead>tr>td.sorting_desc,table thead>tr>th.sorting,table thead>tr>th.sorting_asc,table thead>tr>th.sorting_desc{padding-right:30px}table thead>tr>td:active,table thead>tr>th:active{outline:0}table thead .sorting,table thead .sorting_asc,table thead .sorting_asc_disabled,table thead .sorting_desc,table thead .sorting_desc_disabled{cursor:pointer;position:relative}table thead .sorting:after,table thead .sorting:before,table thead .sorting_asc:after,table thead .sorting_asc:before,table thead .sorting_asc_disabled:after,table thead .sorting_asc_disabled:before,table thead .sorting_desc:after,table thead .sorting_desc:before,table thead .sorting_desc_disabled:after,table thead .sorting_desc_disabled:before{position:absolute;bottom:.9em;display:block;opacity:.3}table thead .sorting:before,table thead .sorting_asc:before,table thead .sorting_asc_disabled:before,table thead .sorting_desc:before,table thead .sorting_desc_disabled:before{right:1em;content:\"\\2191\"}table thead .sorting:after,table thead .sorting_asc:after,table thead .sorting_asc_disabled:after,table thead .sorting_desc:after,table thead .sorting_desc_disabled:after{right:.5em;content:\"\\2193\"}table thead .sorting_asc:before,table thead .sorting_desc:after{opacity:1}table thead .sorting_asc_disabled:before,table thead .sorting_desc_disabled:after{opacity:0}.tooltip{display:block!important;transition:all .3s}", ""]);
	
	// exports


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(13)
	
	/* script */
	__vue_exports__ = __webpack_require__(16)
	
	/* template */
	var __vue_template__ = __webpack_require__(32)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/home/jaime/BUFF/projects/golang/src/dvij.front/src/components/app.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-5b948c7d", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-5b948c7d", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] app.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(14);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(15)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-5b948c7d!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./app.vue", function() {
				var newContent = require("!!../../node_modules/css-loader/index.js?sourceMap!../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-5b948c7d!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./app.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports
	
	
	// module
	exports.push([module.id, "\nhtml,\nbody {\n}\n.main-panel {\n  width: 100%;\n  /*position: absolute;*/\n  z-index: 2;\n}\n", "", {"version":3,"sources":["/./src/components/app.vue?cea1d2ec"],"names":[],"mappings":";AAyDA;;CACA;AACA;EACA,YAAA;EACA,uBAAA;EACA,WAAA;CACA","file":"app.vue","sourcesContent":["<template>\n  <div id=\"app\">\n    <div class=\"main-panel\">\n      <b-navbar toggleable type=\"inverse\"\n        variant=\"inverse\" class=\"dvi-navbar collapse\">\n        <b-collapse isNav id=\"nav_collapse\">\n          <div class=\"row\">\n            <div style=\"padding-left: 20px\">\n              <img height=\"42\" width=\"42\" src=\"logo.png\"></img>\n            </div>\n            <div class=\"col\">\n            <b-nav isNavBar>\n              <router-link to=\"/event\">\n                <b-nav-item>custom</b-nav-item>\n              </router-link>\n              <router-link to=\"/\">\n                <b-nav-item>dvij</b-nav-item>\n              </router-link>\n              <router-link to=\"/users\">\n                <b-nav-item>users</b-nav-item>\n              </router-link>\n              <router-link to=\"/events\">\n                <b-nav-item>events</b-nav-item>\n              </router-link>\n              <router-link to=\"/map\">\n                <b-nav-item>map</b-nav-item>\n              </router-link>\n            </b-nav>\n            </div>\n            <div class=\"col pull-right\">\n              <b-btn v-b-toggle.filter variant=\"primary\">\n                filter\n              </b-btn>\n              <b-btn variant=\"primary\">\n                login\n              </b-btn>\n            </div>\n          </div>\n        </b-collapse>\n      </b-navbar>\n      <b-collapse id=\"filter\">\n        <panel-filter></panel-filter>\n      </b-collapse>\n    </div>\n    <router-view class=\"view\"></router-view>\n  </div>\n</template>\n\n<script>\nimport PanelFilter from './general/panel-filter.vue'\n\nexport default {\n  components: { PanelFilter },\n}\n</script>\n\n<style>\n  html,\n  body {}\n  .main-panel {\n    width: 100%;\n    /*position: absolute;*/\n    z-index: 2;\n  }\n</style>\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}
	
	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}
	
	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if (media) {
			styleElement.setAttribute("media", media);
		}
	
		if (sourceMap) {
			// https://developer.chrome.com/devtools/docs/javascript-debugging
			// this makes source maps inside style tags work properly in Chrome
			css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */';
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _panelFilter = __webpack_require__(17);
	
	var _panelFilter2 = _interopRequireDefault(_panelFilter);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  components: { PanelFilter: _panelFilter2.default }
	}; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(18)
	
	/* script */
	__vue_exports__ = __webpack_require__(20)
	
	/* template */
	var __vue_template__ = __webpack_require__(31)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/home/jaime/BUFF/projects/golang/src/dvij.front/src/components/general/panel-filter.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-525417fc", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-525417fc", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] panel-filter.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(19);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(15)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-525417fc!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./panel-filter.vue", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-525417fc!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./panel-filter.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports
	
	
	// module
	exports.push([module.id, "\n.panel-filter {\n  background: #292b2c;\n}\n", "", {"version":3,"sources":["/./src/components/general/panel-filter.vue?0da71bc3"],"names":[],"mappings":";AAyFA;EACA,oBAAA;CACA","file":"panel-filter.vue","sourcesContent":["<template>\n  <div class=\"row panel-filter\">\n    <div class=\"col\" style=\"padding-left: 35px;\">\n      <filter-tag :tags=\"tags\"></filter-tag>\n    </div>\n    <b-button-group horizontal class=\"pull-right\">\n      <div class=\"col\">\n      <b-form-select :options=\"tobjects\"\n        v-model=\"FILTER.tobject\"></b-form-select><br>\n      <small class=\"text-muted\">object</small>\n      </div>\n      <template v-if=\"FILTER.tobject === 'Event'\">\n      <div class=\"col\">\n      <b-form-select :options=\"ttimes\"\n        v-model=\"FILTER.ttime\"></b-form-select><br>\n      <small class=\"text-muted\">time</small>\n      </div>\n      </template>\n      <div class=\"col\" style=\"padding-right: 31px\">\n        <b-btn variant=\"primary\" @click=\"getFilter\">get it</b-btn>\n      </div>\n    </b-button-group>\n  </div>\n</template>\n\n<script>\n\nimport FilterTag from './filter-tag.vue';\n\nimport * as anime from '../../api/api.animation.js';\n\nimport { mapGetters, mapActions } from 'vuex';\nimport * as types from '../../constants/types.some.js';\nimport * as acts from '../../constants/types.actions.js';\nimport * as gets from '../../constants/types.getters.js';\nexport default {\n  name: 'PanelFilter',\n  components: {\n    FilterTag,\n  },\n  data(){//{{{\n    return {\n      tags: ['mommy','father','dfsag'],\n      tobjects: [],\n      tgeoses: [],\n      ttimes: [],\n    }\n  },//}}}\n  mounted: function() {//{{{\n    this.tobjects = types.TYPE_OBJECT;\n    this.tgeoses = types.TYPE_GEOS;\n    this.ttimes = types.TYPE_TIME;\n  },//}}}\n  computed: {\n    ...mapGetters([//{{{\n      gets.FILTER,\n      gets.POINTS,\n    ]),//}}}\n  },\n  methods: {\n    ...mapActions([//{{{\n      acts.GET_FILTER,\n      acts.SET_FILTER,\n    ]),//}}}\n    getFilter() {//{{{\n      const reqFilter = {\n        tgeos: this.FILTER.tgeos,\n        tobject: this.FILTER.tobject,\n        ttime: this.FILTER.ttime,\n      };\n      this.SET_FILTER(reqFilter).then(() => {\n        return this.GET_FILTER(this.FILTER);\n      }).then(() => {\n        console.log(\"get filter:\", this.POINTS);\n      });\n    },//}}}\n    clearFilter() {//{{{\n    },//}}}\n    close() {//{{{\n      this.$router.push({path:`/map`});\n    },//}}}\n    tag() {//{{{\n      console.log('tags', this.tag);\n    },//}}}\n  },\n}\n</script>\n\n<style>\n  .panel-filter {\n    background: #292b2c;\n  }\n</style>\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	
	
	var _filterTag = __webpack_require__(21);
	
	var _filterTag2 = _interopRequireDefault(_filterTag);
	
	var _apiAnimation = __webpack_require__(26);
	
	var anime = _interopRequireWildcard(_apiAnimation);
	
	var _vuex = __webpack_require__(27);
	
	var _typesSome = __webpack_require__(28);
	
	var types = _interopRequireWildcard(_typesSome);
	
	var _typesActions = __webpack_require__(29);
	
	var acts = _interopRequireWildcard(_typesActions);
	
	var _typesGetters = __webpack_require__(30);
	
	var gets = _interopRequireWildcard(_typesGetters);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  name: 'PanelFilter',
	  components: {
	    FilterTag: _filterTag2.default
	  },
	  data: function data() {
	    //{{{
	    return {
	      tags: ['mommy', 'father', 'dfsag'],
	      tobjects: [],
	      tgeoses: [],
	      ttimes: []
	    };
	  },
	  //}}}
	  mounted: function mounted() {
	    //{{{
	    this.tobjects = types.TYPE_OBJECT;
	    this.tgeoses = types.TYPE_GEOS;
	    this.ttimes = types.TYPE_TIME;
	  }, //}}}
	  computed: _extends({}, (0, _vuex.mapGetters)([//{{{
	  gets.FILTER, gets.POINTS])),
	  methods: _extends({}, (0, _vuex.mapActions)([//{{{
	  acts.GET_FILTER, acts.SET_FILTER]), {
	    //}}}
	    getFilter: function getFilter() {
	      var _this = this;
	
	      //{{{
	      var reqFilter = {
	        tgeos: this.FILTER.tgeos,
	        tobject: this.FILTER.tobject,
	        ttime: this.FILTER.ttime
	      };
	      this.SET_FILTER(reqFilter).then(function () {
	        return _this.GET_FILTER(_this.FILTER);
	      }).then(function () {
	        console.log("get filter:", _this.POINTS);
	      });
	    },
	    //}}}
	    clearFilter: function clearFilter() {//{{{
	    },
	    //}}}
	    close: function close() {
	      //{{{
	      this.$router.push({ path: '/map' });
	    },
	    //}}}
	    tag: function tag() {
	      //{{{
	      console.log('tags', this.tag);
	    }
	  })
	};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(22)
	
	/* script */
	__vue_exports__ = __webpack_require__(24)
	
	/* template */
	var __vue_template__ = __webpack_require__(25)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/home/jaime/BUFF/projects/golang/src/dvij.front/src/components/general/filter-tag.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-dd2621c0", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-dd2621c0", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] filter-tag.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(23);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(15)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-dd2621c0!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./filter-tag.vue", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-dd2621c0!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./filter-tag.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports
	
	
	// module
	exports.push([module.id, "\n.vue-input-tag-wrapper {\n  background-color: #fff;\n  border: 1px solid #ccc;\n  overflow: hidden;\n  padding-left: 4px;\n  padding-top: 4px;\n  cursor: text;\n  text-align: left;\n  -webkit-appearance: textfield;\n}\n.vue-input-tag-wrapper .input-tag {\n  background-color: white;\n  border-radius: 2px;\n  border: 1px solid black;\n  color: black;\n  display: inline-block;\n  font-size: 13px;\n  font-weight: 400;\n  margin-bottom: 4px;\n  margin-right: 4px;\n  padding: 3px;\n}\n.vue-input-tag-wrapper .input-tag .remove {\n  cursor: pointer;\n  font-weight: bold;\n  color: #638421;\n}\n.vue-input-tag-wrapper .input-tag .remove:hover {\n  text-decoration: none;\n}\n.vue-input-tag-wrapper .input-tag .remove::before {\n  content: \" x\";\n}\n.vue-input-tag-wrapper .new-tag {\n  background: transparent;\n  border: 0;\n  color: #777;\n  font-size: 13px;\n  font-weight: 400;\n  margin-bottom: 6px;\n  margin-top: 1px;\n  outline: none;\n  padding: 4px;\n  padding-left: 0;\n  width: 80px;\n}\n.vue-input-tag-wrapper.read-only {\n  cursor: default;\n}\n\n", "", {"version":3,"sources":["/./src/components/general/filter-tag.vue?7ac425d3"],"names":[],"mappings":";AAkGA;EACA,uBAAA;EACA,uBAAA;EACA,iBAAA;EACA,kBAAA;EACA,iBAAA;EACA,aAAA;EACA,iBAAA;EACA,8BAAA;CACA;AAEA;EACA,wBAAA;EACA,mBAAA;EACA,wBAAA;EACA,aAAA;EACA,sBAAA;EACA,gBAAA;EACA,iBAAA;EACA,mBAAA;EACA,kBAAA;EACA,aAAA;CACA;AAEA;EACA,gBAAA;EACA,kBAAA;EACA,eAAA;CACA;AAEA;EACA,sBAAA;CACA;AAEA;EACA,cAAA;CACA;AAEA;EACA,wBAAA;EACA,UAAA;EACA,YAAA;EACA,gBAAA;EACA,iBAAA;EACA,mBAAA;EACA,gBAAA;EACA,cAAA;EACA,aAAA;EACA,gBAAA;EACA,YAAA;CACA;AAEA;EACA,gBAAA;CACA","file":"filter-tag.vue","sourcesContent":["<script>\n/*eslint-disable*/\n  const validators = {\n    email : new RegExp(/^(([^<>()[\\]\\\\.,;:\\s@\\\"]+(\\.[^<>()[\\]\\\\.,;:\\s@\\\"]+)*)|(\\\".+\\\"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$/),\n    url : new RegExp(/^(https?|ftp|rmtp|mms):\\/\\/(([A-Z0-9][A-Z0-9_-]*)(\\.[A-Z0-9][A-Z0-9_-]*)+)(:(\\d+))?\\/?/i),\n    text : new RegExp(/^[a-zA-Z]+$/),\n    digits : new RegExp(/^[\\d() \\.\\:\\-\\+#]+$/),\n    isodate : new RegExp(/^\\d{4}[\\/\\-](0?[1-9]|1[012])[\\/\\-](0?[1-9]|[12][0-9]|3[01])$/)\n  }\n  /*eslint-enable*/\n  export default {\n    name: 'FilterTag',\n\n    props: {\n      tags: {\n        type: Array,\n        default: () => [],\n      },\n      placeholder: {\n        type: String,\n        default: '',\n      },\n      onChange: {\n        type: Function,\n      },\n      readOnly: {\n        type: Boolean,\n        default: false,\n      },\n      validate: {\n        type: String,\n        default: '',\n      },\n    },\n    data() {\n      return {\n        newTag: '',\n      };\n    },\n    methods: {\n      focusNewTag() {\n        if (this.readOnly) { return; }\n        this.$el.querySelector('.new-tag').focus();\n      },\n      addNew(tag) {\n        if (tag && !this.tags.includes(tag) && this.validateIfNeeded(tag)) {\n          this.tags.push(tag);\n          this.tagChange();\n        }\n        this.newTag = '';\n      },\n      validateIfNeeded(tagValue) {\n        if (this.validate === '' || this.validate === undefined) {\n          return true;\n        } else if (Object.keys(validators).indexOf(this.validate) > -1) {\n          return validators[this.validate].test(tagValue);\n        }\n        return true;\n      },\n      remove(index) {\n        this.tags.splice(index, 1);\n        this.tagChange();\n      },\n      removeLastTag() {\n        if (this.newTag) { return; }\n        this.tags.pop();\n        this.tagChange();\n      },\n      getPlaceholder() {\n        if (!this.tags.length) {\n          return this.placeholder;\n        }\n        return '';\n      },\n      tagChange() {\n        if (this.onChange) {\n          // avoid passing the observer\n          this.onChange(JSON.parse(JSON.stringify(this.tags)));\n        }\n      },\n    },\n  };\n</script>\n\n<template>\n\n  <div @click=\"focusNewTag()\" v-bind:class=\"{'read-only': readOnly}\" class=\"vue-input-tag-wrapper\">\n    <span v-for=\"(tag, index) in tags\" class=\"input-tag\">\n      <span>{{ tag }}</span>\n      <a v-if=\"!readOnly\" @click.prevent.stop=\"remove(index)\" class=\"remove\"></a>\n    </span>\n    <input v-if=\"!readOnly\" v-bind:placeholder=\"getPlaceholder()\" type=\"text\" v-model=\"newTag\" v-on:keydown.delete.stop=\"removeLastTag()\" v-on:keydown.enter.prevent.stop=\"addNew(newTag)\" class=\"new-tag\"/>\n  </div>\n\n</template>\n\n<style>\n\n  .vue-input-tag-wrapper {\n    background-color: #fff;\n    border: 1px solid #ccc;\n    overflow: hidden;\n    padding-left: 4px;\n    padding-top: 4px;\n    cursor: text;\n    text-align: left;\n    -webkit-appearance: textfield;\n  }\n\n  .vue-input-tag-wrapper .input-tag {\n    background-color: white;\n    border-radius: 2px;\n    border: 1px solid black;\n    color: black;\n    display: inline-block;\n    font-size: 13px;\n    font-weight: 400;\n    margin-bottom: 4px;\n    margin-right: 4px;\n    padding: 3px;\n  }\n\n  .vue-input-tag-wrapper .input-tag .remove {\n    cursor: pointer;\n    font-weight: bold;\n    color: #638421;\n  }\n\n  .vue-input-tag-wrapper .input-tag .remove:hover {\n    text-decoration: none;\n  }\n\n  .vue-input-tag-wrapper .input-tag .remove::before {\n    content: \" x\";\n  }\n\n  .vue-input-tag-wrapper .new-tag {\n    background: transparent;\n    border: 0;\n    color: #777;\n    font-size: 13px;\n    font-weight: 400;\n    margin-bottom: 6px;\n    margin-top: 1px;\n    outline: none;\n    padding: 4px;\n    padding-left: 0;\n    width: 80px;\n  }\n\n  .vue-input-tag-wrapper.read-only {\n    cursor: default;\n  }\n\n</style>\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ }),
/* 24 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	/*eslint-disable*/
	var validators = {
	  email: new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
	  url: new RegExp(/^(https?|ftp|rmtp|mms):\/\/(([A-Z0-9][A-Z0-9_-]*)(\.[A-Z0-9][A-Z0-9_-]*)+)(:(\d+))?\/?/i),
	  text: new RegExp(/^[a-zA-Z]+$/),
	  digits: new RegExp(/^[\d() \.\:\-\+#]+$/),
	  isodate: new RegExp(/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/)
	};
	/*eslint-enable*/
	exports.default = {
	  name: 'FilterTag',
	
	  props: {
	    tags: {
	      type: Array,
	      default: function _default() {
	        return [];
	      }
	    },
	    placeholder: {
	      type: String,
	      default: ''
	    },
	    onChange: {
	      type: Function
	    },
	    readOnly: {
	      type: Boolean,
	      default: false
	    },
	    validate: {
	      type: String,
	      default: ''
	    }
	  },
	  data: function data() {
	    return {
	      newTag: ''
	    };
	  },
	
	  methods: {
	    focusNewTag: function focusNewTag() {
	      if (this.readOnly) {
	        return;
	      }
	      this.$el.querySelector('.new-tag').focus();
	    },
	    addNew: function addNew(tag) {
	      if (tag && !this.tags.includes(tag) && this.validateIfNeeded(tag)) {
	        this.tags.push(tag);
	        this.tagChange();
	      }
	      this.newTag = '';
	    },
	    validateIfNeeded: function validateIfNeeded(tagValue) {
	      if (this.validate === '' || this.validate === undefined) {
	        return true;
	      } else if (Object.keys(validators).indexOf(this.validate) > -1) {
	        return validators[this.validate].test(tagValue);
	      }
	      return true;
	    },
	    remove: function remove(index) {
	      this.tags.splice(index, 1);
	      this.tagChange();
	    },
	    removeLastTag: function removeLastTag() {
	      if (this.newTag) {
	        return;
	      }
	      this.tags.pop();
	      this.tagChange();
	    },
	    getPlaceholder: function getPlaceholder() {
	      if (!this.tags.length) {
	        return this.placeholder;
	      }
	      return '';
	    },
	    tagChange: function tagChange() {
	      if (this.onChange) {
	        // avoid passing the observer
	        this.onChange(JSON.parse(JSON.stringify(this.tags)));
	      }
	    }
	  }
	};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "vue-input-tag-wrapper",
	    class: {
	      'read-only': _vm.readOnly
	    },
	    on: {
	      "click": function($event) {
	        _vm.focusNewTag()
	      }
	    }
	  }, [_vm._l((_vm.tags), function(tag, index) {
	    return _c('span', {
	      staticClass: "input-tag"
	    }, [_c('span', [_vm._v(_vm._s(tag))]), _vm._v(" "), (!_vm.readOnly) ? _c('a', {
	      staticClass: "remove",
	      on: {
	        "click": function($event) {
	          $event.preventDefault();
	          $event.stopPropagation();
	          _vm.remove(index)
	        }
	      }
	    }) : _vm._e()])
	  }), _vm._v(" "), (!_vm.readOnly) ? _c('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.newTag),
	      expression: "newTag"
	    }],
	    staticClass: "new-tag",
	    attrs: {
	      "placeholder": _vm.getPlaceholder(),
	      "type": "text"
	    },
	    domProps: {
	      "value": (_vm.newTag)
	    },
	    on: {
	      "keydown": [function($event) {
	        if (!('button' in $event) && _vm._k($event.keyCode, "delete", [8, 46])) { return null; }
	        $event.stopPropagation();
	        _vm.removeLastTag()
	      }, function($event) {
	        if (!('button' in $event) && _vm._k($event.keyCode, "enter", 13)) { return null; }
	        $event.preventDefault();
	        $event.stopPropagation();
	        _vm.addNew(_vm.newTag)
	      }],
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.newTag = $event.target.value
	      }
	    }
	  }) : _vm._e()], 2)
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-dd2621c0", module.exports)
	  }
	}

/***/ }),
/* 26 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var blink_err = exports.blink_err = function blink_err(e) {
	  return new Promise(function (resolve, reject) {
	    e.$el.style = 'background:#F00;transition-property:background;transition-duration:0.6s;';
	    setTimeout(function () {
	      e.$el.style = '';
	      resolve();
	    }, 1000);
	  });
	};
	
	var blink_good = exports.blink_good = function blink_good(e) {
	  return new Promise(function (resolve, reject) {
	    e.$el.style = 'background:#0275d8;transition-property:background;transition-duration:0.6s;';
	    setTimeout(function () {
	      e.$el.style = '';
	      resolve();
	    }, 1000);
	  });
	};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

	/**
	 * vuex v2.3.0
	 * (c) 2017 Evan You
	 * @license MIT
	 */
	(function (global, factory) {
		 true ? module.exports = factory() :
		typeof define === 'function' && define.amd ? define(factory) :
		(global.Vuex = factory());
	}(this, (function () { 'use strict';
	
	var applyMixin = function (Vue) {
	  var version = Number(Vue.version.split('.')[0]);
	
	  if (version >= 2) {
	    var usesInit = Vue.config._lifecycleHooks.indexOf('init') > -1;
	    Vue.mixin(usesInit ? { init: vuexInit } : { beforeCreate: vuexInit });
	  } else {
	    // override init and inject vuex init procedure
	    // for 1.x backwards compatibility.
	    var _init = Vue.prototype._init;
	    Vue.prototype._init = function (options) {
	      if ( options === void 0 ) options = {};
	
	      options.init = options.init
	        ? [vuexInit].concat(options.init)
	        : vuexInit;
	      _init.call(this, options);
	    };
	  }
	
	  /**
	   * Vuex init hook, injected into each instances init hooks list.
	   */
	
	  function vuexInit () {
	    var options = this.$options;
	    // store injection
	    if (options.store) {
	      this.$store = options.store;
	    } else if (options.parent && options.parent.$store) {
	      this.$store = options.parent.$store;
	    }
	  }
	};
	
	var devtoolHook =
	  typeof window !== 'undefined' &&
	  window.__VUE_DEVTOOLS_GLOBAL_HOOK__;
	
	function devtoolPlugin (store) {
	  if (!devtoolHook) { return }
	
	  store._devtoolHook = devtoolHook;
	
	  devtoolHook.emit('vuex:init', store);
	
	  devtoolHook.on('vuex:travel-to-state', function (targetState) {
	    store.replaceState(targetState);
	  });
	
	  store.subscribe(function (mutation, state) {
	    devtoolHook.emit('vuex:mutation', mutation, state);
	  });
	}
	
	/**
	 * Get the first item that pass the test
	 * by second argument function
	 *
	 * @param {Array} list
	 * @param {Function} f
	 * @return {*}
	 */
	/**
	 * Deep copy the given object considering circular structure.
	 * This function caches all nested objects and its copies.
	 * If it detects circular structure, use cached copy to avoid infinite loop.
	 *
	 * @param {*} obj
	 * @param {Array<Object>} cache
	 * @return {*}
	 */
	
	
	/**
	 * forEach for object
	 */
	function forEachValue (obj, fn) {
	  Object.keys(obj).forEach(function (key) { return fn(obj[key], key); });
	}
	
	function isObject (obj) {
	  return obj !== null && typeof obj === 'object'
	}
	
	function isPromise (val) {
	  return val && typeof val.then === 'function'
	}
	
	function assert (condition, msg) {
	  if (!condition) { throw new Error(("[vuex] " + msg)) }
	}
	
	var Module = function Module (rawModule, runtime) {
	  this.runtime = runtime;
	  this._children = Object.create(null);
	  this._rawModule = rawModule;
	  var rawState = rawModule.state;
	  this.state = (typeof rawState === 'function' ? rawState() : rawState) || {};
	};
	
	var prototypeAccessors$1 = { namespaced: {} };
	
	prototypeAccessors$1.namespaced.get = function () {
	  return !!this._rawModule.namespaced
	};
	
	Module.prototype.addChild = function addChild (key, module) {
	  this._children[key] = module;
	};
	
	Module.prototype.removeChild = function removeChild (key) {
	  delete this._children[key];
	};
	
	Module.prototype.getChild = function getChild (key) {
	  return this._children[key]
	};
	
	Module.prototype.update = function update (rawModule) {
	  this._rawModule.namespaced = rawModule.namespaced;
	  if (rawModule.actions) {
	    this._rawModule.actions = rawModule.actions;
	  }
	  if (rawModule.mutations) {
	    this._rawModule.mutations = rawModule.mutations;
	  }
	  if (rawModule.getters) {
	    this._rawModule.getters = rawModule.getters;
	  }
	};
	
	Module.prototype.forEachChild = function forEachChild (fn) {
	  forEachValue(this._children, fn);
	};
	
	Module.prototype.forEachGetter = function forEachGetter (fn) {
	  if (this._rawModule.getters) {
	    forEachValue(this._rawModule.getters, fn);
	  }
	};
	
	Module.prototype.forEachAction = function forEachAction (fn) {
	  if (this._rawModule.actions) {
	    forEachValue(this._rawModule.actions, fn);
	  }
	};
	
	Module.prototype.forEachMutation = function forEachMutation (fn) {
	  if (this._rawModule.mutations) {
	    forEachValue(this._rawModule.mutations, fn);
	  }
	};
	
	Object.defineProperties( Module.prototype, prototypeAccessors$1 );
	
	var ModuleCollection = function ModuleCollection (rawRootModule) {
	  var this$1 = this;
	
	  // register root module (Vuex.Store options)
	  this.root = new Module(rawRootModule, false);
	
	  // register all nested modules
	  if (rawRootModule.modules) {
	    forEachValue(rawRootModule.modules, function (rawModule, key) {
	      this$1.register([key], rawModule, false);
	    });
	  }
	};
	
	ModuleCollection.prototype.get = function get (path) {
	  return path.reduce(function (module, key) {
	    return module.getChild(key)
	  }, this.root)
	};
	
	ModuleCollection.prototype.getNamespace = function getNamespace (path) {
	  var module = this.root;
	  return path.reduce(function (namespace, key) {
	    module = module.getChild(key);
	    return namespace + (module.namespaced ? key + '/' : '')
	  }, '')
	};
	
	ModuleCollection.prototype.update = function update$1 (rawRootModule) {
	  update(this.root, rawRootModule);
	};
	
	ModuleCollection.prototype.register = function register (path, rawModule, runtime) {
	    var this$1 = this;
	    if ( runtime === void 0 ) runtime = true;
	
	  var parent = this.get(path.slice(0, -1));
	  var newModule = new Module(rawModule, runtime);
	  parent.addChild(path[path.length - 1], newModule);
	
	  // register nested modules
	  if (rawModule.modules) {
	    forEachValue(rawModule.modules, function (rawChildModule, key) {
	      this$1.register(path.concat(key), rawChildModule, runtime);
	    });
	  }
	};
	
	ModuleCollection.prototype.unregister = function unregister (path) {
	  var parent = this.get(path.slice(0, -1));
	  var key = path[path.length - 1];
	  if (!parent.getChild(key).runtime) { return }
	
	  parent.removeChild(key);
	};
	
	function update (targetModule, newModule) {
	  // update target module
	  targetModule.update(newModule);
	
	  // update nested modules
	  if (newModule.modules) {
	    for (var key in newModule.modules) {
	      if (!targetModule.getChild(key)) {
	        console.warn(
	          "[vuex] trying to add a new module '" + key + "' on hot reloading, " +
	          'manual reload is needed'
	        );
	        return
	      }
	      update(targetModule.getChild(key), newModule.modules[key]);
	    }
	  }
	}
	
	var Vue; // bind on install
	
	var Store = function Store (options) {
	  var this$1 = this;
	  if ( options === void 0 ) options = {};
	
	  assert(Vue, "must call Vue.use(Vuex) before creating a store instance.");
	  assert(typeof Promise !== 'undefined', "vuex requires a Promise polyfill in this browser.");
	
	  var state = options.state; if ( state === void 0 ) state = {};
	  var plugins = options.plugins; if ( plugins === void 0 ) plugins = [];
	  var strict = options.strict; if ( strict === void 0 ) strict = false;
	
	  // store internal state
	  this._committing = false;
	  this._actions = Object.create(null);
	  this._mutations = Object.create(null);
	  this._wrappedGetters = Object.create(null);
	  this._modules = new ModuleCollection(options);
	  this._modulesNamespaceMap = Object.create(null);
	  this._subscribers = [];
	  this._watcherVM = new Vue();
	
	  // bind commit and dispatch to self
	  var store = this;
	  var ref = this;
	  var dispatch = ref.dispatch;
	  var commit = ref.commit;
	  this.dispatch = function boundDispatch (type, payload) {
	    return dispatch.call(store, type, payload)
	  };
	  this.commit = function boundCommit (type, payload, options) {
	    return commit.call(store, type, payload, options)
	  };
	
	  // strict mode
	  this.strict = strict;
	
	  // init root module.
	  // this also recursively registers all sub-modules
	  // and collects all module getters inside this._wrappedGetters
	  installModule(this, state, [], this._modules.root);
	
	  // initialize the store vm, which is responsible for the reactivity
	  // (also registers _wrappedGetters as computed properties)
	  resetStoreVM(this, state);
	
	  // apply plugins
	  plugins.concat(devtoolPlugin).forEach(function (plugin) { return plugin(this$1); });
	};
	
	var prototypeAccessors = { state: {} };
	
	prototypeAccessors.state.get = function () {
	  return this._vm._data.$$state
	};
	
	prototypeAccessors.state.set = function (v) {
	  assert(false, "Use store.replaceState() to explicit replace store state.");
	};
	
	Store.prototype.commit = function commit (_type, _payload, _options) {
	    var this$1 = this;
	
	  // check object-style commit
	  var ref = unifyObjectStyle(_type, _payload, _options);
	    var type = ref.type;
	    var payload = ref.payload;
	    var options = ref.options;
	
	  var mutation = { type: type, payload: payload };
	  var entry = this._mutations[type];
	  if (!entry) {
	    console.error(("[vuex] unknown mutation type: " + type));
	    return
	  }
	  this._withCommit(function () {
	    entry.forEach(function commitIterator (handler) {
	      handler(payload);
	    });
	  });
	  this._subscribers.forEach(function (sub) { return sub(mutation, this$1.state); });
	
	  if (options && options.silent) {
	    console.warn(
	      "[vuex] mutation type: " + type + ". Silent option has been removed. " +
	      'Use the filter functionality in the vue-devtools'
	    );
	  }
	};
	
	Store.prototype.dispatch = function dispatch (_type, _payload) {
	  // check object-style dispatch
	  var ref = unifyObjectStyle(_type, _payload);
	    var type = ref.type;
	    var payload = ref.payload;
	
	  var entry = this._actions[type];
	  if (!entry) {
	    console.error(("[vuex] unknown action type: " + type));
	    return
	  }
	  return entry.length > 1
	    ? Promise.all(entry.map(function (handler) { return handler(payload); }))
	    : entry[0](payload)
	};
	
	Store.prototype.subscribe = function subscribe (fn) {
	  var subs = this._subscribers;
	  if (subs.indexOf(fn) < 0) {
	    subs.push(fn);
	  }
	  return function () {
	    var i = subs.indexOf(fn);
	    if (i > -1) {
	      subs.splice(i, 1);
	    }
	  }
	};
	
	Store.prototype.watch = function watch (getter, cb, options) {
	    var this$1 = this;
	
	  assert(typeof getter === 'function', "store.watch only accepts a function.");
	  return this._watcherVM.$watch(function () { return getter(this$1.state, this$1.getters); }, cb, options)
	};
	
	Store.prototype.replaceState = function replaceState (state) {
	    var this$1 = this;
	
	  this._withCommit(function () {
	    this$1._vm._data.$$state = state;
	  });
	};
	
	Store.prototype.registerModule = function registerModule (path, rawModule) {
	  if (typeof path === 'string') { path = [path]; }
	  assert(Array.isArray(path), "module path must be a string or an Array.");
	  this._modules.register(path, rawModule);
	  installModule(this, this.state, path, this._modules.get(path));
	  // reset store to update getters...
	  resetStoreVM(this, this.state);
	};
	
	Store.prototype.unregisterModule = function unregisterModule (path) {
	    var this$1 = this;
	
	  if (typeof path === 'string') { path = [path]; }
	  assert(Array.isArray(path), "module path must be a string or an Array.");
	  this._modules.unregister(path);
	  this._withCommit(function () {
	    var parentState = getNestedState(this$1.state, path.slice(0, -1));
	    Vue.delete(parentState, path[path.length - 1]);
	  });
	  resetStore(this);
	};
	
	Store.prototype.hotUpdate = function hotUpdate (newOptions) {
	  this._modules.update(newOptions);
	  resetStore(this, true);
	};
	
	Store.prototype._withCommit = function _withCommit (fn) {
	  var committing = this._committing;
	  this._committing = true;
	  fn();
	  this._committing = committing;
	};
	
	Object.defineProperties( Store.prototype, prototypeAccessors );
	
	function resetStore (store, hot) {
	  store._actions = Object.create(null);
	  store._mutations = Object.create(null);
	  store._wrappedGetters = Object.create(null);
	  store._modulesNamespaceMap = Object.create(null);
	  var state = store.state;
	  // init all modules
	  installModule(store, state, [], store._modules.root, true);
	  // reset vm
	  resetStoreVM(store, state, hot);
	}
	
	function resetStoreVM (store, state, hot) {
	  var oldVm = store._vm;
	
	  // bind store public getters
	  store.getters = {};
	  var wrappedGetters = store._wrappedGetters;
	  var computed = {};
	  forEachValue(wrappedGetters, function (fn, key) {
	    // use computed to leverage its lazy-caching mechanism
	    computed[key] = function () { return fn(store); };
	    Object.defineProperty(store.getters, key, {
	      get: function () { return store._vm[key]; },
	      enumerable: true // for local getters
	    });
	  });
	
	  // use a Vue instance to store the state tree
	  // suppress warnings just in case the user has added
	  // some funky global mixins
	  var silent = Vue.config.silent;
	  Vue.config.silent = true;
	  store._vm = new Vue({
	    data: {
	      $$state: state
	    },
	    computed: computed
	  });
	  Vue.config.silent = silent;
	
	  // enable strict mode for new vm
	  if (store.strict) {
	    enableStrictMode(store);
	  }
	
	  if (oldVm) {
	    if (hot) {
	      // dispatch changes in all subscribed watchers
	      // to force getter re-evaluation for hot reloading.
	      store._withCommit(function () {
	        oldVm._data.$$state = null;
	      });
	    }
	    Vue.nextTick(function () { return oldVm.$destroy(); });
	  }
	}
	
	function installModule (store, rootState, path, module, hot) {
	  var isRoot = !path.length;
	  var namespace = store._modules.getNamespace(path);
	
	  // register in namespace map
	  if (module.namespaced) {
	    store._modulesNamespaceMap[namespace] = module;
	  }
	
	  // set state
	  if (!isRoot && !hot) {
	    var parentState = getNestedState(rootState, path.slice(0, -1));
	    var moduleName = path[path.length - 1];
	    store._withCommit(function () {
	      Vue.set(parentState, moduleName, module.state);
	    });
	  }
	
	  var local = module.context = makeLocalContext(store, namespace, path);
	
	  module.forEachMutation(function (mutation, key) {
	    var namespacedType = namespace + key;
	    registerMutation(store, namespacedType, mutation, local);
	  });
	
	  module.forEachAction(function (action, key) {
	    var namespacedType = namespace + key;
	    registerAction(store, namespacedType, action, local);
	  });
	
	  module.forEachGetter(function (getter, key) {
	    var namespacedType = namespace + key;
	    registerGetter(store, namespacedType, getter, local);
	  });
	
	  module.forEachChild(function (child, key) {
	    installModule(store, rootState, path.concat(key), child, hot);
	  });
	}
	
	/**
	 * make localized dispatch, commit, getters and state
	 * if there is no namespace, just use root ones
	 */
	function makeLocalContext (store, namespace, path) {
	  var noNamespace = namespace === '';
	
	  var local = {
	    dispatch: noNamespace ? store.dispatch : function (_type, _payload, _options) {
	      var args = unifyObjectStyle(_type, _payload, _options);
	      var payload = args.payload;
	      var options = args.options;
	      var type = args.type;
	
	      if (!options || !options.root) {
	        type = namespace + type;
	        if (!store._actions[type]) {
	          console.error(("[vuex] unknown local action type: " + (args.type) + ", global type: " + type));
	          return
	        }
	      }
	
	      return store.dispatch(type, payload)
	    },
	
	    commit: noNamespace ? store.commit : function (_type, _payload, _options) {
	      var args = unifyObjectStyle(_type, _payload, _options);
	      var payload = args.payload;
	      var options = args.options;
	      var type = args.type;
	
	      if (!options || !options.root) {
	        type = namespace + type;
	        if (!store._mutations[type]) {
	          console.error(("[vuex] unknown local mutation type: " + (args.type) + ", global type: " + type));
	          return
	        }
	      }
	
	      store.commit(type, payload, options);
	    }
	  };
	
	  // getters and state object must be gotten lazily
	  // because they will be changed by vm update
	  Object.defineProperties(local, {
	    getters: {
	      get: noNamespace
	        ? function () { return store.getters; }
	        : function () { return makeLocalGetters(store, namespace); }
	    },
	    state: {
	      get: function () { return getNestedState(store.state, path); }
	    }
	  });
	
	  return local
	}
	
	function makeLocalGetters (store, namespace) {
	  var gettersProxy = {};
	
	  var splitPos = namespace.length;
	  Object.keys(store.getters).forEach(function (type) {
	    // skip if the target getter is not match this namespace
	    if (type.slice(0, splitPos) !== namespace) { return }
	
	    // extract local getter type
	    var localType = type.slice(splitPos);
	
	    // Add a port to the getters proxy.
	    // Define as getter property because
	    // we do not want to evaluate the getters in this time.
	    Object.defineProperty(gettersProxy, localType, {
	      get: function () { return store.getters[type]; },
	      enumerable: true
	    });
	  });
	
	  return gettersProxy
	}
	
	function registerMutation (store, type, handler, local) {
	  var entry = store._mutations[type] || (store._mutations[type] = []);
	  entry.push(function wrappedMutationHandler (payload) {
	    handler(local.state, payload);
	  });
	}
	
	function registerAction (store, type, handler, local) {
	  var entry = store._actions[type] || (store._actions[type] = []);
	  entry.push(function wrappedActionHandler (payload, cb) {
	    var res = handler({
	      dispatch: local.dispatch,
	      commit: local.commit,
	      getters: local.getters,
	      state: local.state,
	      rootGetters: store.getters,
	      rootState: store.state
	    }, payload, cb);
	    if (!isPromise(res)) {
	      res = Promise.resolve(res);
	    }
	    if (store._devtoolHook) {
	      return res.catch(function (err) {
	        store._devtoolHook.emit('vuex:error', err);
	        throw err
	      })
	    } else {
	      return res
	    }
	  });
	}
	
	function registerGetter (store, type, rawGetter, local) {
	  if (store._wrappedGetters[type]) {
	    console.error(("[vuex] duplicate getter key: " + type));
	    return
	  }
	  store._wrappedGetters[type] = function wrappedGetter (store) {
	    return rawGetter(
	      local.state, // local state
	      local.getters, // local getters
	      store.state, // root state
	      store.getters // root getters
	    )
	  };
	}
	
	function enableStrictMode (store) {
	  store._vm.$watch(function () { return this._data.$$state }, function () {
	    assert(store._committing, "Do not mutate vuex store state outside mutation handlers.");
	  }, { deep: true, sync: true });
	}
	
	function getNestedState (state, path) {
	  return path.length
	    ? path.reduce(function (state, key) { return state[key]; }, state)
	    : state
	}
	
	function unifyObjectStyle (type, payload, options) {
	  if (isObject(type) && type.type) {
	    options = payload;
	    payload = type;
	    type = type.type;
	  }
	
	  assert(typeof type === 'string', ("Expects string as the type, but found " + (typeof type) + "."));
	
	  return { type: type, payload: payload, options: options }
	}
	
	function install (_Vue) {
	  if (Vue) {
	    console.error(
	      '[vuex] already installed. Vue.use(Vuex) should be called only once.'
	    );
	    return
	  }
	  Vue = _Vue;
	  applyMixin(Vue);
	}
	
	// auto install in dist mode
	if (typeof window !== 'undefined' && window.Vue) {
	  install(window.Vue);
	}
	
	var mapState = normalizeNamespace(function (namespace, states) {
	  var res = {};
	  normalizeMap(states).forEach(function (ref) {
	    var key = ref.key;
	    var val = ref.val;
	
	    res[key] = function mappedState () {
	      var state = this.$store.state;
	      var getters = this.$store.getters;
	      if (namespace) {
	        var module = getModuleByNamespace(this.$store, 'mapState', namespace);
	        if (!module) {
	          return
	        }
	        state = module.context.state;
	        getters = module.context.getters;
	      }
	      return typeof val === 'function'
	        ? val.call(this, state, getters)
	        : state[val]
	    };
	    // mark vuex getter for devtools
	    res[key].vuex = true;
	  });
	  return res
	});
	
	var mapMutations = normalizeNamespace(function (namespace, mutations) {
	  var res = {};
	  normalizeMap(mutations).forEach(function (ref) {
	    var key = ref.key;
	    var val = ref.val;
	
	    val = namespace + val;
	    res[key] = function mappedMutation () {
	      var args = [], len = arguments.length;
	      while ( len-- ) args[ len ] = arguments[ len ];
	
	      if (namespace && !getModuleByNamespace(this.$store, 'mapMutations', namespace)) {
	        return
	      }
	      return this.$store.commit.apply(this.$store, [val].concat(args))
	    };
	  });
	  return res
	});
	
	var mapGetters = normalizeNamespace(function (namespace, getters) {
	  var res = {};
	  normalizeMap(getters).forEach(function (ref) {
	    var key = ref.key;
	    var val = ref.val;
	
	    val = namespace + val;
	    res[key] = function mappedGetter () {
	      if (namespace && !getModuleByNamespace(this.$store, 'mapGetters', namespace)) {
	        return
	      }
	      if (!(val in this.$store.getters)) {
	        console.error(("[vuex] unknown getter: " + val));
	        return
	      }
	      return this.$store.getters[val]
	    };
	    // mark vuex getter for devtools
	    res[key].vuex = true;
	  });
	  return res
	});
	
	var mapActions = normalizeNamespace(function (namespace, actions) {
	  var res = {};
	  normalizeMap(actions).forEach(function (ref) {
	    var key = ref.key;
	    var val = ref.val;
	
	    val = namespace + val;
	    res[key] = function mappedAction () {
	      var args = [], len = arguments.length;
	      while ( len-- ) args[ len ] = arguments[ len ];
	
	      if (namespace && !getModuleByNamespace(this.$store, 'mapActions', namespace)) {
	        return
	      }
	      return this.$store.dispatch.apply(this.$store, [val].concat(args))
	    };
	  });
	  return res
	});
	
	function normalizeMap (map) {
	  return Array.isArray(map)
	    ? map.map(function (key) { return ({ key: key, val: key }); })
	    : Object.keys(map).map(function (key) { return ({ key: key, val: map[key] }); })
	}
	
	function normalizeNamespace (fn) {
	  return function (namespace, map) {
	    if (typeof namespace !== 'string') {
	      map = namespace;
	      namespace = '';
	    } else if (namespace.charAt(namespace.length - 1) !== '/') {
	      namespace += '/';
	    }
	    return fn(namespace, map)
	  }
	}
	
	function getModuleByNamespace (store, helper, namespace) {
	  var module = store._modulesNamespaceMap[namespace];
	  if (!module) {
	    console.error(("[vuex] module namespace not found in " + helper + "(): " + namespace));
	  }
	  return module
	}
	
	var index = {
	  Store: Store,
	  install: install,
	  version: '2.3.0',
	  mapState: mapState,
	  mapMutations: mapMutations,
	  mapGetters: mapGetters,
	  mapActions: mapActions
	};
	
	return index;
	
	})));


/***/ }),
/* 28 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var TYPE_OBJECT = exports.TYPE_OBJECT = ['User', 'Event', 'Group'];
	var TYPE_GEOS = exports.TYPE_GEOS = ['Point', 'Line'];
	var TYPE_TIME = exports.TYPE_TIME = ['Any', 'Month', 'Week', 'Yesterday', 'Today', 'Recently'];

/***/ }),
/* 29 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// points
	var GET_POINT = exports.GET_POINT = "GET_POINT";
	var PST_POINT = exports.PST_POINT = "PST_POINT";
	var PUT_POINT = exports.PUT_POINT = "PUT_POINT";
	var DEL_POINT = exports.DEL_POINT = "DEL_POINT";
	
	var GET_ALL_POINTS = exports.GET_ALL_POINTS = "GET_ALL_POINTS";
	var GET_RND_POINTS = exports.GET_RND_POINTS = "GET_RND_POINTS";
	var GET_NEAR_POINTS = exports.GET_NEAR_POINTS = "GET_NEAR_POINTS";
	
	// filter
	var GET_FILTER = exports.GET_FILTER = "GET_FILTER";
	var SET_FILTER = exports.SET_FILTER = "SET_FILTER";
	
	// tags
	var SET_TAGS = exports.SET_TAGS = "SET_TAGS";
	
	// new point
	var PUT_NEW_POINT = exports.PUT_NEW_POINT = "PUT_NEW_POINT";
	
	// my point
	var PUT_MY_POINT = exports.PUT_MY_POINT = "PUT_MY_POINT";
	
	// events
	var PST_EVENT = exports.PST_EVENT = "PST_EVENT";

/***/ }),
/* 30 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var POINTS = exports.POINTS = "POINTS";
	
	var MY_POINT = exports.MY_POINT = "MY_POINT";
	var NEW_POINT = exports.NEW_POINT = "NEW_POINT";
	
	var FILTER = exports.FILTER = "FILTER";

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "row panel-filter"
	  }, [_c('div', {
	    staticClass: "col",
	    staticStyle: {
	      "padding-left": "35px"
	    }
	  }, [_c('filter-tag', {
	    attrs: {
	      "tags": _vm.tags
	    }
	  })], 1), _vm._v(" "), _c('b-button-group', {
	    staticClass: "pull-right",
	    attrs: {
	      "horizontal": ""
	    }
	  }, [_c('div', {
	    staticClass: "col"
	  }, [_c('b-form-select', {
	    attrs: {
	      "options": _vm.tobjects
	    },
	    model: {
	      value: (_vm.FILTER.tobject),
	      callback: function($$v) {
	        _vm.FILTER.tobject = $$v
	      },
	      expression: "FILTER.tobject"
	    }
	  }), _c('br'), _vm._v(" "), _c('small', {
	    staticClass: "text-muted"
	  }, [_vm._v("object")])], 1), _vm._v(" "), (_vm.FILTER.tobject === 'Event') ? [_c('div', {
	    staticClass: "col"
	  }, [_c('b-form-select', {
	    attrs: {
	      "options": _vm.ttimes
	    },
	    model: {
	      value: (_vm.FILTER.ttime),
	      callback: function($$v) {
	        _vm.FILTER.ttime = $$v
	      },
	      expression: "FILTER.ttime"
	    }
	  }), _c('br'), _vm._v(" "), _c('small', {
	    staticClass: "text-muted"
	  }, [_vm._v("time")])], 1)] : _vm._e(), _vm._v(" "), _c('div', {
	    staticClass: "col",
	    staticStyle: {
	      "padding-right": "31px"
	    }
	  }, [_c('b-btn', {
	    attrs: {
	      "variant": "primary"
	    },
	    on: {
	      "click": _vm.getFilter
	    }
	  }, [_vm._v("get it")])], 1)], 2)], 1)
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-525417fc", module.exports)
	  }
	}

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    attrs: {
	      "id": "app"
	    }
	  }, [_c('div', {
	    staticClass: "main-panel"
	  }, [_c('b-navbar', {
	    staticClass: "dvi-navbar collapse",
	    attrs: {
	      "toggleable": "",
	      "type": "inverse",
	      "variant": "inverse"
	    }
	  }, [_c('b-collapse', {
	    attrs: {
	      "isNav": "",
	      "id": "nav_collapse"
	    }
	  }, [_c('div', {
	    staticClass: "row"
	  }, [_c('div', {
	    staticStyle: {
	      "padding-left": "20px"
	    }
	  }, [_c('img', {
	    attrs: {
	      "height": "42",
	      "width": "42",
	      "src": "logo.png"
	    }
	  })]), _vm._v(" "), _c('div', {
	    staticClass: "col"
	  }, [_c('b-nav', {
	    attrs: {
	      "isNavBar": ""
	    }
	  }, [_c('router-link', {
	    attrs: {
	      "to": "/event"
	    }
	  }, [_c('b-nav-item', [_vm._v("custom")])], 1), _vm._v(" "), _c('router-link', {
	    attrs: {
	      "to": "/"
	    }
	  }, [_c('b-nav-item', [_vm._v("dvij")])], 1), _vm._v(" "), _c('router-link', {
	    attrs: {
	      "to": "/users"
	    }
	  }, [_c('b-nav-item', [_vm._v("users")])], 1), _vm._v(" "), _c('router-link', {
	    attrs: {
	      "to": "/events"
	    }
	  }, [_c('b-nav-item', [_vm._v("events")])], 1), _vm._v(" "), _c('router-link', {
	    attrs: {
	      "to": "/map"
	    }
	  }, [_c('b-nav-item', [_vm._v("map")])], 1)], 1)], 1), _vm._v(" "), _c('div', {
	    staticClass: "col pull-right"
	  }, [_c('b-btn', {
	    directives: [{
	      name: "b-toggle",
	      rawName: "v-b-toggle.filter",
	      modifiers: {
	        "filter": true
	      }
	    }],
	    attrs: {
	      "variant": "primary"
	    }
	  }, [_vm._v("\n              filter\n            ")]), _vm._v(" "), _c('b-btn', {
	    attrs: {
	      "variant": "primary"
	    }
	  }, [_vm._v("\n              login\n            ")])], 1)])])], 1), _vm._v(" "), _c('b-collapse', {
	    attrs: {
	      "id": "filter"
	    }
	  }, [_c('panel-filter')], 1)], 1), _vm._v(" "), _c('router-view', {
	    staticClass: "view"
	  })], 1)
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-5b948c7d", module.exports)
	  }
	}

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(34)
	
	/* template */
	var __vue_template__ = __webpack_require__(38)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/home/jaime/BUFF/projects/golang/src/dvij.front/src/components/events/EventContainer.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-ccaceb8e", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-ccaceb8e", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] EventContainer.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	
	var _EventCard = __webpack_require__(35);
	
	var _EventCard2 = _interopRequireDefault(_EventCard);
	
	var _vuex = __webpack_require__(27);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  name: 'EventContainer',
	  components: { EventCard: _EventCard2.default },
	  computed: _extends({}, (0, _vuex.mapState)('events', {
	    events: function events(state) {
	      return state.events;
	    }
	  })),
	  created: function created() {
	    this.$store.dispatch('events/getEvents');
	  }
	};

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(36)
	
	/* template */
	var __vue_template__ = __webpack_require__(37)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/home/jaime/BUFF/projects/golang/src/dvij.front/src/components/events/EventCard.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-72d9ae08", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-72d9ae08", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] EventCard.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ }),
/* 36 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	
	exports.default = {
	  props: ['name', 'description']
	};

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', [_c('div', {
	    staticClass: "row"
	  }, [_c('h3', [_vm._v("\n            " + _vm._s(_vm.name) + "\n        ")])]), _vm._v(" "), _c('div', {
	    staticClass: "row"
	  }, [_c('p', [_vm._v("\n            " + _vm._s(_vm.description) + "\n        ")])])])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-72d9ae08", module.exports)
	  }
	}

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', [_vm._v("\n    events\n    "), _c('div', {
	    staticClass: "row"
	  }, [_c('router-link', {
	    attrs: {
	      "to": "/events_new"
	    }
	  }, [_c('b-button', [_vm._v("Create event")])], 1)], 1), _vm._v(" "), _c('div', {
	    staticClass: "row"
	  }, _vm._l((_vm.events), function(event) {
	    return _c('div', {
	      staticClass: "col-md-3"
	    }, [_c('router-link', {
	      attrs: {
	        "to": '/events/' + event.id
	      }
	    }, [_c('event-card', {
	      attrs: {
	        "name": event.name,
	        "description": event.description
	      }
	    })], 1)], 1)
	  }))])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-ccaceb8e", module.exports)
	  }
	}

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(40)
	
	/* template */
	var __vue_template__ = __webpack_require__(41)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/home/jaime/BUFF/projects/golang/src/dvij.front/src/components/events/EventShow.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-5f254f75", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-5f254f75", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] EventShow.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	
	var _EventCard = __webpack_require__(35);
	
	var _EventCard2 = _interopRequireDefault(_EventCard);
	
	var _vuex = __webpack_require__(27);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  components: { EventCard: _EventCard2.default },
	
	  computed: _extends({}, (0, _vuex.mapState)('events', {
	    name: function name(state) {
	      return state.currentEvent.name;
	    },
	    description: function description(state) {
	      return state.currentEvent.description;
	    }
	  })),
	  created: function created() {
	    this.$store.dispatch('events/getEvent', this.$route.params.id);
	  }
	};

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', [_c('b-button', [_c('router-link', {
	    attrs: {
	      "to": "/events"
	    }
	  }, [_vm._v("\n            Back\n        ")])], 1), _vm._v(" "), _c('b-button', [_c('router-link', {
	    attrs: {
	      "to": '/events/' + _vm.$route.params.id + '/edit'
	    }
	  }, [_vm._v("\n            Edit\n        ")])], 1), _vm._v("\n    id = " + _vm._s(_vm.$route.params.id) + "\n    "), _c('hr'), _vm._v(" "), _c('event-card', {
	    attrs: {
	      "name": _vm.name,
	      "description": _vm.description
	    }
	  })], 1)
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-5f254f75", module.exports)
	  }
	}

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(43)
	
	/* template */
	var __vue_template__ = __webpack_require__(52)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/home/jaime/BUFF/projects/golang/src/dvij.front/src/components/events/EventNew.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-611f77d8", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-611f77d8", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] EventNew.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _WithEventForForm = __webpack_require__(44);
	
	var _WithEventForForm2 = _interopRequireDefault(_WithEventForForm);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  mixins: [_WithEventForForm2.default],
	
	  methods: {
	    onSubmit: function onSubmit() {
	      this.$store.dispatch('events/createEvent', this.event);
	    }
	  }
	}; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _EventForm = __webpack_require__(45);
	
	var _EventForm2 = _interopRequireDefault(_EventForm);
	
	var _vuex = __webpack_require__(27);
	
	var _types = __webpack_require__(51);
	
	var mutationsTypes = _interopRequireWildcard(_types);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  components: { EventForm: _EventForm2.default },
	
	  computed: _extends({}, (0, _vuex.mapState)('events', {
	    event: function event(state) {
	      return state.currentEvent;
	    },
	    errors: function errors(state) {
	      return state.currentEventErrors;
	    }
	  })),
	  methods: {
	    onSubmit: function onSubmit() {
	      this.$store.dispatch('events/updateEvent', this.event);
	    },
	    updateName: function updateName(name) {
	      this.$store.commit('events/' + mutationsTypes.CHANGE_CURRENT_EVENT, _extends({}, this.event, { name: name }));
	    },
	    updateText: function updateText(description) {
	      this.$store.commit('events/' + mutationsTypes.CHANGE_CURRENT_EVENT, _extends({}, this.event, { description: description }));
	    }
	  }
	};

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(46)
	
	/* template */
	var __vue_template__ = __webpack_require__(50)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/home/jaime/BUFF/projects/golang/src/dvij.front/src/components/events/EventForm.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-e0d97488", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-e0d97488", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] EventForm.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _FieldsetWithErrors = __webpack_require__(47);
	
	var _FieldsetWithErrors2 = _interopRequireDefault(_FieldsetWithErrors);
	
	var _vuex = __webpack_require__(27);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	
	exports.default = {
	  components: { FieldsetWithErrors: _FieldsetWithErrors2.default },
	  props: ['name', 'description', 'errors'],
	
	  computed: {
	    mName: {
	      get: function get() {
	        return this.name;
	      },
	      set: function set(value) {
	        this.$emit('updateName', value);
	      }
	    },
	    mText: {
	      get: function get() {
	        return this.description;
	      },
	      set: function set(value) {
	        this.$emit('updateText', value);
	      }
	    }
	  },
	  methods: {
	    onSubmit: function onSubmit() {
	      this.$emit('submit');
	    }
	  }
	};

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(48)
	
	/* template */
	var __vue_template__ = __webpack_require__(49)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/home/jaime/BUFF/projects/golang/src/dvij.front/src/components/shared/FieldsetWithErrors.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-b3ee9102", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-b3ee9102", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] FieldsetWithErrors.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ }),
/* 48 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	
	exports.default = {
	  computed: {
	    feedback: function feedback() {
	      return this.errors.toString();
	    },
	    state: function state() {
	      return this.errors.length == 0 ? '' : 'danger';
	    }
	  },
	  props: {
	    errors: {
	      type: Array,
	      default: function _default() {
	        return [];
	      }
	    },
	
	    for_id: {
	      type: String
	    },
	    horizontal: {
	      type: Boolean,
	      default: false
	    },
	    labelSize: {
	      type: Number,
	      default: 6
	    },
	    enabled: {
	      type: Boolean,
	      default: true
	    },
	    label: {
	      type: String,
	      default: null
	    },
	    description: {
	      type: String,
	      default: null
	    }
	  }
	};

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('b-form-fieldset', {
	    attrs: {
	      "feedback": _vm.feedback,
	      "state": _vm.state,
	      "for_id": _vm.for_id,
	      "horizontal": _vm.horizontal,
	      "labelSize": _vm.labelSize,
	      "enabled": _vm.enabled,
	      "label": _vm.label,
	      "description": _vm.description
	    }
	  }, [_vm._t("default")], 2)
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-b3ee9102", module.exports)
	  }
	}

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('form', {
	    on: {
	      "submit": function($event) {
	        $event.preventDefault();
	        _vm.onSubmit($event)
	      }
	    }
	  }, [_c('fieldset-with-errors', {
	    attrs: {
	      "label": "Name",
	      "errors": _vm.errors.name
	    }
	  }, [_c('b-form-input', {
	    attrs: {
	      "placeholder": "Enter name"
	    },
	    model: {
	      value: (_vm.mName),
	      callback: function($$v) {
	        _vm.mName = $$v
	      },
	      expression: "mName"
	    }
	  })], 1), _vm._v(" "), _c('fieldset-with-errors', {
	    attrs: {
	      "label": "Text",
	      "errors": _vm.errors.description
	    }
	  }, [_c('b-form-input', {
	    attrs: {
	      "placeholder": "Enter description"
	    },
	    model: {
	      value: (_vm.mText),
	      callback: function($$v) {
	        _vm.mText = $$v
	      },
	      expression: "mText"
	    }
	  })], 1), _vm._v(" "), _c('button', {
	    staticClass: "btn btn-default",
	    attrs: {
	      "type": "submit"
	    }
	  }, [_vm._v("Submit")])], 1)
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-e0d97488", module.exports)
	  }
	}

/***/ }),
/* 51 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// points
	var SET_POINTS = exports.SET_POINTS = "SET_POINTS";
	var PUT_POINT = exports.PUT_POINT = "PUT_POINT";
	var DEL_POINT = exports.DEL_POINT = "DEL_POINT";
	
	// filter
	var SET_FILTER = exports.SET_FILTER = "SET_FILTER";
	// tags
	var SET_TAGS = exports.SET_TAGS = "SET_TAGS";
	
	var CLEAN_POINTS = exports.CLEAN_POINTS = "CLEAN_POINTS";
	
	// new point
	var PUT_NEW_POINT = exports.PUT_NEW_POINT = "PUT_NEW_POINT";
	
	// my point
	var PUT_MY_POINT = exports.PUT_MY_POINT = "PUT_MY_POINT";
	
	// filter
	// export const SET_FILTER = "SET_FILTER"
	
	var CLEAR_CURRENT_EVENT_ERRORS = exports.CLEAR_CURRENT_EVENT_ERRORS = "CLEAR_CURRENT_EVENT_ERRORS";
	
	var CHANGE_CURRENT_EVENT = exports.CHANGE_CURRENT_EVENT = "CHANGE_CURRENT_EVENT";
	
	var GET_EVENTS_REQUEST = exports.GET_EVENTS_REQUEST = "GET_EVENTS_REQUEST";
	var GET_EVENTS_SUCCESS = exports.GET_EVENTS_SUCCESS = "GET_EVENTS_SUCCESS";
	
	var GET_EVENT_REQUEST = exports.GET_EVENT_REQUEST = "GET_EVENT_REQUEST";
	var GET_EVENT_SUCCESS = exports.GET_EVENT_SUCCESS = "GET_EVENT_SUCCESS";
	
	var CREATE_EVENT_REQUEST = exports.CREATE_EVENT_REQUEST = "CREATE_EVENT_REQUEST";
	var CREATE_EVENT_SUCCESS = exports.CREATE_EVENT_SUCCESS = "CREATE_EVENT_SUCCESS";
	var CREATE_EVENT_FAILURE = exports.CREATE_EVENT_FAILURE = "CREATE_EVENT_FAILURE";
	
	var UPDATE_EVENT_REQUEST = exports.UPDATE_EVENT_REQUEST = "UPDATE_EVENT_REQUEST";
	var UPDATE_EVENT_SUCCESS = exports.UPDATE_EVENT_SUCCESS = "UPDATE_EVENT_SUCCESS";
	var UPDATE_EVENT_FAILURE = exports.UPDATE_EVENT_FAILURE = "UPDATE_EVENT_FAILURE";

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', [_c('b-button', [_c('router-link', {
	    attrs: {
	      "to": "/events"
	    }
	  }, [_vm._v("\n            Back\n        ")])], 1), _vm._v(" "), _c('hr'), _vm._v(" "), _c('event-form', {
	    attrs: {
	      "name": _vm.event.name,
	      "description": _vm.event.description,
	      "errors": _vm.errors
	    },
	    on: {
	      "submit": _vm.onSubmit,
	      "updateName": _vm.updateName,
	      "updateText": _vm.updateText
	    }
	  })], 1)
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-611f77d8", module.exports)
	  }
	}

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(54)
	
	/* template */
	var __vue_template__ = __webpack_require__(55)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/home/jaime/BUFF/projects/golang/src/dvij.front/src/components/events/EventEdit.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-5a56d7fc", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-5a56d7fc", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] EventEdit.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _WithEventForForm = __webpack_require__(44);
	
	var _WithEventForForm2 = _interopRequireDefault(_WithEventForForm);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  mixins: [_WithEventForForm2.default],
	
	  methods: {
	    onSubmit: function onSubmit() {
	      this.$store.dispatch('events/updateEvent', this.event);
	    }
	  }
	}; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', [_c('b-button', [_c('router-link', {
	    attrs: {
	      "to": "/events"
	    }
	  }, [_vm._v("\n            Back\n        ")])], 1), _vm._v(" "), _c('hr'), _vm._v(" "), _c('event-form', {
	    attrs: {
	      "name": _vm.event.name,
	      "description": _vm.event.description,
	      "errors": _vm.errors
	    },
	    on: {
	      "submit": _vm.onSubmit,
	      "updateName": _vm.updateName,
	      "updateText": _vm.updateText
	    }
	  })], 1)
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-5a56d7fc", module.exports)
	  }
	}

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(57)
	
	/* script */
	__vue_exports__ = __webpack_require__(59)
	
	/* template */
	var __vue_template__ = __webpack_require__(62)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/home/jaime/BUFF/projects/golang/src/dvij.front/src/components/layouts/main-map.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-2ca6e43c", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-2ca6e43c", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] main-map.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(58);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(15)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-2ca6e43c!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./main-map.vue", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-2ca6e43c!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./main-map.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* {{{ */\nhtml,\n  body {\n}\n.google-map {\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    z-index: 0;\n}\n.debug-panel {\n    width: 300px;\n    height: 300px;\n    top: 20%;\n    right: 1%;\n    position: absolute;\n    float: right;\n    z-index: 2;\n    background: azure;\n}\n.element-panel {\n    width: 300px;\n    height: 300px;\n    top: 100px;\n    left: 1%;\n    position: absolute;\n    float: right;\n    z-index: 2;\n    background: azure;\n}\n/* }}} */\n", "", {"version":3,"sources":["/./src/components/layouts/main-map.vue?6ca69ec4"],"names":[],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;AAuPA,SAAA;AACA;;CAEA;AACA;IACA,YAAA;IACA,aAAA;IACA,mBAAA;IACA,WAAA;CACA;AAEA;IACA,aAAA;IACA,cAAA;IACA,SAAA;IACA,UAAA;IACA,mBAAA;IACA,aAAA;IACA,WAAA;IACA,kBAAA;CACA;AAEA;IACA,aAAA;IACA,cAAA;IACA,WAAA;IACA,SAAA;IACA,mBAAA;IACA,aAAA;IACA,WAAA;IACA,kBAAA;CACA;AACA,SAAA","file":"main-map.vue","sourcesContent":["<template>\n  <div>\n  <div class=\"google-map\" id=\"map\"></div>\n  <router-view class=\"view\"></router-view>\n  </div>\n</template>\n\n<script>\n  import loadGoogleMapsAPI from 'load-google-maps-api';\n  import API_KEY from '../../constants/settings.js'\n\n  import { mapGetters, mapActions } from 'vuex'\n  import * as gets from '../../constants/types.getters.js'\n  import * as acts from '../../constants/types.actions.js'\n\n  // import api_points from '../components/api.points';\n  export default {\n    watch: {\n      POINTS: function(){\n        //this.clearPoints();\n        setTimeout(() => this.reShowPoints(), 500);\n      },\n    },\n    data(){//{{{\n      const markers = [];\n      let new_marker = {};\n      let my_marker = {};\n      return {\n        new_marker,\n        my_marker,\n        markers,\n      }\n    },//}}}\n    mounted: function() {//{{{\n      this.clearPoints();\n      this.markers = [];\n      console.log('markers: ',this.markers);\n      loadGoogleMapsAPI({key: API_KEY}).then((googleMaps) => {\n        return\n      }).then(() => {\n        navigator.geolocation.getCurrentPosition(this.initPosMap, this.initNoPosMap);\n        //return this.GET_NEAR_POINTS();\n      //}).then(() => {\n        //console.log(this.POINTS);\n        //setTimeout(() => this.drawPoints(), 1000);\n      });\n    },//}}}\n    computed: {\n      ...mapGetters([//{{{\n        gets.POINTS,\n        gets.FILTER,\n      ]),//}}}\n    },\n    methods: {\n      ...mapActions([//{{{\n        acts.GET_ALL_POINTS,\n        acts.GET_RND_POINTS,\n        acts.GET_NEAR_POINTS,\n        acts.GET_FILTER,\n        acts.SET_FILTER,\n        acts.PUT_MY_POINT,\n        acts.PUT_NEW_POINT,\n      ]),//}}}\n      drawPoints: function(){//{{{\n        let points = this.POINTS;\n        //console.log('draw: ', points);\n        for(let i = 0; i < points.length; i++){\n          let marker = new google.maps.Marker({\n            id: points[i]._id,\n            //title: points[i].token,\n            position: {\n              lng: points[i].location.coordinates[0],\n              lat: points[i].location.coordinates[1]\n            },\n            draggable: false,\n            //animation: google.maps.Animation.BOUNCE,\n            animation: google.maps.Animation.mo,\n            map: this.map,\n          });\n          console.log(points[i]);\n          console.log(marker);\n\n          if(points[i].editable) {\n            marker.addListener('click',\n              () => this.$router.push({path:`/map/${points[i]._id}/edit`}));\n          } else {\n            marker.addListener('click',\n              () => this.$router.push({path:`/map/${points[i]._id}`}));\n          };\n          this.markers.push(marker);\n        };\n      },//}}}\n      reDrawPoints: function(){//{{{\n        const points = this.POINTS;\n        //this.markers = [];\n        //console.log('redrawed: ', points);\n        //console.log('markered: ', this.markers);\n        //console.log('rw: ', points);\n        if(points === null || points === undefined) {\n          return;\n        };\n        // set new points to map\n        for(let i = 0; i < points.length; i++){\n          if(this.markers.find((e, num) => e.id === points[i]._id)) {\n            continue;\n          };\n          console.log('redraw: ', points[i]._id);\n          setTimeout(()=> {\n            const marker = new google.maps.Marker({\n              id: points[i]._id,\n              position: {\n                lng: points[i].location.coordinates[0],\n                lat: points[i].location.coordinates[1]\n              },\n              draggable: false,\n              animation: google.maps.Animation.DROP,\n              //animation: google.maps.Animation.mo,\n              map: this.map,\n            });\n            if(points[i].editable) {\n              marker.addListener('click',\n                () => this.$router.push({path:`/map/${points[i]._id}/edit`}));\n            } else {\n              marker.addListener('click',\n                () => this.$router.push({path:`/map/${points[i]._id}`}));\n            };\n            this.markers.push(marker);\n          }, 1000*i);\n        };\n      },//}}}\n      reShowPoints: function(){//{{{\n        const points = this.POINTS;\n        if(points === null || points === undefined) {\n          return;\n        };\n        for(let i = 0; i < this.markers.length; i++){\n          this.markers[i].setMap(null);\n        };\n        this.markers = [];\n        // set points to map\n        for(let i = 0; i < points.length; i++){\n          setTimeout(()=> {\n            const marker = new google.maps.Marker({\n              id: points[i]._id,\n              position: {\n                lng: points[i].location.coordinates[0],\n                lat: points[i].location.coordinates[1]\n              },\n              draggable: false,\n              //animation: google.maps.Animation.DROP,\n              animation: google.maps.Animation.mo,\n              map: this.map,\n            });\n            if(points[i].editable) {\n              marker.addListener('click',\n                () => this.$router.push({path:`/map/${points[i]._id}/edit`}));\n            } else {\n              marker.addListener('click',\n                () => this.$router.push({path:`/map/${points[i]._id}`}));\n            };\n            this.markers.push(marker);\n          }, 10*i);\n        };\n      },//}}}\n      clearPoints: function(){//{{{\n        for(let i = 0; i < this.markers.length; i++){\n          this.markers[i].setMap(null);\n        };\n      },//}}}\n      initPosMap: function(pos){//{{{\n        //console.log('pos: ',pos.coords);\n        //this.markers = [];\n        const my_point = {\n          editable: true,\n          name: 'it\\'s me',\n          latitude: pos.coords.latitude,\n          longitude: pos.coords.longitude,\n        };\n        this.PUT_MY_POINT(my_point);\n\n        const map = new google.maps.Map(document.getElementById('map'), {\n          zoom: 4,\n          center: { lat: pos.coords.latitude, lng: pos.coords.longitude },\n          disableDefaultUI: true,\n        });\n        this.map = map;\n\n        google.maps.event.addListener(map, 'click', this.addMarkerOnClick);\n        this.addMyMarker(my_point);\n        map.addListener('idle', () => {\n          const bounds = this.map.getBounds();\n          const center = this.map.getCenter();\n          const scope = bounds.getNorthEast().lat() - bounds.getSouthWest().lat();\n          const reqFilter = {\n            scope: Math.floor(100000*scope),\n            lng: center.lng(),\n            lat: center.lat(),\n          };\n          this.SET_FILTER(reqFilter).then(() => {\n            return this.GET_FILTER(this.FILTER);\n          }).then(() => {\n            console.log(this.POINTS);\n          });\n        });\n      },//}}}\n      addMarkerOnClick: function(e){//{{{\n        const new_point = {\n          name: 'something',\n          editable: true,\n          latitude: e.latLng.lat(),\n          longitude: e.latLng.lng(),\n        };\n        this.PUT_NEW_POINT(new_point);\n        this.addNewMarker(new_point);\n        this.$router.push({ path: `/map/new` });\n      },//}}}\n      addMyMarker: function(my_point){//{{{\n        console.log('## my point marker');\n        const marker = new google.maps.Marker({\n          title: my_point.name,\n          position: { lat: my_point.latitude, lng: my_point.longitude },\n          draggable: false,\n          animation: google.maps.Animation.mo,\n          map: this.map,\n        });\n        marker.addListener('click', () => this.$router.push({path:`/map/my`}));\n        this.my_marker = marker;\n      },//}}}\n      addNewMarker: function(new_point){//{{{\n        if(Object.keys(this.new_marker).length > 0) {\n          this.new_marker.setMap(null);\n        }\n        const marker = new google.maps.Marker({\n          position: { lat: new_point.latitude, lng: new_point.longitude },\n          title: new_point.name,\n          draggable: true,\n          animation: google.maps.Animation.mo,\n          map: this.map,\n        });\n        marker.addListener('click', () => this.$router.push({path:`/map/new`}));\n        this.new_marker = marker;\n      },//}}}\n    }\n  }\n</script>\n\n<style>\n/* {{{ */\n  html,\n  body {\n  }\n  .google-map {\n    width: 100%;\n    height: 100%;\n    position: absolute;\n    z-index: 0;\n  }\n\n  .debug-panel {\n    width: 300px;\n    height: 300px;\n    top: 20%;\n    right: 1%;\n    position: absolute;\n    float: right;\n    z-index: 2;\n    background: azure;\n  }\n\n  .element-panel {\n    width: 300px;\n    height: 300px;\n    top: 100px;\n    left: 1%;\n    position: absolute;\n    float: right;\n    z-index: 2;\n    background: azure;\n  }\n/* }}} */\n</style>\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
	//
	//
	//
	//
	//
	//
	
	var _loadGoogleMapsApi = __webpack_require__(60);
	
	var _loadGoogleMapsApi2 = _interopRequireDefault(_loadGoogleMapsApi);
	
	var _settings = __webpack_require__(61);
	
	var _settings2 = _interopRequireDefault(_settings);
	
	var _vuex = __webpack_require__(27);
	
	var _typesGetters = __webpack_require__(30);
	
	var gets = _interopRequireWildcard(_typesGetters);
	
	var _typesActions = __webpack_require__(29);
	
	var acts = _interopRequireWildcard(_typesActions);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	// import api_points from '../components/api.points';
	exports.default = {
	  watch: {
	    POINTS: function POINTS() {
	      var _this = this;
	
	      //this.clearPoints();
	      setTimeout(function () {
	        return _this.reShowPoints();
	      }, 500);
	    }
	  },
	  data: function data() {
	    //{{{
	    var markers = [];
	    var new_marker = {};
	    var my_marker = {};
	    return {
	      new_marker: new_marker,
	      my_marker: my_marker,
	      markers: markers
	    };
	  },
	  //}}}
	  mounted: function mounted() {
	    var _this2 = this;
	
	    //{{{
	    this.clearPoints();
	    this.markers = [];
	    console.log('markers: ', this.markers);
	    (0, _loadGoogleMapsApi2.default)({ key: _settings2.default }).then(function (googleMaps) {
	      return;
	    }).then(function () {
	      navigator.geolocation.getCurrentPosition(_this2.initPosMap, _this2.initNoPosMap);
	      //return this.GET_NEAR_POINTS();
	      //}).then(() => {
	      //console.log(this.POINTS);
	      //setTimeout(() => this.drawPoints(), 1000);
	    });
	  }, //}}}
	  computed: _extends({}, (0, _vuex.mapGetters)([//{{{
	  gets.POINTS, gets.FILTER])),
	  methods: _extends({}, (0, _vuex.mapActions)([//{{{
	  acts.GET_ALL_POINTS, acts.GET_RND_POINTS, acts.GET_NEAR_POINTS, acts.GET_FILTER, acts.SET_FILTER, acts.PUT_MY_POINT, acts.PUT_NEW_POINT]), { //}}}
	    drawPoints: function drawPoints() {
	      var _this3 = this;
	
	      //{{{
	      var points = this.POINTS;
	      //console.log('draw: ', points);
	
	      var _loop = function _loop(i) {
	        var marker = new google.maps.Marker({
	          id: points[i]._id,
	          //title: points[i].token,
	          position: {
	            lng: points[i].location.coordinates[0],
	            lat: points[i].location.coordinates[1]
	          },
	          draggable: false,
	          //animation: google.maps.Animation.BOUNCE,
	          animation: google.maps.Animation.mo,
	          map: _this3.map
	        });
	        console.log(points[i]);
	        console.log(marker);
	
	        if (points[i].editable) {
	          marker.addListener('click', function () {
	            return _this3.$router.push({ path: '/map/' + points[i]._id + '/edit' });
	          });
	        } else {
	          marker.addListener('click', function () {
	            return _this3.$router.push({ path: '/map/' + points[i]._id });
	          });
	        };
	        _this3.markers.push(marker);
	      };
	
	      for (var i = 0; i < points.length; i++) {
	        _loop(i);
	      };
	    }, //}}}
	    reDrawPoints: function reDrawPoints() {
	      var _this4 = this;
	
	      //{{{
	      var points = this.POINTS;
	      //this.markers = [];
	      //console.log('redrawed: ', points);
	      //console.log('markered: ', this.markers);
	      //console.log('rw: ', points);
	      if (points === null || points === undefined) {
	        return;
	      };
	      // set new points to map
	
	      var _loop2 = function _loop2(i) {
	        if (_this4.markers.find(function (e, num) {
	          return e.id === points[i]._id;
	        })) {
	          return 'continue';
	        };
	        console.log('redraw: ', points[i]._id);
	        setTimeout(function () {
	          var marker = new google.maps.Marker({
	            id: points[i]._id,
	            position: {
	              lng: points[i].location.coordinates[0],
	              lat: points[i].location.coordinates[1]
	            },
	            draggable: false,
	            animation: google.maps.Animation.DROP,
	            //animation: google.maps.Animation.mo,
	            map: _this4.map
	          });
	          if (points[i].editable) {
	            marker.addListener('click', function () {
	              return _this4.$router.push({ path: '/map/' + points[i]._id + '/edit' });
	            });
	          } else {
	            marker.addListener('click', function () {
	              return _this4.$router.push({ path: '/map/' + points[i]._id });
	            });
	          };
	          _this4.markers.push(marker);
	        }, 1000 * i);
	      };
	
	      for (var i = 0; i < points.length; i++) {
	        var _ret2 = _loop2(i);
	
	        if (_ret2 === 'continue') continue;
	      };
	    }, //}}}
	    reShowPoints: function reShowPoints() {
	      var _this5 = this;
	
	      //{{{
	      var points = this.POINTS;
	      if (points === null || points === undefined) {
	        return;
	      };
	      for (var i = 0; i < this.markers.length; i++) {
	        this.markers[i].setMap(null);
	      };
	      this.markers = [];
	      // set points to map
	
	      var _loop3 = function _loop3(_i) {
	        setTimeout(function () {
	          var marker = new google.maps.Marker({
	            id: points[_i]._id,
	            position: {
	              lng: points[_i].location.coordinates[0],
	              lat: points[_i].location.coordinates[1]
	            },
	            draggable: false,
	            //animation: google.maps.Animation.DROP,
	            animation: google.maps.Animation.mo,
	            map: _this5.map
	          });
	          if (points[_i].editable) {
	            marker.addListener('click', function () {
	              return _this5.$router.push({ path: '/map/' + points[_i]._id + '/edit' });
	            });
	          } else {
	            marker.addListener('click', function () {
	              return _this5.$router.push({ path: '/map/' + points[_i]._id });
	            });
	          };
	          _this5.markers.push(marker);
	        }, 10 * _i);
	      };
	
	      for (var _i = 0; _i < points.length; _i++) {
	        _loop3(_i);
	      };
	    }, //}}}
	    clearPoints: function clearPoints() {
	      //{{{
	      for (var i = 0; i < this.markers.length; i++) {
	        this.markers[i].setMap(null);
	      };
	    }, //}}}
	    initPosMap: function initPosMap(pos) {
	      var _this6 = this;
	
	      //{{{
	      //console.log('pos: ',pos.coords);
	      //this.markers = [];
	      var my_point = {
	        editable: true,
	        name: 'it\'s me',
	        latitude: pos.coords.latitude,
	        longitude: pos.coords.longitude
	      };
	      this.PUT_MY_POINT(my_point);
	
	      var map = new google.maps.Map(document.getElementById('map'), {
	        zoom: 4,
	        center: { lat: pos.coords.latitude, lng: pos.coords.longitude },
	        disableDefaultUI: true
	      });
	      this.map = map;
	
	      google.maps.event.addListener(map, 'click', this.addMarkerOnClick);
	      this.addMyMarker(my_point);
	      map.addListener('idle', function () {
	        var bounds = _this6.map.getBounds();
	        var center = _this6.map.getCenter();
	        var scope = bounds.getNorthEast().lat() - bounds.getSouthWest().lat();
	        var reqFilter = {
	          scope: Math.floor(100000 * scope),
	          lng: center.lng(),
	          lat: center.lat()
	        };
	        _this6.SET_FILTER(reqFilter).then(function () {
	          return _this6.GET_FILTER(_this6.FILTER);
	        }).then(function () {
	          console.log(_this6.POINTS);
	        });
	      });
	    }, //}}}
	    addMarkerOnClick: function addMarkerOnClick(e) {
	      //{{{
	      var new_point = {
	        name: 'something',
	        editable: true,
	        latitude: e.latLng.lat(),
	        longitude: e.latLng.lng()
	      };
	      this.PUT_NEW_POINT(new_point);
	      this.addNewMarker(new_point);
	      this.$router.push({ path: '/map/new' });
	    }, //}}}
	    addMyMarker: function addMyMarker(my_point) {
	      var _this7 = this;
	
	      //{{{
	      console.log('## my point marker');
	      var marker = new google.maps.Marker({
	        title: my_point.name,
	        position: { lat: my_point.latitude, lng: my_point.longitude },
	        draggable: false,
	        animation: google.maps.Animation.mo,
	        map: this.map
	      });
	      marker.addListener('click', function () {
	        return _this7.$router.push({ path: '/map/my' });
	      });
	      this.my_marker = marker;
	    }, //}}}
	    addNewMarker: function addNewMarker(new_point) {
	      var _this8 = this;
	
	      //{{{
	      if (Object.keys(this.new_marker).length > 0) {
	        this.new_marker.setMap(null);
	      }
	      var marker = new google.maps.Marker({
	        position: { lat: new_point.latitude, lng: new_point.longitude },
	        title: new_point.name,
	        draggable: true,
	        animation: google.maps.Animation.mo,
	        map: this.map
	      });
	      marker.addListener('click', function () {
	        return _this8.$router.push({ path: '/map/new' });
	      });
	      this.new_marker = marker;
	    } })
	};

/***/ }),
/* 60 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports.default = function () {
	  var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
	  var client = _ref.client;
	  var key = _ref.key;
	  var language = _ref.language;
	  var _ref$libraries = _ref.libraries;
	  var libraries = _ref$libraries === undefined ? [] : _ref$libraries;
	  var _ref$timeout = _ref.timeout;
	  var timeout = _ref$timeout === undefined ? 10000 : _ref$timeout;
	  var v = _ref.v;
	
	  var callbackName = '__googleMapsApiOnLoadCallback';
	
	  return new Promise(function (resolve, reject) {
	
	    // Exit if not running inside a browser.
	    if (typeof window === 'undefined') {
	      return reject(new Error('Can only load the Google Maps API in the browser'));
	    }
	
	    // Prepare the `script` tag to be inserted into the page.
	    var scriptElement = document.createElement('script');
	    var params = ['callback=' + callbackName];
	    if (client) params.push('client=' + client);
	    if (key) params.push('key=' + key);
	    if (language) params.push('language=' + language);
	    libraries = [].concat(libraries); // Ensure that `libraries` is an array
	    if (libraries.length) params.push('libraries=' + libraries.join(','));
	    if (v) params.push('v=' + v);
	    scriptElement.src = 'https://maps.googleapis.com/maps/api/js?' + params.join('&');
	
	    // Timeout if necessary.
	    var timeoutId = null;
	    if (timeout) {
	      timeoutId = setTimeout(function () {
	        window[callbackName] = function () {}; // Set the on load callback to a no-op.
	        reject(new Error('Could not load the Google Maps API'));
	      }, timeout);
	    }
	
	    // Hook up the on load callback.
	    window[callbackName] = function () {
	      if (timeoutId !== null) {
	        clearTimeout(timeoutId);
	      }
	      resolve(window.google.maps);
	      delete window[callbackName];
	    };
	
	    // Insert the `script` tag.
	    document.body.appendChild(scriptElement);
	  });
	};

/***/ }),
/* 61 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var API_KEY = exports.API_KEY = 'AIzaSyCbtCG0K8Tq9tpdljYkW7i-gxzFD8FvPi8';

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', [_c('div', {
	    staticClass: "google-map",
	    attrs: {
	      "id": "map"
	    }
	  }), _vm._v(" "), _c('router-view', {
	    staticClass: "view"
	  })], 1)
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-2ca6e43c", module.exports)
	  }
	}

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(64)
	
	/* script */
	__vue_exports__ = __webpack_require__(66)
	
	/* template */
	var __vue_template__ = __webpack_require__(67)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/home/jaime/BUFF/projects/golang/src/dvij.front/src/components/points/panel-point.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-27a681af", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-27a681af", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] panel-point.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(65);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(15)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-27a681af!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./panel-point.vue", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-27a681af!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./panel-point.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"panel-point.vue","sourceRoot":"webpack://"}]);
	
	// exports


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	
	
	var _typesGetters = __webpack_require__(30);
	
	var gets = _interopRequireWildcard(_typesGetters);
	
	var _typesActions = __webpack_require__(29);
	
	var acts = _interopRequireWildcard(_typesActions);
	
	var _vuex = __webpack_require__(27);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	exports.default = {
	  name: 'Point',
	  watch: {
	    //{{{
	    $route: function $route() {
	      this.show_point();
	    }
	  }, //}}}
	  data: function data() {
	    //{{{
	    var point = {
	      _id: 'no id', token: 'no token',
	      location: { type: 'no type', coordinates: [0.00001, 0.00001] }
	    };
	    return {
	      point: point
	    };
	  },
	  //}}}
	  mounted: function mounted() {
	    //{{{
	    this.show_point();
	  }, //}}}
	  computed: _extends({}, (0, _vuex.mapGetters)([//{{{
	  gets.POINTS])),
	  methods: {
	    show_point: function show_point() {
	      var _this = this;
	
	      //{{{
	      var point = this.POINTS.find(function (item) {
	        return item._id == _this.$route.params.id;
	      });
	      if (point) {
	        this.point = point;
	      } else {
	        setTimeout(function () {
	          var point = _this.POINTS.find(function (item) {
	            return item._id == _this.$route.params.id;
	          });
	          if (point) {
	            _this.point = point;
	          };
	        }, 3000);
	      };
	    },
	    //}}}
	    edit: function edit() {
	      //{{{
	      this.$router.push({ path: '/map/' + this.$route.params.id + '/edit' });
	    },
	    //}}}
	    close: function close() {
	      //{{{
	      this.$router.push({ path: '/map' });
	    }
	  }
	};

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "panel-point"
	  }, [_c('b-card', {
	    staticClass: "mb-1"
	  }, [_vm._v("id: " + _vm._s(_vm.point._id))]), _vm._v(" "), _c('b-card', {
	    staticClass: "mb-1"
	  }, [_vm._v("token: " + _vm._s(_vm.point.token))]), _vm._v(" "), _c('b-card', {
	    staticClass: "mb-1"
	  }, [_vm._v("type: " + _vm._s(_vm.point.location.type))]), _vm._v(" "), _c('b-card', {
	    staticClass: "mb-1"
	  }, [_c('div', [_vm._v("lat: " + _vm._s(_vm.point.location.coordinates[0]))]), _vm._v(" "), _c('div', [_vm._v("lng: " + _vm._s(_vm.point.location.coordinates[1]))])]), _vm._v(" "), _c('div', {
	    staticClass: "row justify-content-end",
	    staticStyle: {
	      "padding-right": "16px"
	    }
	  }, [_c('b-button', {
	    staticClass: "col-4",
	    attrs: {
	      "size": _vm.lg,
	      "variant": _vm.primary,
	      "href": ""
	    },
	    on: {
	      "click": _vm.edit
	    }
	  }, [_vm._v("edit")]), _vm._v(" "), _c('b-button', {
	    staticClass: "col-4",
	    attrs: {
	      "size": _vm.lg,
	      "variant": _vm.primary,
	      "href": ""
	    },
	    on: {
	      "click": _vm.close
	    }
	  }, [_vm._v("close")])], 1)], 1)
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-27a681af", module.exports)
	  }
	}

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(69)
	
	/* script */
	__vue_exports__ = __webpack_require__(71)
	
	/* template */
	var __vue_template__ = __webpack_require__(72)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/home/jaime/BUFF/projects/golang/src/dvij.front/src/components/points/panel-edit-point.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-7b84b204", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-7b84b204", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] panel-edit-point.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(70);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(15)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-7b84b204!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./panel-edit-point.vue", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-7b84b204!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./panel-edit-point.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"panel-edit-point.vue","sourceRoot":"webpack://"}]);
	
	// exports


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	
	var _apiAnimation = __webpack_require__(26);
	
	var anime = _interopRequireWildcard(_apiAnimation);
	
	var _vuex = __webpack_require__(27);
	
	var _typesSome = __webpack_require__(28);
	
	var types = _interopRequireWildcard(_typesSome);
	
	var _typesActions = __webpack_require__(29);
	
	var acts = _interopRequireWildcard(_typesActions);
	
	var _typesGetters = __webpack_require__(30);
	
	var gets = _interopRequireWildcard(_typesGetters);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	exports.default = {
	  name: 'EditPoint',
	  data: function data() {
	    //{{{
	    var edit_point = {
	      id: '', token: '', editable: true,
	      type: '', latitude: 0.0, longitude: 0.0
	    };
	    return {
	      edit_point: edit_point,
	      tgeoses: []
	    };
	  },
	  //}}}
	  mounted: function mounted() {
	    var _this = this;
	
	    //{{{
	    this.tgeoses = types.TYPE_GEOS;
	
	    var edit_point = this.POINTS.find(function (e) {
	      return e._id == _this.$route.params.id;
	    });
	    console.log(edit_point);
	    this.edit_point.id = edit_point._id;
	    this.edit_point.token = edit_point.token;
	    this.edit_point.type = edit_point.location.type;
	    this.edit_point.latitude = edit_point.location.coordinates[0];
	    this.edit_point.longitude = edit_point.location.coordinates[1];
	  }, //}}}
	  computed: _extends({}, (0, _vuex.mapGetters)([//{{{
	  gets.POINTS])),
	  methods: _extends({}, (0, _vuex.mapActions)([//{{{
	  acts.PST_POINT, acts.DEL_POINT]), {
	    //}}}
	    putPoint: function putPoint() {
	      var _this2 = this;
	
	      //{{{
	      var point = {
	        _id: this.edit_point.id,
	        token: this.edit_point.token,
	        location: {
	          type: this.NEW_POINT.type,
	          coordinates: [parseFloat(this.NEW_POINT.longitude), parseFloat(this.NEW_POINT.latitude)]
	        }
	      };
	      this.PUT_POINT(point).then(function (e) {
	        return anime.blink_good(_this2.$refs.btn_ok);
	      }).then(function () {
	        _this2.close();
	      }).catch(function (e) {
	        console.log(e);
	        anime.blink_err(_this2.$refs.btn_ok);
	      });
	    },
	    //}}}
	    delPoint: function delPoint() {
	      var _this3 = this;
	
	      //{{{
	      var point = { id: this.edit_point.id };
	      this.DEL_POINT(point).then(function (e) {
	        return anime.blink_good(_this3.$refs.btn_del);
	      }).then(function () {
	        _this3.close();
	      }).catch(function (e) {
	        console.log(e);
	        anime.blink_err(_this3.$refs.btn_del);
	      });
	    },
	    //}}}
	    close: function close() {
	      //{{{
	      this.$router.push({ path: '/map' });
	    }
	  })
	};

/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "panel-point"
	  }, [_c('b-form-input', {
	    attrs: {
	      "type": "text",
	      "placeholder": "enter token"
	    },
	    model: {
	      value: (_vm.edit_point.token),
	      callback: function($$v) {
	        _vm.edit_point.token = $$v
	      },
	      expression: "edit_point.token"
	    }
	  }), _vm._v(" "), _c('small', {
	    staticClass: "text-muted"
	  }, [_vm._v("change token")]), _vm._v(" "), _c('b-form-select', {
	    staticClass: "col-10",
	    attrs: {
	      "options": _vm.tgeoses
	    },
	    model: {
	      value: (_vm.edit_point.type),
	      callback: function($$v) {
	        _vm.edit_point.type = $$v
	      },
	      expression: "edit_point.type"
	    }
	  }), _vm._v(" "), _c('small', {
	    staticClass: "text-muted",
	    attrs: {
	      "vertical": ""
	    }
	  }, [_vm._v("change type point")]), _vm._v(" "), _c('b-button-group', {
	    staticClass: "row"
	  }, [_c('div', {
	    staticClass: "col"
	  }, [_c('b-form-input', {
	    attrs: {
	      "type": "number",
	      "step": "0.01",
	      "placeholder": "enter latitude"
	    },
	    model: {
	      value: (_vm.edit_point.latitude),
	      callback: function($$v) {
	        _vm.edit_point.latitude = $$v
	      },
	      expression: "edit_point.latitude"
	    }
	  }), _vm._v(" "), _c('small', {
	    staticClass: "text-muted"
	  }, [_vm._v("change lat position")])], 1), _vm._v(" "), _c('div', {
	    staticClass: "col"
	  }, [_c('b-form-input', {
	    attrs: {
	      "type": "number",
	      "step": "0.01",
	      "placeholder": "enter longitude"
	    },
	    model: {
	      value: (_vm.edit_point.longitude),
	      callback: function($$v) {
	        _vm.edit_point.longitude = $$v
	      },
	      expression: "edit_point.longitude"
	    }
	  }), _vm._v(" "), _c('small', {
	    staticClass: "text-muted"
	  }, [_vm._v("change lng position")])], 1)]), _vm._v(" "), _c('div', {
	    staticClass: "row justify-content-end",
	    staticStyle: {
	      "padding-right": "16px"
	    }
	  }, [_c('b-button', {
	    ref: "btn_ok",
	    staticClass: "col-4",
	    attrs: {
	      "size": _vm.lg,
	      "variant": _vm.primary,
	      "href": ""
	    },
	    on: {
	      "click": _vm.putPoint
	    }
	  }, [_vm._v("ok")]), _vm._v(" "), _c('b-button', {
	    ref: "btn_del",
	    staticClass: "col-4",
	    attrs: {
	      "size": _vm.lg,
	      "variant": _vm.primary,
	      "href": ""
	    },
	    on: {
	      "click": _vm.delPoint
	    }
	  }, [_vm._v("delete")]), _vm._v(" "), _c('b-button', {
	    staticClass: "col-4",
	    attrs: {
	      "size": _vm.lg,
	      "variant": _vm.primary,
	      "href": ""
	    },
	    on: {
	      "click": _vm.close
	    }
	  }, [_vm._v("close")])], 1)], 1)
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-7b84b204", module.exports)
	  }
	}

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(74)
	
	/* script */
	__vue_exports__ = __webpack_require__(76)
	
	/* template */
	var __vue_template__ = __webpack_require__(77)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/home/jaime/BUFF/projects/golang/src/dvij.front/src/components/points/panel-my-point.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-32d0f340", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-32d0f340", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] panel-my-point.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(75);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(15)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-32d0f340!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./panel-my-point.vue", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-32d0f340!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./panel-my-point.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"panel-my-point.vue","sourceRoot":"webpack://"}]);
	
	// exports


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	
	var _vuex = __webpack_require__(27);
	
	var _typesGetters = __webpack_require__(30);
	
	var gets = _interopRequireWildcard(_typesGetters);
	
	var _typesActions = __webpack_require__(29);
	
	var acts = _interopRequireWildcard(_typesActions);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	exports.default = {
	  name: 'MyPoint',
	  data: function data() {
	    //{{{
	    return {};
	  },
	  //}}}
	  mounted: function mounted() {
	    //{{{
	    console.log(this.MY_POINT);
	  }, //}}}
	  computed: _extends({}, (0, _vuex.mapGetters)([//{{{
	  gets.MY_POINT])),
	  methods: {
	    close: function close() {
	      //{{{
	      this.$router.push({ path: '/map' });
	    }
	  }
	};

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "panel-point"
	  }, [_c('b-card', {
	    staticClass: "mb-1"
	  }, [_vm._v("token: " + _vm._s(_vm.MY_POINT.token))]), _vm._v(" "), _c('b-card', {
	    staticClass: "mb-1"
	  }, [_vm._v("type: " + _vm._s(_vm.MY_POINT.type))]), _vm._v(" "), _c('b-card', {
	    staticClass: "mb-1"
	  }, [_c('div', [_vm._v("lat: " + _vm._s(_vm.MY_POINT.latitude))]), _vm._v(" "), _c('div', [_vm._v("lng: " + _vm._s(_vm.MY_POINT.longitude))])]), _vm._v(" "), _c('div', {
	    model: {
	      value: (_vm.MY_POINT.token),
	      callback: function($$v) {
	        _vm.MY_POINT.token = $$v
	      },
	      expression: "MY_POINT.token"
	    }
	  }), _vm._v(" "), _c('div', {
	    staticClass: "row justify-content-end",
	    staticStyle: {
	      "padding-right": "16px"
	    }
	  }, [_c('b-button', {
	    staticClass: "col-4",
	    attrs: {
	      "size": _vm.lg,
	      "variant": _vm.primary,
	      "href": ""
	    },
	    on: {
	      "click": _vm.close
	    }
	  }, [_vm._v("close")])], 1)], 1)
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-32d0f340", module.exports)
	  }
	}

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(79)
	
	/* script */
	__vue_exports__ = __webpack_require__(81)
	
	/* template */
	var __vue_template__ = __webpack_require__(88)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/home/jaime/BUFF/projects/golang/src/dvij.front/src/components/points/panel-new-point.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-50676a42", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-50676a42", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] panel-new-point.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(80);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(15)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-50676a42!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./panel-new-point.vue", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-50676a42!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./panel-new-point.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports
	
	
	// module
	exports.push([module.id, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "", {"version":3,"sources":[],"names":[],"mappings":"","file":"panel-new-point.vue","sourceRoot":"webpack://"}]);
	
	// exports


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	
	var _picZone = __webpack_require__(82);
	
	var _picZone2 = _interopRequireDefault(_picZone);
	
	var _apiAnimation = __webpack_require__(26);
	
	var anime = _interopRequireWildcard(_apiAnimation);
	
	var _vuex = __webpack_require__(27);
	
	var _typesSome = __webpack_require__(28);
	
	var types = _interopRequireWildcard(_typesSome);
	
	var _typesActions = __webpack_require__(29);
	
	var acts = _interopRequireWildcard(_typesActions);
	
	var _typesGetters = __webpack_require__(30);
	
	var gets = _interopRequireWildcard(_typesGetters);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  name: 'NewPoint',
	  components: { //{{{
	    PicZone: _picZone2.default
	  }, //}}}
	  data: function data() {
	    //{{{
	    return {
	      tobject: []
	    };
	  },
	  //}}}
	  computed: _extends({}, (0, _vuex.mapGetters)([//{{{
	  gets.NEW_POINT])),
	  mounted: function mounted() {
	    //{{{
	    this.tobject = types.TYPE_OBJECT;
	  }, //}}}
	  methods: _extends({}, (0, _vuex.mapActions)([//{{{
	  acts.PST_POINT, acts.SET_TAGS]), {
	    //}}}
	    postNewPoint: function postNewPoint() {
	      var _this = this;
	
	      //{{{
	      console.log(this.NEW_POINT);
	      var point = {
	        token: this.NEW_POINT.token,
	        location: {
	          type: this.NEW_POINT.type,
	          coordinates: [parseFloat(this.NEW_POINT.longitude), parseFloat(this.NEW_POINT.latitude)]
	        }
	      };
	      console.log('post');
	      this.PST_POINT(point).then(function (e) {
	        return anime.blink_good(_this.$refs.btn_ok);
	      }).then(function () {
	        _this.close();
	      }).catch(function (e) {
	        console.log(e);
	        anime.blink_err(_this.$refs.btn_ok);
	      });
	    },
	    //}}}
	    close: function close() {
	      //{{{
	      this.$router.push({ path: '/map' });
	    },
	    //}}}
	    setTags: function setTags() {
	      //{{{
	      this.SET_TAGS();
	    }
	  })
	};

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* styles */
	__webpack_require__(83)
	
	/* script */
	__vue_exports__ = __webpack_require__(85)
	
	/* template */
	var __vue_template__ = __webpack_require__(87)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "/home/jaime/BUFF/projects/golang/src/dvij.front/src/components/general/pic-zone.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-bd19b5ac", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-bd19b5ac", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] pic-zone.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(84);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(15)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-bd19b5ac!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./pic-zone.vue", function() {
				var newContent = require("!!../../../node_modules/css-loader/index.js?sourceMap!../../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-bd19b5ac!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./pic-zone.vue");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports
	
	
	// module
	exports.push([module.id, "\n.menu-gallery {\n  max-width: 600px;\n  padding: 1.5rem;\n  border: solid #f7f7f9;\n}\n", "", {"version":3,"sources":["/./src/components/general/pic-zone.vue?eaa0c812"],"names":[],"mappings":";AAuFA;EACA,iBAAA;EACA,gBAAA;EACA,sBAAA;CACA","file":"pic-zone.vue","sourcesContent":["<template>\n  <div class=\"container\">\n    <div class=\"row\">\n    <b-form-input v-model=\"srcImgInput\" :style=\"styleURL\" placeholder=\"url\"\n      type=\"text\" :lazy-formatter=\"false\" @input=\"\" class=\"col\"></b-form-input>\n    <b-button @click=\"loadImage\">load</b-button>\n    </div>\n    <dropzone id=\"myVueDropzone\" url=\"https://httpbin.org/post\" ref=\"myUniqueID\"\n      :thumbnailWidth=\"thumbnailWidth\" :thumbnailHeight=\"thumbnailHeight\"\n      :useFontAwesome=\"useFontAwesome\" :maxNumberOfFiles=\"maxNumberOfFiles\"\n      :vdropzone-success=\"showSuccess\" class=\"row\"></dropzone>\n  </div>\n</template>\n\n<script>\nimport Dropzone from 'vue2-dropzone';\n\nexport default {\n  name: 'PicZone',\n  components: {//{{{\n    Dropzone,\n  },//}}}\n  props: {//{{{\n    type: \"\",\n    id: \"\",\n  },//}}}\n  data() {//{{{\n    const paramDropzone = {\n      maxNumberOfFiles: 1,\n      maxFileSizeInMB: 0.3,\n      useFontAwesome: true,\n      thumbnailWidth: 128,\n      thumbnailHeight: 128,\n    };\n    return {\n      styleURL: { },\n      srcImgInput: \"\",\n      srcImg: \"https://raw.githubusercontent.com/asm-jaime/vue-d3-gallery/master/docs/harold.jpg\",\n      img: new Image,\n      text: '',\n      ...paramDropzone,\n    };\n  },//}}}\n  methods: {\n    loadImage: function() {//{{{\n      console.log(this.$refs.myUniqueID.dropzone.options);\n      if(this.ImageExist(this.srcImgInput)){\n        const mockFile = { name: \"some.jpg\", size: 12345 };\n        const dropzone = this.$refs.myUniqueID.dropzone;\n        Object.assign(dropzone.options, this.paramDropzone);\n        console.log('options: ', dropzone.options);\n        dropzone.options.addedfile.call(dropzone, mockFile);\n        dropzone.options.thumbnail.call(dropzone, mockFile, this.srcImgInput);\n        mockFile.previewElement.classList.add('dz-success');\n        mockFile.previewElement.classList.add('dz-complete');\n        this.img.src = this.srcImgInput;\n        this.draw();\n      } else {\n        this.styleURL = {\n          background: '#F00',\n          transitionProperty: 'background',\n          transitionDuration: '0.6s',\n        };\n        setTimeout(()=>{this.styleURL = {\n          background: '#FFF',\n          transitionProperty: 'background',\n          transitionDuration: '0.3s',\n        };}, 600);\n        console.log('img does not exist');\n      };\n    },//}}}\n    ImageExist: function(url) {//{{{\n       const img = new Image();\n       img.src = url;\n       return img.height != 0;\n    },//}}}\n    showSuccess: function (file) {//{{{\n      const img = document.getElementsByTagName(\"img\")[0];\n      this.srcImgInput = img.alt;\n      this.img.src = img.src;\n      this.draw();\n    },//}}}\n  },\n}\n</script>\n\n<style>\n  .menu-gallery {\n    max-width: 600px;\n    padding: 1.5rem;\n    border: solid #f7f7f9;\n  }\n</style>\n"],"sourceRoot":"webpack://"}]);
	
	// exports


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	
	var _vue2Dropzone = __webpack_require__(86);
	
	var _vue2Dropzone2 = _interopRequireDefault(_vue2Dropzone);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = {
	  name: 'PicZone',
	  components: { //{{{
	    Dropzone: _vue2Dropzone2.default
	  }, //}}}
	  props: { //{{{
	    type: "",
	    id: ""
	  }, //}}}
	  data: function data() {
	    //{{{
	    var paramDropzone = {
	      maxNumberOfFiles: 1,
	      maxFileSizeInMB: 0.3,
	      useFontAwesome: true,
	      thumbnailWidth: 128,
	      thumbnailHeight: 128
	    };
	    return _extends({
	      styleURL: {},
	      srcImgInput: "",
	      srcImg: "https://raw.githubusercontent.com/asm-jaime/vue-d3-gallery/master/docs/harold.jpg",
	      img: new Image(),
	      text: ''
	    }, paramDropzone);
	  },
	  //}}}
	  methods: {
	    loadImage: function loadImage() {
	      var _this = this;
	
	      //{{{
	      console.log(this.$refs.myUniqueID.dropzone.options);
	      if (this.ImageExist(this.srcImgInput)) {
	        var mockFile = { name: "some.jpg", size: 12345 };
	        var dropzone = this.$refs.myUniqueID.dropzone;
	        Object.assign(dropzone.options, this.paramDropzone);
	        console.log('options: ', dropzone.options);
	        dropzone.options.addedfile.call(dropzone, mockFile);
	        dropzone.options.thumbnail.call(dropzone, mockFile, this.srcImgInput);
	        mockFile.previewElement.classList.add('dz-success');
	        mockFile.previewElement.classList.add('dz-complete');
	        this.img.src = this.srcImgInput;
	        this.draw();
	      } else {
	        this.styleURL = {
	          background: '#F00',
	          transitionProperty: 'background',
	          transitionDuration: '0.6s'
	        };
	        setTimeout(function () {
	          _this.styleURL = {
	            background: '#FFF',
	            transitionProperty: 'background',
	            transitionDuration: '0.3s'
	          };
	        }, 600);
	        console.log('img does not exist');
	      };
	    }, //}}}
	    ImageExist: function ImageExist(url) {
	      //{{{
	      var img = new Image();
	      img.src = url;
	      return img.height != 0;
	    }, //}}}
	    showSuccess: function showSuccess(file) {
	      //{{{
	      var img = document.getElementsByTagName("img")[0];
	      this.srcImgInput = img.alt;
	      this.img.src = img.src;
	      this.draw();
	    } }
	};

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

	!function(e,t){ true?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports["vue2-dropzone"]=t():e["vue2-dropzone"]=t()}(this,function(){return function(e){function t(n){if(i[n])return i[n].exports;var o=i[n]={exports:{},id:n,loaded:!1};return e[n].call(o.exports,o,o.exports,t),o.loaded=!0,o.exports}var i={};return t.m=e,t.c=i,t.p="",t(0)}([function(e,t,i){var n,o,r={};i(8),n=i(2),o=i(6),e.exports=n||{},e.exports.__esModule&&(e.exports=e.exports["default"]);var s="function"==typeof e.exports?e.exports.options||(e.exports.options={}):e.exports;o&&(s.template=o),s.computed||(s.computed={}),Object.keys(r).forEach(function(e){var t=r[e];s.computed[e]=function(){return t}})},function(e,t){e.exports=function(){var e=[];return e.toString=function(){for(var e=[],t=0;t<this.length;t++){var i=this[t];i[2]?e.push("@media "+i[2]+"{"+i[1]+"}"):e.push(i[1])}return e.join("")},e.i=function(t,i){"string"==typeof t&&(t=[[null,t,""]]);for(var n={},o=0;o<this.length;o++){var r=this[o][0];"number"==typeof r&&(n[r]=!0)}for(o=0;o<t.length;o++){var s=t[o];"number"==typeof s[0]&&n[s[0]]||(i&&!s[2]?s[2]=i:i&&(s[2]="("+s[2]+") and ("+i+")"),e.push(s))}},e}},function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t["default"]={props:{id:{type:String,required:!0},url:{type:String,required:!0},clickable:{type:Boolean,"default":!0},paramName:{type:String,"default":"file"},acceptedFileTypes:{type:String},thumbnailHeight:{type:Number,"default":200},thumbnailWidth:{type:Number,"default":200},showRemoveLink:{type:Boolean,"default":!0},maxFileSizeInMB:{type:Number,"default":2},maxNumberOfFiles:{type:Number,"default":5},autoProcessQueue:{type:Boolean,"default":!0},useFontAwesome:{type:Boolean,"default":!1},headers:{type:Object},language:{type:Object,"default":function(){return{dictDefaultMessage:"<br>Drop files here to upload",dictCancelUpload:"Cancel upload",dictCancelUploadConfirmation:"Are you sure you want to cancel this upload?",dictFallbackMessage:"Your browser does not support drag and drop file uploads.",dictFallbackText:"Please use the fallback form below to upload your files like in the olden days.",dictFileTooBig:"File is too big ({{filesize}}MiB). Max filesize: {{maxFilesize}}MiB.",dictInvalidFileType:"You can't upload files of this type.",dictMaxFilesExceeded:"You can not upload any more files. (max: {{maxFiles}})",dictRemoveFile:"Remove",dictRemoveFileConfirmation:null,dictResponseError:"Server responded with {{statusCode}} code."}}},useCustomDropzoneOptions:{type:Boolean,"default":!1},dropzoneOptions:{type:Object}},methods:{manuallyAddFile:function(e,t,i,n){var o=this.dropzone.options.addRemoveLinks;this.dropzone.options.addRemoveLinks=!1,this.dropzone.emit("addedfile",e),this.dropzone.emit("thumbnail",e,t),this.dropzone.createThumbnailFromUrl(e,t,i,n),this.dropzone.emit("complete",e),this.$emit("vdropzone-file-added-manually",e),this.dropzone.options.maxFiles=this.dropzone.options.maxFiles-1,this.dropzone.options.addRemoveLinks=o},setOption:function(e,t){this.dropzone.options[e]=t},removeAllFiles:function(){this.dropzone.removeAllFiles(!0)},processQueue:function(){this.dropzone.processQueue()},removeFile:function(e){this.dropzone.removeFile(e)},getAcceptedFiles:function(){return this.dropzone.getAcceptedFiles()},getRejectedFiles:function(){return this.dropzone.getRejectedFiles()},getUploadingFiles:function(){return this.dropzone.getUploadingFiles()},getQueuedFiles:function(){return this.dropzone.getQueuedFiles()}},computed:{cloudIcon:function(){return this.useFontAwesome?'<i class="fa fa-cloud-upload"></i>':'<i class="material-icons">cloud_upload</i>'},doneIcon:function(){return this.useFontAwesome?'<i class="fa fa-check"></i>':' <i class="material-icons">done</i>'},errorIcon:function(){return this.useFontAwesome?'<i class="fa fa-close"></i>':' <i class="material-icons">error</i>'}},mounted:function(){if(!this.$isServer){var e=i(5);e.autoDiscover=!1;var t=document.getElementById(this.id);this.useCustomDropzoneOptions?this.dropzone=new e(t,this.dropzoneOptions):this.dropzone=new e(t,{clickable:this.clickable,paramName:this.paramName,thumbnailWidth:this.thumbnailWidth,thumbnailHeight:this.thumbnailHeight,maxFiles:this.maxNumberOfFiles,maxFilesize:this.maxFileSizeInMB,addRemoveLinks:this.showRemoveLink,acceptedFiles:this.acceptedFileTypes,autoProcessQueue:this.autoProcessQueue,headers:this.headers,previewTemplate:'<div class="dz-preview dz-file-preview">  <div class="dz-image" style="width:'+this.thumbnailWidth+"px;height:"+this.thumbnailHeight+'px"><img data-dz-thumbnail /></div>  <div class="dz-details">    <div class="dz-size"><span data-dz-size></span></div>    <div class="dz-filename"><span data-dz-name></span></div>  </div>  <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>  <div class="dz-error-message"><span data-dz-errormessage></span></div>  <div class="dz-success-mark">'+this.doneIcon+' </div>  <div class="dz-error-mark">'+this.errorIcon+"</div></div>",dictDefaultMessage:this.cloudIcon+this.language.dictDefaultMessage,dictCancelUpload:this.language.dictCancelUpload,dictCancelUploadConfirmation:this.language.dictCancelUploadConfirmation,dictFallbackMessage:this.language.dictFallbackMessage,dictFallbackText:this.language.dictFallbackText,dictFileTooBig:this.language.dictFileTooBig,dictInvalidFileType:this.language.dictInvalidFileType,dictMaxFilesExceeded:this.language.dictMaxFilesExceeded,dictRemoveFile:this.language.dictRemoveFile,dictRemoveFileConfirmation:this.language.dictRemoveFileConfirmation,dictResponseError:this.language.dictResponseError});var n=this;this.dropzone.on("thumbnail",function(e){n.$emit("vdropzone-thumbnail",e)}),this.dropzone.on("addedfile",function(e){n.$emit("vdropzone-file-added",e)}),this.dropzone.on("addedfiles",function(e){n.$emit("vdropzone-files-added",e)}),this.dropzone.on("removedfile",function(e){n.$emit("vdropzone-removed-file",e)}),this.dropzone.on("success",function(e,t){n.$emit("vdropzone-success",e,t)}),this.dropzone.on("successmultiple",function(e,t){n.$emit("vdropzone-success-multiple",e,t)}),this.dropzone.on("error",function(e,t,i){n.$emit("vdropzone-error",e,t,i)}),this.dropzone.on("sending",function(e,t,i){n.$emit("vdropzone-sending",e,t,i)}),this.dropzone.on("sendingmultiple",function(e,t,i){n.$emit("vdropzone-sending-multiple",e,t,i)}),this.dropzone.on("queuecomplete",function(e,t,i){n.$emit("vdropzone-queue-complete",e,t,i)}),this.dropzone.on("totaluploadprogress",function(e,t,i){n.$emit("vdropzone-total-upload-progress",e,t,i)}),n.$emit("vdropzone-mounted")}},beforeDestroy:function(){this.dropzone.destroy()}}},function(e,t,i){t=e.exports=i(1)(),t.push([e.id,"@-webkit-keyframes passing-through{0%{opacity:0;-webkit-transform:translateY(40px);transform:translateY(40px)}30%,70%{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}to{opacity:0;-webkit-transform:translateY(-40px);transform:translateY(-40px)}}@keyframes passing-through{0%{opacity:0;-webkit-transform:translateY(40px);transform:translateY(40px)}30%,70%{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}to{opacity:0;-webkit-transform:translateY(-40px);transform:translateY(-40px)}}@-webkit-keyframes slide-in{0%{opacity:0;-webkit-transform:translateY(40px);transform:translateY(40px)}30%{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}}@keyframes slide-in{0%{opacity:0;-webkit-transform:translateY(40px);transform:translateY(40px)}30%{opacity:1;-webkit-transform:translateY(0);transform:translateY(0)}}@-webkit-keyframes pulse{0%{-webkit-transform:scale(1);transform:scale(1)}10%{-webkit-transform:scale(1.1);transform:scale(1.1)}20%{-webkit-transform:scale(1);transform:scale(1)}}@keyframes pulse{0%{-webkit-transform:scale(1);transform:scale(1)}10%{-webkit-transform:scale(1.1);transform:scale(1.1)}20%{-webkit-transform:scale(1);transform:scale(1)}}.dropzone,.dropzone *{box-sizing:border-box}.dropzone{min-height:150px;border:2px solid rgba(0,0,0,.3);background:#fff;padding:20px}.dropzone.dz-clickable{cursor:pointer}.dropzone.dz-clickable *{cursor:default}.dropzone.dz-clickable .dz-message,.dropzone.dz-clickable .dz-message *{cursor:pointer}.dropzone.dz-started .dz-message{display:none}.dropzone.dz-drag-hover{border-style:solid}.dropzone.dz-drag-hover .dz-message{opacity:.5}.dropzone .dz-message{text-align:center;margin:2em 0}.dropzone .dz-preview{position:relative;display:inline-block;vertical-align:top;margin:16px;min-height:100px}.dropzone .dz-preview:hover{z-index:1000}.dropzone .dz-preview.dz-file-preview .dz-image{border-radius:20px;background:#999;background:linear-gradient(180deg,#eee,#ddd)}.dropzone .dz-preview.dz-file-preview .dz-details{opacity:1}.dropzone .dz-preview.dz-image-preview{background:#fff}.dropzone .dz-preview.dz-image-preview .dz-details{-webkit-transition:opacity .2s linear;transition:opacity .2s linear}.dropzone .dz-preview .dz-remove{font-size:14px;text-align:center;display:block;cursor:pointer;border:none}.dropzone .dz-preview .dz-remove:hover{text-decoration:underline}.dropzone .dz-preview:hover .dz-details{opacity:1}.dropzone .dz-preview .dz-details{z-index:20;position:absolute;top:0;left:0;opacity:0;font-size:13px;min-width:100%;max-width:100%;padding:2em 1em;text-align:center;color:rgba(0,0,0,.9);line-height:150%}.dropzone .dz-preview .dz-details .dz-size{margin-bottom:1em;font-size:16px}.dropzone .dz-preview .dz-details .dz-filename{white-space:nowrap}.dropzone .dz-preview .dz-details .dz-filename:hover span{border:1px solid hsla(0,0%,78%,.8);background-color:hsla(0,0%,100%,.8)}.dropzone .dz-preview .dz-details .dz-filename:not(:hover){overflow:hidden;text-overflow:ellipsis}.dropzone .dz-preview .dz-details .dz-filename:not(:hover) span{border:1px solid transparent}.dropzone .dz-preview .dz-details .dz-filename span,.dropzone .dz-preview .dz-details .dz-size span{background-color:hsla(0,0%,100%,.4);padding:0 .4em;border-radius:3px}.dropzone .dz-preview:hover .dz-image img{-webkit-transform:scale(1.05);transform:scale(1.05);-webkit-filter:blur(8px);filter:blur(8px)}.dropzone .dz-preview .dz-image{border-radius:20px;overflow:hidden;width:120px;height:120px;position:relative;display:block;z-index:10}.dropzone .dz-preview .dz-image img{display:block}.dropzone .dz-preview.dz-success .dz-success-mark{-webkit-animation:passing-through 3s cubic-bezier(.77,0,.175,1);animation:passing-through 3s cubic-bezier(.77,0,.175,1)}.dropzone .dz-preview.dz-error .dz-error-mark{opacity:1;-webkit-animation:slide-in 3s cubic-bezier(.77,0,.175,1);animation:slide-in 3s cubic-bezier(.77,0,.175,1)}.dropzone .dz-preview .dz-error-mark,.dropzone .dz-preview .dz-success-mark{pointer-events:none;opacity:0;z-index:500;position:absolute;display:block;top:50%;left:50%;margin-left:-27px;margin-top:-27px}.dropzone .dz-preview .dz-error-mark svg,.dropzone .dz-preview .dz-success-mark svg{display:block;width:54px;height:54px}.dropzone .dz-preview.dz-processing .dz-progress{opacity:1;-webkit-transition:all .2s linear;transition:all .2s linear}.dropzone .dz-preview.dz-complete .dz-progress{opacity:0;-webkit-transition:opacity .4s ease-in;transition:opacity .4s ease-in}.dropzone .dz-preview:not(.dz-processing) .dz-progress{-webkit-animation:pulse 6s ease infinite;animation:pulse 6s ease infinite}.dropzone .dz-preview .dz-progress{opacity:1;z-index:1000;pointer-events:none;position:absolute;height:16px;left:50%;top:50%;margin-top:-8px;width:80px;margin-left:-40px;background:hsla(0,0%,100%,.9);-webkit-transform:scale(1);border-radius:8px;overflow:hidden}.dropzone .dz-preview .dz-progress .dz-upload{background:#333;background:linear-gradient(180deg,#666,#444);position:absolute;top:0;left:0;bottom:0;width:0;-webkit-transition:width .3s ease-in-out;transition:width .3s ease-in-out}.dropzone .dz-preview.dz-error .dz-error-message{display:block}.dropzone .dz-preview.dz-error:hover .dz-error-message{opacity:1;pointer-events:auto}.dropzone .dz-preview .dz-error-message{pointer-events:none;z-index:1000;position:absolute;display:block;display:none;opacity:0;-webkit-transition:opacity .3s ease;transition:opacity .3s ease;border-radius:8px;font-size:13px;top:130px;left:-10px;width:140px;background:#be2626;background:linear-gradient(180deg,#be2626,#a92222);padding:.5em 1.2em;color:#fff}.dropzone .dz-preview .dz-error-message:after{content:'';position:absolute;top:-6px;left:64px;width:0;height:0;border-left:6px solid transparent;border-right:6px solid transparent;border-bottom:6px solid #be2626}",""])},function(e,t,i){t=e.exports=i(1)(),t.i(i(3),""),t.push([e.id,".vue-dropzone{border:2px solid #e5e5e5;font-family:Arial,sans-serif;letter-spacing:.2px;color:#777;-webkit-transition:background-color .2s linear;transition:background-color .2s linear}.vue-dropzone:hover{background-color:#f6f6f6}.vue-dropzone i{color:#ccc}.vue-dropzone .dz-preview .dz-image{border-radius:0}.vue-dropzone .dz-preview .dz-image:hover img{-webkit-transform:none;transform:none;-webkit-filter:none}.vue-dropzone .dz-preview .dz-details{bottom:0;top:0;color:#fff;background-color:rgba(33,150,243,.8);-webkit-transition:opacity .2s linear;transition:opacity .2s linear;text-align:left}.vue-dropzone .dz-preview .dz-details .dz-filename span,.vue-dropzone .dz-preview .dz-details .dz-size span{background-color:transparent}.vue-dropzone .dz-preview .dz-details .dz-filename:not(:hover) span{border:none}.vue-dropzone .dz-preview .dz-details .dz-filename:hover span{background-color:transparent;border:none}.vue-dropzone .dz-preview .dz-progress .dz-upload{background:#ccc}.vue-dropzone .dz-preview .dz-remove{position:absolute;z-index:30;color:#fff;margin-left:15px;padding:10px;top:inherit;bottom:15px;border:2px solid #fff;text-decoration:none;text-transform:uppercase;font-size:.8rem;font-weight:800;letter-spacing:1.1px;opacity:0}.vue-dropzone .dz-preview:hover .dz-remove{opacity:1}.vue-dropzone .dz-preview .dz-error-mark,.vue-dropzone .dz-preview .dz-success-mark{margin-left:auto!important;margin-top:auto!important;width:100%!important;top:35%!important;left:0}.vue-dropzone .dz-preview .dz-error-mark i,.vue-dropzone .dz-preview .dz-success-mark i{color:#fff!important;font-size:5rem!important}",""])},function(e,t,i){(function(e){(function(){var t,i,n,o,r,s,a,l,d=[].slice,p={}.hasOwnProperty,u=function(e,t){function i(){this.constructor=e}for(var n in t)p.call(t,n)&&(e[n]=t[n]);return i.prototype=t.prototype,e.prototype=new i,e.__super__=t.prototype,e};a=function(){},i=function(){function e(){}return e.prototype.addEventListener=e.prototype.on,e.prototype.on=function(e,t){return this._callbacks=this._callbacks||{},this._callbacks[e]||(this._callbacks[e]=[]),this._callbacks[e].push(t),this},e.prototype.emit=function(){var e,t,i,n,o,r;if(n=arguments[0],e=2<=arguments.length?d.call(arguments,1):[],this._callbacks=this._callbacks||{},i=this._callbacks[n])for(o=0,r=i.length;o<r;o++)t=i[o],t.apply(this,e);return this},e.prototype.removeListener=e.prototype.off,e.prototype.removeAllListeners=e.prototype.off,e.prototype.removeEventListener=e.prototype.off,e.prototype.off=function(e,t){var i,n,o,r,s;if(!this._callbacks||0===arguments.length)return this._callbacks={},this;if(n=this._callbacks[e],!n)return this;if(1===arguments.length)return delete this._callbacks[e],this;for(o=r=0,s=n.length;r<s;o=++r)if(i=n[o],i===t){n.splice(o,1);break}return this},e}(),t=function(e){function t(e,i){var o,r,s;if(this.element=e,this.version=t.version,this.defaultOptions.previewTemplate=this.defaultOptions.previewTemplate.replace(/\n*/g,""),this.clickableElements=[],this.listeners=[],this.files=[],"string"==typeof this.element&&(this.element=document.querySelector(this.element)),!this.element||null==this.element.nodeType)throw new Error("Invalid dropzone element.");if(this.element.dropzone)throw new Error("Dropzone already attached.");if(t.instances.push(this),this.element.dropzone=this,o=null!=(s=t.optionsForElement(this.element))?s:{},this.options=n({},this.defaultOptions,o,null!=i?i:{}),this.options.forceFallback||!t.isBrowserSupported())return this.options.fallback.call(this);if(null==this.options.url&&(this.options.url=this.element.getAttribute("action")),!this.options.url)throw new Error("No URL provided.");if(this.options.acceptedFiles&&this.options.acceptedMimeTypes)throw new Error("You can't provide both 'acceptedFiles' and 'acceptedMimeTypes'. 'acceptedMimeTypes' is deprecated.");this.options.acceptedMimeTypes&&(this.options.acceptedFiles=this.options.acceptedMimeTypes,delete this.options.acceptedMimeTypes),this.options.method=this.options.method.toUpperCase(),(r=this.getExistingFallback())&&r.parentNode&&r.parentNode.removeChild(r),this.options.previewsContainer!==!1&&(this.options.previewsContainer?this.previewsContainer=t.getElement(this.options.previewsContainer,"previewsContainer"):this.previewsContainer=this.element),this.options.clickable&&(this.options.clickable===!0?this.clickableElements=[this.element]:this.clickableElements=t.getElements(this.options.clickable,"clickable")),this.init()}var n,o;return u(t,e),t.prototype.Emitter=i,t.prototype.events=["drop","dragstart","dragend","dragenter","dragover","dragleave","addedfile","addedfiles","removedfile","thumbnail","error","errormultiple","processing","processingmultiple","uploadprogress","totaluploadprogress","sending","sendingmultiple","success","successmultiple","canceled","canceledmultiple","complete","completemultiple","reset","maxfilesexceeded","maxfilesreached","queuecomplete"],t.prototype.defaultOptions={url:null,method:"post",withCredentials:!1,parallelUploads:2,uploadMultiple:!1,maxFilesize:256,paramName:"file",createImageThumbnails:!0,maxThumbnailFilesize:10,thumbnailWidth:120,thumbnailHeight:120,filesizeBase:1e3,maxFiles:null,params:{},clickable:!0,ignoreHiddenFiles:!0,acceptedFiles:null,acceptedMimeTypes:null,autoProcessQueue:!0,autoQueue:!0,addRemoveLinks:!1,previewsContainer:null,hiddenInputContainer:"body",capture:null,renameFilename:null,dictDefaultMessage:"Drop files here to upload",dictFallbackMessage:"Your browser does not support drag'n'drop file uploads.",dictFallbackText:"Please use the fallback form below to upload your files like in the olden days.",dictFileTooBig:"File is too big ({{filesize}}MiB). Max filesize: {{maxFilesize}}MiB.",dictInvalidFileType:"You can't upload files of this type.",dictResponseError:"Server responded with {{statusCode}} code.",dictCancelUpload:"Cancel upload",dictCancelUploadConfirmation:"Are you sure you want to cancel this upload?",dictRemoveFile:"Remove file",dictRemoveFileConfirmation:null,dictMaxFilesExceeded:"You can not upload any more files.",accept:function(e,t){return t()},init:function(){return a},forceFallback:!1,fallback:function(){var e,i,n,o,r,s;for(this.element.className=""+this.element.className+" dz-browser-not-supported",s=this.element.getElementsByTagName("div"),o=0,r=s.length;o<r;o++)e=s[o],/(^| )dz-message($| )/.test(e.className)&&(i=e,e.className="dz-message");return i||(i=t.createElement('<div class="dz-message"><span></span></div>'),this.element.appendChild(i)),n=i.getElementsByTagName("span")[0],n&&(null!=n.textContent?n.textContent=this.options.dictFallbackMessage:null!=n.innerText&&(n.innerText=this.options.dictFallbackMessage)),this.element.appendChild(this.getFallbackForm())},resize:function(e){var t,i,n;return t={srcX:0,srcY:0,srcWidth:e.width,srcHeight:e.height},i=e.width/e.height,t.optWidth=this.options.thumbnailWidth,t.optHeight=this.options.thumbnailHeight,null==t.optWidth&&null==t.optHeight?(t.optWidth=t.srcWidth,t.optHeight=t.srcHeight):null==t.optWidth?t.optWidth=i*t.optHeight:null==t.optHeight&&(t.optHeight=1/i*t.optWidth),n=t.optWidth/t.optHeight,e.height<t.optHeight||e.width<t.optWidth?(t.trgHeight=t.srcHeight,t.trgWidth=t.srcWidth):i>n?(t.srcHeight=e.height,t.srcWidth=t.srcHeight*n):(t.srcWidth=e.width,t.srcHeight=t.srcWidth/n),t.srcX=(e.width-t.srcWidth)/2,t.srcY=(e.height-t.srcHeight)/2,t},drop:function(e){return this.element.classList.remove("dz-drag-hover")},dragstart:a,dragend:function(e){return this.element.classList.remove("dz-drag-hover")},dragenter:function(e){return this.element.classList.add("dz-drag-hover")},dragover:function(e){return this.element.classList.add("dz-drag-hover")},dragleave:function(e){return this.element.classList.remove("dz-drag-hover")},paste:a,reset:function(){return this.element.classList.remove("dz-started")},addedfile:function(e){var i,n,o,r,s,a,l,d,p,u,c,h,m;if(this.element===this.previewsContainer&&this.element.classList.add("dz-started"),this.previewsContainer){for(e.previewElement=t.createElement(this.options.previewTemplate.trim()),e.previewTemplate=e.previewElement,this.previewsContainer.appendChild(e.previewElement),u=e.previewElement.querySelectorAll("[data-dz-name]"),r=0,l=u.length;r<l;r++)i=u[r],i.textContent=this._renameFilename(e.name);for(c=e.previewElement.querySelectorAll("[data-dz-size]"),s=0,d=c.length;s<d;s++)i=c[s],i.innerHTML=this.filesize(e.size);for(this.options.addRemoveLinks&&(e._removeLink=t.createElement('<a class="dz-remove" href="javascript:undefined;" data-dz-remove>'+this.options.dictRemoveFile+"</a>"),e.previewElement.appendChild(e._removeLink)),n=function(i){return function(n){return n.preventDefault(),n.stopPropagation(),e.status===t.UPLOADING?t.confirm(i.options.dictCancelUploadConfirmation,function(){return i.removeFile(e)}):i.options.dictRemoveFileConfirmation?t.confirm(i.options.dictRemoveFileConfirmation,function(){return i.removeFile(e)}):i.removeFile(e)}}(this),h=e.previewElement.querySelectorAll("[data-dz-remove]"),m=[],a=0,p=h.length;a<p;a++)o=h[a],m.push(o.addEventListener("click",n));return m}},removedfile:function(e){var t;return e.previewElement&&null!=(t=e.previewElement)&&t.parentNode.removeChild(e.previewElement),this._updateMaxFilesReachedClass()},thumbnail:function(e,t){var i,n,o,r;if(e.previewElement){for(e.previewElement.classList.remove("dz-file-preview"),r=e.previewElement.querySelectorAll("[data-dz-thumbnail]"),n=0,o=r.length;n<o;n++)i=r[n],i.alt=e.name,i.src=t;return setTimeout(function(t){return function(){return e.previewElement.classList.add("dz-image-preview")}}(this),1)}},error:function(e,t){var i,n,o,r,s;if(e.previewElement){for(e.previewElement.classList.add("dz-error"),"String"!=typeof t&&t.error&&(t=t.error),r=e.previewElement.querySelectorAll("[data-dz-errormessage]"),s=[],n=0,o=r.length;n<o;n++)i=r[n],s.push(i.textContent=t);return s}},errormultiple:a,processing:function(e){if(e.previewElement&&(e.previewElement.classList.add("dz-processing"),e._removeLink))return e._removeLink.textContent=this.options.dictCancelUpload},processingmultiple:a,uploadprogress:function(e,t,i){var n,o,r,s,a;if(e.previewElement){for(s=e.previewElement.querySelectorAll("[data-dz-uploadprogress]"),a=[],o=0,r=s.length;o<r;o++)n=s[o],"PROGRESS"===n.nodeName?a.push(n.value=t):a.push(n.style.width=""+t+"%");return a}},totaluploadprogress:a,sending:a,sendingmultiple:a,success:function(e){if(e.previewElement)return e.previewElement.classList.add("dz-success")},successmultiple:a,canceled:function(e){return this.emit("error",e,"Upload canceled.")},canceledmultiple:a,complete:function(e){if(e._removeLink&&(e._removeLink.textContent=this.options.dictRemoveFile),e.previewElement)return e.previewElement.classList.add("dz-complete")},completemultiple:a,maxfilesexceeded:a,maxfilesreached:a,queuecomplete:a,addedfiles:a,previewTemplate:'<div class="dz-preview dz-file-preview">\n  <div class="dz-image"><img data-dz-thumbnail /></div>\n  <div class="dz-details">\n    <div class="dz-size"><span data-dz-size></span></div>\n    <div class="dz-filename"><span data-dz-name></span></div>\n  </div>\n  <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>\n  <div class="dz-error-message"><span data-dz-errormessage></span></div>\n  <div class="dz-success-mark">\n    <svg width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">\n      <title>Check</title>\n      <defs></defs>\n      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">\n        <path d="M23.5,31.8431458 L17.5852419,25.9283877 C16.0248253,24.3679711 13.4910294,24.366835 11.9289322,25.9289322 C10.3700136,27.4878508 10.3665912,30.0234455 11.9283877,31.5852419 L20.4147581,40.0716123 C20.5133999,40.1702541 20.6159315,40.2626649 20.7218615,40.3488435 C22.2835669,41.8725651 24.794234,41.8626202 26.3461564,40.3106978 L43.3106978,23.3461564 C44.8771021,21.7797521 44.8758057,19.2483887 43.3137085,17.6862915 C41.7547899,16.1273729 39.2176035,16.1255422 37.6538436,17.6893022 L23.5,31.8431458 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z" id="Oval-2" stroke-opacity="0.198794158" stroke="#747474" fill-opacity="0.816519475" fill="#FFFFFF" sketch:type="MSShapeGroup"></path>\n      </g>\n    </svg>\n  </div>\n  <div class="dz-error-mark">\n    <svg width="54px" height="54px" viewBox="0 0 54 54" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">\n      <title>Error</title>\n      <defs></defs>\n      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">\n        <g id="Check-+-Oval-2" sketch:type="MSLayerGroup" stroke="#747474" stroke-opacity="0.198794158" fill="#FFFFFF" fill-opacity="0.816519475">\n          <path d="M32.6568542,29 L38.3106978,23.3461564 C39.8771021,21.7797521 39.8758057,19.2483887 38.3137085,17.6862915 C36.7547899,16.1273729 34.2176035,16.1255422 32.6538436,17.6893022 L27,23.3431458 L21.3461564,17.6893022 C19.7823965,16.1255422 17.2452101,16.1273729 15.6862915,17.6862915 C14.1241943,19.2483887 14.1228979,21.7797521 15.6893022,23.3461564 L21.3431458,29 L15.6893022,34.6538436 C14.1228979,36.2202479 14.1241943,38.7516113 15.6862915,40.3137085 C17.2452101,41.8726271 19.7823965,41.8744578 21.3461564,40.3106978 L27,34.6568542 L32.6538436,40.3106978 C34.2176035,41.8744578 36.7547899,41.8726271 38.3137085,40.3137085 C39.8758057,38.7516113 39.8771021,36.2202479 38.3106978,34.6538436 L32.6568542,29 Z M27,53 C41.3594035,53 53,41.3594035 53,27 C53,12.6405965 41.3594035,1 27,1 C12.6405965,1 1,12.6405965 1,27 C1,41.3594035 12.6405965,53 27,53 Z" id="Oval-2" sketch:type="MSShapeGroup"></path>\n        </g>\n      </g>\n    </svg>\n  </div>\n</div>'},n=function(){var e,t,i,n,o,r,s;for(n=arguments[0],i=2<=arguments.length?d.call(arguments,1):[],r=0,s=i.length;r<s;r++){t=i[r];for(e in t)o=t[e],n[e]=o}return n},t.prototype.getAcceptedFiles=function(){var e,t,i,n,o;for(n=this.files,o=[],t=0,i=n.length;t<i;t++)e=n[t],e.accepted&&o.push(e);return o},t.prototype.getRejectedFiles=function(){var e,t,i,n,o;for(n=this.files,o=[],t=0,i=n.length;t<i;t++)e=n[t],e.accepted||o.push(e);return o},t.prototype.getFilesWithStatus=function(e){var t,i,n,o,r;for(o=this.files,r=[],i=0,n=o.length;i<n;i++)t=o[i],t.status===e&&r.push(t);return r},t.prototype.getQueuedFiles=function(){return this.getFilesWithStatus(t.QUEUED)},t.prototype.getUploadingFiles=function(){return this.getFilesWithStatus(t.UPLOADING)},t.prototype.getAddedFiles=function(){return this.getFilesWithStatus(t.ADDED)},t.prototype.getActiveFiles=function(){var e,i,n,o,r;for(o=this.files,r=[],i=0,n=o.length;i<n;i++)e=o[i],e.status!==t.UPLOADING&&e.status!==t.QUEUED||r.push(e);return r},t.prototype.init=function(){var e,i,n,o,r,s,a;for("form"===this.element.tagName&&this.element.setAttribute("enctype","multipart/form-data"),this.element.classList.contains("dropzone")&&!this.element.querySelector(".dz-message")&&this.element.appendChild(t.createElement('<div class="dz-default dz-message"><span>'+this.options.dictDefaultMessage+"</span></div>")),this.clickableElements.length&&(n=function(e){return function(){return e.hiddenFileInput&&e.hiddenFileInput.parentNode.removeChild(e.hiddenFileInput),e.hiddenFileInput=document.createElement("input"),e.hiddenFileInput.setAttribute("type","file"),(null==e.options.maxFiles||e.options.maxFiles>1)&&e.hiddenFileInput.setAttribute("multiple","multiple"),e.hiddenFileInput.className="dz-hidden-input",null!=e.options.acceptedFiles&&e.hiddenFileInput.setAttribute("accept",e.options.acceptedFiles),null!=e.options.capture&&e.hiddenFileInput.setAttribute("capture",e.options.capture),e.hiddenFileInput.style.visibility="hidden",e.hiddenFileInput.style.position="absolute",e.hiddenFileInput.style.top="0",e.hiddenFileInput.style.left="0",e.hiddenFileInput.style.height="0",e.hiddenFileInput.style.width="0",document.querySelector(e.options.hiddenInputContainer).appendChild(e.hiddenFileInput),e.hiddenFileInput.addEventListener("change",function(){var t,i,o,r;if(i=e.hiddenFileInput.files,i.length)for(o=0,r=i.length;o<r;o++)t=i[o],e.addFile(t);return e.emit("addedfiles",i),n()})}}(this))(),this.URL=null!=(s=window.URL)?s:window.webkitURL,a=this.events,o=0,r=a.length;o<r;o++)e=a[o],this.on(e,this.options[e]);return this.on("uploadprogress",function(e){return function(){return e.updateTotalUploadProgress()}}(this)),this.on("removedfile",function(e){return function(){return e.updateTotalUploadProgress()}}(this)),this.on("canceled",function(e){return function(t){return e.emit("complete",t)}}(this)),this.on("complete",function(e){return function(t){if(0===e.getAddedFiles().length&&0===e.getUploadingFiles().length&&0===e.getQueuedFiles().length)return setTimeout(function(){return e.emit("queuecomplete")},0)}}(this)),i=function(e){return e.stopPropagation(),e.preventDefault?e.preventDefault():e.returnValue=!1},this.listeners=[{element:this.element,events:{dragstart:function(e){return function(t){return e.emit("dragstart",t)}}(this),dragenter:function(e){return function(t){return i(t),e.emit("dragenter",t)}}(this),dragover:function(e){return function(t){var n;try{n=t.dataTransfer.effectAllowed}catch(o){}return t.dataTransfer.dropEffect="move"===n||"linkMove"===n?"move":"copy",i(t),e.emit("dragover",t)}}(this),dragleave:function(e){return function(t){return e.emit("dragleave",t)}}(this),drop:function(e){return function(t){return i(t),e.drop(t)}}(this),dragend:function(e){return function(t){return e.emit("dragend",t)}}(this)}}],this.clickableElements.forEach(function(e){return function(i){return e.listeners.push({element:i,events:{click:function(n){return(i!==e.element||n.target===e.element||t.elementInside(n.target,e.element.querySelector(".dz-message")))&&e.hiddenFileInput.click(),!0}}})}}(this)),this.enable(),this.options.init.call(this)},t.prototype.destroy=function(){var e;return this.disable(),this.removeAllFiles(!0),(null!=(e=this.hiddenFileInput)?e.parentNode:void 0)&&(this.hiddenFileInput.parentNode.removeChild(this.hiddenFileInput),this.hiddenFileInput=null),delete this.element.dropzone,t.instances.splice(t.instances.indexOf(this),1)},t.prototype.updateTotalUploadProgress=function(){var e,t,i,n,o,r,s,a;if(n=0,i=0,e=this.getActiveFiles(),e.length){for(a=this.getActiveFiles(),r=0,s=a.length;r<s;r++)t=a[r],n+=t.upload.bytesSent,i+=t.upload.total;o=100*n/i}else o=100;return this.emit("totaluploadprogress",o,i,n)},t.prototype._getParamName=function(e){return"function"==typeof this.options.paramName?this.options.paramName(e):""+this.options.paramName+(this.options.uploadMultiple?"["+e+"]":"")},t.prototype._renameFilename=function(e){return"function"!=typeof this.options.renameFilename?e:this.options.renameFilename(e)},t.prototype.getFallbackForm=function(){var e,i,n,o;return(e=this.getExistingFallback())?e:(n='<div class="dz-fallback">',this.options.dictFallbackText&&(n+="<p>"+this.options.dictFallbackText+"</p>"),n+='<input type="file" name="'+this._getParamName(0)+'" '+(this.options.uploadMultiple?'multiple="multiple"':void 0)+' /><input type="submit" value="Upload!"></div>',
	i=t.createElement(n),"FORM"!==this.element.tagName?(o=t.createElement('<form action="'+this.options.url+'" enctype="multipart/form-data" method="'+this.options.method+'"></form>'),o.appendChild(i)):(this.element.setAttribute("enctype","multipart/form-data"),this.element.setAttribute("method",this.options.method)),null!=o?o:i)},t.prototype.getExistingFallback=function(){var e,t,i,n,o,r;for(t=function(e){var t,i,n;for(i=0,n=e.length;i<n;i++)if(t=e[i],/(^| )fallback($| )/.test(t.className))return t},r=["div","form"],n=0,o=r.length;n<o;n++)if(i=r[n],e=t(this.element.getElementsByTagName(i)))return e},t.prototype.setupEventListeners=function(){var e,t,i,n,o,r,s;for(r=this.listeners,s=[],n=0,o=r.length;n<o;n++)e=r[n],s.push(function(){var n,o;n=e.events,o=[];for(t in n)i=n[t],o.push(e.element.addEventListener(t,i,!1));return o}());return s},t.prototype.removeEventListeners=function(){var e,t,i,n,o,r,s;for(r=this.listeners,s=[],n=0,o=r.length;n<o;n++)e=r[n],s.push(function(){var n,o;n=e.events,o=[];for(t in n)i=n[t],o.push(e.element.removeEventListener(t,i,!1));return o}());return s},t.prototype.disable=function(){var e,t,i,n,o;for(this.clickableElements.forEach(function(e){return e.classList.remove("dz-clickable")}),this.removeEventListeners(),n=this.files,o=[],t=0,i=n.length;t<i;t++)e=n[t],o.push(this.cancelUpload(e));return o},t.prototype.enable=function(){return this.clickableElements.forEach(function(e){return e.classList.add("dz-clickable")}),this.setupEventListeners()},t.prototype.filesize=function(e){var t,i,n,o,r,s,a,l;if(n=0,o="b",e>0){for(s=["TB","GB","MB","KB","b"],i=a=0,l=s.length;a<l;i=++a)if(r=s[i],t=Math.pow(this.options.filesizeBase,4-i)/10,e>=t){n=e/Math.pow(this.options.filesizeBase,4-i),o=r;break}n=Math.round(10*n)/10}return"<strong>"+n+"</strong> "+o},t.prototype._updateMaxFilesReachedClass=function(){return null!=this.options.maxFiles&&this.getAcceptedFiles().length>=this.options.maxFiles?(this.getAcceptedFiles().length===this.options.maxFiles&&this.emit("maxfilesreached",this.files),this.element.classList.add("dz-max-files-reached")):this.element.classList.remove("dz-max-files-reached")},t.prototype.drop=function(e){var t,i;e.dataTransfer&&(this.emit("drop",e),t=e.dataTransfer.files,this.emit("addedfiles",t),t.length&&(i=e.dataTransfer.items,i&&i.length&&null!=i[0].webkitGetAsEntry?this._addFilesFromItems(i):this.handleFiles(t)))},t.prototype.paste=function(e){var t,i;if(null!=(null!=e&&null!=(i=e.clipboardData)?i.items:void 0))return this.emit("paste",e),t=e.clipboardData.items,t.length?this._addFilesFromItems(t):void 0},t.prototype.handleFiles=function(e){var t,i,n,o;for(o=[],i=0,n=e.length;i<n;i++)t=e[i],o.push(this.addFile(t));return o},t.prototype._addFilesFromItems=function(e){var t,i,n,o,r;for(r=[],n=0,o=e.length;n<o;n++)i=e[n],null!=i.webkitGetAsEntry&&(t=i.webkitGetAsEntry())?t.isFile?r.push(this.addFile(i.getAsFile())):t.isDirectory?r.push(this._addFilesFromDirectory(t,t.name)):r.push(void 0):null!=i.getAsFile&&(null==i.kind||"file"===i.kind)?r.push(this.addFile(i.getAsFile())):r.push(void 0);return r},t.prototype._addFilesFromDirectory=function(e,t){var i,n,o;return i=e.createReader(),n=function(e){return"undefined"!=typeof console&&null!==console&&"function"==typeof console.log?console.log(e):void 0},(o=function(e){return function(){return i.readEntries(function(i){var n,r,s;if(i.length>0){for(r=0,s=i.length;r<s;r++)n=i[r],n.isFile?n.file(function(i){if(!e.options.ignoreHiddenFiles||"."!==i.name.substring(0,1))return i.fullPath=""+t+"/"+i.name,e.addFile(i)}):n.isDirectory&&e._addFilesFromDirectory(n,""+t+"/"+n.name);o()}return null},n)}}(this))()},t.prototype.accept=function(e,i){return e.size>1024*this.options.maxFilesize*1024?i(this.options.dictFileTooBig.replace("{{filesize}}",Math.round(e.size/1024/10.24)/100).replace("{{maxFilesize}}",this.options.maxFilesize)):t.isValidFile(e,this.options.acceptedFiles)?null!=this.options.maxFiles&&this.getAcceptedFiles().length>=this.options.maxFiles?(i(this.options.dictMaxFilesExceeded.replace("{{maxFiles}}",this.options.maxFiles)),this.emit("maxfilesexceeded",e)):this.options.accept.call(this,e,i):i(this.options.dictInvalidFileType)},t.prototype.addFile=function(e){return e.upload={progress:0,total:e.size,bytesSent:0},this.files.push(e),e.status=t.ADDED,this.emit("addedfile",e),this._enqueueThumbnail(e),this.accept(e,function(t){return function(i){return i?(e.accepted=!1,t._errorProcessing([e],i)):(e.accepted=!0,t.options.autoQueue&&t.enqueueFile(e)),t._updateMaxFilesReachedClass()}}(this))},t.prototype.enqueueFiles=function(e){var t,i,n;for(i=0,n=e.length;i<n;i++)t=e[i],this.enqueueFile(t);return null},t.prototype.enqueueFile=function(e){if(e.status!==t.ADDED||e.accepted!==!0)throw new Error("This file can't be queued because it has already been processed or was rejected.");if(e.status=t.QUEUED,this.options.autoProcessQueue)return setTimeout(function(e){return function(){return e.processQueue()}}(this),0)},t.prototype._thumbnailQueue=[],t.prototype._processingThumbnail=!1,t.prototype._enqueueThumbnail=function(e){if(this.options.createImageThumbnails&&e.type.match(/image.*/)&&e.size<=1024*this.options.maxThumbnailFilesize*1024)return this._thumbnailQueue.push(e),setTimeout(function(e){return function(){return e._processThumbnailQueue()}}(this),0)},t.prototype._processThumbnailQueue=function(){if(!this._processingThumbnail&&0!==this._thumbnailQueue.length)return this._processingThumbnail=!0,this.createThumbnail(this._thumbnailQueue.shift(),function(e){return function(){return e._processingThumbnail=!1,e._processThumbnailQueue()}}(this))},t.prototype.removeFile=function(e){if(e.status===t.UPLOADING&&this.cancelUpload(e),this.files=l(this.files,e),this.emit("removedfile",e),0===this.files.length)return this.emit("reset")},t.prototype.removeAllFiles=function(e){var i,n,o,r;for(null==e&&(e=!1),r=this.files.slice(),n=0,o=r.length;n<o;n++)i=r[n],(i.status!==t.UPLOADING||e)&&this.removeFile(i);return null},t.prototype.createThumbnail=function(e,t){var i;return i=new FileReader,i.onload=function(n){return function(){return"image/svg+xml"===e.type?(n.emit("thumbnail",e,i.result),void(null!=t&&t())):n.createThumbnailFromUrl(e,i.result,t)}}(this),i.readAsDataURL(e)},t.prototype.createThumbnailFromUrl=function(e,t,i,n){var o;return o=document.createElement("img"),n&&(o.crossOrigin=n),o.onload=function(t){return function(){var n,r,a,l,d,p,u,c;if(e.width=o.width,e.height=o.height,a=t.options.resize.call(t,e),null==a.trgWidth&&(a.trgWidth=a.optWidth),null==a.trgHeight&&(a.trgHeight=a.optHeight),n=document.createElement("canvas"),r=n.getContext("2d"),n.width=a.trgWidth,n.height=a.trgHeight,s(r,o,null!=(d=a.srcX)?d:0,null!=(p=a.srcY)?p:0,a.srcWidth,a.srcHeight,null!=(u=a.trgX)?u:0,null!=(c=a.trgY)?c:0,a.trgWidth,a.trgHeight),l=n.toDataURL("image/png"),t.emit("thumbnail",e,l),null!=i)return i()}}(this),null!=i&&(o.onerror=i),o.src=t},t.prototype.processQueue=function(){var e,t,i,n;if(t=this.options.parallelUploads,i=this.getUploadingFiles().length,e=i,!(i>=t)&&(n=this.getQueuedFiles(),n.length>0)){if(this.options.uploadMultiple)return this.processFiles(n.slice(0,t-i));for(;e<t;){if(!n.length)return;this.processFile(n.shift()),e++}}},t.prototype.processFile=function(e){return this.processFiles([e])},t.prototype.processFiles=function(e){var i,n,o;for(n=0,o=e.length;n<o;n++)i=e[n],i.processing=!0,i.status=t.UPLOADING,this.emit("processing",i);return this.options.uploadMultiple&&this.emit("processingmultiple",e),this.uploadFiles(e)},t.prototype._getFilesWithXhr=function(e){var t,i;return i=function(){var i,n,o,r;for(o=this.files,r=[],i=0,n=o.length;i<n;i++)t=o[i],t.xhr===e&&r.push(t);return r}.call(this)},t.prototype.cancelUpload=function(e){var i,n,o,r,s,a,l;if(e.status===t.UPLOADING){for(n=this._getFilesWithXhr(e.xhr),o=0,s=n.length;o<s;o++)i=n[o],i.status=t.CANCELED;for(e.xhr.abort(),r=0,a=n.length;r<a;r++)i=n[r],this.emit("canceled",i);this.options.uploadMultiple&&this.emit("canceledmultiple",n)}else(l=e.status)!==t.ADDED&&l!==t.QUEUED||(e.status=t.CANCELED,this.emit("canceled",e),this.options.uploadMultiple&&this.emit("canceledmultiple",[e]));if(this.options.autoProcessQueue)return this.processQueue()},o=function(){var e,t;return t=arguments[0],e=2<=arguments.length?d.call(arguments,1):[],"function"==typeof t?t.apply(this,e):t},t.prototype.uploadFile=function(e){return this.uploadFiles([e])},t.prototype.uploadFiles=function(e){var i,r,s,a,l,d,p,u,c,h,m,f,g,v,z,b,y,w,F,x,k,E,C,L,A,T,M,S,D,N,I,_,R,U;for(F=new XMLHttpRequest,x=0,L=e.length;x<L;x++)i=e[x],i.xhr=F;f=o(this.options.method,e),y=o(this.options.url,e),F.open(f,y,!0),F.withCredentials=!!this.options.withCredentials,z=null,s=function(t){return function(){var n,o,r;for(r=[],n=0,o=e.length;n<o;n++)i=e[n],r.push(t._errorProcessing(e,z||t.options.dictResponseError.replace("{{statusCode}}",F.status),F));return r}}(this),b=function(t){return function(n){var o,r,s,a,l,d,p,u,c;if(null!=n)for(r=100*n.loaded/n.total,s=0,d=e.length;s<d;s++)i=e[s],i.upload={progress:r,total:n.total,bytesSent:n.loaded};else{for(o=!0,r=100,a=0,p=e.length;a<p;a++)i=e[a],100===i.upload.progress&&i.upload.bytesSent===i.upload.total||(o=!1),i.upload.progress=r,i.upload.bytesSent=i.upload.total;if(o)return}for(c=[],l=0,u=e.length;l<u;l++)i=e[l],c.push(t.emit("uploadprogress",i,r,i.upload.bytesSent));return c}}(this),F.onload=function(i){return function(n){var o;if(e[0].status!==t.CANCELED&&4===F.readyState){if(z=F.responseText,F.getResponseHeader("content-type")&&~F.getResponseHeader("content-type").indexOf("application/json"))try{z=JSON.parse(z)}catch(r){n=r,z="Invalid JSON response from server."}return b(),200<=(o=F.status)&&o<300?i._finished(e,z,n):s()}}}(this),F.onerror=function(i){return function(){if(e[0].status!==t.CANCELED)return s()}}(this),v=null!=(D=F.upload)?D:F,v.onprogress=b,d={Accept:"application/json","Cache-Control":"no-cache","X-Requested-With":"XMLHttpRequest"},this.options.headers&&n(d,this.options.headers);for(a in d)l=d[a],l&&F.setRequestHeader(a,l);if(r=new FormData,this.options.params){N=this.options.params;for(m in N)w=N[m],r.append(m,w)}for(k=0,A=e.length;k<A;k++)i=e[k],this.emit("sending",i,F,r);if(this.options.uploadMultiple&&this.emit("sendingmultiple",e,F,r),"FORM"===this.element.tagName)for(I=this.element.querySelectorAll("input, textarea, select, button"),E=0,T=I.length;E<T;E++)if(u=I[E],c=u.getAttribute("name"),h=u.getAttribute("type"),"SELECT"===u.tagName&&u.hasAttribute("multiple"))for(_=u.options,C=0,M=_.length;C<M;C++)g=_[C],g.selected&&r.append(c,g.value);else(!h||"checkbox"!==(R=h.toLowerCase())&&"radio"!==R||u.checked)&&r.append(c,u.value);for(p=S=0,U=e.length-1;0<=U?S<=U:S>=U;p=0<=U?++S:--S)r.append(this._getParamName(p),e[p],this._renameFilename(e[p].name));return this.submitRequest(F,r,e)},t.prototype.submitRequest=function(e,t,i){return e.send(t)},t.prototype._finished=function(e,i,n){var o,r,s;for(r=0,s=e.length;r<s;r++)o=e[r],o.status=t.SUCCESS,this.emit("success",o,i,n),this.emit("complete",o);if(this.options.uploadMultiple&&(this.emit("successmultiple",e,i,n),this.emit("completemultiple",e)),this.options.autoProcessQueue)return this.processQueue()},t.prototype._errorProcessing=function(e,i,n){var o,r,s;for(r=0,s=e.length;r<s;r++)o=e[r],o.status=t.ERROR,this.emit("error",o,i,n),this.emit("complete",o);if(this.options.uploadMultiple&&(this.emit("errormultiple",e,i,n),this.emit("completemultiple",e)),this.options.autoProcessQueue)return this.processQueue()},t}(i),t.version="4.3.0",t.options={},t.optionsForElement=function(e){return e.getAttribute("id")?t.options[n(e.getAttribute("id"))]:void 0},t.instances=[],t.forElement=function(e){if("string"==typeof e&&(e=document.querySelector(e)),null==(null!=e?e.dropzone:void 0))throw new Error("No Dropzone found for given element. This is probably because you're trying to access it before Dropzone had the time to initialize. Use the `init` option to setup any additional observers on your Dropzone.");return e.dropzone},t.autoDiscover=!0,t.discover=function(){var e,i,n,o,r,s;for(document.querySelectorAll?n=document.querySelectorAll(".dropzone"):(n=[],e=function(e){var t,i,o,r;for(r=[],i=0,o=e.length;i<o;i++)t=e[i],/(^| )dropzone($| )/.test(t.className)?r.push(n.push(t)):r.push(void 0);return r},e(document.getElementsByTagName("div")),e(document.getElementsByTagName("form"))),s=[],o=0,r=n.length;o<r;o++)i=n[o],t.optionsForElement(i)!==!1?s.push(new t(i)):s.push(void 0);return s},t.blacklistedBrowsers=[/opera.*Macintosh.*version\/12/i],t.isBrowserSupported=function(){var e,i,n,o,r;if(e=!0,window.File&&window.FileReader&&window.FileList&&window.Blob&&window.FormData&&document.querySelector)if("classList"in document.createElement("a"))for(r=t.blacklistedBrowsers,n=0,o=r.length;n<o;n++)i=r[n],i.test(navigator.userAgent)&&(e=!1);else e=!1;else e=!1;return e},l=function(e,t){var i,n,o,r;for(r=[],n=0,o=e.length;n<o;n++)i=e[n],i!==t&&r.push(i);return r},n=function(e){return e.replace(/[\-_](\w)/g,function(e){return e.charAt(1).toUpperCase()})},t.createElement=function(e){var t;return t=document.createElement("div"),t.innerHTML=e,t.childNodes[0]},t.elementInside=function(e,t){if(e===t)return!0;for(;e=e.parentNode;)if(e===t)return!0;return!1},t.getElement=function(e,t){var i;if("string"==typeof e?i=document.querySelector(e):null!=e.nodeType&&(i=e),null==i)throw new Error("Invalid `"+t+"` option provided. Please provide a CSS selector or a plain HTML element.");return i},t.getElements=function(e,t){var i,n,o,r,s,a,l,d;if(e instanceof Array){o=[];try{for(r=0,a=e.length;r<a;r++)n=e[r],o.push(this.getElement(n,t))}catch(p){i=p,o=null}}else if("string"==typeof e)for(o=[],d=document.querySelectorAll(e),s=0,l=d.length;s<l;s++)n=d[s],o.push(n);else null!=e.nodeType&&(o=[e]);if(null==o||!o.length)throw new Error("Invalid `"+t+"` option provided. Please provide a CSS selector, a plain HTML element or a list of those.");return o},t.confirm=function(e,t,i){return window.confirm(e)?t():null!=i?i():void 0},t.isValidFile=function(e,t){var i,n,o,r,s;if(!t)return!0;for(t=t.split(","),n=e.type,i=n.replace(/\/.*$/,""),r=0,s=t.length;r<s;r++)if(o=t[r],o=o.trim(),"."===o.charAt(0)){if(e.name.toLowerCase().indexOf(o.toLowerCase(),e.name.length-o.length)!==-1)return!0}else if(/\/\*$/.test(o)){if(i===o.replace(/\/.*$/,""))return!0}else if(n===o)return!0;return!1},"undefined"!=typeof jQuery&&null!==jQuery&&(jQuery.fn.dropzone=function(e){return this.each(function(){return new t(this,e)})}),"undefined"!=typeof e&&null!==e?e.exports=t:window.Dropzone=t,t.ADDED="added",t.QUEUED="queued",t.ACCEPTED=t.QUEUED,t.UPLOADING="uploading",t.PROCESSING=t.UPLOADING,t.CANCELED="canceled",t.ERROR="error",t.SUCCESS="success",r=function(e){var t,i,n,o,r,s,a,l,d,p;for(a=e.naturalWidth,s=e.naturalHeight,i=document.createElement("canvas"),i.width=1,i.height=s,n=i.getContext("2d"),n.drawImage(e,0,0),o=n.getImageData(0,0,1,s).data,p=0,r=s,l=s;l>p;)t=o[4*(l-1)+3],0===t?r=l:p=l,l=r+p>>1;return d=l/s,0===d?1:d},s=function(e,t,i,n,o,s,a,l,d,p){var u;return u=r(t),e.drawImage(t,i,n,o,s,a,l,d,p/u)},o=function(e,t){var i,n,o,r,s,a,l,d,p;if(o=!1,p=!0,n=e.document,d=n.documentElement,i=n.addEventListener?"addEventListener":"attachEvent",l=n.addEventListener?"removeEventListener":"detachEvent",a=n.addEventListener?"":"on",r=function(i){if("readystatechange"!==i.type||"complete"===n.readyState)return("load"===i.type?e:n)[l](a+i.type,r,!1),!o&&(o=!0)?t.call(e,i.type||i):void 0},s=function(){var e;try{d.doScroll("left")}catch(t){return e=t,void setTimeout(s,50)}return r("poll")},"complete"!==n.readyState){if(n.createEventObject&&d.doScroll){try{p=!e.frameElement}catch(u){}p&&s()}return n[i](a+"DOMContentLoaded",r,!1),n[i](a+"readystatechange",r,!1),e[i](a+"load",r,!1)}},t._autoDiscoverFunction=function(){if(t.autoDiscover)return t.discover()},o(window,t._autoDiscoverFunction)}).call(this)}).call(t,i(9)(e))},function(e,t){e.exports=' <form :action=url class="vue-dropzone dropzone" :id=id> <slot></slot> </form> '},function(e,t,i){function n(e,t){for(var i=0;i<e.length;i++){var n=e[i],o=u[n.id];if(o){o.refs++;for(var r=0;r<o.parts.length;r++)o.parts[r](n.parts[r]);for(;r<n.parts.length;r++)o.parts.push(l(n.parts[r],t))}else{for(var s=[],r=0;r<n.parts.length;r++)s.push(l(n.parts[r],t));u[n.id]={id:n.id,refs:1,parts:s}}}}function o(e){for(var t=[],i={},n=0;n<e.length;n++){var o=e[n],r=o[0],s=o[1],a=o[2],l=o[3],d={css:s,media:a,sourceMap:l};i[r]?i[r].parts.push(d):t.push(i[r]={id:r,parts:[d]})}return t}function r(e,t){var i=m(),n=v[v.length-1];if("top"===e.insertAt)n?n.nextSibling?i.insertBefore(t,n.nextSibling):i.appendChild(t):i.insertBefore(t,i.firstChild),v.push(t);else{if("bottom"!==e.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");i.appendChild(t)}}function s(e){e.parentNode.removeChild(e);var t=v.indexOf(e);t>=0&&v.splice(t,1)}function a(e){var t=document.createElement("style");return t.type="text/css",r(e,t),t}function l(e,t){var i,n,o;if(t.singleton){var r=g++;i=f||(f=a(t)),n=d.bind(null,i,r,!1),o=d.bind(null,i,r,!0)}else i=a(t),n=p.bind(null,i),o=function(){s(i)};return n(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;n(e=t)}else o()}}function d(e,t,i,n){var o=i?"":n.css;if(e.styleSheet)e.styleSheet.cssText=z(t,o);else{var r=document.createTextNode(o),s=e.childNodes;s[t]&&e.removeChild(s[t]),s.length?e.insertBefore(r,s[t]):e.appendChild(r)}}function p(e,t){var i=t.css,n=t.media,o=t.sourceMap;if(n&&e.setAttribute("media",n),o&&(i+="\n/*# sourceURL="+o.sources[0]+" */",i+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+" */"),e.styleSheet)e.styleSheet.cssText=i;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(i))}}var u={},c=function(e){var t;return function(){return"undefined"==typeof t&&(t=e.apply(this,arguments)),t}},h=c(function(){return/msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase())}),m=c(function(){return document.head||document.getElementsByTagName("head")[0]}),f=null,g=0,v=[];e.exports=function(e,t){t=t||{},"undefined"==typeof t.singleton&&(t.singleton=h()),"undefined"==typeof t.insertAt&&(t.insertAt="bottom");var i=o(e);return n(i,t),function(e){for(var r=[],s=0;s<i.length;s++){var a=i[s],l=u[a.id];l.refs--,r.push(l)}if(e){var d=o(e);n(d,t)}for(var s=0;s<r.length;s++){var l=r[s];if(0===l.refs){for(var p=0;p<l.parts.length;p++)l.parts[p]();delete u[l.id]}}}};var z=function(){var e=[];return function(t,i){return e[t]=i,e.filter(Boolean).join("\n")}}()},function(e,t,i){var n=i(4);"string"==typeof n&&(n=[[e.id,n,""]]);i(7)(n,{});n.locals&&(e.exports=n.locals)},function(e,t){e.exports=function(e){return e.webpackPolyfill||(e.deprecate=function(){},e.paths=[],e.children=[],e.webpackPolyfill=1),e}}])});

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "container"
	  }, [_c('div', {
	    staticClass: "row"
	  }, [_c('b-form-input', {
	    staticClass: "col",
	    style: (_vm.styleURL),
	    attrs: {
	      "placeholder": "url",
	      "type": "text",
	      "lazy-formatter": false
	    },
	    on: {
	      "input": function($event) {}
	    },
	    model: {
	      value: (_vm.srcImgInput),
	      callback: function($$v) {
	        _vm.srcImgInput = $$v
	      },
	      expression: "srcImgInput"
	    }
	  }), _vm._v(" "), _c('b-button', {
	    on: {
	      "click": _vm.loadImage
	    }
	  }, [_vm._v("load")])], 1), _vm._v(" "), _c('dropzone', {
	    ref: "myUniqueID",
	    staticClass: "row",
	    attrs: {
	      "id": "myVueDropzone",
	      "url": "https://httpbin.org/post",
	      "thumbnailWidth": _vm.thumbnailWidth,
	      "thumbnailHeight": _vm.thumbnailHeight,
	      "useFontAwesome": _vm.useFontAwesome,
	      "maxNumberOfFiles": _vm.maxNumberOfFiles,
	      "vdropzone-success": _vm.showSuccess
	    }
	  })], 1)
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-bd19b5ac", module.exports)
	  }
	}

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('div', {
	    staticClass: "panel-point"
	  }, [_c('div', {
	    staticClass: "container"
	  }, [_c('b-form-input', {
	    attrs: {
	      "textarea": "",
	      "type": "text",
	      "placeholder": "enter text"
	    },
	    on: {
	      "blur": _vm.setTags
	    },
	    model: {
	      value: (_vm.NEW_POINT.text),
	      callback: function($$v) {
	        _vm.NEW_POINT.text = $$v
	      },
	      expression: "NEW_POINT.text"
	    }
	  }), _vm._v(" "), _c('small', {
	    staticClass: "text-muted"
	  }, [_vm._v("text")])], 1), _vm._v(" "), _c('div', {
	    staticClass: "container"
	  }, [_c('b-form-select', {
	    staticClass: "col",
	    attrs: {
	      "options": _vm.tobject
	    },
	    model: {
	      value: (_vm.NEW_POINT.tobject),
	      callback: function($$v) {
	        _vm.NEW_POINT.tobject = $$v
	      },
	      expression: "NEW_POINT.tobject"
	    }
	  }), _vm._v(" "), _c('small', {
	    staticClass: "text-muted"
	  }, [_vm._v("type object")])], 1), _vm._v(" "), _c('div', {
	    staticClass: "container"
	  }, [_c('pic-zone', {
	    staticClass: "col"
	  })], 1), _vm._v(" "), _c('div', {
	    staticClass: "container"
	  }, [_c('div', {
	    staticClass: "row"
	  }, [_c('div', {
	    staticClass: "col"
	  }, [_c('small', {
	    staticClass: "text-muted"
	  }, [_vm._v("tags: " + _vm._s(_vm.NEW_POINT.tags))])])])]), _vm._v(" "), _c('div', {
	    staticClass: "container"
	  }, [_c('div', {
	    staticClass: "row"
	  }, [_c('div', {
	    staticClass: "col"
	  }, [_c('small', {
	    staticClass: "text-muted"
	  }, [_vm._v("lat: " + _vm._s(_vm.NEW_POINT.latitude))])]), _vm._v(" "), _c('div', {
	    staticClass: "col"
	  }, [_c('small', {
	    staticClass: "text-muted"
	  }, [_vm._v("lng: " + _vm._s(_vm.NEW_POINT.longitude))])])])]), _vm._v(" "), _c('div', {
	    staticClass: "container"
	  }, [_c('div', {
	    staticClass: "row justify-content-end",
	    staticStyle: {
	      "padding-right": "16px"
	    }
	  }, [_c('b-button', {
	    ref: "btn_ok",
	    staticClass: "col-4",
	    attrs: {
	      "size": _vm.lg,
	      "variant": _vm.primary,
	      "href": ""
	    },
	    on: {
	      "click": _vm.postNewPoint
	    }
	  }, [_vm._v("ok")]), _vm._v(" "), _c('b-button', {
	    staticClass: "col-4 show-blinking",
	    attrs: {
	      "size": _vm.lg,
	      "variant": _vm.primary,
	      "href": ""
	    },
	    on: {
	      "click": _vm.close
	    }
	  }, [_vm._v("close")])], 1)])])
	},staticRenderFns: []}
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-50676a42", module.exports)
	  }
	}

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _mutations, _actions, _getters;
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	var _vue = __webpack_require__(1);
	
	var _vue2 = _interopRequireDefault(_vue);
	
	var _vuex = __webpack_require__(27);
	
	var _vuex2 = _interopRequireDefault(_vuex);
	
	var _typesActions = __webpack_require__(29);
	
	var acts = _interopRequireWildcard(_typesActions);
	
	var _typesMutations = __webpack_require__(51);
	
	var muts = _interopRequireWildcard(_typesMutations);
	
	var _typesGetters = __webpack_require__(30);
	
	var gets = _interopRequireWildcard(_typesGetters);
	
	var _apiGens = __webpack_require__(90);
	
	var gen = _interopRequireWildcard(_apiGens);
	
	var _apiPoints = __webpack_require__(91);
	
	var api_point = _interopRequireWildcard(_apiPoints);
	
	var _events = __webpack_require__(95);
	
	var _events2 = _interopRequireDefault(_events);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	_vue2.default.use(_vuex2.default);
	
	var state = {
	  my_point: {
	    pic: '', name: '', text: '', token: '', editable: true,
	    tobject: 'User', time: '', latitude: 0.0, longitude: 0.0
	  },
	  new_point: {
	    pic: '', name: '', text: '', tags: [], token: '', editable: true,
	    tobject: 'User', latitude: 0.0, longitude: 0.0
	  },
	  filter: {
	    tobject: 'User', tgeos: 'Point', ttime: 'Any',
	    tags: [], scope: 0, lng: 0, lat: 0
	  },
	  points: [],
	  error: { status: 0, message: '' }
	};
	
	var mutations = (_mutations = {}, _defineProperty(_mutations, muts.SET_POINTS, function (state, points) {
	  //{{{
	  state.points = points;
	}), _defineProperty(_mutations, muts.PUT_POINT, function (state, point) {
	  //{{{
	  var index = state.points.findIndex(function (e) {
	    return e.id === point.id;
	  });
	  if (index > -1) {
	    state.points.splice(index, 1, point);
	  } else {
	    state.points.unshift(point);
	  }
	}), _defineProperty(_mutations, muts.DEL_POINT, function (state, point) {
	  //{{{
	  var index = state.points.findIndex(function (e) {
	    return e._id === point.id;
	  });
	  if (index > -1) {
	    state.points.splice(index, 1);
	  } else {
	    console.log('can not delete point: ', point);
	  }
	}), _defineProperty(_mutations, muts.SET_TAGS, function (state) {
	  //{{{
	  state.new_point.tags = gen.get_tags(state.new_point.text);
	}), _defineProperty(_mutations, muts.SET_FILTER, function (state, filter) {
	  //{{{
	  state.filter = _extends({}, state.filter, filter);
	}), _defineProperty(_mutations, muts.CLEAN_POINTS, function (state) {
	  //{{{
	  state.points = [];
	}), _defineProperty(_mutations, muts.PUT_NEW_POINT, function (state, new_point) {
	  //{{{
	  state.new_point = _extends({}, state.new_point, new_point);
	}), _defineProperty(_mutations, muts.PUT_MY_POINT, function (state, my_point) {
	  //{{{
	  state.my_point = _extends({}, state.my_point, my_point);
	}), _mutations);
	
	var actions = (_actions = {}, _defineProperty(_actions, acts.GET_POINT, function (_ref, point) {
	  var commit = _ref.commit;
	  //{{{
	  return api_point.resRndPoint.get({}, point).then(function (res) {
	    // console.log('## res: ', res.data.body);
	    if (res.status === 200) {
	      commit(muts.PUT_POINT, res.data.body);
	    } else {
	      throw new Error('can\'t get this point');
	    }
	  });
	}), _defineProperty(_actions, acts.PST_POINT, function (_ref2, point) {
	  var commit = _ref2.commit;
	  // {{{
	  return api_point.resPoints.save({}, point).then(function (res) {
	    if (res.status === 200) {
	      commit(muts.PUT_POINT, res.data.body);
	    } else {
	      throw new Error('can\'t post this point');
	    }
	  });
	}), _defineProperty(_actions, acts.PUT_POINT, function (_ref3, point) {
	  var commit = _ref3.commit;
	  // {{{
	  return api_point.resPoints.update({}, point).then(function (res) {
	    if (res.status === 200) {
	      commit(muts.PUT_POINT, res.data.body);
	    } else {
	      throw new Error('can\'t post this point');
	    }
	  });
	}), _defineProperty(_actions, acts.DEL_POINT, function (_ref4, point) {
	  var commit = _ref4.commit;
	  // {{{
	  return api_point.resPoints.remove({}, { _id: point.id }).then(function (res) {
	    if (res.status === 200) {
	      commit(muts.DEL_POINT, point);
	    } else {
	      throw new Error('can\'t deleted this point');
	    }
	  });
	}), _defineProperty(_actions, acts.GET_RND_POINTS, function (_ref5) {
	  var commit = _ref5.commit;
	  //{{{
	  return api_point.resRndPoint.get().then(function (res) {
	    if (res.status === 200) {
	      commit(muts.SET_POINTS, res.data.body);
	    } else {
	      throw new Error('can\'t get rnd points');
	    }
	  });
	}), _defineProperty(_actions, acts.GET_ALL_POINTS, function (_ref6) {
	  var commit = _ref6.commit;
	  //{{{
	  return api_point.resAllPoint.get().then(function (res) {
	    if (res.status === 200) {
	      commit(muts.SET_POINTS, res.data.body);
	    } else {
	      throw new Error('can\'t get all points');
	    }
	  });
	}), _defineProperty(_actions, acts.GET_NEAR_POINTS, function (_ref7, reqNear) {
	  var commit = _ref7.commit;
	  //{{{
	  console.log(reqNear);
	  return api_point.resNearPoint.get(reqNear).then(function (res) {
	    if (res.status === 200) {
	      commit(muts.SET_POINTS, res.data.body);
	    } else {
	      throw new Error('can\'t get near points');
	    }
	  });
	}), _defineProperty(_actions, acts.SET_FILTER, function (_ref8, reqFilter) {
	  var commit = _ref8.commit;
	  //{{{
	  commit(muts.SET_FILTER, reqFilter);
	}), _defineProperty(_actions, acts.GET_FILTER, function (_ref9, reqFilter) {
	  var commit = _ref9.commit;
	  //{{{
	  console.log(reqFilter);
	  return api_point.resFilterPoint.get(reqFilter).then(function (res) {
	    if (res.status === 200) {
	      commit(muts.SET_POINTS, res.data.body);
	    } else {
	      throw new Error('can\'t get filtered points');
	    }
	  });
	}), _defineProperty(_actions, acts.SET_TAGS, function (_ref10) {
	  var commit = _ref10.commit;
	  //{{{
	  commit(muts.SET_TAGS);
	}), _defineProperty(_actions, acts.PUT_NEW_POINT, function (_ref11, new_point) {
	  var commit = _ref11.commit;
	  //{{{
	  commit(muts.PUT_NEW_POINT, new_point);
	}), _defineProperty(_actions, acts.PUT_MY_POINT, function (_ref12, my_point) {
	  var commit = _ref12.commit;
	  //{{{
	  commit(muts.PUT_MY_POINT, my_point);
	}), _actions);
	
	var getters = (_getters = {}, _defineProperty(_getters, gets.POINTS, function (state) {
	  //{{{
	  return state.points;
	}), _defineProperty(_getters, gets.NEW_POINT, function (state) {
	  //{{{
	  return state.new_point;
	}), _defineProperty(_getters, gets.MY_POINT, function (state) {
	  //{{{
	  return state.my_point;
	}), _defineProperty(_getters, gets.FILTER, function (state) {
	  //{{{
	  return state.filter;
	}), _getters);
	
	exports.default = new _vuex2.default.Store({
	  state: state,
	  getters: getters,
	  modules: {
	    events: _events2.default
	  },
	  actions: actions,
	  mutations: mutations
	});

/***/ }),
/* 90 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var num = exports.num = function num() {
	  //{{{
	  var min = 0.0000;
	  var max = 1.9000;
	  return Math.random() * (max - min) + min;
	}; //}}}
	
	var token = exports.token = function token(len) {
	  //{{{
	  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	  var text = "";
	  for (var i = 0; i < len; i++) {
	    text += possible.charAt(Math.floor(Math.random() * possible.length));
	  };
	  return text;
	}; //}}}
	
	var get_tags = exports.get_tags = function get_tags(text) {
	  //{{{
	  var tags = [];
	  var txt = text.trim().split('');
	  var reg_tag = false;
	  var cur_tag = '';
	
	  for (var i = 0; i < txt.length; i++) {
	    if (reg_tag && txt[i] === '#') {
	      tags.push(cur_tag);
	      cur_tag = '';
	    };
	
	    if (!reg_tag && txt[i] === '#') {
	      reg_tag = true;
	    };
	
	    if (reg_tag && txt[i] === ' ') {
	      if (cur_tag !== '#') {
	        tags.push(cur_tag);
	      }
	      reg_tag = false;
	      cur_tag = '';
	      continue;
	    };
	
	    if (reg_tag) {
	      cur_tag = cur_tag + txt[i];
	    };
	  };
	  tags.push(cur_tag);
	  return tags;
	}; //}}}

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.resFilterPoint = exports.resNearPoint = exports.resAllPoint = exports.resRndPoint = exports.resPoints = undefined;
	
	var _vue = __webpack_require__(1);
	
	var _vue2 = _interopRequireDefault(_vue);
	
	var _vueResource = __webpack_require__(92);
	
	var _vueResource2 = _interopRequireDefault(_vueResource);
	
	var _pathsApi = __webpack_require__(94);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_vue2.default.use(_vueResource2.default);
	
	_vue2.default.http.options.crossOrigin = true;
	// Vue.http.options.credentials = true
	
	var resPoints = exports.resPoints = _vue2.default.resource(_pathsApi.POINTS.POINTS);
	var resRndPoint = exports.resRndPoint = _vue2.default.resource(_pathsApi.POINTS.RND);
	var resAllPoint = exports.resAllPoint = _vue2.default.resource(_pathsApi.POINTS.ALL);
	var resNearPoint = exports.resNearPoint = _vue2.default.resource(_pathsApi.POINTS.NEAR);
	var resFilterPoint = exports.resFilterPoint = _vue2.default.resource(_pathsApi.POINTS.FILTER);

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

	/*!
	 * vue-resource v1.3.3
	 * https://github.com/pagekit/vue-resource
	 * Released under the MIT License.
	 */
	
	'use strict';
	
	/**
	 * Promises/A+ polyfill v1.1.4 (https://github.com/bramstein/promis)
	 */
	
	var RESOLVED = 0;
	var REJECTED = 1;
	var PENDING  = 2;
	
	function Promise$1(executor) {
	
	    this.state = PENDING;
	    this.value = undefined;
	    this.deferred = [];
	
	    var promise = this;
	
	    try {
	        executor(function (x) {
	            promise.resolve(x);
	        }, function (r) {
	            promise.reject(r);
	        });
	    } catch (e) {
	        promise.reject(e);
	    }
	}
	
	Promise$1.reject = function (r) {
	    return new Promise$1(function (resolve, reject) {
	        reject(r);
	    });
	};
	
	Promise$1.resolve = function (x) {
	    return new Promise$1(function (resolve, reject) {
	        resolve(x);
	    });
	};
	
	Promise$1.all = function all(iterable) {
	    return new Promise$1(function (resolve, reject) {
	        var count = 0, result = [];
	
	        if (iterable.length === 0) {
	            resolve(result);
	        }
	
	        function resolver(i) {
	            return function (x) {
	                result[i] = x;
	                count += 1;
	
	                if (count === iterable.length) {
	                    resolve(result);
	                }
	            };
	        }
	
	        for (var i = 0; i < iterable.length; i += 1) {
	            Promise$1.resolve(iterable[i]).then(resolver(i), reject);
	        }
	    });
	};
	
	Promise$1.race = function race(iterable) {
	    return new Promise$1(function (resolve, reject) {
	        for (var i = 0; i < iterable.length; i += 1) {
	            Promise$1.resolve(iterable[i]).then(resolve, reject);
	        }
	    });
	};
	
	var p$1 = Promise$1.prototype;
	
	p$1.resolve = function resolve(x) {
	    var promise = this;
	
	    if (promise.state === PENDING) {
	        if (x === promise) {
	            throw new TypeError('Promise settled with itself.');
	        }
	
	        var called = false;
	
	        try {
	            var then = x && x['then'];
	
	            if (x !== null && typeof x === 'object' && typeof then === 'function') {
	                then.call(x, function (x) {
	                    if (!called) {
	                        promise.resolve(x);
	                    }
	                    called = true;
	
	                }, function (r) {
	                    if (!called) {
	                        promise.reject(r);
	                    }
	                    called = true;
	                });
	                return;
	            }
	        } catch (e) {
	            if (!called) {
	                promise.reject(e);
	            }
	            return;
	        }
	
	        promise.state = RESOLVED;
	        promise.value = x;
	        promise.notify();
	    }
	};
	
	p$1.reject = function reject(reason) {
	    var promise = this;
	
	    if (promise.state === PENDING) {
	        if (reason === promise) {
	            throw new TypeError('Promise settled with itself.');
	        }
	
	        promise.state = REJECTED;
	        promise.value = reason;
	        promise.notify();
	    }
	};
	
	p$1.notify = function notify() {
	    var promise = this;
	
	    nextTick(function () {
	        if (promise.state !== PENDING) {
	            while (promise.deferred.length) {
	                var deferred = promise.deferred.shift(),
	                    onResolved = deferred[0],
	                    onRejected = deferred[1],
	                    resolve = deferred[2],
	                    reject = deferred[3];
	
	                try {
	                    if (promise.state === RESOLVED) {
	                        if (typeof onResolved === 'function') {
	                            resolve(onResolved.call(undefined, promise.value));
	                        } else {
	                            resolve(promise.value);
	                        }
	                    } else if (promise.state === REJECTED) {
	                        if (typeof onRejected === 'function') {
	                            resolve(onRejected.call(undefined, promise.value));
	                        } else {
	                            reject(promise.value);
	                        }
	                    }
	                } catch (e) {
	                    reject(e);
	                }
	            }
	        }
	    });
	};
	
	p$1.then = function then(onResolved, onRejected) {
	    var promise = this;
	
	    return new Promise$1(function (resolve, reject) {
	        promise.deferred.push([onResolved, onRejected, resolve, reject]);
	        promise.notify();
	    });
	};
	
	p$1.catch = function (onRejected) {
	    return this.then(undefined, onRejected);
	};
	
	/**
	 * Promise adapter.
	 */
	
	if (typeof Promise === 'undefined') {
	    window.Promise = Promise$1;
	}
	
	function PromiseObj(executor, context) {
	
	    if (executor instanceof Promise) {
	        this.promise = executor;
	    } else {
	        this.promise = new Promise(executor.bind(context));
	    }
	
	    this.context = context;
	}
	
	PromiseObj.all = function (iterable, context) {
	    return new PromiseObj(Promise.all(iterable), context);
	};
	
	PromiseObj.resolve = function (value, context) {
	    return new PromiseObj(Promise.resolve(value), context);
	};
	
	PromiseObj.reject = function (reason, context) {
	    return new PromiseObj(Promise.reject(reason), context);
	};
	
	PromiseObj.race = function (iterable, context) {
	    return new PromiseObj(Promise.race(iterable), context);
	};
	
	var p = PromiseObj.prototype;
	
	p.bind = function (context) {
	    this.context = context;
	    return this;
	};
	
	p.then = function (fulfilled, rejected) {
	
	    if (fulfilled && fulfilled.bind && this.context) {
	        fulfilled = fulfilled.bind(this.context);
	    }
	
	    if (rejected && rejected.bind && this.context) {
	        rejected = rejected.bind(this.context);
	    }
	
	    return new PromiseObj(this.promise.then(fulfilled, rejected), this.context);
	};
	
	p.catch = function (rejected) {
	
	    if (rejected && rejected.bind && this.context) {
	        rejected = rejected.bind(this.context);
	    }
	
	    return new PromiseObj(this.promise.catch(rejected), this.context);
	};
	
	p.finally = function (callback) {
	
	    return this.then(function (value) {
	            callback.call(this);
	            return value;
	        }, function (reason) {
	            callback.call(this);
	            return Promise.reject(reason);
	        }
	    );
	};
	
	/**
	 * Utility functions.
	 */
	
	var ref = {};
	var hasOwnProperty = ref.hasOwnProperty;
	
	var ref$1 = [];
	var slice = ref$1.slice;
	var debug = false;
	var ntick;
	
	var inBrowser = typeof window !== 'undefined';
	
	var Util = function (ref) {
	    var config = ref.config;
	    var nextTick = ref.nextTick;
	
	    ntick = nextTick;
	    debug = config.debug || !config.silent;
	};
	
	function warn(msg) {
	    if (typeof console !== 'undefined' && debug) {
	        console.warn('[VueResource warn]: ' + msg);
	    }
	}
	
	function error(msg) {
	    if (typeof console !== 'undefined') {
	        console.error(msg);
	    }
	}
	
	function nextTick(cb, ctx) {
	    return ntick(cb, ctx);
	}
	
	function trim(str) {
	    return str ? str.replace(/^\s*|\s*$/g, '') : '';
	}
	
	function trimEnd(str, chars) {
	
	    if (str && chars === undefined) {
	        return str.replace(/\s+$/, '');
	    }
	
	    if (!str || !chars) {
	        return str;
	    }
	
	    return str.replace(new RegExp(("[" + chars + "]+$")), '');
	}
	
	function toLower(str) {
	    return str ? str.toLowerCase() : '';
	}
	
	function toUpper(str) {
	    return str ? str.toUpperCase() : '';
	}
	
	var isArray = Array.isArray;
	
	function isString(val) {
	    return typeof val === 'string';
	}
	
	
	
	function isFunction(val) {
	    return typeof val === 'function';
	}
	
	function isObject(obj) {
	    return obj !== null && typeof obj === 'object';
	}
	
	function isPlainObject(obj) {
	    return isObject(obj) && Object.getPrototypeOf(obj) == Object.prototype;
	}
	
	function isBlob(obj) {
	    return typeof Blob !== 'undefined' && obj instanceof Blob;
	}
	
	function isFormData(obj) {
	    return typeof FormData !== 'undefined' && obj instanceof FormData;
	}
	
	function when(value, fulfilled, rejected) {
	
	    var promise = PromiseObj.resolve(value);
	
	    if (arguments.length < 2) {
	        return promise;
	    }
	
	    return promise.then(fulfilled, rejected);
	}
	
	function options(fn, obj, opts) {
	
	    opts = opts || {};
	
	    if (isFunction(opts)) {
	        opts = opts.call(obj);
	    }
	
	    return merge(fn.bind({$vm: obj, $options: opts}), fn, {$options: opts});
	}
	
	function each(obj, iterator) {
	
	    var i, key;
	
	    if (isArray(obj)) {
	        for (i = 0; i < obj.length; i++) {
	            iterator.call(obj[i], obj[i], i);
	        }
	    } else if (isObject(obj)) {
	        for (key in obj) {
	            if (hasOwnProperty.call(obj, key)) {
	                iterator.call(obj[key], obj[key], key);
	            }
	        }
	    }
	
	    return obj;
	}
	
	var assign = Object.assign || _assign;
	
	function merge(target) {
	
	    var args = slice.call(arguments, 1);
	
	    args.forEach(function (source) {
	        _merge(target, source, true);
	    });
	
	    return target;
	}
	
	function defaults(target) {
	
	    var args = slice.call(arguments, 1);
	
	    args.forEach(function (source) {
	
	        for (var key in source) {
	            if (target[key] === undefined) {
	                target[key] = source[key];
	            }
	        }
	
	    });
	
	    return target;
	}
	
	function _assign(target) {
	
	    var args = slice.call(arguments, 1);
	
	    args.forEach(function (source) {
	        _merge(target, source);
	    });
	
	    return target;
	}
	
	function _merge(target, source, deep) {
	    for (var key in source) {
	        if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
	            if (isPlainObject(source[key]) && !isPlainObject(target[key])) {
	                target[key] = {};
	            }
	            if (isArray(source[key]) && !isArray(target[key])) {
	                target[key] = [];
	            }
	            _merge(target[key], source[key], deep);
	        } else if (source[key] !== undefined) {
	            target[key] = source[key];
	        }
	    }
	}
	
	/**
	 * Root Prefix Transform.
	 */
	
	var root = function (options$$1, next) {
	
	    var url = next(options$$1);
	
	    if (isString(options$$1.root) && !/^(https?:)?\//.test(url)) {
	        url = trimEnd(options$$1.root, '/') + '/' + url;
	    }
	
	    return url;
	};
	
	/**
	 * Query Parameter Transform.
	 */
	
	var query = function (options$$1, next) {
	
	    var urlParams = Object.keys(Url.options.params), query = {}, url = next(options$$1);
	
	    each(options$$1.params, function (value, key) {
	        if (urlParams.indexOf(key) === -1) {
	            query[key] = value;
	        }
	    });
	
	    query = Url.params(query);
	
	    if (query) {
	        url += (url.indexOf('?') == -1 ? '?' : '&') + query;
	    }
	
	    return url;
	};
	
	/**
	 * URL Template v2.0.6 (https://github.com/bramstein/url-template)
	 */
	
	function expand(url, params, variables) {
	
	    var tmpl = parse(url), expanded = tmpl.expand(params);
	
	    if (variables) {
	        variables.push.apply(variables, tmpl.vars);
	    }
	
	    return expanded;
	}
	
	function parse(template) {
	
	    var operators = ['+', '#', '.', '/', ';', '?', '&'], variables = [];
	
	    return {
	        vars: variables,
	        expand: function expand(context) {
	            return template.replace(/\{([^\{\}]+)\}|([^\{\}]+)/g, function (_, expression, literal) {
	                if (expression) {
	
	                    var operator = null, values = [];
	
	                    if (operators.indexOf(expression.charAt(0)) !== -1) {
	                        operator = expression.charAt(0);
	                        expression = expression.substr(1);
	                    }
	
	                    expression.split(/,/g).forEach(function (variable) {
	                        var tmp = /([^:\*]*)(?::(\d+)|(\*))?/.exec(variable);
	                        values.push.apply(values, getValues(context, operator, tmp[1], tmp[2] || tmp[3]));
	                        variables.push(tmp[1]);
	                    });
	
	                    if (operator && operator !== '+') {
	
	                        var separator = ',';
	
	                        if (operator === '?') {
	                            separator = '&';
	                        } else if (operator !== '#') {
	                            separator = operator;
	                        }
	
	                        return (values.length !== 0 ? operator : '') + values.join(separator);
	                    } else {
	                        return values.join(',');
	                    }
	
	                } else {
	                    return encodeReserved(literal);
	                }
	            });
	        }
	    };
	}
	
	function getValues(context, operator, key, modifier) {
	
	    var value = context[key], result = [];
	
	    if (isDefined(value) && value !== '') {
	        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
	            value = value.toString();
	
	            if (modifier && modifier !== '*') {
	                value = value.substring(0, parseInt(modifier, 10));
	            }
	
	            result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : null));
	        } else {
	            if (modifier === '*') {
	                if (Array.isArray(value)) {
	                    value.filter(isDefined).forEach(function (value) {
	                        result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : null));
	                    });
	                } else {
	                    Object.keys(value).forEach(function (k) {
	                        if (isDefined(value[k])) {
	                            result.push(encodeValue(operator, value[k], k));
	                        }
	                    });
	                }
	            } else {
	                var tmp = [];
	
	                if (Array.isArray(value)) {
	                    value.filter(isDefined).forEach(function (value) {
	                        tmp.push(encodeValue(operator, value));
	                    });
	                } else {
	                    Object.keys(value).forEach(function (k) {
	                        if (isDefined(value[k])) {
	                            tmp.push(encodeURIComponent(k));
	                            tmp.push(encodeValue(operator, value[k].toString()));
	                        }
	                    });
	                }
	
	                if (isKeyOperator(operator)) {
	                    result.push(encodeURIComponent(key) + '=' + tmp.join(','));
	                } else if (tmp.length !== 0) {
	                    result.push(tmp.join(','));
	                }
	            }
	        }
	    } else {
	        if (operator === ';') {
	            result.push(encodeURIComponent(key));
	        } else if (value === '' && (operator === '&' || operator === '?')) {
	            result.push(encodeURIComponent(key) + '=');
	        } else if (value === '') {
	            result.push('');
	        }
	    }
	
	    return result;
	}
	
	function isDefined(value) {
	    return value !== undefined && value !== null;
	}
	
	function isKeyOperator(operator) {
	    return operator === ';' || operator === '&' || operator === '?';
	}
	
	function encodeValue(operator, value, key) {
	
	    value = (operator === '+' || operator === '#') ? encodeReserved(value) : encodeURIComponent(value);
	
	    if (key) {
	        return encodeURIComponent(key) + '=' + value;
	    } else {
	        return value;
	    }
	}
	
	function encodeReserved(str) {
	    return str.split(/(%[0-9A-Fa-f]{2})/g).map(function (part) {
	        if (!/%[0-9A-Fa-f]/.test(part)) {
	            part = encodeURI(part);
	        }
	        return part;
	    }).join('');
	}
	
	/**
	 * URL Template (RFC 6570) Transform.
	 */
	
	var template = function (options) {
	
	    var variables = [], url = expand(options.url, options.params, variables);
	
	    variables.forEach(function (key) {
	        delete options.params[key];
	    });
	
	    return url;
	};
	
	/**
	 * Service for URL templating.
	 */
	
	function Url(url, params) {
	
	    var self = this || {}, options$$1 = url, transform;
	
	    if (isString(url)) {
	        options$$1 = {url: url, params: params};
	    }
	
	    options$$1 = merge({}, Url.options, self.$options, options$$1);
	
	    Url.transforms.forEach(function (handler) {
	
	        if (isString(handler)) {
	            handler = Url.transform[handler];
	        }
	
	        if (isFunction(handler)) {
	            transform = factory(handler, transform, self.$vm);
	        }
	
	    });
	
	    return transform(options$$1);
	}
	
	/**
	 * Url options.
	 */
	
	Url.options = {
	    url: '',
	    root: null,
	    params: {}
	};
	
	/**
	 * Url transforms.
	 */
	
	Url.transform = {template: template, query: query, root: root};
	Url.transforms = ['template', 'query', 'root'];
	
	/**
	 * Encodes a Url parameter string.
	 *
	 * @param {Object} obj
	 */
	
	Url.params = function (obj) {
	
	    var params = [], escape = encodeURIComponent;
	
	    params.add = function (key, value) {
	
	        if (isFunction(value)) {
	            value = value();
	        }
	
	        if (value === null) {
	            value = '';
	        }
	
	        this.push(escape(key) + '=' + escape(value));
	    };
	
	    serialize(params, obj);
	
	    return params.join('&').replace(/%20/g, '+');
	};
	
	/**
	 * Parse a URL and return its components.
	 *
	 * @param {String} url
	 */
	
	Url.parse = function (url) {
	
	    var el = document.createElement('a');
	
	    if (document.documentMode) {
	        el.href = url;
	        url = el.href;
	    }
	
	    el.href = url;
	
	    return {
	        href: el.href,
	        protocol: el.protocol ? el.protocol.replace(/:$/, '') : '',
	        port: el.port,
	        host: el.host,
	        hostname: el.hostname,
	        pathname: el.pathname.charAt(0) === '/' ? el.pathname : '/' + el.pathname,
	        search: el.search ? el.search.replace(/^\?/, '') : '',
	        hash: el.hash ? el.hash.replace(/^#/, '') : ''
	    };
	};
	
	function factory(handler, next, vm) {
	    return function (options$$1) {
	        return handler.call(vm, options$$1, next);
	    };
	}
	
	function serialize(params, obj, scope) {
	
	    var array = isArray(obj), plain = isPlainObject(obj), hash;
	
	    each(obj, function (value, key) {
	
	        hash = isObject(value) || isArray(value);
	
	        if (scope) {
	            key = scope + '[' + (plain || hash ? key : '') + ']';
	        }
	
	        if (!scope && array) {
	            params.add(value.name, value.value);
	        } else if (hash) {
	            serialize(params, value, key);
	        } else {
	            params.add(key, value);
	        }
	    });
	}
	
	/**
	 * XDomain client (Internet Explorer).
	 */
	
	var xdrClient = function (request) {
	    return new PromiseObj(function (resolve) {
	
	        var xdr = new XDomainRequest(), handler = function (ref) {
	            var type = ref.type;
	
	
	            var status = 0;
	
	            if (type === 'load') {
	                status = 200;
	            } else if (type === 'error') {
	                status = 500;
	            }
	
	            resolve(request.respondWith(xdr.responseText, {status: status}));
	        };
	
	        request.abort = function () { return xdr.abort(); };
	
	        xdr.open(request.method, request.getUrl());
	
	        if (request.timeout) {
	            xdr.timeout = request.timeout;
	        }
	
	        xdr.onload = handler;
	        xdr.onabort = handler;
	        xdr.onerror = handler;
	        xdr.ontimeout = handler;
	        xdr.onprogress = function () {};
	        xdr.send(request.getBody());
	    });
	};
	
	/**
	 * CORS Interceptor.
	 */
	
	var SUPPORTS_CORS = inBrowser && 'withCredentials' in new XMLHttpRequest();
	
	var cors = function (request, next) {
	
	    if (inBrowser) {
	
	        var orgUrl = Url.parse(location.href);
	        var reqUrl = Url.parse(request.getUrl());
	
	        if (reqUrl.protocol !== orgUrl.protocol || reqUrl.host !== orgUrl.host) {
	
	            request.crossOrigin = true;
	            request.emulateHTTP = false;
	
	            if (!SUPPORTS_CORS) {
	                request.client = xdrClient;
	            }
	        }
	    }
	
	    next();
	};
	
	/**
	 * Form data Interceptor.
	 */
	
	var form = function (request, next) {
	
	    if (isFormData(request.body)) {
	
	        request.headers.delete('Content-Type');
	
	    } else if (isObject(request.body) && request.emulateJSON) {
	
	        request.body = Url.params(request.body);
	        request.headers.set('Content-Type', 'application/x-www-form-urlencoded');
	    }
	
	    next();
	};
	
	/**
	 * JSON Interceptor.
	 */
	
	var json = function (request, next) {
	
	    var type = request.headers.get('Content-Type') || '';
	
	    if (isObject(request.body) && type.indexOf('application/json') === 0) {
	        request.body = JSON.stringify(request.body);
	    }
	
	    next(function (response) {
	
	        return response.bodyText ? when(response.text(), function (text) {
	
	            type = response.headers.get('Content-Type') || '';
	
	            if (type.indexOf('application/json') === 0 || isJson(text)) {
	
	                try {
	                    response.body = JSON.parse(text);
	                } catch (e) {
	                    response.body = null;
	                }
	
	            } else {
	                response.body = text;
	            }
	
	            return response;
	
	        }) : response;
	
	    });
	};
	
	function isJson(str) {
	
	    var start = str.match(/^\[|^\{(?!\{)/), end = {'[': /]$/, '{': /}$/};
	
	    return start && end[start[0]].test(str);
	}
	
	/**
	 * JSONP client (Browser).
	 */
	
	var jsonpClient = function (request) {
	    return new PromiseObj(function (resolve) {
	
	        var name = request.jsonp || 'callback', callback = request.jsonpCallback || '_jsonp' + Math.random().toString(36).substr(2), body = null, handler, script;
	
	        handler = function (ref) {
	            var type = ref.type;
	
	
	            var status = 0;
	
	            if (type === 'load' && body !== null) {
	                status = 200;
	            } else if (type === 'error') {
	                status = 500;
	            }
	
	            if (status && window[callback]) {
	                delete window[callback];
	                document.body.removeChild(script);
	            }
	
	            resolve(request.respondWith(body, {status: status}));
	        };
	
	        window[callback] = function (result) {
	            body = JSON.stringify(result);
	        };
	
	        request.abort = function () {
	            handler({type: 'abort'});
	        };
	
	        request.params[name] = callback;
	
	        if (request.timeout) {
	            setTimeout(request.abort, request.timeout);
	        }
	
	        script = document.createElement('script');
	        script.src = request.getUrl();
	        script.type = 'text/javascript';
	        script.async = true;
	        script.onload = handler;
	        script.onerror = handler;
	
	        document.body.appendChild(script);
	    });
	};
	
	/**
	 * JSONP Interceptor.
	 */
	
	var jsonp = function (request, next) {
	
	    if (request.method == 'JSONP') {
	        request.client = jsonpClient;
	    }
	
	    next();
	};
	
	/**
	 * Before Interceptor.
	 */
	
	var before = function (request, next) {
	
	    if (isFunction(request.before)) {
	        request.before.call(this, request);
	    }
	
	    next();
	};
	
	/**
	 * HTTP method override Interceptor.
	 */
	
	var method = function (request, next) {
	
	    if (request.emulateHTTP && /^(PUT|PATCH|DELETE)$/i.test(request.method)) {
	        request.headers.set('X-HTTP-Method-Override', request.method);
	        request.method = 'POST';
	    }
	
	    next();
	};
	
	/**
	 * Header Interceptor.
	 */
	
	var header = function (request, next) {
	
	    var headers = assign({}, Http.headers.common,
	        !request.crossOrigin ? Http.headers.custom : {},
	        Http.headers[toLower(request.method)]
	    );
	
	    each(headers, function (value, name) {
	        if (!request.headers.has(name)) {
	            request.headers.set(name, value);
	        }
	    });
	
	    next();
	};
	
	/**
	 * XMLHttp client (Browser).
	 */
	
	var xhrClient = function (request) {
	    return new PromiseObj(function (resolve) {
	
	        var xhr = new XMLHttpRequest(), handler = function (event) {
	
	            var response = request.respondWith(
	                'response' in xhr ? xhr.response : xhr.responseText, {
	                    status: xhr.status === 1223 ? 204 : xhr.status, // IE9 status bug
	                    statusText: xhr.status === 1223 ? 'No Content' : trim(xhr.statusText)
	                }
	            );
	
	            each(trim(xhr.getAllResponseHeaders()).split('\n'), function (row) {
	                response.headers.append(row.slice(0, row.indexOf(':')), row.slice(row.indexOf(':') + 1));
	            });
	
	            resolve(response);
	        };
	
	        request.abort = function () { return xhr.abort(); };
	
	        if (request.progress) {
	            if (request.method === 'GET') {
	                xhr.addEventListener('progress', request.progress);
	            } else if (/^(POST|PUT)$/i.test(request.method)) {
	                xhr.upload.addEventListener('progress', request.progress);
	            }
	        }
	
	        xhr.open(request.method, request.getUrl(), true);
	
	        if (request.timeout) {
	            xhr.timeout = request.timeout;
	        }
	
	        if (request.responseType && 'responseType' in xhr) {
	            xhr.responseType = request.responseType;
	        }
	
	        if (request.withCredentials || request.credentials) {
	            xhr.withCredentials = true;
	        }
	
	        if (!request.crossOrigin) {
	            request.headers.set('X-Requested-With', 'XMLHttpRequest');
	        }
	
	        request.headers.forEach(function (value, name) {
	            xhr.setRequestHeader(name, value);
	        });
	
	        xhr.onload = handler;
	        xhr.onabort = handler;
	        xhr.onerror = handler;
	        xhr.ontimeout = handler;
	        xhr.send(request.getBody());
	    });
	};
	
	/**
	 * Http client (Node).
	 */
	
	var nodeClient = function (request) {
	
	    var client = __webpack_require__(93);
	
	    return new PromiseObj(function (resolve) {
	
	        var url = request.getUrl();
	        var body = request.getBody();
	        var method = request.method;
	        var headers = {}, handler;
	
	        request.headers.forEach(function (value, name) {
	            headers[name] = value;
	        });
	
	        client(url, {body: body, method: method, headers: headers}).then(handler = function (resp) {
	
	            var response = request.respondWith(resp.body, {
	                    status: resp.statusCode,
	                    statusText: trim(resp.statusMessage)
	                }
	            );
	
	            each(resp.headers, function (value, name) {
	                response.headers.set(name, value);
	            });
	
	            resolve(response);
	
	        }, function (error$$1) { return handler(error$$1.response); });
	    });
	};
	
	/**
	 * Base client.
	 */
	
	var Client = function (context) {
	
	    var reqHandlers = [sendRequest], resHandlers = [], handler;
	
	    if (!isObject(context)) {
	        context = null;
	    }
	
	    function Client(request) {
	        return new PromiseObj(function (resolve) {
	
	            function exec() {
	
	                handler = reqHandlers.pop();
	
	                if (isFunction(handler)) {
	                    handler.call(context, request, next);
	                } else {
	                    warn(("Invalid interceptor of type " + (typeof handler) + ", must be a function"));
	                    next();
	                }
	            }
	
	            function next(response) {
	
	                if (isFunction(response)) {
	
	                    resHandlers.unshift(response);
	
	                } else if (isObject(response)) {
	
	                    resHandlers.forEach(function (handler) {
	                        response = when(response, function (response) {
	                            return handler.call(context, response) || response;
	                        });
	                    });
	
	                    when(response, resolve);
	
	                    return;
	                }
	
	                exec();
	            }
	
	            exec();
	
	        }, context);
	    }
	
	    Client.use = function (handler) {
	        reqHandlers.push(handler);
	    };
	
	    return Client;
	};
	
	function sendRequest(request, resolve) {
	
	    var client = request.client || (inBrowser ? xhrClient : nodeClient);
	
	    resolve(client(request));
	}
	
	/**
	 * HTTP Headers.
	 */
	
	var Headers = function Headers(headers) {
	    var this$1 = this;
	
	
	    this.map = {};
	
	    each(headers, function (value, name) { return this$1.append(name, value); });
	};
	
	Headers.prototype.has = function has (name) {
	    return getName(this.map, name) !== null;
	};
	
	Headers.prototype.get = function get (name) {
	
	    var list = this.map[getName(this.map, name)];
	
	    return list ? list.join() : null;
	};
	
	Headers.prototype.getAll = function getAll (name) {
	    return this.map[getName(this.map, name)] || [];
	};
	
	Headers.prototype.set = function set (name, value) {
	    this.map[normalizeName(getName(this.map, name) || name)] = [trim(value)];
	};
	
	Headers.prototype.append = function append (name, value){
	
	    var list = this.map[getName(this.map, name)];
	
	    if (list) {
	        list.push(trim(value));
	    } else {
	        this.set(name, value);
	    }
	};
	
	Headers.prototype.delete = function delete$1 (name){
	    delete this.map[getName(this.map, name)];
	};
	
	Headers.prototype.deleteAll = function deleteAll (){
	    this.map = {};
	};
	
	Headers.prototype.forEach = function forEach (callback, thisArg) {
	        var this$1 = this;
	
	    each(this.map, function (list, name) {
	        each(list, function (value) { return callback.call(thisArg, value, name, this$1); });
	    });
	};
	
	function getName(map, name) {
	    return Object.keys(map).reduce(function (prev, curr) {
	        return toLower(name) === toLower(curr) ? curr : prev;
	    }, null);
	}
	
	function normalizeName(name) {
	
	    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
	        throw new TypeError('Invalid character in header field name');
	    }
	
	    return trim(name);
	}
	
	/**
	 * HTTP Response.
	 */
	
	var Response = function Response(body, ref) {
	    var url = ref.url;
	    var headers = ref.headers;
	    var status = ref.status;
	    var statusText = ref.statusText;
	
	
	    this.url = url;
	    this.ok = status >= 200 && status < 300;
	    this.status = status || 0;
	    this.statusText = statusText || '';
	    this.headers = new Headers(headers);
	    this.body = body;
	
	    if (isString(body)) {
	
	        this.bodyText = body;
	
	    } else if (isBlob(body)) {
	
	        this.bodyBlob = body;
	
	        if (isBlobText(body)) {
	            this.bodyText = blobText(body);
	        }
	    }
	};
	
	Response.prototype.blob = function blob () {
	    return when(this.bodyBlob);
	};
	
	Response.prototype.text = function text () {
	    return when(this.bodyText);
	};
	
	Response.prototype.json = function json () {
	    return when(this.text(), function (text) { return JSON.parse(text); });
	};
	
	Object.defineProperty(Response.prototype, 'data', {
	
	    get: function get() {
	        return this.body;
	    },
	
	    set: function set(body) {
	        this.body = body;
	    }
	
	});
	
	function blobText(body) {
	    return new PromiseObj(function (resolve) {
	
	        var reader = new FileReader();
	
	        reader.readAsText(body);
	        reader.onload = function () {
	            resolve(reader.result);
	        };
	
	    });
	}
	
	function isBlobText(body) {
	    return body.type.indexOf('text') === 0 || body.type.indexOf('json') !== -1;
	}
	
	/**
	 * HTTP Request.
	 */
	
	var Request = function Request(options$$1) {
	
	    this.body = null;
	    this.params = {};
	
	    assign(this, options$$1, {
	        method: toUpper(options$$1.method || 'GET')
	    });
	
	    if (!(this.headers instanceof Headers)) {
	        this.headers = new Headers(this.headers);
	    }
	};
	
	Request.prototype.getUrl = function getUrl (){
	    return Url(this);
	};
	
	Request.prototype.getBody = function getBody (){
	    return this.body;
	};
	
	Request.prototype.respondWith = function respondWith (body, options$$1) {
	    return new Response(body, assign(options$$1 || {}, {url: this.getUrl()}));
	};
	
	/**
	 * Service for sending network requests.
	 */
	
	var COMMON_HEADERS = {'Accept': 'application/json, text/plain, */*'};
	var JSON_CONTENT_TYPE = {'Content-Type': 'application/json;charset=utf-8'};
	
	function Http(options$$1) {
	
	    var self = this || {}, client = Client(self.$vm);
	
	    defaults(options$$1 || {}, self.$options, Http.options);
	
	    Http.interceptors.forEach(function (handler) {
	
	        if (isString(handler)) {
	            handler = Http.interceptor[handler];
	        }
	
	        if (isFunction(handler)) {
	            client.use(handler);
	        }
	
	    });
	
	    return client(new Request(options$$1)).then(function (response) {
	
	        return response.ok ? response : PromiseObj.reject(response);
	
	    }, function (response) {
	
	        if (response instanceof Error) {
	            error(response);
	        }
	
	        return PromiseObj.reject(response);
	    });
	}
	
	Http.options = {};
	
	Http.headers = {
	    put: JSON_CONTENT_TYPE,
	    post: JSON_CONTENT_TYPE,
	    patch: JSON_CONTENT_TYPE,
	    delete: JSON_CONTENT_TYPE,
	    common: COMMON_HEADERS,
	    custom: {}
	};
	
	Http.interceptor = {before: before, method: method, jsonp: jsonp, json: json, form: form, header: header, cors: cors};
	Http.interceptors = ['before', 'method', 'jsonp', 'json', 'form', 'header', 'cors'];
	
	['get', 'delete', 'head', 'jsonp'].forEach(function (method$$1) {
	
	    Http[method$$1] = function (url, options$$1) {
	        return this(assign(options$$1 || {}, {url: url, method: method$$1}));
	    };
	
	});
	
	['post', 'put', 'patch'].forEach(function (method$$1) {
	
	    Http[method$$1] = function (url, body, options$$1) {
	        return this(assign(options$$1 || {}, {url: url, method: method$$1, body: body}));
	    };
	
	});
	
	/**
	 * Service for interacting with RESTful services.
	 */
	
	function Resource(url, params, actions, options$$1) {
	
	    var self = this || {}, resource = {};
	
	    actions = assign({},
	        Resource.actions,
	        actions
	    );
	
	    each(actions, function (action, name) {
	
	        action = merge({url: url, params: assign({}, params)}, options$$1, action);
	
	        resource[name] = function () {
	            return (self.$http || Http)(opts(action, arguments));
	        };
	    });
	
	    return resource;
	}
	
	function opts(action, args) {
	
	    var options$$1 = assign({}, action), params = {}, body;
	
	    switch (args.length) {
	
	        case 2:
	
	            params = args[0];
	            body = args[1];
	
	            break;
	
	        case 1:
	
	            if (/^(POST|PUT|PATCH)$/i.test(options$$1.method)) {
	                body = args[0];
	            } else {
	                params = args[0];
	            }
	
	            break;
	
	        case 0:
	
	            break;
	
	        default:
	
	            throw 'Expected up to 2 arguments [params, body], got ' + args.length + ' arguments';
	    }
	
	    options$$1.body = body;
	    options$$1.params = assign({}, options$$1.params, params);
	
	    return options$$1;
	}
	
	Resource.actions = {
	
	    get: {method: 'GET'},
	    save: {method: 'POST'},
	    query: {method: 'GET'},
	    update: {method: 'PUT'},
	    remove: {method: 'DELETE'},
	    delete: {method: 'DELETE'}
	
	};
	
	/**
	 * Install plugin.
	 */
	
	function plugin(Vue) {
	
	    if (plugin.installed) {
	        return;
	    }
	
	    Util(Vue);
	
	    Vue.url = Url;
	    Vue.http = Http;
	    Vue.resource = Resource;
	    Vue.Promise = PromiseObj;
	
	    Object.defineProperties(Vue.prototype, {
	
	        $url: {
	            get: function get() {
	                return options(Vue.url, this, this.$options.url);
	            }
	        },
	
	        $http: {
	            get: function get() {
	                return options(Vue.http, this, this.$options.http);
	            }
	        },
	
	        $resource: {
	            get: function get() {
	                return Vue.resource.bind(this);
	            }
	        },
	
	        $promise: {
	            get: function get() {
	                var this$1 = this;
	
	                return function (executor) { return new Vue.Promise(executor, this$1); };
	            }
	        }
	
	    });
	}
	
	if (typeof window !== 'undefined' && window.Vue) {
	    window.Vue.use(plugin);
	}
	
	module.exports = plugin;


/***/ }),
/* 93 */
/***/ (function(module, exports) {

	/* (ignored) */

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var USERS = exports.USERS = {
	  USER: ("http://localhost:8081") + '/api/v1/users'
	};
	
	var POINTS = exports.POINTS = {
	  POINTS: ("http://localhost:8081") + '/api/v1/points',
	  ALL: ("http://localhost:8081") + '/api/v1/points/all',
	  RND: ("http://localhost:8081") + '/api/v1/points/rnd',
	  NEAR: ("http://localhost:8081") + '/api/v1/points/near',
	  STATE: ("http://localhost:8081") + '/api/v1/points/state',
	  FILTER: ("http://localhost:8081") + '/api/v1/points/filter'
	};
	
	var GROUPS = {};
	
	var env_const = { //{{{
	  STATUS_OK: 200,
	  CONFIG_GET: {
	    method: "GET",
	    headers: {
	      'Content-Type': 'application/json'
	    },
	    credentials: "include"
	  }
	}; //}}}

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _mutations;
	
	var _api = __webpack_require__(96);
	
	var _types = __webpack_require__(51);
	
	var mutationsTypes = _interopRequireWildcard(_types);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	// TODO сделать экшен константы
	// import * as actionTypes from '../../constants/types.actions'
	
	
	var defaultCurrentEvent = { id: null, name: '', description: '' };
	var state = {
	  events: [],
	  currentEvent: defaultCurrentEvent,
	  currentEventErrors: {},
	  loading: false
	};
	
	// getters
	// const getters = {
	//   checkoutStatus: state => state.checkoutStatus
	// }
	
	// actions
	var actions = {
	  getEvents: function getEvents(_ref) {
	    var commit = _ref.commit;
	
	    commit(mutationsTypes.GET_EVENTS_REQUEST);
	    _api.eventsResource.query().then(function (response) {
	      commit(mutationsTypes.GET_EVENTS_SUCCESS, response.body);
	    });
	  },
	  getEvent: function getEvent(_ref2, id) {
	    var commit = _ref2.commit;
	
	    commit(mutationsTypes.GET_EVENT_REQUEST);
	    _api.eventsResource.get({ id: id }).then(function (response) {
	      commit(mutationsTypes.GET_EVENT_SUCCESS, response.body);
	    });
	  },
	  createEvent: function createEvent(_ref3, event) {
	    var commit = _ref3.commit;
	
	    commit(mutationsTypes.CREATE_EVENT_REQUEST);
	    _api.eventsResource.save({ id: event.id }, { event: event }).then(function (response) {
	      commit(mutationsTypes.CREATE_EVENT_SUCCESS, response);
	      // console.log('post', response)
	      window.router.push('/events/' + response.body.id);
	    }, function (error) {
	      commit(mutationsTypes.CREATE_EVENT_FAILURE, error);
	    });
	  },
	  updateEvent: function updateEvent(_ref4, event) {
	    var commit = _ref4.commit;
	
	    commit(mutationsTypes.UPDATE_EVENT_REQUEST);
	    _api.eventsResource.update({ id: event.id }, { event: event }).then(function (response) {
	      commit(mutationsTypes.UPDATE_EVENT_SUCCESS, response);
	      window.router.push('/events/' + response.body.id);
	    }, function (error) {
	      commit(mutationsTypes.UPDATE_EVENT_FAILURE, error);
	    });
	  }
	};
	
	function clearCurrentEventErrors(state) {
	  state.currentEventErrors = {};
	}
	
	var mutations = (_mutations = {}, _defineProperty(_mutations, mutationsTypes.CHANGE_CURRENT_EVENT, function (state, event) {
	  state.currentEvent = event;
	}), _defineProperty(_mutations, mutationsTypes.CLEAR_CURRENT_EVENT_ERRORS, function (state) {
	  clearCurrentEventErrors(state);
	}), _defineProperty(_mutations, mutationsTypes.GET_EVENTS_REQUEST, function (state) {
	  state.loading = true;
	  state.events = {};
	}), _defineProperty(_mutations, mutationsTypes.GET_EVENTS_SUCCESS, function (state, events) {
	  state.loading = false;
	  state.events = events;
	}), _defineProperty(_mutations, mutationsTypes.GET_EVENT_REQUEST, function (state) {
	  state.loading = true;
	  state.currentEvent = defaultCurrentEvent;
	}), _defineProperty(_mutations, mutationsTypes.GET_EVENT_SUCCESS, function (state, event) {
	  state.loading = false;
	  state.currentEvent = event;
	}), _defineProperty(_mutations, mutationsTypes.CREATE_EVENT_REQUEST, function (state) {
	  state.loading = true;
	  clearCurrentEventErrors(state);
	}), _defineProperty(_mutations, mutationsTypes.CREATE_EVENT_SUCCESS, function (state, event) {
	  state.loading = false;
	}), _defineProperty(_mutations, mutationsTypes.CREATE_EVENT_FAILURE, function (state, errors) {
	  state.loading = false;
	  state.currentEventErrors = errors.body || {};
	}), _defineProperty(_mutations, mutationsTypes.UPDATE_EVENT_REQUEST, function (state) {
	  state.loading = true;
	  clearCurrentEventErrors(state);
	}), _defineProperty(_mutations, mutationsTypes.UPDATE_EVENT_SUCCESS, function (state, event) {
	  state.loading = false;
	}), _defineProperty(_mutations, mutationsTypes.UPDATE_EVENT_FAILURE, function (state, errors) {
	  state.loading = false;
	  state.currentEventErrors = errors.body || {};
	}), _mutations);
	
	exports.default = {
	  namespaced: true,
	  state: state,
	  // getters,
	  actions: actions,
	  mutations: mutations
	};

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.eventsResource = undefined;
	
	var _vue = __webpack_require__(1);
	
	var _vue2 = _interopRequireDefault(_vue);
	
	var _vueResource = __webpack_require__(92);
	
	var _vueResource2 = _interopRequireDefault(_vueResource);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_vue2.default.use(_vueResource2.default);
	
	var eventsResource = _vue2.default.resource('http://localhost:3000/api/v1/events/{id}');
	exports.eventsResource = eventsResource;

/***/ })
/******/ ]);
//# sourceMappingURL=build.map