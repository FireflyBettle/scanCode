(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],[
/* 0 */,
/* 1 */
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createPlugin = createPlugin;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 3);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 4));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var realAtob;

var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;

if (typeof atob !== 'function') {
  realAtob = function realAtob(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, '');
    if (!b64re.test(str)) {throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");}

    // Adding the padding if missing, for semplicity
    str += '=='.slice(2 - (str.length & 3));
    var bitmap;var result = '';var r1;var r2;var i = 0;
    for (; i < str.length;) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 |
      (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));

      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) :
      r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) :
      String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  // 注意atob只能在全局对象上调用，例如：`const Base64 = {atob};Base64.atob('xxxx')`是错误的用法
  realAtob = atob;
}

function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0 };

  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}

function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {var _getCurrentUserInfo =


    getCurrentUserInfo(),role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {var _getCurrentUserInfo2 =


    getCurrentUserInfo(),permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {var _getCurrentUserInfo3 =


    getCurrentUserInfo(),tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

function sortObject(obj) {
  var sortObj = {};
  if (isPlainObject(obj)) {
    Object.keys(obj).sort().forEach(function (key) {
      sortObj[key] = obj[key];
    });
  }
  return !Object.keys(sortObj) ? obj : sortObj;
}

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return new Promise(function (resolve, reject) {
      res.then(function (res) {
        if (res[0]) {
          reject(res[0]);
        } else {
          resolve(res[1]);
        }
      });
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendHostEvent|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getLocale|setLocale|invokePushCallback|getWindowInfo|getDeviceInfo|getAppBaseInfo|getSystemSetting|getAppAuthorizeSetting/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection', 'createPushMessage'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

var LOCALE_ZH_HANS = 'zh-Hans';
var LOCALE_ZH_HANT = 'zh-Hant';
var LOCALE_EN = 'en';
var LOCALE_FR = 'fr';
var LOCALE_ES = 'es';

var messages = {};

var locale;

{
  locale = normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN;
}

function initI18nMessages() {
  if (!isEnableLocale()) {
    return;
  }
  var localeKeys = Object.keys(__uniConfig.locales);
  if (localeKeys.length) {
    localeKeys.forEach(function (locale) {
      var curMessages = messages[locale];
      var userMessages = __uniConfig.locales[locale];
      if (curMessages) {
        Object.assign(curMessages, userMessages);
      } else {
        messages[locale] = userMessages;
      }
    });
  }
}

initI18nMessages();

var i18n = (0, _uniI18n.initVueI18n)(
locale,
{});

var t = i18n.t;
var i18nMixin = i18n.mixin = {
  beforeCreate: function beforeCreate() {var _this = this;
    var unwatch = i18n.i18n.watchLocale(function () {
      _this.$forceUpdate();
    });
    this.$once('hook:beforeDestroy', function () {
      unwatch();
    });
  },
  methods: {
    $$t: function $$t(key, values) {
      return t(key, values);
    } } };


var setLocale = i18n.setLocale;
var getLocale = i18n.getLocale;

function initAppLocale(Vue, appVm, locale) {
  var state = Vue.observable({
    locale: locale || i18n.getLocale() });

  var localeWatchers = [];
  appVm.$watchLocale = function (fn) {
    localeWatchers.push(fn);
  };
  Object.defineProperty(appVm, '$locale', {
    get: function get() {
      return state.locale;
    },
    set: function set(v) {
      state.locale = v;
      localeWatchers.forEach(function (watch) {return watch(v);});
    } });

}

function isEnableLocale() {
  return typeof __uniConfig !== 'undefined' && __uniConfig.locales && !!Object.keys(__uniConfig.locales).length;
}

function include(str, parts) {
  return !!parts.find(function (part) {return str.indexOf(part) !== -1;});
}

function startsWith(str, parts) {
  return parts.find(function (part) {return str.indexOf(part) === 0;});
}

function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale === 'chinese') {
    // 支付宝
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}
// export function initI18n() {
//   const localeKeys = Object.keys(__uniConfig.locales || {})
//   if (localeKeys.length) {
//     localeKeys.forEach((locale) =>
//       i18n.add(locale, __uniConfig.locales[locale])
//     )
//   }
// }

function getLocale$1() {
  // 优先使用 $locale
  var app = getApp({
    allowDefault: true });

  if (app && app.$vm) {
    return app.$vm.$locale;
  }
  return normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN;
}

function setLocale$1(locale) {
  var app = getApp();
  if (!app) {
    return false;
  }
  var oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach(function (fn) {return fn({
        locale: locale });});

    return true;
  }
  return false;
}

var onLocaleChangeCallbacks = [];
function onLocaleChange(fn) {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
}

if (typeof global !== 'undefined') {
  global.getLocale = getLocale$1;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  getLocale: getLocale$1,
  setLocale: setLocale$1,
  onLocaleChange: onLocaleChange,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function useDeviceId(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.screenHeight - safeArea.bottom };

  }
}

function populateParameters(result) {var _result$brand =





  result.brand,brand = _result$brand === void 0 ? '' : _result$brand,_result$model = result.model,model = _result$model === void 0 ? '' : _result$model,_result$system = result.system,system = _result$system === void 0 ? '' : _result$system,_result$language = result.language,language = _result$language === void 0 ? '' : _result$language,theme = result.theme,version = result.version,platform = result.platform,fontSizeSetting = result.fontSizeSetting,SDKVersion = result.SDKVersion,pixelRatio = result.pixelRatio,deviceOrientation = result.deviceOrientation;
  // const isQuickApp = "mp-weixin".indexOf('quickapp-webview') !== -1

  // osName osVersion
  var osName = '';
  var osVersion = '';
  {
    osName = system.split(' ')[0] || '';
    osVersion = system.split(' ')[1] || '';
  }
  var hostVersion = version;

  // deviceType
  var deviceType = getGetDeviceType(result, model);

  // deviceModel
  var deviceBrand = getDeviceBrand(brand);

  // hostName
  var _hostName = getHostName(result);

  // deviceOrientation
  var _deviceOrientation = deviceOrientation; // 仅 微信 百度 支持

  // devicePixelRatio
  var _devicePixelRatio = pixelRatio;

  // SDKVersion
  var _SDKVersion = SDKVersion;

  // hostLanguage
  var hostLanguage = language.replace(/_/g, '-');

  // wx.getAccountInfoSync

  var parameters = {
    appId: "",
    appName: "scanCode",
    appVersion: "1.0.0",
    appVersionCode: "100",
    appLanguage: getAppLanguage(hostLanguage),
    uniCompileVersion: "3.5.3",
    uniRuntimeVersion: "3.5.3",
    uniPlatform: undefined || "mp-weixin",
    deviceBrand: deviceBrand,
    deviceModel: model,
    deviceType: deviceType,
    devicePixelRatio: _devicePixelRatio,
    deviceOrientation: _deviceOrientation,
    osName: osName.toLocaleLowerCase(),
    osVersion: osVersion,
    hostTheme: theme,
    hostVersion: hostVersion,
    hostLanguage: hostLanguage,
    hostName: _hostName,
    hostSDKVersion: _SDKVersion,
    hostFontSizeSetting: fontSizeSetting,
    windowTop: 0,
    windowBottom: 0,
    // TODO
    osLanguage: undefined,
    osTheme: undefined,
    ua: undefined,
    hostPackageName: undefined,
    browserName: undefined,
    browserVersion: undefined };


  Object.assign(result, parameters);
}

function getGetDeviceType(result, model) {
  var deviceType = result.deviceType || 'phone';
  {
    var deviceTypeMaps = {
      ipad: 'pad',
      windows: 'pc',
      mac: 'pc' };

    var deviceTypeMapsKeys = Object.keys(deviceTypeMaps);
    var _model = model.toLocaleLowerCase();
    for (var index = 0; index < deviceTypeMapsKeys.length; index++) {
      var _m = deviceTypeMapsKeys[index];
      if (_model.indexOf(_m) !== -1) {
        deviceType = deviceTypeMaps[_m];
        break;
      }
    }
  }
  return deviceType;
}

function getDeviceBrand(brand) {
  var deviceBrand = brand;
  if (deviceBrand) {
    deviceBrand = brand.toLocaleLowerCase();
  }
  return deviceBrand;
}

function getAppLanguage(defaultLanguage) {
  return getLocale$1 ?
  getLocale$1() :
  defaultLanguage;
}

function getHostName(result) {
  var _platform = 'WeChat';
  var _hostName = result.hostName || _platform; // mp-jd
  {
    if (result.environment) {
      _hostName = result.environment;
    } else if (result.host && result.host.env) {
      _hostName = result.host.env;
    }
  }

  return _hostName;
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    useDeviceId(result);
    addSafeAreaInsets(result);
    populateParameters(result);
  } };


var showActionSheet = {
  args: function args(fromArgs) {
    if (typeof fromArgs === 'object') {
      fromArgs.alertText = fromArgs.title;
    }
  } };


var getAppBaseInfo = {
  returnValue: function returnValue(result) {var _result =
    result,version = _result.version,language = _result.language,SDKVersion = _result.SDKVersion,theme = _result.theme;

    var _hostName = getHostName(result);

    var hostLanguage = language.replace('_', '-');

    result = sortObject(Object.assign(result, {
      appId: "",
      appName: "scanCode",
      appVersion: "1.0.0",
      appVersionCode: "100",
      appLanguage: getAppLanguage(hostLanguage),
      hostVersion: version,
      hostLanguage: hostLanguage,
      hostName: _hostName,
      hostSDKVersion: SDKVersion,
      hostTheme: theme }));

  } };


var getDeviceInfo = {
  returnValue: function returnValue(result) {var _result2 =
    result,brand = _result2.brand,model = _result2.model;
    var deviceType = getGetDeviceType(result, model);
    var deviceBrand = getDeviceBrand(brand);
    useDeviceId(result);

    result = sortObject(Object.assign(result, {
      deviceType: deviceType,
      deviceBrand: deviceBrand,
      deviceModel: model }));

  } };


var getWindowInfo = {
  returnValue: function returnValue(result) {
    addSafeAreaInsets(result);

    result = sortObject(Object.assign(result, {
      windowTop: 0,
      windowBottom: 0 }));

  } };


var getAppAuthorizeSetting = {
  returnValue: function returnValue(result) {var
    locationReducedAccuracy = result.locationReducedAccuracy;

    result.locationAccuracy = 'unsupported';
    if (locationReducedAccuracy === true) {
      result.locationAccuracy = 'reduced';
    } else if (locationReducedAccuracy === false) {
      result.locationAccuracy = 'full';
    }
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo,
  showActionSheet: showActionSheet,
  getAppBaseInfo: getAppBaseInfo,
  getDeviceInfo: getDeviceInfo,
  getWindowInfo: getWindowInfo,
  getAppAuthorizeSetting: getAppAuthorizeSetting };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


/**
                    * 框架内 try-catch
                    */
/**
                        * 开发者 try-catch
                        */
function tryCatch(fn) {
  return function () {
    try {
      return fn.apply(fn, arguments);
    } catch (e) {
      // TODO
      console.error(e);
    }
  };
}

function getApiCallbacks(params) {
  var apiCallbacks = {};
  for (var name in params) {
    var param = params[name];
    if (isFn(param)) {
      apiCallbacks[name] = tryCatch(param);
      delete params[name];
    }
  }
  return apiCallbacks;
}

var cid;
var cidErrMsg;
var enabled;

function normalizePushMessage(message) {
  try {
    return JSON.parse(message);
  } catch (e) {}
  return message;
}

function invokePushCallback(
args)
{
  if (args.type === 'enabled') {
    enabled = true;
  } else if (args.type === 'clientId') {
    cid = args.cid;
    cidErrMsg = args.errMsg;
    invokeGetPushCidCallbacks(cid, args.errMsg);
  } else if (args.type === 'pushMsg') {
    var message = {
      type: 'receive',
      data: normalizePushMessage(args.message) };

    for (var i = 0; i < onPushMessageCallbacks.length; i++) {
      var callback = onPushMessageCallbacks[i];
      callback(message);
      // 该消息已被阻止
      if (message.stopped) {
        break;
      }
    }
  } else if (args.type === 'click') {
    onPushMessageCallbacks.forEach(function (callback) {
      callback({
        type: 'click',
        data: normalizePushMessage(args.message) });

    });
  }
}

var getPushCidCallbacks = [];

function invokeGetPushCidCallbacks(cid, errMsg) {
  getPushCidCallbacks.forEach(function (callback) {
    callback(cid, errMsg);
  });
  getPushCidCallbacks.length = 0;
}

function getPushClientId(args) {
  if (!isPlainObject(args)) {
    args = {};
  }var _getApiCallbacks =




  getApiCallbacks(args),success = _getApiCallbacks.success,fail = _getApiCallbacks.fail,complete = _getApiCallbacks.complete;
  var hasSuccess = isFn(success);
  var hasFail = isFn(fail);
  var hasComplete = isFn(complete);
  Promise.resolve().then(function () {
    if (typeof enabled === 'undefined') {
      enabled = false;
      cid = '';
      cidErrMsg = 'unipush is not enabled';
    }
    getPushCidCallbacks.push(function (cid, errMsg) {
      var res;
      if (cid) {
        res = {
          errMsg: 'getPushClientId:ok',
          cid: cid };

        hasSuccess && success(res);
      } else {
        res = {
          errMsg: 'getPushClientId:fail' + (errMsg ? ' ' + errMsg : '') };

        hasFail && fail(res);
      }
      hasComplete && complete(res);
    });
    if (typeof cid !== 'undefined') {
      invokeGetPushCidCallbacks(cid, cidErrMsg);
    }
  });
}

var onPushMessageCallbacks = [];
// 不使用 defineOnApi 实现，是因为 defineOnApi 依赖 UniServiceJSBridge ，该对象目前在小程序上未提供，故简单实现
var onPushMessage = function onPushMessage(fn) {
  if (onPushMessageCallbacks.indexOf(fn) === -1) {
    onPushMessageCallbacks.push(fn);
  }
};

var offPushMessage = function offPushMessage(fn) {
  if (!fn) {
    onPushMessageCallbacks.length = 0;
  } else {
    var index = onPushMessageCallbacks.indexOf(fn);
    if (index > -1) {
      onPushMessageCallbacks.splice(index, 1);
    }
  }
};

var api = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getPushClientId: getPushClientId,
  onPushMessage: onPushMessage,
  offPushMessage: offPushMessage,
  invokePushCallback: invokePushCallback });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  var oldTriggerEvent = mpInstance.triggerEvent;
  var newTriggerEvent = function newTriggerEvent(event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
  try {
    // 京东小程序 triggerEvent 为只读
    mpInstance.triggerEvent = newTriggerEvent;
  } catch (error) {
    mpInstance._triggerEvent = newTriggerEvent;
  }
}

function initHook(name, options, isComponent) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"scanCode","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';var options = arguments.length > 3 ? arguments[3] : undefined;
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    {
      if (options.virtualHost) {
        properties.virtualHostStyle = {
          type: null,
          value: '' };

        properties.virtualHostClass = {
          type: null,
          value: '' };

      }
    }
    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this2 = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this2.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this2.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            var _type = _this2.$vm.mpType === 'page' ? 'Page' : 'Component';
            var path = _this2.route || _this2.is;
            throw new Error("".concat(_type, " \"").concat(path, "\" does not have a method \"").concat(methodName, "\""));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this2.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function initScopedSlotsParams() {
  var center = {};
  var parents = {};

  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
    return has;
  };

  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
  };

  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      var object = center[vueId] = center[vueId] || {};
      object[name] = value;
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    }
  };

  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    } });

}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initAppLocale(_vue.default, vm, normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN);

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file, options),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  vm.$scope = app;
  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {args[_key7] = arguments[_key7];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {args[_key8] = arguments[_key8];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),
/* 2 */
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 3 */
/*!*************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-i18n/dist/uni-i18n.es.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, global) {Object.defineProperty(exports, "__esModule", { value: true });exports.compileI18nJsonStr = compileI18nJsonStr;exports.hasI18nJson = hasI18nJson;exports.initVueI18n = initVueI18n;exports.isI18nStr = isI18nStr;exports.normalizeLocale = normalizeLocale;exports.parseI18nJson = parseI18nJson;exports.resolveLocale = resolveLocale;exports.isString = exports.LOCALE_ZH_HANT = exports.LOCALE_ZH_HANS = exports.LOCALE_FR = exports.LOCALE_ES = exports.LOCALE_EN = exports.I18n = exports.Formatter = void 0;function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var isArray = Array.isArray;
var isObject = function isObject(val) {return val !== null && typeof val === 'object';};
var defaultDelimiters = ['{', '}'];var
BaseFormatter = /*#__PURE__*/function () {
  function BaseFormatter() {_classCallCheck(this, BaseFormatter);
    this._caches = Object.create(null);
  }_createClass(BaseFormatter, [{ key: "interpolate", value: function interpolate(
    message, values) {var delimiters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultDelimiters;
      if (!values) {
        return [message];
      }
      var tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    } }]);return BaseFormatter;}();exports.Formatter = BaseFormatter;

var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format, _ref) {var _ref2 = _slicedToArray(_ref, 2),startDelimiter = _ref2[0],endDelimiter = _ref2[1];
  var tokens = [];
  var position = 0;
  var text = '';
  while (position < format.length) {
    var char = format[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({ type: 'text', value: text });
      }
      text = '';
      var sub = '';
      char = format[position++];
      while (char !== undefined && char !== endDelimiter) {
        sub += char;
        char = format[position++];
      }
      var isClosed = char === endDelimiter;
      var type = RE_TOKEN_LIST_VALUE.test(sub) ?
      'list' :
      isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ?
      'named' :
      'unknown';
      tokens.push({ value: sub, type: type });
    }
    //  else if (char === '%') {
    //   // when found rails i18n syntax, skip text capture
    //   if (format[position] !== '{') {
    //     text += char
    //   }
    // }
    else {
        text += char;
      }
  }
  text && tokens.push({ type: 'text', value: text });
  return tokens;
}
function compile(tokens, values) {
  var compiled = [];
  var index = 0;
  var mode = isArray(values) ?
  'list' :
  isObject(values) ?
  'named' :
  'unknown';
  if (mode === 'unknown') {
    return compiled;
  }
  while (index < tokens.length) {
    var token = tokens[index];
    switch (token.type) {
      case 'text':
        compiled.push(token.value);
        break;
      case 'list':
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case 'named':
        if (mode === 'named') {
          compiled.push(values[token.value]);
        } else
        {
          if (true) {
            console.warn("Type of token '".concat(token.type, "' and format of value '").concat(mode, "' don't match!"));
          }
        }
        break;
      case 'unknown':
        if (true) {
          console.warn("Detect 'unknown' type of token!");
        }
        break;}

    index++;
  }
  return compiled;
}

var LOCALE_ZH_HANS = 'zh-Hans';exports.LOCALE_ZH_HANS = LOCALE_ZH_HANS;
var LOCALE_ZH_HANT = 'zh-Hant';exports.LOCALE_ZH_HANT = LOCALE_ZH_HANT;
var LOCALE_EN = 'en';exports.LOCALE_EN = LOCALE_EN;
var LOCALE_FR = 'fr';exports.LOCALE_FR = LOCALE_FR;
var LOCALE_ES = 'es';exports.LOCALE_ES = LOCALE_ES;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = function hasOwn(val, key) {return hasOwnProperty.call(val, key);};
var defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find(function (part) {return str.indexOf(part) !== -1;});
}
function startsWith(str, parts) {
  return parts.find(function (part) {return str.indexOf(part) === 0;});
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}var
I18n = /*#__PURE__*/function () {
  function I18n(_ref3) {var locale = _ref3.locale,fallbackLocale = _ref3.fallbackLocale,messages = _ref3.messages,watcher = _ref3.watcher,formater = _ref3.formater;_classCallCheck(this, I18n);
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages || {};
    this.setLocale(locale || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }_createClass(I18n, [{ key: "setLocale", value: function setLocale(
    locale) {var _this = this;
      var oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        // 可能初始化时不存在
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      // 仅发生变化时，通知
      if (oldLocale !== this.locale) {
        this.watchers.forEach(function (watcher) {
          watcher(_this.locale, oldLocale);
        });
      }
    } }, { key: "getLocale", value: function getLocale()
    {
      return this.locale;
    } }, { key: "watchLocale", value: function watchLocale(
    fn) {var _this2 = this;
      var index = this.watchers.push(fn) - 1;
      return function () {
        _this2.watchers.splice(index, 1);
      };
    } }, { key: "add", value: function add(
    locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else
        {
          Object.keys(message).forEach(function (key) {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else
      {
        this.messages[locale] = message;
      }
    } }, { key: "f", value: function f(
    message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join('');
    } }, { key: "t", value: function t(
    key, locale, values) {
      var message = this.message;
      if (typeof locale === 'string') {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else
      {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn("Cannot translate the value of keypath ".concat(key, ". Use the value of keypath as default."));
        return key;
      }
      return this.formater.interpolate(message[key], values).join('');
    } }]);return I18n;}();exports.I18n = I18n;


function watchAppLocale(appVm, i18n) {
  // 需要保证 watch 的触发在组件渲染之前
  if (appVm.$watchLocale) {
    // vue2
    appVm.$watchLocale(function (newLocale) {
      i18n.setLocale(newLocale);
    });
  } else
  {
    appVm.$watch(function () {return appVm.$locale;}, function (newLocale) {
      i18n.setLocale(newLocale);
    });
  }
}
function getDefaultLocale() {
  if (typeof uni !== 'undefined' && uni.getLocale) {
    return uni.getLocale();
  }
  // 小程序平台，uni 和 uni-i18n 互相引用，导致访问不到 uni，故在 global 上挂了 getLocale
  if (typeof global !== 'undefined' && global.getLocale) {
    return global.getLocale();
  }
  return LOCALE_EN;
}
function initVueI18n(locale) {var messages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var fallbackLocale = arguments.length > 2 ? arguments[2] : undefined;var watcher = arguments.length > 3 ? arguments[3] : undefined;
  // 兼容旧版本入参
  if (typeof locale !== 'string') {var _ref4 =
    [
    messages,
    locale];locale = _ref4[0];messages = _ref4[1];

  }
  if (typeof locale !== 'string') {
    // 因为小程序平台，uni-i18n 和 uni 互相引用，导致此时访问 uni 时，为 undefined
    locale = getDefaultLocale();
  }
  if (typeof fallbackLocale !== 'string') {
    fallbackLocale =
    typeof __uniConfig !== 'undefined' && __uniConfig.fallbackLocale ||
    LOCALE_EN;
  }
  var i18n = new I18n({
    locale: locale,
    fallbackLocale: fallbackLocale,
    messages: messages,
    watcher: watcher });

  var _t = function t(key, values) {
    if (typeof getApp !== 'function') {
      // app view
      /* eslint-disable no-func-assign */
      _t = function t(key, values) {
        return i18n.t(key, values);
      };
    } else
    {
      var isWatchedAppLocale = false;
      _t = function t(key, values) {
        var appVm = getApp().$vm;
        // 可能$vm还不存在，比如在支付宝小程序中，组件定义较早，在props的default里使用了t()函数（如uni-goods-nav），此时app还未初始化
        // options: {
        // 	type: Array,
        // 	default () {
        // 		return [{
        // 			icon: 'shop',
        // 			text: t("uni-goods-nav.options.shop"),
        // 		}, {
        // 			icon: 'cart',
        // 			text: t("uni-goods-nav.options.cart")
        // 		}]
        // 	}
        // },
        if (appVm) {
          // 触发响应式
          appVm.$locale;
          if (!isWatchedAppLocale) {
            isWatchedAppLocale = true;
            watchAppLocale(appVm, i18n);
          }
        }
        return i18n.t(key, values);
      };
    }
    return _t(key, values);
  };
  return {
    i18n: i18n,
    f: function f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t: function t(key, values) {
      return _t(key, values);
    },
    add: function add(locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return i18n.add(locale, message, override);
    },
    watch: function watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale: function getLocale() {
      return i18n.getLocale();
    },
    setLocale: function setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    } };

}

var isString = function isString(val) {return typeof val === 'string';};exports.isString = isString;
var formater;
function hasI18nJson(jsonObj, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  return walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        return true;
      }
    } else
    {
      return hasI18nJson(value, delimiters);
    }
  });
}
function parseI18nJson(jsonObj, values, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        jsonObj[key] = compileStr(value, values, delimiters);
      }
    } else
    {
      parseI18nJson(value, values, delimiters);
    }
  });
  return jsonObj;
}
function compileI18nJsonStr(jsonStr, _ref5) {var locale = _ref5.locale,locales = _ref5.locales,delimiters = _ref5.delimiters;
  if (!isI18nStr(jsonStr, delimiters)) {
    return jsonStr;
  }
  if (!formater) {
    formater = new BaseFormatter();
  }
  var localeValues = [];
  Object.keys(locales).forEach(function (name) {
    if (name !== locale) {
      localeValues.push({
        locale: name,
        values: locales[name] });

    }
  });
  localeValues.unshift({ locale: locale, values: locales[locale] });
  try {
    return JSON.stringify(compileJsonObj(JSON.parse(jsonStr), localeValues, delimiters), null, 2);
  }
  catch (e) {}
  return jsonStr;
}
function isI18nStr(value, delimiters) {
  return value.indexOf(delimiters[0]) > -1;
}
function compileStr(value, values, delimiters) {
  return formater.interpolate(value, values, delimiters).join('');
}
function compileValue(jsonObj, key, localeValues, delimiters) {
  var value = jsonObj[key];
  if (isString(value)) {
    // 存在国际化
    if (isI18nStr(value, delimiters)) {
      jsonObj[key] = compileStr(value, localeValues[0].values, delimiters);
      if (localeValues.length > 1) {
        // 格式化国际化语言
        var valueLocales = jsonObj[key + 'Locales'] = {};
        localeValues.forEach(function (localValue) {
          valueLocales[localValue.locale] = compileStr(value, localValue.values, delimiters);
        });
      }
    }
  } else
  {
    compileJsonObj(value, localeValues, delimiters);
  }
}
function compileJsonObj(jsonObj, localeValues, delimiters) {
  walkJsonObj(jsonObj, function (jsonObj, key) {
    compileValue(jsonObj, key, localeValues, delimiters);
  });
  return jsonObj;
}
function walkJsonObj(jsonObj, walk) {
  if (isArray(jsonObj)) {
    for (var i = 0; i < jsonObj.length; i++) {
      if (walk(jsonObj, i)) {
        return true;
      }
    }
  } else
  if (isObject(jsonObj)) {
    for (var key in jsonObj) {
      if (walk(jsonObj, key)) {
        return true;
      }
    }
  }
  return false;
}

function resolveLocale(locales) {
  return function (locale) {
    if (!locale) {
      return locale;
    }
    locale = normalizeLocale(locale) || locale;
    return resolveLocaleChain(locale).find(function (locale) {return locales.indexOf(locale) > -1;});
  };
}
function resolveLocaleChain(locale) {
  var chain = [];
  var tokens = locale.split('-');
  while (tokens.length) {
    chain.push(tokens.join('-'));
    tokens.pop();
  }
  return chain;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"], __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),
/* 4 */
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2022 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
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
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

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
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
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
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
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
 * Check whether an object has the property.
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
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

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

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
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
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
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
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
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
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

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
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
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

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
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

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
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

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
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
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
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

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
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
        !vm.$options.isReserved && tree.push(vm);
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
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
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
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
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
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
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
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
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
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
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
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
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
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
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
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
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
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
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
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
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
if (true) {
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

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
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
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
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
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
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
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

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
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
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
      } else if (true) {
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
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
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
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
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
  if ( true && warnMissing && !res) {
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
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
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
  if ( true && isObject(def)) {
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
      getInvalidTypeMessage(name, value, expectedTypes),
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
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
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

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
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
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
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
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
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

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
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

var mark;
var measure;

if (true) {
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
      // perf.clearMeasures(name)
    };
  }
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

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
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
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
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

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
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
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
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
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
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
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
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
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
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
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
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

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
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
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
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
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
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

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
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
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
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
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
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
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
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
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
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
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
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
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
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

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
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

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
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
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
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
    if (true) {
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
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

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
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
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
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }
  
  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);
  
  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
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
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
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
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
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
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
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
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
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

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
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
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
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
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
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
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
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
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
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
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

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
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu' || vm.mpHost === 'mp-kuaishou' || vm.mpHost === 'mp-xhs'){//百度、快手、小红书 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' && 
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return  
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
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
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
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

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
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
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
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
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props  
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');      

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

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
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
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
    installedPlugins.push(plugin);
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
    if ( true && name) {
      validateComponentName(name);
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
        if ( true && type === 'component') {
          validateComponentName(id);
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



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
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
  if (true) {
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

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

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

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    if (currentValue !== pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"NODE_ENV":"development","VUE_APP_NAME":"scanCode","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"scanCode","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"NODE_ENV":"development","VUE_APP_NAME":"scanCode","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"NODE_ENV":"development","VUE_APP_NAME":"scanCode","VUE_APP_PLATFORM":"mp-weixin","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
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
  
  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
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
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

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

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      (this.$scope['_triggerEvent'] || this.$scope['triggerEvent']).call(this.$scope, event, {
        __args__: toArray(arguments, 1)
      });
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value);
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating 
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 2)))

/***/ }),
/* 5 */
/*!**************************************************************************!*\
  !*** /Users/chenyourong/Documents/person/system/小程序/scanCode/pages.json ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 12 */
/*!****************************************************************************************!*\
  !*** /Users/chenyourong/Documents/person/system/小程序/scanCode/uni.promisify.adaptor.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(uni) {uni.addInterceptor({
  returnValue: function returnValue(res) {
    if (!(!!res && (typeof res === "object" || typeof res === "function") && typeof res.then === "function")) {
      return res;
    }
    return new Promise(function (resolve, reject) {
      res.then(function (res) {
        if (!res) return resolve(res);
        return res[0] ? reject(res[0]) : resolve(res[1]);
      });
    });
  } });
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */
/*!**************************************************************************!*\
  !*** /Users/chenyourong/Documents/person/system/小程序/scanCode/api/api.js ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.login = login;exports.storeDetail = storeDetail;exports.list = list;exports.coupon = coupon;exports.verify = verify;







var _request = __webpack_require__(/*! ./request.js */ 20);function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;} //request向外暴露的方法

function login(data) {
  //传入对应的配置对象
  return (0, _request.service)({
    url: '/miniprogram/login',
    data: _objectSpread({},
    data)
    //请求接口需要的参数
  });
}
// 门店详情
function storeDetail(data) {
  //传入对应的配置对象
  return (0, _request.service)({
    url: '/miniprogram/store/detail',
    data: _objectSpread({},
    data)
    //请求接口需要的参数
  });
}
//核销记录列表
function list(data) {
  //传入对应的配置对象
  return (0, _request.service)({
    url: '/miniprogram/list',
    data: _objectSpread({},
    data)
    //请求接口需要的参数
  });
}
// 券码详情
function coupon(data) {
  //传入对应的配置对象
  return (0, _request.service)({
    url: '/miniprogram/coupon/detail',
    data: _objectSpread({},
    data)
    //请求接口需要的参数
  });
}
// 券码核销
function verify(data) {
  //传入对应的配置对象
  return (0, _request.service)({
    url: '/miniprogram/coupon/verify',
    data: _objectSpread({},
    data)
    //请求接口需要的参数
  });
}

/***/ }),
/* 20 */
/*!******************************************************************************!*\
  !*** /Users/chenyourong/Documents/person/system/小程序/scanCode/api/request.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.service = service;











var _config = _interopRequireDefault(__webpack_require__(/*! ./config */ 21));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };} /*
                                                                                                                                                         * @Author: chenyourong
                                                                                                                                                         * @Date: 2022-09-26 17:07:46
                                                                                                                                                         * @LastEditors: chenyourong
                                                                                                                                                         * @LastEditTime: 2025-05-30 17:31:41
                                                                                                                                                         * @Description: 
                                                                                                                                                         * @FilePath: /scanCode/api/request.js
                                                                                                                                                         */ // let server_url = '';  //请求根路径（服务器地址）
var token = ''; //token令牌
// process.env.NODE_ENV === 'development' ? 'http://192.168**:6002' : 'http://***/api'; //环境配置
//向外暴露一个方法，传入一个空对象
function service() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};uni.getStorageSync('token') && (token = uni.getStorageSync('token')); //从本地缓存中获取token
  // options.url = options.url ? `${baseUrl}${options.url}` : baseUrl;//前面为你的服务器地址，后面为具体接口地址
  options.url = options.url ? "".concat(_config.default).concat(options.url) : 'https://sweb.jjdzmall.com'; //前面为你的服务器地址，后面为具体接口地址
  // options.url = `https://sweb-sit.jjdzmall.com${options.url}`;//前面为你的服务器地址，后面为具体接口地址
  options.method = options.method || 'POST'; //配置请求头
  options.header = { 'content-type': 'application/json', //默认请求头，可不写
    'x-token': "".concat(token) //Bearer ，你请求数据需要的自定义请求头（令牌）
  };options.timeout = 15000;if (!options.noShowLoading) {uni.showLoading({ title: "加载中",
      mask: true });

  }
  // 创建promise
  return new Promise(function (resolved, rejected) {
    //成功
    options.success = function (res) {
      uni.hideLoading();
      if (res.data.code === 1003) {
        setTimeout(function () {
          uni.reLaunch({
            url: "/pages/index/index" });

        }, 1000);
        return uni.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000 });

      }
      if (res.data.code != 0) return uni.showToast({
        title: res.data.msg,
        icon: 'none',
        duration: 2000 });

      // if (Number(res.data.code) == 0) { //请求成功
      resolved(res.data); //请求成功时返回接口数据
      // } else {
      // 	uni.showToast({
      // 		icon: 'none',
      // 		duration: 3000,
      // 		title: `${res.data.msg}`
      // 	});
      // 	rejected(res.data); //请求失败时返回错误信息
      // }

    };
    //错误
    options.fail = function (err) {
      uni.hideLoading();
      uni.showToast({
        title: '请求超时',
        icon: 'none',
        duration: 2000 });

      rejected(err); //请求失败时返回错误信息
    };
    uni.request(options); //传入配置好的对象

  });
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),
/* 21 */
/*!*****************************************************************************!*\
  !*** /Users/chenyourong/Documents/person/system/小程序/scanCode/api/config.js ***!
  \*****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var baseUrl = "";
if (true) {
  console.log("-------development--------, ", 'development');
  baseUrl = 'http://www.jifeng.online:8872'; // 开发环境
} else {}var _default =

baseUrl;exports.default = _default;

/***/ }),
/* 22 */
/*!****************************************************************************!*\
  !*** /Users/chenyourong/Documents/person/system/小程序/scanCode/utils/md5.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Namespace for hashing and other cryptographic functions
 * Copyright (c) Andrew Valums
 * Licensed under the MIT license, http://valums.com/mit-license/
 */

var V = V || {};
V.Security = V.Security || {};

(function () {
  // for faster access
  var S = V.Security;

  /**
                       * The highest integer value a number can go to without losing precision.
                       */
  S.maxExactInt = Math.pow(2, 53);

  /**
                                    * Converts string from internal UTF-16 to UTF-8
                                    * and saves it using array of numbers (bytes), 0-255 per cell
                                    * @param {String} str
                                    * @return {Array}
                                    */
  S.toUtf8ByteArr = function (str) {
    var arr = [],
    code;

    for (var i = 0; i < str.length; i++) {
      code = str.charCodeAt(i);

      /*
                                      Note that charCodeAt will always return a value that is less than 65,536.
                                      This is because the higher code points are represented by a pair of (lower valued)
                                      "surrogate" pseudo-characters which are used to comprise the real character.
                                      Because of this, in order to examine or reproduce the full character for
                                      individual characters of value 65,536 and above, for such characters,
                                      it is necessary to retrieve not only charCodeAt(0), but also charCodeAt(1). 
                                       */
      if (0xD800 <= code && code <= 0xDBFF) {
        // UTF-16 high surrogate 
        var hi = code,
        low = str.charCodeAt(i + 1);

        code = (hi - 0xD800) * 0x400 + (low - 0xDC00) + 0x10000;

        i++;
      }

      if (code <= 127) {
        arr[arr.length] = code;
      } else if (code <= 2047) {
        arr[arr.length] = (code >>> 6) + 0xC0;
        arr[arr.length] = code & 0x3F | 0x80;
      } else if (code <= 65535) {
        arr[arr.length] = (code >>> 12) + 0xE0;
        arr[arr.length] = code >>> 6 & 0x3F | 0x80;
        arr[arr.length] = code & 0x3F | 0x80;
      } else if (code <= 1114111) {
        arr[arr.length] = (code >>> 18) + 0xF0;
        arr[arr.length] = code >>> 12 & 0x3F | 0x80;
        arr[arr.length] = code >>> 6 & 0x3F | 0x80;
        arr[arr.length] = code & 0x3F | 0x80;
      } else {
        throw 'Unicode standart supports code points up-to U+10FFFF';
      }
    }

    return arr;
  };

  /**
      * Outputs 32 integer bits of a number in hex format.
      * Preserves leading zeros.
      * @param {Number} num
      */
  S.toHex32 = function (num) {
    // if negative
    if (num & 0x80000000) {
      // convert to positive number
      num = num & ~0x80000000;
      num += Math.pow(2, 31);
    }

    var str = num.toString(16);

    while (str.length < 8) {
      str = '0' + str;
    }

    return str;
  };

  /**
      * Changes the order of 4 bytes in integer representation of number.
      * From 1234 to 4321. 
      * @param {Number} num Only 32 int bits are used.
      */
  S.reverseBytes = function (num) {
    var res = 0;
    res += num >>> 24 & 0xff;
    res += (num >>> 16 & 0xff) << 8;
    res += (num >>> 8 & 0xff) << 16;
    res += (num & 0xff) << 24;
    return res;
  };

  S.leftRotate = function (x, c) {
    return x << c | x >>> 32 - c;
  };

  /**
      * RSA Data Security, Inc. MD5 Message-Digest Algorithm
      * http://tools.ietf.org/html/rfc1321
      * http://en.wikipedia.org/wiki/MD5
      * @param {String} message
      */
  S.md5 = function (message) {
    // r specifies the per-round shift amounts
    var r = [7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 7, 12, 17, 22, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 5, 9, 14, 20, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 4, 11, 16, 23, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21, 6, 10, 15, 21];

    // Use binary integer part of the sines of integers (Radians) as constants:
    var k = [];
    for (var i = 0; i <= 63; i++) {
      k[i] = Math.abs(Math.sin(i + 1)) * Math.pow(2, 32) << 0;
    }

    var h0 = 0x67452301,
    h1 = 0xEFCDAB89,
    h2 = 0x98BADCFE,
    h3 = 0x10325476,
    bytes,unpadded;

    //Pre-processing: 
    bytes = S.toUtf8ByteArr(message);
    message = null;
    unpadded = bytes.length;

    //append "1" bit to message
    //append "0" bits until message length in bits ≡ 448 (mod 512)  
    bytes.push(0x80);
    var zeroBytes = Math.abs(448 - bytes.length * 8 % 512) / 8;

    while (zeroBytes--) {
      bytes.push(0);
    }

    //append bit length of unpadded message as 64-bit little-endian integer to message    
    bytes.push(unpadded * 8 & 0xff, unpadded * 8 >> 8 & 0xff, unpadded * 8 >> 16 & 0xff, unpadded * 8 >> 24 & 0xff);

    var i = 4;
    while (i--) {
      bytes.push(0);
    }

    var leftRotate = S.leftRotate;

    //Process the message in successive 512-bit chunks:
    var i = 0,
    w = [];
    while (i < bytes.length) {

      //break chunk into sixteen 32-bit words w[i], 0 ≤ i ≤ 15
      for (var j = 0; j <= 15; j++) {
        w[j] = (bytes[i + 4 * j] << 0) + (bytes[i + 4 * j + 1] << 8) + (bytes[i + 4 * j + 2] << 16) + (bytes[i + 4 * j + 3] << 24);
      }

      //Initialize hash value for this chunk:
      var a = h0,
      b = h1,
      c = h2,
      d = h3,
      f,g;

      //Main loop:
      for (var j = 0; j <= 63; j++) {

        if (j <= 15) {
          f = b & c | ~b & d;
          g = j;
        } else if (j <= 31) {
          f = d & b | ~d & c;
          g = (5 * j + 1) % 16;
        } else if (j <= 47) {
          f = b ^ c ^ d;
          g = (3 * j + 5) % 16;
        } else {
          f = c ^ (b | ~d);
          g = 7 * j % 16;
        }

        var temp = d;

        d = c;
        c = b;
        b = b + leftRotate(a + f + k[j] + w[g], r[j]);
        a = temp;
      }

      //Add this chunk's hash to result so far:
      h0 = h0 + a << 0;
      h1 = h1 + b << 0;
      h2 = h2 + c << 0;
      h3 = h3 + d << 0;

      i += 512 / 8;
    }

    // fix when starting with 0     
    var res = out(h0) + out(h1) + out(h2) + out(h3);

    function out(h) {
      return S.toHex32(S.reverseBytes(h));
    }

    return res;
  };
})();


/*
       * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
       * Digest Algorithm, as defined in RFC 1321.
       * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
       * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
       * Distributed under the BSD License
       * See http://pajhome.org.uk/crypt/md5 for more info.
       */

/*
           * Configurable variables. You may need to tweak these to be compatible with
           * the server-side, but the defaults work in most cases.
           */
var hexcase = 0; /* hex output format. 0 - lowercase; 1 - uppercase        */
var b64pad = ""; /* base-64 pad character. "=" for strict RFC compliance   */

/*
                                                                               * These are the functions you'll usually want to call
                                                                               * They take string arguments and return either hex or base-64 encoded strings
                                                                               */

function hex_md5(s) {
  return rstr2hex(rstr_md5(str2rstr_utf8(s)));
}

function b64_md5(s) {
  return rstr2b64(rstr_md5(str2rstr_utf8(s)));
}

function any_md5(s, e) {
  return rstr2any(rstr_md5(str2rstr_utf8(s)), e);
}

function hex_hmac_md5(k, d) {
  return rstr2hex(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d)));
}

function b64_hmac_md5(k, d) {
  return rstr2b64(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d)));
}

function any_hmac_md5(k, d, e) {
  return rstr2any(rstr_hmac_md5(str2rstr_utf8(k), str2rstr_utf8(d)), e);
}

/*
   * Perform a simple self-test to see if the VM is working
   */

function md5_vm_test() {
  return hex_md5("abc").toLowerCase() == "900150983cd24fb0d6963f7d28e17f72";
}

/*
   * Calculate the MD5 of a raw string
   */

function rstr_md5(s) {
  return binl2rstr(binl_md5(rstr2binl(s), s.length * 8));
}

/*
   * Calculate the HMAC-MD5, of a key and some data (raw strings)
   */

function rstr_hmac_md5(key, data) {
  var bkey = rstr2binl(key);
  if (bkey.length > 16) bkey = binl_md5(bkey, key.length * 8);

  var ipad = Array(16),
  opad = Array(16);
  for (var i = 0; i < 16; i++) {
    ipad[i] = bkey[i] ^ 0x36363636;
    opad[i] = bkey[i] ^ 0x5C5C5C5C;
  }

  var hash = binl_md5(ipad.concat(rstr2binl(data)), 512 + data.length * 8);
  return binl2rstr(binl_md5(opad.concat(hash), 512 + 128));
}

/*
   * Convert a raw string to a hex string
   */

function rstr2hex(input) {
  try {
    hexcase;
  } catch (e) {
    hexcase = 0;
  }
  var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
  var output = "";
  var x;
  for (var i = 0; i < input.length; i++) {
    x = input.charCodeAt(i);
    output += hex_tab.charAt(x >>> 4 & 0x0F) + hex_tab.charAt(x & 0x0F);
  }
  return output;
}

/*
   * Convert a raw string to a base-64 string
   */

function rstr2b64(input) {
  try {
    b64pad;
  } catch (e) {
    b64pad = '';
  }
  var tab = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var output = "";
  var len = input.length;
  for (var i = 0; i < len; i += 3) {
    var triplet = input.charCodeAt(i) << 16 | (i + 1 < len ? input.charCodeAt(i + 1) << 8 : 0) | (i + 2 < len ? input.charCodeAt(i + 2) : 0);
    for (var j = 0; j < 4; j++) {
      if (i * 8 + j * 6 > input.length * 8) output += b64pad;else
      output += tab.charAt(triplet >>> 6 * (3 - j) & 0x3F);
    }
  }
  return output;
}

/*
   * Convert a raw string to an arbitrary string encoding
   */

function rstr2any(input, encoding) {
  var divisor = encoding.length;
  var i, j, q, x, quotient;

  /* Convert to an array of 16-bit big-endian values, forming the dividend */
  var dividend = Array(Math.ceil(input.length / 2));
  for (i = 0; i < dividend.length; i++) {
    dividend[i] = input.charCodeAt(i * 2) << 8 | input.charCodeAt(i * 2 + 1);
  }

  /*
     * Repeatedly perform a long division. The binary array forms the dividend,
     * the length of the encoding is the divisor. Once computed, the quotient
     * forms the dividend for the next step. All remainders are stored for later
     * use.
     */
  var full_length = Math.ceil(input.length * 8 / (Math.log(encoding.length) / Math.log(2)));
  var remainders = Array(full_length);
  for (j = 0; j < full_length; j++) {
    quotient = Array();
    x = 0;
    for (i = 0; i < dividend.length; i++) {
      x = (x << 16) + dividend[i];
      q = Math.floor(x / divisor);
      x -= q * divisor;
      if (quotient.length > 0 || q > 0) quotient[quotient.length] = q;
    }
    remainders[j] = x;
    dividend = quotient;
  }

  /* Convert the remainders to the output string */
  var output = "";
  for (i = remainders.length - 1; i >= 0; i--) {
    output += encoding.charAt(remainders[i]);}

  return output;
}

/*
   * Encode a string as utf-8.
   * For efficiency, this assumes the input is valid utf-16.
   */

function str2rstr_utf8(input) {
  return unescape(encodeURI(input));
}

/*
   * Encode a string as utf-16
   */

function str2rstr_utf16le(input) {
  var output = "";
  for (var i = 0; i < input.length; i++) {
    output += String.fromCharCode(input.charCodeAt(i) & 0xFF, input.charCodeAt(i) >>> 8 & 0xFF);}
  return output;
}

function str2rstr_utf16be(input) {
  var output = "";
  for (var i = 0; i < input.length; i++) {
    output += String.fromCharCode(input.charCodeAt(i) >>> 8 & 0xFF, input.charCodeAt(i) & 0xFF);}
  return output;
}

/*
   * Convert a raw string to an array of little-endian words
   * Characters >255 have their high-byte silently ignored.
   */

function rstr2binl(input) {
  var output = Array(input.length >> 2);
  for (var i = 0; i < output.length; i++) {
    output[i] = 0;}
  for (var i = 0; i < input.length * 8; i += 8) {
    output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << i % 32;}
  return output;
}

/*
   * Convert an array of little-endian words to a string
   */

function binl2rstr(input) {
  var output = "";
  for (var i = 0; i < input.length * 32; i += 8) {
    output += String.fromCharCode(input[i >> 5] >>> i % 32 & 0xFF);}
  return output;
}

/*
   * Calculate the MD5 of an array of little-endian words, and a bit length.
   */

function binl_md5(x, len) {/* append padding */
  x[len >> 5] |= 0x80 << len % 32;
  x[(len + 64 >>> 9 << 4) + 14] = len;

  var a = 1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d = 271733878;

  for (var i = 0; i < x.length; i += 16) {
    var olda = a;
    var oldb = b;
    var oldc = c;
    var oldd = d;

    a = md5_ff(a, b, c, d, x[i + 0], 7, -680876936);
    d = md5_ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = md5_ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = md5_ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = md5_ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = md5_ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5_ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = md5_ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = md5_ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = md5_ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = md5_ff(c, d, a, b, x[i + 10], 17, -42063);
    b = md5_ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5_ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = md5_ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5_ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = md5_ff(b, c, d, a, x[i + 15], 22, 1236535329);

    a = md5_gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = md5_gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = md5_gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = md5_gg(b, c, d, a, x[i + 0], 20, -373897302);
    a = md5_gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = md5_gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5_gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = md5_gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = md5_gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = md5_gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = md5_gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = md5_gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5_gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = md5_gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = md5_gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = md5_gg(b, c, d, a, x[i + 12], 20, -1926607734);

    a = md5_hh(a, b, c, d, x[i + 5], 4, -378558);
    d = md5_hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = md5_hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = md5_hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5_hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = md5_hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5_hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = md5_hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5_hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = md5_hh(d, a, b, c, x[i + 0], 11, -358537222);
    c = md5_hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = md5_hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5_hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = md5_hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5_hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = md5_hh(b, c, d, a, x[i + 2], 23, -995338651);

    a = md5_ii(a, b, c, d, x[i + 0], 6, -198630844);
    d = md5_ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5_ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = md5_ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = md5_ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = md5_ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = md5_ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = md5_ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = md5_ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = md5_ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5_ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = md5_ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5_ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = md5_ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5_ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = md5_ii(b, c, d, a, x[i + 9], 21, -343485551);

    a = safe_add(a, olda);
    b = safe_add(b, oldb);
    c = safe_add(c, oldc);
    d = safe_add(d, oldd);
  }
  return Array(a, b, c, d);
}

/*
   * These functions implement the four basic operations the algorithm uses.
   */

function md5_cmn(q, a, b, x, s, t) {
  return safe_add(bit_rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
}

function md5_ff(a, b, c, d, x, s, t) {
  return md5_cmn(b & c | ~b & d, a, b, x, s, t);
}

function md5_gg(a, b, c, d, x, s, t) {
  return md5_cmn(b & d | c & ~d, a, b, x, s, t);
}

function md5_hh(a, b, c, d, x, s, t) {
  return md5_cmn(b ^ c ^ d, a, b, x, s, t);
}

function md5_ii(a, b, c, d, x, s, t) {
  return md5_cmn(c ^ (b | ~d), a, b, x, s, t);
}

/*
   * Add integers, wrapping at 2^32. This uses 16-bit operations internally
   * to work around bugs in some JS interpreters.
   */

function safe_add(x, y) {
  var lsw = (x & 0xFFFF) + (y & 0xFFFF);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 0xFFFF;
}

/*
   * Bitwise rotate a 32-bit number to the left.
   */

function bit_rol(num, cnt) {
  return num << cnt | num >>> 32 - cnt;
}


function md5cycle(x, k) {
  var a = x[0],
  b = x[1],
  c = x[2],
  d = x[3];

  a = ff(a, b, c, d, k[0], 7, -680876936);
  d = ff(d, a, b, c, k[1], 12, -389564586);
  c = ff(c, d, a, b, k[2], 17, 606105819);
  b = ff(b, c, d, a, k[3], 22, -1044525330);
  a = ff(a, b, c, d, k[4], 7, -176418897);
  d = ff(d, a, b, c, k[5], 12, 1200080426);
  c = ff(c, d, a, b, k[6], 17, -1473231341);
  b = ff(b, c, d, a, k[7], 22, -45705983);
  a = ff(a, b, c, d, k[8], 7, 1770035416);
  d = ff(d, a, b, c, k[9], 12, -1958414417);
  c = ff(c, d, a, b, k[10], 17, -42063);
  b = ff(b, c, d, a, k[11], 22, -1990404162);
  a = ff(a, b, c, d, k[12], 7, 1804603682);
  d = ff(d, a, b, c, k[13], 12, -40341101);
  c = ff(c, d, a, b, k[14], 17, -1502002290);
  b = ff(b, c, d, a, k[15], 22, 1236535329);

  a = gg(a, b, c, d, k[1], 5, -165796510);
  d = gg(d, a, b, c, k[6], 9, -1069501632);
  c = gg(c, d, a, b, k[11], 14, 643717713);
  b = gg(b, c, d, a, k[0], 20, -373897302);
  a = gg(a, b, c, d, k[5], 5, -701558691);
  d = gg(d, a, b, c, k[10], 9, 38016083);
  c = gg(c, d, a, b, k[15], 14, -660478335);
  b = gg(b, c, d, a, k[4], 20, -405537848);
  a = gg(a, b, c, d, k[9], 5, 568446438);
  d = gg(d, a, b, c, k[14], 9, -1019803690);
  c = gg(c, d, a, b, k[3], 14, -187363961);
  b = gg(b, c, d, a, k[8], 20, 1163531501);
  a = gg(a, b, c, d, k[13], 5, -1444681467);
  d = gg(d, a, b, c, k[2], 9, -51403784);
  c = gg(c, d, a, b, k[7], 14, 1735328473);
  b = gg(b, c, d, a, k[12], 20, -1926607734);

  a = hh(a, b, c, d, k[5], 4, -378558);
  d = hh(d, a, b, c, k[8], 11, -2022574463);
  c = hh(c, d, a, b, k[11], 16, 1839030562);
  b = hh(b, c, d, a, k[14], 23, -35309556);
  a = hh(a, b, c, d, k[1], 4, -1530992060);
  d = hh(d, a, b, c, k[4], 11, 1272893353);
  c = hh(c, d, a, b, k[7], 16, -155497632);
  b = hh(b, c, d, a, k[10], 23, -1094730640);
  a = hh(a, b, c, d, k[13], 4, 681279174);
  d = hh(d, a, b, c, k[0], 11, -358537222);
  c = hh(c, d, a, b, k[3], 16, -722521979);
  b = hh(b, c, d, a, k[6], 23, 76029189);
  a = hh(a, b, c, d, k[9], 4, -640364487);
  d = hh(d, a, b, c, k[12], 11, -421815835);
  c = hh(c, d, a, b, k[15], 16, 530742520);
  b = hh(b, c, d, a, k[2], 23, -995338651);

  a = ii(a, b, c, d, k[0], 6, -198630844);
  d = ii(d, a, b, c, k[7], 10, 1126891415);
  c = ii(c, d, a, b, k[14], 15, -1416354905);
  b = ii(b, c, d, a, k[5], 21, -57434055);
  a = ii(a, b, c, d, k[12], 6, 1700485571);
  d = ii(d, a, b, c, k[3], 10, -1894986606);
  c = ii(c, d, a, b, k[10], 15, -1051523);
  b = ii(b, c, d, a, k[1], 21, -2054922799);
  a = ii(a, b, c, d, k[8], 6, 1873313359);
  d = ii(d, a, b, c, k[15], 10, -30611744);
  c = ii(c, d, a, b, k[6], 15, -1560198380);
  b = ii(b, c, d, a, k[13], 21, 1309151649);
  a = ii(a, b, c, d, k[4], 6, -145523070);
  d = ii(d, a, b, c, k[11], 10, -1120210379);
  c = ii(c, d, a, b, k[2], 15, 718787259);
  b = ii(b, c, d, a, k[9], 21, -343485551);

  x[0] = add32(a, x[0]);
  x[1] = add32(b, x[1]);
  x[2] = add32(c, x[2]);
  x[3] = add32(d, x[3]);

}

function cmn(q, a, b, x, s, t) {
  a = add32(add32(a, q), add32(x, t));
  return add32(a << s | a >>> 32 - s, b);
}

function ff(a, b, c, d, x, s, t) {
  return cmn(b & c | ~b & d, a, b, x, s, t);
}

function gg(a, b, c, d, x, s, t) {
  return cmn(b & d | c & ~d, a, b, x, s, t);
}

function hh(a, b, c, d, x, s, t) {
  return cmn(b ^ c ^ d, a, b, x, s, t);
}

function ii(a, b, c, d, x, s, t) {
  return cmn(c ^ (b | ~d), a, b, x, s, t);
}

function md51(s) {
  var txt = '';
  var n = s.length,
  state = [1732584193, -271733879, -1732584194, 271733878],
  i;
  for (i = 64; i <= s.length; i += 64) {
    md5cycle(state, md5blk(s.substring(i - 64, i)));
  }
  s = s.substring(i - 64);
  var tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (i = 0; i < s.length; i++) {
    tail[i >> 2] |= s.charCodeAt(i) << (i % 4 << 3);}
  tail[i >> 2] |= 0x80 << (i % 4 << 3);
  if (i > 55) {
    md5cycle(state, tail);
    for (i = 0; i < 16; i++) {tail[i] = 0;}
  }
  tail[14] = n * 8;
  md5cycle(state, tail);
  return state;
}

/* there needs to be support for Unicode here,
   * unless we pretend that we can redefine the MD-5
   * algorithm for multi-byte characters (perhaps
   * by adding every four 16-bit characters and
   * shortening the sum to 32 bits). Otherwise
   * I suggest performing MD-5 as if every character
   * was two bytes--e.g., 0040 0025 = @%--but then
   * how will an ordinary MD-5 sum be matched?
   * There is no way to standardize text to something
   * like UTF-8 before transformation; speed cost is
   * utterly prohibitive. The JavaScript standard
   * itself needs to look at this: it should start
   * providing access to strings as preformed UTF-8
   * 8-bit unsigned value arrays.
   */

function md5blk(s) {/* I figured global was faster.   */
  var md5blks = [],
  i; /* Andy King said do it this way. */
  for (i = 0; i < 64; i += 4) {
    md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24);
  }
  return md5blks;
}

var hex_chr = '0123456789abcdef'.split('');

function rhex(n) {
  var s = '',
  j = 0;
  for (; j < 4; j++) {
    s += hex_chr[n >> j * 8 + 4 & 0x0F] + hex_chr[n >> j * 8 & 0x0F];}
  return s;
}

function hex(x) {
  for (var i = 0; i < x.length; i++) {
    x[i] = rhex(x[i]);}
  return x.join('');
}

function md5(s) {
  return hex(md51(s));
}

/* this function is much faster,
  so if possible we use it. Some IEs
  are the only ones I know of that
  need the idiotic second function,
  generated by an if clause.  */

function add32(a, b) {
  return a + b & 0xFFFFFFFF;
}

if (md5('hello') != '5d41402abc4b2a76b9719d911017c592') {var
  _add = function _add(x, y) {
    var lsw = (x & 0xFFFF) + (y & 0xFFFF),
    msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return msw << 16 | lsw & 0xFFFF;
  };
}


(function () {
  function md5cycle(x, k) {
    var a = x[0],
    b = x[1],
    c = x[2],
    d = x[3];

    a = ff(a, b, c, d, k[0], 7, -680876936);
    d = ff(d, a, b, c, k[1], 12, -389564586);
    c = ff(c, d, a, b, k[2], 17, 606105819);
    b = ff(b, c, d, a, k[3], 22, -1044525330);
    a = ff(a, b, c, d, k[4], 7, -176418897);
    d = ff(d, a, b, c, k[5], 12, 1200080426);
    c = ff(c, d, a, b, k[6], 17, -1473231341);
    b = ff(b, c, d, a, k[7], 22, -45705983);
    a = ff(a, b, c, d, k[8], 7, 1770035416);
    d = ff(d, a, b, c, k[9], 12, -1958414417);
    c = ff(c, d, a, b, k[10], 17, -42063);
    b = ff(b, c, d, a, k[11], 22, -1990404162);
    a = ff(a, b, c, d, k[12], 7, 1804603682);
    d = ff(d, a, b, c, k[13], 12, -40341101);
    c = ff(c, d, a, b, k[14], 17, -1502002290);
    b = ff(b, c, d, a, k[15], 22, 1236535329);

    a = gg(a, b, c, d, k[1], 5, -165796510);
    d = gg(d, a, b, c, k[6], 9, -1069501632);
    c = gg(c, d, a, b, k[11], 14, 643717713);
    b = gg(b, c, d, a, k[0], 20, -373897302);
    a = gg(a, b, c, d, k[5], 5, -701558691);
    d = gg(d, a, b, c, k[10], 9, 38016083);
    c = gg(c, d, a, b, k[15], 14, -660478335);
    b = gg(b, c, d, a, k[4], 20, -405537848);
    a = gg(a, b, c, d, k[9], 5, 568446438);
    d = gg(d, a, b, c, k[14], 9, -1019803690);
    c = gg(c, d, a, b, k[3], 14, -187363961);
    b = gg(b, c, d, a, k[8], 20, 1163531501);
    a = gg(a, b, c, d, k[13], 5, -1444681467);
    d = gg(d, a, b, c, k[2], 9, -51403784);
    c = gg(c, d, a, b, k[7], 14, 1735328473);
    b = gg(b, c, d, a, k[12], 20, -1926607734);

    a = hh(a, b, c, d, k[5], 4, -378558);
    d = hh(d, a, b, c, k[8], 11, -2022574463);
    c = hh(c, d, a, b, k[11], 16, 1839030562);
    b = hh(b, c, d, a, k[14], 23, -35309556);
    a = hh(a, b, c, d, k[1], 4, -1530992060);
    d = hh(d, a, b, c, k[4], 11, 1272893353);
    c = hh(c, d, a, b, k[7], 16, -155497632);
    b = hh(b, c, d, a, k[10], 23, -1094730640);
    a = hh(a, b, c, d, k[13], 4, 681279174);
    d = hh(d, a, b, c, k[0], 11, -358537222);
    c = hh(c, d, a, b, k[3], 16, -722521979);
    b = hh(b, c, d, a, k[6], 23, 76029189);
    a = hh(a, b, c, d, k[9], 4, -640364487);
    d = hh(d, a, b, c, k[12], 11, -421815835);
    c = hh(c, d, a, b, k[15], 16, 530742520);
    b = hh(b, c, d, a, k[2], 23, -995338651);

    a = ii(a, b, c, d, k[0], 6, -198630844);
    d = ii(d, a, b, c, k[7], 10, 1126891415);
    c = ii(c, d, a, b, k[14], 15, -1416354905);
    b = ii(b, c, d, a, k[5], 21, -57434055);
    a = ii(a, b, c, d, k[12], 6, 1700485571);
    d = ii(d, a, b, c, k[3], 10, -1894986606);
    c = ii(c, d, a, b, k[10], 15, -1051523);
    b = ii(b, c, d, a, k[1], 21, -2054922799);
    a = ii(a, b, c, d, k[8], 6, 1873313359);
    d = ii(d, a, b, c, k[15], 10, -30611744);
    c = ii(c, d, a, b, k[6], 15, -1560198380);
    b = ii(b, c, d, a, k[13], 21, 1309151649);
    a = ii(a, b, c, d, k[4], 6, -145523070);
    d = ii(d, a, b, c, k[11], 10, -1120210379);
    c = ii(c, d, a, b, k[2], 15, 718787259);
    b = ii(b, c, d, a, k[9], 21, -343485551);

    x[0] = add32(a, x[0]);
    x[1] = add32(b, x[1]);
    x[2] = add32(c, x[2]);
    x[3] = add32(d, x[3]);

  }

  function cmn(q, a, b, x, s, t) {
    a = add32(add32(a, q), add32(x, t));
    return add32(a << s | a >>> 32 - s, b);
  }

  function ff(a, b, c, d, x, s, t) {
    return cmn(b & c | ~b & d, a, b, x, s, t);
  }

  function gg(a, b, c, d, x, s, t) {
    return cmn(b & d | c & ~d, a, b, x, s, t);
  }

  function hh(a, b, c, d, x, s, t) {
    return cmn(b ^ c ^ d, a, b, x, s, t);
  }

  function ii(a, b, c, d, x, s, t) {
    return cmn(c ^ (b | ~d), a, b, x, s, t);
  }

  function md51(s) {
    // Converts the string to UTF-8 "bytes" when necessary
    if (s.match(/[\x80-\xFF]/)) {
      s = unescape(encodeURI(s));
    }
    var txt = '';
    var n = s.length,
    state = [1732584193, -271733879, -1732584194, 271733878],
    i;
    for (i = 64; i <= s.length; i += 64) {
      md5cycle(state, md5blk(s.substring(i - 64, i)));
    }
    s = s.substring(i - 64);
    var tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    for (i = 0; i < s.length; i++) {
      tail[i >> 2] |= s.charCodeAt(i) << (i % 4 << 3);}
    tail[i >> 2] |= 0x80 << (i % 4 << 3);
    if (i > 55) {
      md5cycle(state, tail);
      for (i = 0; i < 16; i++) {tail[i] = 0;}
    }
    tail[14] = n * 8;
    md5cycle(state, tail);
    return state;
  }

  /* there needs to be support for Unicode here,
     * unless we pretend that we can redefine the MD-5
     * algorithm for multi-byte characters (perhaps
     * by adding every four 16-bit characters and
     * shortening the sum to 32 bits). Otherwise
     * I suggest performing MD-5 as if every character
     * was two bytes--e.g., 0040 0025 = @%--but then
     * how will an ordinary MD-5 sum be matched?
     * There is no way to standardize text to something
     * like UTF-8 before transformation; speed cost is
     * utterly prohibitive. The JavaScript standard
     * itself needs to look at this: it should start
     * providing access to strings as preformed UTF-8
     * 8-bit unsigned value arrays.
     */

  function md5blk(s) {/* I figured global was faster.   */
    var md5blks = [],
    i; /* Andy King said do it this way. */
    for (i = 0; i < 64; i += 4) {
      md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24);
    }
    return md5blks;
  }

  var hex_chr = '0123456789abcdef'.split('');

  function rhex(n) {
    var s = '',
    j = 0;
    for (; j < 4; j++) {
      s += hex_chr[n >> j * 8 + 4 & 0x0F] + hex_chr[n >> j * 8 & 0x0F];}
    return s;
  }

  function hex(x) {
    for (var i = 0; i < x.length; i++) {
      x[i] = rhex(x[i]);}
    return x.join('');
  }

  var md5_utf8 = function md5_utf8(s) {
    return hex(md51(s));
  };

  /* this function is much faster,
       so if possible we use it. Some IEs
       are the only ones I know of that
       need the idiotic second function,
       generated by an if clause.  */

  function add32(a, b) {
    return a + b & 0xFFFFFFFF;
  }

  if (md5('hello') != '5d41402abc4b2a76b9719d911017c592') {var
    _add2 = function _add2(x, y) {
      var lsw = (x & 0xFFFF) + (y & 0xFFFF),
      msw = (x >> 16) + (y >> 16) + (lsw >> 16);
      return msw << 16 | lsw & 0xFFFF;
    };
  }
})();

/* md5.js - MD5 Message-Digest
       * Copyright (C) 1999,2002 Masanao Izumo <iz@onicos.co.jp>
       * Version: 2.0.0
       * LastModified: May 13 2002
       *
       * This program is free software.  You can redistribute it and/or modify
       * it without any warranty.  This library calculates the MD5 based on RFC1321.
       * See RFC1321 for more information and algorism.
       */

/* Interface:
           * md5_128bits = MD5_hash(data);
           * md5_hexstr = MD5_hexhash(data);
           */

/* ChangeLog
               * 2002/05/13: Version 2.0.0 released
               * NOTICE: API is changed.
               * 2002/04/15: Bug fix about MD5 length.
               */


//    md5_T[i] = parseInt(Math.abs(Math.sin(i)) * 4294967296.0);
var MD5_T = new Array(0x00000000, 0xd76aa478, 0xe8c7b756, 0x242070db, 0xc1bdceee, 0xf57c0faf, 0x4787c62a, 0xa8304613, 0xfd469501, 0x698098d8, 0x8b44f7af, 0xffff5bb1, 0x895cd7be, 0x6b901122, 0xfd987193, 0xa679438e, 0x49b40821, 0xf61e2562, 0xc040b340, 0x265e5a51, 0xe9b6c7aa, 0xd62f105d, 0x02441453, 0xd8a1e681, 0xe7d3fbc8, 0x21e1cde6, 0xc33707d6, 0xf4d50d87, 0x455a14ed, 0xa9e3e905, 0xfcefa3f8, 0x676f02d9, 0x8d2a4c8a, 0xfffa3942, 0x8771f681, 0x6d9d6122, 0xfde5380c, 0xa4beea44, 0x4bdecfa9, 0xf6bb4b60, 0xbebfbc70, 0x289b7ec6, 0xeaa127fa, 0xd4ef3085, 0x04881d05, 0xd9d4d039, 0xe6db99e5, 0x1fa27cf8, 0xc4ac5665, 0xf4292244, 0x432aff97, 0xab9423a7, 0xfc93a039, 0x655b59c3, 0x8f0ccc92, 0xffeff47d, 0x85845dd1, 0x6fa87e4f, 0xfe2ce6e0, 0xa3014314, 0x4e0811a1, 0xf7537e82, 0xbd3af235, 0x2ad7d2bb, 0xeb86d391);

var MD5_round1 = new Array(new Array(0, 7, 1), new Array(1, 12, 2), new Array(2, 17, 3), new Array(3, 22, 4), new Array(4, 7, 5), new Array(5, 12, 6), new Array(6, 17, 7), new Array(7, 22, 8), new Array(8, 7, 9), new Array(9, 12, 10), new Array(10, 17, 11), new Array(11, 22, 12), new Array(12, 7, 13), new Array(13, 12, 14), new Array(14, 17, 15), new Array(15, 22, 16));

var MD5_round2 = new Array(new Array(1, 5, 17), new Array(6, 9, 18), new Array(11, 14, 19), new Array(0, 20, 20), new Array(5, 5, 21), new Array(10, 9, 22), new Array(15, 14, 23), new Array(4, 20, 24), new Array(9, 5, 25), new Array(14, 9, 26), new Array(3, 14, 27), new Array(8, 20, 28), new Array(13, 5, 29), new Array(2, 9, 30), new Array(7, 14, 31), new Array(12, 20, 32));

var MD5_round3 = new Array(new Array(5, 4, 33), new Array(8, 11, 34), new Array(11, 16, 35), new Array(14, 23, 36), new Array(1, 4, 37), new Array(4, 11, 38), new Array(7, 16, 39), new Array(10, 23, 40), new Array(13, 4, 41), new Array(0, 11, 42), new Array(3, 16, 43), new Array(6, 23, 44), new Array(9, 4, 45), new Array(12, 11, 46), new Array(15, 16, 47), new Array(2, 23, 48));

var MD5_round4 = new Array(new Array(0, 6, 49), new Array(7, 10, 50), new Array(14, 15, 51), new Array(5, 21, 52), new Array(12, 6, 53), new Array(3, 10, 54), new Array(10, 15, 55), new Array(1, 21, 56), new Array(8, 6, 57), new Array(15, 10, 58), new Array(6, 15, 59), new Array(13, 21, 60), new Array(4, 6, 61), new Array(11, 10, 62), new Array(2, 15, 63), new Array(9, 21, 64));

function MD5_F(x, y, z) {
  return x & y | ~x & z;
}

function MD5_G(x, y, z) {
  return x & z | y & ~z;
}

function MD5_H(x, y, z) {
  return x ^ y ^ z;
}

function MD5_I(x, y, z) {
  return y ^ (x | ~z);
}

var MD5_round = new Array(new Array(MD5_F, MD5_round1), new Array(MD5_G, MD5_round2), new Array(MD5_H, MD5_round3), new Array(MD5_I, MD5_round4));

function MD5_pack(n32) {
  return String.fromCharCode(n32 & 0xff) + String.fromCharCode(n32 >>> 8 & 0xff) + String.fromCharCode(n32 >>> 16 & 0xff) + String.fromCharCode(n32 >>> 24 & 0xff);
}

function MD5_unpack(s4) {
  return s4.charCodeAt(0) | s4.charCodeAt(1) << 8 | s4.charCodeAt(2) << 16 | s4.charCodeAt(3) << 24;
}

function MD5_number(n) {
  while (n < 0) {
    n += 4294967296;}
  while (n > 4294967295) {
    n -= 4294967296;}
  return n;
}

function MD5_apply_round(x, s, f, abcd, r) {
  var a, b, c, d;
  var kk, ss, ii;
  var t, u;

  a = abcd[0];
  b = abcd[1];
  c = abcd[2];
  d = abcd[3];
  kk = r[0];
  ss = r[1];
  ii = r[2];

  u = f(s[b], s[c], s[d]);
  t = s[a] + u + x[kk] + MD5_T[ii];
  t = MD5_number(t);
  t = t << ss | t >>> 32 - ss;
  t += s[b];
  s[a] = MD5_number(t);
}

function MD5_hash(data) {
  var abcd, x, state, s;
  var len, index, padLen, f, r;
  var i, j, k;
  var tmp;

  state = new Array(0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476);
  len = data.length;
  index = len & 0x3f;
  padLen = index < 56 ? 56 - index : 120 - index;
  if (padLen > 0) {
    data += "\x80";
    for (i = 0; i < padLen - 1; i++) {
      data += "\x00";}
  }
  data += MD5_pack(len * 8);
  data += MD5_pack(0);
  len += padLen + 8;
  abcd = new Array(0, 1, 2, 3);
  x = new Array(16);
  s = new Array(4);

  for (k = 0; k < len; k += 64) {
    for (i = 0, j = k; i < 16; i++, j += 4) {
      x[i] = data.charCodeAt(j) | data.charCodeAt(j + 1) << 8 | data.charCodeAt(j + 2) << 16 | data.charCodeAt(j + 3) << 24;
    }
    for (i = 0; i < 4; i++) {
      s[i] = state[i];}
    for (i = 0; i < 4; i++) {
      f = MD5_round[i][0];
      r = MD5_round[i][1];
      for (j = 0; j < 16; j++) {
        MD5_apply_round(x, s, f, abcd, r[j]);
        tmp = abcd[0];
        abcd[0] = abcd[3];
        abcd[3] = abcd[2];
        abcd[2] = abcd[1];
        abcd[1] = tmp;
      }
    }

    for (i = 0; i < 4; i++) {
      state[i] += s[i];
      state[i] = MD5_number(state[i]);
    }
  }

  return MD5_pack(state[0]) + MD5_pack(state[1]) + MD5_pack(state[2]) + MD5_pack(state[3]);
}

function MD5_hexhash(data) {
  var i, out, c;
  var bit128;

  bit128 = MD5_hash(data);
  out = "";
  for (i = 0; i < 16; i++) {
    c = bit128.charCodeAt(i);
    out += "0123456789abcdef".charAt(c >> 4 & 0xf);
    out += "0123456789abcdef".charAt(c & 0xf);
  }
  return out;
}

module.exports = {
  hex_md5: hex_md5 };

/***/ }),
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */
/*!***************************************************************************************!*\
  !*** /Users/chenyourong/Documents/person/system/小程序/scanCode/static/startContent.png ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAACXBIWXMAACxLAAAsSwGlPZapAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAARISURBVHgB7Zw9aBRBFMf/foCVKcQiaCNW2qWQpLKRtCJa2cTUfvWKlY3YCSY2dtFGEBQLsTBaaJVYCUKsbPQ6q8RCRcT5s7uYHPsm83n7bm9+8LhkJyR3/7w38+a92QUKhUKhUCgUCoVCYdTsQfccNHbU2EljU/XXU9vG14w9h1K6EnDW2Dwq0WYdfn7Z2BIUMkoBKRZFu4SdHubKKWNbUMZ+5Icedh1unmaDof0ZysgpID8whTuPeAZQKB7JJeCisWsIC9VhNo3dgVJSz4FcUW/B3+so0joqTxvU3xPOeWtQOPc1pBSQIfsA1WLhAgVbrW2AMSWVgBTvcf1qg561Uptar/IhhYCu4jGP641wDbECcs57Abt4G8Zu1q+9I3YVZppiE48eR8/rlddtJ0ZArrSLlnEKt4yesxdhNEmyxESIR0IFtIUuw3YixCMhiwiFeyuMMZ87hx7PecOEeKAtdBcwQeIRXwHpfdI27RnGeEcRiq+AtpKU5nmvKeAeRGJ80xgpbdHqfcP7c77HK0hYGvPxwKZv0cYKdML5evt7bradJ5AIHwGl8OUWTWWxE+1CsUaZTEQfAeeF6+vQi5QRJBPRN4TbWIVebJ28JCK6Csg/Js1/mqssjI4blvFoEV0FlLyP4mlPnNmUzyaiq4BS/jQuu45sIrrmgZIHfkM4/J3MK117KCn4aeyYMDZt7JWxs8Y+wRFXAaX2ZKgH0qNd2gA5+GHssDB2xNhrVCnbVzgQG8KbCIMpURfiEQr43TJ+yNhlOBJaD4wlRcM9BobyH8u4857ZVUBbQhpCl6kPp61p2Kevd3DEVUApVEOrG8zPujiutpt4f43dNvYUHr/QhdQeSFj+YhFiVKsw51yKI81/FO+esfvwwFVAqVQV++H5jxnFXpri3TV2ANX810ZQI8w1hAeWN5a8SJkYl5MTwV1EnzkwlxfmxCXfjGrB+qQxa8L12JOnOeFRu2ziER8BpaLpPPRi29smaf77CCjV/VxP2neBlD0kOznhIyDnQGnF1OqFS8K1ZB3EffCD88lcy/Xjxp4Y+w1d8J/+BlXx4Iuxh8YeISG+RzuYOH8QxpgUqz0MngtfD/wFub05g/8HxSeGcrgoEl8PJBSHoTzTMsbr3C69x4QQIiD5aOwiKrGGobD0bM394mSECsi5kCvuaWGceeFEiBgqIKEXSqFMZuvxXodz7G0OFIh5la2gwIVlAT1dnWM8kDCU6WHciUjFVV5frF+ZzJYbbVpwvVup2Q4uoScemfpmQ59eL4XkwUzNx+N2JfXtrgxT3tZ1AX6wYEsRN7CzeLtVX1PrrbmemcCD6LvdBuYKBb0KpSlRzodOUDzete7rjW1QxDNQuADFrsI2+GFZSuLJKPYmYnon3PG8hP1IRieM8rEnjUfOISy0VT72ZFwevKP25kUNj34iFJJeySbQFMbo0U+FQqFQKBQKhUKhMHr+AZC2wOGpSKqaAAAAAElFTkSuQmCC"

/***/ }),
/* 30 */
/*!***********************************************************************************!*\
  !*** /Users/chenyourong/Documents/person/system/小程序/scanCode/static/entering.png ***!
  \***********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),
/* 31 */
/*!********************************************************************************!*\
  !*** /Users/chenyourong/Documents/person/system/小程序/scanCode/static/scane.png ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ })
]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map