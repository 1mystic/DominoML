import{r as s,a as dt,R as Pe,b as ft}from"./vendor-9bZoipD1.js";var Oe={exports:{}},X={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var vt=s,ht=Symbol.for("react.element"),pt=Symbol.for("react.fragment"),yt=Object.prototype.hasOwnProperty,mt=vt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,gt={key:!0,ref:!0,__self:!0,__source:!0};function De(e,t,n){var r,o={},a=null,c=null;n!==void 0&&(a=""+n),t.key!==void 0&&(a=""+t.key),t.ref!==void 0&&(c=t.ref);for(r in t)yt.call(t,r)&&!gt.hasOwnProperty(r)&&(o[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)o[r]===void 0&&(o[r]=t[r]);return{$$typeof:ht,type:e,key:a,ref:c,props:o,_owner:mt.current}}X.Fragment=pt;X.jsx=De;X.jsxs=De;Oe.exports=X;var g=Oe.exports;function N(e,t,{checkForDefaultPrevented:n=!0}={}){return function(o){if(e?.(o),n===!1||!o.defaultPrevented)return t?.(o)}}function pe(e,t){if(typeof e=="function")return e(t);e!=null&&(e.current=t)}function Ae(...e){return t=>{let n=!1;const r=e.map(o=>{const a=pe(o,t);return!n&&typeof a=="function"&&(n=!0),a});if(n)return()=>{for(let o=0;o<r.length;o++){const a=r[o];typeof a=="function"?a():pe(e[o],null)}}}}function I(...e){return s.useCallback(Ae(...e),e)}function Et(e,t){const n=s.createContext(t),r=a=>{const{children:c,...i}=a,d=s.useMemo(()=>i,Object.values(i));return g.jsx(n.Provider,{value:d,children:c})};r.displayName=e+"Provider";function o(a){const c=s.useContext(n);if(c)return c;if(t!==void 0)return t;throw new Error(`\`${a}\` must be used within \`${e}\``)}return[r,o]}function bt(e,t=[]){let n=[];function r(a,c){const i=s.createContext(c),d=n.length;n=[...n,c];const l=v=>{const{scope:h,children:m,...S}=v,u=h?.[e]?.[d]||i,y=s.useMemo(()=>S,Object.values(S));return g.jsx(u.Provider,{value:y,children:m})};l.displayName=a+"Provider";function f(v,h){const m=h?.[e]?.[d]||i,S=s.useContext(m);if(S)return S;if(c!==void 0)return c;throw new Error(`\`${v}\` must be used within \`${a}\``)}return[l,f]}const o=()=>{const a=n.map(c=>s.createContext(c));return function(i){const d=i?.[e]||a;return s.useMemo(()=>({[`__scope${e}`]:{...i,[e]:d}}),[i,d])}};return o.scopeName=e,[r,Ct(o,...t)]}function Ct(...e){const t=e[0];if(e.length===1)return t;const n=()=>{const r=e.map(o=>({useScope:o(),scopeName:o.scopeName}));return function(a){const c=r.reduce((i,{useScope:d,scopeName:l})=>{const v=d(a)[`__scope${l}`];return{...i,...v}},{});return s.useMemo(()=>({[`__scope${t.scopeName}`]:c}),[c])}};return n.scopeName=t.scopeName,n}function de(e){const t=kt(e),n=s.forwardRef((r,o)=>{const{children:a,...c}=r,i=s.Children.toArray(a),d=i.find(wt);if(d){const l=d.props.children,f=i.map(v=>v===d?s.Children.count(l)>1?s.Children.only(null):s.isValidElement(l)?l.props.children:null:v);return g.jsx(t,{...c,ref:o,children:s.isValidElement(l)?s.cloneElement(l,void 0,f):null})}return g.jsx(t,{...c,ref:o,children:a})});return n.displayName=`${e}.Slot`,n}var er=de("Slot");function kt(e){const t=s.forwardRef((n,r)=>{const{children:o,...a}=n;if(s.isValidElement(o)){const c=xt(o),i=St(a,o.props);return o.type!==s.Fragment&&(i.ref=r?Ae(r,c):c),s.cloneElement(o,i)}return s.Children.count(o)>1?s.Children.only(null):null});return t.displayName=`${e}.SlotClone`,t}var Ne=Symbol("radix.slottable");function tr(e){const t=({children:n})=>g.jsx(g.Fragment,{children:n});return t.displayName=`${e}.Slottable`,t.__radixId=Ne,t}function wt(e){return s.isValidElement(e)&&typeof e.type=="function"&&"__radixId"in e.type&&e.type.__radixId===Ne}function St(e,t){const n={...t};for(const r in t){const o=e[r],a=t[r];/^on[A-Z]/.test(r)?o&&a?n[r]=(...i)=>{const d=a(...i);return o(...i),d}:o&&(n[r]=o):r==="style"?n[r]={...o,...a}:r==="className"&&(n[r]=[o,a].filter(Boolean).join(" "))}return{...e,...n}}function xt(e){let t=Object.getOwnPropertyDescriptor(e.props,"ref")?.get,n=t&&"isReactWarning"in t&&t.isReactWarning;return n?e.ref:(t=Object.getOwnPropertyDescriptor(e,"ref")?.get,n=t&&"isReactWarning"in t&&t.isReactWarning,n?e.props.ref:e.props.ref||e.ref)}var Mt=["a","button","div","form","h2","h3","img","input","label","li","nav","ol","p","select","span","svg","ul"],D=Mt.reduce((e,t)=>{const n=de(`Primitive.${t}`),r=s.forwardRef((o,a)=>{const{asChild:c,...i}=o,d=c?n:t;return typeof window<"u"&&(window[Symbol.for("radix-ui")]=!0),g.jsx(d,{...i,ref:a})});return r.displayName=`Primitive.${t}`,{...e,[t]:r}},{});function Rt(e,t){e&&dt.flushSync(()=>e.dispatchEvent(t))}function B(e){const t=s.useRef(e);return s.useEffect(()=>{t.current=e}),s.useMemo(()=>(...n)=>t.current?.(...n),[])}function Pt(e,t=globalThis?.document){const n=B(e);s.useEffect(()=>{const r=o=>{o.key==="Escape"&&n(o)};return t.addEventListener("keydown",r,{capture:!0}),()=>t.removeEventListener("keydown",r,{capture:!0})},[n,t])}var Ot="DismissableLayer",ue="dismissableLayer.update",Dt="dismissableLayer.pointerDownOutside",At="dismissableLayer.focusOutside",ye,Te=s.createContext({layers:new Set,layersWithOutsidePointerEventsDisabled:new Set,branches:new Set}),Ie=s.forwardRef((e,t)=>{const{disableOutsidePointerEvents:n=!1,onEscapeKeyDown:r,onPointerDownOutside:o,onFocusOutside:a,onInteractOutside:c,onDismiss:i,...d}=e,l=s.useContext(Te),[f,v]=s.useState(null),h=f?.ownerDocument??globalThis?.document,[,m]=s.useState({}),S=I(t,b=>v(b)),u=Array.from(l.layers),[y]=[...l.layersWithOutsidePointerEventsDisabled].slice(-1),E=u.indexOf(y),C=f?u.indexOf(f):-1,k=l.layersWithOutsidePointerEventsDisabled.size>0,w=C>=E,x=It(b=>{const O=b.target,W=[...l.branches].some(ee=>ee.contains(O));!w||W||(o?.(b),c?.(b),b.defaultPrevented||i?.())},h),P=Lt(b=>{const O=b.target;[...l.branches].some(ee=>ee.contains(O))||(a?.(b),c?.(b),b.defaultPrevented||i?.())},h);return Pt(b=>{C===l.layers.size-1&&(r?.(b),!b.defaultPrevented&&i&&(b.preventDefault(),i()))},h),s.useEffect(()=>{if(f)return n&&(l.layersWithOutsidePointerEventsDisabled.size===0&&(ye=h.body.style.pointerEvents,h.body.style.pointerEvents="none"),l.layersWithOutsidePointerEventsDisabled.add(f)),l.layers.add(f),me(),()=>{n&&l.layersWithOutsidePointerEventsDisabled.size===1&&(h.body.style.pointerEvents=ye)}},[f,h,n,l]),s.useEffect(()=>()=>{f&&(l.layers.delete(f),l.layersWithOutsidePointerEventsDisabled.delete(f),me())},[f,l]),s.useEffect(()=>{const b=()=>m({});return document.addEventListener(ue,b),()=>document.removeEventListener(ue,b)},[]),g.jsx(D.div,{...d,ref:S,style:{pointerEvents:k?w?"auto":"none":void 0,...e.style},onFocusCapture:N(e.onFocusCapture,P.onFocusCapture),onBlurCapture:N(e.onBlurCapture,P.onBlurCapture),onPointerDownCapture:N(e.onPointerDownCapture,x.onPointerDownCapture)})});Ie.displayName=Ot;var Nt="DismissableLayerBranch",Tt=s.forwardRef((e,t)=>{const n=s.useContext(Te),r=s.useRef(null),o=I(t,r);return s.useEffect(()=>{const a=r.current;if(a)return n.branches.add(a),()=>{n.branches.delete(a)}},[n.branches]),g.jsx(D.div,{...e,ref:o})});Tt.displayName=Nt;function It(e,t=globalThis?.document){const n=B(e),r=s.useRef(!1),o=s.useRef(()=>{});return s.useEffect(()=>{const a=i=>{if(i.target&&!r.current){let d=function(){Le(Dt,n,l,{discrete:!0})};const l={originalEvent:i};i.pointerType==="touch"?(t.removeEventListener("click",o.current),o.current=d,t.addEventListener("click",o.current,{once:!0})):d()}else t.removeEventListener("click",o.current);r.current=!1},c=window.setTimeout(()=>{t.addEventListener("pointerdown",a)},0);return()=>{window.clearTimeout(c),t.removeEventListener("pointerdown",a),t.removeEventListener("click",o.current)}},[t,n]),{onPointerDownCapture:()=>r.current=!0}}function Lt(e,t=globalThis?.document){const n=B(e),r=s.useRef(!1);return s.useEffect(()=>{const o=a=>{a.target&&!r.current&&Le(At,n,{originalEvent:a},{discrete:!1})};return t.addEventListener("focusin",o),()=>t.removeEventListener("focusin",o)},[t,n]),{onFocusCapture:()=>r.current=!0,onBlurCapture:()=>r.current=!1}}function me(){const e=new CustomEvent(ue);document.dispatchEvent(e)}function Le(e,t,n,{discrete:r}){const o=n.originalEvent.target,a=new CustomEvent(e,{bubbles:!1,cancelable:!0,detail:n});t&&o.addEventListener(e,t,{once:!0}),r?Rt(o,a):o.dispatchEvent(a)}var U=globalThis?.document?s.useLayoutEffect:()=>{},_t=Pe[" useId ".trim().toString()]||(()=>{}),Ft=0;function te(e){const[t,n]=s.useState(_t());return U(()=>{n(r=>r??String(Ft++))},[e]),t?`radix-${t}`:""}var jt="Portal",_e=s.forwardRef((e,t)=>{const{container:n,...r}=e,[o,a]=s.useState(!1);U(()=>a(!0),[]);const c=n||o&&globalThis?.document?.body;return c?ft.createPortal(g.jsx(D.div,{...r,ref:t}),c):null});_e.displayName=jt;function Wt(e,t){return s.useReducer((n,r)=>t[n][r]??n,e)}var Z=e=>{const{present:t,children:n}=e,r=Bt(t),o=typeof n=="function"?n({present:r.isPresent}):s.Children.only(n),a=I(r.ref,Ut(o));return typeof n=="function"||r.isPresent?s.cloneElement(o,{ref:a}):null};Z.displayName="Presence";function Bt(e){const[t,n]=s.useState(),r=s.useRef(null),o=s.useRef(e),a=s.useRef("none"),c=e?"mounted":"unmounted",[i,d]=Wt(c,{mounted:{UNMOUNT:"unmounted",ANIMATION_OUT:"unmountSuspended"},unmountSuspended:{MOUNT:"mounted",ANIMATION_END:"unmounted"},unmounted:{MOUNT:"mounted"}});return s.useEffect(()=>{const l=H(r.current);a.current=i==="mounted"?l:"none"},[i]),U(()=>{const l=r.current,f=o.current;if(f!==e){const h=a.current,m=H(l);e?d("MOUNT"):m==="none"||l?.display==="none"?d("UNMOUNT"):d(f&&h!==m?"ANIMATION_OUT":"UNMOUNT"),o.current=e}},[e,d]),U(()=>{if(t){let l;const f=t.ownerDocument.defaultView??window,v=m=>{const u=H(r.current).includes(CSS.escape(m.animationName));if(m.target===t&&u&&(d("ANIMATION_END"),!o.current)){const y=t.style.animationFillMode;t.style.animationFillMode="forwards",l=f.setTimeout(()=>{t.style.animationFillMode==="forwards"&&(t.style.animationFillMode=y)})}},h=m=>{m.target===t&&(a.current=H(r.current))};return t.addEventListener("animationstart",h),t.addEventListener("animationcancel",v),t.addEventListener("animationend",v),()=>{f.clearTimeout(l),t.removeEventListener("animationstart",h),t.removeEventListener("animationcancel",v),t.removeEventListener("animationend",v)}}else d("ANIMATION_END")},[t,d]),{isPresent:["mounted","unmountSuspended"].includes(i),ref:s.useCallback(l=>{r.current=l?getComputedStyle(l):null,n(l)},[])}}function H(e){return e?.animationName||"none"}function Ut(e){let t=Object.getOwnPropertyDescriptor(e.props,"ref")?.get,n=t&&"isReactWarning"in t&&t.isReactWarning;return n?e.ref:(t=Object.getOwnPropertyDescriptor(e,"ref")?.get,n=t&&"isReactWarning"in t&&t.isReactWarning,n?e.props.ref:e.props.ref||e.ref)}var Ht=Pe[" useInsertionEffect ".trim().toString()]||U;function Vt({prop:e,defaultProp:t,onChange:n=()=>{},caller:r}){const[o,a,c]=$t({defaultProp:t,onChange:n}),i=e!==void 0,d=i?e:o;{const f=s.useRef(e!==void 0);s.useEffect(()=>{const v=f.current;v!==i&&console.warn(`${r} is changing from ${v?"controlled":"uncontrolled"} to ${i?"controlled":"uncontrolled"}. Components should not switch from controlled to uncontrolled (or vice versa). Decide between using a controlled or uncontrolled value for the lifetime of the component.`),f.current=i},[i,r])}const l=s.useCallback(f=>{if(i){const v=zt(f)?f(e):f;v!==e&&c.current?.(v)}else a(f)},[i,e,a,c]);return[d,l]}function $t({defaultProp:e,onChange:t}){const[n,r]=s.useState(e),o=s.useRef(n),a=s.useRef(t);return Ht(()=>{a.current=t},[t]),s.useEffect(()=>{o.current!==n&&(a.current?.(n),o.current=n)},[n,o]),[n,r,a]}function zt(e){return typeof e=="function"}var R=function(){return R=Object.assign||function(t){for(var n,r=1,o=arguments.length;r<o;r++){n=arguments[r];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(t[a]=n[a])}return t},R.apply(this,arguments)};function Fe(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&Object.prototype.propertyIsEnumerable.call(e,r[o])&&(n[r[o]]=e[r[o]]);return n}function qt(e,t,n){if(n||arguments.length===2)for(var r=0,o=t.length,a;r<o;r++)(a||!(r in t))&&(a||(a=Array.prototype.slice.call(t,0,r)),a[r]=t[r]);return e.concat(a||Array.prototype.slice.call(t))}/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kt=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),je=(...e)=>e.filter((t,n,r)=>!!t&&t.trim()!==""&&r.indexOf(t)===n).join(" ").trim();/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Gt={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yt=s.forwardRef(({color:e="currentColor",size:t=24,strokeWidth:n=2,absoluteStrokeWidth:r,className:o="",children:a,iconNode:c,...i},d)=>s.createElement("svg",{ref:d,...Gt,width:t,height:t,stroke:e,strokeWidth:r?Number(n)*24/Number(t):n,className:je("lucide",o),...i},[...c.map(([l,f])=>s.createElement(l,f)),...Array.isArray(a)?a:[a]]));/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=(e,t)=>{const n=s.forwardRef(({className:r,...o},a)=>s.createElement(Yt,{ref:a,iconNode:t,className:je(`lucide-${Kt(e)}`,r),...o}));return n.displayName=`${e}`,n};/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nr=p("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rr=p("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const or=p("BookOpen",[["path",{d:"M12 7v14",key:"1akyts"}],["path",{d:"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",key:"ruj8y"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ar=p("Brain",[["path",{d:"M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z",key:"l5xja"}],["path",{d:"M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z",key:"ep3f8r"}],["path",{d:"M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4",key:"1p4c4q"}],["path",{d:"M17.599 6.5a3 3 0 0 0 .399-1.375",key:"tmeiqw"}],["path",{d:"M6.003 5.125A3 3 0 0 0 6.401 6.5",key:"105sqy"}],["path",{d:"M3.477 10.896a4 4 0 0 1 .585-.396",key:"ql3yin"}],["path",{d:"M19.938 10.5a4 4 0 0 1 .585.396",key:"1qfode"}],["path",{d:"M6 18a4 4 0 0 1-1.967-.516",key:"2e4loj"}],["path",{d:"M19.967 17.484A4 4 0 0 1 18 18",key:"159ez6"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sr=p("Calendar",[["path",{d:"M8 2v4",key:"1cmpym"}],["path",{d:"M16 2v4",key:"4m81vk"}],["rect",{width:"18",height:"18",x:"3",y:"4",rx:"2",key:"1hopcy"}],["path",{d:"M3 10h18",key:"8toen8"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ir=p("ChartColumn",[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["path",{d:"M18 17V9",key:"2bz60n"}],["path",{d:"M13 17V5",key:"1frdt8"}],["path",{d:"M8 17v-3",key:"17ska0"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const cr=p("Check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ur=p("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lr=p("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const dr=p("ChevronUp",[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const fr=p("CircleAlert",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vr=p("CircleCheckBig",[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const hr=p("Circle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const pr=p("Cloud",[["path",{d:"M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z",key:"p7xjir"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yr=p("Code",[["polyline",{points:"16 18 22 12 16 6",key:"z7tu5w"}],["polyline",{points:"8 6 2 12 8 18",key:"1eg1df"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mr=p("Copy",[["rect",{width:"14",height:"14",x:"8",y:"8",rx:"2",ry:"2",key:"17jyea"}],["path",{d:"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2",key:"zix9uf"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gr=p("Database",[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3",key:"msslwz"}],["path",{d:"M3 5V19A9 3 0 0 0 21 19V5",key:"1wlel7"}],["path",{d:"M3 12A9 3 0 0 0 21 12",key:"mv7ke4"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Er=p("Download",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"7 10 12 15 17 10",key:"2ggqvy"}],["line",{x1:"12",x2:"12",y1:"15",y2:"3",key:"1vk2je"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const br=p("Eye",[["path",{d:"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",key:"1nclc0"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cr=p("FolderOpen",[["path",{d:"m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",key:"usdka0"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kr=p("GitBranch",[["line",{x1:"6",x2:"6",y1:"3",y2:"15",key:"17qcm7"}],["circle",{cx:"18",cy:"6",r:"3",key:"1h7g24"}],["circle",{cx:"6",cy:"18",r:"3",key:"fqmcym"}],["path",{d:"M18 9a9 9 0 0 1-9 9",key:"n2h4wq"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wr=p("History",[["path",{d:"M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8",key:"1357e3"}],["path",{d:"M3 3v5h5",key:"1xhq8a"}],["path",{d:"M12 7v5l4 2",key:"1fdv2h"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Sr=p("House",[["path",{d:"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",key:"5wwlr5"}],["path",{d:"M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"1d0kgt"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xr=p("Info",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Mr=p("LoaderCircle",[["path",{d:"M21 12a9 9 0 1 1-6.219-8.56",key:"13zald"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Rr=p("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Pr=p("Mail",[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Or=p("Moon",[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dr=p("Palette",[["circle",{cx:"13.5",cy:"6.5",r:".5",fill:"currentColor",key:"1okk4w"}],["circle",{cx:"17.5",cy:"10.5",r:".5",fill:"currentColor",key:"f64h9f"}],["circle",{cx:"8.5",cy:"7.5",r:".5",fill:"currentColor",key:"fotxhn"}],["circle",{cx:"6.5",cy:"12.5",r:".5",fill:"currentColor",key:"qy21gx"}],["path",{d:"M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z",key:"12rzf8"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ar=p("Play",[["polygon",{points:"6 3 20 12 6 21 6 3",key:"1oa8hb"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nr=p("Save",[["path",{d:"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",key:"1c8476"}],["path",{d:"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",key:"1ydtos"}],["path",{d:"M7 3v4a1 1 0 0 0 1 1h7",key:"t51u73"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tr=p("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ir=p("Settings",[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lr=p("Sparkles",[["path",{d:"M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",key:"4pj2yx"}],["path",{d:"M20 3v4",key:"1olli1"}],["path",{d:"M22 5h-4",key:"1gvqau"}],["path",{d:"M4 17v2",key:"vumght"}],["path",{d:"M5 18H3",key:"zchphs"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _r=p("Sun",[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fr=p("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jr=p("Upload",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"17 8 12 3 7 8",key:"t8dd8p"}],["line",{x1:"12",x2:"12",y1:"3",y2:"15",key:"widbto"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wr=p("UserPlus",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["line",{x1:"19",x2:"19",y1:"8",y2:"14",key:"1bvyxn"}],["line",{x1:"22",x2:"16",y1:"11",y2:"11",key:"1shjgl"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Br=p("User",[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ur=p("Wrench",[["path",{d:"M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",key:"cbrjhi"}]]);/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hr=p("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);var ne=0;function Xt(){s.useEffect(()=>{const e=document.querySelectorAll("[data-radix-focus-guard]");return document.body.insertAdjacentElement("afterbegin",e[0]??ge()),document.body.insertAdjacentElement("beforeend",e[1]??ge()),ne++,()=>{ne===1&&document.querySelectorAll("[data-radix-focus-guard]").forEach(t=>t.remove()),ne--}},[])}function ge(){const e=document.createElement("span");return e.setAttribute("data-radix-focus-guard",""),e.tabIndex=0,e.style.outline="none",e.style.opacity="0",e.style.position="fixed",e.style.pointerEvents="none",e}var re="focusScope.autoFocusOnMount",oe="focusScope.autoFocusOnUnmount",Ee={bubbles:!1,cancelable:!0},Zt="FocusScope",We=s.forwardRef((e,t)=>{const{loop:n=!1,trapped:r=!1,onMountAutoFocus:o,onUnmountAutoFocus:a,...c}=e,[i,d]=s.useState(null),l=B(o),f=B(a),v=s.useRef(null),h=I(t,u=>d(u)),m=s.useRef({paused:!1,pause(){this.paused=!0},resume(){this.paused=!1}}).current;s.useEffect(()=>{if(r){let u=function(k){if(m.paused||!i)return;const w=k.target;i.contains(w)?v.current=w:A(v.current,{select:!0})},y=function(k){if(m.paused||!i)return;const w=k.relatedTarget;w!==null&&(i.contains(w)||A(v.current,{select:!0}))},E=function(k){if(document.activeElement===document.body)for(const x of k)x.removedNodes.length>0&&A(i)};document.addEventListener("focusin",u),document.addEventListener("focusout",y);const C=new MutationObserver(E);return i&&C.observe(i,{childList:!0,subtree:!0}),()=>{document.removeEventListener("focusin",u),document.removeEventListener("focusout",y),C.disconnect()}}},[r,i,m.paused]),s.useEffect(()=>{if(i){Ce.add(m);const u=document.activeElement;if(!i.contains(u)){const E=new CustomEvent(re,Ee);i.addEventListener(re,l),i.dispatchEvent(E),E.defaultPrevented||(Qt(rn(Be(i)),{select:!0}),document.activeElement===u&&A(i))}return()=>{i.removeEventListener(re,l),setTimeout(()=>{const E=new CustomEvent(oe,Ee);i.addEventListener(oe,f),i.dispatchEvent(E),E.defaultPrevented||A(u??document.body,{select:!0}),i.removeEventListener(oe,f),Ce.remove(m)},0)}}},[i,l,f,m]);const S=s.useCallback(u=>{if(!n&&!r||m.paused)return;const y=u.key==="Tab"&&!u.altKey&&!u.ctrlKey&&!u.metaKey,E=document.activeElement;if(y&&E){const C=u.currentTarget,[k,w]=Jt(C);k&&w?!u.shiftKey&&E===w?(u.preventDefault(),n&&A(k,{select:!0})):u.shiftKey&&E===k&&(u.preventDefault(),n&&A(w,{select:!0})):E===C&&u.preventDefault()}},[n,r,m.paused]);return g.jsx(D.div,{tabIndex:-1,...c,ref:h,onKeyDown:S})});We.displayName=Zt;function Qt(e,{select:t=!1}={}){const n=document.activeElement;for(const r of e)if(A(r,{select:t}),document.activeElement!==n)return}function Jt(e){const t=Be(e),n=be(t,e),r=be(t.reverse(),e);return[n,r]}function Be(e){const t=[],n=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode:r=>{const o=r.tagName==="INPUT"&&r.type==="hidden";return r.disabled||r.hidden||o?NodeFilter.FILTER_SKIP:r.tabIndex>=0?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP}});for(;n.nextNode();)t.push(n.currentNode);return t}function be(e,t){for(const n of e)if(!en(n,{upTo:t}))return n}function en(e,{upTo:t}){if(getComputedStyle(e).visibility==="hidden")return!0;for(;e;){if(t!==void 0&&e===t)return!1;if(getComputedStyle(e).display==="none")return!0;e=e.parentElement}return!1}function tn(e){return e instanceof HTMLInputElement&&"select"in e}function A(e,{select:t=!1}={}){if(e&&e.focus){const n=document.activeElement;e.focus({preventScroll:!0}),e!==n&&tn(e)&&t&&e.select()}}var Ce=nn();function nn(){let e=[];return{add(t){const n=e[0];t!==n&&n?.pause(),e=ke(e,t),e.unshift(t)},remove(t){e=ke(e,t),e[0]?.resume()}}}function ke(e,t){const n=[...e],r=n.indexOf(t);return r!==-1&&n.splice(r,1),n}function rn(e){return e.filter(t=>t.tagName!=="A")}var on=function(e){if(typeof document>"u")return null;var t=Array.isArray(e)?e[0]:e;return t.ownerDocument.body},L=new WeakMap,V=new WeakMap,$={},ae=0,Ue=function(e){return e&&(e.host||Ue(e.parentNode))},an=function(e,t){return t.map(function(n){if(e.contains(n))return n;var r=Ue(n);return r&&e.contains(r)?r:(console.error("aria-hidden",n,"in not contained inside",e,". Doing nothing"),null)}).filter(function(n){return!!n})},sn=function(e,t,n,r){var o=an(t,Array.isArray(e)?e:[e]);$[n]||($[n]=new WeakMap);var a=$[n],c=[],i=new Set,d=new Set(o),l=function(v){!v||i.has(v)||(i.add(v),l(v.parentNode))};o.forEach(l);var f=function(v){!v||d.has(v)||Array.prototype.forEach.call(v.children,function(h){if(i.has(h))f(h);else try{var m=h.getAttribute(r),S=m!==null&&m!=="false",u=(L.get(h)||0)+1,y=(a.get(h)||0)+1;L.set(h,u),a.set(h,y),c.push(h),u===1&&S&&V.set(h,!0),y===1&&h.setAttribute(n,"true"),S||h.setAttribute(r,"true")}catch(E){console.error("aria-hidden: cannot operate on ",h,E)}})};return f(t),i.clear(),ae++,function(){c.forEach(function(v){var h=L.get(v)-1,m=a.get(v)-1;L.set(v,h),a.set(v,m),h||(V.has(v)||v.removeAttribute(r),V.delete(v)),m||v.removeAttribute(n)}),ae--,ae||(L=new WeakMap,L=new WeakMap,V=new WeakMap,$={})}},cn=function(e,t,n){n===void 0&&(n="data-aria-hidden");var r=Array.from(Array.isArray(e)?e:[e]),o=on(e);return o?(r.push.apply(r,Array.from(o.querySelectorAll("[aria-live], script"))),sn(r,o,n,"aria-hidden")):function(){return null}},K="right-scroll-bar-position",G="width-before-scroll-bar",un="with-scroll-bars-hidden",ln="--removed-body-scroll-bar-size";function se(e,t){return typeof e=="function"?e(t):e&&(e.current=t),e}function dn(e,t){var n=s.useState(function(){return{value:e,callback:t,facade:{get current(){return n.value},set current(r){var o=n.value;o!==r&&(n.value=r,n.callback(r,o))}}}})[0];return n.callback=t,n.facade}var fn=typeof window<"u"?s.useLayoutEffect:s.useEffect,we=new WeakMap;function vn(e,t){var n=dn(null,function(r){return e.forEach(function(o){return se(o,r)})});return fn(function(){var r=we.get(n);if(r){var o=new Set(r),a=new Set(e),c=n.current;o.forEach(function(i){a.has(i)||se(i,null)}),a.forEach(function(i){o.has(i)||se(i,c)})}we.set(n,e)},[e]),n}function hn(e){return e}function pn(e,t){t===void 0&&(t=hn);var n=[],r=!1,o={read:function(){if(r)throw new Error("Sidecar: could not `read` from an `assigned` medium. `read` could be used only with `useMedium`.");return n.length?n[n.length-1]:e},useMedium:function(a){var c=t(a,r);return n.push(c),function(){n=n.filter(function(i){return i!==c})}},assignSyncMedium:function(a){for(r=!0;n.length;){var c=n;n=[],c.forEach(a)}n={push:function(i){return a(i)},filter:function(){return n}}},assignMedium:function(a){r=!0;var c=[];if(n.length){var i=n;n=[],i.forEach(a),c=n}var d=function(){var f=c;c=[],f.forEach(a)},l=function(){return Promise.resolve().then(d)};l(),n={push:function(f){c.push(f),l()},filter:function(f){return c=c.filter(f),n}}}};return o}function yn(e){e===void 0&&(e={});var t=pn(null);return t.options=R({async:!0,ssr:!1},e),t}var He=function(e){var t=e.sideCar,n=Fe(e,["sideCar"]);if(!t)throw new Error("Sidecar: please provide `sideCar` property to import the right car");var r=t.read();if(!r)throw new Error("Sidecar medium not found");return s.createElement(r,R({},n))};He.isSideCarExport=!0;function mn(e,t){return e.useMedium(t),He}var Ve=yn(),ie=function(){},Q=s.forwardRef(function(e,t){var n=s.useRef(null),r=s.useState({onScrollCapture:ie,onWheelCapture:ie,onTouchMoveCapture:ie}),o=r[0],a=r[1],c=e.forwardProps,i=e.children,d=e.className,l=e.removeScrollBar,f=e.enabled,v=e.shards,h=e.sideCar,m=e.noRelative,S=e.noIsolation,u=e.inert,y=e.allowPinchZoom,E=e.as,C=E===void 0?"div":E,k=e.gapMode,w=Fe(e,["forwardProps","children","className","removeScrollBar","enabled","shards","sideCar","noRelative","noIsolation","inert","allowPinchZoom","as","gapMode"]),x=h,P=vn([n,t]),b=R(R({},w),o);return s.createElement(s.Fragment,null,f&&s.createElement(x,{sideCar:Ve,removeScrollBar:l,shards:v,noRelative:m,noIsolation:S,inert:u,setCallbacks:a,allowPinchZoom:!!y,lockRef:n,gapMode:k}),c?s.cloneElement(s.Children.only(i),R(R({},b),{ref:P})):s.createElement(C,R({},b,{className:d,ref:P}),i))});Q.defaultProps={enabled:!0,removeScrollBar:!0,inert:!1};Q.classNames={fullWidth:G,zeroRight:K};var gn=function(){if(typeof __webpack_nonce__<"u")return __webpack_nonce__};function En(){if(!document)return null;var e=document.createElement("style");e.type="text/css";var t=gn();return t&&e.setAttribute("nonce",t),e}function bn(e,t){e.styleSheet?e.styleSheet.cssText=t:e.appendChild(document.createTextNode(t))}function Cn(e){var t=document.head||document.getElementsByTagName("head")[0];t.appendChild(e)}var kn=function(){var e=0,t=null;return{add:function(n){e==0&&(t=En())&&(bn(t,n),Cn(t)),e++},remove:function(){e--,!e&&t&&(t.parentNode&&t.parentNode.removeChild(t),t=null)}}},wn=function(){var e=kn();return function(t,n){s.useEffect(function(){return e.add(t),function(){e.remove()}},[t&&n])}},$e=function(){var e=wn(),t=function(n){var r=n.styles,o=n.dynamic;return e(r,o),null};return t},Sn={left:0,top:0,right:0,gap:0},ce=function(e){return parseInt(e||"",10)||0},xn=function(e){var t=window.getComputedStyle(document.body),n=t[e==="padding"?"paddingLeft":"marginLeft"],r=t[e==="padding"?"paddingTop":"marginTop"],o=t[e==="padding"?"paddingRight":"marginRight"];return[ce(n),ce(r),ce(o)]},Mn=function(e){if(e===void 0&&(e="margin"),typeof window>"u")return Sn;var t=xn(e),n=document.documentElement.clientWidth,r=window.innerWidth;return{left:t[0],top:t[1],right:t[2],gap:Math.max(0,r-n+t[2]-t[0])}},Rn=$e(),j="data-scroll-locked",Pn=function(e,t,n,r){var o=e.left,a=e.top,c=e.right,i=e.gap;return n===void 0&&(n="margin"),`
  .`.concat(un,` {
   overflow: hidden `).concat(r,`;
   padding-right: `).concat(i,"px ").concat(r,`;
  }
  body[`).concat(j,`] {
    overflow: hidden `).concat(r,`;
    overscroll-behavior: contain;
    `).concat([t&&"position: relative ".concat(r,";"),n==="margin"&&`
    padding-left: `.concat(o,`px;
    padding-top: `).concat(a,`px;
    padding-right: `).concat(c,`px;
    margin-left:0;
    margin-top:0;
    margin-right: `).concat(i,"px ").concat(r,`;
    `),n==="padding"&&"padding-right: ".concat(i,"px ").concat(r,";")].filter(Boolean).join(""),`
  }
  
  .`).concat(K,` {
    right: `).concat(i,"px ").concat(r,`;
  }
  
  .`).concat(G,` {
    margin-right: `).concat(i,"px ").concat(r,`;
  }
  
  .`).concat(K," .").concat(K,` {
    right: 0 `).concat(r,`;
  }
  
  .`).concat(G," .").concat(G,` {
    margin-right: 0 `).concat(r,`;
  }
  
  body[`).concat(j,`] {
    `).concat(ln,": ").concat(i,`px;
  }
`)},Se=function(){var e=parseInt(document.body.getAttribute(j)||"0",10);return isFinite(e)?e:0},On=function(){s.useEffect(function(){return document.body.setAttribute(j,(Se()+1).toString()),function(){var e=Se()-1;e<=0?document.body.removeAttribute(j):document.body.setAttribute(j,e.toString())}},[])},Dn=function(e){var t=e.noRelative,n=e.noImportant,r=e.gapMode,o=r===void 0?"margin":r;On();var a=s.useMemo(function(){return Mn(o)},[o]);return s.createElement(Rn,{styles:Pn(a,!t,o,n?"":"!important")})},le=!1;if(typeof window<"u")try{var z=Object.defineProperty({},"passive",{get:function(){return le=!0,!0}});window.addEventListener("test",z,z),window.removeEventListener("test",z,z)}catch{le=!1}var _=le?{passive:!1}:!1,An=function(e){return e.tagName==="TEXTAREA"},ze=function(e,t){if(!(e instanceof Element))return!1;var n=window.getComputedStyle(e);return n[t]!=="hidden"&&!(n.overflowY===n.overflowX&&!An(e)&&n[t]==="visible")},Nn=function(e){return ze(e,"overflowY")},Tn=function(e){return ze(e,"overflowX")},xe=function(e,t){var n=t.ownerDocument,r=t;do{typeof ShadowRoot<"u"&&r instanceof ShadowRoot&&(r=r.host);var o=qe(e,r);if(o){var a=Ke(e,r),c=a[1],i=a[2];if(c>i)return!0}r=r.parentNode}while(r&&r!==n.body);return!1},In=function(e){var t=e.scrollTop,n=e.scrollHeight,r=e.clientHeight;return[t,n,r]},Ln=function(e){var t=e.scrollLeft,n=e.scrollWidth,r=e.clientWidth;return[t,n,r]},qe=function(e,t){return e==="v"?Nn(t):Tn(t)},Ke=function(e,t){return e==="v"?In(t):Ln(t)},_n=function(e,t){return e==="h"&&t==="rtl"?-1:1},Fn=function(e,t,n,r,o){var a=_n(e,window.getComputedStyle(t).direction),c=a*r,i=n.target,d=t.contains(i),l=!1,f=c>0,v=0,h=0;do{if(!i)break;var m=Ke(e,i),S=m[0],u=m[1],y=m[2],E=u-y-a*S;(S||E)&&qe(e,i)&&(v+=E,h+=S);var C=i.parentNode;i=C&&C.nodeType===Node.DOCUMENT_FRAGMENT_NODE?C.host:C}while(!d&&i!==document.body||d&&(t.contains(i)||t===i));return(f&&Math.abs(v)<1||!f&&Math.abs(h)<1)&&(l=!0),l},q=function(e){return"changedTouches"in e?[e.changedTouches[0].clientX,e.changedTouches[0].clientY]:[0,0]},Me=function(e){return[e.deltaX,e.deltaY]},Re=function(e){return e&&"current"in e?e.current:e},jn=function(e,t){return e[0]===t[0]&&e[1]===t[1]},Wn=function(e){return`
  .block-interactivity-`.concat(e,` {pointer-events: none;}
  .allow-interactivity-`).concat(e,` {pointer-events: all;}
`)},Bn=0,F=[];function Un(e){var t=s.useRef([]),n=s.useRef([0,0]),r=s.useRef(),o=s.useState(Bn++)[0],a=s.useState($e)[0],c=s.useRef(e);s.useEffect(function(){c.current=e},[e]),s.useEffect(function(){if(e.inert){document.body.classList.add("block-interactivity-".concat(o));var u=qt([e.lockRef.current],(e.shards||[]).map(Re),!0).filter(Boolean);return u.forEach(function(y){return y.classList.add("allow-interactivity-".concat(o))}),function(){document.body.classList.remove("block-interactivity-".concat(o)),u.forEach(function(y){return y.classList.remove("allow-interactivity-".concat(o))})}}},[e.inert,e.lockRef.current,e.shards]);var i=s.useCallback(function(u,y){if("touches"in u&&u.touches.length===2||u.type==="wheel"&&u.ctrlKey)return!c.current.allowPinchZoom;var E=q(u),C=n.current,k="deltaX"in u?u.deltaX:C[0]-E[0],w="deltaY"in u?u.deltaY:C[1]-E[1],x,P=u.target,b=Math.abs(k)>Math.abs(w)?"h":"v";if("touches"in u&&b==="h"&&P.type==="range")return!1;var O=xe(b,P);if(!O)return!0;if(O?x=b:(x=b==="v"?"h":"v",O=xe(b,P)),!O)return!1;if(!r.current&&"changedTouches"in u&&(k||w)&&(r.current=x),!x)return!0;var W=r.current||x;return Fn(W,y,u,W==="h"?k:w)},[]),d=s.useCallback(function(u){var y=u;if(!(!F.length||F[F.length-1]!==a)){var E="deltaY"in y?Me(y):q(y),C=t.current.filter(function(x){return x.name===y.type&&(x.target===y.target||y.target===x.shadowParent)&&jn(x.delta,E)})[0];if(C&&C.should){y.cancelable&&y.preventDefault();return}if(!C){var k=(c.current.shards||[]).map(Re).filter(Boolean).filter(function(x){return x.contains(y.target)}),w=k.length>0?i(y,k[0]):!c.current.noIsolation;w&&y.cancelable&&y.preventDefault()}}},[]),l=s.useCallback(function(u,y,E,C){var k={name:u,delta:y,target:E,should:C,shadowParent:Hn(E)};t.current.push(k),setTimeout(function(){t.current=t.current.filter(function(w){return w!==k})},1)},[]),f=s.useCallback(function(u){n.current=q(u),r.current=void 0},[]),v=s.useCallback(function(u){l(u.type,Me(u),u.target,i(u,e.lockRef.current))},[]),h=s.useCallback(function(u){l(u.type,q(u),u.target,i(u,e.lockRef.current))},[]);s.useEffect(function(){return F.push(a),e.setCallbacks({onScrollCapture:v,onWheelCapture:v,onTouchMoveCapture:h}),document.addEventListener("wheel",d,_),document.addEventListener("touchmove",d,_),document.addEventListener("touchstart",f,_),function(){F=F.filter(function(u){return u!==a}),document.removeEventListener("wheel",d,_),document.removeEventListener("touchmove",d,_),document.removeEventListener("touchstart",f,_)}},[]);var m=e.removeScrollBar,S=e.inert;return s.createElement(s.Fragment,null,S?s.createElement(a,{styles:Wn(o)}):null,m?s.createElement(Dn,{noRelative:e.noRelative,gapMode:e.gapMode}):null)}function Hn(e){for(var t=null;e!==null;)e instanceof ShadowRoot&&(t=e.host,e=e.host),e=e.parentNode;return t}const Vn=mn(Ve,Un);var Ge=s.forwardRef(function(e,t){return s.createElement(Q,R({},e,{ref:t,sideCar:Vn}))});Ge.classNames=Q.classNames;var J="Dialog",[Ye,Vr]=bt(J),[$n,M]=Ye(J),Xe=e=>{const{__scopeDialog:t,children:n,open:r,defaultOpen:o,onOpenChange:a,modal:c=!0}=e,i=s.useRef(null),d=s.useRef(null),[l,f]=Vt({prop:r,defaultProp:o??!1,onChange:a,caller:J});return g.jsx($n,{scope:t,triggerRef:i,contentRef:d,contentId:te(),titleId:te(),descriptionId:te(),open:l,onOpenChange:f,onOpenToggle:s.useCallback(()=>f(v=>!v),[f]),modal:c,children:n})};Xe.displayName=J;var Ze="DialogTrigger",Qe=s.forwardRef((e,t)=>{const{__scopeDialog:n,...r}=e,o=M(Ze,n),a=I(t,o.triggerRef);return g.jsx(D.button,{type:"button","aria-haspopup":"dialog","aria-expanded":o.open,"aria-controls":o.contentId,"data-state":he(o.open),...r,ref:a,onClick:N(e.onClick,o.onOpenToggle)})});Qe.displayName=Ze;var fe="DialogPortal",[zn,Je]=Ye(fe,{forceMount:void 0}),et=e=>{const{__scopeDialog:t,forceMount:n,children:r,container:o}=e,a=M(fe,t);return g.jsx(zn,{scope:t,forceMount:n,children:s.Children.map(r,c=>g.jsx(Z,{present:n||a.open,children:g.jsx(_e,{asChild:!0,container:o,children:c})}))})};et.displayName=fe;var Y="DialogOverlay",tt=s.forwardRef((e,t)=>{const n=Je(Y,e.__scopeDialog),{forceMount:r=n.forceMount,...o}=e,a=M(Y,e.__scopeDialog);return a.modal?g.jsx(Z,{present:r||a.open,children:g.jsx(Kn,{...o,ref:t})}):null});tt.displayName=Y;var qn=de("DialogOverlay.RemoveScroll"),Kn=s.forwardRef((e,t)=>{const{__scopeDialog:n,...r}=e,o=M(Y,n);return g.jsx(Ge,{as:qn,allowPinchZoom:!0,shards:[o.contentRef],children:g.jsx(D.div,{"data-state":he(o.open),...r,ref:t,style:{pointerEvents:"auto",...r.style}})})}),T="DialogContent",nt=s.forwardRef((e,t)=>{const n=Je(T,e.__scopeDialog),{forceMount:r=n.forceMount,...o}=e,a=M(T,e.__scopeDialog);return g.jsx(Z,{present:r||a.open,children:a.modal?g.jsx(Gn,{...o,ref:t}):g.jsx(Yn,{...o,ref:t})})});nt.displayName=T;var Gn=s.forwardRef((e,t)=>{const n=M(T,e.__scopeDialog),r=s.useRef(null),o=I(t,n.contentRef,r);return s.useEffect(()=>{const a=r.current;if(a)return cn(a)},[]),g.jsx(rt,{...e,ref:o,trapFocus:n.open,disableOutsidePointerEvents:!0,onCloseAutoFocus:N(e.onCloseAutoFocus,a=>{a.preventDefault(),n.triggerRef.current?.focus()}),onPointerDownOutside:N(e.onPointerDownOutside,a=>{const c=a.detail.originalEvent,i=c.button===0&&c.ctrlKey===!0;(c.button===2||i)&&a.preventDefault()}),onFocusOutside:N(e.onFocusOutside,a=>a.preventDefault())})}),Yn=s.forwardRef((e,t)=>{const n=M(T,e.__scopeDialog),r=s.useRef(!1),o=s.useRef(!1);return g.jsx(rt,{...e,ref:t,trapFocus:!1,disableOutsidePointerEvents:!1,onCloseAutoFocus:a=>{e.onCloseAutoFocus?.(a),a.defaultPrevented||(r.current||n.triggerRef.current?.focus(),a.preventDefault()),r.current=!1,o.current=!1},onInteractOutside:a=>{e.onInteractOutside?.(a),a.defaultPrevented||(r.current=!0,a.detail.originalEvent.type==="pointerdown"&&(o.current=!0));const c=a.target;n.triggerRef.current?.contains(c)&&a.preventDefault(),a.detail.originalEvent.type==="focusin"&&o.current&&a.preventDefault()}})}),rt=s.forwardRef((e,t)=>{const{__scopeDialog:n,trapFocus:r,onOpenAutoFocus:o,onCloseAutoFocus:a,...c}=e,i=M(T,n),d=s.useRef(null),l=I(t,d);return Xt(),g.jsxs(g.Fragment,{children:[g.jsx(We,{asChild:!0,loop:!0,trapped:r,onMountAutoFocus:o,onUnmountAutoFocus:a,children:g.jsx(Ie,{role:"dialog",id:i.contentId,"aria-describedby":i.descriptionId,"aria-labelledby":i.titleId,"data-state":he(i.open),...c,ref:l,onDismiss:()=>i.onOpenChange(!1)})}),g.jsxs(g.Fragment,{children:[g.jsx(Xn,{titleId:i.titleId}),g.jsx(Qn,{contentRef:d,descriptionId:i.descriptionId})]})]})}),ve="DialogTitle",ot=s.forwardRef((e,t)=>{const{__scopeDialog:n,...r}=e,o=M(ve,n);return g.jsx(D.h2,{id:o.titleId,...r,ref:t})});ot.displayName=ve;var at="DialogDescription",st=s.forwardRef((e,t)=>{const{__scopeDialog:n,...r}=e,o=M(at,n);return g.jsx(D.p,{id:o.descriptionId,...r,ref:t})});st.displayName=at;var it="DialogClose",ct=s.forwardRef((e,t)=>{const{__scopeDialog:n,...r}=e,o=M(it,n);return g.jsx(D.button,{type:"button",...r,ref:t,onClick:N(e.onClick,()=>o.onOpenChange(!1))})});ct.displayName=it;function he(e){return e?"open":"closed"}var ut="DialogTitleWarning",[$r,lt]=Et(ut,{contentName:T,titleName:ve,docsSlug:"dialog"}),Xn=({titleId:e})=>{const t=lt(ut),n=`\`${t.contentName}\` requires a \`${t.titleName}\` for the component to be accessible for screen reader users.

If you want to hide the \`${t.titleName}\`, you can wrap it with our VisuallyHidden component.

For more information, see https://radix-ui.com/primitives/docs/components/${t.docsSlug}`;return s.useEffect(()=>{e&&(document.getElementById(e)||console.error(n))},[n,e]),null},Zn="DialogDescriptionWarning",Qn=({contentRef:e,descriptionId:t})=>{const r=`Warning: Missing \`Description\` or \`aria-describedby={undefined}\` for {${lt(Zn).contentName}}.`;return s.useEffect(()=>{const o=e.current?.getAttribute("aria-describedby");t&&o&&(document.getElementById(t)||console.warn(r))},[r,e,t]),null},zr=Xe,qr=Qe,Kr=et,Gr=tt,Yr=nt,Xr=ot,Zr=st,Qr=ct;export{ur as $,rr as A,ar as B,lr as C,Ie as D,Er as E,We as F,kr as G,nr as H,Mr as I,Pr as J,Kr as K,Rr as L,Or as M,Yr as N,Gr as O,D as P,Qr as Q,Ge as R,er as S,Xr as T,Br as U,Zr as V,zr as W,Hr as X,qr as Y,Tr as Z,Fe as _,I as a,ir as a0,Ur as a1,gr as a2,dr as a3,br as a4,Vr as a5,$r as a6,Cr as a7,sr as a8,Fr as a9,mr as aa,jr as ab,vr as ac,fr as ad,xr as ae,Sr as af,or as ag,wr as ah,Nr as ai,B as b,bt as c,Z as d,tr as e,N as f,de as g,te as h,Vt as i,g as j,Ae as k,_e as l,Xt as m,cn as n,Rt as o,cr as p,hr as q,_r as r,Ir as s,Dr as t,U as u,Ar as v,Wr as w,yr as x,pr as y,Lr as z};
