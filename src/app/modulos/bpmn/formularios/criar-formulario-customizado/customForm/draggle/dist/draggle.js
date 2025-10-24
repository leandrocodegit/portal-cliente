function _e(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var Ne = function(n, o) {
  return Array.prototype.slice.call(n, o);
}, Be = typeof setImmediate == "function", z;
Be ? z = function(t) {
  setImmediate(t);
} : z = function(t) {
  setTimeout(t, 0);
};
var Me = z, Xe = Me, Ie = function(n, o, l) {
  n && Xe(function() {
    n.apply(l || null, o || []);
  });
}, ee = Ne, Te = Ie, Ye = function(n, o) {
  var l = o || {}, c = {};
  return n === void 0 && (n = {}), n.on = function(d, h) {
    return c[d] ? c[d].push(h) : c[d] = [h], n;
  }, n.once = function(d, h) {
    return h._once = !0, n.on(d, h), n;
  }, n.off = function(d, h) {
    var S = arguments.length;
    if (S === 1)
      delete c[d];
    else if (S === 0)
      c = {};
    else {
      var C = c[d];
      if (!C)
        return n;
      C.splice(C.indexOf(h), 1);
    }
    return n;
  }, n.emit = function() {
    var d = ee(arguments);
    return n.emitterSnapshot(d.shift()).apply(this, d);
  }, n.emitterSnapshot = function(d) {
    var h = (c[d] || []).slice(0);
    return function() {
      var S = ee(arguments), C = this || n;
      if (d === "error" && l.throws !== !1 && !h.length)
        throw S.length === 1 ? S[0] : S;
      return h.forEach(function(E) {
        l.async ? Te(E, S, C) : E.apply(C, S), E._once && n.off(d, E);
      }), n;
    };
  }, n;
};
const Le = /* @__PURE__ */ _e(Ye), te = {}, xe = "(?:^|\\s)", Re = "(?:\\s|$)";
function le(t) {
  let n = te[t];
  return n ? n.lastIndex = 0 : te[t] = n = new RegExp(xe + t + Re, "g"), n;
}
function Y(t, n) {
  const o = t.className;
  o.length ? le(n).test(o) || (t.className += " " + n) : t.className = n;
}
function L(t, n) {
  t.className = t.className.replace(le(n), " ").trim();
}
const ke = (t, n) => ({
  containers: n,
  moves: () => !0,
  accepts: () => !0,
  invalid: () => !1,
  isContainer: () => !1,
  transformOffset: (o) => o,
  copy: !1,
  copySortSource: !1,
  revertOnSpill: !1,
  removeOnSpill: !1,
  direction: "vertical",
  ignoreInputTextSelection: !0,
  mirrorContainer: document.body,
  ...t
});
function ne(t) {
  if (t.touches !== void 0)
    return t.touches.length;
  if (t.which !== void 0 && t.which !== 0)
    return t.which;
  if (t.buttons !== void 0)
    return t.buttons;
  const n = t.button;
  if (n !== void 0)
    return n & 1 ? 1 : n & 2 ? 3 : n & 4 ? 2 : 0;
}
const Ae = (t) => {
  const n = t.getBoundingClientRect();
  return {
    left: n.left + re("scrollLeft", "pageXOffset"),
    top: n.top + re("scrollTop", "pageYOffset")
  };
}, re = (t, n) => typeof global[n] < "u" ? global[n] : document.documentElement.clientHeight ? document.documentElement[t] : document.body[t], ie = (t = {}, n, o) => {
  const l = t.className || "";
  t.className += " gu-hide";
  const c = document.elementFromPoint(n, o);
  return t.className = l, c;
}, oe = (t) => t.width || t.right - t.left, ce = (t) => t.height || t.bottom - t.top, v = (t) => t.parentNode === document ? null : t.parentNode, ue = (t) => ["INPUT", "TEXTAREA", "SELECT"].includes(t.tagName) || se(t), se = (t) => !t || t.contentEditable === "false" ? !1 : t.contentEditable === "true" ? !0 : se(v(t)), T = (t) => {
  const n = () => {
    let o = t;
    do
      o = o.nextSibling;
    while (o && o.nodeType !== 1);
    return o;
  };
  return t.nextElementSibling || n();
};
window.global || (window.global = window);
const fe = document, M = fe.documentElement;
function De(t = [], n = {}) {
  Array.isArray(t) || (n = t, t = []);
  let o, l, c, d, h, S, C, X, E, a, x, N, I;
  const s = ke(n, t), f = Le({
    containers: s.containers,
    start: ve,
    end: G,
    cancel: q,
    remove: W,
    destroy: ae,
    canMove: ge,
    dragging: !1
  });
  return s.removeOnSpill && f.on("over", he).on("out", be), j(), f;
  function R(e) {
    return f.containers.indexOf(e) !== -1 || s.isContainer(e);
  }
  function j(e) {
    const r = e ? "removeEventListener" : "addEventListener";
    M[r]("pointerdown", me, !0), M[r]("pointerup", D, !0);
  }
  function k(e) {
    M[e ? "removeEventListener" : "addEventListener"]("pointermove", pe, !0);
  }
  function H(e) {
    M[e ? "removeEventListener" : "addEventListener"]("click", de, !0);
  }
  function ae() {
    j(!0), D({});
  }
  function de(e) {
    I && e.preventDefault();
  }
  function me(e) {
    if (S = e.clientX, C = e.clientY, ne(e) !== 1 || e.metaKey || e.ctrlKey)
      return;
    const i = e.target, u = A(i);
    u && (I = u, k(), e.type === "pointerdown" && (ue(i) ? i.focus() : e.preventDefault()));
  }
  function pe(e) {
    if (!I)
      return;
    if (ne(e) === 0) {
      D({});
      return;
    }
    if (e.clientX !== void 0 && Math.abs(e.clientX - S) <= (s.slideFactorX || 0) && e.clientY !== void 0 && Math.abs(e.clientY - C) <= (s.slideFactorY || 0))
      return;
    if (s.ignoreInputTextSelection) {
      const {
        clientX: O = 0,
        clientY: m = 0
      } = e, w = fe.elementFromPoint(O, m);
      if (ue(w))
        return;
    }
    const r = I;
    k(!0), H(), G(), K(r);
    const i = Ae(c), u = s.transformOffset(i, e, c), {
      pageX: g = 0,
      pageY: p = 0
    } = e;
    d = g - u.left, h = p - u.top, Y(a || c, "gu-transit"), ye(), $(e);
  }
  function A(e) {
    if (f.dragging && o || R(e))
      return;
    const r = e;
    for (; v(e) && R(v(e)) === !1; )
      if (s.invalid(e, r) || (e = v(e), !e))
        return;
    const i = v(e);
    if (!(!i || s.invalid(e, r) || !s.moves(e, i, r, T(e))))
      return {
        item: e,
        source: i
      };
  }
  function ge(e) {
    return !!A(e);
  }
  function ve(e) {
    const r = A(e);
    r && K(r);
  }
  function K(e) {
    Ee(e.item, e.source) && (a = e.item.cloneNode(!0), f.emit("cloned", a, e.item, "copy")), l = e.source, c = e.item, X = E = T(e.item), f.dragging = !0, f.emit("drag", c, l);
  }
  function G() {
    if (!f.dragging)
      return;
    const e = a || c;
    V(e, v(e));
  }
  function U() {
    I = !1, k(!0), H(!0);
  }
  function D(e) {
    if (U(), !f.dragging)
      return;
    const r = a || c, {
      clientX: i = 0,
      clientY: u = 0
    } = e, g = ie(o, i, u), p = J(g, i, u);
    p && (a && s.copySortSource || !a || p !== l) ? V(r, p) : s.removeOnSpill ? W() : q();
  }
  function V(e, r) {
    const i = v(e);
    a && s.copySortSource && r === l && i.removeChild(c), P(r) ? f.emit("cancel", e, l, l) : f.emit("drop", e, r, l, E), F();
  }
  function W() {
    if (!f.dragging)
      return;
    const e = a || c, r = v(e);
    r && r.removeChild(e), f.emit(a ? "cancel" : "remove", e, r, l), F();
  }
  function q(e) {
    if (!f.dragging)
      return;
    const r = arguments.length > 0 ? e : s.revertOnSpill, i = a || c, u = v(i), g = P(u);
    g === !1 && r && (a ? u && u.removeChild(a) : l.insertBefore(i, X)), g || r ? f.emit("cancel", i, l, l) : f.emit("drop", i, u, l, E), F();
  }
  function F() {
    const e = a || c;
    U(), Se(), e && L(e, "gu-transit"), x && clearTimeout(x), f.dragging = !1, N && f.emit("out", e, N, l), f.emit("dragend", e), l = c = a = X = E = x = N = null;
  }
  function P(e, r) {
    let i;
    return r !== void 0 ? i = r : o ? i = E : i = T(a || c), e === l && i === X;
  }
  function J(e, r, i) {
    let u = e;
    for (; u && !g(); )
      u = v(u);
    return u;
    function g() {
      if (R(u) === !1)
        return !1;
      const O = Q(u, e), m = Z(u, O, r, i);
      return P(u, m) ? !0 : s.accepts(c, u, l, m);
    }
  }
  function $(e) {
    if (!o)
      return;
    e.preventDefault();
    const {
      clientX: r = 0,
      clientY: i = 0
    } = e, u = r - d, g = i - h;
    o.style.left = u + "px", o.style.top = g + "px";
    const p = a || c, O = ie(o, r, i);
    let m = J(O, r, i);
    const w = m !== null && m !== N;
    (w || m === null) && (we(), N = m, Ce());
    const b = v(p);
    if (m === l && a && !s.copySortSource) {
      b && b.removeChild(p);
      return;
    }
    let y;
    const B = Q(m, O);
    if (B !== null)
      y = Z(m, B, r, i);
    else if (s.revertOnSpill === !0 && !a)
      y = X, m = l;
    else {
      a && b && b.removeChild(p);
      return;
    }
    (y === null && w || y !== p && y !== T(p)) && (E = y, m.insertBefore(p, y), f.emit("shadow", p, m, l));
    function _(Oe) {
      f.emit(Oe, p, N, l);
    }
    function Ce() {
      w && _("over");
    }
    function we() {
      N && _("out");
    }
  }
  function he(e) {
    L(e, "gu-hide");
  }
  function be(e) {
    f.dragging && Y(e, "gu-hide");
  }
  function ye() {
    if (o)
      return;
    const e = c.getBoundingClientRect();
    o = c.cloneNode(!0), o.style.width = oe(e) + "px", o.style.height = ce(e) + "px", L(o, "gu-transit"), Y(o, "gu-mirror"), s.mirrorContainer.appendChild(o), M.addEventListener("pointermove", $), Y(s.mirrorContainer, "gu-unselectable"), f.emit("cloned", o, c, "mirror");
  }
  function Se() {
    o && (L(s.mirrorContainer, "gu-unselectable"), M.removeEventListener("pointermove", $), v(o).removeChild(o), o = null);
  }
  function Q(e, r) {
    let i = r;
    for (; i !== e && v(i) !== e; )
      i = v(i);
    return i === M ? null : i;
  }
  function Z(e, r, i, u) {
    const g = (typeof s.direction == "function" ? s.direction(c, e, l) : s.direction) === "horizontal";
    return r !== e ? m() : O();
    function O() {
      const b = e.children.length;
      let y, B, _;
      for (y = 0; y < b; y++)
        if (B = e.children[y], _ = B.getBoundingClientRect(), g && _.left + _.width / 2 > i || !g && _.top + _.height / 2 > u)
          return B;
      return null;
    }
    function m() {
      const b = r.getBoundingClientRect();
      return w(g ? i > b.left + oe(b) / 2 : u > b.top + ce(b) / 2);
    }
    function w(b) {
      return b ? T(r) : r;
    }
  }
  function Ee(e, r) {
    return typeof s.copy == "boolean" ? s.copy : s.copy(e, r);
  }
}
export {
  De as default
};
