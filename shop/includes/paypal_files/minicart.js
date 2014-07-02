/*!
 * minicart
 * The Mini Cart is a great way to improve your PayPal shopping cart integration.
 *
 * @version 3.0.4
 * @author Jeff Harrell <https://github.com/jeffharrell/>
 * @url http://www.minicartjs.com/
 * @license MIT <https://github.com/jeffharrell/MiniCart/raw/master/LICENSE>
 */

;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){


//
// The shims in this file are not fully implemented shims for the ES5
// features, but do work for the particular usecases there is in
// the other modules.
//

var toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

// Array.isArray is supported in IE9
function isArray(xs) {
  return toString.call(xs) === '[object Array]';
}
exports.isArray = typeof Array.isArray === 'function' ? Array.isArray : isArray;

// Array.prototype.indexOf is supported in IE9
exports.indexOf = function indexOf(xs, x) {
  if (xs.indexOf) return xs.indexOf(x);
  for (var i = 0; i < xs.length; i++) {
    if (x === xs[i]) return i;
  }
  return -1;
};

// Array.prototype.filter is supported in IE9
exports.filter = function filter(xs, fn) {
  if (xs.filter) return xs.filter(fn);
  var res = [];
  for (var i = 0; i < xs.length; i++) {
    if (fn(xs[i], i, xs)) res.push(xs[i]);
  }
  return res;
};

// Array.prototype.forEach is supported in IE9
exports.forEach = function forEach(xs, fn, self) {
  if (xs.forEach) return xs.forEach(fn, self);
  for (var i = 0; i < xs.length; i++) {
    fn.call(self, xs[i], i, xs);
  }
};

// Array.prototype.map is supported in IE9
exports.map = function map(xs, fn) {
  if (xs.map) return xs.map(fn);
  var out = new Array(xs.length);
  for (var i = 0; i < xs.length; i++) {
    out[i] = fn(xs[i], i, xs);
  }
  return out;
};

// Array.prototype.reduce is supported in IE9
exports.reduce = function reduce(array, callback, opt_initialValue) {
  if (array.reduce) return array.reduce(callback, opt_initialValue);
  var value, isValueSet = false;

  if (2 < arguments.length) {
    value = opt_initialValue;
    isValueSet = true;
  }
  for (var i = 0, l = array.length; l > i; ++i) {
    if (array.hasOwnProperty(i)) {
      if (isValueSet) {
        value = callback(value, array[i], i, array);
      }
      else {
        value = array[i];
        isValueSet = true;
      }
    }
  }

  return value;
};

// String.prototype.substr - negative index don't work in IE8
if ('ab'.substr(-1) !== 'b') {
  exports.substr = function (str, start, length) {
    // did we get a negative start, calculate how much it is from the beginning of the string
    if (start < 0) start = str.length + start;

    // call the original function
    return str.substr(start, length);
  };
} else {
  exports.substr = function (str, start, length) {
    return str.substr(start, length);
  };
}

// String.prototype.trim is supported in IE9
exports.trim = function (str) {
  if (str.trim) return str.trim();
  return str.replace(/^\s+|\s+$/g, '');
};

// Function.prototype.bind is supported in IE9
exports.bind = function () {
  var args = Array.prototype.slice.call(arguments);
  var fn = args.shift();
  if (fn.bind) return fn.bind.apply(fn, args);
  var self = args.shift();
  return function () {
    fn.apply(self, args.concat([Array.prototype.slice.call(arguments)]));
  };
};

// Object.create is supported in IE9
function create(prototype, properties) {
  var object;
  if (prototype === null) {
    object = { '__proto__' : null };
  }
  else {
    if (typeof prototype !== 'object') {
      throw new TypeError(
        'typeof prototype[' + (typeof prototype) + '] != \'object\''
      );
    }
    var Type = function () {};
    Type.prototype = prototype;
    object = new Type();
    object.__proto__ = prototype;
  }
  if (typeof properties !== 'undefined' && Object.defineProperties) {
    Object.defineProperties(object, properties);
  }
  return object;
}
exports.create = typeof Object.create === 'function' ? Object.create : create;

// Object.keys and Object.getOwnPropertyNames is supported in IE9 however
// they do show a description and number property on Error objects
function notObject(object) {
  return ((typeof object != "object" && typeof object != "function") || object === null);
}

function keysShim(object) {
  if (notObject(object)) {
    throw new TypeError("Object.keys called on a non-object");
  }

  var result = [];
  for (var name in object) {
    if (hasOwnProperty.call(object, name)) {
      result.push(name);
    }
  }
  return result;
}

// getOwnPropertyNames is almost the same as Object.keys one key feature
//  is that it returns hidden properties, since that can't be implemented,
//  this feature gets reduced so it just shows the length property on arrays
function propertyShim(object) {
  if (notObject(object)) {
    throw new TypeError("Object.getOwnPropertyNames called on a non-object");
  }

  var result = keysShim(object);
  if (exports.isArray(object) && exports.indexOf(object, 'length') === -1) {
    result.push('length');
  }
  return result;
}

var keys = typeof Object.keys === 'function' ? Object.keys : keysShim;
var getOwnPropertyNames = typeof Object.getOwnPropertyNames === 'function' ?
  Object.getOwnPropertyNames : propertyShim;

if (new Error().hasOwnProperty('description')) {
  var ERROR_PROPERTY_FILTER = function (obj, array) {
    if (toString.call(obj) === '[object Error]') {
      array = exports.filter(array, function (name) {
        return name !== 'description' && name !== 'number' && name !== 'message';
      });
    }
    return array;
  };

  exports.keys = function (object) {
    return ERROR_PROPERTY_FILTER(object, keys(object));
  };
  exports.getOwnPropertyNames = function (object) {
    return ERROR_PROPERTY_FILTER(object, getOwnPropertyNames(object));
  };
} else {
  exports.keys = keys;
  exports.getOwnPropertyNames = getOwnPropertyNames;
}

// Object.getOwnPropertyDescriptor - supported in IE8 but only on dom elements
function valueObject(value, key) {
  return { value: value[key] };
}

if (typeof Object.getOwnPropertyDescriptor === 'function') {
  try {
    Object.getOwnPropertyDescriptor({'a': 1}, 'a');
    exports.getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
  } catch (e) {
    // IE8 dom element issue - use a try catch and default to valueObject
    exports.getOwnPropertyDescriptor = function (value, key) {
      try {
        return Object.getOwnPropertyDescriptor(value, key);
      } catch (e) {
        return valueObject(value, key);
      }
    };
  }
} else {
  exports.getOwnPropertyDescriptor = valueObject;
}

},{}],2:[function(require,module,exports){

// not implemented
// The reason for having an empty file and not throwing is to allow
// untraditional implementation of this module.

},{}],3:[function(require,module,exports){
var process=require("__browserify_process");// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var util = require('util');
var shims = require('_shims');

// resolves . and .. elements in a path array with directory names there
// must be no slashes, empty elements, or device names (c:\) in the array
// (so also no leading and trailing slashes - it does not distinguish
// relative and absolute paths)
function normalizeArray(parts, allowAboveRoot) {
  // if the path tries to go above the root, `up` ends up > 0
  var up = 0;
  for (var i = parts.length - 1; i >= 0; i--) {
    var last = parts[i];
    if (last === '.') {
      parts.splice(i, 1);
    } else if (last === '..') {
      parts.splice(i, 1);
      up++;
    } else if (up) {
      parts.splice(i, 1);
      up--;
    }
  }

  // if the path is allowed to go above the root, restore leading ..s
  if (allowAboveRoot) {
    for (; up--; up) {
      parts.unshift('..');
    }
  }

  return parts;
}

// Split a filename into [root, dir, basename, ext], unix version
// 'root' is just a slash, or nothing.
var splitPathRe =
    /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
var splitPath = function(filename) {
  return splitPathRe.exec(filename).slice(1);
};

// path.resolve([from ...], to)
// posix version
exports.resolve = function() {
  var resolvedPath = '',
      resolvedAbsolute = false;

  for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
    var path = (i >= 0) ? arguments[i] : process.cwd();

    // Skip empty and invalid entries
    if (!util.isString(path)) {
      throw new TypeError('Arguments to path.resolve must be strings');
    } else if (!path) {
      continue;
    }

    resolvedPath = path + '/' + resolvedPath;
    resolvedAbsolute = path.charAt(0) === '/';
  }

  // At this point the path should be resolved to a full absolute path, but
  // handle relative paths to be safe (might happen when process.cwd() fails)

  // Normalize the path
  resolvedPath = normalizeArray(shims.filter(resolvedPath.split('/'), function(p) {
    return !!p;
  }), !resolvedAbsolute).join('/');

  return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

// path.normalize(path)
// posix version
exports.normalize = function(path) {
  var isAbsolute = exports.isAbsolute(path),
      trailingSlash = shims.substr(path, -1) === '/';

  // Normalize the path
  path = normalizeArray(shims.filter(path.split('/'), function(p) {
    return !!p;
  }), !isAbsolute).join('/');

  if (!path && !isAbsolute) {
    path = '.';
  }
  if (path && trailingSlash) {
    path += '/';
  }

  return (isAbsolute ? '/' : '') + path;
};

// posix version
exports.isAbsolute = function(path) {
  return path.charAt(0) === '/';
};

// posix version
exports.join = function() {
  var paths = Array.prototype.slice.call(arguments, 0);
  return exports.normalize(shims.filter(paths, function(p, index) {
    if (!util.isString(p)) {
      throw new TypeError('Arguments to path.join must be strings');
    }
    return p;
  }).join('/'));
};


// path.relative(from, to)
// posix version
exports.relative = function(from, to) {
  from = exports.resolve(from).substr(1);
  to = exports.resolve(to).substr(1);

  function trim(arr) {
    var start = 0;
    for (; start < arr.length; start++) {
      if (arr[start] !== '') break;
    }

    var end = arr.length - 1;
    for (; end >= 0; end--) {
      if (arr[end] !== '') break;
    }

    if (start > end) return [];
    return arr.slice(start, end - start + 1);
  }

  var fromParts = trim(from.split('/'));
  var toParts = trim(to.split('/'));

  var length = Math.min(fromParts.length, toParts.length);
  var samePartsLength = length;
  for (var i = 0; i < length; i++) {
    if (fromParts[i] !== toParts[i]) {
      samePartsLength = i;
      break;
    }
  }

  var outputParts = [];
  for (var i = samePartsLength; i < fromParts.length; i++) {
    outputParts.push('..');
  }

  outputParts = outputParts.concat(toParts.slice(samePartsLength));

  return outputParts.join('/');
};

exports.sep = '/';
exports.delimiter = ':';

exports.dirname = function(path) {
  var result = splitPath(path),
      root = result[0],
      dir = result[1];

  if (!root && !dir) {
    // No dirname whatsoever
    return '.';
  }

  if (dir) {
    // It has a dirname, strip trailing slash
    dir = dir.substr(0, dir.length - 1);
  }

  return root + dir;
};


exports.basename = function(path, ext) {
  var f = splitPath(path)[2];
  // TODO: make this comparison case-insensitive on windows?
  if (ext && f.substr(-1 * ext.length) === ext) {
    f = f.substr(0, f.length - ext.length);
  }
  return f;
};


exports.extname = function(path) {
  return splitPath(path)[3];
};

},{"__browserify_process":5,"_shims":1,"util":4}],4:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var shims = require('_shims');

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};

/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  shims.forEach(array, function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = shims.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = shims.getOwnPropertyNames(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }

  shims.forEach(keys, function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = shims.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }

  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (shims.indexOf(ctx.seen, desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = shims.reduce(output, function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return shims.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) && objectToString(e) === '[object Error]';
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.binarySlice === 'function'
  ;
}
exports.isBuffer = isBuffer;

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = function(ctor, superCtor) {
  ctor.super_ = superCtor;
  ctor.prototype = shims.create(superCtor.prototype, {
    constructor: {
      value: ctor,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
};

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = shims.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

},{"_shims":1}],5:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};

process.nextTick = (function () {
    var canSetImmediate = typeof window !== 'undefined'
    && window.setImmediate;
    var canPost = typeof window !== 'undefined'
    && window.postMessage && window.addEventListener
    ;

    if (canSetImmediate) {
        return function (f) { return window.setImmediate(f) };
    }

    if (canPost) {
        var queue = [];
        window.addEventListener('message', function (ev) {
            var source = ev.source;
            if ((source === window || source === null) && ev.data === 'process-tick') {
                ev.stopPropagation();
                if (queue.length > 0) {
                    var fn = queue.shift();
                    fn();
                }
            }
        }, true);

        return function nextTick(fn) {
            queue.push(fn);
            window.postMessage('process-tick', '*');
        };
    }

    return function nextTick(fn) {
        setTimeout(fn, 0);
    };
})();

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];

process.binding = function (name) {
    throw new Error('process.binding is not supported');
}

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};

},{}],6:[function(require,module,exports){

/*!
 * EJS
 * Copyright(c) 2012 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var utils = require('./utils')
  , path = require('path')
  , dirname = path.dirname
  , extname = path.extname
  , join = path.join
  , fs = require('fs')
  , read = fs.readFileSync;

/**
 * Filters.
 *
 * @type Object
 */

var filters = exports.filters = require('./filters');

/**
 * Intermediate js cache.
 *
 * @type Object
 */

var cache = {};

/**
 * Clear intermediate js cache.
 *
 * @api public
 */

exports.clearCache = function(){
  cache = {};
};

/**
 * Translate filtered code into function calls.
 *
 * @param {String} js
 * @return {String}
 * @api private
 */

function filtered(js) {
  return js.substr(1).split('|').reduce(function(js, filter){
    var parts = filter.split(':')
      , name = parts.shift()
      , args = parts.join(':') || '';
    if (args) args = ', ' + args;
    return 'filters.' + name + '(' + js + args + ')';
  });
};

/**
 * Re-throw the given `err` in context to the
 * `str` of ejs, `filename`, and `lineno`.
 *
 * @param {Error} err
 * @param {String} str
 * @param {String} filename
 * @param {String} lineno
 * @api private
 */

function rethrow(err, str, filename, lineno){
  var lines = str.split('\n')
    , start = Math.max(lineno - 3, 0)
    , end = Math.min(lines.length, lineno + 3);

  // Error context
  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start + 1;
    return (curr == lineno ? ' >> ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'ejs') + ':'
    + lineno + '\n'
    + context + '\n\n'
    + err.message;
  
  throw err;
}

/**
 * Parse the given `str` of ejs, returning the function body.
 *
 * @param {String} str
 * @return {String}
 * @api public
 */

var parse = exports.parse = function(str, options){
  var options = options || {}
    , open = options.open || exports.open || '<%'
    , close = options.close || exports.close || '%>'
    , filename = options.filename
    , compileDebug = options.compileDebug !== false
    , buf = "";

  buf += 'var buf = [];';
  if (false !== options._with) buf += '\nwith (locals || {}) { (function(){ ';
  buf += '\n buf.push(\'';

  var lineno = 1;

  var consumeEOL = false;
  for (var i = 0, len = str.length; i < len; ++i) {
    var stri = str[i];
    if (str.slice(i, open.length + i) == open) {
      i += open.length
  
      var prefix, postfix, line = (compileDebug ? '__stack.lineno=' : '') + lineno;
      switch (str[i]) {
        case '=':
          prefix = "', escape((" + line + ', ';
          postfix = ")), '";
          ++i;
          break;
        case '-':
          prefix = "', (" + line + ', ';
          postfix = "), '";
          ++i;
          break;
        default:
          prefix = "');" + line + ';';
          postfix = "; buf.push('";
      }

      var end = str.indexOf(close, i)
        , js = str.substring(i, end)
        , start = i
        , include = null
        , n = 0;

      if ('-' == js[js.length-1]){
        js = js.substring(0, js.length - 2);
        consumeEOL = true;
      }

      if (0 == js.trim().indexOf('include')) {
        var name = js.trim().slice(7).trim();
        if (!filename) throw new Error('filename option is required for includes');
        var path = resolveInclude(name, filename);
        include = read(path, 'utf8');
        include = exports.parse(include, { filename: path, _with: false, open: open, close: close, compileDebug: compileDebug });
        buf += "' + (function(){" + include + "})() + '";
        js = '';
      }

      while (~(n = js.indexOf("\n", n))) n++, lineno++;
      if (js.substr(0, 1) == ':') js = filtered(js);
      if (js) {
        if (js.lastIndexOf('//') > js.lastIndexOf('\n')) js += '\n';
        buf += prefix;
        buf += js;
        buf += postfix;
      }
      i += end - start + close.length - 1;

    } else if (stri == "\\") {
      buf += "\\\\";
    } else if (stri == "'") {
      buf += "\\'";
    } else if (stri == "\r") {
      // ignore
    } else if (stri == "\n") {
      if (consumeEOL) {
        consumeEOL = false;
      } else {
        buf += "\\n";
        lineno++;
      }
    } else {
      buf += stri;
    }
  }

  if (false !== options._with) buf += "'); })();\n} \nreturn buf.join('');";
  else buf += "');\nreturn buf.join('');";
  return buf;
};

/**
 * Compile the given `str` of ejs into a `Function`.
 *
 * @param {String} str
 * @param {Object} options
 * @return {Function}
 * @api public
 */

var compile = exports.compile = function(str, options){
  options = options || {};
  var escape = options.escape || utils.escape;
  
  var input = JSON.stringify(str)
    , compileDebug = options.compileDebug !== false
    , client = options.client
    , filename = options.filename
        ? JSON.stringify(options.filename)
        : 'undefined';
  
  if (compileDebug) {
    // Adds the fancy stack trace meta info
    str = [
      'var __stack = { lineno: 1, input: ' + input + ', filename: ' + filename + ' };',
      rethrow.toString(),
      'try {',
      exports.parse(str, options),
      '} catch (err) {',
      '  rethrow(err, __stack.input, __stack.filename, __stack.lineno);',
      '}'
    ].join("\n");
  } else {
    str = exports.parse(str, options);
  }
  
  if (options.debug) console.log(str);
  if (client) str = 'escape = escape || ' + escape.toString() + ';\n' + str;

  try {
    var fn = new Function('locals, filters, escape, rethrow', str);
  } catch (err) {
    if ('SyntaxError' == err.name) {
      err.message += options.filename
        ? ' in ' + filename
        : ' while compiling ejs';
    }
    throw err;
  }

  if (client) return fn;

  return function(locals){
    return fn.call(this, locals, filters, escape, rethrow);
  }
};

/**
 * Render the given `str` of ejs.
 *
 * Options:
 *
 *   - `locals`          Local variables object
 *   - `cache`           Compiled functions are cached, requires `filename`
 *   - `filename`        Used by `cache` to key caches
 *   - `scope`           Function execution context
 *   - `debug`           Output generated function body
 *   - `open`            Open tag, defaulting to "<%"
 *   - `close`           Closing tag, defaulting to "%>"
 *
 * @param {String} str
 * @param {Object} options
 * @return {String}
 * @api public
 */

exports.render = function(str, options){
  var fn
    , options = options || {};

  if (options.cache) {
    if (options.filename) {
      fn = cache[options.filename] || (cache[options.filename] = compile(str, options));
    } else {
      throw new Error('"cache" option requires "filename".');
    }
  } else {
    fn = compile(str, options);
  }

  options.__proto__ = options.locals;
  return fn.call(options.scope, options);
};

/**
 * Render an EJS file at the given `path` and callback `fn(err, str)`.
 *
 * @param {String} path
 * @param {Object|Function} options or callback
 * @param {Function} fn
 * @api public
 */

exports.renderFile = function(path, options, fn){
  var key = path + ':string';

  if ('function' == typeof options) {
    fn = options, options = {};
  }

  options.filename = path;

  var str;
  try {
    str = options.cache
      ? cache[key] || (cache[key] = read(path, 'utf8'))
      : read(path, 'utf8');
  } catch (err) {
    fn(err);
    return;
  }
  fn(null, exports.render(str, options));
};

/**
 * Resolve include `name` relative to `filename`.
 *
 * @param {String} name
 * @param {String} filename
 * @return {String}
 * @api private
 */

function resolveInclude(name, filename) {
  var path = join(dirname(filename), name);
  var ext = extname(name);
  if (!ext) path += '.ejs';
  return path;
}

// express support

exports.__express = exports.renderFile;

/**
 * Expose to require().
 */

if (require.extensions) {
  require.extensions['.ejs'] = function (module, filename) {
    filename = filename || module.filename;
    var options = { filename: filename, client: true }
      , template = fs.readFileSync(filename).toString()
      , fn = compile(template, options);
    module._compile('module.exports = ' + fn.toString() + ';', filename);
  };
} else if (require.registerExtension) {
  require.registerExtension('.ejs', function(src) {
    return compile(src, {});
  });
}

},{"./filters":7,"./utils":8,"fs":2,"path":3}],7:[function(require,module,exports){
/*!
 * EJS - Filters
 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * First element of the target `obj`.
 */

exports.first = function(obj) {
  return obj[0];
};

/**
 * Last element of the target `obj`.
 */

exports.last = function(obj) {
  return obj[obj.length - 1];
};

/**
 * Capitalize the first letter of the target `str`.
 */

exports.capitalize = function(str){
  str = String(str);
  return str[0].toUpperCase() + str.substr(1, str.length);
};

/**
 * Downcase the target `str`.
 */

exports.downcase = function(str){
  return String(str).toLowerCase();
};

/**
 * Uppercase the target `str`.
 */

exports.upcase = function(str){
  return String(str).toUpperCase();
};

/**
 * Sort the target `obj`.
 */

exports.sort = function(obj){
  return Object.create(obj).sort();
};

/**
 * Sort the target `obj` by the given `prop` ascending.
 */

exports.sort_by = function(obj, prop){
  return Object.create(obj).sort(function(a, b){
    a = a[prop], b = b[prop];
    if (a > b) return 1;
    if (a < b) return -1;
    return 0;
  });
};

/**
 * Size or length of the target `obj`.
 */

exports.size = exports.length = function(obj) {
  return obj.length;
};

/**
 * Add `a` and `b`.
 */

exports.plus = function(a, b){
  return Number(a) + Number(b);
};

/**
 * Subtract `b` from `a`.
 */

exports.minus = function(a, b){
  return Number(a) - Number(b);
};

/**
 * Multiply `a` by `b`.
 */

exports.times = function(a, b){
  return Number(a) * Number(b);
};

/**
 * Divide `a` by `b`.
 */

exports.divided_by = function(a, b){
  return Number(a) / Number(b);
};

/**
 * Join `obj` with the given `str`.
 */

exports.join = function(obj, str){
  return obj.join(str || ', ');
};

/**
 * Truncate `str` to `len`.
 */

exports.truncate = function(str, len, append){
  str = String(str);
  if (str.length > len) {
    str = str.slice(0, len);
    if (append) str += append;
  }
  return str;
};

/**
 * Truncate `str` to `n` words.
 */

exports.truncate_words = function(str, n){
  var str = String(str)
    , words = str.split(/ +/);
  return words.slice(0, n).join(' ');
};

/**
 * Replace `pattern` with `substitution` in `str`.
 */

exports.replace = function(str, pattern, substitution){
  return String(str).replace(pattern, substitution || '');
};

/**
 * Prepend `val` to `obj`.
 */

exports.prepend = function(obj, val){
  return Array.isArray(obj)
    ? [val].concat(obj)
    : val + obj;
};

/**
 * Append `val` to `obj`.
 */

exports.append = function(obj, val){
  return Array.isArray(obj)
    ? obj.concat(val)
    : obj + val;
};

/**
 * Map the given `prop`.
 */

exports.map = function(arr, prop){
  return arr.map(function(obj){
    return obj[prop];
  });
};

/**
 * Reverse the given `obj`.
 */

exports.reverse = function(obj){
  return Array.isArray(obj)
    ? obj.reverse()
    : String(obj).split('').reverse().join('');
};

/**
 * Get `prop` of the given `obj`.
 */

exports.get = function(obj, prop){
  return obj[prop];
};

/**
 * Packs the given `obj` into json string
 */
exports.json = function(obj){
  return JSON.stringify(obj);
};

},{}],8:[function(require,module,exports){

/*!
 * EJS
 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

exports.escape = function(html){
  return String(html)
    .replace(/&(?!#?[a-zA-Z0-9]+;)/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/'/g, '&#39;')
    .replace(/"/g, '&quot;');
};
 

},{}],9:[function(require,module,exports){
'use strict';


var Product = require('./product'),
    Pubsub = require('./util/pubsub'),
    Storage = require('./util/storage'),
    constants = require('./constants'),
    currency = require('./util/currency'),
    mixin = require('./util/mixin');



/**
 * Renders the Mini Cart to the page's DOM.
 *
 * @constructor
 * @param {string} name Name of the cart (used as a key for storage)
 * @param {duration} number Time in milliseconds that the cart data should persist
 */
function Cart(name, duration) {
    var data, items, settings, len, i;

    this._items = [];
    this._settings = { bn: constants.BN };

    Pubsub.call(this);
    Storage.call(this, name, duration);

    if ((data = this.load())) {
        items = data.items;
        settings = data.settings;

        if (settings) {
            this._settings = settings;
        }

        if (items) {
            for (i = 0, len = items.length; i < len; i++) {
                this.add(items[i]);
            }
        }
    }
}


mixin(Cart.prototype, Pubsub.prototype);
mixin(Cart.prototype, Storage.prototype);


/**
 * Adds an item to the cart. This fires an "add" event.
 *
 * @param {object} data Item data
 * @return {number} Item location in the cart
 */
Cart.prototype.add = function add(data) {
    var that = this,
        items = this.items(),
        idx = false,
        isExisting = false,
        product, key, len, i;

    // Prune cart settings data from the product
    for (key in data) {
        if (constants.SETTINGS.test(key)) {
            this._settings[key] = data[key];
            delete data[key];
        }
    }

    // Look to see if the same product has already been added
    for (i = 0, len = items.length; i < len; i++) {
        if (items[i].isEqual(data)) {
            product = items[i];
            product.set('quantity', product.get('quantity') + (parseInt(data.quantity, 10) || 1));
            idx = i;
            isExisting = true;
            break;
        }
    }

    // If not, then try to add it
    if (!product) {
        product = new Product(data);

        if (product.isValid()) {
            idx = (this._items.push(product) - 1);

            product.on('change', function (key, value) {
                that.save();
                that.fire('change', idx, key, value);
            });

            this.save();
        }
    }

    if (product) {
        this.fire('add', idx, product, isExisting);
    }

    return idx;
};


/**
 * Returns the carts current items.
 *
 * @param {number} idx (Optional) Returns only that item.
 * @return {array|object}
 */
Cart.prototype.items = function get(idx) {
    return (typeof idx === 'number') ? this._items[idx] : this._items;
};


/**
 * Returns the carts current settings.
 *
 * @param {string} name (Optional) Returns only that setting.
 * @return {array|string}
 */
Cart.prototype.settings = function settings(name) {
    return (name) ? this._settings[name] : this._settings;
};


/**
 * Returns the cart discount.
 *
 * @param {object} config (Optional) Currency formatting options.
 * @return {number|string}
 */
Cart.prototype.discount = function discount(config) {
    var result = parseFloat(this.settings('discount_amount_cart')) || 0;

    if (!result) {
        result = (parseFloat(this.settings('discount_rate_cart')) || 0) * this.subtotal() / 100;
    }

    config = config || {};
    config.currency = this.settings('currency_code');

    return currency(result, config);
};


/**
 * Returns the cart total without discounts.
 *
 * @param {object} config (Optional) Currency formatting options.
 * @return {number|string}
 */
Cart.prototype.subtotal = function subtotal(config) {
    var products = this.items(),
        result = 0,
        i, len;

    for (i = 0, len = products.length; i < len; i++) {
        result += products[i].total();
    }

    config = config || {};
    config.currency = this.settings('currency_code');

    return currency(result, config);
};


/**
 * Returns the cart total.
 *
 * @param {object} config (Optional) Currency formatting options.
 * @return {number|string}
 */
Cart.prototype.total = function total(config) {
    var result = 0;

    result += this.subtotal();
    result -= this.discount();

    config = config || {};
    config.currency = this.settings('currency_code');

    return currency(result, config);
};


/**
 * Remove an item from the cart. This fires a "remove" event.
 *
 * @param {number} idx Item index to remove.
 * @return {boolean}
 */
Cart.prototype.remove = function remove(idx) {
    var item = this._items.splice(idx, 1);

    if (this._items.length === 0) {
        this.destroy();
    }

    if (item) {
        this.save();
        this.fire('remove', idx, item[0]);
    }

    return !!item.length;
};


/**
 * Saves the cart data.
 */
Cart.prototype.save = function save() {
    var items = this.items(),
        settings = this.settings(),
        data = [],
        i, len;

    for (i = 0, len = items.length; i < len; i++) {
        data.push(items[i].get());
    }

    Storage.prototype.save.call(this, {
        items: data,
        settings: settings
    });
};


/**
 * Proxies the checkout event
 * The assumption is the view triggers this and consumers subscribe to it
 *
 * @param {object} The initiating event
 */
Cart.prototype.checkout = function checkout(evt) {
    this.fire('checkout', evt);
};


/**
 * Destroy the cart data. This fires a "destroy" event.
 */
Cart.prototype.destroy = function destroy() {
    Storage.prototype.destroy.call(this);

    this._items = [];
    this._settings = { bn: constants.BN };

    this.fire('destroy');
};




module.exports = Cart;

},{"./constants":11,"./product":13,"./util/currency":15,"./util/mixin":18,"./util/pubsub":19,"./util/storage":20}],10:[function(require,module,exports){
'use strict';


var mixin = require('./util/mixin');


var defaults = module.exports = {

    name: 'PPMiniCart',

    parent: (typeof document !== 'undefined') ? document.body : null,

    action: 'https://www.paypal.com/cgi-bin/webscr',

    target: '',

    duration: 30,

    template: '<%var items = cart.items();var settings = cart.settings();var hasItems = !!items.length;var priceFormat = { format: true, currency: cart.settings("currency_code") };var totalFormat = { format: true, showCode: true };%><form method="post" class="<% if (!hasItems) { %>minicart-empty<% } %>" action="<%= config.action %>" target="<%= config.target %>"> <% if (hasItems) { %><img class="minicart-reset" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjBEMzg2OEJGRkE5MTFFM0I1RkVERjg0MDk0NDU0MzEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NjBEMzg2OENGRkE5MTFFM0I1RkVERjg0MDk0NDU0MzEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2MEQzODY4OUZGQTkxMUUzQjVGRURGODQwOTQ0NTQzMSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2MEQzODY4QUZGQTkxMUUzQjVGRURGODQwOTQ0NTQzMSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PnPmmG8AAEl2SURBVHja7H0HgFxl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" width="30" height="30" Title="Clear Shopping Cart"/><img class="minicart-closer" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAAAeCAYAAADO4udXAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6QUZBOTQzQkNGQTU0MTFFM0E0NjA5NDcwNkJBQ0IyQUMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6QUZBOTQzQkRGQTU0MTFFM0E0NjA5NDcwNkJBQ0IyQUMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBRkE5NDNCQUZBNTQxMUUzQTQ2MDk0NzA2QkFDQjJBQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpBRkE5NDNCQkZBNTQxMUUzQTQ2MDk0NzA2QkFDQjJBQyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pln1s0sAABFnSURBVHja7FtrcBzVlf66p3semhmNNGM9bcuyLctPjA3G64AdqGUpICSBPFivTZYigB3Dwi6VqlCbH9lU7R82Se2mdvGmUiZeEkgqrjgQQohNAV4TsIk3GCNsy7aMH0KyZcmy3qN59mPPud096hmNhGVkwJS6qjXd99z3/fqc75x7JZ062wHVI+Pd02fRPhAHJKAhVgaZ0kKBkrl/Pt46uzc++PW6abG/e+90G3qHk+iPJyDLMqauz+ZlGAZKgwFEgyVYUjcDQ8MDOwDv/9ywaF5HOpM8IpnAwTOdkGQJpR4Jy+fOQk0kzAVh2nUohZWywKcovvJw8F9fOXjsweb2c9Hm9jNIZHQoBCbTNMUtEDh1XZGXCdNeR+SAAGdFJetX7pUhSxLeOHoSAVVet2B6zTodZvK2ZQueTKbS/0ZZ+sZrQ3JrrLb+IUTDQSWdSLy2p+X0jW+fasNwKoWQz0cdkKghLiFNQerTfNH6CMQ4zwJJI/DJaBp03YAhMGSOyPiRQUVl2BoZ9K56PKRMJGj0ksxk4FcVXEfaafX8uU2qT1nTG0/EI4o8vsZiBIcCfm9vPL7z+b3v3Hiy8wLCAS/C/gC1Zgr0Eo6Rj/EJfyr2Hym/Hkn6rKiCkXF9EmNiLUSLK0myaN/UNXuuacEpjZVERdCPxupa1EYjmB4JIuDzChCx0kgTsi4MxdHRO4COvkF80NOPLIHQq0hQfAqyVPebpMFOdnUv+9LKZbvKg4FbzGxmcFyNdaKzx//uma7dv93zl1VdvX0I+f1ijtiOGoYmkPyRgeVegCm1d9nAJUDtAIveMwQOxefHoupyrG5swJrFjaifVoZwqAQeVc1bj4F4CucIWCfOnsHupiPY1dJKgDKhkhaTBBUyCKBpREtLceeq5YcaY6U3NUyv7i2isUwEfd7K3uHEr58jUHV2XyBQeQn5GqOKOmeIzhkiu5b7GkU/qEFTytc+AoCXko58sH14upmnFSY73TAN69mWTWY6zym3e/nSTTFnMq1fhvtA+VbNqCAgXIMV82YjTMSc12Eoo8FMZWk5dLsei1fNrIqSaStBZTiEMrr/dOR9tJIGY0rESiboVXChrw+/3/fOVffdtOqVq/2+m8jixd26QpYlD/qTmYef23fgr1s7zyFIoBJoZ+Qb1Kihi05YnZfFLQkZDYpR7E63XIpLS5flCaZ7Lmu6zOm2bLLTcbnTBcgkMmO6AML182bhzhVLsbJxNkpDQZHOPEshDiU+cy5i0BqbFp9KDCeo7xIW1E3Hl66lcnNmwEPgSyQSlmGlAmG/CrZsf9h/6Nr+eGK336eWmi4uR46eevXL7zXfs+/IcQRZQxG5M0zLc5D4a2OKJxk5b0EUnkr/iOny5U3nv6ww6V42oxa3Lp2PlWT+goEAMlleX/YIicTTbyQcxCA5bel0Gl7SSJqWJTCaIuSgEDGfPb0Kt69Yju7BOPY2n0A2k2VtJNoLUPtHW9vx4v6DKx677fNvqapyc1bTuwSw9p74QN3V1NxgkN1UiFex2hyhQrLNR620w0/9KM+cL97wHSDPsOXnv5j0w0/9MFePU//iDY9PuJ5LSW/e8oNRFIXb5vzNub58Z9LbHWsenPYmo36NFt5LwFhQXYGlc+oRCZYgJbxBE2WRCH7x2xexddtz+PZDD+CuG29ANuBH7+AgZKEIJeEEZLP0okqYVxXDLUsWQktr2NNyEirhhLUbKx7WkH86cgK3Lpy7eNmcuqc1yfgCg04J+TwPNp04BYW9VOiAUZwTHtn6H+J30QPfzr3z5Dvvl3I5dZpkbt11fxxX4XhGxvTDvDSnb5f7msyxM93I6llEgxE01M1AeWkI8WRKUBpd04X57BkYwN6Xd+Gtl7Zjw+Pfwz/eczcWNdQTeU8gRdpL8Hn6wxrKR/RoYV0Njp/rwlstJwhgpIQURdAUhQDT0dOD5o4uLKit/CtZ9a7Rdf1N5Uh7x7dMckMZUXpWy4t5OFfLM0+K3/n3PppLcz+78xTK3WWLPTsLOpa88LlYf8Z6H6uv7kvPZsfNx/Ji45/oeN2yxm/8A47/8r+Ll/v7R9Dy7ObRdVA6bMen5ZnNRep5xPJyaP14wbO0pmUV0zCXNFaAQJAiQPFH4hBsldIQi0I634ctz27D1n9/At//8ZPY+OXbUF1Zgf6hISQIjLIdx6okr29uRRQBeu+Jx+H3+yyPkj88wk1T61lcP3t6tKaqcpMsy/vkw6fbBvRMmsibKdxTk4hd4Z37eovI+M5N2D0Pi9uZKHdZfnfLnGenHHM7dztjlSvWH/f7eH0RN7XjbotlefKCOke1T2XHasPQsvnl1j+UV865GAyN6zcVlY1q26mDwGYKkFugmrduUw5UgrOTzKB1FB68IOc6eW8exIJ+O4Oe5z2OBE4lyJ0nSZNp+JdHN+Er//Rd/OaV1xHw+YX3yCTfJGz4gkFUl5cKDcV4MZiLE1gZNxqR+rNE5C/0DyCTTt9Nba+W+weGqNIMfZmk/mhiOMyg02247pE9JK3oXSh3vztXw7qNY8pEOVO/tHITkDnt8M31uq/jv/qJuAvLjWq/oJ9umWka+eXceV3PlswYs84x63C3RQvsHgO3bdoa1shmoNFvgDhWhMFhmh8asJVtD/PPL2zD2jvvwF2PPo732zoEudepbpWIemk4JFicls5QQ5oAMuNGy6SQyWhIkpYcTiRV4liaovEXSnYUXm/exBS9NH1icvf7xyw78estH9r3hrsfsPJu35pXzkn/RMbkcp5G5TPMsWV2Ocs7pFtoLVNoHK8qCW9xJHw5doRa7AjF5mDvO004f6EHSxpmE4aGiMhnhEk0NUMoIKZNsqyLcI1EBF4jjZggYKXpLo1ENivBEr9AtApnU9LqmFmkYXZBixFFt9z97o5rsHo2x6irsN7JkM352jcvmuw6eU899/TH0reLlV1KHTz/IvZH7wny9IfJTPm8qtB8puSx18AoqkQM21xu/OY6fGvtVzCjqgLnzl8QSOCtncFBC2DsdbJZ1j0eyKrF67zUZiadQjKdZDwtletrayIcXMsSURNqlFQao5GfnXvWl7+Rm3iRh+wrP/PtBs/IyYfRwBKgdX2NbtLstHMpMgcMY5Vz+ukez1jpk9k3p+6Jyj7K2HM3WSBe+EECVXffgACFwds7Rpa0i7V/KHZWZGuLjkHJoLpx7X343Us78OPvPoZZtdUEzIxYQw8BaCiRxJmePgwNDRNGskJRsNeoEW4MAmOJzyc0V4ZkmqYNyEvqph+UFZXsJHVGs4krA6DgnnXHejGAD178JVp//6x4ZsC5gXf6+Z/nBuvIRjSWlu+6F9SZZwIKnwve3eWc52IyUS/3hdPGGU/RvBfZ/ljl+P1SZB9l7HzzGvK8e8hEdfb1o7m1XaSrtMZsGoVmI3Mmqh1OiLilqir40eaf4lc/+D5uvX4leol3D5GMjQ97hcyrzpzvxtFTrRiOD1kOAjtBumUSff4SzAj7oYr1lcVWkvSzV95Y89QLO984dvgQQuRCSh553H1m3k8Su+ejBK4jG+OU5y+DByfLn81d6PadvxG/M2//2wnJJlK/u3yxOiV749mrKFh78xqsv3k1ZtbWIpHOCBM4q6YKT/zsGXzvif/E/feuxSPr7kJDXR2Gk0lhPt00h0EXH4rjzabDeHV/E3bueh2+klLICnEr0mQZqq96zjzcc00j5kcCqKqfjfpZsxLK1dOnKbeuuiZ7+NBhNUNqTSGVZu2QIxcXcdMtmfeXJKMo4ISKNfUP2Xw3xRekG+ZoZLrbKsovr4A8jgLJhRBGz6HuCi9MtK3aW76Kjlefz5NwWmE9Es3xMAHpdQJEPZm1O8rKEAh4kUrr6CRS/jefuw5Lf7EZq69eIo7DnO/tG+FoYq/YEFwqmzFw6mwXtu/ei4NHj4nAKNdv2GEZyefH/JoKlLFd9PrJUVBZW8alU63tant//OePb966/lDTu2KTUpA/my85zw54TMm0Nm2LAM4h6eNOltjANkcdTCvalkMwp/JMLI8NEAYwR9yvWtiIjV+8BauvWYrSgI8IdhYlfi/xIhV9xJkcR43r4/XLkMlkuYgLtnVg1779ePqFP6K3vx+xsghMWRXaKk0mt65xAe5a3oi5IS+i1bWYXT8LsVjsq557H3jMqIlEu5Ne+e63m5u96cFBsRlp2l8Wd1DY5dxJQ+tkg3MsRER6YSHctN/FcZQiecSOPxNJ/nUmwrQmplhbhn2+50rJIxbTHtsnmcd0+sx7dgS0D86chUmaJkzaJBIMIhwKEMHWBTnneFqWN6ZFGYgNag/VwSS8pe0cXvvLAWx7aSf6SMuFwmFrHflQIMn90RiB9SrM9wJ+UkjRaBQVFRWs1bZ4Hn7kMSJ1WlswHHjDHwzcd7jlfSk5OEBkzyNiFBxscwNHDE7XiwPONHNnQ4sujG7xqxwwOdgm6of40ka1Betkoy4OrBmf6jw8FhHTsY/8XnQeO23y8mTF/Atw2We1FOpHR8c5vN/WLjiTQvnYpPm9ilhnPoKsehRRjk8/9BKn2nPoGF596/+wgzjVuc4uhEIhMRY++JkkD9FPIFvzuZVYUe5HiVdFGYGqtqYG5dHoDvIiNyuxiFfErq6bVv3ewqrb5TSpye1/2IHh/l74g4RQ/hyI/XMMhOMfHFD1UGfENhAPBJYGE+ek+Zc6KbQVvbvziG0LXiD7kKChGaJujvZqmYw1UQVtsbIzZEmofY4kW45Dfh5ebusI0kXmYcCLYyWTnEemhaFxmLbdv9g8gm+JwPhk5bHPZLkon4dAlEwmcOBICwEni4PHTxKBr0Y9kfhyMm0cXec16CJvsLO7B21nO7DvUDOOHDsutFcoEMhRm0R8GCVk8m5YuYJAFUCI+HawNITy8nIOjPYTqLbquj4gdfX2ODY76Fc8/9XR3XP/T//4v/jd7j3obj1FJFATKOeFZ09Oso8rw/5irAOmlhqVPZI9OMv+C9MhvEAzF3xjUIrDaTlqYJFFw97jsv5hQ7Z3IKRRJ5rz80hFTz1bZhjFvddJzjPCeaRLzuOO+X2kPG6nK4/2s3kjzUbiFBF63tP0q14i8354REhBEXH5DMlSZOI4gs4xKdZmsC0UM2clEETV7AZcu3wplodklJCjFoxEhPmrq5uJysqKAzRX1wrz3HnhwggBpApKZOkn5/v7H3r10HG8/PZ7ONB0EP0EPo5bsJxat+JRNNkKAU6lDupUlG22AzDYUXZJ7D9ZIBFBON2O+Jompq7LcUm5v2bBP3ZJOfNo0ROd1lBLpwCONdonTh1zygFRhU8ukKbjKIEnUILgtEosbmzA0unTUOsx4KfsgdJSAaqamlpUV1cNqqp6M9W9X7RYCCy+FY/0VGo48eDRtjN4p70TJzrOk30+S7Z3CClCs5bVReOmfZ5blixzJcAzBZpPHl7O0fLietj6qxn2MWYbcGxZSOARnicf8FPhVX2IkpmbWVOJuvJSVCpAyMxC8fpQEilFWaSMQFVDoKruZVCRCWzK9aEQWOJYCalFj6JuifcPbBgmIt89MIgzvQMYIjud4mMS3A9Ny98XnFrPK+Qa2XbTNGsrRygI2GffJYeiGGAD6ScT6iU6VKLI8PjJdBLYwkTcy8vLyAuMIRaLnvd6vZ8nULW4W1GKR8eJVBvmxlAkkiZV+EVfKFwfJgIXHxpAJpVGYjhO9lq1XV2rN3ke4tT16TaXkhO3Ys02mquOnIGQxGE+cUiBtFSATCLzslgsJsDl9/vfJk21oRBUY2ostr8ej4U5KlTu8cj/nMlkH02l0wH+D44072DnxaMwhuqduj79jGz0iyQ5gQyCFuHASySeTaQDLALUdsrzPK3/Ng5bFFv7cYHFBXQ7kk6cahGpzVriUvcTIf9CVtdyMSkL+VPAuvKA5Tp94kKW8O7FCQjTinsRFgzTSBMWNhGQhuj3NWe9SWMVXfv/F2AAXTwwVSv9OswAAAAASUVORK5CYII=" width="150" height="30" title="Continue Shopping" /> <% } %> <% if (!hasItems) { %> <button type="button" class="minicart-closer" Title="Close Window">&times;</button>  <% } %> <ul>        <% for (var i= 0, idx = i + 1, len = items.length; i < len; i++, idx++) { %>        <li class="minicart-item">            <a class="minicart-name" href="<%= items[i].get("href") %>"><%= items[i].get("item_name") %></a>            <ul class="minicart-attributes">                <% if (items[i].get("item_number")) { %>                <li>                    <%= items[i].get("item_number") %>                    <input type="hidden" name="item_number_<%= idx %>" value="<%= items[i].get("item_number") %>" />                </li>                <% } %>                <% if (items[i].discount()) { %>                <li>                    <%= config.strings.discount %> <%= items[i].discount(priceFormat) %>                    <input type="hidden" name="discount_amount_<%= idx %>" value="<%= items[i].discount() %>" />                </li>                <% } %>                <% for (var options = items[i].options(), j = 0, len2 = options.length; j < len2; j++) { %>                    <li>                        <%= options[j].key %>: <%= options[j].value %>                        <input type="hidden" name="on<%= j %>_<%= idx %>" value="<%= options[j].key %>" />                        <input type="hidden" name="os<%= j %>_<%= idx %>" value="<%= options[j].value %>" />                    </li>                <% } %>            </ul>            <input class="minicart-quantity" Title="Update Quantity" data-minicart-idx="<%= i %>" name="quantity_<%= idx %>" type="text" pattern="[0-9]*" value="<%= items[i].get("quantity") %>" autocomplete="off" />            <button type="button" class="minicart-remove" Title="Remove Item" data-minicart-idx="<%= i %>">Remove</button>            <span class="minicart-price"><%= items[i].total(priceFormat) %></span>            <input type="hidden" name="item_name_<%= idx %>" value="<%= items[i].get("item_name") %>" />            <input type="hidden" name="amount_<%= idx %>" value="<%= items[i].amount() %>" />            <input type="hidden" name="shipping_<%= idx %>" value="<%= items[i].get("shipping") %>" />            <input type="hidden" name="shipping2_<%= idx %>" value="<%= items[i].get("shipping2") %>" />        </li>        <% } %>    </ul>    <div>        <% if (hasItems) { %>            <div class="minicart-subtotal">                <%= config.strings.subtotal %> <%= cart.total(totalFormat) %>            </div>            <button class="minicart-submit" type="submit" Title="Checkout Now" data-minicart-alt="<%= config.strings.buttonAlt %>"><%- config.strings.button %></button>        <% } else { %>            <center><p class="minicart-empty-text"><%= config.strings.empty %></p></center>        <% } %>    </div>    <input type="hidden" name="cmd" value="_cart" />    <input type="hidden" name="upload" value="1" />    <% for (var key in settings) { %>        <input type="hidden" name="<%= key %>" value="<%= settings[key] %>" />    <% } %></form>',

    styles: '@keyframes pop-in {    0% { opacity: 0; transform: scale(0.1); }    60% { opacity: 1; transform: scale(1.2); }    100% { transform: scale(1); }}@-webkit-keyframes pop-in {    0% { opacity: 0; -webkit-transform: scale(0.1); }    60% { opacity: 1; -webkit-transform: scale(1.2); }    100% { -webkit-transform: scale(1); }}@-moz-keyframes pop-in {    0% { opacity: 0; -moz-transform: scale(0.1); }    60% { opacity: 1; -moz-transform: scale(1.2); }    100% { -moz-transform: scale(1); }}.minicart-showing #PPMiniCart {    display: block;    transform: translateZ(0);    -webkit-transform: translateZ(0);    -moz-transform: translateZ(0);    animation: pop-in 0.25s;    -webkit-animation: pop-in 0.25s;    -moz-animation: pop-in 0.25s;}#PPMiniCart {    display: none;    position: fixed;    left: 50%;    top: 190px;}#PPMiniCart form {    position: relative;    width: 500px;    max-height: 500px;    margin-left: -250px;    padding: 10px 10px 40px;    background: #e2ddc0;    border: 1px solid #d7d7d7;    border-radius: 4px;    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.5);    font: 12px/normal arial, helvetica;    color: #333;}#PPMiniCart form.minicart-empty {    padding-bottom: 10px;    font-size: 16px;    font-weight: bold;}#PPMiniCart ul {    clear: right;    margin: 15px 0;    padding: 10px;    list-style-type: none;    background: #fff;    border: 1px solid #ccc;    border-radius: 4px;    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);}#PPMiniCart .minicart-empty ul {    display: none;}#PPMiniCart .minicart-closer {    float: right;    margin: -12px -10px 0;    padding: 10px;    background: 0;    border: 0;    font-size: 24px; color: blue;   cursor: pointer;}#PPMiniCart .minicart-item {    position: relative;    padding: 6px 0;    min-height: 25px;}#PPMiniCart .minicart-item + .minicart-item {    border-top: 1px solid #f2f2f2;}#PPMiniCart .minicart-item a {    position: absolute;    top: 11px;    left: 0;    width: 300px;    color: #333;    line-height: 10px;    text-decoration: none;}#PPMiniCart .minicart-attributes {    margin: 18px 0 0;    padding: 0;    border: 0;    border-radius: 0;    box-shadow: none;    color: #999;    font-size: 12px;    line-height: 22px;}#PPMiniCart .minicart-attributes li {    display: inline;}#PPMiniCart .minicart-attributes li:after {    content: ",";}#PPMiniCart .minicart-attributes li:last-child:after {    content: "";}#PPMiniCart .minicart-quantity {    position: absolute;    top: 7.5px;    left: 290px;    width: 30px;    height: 18px;    padding: 2px 4px;    border: 1px solid #ccc;    border-radius: 4px;    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);    font-size: 13px;    text-align: right;    transition: border linear 0.2s, box-shadow linear 0.2s;    -webkit-transition: border linear 0.2s, box-shadow linear 0.2s;    -moz-transition: border linear 0.2s, box-shadow linear 0.2s;}#PPMiniCart .minicart-quantity:hover {    border-color: #0078C1;}#PPMiniCart .minicart-quantity:focus {    border-color: #0078C1;    outline: 0;    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 3px rgba(0, 120, 193, 0.4);}#PPMiniCart .minicart-remove {    position: absolute;    top: 7px;    left: 330px;    width: 70px;    height: 19px;    margin: 0;    padding: 0;    background: #b7b7b7;    border: 1px solid #a3a3a3;    border-radius: 3px;    color: #fff;    font-size: 13px;    opacity: 0.70;    cursor: pointer;}#PPMiniCart .minicart-remove:hover {    opacity: 1;}#PPMiniCart .minicart-price {    position: absolute;    top: 7px;    right: 0;}#PPMiniCart .minicart-subtotal {    position: absolute;    bottom: 17px;    left: 10px;    font-size: 16px;    font-weight: bold;}#PPMiniCart .minicart-submit {    position: absolute;    bottom: 10px;    right: 10px;    min-width: 153px;    height: 33px;    border: 1px solid #ffc727;    border-radius: 5px;    color: #000;    text-shadow: 1px 1px 1px #fff6e9;    cursor: pointer;    background: #ffaa00;    background: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pgo8c3ZnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgdmlld0JveD0iMCAwIDEgMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSI+CiAgPGxpbmVhckdyYWRpZW50IGlkPSJncmFkLXVjZ2ctZ2VuZXJhdGVkIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeDE9IjAlIiB5MT0iMCUiIHgyPSIwJSIgeTI9IjEwMCUiPgogICAgPHN0b3Agb2Zmc2V0PSIwJSIgc3RvcC1jb2xvcj0iI2ZmZjZlOSIgc3RvcC1vcGFjaXR5PSIxIi8+CiAgICA8c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNmZmFhMDAiIHN0b3Atb3BhY2l0eT0iMSIvPgogIDwvbGluZWFyR3JhZGllbnQ+CiAgPHJlY3QgeD0iMCIgeT0iMCIgd2lkdGg9IjEiIGhlaWdodD0iMSIgZmlsbD0idXJsKCNncmFkLXVjZ2ctZ2VuZXJhdGVkKSIgLz4KPC9zdmc+);    background: -moz-linear-gradient(top, #fff6e9 0%, #ffaa00 100%);    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,#fff6e9), color-stop(100%,#ffaa00));    background: -webkit-linear-gradient(top, #fff6e9 0%,#ffaa00 100%);    background: -o-linear-gradient(top, #fff6e9 0%,#ffaa00 100%);    background: -ms-linear-gradient(top, #fff6e9 0%,#ffaa00 100%);    background: linear-gradient(to bottom, #fff6e9 0%,#ffaa00 100%);}#PPMiniCart .minicart-submit img {    vertical-align: middle;    padding: 4px 0 0 2px;}',

    strings: {
        button: '&nbsp;&nbsp;Check Out with <img src="//cdnjs.cloudflare.com/ajax/libs/minicart/3.0.1/paypal_65x18.png" width="65" height="18" alt="PayPal" Title="Checkout Now"/>&nbsp;',
        subtotal: 'Subtotal:',
        discount: 'Discount:',
        processing: 'Processing...',
        empty: 'Your shopping cart is empty'
    }

};


/**
 * Mixes in the user config with the default config.
 *
 * @param {object} userConfig Configuration overrides
 * @return {object}
 */
module.exports.load = function load(userConfig) {
    return mixin(defaults, userConfig);
};

},{"./util/mixin":18}],11:[function(require,module,exports){
'use strict';


module.exports = {

    COMMANDS: { _cart: true, _xclick: true, _donations: true },

    SETTINGS: /^(?:business|currency_code|lc|paymentaction|no_shipping|cn|no_note|invoice|handling_cart|weight_cart|weight_unit|tax_cart|discount_amount_cart|discount_rate_cart|page_style|image_url|cpp_|cs|cbt|return|cancel_return|notify_url|rm|custom|charset)/,

    BN: 'MiniCart_AddToCart_WPS_US',

    KEYUP_TIMEOUT: 500,

    SHOWING_CLASS: 'minicart-showing',

    REMOVE_CLASS: 'minicart-remove',

    CLOSER_CLASS: 'minicart-closer',

    QUANTITY_CLASS: 'minicart-quantity',

    ITEM_CLASS: 'minicart-item',

    ITEM_CHANGED_CLASS: 'minicart-item-changed',

    SUBMIT_CLASS: 'minicart-submit',

    DATA_IDX: 'data-minicart-idx',

    RESET_CLASS: 'minicart-reset'

};

},{}],12:[function(require,module,exports){
'use strict';


var Cart = require('./cart'),
    View = require('./view'),
    config = require('./config'),
    minicart = {},
    cartModel,
    confModel,
    viewModel;


/**
 * Renders the Mini Cart to the page's DOM.
 *
 * @param {object} userConfig Configuration overrides
 */
minicart.render = function (userConfig) {
    confModel = minicart.config = config.load(userConfig);
    cartModel = minicart.cart = new Cart(confModel.name, confModel.duration);
    viewModel = minicart.view = new View({
        config: confModel,
        cart: cartModel
    });

    cartModel.on('add', viewModel.addItem, viewModel);
    cartModel.on('change', viewModel.changeItem, viewModel);
    cartModel.on('remove', viewModel.removeItem, viewModel);
    cartModel.on('destroy', viewModel.hide, viewModel);
};


/**
 * Resets the Mini Cart and its view model
 */
minicart.reset = function () {
    cartModel.destroy();

    viewModel.hide();
    viewModel.redraw();
};




// Export to either node or the brower window
if (typeof window === 'undefined') {
    module.exports = minicart;
} else {
    if (!window.paypal) {
        window.paypal = {};
    }

    window.paypal.minicart = minicart;
}

},{"./cart":9,"./config":10,"./view":22}],13:[function(require,module,exports){
'use strict';


var currency = require('./util/currency'),
    Pubsub = require('./util/pubsub'),
    mixin = require('./util/mixin');


var parser = {
    quantity: function (value) {
        value = parseInt(value, 10);

        if (isNaN(value) || !value) {
            value = 1;
        }

        return value;
    },
    amount: function (value) {
        return parseFloat(value) || 0;
    },
    href: function (value) {
        if (value) {
            return value;
        } else {
            return (typeof window !== 'undefined') ? window.location.href : null;
        }
    }
};


/**
 * Creates a new product.
 *
 * @constructor
 * @param {object} data Item data
 */
function Product(data) {
    data.quantity = parser.quantity(data.quantity);
    data.amount = parser.amount(data.amount);
    data.href = parser.href(data.href);

    this._data = data;
    this._options = null;
    this._discount = null;
    this._amount = null;
    this._total = null;

    Pubsub.call(this);
}


mixin(Product.prototype, Pubsub.prototype);


/**
 * Gets the product data.
 *
 * @param {string} key (Optional) A key to restrict the returned data to.
 * @return {array|string}
 */
Product.prototype.get = function get(key) {
    return (key) ? this._data[key] : this._data;
};


/**
 * Sets a value on the product. This is used rather than manually setting the
 * value so that we can fire a "change" event.
 *
 * @param {string} key
 * @param {string} value
 */
Product.prototype.set = function set(key, value) {
    var setter = parser[key];

    this._data[key] = setter ? setter(value) : value;
    this._options = null;
    this._discount = null;
    this._amount = null;
    this._total = null;

    this.fire('change', key);
};


/**
 * Parse and return the options for this product.
 *
 * @return {object}
 */
Product.prototype.options = function options() {
    var result, key, value, amount, i, j;

    if (!this._options) {
        result = [];
        i = 0;

        while ((key = this.get('on' + i))) {
            value = this.get('os' + i);
            amount = 0;
            j = 0;

            while (typeof this.get('option_select' + j) !== 'undefined') {
                if (this.get('option_select' + j) === value) {
                    amount = parser.amount(this.get('option_amount' + j));
                    break;
                }

                j++;
            }

            result.push({
                key: key,
                value: value,
                amount: amount
            });

            i++;
        }

        this._options = result;
    }

    return this._options;
};


/**
 * Parse and return the discount for this product.
 *
 * @param {object} config (Optional) Currency formatting options.
 * @return {number|string}
 */
Product.prototype.discount = function discount(config) {
    var flat, rate, num, limit, result, amount;

    if (!this._discount) {
        result = 0;
        num = parseInt(this.get('discount_num'), 10) || 0;
        limit = Math.max(num, this.get('quantity') - 1);

        if (this.get('discount_amount') !== undefined) {
            flat = parser.amount(this.get('discount_amount'));
            result += flat;
            result += parser.amount(this.get('discount_amount2') || flat) * limit;
        } else if (this.get('discount_rate') !== undefined) {
            rate = parser.amount(this.get('discount_rate'));
            amount = this.amount();

            result += rate * amount / 100;
            result += parser.amount(this.get('discount_rate2') || rate) * amount * limit / 100;
            console.log('result', result, rate, amount, limit);
        }

        this._discount = result;
    }

    return currency(this._discount, config);
};


/**
 * Parse and return the total without discounts for this product.
 *
 * @param {object} config (Optional) Currency formatting options.
 * @return {number|string}
 */
Product.prototype.amount = function amount(config) {
    var result, options, len, i;

    if (!this._amount) {
        result = this.get('amount');
        options = this.options();

        for (i = 0, len = options.length; i < len; i++) {
            result += options[i].amount;
        }

        this._amount = result;
    }

    return currency(this._amount, config);
};


/**
 * Parse and return the total for this product.
 *
 * @param {object} config (Optional) Currency formatting options.
 * @return {number|string}
 */
Product.prototype.total = function total(config) {
    var result;

    if (!this._total) {
        result  = this.get('quantity') * this.amount();
        result -= this.discount();

        this._total = parser.amount(result);
    }

    return currency(this._total, config);
};


/**
 * Determine if this product has the same data as another.
 *
 * @param {object|Product} data Other product.
 * @return {boolean}
 */
Product.prototype.isEqual = function isEqual(data) {
    var match = false;

    if (data instanceof Product) {
        data = data._data;
    }

    if (this.get('item_name') === data.item_name) {
        if (this.get('item_number') === data.item_number) {
            if (this.get('amount') === parser.amount(data.amount)) {
                var i = 0;

                match = true;

                while (typeof data['os' + i] !== 'undefined') {
                    if (this.get('os' + i) !== data['os' + i]) {
                        match = false;
                        break;
                    }

                    i++;
                }
            }
        }
    }

    return match;
};


/**
 * Determine if this product is valid.
 *
 * @return {boolean}
 */
Product.prototype.isValid = function isValid() {
    return (this.get('item_name') && this.amount() > 0);
};


/**
 * Destroys this product. Fires a "destroy" event.
 */
Product.prototype.destroy = function destroy() {
    this._data = [];
    this.fire('destroy', this);
};




module.exports = Product;

},{"./util/currency":15,"./util/mixin":18,"./util/pubsub":19}],14:[function(require,module,exports){
/* jshint quotmark:double */


"use strict";



module.exports.add = function add(el, str) {
    var re;

    if (!el) { return false; }

    if (el && el.classList && el.classList.add) {
        el.classList.add(str);
    } else {
        re = new RegExp("\\b" + str + "\\b");

        if (!re.test(el.className)) {
            el.className += " " + str;
        }
    }
};


module.exports.remove = function remove(el, str) {
    var re;

    if (!el) { return false; }

    if (el.classList && el.classList.add) {
        el.classList.remove(str);
    } else {
        re = new RegExp("\\b" + str + "\\b");

        if (re.test(el.className)) {
            el.className = el.className.replace(re, "");
        }
    }
};


module.exports.inject = function inject(el, str) {
    var style;

    if (!el) { return false; }

    if (str) {
        style = document.createElement("style");
        style.type = "text/css";

        if (style.styleSheet) {
            style.styleSheet.cssText = str;
        } else {
            style.appendChild(document.createTextNode(str));
        }

        el.appendChild(style);
    }
};

},{}],15:[function(require,module,exports){
'use strict';


var currencies = {
    AED: { before: '\u062c' },
    ANG: { before: '\u0192' },
    ARS: { before: '$', code: true },
    AUD: { before: '$', code: true },
    AWG: { before: '\u0192' },
    BBD: { before: '$', code: true },
    BGN: { before: '\u043b\u0432' },
    BMD: { before: '$', code: true },
    BND: { before: '$', code: true },
    BRL: { before: 'R$' },
    BSD: { before: '$', code: true },
    CAD: { before: '$', code: true },
    CHF: { before: '', code: true },
    CLP: { before: '$', code: true },
    CNY: { before: '\u00A5' },
    COP: { before: '$', code: true },
    CRC: { before: '\u20A1' },
    CZK: { before: 'Kc' },
    DKK: { before: 'kr' },
    DOP: { before: '$', code: true },
    EEK: { before: 'kr' },
    EUR: { before: '\u20AC' },
    GBP: { before: '\u00A3' },
    GTQ: { before: 'Q' },
    HKD: { before: '$', code: true },
    HRK: { before: 'kn' },
    HUF: { before: 'Ft' },
    IDR: { before: 'Rp' },
    ILS: { before: '\u20AA' },
    INR: { before: 'Rs.' },
    ISK: { before: 'kr' },
    JMD: { before: 'J$' },
    JPY: { before: '\u00A5' },
    KRW: { before: '\u20A9' },
    KYD: { before: '$', code: true },
    LTL: { before: 'Lt' },
    LVL: { before: 'Ls' },
    MXN: { before: '$', code: true },
    MYR: { before: 'RM' },
    NOK: { before: 'kr' },
    NZD: { before: '$', code: true },
    PEN: { before: 'S/' },
    PHP: { before: 'Php' },
    PLN: { before: 'z' },
    QAR: { before: '\ufdfc' },
    RON: { before: 'lei' },
    RUB: { before: '\u0440\u0443\u0431' },
    SAR: { before: '\ufdfc' },
    SEK: { before: 'kr' },
    SGD: { before: '$', code: true },
    THB: { before: '\u0E3F' },
    TRY: { before: 'TL' },
    TTD: { before: 'TT$' },
    TWD: { before: 'NT$' },
    UAH: { before: '\u20b4' },
    USD: { before: '$', code: true },
    UYU: { before: '$U' },
    VEF: { before: 'Bs' },
    VND: { before: '\u20ab' },
    XCD: { before: '$', code: true },
    ZAR: { before: 'R' }
};


module.exports = function currency(amount, config) {
    var code = config && config.currency || 'USD',
        value = currencies[code],
        before = value.before || '',
        after = value.after || '',
        length = value.length || 2,
        showCode = value.code && config && config.showCode,
        result = amount;

    if (config && config.format) {
        result = before + result.toFixed(length) + after;
    }

    if (showCode) {
        result += ' ' + code;
    }

    return result;
};

},{}],16:[function(require,module,exports){
'use strict';


module.exports = (function (window, document) {

    /**
     * Events are added here for easy reference
     */
    var cache = [];

    // NOOP for Node
    if (!document) {
        return {
            add: function () {},
            remove: function () {}
        };
        // Non-IE events
    } else if (document.addEventListener) {
        return {
            /**
             * Add an event to an object and optionally adjust it's scope
             *
             * @param obj {HTMLElement} The object to attach the event to
             * @param type {string} The type of event excluding "on"
             * @param fn {function} The function
             * @param scope {object} Object to adjust the scope to (optional)
             */
            add: function (obj, type, fn, scope) {
                scope = scope || obj;

                var wrappedFn = function (e) { fn.call(scope, e); };

                obj.addEventListener(type, wrappedFn, false);
                cache.push([obj, type, fn, wrappedFn]);
            },


            /**
             * Remove an event from an object
             *
             * @param obj {HTMLElement} The object to remove the event from
             * @param type {string} The type of event excluding "on"
             * @param fn {function} The function
             */
            remove: function (obj, type, fn) {
                var wrappedFn, item, len = cache.length, i;

                for (i = 0; i < len; i++) {
                    item = cache[i];

                    if (item[0] === obj && item[1] === type && item[2] === fn) {
                        wrappedFn = item[3];

                        if (wrappedFn) {
                            obj.removeEventListener(type, wrappedFn, false);
                            delete cache[i];
                        }
                    }
                }
            }
        };

        // IE events
    } else if (document.attachEvent) {
        return {
            /**
             * Add an event to an object and optionally adjust it's scope (IE)
             *
             * @param obj {HTMLElement} The object to attach the event to
             * @param type {string} The type of event excluding "on"
             * @param fn {function} The function
             * @param scope {object} Object to adjust the scope to (optional)
             */
            add: function (obj, type, fn, scope) {
                scope = scope || obj;

                var wrappedFn = function () {
                    var e = window.event;
                    e.target = e.target || e.srcElement;

                    e.preventDefault = function () {
                        e.returnValue = false;
                    };

                    fn.call(scope, e);
                };

                obj.attachEvent('on' + type, wrappedFn);
                cache.push([obj, type, fn, wrappedFn]);
            },


            /**
             * Remove an event from an object (IE)
             *
             * @param obj {HTMLElement} The object to remove the event from
             * @param type {string} The type of event excluding "on"
             * @param fn {function} The function
             */
            remove: function (obj, type, fn) {
                var wrappedFn, item, len = cache.length, i;

                for (i = 0; i < len; i++) {
                    item = cache[i];

                    if (item[0] === obj && item[1] === type && item[2] === fn) {
                        wrappedFn = item[3];

                        if (wrappedFn) {
                            obj.detachEvent('on' + type, wrappedFn);
                            delete cache[i];
                        }
                    }
                }
            }
        };
    }

})(typeof window === 'undefined' ? null : window, typeof document === 'undefined' ? null : document);
},{}],17:[function(require,module,exports){
'use strict';


var forms = module.exports = {

    parse: function parse(form) {
        var raw = form.elements,
            data = {},
            pair, value, i, len;

        for (i = 0, len = raw.length; i < len; i++) {
            pair = raw[i];

            if ((value = forms.getInputValue(pair))) {
                data[pair.name] = value;
            }
        }

        return data;
    },


    getInputValue: function getInputValue(input) {
        var tag = input.tagName.toLowerCase();

        if (tag === 'select') {
            return input.options[input.selectedIndex].value;
        } else if (tag === 'textarea') {
            return input.innerText;
        } else {
            if (input.type === 'radio') {
                return (input.checked) ? input.value : null;
            } else if (input.type === 'checkbox') {
                return (input.checked) ? input.value : null;
            } else {
                return input.value;
            }
        }
    }

};
},{}],18:[function(require,module,exports){
'use strict';


var mixin = module.exports = function mixin(dest, source) {
    var value;

    for (var key in source) {
        value = source[key];

        if (value && value.constructor === Object) {
            if (!dest[key]) {
                dest[key] = value;
            } else {
                mixin(dest[key] || {}, value);
            }
        } else {
            dest[key] = value;
        }
    }

    return dest;
};

},{}],19:[function(require,module,exports){
'use strict';


function Pubsub() {
    this._eventCache = {};
}


Pubsub.prototype.on = function on(name, fn, scope) {
    var cache = this._eventCache[name];

    if (!cache) {
        cache = this._eventCache[name] = [];
    }

    cache.push([fn, scope]);
};


Pubsub.prototype.off = function off(name, fn) {
    var cache = this._eventCache[name],
        i, len;

    if (cache) {
        for (i = 0, len = cache.length; i < len; i++) {
            if (cache[i] === fn) {
                cache = cache.splice(i, 1);
            }
        }
    }
};


Pubsub.prototype.fire = function on(name) {
    var cache = this._eventCache[name], i, len, fn, scope;

    if (cache) {
        for (i = 0, len = cache.length; i < len; i++) {
            fn = cache[i][0];
            scope = cache[i][1] || this;

            if (typeof fn === 'function') {
                fn.apply(scope, Array.prototype.slice.call(arguments, 1));
            }
        }
    }
};


module.exports = Pubsub;

},{}],20:[function(require,module,exports){
'use strict';


var Storage = module.exports = function Storage(name, duration) {
    this._name = name;
    this._duration = duration || 30;
};


var proto = Storage.prototype;


proto.load = function () {
    if (typeof window === 'object' && window.localStorage) {
        var data = window.localStorage.getItem(this._name), today, expires;

        if (data) {
            data = JSON.parse(decodeURIComponent(data));
        }

        if (data && data.expires) {
            today = new Date();
            expires = new Date(data.expires);

            if (today > expires) {
                this.destroy();
                return;
            }
        }

        return data && data.value;
    }
};


proto.save = function (data) {
    if (typeof window === 'object' && window.localStorage) {
        var expires = new Date(), wrapped;

        expires.setTime(expires.getTime() + this._duration * 24 * 60 * 60 * 1000);

        wrapped = {
            value: data,
            expires: expires.toGMTString()
        };

        window.localStorage.setItem(this._name, encodeURIComponent(JSON.stringify(wrapped)));
    }
};


proto.destroy = function () {
    if (typeof window === 'object' && window.localStorage) {
        window.localStorage.removeItem(this._name);
    }
};

},{}],21:[function(require,module,exports){
'use strict';


var ejs = require('ejs');


module.exports = function template(str, data) {
    return ejs.render(str, data);
};


// Workaround for IE 8's lack of support
if (!String.prototype.trim) {
    String.prototype.trim = function () {
        return this.replace(/^\s+|\s+$/g, '');
    };
}

},{"ejs":6}],22:[function(require,module,exports){
'use strict';


var config = require('./config'),
    events = require('./util/events'),
    template = require('./util/template'),
    forms = require('./util/forms'),
    css = require('./util/css'),
    viewevents = require('./viewevents'),
    constants = require('./constants');



/**
 * Creates a view model.
 *
 * @constructor
 * @param {object} model
 */
function View(model) {
    var wrapper;

    this.el = wrapper = document.createElement('div');
    this.model = model;
    this.isShowing = false;

    // HTML
    wrapper.id = config.name;
    config.parent.appendChild(wrapper);

    // CSS
    css.inject(document.getElementsByTagName('head')[0], config.styles);

    // JavaScript
    events.add(document, ('ontouchstart' in window) ? 'touchstart' : 'click', viewevents.click, this);
    events.add(document, 'keyup', viewevents.keyup, this);
    events.add(document, 'readystatechange', viewevents.readystatechange, this);
    events.add(window, 'pageshow', viewevents.pageshow, this);
}


/**
 * Tells the view to redraw
 */
View.prototype.redraw = function redraw() {
    this.el.innerHTML = template(config.template, this.model);
};


/**
 * Tells the view to show
 */
View.prototype.show = function show() {
    if (!this.isShowing) {
        css.add(document.body, constants.SHOWING_CLASS);
        this.isShowing = true;
    }
};


/**
 * Tells the view to hide
 */
View.prototype.hide = function hide() {
    if (this.isShowing) {
        css.remove(document.body, constants.SHOWING_CLASS);
        this.isShowing = false;
    }
};


/**
 * Toggles the visibility of the view
 */
View.prototype.toggle = function toggle() {
    this[this.isShowing ? 'hide' : 'show']();
};


/**
 * Binds cart submit events to a form.
 *
 * @param {HTMLElement} form
 * @return {booealn}
 */
View.prototype.bind = function bind(form) {
    var that = this;

    if (!constants.COMMANDS[form.cmd.value]) {
        return false;
    }

    if (form.display) {
        events.add(form, 'submit', function (e) {
            e.preventDefault();
            that.show();
        });
    } else {
        events.add(form, 'submit', function (e) {
            e.preventDefault(e);
            that.model.cart.add(forms.parse(form));
        });
    }

    return true;
};


/**
 * Adds an item to the view.
 *
 * @param {number} idx
 * @param {object} data
 */
View.prototype.addItem = function addItem(idx, data) {
    this.redraw();
    this.show();

    var els = this.el.getElementsByClassName(constants.ITEM_CLASS);
    css.add(els[idx], constants.ITEM_CHANGED_CLASS);
};


/**
 * Changes an item in the view.
 *
 * @param {number} idx
 * @param {object} data
 */
View.prototype.changeItem = function changeItem(idx, data) {
    this.redraw();
    this.show();

    var els = this.el.getElementsByClassName(constants.ITEM_CLASS);
    css.add(els[idx], constants.ITEM_CHANGED_CLASS);
};


/**
 * Removes an item from the view.
 *
 * @param {number} idx
 */
View.prototype.removeItem = function removeItem(idx) {
    this.redraw();
};




module.exports = View;

},{"./config":10,"./constants":11,"./util/css":14,"./util/events":16,"./util/forms":17,"./util/template":21,"./viewevents":23}],23:[function(require,module,exports){
'use strict';


var constants = require('./constants'),
    events = require('./util/events'),
    viewevents;


module.exports = viewevents = {

    click: function (evt) {
        var target = evt.target,
            className = target.className;

        if (this.isShowing) {
            // Cart checkout button
            if (className === constants.SUBMIT_CLASS) {
                this.model.cart.checkout(evt);
            // Cart close button
            } else if (className === constants.CLOSER_CLASS) {
                this.hide();
            // Clear Cart
             } else if (className === constants.RESET_CLASS) {
               paypal.minicart.reset();
               paypal.minicart.view.show();
            // Product remove button
            } else if (className === constants.REMOVE_CLASS) {
                this.model.cart.remove(target.getAttribute(constants.DATA_IDX));
            // Product quantity input
            } else if (className === constants.QUANTITY_CLASS) {
                target[target.setSelectionRange ? 'setSelectionRange' : 'select'](0, 999);
            // Outside the cart
            } else if (!(/input|button|select|option/i.test(target.tagName))) {
                while (target.nodeType === 1) {
                    if (target === this.el) {
                        return;
                    }

                    target = target.parentNode;
                }

                this.hide();
            }
        }
    },


    keyup: function (evt) {
        var that = this,
            target = evt.target,
            timer;

        if (target.className === constants.QUANTITY_CLASS) {
            timer = setTimeout(function () {
                var idx = parseInt(target.getAttribute(constants.DATA_IDX), 10),
                    cart = that.model.cart,
                    product = cart.items(idx),
                    quantity = parseInt(target.value, 10);

                if (product) {
                    if (quantity > 0) {
                        product.set('quantity', quantity);
                    } else if (quantity === 0) {
                        cart.remove(idx);
                    }
                }
            }, constants.KEYUP_TIMEOUT);
        }
    },


    readystatechange: function () {
        if (/interactive|complete/.test(document.readyState)) {
            var forms, form, i, len;

            // Bind to page's forms
            forms = document.getElementsByTagName('form');

            for (i = 0, len = forms.length; i < len; i++) {
                form = forms[i];

                if (form.cmd && constants.COMMANDS[form.cmd.value]) {
                    this.bind(form);
                }
            }

            // Do the initial render when the buttons are ready
            this.redraw();

            // Only run this once
            events.remove(document, 'readystatechange', viewevents.readystatechange);
        }
    },


    pageshow: function (evt) {
        if (evt.persisted) {
            this.redraw();
            this.hide();
        }
    }

};

},{"./constants":11,"./util/events":16}]},{},[9,10,11,12,13,14,15,16,17,18,19,20,21,22,23])
;