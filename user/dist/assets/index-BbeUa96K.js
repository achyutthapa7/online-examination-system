(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) r(s);
  new MutationObserver((s) => {
    for (const o of s)
      if (o.type === "childList")
        for (const i of o.addedNodes)
          i.tagName === "LINK" && i.rel === "modulepreload" && r(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(s) {
    const o = {};
    return (
      s.integrity && (o.integrity = s.integrity),
      s.referrerPolicy && (o.referrerPolicy = s.referrerPolicy),
      s.crossOrigin === "use-credentials"
        ? (o.credentials = "include")
        : s.crossOrigin === "anonymous"
        ? (o.credentials = "omit")
        : (o.credentials = "same-origin"),
      o
    );
  }
  function r(s) {
    if (s.ep) return;
    s.ep = !0;
    const o = n(s);
    fetch(s.href, o);
  }
})();
function nh(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var rh = { exports: {} },
  Ji = {},
  sh = { exports: {} },
  W = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var co = Symbol.for("react.element"),
  G0 = Symbol.for("react.portal"),
  X0 = Symbol.for("react.fragment"),
  J0 = Symbol.for("react.strict_mode"),
  Z0 = Symbol.for("react.profiler"),
  ey = Symbol.for("react.provider"),
  ty = Symbol.for("react.context"),
  ny = Symbol.for("react.forward_ref"),
  ry = Symbol.for("react.suspense"),
  sy = Symbol.for("react.memo"),
  oy = Symbol.for("react.lazy"),
  Kc = Symbol.iterator;
function iy(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (Kc && e[Kc]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var oh = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  ih = Object.assign,
  lh = {};
function Kr(e, t, n) {
  (this.props = e),
    (this.context = t),
    (this.refs = lh),
    (this.updater = n || oh);
}
Kr.prototype.isReactComponent = {};
Kr.prototype.setState = function (e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error(
      "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
    );
  this.updater.enqueueSetState(this, e, t, "setState");
};
Kr.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function ah() {}
ah.prototype = Kr.prototype;
function ku(e, t, n) {
  (this.props = e),
    (this.context = t),
    (this.refs = lh),
    (this.updater = n || oh);
}
var Tu = (ku.prototype = new ah());
Tu.constructor = ku;
ih(Tu, Kr.prototype);
Tu.isPureReactComponent = !0;
var Yc = Array.isArray,
  uh = Object.prototype.hasOwnProperty,
  Ru = { current: null },
  ch = { key: !0, ref: !0, __self: !0, __source: !0 };
function dh(e, t, n) {
  var r,
    s = {},
    o = null,
    i = null;
  if (t != null)
    for (r in (t.ref !== void 0 && (i = t.ref),
    t.key !== void 0 && (o = "" + t.key),
    t))
      uh.call(t, r) && !ch.hasOwnProperty(r) && (s[r] = t[r]);
  var l = arguments.length - 2;
  if (l === 1) s.children = n;
  else if (1 < l) {
    for (var a = Array(l), u = 0; u < l; u++) a[u] = arguments[u + 2];
    s.children = a;
  }
  if (e && e.defaultProps)
    for (r in ((l = e.defaultProps), l)) s[r] === void 0 && (s[r] = l[r]);
  return {
    $$typeof: co,
    type: e,
    key: o,
    ref: i,
    props: s,
    _owner: Ru.current,
  };
}
function ly(e, t) {
  return {
    $$typeof: co,
    type: e.type,
    key: t,
    ref: e.ref,
    props: e.props,
    _owner: e._owner,
  };
}
function Ou(e) {
  return typeof e == "object" && e !== null && e.$$typeof === co;
}
function ay(e) {
  var t = { "=": "=0", ":": "=2" };
  return (
    "$" +
    e.replace(/[=:]/g, function (n) {
      return t[n];
    })
  );
}
var Gc = /\/+/g;
function Ol(e, t) {
  return typeof e == "object" && e !== null && e.key != null
    ? ay("" + e.key)
    : t.toString(36);
}
function Jo(e, t, n, r, s) {
  var o = typeof e;
  (o === "undefined" || o === "boolean") && (e = null);
  var i = !1;
  if (e === null) i = !0;
  else
    switch (o) {
      case "string":
      case "number":
        i = !0;
        break;
      case "object":
        switch (e.$$typeof) {
          case co:
          case G0:
            i = !0;
        }
    }
  if (i)
    return (
      (i = e),
      (s = s(i)),
      (e = r === "" ? "." + Ol(i, 0) : r),
      Yc(s)
        ? ((n = ""),
          e != null && (n = e.replace(Gc, "$&/") + "/"),
          Jo(s, t, n, "", function (u) {
            return u;
          }))
        : s != null &&
          (Ou(s) &&
            (s = ly(
              s,
              n +
                (!s.key || (i && i.key === s.key)
                  ? ""
                  : ("" + s.key).replace(Gc, "$&/") + "/") +
                e
            )),
          t.push(s)),
      1
    );
  if (((i = 0), (r = r === "" ? "." : r + ":"), Yc(e)))
    for (var l = 0; l < e.length; l++) {
      o = e[l];
      var a = r + Ol(o, l);
      i += Jo(o, t, n, a, s);
    }
  else if (((a = iy(e)), typeof a == "function"))
    for (e = a.call(e), l = 0; !(o = e.next()).done; )
      (o = o.value), (a = r + Ol(o, l++)), (i += Jo(o, t, n, a, s));
  else if (o === "object")
    throw (
      ((t = String(e)),
      Error(
        "Objects are not valid as a React child (found: " +
          (t === "[object Object]"
            ? "object with keys {" + Object.keys(e).join(", ") + "}"
            : t) +
          "). If you meant to render a collection of children, use an array instead."
      ))
    );
  return i;
}
function Oo(e, t, n) {
  if (e == null) return e;
  var r = [],
    s = 0;
  return (
    Jo(e, r, "", "", function (o) {
      return t.call(n, o, s++);
    }),
    r
  );
}
function uy(e) {
  if (e._status === -1) {
    var t = e._result;
    (t = t()),
      t.then(
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 1), (e._result = n));
        },
        function (n) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 2), (e._result = n));
        }
      ),
      e._status === -1 && ((e._status = 0), (e._result = t));
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var Ue = { current: null },
  Zo = { transition: null },
  cy = {
    ReactCurrentDispatcher: Ue,
    ReactCurrentBatchConfig: Zo,
    ReactCurrentOwner: Ru,
  };
function fh() {
  throw Error("act(...) is not supported in production builds of React.");
}
W.Children = {
  map: Oo,
  forEach: function (e, t, n) {
    Oo(
      e,
      function () {
        t.apply(this, arguments);
      },
      n
    );
  },
  count: function (e) {
    var t = 0;
    return (
      Oo(e, function () {
        t++;
      }),
      t
    );
  },
  toArray: function (e) {
    return (
      Oo(e, function (t) {
        return t;
      }) || []
    );
  },
  only: function (e) {
    if (!Ou(e))
      throw Error(
        "React.Children.only expected to receive a single React element child."
      );
    return e;
  },
};
W.Component = Kr;
W.Fragment = X0;
W.Profiler = Z0;
W.PureComponent = ku;
W.StrictMode = J0;
W.Suspense = ry;
W.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = cy;
W.act = fh;
W.cloneElement = function (e, t, n) {
  if (e == null)
    throw Error(
      "React.cloneElement(...): The argument must be a React element, but you passed " +
        e +
        "."
    );
  var r = ih({}, e.props),
    s = e.key,
    o = e.ref,
    i = e._owner;
  if (t != null) {
    if (
      (t.ref !== void 0 && ((o = t.ref), (i = Ru.current)),
      t.key !== void 0 && (s = "" + t.key),
      e.type && e.type.defaultProps)
    )
      var l = e.type.defaultProps;
    for (a in t)
      uh.call(t, a) &&
        !ch.hasOwnProperty(a) &&
        (r[a] = t[a] === void 0 && l !== void 0 ? l[a] : t[a]);
  }
  var a = arguments.length - 2;
  if (a === 1) r.children = n;
  else if (1 < a) {
    l = Array(a);
    for (var u = 0; u < a; u++) l[u] = arguments[u + 2];
    r.children = l;
  }
  return { $$typeof: co, type: e.type, key: s, ref: o, props: r, _owner: i };
};
W.createContext = function (e) {
  return (
    (e = {
      $$typeof: ty,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (e.Provider = { $$typeof: ey, _context: e }),
    (e.Consumer = e)
  );
};
W.createElement = dh;
W.createFactory = function (e) {
  var t = dh.bind(null, e);
  return (t.type = e), t;
};
W.createRef = function () {
  return { current: null };
};
W.forwardRef = function (e) {
  return { $$typeof: ny, render: e };
};
W.isValidElement = Ou;
W.lazy = function (e) {
  return { $$typeof: oy, _payload: { _status: -1, _result: e }, _init: uy };
};
W.memo = function (e, t) {
  return { $$typeof: sy, type: e, compare: t === void 0 ? null : t };
};
W.startTransition = function (e) {
  var t = Zo.transition;
  Zo.transition = {};
  try {
    e();
  } finally {
    Zo.transition = t;
  }
};
W.unstable_act = fh;
W.useCallback = function (e, t) {
  return Ue.current.useCallback(e, t);
};
W.useContext = function (e) {
  return Ue.current.useContext(e);
};
W.useDebugValue = function () {};
W.useDeferredValue = function (e) {
  return Ue.current.useDeferredValue(e);
};
W.useEffect = function (e, t) {
  return Ue.current.useEffect(e, t);
};
W.useId = function () {
  return Ue.current.useId();
};
W.useImperativeHandle = function (e, t, n) {
  return Ue.current.useImperativeHandle(e, t, n);
};
W.useInsertionEffect = function (e, t) {
  return Ue.current.useInsertionEffect(e, t);
};
W.useLayoutEffect = function (e, t) {
  return Ue.current.useLayoutEffect(e, t);
};
W.useMemo = function (e, t) {
  return Ue.current.useMemo(e, t);
};
W.useReducer = function (e, t, n) {
  return Ue.current.useReducer(e, t, n);
};
W.useRef = function (e) {
  return Ue.current.useRef(e);
};
W.useState = function (e) {
  return Ue.current.useState(e);
};
W.useSyncExternalStore = function (e, t, n) {
  return Ue.current.useSyncExternalStore(e, t, n);
};
W.useTransition = function () {
  return Ue.current.useTransition();
};
W.version = "18.3.1";
sh.exports = W;
var v = sh.exports;
const V = nh(v);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var dy = v,
  fy = Symbol.for("react.element"),
  hy = Symbol.for("react.fragment"),
  py = Object.prototype.hasOwnProperty,
  my = dy.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  yy = { key: !0, ref: !0, __self: !0, __source: !0 };
function hh(e, t, n) {
  var r,
    s = {},
    o = null,
    i = null;
  n !== void 0 && (o = "" + n),
    t.key !== void 0 && (o = "" + t.key),
    t.ref !== void 0 && (i = t.ref);
  for (r in t) py.call(t, r) && !yy.hasOwnProperty(r) && (s[r] = t[r]);
  if (e && e.defaultProps)
    for (r in ((t = e.defaultProps), t)) s[r] === void 0 && (s[r] = t[r]);
  return {
    $$typeof: fy,
    type: e,
    key: o,
    ref: i,
    props: s,
    _owner: my.current,
  };
}
Ji.Fragment = hy;
Ji.jsx = hh;
Ji.jsxs = hh;
rh.exports = Ji;
var c = rh.exports,
  ph = { exports: {} },
  st = {},
  mh = { exports: {} },
  yh = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
  function t(T, F) {
    var z = T.length;
    T.push(F);
    e: for (; 0 < z; ) {
      var Q = (z - 1) >>> 1,
        te = T[Q];
      if (0 < s(te, F)) (T[Q] = F), (T[z] = te), (z = Q);
      else break e;
    }
  }
  function n(T) {
    return T.length === 0 ? null : T[0];
  }
  function r(T) {
    if (T.length === 0) return null;
    var F = T[0],
      z = T.pop();
    if (z !== F) {
      T[0] = z;
      e: for (var Q = 0, te = T.length, qt = te >>> 1; Q < qt; ) {
        var it = 2 * (Q + 1) - 1,
          on = T[it],
          gt = it + 1,
          Ot = T[gt];
        if (0 > s(on, z))
          gt < te && 0 > s(Ot, on)
            ? ((T[Q] = Ot), (T[gt] = z), (Q = gt))
            : ((T[Q] = on), (T[it] = z), (Q = it));
        else if (gt < te && 0 > s(Ot, z)) (T[Q] = Ot), (T[gt] = z), (Q = gt);
        else break e;
      }
    }
    return F;
  }
  function s(T, F) {
    var z = T.sortIndex - F.sortIndex;
    return z !== 0 ? z : T.id - F.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var o = performance;
    e.unstable_now = function () {
      return o.now();
    };
  } else {
    var i = Date,
      l = i.now();
    e.unstable_now = function () {
      return i.now() - l;
    };
  }
  var a = [],
    u = [],
    d = 1,
    f = null,
    y = 3,
    g = !1,
    x = !1,
    b = !1,
    w = typeof setTimeout == "function" ? setTimeout : null,
    m = typeof clearTimeout == "function" ? clearTimeout : null,
    h = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function p(T) {
    for (var F = n(u); F !== null; ) {
      if (F.callback === null) r(u);
      else if (F.startTime <= T)
        r(u), (F.sortIndex = F.expirationTime), t(a, F);
      else break;
      F = n(u);
    }
  }
  function E(T) {
    if (((b = !1), p(T), !x))
      if (n(a) !== null) (x = !0), fe(_);
      else {
        var F = n(u);
        F !== null && Z(E, F.startTime - T);
      }
  }
  function _(T, F) {
    (x = !1), b && ((b = !1), m(N), (N = -1)), (g = !0);
    var z = y;
    try {
      for (
        p(F), f = n(a);
        f !== null && (!(f.expirationTime > F) || (T && !O()));

      ) {
        var Q = f.callback;
        if (typeof Q == "function") {
          (f.callback = null), (y = f.priorityLevel);
          var te = Q(f.expirationTime <= F);
          (F = e.unstable_now()),
            typeof te == "function" ? (f.callback = te) : f === n(a) && r(a),
            p(F);
        } else r(a);
        f = n(a);
      }
      if (f !== null) var qt = !0;
      else {
        var it = n(u);
        it !== null && Z(E, it.startTime - F), (qt = !1);
      }
      return qt;
    } finally {
      (f = null), (y = z), (g = !1);
    }
  }
  var C = !1,
    S = null,
    N = -1,
    R = 5,
    P = -1;
  function O() {
    return !(e.unstable_now() - P < R);
  }
  function I() {
    if (S !== null) {
      var T = e.unstable_now();
      P = T;
      var F = !0;
      try {
        F = S(!0, T);
      } finally {
        F ? U() : ((C = !1), (S = null));
      }
    } else C = !1;
  }
  var U;
  if (typeof h == "function")
    U = function () {
      h(I);
    };
  else if (typeof MessageChannel < "u") {
    var K = new MessageChannel(),
      Ee = K.port2;
    (K.port1.onmessage = I),
      (U = function () {
        Ee.postMessage(null);
      });
  } else
    U = function () {
      w(I, 0);
    };
  function fe(T) {
    (S = T), C || ((C = !0), U());
  }
  function Z(T, F) {
    N = w(function () {
      T(e.unstable_now());
    }, F);
  }
  (e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (T) {
      T.callback = null;
    }),
    (e.unstable_continueExecution = function () {
      x || g || ((x = !0), fe(_));
    }),
    (e.unstable_forceFrameRate = function (T) {
      0 > T || 125 < T
        ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
          )
        : (R = 0 < T ? Math.floor(1e3 / T) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return y;
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return n(a);
    }),
    (e.unstable_next = function (T) {
      switch (y) {
        case 1:
        case 2:
        case 3:
          var F = 3;
          break;
        default:
          F = y;
      }
      var z = y;
      y = F;
      try {
        return T();
      } finally {
        y = z;
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (T, F) {
      switch (T) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          T = 3;
      }
      var z = y;
      y = T;
      try {
        return F();
      } finally {
        y = z;
      }
    }),
    (e.unstable_scheduleCallback = function (T, F, z) {
      var Q = e.unstable_now();
      switch (
        (typeof z == "object" && z !== null
          ? ((z = z.delay), (z = typeof z == "number" && 0 < z ? Q + z : Q))
          : (z = Q),
        T)
      ) {
        case 1:
          var te = -1;
          break;
        case 2:
          te = 250;
          break;
        case 5:
          te = 1073741823;
          break;
        case 4:
          te = 1e4;
          break;
        default:
          te = 5e3;
      }
      return (
        (te = z + te),
        (T = {
          id: d++,
          callback: F,
          priorityLevel: T,
          startTime: z,
          expirationTime: te,
          sortIndex: -1,
        }),
        z > Q
          ? ((T.sortIndex = z),
            t(u, T),
            n(a) === null &&
              T === n(u) &&
              (b ? (m(N), (N = -1)) : (b = !0), Z(E, z - Q)))
          : ((T.sortIndex = te), t(a, T), x || g || ((x = !0), fe(_))),
        T
      );
    }),
    (e.unstable_shouldYield = O),
    (e.unstable_wrapCallback = function (T) {
      var F = y;
      return function () {
        var z = y;
        y = F;
        try {
          return T.apply(this, arguments);
        } finally {
          y = z;
        }
      };
    });
})(yh);
mh.exports = yh;
var gy = mh.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var vy = v,
  rt = gy;
function k(e) {
  for (
    var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1;
    n < arguments.length;
    n++
  )
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return (
    "Minified React error #" +
    e +
    "; visit " +
    t +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
var gh = new Set(),
  $s = {};
function ir(e, t) {
  Dr(e, t), Dr(e + "Capture", t);
}
function Dr(e, t) {
  for ($s[e] = t, e = 0; e < t.length; e++) gh.add(t[e]);
}
var Zt = !(
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
  ),
  pa = Object.prototype.hasOwnProperty,
  xy =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  Xc = {},
  Jc = {};
function wy(e) {
  return pa.call(Jc, e)
    ? !0
    : pa.call(Xc, e)
    ? !1
    : xy.test(e)
    ? (Jc[e] = !0)
    : ((Xc[e] = !0), !1);
}
function by(e, t, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return r
        ? !1
        : n !== null
        ? !n.acceptsBooleans
        : ((e = e.toLowerCase().slice(0, 5)), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function Ey(e, t, n, r) {
  if (t === null || typeof t > "u" || by(e, t, n, r)) return !0;
  if (r) return !1;
  if (n !== null)
    switch (n.type) {
      case 3:
        return !t;
      case 4:
        return t === !1;
      case 5:
        return isNaN(t);
      case 6:
        return isNaN(t) || 1 > t;
    }
  return !1;
}
function Be(e, t, n, r, s, o, i) {
  (this.acceptsBooleans = t === 2 || t === 3 || t === 4),
    (this.attributeName = r),
    (this.attributeNamespace = s),
    (this.mustUseProperty = n),
    (this.propertyName = e),
    (this.type = t),
    (this.sanitizeURL = o),
    (this.removeEmptyString = i);
}
var ke = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
  .split(" ")
  .forEach(function (e) {
    ke[e] = new Be(e, 0, !1, e, null, !1, !1);
  });
[
  ["acceptCharset", "accept-charset"],
  ["className", "class"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"],
].forEach(function (e) {
  var t = e[0];
  ke[t] = new Be(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
  ke[e] = new Be(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
[
  "autoReverse",
  "externalResourcesRequired",
  "focusable",
  "preserveAlpha",
].forEach(function (e) {
  ke[e] = new Be(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
  .split(" ")
  .forEach(function (e) {
    ke[e] = new Be(e, 3, !1, e.toLowerCase(), null, !1, !1);
  });
["checked", "multiple", "muted", "selected"].forEach(function (e) {
  ke[e] = new Be(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function (e) {
  ke[e] = new Be(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function (e) {
  ke[e] = new Be(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function (e) {
  ke[e] = new Be(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var Pu = /[\-:]([a-z])/g;
function Lu(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(Pu, Lu);
    ke[t] = new Be(t, 1, !1, e, null, !1, !1);
  });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
  .split(" ")
  .forEach(function (e) {
    var t = e.replace(Pu, Lu);
    ke[t] = new Be(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  });
["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
  var t = e.replace(Pu, Lu);
  ke[t] = new Be(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function (e) {
  ke[e] = new Be(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
ke.xlinkHref = new Be(
  "xlinkHref",
  1,
  !1,
  "xlink:href",
  "http://www.w3.org/1999/xlink",
  !0,
  !1
);
["src", "href", "action", "formAction"].forEach(function (e) {
  ke[e] = new Be(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Au(e, t, n, r) {
  var s = ke.hasOwnProperty(t) ? ke[t] : null;
  (s !== null
    ? s.type !== 0
    : r ||
      !(2 < t.length) ||
      (t[0] !== "o" && t[0] !== "O") ||
      (t[1] !== "n" && t[1] !== "N")) &&
    (Ey(t, n, s, r) && (n = null),
    r || s === null
      ? wy(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
      : s.mustUseProperty
      ? (e[s.propertyName] = n === null ? (s.type === 3 ? !1 : "") : n)
      : ((t = s.attributeName),
        (r = s.attributeNamespace),
        n === null
          ? e.removeAttribute(t)
          : ((s = s.type),
            (n = s === 3 || (s === 4 && n === !0) ? "" : "" + n),
            r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var sn = vy.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  Po = Symbol.for("react.element"),
  vr = Symbol.for("react.portal"),
  xr = Symbol.for("react.fragment"),
  Iu = Symbol.for("react.strict_mode"),
  ma = Symbol.for("react.profiler"),
  vh = Symbol.for("react.provider"),
  xh = Symbol.for("react.context"),
  Fu = Symbol.for("react.forward_ref"),
  ya = Symbol.for("react.suspense"),
  ga = Symbol.for("react.suspense_list"),
  Du = Symbol.for("react.memo"),
  fn = Symbol.for("react.lazy"),
  wh = Symbol.for("react.offscreen"),
  Zc = Symbol.iterator;
function ys(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (Zc && e[Zc]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var de = Object.assign,
  Pl;
function Ns(e) {
  if (Pl === void 0)
    try {
      throw Error();
    } catch (n) {
      var t = n.stack.trim().match(/\n( *(at )?)/);
      Pl = (t && t[1]) || "";
    }
  return (
    `
` +
    Pl +
    e
  );
}
var Ll = !1;
function Al(e, t) {
  if (!e || Ll) return "";
  Ll = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t)
      if (
        ((t = function () {
          throw Error();
        }),
        Object.defineProperty(t.prototype, "props", {
          set: function () {
            throw Error();
          },
        }),
        typeof Reflect == "object" && Reflect.construct)
      ) {
        try {
          Reflect.construct(t, []);
        } catch (u) {
          var r = u;
        }
        Reflect.construct(e, [], t);
      } else {
        try {
          t.call();
        } catch (u) {
          r = u;
        }
        e.call(t.prototype);
      }
    else {
      try {
        throw Error();
      } catch (u) {
        r = u;
      }
      e();
    }
  } catch (u) {
    if (u && r && typeof u.stack == "string") {
      for (
        var s = u.stack.split(`
`),
          o = r.stack.split(`
`),
          i = s.length - 1,
          l = o.length - 1;
        1 <= i && 0 <= l && s[i] !== o[l];

      )
        l--;
      for (; 1 <= i && 0 <= l; i--, l--)
        if (s[i] !== o[l]) {
          if (i !== 1 || l !== 1)
            do
              if ((i--, l--, 0 > l || s[i] !== o[l])) {
                var a =
                  `
` + s[i].replace(" at new ", " at ");
                return (
                  e.displayName &&
                    a.includes("<anonymous>") &&
                    (a = a.replace("<anonymous>", e.displayName)),
                  a
                );
              }
            while (1 <= i && 0 <= l);
          break;
        }
    }
  } finally {
    (Ll = !1), (Error.prepareStackTrace = n);
  }
  return (e = e ? e.displayName || e.name : "") ? Ns(e) : "";
}
function Sy(e) {
  switch (e.tag) {
    case 5:
      return Ns(e.type);
    case 16:
      return Ns("Lazy");
    case 13:
      return Ns("Suspense");
    case 19:
      return Ns("SuspenseList");
    case 0:
    case 2:
    case 15:
      return (e = Al(e.type, !1)), e;
    case 11:
      return (e = Al(e.type.render, !1)), e;
    case 1:
      return (e = Al(e.type, !0)), e;
    default:
      return "";
  }
}
function va(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case xr:
      return "Fragment";
    case vr:
      return "Portal";
    case ma:
      return "Profiler";
    case Iu:
      return "StrictMode";
    case ya:
      return "Suspense";
    case ga:
      return "SuspenseList";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case xh:
        return (e.displayName || "Context") + ".Consumer";
      case vh:
        return (e._context.displayName || "Context") + ".Provider";
      case Fu:
        var t = e.render;
        return (
          (e = e.displayName),
          e ||
            ((e = t.displayName || t.name || ""),
            (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
          e
        );
      case Du:
        return (
          (t = e.displayName || null), t !== null ? t : va(e.type) || "Memo"
        );
      case fn:
        (t = e._payload), (e = e._init);
        try {
          return va(e(t));
        } catch {}
    }
  return null;
}
function Cy(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return (
        (e = t.render),
        (e = e.displayName || e.name || ""),
        t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
      );
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return va(t);
    case 8:
      return t === Iu ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == "function") return t.displayName || t.name || null;
      if (typeof t == "string") return t;
  }
  return null;
}
function jn(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function bh(e) {
  var t = e.type;
  return (
    (e = e.nodeName) &&
    e.toLowerCase() === "input" &&
    (t === "checkbox" || t === "radio")
  );
}
function _y(e) {
  var t = bh(e) ? "checked" : "value",
    n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
    r = "" + e[t];
  if (
    !e.hasOwnProperty(t) &&
    typeof n < "u" &&
    typeof n.get == "function" &&
    typeof n.set == "function"
  ) {
    var s = n.get,
      o = n.set;
    return (
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function () {
          return s.call(this);
        },
        set: function (i) {
          (r = "" + i), o.call(this, i);
        },
      }),
      Object.defineProperty(e, t, { enumerable: n.enumerable }),
      {
        getValue: function () {
          return r;
        },
        setValue: function (i) {
          r = "" + i;
        },
        stopTracking: function () {
          (e._valueTracker = null), delete e[t];
        },
      }
    );
  }
}
function Lo(e) {
  e._valueTracker || (e._valueTracker = _y(e));
}
function Eh(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(),
    r = "";
  return (
    e && (r = bh(e) ? (e.checked ? "true" : "false") : e.value),
    (e = r),
    e !== n ? (t.setValue(e), !0) : !1
  );
}
function mi(e) {
  if (((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u"))
    return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function xa(e, t) {
  var n = t.checked;
  return de({}, t, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: n ?? e._wrapperState.initialChecked,
  });
}
function ed(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue,
    r = t.checked != null ? t.checked : t.defaultChecked;
  (n = jn(t.value != null ? t.value : n)),
    (e._wrapperState = {
      initialChecked: r,
      initialValue: n,
      controlled:
        t.type === "checkbox" || t.type === "radio"
          ? t.checked != null
          : t.value != null,
    });
}
function Sh(e, t) {
  (t = t.checked), t != null && Au(e, "checked", t, !1);
}
function wa(e, t) {
  Sh(e, t);
  var n = jn(t.value),
    r = t.type;
  if (n != null)
    r === "number"
      ? ((n === 0 && e.value === "") || e.value != n) && (e.value = "" + n)
      : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value")
    ? ba(e, t.type, n)
    : t.hasOwnProperty("defaultValue") && ba(e, t.type, jn(t.defaultValue)),
    t.checked == null &&
      t.defaultChecked != null &&
      (e.defaultChecked = !!t.defaultChecked);
}
function td(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (
      !(
        (r !== "submit" && r !== "reset") ||
        (t.value !== void 0 && t.value !== null)
      )
    )
      return;
    (t = "" + e._wrapperState.initialValue),
      n || t === e.value || (e.value = t),
      (e.defaultValue = t);
  }
  (n = e.name),
    n !== "" && (e.name = ""),
    (e.defaultChecked = !!e._wrapperState.initialChecked),
    n !== "" && (e.name = n);
}
function ba(e, t, n) {
  (t !== "number" || mi(e.ownerDocument) !== e) &&
    (n == null
      ? (e.defaultValue = "" + e._wrapperState.initialValue)
      : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var js = Array.isArray;
function Rr(e, t, n, r) {
  if (((e = e.options), t)) {
    t = {};
    for (var s = 0; s < n.length; s++) t["$" + n[s]] = !0;
    for (n = 0; n < e.length; n++)
      (s = t.hasOwnProperty("$" + e[n].value)),
        e[n].selected !== s && (e[n].selected = s),
        s && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + jn(n), t = null, s = 0; s < e.length; s++) {
      if (e[s].value === n) {
        (e[s].selected = !0), r && (e[s].defaultSelected = !0);
        return;
      }
      t !== null || e[s].disabled || (t = e[s]);
    }
    t !== null && (t.selected = !0);
  }
}
function Ea(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(k(91));
  return de({}, t, {
    value: void 0,
    defaultValue: void 0,
    children: "" + e._wrapperState.initialValue,
  });
}
function nd(e, t) {
  var n = t.value;
  if (n == null) {
    if (((n = t.children), (t = t.defaultValue), n != null)) {
      if (t != null) throw Error(k(92));
      if (js(n)) {
        if (1 < n.length) throw Error(k(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), (n = t);
  }
  e._wrapperState = { initialValue: jn(n) };
}
function Ch(e, t) {
  var n = jn(t.value),
    r = jn(t.defaultValue);
  n != null &&
    ((n = "" + n),
    n !== e.value && (e.value = n),
    t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)),
    r != null && (e.defaultValue = "" + r);
}
function rd(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function _h(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function Sa(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml"
    ? _h(t)
    : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
    ? "http://www.w3.org/1999/xhtml"
    : e;
}
var Ao,
  Nh = (function (e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
      ? function (t, n, r, s) {
          MSApp.execUnsafeLocalFunction(function () {
            return e(t, n, r, s);
          });
        }
      : e;
  })(function (e, t) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
      e.innerHTML = t;
    else {
      for (
        Ao = Ao || document.createElement("div"),
          Ao.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
          t = Ao.firstChild;
        e.firstChild;

      )
        e.removeChild(e.firstChild);
      for (; t.firstChild; ) e.appendChild(t.firstChild);
    }
  });
function Us(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var Os = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0,
  },
  Ny = ["Webkit", "ms", "Moz", "O"];
Object.keys(Os).forEach(function (e) {
  Ny.forEach(function (t) {
    (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (Os[t] = Os[e]);
  });
});
function jh(e, t, n) {
  return t == null || typeof t == "boolean" || t === ""
    ? ""
    : n || typeof t != "number" || t === 0 || (Os.hasOwnProperty(e) && Os[e])
    ? ("" + t).trim()
    : t + "px";
}
function kh(e, t) {
  e = e.style;
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      var r = n.indexOf("--") === 0,
        s = jh(n, t[n], r);
      n === "float" && (n = "cssFloat"), r ? e.setProperty(n, s) : (e[n] = s);
    }
}
var jy = de(
  { menuitem: !0 },
  {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0,
  }
);
function Ca(e, t) {
  if (t) {
    if (jy[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
      throw Error(k(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(k(60));
      if (
        typeof t.dangerouslySetInnerHTML != "object" ||
        !("__html" in t.dangerouslySetInnerHTML)
      )
        throw Error(k(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(k(62));
  }
}
function _a(e, t) {
  if (e.indexOf("-") === -1) return typeof t.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var Na = null;
function Mu(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var ja = null,
  Or = null,
  Pr = null;
function sd(e) {
  if ((e = po(e))) {
    if (typeof ja != "function") throw Error(k(280));
    var t = e.stateNode;
    t && ((t = rl(t)), ja(e.stateNode, e.type, t));
  }
}
function Th(e) {
  Or ? (Pr ? Pr.push(e) : (Pr = [e])) : (Or = e);
}
function Rh() {
  if (Or) {
    var e = Or,
      t = Pr;
    if (((Pr = Or = null), sd(e), t)) for (e = 0; e < t.length; e++) sd(t[e]);
  }
}
function Oh(e, t) {
  return e(t);
}
function Ph() {}
var Il = !1;
function Lh(e, t, n) {
  if (Il) return e(t, n);
  Il = !0;
  try {
    return Oh(e, t, n);
  } finally {
    (Il = !1), (Or !== null || Pr !== null) && (Ph(), Rh());
  }
}
function Bs(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = rl(n);
  if (r === null) return null;
  n = r[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (r = !r.disabled) ||
        ((e = e.type),
        (r = !(
          e === "button" ||
          e === "input" ||
          e === "select" ||
          e === "textarea"
        ))),
        (e = !r);
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != "function") throw Error(k(231, t, typeof n));
  return n;
}
var ka = !1;
if (Zt)
  try {
    var gs = {};
    Object.defineProperty(gs, "passive", {
      get: function () {
        ka = !0;
      },
    }),
      window.addEventListener("test", gs, gs),
      window.removeEventListener("test", gs, gs);
  } catch {
    ka = !1;
  }
function ky(e, t, n, r, s, o, i, l, a) {
  var u = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, u);
  } catch (d) {
    this.onError(d);
  }
}
var Ps = !1,
  yi = null,
  gi = !1,
  Ta = null,
  Ty = {
    onError: function (e) {
      (Ps = !0), (yi = e);
    },
  };
function Ry(e, t, n, r, s, o, i, l, a) {
  (Ps = !1), (yi = null), ky.apply(Ty, arguments);
}
function Oy(e, t, n, r, s, o, i, l, a) {
  if ((Ry.apply(this, arguments), Ps)) {
    if (Ps) {
      var u = yi;
      (Ps = !1), (yi = null);
    } else throw Error(k(198));
    gi || ((gi = !0), (Ta = u));
  }
}
function lr(e) {
  var t = e,
    n = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do (t = e), t.flags & 4098 && (n = t.return), (e = t.return);
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function Ah(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (
      (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
      t !== null)
    )
      return t.dehydrated;
  }
  return null;
}
function od(e) {
  if (lr(e) !== e) throw Error(k(188));
}
function Py(e) {
  var t = e.alternate;
  if (!t) {
    if (((t = lr(e)), t === null)) throw Error(k(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var s = n.return;
    if (s === null) break;
    var o = s.alternate;
    if (o === null) {
      if (((r = s.return), r !== null)) {
        n = r;
        continue;
      }
      break;
    }
    if (s.child === o.child) {
      for (o = s.child; o; ) {
        if (o === n) return od(s), e;
        if (o === r) return od(s), t;
        o = o.sibling;
      }
      throw Error(k(188));
    }
    if (n.return !== r.return) (n = s), (r = o);
    else {
      for (var i = !1, l = s.child; l; ) {
        if (l === n) {
          (i = !0), (n = s), (r = o);
          break;
        }
        if (l === r) {
          (i = !0), (r = s), (n = o);
          break;
        }
        l = l.sibling;
      }
      if (!i) {
        for (l = o.child; l; ) {
          if (l === n) {
            (i = !0), (n = o), (r = s);
            break;
          }
          if (l === r) {
            (i = !0), (r = o), (n = s);
            break;
          }
          l = l.sibling;
        }
        if (!i) throw Error(k(189));
      }
    }
    if (n.alternate !== r) throw Error(k(190));
  }
  if (n.tag !== 3) throw Error(k(188));
  return n.stateNode.current === n ? e : t;
}
function Ih(e) {
  return (e = Py(e)), e !== null ? Fh(e) : null;
}
function Fh(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = Fh(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var Dh = rt.unstable_scheduleCallback,
  id = rt.unstable_cancelCallback,
  Ly = rt.unstable_shouldYield,
  Ay = rt.unstable_requestPaint,
  ye = rt.unstable_now,
  Iy = rt.unstable_getCurrentPriorityLevel,
  zu = rt.unstable_ImmediatePriority,
  Mh = rt.unstable_UserBlockingPriority,
  vi = rt.unstable_NormalPriority,
  Fy = rt.unstable_LowPriority,
  zh = rt.unstable_IdlePriority,
  Zi = null,
  Dt = null;
function Dy(e) {
  if (Dt && typeof Dt.onCommitFiberRoot == "function")
    try {
      Dt.onCommitFiberRoot(Zi, e, void 0, (e.current.flags & 128) === 128);
    } catch {}
}
var Ct = Math.clz32 ? Math.clz32 : $y,
  My = Math.log,
  zy = Math.LN2;
function $y(e) {
  return (e >>>= 0), e === 0 ? 32 : (31 - ((My(e) / zy) | 0)) | 0;
}
var Io = 64,
  Fo = 4194304;
function ks(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function xi(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0,
    s = e.suspendedLanes,
    o = e.pingedLanes,
    i = n & 268435455;
  if (i !== 0) {
    var l = i & ~s;
    l !== 0 ? (r = ks(l)) : ((o &= i), o !== 0 && (r = ks(o)));
  } else (i = n & ~s), i !== 0 ? (r = ks(i)) : o !== 0 && (r = ks(o));
  if (r === 0) return 0;
  if (
    t !== 0 &&
    t !== r &&
    !(t & s) &&
    ((s = r & -r), (o = t & -t), s >= o || (s === 16 && (o & 4194240) !== 0))
  )
    return t;
  if ((r & 4 && (r |= n & 16), (t = e.entangledLanes), t !== 0))
    for (e = e.entanglements, t &= r; 0 < t; )
      (n = 31 - Ct(t)), (s = 1 << n), (r |= e[n]), (t &= ~s);
  return r;
}
function Uy(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function By(e, t) {
  for (
    var n = e.suspendedLanes,
      r = e.pingedLanes,
      s = e.expirationTimes,
      o = e.pendingLanes;
    0 < o;

  ) {
    var i = 31 - Ct(o),
      l = 1 << i,
      a = s[i];
    a === -1
      ? (!(l & n) || l & r) && (s[i] = Uy(l, t))
      : a <= t && (e.expiredLanes |= l),
      (o &= ~l);
  }
}
function Ra(e) {
  return (
    (e = e.pendingLanes & -1073741825),
    e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
  );
}
function $h() {
  var e = Io;
  return (Io <<= 1), !(Io & 4194240) && (Io = 64), e;
}
function Fl(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function fo(e, t, n) {
  (e.pendingLanes |= t),
    t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (t = 31 - Ct(t)),
    (e[t] = n);
}
function Hy(e, t) {
  var n = e.pendingLanes & ~t;
  (e.pendingLanes = t),
    (e.suspendedLanes = 0),
    (e.pingedLanes = 0),
    (e.expiredLanes &= t),
    (e.mutableReadLanes &= t),
    (e.entangledLanes &= t),
    (t = e.entanglements);
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var s = 31 - Ct(n),
      o = 1 << s;
    (t[s] = 0), (r[s] = -1), (e[s] = -1), (n &= ~o);
  }
}
function $u(e, t) {
  var n = (e.entangledLanes |= t);
  for (e = e.entanglements; n; ) {
    var r = 31 - Ct(n),
      s = 1 << r;
    (s & t) | (e[r] & t) && (e[r] |= t), (n &= ~s);
  }
}
var X = 0;
function Uh(e) {
  return (e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1;
}
var Bh,
  Uu,
  Hh,
  Qh,
  qh,
  Oa = !1,
  Do = [],
  xn = null,
  wn = null,
  bn = null,
  Hs = new Map(),
  Qs = new Map(),
  mn = [],
  Qy =
    "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
      " "
    );
function ld(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      xn = null;
      break;
    case "dragenter":
    case "dragleave":
      wn = null;
      break;
    case "mouseover":
    case "mouseout":
      bn = null;
      break;
    case "pointerover":
    case "pointerout":
      Hs.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Qs.delete(t.pointerId);
  }
}
function vs(e, t, n, r, s, o) {
  return e === null || e.nativeEvent !== o
    ? ((e = {
        blockedOn: t,
        domEventName: n,
        eventSystemFlags: r,
        nativeEvent: o,
        targetContainers: [s],
      }),
      t !== null && ((t = po(t)), t !== null && Uu(t)),
      e)
    : ((e.eventSystemFlags |= r),
      (t = e.targetContainers),
      s !== null && t.indexOf(s) === -1 && t.push(s),
      e);
}
function qy(e, t, n, r, s) {
  switch (t) {
    case "focusin":
      return (xn = vs(xn, e, t, n, r, s)), !0;
    case "dragenter":
      return (wn = vs(wn, e, t, n, r, s)), !0;
    case "mouseover":
      return (bn = vs(bn, e, t, n, r, s)), !0;
    case "pointerover":
      var o = s.pointerId;
      return Hs.set(o, vs(Hs.get(o) || null, e, t, n, r, s)), !0;
    case "gotpointercapture":
      return (
        (o = s.pointerId), Qs.set(o, vs(Qs.get(o) || null, e, t, n, r, s)), !0
      );
  }
  return !1;
}
function Vh(e) {
  var t = Un(e.target);
  if (t !== null) {
    var n = lr(t);
    if (n !== null) {
      if (((t = n.tag), t === 13)) {
        if (((t = Ah(n)), t !== null)) {
          (e.blockedOn = t),
            qh(e.priority, function () {
              Hh(n);
            });
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function ei(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = Pa(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      (Na = r), n.target.dispatchEvent(r), (Na = null);
    } else return (t = po(n)), t !== null && Uu(t), (e.blockedOn = n), !1;
    t.shift();
  }
  return !0;
}
function ad(e, t, n) {
  ei(e) && n.delete(t);
}
function Vy() {
  (Oa = !1),
    xn !== null && ei(xn) && (xn = null),
    wn !== null && ei(wn) && (wn = null),
    bn !== null && ei(bn) && (bn = null),
    Hs.forEach(ad),
    Qs.forEach(ad);
}
function xs(e, t) {
  e.blockedOn === t &&
    ((e.blockedOn = null),
    Oa ||
      ((Oa = !0),
      rt.unstable_scheduleCallback(rt.unstable_NormalPriority, Vy)));
}
function qs(e) {
  function t(s) {
    return xs(s, e);
  }
  if (0 < Do.length) {
    xs(Do[0], e);
    for (var n = 1; n < Do.length; n++) {
      var r = Do[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (
    xn !== null && xs(xn, e),
      wn !== null && xs(wn, e),
      bn !== null && xs(bn, e),
      Hs.forEach(t),
      Qs.forEach(t),
      n = 0;
    n < mn.length;
    n++
  )
    (r = mn[n]), r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < mn.length && ((n = mn[0]), n.blockedOn === null); )
    Vh(n), n.blockedOn === null && mn.shift();
}
var Lr = sn.ReactCurrentBatchConfig,
  wi = !0;
function Wy(e, t, n, r) {
  var s = X,
    o = Lr.transition;
  Lr.transition = null;
  try {
    (X = 1), Bu(e, t, n, r);
  } finally {
    (X = s), (Lr.transition = o);
  }
}
function Ky(e, t, n, r) {
  var s = X,
    o = Lr.transition;
  Lr.transition = null;
  try {
    (X = 4), Bu(e, t, n, r);
  } finally {
    (X = s), (Lr.transition = o);
  }
}
function Bu(e, t, n, r) {
  if (wi) {
    var s = Pa(e, t, n, r);
    if (s === null) Vl(e, t, r, bi, n), ld(e, r);
    else if (qy(s, e, t, n, r)) r.stopPropagation();
    else if ((ld(e, r), t & 4 && -1 < Qy.indexOf(e))) {
      for (; s !== null; ) {
        var o = po(s);
        if (
          (o !== null && Bh(o),
          (o = Pa(e, t, n, r)),
          o === null && Vl(e, t, r, bi, n),
          o === s)
        )
          break;
        s = o;
      }
      s !== null && r.stopPropagation();
    } else Vl(e, t, r, null, n);
  }
}
var bi = null;
function Pa(e, t, n, r) {
  if (((bi = null), (e = Mu(r)), (e = Un(e)), e !== null))
    if (((t = lr(e)), t === null)) e = null;
    else if (((n = t.tag), n === 13)) {
      if (((e = Ah(t)), e !== null)) return e;
      e = null;
    } else if (n === 3) {
      if (t.stateNode.current.memoizedState.isDehydrated)
        return t.tag === 3 ? t.stateNode.containerInfo : null;
      e = null;
    } else t !== e && (e = null);
  return (bi = e), null;
}
function Wh(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (Iy()) {
        case zu:
          return 1;
        case Mh:
          return 4;
        case vi:
        case Fy:
          return 16;
        case zh:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var gn = null,
  Hu = null,
  ti = null;
function Kh() {
  if (ti) return ti;
  var e,
    t = Hu,
    n = t.length,
    r,
    s = "value" in gn ? gn.value : gn.textContent,
    o = s.length;
  for (e = 0; e < n && t[e] === s[e]; e++);
  var i = n - e;
  for (r = 1; r <= i && t[n - r] === s[o - r]; r++);
  return (ti = s.slice(e, 1 < r ? 1 - r : void 0));
}
function ni(e) {
  var t = e.keyCode;
  return (
    "charCode" in e
      ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
      : (e = t),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function Mo() {
  return !0;
}
function ud() {
  return !1;
}
function ot(e) {
  function t(n, r, s, o, i) {
    (this._reactName = n),
      (this._targetInst = s),
      (this.type = r),
      (this.nativeEvent = o),
      (this.target = i),
      (this.currentTarget = null);
    for (var l in e)
      e.hasOwnProperty(l) && ((n = e[l]), (this[l] = n ? n(o) : o[l]));
    return (
      (this.isDefaultPrevented = (
        o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1
      )
        ? Mo
        : ud),
      (this.isPropagationStopped = ud),
      this
    );
  }
  return (
    de(t.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n &&
          (n.preventDefault
            ? n.preventDefault()
            : typeof n.returnValue != "unknown" && (n.returnValue = !1),
          (this.isDefaultPrevented = Mo));
      },
      stopPropagation: function () {
        var n = this.nativeEvent;
        n &&
          (n.stopPropagation
            ? n.stopPropagation()
            : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0),
          (this.isPropagationStopped = Mo));
      },
      persist: function () {},
      isPersistent: Mo,
    }),
    t
  );
}
var Yr = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  Qu = ot(Yr),
  ho = de({}, Yr, { view: 0, detail: 0 }),
  Yy = ot(ho),
  Dl,
  Ml,
  ws,
  el = de({}, ho, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: qu,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      return e.relatedTarget === void 0
        ? e.fromElement === e.srcElement
          ? e.toElement
          : e.fromElement
        : e.relatedTarget;
    },
    movementX: function (e) {
      return "movementX" in e
        ? e.movementX
        : (e !== ws &&
            (ws && e.type === "mousemove"
              ? ((Dl = e.screenX - ws.screenX), (Ml = e.screenY - ws.screenY))
              : (Ml = Dl = 0),
            (ws = e)),
          Dl);
    },
    movementY: function (e) {
      return "movementY" in e ? e.movementY : Ml;
    },
  }),
  cd = ot(el),
  Gy = de({}, el, { dataTransfer: 0 }),
  Xy = ot(Gy),
  Jy = de({}, ho, { relatedTarget: 0 }),
  zl = ot(Jy),
  Zy = de({}, Yr, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  eg = ot(Zy),
  tg = de({}, Yr, {
    clipboardData: function (e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    },
  }),
  ng = ot(tg),
  rg = de({}, Yr, { data: 0 }),
  dd = ot(rg),
  sg = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified",
  },
  og = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta",
  },
  ig = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey",
  };
function lg(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = ig[e]) ? !!t[e] : !1;
}
function qu() {
  return lg;
}
var ag = de({}, ho, {
    key: function (e) {
      if (e.key) {
        var t = sg[e.key] || e.key;
        if (t !== "Unidentified") return t;
      }
      return e.type === "keypress"
        ? ((e = ni(e)), e === 13 ? "Enter" : String.fromCharCode(e))
        : e.type === "keydown" || e.type === "keyup"
        ? og[e.keyCode] || "Unidentified"
        : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: qu,
    charCode: function (e) {
      return e.type === "keypress" ? ni(e) : 0;
    },
    keyCode: function (e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === "keypress"
        ? ni(e)
        : e.type === "keydown" || e.type === "keyup"
        ? e.keyCode
        : 0;
    },
  }),
  ug = ot(ag),
  cg = de({}, el, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0,
  }),
  fd = ot(cg),
  dg = de({}, ho, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: qu,
  }),
  fg = ot(dg),
  hg = de({}, Yr, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  pg = ot(hg),
  mg = de({}, el, {
    deltaX: function (e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function (e) {
      return "deltaY" in e
        ? e.deltaY
        : "wheelDeltaY" in e
        ? -e.wheelDeltaY
        : "wheelDelta" in e
        ? -e.wheelDelta
        : 0;
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  yg = ot(mg),
  gg = [9, 13, 27, 32],
  Vu = Zt && "CompositionEvent" in window,
  Ls = null;
Zt && "documentMode" in document && (Ls = document.documentMode);
var vg = Zt && "TextEvent" in window && !Ls,
  Yh = Zt && (!Vu || (Ls && 8 < Ls && 11 >= Ls)),
  hd = " ",
  pd = !1;
function Gh(e, t) {
  switch (e) {
    case "keyup":
      return gg.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function Xh(e) {
  return (e = e.detail), typeof e == "object" && "data" in e ? e.data : null;
}
var wr = !1;
function xg(e, t) {
  switch (e) {
    case "compositionend":
      return Xh(t);
    case "keypress":
      return t.which !== 32 ? null : ((pd = !0), hd);
    case "textInput":
      return (e = t.data), e === hd && pd ? null : e;
    default:
      return null;
  }
}
function wg(e, t) {
  if (wr)
    return e === "compositionend" || (!Vu && Gh(e, t))
      ? ((e = Kh()), (ti = Hu = gn = null), (wr = !1), e)
      : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return Yh && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var bg = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0,
};
function md(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!bg[e.type] : t === "textarea";
}
function Jh(e, t, n, r) {
  Th(r),
    (t = Ei(t, "onChange")),
    0 < t.length &&
      ((n = new Qu("onChange", "change", null, n, r)),
      e.push({ event: n, listeners: t }));
}
var As = null,
  Vs = null;
function Eg(e) {
  up(e, 0);
}
function tl(e) {
  var t = Sr(e);
  if (Eh(t)) return e;
}
function Sg(e, t) {
  if (e === "change") return t;
}
var Zh = !1;
if (Zt) {
  var $l;
  if (Zt) {
    var Ul = "oninput" in document;
    if (!Ul) {
      var yd = document.createElement("div");
      yd.setAttribute("oninput", "return;"),
        (Ul = typeof yd.oninput == "function");
    }
    $l = Ul;
  } else $l = !1;
  Zh = $l && (!document.documentMode || 9 < document.documentMode);
}
function gd() {
  As && (As.detachEvent("onpropertychange", ep), (Vs = As = null));
}
function ep(e) {
  if (e.propertyName === "value" && tl(Vs)) {
    var t = [];
    Jh(t, Vs, e, Mu(e)), Lh(Eg, t);
  }
}
function Cg(e, t, n) {
  e === "focusin"
    ? (gd(), (As = t), (Vs = n), As.attachEvent("onpropertychange", ep))
    : e === "focusout" && gd();
}
function _g(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown")
    return tl(Vs);
}
function Ng(e, t) {
  if (e === "click") return tl(t);
}
function jg(e, t) {
  if (e === "input" || e === "change") return tl(t);
}
function kg(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var Nt = typeof Object.is == "function" ? Object.is : kg;
function Ws(e, t) {
  if (Nt(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  var n = Object.keys(e),
    r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var s = n[r];
    if (!pa.call(t, s) || !Nt(e[s], t[s])) return !1;
  }
  return !0;
}
function vd(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function xd(e, t) {
  var n = vd(e);
  e = 0;
  for (var r; n; ) {
    if (n.nodeType === 3) {
      if (((r = e + n.textContent.length), e <= t && r >= t))
        return { node: n, offset: t - e };
      e = r;
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = vd(n);
  }
}
function tp(e, t) {
  return e && t
    ? e === t
      ? !0
      : e && e.nodeType === 3
      ? !1
      : t && t.nodeType === 3
      ? tp(e, t.parentNode)
      : "contains" in e
      ? e.contains(t)
      : e.compareDocumentPosition
      ? !!(e.compareDocumentPosition(t) & 16)
      : !1
    : !1;
}
function np() {
  for (var e = window, t = mi(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = mi(e.document);
  }
  return t;
}
function Wu(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return (
    t &&
    ((t === "input" &&
      (e.type === "text" ||
        e.type === "search" ||
        e.type === "tel" ||
        e.type === "url" ||
        e.type === "password")) ||
      t === "textarea" ||
      e.contentEditable === "true")
  );
}
function Tg(e) {
  var t = np(),
    n = e.focusedElem,
    r = e.selectionRange;
  if (
    t !== n &&
    n &&
    n.ownerDocument &&
    tp(n.ownerDocument.documentElement, n)
  ) {
    if (r !== null && Wu(n)) {
      if (
        ((t = r.start),
        (e = r.end),
        e === void 0 && (e = t),
        "selectionStart" in n)
      )
        (n.selectionStart = t), (n.selectionEnd = Math.min(e, n.value.length));
      else if (
        ((e = ((t = n.ownerDocument || document) && t.defaultView) || window),
        e.getSelection)
      ) {
        e = e.getSelection();
        var s = n.textContent.length,
          o = Math.min(r.start, s);
        (r = r.end === void 0 ? o : Math.min(r.end, s)),
          !e.extend && o > r && ((s = r), (r = o), (o = s)),
          (s = xd(n, o));
        var i = xd(n, r);
        s &&
          i &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== s.node ||
            e.anchorOffset !== s.offset ||
            e.focusNode !== i.node ||
            e.focusOffset !== i.offset) &&
          ((t = t.createRange()),
          t.setStart(s.node, s.offset),
          e.removeAllRanges(),
          o > r
            ? (e.addRange(t), e.extend(i.node, i.offset))
            : (t.setEnd(i.node, i.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; (e = e.parentNode); )
      e.nodeType === 1 &&
        t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++)
      (e = t[n]),
        (e.element.scrollLeft = e.left),
        (e.element.scrollTop = e.top);
  }
}
var Rg = Zt && "documentMode" in document && 11 >= document.documentMode,
  br = null,
  La = null,
  Is = null,
  Aa = !1;
function wd(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Aa ||
    br == null ||
    br !== mi(r) ||
    ((r = br),
    "selectionStart" in r && Wu(r)
      ? (r = { start: r.selectionStart, end: r.selectionEnd })
      : ((r = (
          (r.ownerDocument && r.ownerDocument.defaultView) ||
          window
        ).getSelection()),
        (r = {
          anchorNode: r.anchorNode,
          anchorOffset: r.anchorOffset,
          focusNode: r.focusNode,
          focusOffset: r.focusOffset,
        })),
    (Is && Ws(Is, r)) ||
      ((Is = r),
      (r = Ei(La, "onSelect")),
      0 < r.length &&
        ((t = new Qu("onSelect", "select", null, t, n)),
        e.push({ event: t, listeners: r }),
        (t.target = br))));
}
function zo(e, t) {
  var n = {};
  return (
    (n[e.toLowerCase()] = t.toLowerCase()),
    (n["Webkit" + e] = "webkit" + t),
    (n["Moz" + e] = "moz" + t),
    n
  );
}
var Er = {
    animationend: zo("Animation", "AnimationEnd"),
    animationiteration: zo("Animation", "AnimationIteration"),
    animationstart: zo("Animation", "AnimationStart"),
    transitionend: zo("Transition", "TransitionEnd"),
  },
  Bl = {},
  rp = {};
Zt &&
  ((rp = document.createElement("div").style),
  "AnimationEvent" in window ||
    (delete Er.animationend.animation,
    delete Er.animationiteration.animation,
    delete Er.animationstart.animation),
  "TransitionEvent" in window || delete Er.transitionend.transition);
function nl(e) {
  if (Bl[e]) return Bl[e];
  if (!Er[e]) return e;
  var t = Er[e],
    n;
  for (n in t) if (t.hasOwnProperty(n) && n in rp) return (Bl[e] = t[n]);
  return e;
}
var sp = nl("animationend"),
  op = nl("animationiteration"),
  ip = nl("animationstart"),
  lp = nl("transitionend"),
  ap = new Map(),
  bd =
    "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " "
    );
function On(e, t) {
  ap.set(e, t), ir(t, [e]);
}
for (var Hl = 0; Hl < bd.length; Hl++) {
  var Ql = bd[Hl],
    Og = Ql.toLowerCase(),
    Pg = Ql[0].toUpperCase() + Ql.slice(1);
  On(Og, "on" + Pg);
}
On(sp, "onAnimationEnd");
On(op, "onAnimationIteration");
On(ip, "onAnimationStart");
On("dblclick", "onDoubleClick");
On("focusin", "onFocus");
On("focusout", "onBlur");
On(lp, "onTransitionEnd");
Dr("onMouseEnter", ["mouseout", "mouseover"]);
Dr("onMouseLeave", ["mouseout", "mouseover"]);
Dr("onPointerEnter", ["pointerout", "pointerover"]);
Dr("onPointerLeave", ["pointerout", "pointerover"]);
ir(
  "onChange",
  "change click focusin focusout input keydown keyup selectionchange".split(" ")
);
ir(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
    " "
  )
);
ir("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
ir(
  "onCompositionEnd",
  "compositionend focusout keydown keypress keyup mousedown".split(" ")
);
ir(
  "onCompositionStart",
  "compositionstart focusout keydown keypress keyup mousedown".split(" ")
);
ir(
  "onCompositionUpdate",
  "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
);
var Ts =
    "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " "
    ),
  Lg = new Set("cancel close invalid load scroll toggle".split(" ").concat(Ts));
function Ed(e, t, n) {
  var r = e.type || "unknown-event";
  (e.currentTarget = n), Oy(r, t, void 0, e), (e.currentTarget = null);
}
function up(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n],
      s = r.event;
    r = r.listeners;
    e: {
      var o = void 0;
      if (t)
        for (var i = r.length - 1; 0 <= i; i--) {
          var l = r[i],
            a = l.instance,
            u = l.currentTarget;
          if (((l = l.listener), a !== o && s.isPropagationStopped())) break e;
          Ed(s, l, u), (o = a);
        }
      else
        for (i = 0; i < r.length; i++) {
          if (
            ((l = r[i]),
            (a = l.instance),
            (u = l.currentTarget),
            (l = l.listener),
            a !== o && s.isPropagationStopped())
          )
            break e;
          Ed(s, l, u), (o = a);
        }
    }
  }
  if (gi) throw ((e = Ta), (gi = !1), (Ta = null), e);
}
function ne(e, t) {
  var n = t[za];
  n === void 0 && (n = t[za] = new Set());
  var r = e + "__bubble";
  n.has(r) || (cp(t, e, 2, !1), n.add(r));
}
function ql(e, t, n) {
  var r = 0;
  t && (r |= 4), cp(n, e, r, t);
}
var $o = "_reactListening" + Math.random().toString(36).slice(2);
function Ks(e) {
  if (!e[$o]) {
    (e[$o] = !0),
      gh.forEach(function (n) {
        n !== "selectionchange" && (Lg.has(n) || ql(n, !1, e), ql(n, !0, e));
      });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[$o] || ((t[$o] = !0), ql("selectionchange", !1, t));
  }
}
function cp(e, t, n, r) {
  switch (Wh(t)) {
    case 1:
      var s = Wy;
      break;
    case 4:
      s = Ky;
      break;
    default:
      s = Bu;
  }
  (n = s.bind(null, t, n, e)),
    (s = void 0),
    !ka ||
      (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
      (s = !0),
    r
      ? s !== void 0
        ? e.addEventListener(t, n, { capture: !0, passive: s })
        : e.addEventListener(t, n, !0)
      : s !== void 0
      ? e.addEventListener(t, n, { passive: s })
      : e.addEventListener(t, n, !1);
}
function Vl(e, t, n, r, s) {
  var o = r;
  if (!(t & 1) && !(t & 2) && r !== null)
    e: for (;;) {
      if (r === null) return;
      var i = r.tag;
      if (i === 3 || i === 4) {
        var l = r.stateNode.containerInfo;
        if (l === s || (l.nodeType === 8 && l.parentNode === s)) break;
        if (i === 4)
          for (i = r.return; i !== null; ) {
            var a = i.tag;
            if (
              (a === 3 || a === 4) &&
              ((a = i.stateNode.containerInfo),
              a === s || (a.nodeType === 8 && a.parentNode === s))
            )
              return;
            i = i.return;
          }
        for (; l !== null; ) {
          if (((i = Un(l)), i === null)) return;
          if (((a = i.tag), a === 5 || a === 6)) {
            r = o = i;
            continue e;
          }
          l = l.parentNode;
        }
      }
      r = r.return;
    }
  Lh(function () {
    var u = o,
      d = Mu(n),
      f = [];
    e: {
      var y = ap.get(e);
      if (y !== void 0) {
        var g = Qu,
          x = e;
        switch (e) {
          case "keypress":
            if (ni(n) === 0) break e;
          case "keydown":
          case "keyup":
            g = ug;
            break;
          case "focusin":
            (x = "focus"), (g = zl);
            break;
          case "focusout":
            (x = "blur"), (g = zl);
            break;
          case "beforeblur":
          case "afterblur":
            g = zl;
            break;
          case "click":
            if (n.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            g = cd;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            g = Xy;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            g = fg;
            break;
          case sp:
          case op:
          case ip:
            g = eg;
            break;
          case lp:
            g = pg;
            break;
          case "scroll":
            g = Yy;
            break;
          case "wheel":
            g = yg;
            break;
          case "copy":
          case "cut":
          case "paste":
            g = ng;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            g = fd;
        }
        var b = (t & 4) !== 0,
          w = !b && e === "scroll",
          m = b ? (y !== null ? y + "Capture" : null) : y;
        b = [];
        for (var h = u, p; h !== null; ) {
          p = h;
          var E = p.stateNode;
          if (
            (p.tag === 5 &&
              E !== null &&
              ((p = E),
              m !== null && ((E = Bs(h, m)), E != null && b.push(Ys(h, E, p)))),
            w)
          )
            break;
          h = h.return;
        }
        0 < b.length &&
          ((y = new g(y, x, null, n, d)), f.push({ event: y, listeners: b }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (
          ((y = e === "mouseover" || e === "pointerover"),
          (g = e === "mouseout" || e === "pointerout"),
          y &&
            n !== Na &&
            (x = n.relatedTarget || n.fromElement) &&
            (Un(x) || x[en]))
        )
          break e;
        if (
          (g || y) &&
          ((y =
            d.window === d
              ? d
              : (y = d.ownerDocument)
              ? y.defaultView || y.parentWindow
              : window),
          g
            ? ((x = n.relatedTarget || n.toElement),
              (g = u),
              (x = x ? Un(x) : null),
              x !== null &&
                ((w = lr(x)), x !== w || (x.tag !== 5 && x.tag !== 6)) &&
                (x = null))
            : ((g = null), (x = u)),
          g !== x)
        ) {
          if (
            ((b = cd),
            (E = "onMouseLeave"),
            (m = "onMouseEnter"),
            (h = "mouse"),
            (e === "pointerout" || e === "pointerover") &&
              ((b = fd),
              (E = "onPointerLeave"),
              (m = "onPointerEnter"),
              (h = "pointer")),
            (w = g == null ? y : Sr(g)),
            (p = x == null ? y : Sr(x)),
            (y = new b(E, h + "leave", g, n, d)),
            (y.target = w),
            (y.relatedTarget = p),
            (E = null),
            Un(d) === u &&
              ((b = new b(m, h + "enter", x, n, d)),
              (b.target = p),
              (b.relatedTarget = w),
              (E = b)),
            (w = E),
            g && x)
          )
            t: {
              for (b = g, m = x, h = 0, p = b; p; p = yr(p)) h++;
              for (p = 0, E = m; E; E = yr(E)) p++;
              for (; 0 < h - p; ) (b = yr(b)), h--;
              for (; 0 < p - h; ) (m = yr(m)), p--;
              for (; h--; ) {
                if (b === m || (m !== null && b === m.alternate)) break t;
                (b = yr(b)), (m = yr(m));
              }
              b = null;
            }
          else b = null;
          g !== null && Sd(f, y, g, b, !1),
            x !== null && w !== null && Sd(f, w, x, b, !0);
        }
      }
      e: {
        if (
          ((y = u ? Sr(u) : window),
          (g = y.nodeName && y.nodeName.toLowerCase()),
          g === "select" || (g === "input" && y.type === "file"))
        )
          var _ = Sg;
        else if (md(y))
          if (Zh) _ = jg;
          else {
            _ = _g;
            var C = Cg;
          }
        else
          (g = y.nodeName) &&
            g.toLowerCase() === "input" &&
            (y.type === "checkbox" || y.type === "radio") &&
            (_ = Ng);
        if (_ && (_ = _(e, u))) {
          Jh(f, _, n, d);
          break e;
        }
        C && C(e, y, u),
          e === "focusout" &&
            (C = y._wrapperState) &&
            C.controlled &&
            y.type === "number" &&
            ba(y, "number", y.value);
      }
      switch (((C = u ? Sr(u) : window), e)) {
        case "focusin":
          (md(C) || C.contentEditable === "true") &&
            ((br = C), (La = u), (Is = null));
          break;
        case "focusout":
          Is = La = br = null;
          break;
        case "mousedown":
          Aa = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          (Aa = !1), wd(f, n, d);
          break;
        case "selectionchange":
          if (Rg) break;
        case "keydown":
        case "keyup":
          wd(f, n, d);
      }
      var S;
      if (Vu)
        e: {
          switch (e) {
            case "compositionstart":
              var N = "onCompositionStart";
              break e;
            case "compositionend":
              N = "onCompositionEnd";
              break e;
            case "compositionupdate":
              N = "onCompositionUpdate";
              break e;
          }
          N = void 0;
        }
      else
        wr
          ? Gh(e, n) && (N = "onCompositionEnd")
          : e === "keydown" && n.keyCode === 229 && (N = "onCompositionStart");
      N &&
        (Yh &&
          n.locale !== "ko" &&
          (wr || N !== "onCompositionStart"
            ? N === "onCompositionEnd" && wr && (S = Kh())
            : ((gn = d),
              (Hu = "value" in gn ? gn.value : gn.textContent),
              (wr = !0))),
        (C = Ei(u, N)),
        0 < C.length &&
          ((N = new dd(N, e, null, n, d)),
          f.push({ event: N, listeners: C }),
          S ? (N.data = S) : ((S = Xh(n)), S !== null && (N.data = S)))),
        (S = vg ? xg(e, n) : wg(e, n)) &&
          ((u = Ei(u, "onBeforeInput")),
          0 < u.length &&
            ((d = new dd("onBeforeInput", "beforeinput", null, n, d)),
            f.push({ event: d, listeners: u }),
            (d.data = S)));
    }
    up(f, t);
  });
}
function Ys(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function Ei(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var s = e,
      o = s.stateNode;
    s.tag === 5 &&
      o !== null &&
      ((s = o),
      (o = Bs(e, n)),
      o != null && r.unshift(Ys(e, o, s)),
      (o = Bs(e, t)),
      o != null && r.push(Ys(e, o, s))),
      (e = e.return);
  }
  return r;
}
function yr(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function Sd(e, t, n, r, s) {
  for (var o = t._reactName, i = []; n !== null && n !== r; ) {
    var l = n,
      a = l.alternate,
      u = l.stateNode;
    if (a !== null && a === r) break;
    l.tag === 5 &&
      u !== null &&
      ((l = u),
      s
        ? ((a = Bs(n, o)), a != null && i.unshift(Ys(n, a, l)))
        : s || ((a = Bs(n, o)), a != null && i.push(Ys(n, a, l)))),
      (n = n.return);
  }
  i.length !== 0 && e.push({ event: t, listeners: i });
}
var Ag = /\r\n?/g,
  Ig = /\u0000|\uFFFD/g;
function Cd(e) {
  return (typeof e == "string" ? e : "" + e)
    .replace(
      Ag,
      `
`
    )
    .replace(Ig, "");
}
function Uo(e, t, n) {
  if (((t = Cd(t)), Cd(e) !== t && n)) throw Error(k(425));
}
function Si() {}
var Ia = null,
  Fa = null;
function Da(e, t) {
  return (
    e === "textarea" ||
    e === "noscript" ||
    typeof t.children == "string" ||
    typeof t.children == "number" ||
    (typeof t.dangerouslySetInnerHTML == "object" &&
      t.dangerouslySetInnerHTML !== null &&
      t.dangerouslySetInnerHTML.__html != null)
  );
}
var Ma = typeof setTimeout == "function" ? setTimeout : void 0,
  Fg = typeof clearTimeout == "function" ? clearTimeout : void 0,
  _d = typeof Promise == "function" ? Promise : void 0,
  Dg =
    typeof queueMicrotask == "function"
      ? queueMicrotask
      : typeof _d < "u"
      ? function (e) {
          return _d.resolve(null).then(e).catch(Mg);
        }
      : Ma;
function Mg(e) {
  setTimeout(function () {
    throw e;
  });
}
function Wl(e, t) {
  var n = t,
    r = 0;
  do {
    var s = n.nextSibling;
    if ((e.removeChild(n), s && s.nodeType === 8))
      if (((n = s.data), n === "/$")) {
        if (r === 0) {
          e.removeChild(s), qs(t);
          return;
        }
        r--;
      } else (n !== "$" && n !== "$?" && n !== "$!") || r++;
    n = s;
  } while (n);
  qs(t);
}
function En(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (((t = e.data), t === "$" || t === "$!" || t === "$?")) break;
      if (t === "/$") return null;
    }
  }
  return e;
}
function Nd(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (t === 0) return e;
        t--;
      } else n === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var Gr = Math.random().toString(36).slice(2),
  Ft = "__reactFiber$" + Gr,
  Gs = "__reactProps$" + Gr,
  en = "__reactContainer$" + Gr,
  za = "__reactEvents$" + Gr,
  zg = "__reactListeners$" + Gr,
  $g = "__reactHandles$" + Gr;
function Un(e) {
  var t = e[Ft];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if ((t = n[en] || n[Ft])) {
      if (
        ((n = t.alternate),
        t.child !== null || (n !== null && n.child !== null))
      )
        for (e = Nd(e); e !== null; ) {
          if ((n = e[Ft])) return n;
          e = Nd(e);
        }
      return t;
    }
    (e = n), (n = e.parentNode);
  }
  return null;
}
function po(e) {
  return (
    (e = e[Ft] || e[en]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
  );
}
function Sr(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(k(33));
}
function rl(e) {
  return e[Gs] || null;
}
var $a = [],
  Cr = -1;
function Pn(e) {
  return { current: e };
}
function re(e) {
  0 > Cr || ((e.current = $a[Cr]), ($a[Cr] = null), Cr--);
}
function ee(e, t) {
  Cr++, ($a[Cr] = e.current), (e.current = t);
}
var kn = {},
  Le = Pn(kn),
  qe = Pn(!1),
  Xn = kn;
function Mr(e, t) {
  var n = e.type.contextTypes;
  if (!n) return kn;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
    return r.__reactInternalMemoizedMaskedChildContext;
  var s = {},
    o;
  for (o in n) s[o] = t[o];
  return (
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = t),
      (e.__reactInternalMemoizedMaskedChildContext = s)),
    s
  );
}
function Ve(e) {
  return (e = e.childContextTypes), e != null;
}
function Ci() {
  re(qe), re(Le);
}
function jd(e, t, n) {
  if (Le.current !== kn) throw Error(k(168));
  ee(Le, t), ee(qe, n);
}
function dp(e, t, n) {
  var r = e.stateNode;
  if (((t = t.childContextTypes), typeof r.getChildContext != "function"))
    return n;
  r = r.getChildContext();
  for (var s in r) if (!(s in t)) throw Error(k(108, Cy(e) || "Unknown", s));
  return de({}, n, r);
}
function _i(e) {
  return (
    (e =
      ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || kn),
    (Xn = Le.current),
    ee(Le, e),
    ee(qe, qe.current),
    !0
  );
}
function kd(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(k(169));
  n
    ? ((e = dp(e, t, Xn)),
      (r.__reactInternalMemoizedMergedChildContext = e),
      re(qe),
      re(Le),
      ee(Le, e))
    : re(qe),
    ee(qe, n);
}
var Kt = null,
  sl = !1,
  Kl = !1;
function fp(e) {
  Kt === null ? (Kt = [e]) : Kt.push(e);
}
function Ug(e) {
  (sl = !0), fp(e);
}
function Ln() {
  if (!Kl && Kt !== null) {
    Kl = !0;
    var e = 0,
      t = X;
    try {
      var n = Kt;
      for (X = 1; e < n.length; e++) {
        var r = n[e];
        do r = r(!0);
        while (r !== null);
      }
      (Kt = null), (sl = !1);
    } catch (s) {
      throw (Kt !== null && (Kt = Kt.slice(e + 1)), Dh(zu, Ln), s);
    } finally {
      (X = t), (Kl = !1);
    }
  }
  return null;
}
var _r = [],
  Nr = 0,
  Ni = null,
  ji = 0,
  dt = [],
  ft = 0,
  Jn = null,
  Yt = 1,
  Gt = "";
function zn(e, t) {
  (_r[Nr++] = ji), (_r[Nr++] = Ni), (Ni = e), (ji = t);
}
function hp(e, t, n) {
  (dt[ft++] = Yt), (dt[ft++] = Gt), (dt[ft++] = Jn), (Jn = e);
  var r = Yt;
  e = Gt;
  var s = 32 - Ct(r) - 1;
  (r &= ~(1 << s)), (n += 1);
  var o = 32 - Ct(t) + s;
  if (30 < o) {
    var i = s - (s % 5);
    (o = (r & ((1 << i) - 1)).toString(32)),
      (r >>= i),
      (s -= i),
      (Yt = (1 << (32 - Ct(t) + s)) | (n << s) | r),
      (Gt = o + e);
  } else (Yt = (1 << o) | (n << s) | r), (Gt = e);
}
function Ku(e) {
  e.return !== null && (zn(e, 1), hp(e, 1, 0));
}
function Yu(e) {
  for (; e === Ni; )
    (Ni = _r[--Nr]), (_r[Nr] = null), (ji = _r[--Nr]), (_r[Nr] = null);
  for (; e === Jn; )
    (Jn = dt[--ft]),
      (dt[ft] = null),
      (Gt = dt[--ft]),
      (dt[ft] = null),
      (Yt = dt[--ft]),
      (dt[ft] = null);
}
var et = null,
  Ze = null,
  oe = !1,
  St = null;
function pp(e, t) {
  var n = ht(5, null, null, 0);
  (n.elementType = "DELETED"),
    (n.stateNode = t),
    (n.return = e),
    (t = e.deletions),
    t === null ? ((e.deletions = [n]), (e.flags |= 16)) : t.push(n);
}
function Td(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return (
        (t =
          t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase()
            ? null
            : t),
        t !== null
          ? ((e.stateNode = t), (et = e), (Ze = En(t.firstChild)), !0)
          : !1
      );
    case 6:
      return (
        (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
        t !== null ? ((e.stateNode = t), (et = e), (Ze = null), !0) : !1
      );
    case 13:
      return (
        (t = t.nodeType !== 8 ? null : t),
        t !== null
          ? ((n = Jn !== null ? { id: Yt, overflow: Gt } : null),
            (e.memoizedState = {
              dehydrated: t,
              treeContext: n,
              retryLane: 1073741824,
            }),
            (n = ht(18, null, null, 0)),
            (n.stateNode = t),
            (n.return = e),
            (e.child = n),
            (et = e),
            (Ze = null),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function Ua(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Ba(e) {
  if (oe) {
    var t = Ze;
    if (t) {
      var n = t;
      if (!Td(e, t)) {
        if (Ua(e)) throw Error(k(418));
        t = En(n.nextSibling);
        var r = et;
        t && Td(e, t)
          ? pp(r, n)
          : ((e.flags = (e.flags & -4097) | 2), (oe = !1), (et = e));
      }
    } else {
      if (Ua(e)) throw Error(k(418));
      (e.flags = (e.flags & -4097) | 2), (oe = !1), (et = e);
    }
  }
}
function Rd(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
    e = e.return;
  et = e;
}
function Bo(e) {
  if (e !== et) return !1;
  if (!oe) return Rd(e), (oe = !0), !1;
  var t;
  if (
    ((t = e.tag !== 3) &&
      !(t = e.tag !== 5) &&
      ((t = e.type),
      (t = t !== "head" && t !== "body" && !Da(e.type, e.memoizedProps))),
    t && (t = Ze))
  ) {
    if (Ua(e)) throw (mp(), Error(k(418)));
    for (; t; ) pp(e, t), (t = En(t.nextSibling));
  }
  if ((Rd(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
      throw Error(k(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              Ze = En(e.nextSibling);
              break e;
            }
            t--;
          } else (n !== "$" && n !== "$!" && n !== "$?") || t++;
        }
        e = e.nextSibling;
      }
      Ze = null;
    }
  } else Ze = et ? En(e.stateNode.nextSibling) : null;
  return !0;
}
function mp() {
  for (var e = Ze; e; ) e = En(e.nextSibling);
}
function zr() {
  (Ze = et = null), (oe = !1);
}
function Gu(e) {
  St === null ? (St = [e]) : St.push(e);
}
var Bg = sn.ReactCurrentBatchConfig;
function bs(e, t, n) {
  if (
    ((e = n.ref), e !== null && typeof e != "function" && typeof e != "object")
  ) {
    if (n._owner) {
      if (((n = n._owner), n)) {
        if (n.tag !== 1) throw Error(k(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(k(147, e));
      var s = r,
        o = "" + e;
      return t !== null &&
        t.ref !== null &&
        typeof t.ref == "function" &&
        t.ref._stringRef === o
        ? t.ref
        : ((t = function (i) {
            var l = s.refs;
            i === null ? delete l[o] : (l[o] = i);
          }),
          (t._stringRef = o),
          t);
    }
    if (typeof e != "string") throw Error(k(284));
    if (!n._owner) throw Error(k(290, e));
  }
  return e;
}
function Ho(e, t) {
  throw (
    ((e = Object.prototype.toString.call(t)),
    Error(
      k(
        31,
        e === "[object Object]"
          ? "object with keys {" + Object.keys(t).join(", ") + "}"
          : e
      )
    ))
  );
}
function Od(e) {
  var t = e._init;
  return t(e._payload);
}
function yp(e) {
  function t(m, h) {
    if (e) {
      var p = m.deletions;
      p === null ? ((m.deletions = [h]), (m.flags |= 16)) : p.push(h);
    }
  }
  function n(m, h) {
    if (!e) return null;
    for (; h !== null; ) t(m, h), (h = h.sibling);
    return null;
  }
  function r(m, h) {
    for (m = new Map(); h !== null; )
      h.key !== null ? m.set(h.key, h) : m.set(h.index, h), (h = h.sibling);
    return m;
  }
  function s(m, h) {
    return (m = Nn(m, h)), (m.index = 0), (m.sibling = null), m;
  }
  function o(m, h, p) {
    return (
      (m.index = p),
      e
        ? ((p = m.alternate),
          p !== null
            ? ((p = p.index), p < h ? ((m.flags |= 2), h) : p)
            : ((m.flags |= 2), h))
        : ((m.flags |= 1048576), h)
    );
  }
  function i(m) {
    return e && m.alternate === null && (m.flags |= 2), m;
  }
  function l(m, h, p, E) {
    return h === null || h.tag !== 6
      ? ((h = ta(p, m.mode, E)), (h.return = m), h)
      : ((h = s(h, p)), (h.return = m), h);
  }
  function a(m, h, p, E) {
    var _ = p.type;
    return _ === xr
      ? d(m, h, p.props.children, E, p.key)
      : h !== null &&
        (h.elementType === _ ||
          (typeof _ == "object" &&
            _ !== null &&
            _.$$typeof === fn &&
            Od(_) === h.type))
      ? ((E = s(h, p.props)), (E.ref = bs(m, h, p)), (E.return = m), E)
      : ((E = ui(p.type, p.key, p.props, null, m.mode, E)),
        (E.ref = bs(m, h, p)),
        (E.return = m),
        E);
  }
  function u(m, h, p, E) {
    return h === null ||
      h.tag !== 4 ||
      h.stateNode.containerInfo !== p.containerInfo ||
      h.stateNode.implementation !== p.implementation
      ? ((h = na(p, m.mode, E)), (h.return = m), h)
      : ((h = s(h, p.children || [])), (h.return = m), h);
  }
  function d(m, h, p, E, _) {
    return h === null || h.tag !== 7
      ? ((h = Wn(p, m.mode, E, _)), (h.return = m), h)
      : ((h = s(h, p)), (h.return = m), h);
  }
  function f(m, h, p) {
    if ((typeof h == "string" && h !== "") || typeof h == "number")
      return (h = ta("" + h, m.mode, p)), (h.return = m), h;
    if (typeof h == "object" && h !== null) {
      switch (h.$$typeof) {
        case Po:
          return (
            (p = ui(h.type, h.key, h.props, null, m.mode, p)),
            (p.ref = bs(m, null, h)),
            (p.return = m),
            p
          );
        case vr:
          return (h = na(h, m.mode, p)), (h.return = m), h;
        case fn:
          var E = h._init;
          return f(m, E(h._payload), p);
      }
      if (js(h) || ys(h))
        return (h = Wn(h, m.mode, p, null)), (h.return = m), h;
      Ho(m, h);
    }
    return null;
  }
  function y(m, h, p, E) {
    var _ = h !== null ? h.key : null;
    if ((typeof p == "string" && p !== "") || typeof p == "number")
      return _ !== null ? null : l(m, h, "" + p, E);
    if (typeof p == "object" && p !== null) {
      switch (p.$$typeof) {
        case Po:
          return p.key === _ ? a(m, h, p, E) : null;
        case vr:
          return p.key === _ ? u(m, h, p, E) : null;
        case fn:
          return (_ = p._init), y(m, h, _(p._payload), E);
      }
      if (js(p) || ys(p)) return _ !== null ? null : d(m, h, p, E, null);
      Ho(m, p);
    }
    return null;
  }
  function g(m, h, p, E, _) {
    if ((typeof E == "string" && E !== "") || typeof E == "number")
      return (m = m.get(p) || null), l(h, m, "" + E, _);
    if (typeof E == "object" && E !== null) {
      switch (E.$$typeof) {
        case Po:
          return (m = m.get(E.key === null ? p : E.key) || null), a(h, m, E, _);
        case vr:
          return (m = m.get(E.key === null ? p : E.key) || null), u(h, m, E, _);
        case fn:
          var C = E._init;
          return g(m, h, p, C(E._payload), _);
      }
      if (js(E) || ys(E)) return (m = m.get(p) || null), d(h, m, E, _, null);
      Ho(h, E);
    }
    return null;
  }
  function x(m, h, p, E) {
    for (
      var _ = null, C = null, S = h, N = (h = 0), R = null;
      S !== null && N < p.length;
      N++
    ) {
      S.index > N ? ((R = S), (S = null)) : (R = S.sibling);
      var P = y(m, S, p[N], E);
      if (P === null) {
        S === null && (S = R);
        break;
      }
      e && S && P.alternate === null && t(m, S),
        (h = o(P, h, N)),
        C === null ? (_ = P) : (C.sibling = P),
        (C = P),
        (S = R);
    }
    if (N === p.length) return n(m, S), oe && zn(m, N), _;
    if (S === null) {
      for (; N < p.length; N++)
        (S = f(m, p[N], E)),
          S !== null &&
            ((h = o(S, h, N)), C === null ? (_ = S) : (C.sibling = S), (C = S));
      return oe && zn(m, N), _;
    }
    for (S = r(m, S); N < p.length; N++)
      (R = g(S, m, N, p[N], E)),
        R !== null &&
          (e && R.alternate !== null && S.delete(R.key === null ? N : R.key),
          (h = o(R, h, N)),
          C === null ? (_ = R) : (C.sibling = R),
          (C = R));
    return (
      e &&
        S.forEach(function (O) {
          return t(m, O);
        }),
      oe && zn(m, N),
      _
    );
  }
  function b(m, h, p, E) {
    var _ = ys(p);
    if (typeof _ != "function") throw Error(k(150));
    if (((p = _.call(p)), p == null)) throw Error(k(151));
    for (
      var C = (_ = null), S = h, N = (h = 0), R = null, P = p.next();
      S !== null && !P.done;
      N++, P = p.next()
    ) {
      S.index > N ? ((R = S), (S = null)) : (R = S.sibling);
      var O = y(m, S, P.value, E);
      if (O === null) {
        S === null && (S = R);
        break;
      }
      e && S && O.alternate === null && t(m, S),
        (h = o(O, h, N)),
        C === null ? (_ = O) : (C.sibling = O),
        (C = O),
        (S = R);
    }
    if (P.done) return n(m, S), oe && zn(m, N), _;
    if (S === null) {
      for (; !P.done; N++, P = p.next())
        (P = f(m, P.value, E)),
          P !== null &&
            ((h = o(P, h, N)), C === null ? (_ = P) : (C.sibling = P), (C = P));
      return oe && zn(m, N), _;
    }
    for (S = r(m, S); !P.done; N++, P = p.next())
      (P = g(S, m, N, P.value, E)),
        P !== null &&
          (e && P.alternate !== null && S.delete(P.key === null ? N : P.key),
          (h = o(P, h, N)),
          C === null ? (_ = P) : (C.sibling = P),
          (C = P));
    return (
      e &&
        S.forEach(function (I) {
          return t(m, I);
        }),
      oe && zn(m, N),
      _
    );
  }
  function w(m, h, p, E) {
    if (
      (typeof p == "object" &&
        p !== null &&
        p.type === xr &&
        p.key === null &&
        (p = p.props.children),
      typeof p == "object" && p !== null)
    ) {
      switch (p.$$typeof) {
        case Po:
          e: {
            for (var _ = p.key, C = h; C !== null; ) {
              if (C.key === _) {
                if (((_ = p.type), _ === xr)) {
                  if (C.tag === 7) {
                    n(m, C.sibling),
                      (h = s(C, p.props.children)),
                      (h.return = m),
                      (m = h);
                    break e;
                  }
                } else if (
                  C.elementType === _ ||
                  (typeof _ == "object" &&
                    _ !== null &&
                    _.$$typeof === fn &&
                    Od(_) === C.type)
                ) {
                  n(m, C.sibling),
                    (h = s(C, p.props)),
                    (h.ref = bs(m, C, p)),
                    (h.return = m),
                    (m = h);
                  break e;
                }
                n(m, C);
                break;
              } else t(m, C);
              C = C.sibling;
            }
            p.type === xr
              ? ((h = Wn(p.props.children, m.mode, E, p.key)),
                (h.return = m),
                (m = h))
              : ((E = ui(p.type, p.key, p.props, null, m.mode, E)),
                (E.ref = bs(m, h, p)),
                (E.return = m),
                (m = E));
          }
          return i(m);
        case vr:
          e: {
            for (C = p.key; h !== null; ) {
              if (h.key === C)
                if (
                  h.tag === 4 &&
                  h.stateNode.containerInfo === p.containerInfo &&
                  h.stateNode.implementation === p.implementation
                ) {
                  n(m, h.sibling),
                    (h = s(h, p.children || [])),
                    (h.return = m),
                    (m = h);
                  break e;
                } else {
                  n(m, h);
                  break;
                }
              else t(m, h);
              h = h.sibling;
            }
            (h = na(p, m.mode, E)), (h.return = m), (m = h);
          }
          return i(m);
        case fn:
          return (C = p._init), w(m, h, C(p._payload), E);
      }
      if (js(p)) return x(m, h, p, E);
      if (ys(p)) return b(m, h, p, E);
      Ho(m, p);
    }
    return (typeof p == "string" && p !== "") || typeof p == "number"
      ? ((p = "" + p),
        h !== null && h.tag === 6
          ? (n(m, h.sibling), (h = s(h, p)), (h.return = m), (m = h))
          : (n(m, h), (h = ta(p, m.mode, E)), (h.return = m), (m = h)),
        i(m))
      : n(m, h);
  }
  return w;
}
var $r = yp(!0),
  gp = yp(!1),
  ki = Pn(null),
  Ti = null,
  jr = null,
  Xu = null;
function Ju() {
  Xu = jr = Ti = null;
}
function Zu(e) {
  var t = ki.current;
  re(ki), (e._currentValue = t);
}
function Ha(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if (
      ((e.childLanes & t) !== t
        ? ((e.childLanes |= t), r !== null && (r.childLanes |= t))
        : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t),
      e === n)
    )
      break;
    e = e.return;
  }
}
function Ar(e, t) {
  (Ti = e),
    (Xu = jr = null),
    (e = e.dependencies),
    e !== null &&
      e.firstContext !== null &&
      (e.lanes & t && (Qe = !0), (e.firstContext = null));
}
function mt(e) {
  var t = e._currentValue;
  if (Xu !== e)
    if (((e = { context: e, memoizedValue: t, next: null }), jr === null)) {
      if (Ti === null) throw Error(k(308));
      (jr = e), (Ti.dependencies = { lanes: 0, firstContext: e });
    } else jr = jr.next = e;
  return t;
}
var Bn = null;
function ec(e) {
  Bn === null ? (Bn = [e]) : Bn.push(e);
}
function vp(e, t, n, r) {
  var s = t.interleaved;
  return (
    s === null ? ((n.next = n), ec(t)) : ((n.next = s.next), (s.next = n)),
    (t.interleaved = n),
    tn(e, r)
  );
}
function tn(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; )
    (e.childLanes |= t),
      (n = e.alternate),
      n !== null && (n.childLanes |= t),
      (n = e),
      (e = e.return);
  return n.tag === 3 ? n.stateNode : null;
}
var hn = !1;
function tc(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  };
}
function xp(e, t) {
  (e = e.updateQueue),
    t.updateQueue === e &&
      (t.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects,
      });
}
function Xt(e, t) {
  return {
    eventTime: e,
    lane: t,
    tag: 0,
    payload: null,
    callback: null,
    next: null,
  };
}
function Sn(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (((r = r.shared), G & 2)) {
    var s = r.pending;
    return (
      s === null ? (t.next = t) : ((t.next = s.next), (s.next = t)),
      (r.pending = t),
      tn(e, n)
    );
  }
  return (
    (s = r.interleaved),
    s === null ? ((t.next = t), ec(r)) : ((t.next = s.next), (s.next = t)),
    (r.interleaved = t),
    tn(e, n)
  );
}
function ri(e, t, n) {
  if (
    ((t = t.updateQueue), t !== null && ((t = t.shared), (n & 4194240) !== 0))
  ) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), $u(e, n);
  }
}
function Pd(e, t) {
  var n = e.updateQueue,
    r = e.alternate;
  if (r !== null && ((r = r.updateQueue), n === r)) {
    var s = null,
      o = null;
    if (((n = n.firstBaseUpdate), n !== null)) {
      do {
        var i = {
          eventTime: n.eventTime,
          lane: n.lane,
          tag: n.tag,
          payload: n.payload,
          callback: n.callback,
          next: null,
        };
        o === null ? (s = o = i) : (o = o.next = i), (n = n.next);
      } while (n !== null);
      o === null ? (s = o = t) : (o = o.next = t);
    } else s = o = t;
    (n = {
      baseState: r.baseState,
      firstBaseUpdate: s,
      lastBaseUpdate: o,
      shared: r.shared,
      effects: r.effects,
    }),
      (e.updateQueue = n);
    return;
  }
  (e = n.lastBaseUpdate),
    e === null ? (n.firstBaseUpdate = t) : (e.next = t),
    (n.lastBaseUpdate = t);
}
function Ri(e, t, n, r) {
  var s = e.updateQueue;
  hn = !1;
  var o = s.firstBaseUpdate,
    i = s.lastBaseUpdate,
    l = s.shared.pending;
  if (l !== null) {
    s.shared.pending = null;
    var a = l,
      u = a.next;
    (a.next = null), i === null ? (o = u) : (i.next = u), (i = a);
    var d = e.alternate;
    d !== null &&
      ((d = d.updateQueue),
      (l = d.lastBaseUpdate),
      l !== i &&
        (l === null ? (d.firstBaseUpdate = u) : (l.next = u),
        (d.lastBaseUpdate = a)));
  }
  if (o !== null) {
    var f = s.baseState;
    (i = 0), (d = u = a = null), (l = o);
    do {
      var y = l.lane,
        g = l.eventTime;
      if ((r & y) === y) {
        d !== null &&
          (d = d.next =
            {
              eventTime: g,
              lane: 0,
              tag: l.tag,
              payload: l.payload,
              callback: l.callback,
              next: null,
            });
        e: {
          var x = e,
            b = l;
          switch (((y = t), (g = n), b.tag)) {
            case 1:
              if (((x = b.payload), typeof x == "function")) {
                f = x.call(g, f, y);
                break e;
              }
              f = x;
              break e;
            case 3:
              x.flags = (x.flags & -65537) | 128;
            case 0:
              if (
                ((x = b.payload),
                (y = typeof x == "function" ? x.call(g, f, y) : x),
                y == null)
              )
                break e;
              f = de({}, f, y);
              break e;
            case 2:
              hn = !0;
          }
        }
        l.callback !== null &&
          l.lane !== 0 &&
          ((e.flags |= 64),
          (y = s.effects),
          y === null ? (s.effects = [l]) : y.push(l));
      } else
        (g = {
          eventTime: g,
          lane: y,
          tag: l.tag,
          payload: l.payload,
          callback: l.callback,
          next: null,
        }),
          d === null ? ((u = d = g), (a = f)) : (d = d.next = g),
          (i |= y);
      if (((l = l.next), l === null)) {
        if (((l = s.shared.pending), l === null)) break;
        (y = l),
          (l = y.next),
          (y.next = null),
          (s.lastBaseUpdate = y),
          (s.shared.pending = null);
      }
    } while (!0);
    if (
      (d === null && (a = f),
      (s.baseState = a),
      (s.firstBaseUpdate = u),
      (s.lastBaseUpdate = d),
      (t = s.shared.interleaved),
      t !== null)
    ) {
      s = t;
      do (i |= s.lane), (s = s.next);
      while (s !== t);
    } else o === null && (s.shared.lanes = 0);
    (er |= i), (e.lanes = i), (e.memoizedState = f);
  }
}
function Ld(e, t, n) {
  if (((e = t.effects), (t.effects = null), e !== null))
    for (t = 0; t < e.length; t++) {
      var r = e[t],
        s = r.callback;
      if (s !== null) {
        if (((r.callback = null), (r = n), typeof s != "function"))
          throw Error(k(191, s));
        s.call(r);
      }
    }
}
var mo = {},
  Mt = Pn(mo),
  Xs = Pn(mo),
  Js = Pn(mo);
function Hn(e) {
  if (e === mo) throw Error(k(174));
  return e;
}
function nc(e, t) {
  switch ((ee(Js, t), ee(Xs, e), ee(Mt, mo), (e = t.nodeType), e)) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : Sa(null, "");
      break;
    default:
      (e = e === 8 ? t.parentNode : t),
        (t = e.namespaceURI || null),
        (e = e.tagName),
        (t = Sa(t, e));
  }
  re(Mt), ee(Mt, t);
}
function Ur() {
  re(Mt), re(Xs), re(Js);
}
function wp(e) {
  Hn(Js.current);
  var t = Hn(Mt.current),
    n = Sa(t, e.type);
  t !== n && (ee(Xs, e), ee(Mt, n));
}
function rc(e) {
  Xs.current === e && (re(Mt), re(Xs));
}
var ae = Pn(0);
function Oi(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (
        n !== null &&
        ((n = n.dehydrated), n === null || n.data === "$?" || n.data === "$!")
      )
        return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      (t.child.return = t), (t = t.child);
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    (t.sibling.return = t.return), (t = t.sibling);
  }
  return null;
}
var Yl = [];
function sc() {
  for (var e = 0; e < Yl.length; e++)
    Yl[e]._workInProgressVersionPrimary = null;
  Yl.length = 0;
}
var si = sn.ReactCurrentDispatcher,
  Gl = sn.ReactCurrentBatchConfig,
  Zn = 0,
  ue = null,
  we = null,
  Ce = null,
  Pi = !1,
  Fs = !1,
  Zs = 0,
  Hg = 0;
function Re() {
  throw Error(k(321));
}
function oc(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++)
    if (!Nt(e[n], t[n])) return !1;
  return !0;
}
function ic(e, t, n, r, s, o) {
  if (
    ((Zn = o),
    (ue = t),
    (t.memoizedState = null),
    (t.updateQueue = null),
    (t.lanes = 0),
    (si.current = e === null || e.memoizedState === null ? Wg : Kg),
    (e = n(r, s)),
    Fs)
  ) {
    o = 0;
    do {
      if (((Fs = !1), (Zs = 0), 25 <= o)) throw Error(k(301));
      (o += 1),
        (Ce = we = null),
        (t.updateQueue = null),
        (si.current = Yg),
        (e = n(r, s));
    } while (Fs);
  }
  if (
    ((si.current = Li),
    (t = we !== null && we.next !== null),
    (Zn = 0),
    (Ce = we = ue = null),
    (Pi = !1),
    t)
  )
    throw Error(k(300));
  return e;
}
function lc() {
  var e = Zs !== 0;
  return (Zs = 0), e;
}
function It() {
  var e = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  return Ce === null ? (ue.memoizedState = Ce = e) : (Ce = Ce.next = e), Ce;
}
function yt() {
  if (we === null) {
    var e = ue.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = we.next;
  var t = Ce === null ? ue.memoizedState : Ce.next;
  if (t !== null) (Ce = t), (we = e);
  else {
    if (e === null) throw Error(k(310));
    (we = e),
      (e = {
        memoizedState: we.memoizedState,
        baseState: we.baseState,
        baseQueue: we.baseQueue,
        queue: we.queue,
        next: null,
      }),
      Ce === null ? (ue.memoizedState = Ce = e) : (Ce = Ce.next = e);
  }
  return Ce;
}
function eo(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function Xl(e) {
  var t = yt(),
    n = t.queue;
  if (n === null) throw Error(k(311));
  n.lastRenderedReducer = e;
  var r = we,
    s = r.baseQueue,
    o = n.pending;
  if (o !== null) {
    if (s !== null) {
      var i = s.next;
      (s.next = o.next), (o.next = i);
    }
    (r.baseQueue = s = o), (n.pending = null);
  }
  if (s !== null) {
    (o = s.next), (r = r.baseState);
    var l = (i = null),
      a = null,
      u = o;
    do {
      var d = u.lane;
      if ((Zn & d) === d)
        a !== null &&
          (a = a.next =
            {
              lane: 0,
              action: u.action,
              hasEagerState: u.hasEagerState,
              eagerState: u.eagerState,
              next: null,
            }),
          (r = u.hasEagerState ? u.eagerState : e(r, u.action));
      else {
        var f = {
          lane: d,
          action: u.action,
          hasEagerState: u.hasEagerState,
          eagerState: u.eagerState,
          next: null,
        };
        a === null ? ((l = a = f), (i = r)) : (a = a.next = f),
          (ue.lanes |= d),
          (er |= d);
      }
      u = u.next;
    } while (u !== null && u !== o);
    a === null ? (i = r) : (a.next = l),
      Nt(r, t.memoizedState) || (Qe = !0),
      (t.memoizedState = r),
      (t.baseState = i),
      (t.baseQueue = a),
      (n.lastRenderedState = r);
  }
  if (((e = n.interleaved), e !== null)) {
    s = e;
    do (o = s.lane), (ue.lanes |= o), (er |= o), (s = s.next);
    while (s !== e);
  } else s === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function Jl(e) {
  var t = yt(),
    n = t.queue;
  if (n === null) throw Error(k(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch,
    s = n.pending,
    o = t.memoizedState;
  if (s !== null) {
    n.pending = null;
    var i = (s = s.next);
    do (o = e(o, i.action)), (i = i.next);
    while (i !== s);
    Nt(o, t.memoizedState) || (Qe = !0),
      (t.memoizedState = o),
      t.baseQueue === null && (t.baseState = o),
      (n.lastRenderedState = o);
  }
  return [o, r];
}
function bp() {}
function Ep(e, t) {
  var n = ue,
    r = yt(),
    s = t(),
    o = !Nt(r.memoizedState, s);
  if (
    (o && ((r.memoizedState = s), (Qe = !0)),
    (r = r.queue),
    ac(_p.bind(null, n, r, e), [e]),
    r.getSnapshot !== t || o || (Ce !== null && Ce.memoizedState.tag & 1))
  ) {
    if (
      ((n.flags |= 2048),
      to(9, Cp.bind(null, n, r, s, t), void 0, null),
      _e === null)
    )
      throw Error(k(349));
    Zn & 30 || Sp(n, t, s);
  }
  return s;
}
function Sp(e, t, n) {
  (e.flags |= 16384),
    (e = { getSnapshot: t, value: n }),
    (t = ue.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (ue.updateQueue = t),
        (t.stores = [e]))
      : ((n = t.stores), n === null ? (t.stores = [e]) : n.push(e));
}
function Cp(e, t, n, r) {
  (t.value = n), (t.getSnapshot = r), Np(t) && jp(e);
}
function _p(e, t, n) {
  return n(function () {
    Np(t) && jp(e);
  });
}
function Np(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !Nt(e, n);
  } catch {
    return !0;
  }
}
function jp(e) {
  var t = tn(e, 1);
  t !== null && _t(t, e, 1, -1);
}
function Ad(e) {
  var t = It();
  return (
    typeof e == "function" && (e = e()),
    (t.memoizedState = t.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: eo,
      lastRenderedState: e,
    }),
    (t.queue = e),
    (e = e.dispatch = Vg.bind(null, ue, e)),
    [t.memoizedState, e]
  );
}
function to(e, t, n, r) {
  return (
    (e = { tag: e, create: t, destroy: n, deps: r, next: null }),
    (t = ue.updateQueue),
    t === null
      ? ((t = { lastEffect: null, stores: null }),
        (ue.updateQueue = t),
        (t.lastEffect = e.next = e))
      : ((n = t.lastEffect),
        n === null
          ? (t.lastEffect = e.next = e)
          : ((r = n.next), (n.next = e), (e.next = r), (t.lastEffect = e))),
    e
  );
}
function kp() {
  return yt().memoizedState;
}
function oi(e, t, n, r) {
  var s = It();
  (ue.flags |= e),
    (s.memoizedState = to(1 | t, n, void 0, r === void 0 ? null : r));
}
function ol(e, t, n, r) {
  var s = yt();
  r = r === void 0 ? null : r;
  var o = void 0;
  if (we !== null) {
    var i = we.memoizedState;
    if (((o = i.destroy), r !== null && oc(r, i.deps))) {
      s.memoizedState = to(t, n, o, r);
      return;
    }
  }
  (ue.flags |= e), (s.memoizedState = to(1 | t, n, o, r));
}
function Id(e, t) {
  return oi(8390656, 8, e, t);
}
function ac(e, t) {
  return ol(2048, 8, e, t);
}
function Tp(e, t) {
  return ol(4, 2, e, t);
}
function Rp(e, t) {
  return ol(4, 4, e, t);
}
function Op(e, t) {
  if (typeof t == "function")
    return (
      (e = e()),
      t(e),
      function () {
        t(null);
      }
    );
  if (t != null)
    return (
      (e = e()),
      (t.current = e),
      function () {
        t.current = null;
      }
    );
}
function Pp(e, t, n) {
  return (
    (n = n != null ? n.concat([e]) : null), ol(4, 4, Op.bind(null, t, e), n)
  );
}
function uc() {}
function Lp(e, t) {
  var n = yt();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && oc(t, r[1])
    ? r[0]
    : ((n.memoizedState = [e, t]), e);
}
function Ap(e, t) {
  var n = yt();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && oc(t, r[1])
    ? r[0]
    : ((e = e()), (n.memoizedState = [e, t]), e);
}
function Ip(e, t, n) {
  return Zn & 21
    ? (Nt(n, t) || ((n = $h()), (ue.lanes |= n), (er |= n), (e.baseState = !0)),
      t)
    : (e.baseState && ((e.baseState = !1), (Qe = !0)), (e.memoizedState = n));
}
function Qg(e, t) {
  var n = X;
  (X = n !== 0 && 4 > n ? n : 4), e(!0);
  var r = Gl.transition;
  Gl.transition = {};
  try {
    e(!1), t();
  } finally {
    (X = n), (Gl.transition = r);
  }
}
function Fp() {
  return yt().memoizedState;
}
function qg(e, t, n) {
  var r = _n(e);
  if (
    ((n = {
      lane: r,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    Dp(e))
  )
    Mp(t, n);
  else if (((n = vp(e, t, n, r)), n !== null)) {
    var s = $e();
    _t(n, e, r, s), zp(n, t, r);
  }
}
function Vg(e, t, n) {
  var r = _n(e),
    s = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (Dp(e)) Mp(t, s);
  else {
    var o = e.alternate;
    if (
      e.lanes === 0 &&
      (o === null || o.lanes === 0) &&
      ((o = t.lastRenderedReducer), o !== null)
    )
      try {
        var i = t.lastRenderedState,
          l = o(i, n);
        if (((s.hasEagerState = !0), (s.eagerState = l), Nt(l, i))) {
          var a = t.interleaved;
          a === null
            ? ((s.next = s), ec(t))
            : ((s.next = a.next), (a.next = s)),
            (t.interleaved = s);
          return;
        }
      } catch {
      } finally {
      }
    (n = vp(e, t, s, r)),
      n !== null && ((s = $e()), _t(n, e, r, s), zp(n, t, r));
  }
}
function Dp(e) {
  var t = e.alternate;
  return e === ue || (t !== null && t === ue);
}
function Mp(e, t) {
  Fs = Pi = !0;
  var n = e.pending;
  n === null ? (t.next = t) : ((t.next = n.next), (n.next = t)),
    (e.pending = t);
}
function zp(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    (r &= e.pendingLanes), (n |= r), (t.lanes = n), $u(e, n);
  }
}
var Li = {
    readContext: mt,
    useCallback: Re,
    useContext: Re,
    useEffect: Re,
    useImperativeHandle: Re,
    useInsertionEffect: Re,
    useLayoutEffect: Re,
    useMemo: Re,
    useReducer: Re,
    useRef: Re,
    useState: Re,
    useDebugValue: Re,
    useDeferredValue: Re,
    useTransition: Re,
    useMutableSource: Re,
    useSyncExternalStore: Re,
    useId: Re,
    unstable_isNewReconciler: !1,
  },
  Wg = {
    readContext: mt,
    useCallback: function (e, t) {
      return (It().memoizedState = [e, t === void 0 ? null : t]), e;
    },
    useContext: mt,
    useEffect: Id,
    useImperativeHandle: function (e, t, n) {
      return (
        (n = n != null ? n.concat([e]) : null),
        oi(4194308, 4, Op.bind(null, t, e), n)
      );
    },
    useLayoutEffect: function (e, t) {
      return oi(4194308, 4, e, t);
    },
    useInsertionEffect: function (e, t) {
      return oi(4, 2, e, t);
    },
    useMemo: function (e, t) {
      var n = It();
      return (
        (t = t === void 0 ? null : t), (e = e()), (n.memoizedState = [e, t]), e
      );
    },
    useReducer: function (e, t, n) {
      var r = It();
      return (
        (t = n !== void 0 ? n(t) : t),
        (r.memoizedState = r.baseState = t),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: t,
        }),
        (r.queue = e),
        (e = e.dispatch = qg.bind(null, ue, e)),
        [r.memoizedState, e]
      );
    },
    useRef: function (e) {
      var t = It();
      return (e = { current: e }), (t.memoizedState = e);
    },
    useState: Ad,
    useDebugValue: uc,
    useDeferredValue: function (e) {
      return (It().memoizedState = e);
    },
    useTransition: function () {
      var e = Ad(!1),
        t = e[0];
      return (e = Qg.bind(null, e[1])), (It().memoizedState = e), [t, e];
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, t, n) {
      var r = ue,
        s = It();
      if (oe) {
        if (n === void 0) throw Error(k(407));
        n = n();
      } else {
        if (((n = t()), _e === null)) throw Error(k(349));
        Zn & 30 || Sp(r, t, n);
      }
      s.memoizedState = n;
      var o = { value: n, getSnapshot: t };
      return (
        (s.queue = o),
        Id(_p.bind(null, r, o, e), [e]),
        (r.flags |= 2048),
        to(9, Cp.bind(null, r, o, n, t), void 0, null),
        n
      );
    },
    useId: function () {
      var e = It(),
        t = _e.identifierPrefix;
      if (oe) {
        var n = Gt,
          r = Yt;
        (n = (r & ~(1 << (32 - Ct(r) - 1))).toString(32) + n),
          (t = ":" + t + "R" + n),
          (n = Zs++),
          0 < n && (t += "H" + n.toString(32)),
          (t += ":");
      } else (n = Hg++), (t = ":" + t + "r" + n.toString(32) + ":");
      return (e.memoizedState = t);
    },
    unstable_isNewReconciler: !1,
  },
  Kg = {
    readContext: mt,
    useCallback: Lp,
    useContext: mt,
    useEffect: ac,
    useImperativeHandle: Pp,
    useInsertionEffect: Tp,
    useLayoutEffect: Rp,
    useMemo: Ap,
    useReducer: Xl,
    useRef: kp,
    useState: function () {
      return Xl(eo);
    },
    useDebugValue: uc,
    useDeferredValue: function (e) {
      var t = yt();
      return Ip(t, we.memoizedState, e);
    },
    useTransition: function () {
      var e = Xl(eo)[0],
        t = yt().memoizedState;
      return [e, t];
    },
    useMutableSource: bp,
    useSyncExternalStore: Ep,
    useId: Fp,
    unstable_isNewReconciler: !1,
  },
  Yg = {
    readContext: mt,
    useCallback: Lp,
    useContext: mt,
    useEffect: ac,
    useImperativeHandle: Pp,
    useInsertionEffect: Tp,
    useLayoutEffect: Rp,
    useMemo: Ap,
    useReducer: Jl,
    useRef: kp,
    useState: function () {
      return Jl(eo);
    },
    useDebugValue: uc,
    useDeferredValue: function (e) {
      var t = yt();
      return we === null ? (t.memoizedState = e) : Ip(t, we.memoizedState, e);
    },
    useTransition: function () {
      var e = Jl(eo)[0],
        t = yt().memoizedState;
      return [e, t];
    },
    useMutableSource: bp,
    useSyncExternalStore: Ep,
    useId: Fp,
    unstable_isNewReconciler: !1,
  };
function bt(e, t) {
  if (e && e.defaultProps) {
    (t = de({}, t)), (e = e.defaultProps);
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function Qa(e, t, n, r) {
  (t = e.memoizedState),
    (n = n(r, t)),
    (n = n == null ? t : de({}, t, n)),
    (e.memoizedState = n),
    e.lanes === 0 && (e.updateQueue.baseState = n);
}
var il = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? lr(e) === e : !1;
  },
  enqueueSetState: function (e, t, n) {
    e = e._reactInternals;
    var r = $e(),
      s = _n(e),
      o = Xt(r, s);
    (o.payload = t),
      n != null && (o.callback = n),
      (t = Sn(e, o, s)),
      t !== null && (_t(t, e, s, r), ri(t, e, s));
  },
  enqueueReplaceState: function (e, t, n) {
    e = e._reactInternals;
    var r = $e(),
      s = _n(e),
      o = Xt(r, s);
    (o.tag = 1),
      (o.payload = t),
      n != null && (o.callback = n),
      (t = Sn(e, o, s)),
      t !== null && (_t(t, e, s, r), ri(t, e, s));
  },
  enqueueForceUpdate: function (e, t) {
    e = e._reactInternals;
    var n = $e(),
      r = _n(e),
      s = Xt(n, r);
    (s.tag = 2),
      t != null && (s.callback = t),
      (t = Sn(e, s, r)),
      t !== null && (_t(t, e, r, n), ri(t, e, r));
  },
};
function Fd(e, t, n, r, s, o, i) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == "function"
      ? e.shouldComponentUpdate(r, o, i)
      : t.prototype && t.prototype.isPureReactComponent
      ? !Ws(n, r) || !Ws(s, o)
      : !0
  );
}
function $p(e, t, n) {
  var r = !1,
    s = kn,
    o = t.contextType;
  return (
    typeof o == "object" && o !== null
      ? (o = mt(o))
      : ((s = Ve(t) ? Xn : Le.current),
        (r = t.contextTypes),
        (o = (r = r != null) ? Mr(e, s) : kn)),
    (t = new t(n, o)),
    (e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null),
    (t.updater = il),
    (e.stateNode = t),
    (t._reactInternals = e),
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = s),
      (e.__reactInternalMemoizedMaskedChildContext = o)),
    t
  );
}
function Dd(e, t, n, r) {
  (e = t.state),
    typeof t.componentWillReceiveProps == "function" &&
      t.componentWillReceiveProps(n, r),
    typeof t.UNSAFE_componentWillReceiveProps == "function" &&
      t.UNSAFE_componentWillReceiveProps(n, r),
    t.state !== e && il.enqueueReplaceState(t, t.state, null);
}
function qa(e, t, n, r) {
  var s = e.stateNode;
  (s.props = n), (s.state = e.memoizedState), (s.refs = {}), tc(e);
  var o = t.contextType;
  typeof o == "object" && o !== null
    ? (s.context = mt(o))
    : ((o = Ve(t) ? Xn : Le.current), (s.context = Mr(e, o))),
    (s.state = e.memoizedState),
    (o = t.getDerivedStateFromProps),
    typeof o == "function" && (Qa(e, t, o, n), (s.state = e.memoizedState)),
    typeof t.getDerivedStateFromProps == "function" ||
      typeof s.getSnapshotBeforeUpdate == "function" ||
      (typeof s.UNSAFE_componentWillMount != "function" &&
        typeof s.componentWillMount != "function") ||
      ((t = s.state),
      typeof s.componentWillMount == "function" && s.componentWillMount(),
      typeof s.UNSAFE_componentWillMount == "function" &&
        s.UNSAFE_componentWillMount(),
      t !== s.state && il.enqueueReplaceState(s, s.state, null),
      Ri(e, n, s, r),
      (s.state = e.memoizedState)),
    typeof s.componentDidMount == "function" && (e.flags |= 4194308);
}
function Br(e, t) {
  try {
    var n = "",
      r = t;
    do (n += Sy(r)), (r = r.return);
    while (r);
    var s = n;
  } catch (o) {
    s =
      `
Error generating stack: ` +
      o.message +
      `
` +
      o.stack;
  }
  return { value: e, source: t, stack: s, digest: null };
}
function Zl(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function Va(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function () {
      throw n;
    });
  }
}
var Gg = typeof WeakMap == "function" ? WeakMap : Map;
function Up(e, t, n) {
  (n = Xt(-1, n)), (n.tag = 3), (n.payload = { element: null });
  var r = t.value;
  return (
    (n.callback = function () {
      Ii || ((Ii = !0), (nu = r)), Va(e, t);
    }),
    n
  );
}
function Bp(e, t, n) {
  (n = Xt(-1, n)), (n.tag = 3);
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var s = t.value;
    (n.payload = function () {
      return r(s);
    }),
      (n.callback = function () {
        Va(e, t);
      });
  }
  var o = e.stateNode;
  return (
    o !== null &&
      typeof o.componentDidCatch == "function" &&
      (n.callback = function () {
        Va(e, t),
          typeof r != "function" &&
            (Cn === null ? (Cn = new Set([this])) : Cn.add(this));
        var i = t.stack;
        this.componentDidCatch(t.value, {
          componentStack: i !== null ? i : "",
        });
      }),
    n
  );
}
function Md(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new Gg();
    var s = new Set();
    r.set(t, s);
  } else (s = r.get(t)), s === void 0 && ((s = new Set()), r.set(t, s));
  s.has(n) || (s.add(n), (e = cv.bind(null, e, t, n)), t.then(e, e));
}
function zd(e) {
  do {
    var t;
    if (
      ((t = e.tag === 13) &&
        ((t = e.memoizedState), (t = t !== null ? t.dehydrated !== null : !0)),
      t)
    )
      return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function $d(e, t, n, r, s) {
  return e.mode & 1
    ? ((e.flags |= 65536), (e.lanes = s), e)
    : (e === t
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (n.flags |= 131072),
          (n.flags &= -52805),
          n.tag === 1 &&
            (n.alternate === null
              ? (n.tag = 17)
              : ((t = Xt(-1, 1)), (t.tag = 2), Sn(n, t, 1))),
          (n.lanes |= 1)),
      e);
}
var Xg = sn.ReactCurrentOwner,
  Qe = !1;
function De(e, t, n, r) {
  t.child = e === null ? gp(t, null, n, r) : $r(t, e.child, n, r);
}
function Ud(e, t, n, r, s) {
  n = n.render;
  var o = t.ref;
  return (
    Ar(t, s),
    (r = ic(e, t, n, r, o, s)),
    (n = lc()),
    e !== null && !Qe
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~s),
        nn(e, t, s))
      : (oe && n && Ku(t), (t.flags |= 1), De(e, t, r, s), t.child)
  );
}
function Bd(e, t, n, r, s) {
  if (e === null) {
    var o = n.type;
    return typeof o == "function" &&
      !gc(o) &&
      o.defaultProps === void 0 &&
      n.compare === null &&
      n.defaultProps === void 0
      ? ((t.tag = 15), (t.type = o), Hp(e, t, o, r, s))
      : ((e = ui(n.type, null, r, t, t.mode, s)),
        (e.ref = t.ref),
        (e.return = t),
        (t.child = e));
  }
  if (((o = e.child), !(e.lanes & s))) {
    var i = o.memoizedProps;
    if (
      ((n = n.compare), (n = n !== null ? n : Ws), n(i, r) && e.ref === t.ref)
    )
      return nn(e, t, s);
  }
  return (
    (t.flags |= 1),
    (e = Nn(o, r)),
    (e.ref = t.ref),
    (e.return = t),
    (t.child = e)
  );
}
function Hp(e, t, n, r, s) {
  if (e !== null) {
    var o = e.memoizedProps;
    if (Ws(o, r) && e.ref === t.ref)
      if (((Qe = !1), (t.pendingProps = r = o), (e.lanes & s) !== 0))
        e.flags & 131072 && (Qe = !0);
      else return (t.lanes = e.lanes), nn(e, t, s);
  }
  return Wa(e, t, n, r, s);
}
function Qp(e, t, n) {
  var r = t.pendingProps,
    s = r.children,
    o = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden")
    if (!(t.mode & 1))
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        ee(Tr, Je),
        (Je |= n);
    else {
      if (!(n & 1073741824))
        return (
          (e = o !== null ? o.baseLanes | n : n),
          (t.lanes = t.childLanes = 1073741824),
          (t.memoizedState = {
            baseLanes: e,
            cachePool: null,
            transitions: null,
          }),
          (t.updateQueue = null),
          ee(Tr, Je),
          (Je |= e),
          null
        );
      (t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (r = o !== null ? o.baseLanes : n),
        ee(Tr, Je),
        (Je |= r);
    }
  else
    o !== null ? ((r = o.baseLanes | n), (t.memoizedState = null)) : (r = n),
      ee(Tr, Je),
      (Je |= r);
  return De(e, t, s, n), t.child;
}
function qp(e, t) {
  var n = t.ref;
  ((e === null && n !== null) || (e !== null && e.ref !== n)) &&
    ((t.flags |= 512), (t.flags |= 2097152));
}
function Wa(e, t, n, r, s) {
  var o = Ve(n) ? Xn : Le.current;
  return (
    (o = Mr(t, o)),
    Ar(t, s),
    (n = ic(e, t, n, r, o, s)),
    (r = lc()),
    e !== null && !Qe
      ? ((t.updateQueue = e.updateQueue),
        (t.flags &= -2053),
        (e.lanes &= ~s),
        nn(e, t, s))
      : (oe && r && Ku(t), (t.flags |= 1), De(e, t, n, s), t.child)
  );
}
function Hd(e, t, n, r, s) {
  if (Ve(n)) {
    var o = !0;
    _i(t);
  } else o = !1;
  if ((Ar(t, s), t.stateNode === null))
    ii(e, t), $p(t, n, r), qa(t, n, r, s), (r = !0);
  else if (e === null) {
    var i = t.stateNode,
      l = t.memoizedProps;
    i.props = l;
    var a = i.context,
      u = n.contextType;
    typeof u == "object" && u !== null
      ? (u = mt(u))
      : ((u = Ve(n) ? Xn : Le.current), (u = Mr(t, u)));
    var d = n.getDerivedStateFromProps,
      f =
        typeof d == "function" ||
        typeof i.getSnapshotBeforeUpdate == "function";
    f ||
      (typeof i.UNSAFE_componentWillReceiveProps != "function" &&
        typeof i.componentWillReceiveProps != "function") ||
      ((l !== r || a !== u) && Dd(t, i, r, u)),
      (hn = !1);
    var y = t.memoizedState;
    (i.state = y),
      Ri(t, r, i, s),
      (a = t.memoizedState),
      l !== r || y !== a || qe.current || hn
        ? (typeof d == "function" && (Qa(t, n, d, r), (a = t.memoizedState)),
          (l = hn || Fd(t, n, l, r, y, a, u))
            ? (f ||
                (typeof i.UNSAFE_componentWillMount != "function" &&
                  typeof i.componentWillMount != "function") ||
                (typeof i.componentWillMount == "function" &&
                  i.componentWillMount(),
                typeof i.UNSAFE_componentWillMount == "function" &&
                  i.UNSAFE_componentWillMount()),
              typeof i.componentDidMount == "function" && (t.flags |= 4194308))
            : (typeof i.componentDidMount == "function" && (t.flags |= 4194308),
              (t.memoizedProps = r),
              (t.memoizedState = a)),
          (i.props = r),
          (i.state = a),
          (i.context = u),
          (r = l))
        : (typeof i.componentDidMount == "function" && (t.flags |= 4194308),
          (r = !1));
  } else {
    (i = t.stateNode),
      xp(e, t),
      (l = t.memoizedProps),
      (u = t.type === t.elementType ? l : bt(t.type, l)),
      (i.props = u),
      (f = t.pendingProps),
      (y = i.context),
      (a = n.contextType),
      typeof a == "object" && a !== null
        ? (a = mt(a))
        : ((a = Ve(n) ? Xn : Le.current), (a = Mr(t, a)));
    var g = n.getDerivedStateFromProps;
    (d =
      typeof g == "function" ||
      typeof i.getSnapshotBeforeUpdate == "function") ||
      (typeof i.UNSAFE_componentWillReceiveProps != "function" &&
        typeof i.componentWillReceiveProps != "function") ||
      ((l !== f || y !== a) && Dd(t, i, r, a)),
      (hn = !1),
      (y = t.memoizedState),
      (i.state = y),
      Ri(t, r, i, s);
    var x = t.memoizedState;
    l !== f || y !== x || qe.current || hn
      ? (typeof g == "function" && (Qa(t, n, g, r), (x = t.memoizedState)),
        (u = hn || Fd(t, n, u, r, y, x, a) || !1)
          ? (d ||
              (typeof i.UNSAFE_componentWillUpdate != "function" &&
                typeof i.componentWillUpdate != "function") ||
              (typeof i.componentWillUpdate == "function" &&
                i.componentWillUpdate(r, x, a),
              typeof i.UNSAFE_componentWillUpdate == "function" &&
                i.UNSAFE_componentWillUpdate(r, x, a)),
            typeof i.componentDidUpdate == "function" && (t.flags |= 4),
            typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024))
          : (typeof i.componentDidUpdate != "function" ||
              (l === e.memoizedProps && y === e.memoizedState) ||
              (t.flags |= 4),
            typeof i.getSnapshotBeforeUpdate != "function" ||
              (l === e.memoizedProps && y === e.memoizedState) ||
              (t.flags |= 1024),
            (t.memoizedProps = r),
            (t.memoizedState = x)),
        (i.props = r),
        (i.state = x),
        (i.context = a),
        (r = u))
      : (typeof i.componentDidUpdate != "function" ||
          (l === e.memoizedProps && y === e.memoizedState) ||
          (t.flags |= 4),
        typeof i.getSnapshotBeforeUpdate != "function" ||
          (l === e.memoizedProps && y === e.memoizedState) ||
          (t.flags |= 1024),
        (r = !1));
  }
  return Ka(e, t, n, r, o, s);
}
function Ka(e, t, n, r, s, o) {
  qp(e, t);
  var i = (t.flags & 128) !== 0;
  if (!r && !i) return s && kd(t, n, !1), nn(e, t, o);
  (r = t.stateNode), (Xg.current = t);
  var l =
    i && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return (
    (t.flags |= 1),
    e !== null && i
      ? ((t.child = $r(t, e.child, null, o)), (t.child = $r(t, null, l, o)))
      : De(e, t, l, o),
    (t.memoizedState = r.state),
    s && kd(t, n, !0),
    t.child
  );
}
function Vp(e) {
  var t = e.stateNode;
  t.pendingContext
    ? jd(e, t.pendingContext, t.pendingContext !== t.context)
    : t.context && jd(e, t.context, !1),
    nc(e, t.containerInfo);
}
function Qd(e, t, n, r, s) {
  return zr(), Gu(s), (t.flags |= 256), De(e, t, n, r), t.child;
}
var Ya = { dehydrated: null, treeContext: null, retryLane: 0 };
function Ga(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function Wp(e, t, n) {
  var r = t.pendingProps,
    s = ae.current,
    o = !1,
    i = (t.flags & 128) !== 0,
    l;
  if (
    ((l = i) ||
      (l = e !== null && e.memoizedState === null ? !1 : (s & 2) !== 0),
    l
      ? ((o = !0), (t.flags &= -129))
      : (e === null || e.memoizedState !== null) && (s |= 1),
    ee(ae, s & 1),
    e === null)
  )
    return (
      Ba(t),
      (e = t.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null)
        ? (t.mode & 1
            ? e.data === "$!"
              ? (t.lanes = 8)
              : (t.lanes = 1073741824)
            : (t.lanes = 1),
          null)
        : ((i = r.children),
          (e = r.fallback),
          o
            ? ((r = t.mode),
              (o = t.child),
              (i = { mode: "hidden", children: i }),
              !(r & 1) && o !== null
                ? ((o.childLanes = 0), (o.pendingProps = i))
                : (o = ul(i, r, 0, null)),
              (e = Wn(e, r, n, null)),
              (o.return = t),
              (e.return = t),
              (o.sibling = e),
              (t.child = o),
              (t.child.memoizedState = Ga(n)),
              (t.memoizedState = Ya),
              e)
            : cc(t, i))
    );
  if (((s = e.memoizedState), s !== null && ((l = s.dehydrated), l !== null)))
    return Jg(e, t, i, r, l, s, n);
  if (o) {
    (o = r.fallback), (i = t.mode), (s = e.child), (l = s.sibling);
    var a = { mode: "hidden", children: r.children };
    return (
      !(i & 1) && t.child !== s
        ? ((r = t.child),
          (r.childLanes = 0),
          (r.pendingProps = a),
          (t.deletions = null))
        : ((r = Nn(s, a)), (r.subtreeFlags = s.subtreeFlags & 14680064)),
      l !== null ? (o = Nn(l, o)) : ((o = Wn(o, i, n, null)), (o.flags |= 2)),
      (o.return = t),
      (r.return = t),
      (r.sibling = o),
      (t.child = r),
      (r = o),
      (o = t.child),
      (i = e.child.memoizedState),
      (i =
        i === null
          ? Ga(n)
          : {
              baseLanes: i.baseLanes | n,
              cachePool: null,
              transitions: i.transitions,
            }),
      (o.memoizedState = i),
      (o.childLanes = e.childLanes & ~n),
      (t.memoizedState = Ya),
      r
    );
  }
  return (
    (o = e.child),
    (e = o.sibling),
    (r = Nn(o, { mode: "visible", children: r.children })),
    !(t.mode & 1) && (r.lanes = n),
    (r.return = t),
    (r.sibling = null),
    e !== null &&
      ((n = t.deletions),
      n === null ? ((t.deletions = [e]), (t.flags |= 16)) : n.push(e)),
    (t.child = r),
    (t.memoizedState = null),
    r
  );
}
function cc(e, t) {
  return (
    (t = ul({ mode: "visible", children: t }, e.mode, 0, null)),
    (t.return = e),
    (e.child = t)
  );
}
function Qo(e, t, n, r) {
  return (
    r !== null && Gu(r),
    $r(t, e.child, null, n),
    (e = cc(t, t.pendingProps.children)),
    (e.flags |= 2),
    (t.memoizedState = null),
    e
  );
}
function Jg(e, t, n, r, s, o, i) {
  if (n)
    return t.flags & 256
      ? ((t.flags &= -257), (r = Zl(Error(k(422)))), Qo(e, t, i, r))
      : t.memoizedState !== null
      ? ((t.child = e.child), (t.flags |= 128), null)
      : ((o = r.fallback),
        (s = t.mode),
        (r = ul({ mode: "visible", children: r.children }, s, 0, null)),
        (o = Wn(o, s, i, null)),
        (o.flags |= 2),
        (r.return = t),
        (o.return = t),
        (r.sibling = o),
        (t.child = r),
        t.mode & 1 && $r(t, e.child, null, i),
        (t.child.memoizedState = Ga(i)),
        (t.memoizedState = Ya),
        o);
  if (!(t.mode & 1)) return Qo(e, t, i, null);
  if (s.data === "$!") {
    if (((r = s.nextSibling && s.nextSibling.dataset), r)) var l = r.dgst;
    return (r = l), (o = Error(k(419))), (r = Zl(o, r, void 0)), Qo(e, t, i, r);
  }
  if (((l = (i & e.childLanes) !== 0), Qe || l)) {
    if (((r = _e), r !== null)) {
      switch (i & -i) {
        case 4:
          s = 2;
          break;
        case 16:
          s = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          s = 32;
          break;
        case 536870912:
          s = 268435456;
          break;
        default:
          s = 0;
      }
      (s = s & (r.suspendedLanes | i) ? 0 : s),
        s !== 0 &&
          s !== o.retryLane &&
          ((o.retryLane = s), tn(e, s), _t(r, e, s, -1));
    }
    return yc(), (r = Zl(Error(k(421)))), Qo(e, t, i, r);
  }
  return s.data === "$?"
    ? ((t.flags |= 128),
      (t.child = e.child),
      (t = dv.bind(null, e)),
      (s._reactRetry = t),
      null)
    : ((e = o.treeContext),
      (Ze = En(s.nextSibling)),
      (et = t),
      (oe = !0),
      (St = null),
      e !== null &&
        ((dt[ft++] = Yt),
        (dt[ft++] = Gt),
        (dt[ft++] = Jn),
        (Yt = e.id),
        (Gt = e.overflow),
        (Jn = t)),
      (t = cc(t, r.children)),
      (t.flags |= 4096),
      t);
}
function qd(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), Ha(e.return, t, n);
}
function ea(e, t, n, r, s) {
  var o = e.memoizedState;
  o === null
    ? (e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: n,
        tailMode: s,
      })
    : ((o.isBackwards = t),
      (o.rendering = null),
      (o.renderingStartTime = 0),
      (o.last = r),
      (o.tail = n),
      (o.tailMode = s));
}
function Kp(e, t, n) {
  var r = t.pendingProps,
    s = r.revealOrder,
    o = r.tail;
  if ((De(e, t, r.children, n), (r = ae.current), r & 2))
    (r = (r & 1) | 2), (t.flags |= 128);
  else {
    if (e !== null && e.flags & 128)
      e: for (e = t.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && qd(e, n, t);
        else if (e.tag === 19) qd(e, n, t);
        else if (e.child !== null) {
          (e.child.return = e), (e = e.child);
          continue;
        }
        if (e === t) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) break e;
          e = e.return;
        }
        (e.sibling.return = e.return), (e = e.sibling);
      }
    r &= 1;
  }
  if ((ee(ae, r), !(t.mode & 1))) t.memoizedState = null;
  else
    switch (s) {
      case "forwards":
        for (n = t.child, s = null; n !== null; )
          (e = n.alternate),
            e !== null && Oi(e) === null && (s = n),
            (n = n.sibling);
        (n = s),
          n === null
            ? ((s = t.child), (t.child = null))
            : ((s = n.sibling), (n.sibling = null)),
          ea(t, !1, s, n, o);
        break;
      case "backwards":
        for (n = null, s = t.child, t.child = null; s !== null; ) {
          if (((e = s.alternate), e !== null && Oi(e) === null)) {
            t.child = s;
            break;
          }
          (e = s.sibling), (s.sibling = n), (n = s), (s = e);
        }
        ea(t, !0, n, null, o);
        break;
      case "together":
        ea(t, !1, null, null, void 0);
        break;
      default:
        t.memoizedState = null;
    }
  return t.child;
}
function ii(e, t) {
  !(t.mode & 1) &&
    e !== null &&
    ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
}
function nn(e, t, n) {
  if (
    (e !== null && (t.dependencies = e.dependencies),
    (er |= t.lanes),
    !(n & t.childLanes))
  )
    return null;
  if (e !== null && t.child !== e.child) throw Error(k(153));
  if (t.child !== null) {
    for (
      e = t.child, n = Nn(e, e.pendingProps), t.child = n, n.return = t;
      e.sibling !== null;

    )
      (e = e.sibling), (n = n.sibling = Nn(e, e.pendingProps)), (n.return = t);
    n.sibling = null;
  }
  return t.child;
}
function Zg(e, t, n) {
  switch (t.tag) {
    case 3:
      Vp(t), zr();
      break;
    case 5:
      wp(t);
      break;
    case 1:
      Ve(t.type) && _i(t);
      break;
    case 4:
      nc(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context,
        s = t.memoizedProps.value;
      ee(ki, r._currentValue), (r._currentValue = s);
      break;
    case 13:
      if (((r = t.memoizedState), r !== null))
        return r.dehydrated !== null
          ? (ee(ae, ae.current & 1), (t.flags |= 128), null)
          : n & t.child.childLanes
          ? Wp(e, t, n)
          : (ee(ae, ae.current & 1),
            (e = nn(e, t, n)),
            e !== null ? e.sibling : null);
      ee(ae, ae.current & 1);
      break;
    case 19:
      if (((r = (n & t.childLanes) !== 0), e.flags & 128)) {
        if (r) return Kp(e, t, n);
        t.flags |= 128;
      }
      if (
        ((s = t.memoizedState),
        s !== null &&
          ((s.rendering = null), (s.tail = null), (s.lastEffect = null)),
        ee(ae, ae.current),
        r)
      )
        break;
      return null;
    case 22:
    case 23:
      return (t.lanes = 0), Qp(e, t, n);
  }
  return nn(e, t, n);
}
var Yp, Xa, Gp, Xp;
Yp = function (e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      (n.child.return = n), (n = n.child);
      continue;
    }
    if (n === t) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t) return;
      n = n.return;
    }
    (n.sibling.return = n.return), (n = n.sibling);
  }
};
Xa = function () {};
Gp = function (e, t, n, r) {
  var s = e.memoizedProps;
  if (s !== r) {
    (e = t.stateNode), Hn(Mt.current);
    var o = null;
    switch (n) {
      case "input":
        (s = xa(e, s)), (r = xa(e, r)), (o = []);
        break;
      case "select":
        (s = de({}, s, { value: void 0 })),
          (r = de({}, r, { value: void 0 })),
          (o = []);
        break;
      case "textarea":
        (s = Ea(e, s)), (r = Ea(e, r)), (o = []);
        break;
      default:
        typeof s.onClick != "function" &&
          typeof r.onClick == "function" &&
          (e.onclick = Si);
    }
    Ca(n, r);
    var i;
    n = null;
    for (u in s)
      if (!r.hasOwnProperty(u) && s.hasOwnProperty(u) && s[u] != null)
        if (u === "style") {
          var l = s[u];
          for (i in l) l.hasOwnProperty(i) && (n || (n = {}), (n[i] = ""));
        } else
          u !== "dangerouslySetInnerHTML" &&
            u !== "children" &&
            u !== "suppressContentEditableWarning" &&
            u !== "suppressHydrationWarning" &&
            u !== "autoFocus" &&
            ($s.hasOwnProperty(u)
              ? o || (o = [])
              : (o = o || []).push(u, null));
    for (u in r) {
      var a = r[u];
      if (
        ((l = s != null ? s[u] : void 0),
        r.hasOwnProperty(u) && a !== l && (a != null || l != null))
      )
        if (u === "style")
          if (l) {
            for (i in l)
              !l.hasOwnProperty(i) ||
                (a && a.hasOwnProperty(i)) ||
                (n || (n = {}), (n[i] = ""));
            for (i in a)
              a.hasOwnProperty(i) &&
                l[i] !== a[i] &&
                (n || (n = {}), (n[i] = a[i]));
          } else n || (o || (o = []), o.push(u, n)), (n = a);
        else
          u === "dangerouslySetInnerHTML"
            ? ((a = a ? a.__html : void 0),
              (l = l ? l.__html : void 0),
              a != null && l !== a && (o = o || []).push(u, a))
            : u === "children"
            ? (typeof a != "string" && typeof a != "number") ||
              (o = o || []).push(u, "" + a)
            : u !== "suppressContentEditableWarning" &&
              u !== "suppressHydrationWarning" &&
              ($s.hasOwnProperty(u)
                ? (a != null && u === "onScroll" && ne("scroll", e),
                  o || l === a || (o = []))
                : (o = o || []).push(u, a));
    }
    n && (o = o || []).push("style", n);
    var u = o;
    (t.updateQueue = u) && (t.flags |= 4);
  }
};
Xp = function (e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function Es(e, t) {
  if (!oe)
    switch (e.tailMode) {
      case "hidden":
        t = e.tail;
        for (var n = null; t !== null; )
          t.alternate !== null && (n = t), (t = t.sibling);
        n === null ? (e.tail = null) : (n.sibling = null);
        break;
      case "collapsed":
        n = e.tail;
        for (var r = null; n !== null; )
          n.alternate !== null && (r = n), (n = n.sibling);
        r === null
          ? t || e.tail === null
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (r.sibling = null);
    }
}
function Oe(e) {
  var t = e.alternate !== null && e.alternate.child === e.child,
    n = 0,
    r = 0;
  if (t)
    for (var s = e.child; s !== null; )
      (n |= s.lanes | s.childLanes),
        (r |= s.subtreeFlags & 14680064),
        (r |= s.flags & 14680064),
        (s.return = e),
        (s = s.sibling);
  else
    for (s = e.child; s !== null; )
      (n |= s.lanes | s.childLanes),
        (r |= s.subtreeFlags),
        (r |= s.flags),
        (s.return = e),
        (s = s.sibling);
  return (e.subtreeFlags |= r), (e.childLanes = n), t;
}
function ev(e, t, n) {
  var r = t.pendingProps;
  switch ((Yu(t), t.tag)) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return Oe(t), null;
    case 1:
      return Ve(t.type) && Ci(), Oe(t), null;
    case 3:
      return (
        (r = t.stateNode),
        Ur(),
        re(qe),
        re(Le),
        sc(),
        r.pendingContext &&
          ((r.context = r.pendingContext), (r.pendingContext = null)),
        (e === null || e.child === null) &&
          (Bo(t)
            ? (t.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && !(t.flags & 256)) ||
              ((t.flags |= 1024), St !== null && (ou(St), (St = null)))),
        Xa(e, t),
        Oe(t),
        null
      );
    case 5:
      rc(t);
      var s = Hn(Js.current);
      if (((n = t.type), e !== null && t.stateNode != null))
        Gp(e, t, n, r, s),
          e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152));
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(k(166));
          return Oe(t), null;
        }
        if (((e = Hn(Mt.current)), Bo(t))) {
          (r = t.stateNode), (n = t.type);
          var o = t.memoizedProps;
          switch (((r[Ft] = t), (r[Gs] = o), (e = (t.mode & 1) !== 0), n)) {
            case "dialog":
              ne("cancel", r), ne("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              ne("load", r);
              break;
            case "video":
            case "audio":
              for (s = 0; s < Ts.length; s++) ne(Ts[s], r);
              break;
            case "source":
              ne("error", r);
              break;
            case "img":
            case "image":
            case "link":
              ne("error", r), ne("load", r);
              break;
            case "details":
              ne("toggle", r);
              break;
            case "input":
              ed(r, o), ne("invalid", r);
              break;
            case "select":
              (r._wrapperState = { wasMultiple: !!o.multiple }),
                ne("invalid", r);
              break;
            case "textarea":
              nd(r, o), ne("invalid", r);
          }
          Ca(n, o), (s = null);
          for (var i in o)
            if (o.hasOwnProperty(i)) {
              var l = o[i];
              i === "children"
                ? typeof l == "string"
                  ? r.textContent !== l &&
                    (o.suppressHydrationWarning !== !0 &&
                      Uo(r.textContent, l, e),
                    (s = ["children", l]))
                  : typeof l == "number" &&
                    r.textContent !== "" + l &&
                    (o.suppressHydrationWarning !== !0 &&
                      Uo(r.textContent, l, e),
                    (s = ["children", "" + l]))
                : $s.hasOwnProperty(i) &&
                  l != null &&
                  i === "onScroll" &&
                  ne("scroll", r);
            }
          switch (n) {
            case "input":
              Lo(r), td(r, o, !0);
              break;
            case "textarea":
              Lo(r), rd(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof o.onClick == "function" && (r.onclick = Si);
          }
          (r = s), (t.updateQueue = r), r !== null && (t.flags |= 4);
        } else {
          (i = s.nodeType === 9 ? s : s.ownerDocument),
            e === "http://www.w3.org/1999/xhtml" && (e = _h(n)),
            e === "http://www.w3.org/1999/xhtml"
              ? n === "script"
                ? ((e = i.createElement("div")),
                  (e.innerHTML = "<script></script>"),
                  (e = e.removeChild(e.firstChild)))
                : typeof r.is == "string"
                ? (e = i.createElement(n, { is: r.is }))
                : ((e = i.createElement(n)),
                  n === "select" &&
                    ((i = e),
                    r.multiple
                      ? (i.multiple = !0)
                      : r.size && (i.size = r.size)))
              : (e = i.createElementNS(e, n)),
            (e[Ft] = t),
            (e[Gs] = r),
            Yp(e, t, !1, !1),
            (t.stateNode = e);
          e: {
            switch (((i = _a(n, r)), n)) {
              case "dialog":
                ne("cancel", e), ne("close", e), (s = r);
                break;
              case "iframe":
              case "object":
              case "embed":
                ne("load", e), (s = r);
                break;
              case "video":
              case "audio":
                for (s = 0; s < Ts.length; s++) ne(Ts[s], e);
                s = r;
                break;
              case "source":
                ne("error", e), (s = r);
                break;
              case "img":
              case "image":
              case "link":
                ne("error", e), ne("load", e), (s = r);
                break;
              case "details":
                ne("toggle", e), (s = r);
                break;
              case "input":
                ed(e, r), (s = xa(e, r)), ne("invalid", e);
                break;
              case "option":
                s = r;
                break;
              case "select":
                (e._wrapperState = { wasMultiple: !!r.multiple }),
                  (s = de({}, r, { value: void 0 })),
                  ne("invalid", e);
                break;
              case "textarea":
                nd(e, r), (s = Ea(e, r)), ne("invalid", e);
                break;
              default:
                s = r;
            }
            Ca(n, s), (l = s);
            for (o in l)
              if (l.hasOwnProperty(o)) {
                var a = l[o];
                o === "style"
                  ? kh(e, a)
                  : o === "dangerouslySetInnerHTML"
                  ? ((a = a ? a.__html : void 0), a != null && Nh(e, a))
                  : o === "children"
                  ? typeof a == "string"
                    ? (n !== "textarea" || a !== "") && Us(e, a)
                    : typeof a == "number" && Us(e, "" + a)
                  : o !== "suppressContentEditableWarning" &&
                    o !== "suppressHydrationWarning" &&
                    o !== "autoFocus" &&
                    ($s.hasOwnProperty(o)
                      ? a != null && o === "onScroll" && ne("scroll", e)
                      : a != null && Au(e, o, a, i));
              }
            switch (n) {
              case "input":
                Lo(e), td(e, r, !1);
                break;
              case "textarea":
                Lo(e), rd(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + jn(r.value));
                break;
              case "select":
                (e.multiple = !!r.multiple),
                  (o = r.value),
                  o != null
                    ? Rr(e, !!r.multiple, o, !1)
                    : r.defaultValue != null &&
                      Rr(e, !!r.multiple, r.defaultValue, !0);
                break;
              default:
                typeof s.onClick == "function" && (e.onclick = Si);
            }
            switch (n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break e;
              case "img":
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (t.flags |= 4);
        }
        t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
      }
      return Oe(t), null;
    case 6:
      if (e && t.stateNode != null) Xp(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(k(166));
        if (((n = Hn(Js.current)), Hn(Mt.current), Bo(t))) {
          if (
            ((r = t.stateNode),
            (n = t.memoizedProps),
            (r[Ft] = t),
            (o = r.nodeValue !== n) && ((e = et), e !== null))
          )
            switch (e.tag) {
              case 3:
                Uo(r.nodeValue, n, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 &&
                  Uo(r.nodeValue, n, (e.mode & 1) !== 0);
            }
          o && (t.flags |= 4);
        } else
          (r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r)),
            (r[Ft] = t),
            (t.stateNode = r);
      }
      return Oe(t), null;
    case 13:
      if (
        (re(ae),
        (r = t.memoizedState),
        e === null ||
          (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if (oe && Ze !== null && t.mode & 1 && !(t.flags & 128))
          mp(), zr(), (t.flags |= 98560), (o = !1);
        else if (((o = Bo(t)), r !== null && r.dehydrated !== null)) {
          if (e === null) {
            if (!o) throw Error(k(318));
            if (
              ((o = t.memoizedState),
              (o = o !== null ? o.dehydrated : null),
              !o)
            )
              throw Error(k(317));
            o[Ft] = t;
          } else
            zr(), !(t.flags & 128) && (t.memoizedState = null), (t.flags |= 4);
          Oe(t), (o = !1);
        } else St !== null && (ou(St), (St = null)), (o = !0);
        if (!o) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128
        ? ((t.lanes = n), t)
        : ((r = r !== null),
          r !== (e !== null && e.memoizedState !== null) &&
            r &&
            ((t.child.flags |= 8192),
            t.mode & 1 &&
              (e === null || ae.current & 1 ? be === 0 && (be = 3) : yc())),
          t.updateQueue !== null && (t.flags |= 4),
          Oe(t),
          null);
    case 4:
      return (
        Ur(), Xa(e, t), e === null && Ks(t.stateNode.containerInfo), Oe(t), null
      );
    case 10:
      return Zu(t.type._context), Oe(t), null;
    case 17:
      return Ve(t.type) && Ci(), Oe(t), null;
    case 19:
      if ((re(ae), (o = t.memoizedState), o === null)) return Oe(t), null;
      if (((r = (t.flags & 128) !== 0), (i = o.rendering), i === null))
        if (r) Es(o, !1);
        else {
          if (be !== 0 || (e !== null && e.flags & 128))
            for (e = t.child; e !== null; ) {
              if (((i = Oi(e)), i !== null)) {
                for (
                  t.flags |= 128,
                    Es(o, !1),
                    r = i.updateQueue,
                    r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                    t.subtreeFlags = 0,
                    r = n,
                    n = t.child;
                  n !== null;

                )
                  (o = n),
                    (e = r),
                    (o.flags &= 14680066),
                    (i = o.alternate),
                    i === null
                      ? ((o.childLanes = 0),
                        (o.lanes = e),
                        (o.child = null),
                        (o.subtreeFlags = 0),
                        (o.memoizedProps = null),
                        (o.memoizedState = null),
                        (o.updateQueue = null),
                        (o.dependencies = null),
                        (o.stateNode = null))
                      : ((o.childLanes = i.childLanes),
                        (o.lanes = i.lanes),
                        (o.child = i.child),
                        (o.subtreeFlags = 0),
                        (o.deletions = null),
                        (o.memoizedProps = i.memoizedProps),
                        (o.memoizedState = i.memoizedState),
                        (o.updateQueue = i.updateQueue),
                        (o.type = i.type),
                        (e = i.dependencies),
                        (o.dependencies =
                          e === null
                            ? null
                            : {
                                lanes: e.lanes,
                                firstContext: e.firstContext,
                              })),
                    (n = n.sibling);
                return ee(ae, (ae.current & 1) | 2), t.child;
              }
              e = e.sibling;
            }
          o.tail !== null &&
            ye() > Hr &&
            ((t.flags |= 128), (r = !0), Es(o, !1), (t.lanes = 4194304));
        }
      else {
        if (!r)
          if (((e = Oi(i)), e !== null)) {
            if (
              ((t.flags |= 128),
              (r = !0),
              (n = e.updateQueue),
              n !== null && ((t.updateQueue = n), (t.flags |= 4)),
              Es(o, !0),
              o.tail === null && o.tailMode === "hidden" && !i.alternate && !oe)
            )
              return Oe(t), null;
          } else
            2 * ye() - o.renderingStartTime > Hr &&
              n !== 1073741824 &&
              ((t.flags |= 128), (r = !0), Es(o, !1), (t.lanes = 4194304));
        o.isBackwards
          ? ((i.sibling = t.child), (t.child = i))
          : ((n = o.last),
            n !== null ? (n.sibling = i) : (t.child = i),
            (o.last = i));
      }
      return o.tail !== null
        ? ((t = o.tail),
          (o.rendering = t),
          (o.tail = t.sibling),
          (o.renderingStartTime = ye()),
          (t.sibling = null),
          (n = ae.current),
          ee(ae, r ? (n & 1) | 2 : n & 1),
          t)
        : (Oe(t), null);
    case 22:
    case 23:
      return (
        mc(),
        (r = t.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== r && (t.flags |= 8192),
        r && t.mode & 1
          ? Je & 1073741824 && (Oe(t), t.subtreeFlags & 6 && (t.flags |= 8192))
          : Oe(t),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(k(156, t.tag));
}
function tv(e, t) {
  switch ((Yu(t), t.tag)) {
    case 1:
      return (
        Ve(t.type) && Ci(),
        (e = t.flags),
        e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 3:
      return (
        Ur(),
        re(qe),
        re(Le),
        sc(),
        (e = t.flags),
        e & 65536 && !(e & 128) ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 5:
      return rc(t), null;
    case 13:
      if (
        (re(ae), (e = t.memoizedState), e !== null && e.dehydrated !== null)
      ) {
        if (t.alternate === null) throw Error(k(340));
        zr();
      }
      return (
        (e = t.flags), e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
      );
    case 19:
      return re(ae), null;
    case 4:
      return Ur(), null;
    case 10:
      return Zu(t.type._context), null;
    case 22:
    case 23:
      return mc(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var qo = !1,
  Pe = !1,
  nv = typeof WeakSet == "function" ? WeakSet : Set,
  A = null;
function kr(e, t) {
  var n = e.ref;
  if (n !== null)
    if (typeof n == "function")
      try {
        n(null);
      } catch (r) {
        he(e, t, r);
      }
    else n.current = null;
}
function Ja(e, t, n) {
  try {
    n();
  } catch (r) {
    he(e, t, r);
  }
}
var Vd = !1;
function rv(e, t) {
  if (((Ia = wi), (e = np()), Wu(e))) {
    if ("selectionStart" in e)
      var n = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        n = ((n = e.ownerDocument) && n.defaultView) || window;
        var r = n.getSelection && n.getSelection();
        if (r && r.rangeCount !== 0) {
          n = r.anchorNode;
          var s = r.anchorOffset,
            o = r.focusNode;
          r = r.focusOffset;
          try {
            n.nodeType, o.nodeType;
          } catch {
            n = null;
            break e;
          }
          var i = 0,
            l = -1,
            a = -1,
            u = 0,
            d = 0,
            f = e,
            y = null;
          t: for (;;) {
            for (
              var g;
              f !== n || (s !== 0 && f.nodeType !== 3) || (l = i + s),
                f !== o || (r !== 0 && f.nodeType !== 3) || (a = i + r),
                f.nodeType === 3 && (i += f.nodeValue.length),
                (g = f.firstChild) !== null;

            )
              (y = f), (f = g);
            for (;;) {
              if (f === e) break t;
              if (
                (y === n && ++u === s && (l = i),
                y === o && ++d === r && (a = i),
                (g = f.nextSibling) !== null)
              )
                break;
              (f = y), (y = f.parentNode);
            }
            f = g;
          }
          n = l === -1 || a === -1 ? null : { start: l, end: a };
        } else n = null;
      }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (Fa = { focusedElem: e, selectionRange: n }, wi = !1, A = t; A !== null; )
    if (((t = A), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
      (e.return = t), (A = e);
    else
      for (; A !== null; ) {
        t = A;
        try {
          var x = t.alternate;
          if (t.flags & 1024)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (x !== null) {
                  var b = x.memoizedProps,
                    w = x.memoizedState,
                    m = t.stateNode,
                    h = m.getSnapshotBeforeUpdate(
                      t.elementType === t.type ? b : bt(t.type, b),
                      w
                    );
                  m.__reactInternalSnapshotBeforeUpdate = h;
                }
                break;
              case 3:
                var p = t.stateNode.containerInfo;
                p.nodeType === 1
                  ? (p.textContent = "")
                  : p.nodeType === 9 &&
                    p.documentElement &&
                    p.removeChild(p.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(k(163));
            }
        } catch (E) {
          he(t, t.return, E);
        }
        if (((e = t.sibling), e !== null)) {
          (e.return = t.return), (A = e);
          break;
        }
        A = t.return;
      }
  return (x = Vd), (Vd = !1), x;
}
function Ds(e, t, n) {
  var r = t.updateQueue;
  if (((r = r !== null ? r.lastEffect : null), r !== null)) {
    var s = (r = r.next);
    do {
      if ((s.tag & e) === e) {
        var o = s.destroy;
        (s.destroy = void 0), o !== void 0 && Ja(t, n, o);
      }
      s = s.next;
    } while (s !== r);
  }
}
function ll(e, t) {
  if (
    ((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)
  ) {
    var n = (t = t.next);
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== t);
  }
}
function Za(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == "function" ? t(e) : (t.current = e);
  }
}
function Jp(e) {
  var t = e.alternate;
  t !== null && ((e.alternate = null), Jp(t)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 &&
      ((t = e.stateNode),
      t !== null &&
        (delete t[Ft], delete t[Gs], delete t[za], delete t[zg], delete t[$g])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null);
}
function Zp(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Wd(e) {
  e: for (;;) {
    for (; e.sibling === null; ) {
      if (e.return === null || Zp(e.return)) return null;
      e = e.return;
    }
    for (
      e.sibling.return = e.return, e = e.sibling;
      e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

    ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      (e.child.return = e), (e = e.child);
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function eu(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode),
      t
        ? n.nodeType === 8
          ? n.parentNode.insertBefore(e, t)
          : n.insertBefore(e, t)
        : (n.nodeType === 8
            ? ((t = n.parentNode), t.insertBefore(e, n))
            : ((t = n), t.appendChild(e)),
          (n = n._reactRootContainer),
          n != null || t.onclick !== null || (t.onclick = Si));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (eu(e, t, n), e = e.sibling; e !== null; ) eu(e, t, n), (e = e.sibling);
}
function tu(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode), t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && ((e = e.child), e !== null))
    for (tu(e, t, n), e = e.sibling; e !== null; ) tu(e, t, n), (e = e.sibling);
}
var Ne = null,
  Et = !1;
function cn(e, t, n) {
  for (n = n.child; n !== null; ) em(e, t, n), (n = n.sibling);
}
function em(e, t, n) {
  if (Dt && typeof Dt.onCommitFiberUnmount == "function")
    try {
      Dt.onCommitFiberUnmount(Zi, n);
    } catch {}
  switch (n.tag) {
    case 5:
      Pe || kr(n, t);
    case 6:
      var r = Ne,
        s = Et;
      (Ne = null),
        cn(e, t, n),
        (Ne = r),
        (Et = s),
        Ne !== null &&
          (Et
            ? ((e = Ne),
              (n = n.stateNode),
              e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n))
            : Ne.removeChild(n.stateNode));
      break;
    case 18:
      Ne !== null &&
        (Et
          ? ((e = Ne),
            (n = n.stateNode),
            e.nodeType === 8
              ? Wl(e.parentNode, n)
              : e.nodeType === 1 && Wl(e, n),
            qs(e))
          : Wl(Ne, n.stateNode));
      break;
    case 4:
      (r = Ne),
        (s = Et),
        (Ne = n.stateNode.containerInfo),
        (Et = !0),
        cn(e, t, n),
        (Ne = r),
        (Et = s);
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (
        !Pe &&
        ((r = n.updateQueue), r !== null && ((r = r.lastEffect), r !== null))
      ) {
        s = r = r.next;
        do {
          var o = s,
            i = o.destroy;
          (o = o.tag),
            i !== void 0 && (o & 2 || o & 4) && Ja(n, t, i),
            (s = s.next);
        } while (s !== r);
      }
      cn(e, t, n);
      break;
    case 1:
      if (
        !Pe &&
        (kr(n, t),
        (r = n.stateNode),
        typeof r.componentWillUnmount == "function")
      )
        try {
          (r.props = n.memoizedProps),
            (r.state = n.memoizedState),
            r.componentWillUnmount();
        } catch (l) {
          he(n, t, l);
        }
      cn(e, t, n);
      break;
    case 21:
      cn(e, t, n);
      break;
    case 22:
      n.mode & 1
        ? ((Pe = (r = Pe) || n.memoizedState !== null), cn(e, t, n), (Pe = r))
        : cn(e, t, n);
      break;
    default:
      cn(e, t, n);
  }
}
function Kd(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new nv()),
      t.forEach(function (r) {
        var s = fv.bind(null, e, r);
        n.has(r) || (n.add(r), r.then(s, s));
      });
  }
}
function wt(e, t) {
  var n = t.deletions;
  if (n !== null)
    for (var r = 0; r < n.length; r++) {
      var s = n[r];
      try {
        var o = e,
          i = t,
          l = i;
        e: for (; l !== null; ) {
          switch (l.tag) {
            case 5:
              (Ne = l.stateNode), (Et = !1);
              break e;
            case 3:
              (Ne = l.stateNode.containerInfo), (Et = !0);
              break e;
            case 4:
              (Ne = l.stateNode.containerInfo), (Et = !0);
              break e;
          }
          l = l.return;
        }
        if (Ne === null) throw Error(k(160));
        em(o, i, s), (Ne = null), (Et = !1);
        var a = s.alternate;
        a !== null && (a.return = null), (s.return = null);
      } catch (u) {
        he(s, t, u);
      }
    }
  if (t.subtreeFlags & 12854)
    for (t = t.child; t !== null; ) tm(t, e), (t = t.sibling);
}
function tm(e, t) {
  var n = e.alternate,
    r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((wt(t, e), At(e), r & 4)) {
        try {
          Ds(3, e, e.return), ll(3, e);
        } catch (b) {
          he(e, e.return, b);
        }
        try {
          Ds(5, e, e.return);
        } catch (b) {
          he(e, e.return, b);
        }
      }
      break;
    case 1:
      wt(t, e), At(e), r & 512 && n !== null && kr(n, n.return);
      break;
    case 5:
      if (
        (wt(t, e),
        At(e),
        r & 512 && n !== null && kr(n, n.return),
        e.flags & 32)
      ) {
        var s = e.stateNode;
        try {
          Us(s, "");
        } catch (b) {
          he(e, e.return, b);
        }
      }
      if (r & 4 && ((s = e.stateNode), s != null)) {
        var o = e.memoizedProps,
          i = n !== null ? n.memoizedProps : o,
          l = e.type,
          a = e.updateQueue;
        if (((e.updateQueue = null), a !== null))
          try {
            l === "input" && o.type === "radio" && o.name != null && Sh(s, o),
              _a(l, i);
            var u = _a(l, o);
            for (i = 0; i < a.length; i += 2) {
              var d = a[i],
                f = a[i + 1];
              d === "style"
                ? kh(s, f)
                : d === "dangerouslySetInnerHTML"
                ? Nh(s, f)
                : d === "children"
                ? Us(s, f)
                : Au(s, d, f, u);
            }
            switch (l) {
              case "input":
                wa(s, o);
                break;
              case "textarea":
                Ch(s, o);
                break;
              case "select":
                var y = s._wrapperState.wasMultiple;
                s._wrapperState.wasMultiple = !!o.multiple;
                var g = o.value;
                g != null
                  ? Rr(s, !!o.multiple, g, !1)
                  : y !== !!o.multiple &&
                    (o.defaultValue != null
                      ? Rr(s, !!o.multiple, o.defaultValue, !0)
                      : Rr(s, !!o.multiple, o.multiple ? [] : "", !1));
            }
            s[Gs] = o;
          } catch (b) {
            he(e, e.return, b);
          }
      }
      break;
    case 6:
      if ((wt(t, e), At(e), r & 4)) {
        if (e.stateNode === null) throw Error(k(162));
        (s = e.stateNode), (o = e.memoizedProps);
        try {
          s.nodeValue = o;
        } catch (b) {
          he(e, e.return, b);
        }
      }
      break;
    case 3:
      if (
        (wt(t, e), At(e), r & 4 && n !== null && n.memoizedState.isDehydrated)
      )
        try {
          qs(t.containerInfo);
        } catch (b) {
          he(e, e.return, b);
        }
      break;
    case 4:
      wt(t, e), At(e);
      break;
    case 13:
      wt(t, e),
        At(e),
        (s = e.child),
        s.flags & 8192 &&
          ((o = s.memoizedState !== null),
          (s.stateNode.isHidden = o),
          !o ||
            (s.alternate !== null && s.alternate.memoizedState !== null) ||
            (hc = ye())),
        r & 4 && Kd(e);
      break;
    case 22:
      if (
        ((d = n !== null && n.memoizedState !== null),
        e.mode & 1 ? ((Pe = (u = Pe) || d), wt(t, e), (Pe = u)) : wt(t, e),
        At(e),
        r & 8192)
      ) {
        if (
          ((u = e.memoizedState !== null),
          (e.stateNode.isHidden = u) && !d && e.mode & 1)
        )
          for (A = e, d = e.child; d !== null; ) {
            for (f = A = d; A !== null; ) {
              switch (((y = A), (g = y.child), y.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Ds(4, y, y.return);
                  break;
                case 1:
                  kr(y, y.return);
                  var x = y.stateNode;
                  if (typeof x.componentWillUnmount == "function") {
                    (r = y), (n = y.return);
                    try {
                      (t = r),
                        (x.props = t.memoizedProps),
                        (x.state = t.memoizedState),
                        x.componentWillUnmount();
                    } catch (b) {
                      he(r, n, b);
                    }
                  }
                  break;
                case 5:
                  kr(y, y.return);
                  break;
                case 22:
                  if (y.memoizedState !== null) {
                    Gd(f);
                    continue;
                  }
              }
              g !== null ? ((g.return = y), (A = g)) : Gd(f);
            }
            d = d.sibling;
          }
        e: for (d = null, f = e; ; ) {
          if (f.tag === 5) {
            if (d === null) {
              d = f;
              try {
                (s = f.stateNode),
                  u
                    ? ((o = s.style),
                      typeof o.setProperty == "function"
                        ? o.setProperty("display", "none", "important")
                        : (o.display = "none"))
                    : ((l = f.stateNode),
                      (a = f.memoizedProps.style),
                      (i =
                        a != null && a.hasOwnProperty("display")
                          ? a.display
                          : null),
                      (l.style.display = jh("display", i)));
              } catch (b) {
                he(e, e.return, b);
              }
            }
          } else if (f.tag === 6) {
            if (d === null)
              try {
                f.stateNode.nodeValue = u ? "" : f.memoizedProps;
              } catch (b) {
                he(e, e.return, b);
              }
          } else if (
            ((f.tag !== 22 && f.tag !== 23) ||
              f.memoizedState === null ||
              f === e) &&
            f.child !== null
          ) {
            (f.child.return = f), (f = f.child);
            continue;
          }
          if (f === e) break e;
          for (; f.sibling === null; ) {
            if (f.return === null || f.return === e) break e;
            d === f && (d = null), (f = f.return);
          }
          d === f && (d = null), (f.sibling.return = f.return), (f = f.sibling);
        }
      }
      break;
    case 19:
      wt(t, e), At(e), r & 4 && Kd(e);
      break;
    case 21:
      break;
    default:
      wt(t, e), At(e);
  }
}
function At(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (Zp(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(k(160));
      }
      switch (r.tag) {
        case 5:
          var s = r.stateNode;
          r.flags & 32 && (Us(s, ""), (r.flags &= -33));
          var o = Wd(e);
          tu(e, o, s);
          break;
        case 3:
        case 4:
          var i = r.stateNode.containerInfo,
            l = Wd(e);
          eu(e, l, i);
          break;
        default:
          throw Error(k(161));
      }
    } catch (a) {
      he(e, e.return, a);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function sv(e, t, n) {
  (A = e), nm(e);
}
function nm(e, t, n) {
  for (var r = (e.mode & 1) !== 0; A !== null; ) {
    var s = A,
      o = s.child;
    if (s.tag === 22 && r) {
      var i = s.memoizedState !== null || qo;
      if (!i) {
        var l = s.alternate,
          a = (l !== null && l.memoizedState !== null) || Pe;
        l = qo;
        var u = Pe;
        if (((qo = i), (Pe = a) && !u))
          for (A = s; A !== null; )
            (i = A),
              (a = i.child),
              i.tag === 22 && i.memoizedState !== null
                ? Xd(s)
                : a !== null
                ? ((a.return = i), (A = a))
                : Xd(s);
        for (; o !== null; ) (A = o), nm(o), (o = o.sibling);
        (A = s), (qo = l), (Pe = u);
      }
      Yd(e);
    } else
      s.subtreeFlags & 8772 && o !== null ? ((o.return = s), (A = o)) : Yd(e);
  }
}
function Yd(e) {
  for (; A !== null; ) {
    var t = A;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772)
          switch (t.tag) {
            case 0:
            case 11:
            case 15:
              Pe || ll(5, t);
              break;
            case 1:
              var r = t.stateNode;
              if (t.flags & 4 && !Pe)
                if (n === null) r.componentDidMount();
                else {
                  var s =
                    t.elementType === t.type
                      ? n.memoizedProps
                      : bt(t.type, n.memoizedProps);
                  r.componentDidUpdate(
                    s,
                    n.memoizedState,
                    r.__reactInternalSnapshotBeforeUpdate
                  );
                }
              var o = t.updateQueue;
              o !== null && Ld(t, o, r);
              break;
            case 3:
              var i = t.updateQueue;
              if (i !== null) {
                if (((n = null), t.child !== null))
                  switch (t.child.tag) {
                    case 5:
                      n = t.child.stateNode;
                      break;
                    case 1:
                      n = t.child.stateNode;
                  }
                Ld(t, i, n);
              }
              break;
            case 5:
              var l = t.stateNode;
              if (n === null && t.flags & 4) {
                n = l;
                var a = t.memoizedProps;
                switch (t.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    a.autoFocus && n.focus();
                    break;
                  case "img":
                    a.src && (n.src = a.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (t.memoizedState === null) {
                var u = t.alternate;
                if (u !== null) {
                  var d = u.memoizedState;
                  if (d !== null) {
                    var f = d.dehydrated;
                    f !== null && qs(f);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(k(163));
          }
        Pe || (t.flags & 512 && Za(t));
      } catch (y) {
        he(t, t.return, y);
      }
    }
    if (t === e) {
      A = null;
      break;
    }
    if (((n = t.sibling), n !== null)) {
      (n.return = t.return), (A = n);
      break;
    }
    A = t.return;
  }
}
function Gd(e) {
  for (; A !== null; ) {
    var t = A;
    if (t === e) {
      A = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      (n.return = t.return), (A = n);
      break;
    }
    A = t.return;
  }
}
function Xd(e) {
  for (; A !== null; ) {
    var t = A;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            ll(4, t);
          } catch (a) {
            he(t, n, a);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var s = t.return;
            try {
              r.componentDidMount();
            } catch (a) {
              he(t, s, a);
            }
          }
          var o = t.return;
          try {
            Za(t);
          } catch (a) {
            he(t, o, a);
          }
          break;
        case 5:
          var i = t.return;
          try {
            Za(t);
          } catch (a) {
            he(t, i, a);
          }
      }
    } catch (a) {
      he(t, t.return, a);
    }
    if (t === e) {
      A = null;
      break;
    }
    var l = t.sibling;
    if (l !== null) {
      (l.return = t.return), (A = l);
      break;
    }
    A = t.return;
  }
}
var ov = Math.ceil,
  Ai = sn.ReactCurrentDispatcher,
  dc = sn.ReactCurrentOwner,
  pt = sn.ReactCurrentBatchConfig,
  G = 0,
  _e = null,
  ve = null,
  je = 0,
  Je = 0,
  Tr = Pn(0),
  be = 0,
  no = null,
  er = 0,
  al = 0,
  fc = 0,
  Ms = null,
  He = null,
  hc = 0,
  Hr = 1 / 0,
  Wt = null,
  Ii = !1,
  nu = null,
  Cn = null,
  Vo = !1,
  vn = null,
  Fi = 0,
  zs = 0,
  ru = null,
  li = -1,
  ai = 0;
function $e() {
  return G & 6 ? ye() : li !== -1 ? li : (li = ye());
}
function _n(e) {
  return e.mode & 1
    ? G & 2 && je !== 0
      ? je & -je
      : Bg.transition !== null
      ? (ai === 0 && (ai = $h()), ai)
      : ((e = X),
        e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : Wh(e.type))),
        e)
    : 1;
}
function _t(e, t, n, r) {
  if (50 < zs) throw ((zs = 0), (ru = null), Error(k(185)));
  fo(e, n, r),
    (!(G & 2) || e !== _e) &&
      (e === _e && (!(G & 2) && (al |= n), be === 4 && yn(e, je)),
      We(e, r),
      n === 1 && G === 0 && !(t.mode & 1) && ((Hr = ye() + 500), sl && Ln()));
}
function We(e, t) {
  var n = e.callbackNode;
  By(e, t);
  var r = xi(e, e === _e ? je : 0);
  if (r === 0)
    n !== null && id(n), (e.callbackNode = null), (e.callbackPriority = 0);
  else if (((t = r & -r), e.callbackPriority !== t)) {
    if ((n != null && id(n), t === 1))
      e.tag === 0 ? Ug(Jd.bind(null, e)) : fp(Jd.bind(null, e)),
        Dg(function () {
          !(G & 6) && Ln();
        }),
        (n = null);
    else {
      switch (Uh(r)) {
        case 1:
          n = zu;
          break;
        case 4:
          n = Mh;
          break;
        case 16:
          n = vi;
          break;
        case 536870912:
          n = zh;
          break;
        default:
          n = vi;
      }
      n = cm(n, rm.bind(null, e));
    }
    (e.callbackPriority = t), (e.callbackNode = n);
  }
}
function rm(e, t) {
  if (((li = -1), (ai = 0), G & 6)) throw Error(k(327));
  var n = e.callbackNode;
  if (Ir() && e.callbackNode !== n) return null;
  var r = xi(e, e === _e ? je : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = Di(e, r);
  else {
    t = r;
    var s = G;
    G |= 2;
    var o = om();
    (_e !== e || je !== t) && ((Wt = null), (Hr = ye() + 500), Vn(e, t));
    do
      try {
        av();
        break;
      } catch (l) {
        sm(e, l);
      }
    while (!0);
    Ju(),
      (Ai.current = o),
      (G = s),
      ve !== null ? (t = 0) : ((_e = null), (je = 0), (t = be));
  }
  if (t !== 0) {
    if (
      (t === 2 && ((s = Ra(e)), s !== 0 && ((r = s), (t = su(e, s)))), t === 1)
    )
      throw ((n = no), Vn(e, 0), yn(e, r), We(e, ye()), n);
    if (t === 6) yn(e, r);
    else {
      if (
        ((s = e.current.alternate),
        !(r & 30) &&
          !iv(s) &&
          ((t = Di(e, r)),
          t === 2 && ((o = Ra(e)), o !== 0 && ((r = o), (t = su(e, o)))),
          t === 1))
      )
        throw ((n = no), Vn(e, 0), yn(e, r), We(e, ye()), n);
      switch (((e.finishedWork = s), (e.finishedLanes = r), t)) {
        case 0:
        case 1:
          throw Error(k(345));
        case 2:
          $n(e, He, Wt);
          break;
        case 3:
          if (
            (yn(e, r), (r & 130023424) === r && ((t = hc + 500 - ye()), 10 < t))
          ) {
            if (xi(e, 0) !== 0) break;
            if (((s = e.suspendedLanes), (s & r) !== r)) {
              $e(), (e.pingedLanes |= e.suspendedLanes & s);
              break;
            }
            e.timeoutHandle = Ma($n.bind(null, e, He, Wt), t);
            break;
          }
          $n(e, He, Wt);
          break;
        case 4:
          if ((yn(e, r), (r & 4194240) === r)) break;
          for (t = e.eventTimes, s = -1; 0 < r; ) {
            var i = 31 - Ct(r);
            (o = 1 << i), (i = t[i]), i > s && (s = i), (r &= ~o);
          }
          if (
            ((r = s),
            (r = ye() - r),
            (r =
              (120 > r
                ? 120
                : 480 > r
                ? 480
                : 1080 > r
                ? 1080
                : 1920 > r
                ? 1920
                : 3e3 > r
                ? 3e3
                : 4320 > r
                ? 4320
                : 1960 * ov(r / 1960)) - r),
            10 < r)
          ) {
            e.timeoutHandle = Ma($n.bind(null, e, He, Wt), r);
            break;
          }
          $n(e, He, Wt);
          break;
        case 5:
          $n(e, He, Wt);
          break;
        default:
          throw Error(k(329));
      }
    }
  }
  return We(e, ye()), e.callbackNode === n ? rm.bind(null, e) : null;
}
function su(e, t) {
  var n = Ms;
  return (
    e.current.memoizedState.isDehydrated && (Vn(e, t).flags |= 256),
    (e = Di(e, t)),
    e !== 2 && ((t = He), (He = n), t !== null && ou(t)),
    e
  );
}
function ou(e) {
  He === null ? (He = e) : He.push.apply(He, e);
}
function iv(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && ((n = n.stores), n !== null))
        for (var r = 0; r < n.length; r++) {
          var s = n[r],
            o = s.getSnapshot;
          s = s.value;
          try {
            if (!Nt(o(), s)) return !1;
          } catch {
            return !1;
          }
        }
    }
    if (((n = t.child), t.subtreeFlags & 16384 && n !== null))
      (n.return = t), (t = n);
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      (t.sibling.return = t.return), (t = t.sibling);
    }
  }
  return !0;
}
function yn(e, t) {
  for (
    t &= ~fc,
      t &= ~al,
      e.suspendedLanes |= t,
      e.pingedLanes &= ~t,
      e = e.expirationTimes;
    0 < t;

  ) {
    var n = 31 - Ct(t),
      r = 1 << n;
    (e[n] = -1), (t &= ~r);
  }
}
function Jd(e) {
  if (G & 6) throw Error(k(327));
  Ir();
  var t = xi(e, 0);
  if (!(t & 1)) return We(e, ye()), null;
  var n = Di(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = Ra(e);
    r !== 0 && ((t = r), (n = su(e, r)));
  }
  if (n === 1) throw ((n = no), Vn(e, 0), yn(e, t), We(e, ye()), n);
  if (n === 6) throw Error(k(345));
  return (
    (e.finishedWork = e.current.alternate),
    (e.finishedLanes = t),
    $n(e, He, Wt),
    We(e, ye()),
    null
  );
}
function pc(e, t) {
  var n = G;
  G |= 1;
  try {
    return e(t);
  } finally {
    (G = n), G === 0 && ((Hr = ye() + 500), sl && Ln());
  }
}
function tr(e) {
  vn !== null && vn.tag === 0 && !(G & 6) && Ir();
  var t = G;
  G |= 1;
  var n = pt.transition,
    r = X;
  try {
    if (((pt.transition = null), (X = 1), e)) return e();
  } finally {
    (X = r), (pt.transition = n), (G = t), !(G & 6) && Ln();
  }
}
function mc() {
  (Je = Tr.current), re(Tr);
}
function Vn(e, t) {
  (e.finishedWork = null), (e.finishedLanes = 0);
  var n = e.timeoutHandle;
  if ((n !== -1 && ((e.timeoutHandle = -1), Fg(n)), ve !== null))
    for (n = ve.return; n !== null; ) {
      var r = n;
      switch ((Yu(r), r.tag)) {
        case 1:
          (r = r.type.childContextTypes), r != null && Ci();
          break;
        case 3:
          Ur(), re(qe), re(Le), sc();
          break;
        case 5:
          rc(r);
          break;
        case 4:
          Ur();
          break;
        case 13:
          re(ae);
          break;
        case 19:
          re(ae);
          break;
        case 10:
          Zu(r.type._context);
          break;
        case 22:
        case 23:
          mc();
      }
      n = n.return;
    }
  if (
    ((_e = e),
    (ve = e = Nn(e.current, null)),
    (je = Je = t),
    (be = 0),
    (no = null),
    (fc = al = er = 0),
    (He = Ms = null),
    Bn !== null)
  ) {
    for (t = 0; t < Bn.length; t++)
      if (((n = Bn[t]), (r = n.interleaved), r !== null)) {
        n.interleaved = null;
        var s = r.next,
          o = n.pending;
        if (o !== null) {
          var i = o.next;
          (o.next = s), (r.next = i);
        }
        n.pending = r;
      }
    Bn = null;
  }
  return e;
}
function sm(e, t) {
  do {
    var n = ve;
    try {
      if ((Ju(), (si.current = Li), Pi)) {
        for (var r = ue.memoizedState; r !== null; ) {
          var s = r.queue;
          s !== null && (s.pending = null), (r = r.next);
        }
        Pi = !1;
      }
      if (
        ((Zn = 0),
        (Ce = we = ue = null),
        (Fs = !1),
        (Zs = 0),
        (dc.current = null),
        n === null || n.return === null)
      ) {
        (be = 1), (no = t), (ve = null);
        break;
      }
      e: {
        var o = e,
          i = n.return,
          l = n,
          a = t;
        if (
          ((t = je),
          (l.flags |= 32768),
          a !== null && typeof a == "object" && typeof a.then == "function")
        ) {
          var u = a,
            d = l,
            f = d.tag;
          if (!(d.mode & 1) && (f === 0 || f === 11 || f === 15)) {
            var y = d.alternate;
            y
              ? ((d.updateQueue = y.updateQueue),
                (d.memoizedState = y.memoizedState),
                (d.lanes = y.lanes))
              : ((d.updateQueue = null), (d.memoizedState = null));
          }
          var g = zd(i);
          if (g !== null) {
            (g.flags &= -257),
              $d(g, i, l, o, t),
              g.mode & 1 && Md(o, u, t),
              (t = g),
              (a = u);
            var x = t.updateQueue;
            if (x === null) {
              var b = new Set();
              b.add(a), (t.updateQueue = b);
            } else x.add(a);
            break e;
          } else {
            if (!(t & 1)) {
              Md(o, u, t), yc();
              break e;
            }
            a = Error(k(426));
          }
        } else if (oe && l.mode & 1) {
          var w = zd(i);
          if (w !== null) {
            !(w.flags & 65536) && (w.flags |= 256),
              $d(w, i, l, o, t),
              Gu(Br(a, l));
            break e;
          }
        }
        (o = a = Br(a, l)),
          be !== 4 && (be = 2),
          Ms === null ? (Ms = [o]) : Ms.push(o),
          (o = i);
        do {
          switch (o.tag) {
            case 3:
              (o.flags |= 65536), (t &= -t), (o.lanes |= t);
              var m = Up(o, a, t);
              Pd(o, m);
              break e;
            case 1:
              l = a;
              var h = o.type,
                p = o.stateNode;
              if (
                !(o.flags & 128) &&
                (typeof h.getDerivedStateFromError == "function" ||
                  (p !== null &&
                    typeof p.componentDidCatch == "function" &&
                    (Cn === null || !Cn.has(p))))
              ) {
                (o.flags |= 65536), (t &= -t), (o.lanes |= t);
                var E = Bp(o, l, t);
                Pd(o, E);
                break e;
              }
          }
          o = o.return;
        } while (o !== null);
      }
      lm(n);
    } catch (_) {
      (t = _), ve === n && n !== null && (ve = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function om() {
  var e = Ai.current;
  return (Ai.current = Li), e === null ? Li : e;
}
function yc() {
  (be === 0 || be === 3 || be === 2) && (be = 4),
    _e === null || (!(er & 268435455) && !(al & 268435455)) || yn(_e, je);
}
function Di(e, t) {
  var n = G;
  G |= 2;
  var r = om();
  (_e !== e || je !== t) && ((Wt = null), Vn(e, t));
  do
    try {
      lv();
      break;
    } catch (s) {
      sm(e, s);
    }
  while (!0);
  if ((Ju(), (G = n), (Ai.current = r), ve !== null)) throw Error(k(261));
  return (_e = null), (je = 0), be;
}
function lv() {
  for (; ve !== null; ) im(ve);
}
function av() {
  for (; ve !== null && !Ly(); ) im(ve);
}
function im(e) {
  var t = um(e.alternate, e, Je);
  (e.memoizedProps = e.pendingProps),
    t === null ? lm(e) : (ve = t),
    (dc.current = null);
}
function lm(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (((e = t.return), t.flags & 32768)) {
      if (((n = tv(n, t)), n !== null)) {
        (n.flags &= 32767), (ve = n);
        return;
      }
      if (e !== null)
        (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
      else {
        (be = 6), (ve = null);
        return;
      }
    } else if (((n = ev(n, t, Je)), n !== null)) {
      ve = n;
      return;
    }
    if (((t = t.sibling), t !== null)) {
      ve = t;
      return;
    }
    ve = t = e;
  } while (t !== null);
  be === 0 && (be = 5);
}
function $n(e, t, n) {
  var r = X,
    s = pt.transition;
  try {
    (pt.transition = null), (X = 1), uv(e, t, n, r);
  } finally {
    (pt.transition = s), (X = r);
  }
  return null;
}
function uv(e, t, n, r) {
  do Ir();
  while (vn !== null);
  if (G & 6) throw Error(k(327));
  n = e.finishedWork;
  var s = e.finishedLanes;
  if (n === null) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), n === e.current))
    throw Error(k(177));
  (e.callbackNode = null), (e.callbackPriority = 0);
  var o = n.lanes | n.childLanes;
  if (
    (Hy(e, o),
    e === _e && ((ve = _e = null), (je = 0)),
    (!(n.subtreeFlags & 2064) && !(n.flags & 2064)) ||
      Vo ||
      ((Vo = !0),
      cm(vi, function () {
        return Ir(), null;
      })),
    (o = (n.flags & 15990) !== 0),
    n.subtreeFlags & 15990 || o)
  ) {
    (o = pt.transition), (pt.transition = null);
    var i = X;
    X = 1;
    var l = G;
    (G |= 4),
      (dc.current = null),
      rv(e, n),
      tm(n, e),
      Tg(Fa),
      (wi = !!Ia),
      (Fa = Ia = null),
      (e.current = n),
      sv(n),
      Ay(),
      (G = l),
      (X = i),
      (pt.transition = o);
  } else e.current = n;
  if (
    (Vo && ((Vo = !1), (vn = e), (Fi = s)),
    (o = e.pendingLanes),
    o === 0 && (Cn = null),
    Dy(n.stateNode),
    We(e, ye()),
    t !== null)
  )
    for (r = e.onRecoverableError, n = 0; n < t.length; n++)
      (s = t[n]), r(s.value, { componentStack: s.stack, digest: s.digest });
  if (Ii) throw ((Ii = !1), (e = nu), (nu = null), e);
  return (
    Fi & 1 && e.tag !== 0 && Ir(),
    (o = e.pendingLanes),
    o & 1 ? (e === ru ? zs++ : ((zs = 0), (ru = e))) : (zs = 0),
    Ln(),
    null
  );
}
function Ir() {
  if (vn !== null) {
    var e = Uh(Fi),
      t = pt.transition,
      n = X;
    try {
      if (((pt.transition = null), (X = 16 > e ? 16 : e), vn === null))
        var r = !1;
      else {
        if (((e = vn), (vn = null), (Fi = 0), G & 6)) throw Error(k(331));
        var s = G;
        for (G |= 4, A = e.current; A !== null; ) {
          var o = A,
            i = o.child;
          if (A.flags & 16) {
            var l = o.deletions;
            if (l !== null) {
              for (var a = 0; a < l.length; a++) {
                var u = l[a];
                for (A = u; A !== null; ) {
                  var d = A;
                  switch (d.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Ds(8, d, o);
                  }
                  var f = d.child;
                  if (f !== null) (f.return = d), (A = f);
                  else
                    for (; A !== null; ) {
                      d = A;
                      var y = d.sibling,
                        g = d.return;
                      if ((Jp(d), d === u)) {
                        A = null;
                        break;
                      }
                      if (y !== null) {
                        (y.return = g), (A = y);
                        break;
                      }
                      A = g;
                    }
                }
              }
              var x = o.alternate;
              if (x !== null) {
                var b = x.child;
                if (b !== null) {
                  x.child = null;
                  do {
                    var w = b.sibling;
                    (b.sibling = null), (b = w);
                  } while (b !== null);
                }
              }
              A = o;
            }
          }
          if (o.subtreeFlags & 2064 && i !== null) (i.return = o), (A = i);
          else
            e: for (; A !== null; ) {
              if (((o = A), o.flags & 2048))
                switch (o.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Ds(9, o, o.return);
                }
              var m = o.sibling;
              if (m !== null) {
                (m.return = o.return), (A = m);
                break e;
              }
              A = o.return;
            }
        }
        var h = e.current;
        for (A = h; A !== null; ) {
          i = A;
          var p = i.child;
          if (i.subtreeFlags & 2064 && p !== null) (p.return = i), (A = p);
          else
            e: for (i = h; A !== null; ) {
              if (((l = A), l.flags & 2048))
                try {
                  switch (l.tag) {
                    case 0:
                    case 11:
                    case 15:
                      ll(9, l);
                  }
                } catch (_) {
                  he(l, l.return, _);
                }
              if (l === i) {
                A = null;
                break e;
              }
              var E = l.sibling;
              if (E !== null) {
                (E.return = l.return), (A = E);
                break e;
              }
              A = l.return;
            }
        }
        if (
          ((G = s), Ln(), Dt && typeof Dt.onPostCommitFiberRoot == "function")
        )
          try {
            Dt.onPostCommitFiberRoot(Zi, e);
          } catch {}
        r = !0;
      }
      return r;
    } finally {
      (X = n), (pt.transition = t);
    }
  }
  return !1;
}
function Zd(e, t, n) {
  (t = Br(n, t)),
    (t = Up(e, t, 1)),
    (e = Sn(e, t, 1)),
    (t = $e()),
    e !== null && (fo(e, 1, t), We(e, t));
}
function he(e, t, n) {
  if (e.tag === 3) Zd(e, e, n);
  else
    for (; t !== null; ) {
      if (t.tag === 3) {
        Zd(t, e, n);
        break;
      } else if (t.tag === 1) {
        var r = t.stateNode;
        if (
          typeof t.type.getDerivedStateFromError == "function" ||
          (typeof r.componentDidCatch == "function" &&
            (Cn === null || !Cn.has(r)))
        ) {
          (e = Br(n, e)),
            (e = Bp(t, e, 1)),
            (t = Sn(t, e, 1)),
            (e = $e()),
            t !== null && (fo(t, 1, e), We(t, e));
          break;
        }
      }
      t = t.return;
    }
}
function cv(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t),
    (t = $e()),
    (e.pingedLanes |= e.suspendedLanes & n),
    _e === e &&
      (je & n) === n &&
      (be === 4 || (be === 3 && (je & 130023424) === je && 500 > ye() - hc)
        ? Vn(e, 0)
        : (fc |= n)),
    We(e, t);
}
function am(e, t) {
  t === 0 &&
    (e.mode & 1
      ? ((t = Fo), (Fo <<= 1), !(Fo & 130023424) && (Fo = 4194304))
      : (t = 1));
  var n = $e();
  (e = tn(e, t)), e !== null && (fo(e, t, n), We(e, n));
}
function dv(e) {
  var t = e.memoizedState,
    n = 0;
  t !== null && (n = t.retryLane), am(e, n);
}
function fv(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode,
        s = e.memoizedState;
      s !== null && (n = s.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(k(314));
  }
  r !== null && r.delete(t), am(e, n);
}
var um;
um = function (e, t, n) {
  if (e !== null)
    if (e.memoizedProps !== t.pendingProps || qe.current) Qe = !0;
    else {
      if (!(e.lanes & n) && !(t.flags & 128)) return (Qe = !1), Zg(e, t, n);
      Qe = !!(e.flags & 131072);
    }
  else (Qe = !1), oe && t.flags & 1048576 && hp(t, ji, t.index);
  switch (((t.lanes = 0), t.tag)) {
    case 2:
      var r = t.type;
      ii(e, t), (e = t.pendingProps);
      var s = Mr(t, Le.current);
      Ar(t, n), (s = ic(null, t, r, e, s, n));
      var o = lc();
      return (
        (t.flags |= 1),
        typeof s == "object" &&
        s !== null &&
        typeof s.render == "function" &&
        s.$$typeof === void 0
          ? ((t.tag = 1),
            (t.memoizedState = null),
            (t.updateQueue = null),
            Ve(r) ? ((o = !0), _i(t)) : (o = !1),
            (t.memoizedState =
              s.state !== null && s.state !== void 0 ? s.state : null),
            tc(t),
            (s.updater = il),
            (t.stateNode = s),
            (s._reactInternals = t),
            qa(t, r, e, n),
            (t = Ka(null, t, r, !0, o, n)))
          : ((t.tag = 0), oe && o && Ku(t), De(null, t, s, n), (t = t.child)),
        t
      );
    case 16:
      r = t.elementType;
      e: {
        switch (
          (ii(e, t),
          (e = t.pendingProps),
          (s = r._init),
          (r = s(r._payload)),
          (t.type = r),
          (s = t.tag = pv(r)),
          (e = bt(r, e)),
          s)
        ) {
          case 0:
            t = Wa(null, t, r, e, n);
            break e;
          case 1:
            t = Hd(null, t, r, e, n);
            break e;
          case 11:
            t = Ud(null, t, r, e, n);
            break e;
          case 14:
            t = Bd(null, t, r, bt(r.type, e), n);
            break e;
        }
        throw Error(k(306, r, ""));
      }
      return t;
    case 0:
      return (
        (r = t.type),
        (s = t.pendingProps),
        (s = t.elementType === r ? s : bt(r, s)),
        Wa(e, t, r, s, n)
      );
    case 1:
      return (
        (r = t.type),
        (s = t.pendingProps),
        (s = t.elementType === r ? s : bt(r, s)),
        Hd(e, t, r, s, n)
      );
    case 3:
      e: {
        if ((Vp(t), e === null)) throw Error(k(387));
        (r = t.pendingProps),
          (o = t.memoizedState),
          (s = o.element),
          xp(e, t),
          Ri(t, r, null, n);
        var i = t.memoizedState;
        if (((r = i.element), o.isDehydrated))
          if (
            ((o = {
              element: r,
              isDehydrated: !1,
              cache: i.cache,
              pendingSuspenseBoundaries: i.pendingSuspenseBoundaries,
              transitions: i.transitions,
            }),
            (t.updateQueue.baseState = o),
            (t.memoizedState = o),
            t.flags & 256)
          ) {
            (s = Br(Error(k(423)), t)), (t = Qd(e, t, r, n, s));
            break e;
          } else if (r !== s) {
            (s = Br(Error(k(424)), t)), (t = Qd(e, t, r, n, s));
            break e;
          } else
            for (
              Ze = En(t.stateNode.containerInfo.firstChild),
                et = t,
                oe = !0,
                St = null,
                n = gp(t, null, r, n),
                t.child = n;
              n;

            )
              (n.flags = (n.flags & -3) | 4096), (n = n.sibling);
        else {
          if ((zr(), r === s)) {
            t = nn(e, t, n);
            break e;
          }
          De(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return (
        wp(t),
        e === null && Ba(t),
        (r = t.type),
        (s = t.pendingProps),
        (o = e !== null ? e.memoizedProps : null),
        (i = s.children),
        Da(r, s) ? (i = null) : o !== null && Da(r, o) && (t.flags |= 32),
        qp(e, t),
        De(e, t, i, n),
        t.child
      );
    case 6:
      return e === null && Ba(t), null;
    case 13:
      return Wp(e, t, n);
    case 4:
      return (
        nc(t, t.stateNode.containerInfo),
        (r = t.pendingProps),
        e === null ? (t.child = $r(t, null, r, n)) : De(e, t, r, n),
        t.child
      );
    case 11:
      return (
        (r = t.type),
        (s = t.pendingProps),
        (s = t.elementType === r ? s : bt(r, s)),
        Ud(e, t, r, s, n)
      );
    case 7:
      return De(e, t, t.pendingProps, n), t.child;
    case 8:
      return De(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return De(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (
          ((r = t.type._context),
          (s = t.pendingProps),
          (o = t.memoizedProps),
          (i = s.value),
          ee(ki, r._currentValue),
          (r._currentValue = i),
          o !== null)
        )
          if (Nt(o.value, i)) {
            if (o.children === s.children && !qe.current) {
              t = nn(e, t, n);
              break e;
            }
          } else
            for (o = t.child, o !== null && (o.return = t); o !== null; ) {
              var l = o.dependencies;
              if (l !== null) {
                i = o.child;
                for (var a = l.firstContext; a !== null; ) {
                  if (a.context === r) {
                    if (o.tag === 1) {
                      (a = Xt(-1, n & -n)), (a.tag = 2);
                      var u = o.updateQueue;
                      if (u !== null) {
                        u = u.shared;
                        var d = u.pending;
                        d === null
                          ? (a.next = a)
                          : ((a.next = d.next), (d.next = a)),
                          (u.pending = a);
                      }
                    }
                    (o.lanes |= n),
                      (a = o.alternate),
                      a !== null && (a.lanes |= n),
                      Ha(o.return, n, t),
                      (l.lanes |= n);
                    break;
                  }
                  a = a.next;
                }
              } else if (o.tag === 10) i = o.type === t.type ? null : o.child;
              else if (o.tag === 18) {
                if (((i = o.return), i === null)) throw Error(k(341));
                (i.lanes |= n),
                  (l = i.alternate),
                  l !== null && (l.lanes |= n),
                  Ha(i, n, t),
                  (i = o.sibling);
              } else i = o.child;
              if (i !== null) i.return = o;
              else
                for (i = o; i !== null; ) {
                  if (i === t) {
                    i = null;
                    break;
                  }
                  if (((o = i.sibling), o !== null)) {
                    (o.return = i.return), (i = o);
                    break;
                  }
                  i = i.return;
                }
              o = i;
            }
        De(e, t, s.children, n), (t = t.child);
      }
      return t;
    case 9:
      return (
        (s = t.type),
        (r = t.pendingProps.children),
        Ar(t, n),
        (s = mt(s)),
        (r = r(s)),
        (t.flags |= 1),
        De(e, t, r, n),
        t.child
      );
    case 14:
      return (
        (r = t.type),
        (s = bt(r, t.pendingProps)),
        (s = bt(r.type, s)),
        Bd(e, t, r, s, n)
      );
    case 15:
      return Hp(e, t, t.type, t.pendingProps, n);
    case 17:
      return (
        (r = t.type),
        (s = t.pendingProps),
        (s = t.elementType === r ? s : bt(r, s)),
        ii(e, t),
        (t.tag = 1),
        Ve(r) ? ((e = !0), _i(t)) : (e = !1),
        Ar(t, n),
        $p(t, r, s),
        qa(t, r, s, n),
        Ka(null, t, r, !0, e, n)
      );
    case 19:
      return Kp(e, t, n);
    case 22:
      return Qp(e, t, n);
  }
  throw Error(k(156, t.tag));
};
function cm(e, t) {
  return Dh(e, t);
}
function hv(e, t, n, r) {
  (this.tag = e),
    (this.key = n),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.ref = null),
    (this.pendingProps = t),
    (this.dependencies =
      this.memoizedState =
      this.updateQueue =
      this.memoizedProps =
        null),
    (this.mode = r),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null);
}
function ht(e, t, n, r) {
  return new hv(e, t, n, r);
}
function gc(e) {
  return (e = e.prototype), !(!e || !e.isReactComponent);
}
function pv(e) {
  if (typeof e == "function") return gc(e) ? 1 : 0;
  if (e != null) {
    if (((e = e.$$typeof), e === Fu)) return 11;
    if (e === Du) return 14;
  }
  return 2;
}
function Nn(e, t) {
  var n = e.alternate;
  return (
    n === null
      ? ((n = ht(e.tag, t, e.key, e.mode)),
        (n.elementType = e.elementType),
        (n.type = e.type),
        (n.stateNode = e.stateNode),
        (n.alternate = e),
        (e.alternate = n))
      : ((n.pendingProps = t),
        (n.type = e.type),
        (n.flags = 0),
        (n.subtreeFlags = 0),
        (n.deletions = null)),
    (n.flags = e.flags & 14680064),
    (n.childLanes = e.childLanes),
    (n.lanes = e.lanes),
    (n.child = e.child),
    (n.memoizedProps = e.memoizedProps),
    (n.memoizedState = e.memoizedState),
    (n.updateQueue = e.updateQueue),
    (t = e.dependencies),
    (n.dependencies =
      t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
    (n.sibling = e.sibling),
    (n.index = e.index),
    (n.ref = e.ref),
    n
  );
}
function ui(e, t, n, r, s, o) {
  var i = 2;
  if (((r = e), typeof e == "function")) gc(e) && (i = 1);
  else if (typeof e == "string") i = 5;
  else
    e: switch (e) {
      case xr:
        return Wn(n.children, s, o, t);
      case Iu:
        (i = 8), (s |= 8);
        break;
      case ma:
        return (
          (e = ht(12, n, t, s | 2)), (e.elementType = ma), (e.lanes = o), e
        );
      case ya:
        return (e = ht(13, n, t, s)), (e.elementType = ya), (e.lanes = o), e;
      case ga:
        return (e = ht(19, n, t, s)), (e.elementType = ga), (e.lanes = o), e;
      case wh:
        return ul(n, s, o, t);
      default:
        if (typeof e == "object" && e !== null)
          switch (e.$$typeof) {
            case vh:
              i = 10;
              break e;
            case xh:
              i = 9;
              break e;
            case Fu:
              i = 11;
              break e;
            case Du:
              i = 14;
              break e;
            case fn:
              (i = 16), (r = null);
              break e;
          }
        throw Error(k(130, e == null ? e : typeof e, ""));
    }
  return (
    (t = ht(i, n, t, s)), (t.elementType = e), (t.type = r), (t.lanes = o), t
  );
}
function Wn(e, t, n, r) {
  return (e = ht(7, e, r, t)), (e.lanes = n), e;
}
function ul(e, t, n, r) {
  return (
    (e = ht(22, e, r, t)),
    (e.elementType = wh),
    (e.lanes = n),
    (e.stateNode = { isHidden: !1 }),
    e
  );
}
function ta(e, t, n) {
  return (e = ht(6, e, null, t)), (e.lanes = n), e;
}
function na(e, t, n) {
  return (
    (t = ht(4, e.children !== null ? e.children : [], e.key, t)),
    (t.lanes = n),
    (t.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    t
  );
}
function mv(e, t, n, r, s) {
  (this.tag = t),
    (this.containerInfo = e),
    (this.finishedWork =
      this.pingCache =
      this.current =
      this.pendingChildren =
        null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = Fl(0)),
    (this.expirationTimes = Fl(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = Fl(0)),
    (this.identifierPrefix = r),
    (this.onRecoverableError = s),
    (this.mutableSourceEagerHydrationData = null);
}
function vc(e, t, n, r, s, o, i, l, a) {
  return (
    (e = new mv(e, t, n, l, a)),
    t === 1 ? ((t = 1), o === !0 && (t |= 8)) : (t = 0),
    (o = ht(3, null, null, t)),
    (e.current = o),
    (o.stateNode = e),
    (o.memoizedState = {
      element: r,
      isDehydrated: n,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    tc(o),
    e
  );
}
function yv(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: vr,
    key: r == null ? null : "" + r,
    children: e,
    containerInfo: t,
    implementation: n,
  };
}
function dm(e) {
  if (!e) return kn;
  e = e._reactInternals;
  e: {
    if (lr(e) !== e || e.tag !== 1) throw Error(k(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (Ve(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(k(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (Ve(n)) return dp(e, n, t);
  }
  return t;
}
function fm(e, t, n, r, s, o, i, l, a) {
  return (
    (e = vc(n, r, !0, e, s, o, i, l, a)),
    (e.context = dm(null)),
    (n = e.current),
    (r = $e()),
    (s = _n(n)),
    (o = Xt(r, s)),
    (o.callback = t ?? null),
    Sn(n, o, s),
    (e.current.lanes = s),
    fo(e, s, r),
    We(e, r),
    e
  );
}
function cl(e, t, n, r) {
  var s = t.current,
    o = $e(),
    i = _n(s);
  return (
    (n = dm(n)),
    t.context === null ? (t.context = n) : (t.pendingContext = n),
    (t = Xt(o, i)),
    (t.payload = { element: e }),
    (r = r === void 0 ? null : r),
    r !== null && (t.callback = r),
    (e = Sn(s, t, i)),
    e !== null && (_t(e, s, i, o), ri(e, s, i)),
    i
  );
}
function Mi(e) {
  if (((e = e.current), !e.child)) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function ef(e, t) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function xc(e, t) {
  ef(e, t), (e = e.alternate) && ef(e, t);
}
function gv() {
  return null;
}
var hm =
  typeof reportError == "function"
    ? reportError
    : function (e) {
        console.error(e);
      };
function wc(e) {
  this._internalRoot = e;
}
dl.prototype.render = wc.prototype.render = function (e) {
  var t = this._internalRoot;
  if (t === null) throw Error(k(409));
  cl(e, t, null, null);
};
dl.prototype.unmount = wc.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    tr(function () {
      cl(null, e, null, null);
    }),
      (t[en] = null);
  }
};
function dl(e) {
  this._internalRoot = e;
}
dl.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var t = Qh();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < mn.length && t !== 0 && t < mn[n].priority; n++);
    mn.splice(n, 0, e), n === 0 && Vh(e);
  }
};
function bc(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function fl(e) {
  return !(
    !e ||
    (e.nodeType !== 1 &&
      e.nodeType !== 9 &&
      e.nodeType !== 11 &&
      (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
  );
}
function tf() {}
function vv(e, t, n, r, s) {
  if (s) {
    if (typeof r == "function") {
      var o = r;
      r = function () {
        var u = Mi(i);
        o.call(u);
      };
    }
    var i = fm(t, r, e, 0, null, !1, !1, "", tf);
    return (
      (e._reactRootContainer = i),
      (e[en] = i.current),
      Ks(e.nodeType === 8 ? e.parentNode : e),
      tr(),
      i
    );
  }
  for (; (s = e.lastChild); ) e.removeChild(s);
  if (typeof r == "function") {
    var l = r;
    r = function () {
      var u = Mi(a);
      l.call(u);
    };
  }
  var a = vc(e, 0, !1, null, null, !1, !1, "", tf);
  return (
    (e._reactRootContainer = a),
    (e[en] = a.current),
    Ks(e.nodeType === 8 ? e.parentNode : e),
    tr(function () {
      cl(t, a, n, r);
    }),
    a
  );
}
function hl(e, t, n, r, s) {
  var o = n._reactRootContainer;
  if (o) {
    var i = o;
    if (typeof s == "function") {
      var l = s;
      s = function () {
        var a = Mi(i);
        l.call(a);
      };
    }
    cl(t, i, e, s);
  } else i = vv(n, t, e, s, r);
  return Mi(i);
}
Bh = function (e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = ks(t.pendingLanes);
        n !== 0 &&
          ($u(t, n | 1), We(t, ye()), !(G & 6) && ((Hr = ye() + 500), Ln()));
      }
      break;
    case 13:
      tr(function () {
        var r = tn(e, 1);
        if (r !== null) {
          var s = $e();
          _t(r, e, 1, s);
        }
      }),
        xc(e, 1);
  }
};
Uu = function (e) {
  if (e.tag === 13) {
    var t = tn(e, 134217728);
    if (t !== null) {
      var n = $e();
      _t(t, e, 134217728, n);
    }
    xc(e, 134217728);
  }
};
Hh = function (e) {
  if (e.tag === 13) {
    var t = _n(e),
      n = tn(e, t);
    if (n !== null) {
      var r = $e();
      _t(n, e, t, r);
    }
    xc(e, t);
  }
};
Qh = function () {
  return X;
};
qh = function (e, t) {
  var n = X;
  try {
    return (X = e), t();
  } finally {
    X = n;
  }
};
ja = function (e, t, n) {
  switch (t) {
    case "input":
      if ((wa(e, n), (t = n.name), n.type === "radio" && t != null)) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (
          n = n.querySelectorAll(
            "input[name=" + JSON.stringify("" + t) + '][type="radio"]'
          ),
            t = 0;
          t < n.length;
          t++
        ) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var s = rl(r);
            if (!s) throw Error(k(90));
            Eh(r), wa(r, s);
          }
        }
      }
      break;
    case "textarea":
      Ch(e, n);
      break;
    case "select":
      (t = n.value), t != null && Rr(e, !!n.multiple, t, !1);
  }
};
Oh = pc;
Ph = tr;
var xv = { usingClientEntryPoint: !1, Events: [po, Sr, rl, Th, Rh, pc] },
  Ss = {
    findFiberByHostInstance: Un,
    bundleType: 0,
    version: "18.3.1",
    rendererPackageName: "react-dom",
  },
  wv = {
    bundleType: Ss.bundleType,
    version: Ss.version,
    rendererPackageName: Ss.rendererPackageName,
    rendererConfig: Ss.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: sn.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return (e = Ih(e)), e === null ? null : e.stateNode;
    },
    findFiberByHostInstance: Ss.findFiberByHostInstance || gv,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
  };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Wo = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Wo.isDisabled && Wo.supportsFiber)
    try {
      (Zi = Wo.inject(wv)), (Dt = Wo);
    } catch {}
}
st.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = xv;
st.createPortal = function (e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!bc(t)) throw Error(k(200));
  return yv(e, t, null, n);
};
st.createRoot = function (e, t) {
  if (!bc(e)) throw Error(k(299));
  var n = !1,
    r = "",
    s = hm;
  return (
    t != null &&
      (t.unstable_strictMode === !0 && (n = !0),
      t.identifierPrefix !== void 0 && (r = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (s = t.onRecoverableError)),
    (t = vc(e, 1, !1, null, null, n, !1, r, s)),
    (e[en] = t.current),
    Ks(e.nodeType === 8 ? e.parentNode : e),
    new wc(t)
  );
};
st.findDOMNode = function (e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function"
      ? Error(k(188))
      : ((e = Object.keys(e).join(",")), Error(k(268, e)));
  return (e = Ih(t)), (e = e === null ? null : e.stateNode), e;
};
st.flushSync = function (e) {
  return tr(e);
};
st.hydrate = function (e, t, n) {
  if (!fl(t)) throw Error(k(200));
  return hl(null, e, t, !0, n);
};
st.hydrateRoot = function (e, t, n) {
  if (!bc(e)) throw Error(k(405));
  var r = (n != null && n.hydratedSources) || null,
    s = !1,
    o = "",
    i = hm;
  if (
    (n != null &&
      (n.unstable_strictMode === !0 && (s = !0),
      n.identifierPrefix !== void 0 && (o = n.identifierPrefix),
      n.onRecoverableError !== void 0 && (i = n.onRecoverableError)),
    (t = fm(t, null, e, 1, n ?? null, s, !1, o, i)),
    (e[en] = t.current),
    Ks(e),
    r)
  )
    for (e = 0; e < r.length; e++)
      (n = r[e]),
        (s = n._getVersion),
        (s = s(n._source)),
        t.mutableSourceEagerHydrationData == null
          ? (t.mutableSourceEagerHydrationData = [n, s])
          : t.mutableSourceEagerHydrationData.push(n, s);
  return new dl(t);
};
st.render = function (e, t, n) {
  if (!fl(t)) throw Error(k(200));
  return hl(null, e, t, !1, n);
};
st.unmountComponentAtNode = function (e) {
  if (!fl(e)) throw Error(k(40));
  return e._reactRootContainer
    ? (tr(function () {
        hl(null, null, e, !1, function () {
          (e._reactRootContainer = null), (e[en] = null);
        });
      }),
      !0)
    : !1;
};
st.unstable_batchedUpdates = pc;
st.unstable_renderSubtreeIntoContainer = function (e, t, n, r) {
  if (!fl(n)) throw Error(k(200));
  if (e == null || e._reactInternals === void 0) throw Error(k(38));
  return hl(e, t, n, !1, r);
};
st.version = "18.3.1-next-f1338f8080-20240426";
function pm() {
  if (
    !(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
    )
  )
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(pm);
    } catch (e) {
      console.error(e);
    }
}
pm(), (ph.exports = st);
var bv = ph.exports,
  mm,
  nf = bv;
(mm = nf.createRoot), nf.hydrateRoot;
var Ec = {};
Object.defineProperty(Ec, "__esModule", { value: !0 });
Ec.parse = kv;
Ec.serialize = Tv;
const Ev = /^[\u0021-\u003A\u003C\u003E-\u007E]+$/,
  Sv = /^[\u0021-\u003A\u003C-\u007E]*$/,
  Cv =
    /^([.]?[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)([.][a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i,
  _v = /^[\u0020-\u003A\u003D-\u007E]*$/,
  Nv = Object.prototype.toString,
  jv = (() => {
    const e = function () {};
    return (e.prototype = Object.create(null)), e;
  })();
function kv(e, t) {
  const n = new jv(),
    r = e.length;
  if (r < 2) return n;
  const s = (t == null ? void 0 : t.decode) || Rv;
  let o = 0;
  do {
    const i = e.indexOf("=", o);
    if (i === -1) break;
    const l = e.indexOf(";", o),
      a = l === -1 ? r : l;
    if (i > a) {
      o = e.lastIndexOf(";", i - 1) + 1;
      continue;
    }
    const u = rf(e, o, i),
      d = sf(e, i, u),
      f = e.slice(u, d);
    if (n[f] === void 0) {
      let y = rf(e, i + 1, a),
        g = sf(e, a, y);
      const x = s(e.slice(y, g));
      n[f] = x;
    }
    o = a + 1;
  } while (o < r);
  return n;
}
function rf(e, t, n) {
  do {
    const r = e.charCodeAt(t);
    if (r !== 32 && r !== 9) return t;
  } while (++t < n);
  return n;
}
function sf(e, t, n) {
  for (; t > n; ) {
    const r = e.charCodeAt(--t);
    if (r !== 32 && r !== 9) return t + 1;
  }
  return n;
}
function Tv(e, t, n) {
  const r = (n == null ? void 0 : n.encode) || encodeURIComponent;
  if (!Ev.test(e)) throw new TypeError(`argument name is invalid: ${e}`);
  const s = r(t);
  if (!Sv.test(s)) throw new TypeError(`argument val is invalid: ${t}`);
  let o = e + "=" + s;
  if (!n) return o;
  if (n.maxAge !== void 0) {
    if (!Number.isInteger(n.maxAge))
      throw new TypeError(`option maxAge is invalid: ${n.maxAge}`);
    o += "; Max-Age=" + n.maxAge;
  }
  if (n.domain) {
    if (!Cv.test(n.domain))
      throw new TypeError(`option domain is invalid: ${n.domain}`);
    o += "; Domain=" + n.domain;
  }
  if (n.path) {
    if (!_v.test(n.path))
      throw new TypeError(`option path is invalid: ${n.path}`);
    o += "; Path=" + n.path;
  }
  if (n.expires) {
    if (!Ov(n.expires) || !Number.isFinite(n.expires.valueOf()))
      throw new TypeError(`option expires is invalid: ${n.expires}`);
    o += "; Expires=" + n.expires.toUTCString();
  }
  if (
    (n.httpOnly && (o += "; HttpOnly"),
    n.secure && (o += "; Secure"),
    n.partitioned && (o += "; Partitioned"),
    n.priority)
  )
    switch (typeof n.priority == "string" ? n.priority.toLowerCase() : void 0) {
      case "low":
        o += "; Priority=Low";
        break;
      case "medium":
        o += "; Priority=Medium";
        break;
      case "high":
        o += "; Priority=High";
        break;
      default:
        throw new TypeError(`option priority is invalid: ${n.priority}`);
    }
  if (n.sameSite)
    switch (
      typeof n.sameSite == "string" ? n.sameSite.toLowerCase() : n.sameSite
    ) {
      case !0:
      case "strict":
        o += "; SameSite=Strict";
        break;
      case "lax":
        o += "; SameSite=Lax";
        break;
      case "none":
        o += "; SameSite=None";
        break;
      default:
        throw new TypeError(`option sameSite is invalid: ${n.sameSite}`);
    }
  return o;
}
function Rv(e) {
  if (e.indexOf("%") === -1) return e;
  try {
    return decodeURIComponent(e);
  } catch {
    return e;
  }
}
function Ov(e) {
  return Nv.call(e) === "[object Date]";
}
/**
 * react-router v7.0.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */ var of = "popstate";
function Pv(e = {}) {
  function t(r, s) {
    let { pathname: o, search: i, hash: l } = r.location;
    return iu(
      "",
      { pathname: o, search: i, hash: l },
      (s.state && s.state.usr) || null,
      (s.state && s.state.key) || "default"
    );
  }
  function n(r, s) {
    return typeof s == "string" ? s : ro(s);
  }
  return Av(t, n, null, e);
}
function ce(e, t) {
  if (e === !1 || e === null || typeof e > "u") throw new Error(t);
}
function An(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {}
  }
}
function Lv() {
  return Math.random().toString(36).substring(2, 10);
}
function lf(e, t) {
  return { usr: e.state, key: e.key, idx: t };
}
function iu(e, t, n = null, r) {
  return {
    pathname: typeof e == "string" ? e : e.pathname,
    search: "",
    hash: "",
    ...(typeof t == "string" ? Xr(t) : t),
    state: n,
    key: (t && t.key) || r || Lv(),
  };
}
function ro({ pathname: e = "/", search: t = "", hash: n = "" }) {
  return (
    t && t !== "?" && (e += t.charAt(0) === "?" ? t : "?" + t),
    n && n !== "#" && (e += n.charAt(0) === "#" ? n : "#" + n),
    e
  );
}
function Xr(e) {
  let t = {};
  if (e) {
    let n = e.indexOf("#");
    n >= 0 && ((t.hash = e.substring(n)), (e = e.substring(0, n)));
    let r = e.indexOf("?");
    r >= 0 && ((t.search = e.substring(r)), (e = e.substring(0, r))),
      e && (t.pathname = e);
  }
  return t;
}
function Av(e, t, n, r = {}) {
  let { window: s = document.defaultView, v5Compat: o = !1 } = r,
    i = s.history,
    l = "POP",
    a = null,
    u = d();
  u == null && ((u = 0), i.replaceState({ ...i.state, idx: u }, ""));
  function d() {
    return (i.state || { idx: null }).idx;
  }
  function f() {
    l = "POP";
    let w = d(),
      m = w == null ? null : w - u;
    (u = w), a && a({ action: l, location: b.location, delta: m });
  }
  function y(w, m) {
    l = "PUSH";
    let h = iu(b.location, w, m);
    u = d() + 1;
    let p = lf(h, u),
      E = b.createHref(h);
    try {
      i.pushState(p, "", E);
    } catch (_) {
      if (_ instanceof DOMException && _.name === "DataCloneError") throw _;
      s.location.assign(E);
    }
    o && a && a({ action: l, location: b.location, delta: 1 });
  }
  function g(w, m) {
    l = "REPLACE";
    let h = iu(b.location, w, m);
    u = d();
    let p = lf(h, u),
      E = b.createHref(h);
    i.replaceState(p, "", E),
      o && a && a({ action: l, location: b.location, delta: 0 });
  }
  function x(w) {
    let m = s.location.origin !== "null" ? s.location.origin : s.location.href,
      h = typeof w == "string" ? w : ro(w);
    return (
      (h = h.replace(/ $/, "%20")),
      ce(
        m,
        `No window.location.(origin|href) available to create URL for href: ${h}`
      ),
      new URL(h, m)
    );
  }
  let b = {
    get action() {
      return l;
    },
    get location() {
      return e(s, i);
    },
    listen(w) {
      if (a) throw new Error("A history only accepts one active listener");
      return (
        s.addEventListener(of, f),
        (a = w),
        () => {
          s.removeEventListener(of, f), (a = null);
        }
      );
    },
    createHref(w) {
      return t(s, w);
    },
    createURL: x,
    encodeLocation(w) {
      let m = x(w);
      return { pathname: m.pathname, search: m.search, hash: m.hash };
    },
    push: y,
    replace: g,
    go(w) {
      return i.go(w);
    },
  };
  return b;
}
function ym(e, t, n = "/") {
  return Iv(e, t, n, !1);
}
function Iv(e, t, n, r) {
  let s = typeof t == "string" ? Xr(t) : t,
    o = Tn(s.pathname || "/", n);
  if (o == null) return null;
  let i = gm(e);
  Fv(i);
  let l = null;
  for (let a = 0; l == null && a < i.length; ++a) {
    let u = Wv(o);
    l = qv(i[a], u, r);
  }
  return l;
}
function gm(e, t = [], n = [], r = "") {
  let s = (o, i, l) => {
    let a = {
      relativePath: l === void 0 ? o.path || "" : l,
      caseSensitive: o.caseSensitive === !0,
      childrenIndex: i,
      route: o,
    };
    a.relativePath.startsWith("/") &&
      (ce(
        a.relativePath.startsWith(r),
        `Absolute route path "${a.relativePath}" nested under path "${r}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`
      ),
      (a.relativePath = a.relativePath.slice(r.length)));
    let u = Jt([r, a.relativePath]),
      d = n.concat(a);
    o.children &&
      o.children.length > 0 &&
      (ce(
        o.index !== !0,
        `Index routes must not have child routes. Please remove all child routes from route path "${u}".`
      ),
      gm(o.children, t, d, u)),
      !(o.path == null && !o.index) &&
        t.push({ path: u, score: Hv(u, o.index), routesMeta: d });
  };
  return (
    e.forEach((o, i) => {
      var l;
      if (o.path === "" || !((l = o.path) != null && l.includes("?"))) s(o, i);
      else for (let a of vm(o.path)) s(o, i, a);
    }),
    t
  );
}
function vm(e) {
  let t = e.split("/");
  if (t.length === 0) return [];
  let [n, ...r] = t,
    s = n.endsWith("?"),
    o = n.replace(/\?$/, "");
  if (r.length === 0) return s ? [o, ""] : [o];
  let i = vm(r.join("/")),
    l = [];
  return (
    l.push(...i.map((a) => (a === "" ? o : [o, a].join("/")))),
    s && l.push(...i),
    l.map((a) => (e.startsWith("/") && a === "" ? "/" : a))
  );
}
function Fv(e) {
  e.sort((t, n) =>
    t.score !== n.score
      ? n.score - t.score
      : Qv(
          t.routesMeta.map((r) => r.childrenIndex),
          n.routesMeta.map((r) => r.childrenIndex)
        )
  );
}
var Dv = /^:[\w-]+$/,
  Mv = 3,
  zv = 2,
  $v = 1,
  Uv = 10,
  Bv = -2,
  af = (e) => e === "*";
function Hv(e, t) {
  let n = e.split("/"),
    r = n.length;
  return (
    n.some(af) && (r += Bv),
    t && (r += zv),
    n
      .filter((s) => !af(s))
      .reduce((s, o) => s + (Dv.test(o) ? Mv : o === "" ? $v : Uv), r)
  );
}
function Qv(e, t) {
  return e.length === t.length && e.slice(0, -1).every((r, s) => r === t[s])
    ? e[e.length - 1] - t[t.length - 1]
    : 0;
}
function qv(e, t, n = !1) {
  let { routesMeta: r } = e,
    s = {},
    o = "/",
    i = [];
  for (let l = 0; l < r.length; ++l) {
    let a = r[l],
      u = l === r.length - 1,
      d = o === "/" ? t : t.slice(o.length) || "/",
      f = zi(
        { path: a.relativePath, caseSensitive: a.caseSensitive, end: u },
        d
      ),
      y = a.route;
    if (
      (!f &&
        u &&
        n &&
        !r[r.length - 1].route.index &&
        (f = zi(
          { path: a.relativePath, caseSensitive: a.caseSensitive, end: !1 },
          d
        )),
      !f)
    )
      return null;
    Object.assign(s, f.params),
      i.push({
        params: s,
        pathname: Jt([o, f.pathname]),
        pathnameBase: Xv(Jt([o, f.pathnameBase])),
        route: y,
      }),
      f.pathnameBase !== "/" && (o = Jt([o, f.pathnameBase]));
  }
  return i;
}
function zi(e, t) {
  typeof e == "string" && (e = { path: e, caseSensitive: !1, end: !0 });
  let [n, r] = Vv(e.path, e.caseSensitive, e.end),
    s = t.match(n);
  if (!s) return null;
  let o = s[0],
    i = o.replace(/(.)\/+$/, "$1"),
    l = s.slice(1);
  return {
    params: r.reduce((u, { paramName: d, isOptional: f }, y) => {
      if (d === "*") {
        let x = l[y] || "";
        i = o.slice(0, o.length - x.length).replace(/(.)\/+$/, "$1");
      }
      const g = l[y];
      return (
        f && !g ? (u[d] = void 0) : (u[d] = (g || "").replace(/%2F/g, "/")), u
      );
    }, {}),
    pathname: o,
    pathnameBase: i,
    pattern: e,
  };
}
function Vv(e, t = !1, n = !0) {
  An(
    e === "*" || !e.endsWith("*") || e.endsWith("/*"),
    `Route path "${e}" will be treated as if it were "${e.replace(
      /\*$/,
      "/*"
    )}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(
      /\*$/,
      "/*"
    )}".`
  );
  let r = [],
    s =
      "^" +
      e
        .replace(/\/*\*?$/, "")
        .replace(/^\/*/, "/")
        .replace(/[\\.*+^${}|()[\]]/g, "\\$&")
        .replace(
          /\/:([\w-]+)(\?)?/g,
          (i, l, a) => (
            r.push({ paramName: l, isOptional: a != null }),
            a ? "/?([^\\/]+)?" : "/([^\\/]+)"
          )
        );
  return (
    e.endsWith("*")
      ? (r.push({ paramName: "*" }),
        (s += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$"))
      : n
      ? (s += "\\/*$")
      : e !== "" && e !== "/" && (s += "(?:(?=\\/|$))"),
    [new RegExp(s, t ? void 0 : "i"), r]
  );
}
function Wv(e) {
  try {
    return e
      .split("/")
      .map((t) => decodeURIComponent(t).replace(/\//g, "%2F"))
      .join("/");
  } catch (t) {
    return (
      An(
        !1,
        `The URL path "${e}" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent encoding (${t}).`
      ),
      e
    );
  }
}
function Tn(e, t) {
  if (t === "/") return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase())) return null;
  let n = t.endsWith("/") ? t.length - 1 : t.length,
    r = e.charAt(n);
  return r && r !== "/" ? null : e.slice(n) || "/";
}
function Kv(e, t = "/") {
  let {
    pathname: n,
    search: r = "",
    hash: s = "",
  } = typeof e == "string" ? Xr(e) : e;
  return {
    pathname: n ? (n.startsWith("/") ? n : Yv(n, t)) : t,
    search: Jv(r),
    hash: Zv(s),
  };
}
function Yv(e, t) {
  let n = t.replace(/\/+$/, "").split("/");
  return (
    e.split("/").forEach((s) => {
      s === ".." ? n.length > 1 && n.pop() : s !== "." && n.push(s);
    }),
    n.length > 1 ? n.join("/") : "/"
  );
}
function ra(e, t, n, r) {
  return `Cannot include a '${e}' character in a manually specified \`to.${t}\` field [${JSON.stringify(
    r
  )}].  Please separate it out to the \`to.${n}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`;
}
function Gv(e) {
  return e.filter(
    (t, n) => n === 0 || (t.route.path && t.route.path.length > 0)
  );
}
function xm(e) {
  let t = Gv(e);
  return t.map((n, r) => (r === t.length - 1 ? n.pathname : n.pathnameBase));
}
function wm(e, t, n, r = !1) {
  let s;
  typeof e == "string"
    ? (s = Xr(e))
    : ((s = { ...e }),
      ce(
        !s.pathname || !s.pathname.includes("?"),
        ra("?", "pathname", "search", s)
      ),
      ce(
        !s.pathname || !s.pathname.includes("#"),
        ra("#", "pathname", "hash", s)
      ),
      ce(!s.search || !s.search.includes("#"), ra("#", "search", "hash", s)));
  let o = e === "" || s.pathname === "",
    i = o ? "/" : s.pathname,
    l;
  if (i == null) l = n;
  else {
    let f = t.length - 1;
    if (!r && i.startsWith("..")) {
      let y = i.split("/");
      for (; y[0] === ".."; ) y.shift(), (f -= 1);
      s.pathname = y.join("/");
    }
    l = f >= 0 ? t[f] : "/";
  }
  let a = Kv(s, l),
    u = i && i !== "/" && i.endsWith("/"),
    d = (o || i === ".") && n.endsWith("/");
  return !a.pathname.endsWith("/") && (u || d) && (a.pathname += "/"), a;
}
var Jt = (e) => e.join("/").replace(/\/\/+/g, "/"),
  Xv = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"),
  Jv = (e) => (!e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e),
  Zv = (e) => (!e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e);
function ex(e) {
  return (
    e != null &&
    typeof e.status == "number" &&
    typeof e.statusText == "string" &&
    typeof e.internal == "boolean" &&
    "data" in e
  );
}
var bm = ["POST", "PUT", "PATCH", "DELETE"];
new Set(bm);
var tx = ["GET", ...bm];
new Set(tx);
var Jr = v.createContext(null);
Jr.displayName = "DataRouter";
var pl = v.createContext(null);
pl.displayName = "DataRouterState";
var Em = v.createContext({ isTransitioning: !1 });
Em.displayName = "ViewTransition";
var nx = v.createContext(new Map());
nx.displayName = "Fetchers";
var rx = v.createContext(null);
rx.displayName = "Await";
var Ut = v.createContext(null);
Ut.displayName = "Navigation";
var yo = v.createContext(null);
yo.displayName = "Location";
var Tt = v.createContext({ outlet: null, matches: [], isDataRoute: !1 });
Tt.displayName = "Route";
var Sc = v.createContext(null);
Sc.displayName = "RouteError";
function sx(e, { relative: t } = {}) {
  ce(
    go(),
    "useHref() may be used only in the context of a <Router> component."
  );
  let { basename: n, navigator: r } = v.useContext(Ut),
    { hash: s, pathname: o, search: i } = vo(e, { relative: t }),
    l = o;
  return (
    n !== "/" && (l = o === "/" ? n : Jt([n, o])),
    r.createHref({ pathname: l, search: i, hash: s })
  );
}
function go() {
  return v.useContext(yo) != null;
}
function Bt() {
  return (
    ce(
      go(),
      "useLocation() may be used only in the context of a <Router> component."
    ),
    v.useContext(yo).location
  );
}
var Sm =
  "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function Cm(e) {
  v.useContext(Ut).static || v.useLayoutEffect(e);
}
function Ae() {
  let { isDataRoute: e } = v.useContext(Tt);
  return e ? wx() : ox();
}
function ox() {
  ce(
    go(),
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let e = v.useContext(Jr),
    { basename: t, navigator: n } = v.useContext(Ut),
    { matches: r } = v.useContext(Tt),
    { pathname: s } = Bt(),
    o = JSON.stringify(xm(r)),
    i = v.useRef(!1);
  return (
    Cm(() => {
      i.current = !0;
    }),
    v.useCallback(
      (a, u = {}) => {
        if ((An(i.current, Sm), !i.current)) return;
        if (typeof a == "number") {
          n.go(a);
          return;
        }
        let d = wm(a, JSON.parse(o), s, u.relative === "path");
        e == null &&
          t !== "/" &&
          (d.pathname = d.pathname === "/" ? t : Jt([t, d.pathname])),
          (u.replace ? n.replace : n.push)(d, u.state, u);
      },
      [t, n, o, s, e]
    )
  );
}
var ix = v.createContext(null);
function lx(e) {
  let t = v.useContext(Tt).outlet;
  return t && v.createElement(ix.Provider, { value: e }, t);
}
function ax() {
  let { matches: e } = v.useContext(Tt),
    t = e[e.length - 1];
  return t ? t.params : {};
}
function vo(e, { relative: t } = {}) {
  let { matches: n } = v.useContext(Tt),
    { pathname: r } = Bt(),
    s = JSON.stringify(xm(n));
  return v.useMemo(() => wm(e, JSON.parse(s), r, t === "path"), [e, s, r, t]);
}
function ux(e, t) {
  return _m(e, t);
}
function _m(e, t, n, r) {
  var b;
  ce(
    go(),
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let { navigator: s } = v.useContext(Ut),
    { matches: o } = v.useContext(Tt),
    i = o[o.length - 1],
    l = i ? i.params : {};
  i && i.pathname;
  let a = i ? i.pathnameBase : "/";
  i && i.route;
  let u = Bt(),
    d;
  if (t) {
    let w = typeof t == "string" ? Xr(t) : t;
    ce(
      a === "/" || ((b = w.pathname) == null ? void 0 : b.startsWith(a)),
      `When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${a}" but pathname "${w.pathname}" was given in the \`location\` prop.`
    ),
      (d = w);
  } else d = u;
  let f = d.pathname || "/",
    y = f;
  if (a !== "/") {
    let w = a.replace(/^\//, "").split("/");
    y = "/" + f.replace(/^\//, "").split("/").slice(w.length).join("/");
  }
  let g = ym(e, { pathname: y }),
    x = px(
      g &&
        g.map((w) =>
          Object.assign({}, w, {
            params: Object.assign({}, l, w.params),
            pathname: Jt([
              a,
              s.encodeLocation
                ? s.encodeLocation(w.pathname).pathname
                : w.pathname,
            ]),
            pathnameBase:
              w.pathnameBase === "/"
                ? a
                : Jt([
                    a,
                    s.encodeLocation
                      ? s.encodeLocation(w.pathnameBase).pathname
                      : w.pathnameBase,
                  ]),
          })
        ),
      o,
      n,
      r
    );
  return t && x
    ? v.createElement(
        yo.Provider,
        {
          value: {
            location: {
              pathname: "/",
              search: "",
              hash: "",
              state: null,
              key: "default",
              ...d,
            },
            navigationType: "POP",
          },
        },
        x
      )
    : x;
}
function cx() {
  let e = xx(),
    t = ex(e)
      ? `${e.status} ${e.statusText}`
      : e instanceof Error
      ? e.message
      : JSON.stringify(e),
    n = e instanceof Error ? e.stack : null,
    s = { padding: "0.5rem", backgroundColor: "rgba(200,200,200, 0.5)" };
  return v.createElement(
    v.Fragment,
    null,
    v.createElement("h2", null, "Unexpected Application Error!"),
    v.createElement("h3", { style: { fontStyle: "italic" } }, t),
    n ? v.createElement("pre", { style: s }, n) : null,
    null
  );
}
var dx = v.createElement(cx, null),
  fx = class extends v.Component {
    constructor(e) {
      super(e),
        (this.state = {
          location: e.location,
          revalidation: e.revalidation,
          error: e.error,
        });
    }
    static getDerivedStateFromError(e) {
      return { error: e };
    }
    static getDerivedStateFromProps(e, t) {
      return t.location !== e.location ||
        (t.revalidation !== "idle" && e.revalidation === "idle")
        ? { error: e.error, location: e.location, revalidation: e.revalidation }
        : {
            error: e.error !== void 0 ? e.error : t.error,
            location: t.location,
            revalidation: e.revalidation || t.revalidation,
          };
    }
    componentDidCatch(e, t) {
      console.error(
        "React Router caught the following error during render",
        e,
        t
      );
    }
    render() {
      return this.state.error !== void 0
        ? v.createElement(
            Tt.Provider,
            { value: this.props.routeContext },
            v.createElement(Sc.Provider, {
              value: this.state.error,
              children: this.props.component,
            })
          )
        : this.props.children;
    }
  };
function hx({ routeContext: e, match: t, children: n }) {
  let r = v.useContext(Jr);
  return (
    r &&
      r.static &&
      r.staticContext &&
      (t.route.errorElement || t.route.ErrorBoundary) &&
      (r.staticContext._deepestRenderedBoundaryId = t.route.id),
    v.createElement(Tt.Provider, { value: e }, n)
  );
}
function px(e, t = [], n = null, r = null) {
  if (e == null) {
    if (!n) return null;
    if (n.errors) e = n.matches;
    else if (t.length === 0 && !n.initialized && n.matches.length > 0)
      e = n.matches;
    else return null;
  }
  let s = e,
    o = n == null ? void 0 : n.errors;
  if (o != null) {
    let a = s.findIndex(
      (u) => u.route.id && (o == null ? void 0 : o[u.route.id]) !== void 0
    );
    ce(
      a >= 0,
      `Could not find a matching route for errors on route IDs: ${Object.keys(
        o
      ).join(",")}`
    ),
      (s = s.slice(0, Math.min(s.length, a + 1)));
  }
  let i = !1,
    l = -1;
  if (n)
    for (let a = 0; a < s.length; a++) {
      let u = s[a];
      if (
        ((u.route.HydrateFallback || u.route.hydrateFallbackElement) && (l = a),
        u.route.id)
      ) {
        let { loaderData: d, errors: f } = n,
          y =
            u.route.loader &&
            !d.hasOwnProperty(u.route.id) &&
            (!f || f[u.route.id] === void 0);
        if (u.route.lazy || y) {
          (i = !0), l >= 0 ? (s = s.slice(0, l + 1)) : (s = [s[0]]);
          break;
        }
      }
    }
  return s.reduceRight((a, u, d) => {
    let f,
      y = !1,
      g = null,
      x = null;
    n &&
      ((f = o && u.route.id ? o[u.route.id] : void 0),
      (g = u.route.errorElement || dx),
      i &&
        (l < 0 && d === 0
          ? (bx(
              "route-fallback",
              !1,
              "No `HydrateFallback` element provided to render during initial hydration"
            ),
            (y = !0),
            (x = null))
          : l === d &&
            ((y = !0), (x = u.route.hydrateFallbackElement || null))));
    let b = t.concat(s.slice(0, d + 1)),
      w = () => {
        let m;
        return (
          f
            ? (m = g)
            : y
            ? (m = x)
            : u.route.Component
            ? (m = v.createElement(u.route.Component, null))
            : u.route.element
            ? (m = u.route.element)
            : (m = a),
          v.createElement(hx, {
            match: u,
            routeContext: { outlet: a, matches: b, isDataRoute: n != null },
            children: m,
          })
        );
      };
    return n && (u.route.ErrorBoundary || u.route.errorElement || d === 0)
      ? v.createElement(fx, {
          location: n.location,
          revalidation: n.revalidation,
          component: g,
          error: f,
          children: w(),
          routeContext: { outlet: null, matches: b, isDataRoute: !0 },
        })
      : w();
  }, null);
}
function Cc(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function mx(e) {
  let t = v.useContext(Jr);
  return ce(t, Cc(e)), t;
}
function yx(e) {
  let t = v.useContext(pl);
  return ce(t, Cc(e)), t;
}
function gx(e) {
  let t = v.useContext(Tt);
  return ce(t, Cc(e)), t;
}
function _c(e) {
  let t = gx(e),
    n = t.matches[t.matches.length - 1];
  return (
    ce(
      n.route.id,
      `${e} can only be used on routes that contain a unique "id"`
    ),
    n.route.id
  );
}
function vx() {
  return _c("useRouteId");
}
function xx() {
  var r;
  let e = v.useContext(Sc),
    t = yx("useRouteError"),
    n = _c("useRouteError");
  return e !== void 0 ? e : (r = t.errors) == null ? void 0 : r[n];
}
function wx() {
  let { router: e } = mx("useNavigate"),
    t = _c("useNavigate"),
    n = v.useRef(!1);
  return (
    Cm(() => {
      n.current = !0;
    }),
    v.useCallback(
      async (s, o = {}) => {
        An(n.current, Sm),
          n.current &&
            (typeof s == "number"
              ? e.navigate(s)
              : await e.navigate(s, { fromRouteId: t, ...o }));
      },
      [e, t]
    )
  );
}
var uf = {};
function bx(e, t, n) {
  uf[e] || ((uf[e] = !0), An(!1, n));
}
v.memo(Ex);
function Ex({ routes: e, future: t, state: n }) {
  return _m(e, void 0, n, t);
}
function Nc(e) {
  return lx(e.context);
}
function le(e) {
  ce(
    !1,
    "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>."
  );
}
function Sx({
  basename: e = "/",
  children: t = null,
  location: n,
  navigationType: r = "POP",
  navigator: s,
  static: o = !1,
}) {
  ce(
    !go(),
    "You cannot render a <Router> inside another <Router>. You should never have more than one in your app."
  );
  let i = e.replace(/^\/*/, "/"),
    l = v.useMemo(
      () => ({ basename: i, navigator: s, static: o, future: {} }),
      [i, s, o]
    );
  typeof n == "string" && (n = Xr(n));
  let {
      pathname: a = "/",
      search: u = "",
      hash: d = "",
      state: f = null,
      key: y = "default",
    } = n,
    g = v.useMemo(() => {
      let x = Tn(a, i);
      return x == null
        ? null
        : {
            location: { pathname: x, search: u, hash: d, state: f, key: y },
            navigationType: r,
          };
    }, [i, a, u, d, f, y, r]);
  return (
    An(
      g != null,
      `<Router basename="${i}"> is not able to match the URL "${a}${u}${d}" because it does not start with the basename, so the <Router> won't render anything.`
    ),
    g == null
      ? null
      : v.createElement(
          Ut.Provider,
          { value: l },
          v.createElement(yo.Provider, { children: t, value: g })
        )
  );
}
function Cx({ children: e, location: t }) {
  return ux(lu(e), t);
}
function lu(e, t = []) {
  let n = [];
  return (
    v.Children.forEach(e, (r, s) => {
      if (!v.isValidElement(r)) return;
      let o = [...t, s];
      if (r.type === v.Fragment) {
        n.push.apply(n, lu(r.props.children, o));
        return;
      }
      ce(
        r.type === le,
        `[${
          typeof r.type == "string" ? r.type : r.type.name
        }] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`
      ),
        ce(
          !r.props.index || !r.props.children,
          "An index route cannot have child routes."
        );
      let i = {
        id: r.props.id || o.join("-"),
        caseSensitive: r.props.caseSensitive,
        element: r.props.element,
        Component: r.props.Component,
        index: r.props.index,
        path: r.props.path,
        loader: r.props.loader,
        action: r.props.action,
        hydrateFallbackElement: r.props.hydrateFallbackElement,
        HydrateFallback: r.props.HydrateFallback,
        errorElement: r.props.errorElement,
        ErrorBoundary: r.props.ErrorBoundary,
        hasErrorBoundary:
          r.props.hasErrorBoundary === !0 ||
          r.props.ErrorBoundary != null ||
          r.props.errorElement != null,
        shouldRevalidate: r.props.shouldRevalidate,
        handle: r.props.handle,
        lazy: r.props.lazy,
      };
      r.props.children && (i.children = lu(r.props.children, o)), n.push(i);
    }),
    n
  );
}
var ci = "get",
  di = "application/x-www-form-urlencoded";
function ml(e) {
  return e != null && typeof e.tagName == "string";
}
function _x(e) {
  return ml(e) && e.tagName.toLowerCase() === "button";
}
function Nx(e) {
  return ml(e) && e.tagName.toLowerCase() === "form";
}
function jx(e) {
  return ml(e) && e.tagName.toLowerCase() === "input";
}
function kx(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function Tx(e, t) {
  return e.button === 0 && (!t || t === "_self") && !kx(e);
}
var Ko = null;
function Rx() {
  if (Ko === null)
    try {
      new FormData(document.createElement("form"), 0), (Ko = !1);
    } catch {
      Ko = !0;
    }
  return Ko;
}
var Ox = new Set([
  "application/x-www-form-urlencoded",
  "multipart/form-data",
  "text/plain",
]);
function sa(e) {
  return e != null && !Ox.has(e)
    ? (An(
        !1,
        `"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${di}"`
      ),
      null)
    : e;
}
function Px(e, t) {
  let n, r, s, o, i;
  if (Nx(e)) {
    let l = e.getAttribute("action");
    (r = l ? Tn(l, t) : null),
      (n = e.getAttribute("method") || ci),
      (s = sa(e.getAttribute("enctype")) || di),
      (o = new FormData(e));
  } else if (_x(e) || (jx(e) && (e.type === "submit" || e.type === "image"))) {
    let l = e.form;
    if (l == null)
      throw new Error(
        'Cannot submit a <button> or <input type="submit"> without a <form>'
      );
    let a = e.getAttribute("formaction") || l.getAttribute("action");
    if (
      ((r = a ? Tn(a, t) : null),
      (n = e.getAttribute("formmethod") || l.getAttribute("method") || ci),
      (s =
        sa(e.getAttribute("formenctype")) ||
        sa(l.getAttribute("enctype")) ||
        di),
      (o = new FormData(l, e)),
      !Rx())
    ) {
      let { name: u, type: d, value: f } = e;
      if (d === "image") {
        let y = u ? `${u}.` : "";
        o.append(`${y}x`, "0"), o.append(`${y}y`, "0");
      } else u && o.append(u, f);
    }
  } else {
    if (ml(e))
      throw new Error(
        'Cannot submit element that is not <form>, <button>, or <input type="submit|image">'
      );
    (n = ci), (r = null), (s = di), (i = e);
  }
  return (
    o && s === "text/plain" && ((i = o), (o = void 0)),
    { action: r, method: n.toLowerCase(), encType: s, formData: o, body: i }
  );
}
function jc(e, t) {
  if (e === !1 || e === null || typeof e > "u") throw new Error(t);
}
async function Lx(e, t) {
  if (e.id in t) return t[e.id];
  try {
    let n = await import(e.module);
    return (t[e.id] = n), n;
  } catch (n) {
    return (
      console.error(
        `Error loading route module \`${e.module}\`, reloading page...`
      ),
      console.error(n),
      window.__reactRouterContext && window.__reactRouterContext.isSpaMode,
      window.location.reload(),
      new Promise(() => {})
    );
  }
}
function Ax(e) {
  return e == null
    ? !1
    : e.href == null
    ? e.rel === "preload" &&
      typeof e.imageSrcSet == "string" &&
      typeof e.imageSizes == "string"
    : typeof e.rel == "string" && typeof e.href == "string";
}
async function Ix(e, t, n) {
  let r = await Promise.all(
    e.map(async (s) => {
      let o = t.routes[s.route.id];
      if (o) {
        let i = await Lx(o, n);
        return i.links ? i.links() : [];
      }
      return [];
    })
  );
  return zx(
    r
      .flat(1)
      .filter(Ax)
      .filter((s) => s.rel === "stylesheet" || s.rel === "preload")
      .map((s) =>
        s.rel === "stylesheet"
          ? { ...s, rel: "prefetch", as: "style" }
          : { ...s, rel: "prefetch" }
      )
  );
}
function cf(e, t, n, r, s, o) {
  let i = (a, u) => (n[u] ? a.route.id !== n[u].route.id : !0),
    l = (a, u) => {
      var d;
      return (
        n[u].pathname !== a.pathname ||
        (((d = n[u].route.path) == null ? void 0 : d.endsWith("*")) &&
          n[u].params["*"] !== a.params["*"])
      );
    };
  return o === "assets"
    ? t.filter((a, u) => i(a, u) || l(a, u))
    : o === "data"
    ? t.filter((a, u) => {
        var f;
        let d = r.routes[a.route.id];
        if (!d || !d.hasLoader) return !1;
        if (i(a, u) || l(a, u)) return !0;
        if (a.route.shouldRevalidate) {
          let y = a.route.shouldRevalidate({
            currentUrl: new URL(s.pathname + s.search + s.hash, window.origin),
            currentParams: ((f = n[0]) == null ? void 0 : f.params) || {},
            nextUrl: new URL(e, window.origin),
            nextParams: a.params,
            defaultShouldRevalidate: !0,
          });
          if (typeof y == "boolean") return y;
        }
        return !0;
      })
    : [];
}
function Fx(e, t) {
  return Dx(
    e
      .map((n) => {
        let r = t.routes[n.route.id];
        if (!r) return [];
        let s = [r.module];
        return r.imports && (s = s.concat(r.imports)), s;
      })
      .flat(1)
  );
}
function Dx(e) {
  return [...new Set(e)];
}
function Mx(e) {
  let t = {},
    n = Object.keys(e).sort();
  for (let r of n) t[r] = e[r];
  return t;
}
function zx(e, t) {
  let n = new Set();
  return (
    new Set(t),
    e.reduce((r, s) => {
      let o = JSON.stringify(Mx(s));
      return n.has(o) || (n.add(o), r.push({ key: o, link: s })), r;
    }, [])
  );
}
function $x(e) {
  let t =
    typeof e == "string"
      ? new URL(
          e,
          typeof window > "u" ? "server://singlefetch/" : window.location.origin
        )
      : e;
  return (
    t.pathname === "/"
      ? (t.pathname = "_root.data")
      : (t.pathname = `${t.pathname.replace(/\/$/, "")}.data`),
    t
  );
}
function Ux() {
  let e = v.useContext(Jr);
  return (
    jc(
      e,
      "You must render this element inside a <DataRouterContext.Provider> element"
    ),
    e
  );
}
function Bx() {
  let e = v.useContext(pl);
  return (
    jc(
      e,
      "You must render this element inside a <DataRouterStateContext.Provider> element"
    ),
    e
  );
}
var kc = v.createContext(void 0);
kc.displayName = "FrameworkContext";
function Nm() {
  let e = v.useContext(kc);
  return (
    jc(e, "You must render this element inside a <HydratedRouter> element"), e
  );
}
function Hx(e, t) {
  let n = v.useContext(kc),
    [r, s] = v.useState(!1),
    [o, i] = v.useState(!1),
    {
      onFocus: l,
      onBlur: a,
      onMouseEnter: u,
      onMouseLeave: d,
      onTouchStart: f,
    } = t,
    y = v.useRef(null);
  v.useEffect(() => {
    if ((e === "render" && i(!0), e === "viewport")) {
      let b = (m) => {
          m.forEach((h) => {
            i(h.isIntersecting);
          });
        },
        w = new IntersectionObserver(b, { threshold: 0.5 });
      return (
        y.current && w.observe(y.current),
        () => {
          w.disconnect();
        }
      );
    }
  }, [e]),
    v.useEffect(() => {
      if (r) {
        let b = setTimeout(() => {
          i(!0);
        }, 100);
        return () => {
          clearTimeout(b);
        };
      }
    }, [r]);
  let g = () => {
      s(!0);
    },
    x = () => {
      s(!1), i(!1);
    };
  return n
    ? e !== "intent"
      ? [o, y, {}]
      : [
          o,
          y,
          {
            onFocus: Cs(l, g),
            onBlur: Cs(a, x),
            onMouseEnter: Cs(u, g),
            onMouseLeave: Cs(d, x),
            onTouchStart: Cs(f, g),
          },
        ]
    : [!1, y, {}];
}
function Cs(e, t) {
  return (n) => {
    e && e(n), n.defaultPrevented || t(n);
  };
}
function Qx({ page: e, ...t }) {
  let { router: n } = Ux(),
    r = v.useMemo(() => ym(n.routes, e, n.basename), [n.routes, e, n.basename]);
  return r
    ? v.createElement(Vx, { page: e, matches: r, ...t })
    : (console.warn(`Tried to prefetch ${e} but no routes matched.`), null);
}
function qx(e) {
  let { manifest: t, routeModules: n } = Nm(),
    [r, s] = v.useState([]);
  return (
    v.useEffect(() => {
      let o = !1;
      return (
        Ix(e, t, n).then((i) => {
          o || s(i);
        }),
        () => {
          o = !0;
        }
      );
    }, [e, t, n]),
    r
  );
}
function Vx({ page: e, matches: t, ...n }) {
  let r = Bt(),
    { manifest: s, routeModules: o } = Nm(),
    { loaderData: i, matches: l } = Bx(),
    a = v.useMemo(() => cf(e, t, l, s, r, "data"), [e, t, l, s, r]),
    u = v.useMemo(() => cf(e, t, l, s, r, "assets"), [e, t, l, s, r]),
    d = v.useMemo(() => {
      if (e === r.pathname + r.search + r.hash) return [];
      let g = new Set(),
        x = !1;
      if (
        (t.forEach((w) => {
          var h;
          let m = s.routes[w.route.id];
          !m ||
            !m.hasLoader ||
            ((!a.some((p) => p.route.id === w.route.id) &&
              w.route.id in i &&
              (h = o[w.route.id]) != null &&
              h.shouldRevalidate) ||
            m.hasClientLoader
              ? (x = !0)
              : g.add(w.route.id));
        }),
        g.size === 0)
      )
        return [];
      let b = $x(e);
      return (
        x &&
          g.size > 0 &&
          b.searchParams.set(
            "_routes",
            t
              .filter((w) => g.has(w.route.id))
              .map((w) => w.route.id)
              .join(",")
          ),
        [b.pathname + b.search]
      );
    }, [i, r, s, a, t, e, o]),
    f = v.useMemo(() => Fx(u, s), [u, s]),
    y = qx(u);
  return v.createElement(
    v.Fragment,
    null,
    d.map((g) =>
      v.createElement("link", {
        key: g,
        rel: "prefetch",
        as: "fetch",
        href: g,
        ...n,
      })
    ),
    f.map((g) =>
      v.createElement("link", { key: g, rel: "modulepreload", href: g, ...n })
    ),
    y.map(({ key: g, link: x }) => v.createElement("link", { key: g, ...x }))
  );
}
function Wx(...e) {
  return (t) => {
    e.forEach((n) => {
      typeof n == "function" ? n(t) : n != null && (n.current = t);
    });
  };
}
var jm =
  typeof window < "u" &&
  typeof window.document < "u" &&
  typeof window.document.createElement < "u";
try {
  jm && (window.__reactRouterVersion = "7.0.1");
} catch {}
function Kx({ basename: e, children: t, window: n }) {
  let r = v.useRef();
  r.current == null && (r.current = Pv({ window: n, v5Compat: !0 }));
  let s = r.current,
    [o, i] = v.useState({ action: s.action, location: s.location }),
    l = v.useCallback(
      (a) => {
        v.startTransition(() => i(a));
      },
      [i]
    );
  return (
    v.useLayoutEffect(() => s.listen(l), [s, l]),
    v.createElement(Sx, {
      basename: e,
      children: t,
      location: o.location,
      navigationType: o.action,
      navigator: s,
    })
  );
}
var km = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,
  Me = v.forwardRef(function (
    {
      onClick: t,
      discover: n = "render",
      prefetch: r = "none",
      relative: s,
      reloadDocument: o,
      replace: i,
      state: l,
      target: a,
      to: u,
      preventScrollReset: d,
      viewTransition: f,
      ...y
    },
    g
  ) {
    let { basename: x } = v.useContext(Ut),
      b = typeof u == "string" && km.test(u),
      w,
      m = !1;
    if (typeof u == "string" && b && ((w = u), jm))
      try {
        let R = new URL(window.location.href),
          P = u.startsWith("//") ? new URL(R.protocol + u) : new URL(u),
          O = Tn(P.pathname, x);
        P.origin === R.origin && O != null
          ? (u = O + P.search + P.hash)
          : (m = !0);
      } catch {
        An(
          !1,
          `<Link to="${u}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`
        );
      }
    let h = sx(u, { relative: s }),
      [p, E, _] = Hx(r, y),
      C = Jx(u, {
        replace: i,
        state: l,
        target: a,
        preventScrollReset: d,
        relative: s,
        viewTransition: f,
      });
    function S(R) {
      t && t(R), R.defaultPrevented || C(R);
    }
    let N = v.createElement("a", {
      ...y,
      ..._,
      href: w || h,
      onClick: m || o ? t : S,
      ref: Wx(g, E),
      target: a,
      "data-discover": !b && n === "render" ? "true" : void 0,
    });
    return p && !b
      ? v.createElement(v.Fragment, null, N, v.createElement(Qx, { page: h }))
      : N;
  });
Me.displayName = "Link";
var Yx = v.forwardRef(function (
  {
    "aria-current": t = "page",
    caseSensitive: n = !1,
    className: r = "",
    end: s = !1,
    style: o,
    to: i,
    viewTransition: l,
    children: a,
    ...u
  },
  d
) {
  let f = vo(i, { relative: u.relative }),
    y = Bt(),
    g = v.useContext(pl),
    { navigator: x, basename: b } = v.useContext(Ut),
    w = g != null && r1(f) && l === !0,
    m = x.encodeLocation ? x.encodeLocation(f).pathname : f.pathname,
    h = y.pathname,
    p =
      g && g.navigation && g.navigation.location
        ? g.navigation.location.pathname
        : null;
  n ||
    ((h = h.toLowerCase()),
    (p = p ? p.toLowerCase() : null),
    (m = m.toLowerCase())),
    p && b && (p = Tn(p, b) || p);
  const E = m !== "/" && m.endsWith("/") ? m.length - 1 : m.length;
  let _ = h === m || (!s && h.startsWith(m) && h.charAt(E) === "/"),
    C =
      p != null &&
      (p === m || (!s && p.startsWith(m) && p.charAt(m.length) === "/")),
    S = { isActive: _, isPending: C, isTransitioning: w },
    N = _ ? t : void 0,
    R;
  typeof r == "function"
    ? (R = r(S))
    : (R = [
        r,
        _ ? "active" : null,
        C ? "pending" : null,
        w ? "transitioning" : null,
      ]
        .filter(Boolean)
        .join(" "));
  let P = typeof o == "function" ? o(S) : o;
  return v.createElement(
    Me,
    {
      ...u,
      "aria-current": N,
      className: R,
      ref: d,
      style: P,
      to: i,
      viewTransition: l,
    },
    typeof a == "function" ? a(S) : a
  );
});
Yx.displayName = "NavLink";
var Gx = v.forwardRef(
  (
    {
      discover: e = "render",
      fetcherKey: t,
      navigate: n,
      reloadDocument: r,
      replace: s,
      state: o,
      method: i = ci,
      action: l,
      onSubmit: a,
      relative: u,
      preventScrollReset: d,
      viewTransition: f,
      ...y
    },
    g
  ) => {
    let x = t1(),
      b = n1(l, { relative: u }),
      w = i.toLowerCase() === "get" ? "get" : "post",
      m = typeof l == "string" && km.test(l),
      h = (p) => {
        if ((a && a(p), p.defaultPrevented)) return;
        p.preventDefault();
        let E = p.nativeEvent.submitter,
          _ = (E == null ? void 0 : E.getAttribute("formmethod")) || i;
        x(E || p.currentTarget, {
          fetcherKey: t,
          method: _,
          navigate: n,
          replace: s,
          state: o,
          relative: u,
          preventScrollReset: d,
          viewTransition: f,
        });
      };
    return v.createElement("form", {
      ref: g,
      method: w,
      action: b,
      onSubmit: r ? a : h,
      ...y,
      "data-discover": !m && e === "render" ? "true" : void 0,
    });
  }
);
Gx.displayName = "Form";
function Xx(e) {
  return `${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`;
}
function Tm(e) {
  let t = v.useContext(Jr);
  return ce(t, Xx(e)), t;
}
function Jx(
  e,
  {
    target: t,
    replace: n,
    state: r,
    preventScrollReset: s,
    relative: o,
    viewTransition: i,
  } = {}
) {
  let l = Ae(),
    a = Bt(),
    u = vo(e, { relative: o });
  return v.useCallback(
    (d) => {
      if (Tx(d, t)) {
        d.preventDefault();
        let f = n !== void 0 ? n : ro(a) === ro(u);
        l(e, {
          replace: f,
          state: r,
          preventScrollReset: s,
          relative: o,
          viewTransition: i,
        });
      }
    },
    [a, l, u, n, r, t, e, s, o, i]
  );
}
var Zx = 0,
  e1 = () => `__${String(++Zx)}__`;
function t1() {
  let { router: e } = Tm("useSubmit"),
    { basename: t } = v.useContext(Ut),
    n = vx();
  return v.useCallback(
    async (r, s = {}) => {
      let { action: o, method: i, encType: l, formData: a, body: u } = Px(r, t);
      if (s.navigate === !1) {
        let d = s.fetcherKey || e1();
        await e.fetch(d, n, s.action || o, {
          preventScrollReset: s.preventScrollReset,
          formData: a,
          body: u,
          formMethod: s.method || i,
          formEncType: s.encType || l,
          flushSync: s.flushSync,
        });
      } else
        await e.navigate(s.action || o, {
          preventScrollReset: s.preventScrollReset,
          formData: a,
          body: u,
          formMethod: s.method || i,
          formEncType: s.encType || l,
          replace: s.replace,
          state: s.state,
          fromRouteId: n,
          flushSync: s.flushSync,
          viewTransition: s.viewTransition,
        });
    },
    [e, t, n]
  );
}
function n1(e, { relative: t } = {}) {
  let { basename: n } = v.useContext(Ut),
    r = v.useContext(Tt);
  ce(r, "useFormAction must be used inside a RouteContext");
  let [s] = r.matches.slice(-1),
    o = { ...vo(e || ".", { relative: t }) },
    i = Bt();
  if (e == null) {
    o.search = i.search;
    let l = new URLSearchParams(o.search),
      a = l.getAll("index");
    if (a.some((d) => d === "")) {
      l.delete("index"),
        a.filter((f) => f).forEach((f) => l.append("index", f));
      let d = l.toString();
      o.search = d ? `?${d}` : "";
    }
  }
  return (
    (!e || e === ".") &&
      s.route.index &&
      (o.search = o.search ? o.search.replace(/^\?/, "?index&") : "?index"),
    n !== "/" && (o.pathname = o.pathname === "/" ? n : Jt([n, o.pathname])),
    ro(o)
  );
}
function r1(e, t = {}) {
  let n = v.useContext(Em);
  ce(
    n != null,
    "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?"
  );
  let { basename: r } = Tm("useViewTransitionState"),
    s = vo(e, { relative: t.relative });
  if (!n.isTransitioning) return !1;
  let o = Tn(n.currentLocation.pathname, r) || n.currentLocation.pathname,
    i = Tn(n.nextLocation.pathname, r) || n.nextLocation.pathname;
  return zi(s.pathname, i) != null || zi(s.pathname, o) != null;
}
new TextEncoder();
const s1 = () =>
    c.jsxs("div", {
      className: "min-h-screen flex flex-col bg-gray-100",
      children: [
        c.jsxs("div", {
          className:
            "flex flex-col md:flex-row items-center justify-between container mx-auto px-6 py-16",
          children: [
            c.jsxs("div", {
              className: "md:w-1/2 mb-8 md:mb-0",
              children: [
                c.jsx("h1", {
                  className: "text-4xl font-bold text-gray-800 mb-4",
                  children: "Welcome to EduPortal",
                }),
                c.jsx("p", {
                  className: "text-gray-600 text-lg mb-6",
                  children:
                    "Empowering students and teachers with seamless access to learning resources, exams, and notifications. Join us to enhance your learning and teaching experience.",
                }),
                c.jsxs("div", {
                  className: "space-x-4",
                  children: [
                    c.jsx(Me, {
                      to: "/login",
                      className:
                        "bg-blue-500 text-white px-6 py-3 rounded font-semibold hover:bg-blue-600 transition",
                      children: "Get Started",
                    }),
                    c.jsx(Me, {
                      to: "/about",
                      className:
                        "text-blue-500 font-semibold hover:text-blue-700 transition",
                      children: "Learn More",
                    }),
                  ],
                }),
              ],
            }),
            c.jsx("div", {
              className: "md:w-1/2",
              children: c.jsx("img", {
                src: "https://via.placeholder.com/600x400",
                alt: "Learning illustration",
                className: "rounded-lg shadow-lg",
              }),
            }),
          ],
        }),
        c.jsx("div", {
          className: "bg-white py-16",
          children: c.jsxs("div", {
            className: "container mx-auto px-6",
            children: [
              c.jsx("h2", {
                className: "text-3xl font-bold text-center text-gray-800 mb-8",
                children: "Why Choose EduPortal?",
              }),
              c.jsxs("div", {
                className: "grid grid-cols-1 md:grid-cols-3 gap-8",
                children: [
                  c.jsxs("div", {
                    className: "text-center",
                    children: [
                      c.jsx("div", {
                        className:
                          "bg-blue-500 text-white w-16 h-16 flex items-center justify-center mx-auto rounded-full mb-4",
                        children: "📚",
                      }),
                      c.jsx("h3", {
                        className: "text-xl font-bold text-gray-800 mb-2",
                        children: "Learning Resources",
                      }),
                      c.jsx("p", {
                        className: "text-gray-600",
                        children:
                          "Access curated materials and stay ahead in your learning journey.",
                      }),
                    ],
                  }),
                  c.jsxs("div", {
                    className: "text-center",
                    children: [
                      c.jsx("div", {
                        className:
                          "bg-green-500 text-white w-16 h-16 flex items-center justify-center mx-auto rounded-full mb-4",
                        children: "🧑‍🏫",
                      }),
                      c.jsx("h3", {
                        className: "text-xl font-bold text-gray-800 mb-2",
                        children: "Teacher Support",
                      }),
                      c.jsx("p", {
                        className: "text-gray-600",
                        children:
                          "Tools for teachers to manage exams, notifications, and student progress.",
                      }),
                    ],
                  }),
                  c.jsxs("div", {
                    className: "text-center",
                    children: [
                      c.jsx("div", {
                        className:
                          "bg-yellow-500 text-white w-16 h-16 flex items-center justify-center mx-auto rounded-full mb-4",
                        children: "📢",
                      }),
                      c.jsx("h3", {
                        className: "text-xl font-bold text-gray-800 mb-2",
                        children: "Exam Notifications",
                      }),
                      c.jsx("p", {
                        className: "text-gray-600",
                        children:
                          "Stay informed with timely exam updates and announcements.",
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
        }),
        c.jsx("footer", {
          className: "bg-gray-800 text-white py-6",
          children: c.jsx("div", {
            className: "container mx-auto px-6 text-center",
            children: c.jsxs("p", {
              className: "text-sm",
              children: [
                "© ",
                new Date().getFullYear(),
                " EduPortal. All rights reserved.",
              ],
            }),
          }),
        }),
      ],
    }),
  Rm = async (e) =>
    await fetch(
      `http://localhost:4000/api/auth/getUserVerificationStatus/${e}`,
      { method: "GET", headers: { "Content-Type": "application/json" } }
    );
function Om(e, t) {
  return function () {
    return e.apply(t, arguments);
  };
}
const { toString: o1 } = Object.prototype,
  { getPrototypeOf: Tc } = Object,
  yl = ((e) => (t) => {
    const n = o1.call(t);
    return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
  })(Object.create(null)),
  Rt = (e) => ((e = e.toLowerCase()), (t) => yl(t) === e),
  gl = (e) => (t) => typeof t === e,
  { isArray: Zr } = Array,
  so = gl("undefined");
function i1(e) {
  return (
    e !== null &&
    !so(e) &&
    e.constructor !== null &&
    !so(e.constructor) &&
    tt(e.constructor.isBuffer) &&
    e.constructor.isBuffer(e)
  );
}
const Pm = Rt("ArrayBuffer");
function l1(e) {
  let t;
  return (
    typeof ArrayBuffer < "u" && ArrayBuffer.isView
      ? (t = ArrayBuffer.isView(e))
      : (t = e && e.buffer && Pm(e.buffer)),
    t
  );
}
const a1 = gl("string"),
  tt = gl("function"),
  Lm = gl("number"),
  vl = (e) => e !== null && typeof e == "object",
  u1 = (e) => e === !0 || e === !1,
  fi = (e) => {
    if (yl(e) !== "object") return !1;
    const t = Tc(e);
    return (
      (t === null ||
        t === Object.prototype ||
        Object.getPrototypeOf(t) === null) &&
      !(Symbol.toStringTag in e) &&
      !(Symbol.iterator in e)
    );
  },
  c1 = Rt("Date"),
  d1 = Rt("File"),
  f1 = Rt("Blob"),
  h1 = Rt("FileList"),
  p1 = (e) => vl(e) && tt(e.pipe),
  m1 = (e) => {
    let t;
    return (
      e &&
      ((typeof FormData == "function" && e instanceof FormData) ||
        (tt(e.append) &&
          ((t = yl(e)) === "formdata" ||
            (t === "object" &&
              tt(e.toString) &&
              e.toString() === "[object FormData]"))))
    );
  },
  y1 = Rt("URLSearchParams"),
  [g1, v1, x1, w1] = ["ReadableStream", "Request", "Response", "Headers"].map(
    Rt
  ),
  b1 = (e) =>
    e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function xo(e, t, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > "u") return;
  let r, s;
  if ((typeof e != "object" && (e = [e]), Zr(e)))
    for (r = 0, s = e.length; r < s; r++) t.call(null, e[r], r, e);
  else {
    const o = n ? Object.getOwnPropertyNames(e) : Object.keys(e),
      i = o.length;
    let l;
    for (r = 0; r < i; r++) (l = o[r]), t.call(null, e[l], l, e);
  }
}
function Am(e, t) {
  t = t.toLowerCase();
  const n = Object.keys(e);
  let r = n.length,
    s;
  for (; r-- > 0; ) if (((s = n[r]), t === s.toLowerCase())) return s;
  return null;
}
const Qn =
    typeof globalThis < "u"
      ? globalThis
      : typeof self < "u"
      ? self
      : typeof window < "u"
      ? window
      : global,
  Im = (e) => !so(e) && e !== Qn;
function au() {
  const { caseless: e } = (Im(this) && this) || {},
    t = {},
    n = (r, s) => {
      const o = (e && Am(t, s)) || s;
      fi(t[o]) && fi(r)
        ? (t[o] = au(t[o], r))
        : fi(r)
        ? (t[o] = au({}, r))
        : Zr(r)
        ? (t[o] = r.slice())
        : (t[o] = r);
    };
  for (let r = 0, s = arguments.length; r < s; r++)
    arguments[r] && xo(arguments[r], n);
  return t;
}
const E1 = (e, t, n, { allOwnKeys: r } = {}) => (
    xo(
      t,
      (s, o) => {
        n && tt(s) ? (e[o] = Om(s, n)) : (e[o] = s);
      },
      { allOwnKeys: r }
    ),
    e
  ),
  S1 = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e),
  C1 = (e, t, n, r) => {
    (e.prototype = Object.create(t.prototype, r)),
      (e.prototype.constructor = e),
      Object.defineProperty(e, "super", { value: t.prototype }),
      n && Object.assign(e.prototype, n);
  },
  _1 = (e, t, n, r) => {
    let s, o, i;
    const l = {};
    if (((t = t || {}), e == null)) return t;
    do {
      for (s = Object.getOwnPropertyNames(e), o = s.length; o-- > 0; )
        (i = s[o]), (!r || r(i, e, t)) && !l[i] && ((t[i] = e[i]), (l[i] = !0));
      e = n !== !1 && Tc(e);
    } while (e && (!n || n(e, t)) && e !== Object.prototype);
    return t;
  },
  N1 = (e, t, n) => {
    (e = String(e)),
      (n === void 0 || n > e.length) && (n = e.length),
      (n -= t.length);
    const r = e.indexOf(t, n);
    return r !== -1 && r === n;
  },
  j1 = (e) => {
    if (!e) return null;
    if (Zr(e)) return e;
    let t = e.length;
    if (!Lm(t)) return null;
    const n = new Array(t);
    for (; t-- > 0; ) n[t] = e[t];
    return n;
  },
  k1 = (
    (e) => (t) =>
      e && t instanceof e
  )(typeof Uint8Array < "u" && Tc(Uint8Array)),
  T1 = (e, t) => {
    const r = (e && e[Symbol.iterator]).call(e);
    let s;
    for (; (s = r.next()) && !s.done; ) {
      const o = s.value;
      t.call(e, o[0], o[1]);
    }
  },
  R1 = (e, t) => {
    let n;
    const r = [];
    for (; (n = e.exec(t)) !== null; ) r.push(n);
    return r;
  },
  O1 = Rt("HTMLFormElement"),
  P1 = (e) =>
    e.toLowerCase().replace(/[-_\s]([a-z\d])(\w*)/g, function (n, r, s) {
      return r.toUpperCase() + s;
    }),
  df = (
    ({ hasOwnProperty: e }) =>
    (t, n) =>
      e.call(t, n)
  )(Object.prototype),
  L1 = Rt("RegExp"),
  Fm = (e, t) => {
    const n = Object.getOwnPropertyDescriptors(e),
      r = {};
    xo(n, (s, o) => {
      let i;
      (i = t(s, o, e)) !== !1 && (r[o] = i || s);
    }),
      Object.defineProperties(e, r);
  },
  A1 = (e) => {
    Fm(e, (t, n) => {
      if (tt(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
        return !1;
      const r = e[n];
      if (tt(r)) {
        if (((t.enumerable = !1), "writable" in t)) {
          t.writable = !1;
          return;
        }
        t.set ||
          (t.set = () => {
            throw Error("Can not rewrite read-only method '" + n + "'");
          });
      }
    });
  },
  I1 = (e, t) => {
    const n = {},
      r = (s) => {
        s.forEach((o) => {
          n[o] = !0;
        });
      };
    return Zr(e) ? r(e) : r(String(e).split(t)), n;
  },
  F1 = () => {},
  D1 = (e, t) => (e != null && Number.isFinite((e = +e)) ? e : t),
  oa = "abcdefghijklmnopqrstuvwxyz",
  ff = "0123456789",
  Dm = { DIGIT: ff, ALPHA: oa, ALPHA_DIGIT: oa + oa.toUpperCase() + ff },
  M1 = (e = 16, t = Dm.ALPHA_DIGIT) => {
    let n = "";
    const { length: r } = t;
    for (; e--; ) n += t[(Math.random() * r) | 0];
    return n;
  };
function z1(e) {
  return !!(
    e &&
    tt(e.append) &&
    e[Symbol.toStringTag] === "FormData" &&
    e[Symbol.iterator]
  );
}
const $1 = (e) => {
    const t = new Array(10),
      n = (r, s) => {
        if (vl(r)) {
          if (t.indexOf(r) >= 0) return;
          if (!("toJSON" in r)) {
            t[s] = r;
            const o = Zr(r) ? [] : {};
            return (
              xo(r, (i, l) => {
                const a = n(i, s + 1);
                !so(a) && (o[l] = a);
              }),
              (t[s] = void 0),
              o
            );
          }
        }
        return r;
      };
    return n(e, 0);
  },
  U1 = Rt("AsyncFunction"),
  B1 = (e) => e && (vl(e) || tt(e)) && tt(e.then) && tt(e.catch),
  Mm = ((e, t) =>
    e
      ? setImmediate
      : t
      ? ((n, r) => (
          Qn.addEventListener(
            "message",
            ({ source: s, data: o }) => {
              s === Qn && o === n && r.length && r.shift()();
            },
            !1
          ),
          (s) => {
            r.push(s), Qn.postMessage(n, "*");
          }
        ))(`axios@${Math.random()}`, [])
      : (n) => setTimeout(n))(
    typeof setImmediate == "function",
    tt(Qn.postMessage)
  ),
  H1 =
    typeof queueMicrotask < "u"
      ? queueMicrotask.bind(Qn)
      : (typeof process < "u" && process.nextTick) || Mm,
  j = {
    isArray: Zr,
    isArrayBuffer: Pm,
    isBuffer: i1,
    isFormData: m1,
    isArrayBufferView: l1,
    isString: a1,
    isNumber: Lm,
    isBoolean: u1,
    isObject: vl,
    isPlainObject: fi,
    isReadableStream: g1,
    isRequest: v1,
    isResponse: x1,
    isHeaders: w1,
    isUndefined: so,
    isDate: c1,
    isFile: d1,
    isBlob: f1,
    isRegExp: L1,
    isFunction: tt,
    isStream: p1,
    isURLSearchParams: y1,
    isTypedArray: k1,
    isFileList: h1,
    forEach: xo,
    merge: au,
    extend: E1,
    trim: b1,
    stripBOM: S1,
    inherits: C1,
    toFlatObject: _1,
    kindOf: yl,
    kindOfTest: Rt,
    endsWith: N1,
    toArray: j1,
    forEachEntry: T1,
    matchAll: R1,
    isHTMLForm: O1,
    hasOwnProperty: df,
    hasOwnProp: df,
    reduceDescriptors: Fm,
    freezeMethods: A1,
    toObjectSet: I1,
    toCamelCase: P1,
    noop: F1,
    toFiniteNumber: D1,
    findKey: Am,
    global: Qn,
    isContextDefined: Im,
    ALPHABET: Dm,
    generateString: M1,
    isSpecCompliantForm: z1,
    toJSONObject: $1,
    isAsyncFn: U1,
    isThenable: B1,
    setImmediate: Mm,
    asap: H1,
  };
function H(e, t, n, r, s) {
  Error.call(this),
    Error.captureStackTrace
      ? Error.captureStackTrace(this, this.constructor)
      : (this.stack = new Error().stack),
    (this.message = e),
    (this.name = "AxiosError"),
    t && (this.code = t),
    n && (this.config = n),
    r && (this.request = r),
    s && ((this.response = s), (this.status = s.status ? s.status : null));
}
j.inherits(H, Error, {
  toJSON: function () {
    return {
      message: this.message,
      name: this.name,
      description: this.description,
      number: this.number,
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      config: j.toJSONObject(this.config),
      code: this.code,
      status: this.status,
    };
  },
});
const zm = H.prototype,
  $m = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL",
].forEach((e) => {
  $m[e] = { value: e };
});
Object.defineProperties(H, $m);
Object.defineProperty(zm, "isAxiosError", { value: !0 });
H.from = (e, t, n, r, s, o) => {
  const i = Object.create(zm);
  return (
    j.toFlatObject(
      e,
      i,
      function (a) {
        return a !== Error.prototype;
      },
      (l) => l !== "isAxiosError"
    ),
    H.call(i, e.message, t, n, r, s),
    (i.cause = e),
    (i.name = e.name),
    o && Object.assign(i, o),
    i
  );
};
const Q1 = null;
function uu(e) {
  return j.isPlainObject(e) || j.isArray(e);
}
function Um(e) {
  return j.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function hf(e, t, n) {
  return e
    ? e
        .concat(t)
        .map(function (s, o) {
          return (s = Um(s)), !n && o ? "[" + s + "]" : s;
        })
        .join(n ? "." : "")
    : t;
}
function q1(e) {
  return j.isArray(e) && !e.some(uu);
}
const V1 = j.toFlatObject(j, {}, null, function (t) {
  return /^is[A-Z]/.test(t);
});
function xl(e, t, n) {
  if (!j.isObject(e)) throw new TypeError("target must be an object");
  (t = t || new FormData()),
    (n = j.toFlatObject(
      n,
      { metaTokens: !0, dots: !1, indexes: !1 },
      !1,
      function (b, w) {
        return !j.isUndefined(w[b]);
      }
    ));
  const r = n.metaTokens,
    s = n.visitor || d,
    o = n.dots,
    i = n.indexes,
    a = (n.Blob || (typeof Blob < "u" && Blob)) && j.isSpecCompliantForm(t);
  if (!j.isFunction(s)) throw new TypeError("visitor must be a function");
  function u(x) {
    if (x === null) return "";
    if (j.isDate(x)) return x.toISOString();
    if (!a && j.isBlob(x))
      throw new H("Blob is not supported. Use a Buffer instead.");
    return j.isArrayBuffer(x) || j.isTypedArray(x)
      ? a && typeof Blob == "function"
        ? new Blob([x])
        : Buffer.from(x)
      : x;
  }
  function d(x, b, w) {
    let m = x;
    if (x && !w && typeof x == "object") {
      if (j.endsWith(b, "{}"))
        (b = r ? b : b.slice(0, -2)), (x = JSON.stringify(x));
      else if (
        (j.isArray(x) && q1(x)) ||
        ((j.isFileList(x) || j.endsWith(b, "[]")) && (m = j.toArray(x)))
      )
        return (
          (b = Um(b)),
          m.forEach(function (p, E) {
            !(j.isUndefined(p) || p === null) &&
              t.append(
                i === !0 ? hf([b], E, o) : i === null ? b : b + "[]",
                u(p)
              );
          }),
          !1
        );
    }
    return uu(x) ? !0 : (t.append(hf(w, b, o), u(x)), !1);
  }
  const f = [],
    y = Object.assign(V1, {
      defaultVisitor: d,
      convertValue: u,
      isVisitable: uu,
    });
  function g(x, b) {
    if (!j.isUndefined(x)) {
      if (f.indexOf(x) !== -1)
        throw Error("Circular reference detected in " + b.join("."));
      f.push(x),
        j.forEach(x, function (m, h) {
          (!(j.isUndefined(m) || m === null) &&
            s.call(t, m, j.isString(h) ? h.trim() : h, b, y)) === !0 &&
            g(m, b ? b.concat(h) : [h]);
        }),
        f.pop();
    }
  }
  if (!j.isObject(e)) throw new TypeError("data must be an object");
  return g(e), t;
}
function pf(e) {
  const t = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0",
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function (r) {
    return t[r];
  });
}
function Rc(e, t) {
  (this._pairs = []), e && xl(e, this, t);
}
const Bm = Rc.prototype;
Bm.append = function (t, n) {
  this._pairs.push([t, n]);
};
Bm.toString = function (t) {
  const n = t
    ? function (r) {
        return t.call(this, r, pf);
      }
    : pf;
  return this._pairs
    .map(function (s) {
      return n(s[0]) + "=" + n(s[1]);
    }, "")
    .join("&");
};
function W1(e) {
  return encodeURIComponent(e)
    .replace(/%3A/gi, ":")
    .replace(/%24/g, "$")
    .replace(/%2C/gi, ",")
    .replace(/%20/g, "+")
    .replace(/%5B/gi, "[")
    .replace(/%5D/gi, "]");
}
function Hm(e, t, n) {
  if (!t) return e;
  const r = (n && n.encode) || W1,
    s = n && n.serialize;
  let o;
  if (
    (s
      ? (o = s(t, n))
      : (o = j.isURLSearchParams(t) ? t.toString() : new Rc(t, n).toString(r)),
    o)
  ) {
    const i = e.indexOf("#");
    i !== -1 && (e = e.slice(0, i)),
      (e += (e.indexOf("?") === -1 ? "?" : "&") + o);
  }
  return e;
}
class mf {
  constructor() {
    this.handlers = [];
  }
  use(t, n, r) {
    return (
      this.handlers.push({
        fulfilled: t,
        rejected: n,
        synchronous: r ? r.synchronous : !1,
        runWhen: r ? r.runWhen : null,
      }),
      this.handlers.length - 1
    );
  }
  eject(t) {
    this.handlers[t] && (this.handlers[t] = null);
  }
  clear() {
    this.handlers && (this.handlers = []);
  }
  forEach(t) {
    j.forEach(this.handlers, function (r) {
      r !== null && t(r);
    });
  }
}
const Qm = {
    silentJSONParsing: !0,
    forcedJSONParsing: !0,
    clarifyTimeoutError: !1,
  },
  K1 = typeof URLSearchParams < "u" ? URLSearchParams : Rc,
  Y1 = typeof FormData < "u" ? FormData : null,
  G1 = typeof Blob < "u" ? Blob : null,
  X1 = {
    isBrowser: !0,
    classes: { URLSearchParams: K1, FormData: Y1, Blob: G1 },
    protocols: ["http", "https", "file", "blob", "url", "data"],
  },
  Oc = typeof window < "u" && typeof document < "u",
  cu = (typeof navigator == "object" && navigator) || void 0,
  J1 =
    Oc &&
    (!cu || ["ReactNative", "NativeScript", "NS"].indexOf(cu.product) < 0),
  Z1 =
    typeof WorkerGlobalScope < "u" &&
    self instanceof WorkerGlobalScope &&
    typeof self.importScripts == "function",
  ew = (Oc && window.location.href) || "http://localhost",
  tw = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        hasBrowserEnv: Oc,
        hasStandardBrowserEnv: J1,
        hasStandardBrowserWebWorkerEnv: Z1,
        navigator: cu,
        origin: ew,
      },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  Ke = { ...tw, ...X1 };
function nw(e, t) {
  return xl(
    e,
    new Ke.classes.URLSearchParams(),
    Object.assign(
      {
        visitor: function (n, r, s, o) {
          return Ke.isNode && j.isBuffer(n)
            ? (this.append(r, n.toString("base64")), !1)
            : o.defaultVisitor.apply(this, arguments);
        },
      },
      t
    )
  );
}
function rw(e) {
  return j
    .matchAll(/\w+|\[(\w*)]/g, e)
    .map((t) => (t[0] === "[]" ? "" : t[1] || t[0]));
}
function sw(e) {
  const t = {},
    n = Object.keys(e);
  let r;
  const s = n.length;
  let o;
  for (r = 0; r < s; r++) (o = n[r]), (t[o] = e[o]);
  return t;
}
function qm(e) {
  function t(n, r, s, o) {
    let i = n[o++];
    if (i === "__proto__") return !0;
    const l = Number.isFinite(+i),
      a = o >= n.length;
    return (
      (i = !i && j.isArray(s) ? s.length : i),
      a
        ? (j.hasOwnProp(s, i) ? (s[i] = [s[i], r]) : (s[i] = r), !l)
        : ((!s[i] || !j.isObject(s[i])) && (s[i] = []),
          t(n, r, s[i], o) && j.isArray(s[i]) && (s[i] = sw(s[i])),
          !l)
    );
  }
  if (j.isFormData(e) && j.isFunction(e.entries)) {
    const n = {};
    return (
      j.forEachEntry(e, (r, s) => {
        t(rw(r), s, n, 0);
      }),
      n
    );
  }
  return null;
}
function ow(e, t, n) {
  if (j.isString(e))
    try {
      return (t || JSON.parse)(e), j.trim(e);
    } catch (r) {
      if (r.name !== "SyntaxError") throw r;
    }
  return (0, JSON.stringify)(e);
}
const wo = {
  transitional: Qm,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [
    function (t, n) {
      const r = n.getContentType() || "",
        s = r.indexOf("application/json") > -1,
        o = j.isObject(t);
      if ((o && j.isHTMLForm(t) && (t = new FormData(t)), j.isFormData(t)))
        return s ? JSON.stringify(qm(t)) : t;
      if (
        j.isArrayBuffer(t) ||
        j.isBuffer(t) ||
        j.isStream(t) ||
        j.isFile(t) ||
        j.isBlob(t) ||
        j.isReadableStream(t)
      )
        return t;
      if (j.isArrayBufferView(t)) return t.buffer;
      if (j.isURLSearchParams(t))
        return (
          n.setContentType(
            "application/x-www-form-urlencoded;charset=utf-8",
            !1
          ),
          t.toString()
        );
      let l;
      if (o) {
        if (r.indexOf("application/x-www-form-urlencoded") > -1)
          return nw(t, this.formSerializer).toString();
        if ((l = j.isFileList(t)) || r.indexOf("multipart/form-data") > -1) {
          const a = this.env && this.env.FormData;
          return xl(
            l ? { "files[]": t } : t,
            a && new a(),
            this.formSerializer
          );
        }
      }
      return o || s ? (n.setContentType("application/json", !1), ow(t)) : t;
    },
  ],
  transformResponse: [
    function (t) {
      const n = this.transitional || wo.transitional,
        r = n && n.forcedJSONParsing,
        s = this.responseType === "json";
      if (j.isResponse(t) || j.isReadableStream(t)) return t;
      if (t && j.isString(t) && ((r && !this.responseType) || s)) {
        const i = !(n && n.silentJSONParsing) && s;
        try {
          return JSON.parse(t);
        } catch (l) {
          if (i)
            throw l.name === "SyntaxError"
              ? H.from(l, H.ERR_BAD_RESPONSE, this, null, this.response)
              : l;
        }
      }
      return t;
    },
  ],
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: { FormData: Ke.classes.FormData, Blob: Ke.classes.Blob },
  validateStatus: function (t) {
    return t >= 200 && t < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0,
    },
  },
};
j.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  wo.headers[e] = {};
});
const iw = j.toObjectSet([
    "age",
    "authorization",
    "content-length",
    "content-type",
    "etag",
    "expires",
    "from",
    "host",
    "if-modified-since",
    "if-unmodified-since",
    "last-modified",
    "location",
    "max-forwards",
    "proxy-authorization",
    "referer",
    "retry-after",
    "user-agent",
  ]),
  lw = (e) => {
    const t = {};
    let n, r, s;
    return (
      e &&
        e
          .split(
            `
`
          )
          .forEach(function (i) {
            (s = i.indexOf(":")),
              (n = i.substring(0, s).trim().toLowerCase()),
              (r = i.substring(s + 1).trim()),
              !(!n || (t[n] && iw[n])) &&
                (n === "set-cookie"
                  ? t[n]
                    ? t[n].push(r)
                    : (t[n] = [r])
                  : (t[n] = t[n] ? t[n] + ", " + r : r));
          }),
      t
    );
  },
  yf = Symbol("internals");
function _s(e) {
  return e && String(e).trim().toLowerCase();
}
function hi(e) {
  return e === !1 || e == null ? e : j.isArray(e) ? e.map(hi) : String(e);
}
function aw(e) {
  const t = Object.create(null),
    n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let r;
  for (; (r = n.exec(e)); ) t[r[1]] = r[2];
  return t;
}
const uw = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function ia(e, t, n, r, s) {
  if (j.isFunction(r)) return r.call(this, t, n);
  if ((s && (t = n), !!j.isString(t))) {
    if (j.isString(r)) return t.indexOf(r) !== -1;
    if (j.isRegExp(r)) return r.test(t);
  }
}
function cw(e) {
  return e
    .trim()
    .toLowerCase()
    .replace(/([a-z\d])(\w*)/g, (t, n, r) => n.toUpperCase() + r);
}
function dw(e, t) {
  const n = j.toCamelCase(" " + t);
  ["get", "set", "has"].forEach((r) => {
    Object.defineProperty(e, r + n, {
      value: function (s, o, i) {
        return this[r].call(this, t, s, o, i);
      },
      configurable: !0,
    });
  });
}
class Ye {
  constructor(t) {
    t && this.set(t);
  }
  set(t, n, r) {
    const s = this;
    function o(l, a, u) {
      const d = _s(a);
      if (!d) throw new Error("header name must be a non-empty string");
      const f = j.findKey(s, d);
      (!f || s[f] === void 0 || u === !0 || (u === void 0 && s[f] !== !1)) &&
        (s[f || a] = hi(l));
    }
    const i = (l, a) => j.forEach(l, (u, d) => o(u, d, a));
    if (j.isPlainObject(t) || t instanceof this.constructor) i(t, n);
    else if (j.isString(t) && (t = t.trim()) && !uw(t)) i(lw(t), n);
    else if (j.isHeaders(t)) for (const [l, a] of t.entries()) o(a, l, r);
    else t != null && o(n, t, r);
    return this;
  }
  get(t, n) {
    if (((t = _s(t)), t)) {
      const r = j.findKey(this, t);
      if (r) {
        const s = this[r];
        if (!n) return s;
        if (n === !0) return aw(s);
        if (j.isFunction(n)) return n.call(this, s, r);
        if (j.isRegExp(n)) return n.exec(s);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(t, n) {
    if (((t = _s(t)), t)) {
      const r = j.findKey(this, t);
      return !!(r && this[r] !== void 0 && (!n || ia(this, this[r], r, n)));
    }
    return !1;
  }
  delete(t, n) {
    const r = this;
    let s = !1;
    function o(i) {
      if (((i = _s(i)), i)) {
        const l = j.findKey(r, i);
        l && (!n || ia(r, r[l], l, n)) && (delete r[l], (s = !0));
      }
    }
    return j.isArray(t) ? t.forEach(o) : o(t), s;
  }
  clear(t) {
    const n = Object.keys(this);
    let r = n.length,
      s = !1;
    for (; r--; ) {
      const o = n[r];
      (!t || ia(this, this[o], o, t, !0)) && (delete this[o], (s = !0));
    }
    return s;
  }
  normalize(t) {
    const n = this,
      r = {};
    return (
      j.forEach(this, (s, o) => {
        const i = j.findKey(r, o);
        if (i) {
          (n[i] = hi(s)), delete n[o];
          return;
        }
        const l = t ? cw(o) : String(o).trim();
        l !== o && delete n[o], (n[l] = hi(s)), (r[l] = !0);
      }),
      this
    );
  }
  concat(...t) {
    return this.constructor.concat(this, ...t);
  }
  toJSON(t) {
    const n = Object.create(null);
    return (
      j.forEach(this, (r, s) => {
        r != null && r !== !1 && (n[s] = t && j.isArray(r) ? r.join(", ") : r);
      }),
      n
    );
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([t, n]) => t + ": " + n).join(`
`);
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(t) {
    return t instanceof this ? t : new this(t);
  }
  static concat(t, ...n) {
    const r = new this(t);
    return n.forEach((s) => r.set(s)), r;
  }
  static accessor(t) {
    const r = (this[yf] = this[yf] = { accessors: {} }).accessors,
      s = this.prototype;
    function o(i) {
      const l = _s(i);
      r[l] || (dw(s, i), (r[l] = !0));
    }
    return j.isArray(t) ? t.forEach(o) : o(t), this;
  }
}
Ye.accessor([
  "Content-Type",
  "Content-Length",
  "Accept",
  "Accept-Encoding",
  "User-Agent",
  "Authorization",
]);
j.reduceDescriptors(Ye.prototype, ({ value: e }, t) => {
  let n = t[0].toUpperCase() + t.slice(1);
  return {
    get: () => e,
    set(r) {
      this[n] = r;
    },
  };
});
j.freezeMethods(Ye);
function la(e, t) {
  const n = this || wo,
    r = t || n,
    s = Ye.from(r.headers);
  let o = r.data;
  return (
    j.forEach(e, function (l) {
      o = l.call(n, o, s.normalize(), t ? t.status : void 0);
    }),
    s.normalize(),
    o
  );
}
function Vm(e) {
  return !!(e && e.__CANCEL__);
}
function es(e, t, n) {
  H.call(this, e ?? "canceled", H.ERR_CANCELED, t, n),
    (this.name = "CanceledError");
}
j.inherits(es, H, { __CANCEL__: !0 });
function Wm(e, t, n) {
  const r = n.config.validateStatus;
  !n.status || !r || r(n.status)
    ? e(n)
    : t(
        new H(
          "Request failed with status code " + n.status,
          [H.ERR_BAD_REQUEST, H.ERR_BAD_RESPONSE][
            Math.floor(n.status / 100) - 4
          ],
          n.config,
          n.request,
          n
        )
      );
}
function fw(e) {
  const t = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return (t && t[1]) || "";
}
function hw(e, t) {
  e = e || 10;
  const n = new Array(e),
    r = new Array(e);
  let s = 0,
    o = 0,
    i;
  return (
    (t = t !== void 0 ? t : 1e3),
    function (a) {
      const u = Date.now(),
        d = r[o];
      i || (i = u), (n[s] = a), (r[s] = u);
      let f = o,
        y = 0;
      for (; f !== s; ) (y += n[f++]), (f = f % e);
      if (((s = (s + 1) % e), s === o && (o = (o + 1) % e), u - i < t)) return;
      const g = d && u - d;
      return g ? Math.round((y * 1e3) / g) : void 0;
    }
  );
}
function pw(e, t) {
  let n = 0,
    r = 1e3 / t,
    s,
    o;
  const i = (u, d = Date.now()) => {
    (n = d), (s = null), o && (clearTimeout(o), (o = null)), e.apply(null, u);
  };
  return [
    (...u) => {
      const d = Date.now(),
        f = d - n;
      f >= r
        ? i(u, d)
        : ((s = u),
          o ||
            (o = setTimeout(() => {
              (o = null), i(s);
            }, r - f)));
    },
    () => s && i(s),
  ];
}
const $i = (e, t, n = 3) => {
    let r = 0;
    const s = hw(50, 250);
    return pw((o) => {
      const i = o.loaded,
        l = o.lengthComputable ? o.total : void 0,
        a = i - r,
        u = s(a),
        d = i <= l;
      r = i;
      const f = {
        loaded: i,
        total: l,
        progress: l ? i / l : void 0,
        bytes: a,
        rate: u || void 0,
        estimated: u && l && d ? (l - i) / u : void 0,
        event: o,
        lengthComputable: l != null,
        [t ? "download" : "upload"]: !0,
      };
      e(f);
    }, n);
  },
  gf = (e, t) => {
    const n = e != null;
    return [(r) => t[0]({ lengthComputable: n, total: e, loaded: r }), t[1]];
  },
  vf =
    (e) =>
    (...t) =>
      j.asap(() => e(...t)),
  mw = Ke.hasStandardBrowserEnv
    ? (function () {
        const t =
            Ke.navigator && /(msie|trident)/i.test(Ke.navigator.userAgent),
          n = document.createElement("a");
        let r;
        function s(o) {
          let i = o;
          return (
            t && (n.setAttribute("href", i), (i = n.href)),
            n.setAttribute("href", i),
            {
              href: n.href,
              protocol: n.protocol ? n.protocol.replace(/:$/, "") : "",
              host: n.host,
              search: n.search ? n.search.replace(/^\?/, "") : "",
              hash: n.hash ? n.hash.replace(/^#/, "") : "",
              hostname: n.hostname,
              port: n.port,
              pathname:
                n.pathname.charAt(0) === "/" ? n.pathname : "/" + n.pathname,
            }
          );
        }
        return (
          (r = s(window.location.href)),
          function (i) {
            const l = j.isString(i) ? s(i) : i;
            return l.protocol === r.protocol && l.host === r.host;
          }
        );
      })()
    : (function () {
        return function () {
          return !0;
        };
      })(),
  yw = Ke.hasStandardBrowserEnv
    ? {
        write(e, t, n, r, s, o) {
          const i = [e + "=" + encodeURIComponent(t)];
          j.isNumber(n) && i.push("expires=" + new Date(n).toGMTString()),
            j.isString(r) && i.push("path=" + r),
            j.isString(s) && i.push("domain=" + s),
            o === !0 && i.push("secure"),
            (document.cookie = i.join("; "));
        },
        read(e) {
          const t = document.cookie.match(
            new RegExp("(^|;\\s*)(" + e + ")=([^;]*)")
          );
          return t ? decodeURIComponent(t[3]) : null;
        },
        remove(e) {
          this.write(e, "", Date.now() - 864e5);
        },
      }
    : {
        write() {},
        read() {
          return null;
        },
        remove() {},
      };
function gw(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function vw(e, t) {
  return t ? e.replace(/\/?\/$/, "") + "/" + t.replace(/^\/+/, "") : e;
}
function Km(e, t) {
  return e && !gw(t) ? vw(e, t) : t;
}
const xf = (e) => (e instanceof Ye ? { ...e } : e);
function nr(e, t) {
  t = t || {};
  const n = {};
  function r(u, d, f) {
    return j.isPlainObject(u) && j.isPlainObject(d)
      ? j.merge.call({ caseless: f }, u, d)
      : j.isPlainObject(d)
      ? j.merge({}, d)
      : j.isArray(d)
      ? d.slice()
      : d;
  }
  function s(u, d, f) {
    if (j.isUndefined(d)) {
      if (!j.isUndefined(u)) return r(void 0, u, f);
    } else return r(u, d, f);
  }
  function o(u, d) {
    if (!j.isUndefined(d)) return r(void 0, d);
  }
  function i(u, d) {
    if (j.isUndefined(d)) {
      if (!j.isUndefined(u)) return r(void 0, u);
    } else return r(void 0, d);
  }
  function l(u, d, f) {
    if (f in t) return r(u, d);
    if (f in e) return r(void 0, u);
  }
  const a = {
    url: o,
    method: o,
    data: o,
    baseURL: i,
    transformRequest: i,
    transformResponse: i,
    paramsSerializer: i,
    timeout: i,
    timeoutMessage: i,
    withCredentials: i,
    withXSRFToken: i,
    adapter: i,
    responseType: i,
    xsrfCookieName: i,
    xsrfHeaderName: i,
    onUploadProgress: i,
    onDownloadProgress: i,
    decompress: i,
    maxContentLength: i,
    maxBodyLength: i,
    beforeRedirect: i,
    transport: i,
    httpAgent: i,
    httpsAgent: i,
    cancelToken: i,
    socketPath: i,
    responseEncoding: i,
    validateStatus: l,
    headers: (u, d) => s(xf(u), xf(d), !0),
  };
  return (
    j.forEach(Object.keys(Object.assign({}, e, t)), function (d) {
      const f = a[d] || s,
        y = f(e[d], t[d], d);
      (j.isUndefined(y) && f !== l) || (n[d] = y);
    }),
    n
  );
}
const Ym = (e) => {
    const t = nr({}, e);
    let {
      data: n,
      withXSRFToken: r,
      xsrfHeaderName: s,
      xsrfCookieName: o,
      headers: i,
      auth: l,
    } = t;
    (t.headers = i = Ye.from(i)),
      (t.url = Hm(Km(t.baseURL, t.url), e.params, e.paramsSerializer)),
      l &&
        i.set(
          "Authorization",
          "Basic " +
            btoa(
              (l.username || "") +
                ":" +
                (l.password ? unescape(encodeURIComponent(l.password)) : "")
            )
        );
    let a;
    if (j.isFormData(n)) {
      if (Ke.hasStandardBrowserEnv || Ke.hasStandardBrowserWebWorkerEnv)
        i.setContentType(void 0);
      else if ((a = i.getContentType()) !== !1) {
        const [u, ...d] = a
          ? a
              .split(";")
              .map((f) => f.trim())
              .filter(Boolean)
          : [];
        i.setContentType([u || "multipart/form-data", ...d].join("; "));
      }
    }
    if (
      Ke.hasStandardBrowserEnv &&
      (r && j.isFunction(r) && (r = r(t)), r || (r !== !1 && mw(t.url)))
    ) {
      const u = s && o && yw.read(o);
      u && i.set(s, u);
    }
    return t;
  },
  xw = typeof XMLHttpRequest < "u",
  ww =
    xw &&
    function (e) {
      return new Promise(function (n, r) {
        const s = Ym(e);
        let o = s.data;
        const i = Ye.from(s.headers).normalize();
        let { responseType: l, onUploadProgress: a, onDownloadProgress: u } = s,
          d,
          f,
          y,
          g,
          x;
        function b() {
          g && g(),
            x && x(),
            s.cancelToken && s.cancelToken.unsubscribe(d),
            s.signal && s.signal.removeEventListener("abort", d);
        }
        let w = new XMLHttpRequest();
        w.open(s.method.toUpperCase(), s.url, !0), (w.timeout = s.timeout);
        function m() {
          if (!w) return;
          const p = Ye.from(
              "getAllResponseHeaders" in w && w.getAllResponseHeaders()
            ),
            _ = {
              data:
                !l || l === "text" || l === "json"
                  ? w.responseText
                  : w.response,
              status: w.status,
              statusText: w.statusText,
              headers: p,
              config: e,
              request: w,
            };
          Wm(
            function (S) {
              n(S), b();
            },
            function (S) {
              r(S), b();
            },
            _
          ),
            (w = null);
        }
        "onloadend" in w
          ? (w.onloadend = m)
          : (w.onreadystatechange = function () {
              !w ||
                w.readyState !== 4 ||
                (w.status === 0 &&
                  !(w.responseURL && w.responseURL.indexOf("file:") === 0)) ||
                setTimeout(m);
            }),
          (w.onabort = function () {
            w &&
              (r(new H("Request aborted", H.ECONNABORTED, e, w)), (w = null));
          }),
          (w.onerror = function () {
            r(new H("Network Error", H.ERR_NETWORK, e, w)), (w = null);
          }),
          (w.ontimeout = function () {
            let E = s.timeout
              ? "timeout of " + s.timeout + "ms exceeded"
              : "timeout exceeded";
            const _ = s.transitional || Qm;
            s.timeoutErrorMessage && (E = s.timeoutErrorMessage),
              r(
                new H(
                  E,
                  _.clarifyTimeoutError ? H.ETIMEDOUT : H.ECONNABORTED,
                  e,
                  w
                )
              ),
              (w = null);
          }),
          o === void 0 && i.setContentType(null),
          "setRequestHeader" in w &&
            j.forEach(i.toJSON(), function (E, _) {
              w.setRequestHeader(_, E);
            }),
          j.isUndefined(s.withCredentials) ||
            (w.withCredentials = !!s.withCredentials),
          l && l !== "json" && (w.responseType = s.responseType),
          u && (([y, x] = $i(u, !0)), w.addEventListener("progress", y)),
          a &&
            w.upload &&
            (([f, g] = $i(a)),
            w.upload.addEventListener("progress", f),
            w.upload.addEventListener("loadend", g)),
          (s.cancelToken || s.signal) &&
            ((d = (p) => {
              w &&
                (r(!p || p.type ? new es(null, e, w) : p),
                w.abort(),
                (w = null));
            }),
            s.cancelToken && s.cancelToken.subscribe(d),
            s.signal &&
              (s.signal.aborted ? d() : s.signal.addEventListener("abort", d)));
        const h = fw(s.url);
        if (h && Ke.protocols.indexOf(h) === -1) {
          r(new H("Unsupported protocol " + h + ":", H.ERR_BAD_REQUEST, e));
          return;
        }
        w.send(o || null);
      });
    },
  bw = (e, t) => {
    const { length: n } = (e = e ? e.filter(Boolean) : []);
    if (t || n) {
      let r = new AbortController(),
        s;
      const o = function (u) {
        if (!s) {
          (s = !0), l();
          const d = u instanceof Error ? u : this.reason;
          r.abort(
            d instanceof H ? d : new es(d instanceof Error ? d.message : d)
          );
        }
      };
      let i =
        t &&
        setTimeout(() => {
          (i = null), o(new H(`timeout ${t} of ms exceeded`, H.ETIMEDOUT));
        }, t);
      const l = () => {
        e &&
          (i && clearTimeout(i),
          (i = null),
          e.forEach((u) => {
            u.unsubscribe
              ? u.unsubscribe(o)
              : u.removeEventListener("abort", o);
          }),
          (e = null));
      };
      e.forEach((u) => u.addEventListener("abort", o));
      const { signal: a } = r;
      return (a.unsubscribe = () => j.asap(l)), a;
    }
  },
  Ew = function* (e, t) {
    let n = e.byteLength;
    if (n < t) {
      yield e;
      return;
    }
    let r = 0,
      s;
    for (; r < n; ) (s = r + t), yield e.slice(r, s), (r = s);
  },
  Sw = async function* (e, t) {
    for await (const n of Cw(e)) yield* Ew(n, t);
  },
  Cw = async function* (e) {
    if (e[Symbol.asyncIterator]) {
      yield* e;
      return;
    }
    const t = e.getReader();
    try {
      for (;;) {
        const { done: n, value: r } = await t.read();
        if (n) break;
        yield r;
      }
    } finally {
      await t.cancel();
    }
  },
  wf = (e, t, n, r) => {
    const s = Sw(e, t);
    let o = 0,
      i,
      l = (a) => {
        i || ((i = !0), r && r(a));
      };
    return new ReadableStream(
      {
        async pull(a) {
          try {
            const { done: u, value: d } = await s.next();
            if (u) {
              l(), a.close();
              return;
            }
            let f = d.byteLength;
            if (n) {
              let y = (o += f);
              n(y);
            }
            a.enqueue(new Uint8Array(d));
          } catch (u) {
            throw (l(u), u);
          }
        },
        cancel(a) {
          return l(a), s.return();
        },
      },
      { highWaterMark: 2 }
    );
  },
  wl =
    typeof fetch == "function" &&
    typeof Request == "function" &&
    typeof Response == "function",
  Gm = wl && typeof ReadableStream == "function",
  _w =
    wl &&
    (typeof TextEncoder == "function"
      ? (
          (e) => (t) =>
            e.encode(t)
        )(new TextEncoder())
      : async (e) => new Uint8Array(await new Response(e).arrayBuffer())),
  Xm = (e, ...t) => {
    try {
      return !!e(...t);
    } catch {
      return !1;
    }
  },
  Nw =
    Gm &&
    Xm(() => {
      let e = !1;
      const t = new Request(Ke.origin, {
        body: new ReadableStream(),
        method: "POST",
        get duplex() {
          return (e = !0), "half";
        },
      }).headers.has("Content-Type");
      return e && !t;
    }),
  bf = 64 * 1024,
  du = Gm && Xm(() => j.isReadableStream(new Response("").body)),
  Ui = { stream: du && ((e) => e.body) };
wl &&
  ((e) => {
    ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((t) => {
      !Ui[t] &&
        (Ui[t] = j.isFunction(e[t])
          ? (n) => n[t]()
          : (n, r) => {
              throw new H(
                `Response type '${t}' is not supported`,
                H.ERR_NOT_SUPPORT,
                r
              );
            });
    });
  })(new Response());
const jw = async (e) => {
    if (e == null) return 0;
    if (j.isBlob(e)) return e.size;
    if (j.isSpecCompliantForm(e))
      return (
        await new Request(Ke.origin, { method: "POST", body: e }).arrayBuffer()
      ).byteLength;
    if (j.isArrayBufferView(e) || j.isArrayBuffer(e)) return e.byteLength;
    if ((j.isURLSearchParams(e) && (e = e + ""), j.isString(e)))
      return (await _w(e)).byteLength;
  },
  kw = async (e, t) => {
    const n = j.toFiniteNumber(e.getContentLength());
    return n ?? jw(t);
  },
  Tw =
    wl &&
    (async (e) => {
      let {
        url: t,
        method: n,
        data: r,
        signal: s,
        cancelToken: o,
        timeout: i,
        onDownloadProgress: l,
        onUploadProgress: a,
        responseType: u,
        headers: d,
        withCredentials: f = "same-origin",
        fetchOptions: y,
      } = Ym(e);
      u = u ? (u + "").toLowerCase() : "text";
      let g = bw([s, o && o.toAbortSignal()], i),
        x;
      const b =
        g &&
        g.unsubscribe &&
        (() => {
          g.unsubscribe();
        });
      let w;
      try {
        if (
          a &&
          Nw &&
          n !== "get" &&
          n !== "head" &&
          (w = await kw(d, r)) !== 0
        ) {
          let _ = new Request(t, { method: "POST", body: r, duplex: "half" }),
            C;
          if (
            (j.isFormData(r) &&
              (C = _.headers.get("content-type")) &&
              d.setContentType(C),
            _.body)
          ) {
            const [S, N] = gf(w, $i(vf(a)));
            r = wf(_.body, bf, S, N);
          }
        }
        j.isString(f) || (f = f ? "include" : "omit");
        const m = "credentials" in Request.prototype;
        x = new Request(t, {
          ...y,
          signal: g,
          method: n.toUpperCase(),
          headers: d.normalize().toJSON(),
          body: r,
          duplex: "half",
          credentials: m ? f : void 0,
        });
        let h = await fetch(x);
        const p = du && (u === "stream" || u === "response");
        if (du && (l || (p && b))) {
          const _ = {};
          ["status", "statusText", "headers"].forEach((R) => {
            _[R] = h[R];
          });
          const C = j.toFiniteNumber(h.headers.get("content-length")),
            [S, N] = (l && gf(C, $i(vf(l), !0))) || [];
          h = new Response(
            wf(h.body, bf, S, () => {
              N && N(), b && b();
            }),
            _
          );
        }
        u = u || "text";
        let E = await Ui[j.findKey(Ui, u) || "text"](h, e);
        return (
          !p && b && b(),
          await new Promise((_, C) => {
            Wm(_, C, {
              data: E,
              headers: Ye.from(h.headers),
              status: h.status,
              statusText: h.statusText,
              config: e,
              request: x,
            });
          })
        );
      } catch (m) {
        throw (
          (b && b(),
          m && m.name === "TypeError" && /fetch/i.test(m.message)
            ? Object.assign(new H("Network Error", H.ERR_NETWORK, e, x), {
                cause: m.cause || m,
              })
            : H.from(m, m && m.code, e, x))
        );
      }
    }),
  fu = { http: Q1, xhr: ww, fetch: Tw };
j.forEach(fu, (e, t) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: t });
    } catch {}
    Object.defineProperty(e, "adapterName", { value: t });
  }
});
const Ef = (e) => `- ${e}`,
  Rw = (e) => j.isFunction(e) || e === null || e === !1,
  Jm = {
    getAdapter: (e) => {
      e = j.isArray(e) ? e : [e];
      const { length: t } = e;
      let n, r;
      const s = {};
      for (let o = 0; o < t; o++) {
        n = e[o];
        let i;
        if (
          ((r = n),
          !Rw(n) && ((r = fu[(i = String(n)).toLowerCase()]), r === void 0))
        )
          throw new H(`Unknown adapter '${i}'`);
        if (r) break;
        s[i || "#" + o] = r;
      }
      if (!r) {
        const o = Object.entries(s).map(
          ([l, a]) =>
            `adapter ${l} ` +
            (a === !1
              ? "is not supported by the environment"
              : "is not available in the build")
        );
        let i = t
          ? o.length > 1
            ? `since :
` +
              o.map(Ef).join(`
`)
            : " " + Ef(o[0])
          : "as no adapter specified";
        throw new H(
          "There is no suitable adapter to dispatch the request " + i,
          "ERR_NOT_SUPPORT"
        );
      }
      return r;
    },
    adapters: fu,
  };
function aa(e) {
  if (
    (e.cancelToken && e.cancelToken.throwIfRequested(),
    e.signal && e.signal.aborted)
  )
    throw new es(null, e);
}
function Sf(e) {
  return (
    aa(e),
    (e.headers = Ye.from(e.headers)),
    (e.data = la.call(e, e.transformRequest)),
    ["post", "put", "patch"].indexOf(e.method) !== -1 &&
      e.headers.setContentType("application/x-www-form-urlencoded", !1),
    Jm.getAdapter(e.adapter || wo.adapter)(e).then(
      function (r) {
        return (
          aa(e),
          (r.data = la.call(e, e.transformResponse, r)),
          (r.headers = Ye.from(r.headers)),
          r
        );
      },
      function (r) {
        return (
          Vm(r) ||
            (aa(e),
            r &&
              r.response &&
              ((r.response.data = la.call(e, e.transformResponse, r.response)),
              (r.response.headers = Ye.from(r.response.headers)))),
          Promise.reject(r)
        );
      }
    )
  );
}
const Zm = "1.7.7",
  Pc = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach(
  (e, t) => {
    Pc[e] = function (r) {
      return typeof r === e || "a" + (t < 1 ? "n " : " ") + e;
    };
  }
);
const Cf = {};
Pc.transitional = function (t, n, r) {
  function s(o, i) {
    return (
      "[Axios v" +
      Zm +
      "] Transitional option '" +
      o +
      "'" +
      i +
      (r ? ". " + r : "")
    );
  }
  return (o, i, l) => {
    if (t === !1)
      throw new H(
        s(i, " has been removed" + (n ? " in " + n : "")),
        H.ERR_DEPRECATED
      );
    return (
      n &&
        !Cf[i] &&
        ((Cf[i] = !0),
        console.warn(
          s(
            i,
            " has been deprecated since v" +
              n +
              " and will be removed in the near future"
          )
        )),
      t ? t(o, i, l) : !0
    );
  };
};
function Ow(e, t, n) {
  if (typeof e != "object")
    throw new H("options must be an object", H.ERR_BAD_OPTION_VALUE);
  const r = Object.keys(e);
  let s = r.length;
  for (; s-- > 0; ) {
    const o = r[s],
      i = t[o];
    if (i) {
      const l = e[o],
        a = l === void 0 || i(l, o, e);
      if (a !== !0)
        throw new H("option " + o + " must be " + a, H.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0) throw new H("Unknown option " + o, H.ERR_BAD_OPTION);
  }
}
const hu = { assertOptions: Ow, validators: Pc },
  dn = hu.validators;
class Kn {
  constructor(t) {
    (this.defaults = t),
      (this.interceptors = { request: new mf(), response: new mf() });
  }
  async request(t, n) {
    try {
      return await this._request(t, n);
    } catch (r) {
      if (r instanceof Error) {
        let s;
        Error.captureStackTrace
          ? Error.captureStackTrace((s = {}))
          : (s = new Error());
        const o = s.stack ? s.stack.replace(/^.+\n/, "") : "";
        try {
          r.stack
            ? o &&
              !String(r.stack).endsWith(o.replace(/^.+\n.+\n/, "")) &&
              (r.stack +=
                `
` + o)
            : (r.stack = o);
        } catch {}
      }
      throw r;
    }
  }
  _request(t, n) {
    typeof t == "string" ? ((n = n || {}), (n.url = t)) : (n = t || {}),
      (n = nr(this.defaults, n));
    const { transitional: r, paramsSerializer: s, headers: o } = n;
    r !== void 0 &&
      hu.assertOptions(
        r,
        {
          silentJSONParsing: dn.transitional(dn.boolean),
          forcedJSONParsing: dn.transitional(dn.boolean),
          clarifyTimeoutError: dn.transitional(dn.boolean),
        },
        !1
      ),
      s != null &&
        (j.isFunction(s)
          ? (n.paramsSerializer = { serialize: s })
          : hu.assertOptions(
              s,
              { encode: dn.function, serialize: dn.function },
              !0
            )),
      (n.method = (n.method || this.defaults.method || "get").toLowerCase());
    let i = o && j.merge(o.common, o[n.method]);
    o &&
      j.forEach(
        ["delete", "get", "head", "post", "put", "patch", "common"],
        (x) => {
          delete o[x];
        }
      ),
      (n.headers = Ye.concat(i, o));
    const l = [];
    let a = !0;
    this.interceptors.request.forEach(function (b) {
      (typeof b.runWhen == "function" && b.runWhen(n) === !1) ||
        ((a = a && b.synchronous), l.unshift(b.fulfilled, b.rejected));
    });
    const u = [];
    this.interceptors.response.forEach(function (b) {
      u.push(b.fulfilled, b.rejected);
    });
    let d,
      f = 0,
      y;
    if (!a) {
      const x = [Sf.bind(this), void 0];
      for (
        x.unshift.apply(x, l),
          x.push.apply(x, u),
          y = x.length,
          d = Promise.resolve(n);
        f < y;

      )
        d = d.then(x[f++], x[f++]);
      return d;
    }
    y = l.length;
    let g = n;
    for (f = 0; f < y; ) {
      const x = l[f++],
        b = l[f++];
      try {
        g = x(g);
      } catch (w) {
        b.call(this, w);
        break;
      }
    }
    try {
      d = Sf.call(this, g);
    } catch (x) {
      return Promise.reject(x);
    }
    for (f = 0, y = u.length; f < y; ) d = d.then(u[f++], u[f++]);
    return d;
  }
  getUri(t) {
    t = nr(this.defaults, t);
    const n = Km(t.baseURL, t.url);
    return Hm(n, t.params, t.paramsSerializer);
  }
}
j.forEach(["delete", "get", "head", "options"], function (t) {
  Kn.prototype[t] = function (n, r) {
    return this.request(
      nr(r || {}, { method: t, url: n, data: (r || {}).data })
    );
  };
});
j.forEach(["post", "put", "patch"], function (t) {
  function n(r) {
    return function (o, i, l) {
      return this.request(
        nr(l || {}, {
          method: t,
          headers: r ? { "Content-Type": "multipart/form-data" } : {},
          url: o,
          data: i,
        })
      );
    };
  }
  (Kn.prototype[t] = n()), (Kn.prototype[t + "Form"] = n(!0));
});
class Lc {
  constructor(t) {
    if (typeof t != "function")
      throw new TypeError("executor must be a function.");
    let n;
    this.promise = new Promise(function (o) {
      n = o;
    });
    const r = this;
    this.promise.then((s) => {
      if (!r._listeners) return;
      let o = r._listeners.length;
      for (; o-- > 0; ) r._listeners[o](s);
      r._listeners = null;
    }),
      (this.promise.then = (s) => {
        let o;
        const i = new Promise((l) => {
          r.subscribe(l), (o = l);
        }).then(s);
        return (
          (i.cancel = function () {
            r.unsubscribe(o);
          }),
          i
        );
      }),
      t(function (o, i, l) {
        r.reason || ((r.reason = new es(o, i, l)), n(r.reason));
      });
  }
  throwIfRequested() {
    if (this.reason) throw this.reason;
  }
  subscribe(t) {
    if (this.reason) {
      t(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(t) : (this._listeners = [t]);
  }
  unsubscribe(t) {
    if (!this._listeners) return;
    const n = this._listeners.indexOf(t);
    n !== -1 && this._listeners.splice(n, 1);
  }
  toAbortSignal() {
    const t = new AbortController(),
      n = (r) => {
        t.abort(r);
      };
    return (
      this.subscribe(n),
      (t.signal.unsubscribe = () => this.unsubscribe(n)),
      t.signal
    );
  }
  static source() {
    let t;
    return {
      token: new Lc(function (s) {
        t = s;
      }),
      cancel: t,
    };
  }
}
function Pw(e) {
  return function (n) {
    return e.apply(null, n);
  };
}
function Lw(e) {
  return j.isObject(e) && e.isAxiosError === !0;
}
const pu = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
};
Object.entries(pu).forEach(([e, t]) => {
  pu[t] = e;
});
function e0(e) {
  const t = new Kn(e),
    n = Om(Kn.prototype.request, t);
  return (
    j.extend(n, Kn.prototype, t, { allOwnKeys: !0 }),
    j.extend(n, t, null, { allOwnKeys: !0 }),
    (n.create = function (s) {
      return e0(nr(e, s));
    }),
    n
  );
}
const q = e0(wo);
q.Axios = Kn;
q.CanceledError = es;
q.CancelToken = Lc;
q.isCancel = Vm;
q.VERSION = Zm;
q.toFormData = xl;
q.AxiosError = H;
q.Cancel = q.CanceledError;
q.all = function (t) {
  return Promise.all(t);
};
q.spread = Pw;
q.isAxiosError = Lw;
q.mergeConfig = nr;
q.AxiosHeaders = Ye;
q.formToJSON = (e) => qm(j.isHTMLForm(e) ? new FormData(e) : e);
q.getAdapter = Jm.getAdapter;
q.HttpStatusCode = pu;
q.default = q;
const me = "http://localhost:4000/api",
  Aw = async (e, t, n, r, s) => {
    try {
      return await q.post(
        `${me}/auth/registerStudent`,
        { fullName: e, userName: t, password: n, year: r, semester: s },
        { withCredentials: !0, headers: { "Content-Type": "application/json" } }
      );
    } catch (o) {
      throw (console.error("Error during registration:", o), o);
    }
  },
  Iw = async (e, t, n) => {
    try {
      return q.post(
        `${me}/auth/loginUser`,
        { userName: e, password: t, role: n },
        { withCredentials: !0, headers: { "Content-Type": "application/json" } }
      );
    } catch (r) {
      throw (console.log("h"), console.error("Error during login:", r), r);
    }
  },
  Fw = async () => {
    try {
      return q.get(`${me}/teacher/getDetails`, {
        withCredentials: !0,
        headers: { "Content-Type": "application/json" },
      });
    } catch (e) {
      throw (console.error("Error during fetching teacher details:", e), e);
    }
  },
  Dw = (e) => {
    try {
      return q.post(
        `${me}/teacher/createExam/${e}`,
        {},
        {
          withCredentials: !0,
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }
      );
    } catch (t) {
      throw (console.error("Error during creating exam:", t), t);
    }
  },
  Mw = (e) => {
    try {
      return q.delete(`${me}/teacher/deleteExam/${e}`, {
        withCredentials: !0,
        headers: { "Content-Type": "application/json" },
      });
    } catch (t) {
      throw (console.error("Error during deleting exam:", t), t);
    }
  },
  zw = (e) => {
    try {
      return q.post(
        `${me}/teacher/saveExam/${e}`,
        {},
        { withCredentials: !0, headers: { "Content-Type": "application/json" } }
      );
    } catch (t) {
      throw (console.error("Error during saving exam:", t), t);
    }
  },
  $w = async () => {
    try {
      const e = await q.get(`${me}/teacher/getSavedExam`, {
        withCredentials: !0,
        headers: { "Content-Type": "application/json" },
      });
      return e.status === 200 ? e : "No saved exam";
    } catch (e) {
      throw (console.error("Error during fetching saved exam:", e), e);
    }
  },
  t0 = (e, t, n, r, s, o) => {
    try {
      return q.post(
        `${me}/teacher/createQuestions/${e}`,
        {
          title: t,
          timeLimit: n,
          questionText: r,
          options: s,
          correctAnswer: o,
        },
        { withCredentials: !0, headers: { "Content-Type": "application/json" } }
      );
    } catch (i) {
      throw (console.error("Error during creating question:", i), i);
    }
  },
  n0 = (e, t) => {
    try {
      return q.delete(`${me}/teacher/removeQuestions/${e}`, {
        data: { examId: t },
        withCredentials: !0,
        headers: { "Content-Type": "application/json" },
      });
    } catch (n) {
      throw (console.error("Error during removing question:", n), n);
    }
  },
  r0 = (e, t, n, r) => {
    try {
      return q.put(
        `${me}/teacher/updateQuestion/${e}`,
        { questionText: t, options: n, correctAnswer: r },
        { withCredentials: !0, headers: { "Content-Type": "application/json" } }
      );
    } catch (s) {
      throw (console.error("Error during updating question:", s), s);
    }
  },
  s0 = async (e) => {
    try {
      return q.get(`${me}/teacher/getExamById/${e}`, {
        withCredentials: !0,
        headers: { "Content-Type": "application/json" },
      });
    } catch (t) {
      throw (console.error("Error during fetching exam:", t), t);
    }
  },
  o0 = async (e) => {
    try {
      return q.patch(
        `${me}/teacher/publishExam/${e}`,
        {},
        { withCredentials: !0, headers: { "Content-Type": "application/json" } }
      );
    } catch (t) {
      throw (console.error("Error during publishing exam:", t), t);
    }
  },
  i0 = async () => {
    try {
      return q.get(`${me}/teacher/getExams`, {
        withCredentials: !0,
        headers: { "Content-Type": "application/json" },
      });
    } catch (e) {
      throw (console.error("Error during fetching exams:", e), e);
    }
  },
  Uw = async () => {
    try {
      return await q.get(`${me}/student/getExams`, {
        withCredentials: !0,
        headers: { "Content-Type": "application/json" },
      });
    } catch (e) {
      throw (console.error("Error during fetching exams:", e), e);
    }
  },
  Bw = async () => {
    try {
      return q.get(`${me}/student/getUpcomingExams`, {
        withCredentials: !0,
        headers: { "Content-Type": "application/json" },
      });
    } catch (e) {
      throw (console.error("Error during getting exam:", e), e);
    }
  },
  Hw = async (e) => {
    try {
      const t = await q.get(`${me}/student/viewExams/${e}`, {
        withCredentials: !0,
        headers: { "Content-Type": "application/json" },
      });
      return console.log(t, "lkhdsa"), t;
    } catch (t) {
      throw (console.error("Error during fetching teachers:", t), t);
    }
  },
  Qw = async () => {
    try {
      return q.get(`${me}/student/getPastExams`, {
        withCredentials: !0,
        headers: { "Content-Type": "application/json" },
      });
    } catch (e) {
      throw (console.error("Error during getting exam:", e), e);
    }
  },
  qw = async (e) => {
    try {
      if (e)
        return q.post(
          `${me}/student/getYearAndSemester`,
          { userName: e },
          {
            withCredentials: !0,
            headers: { "Content-Type": "application/json" },
          }
        );
    } catch (t) {
      throw (console.error("Error during fetching courses:", t), t);
    }
  },
  Vw = (e) => {
    try {
      return q.get(`${me}/student/getExamForStudent/${e}`, {
        withCredentials: !0,
        headers: { "Content-Type": "application/json" },
      });
    } catch (t) {
      throw (console.error("Error during fetching exam:", t), t);
    }
  },
  ua = (e, t, n) => {
    try {
      return q.post(
        `${me}/student/submitIndividualAnswer/${e}`,
        { examId: t, selectedOption: n },
        { withCredentials: !0, headers: { "Content-Type": "application/json" } }
      );
    } catch (r) {
      throw (console.error("Error during submitting answer:", r), r);
    }
  },
  _f = (e) => {
    try {
      return q.post(
        `${me}/student/submitExam/${e}`,
        {},
        { withCredentials: !0, headers: { "Content-Type": "application/json" } }
      );
    } catch (t) {
      throw (console.error("Error during submitting exam:", t), t);
    }
  },
  Ww = async (e, t) => {
    try {
      return q.post(
        `${me}/auth/forgotPassword`,
        { username: e, role: t },
        { withCredentials: !0, headers: { "Content-Type": "application/json" } }
      );
    } catch (n) {
      throw (console.error("Error during forgot password:", n), n);
    }
  };
function l0(e) {
  var t,
    n,
    r = "";
  if (typeof e == "string" || typeof e == "number") r += e;
  else if (typeof e == "object")
    if (Array.isArray(e)) {
      var s = e.length;
      for (t = 0; t < s; t++)
        e[t] && (n = l0(e[t])) && (r && (r += " "), (r += n));
    } else for (n in e) e[n] && (r && (r += " "), (r += n));
  return r;
}
function Yn() {
  for (var e, t, n = 0, r = "", s = arguments.length; n < s; n++)
    (e = arguments[n]) && (t = l0(e)) && (r && (r += " "), (r += t));
  return r;
}
function Kw(e) {
  if (typeof document > "u") return;
  let t = document.head || document.getElementsByTagName("head")[0],
    n = document.createElement("style");
  (n.type = "text/css"),
    t.firstChild ? t.insertBefore(n, t.firstChild) : t.appendChild(n),
    n.styleSheet
      ? (n.styleSheet.cssText = e)
      : n.appendChild(document.createTextNode(e));
}
Kw(`:root{--toastify-color-light: #fff;--toastify-color-dark: #121212;--toastify-color-info: #3498db;--toastify-color-success: #07bc0c;--toastify-color-warning: #f1c40f;--toastify-color-error: hsl(6, 78%, 57%);--toastify-color-transparent: rgba(255, 255, 255, .7);--toastify-icon-color-info: var(--toastify-color-info);--toastify-icon-color-success: var(--toastify-color-success);--toastify-icon-color-warning: var(--toastify-color-warning);--toastify-icon-color-error: var(--toastify-color-error);--toastify-container-width: fit-content;--toastify-toast-width: 320px;--toastify-toast-offset: 16px;--toastify-toast-top: max(var(--toastify-toast-offset), env(safe-area-inset-top));--toastify-toast-right: max(var(--toastify-toast-offset), env(safe-area-inset-right));--toastify-toast-left: max(var(--toastify-toast-offset), env(safe-area-inset-left));--toastify-toast-bottom: max(var(--toastify-toast-offset), env(safe-area-inset-bottom));--toastify-toast-background: #fff;--toastify-toast-padding: 14px;--toastify-toast-min-height: 64px;--toastify-toast-max-height: 800px;--toastify-toast-bd-radius: 6px;--toastify-toast-shadow: 0px 4px 12px rgba(0, 0, 0, .1);--toastify-font-family: sans-serif;--toastify-z-index: 9999;--toastify-text-color-light: #757575;--toastify-text-color-dark: #fff;--toastify-text-color-info: #fff;--toastify-text-color-success: #fff;--toastify-text-color-warning: #fff;--toastify-text-color-error: #fff;--toastify-spinner-color: #616161;--toastify-spinner-color-empty-area: #e0e0e0;--toastify-color-progress-light: linear-gradient(to right, #4cd964, #5ac8fa, #007aff, #34aadc, #5856d6, #ff2d55);--toastify-color-progress-dark: #bb86fc;--toastify-color-progress-info: var(--toastify-color-info);--toastify-color-progress-success: var(--toastify-color-success);--toastify-color-progress-warning: var(--toastify-color-warning);--toastify-color-progress-error: var(--toastify-color-error);--toastify-color-progress-bgo: .2}.Toastify__toast-container{z-index:var(--toastify-z-index);-webkit-transform:translate3d(0,0,var(--toastify-z-index));position:fixed;width:var(--toastify-container-width);box-sizing:border-box;color:#fff;display:flex;flex-direction:column}.Toastify__toast-container--top-left{top:var(--toastify-toast-top);left:var(--toastify-toast-left)}.Toastify__toast-container--top-center{top:var(--toastify-toast-top);left:50%;transform:translate(-50%);align-items:center}.Toastify__toast-container--top-right{top:var(--toastify-toast-top);right:var(--toastify-toast-right);align-items:end}.Toastify__toast-container--bottom-left{bottom:var(--toastify-toast-bottom);left:var(--toastify-toast-left)}.Toastify__toast-container--bottom-center{bottom:var(--toastify-toast-bottom);left:50%;transform:translate(-50%);align-items:center}.Toastify__toast-container--bottom-right{bottom:var(--toastify-toast-bottom);right:var(--toastify-toast-right);align-items:end}@media only screen and (max-width: 480px){.Toastify__toast-container{width:100vw;left:env(safe-area-inset-left);margin:0}.Toastify__toast-container--top-left,.Toastify__toast-container--top-center,.Toastify__toast-container--top-right{top:env(safe-area-inset-top);transform:translate(0)}.Toastify__toast-container--bottom-left,.Toastify__toast-container--bottom-center,.Toastify__toast-container--bottom-right{bottom:env(safe-area-inset-bottom);transform:translate(0)}.Toastify__toast-container--rtl{right:env(safe-area-inset-right);left:initial}.Toastify__toast{--toastify-toast-width: 100%;margin-bottom:0;border-radius:0}}.Toastify__toast{--y: 0;position:relative;touch-action:none;width:var(--toastify-toast-width);min-height:var(--toastify-toast-min-height);box-sizing:border-box;margin-bottom:1rem;padding:var(--toastify-toast-padding);border-radius:var(--toastify-toast-bd-radius);box-shadow:var(--toastify-toast-shadow);max-height:var(--toastify-toast-max-height);font-family:var(--toastify-font-family);z-index:0;display:flex;flex:1 auto;align-items:center;word-break:break-word}.Toastify__toast-container[data-stacked=true]{width:var(--toastify-toast-width)}.Toastify__toast--stacked{position:absolute;width:100%;transform:translate3d(0,var(--y),0) scale(var(--s));transition:transform .3s}.Toastify__toast--stacked[data-collapsed] .Toastify__toast-body,.Toastify__toast--stacked[data-collapsed] .Toastify__close-button{transition:opacity .1s}.Toastify__toast--stacked[data-collapsed=false]{overflow:visible}.Toastify__toast--stacked[data-collapsed=true]:not(:last-child)>*{opacity:0}.Toastify__toast--stacked:after{content:"";position:absolute;left:0;right:0;height:calc(var(--g) * 1px);bottom:100%}.Toastify__toast--stacked[data-pos=top]{top:0}.Toastify__toast--stacked[data-pos=bot]{bottom:0}.Toastify__toast--stacked[data-pos=bot].Toastify__toast--stacked:before{transform-origin:top}.Toastify__toast--stacked[data-pos=top].Toastify__toast--stacked:before{transform-origin:bottom}.Toastify__toast--stacked:before{content:"";position:absolute;left:0;right:0;bottom:0;height:100%;transform:scaleY(3);z-index:-1}.Toastify__toast--rtl{direction:rtl}.Toastify__toast--close-on-click{cursor:pointer}.Toastify__toast-icon{margin-inline-end:10px;width:22px;flex-shrink:0;display:flex}.Toastify--animate{animation-fill-mode:both;animation-duration:.5s}.Toastify--animate-icon{animation-fill-mode:both;animation-duration:.3s}.Toastify__toast-theme--dark{background:var(--toastify-color-dark);color:var(--toastify-text-color-dark)}.Toastify__toast-theme--light,.Toastify__toast-theme--colored.Toastify__toast--default{background:var(--toastify-color-light);color:var(--toastify-text-color-light)}.Toastify__toast-theme--colored.Toastify__toast--info{color:var(--toastify-text-color-info);background:var(--toastify-color-info)}.Toastify__toast-theme--colored.Toastify__toast--success{color:var(--toastify-text-color-success);background:var(--toastify-color-success)}.Toastify__toast-theme--colored.Toastify__toast--warning{color:var(--toastify-text-color-warning);background:var(--toastify-color-warning)}.Toastify__toast-theme--colored.Toastify__toast--error{color:var(--toastify-text-color-error);background:var(--toastify-color-error)}.Toastify__progress-bar-theme--light{background:var(--toastify-color-progress-light)}.Toastify__progress-bar-theme--dark{background:var(--toastify-color-progress-dark)}.Toastify__progress-bar--info{background:var(--toastify-color-progress-info)}.Toastify__progress-bar--success{background:var(--toastify-color-progress-success)}.Toastify__progress-bar--warning{background:var(--toastify-color-progress-warning)}.Toastify__progress-bar--error{background:var(--toastify-color-progress-error)}.Toastify__progress-bar-theme--colored.Toastify__progress-bar--info,.Toastify__progress-bar-theme--colored.Toastify__progress-bar--success,.Toastify__progress-bar-theme--colored.Toastify__progress-bar--warning,.Toastify__progress-bar-theme--colored.Toastify__progress-bar--error{background:var(--toastify-color-transparent)}.Toastify__close-button{color:#fff;position:absolute;top:6px;right:6px;background:transparent;outline:none;border:none;padding:0;cursor:pointer;opacity:.7;transition:.3s ease;z-index:1}.Toastify__toast--rtl .Toastify__close-button{left:6px;right:unset}.Toastify__close-button--light{color:#000;opacity:.3}.Toastify__close-button>svg{fill:currentColor;height:16px;width:14px}.Toastify__close-button:hover,.Toastify__close-button:focus{opacity:1}@keyframes Toastify__trackProgress{0%{transform:scaleX(1)}to{transform:scaleX(0)}}.Toastify__progress-bar{position:absolute;bottom:0;left:0;width:100%;height:100%;z-index:1;opacity:.7;transform-origin:left}.Toastify__progress-bar--animated{animation:Toastify__trackProgress linear 1 forwards}.Toastify__progress-bar--controlled{transition:transform .2s}.Toastify__progress-bar--rtl{right:0;left:initial;transform-origin:right;border-bottom-left-radius:initial}.Toastify__progress-bar--wrp{position:absolute;overflow:hidden;bottom:0;left:0;width:100%;height:5px;border-bottom-left-radius:var(--toastify-toast-bd-radius);border-bottom-right-radius:var(--toastify-toast-bd-radius)}.Toastify__progress-bar--wrp[data-hidden=true]{opacity:0}.Toastify__progress-bar--bg{opacity:var(--toastify-color-progress-bgo);width:100%;height:100%}.Toastify__spinner{width:20px;height:20px;box-sizing:border-box;border:2px solid;border-radius:100%;border-color:var(--toastify-spinner-color-empty-area);border-right-color:var(--toastify-spinner-color);animation:Toastify__spin .65s linear infinite}@keyframes Toastify__bounceInRight{0%,60%,75%,90%,to{animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;transform:translate3d(3000px,0,0)}60%{opacity:1;transform:translate3d(-25px,0,0)}75%{transform:translate3d(10px,0,0)}90%{transform:translate3d(-5px,0,0)}to{transform:none}}@keyframes Toastify__bounceOutRight{20%{opacity:1;transform:translate3d(-20px,var(--y),0)}to{opacity:0;transform:translate3d(2000px,var(--y),0)}}@keyframes Toastify__bounceInLeft{0%,60%,75%,90%,to{animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;transform:translate3d(-3000px,0,0)}60%{opacity:1;transform:translate3d(25px,0,0)}75%{transform:translate3d(-10px,0,0)}90%{transform:translate3d(5px,0,0)}to{transform:none}}@keyframes Toastify__bounceOutLeft{20%{opacity:1;transform:translate3d(20px,var(--y),0)}to{opacity:0;transform:translate3d(-2000px,var(--y),0)}}@keyframes Toastify__bounceInUp{0%,60%,75%,90%,to{animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;transform:translate3d(0,3000px,0)}60%{opacity:1;transform:translate3d(0,-20px,0)}75%{transform:translate3d(0,10px,0)}90%{transform:translate3d(0,-5px,0)}to{transform:translateZ(0)}}@keyframes Toastify__bounceOutUp{20%{transform:translate3d(0,calc(var(--y) - 10px),0)}40%,45%{opacity:1;transform:translate3d(0,calc(var(--y) + 20px),0)}to{opacity:0;transform:translate3d(0,-2000px,0)}}@keyframes Toastify__bounceInDown{0%,60%,75%,90%,to{animation-timing-function:cubic-bezier(.215,.61,.355,1)}0%{opacity:0;transform:translate3d(0,-3000px,0)}60%{opacity:1;transform:translate3d(0,25px,0)}75%{transform:translate3d(0,-10px,0)}90%{transform:translate3d(0,5px,0)}to{transform:none}}@keyframes Toastify__bounceOutDown{20%{transform:translate3d(0,calc(var(--y) - 10px),0)}40%,45%{opacity:1;transform:translate3d(0,calc(var(--y) + 20px),0)}to{opacity:0;transform:translate3d(0,2000px,0)}}.Toastify__bounce-enter--top-left,.Toastify__bounce-enter--bottom-left{animation-name:Toastify__bounceInLeft}.Toastify__bounce-enter--top-right,.Toastify__bounce-enter--bottom-right{animation-name:Toastify__bounceInRight}.Toastify__bounce-enter--top-center{animation-name:Toastify__bounceInDown}.Toastify__bounce-enter--bottom-center{animation-name:Toastify__bounceInUp}.Toastify__bounce-exit--top-left,.Toastify__bounce-exit--bottom-left{animation-name:Toastify__bounceOutLeft}.Toastify__bounce-exit--top-right,.Toastify__bounce-exit--bottom-right{animation-name:Toastify__bounceOutRight}.Toastify__bounce-exit--top-center{animation-name:Toastify__bounceOutUp}.Toastify__bounce-exit--bottom-center{animation-name:Toastify__bounceOutDown}@keyframes Toastify__zoomIn{0%{opacity:0;transform:scale3d(.3,.3,.3)}50%{opacity:1}}@keyframes Toastify__zoomOut{0%{opacity:1}50%{opacity:0;transform:translate3d(0,var(--y),0) scale3d(.3,.3,.3)}to{opacity:0}}.Toastify__zoom-enter{animation-name:Toastify__zoomIn}.Toastify__zoom-exit{animation-name:Toastify__zoomOut}@keyframes Toastify__flipIn{0%{transform:perspective(400px) rotateX(90deg);animation-timing-function:ease-in;opacity:0}40%{transform:perspective(400px) rotateX(-20deg);animation-timing-function:ease-in}60%{transform:perspective(400px) rotateX(10deg);opacity:1}80%{transform:perspective(400px) rotateX(-5deg)}to{transform:perspective(400px)}}@keyframes Toastify__flipOut{0%{transform:translate3d(0,var(--y),0) perspective(400px)}30%{transform:translate3d(0,var(--y),0) perspective(400px) rotateX(-20deg);opacity:1}to{transform:translate3d(0,var(--y),0) perspective(400px) rotateX(90deg);opacity:0}}.Toastify__flip-enter{animation-name:Toastify__flipIn}.Toastify__flip-exit{animation-name:Toastify__flipOut}@keyframes Toastify__slideInRight{0%{transform:translate3d(110%,0,0);visibility:visible}to{transform:translate3d(0,var(--y),0)}}@keyframes Toastify__slideInLeft{0%{transform:translate3d(-110%,0,0);visibility:visible}to{transform:translate3d(0,var(--y),0)}}@keyframes Toastify__slideInUp{0%{transform:translate3d(0,110%,0);visibility:visible}to{transform:translate3d(0,var(--y),0)}}@keyframes Toastify__slideInDown{0%{transform:translate3d(0,-110%,0);visibility:visible}to{transform:translate3d(0,var(--y),0)}}@keyframes Toastify__slideOutRight{0%{transform:translate3d(0,var(--y),0)}to{visibility:hidden;transform:translate3d(110%,var(--y),0)}}@keyframes Toastify__slideOutLeft{0%{transform:translate3d(0,var(--y),0)}to{visibility:hidden;transform:translate3d(-110%,var(--y),0)}}@keyframes Toastify__slideOutDown{0%{transform:translate3d(0,var(--y),0)}to{visibility:hidden;transform:translate3d(0,500px,0)}}@keyframes Toastify__slideOutUp{0%{transform:translate3d(0,var(--y),0)}to{visibility:hidden;transform:translate3d(0,-500px,0)}}.Toastify__slide-enter--top-left,.Toastify__slide-enter--bottom-left{animation-name:Toastify__slideInLeft}.Toastify__slide-enter--top-right,.Toastify__slide-enter--bottom-right{animation-name:Toastify__slideInRight}.Toastify__slide-enter--top-center{animation-name:Toastify__slideInDown}.Toastify__slide-enter--bottom-center{animation-name:Toastify__slideInUp}.Toastify__slide-exit--top-left,.Toastify__slide-exit--bottom-left{animation-name:Toastify__slideOutLeft;animation-timing-function:ease-in;animation-duration:.3s}.Toastify__slide-exit--top-right,.Toastify__slide-exit--bottom-right{animation-name:Toastify__slideOutRight;animation-timing-function:ease-in;animation-duration:.3s}.Toastify__slide-exit--top-center{animation-name:Toastify__slideOutUp;animation-timing-function:ease-in;animation-duration:.3s}.Toastify__slide-exit--bottom-center{animation-name:Toastify__slideOutDown;animation-timing-function:ease-in;animation-duration:.3s}@keyframes Toastify__spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}
`);
var bo = (e) => typeof e == "number" && !isNaN(e),
  rr = (e) => typeof e == "string",
  rn = (e) => typeof e == "function",
  Yw = (e) => rr(e) || bo(e),
  mu = (e) => (rr(e) || rn(e) ? e : null),
  Gw = (e, t) => (e === !1 || (bo(e) && e > 0) ? e : t),
  yu = (e) => v.isValidElement(e) || rr(e) || rn(e) || bo(e);
function Xw(e, t, n = 300) {
  let { scrollHeight: r, style: s } = e;
  requestAnimationFrame(() => {
    (s.minHeight = "initial"),
      (s.height = r + "px"),
      (s.transition = `all ${n}ms`),
      requestAnimationFrame(() => {
        (s.height = "0"), (s.padding = "0"), (s.margin = "0"), setTimeout(t, n);
      });
  });
}
function Jw({
  enter: e,
  exit: t,
  appendPosition: n = !1,
  collapse: r = !0,
  collapseDuration: s = 300,
}) {
  return function ({
    children: o,
    position: i,
    preventExitTransition: l,
    done: a,
    nodeRef: u,
    isIn: d,
    playToast: f,
  }) {
    let y = n ? `${e}--${i}` : e,
      g = n ? `${t}--${i}` : t,
      x = v.useRef(0);
    return (
      v.useLayoutEffect(() => {
        let b = u.current,
          w = y.split(" "),
          m = (h) => {
            h.target === u.current &&
              (f(),
              b.removeEventListener("animationend", m),
              b.removeEventListener("animationcancel", m),
              x.current === 0 &&
                h.type !== "animationcancel" &&
                b.classList.remove(...w));
          };
        b.classList.add(...w),
          b.addEventListener("animationend", m),
          b.addEventListener("animationcancel", m);
      }, []),
      v.useEffect(() => {
        let b = u.current,
          w = () => {
            b.removeEventListener("animationend", w), r ? Xw(b, a, s) : a();
          };
        d ||
          (l
            ? w()
            : ((x.current = 1),
              (b.className += ` ${g}`),
              b.addEventListener("animationend", w)));
      }, [d]),
      V.createElement(V.Fragment, null, o)
    );
  };
}
function Nf(e, t) {
  return {
    content: a0(e.content, e.props),
    containerId: e.props.containerId,
    id: e.props.toastId,
    theme: e.props.theme,
    type: e.props.type,
    data: e.props.data || {},
    isLoading: e.props.isLoading,
    icon: e.props.icon,
    reason: e.removalReason,
    status: t,
  };
}
function a0(e, t, n = !1) {
  return v.isValidElement(e) && !rr(e.type)
    ? v.cloneElement(e, {
        closeToast: t.closeToast,
        toastProps: t,
        data: t.data,
        isPaused: n,
      })
    : rn(e)
    ? e({ closeToast: t.closeToast, toastProps: t, data: t.data, isPaused: n })
    : e;
}
function Zw({ closeToast: e, theme: t, ariaLabel: n = "close" }) {
  return V.createElement(
    "button",
    {
      className: `Toastify__close-button Toastify__close-button--${t}`,
      type: "button",
      onClick: (r) => {
        r.stopPropagation(), e(!0);
      },
      "aria-label": n,
    },
    V.createElement(
      "svg",
      { "aria-hidden": "true", viewBox: "0 0 14 16" },
      V.createElement("path", {
        fillRule: "evenodd",
        d: "M7.71 8.23l3.75 3.75-1.48 1.48-3.75-3.75-3.75 3.75L1 11.98l3.75-3.75L1 4.48 2.48 3l3.75 3.75L9.98 3l1.48 1.48-3.75 3.75z",
      })
    )
  );
}
function eb({
  delay: e,
  isRunning: t,
  closeToast: n,
  type: r = "default",
  hide: s,
  className: o,
  controlledProgress: i,
  progress: l,
  rtl: a,
  isIn: u,
  theme: d,
}) {
  let f = s || (i && l === 0),
    y = {
      animationDuration: `${e}ms`,
      animationPlayState: t ? "running" : "paused",
    };
  i && (y.transform = `scaleX(${l})`);
  let g = Yn(
      "Toastify__progress-bar",
      i
        ? "Toastify__progress-bar--controlled"
        : "Toastify__progress-bar--animated",
      `Toastify__progress-bar-theme--${d}`,
      `Toastify__progress-bar--${r}`,
      { "Toastify__progress-bar--rtl": a }
    ),
    x = rn(o) ? o({ rtl: a, type: r, defaultClassName: g }) : Yn(g, o),
    b = {
      [i && l >= 1 ? "onTransitionEnd" : "onAnimationEnd"]:
        i && l < 1
          ? null
          : () => {
              u && n();
            },
    };
  return V.createElement(
    "div",
    { className: "Toastify__progress-bar--wrp", "data-hidden": f },
    V.createElement("div", {
      className: `Toastify__progress-bar--bg Toastify__progress-bar-theme--${d} Toastify__progress-bar--${r}`,
    }),
    V.createElement("div", {
      role: "progressbar",
      "aria-hidden": f ? "true" : "false",
      "aria-label": "notification timer",
      className: x,
      style: y,
      ...b,
    })
  );
}
var tb = 1,
  u0 = () => `${tb++}`;
function nb(e, t, n) {
  let r = 1,
    s = 0,
    o = [],
    i = [],
    l = t,
    a = new Map(),
    u = new Set(),
    d = (h) => (u.add(h), () => u.delete(h)),
    f = () => {
      (i = Array.from(a.values())), u.forEach((h) => h());
    },
    y = ({ containerId: h, toastId: p, updateId: E }) => {
      let _ = h ? h !== e : e !== 1,
        C = a.has(p) && E == null;
      return _ || C;
    },
    g = (h, p) => {
      a.forEach((E) => {
        var _;
        (p == null || p === E.props.toastId) &&
          ((_ = E.toggle) == null || _.call(E, h));
      });
    },
    x = (h) => {
      var p, E;
      (E = (p = h.props) == null ? void 0 : p.onClose) == null ||
        E.call(p, h.removalReason),
        (h.isActive = !1);
    },
    b = (h) => {
      if (h == null) a.forEach(x);
      else {
        let p = a.get(h);
        p && x(p);
      }
      f();
    },
    w = () => {
      (s -= o.length), (o = []);
    },
    m = (h) => {
      var p, E;
      let { toastId: _, updateId: C } = h.props,
        S = C == null;
      h.staleId && a.delete(h.staleId),
        (h.isActive = !0),
        a.set(_, h),
        f(),
        n(Nf(h, S ? "added" : "updated")),
        S && ((E = (p = h.props).onOpen) == null || E.call(p));
    };
  return {
    id: e,
    props: l,
    observe: d,
    toggle: g,
    removeToast: b,
    toasts: a,
    clearQueue: w,
    buildToast: (h, p) => {
      if (y(p)) return;
      let { toastId: E, updateId: _, data: C, staleId: S, delay: N } = p,
        R = _ == null;
      R && s++;
      let P = {
        ...l,
        style: l.toastStyle,
        key: r++,
        ...Object.fromEntries(Object.entries(p).filter(([I, U]) => U != null)),
        toastId: E,
        updateId: _,
        data: C,
        isIn: !1,
        className: mu(p.className || l.toastClassName),
        progressClassName: mu(p.progressClassName || l.progressClassName),
        autoClose: p.isLoading ? !1 : Gw(p.autoClose, l.autoClose),
        closeToast(I) {
          (a.get(E).removalReason = I), b(E);
        },
        deleteToast() {
          let I = a.get(E);
          if (I != null) {
            if (
              (n(Nf(I, "removed")),
              a.delete(E),
              s--,
              s < 0 && (s = 0),
              o.length > 0)
            ) {
              m(o.shift());
              return;
            }
            f();
          }
        },
      };
      (P.closeButton = l.closeButton),
        p.closeButton === !1 || yu(p.closeButton)
          ? (P.closeButton = p.closeButton)
          : p.closeButton === !0 &&
            (P.closeButton = yu(l.closeButton) ? l.closeButton : !0);
      let O = { content: h, props: P, staleId: S };
      l.limit && l.limit > 0 && s > l.limit && R
        ? o.push(O)
        : bo(N)
        ? setTimeout(() => {
            m(O);
          }, N)
        : m(O);
    },
    setProps(h) {
      l = h;
    },
    setToggle: (h, p) => {
      let E = a.get(h);
      E && (E.toggle = p);
    },
    isToastActive: (h) => {
      var p;
      return (p = a.get(h)) == null ? void 0 : p.isActive;
    },
    getSnapshot: () => i,
  };
}
var ze = new Map(),
  oo = [],
  gu = new Set(),
  rb = (e) => gu.forEach((t) => t(e)),
  c0 = () => ze.size > 0;
function sb() {
  oo.forEach((e) => f0(e.content, e.options)), (oo = []);
}
var ob = (e, { containerId: t }) => {
  var n;
  return (n = ze.get(t || 1)) == null ? void 0 : n.toasts.get(e);
};
function d0(e, t) {
  var n;
  if (t) return !!((n = ze.get(t)) != null && n.isToastActive(e));
  let r = !1;
  return (
    ze.forEach((s) => {
      s.isToastActive(e) && (r = !0);
    }),
    r
  );
}
function ib(e) {
  if (!c0()) {
    oo = oo.filter((t) => e != null && t.options.toastId !== e);
    return;
  }
  if (e == null || Yw(e))
    ze.forEach((t) => {
      t.removeToast(e);
    });
  else if (e && ("containerId" in e || "id" in e)) {
    let t = ze.get(e.containerId);
    t
      ? t.removeToast(e.id)
      : ze.forEach((n) => {
          n.removeToast(e.id);
        });
  }
}
var lb = (e = {}) => {
  ze.forEach((t) => {
    t.props.limit &&
      (!e.containerId || t.id === e.containerId) &&
      t.clearQueue();
  });
};
function f0(e, t) {
  yu(e) &&
    (c0() || oo.push({ content: e, options: t }),
    ze.forEach((n) => {
      n.buildToast(e, t);
    }));
}
function ab(e) {
  var t;
  (t = ze.get(e.containerId || 1)) == null || t.setToggle(e.id, e.fn);
}
function h0(e, t) {
  ze.forEach((n) => {
    (t == null ||
      !(t != null && t.containerId) ||
      (t == null ? void 0 : t.containerId) === n.id) &&
      n.toggle(e, t == null ? void 0 : t.id);
  });
}
function ub(e) {
  let t = e.containerId || 1;
  return {
    subscribe(n) {
      let r = nb(t, e, rb);
      ze.set(t, r);
      let s = r.observe(n);
      return (
        sb(),
        () => {
          s(), ze.delete(t);
        }
      );
    },
    setProps(n) {
      var r;
      (r = ze.get(t)) == null || r.setProps(n);
    },
    getSnapshot() {
      var n;
      return (n = ze.get(t)) == null ? void 0 : n.getSnapshot();
    },
  };
}
function cb(e) {
  return (
    gu.add(e),
    () => {
      gu.delete(e);
    }
  );
}
function db(e) {
  return e && (rr(e.toastId) || bo(e.toastId)) ? e.toastId : u0();
}
function Eo(e, t) {
  return f0(e, t), t.toastId;
}
function bl(e, t) {
  return { ...t, type: (t && t.type) || e, toastId: db(t) };
}
function El(e) {
  return (t, n) => Eo(t, bl(e, n));
}
function D(e, t) {
  return Eo(e, bl("default", t));
}
D.loading = (e, t) =>
  Eo(
    e,
    bl("default", {
      isLoading: !0,
      autoClose: !1,
      closeOnClick: !1,
      closeButton: !1,
      draggable: !1,
      ...t,
    })
  );
function fb(e, { pending: t, error: n, success: r }, s) {
  let o;
  t && (o = rr(t) ? D.loading(t, s) : D.loading(t.render, { ...s, ...t }));
  let i = {
      isLoading: null,
      autoClose: null,
      closeOnClick: null,
      closeButton: null,
      draggable: null,
    },
    l = (u, d, f) => {
      if (d == null) {
        D.dismiss(o);
        return;
      }
      let y = { type: u, ...i, ...s, data: f },
        g = rr(d) ? { render: d } : d;
      return o ? D.update(o, { ...y, ...g }) : D(g.render, { ...y, ...g }), f;
    },
    a = rn(e) ? e() : e;
  return a.then((u) => l("success", r, u)).catch((u) => l("error", n, u)), a;
}
D.promise = fb;
D.success = El("success");
D.info = El("info");
D.error = El("error");
D.warning = El("warning");
D.warn = D.warning;
D.dark = (e, t) => Eo(e, bl("default", { theme: "dark", ...t }));
function hb(e) {
  ib(e);
}
D.dismiss = hb;
D.clearWaitingQueue = lb;
D.isActive = d0;
D.update = (e, t = {}) => {
  let n = ob(e, t);
  if (n) {
    let { props: r, content: s } = n,
      o = { delay: 100, ...r, ...t, toastId: t.toastId || e, updateId: u0() };
    o.toastId !== e && (o.staleId = e);
    let i = o.render || s;
    delete o.render, Eo(i, o);
  }
};
D.done = (e) => {
  D.update(e, { progress: 1 });
};
D.onChange = cb;
D.play = (e) => h0(!0, e);
D.pause = (e) => h0(!1, e);
function pb(e) {
  var t;
  let { subscribe: n, getSnapshot: r, setProps: s } = v.useRef(ub(e)).current;
  s(e);
  let o = (t = v.useSyncExternalStore(n, r, r)) == null ? void 0 : t.slice();
  function i(l) {
    if (!o) return [];
    let a = new Map();
    return (
      e.newestOnTop && o.reverse(),
      o.forEach((u) => {
        let { position: d } = u.props;
        a.has(d) || a.set(d, []), a.get(d).push(u);
      }),
      Array.from(a, (u) => l(u[0], u[1]))
    );
  }
  return {
    getToastToRender: i,
    isToastActive: d0,
    count: o == null ? void 0 : o.length,
  };
}
function mb(e) {
  let [t, n] = v.useState(!1),
    [r, s] = v.useState(!1),
    o = v.useRef(null),
    i = v.useRef({
      start: 0,
      delta: 0,
      removalDistance: 0,
      canCloseOnClick: !0,
      canDrag: !1,
      didMove: !1,
    }).current,
    {
      autoClose: l,
      pauseOnHover: a,
      closeToast: u,
      onClick: d,
      closeOnClick: f,
    } = e;
  ab({ id: e.toastId, containerId: e.containerId, fn: n }),
    v.useEffect(() => {
      if (e.pauseOnFocusLoss)
        return (
          y(),
          () => {
            g();
          }
        );
    }, [e.pauseOnFocusLoss]);
  function y() {
    document.hasFocus() || m(),
      window.addEventListener("focus", w),
      window.addEventListener("blur", m);
  }
  function g() {
    window.removeEventListener("focus", w),
      window.removeEventListener("blur", m);
  }
  function x(S) {
    if (e.draggable === !0 || e.draggable === S.pointerType) {
      h();
      let N = o.current;
      (i.canCloseOnClick = !0),
        (i.canDrag = !0),
        (N.style.transition = "none"),
        e.draggableDirection === "x"
          ? ((i.start = S.clientX),
            (i.removalDistance = N.offsetWidth * (e.draggablePercent / 100)))
          : ((i.start = S.clientY),
            (i.removalDistance =
              (N.offsetHeight *
                (e.draggablePercent === 80
                  ? e.draggablePercent * 1.5
                  : e.draggablePercent)) /
              100));
    }
  }
  function b(S) {
    let {
      top: N,
      bottom: R,
      left: P,
      right: O,
    } = o.current.getBoundingClientRect();
    S.nativeEvent.type !== "touchend" &&
    e.pauseOnHover &&
    S.clientX >= P &&
    S.clientX <= O &&
    S.clientY >= N &&
    S.clientY <= R
      ? m()
      : w();
  }
  function w() {
    n(!0);
  }
  function m() {
    n(!1);
  }
  function h() {
    (i.didMove = !1),
      document.addEventListener("pointermove", E),
      document.addEventListener("pointerup", _);
  }
  function p() {
    document.removeEventListener("pointermove", E),
      document.removeEventListener("pointerup", _);
  }
  function E(S) {
    let N = o.current;
    if (i.canDrag && N) {
      (i.didMove = !0),
        t && m(),
        e.draggableDirection === "x"
          ? (i.delta = S.clientX - i.start)
          : (i.delta = S.clientY - i.start),
        i.start !== S.clientX && (i.canCloseOnClick = !1);
      let R =
        e.draggableDirection === "x"
          ? `${i.delta}px, var(--y)`
          : `0, calc(${i.delta}px + var(--y))`;
      (N.style.transform = `translate3d(${R},0)`),
        (N.style.opacity = `${1 - Math.abs(i.delta / i.removalDistance)}`);
    }
  }
  function _() {
    p();
    let S = o.current;
    if (i.canDrag && i.didMove && S) {
      if (((i.canDrag = !1), Math.abs(i.delta) > i.removalDistance)) {
        s(!0), e.closeToast(!0), e.collapseAll();
        return;
      }
      (S.style.transition = "transform 0.2s, opacity 0.2s"),
        S.style.removeProperty("transform"),
        S.style.removeProperty("opacity");
    }
  }
  let C = { onPointerDown: x, onPointerUp: b };
  return (
    l && a && ((C.onMouseEnter = m), e.stacked || (C.onMouseLeave = w)),
    f &&
      (C.onClick = (S) => {
        d && d(S), i.canCloseOnClick && u(!0);
      }),
    {
      playToast: w,
      pauseToast: m,
      isRunning: t,
      preventExitTransition: r,
      toastRef: o,
      eventHandlers: C,
    }
  );
}
var yb = typeof window < "u" ? v.useLayoutEffect : v.useEffect,
  Sl = ({ theme: e, type: t, isLoading: n, ...r }) =>
    V.createElement("svg", {
      viewBox: "0 0 24 24",
      width: "100%",
      height: "100%",
      fill:
        e === "colored" ? "currentColor" : `var(--toastify-icon-color-${t})`,
      ...r,
    });
function gb(e) {
  return V.createElement(
    Sl,
    { ...e },
    V.createElement("path", {
      d: "M23.32 17.191L15.438 2.184C14.728.833 13.416 0 11.996 0c-1.42 0-2.733.833-3.443 2.184L.533 17.448a4.744 4.744 0 000 4.368C1.243 23.167 2.555 24 3.975 24h16.05C22.22 24 24 22.044 24 19.632c0-.904-.251-1.746-.68-2.44zm-9.622 1.46c0 1.033-.724 1.823-1.698 1.823s-1.698-.79-1.698-1.822v-.043c0-1.028.724-1.822 1.698-1.822s1.698.79 1.698 1.822v.043zm.039-12.285l-.84 8.06c-.057.581-.408.943-.897.943-.49 0-.84-.367-.896-.942l-.84-8.065c-.057-.624.25-1.095.779-1.095h1.91c.528.005.84.476.784 1.1z",
    })
  );
}
function vb(e) {
  return V.createElement(
    Sl,
    { ...e },
    V.createElement("path", {
      d: "M12 0a12 12 0 1012 12A12.013 12.013 0 0012 0zm.25 5a1.5 1.5 0 11-1.5 1.5 1.5 1.5 0 011.5-1.5zm2.25 13.5h-4a1 1 0 010-2h.75a.25.25 0 00.25-.25v-4.5a.25.25 0 00-.25-.25h-.75a1 1 0 010-2h1a2 2 0 012 2v4.75a.25.25 0 00.25.25h.75a1 1 0 110 2z",
    })
  );
}
function xb(e) {
  return V.createElement(
    Sl,
    { ...e },
    V.createElement("path", {
      d: "M12 0a12 12 0 1012 12A12.014 12.014 0 0012 0zm6.927 8.2l-6.845 9.289a1.011 1.011 0 01-1.43.188l-4.888-3.908a1 1 0 111.25-1.562l4.076 3.261 6.227-8.451a1 1 0 111.61 1.183z",
    })
  );
}
function wb(e) {
  return V.createElement(
    Sl,
    { ...e },
    V.createElement("path", {
      d: "M11.983 0a12.206 12.206 0 00-8.51 3.653A11.8 11.8 0 000 12.207 11.779 11.779 0 0011.8 24h.214A12.111 12.111 0 0024 11.791 11.766 11.766 0 0011.983 0zM10.5 16.542a1.476 1.476 0 011.449-1.53h.027a1.527 1.527 0 011.523 1.47 1.475 1.475 0 01-1.449 1.53h-.027a1.529 1.529 0 01-1.523-1.47zM11 12.5v-6a1 1 0 012 0v6a1 1 0 11-2 0z",
    })
  );
}
function bb() {
  return V.createElement("div", { className: "Toastify__spinner" });
}
var vu = { info: vb, warning: gb, success: xb, error: wb, spinner: bb },
  Eb = (e) => e in vu;
function Sb({ theme: e, type: t, isLoading: n, icon: r }) {
  let s = null,
    o = { theme: e, type: t };
  return (
    r === !1 ||
      (rn(r)
        ? (s = r({ ...o, isLoading: n }))
        : v.isValidElement(r)
        ? (s = v.cloneElement(r, o))
        : n
        ? (s = vu.spinner())
        : Eb(t) && (s = vu[t](o))),
    s
  );
}
var Cb = (e) => {
    let {
        isRunning: t,
        preventExitTransition: n,
        toastRef: r,
        eventHandlers: s,
        playToast: o,
      } = mb(e),
      {
        closeButton: i,
        children: l,
        autoClose: a,
        onClick: u,
        type: d,
        hideProgressBar: f,
        closeToast: y,
        transition: g,
        position: x,
        className: b,
        style: w,
        progressClassName: m,
        updateId: h,
        role: p,
        progress: E,
        rtl: _,
        toastId: C,
        deleteToast: S,
        isIn: N,
        isLoading: R,
        closeOnClick: P,
        theme: O,
        ariaLabel: I,
      } = e,
      U = Yn(
        "Toastify__toast",
        `Toastify__toast-theme--${O}`,
        `Toastify__toast--${d}`,
        { "Toastify__toast--rtl": _ },
        { "Toastify__toast--close-on-click": P }
      ),
      K = rn(b)
        ? b({ rtl: _, position: x, type: d, defaultClassName: U })
        : Yn(U, b),
      Ee = Sb(e),
      fe = !!E || !a,
      Z = { closeToast: y, type: d, theme: O },
      T = null;
    return (
      i === !1 ||
        (rn(i)
          ? (T = i(Z))
          : v.isValidElement(i)
          ? (T = v.cloneElement(i, Z))
          : (T = Zw(Z))),
      V.createElement(
        g,
        {
          isIn: N,
          done: S,
          position: x,
          preventExitTransition: n,
          nodeRef: r,
          playToast: o,
        },
        V.createElement(
          "div",
          {
            id: C,
            tabIndex: 0,
            onClick: u,
            "data-in": N,
            className: K,
            ...s,
            style: w,
            ref: r,
            ...(N && { role: p, "aria-label": I }),
          },
          Ee != null &&
            V.createElement(
              "div",
              {
                className: Yn("Toastify__toast-icon", {
                  "Toastify--animate-icon Toastify__zoom-enter": !R,
                }),
              },
              Ee
            ),
          a0(l, e, !t),
          T,
          !e.customProgressBar &&
            V.createElement(eb, {
              ...(h && !fe ? { key: `p-${h}` } : {}),
              rtl: _,
              theme: O,
              delay: a,
              isRunning: t,
              isIn: N,
              closeToast: y,
              hide: f,
              type: d,
              className: m,
              controlledProgress: fe,
              progress: E || 0,
            })
        )
      )
    );
  },
  _b = (e, t = !1) => ({
    enter: `Toastify--animate Toastify__${e}-enter`,
    exit: `Toastify--animate Toastify__${e}-exit`,
    appendPosition: t,
  }),
  Nb = Jw(_b("bounce", !0)),
  jb = {
    position: "top-right",
    transition: Nb,
    autoClose: 5e3,
    closeButton: !0,
    pauseOnHover: !0,
    pauseOnFocusLoss: !0,
    draggable: "touch",
    draggablePercent: 80,
    draggableDirection: "x",
    role: "alert",
    theme: "light",
    "aria-label": "Notifications Alt+T",
    hotKeys: (e) => e.altKey && e.code === "KeyT",
  };
function kb(e) {
  let t = { ...jb, ...e },
    n = e.stacked,
    [r, s] = v.useState(!0),
    o = v.useRef(null),
    { getToastToRender: i, isToastActive: l, count: a } = pb(t),
    { className: u, style: d, rtl: f, containerId: y, hotKeys: g } = t;
  function x(w) {
    let m = Yn("Toastify__toast-container", `Toastify__toast-container--${w}`, {
      "Toastify__toast-container--rtl": f,
    });
    return rn(u)
      ? u({ position: w, rtl: f, defaultClassName: m })
      : Yn(m, mu(u));
  }
  function b() {
    n && (s(!0), D.play());
  }
  return (
    yb(() => {
      var w;
      if (n) {
        let m = o.current.querySelectorAll('[data-in="true"]'),
          h = 12,
          p = (w = t.position) == null ? void 0 : w.includes("top"),
          E = 0,
          _ = 0;
        Array.from(m)
          .reverse()
          .forEach((C, S) => {
            let N = C;
            N.classList.add("Toastify__toast--stacked"),
              S > 0 && (N.dataset.collapsed = `${r}`),
              N.dataset.pos || (N.dataset.pos = p ? "top" : "bot");
            let R = E * (r ? 0.2 : 1) + (r ? 0 : h * S);
            N.style.setProperty("--y", `${p ? R : R * -1}px`),
              N.style.setProperty("--g", `${h}`),
              N.style.setProperty("--s", `${1 - (r ? _ : 0)}`),
              (E += N.offsetHeight),
              (_ += 0.025);
          });
      }
    }, [r, a, n]),
    v.useEffect(() => {
      function w(m) {
        var h;
        let p = o.current;
        g(m) &&
          ((h = p.querySelector('[tabIndex="0"]')) == null || h.focus(),
          s(!1),
          D.pause()),
          m.key === "Escape" &&
            (document.activeElement === p ||
              (p != null && p.contains(document.activeElement))) &&
            (s(!0), D.play());
      }
      return (
        document.addEventListener("keydown", w),
        () => {
          document.removeEventListener("keydown", w);
        }
      );
    }, [g]),
    V.createElement(
      "section",
      {
        ref: o,
        className: "Toastify",
        id: y,
        onMouseEnter: () => {
          n && (s(!1), D.pause());
        },
        onMouseLeave: b,
        "aria-live": "polite",
        "aria-atomic": "false",
        "aria-relevant": "additions text",
        "aria-label": t["aria-label"],
      },
      i((w, m) => {
        let h = m.length ? { ...d } : { ...d, pointerEvents: "none" };
        return V.createElement(
          "div",
          {
            tabIndex: -1,
            className: x(w),
            "data-stacked": n,
            style: h,
            key: `c-${w}`,
          },
          m.map(({ content: p, props: E }) =>
            V.createElement(
              Cb,
              {
                ...E,
                stacked: n,
                collapseAll: b,
                isIn: l(E.toastId, E.containerId),
                key: `t-${E.key}`,
              },
              p
            )
          )
        );
      })
    )
  );
}
const Tb = () => {
    var f;
    const e = JSON.parse(localStorage.getItem("user")),
      t = localStorage.getItem("login_token"),
      n = Ae(),
      r = localStorage.getItem("role");
    v.useEffect(() => {
      t &&
        (r === "Teacher" && n("/dashboard/teacher"),
        r === "Student" && n("/dashboard/student"));
    }, [t, r]);
    const s = Bt();
    v.useEffect(() => {
      e &&
        (async () => {
          try {
            const g = await Rm(e == null ? void 0 : e._id);
            if (g.ok) {
              const x = await g.json();
              (x == null ? void 0 : x.user.role) === "Student" &&
                !x.user.isVerified &&
                n("/verifying");
            } else console.error("Failed to check verification status");
          } catch (g) {
            console.error("Error checking verification status:", g);
          }
        })();
    }, [e, n]);
    const [o, i] = v.useState({
        userName: ((f = s.state) == null ? void 0 : f.userName) || "",
        password: "",
        role: "Student",
      }),
      [l, a] = v.useState(""),
      u = (y) => {
        const { name: g, value: x } = y.target;
        i((b) => ({ ...b, [g]: x })), a("");
      },
      d = async (y) => {
        y.preventDefault();
        const { userName: g, password: x, role: b } = o;
        try {
          if (!g || !x || !b) {
            D.warn("All fields are required.", {
              position: "top-right",
              autoClose: 250,
              hideProgressBar: !1,
              closeOnClick: !0,
              pauseOnHover: !0,
              draggable: !0,
              progress: void 0,
              theme: "light",
            });
            return;
          }
          const w = await Iw(g, x, b);
          w.status === 200 &&
            (localStorage.removeItem("registration_token"),
            localStorage.removeItem("user"),
            localStorage.setItem("login_token", w.data.token),
            localStorage.setItem("username", w.data.userName),
            localStorage.setItem("role", w.data.role),
            D.success("Logged In Successfully.", {
              position: "top-right",
              autoClose: 250,
              hideProgressBar: !1,
              closeOnClick: !0,
              pauseOnHover: !0,
              draggable: !0,
              progress: void 0,
              theme: "light",
            }),
            w.data.role === "Teacher"
              ? (n("/dashboard/teacher"), window.location.reload())
              : (n("/dashboard/student"), window.location.reload()));
        } catch (w) {
          w.status === 401
            ? D.error("User  not found")
            : w.status === 402
            ? D.error("User is not verified")
            : w.status === 403
            ? D.error("Invalid password")
            : D.error(
                "Something went wrong, please try again or check the credentials"
              ),
            console.error("Error logging in:", w);
        }
      };
    return c.jsx("div", {
      className: "min-h-screen flex items-center justify-center bg-gray-100",
      children: c.jsxs("div", {
        className: "w-full max-w-md bg-white rounded-lg shadow-md p-8",
        children: [
          c.jsx("h2", {
            className: "text-2xl font-bold text-gray-800 text-center mb-6",
            children: "Login",
          }),
          c.jsxs("form", {
            onSubmit: d,
            children: [
              c.jsxs("div", {
                className: "mb-4",
                children: [
                  c.jsx("label", {
                    htmlFor: "userName",
                    className: "block text-sm font-semibold text-gray-700 mb-2",
                    children: "Username",
                  }),
                  c.jsx("input", {
                    disabled: !!s.state,
                    type: "text",
                    id: "userName",
                    name: "userName",
                    value: o.userName,
                    onChange: u,
                    className:
                      "w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400",
                    placeholder: "Enter your username",
                  }),
                ],
              }),
              c.jsxs("div", {
                className: "mb-4",
                children: [
                  c.jsx("label", {
                    htmlFor: "password",
                    className: "block text-sm font-semibold text-gray-700 mb-2",
                    children: "Password",
                  }),
                  c.jsx("input", {
                    type: "password",
                    id: "password",
                    name: "password",
                    value: o.password,
                    onChange: u,
                    className:
                      "w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400",
                    placeholder: "Enter your password",
                  }),
                ],
              }),
              c.jsxs("div", {
                className: "mb-4",
                children: [
                  c.jsx("label", {
                    htmlFor: "role",
                    className: "block text-sm font-semibold text-gray-700 mb-2",
                    children: "Role",
                  }),
                  c.jsxs("select", {
                    id: "role",
                    name: "role",
                    value: o.role,
                    onChange: u,
                    className:
                      "w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400",
                    children: [
                      c.jsx("option", {
                        value: "Student",
                        children: "Student",
                      }),
                      c.jsx("option", {
                        value: "Teacher",
                        children: "Teacher",
                      }),
                    ],
                  }),
                ],
              }),
              l &&
                c.jsx("div", {
                  className: "mb-4 text-red-600 text-sm font-semibold",
                  children: l,
                }),
              c.jsx("button", {
                type: "submit",
                className:
                  "w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 font-semibold",
                children: "Login",
              }),
            ],
          }),
          c.jsxs("div", {
            className: "mt-4 text-center text-sm text-gray-600",
            children: [
              "Don't have an account?",
              " ",
              c.jsx(Me, {
                to: "/register",
                className: "text-blue-500 hover:text-blue-700 font-semibold",
                children: "Register here",
              }),
            ],
          }),
          c.jsx("div", {
            className: "mt-4 text-center text-sm text-gray-600",
            children: c.jsxs(Me, {
              to: "/forgot-password",
              className: "text-blue-500 hover:text-blue-700 font-semibold",
              children: ["Forgot password?", " "],
            }),
          }),
        ],
      }),
    });
  },
  Rb = () => {
    const e = localStorage.getItem("registration_token"),
      t = Ae(),
      [n, r] = v.useState({
        fullName: "",
        userName: "",
        password: "",
        year: "",
        semester: "",
      }),
      [s, o] = v.useState(!0),
      [i, l] = v.useState([]);
    v.useEffect(() => {
      e ? t("/verifying") : o(!1);
    }, [e]);
    const a = (f) => ({ 1: [1, 2], 2: [3, 4], 3: [5, 6], 4: [7, 8] }[f] || []),
      u = (f) => {
        const { name: y, value: g } = f.target;
        if (y === "year") {
          const x = parseInt(g),
            b = a(x);
          l(b), r({ ...n, year: g, semester: "" });
        } else r({ ...n, [y]: g });
      },
      d = async (f) => {
        if ((f.preventDefault(), !n.fullName || !n.userName || !n.password)) {
          D.warn("Please fill required fields.", {
            position: "top-right",
            autoClose: 250,
            hideProgressBar: !1,
            closeOnClick: !0,
            pauseOnHover: !0,
            draggable: !0,
            progress: void 0,
            theme: "light",
          });
          return;
        }
        if (!n.year || !n.semester) {
          D.warn("Please select a valid year and semester.", {
            position: "top-right",
            autoClose: 250,
            hideProgressBar: !1,
            closeOnClick: !0,
            pauseOnHover: !0,
            draggable: !0,
            progress: void 0,
            theme: "light",
          });
          return;
        }
        try {
          const y = await Aw(
            n.fullName,
            n.userName,
            n.password,
            parseInt(n.year),
            parseInt(n.semester)
          );
          y.statusText
            ? (D.success("User registered successfully!", {
                position: "top-right",
                autoClose: 250,
                hideProgressBar: !1,
                closeOnClick: !0,
                pauseOnHover: !0,
                draggable: !0,
                progress: void 0,
                theme: "light",
              }),
              r({
                fullName: "",
                userName: "",
                password: "",
                year: "",
                semester: "",
              }),
              localStorage.setItem("registration_token", y.data.token),
              localStorage.setItem("user", JSON.stringify(y.data.student)),
              t("/verifying"))
            : y.status === 409 && D.error("Username already exists");
        } catch (y) {
          console.error("Error registering user:", y),
            D.error(y.response.data.message, {
              position: "top-right",
              autoClose: 250,
              hideProgressBar: !1,
              closeOnClick: !0,
              pauseOnHover: !0,
              draggable: !0,
              progress: void 0,
              theme: "light",
            });
        }
      };
    return s
      ? c.jsx("div", {
          className:
            "flex items-center justify-center min-h-screen bg-gray-100",
          children: c.jsx("p", {
            className: "text-gray-700",
            children: "Redirecting...",
          }),
        })
      : c.jsx("div", {
          className:
            "flex items-center justify-center min-h-screen p-6 bg-gray-100",
          children: c.jsxs("div", {
            className: "w-full max-w-md p-8 bg-white rounded-lg shadow-md",
            children: [
              c.jsx("h2", {
                className: "mb-6 text-2xl font-bold text-center text-gray-800",
                children: "Registration",
              }),
              c.jsxs("form", {
                onSubmit: d,
                children: [
                  c.jsxs("div", {
                    className: "mb-4",
                    children: [
                      c.jsx("label", {
                        htmlFor: "fullName",
                        className:
                          "block mb-2 text-sm font-semibold text-gray-700",
                        children: "Full Name",
                      }),
                      c.jsx("input", {
                        type: "text",
                        id: "fullName",
                        name: "fullName",
                        value: n.fullName,
                        onChange: u,
                        className:
                          "w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400",
                        placeholder: "Enter full name",
                      }),
                    ],
                  }),
                  c.jsxs("div", {
                    className: "mb-4",
                    children: [
                      c.jsx("label", {
                        htmlFor: "userName",
                        className:
                          "block mb-2 text-sm font-semibold text-gray-700",
                        children: "User Name",
                      }),
                      c.jsx("input", {
                        type: "text",
                        id: "userName",
                        name: "userName",
                        value: n.userName,
                        onChange: u,
                        className:
                          "w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400",
                        placeholder: "Enter username",
                      }),
                    ],
                  }),
                  c.jsxs("div", {
                    className: "mb-4",
                    children: [
                      c.jsx("label", {
                        htmlFor: "password",
                        className:
                          "block mb-2 text-sm font-semibold text-gray-700",
                        children: "Password",
                      }),
                      c.jsx("input", {
                        type: "password",
                        id: "password",
                        name: "password",
                        value: n.password,
                        onChange: u,
                        className:
                          "w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400",
                        placeholder: "Enter password",
                      }),
                    ],
                  }),
                  c.jsxs("div", {
                    className: "mb-4",
                    children: [
                      c.jsx("label", {
                        htmlFor: "year",
                        className:
                          "block mb-2 text-sm font-semibold text-gray-700",
                        children: "Year",
                      }),
                      c.jsxs("select", {
                        id: "year",
                        name: "year",
                        value: n.year,
                        onChange: u,
                        className:
                          "w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400",
                        children: [
                          c.jsx("option", {
                            value: "",
                            children: "Select Year",
                          }),
                          [1, 2, 3, 4].map((f) =>
                            c.jsx("option", { value: f, children: f }, f)
                          ),
                        ],
                      }),
                    ],
                  }),
                  c.jsxs("div", {
                    className: "mb-4",
                    children: [
                      c.jsx("label", {
                        htmlFor: "semester",
                        className:
                          "block mb-2 text-sm font-semibold text-gray-700",
                        children: "Semester",
                      }),
                      c.jsxs("select", {
                        id: "semester",
                        name: "semester",
                        value: n.semester,
                        onChange: u,
                        className:
                          "w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400",
                        disabled: !i.length,
                        children: [
                          c.jsx("option", {
                            value: "",
                            children: "Select Semester",
                          }),
                          i.map((f) =>
                            c.jsx("option", { value: f, children: f }, f)
                          ),
                        ],
                      }),
                    ],
                  }),
                  c.jsx("button", {
                    type: "submit",
                    className:
                      "w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400",
                    children: "Register",
                  }),
                ],
              }),
            ],
          }),
        });
  };
var p0 = {
    color: void 0,
    size: void 0,
    className: void 0,
    style: void 0,
    attr: void 0,
  },
  jf = V.createContext && V.createContext(p0),
  Ob = ["attr", "size", "title"];
function Pb(e, t) {
  if (e == null) return {};
  var n = Lb(e, t),
    r,
    s;
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    for (s = 0; s < o.length; s++)
      (r = o[s]),
        !(t.indexOf(r) >= 0) &&
          Object.prototype.propertyIsEnumerable.call(e, r) &&
          (n[r] = e[r]);
  }
  return n;
}
function Lb(e, t) {
  if (e == null) return {};
  var n = {};
  for (var r in e)
    if (Object.prototype.hasOwnProperty.call(e, r)) {
      if (t.indexOf(r) >= 0) continue;
      n[r] = e[r];
    }
  return n;
}
function Bi() {
  return (
    (Bi = Object.assign
      ? Object.assign.bind()
      : function (e) {
          for (var t = 1; t < arguments.length; t++) {
            var n = arguments[t];
            for (var r in n)
              Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
          }
          return e;
        }),
    Bi.apply(this, arguments)
  );
}
function kf(e, t) {
  var n = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(e);
    t &&
      (r = r.filter(function (s) {
        return Object.getOwnPropertyDescriptor(e, s).enumerable;
      })),
      n.push.apply(n, r);
  }
  return n;
}
function Hi(e) {
  for (var t = 1; t < arguments.length; t++) {
    var n = arguments[t] != null ? arguments[t] : {};
    t % 2
      ? kf(Object(n), !0).forEach(function (r) {
          Ab(e, r, n[r]);
        })
      : Object.getOwnPropertyDescriptors
      ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
      : kf(Object(n)).forEach(function (r) {
          Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(n, r));
        });
  }
  return e;
}
function Ab(e, t, n) {
  return (
    (t = Ib(t)),
    t in e
      ? Object.defineProperty(e, t, {
          value: n,
          enumerable: !0,
          configurable: !0,
          writable: !0,
        })
      : (e[t] = n),
    e
  );
}
function Ib(e) {
  var t = Fb(e, "string");
  return typeof t == "symbol" ? t : t + "";
}
function Fb(e, t) {
  if (typeof e != "object" || !e) return e;
  var n = e[Symbol.toPrimitive];
  if (n !== void 0) {
    var r = n.call(e, t || "default");
    if (typeof r != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (t === "string" ? String : Number)(e);
}
function m0(e) {
  return (
    e &&
    e.map((t, n) => V.createElement(t.tag, Hi({ key: n }, t.attr), m0(t.child)))
  );
}
function Ht(e) {
  return (t) =>
    V.createElement(Db, Bi({ attr: Hi({}, e.attr) }, t), m0(e.child));
}
function Db(e) {
  var t = (n) => {
    var { attr: r, size: s, title: o } = e,
      i = Pb(e, Ob),
      l = s || n.size || "1em",
      a;
    return (
      n.className && (a = n.className),
      e.className && (a = (a ? a + " " : "") + e.className),
      V.createElement(
        "svg",
        Bi(
          { stroke: "currentColor", fill: "currentColor", strokeWidth: "0" },
          n.attr,
          r,
          i,
          {
            className: a,
            style: Hi(Hi({ color: e.color || n.color }, n.style), e.style),
            height: l,
            width: l,
            xmlns: "http://www.w3.org/2000/svg",
          }
        ),
        o && V.createElement("title", null, o),
        e.children
      )
    );
  };
  return jf !== void 0
    ? V.createElement(jf.Consumer, null, (n) => t(n))
    : t(p0);
}
function y0(e) {
  return Ht({
    tag: "svg",
    attr: { viewBox: "0 0 448 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z",
        },
        child: [],
      },
    ],
  })(e);
}
function Mb(e) {
  return Ht({
    tag: "svg",
    attr: { viewBox: "0 0 448 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64zm215.39-149.71c-19.32-20.76-55.47-51.99-55.47-154.29 0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29-6 6.45-8.66 14.16-8.61 21.71.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32 .05-7.55-2.61-15.27-8.61-21.71z",
        },
        child: [],
      },
    ],
  })(e);
}
function zb(e) {
  return Ht({
    tag: "svg",
    attr: { viewBox: "0 0 448 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M448 360V24c0-13.3-10.7-24-24-24H96C43 0 0 43 0 96v320c0 53 43 96 96 96h328c13.3 0 24-10.7 24-24v-16c0-7.5-3.5-14.3-8.9-18.7-4.2-15.4-4.2-59.3 0-74.7 5.4-4.3 8.9-11.1 8.9-18.6zM128 134c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm0 64c0-3.3 2.7-6 6-6h212c3.3 0 6 2.7 6 6v20c0 3.3-2.7 6-6 6H134c-3.3 0-6-2.7-6-6v-20zm253.4 250H96c-17.7 0-32-14.3-32-32 0-17.6 14.4-32 32-32h285.4c-1.9 17.1-1.9 46.9 0 64z",
        },
        child: [],
      },
    ],
  })(e);
}
function Tf(e) {
  return Ht({
    tag: "svg",
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z",
        },
        child: [],
      },
    ],
  })(e);
}
function Rf(e) {
  return Ht({
    tag: "svg",
    attr: { viewBox: "0 0 448 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z",
        },
        child: [],
      },
    ],
  })(e);
}
function Of(e) {
  return Ht({
    tag: "svg",
    attr: { viewBox: "0 0 448 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z",
        },
        child: [],
      },
    ],
  })(e);
}
function $b(e) {
  return Ht({
    tag: "svg",
    attr: { viewBox: "0 0 384 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm64 236c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12v8zm0-64c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12v8zm0-72v8c0 6.6-5.4 12-12 12H108c-6.6 0-12-5.4-12-12v-8c0-6.6 5.4-12 12-12h168c6.6 0 12 5.4 12 12zm96-114.1v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z",
        },
        child: [],
      },
    ],
  })(e);
}
function ca(e) {
  return Ht({
    tag: "svg",
    attr: { viewBox: "0 0 512 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M464 480H48c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h416c26.51 0 48 21.49 48 48v352c0 26.51-21.49 48-48 48zM128 120c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zm0 96c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zm0 96c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zm288-136v-32c0-6.627-5.373-12-12-12H204c-6.627 0-12 5.373-12 12v32c0 6.627 5.373 12 12 12h200c6.627 0 12-5.373 12-12zm0 96v-32c0-6.627-5.373-12-12-12H204c-6.627 0-12 5.373-12 12v32c0 6.627 5.373 12 12 12h200c6.627 0 12-5.373 12-12zm0 96v-32c0-6.627-5.373-12-12-12H204c-6.627 0-12 5.373-12 12v32c0 6.627 5.373 12 12 12h200c6.627 0 12-5.373 12-12z",
        },
        child: [],
      },
    ],
  })(e);
}
function Qi(e) {
  return Ht({
    tag: "svg",
    attr: { viewBox: "0 0 448 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z",
        },
        child: [],
      },
    ],
  })(e);
}
function g0(e) {
  return Ht({
    tag: "svg",
    attr: { viewBox: "0 0 448 512" },
    child: [
      {
        tag: "path",
        attr: {
          d: "M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z",
        },
        child: [],
      },
    ],
  })(e);
}
class ts {
  constructor() {
    (this.listeners = new Set()), (this.subscribe = this.subscribe.bind(this));
  }
  subscribe(t) {
    const n = { listener: t };
    return (
      this.listeners.add(n),
      this.onSubscribe(),
      () => {
        this.listeners.delete(n), this.onUnsubscribe();
      }
    );
  }
  hasListeners() {
    return this.listeners.size > 0;
  }
  onSubscribe() {}
  onUnsubscribe() {}
}
const io = typeof window > "u" || "Deno" in window;
function ct() {}
function Ub(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function xu(e) {
  return typeof e == "number" && e >= 0 && e !== 1 / 0;
}
function v0(e, t) {
  return Math.max(e + (t || 0) - Date.now(), 0);
}
function Rs(e, t, n) {
  return So(e)
    ? typeof t == "function"
      ? { ...n, queryKey: e, queryFn: t }
      : { ...t, queryKey: e }
    : e;
}
function Bb(e, t, n) {
  return So(e)
    ? { ...t, mutationKey: e }
    : typeof e == "function"
    ? { ...t, mutationFn: e }
    : { ...e };
}
function pn(e, t, n) {
  return So(e) ? [{ ...t, queryKey: e }, n] : [e || {}, t];
}
function Pf(e, t) {
  const {
    type: n = "all",
    exact: r,
    fetchStatus: s,
    predicate: o,
    queryKey: i,
    stale: l,
  } = e;
  if (So(i)) {
    if (r) {
      if (t.queryHash !== Ac(i, t.options)) return !1;
    } else if (!qi(t.queryKey, i)) return !1;
  }
  if (n !== "all") {
    const a = t.isActive();
    if ((n === "active" && !a) || (n === "inactive" && a)) return !1;
  }
  return !(
    (typeof l == "boolean" && t.isStale() !== l) ||
    (typeof s < "u" && s !== t.state.fetchStatus) ||
    (o && !o(t))
  );
}
function Lf(e, t) {
  const { exact: n, fetching: r, predicate: s, mutationKey: o } = e;
  if (So(o)) {
    if (!t.options.mutationKey) return !1;
    if (n) {
      if (qn(t.options.mutationKey) !== qn(o)) return !1;
    } else if (!qi(t.options.mutationKey, o)) return !1;
  }
  return !(
    (typeof r == "boolean" && (t.state.status === "loading") !== r) ||
    (s && !s(t))
  );
}
function Ac(e, t) {
  return ((t == null ? void 0 : t.queryKeyHashFn) || qn)(e);
}
function qn(e) {
  return JSON.stringify(e, (t, n) =>
    wu(n)
      ? Object.keys(n)
          .sort()
          .reduce((r, s) => ((r[s] = n[s]), r), {})
      : n
  );
}
function qi(e, t) {
  return x0(e, t);
}
function x0(e, t) {
  return e === t
    ? !0
    : typeof e != typeof t
    ? !1
    : e && t && typeof e == "object" && typeof t == "object"
    ? !Object.keys(t).some((n) => !x0(e[n], t[n]))
    : !1;
}
function w0(e, t) {
  if (e === t) return e;
  const n = Af(e) && Af(t);
  if (n || (wu(e) && wu(t))) {
    const r = n ? e.length : Object.keys(e).length,
      s = n ? t : Object.keys(t),
      o = s.length,
      i = n ? [] : {};
    let l = 0;
    for (let a = 0; a < o; a++) {
      const u = n ? a : s[a];
      (i[u] = w0(e[u], t[u])), i[u] === e[u] && l++;
    }
    return r === o && l === r ? e : i;
  }
  return t;
}
function Vi(e, t) {
  if ((e && !t) || (t && !e)) return !1;
  for (const n in e) if (e[n] !== t[n]) return !1;
  return !0;
}
function Af(e) {
  return Array.isArray(e) && e.length === Object.keys(e).length;
}
function wu(e) {
  if (!If(e)) return !1;
  const t = e.constructor;
  if (typeof t > "u") return !0;
  const n = t.prototype;
  return !(!If(n) || !n.hasOwnProperty("isPrototypeOf"));
}
function If(e) {
  return Object.prototype.toString.call(e) === "[object Object]";
}
function So(e) {
  return Array.isArray(e);
}
function b0(e) {
  return new Promise((t) => {
    setTimeout(t, e);
  });
}
function Ff(e) {
  b0(0).then(e);
}
function Hb() {
  if (typeof AbortController == "function") return new AbortController();
}
function bu(e, t, n) {
  return n.isDataEqual != null && n.isDataEqual(e, t)
    ? e
    : typeof n.structuralSharing == "function"
    ? n.structuralSharing(e, t)
    : n.structuralSharing !== !1
    ? w0(e, t)
    : t;
}
class Qb extends ts {
  constructor() {
    super(),
      (this.setup = (t) => {
        if (!io && window.addEventListener) {
          const n = () => t();
          return (
            window.addEventListener("visibilitychange", n, !1),
            window.addEventListener("focus", n, !1),
            () => {
              window.removeEventListener("visibilitychange", n),
                window.removeEventListener("focus", n);
            }
          );
        }
      });
  }
  onSubscribe() {
    this.cleanup || this.setEventListener(this.setup);
  }
  onUnsubscribe() {
    if (!this.hasListeners()) {
      var t;
      (t = this.cleanup) == null || t.call(this), (this.cleanup = void 0);
    }
  }
  setEventListener(t) {
    var n;
    (this.setup = t),
      (n = this.cleanup) == null || n.call(this),
      (this.cleanup = t((r) => {
        typeof r == "boolean" ? this.setFocused(r) : this.onFocus();
      }));
  }
  setFocused(t) {
    this.focused !== t && ((this.focused = t), this.onFocus());
  }
  onFocus() {
    this.listeners.forEach(({ listener: t }) => {
      t();
    });
  }
  isFocused() {
    return typeof this.focused == "boolean"
      ? this.focused
      : typeof document > "u"
      ? !0
      : [void 0, "visible", "prerender"].includes(document.visibilityState);
  }
}
const Wi = new Qb(),
  Df = ["online", "offline"];
class qb extends ts {
  constructor() {
    super(),
      (this.setup = (t) => {
        if (!io && window.addEventListener) {
          const n = () => t();
          return (
            Df.forEach((r) => {
              window.addEventListener(r, n, !1);
            }),
            () => {
              Df.forEach((r) => {
                window.removeEventListener(r, n);
              });
            }
          );
        }
      });
  }
  onSubscribe() {
    this.cleanup || this.setEventListener(this.setup);
  }
  onUnsubscribe() {
    if (!this.hasListeners()) {
      var t;
      (t = this.cleanup) == null || t.call(this), (this.cleanup = void 0);
    }
  }
  setEventListener(t) {
    var n;
    (this.setup = t),
      (n = this.cleanup) == null || n.call(this),
      (this.cleanup = t((r) => {
        typeof r == "boolean" ? this.setOnline(r) : this.onOnline();
      }));
  }
  setOnline(t) {
    this.online !== t && ((this.online = t), this.onOnline());
  }
  onOnline() {
    this.listeners.forEach(({ listener: t }) => {
      t();
    });
  }
  isOnline() {
    return typeof this.online == "boolean"
      ? this.online
      : typeof navigator > "u" || typeof navigator.onLine > "u"
      ? !0
      : navigator.onLine;
  }
}
const Ki = new qb();
function Vb(e) {
  return Math.min(1e3 * 2 ** e, 3e4);
}
function Cl(e) {
  return (e ?? "online") === "online" ? Ki.isOnline() : !0;
}
class E0 {
  constructor(t) {
    (this.revert = t == null ? void 0 : t.revert),
      (this.silent = t == null ? void 0 : t.silent);
  }
}
function pi(e) {
  return e instanceof E0;
}
function S0(e) {
  let t = !1,
    n = 0,
    r = !1,
    s,
    o,
    i;
  const l = new Promise((w, m) => {
      (o = w), (i = m);
    }),
    a = (w) => {
      r || (g(new E0(w)), e.abort == null || e.abort());
    },
    u = () => {
      t = !0;
    },
    d = () => {
      t = !1;
    },
    f = () => !Wi.isFocused() || (e.networkMode !== "always" && !Ki.isOnline()),
    y = (w) => {
      r ||
        ((r = !0),
        e.onSuccess == null || e.onSuccess(w),
        s == null || s(),
        o(w));
    },
    g = (w) => {
      r ||
        ((r = !0), e.onError == null || e.onError(w), s == null || s(), i(w));
    },
    x = () =>
      new Promise((w) => {
        (s = (m) => {
          const h = r || !f();
          return h && w(m), h;
        }),
          e.onPause == null || e.onPause();
      }).then(() => {
        (s = void 0), r || e.onContinue == null || e.onContinue();
      }),
    b = () => {
      if (r) return;
      let w;
      try {
        w = e.fn();
      } catch (m) {
        w = Promise.reject(m);
      }
      Promise.resolve(w)
        .then(y)
        .catch((m) => {
          var h, p;
          if (r) return;
          const E = (h = e.retry) != null ? h : 3,
            _ = (p = e.retryDelay) != null ? p : Vb,
            C = typeof _ == "function" ? _(n, m) : _,
            S =
              E === !0 ||
              (typeof E == "number" && n < E) ||
              (typeof E == "function" && E(n, m));
          if (t || !S) {
            g(m);
            return;
          }
          n++,
            e.onFail == null || e.onFail(n, m),
            b0(C)
              .then(() => {
                if (f()) return x();
              })
              .then(() => {
                t ? g(m) : b();
              });
        });
    };
  return (
    Cl(e.networkMode) ? b() : x().then(b),
    {
      promise: l,
      cancel: a,
      continue: () => ((s == null ? void 0 : s()) ? l : Promise.resolve()),
      cancelRetry: u,
      continueRetry: d,
    }
  );
}
const Ic = console;
function Wb() {
  let e = [],
    t = 0,
    n = (d) => {
      d();
    },
    r = (d) => {
      d();
    };
  const s = (d) => {
      let f;
      t++;
      try {
        f = d();
      } finally {
        t--, t || l();
      }
      return f;
    },
    o = (d) => {
      t
        ? e.push(d)
        : Ff(() => {
            n(d);
          });
    },
    i =
      (d) =>
      (...f) => {
        o(() => {
          d(...f);
        });
      },
    l = () => {
      const d = e;
      (e = []),
        d.length &&
          Ff(() => {
            r(() => {
              d.forEach((f) => {
                n(f);
              });
            });
          });
    };
  return {
    batch: s,
    batchCalls: i,
    schedule: o,
    setNotifyFunction: (d) => {
      n = d;
    },
    setBatchNotifyFunction: (d) => {
      r = d;
    },
  };
}
const pe = Wb();
class C0 {
  destroy() {
    this.clearGcTimeout();
  }
  scheduleGc() {
    this.clearGcTimeout(),
      xu(this.cacheTime) &&
        (this.gcTimeout = setTimeout(() => {
          this.optionalRemove();
        }, this.cacheTime));
  }
  updateCacheTime(t) {
    this.cacheTime = Math.max(
      this.cacheTime || 0,
      t ?? (io ? 1 / 0 : 5 * 60 * 1e3)
    );
  }
  clearGcTimeout() {
    this.gcTimeout && (clearTimeout(this.gcTimeout), (this.gcTimeout = void 0));
  }
}
class Kb extends C0 {
  constructor(t) {
    super(),
      (this.abortSignalConsumed = !1),
      (this.defaultOptions = t.defaultOptions),
      this.setOptions(t.options),
      (this.observers = []),
      (this.cache = t.cache),
      (this.logger = t.logger || Ic),
      (this.queryKey = t.queryKey),
      (this.queryHash = t.queryHash),
      (this.initialState = t.state || Yb(this.options)),
      (this.state = this.initialState),
      this.scheduleGc();
  }
  get meta() {
    return this.options.meta;
  }
  setOptions(t) {
    (this.options = { ...this.defaultOptions, ...t }),
      this.updateCacheTime(this.options.cacheTime);
  }
  optionalRemove() {
    !this.observers.length &&
      this.state.fetchStatus === "idle" &&
      this.cache.remove(this);
  }
  setData(t, n) {
    const r = bu(this.state.data, t, this.options);
    return (
      this.dispatch({
        data: r,
        type: "success",
        dataUpdatedAt: n == null ? void 0 : n.updatedAt,
        manual: n == null ? void 0 : n.manual,
      }),
      r
    );
  }
  setState(t, n) {
    this.dispatch({ type: "setState", state: t, setStateOptions: n });
  }
  cancel(t) {
    var n;
    const r = this.promise;
    return (
      (n = this.retryer) == null || n.cancel(t),
      r ? r.then(ct).catch(ct) : Promise.resolve()
    );
  }
  destroy() {
    super.destroy(), this.cancel({ silent: !0 });
  }
  reset() {
    this.destroy(), this.setState(this.initialState);
  }
  isActive() {
    return this.observers.some((t) => t.options.enabled !== !1);
  }
  isDisabled() {
    return this.getObserversCount() > 0 && !this.isActive();
  }
  isStale() {
    return (
      this.state.isInvalidated ||
      !this.state.dataUpdatedAt ||
      this.observers.some((t) => t.getCurrentResult().isStale)
    );
  }
  isStaleByTime(t = 0) {
    return (
      this.state.isInvalidated ||
      !this.state.dataUpdatedAt ||
      !v0(this.state.dataUpdatedAt, t)
    );
  }
  onFocus() {
    var t;
    const n = this.observers.find((r) => r.shouldFetchOnWindowFocus());
    n && n.refetch({ cancelRefetch: !1 }),
      (t = this.retryer) == null || t.continue();
  }
  onOnline() {
    var t;
    const n = this.observers.find((r) => r.shouldFetchOnReconnect());
    n && n.refetch({ cancelRefetch: !1 }),
      (t = this.retryer) == null || t.continue();
  }
  addObserver(t) {
    this.observers.includes(t) ||
      (this.observers.push(t),
      this.clearGcTimeout(),
      this.cache.notify({ type: "observerAdded", query: this, observer: t }));
  }
  removeObserver(t) {
    this.observers.includes(t) &&
      ((this.observers = this.observers.filter((n) => n !== t)),
      this.observers.length ||
        (this.retryer &&
          (this.abortSignalConsumed
            ? this.retryer.cancel({ revert: !0 })
            : this.retryer.cancelRetry()),
        this.scheduleGc()),
      this.cache.notify({ type: "observerRemoved", query: this, observer: t }));
  }
  getObserversCount() {
    return this.observers.length;
  }
  invalidate() {
    this.state.isInvalidated || this.dispatch({ type: "invalidate" });
  }
  fetch(t, n) {
    var r, s;
    if (this.state.fetchStatus !== "idle") {
      if (this.state.dataUpdatedAt && n != null && n.cancelRefetch)
        this.cancel({ silent: !0 });
      else if (this.promise) {
        var o;
        return (o = this.retryer) == null || o.continueRetry(), this.promise;
      }
    }
    if ((t && this.setOptions(t), !this.options.queryFn)) {
      const g = this.observers.find((x) => x.options.queryFn);
      g && this.setOptions(g.options);
    }
    const i = Hb(),
      l = { queryKey: this.queryKey, pageParam: void 0, meta: this.meta },
      a = (g) => {
        Object.defineProperty(g, "signal", {
          enumerable: !0,
          get: () => {
            if (i) return (this.abortSignalConsumed = !0), i.signal;
          },
        });
      };
    a(l);
    const u = () =>
        this.options.queryFn
          ? ((this.abortSignalConsumed = !1), this.options.queryFn(l))
          : Promise.reject(
              "Missing queryFn for queryKey '" + this.options.queryHash + "'"
            ),
      d = {
        fetchOptions: n,
        options: this.options,
        queryKey: this.queryKey,
        state: this.state,
        fetchFn: u,
      };
    if (
      (a(d),
      (r = this.options.behavior) == null || r.onFetch(d),
      (this.revertState = this.state),
      this.state.fetchStatus === "idle" ||
        this.state.fetchMeta !==
          ((s = d.fetchOptions) == null ? void 0 : s.meta))
    ) {
      var f;
      this.dispatch({
        type: "fetch",
        meta: (f = d.fetchOptions) == null ? void 0 : f.meta,
      });
    }
    const y = (g) => {
      if (
        ((pi(g) && g.silent) || this.dispatch({ type: "error", error: g }),
        !pi(g))
      ) {
        var x, b, w, m;
        (x = (b = this.cache.config).onError) == null || x.call(b, g, this),
          (w = (m = this.cache.config).onSettled) == null ||
            w.call(m, this.state.data, g, this);
      }
      this.isFetchingOptimistic || this.scheduleGc(),
        (this.isFetchingOptimistic = !1);
    };
    return (
      (this.retryer = S0({
        fn: d.fetchFn,
        abort: i == null ? void 0 : i.abort.bind(i),
        onSuccess: (g) => {
          var x, b, w, m;
          if (typeof g > "u") {
            y(new Error(this.queryHash + " data is undefined"));
            return;
          }
          this.setData(g),
            (x = (b = this.cache.config).onSuccess) == null ||
              x.call(b, g, this),
            (w = (m = this.cache.config).onSettled) == null ||
              w.call(m, g, this.state.error, this),
            this.isFetchingOptimistic || this.scheduleGc(),
            (this.isFetchingOptimistic = !1);
        },
        onError: y,
        onFail: (g, x) => {
          this.dispatch({ type: "failed", failureCount: g, error: x });
        },
        onPause: () => {
          this.dispatch({ type: "pause" });
        },
        onContinue: () => {
          this.dispatch({ type: "continue" });
        },
        retry: d.options.retry,
        retryDelay: d.options.retryDelay,
        networkMode: d.options.networkMode,
      })),
      (this.promise = this.retryer.promise),
      this.promise
    );
  }
  dispatch(t) {
    const n = (r) => {
      var s, o;
      switch (t.type) {
        case "failed":
          return {
            ...r,
            fetchFailureCount: t.failureCount,
            fetchFailureReason: t.error,
          };
        case "pause":
          return { ...r, fetchStatus: "paused" };
        case "continue":
          return { ...r, fetchStatus: "fetching" };
        case "fetch":
          return {
            ...r,
            fetchFailureCount: 0,
            fetchFailureReason: null,
            fetchMeta: (s = t.meta) != null ? s : null,
            fetchStatus: Cl(this.options.networkMode) ? "fetching" : "paused",
            ...(!r.dataUpdatedAt && { error: null, status: "loading" }),
          };
        case "success":
          return {
            ...r,
            data: t.data,
            dataUpdateCount: r.dataUpdateCount + 1,
            dataUpdatedAt: (o = t.dataUpdatedAt) != null ? o : Date.now(),
            error: null,
            isInvalidated: !1,
            status: "success",
            ...(!t.manual && {
              fetchStatus: "idle",
              fetchFailureCount: 0,
              fetchFailureReason: null,
            }),
          };
        case "error":
          const i = t.error;
          return pi(i) && i.revert && this.revertState
            ? { ...this.revertState, fetchStatus: "idle" }
            : {
                ...r,
                error: i,
                errorUpdateCount: r.errorUpdateCount + 1,
                errorUpdatedAt: Date.now(),
                fetchFailureCount: r.fetchFailureCount + 1,
                fetchFailureReason: i,
                fetchStatus: "idle",
                status: "error",
              };
        case "invalidate":
          return { ...r, isInvalidated: !0 };
        case "setState":
          return { ...r, ...t.state };
      }
    };
    (this.state = n(this.state)),
      pe.batch(() => {
        this.observers.forEach((r) => {
          r.onQueryUpdate(t);
        }),
          this.cache.notify({ query: this, type: "updated", action: t });
      });
  }
}
function Yb(e) {
  const t =
      typeof e.initialData == "function" ? e.initialData() : e.initialData,
    n = typeof t < "u",
    r = n
      ? typeof e.initialDataUpdatedAt == "function"
        ? e.initialDataUpdatedAt()
        : e.initialDataUpdatedAt
      : 0;
  return {
    data: t,
    dataUpdateCount: 0,
    dataUpdatedAt: n ? r ?? Date.now() : 0,
    error: null,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchMeta: null,
    isInvalidated: !1,
    status: n ? "success" : "loading",
    fetchStatus: "idle",
  };
}
class Gb extends ts {
  constructor(t) {
    super(),
      (this.config = t || {}),
      (this.queries = []),
      (this.queriesMap = {});
  }
  build(t, n, r) {
    var s;
    const o = n.queryKey,
      i = (s = n.queryHash) != null ? s : Ac(o, n);
    let l = this.get(i);
    return (
      l ||
        ((l = new Kb({
          cache: this,
          logger: t.getLogger(),
          queryKey: o,
          queryHash: i,
          options: t.defaultQueryOptions(n),
          state: r,
          defaultOptions: t.getQueryDefaults(o),
        })),
        this.add(l)),
      l
    );
  }
  add(t) {
    this.queriesMap[t.queryHash] ||
      ((this.queriesMap[t.queryHash] = t),
      this.queries.push(t),
      this.notify({ type: "added", query: t }));
  }
  remove(t) {
    const n = this.queriesMap[t.queryHash];
    n &&
      (t.destroy(),
      (this.queries = this.queries.filter((r) => r !== t)),
      n === t && delete this.queriesMap[t.queryHash],
      this.notify({ type: "removed", query: t }));
  }
  clear() {
    pe.batch(() => {
      this.queries.forEach((t) => {
        this.remove(t);
      });
    });
  }
  get(t) {
    return this.queriesMap[t];
  }
  getAll() {
    return this.queries;
  }
  find(t, n) {
    const [r] = pn(t, n);
    return (
      typeof r.exact > "u" && (r.exact = !0), this.queries.find((s) => Pf(r, s))
    );
  }
  findAll(t, n) {
    const [r] = pn(t, n);
    return Object.keys(r).length > 0
      ? this.queries.filter((s) => Pf(r, s))
      : this.queries;
  }
  notify(t) {
    pe.batch(() => {
      this.listeners.forEach(({ listener: n }) => {
        n(t);
      });
    });
  }
  onFocus() {
    pe.batch(() => {
      this.queries.forEach((t) => {
        t.onFocus();
      });
    });
  }
  onOnline() {
    pe.batch(() => {
      this.queries.forEach((t) => {
        t.onOnline();
      });
    });
  }
}
class Xb extends C0 {
  constructor(t) {
    super(),
      (this.defaultOptions = t.defaultOptions),
      (this.mutationId = t.mutationId),
      (this.mutationCache = t.mutationCache),
      (this.logger = t.logger || Ic),
      (this.observers = []),
      (this.state = t.state || _0()),
      this.setOptions(t.options),
      this.scheduleGc();
  }
  setOptions(t) {
    (this.options = { ...this.defaultOptions, ...t }),
      this.updateCacheTime(this.options.cacheTime);
  }
  get meta() {
    return this.options.meta;
  }
  setState(t) {
    this.dispatch({ type: "setState", state: t });
  }
  addObserver(t) {
    this.observers.includes(t) ||
      (this.observers.push(t),
      this.clearGcTimeout(),
      this.mutationCache.notify({
        type: "observerAdded",
        mutation: this,
        observer: t,
      }));
  }
  removeObserver(t) {
    (this.observers = this.observers.filter((n) => n !== t)),
      this.scheduleGc(),
      this.mutationCache.notify({
        type: "observerRemoved",
        mutation: this,
        observer: t,
      });
  }
  optionalRemove() {
    this.observers.length ||
      (this.state.status === "loading"
        ? this.scheduleGc()
        : this.mutationCache.remove(this));
  }
  continue() {
    var t, n;
    return (t = (n = this.retryer) == null ? void 0 : n.continue()) != null
      ? t
      : this.execute();
  }
  async execute() {
    const t = () => {
        var S;
        return (
          (this.retryer = S0({
            fn: () =>
              this.options.mutationFn
                ? this.options.mutationFn(this.state.variables)
                : Promise.reject("No mutationFn found"),
            onFail: (N, R) => {
              this.dispatch({ type: "failed", failureCount: N, error: R });
            },
            onPause: () => {
              this.dispatch({ type: "pause" });
            },
            onContinue: () => {
              this.dispatch({ type: "continue" });
            },
            retry: (S = this.options.retry) != null ? S : 0,
            retryDelay: this.options.retryDelay,
            networkMode: this.options.networkMode,
          })),
          this.retryer.promise
        );
      },
      n = this.state.status === "loading";
    try {
      var r, s, o, i, l, a, u, d;
      if (!n) {
        var f, y, g, x;
        this.dispatch({ type: "loading", variables: this.options.variables }),
          await ((f = (y = this.mutationCache.config).onMutate) == null
            ? void 0
            : f.call(y, this.state.variables, this));
        const N = await ((g = (x = this.options).onMutate) == null
          ? void 0
          : g.call(x, this.state.variables));
        N !== this.state.context &&
          this.dispatch({
            type: "loading",
            context: N,
            variables: this.state.variables,
          });
      }
      const S = await t();
      return (
        await ((r = (s = this.mutationCache.config).onSuccess) == null
          ? void 0
          : r.call(s, S, this.state.variables, this.state.context, this)),
        await ((o = (i = this.options).onSuccess) == null
          ? void 0
          : o.call(i, S, this.state.variables, this.state.context)),
        await ((l = (a = this.mutationCache.config).onSettled) == null
          ? void 0
          : l.call(a, S, null, this.state.variables, this.state.context, this)),
        await ((u = (d = this.options).onSettled) == null
          ? void 0
          : u.call(d, S, null, this.state.variables, this.state.context)),
        this.dispatch({ type: "success", data: S }),
        S
      );
    } catch (S) {
      try {
        var b, w, m, h, p, E, _, C;
        throw (
          (await ((b = (w = this.mutationCache.config).onError) == null
            ? void 0
            : b.call(w, S, this.state.variables, this.state.context, this)),
          await ((m = (h = this.options).onError) == null
            ? void 0
            : m.call(h, S, this.state.variables, this.state.context)),
          await ((p = (E = this.mutationCache.config).onSettled) == null
            ? void 0
            : p.call(
                E,
                void 0,
                S,
                this.state.variables,
                this.state.context,
                this
              )),
          await ((_ = (C = this.options).onSettled) == null
            ? void 0
            : _.call(C, void 0, S, this.state.variables, this.state.context)),
          S)
        );
      } finally {
        this.dispatch({ type: "error", error: S });
      }
    }
  }
  dispatch(t) {
    const n = (r) => {
      switch (t.type) {
        case "failed":
          return { ...r, failureCount: t.failureCount, failureReason: t.error };
        case "pause":
          return { ...r, isPaused: !0 };
        case "continue":
          return { ...r, isPaused: !1 };
        case "loading":
          return {
            ...r,
            context: t.context,
            data: void 0,
            failureCount: 0,
            failureReason: null,
            error: null,
            isPaused: !Cl(this.options.networkMode),
            status: "loading",
            variables: t.variables,
          };
        case "success":
          return {
            ...r,
            data: t.data,
            failureCount: 0,
            failureReason: null,
            error: null,
            status: "success",
            isPaused: !1,
          };
        case "error":
          return {
            ...r,
            data: void 0,
            error: t.error,
            failureCount: r.failureCount + 1,
            failureReason: t.error,
            isPaused: !1,
            status: "error",
          };
        case "setState":
          return { ...r, ...t.state };
      }
    };
    (this.state = n(this.state)),
      pe.batch(() => {
        this.observers.forEach((r) => {
          r.onMutationUpdate(t);
        }),
          this.mutationCache.notify({
            mutation: this,
            type: "updated",
            action: t,
          });
      });
  }
}
function _0() {
  return {
    context: void 0,
    data: void 0,
    error: null,
    failureCount: 0,
    failureReason: null,
    isPaused: !1,
    status: "idle",
    variables: void 0,
  };
}
class Jb extends ts {
  constructor(t) {
    super(),
      (this.config = t || {}),
      (this.mutations = []),
      (this.mutationId = 0);
  }
  build(t, n, r) {
    const s = new Xb({
      mutationCache: this,
      logger: t.getLogger(),
      mutationId: ++this.mutationId,
      options: t.defaultMutationOptions(n),
      state: r,
      defaultOptions: n.mutationKey
        ? t.getMutationDefaults(n.mutationKey)
        : void 0,
    });
    return this.add(s), s;
  }
  add(t) {
    this.mutations.push(t), this.notify({ type: "added", mutation: t });
  }
  remove(t) {
    (this.mutations = this.mutations.filter((n) => n !== t)),
      this.notify({ type: "removed", mutation: t });
  }
  clear() {
    pe.batch(() => {
      this.mutations.forEach((t) => {
        this.remove(t);
      });
    });
  }
  getAll() {
    return this.mutations;
  }
  find(t) {
    return (
      typeof t.exact > "u" && (t.exact = !0),
      this.mutations.find((n) => Lf(t, n))
    );
  }
  findAll(t) {
    return this.mutations.filter((n) => Lf(t, n));
  }
  notify(t) {
    pe.batch(() => {
      this.listeners.forEach(({ listener: n }) => {
        n(t);
      });
    });
  }
  resumePausedMutations() {
    var t;
    return (
      (this.resuming = ((t = this.resuming) != null ? t : Promise.resolve())
        .then(() => {
          const n = this.mutations.filter((r) => r.state.isPaused);
          return pe.batch(() =>
            n.reduce(
              (r, s) => r.then(() => s.continue().catch(ct)),
              Promise.resolve()
            )
          );
        })
        .then(() => {
          this.resuming = void 0;
        })),
      this.resuming
    );
  }
}
function Zb() {
  return {
    onFetch: (e) => {
      e.fetchFn = () => {
        var t, n, r, s, o, i;
        const l =
            (t = e.fetchOptions) == null || (n = t.meta) == null
              ? void 0
              : n.refetchPage,
          a =
            (r = e.fetchOptions) == null || (s = r.meta) == null
              ? void 0
              : s.fetchMore,
          u = a == null ? void 0 : a.pageParam,
          d = (a == null ? void 0 : a.direction) === "forward",
          f = (a == null ? void 0 : a.direction) === "backward",
          y = ((o = e.state.data) == null ? void 0 : o.pages) || [],
          g = ((i = e.state.data) == null ? void 0 : i.pageParams) || [];
        let x = g,
          b = !1;
        const w = (C) => {
            Object.defineProperty(C, "signal", {
              enumerable: !0,
              get: () => {
                var S;
                if ((S = e.signal) != null && S.aborted) b = !0;
                else {
                  var N;
                  (N = e.signal) == null ||
                    N.addEventListener("abort", () => {
                      b = !0;
                    });
                }
                return e.signal;
              },
            });
          },
          m =
            e.options.queryFn ||
            (() =>
              Promise.reject(
                "Missing queryFn for queryKey '" + e.options.queryHash + "'"
              )),
          h = (C, S, N, R) => (
            (x = R ? [S, ...x] : [...x, S]), R ? [N, ...C] : [...C, N]
          ),
          p = (C, S, N, R) => {
            if (b) return Promise.reject("Cancelled");
            if (typeof N > "u" && !S && C.length) return Promise.resolve(C);
            const P = {
              queryKey: e.queryKey,
              pageParam: N,
              meta: e.options.meta,
            };
            w(P);
            const O = m(P);
            return Promise.resolve(O).then((U) => h(C, N, U, R));
          };
        let E;
        if (!y.length) E = p([]);
        else if (d) {
          const C = typeof u < "u",
            S = C ? u : Mf(e.options, y);
          E = p(y, C, S);
        } else if (f) {
          const C = typeof u < "u",
            S = C ? u : eE(e.options, y);
          E = p(y, C, S, !0);
        } else {
          x = [];
          const C = typeof e.options.getNextPageParam > "u";
          E = (l && y[0] ? l(y[0], 0, y) : !0)
            ? p([], C, g[0])
            : Promise.resolve(h([], g[0], y[0]));
          for (let N = 1; N < y.length; N++)
            E = E.then((R) => {
              if (l && y[N] ? l(y[N], N, y) : !0) {
                const O = C ? g[N] : Mf(e.options, R);
                return p(R, C, O);
              }
              return Promise.resolve(h(R, g[N], y[N]));
            });
        }
        return E.then((C) => ({ pages: C, pageParams: x }));
      };
    },
  };
}
function Mf(e, t) {
  return e.getNextPageParam == null
    ? void 0
    : e.getNextPageParam(t[t.length - 1], t);
}
function eE(e, t) {
  return e.getPreviousPageParam == null
    ? void 0
    : e.getPreviousPageParam(t[0], t);
}
class N0 {
  constructor(t = {}) {
    (this.queryCache = t.queryCache || new Gb()),
      (this.mutationCache = t.mutationCache || new Jb()),
      (this.logger = t.logger || Ic),
      (this.defaultOptions = t.defaultOptions || {}),
      (this.queryDefaults = []),
      (this.mutationDefaults = []),
      (this.mountCount = 0);
  }
  mount() {
    this.mountCount++,
      this.mountCount === 1 &&
        ((this.unsubscribeFocus = Wi.subscribe(() => {
          Wi.isFocused() &&
            (this.resumePausedMutations(), this.queryCache.onFocus());
        })),
        (this.unsubscribeOnline = Ki.subscribe(() => {
          Ki.isOnline() &&
            (this.resumePausedMutations(), this.queryCache.onOnline());
        })));
  }
  unmount() {
    var t, n;
    this.mountCount--,
      this.mountCount === 0 &&
        ((t = this.unsubscribeFocus) == null || t.call(this),
        (this.unsubscribeFocus = void 0),
        (n = this.unsubscribeOnline) == null || n.call(this),
        (this.unsubscribeOnline = void 0));
  }
  isFetching(t, n) {
    const [r] = pn(t, n);
    return (r.fetchStatus = "fetching"), this.queryCache.findAll(r).length;
  }
  isMutating(t) {
    return this.mutationCache.findAll({ ...t, fetching: !0 }).length;
  }
  getQueryData(t, n) {
    var r;
    return (r = this.queryCache.find(t, n)) == null ? void 0 : r.state.data;
  }
  ensureQueryData(t, n, r) {
    const s = Rs(t, n, r),
      o = this.getQueryData(s.queryKey);
    return o ? Promise.resolve(o) : this.fetchQuery(s);
  }
  getQueriesData(t) {
    return this.getQueryCache()
      .findAll(t)
      .map(({ queryKey: n, state: r }) => {
        const s = r.data;
        return [n, s];
      });
  }
  setQueryData(t, n, r) {
    const s = this.queryCache.find(t),
      o = s == null ? void 0 : s.state.data,
      i = Ub(n, o);
    if (typeof i > "u") return;
    const l = Rs(t),
      a = this.defaultQueryOptions(l);
    return this.queryCache.build(this, a).setData(i, { ...r, manual: !0 });
  }
  setQueriesData(t, n, r) {
    return pe.batch(() =>
      this.getQueryCache()
        .findAll(t)
        .map(({ queryKey: s }) => [s, this.setQueryData(s, n, r)])
    );
  }
  getQueryState(t, n) {
    var r;
    return (r = this.queryCache.find(t, n)) == null ? void 0 : r.state;
  }
  removeQueries(t, n) {
    const [r] = pn(t, n),
      s = this.queryCache;
    pe.batch(() => {
      s.findAll(r).forEach((o) => {
        s.remove(o);
      });
    });
  }
  resetQueries(t, n, r) {
    const [s, o] = pn(t, n, r),
      i = this.queryCache,
      l = { type: "active", ...s };
    return pe.batch(
      () => (
        i.findAll(s).forEach((a) => {
          a.reset();
        }),
        this.refetchQueries(l, o)
      )
    );
  }
  cancelQueries(t, n, r) {
    const [s, o = {}] = pn(t, n, r);
    typeof o.revert > "u" && (o.revert = !0);
    const i = pe.batch(() =>
      this.queryCache.findAll(s).map((l) => l.cancel(o))
    );
    return Promise.all(i).then(ct).catch(ct);
  }
  invalidateQueries(t, n, r) {
    const [s, o] = pn(t, n, r);
    return pe.batch(() => {
      var i, l;
      if (
        (this.queryCache.findAll(s).forEach((u) => {
          u.invalidate();
        }),
        s.refetchType === "none")
      )
        return Promise.resolve();
      const a = {
        ...s,
        type:
          (i = (l = s.refetchType) != null ? l : s.type) != null ? i : "active",
      };
      return this.refetchQueries(a, o);
    });
  }
  refetchQueries(t, n, r) {
    const [s, o] = pn(t, n, r),
      i = pe.batch(() =>
        this.queryCache
          .findAll(s)
          .filter((a) => !a.isDisabled())
          .map((a) => {
            var u;
            return a.fetch(void 0, {
              ...o,
              cancelRefetch:
                (u = o == null ? void 0 : o.cancelRefetch) != null ? u : !0,
              meta: { refetchPage: s.refetchPage },
            });
          })
      );
    let l = Promise.all(i).then(ct);
    return (o != null && o.throwOnError) || (l = l.catch(ct)), l;
  }
  fetchQuery(t, n, r) {
    const s = Rs(t, n, r),
      o = this.defaultQueryOptions(s);
    typeof o.retry > "u" && (o.retry = !1);
    const i = this.queryCache.build(this, o);
    return i.isStaleByTime(o.staleTime)
      ? i.fetch(o)
      : Promise.resolve(i.state.data);
  }
  prefetchQuery(t, n, r) {
    return this.fetchQuery(t, n, r).then(ct).catch(ct);
  }
  fetchInfiniteQuery(t, n, r) {
    const s = Rs(t, n, r);
    return (s.behavior = Zb()), this.fetchQuery(s);
  }
  prefetchInfiniteQuery(t, n, r) {
    return this.fetchInfiniteQuery(t, n, r).then(ct).catch(ct);
  }
  resumePausedMutations() {
    return this.mutationCache.resumePausedMutations();
  }
  getQueryCache() {
    return this.queryCache;
  }
  getMutationCache() {
    return this.mutationCache;
  }
  getLogger() {
    return this.logger;
  }
  getDefaultOptions() {
    return this.defaultOptions;
  }
  setDefaultOptions(t) {
    this.defaultOptions = t;
  }
  setQueryDefaults(t, n) {
    const r = this.queryDefaults.find((s) => qn(t) === qn(s.queryKey));
    r
      ? (r.defaultOptions = n)
      : this.queryDefaults.push({ queryKey: t, defaultOptions: n });
  }
  getQueryDefaults(t) {
    if (!t) return;
    const n = this.queryDefaults.find((r) => qi(t, r.queryKey));
    return n == null ? void 0 : n.defaultOptions;
  }
  setMutationDefaults(t, n) {
    const r = this.mutationDefaults.find((s) => qn(t) === qn(s.mutationKey));
    r
      ? (r.defaultOptions = n)
      : this.mutationDefaults.push({ mutationKey: t, defaultOptions: n });
  }
  getMutationDefaults(t) {
    if (!t) return;
    const n = this.mutationDefaults.find((r) => qi(t, r.mutationKey));
    return n == null ? void 0 : n.defaultOptions;
  }
  defaultQueryOptions(t) {
    if (t != null && t._defaulted) return t;
    const n = {
      ...this.defaultOptions.queries,
      ...this.getQueryDefaults(t == null ? void 0 : t.queryKey),
      ...t,
      _defaulted: !0,
    };
    return (
      !n.queryHash && n.queryKey && (n.queryHash = Ac(n.queryKey, n)),
      typeof n.refetchOnReconnect > "u" &&
        (n.refetchOnReconnect = n.networkMode !== "always"),
      typeof n.useErrorBoundary > "u" && (n.useErrorBoundary = !!n.suspense),
      n
    );
  }
  defaultMutationOptions(t) {
    return t != null && t._defaulted
      ? t
      : {
          ...this.defaultOptions.mutations,
          ...this.getMutationDefaults(t == null ? void 0 : t.mutationKey),
          ...t,
          _defaulted: !0,
        };
  }
  clear() {
    this.queryCache.clear(), this.mutationCache.clear();
  }
}
class tE extends ts {
  constructor(t, n) {
    super(),
      (this.client = t),
      (this.options = n),
      (this.trackedProps = new Set()),
      (this.selectError = null),
      this.bindMethods(),
      this.setOptions(n);
  }
  bindMethods() {
    (this.remove = this.remove.bind(this)),
      (this.refetch = this.refetch.bind(this));
  }
  onSubscribe() {
    this.listeners.size === 1 &&
      (this.currentQuery.addObserver(this),
      zf(this.currentQuery, this.options) && this.executeFetch(),
      this.updateTimers());
  }
  onUnsubscribe() {
    this.hasListeners() || this.destroy();
  }
  shouldFetchOnReconnect() {
    return Eu(this.currentQuery, this.options, this.options.refetchOnReconnect);
  }
  shouldFetchOnWindowFocus() {
    return Eu(
      this.currentQuery,
      this.options,
      this.options.refetchOnWindowFocus
    );
  }
  destroy() {
    (this.listeners = new Set()),
      this.clearStaleTimeout(),
      this.clearRefetchInterval(),
      this.currentQuery.removeObserver(this);
  }
  setOptions(t, n) {
    const r = this.options,
      s = this.currentQuery;
    if (
      ((this.options = this.client.defaultQueryOptions(t)),
      Vi(r, this.options) ||
        this.client
          .getQueryCache()
          .notify({
            type: "observerOptionsUpdated",
            query: this.currentQuery,
            observer: this,
          }),
      typeof this.options.enabled < "u" &&
        typeof this.options.enabled != "boolean")
    )
      throw new Error("Expected enabled to be a boolean");
    this.options.queryKey || (this.options.queryKey = r.queryKey),
      this.updateQuery();
    const o = this.hasListeners();
    o && $f(this.currentQuery, s, this.options, r) && this.executeFetch(),
      this.updateResult(n),
      o &&
        (this.currentQuery !== s ||
          this.options.enabled !== r.enabled ||
          this.options.staleTime !== r.staleTime) &&
        this.updateStaleTimeout();
    const i = this.computeRefetchInterval();
    o &&
      (this.currentQuery !== s ||
        this.options.enabled !== r.enabled ||
        i !== this.currentRefetchInterval) &&
      this.updateRefetchInterval(i);
  }
  getOptimisticResult(t) {
    const n = this.client.getQueryCache().build(this.client, t),
      r = this.createResult(n, t);
    return (
      rE(this, r, t) &&
        ((this.currentResult = r),
        (this.currentResultOptions = this.options),
        (this.currentResultState = this.currentQuery.state)),
      r
    );
  }
  getCurrentResult() {
    return this.currentResult;
  }
  trackResult(t) {
    const n = {};
    return (
      Object.keys(t).forEach((r) => {
        Object.defineProperty(n, r, {
          configurable: !1,
          enumerable: !0,
          get: () => (this.trackedProps.add(r), t[r]),
        });
      }),
      n
    );
  }
  getCurrentQuery() {
    return this.currentQuery;
  }
  remove() {
    this.client.getQueryCache().remove(this.currentQuery);
  }
  refetch({ refetchPage: t, ...n } = {}) {
    return this.fetch({ ...n, meta: { refetchPage: t } });
  }
  fetchOptimistic(t) {
    const n = this.client.defaultQueryOptions(t),
      r = this.client.getQueryCache().build(this.client, n);
    return (
      (r.isFetchingOptimistic = !0),
      r.fetch().then(() => this.createResult(r, n))
    );
  }
  fetch(t) {
    var n;
    return this.executeFetch({
      ...t,
      cancelRefetch: (n = t.cancelRefetch) != null ? n : !0,
    }).then(() => (this.updateResult(), this.currentResult));
  }
  executeFetch(t) {
    this.updateQuery();
    let n = this.currentQuery.fetch(this.options, t);
    return (t != null && t.throwOnError) || (n = n.catch(ct)), n;
  }
  updateStaleTimeout() {
    if (
      (this.clearStaleTimeout(),
      io || this.currentResult.isStale || !xu(this.options.staleTime))
    )
      return;
    const n = v0(this.currentResult.dataUpdatedAt, this.options.staleTime) + 1;
    this.staleTimeoutId = setTimeout(() => {
      this.currentResult.isStale || this.updateResult();
    }, n);
  }
  computeRefetchInterval() {
    var t;
    return typeof this.options.refetchInterval == "function"
      ? this.options.refetchInterval(this.currentResult.data, this.currentQuery)
      : (t = this.options.refetchInterval) != null
      ? t
      : !1;
  }
  updateRefetchInterval(t) {
    this.clearRefetchInterval(),
      (this.currentRefetchInterval = t),
      !(
        io ||
        this.options.enabled === !1 ||
        !xu(this.currentRefetchInterval) ||
        this.currentRefetchInterval === 0
      ) &&
        (this.refetchIntervalId = setInterval(() => {
          (this.options.refetchIntervalInBackground || Wi.isFocused()) &&
            this.executeFetch();
        }, this.currentRefetchInterval));
  }
  updateTimers() {
    this.updateStaleTimeout(),
      this.updateRefetchInterval(this.computeRefetchInterval());
  }
  clearStaleTimeout() {
    this.staleTimeoutId &&
      (clearTimeout(this.staleTimeoutId), (this.staleTimeoutId = void 0));
  }
  clearRefetchInterval() {
    this.refetchIntervalId &&
      (clearInterval(this.refetchIntervalId),
      (this.refetchIntervalId = void 0));
  }
  createResult(t, n) {
    const r = this.currentQuery,
      s = this.options,
      o = this.currentResult,
      i = this.currentResultState,
      l = this.currentResultOptions,
      a = t !== r,
      u = a ? t.state : this.currentQueryInitialState,
      d = a ? this.currentResult : this.previousQueryResult,
      { state: f } = t;
    let {
        dataUpdatedAt: y,
        error: g,
        errorUpdatedAt: x,
        fetchStatus: b,
        status: w,
      } = f,
      m = !1,
      h = !1,
      p;
    if (n._optimisticResults) {
      const N = this.hasListeners(),
        R = !N && zf(t, n),
        P = N && $f(t, r, n, s);
      (R || P) &&
        ((b = Cl(t.options.networkMode) ? "fetching" : "paused"),
        y || (w = "loading")),
        n._optimisticResults === "isRestoring" && (b = "idle");
    }
    if (
      n.keepPreviousData &&
      !f.dataUpdatedAt &&
      d != null &&
      d.isSuccess &&
      w !== "error"
    )
      (p = d.data), (y = d.dataUpdatedAt), (w = d.status), (m = !0);
    else if (n.select && typeof f.data < "u")
      if (
        o &&
        f.data === (i == null ? void 0 : i.data) &&
        n.select === this.selectFn
      )
        p = this.selectResult;
      else
        try {
          (this.selectFn = n.select),
            (p = n.select(f.data)),
            (p = bu(o == null ? void 0 : o.data, p, n)),
            (this.selectResult = p),
            (this.selectError = null);
        } catch (N) {
          this.selectError = N;
        }
    else p = f.data;
    if (typeof n.placeholderData < "u" && typeof p > "u" && w === "loading") {
      let N;
      if (
        o != null &&
        o.isPlaceholderData &&
        n.placeholderData === (l == null ? void 0 : l.placeholderData)
      )
        N = o.data;
      else if (
        ((N =
          typeof n.placeholderData == "function"
            ? n.placeholderData()
            : n.placeholderData),
        n.select && typeof N < "u")
      )
        try {
          (N = n.select(N)), (this.selectError = null);
        } catch (R) {
          this.selectError = R;
        }
      typeof N < "u" &&
        ((w = "success"),
        (p = bu(o == null ? void 0 : o.data, N, n)),
        (h = !0));
    }
    this.selectError &&
      ((g = this.selectError),
      (p = this.selectResult),
      (x = Date.now()),
      (w = "error"));
    const E = b === "fetching",
      _ = w === "loading",
      C = w === "error";
    return {
      status: w,
      fetchStatus: b,
      isLoading: _,
      isSuccess: w === "success",
      isError: C,
      isInitialLoading: _ && E,
      data: p,
      dataUpdatedAt: y,
      error: g,
      errorUpdatedAt: x,
      failureCount: f.fetchFailureCount,
      failureReason: f.fetchFailureReason,
      errorUpdateCount: f.errorUpdateCount,
      isFetched: f.dataUpdateCount > 0 || f.errorUpdateCount > 0,
      isFetchedAfterMount:
        f.dataUpdateCount > u.dataUpdateCount ||
        f.errorUpdateCount > u.errorUpdateCount,
      isFetching: E,
      isRefetching: E && !_,
      isLoadingError: C && f.dataUpdatedAt === 0,
      isPaused: b === "paused",
      isPlaceholderData: h,
      isPreviousData: m,
      isRefetchError: C && f.dataUpdatedAt !== 0,
      isStale: Fc(t, n),
      refetch: this.refetch,
      remove: this.remove,
    };
  }
  updateResult(t) {
    const n = this.currentResult,
      r = this.createResult(this.currentQuery, this.options);
    if (
      ((this.currentResultState = this.currentQuery.state),
      (this.currentResultOptions = this.options),
      Vi(r, n))
    )
      return;
    this.currentResult = r;
    const s = { cache: !0 },
      o = () => {
        if (!n) return !0;
        const { notifyOnChangeProps: i } = this.options,
          l = typeof i == "function" ? i() : i;
        if (l === "all" || (!l && !this.trackedProps.size)) return !0;
        const a = new Set(l ?? this.trackedProps);
        return (
          this.options.useErrorBoundary && a.add("error"),
          Object.keys(this.currentResult).some((u) => {
            const d = u;
            return this.currentResult[d] !== n[d] && a.has(d);
          })
        );
      };
    (t == null ? void 0 : t.listeners) !== !1 && o() && (s.listeners = !0),
      this.notify({ ...s, ...t });
  }
  updateQuery() {
    const t = this.client.getQueryCache().build(this.client, this.options);
    if (t === this.currentQuery) return;
    const n = this.currentQuery;
    (this.currentQuery = t),
      (this.currentQueryInitialState = t.state),
      (this.previousQueryResult = this.currentResult),
      this.hasListeners() &&
        (n == null || n.removeObserver(this), t.addObserver(this));
  }
  onQueryUpdate(t) {
    const n = {};
    t.type === "success"
      ? (n.onSuccess = !t.manual)
      : t.type === "error" && !pi(t.error) && (n.onError = !0),
      this.updateResult(n),
      this.hasListeners() && this.updateTimers();
  }
  notify(t) {
    pe.batch(() => {
      if (t.onSuccess) {
        var n, r, s, o;
        (n = (r = this.options).onSuccess) == null ||
          n.call(r, this.currentResult.data),
          (s = (o = this.options).onSettled) == null ||
            s.call(o, this.currentResult.data, null);
      } else if (t.onError) {
        var i, l, a, u;
        (i = (l = this.options).onError) == null ||
          i.call(l, this.currentResult.error),
          (a = (u = this.options).onSettled) == null ||
            a.call(u, void 0, this.currentResult.error);
      }
      t.listeners &&
        this.listeners.forEach(({ listener: d }) => {
          d(this.currentResult);
        }),
        t.cache &&
          this.client
            .getQueryCache()
            .notify({
              query: this.currentQuery,
              type: "observerResultsUpdated",
            });
    });
  }
}
function nE(e, t) {
  return (
    t.enabled !== !1 &&
    !e.state.dataUpdatedAt &&
    !(e.state.status === "error" && t.retryOnMount === !1)
  );
}
function zf(e, t) {
  return nE(e, t) || (e.state.dataUpdatedAt > 0 && Eu(e, t, t.refetchOnMount));
}
function Eu(e, t, n) {
  if (t.enabled !== !1) {
    const r = typeof n == "function" ? n(e) : n;
    return r === "always" || (r !== !1 && Fc(e, t));
  }
  return !1;
}
function $f(e, t, n, r) {
  return (
    n.enabled !== !1 &&
    (e !== t || r.enabled === !1) &&
    (!n.suspense || e.state.status !== "error") &&
    Fc(e, n)
  );
}
function Fc(e, t) {
  return e.isStaleByTime(t.staleTime);
}
function rE(e, t, n) {
  return n.keepPreviousData
    ? !1
    : n.placeholderData !== void 0
    ? t.isPlaceholderData
    : !Vi(e.getCurrentResult(), t);
}
let sE = class extends ts {
  constructor(t, n) {
    super(),
      (this.client = t),
      this.setOptions(n),
      this.bindMethods(),
      this.updateResult();
  }
  bindMethods() {
    (this.mutate = this.mutate.bind(this)),
      (this.reset = this.reset.bind(this));
  }
  setOptions(t) {
    var n;
    const r = this.options;
    (this.options = this.client.defaultMutationOptions(t)),
      Vi(r, this.options) ||
        this.client
          .getMutationCache()
          .notify({
            type: "observerOptionsUpdated",
            mutation: this.currentMutation,
            observer: this,
          }),
      (n = this.currentMutation) == null || n.setOptions(this.options);
  }
  onUnsubscribe() {
    if (!this.hasListeners()) {
      var t;
      (t = this.currentMutation) == null || t.removeObserver(this);
    }
  }
  onMutationUpdate(t) {
    this.updateResult();
    const n = { listeners: !0 };
    t.type === "success"
      ? (n.onSuccess = !0)
      : t.type === "error" && (n.onError = !0),
      this.notify(n);
  }
  getCurrentResult() {
    return this.currentResult;
  }
  reset() {
    (this.currentMutation = void 0),
      this.updateResult(),
      this.notify({ listeners: !0 });
  }
  mutate(t, n) {
    return (
      (this.mutateOptions = n),
      this.currentMutation && this.currentMutation.removeObserver(this),
      (this.currentMutation = this.client
        .getMutationCache()
        .build(this.client, {
          ...this.options,
          variables: typeof t < "u" ? t : this.options.variables,
        })),
      this.currentMutation.addObserver(this),
      this.currentMutation.execute()
    );
  }
  updateResult() {
    const t = this.currentMutation ? this.currentMutation.state : _0(),
      n = {
        ...t,
        isLoading: t.status === "loading",
        isSuccess: t.status === "success",
        isError: t.status === "error",
        isIdle: t.status === "idle",
        mutate: this.mutate,
        reset: this.reset,
      };
    this.currentResult = n;
  }
  notify(t) {
    pe.batch(() => {
      if (this.mutateOptions && this.hasListeners()) {
        if (t.onSuccess) {
          var n, r, s, o;
          (n = (r = this.mutateOptions).onSuccess) == null ||
            n.call(
              r,
              this.currentResult.data,
              this.currentResult.variables,
              this.currentResult.context
            ),
            (s = (o = this.mutateOptions).onSettled) == null ||
              s.call(
                o,
                this.currentResult.data,
                null,
                this.currentResult.variables,
                this.currentResult.context
              );
        } else if (t.onError) {
          var i, l, a, u;
          (i = (l = this.mutateOptions).onError) == null ||
            i.call(
              l,
              this.currentResult.error,
              this.currentResult.variables,
              this.currentResult.context
            ),
            (a = (u = this.mutateOptions).onSettled) == null ||
              a.call(
                u,
                void 0,
                this.currentResult.error,
                this.currentResult.variables,
                this.currentResult.context
              );
        }
      }
      t.listeners &&
        this.listeners.forEach(({ listener: d }) => {
          d(this.currentResult);
        });
    });
  }
};
var j0 = { exports: {} },
  k0 = {};
/**
 * @license React
 * use-sync-external-store-shim.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Qr = v;
function oE(e, t) {
  return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
}
var iE = typeof Object.is == "function" ? Object.is : oE,
  lE = Qr.useState,
  aE = Qr.useEffect,
  uE = Qr.useLayoutEffect,
  cE = Qr.useDebugValue;
function dE(e, t) {
  var n = t(),
    r = lE({ inst: { value: n, getSnapshot: t } }),
    s = r[0].inst,
    o = r[1];
  return (
    uE(
      function () {
        (s.value = n), (s.getSnapshot = t), da(s) && o({ inst: s });
      },
      [e, n, t]
    ),
    aE(
      function () {
        return (
          da(s) && o({ inst: s }),
          e(function () {
            da(s) && o({ inst: s });
          })
        );
      },
      [e]
    ),
    cE(n),
    n
  );
}
function da(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !iE(e, n);
  } catch {
    return !0;
  }
}
function fE(e, t) {
  return t();
}
var hE =
  typeof window > "u" ||
  typeof window.document > "u" ||
  typeof window.document.createElement > "u"
    ? fE
    : dE;
k0.useSyncExternalStore =
  Qr.useSyncExternalStore !== void 0 ? Qr.useSyncExternalStore : hE;
j0.exports = k0;
var pE = j0.exports;
const T0 = pE.useSyncExternalStore,
  Uf = v.createContext(void 0),
  R0 = v.createContext(!1);
function O0(e, t) {
  return (
    e ||
    (t && typeof window < "u"
      ? (window.ReactQueryClientContext ||
          (window.ReactQueryClientContext = Uf),
        window.ReactQueryClientContext)
      : Uf)
  );
}
const Dc = ({ context: e } = {}) => {
    const t = v.useContext(O0(e, v.useContext(R0)));
    if (!t)
      throw new Error("No QueryClient set, use QueryClientProvider to set one");
    return t;
  },
  mE = ({ client: e, children: t, context: n, contextSharing: r = !1 }) => {
    v.useEffect(
      () => (
        e.mount(),
        () => {
          e.unmount();
        }
      ),
      [e]
    );
    const s = O0(n, r);
    return v.createElement(
      R0.Provider,
      { value: !n && r },
      v.createElement(s.Provider, { value: e }, t)
    );
  },
  P0 = v.createContext(!1),
  yE = () => v.useContext(P0);
P0.Provider;
function gE() {
  let e = !1;
  return {
    clearReset: () => {
      e = !1;
    },
    reset: () => {
      e = !0;
    },
    isReset: () => e,
  };
}
const vE = v.createContext(gE()),
  xE = () => v.useContext(vE);
function L0(e, t) {
  return typeof e == "function" ? e(...t) : !!e;
}
const wE = (e, t) => {
    (e.suspense || e.useErrorBoundary) &&
      (t.isReset() || (e.retryOnMount = !1));
  },
  bE = (e) => {
    v.useEffect(() => {
      e.clearReset();
    }, [e]);
  },
  EE = ({ result: e, errorResetBoundary: t, useErrorBoundary: n, query: r }) =>
    e.isError && !t.isReset() && !e.isFetching && L0(n, [e.error, r]),
  SE = (e) => {
    e.suspense && typeof e.staleTime != "number" && (e.staleTime = 1e3);
  },
  CE = (e, t) => e.isLoading && e.isFetching && !t,
  _E = (e, t, n) => (e == null ? void 0 : e.suspense) && CE(t, n),
  NE = (e, t, n) =>
    t
      .fetchOptimistic(e)
      .then(({ data: r }) => {
        e.onSuccess == null || e.onSuccess(r),
          e.onSettled == null || e.onSettled(r, null);
      })
      .catch((r) => {
        n.clearReset(),
          e.onError == null || e.onError(r),
          e.onSettled == null || e.onSettled(void 0, r);
      });
function jE(e, t) {
  const n = Dc({ context: e.context }),
    r = yE(),
    s = xE(),
    o = n.defaultQueryOptions(e);
  (o._optimisticResults = r ? "isRestoring" : "optimistic"),
    o.onError && (o.onError = pe.batchCalls(o.onError)),
    o.onSuccess && (o.onSuccess = pe.batchCalls(o.onSuccess)),
    o.onSettled && (o.onSettled = pe.batchCalls(o.onSettled)),
    SE(o),
    wE(o, s),
    bE(s);
  const [i] = v.useState(() => new t(n, o)),
    l = i.getOptimisticResult(o);
  if (
    (T0(
      v.useCallback(
        (a) => {
          const u = r ? () => {} : i.subscribe(pe.batchCalls(a));
          return i.updateResult(), u;
        },
        [i, r]
      ),
      () => i.getCurrentResult(),
      () => i.getCurrentResult()
    ),
    v.useEffect(() => {
      i.setOptions(o, { listeners: !1 });
    }, [o, i]),
    _E(o, l, r))
  )
    throw NE(o, i, s);
  if (
    EE({
      result: l,
      errorResetBoundary: s,
      useErrorBoundary: o.useErrorBoundary,
      query: i.getCurrentQuery(),
    })
  )
    throw l.error;
  return o.notifyOnChangeProps ? l : i.trackResult(l);
}
function lo(e, t, n) {
  const r = Rs(e, t, n);
  return jE(r, tE);
}
function A0(e, t, n) {
  const r = Bb(e, t),
    s = Dc({ context: r.context }),
    [o] = v.useState(() => new sE(s, r));
  v.useEffect(() => {
    o.setOptions(r);
  }, [o, r]);
  const i = T0(
      v.useCallback((a) => o.subscribe(pe.batchCalls(a)), [o]),
      () => o.getCurrentResult(),
      () => o.getCurrentResult()
    ),
    l = v.useCallback(
      (a, u) => {
        o.mutate(a, u).catch(kE);
      },
      [o]
    );
  if (i.error && L0(o.options.useErrorBoundary, [i.error])) throw i.error;
  return { ...i, mutate: l, mutateAsync: i.mutate };
}
function kE() {}
const TE = async () => {
    const e = await fetch(
      "http://localhost:4000/api/notifications/getNotifications",
      { method: "GET", credentials: "include" }
    );
    if (!e.ok) throw new Error("Failed to fetch notifications");
    return e.json();
  },
  RE = async (e, t) => {
    const n = await fetch(
      `http://localhost:4000/api/notifications/markNotificationsAsRead/${e}/${t}`,
      { method: "PUT", credentials: "include" }
    );
    if (!n.ok) throw new Error("Failed to mark notifications as read");
    return n.json();
  },
  OE = (e) => {
    const t = new Date(e);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: !0,
    }).format(t);
  },
  I0 = () => {
    window.confirm("Are you sure you want to log out?") &&
      (localStorage.removeItem("login_token"),
      localStorage.removeItem("username"),
      localStorage.removeItem("role"),
      (window.location.href = "/login"));
  },
  PE = () => {
    const [e, t] = v.useState(!1),
      n = v.useRef(null),
      r = localStorage.getItem("login_token"),
      s = localStorage.getItem("username") || "User",
      o = localStorage.getItem("role"),
      i = Dc(),
      { data: l = [] } = lo({ queryKey: ["notifications"], queryFn: TE }),
      a =
        l.length > 0 &&
        (l == null
          ? void 0
          : l.filter((y) => {
              var g;
              return (
                y.viewedBy && !((g = y.viewedBy[o]) != null && g.includes(s))
              );
            })),
      u = a.length,
      { mutate: d } = A0({
        mutationFn: () => RE(o, s),
        onSuccess: () => {
          i.invalidateQueries(["notifications"]);
        },
      }),
      f = () => {
        t((y) => !y), !e && u > 0 && d();
      };
    return (
      v.useEffect(() => {
        const y = (g) => {
          n.current && !n.current.contains(g.target) && t(!1);
        };
        return (
          e && document.addEventListener("mousedown", y),
          () => {
            document.removeEventListener("mousedown", y);
          }
        );
      }, [e]),
      c.jsx("nav", {
        className: "bg-white shadow-md py-4 sticky top-0 z-10",
        children: c.jsxs("div", {
          className: "container mx-auto flex justify-between items-center px-6",
          children: [
            c.jsx(Me, {
              to: "/",
              className: "text-2xl font-bold text-blue-600",
              children: "EduPortal",
            }),
            c.jsx("div", {
              className: "space-x-4 flex items-center relative",
              children: r
                ? c.jsxs(c.Fragment, {
                    children: [
                      c.jsxs("div", {
                        className: "relative",
                        ref: n,
                        children: [
                          c.jsxs("button", {
                            onClick: f,
                            className:
                              "text-gray-600 hover:text-gray-900 transition relative",
                            children: [
                              c.jsx(Mb, { size: 30 }),
                              u > 0 &&
                                c.jsx("span", {
                                  className:
                                    "absolute -top-1 -right-1 bg-red-600 text-white text-xs px-1.5 py-0.5 rounded-full",
                                  children: u,
                                }),
                            ],
                          }),
                          e &&
                            c.jsxs("div", {
                              className:
                                "absolute right-0 mt-2 w-80 bg-white shadow-lg rounded-lg border border-gray-200",
                              children: [
                                c.jsx("div", {
                                  className:
                                    "p-3 border-b bg-gray-100 font-semibold text-gray-700",
                                  children: "Notifications",
                                }),
                                c.jsx("div", {
                                  className: "max-h-64 overflow-y-auto",
                                  children:
                                    l.length > 0
                                      ? l.map((y) =>
                                          c.jsxs(
                                            "div",
                                            {
                                              className: `flex items-start gap-3 p-3 border-b last:border-none transition-all ${
                                                a.includes(y)
                                                  ? "bg-gray-100"
                                                  : "hover:bg-gray-50"
                                              }`,
                                              children: [
                                                c.jsx("div", {
                                                  className: `w-2 h-2 mt-1.5 rounded-full ${
                                                    a.includes(y)
                                                      ? "bg-red-500"
                                                      : "bg-gray-400"
                                                  }`,
                                                }),
                                                c.jsxs("div", {
                                                  className: "flex-1",
                                                  children: [
                                                    c.jsx("p", {
                                                      className:
                                                        "text-sm font-medium text-gray-800",
                                                      children:
                                                        y.title ||
                                                        "New Notification",
                                                    }),
                                                    c.jsx("p", {
                                                      className:
                                                        "text-xs text-gray-600",
                                                      children: y.message,
                                                    }),
                                                    c.jsx("p", {
                                                      className:
                                                        "text-xs text-gray-400 mt-1",
                                                      children: OE(y.createdAt),
                                                    }),
                                                  ],
                                                }),
                                              ],
                                            },
                                            y._id
                                          )
                                        )
                                      : c.jsx("div", {
                                          className:
                                            "p-3 text-gray-500 text-sm",
                                          children: "No new notifications",
                                        }),
                                }),
                              ],
                            }),
                        ],
                      }),
                      c.jsx(Me, {
                        to: `/dashboard${
                          o === "Teacher" ? "/teacher" : "/student"
                        }`,
                        children: c.jsx("div", {
                          className:
                            "bg-blue-500 text-white w-8 h-8 flex items-center justify-center rounded-full font-semibold",
                          title: s,
                          children: s.charAt(0).toUpperCase(),
                        }),
                      }),
                      c.jsx("button", {
                        onClick: I0,
                        className:
                          "py-2 px-4 text-white transition bg-red-600 rounded-md hover:bg-red-700",
                        children: "Logout",
                      }),
                    ],
                  })
                : c.jsxs(c.Fragment, {
                    children: [
                      c.jsx(Me, {
                        to: "/login",
                        className:
                          "text-blue-500 font-semibold hover:text-blue-700 transition",
                        children: "Login",
                      }),
                      c.jsx(Me, {
                        to: "/register",
                        className:
                          "bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition",
                        children: "Register",
                      }),
                    ],
                  }),
            }),
          ],
        }),
      })
    );
  },
  LE = () => {
    const [e, t] = v.useState(
        () => JSON.parse(localStorage.getItem("user")) || null
      ),
      [n, r] = v.useState(!1),
      [s, o] = v.useState(""),
      [i, l] = v.useState(!1),
      a = Ae();
    return (
      v.useEffect(() => {
        e ? o(e.userName) : a("/");
      }, [a, e]),
      v.useEffect(() => {
        e &&
          (async () => {
            try {
              const d = await Rm(e._id);
              if (!d.ok) {
                if (d.status === 404) {
                  l(!0),
                    localStorage.removeItem("user"),
                    localStorage.removeItem("registration_token");
                  return;
                }
                console.error("Error checking verification status");
                return;
              }
              const f = await d.json();
              t(f.user), r(f.user.isVerified);
            } catch (d) {
              console.error("Error checking verification status:", d);
            }
          })();
      }, [e]),
      c.jsx("div", {
        className: "flex items-center justify-center min-h-screen bg-gray-100",
        children: i
          ? c.jsxs("div", {
              className: "bg-white shadow-md rounded-lg p-8 w-96 text-center",
              children: [
                c.jsx("h2", {
                  className: "text-2xl font-bold text-red-600 mb-4",
                  children: "Account Deleted",
                }),
                c.jsx("p", {
                  className: "text-gray-600 mb-4",
                  children:
                    "We're sorry, but your account has been deleted. You are no longer able to access our services.",
                }),
              ],
            })
          : n
          ? c.jsxs("div", {
              className: "bg-white shadow-md rounded-lg p-8 w-96 text-center",
              children: [
                c.jsxs("h2", {
                  className: "text-2xl font-bold text-green-600 mb-4",
                  children: ["Welcome, ", s, "!"],
                }),
                c.jsx("p", {
                  className: "text-gray-600 mb-6",
                  children:
                    "Your account has been successfully verified. You can now log in and enjoy our services.",
                }),
                c.jsx("button", {
                  onClick: () => {
                    a("/login", { state: e });
                  },
                  className:
                    "bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600",
                  children: "Log In Here",
                }),
              ],
            })
          : c.jsxs("div", {
              className: "bg-white shadow-md rounded-lg p-8 w-96 text-center",
              children: [
                c.jsx("h2", {
                  className: "text-2xl font-bold text-yellow-600 mb-4",
                  children: "Verification Pending",
                }),
                c.jsx("p", {
                  className: "text-gray-600 mb-4",
                  children:
                    "Your account is still under review. Please wait while our team verifies your details.",
                }),
                c.jsx("p", {
                  className: "text-gray-500",
                  children:
                    "You’ll be notified once the verification is complete. Thank you for your patience!",
                }),
              ],
            }),
      })
    );
  },
  qr = Math.min,
  Gn = Math.max,
  Yi = Math.round,
  Yo = Math.floor,
  zt = (e) => ({ x: e, y: e }),
  AE = { left: "right", right: "left", bottom: "top", top: "bottom" },
  IE = { start: "end", end: "start" };
function Su(e, t, n) {
  return Gn(e, qr(t, n));
}
function Co(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function sr(e) {
  return e.split("-")[0];
}
function _o(e) {
  return e.split("-")[1];
}
function F0(e) {
  return e === "x" ? "y" : "x";
}
function Mc(e) {
  return e === "y" ? "height" : "width";
}
function Vr(e) {
  return ["top", "bottom"].includes(sr(e)) ? "y" : "x";
}
function zc(e) {
  return F0(Vr(e));
}
function FE(e, t, n) {
  n === void 0 && (n = !1);
  const r = _o(e),
    s = zc(e),
    o = Mc(s);
  let i =
    s === "x"
      ? r === (n ? "end" : "start")
        ? "right"
        : "left"
      : r === "start"
      ? "bottom"
      : "top";
  return t.reference[o] > t.floating[o] && (i = Gi(i)), [i, Gi(i)];
}
function DE(e) {
  const t = Gi(e);
  return [Cu(e), t, Cu(t)];
}
function Cu(e) {
  return e.replace(/start|end/g, (t) => IE[t]);
}
function ME(e, t, n) {
  const r = ["left", "right"],
    s = ["right", "left"],
    o = ["top", "bottom"],
    i = ["bottom", "top"];
  switch (e) {
    case "top":
    case "bottom":
      return n ? (t ? s : r) : t ? r : s;
    case "left":
    case "right":
      return t ? o : i;
    default:
      return [];
  }
}
function zE(e, t, n, r) {
  const s = _o(e);
  let o = ME(sr(e), n === "start", r);
  return (
    s && ((o = o.map((i) => i + "-" + s)), t && (o = o.concat(o.map(Cu)))), o
  );
}
function Gi(e) {
  return e.replace(/left|right|bottom|top/g, (t) => AE[t]);
}
function $E(e) {
  return { top: 0, right: 0, bottom: 0, left: 0, ...e };
}
function D0(e) {
  return typeof e != "number"
    ? $E(e)
    : { top: e, right: e, bottom: e, left: e };
}
function Xi(e) {
  const { x: t, y: n, width: r, height: s } = e;
  return {
    width: r,
    height: s,
    top: n,
    left: t,
    right: t + r,
    bottom: n + s,
    x: t,
    y: n,
  };
}
function Bf(e, t, n) {
  let { reference: r, floating: s } = e;
  const o = Vr(t),
    i = zc(t),
    l = Mc(i),
    a = sr(t),
    u = o === "y",
    d = r.x + r.width / 2 - s.width / 2,
    f = r.y + r.height / 2 - s.height / 2,
    y = r[l] / 2 - s[l] / 2;
  let g;
  switch (a) {
    case "top":
      g = { x: d, y: r.y - s.height };
      break;
    case "bottom":
      g = { x: d, y: r.y + r.height };
      break;
    case "right":
      g = { x: r.x + r.width, y: f };
      break;
    case "left":
      g = { x: r.x - s.width, y: f };
      break;
    default:
      g = { x: r.x, y: r.y };
  }
  switch (_o(t)) {
    case "start":
      g[i] -= y * (n && u ? -1 : 1);
      break;
    case "end":
      g[i] += y * (n && u ? -1 : 1);
      break;
  }
  return g;
}
const UE = async (e, t, n) => {
  const {
      placement: r = "bottom",
      strategy: s = "absolute",
      middleware: o = [],
      platform: i,
    } = n,
    l = o.filter(Boolean),
    a = await (i.isRTL == null ? void 0 : i.isRTL(t));
  let u = await i.getElementRects({ reference: e, floating: t, strategy: s }),
    { x: d, y: f } = Bf(u, r, a),
    y = r,
    g = {},
    x = 0;
  for (let b = 0; b < l.length; b++) {
    const { name: w, fn: m } = l[b],
      {
        x: h,
        y: p,
        data: E,
        reset: _,
      } = await m({
        x: d,
        y: f,
        initialPlacement: r,
        placement: y,
        strategy: s,
        middlewareData: g,
        rects: u,
        platform: i,
        elements: { reference: e, floating: t },
      });
    (d = h ?? d),
      (f = p ?? f),
      (g = { ...g, [w]: { ...g[w], ...E } }),
      _ &&
        x <= 50 &&
        (x++,
        typeof _ == "object" &&
          (_.placement && (y = _.placement),
          _.rects &&
            (u =
              _.rects === !0
                ? await i.getElementRects({
                    reference: e,
                    floating: t,
                    strategy: s,
                  })
                : _.rects),
          ({ x: d, y: f } = Bf(u, y, a))),
        (b = -1));
  }
  return { x: d, y: f, placement: y, strategy: s, middlewareData: g };
};
async function M0(e, t) {
  var n;
  t === void 0 && (t = {});
  const { x: r, y: s, platform: o, rects: i, elements: l, strategy: a } = e,
    {
      boundary: u = "clippingAncestors",
      rootBoundary: d = "viewport",
      elementContext: f = "floating",
      altBoundary: y = !1,
      padding: g = 0,
    } = Co(t, e),
    x = D0(g),
    w = l[y ? (f === "floating" ? "reference" : "floating") : f],
    m = Xi(
      await o.getClippingRect({
        element:
          (n = await (o.isElement == null ? void 0 : o.isElement(w))) == null ||
          n
            ? w
            : w.contextElement ||
              (await (o.getDocumentElement == null
                ? void 0
                : o.getDocumentElement(l.floating))),
        boundary: u,
        rootBoundary: d,
        strategy: a,
      })
    ),
    h =
      f === "floating"
        ? { x: r, y: s, width: i.floating.width, height: i.floating.height }
        : i.reference,
    p = await (o.getOffsetParent == null
      ? void 0
      : o.getOffsetParent(l.floating)),
    E = (await (o.isElement == null ? void 0 : o.isElement(p)))
      ? (await (o.getScale == null ? void 0 : o.getScale(p))) || { x: 1, y: 1 }
      : { x: 1, y: 1 },
    _ = Xi(
      o.convertOffsetParentRelativeRectToViewportRelativeRect
        ? await o.convertOffsetParentRelativeRectToViewportRelativeRect({
            elements: l,
            rect: h,
            offsetParent: p,
            strategy: a,
          })
        : h
    );
  return {
    top: (m.top - _.top + x.top) / E.y,
    bottom: (_.bottom - m.bottom + x.bottom) / E.y,
    left: (m.left - _.left + x.left) / E.x,
    right: (_.right - m.right + x.right) / E.x,
  };
}
const BE = (e) => ({
    name: "arrow",
    options: e,
    async fn(t) {
      const {
          x: n,
          y: r,
          placement: s,
          rects: o,
          platform: i,
          elements: l,
          middlewareData: a,
        } = t,
        { element: u, padding: d = 0 } = Co(e, t) || {};
      if (u == null) return {};
      const f = D0(d),
        y = { x: n, y: r },
        g = zc(s),
        x = Mc(g),
        b = await i.getDimensions(u),
        w = g === "y",
        m = w ? "top" : "left",
        h = w ? "bottom" : "right",
        p = w ? "clientHeight" : "clientWidth",
        E = o.reference[x] + o.reference[g] - y[g] - o.floating[x],
        _ = y[g] - o.reference[g],
        C = await (i.getOffsetParent == null ? void 0 : i.getOffsetParent(u));
      let S = C ? C[p] : 0;
      (!S || !(await (i.isElement == null ? void 0 : i.isElement(C)))) &&
        (S = l.floating[p] || o.floating[x]);
      const N = E / 2 - _ / 2,
        R = S / 2 - b[x] / 2 - 1,
        P = qr(f[m], R),
        O = qr(f[h], R),
        I = P,
        U = S - b[x] - O,
        K = S / 2 - b[x] / 2 + N,
        Ee = Su(I, K, U),
        fe =
          !a.arrow &&
          _o(s) != null &&
          K !== Ee &&
          o.reference[x] / 2 - (K < I ? P : O) - b[x] / 2 < 0,
        Z = fe ? (K < I ? K - I : K - U) : 0;
      return {
        [g]: y[g] + Z,
        data: {
          [g]: Ee,
          centerOffset: K - Ee - Z,
          ...(fe && { alignmentOffset: Z }),
        },
        reset: fe,
      };
    },
  }),
  HE = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: "flip",
        options: e,
        async fn(t) {
          var n, r;
          const {
              placement: s,
              middlewareData: o,
              rects: i,
              initialPlacement: l,
              platform: a,
              elements: u,
            } = t,
            {
              mainAxis: d = !0,
              crossAxis: f = !0,
              fallbackPlacements: y,
              fallbackStrategy: g = "bestFit",
              fallbackAxisSideDirection: x = "none",
              flipAlignment: b = !0,
              ...w
            } = Co(e, t);
          if ((n = o.arrow) != null && n.alignmentOffset) return {};
          const m = sr(s),
            h = Vr(l),
            p = sr(l) === l,
            E = await (a.isRTL == null ? void 0 : a.isRTL(u.floating)),
            _ = y || (p || !b ? [Gi(l)] : DE(l)),
            C = x !== "none";
          !y && C && _.push(...zE(l, b, x, E));
          const S = [l, ..._],
            N = await M0(t, w),
            R = [];
          let P = ((r = o.flip) == null ? void 0 : r.overflows) || [];
          if ((d && R.push(N[m]), f)) {
            const K = FE(s, i, E);
            R.push(N[K[0]], N[K[1]]);
          }
          if (
            ((P = [...P, { placement: s, overflows: R }]),
            !R.every((K) => K <= 0))
          ) {
            var O, I;
            const K = (((O = o.flip) == null ? void 0 : O.index) || 0) + 1,
              Ee = S[K];
            if (Ee)
              return {
                data: { index: K, overflows: P },
                reset: { placement: Ee },
              };
            let fe =
              (I = P.filter((Z) => Z.overflows[0] <= 0).sort(
                (Z, T) => Z.overflows[1] - T.overflows[1]
              )[0]) == null
                ? void 0
                : I.placement;
            if (!fe)
              switch (g) {
                case "bestFit": {
                  var U;
                  const Z =
                    (U = P.filter((T) => {
                      if (C) {
                        const F = Vr(T.placement);
                        return F === h || F === "y";
                      }
                      return !0;
                    })
                      .map((T) => [
                        T.placement,
                        T.overflows
                          .filter((F) => F > 0)
                          .reduce((F, z) => F + z, 0),
                      ])
                      .sort((T, F) => T[1] - F[1])[0]) == null
                      ? void 0
                      : U[0];
                  Z && (fe = Z);
                  break;
                }
                case "initialPlacement":
                  fe = l;
                  break;
              }
            if (s !== fe) return { reset: { placement: fe } };
          }
          return {};
        },
      }
    );
  };
async function QE(e, t) {
  const { placement: n, platform: r, elements: s } = e,
    o = await (r.isRTL == null ? void 0 : r.isRTL(s.floating)),
    i = sr(n),
    l = _o(n),
    a = Vr(n) === "y",
    u = ["left", "top"].includes(i) ? -1 : 1,
    d = o && a ? -1 : 1,
    f = Co(t, e);
  let {
    mainAxis: y,
    crossAxis: g,
    alignmentAxis: x,
  } = typeof f == "number"
    ? { mainAxis: f, crossAxis: 0, alignmentAxis: null }
    : {
        mainAxis: f.mainAxis || 0,
        crossAxis: f.crossAxis || 0,
        alignmentAxis: f.alignmentAxis,
      };
  return (
    l && typeof x == "number" && (g = l === "end" ? x * -1 : x),
    a ? { x: g * d, y: y * u } : { x: y * u, y: g * d }
  );
}
const qE = function (e) {
    return (
      e === void 0 && (e = 0),
      {
        name: "offset",
        options: e,
        async fn(t) {
          var n, r;
          const { x: s, y: o, placement: i, middlewareData: l } = t,
            a = await QE(t, e);
          return i === ((n = l.offset) == null ? void 0 : n.placement) &&
            (r = l.arrow) != null &&
            r.alignmentOffset
            ? {}
            : { x: s + a.x, y: o + a.y, data: { ...a, placement: i } };
        },
      }
    );
  },
  VE = function (e) {
    return (
      e === void 0 && (e = {}),
      {
        name: "shift",
        options: e,
        async fn(t) {
          const { x: n, y: r, placement: s } = t,
            {
              mainAxis: o = !0,
              crossAxis: i = !1,
              limiter: l = {
                fn: (w) => {
                  let { x: m, y: h } = w;
                  return { x: m, y: h };
                },
              },
              ...a
            } = Co(e, t),
            u = { x: n, y: r },
            d = await M0(t, a),
            f = Vr(sr(s)),
            y = F0(f);
          let g = u[y],
            x = u[f];
          if (o) {
            const w = y === "y" ? "top" : "left",
              m = y === "y" ? "bottom" : "right",
              h = g + d[w],
              p = g - d[m];
            g = Su(h, g, p);
          }
          if (i) {
            const w = f === "y" ? "top" : "left",
              m = f === "y" ? "bottom" : "right",
              h = x + d[w],
              p = x - d[m];
            x = Su(h, x, p);
          }
          const b = l.fn({ ...t, [y]: g, [f]: x });
          return {
            ...b,
            data: { x: b.x - n, y: b.y - r, enabled: { [y]: o, [f]: i } },
          };
        },
      }
    );
  };
function _l() {
  return typeof window < "u";
}
function ns(e) {
  return z0(e) ? (e.nodeName || "").toLowerCase() : "#document";
}
function nt(e) {
  var t;
  return (
    (e == null || (t = e.ownerDocument) == null ? void 0 : t.defaultView) ||
    window
  );
}
function Qt(e) {
  var t;
  return (t = (z0(e) ? e.ownerDocument : e.document) || window.document) == null
    ? void 0
    : t.documentElement;
}
function z0(e) {
  return _l() ? e instanceof Node || e instanceof nt(e).Node : !1;
}
function jt(e) {
  return _l() ? e instanceof Element || e instanceof nt(e).Element : !1;
}
function $t(e) {
  return _l() ? e instanceof HTMLElement || e instanceof nt(e).HTMLElement : !1;
}
function Hf(e) {
  return !_l() || typeof ShadowRoot > "u"
    ? !1
    : e instanceof ShadowRoot || e instanceof nt(e).ShadowRoot;
}
function No(e) {
  const { overflow: t, overflowX: n, overflowY: r, display: s } = kt(e);
  return (
    /auto|scroll|overlay|hidden|clip/.test(t + r + n) &&
    !["inline", "contents"].includes(s)
  );
}
function WE(e) {
  return ["table", "td", "th"].includes(ns(e));
}
function Nl(e) {
  return [":popover-open", ":modal"].some((t) => {
    try {
      return e.matches(t);
    } catch {
      return !1;
    }
  });
}
function $c(e) {
  const t = Uc(),
    n = jt(e) ? kt(e) : e;
  return (
    n.transform !== "none" ||
    n.perspective !== "none" ||
    (n.containerType ? n.containerType !== "normal" : !1) ||
    (!t && (n.backdropFilter ? n.backdropFilter !== "none" : !1)) ||
    (!t && (n.filter ? n.filter !== "none" : !1)) ||
    ["transform", "perspective", "filter"].some((r) =>
      (n.willChange || "").includes(r)
    ) ||
    ["paint", "layout", "strict", "content"].some((r) =>
      (n.contain || "").includes(r)
    )
  );
}
function KE(e) {
  let t = Rn(e);
  for (; $t(t) && !Wr(t); ) {
    if ($c(t)) return t;
    if (Nl(t)) return null;
    t = Rn(t);
  }
  return null;
}
function Uc() {
  return typeof CSS > "u" || !CSS.supports
    ? !1
    : CSS.supports("-webkit-backdrop-filter", "none");
}
function Wr(e) {
  return ["html", "body", "#document"].includes(ns(e));
}
function kt(e) {
  return nt(e).getComputedStyle(e);
}
function jl(e) {
  return jt(e)
    ? { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop }
    : { scrollLeft: e.scrollX, scrollTop: e.scrollY };
}
function Rn(e) {
  if (ns(e) === "html") return e;
  const t = e.assignedSlot || e.parentNode || (Hf(e) && e.host) || Qt(e);
  return Hf(t) ? t.host : t;
}
function $0(e) {
  const t = Rn(e);
  return Wr(t)
    ? e.ownerDocument
      ? e.ownerDocument.body
      : e.body
    : $t(t) && No(t)
    ? t
    : $0(t);
}
function ao(e, t, n) {
  var r;
  t === void 0 && (t = []), n === void 0 && (n = !0);
  const s = $0(e),
    o = s === ((r = e.ownerDocument) == null ? void 0 : r.body),
    i = nt(s);
  if (o) {
    const l = _u(i);
    return t.concat(
      i,
      i.visualViewport || [],
      No(s) ? s : [],
      l && n ? ao(l) : []
    );
  }
  return t.concat(s, ao(s, [], n));
}
function _u(e) {
  return e.parent && Object.getPrototypeOf(e.parent) ? e.frameElement : null;
}
function U0(e) {
  const t = kt(e);
  let n = parseFloat(t.width) || 0,
    r = parseFloat(t.height) || 0;
  const s = $t(e),
    o = s ? e.offsetWidth : n,
    i = s ? e.offsetHeight : r,
    l = Yi(n) !== o || Yi(r) !== i;
  return l && ((n = o), (r = i)), { width: n, height: r, $: l };
}
function Bc(e) {
  return jt(e) ? e : e.contextElement;
}
function Fr(e) {
  const t = Bc(e);
  if (!$t(t)) return zt(1);
  const n = t.getBoundingClientRect(),
    { width: r, height: s, $: o } = U0(t);
  let i = (o ? Yi(n.width) : n.width) / r,
    l = (o ? Yi(n.height) : n.height) / s;
  return (
    (!i || !Number.isFinite(i)) && (i = 1),
    (!l || !Number.isFinite(l)) && (l = 1),
    { x: i, y: l }
  );
}
const YE = zt(0);
function B0(e) {
  const t = nt(e);
  return !Uc() || !t.visualViewport
    ? YE
    : { x: t.visualViewport.offsetLeft, y: t.visualViewport.offsetTop };
}
function GE(e, t, n) {
  return t === void 0 && (t = !1), !n || (t && n !== nt(e)) ? !1 : t;
}
function or(e, t, n, r) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  const s = e.getBoundingClientRect(),
    o = Bc(e);
  let i = zt(1);
  t && (r ? jt(r) && (i = Fr(r)) : (i = Fr(e)));
  const l = GE(o, n, r) ? B0(o) : zt(0);
  let a = (s.left + l.x) / i.x,
    u = (s.top + l.y) / i.y,
    d = s.width / i.x,
    f = s.height / i.y;
  if (o) {
    const y = nt(o),
      g = r && jt(r) ? nt(r) : r;
    let x = y,
      b = _u(x);
    for (; b && r && g !== x; ) {
      const w = Fr(b),
        m = b.getBoundingClientRect(),
        h = kt(b),
        p = m.left + (b.clientLeft + parseFloat(h.paddingLeft)) * w.x,
        E = m.top + (b.clientTop + parseFloat(h.paddingTop)) * w.y;
      (a *= w.x),
        (u *= w.y),
        (d *= w.x),
        (f *= w.y),
        (a += p),
        (u += E),
        (x = nt(b)),
        (b = _u(x));
    }
  }
  return Xi({ width: d, height: f, x: a, y: u });
}
function Hc(e, t) {
  const n = jl(e).scrollLeft;
  return t ? t.left + n : or(Qt(e)).left + n;
}
function H0(e, t, n) {
  n === void 0 && (n = !1);
  const r = e.getBoundingClientRect(),
    s = r.left + t.scrollLeft - (n ? 0 : Hc(e, r)),
    o = r.top + t.scrollTop;
  return { x: s, y: o };
}
function XE(e) {
  let { elements: t, rect: n, offsetParent: r, strategy: s } = e;
  const o = s === "fixed",
    i = Qt(r),
    l = t ? Nl(t.floating) : !1;
  if (r === i || (l && o)) return n;
  let a = { scrollLeft: 0, scrollTop: 0 },
    u = zt(1);
  const d = zt(0),
    f = $t(r);
  if (
    (f || (!f && !o)) &&
    ((ns(r) !== "body" || No(i)) && (a = jl(r)), $t(r))
  ) {
    const g = or(r);
    (u = Fr(r)), (d.x = g.x + r.clientLeft), (d.y = g.y + r.clientTop);
  }
  const y = i && !f && !o ? H0(i, a, !0) : zt(0);
  return {
    width: n.width * u.x,
    height: n.height * u.y,
    x: n.x * u.x - a.scrollLeft * u.x + d.x + y.x,
    y: n.y * u.y - a.scrollTop * u.y + d.y + y.y,
  };
}
function JE(e) {
  return Array.from(e.getClientRects());
}
function ZE(e) {
  const t = Qt(e),
    n = jl(e),
    r = e.ownerDocument.body,
    s = Gn(t.scrollWidth, t.clientWidth, r.scrollWidth, r.clientWidth),
    o = Gn(t.scrollHeight, t.clientHeight, r.scrollHeight, r.clientHeight);
  let i = -n.scrollLeft + Hc(e);
  const l = -n.scrollTop;
  return (
    kt(r).direction === "rtl" && (i += Gn(t.clientWidth, r.clientWidth) - s),
    { width: s, height: o, x: i, y: l }
  );
}
function eS(e, t) {
  const n = nt(e),
    r = Qt(e),
    s = n.visualViewport;
  let o = r.clientWidth,
    i = r.clientHeight,
    l = 0,
    a = 0;
  if (s) {
    (o = s.width), (i = s.height);
    const u = Uc();
    (!u || (u && t === "fixed")) && ((l = s.offsetLeft), (a = s.offsetTop));
  }
  return { width: o, height: i, x: l, y: a };
}
function tS(e, t) {
  const n = or(e, !0, t === "fixed"),
    r = n.top + e.clientTop,
    s = n.left + e.clientLeft,
    o = $t(e) ? Fr(e) : zt(1),
    i = e.clientWidth * o.x,
    l = e.clientHeight * o.y,
    a = s * o.x,
    u = r * o.y;
  return { width: i, height: l, x: a, y: u };
}
function Qf(e, t, n) {
  let r;
  if (t === "viewport") r = eS(e, n);
  else if (t === "document") r = ZE(Qt(e));
  else if (jt(t)) r = tS(t, n);
  else {
    const s = B0(e);
    r = { x: t.x - s.x, y: t.y - s.y, width: t.width, height: t.height };
  }
  return Xi(r);
}
function Q0(e, t) {
  const n = Rn(e);
  return n === t || !jt(n) || Wr(n)
    ? !1
    : kt(n).position === "fixed" || Q0(n, t);
}
function nS(e, t) {
  const n = t.get(e);
  if (n) return n;
  let r = ao(e, [], !1).filter((l) => jt(l) && ns(l) !== "body"),
    s = null;
  const o = kt(e).position === "fixed";
  let i = o ? Rn(e) : e;
  for (; jt(i) && !Wr(i); ) {
    const l = kt(i),
      a = $c(i);
    !a && l.position === "fixed" && (s = null),
      (
        o
          ? !a && !s
          : (!a &&
              l.position === "static" &&
              !!s &&
              ["absolute", "fixed"].includes(s.position)) ||
            (No(i) && !a && Q0(e, i))
      )
        ? (r = r.filter((d) => d !== i))
        : (s = l),
      (i = Rn(i));
  }
  return t.set(e, r), r;
}
function rS(e) {
  let { element: t, boundary: n, rootBoundary: r, strategy: s } = e;
  const i = [
      ...(n === "clippingAncestors"
        ? Nl(t)
          ? []
          : nS(t, this._c)
        : [].concat(n)),
      r,
    ],
    l = i[0],
    a = i.reduce((u, d) => {
      const f = Qf(t, d, s);
      return (
        (u.top = Gn(f.top, u.top)),
        (u.right = qr(f.right, u.right)),
        (u.bottom = qr(f.bottom, u.bottom)),
        (u.left = Gn(f.left, u.left)),
        u
      );
    }, Qf(t, l, s));
  return {
    width: a.right - a.left,
    height: a.bottom - a.top,
    x: a.left,
    y: a.top,
  };
}
function sS(e) {
  const { width: t, height: n } = U0(e);
  return { width: t, height: n };
}
function oS(e, t, n) {
  const r = $t(t),
    s = Qt(t),
    o = n === "fixed",
    i = or(e, !0, o, t);
  let l = { scrollLeft: 0, scrollTop: 0 };
  const a = zt(0);
  if (r || (!r && !o))
    if (((ns(t) !== "body" || No(s)) && (l = jl(t)), r)) {
      const y = or(t, !0, o, t);
      (a.x = y.x + t.clientLeft), (a.y = y.y + t.clientTop);
    } else s && (a.x = Hc(s));
  const u = s && !r && !o ? H0(s, l) : zt(0),
    d = i.left + l.scrollLeft - a.x - u.x,
    f = i.top + l.scrollTop - a.y - u.y;
  return { x: d, y: f, width: i.width, height: i.height };
}
function fa(e) {
  return kt(e).position === "static";
}
function qf(e, t) {
  if (!$t(e) || kt(e).position === "fixed") return null;
  if (t) return t(e);
  let n = e.offsetParent;
  return Qt(e) === n && (n = n.ownerDocument.body), n;
}
function q0(e, t) {
  const n = nt(e);
  if (Nl(e)) return n;
  if (!$t(e)) {
    let s = Rn(e);
    for (; s && !Wr(s); ) {
      if (jt(s) && !fa(s)) return s;
      s = Rn(s);
    }
    return n;
  }
  let r = qf(e, t);
  for (; r && WE(r) && fa(r); ) r = qf(r, t);
  return r && Wr(r) && fa(r) && !$c(r) ? n : r || KE(e) || n;
}
const iS = async function (e) {
  const t = this.getOffsetParent || q0,
    n = this.getDimensions,
    r = await n(e.floating);
  return {
    reference: oS(e.reference, await t(e.floating), e.strategy),
    floating: { x: 0, y: 0, width: r.width, height: r.height },
  };
};
function lS(e) {
  return kt(e).direction === "rtl";
}
const aS = {
  convertOffsetParentRelativeRectToViewportRelativeRect: XE,
  getDocumentElement: Qt,
  getClippingRect: rS,
  getOffsetParent: q0,
  getElementRects: iS,
  getClientRects: JE,
  getDimensions: sS,
  getScale: Fr,
  isElement: jt,
  isRTL: lS,
};
function uS(e, t) {
  let n = null,
    r;
  const s = Qt(e);
  function o() {
    var l;
    clearTimeout(r), (l = n) == null || l.disconnect(), (n = null);
  }
  function i(l, a) {
    l === void 0 && (l = !1), a === void 0 && (a = 1), o();
    const { left: u, top: d, width: f, height: y } = e.getBoundingClientRect();
    if ((l || t(), !f || !y)) return;
    const g = Yo(d),
      x = Yo(s.clientWidth - (u + f)),
      b = Yo(s.clientHeight - (d + y)),
      w = Yo(u),
      h = {
        rootMargin: -g + "px " + -x + "px " + -b + "px " + -w + "px",
        threshold: Gn(0, qr(1, a)) || 1,
      };
    let p = !0;
    function E(_) {
      const C = _[0].intersectionRatio;
      if (C !== a) {
        if (!p) return i();
        C
          ? i(!1, C)
          : (r = setTimeout(() => {
              i(!1, 1e-7);
            }, 1e3));
      }
      p = !1;
    }
    try {
      n = new IntersectionObserver(E, { ...h, root: s.ownerDocument });
    } catch {
      n = new IntersectionObserver(E, h);
    }
    n.observe(e);
  }
  return i(!0), o;
}
function cS(e, t, n, r) {
  r === void 0 && (r = {});
  const {
      ancestorScroll: s = !0,
      ancestorResize: o = !0,
      elementResize: i = typeof ResizeObserver == "function",
      layoutShift: l = typeof IntersectionObserver == "function",
      animationFrame: a = !1,
    } = r,
    u = Bc(e),
    d = s || o ? [...(u ? ao(u) : []), ...ao(t)] : [];
  d.forEach((m) => {
    s && m.addEventListener("scroll", n, { passive: !0 }),
      o && m.addEventListener("resize", n);
  });
  const f = u && l ? uS(u, n) : null;
  let y = -1,
    g = null;
  i &&
    ((g = new ResizeObserver((m) => {
      let [h] = m;
      h &&
        h.target === u &&
        g &&
        (g.unobserve(t),
        cancelAnimationFrame(y),
        (y = requestAnimationFrame(() => {
          var p;
          (p = g) == null || p.observe(t);
        }))),
        n();
    })),
    u && !a && g.observe(u),
    g.observe(t));
  let x,
    b = a ? or(e) : null;
  a && w();
  function w() {
    const m = or(e);
    b &&
      (m.x !== b.x ||
        m.y !== b.y ||
        m.width !== b.width ||
        m.height !== b.height) &&
      n(),
      (b = m),
      (x = requestAnimationFrame(w));
  }
  return (
    n(),
    () => {
      var m;
      d.forEach((h) => {
        s && h.removeEventListener("scroll", n),
          o && h.removeEventListener("resize", n);
      }),
        f == null || f(),
        (m = g) == null || m.disconnect(),
        (g = null),
        a && cancelAnimationFrame(x);
    }
  );
}
const dS = qE,
  fS = VE,
  hS = HE,
  pS = BE,
  Vf = (e, t, n) => {
    const r = new Map(),
      s = { platform: aS, ...n },
      o = { ...s.platform, _c: r };
    return UE(e, t, { ...s, platform: o });
  };
var V0 = { exports: {} };
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/ (function (e) {
  (function () {
    var t = {}.hasOwnProperty;
    function n() {
      for (var o = "", i = 0; i < arguments.length; i++) {
        var l = arguments[i];
        l && (o = s(o, r(l)));
      }
      return o;
    }
    function r(o) {
      if (typeof o == "string" || typeof o == "number") return o;
      if (typeof o != "object") return "";
      if (Array.isArray(o)) return n.apply(null, o);
      if (
        o.toString !== Object.prototype.toString &&
        !o.toString.toString().includes("[native code]")
      )
        return o.toString();
      var i = "";
      for (var l in o) t.call(o, l) && o[l] && (i = s(i, l));
      return i;
    }
    function s(o, i) {
      return i ? (o ? o + " " + i : o + i) : o;
    }
    e.exports ? ((n.default = n), (e.exports = n)) : (window.classNames = n);
  })();
})(V0);
var mS = V0.exports;
const Nu = nh(mS);
var Wf = {};
const yS = "react-tooltip-core-styles",
  gS = "react-tooltip-base-styles",
  Kf = { core: !1, base: !1 };
function Yf({ css: e, id: t = gS, type: n = "base", ref: r }) {
  var s, o;
  if (
    !e ||
    typeof document > "u" ||
    Kf[n] ||
    (n === "core" &&
      typeof process < "u" &&
      !((s = process == null ? void 0 : Wf) === null || s === void 0) &&
      s.REACT_TOOLTIP_DISABLE_CORE_STYLES) ||
    (n !== "base" &&
      typeof process < "u" &&
      !((o = process == null ? void 0 : Wf) === null || o === void 0) &&
      o.REACT_TOOLTIP_DISABLE_BASE_STYLES)
  )
    return;
  n === "core" && (t = yS), r || (r = {});
  const { insertAt: i } = r;
  if (document.getElementById(t)) return;
  const l = document.head || document.getElementsByTagName("head")[0],
    a = document.createElement("style");
  (a.id = t),
    (a.type = "text/css"),
    i === "top" && l.firstChild
      ? l.insertBefore(a, l.firstChild)
      : l.appendChild(a),
    a.styleSheet
      ? (a.styleSheet.cssText = e)
      : a.appendChild(document.createTextNode(e)),
    (Kf[n] = !0);
}
const Gf = async ({
    elementReference: e = null,
    tooltipReference: t = null,
    tooltipArrowReference: n = null,
    place: r = "top",
    offset: s = 10,
    strategy: o = "absolute",
    middlewares: i = [
      dS(Number(s)),
      hS({ fallbackAxisSideDirection: "start" }),
      fS({ padding: 5 }),
    ],
    border: l,
  }) => {
    if (!e) return { tooltipStyles: {}, tooltipArrowStyles: {}, place: r };
    if (t === null)
      return { tooltipStyles: {}, tooltipArrowStyles: {}, place: r };
    const a = i;
    return n
      ? (a.push(pS({ element: n, padding: 5 })),
        Vf(e, t, { placement: r, strategy: o, middleware: a }).then(
          ({ x: u, y: d, placement: f, middlewareData: y }) => {
            var g, x;
            const b = { left: `${u}px`, top: `${d}px`, border: l },
              { x: w, y: m } =
                (g = y.arrow) !== null && g !== void 0 ? g : { x: 0, y: 0 },
              h =
                (x = {
                  top: "bottom",
                  right: "left",
                  bottom: "top",
                  left: "right",
                }[f.split("-")[0]]) !== null && x !== void 0
                  ? x
                  : "bottom",
              p = l && { borderBottom: l, borderRight: l };
            let E = 0;
            if (l) {
              const _ = `${l}`.match(/(\d+)px/);
              E = _ != null && _[1] ? Number(_[1]) : 1;
            }
            return {
              tooltipStyles: b,
              tooltipArrowStyles: {
                left: w != null ? `${w}px` : "",
                top: m != null ? `${m}px` : "",
                right: "",
                bottom: "",
                ...p,
                [h]: `-${4 + E}px`,
              },
              place: f,
            };
          }
        ))
      : Vf(e, t, { placement: "bottom", strategy: o, middleware: a }).then(
          ({ x: u, y: d, placement: f }) => ({
            tooltipStyles: { left: `${u}px`, top: `${d}px` },
            tooltipArrowStyles: {},
            place: f,
          })
        );
  },
  Xf = (e, t) =>
    !("CSS" in window && "supports" in window.CSS) || window.CSS.supports(e, t),
  Jf = (e, t, n) => {
    let r = null;
    const s = function (...o) {
      const i = () => {
        r = null;
      };
      !r && (e.apply(this, o), (r = setTimeout(i, t)));
    };
    return (
      (s.cancel = () => {
        r && (clearTimeout(r), (r = null));
      }),
      s
    );
  },
  Zf = (e) => e !== null && !Array.isArray(e) && typeof e == "object",
  ju = (e, t) => {
    if (e === t) return !0;
    if (Array.isArray(e) && Array.isArray(t))
      return e.length === t.length && e.every((s, o) => ju(s, t[o]));
    if (Array.isArray(e) !== Array.isArray(t)) return !1;
    if (!Zf(e) || !Zf(t)) return e === t;
    const n = Object.keys(e),
      r = Object.keys(t);
    return n.length === r.length && n.every((s) => ju(e[s], t[s]));
  },
  vS = (e) => {
    if (!(e instanceof HTMLElement || e instanceof SVGElement)) return !1;
    const t = getComputedStyle(e);
    return ["overflow", "overflow-x", "overflow-y"].some((n) => {
      const r = t.getPropertyValue(n);
      return r === "auto" || r === "scroll";
    });
  },
  eh = (e) => {
    if (!e) return null;
    let t = e.parentElement;
    for (; t; ) {
      if (vS(t)) return t;
      t = t.parentElement;
    }
    return document.scrollingElement || document.documentElement;
  },
  xS = typeof window < "u" ? v.useLayoutEffect : v.useEffect,
  ut = (e) => {
    e.current && (clearTimeout(e.current), (e.current = null));
  },
  wS = "DEFAULT_TOOLTIP_ID",
  bS = {
    anchorRefs: new Set(),
    activeAnchor: { current: null },
    attach: () => {},
    detach: () => {},
    setActiveAnchor: () => {},
  },
  ES = v.createContext({ getTooltipData: () => bS });
function W0(e = wS) {
  return v.useContext(ES).getTooltipData(e);
}
var gr = {
    tooltip: "core-styles-module_tooltip__3vRRp",
    fixed: "core-styles-module_fixed__pcSol",
    arrow: "core-styles-module_arrow__cvMwQ",
    noArrow: "core-styles-module_noArrow__xock6",
    clickable: "core-styles-module_clickable__ZuTTB",
    show: "core-styles-module_show__Nt9eE",
    closing: "core-styles-module_closing__sGnxF",
  },
  ha = {
    tooltip: "styles-module_tooltip__mnnfp",
    arrow: "styles-module_arrow__K0L3T",
    dark: "styles-module_dark__xNqje",
    light: "styles-module_light__Z6W-X",
    success: "styles-module_success__A2AKt",
    warning: "styles-module_warning__SCK0X",
    error: "styles-module_error__JvumD",
    info: "styles-module_info__BWdHW",
  };
const SS = ({
    forwardRef: e,
    id: t,
    className: n,
    classNameArrow: r,
    variant: s = "dark",
    anchorId: o,
    anchorSelect: i,
    place: l = "top",
    offset: a = 10,
    events: u = ["hover"],
    openOnClick: d = !1,
    positionStrategy: f = "absolute",
    middlewares: y,
    wrapper: g,
    delayShow: x = 0,
    delayHide: b = 0,
    float: w = !1,
    hidden: m = !1,
    noArrow: h = !1,
    clickable: p = !1,
    closeOnEsc: E = !1,
    closeOnScroll: _ = !1,
    closeOnResize: C = !1,
    openEvents: S,
    closeEvents: N,
    globalCloseEvents: R,
    imperativeModeOnly: P,
    style: O,
    position: I,
    afterShow: U,
    afterHide: K,
    disableTooltip: Ee,
    content: fe,
    contentWrapperRef: Z,
    isOpen: T,
    defaultIsOpen: F = !1,
    setIsOpen: z,
    activeAnchor: Q,
    setActiveAnchor: te,
    border: qt,
    opacity: it,
    arrowColor: on,
    role: gt = "tooltip",
  }) => {
    var Ot;
    const Ie = v.useRef(null),
      ar = v.useRef(null),
      vt = v.useRef(null),
      ln = v.useRef(null),
      rs = v.useRef(null),
      [an, kl] = v.useState({
        tooltipStyles: {},
        tooltipArrowStyles: {},
        place: l,
      }),
      [Ge, jo] = v.useState(!1),
      [In, Fn] = v.useState(!1),
      [ie, ss] = v.useState(null),
      os = v.useRef(!1),
      is = v.useRef(null),
      { anchorRefs: ls, setActiveAnchor: ko } = W0(t),
      ur = v.useRef(!1),
      [un, as] = v.useState([]),
      Dn = v.useRef(!1),
      cr = d || u.includes("click"),
      us =
        cr ||
        (S == null ? void 0 : S.click) ||
        (S == null ? void 0 : S.dblclick) ||
        (S == null ? void 0 : S.mousedown),
      dr = S
        ? { ...S }
        : {
            mouseover: !0,
            focus: !0,
            mouseenter: !1,
            click: !1,
            dblclick: !1,
            mousedown: !1,
          };
    !S &&
      cr &&
      Object.assign(dr, {
        mouseenter: !1,
        focus: !1,
        mouseover: !1,
        click: !0,
      });
    const cs = N
      ? { ...N }
      : {
          mouseout: !0,
          blur: !0,
          mouseleave: !1,
          click: !1,
          dblclick: !1,
          mouseup: !1,
        };
    !N && cr && Object.assign(cs, { mouseleave: !1, blur: !1, mouseout: !1 });
    const xt = R
      ? { ...R }
      : {
          escape: E || !1,
          scroll: _ || !1,
          resize: C || !1,
          clickOutsideAnchor: us || !1,
        };
    P &&
      (Object.assign(dr, {
        mouseenter: !1,
        focus: !1,
        click: !1,
        dblclick: !1,
        mousedown: !1,
      }),
      Object.assign(cs, {
        mouseleave: !1,
        blur: !1,
        click: !1,
        dblclick: !1,
        mouseup: !1,
      }),
      Object.assign(xt, {
        escape: !1,
        scroll: !1,
        resize: !1,
        clickOutsideAnchor: !1,
      })),
      xS(
        () => (
          (Dn.current = !0),
          () => {
            Dn.current = !1;
          }
        ),
        []
      );
    const ge = (L) => {
      Dn.current &&
        (L && Fn(!0),
        setTimeout(() => {
          Dn.current && (z == null || z(L), T === void 0 && jo(L));
        }, 10));
    };
    v.useEffect(() => {
      if (T === void 0) return () => null;
      T && Fn(!0);
      const L = setTimeout(() => {
        jo(T);
      }, 10);
      return () => {
        clearTimeout(L);
      };
    }, [T]),
      v.useEffect(() => {
        if (Ge !== os.current)
          if ((ut(rs), (os.current = Ge), Ge)) U == null || U();
          else {
            const L = (($) => {
              const B = $.match(/^([\d.]+)(ms|s)$/);
              if (!B) return 0;
              const [, xe, Te] = B;
              return Number(xe) * (Te === "ms" ? 1 : 1e3);
            })(
              getComputedStyle(document.body).getPropertyValue(
                "--rt-transition-show-delay"
              )
            );
            rs.current = setTimeout(() => {
              Fn(!1), ss(null), K == null || K();
            }, L + 25);
          }
      }, [Ge]);
    const To = (L) => {
        kl(($) => (ju($, L) ? $ : L));
      },
      ds = (L = x) => {
        ut(vt),
          In
            ? ge(!0)
            : (vt.current = setTimeout(() => {
                ge(!0);
              }, L));
      },
      fr = (L = b) => {
        ut(ln),
          (ln.current = setTimeout(() => {
            ur.current || ge(!1);
          }, L));
      },
      fs = (L) => {
        var $;
        if (!L) return;
        const B = ($ = L.currentTarget) !== null && $ !== void 0 ? $ : L.target;
        if (!(B != null && B.isConnected))
          return te(null), void ko({ current: null });
        x ? ds() : ge(!0), te(B), ko({ current: B }), ut(ln);
      },
      hr = () => {
        p ? fr(b || 100) : b ? fr() : ge(!1), ut(vt);
      },
      pr = ({ x: L, y: $ }) => {
        var B;
        const xe = {
          getBoundingClientRect: () => ({
            x: L,
            y: $,
            width: 0,
            height: 0,
            top: $,
            left: L,
            right: L,
            bottom: $,
          }),
        };
        Gf({
          place:
            (B = ie == null ? void 0 : ie.place) !== null && B !== void 0
              ? B
              : l,
          offset: a,
          elementReference: xe,
          tooltipReference: Ie.current,
          tooltipArrowReference: ar.current,
          strategy: f,
          middlewares: y,
          border: qt,
        }).then((Te) => {
          To(Te);
        });
      },
      mr = (L) => {
        if (!L) return;
        const $ = L,
          B = { x: $.clientX, y: $.clientY };
        pr(B), (is.current = B);
      },
      hs = (L) => {
        var $;
        if (!Ge) return;
        const B = L.target;
        B.isConnected &&
          ((!(($ = Ie.current) === null || $ === void 0) && $.contains(B)) ||
            [document.querySelector(`[id='${o}']`), ...un].some((xe) =>
              xe == null ? void 0 : xe.contains(B)
            ) ||
            (ge(!1), ut(vt)));
      },
      Ro = Jf(fs, 50),
      Se = Jf(hr, 50),
      lt = (L) => {
        Se.cancel(), Ro(L);
      },
      M = () => {
        Ro.cancel(), Se();
      },
      Y = v.useCallback(() => {
        var L, $;
        const B =
          (L = ie == null ? void 0 : ie.position) !== null && L !== void 0
            ? L
            : I;
        B
          ? pr(B)
          : w
          ? is.current && pr(is.current)
          : Q != null &&
            Q.isConnected &&
            Gf({
              place:
                ($ = ie == null ? void 0 : ie.place) !== null && $ !== void 0
                  ? $
                  : l,
              offset: a,
              elementReference: Q,
              tooltipReference: Ie.current,
              tooltipArrowReference: ar.current,
              strategy: f,
              middlewares: y,
              border: qt,
            }).then((xe) => {
              Dn.current && To(xe);
            });
      }, [
        Ge,
        Q,
        fe,
        O,
        l,
        ie == null ? void 0 : ie.place,
        a,
        f,
        I,
        ie == null ? void 0 : ie.position,
        w,
      ]);
    v.useEffect(() => {
      var L, $;
      const B = new Set(ls);
      un.forEach((J) => {
        (Ee != null && Ee(J)) || B.add({ current: J });
      });
      const xe = document.querySelector(`[id='${o}']`);
      xe && !(Ee != null && Ee(xe)) && B.add({ current: xe });
      const Te = () => {
          ge(!1);
        },
        Pt = eh(Q),
        Lt = eh(Ie.current);
      xt.scroll &&
        (window.addEventListener("scroll", Te),
        Pt == null || Pt.addEventListener("scroll", Te),
        Lt == null || Lt.addEventListener("scroll", Te));
      let Fe = null;
      xt.resize
        ? window.addEventListener("resize", Te)
        : Q &&
          Ie.current &&
          (Fe = cS(Q, Ie.current, Y, {
            ancestorResize: !0,
            elementResize: !0,
            layoutShift: !0,
          }));
      const at = (J) => {
        J.key === "Escape" && ge(!1);
      };
      xt.escape && window.addEventListener("keydown", at),
        xt.clickOutsideAnchor && window.addEventListener("click", hs);
      const se = [],
        ps = (J) => {
          (Ge && (J == null ? void 0 : J.target) === Q) || fs(J);
        },
        K0 = (J) => {
          Ge && (J == null ? void 0 : J.target) === Q && hr();
        },
        Qc = [
          "mouseover",
          "mouseout",
          "mouseenter",
          "mouseleave",
          "focus",
          "blur",
        ],
        qc = ["click", "dblclick", "mousedown", "mouseup"];
      Object.entries(dr).forEach(([J, Vt]) => {
        Vt &&
          (Qc.includes(J)
            ? se.push({ event: J, listener: lt })
            : qc.includes(J) && se.push({ event: J, listener: ps }));
      }),
        Object.entries(cs).forEach(([J, Vt]) => {
          Vt &&
            (Qc.includes(J)
              ? se.push({ event: J, listener: M })
              : qc.includes(J) && se.push({ event: J, listener: K0 }));
        }),
        w && se.push({ event: "pointermove", listener: mr });
      const Vc = () => {
          ur.current = !0;
        },
        Wc = () => {
          (ur.current = !1), hr();
        };
      return (
        p &&
          !us &&
          ((L = Ie.current) === null ||
            L === void 0 ||
            L.addEventListener("mouseenter", Vc),
          ($ = Ie.current) === null ||
            $ === void 0 ||
            $.addEventListener("mouseleave", Wc)),
        se.forEach(({ event: J, listener: Vt }) => {
          B.forEach((Tl) => {
            var ms;
            (ms = Tl.current) === null ||
              ms === void 0 ||
              ms.addEventListener(J, Vt);
          });
        }),
        () => {
          var J, Vt;
          xt.scroll &&
            (window.removeEventListener("scroll", Te),
            Pt == null || Pt.removeEventListener("scroll", Te),
            Lt == null || Lt.removeEventListener("scroll", Te)),
            xt.resize
              ? window.removeEventListener("resize", Te)
              : Fe == null || Fe(),
            xt.clickOutsideAnchor && window.removeEventListener("click", hs),
            xt.escape && window.removeEventListener("keydown", at),
            p &&
              !us &&
              ((J = Ie.current) === null ||
                J === void 0 ||
                J.removeEventListener("mouseenter", Vc),
              (Vt = Ie.current) === null ||
                Vt === void 0 ||
                Vt.removeEventListener("mouseleave", Wc)),
            se.forEach(({ event: Tl, listener: ms }) => {
              B.forEach((Y0) => {
                var Rl;
                (Rl = Y0.current) === null ||
                  Rl === void 0 ||
                  Rl.removeEventListener(Tl, ms);
              });
            });
        }
      );
    }, [Q, Y, In, ls, un, S, N, R, cr, x, b]),
      v.useEffect(() => {
        var L, $;
        let B =
          ($ =
            (L = ie == null ? void 0 : ie.anchorSelect) !== null && L !== void 0
              ? L
              : i) !== null && $ !== void 0
            ? $
            : "";
        !B && t && (B = `[data-tooltip-id='${t.replace(/'/g, "\\'")}']`);
        const xe = new MutationObserver((Te) => {
          const Pt = [],
            Lt = [];
          Te.forEach((Fe) => {
            if (
              (Fe.type === "attributes" &&
                Fe.attributeName === "data-tooltip-id" &&
                (Fe.target.getAttribute("data-tooltip-id") === t
                  ? Pt.push(Fe.target)
                  : Fe.oldValue === t && Lt.push(Fe.target)),
              Fe.type === "childList")
            ) {
              if (Q) {
                const at = [...Fe.removedNodes].filter(
                  (se) => se.nodeType === 1
                );
                if (B)
                  try {
                    Lt.push(...at.filter((se) => se.matches(B))),
                      Lt.push(
                        ...at.flatMap((se) => [...se.querySelectorAll(B)])
                      );
                  } catch {}
                at.some((se) => {
                  var ps;
                  return (
                    !!(
                      !(
                        (ps = se == null ? void 0 : se.contains) === null ||
                        ps === void 0
                      ) && ps.call(se, Q)
                    ) && (Fn(!1), ge(!1), te(null), ut(vt), ut(ln), !0)
                  );
                });
              }
              if (B)
                try {
                  const at = [...Fe.addedNodes].filter(
                    (se) => se.nodeType === 1
                  );
                  Pt.push(...at.filter((se) => se.matches(B))),
                    Pt.push(...at.flatMap((se) => [...se.querySelectorAll(B)]));
                } catch {}
            }
          }),
            (Pt.length || Lt.length) &&
              as((Fe) => [...Fe.filter((at) => !Lt.includes(at)), ...Pt]);
        });
        return (
          xe.observe(document.body, {
            childList: !0,
            subtree: !0,
            attributes: !0,
            attributeFilter: ["data-tooltip-id"],
            attributeOldValue: !0,
          }),
          () => {
            xe.disconnect();
          }
        );
      }, [t, i, ie == null ? void 0 : ie.anchorSelect, Q]),
      v.useEffect(() => {
        Y();
      }, [Y]),
      v.useEffect(() => {
        if (!(Z != null && Z.current)) return () => null;
        const L = new ResizeObserver(() => {
          setTimeout(() => Y());
        });
        return (
          L.observe(Z.current),
          () => {
            L.disconnect();
          }
        );
      }, [fe, Z == null ? void 0 : Z.current]),
      v.useEffect(() => {
        var L;
        const $ = document.querySelector(`[id='${o}']`),
          B = [...un, $];
        (Q && B.includes(Q)) ||
          te((L = un[0]) !== null && L !== void 0 ? L : $);
      }, [o, un, Q]),
      v.useEffect(
        () => (
          F && ge(!0),
          () => {
            ut(vt), ut(ln);
          }
        ),
        []
      ),
      v.useEffect(() => {
        var L;
        let $ =
          (L = ie == null ? void 0 : ie.anchorSelect) !== null && L !== void 0
            ? L
            : i;
        if (
          (!$ && t && ($ = `[data-tooltip-id='${t.replace(/'/g, "\\'")}']`), $)
        )
          try {
            const B = Array.from(document.querySelectorAll($));
            as(B);
          } catch {
            as([]);
          }
      }, [t, i, ie == null ? void 0 : ie.anchorSelect]),
      v.useEffect(() => {
        vt.current && (ut(vt), ds(x));
      }, [x]);
    const Xe =
        (Ot = ie == null ? void 0 : ie.content) !== null && Ot !== void 0
          ? Ot
          : fe,
      Mn = Ge && Object.keys(an.tooltipStyles).length > 0;
    return (
      v.useImperativeHandle(e, () => ({
        open: (L) => {
          if (L != null && L.anchorSelect)
            try {
              document.querySelector(L.anchorSelect);
            } catch {
              return void console.warn(
                `[react-tooltip] "${L.anchorSelect}" is not a valid CSS selector`
              );
            }
          ss(L ?? null), L != null && L.delay ? ds(L.delay) : ge(!0);
        },
        close: (L) => {
          L != null && L.delay ? fr(L.delay) : ge(!1);
        },
        activeAnchor: Q,
        place: an.place,
        isOpen: !!(In && !m && Xe && Mn),
      })),
      In && !m && Xe
        ? V.createElement(
            g,
            {
              id: t,
              role: gt,
              className: Nu(
                "react-tooltip",
                gr.tooltip,
                ha.tooltip,
                ha[s],
                n,
                `react-tooltip__place-${an.place}`,
                gr[Mn ? "show" : "closing"],
                Mn ? "react-tooltip__show" : "react-tooltip__closing",
                f === "fixed" && gr.fixed,
                p && gr.clickable
              ),
              onTransitionEnd: (L) => {
                ut(rs),
                  Ge ||
                    L.propertyName !== "opacity" ||
                    (Fn(!1), ss(null), K == null || K());
              },
              style: {
                ...O,
                ...an.tooltipStyles,
                opacity: it !== void 0 && Mn ? it : void 0,
              },
              ref: Ie,
            },
            Xe,
            V.createElement(g, {
              className: Nu(
                "react-tooltip-arrow",
                gr.arrow,
                ha.arrow,
                r,
                h && gr.noArrow
              ),
              style: {
                ...an.tooltipArrowStyles,
                background: on
                  ? `linear-gradient(to right bottom, transparent 50%, ${on} 50%)`
                  : void 0,
              },
              ref: ar,
            })
          )
        : null
    );
  },
  CS = ({ content: e }) =>
    V.createElement("span", { dangerouslySetInnerHTML: { __html: e } }),
  uo = V.forwardRef(
    (
      {
        id: e,
        anchorId: t,
        anchorSelect: n,
        content: r,
        html: s,
        render: o,
        className: i,
        classNameArrow: l,
        variant: a = "dark",
        place: u = "top",
        offset: d = 10,
        wrapper: f = "div",
        children: y = null,
        events: g = ["hover"],
        openOnClick: x = !1,
        positionStrategy: b = "absolute",
        middlewares: w,
        delayShow: m = 0,
        delayHide: h = 0,
        float: p = !1,
        hidden: E = !1,
        noArrow: _ = !1,
        clickable: C = !1,
        closeOnEsc: S = !1,
        closeOnScroll: N = !1,
        closeOnResize: R = !1,
        openEvents: P,
        closeEvents: O,
        globalCloseEvents: I,
        imperativeModeOnly: U = !1,
        style: K,
        position: Ee,
        isOpen: fe,
        defaultIsOpen: Z = !1,
        disableStyleInjection: T = !1,
        border: F,
        opacity: z,
        arrowColor: Q,
        setIsOpen: te,
        afterShow: qt,
        afterHide: it,
        disableTooltip: on,
        role: gt = "tooltip",
      },
      Ot
    ) => {
      const [Ie, ar] = v.useState(r),
        [vt, ln] = v.useState(s),
        [rs, an] = v.useState(u),
        [kl, Ge] = v.useState(a),
        [jo, In] = v.useState(d),
        [Fn, ie] = v.useState(m),
        [ss, os] = v.useState(h),
        [is, ls] = v.useState(p),
        [ko, ur] = v.useState(E),
        [un, as] = v.useState(f),
        [Dn, cr] = v.useState(g),
        [us, dr] = v.useState(b),
        [cs, xt] = v.useState(null),
        [ge, To] = v.useState(null),
        ds = v.useRef(T),
        { anchorRefs: fr, activeAnchor: fs } = W0(e),
        hr = (Se) =>
          Se == null
            ? void 0
            : Se.getAttributeNames().reduce((lt, M) => {
                var Y;
                return (
                  M.startsWith("data-tooltip-") &&
                    (lt[M.replace(/^data-tooltip-/, "")] =
                      (Y = Se == null ? void 0 : Se.getAttribute(M)) !== null &&
                      Y !== void 0
                        ? Y
                        : null),
                  lt
                );
              }, {}),
        pr = (Se) => {
          const lt = {
            place: (M) => {
              var Y;
              an((Y = M) !== null && Y !== void 0 ? Y : u);
            },
            content: (M) => {
              ar(M ?? r);
            },
            html: (M) => {
              ln(M ?? s);
            },
            variant: (M) => {
              var Y;
              Ge((Y = M) !== null && Y !== void 0 ? Y : a);
            },
            offset: (M) => {
              In(M === null ? d : Number(M));
            },
            wrapper: (M) => {
              var Y;
              as((Y = M) !== null && Y !== void 0 ? Y : f);
            },
            events: (M) => {
              const Y = M == null ? void 0 : M.split(" ");
              cr(Y ?? g);
            },
            "position-strategy": (M) => {
              var Y;
              dr((Y = M) !== null && Y !== void 0 ? Y : b);
            },
            "delay-show": (M) => {
              ie(M === null ? m : Number(M));
            },
            "delay-hide": (M) => {
              os(M === null ? h : Number(M));
            },
            float: (M) => {
              ls(M === null ? p : M === "true");
            },
            hidden: (M) => {
              ur(M === null ? E : M === "true");
            },
            "class-name": (M) => {
              xt(M);
            },
          };
          Object.values(lt).forEach((M) => M(null)),
            Object.entries(Se).forEach(([M, Y]) => {
              var Xe;
              (Xe = lt[M]) === null || Xe === void 0 || Xe.call(lt, Y);
            });
        };
      v.useEffect(() => {
        ar(r);
      }, [r]),
        v.useEffect(() => {
          ln(s);
        }, [s]),
        v.useEffect(() => {
          an(u);
        }, [u]),
        v.useEffect(() => {
          Ge(a);
        }, [a]),
        v.useEffect(() => {
          In(d);
        }, [d]),
        v.useEffect(() => {
          ie(m);
        }, [m]),
        v.useEffect(() => {
          os(h);
        }, [h]),
        v.useEffect(() => {
          ls(p);
        }, [p]),
        v.useEffect(() => {
          ur(E);
        }, [E]),
        v.useEffect(() => {
          dr(b);
        }, [b]),
        v.useEffect(() => {
          ds.current !== T &&
            console.warn(
              "[react-tooltip] Do not change `disableStyleInjection` dynamically."
            );
        }, [T]),
        v.useEffect(() => {
          typeof window < "u" &&
            window.dispatchEvent(
              new CustomEvent("react-tooltip-inject-styles", {
                detail: { disableCore: T === "core", disableBase: T },
              })
            );
        }, []),
        v.useEffect(() => {
          var Se;
          const lt = new Set(fr);
          let M = n;
          if (
            (!M && e && (M = `[data-tooltip-id='${e.replace(/'/g, "\\'")}']`),
            M)
          )
            try {
              document.querySelectorAll(M).forEach(($) => {
                lt.add({ current: $ });
              });
            } catch {
              console.warn(
                `[react-tooltip] "${M}" is not a valid CSS selector`
              );
            }
          const Y = document.querySelector(`[id='${t}']`);
          if ((Y && lt.add({ current: Y }), !lt.size)) return () => null;
          const Xe = (Se = ge ?? Y) !== null && Se !== void 0 ? Se : fs.current,
            Mn = new MutationObserver(($) => {
              $.forEach((B) => {
                var xe;
                if (
                  !Xe ||
                  B.type !== "attributes" ||
                  !(
                    !((xe = B.attributeName) === null || xe === void 0) &&
                    xe.startsWith("data-tooltip-")
                  )
                )
                  return;
                const Te = hr(Xe);
                pr(Te);
              });
            }),
            L = { attributes: !0, childList: !1, subtree: !1 };
          if (Xe) {
            const $ = hr(Xe);
            pr($), Mn.observe(Xe, L);
          }
          return () => {
            Mn.disconnect();
          };
        }, [fr, fs, ge, t, n]),
        v.useEffect(() => {
          K != null &&
            K.border &&
            console.warn(
              "[react-tooltip] Do not set `style.border`. Use `border` prop instead."
            ),
            F &&
              !Xf("border", `${F}`) &&
              console.warn(`[react-tooltip] "${F}" is not a valid \`border\`.`),
            K != null &&
              K.opacity &&
              console.warn(
                "[react-tooltip] Do not set `style.opacity`. Use `opacity` prop instead."
              ),
            z &&
              !Xf("opacity", `${z}`) &&
              console.warn(
                `[react-tooltip] "${z}" is not a valid \`opacity\`.`
              );
        }, []);
      let mr = y;
      const hs = v.useRef(null);
      if (o) {
        const Se = o({
          content:
            (ge == null ? void 0 : ge.getAttribute("data-tooltip-content")) ||
            Ie ||
            null,
          activeAnchor: ge,
        });
        mr = Se
          ? V.createElement(
              "div",
              { ref: hs, className: "react-tooltip-content-wrapper" },
              Se
            )
          : null;
      } else Ie && (mr = Ie);
      vt && (mr = V.createElement(CS, { content: vt }));
      const Ro = {
        forwardRef: Ot,
        id: e,
        anchorId: t,
        anchorSelect: n,
        className: Nu(i, cs),
        classNameArrow: l,
        content: mr,
        contentWrapperRef: hs,
        place: rs,
        variant: kl,
        offset: jo,
        wrapper: un,
        events: Dn,
        openOnClick: x,
        positionStrategy: us,
        middlewares: w,
        delayShow: Fn,
        delayHide: ss,
        float: is,
        hidden: ko,
        noArrow: _,
        clickable: C,
        closeOnEsc: S,
        closeOnScroll: N,
        closeOnResize: R,
        openEvents: P,
        closeEvents: O,
        globalCloseEvents: I,
        imperativeModeOnly: U,
        style: K,
        position: Ee,
        isOpen: fe,
        defaultIsOpen: Z,
        border: F,
        opacity: z,
        arrowColor: Q,
        setIsOpen: te,
        afterShow: qt,
        afterHide: it,
        disableTooltip: on,
        activeAnchor: ge,
        setActiveAnchor: (Se) => To(Se),
        role: gt,
      };
      return V.createElement(SS, { ...Ro });
    }
  );
typeof window < "u" &&
  window.addEventListener("react-tooltip-inject-styles", (e) => {
    e.detail.disableCore ||
      Yf({
        css: ":root{--rt-color-white:#fff;--rt-color-dark:#222;--rt-color-success:#8dc572;--rt-color-error:#be6464;--rt-color-warning:#f0ad4e;--rt-color-info:#337ab7;--rt-opacity:0.9;--rt-transition-show-delay:0.15s;--rt-transition-closing-delay:0.15s}.core-styles-module_tooltip__3vRRp{position:absolute;top:0;left:0;pointer-events:none;opacity:0;will-change:opacity}.core-styles-module_fixed__pcSol{position:fixed}.core-styles-module_arrow__cvMwQ{position:absolute;background:inherit}.core-styles-module_noArrow__xock6{display:none}.core-styles-module_clickable__ZuTTB{pointer-events:auto}.core-styles-module_show__Nt9eE{opacity:var(--rt-opacity);transition:opacity var(--rt-transition-show-delay)ease-out}.core-styles-module_closing__sGnxF{opacity:0;transition:opacity var(--rt-transition-closing-delay)ease-in}",
        type: "core",
      }),
      e.detail.disableBase ||
        Yf({
          css: `
.styles-module_tooltip__mnnfp{padding:8px 16px;border-radius:3px;font-size:90%;width:max-content}.styles-module_arrow__K0L3T{width:8px;height:8px}[class*='react-tooltip__place-top']>.styles-module_arrow__K0L3T{transform:rotate(45deg)}[class*='react-tooltip__place-right']>.styles-module_arrow__K0L3T{transform:rotate(135deg)}[class*='react-tooltip__place-bottom']>.styles-module_arrow__K0L3T{transform:rotate(225deg)}[class*='react-tooltip__place-left']>.styles-module_arrow__K0L3T{transform:rotate(315deg)}.styles-module_dark__xNqje{background:var(--rt-color-dark);color:var(--rt-color-white)}.styles-module_light__Z6W-X{background-color:var(--rt-color-white);color:var(--rt-color-dark)}.styles-module_success__A2AKt{background-color:var(--rt-color-success);color:var(--rt-color-white)}.styles-module_warning__SCK0X{background-color:var(--rt-color-warning);color:var(--rt-color-white)}.styles-module_error__JvumD{background-color:var(--rt-color-error);color:var(--rt-color-white)}.styles-module_info__BWdHW{background-color:var(--rt-color-info);color:var(--rt-color-white)}`,
          type: "base",
        });
  });
const _S = async () => {
    const e = await fetch("http://localhost:4000/api/teacher/me", {
      method: "GET",
      credentials: "include",
    });
    if (!e.ok) throw new Error("User not found or deleted");
    return e.json();
  },
  Go = ({ icon: e, label: t, link: n, isExpanded: r }) =>
    c.jsxs(Me, {
      to: n,
      className:
        "flex items-center w-full px-4 py-3 text-gray-200 transition hover:bg-blue-600 focus:bg-blue-600",
      "data-tooltip-id": t,
      children: [
        c.jsx(e, { className: "text-xl" }),
        r &&
          c.jsx("span", { className: "ml-4 text-sm font-medium", children: t }),
        c.jsx(uo, { id: t, place: "right", effect: "solid" }),
      ],
    }),
  NS = () => {
    const e = Ae(),
      [t, n] = v.useState(!0),
      r = localStorage.getItem("role"),
      s = localStorage.getItem("login_token");
    v.useEffect(() => {
      s ? r !== "Teacher" && e("/unauthorized") : e("/login");
    }, [s, r, e]);
    const {
      data: o,
      error: i,
      isLoading: l,
      refetch: a,
    } = lo({ queryKey: ["userData"], queryFn: _S, retry: !1 });
    return l
      ? c.jsx("div", {
          className: "flex items-center justify-center h-screen bg-gray-100",
          children: c.jsx("h1", {
            className: "text-2xl font-semibold text-gray-600",
            children: "Loading...",
          }),
        })
      : i
      ? c.jsxs("div", {
          className:
            "flex flex-col items-center justify-center h-screen bg-gray-100",
          children: [
            c.jsx("h1", {
              className: "text-2xl font-semibold text-red-600",
              children: "You cannot access this page.",
            }),
            c.jsx("p", {
              className: "text-gray-700 mt-2",
              children:
                "Your account may have been deleted or there was an error fetching your data.",
            }),
            c.jsx("button", {
              onClick: () => a(),
              className:
                "mt-4 px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700",
              children: "Try Again",
            }),
          ],
        })
      : c.jsxs("div", {
          className: "flex h-screen bg-gray-100",
          children: [
            c.jsxs("aside", {
              className: `bg-blue-700 text-white ${
                t ? "w-64" : "w-16"
              } transition-all duration-300 ease-in-out flex flex-col`,
              children: [
                c.jsxs("div", {
                  className: "flex items-center justify-between p-4",
                  children: [
                    t &&
                      c.jsx(Me, {
                        to: "/dashboard/teacher",
                        children: c.jsx("h2", {
                          className: "text-2xl font-bold cursor-pointer",
                          children: "Teacher Panel",
                        }),
                      }),
                    c.jsx("button", {
                      onClick: () => n(!t),
                      className: "text-2xl text-white focus:outline-none",
                      "data-tooltip-id": "sidebar-toggle",
                      children: c.jsx(y0, {}),
                    }),
                    c.jsx(uo, {
                      id: "sidebar-toggle",
                      content: "Toggle Sidebar",
                    }),
                  ],
                }),
                c.jsxs("nav", {
                  className: "mt-4 space-y-2 flex-1",
                  children: [
                    c.jsx(Go, {
                      icon: Qi,
                      label: "Create Exam",
                      link: "create-exam",
                      isExpanded: t,
                    }),
                    c.jsx(Go, {
                      icon: ca,
                      label: "View Exam",
                      link: "view-exams",
                      isExpanded: t,
                    }),
                    c.jsx(Go, {
                      icon: ca,
                      label: "Exam Submissions",
                      link: "submissions",
                      isExpanded: t,
                    }),
                    c.jsx(Go, {
                      icon: ca,
                      label: "Saved Exam",
                      link: "saved-exams",
                      isExpanded: t,
                    }),
                  ],
                }),
              ],
            }),
            c.jsxs("main", {
              className: "flex-1 p-8",
              children: [
                c.jsx("h1", {
                  className: "mb-6 text-3xl font-semibold text-blue-700",
                  children: "Welcome to the Teacher Dashboard",
                }),
                c.jsx("p", {
                  className: "mb-6 text-lg text-gray-700",
                  children:
                    "Manage your exams and submissions from the sidebar.",
                }),
                c.jsx("div", {
                  className: "p-6 bg-white rounded-lg shadow-lg",
                  children: c.jsx(Nc, {}),
                }),
              ],
            }),
          ],
        });
  },
  jS = async () => {
    const e = await fetch("http://localhost:4000/api/student/me", {
      method: "GET",
      credentials: "include",
    });
    if (!e.ok) throw new Error("User not found or deleted");
    return e.json();
  },
  Xo = ({ icon: e, label: t, link: n, isExpanded: r }) =>
    c.jsxs(Me, {
      to: n,
      className:
        "flex items-center w-full px-4 py-3 text-gray-200 transition hover:bg-green-600 focus:bg-green-600",
      "data-tooltip-id": t,
      children: [
        c.jsx(e, { className: "text-xl" }),
        r &&
          c.jsx("span", { className: "ml-4 text-sm font-medium", children: t }),
        c.jsx(uo, { id: t, place: "right", effect: "solid" }),
      ],
    }),
  th = () => {
    const e = Ae(),
      [t, n] = v.useState(!0),
      r = localStorage.getItem("role"),
      s = localStorage.getItem("login_token");
    v.useEffect(() => {
      s ? r !== "Student" && e("/unauthorized") : e("/login");
    }, [s, r, e]);
    const {
      data: o,
      error: i,
      isLoading: l,
      refetch: a,
    } = lo({ queryKey: ["userData"], queryFn: jS, retry: !1 });
    return l
      ? c.jsx("div", {
          className: "flex items-center justify-center h-screen bg-gray-100",
          children: c.jsx("h1", {
            className: "text-2xl font-semibold text-gray-600",
            children: "Loading...",
          }),
        })
      : i
      ? c.jsxs("div", {
          className:
            "flex flex-col items-center justify-center h-screen bg-gray-100",
          children: [
            c.jsx("h1", {
              className: "text-2xl font-semibold text-red-600",
              children: "You cannot access this page.",
            }),
            c.jsx("p", {
              className: "text-gray-700 mt-2",
              children:
                "Your account may have been deleted or there was an error fetching your data.",
            }),
            c.jsx("button", {
              onClick: () => a(),
              className:
                "mt-4 px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700",
              children: "Try Again",
            }),
            c.jsx("button", {
              onClick: I0,
              className:
                "mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700",
              children: "Logout",
            }),
          ],
        })
      : c.jsxs("div", {
          className: "flex h-screen bg-gray-100",
          children: [
            c.jsxs("aside", {
              className: `bg-green-700 text-white ${
                t ? "w-64" : "w-16"
              } transition-all duration-300 ease-in-out flex flex-col`,
              children: [
                c.jsxs("div", {
                  className: "flex items-center justify-between p-4",
                  children: [
                    t &&
                      c.jsx(Me, {
                        to: "/dashboard/student",
                        children: c.jsx("h2", {
                          className: "text-2xl font-bold cursor-pointer",
                          children: "Student Panel",
                        }),
                      }),
                    c.jsx("button", {
                      onClick: () => n(!t),
                      className: "text-2xl text-white focus:outline-none",
                      "data-tooltip-id": "sidebar-toggle",
                      children: c.jsx(y0, {}),
                    }),
                    c.jsx(uo, {
                      id: "sidebar-toggle",
                      content: "Toggle Sidebar",
                    }),
                  ],
                }),
                c.jsxs("nav", {
                  className: "mt-4 space-y-2 flex-1",
                  children: [
                    c.jsx(Xo, {
                      icon: $b,
                      label: "My Exams",
                      link: "take-exam",
                      isExpanded: t,
                    }),
                    c.jsx(Xo, {
                      icon: Tf,
                      label: "Results",
                      link: "results",
                      isExpanded: t,
                    }),
                    c.jsx(Xo, {
                      icon: zb,
                      label: "Courses",
                      link: "courses",
                      isExpanded: t,
                    }),
                    c.jsx(Xo, {
                      icon: Tf,
                      label: "Completed Exams",
                      link: "completed-exam",
                      isExpanded: t,
                    }),
                  ],
                }),
                c.jsx("div", {
                  className: "p-4",
                  children: c.jsx(uo, { id: "logout", content: "Logout" }),
                }),
              ],
            }),
            c.jsxs("main", {
              className: "flex-1 p-8",
              children: [
                c.jsx("h1", {
                  className: "mb-6 text-3xl font-semibold text-green-700",
                  children: "Welcome to the Student Dashboard",
                }),
                c.jsx("p", {
                  className: "mb-6 text-lg text-gray-700",
                  children:
                    "Access your exams and view your results from the sidebar.",
                }),
                c.jsx("div", {
                  className: "p-6 bg-white rounded-lg shadow-lg",
                  children: c.jsx(Nc, {}),
                }),
              ],
            }),
          ],
        });
  },
  kS = () => {
    const e = Ae();
    return c.jsxs("div", {
      className:
        "flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center",
      children: [
        c.jsx("h1", {
          className: "text-8xl font-extrabold text-red-500 mb-4",
          children: "404",
        }),
        c.jsx("p", {
          className: "text-2xl font-semibold text-gray-700 mb-2",
          children: "Page Not Found",
        }),
        c.jsx("p", {
          className: "text-gray-500 mb-6",
          children:
            "Sorry, the page you’re looking for doesn’t exist or has been moved.",
        }),
        c.jsx("button", {
          onClick: () => e("/"),
          className:
            "px-8 py-3 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition duration-300",
          children: "Go Back Home",
        }),
      ],
    });
  },
  TS = () => {
    const e = Ae(),
      [t, n] = v.useState([]),
      [r, s] = v.useState(!0),
      [o, i] = v.useState(null);
    if (
      (v.useEffect(() => {
        (async () => {
          try {
            const u = await Fw();
            console.log({ res: u }), n(u.data.user.assignedSubjects || []);
          } catch (u) {
            console.log(u), i("Failed to fetch assigned subjects.");
          } finally {
            s(!1);
          }
        })();
      }, []),
      r)
    )
      return c.jsx("div", {
        className: "flex justify-center items-center h-screen",
        children: c.jsx("div", {
          className:
            "animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500",
        }),
      });
    if (o)
      return c.jsx("div", {
        className: "flex justify-center items-center h-screen text-red-500",
        children: o,
      });
    const l = async (a) => {
      try {
        const u = await Dw(a.subject);
        u.statusText
          ? e(a.subject, { state: u.data.exam._id })
          : D.error("Failed to create exam for this subject.", {
              position: "top-right",
              autoClose: 250,
              hideProgressBar: !1,
              closeOnClick: !0,
              pauseOnHover: !0,
              draggable: !0,
              progress: void 0,
              theme: "light",
            });
      } catch (u) {
        console.error("Error starting exam:", u);
      }
    };
    return c.jsxs("div", {
      className: "min-h-screen bg-gray-100 py-10 px-10",
      children: [
        c.jsx("h1", {
          className: "text-2xl font-bold text-gray-700 mb-6",
          children: "Assigned Subjects",
        }),
        t.length > 0
          ? c.jsx("div", {
              className:
                "grid w-full h-full grid-cols-1 gap-6 mb-12 md:grid-cols-2 lg:grid-cols-3",
              children: t.map((a, u) =>
                c.jsxs(
                  "div",
                  {
                    className:
                      "flex flex-col items-start justify-between px-8 py-4 rounded-lg shadow-md bg-white min-h-[160px] transition hover:shadow-lg",
                    children: [
                      c.jsx("h2", {
                        className: "text-xl font-semibold text-gray-800",
                        children: a.subject,
                      }),
                      c.jsxs("p", {
                        className: "text-gray-600",
                        children: ["Semester: ", a.semester],
                      }),
                      c.jsxs("p", {
                        className: "text-gray-600",
                        children: ["Year: ", a.year],
                      }),
                      c.jsx("button", {
                        className:
                          "px-4 py-2 w-1/2 mt-4 text-white transition bg-green-600 rounded hover:bg-green-700",
                        onClick: () => {
                          l(a);
                        },
                        children: "Create Exam",
                      }),
                    ],
                  },
                  u
                )
              ),
            })
          : c.jsx("p", {
              className: "text-gray-600 text-center",
              children: "You are not assigned to any subjects yet.",
            }),
      ],
    });
  },
  RS = () => {
    const [e, t] = v.useState([]),
      [n, r] = v.useState([]),
      s = Ae(),
      o = new Date().getTime(),
      {
        data: i,
        isLoading: l,
        error: a,
      } = lo({
        queryKey: ["studentExams"],
        queryFn: Uw,
        refetchInterval: 1e3,
        refetchOnWindowFocus: !0,
        staleTime: 1e3 * 60 * 5,
        onSuccess: (u) => {
          console.log(u);
          const d = (u.data.exams || []).filter((f) => {
            const y = new Date(f.startTime).getTime(),
              g = new Date(f.endTime).getTime();
            return o >= y && o <= g;
          });
          t(d);
        },
      });
    return (
      lo({
        queryKey: ["upcomingExams"],
        queryFn: Bw,
        refetchInterval: 2e3,
        refetchOnWindowFocus: !0,
        staleTime: 1e3 * 60 * 5,
        onSuccess: (u) => {
          console.log(u), r(u.data.exams || []);
        },
      }),
      l
        ? c.jsx("p", { children: "Loading..." })
        : a
        ? c.jsxs("p", { children: ["Error: ", a.message] })
        : c.jsxs("div", {
            className: "min-h-screen p-8 bg-gray-100",
            children: [
              c.jsx("h1", {
                className: "mb-6 text-4xl font-bold text-green-700",
                children: "Available Exams",
              }),
              e.length === 0
                ? c.jsx("div", {
                    className: "text-center text-gray-600",
                    children: "No available exams.",
                  })
                : c.jsx("div", {
                    className:
                      "grid grid-cols-1 gap-6 mb-12 md:grid-cols-2 lg:grid-cols-3",
                    children: e.map((u) =>
                      c.jsxs(
                        "div",
                        {
                          className:
                            "p-6 bg-white border border-gray-200 rounded-lg shadow-md",
                          children: [
                            c.jsx("h2", {
                              className:
                                "mb-2 text-2xl font-semibold text-green-700",
                              children: u.title,
                            }),
                            c.jsxs("p", {
                              className: "text-gray-600",
                              children: [
                                c.jsx("strong", { children: "Subject:" }),
                                " ",
                                u.subject,
                              ],
                            }),
                            c.jsxs("p", {
                              className: "text-gray-600",
                              children: [
                                c.jsx("strong", { children: "Year:" }),
                                " ",
                                u.year,
                                " | ",
                                c.jsx("strong", { children: "Semester:" }),
                                " ",
                                u.semester,
                              ],
                            }),
                            c.jsxs("p", {
                              className: "text-gray-600",
                              children: [
                                c.jsx("strong", { children: "Time Limit:" }),
                                " ",
                                u.timeLimit,
                                " minutes",
                              ],
                            }),
                            c.jsx("button", {
                              className:
                                "px-4 py-2 mt-4 text-white transition bg-green-600 rounded hover:bg-green-700",
                              onClick: () => s(u._id, { state: u }),
                              children: "Start Exam",
                            }),
                          ],
                        },
                        u._id
                      )
                    ),
                  }),
              c.jsx("h1", {
                className: "mb-6 text-4xl font-bold text-blue-700",
                children: "Upcoming Exams",
              }),
              n.length === 0
                ? c.jsx("div", {
                    className: "text-center text-gray-600",
                    children: "No upcoming exams.",
                  })
                : c.jsx("div", {
                    className:
                      "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3",
                    children: n.map((u) =>
                      c.jsxs(
                        "div",
                        {
                          className:
                            "p-6 bg-white border border-gray-200 rounded-lg shadow-md",
                          children: [
                            c.jsx("h2", {
                              className:
                                "mb-2 text-2xl font-semibold text-blue-700",
                              children: u.title,
                            }),
                            c.jsxs("p", {
                              className: "text-gray-600",
                              children: [
                                c.jsx("strong", { children: "Subject:" }),
                                " ",
                                u.subject,
                              ],
                            }),
                            c.jsxs("p", {
                              className: "text-gray-600",
                              children: [
                                c.jsx("strong", { children: "Year:" }),
                                " ",
                                u.year,
                                " | ",
                                c.jsx("strong", { children: "Semester:" }),
                                " ",
                                u.semester,
                              ],
                            }),
                            c.jsxs("p", {
                              className: "text-gray-600",
                              children: [
                                c.jsx("strong", { children: "Exam Date:" }),
                                " ",
                                u.examDate,
                              ],
                            }),
                          ],
                        },
                        u._id
                      )
                    ),
                  }),
            ],
          })
    );
  },
  OS = new N0(),
  PS = () => {
    const [e, t] = v.useState(!1),
      [n, r] = v.useState([]),
      o = Bt().state,
      i = Ae(),
      [l, a] = v.useState({ title: "", timeLimit: "", questions: [] }),
      [u, d] = v.useState({
        title: "",
        timeLimit: "",
        questionText: "",
        options: ["", "", "", ""],
        correctAnswer: "",
      }),
      [f, y] = v.useState({ timeLimit: "", options: "" }),
      {
        title: g,
        timeLimit: x,
        questionText: b,
        options: w,
        correctAnswer: m,
      } = u;
    v.useEffect(() => {
      (async () => {
        try {
          const U = (await s0(o)).data;
          a({ title: U.title, timeLimit: U.timeLimit, questions: U.questions }),
            d({
              title: U.title,
              timeLimit: U.timeLimit,
              questionText: "",
              options: ["", "", "", ""],
              correctAnswer: "",
            });
        } catch (I) {
          console.error("Error fetching exam data:", I);
        }
      })();
    }, [o]);
    const h = (O) => {
        const { name: I, value: U } = O.target;
        d({ ...u, [I]: U });
      },
      p = (O, I) => {
        const U = [...u.options];
        (U[O] = I), d({ ...u, options: U });
      },
      E = () => {
        let O = !0,
          I = {};
        return (
          parseInt(x) <= 0
            ? ((I.timeLimit = "Time limit must be a positive number."),
              (O = !1))
            : (I.timeLimit = ""),
          new Set(w).size !== w.length
            ? ((I.options = "Options must be unique."), (O = !1))
            : (I.options = ""),
          y(I),
          O
        );
      },
      _ = async (O) => {
        if ((O.preventDefault(), !!E()))
          try {
            const I = await t0(o, g, parseInt(x), b, w, parseInt(m)),
              { newQuestion: U } = I.data;
            a({ ...l, questions: [...l.questions, U] }),
              d({
                title: g,
                timeLimit: x,
                questionText: "",
                options: ["", "", "", ""],
                correctAnswer: "",
              });
          } catch (I) {
            console.error("Error creating exam:", I);
          }
      },
      C = async (O) => {
        try {
          await n0(O, o),
            a({ ...l, questions: l.questions.filter((I) => I._id !== O) });
        } catch (I) {
          console.error("Error deleting question:", I);
        }
      },
      { mutate: S } = A0({
        mutationFn: (O) => o0(O),
        onSuccess: (O) => {
          O.status === 400 &&
            D.success(O.data, {
              position: "top-right",
              autoClose: 250,
              hideProgressBar: !1,
              closeOnClick: !0,
              pauseOnHover: !0,
              draggable: !0,
              progress: void 0,
              theme: "light",
            }),
            O.statusText &&
              (D.success("Exam published successfully", {
                position: "top-right",
                autoClose: 250,
                hideProgressBar: !1,
                closeOnClick: !0,
                pauseOnHover: !0,
                draggable: !0,
                progress: void 0,
                theme: "light",
              }),
              OS.invalidateQueries({ queryKey: ["upcomingExams"] }),
              i("/dashboard/teacher"));
        },
        onError: (O) => {
          console.error("Error publishing exam:", O);
        },
      }),
      N = async (O) => {
        if ((O.preventDefault(), !o)) {
          D.error("Invalid exam ID", {
            position: "top-right",
            autoClose: 250,
            hideProgressBar: !1,
            closeOnClick: !0,
            pauseOnHover: !0,
            draggable: !0,
            progress: void 0,
            theme: "light",
          });
          return;
        }
        S(o);
      },
      R = async (O) => {
        try {
          const I = await r0(n._id, n.questionText, n.options, n.correctAnswer);
          I.statusText &&
            (D.success("Question updated successfully", {
              position: "top-right",
              autoClose: 250,
              hideProgressBar: !1,
              closeOnClick: !0,
              pauseOnHover: !0,
              draggable: !0,
              progress: void 0,
              theme: "light",
            }),
            a({
              ...l,
              questions: l.questions.map((U) => (U._id === O ? I.data : U)),
            }),
            window.location.reload(),
            d({
              title: I.data.title,
              timeLimit: I.data.timeLimit,
              questionText: "",
              options: ["", "", "", ""],
              correctAnswer: "",
            }),
            t(!1));
        } catch (I) {
          console.error("Error updating exam:", I);
        }
      },
      P = async () => {
        (await zw(o)).statusText &&
          (D.success("Exam saved successfully"), i("/dashboard/teacher"));
      };
    return c.jsxs("div", {
      className: "relative",
      children: [
        c.jsxs("div", {
          className: "max-w-7xl mx-auto mt-10 p-8 space-x-8 flex",
          children: [
            c.jsxs("div", {
              className:
                "flex-1 bg-white p-8 rounded-xl   shadow-lg space-y-6 h-fit",
              children: [
                c.jsx("h2", {
                  className:
                    "text-4xl font-semibold text-gray-800 text-center mb-8",
                  children: "Create Exam",
                }),
                c.jsxs("form", {
                  onSubmit: _,
                  className: "space-y-6",
                  children: [
                    c.jsxs("div", {
                      className: "mb-6",
                      children: [
                        c.jsx("label", {
                          className:
                            "block text-lg font-medium mb-2 text-gray-700",
                          children: "Title",
                        }),
                        c.jsx("input", {
                          type: "text",
                          name: "title",
                          value: u.title,
                          onChange: h,
                          className:
                            "w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500",
                          required: !0,
                          disabled: l.questions.length > 0,
                        }),
                      ],
                    }),
                    c.jsxs("div", {
                      className: "mb-6",
                      children: [
                        c.jsx("label", {
                          className:
                            "block text-lg font-medium mb-2 text-gray-700",
                          children: "Time Limit (in minutes)",
                        }),
                        c.jsx("input", {
                          type: "number",
                          name: "timeLimit",
                          value: u.timeLimit,
                          onChange: h,
                          className: `w-full p-3 border ${
                            f.timeLimit ? "border-red-500" : "border-gray-300"
                          } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`,
                          min: "1",
                          required: !0,
                          disabled: l.questions.length > 0,
                        }),
                        f.timeLimit &&
                          c.jsx("p", {
                            className: "text-red-500 text-sm mt-1",
                            children: f.timeLimit,
                          }),
                      ],
                    }),
                    c.jsxs("div", {
                      className: "mb-6",
                      children: [
                        c.jsx("label", {
                          className:
                            "block text-lg font-medium mb-2 text-gray-700",
                          children: "Question Text",
                        }),
                        c.jsx("textarea", {
                          name: "questionText",
                          value: u.questionText,
                          onChange: h,
                          className:
                            "w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500",
                          rows: "4",
                          required: !0,
                        }),
                      ],
                    }),
                    c.jsxs("div", {
                      className: "mb-6",
                      children: [
                        c.jsx("label", {
                          className:
                            "block text-lg font-medium mb-2 text-gray-700",
                          children: "Options",
                        }),
                        u.options.map((O, I) =>
                          c.jsx(
                            "input",
                            {
                              type: "text",
                              placeholder: `Option ${I + 1}`,
                              value: O,
                              onChange: (U) => p(I, U.target.value),
                              className: `w-full p-3 mb-3 border ${
                                f.options ? "border-red-500" : "border-gray-300"
                              } rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500`,
                              required: !0,
                            },
                            I
                          )
                        ),
                        f.options &&
                          c.jsx("p", {
                            className: "text-red-500 text-sm mt-1",
                            children: f.options,
                          }),
                      ],
                    }),
                    c.jsxs("div", {
                      className: "mb-6",
                      children: [
                        c.jsx("label", {
                          className:
                            "block text-lg font-medium mb-2 text-gray-700",
                          children: "Correct Answer",
                        }),
                        c.jsx("input", {
                          type: "number",
                          name: "correctAnswer",
                          min: "1",
                          max: "4",
                          value: u.correctAnswer,
                          onChange: h,
                          className:
                            "w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500",
                          placeholder: "Enter the correct option",
                          required: !0,
                        }),
                      ],
                    }),
                    c.jsxs("button", {
                      type: "submit",
                      className:
                        "w-full p-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 flex items-center justify-center",
                      children: [
                        c.jsx(Qi, { className: "mr-2" }),
                        " Create Question",
                      ],
                    }),
                    c.jsx("div", {
                      className: "mt-6",
                      children: c.jsx("button", {
                        onClick: N,
                        className:
                          "w-full p-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 flex items-center justify-center",
                        children: "Publish Exam",
                      }),
                    }),
                    c.jsx("div", {
                      className: "mt-6",
                      children: c.jsx("button", {
                        onClick: P,
                        className:
                          "w-full p-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300 flex items-center justify-center",
                        children: "Save Exam",
                      }),
                    }),
                  ],
                }),
              ],
            }),
            c.jsxs("div", {
              className:
                "flex-1 h-full   bg-white p-8 rounded-xl shadow-lg space-y-6",
              children: [
                c.jsx("h2", {
                  className:
                    "text-4xl font-semibold text-gray-800 text-center mb-8",
                  children: "Created Questions",
                }),
                c.jsx("ul", {
                  className: "space-y-6",
                  children: l.questions.map((O, I) =>
                    c.jsxs(
                      "li",
                      {
                        className: "border-b pb-6",
                        children: [
                          c.jsxs("div", {
                            className: "text-xl font-bold text-gray-700",
                            children: [
                              c.jsxs("span", {
                                className: "font-semibold",
                                children: ["Q", I + 1, ":"],
                              }),
                              " ",
                              O.questionText,
                            ],
                          }),
                          c.jsxs("div", {
                            className: "mt-3",
                            children: [
                              c.jsx("strong", { children: "Options:" }),
                              c.jsx("ul", {
                                children:
                                  Array.isArray(O.options) &&
                                  O.options.length > 0
                                    ? O.options.map((U, K) =>
                                        c.jsx("li", { children: U }, K)
                                      )
                                    : c.jsx("li", {
                                        children: "No options available",
                                      }),
                              }),
                            ],
                          }),
                          c.jsxs("div", {
                            className: "mt-3",
                            children: [
                              c.jsx("strong", { children: "Correct Answer:" }),
                              " ",
                              O.correctAnswer,
                            ],
                          }),
                          c.jsxs("div", {
                            className: "mt-3 flex gap-3",
                            children: [
                              c.jsxs("button", {
                                onClick: () => {
                                  window.confirm(
                                    "Are you sure you want to remove this question?"
                                  ) && C(O._id);
                                },
                                className:
                                  "flex items-center px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300",
                                children: [
                                  c.jsx(g0, { className: "mr-2" }),
                                  " Remove",
                                ],
                              }),
                              c.jsxs("button", {
                                onClick: () => {
                                  t(!0), r(O);
                                },
                                className:
                                  "flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300",
                                children: [
                                  "✏️ ",
                                  c.jsx("span", {
                                    className: "ml-2",
                                    children: "Edit Question",
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      },
                      O._id
                    )
                  ),
                }),
              ],
            }),
          ],
        }),
        c.jsx("div", {
          className: `fixed inset-0 flex items-center justify-center bg-black bg-opacity-25 backdrop-blur-sm transition-opacity duration-300 ${
            e ? "opacity-100" : "opacity-0 pointer-events-none"
          }`,
          children: c.jsxs("div", {
            className:
              "relative bg-white p-8 rounded-lg shadow-2xl max-w-lg w-full",
            children: [
              c.jsx("button", {
                onClick: () => t(!1),
                className:
                  "absolute top-3 right-3 text-gray-500 hover:text-red-600 transition duration-200 text-2xl",
                children: "×",
              }),
              c.jsx("h2", {
                className: "text-2xl font-bold mb-4 text-center text-gray-800",
                children: "Edit Question",
              }),
              c.jsxs("div", {
                className: "mb-6",
                children: [
                  c.jsx("label", {
                    className: "block text-lg font-medium mb-2 text-gray-700",
                    children: "Question Text",
                  }),
                  c.jsx("textarea", {
                    name: "questionText",
                    value: n.questionText,
                    onChange: (O) => r({ ...n, questionText: O.target.value }),
                    className:
                      "w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500",
                    rows: "4",
                    required: !0,
                  }),
                ],
              }),
              c.jsxs("div", {
                className: "mb-6",
                children: [
                  c.jsx("label", {
                    className: "block text-lg font-medium mb-2 text-gray-700",
                    children: "Options",
                  }),
                  n.options
                    ? c.jsx("div", {
                        className: "grid grid-cols-2 ",
                        children: n.options.map((O, I) =>
                          c.jsx(
                            "div",
                            {
                              className: " p-2 rounded-md",
                              children: c.jsx("input", {
                                type: "text",
                                className: "border-2 px-3 py-1 w-full",
                                value: O,
                                onChange: (U) => {
                                  const K = [...n.options];
                                  (K[I] = U.target.value),
                                    r({ ...n, options: K });
                                },
                              }),
                            },
                            I
                          )
                        ),
                      })
                    : c.jsx(c.Fragment, {}),
                  f.options &&
                    c.jsx("p", {
                      className: "text-red-500 text-sm mt-1",
                      children: f.options,
                    }),
                ],
              }),
              c.jsxs("div", {
                className: "mb-6",
                children: [
                  c.jsx("label", {
                    className: "block text-lg font-medium mb-2 text-gray-700",
                    children: "Correct Answer",
                  }),
                  c.jsx("input", {
                    type: "text",
                    name: "correctAnswer",
                    value: n.correctAnswer,
                    onChange: (O) => r({ ...n, correctAnswer: O.target.value }),
                    className:
                      "w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500",
                    placeholder: "Enter the correct optioss",
                    required: !0,
                  }),
                ],
              }),
              c.jsx("div", {
                className: "mt-4 w-full  text-gray-600",
                children: c.jsx("button", {
                  className: `px-4 py-2 w-full  text-white bg-green-500 rounded
            hover:bg-green-600`,
                  onClick: () => R(),
                  children: "Update",
                }),
              }),
            ],
          }),
        }),
      ],
    });
  },
  LS = () => {
    const [e, t] = v.useState([]),
      [n, r] = v.useState({}),
      [s, o] = v.useState({});
    v.useEffect(() => {
      (async () => {
        const d = await i0();
        t(d.data);
      })();
    }, []);
    const i = (u) => {
        r((d) => ({ ...d, [u]: !d[u] }));
      },
      l = (u) => {
        o((d) => ({ ...d, [u]: !d[u] }));
      },
      a = async (u) => {
        (await Mw(u)).statusText &&
          (D.success("Exam deleted successfully", {
            position: "top-right",
            autoClose: 250,
            hideProgressBar: !1,
            closeOnClick: !0,
            pauseOnHover: !0,
            draggable: !0,
            progress: void 0,
            theme: "light",
          }),
          t(e.filter((f) => f._id !== u)));
      };
    return c.jsxs("div", {
      className: "p-6",
      children: [
        c.jsx("h1", {
          className: "text-3xl font-semibold mb-6",
          children: "View Exams",
        }),
        e.length === 0
          ? c.jsx("p", { children: "No exams available" })
          : e.map((u) =>
              c.jsxs(
                "div",
                {
                  className:
                    "bg-white p-6 rounded-lg shadow-lg mb-6 transition-all duration-300  ",
                  children: [
                    c.jsxs("h2", {
                      className: "text-2xl font-semibold text-gray-800",
                      children: [u.title, " - ", u.subject],
                    }),
                    c.jsxs("p", {
                      className: "text-gray-600",
                      children: ["Year: ", u.year, " | Semester: ", u.semester],
                    }),
                    c.jsxs("p", {
                      className: "text-gray-600",
                      children: ["Time Limit: ", u.timeLimit, " minutes"],
                    }),
                    c.jsxs("div", {
                      className: "mt-6 ",
                      children: [
                        c.jsxs("button", {
                          onClick: () => i(u._id),
                          className:
                            "flex items-center text-xl font-semibold text-blue-500 hover:text-blue-700",
                          children: [
                            n[u._id]
                              ? c.jsx(Of, { className: "mr-2" })
                              : c.jsx(Rf, { className: "mr-2" }),
                            n[u._id] ? "Hide Questions" : "Show Questions",
                          ],
                        }),
                        c.jsx("div", {
                          className: ` overflow-scroll  transition-all duration-300  mt-4 ${
                            n[u._id] ? "max-h-screen " : "max-h-0"
                          }`,
                          children:
                            n[u._id] &&
                            c.jsxs("div", {
                              className:
                                "bg-gray-100 p-6 rounded-lg shadow-md ",
                              children: [
                                c.jsxs("h3", {
                                  className:
                                    "text-xl font-semibold mb-4 text-gray-700",
                                  children: ["Questions ", console.log(u)],
                                }),
                                u.questions.map((d) =>
                                  c.jsxs(
                                    "div",
                                    {
                                      className:
                                        "bg-white p-5 rounded-lg shadow-sm mb-4 transition-all duration-200 hover:shadow-lg hover:bg-gray-50",
                                      children: [
                                        c.jsx("p", {
                                          className:
                                            "font-medium text-gray-800",
                                          children: d.questionText,
                                        }),
                                        c.jsx("ul", {
                                          className:
                                            "list-disc pl-6 mt-2 text-gray-700",
                                          children: d.options.map((f, y) =>
                                            c.jsx(
                                              "li",
                                              {
                                                className: "text-gray-700",
                                                children: f,
                                              },
                                              y
                                            )
                                          ),
                                        }),
                                        c.jsxs("p", {
                                          className:
                                            "mt-2 font-medium text-green-600",
                                          children: [
                                            c.jsx("strong", {
                                              children: "Correct Answer:",
                                            }),
                                            " ",
                                            d.options[d.correctAnswer - 1],
                                          ],
                                        }),
                                      ],
                                    },
                                    d._id
                                  )
                                ),
                              ],
                            }),
                        }),
                      ],
                    }),
                    c.jsxs("div", {
                      className: "mt-6",
                      children: [
                        c.jsxs("button", {
                          onClick: () => l(u._id),
                          className:
                            "flex items-center text-xl font-semibold text-blue-500 hover:text-blue-700",
                          children: [
                            s[u._id]
                              ? c.jsx(Of, { className: "mr-2" })
                              : c.jsx(Rf, { className: "mr-2" }),
                            s[u._id] ? "Hide Submissions" : "Show Submissions",
                          ],
                        }),
                        c.jsx("div", {
                          className: `transition-all duration-300 overflow-hidden mt-4 ${
                            s[u._id] ? "max-h-screen" : "max-h-0"
                          }`,
                          children:
                            s[u._id] &&
                            c.jsxs("div", {
                              className:
                                "bg-green-100 p-6 rounded-lg shadow-md",
                              children: [
                                c.jsx("h3", {
                                  className:
                                    "text-xl font-semibold mb-4 text-gray-700",
                                  children: "Submissions",
                                }),
                                u.submissions.length === 0
                                  ? c.jsx("p", {
                                      children: "No submissions yet",
                                    })
                                  : u.submissions.map((d) =>
                                      c.jsxs(
                                        "div",
                                        {
                                          className:
                                            "bg-white p-5 rounded-lg shadow-sm mb-4 transition-all duration-200 hover:shadow-lg hover:bg-gray-50",
                                          children: [
                                            console.log(d, "Sdsd"),
                                            c.jsxs("h4", {
                                              className:
                                                "text-lg font-medium text-gray-800",
                                              children: [
                                                console.log(
                                                  d.student.completedExams[0]
                                                    .score,
                                                  "jio"
                                                ),
                                                "Name : ",
                                                d.student.fullName,
                                              ],
                                            }),
                                            c.jsxs("p", {
                                              className: "text-gray-700",
                                              children: [
                                                "Score: ",
                                                d.student.completedExams[0]
                                                  .score,
                                              ],
                                            }),
                                          ],
                                        },
                                        d._id
                                      )
                                    ),
                              ],
                            }),
                        }),
                      ],
                    }),
                    c.jsx("button", {
                      onClick: () => {
                        window.confirm(
                          "Are you sure you want to delete this exam?"
                        ) && a(u._id);
                      },
                      className:
                        "mt-6 bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg",
                      children: "Delete Exam",
                    }),
                  ],
                },
                u._id
              )
            ),
      ],
    });
  },
  AS = () => {
    const [e, t] = v.useState([]),
      n = 40;
    return (
      console.log(e),
      v.useEffect(() => {
        (async () => {
          try {
            const o = await (
              await fetch(
                "http://localhost:4000/api/student/showCompletedExams",
                { method: "GET", credentials: "include" }
              )
            ).json();
            t(o.completedExams);
          } catch (s) {
            console.error("Failed to fetch results:", s);
          }
        })();
      }, []),
      c.jsxs("div", {
        className: "p-6 max-w-5xl mx-auto",
        children: [
          c.jsx("h2", {
            className: "text-3xl font-bold text-center mb-4 text-gray-900",
            children: "🏆 Exam Results",
          }),
          (e == null ? void 0 : e.length) === 0
            ? c.jsx("p", {
                className: "text-center text-gray-500 text-lg",
                children: "No results found.",
              })
            : c.jsx("div", {
                className: "bg-white shadow-lg rounded-lg overflow-hidden",
                children: c.jsx("div", {
                  className: "max-h-[400px] overflow-y-auto",
                  children: c.jsxs("table", {
                    className: "w-full border-collapse",
                    children: [
                      c.jsx("thead", {
                        className:
                          "bg-gray-200 text-gray-700 sticky top-0 z-10",
                        children: c.jsxs("tr", {
                          children: [
                            c.jsx("th", {
                              className: "p-3 text-left",
                              children: "Exam",
                            }),
                            c.jsx("th", {
                              className: "p-3 text-left",
                              children: "Subject",
                            }),
                            c.jsx("th", {
                              className: "p-3 text-left",
                              children: "Year/Semester",
                            }),
                            c.jsx("th", {
                              className: "p-3 text-left",
                              children: "Score",
                            }),
                            c.jsx("th", {
                              className: "p-3 text-left",
                              children: "Percentage",
                            }),
                            c.jsx("th", {
                              className: "p-3 text-left",
                              children: "Status",
                            }),
                          ],
                        }),
                      }),
                      c.jsx("tbody", {
                        className: "bg-white",
                        children: e.map((r) => {
                          var l;
                          const s =
                              (l = r.exam.questions) == null
                                ? void 0
                                : l.length,
                            o = s > 0 ? ((r.score / s) * 100).toFixed(2) : 0,
                            i = o >= n;
                          return c.jsxs(
                            V.Fragment,
                            {
                              children: [
                                c.jsxs("tr", {
                                  className: "border-b",
                                  children: [
                                    c.jsx("td", {
                                      className: "p-3 font-semibold",
                                      children: r.exam.title,
                                    }),
                                    c.jsx("td", {
                                      className: "p-3",
                                      children: r.exam.subject,
                                    }),
                                    c.jsxs("td", {
                                      className: "p-3",
                                      children: [
                                        r.exam.year,
                                        " / ",
                                        r.exam.semester,
                                      ],
                                    }),
                                    c.jsxs("td", {
                                      className:
                                        "p-3 text-blue-600 font-bold text-lg",
                                      children: [r.score, " / ", s],
                                    }),
                                    c.jsxs("td", {
                                      className:
                                        "p-3 text-purple-600 font-bold text-lg",
                                      children: [o, "%"],
                                    }),
                                    c.jsx("td", {
                                      className: `p-3 font-bold text-lg ${
                                        i ? "text-green-600" : "text-red-600"
                                      }`,
                                      children: i ? "✅ Pass" : "❌ Fail",
                                    }),
                                  ],
                                }),
                                s > 0 &&
                                  c.jsx("tr", {
                                    className: "bg-gray-100",
                                    children: c.jsxs("td", {
                                      colSpan: "6",
                                      className: "p-4",
                                      children: [
                                        c.jsx("h4", {
                                          className:
                                            "text-md font-bold text-gray-700 mb-2",
                                          children: "📝 Questions:",
                                        }),
                                        c.jsx("ul", {
                                          className: "space-y-2",
                                          children: r.exam.questions.map((a) =>
                                            c.jsxs(
                                              "li",
                                              {
                                                className:
                                                  "p-3 border border-gray-300 rounded-md bg-white shadow-sm",
                                                children: [
                                                  c.jsx("p", {
                                                    className:
                                                      "font-medium text-gray-800",
                                                    children: a.questionText,
                                                  }),
                                                  c.jsx("ul", {
                                                    className:
                                                      "list-decimal ml-5 mt-2 text-gray-700",
                                                    children: a.options.map(
                                                      (u, d) =>
                                                        c.jsxs(
                                                          "li",
                                                          {
                                                            className: `mt-1 ${
                                                              d + 1 ===
                                                              a.correctAnswer
                                                                ? "text-green-600 font-semibold"
                                                                : ""
                                                            }`,
                                                            children: [
                                                              d + 1,
                                                              ". ",
                                                              u,
                                                            ],
                                                          },
                                                          d
                                                        )
                                                    ),
                                                  }),
                                                  c.jsxs("p", {
                                                    className:
                                                      "mt-2 font-semibold text-green-600",
                                                    children: [
                                                      "✅ Correct Answer:",
                                                      " ",
                                                      a.options[
                                                        a.correctAnswer - 1
                                                      ],
                                                    ],
                                                  }),
                                                ],
                                              },
                                              a._id
                                            )
                                          ),
                                        }),
                                      ],
                                    }),
                                  }),
                              ],
                            },
                            r._id
                          );
                        }),
                      }),
                    ],
                  }),
                }),
              }),
        ],
      })
    );
  },
  IS = () => {
    const { examId: e } = ax(),
      [t, n] = v.useState(null),
      [r, s] = v.useState(""),
      [o, i] = v.useState([]),
      [l, a] = v.useState(0),
      [u, d] = v.useState(null),
      [f, y] = v.useState(null),
      [g, x] = v.useState(null),
      b = Ae(),
      [w, m] = v.useState([]);
    v.useEffect(() => {
      (async () => {
        const N = await (
          await fetch(
            `http://localhost:4000/api/student/getSubmittedQuestions/${e}`,
            { method: "GET", credentials: "include" }
          )
        ).json();
        if (N.answers) {
          const R = new Map();
          N.answers.forEach((P) => {
            R.set(P.questionId, P.selectedOption);
          }),
            m(R);
        }
      })();
    }, [e]),
      v.useEffect(() => {
        (async () => {
          try {
            const S = await Vw(e);
            if (S.statusText && S.data.timeLimit) {
              i(S.data.questions), s(S.data.title);
              const N = new Date(S.data.startTime),
                R = new Date(N.getTime() + S.data.timeLimit * 6e4);
              x(R), n(Math.floor((R - Date.now()) / 1e3));
              let P = S.data.questions.findIndex((O) => !w.has(O._id));
              P === -1 && (P = 0),
                a(P),
                y(S.data.questions[P]._id),
                d(w.get(S.data.questions[P]._id) || null);
            }
          } catch (S) {
            console.error("Failed to fetch exam data:", S);
          }
        })();
      }, [e, w]),
      v.useEffect(() => {
        if (t === null) return;
        const C = setInterval(() => {
          const S = Math.max(Math.floor((g - Date.now()) / 1e3), 0);
          n(S),
            S <= 0 &&
              (clearInterval(C),
              alert("Time's up! Your answers are submitted automatically."),
              _());
        }, 1e3);
        return () => clearInterval(C);
      }, [g]);
    const h = (C) => {
        d(C + 1);
      },
      p = async () => {
        try {
          u !== null && (await ua(f, e, u), m((S) => new Map(S).set(f, u)));
          const C = l + 1;
          C < o.length && (a(C), y(o[C]._id), d(w.get(o[C]._id) || null));
        } catch (C) {
          console.error("Error submitting answer:", C.message);
        }
      },
      E = async () => {
        try {
          for (let S = 0; S < o.length; S++) {
            const N = o[S]._id;
            w.has(N) || (await ua(N, e, null));
          }
          const C = await _f(e);
          C.status === 200 || C.statusText === "OK"
            ? (D.success("Exam is submitted successfully"),
              b("/dashboard/student"))
            : console.error("Failed to submit exam:", C.statusText);
        } catch (C) {
          console.error("Error auto-submitting exam:", C.message);
        }
      },
      _ = async () => {
        try {
          if (Date.now() > g) {
            D.error("Time is over"), await E();
            return;
          }
          u !== null && (await ua(f, e, u));
          const C = await _f(e);
          C.status === 200 || C.statusText === "OK"
            ? (D.success("Exam is submitted successfully."),
              b("/dashboard/student"))
            : console.error("Failed to submit exam:", C.statusText);
        } catch (C) {
          console.error("Error submitting exam:", C.message);
        }
      };
    return c.jsxs("div", {
      className:
        "min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 flex flex-col items-center",
      children: [
        c.jsxs("div", {
          className: "w-full max-w-4xl mt-8 p-6 bg-white rounded-lg shadow-md",
          children: [
            c.jsxs("h1", {
              className:
                "text-3xl font-extrabold text-gray-900 text-center mb-4",
              children: ["Exam: ", r],
            }),
            t !== null && t > 0
              ? c.jsxs("div", {
                  className: `text-2xl font-bold text-center ${
                    t < 30 ? "text-red-600 animate-pulse" : "text-blue-700"
                  }`,
                  children: [
                    "Time Left:",
                    " ",
                    `${Math.floor(t / 60)}:${(t % 60)
                      .toString()
                      .padStart(2, "0")}`,
                  ],
                })
              : c.jsx("p", {
                  className: "text-center text-gray-500",
                  children: "Loading timer...",
                }),
            t === 0 && b("/dashboard/student/take-exam"),
          ],
        }),
        c.jsx("div", {
          className: "w-full max-w-4xl mt-6 p-6 bg-white rounded-lg shadow-md",
          children:
            o.length > 0
              ? c.jsxs(c.Fragment, {
                  children: [
                    c.jsxs("div", {
                      children: [
                        c.jsxs("p", {
                          className: "text-lg font-semibold text-gray-700 mb-4",
                          children: ["Question ", l + 1, " of ", o.length, ":"],
                        }),
                        c.jsx("p", {
                          className: "text-gray-800 text-lg mb-6",
                          children: o[l].questionText,
                        }),
                        c.jsx("div", {
                          className: "space-y-3",
                          children: o[l].options.map((C, S) =>
                            c.jsxs(
                              "label",
                              {
                                className:
                                  "block bg-gray-50 border rounded-lg px-4 py-2 hover:bg-blue-50 cursor-pointer",
                                children: [
                                  c.jsx("input", {
                                    type: "radio",
                                    name: `question-${l}`,
                                    value: S + 1,
                                    onChange: () => h(S),
                                    className: "mr-3",
                                    checked: u === S + 1,
                                  }),
                                  C,
                                ],
                              },
                              S
                            )
                          ),
                        }),
                      ],
                    }),
                    l < o.length - 1
                      ? c.jsx("button", {
                          className: `mt-6 w-full py-3 text-lg font-semibold rounded ${
                            u
                              ? "bg-blue-600 text-white hover:bg-blue-700"
                              : "bg-gray-300 text-gray-500 cursor-not-allowed"
                          }`,
                          onClick: p,
                          disabled: !u,
                          children: "Next",
                        })
                      : c.jsx("button", {
                          className: `mt-6 w-full py-3 text-lg font-semibold rounded ${
                            u
                              ? "bg-green-600 text-white hover:bg-green-700"
                              : "bg-gray-300 text-gray-500 cursor-not-allowed"
                          }`,
                          onClick: _,
                          disabled: !u,
                          children: "Submit Exam",
                        }),
                  ],
                })
              : c.jsx("p", {
                  className: "text-gray-500",
                  children: "Loading questions...",
                }),
        }),
      ],
    });
  },
  FS = [
    { subject: "Computer Fundamentals and Applications", year: 1, semester: 1 },
    { subject: "Society and Technology", year: 1, semester: 1 },
    { subject: "English I", year: 1, semester: 1 },
    { subject: "Mathematics I", year: 1, semester: 1 },
    { subject: "Digital Logic", year: 1, semester: 1 },
    { subject: "C Programming", year: 1, semester: 2 },
    { subject: "Financial Accounting", year: 1, semester: 2 },
    { subject: "English II", year: 1, semester: 2 },
    { subject: "Mathematics II", year: 1, semester: 2 },
    {
      subject: "Microprocessor and Computer Architecture",
      year: 1,
      semester: 2,
    },
    { subject: "Data Structures and Algorithms", year: 2, semester: 3 },
    { subject: "Probability and Statistics", year: 2, semester: 3 },
    { subject: "System Analysis and Design", year: 2, semester: 3 },
    { subject: "OOP in Java", year: 2, semester: 3 },
    { subject: "Web Technology", year: 2, semester: 3 },
    { subject: "Operating System", year: 2, semester: 4 },
    { subject: "Numerical Methods", year: 2, semester: 4 },
    { subject: "Software Engineering", year: 2, semester: 4 },
    { subject: "Scripting Language", year: 2, semester: 4 },
    { subject: "Database Management System", year: 2, semester: 4 },
    { subject: "MIS and E-Business", year: 3, semester: 5 },
    { subject: "DotNet Technology", year: 3, semester: 5 },
    { subject: "Computer Networking", year: 3, semester: 5 },
    { subject: "Introduction to Management", year: 3, semester: 5 },
    { subject: "Computer Graphics and Animation", year: 3, semester: 5 },
    { subject: "Mobile Programming", year: 3, semester: 6 },
    { subject: "Distributed System", year: 3, semester: 6 },
    { subject: "Applied Economics", year: 3, semester: 6 },
    { subject: "Advanced Java Programming", year: 3, semester: 6 },
    { subject: "Network Programming", year: 3, semester: 6 },
    { subject: "Cyber Law and Professional Ethics", year: 4, semester: 7 },
    { subject: "Cloud Computing", year: 4, semester: 7 },
  ],
  DS = ({ subject: e }) =>
    c.jsx("div", {
      className:
        "flex flex-col items-start justify-between px-8 py-4 rounded-lg shadow-md bg-white min-h-[160px] transition hover:shadow-lg",
      children: c.jsx("h2", {
        className: "mb-2 text-2xl font-semibold ",
        children: e.subject,
      }),
    }),
  MS = () => {
    const [e, t] = v.useState([]);
    return (
      Ae(),
      localStorage.getItem("login_token"),
      v.useEffect(() => {
        (async () => {
          const r = await qw(localStorage.getItem("username")),
            s = FS.filter(
              (o) => o.year === r.data.year && o.semester === r.data.semester
            );
          t(s);
        })();
      }, []),
      v.useState([]),
      e.length > 0
        ? c.jsxs("div", {
            className: "w-full h-full p-12 bg-gray-100",
            children: [
              c.jsx("h1", {
                className: "mb-6 text-4xl font-bold ",
                children: "Courses",
              }),
              c.jsx("div", {
                className:
                  "grid w-full h-full grid-cols-1 gap-6 mb-12 md:grid-cols-2 lg:grid-cols-3 ",
                children: e.map((n, r) => c.jsx(DS, { subject: n }, r)),
              }),
            ],
          })
        : c.jsx("div", {
            children: c.jsx("h1", { children: "No courses available" }),
          })
    );
  },
  zS = () => {
    const [e, t] = v.useState([]),
      n = Ae();
    v.useEffect(() => {
      (async () => {
        const o = await $w();
        o.data && t(o.data);
      })();
    }, []);
    const r = (s) => {
      n("/dashboard/teacher/saved-exams/continue", { state: s.examId._id });
    };
    return c.jsxs("div", {
      className: "container mx-auto p-6",
      children: [
        c.jsx("h2", {
          className: "text-3xl font-bold text-center mb-6",
          children: "Saved Exams",
        }),
        e.length === 0
          ? c.jsx("p", {
              className: "text-xl text-center text-gray-600",
              children: "No saved exams found.",
            })
          : e.map((s) =>
              c.jsxs(
                "div",
                {
                  className:
                    "bg-white shadow-lg rounded-lg p-6 mb-6 transition-all  hover:shadow-xl",
                  children: [
                    c.jsx("h3", {
                      className: "text-2xl font-semibold text-gray-800",
                      children: s.examId.title,
                    }),
                    c.jsxs("p", {
                      className: "text-lg text-gray-600 mt-2",
                      children: [
                        c.jsx("strong", { children: "Subject:" }),
                        " ",
                        s.examId.subject,
                      ],
                    }),
                    c.jsxs("p", {
                      className: "text-lg text-gray-600",
                      children: [
                        c.jsx("strong", { children: "Year:" }),
                        " ",
                        s.examId.year,
                      ],
                    }),
                    c.jsxs("p", {
                      className: "text-lg text-gray-600",
                      children: [
                        c.jsx("strong", { children: "Semester:" }),
                        " ",
                        s.examId.semester,
                      ],
                    }),
                    c.jsxs("p", {
                      className: "text-lg text-gray-600 mt-4",
                      children: [
                        c.jsx("strong", { children: "Saved On:" }),
                        " ",
                        new Date(s.createdAt).toLocaleString(),
                      ],
                    }),
                    c.jsx("button", {
                      onClick: () => r(s),
                      className:
                        "mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all",
                      children: "Continue Creating",
                    }),
                    c.jsx(Nc, {}),
                  ],
                },
                s._id
              )
            ),
      ],
    });
  },
  $S = () => {
    const e = Ae(),
      [t, n] = v.useState(!1),
      [r, s] = v.useState({}),
      o = Bt(),
      { state: i } = o,
      [l, a] = v.useState([]),
      [u, d] = v.useState({}),
      f = u == null ? void 0 : u.timeLimit,
      y = u == null ? void 0 : u.title,
      [g, x] = v.useState({
        questionText: "",
        options: ["", "", "", ""],
        correctAnswer: "",
      });
    v.useEffect(() => {
      (async () => {
        try {
          const E = await s0(i);
          E.status === 200 && (d(E.data), a(E.data.questions));
        } catch (E) {
          console.error("Error fetching exam:", E);
        }
      })();
    }, [i]);
    const b = async () => {
        try {
          const p = await t0(
            i,
            y,
            f,
            g.questionText,
            g.options,
            parseInt(g.correctAnswer)
          );
          p.statusText &&
            (a([...l, p.data.newQuestion]),
            x({
              questionText: "",
              options: ["", "", "", ""],
              correctAnswer: "",
            }));
        } catch (p) {
          console.error("Error creating question:", p);
        }
      },
      w = async (p, E) => {
        try {
          if ((await n0(p, E)).status === 200) {
            const C = l.filter((S) => S._id !== p);
            a(C);
          }
        } catch (_) {
          console.error("Error removing question:", _);
        }
      },
      m = async () => {
        try {
          const p = await r0(r._id, r.questionText, r.options, r.correctAnswer);
          if (p.statusText) {
            const E = l.map((_) => (_._id === r._id ? p.data.question : _));
            a(E),
              n(!1),
              D.success("Question updated successfully!", {
                position: "top-right",
                autoClose: 250,
                hideProgressBar: !1,
                closeOnClick: !0,
                pauseOnHover: !0,
                draggable: !0,
                progress: void 0,
                theme: "light",
              });
          }
        } catch (p) {
          console.error("Error updating question:", p);
        }
      },
      h = async () => {
        try {
          const p = await o0(i);
          p.status === 400 &&
            D.success(p.data, {
              position: "top-right",
              autoClose: 250,
              hideProgressBar: !1,
              closeOnClick: !0,
              pauseOnHover: !0,
              draggable: !0,
              progress: void 0,
              theme: "light",
            }),
            p.statusText &&
              (D.success("Exam published successfully", {
                position: "top-right",
                autoClose: 250,
                hideProgressBar: !1,
                closeOnClick: !0,
                pauseOnHover: !0,
                draggable: !0,
                progress: void 0,
                theme: "light",
              }),
              e("/dashboard/teacher"));
        } catch (p) {
          console.error("Error publishing exam:", p);
        }
      };
    return c.jsxs("div", {
      className: "flex w-full min-h-screen p-8 bg-gray-50",
      children: [
        c.jsxs("div", {
          className:
            "w-full md:w-1/3 border border-gray-300 p-6 bg-white shadow-lg rounded-lg",
          children: [
            c.jsx("h2", {
              className: "text-2xl font-semibold mb-4 text-gray-800",
              children: "Create New Question",
            }),
            c.jsxs("div", {
              className: "mb-4",
              children: [
                c.jsx("label", {
                  className: "block text-lg font-medium text-gray-600",
                  children: "Title:",
                }),
                c.jsx("input", {
                  type: "text",
                  value: y,
                  readOnly: !0,
                  className:
                    "w-full p-3 border border-gray-300 rounded-md bg-gray-100",
                }),
              ],
            }),
            c.jsxs("div", {
              className: "mb-4",
              children: [
                c.jsx("label", {
                  className: "block text-lg font-medium text-gray-600",
                  children: "Time Limit (minutes):",
                }),
                c.jsx("input", {
                  type: "text",
                  value: f,
                  readOnly: !0,
                  className:
                    "w-full p-3 border border-gray-300 rounded-md bg-gray-100",
                }),
              ],
            }),
            c.jsxs("div", {
              className: "mb-4",
              children: [
                c.jsx("label", {
                  className: "block text-lg font-medium text-gray-600",
                  children: "Question Text:",
                }),
                c.jsx("input", {
                  type: "text",
                  value: g.questionText,
                  onChange: (p) => x({ ...g, questionText: p.target.value }),
                  className: "w-full p-3 border border-gray-300 rounded-md",
                }),
              ],
            }),
            c.jsxs("div", {
              className: "mb-4",
              children: [
                c.jsx("label", {
                  className: "block text-lg font-medium text-gray-600",
                  children: "Options:",
                }),
                g.options.map((p, E) =>
                  c.jsx(
                    "input",
                    {
                      type: "text",
                      value: p,
                      onChange: (_) => {
                        const C = [...g.options];
                        (C[E] = _.target.value), x({ ...g, options: C });
                      },
                      className:
                        "w-full p-3 border border-gray-300 rounded-md mb-3",
                      placeholder: `Option ${E + 1}`,
                    },
                    E
                  )
                ),
              ],
            }),
            c.jsxs("div", {
              className: "mb-4",
              children: [
                c.jsx("label", {
                  className: "block text-lg font-medium text-gray-600",
                  children: "Correct Answer:",
                }),
                c.jsx("input", {
                  type: "text",
                  value: g.correctAnswer,
                  onChange: (p) => x({ ...g, correctAnswer: p.target.value }),
                  className: "w-full p-3 border border-gray-300 rounded-md",
                }),
              ],
            }),
            c.jsxs("div", {
              className: "flex gap-4 mt-6",
              children: [
                c.jsxs("button", {
                  onClick: b,
                  className:
                    "flex items-center justify-center w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600 transition",
                  children: [c.jsx(Qi, { className: "mr-2" }), "Add Question"],
                }),
                c.jsxs("button", {
                  onClick: h,
                  className:
                    "flex items-center justify-center w-full bg-green-500 text-white p-3 rounded-md hover:bg-green-600 transition",
                  children: [c.jsx(Qi, { className: "mr-2" }), "Publish Exam"],
                }),
              ],
            }),
          ],
        }),
        c.jsxs("div", {
          className:
            "w-full md:w-2/3 border border-gray-300 p-6 bg-white shadow-lg rounded-lg ml-4",
          children: [
            c.jsx("h2", {
              className: "text-2xl font-semibold mb-4 text-gray-800",
              children: "Questions",
            }),
            c.jsx("ul", {
              className: "space-y-4",
              children: l.map((p, E) =>
                c.jsxs(
                  "li",
                  {
                    className: "border-b pb-4",
                    children: [
                      c.jsxs("p", {
                        className: "text-lg font-medium text-gray-800",
                        children: [
                          c.jsxs("strong", { children: ["Q", E + 1, ":"] }),
                          " ",
                          p.questionText,
                        ],
                      }),
                      c.jsxs("ul", {
                        className: "list-disc pl-6 mt-2",
                        children: [
                          p.options.map((_, C) =>
                            c.jsx(
                              "li",
                              { className: "text-gray-700", children: _ },
                              C
                            )
                          ),
                          c.jsxs("div", {
                            className: "mt-3",
                            children: [
                              c.jsx("strong", { children: "Correct Answer:" }),
                              " ",
                              p.correctAnswer,
                            ],
                          }),
                          c.jsxs("div", {
                            className: "flex gap-3 mt-4",
                            children: [
                              c.jsxs("button", {
                                onClick: () => w(p._id, p.examId),
                                className:
                                  "flex items-center px-4 py-2 bg-red-600 text-white font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300",
                                children: [
                                  c.jsx(g0, { className: "mr-2" }),
                                  " Remove",
                                ],
                              }),
                              c.jsxs("button", {
                                onClick: () => {
                                  n(!0), s(p);
                                },
                                className:
                                  "flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300",
                                children: [
                                  "✏️ ",
                                  c.jsx("span", {
                                    className: "ml-2",
                                    children: "Edit Question",
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  },
                  E
                )
              ),
            }),
          ],
        }),
        c.jsx("div", {
          className: `fixed inset-0 flex items-center justify-center bg-black bg-opacity-25 backdrop-blur-sm transition-opacity duration-300 ${
            t ? "opacity-100" : "opacity-0 pointer-events-none"
          }`,
          children: c.jsxs("div", {
            className:
              "relative bg-white p-8 rounded-lg shadow-2xl max-w-lg w-full",
            children: [
              c.jsx("button", {
                onClick: () => n(!1),
                className:
                  "absolute top-3 right-3 text-gray-500 hover:text-red-600 transition duration-200 text-2xl",
                children: "×",
              }),
              c.jsx("h2", {
                className: "text-2xl font-bold mb-4 text-center text-gray-800",
                children: "Edit Question",
              }),
              c.jsxs("div", {
                className: "mb-6",
                children: [
                  c.jsx("label", {
                    className: "block text-lg font-medium mb-2 text-gray-700",
                    children: "Question Text",
                  }),
                  c.jsx("textarea", {
                    name: "questionText",
                    value: r.questionText,
                    onChange: (p) => s({ ...r, questionText: p.target.value }),
                    className:
                      "w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500",
                    rows: "4",
                    required: !0,
                  }),
                ],
              }),
              c.jsxs("div", {
                className: "mb-6",
                children: [
                  c.jsx("label", {
                    className: "block text-lg font-medium mb-2 text-gray-700",
                    children: "Options",
                  }),
                  r.options
                    ? c.jsx(c.Fragment, {
                        children: r.options.map((p, E) =>
                          c.jsx(
                            "input",
                            {
                              type: "text",
                              className: "border-2 p-3 rounded-md mb-3 w-full",
                              value: p,
                              onChange: (_) => {
                                const C = [...r.options];
                                (C[E] = _.target.value),
                                  s({ ...r, options: C });
                              },
                            },
                            E
                          )
                        ),
                      })
                    : c.jsx(c.Fragment, { children: "No Options" }),
                ],
              }),
              c.jsxs("div", {
                className: "mb-6",
                children: [
                  c.jsx("label", {
                    className: "block text-lg font-medium mb-2 text-gray-700",
                    children: "Correct Answer",
                  }),
                  c.jsx("input", {
                    type: "text",
                    name: "correctAnswer",
                    value: r.correctAnswer,
                    onChange: (p) => s({ ...r, correctAnswer: p.target.value }),
                    className:
                      "w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500",
                    placeholder: "Enter the correct option",
                    required: !0,
                  }),
                ],
              }),
              c.jsx("div", {
                className: "mt-4 text-center text-gray-600",
                children: c.jsx("button", {
                  onClick: () => m(),
                  className:
                    "bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700",
                  children: "Update",
                }),
              }),
            ],
          }),
        }),
      ],
    });
  },
  US = () => {
    const [e, t] = v.useState([]);
    return (
      v.useEffect(() => {
        (async () => {
          try {
            const s = await (
              await fetch(
                "http://localhost:4000/api/student/showCompletedExams",
                { method: "GET", credentials: "include" }
              )
            ).json();
            t(s.completedExams);
          } catch (r) {
            console.error("Failed to fetch completed exams:", r);
          }
        })();
      }, []),
      c.jsxs("div", {
        className: "p-6 max-w-5xl mx-auto",
        children: [
          c.jsx("h2", {
            className: "text-3xl font-bold text-center mb-4 text-gray-900",
            children: "✅ Completed Exams",
          }),
          e.length === 0
            ? c.jsx("p", {
                className: "text-center text-gray-500 text-lg",
                children: "No completed exams found.",
              })
            : c.jsx("div", {
                className: "bg-white shadow-lg rounded-lg overflow-hidden",
                children: c.jsx("div", {
                  className: "max-h-[400px] overflow-y-auto p-4",
                  children: c.jsx("ul", {
                    className: "space-y-4",
                    children: e.map((n) =>
                      c.jsxs(
                        "li",
                        {
                          className:
                            "bg-white shadow-md p-4 rounded-lg border border-gray-200",
                          children: [
                            c.jsx("h3", {
                              className: "text-lg font-semibold text-gray-700",
                              children: n.exam.title,
                            }),
                            c.jsxs("p", {
                              className: "text-gray-600",
                              children: [
                                "📖 Subject:",
                                " ",
                                c.jsx("span", {
                                  className: "font-medium",
                                  children: n.exam.subject,
                                }),
                              ],
                            }),
                            c.jsxs("p", {
                              className: "text-gray-600",
                              children: [
                                "📆 Year:",
                                " ",
                                c.jsx("span", {
                                  className: "font-medium",
                                  children: n.exam.year,
                                }),
                                ", Semester:",
                                " ",
                                c.jsx("span", {
                                  className: "font-medium",
                                  children: n.exam.semester,
                                }),
                              ],
                            }),
                            c.jsxs("p", {
                              className: "text-gray-600",
                              children: [
                                "🎯 Score:",
                                " ",
                                c.jsx("span", {
                                  className: "font-bold text-blue-600",
                                  children: n.score,
                                }),
                              ],
                            }),
                            n.exam.questions.length > 0 &&
                              c.jsxs("div", {
                                className: "mt-4",
                                children: [
                                  c.jsx("h4", {
                                    className:
                                      "text-md font-semibold text-gray-700",
                                    children: "📝 Questions:",
                                  }),
                                  c.jsx("ul", {
                                    className: "space-y-3 mt-2",
                                    children: n.exam.questions.map((r) =>
                                      c.jsxs(
                                        "li",
                                        {
                                          className:
                                            "p-3 border border-gray-300 rounded-md bg-gray-50",
                                          children: [
                                            c.jsx("p", {
                                              className:
                                                "font-medium text-gray-700",
                                              children: r.questionText,
                                            }),
                                            c.jsx("ul", {
                                              className:
                                                "list-disc ml-6 mt-2 text-gray-600",
                                              children: r.options.map((s, o) =>
                                                c.jsxs(
                                                  "li",
                                                  {
                                                    className: "mt-1",
                                                    children: [o + 1, ". ", s],
                                                  },
                                                  o
                                                )
                                              ),
                                            }),
                                            c.jsxs("p", {
                                              className:
                                                "mt-2 font-semibold text-green-600",
                                              children: [
                                                "✅ Correct Answer:",
                                                " ",
                                                r.options[r.correctAnswer - 1],
                                              ],
                                            }),
                                          ],
                                        },
                                        r._id
                                      )
                                    ),
                                  }),
                                ],
                              }),
                          ],
                        },
                        n._id
                      )
                    ),
                  }),
                }),
              }),
        ],
      })
    );
  },
  BS = () => {
    const [e, t] = v.useState([]);
    v.useState([]);
    const [n, r] = v.useState(!0),
      s = Ae(),
      o = async () => {
        try {
          const i = await Qw();
          console.log(i.data),
            t(Array.isArray(i.data.exams) ? i.data.exams : []);
        } catch (i) {
          console.error("Failed to fetch exams:", i);
        } finally {
          r(!1);
        }
      };
    return (
      v.useEffect(() => {
        o();
      }, []),
      c.jsxs("div", {
        className: "min-h-screen p-8 bg-gray-100",
        children: [
          c.jsx("h1", {
            className: "mb-6 text-4xl font-bold text-green-700",
            children: "Past Exams",
          }),
          n
            ? c.jsx("div", {
                className: "text-center text-gray-600",
                children: "Loading exams...",
              })
            : e.length === 0
            ? c.jsx("div", {
                className: "text-center text-gray-600",
                children: "No past exams found.",
              })
            : c.jsx("div", {
                className:
                  "grid grid-cols-1 gap-6 mb-12 md:grid-cols-2 lg:grid-cols-3",
                children: e.map((i) =>
                  c.jsxs(
                    "div",
                    {
                      className:
                        "p-6 bg-white border border-gray-200 rounded-lg shadow-md",
                      children: [
                        c.jsx("h2", {
                          className:
                            "mb-2 text-2xl font-semibold text-green-700",
                          children: i.title,
                        }),
                        c.jsxs("p", {
                          className: "text-gray-600",
                          children: [
                            c.jsx("strong", { children: "Subject:" }),
                            " ",
                            i.subject,
                          ],
                        }),
                        c.jsxs("p", {
                          className: "text-gray-600",
                          children: [
                            c.jsx("strong", { children: "Year:" }),
                            " ",
                            i.year,
                            " | ",
                            c.jsx("strong", { children: "Semester:" }),
                            " ",
                            i.semester,
                          ],
                        }),
                        c.jsxs("p", {
                          className: "text-gray-600",
                          children: [
                            c.jsx("strong", { children: "Time Limit:" }),
                            " ",
                            i.timeLimit,
                            " minutes",
                          ],
                        }),
                        c.jsx("button", {
                          className:
                            "px-4 py-2 mt-4 text-white transition bg-green-600 rounded hover:bg-green-700",
                          onClick: () => s(`${i._id}`, { state: i }),
                          children: "View Details",
                        }),
                      ],
                    },
                    i._id
                  )
                ),
              }),
        ],
      })
    );
  },
  HS = () => {
    const [e, t] = v.useState([]),
      n = async () => {
        const r = window.location.href.split("/").pop(),
          s = await Hw(r);
        console.log(s.data), t(s.data);
      };
    return (
      v.useEffect(() => {
        n();
      }, []),
      c.jsxs("div", {
        children: [
          c.jsx("h3", {
            className: "mb-4 text-2xl font-semibold",
            children: "Questions",
          }),
          c.jsx("div", {
            className: " p-5 rounded-lg bg-gray-100 ",
            children: e.map((r, s) =>
              c.jsxs(
                "div",
                {
                  className: " p-5 rounded-lg  shadow-sm mb-4 ",
                  children: [
                    c.jsx("p", {
                      className: "font-bold text-gray-800",
                      children: r.title,
                    }),
                    r.questions.map((o, i) =>
                      c.jsxs(
                        "div",
                        {
                          className: " p-6 mb-4 rounded-lg shadow-md ",
                          children: [
                            c.jsx("h1", { children: o.questionText }),
                            c.jsxs("p", {
                              className: "mt-2 font-medium text-gray-700",
                              children: [
                                c.jsx("strong", { children: "Answer:" }),
                                " ",
                                o.options[o.correctAnswer - 1],
                              ],
                            }),
                          ],
                        },
                        i
                      )
                    ),
                  ],
                },
                s
              )
            ),
          }),
        ],
      })
    );
  },
  QS = () => {
    const [e, t] = v.useState({ username: "", role: "student" }),
      [n, r] = v.useState(""),
      s = Ae(),
      o = (l) => {
        const { name: a, value: u } = l.target;
        t((d) => ({ ...d, [a]: u })), r("");
      },
      i = async (l) => {
        l.preventDefault();
        const { username: a, role: u } = e;
        console.log(a, u);
        try {
          if (!a) {
            D.warn("username is required.", {
              position: "top-right",
              autoClose: 250,
              hideProgressBar: !1,
              closeOnClick: !0,
              pauseOnHover: !0,
              draggable: !0,
              progress: void 0,
              theme: "light",
            });
            return;
          }
          const d = await Ww(a, u);
          d.status === 200 &&
            D.success(d.data.message, {
              position: "top-right",
              autoClose: 1250,
              hideProgressBar: !1,
              closeOnClick: !0,
              pauseOnHover: !0,
              draggable: !0,
              progress: void 0,
              theme: "light",
            }),
            s("/login");
        } catch (d) {
          d.status === 404
            ? D.error("User not found")
            : d.status === 400
            ? D.warn(d.response.data.message, {
                position: "top-right",
                autoClose: 1250,
                hideProgressBar: !1,
                closeOnClick: !0,
                pauseOnHover: !0,
                draggable: !0,
                progress: void 0,
                theme: "light",
              })
            : D.error("Something went wrong, please try again."),
            console.error("Error with forgot password:", d);
        }
      };
    return c.jsx("div", {
      className: "min-h-screen flex items-center justify-center bg-gray-100",
      children: c.jsxs("div", {
        className: "w-full max-w-md bg-white rounded-lg shadow-md p-8",
        children: [
          c.jsx("h2", {
            className: "text-2xl font-bold text-gray-800 text-center mb-6",
            children: "Forgot Password",
          }),
          c.jsxs("form", {
            onSubmit: i,
            children: [
              c.jsxs("div", {
                className: "mb-4",
                children: [
                  c.jsx("label", {
                    htmlFor: "username",
                    className: "block text-sm font-semibold text-gray-700 mb-2",
                    children: "Username",
                  }),
                  c.jsx("input", {
                    type: "username",
                    id: "username",
                    name: "username",
                    value: e.username,
                    onChange: o,
                    className:
                      "w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400",
                    placeholder: "Enter your username",
                  }),
                ],
              }),
              c.jsxs("div", {
                className: "mb-4",
                children: [
                  c.jsx("label", {
                    htmlFor: "role",
                    className: "block text-sm font-semibold text-gray-700 mb-2",
                    children: "Role",
                  }),
                  c.jsxs("select", {
                    id: "role",
                    name: "role",
                    value: e.role,
                    onChange: o,
                    className:
                      "w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400",
                    children: [
                      c.jsx("option", {
                        value: "student",
                        children: "Student",
                      }),
                      c.jsx("option", {
                        value: "teacher",
                        children: "Teacher",
                      }),
                    ],
                  }),
                ],
              }),
              n &&
                c.jsx("div", {
                  className: "mb-4 text-red-600 text-sm font-semibold",
                  children: n,
                }),
              c.jsx("button", {
                type: "submit",
                className:
                  "w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 font-semibold",
                children: "Reset Password",
              }),
            ],
          }),
          c.jsx("div", {
            className: "mt-4 text-center text-sm text-gray-600",
            children: c.jsx(Me, {
              to: "/login",
              className: "text-blue-500 hover:text-blue-700 font-semibold",
              children: "Back to Login",
            }),
          }),
        ],
      }),
    });
  },
  qS = () => {
    const [e, t] = v.useState([]),
      [n, r] = v.useState(!0),
      [s, o] = v.useState(""),
      [i, l] = v.useState(null);
    v.useEffect(() => {
      (async () => {
        try {
          const d = await i0();
          t(d.data);
        } catch {
          o("Failed to load exams");
        } finally {
          r(!1);
        }
      })();
    }, []);
    const a = (u) => {
      l(i === u ? null : u);
    };
    return n
      ? c.jsx("p", { children: "Loading..." })
      : s
      ? c.jsx("p", { children: s })
      : c.jsxs("div", {
          children: [
            c.jsx("h2", { children: "Exams" }),
            e.length === 0
              ? c.jsx("p", { children: "No exams found" })
              : c.jsx("ul", {
                  children: e.map((u) => {
                    const d = u.questions.length;
                    return c.jsxs(
                      "li",
                      {
                        style: {
                          marginBottom: "15px",
                          border: "1px solid #ddd",
                          padding: "10px",
                        },
                        children: [
                          c.jsxs("div", {
                            onClick: () => a(u._id),
                            style: { cursor: "pointer", fontWeight: "bold" },
                            children: [
                              u.title || "Untitled Exam",
                              " - ",
                              u.subject,
                              " (",
                              u.year,
                              " ",
                              "Year, Sem ",
                              u.semester,
                              ")",
                            ],
                          }),
                          i === u._id &&
                            c.jsxs("div", {
                              style: { marginTop: "10px", paddingLeft: "20px" },
                              children: [
                                c.jsx("h3", { children: "Submissions:" }),
                                u.submissions.length === 0
                                  ? c.jsx("p", {
                                      children: "No submissions yet",
                                    })
                                  : c.jsx("ul", {
                                      children: u.submissions.map((f) => {
                                        const y = f.student.completedExams.find(
                                            (w) => w.exam === u._id
                                          ),
                                          g = y ? y.score : 0,
                                          x =
                                            d > 0
                                              ? ((g / d) * 100).toFixed(2)
                                              : 0,
                                          b = x >= 40 ? "Pass ✅" : "Fail ❌";
                                        return c.jsxs(
                                          "li",
                                          {
                                            style: { marginBottom: "10px" },
                                            children: [
                                              c.jsx("strong", {
                                                children: "Student:",
                                              }),
                                              " ",
                                              f.student.fullName,
                                              " (",
                                              f.student.userName,
                                              ")",
                                              c.jsx("br", {}),
                                              c.jsx("strong", {
                                                children: "Correct Answers:",
                                              }),
                                              " ",
                                              g,
                                              "/",
                                              d,
                                              " ",
                                              c.jsx("br", {}),
                                              c.jsx("strong", {
                                                children: "Percentage:",
                                              }),
                                              " ",
                                              x,
                                              "% ",
                                              c.jsx("br", {}),
                                              c.jsx("strong", {
                                                children: "Status:",
                                              }),
                                              " ",
                                              b,
                                            ],
                                          },
                                          f._id
                                        );
                                      }),
                                    }),
                              ],
                            }),
                        ],
                      },
                      u._id
                    );
                  }),
                }),
          ],
        });
  },
  VS = () =>
    c.jsxs("div", {
      children: [
        c.jsx(PE, {}),
        c.jsxs(Cx, {
          children: [
            c.jsx(le, { path: "/", element: c.jsx(s1, {}) }),
            c.jsx(le, { path: "/login", element: c.jsx(Tb, {}) }),
            c.jsx(le, { path: "/student_dashboard", element: c.jsx(th, {}) }),
            c.jsx(le, { path: "/register", element: c.jsx(Rb, {}) }),
            c.jsx(le, { path: "/verifying", element: c.jsx(LE, {}) }),
            c.jsx(le, { path: "/forgot-password", element: c.jsx(QS, {}) }),
            c.jsxs(le, {
              path: "/dashboard/teacher/",
              element: c.jsx(NS, {}),
              children: [
                c.jsx(le, { path: "create-exam", element: c.jsx(TS, {}) }),
                c.jsx(le, { path: "view-exams", element: c.jsx(LS, {}) }),
                c.jsx(le, { path: "saved-exams", element: c.jsx(zS, {}) }),
                c.jsx(le, { path: "submissions", element: c.jsx(qS, {}) }),
              ],
            }),
            c.jsx(le, {
              path: "/dashboard/teacher/create-exam/:subject",
              element: c.jsx(PS, {}),
            }),
            c.jsx(le, {
              path: "/dashboard/teacher/saved-exams/continue",
              element: c.jsx($S, {}),
            }),
            c.jsxs(le, {
              path: "/dashboard/student",
              element: c.jsx(th, {}),
              children: [
                c.jsx(le, {
                  path: "/dashboard/student/courses",
                  element: c.jsx(MS, {}),
                }),
                c.jsx(le, { path: "take-exam", element: c.jsx(RS, {}) }),
                c.jsx(le, { path: "past-exams", element: c.jsx(BS, {}) }),
                c.jsx(le, { path: "past-exams/:id", element: c.jsx(HS, {}) }),
                c.jsx(le, { path: "results", element: c.jsx(AS, {}) }),
                c.jsx(le, { path: "completed-exam", element: c.jsx(US, {}) }),
              ],
            }),
            c.jsx(le, {
              path: "/dashboard/student/take-exam/:examId",
              element: c.jsx(IS, {}),
            }),
            c.jsx(le, { path: "*", element: c.jsx(kS, {}) }),
          ],
        }),
      ],
    }),
  WS = v.createContext(),
  KS = ({ children: e }) => {
    const [t, n] = v.useState({
      role: localStorage.getItem("role") || "",
      token: localStorage.getItem("token") || "",
    });
    return c.jsx(WS.Provider, { value: [t, n], children: e });
  },
  YS = new N0();
mm(document.getElementById("root")).render(
  c.jsx(mE, {
    client: YS,
    children: c.jsx(KS, {
      children: c.jsxs(Kx, { children: [c.jsx(VS, {}), c.jsx(kb, {})] }),
    }),
  })
);
