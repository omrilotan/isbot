// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../index.mjs":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createIsbotFromList = exports.createIsbot = void 0;
exports.getPattern = getPattern;
exports.isbot = isbot;
exports.list = exports.isbotPatterns = exports.isbotPattern = exports.isbotNaive = exports.isbotMatches = exports.isbotMatch = void 0;
// src/patterns.json
var patterns_default = [" daum[ /]", " deusu/", "(?:^|[^g])news(?!sapphire)", "(?<! (?:channel/|google/))google(?!(app|/google| pixel))", "(?<! cu)bots?(?:\\b|_)", "(?<!(?:lib))http", "(?<![hg]m)score", "(?<!cam)scan", "24x7", "@[a-z][\\w-]+\\.", "\\(\\)", "\\.com\\b", "\\b\\w+\\.ai", "\\bmanus-user/", "\\bort/", "\\bperl\\b", "\\bsecurityheaders\\b", "\\btime/", "\\|", "^[\\w \\.\\-\\(?:\\):%]+(?:/v?\\d+(?:\\.\\d+)?(?:\\.\\d{1,10})*?)?(?:,|$)", "^[^ ]{50,}$", "^\\d+\\b", "^\\W", "^\\w*search\\b", "^\\w+/[\\w\\(\\)]*$", "^\\w+/\\d\\.\\d\\s\\([\\w@]+\\)$", "^active", "^ad muncher", "^amaya", "^apache/", "^avsdevicesdk/", "^azure", "^biglotron", "^bot", "^bw/", "^clamav[ /]", "^client/", "^cobweb/", "^custom", "^ddg[_-]android", "^discourse", "^dispatch/\\d", "^downcast/", "^duckduckgo", "^email", "^facebook", "^getright/", "^gozilla/", "^hobbit", "^hotzonu", "^hwcdn/", "^igetter/", "^jeode/", "^jetty/", "^jigsaw", "^microsoft bits", "^movabletype", "^mozilla/\\d\\.\\d\\s[\\w\\.-]+$", "^mozilla/\\d\\.\\d\\s\\(compatible;?(?:\\s[\\w\\d-.]+\\/\\d+\\.\\d+)?\\)$", "^navermailapp", "^netsurf", "^offline", "^openai/", "^owler", "^php", "^postman", "^python", "^rank", "^read", "^reed", "^rest", "^rss", "^snapchat", "^space bison", "^svn", "^swcd ", "^taringa", "^thumbor/", "^track", "^w3c", "^webbandit/", "^webcopier", "^wget", "^whatsapp", "^wordpress", "^xenu link sleuth", "^yahoo", "^yandex", "^zdm/\\d", "^zoom marketplace/", "advisor", "agent\\b", "analyzer", "archive", "ask jeeves/teoma", "audit", "bit\\.ly/", "bluecoat drtr", "browsex", "burpcollaborator", "capture", "catch", "check\\b", "checker", "chrome-lighthouse", "chromeframe", "classifier", "cloudflare", "convertify", "crawl", "cypress/", "dareboost", "datanyze", "dejaclick", "detect", "dmbrowser", "download", "exaleadcloudview", "feed", "fetcher", "firephp", "functionize", "grab", "headless", "httrack", "hubspot marketing grader", "ibisbrowser", "infrawatch", "insight", "inspect", "iplabel", "java(?!;)", "library", "linkcheck", "mail\\.ru/", "manager", "measure", "neustar wpm", "node\\b", "nutch", "offbyone", "onetrust", "optimize", "pageburst", "pagespeed", "parser", "phantomjs", "pingdom", "powermarks", "preview", "proxy", "ptst[ /]\\d", "retriever", "rexx;", "rigor", "rss\\b", "scrape", "server", "sogou", "sparkler/", "speedcurve", "spider", "splash", "statuscake", "supercleaner", "synapse", "synthetic", "tools", "torrent", "transcoder", "url", "validator", "virtuoso", "wappalyzer", "webglance", "webkit2png", "whatcms/", "xtate/"];

// src/pattern.ts
var fullPattern = " daum[ /]| deusu/|(?:^|[^g])news(?!sapphire)|(?<! (?:channel/|google/))google(?!(app|/google| pixel))|(?<! cu)bots?(?:\\b|_)|(?<!(?:lib))http|(?<![hg]m)score|(?<!cam)scan|24x7|@[a-z][\\w-]+\\.|\\(\\)|\\.com\\b|\\b\\w+\\.ai|\\bmanus-user/|\\bort/|\\bperl\\b|\\bsecurityheaders\\b|\\btime/|\\||^[\\w \\.\\-\\(?:\\):%]+(?:/v?\\d+(?:\\.\\d+)?(?:\\.\\d{1,10})*?)?(?:,|$)|^[^ ]{50,}$|^\\d+\\b|^\\W|^\\w*search\\b|^\\w+/[\\w\\(\\)]*$|^\\w+/\\d\\.\\d\\s\\([\\w@]+\\)$|^active|^ad muncher|^amaya|^apache/|^avsdevicesdk/|^azure|^biglotron|^bot|^bw/|^clamav[ /]|^client/|^cobweb/|^custom|^ddg[_-]android|^discourse|^dispatch/\\d|^downcast/|^duckduckgo|^email|^facebook|^getright/|^gozilla/|^hobbit|^hotzonu|^hwcdn/|^igetter/|^jeode/|^jetty/|^jigsaw|^microsoft bits|^movabletype|^mozilla/\\d\\.\\d\\s[\\w\\.-]+$|^mozilla/\\d\\.\\d\\s\\(compatible;?(?:\\s[\\w\\d-.]+\\/\\d+\\.\\d+)?\\)$|^navermailapp|^netsurf|^offline|^openai/|^owler|^php|^postman|^python|^rank|^read|^reed|^rest|^rss|^snapchat|^space bison|^svn|^swcd |^taringa|^thumbor/|^track|^w3c|^webbandit/|^webcopier|^wget|^whatsapp|^wordpress|^xenu link sleuth|^yahoo|^yandex|^zdm/\\d|^zoom marketplace/|advisor|agent\\b|analyzer|archive|ask jeeves/teoma|audit|bit\\.ly/|bluecoat drtr|browsex|burpcollaborator|capture|catch|check\\b|checker|chrome-lighthouse|chromeframe|classifier|cloudflare|convertify|crawl|cypress/|dareboost|datanyze|dejaclick|detect|dmbrowser|download|exaleadcloudview|feed|fetcher|firephp|functionize|grab|headless|httrack|hubspot marketing grader|ibisbrowser|infrawatch|insight|inspect|iplabel|java(?!;)|library|linkcheck|mail\\.ru/|manager|measure|neustar wpm|node\\b|nutch|offbyone|onetrust|optimize|pageburst|pagespeed|parser|phantomjs|pingdom|powermarks|preview|proxy|ptst[ /]\\d|retriever|rexx;|rigor|rss\\b|scrape|server|sogou|sparkler/|speedcurve|spider|splash|statuscake|supercleaner|synapse|synthetic|tools|torrent|transcoder|url|validator|virtuoso|wappalyzer|webglance|webkit2png|whatcms/|xtate/";

// src/index.ts
var naivePattern = /bot|crawl|http|lighthouse|scan|search|spider/i;
var pattern;
function getPattern() {
  if (pattern instanceof RegExp) {
    return pattern;
  }
  try {
    pattern = new RegExp(fullPattern, "i");
  } catch (error) {
    pattern = naivePattern;
  }
  return pattern;
}
var list = exports.list = patterns_default;
var isbotNaive = exports.isbotNaive = function isbotNaive(userAgent) {
  return Boolean(userAgent) && naivePattern.test(userAgent);
};
function isbot(userAgent) {
  return Boolean(userAgent) && getPattern().test(userAgent);
}
var createIsbot = exports.createIsbot = function createIsbot(customPattern) {
  return function (userAgent) {
    return Boolean(userAgent) && customPattern.test(userAgent);
  };
};
var createIsbotFromList = exports.createIsbotFromList = function createIsbotFromList(list2) {
  var pattern2 = new RegExp(list2.join("|"), "i");
  return function (userAgent) {
    return Boolean(userAgent) && pattern2.test(userAgent);
  };
};
var isbotMatch = exports.isbotMatch = function isbotMatch(userAgent) {
  var _a, _b;
  return (_b = (_a = userAgent == null ? void 0 : userAgent.match(getPattern())) == null ? void 0 : _a[0]) != null ? _b : null;
};
var isbotMatches = exports.isbotMatches = function isbotMatches(userAgent) {
  return list.map(function (part) {
    var _a;
    return (_a = userAgent == null ? void 0 : userAgent.match(new RegExp(part, "i"))) == null ? void 0 : _a[0];
  }).filter(Boolean);
};
var isbotPattern = exports.isbotPattern = function isbotPattern(userAgent) {
  var _a;
  return userAgent ? (_a = list.find(function (pattern2) {
    return new RegExp(pattern2, "i").test(userAgent);
  })) != null ? _a : null : null;
};
var isbotPatterns = exports.isbotPatterns = function isbotPatterns(userAgent) {
  return userAgent ? list.filter(function (pattern2) {
    return new RegExp(pattern2, "i").test(userAgent);
  }) : [];
};
},{}],"script.ts":[function(require,module,exports) {
"use strict";

var _ = require("..");
{
  var textarea = document.querySelector("textarea");
  var output = document.querySelector("output");
  var code = document.querySelector("pre code");
  var copyLink = document.querySelector('[id="copy-link"]');
  var timer;
  var url = new URL(window.location.href);
  var ua = url.searchParams.get("ua");
  textarea.childNodes.forEach(function (child) {
    var _child$parentNode;
    return (_child$parentNode = child.parentNode) === null || _child$parentNode === void 0 ? void 0 : _child$parentNode.removeChild(child);
  });
  textarea.appendChild(document.createTextNode(ua || navigator.userAgent));
  textarea.addEventListener("keyup", change);
  textarea.addEventListener("paste", change);
  textarea.addEventListener("focus", function () {
    return textarea.select();
  });
  check();
  function change(_ref) {
    var target = _ref.target;
    var value = target.value;
    clearTimeout(timer);
    timer = setTimeout(check, 200, value);
  }
  function append(parent, tag, string) {
    if (tag) {
      var ele = document.createElement("kbd");
      ele.appendChild(document.createTextNode("".concat(string)));
      parent.appendChild(ele);
    } else {
      parent.appendChild(document.createTextNode("".concat(string)));
    }
  }
  function details(ua) {
    var fragment = document.createDocumentFragment();
    var is = (0, _.isbot)(ua);
    if (is) {
      var found = (0, _.isbotMatch)(ua);
      var patterns = (0, _.isbotPatterns)(ua);
      var pattern = patterns.find(function (pattern) {
        return new RegExp(pattern, "i").test(found);
      });
      console.log(patterns, pattern);
      append(fragment, null, "I think so, yes\n");
      append(fragment, null, "The substring ");
      append(fragment, "kbd", found);
      append(fragment, null, " matches the pattern ");
      append(fragment, "kbd", pattern);
    } else {
      append(fragment, null, "I don't think so, no\nI could not find a pattern I recognise");
    }
    return fragment;
  }
  function check() {
    var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : textarea.innerHTML;
    value = value.trim();
    while (output.firstChild) {
      output.removeChild(output.firstChild);
    }
    if (value === "") {
      output.appendChild(document.createTextNode("Insert user agent string in the text box"));
      return;
    }
    output.appendChild(details(value));
  }
  copyLink.addEventListener("click", function (event) {
    event.preventDefault();
    var _document$location = document.location,
      protocol = _document$location.protocol,
      host = _document$location.host,
      pathname = _document$location.pathname;
    copyToClipboard([protocol, "//", host, pathname, "?ua=", encodeURIComponent(textarea.value)].join(""), "link copied to clipboard");
  });
  code.appendChild(document.createTextNode((0, _.getPattern)().toString()));
  code.style.userSelect = "all";
  code.addEventListener("click", function () {
    var range = document.createRange();
    range.selectNodeContents(code);
    var selection = window.getSelection();
    selection === null || selection === void 0 || selection.removeAllRanges();
    selection === null || selection === void 0 || selection.addRange(range);
    copyToClipboard(code.textContent || "", "pattern copied to clipboard");
  });
  function copyToClipboard(text) {
    var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "copied to clipboard";
    navigator.clipboard.writeText(text);
    var dialog = document.createElement("dialog");
    dialog.appendChild(document.createTextNode(message));
    document.body.appendChild(dialog);
    dialog.showModal();
    setTimeout(function () {
      dialog.addEventListener("transitionend", function () {
        dialog.close();
        document.body.removeChild(dialog);
      });
      dialog.style.opacity = "0";
    }, 1000);
  }
}
},{"..":"../index.mjs"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62360" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.ts"], null)
//# sourceMappingURL=/script.221c08a2.js.map