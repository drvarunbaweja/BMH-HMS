import{L as vf,_ as Tf,C as wf,r as Xr,a as Af,F as ey,b as ft,c as Rf,d as Cf,i as Do,p as Sf,e as Pf,g as Jr,f as ty,h as ny,j as bf,k as He,S as Vf,l as k,s as Pe,m as jl,n as Vt,o as us,q as Zr,t as sy,u as iy,v as ry,w as Hi,x as xf,D as Nf,y as oy,z as ay,A as ly,B as _h,E as Df,G as uy,H as cy,I as ko,J as hy,K as dy,M as fy,N as _y,O as py,P as my}from"./firebase-core-CsWAQJdo.js";var ph=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Gt,kf;(function(){var s;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(v,g){function E(){}E.prototype=g.prototype,v.D=g.prototype,v.prototype=new E,v.prototype.constructor=v,v.C=function(T,w,C){for(var y=Array(arguments.length-2),Et=2;Et<arguments.length;Et++)y[Et-2]=arguments[Et];return g.prototype[w].apply(T,y)}}function t(){this.blockSize=-1}function n(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(n,t),n.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(v,g,E){E||(E=0);var T=Array(16);if(typeof g=="string")for(var w=0;16>w;++w)T[w]=g.charCodeAt(E++)|g.charCodeAt(E++)<<8|g.charCodeAt(E++)<<16|g.charCodeAt(E++)<<24;else for(w=0;16>w;++w)T[w]=g[E++]|g[E++]<<8|g[E++]<<16|g[E++]<<24;g=v.g[0],E=v.g[1],w=v.g[2];var C=v.g[3],y=g+(C^E&(w^C))+T[0]+3614090360&4294967295;g=E+(y<<7&4294967295|y>>>25),y=C+(w^g&(E^w))+T[1]+3905402710&4294967295,C=g+(y<<12&4294967295|y>>>20),y=w+(E^C&(g^E))+T[2]+606105819&4294967295,w=C+(y<<17&4294967295|y>>>15),y=E+(g^w&(C^g))+T[3]+3250441966&4294967295,E=w+(y<<22&4294967295|y>>>10),y=g+(C^E&(w^C))+T[4]+4118548399&4294967295,g=E+(y<<7&4294967295|y>>>25),y=C+(w^g&(E^w))+T[5]+1200080426&4294967295,C=g+(y<<12&4294967295|y>>>20),y=w+(E^C&(g^E))+T[6]+2821735955&4294967295,w=C+(y<<17&4294967295|y>>>15),y=E+(g^w&(C^g))+T[7]+4249261313&4294967295,E=w+(y<<22&4294967295|y>>>10),y=g+(C^E&(w^C))+T[8]+1770035416&4294967295,g=E+(y<<7&4294967295|y>>>25),y=C+(w^g&(E^w))+T[9]+2336552879&4294967295,C=g+(y<<12&4294967295|y>>>20),y=w+(E^C&(g^E))+T[10]+4294925233&4294967295,w=C+(y<<17&4294967295|y>>>15),y=E+(g^w&(C^g))+T[11]+2304563134&4294967295,E=w+(y<<22&4294967295|y>>>10),y=g+(C^E&(w^C))+T[12]+1804603682&4294967295,g=E+(y<<7&4294967295|y>>>25),y=C+(w^g&(E^w))+T[13]+4254626195&4294967295,C=g+(y<<12&4294967295|y>>>20),y=w+(E^C&(g^E))+T[14]+2792965006&4294967295,w=C+(y<<17&4294967295|y>>>15),y=E+(g^w&(C^g))+T[15]+1236535329&4294967295,E=w+(y<<22&4294967295|y>>>10),y=g+(w^C&(E^w))+T[1]+4129170786&4294967295,g=E+(y<<5&4294967295|y>>>27),y=C+(E^w&(g^E))+T[6]+3225465664&4294967295,C=g+(y<<9&4294967295|y>>>23),y=w+(g^E&(C^g))+T[11]+643717713&4294967295,w=C+(y<<14&4294967295|y>>>18),y=E+(C^g&(w^C))+T[0]+3921069994&4294967295,E=w+(y<<20&4294967295|y>>>12),y=g+(w^C&(E^w))+T[5]+3593408605&4294967295,g=E+(y<<5&4294967295|y>>>27),y=C+(E^w&(g^E))+T[10]+38016083&4294967295,C=g+(y<<9&4294967295|y>>>23),y=w+(g^E&(C^g))+T[15]+3634488961&4294967295,w=C+(y<<14&4294967295|y>>>18),y=E+(C^g&(w^C))+T[4]+3889429448&4294967295,E=w+(y<<20&4294967295|y>>>12),y=g+(w^C&(E^w))+T[9]+568446438&4294967295,g=E+(y<<5&4294967295|y>>>27),y=C+(E^w&(g^E))+T[14]+3275163606&4294967295,C=g+(y<<9&4294967295|y>>>23),y=w+(g^E&(C^g))+T[3]+4107603335&4294967295,w=C+(y<<14&4294967295|y>>>18),y=E+(C^g&(w^C))+T[8]+1163531501&4294967295,E=w+(y<<20&4294967295|y>>>12),y=g+(w^C&(E^w))+T[13]+2850285829&4294967295,g=E+(y<<5&4294967295|y>>>27),y=C+(E^w&(g^E))+T[2]+4243563512&4294967295,C=g+(y<<9&4294967295|y>>>23),y=w+(g^E&(C^g))+T[7]+1735328473&4294967295,w=C+(y<<14&4294967295|y>>>18),y=E+(C^g&(w^C))+T[12]+2368359562&4294967295,E=w+(y<<20&4294967295|y>>>12),y=g+(E^w^C)+T[5]+4294588738&4294967295,g=E+(y<<4&4294967295|y>>>28),y=C+(g^E^w)+T[8]+2272392833&4294967295,C=g+(y<<11&4294967295|y>>>21),y=w+(C^g^E)+T[11]+1839030562&4294967295,w=C+(y<<16&4294967295|y>>>16),y=E+(w^C^g)+T[14]+4259657740&4294967295,E=w+(y<<23&4294967295|y>>>9),y=g+(E^w^C)+T[1]+2763975236&4294967295,g=E+(y<<4&4294967295|y>>>28),y=C+(g^E^w)+T[4]+1272893353&4294967295,C=g+(y<<11&4294967295|y>>>21),y=w+(C^g^E)+T[7]+4139469664&4294967295,w=C+(y<<16&4294967295|y>>>16),y=E+(w^C^g)+T[10]+3200236656&4294967295,E=w+(y<<23&4294967295|y>>>9),y=g+(E^w^C)+T[13]+681279174&4294967295,g=E+(y<<4&4294967295|y>>>28),y=C+(g^E^w)+T[0]+3936430074&4294967295,C=g+(y<<11&4294967295|y>>>21),y=w+(C^g^E)+T[3]+3572445317&4294967295,w=C+(y<<16&4294967295|y>>>16),y=E+(w^C^g)+T[6]+76029189&4294967295,E=w+(y<<23&4294967295|y>>>9),y=g+(E^w^C)+T[9]+3654602809&4294967295,g=E+(y<<4&4294967295|y>>>28),y=C+(g^E^w)+T[12]+3873151461&4294967295,C=g+(y<<11&4294967295|y>>>21),y=w+(C^g^E)+T[15]+530742520&4294967295,w=C+(y<<16&4294967295|y>>>16),y=E+(w^C^g)+T[2]+3299628645&4294967295,E=w+(y<<23&4294967295|y>>>9),y=g+(w^(E|~C))+T[0]+4096336452&4294967295,g=E+(y<<6&4294967295|y>>>26),y=C+(E^(g|~w))+T[7]+1126891415&4294967295,C=g+(y<<10&4294967295|y>>>22),y=w+(g^(C|~E))+T[14]+2878612391&4294967295,w=C+(y<<15&4294967295|y>>>17),y=E+(C^(w|~g))+T[5]+4237533241&4294967295,E=w+(y<<21&4294967295|y>>>11),y=g+(w^(E|~C))+T[12]+1700485571&4294967295,g=E+(y<<6&4294967295|y>>>26),y=C+(E^(g|~w))+T[3]+2399980690&4294967295,C=g+(y<<10&4294967295|y>>>22),y=w+(g^(C|~E))+T[10]+4293915773&4294967295,w=C+(y<<15&4294967295|y>>>17),y=E+(C^(w|~g))+T[1]+2240044497&4294967295,E=w+(y<<21&4294967295|y>>>11),y=g+(w^(E|~C))+T[8]+1873313359&4294967295,g=E+(y<<6&4294967295|y>>>26),y=C+(E^(g|~w))+T[15]+4264355552&4294967295,C=g+(y<<10&4294967295|y>>>22),y=w+(g^(C|~E))+T[6]+2734768916&4294967295,w=C+(y<<15&4294967295|y>>>17),y=E+(C^(w|~g))+T[13]+1309151649&4294967295,E=w+(y<<21&4294967295|y>>>11),y=g+(w^(E|~C))+T[4]+4149444226&4294967295,g=E+(y<<6&4294967295|y>>>26),y=C+(E^(g|~w))+T[11]+3174756917&4294967295,C=g+(y<<10&4294967295|y>>>22),y=w+(g^(C|~E))+T[2]+718787259&4294967295,w=C+(y<<15&4294967295|y>>>17),y=E+(C^(w|~g))+T[9]+3951481745&4294967295,v.g[0]=v.g[0]+g&4294967295,v.g[1]=v.g[1]+(w+(y<<21&4294967295|y>>>11))&4294967295,v.g[2]=v.g[2]+w&4294967295,v.g[3]=v.g[3]+C&4294967295}n.prototype.u=function(v,g){g===void 0&&(g=v.length);for(var E=g-this.blockSize,T=this.B,w=this.h,C=0;C<g;){if(w==0)for(;C<=E;)i(this,v,C),C+=this.blockSize;if(typeof v=="string"){for(;C<g;)if(T[w++]=v.charCodeAt(C++),w==this.blockSize){i(this,T),w=0;break}}else for(;C<g;)if(T[w++]=v[C++],w==this.blockSize){i(this,T),w=0;break}}this.h=w,this.o+=g},n.prototype.v=function(){var v=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);v[0]=128;for(var g=1;g<v.length-8;++g)v[g]=0;var E=8*this.o;for(g=v.length-8;g<v.length;++g)v[g]=E&255,E/=256;for(this.u(v),v=Array(16),g=E=0;4>g;++g)for(var T=0;32>T;T+=8)v[E++]=this.g[g]>>>T&255;return v};function r(v,g){var E=l;return Object.prototype.hasOwnProperty.call(E,v)?E[v]:E[v]=g(v)}function o(v,g){this.h=g;for(var E=[],T=!0,w=v.length-1;0<=w;w--){var C=v[w]|0;T&&C==g||(E[w]=C,T=!1)}this.g=E}var l={};function u(v){return-128<=v&&128>v?r(v,function(g){return new o([g|0],0>g?-1:0)}):new o([v|0],0>v?-1:0)}function c(v){if(isNaN(v)||!isFinite(v))return _;if(0>v)return x(c(-v));for(var g=[],E=1,T=0;v>=E;T++)g[T]=v/E|0,E*=4294967296;return new o(g,0)}function f(v,g){if(v.length==0)throw Error("number format error: empty string");if(g=g||10,2>g||36<g)throw Error("radix out of range: "+g);if(v.charAt(0)=="-")return x(f(v.substring(1),g));if(0<=v.indexOf("-"))throw Error('number format error: interior "-" character');for(var E=c(Math.pow(g,8)),T=_,w=0;w<v.length;w+=8){var C=Math.min(8,v.length-w),y=parseInt(v.substring(w,w+C),g);8>C?(C=c(Math.pow(g,C)),T=T.j(C).add(c(y))):(T=T.j(E),T=T.add(c(y)))}return T}var _=u(0),m=u(1),I=u(16777216);s=o.prototype,s.m=function(){if(V(this))return-x(this).m();for(var v=0,g=1,E=0;E<this.g.length;E++){var T=this.i(E);v+=(0<=T?T:4294967296+T)*g,g*=4294967296}return v},s.toString=function(v){if(v=v||10,2>v||36<v)throw Error("radix out of range: "+v);if(S(this))return"0";if(V(this))return"-"+x(this).toString(v);for(var g=c(Math.pow(v,6)),E=this,T="";;){var w=J(E,g).g;E=K(E,w.j(g));var C=((0<E.g.length?E.g[0]:E.h)>>>0).toString(v);if(E=w,S(E))return C+T;for(;6>C.length;)C="0"+C;T=C+T}},s.i=function(v){return 0>v?0:v<this.g.length?this.g[v]:this.h};function S(v){if(v.h!=0)return!1;for(var g=0;g<v.g.length;g++)if(v.g[g]!=0)return!1;return!0}function V(v){return v.h==-1}s.l=function(v){return v=K(this,v),V(v)?-1:S(v)?0:1};function x(v){for(var g=v.g.length,E=[],T=0;T<g;T++)E[T]=~v.g[T];return new o(E,~v.h).add(m)}s.abs=function(){return V(this)?x(this):this},s.add=function(v){for(var g=Math.max(this.g.length,v.g.length),E=[],T=0,w=0;w<=g;w++){var C=T+(this.i(w)&65535)+(v.i(w)&65535),y=(C>>>16)+(this.i(w)>>>16)+(v.i(w)>>>16);T=y>>>16,C&=65535,y&=65535,E[w]=y<<16|C}return new o(E,E[E.length-1]&-2147483648?-1:0)};function K(v,g){return v.add(x(g))}s.j=function(v){if(S(this)||S(v))return _;if(V(this))return V(v)?x(this).j(x(v)):x(x(this).j(v));if(V(v))return x(this.j(x(v)));if(0>this.l(I)&&0>v.l(I))return c(this.m()*v.m());for(var g=this.g.length+v.g.length,E=[],T=0;T<2*g;T++)E[T]=0;for(T=0;T<this.g.length;T++)for(var w=0;w<v.g.length;w++){var C=this.i(T)>>>16,y=this.i(T)&65535,Et=v.i(w)>>>16,Us=v.i(w)&65535;E[2*T+2*w]+=y*Us,j(E,2*T+2*w),E[2*T+2*w+1]+=C*Us,j(E,2*T+2*w+1),E[2*T+2*w+1]+=y*Et,j(E,2*T+2*w+1),E[2*T+2*w+2]+=C*Et,j(E,2*T+2*w+2)}for(T=0;T<g;T++)E[T]=E[2*T+1]<<16|E[2*T];for(T=g;T<2*g;T++)E[T]=0;return new o(E,0)};function j(v,g){for(;(v[g]&65535)!=v[g];)v[g+1]+=v[g]>>>16,v[g]&=65535,g++}function B(v,g){this.g=v,this.h=g}function J(v,g){if(S(g))throw Error("division by zero");if(S(v))return new B(_,_);if(V(v))return g=J(x(v),g),new B(x(g.g),x(g.h));if(V(g))return g=J(v,x(g)),new B(x(g.g),g.h);if(30<v.g.length){if(V(v)||V(g))throw Error("slowDivide_ only works with positive integers.");for(var E=m,T=g;0>=T.l(v);)E=le(E),T=le(T);var w=Z(E,1),C=Z(T,1);for(T=Z(T,2),E=Z(E,2);!S(T);){var y=C.add(T);0>=y.l(v)&&(w=w.add(E),C=y),T=Z(T,1),E=Z(E,1)}return g=K(v,w.j(g)),new B(w,g)}for(w=_;0<=v.l(g);){for(E=Math.max(1,Math.floor(v.m()/g.m())),T=Math.ceil(Math.log(E)/Math.LN2),T=48>=T?1:Math.pow(2,T-48),C=c(E),y=C.j(g);V(y)||0<y.l(v);)E-=T,C=c(E),y=C.j(g);S(C)&&(C=m),w=w.add(C),v=K(v,y)}return new B(w,v)}s.A=function(v){return J(this,v).h},s.and=function(v){for(var g=Math.max(this.g.length,v.g.length),E=[],T=0;T<g;T++)E[T]=this.i(T)&v.i(T);return new o(E,this.h&v.h)},s.or=function(v){for(var g=Math.max(this.g.length,v.g.length),E=[],T=0;T<g;T++)E[T]=this.i(T)|v.i(T);return new o(E,this.h|v.h)},s.xor=function(v){for(var g=Math.max(this.g.length,v.g.length),E=[],T=0;T<g;T++)E[T]=this.i(T)^v.i(T);return new o(E,this.h^v.h)};function le(v){for(var g=v.g.length+1,E=[],T=0;T<g;T++)E[T]=v.i(T)<<1|v.i(T-1)>>>31;return new o(E,v.h)}function Z(v,g){var E=g>>5;g%=32;for(var T=v.g.length-E,w=[],C=0;C<T;C++)w[C]=0<g?v.i(C+E)>>>g|v.i(C+E+1)<<32-g:v.i(C+E);return new o(w,v.h)}n.prototype.digest=n.prototype.v,n.prototype.reset=n.prototype.s,n.prototype.update=n.prototype.u,kf=n,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=c,o.fromString=f,Gt=o}).apply(typeof ph<"u"?ph:typeof self<"u"?self:typeof window<"u"?window:{});var br=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Of,hi,Mf,Lr,el,Ff,Lf,Uf;(function(){var s,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,h,d){return a==Array.prototype||a==Object.prototype||(a[h]=d.value),a};function t(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof br=="object"&&br];for(var h=0;h<a.length;++h){var d=a[h];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var n=t(this);function i(a,h){if(h)e:{var d=n;a=a.split(".");for(var p=0;p<a.length-1;p++){var R=a[p];if(!(R in d))break e;d=d[R]}a=a[a.length-1],p=d[a],h=h(p),h!=p&&h!=null&&e(d,a,{configurable:!0,writable:!0,value:h})}}function r(a,h){a instanceof String&&(a+="");var d=0,p=!1,R={next:function(){if(!p&&d<a.length){var P=d++;return{value:h(P,a[P]),done:!1}}return p=!0,{done:!0,value:void 0}}};return R[Symbol.iterator]=function(){return R},R}i("Array.prototype.values",function(a){return a||function(){return r(this,function(h,d){return d})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},l=this||self;function u(a){var h=typeof a;return h=h!="object"?h:a?Array.isArray(a)?"array":h:"null",h=="array"||h=="object"&&typeof a.length=="number"}function c(a){var h=typeof a;return h=="object"&&a!=null||h=="function"}function f(a,h,d){return a.call.apply(a.bind,arguments)}function _(a,h,d){if(!a)throw Error();if(2<arguments.length){var p=Array.prototype.slice.call(arguments,2);return function(){var R=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(R,p),a.apply(h,R)}}return function(){return a.apply(h,arguments)}}function m(a,h,d){return m=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?f:_,m.apply(null,arguments)}function I(a,h){var d=Array.prototype.slice.call(arguments,1);return function(){var p=d.slice();return p.push.apply(p,arguments),a.apply(this,p)}}function S(a,h){function d(){}d.prototype=h.prototype,a.aa=h.prototype,a.prototype=new d,a.prototype.constructor=a,a.Qb=function(p,R,P){for(var O=Array(arguments.length-2),oe=2;oe<arguments.length;oe++)O[oe-2]=arguments[oe];return h.prototype[R].apply(p,O)}}function V(a){const h=a.length;if(0<h){const d=Array(h);for(let p=0;p<h;p++)d[p]=a[p];return d}return[]}function x(a,h){for(let d=1;d<arguments.length;d++){const p=arguments[d];if(u(p)){const R=a.length||0,P=p.length||0;a.length=R+P;for(let O=0;O<P;O++)a[R+O]=p[O]}else a.push(p)}}class K{constructor(h,d){this.i=h,this.j=d,this.h=0,this.g=null}get(){let h;return 0<this.h?(this.h--,h=this.g,this.g=h.next,h.next=null):h=this.i(),h}}function j(a){return/^[\s\xa0]*$/.test(a)}function B(){var a=l.navigator;return a&&(a=a.userAgent)?a:""}function J(a){return J[" "](a),a}J[" "]=function(){};var le=B().indexOf("Gecko")!=-1&&!(B().toLowerCase().indexOf("webkit")!=-1&&B().indexOf("Edge")==-1)&&!(B().indexOf("Trident")!=-1||B().indexOf("MSIE")!=-1)&&B().indexOf("Edge")==-1;function Z(a,h,d){for(const p in a)h.call(d,a[p],p,a)}function v(a,h){for(const d in a)h.call(void 0,a[d],d,a)}function g(a){const h={};for(const d in a)h[d]=a[d];return h}const E="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function T(a,h){let d,p;for(let R=1;R<arguments.length;R++){p=arguments[R];for(d in p)a[d]=p[d];for(let P=0;P<E.length;P++)d=E[P],Object.prototype.hasOwnProperty.call(p,d)&&(a[d]=p[d])}}function w(a){var h=1;a=a.split(":");const d=[];for(;0<h&&a.length;)d.push(a.shift()),h--;return a.length&&d.push(a.join(":")),d}function C(a){l.setTimeout(()=>{throw a},0)}function y(){var a=pa;let h=null;return a.g&&(h=a.g,a.g=a.g.next,a.g||(a.h=null),h.next=null),h}class Et{constructor(){this.h=this.g=null}add(h,d){const p=Us.get();p.set(h,d),this.h?this.h.next=p:this.g=p,this.h=p}}var Us=new K(()=>new Eg,a=>a.reset());class Eg{constructor(){this.next=this.g=this.h=null}set(h,d){this.h=h,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let Bs,qs=!1,pa=new Et,_c=()=>{const a=l.Promise.resolve(void 0);Bs=()=>{a.then(Ig)}};var Ig=()=>{for(var a;a=y();){try{a.h.call(a.g)}catch(d){C(d)}var h=Us;h.j(a),100>h.h&&(h.h++,a.next=h.g,h.g=a)}qs=!1};function kt(){this.s=this.s,this.C=this.C}kt.prototype.s=!1,kt.prototype.ma=function(){this.s||(this.s=!0,this.N())},kt.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function Ve(a,h){this.type=a,this.g=this.target=h,this.defaultPrevented=!1}Ve.prototype.h=function(){this.defaultPrevented=!0};var vg=function(){if(!l.addEventListener||!Object.defineProperty)return!1;var a=!1,h=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const d=()=>{};l.addEventListener("test",d,h),l.removeEventListener("test",d,h)}catch{}return a}();function js(a,h){if(Ve.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a){var d=this.type=a.type,p=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;if(this.target=a.target||a.srcElement,this.g=h,h=a.relatedTarget){if(le){e:{try{J(h.nodeName);var R=!0;break e}catch{}R=!1}R||(h=null)}}else d=="mouseover"?h=a.fromElement:d=="mouseout"&&(h=a.toElement);this.relatedTarget=h,p?(this.clientX=p.clientX!==void 0?p.clientX:p.pageX,this.clientY=p.clientY!==void 0?p.clientY:p.pageY,this.screenX=p.screenX||0,this.screenY=p.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=typeof a.pointerType=="string"?a.pointerType:Tg[a.pointerType]||"",this.state=a.state,this.i=a,a.defaultPrevented&&js.aa.h.call(this)}}S(js,Ve);var Tg={2:"touch",3:"pen",4:"mouse"};js.prototype.h=function(){js.aa.h.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var cr="closure_listenable_"+(1e6*Math.random()|0),wg=0;function Ag(a,h,d,p,R){this.listener=a,this.proxy=null,this.src=h,this.type=d,this.capture=!!p,this.ha=R,this.key=++wg,this.da=this.fa=!1}function hr(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function dr(a){this.src=a,this.g={},this.h=0}dr.prototype.add=function(a,h,d,p,R){var P=a.toString();a=this.g[P],a||(a=this.g[P]=[],this.h++);var O=ga(a,h,p,R);return-1<O?(h=a[O],d||(h.fa=!1)):(h=new Ag(h,this.src,P,!!p,R),h.fa=d,a.push(h)),h};function ma(a,h){var d=h.type;if(d in a.g){var p=a.g[d],R=Array.prototype.indexOf.call(p,h,void 0),P;(P=0<=R)&&Array.prototype.splice.call(p,R,1),P&&(hr(h),a.g[d].length==0&&(delete a.g[d],a.h--))}}function ga(a,h,d,p){for(var R=0;R<a.length;++R){var P=a[R];if(!P.da&&P.listener==h&&P.capture==!!d&&P.ha==p)return R}return-1}var ya="closure_lm_"+(1e6*Math.random()|0),Ea={};function pc(a,h,d,p,R){if(Array.isArray(h)){for(var P=0;P<h.length;P++)pc(a,h[P],d,p,R);return null}return d=yc(d),a&&a[cr]?a.K(h,d,c(p)?!!p.capture:!1,R):Rg(a,h,d,!1,p,R)}function Rg(a,h,d,p,R,P){if(!h)throw Error("Invalid event type");var O=c(R)?!!R.capture:!!R,oe=va(a);if(oe||(a[ya]=oe=new dr(a)),d=oe.add(h,d,p,O,P),d.proxy)return d;if(p=Cg(),d.proxy=p,p.src=a,p.listener=d,a.addEventListener)vg||(R=O),R===void 0&&(R=!1),a.addEventListener(h.toString(),p,R);else if(a.attachEvent)a.attachEvent(gc(h.toString()),p);else if(a.addListener&&a.removeListener)a.addListener(p);else throw Error("addEventListener and attachEvent are unavailable.");return d}function Cg(){function a(d){return h.call(a.src,a.listener,d)}const h=Sg;return a}function mc(a,h,d,p,R){if(Array.isArray(h))for(var P=0;P<h.length;P++)mc(a,h[P],d,p,R);else p=c(p)?!!p.capture:!!p,d=yc(d),a&&a[cr]?(a=a.i,h=String(h).toString(),h in a.g&&(P=a.g[h],d=ga(P,d,p,R),-1<d&&(hr(P[d]),Array.prototype.splice.call(P,d,1),P.length==0&&(delete a.g[h],a.h--)))):a&&(a=va(a))&&(h=a.g[h.toString()],a=-1,h&&(a=ga(h,d,p,R)),(d=-1<a?h[a]:null)&&Ia(d))}function Ia(a){if(typeof a!="number"&&a&&!a.da){var h=a.src;if(h&&h[cr])ma(h.i,a);else{var d=a.type,p=a.proxy;h.removeEventListener?h.removeEventListener(d,p,a.capture):h.detachEvent?h.detachEvent(gc(d),p):h.addListener&&h.removeListener&&h.removeListener(p),(d=va(h))?(ma(d,a),d.h==0&&(d.src=null,h[ya]=null)):hr(a)}}}function gc(a){return a in Ea?Ea[a]:Ea[a]="on"+a}function Sg(a,h){if(a.da)a=!0;else{h=new js(h,this);var d=a.listener,p=a.ha||a.src;a.fa&&Ia(a),a=d.call(p,h)}return a}function va(a){return a=a[ya],a instanceof dr?a:null}var Ta="__closure_events_fn_"+(1e9*Math.random()>>>0);function yc(a){return typeof a=="function"?a:(a[Ta]||(a[Ta]=function(h){return a.handleEvent(h)}),a[Ta])}function xe(){kt.call(this),this.i=new dr(this),this.M=this,this.F=null}S(xe,kt),xe.prototype[cr]=!0,xe.prototype.removeEventListener=function(a,h,d,p){mc(this,a,h,d,p)};function je(a,h){var d,p=a.F;if(p)for(d=[];p;p=p.F)d.push(p);if(a=a.M,p=h.type||h,typeof h=="string")h=new Ve(h,a);else if(h instanceof Ve)h.target=h.target||a;else{var R=h;h=new Ve(p,a),T(h,R)}if(R=!0,d)for(var P=d.length-1;0<=P;P--){var O=h.g=d[P];R=fr(O,p,!0,h)&&R}if(O=h.g=a,R=fr(O,p,!0,h)&&R,R=fr(O,p,!1,h)&&R,d)for(P=0;P<d.length;P++)O=h.g=d[P],R=fr(O,p,!1,h)&&R}xe.prototype.N=function(){if(xe.aa.N.call(this),this.i){var a=this.i,h;for(h in a.g){for(var d=a.g[h],p=0;p<d.length;p++)hr(d[p]);delete a.g[h],a.h--}}this.F=null},xe.prototype.K=function(a,h,d,p){return this.i.add(String(a),h,!1,d,p)},xe.prototype.L=function(a,h,d,p){return this.i.add(String(a),h,!0,d,p)};function fr(a,h,d,p){if(h=a.i.g[String(h)],!h)return!0;h=h.concat();for(var R=!0,P=0;P<h.length;++P){var O=h[P];if(O&&!O.da&&O.capture==d){var oe=O.listener,be=O.ha||O.src;O.fa&&ma(a.i,O),R=oe.call(be,p)!==!1&&R}}return R&&!p.defaultPrevented}function Ec(a,h,d){if(typeof a=="function")d&&(a=m(a,d));else if(a&&typeof a.handleEvent=="function")a=m(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(h)?-1:l.setTimeout(a,h||0)}function Ic(a){a.g=Ec(()=>{a.g=null,a.i&&(a.i=!1,Ic(a))},a.l);const h=a.h;a.h=null,a.m.apply(null,h)}class Pg extends kt{constructor(h,d){super(),this.m=h,this.l=d,this.h=null,this.i=!1,this.g=null}j(h){this.h=arguments,this.g?this.i=!0:Ic(this)}N(){super.N(),this.g&&(l.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function Gs(a){kt.call(this),this.h=a,this.g={}}S(Gs,kt);var vc=[];function Tc(a){Z(a.g,function(h,d){this.g.hasOwnProperty(d)&&Ia(h)},a),a.g={}}Gs.prototype.N=function(){Gs.aa.N.call(this),Tc(this)},Gs.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var wa=l.JSON.stringify,bg=l.JSON.parse,Vg=class{stringify(a){return l.JSON.stringify(a,void 0)}parse(a){return l.JSON.parse(a,void 0)}};function Aa(){}Aa.prototype.h=null;function wc(a){return a.h||(a.h=a.i())}function Ac(){}var zs={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Ra(){Ve.call(this,"d")}S(Ra,Ve);function Ca(){Ve.call(this,"c")}S(Ca,Ve);var ln={},Rc=null;function _r(){return Rc=Rc||new xe}ln.La="serverreachability";function Cc(a){Ve.call(this,ln.La,a)}S(Cc,Ve);function Ks(a){const h=_r();je(h,new Cc(h))}ln.STAT_EVENT="statevent";function Sc(a,h){Ve.call(this,ln.STAT_EVENT,a),this.stat=h}S(Sc,Ve);function Ge(a){const h=_r();je(h,new Sc(h,a))}ln.Ma="timingevent";function Pc(a,h){Ve.call(this,ln.Ma,a),this.size=h}S(Pc,Ve);function Ws(a,h){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){a()},h)}function $s(){this.g=!0}$s.prototype.xa=function(){this.g=!1};function xg(a,h,d,p,R,P){a.info(function(){if(a.g)if(P)for(var O="",oe=P.split("&"),be=0;be<oe.length;be++){var ee=oe[be].split("=");if(1<ee.length){var Ne=ee[0];ee=ee[1];var De=Ne.split("_");O=2<=De.length&&De[1]=="type"?O+(Ne+"="+ee+"&"):O+(Ne+"=redacted&")}}else O=null;else O=P;return"XMLHTTP REQ ("+p+") [attempt "+R+"]: "+h+`
`+d+`
`+O})}function Ng(a,h,d,p,R,P,O){a.info(function(){return"XMLHTTP RESP ("+p+") [ attempt "+R+"]: "+h+`
`+d+`
`+P+" "+O})}function qn(a,h,d,p){a.info(function(){return"XMLHTTP TEXT ("+h+"): "+kg(a,d)+(p?" "+p:"")})}function Dg(a,h){a.info(function(){return"TIMEOUT: "+h})}$s.prototype.info=function(){};function kg(a,h){if(!a.g)return h;if(!h)return null;try{var d=JSON.parse(h);if(d){for(a=0;a<d.length;a++)if(Array.isArray(d[a])){var p=d[a];if(!(2>p.length)){var R=p[1];if(Array.isArray(R)&&!(1>R.length)){var P=R[0];if(P!="noop"&&P!="stop"&&P!="close")for(var O=1;O<R.length;O++)R[O]=""}}}}return wa(d)}catch{return h}}var pr={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},bc={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Sa;function mr(){}S(mr,Aa),mr.prototype.g=function(){return new XMLHttpRequest},mr.prototype.i=function(){return{}},Sa=new mr;function Ot(a,h,d,p){this.j=a,this.i=h,this.l=d,this.R=p||1,this.U=new Gs(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Vc}function Vc(){this.i=null,this.g="",this.h=!1}var xc={},Pa={};function ba(a,h,d){a.L=1,a.v=Ir(It(h)),a.m=d,a.P=!0,Nc(a,null)}function Nc(a,h){a.F=Date.now(),gr(a),a.A=It(a.v);var d=a.A,p=a.R;Array.isArray(p)||(p=[String(p)]),Wc(d.i,"t",p),a.C=0,d=a.j.J,a.h=new Vc,a.g=ch(a.j,d?h:null,!a.m),0<a.O&&(a.M=new Pg(m(a.Y,a,a.g),a.O)),h=a.U,d=a.g,p=a.ca;var R="readystatechange";Array.isArray(R)||(R&&(vc[0]=R.toString()),R=vc);for(var P=0;P<R.length;P++){var O=pc(d,R[P],p||h.handleEvent,!1,h.h||h);if(!O)break;h.g[O.key]=O}h=a.H?g(a.H):{},a.m?(a.u||(a.u="POST"),h["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.A,a.u,a.m,h)):(a.u="GET",a.g.ea(a.A,a.u,null,h)),Ks(),xg(a.i,a.u,a.A,a.l,a.R,a.m)}Ot.prototype.ca=function(a){a=a.target;const h=this.M;h&&vt(a)==3?h.j():this.Y(a)},Ot.prototype.Y=function(a){try{if(a==this.g)e:{const De=vt(this.g);var h=this.g.Ba();const zn=this.g.Z();if(!(3>De)&&(De!=3||this.g&&(this.h.h||this.g.oa()||Zc(this.g)))){this.J||De!=4||h==7||(h==8||0>=zn?Ks(3):Ks(2)),Va(this);var d=this.g.Z();this.X=d;t:if(Dc(this)){var p=Zc(this.g);a="";var R=p.length,P=vt(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){un(this),Qs(this);var O="";break t}this.h.i=new l.TextDecoder}for(h=0;h<R;h++)this.h.h=!0,a+=this.h.i.decode(p[h],{stream:!(P&&h==R-1)});p.length=0,this.h.g+=a,this.C=0,O=this.h.g}else O=this.g.oa();if(this.o=d==200,Ng(this.i,this.u,this.A,this.l,this.R,De,d),this.o){if(this.T&&!this.K){t:{if(this.g){var oe,be=this.g;if((oe=be.g?be.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!j(oe)){var ee=oe;break t}}ee=null}if(d=ee)qn(this.i,this.l,d,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,xa(this,d);else{this.o=!1,this.s=3,Ge(12),un(this),Qs(this);break e}}if(this.P){d=!0;let it;for(;!this.J&&this.C<O.length;)if(it=Og(this,O),it==Pa){De==4&&(this.s=4,Ge(14),d=!1),qn(this.i,this.l,null,"[Incomplete Response]");break}else if(it==xc){this.s=4,Ge(15),qn(this.i,this.l,O,"[Invalid Chunk]"),d=!1;break}else qn(this.i,this.l,it,null),xa(this,it);if(Dc(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),De!=4||O.length!=0||this.h.h||(this.s=1,Ge(16),d=!1),this.o=this.o&&d,!d)qn(this.i,this.l,O,"[Invalid Chunked Response]"),un(this),Qs(this);else if(0<O.length&&!this.W){this.W=!0;var Ne=this.j;Ne.g==this&&Ne.ba&&!Ne.M&&(Ne.j.info("Great, no buffering proxy detected. Bytes received: "+O.length),Fa(Ne),Ne.M=!0,Ge(11))}}else qn(this.i,this.l,O,null),xa(this,O);De==4&&un(this),this.o&&!this.J&&(De==4?oh(this.j,this):(this.o=!1,gr(this)))}else Jg(this.g),d==400&&0<O.indexOf("Unknown SID")?(this.s=3,Ge(12)):(this.s=0,Ge(13)),un(this),Qs(this)}}}catch{}finally{}};function Dc(a){return a.g?a.u=="GET"&&a.L!=2&&a.j.Ca:!1}function Og(a,h){var d=a.C,p=h.indexOf(`
`,d);return p==-1?Pa:(d=Number(h.substring(d,p)),isNaN(d)?xc:(p+=1,p+d>h.length?Pa:(h=h.slice(p,p+d),a.C=p+d,h)))}Ot.prototype.cancel=function(){this.J=!0,un(this)};function gr(a){a.S=Date.now()+a.I,kc(a,a.I)}function kc(a,h){if(a.B!=null)throw Error("WatchDog timer not null");a.B=Ws(m(a.ba,a),h)}function Va(a){a.B&&(l.clearTimeout(a.B),a.B=null)}Ot.prototype.ba=function(){this.B=null;const a=Date.now();0<=a-this.S?(Dg(this.i,this.A),this.L!=2&&(Ks(),Ge(17)),un(this),this.s=2,Qs(this)):kc(this,this.S-a)};function Qs(a){a.j.G==0||a.J||oh(a.j,a)}function un(a){Va(a);var h=a.M;h&&typeof h.ma=="function"&&h.ma(),a.M=null,Tc(a.U),a.g&&(h=a.g,a.g=null,h.abort(),h.ma())}function xa(a,h){try{var d=a.j;if(d.G!=0&&(d.g==a||Na(d.h,a))){if(!a.K&&Na(d.h,a)&&d.G==3){try{var p=d.Da.g.parse(h)}catch{p=null}if(Array.isArray(p)&&p.length==3){var R=p;if(R[0]==0){e:if(!d.u){if(d.g)if(d.g.F+3e3<a.F)Cr(d),Ar(d);else break e;Ma(d),Ge(18)}}else d.za=R[1],0<d.za-d.T&&37500>R[2]&&d.F&&d.v==0&&!d.C&&(d.C=Ws(m(d.Za,d),6e3));if(1>=Fc(d.h)&&d.ca){try{d.ca()}catch{}d.ca=void 0}}else hn(d,11)}else if((a.K||d.g==a)&&Cr(d),!j(h))for(R=d.Da.g.parse(h),h=0;h<R.length;h++){let ee=R[h];if(d.T=ee[0],ee=ee[1],d.G==2)if(ee[0]=="c"){d.K=ee[1],d.ia=ee[2];const Ne=ee[3];Ne!=null&&(d.la=Ne,d.j.info("VER="+d.la));const De=ee[4];De!=null&&(d.Aa=De,d.j.info("SVER="+d.Aa));const zn=ee[5];zn!=null&&typeof zn=="number"&&0<zn&&(p=1.5*zn,d.L=p,d.j.info("backChannelRequestTimeoutMs_="+p)),p=d;const it=a.g;if(it){const Pr=it.g?it.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Pr){var P=p.h;P.g||Pr.indexOf("spdy")==-1&&Pr.indexOf("quic")==-1&&Pr.indexOf("h2")==-1||(P.j=P.l,P.g=new Set,P.h&&(Da(P,P.h),P.h=null))}if(p.D){const La=it.g?it.g.getResponseHeader("X-HTTP-Session-Id"):null;La&&(p.ya=La,ce(p.I,p.D,La))}}d.G=3,d.l&&d.l.ua(),d.ba&&(d.R=Date.now()-a.F,d.j.info("Handshake RTT: "+d.R+"ms")),p=d;var O=a;if(p.qa=uh(p,p.J?p.ia:null,p.W),O.K){Lc(p.h,O);var oe=O,be=p.L;be&&(oe.I=be),oe.B&&(Va(oe),gr(oe)),p.g=O}else ih(p);0<d.i.length&&Rr(d)}else ee[0]!="stop"&&ee[0]!="close"||hn(d,7);else d.G==3&&(ee[0]=="stop"||ee[0]=="close"?ee[0]=="stop"?hn(d,7):Oa(d):ee[0]!="noop"&&d.l&&d.l.ta(ee),d.v=0)}}Ks(4)}catch{}}var Mg=class{constructor(a,h){this.g=a,this.map=h}};function Oc(a){this.l=a||10,l.PerformanceNavigationTiming?(a=l.performance.getEntriesByType("navigation"),a=0<a.length&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(l.chrome&&l.chrome.loadTimes&&l.chrome.loadTimes()&&l.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function Mc(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function Fc(a){return a.h?1:a.g?a.g.size:0}function Na(a,h){return a.h?a.h==h:a.g?a.g.has(h):!1}function Da(a,h){a.g?a.g.add(h):a.h=h}function Lc(a,h){a.h&&a.h==h?a.h=null:a.g&&a.g.has(h)&&a.g.delete(h)}Oc.prototype.cancel=function(){if(this.i=Uc(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function Uc(a){if(a.h!=null)return a.i.concat(a.h.D);if(a.g!=null&&a.g.size!==0){let h=a.i;for(const d of a.g.values())h=h.concat(d.D);return h}return V(a.i)}function Fg(a){if(a.V&&typeof a.V=="function")return a.V();if(typeof Map<"u"&&a instanceof Map||typeof Set<"u"&&a instanceof Set)return Array.from(a.values());if(typeof a=="string")return a.split("");if(u(a)){for(var h=[],d=a.length,p=0;p<d;p++)h.push(a[p]);return h}h=[],d=0;for(p in a)h[d++]=a[p];return h}function Lg(a){if(a.na&&typeof a.na=="function")return a.na();if(!a.V||typeof a.V!="function"){if(typeof Map<"u"&&a instanceof Map)return Array.from(a.keys());if(!(typeof Set<"u"&&a instanceof Set)){if(u(a)||typeof a=="string"){var h=[];a=a.length;for(var d=0;d<a;d++)h.push(d);return h}h=[],d=0;for(const p in a)h[d++]=p;return h}}}function Bc(a,h){if(a.forEach&&typeof a.forEach=="function")a.forEach(h,void 0);else if(u(a)||typeof a=="string")Array.prototype.forEach.call(a,h,void 0);else for(var d=Lg(a),p=Fg(a),R=p.length,P=0;P<R;P++)h.call(void 0,p[P],d&&d[P],a)}var qc=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Ug(a,h){if(a){a=a.split("&");for(var d=0;d<a.length;d++){var p=a[d].indexOf("="),R=null;if(0<=p){var P=a[d].substring(0,p);R=a[d].substring(p+1)}else P=a[d];h(P,R?decodeURIComponent(R.replace(/\+/g," ")):"")}}}function cn(a){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,a instanceof cn){this.h=a.h,yr(this,a.j),this.o=a.o,this.g=a.g,Er(this,a.s),this.l=a.l;var h=a.i,d=new Xs;d.i=h.i,h.g&&(d.g=new Map(h.g),d.h=h.h),jc(this,d),this.m=a.m}else a&&(h=String(a).match(qc))?(this.h=!1,yr(this,h[1]||"",!0),this.o=Hs(h[2]||""),this.g=Hs(h[3]||"",!0),Er(this,h[4]),this.l=Hs(h[5]||"",!0),jc(this,h[6]||"",!0),this.m=Hs(h[7]||"")):(this.h=!1,this.i=new Xs(null,this.h))}cn.prototype.toString=function(){var a=[],h=this.j;h&&a.push(Ys(h,Gc,!0),":");var d=this.g;return(d||h=="file")&&(a.push("//"),(h=this.o)&&a.push(Ys(h,Gc,!0),"@"),a.push(encodeURIComponent(String(d)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.s,d!=null&&a.push(":",String(d))),(d=this.l)&&(this.g&&d.charAt(0)!="/"&&a.push("/"),a.push(Ys(d,d.charAt(0)=="/"?jg:qg,!0))),(d=this.i.toString())&&a.push("?",d),(d=this.m)&&a.push("#",Ys(d,zg)),a.join("")};function It(a){return new cn(a)}function yr(a,h,d){a.j=d?Hs(h,!0):h,a.j&&(a.j=a.j.replace(/:$/,""))}function Er(a,h){if(h){if(h=Number(h),isNaN(h)||0>h)throw Error("Bad port number "+h);a.s=h}else a.s=null}function jc(a,h,d){h instanceof Xs?(a.i=h,Kg(a.i,a.h)):(d||(h=Ys(h,Gg)),a.i=new Xs(h,a.h))}function ce(a,h,d){a.i.set(h,d)}function Ir(a){return ce(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),a}function Hs(a,h){return a?h?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function Ys(a,h,d){return typeof a=="string"?(a=encodeURI(a).replace(h,Bg),d&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function Bg(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var Gc=/[#\/\?@]/g,qg=/[#\?:]/g,jg=/[#\?]/g,Gg=/[#\?@]/g,zg=/#/g;function Xs(a,h){this.h=this.g=null,this.i=a||null,this.j=!!h}function Mt(a){a.g||(a.g=new Map,a.h=0,a.i&&Ug(a.i,function(h,d){a.add(decodeURIComponent(h.replace(/\+/g," ")),d)}))}s=Xs.prototype,s.add=function(a,h){Mt(this),this.i=null,a=jn(this,a);var d=this.g.get(a);return d||this.g.set(a,d=[]),d.push(h),this.h+=1,this};function zc(a,h){Mt(a),h=jn(a,h),a.g.has(h)&&(a.i=null,a.h-=a.g.get(h).length,a.g.delete(h))}function Kc(a,h){return Mt(a),h=jn(a,h),a.g.has(h)}s.forEach=function(a,h){Mt(this),this.g.forEach(function(d,p){d.forEach(function(R){a.call(h,R,p,this)},this)},this)},s.na=function(){Mt(this);const a=Array.from(this.g.values()),h=Array.from(this.g.keys()),d=[];for(let p=0;p<h.length;p++){const R=a[p];for(let P=0;P<R.length;P++)d.push(h[p])}return d},s.V=function(a){Mt(this);let h=[];if(typeof a=="string")Kc(this,a)&&(h=h.concat(this.g.get(jn(this,a))));else{a=Array.from(this.g.values());for(let d=0;d<a.length;d++)h=h.concat(a[d])}return h},s.set=function(a,h){return Mt(this),this.i=null,a=jn(this,a),Kc(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[h]),this.h+=1,this},s.get=function(a,h){return a?(a=this.V(a),0<a.length?String(a[0]):h):h};function Wc(a,h,d){zc(a,h),0<d.length&&(a.i=null,a.g.set(jn(a,h),V(d)),a.h+=d.length)}s.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],h=Array.from(this.g.keys());for(var d=0;d<h.length;d++){var p=h[d];const P=encodeURIComponent(String(p)),O=this.V(p);for(p=0;p<O.length;p++){var R=P;O[p]!==""&&(R+="="+encodeURIComponent(String(O[p]))),a.push(R)}}return this.i=a.join("&")};function jn(a,h){return h=String(h),a.j&&(h=h.toLowerCase()),h}function Kg(a,h){h&&!a.j&&(Mt(a),a.i=null,a.g.forEach(function(d,p){var R=p.toLowerCase();p!=R&&(zc(this,p),Wc(this,R,d))},a)),a.j=h}function Wg(a,h){const d=new $s;if(l.Image){const p=new Image;p.onload=I(Ft,d,"TestLoadImage: loaded",!0,h,p),p.onerror=I(Ft,d,"TestLoadImage: error",!1,h,p),p.onabort=I(Ft,d,"TestLoadImage: abort",!1,h,p),p.ontimeout=I(Ft,d,"TestLoadImage: timeout",!1,h,p),l.setTimeout(function(){p.ontimeout&&p.ontimeout()},1e4),p.src=a}else h(!1)}function $g(a,h){const d=new $s,p=new AbortController,R=setTimeout(()=>{p.abort(),Ft(d,"TestPingServer: timeout",!1,h)},1e4);fetch(a,{signal:p.signal}).then(P=>{clearTimeout(R),P.ok?Ft(d,"TestPingServer: ok",!0,h):Ft(d,"TestPingServer: server error",!1,h)}).catch(()=>{clearTimeout(R),Ft(d,"TestPingServer: error",!1,h)})}function Ft(a,h,d,p,R){try{R&&(R.onload=null,R.onerror=null,R.onabort=null,R.ontimeout=null),p(d)}catch{}}function Qg(){this.g=new Vg}function Hg(a,h,d){const p=d||"";try{Bc(a,function(R,P){let O=R;c(R)&&(O=wa(R)),h.push(p+P+"="+encodeURIComponent(O))})}catch(R){throw h.push(p+"type="+encodeURIComponent("_badmap")),R}}function vr(a){this.l=a.Ub||null,this.j=a.eb||!1}S(vr,Aa),vr.prototype.g=function(){return new Tr(this.l,this.j)},vr.prototype.i=function(a){return function(){return a}}({});function Tr(a,h){xe.call(this),this.D=a,this.o=h,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}S(Tr,xe),s=Tr.prototype,s.open=function(a,h){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=a,this.A=h,this.readyState=1,Zs(this)},s.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const h={headers:this.u,method:this.B,credentials:this.m,cache:void 0};a&&(h.body=a),(this.D||l).fetch(new Request(this.A,h)).then(this.Sa.bind(this),this.ga.bind(this))},s.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Js(this)),this.readyState=0},s.Sa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,Zs(this)),this.g&&(this.readyState=3,Zs(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof l.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;$c(this)}else a.text().then(this.Ra.bind(this),this.ga.bind(this))};function $c(a){a.j.read().then(a.Pa.bind(a)).catch(a.ga.bind(a))}s.Pa=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var h=a.value?a.value:new Uint8Array(0);(h=this.v.decode(h,{stream:!a.done}))&&(this.response=this.responseText+=h)}a.done?Js(this):Zs(this),this.readyState==3&&$c(this)}},s.Ra=function(a){this.g&&(this.response=this.responseText=a,Js(this))},s.Qa=function(a){this.g&&(this.response=a,Js(this))},s.ga=function(){this.g&&Js(this)};function Js(a){a.readyState=4,a.l=null,a.j=null,a.v=null,Zs(a)}s.setRequestHeader=function(a,h){this.u.append(a,h)},s.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},s.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],h=this.h.entries();for(var d=h.next();!d.done;)d=d.value,a.push(d[0]+": "+d[1]),d=h.next();return a.join(`\r
`)};function Zs(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(Tr.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function Qc(a){let h="";return Z(a,function(d,p){h+=p,h+=":",h+=d,h+=`\r
`}),h}function ka(a,h,d){e:{for(p in d){var p=!1;break e}p=!0}p||(d=Qc(d),typeof a=="string"?d!=null&&encodeURIComponent(String(d)):ce(a,h,d))}function pe(a){xe.call(this),this.headers=new Map,this.o=a||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}S(pe,xe);var Yg=/^https?$/i,Xg=["POST","PUT"];s=pe.prototype,s.Ha=function(a){this.J=a},s.ea=function(a,h,d,p){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);h=h?h.toUpperCase():"GET",this.D=a,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Sa.g(),this.v=this.o?wc(this.o):wc(Sa),this.g.onreadystatechange=m(this.Ea,this);try{this.B=!0,this.g.open(h,String(a),!0),this.B=!1}catch(P){Hc(this,P);return}if(a=d||"",d=new Map(this.headers),p)if(Object.getPrototypeOf(p)===Object.prototype)for(var R in p)d.set(R,p[R]);else if(typeof p.keys=="function"&&typeof p.get=="function")for(const P of p.keys())d.set(P,p.get(P));else throw Error("Unknown input type for opt_headers: "+String(p));p=Array.from(d.keys()).find(P=>P.toLowerCase()=="content-type"),R=l.FormData&&a instanceof l.FormData,!(0<=Array.prototype.indexOf.call(Xg,h,void 0))||p||R||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[P,O]of d)this.g.setRequestHeader(P,O);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Jc(this),this.u=!0,this.g.send(a),this.u=!1}catch(P){Hc(this,P)}};function Hc(a,h){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=h,a.m=5,Yc(a),wr(a)}function Yc(a){a.A||(a.A=!0,je(a,"complete"),je(a,"error"))}s.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=a||7,je(this,"complete"),je(this,"abort"),wr(this))},s.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),wr(this,!0)),pe.aa.N.call(this)},s.Ea=function(){this.s||(this.B||this.u||this.j?Xc(this):this.bb())},s.bb=function(){Xc(this)};function Xc(a){if(a.h&&typeof o<"u"&&(!a.v[1]||vt(a)!=4||a.Z()!=2)){if(a.u&&vt(a)==4)Ec(a.Ea,0,a);else if(je(a,"readystatechange"),vt(a)==4){a.h=!1;try{const O=a.Z();e:switch(O){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var h=!0;break e;default:h=!1}var d;if(!(d=h)){var p;if(p=O===0){var R=String(a.D).match(qc)[1]||null;!R&&l.self&&l.self.location&&(R=l.self.location.protocol.slice(0,-1)),p=!Yg.test(R?R.toLowerCase():"")}d=p}if(d)je(a,"complete"),je(a,"success");else{a.m=6;try{var P=2<vt(a)?a.g.statusText:""}catch{P=""}a.l=P+" ["+a.Z()+"]",Yc(a)}}finally{wr(a)}}}}function wr(a,h){if(a.g){Jc(a);const d=a.g,p=a.v[0]?()=>{}:null;a.g=null,a.v=null,h||je(a,"ready");try{d.onreadystatechange=p}catch{}}}function Jc(a){a.I&&(l.clearTimeout(a.I),a.I=null)}s.isActive=function(){return!!this.g};function vt(a){return a.g?a.g.readyState:0}s.Z=function(){try{return 2<vt(this)?this.g.status:-1}catch{return-1}},s.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},s.Oa=function(a){if(this.g){var h=this.g.responseText;return a&&h.indexOf(a)==0&&(h=h.substring(a.length)),bg(h)}};function Zc(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.H){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function Jg(a){const h={};a=(a.g&&2<=vt(a)&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let p=0;p<a.length;p++){if(j(a[p]))continue;var d=w(a[p]);const R=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const P=h[R]||[];h[R]=P,P.push(d)}v(h,function(p){return p.join(", ")})}s.Ba=function(){return this.m},s.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function ei(a,h,d){return d&&d.internalChannelParams&&d.internalChannelParams[a]||h}function eh(a){this.Aa=0,this.i=[],this.j=new $s,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=ei("failFast",!1,a),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=ei("baseRetryDelayMs",5e3,a),this.cb=ei("retryDelaySeedMs",1e4,a),this.Wa=ei("forwardChannelMaxRetries",2,a),this.wa=ei("forwardChannelRequestTimeoutMs",2e4,a),this.pa=a&&a.xmlHttpFactory||void 0,this.Xa=a&&a.Tb||void 0,this.Ca=a&&a.useFetchStreams||!1,this.L=void 0,this.J=a&&a.supportsCrossDomainXhr||!1,this.K="",this.h=new Oc(a&&a.concurrentRequestLimit),this.Da=new Qg,this.P=a&&a.fastHandshake||!1,this.O=a&&a.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=a&&a.Rb||!1,a&&a.xa&&this.j.xa(),a&&a.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&a&&a.detectBufferingProxy||!1,this.ja=void 0,a&&a.longPollingTimeout&&0<a.longPollingTimeout&&(this.ja=a.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}s=eh.prototype,s.la=8,s.G=1,s.connect=function(a,h,d,p){Ge(0),this.W=a,this.H=h||{},d&&p!==void 0&&(this.H.OSID=d,this.H.OAID=p),this.F=this.X,this.I=uh(this,null,this.W),Rr(this)};function Oa(a){if(th(a),a.G==3){var h=a.U++,d=It(a.I);if(ce(d,"SID",a.K),ce(d,"RID",h),ce(d,"TYPE","terminate"),ti(a,d),h=new Ot(a,a.j,h),h.L=2,h.v=Ir(It(d)),d=!1,l.navigator&&l.navigator.sendBeacon)try{d=l.navigator.sendBeacon(h.v.toString(),"")}catch{}!d&&l.Image&&(new Image().src=h.v,d=!0),d||(h.g=ch(h.j,null),h.g.ea(h.v)),h.F=Date.now(),gr(h)}lh(a)}function Ar(a){a.g&&(Fa(a),a.g.cancel(),a.g=null)}function th(a){Ar(a),a.u&&(l.clearTimeout(a.u),a.u=null),Cr(a),a.h.cancel(),a.s&&(typeof a.s=="number"&&l.clearTimeout(a.s),a.s=null)}function Rr(a){if(!Mc(a.h)&&!a.s){a.s=!0;var h=a.Ga;Bs||_c(),qs||(Bs(),qs=!0),pa.add(h,a),a.B=0}}function Zg(a,h){return Fc(a.h)>=a.h.j-(a.s?1:0)?!1:a.s?(a.i=h.D.concat(a.i),!0):a.G==1||a.G==2||a.B>=(a.Va?0:a.Wa)?!1:(a.s=Ws(m(a.Ga,a,h),ah(a,a.B)),a.B++,!0)}s.Ga=function(a){if(this.s)if(this.s=null,this.G==1){if(!a){this.U=Math.floor(1e5*Math.random()),a=this.U++;const R=new Ot(this,this.j,a);let P=this.o;if(this.S&&(P?(P=g(P),T(P,this.S)):P=this.S),this.m!==null||this.O||(R.H=P,P=null),this.P)e:{for(var h=0,d=0;d<this.i.length;d++){t:{var p=this.i[d];if("__data__"in p.map&&(p=p.map.__data__,typeof p=="string")){p=p.length;break t}p=void 0}if(p===void 0)break;if(h+=p,4096<h){h=d;break e}if(h===4096||d===this.i.length-1){h=d+1;break e}}h=1e3}else h=1e3;h=sh(this,R,h),d=It(this.I),ce(d,"RID",a),ce(d,"CVER",22),this.D&&ce(d,"X-HTTP-Session-Id",this.D),ti(this,d),P&&(this.O?h="headers="+encodeURIComponent(String(Qc(P)))+"&"+h:this.m&&ka(d,this.m,P)),Da(this.h,R),this.Ua&&ce(d,"TYPE","init"),this.P?(ce(d,"$req",h),ce(d,"SID","null"),R.T=!0,ba(R,d,null)):ba(R,d,h),this.G=2}}else this.G==3&&(a?nh(this,a):this.i.length==0||Mc(this.h)||nh(this))};function nh(a,h){var d;h?d=h.l:d=a.U++;const p=It(a.I);ce(p,"SID",a.K),ce(p,"RID",d),ce(p,"AID",a.T),ti(a,p),a.m&&a.o&&ka(p,a.m,a.o),d=new Ot(a,a.j,d,a.B+1),a.m===null&&(d.H=a.o),h&&(a.i=h.D.concat(a.i)),h=sh(a,d,1e3),d.I=Math.round(.5*a.wa)+Math.round(.5*a.wa*Math.random()),Da(a.h,d),ba(d,p,h)}function ti(a,h){a.H&&Z(a.H,function(d,p){ce(h,p,d)}),a.l&&Bc({},function(d,p){ce(h,p,d)})}function sh(a,h,d){d=Math.min(a.i.length,d);var p=a.l?m(a.l.Na,a.l,a):null;e:{var R=a.i;let P=-1;for(;;){const O=["count="+d];P==-1?0<d?(P=R[0].g,O.push("ofs="+P)):P=0:O.push("ofs="+P);let oe=!0;for(let be=0;be<d;be++){let ee=R[be].g;const Ne=R[be].map;if(ee-=P,0>ee)P=Math.max(0,R[be].g-100),oe=!1;else try{Hg(Ne,O,"req"+ee+"_")}catch{p&&p(Ne)}}if(oe){p=O.join("&");break e}}}return a=a.i.splice(0,d),h.D=a,p}function ih(a){if(!a.g&&!a.u){a.Y=1;var h=a.Fa;Bs||_c(),qs||(Bs(),qs=!0),pa.add(h,a),a.v=0}}function Ma(a){return a.g||a.u||3<=a.v?!1:(a.Y++,a.u=Ws(m(a.Fa,a),ah(a,a.v)),a.v++,!0)}s.Fa=function(){if(this.u=null,rh(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var a=2*this.R;this.j.info("BP detection timer enabled: "+a),this.A=Ws(m(this.ab,this),a)}},s.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,Ge(10),Ar(this),rh(this))};function Fa(a){a.A!=null&&(l.clearTimeout(a.A),a.A=null)}function rh(a){a.g=new Ot(a,a.j,"rpc",a.Y),a.m===null&&(a.g.H=a.o),a.g.O=0;var h=It(a.qa);ce(h,"RID","rpc"),ce(h,"SID",a.K),ce(h,"AID",a.T),ce(h,"CI",a.F?"0":"1"),!a.F&&a.ja&&ce(h,"TO",a.ja),ce(h,"TYPE","xmlhttp"),ti(a,h),a.m&&a.o&&ka(h,a.m,a.o),a.L&&(a.g.I=a.L);var d=a.g;a=a.ia,d.L=1,d.v=Ir(It(h)),d.m=null,d.P=!0,Nc(d,a)}s.Za=function(){this.C!=null&&(this.C=null,Ar(this),Ma(this),Ge(19))};function Cr(a){a.C!=null&&(l.clearTimeout(a.C),a.C=null)}function oh(a,h){var d=null;if(a.g==h){Cr(a),Fa(a),a.g=null;var p=2}else if(Na(a.h,h))d=h.D,Lc(a.h,h),p=1;else return;if(a.G!=0){if(h.o)if(p==1){d=h.m?h.m.length:0,h=Date.now()-h.F;var R=a.B;p=_r(),je(p,new Pc(p,d)),Rr(a)}else ih(a);else if(R=h.s,R==3||R==0&&0<h.X||!(p==1&&Zg(a,h)||p==2&&Ma(a)))switch(d&&0<d.length&&(h=a.h,h.i=h.i.concat(d)),R){case 1:hn(a,5);break;case 4:hn(a,10);break;case 3:hn(a,6);break;default:hn(a,2)}}}function ah(a,h){let d=a.Ta+Math.floor(Math.random()*a.cb);return a.isActive()||(d*=2),d*h}function hn(a,h){if(a.j.info("Error code "+h),h==2){var d=m(a.fb,a),p=a.Xa;const R=!p;p=new cn(p||"//www.google.com/images/cleardot.gif"),l.location&&l.location.protocol=="http"||yr(p,"https"),Ir(p),R?Wg(p.toString(),d):$g(p.toString(),d)}else Ge(2);a.G=0,a.l&&a.l.sa(h),lh(a),th(a)}s.fb=function(a){a?(this.j.info("Successfully pinged google.com"),Ge(2)):(this.j.info("Failed to ping google.com"),Ge(1))};function lh(a){if(a.G=0,a.ka=[],a.l){const h=Uc(a.h);(h.length!=0||a.i.length!=0)&&(x(a.ka,h),x(a.ka,a.i),a.h.i.length=0,V(a.i),a.i.length=0),a.l.ra()}}function uh(a,h,d){var p=d instanceof cn?It(d):new cn(d);if(p.g!="")h&&(p.g=h+"."+p.g),Er(p,p.s);else{var R=l.location;p=R.protocol,h=h?h+"."+R.hostname:R.hostname,R=+R.port;var P=new cn(null);p&&yr(P,p),h&&(P.g=h),R&&Er(P,R),d&&(P.l=d),p=P}return d=a.D,h=a.ya,d&&h&&ce(p,d,h),ce(p,"VER",a.la),ti(a,p),p}function ch(a,h,d){if(h&&!a.J)throw Error("Can't create secondary domain capable XhrIo object.");return h=a.Ca&&!a.pa?new pe(new vr({eb:d})):new pe(a.pa),h.Ha(a.J),h}s.isActive=function(){return!!this.l&&this.l.isActive(this)};function hh(){}s=hh.prototype,s.ua=function(){},s.ta=function(){},s.sa=function(){},s.ra=function(){},s.isActive=function(){return!0},s.Na=function(){};function Sr(){}Sr.prototype.g=function(a,h){return new Xe(a,h)};function Xe(a,h){xe.call(this),this.g=new eh(h),this.l=a,this.h=h&&h.messageUrlParams||null,a=h&&h.messageHeaders||null,h&&h.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=h&&h.initMessageHeaders||null,h&&h.messageContentType&&(a?a["X-WebChannel-Content-Type"]=h.messageContentType:a={"X-WebChannel-Content-Type":h.messageContentType}),h&&h.va&&(a?a["X-WebChannel-Client-Profile"]=h.va:a={"X-WebChannel-Client-Profile":h.va}),this.g.S=a,(a=h&&h.Sb)&&!j(a)&&(this.g.m=a),this.v=h&&h.supportsCrossDomainXhr||!1,this.u=h&&h.sendRawJson||!1,(h=h&&h.httpSessionIdParam)&&!j(h)&&(this.g.D=h,a=this.h,a!==null&&h in a&&(a=this.h,h in a&&delete a[h])),this.j=new Gn(this)}S(Xe,xe),Xe.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Xe.prototype.close=function(){Oa(this.g)},Xe.prototype.o=function(a){var h=this.g;if(typeof a=="string"){var d={};d.__data__=a,a=d}else this.u&&(d={},d.__data__=wa(a),a=d);h.i.push(new Mg(h.Ya++,a)),h.G==3&&Rr(h)},Xe.prototype.N=function(){this.g.l=null,delete this.j,Oa(this.g),delete this.g,Xe.aa.N.call(this)};function dh(a){Ra.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var h=a.__sm__;if(h){e:{for(const d in h){a=d;break e}a=void 0}(this.i=a)&&(a=this.i,h=h!==null&&a in h?h[a]:void 0),this.data=h}else this.data=a}S(dh,Ra);function fh(){Ca.call(this),this.status=1}S(fh,Ca);function Gn(a){this.g=a}S(Gn,hh),Gn.prototype.ua=function(){je(this.g,"a")},Gn.prototype.ta=function(a){je(this.g,new dh(a))},Gn.prototype.sa=function(a){je(this.g,new fh)},Gn.prototype.ra=function(){je(this.g,"b")},Sr.prototype.createWebChannel=Sr.prototype.g,Xe.prototype.send=Xe.prototype.o,Xe.prototype.open=Xe.prototype.m,Xe.prototype.close=Xe.prototype.close,Uf=function(){return new Sr},Lf=function(){return _r()},Ff=ln,el={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},pr.NO_ERROR=0,pr.TIMEOUT=8,pr.HTTP_ERROR=6,Lr=pr,bc.COMPLETE="complete",Mf=bc,Ac.EventType=zs,zs.OPEN="a",zs.CLOSE="b",zs.ERROR="c",zs.MESSAGE="d",xe.prototype.listen=xe.prototype.K,hi=Ac,pe.prototype.listenOnce=pe.prototype.L,pe.prototype.getLastError=pe.prototype.Ka,pe.prototype.getLastErrorCode=pe.prototype.Ba,pe.prototype.getStatus=pe.prototype.Z,pe.prototype.getResponseJson=pe.prototype.Oa,pe.prototype.getResponseText=pe.prototype.oa,pe.prototype.send=pe.prototype.ea,pe.prototype.setWithCredentials=pe.prototype.Ha,Of=pe}).apply(typeof br<"u"?br:typeof self<"u"?self:typeof window<"u"?window:{});const mh="@firebase/firestore",gh="4.8.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oe{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Oe.UNAUTHENTICATED=new Oe(null),Oe.GOOGLE_CREDENTIALS=new Oe("google-credentials-uid"),Oe.FIRST_PARTY=new Oe("first-party-uid"),Oe.MOCK_USER=new Oe("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let xs="11.10.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sn=new vf("@firebase/firestore");function Jn(){return Sn.logLevel}function N(s,...e){if(Sn.logLevel<=ft.DEBUG){const t=e.map(Gl);Sn.debug(`Firestore (${xs}): ${s}`,...t)}}function ye(s,...e){if(Sn.logLevel<=ft.ERROR){const t=e.map(Gl);Sn.error(`Firestore (${xs}): ${s}`,...t)}}function Qt(s,...e){if(Sn.logLevel<=ft.WARN){const t=e.map(Gl);Sn.warn(`Firestore (${xs}): ${s}`,...t)}}function Gl(s){if(typeof s=="string")return s;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(t){return JSON.stringify(t)}(s)}catch{return s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function F(s,e,t){let n="Unexpected state";typeof e=="string"?n=e:t=e,Bf(s,n,t)}function Bf(s,e,t){let n=`FIRESTORE (${xs}) INTERNAL ASSERTION FAILED: ${e} (ID: ${s.toString(16)})`;if(t!==void 0)try{n+=" CONTEXT: "+JSON.stringify(t)}catch{n+=" CONTEXT: "+t}throw ye(n),new Error(n)}function U(s,e,t,n){let i="Unexpected state";typeof t=="string"?i=t:n=t,s||Bf(e,i,n)}function L(s,e){return s}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const b={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class D extends ey{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rt{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gy{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class yy{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(Oe.UNAUTHENTICATED))}shutdown(){}}class Ey{constructor(e){this.t=e,this.currentUser=Oe.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){U(this.o===void 0,42304);let n=this.i;const i=u=>this.i!==n?(n=this.i,t(u)):Promise.resolve();let r=new Rt;this.o=()=>{this.i++,this.currentUser=this.u(),r.resolve(),r=new Rt,e.enqueueRetryable(()=>i(this.currentUser))};const o=()=>{const u=r;e.enqueueRetryable(async()=>{await u.promise,await i(this.currentUser)})},l=u=>{N("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(u=>l(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?l(u):(N("FirebaseAuthCredentialsProvider","Auth not yet detected"),r.resolve(),r=new Rt)}},0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(n=>this.i!==e?(N("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):n?(U(typeof n.accessToken=="string",31837,{l:n}),new gy(n.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return U(e===null||typeof e=="string",2055,{h:e}),new Oe(e)}}class Iy{constructor(e,t,n){this.P=e,this.T=t,this.I=n,this.type="FirstParty",this.user=Oe.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class vy{constructor(e,t,n){this.P=e,this.T=t,this.I=n}getToken(){return Promise.resolve(new Iy(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(Oe.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class yh{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Ty{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,Af(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){U(this.o===void 0,3512);const n=r=>{r.error!=null&&N("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${r.error.message}`);const o=r.token!==this.m;return this.m=r.token,N("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(r.token):Promise.resolve()};this.o=r=>{e.enqueueRetryable(()=>n(r))};const i=r=>{N("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=r,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(r=>i(r)),setTimeout(()=>{if(!this.appCheck){const r=this.V.getImmediate({optional:!0});r?i(r):N("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new yh(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(U(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new yh(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wy(s){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(s);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let n=0;n<s;n++)t[n]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qf(){return new TextEncoder}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zl{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let n="";for(;n.length<20;){const i=wy(40);for(let r=0;r<i.length;++r)n.length<20&&i[r]<t&&(n+=e.charAt(i[r]%62))}return n}}function G(s,e){return s<e?-1:s>e?1:0}function tl(s,e){let t=0;for(;t<s.length&&t<e.length;){const n=s.codePointAt(t),i=e.codePointAt(t);if(n!==i){if(n<128&&i<128)return G(n,i);{const r=qf(),o=Ay(r.encode(Eh(s,t)),r.encode(Eh(e,t)));return o!==0?o:G(n,i)}}t+=n>65535?2:1}return G(s.length,e.length)}function Eh(s,e){return s.codePointAt(e)>65535?s.substring(e,e+2):s.substring(e,e+1)}function Ay(s,e){for(let t=0;t<s.length&&t<e.length;++t)if(s[t]!==e[t])return G(s[t],e[t]);return G(s.length,e.length)}function cs(s,e,t){return s.length===e.length&&s.every((n,i)=>t(n,e[i]))}function jf(s){return s+"\0"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ih="__name__";class ht{constructor(e,t,n){t===void 0?t=0:t>e.length&&F(637,{offset:t,range:e.length}),n===void 0?n=e.length-t:n>e.length-t&&F(1746,{length:n,range:e.length-t}),this.segments=e,this.offset=t,this.len=n}get length(){return this.len}isEqual(e){return ht.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof ht?e.forEach(n=>{t.push(n)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,n=this.limit();t<n;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const n=Math.min(e.length,t.length);for(let i=0;i<n;i++){const r=ht.compareSegments(e.get(i),t.get(i));if(r!==0)return r}return G(e.length,t.length)}static compareSegments(e,t){const n=ht.isNumericId(e),i=ht.isNumericId(t);return n&&!i?-1:!n&&i?1:n&&i?ht.extractNumericId(e).compare(ht.extractNumericId(t)):tl(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Gt.fromString(e.substring(4,e.length-2))}}class te extends ht{construct(e,t,n){return new te(e,t,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const n of e){if(n.indexOf("//")>=0)throw new D(b.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);t.push(...n.split("/").filter(i=>i.length>0))}return new te(t)}static emptyPath(){return new te([])}}const Ry=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class fe extends ht{construct(e,t,n){return new fe(e,t,n)}static isValidIdentifier(e){return Ry.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),fe.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===Ih}static keyField(){return new fe([Ih])}static fromServerFormat(e){const t=[];let n="",i=0;const r=()=>{if(n.length===0)throw new D(b.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(n),n=""};let o=!1;for(;i<e.length;){const l=e[i];if(l==="\\"){if(i+1===e.length)throw new D(b.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[i+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new D(b.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);n+=u,i+=2}else l==="`"?(o=!o,i++):l!=="."||o?(n+=l,i++):(r(),i++)}if(r(),o)throw new D(b.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new fe(t)}static emptyPath(){return new fe([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class M{constructor(e){this.path=e}static fromPath(e){return new M(te.fromString(e))}static fromName(e){return new M(te.fromString(e).popFirst(5))}static empty(){return new M(te.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&te.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return te.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new M(new te(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gf(s,e,t){if(!t)throw new D(b.INVALID_ARGUMENT,`Function ${s}() cannot be called with an empty ${e}.`)}function Cy(s,e,t,n){if(e===!0&&n===!0)throw new D(b.INVALID_ARGUMENT,`${s} and ${t} cannot be used together.`)}function vh(s){if(!M.isDocumentKey(s))throw new D(b.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${s} has ${s.length}.`)}function Th(s){if(M.isDocumentKey(s))throw new D(b.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${s} has ${s.length}.`)}function zf(s){return typeof s=="object"&&s!==null&&(Object.getPrototypeOf(s)===Object.prototype||Object.getPrototypeOf(s)===null)}function Oo(s){if(s===void 0)return"undefined";if(s===null)return"null";if(typeof s=="string")return s.length>20&&(s=`${s.substring(0,20)}...`),JSON.stringify(s);if(typeof s=="number"||typeof s=="boolean")return""+s;if(typeof s=="object"){if(s instanceof Array)return"an array";{const e=function(n){return n.constructor?n.constructor.name:null}(s);return e?`a custom ${e} object`:"an object"}}return typeof s=="function"?"a function":F(12329,{type:typeof s})}function ut(s,e){if("_delegate"in s&&(s=s._delegate),!(s instanceof e)){if(e.name===s.constructor.name)throw new D(b.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=Oo(s);throw new D(b.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return s}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Te(s,e){const t={typeString:s};return e&&(t.value=e),t}function Yi(s,e){if(!zf(s))throw new D(b.INVALID_ARGUMENT,"JSON must be an object");let t;for(const n in e)if(e[n]){const i=e[n].typeString,r="value"in e[n]?{value:e[n].value}:void 0;if(!(n in s)){t=`JSON missing required field: '${n}'`;break}const o=s[n];if(i&&typeof o!==i){t=`JSON field '${n}' must be a ${i}.`;break}if(r!==void 0&&o!==r.value){t=`Expected '${n}' field to equal '${r.value}'`;break}}if(t)throw new D(b.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wh=-62135596800,Ah=1e6;class se{static now(){return se.fromMillis(Date.now())}static fromDate(e){return se.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),n=Math.floor((e-1e3*t)*Ah);return new se(t,n)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new D(b.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new D(b.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<wh)throw new D(b.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new D(b.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Ah}_compareTo(e){return this.seconds===e.seconds?G(this.nanoseconds,e.nanoseconds):G(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:se._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Yi(e,se._jsonSchema))return new se(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-wh;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}se._jsonSchemaVersion="firestore/timestamp/1.0",se._jsonSchema={type:Te("string",se._jsonSchemaVersion),seconds:Te("number"),nanoseconds:Te("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class q{static fromTimestamp(e){return new q(e)}static min(){return new q(new se(0,0))}static max(){return new q(new se(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hs=-1;class eo{constructor(e,t,n,i){this.indexId=e,this.collectionGroup=t,this.fields=n,this.indexState=i}}function nl(s){return s.fields.find(e=>e.kind===2)}function fn(s){return s.fields.filter(e=>e.kind!==2)}eo.UNKNOWN_ID=-1;class Ur{constructor(e,t){this.fieldPath=e,this.kind=t}}class Vi{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new Vi(0,nt.min())}}function Kf(s,e){const t=s.toTimestamp().seconds,n=s.toTimestamp().nanoseconds+1,i=q.fromTimestamp(n===1e9?new se(t+1,0):new se(t,n));return new nt(i,M.empty(),e)}function Wf(s){return new nt(s.readTime,s.key,hs)}class nt{constructor(e,t,n){this.readTime=e,this.documentKey=t,this.largestBatchId=n}static min(){return new nt(q.min(),M.empty(),hs)}static max(){return new nt(q.max(),M.empty(),hs)}}function Kl(s,e){let t=s.readTime.compareTo(e.readTime);return t!==0?t:(t=M.comparator(s.documentKey,e.documentKey),t!==0?t:G(s.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $f="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Qf{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function nn(s){if(s.code!==b.FAILED_PRECONDITION||s.message!==$f)throw s;N("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class A{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&F(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new A((n,i)=>{this.nextCallback=r=>{this.wrapSuccess(e,r).next(n,i)},this.catchCallback=r=>{this.wrapFailure(t,r).next(n,i)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof A?t:A.resolve(t)}catch(t){return A.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):A.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):A.reject(t)}static resolve(e){return new A((t,n)=>{t(e)})}static reject(e){return new A((t,n)=>{n(e)})}static waitFor(e){return new A((t,n)=>{let i=0,r=0,o=!1;e.forEach(l=>{++i,l.next(()=>{++r,o&&r===i&&t()},u=>n(u))}),o=!0,r===i&&t()})}static or(e){let t=A.resolve(!1);for(const n of e)t=t.next(i=>i?A.resolve(i):n());return t}static forEach(e,t){const n=[];return e.forEach((i,r)=>{n.push(t.call(this,i,r))}),this.waitFor(n)}static mapArray(e,t){return new A((n,i)=>{const r=e.length,o=new Array(r);let l=0;for(let u=0;u<r;u++){const c=u;t(e[c]).next(f=>{o[c]=f,++l,l===r&&n(o)},f=>i(f))}})}static doWhile(e,t){return new A((n,i)=>{const r=()=>{e()===!0?t().next(()=>{r()},i):n()};r()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Je="SimpleDb";class Mo{static open(e,t,n,i){try{return new Mo(t,e.transaction(i,n))}catch(r){throw new mi(t,r)}}constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.S=new Rt,this.transaction.oncomplete=()=>{this.S.resolve()},this.transaction.onabort=()=>{t.error?this.S.reject(new mi(e,t.error)):this.S.resolve()},this.transaction.onerror=n=>{const i=Wl(n.target.error);this.S.reject(new mi(e,i))}}get D(){return this.S.promise}abort(e){e&&this.S.reject(e),this.aborted||(N(Je,"Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}v(){const e=this.transaction;this.aborted||typeof e.commit!="function"||e.commit()}store(e){const t=this.transaction.objectStore(e);return new Py(t)}}class zt{static delete(e){return N(Je,"Removing database:",e),mn(ty().indexedDB.deleteDatabase(e)).toPromise()}static C(){if(!ny())return!1;if(zt.F())return!0;const e=Jr(),t=zt.M(e),n=0<t&&t<10,i=Hf(e),r=0<i&&i<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||n||r)}static F(){var e;return typeof process<"u"&&((e=process.__PRIVATE_env)===null||e===void 0?void 0:e.O)==="YES"}static N(e,t){return e.store(t)}static M(e){const t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),n=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(n)}constructor(e,t,n){this.name=e,this.version=t,this.B=n,this.L=null,zt.M(Jr())===12.2&&ye("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}async k(e){return this.db||(N(Je,"Opening database:",this.name),this.db=await new Promise((t,n)=>{const i=indexedDB.open(this.name,this.version);i.onsuccess=r=>{const o=r.target.result;t(o)},i.onblocked=()=>{n(new mi(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},i.onerror=r=>{const o=r.target.error;o.name==="VersionError"?n(new D(b.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):o.name==="InvalidStateError"?n(new D(b.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+o)):n(new mi(e,o))},i.onupgradeneeded=r=>{N(Je,'Database "'+this.name+'" requires upgrade from version:',r.oldVersion);const o=r.target.result;if(this.L!==null&&this.L!==r.oldVersion)throw new Error(`refusing to open IndexedDB database due to potential corruption of the IndexedDB database data; this corruption could be caused by clicking the "clear site data" button in a web browser; try reloading the web page to re-initialize the IndexedDB database: lastClosedDbVersion=${this.L}, event.oldVersion=${r.oldVersion}, event.newVersion=${r.newVersion}, db.version=${o.version}`);this.B.q(o,i.transaction,r.oldVersion,this.version).next(()=>{N(Je,"Database upgrade to version "+this.version+" complete")})}}),this.db.addEventListener("close",t=>{const n=t.target;this.L=n.version},{passive:!0})),this.db.addEventListener("versionchange",t=>{var n;t.newVersion===null&&(Qt('Received "versionchange" event with newVersion===null; notifying the registered DatabaseDeletedListener, if any'),(n=this.databaseDeletedListener)===null||n===void 0||n.call(this))},{passive:!0}),this.db}setDatabaseDeletedListener(e){if(this.databaseDeletedListener)throw new Error("setDatabaseDeletedListener() may only be called once, and it has already been called");this.databaseDeletedListener=e}async runTransaction(e,t,n,i){const r=t==="readonly";let o=0;for(;;){++o;try{this.db=await this.k(e);const l=Mo.open(this.db,e,r?"readonly":"readwrite",n),u=i(l).next(c=>(l.v(),c)).catch(c=>(l.abort(c),A.reject(c))).toPromise();return u.catch(()=>{}),await l.D,u}catch(l){const u=l,c=u.name!=="FirebaseError"&&o<3;if(N(Je,"Transaction failed with error:",u.message,"Retrying:",c),this.close(),!c)return Promise.reject(u)}}}close(){this.db&&this.db.close(),this.db=void 0}}function Hf(s){const e=s.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}class Sy{constructor(e){this.$=e,this.U=!1,this.K=null}get isDone(){return this.U}get W(){return this.K}set cursor(e){this.$=e}done(){this.U=!0}G(e){this.K=e}delete(){return mn(this.$.delete())}}class mi extends D{constructor(e,t){super(b.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function sn(s){return s.name==="IndexedDbTransactionError"}class Py{constructor(e){this.store=e}put(e,t){let n;return t!==void 0?(N(Je,"PUT",this.store.name,e,t),n=this.store.put(t,e)):(N(Je,"PUT",this.store.name,"<auto-key>",e),n=this.store.put(e)),mn(n)}add(e){return N(Je,"ADD",this.store.name,e,e),mn(this.store.add(e))}get(e){return mn(this.store.get(e)).next(t=>(t===void 0&&(t=null),N(Je,"GET",this.store.name,e,t),t))}delete(e){return N(Je,"DELETE",this.store.name,e),mn(this.store.delete(e))}count(){return N(Je,"COUNT",this.store.name),mn(this.store.count())}j(e,t){const n=this.options(e,t),i=n.index?this.store.index(n.index):this.store;if(typeof i.getAll=="function"){const r=i.getAll(n.range);return new A((o,l)=>{r.onerror=u=>{l(u.target.error)},r.onsuccess=u=>{o(u.target.result)}})}{const r=this.cursor(n),o=[];return this.J(r,(l,u)=>{o.push(u)}).next(()=>o)}}H(e,t){const n=this.store.getAll(e,t===null?void 0:t);return new A((i,r)=>{n.onerror=o=>{r(o.target.error)},n.onsuccess=o=>{i(o.target.result)}})}Y(e,t){N(Je,"DELETE ALL",this.store.name);const n=this.options(e,t);n.Z=!1;const i=this.cursor(n);return this.J(i,(r,o,l)=>l.delete())}X(e,t){let n;t?n=e:(n={},t=e);const i=this.cursor(n);return this.J(i,t)}ee(e){const t=this.cursor({});return new A((n,i)=>{t.onerror=r=>{const o=Wl(r.target.error);i(o)},t.onsuccess=r=>{const o=r.target.result;o?e(o.primaryKey,o.value).next(l=>{l?o.continue():n()}):n()}})}J(e,t){const n=[];return new A((i,r)=>{e.onerror=o=>{r(o.target.error)},e.onsuccess=o=>{const l=o.target.result;if(!l)return void i();const u=new Sy(l),c=t(l.primaryKey,l.value,u);if(c instanceof A){const f=c.catch(_=>(u.done(),A.reject(_)));n.push(f)}u.isDone?i():u.W===null?l.continue():l.continue(u.W)}}).next(()=>A.waitFor(n))}options(e,t){let n;return e!==void 0&&(typeof e=="string"?n=e:t=e),{index:n,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){const n=this.store.index(e.index);return e.Z?n.openKeyCursor(e.range,t):n.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function mn(s){return new A((e,t)=>{s.onsuccess=n=>{const i=n.target.result;e(i)},s.onerror=n=>{const i=Wl(n.target.error);t(i)}})}let Rh=!1;function Wl(s){const e=zt.M(Jr());if(e>=12.2&&e<13){const t="An internal error was encountered in the Indexed Database server";if(s.message.indexOf(t)>=0){const n=new D("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return Rh||(Rh=!0,setTimeout(()=>{throw n},0)),n}}return s}const gi="IndexBackfiller";class by{constructor(e,t){this.asyncQueue=e,this.te=t,this.task=null}start(){this.ne(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}ne(e){N(gi,`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,async()=>{this.task=null;try{const t=await this.te.re();N(gi,`Documents written: ${t}`)}catch(t){sn(t)?N(gi,"Ignoring IndexedDB error during index backfill: ",t):await nn(t)}await this.ne(6e4)})}}class Vy{constructor(e,t){this.localStore=e,this.persistence=t}async re(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",t=>this.ie(t,e))}ie(e,t){const n=new Set;let i=t,r=!0;return A.doWhile(()=>r===!0&&i>0,()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next(o=>{if(o!==null&&!n.has(o))return N(gi,`Processing collection: ${o}`),this.se(e,o,i).next(l=>{i-=l,n.add(o)});r=!1})).next(()=>t-i)}se(e,t,n){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next(i=>this.localStore.localDocuments.getNextDocuments(e,t,i,n).next(r=>{const o=r.changes;return this.localStore.indexManager.updateIndexEntries(e,o).next(()=>this.oe(i,r)).next(l=>(N(gi,`Updating offset: ${l}`),this.localStore.indexManager.updateCollectionGroup(e,t,l))).next(()=>o.size)}))}oe(e,t){let n=e;return t.changes.forEach((i,r)=>{const o=Wf(r);Kl(o,n)>0&&(n=o)}),new nt(n.readTime,n.documentKey,Math.max(t.batchId,e.largestBatchId))}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ke{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=n=>this._e(n),this.ae=n=>t.writeSequenceNumber(n))}_e(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ae&&this.ae(e),e}}Ke.ue=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tn=-1;function Fo(s){return s==null}function xi(s){return s===0&&1/s==-1/0}function Yf(s){return typeof s=="number"&&Number.isInteger(s)&&!xi(s)&&s<=Number.MAX_SAFE_INTEGER&&s>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const to="";function qe(s){let e="";for(let t=0;t<s.length;t++)e.length>0&&(e=Ch(e)),e=xy(s.get(t),e);return Ch(e)}function xy(s,e){let t=e;const n=s.length;for(let i=0;i<n;i++){const r=s.charAt(i);switch(r){case"\0":t+="";break;case to:t+="";break;default:t+=r}}return t}function Ch(s){return s+to+""}function _t(s){const e=s.length;if(U(e>=2,64408,{path:s}),e===2)return U(s.charAt(0)===to&&s.charAt(1)==="",56145,{path:s}),te.emptyPath();const t=e-2,n=[];let i="";for(let r=0;r<e;){const o=s.indexOf(to,r);switch((o<0||o>t)&&F(50515,{path:s}),s.charAt(o+1)){case"":const l=s.substring(r,o);let u;i.length===0?u=l:(i+=l,u=i,i=""),n.push(u);break;case"":i+=s.substring(r,o),i+="\0";break;case"":i+=s.substring(r,o+1);break;default:F(61167,{path:s})}r=o+2}return new te(n)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _n="remoteDocuments",Xi="owner",Kn="owner",Ni="mutationQueues",Ny="userId",rt="mutations",Sh="batchId",In="userMutationsIndex",Ph=["userId","batchId"];/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Br(s,e){return[s,qe(e)]}function Xf(s,e,t){return[s,qe(e),t]}const Dy={},ds="documentMutations",no="remoteDocumentsV14",ky=["prefixPath","collectionGroup","readTime","documentId"],qr="documentKeyIndex",Oy=["prefixPath","collectionGroup","documentId"],Jf="collectionGroupIndex",My=["collectionGroup","readTime","prefixPath","documentId"],Di="remoteDocumentGlobal",sl="remoteDocumentGlobalKey",fs="targets",Zf="queryTargetsIndex",Fy=["canonicalId","targetId"],_s="targetDocuments",Ly=["targetId","path"],$l="documentTargetsIndex",Uy=["path","targetId"],so="targetGlobalKey",wn="targetGlobal",ki="collectionParents",By=["collectionId","parent"],ps="clientMetadata",qy="clientId",Lo="bundles",jy="bundleId",Uo="namedQueries",Gy="name",Ql="indexConfiguration",zy="indexId",il="collectionGroupIndex",Ky="collectionGroup",yi="indexState",Wy=["indexId","uid"],e_="sequenceNumberIndex",$y=["uid","sequenceNumber"],Ei="indexEntries",Qy=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],t_="documentKeyIndex",Hy=["indexId","uid","orderedDocumentKey"],Bo="documentOverlays",Yy=["userId","collectionPath","documentId"],rl="collectionPathOverlayIndex",Xy=["userId","collectionPath","largestBatchId"],n_="collectionGroupOverlayIndex",Jy=["userId","collectionGroup","largestBatchId"],Hl="globals",Zy="name",s_=[Ni,rt,ds,_n,fs,Xi,wn,_s,ps,Di,ki,Lo,Uo],eE=[...s_,Bo],i_=[Ni,rt,ds,no,fs,Xi,wn,_s,ps,Di,ki,Lo,Uo,Bo],r_=i_,Yl=[...r_,Ql,yi,Ei],tE=Yl,o_=[...Yl,Hl],nE=o_;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ol extends Qf{constructor(e,t){super(),this.ce=e,this.currentSequenceNumber=t}}function Ae(s,e){const t=L(s);return zt.N(t.ce,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bh(s){let e=0;for(const t in s)Object.prototype.hasOwnProperty.call(s,t)&&e++;return e}function rn(s,e){for(const t in s)Object.prototype.hasOwnProperty.call(s,t)&&e(t,s[t])}function a_(s){for(const e in s)if(Object.prototype.hasOwnProperty.call(s,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let _e=class al{constructor(e,t){this.comparator=e,this.root=t||Kt.EMPTY}insert(e,t){return new al(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Kt.BLACK,null,null))}remove(e){return new al(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Kt.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const n=this.comparator(e,t.key);if(n===0)return t.value;n<0?t=t.left:n>0&&(t=t.right)}return null}indexOf(e){let t=0,n=this.root;for(;!n.isEmpty();){const i=this.comparator(e,n.key);if(i===0)return t+n.left.size;i<0?n=n.left:(t+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,n)=>(e(t,n),!1))}toString(){const e=[];return this.inorderTraversal((t,n)=>(e.push(`${t}:${n}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new Vr(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new Vr(this.root,e,this.comparator,!1)}getReverseIterator(){return new Vr(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new Vr(this.root,e,this.comparator,!0)}},Vr=class{constructor(e,t,n,i){this.isReverse=i,this.nodeStack=[];let r=1;for(;!e.isEmpty();)if(r=t?n(e.key,t):1,t&&i&&(r*=-1),r<0)e=this.isReverse?e.left:e.right;else{if(r===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}},Kt=class Tt{constructor(e,t,n,i,r){this.key=e,this.value=t,this.color=n??Tt.RED,this.left=i??Tt.EMPTY,this.right=r??Tt.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,n,i,r){return new Tt(e??this.key,t??this.value,n??this.color,i??this.left,r??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let i=this;const r=n(e,i.key);return i=r<0?i.copy(null,null,null,i.left.insert(e,t,n),null):r===0?i.copy(null,t,null,null,null):i.copy(null,null,null,null,i.right.insert(e,t,n)),i.fixUp()}removeMin(){if(this.left.isEmpty())return Tt.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let n,i=this;if(t(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),t(e,i.key)===0){if(i.right.isEmpty())return Tt.EMPTY;n=i.right.min(),i=i.copy(n.key,n.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Tt.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Tt.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw F(43730,{key:this.key,value:this.value});if(this.right.isRed())throw F(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw F(27949);return e+(this.isRed()?0:1)}};Kt.EMPTY=null,Kt.RED=!0,Kt.BLACK=!1;Kt.EMPTY=new class{constructor(){this.size=0}get key(){throw F(57766)}get value(){throw F(16141)}get color(){throw F(16727)}get left(){throw F(29726)}get right(){throw F(36894)}copy(e,t,n,i,r){return this}insert(e,t,n){return new Kt(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class re{constructor(e){this.comparator=e,this.data=new _e(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,n)=>(e(t),!1))}forEachInRange(e,t){const n=this.data.getIteratorFrom(e[0]);for(;n.hasNext();){const i=n.getNext();if(this.comparator(i.key,e[1])>=0)return;t(i.key)}}forEachWhile(e,t){let n;for(n=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();n.hasNext();)if(!e(n.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Vh(this.data.getIterator())}getIteratorFrom(e){return new Vh(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(n=>{t=t.add(n)}),t}isEqual(e){if(!(e instanceof re)||this.size!==e.size)return!1;const t=this.data.getIterator(),n=e.data.getIterator();for(;t.hasNext();){const i=t.getNext().key,r=n.getNext().key;if(this.comparator(i,r)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new re(this.comparator);return t.data=e,t}}class Vh{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function Wn(s){return s.hasNext()?s.getNext():void 0}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class We{constructor(e){this.fields=e,e.sort(fe.comparator)}static empty(){return new We([])}unionWith(e){let t=new re(fe.comparator);for(const n of this.fields)t=t.add(n);for(const n of e)t=t.add(n);return new We(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return cs(this.fields,e.fields,(t,n)=>t.isEqual(n))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class l_ extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ie{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(i){try{return atob(i)}catch(r){throw typeof DOMException<"u"&&r instanceof DOMException?new l_("Invalid base64 string: "+r):r}}(e);return new Ie(t)}static fromUint8Array(e){const t=function(i){let r="";for(let o=0;o<i.length;++o)r+=String.fromCharCode(i[o]);return r}(e);return new Ie(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const n=new Uint8Array(t.length);for(let i=0;i<t.length;i++)n[i]=t.charCodeAt(i);return n}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return G(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Ie.EMPTY_BYTE_STRING=new Ie("");const sE=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function St(s){if(U(!!s,39018),typeof s=="string"){let e=0;const t=sE.exec(s);if(U(!!t,46558,{timestamp:s}),t[1]){let i=t[1];i=(i+"000000000").substr(0,9),e=Number(i)}const n=new Date(s);return{seconds:Math.floor(n.getTime()/1e3),nanos:e}}return{seconds:de(s.seconds),nanos:de(s.nanos)}}function de(s){return typeof s=="number"?s:typeof s=="string"?Number(s):0}function Pt(s){return typeof s=="string"?Ie.fromBase64String(s):Ie.fromUint8Array(s)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const u_="server_timestamp",c_="__type__",h_="__previous_value__",d_="__local_write_time__";function Xl(s){var e,t;return((t=(((e=s==null?void 0:s.mapValue)===null||e===void 0?void 0:e.fields)||{})[c_])===null||t===void 0?void 0:t.stringValue)===u_}function qo(s){const e=s.mapValue.fields[h_];return Xl(e)?qo(e):e}function Oi(s){const e=St(s.mapValue.fields[d_].timestampValue);return new se(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iE{constructor(e,t,n,i,r,o,l,u,c,f){this.databaseId=e,this.appId=t,this.persistenceKey=n,this.host=i,this.ssl=r,this.forceLongPolling=o,this.autoDetectLongPolling=l,this.longPollingOptions=u,this.useFetchStreams=c,this.isUsingEmulator=f}}const io="(default)";class Pn{constructor(e,t){this.projectId=e,this.database=t||io}static empty(){return new Pn("","")}get isDefaultDatabase(){return this.database===io}isEqual(e){return e instanceof Pn&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jl="__type__",f_="__max__",jt={mapValue:{fields:{__type__:{stringValue:f_}}}},Zl="__vector__",ms="value",jr={nullValue:"NULL_VALUE"};function Ht(s){return"nullValue"in s?0:"booleanValue"in s?1:"integerValue"in s||"doubleValue"in s?2:"timestampValue"in s?3:"stringValue"in s?5:"bytesValue"in s?6:"referenceValue"in s?7:"geoPointValue"in s?8:"arrayValue"in s?9:"mapValue"in s?Xl(s)?4:__(s)?9007199254740991:jo(s)?10:11:F(28295,{value:s})}function yt(s,e){if(s===e)return!0;const t=Ht(s);if(t!==Ht(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return s.booleanValue===e.booleanValue;case 4:return Oi(s).isEqual(Oi(e));case 3:return function(i,r){if(typeof i.timestampValue=="string"&&typeof r.timestampValue=="string"&&i.timestampValue.length===r.timestampValue.length)return i.timestampValue===r.timestampValue;const o=St(i.timestampValue),l=St(r.timestampValue);return o.seconds===l.seconds&&o.nanos===l.nanos}(s,e);case 5:return s.stringValue===e.stringValue;case 6:return function(i,r){return Pt(i.bytesValue).isEqual(Pt(r.bytesValue))}(s,e);case 7:return s.referenceValue===e.referenceValue;case 8:return function(i,r){return de(i.geoPointValue.latitude)===de(r.geoPointValue.latitude)&&de(i.geoPointValue.longitude)===de(r.geoPointValue.longitude)}(s,e);case 2:return function(i,r){if("integerValue"in i&&"integerValue"in r)return de(i.integerValue)===de(r.integerValue);if("doubleValue"in i&&"doubleValue"in r){const o=de(i.doubleValue),l=de(r.doubleValue);return o===l?xi(o)===xi(l):isNaN(o)&&isNaN(l)}return!1}(s,e);case 9:return cs(s.arrayValue.values||[],e.arrayValue.values||[],yt);case 10:case 11:return function(i,r){const o=i.mapValue.fields||{},l=r.mapValue.fields||{};if(bh(o)!==bh(l))return!1;for(const u in o)if(o.hasOwnProperty(u)&&(l[u]===void 0||!yt(o[u],l[u])))return!1;return!0}(s,e);default:return F(52216,{left:s})}}function Mi(s,e){return(s.values||[]).find(t=>yt(t,e))!==void 0}function Yt(s,e){if(s===e)return 0;const t=Ht(s),n=Ht(e);if(t!==n)return G(t,n);switch(t){case 0:case 9007199254740991:return 0;case 1:return G(s.booleanValue,e.booleanValue);case 2:return function(r,o){const l=de(r.integerValue||r.doubleValue),u=de(o.integerValue||o.doubleValue);return l<u?-1:l>u?1:l===u?0:isNaN(l)?isNaN(u)?0:-1:1}(s,e);case 3:return xh(s.timestampValue,e.timestampValue);case 4:return xh(Oi(s),Oi(e));case 5:return tl(s.stringValue,e.stringValue);case 6:return function(r,o){const l=Pt(r),u=Pt(o);return l.compareTo(u)}(s.bytesValue,e.bytesValue);case 7:return function(r,o){const l=r.split("/"),u=o.split("/");for(let c=0;c<l.length&&c<u.length;c++){const f=G(l[c],u[c]);if(f!==0)return f}return G(l.length,u.length)}(s.referenceValue,e.referenceValue);case 8:return function(r,o){const l=G(de(r.latitude),de(o.latitude));return l!==0?l:G(de(r.longitude),de(o.longitude))}(s.geoPointValue,e.geoPointValue);case 9:return Nh(s.arrayValue,e.arrayValue);case 10:return function(r,o){var l,u,c,f;const _=r.fields||{},m=o.fields||{},I=(l=_[ms])===null||l===void 0?void 0:l.arrayValue,S=(u=m[ms])===null||u===void 0?void 0:u.arrayValue,V=G(((c=I==null?void 0:I.values)===null||c===void 0?void 0:c.length)||0,((f=S==null?void 0:S.values)===null||f===void 0?void 0:f.length)||0);return V!==0?V:Nh(I,S)}(s.mapValue,e.mapValue);case 11:return function(r,o){if(r===jt.mapValue&&o===jt.mapValue)return 0;if(r===jt.mapValue)return 1;if(o===jt.mapValue)return-1;const l=r.fields||{},u=Object.keys(l),c=o.fields||{},f=Object.keys(c);u.sort(),f.sort();for(let _=0;_<u.length&&_<f.length;++_){const m=tl(u[_],f[_]);if(m!==0)return m;const I=Yt(l[u[_]],c[f[_]]);if(I!==0)return I}return G(u.length,f.length)}(s.mapValue,e.mapValue);default:throw F(23264,{le:t})}}function xh(s,e){if(typeof s=="string"&&typeof e=="string"&&s.length===e.length)return G(s,e);const t=St(s),n=St(e),i=G(t.seconds,n.seconds);return i!==0?i:G(t.nanos,n.nanos)}function Nh(s,e){const t=s.values||[],n=e.values||[];for(let i=0;i<t.length&&i<n.length;++i){const r=Yt(t[i],n[i]);if(r)return r}return G(t.length,n.length)}function gs(s){return ll(s)}function ll(s){return"nullValue"in s?"null":"booleanValue"in s?""+s.booleanValue:"integerValue"in s?""+s.integerValue:"doubleValue"in s?""+s.doubleValue:"timestampValue"in s?function(t){const n=St(t);return`time(${n.seconds},${n.nanos})`}(s.timestampValue):"stringValue"in s?s.stringValue:"bytesValue"in s?function(t){return Pt(t).toBase64()}(s.bytesValue):"referenceValue"in s?function(t){return M.fromName(t).toString()}(s.referenceValue):"geoPointValue"in s?function(t){return`geo(${t.latitude},${t.longitude})`}(s.geoPointValue):"arrayValue"in s?function(t){let n="[",i=!0;for(const r of t.values||[])i?i=!1:n+=",",n+=ll(r);return n+"]"}(s.arrayValue):"mapValue"in s?function(t){const n=Object.keys(t.fields||{}).sort();let i="{",r=!0;for(const o of n)r?r=!1:i+=",",i+=`${o}:${ll(t.fields[o])}`;return i+"}"}(s.mapValue):F(61005,{value:s})}function Gr(s){switch(Ht(s)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=qo(s);return e?16+Gr(e):16;case 5:return 2*s.stringValue.length;case 6:return Pt(s.bytesValue).approximateByteSize();case 7:return s.referenceValue.length;case 9:return function(n){return(n.values||[]).reduce((i,r)=>i+Gr(r),0)}(s.arrayValue);case 10:case 11:return function(n){let i=0;return rn(n.fields,(r,o)=>{i+=r.length+Gr(o)}),i}(s.mapValue);default:throw F(13486,{value:s})}}function Fi(s,e){return{referenceValue:`projects/${s.projectId}/databases/${s.database}/documents/${e.path.canonicalString()}`}}function ul(s){return!!s&&"integerValue"in s}function Li(s){return!!s&&"arrayValue"in s}function Dh(s){return!!s&&"nullValue"in s}function kh(s){return!!s&&"doubleValue"in s&&isNaN(Number(s.doubleValue))}function zr(s){return!!s&&"mapValue"in s}function jo(s){var e,t;return((t=(((e=s==null?void 0:s.mapValue)===null||e===void 0?void 0:e.fields)||{})[Jl])===null||t===void 0?void 0:t.stringValue)===Zl}function Ii(s){if(s.geoPointValue)return{geoPointValue:Object.assign({},s.geoPointValue)};if(s.timestampValue&&typeof s.timestampValue=="object")return{timestampValue:Object.assign({},s.timestampValue)};if(s.mapValue){const e={mapValue:{fields:{}}};return rn(s.mapValue.fields,(t,n)=>e.mapValue.fields[t]=Ii(n)),e}if(s.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(s.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Ii(s.arrayValue.values[t]);return e}return Object.assign({},s)}function __(s){return(((s.mapValue||{}).fields||{}).__type__||{}).stringValue===f_}const p_={mapValue:{fields:{[Jl]:{stringValue:Zl},[ms]:{arrayValue:{}}}}};function rE(s){return"nullValue"in s?jr:"booleanValue"in s?{booleanValue:!1}:"integerValue"in s||"doubleValue"in s?{doubleValue:NaN}:"timestampValue"in s?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in s?{stringValue:""}:"bytesValue"in s?{bytesValue:""}:"referenceValue"in s?Fi(Pn.empty(),M.empty()):"geoPointValue"in s?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in s?{arrayValue:{}}:"mapValue"in s?jo(s)?p_:{mapValue:{}}:F(35942,{value:s})}function oE(s){return"nullValue"in s?{booleanValue:!1}:"booleanValue"in s?{doubleValue:NaN}:"integerValue"in s||"doubleValue"in s?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in s?{stringValue:""}:"stringValue"in s?{bytesValue:""}:"bytesValue"in s?Fi(Pn.empty(),M.empty()):"referenceValue"in s?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in s?{arrayValue:{}}:"arrayValue"in s?p_:"mapValue"in s?jo(s)?{mapValue:{}}:jt:F(61959,{value:s})}function Oh(s,e){const t=Yt(s.value,e.value);return t!==0?t:s.inclusive&&!e.inclusive?-1:!s.inclusive&&e.inclusive?1:0}function Mh(s,e){const t=Yt(s.value,e.value);return t!==0?t:s.inclusive&&!e.inclusive?1:!s.inclusive&&e.inclusive?-1:0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ue{constructor(e){this.value=e}static empty(){return new Ue({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let n=0;n<e.length-1;++n)if(t=(t.mapValue.fields||{})[e.get(n)],!zr(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Ii(t)}setAll(e){let t=fe.emptyPath(),n={},i=[];e.forEach((o,l)=>{if(!t.isImmediateParentOf(l)){const u=this.getFieldsMap(t);this.applyChanges(u,n,i),n={},i=[],t=l.popLast()}o?n[l.lastSegment()]=Ii(o):i.push(l.lastSegment())});const r=this.getFieldsMap(t);this.applyChanges(r,n,i)}delete(e){const t=this.field(e.popLast());zr(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return yt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let n=0;n<e.length;++n){let i=t.mapValue.fields[e.get(n)];zr(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},t.mapValue.fields[e.get(n)]=i),t=i}return t.mapValue.fields}applyChanges(e,t,n){rn(t,(i,r)=>e[i]=r);for(const i of n)delete e[i]}clone(){return new Ue(Ii(this.value))}}function m_(s){const e=[];return rn(s.fields,(t,n)=>{const i=new fe([t]);if(zr(n)){const r=m_(n.mapValue).fields;if(r.length===0)e.push(i);else for(const o of r)e.push(i.child(o))}else e.push(i)}),new We(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class me{constructor(e,t,n,i,r,o,l){this.key=e,this.documentType=t,this.version=n,this.readTime=i,this.createTime=r,this.data=o,this.documentState=l}static newInvalidDocument(e){return new me(e,0,q.min(),q.min(),q.min(),Ue.empty(),0)}static newFoundDocument(e,t,n,i){return new me(e,1,t,q.min(),n,i,0)}static newNoDocument(e,t){return new me(e,2,t,q.min(),q.min(),Ue.empty(),0)}static newUnknownDocument(e,t){return new me(e,3,t,q.min(),q.min(),Ue.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(q.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Ue.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Ue.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=q.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof me&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new me(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ys{constructor(e,t){this.position=e,this.inclusive=t}}function Fh(s,e,t){let n=0;for(let i=0;i<s.position.length;i++){const r=e[i],o=s.position[i];if(r.field.isKeyField()?n=M.comparator(M.fromName(o.referenceValue),t.key):n=Yt(o,t.data.field(r.field)),r.dir==="desc"&&(n*=-1),n!==0)break}return n}function Lh(s,e){if(s===null)return e===null;if(e===null||s.inclusive!==e.inclusive||s.position.length!==e.position.length)return!1;for(let t=0;t<s.position.length;t++)if(!yt(s.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ui{constructor(e,t="asc"){this.field=e,this.dir=t}}function aE(s,e){return s.dir===e.dir&&s.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class g_{}class Y extends g_{constructor(e,t,n){super(),this.field=e,this.op=t,this.value=n}static create(e,t,n){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,n):new lE(e,t,n):t==="array-contains"?new hE(e,n):t==="in"?new w_(e,n):t==="not-in"?new dE(e,n):t==="array-contains-any"?new fE(e,n):new Y(e,t,n)}static createKeyFieldInFilter(e,t,n){return t==="in"?new uE(e,n):new cE(e,n)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(Yt(t,this.value)):t!==null&&Ht(this.value)===Ht(t)&&this.matchesComparison(Yt(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return F(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class ie extends g_{constructor(e,t){super(),this.filters=e,this.op=t,this.he=null}static create(e,t){return new ie(e,t)}matches(e){return Es(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.he!==null||(this.he=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.he}getFilters(){return Object.assign([],this.filters)}}function Es(s){return s.op==="and"}function cl(s){return s.op==="or"}function eu(s){return y_(s)&&Es(s)}function y_(s){for(const e of s.filters)if(e instanceof ie)return!1;return!0}function hl(s){if(s instanceof Y)return s.field.canonicalString()+s.op.toString()+gs(s.value);if(eu(s))return s.filters.map(e=>hl(e)).join(",");{const e=s.filters.map(t=>hl(t)).join(",");return`${s.op}(${e})`}}function E_(s,e){return s instanceof Y?function(n,i){return i instanceof Y&&n.op===i.op&&n.field.isEqual(i.field)&&yt(n.value,i.value)}(s,e):s instanceof ie?function(n,i){return i instanceof ie&&n.op===i.op&&n.filters.length===i.filters.length?n.filters.reduce((r,o,l)=>r&&E_(o,i.filters[l]),!0):!1}(s,e):void F(19439)}function I_(s,e){const t=s.filters.concat(e);return ie.create(t,s.op)}function v_(s){return s instanceof Y?function(t){return`${t.field.canonicalString()} ${t.op} ${gs(t.value)}`}(s):s instanceof ie?function(t){return t.op.toString()+" {"+t.getFilters().map(v_).join(" ,")+"}"}(s):"Filter"}class lE extends Y{constructor(e,t,n){super(e,t,n),this.key=M.fromName(n.referenceValue)}matches(e){const t=M.comparator(e.key,this.key);return this.matchesComparison(t)}}class uE extends Y{constructor(e,t){super(e,"in",t),this.keys=T_("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class cE extends Y{constructor(e,t){super(e,"not-in",t),this.keys=T_("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function T_(s,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(n=>M.fromName(n.referenceValue))}class hE extends Y{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Li(t)&&Mi(t.arrayValue,this.value)}}class w_ extends Y{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Mi(this.value.arrayValue,t)}}class dE extends Y{constructor(e,t){super(e,"not-in",t)}matches(e){if(Mi(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!Mi(this.value.arrayValue,t)}}class fE extends Y{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Li(t)||!t.arrayValue.values)&&t.arrayValue.values.some(n=>Mi(this.value.arrayValue,n))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _E{constructor(e,t=null,n=[],i=[],r=null,o=null,l=null){this.path=e,this.collectionGroup=t,this.orderBy=n,this.filters=i,this.limit=r,this.startAt=o,this.endAt=l,this.Pe=null}}function dl(s,e=null,t=[],n=[],i=null,r=null,o=null){return new _E(s,e,t,n,i,r,o)}function bn(s){const e=L(s);if(e.Pe===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(n=>hl(n)).join(","),t+="|ob:",t+=e.orderBy.map(n=>function(r){return r.field.canonicalString()+r.dir}(n)).join(","),Fo(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(n=>gs(n)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(n=>gs(n)).join(",")),e.Pe=t}return e.Pe}function Ji(s,e){if(s.limit!==e.limit||s.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<s.orderBy.length;t++)if(!aE(s.orderBy[t],e.orderBy[t]))return!1;if(s.filters.length!==e.filters.length)return!1;for(let t=0;t<s.filters.length;t++)if(!E_(s.filters[t],e.filters[t]))return!1;return s.collectionGroup===e.collectionGroup&&!!s.path.isEqual(e.path)&&!!Lh(s.startAt,e.startAt)&&Lh(s.endAt,e.endAt)}function ro(s){return M.isDocumentKey(s.path)&&s.collectionGroup===null&&s.filters.length===0}function oo(s,e){return s.filters.filter(t=>t instanceof Y&&t.field.isEqual(e))}function Uh(s,e,t){let n=jr,i=!0;for(const r of oo(s,e)){let o=jr,l=!0;switch(r.op){case"<":case"<=":o=rE(r.value);break;case"==":case"in":case">=":o=r.value;break;case">":o=r.value,l=!1;break;case"!=":case"not-in":o=jr}Oh({value:n,inclusive:i},{value:o,inclusive:l})<0&&(n=o,i=l)}if(t!==null){for(let r=0;r<s.orderBy.length;++r)if(s.orderBy[r].field.isEqual(e)){const o=t.position[r];Oh({value:n,inclusive:i},{value:o,inclusive:t.inclusive})<0&&(n=o,i=t.inclusive);break}}return{value:n,inclusive:i}}function Bh(s,e,t){let n=jt,i=!0;for(const r of oo(s,e)){let o=jt,l=!0;switch(r.op){case">=":case">":o=oE(r.value),l=!1;break;case"==":case"in":case"<=":o=r.value;break;case"<":o=r.value,l=!1;break;case"!=":case"not-in":o=jt}Mh({value:n,inclusive:i},{value:o,inclusive:l})>0&&(n=o,i=l)}if(t!==null){for(let r=0;r<s.orderBy.length;++r)if(s.orderBy[r].field.isEqual(e)){const o=t.position[r];Mh({value:n,inclusive:i},{value:o,inclusive:t.inclusive})>0&&(n=o,i=t.inclusive);break}}return{value:n,inclusive:i}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ns{constructor(e,t=null,n=[],i=[],r=null,o="F",l=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=n,this.filters=i,this.limit=r,this.limitType=o,this.startAt=l,this.endAt=u,this.Te=null,this.Ie=null,this.de=null,this.startAt,this.endAt}}function A_(s,e,t,n,i,r,o,l){return new Ns(s,e,t,n,i,r,o,l)}function Go(s){return new Ns(s)}function qh(s){return s.filters.length===0&&s.limit===null&&s.startAt==null&&s.endAt==null&&(s.explicitOrderBy.length===0||s.explicitOrderBy.length===1&&s.explicitOrderBy[0].field.isKeyField())}function R_(s){return s.collectionGroup!==null}function vi(s){const e=L(s);if(e.Te===null){e.Te=[];const t=new Set;for(const r of e.explicitOrderBy)e.Te.push(r),t.add(r.field.canonicalString());const n=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let l=new re(fe.comparator);return o.filters.forEach(u=>{u.getFlattenedFilters().forEach(c=>{c.isInequality()&&(l=l.add(c.field))})}),l})(e).forEach(r=>{t.has(r.canonicalString())||r.isKeyField()||e.Te.push(new Ui(r,n))}),t.has(fe.keyField().canonicalString())||e.Te.push(new Ui(fe.keyField(),n))}return e.Te}function et(s){const e=L(s);return e.Ie||(e.Ie=pE(e,vi(s))),e.Ie}function pE(s,e){if(s.limitType==="F")return dl(s.path,s.collectionGroup,e,s.filters,s.limit,s.startAt,s.endAt);{e=e.map(i=>{const r=i.dir==="desc"?"asc":"desc";return new Ui(i.field,r)});const t=s.endAt?new ys(s.endAt.position,s.endAt.inclusive):null,n=s.startAt?new ys(s.startAt.position,s.startAt.inclusive):null;return dl(s.path,s.collectionGroup,e,s.filters,s.limit,t,n)}}function fl(s,e){const t=s.filters.concat([e]);return new Ns(s.path,s.collectionGroup,s.explicitOrderBy.slice(),t,s.limit,s.limitType,s.startAt,s.endAt)}function ao(s,e,t){return new Ns(s.path,s.collectionGroup,s.explicitOrderBy.slice(),s.filters.slice(),e,t,s.startAt,s.endAt)}function zo(s,e){return Ji(et(s),et(e))&&s.limitType===e.limitType}function C_(s){return`${bn(et(s))}|lt:${s.limitType}`}function Zn(s){return`Query(target=${function(t){let n=t.path.canonicalString();return t.collectionGroup!==null&&(n+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(n+=`, filters: [${t.filters.map(i=>v_(i)).join(", ")}]`),Fo(t.limit)||(n+=", limit: "+t.limit),t.orderBy.length>0&&(n+=`, orderBy: [${t.orderBy.map(i=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(i)).join(", ")}]`),t.startAt&&(n+=", startAt: ",n+=t.startAt.inclusive?"b:":"a:",n+=t.startAt.position.map(i=>gs(i)).join(",")),t.endAt&&(n+=", endAt: ",n+=t.endAt.inclusive?"a:":"b:",n+=t.endAt.position.map(i=>gs(i)).join(",")),`Target(${n})`}(et(s))}; limitType=${s.limitType})`}function Zi(s,e){return e.isFoundDocument()&&function(n,i){const r=i.key.path;return n.collectionGroup!==null?i.key.hasCollectionId(n.collectionGroup)&&n.path.isPrefixOf(r):M.isDocumentKey(n.path)?n.path.isEqual(r):n.path.isImmediateParentOf(r)}(s,e)&&function(n,i){for(const r of vi(n))if(!r.field.isKeyField()&&i.data.field(r.field)===null)return!1;return!0}(s,e)&&function(n,i){for(const r of n.filters)if(!r.matches(i))return!1;return!0}(s,e)&&function(n,i){return!(n.startAt&&!function(o,l,u){const c=Fh(o,l,u);return o.inclusive?c<=0:c<0}(n.startAt,vi(n),i)||n.endAt&&!function(o,l,u){const c=Fh(o,l,u);return o.inclusive?c>=0:c>0}(n.endAt,vi(n),i))}(s,e)}function S_(s){return s.collectionGroup||(s.path.length%2==1?s.path.lastSegment():s.path.get(s.path.length-2))}function P_(s){return(e,t)=>{let n=!1;for(const i of vi(s)){const r=mE(i,e,t);if(r!==0)return r;n=n||i.field.isKeyField()}return 0}}function mE(s,e,t){const n=s.field.isKeyField()?M.comparator(e.key,t.key):function(r,o,l){const u=o.data.field(r),c=l.data.field(r);return u!==null&&c!==null?Yt(u,c):F(42886)}(s.field,e,t);switch(s.dir){case"asc":return n;case"desc":return-1*n;default:return F(19790,{direction:s.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xt{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),n=this.inner[t];if(n!==void 0){for(const[i,r]of n)if(this.equalsFn(i,e))return r}}has(e){return this.get(e)!==void 0}set(e,t){const n=this.mapKeyFn(e),i=this.inner[n];if(i===void 0)return this.inner[n]=[[e,t]],void this.innerSize++;for(let r=0;r<i.length;r++)if(this.equalsFn(i[r][0],e))return void(i[r]=[e,t]);i.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),n=this.inner[t];if(n===void 0)return!1;for(let i=0;i<n.length;i++)if(this.equalsFn(n[i][0],e))return n.length===1?delete this.inner[t]:n.splice(i,1),this.innerSize--,!0;return!1}forEach(e){rn(this.inner,(t,n)=>{for(const[i,r]of n)e(i,r)})}isEmpty(){return a_(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gE=new _e(M.comparator);function Ze(){return gE}const b_=new _e(M.comparator);function di(...s){let e=b_;for(const t of s)e=e.insert(t.key,t);return e}function V_(s){let e=b_;return s.forEach((t,n)=>e=e.insert(t,n.overlayedDocument)),e}function pt(){return Ti()}function x_(){return Ti()}function Ti(){return new xt(s=>s.toString(),(s,e)=>s.isEqual(e))}const yE=new _e(M.comparator),EE=new re(M.comparator);function W(...s){let e=EE;for(const t of s)e=e.add(t);return e}const IE=new re(G);function tu(){return IE}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nu(s,e){if(s.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:xi(e)?"-0":e}}function N_(s){return{integerValue:""+s}}function vE(s,e){return Yf(e)?N_(e):nu(s,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ko{constructor(){this._=void 0}}function TE(s,e,t){return s instanceof Is?function(i,r){const o={fields:{[c_]:{stringValue:u_},[d_]:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return r&&Xl(r)&&(r=qo(r)),r&&(o.fields[h_]=r),{mapValue:o}}(t,e):s instanceof vs?k_(s,e):s instanceof Ts?O_(s,e):function(i,r){const o=D_(i,r),l=jh(o)+jh(i.Ee);return ul(o)&&ul(i.Ee)?N_(l):nu(i.serializer,l)}(s,e)}function wE(s,e,t){return s instanceof vs?k_(s,e):s instanceof Ts?O_(s,e):t}function D_(s,e){return s instanceof Bi?function(n){return ul(n)||function(r){return!!r&&"doubleValue"in r}(n)}(e)?e:{integerValue:0}:null}class Is extends Ko{}class vs extends Ko{constructor(e){super(),this.elements=e}}function k_(s,e){const t=M_(e);for(const n of s.elements)t.some(i=>yt(i,n))||t.push(n);return{arrayValue:{values:t}}}class Ts extends Ko{constructor(e){super(),this.elements=e}}function O_(s,e){let t=M_(e);for(const n of s.elements)t=t.filter(i=>!yt(i,n));return{arrayValue:{values:t}}}class Bi extends Ko{constructor(e,t){super(),this.serializer=e,this.Ee=t}}function jh(s){return de(s.integerValue||s.doubleValue)}function M_(s){return Li(s)&&s.arrayValue.values?s.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class F_{constructor(e,t){this.field=e,this.transform=t}}function AE(s,e){return s.field.isEqual(e.field)&&function(n,i){return n instanceof vs&&i instanceof vs||n instanceof Ts&&i instanceof Ts?cs(n.elements,i.elements,yt):n instanceof Bi&&i instanceof Bi?yt(n.Ee,i.Ee):n instanceof Is&&i instanceof Is}(s.transform,e.transform)}class RE{constructor(e,t){this.version=e,this.transformResults=t}}class Be{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Be}static exists(e){return new Be(void 0,e)}static updateTime(e){return new Be(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Kr(s,e){return s.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(s.updateTime):s.exists===void 0||s.exists===e.isFoundDocument()}class Wo{}function L_(s,e){if(!s.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return s.isNoDocument()?new $o(s.key,Be.none()):new Ds(s.key,s.data,Be.none());{const t=s.data,n=Ue.empty();let i=new re(fe.comparator);for(let r of e.fields)if(!i.has(r)){let o=t.field(r);o===null&&r.length>1&&(r=r.popLast(),o=t.field(r)),o===null?n.delete(r):n.set(r,o),i=i.add(r)}return new Nt(s.key,n,new We(i.toArray()),Be.none())}}function CE(s,e,t){s instanceof Ds?function(i,r,o){const l=i.value.clone(),u=zh(i.fieldTransforms,r,o.transformResults);l.setAll(u),r.convertToFoundDocument(o.version,l).setHasCommittedMutations()}(s,e,t):s instanceof Nt?function(i,r,o){if(!Kr(i.precondition,r))return void r.convertToUnknownDocument(o.version);const l=zh(i.fieldTransforms,r,o.transformResults),u=r.data;u.setAll(U_(i)),u.setAll(l),r.convertToFoundDocument(o.version,u).setHasCommittedMutations()}(s,e,t):function(i,r,o){r.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,t)}function wi(s,e,t,n){return s instanceof Ds?function(r,o,l,u){if(!Kr(r.precondition,o))return l;const c=r.value.clone(),f=Kh(r.fieldTransforms,u,o);return c.setAll(f),o.convertToFoundDocument(o.version,c).setHasLocalMutations(),null}(s,e,t,n):s instanceof Nt?function(r,o,l,u){if(!Kr(r.precondition,o))return l;const c=Kh(r.fieldTransforms,u,o),f=o.data;return f.setAll(U_(r)),f.setAll(c),o.convertToFoundDocument(o.version,f).setHasLocalMutations(),l===null?null:l.unionWith(r.fieldMask.fields).unionWith(r.fieldTransforms.map(_=>_.field))}(s,e,t,n):function(r,o,l){return Kr(r.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):l}(s,e,t)}function SE(s,e){let t=null;for(const n of s.fieldTransforms){const i=e.data.field(n.field),r=D_(n.transform,i||null);r!=null&&(t===null&&(t=Ue.empty()),t.set(n.field,r))}return t||null}function Gh(s,e){return s.type===e.type&&!!s.key.isEqual(e.key)&&!!s.precondition.isEqual(e.precondition)&&!!function(n,i){return n===void 0&&i===void 0||!(!n||!i)&&cs(n,i,(r,o)=>AE(r,o))}(s.fieldTransforms,e.fieldTransforms)&&(s.type===0?s.value.isEqual(e.value):s.type!==1||s.data.isEqual(e.data)&&s.fieldMask.isEqual(e.fieldMask))}class Ds extends Wo{constructor(e,t,n,i=[]){super(),this.key=e,this.value=t,this.precondition=n,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class Nt extends Wo{constructor(e,t,n,i,r=[]){super(),this.key=e,this.data=t,this.fieldMask=n,this.precondition=i,this.fieldTransforms=r,this.type=1}getFieldMask(){return this.fieldMask}}function U_(s){const e=new Map;return s.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const n=s.data.field(t);e.set(t,n)}}),e}function zh(s,e,t){const n=new Map;U(s.length===t.length,32656,{Ae:t.length,Re:s.length});for(let i=0;i<t.length;i++){const r=s[i],o=r.transform,l=e.data.field(r.field);n.set(r.field,wE(o,l,t[i]))}return n}function Kh(s,e,t){const n=new Map;for(const i of s){const r=i.transform,o=t.data.field(i.field);n.set(i.field,TE(r,o,e))}return n}class $o extends Wo{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class B_ extends Wo{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class su{constructor(e,t,n,i){this.batchId=e,this.localWriteTime=t,this.baseMutations=n,this.mutations=i}applyToRemoteDocument(e,t){const n=t.mutationResults;for(let i=0;i<this.mutations.length;i++){const r=this.mutations[i];r.key.isEqual(e.key)&&CE(r,e,n[i])}}applyToLocalView(e,t){for(const n of this.baseMutations)n.key.isEqual(e.key)&&(t=wi(n,e,t,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(e.key)&&(t=wi(n,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const n=x_();return this.mutations.forEach(i=>{const r=e.get(i.key),o=r.overlayedDocument;let l=this.applyToLocalView(o,r.mutatedFields);l=t.has(i.key)?null:l;const u=L_(o,l);u!==null&&n.set(i.key,u),o.isValidDocument()||o.convertToNoDocument(q.min())}),n}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),W())}isEqual(e){return this.batchId===e.batchId&&cs(this.mutations,e.mutations,(t,n)=>Gh(t,n))&&cs(this.baseMutations,e.baseMutations,(t,n)=>Gh(t,n))}}class iu{constructor(e,t,n,i){this.batch=e,this.commitVersion=t,this.mutationResults=n,this.docVersions=i}static from(e,t,n){U(e.mutations.length===n.length,58842,{Ve:e.mutations.length,me:n.length});let i=function(){return yE}();const r=e.mutations;for(let o=0;o<r.length;o++)i=i.insert(r[o].key,n[o].version);return new iu(e,t,n,i)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ru{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class PE{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ve,X;function bE(s){switch(s){case b.OK:return F(64938);case b.CANCELLED:case b.UNKNOWN:case b.DEADLINE_EXCEEDED:case b.RESOURCE_EXHAUSTED:case b.INTERNAL:case b.UNAVAILABLE:case b.UNAUTHENTICATED:return!1;case b.INVALID_ARGUMENT:case b.NOT_FOUND:case b.ALREADY_EXISTS:case b.PERMISSION_DENIED:case b.FAILED_PRECONDITION:case b.ABORTED:case b.OUT_OF_RANGE:case b.UNIMPLEMENTED:case b.DATA_LOSS:return!0;default:return F(15467,{code:s})}}function q_(s){if(s===void 0)return ye("GRPC error has no .code"),b.UNKNOWN;switch(s){case ve.OK:return b.OK;case ve.CANCELLED:return b.CANCELLED;case ve.UNKNOWN:return b.UNKNOWN;case ve.DEADLINE_EXCEEDED:return b.DEADLINE_EXCEEDED;case ve.RESOURCE_EXHAUSTED:return b.RESOURCE_EXHAUSTED;case ve.INTERNAL:return b.INTERNAL;case ve.UNAVAILABLE:return b.UNAVAILABLE;case ve.UNAUTHENTICATED:return b.UNAUTHENTICATED;case ve.INVALID_ARGUMENT:return b.INVALID_ARGUMENT;case ve.NOT_FOUND:return b.NOT_FOUND;case ve.ALREADY_EXISTS:return b.ALREADY_EXISTS;case ve.PERMISSION_DENIED:return b.PERMISSION_DENIED;case ve.FAILED_PRECONDITION:return b.FAILED_PRECONDITION;case ve.ABORTED:return b.ABORTED;case ve.OUT_OF_RANGE:return b.OUT_OF_RANGE;case ve.UNIMPLEMENTED:return b.UNIMPLEMENTED;case ve.DATA_LOSS:return b.DATA_LOSS;default:return F(39323,{code:s})}}(X=ve||(ve={}))[X.OK=0]="OK",X[X.CANCELLED=1]="CANCELLED",X[X.UNKNOWN=2]="UNKNOWN",X[X.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",X[X.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",X[X.NOT_FOUND=5]="NOT_FOUND",X[X.ALREADY_EXISTS=6]="ALREADY_EXISTS",X[X.PERMISSION_DENIED=7]="PERMISSION_DENIED",X[X.UNAUTHENTICATED=16]="UNAUTHENTICATED",X[X.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",X[X.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",X[X.ABORTED=10]="ABORTED",X[X.OUT_OF_RANGE=11]="OUT_OF_RANGE",X[X.UNIMPLEMENTED=12]="UNIMPLEMENTED",X[X.INTERNAL=13]="INTERNAL",X[X.UNAVAILABLE=14]="UNAVAILABLE",X[X.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const VE=new Gt([4294967295,4294967295],0);function Wh(s){const e=qf().encode(s),t=new kf;return t.update(e),new Uint8Array(t.digest())}function $h(s){const e=new DataView(s.buffer),t=e.getUint32(0,!0),n=e.getUint32(4,!0),i=e.getUint32(8,!0),r=e.getUint32(12,!0);return[new Gt([t,n],0),new Gt([i,r],0)]}class ou{constructor(e,t,n){if(this.bitmap=e,this.padding=t,this.hashCount=n,t<0||t>=8)throw new fi(`Invalid padding: ${t}`);if(n<0)throw new fi(`Invalid hash count: ${n}`);if(e.length>0&&this.hashCount===0)throw new fi(`Invalid hash count: ${n}`);if(e.length===0&&t!==0)throw new fi(`Invalid padding when bitmap length is 0: ${t}`);this.fe=8*e.length-t,this.ge=Gt.fromNumber(this.fe)}pe(e,t,n){let i=e.add(t.multiply(Gt.fromNumber(n)));return i.compare(VE)===1&&(i=new Gt([i.getBits(0),i.getBits(1)],0)),i.modulo(this.ge).toNumber()}ye(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.fe===0)return!1;const t=Wh(e),[n,i]=$h(t);for(let r=0;r<this.hashCount;r++){const o=this.pe(n,i,r);if(!this.ye(o))return!1}return!0}static create(e,t,n){const i=e%8==0?0:8-e%8,r=new Uint8Array(Math.ceil(e/8)),o=new ou(r,i,t);return n.forEach(l=>o.insert(l)),o}insert(e){if(this.fe===0)return;const t=Wh(e),[n,i]=$h(t);for(let r=0;r<this.hashCount;r++){const o=this.pe(n,i,r);this.we(o)}}we(e){const t=Math.floor(e/8),n=e%8;this.bitmap[t]|=1<<n}}class fi extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class er{constructor(e,t,n,i,r){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=n,this.documentUpdates=i,this.resolvedLimboDocuments=r}static createSynthesizedRemoteEventForCurrentChange(e,t,n){const i=new Map;return i.set(e,tr.createSynthesizedTargetChangeForCurrentChange(e,t,n)),new er(q.min(),i,new _e(G),Ze(),W())}}class tr{constructor(e,t,n,i,r){this.resumeToken=e,this.current=t,this.addedDocuments=n,this.modifiedDocuments=i,this.removedDocuments=r}static createSynthesizedTargetChangeForCurrentChange(e,t,n){return new tr(n,t,W(),W(),W())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wr{constructor(e,t,n,i){this.Se=e,this.removedTargetIds=t,this.key=n,this.be=i}}class j_{constructor(e,t){this.targetId=e,this.De=t}}class G_{constructor(e,t,n=Ie.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=t,this.resumeToken=n,this.cause=i}}class Qh{constructor(){this.ve=0,this.Ce=Hh(),this.Fe=Ie.EMPTY_BYTE_STRING,this.Me=!1,this.xe=!0}get current(){return this.Me}get resumeToken(){return this.Fe}get Oe(){return this.ve!==0}get Ne(){return this.xe}Be(e){e.approximateByteSize()>0&&(this.xe=!0,this.Fe=e)}Le(){let e=W(),t=W(),n=W();return this.Ce.forEach((i,r)=>{switch(r){case 0:e=e.add(i);break;case 2:t=t.add(i);break;case 1:n=n.add(i);break;default:F(38017,{changeType:r})}}),new tr(this.Fe,this.Me,e,t,n)}ke(){this.xe=!1,this.Ce=Hh()}qe(e,t){this.xe=!0,this.Ce=this.Ce.insert(e,t)}Qe(e){this.xe=!0,this.Ce=this.Ce.remove(e)}$e(){this.ve+=1}Ue(){this.ve-=1,U(this.ve>=0,3241,{ve:this.ve})}Ke(){this.xe=!0,this.Me=!0}}class xE{constructor(e){this.We=e,this.Ge=new Map,this.ze=Ze(),this.je=xr(),this.Je=xr(),this.He=new _e(G)}Ye(e){for(const t of e.Se)e.be&&e.be.isFoundDocument()?this.Ze(t,e.be):this.Xe(t,e.key,e.be);for(const t of e.removedTargetIds)this.Xe(t,e.key,e.be)}et(e){this.forEachTarget(e,t=>{const n=this.tt(t);switch(e.state){case 0:this.nt(t)&&n.Be(e.resumeToken);break;case 1:n.Ue(),n.Oe||n.ke(),n.Be(e.resumeToken);break;case 2:n.Ue(),n.Oe||this.removeTarget(t);break;case 3:this.nt(t)&&(n.Ke(),n.Be(e.resumeToken));break;case 4:this.nt(t)&&(this.rt(t),n.Be(e.resumeToken));break;default:F(56790,{state:e.state})}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Ge.forEach((n,i)=>{this.nt(i)&&t(i)})}it(e){const t=e.targetId,n=e.De.count,i=this.st(t);if(i){const r=i.target;if(ro(r))if(n===0){const o=new M(r.path);this.Xe(t,o,me.newNoDocument(o,q.min()))}else U(n===1,20013,{expectedCount:n});else{const o=this.ot(t);if(o!==n){const l=this._t(e),u=l?this.ut(l,e,o):1;if(u!==0){this.rt(t);const c=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.He=this.He.insert(t,c)}}}}}_t(e){const t=e.De.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:n="",padding:i=0},hashCount:r=0}=t;let o,l;try{o=Pt(n).toUint8Array()}catch(u){if(u instanceof l_)return Qt("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{l=new ou(o,i,r)}catch(u){return Qt(u instanceof fi?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return l.fe===0?null:l}ut(e,t,n){return t.De.count===n-this.ht(e,t.targetId)?0:2}ht(e,t){const n=this.We.getRemoteKeysForTarget(t);let i=0;return n.forEach(r=>{const o=this.We.lt(),l=`projects/${o.projectId}/databases/${o.database}/documents/${r.path.canonicalString()}`;e.mightContain(l)||(this.Xe(t,r,null),i++)}),i}Pt(e){const t=new Map;this.Ge.forEach((r,o)=>{const l=this.st(o);if(l){if(r.current&&ro(l.target)){const u=new M(l.target.path);this.Tt(u).has(o)||this.It(o,u)||this.Xe(o,u,me.newNoDocument(u,e))}r.Ne&&(t.set(o,r.Le()),r.ke())}});let n=W();this.Je.forEach((r,o)=>{let l=!0;o.forEachWhile(u=>{const c=this.st(u);return!c||c.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)}),l&&(n=n.add(r))}),this.ze.forEach((r,o)=>o.setReadTime(e));const i=new er(e,t,this.He,this.ze,n);return this.ze=Ze(),this.je=xr(),this.Je=xr(),this.He=new _e(G),i}Ze(e,t){if(!this.nt(e))return;const n=this.It(e,t.key)?2:0;this.tt(e).qe(t.key,n),this.ze=this.ze.insert(t.key,t),this.je=this.je.insert(t.key,this.Tt(t.key).add(e)),this.Je=this.Je.insert(t.key,this.dt(t.key).add(e))}Xe(e,t,n){if(!this.nt(e))return;const i=this.tt(e);this.It(e,t)?i.qe(t,1):i.Qe(t),this.Je=this.Je.insert(t,this.dt(t).delete(e)),this.Je=this.Je.insert(t,this.dt(t).add(e)),n&&(this.ze=this.ze.insert(t,n))}removeTarget(e){this.Ge.delete(e)}ot(e){const t=this.tt(e).Le();return this.We.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}$e(e){this.tt(e).$e()}tt(e){let t=this.Ge.get(e);return t||(t=new Qh,this.Ge.set(e,t)),t}dt(e){let t=this.Je.get(e);return t||(t=new re(G),this.Je=this.Je.insert(e,t)),t}Tt(e){let t=this.je.get(e);return t||(t=new re(G),this.je=this.je.insert(e,t)),t}nt(e){const t=this.st(e)!==null;return t||N("WatchChangeAggregator","Detected inactive target",e),t}st(e){const t=this.Ge.get(e);return t&&t.Oe?null:this.We.Et(e)}rt(e){this.Ge.set(e,new Qh),this.We.getRemoteKeysForTarget(e).forEach(t=>{this.Xe(e,t,null)})}It(e,t){return this.We.getRemoteKeysForTarget(e).has(t)}}function xr(){return new _e(M.comparator)}function Hh(){return new _e(M.comparator)}const NE={asc:"ASCENDING",desc:"DESCENDING"},DE={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},kE={and:"AND",or:"OR"};class OE{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function _l(s,e){return s.useProto3Json||Fo(e)?e:{value:e}}function ws(s,e){return s.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function z_(s,e){return s.useProto3Json?e.toBase64():e.toUint8Array()}function ME(s,e){return ws(s,e.toTimestamp())}function ze(s){return U(!!s,49232),q.fromTimestamp(function(t){const n=St(t);return new se(n.seconds,n.nanos)}(s))}function au(s,e){return pl(s,e).canonicalString()}function pl(s,e){const t=function(i){return new te(["projects",i.projectId,"databases",i.database])}(s).child("documents");return e===void 0?t:t.child(e)}function K_(s){const e=te.fromString(s);return U(ep(e),10190,{key:e.toString()}),e}function lo(s,e){return au(s.databaseId,e.path)}function An(s,e){const t=K_(e);if(t.get(1)!==s.databaseId.projectId)throw new D(b.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+s.databaseId.projectId);if(t.get(3)!==s.databaseId.database)throw new D(b.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+s.databaseId.database);return new M(Q_(t))}function W_(s,e){return au(s.databaseId,e)}function $_(s){const e=K_(s);return e.length===4?te.emptyPath():Q_(e)}function ml(s){return new te(["projects",s.databaseId.projectId,"databases",s.databaseId.database]).canonicalString()}function Q_(s){return U(s.length>4&&s.get(4)==="documents",29091,{key:s.toString()}),s.popFirst(5)}function Yh(s,e,t){return{name:lo(s,e),fields:t.value.mapValue.fields}}function FE(s,e,t){const n=An(s,e.name),i=ze(e.updateTime),r=e.createTime?ze(e.createTime):q.min(),o=new Ue({mapValue:{fields:e.fields}}),l=me.newFoundDocument(n,i,r,o);return t&&l.setHasCommittedMutations(),t?l.setHasCommittedMutations():l}function LE(s,e){let t;if("targetChange"in e){e.targetChange;const n=function(c){return c==="NO_CHANGE"?0:c==="ADD"?1:c==="REMOVE"?2:c==="CURRENT"?3:c==="RESET"?4:F(39313,{state:c})}(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],r=function(c,f){return c.useProto3Json?(U(f===void 0||typeof f=="string",58123),Ie.fromBase64String(f||"")):(U(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),Ie.fromUint8Array(f||new Uint8Array))}(s,e.targetChange.resumeToken),o=e.targetChange.cause,l=o&&function(c){const f=c.code===void 0?b.UNKNOWN:q_(c.code);return new D(f,c.message||"")}(o);t=new G_(n,i,r,l||null)}else if("documentChange"in e){e.documentChange;const n=e.documentChange;n.document,n.document.name,n.document.updateTime;const i=An(s,n.document.name),r=ze(n.document.updateTime),o=n.document.createTime?ze(n.document.createTime):q.min(),l=new Ue({mapValue:{fields:n.document.fields}}),u=me.newFoundDocument(i,r,o,l),c=n.targetIds||[],f=n.removedTargetIds||[];t=new Wr(c,f,u.key,u)}else if("documentDelete"in e){e.documentDelete;const n=e.documentDelete;n.document;const i=An(s,n.document),r=n.readTime?ze(n.readTime):q.min(),o=me.newNoDocument(i,r),l=n.removedTargetIds||[];t=new Wr([],l,o.key,o)}else if("documentRemove"in e){e.documentRemove;const n=e.documentRemove;n.document;const i=An(s,n.document),r=n.removedTargetIds||[];t=new Wr([],r,i,null)}else{if(!("filter"in e))return F(11601,{At:e});{e.filter;const n=e.filter;n.targetId;const{count:i=0,unchangedNames:r}=n,o=new PE(i,r),l=n.targetId;t=new j_(l,o)}}return t}function uo(s,e){let t;if(e instanceof Ds)t={update:Yh(s,e.key,e.value)};else if(e instanceof $o)t={delete:lo(s,e.key)};else if(e instanceof Nt)t={update:Yh(s,e.key,e.data),updateMask:zE(e.fieldMask)};else{if(!(e instanceof B_))return F(16599,{Rt:e.type});t={verify:lo(s,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(n=>function(r,o){const l=o.transform;if(l instanceof Is)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof vs)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof Ts)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof Bi)return{fieldPath:o.field.canonicalString(),increment:l.Ee};throw F(20930,{transform:o.transform})}(0,n))),e.precondition.isNone||(t.currentDocument=function(i,r){return r.updateTime!==void 0?{updateTime:ME(i,r.updateTime)}:r.exists!==void 0?{exists:r.exists}:F(27497)}(s,e.precondition)),t}function gl(s,e){const t=e.currentDocument?function(r){return r.updateTime!==void 0?Be.updateTime(ze(r.updateTime)):r.exists!==void 0?Be.exists(r.exists):Be.none()}(e.currentDocument):Be.none(),n=e.updateTransforms?e.updateTransforms.map(i=>function(o,l){let u=null;if("setToServerValue"in l)U(l.setToServerValue==="REQUEST_TIME",16630,{proto:l}),u=new Is;else if("appendMissingElements"in l){const f=l.appendMissingElements.values||[];u=new vs(f)}else if("removeAllFromArray"in l){const f=l.removeAllFromArray.values||[];u=new Ts(f)}else"increment"in l?u=new Bi(o,l.increment):F(16584,{proto:l});const c=fe.fromServerFormat(l.fieldPath);return new F_(c,u)}(s,i)):[];if(e.update){e.update.name;const i=An(s,e.update.name),r=new Ue({mapValue:{fields:e.update.fields}});if(e.updateMask){const o=function(u){const c=u.fieldPaths||[];return new We(c.map(f=>fe.fromServerFormat(f)))}(e.updateMask);return new Nt(i,r,o,t,n)}return new Ds(i,r,t,n)}if(e.delete){const i=An(s,e.delete);return new $o(i,t)}if(e.verify){const i=An(s,e.verify);return new B_(i,t)}return F(1463,{proto:e})}function UE(s,e){return s&&s.length>0?(U(e!==void 0,14353),s.map(t=>function(i,r){let o=i.updateTime?ze(i.updateTime):ze(r);return o.isEqual(q.min())&&(o=ze(r)),new RE(o,i.transformResults||[])}(t,e))):[]}function H_(s,e){return{documents:[W_(s,e.path)]}}function Y_(s,e){const t={structuredQuery:{}},n=e.path;let i;e.collectionGroup!==null?(i=n,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=n.popLast(),t.structuredQuery.from=[{collectionId:n.lastSegment()}]),t.parent=W_(s,i);const r=function(c){if(c.length!==0)return Z_(ie.create(c,"and"))}(e.filters);r&&(t.structuredQuery.where=r);const o=function(c){if(c.length!==0)return c.map(f=>function(m){return{field:es(m.field),direction:qE(m.dir)}}(f))}(e.orderBy);o&&(t.structuredQuery.orderBy=o);const l=_l(s,e.limit);return l!==null&&(t.structuredQuery.limit=l),e.startAt&&(t.structuredQuery.startAt=function(c){return{before:c.inclusive,values:c.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(c){return{before:!c.inclusive,values:c.position}}(e.endAt)),{Vt:t,parent:i}}function X_(s){let e=$_(s.parent);const t=s.structuredQuery,n=t.from?t.from.length:0;let i=null;if(n>0){U(n===1,65062);const f=t.from[0];f.allDescendants?i=f.collectionId:e=e.child(f.collectionId)}let r=[];t.where&&(r=function(_){const m=J_(_);return m instanceof ie&&eu(m)?m.getFilters():[m]}(t.where));let o=[];t.orderBy&&(o=function(_){return _.map(m=>function(S){return new Ui(ts(S.field),function(x){switch(x){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(S.direction))}(m))}(t.orderBy));let l=null;t.limit&&(l=function(_){let m;return m=typeof _=="object"?_.value:_,Fo(m)?null:m}(t.limit));let u=null;t.startAt&&(u=function(_){const m=!!_.before,I=_.values||[];return new ys(I,m)}(t.startAt));let c=null;return t.endAt&&(c=function(_){const m=!_.before,I=_.values||[];return new ys(I,m)}(t.endAt)),A_(e,i,o,r,l,"F",u,c)}function BE(s,e){const t=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return F(28987,{purpose:i})}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function J_(s){return s.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const n=ts(t.unaryFilter.field);return Y.create(n,"==",{doubleValue:NaN});case"IS_NULL":const i=ts(t.unaryFilter.field);return Y.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const r=ts(t.unaryFilter.field);return Y.create(r,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=ts(t.unaryFilter.field);return Y.create(o,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return F(61313);default:return F(60726)}}(s):s.fieldFilter!==void 0?function(t){return Y.create(ts(t.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return F(58110);default:return F(50506)}}(t.fieldFilter.op),t.fieldFilter.value)}(s):s.compositeFilter!==void 0?function(t){return ie.create(t.compositeFilter.filters.map(n=>J_(n)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return F(1026)}}(t.compositeFilter.op))}(s):F(30097,{filter:s})}function qE(s){return NE[s]}function jE(s){return DE[s]}function GE(s){return kE[s]}function es(s){return{fieldPath:s.canonicalString()}}function ts(s){return fe.fromServerFormat(s.fieldPath)}function Z_(s){return s instanceof Y?function(t){if(t.op==="=="){if(kh(t.value))return{unaryFilter:{field:es(t.field),op:"IS_NAN"}};if(Dh(t.value))return{unaryFilter:{field:es(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(kh(t.value))return{unaryFilter:{field:es(t.field),op:"IS_NOT_NAN"}};if(Dh(t.value))return{unaryFilter:{field:es(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:es(t.field),op:jE(t.op),value:t.value}}}(s):s instanceof ie?function(t){const n=t.getFilters().map(i=>Z_(i));return n.length===1?n[0]:{compositeFilter:{op:GE(t.op),filters:n}}}(s):F(54877,{filter:s})}function zE(s){const e=[];return s.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function ep(s){return s.length>=4&&s.get(0)==="projects"&&s.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wt{constructor(e,t,n,i,r=q.min(),o=q.min(),l=Ie.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=n,this.sequenceNumber=i,this.snapshotVersion=r,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=l,this.expectedCount=u}withSequenceNumber(e){return new wt(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new wt(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new wt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new wt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tp{constructor(e){this.gt=e}}function KE(s,e){let t;if(e.document)t=FE(s.gt,e.document,!!e.hasCommittedMutations);else if(e.noDocument){const n=M.fromSegments(e.noDocument.path),i=xn(e.noDocument.readTime);t=me.newNoDocument(n,i),e.hasCommittedMutations&&t.setHasCommittedMutations()}else{if(!e.unknownDocument)return F(56709);{const n=M.fromSegments(e.unknownDocument.path),i=xn(e.unknownDocument.version);t=me.newUnknownDocument(n,i)}}return e.readTime&&t.setReadTime(function(i){const r=new se(i[0],i[1]);return q.fromTimestamp(r)}(e.readTime)),t}function Xh(s,e){const t=e.key,n={prefixPath:t.getCollectionPath().popLast().toArray(),collectionGroup:t.collectionGroup,documentId:t.path.lastSegment(),readTime:co(e.readTime),hasCommittedMutations:e.hasCommittedMutations};if(e.isFoundDocument())n.document=function(r,o){return{name:lo(r,o.key),fields:o.data.value.mapValue.fields,updateTime:ws(r,o.version.toTimestamp()),createTime:ws(r,o.createTime.toTimestamp())}}(s.gt,e);else if(e.isNoDocument())n.noDocument={path:t.path.toArray(),readTime:Vn(e.version)};else{if(!e.isUnknownDocument())return F(57904,{document:e});n.unknownDocument={path:t.path.toArray(),version:Vn(e.version)}}return n}function co(s){const e=s.toTimestamp();return[e.seconds,e.nanoseconds]}function Vn(s){const e=s.toTimestamp();return{seconds:e.seconds,nanoseconds:e.nanoseconds}}function xn(s){const e=new se(s.seconds,s.nanoseconds);return q.fromTimestamp(e)}function gn(s,e){const t=(e.baseMutations||[]).map(r=>gl(s.gt,r));for(let r=0;r<e.mutations.length-1;++r){const o=e.mutations[r];if(r+1<e.mutations.length&&e.mutations[r+1].transform!==void 0){const l=e.mutations[r+1];o.updateTransforms=l.transform.fieldTransforms,e.mutations.splice(r+1,1),++r}}const n=e.mutations.map(r=>gl(s.gt,r)),i=se.fromMillis(e.localWriteTimeMs);return new su(e.batchId,i,t,n)}function _i(s){const e=xn(s.readTime),t=s.lastLimboFreeSnapshotVersion!==void 0?xn(s.lastLimboFreeSnapshotVersion):q.min();let n;return n=function(r){return r.documents!==void 0}(s.query)?function(r){const o=r.documents.length;return U(o===1,1966,{count:o}),et(Go($_(r.documents[0])))}(s.query):function(r){return et(X_(r))}(s.query),new wt(n,s.targetId,"TargetPurposeListen",s.lastListenSequenceNumber,e,t,Ie.fromBase64String(s.resumeToken))}function np(s,e){const t=Vn(e.snapshotVersion),n=Vn(e.lastLimboFreeSnapshotVersion);let i;i=ro(e.target)?H_(s.gt,e.target):Y_(s.gt,e.target).Vt;const r=e.resumeToken.toBase64();return{targetId:e.targetId,canonicalId:bn(e.target),readTime:t,resumeToken:r,lastListenSequenceNumber:e.sequenceNumber,lastLimboFreeSnapshotVersion:n,query:i}}function sp(s){const e=X_({parent:s.parent,structuredQuery:s.structuredQuery});return s.limitType==="LAST"?ao(e,e.limit,"L"):e}function Ua(s,e){return new ru(e.largestBatchId,gl(s.gt,e.overlayMutation))}function Jh(s,e){const t=e.path.lastSegment();return[s,qe(e.path.popLast()),t]}function Zh(s,e,t,n){return{indexId:s,uid:e,sequenceNumber:t,readTime:Vn(n.readTime),documentKey:qe(n.documentKey.path),largestBatchId:n.largestBatchId}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class WE{getBundleMetadata(e,t){return ed(e).get(t).next(n=>{if(n)return function(r){return{id:r.bundleId,createTime:xn(r.createTime),version:r.version}}(n)})}saveBundleMetadata(e,t){return ed(e).put(function(i){return{bundleId:i.id,createTime:Vn(ze(i.createTime)),version:i.version}}(t))}getNamedQuery(e,t){return td(e).get(t).next(n=>{if(n)return function(r){return{name:r.name,query:sp(r.bundledQuery),readTime:xn(r.readTime)}}(n)})}saveNamedQuery(e,t){return td(e).put(function(i){return{name:i.name,readTime:Vn(ze(i.readTime)),bundledQuery:i.bundledQuery}}(t))}}function ed(s){return Ae(s,Lo)}function td(s){return Ae(s,Uo)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qo{constructor(e,t){this.serializer=e,this.userId=t}static yt(e,t){const n=t.uid||"";return new Qo(e,n)}getOverlay(e,t){return ni(e).get(Jh(this.userId,t)).next(n=>n?Ua(this.serializer,n):null)}getOverlays(e,t){const n=pt();return A.forEach(t,i=>this.getOverlay(e,i).next(r=>{r!==null&&n.set(i,r)})).next(()=>n)}saveOverlays(e,t,n){const i=[];return n.forEach((r,o)=>{const l=new ru(t,o);i.push(this.wt(e,l))}),A.waitFor(i)}removeOverlaysForBatchId(e,t,n){const i=new Set;t.forEach(o=>i.add(qe(o.getCollectionPath())));const r=[];return i.forEach(o=>{const l=IDBKeyRange.bound([this.userId,o,n],[this.userId,o,n+1],!1,!0);r.push(ni(e).Y(rl,l))}),A.waitFor(r)}getOverlaysForCollection(e,t,n){const i=pt(),r=qe(t),o=IDBKeyRange.bound([this.userId,r,n],[this.userId,r,Number.POSITIVE_INFINITY],!0);return ni(e).j(rl,o).next(l=>{for(const u of l){const c=Ua(this.serializer,u);i.set(c.getKey(),c)}return i})}getOverlaysForCollectionGroup(e,t,n,i){const r=pt();let o;const l=IDBKeyRange.bound([this.userId,t,n],[this.userId,t,Number.POSITIVE_INFINITY],!0);return ni(e).X({index:n_,range:l},(u,c,f)=>{const _=Ua(this.serializer,c);r.size()<i||_.largestBatchId===o?(r.set(_.getKey(),_),o=_.largestBatchId):f.done()}).next(()=>r)}wt(e,t){return ni(e).put(function(i,r,o){const[l,u,c]=Jh(r,o.mutation.key);return{userId:r,collectionPath:u,documentId:c,collectionGroup:o.mutation.key.getCollectionGroup(),largestBatchId:o.largestBatchId,overlayMutation:uo(i.gt,o.mutation)}}(this.serializer,this.userId,t))}}function ni(s){return Ae(s,Bo)}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $E{St(e){return Ae(e,Hl)}getSessionToken(e){return this.St(e).get("sessionToken").next(t=>{const n=t==null?void 0:t.value;return n?Ie.fromUint8Array(n):Ie.EMPTY_BYTE_STRING})}setSessionToken(e,t){return this.St(e).put({name:"sessionToken",value:t.toUint8Array()})}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yn{constructor(){}bt(e,t){this.Dt(e,t),t.vt()}Dt(e,t){if("nullValue"in e)this.Ct(t,5);else if("booleanValue"in e)this.Ct(t,10),t.Ft(e.booleanValue?1:0);else if("integerValue"in e)this.Ct(t,15),t.Ft(de(e.integerValue));else if("doubleValue"in e){const n=de(e.doubleValue);isNaN(n)?this.Ct(t,13):(this.Ct(t,15),xi(n)?t.Ft(0):t.Ft(n))}else if("timestampValue"in e){let n=e.timestampValue;this.Ct(t,20),typeof n=="string"&&(n=St(n)),t.Mt(`${n.seconds||""}`),t.Ft(n.nanos||0)}else if("stringValue"in e)this.xt(e.stringValue,t),this.Ot(t);else if("bytesValue"in e)this.Ct(t,30),t.Nt(Pt(e.bytesValue)),this.Ot(t);else if("referenceValue"in e)this.Bt(e.referenceValue,t);else if("geoPointValue"in e){const n=e.geoPointValue;this.Ct(t,45),t.Ft(n.latitude||0),t.Ft(n.longitude||0)}else"mapValue"in e?__(e)?this.Ct(t,Number.MAX_SAFE_INTEGER):jo(e)?this.Lt(e.mapValue,t):(this.kt(e.mapValue,t),this.Ot(t)):"arrayValue"in e?(this.qt(e.arrayValue,t),this.Ot(t)):F(19022,{Qt:e})}xt(e,t){this.Ct(t,25),this.$t(e,t)}$t(e,t){t.Mt(e)}kt(e,t){const n=e.fields||{};this.Ct(t,55);for(const i of Object.keys(n))this.xt(i,t),this.Dt(n[i],t)}Lt(e,t){var n,i;const r=e.fields||{};this.Ct(t,53);const o=ms,l=((i=(n=r[o].arrayValue)===null||n===void 0?void 0:n.values)===null||i===void 0?void 0:i.length)||0;this.Ct(t,15),t.Ft(de(l)),this.xt(o,t),this.Dt(r[o],t)}qt(e,t){const n=e.values||[];this.Ct(t,50);for(const i of n)this.Dt(i,t)}Bt(e,t){this.Ct(t,37),M.fromName(e).path.forEach(n=>{this.Ct(t,60),this.$t(n,t)})}Ct(e,t){e.Ft(t)}Ot(e){e.Ft(2)}}yn.Ut=new yn;/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law | agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES | CONDITIONS OF ANY KIND, either express | implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $n=255;function QE(s){if(s===0)return 8;let e=0;return s>>4||(e+=4,s<<=4),s>>6||(e+=2,s<<=2),s>>7||(e+=1),e}function nd(s){const e=64-function(n){let i=0;for(let r=0;r<8;++r){const o=QE(255&n[r]);if(i+=o,o!==8)break}return i}(s);return Math.ceil(e/8)}class HE{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Kt(e){const t=e[Symbol.iterator]();let n=t.next();for(;!n.done;)this.Wt(n.value),n=t.next();this.Gt()}zt(e){const t=e[Symbol.iterator]();let n=t.next();for(;!n.done;)this.jt(n.value),n=t.next();this.Jt()}Ht(e){for(const t of e){const n=t.charCodeAt(0);if(n<128)this.Wt(n);else if(n<2048)this.Wt(960|n>>>6),this.Wt(128|63&n);else if(t<"\uD800"||"\uDBFF"<t)this.Wt(480|n>>>12),this.Wt(128|63&n>>>6),this.Wt(128|63&n);else{const i=t.codePointAt(0);this.Wt(240|i>>>18),this.Wt(128|63&i>>>12),this.Wt(128|63&i>>>6),this.Wt(128|63&i)}}this.Gt()}Yt(e){for(const t of e){const n=t.charCodeAt(0);if(n<128)this.jt(n);else if(n<2048)this.jt(960|n>>>6),this.jt(128|63&n);else if(t<"\uD800"||"\uDBFF"<t)this.jt(480|n>>>12),this.jt(128|63&n>>>6),this.jt(128|63&n);else{const i=t.codePointAt(0);this.jt(240|i>>>18),this.jt(128|63&i>>>12),this.jt(128|63&i>>>6),this.jt(128|63&i)}}this.Jt()}Zt(e){const t=this.Xt(e),n=nd(t);this.en(1+n),this.buffer[this.position++]=255&n;for(let i=t.length-n;i<t.length;++i)this.buffer[this.position++]=255&t[i]}tn(e){const t=this.Xt(e),n=nd(t);this.en(1+n),this.buffer[this.position++]=~(255&n);for(let i=t.length-n;i<t.length;++i)this.buffer[this.position++]=~(255&t[i])}nn(){this.rn($n),this.rn(255)}sn(){this._n($n),this._n(255)}reset(){this.position=0}seed(e){this.en(e.length),this.buffer.set(e,this.position),this.position+=e.length}an(){return this.buffer.slice(0,this.position)}Xt(e){const t=function(r){const o=new DataView(new ArrayBuffer(8));return o.setFloat64(0,r,!1),new Uint8Array(o.buffer)}(e),n=!!(128&t[0]);t[0]^=n?255:128;for(let i=1;i<t.length;++i)t[i]^=n?255:0;return t}Wt(e){const t=255&e;t===0?(this.rn(0),this.rn(255)):t===$n?(this.rn($n),this.rn(0)):this.rn(t)}jt(e){const t=255&e;t===0?(this._n(0),this._n(255)):t===$n?(this._n($n),this._n(0)):this._n(e)}Gt(){this.rn(0),this.rn(1)}Jt(){this._n(0),this._n(1)}rn(e){this.en(1),this.buffer[this.position++]=e}_n(e){this.en(1),this.buffer[this.position++]=~e}en(e){const t=e+this.position;if(t<=this.buffer.length)return;let n=2*this.buffer.length;n<t&&(n=t);const i=new Uint8Array(n);i.set(this.buffer),this.buffer=i}}class YE{constructor(e){this.un=e}Nt(e){this.un.Kt(e)}Mt(e){this.un.Ht(e)}Ft(e){this.un.Zt(e)}vt(){this.un.nn()}}class XE{constructor(e){this.un=e}Nt(e){this.un.zt(e)}Mt(e){this.un.Yt(e)}Ft(e){this.un.tn(e)}vt(){this.un.sn()}}class si{constructor(){this.un=new HE,this.cn=new YE(this.un),this.ln=new XE(this.un)}seed(e){this.un.seed(e)}hn(e){return e===0?this.cn:this.ln}an(){return this.un.an()}reset(){this.un.reset()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class En{constructor(e,t,n,i){this.Pn=e,this.Tn=t,this.In=n,this.dn=i}En(){const e=this.dn.length,t=e===0||this.dn[e-1]===255?e+1:e,n=new Uint8Array(t);return n.set(this.dn,0),t!==e?n.set([0],this.dn.length):++n[n.length-1],new En(this.Pn,this.Tn,this.In,n)}An(e,t,n){return{indexId:this.Pn,uid:e,arrayValue:$r(this.In),directionalValue:$r(this.dn),orderedDocumentKey:$r(t),documentKey:n.path.toArray()}}Rn(e,t,n){const i=this.An(e,t,n);return[i.indexId,i.uid,i.arrayValue,i.directionalValue,i.orderedDocumentKey,i.documentKey]}}function Lt(s,e){let t=s.Pn-e.Pn;return t!==0?t:(t=sd(s.In,e.In),t!==0?t:(t=sd(s.dn,e.dn),t!==0?t:M.comparator(s.Tn,e.Tn)))}function sd(s,e){for(let t=0;t<s.length&&t<e.length;++t){const n=s[t]-e[t];if(n!==0)return n}return s.length-e.length}function $r(s){return bf()?function(t){let n="";for(let i=0;i<t.length;i++)n+=String.fromCharCode(t[i]);return n}(s):s}function id(s){return typeof s!="string"?s:function(t){const n=new Uint8Array(t.length);for(let i=0;i<t.length;i++)n[i]=t.charCodeAt(i);return n}(s)}class rd{constructor(e){this.Vn=new re((t,n)=>fe.comparator(t.field,n.field)),this.collectionId=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment(),this.mn=e.orderBy,this.fn=[];for(const t of e.filters){const n=t;n.isInequality()?this.Vn=this.Vn.add(n):this.fn.push(n)}}get gn(){return this.Vn.size>1}pn(e){if(U(e.collectionGroup===this.collectionId,49279),this.gn)return!1;const t=nl(e);if(t!==void 0&&!this.yn(t))return!1;const n=fn(e);let i=new Set,r=0,o=0;for(;r<n.length&&this.yn(n[r]);++r)i=i.add(n[r].fieldPath.canonicalString());if(r===n.length)return!0;if(this.Vn.size>0){const l=this.Vn.getIterator().getNext();if(!i.has(l.field.canonicalString())){const u=n[r];if(!this.wn(l,u)||!this.Sn(this.mn[o++],u))return!1}++r}for(;r<n.length;++r){const l=n[r];if(o>=this.mn.length||!this.Sn(this.mn[o++],l))return!1}return!0}bn(){if(this.gn)return null;let e=new re(fe.comparator);const t=[];for(const n of this.fn)if(!n.field.isKeyField())if(n.op==="array-contains"||n.op==="array-contains-any")t.push(new Ur(n.field,2));else{if(e.has(n.field))continue;e=e.add(n.field),t.push(new Ur(n.field,0))}for(const n of this.mn)n.field.isKeyField()||e.has(n.field)||(e=e.add(n.field),t.push(new Ur(n.field,n.dir==="asc"?0:1)));return new eo(eo.UNKNOWN_ID,this.collectionId,t,Vi.empty())}yn(e){for(const t of this.fn)if(this.wn(t,e))return!0;return!1}wn(e,t){if(e===void 0||!e.field.isEqual(t.fieldPath))return!1;const n=e.op==="array-contains"||e.op==="array-contains-any";return t.kind===2===n}Sn(e,t){return!!e.field.isEqual(t.fieldPath)&&(t.kind===0&&e.dir==="asc"||t.kind===1&&e.dir==="desc")}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ip(s){var e,t;if(U(s instanceof Y||s instanceof ie,20012),s instanceof Y){if(s instanceof w_){const i=((t=(e=s.value.arrayValue)===null||e===void 0?void 0:e.values)===null||t===void 0?void 0:t.map(r=>Y.create(s.field,"==",r)))||[];return ie.create(i,"or")}return s}const n=s.filters.map(i=>ip(i));return ie.create(n,s.op)}function JE(s){if(s.getFilters().length===0)return[];const e=Il(ip(s));return U(rp(e),7391),yl(e)||El(e)?[e]:e.getFilters()}function yl(s){return s instanceof Y}function El(s){return s instanceof ie&&eu(s)}function rp(s){return yl(s)||El(s)||function(t){if(t instanceof ie&&cl(t)){for(const n of t.getFilters())if(!yl(n)&&!El(n))return!1;return!0}return!1}(s)}function Il(s){if(U(s instanceof Y||s instanceof ie,34018),s instanceof Y)return s;if(s.filters.length===1)return Il(s.filters[0]);const e=s.filters.map(n=>Il(n));let t=ie.create(e,s.op);return t=ho(t),rp(t)?t:(U(t instanceof ie,64498),U(Es(t),40251),U(t.filters.length>1,57927),t.filters.reduce((n,i)=>lu(n,i)))}function lu(s,e){let t;return U(s instanceof Y||s instanceof ie,38388),U(e instanceof Y||e instanceof ie,25473),t=s instanceof Y?e instanceof Y?function(i,r){return ie.create([i,r],"and")}(s,e):od(s,e):e instanceof Y?od(e,s):function(i,r){if(U(i.filters.length>0&&r.filters.length>0,48005),Es(i)&&Es(r))return I_(i,r.getFilters());const o=cl(i)?i:r,l=cl(i)?r:i,u=o.filters.map(c=>lu(c,l));return ie.create(u,"or")}(s,e),ho(t)}function od(s,e){if(Es(e))return I_(e,s.getFilters());{const t=e.filters.map(n=>lu(s,n));return ie.create(t,"or")}}function ho(s){if(U(s instanceof Y||s instanceof ie,11850),s instanceof Y)return s;const e=s.getFilters();if(e.length===1)return ho(e[0]);if(y_(s))return s;const t=e.map(i=>ho(i)),n=[];return t.forEach(i=>{i instanceof Y?n.push(i):i instanceof ie&&(i.op===s.op?n.push(...i.filters):n.push(i))}),n.length===1?n[0]:ie.create(n,s.op)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ZE{constructor(){this.Dn=new uu}addToCollectionParentIndex(e,t){return this.Dn.add(t),A.resolve()}getCollectionParents(e,t){return A.resolve(this.Dn.getEntries(t))}addFieldIndex(e,t){return A.resolve()}deleteFieldIndex(e,t){return A.resolve()}deleteAllFieldIndexes(e){return A.resolve()}createTargetIndexes(e,t){return A.resolve()}getDocumentsMatchingTarget(e,t){return A.resolve(null)}getIndexType(e,t){return A.resolve(0)}getFieldIndexes(e,t){return A.resolve([])}getNextCollectionGroupToUpdate(e){return A.resolve(null)}getMinOffset(e,t){return A.resolve(nt.min())}getMinOffsetFromCollectionGroup(e,t){return A.resolve(nt.min())}updateCollectionGroup(e,t,n){return A.resolve()}updateIndexEntries(e,t){return A.resolve()}}class uu{constructor(){this.index={}}add(e){const t=e.lastSegment(),n=e.popLast(),i=this.index[t]||new re(te.comparator),r=!i.has(n);return this.index[t]=i.add(n),r}has(e){const t=e.lastSegment(),n=e.popLast(),i=this.index[t];return i&&i.has(n)}getEntries(e){return(this.index[e]||new re(te.comparator)).toArray()}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ad="IndexedDbIndexManager",Nr=new Uint8Array(0);class eI{constructor(e,t){this.databaseId=t,this.vn=new uu,this.Cn=new xt(n=>bn(n),(n,i)=>Ji(n,i)),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.vn.has(t)){const n=t.lastSegment(),i=t.popLast();e.addOnCommittedListener(()=>{this.vn.add(t)});const r={collectionId:n,parent:qe(i)};return ld(e).put(r)}return A.resolve()}getCollectionParents(e,t){const n=[],i=IDBKeyRange.bound([t,""],[jf(t),""],!1,!0);return ld(e).j(i).next(r=>{for(const o of r){if(o.collectionId!==t)break;n.push(_t(o.parent))}return n})}addFieldIndex(e,t){const n=ii(e),i=function(l){return{indexId:l.indexId,collectionGroup:l.collectionGroup,fields:l.fields.map(u=>[u.fieldPath.canonicalString(),u.kind])}}(t);delete i.indexId;const r=n.add(i);if(t.indexState){const o=Hn(e);return r.next(l=>{o.put(Zh(l,this.uid,t.indexState.sequenceNumber,t.indexState.offset))})}return r.next()}deleteFieldIndex(e,t){const n=ii(e),i=Hn(e),r=Qn(e);return n.delete(t.indexId).next(()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))).next(()=>r.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))}deleteAllFieldIndexes(e){const t=ii(e),n=Qn(e),i=Hn(e);return t.Y().next(()=>n.Y()).next(()=>i.Y())}createTargetIndexes(e,t){return A.forEach(this.Fn(t),n=>this.getIndexType(e,n).next(i=>{if(i===0||i===1){const r=new rd(n).bn();if(r!=null)return this.addFieldIndex(e,r)}}))}getDocumentsMatchingTarget(e,t){const n=Qn(e);let i=!0;const r=new Map;return A.forEach(this.Fn(t),o=>this.Mn(e,o).next(l=>{i&&(i=!!l),r.set(o,l)})).next(()=>{if(i){let o=W();const l=[];return A.forEach(r,(u,c)=>{N(ad,`Using index ${function(B){return`id=${B.indexId}|cg=${B.collectionGroup}|f=${B.fields.map(J=>`${J.fieldPath}:${J.kind}`).join(",")}`}(u)} to execute ${bn(t)}`);const f=function(B,J){const le=nl(J);if(le===void 0)return null;for(const Z of oo(B,le.fieldPath))switch(Z.op){case"array-contains-any":return Z.value.arrayValue.values||[];case"array-contains":return[Z.value]}return null}(c,u),_=function(B,J){const le=new Map;for(const Z of fn(J))for(const v of oo(B,Z.fieldPath))switch(v.op){case"==":case"in":le.set(Z.fieldPath.canonicalString(),v.value);break;case"not-in":case"!=":return le.set(Z.fieldPath.canonicalString(),v.value),Array.from(le.values())}return null}(c,u),m=function(B,J){const le=[];let Z=!0;for(const v of fn(J)){const g=v.kind===0?Uh(B,v.fieldPath,B.startAt):Bh(B,v.fieldPath,B.startAt);le.push(g.value),Z&&(Z=g.inclusive)}return new ys(le,Z)}(c,u),I=function(B,J){const le=[];let Z=!0;for(const v of fn(J)){const g=v.kind===0?Bh(B,v.fieldPath,B.endAt):Uh(B,v.fieldPath,B.endAt);le.push(g.value),Z&&(Z=g.inclusive)}return new ys(le,Z)}(c,u),S=this.xn(u,c,m),V=this.xn(u,c,I),x=this.On(u,c,_),K=this.Nn(u.indexId,f,S,m.inclusive,V,I.inclusive,x);return A.forEach(K,j=>n.H(j,t.limit).next(B=>{B.forEach(J=>{const le=M.fromSegments(J.documentKey);o.has(le)||(o=o.add(le),l.push(le))})}))}).next(()=>l)}return A.resolve(null)})}Fn(e){let t=this.Cn.get(e);return t||(e.filters.length===0?t=[e]:t=JE(ie.create(e.filters,"and")).map(n=>dl(e.path,e.collectionGroup,e.orderBy,n.getFilters(),e.limit,e.startAt,e.endAt)),this.Cn.set(e,t),t)}Nn(e,t,n,i,r,o,l){const u=(t!=null?t.length:1)*Math.max(n.length,r.length),c=u/(t!=null?t.length:1),f=[];for(let _=0;_<u;++_){const m=t?this.Bn(t[_/c]):Nr,I=this.Ln(e,m,n[_%c],i),S=this.kn(e,m,r[_%c],o),V=l.map(x=>this.Ln(e,m,x,!0));f.push(...this.createRange(I,S,V))}return f}Ln(e,t,n,i){const r=new En(e,M.empty(),t,n);return i?r:r.En()}kn(e,t,n,i){const r=new En(e,M.empty(),t,n);return i?r.En():r}Mn(e,t){const n=new rd(t),i=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,i).next(r=>{let o=null;for(const l of r)n.pn(l)&&(!o||l.fields.length>o.fields.length)&&(o=l);return o})}getIndexType(e,t){let n=2;const i=this.Fn(t);return A.forEach(i,r=>this.Mn(e,r).next(o=>{o?n!==0&&o.fields.length<function(u){let c=new re(fe.comparator),f=!1;for(const _ of u.filters)for(const m of _.getFlattenedFilters())m.field.isKeyField()||(m.op==="array-contains"||m.op==="array-contains-any"?f=!0:c=c.add(m.field));for(const _ of u.orderBy)_.field.isKeyField()||(c=c.add(_.field));return c.size+(f?1:0)}(r)&&(n=1):n=0})).next(()=>function(o){return o.limit!==null}(t)&&i.length>1&&n===2?1:n)}qn(e,t){const n=new si;for(const i of fn(e)){const r=t.data.field(i.fieldPath);if(r==null)return null;const o=n.hn(i.kind);yn.Ut.bt(r,o)}return n.an()}Bn(e){const t=new si;return yn.Ut.bt(e,t.hn(0)),t.an()}Qn(e,t){const n=new si;return yn.Ut.bt(Fi(this.databaseId,t),n.hn(function(r){const o=fn(r);return o.length===0?0:o[o.length-1].kind}(e))),n.an()}On(e,t,n){if(n===null)return[];let i=[];i.push(new si);let r=0;for(const o of fn(e)){const l=n[r++];for(const u of i)if(this.$n(t,o.fieldPath)&&Li(l))i=this.Un(i,o,l);else{const c=u.hn(o.kind);yn.Ut.bt(l,c)}}return this.Kn(i)}xn(e,t,n){return this.On(e,t,n.position)}Kn(e){const t=[];for(let n=0;n<e.length;++n)t[n]=e[n].an();return t}Un(e,t,n){const i=[...e],r=[];for(const o of n.arrayValue.values||[])for(const l of i){const u=new si;u.seed(l.an()),yn.Ut.bt(o,u.hn(t.kind)),r.push(u)}return r}$n(e,t){return!!e.filters.find(n=>n instanceof Y&&n.field.isEqual(t)&&(n.op==="in"||n.op==="not-in"))}getFieldIndexes(e,t){const n=ii(e),i=Hn(e);return(t?n.j(il,IDBKeyRange.bound(t,t)):n.j()).next(r=>{const o=[];return A.forEach(r,l=>i.get([l.indexId,this.uid]).next(u=>{o.push(function(f,_){const m=_?new Vi(_.sequenceNumber,new nt(xn(_.readTime),new M(_t(_.documentKey)),_.largestBatchId)):Vi.empty(),I=f.fields.map(([S,V])=>new Ur(fe.fromServerFormat(S),V));return new eo(f.indexId,f.collectionGroup,I,m)}(l,u))})).next(()=>o)})}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next(t=>t.length===0?null:(t.sort((n,i)=>{const r=n.indexState.sequenceNumber-i.indexState.sequenceNumber;return r!==0?r:G(n.collectionGroup,i.collectionGroup)}),t[0].collectionGroup))}updateCollectionGroup(e,t,n){const i=ii(e),r=Hn(e);return this.Wn(e).next(o=>i.j(il,IDBKeyRange.bound(t,t)).next(l=>A.forEach(l,u=>r.put(Zh(u.indexId,this.uid,o,n)))))}updateIndexEntries(e,t){const n=new Map;return A.forEach(t,(i,r)=>{const o=n.get(i.collectionGroup);return(o?A.resolve(o):this.getFieldIndexes(e,i.collectionGroup)).next(l=>(n.set(i.collectionGroup,l),A.forEach(l,u=>this.Gn(e,i,u).next(c=>{const f=this.zn(r,u);return c.isEqual(f)?A.resolve():this.jn(e,r,u,c,f)}))))})}Jn(e,t,n,i){return Qn(e).put(i.An(this.uid,this.Qn(n,t.key),t.key))}Hn(e,t,n,i){return Qn(e).delete(i.Rn(this.uid,this.Qn(n,t.key),t.key))}Gn(e,t,n){const i=Qn(e);let r=new re(Lt);return i.X({index:t_,range:IDBKeyRange.only([n.indexId,this.uid,$r(this.Qn(n,t))])},(o,l)=>{r=r.add(new En(n.indexId,t,id(l.arrayValue),id(l.directionalValue)))}).next(()=>r)}zn(e,t){let n=new re(Lt);const i=this.qn(t,e);if(i==null)return n;const r=nl(t);if(r!=null){const o=e.data.field(r.fieldPath);if(Li(o))for(const l of o.arrayValue.values||[])n=n.add(new En(t.indexId,e.key,this.Bn(l),i))}else n=n.add(new En(t.indexId,e.key,Nr,i));return n}jn(e,t,n,i,r){N(ad,"Updating index entries for document '%s'",t.key);const o=[];return function(u,c,f,_,m){const I=u.getIterator(),S=c.getIterator();let V=Wn(I),x=Wn(S);for(;V||x;){let K=!1,j=!1;if(V&&x){const B=f(V,x);B<0?j=!0:B>0&&(K=!0)}else V!=null?j=!0:K=!0;K?(_(x),x=Wn(S)):j?(m(V),V=Wn(I)):(V=Wn(I),x=Wn(S))}}(i,r,Lt,l=>{o.push(this.Jn(e,t,n,l))},l=>{o.push(this.Hn(e,t,n,l))}),A.waitFor(o)}Wn(e){let t=1;return Hn(e).X({index:e_,reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},(n,i,r)=>{r.done(),t=i.sequenceNumber+1}).next(()=>t)}createRange(e,t,n){n=n.sort((o,l)=>Lt(o,l)).filter((o,l,u)=>!l||Lt(o,u[l-1])!==0);const i=[];i.push(e);for(const o of n){const l=Lt(o,e),u=Lt(o,t);if(l===0)i[0]=e.En();else if(l>0&&u<0)i.push(o),i.push(o.En());else if(u>0)break}i.push(t);const r=[];for(let o=0;o<i.length;o+=2){if(this.Yn(i[o],i[o+1]))return[];const l=i[o].Rn(this.uid,Nr,M.empty()),u=i[o+1].Rn(this.uid,Nr,M.empty());r.push(IDBKeyRange.bound(l,u))}return r}Yn(e,t){return Lt(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(ud)}getMinOffset(e,t){return A.mapArray(this.Fn(t),n=>this.Mn(e,n).next(i=>i||F(44426))).next(ud)}}function ld(s){return Ae(s,ki)}function Qn(s){return Ae(s,Ei)}function ii(s){return Ae(s,Ql)}function Hn(s){return Ae(s,yi)}function ud(s){U(s.length!==0,28825);let e=s[0].indexState.offset,t=e.largestBatchId;for(let n=1;n<s.length;n++){const i=s[n].indexState.offset;Kl(i,e)<0&&(e=i),t<i.largestBatchId&&(t=i.largestBatchId)}return new nt(e.readTime,e.documentKey,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cd={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},op=41943040;class Me{static withCacheSize(e){return new Me(e,Me.DEFAULT_COLLECTION_PERCENTILE,Me.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,n){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=n}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ap(s,e,t){const n=s.store(rt),i=s.store(ds),r=[],o=IDBKeyRange.only(t.batchId);let l=0;const u=n.X({range:o},(f,_,m)=>(l++,m.delete()));r.push(u.next(()=>{U(l===1,47070,{batchId:t.batchId})}));const c=[];for(const f of t.mutations){const _=Xf(e,f.key.path,t.batchId);r.push(i.delete(_)),c.push(f.key)}return A.waitFor(r).next(()=>c)}function fo(s){if(!s)return 0;let e;if(s.document)e=s.document;else if(s.unknownDocument)e=s.unknownDocument;else{if(!s.noDocument)throw F(14731);e=s.noDocument}return JSON.stringify(e).length}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Me.DEFAULT_COLLECTION_PERCENTILE=10,Me.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Me.DEFAULT=new Me(op,Me.DEFAULT_COLLECTION_PERCENTILE,Me.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Me.DISABLED=new Me(-1,0,0);class Ho{constructor(e,t,n,i){this.userId=e,this.serializer=t,this.indexManager=n,this.referenceDelegate=i,this.Zn={}}static yt(e,t,n,i){U(e.uid!=="",64387);const r=e.isAuthenticated()?e.uid:"";return new Ho(r,t,n,i)}checkEmpty(e){let t=!0;const n=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return Ut(e).X({index:In,range:n},(i,r,o)=>{t=!1,o.done()}).next(()=>t)}addMutationBatch(e,t,n,i){const r=ns(e),o=Ut(e);return o.add({}).next(l=>{U(typeof l=="number",49019);const u=new su(l,t,n,i),c=function(I,S,V){const x=V.baseMutations.map(j=>uo(I.gt,j)),K=V.mutations.map(j=>uo(I.gt,j));return{userId:S,batchId:V.batchId,localWriteTimeMs:V.localWriteTime.toMillis(),baseMutations:x,mutations:K}}(this.serializer,this.userId,u),f=[];let _=new re((m,I)=>G(m.canonicalString(),I.canonicalString()));for(const m of i){const I=Xf(this.userId,m.key.path,l);_=_.add(m.key.path.popLast()),f.push(o.put(c)),f.push(r.put(I,Dy))}return _.forEach(m=>{f.push(this.indexManager.addToCollectionParentIndex(e,m))}),e.addOnCommittedListener(()=>{this.Zn[l]=u.keys()}),A.waitFor(f).next(()=>u)})}lookupMutationBatch(e,t){return Ut(e).get(t).next(n=>n?(U(n.userId===this.userId,48,"Unexpected user for mutation batch",{userId:n.userId,batchId:t}),gn(this.serializer,n)):null)}Xn(e,t){return this.Zn[t]?A.resolve(this.Zn[t]):this.lookupMutationBatch(e,t).next(n=>{if(n){const i=n.keys();return this.Zn[t]=i,i}return null})}getNextMutationBatchAfterBatchId(e,t){const n=t+1,i=IDBKeyRange.lowerBound([this.userId,n]);let r=null;return Ut(e).X({index:In,range:i},(o,l,u)=>{l.userId===this.userId&&(U(l.batchId>=n,47524,{er:n}),r=gn(this.serializer,l)),u.done()}).next(()=>r)}getHighestUnacknowledgedBatchId(e){const t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let n=Tn;return Ut(e).X({index:In,range:t,reverse:!0},(i,r,o)=>{n=r.batchId,o.done()}).next(()=>n)}getAllMutationBatches(e){const t=IDBKeyRange.bound([this.userId,Tn],[this.userId,Number.POSITIVE_INFINITY]);return Ut(e).j(In,t).next(n=>n.map(i=>gn(this.serializer,i)))}getAllMutationBatchesAffectingDocumentKey(e,t){const n=Br(this.userId,t.path),i=IDBKeyRange.lowerBound(n),r=[];return ns(e).X({range:i},(o,l,u)=>{const[c,f,_]=o,m=_t(f);if(c===this.userId&&t.path.isEqual(m))return Ut(e).get(_).next(I=>{if(!I)throw F(61480,{tr:o,batchId:_});U(I.userId===this.userId,10503,"Unexpected user for mutation batch",{userId:I.userId,batchId:_}),r.push(gn(this.serializer,I))});u.done()}).next(()=>r)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new re(G);const i=[];return t.forEach(r=>{const o=Br(this.userId,r.path),l=IDBKeyRange.lowerBound(o),u=ns(e).X({range:l},(c,f,_)=>{const[m,I,S]=c,V=_t(I);m===this.userId&&r.path.isEqual(V)?n=n.add(S):_.done()});i.push(u)}),A.waitFor(i).next(()=>this.nr(e,n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,i=n.length+1,r=Br(this.userId,n),o=IDBKeyRange.lowerBound(r);let l=new re(G);return ns(e).X({range:o},(u,c,f)=>{const[_,m,I]=u,S=_t(m);_===this.userId&&n.isPrefixOf(S)?S.length===i&&(l=l.add(I)):f.done()}).next(()=>this.nr(e,l))}nr(e,t){const n=[],i=[];return t.forEach(r=>{i.push(Ut(e).get(r).next(o=>{if(o===null)throw F(35274,{batchId:r});U(o.userId===this.userId,9748,"Unexpected user for mutation batch",{userId:o.userId,batchId:r}),n.push(gn(this.serializer,o))}))}),A.waitFor(i).next(()=>n)}removeMutationBatch(e,t){return ap(e.ce,this.userId,t).next(n=>(e.addOnCommittedListener(()=>{this.rr(t.batchId)}),A.forEach(n,i=>this.referenceDelegate.markPotentiallyOrphaned(e,i))))}rr(e){delete this.Zn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next(t=>{if(!t)return A.resolve();const n=IDBKeyRange.lowerBound(function(o){return[o]}(this.userId)),i=[];return ns(e).X({range:n},(r,o,l)=>{if(r[0]===this.userId){const u=_t(r[1]);i.push(u)}else l.done()}).next(()=>{U(i.length===0,56720,{ir:i.map(r=>r.canonicalString())})})})}containsKey(e,t){return lp(e,this.userId,t)}sr(e){return up(e).get(this.userId).next(t=>t||{userId:this.userId,lastAcknowledgedBatchId:Tn,lastStreamToken:""})}}function lp(s,e,t){const n=Br(e,t.path),i=n[1],r=IDBKeyRange.lowerBound(n);let o=!1;return ns(s).X({range:r,Z:!0},(l,u,c)=>{const[f,_,m]=l;f===e&&_===i&&(o=!0),c.done()}).next(()=>o)}function Ut(s){return Ae(s,rt)}function ns(s){return Ae(s,ds)}function up(s){return Ae(s,Ni)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nn{constructor(e){this._r=e}next(){return this._r+=2,this._r}static ar(){return new Nn(0)}static ur(){return new Nn(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tI{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.cr(e).next(t=>{const n=new Nn(t.highestTargetId);return t.highestTargetId=n.next(),this.lr(e,t).next(()=>t.highestTargetId)})}getLastRemoteSnapshotVersion(e){return this.cr(e).next(t=>q.fromTimestamp(new se(t.lastRemoteSnapshotVersion.seconds,t.lastRemoteSnapshotVersion.nanoseconds)))}getHighestSequenceNumber(e){return this.cr(e).next(t=>t.highestListenSequenceNumber)}setTargetsMetadata(e,t,n){return this.cr(e).next(i=>(i.highestListenSequenceNumber=t,n&&(i.lastRemoteSnapshotVersion=n.toTimestamp()),t>i.highestListenSequenceNumber&&(i.highestListenSequenceNumber=t),this.lr(e,i)))}addTargetData(e,t){return this.hr(e,t).next(()=>this.cr(e).next(n=>(n.targetCount+=1,this.Pr(t,n),this.lr(e,n))))}updateTargetData(e,t){return this.hr(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next(()=>Yn(e).delete(t.targetId)).next(()=>this.cr(e)).next(n=>(U(n.targetCount>0,8065),n.targetCount-=1,this.lr(e,n)))}removeTargets(e,t,n){let i=0;const r=[];return Yn(e).X((o,l)=>{const u=_i(l);u.sequenceNumber<=t&&n.get(u.targetId)===null&&(i++,r.push(this.removeTargetData(e,u)))}).next(()=>A.waitFor(r)).next(()=>i)}forEachTarget(e,t){return Yn(e).X((n,i)=>{const r=_i(i);t(r)})}cr(e){return hd(e).get(so).next(t=>(U(t!==null,2888),t))}lr(e,t){return hd(e).put(so,t)}hr(e,t){return Yn(e).put(np(this.serializer,t))}Pr(e,t){let n=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,n=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,n=!0),n}getTargetCount(e){return this.cr(e).next(t=>t.targetCount)}getTargetData(e,t){const n=bn(t),i=IDBKeyRange.bound([n,Number.NEGATIVE_INFINITY],[n,Number.POSITIVE_INFINITY]);let r=null;return Yn(e).X({range:i,index:Zf},(o,l,u)=>{const c=_i(l);Ji(t,c.target)&&(r=c,u.done())}).next(()=>r)}addMatchingKeys(e,t,n){const i=[],r=qt(e);return t.forEach(o=>{const l=qe(o.path);i.push(r.put({targetId:n,path:l})),i.push(this.referenceDelegate.addReference(e,n,o))}),A.waitFor(i)}removeMatchingKeys(e,t,n){const i=qt(e);return A.forEach(t,r=>{const o=qe(r.path);return A.waitFor([i.delete([n,o]),this.referenceDelegate.removeReference(e,n,r)])})}removeMatchingKeysForTargetId(e,t){const n=qt(e),i=IDBKeyRange.bound([t],[t+1],!1,!0);return n.delete(i)}getMatchingKeysForTargetId(e,t){const n=IDBKeyRange.bound([t],[t+1],!1,!0),i=qt(e);let r=W();return i.X({range:n,Z:!0},(o,l,u)=>{const c=_t(o[1]),f=new M(c);r=r.add(f)}).next(()=>r)}containsKey(e,t){const n=qe(t.path),i=IDBKeyRange.bound([n],[jf(n)],!1,!0);let r=0;return qt(e).X({index:$l,Z:!0,range:i},([o,l],u,c)=>{o!==0&&(r++,c.done())}).next(()=>r>0)}Et(e,t){return Yn(e).get(t).next(n=>n?_i(n):null)}}function Yn(s){return Ae(s,fs)}function hd(s){return Ae(s,wn)}function qt(s){return Ae(s,_s)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dd="LruGarbageCollector",cp=1048576;function fd([s,e],[t,n]){const i=G(s,t);return i===0?G(e,n):i}class nI{constructor(e){this.Tr=e,this.buffer=new re(fd),this.Ir=0}dr(){return++this.Ir}Er(e){const t=[e,this.dr()];if(this.buffer.size<this.Tr)this.buffer=this.buffer.add(t);else{const n=this.buffer.last();fd(t,n)<0&&(this.buffer=this.buffer.delete(n).add(t))}}get maxValue(){return this.buffer.last()[0]}}class hp{constructor(e,t,n){this.garbageCollector=e,this.asyncQueue=t,this.localStore=n,this.Ar=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Rr(6e4)}stop(){this.Ar&&(this.Ar.cancel(),this.Ar=null)}get started(){return this.Ar!==null}Rr(e){N(dd,`Garbage collection scheduled in ${e}ms`),this.Ar=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Ar=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){sn(t)?N(dd,"Ignoring IndexedDB error during garbage collection: ",t):await nn(t)}await this.Rr(3e5)})}}class sI{constructor(e,t){this.Vr=e,this.params=t}calculateTargetCount(e,t){return this.Vr.mr(e).next(n=>Math.floor(t/100*n))}nthSequenceNumber(e,t){if(t===0)return A.resolve(Ke.ue);const n=new nI(t);return this.Vr.forEachTarget(e,i=>n.Er(i.sequenceNumber)).next(()=>this.Vr.gr(e,i=>n.Er(i))).next(()=>n.maxValue)}removeTargets(e,t,n){return this.Vr.removeTargets(e,t,n)}removeOrphanedDocuments(e,t){return this.Vr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(N("LruGarbageCollector","Garbage collection skipped; disabled"),A.resolve(cd)):this.getCacheSize(e).next(n=>n<this.params.cacheSizeCollectionThreshold?(N("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),cd):this.pr(e,t))}getCacheSize(e){return this.Vr.getCacheSize(e)}pr(e,t){let n,i,r,o,l,u,c;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(_=>(_>this.params.maximumSequenceNumbersToCollect?(N("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${_}`),i=this.params.maximumSequenceNumbersToCollect):i=_,o=Date.now(),this.nthSequenceNumber(e,i))).next(_=>(n=_,l=Date.now(),this.removeTargets(e,n,t))).next(_=>(r=_,u=Date.now(),this.removeOrphanedDocuments(e,n))).next(_=>(c=Date.now(),Jn()<=ft.DEBUG&&N("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-f}ms
	Determined least recently used ${i} in `+(l-o)+`ms
	Removed ${r} targets in `+(u-l)+`ms
	Removed ${_} documents in `+(c-u)+`ms
Total Duration: ${c-f}ms`),A.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:r,documentsRemoved:_})))}}function dp(s,e){return new sI(s,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iI{constructor(e,t){this.db=e,this.garbageCollector=dp(this,t)}mr(e){const t=this.yr(e);return this.db.getTargetCache().getTargetCount(e).next(n=>t.next(i=>n+i))}yr(e){let t=0;return this.gr(e,n=>{t++}).next(()=>t)}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}gr(e,t){return this.wr(e,(n,i)=>t(i))}addReference(e,t,n){return Dr(e,n)}removeReference(e,t,n){return Dr(e,n)}removeTargets(e,t,n){return this.db.getTargetCache().removeTargets(e,t,n)}markPotentiallyOrphaned(e,t){return Dr(e,t)}Sr(e,t){return function(i,r){let o=!1;return up(i).ee(l=>lp(i,l,r).next(u=>(u&&(o=!0),A.resolve(!u)))).next(()=>o)}(e,t)}removeOrphanedDocuments(e,t){const n=this.db.getRemoteDocumentCache().newChangeBuffer(),i=[];let r=0;return this.wr(e,(o,l)=>{if(l<=t){const u=this.Sr(e,o).next(c=>{if(!c)return r++,n.getEntry(e,o).next(()=>(n.removeEntry(o,q.min()),qt(e).delete(function(_){return[0,qe(_.path)]}(o))))});i.push(u)}}).next(()=>A.waitFor(i)).next(()=>n.apply(e)).next(()=>r)}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,n)}updateLimboDocument(e,t){return Dr(e,t)}wr(e,t){const n=qt(e);let i,r=Ke.ue;return n.X({index:$l},([o,l],{path:u,sequenceNumber:c})=>{o===0?(r!==Ke.ue&&t(new M(_t(i)),r),r=c,i=u):r=Ke.ue}).next(()=>{r!==Ke.ue&&t(new M(_t(i)),r)})}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function Dr(s,e){return qt(s).put(function(n,i){return{targetId:0,path:qe(n.path),sequenceNumber:i}}(e,s.currentSequenceNumber))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fp{constructor(){this.changes=new xt(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,me.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const n=this.changes.get(t);return n!==void 0?A.resolve(n):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rI{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,n){return dn(e).put(n)}removeEntry(e,t,n){return dn(e).delete(function(r,o){const l=r.path.toArray();return[l.slice(0,l.length-2),l[l.length-2],co(o),l[l.length-1]]}(t,n))}updateMetadata(e,t){return this.getMetadata(e).next(n=>(n.byteSize+=t,this.br(e,n)))}getEntry(e,t){let n=me.newInvalidDocument(t);return dn(e).X({index:qr,range:IDBKeyRange.only(ri(t))},(i,r)=>{n=this.Dr(t,r)}).next(()=>n)}vr(e,t){let n={size:0,document:me.newInvalidDocument(t)};return dn(e).X({index:qr,range:IDBKeyRange.only(ri(t))},(i,r)=>{n={document:this.Dr(t,r),size:fo(r)}}).next(()=>n)}getEntries(e,t){let n=Ze();return this.Cr(e,t,(i,r)=>{const o=this.Dr(i,r);n=n.insert(i,o)}).next(()=>n)}Fr(e,t){let n=Ze(),i=new _e(M.comparator);return this.Cr(e,t,(r,o)=>{const l=this.Dr(r,o);n=n.insert(r,l),i=i.insert(r,fo(o))}).next(()=>({documents:n,Mr:i}))}Cr(e,t,n){if(t.isEmpty())return A.resolve();let i=new re(md);t.forEach(u=>i=i.add(u));const r=IDBKeyRange.bound(ri(i.first()),ri(i.last())),o=i.getIterator();let l=o.getNext();return dn(e).X({index:qr,range:r},(u,c,f)=>{const _=M.fromSegments([...c.prefixPath,c.collectionGroup,c.documentId]);for(;l&&md(l,_)<0;)n(l,null),l=o.getNext();l&&l.isEqual(_)&&(n(l,c),l=o.hasNext()?o.getNext():null),l?f.G(ri(l)):f.done()}).next(()=>{for(;l;)n(l,null),l=o.hasNext()?o.getNext():null})}getDocumentsMatchingQuery(e,t,n,i,r){const o=t.path,l=[o.popLast().toArray(),o.lastSegment(),co(n.readTime),n.documentKey.path.isEmpty()?"":n.documentKey.path.lastSegment()],u=[o.popLast().toArray(),o.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return dn(e).j(IDBKeyRange.bound(l,u,!0)).next(c=>{r==null||r.incrementDocumentReadCount(c.length);let f=Ze();for(const _ of c){const m=this.Dr(M.fromSegments(_.prefixPath.concat(_.collectionGroup,_.documentId)),_);m.isFoundDocument()&&(Zi(t,m)||i.has(m.key))&&(f=f.insert(m.key,m))}return f})}getAllFromCollectionGroup(e,t,n,i){let r=Ze();const o=pd(t,n),l=pd(t,nt.max());return dn(e).X({index:Jf,range:IDBKeyRange.bound(o,l,!0)},(u,c,f)=>{const _=this.Dr(M.fromSegments(c.prefixPath.concat(c.collectionGroup,c.documentId)),c);r=r.insert(_.key,_),r.size===i&&f.done()}).next(()=>r)}newChangeBuffer(e){return new oI(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next(t=>t.byteSize)}getMetadata(e){return _d(e).get(sl).next(t=>(U(!!t,20021),t))}br(e,t){return _d(e).put(sl,t)}Dr(e,t){if(t){const n=KE(this.serializer,t);if(!(n.isNoDocument()&&n.version.isEqual(q.min())))return n}return me.newInvalidDocument(e)}}function _p(s){return new rI(s)}class oI extends fp{constructor(e,t){super(),this.Or=e,this.trackRemovals=t,this.Nr=new xt(n=>n.toString(),(n,i)=>n.isEqual(i))}applyChanges(e){const t=[];let n=0,i=new re((r,o)=>G(r.canonicalString(),o.canonicalString()));return this.changes.forEach((r,o)=>{const l=this.Nr.get(r);if(t.push(this.Or.removeEntry(e,r,l.readTime)),o.isValidDocument()){const u=Xh(this.Or.serializer,o);i=i.add(r.path.popLast());const c=fo(u);n+=c-l.size,t.push(this.Or.addEntry(e,r,u))}else if(n-=l.size,this.trackRemovals){const u=Xh(this.Or.serializer,o.convertToNoDocument(q.min()));t.push(this.Or.addEntry(e,r,u))}}),i.forEach(r=>{t.push(this.Or.indexManager.addToCollectionParentIndex(e,r))}),t.push(this.Or.updateMetadata(e,n)),A.waitFor(t)}getFromCache(e,t){return this.Or.vr(e,t).next(n=>(this.Nr.set(t,{size:n.size,readTime:n.document.readTime}),n.document))}getAllFromCache(e,t){return this.Or.Fr(e,t).next(({documents:n,Mr:i})=>(i.forEach((r,o)=>{this.Nr.set(r,{size:o,readTime:n.get(r).readTime})}),n))}}function _d(s){return Ae(s,Di)}function dn(s){return Ae(s,no)}function ri(s){const e=s.path.toArray();return[e.slice(0,e.length-2),e[e.length-2],e[e.length-1]]}function pd(s,e){const t=e.documentKey.path.toArray();return[s,co(e.readTime),t.slice(0,t.length-2),t.length>0?t[t.length-1]:""]}function md(s,e){const t=s.path.toArray(),n=e.path.toArray();let i=0;for(let r=0;r<t.length-2&&r<n.length-2;++r)if(i=G(t[r],n[r]),i)return i;return i=G(t.length,n.length),i||(i=G(t[t.length-2],n[n.length-2]),i||G(t[t.length-1],n[n.length-1]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aI{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pp{constructor(e,t,n,i){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=n,this.indexManager=i}getDocument(e,t){let n=null;return this.documentOverlayCache.getOverlay(e,t).next(i=>(n=i,this.remoteDocumentCache.getEntry(e,t))).next(i=>(n!==null&&wi(n.mutation,i,We.empty(),se.now()),i))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(n=>this.getLocalViewOfDocuments(e,n,W()).next(()=>n))}getLocalViewOfDocuments(e,t,n=W()){const i=pt();return this.populateOverlays(e,i,t).next(()=>this.computeViews(e,t,i,n).next(r=>{let o=di();return r.forEach((l,u)=>{o=o.insert(l,u.overlayedDocument)}),o}))}getOverlayedDocuments(e,t){const n=pt();return this.populateOverlays(e,n,t).next(()=>this.computeViews(e,t,n,W()))}populateOverlays(e,t,n){const i=[];return n.forEach(r=>{t.has(r)||i.push(r)}),this.documentOverlayCache.getOverlays(e,i).next(r=>{r.forEach((o,l)=>{t.set(o,l)})})}computeViews(e,t,n,i){let r=Ze();const o=Ti(),l=function(){return Ti()}();return t.forEach((u,c)=>{const f=n.get(c.key);i.has(c.key)&&(f===void 0||f.mutation instanceof Nt)?r=r.insert(c.key,c):f!==void 0?(o.set(c.key,f.mutation.getFieldMask()),wi(f.mutation,c,f.mutation.getFieldMask(),se.now())):o.set(c.key,We.empty())}),this.recalculateAndSaveOverlays(e,r).next(u=>(u.forEach((c,f)=>o.set(c,f)),t.forEach((c,f)=>{var _;return l.set(c,new aI(f,(_=o.get(c))!==null&&_!==void 0?_:null))}),l))}recalculateAndSaveOverlays(e,t){const n=Ti();let i=new _e((o,l)=>o-l),r=W();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(o=>{for(const l of o)l.keys().forEach(u=>{const c=t.get(u);if(c===null)return;let f=n.get(u)||We.empty();f=l.applyToLocalView(c,f),n.set(u,f);const _=(i.get(l.batchId)||W()).add(u);i=i.insert(l.batchId,_)})}).next(()=>{const o=[],l=i.getReverseIterator();for(;l.hasNext();){const u=l.getNext(),c=u.key,f=u.value,_=x_();f.forEach(m=>{if(!r.has(m)){const I=L_(t.get(m),n.get(m));I!==null&&_.set(m,I),r=r.add(m)}}),o.push(this.documentOverlayCache.saveOverlays(e,c,_))}return A.waitFor(o)}).next(()=>n)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(n=>this.recalculateAndSaveOverlays(e,n))}getDocumentsMatchingQuery(e,t,n,i){return function(o){return M.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):R_(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,n,i):this.getDocumentsMatchingCollectionQuery(e,t,n,i)}getNextDocuments(e,t,n,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,n,i).next(r=>{const o=i-r.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,n.largestBatchId,i-r.size):A.resolve(pt());let l=hs,u=r;return o.next(c=>A.forEach(c,(f,_)=>(l<_.largestBatchId&&(l=_.largestBatchId),r.get(f)?A.resolve():this.remoteDocumentCache.getEntry(e,f).next(m=>{u=u.insert(f,m)}))).next(()=>this.populateOverlays(e,c,r)).next(()=>this.computeViews(e,u,c,W())).next(f=>({batchId:l,changes:V_(f)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new M(t)).next(n=>{let i=di();return n.isFoundDocument()&&(i=i.insert(n.key,n)),i})}getDocumentsMatchingCollectionGroupQuery(e,t,n,i){const r=t.collectionGroup;let o=di();return this.indexManager.getCollectionParents(e,r).next(l=>A.forEach(l,u=>{const c=function(_,m){return new Ns(m,null,_.explicitOrderBy.slice(),_.filters.slice(),_.limit,_.limitType,_.startAt,_.endAt)}(t,u.child(r));return this.getDocumentsMatchingCollectionQuery(e,c,n,i).next(f=>{f.forEach((_,m)=>{o=o.insert(_,m)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,t,n,i){let r;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,n.largestBatchId).next(o=>(r=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,n,r,i))).next(o=>{r.forEach((u,c)=>{const f=c.getKey();o.get(f)===null&&(o=o.insert(f,me.newInvalidDocument(f)))});let l=di();return o.forEach((u,c)=>{const f=r.get(u);f!==void 0&&wi(f.mutation,c,We.empty(),se.now()),Zi(t,c)&&(l=l.insert(u,c))}),l})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lI{constructor(e){this.serializer=e,this.Br=new Map,this.Lr=new Map}getBundleMetadata(e,t){return A.resolve(this.Br.get(t))}saveBundleMetadata(e,t){return this.Br.set(t.id,function(i){return{id:i.id,version:i.version,createTime:ze(i.createTime)}}(t)),A.resolve()}getNamedQuery(e,t){return A.resolve(this.Lr.get(t))}saveNamedQuery(e,t){return this.Lr.set(t.name,function(i){return{name:i.name,query:sp(i.bundledQuery),readTime:ze(i.readTime)}}(t)),A.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uI{constructor(){this.overlays=new _e(M.comparator),this.kr=new Map}getOverlay(e,t){return A.resolve(this.overlays.get(t))}getOverlays(e,t){const n=pt();return A.forEach(t,i=>this.getOverlay(e,i).next(r=>{r!==null&&n.set(i,r)})).next(()=>n)}saveOverlays(e,t,n){return n.forEach((i,r)=>{this.wt(e,t,r)}),A.resolve()}removeOverlaysForBatchId(e,t,n){const i=this.kr.get(n);return i!==void 0&&(i.forEach(r=>this.overlays=this.overlays.remove(r)),this.kr.delete(n)),A.resolve()}getOverlaysForCollection(e,t,n){const i=pt(),r=t.length+1,o=new M(t.child("")),l=this.overlays.getIteratorFrom(o);for(;l.hasNext();){const u=l.getNext().value,c=u.getKey();if(!t.isPrefixOf(c.path))break;c.path.length===r&&u.largestBatchId>n&&i.set(u.getKey(),u)}return A.resolve(i)}getOverlaysForCollectionGroup(e,t,n,i){let r=new _e((c,f)=>c-f);const o=this.overlays.getIterator();for(;o.hasNext();){const c=o.getNext().value;if(c.getKey().getCollectionGroup()===t&&c.largestBatchId>n){let f=r.get(c.largestBatchId);f===null&&(f=pt(),r=r.insert(c.largestBatchId,f)),f.set(c.getKey(),c)}}const l=pt(),u=r.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((c,f)=>l.set(c,f)),!(l.size()>=i)););return A.resolve(l)}wt(e,t,n){const i=this.overlays.get(n.key);if(i!==null){const o=this.kr.get(i.largestBatchId).delete(n.key);this.kr.set(i.largestBatchId,o)}this.overlays=this.overlays.insert(n.key,new ru(t,n));let r=this.kr.get(t);r===void 0&&(r=W(),this.kr.set(t,r)),this.kr.set(t,r.add(n.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cI{constructor(){this.sessionToken=Ie.EMPTY_BYTE_STRING}getSessionToken(e){return A.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,A.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cu{constructor(){this.qr=new re(Ce.Qr),this.$r=new re(Ce.Ur)}isEmpty(){return this.qr.isEmpty()}addReference(e,t){const n=new Ce(e,t);this.qr=this.qr.add(n),this.$r=this.$r.add(n)}Kr(e,t){e.forEach(n=>this.addReference(n,t))}removeReference(e,t){this.Wr(new Ce(e,t))}Gr(e,t){e.forEach(n=>this.removeReference(n,t))}zr(e){const t=new M(new te([])),n=new Ce(t,e),i=new Ce(t,e+1),r=[];return this.$r.forEachInRange([n,i],o=>{this.Wr(o),r.push(o.key)}),r}jr(){this.qr.forEach(e=>this.Wr(e))}Wr(e){this.qr=this.qr.delete(e),this.$r=this.$r.delete(e)}Jr(e){const t=new M(new te([])),n=new Ce(t,e),i=new Ce(t,e+1);let r=W();return this.$r.forEachInRange([n,i],o=>{r=r.add(o.key)}),r}containsKey(e){const t=new Ce(e,0),n=this.qr.firstAfterOrEqual(t);return n!==null&&e.isEqual(n.key)}}class Ce{constructor(e,t){this.key=e,this.Hr=t}static Qr(e,t){return M.comparator(e.key,t.key)||G(e.Hr,t.Hr)}static Ur(e,t){return G(e.Hr,t.Hr)||M.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hI{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.er=1,this.Yr=new re(Ce.Qr)}checkEmpty(e){return A.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,n,i){const r=this.er;this.er++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new su(r,t,n,i);this.mutationQueue.push(o);for(const l of i)this.Yr=this.Yr.add(new Ce(l.key,r)),this.indexManager.addToCollectionParentIndex(e,l.key.path.popLast());return A.resolve(o)}lookupMutationBatch(e,t){return A.resolve(this.Zr(t))}getNextMutationBatchAfterBatchId(e,t){const n=t+1,i=this.Xr(n),r=i<0?0:i;return A.resolve(this.mutationQueue.length>r?this.mutationQueue[r]:null)}getHighestUnacknowledgedBatchId(){return A.resolve(this.mutationQueue.length===0?Tn:this.er-1)}getAllMutationBatches(e){return A.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const n=new Ce(t,0),i=new Ce(t,Number.POSITIVE_INFINITY),r=[];return this.Yr.forEachInRange([n,i],o=>{const l=this.Zr(o.Hr);r.push(l)}),A.resolve(r)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new re(G);return t.forEach(i=>{const r=new Ce(i,0),o=new Ce(i,Number.POSITIVE_INFINITY);this.Yr.forEachInRange([r,o],l=>{n=n.add(l.Hr)})}),A.resolve(this.ei(n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,i=n.length+1;let r=n;M.isDocumentKey(r)||(r=r.child(""));const o=new Ce(new M(r),0);let l=new re(G);return this.Yr.forEachWhile(u=>{const c=u.key.path;return!!n.isPrefixOf(c)&&(c.length===i&&(l=l.add(u.Hr)),!0)},o),A.resolve(this.ei(l))}ei(e){const t=[];return e.forEach(n=>{const i=this.Zr(n);i!==null&&t.push(i)}),t}removeMutationBatch(e,t){U(this.ti(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let n=this.Yr;return A.forEach(t.mutations,i=>{const r=new Ce(i.key,t.batchId);return n=n.delete(r),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)}).next(()=>{this.Yr=n})}rr(e){}containsKey(e,t){const n=new Ce(t,0),i=this.Yr.firstAfterOrEqual(n);return A.resolve(t.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,A.resolve()}ti(e,t){return this.Xr(e)}Xr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Zr(e){const t=this.Xr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dI{constructor(e){this.ni=e,this.docs=function(){return new _e(M.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const n=t.key,i=this.docs.get(n),r=i?i.size:0,o=this.ni(t);return this.docs=this.docs.insert(n,{document:t.mutableCopy(),size:o}),this.size+=o-r,this.indexManager.addToCollectionParentIndex(e,n.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const n=this.docs.get(t);return A.resolve(n?n.document.mutableCopy():me.newInvalidDocument(t))}getEntries(e,t){let n=Ze();return t.forEach(i=>{const r=this.docs.get(i);n=n.insert(i,r?r.document.mutableCopy():me.newInvalidDocument(i))}),A.resolve(n)}getDocumentsMatchingQuery(e,t,n,i){let r=Ze();const o=t.path,l=new M(o.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(l);for(;u.hasNext();){const{key:c,value:{document:f}}=u.getNext();if(!o.isPrefixOf(c.path))break;c.path.length>o.length+1||Kl(Wf(f),n)<=0||(i.has(f.key)||Zi(t,f))&&(r=r.insert(f.key,f.mutableCopy()))}return A.resolve(r)}getAllFromCollectionGroup(e,t,n,i){F(9500)}ri(e,t){return A.forEach(this.docs,n=>t(n))}newChangeBuffer(e){return new fI(this)}getSize(e){return A.resolve(this.size)}}class fI extends fp{constructor(e){super(),this.Or=e}applyChanges(e){const t=[];return this.changes.forEach((n,i)=>{i.isValidDocument()?t.push(this.Or.addEntry(e,i)):this.Or.removeEntry(n)}),A.waitFor(t)}getFromCache(e,t){return this.Or.getEntry(e,t)}getAllFromCache(e,t){return this.Or.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _I{constructor(e){this.persistence=e,this.ii=new xt(t=>bn(t),Ji),this.lastRemoteSnapshotVersion=q.min(),this.highestTargetId=0,this.si=0,this.oi=new cu,this.targetCount=0,this._i=Nn.ar()}forEachTarget(e,t){return this.ii.forEach((n,i)=>t(i)),A.resolve()}getLastRemoteSnapshotVersion(e){return A.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return A.resolve(this.si)}allocateTargetId(e){return this.highestTargetId=this._i.next(),A.resolve(this.highestTargetId)}setTargetsMetadata(e,t,n){return n&&(this.lastRemoteSnapshotVersion=n),t>this.si&&(this.si=t),A.resolve()}hr(e){this.ii.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this._i=new Nn(t),this.highestTargetId=t),e.sequenceNumber>this.si&&(this.si=e.sequenceNumber)}addTargetData(e,t){return this.hr(t),this.targetCount+=1,A.resolve()}updateTargetData(e,t){return this.hr(t),A.resolve()}removeTargetData(e,t){return this.ii.delete(t.target),this.oi.zr(t.targetId),this.targetCount-=1,A.resolve()}removeTargets(e,t,n){let i=0;const r=[];return this.ii.forEach((o,l)=>{l.sequenceNumber<=t&&n.get(l.targetId)===null&&(this.ii.delete(o),r.push(this.removeMatchingKeysForTargetId(e,l.targetId)),i++)}),A.waitFor(r).next(()=>i)}getTargetCount(e){return A.resolve(this.targetCount)}getTargetData(e,t){const n=this.ii.get(t)||null;return A.resolve(n)}addMatchingKeys(e,t,n){return this.oi.Kr(t,n),A.resolve()}removeMatchingKeys(e,t,n){this.oi.Gr(t,n);const i=this.persistence.referenceDelegate,r=[];return i&&t.forEach(o=>{r.push(i.markPotentiallyOrphaned(e,o))}),A.waitFor(r)}removeMatchingKeysForTargetId(e,t){return this.oi.zr(t),A.resolve()}getMatchingKeysForTargetId(e,t){const n=this.oi.Jr(t);return A.resolve(n)}containsKey(e,t){return A.resolve(this.oi.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hu{constructor(e,t){this.ai={},this.overlays={},this.ui=new Ke(0),this.ci=!1,this.ci=!0,this.li=new cI,this.referenceDelegate=e(this),this.hi=new _I(this),this.indexManager=new ZE,this.remoteDocumentCache=function(i){return new dI(i)}(n=>this.referenceDelegate.Pi(n)),this.serializer=new tp(t),this.Ti=new lI(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ci=!1,Promise.resolve()}get started(){return this.ci}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new uI,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let n=this.ai[e.toKey()];return n||(n=new hI(t,this.referenceDelegate),this.ai[e.toKey()]=n),n}getGlobalsCache(){return this.li}getTargetCache(){return this.hi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ti}runTransaction(e,t,n){N("MemoryPersistence","Starting transaction:",e);const i=new pI(this.ui.next());return this.referenceDelegate.Ii(),n(i).next(r=>this.referenceDelegate.di(i).next(()=>r)).toPromise().then(r=>(i.raiseOnCommittedEvent(),r))}Ei(e,t){return A.or(Object.values(this.ai).map(n=>()=>n.containsKey(e,t)))}}class pI extends Qf{constructor(e){super(),this.currentSequenceNumber=e}}class Yo{constructor(e){this.persistence=e,this.Ai=new cu,this.Ri=null}static Vi(e){return new Yo(e)}get mi(){if(this.Ri)return this.Ri;throw F(60996)}addReference(e,t,n){return this.Ai.addReference(n,t),this.mi.delete(n.toString()),A.resolve()}removeReference(e,t,n){return this.Ai.removeReference(n,t),this.mi.add(n.toString()),A.resolve()}markPotentiallyOrphaned(e,t){return this.mi.add(t.toString()),A.resolve()}removeTarget(e,t){this.Ai.zr(t.targetId).forEach(i=>this.mi.add(i.toString()));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(e,t.targetId).next(i=>{i.forEach(r=>this.mi.add(r.toString()))}).next(()=>n.removeTargetData(e,t))}Ii(){this.Ri=new Set}di(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return A.forEach(this.mi,n=>{const i=M.fromPath(n);return this.fi(e,i).next(r=>{r||t.removeEntry(i,q.min())})}).next(()=>(this.Ri=null,t.apply(e)))}updateLimboDocument(e,t){return this.fi(e,t).next(n=>{n?this.mi.delete(t.toString()):this.mi.add(t.toString())})}Pi(e){return 0}fi(e,t){return A.or([()=>A.resolve(this.Ai.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ei(e,t)])}}class _o{constructor(e,t){this.persistence=e,this.gi=new xt(n=>qe(n.path),(n,i)=>n.isEqual(i)),this.garbageCollector=dp(this,t)}static Vi(e,t){return new _o(e,t)}Ii(){}di(e){return A.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}mr(e){const t=this.yr(e);return this.persistence.getTargetCache().getTargetCount(e).next(n=>t.next(i=>n+i))}yr(e){let t=0;return this.gr(e,n=>{t++}).next(()=>t)}gr(e,t){return A.forEach(this.gi,(n,i)=>this.Sr(e,n,i).next(r=>r?A.resolve():t(i)))}removeTargets(e,t,n){return this.persistence.getTargetCache().removeTargets(e,t,n)}removeOrphanedDocuments(e,t){let n=0;const i=this.persistence.getRemoteDocumentCache(),r=i.newChangeBuffer();return i.ri(e,o=>this.Sr(e,o,t).next(l=>{l||(n++,r.removeEntry(o,q.min()))})).next(()=>r.apply(e)).next(()=>n)}markPotentiallyOrphaned(e,t){return this.gi.set(t,e.currentSequenceNumber),A.resolve()}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,n)}addReference(e,t,n){return this.gi.set(n,e.currentSequenceNumber),A.resolve()}removeReference(e,t,n){return this.gi.set(n,e.currentSequenceNumber),A.resolve()}updateLimboDocument(e,t){return this.gi.set(t,e.currentSequenceNumber),A.resolve()}Pi(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Gr(e.data.value)),t}Sr(e,t,n){return A.or([()=>this.persistence.Ei(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const i=this.gi.get(t);return A.resolve(i!==void 0&&i>n)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mI{constructor(e){this.serializer=e}q(e,t,n,i){const r=new Mo("createOrUpgrade",t);n<1&&i>=1&&(function(u){u.createObjectStore(Xi)}(e),function(u){u.createObjectStore(Ni,{keyPath:Ny}),u.createObjectStore(rt,{keyPath:Sh,autoIncrement:!0}).createIndex(In,Ph,{unique:!0}),u.createObjectStore(ds)}(e),gd(e),function(u){u.createObjectStore(_n)}(e));let o=A.resolve();return n<3&&i>=3&&(n!==0&&(function(u){u.deleteObjectStore(_s),u.deleteObjectStore(fs),u.deleteObjectStore(wn)}(e),gd(e)),o=o.next(()=>function(u){const c=u.store(wn),f={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:q.min().toTimestamp(),targetCount:0};return c.put(so,f)}(r))),n<4&&i>=4&&(n!==0&&(o=o.next(()=>function(u,c){return c.store(rt).j().next(_=>{u.deleteObjectStore(rt),u.createObjectStore(rt,{keyPath:Sh,autoIncrement:!0}).createIndex(In,Ph,{unique:!0});const m=c.store(rt),I=_.map(S=>m.put(S));return A.waitFor(I)})}(e,r))),o=o.next(()=>{(function(u){u.createObjectStore(ps,{keyPath:qy})})(e)})),n<5&&i>=5&&(o=o.next(()=>this.pi(r))),n<6&&i>=6&&(o=o.next(()=>(function(u){u.createObjectStore(Di)}(e),this.yi(r)))),n<7&&i>=7&&(o=o.next(()=>this.wi(r))),n<8&&i>=8&&(o=o.next(()=>this.Si(e,r))),n<9&&i>=9&&(o=o.next(()=>{(function(u){u.objectStoreNames.contains("remoteDocumentChanges")&&u.deleteObjectStore("remoteDocumentChanges")})(e)})),n<10&&i>=10&&(o=o.next(()=>this.bi(r))),n<11&&i>=11&&(o=o.next(()=>{(function(u){u.createObjectStore(Lo,{keyPath:jy})})(e),function(u){u.createObjectStore(Uo,{keyPath:Gy})}(e)})),n<12&&i>=12&&(o=o.next(()=>{(function(u){const c=u.createObjectStore(Bo,{keyPath:Yy});c.createIndex(rl,Xy,{unique:!1}),c.createIndex(n_,Jy,{unique:!1})})(e)})),n<13&&i>=13&&(o=o.next(()=>function(u){const c=u.createObjectStore(no,{keyPath:ky});c.createIndex(qr,Oy),c.createIndex(Jf,My)}(e)).next(()=>this.Di(e,r)).next(()=>e.deleteObjectStore(_n))),n<14&&i>=14&&(o=o.next(()=>this.Ci(e,r))),n<15&&i>=15&&(o=o.next(()=>function(u){u.createObjectStore(Ql,{keyPath:zy,autoIncrement:!0}).createIndex(il,Ky,{unique:!1}),u.createObjectStore(yi,{keyPath:Wy}).createIndex(e_,$y,{unique:!1}),u.createObjectStore(Ei,{keyPath:Qy}).createIndex(t_,Hy,{unique:!1})}(e))),n<16&&i>=16&&(o=o.next(()=>{t.objectStore(yi).clear()}).next(()=>{t.objectStore(Ei).clear()})),n<17&&i>=17&&(o=o.next(()=>{(function(u){u.createObjectStore(Hl,{keyPath:Zy})})(e)})),n<18&&i>=18&&bf()&&(o=o.next(()=>{t.objectStore(yi).clear()}).next(()=>{t.objectStore(Ei).clear()})),o}yi(e){let t=0;return e.store(_n).X((n,i)=>{t+=fo(i)}).next(()=>{const n={byteSize:t};return e.store(Di).put(sl,n)})}pi(e){const t=e.store(Ni),n=e.store(rt);return t.j().next(i=>A.forEach(i,r=>{const o=IDBKeyRange.bound([r.userId,Tn],[r.userId,r.lastAcknowledgedBatchId]);return n.j(In,o).next(l=>A.forEach(l,u=>{U(u.userId===r.userId,18650,"Cannot process batch from unexpected user",{batchId:u.batchId});const c=gn(this.serializer,u);return ap(e,r.userId,c).next(()=>{})}))}))}wi(e){const t=e.store(_s),n=e.store(_n);return e.store(wn).get(so).next(i=>{const r=[];return n.X((o,l)=>{const u=new te(o),c=function(_){return[0,qe(_)]}(u);r.push(t.get(c).next(f=>f?A.resolve():(_=>t.put({targetId:0,path:qe(_),sequenceNumber:i.highestListenSequenceNumber}))(u)))}).next(()=>A.waitFor(r))})}Si(e,t){e.createObjectStore(ki,{keyPath:By});const n=t.store(ki),i=new uu,r=o=>{if(i.add(o)){const l=o.lastSegment(),u=o.popLast();return n.put({collectionId:l,parent:qe(u)})}};return t.store(_n).X({Z:!0},(o,l)=>{const u=new te(o);return r(u.popLast())}).next(()=>t.store(ds).X({Z:!0},([o,l,u],c)=>{const f=_t(l);return r(f.popLast())}))}bi(e){const t=e.store(fs);return t.X((n,i)=>{const r=_i(i),o=np(this.serializer,r);return t.put(o)})}Di(e,t){const n=t.store(_n),i=[];return n.X((r,o)=>{const l=t.store(no),u=function(_){return _.document?new M(te.fromString(_.document.name).popFirst(5)):_.noDocument?M.fromSegments(_.noDocument.path):_.unknownDocument?M.fromSegments(_.unknownDocument.path):F(36783)}(o).path.toArray(),c={prefixPath:u.slice(0,u.length-2),collectionGroup:u[u.length-2],documentId:u[u.length-1],readTime:o.readTime||[0,0],unknownDocument:o.unknownDocument,noDocument:o.noDocument,document:o.document,hasCommittedMutations:!!o.hasCommittedMutations};i.push(l.put(c))}).next(()=>A.waitFor(i))}Ci(e,t){const n=t.store(rt),i=_p(this.serializer),r=new hu(Yo.Vi,this.serializer.gt);return n.j().next(o=>{const l=new Map;return o.forEach(u=>{var c;let f=(c=l.get(u.userId))!==null&&c!==void 0?c:W();gn(this.serializer,u).keys().forEach(_=>f=f.add(_)),l.set(u.userId,f)}),A.forEach(l,(u,c)=>{const f=new Oe(c),_=Qo.yt(this.serializer,f),m=r.getIndexManager(f),I=Ho.yt(f,this.serializer,m,r.referenceDelegate);return new pp(i,I,_,m).recalculateAndSaveOverlaysForDocumentKeys(new ol(t,Ke.ue),u).next()})})}}function gd(s){s.createObjectStore(_s,{keyPath:Ly}).createIndex($l,Uy,{unique:!0}),s.createObjectStore(fs,{keyPath:"targetId"}).createIndex(Zf,Fy,{unique:!0}),s.createObjectStore(wn)}const Bt="IndexedDbPersistence",Ba=18e5,qa=5e3,ja="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.",gI="main";class du{constructor(e,t,n,i,r,o,l,u,c,f,_=18){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=n,this.Fi=r,this.window=o,this.document=l,this.Mi=c,this.xi=f,this.Oi=_,this.ui=null,this.ci=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Ni=null,this.inForeground=!1,this.Bi=null,this.Li=null,this.ki=Number.NEGATIVE_INFINITY,this.qi=m=>Promise.resolve(),!du.C())throw new D(b.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new iI(this,i),this.Qi=t+gI,this.serializer=new tp(u),this.$i=new zt(this.Qi,this.Oi,new mI(this.serializer)),this.li=new $E,this.hi=new tI(this.referenceDelegate,this.serializer),this.remoteDocumentCache=_p(this.serializer),this.Ti=new WE,this.window&&this.window.localStorage?this.Ui=this.window.localStorage:(this.Ui=null,f===!1&&ye(Bt,"LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.Ki().then(()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new D(b.FAILED_PRECONDITION,ja);return this.Wi(),this.Gi(),this.zi(),this.runTransaction("getHighestListenSequenceNumber","readonly",e=>this.hi.getHighestSequenceNumber(e))}).then(e=>{this.ui=new Ke(e,this.Mi)}).then(()=>{this.ci=!0}).catch(e=>(this.$i&&this.$i.close(),Promise.reject(e)))}ji(e){return this.qi=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.$i.setDatabaseDeletedListener(e)}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.Fi.enqueueAndForget(async()=>{this.started&&await this.Ki()}))}Ki(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",e=>kr(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next(()=>{if(this.isPrimary)return this.Ji(e).next(t=>{t||(this.isPrimary=!1,this.Fi.enqueueRetryable(()=>this.qi(!1)))})}).next(()=>this.Hi(e)).next(t=>this.isPrimary&&!t?this.Yi(e).next(()=>!1):!!t&&this.Zi(e).next(()=>!0))).catch(e=>{if(sn(e))return N(Bt,"Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return N(Bt,"Releasing owner lease after error during lease refresh",e),!1}).then(e=>{this.isPrimary!==e&&this.Fi.enqueueRetryable(()=>this.qi(e)),this.isPrimary=e})}Ji(e){return oi(e).get(Kn).next(t=>A.resolve(this.Xi(t)))}es(e){return kr(e).delete(this.clientId)}async ts(){if(this.isPrimary&&!this.ns(this.ki,Ba)){this.ki=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",t=>{const n=Ae(t,ps);return n.j().next(i=>{const r=this.rs(i,Ba),o=i.filter(l=>r.indexOf(l)===-1);return A.forEach(o,l=>n.delete(l.clientId)).next(()=>o)})}).catch(()=>[]);if(this.Ui)for(const t of e)this.Ui.removeItem(this.ss(t.clientId))}}zi(){this.Li=this.Fi.enqueueAfterDelay("client_metadata_refresh",4e3,()=>this.Ki().then(()=>this.ts()).then(()=>this.zi()))}Xi(e){return!!e&&e.ownerId===this.clientId}Hi(e){return this.xi?A.resolve(!0):oi(e).get(Kn).next(t=>{if(t!==null&&this.ns(t.leaseTimestampMs,qa)&&!this._s(t.ownerId)){if(this.Xi(t)&&this.networkEnabled)return!0;if(!this.Xi(t)){if(!t.allowTabSynchronization)throw new D(b.FAILED_PRECONDITION,ja);return!1}}return!(!this.networkEnabled||!this.inForeground)||kr(e).j().next(n=>this.rs(n,qa).find(i=>{if(this.clientId!==i.clientId){const r=!this.networkEnabled&&i.networkEnabled,o=!this.inForeground&&i.inForeground,l=this.networkEnabled===i.networkEnabled;if(r||o&&l)return!0}return!1})===void 0)}).next(t=>(this.isPrimary!==t&&N(Bt,`Client ${t?"is":"is not"} eligible for a primary lease.`),t))}async shutdown(){this.ci=!1,this.us(),this.Li&&(this.Li.cancel(),this.Li=null),this.cs(),this.ls(),await this.$i.runTransaction("shutdown","readwrite",[Xi,ps],e=>{const t=new ol(e,Ke.ue);return this.Yi(t).next(()=>this.es(t))}),this.$i.close(),this.hs()}rs(e,t){return e.filter(n=>this.ns(n.updateTimeMs,t)&&!this._s(n.clientId))}Ps(){return this.runTransaction("getActiveClients","readonly",e=>kr(e).j().next(t=>this.rs(t,Ba).map(n=>n.clientId)))}get started(){return this.ci}getGlobalsCache(){return this.li}getMutationQueue(e,t){return Ho.yt(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.hi}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new eI(e,this.serializer.gt.databaseId)}getDocumentOverlayCache(e){return Qo.yt(this.serializer,e)}getBundleCache(){return this.Ti}runTransaction(e,t,n){N(Bt,"Starting transaction:",e);const i=t==="readonly"?"readonly":"readwrite",r=function(u){return u===18?nE:u===17?o_:u===16?tE:u===15?Yl:u===14?r_:u===13?i_:u===12?eE:u===11?s_:void F(60245)}(this.Oi);let o;return this.$i.runTransaction(e,i,r,l=>(o=new ol(l,this.ui?this.ui.next():Ke.ue),t==="readwrite-primary"?this.Ji(o).next(u=>!!u||this.Hi(o)).next(u=>{if(!u)throw ye(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.Fi.enqueueRetryable(()=>this.qi(!1)),new D(b.FAILED_PRECONDITION,$f);return n(o)}).next(u=>this.Zi(o).next(()=>u)):this.Ts(o).next(()=>n(o)))).then(l=>(o.raiseOnCommittedEvent(),l))}Ts(e){return oi(e).get(Kn).next(t=>{if(t!==null&&this.ns(t.leaseTimestampMs,qa)&&!this._s(t.ownerId)&&!this.Xi(t)&&!(this.xi||this.allowTabSynchronization&&t.allowTabSynchronization))throw new D(b.FAILED_PRECONDITION,ja)})}Zi(e){const t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return oi(e).put(Kn,t)}static C(){return zt.C()}Yi(e){const t=oi(e);return t.get(Kn).next(n=>this.Xi(n)?(N(Bt,"Releasing primary lease."),t.delete(Kn)):A.resolve())}ns(e,t){const n=Date.now();return!(e<n-t)&&(!(e>n)||(ye(`Detected an update time that is in the future: ${e} > ${n}`),!1))}Wi(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.Bi=()=>{this.Fi.enqueueAndForget(()=>(this.inForeground=this.document.visibilityState==="visible",this.Ki()))},this.document.addEventListener("visibilitychange",this.Bi),this.inForeground=this.document.visibilityState==="visible")}cs(){this.Bi&&(this.document.removeEventListener("visibilitychange",this.Bi),this.Bi=null)}Gi(){var e;typeof((e=this.window)===null||e===void 0?void 0:e.addEventListener)=="function"&&(this.Ni=()=>{this.us();const t=/(?:Version|Mobile)\/1[456]/;Pf()&&(navigator.appVersion.match(t)||navigator.userAgent.match(t))&&this.Fi.enterRestrictedMode(!0),this.Fi.enqueueAndForget(()=>this.shutdown())},this.window.addEventListener("pagehide",this.Ni))}ls(){this.Ni&&(this.window.removeEventListener("pagehide",this.Ni),this.Ni=null)}_s(e){var t;try{const n=((t=this.Ui)===null||t===void 0?void 0:t.getItem(this.ss(e)))!==null;return N(Bt,`Client '${e}' ${n?"is":"is not"} zombied in LocalStorage`),n}catch(n){return ye(Bt,"Failed to get zombied client id.",n),!1}}us(){if(this.Ui)try{this.Ui.setItem(this.ss(this.clientId),String(Date.now()))}catch(e){ye("Failed to set zombie client id.",e)}}hs(){if(this.Ui)try{this.Ui.removeItem(this.ss(this.clientId))}catch{}}ss(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function oi(s){return Ae(s,Xi)}function kr(s){return Ae(s,ps)}function mp(s,e){let t=s.projectId;return s.isDefaultDatabase||(t+="."+s.database),"firestore/"+e+"/"+t+"/"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fu{constructor(e,t,n,i){this.targetId=e,this.fromCache=t,this.Is=n,this.ds=i}static Es(e,t){let n=W(),i=W();for(const r of t.docChanges)switch(r.type){case 0:n=n.add(r.doc.key);break;case 1:i=i.add(r.doc.key)}return new fu(e,t.fromCache,n,i)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yI{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gp{constructor(){this.As=!1,this.Rs=!1,this.Vs=100,this.fs=function(){return Pf()?8:Hf(Jr())>0?6:4}()}initialize(e,t){this.gs=e,this.indexManager=t,this.As=!0}getDocumentsMatchingQuery(e,t,n,i){const r={result:null};return this.ps(e,t).next(o=>{r.result=o}).next(()=>{if(!r.result)return this.ys(e,t,i,n).next(o=>{r.result=o})}).next(()=>{if(r.result)return;const o=new yI;return this.ws(e,t,o).next(l=>{if(r.result=l,this.Rs)return this.Ss(e,t,o,l.size)})}).next(()=>r.result)}Ss(e,t,n,i){return n.documentReadCount<this.Vs?(Jn()<=ft.DEBUG&&N("QueryEngine","SDK will not create cache indexes for query:",Zn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),A.resolve()):(Jn()<=ft.DEBUG&&N("QueryEngine","Query:",Zn(t),"scans",n.documentReadCount,"local documents and returns",i,"documents as results."),n.documentReadCount>this.fs*i?(Jn()<=ft.DEBUG&&N("QueryEngine","The SDK decides to create cache indexes for query:",Zn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,et(t))):A.resolve())}ps(e,t){if(qh(t))return A.resolve(null);let n=et(t);return this.indexManager.getIndexType(e,n).next(i=>i===0?null:(t.limit!==null&&i===1&&(t=ao(t,null,"F"),n=et(t)),this.indexManager.getDocumentsMatchingTarget(e,n).next(r=>{const o=W(...r);return this.gs.getDocuments(e,o).next(l=>this.indexManager.getMinOffset(e,n).next(u=>{const c=this.bs(t,l);return this.Ds(t,c,o,u.readTime)?this.ps(e,ao(t,null,"F")):this.vs(e,c,t,u)}))})))}ys(e,t,n,i){return qh(t)||i.isEqual(q.min())?A.resolve(null):this.gs.getDocuments(e,n).next(r=>{const o=this.bs(t,r);return this.Ds(t,o,n,i)?A.resolve(null):(Jn()<=ft.DEBUG&&N("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),Zn(t)),this.vs(e,o,t,Kf(i,hs)).next(l=>l))})}bs(e,t){let n=new re(P_(e));return t.forEach((i,r)=>{Zi(e,r)&&(n=n.add(r))}),n}Ds(e,t,n,i){if(e.limit===null)return!1;if(n.size!==t.size)return!0;const r=e.limitType==="F"?t.last():t.first();return!!r&&(r.hasPendingWrites||r.version.compareTo(i)>0)}ws(e,t,n){return Jn()<=ft.DEBUG&&N("QueryEngine","Using full collection scan to execute query:",Zn(t)),this.gs.getDocumentsMatchingQuery(e,t,nt.min(),n)}vs(e,t,n,i){return this.gs.getDocumentsMatchingQuery(e,n,i).next(r=>(t.forEach(o=>{r=r.insert(o.key,o)}),r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _u="LocalStore",EI=3e8;class II{constructor(e,t,n,i){this.persistence=e,this.Cs=t,this.serializer=i,this.Fs=new _e(G),this.Ms=new xt(r=>bn(r),Ji),this.xs=new Map,this.Os=e.getRemoteDocumentCache(),this.hi=e.getTargetCache(),this.Ti=e.getBundleCache(),this.Ns(n)}Ns(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new pp(this.Os,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Os.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Fs))}}function yp(s,e,t,n){return new II(s,e,t,n)}async function Ep(s,e){const t=L(s);return await t.persistence.runTransaction("Handle user change","readonly",n=>{let i;return t.mutationQueue.getAllMutationBatches(n).next(r=>(i=r,t.Ns(e),t.mutationQueue.getAllMutationBatches(n))).next(r=>{const o=[],l=[];let u=W();for(const c of i){o.push(c.batchId);for(const f of c.mutations)u=u.add(f.key)}for(const c of r){l.push(c.batchId);for(const f of c.mutations)u=u.add(f.key)}return t.localDocuments.getDocuments(n,u).next(c=>({Bs:c,removedBatchIds:o,addedBatchIds:l}))})})}function vI(s,e){const t=L(s);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",n=>{const i=e.batch.keys(),r=t.Os.newChangeBuffer({trackRemovals:!0});return function(l,u,c,f){const _=c.batch,m=_.keys();let I=A.resolve();return m.forEach(S=>{I=I.next(()=>f.getEntry(u,S)).next(V=>{const x=c.docVersions.get(S);U(x!==null,48541),V.version.compareTo(x)<0&&(_.applyToRemoteDocument(V,c),V.isValidDocument()&&(V.setReadTime(c.commitVersion),f.addEntry(V)))})}),I.next(()=>l.mutationQueue.removeMutationBatch(u,_))}(t,n,e,r).next(()=>r.apply(n)).next(()=>t.mutationQueue.performConsistencyCheck(n)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(n,i,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(n,function(l){let u=W();for(let c=0;c<l.mutationResults.length;++c)l.mutationResults[c].transformResults.length>0&&(u=u.add(l.batch.mutations[c].key));return u}(e))).next(()=>t.localDocuments.getDocuments(n,i))})}function Ip(s){const e=L(s);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.hi.getLastRemoteSnapshotVersion(t))}function TI(s,e){const t=L(s),n=e.snapshotVersion;let i=t.Fs;return t.persistence.runTransaction("Apply remote event","readwrite-primary",r=>{const o=t.Os.newChangeBuffer({trackRemovals:!0});i=t.Fs;const l=[];e.targetChanges.forEach((f,_)=>{const m=i.get(_);if(!m)return;l.push(t.hi.removeMatchingKeys(r,f.removedDocuments,_).next(()=>t.hi.addMatchingKeys(r,f.addedDocuments,_)));let I=m.withSequenceNumber(r.currentSequenceNumber);e.targetMismatches.get(_)!==null?I=I.withResumeToken(Ie.EMPTY_BYTE_STRING,q.min()).withLastLimboFreeSnapshotVersion(q.min()):f.resumeToken.approximateByteSize()>0&&(I=I.withResumeToken(f.resumeToken,n)),i=i.insert(_,I),function(V,x,K){return V.resumeToken.approximateByteSize()===0||x.snapshotVersion.toMicroseconds()-V.snapshotVersion.toMicroseconds()>=EI?!0:K.addedDocuments.size+K.modifiedDocuments.size+K.removedDocuments.size>0}(m,I,f)&&l.push(t.hi.updateTargetData(r,I))});let u=Ze(),c=W();if(e.documentUpdates.forEach(f=>{e.resolvedLimboDocuments.has(f)&&l.push(t.persistence.referenceDelegate.updateLimboDocument(r,f))}),l.push(wI(r,o,e.documentUpdates).next(f=>{u=f.Ls,c=f.ks})),!n.isEqual(q.min())){const f=t.hi.getLastRemoteSnapshotVersion(r).next(_=>t.hi.setTargetsMetadata(r,r.currentSequenceNumber,n));l.push(f)}return A.waitFor(l).next(()=>o.apply(r)).next(()=>t.localDocuments.getLocalViewOfDocuments(r,u,c)).next(()=>u)}).then(r=>(t.Fs=i,r))}function wI(s,e,t){let n=W(),i=W();return t.forEach(r=>n=n.add(r)),e.getEntries(s,n).next(r=>{let o=Ze();return t.forEach((l,u)=>{const c=r.get(l);u.isFoundDocument()!==c.isFoundDocument()&&(i=i.add(l)),u.isNoDocument()&&u.version.isEqual(q.min())?(e.removeEntry(l,u.readTime),o=o.insert(l,u)):!c.isValidDocument()||u.version.compareTo(c.version)>0||u.version.compareTo(c.version)===0&&c.hasPendingWrites?(e.addEntry(u),o=o.insert(l,u)):N(_u,"Ignoring outdated watch update for ",l,". Current version:",c.version," Watch version:",u.version)}),{Ls:o,ks:i}})}function AI(s,e){const t=L(s);return t.persistence.runTransaction("Get next mutation batch","readonly",n=>(e===void 0&&(e=Tn),t.mutationQueue.getNextMutationBatchAfterBatchId(n,e)))}function po(s,e){const t=L(s);return t.persistence.runTransaction("Allocate target","readwrite",n=>{let i;return t.hi.getTargetData(n,e).next(r=>r?(i=r,A.resolve(i)):t.hi.allocateTargetId(n).next(o=>(i=new wt(e,o,"TargetPurposeListen",n.currentSequenceNumber),t.hi.addTargetData(n,i).next(()=>i))))}).then(n=>{const i=t.Fs.get(n.targetId);return(i===null||n.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(t.Fs=t.Fs.insert(n.targetId,n),t.Ms.set(e,n.targetId)),n})}async function As(s,e,t){const n=L(s),i=n.Fs.get(e),r=t?"readwrite":"readwrite-primary";try{t||await n.persistence.runTransaction("Release target",r,o=>n.persistence.referenceDelegate.removeTarget(o,i))}catch(o){if(!sn(o))throw o;N(_u,`Failed to update sequence numbers for target ${e}: ${o}`)}n.Fs=n.Fs.remove(e),n.Ms.delete(i.target)}function vl(s,e,t){const n=L(s);let i=q.min(),r=W();return n.persistence.runTransaction("Execute query","readwrite",o=>function(u,c,f){const _=L(u),m=_.Ms.get(f);return m!==void 0?A.resolve(_.Fs.get(m)):_.hi.getTargetData(c,f)}(n,o,et(e)).next(l=>{if(l)return i=l.lastLimboFreeSnapshotVersion,n.hi.getMatchingKeysForTargetId(o,l.targetId).next(u=>{r=u})}).next(()=>n.Cs.getDocumentsMatchingQuery(o,e,t?i:q.min(),t?r:W())).next(l=>(wp(n,S_(e),l),{documents:l,qs:r})))}function vp(s,e){const t=L(s),n=L(t.hi),i=t.Fs.get(e);return i?Promise.resolve(i.target):t.persistence.runTransaction("Get target data","readonly",r=>n.Et(r,e).next(o=>o?o.target:null))}function Tp(s,e){const t=L(s),n=t.xs.get(e)||q.min();return t.persistence.runTransaction("Get new document changes","readonly",i=>t.Os.getAllFromCollectionGroup(i,e,Kf(n,hs),Number.MAX_SAFE_INTEGER)).then(i=>(wp(t,e,i),i))}function wp(s,e,t){let n=s.xs.get(e)||q.min();t.forEach((i,r)=>{r.readTime.compareTo(n)>0&&(n=r.readTime)}),s.xs.set(e,n)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ap="firestore_clients";function yd(s,e){return`${Ap}_${s}_${e}`}const Rp="firestore_mutations";function Ed(s,e,t){let n=`${Rp}_${s}_${t}`;return e.isAuthenticated()&&(n+=`_${e.uid}`),n}const Cp="firestore_targets";function Ga(s,e){return`${Cp}_${s}_${e}`}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const dt="SharedClientState";class mo{constructor(e,t,n,i){this.user=e,this.batchId=t,this.state=n,this.error=i}static Ks(e,t,n){const i=JSON.parse(n);let r,o=typeof i=="object"&&["pending","acknowledged","rejected"].indexOf(i.state)!==-1&&(i.error===void 0||typeof i.error=="object");return o&&i.error&&(o=typeof i.error.message=="string"&&typeof i.error.code=="string",o&&(r=new D(i.error.code,i.error.message))),o?new mo(e,t,i.state,r):(ye(dt,`Failed to parse mutation state for ID '${t}': ${n}`),null)}Ws(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class Ai{constructor(e,t,n){this.targetId=e,this.state=t,this.error=n}static Ks(e,t){const n=JSON.parse(t);let i,r=typeof n=="object"&&["not-current","current","rejected"].indexOf(n.state)!==-1&&(n.error===void 0||typeof n.error=="object");return r&&n.error&&(r=typeof n.error.message=="string"&&typeof n.error.code=="string",r&&(i=new D(n.error.code,n.error.message))),r?new Ai(e,n.state,i):(ye(dt,`Failed to parse target state for ID '${e}': ${t}`),null)}Ws(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class go{constructor(e,t){this.clientId=e,this.activeTargetIds=t}static Ks(e,t){const n=JSON.parse(t);let i=typeof n=="object"&&n.activeTargetIds instanceof Array,r=tu();for(let o=0;i&&o<n.activeTargetIds.length;++o)i=Yf(n.activeTargetIds[o]),r=r.add(n.activeTargetIds[o]);return i?new go(e,r):(ye(dt,`Failed to parse client data for instance '${e}': ${t}`),null)}}class pu{constructor(e,t){this.clientId=e,this.onlineState=t}static Ks(e){const t=JSON.parse(e);return typeof t=="object"&&["Unknown","Online","Offline"].indexOf(t.onlineState)!==-1&&typeof t.clientId=="string"?new pu(t.clientId,t.onlineState):(ye(dt,`Failed to parse online state: ${e}`),null)}}class Tl{constructor(){this.activeTargetIds=tu()}Gs(e){this.activeTargetIds=this.activeTargetIds.add(e)}zs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class za{constructor(e,t,n,i,r){this.window=e,this.Fi=t,this.persistenceKey=n,this.js=i,this.syncEngine=null,this.onlineStateHandler=null,this.sequenceNumberHandler=null,this.Js=this.Hs.bind(this),this.Ys=new _e(G),this.started=!1,this.Zs=[];const o=n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");this.storage=this.window.localStorage,this.currentUser=r,this.Xs=yd(this.persistenceKey,this.js),this.eo=function(u){return`firestore_sequence_number_${u}`}(this.persistenceKey),this.Ys=this.Ys.insert(this.js,new Tl),this.no=new RegExp(`^${Ap}_${o}_([^_]*)$`),this.ro=new RegExp(`^${Rp}_${o}_(\\d+)(?:_(.*))?$`),this.io=new RegExp(`^${Cp}_${o}_(\\d+)$`),this.so=function(u){return`firestore_online_state_${u}`}(this.persistenceKey),this.oo=function(u){return`firestore_bundle_loaded_v2_${u}`}(this.persistenceKey),this.window.addEventListener("storage",this.Js)}static C(e){return!(!e||!e.localStorage)}async start(){const e=await this.syncEngine.Ps();for(const n of e){if(n===this.js)continue;const i=this.getItem(yd(this.persistenceKey,n));if(i){const r=go.Ks(n,i);r&&(this.Ys=this.Ys.insert(r.clientId,r))}}this._o();const t=this.storage.getItem(this.so);if(t){const n=this.ao(t);n&&this.uo(n)}for(const n of this.Zs)this.Hs(n);this.Zs=[],this.window.addEventListener("pagehide",()=>this.shutdown()),this.started=!0}writeSequenceNumber(e){this.setItem(this.eo,JSON.stringify(e))}getAllActiveQueryTargets(){return this.co(this.Ys)}isActiveQueryTarget(e){let t=!1;return this.Ys.forEach((n,i)=>{i.activeTargetIds.has(e)&&(t=!0)}),t}addPendingMutation(e){this.lo(e,"pending")}updateMutationState(e,t,n){this.lo(e,t,n),this.ho(e)}addLocalQueryTarget(e,t=!0){let n="not-current";if(this.isActiveQueryTarget(e)){const i=this.storage.getItem(Ga(this.persistenceKey,e));if(i){const r=Ai.Ks(e,i);r&&(n=r.state)}}return t&&this.Po.Gs(e),this._o(),n}removeLocalQueryTarget(e){this.Po.zs(e),this._o()}isLocalQueryTarget(e){return this.Po.activeTargetIds.has(e)}clearQueryState(e){this.removeItem(Ga(this.persistenceKey,e))}updateQueryState(e,t,n){this.To(e,t,n)}handleUserChange(e,t,n){t.forEach(i=>{this.ho(i)}),this.currentUser=e,n.forEach(i=>{this.addPendingMutation(i)})}setOnlineState(e){this.Io(e)}notifyBundleLoaded(e){this.Eo(e)}shutdown(){this.started&&(this.window.removeEventListener("storage",this.Js),this.removeItem(this.Xs),this.started=!1)}getItem(e){const t=this.storage.getItem(e);return N(dt,"READ",e,t),t}setItem(e,t){N(dt,"SET",e,t),this.storage.setItem(e,t)}removeItem(e){N(dt,"REMOVE",e),this.storage.removeItem(e)}Hs(e){const t=e;if(t.storageArea===this.storage){if(N(dt,"EVENT",t.key,t.newValue),t.key===this.Xs)return void ye("Received WebStorage notification for local change. Another client might have garbage-collected our state");this.Fi.enqueueRetryable(async()=>{if(this.started){if(t.key!==null){if(this.no.test(t.key)){if(t.newValue==null){const n=this.Ao(t.key);return this.Ro(n,null)}{const n=this.Vo(t.key,t.newValue);if(n)return this.Ro(n.clientId,n)}}else if(this.ro.test(t.key)){if(t.newValue!==null){const n=this.mo(t.key,t.newValue);if(n)return this.fo(n)}}else if(this.io.test(t.key)){if(t.newValue!==null){const n=this.po(t.key,t.newValue);if(n)return this.yo(n)}}else if(t.key===this.so){if(t.newValue!==null){const n=this.ao(t.newValue);if(n)return this.uo(n)}}else if(t.key===this.eo){const n=function(r){let o=Ke.ue;if(r!=null)try{const l=JSON.parse(r);U(typeof l=="number",30636,{wo:r}),o=l}catch(l){ye(dt,"Failed to read sequence number from WebStorage",l)}return o}(t.newValue);n!==Ke.ue&&this.sequenceNumberHandler(n)}else if(t.key===this.oo){const n=this.So(t.newValue);await Promise.all(n.map(i=>this.syncEngine.bo(i)))}}}else this.Zs.push(t)})}}get Po(){return this.Ys.get(this.js)}_o(){this.setItem(this.Xs,this.Po.Ws())}lo(e,t,n){const i=new mo(this.currentUser,e,t,n),r=Ed(this.persistenceKey,this.currentUser,e);this.setItem(r,i.Ws())}ho(e){const t=Ed(this.persistenceKey,this.currentUser,e);this.removeItem(t)}Io(e){const t={clientId:this.js,onlineState:e};this.storage.setItem(this.so,JSON.stringify(t))}To(e,t,n){const i=Ga(this.persistenceKey,e),r=new Ai(e,t,n);this.setItem(i,r.Ws())}Eo(e){const t=JSON.stringify(Array.from(e));this.setItem(this.oo,t)}Ao(e){const t=this.no.exec(e);return t?t[1]:null}Vo(e,t){const n=this.Ao(e);return go.Ks(n,t)}mo(e,t){const n=this.ro.exec(e),i=Number(n[1]),r=n[2]!==void 0?n[2]:null;return mo.Ks(new Oe(r),i,t)}po(e,t){const n=this.io.exec(e),i=Number(n[1]);return Ai.Ks(i,t)}ao(e){return pu.Ks(e)}So(e){return JSON.parse(e)}async fo(e){if(e.user.uid===this.currentUser.uid)return this.syncEngine.Do(e.batchId,e.state,e.error);N(dt,`Ignoring mutation for non-active user ${e.user.uid}`)}yo(e){return this.syncEngine.vo(e.targetId,e.state,e.error)}Ro(e,t){const n=t?this.Ys.insert(e,t):this.Ys.remove(e),i=this.co(this.Ys),r=this.co(n),o=[],l=[];return r.forEach(u=>{i.has(u)||o.push(u)}),i.forEach(u=>{r.has(u)||l.push(u)}),this.syncEngine.Co(o,l).then(()=>{this.Ys=n})}uo(e){this.Ys.get(e.clientId)&&this.onlineStateHandler(e.onlineState)}co(e){let t=tu();return e.forEach((n,i)=>{t=t.unionWith(i.activeTargetIds)}),t}}class Sp{constructor(){this.Fo=new Tl,this.Mo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,n){}addLocalQueryTarget(e,t=!0){return t&&this.Fo.Gs(e),this.Mo[e]||"not-current"}updateQueryState(e,t,n){this.Mo[e]=t}removeLocalQueryTarget(e){this.Fo.zs(e)}isLocalQueryTarget(e){return this.Fo.activeTargetIds.has(e)}clearQueryState(e){delete this.Mo[e]}getAllActiveQueryTargets(){return this.Fo.activeTargetIds}isActiveQueryTarget(e){return this.Fo.activeTargetIds.has(e)}start(){return this.Fo=new Tl,Promise.resolve()}handleUserChange(e,t,n){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class RI{xo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Id="ConnectivityMonitor";class vd{constructor(){this.Oo=()=>this.No(),this.Bo=()=>this.Lo(),this.ko=[],this.qo()}xo(e){this.ko.push(e)}shutdown(){window.removeEventListener("online",this.Oo),window.removeEventListener("offline",this.Bo)}qo(){window.addEventListener("online",this.Oo),window.addEventListener("offline",this.Bo)}No(){N(Id,"Network connectivity changed: AVAILABLE");for(const e of this.ko)e(0)}Lo(){N(Id,"Network connectivity changed: UNAVAILABLE");for(const e of this.ko)e(1)}static C(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Or=null;function wl(){return Or===null?Or=function(){return 268435456+Math.round(2147483648*Math.random())}():Or++,"0x"+Or.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ka="RestConnection",CI={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class SI{get Qo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",n=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.$o=t+"://"+e.host,this.Uo=`projects/${n}/databases/${i}`,this.Ko=this.databaseId.database===io?`project_id=${n}`:`project_id=${n}&database_id=${i}`}Wo(e,t,n,i,r){const o=wl(),l=this.Go(e,t.toUriEncodedString());N(Ka,`Sending RPC '${e}' ${o}:`,l,n);const u={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.Ko};this.zo(u,i,r);const{host:c}=new URL(l),f=Do(c);return this.jo(e,l,u,n,f).then(_=>(N(Ka,`Received RPC '${e}' ${o}: `,_),_),_=>{throw Qt(Ka,`RPC '${e}' ${o} failed with error: `,_,"url: ",l,"request:",n),_})}Jo(e,t,n,i,r,o){return this.Wo(e,t,n,i,r)}zo(e,t,n){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+xs}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((i,r)=>e[r]=i),n&&n.headers.forEach((i,r)=>e[r]=i)}Go(e,t){const n=CI[e];return`${this.$o}/v1/${t}:${n}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class PI{constructor(e){this.Ho=e.Ho,this.Yo=e.Yo}Zo(e){this.Xo=e}e_(e){this.t_=e}n_(e){this.r_=e}onMessage(e){this.i_=e}close(){this.Yo()}send(e){this.Ho(e)}s_(){this.Xo()}o_(){this.t_()}__(e){this.r_(e)}a_(e){this.i_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ke="WebChannelConnection";class bI extends SI{constructor(e){super(e),this.u_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}jo(e,t,n,i,r){const o=wl();return new Promise((l,u)=>{const c=new Of;c.setWithCredentials(!0),c.listenOnce(Mf.COMPLETE,()=>{try{switch(c.getLastErrorCode()){case Lr.NO_ERROR:const _=c.getResponseJson();N(ke,`XHR for RPC '${e}' ${o} received:`,JSON.stringify(_)),l(_);break;case Lr.TIMEOUT:N(ke,`RPC '${e}' ${o} timed out`),u(new D(b.DEADLINE_EXCEEDED,"Request time out"));break;case Lr.HTTP_ERROR:const m=c.getStatus();if(N(ke,`RPC '${e}' ${o} failed with status:`,m,"response text:",c.getResponseText()),m>0){let I=c.getResponseJson();Array.isArray(I)&&(I=I[0]);const S=I==null?void 0:I.error;if(S&&S.status&&S.message){const V=function(K){const j=K.toLowerCase().replace(/_/g,"-");return Object.values(b).indexOf(j)>=0?j:b.UNKNOWN}(S.status);u(new D(V,S.message))}else u(new D(b.UNKNOWN,"Server responded with status "+c.getStatus()))}else u(new D(b.UNAVAILABLE,"Connection failed."));break;default:F(9055,{c_:e,streamId:o,l_:c.getLastErrorCode(),h_:c.getLastError()})}}finally{N(ke,`RPC '${e}' ${o} completed.`)}});const f=JSON.stringify(i);N(ke,`RPC '${e}' ${o} sending request:`,i),c.send(t,"POST",f,n,15)})}P_(e,t,n){const i=wl(),r=[this.$o,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=Uf(),l=Lf(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},c=this.longPollingOptions.timeoutSeconds;c!==void 0&&(u.longPollingTimeout=Math.round(1e3*c)),this.useFetchStreams&&(u.useFetchStreams=!0),this.zo(u.initMessageHeaders,t,n),u.encodeInitMessageHeaders=!0;const f=r.join("");N(ke,`Creating RPC '${e}' stream ${i}: ${f}`,u);const _=o.createWebChannel(f,u);this.T_(_);let m=!1,I=!1;const S=new PI({Ho:x=>{I?N(ke,`Not sending because RPC '${e}' stream ${i} is closed:`,x):(m||(N(ke,`Opening RPC '${e}' stream ${i} transport.`),_.open(),m=!0),N(ke,`RPC '${e}' stream ${i} sending:`,x),_.send(x))},Yo:()=>_.close()}),V=(x,K,j)=>{x.listen(K,B=>{try{j(B)}catch(J){setTimeout(()=>{throw J},0)}})};return V(_,hi.EventType.OPEN,()=>{I||(N(ke,`RPC '${e}' stream ${i} transport opened.`),S.s_())}),V(_,hi.EventType.CLOSE,()=>{I||(I=!0,N(ke,`RPC '${e}' stream ${i} transport closed`),S.__(),this.I_(_))}),V(_,hi.EventType.ERROR,x=>{I||(I=!0,Qt(ke,`RPC '${e}' stream ${i} transport errored. Name:`,x.name,"Message:",x.message),S.__(new D(b.UNAVAILABLE,"The operation could not be completed")))}),V(_,hi.EventType.MESSAGE,x=>{var K;if(!I){const j=x.data[0];U(!!j,16349);const B=j,J=(B==null?void 0:B.error)||((K=B[0])===null||K===void 0?void 0:K.error);if(J){N(ke,`RPC '${e}' stream ${i} received error:`,J);const le=J.status;let Z=function(E){const T=ve[E];if(T!==void 0)return q_(T)}(le),v=J.message;Z===void 0&&(Z=b.INTERNAL,v="Unknown error status: "+le+" with message "+J.message),I=!0,S.__(new D(Z,v)),_.close()}else N(ke,`RPC '${e}' stream ${i} received:`,j),S.a_(j)}}),V(l,Ff.STAT_EVENT,x=>{x.stat===el.PROXY?N(ke,`RPC '${e}' stream ${i} detected buffering proxy`):x.stat===el.NOPROXY&&N(ke,`RPC '${e}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{S.o_()},0),S}terminate(){this.u_.forEach(e=>e.close()),this.u_=[]}T_(e){this.u_.push(e)}I_(e){this.u_=this.u_.filter(t=>t===e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pp(){return typeof window<"u"?window:null}function Qr(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xo(s){return new OE(s,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bp{constructor(e,t,n=1e3,i=1.5,r=6e4){this.Fi=e,this.timerId=t,this.d_=n,this.E_=i,this.A_=r,this.R_=0,this.V_=null,this.m_=Date.now(),this.reset()}reset(){this.R_=0}f_(){this.R_=this.A_}g_(e){this.cancel();const t=Math.floor(this.R_+this.p_()),n=Math.max(0,Date.now()-this.m_),i=Math.max(0,t-n);i>0&&N("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.R_} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`),this.V_=this.Fi.enqueueAfterDelay(this.timerId,i,()=>(this.m_=Date.now(),e())),this.R_*=this.E_,this.R_<this.d_&&(this.R_=this.d_),this.R_>this.A_&&(this.R_=this.A_)}y_(){this.V_!==null&&(this.V_.skipDelay(),this.V_=null)}cancel(){this.V_!==null&&(this.V_.cancel(),this.V_=null)}p_(){return(Math.random()-.5)*this.R_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Td="PersistentStream";class Vp{constructor(e,t,n,i,r,o,l,u){this.Fi=e,this.w_=n,this.S_=i,this.connection=r,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=l,this.listener=u,this.state=0,this.b_=0,this.D_=null,this.v_=null,this.stream=null,this.C_=0,this.F_=new bp(e,t)}M_(){return this.state===1||this.state===5||this.x_()}x_(){return this.state===2||this.state===3}start(){this.C_=0,this.state!==4?this.auth():this.O_()}async stop(){this.M_()&&await this.close(0)}N_(){this.state=0,this.F_.reset()}B_(){this.x_()&&this.D_===null&&(this.D_=this.Fi.enqueueAfterDelay(this.w_,6e4,()=>this.L_()))}k_(e){this.q_(),this.stream.send(e)}async L_(){if(this.x_())return this.close(0)}q_(){this.D_&&(this.D_.cancel(),this.D_=null)}Q_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.q_(),this.Q_(),this.F_.cancel(),this.b_++,e!==4?this.F_.reset():t&&t.code===b.RESOURCE_EXHAUSTED?(ye(t.toString()),ye("Using maximum backoff delay to prevent overloading the backend."),this.F_.f_()):t&&t.code===b.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.U_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.n_(t)}U_(){}auth(){this.state=1;const e=this.K_(this.b_),t=this.b_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([n,i])=>{this.b_===t&&this.W_(n,i)},n=>{e(()=>{const i=new D(b.UNKNOWN,"Fetching auth token failed: "+n.message);return this.G_(i)})})}W_(e,t){const n=this.K_(this.b_);this.stream=this.z_(e,t),this.stream.Zo(()=>{n(()=>this.listener.Zo())}),this.stream.e_(()=>{n(()=>(this.state=2,this.v_=this.Fi.enqueueAfterDelay(this.S_,1e4,()=>(this.x_()&&(this.state=3),Promise.resolve())),this.listener.e_()))}),this.stream.n_(i=>{n(()=>this.G_(i))}),this.stream.onMessage(i=>{n(()=>++this.C_==1?this.j_(i):this.onNext(i))})}O_(){this.state=5,this.F_.g_(async()=>{this.state=0,this.start()})}G_(e){return N(Td,`close with error: ${e}`),this.stream=null,this.close(4,e)}K_(e){return t=>{this.Fi.enqueueAndForget(()=>this.b_===e?t():(N(Td,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class VI extends Vp{constructor(e,t,n,i,r,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,n,i,o),this.serializer=r}z_(e,t){return this.connection.P_("Listen",e,t)}j_(e){return this.onNext(e)}onNext(e){this.F_.reset();const t=LE(this.serializer,e),n=function(r){if(!("targetChange"in r))return q.min();const o=r.targetChange;return o.targetIds&&o.targetIds.length?q.min():o.readTime?ze(o.readTime):q.min()}(e);return this.listener.J_(t,n)}H_(e){const t={};t.database=ml(this.serializer),t.addTarget=function(r,o){let l;const u=o.target;if(l=ro(u)?{documents:H_(r,u)}:{query:Y_(r,u).Vt},l.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){l.resumeToken=z_(r,o.resumeToken);const c=_l(r,o.expectedCount);c!==null&&(l.expectedCount=c)}else if(o.snapshotVersion.compareTo(q.min())>0){l.readTime=ws(r,o.snapshotVersion.toTimestamp());const c=_l(r,o.expectedCount);c!==null&&(l.expectedCount=c)}return l}(this.serializer,e);const n=BE(this.serializer,e);n&&(t.labels=n),this.k_(t)}Y_(e){const t={};t.database=ml(this.serializer),t.removeTarget=e,this.k_(t)}}class xI extends Vp{constructor(e,t,n,i,r,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,n,i,o),this.serializer=r}get Z_(){return this.C_>0}start(){this.lastStreamToken=void 0,super.start()}U_(){this.Z_&&this.X_([])}z_(e,t){return this.connection.P_("Write",e,t)}j_(e){return U(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,U(!e.writeResults||e.writeResults.length===0,55816),this.listener.ea()}onNext(e){U(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.F_.reset();const t=UE(e.writeResults,e.commitTime),n=ze(e.commitTime);return this.listener.ta(n,t)}na(){const e={};e.database=ml(this.serializer),this.k_(e)}X_(e){const t={streamToken:this.lastStreamToken,writes:e.map(n=>uo(this.serializer,n))};this.k_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class NI{}class DI extends NI{constructor(e,t,n,i){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=n,this.serializer=i,this.ra=!1}ia(){if(this.ra)throw new D(b.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,t,n,i){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([r,o])=>this.connection.Wo(e,pl(t,n),i,r,o)).catch(r=>{throw r.name==="FirebaseError"?(r.code===b.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),r):new D(b.UNKNOWN,r.toString())})}Jo(e,t,n,i,r){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,l])=>this.connection.Jo(e,pl(t,n),i,o,l,r)).catch(o=>{throw o.name==="FirebaseError"?(o.code===b.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new D(b.UNKNOWN,o.toString())})}terminate(){this.ra=!0,this.connection.terminate()}}class kI{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.sa=0,this.oa=null,this._a=!0}aa(){this.sa===0&&(this.ua("Unknown"),this.oa=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.oa=null,this.ca("Backend didn't respond within 10 seconds."),this.ua("Offline"),Promise.resolve())))}la(e){this.state==="Online"?this.ua("Unknown"):(this.sa++,this.sa>=1&&(this.ha(),this.ca(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ua("Offline")))}set(e){this.ha(),this.sa=0,e==="Online"&&(this._a=!1),this.ua(e)}ua(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}ca(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this._a?(ye(t),this._a=!1):N("OnlineStateTracker",t)}ha(){this.oa!==null&&(this.oa.cancel(),this.oa=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dn="RemoteStore";class OI{constructor(e,t,n,i,r){this.localStore=e,this.datastore=t,this.asyncQueue=n,this.remoteSyncer={},this.Pa=[],this.Ta=new Map,this.Ia=new Set,this.da=[],this.Ea=r,this.Ea.xo(o=>{n.enqueueAndForget(async()=>{Ln(this)&&(N(Dn,"Restarting streams for network reachability change."),await async function(u){const c=L(u);c.Ia.add(4),await nr(c),c.Aa.set("Unknown"),c.Ia.delete(4),await Jo(c)}(this))})}),this.Aa=new kI(n,i)}}async function Jo(s){if(Ln(s))for(const e of s.da)await e(!0)}async function nr(s){for(const e of s.da)await e(!1)}function Zo(s,e){const t=L(s);t.Ta.has(e.targetId)||(t.Ta.set(e.targetId,e),yu(t)?gu(t):Os(t).x_()&&mu(t,e))}function Rs(s,e){const t=L(s),n=Os(t);t.Ta.delete(e),n.x_()&&xp(t,e),t.Ta.size===0&&(n.x_()?n.B_():Ln(t)&&t.Aa.set("Unknown"))}function mu(s,e){if(s.Ra.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(q.min())>0){const t=s.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}Os(s).H_(e)}function xp(s,e){s.Ra.$e(e),Os(s).Y_(e)}function gu(s){s.Ra=new xE({getRemoteKeysForTarget:e=>s.remoteSyncer.getRemoteKeysForTarget(e),Et:e=>s.Ta.get(e)||null,lt:()=>s.datastore.serializer.databaseId}),Os(s).start(),s.Aa.aa()}function yu(s){return Ln(s)&&!Os(s).M_()&&s.Ta.size>0}function Ln(s){return L(s).Ia.size===0}function Np(s){s.Ra=void 0}async function MI(s){s.Aa.set("Online")}async function FI(s){s.Ta.forEach((e,t)=>{mu(s,e)})}async function LI(s,e){Np(s),yu(s)?(s.Aa.la(e),gu(s)):s.Aa.set("Unknown")}async function UI(s,e,t){if(s.Aa.set("Online"),e instanceof G_&&e.state===2&&e.cause)try{await async function(i,r){const o=r.cause;for(const l of r.targetIds)i.Ta.has(l)&&(await i.remoteSyncer.rejectListen(l,o),i.Ta.delete(l),i.Ra.removeTarget(l))}(s,e)}catch(n){N(Dn,"Failed to remove targets %s: %s ",e.targetIds.join(","),n),await yo(s,n)}else if(e instanceof Wr?s.Ra.Ye(e):e instanceof j_?s.Ra.it(e):s.Ra.et(e),!t.isEqual(q.min()))try{const n=await Ip(s.localStore);t.compareTo(n)>=0&&await function(r,o){const l=r.Ra.Pt(o);return l.targetChanges.forEach((u,c)=>{if(u.resumeToken.approximateByteSize()>0){const f=r.Ta.get(c);f&&r.Ta.set(c,f.withResumeToken(u.resumeToken,o))}}),l.targetMismatches.forEach((u,c)=>{const f=r.Ta.get(u);if(!f)return;r.Ta.set(u,f.withResumeToken(Ie.EMPTY_BYTE_STRING,f.snapshotVersion)),xp(r,u);const _=new wt(f.target,u,c,f.sequenceNumber);mu(r,_)}),r.remoteSyncer.applyRemoteEvent(l)}(s,t)}catch(n){N(Dn,"Failed to raise snapshot:",n),await yo(s,n)}}async function yo(s,e,t){if(!sn(e))throw e;s.Ia.add(1),await nr(s),s.Aa.set("Offline"),t||(t=()=>Ip(s.localStore)),s.asyncQueue.enqueueRetryable(async()=>{N(Dn,"Retrying IndexedDB access"),await t(),s.Ia.delete(1),await Jo(s)})}function Dp(s,e){return e().catch(t=>yo(s,t,e))}async function ks(s){const e=L(s),t=Xt(e);let n=e.Pa.length>0?e.Pa[e.Pa.length-1].batchId:Tn;for(;BI(e);)try{const i=await AI(e.localStore,n);if(i===null){e.Pa.length===0&&t.B_();break}n=i.batchId,qI(e,i)}catch(i){await yo(e,i)}kp(e)&&Op(e)}function BI(s){return Ln(s)&&s.Pa.length<10}function qI(s,e){s.Pa.push(e);const t=Xt(s);t.x_()&&t.Z_&&t.X_(e.mutations)}function kp(s){return Ln(s)&&!Xt(s).M_()&&s.Pa.length>0}function Op(s){Xt(s).start()}async function jI(s){Xt(s).na()}async function GI(s){const e=Xt(s);for(const t of s.Pa)e.X_(t.mutations)}async function zI(s,e,t){const n=s.Pa.shift(),i=iu.from(n,e,t);await Dp(s,()=>s.remoteSyncer.applySuccessfulWrite(i)),await ks(s)}async function KI(s,e){e&&Xt(s).Z_&&await async function(n,i){if(function(o){return bE(o)&&o!==b.ABORTED}(i.code)){const r=n.Pa.shift();Xt(n).N_(),await Dp(n,()=>n.remoteSyncer.rejectFailedWrite(r.batchId,i)),await ks(n)}}(s,e),kp(s)&&Op(s)}async function wd(s,e){const t=L(s);t.asyncQueue.verifyOperationInProgress(),N(Dn,"RemoteStore received new credentials");const n=Ln(t);t.Ia.add(3),await nr(t),n&&t.Aa.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ia.delete(3),await Jo(t)}async function Al(s,e){const t=L(s);e?(t.Ia.delete(2),await Jo(t)):e||(t.Ia.add(2),await nr(t),t.Aa.set("Unknown"))}function Os(s){return s.Va||(s.Va=function(t,n,i){const r=L(t);return r.ia(),new VI(n,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,i)}(s.datastore,s.asyncQueue,{Zo:MI.bind(null,s),e_:FI.bind(null,s),n_:LI.bind(null,s),J_:UI.bind(null,s)}),s.da.push(async e=>{e?(s.Va.N_(),yu(s)?gu(s):s.Aa.set("Unknown")):(await s.Va.stop(),Np(s))})),s.Va}function Xt(s){return s.ma||(s.ma=function(t,n,i){const r=L(t);return r.ia(),new xI(n,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,i)}(s.datastore,s.asyncQueue,{Zo:()=>Promise.resolve(),e_:jI.bind(null,s),n_:KI.bind(null,s),ea:GI.bind(null,s),ta:zI.bind(null,s)}),s.da.push(async e=>{e?(s.ma.N_(),await ks(s)):(await s.ma.stop(),s.Pa.length>0&&(N(Dn,`Stopping write stream with ${s.Pa.length} pending writes`),s.Pa=[]))})),s.ma}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Eu{constructor(e,t,n,i,r){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=n,this.op=i,this.removalCallback=r,this.deferred=new Rt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,n,i,r){const o=Date.now()+n,l=new Eu(e,t,o,i,r);return l.start(n),l}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new D(b.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Iu(s,e){if(ye("AsyncQueue",`${e}: ${s}`),sn(s))return new D(b.UNAVAILABLE,`${e}: ${s}`);throw s}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rs{static emptySet(e){return new rs(e.comparator)}constructor(e){this.comparator=e?(t,n)=>e(t,n)||M.comparator(t.key,n.key):(t,n)=>M.comparator(t.key,n.key),this.keyedMap=di(),this.sortedSet=new _e(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,n)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof rs)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),n=e.sortedSet.getIterator();for(;t.hasNext();){const i=t.getNext().key,r=n.getNext().key;if(!i.isEqual(r))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const n=new rs;return n.comparator=this.comparator,n.keyedMap=e,n.sortedSet=t,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ad{constructor(){this.fa=new _e(M.comparator)}track(e){const t=e.doc.key,n=this.fa.get(t);n?e.type!==0&&n.type===3?this.fa=this.fa.insert(t,e):e.type===3&&n.type!==1?this.fa=this.fa.insert(t,{type:n.type,doc:e.doc}):e.type===2&&n.type===2?this.fa=this.fa.insert(t,{type:2,doc:e.doc}):e.type===2&&n.type===0?this.fa=this.fa.insert(t,{type:0,doc:e.doc}):e.type===1&&n.type===0?this.fa=this.fa.remove(t):e.type===1&&n.type===2?this.fa=this.fa.insert(t,{type:1,doc:n.doc}):e.type===0&&n.type===1?this.fa=this.fa.insert(t,{type:2,doc:e.doc}):F(63341,{At:e,ga:n}):this.fa=this.fa.insert(t,e)}pa(){const e=[];return this.fa.inorderTraversal((t,n)=>{e.push(n)}),e}}class Cs{constructor(e,t,n,i,r,o,l,u,c){this.query=e,this.docs=t,this.oldDocs=n,this.docChanges=i,this.mutatedKeys=r,this.fromCache=o,this.syncStateChanged=l,this.excludesMetadataChanges=u,this.hasCachedResults=c}static fromInitialDocuments(e,t,n,i,r){const o=[];return t.forEach(l=>{o.push({type:0,doc:l})}),new Cs(e,t,rs.emptySet(t),o,n,i,!0,!1,r)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&zo(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,n=e.docChanges;if(t.length!==n.length)return!1;for(let i=0;i<t.length;i++)if(t[i].type!==n[i].type||!t[i].doc.isEqual(n[i].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class WI{constructor(){this.ya=void 0,this.wa=[]}Sa(){return this.wa.some(e=>e.ba())}}class $I{constructor(){this.queries=Rd(),this.onlineState="Unknown",this.Da=new Set}terminate(){(function(t,n){const i=L(t),r=i.queries;i.queries=Rd(),r.forEach((o,l)=>{for(const u of l.wa)u.onError(n)})})(this,new D(b.ABORTED,"Firestore shutting down"))}}function Rd(){return new xt(s=>C_(s),zo)}async function Mp(s,e){const t=L(s);let n=3;const i=e.query;let r=t.queries.get(i);r?!r.Sa()&&e.ba()&&(n=2):(r=new WI,n=e.ba()?0:1);try{switch(n){case 0:r.ya=await t.onListen(i,!0);break;case 1:r.ya=await t.onListen(i,!1);break;case 2:await t.onFirstRemoteStoreListen(i)}}catch(o){const l=Iu(o,`Initialization of query '${Zn(e.query)}' failed`);return void e.onError(l)}t.queries.set(i,r),r.wa.push(e),e.va(t.onlineState),r.ya&&e.Ca(r.ya)&&vu(t)}async function Fp(s,e){const t=L(s),n=e.query;let i=3;const r=t.queries.get(n);if(r){const o=r.wa.indexOf(e);o>=0&&(r.wa.splice(o,1),r.wa.length===0?i=e.ba()?0:1:!r.Sa()&&e.ba()&&(i=2))}switch(i){case 0:return t.queries.delete(n),t.onUnlisten(n,!0);case 1:return t.queries.delete(n),t.onUnlisten(n,!1);case 2:return t.onLastRemoteStoreUnlisten(n);default:return}}function QI(s,e){const t=L(s);let n=!1;for(const i of e){const r=i.query,o=t.queries.get(r);if(o){for(const l of o.wa)l.Ca(i)&&(n=!0);o.ya=i}}n&&vu(t)}function HI(s,e,t){const n=L(s),i=n.queries.get(e);if(i)for(const r of i.wa)r.onError(t);n.queries.delete(e)}function vu(s){s.Da.forEach(e=>{e.next()})}var Rl,Cd;(Cd=Rl||(Rl={})).Fa="default",Cd.Cache="cache";class Lp{constructor(e,t,n){this.query=e,this.Ma=t,this.xa=!1,this.Oa=null,this.onlineState="Unknown",this.options=n||{}}Ca(e){if(!this.options.includeMetadataChanges){const n=[];for(const i of e.docChanges)i.type!==3&&n.push(i);e=new Cs(e.query,e.docs,e.oldDocs,n,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.xa?this.Na(e)&&(this.Ma.next(e),t=!0):this.Ba(e,this.onlineState)&&(this.La(e),t=!0),this.Oa=e,t}onError(e){this.Ma.error(e)}va(e){this.onlineState=e;let t=!1;return this.Oa&&!this.xa&&this.Ba(this.Oa,e)&&(this.La(this.Oa),t=!0),t}Ba(e,t){if(!e.fromCache||!this.ba())return!0;const n=t!=="Offline";return(!this.options.ka||!n)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Na(e){if(e.docChanges.length>0)return!0;const t=this.Oa&&this.Oa.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}La(e){e=Cs.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.xa=!0,this.Ma.next(e)}ba(){return this.options.source!==Rl.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Up{constructor(e){this.key=e}}class Bp{constructor(e){this.key=e}}class YI{constructor(e,t){this.query=e,this.Ha=t,this.Ya=null,this.hasCachedResults=!1,this.current=!1,this.Za=W(),this.mutatedKeys=W(),this.Xa=P_(e),this.eu=new rs(this.Xa)}get tu(){return this.Ha}nu(e,t){const n=t?t.ru:new Ad,i=t?t.eu:this.eu;let r=t?t.mutatedKeys:this.mutatedKeys,o=i,l=!1;const u=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,c=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal((f,_)=>{const m=i.get(f),I=Zi(this.query,_)?_:null,S=!!m&&this.mutatedKeys.has(m.key),V=!!I&&(I.hasLocalMutations||this.mutatedKeys.has(I.key)&&I.hasCommittedMutations);let x=!1;m&&I?m.data.isEqual(I.data)?S!==V&&(n.track({type:3,doc:I}),x=!0):this.iu(m,I)||(n.track({type:2,doc:I}),x=!0,(u&&this.Xa(I,u)>0||c&&this.Xa(I,c)<0)&&(l=!0)):!m&&I?(n.track({type:0,doc:I}),x=!0):m&&!I&&(n.track({type:1,doc:m}),x=!0,(u||c)&&(l=!0)),x&&(I?(o=o.add(I),r=V?r.add(f):r.delete(f)):(o=o.delete(f),r=r.delete(f)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const f=this.query.limitType==="F"?o.last():o.first();o=o.delete(f.key),r=r.delete(f.key),n.track({type:1,doc:f})}return{eu:o,ru:n,Ds:l,mutatedKeys:r}}iu(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,n,i){const r=this.eu;this.eu=e.eu,this.mutatedKeys=e.mutatedKeys;const o=e.ru.pa();o.sort((f,_)=>function(I,S){const V=x=>{switch(x){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return F(20277,{At:x})}};return V(I)-V(S)}(f.type,_.type)||this.Xa(f.doc,_.doc)),this.su(n),i=i!=null&&i;const l=t&&!i?this.ou():[],u=this.Za.size===0&&this.current&&!i?1:0,c=u!==this.Ya;return this.Ya=u,o.length!==0||c?{snapshot:new Cs(this.query,e.eu,r,o,e.mutatedKeys,u===0,c,!1,!!n&&n.resumeToken.approximateByteSize()>0),_u:l}:{_u:l}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({eu:this.eu,ru:new Ad,mutatedKeys:this.mutatedKeys,Ds:!1},!1)):{_u:[]}}au(e){return!this.Ha.has(e)&&!!this.eu.has(e)&&!this.eu.get(e).hasLocalMutations}su(e){e&&(e.addedDocuments.forEach(t=>this.Ha=this.Ha.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Ha=this.Ha.delete(t)),this.current=e.current)}ou(){if(!this.current)return[];const e=this.Za;this.Za=W(),this.eu.forEach(n=>{this.au(n.key)&&(this.Za=this.Za.add(n.key))});const t=[];return e.forEach(n=>{this.Za.has(n)||t.push(new Bp(n))}),this.Za.forEach(n=>{e.has(n)||t.push(new Up(n))}),t}uu(e){this.Ha=e.qs,this.Za=W();const t=this.nu(e.documents);return this.applyChanges(t,!0)}cu(){return Cs.fromInitialDocuments(this.query,this.eu,this.mutatedKeys,this.Ya===0,this.hasCachedResults)}}const Ms="SyncEngine";class XI{constructor(e,t,n){this.query=e,this.targetId=t,this.view=n}}class JI{constructor(e){this.key=e,this.lu=!1}}class ZI{constructor(e,t,n,i,r,o){this.localStore=e,this.remoteStore=t,this.eventManager=n,this.sharedClientState=i,this.currentUser=r,this.maxConcurrentLimboResolutions=o,this.hu={},this.Pu=new xt(l=>C_(l),zo),this.Tu=new Map,this.Iu=new Set,this.du=new _e(M.comparator),this.Eu=new Map,this.Au=new cu,this.Ru={},this.Vu=new Map,this.mu=Nn.ur(),this.onlineState="Unknown",this.fu=void 0}get isPrimaryClient(){return this.fu===!0}}async function ev(s,e,t=!0){const n=ea(s);let i;const r=n.Pu.get(e);return r?(n.sharedClientState.addLocalQueryTarget(r.targetId),i=r.view.cu()):i=await qp(n,e,t,!0),i}async function tv(s,e){const t=ea(s);await qp(t,e,!0,!1)}async function qp(s,e,t,n){const i=await po(s.localStore,et(e)),r=i.targetId,o=s.sharedClientState.addLocalQueryTarget(r,t);let l;return n&&(l=await Tu(s,e,r,o==="current",i.resumeToken)),s.isPrimaryClient&&t&&Zo(s.remoteStore,i),l}async function Tu(s,e,t,n,i){s.gu=(_,m,I)=>async function(V,x,K,j){let B=x.view.nu(K);B.Ds&&(B=await vl(V.localStore,x.query,!1).then(({documents:v})=>x.view.nu(v,B)));const J=j&&j.targetChanges.get(x.targetId),le=j&&j.targetMismatches.get(x.targetId)!=null,Z=x.view.applyChanges(B,V.isPrimaryClient,J,le);return Cl(V,x.targetId,Z._u),Z.snapshot}(s,_,m,I);const r=await vl(s.localStore,e,!0),o=new YI(e,r.qs),l=o.nu(r.documents),u=tr.createSynthesizedTargetChangeForCurrentChange(t,n&&s.onlineState!=="Offline",i),c=o.applyChanges(l,s.isPrimaryClient,u);Cl(s,t,c._u);const f=new XI(e,t,o);return s.Pu.set(e,f),s.Tu.has(t)?s.Tu.get(t).push(e):s.Tu.set(t,[e]),c.snapshot}async function nv(s,e,t){const n=L(s),i=n.Pu.get(e),r=n.Tu.get(i.targetId);if(r.length>1)return n.Tu.set(i.targetId,r.filter(o=>!zo(o,e))),void n.Pu.delete(e);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(i.targetId),n.sharedClientState.isActiveQueryTarget(i.targetId)||await As(n.localStore,i.targetId,!1).then(()=>{n.sharedClientState.clearQueryState(i.targetId),t&&Rs(n.remoteStore,i.targetId),Ss(n,i.targetId)}).catch(nn)):(Ss(n,i.targetId),await As(n.localStore,i.targetId,!0))}async function sv(s,e){const t=L(s),n=t.Pu.get(e),i=t.Tu.get(n.targetId);t.isPrimaryClient&&i.length===1&&(t.sharedClientState.removeLocalQueryTarget(n.targetId),Rs(t.remoteStore,n.targetId))}async function iv(s,e,t){const n=Cu(s);try{const i=await function(o,l){const u=L(o),c=se.now(),f=l.reduce((I,S)=>I.add(S.key),W());let _,m;return u.persistence.runTransaction("Locally write mutations","readwrite",I=>{let S=Ze(),V=W();return u.Os.getEntries(I,f).next(x=>{S=x,S.forEach((K,j)=>{j.isValidDocument()||(V=V.add(K))})}).next(()=>u.localDocuments.getOverlayedDocuments(I,S)).next(x=>{_=x;const K=[];for(const j of l){const B=SE(j,_.get(j.key).overlayedDocument);B!=null&&K.push(new Nt(j.key,B,m_(B.value.mapValue),Be.exists(!0)))}return u.mutationQueue.addMutationBatch(I,c,K,l)}).next(x=>{m=x;const K=x.applyToLocalDocumentSet(_,V);return u.documentOverlayCache.saveOverlays(I,x.batchId,K)})}).then(()=>({batchId:m.batchId,changes:V_(_)}))}(n.localStore,e);n.sharedClientState.addPendingMutation(i.batchId),function(o,l,u){let c=o.Ru[o.currentUser.toKey()];c||(c=new _e(G)),c=c.insert(l,u),o.Ru[o.currentUser.toKey()]=c}(n,i.batchId,t),await on(n,i.changes),await ks(n.remoteStore)}catch(i){const r=Iu(i,"Failed to persist write");t.reject(r)}}async function jp(s,e){const t=L(s);try{const n=await TI(t.localStore,e);e.targetChanges.forEach((i,r)=>{const o=t.Eu.get(r);o&&(U(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1,22616),i.addedDocuments.size>0?o.lu=!0:i.modifiedDocuments.size>0?U(o.lu,14607):i.removedDocuments.size>0&&(U(o.lu,42227),o.lu=!1))}),await on(t,n,e)}catch(n){await nn(n)}}function Sd(s,e,t){const n=L(s);if(n.isPrimaryClient&&t===0||!n.isPrimaryClient&&t===1){const i=[];n.Pu.forEach((r,o)=>{const l=o.view.va(e);l.snapshot&&i.push(l.snapshot)}),function(o,l){const u=L(o);u.onlineState=l;let c=!1;u.queries.forEach((f,_)=>{for(const m of _.wa)m.va(l)&&(c=!0)}),c&&vu(u)}(n.eventManager,e),i.length&&n.hu.J_(i),n.onlineState=e,n.isPrimaryClient&&n.sharedClientState.setOnlineState(e)}}async function rv(s,e,t){const n=L(s);n.sharedClientState.updateQueryState(e,"rejected",t);const i=n.Eu.get(e),r=i&&i.key;if(r){let o=new _e(M.comparator);o=o.insert(r,me.newNoDocument(r,q.min()));const l=W().add(r),u=new er(q.min(),new Map,new _e(G),o,l);await jp(n,u),n.du=n.du.remove(r),n.Eu.delete(e),Ru(n)}else await As(n.localStore,e,!1).then(()=>Ss(n,e,t)).catch(nn)}async function ov(s,e){const t=L(s),n=e.batch.batchId;try{const i=await vI(t.localStore,e);Au(t,n,null),wu(t,n),t.sharedClientState.updateMutationState(n,"acknowledged"),await on(t,i)}catch(i){await nn(i)}}async function av(s,e,t){const n=L(s);try{const i=await function(o,l){const u=L(o);return u.persistence.runTransaction("Reject batch","readwrite-primary",c=>{let f;return u.mutationQueue.lookupMutationBatch(c,l).next(_=>(U(_!==null,37113),f=_.keys(),u.mutationQueue.removeMutationBatch(c,_))).next(()=>u.mutationQueue.performConsistencyCheck(c)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(c,f,l)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(c,f)).next(()=>u.localDocuments.getDocuments(c,f))})}(n.localStore,e);Au(n,e,t),wu(n,e),n.sharedClientState.updateMutationState(e,"rejected",t),await on(n,i)}catch(i){await nn(i)}}function wu(s,e){(s.Vu.get(e)||[]).forEach(t=>{t.resolve()}),s.Vu.delete(e)}function Au(s,e,t){const n=L(s);let i=n.Ru[n.currentUser.toKey()];if(i){const r=i.get(e);r&&(t?r.reject(t):r.resolve(),i=i.remove(e)),n.Ru[n.currentUser.toKey()]=i}}function Ss(s,e,t=null){s.sharedClientState.removeLocalQueryTarget(e);for(const n of s.Tu.get(e))s.Pu.delete(n),t&&s.hu.pu(n,t);s.Tu.delete(e),s.isPrimaryClient&&s.Au.zr(e).forEach(n=>{s.Au.containsKey(n)||Gp(s,n)})}function Gp(s,e){s.Iu.delete(e.path.canonicalString());const t=s.du.get(e);t!==null&&(Rs(s.remoteStore,t),s.du=s.du.remove(e),s.Eu.delete(t),Ru(s))}function Cl(s,e,t){for(const n of t)n instanceof Up?(s.Au.addReference(n.key,e),lv(s,n)):n instanceof Bp?(N(Ms,"Document no longer in limbo: "+n.key),s.Au.removeReference(n.key,e),s.Au.containsKey(n.key)||Gp(s,n.key)):F(19791,{yu:n})}function lv(s,e){const t=e.key,n=t.path.canonicalString();s.du.get(t)||s.Iu.has(n)||(N(Ms,"New document in limbo: "+t),s.Iu.add(n),Ru(s))}function Ru(s){for(;s.Iu.size>0&&s.du.size<s.maxConcurrentLimboResolutions;){const e=s.Iu.values().next().value;s.Iu.delete(e);const t=new M(te.fromString(e)),n=s.mu.next();s.Eu.set(n,new JI(t)),s.du=s.du.insert(t,n),Zo(s.remoteStore,new wt(et(Go(t.path)),n,"TargetPurposeLimboResolution",Ke.ue))}}async function on(s,e,t){const n=L(s),i=[],r=[],o=[];n.Pu.isEmpty()||(n.Pu.forEach((l,u)=>{o.push(n.gu(u,e,t).then(c=>{var f;if((c||t)&&n.isPrimaryClient){const _=c?!c.fromCache:(f=t==null?void 0:t.targetChanges.get(u.targetId))===null||f===void 0?void 0:f.current;n.sharedClientState.updateQueryState(u.targetId,_?"current":"not-current")}if(c){i.push(c);const _=fu.Es(u.targetId,c);r.push(_)}}))}),await Promise.all(o),n.hu.J_(i),await async function(u,c){const f=L(u);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",_=>A.forEach(c,m=>A.forEach(m.Is,I=>f.persistence.referenceDelegate.addReference(_,m.targetId,I)).next(()=>A.forEach(m.ds,I=>f.persistence.referenceDelegate.removeReference(_,m.targetId,I)))))}catch(_){if(!sn(_))throw _;N(_u,"Failed to update sequence numbers: "+_)}for(const _ of c){const m=_.targetId;if(!_.fromCache){const I=f.Fs.get(m),S=I.snapshotVersion,V=I.withLastLimboFreeSnapshotVersion(S);f.Fs=f.Fs.insert(m,V)}}}(n.localStore,r))}async function uv(s,e){const t=L(s);if(!t.currentUser.isEqual(e)){N(Ms,"User change. New user:",e.toKey());const n=await Ep(t.localStore,e);t.currentUser=e,function(r,o){r.Vu.forEach(l=>{l.forEach(u=>{u.reject(new D(b.CANCELLED,o))})}),r.Vu.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,n.removedBatchIds,n.addedBatchIds),await on(t,n.Bs)}}function cv(s,e){const t=L(s),n=t.Eu.get(e);if(n&&n.lu)return W().add(n.key);{let i=W();const r=t.Tu.get(e);if(!r)return i;for(const o of r){const l=t.Pu.get(o);i=i.unionWith(l.view.tu)}return i}}async function hv(s,e){const t=L(s),n=await vl(t.localStore,e.query,!0),i=e.view.uu(n);return t.isPrimaryClient&&Cl(t,e.targetId,i._u),i}async function dv(s,e){const t=L(s);return Tp(t.localStore,e).then(n=>on(t,n))}async function fv(s,e,t,n){const i=L(s),r=await function(l,u){const c=L(l),f=L(c.mutationQueue);return c.persistence.runTransaction("Lookup mutation documents","readonly",_=>f.Xn(_,u).next(m=>m?c.localDocuments.getDocuments(_,m):A.resolve(null)))}(i.localStore,e);r!==null?(t==="pending"?await ks(i.remoteStore):t==="acknowledged"||t==="rejected"?(Au(i,e,n||null),wu(i,e),function(l,u){L(L(l).mutationQueue).rr(u)}(i.localStore,e)):F(6720,"Unknown batchState",{wu:t}),await on(i,r)):N(Ms,"Cannot apply mutation batch with id: "+e)}async function _v(s,e){const t=L(s);if(ea(t),Cu(t),e===!0&&t.fu!==!0){const n=t.sharedClientState.getAllActiveQueryTargets(),i=await Pd(t,n.toArray());t.fu=!0,await Al(t.remoteStore,!0);for(const r of i)Zo(t.remoteStore,r)}else if(e===!1&&t.fu!==!1){const n=[];let i=Promise.resolve();t.Tu.forEach((r,o)=>{t.sharedClientState.isLocalQueryTarget(o)?n.push(o):i=i.then(()=>(Ss(t,o),As(t.localStore,o,!0))),Rs(t.remoteStore,o)}),await i,await Pd(t,n),function(o){const l=L(o);l.Eu.forEach((u,c)=>{Rs(l.remoteStore,c)}),l.Au.jr(),l.Eu=new Map,l.du=new _e(M.comparator)}(t),t.fu=!1,await Al(t.remoteStore,!1)}}async function Pd(s,e,t){const n=L(s),i=[],r=[];for(const o of e){let l;const u=n.Tu.get(o);if(u&&u.length!==0){l=await po(n.localStore,et(u[0]));for(const c of u){const f=n.Pu.get(c),_=await hv(n,f);_.snapshot&&r.push(_.snapshot)}}else{const c=await vp(n.localStore,o);l=await po(n.localStore,c),await Tu(n,zp(c),o,!1,l.resumeToken)}i.push(l)}return n.hu.J_(r),i}function zp(s){return A_(s.path,s.collectionGroup,s.orderBy,s.filters,s.limit,"F",s.startAt,s.endAt)}function pv(s){return function(t){return L(L(t).persistence).Ps()}(L(s).localStore)}async function mv(s,e,t,n){const i=L(s);if(i.fu)return void N(Ms,"Ignoring unexpected query state notification.");const r=i.Tu.get(e);if(r&&r.length>0)switch(t){case"current":case"not-current":{const o=await Tp(i.localStore,S_(r[0])),l=er.createSynthesizedRemoteEventForCurrentChange(e,t==="current",Ie.EMPTY_BYTE_STRING);await on(i,o,l);break}case"rejected":await As(i.localStore,e,!0),Ss(i,e,n);break;default:F(64155,t)}}async function gv(s,e,t){const n=ea(s);if(n.fu){for(const i of e){if(n.Tu.has(i)&&n.sharedClientState.isActiveQueryTarget(i)){N(Ms,"Adding an already active target "+i);continue}const r=await vp(n.localStore,i),o=await po(n.localStore,r);await Tu(n,zp(r),o.targetId,!1,o.resumeToken),Zo(n.remoteStore,o)}for(const i of t)n.Tu.has(i)&&await As(n.localStore,i,!1).then(()=>{Rs(n.remoteStore,i),Ss(n,i)}).catch(nn)}}function ea(s){const e=L(s);return e.remoteStore.remoteSyncer.applyRemoteEvent=jp.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=cv.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=rv.bind(null,e),e.hu.J_=QI.bind(null,e.eventManager),e.hu.pu=HI.bind(null,e.eventManager),e}function Cu(s){const e=L(s);return e.remoteStore.remoteSyncer.applySuccessfulWrite=ov.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=av.bind(null,e),e}class qi{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Xo(e.databaseInfo.databaseId),this.sharedClientState=this.bu(e),this.persistence=this.Du(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Cu(e,this.localStore),this.indexBackfillerScheduler=this.Fu(e,this.localStore)}Cu(e,t){return null}Fu(e,t){return null}vu(e){return yp(this.persistence,new gp,e.initialUser,this.serializer)}Du(e){return new hu(Yo.Vi,this.serializer)}bu(e){return new Sp}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}qi.provider={build:()=>new qi};class yv extends qi{constructor(e){super(),this.cacheSizeBytes=e}Cu(e,t){U(this.persistence.referenceDelegate instanceof _o,46915);const n=this.persistence.referenceDelegate.garbageCollector;return new hp(n,e.asyncQueue,t)}Du(e){const t=this.cacheSizeBytes!==void 0?Me.withCacheSize(this.cacheSizeBytes):Me.DEFAULT;return new hu(n=>_o.Vi(n,t),this.serializer)}}class Kp extends qi{constructor(e,t,n){super(),this.Mu=e,this.cacheSizeBytes=t,this.forceOwnership=n,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.Mu.initialize(this,e),await Cu(this.Mu.syncEngine),await ks(this.Mu.remoteStore),await this.persistence.ji(()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve()))}vu(e){return yp(this.persistence,new gp,e.initialUser,this.serializer)}Cu(e,t){const n=this.persistence.referenceDelegate.garbageCollector;return new hp(n,e.asyncQueue,t)}Fu(e,t){const n=new Vy(t,this.persistence);return new by(e.asyncQueue,n)}Du(e){const t=mp(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),n=this.cacheSizeBytes!==void 0?Me.withCacheSize(this.cacheSizeBytes):Me.DEFAULT;return new du(this.synchronizeTabs,t,e.clientId,n,e.asyncQueue,Pp(),Qr(),this.serializer,this.sharedClientState,!!this.forceOwnership)}bu(e){return new Sp}}class Ev extends Kp{constructor(e,t){super(e,t,!1),this.Mu=e,this.cacheSizeBytes=t,this.synchronizeTabs=!0}async initialize(e){await super.initialize(e);const t=this.Mu.syncEngine;this.sharedClientState instanceof za&&(this.sharedClientState.syncEngine={Do:fv.bind(null,t),vo:mv.bind(null,t),Co:gv.bind(null,t),Ps:pv.bind(null,t),bo:dv.bind(null,t)},await this.sharedClientState.start()),await this.persistence.ji(async n=>{await _v(this.Mu.syncEngine,n),this.gcScheduler&&(n&&!this.gcScheduler.started?this.gcScheduler.start():n||this.gcScheduler.stop()),this.indexBackfillerScheduler&&(n&&!this.indexBackfillerScheduler.started?this.indexBackfillerScheduler.start():n||this.indexBackfillerScheduler.stop())})}bu(e){const t=Pp();if(!za.C(t))throw new D(b.UNIMPLEMENTED,"IndexedDB persistence is only available on platforms that support LocalStorage.");const n=mp(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey);return new za(t,e.asyncQueue,n,e.clientId,e.initialUser)}}class ji{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=n=>Sd(this.syncEngine,n,1),this.remoteStore.remoteSyncer.handleCredentialChange=uv.bind(null,this.syncEngine),await Al(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new $I}()}createDatastore(e){const t=Xo(e.databaseInfo.databaseId),n=function(r){return new bI(r)}(e.databaseInfo);return function(r,o,l,u){return new DI(r,o,l,u)}(e.authCredentials,e.appCheckCredentials,n,t)}createRemoteStore(e){return function(n,i,r,o,l){return new OI(n,i,r,o,l)}(this.localStore,this.datastore,e.asyncQueue,t=>Sd(this.syncEngine,t,0),function(){return vd.C()?new vd:new RI}())}createSyncEngine(e,t){return function(i,r,o,l,u,c,f){const _=new ZI(i,r,o,l,u,c);return f&&(_.fu=!0),_}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(i){const r=L(i);N(Dn,"RemoteStore shutting down."),r.Ia.add(5),await nr(r),r.Ea.shutdown(),r.Aa.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}ji.provider={build:()=>new ji};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wp{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.xu(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.xu(this.observer.error,e):ye("Uncaught Error in snapshot listener:",e.toString()))}Ou(){this.muted=!0}xu(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Jt="FirestoreClient";class Iv{constructor(e,t,n,i,r){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=n,this.databaseInfo=i,this.user=Oe.UNAUTHENTICATED,this.clientId=zl.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=r,this.authCredentials.start(n,async o=>{N(Jt,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(n,o=>(N(Jt,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Rt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const n=Iu(t,"Failed to shutdown persistence");e.reject(n)}}),e.promise}}async function Wa(s,e){s.asyncQueue.verifyOperationInProgress(),N(Jt,"Initializing OfflineComponentProvider");const t=s.configuration;await e.initialize(t);let n=t.initialUser;s.setCredentialChangeListener(async i=>{n.isEqual(i)||(await Ep(e.localStore,i),n=i)}),e.persistence.setDatabaseDeletedListener(()=>{Qt("Terminating Firestore due to IndexedDb database deletion"),s.terminate().then(()=>{N("Terminating Firestore due to IndexedDb database deletion completed successfully")}).catch(i=>{Qt("Terminating Firestore due to IndexedDb database deletion failed",i)})}),s._offlineComponents=e}async function bd(s,e){s.asyncQueue.verifyOperationInProgress();const t=await vv(s);N(Jt,"Initializing OnlineComponentProvider"),await e.initialize(t,s.configuration),s.setCredentialChangeListener(n=>wd(e.remoteStore,n)),s.setAppCheckTokenChangeListener((n,i)=>wd(e.remoteStore,i)),s._onlineComponents=e}async function vv(s){if(!s._offlineComponents)if(s._uninitializedComponentsProvider){N(Jt,"Using user provided OfflineComponentProvider");try{await Wa(s,s._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(i){return i.name==="FirebaseError"?i.code===b.FAILED_PRECONDITION||i.code===b.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11}(t))throw t;Qt("Error using user provided cache. Falling back to memory cache: "+t),await Wa(s,new qi)}}else N(Jt,"Using default OfflineComponentProvider"),await Wa(s,new yv(void 0));return s._offlineComponents}async function $p(s){return s._onlineComponents||(s._uninitializedComponentsProvider?(N(Jt,"Using user provided OnlineComponentProvider"),await bd(s,s._uninitializedComponentsProvider._online)):(N(Jt,"Using default OnlineComponentProvider"),await bd(s,new ji))),s._onlineComponents}function Tv(s){return $p(s).then(e=>e.syncEngine)}async function Sl(s){const e=await $p(s),t=e.eventManager;return t.onListen=ev.bind(null,e.syncEngine),t.onUnlisten=nv.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=tv.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=sv.bind(null,e.syncEngine),t}function wv(s,e,t={}){const n=new Rt;return s.asyncQueue.enqueueAndForget(async()=>function(r,o,l,u,c){const f=new Wp({next:m=>{f.Ou(),o.enqueueAndForget(()=>Fp(r,_)),m.fromCache&&u.source==="server"?c.reject(new D(b.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):c.resolve(m)},error:m=>c.reject(m)}),_=new Lp(l,f,{includeMetadataChanges:!0,ka:!0});return Mp(r,_)}(await Sl(s),s.asyncQueue,e,t,n)),n.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qp(s){const e={};return s.timeoutSeconds!==void 0&&(e.timeoutSeconds=s.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vd=new Map;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Av="firestore.googleapis.com",xd=!0;class Nd{constructor(e){var t,n;if(e.host===void 0){if(e.ssl!==void 0)throw new D(b.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Av,this.ssl=xd}else this.host=e.host,this.ssl=(t=e.ssl)!==null&&t!==void 0?t:xd;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=op;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<cp)throw new D(b.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}Cy("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Qp((n=e.experimentalLongPollingOptions)!==null&&n!==void 0?n:{}),function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new D(b.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new D(b.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new D(b.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(n,i){return n.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Su{constructor(e,t,n,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=n,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Nd({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new D(b.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new D(b.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Nd(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(n){if(!n)return new yy;switch(n.type){case"firstParty":return new vy(n.sessionIndex||"0",n.iamToken||null,n.authTokenFactory||null);case"provider":return n.client;default:throw new D(b.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const n=Vd.get(t);n&&(N("ComponentProvider","Removing Datastore"),Vd.delete(t),n.terminate())}(this),Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Dt{constructor(e,t,n){this.converter=t,this._query=n,this.type="query",this.firestore=e}withConverter(e){return new Dt(this.firestore,e,this._query)}}class Ee{constructor(e,t,n){this.converter=t,this._key=n,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Wt(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Ee(this.firestore,e,this._key)}toJSON(){return{type:Ee._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,n){if(Yi(t,Ee._jsonSchema))return new Ee(e,n||null,new M(te.fromString(t.referencePath)))}}Ee._jsonSchemaVersion="firestore/documentReference/1.0",Ee._jsonSchema={type:Te("string",Ee._jsonSchemaVersion),referencePath:Te("string")};class Wt extends Dt{constructor(e,t,n){super(e,t,Go(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Ee(this.firestore,null,new M(e))}withConverter(e){return new Wt(this.firestore,e,this._path)}}function eR(s,e,...t){if(s=He(s),Gf("collection","path",e),s instanceof Su){const n=te.fromString(e,...t);return Th(n),new Wt(s,null,n)}{if(!(s instanceof Ee||s instanceof Wt))throw new D(b.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=s._path.child(te.fromString(e,...t));return Th(n),new Wt(s.firestore,null,n)}}function Rv(s,e,...t){if(s=He(s),arguments.length===1&&(e=zl.newId()),Gf("doc","path",e),s instanceof Su){const n=te.fromString(e,...t);return vh(n),new Ee(s,null,new M(n))}{if(!(s instanceof Ee||s instanceof Wt))throw new D(b.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=s._path.child(te.fromString(e,...t));return vh(n),new Ee(s.firestore,s instanceof Wt?s.converter:null,new M(n))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dd="AsyncQueue";class kd{constructor(e=Promise.resolve()){this.Zu=[],this.Xu=!1,this.ec=[],this.tc=null,this.nc=!1,this.rc=!1,this.sc=[],this.F_=new bp(this,"async_queue_retry"),this.oc=()=>{const n=Qr();n&&N(Dd,"Visibility state changed to "+n.visibilityState),this.F_.y_()},this._c=e;const t=Qr();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.oc)}get isShuttingDown(){return this.Xu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.ac(),this.uc(e)}enterRestrictedMode(e){if(!this.Xu){this.Xu=!0,this.rc=e||!1;const t=Qr();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.oc)}}enqueue(e){if(this.ac(),this.Xu)return new Promise(()=>{});const t=new Rt;return this.uc(()=>this.Xu&&this.rc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Zu.push(e),this.cc()))}async cc(){if(this.Zu.length!==0){try{await this.Zu[0](),this.Zu.shift(),this.F_.reset()}catch(e){if(!sn(e))throw e;N(Dd,"Operation failed with retryable error: "+e)}this.Zu.length>0&&this.F_.g_(()=>this.cc())}}uc(e){const t=this._c.then(()=>(this.nc=!0,e().catch(n=>{throw this.tc=n,this.nc=!1,ye("INTERNAL UNHANDLED ERROR: ",Od(n)),n}).then(n=>(this.nc=!1,n))));return this._c=t,t}enqueueAfterDelay(e,t,n){this.ac(),this.sc.indexOf(e)>-1&&(t=0);const i=Eu.createAndSchedule(this,e,t,n,r=>this.lc(r));return this.ec.push(i),i}ac(){this.tc&&F(47125,{hc:Od(this.tc)})}verifyOperationInProgress(){}async Pc(){let e;do e=this._c,await e;while(e!==this._c)}Tc(e){for(const t of this.ec)if(t.timerId===e)return!0;return!1}Ic(e){return this.Pc().then(()=>{this.ec.sort((t,n)=>t.targetTimeMs-n.targetTimeMs);for(const t of this.ec)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Pc()})}dc(e){this.sc.push(e)}lc(e){const t=this.ec.indexOf(e);this.ec.splice(t,1)}}function Od(s){let e=s.message||"";return s.stack&&(e=s.stack.includes(s.message)?s.stack:s.message+`
`+s.stack),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Md(s){return function(t,n){if(typeof t!="object"||t===null)return!1;const i=t;for(const r of n)if(r in i&&typeof i[r]=="function")return!0;return!1}(s,["next","error","complete"])}class Zt extends Su{constructor(e,t,n,i){super(e,t,n,i),this.type="firestore",this._queue=new kd,this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new kd(e),this._firestoreClient=void 0,await e}}}function tR(s,e,t){t||(t=io);const n=Rf(s,"firestore");if(n.isInitialized(t)){const i=n.getImmediate({identifier:t}),r=n.getOptions(t);if(Cf(r,e))return i;throw new D(b.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(e.cacheSizeBytes!==void 0&&e.localCache!==void 0)throw new D(b.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(e.cacheSizeBytes!==void 0&&e.cacheSizeBytes!==-1&&e.cacheSizeBytes<cp)throw new D(b.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return e.host&&Do(e.host)&&Sf(e.host),n.initialize({options:e,instanceIdentifier:t})}function Pu(s){if(s._terminated)throw new D(b.FAILED_PRECONDITION,"The client has already been terminated.");return s._firestoreClient||Cv(s),s._firestoreClient}function Cv(s){var e,t,n;const i=s._freezeSettings(),r=function(l,u,c,f){return new iE(l,u,c,f.host,f.ssl,f.experimentalForceLongPolling,f.experimentalAutoDetectLongPolling,Qp(f.experimentalLongPollingOptions),f.useFetchStreams,f.isUsingEmulator)}(s._databaseId,((e=s._app)===null||e===void 0?void 0:e.options.appId)||"",s._persistenceKey,i);s._componentsProvider||!((t=i.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((n=i.localCache)===null||n===void 0)&&n._onlineComponentProvider)&&(s._componentsProvider={_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider}),s._firestoreClient=new Iv(s._authCredentials,s._appCheckCredentials,s._queue,r,s._componentsProvider&&function(l){const u=l==null?void 0:l._online.build();return{_offline:l==null?void 0:l._offline.build(u),_online:u}}(s._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class st{constructor(e){this._byteString=e}static fromBase64String(e){try{return new st(Ie.fromBase64String(e))}catch(t){throw new D(b.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new st(Ie.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:st._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(Yi(e,st._jsonSchema))return st.fromBase64String(e.bytes)}}st._jsonSchemaVersion="firestore/bytes/1.0",st._jsonSchema={type:Te("string",st._jsonSchemaVersion),bytes:Te("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ta{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new D(b.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new fe(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class na{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mt{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new D(b.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new D(b.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return G(this._lat,e._lat)||G(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:mt._jsonSchemaVersion}}static fromJSON(e){if(Yi(e,mt._jsonSchema))return new mt(e.latitude,e.longitude)}}mt._jsonSchemaVersion="firestore/geoPoint/1.0",mt._jsonSchema={type:Te("string",mt._jsonSchemaVersion),latitude:Te("number"),longitude:Te("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gt{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(n,i){if(n.length!==i.length)return!1;for(let r=0;r<n.length;++r)if(n[r]!==i[r])return!1;return!0}(this._values,e._values)}toJSON(){return{type:gt._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Yi(e,gt._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(t=>typeof t=="number"))return new gt(e.vectorValues);throw new D(b.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}gt._jsonSchemaVersion="firestore/vectorValue/1.0",gt._jsonSchema={type:Te("string",gt._jsonSchemaVersion),vectorValues:Te("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Sv=/^__.*__$/;class Pv{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return this.fieldMask!==null?new Nt(e,this.data,this.fieldMask,t,this.fieldTransforms):new Ds(e,this.data,t,this.fieldTransforms)}}class Hp{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return new Nt(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function Yp(s){switch(s){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw F(40011,{Ec:s})}}class bu{constructor(e,t,n,i,r,o){this.settings=e,this.databaseId=t,this.serializer=n,this.ignoreUndefinedProperties=i,r===void 0&&this.Ac(),this.fieldTransforms=r||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Ec(){return this.settings.Ec}Rc(e){return new bu(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Vc(e){var t;const n=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.Rc({path:n,mc:!1});return i.fc(e),i}gc(e){var t;const n=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.Rc({path:n,mc:!1});return i.Ac(),i}yc(e){return this.Rc({path:void 0,mc:!0})}wc(e){return Eo(e,this.settings.methodName,this.settings.Sc||!1,this.path,this.settings.bc)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}Ac(){if(this.path)for(let e=0;e<this.path.length;e++)this.fc(this.path.get(e))}fc(e){if(e.length===0)throw this.wc("Document fields must not be empty");if(Yp(this.Ec)&&Sv.test(e))throw this.wc('Document fields cannot begin and end with "__"')}}class bv{constructor(e,t,n){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=n||Xo(e)}Dc(e,t,n,i=!1){return new bu({Ec:e,methodName:t,bc:n,path:fe.emptyPath(),mc:!1,Sc:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function sa(s){const e=s._freezeSettings(),t=Xo(s._databaseId);return new bv(s._databaseId,!!e.ignoreUndefinedProperties,t)}function Xp(s,e,t,n,i,r={}){const o=s.Dc(r.merge||r.mergeFields?2:0,e,t,i);xu("Data must be an object, but it was:",o,n);const l=Jp(n,o);let u,c;if(r.merge)u=new We(o.fieldMask),c=o.fieldTransforms;else if(r.mergeFields){const f=[];for(const _ of r.mergeFields){const m=Pl(e,_,t);if(!o.contains(m))throw new D(b.INVALID_ARGUMENT,`Field '${m}' is specified in your field mask but missing from your input data.`);em(f,m)||f.push(m)}u=new We(f),c=o.fieldTransforms.filter(_=>u.covers(_.field))}else u=null,c=o.fieldTransforms;return new Pv(new Ue(l),u,c)}class ia extends na{_toFieldTransform(e){if(e.Ec!==2)throw e.Ec===1?e.wc(`${this._methodName}() can only appear at the top level of your update data`):e.wc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof ia}}class Vu extends na{_toFieldTransform(e){return new F_(e.path,new Is)}isEqual(e){return e instanceof Vu}}function Vv(s,e,t,n){const i=s.Dc(1,e,t);xu("Data must be an object, but it was:",i,n);const r=[],o=Ue.empty();rn(n,(u,c)=>{const f=Nu(e,u,t);c=He(c);const _=i.gc(f);if(c instanceof ia)r.push(f);else{const m=sr(c,_);m!=null&&(r.push(f),o.set(f,m))}});const l=new We(r);return new Hp(o,l,i.fieldTransforms)}function xv(s,e,t,n,i,r){const o=s.Dc(1,e,t),l=[Pl(e,n,t)],u=[i];if(r.length%2!=0)throw new D(b.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let m=0;m<r.length;m+=2)l.push(Pl(e,r[m])),u.push(r[m+1]);const c=[],f=Ue.empty();for(let m=l.length-1;m>=0;--m)if(!em(c,l[m])){const I=l[m];let S=u[m];S=He(S);const V=o.gc(I);if(S instanceof ia)c.push(I);else{const x=sr(S,V);x!=null&&(c.push(I),f.set(I,x))}}const _=new We(c);return new Hp(f,_,o.fieldTransforms)}function Nv(s,e,t,n=!1){return sr(t,s.Dc(n?4:3,e))}function sr(s,e){if(Zp(s=He(s)))return xu("Unsupported field value:",e,s),Jp(s,e);if(s instanceof na)return function(n,i){if(!Yp(i.Ec))throw i.wc(`${n._methodName}() can only be used with update() and set()`);if(!i.path)throw i.wc(`${n._methodName}() is not currently supported inside arrays`);const r=n._toFieldTransform(i);r&&i.fieldTransforms.push(r)}(s,e),null;if(s===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),s instanceof Array){if(e.settings.mc&&e.Ec!==4)throw e.wc("Nested arrays are not supported");return function(n,i){const r=[];let o=0;for(const l of n){let u=sr(l,i.yc(o));u==null&&(u={nullValue:"NULL_VALUE"}),r.push(u),o++}return{arrayValue:{values:r}}}(s,e)}return function(n,i){if((n=He(n))===null)return{nullValue:"NULL_VALUE"};if(typeof n=="number")return vE(i.serializer,n);if(typeof n=="boolean")return{booleanValue:n};if(typeof n=="string")return{stringValue:n};if(n instanceof Date){const r=se.fromDate(n);return{timestampValue:ws(i.serializer,r)}}if(n instanceof se){const r=new se(n.seconds,1e3*Math.floor(n.nanoseconds/1e3));return{timestampValue:ws(i.serializer,r)}}if(n instanceof mt)return{geoPointValue:{latitude:n.latitude,longitude:n.longitude}};if(n instanceof st)return{bytesValue:z_(i.serializer,n._byteString)};if(n instanceof Ee){const r=i.databaseId,o=n.firestore._databaseId;if(!o.isEqual(r))throw i.wc(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${r.projectId}/${r.database}`);return{referenceValue:au(n.firestore._databaseId||i.databaseId,n._key.path)}}if(n instanceof gt)return function(o,l){return{mapValue:{fields:{[Jl]:{stringValue:Zl},[ms]:{arrayValue:{values:o.toArray().map(c=>{if(typeof c!="number")throw l.wc("VectorValues must only contain numeric values.");return nu(l.serializer,c)})}}}}}}(n,i);throw i.wc(`Unsupported field value: ${Oo(n)}`)}(s,e)}function Jp(s,e){const t={};return a_(s)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):rn(s,(n,i)=>{const r=sr(i,e.Vc(n));r!=null&&(t[n]=r)}),{mapValue:{fields:t}}}function Zp(s){return!(typeof s!="object"||s===null||s instanceof Array||s instanceof Date||s instanceof se||s instanceof mt||s instanceof st||s instanceof Ee||s instanceof na||s instanceof gt)}function xu(s,e,t){if(!Zp(t)||!zf(t)){const n=Oo(t);throw n==="an object"?e.wc(s+" a custom object"):e.wc(s+" "+n)}}function Pl(s,e,t){if((e=He(e))instanceof ta)return e._internalPath;if(typeof e=="string")return Nu(s,e);throw Eo("Field path arguments must be of type string or ",s,!1,void 0,t)}const Dv=new RegExp("[~\\*/\\[\\]]");function Nu(s,e,t){if(e.search(Dv)>=0)throw Eo(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,s,!1,void 0,t);try{return new ta(...e.split("."))._internalPath}catch{throw Eo(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,s,!1,void 0,t)}}function Eo(s,e,t,n,i){const r=n&&!n.isEmpty(),o=i!==void 0;let l=`Function ${e}() called with invalid data`;t&&(l+=" (via `toFirestore()`)"),l+=". ";let u="";return(r||o)&&(u+=" (found",r&&(u+=` in field ${n}`),o&&(u+=` in document ${i}`),u+=")"),new D(b.INVALID_ARGUMENT,l+s+u)}function em(s,e){return s.some(t=>t.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tm{constructor(e,t,n,i,r){this._firestore=e,this._userDataWriter=t,this._key=n,this._document=i,this._converter=r}get id(){return this._key.path.lastSegment()}get ref(){return new Ee(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new kv(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(ra("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class kv extends tm{data(){return super.data()}}function ra(s,e){return typeof e=="string"?Nu(s,e):e instanceof ta?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nm(s){if(s.limitType==="L"&&s.explicitOrderBy.length===0)throw new D(b.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class Du{}class ku extends Du{}function nR(s,e,...t){let n=[];e instanceof Du&&n.push(e),n=n.concat(t),function(r){const o=r.filter(u=>u instanceof Ou).length,l=r.filter(u=>u instanceof oa).length;if(o>1||o>0&&l>0)throw new D(b.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(n);for(const i of n)s=i._apply(s);return s}class oa extends ku{constructor(e,t,n){super(),this._field=e,this._op=t,this._value=n,this.type="where"}static _create(e,t,n){return new oa(e,t,n)}_apply(e){const t=this._parse(e);return sm(e._query,t),new Dt(e.firestore,e.converter,fl(e._query,t))}_parse(e){const t=sa(e.firestore);return function(r,o,l,u,c,f,_){let m;if(c.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new D(b.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){Ld(_,f);const S=[];for(const V of _)S.push(Fd(u,r,V));m={arrayValue:{values:S}}}else m=Fd(u,r,_)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||Ld(_,f),m=Nv(l,o,_,f==="in"||f==="not-in");return Y.create(c,f,m)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function sR(s,e,t){const n=e,i=ra("where",s);return oa._create(i,n,t)}class Ou extends Du{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new Ou(e,t)}_parse(e){const t=this._queryConstraints.map(n=>n._parse(e)).filter(n=>n.getFilters().length>0);return t.length===1?t[0]:ie.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(i,r){let o=i;const l=r.getFlattenedFilters();for(const u of l)sm(o,u),o=fl(o,u)}(e._query,t),new Dt(e.firestore,e.converter,fl(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class Mu extends ku{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new Mu(e,t)}_apply(e){const t=function(i,r,o){if(i.startAt!==null)throw new D(b.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(i.endAt!==null)throw new D(b.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Ui(r,o)}(e._query,this._field,this._direction);return new Dt(e.firestore,e.converter,function(i,r){const o=i.explicitOrderBy.concat([r]);return new Ns(i.path,i.collectionGroup,o,i.filters.slice(),i.limit,i.limitType,i.startAt,i.endAt)}(e._query,t))}}function iR(s,e="asc"){const t=e,n=ra("orderBy",s);return Mu._create(n,t)}class Fu extends ku{constructor(e,t,n){super(),this.type=e,this._limit=t,this._limitType=n}static _create(e,t,n){return new Fu(e,t,n)}_apply(e){return new Dt(e.firestore,e.converter,ao(e._query,this._limit,this._limitType))}}function rR(s){return Fu._create("limit",s,"F")}function Fd(s,e,t){if(typeof(t=He(t))=="string"){if(t==="")throw new D(b.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!R_(e)&&t.indexOf("/")!==-1)throw new D(b.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const n=e.path.child(te.fromString(t));if(!M.isDocumentKey(n))throw new D(b.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${n}' is not because it has an odd number of segments (${n.length}).`);return Fi(s,new M(n))}if(t instanceof Ee)return Fi(s,t._key);throw new D(b.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Oo(t)}.`)}function Ld(s,e){if(!Array.isArray(s)||s.length===0)throw new D(b.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function sm(s,e){const t=function(i,r){for(const o of i)for(const l of o.getFlattenedFilters())if(r.indexOf(l.op)>=0)return l.op;return null}(s.filters,function(i){switch(i){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new D(b.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new D(b.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}class Ov{convertValue(e,t="none"){switch(Ht(e)){case 0:return null;case 1:return e.booleanValue;case 2:return de(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Pt(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw F(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const n={};return rn(e,(i,r)=>{n[i]=this.convertValue(r,t)}),n}convertVectorValue(e){var t,n,i;const r=(i=(n=(t=e.fields)===null||t===void 0?void 0:t[ms].arrayValue)===null||n===void 0?void 0:n.values)===null||i===void 0?void 0:i.map(o=>de(o.doubleValue));return new gt(r)}convertGeoPoint(e){return new mt(de(e.latitude),de(e.longitude))}convertArray(e,t){return(e.values||[]).map(n=>this.convertValue(n,t))}convertServerTimestamp(e,t){switch(t){case"previous":const n=qo(e);return n==null?null:this.convertValue(n,t);case"estimate":return this.convertTimestamp(Oi(e));default:return null}}convertTimestamp(e){const t=St(e);return new se(t.seconds,t.nanos)}convertDocumentKey(e,t){const n=te.fromString(e);U(ep(n),9688,{name:e});const i=new Pn(n.get(1),n.get(3)),r=new M(n.popFirst(5));return i.isEqual(t)||ye(`Document ${r} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),r}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function im(s,e,t){let n;return n=s?t&&(t.merge||t.mergeFields)?s.toFirestore(e,t):s.toFirestore(e):e,n}class pi{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Rn extends tm{constructor(e,t,n,i,r,o){super(e,t,n,i,o),this._firestore=e,this._firestoreImpl=e,this.metadata=r}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Hr(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const n=this._document.data.field(ra("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new D(b.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=Rn._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}Rn._jsonSchemaVersion="firestore/documentSnapshot/1.0",Rn._jsonSchema={type:Te("string",Rn._jsonSchemaVersion),bundleSource:Te("string","DocumentSnapshot"),bundleName:Te("string"),bundle:Te("string")};class Hr extends Rn{data(e={}){return super.data(e)}}class Cn{constructor(e,t,n,i){this._firestore=e,this._userDataWriter=t,this._snapshot=i,this.metadata=new pi(i.hasPendingWrites,i.fromCache),this.query=n}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(n=>{e.call(t,new Hr(this._firestore,this._userDataWriter,n.key,n,new pi(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new D(b.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(i,r){if(i._snapshot.oldDocs.isEmpty()){let o=0;return i._snapshot.docChanges.map(l=>{const u=new Hr(i._firestore,i._userDataWriter,l.doc.key,l.doc,new pi(i._snapshot.mutatedKeys.has(l.doc.key),i._snapshot.fromCache),i.query.converter);return l.doc,{type:"added",doc:u,oldIndex:-1,newIndex:o++}})}{let o=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(l=>r||l.type!==3).map(l=>{const u=new Hr(i._firestore,i._userDataWriter,l.doc.key,l.doc,new pi(i._snapshot.mutatedKeys.has(l.doc.key),i._snapshot.fromCache),i.query.converter);let c=-1,f=-1;return l.type!==0&&(c=o.indexOf(l.doc.key),o=o.delete(l.doc.key)),l.type!==1&&(o=o.add(l.doc),f=o.indexOf(l.doc.key)),{type:Mv(l.type),doc:u,oldIndex:c,newIndex:f}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new D(b.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=Cn._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=zl.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],n=[],i=[];return this.docs.forEach(r=>{r._document!==null&&(t.push(r._document),n.push(this._userDataWriter.convertObjectMap(r._document.data.value.mapValue.fields,"previous")),i.push(r.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function Mv(s){switch(s){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return F(61501,{type:s})}}Cn._jsonSchemaVersion="firestore/querySnapshot/1.0",Cn._jsonSchema={type:Te("string",Cn._jsonSchemaVersion),bundleSource:Te("string","QuerySnapshot"),bundleName:Te("string"),bundle:Te("string")};class Lu extends Ov{constructor(e){super(),this.firestore=e}convertBytes(e){return new st(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Ee(this.firestore,null,t)}}function oR(s){s=ut(s,Dt);const e=ut(s.firestore,Zt),t=Pu(e),n=new Lu(e);return nm(s._query),wv(t,s._query).then(i=>new Cn(e,n,s,i))}function aR(s,e,t){s=ut(s,Ee);const n=ut(s.firestore,Zt),i=im(s.converter,e,t);return aa(n,[Xp(sa(n),"setDoc",s._key,i,s.converter!==null,t).toMutation(s._key,Be.none())])}function lR(s,e,t,...n){s=ut(s,Ee);const i=ut(s.firestore,Zt),r=sa(i);let o;return o=typeof(e=He(e))=="string"||e instanceof ta?xv(r,"updateDoc",s._key,e,t,n):Vv(r,"updateDoc",s._key,e),aa(i,[o.toMutation(s._key,Be.exists(!0))])}function uR(s){return aa(ut(s.firestore,Zt),[new $o(s._key,Be.none())])}function cR(s,e){const t=ut(s.firestore,Zt),n=Rv(s),i=im(s.converter,e);return aa(t,[Xp(sa(s.firestore),"addDoc",n._key,i,s.converter!==null,{}).toMutation(n._key,Be.exists(!1))]).then(()=>n)}function hR(s,...e){var t,n,i;s=He(s);let r={includeMetadataChanges:!1,source:"default"},o=0;typeof e[o]!="object"||Md(e[o])||(r=e[o++]);const l={includeMetadataChanges:r.includeMetadataChanges,source:r.source};if(Md(e[o])){const _=e[o];e[o]=(t=_.next)===null||t===void 0?void 0:t.bind(_),e[o+1]=(n=_.error)===null||n===void 0?void 0:n.bind(_),e[o+2]=(i=_.complete)===null||i===void 0?void 0:i.bind(_)}let u,c,f;if(s instanceof Ee)c=ut(s.firestore,Zt),f=Go(s._key.path),u={next:_=>{e[o]&&e[o](Fv(c,s,_))},error:e[o+1],complete:e[o+2]};else{const _=ut(s,Dt);c=ut(_.firestore,Zt),f=_._query;const m=new Lu(c);u={next:I=>{e[o]&&e[o](new Cn(c,m,_,I))},error:e[o+1],complete:e[o+2]},nm(s._query)}return function(m,I,S,V){const x=new Wp(V),K=new Lp(I,x,S);return m.asyncQueue.enqueueAndForget(async()=>Mp(await Sl(m),K)),()=>{x.Ou(),m.asyncQueue.enqueueAndForget(async()=>Fp(await Sl(m),K))}}(Pu(c),f,l,u)}function aa(s,e){return function(n,i){const r=new Rt;return n.asyncQueue.enqueueAndForget(async()=>iv(await Tv(n),i,r)),r.promise}(Pu(s),e)}function Fv(s,e,t){const n=t.docs.get(e._key),i=new Lu(s);return new Rn(s,i,e._key,n,new pi(t.hasPendingWrites,t.fromCache),e.converter)}class Lv{constructor(e){let t;this.kind="persistent",e!=null&&e.tabManager?(e.tabManager._initialize(e),t=e.tabManager):(t=qv(),t._initialize(e)),this._onlineComponentProvider=t._onlineComponentProvider,this._offlineComponentProvider=t._offlineComponentProvider}toJSON(){return{kind:this.kind}}}function dR(s){return new Lv(s)}class Uv{constructor(e){this.forceOwnership=e,this.kind="persistentSingleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=ji.provider,this._offlineComponentProvider={build:t=>new Kp(t,e==null?void 0:e.cacheSizeBytes,this.forceOwnership)}}}class Bv{constructor(){this.kind="PersistentMultipleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=ji.provider,this._offlineComponentProvider={build:t=>new Ev(t,e==null?void 0:e.cacheSizeBytes)}}}function qv(s){return new Uv(void 0)}function fR(){return new Bv}function _R(){return new Vu("serverTimestamp")}(function(e,t=!0){(function(i){xs=i})(Vf),Tf(new wf("firestore",(n,{instanceIdentifier:i,options:r})=>{const o=n.getProvider("app").getImmediate(),l=new Zt(new Ey(n.getProvider("auth-internal")),new Ty(o,n.getProvider("app-check-internal")),function(c,f){if(!Object.prototype.hasOwnProperty.apply(c.options,["projectId"]))throw new D(b.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Pn(c.options.projectId,f)}(o,i),o);return r=Object.assign({useFetchStreams:t},r),l._setSettings(r),l},"PUBLIC").setMultipleInstances(!0)),Xr(mh,gh,e),Xr(mh,gh,"esm2017")})();var Ud={};const Bd="@firebase/database",qd="1.0.20";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let rm="";function jv(s){rm=s}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gv{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){t==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),Pe(t))}get(e){const t=this.domStorage_.getItem(this.prefixedName_(e));return t==null?null:jl(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zv{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){t==null?delete this.cache_[e]:this.cache_[e]=t}get(e){return Vt(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const om=function(s){try{if(typeof window<"u"&&typeof window[s]<"u"){const e=window[s];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new Gv(e)}}catch{}return new zv},vn=om("localStorage"),Kv=om("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const os=new vf("@firebase/database"),Wv=function(){let s=1;return function(){return s++}}(),am=function(s){const e=sy(s),t=new iy;t.update(e);const n=t.digest();return ry.encodeByteArray(n)},ir=function(...s){let e="";for(let t=0;t<s.length;t++){const n=s[t];Array.isArray(n)||n&&typeof n=="object"&&typeof n.length=="number"?e+=ir.apply(null,n):typeof n=="object"?e+=Pe(n):e+=n,e+=" "}return e};let Ri=null,jd=!0;const $v=function(s,e){k(!0,"Can't turn on custom loggers persistently."),os.logLevel=ft.VERBOSE,Ri=os.log.bind(os)},Fe=function(...s){if(jd===!0&&(jd=!1,Ri===null&&Kv.get("logging_enabled")===!0&&$v()),Ri){const e=ir.apply(null,s);Ri(e)}},rr=function(s){return function(...e){Fe(s,...e)}},bl=function(...s){const e="FIREBASE INTERNAL ERROR: "+ir(...s);os.error(e)},bt=function(...s){const e=`FIREBASE FATAL ERROR: ${ir(...s)}`;throw os.error(e),new Error(e)},tt=function(...s){const e="FIREBASE WARNING: "+ir(...s);os.warn(e)},Qv=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&tt("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},lm=function(s){return typeof s=="number"&&(s!==s||s===Number.POSITIVE_INFINITY||s===Number.NEGATIVE_INFINITY)},Hv=function(s){if(document.readyState==="complete")s();else{let e=!1;const t=function(){if(!document.body){setTimeout(t,Math.floor(10));return}e||(e=!0,s())};document.addEventListener?(document.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("load",t,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&t()}),window.attachEvent("onload",t))}},Ps="[MIN_NAME]",kn="[MAX_NAME]",Fs=function(s,e){if(s===e)return 0;if(s===Ps||e===kn)return-1;if(e===Ps||s===kn)return 1;{const t=Gd(s),n=Gd(e);return t!==null?n!==null?t-n===0?s.length-e.length:t-n:-1:n!==null?1:s<e?-1:1}},Yv=function(s,e){return s===e?0:s<e?-1:1},ai=function(s,e){if(e&&s in e)return e[s];throw new Error("Missing required key ("+s+") in object: "+Pe(e))},Uu=function(s){if(typeof s!="object"||s===null)return Pe(s);const e=[];for(const n in s)e.push(n);e.sort();let t="{";for(let n=0;n<e.length;n++)n!==0&&(t+=","),t+=Pe(e[n]),t+=":",t+=Uu(s[e[n]]);return t+="}",t},um=function(s,e){const t=s.length;if(t<=e)return[s];const n=[];for(let i=0;i<t;i+=e)i+e>t?n.push(s.substring(i,t)):n.push(s.substring(i,i+e));return n};function Ye(s,e){for(const t in s)s.hasOwnProperty(t)&&e(t,s[t])}const cm=function(s){k(!lm(s),"Invalid JSON number");const e=11,t=52,n=(1<<e-1)-1;let i,r,o,l,u;s===0?(r=0,o=0,i=1/s===-1/0?1:0):(i=s<0,s=Math.abs(s),s>=Math.pow(2,1-n)?(l=Math.min(Math.floor(Math.log(s)/Math.LN2),n),r=l+n,o=Math.round(s*Math.pow(2,t-l)-Math.pow(2,t))):(r=0,o=Math.round(s/Math.pow(2,1-n-t))));const c=[];for(u=t;u;u-=1)c.push(o%2?1:0),o=Math.floor(o/2);for(u=e;u;u-=1)c.push(r%2?1:0),r=Math.floor(r/2);c.push(i?1:0),c.reverse();const f=c.join("");let _="";for(u=0;u<64;u+=8){let m=parseInt(f.substr(u,8),2).toString(16);m.length===1&&(m="0"+m),_=_+m}return _.toLowerCase()},Xv=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},Jv=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function Zv(s,e){let t="Unknown Error";s==="too_big"?t="The data requested exceeds the maximum size that can be accessed with a single request.":s==="permission_denied"?t="Client doesn't have permission to access the desired data.":s==="unavailable"&&(t="The service is unavailable");const n=new Error(s+" at "+e._path.toString()+": "+t);return n.code=s.toUpperCase(),n}const eT=new RegExp("^-?(0*)\\d{1,10}$"),tT=-2147483648,nT=2147483647,Gd=function(s){if(eT.test(s)){const e=Number(s);if(e>=tT&&e<=nT)return e}return null},or=function(s){try{s()}catch(e){setTimeout(()=>{const t=e.stack||"";throw tt("Exception was thrown by user callback.",t),e},Math.floor(0))}},sT=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},Ci=function(s,e){const t=setTimeout(s,e);return typeof t=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(t):typeof t=="object"&&t.unref&&t.unref(),t};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iT{constructor(e,t){this.appCheckProvider=t,this.appName=e.name,Af(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=t==null?void 0:t.getImmediate({optional:!0}),this.appCheck||t==null||t.get().then(n=>this.appCheck=n)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((t,n)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(t,n):t(null)},0)})}addTokenChangeListener(e){var t;(t=this.appCheckProvider)===null||t===void 0||t.get().then(n=>n.addTokenListener(e))}notifyForInvalidToken(){tt(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rT{constructor(e,t,n){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=n,this.auth_=null,this.auth_=n.getImmediate({optional:!0}),this.auth_||n.onInit(i=>this.auth_=i)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(t=>t&&t.code==="auth/token-not-initialized"?(Fe("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(t)):new Promise((t,n)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(t,n):t(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(t=>t.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(t=>t.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',tt(e)}}class Yr{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}Yr.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bu="5",hm="v",dm="s",fm="r",_m="f",pm=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,mm="ls",gm="p",Vl="ac",ym="websocket",Em="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Im{constructor(e,t,n,i,r=!1,o="",l=!1,u=!1,c=null){this.secure=t,this.namespace=n,this.webSocketOnly=i,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=l,this.isUsingEmulator=u,this.emulatorOptions=c,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=vn.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&vn.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}}function oT(s){return s.host!==s.internalHost||s.isCustomHost()||s.includeNamespaceInQueryParams}function vm(s,e,t){k(typeof e=="string","typeof type must == string"),k(typeof t=="object","typeof params must == object");let n;if(e===ym)n=(s.secure?"wss://":"ws://")+s.internalHost+"/.ws?";else if(e===Em)n=(s.secure?"https://":"http://")+s.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);oT(s)&&(t.ns=s.namespace);const i=[];return Ye(t,(r,o)=>{i.push(r+"="+o)}),n+i.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aT{constructor(){this.counters_={}}incrementCounter(e,t=1){Vt(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return cy(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $a={},Qa={};function qu(s){const e=s.toString();return $a[e]||($a[e]=new aT),$a[e]}function lT(s,e){const t=s.toString();return Qa[t]||(Qa[t]=e()),Qa[t]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uT{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){const n=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let i=0;i<n.length;++i)n[i]&&or(()=>{this.onMessage_(n[i])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const zd="start",cT="close",hT="pLPCommand",dT="pRTLPCB",Tm="id",wm="pw",Am="ser",fT="cb",_T="seg",pT="ts",mT="d",gT="dframe",Rm=1870,Cm=30,yT=Rm-Cm,ET=25e3,IT=3e4;class ss{constructor(e,t,n,i,r,o,l){this.connId=e,this.repoInfo=t,this.applicationId=n,this.appCheckToken=i,this.authToken=r,this.transportSessionId=o,this.lastSessionId=l,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=rr(e),this.stats_=qu(t),this.urlFn=u=>(this.appCheckToken&&(u[Vl]=this.appCheckToken),vm(t,Em,u))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new uT(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(IT)),Hv(()=>{if(this.isClosed_)return;this.scriptTagHolder=new ju((...r)=>{const[o,l,u,c,f]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===zd)this.id=l,this.password=u;else if(o===cT)l?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(l,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,l]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,l)},()=>{this.onClosed_()},this.urlFn);const n={};n[zd]="t",n[Am]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(n[fT]=this.scriptTagHolder.uniqueCallbackIdentifier),n[hm]=Bu,this.transportSessionId&&(n[dm]=this.transportSessionId),this.lastSessionId&&(n[mm]=this.lastSessionId),this.applicationId&&(n[gm]=this.applicationId),this.appCheckToken&&(n[Vl]=this.appCheckToken),typeof location<"u"&&location.hostname&&pm.test(location.hostname)&&(n[fm]=_m);const i=this.urlFn(n);this.log_("Connecting via long-poll to "+i),this.scriptTagHolder.addTag(i,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){ss.forceAllow_=!0}static forceDisallow(){ss.forceDisallow_=!0}static isAvailable(){return ss.forceAllow_?!0:!ss.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!Xv()&&!Jv()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const t=Pe(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const n=hy(t),i=um(n,yT);for(let r=0;r<i.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,i.length,i[r]),this.curSegmentNum++}addDisconnectPingFrame(e,t){this.myDisconnFrame=document.createElement("iframe");const n={};n[gT]="t",n[Tm]=e,n[wm]=t,this.myDisconnFrame.src=this.urlFn(n),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const t=Pe(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}}class ju{constructor(e,t,n,i){this.onDisconnect=n,this.urlFn=i,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=Wv(),window[hT+this.uniqueCallbackIdentifier]=e,window[dT+this.uniqueCallbackIdentifier]=t,this.myIFrame=ju.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(l){Fe("frame writing exception"),l.stack&&Fe(l.stack),Fe(l)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||Fe("No IE domain setting required")}catch{const n=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+n+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[Tm]=this.myID,e[wm]=this.myPW,e[Am]=this.currentSerial;let t=this.urlFn(e),n="",i=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+Cm+n.length<=Rm;){const o=this.pendingSegs.shift();n=n+"&"+_T+i+"="+o.seg+"&"+pT+i+"="+o.ts+"&"+mT+i+"="+o.d,i++}return t=t+n,this.addLongPollTag_(t,this.currentSerial),!0}else return!1}enqueueSegment(e,t,n){this.pendingSegs.push({seg:e,ts:t,d:n}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);const n=()=>{this.outstandingRequests.delete(t),this.newRequest_()},i=setTimeout(n,Math.floor(ET)),r=()=>{clearTimeout(i),n()};this.addTag(e,r)}addTag(e,t){setTimeout(()=>{try{if(!this.sendNewPolls)return;const n=this.myIFrame.doc.createElement("script");n.type="text/javascript",n.async=!0,n.src=e,n.onload=n.onreadystatechange=function(){const i=n.readyState;(!i||i==="loaded"||i==="complete")&&(n.onload=n.onreadystatechange=null,n.parentNode&&n.parentNode.removeChild(n),t())},n.onerror=()=>{Fe("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(n)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vT=16384,TT=45e3;let Io=null;typeof MozWebSocket<"u"?Io=MozWebSocket:typeof WebSocket<"u"&&(Io=WebSocket);class ot{constructor(e,t,n,i,r,o,l){this.connId=e,this.applicationId=n,this.appCheckToken=i,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=rr(this.connId),this.stats_=qu(t),this.connURL=ot.connectionURL_(t,o,l,i,n),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,n,i,r){const o={};return o[hm]=Bu,typeof location<"u"&&location.hostname&&pm.test(location.hostname)&&(o[fm]=_m),t&&(o[dm]=t),n&&(o[mm]=n),i&&(o[Vl]=i),r&&(o[gm]=r),vm(e,ym,o)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,vn.set("previous_websocket_failure",!0);try{let n;dy(),this.mySock=new Io(this.connURL,[],n)}catch(n){this.log_("Error instantiating WebSocket.");const i=n.message||n.data;i&&this.log_(i),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=n=>{this.handleIncomingFrame(n)},this.mySock.onerror=n=>{this.log_("WebSocket error.  Closing connection.");const i=n.message||n.data;i&&this.log_(i),this.onClosed_()}}start(){}static forceDisallow(){ot.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const t=/Android ([0-9]{0,}\.[0-9]{0,})/,n=navigator.userAgent.match(t);n&&n.length>1&&parseFloat(n[1])<4.4&&(e=!0)}return!e&&Io!==null&&!ot.forceDisallow_}static previouslyFailed(){return vn.isInMemoryStorage||vn.get("previous_websocket_failure")===!0}markConnectionHealthy(){vn.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const t=this.frames.join("");this.frames=null;const n=jl(t);this.onMessage(n)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(k(this.frames===null,"We already have a frame buffer"),e.length<=6){const t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(t);else{const n=this.extractFrameCount_(t);n!==null&&this.appendFrame_(n)}}send(e){this.resetKeepAlive();const t=Pe(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const n=um(t,vT);n.length>1&&this.sendString_(String(n.length));for(let i=0;i<n.length;i++)this.sendString_(n[i])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(TT))}sendString_(e){try{this.mySock.send(e)}catch(t){this.log_("Exception thrown from WebSocket.send():",t.message||t.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}ot.responsesRequiredToBeHealthy=2;ot.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gi{static get ALL_TRANSPORTS(){return[ss,ot]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const t=ot&&ot.isAvailable();let n=t&&!ot.previouslyFailed();if(e.webSocketOnly&&(t||tt("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),n=!0),n)this.transports_=[ot];else{const i=this.transports_=[];for(const r of Gi.ALL_TRANSPORTS)r&&r.isAvailable()&&i.push(r);Gi.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}Gi.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wT=6e4,AT=5e3,RT=10*1024,CT=100*1024,Ha="t",Kd="d",ST="s",Wd="r",PT="e",$d="o",Qd="a",Hd="n",Yd="p",bT="h";class VT{constructor(e,t,n,i,r,o,l,u,c,f){this.id=e,this.repoInfo_=t,this.applicationId_=n,this.appCheckToken_=i,this.authToken_=r,this.onMessage_=o,this.onReady_=l,this.onDisconnect_=u,this.onKill_=c,this.lastSessionId=f,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=rr("c:"+this.id+":"),this.transportManager_=new Gi(t),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.conn_),n=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(t,n)},Math.floor(0));const i=e.healthyTimeout||0;i>0&&(this.healthyTimeout_=Ci(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>CT?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>RT?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(i)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){const t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(Ha in e){const t=e[Ha];t===Qd?this.upgradeIfSecondaryHealthy_():t===Wd?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):t===$d&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const t=ai("t",e),n=ai("d",e);if(t==="c")this.onSecondaryControl_(n);else if(t==="d")this.pendingDataMessages.push(n);else throw new Error("Unknown protocol layer: "+t)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:Yd,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:Qd,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:Hd,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const t=ai("t",e),n=ai("d",e);t==="c"?this.onControl_(n):t==="d"&&this.onDataMessage_(n)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const t=ai(Ha,e);if(Kd in e){const n=e[Kd];if(t===bT){const i=Object.assign({},n);this.repoInfo_.isUsingEmulator&&(i.h=this.repoInfo_.host),this.onHandshake_(i)}else if(t===Hd){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let i=0;i<this.pendingDataMessages.length;++i)this.onDataMessage_(this.pendingDataMessages[i]);this.pendingDataMessages=[],this.tryCleanupConnection()}else t===ST?this.onConnectionShutdown_(n):t===Wd?this.onReset_(n):t===PT?bl("Server Error: "+n):t===$d?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):bl("Unknown control packet command: "+t)}}onHandshake_(e){const t=e.ts,n=e.v,i=e.h;this.sessionId=e.s,this.repoInfo_.host=i,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),Bu!==n&&tt("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.secondaryConn_),n=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,n),Ci(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(wT))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):Ci(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(AT))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:Yd,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(vn.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sm{put(e,t,n,i){}merge(e,t,n,i){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,n){}onDisconnectMerge(e,t,n){}onDisconnectCancel(e,t){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pm{constructor(e){this.allowedEvents_=e,this.listeners_={},k(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){const n=[...this.listeners_[e]];for(let i=0;i<n.length;i++)n[i].callback.apply(n[i].context,t)}}on(e,t,n){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:n});const i=this.getInitialEvent(e);i&&t.apply(n,i)}off(e,t,n){this.validateEventType_(e);const i=this.listeners_[e]||[];for(let r=0;r<i.length;r++)if(i[r].callback===t&&(!n||n===i[r].context)){i.splice(r,1);return}}validateEventType_(e){k(this.allowedEvents_.find(t=>t===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vo extends Pm{static getInstance(){return new vo}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!Df()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return k(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xd=32,Jd=768;class ae{constructor(e,t){if(t===void 0){this.pieces_=e.split("/");let n=0;for(let i=0;i<this.pieces_.length;i++)this.pieces_[i].length>0&&(this.pieces_[n]=this.pieces_[i],n++);this.pieces_.length=n,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)this.pieces_[t]!==""&&(e+="/"+this.pieces_[t]);return e||"/"}}function ne(){return new ae("")}function Q(s){return s.pieceNum_>=s.pieces_.length?null:s.pieces_[s.pieceNum_]}function en(s){return s.pieces_.length-s.pieceNum_}function ue(s){let e=s.pieceNum_;return e<s.pieces_.length&&e++,new ae(s.pieces_,e)}function bm(s){return s.pieceNum_<s.pieces_.length?s.pieces_[s.pieces_.length-1]:null}function xT(s){let e="";for(let t=s.pieceNum_;t<s.pieces_.length;t++)s.pieces_[t]!==""&&(e+="/"+encodeURIComponent(String(s.pieces_[t])));return e||"/"}function Vm(s,e=0){return s.pieces_.slice(s.pieceNum_+e)}function xm(s){if(s.pieceNum_>=s.pieces_.length)return null;const e=[];for(let t=s.pieceNum_;t<s.pieces_.length-1;t++)e.push(s.pieces_[t]);return new ae(e,0)}function we(s,e){const t=[];for(let n=s.pieceNum_;n<s.pieces_.length;n++)t.push(s.pieces_[n]);if(e instanceof ae)for(let n=e.pieceNum_;n<e.pieces_.length;n++)t.push(e.pieces_[n]);else{const n=e.split("/");for(let i=0;i<n.length;i++)n[i].length>0&&t.push(n[i])}return new ae(t,0)}function H(s){return s.pieceNum_>=s.pieces_.length}function $e(s,e){const t=Q(s),n=Q(e);if(t===null)return e;if(t===n)return $e(ue(s),ue(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+s+")")}function Gu(s,e){if(en(s)!==en(e))return!1;for(let t=s.pieceNum_,n=e.pieceNum_;t<=s.pieces_.length;t++,n++)if(s.pieces_[t]!==e.pieces_[n])return!1;return!0}function at(s,e){let t=s.pieceNum_,n=e.pieceNum_;if(en(s)>en(e))return!1;for(;t<s.pieces_.length;){if(s.pieces_[t]!==e.pieces_[n])return!1;++t,++n}return!0}class NT{constructor(e,t){this.errorPrefix_=t,this.parts_=Vm(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let n=0;n<this.parts_.length;n++)this.byteLength_+=ko(this.parts_[n]);Nm(this)}}function DT(s,e){s.parts_.length>0&&(s.byteLength_+=1),s.parts_.push(e),s.byteLength_+=ko(e),Nm(s)}function kT(s){const e=s.parts_.pop();s.byteLength_-=ko(e),s.parts_.length>0&&(s.byteLength_-=1)}function Nm(s){if(s.byteLength_>Jd)throw new Error(s.errorPrefix_+"has a key path longer than "+Jd+" bytes ("+s.byteLength_+").");if(s.parts_.length>Xd)throw new Error(s.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+Xd+") or object contains a cycle "+pn(s))}function pn(s){return s.parts_.length===0?"":"in property '"+s.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zu extends Pm{static getInstance(){return new zu}constructor(){super(["visible"]);let e,t;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(t="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(t="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(t="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,()=>{const n=!document[e];n!==this.visible_&&(this.visible_=n,this.trigger("visible",n))},!1)}getInitialEvent(e){return k(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const li=1e3,OT=60*5*1e3,Zd=30*1e3,MT=1.3,FT=3e4,LT="server_kill",ef=3;class Ct extends Sm{constructor(e,t,n,i,r,o,l,u){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=n,this.onConnectStatus_=i,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=l,this.authOverride_=u,this.id=Ct.nextPersistentConnectionId_++,this.log_=rr("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=li,this.maxReconnectDelay_=OT,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,u)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");zu.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&vo.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,n){const i=++this.requestNumber_,r={r:i,a:e,b:t};this.log_(Pe(r)),k(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),n&&(this.requestCBHash_[i]=n)}get(e){this.initConnection_();const t=new Nf,i={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const l=o.d;o.s==="ok"?t.resolve(l):t.reject(l)}};this.outstandingGets_.push(i),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),t.promise}listen(e,t,n,i){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),k(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),k(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const l={onComplete:i,hashFn:t,query:e,tag:n};this.listens.get(o).set(r,l),this.connected_&&this.sendListen_(l)}sendGet_(e){const t=this.outstandingGets_[e];this.sendRequest("g",t.request,n=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(n)})}sendListen_(e){const t=e.query,n=t._path.toString(),i=t._queryIdentifier;this.log_("Listen on "+n+" for "+i);const r={p:n},o="q";e.tag&&(r.q=t._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,l=>{const u=l.d,c=l.s;Ct.warnOnListenWarnings_(u,t),(this.listens.get(n)&&this.listens.get(n).get(i))===e&&(this.log_("listen response",l),c!=="ok"&&this.removeListen_(n,i),e.onComplete&&e.onComplete(c,u))})}static warnOnListenWarnings_(e,t){if(e&&typeof e=="object"&&Vt(e,"w")){const n=us(e,"w");if(Array.isArray(n)&&~n.indexOf("no_index")){const i='".indexOn": "'+t._queryParams.getIndex().toString()+'"',r=t._path.toString();tt(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${i} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||ay(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=Zd)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,t=ly(e)?"auth":"gauth",n={cred:e};this.authOverride_===null?n.noauth=!0:typeof this.authOverride_=="object"&&(n.authvar=this.authOverride_),this.sendRequest(t,n,i=>{const r=i.s,o=i.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const t=e.s,n=e.d||"error";t==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,n)})}unlisten(e,t){const n=e._path.toString(),i=e._queryIdentifier;this.log_("Unlisten called for "+n+" "+i),k(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(n,i)&&this.connected_&&this.sendUnlisten_(n,i,e._queryObject,t)}sendUnlisten_(e,t,n,i){this.log_("Unlisten on "+e+" for "+t);const r={p:e},o="n";i&&(r.q=n,r.t=i),this.sendRequest(o,r)}onDisconnectPut(e,t,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:n})}onDisconnectMerge(e,t,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:n})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,n,i){const r={p:t,d:n};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{i&&setTimeout(()=>{i(o.s,o.d)},Math.floor(0))})}put(e,t,n,i){this.putInternal("p",e,t,n,i)}merge(e,t,n,i){this.putInternal("m",e,t,n,i)}putInternal(e,t,n,i,r){this.initConnection_();const o={p:t,d:n};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:i}),this.outstandingPutCount_++;const l=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(l):this.log_("Buffering put: "+t)}sendPut_(e){const t=this.outstandingPuts_[e].action,n=this.outstandingPuts_[e].request,i=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,n,r=>{this.log_(t+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),i&&i(r.s,r.d)})}reportStats(e){if(this.connected_){const t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,n=>{if(n.s!=="ok"){const r=n.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+Pe(e));const t=e.r,n=this.requestCBHash_[t];n&&(delete this.requestCBHash_[t],n(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),e==="d"?this.onDataUpdate_(t.p,t.d,!1,t.t):e==="m"?this.onDataUpdate_(t.p,t.d,!0,t.t):e==="c"?this.onListenRevoked_(t.p,t.q):e==="ac"?this.onAuthRevoked_(t.s,t.d):e==="apc"?this.onAppCheckRevoked_(t.s,t.d):e==="sd"?this.onSecurityDebugPacket_(t):bl("Unrecognized action received from server: "+Pe(e)+`
Are you using the latest client?`)}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){k(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=li,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=li,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>FT&&(this.reconnectDelay_=li),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*MT)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),n=this.onRealtimeDisconnect_.bind(this),i=this.id+":"+Ct.nextConnectionId_++,r=this.lastSessionId;let o=!1,l=null;const u=function(){l?l.close():(o=!0,n())},c=function(_){k(l,"sendRequest call when we're not connected not allowed."),l.sendRequest(_)};this.realtime_={close:u,sendRequest:c};const f=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[_,m]=await Promise.all([this.authTokenProvider_.getToken(f),this.appCheckTokenProvider_.getToken(f)]);o?Fe("getToken() completed but was canceled"):(Fe("getToken() completed. Creating connection."),this.authToken_=_&&_.accessToken,this.appCheckToken_=m&&m.token,l=new VT(i,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,n,I=>{tt(I+" ("+this.repoInfo_.toString()+")"),this.interrupt(LT)},r))}catch(_){this.log_("Failed to get token: "+_),o||(this.repoInfo_.nodeAdmin&&tt(_),u())}}}interrupt(e){Fe("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){Fe("Resuming connection for reason: "+e),delete this.interruptReasons_[e],_h(this.interruptReasons_)&&(this.reconnectDelay_=li,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const t=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let n;t?n=t.map(r=>Uu(r)).join("$"):n="default";const i=this.removeListen_(e,n);i&&i.onComplete&&i.onComplete("permission_denied")}removeListen_(e,t){const n=new ae(e).toString();let i;if(this.listens.has(n)){const r=this.listens.get(n);i=r.get(t),r.delete(t),r.size===0&&this.listens.delete(n)}else i=void 0;return i}onAuthRevoked_(e,t){Fe("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=ef&&(this.reconnectDelay_=Zd,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){Fe("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=ef&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let t="js";e["sdk."+t+"."+rm.replace(/\./g,"-")]=1,Df()?e["framework.cordova"]=1:uy()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=vo.getInstance().currentlyOnline();return _h(this.interruptReasons_)&&e}}Ct.nextPersistentConnectionId_=0;Ct.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ${constructor(e,t){this.name=e,this.node=t}static Wrap(e,t){return new $(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class la{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){const n=new $(Ps,e),i=new $(Ps,t);return this.compare(n,i)!==0}minPost(){return $.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Mr;class Dm extends la{static get __EMPTY_NODE(){return Mr}static set __EMPTY_NODE(e){Mr=e}compare(e,t){return Fs(e.name,t.name)}isDefinedOn(e){throw Hi("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return $.MIN}maxPost(){return new $(kn,Mr)}makePost(e,t){return k(typeof e=="string","KeyIndex indexValue must always be a string."),new $(e,Mr)}toString(){return".key"}}const as=new Dm;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fr{constructor(e,t,n,i,r=null){this.isReverse_=i,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=t?n(e.key,t):1,i&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),t;if(this.resultGenerator_?t=this.resultGenerator_(e.key,e.value):t={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return t}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class Se{constructor(e,t,n,i,r){this.key=e,this.value=t,this.color=n??Se.RED,this.left=i??Qe.EMPTY_NODE,this.right=r??Qe.EMPTY_NODE}copy(e,t,n,i,r){return new Se(e??this.key,t??this.value,n??this.color,i??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let i=this;const r=n(e,i.key);return r<0?i=i.copy(null,null,null,i.left.insert(e,t,n),null):r===0?i=i.copy(null,t,null,null,null):i=i.copy(null,null,null,null,i.right.insert(e,t,n)),i.fixUp_()}removeMin_(){if(this.left.isEmpty())return Qe.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let n,i;if(n=this,t(e,n.key)<0)!n.left.isEmpty()&&!n.left.isRed_()&&!n.left.left.isRed_()&&(n=n.moveRedLeft_()),n=n.copy(null,null,null,n.left.remove(e,t),null);else{if(n.left.isRed_()&&(n=n.rotateRight_()),!n.right.isEmpty()&&!n.right.isRed_()&&!n.right.left.isRed_()&&(n=n.moveRedRight_()),t(e,n.key)===0){if(n.right.isEmpty())return Qe.EMPTY_NODE;i=n.right.min_(),n=n.copy(i.key,i.value,null,null,n.right.removeMin_())}n=n.copy(null,null,null,null,n.right.remove(e,t))}return n.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,Se.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,Se.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}Se.RED=!0;Se.BLACK=!1;class UT{copy(e,t,n,i,r){return this}insert(e,t,n){return new Se(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class Qe{constructor(e,t=Qe.EMPTY_NODE){this.comparator_=e,this.root_=t}insert(e,t){return new Qe(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,Se.BLACK,null,null))}remove(e){return new Qe(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,Se.BLACK,null,null))}get(e){let t,n=this.root_;for(;!n.isEmpty();){if(t=this.comparator_(e,n.key),t===0)return n.value;t<0?n=n.left:t>0&&(n=n.right)}return null}getPredecessorKey(e){let t,n=this.root_,i=null;for(;!n.isEmpty();)if(t=this.comparator_(e,n.key),t===0){if(n.left.isEmpty())return i?i.key:null;for(n=n.left;!n.right.isEmpty();)n=n.right;return n.key}else t<0?n=n.left:t>0&&(i=n,n=n.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new Fr(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new Fr(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new Fr(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new Fr(this.root_,null,this.comparator_,!0,e)}}Qe.EMPTY_NODE=new UT;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function BT(s,e){return Fs(s.name,e.name)}function Ku(s,e){return Fs(s,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let xl;function qT(s){xl=s}const km=function(s){return typeof s=="number"?"number:"+cm(s):"string:"+s},Om=function(s){if(s.isLeafNode()){const e=s.val();k(typeof e=="string"||typeof e=="number"||typeof e=="object"&&Vt(e,".sv"),"Priority must be a string or number.")}else k(s===xl||s.isEmpty(),"priority of unexpected type.");k(s===xl||s.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let tf;class Re{static set __childrenNodeConstructor(e){tf=e}static get __childrenNodeConstructor(){return tf}constructor(e,t=Re.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=t,this.lazyHash_=null,k(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),Om(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new Re(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:Re.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return H(e)?this:Q(e)===".priority"?this.priorityNode_:Re.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return e===".priority"?this.updatePriority(t):t.isEmpty()&&e!==".priority"?this:Re.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){const n=Q(e);return n===null?t:t.isEmpty()&&n!==".priority"?this:(k(n!==".priority"||en(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(n,Re.__childrenNodeConstructor.EMPTY_NODE.updateChild(ue(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+km(this.priorityNode_.val())+":");const t=typeof this.value_;e+=t+":",t==="number"?e+=cm(this.value_):e+=this.value_,this.lazyHash_=am(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===Re.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof Re.__childrenNodeConstructor?-1:(k(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const t=typeof e.value_,n=typeof this.value_,i=Re.VALUE_TYPE_ORDER.indexOf(t),r=Re.VALUE_TYPE_ORDER.indexOf(n);return k(i>=0,"Unknown leaf type: "+t),k(r>=0,"Unknown leaf type: "+n),i===r?n==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-i}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}else return!1}}Re.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Mm,Fm;function jT(s){Mm=s}function GT(s){Fm=s}class zT extends la{compare(e,t){const n=e.node.getPriority(),i=t.node.getPriority(),r=n.compareTo(i);return r===0?Fs(e.name,t.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return $.MIN}maxPost(){return new $(kn,new Re("[PRIORITY-POST]",Fm))}makePost(e,t){const n=Mm(e);return new $(t,new Re("[PRIORITY-POST]",n))}toString(){return".priority"}}const ge=new zT;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const KT=Math.log(2);class WT{constructor(e){const t=r=>parseInt(Math.log(r)/KT,10),n=r=>parseInt(Array(r+1).join("1"),2);this.count=t(e+1),this.current_=this.count-1;const i=n(this.count);this.bits_=e+1&i}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const To=function(s,e,t,n){s.sort(e);const i=function(u,c){const f=c-u;let _,m;if(f===0)return null;if(f===1)return _=s[u],m=t?t(_):_,new Se(m,_.node,Se.BLACK,null,null);{const I=parseInt(f/2,10)+u,S=i(u,I),V=i(I+1,c);return _=s[I],m=t?t(_):_,new Se(m,_.node,Se.BLACK,S,V)}},r=function(u){let c=null,f=null,_=s.length;const m=function(S,V){const x=_-S,K=_;_-=S;const j=i(x+1,K),B=s[x],J=t?t(B):B;I(new Se(J,B.node,V,null,j))},I=function(S){c?(c.left=S,c=S):(f=S,c=S)};for(let S=0;S<u.count;++S){const V=u.nextBitIsOne(),x=Math.pow(2,u.count-(S+1));V?m(x,Se.BLACK):(m(x,Se.BLACK),m(x,Se.RED))}return f},o=new WT(s.length),l=r(o);return new Qe(n||e,l)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ya;const Xn={};class At{static get Default(){return k(Xn&&ge,"ChildrenNode.ts has not been loaded"),Ya=Ya||new At({".priority":Xn},{".priority":ge}),Ya}constructor(e,t){this.indexes_=e,this.indexSet_=t}get(e){const t=us(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof Qe?t:null}hasIndex(e){return Vt(this.indexSet_,e.toString())}addIndex(e,t){k(e!==as,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const n=[];let i=!1;const r=t.getIterator($.Wrap);let o=r.getNext();for(;o;)i=i||e.isDefinedOn(o.node),n.push(o),o=r.getNext();let l;i?l=To(n,e.getCompare()):l=Xn;const u=e.toString(),c=Object.assign({},this.indexSet_);c[u]=e;const f=Object.assign({},this.indexes_);return f[u]=l,new At(f,c)}addToIndexes(e,t){const n=Zr(this.indexes_,(i,r)=>{const o=us(this.indexSet_,r);if(k(o,"Missing index implementation for "+r),i===Xn)if(o.isDefinedOn(e.node)){const l=[],u=t.getIterator($.Wrap);let c=u.getNext();for(;c;)c.name!==e.name&&l.push(c),c=u.getNext();return l.push(e),To(l,o.getCompare())}else return Xn;else{const l=t.get(e.name);let u=i;return l&&(u=u.remove(new $(e.name,l))),u.insert(e,e.node)}});return new At(n,this.indexSet_)}removeFromIndexes(e,t){const n=Zr(this.indexes_,i=>{if(i===Xn)return i;{const r=t.get(e.name);return r?i.remove(new $(e.name,r)):i}});return new At(n,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ui;class z{static get EMPTY_NODE(){return ui||(ui=new z(new Qe(Ku),null,At.Default))}constructor(e,t,n){this.children_=e,this.priorityNode_=t,this.indexMap_=n,this.lazyHash_=null,this.priorityNode_&&Om(this.priorityNode_),this.children_.isEmpty()&&k(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||ui}updatePriority(e){return this.children_.isEmpty()?this:new z(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const t=this.children_.get(e);return t===null?ui:t}}getChild(e){const t=Q(e);return t===null?this:this.getImmediateChild(t).getChild(ue(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,t){if(k(t,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(t);{const n=new $(e,t);let i,r;t.isEmpty()?(i=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(n,this.children_)):(i=this.children_.insert(e,t),r=this.indexMap_.addToIndexes(n,this.children_));const o=i.isEmpty()?ui:this.priorityNode_;return new z(i,o,r)}}updateChild(e,t){const n=Q(e);if(n===null)return t;{k(Q(e)!==".priority"||en(e)===1,".priority must be the last token in a path");const i=this.getImmediateChild(n).updateChild(ue(e),t);return this.updateImmediateChild(n,i)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const t={};let n=0,i=0,r=!0;if(this.forEachChild(ge,(o,l)=>{t[o]=l.val(e),n++,r&&z.INTEGER_REGEXP_.test(o)?i=Math.max(i,Number(o)):r=!1}),!e&&r&&i<2*n){const o=[];for(const l in t)o[l]=t[l];return o}else return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+km(this.getPriority().val())+":"),this.forEachChild(ge,(t,n)=>{const i=n.hash();i!==""&&(e+=":"+t+":"+i)}),this.lazyHash_=e===""?"":am(e)}return this.lazyHash_}getPredecessorChildName(e,t,n){const i=this.resolveIndex_(n);if(i){const r=i.getPredecessorKey(new $(e,t));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const t=this.resolveIndex_(e);if(t){const n=t.minKey();return n&&n.name}else return this.children_.minKey()}getFirstChild(e){const t=this.getFirstChildName(e);return t?new $(t,this.children_.get(t)):null}getLastChildName(e){const t=this.resolveIndex_(e);if(t){const n=t.maxKey();return n&&n.name}else return this.children_.maxKey()}getLastChild(e){const t=this.getLastChildName(e);return t?new $(t,this.children_.get(t)):null}forEachChild(e,t){const n=this.resolveIndex_(e);return n?n.inorderTraversal(i=>t(i.name,i.node)):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){const n=this.resolveIndex_(t);if(n)return n.getIteratorFrom(e,i=>i);{const i=this.children_.getIteratorFrom(e.name,$.Wrap);let r=i.peek();for(;r!=null&&t.compare(r,e)<0;)i.getNext(),r=i.peek();return i}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){const n=this.resolveIndex_(t);if(n)return n.getReverseIteratorFrom(e,i=>i);{const i=this.children_.getReverseIteratorFrom(e.name,$.Wrap);let r=i.peek();for(;r!=null&&t.compare(r,e)>0;)i.getNext(),r=i.peek();return i}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===ar?-1:0}withIndex(e){if(e===as||this.indexMap_.hasIndex(e))return this;{const t=this.indexMap_.addIndex(e,this.children_);return new z(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===as||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const t=e;if(this.getPriority().equals(t.getPriority()))if(this.children_.count()===t.children_.count()){const n=this.getIterator(ge),i=t.getIterator(ge);let r=n.getNext(),o=i.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=n.getNext(),o=i.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===as?null:this.indexMap_.get(e.toString())}}z.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class $T extends z{constructor(){super(new Qe(Ku),z.EMPTY_NODE,At.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return z.EMPTY_NODE}isEmpty(){return!1}}const ar=new $T;Object.defineProperties($,{MIN:{value:new $(Ps,z.EMPTY_NODE)},MAX:{value:new $(kn,ar)}});Dm.__EMPTY_NODE=z.EMPTY_NODE;Re.__childrenNodeConstructor=z;qT(ar);GT(ar);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const QT=!0;function Le(s,e=null){if(s===null)return z.EMPTY_NODE;if(typeof s=="object"&&".priority"in s&&(e=s[".priority"]),k(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof s=="object"&&".value"in s&&s[".value"]!==null&&(s=s[".value"]),typeof s!="object"||".sv"in s){const t=s;return new Re(t,Le(e))}if(!(s instanceof Array)&&QT){const t=[];let n=!1;if(Ye(s,(o,l)=>{if(o.substring(0,1)!=="."){const u=Le(l);u.isEmpty()||(n=n||!u.getPriority().isEmpty(),t.push(new $(o,u)))}}),t.length===0)return z.EMPTY_NODE;const r=To(t,BT,o=>o.name,Ku);if(n){const o=To(t,ge.getCompare());return new z(r,Le(e),new At({".priority":o},{".priority":ge}))}else return new z(r,Le(e),At.Default)}else{let t=z.EMPTY_NODE;return Ye(s,(n,i)=>{if(Vt(s,n)&&n.substring(0,1)!=="."){const r=Le(i);(r.isLeafNode()||!r.isEmpty())&&(t=t.updateImmediateChild(n,r))}}),t.updatePriority(Le(e))}}jT(Le);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class HT extends la{constructor(e){super(),this.indexPath_=e,k(!H(e)&&Q(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){const n=this.extractChild(e.node),i=this.extractChild(t.node),r=n.compareTo(i);return r===0?Fs(e.name,t.name):r}makePost(e,t){const n=Le(e),i=z.EMPTY_NODE.updateChild(this.indexPath_,n);return new $(t,i)}maxPost(){const e=z.EMPTY_NODE.updateChild(this.indexPath_,ar);return new $(kn,e)}toString(){return Vm(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class YT extends la{compare(e,t){const n=e.node.compareTo(t.node);return n===0?Fs(e.name,t.name):n}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return $.MIN}maxPost(){return $.MAX}makePost(e,t){const n=Le(e);return new $(t,n)}toString(){return".value"}}const XT=new YT;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lm(s){return{type:"value",snapshotNode:s}}function bs(s,e){return{type:"child_added",snapshotNode:e,childName:s}}function zi(s,e){return{type:"child_removed",snapshotNode:e,childName:s}}function Ki(s,e,t){return{type:"child_changed",snapshotNode:e,childName:s,oldSnap:t}}function JT(s,e){return{type:"child_moved",snapshotNode:e,childName:s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wu{constructor(e){this.index_=e}updateChild(e,t,n,i,r,o){k(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const l=e.getImmediateChild(t);return l.getChild(i).equals(n.getChild(i))&&l.isEmpty()===n.isEmpty()||(o!=null&&(n.isEmpty()?e.hasChild(t)?o.trackChildChange(zi(t,l)):k(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):l.isEmpty()?o.trackChildChange(bs(t,n)):o.trackChildChange(Ki(t,n,l))),e.isLeafNode()&&n.isEmpty())?e:e.updateImmediateChild(t,n).withIndex(this.index_)}updateFullNode(e,t,n){return n!=null&&(e.isLeafNode()||e.forEachChild(ge,(i,r)=>{t.hasChild(i)||n.trackChildChange(zi(i,r))}),t.isLeafNode()||t.forEachChild(ge,(i,r)=>{if(e.hasChild(i)){const o=e.getImmediateChild(i);o.equals(r)||n.trackChildChange(Ki(i,r,o))}else n.trackChildChange(bs(i,r))})),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?z.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wi{constructor(e){this.indexedFilter_=new Wu(e.getIndex()),this.index_=e.getIndex(),this.startPost_=Wi.getStartPost_(e),this.endPost_=Wi.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const t=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,n=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return t&&n}updateChild(e,t,n,i,r,o){return this.matches(new $(t,n))||(n=z.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,n,i,r,o)}updateFullNode(e,t,n){t.isLeafNode()&&(t=z.EMPTY_NODE);let i=t.withIndex(this.index_);i=i.updatePriority(z.EMPTY_NODE);const r=this;return t.forEachChild(ge,(o,l)=>{r.matches(new $(o,l))||(i=i.updateImmediateChild(o,z.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,i,n)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ZT{constructor(e){this.withinDirectionalStart=t=>this.reverse_?this.withinEndPost(t):this.withinStartPost(t),this.withinDirectionalEnd=t=>this.reverse_?this.withinStartPost(t):this.withinEndPost(t),this.withinStartPost=t=>{const n=this.index_.compare(this.rangedFilter_.getStartPost(),t);return this.startIsInclusive_?n<=0:n<0},this.withinEndPost=t=>{const n=this.index_.compare(t,this.rangedFilter_.getEndPost());return this.endIsInclusive_?n<=0:n<0},this.rangedFilter_=new Wi(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,n,i,r,o){return this.rangedFilter_.matches(new $(t,n))||(n=z.EMPTY_NODE),e.getImmediateChild(t).equals(n)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,n,i,r,o):this.fullLimitUpdateChild_(e,t,n,r,o)}updateFullNode(e,t,n){let i;if(t.isLeafNode()||t.isEmpty())i=z.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<t.numChildren()&&t.isIndexed(this.index_)){i=z.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const l=r.getNext();if(this.withinDirectionalStart(l))if(this.withinDirectionalEnd(l))i=i.updateImmediateChild(l.name,l.node),o++;else break;else continue}}else{i=t.withIndex(this.index_),i=i.updatePriority(z.EMPTY_NODE);let r;this.reverse_?r=i.getReverseIterator(this.index_):r=i.getIterator(this.index_);let o=0;for(;r.hasNext();){const l=r.getNext();o<this.limit_&&this.withinDirectionalStart(l)&&this.withinDirectionalEnd(l)?o++:i=i.updateImmediateChild(l.name,z.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,i,n)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,n,i,r){let o;if(this.reverse_){const _=this.index_.getCompare();o=(m,I)=>_(I,m)}else o=this.index_.getCompare();const l=e;k(l.numChildren()===this.limit_,"");const u=new $(t,n),c=this.reverse_?l.getFirstChild(this.index_):l.getLastChild(this.index_),f=this.rangedFilter_.matches(u);if(l.hasChild(t)){const _=l.getImmediateChild(t);let m=i.getChildAfterChild(this.index_,c,this.reverse_);for(;m!=null&&(m.name===t||l.hasChild(m.name));)m=i.getChildAfterChild(this.index_,m,this.reverse_);const I=m==null?1:o(m,u);if(f&&!n.isEmpty()&&I>=0)return r!=null&&r.trackChildChange(Ki(t,n,_)),l.updateImmediateChild(t,n);{r!=null&&r.trackChildChange(zi(t,_));const V=l.updateImmediateChild(t,z.EMPTY_NODE);return m!=null&&this.rangedFilter_.matches(m)?(r!=null&&r.trackChildChange(bs(m.name,m.node)),V.updateImmediateChild(m.name,m.node)):V}}else return n.isEmpty()?e:f&&o(c,u)>=0?(r!=null&&(r.trackChildChange(zi(c.name,c.node)),r.trackChildChange(bs(t,n))),l.updateImmediateChild(t,n).updateImmediateChild(c.name,z.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $u{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=ge}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return k(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return k(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:Ps}hasEnd(){return this.endSet_}getIndexEndValue(){return k(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return k(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:kn}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return k(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===ge}copy(){const e=new $u;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function ew(s){return s.loadsAllData()?new Wu(s.getIndex()):s.hasLimit()?new ZT(s):new Wi(s)}function nf(s){const e={};if(s.isDefault())return e;let t;if(s.index_===ge?t="$priority":s.index_===XT?t="$value":s.index_===as?t="$key":(k(s.index_ instanceof HT,"Unrecognized index type!"),t=s.index_.toString()),e.orderBy=Pe(t),s.startSet_){const n=s.startAfterSet_?"startAfter":"startAt";e[n]=Pe(s.indexStartValue_),s.startNameSet_&&(e[n]+=","+Pe(s.indexStartName_))}if(s.endSet_){const n=s.endBeforeSet_?"endBefore":"endAt";e[n]=Pe(s.indexEndValue_),s.endNameSet_&&(e[n]+=","+Pe(s.indexEndName_))}return s.limitSet_&&(s.isViewFromLeft()?e.limitToFirst=s.limit_:e.limitToLast=s.limit_),e}function sf(s){const e={};if(s.startSet_&&(e.sp=s.indexStartValue_,s.startNameSet_&&(e.sn=s.indexStartName_),e.sin=!s.startAfterSet_),s.endSet_&&(e.ep=s.indexEndValue_,s.endNameSet_&&(e.en=s.indexEndName_),e.ein=!s.endBeforeSet_),s.limitSet_){e.l=s.limit_;let t=s.viewFrom_;t===""&&(s.isViewFromLeft()?t="l":t="r"),e.vf=t}return s.index_!==ge&&(e.i=s.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wo extends Sm{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return t!==void 0?"tag$"+t:(k(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,t,n,i){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=n,this.appCheckTokenProvider_=i,this.log_=rr("p:rest:"),this.listens_={}}listen(e,t,n,i){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=wo.getListenId_(e,n),l={};this.listens_[o]=l;const u=nf(e._queryParams);this.restRequest_(r+".json",u,(c,f)=>{let _=f;if(c===404&&(_=null,c=null),c===null&&this.onDataUpdate_(r,_,!1,n),us(this.listens_,o)===l){let m;c?c===401?m="permission_denied":m="rest_error:"+c:m="ok",i(m,null)}})}unlisten(e,t){const n=wo.getListenId_(e,t);delete this.listens_[n]}get(e){const t=nf(e._queryParams),n=e._path.toString(),i=new Nf;return this.restRequest_(n+".json",t,(r,o)=>{let l=o;r===404&&(l=null,r=null),r===null?(this.onDataUpdate_(n,l,!1,null),i.resolve(l)):i.reject(new Error(l))}),i.promise}refreshAuthToken(e){}restRequest_(e,t={},n){return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([i,r])=>{i&&i.accessToken&&(t.auth=i.accessToken),r&&r.token&&(t.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+oy(t);this.log_("Sending REST request for "+o);const l=new XMLHttpRequest;l.onreadystatechange=()=>{if(n&&l.readyState===4){this.log_("REST Response for "+o+" received. status:",l.status,"response:",l.responseText);let u=null;if(l.status>=200&&l.status<300){try{u=jl(l.responseText)}catch{tt("Failed to parse JSON response for "+o+": "+l.responseText)}n(null,u)}else l.status!==401&&l.status!==404&&tt("Got unsuccessful REST response for "+o+" Status: "+l.status),n(l.status);n=null}},l.open("GET",o,!0),l.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tw{constructor(){this.rootNode_=z.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ao(){return{value:null,children:new Map}}function Um(s,e,t){if(H(e))s.value=t,s.children.clear();else if(s.value!==null)s.value=s.value.updateChild(e,t);else{const n=Q(e);s.children.has(n)||s.children.set(n,Ao());const i=s.children.get(n);e=ue(e),Um(i,e,t)}}function Nl(s,e,t){s.value!==null?t(e,s.value):nw(s,(n,i)=>{const r=new ae(e.toString()+"/"+n);Nl(i,r,t)})}function nw(s,e){s.children.forEach((t,n)=>{e(n,t)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sw{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),t=Object.assign({},e);return this.last_&&Ye(this.last_,(n,i)=>{t[n]=t[n]-i}),this.last_=e,t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rf=10*1e3,iw=30*1e3,rw=5*60*1e3;class ow{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new sw(e);const n=rf+(iw-rf)*Math.random();Ci(this.reportStats_.bind(this),Math.floor(n))}reportStats_(){const e=this.statsListener_.get(),t={};let n=!1;Ye(e,(i,r)=>{r>0&&Vt(this.statsToReport_,i)&&(t[i]=r,n=!0)}),n&&this.server_.reportStats(t),Ci(this.reportStats_.bind(this),Math.floor(Math.random()*2*rw))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var lt;(function(s){s[s.OVERWRITE=0]="OVERWRITE",s[s.MERGE=1]="MERGE",s[s.ACK_USER_WRITE=2]="ACK_USER_WRITE",s[s.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(lt||(lt={}));function Bm(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function Qu(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function Hu(s){return{fromUser:!1,fromServer:!0,queryId:s,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ro{constructor(e,t,n){this.path=e,this.affectedTree=t,this.revert=n,this.type=lt.ACK_USER_WRITE,this.source=Bm()}operationForChild(e){if(H(this.path)){if(this.affectedTree.value!=null)return k(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const t=this.affectedTree.subtree(new ae(e));return new Ro(ne(),t,this.revert)}}else return k(Q(this.path)===e,"operationForChild called for unrelated child."),new Ro(ue(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $i{constructor(e,t){this.source=e,this.path=t,this.type=lt.LISTEN_COMPLETE}operationForChild(e){return H(this.path)?new $i(this.source,ne()):new $i(this.source,ue(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class On{constructor(e,t,n){this.source=e,this.path=t,this.snap=n,this.type=lt.OVERWRITE}operationForChild(e){return H(this.path)?new On(this.source,ne(),this.snap.getImmediateChild(e)):new On(this.source,ue(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qi{constructor(e,t,n){this.source=e,this.path=t,this.children=n,this.type=lt.MERGE}operationForChild(e){if(H(this.path)){const t=this.children.subtree(new ae(e));return t.isEmpty()?null:t.value?new On(this.source,ne(),t.value):new Qi(this.source,ne(),t)}else return k(Q(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new Qi(this.source,ue(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mn{constructor(e,t,n){this.node_=e,this.fullyInitialized_=t,this.filtered_=n}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(H(e))return this.isFullyInitialized()&&!this.filtered_;const t=Q(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aw{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function lw(s,e,t,n){const i=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&s.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(JT(o.childName,o.snapshotNode))}),ci(s,i,"child_removed",e,n,t),ci(s,i,"child_added",e,n,t),ci(s,i,"child_moved",r,n,t),ci(s,i,"child_changed",e,n,t),ci(s,i,"value",e,n,t),i}function ci(s,e,t,n,i,r){const o=n.filter(l=>l.type===t);o.sort((l,u)=>cw(s,l,u)),o.forEach(l=>{const u=uw(s,l,r);i.forEach(c=>{c.respondsTo(l.type)&&e.push(c.createEvent(u,s.query_))})})}function uw(s,e,t){return e.type==="value"||e.type==="child_removed"||(e.prevName=t.getPredecessorChildName(e.childName,e.snapshotNode,s.index_)),e}function cw(s,e,t){if(e.childName==null||t.childName==null)throw Hi("Should only compare child_ events.");const n=new $(e.childName,e.snapshotNode),i=new $(t.childName,t.snapshotNode);return s.index_.compare(n,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ua(s,e){return{eventCache:s,serverCache:e}}function Si(s,e,t,n){return ua(new Mn(e,t,n),s.serverCache)}function qm(s,e,t,n){return ua(s.eventCache,new Mn(e,t,n))}function Dl(s){return s.eventCache.isFullyInitialized()?s.eventCache.getNode():null}function Fn(s){return s.serverCache.isFullyInitialized()?s.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Xa;const hw=()=>(Xa||(Xa=new Qe(Yv)),Xa);class he{static fromObject(e){let t=new he(null);return Ye(e,(n,i)=>{t=t.set(new ae(n),i)}),t}constructor(e,t=hw()){this.value=e,this.children=t}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(this.value!=null&&t(this.value))return{path:ne(),value:this.value};if(H(e))return null;{const n=Q(e),i=this.children.get(n);if(i!==null){const r=i.findRootMostMatchingPathAndValue(ue(e),t);return r!=null?{path:we(new ae(n),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(H(e))return this;{const t=Q(e),n=this.children.get(t);return n!==null?n.subtree(ue(e)):new he(null)}}set(e,t){if(H(e))return new he(t,this.children);{const n=Q(e),r=(this.children.get(n)||new he(null)).set(ue(e),t),o=this.children.insert(n,r);return new he(this.value,o)}}remove(e){if(H(e))return this.children.isEmpty()?new he(null):new he(null,this.children);{const t=Q(e),n=this.children.get(t);if(n){const i=n.remove(ue(e));let r;return i.isEmpty()?r=this.children.remove(t):r=this.children.insert(t,i),this.value===null&&r.isEmpty()?new he(null):new he(this.value,r)}else return this}}get(e){if(H(e))return this.value;{const t=Q(e),n=this.children.get(t);return n?n.get(ue(e)):null}}setTree(e,t){if(H(e))return t;{const n=Q(e),r=(this.children.get(n)||new he(null)).setTree(ue(e),t);let o;return r.isEmpty()?o=this.children.remove(n):o=this.children.insert(n,r),new he(this.value,o)}}fold(e){return this.fold_(ne(),e)}fold_(e,t){const n={};return this.children.inorderTraversal((i,r)=>{n[i]=r.fold_(we(e,i),t)}),t(e,this.value,n)}findOnPath(e,t){return this.findOnPath_(e,ne(),t)}findOnPath_(e,t,n){const i=this.value?n(t,this.value):!1;if(i)return i;if(H(e))return null;{const r=Q(e),o=this.children.get(r);return o?o.findOnPath_(ue(e),we(t,r),n):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,ne(),t)}foreachOnPath_(e,t,n){if(H(e))return this;{this.value&&n(t,this.value);const i=Q(e),r=this.children.get(i);return r?r.foreachOnPath_(ue(e),we(t,i),n):new he(null)}}foreach(e){this.foreach_(ne(),e)}foreach_(e,t){this.children.inorderTraversal((n,i)=>{i.foreach_(we(e,n),t)}),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal((t,n)=>{n.value&&e(t,n.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ct{constructor(e){this.writeTree_=e}static empty(){return new ct(new he(null))}}function Pi(s,e,t){if(H(e))return new ct(new he(t));{const n=s.writeTree_.findRootMostValueAndPath(e);if(n!=null){const i=n.path;let r=n.value;const o=$e(i,e);return r=r.updateChild(o,t),new ct(s.writeTree_.set(i,r))}else{const i=new he(t),r=s.writeTree_.setTree(e,i);return new ct(r)}}}function of(s,e,t){let n=s;return Ye(t,(i,r)=>{n=Pi(n,we(e,i),r)}),n}function af(s,e){if(H(e))return ct.empty();{const t=s.writeTree_.setTree(e,new he(null));return new ct(t)}}function kl(s,e){return Un(s,e)!=null}function Un(s,e){const t=s.writeTree_.findRootMostValueAndPath(e);return t!=null?s.writeTree_.get(t.path).getChild($e(t.path,e)):null}function lf(s){const e=[],t=s.writeTree_.value;return t!=null?t.isLeafNode()||t.forEachChild(ge,(n,i)=>{e.push(new $(n,i))}):s.writeTree_.children.inorderTraversal((n,i)=>{i.value!=null&&e.push(new $(n,i.value))}),e}function $t(s,e){if(H(e))return s;{const t=Un(s,e);return t!=null?new ct(new he(t)):new ct(s.writeTree_.subtree(e))}}function Ol(s){return s.writeTree_.isEmpty()}function Vs(s,e){return jm(ne(),s.writeTree_,e)}function jm(s,e,t){if(e.value!=null)return t.updateChild(s,e.value);{let n=null;return e.children.inorderTraversal((i,r)=>{i===".priority"?(k(r.value!==null,"Priority writes must always be leaf nodes"),n=r.value):t=jm(we(s,i),r,t)}),!t.getChild(s).isEmpty()&&n!==null&&(t=t.updateChild(we(s,".priority"),n)),t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yu(s,e){return Wm(e,s)}function dw(s,e,t,n,i){k(n>s.lastWriteId,"Stacking an older write on top of newer ones"),i===void 0&&(i=!0),s.allWrites.push({path:e,snap:t,writeId:n,visible:i}),i&&(s.visibleWrites=Pi(s.visibleWrites,e,t)),s.lastWriteId=n}function fw(s,e){for(let t=0;t<s.allWrites.length;t++){const n=s.allWrites[t];if(n.writeId===e)return n}return null}function _w(s,e){const t=s.allWrites.findIndex(l=>l.writeId===e);k(t>=0,"removeWrite called with nonexistent writeId.");const n=s.allWrites[t];s.allWrites.splice(t,1);let i=n.visible,r=!1,o=s.allWrites.length-1;for(;i&&o>=0;){const l=s.allWrites[o];l.visible&&(o>=t&&pw(l,n.path)?i=!1:at(n.path,l.path)&&(r=!0)),o--}if(i){if(r)return mw(s),!0;if(n.snap)s.visibleWrites=af(s.visibleWrites,n.path);else{const l=n.children;Ye(l,u=>{s.visibleWrites=af(s.visibleWrites,we(n.path,u))})}return!0}else return!1}function pw(s,e){if(s.snap)return at(s.path,e);for(const t in s.children)if(s.children.hasOwnProperty(t)&&at(we(s.path,t),e))return!0;return!1}function mw(s){s.visibleWrites=Gm(s.allWrites,gw,ne()),s.allWrites.length>0?s.lastWriteId=s.allWrites[s.allWrites.length-1].writeId:s.lastWriteId=-1}function gw(s){return s.visible}function Gm(s,e,t){let n=ct.empty();for(let i=0;i<s.length;++i){const r=s[i];if(e(r)){const o=r.path;let l;if(r.snap)at(t,o)?(l=$e(t,o),n=Pi(n,l,r.snap)):at(o,t)&&(l=$e(o,t),n=Pi(n,ne(),r.snap.getChild(l)));else if(r.children){if(at(t,o))l=$e(t,o),n=of(n,l,r.children);else if(at(o,t))if(l=$e(o,t),H(l))n=of(n,ne(),r.children);else{const u=us(r.children,Q(l));if(u){const c=u.getChild(ue(l));n=Pi(n,ne(),c)}}}else throw Hi("WriteRecord should have .snap or .children")}}return n}function zm(s,e,t,n,i){if(!n&&!i){const r=Un(s.visibleWrites,e);if(r!=null)return r;{const o=$t(s.visibleWrites,e);if(Ol(o))return t;if(t==null&&!kl(o,ne()))return null;{const l=t||z.EMPTY_NODE;return Vs(o,l)}}}else{const r=$t(s.visibleWrites,e);if(!i&&Ol(r))return t;if(!i&&t==null&&!kl(r,ne()))return null;{const o=function(c){return(c.visible||i)&&(!n||!~n.indexOf(c.writeId))&&(at(c.path,e)||at(e,c.path))},l=Gm(s.allWrites,o,e),u=t||z.EMPTY_NODE;return Vs(l,u)}}}function yw(s,e,t){let n=z.EMPTY_NODE;const i=Un(s.visibleWrites,e);if(i)return i.isLeafNode()||i.forEachChild(ge,(r,o)=>{n=n.updateImmediateChild(r,o)}),n;if(t){const r=$t(s.visibleWrites,e);return t.forEachChild(ge,(o,l)=>{const u=Vs($t(r,new ae(o)),l);n=n.updateImmediateChild(o,u)}),lf(r).forEach(o=>{n=n.updateImmediateChild(o.name,o.node)}),n}else{const r=$t(s.visibleWrites,e);return lf(r).forEach(o=>{n=n.updateImmediateChild(o.name,o.node)}),n}}function Ew(s,e,t,n,i){k(n||i,"Either existingEventSnap or existingServerSnap must exist");const r=we(e,t);if(kl(s.visibleWrites,r))return null;{const o=$t(s.visibleWrites,r);return Ol(o)?i.getChild(t):Vs(o,i.getChild(t))}}function Iw(s,e,t,n){const i=we(e,t),r=Un(s.visibleWrites,i);if(r!=null)return r;if(n.isCompleteForChild(t)){const o=$t(s.visibleWrites,i);return Vs(o,n.getNode().getImmediateChild(t))}else return null}function vw(s,e){return Un(s.visibleWrites,e)}function Tw(s,e,t,n,i,r,o){let l;const u=$t(s.visibleWrites,e),c=Un(u,ne());if(c!=null)l=c;else if(t!=null)l=Vs(u,t);else return[];if(l=l.withIndex(o),!l.isEmpty()&&!l.isLeafNode()){const f=[],_=o.getCompare(),m=r?l.getReverseIteratorFrom(n,o):l.getIteratorFrom(n,o);let I=m.getNext();for(;I&&f.length<i;)_(I,n)!==0&&f.push(I),I=m.getNext();return f}else return[]}function ww(){return{visibleWrites:ct.empty(),allWrites:[],lastWriteId:-1}}function Co(s,e,t,n){return zm(s.writeTree,s.treePath,e,t,n)}function Xu(s,e){return yw(s.writeTree,s.treePath,e)}function uf(s,e,t,n){return Ew(s.writeTree,s.treePath,e,t,n)}function So(s,e){return vw(s.writeTree,we(s.treePath,e))}function Aw(s,e,t,n,i,r){return Tw(s.writeTree,s.treePath,e,t,n,i,r)}function Ju(s,e,t){return Iw(s.writeTree,s.treePath,e,t)}function Km(s,e){return Wm(we(s.treePath,e),s.writeTree)}function Wm(s,e){return{treePath:s,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rw{constructor(){this.changeMap=new Map}trackChildChange(e){const t=e.type,n=e.childName;k(t==="child_added"||t==="child_changed"||t==="child_removed","Only child changes supported for tracking"),k(n!==".priority","Only non-priority child changes can be tracked.");const i=this.changeMap.get(n);if(i){const r=i.type;if(t==="child_added"&&r==="child_removed")this.changeMap.set(n,Ki(n,e.snapshotNode,i.snapshotNode));else if(t==="child_removed"&&r==="child_added")this.changeMap.delete(n);else if(t==="child_removed"&&r==="child_changed")this.changeMap.set(n,zi(n,i.oldSnap));else if(t==="child_changed"&&r==="child_added")this.changeMap.set(n,bs(n,e.snapshotNode));else if(t==="child_changed"&&r==="child_changed")this.changeMap.set(n,Ki(n,e.snapshotNode,i.oldSnap));else throw Hi("Illegal combination of changes: "+e+" occurred after "+i)}else this.changeMap.set(n,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cw{getCompleteChild(e){return null}getChildAfterChild(e,t,n){return null}}const $m=new Cw;class Zu{constructor(e,t,n=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=n}getCompleteChild(e){const t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{const n=this.optCompleteServerCache_!=null?new Mn(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return Ju(this.writes_,e,n)}}getChildAfterChild(e,t,n){const i=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:Fn(this.viewCache_),r=Aw(this.writes_,i,t,1,n,e);return r.length===0?null:r[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sw(s){return{filter:s}}function Pw(s,e){k(e.eventCache.getNode().isIndexed(s.filter.getIndex()),"Event snap not indexed"),k(e.serverCache.getNode().isIndexed(s.filter.getIndex()),"Server snap not indexed")}function bw(s,e,t,n,i){const r=new Rw;let o,l;if(t.type===lt.OVERWRITE){const c=t;c.source.fromUser?o=Ml(s,e,c.path,c.snap,n,i,r):(k(c.source.fromServer,"Unknown source."),l=c.source.tagged||e.serverCache.isFiltered()&&!H(c.path),o=Po(s,e,c.path,c.snap,n,i,l,r))}else if(t.type===lt.MERGE){const c=t;c.source.fromUser?o=xw(s,e,c.path,c.children,n,i,r):(k(c.source.fromServer,"Unknown source."),l=c.source.tagged||e.serverCache.isFiltered(),o=Fl(s,e,c.path,c.children,n,i,l,r))}else if(t.type===lt.ACK_USER_WRITE){const c=t;c.revert?o=kw(s,e,c.path,n,i,r):o=Nw(s,e,c.path,c.affectedTree,n,i,r)}else if(t.type===lt.LISTEN_COMPLETE)o=Dw(s,e,t.path,n,r);else throw Hi("Unknown operation type: "+t.type);const u=r.getChanges();return Vw(e,o,u),{viewCache:o,changes:u}}function Vw(s,e,t){const n=e.eventCache;if(n.isFullyInitialized()){const i=n.getNode().isLeafNode()||n.getNode().isEmpty(),r=Dl(s);(t.length>0||!s.eventCache.isFullyInitialized()||i&&!n.getNode().equals(r)||!n.getNode().getPriority().equals(r.getPriority()))&&t.push(Lm(Dl(e)))}}function Qm(s,e,t,n,i,r){const o=e.eventCache;if(So(n,t)!=null)return e;{let l,u;if(H(t))if(k(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const c=Fn(e),f=c instanceof z?c:z.EMPTY_NODE,_=Xu(n,f);l=s.filter.updateFullNode(e.eventCache.getNode(),_,r)}else{const c=Co(n,Fn(e));l=s.filter.updateFullNode(e.eventCache.getNode(),c,r)}else{const c=Q(t);if(c===".priority"){k(en(t)===1,"Can't have a priority with additional path components");const f=o.getNode();u=e.serverCache.getNode();const _=uf(n,t,f,u);_!=null?l=s.filter.updatePriority(f,_):l=o.getNode()}else{const f=ue(t);let _;if(o.isCompleteForChild(c)){u=e.serverCache.getNode();const m=uf(n,t,o.getNode(),u);m!=null?_=o.getNode().getImmediateChild(c).updateChild(f,m):_=o.getNode().getImmediateChild(c)}else _=Ju(n,c,e.serverCache);_!=null?l=s.filter.updateChild(o.getNode(),c,_,f,i,r):l=o.getNode()}}return Si(e,l,o.isFullyInitialized()||H(t),s.filter.filtersNodes())}}function Po(s,e,t,n,i,r,o,l){const u=e.serverCache;let c;const f=o?s.filter:s.filter.getIndexedFilter();if(H(t))c=f.updateFullNode(u.getNode(),n,null);else if(f.filtersNodes()&&!u.isFiltered()){const I=u.getNode().updateChild(t,n);c=f.updateFullNode(u.getNode(),I,null)}else{const I=Q(t);if(!u.isCompleteForPath(t)&&en(t)>1)return e;const S=ue(t),x=u.getNode().getImmediateChild(I).updateChild(S,n);I===".priority"?c=f.updatePriority(u.getNode(),x):c=f.updateChild(u.getNode(),I,x,S,$m,null)}const _=qm(e,c,u.isFullyInitialized()||H(t),f.filtersNodes()),m=new Zu(i,_,r);return Qm(s,_,t,i,m,l)}function Ml(s,e,t,n,i,r,o){const l=e.eventCache;let u,c;const f=new Zu(i,e,r);if(H(t))c=s.filter.updateFullNode(e.eventCache.getNode(),n,o),u=Si(e,c,!0,s.filter.filtersNodes());else{const _=Q(t);if(_===".priority")c=s.filter.updatePriority(e.eventCache.getNode(),n),u=Si(e,c,l.isFullyInitialized(),l.isFiltered());else{const m=ue(t),I=l.getNode().getImmediateChild(_);let S;if(H(m))S=n;else{const V=f.getCompleteChild(_);V!=null?bm(m)===".priority"&&V.getChild(xm(m)).isEmpty()?S=V:S=V.updateChild(m,n):S=z.EMPTY_NODE}if(I.equals(S))u=e;else{const V=s.filter.updateChild(l.getNode(),_,S,m,f,o);u=Si(e,V,l.isFullyInitialized(),s.filter.filtersNodes())}}}return u}function cf(s,e){return s.eventCache.isCompleteForChild(e)}function xw(s,e,t,n,i,r,o){let l=e;return n.foreach((u,c)=>{const f=we(t,u);cf(e,Q(f))&&(l=Ml(s,l,f,c,i,r,o))}),n.foreach((u,c)=>{const f=we(t,u);cf(e,Q(f))||(l=Ml(s,l,f,c,i,r,o))}),l}function hf(s,e,t){return t.foreach((n,i)=>{e=e.updateChild(n,i)}),e}function Fl(s,e,t,n,i,r,o,l){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let u=e,c;H(t)?c=n:c=new he(null).setTree(t,n);const f=e.serverCache.getNode();return c.children.inorderTraversal((_,m)=>{if(f.hasChild(_)){const I=e.serverCache.getNode().getImmediateChild(_),S=hf(s,I,m);u=Po(s,u,new ae(_),S,i,r,o,l)}}),c.children.inorderTraversal((_,m)=>{const I=!e.serverCache.isCompleteForChild(_)&&m.value===null;if(!f.hasChild(_)&&!I){const S=e.serverCache.getNode().getImmediateChild(_),V=hf(s,S,m);u=Po(s,u,new ae(_),V,i,r,o,l)}}),u}function Nw(s,e,t,n,i,r,o){if(So(i,t)!=null)return e;const l=e.serverCache.isFiltered(),u=e.serverCache;if(n.value!=null){if(H(t)&&u.isFullyInitialized()||u.isCompleteForPath(t))return Po(s,e,t,u.getNode().getChild(t),i,r,l,o);if(H(t)){let c=new he(null);return u.getNode().forEachChild(as,(f,_)=>{c=c.set(new ae(f),_)}),Fl(s,e,t,c,i,r,l,o)}else return e}else{let c=new he(null);return n.foreach((f,_)=>{const m=we(t,f);u.isCompleteForPath(m)&&(c=c.set(f,u.getNode().getChild(m)))}),Fl(s,e,t,c,i,r,l,o)}}function Dw(s,e,t,n,i){const r=e.serverCache,o=qm(e,r.getNode(),r.isFullyInitialized()||H(t),r.isFiltered());return Qm(s,o,t,n,$m,i)}function kw(s,e,t,n,i,r){let o;if(So(n,t)!=null)return e;{const l=new Zu(n,e,i),u=e.eventCache.getNode();let c;if(H(t)||Q(t)===".priority"){let f;if(e.serverCache.isFullyInitialized())f=Co(n,Fn(e));else{const _=e.serverCache.getNode();k(_ instanceof z,"serverChildren would be complete if leaf node"),f=Xu(n,_)}f=f,c=s.filter.updateFullNode(u,f,r)}else{const f=Q(t);let _=Ju(n,f,e.serverCache);_==null&&e.serverCache.isCompleteForChild(f)&&(_=u.getImmediateChild(f)),_!=null?c=s.filter.updateChild(u,f,_,ue(t),l,r):e.eventCache.getNode().hasChild(f)?c=s.filter.updateChild(u,f,z.EMPTY_NODE,ue(t),l,r):c=u,c.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=Co(n,Fn(e)),o.isLeafNode()&&(c=s.filter.updateFullNode(c,o,r)))}return o=e.serverCache.isFullyInitialized()||So(n,ne())!=null,Si(e,c,o,s.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ow{constructor(e,t){this.query_=e,this.eventRegistrations_=[];const n=this.query_._queryParams,i=new Wu(n.getIndex()),r=ew(n);this.processor_=Sw(r);const o=t.serverCache,l=t.eventCache,u=i.updateFullNode(z.EMPTY_NODE,o.getNode(),null),c=r.updateFullNode(z.EMPTY_NODE,l.getNode(),null),f=new Mn(u,o.isFullyInitialized(),i.filtersNodes()),_=new Mn(c,l.isFullyInitialized(),r.filtersNodes());this.viewCache_=ua(_,f),this.eventGenerator_=new aw(this.query_)}get query(){return this.query_}}function Mw(s){return s.viewCache_.serverCache.getNode()}function Fw(s,e){const t=Fn(s.viewCache_);return t&&(s.query._queryParams.loadsAllData()||!H(e)&&!t.getImmediateChild(Q(e)).isEmpty())?t.getChild(e):null}function df(s){return s.eventRegistrations_.length===0}function Lw(s,e){s.eventRegistrations_.push(e)}function ff(s,e,t){const n=[];if(t){k(e==null,"A cancel should cancel all event registrations.");const i=s.query._path;s.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(t,i);o&&n.push(o)})}if(e){let i=[];for(let r=0;r<s.eventRegistrations_.length;++r){const o=s.eventRegistrations_[r];if(!o.matches(e))i.push(o);else if(e.hasAnyCallback()){i=i.concat(s.eventRegistrations_.slice(r+1));break}}s.eventRegistrations_=i}else s.eventRegistrations_=[];return n}function _f(s,e,t,n){e.type===lt.MERGE&&e.source.queryId!==null&&(k(Fn(s.viewCache_),"We should always have a full cache before handling merges"),k(Dl(s.viewCache_),"Missing event cache, even though we have a server cache"));const i=s.viewCache_,r=bw(s.processor_,i,e,t,n);return Pw(s.processor_,r.viewCache),k(r.viewCache.serverCache.isFullyInitialized()||!i.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),s.viewCache_=r.viewCache,Hm(s,r.changes,r.viewCache.eventCache.getNode(),null)}function Uw(s,e){const t=s.viewCache_.eventCache,n=[];return t.getNode().isLeafNode()||t.getNode().forEachChild(ge,(r,o)=>{n.push(bs(r,o))}),t.isFullyInitialized()&&n.push(Lm(t.getNode())),Hm(s,n,t.getNode(),e)}function Hm(s,e,t,n){const i=n?[n]:s.eventRegistrations_;return lw(s.eventGenerator_,e,t,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let bo;class Bw{constructor(){this.views=new Map}}function qw(s){k(!bo,"__referenceConstructor has already been defined"),bo=s}function jw(){return k(bo,"Reference.ts has not been loaded"),bo}function Gw(s){return s.views.size===0}function ec(s,e,t,n){const i=e.source.queryId;if(i!==null){const r=s.views.get(i);return k(r!=null,"SyncTree gave us an op for an invalid query."),_f(r,e,t,n)}else{let r=[];for(const o of s.views.values())r=r.concat(_f(o,e,t,n));return r}}function zw(s,e,t,n,i){const r=e._queryIdentifier,o=s.views.get(r);if(!o){let l=Co(t,i?n:null),u=!1;l?u=!0:n instanceof z?(l=Xu(t,n),u=!1):(l=z.EMPTY_NODE,u=!1);const c=ua(new Mn(l,u,!1),new Mn(n,i,!1));return new Ow(e,c)}return o}function Kw(s,e,t,n,i,r){const o=zw(s,e,n,i,r);return s.views.has(e._queryIdentifier)||s.views.set(e._queryIdentifier,o),Lw(o,t),Uw(o,t)}function Ww(s,e,t,n){const i=e._queryIdentifier,r=[];let o=[];const l=tn(s);if(i==="default")for(const[u,c]of s.views.entries())o=o.concat(ff(c,t,n)),df(c)&&(s.views.delete(u),c.query._queryParams.loadsAllData()||r.push(c.query));else{const u=s.views.get(i);u&&(o=o.concat(ff(u,t,n)),df(u)&&(s.views.delete(i),u.query._queryParams.loadsAllData()||r.push(u.query)))}return l&&!tn(s)&&r.push(new(jw())(e._repo,e._path)),{removed:r,events:o}}function Ym(s){const e=[];for(const t of s.views.values())t.query._queryParams.loadsAllData()||e.push(t);return e}function ls(s,e){let t=null;for(const n of s.views.values())t=t||Fw(n,e);return t}function Xm(s,e){if(e._queryParams.loadsAllData())return ca(s);{const n=e._queryIdentifier;return s.views.get(n)}}function Jm(s,e){return Xm(s,e)!=null}function tn(s){return ca(s)!=null}function ca(s){for(const e of s.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Vo;function $w(s){k(!Vo,"__referenceConstructor has already been defined"),Vo=s}function Qw(){return k(Vo,"Reference.ts has not been loaded"),Vo}let Hw=1;class pf{constructor(e){this.listenProvider_=e,this.syncPointTree_=new he(null),this.pendingWriteTree_=ww(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Yw(s,e,t,n,i){return dw(s.pendingWriteTree_,e,t,n,i),i?lr(s,new On(Bm(),e,t)):[]}function is(s,e,t=!1){const n=fw(s.pendingWriteTree_,e);if(_w(s.pendingWriteTree_,e)){let r=new he(null);return n.snap!=null?r=r.set(ne(),!0):Ye(n.children,o=>{r=r.set(new ae(o),!0)}),lr(s,new Ro(n.path,r,t))}else return[]}function ha(s,e,t){return lr(s,new On(Qu(),e,t))}function Xw(s,e,t){const n=he.fromObject(t);return lr(s,new Qi(Qu(),e,n))}function Jw(s,e){return lr(s,new $i(Qu(),e))}function Zw(s,e,t){const n=tc(s,t);if(n){const i=nc(n),r=i.path,o=i.queryId,l=$e(r,e),u=new $i(Hu(o),l);return sc(s,r,u)}else return[]}function Ll(s,e,t,n,i=!1){const r=e._path,o=s.syncPointTree_.get(r);let l=[];if(o&&(e._queryIdentifier==="default"||Jm(o,e))){const u=Ww(o,e,t,n);Gw(o)&&(s.syncPointTree_=s.syncPointTree_.remove(r));const c=u.removed;if(l=u.events,!i){const f=c.findIndex(m=>m._queryParams.loadsAllData())!==-1,_=s.syncPointTree_.findOnPath(r,(m,I)=>tn(I));if(f&&!_){const m=s.syncPointTree_.subtree(r);if(!m.isEmpty()){const I=nA(m);for(let S=0;S<I.length;++S){const V=I[S],x=V.query,K=ng(s,V);s.listenProvider_.startListening(bi(x),xo(s,x),K.hashFn,K.onComplete)}}}!_&&c.length>0&&!n&&(f?s.listenProvider_.stopListening(bi(e),null):c.forEach(m=>{const I=s.queryToTagMap.get(da(m));s.listenProvider_.stopListening(bi(m),I)}))}sA(s,c)}return l}function eA(s,e,t,n){const i=tc(s,n);if(i!=null){const r=nc(i),o=r.path,l=r.queryId,u=$e(o,e),c=new On(Hu(l),u,t);return sc(s,o,c)}else return[]}function tA(s,e,t,n){const i=tc(s,n);if(i){const r=nc(i),o=r.path,l=r.queryId,u=$e(o,e),c=he.fromObject(t),f=new Qi(Hu(l),u,c);return sc(s,o,f)}else return[]}function mf(s,e,t,n=!1){const i=e._path;let r=null,o=!1;s.syncPointTree_.foreachOnPath(i,(m,I)=>{const S=$e(m,i);r=r||ls(I,S),o=o||tn(I)});let l=s.syncPointTree_.get(i);l?(o=o||tn(l),r=r||ls(l,ne())):(l=new Bw,s.syncPointTree_=s.syncPointTree_.set(i,l));let u;r!=null?u=!0:(u=!1,r=z.EMPTY_NODE,s.syncPointTree_.subtree(i).foreachChild((I,S)=>{const V=ls(S,ne());V&&(r=r.updateImmediateChild(I,V))}));const c=Jm(l,e);if(!c&&!e._queryParams.loadsAllData()){const m=da(e);k(!s.queryToTagMap.has(m),"View does not exist, but we have a tag");const I=iA();s.queryToTagMap.set(m,I),s.tagToQueryMap.set(I,m)}const f=Yu(s.pendingWriteTree_,i);let _=Kw(l,e,t,f,r,u);if(!c&&!o&&!n){const m=Xm(l,e);_=_.concat(rA(s,e,m))}return _}function Zm(s,e,t){const i=s.pendingWriteTree_,r=s.syncPointTree_.findOnPath(e,(o,l)=>{const u=$e(o,e),c=ls(l,u);if(c)return c});return zm(i,e,r,t,!0)}function lr(s,e){return eg(e,s.syncPointTree_,null,Yu(s.pendingWriteTree_,ne()))}function eg(s,e,t,n){if(H(s.path))return tg(s,e,t,n);{const i=e.get(ne());t==null&&i!=null&&(t=ls(i,ne()));let r=[];const o=Q(s.path),l=s.operationForChild(o),u=e.children.get(o);if(u&&l){const c=t?t.getImmediateChild(o):null,f=Km(n,o);r=r.concat(eg(l,u,c,f))}return i&&(r=r.concat(ec(i,s,n,t))),r}}function tg(s,e,t,n){const i=e.get(ne());t==null&&i!=null&&(t=ls(i,ne()));let r=[];return e.children.inorderTraversal((o,l)=>{const u=t?t.getImmediateChild(o):null,c=Km(n,o),f=s.operationForChild(o);f&&(r=r.concat(tg(f,l,u,c)))}),i&&(r=r.concat(ec(i,s,n,t))),r}function ng(s,e){const t=e.query,n=xo(s,t);return{hashFn:()=>(Mw(e)||z.EMPTY_NODE).hash(),onComplete:i=>{if(i==="ok")return n?Zw(s,t._path,n):Jw(s,t._path);{const r=Zv(i,t);return Ll(s,t,null,r)}}}}function xo(s,e){const t=da(e);return s.queryToTagMap.get(t)}function da(s){return s._path.toString()+"$"+s._queryIdentifier}function tc(s,e){return s.tagToQueryMap.get(e)}function nc(s){const e=s.indexOf("$");return k(e!==-1&&e<s.length-1,"Bad queryKey."),{queryId:s.substr(e+1),path:new ae(s.substr(0,e))}}function sc(s,e,t){const n=s.syncPointTree_.get(e);k(n,"Missing sync point for query tag that we're tracking");const i=Yu(s.pendingWriteTree_,e);return ec(n,t,i,null)}function nA(s){return s.fold((e,t,n)=>{if(t&&tn(t))return[ca(t)];{let i=[];return t&&(i=Ym(t)),Ye(n,(r,o)=>{i=i.concat(o)}),i}})}function bi(s){return s._queryParams.loadsAllData()&&!s._queryParams.isDefault()?new(Qw())(s._repo,s._path):s}function sA(s,e){for(let t=0;t<e.length;++t){const n=e[t];if(!n._queryParams.loadsAllData()){const i=da(n),r=s.queryToTagMap.get(i);s.queryToTagMap.delete(i),s.tagToQueryMap.delete(r)}}}function iA(){return Hw++}function rA(s,e,t){const n=e._path,i=xo(s,e),r=ng(s,t),o=s.listenProvider_.startListening(bi(e),i,r.hashFn,r.onComplete),l=s.syncPointTree_.subtree(n);if(i)k(!tn(l.value),"If we're adding a query, it shouldn't be shadowed");else{const u=l.fold((c,f,_)=>{if(!H(c)&&f&&tn(f))return[ca(f).query];{let m=[];return f&&(m=m.concat(Ym(f).map(I=>I.query))),Ye(_,(I,S)=>{m=m.concat(S)}),m}});for(let c=0;c<u.length;++c){const f=u[c];s.listenProvider_.stopListening(bi(f),xo(s,f))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ic{constructor(e){this.node_=e}getImmediateChild(e){const t=this.node_.getImmediateChild(e);return new ic(t)}node(){return this.node_}}class rc{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){const t=we(this.path_,e);return new rc(this.syncTree_,t)}node(){return Zm(this.syncTree_,this.path_)}}const oA=function(s){return s=s||{},s.timestamp=s.timestamp||new Date().getTime(),s},gf=function(s,e,t){if(!s||typeof s!="object")return s;if(k(".sv"in s,"Unexpected leaf node or priority contents"),typeof s[".sv"]=="string")return aA(s[".sv"],e,t);if(typeof s[".sv"]=="object")return lA(s[".sv"],e);k(!1,"Unexpected server value: "+JSON.stringify(s,null,2))},aA=function(s,e,t){switch(s){case"timestamp":return t.timestamp;default:k(!1,"Unexpected server value: "+s)}},lA=function(s,e,t){s.hasOwnProperty("increment")||k(!1,"Unexpected server value: "+JSON.stringify(s,null,2));const n=s.increment;typeof n!="number"&&k(!1,"Unexpected increment value: "+n);const i=e.node();if(k(i!==null&&typeof i<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!i.isLeafNode())return n;const o=i.getValue();return typeof o!="number"?n:o+n},uA=function(s,e,t,n){return oc(e,new rc(t,s),n)},cA=function(s,e,t){return oc(s,new ic(e),t)};function oc(s,e,t){const n=s.getPriority().val(),i=gf(n,e.getImmediateChild(".priority"),t);let r;if(s.isLeafNode()){const o=s,l=gf(o.getValue(),e,t);return l!==o.getValue()||i!==o.getPriority().val()?new Re(l,Le(i)):s}else{const o=s;return r=o,i!==o.getPriority().val()&&(r=r.updatePriority(new Re(i))),o.forEachChild(ge,(l,u)=>{const c=oc(u,e.getImmediateChild(l),t);c!==u&&(r=r.updateImmediateChild(l,c))}),r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ac{constructor(e="",t=null,n={children:{},childCount:0}){this.name=e,this.parent=t,this.node=n}}function lc(s,e){let t=e instanceof ae?e:new ae(e),n=s,i=Q(t);for(;i!==null;){const r=us(n.node.children,i)||{children:{},childCount:0};n=new ac(i,n,r),t=ue(t),i=Q(t)}return n}function Ls(s){return s.node.value}function sg(s,e){s.node.value=e,Ul(s)}function ig(s){return s.node.childCount>0}function hA(s){return Ls(s)===void 0&&!ig(s)}function fa(s,e){Ye(s.node.children,(t,n)=>{e(new ac(t,s,n))})}function rg(s,e,t,n){t&&e(s),fa(s,i=>{rg(i,e,!0)})}function dA(s,e,t){let n=s.parent;for(;n!==null;){if(e(n))return!0;n=n.parent}return!1}function ur(s){return new ae(s.parent===null?s.name:ur(s.parent)+"/"+s.name)}function Ul(s){s.parent!==null&&fA(s.parent,s.name,s)}function fA(s,e,t){const n=hA(t),i=Vt(s.node.children,e);n&&i?(delete s.node.children[e],s.node.childCount--,Ul(s)):!n&&!i&&(s.node.children[e]=t.node,s.node.childCount++,Ul(s))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _A=/[\[\].#$\/\u0000-\u001F\u007F]/,pA=/[\[\].#$\u0000-\u001F\u007F]/,Ja=10*1024*1024,og=function(s){return typeof s=="string"&&s.length!==0&&!_A.test(s)},ag=function(s){return typeof s=="string"&&s.length!==0&&!pA.test(s)},mA=function(s){return s&&(s=s.replace(/^\/*\.info(\/|$)/,"/")),ag(s)},lg=function(s,e,t){const n=t instanceof ae?new NT(t,s):t;if(e===void 0)throw new Error(s+"contains undefined "+pn(n));if(typeof e=="function")throw new Error(s+"contains a function "+pn(n)+" with contents = "+e.toString());if(lm(e))throw new Error(s+"contains "+e.toString()+" "+pn(n));if(typeof e=="string"&&e.length>Ja/3&&ko(e)>Ja)throw new Error(s+"contains a string greater than "+Ja+" utf8 bytes "+pn(n)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let i=!1,r=!1;if(Ye(e,(o,l)=>{if(o===".value")i=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!og(o)))throw new Error(s+" contains an invalid key ("+o+") "+pn(n)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);DT(n,o),lg(s,l,n),kT(n)}),i&&r)throw new Error(s+' contains ".value" child '+pn(n)+" in addition to actual children.")}},ug=function(s,e,t,n){if(!ag(t))throw new Error(xf(s,e)+'was an invalid path = "'+t+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},gA=function(s,e,t,n){t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),ug(s,e,t)},yA=function(s,e){const t=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!og(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||t.length!==0&&!mA(t))throw new Error(xf(s,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class EA{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function cg(s,e){let t=null;for(let n=0;n<e.length;n++){const i=e[n],r=i.getPath();t!==null&&!Gu(r,t.path)&&(s.eventLists_.push(t),t=null),t===null&&(t={events:[],path:r}),t.events.push(i)}t&&s.eventLists_.push(t)}function hg(s,e,t){cg(s,t),dg(s,n=>Gu(n,e))}function Bn(s,e,t){cg(s,t),dg(s,n=>at(n,e)||at(e,n))}function dg(s,e){s.recursionDepth_++;let t=!0;for(let n=0;n<s.eventLists_.length;n++){const i=s.eventLists_[n];if(i){const r=i.path;e(r)?(IA(s.eventLists_[n]),s.eventLists_[n]=null):t=!1}}t&&(s.eventLists_=[]),s.recursionDepth_--}function IA(s){for(let e=0;e<s.events.length;e++){const t=s.events[e];if(t!==null){s.events[e]=null;const n=t.getEventRunner();Ri&&Fe("event: "+t.toString()),or(n)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vA="repo_interrupt",TA=25;class wA{constructor(e,t,n,i){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=n,this.appCheckProvider_=i,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new EA,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=Ao(),this.transactionQueueTree_=new ac,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function AA(s,e,t){if(s.stats_=qu(s.repoInfo_),s.forceRestClient_||sT())s.server_=new wo(s.repoInfo_,(n,i,r,o)=>{yf(s,n,i,r,o)},s.authTokenProvider_,s.appCheckProvider_),setTimeout(()=>Ef(s,!0),0);else{if(typeof t<"u"&&t!==null){if(typeof t!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{Pe(t)}catch(n){throw new Error("Invalid authOverride provided: "+n)}}s.persistentConnection_=new Ct(s.repoInfo_,e,(n,i,r,o)=>{yf(s,n,i,r,o)},n=>{Ef(s,n)},n=>{CA(s,n)},s.authTokenProvider_,s.appCheckProvider_,t),s.server_=s.persistentConnection_}s.authTokenProvider_.addTokenChangeListener(n=>{s.server_.refreshAuthToken(n)}),s.appCheckProvider_.addTokenChangeListener(n=>{s.server_.refreshAppCheckToken(n.token)}),s.statsReporter_=lT(s.repoInfo_,()=>new ow(s.stats_,s.server_)),s.infoData_=new tw,s.infoSyncTree_=new pf({startListening:(n,i,r,o)=>{let l=[];const u=s.infoData_.getNode(n._path);return u.isEmpty()||(l=ha(s.infoSyncTree_,n._path,u),setTimeout(()=>{o("ok")},0)),l},stopListening:()=>{}}),uc(s,"connected",!1),s.serverSyncTree_=new pf({startListening:(n,i,r,o)=>(s.server_.listen(n,r,i,(l,u)=>{const c=o(l,u);Bn(s.eventQueue_,n._path,c)}),[]),stopListening:(n,i)=>{s.server_.unlisten(n,i)}})}function RA(s){const t=s.infoData_.getNode(new ae(".info/serverTimeOffset")).val()||0;return new Date().getTime()+t}function fg(s){return oA({timestamp:RA(s)})}function yf(s,e,t,n,i){s.dataUpdateCount++;const r=new ae(e);t=s.interceptServerDataCallback_?s.interceptServerDataCallback_(e,t):t;let o=[];if(i)if(n){const u=Zr(t,c=>Le(c));o=tA(s.serverSyncTree_,r,u,i)}else{const u=Le(t);o=eA(s.serverSyncTree_,r,u,i)}else if(n){const u=Zr(t,c=>Le(c));o=Xw(s.serverSyncTree_,r,u)}else{const u=Le(t);o=ha(s.serverSyncTree_,r,u)}let l=r;o.length>0&&(l=hc(s,r)),Bn(s.eventQueue_,l,o)}function Ef(s,e){uc(s,"connected",e),e===!1&&PA(s)}function CA(s,e){Ye(e,(t,n)=>{uc(s,t,n)})}function uc(s,e,t){const n=new ae("/.info/"+e),i=Le(t);s.infoData_.updateSnapshot(n,i);const r=ha(s.infoSyncTree_,n,i);Bn(s.eventQueue_,n,r)}function SA(s){return s.nextWriteId_++}function PA(s){_g(s,"onDisconnectEvents");const e=fg(s),t=Ao();Nl(s.onDisconnect_,ne(),(i,r)=>{const o=uA(i,r,s.serverSyncTree_,e);Um(t,i,o)});let n=[];Nl(t,ne(),(i,r)=>{n=n.concat(ha(s.serverSyncTree_,i,r));const o=kA(s,i);hc(s,o)}),s.onDisconnect_=Ao(),Bn(s.eventQueue_,ne(),n)}function bA(s,e,t){let n;Q(e._path)===".info"?n=mf(s.infoSyncTree_,e,t):n=mf(s.serverSyncTree_,e,t),hg(s.eventQueue_,e._path,n)}function VA(s,e,t){let n;Q(e._path)===".info"?n=Ll(s.infoSyncTree_,e,t):n=Ll(s.serverSyncTree_,e,t),hg(s.eventQueue_,e._path,n)}function xA(s){s.persistentConnection_&&s.persistentConnection_.interrupt(vA)}function _g(s,...e){let t="";s.persistentConnection_&&(t=s.persistentConnection_.id+":"),Fe(t,...e)}function pg(s,e,t){return Zm(s.serverSyncTree_,e,t)||z.EMPTY_NODE}function cc(s,e=s.transactionQueueTree_){if(e||_a(s,e),Ls(e)){const t=gg(s,e);k(t.length>0,"Sending zero length transaction queue"),t.every(i=>i.status===0)&&NA(s,ur(e),t)}else ig(e)&&fa(e,t=>{cc(s,t)})}function NA(s,e,t){const n=t.map(c=>c.currentWriteId),i=pg(s,e,n);let r=i;const o=i.hash();for(let c=0;c<t.length;c++){const f=t[c];k(f.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),f.status=1,f.retryCount++;const _=$e(e,f.path);r=r.updateChild(_,f.currentOutputSnapshotRaw)}const l=r.val(!0),u=e;s.server_.put(u.toString(),l,c=>{_g(s,"transaction put response",{path:u.toString(),status:c});let f=[];if(c==="ok"){const _=[];for(let m=0;m<t.length;m++)t[m].status=2,f=f.concat(is(s.serverSyncTree_,t[m].currentWriteId)),t[m].onComplete&&_.push(()=>t[m].onComplete(null,!0,t[m].currentOutputSnapshotResolved)),t[m].unwatcher();_a(s,lc(s.transactionQueueTree_,e)),cc(s,s.transactionQueueTree_),Bn(s.eventQueue_,e,f);for(let m=0;m<_.length;m++)or(_[m])}else{if(c==="datastale")for(let _=0;_<t.length;_++)t[_].status===3?t[_].status=4:t[_].status=0;else{tt("transaction at "+u.toString()+" failed: "+c);for(let _=0;_<t.length;_++)t[_].status=4,t[_].abortReason=c}hc(s,e)}},o)}function hc(s,e){const t=mg(s,e),n=ur(t),i=gg(s,t);return DA(s,i,n),n}function DA(s,e,t){if(e.length===0)return;const n=[];let i=[];const o=e.filter(l=>l.status===0).map(l=>l.currentWriteId);for(let l=0;l<e.length;l++){const u=e[l],c=$e(t,u.path);let f=!1,_;if(k(c!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),u.status===4)f=!0,_=u.abortReason,i=i.concat(is(s.serverSyncTree_,u.currentWriteId,!0));else if(u.status===0)if(u.retryCount>=TA)f=!0,_="maxretry",i=i.concat(is(s.serverSyncTree_,u.currentWriteId,!0));else{const m=pg(s,u.path,o);u.currentInputSnapshot=m;const I=e[l].update(m.val());if(I!==void 0){lg("transaction failed: Data returned ",I,u.path);let S=Le(I);typeof I=="object"&&I!=null&&Vt(I,".priority")||(S=S.updatePriority(m.getPriority()));const x=u.currentWriteId,K=fg(s),j=cA(S,m,K);u.currentOutputSnapshotRaw=S,u.currentOutputSnapshotResolved=j,u.currentWriteId=SA(s),o.splice(o.indexOf(x),1),i=i.concat(Yw(s.serverSyncTree_,u.path,j,u.currentWriteId,u.applyLocally)),i=i.concat(is(s.serverSyncTree_,x,!0))}else f=!0,_="nodata",i=i.concat(is(s.serverSyncTree_,u.currentWriteId,!0))}Bn(s.eventQueue_,t,i),i=[],f&&(e[l].status=2,function(m){setTimeout(m,Math.floor(0))}(e[l].unwatcher),e[l].onComplete&&(_==="nodata"?n.push(()=>e[l].onComplete(null,!1,e[l].currentInputSnapshot)):n.push(()=>e[l].onComplete(new Error(_),!1,null))))}_a(s,s.transactionQueueTree_);for(let l=0;l<n.length;l++)or(n[l]);cc(s,s.transactionQueueTree_)}function mg(s,e){let t,n=s.transactionQueueTree_;for(t=Q(e);t!==null&&Ls(n)===void 0;)n=lc(n,t),e=ue(e),t=Q(e);return n}function gg(s,e){const t=[];return yg(s,e,t),t.sort((n,i)=>n.order-i.order),t}function yg(s,e,t){const n=Ls(e);if(n)for(let i=0;i<n.length;i++)t.push(n[i]);fa(e,i=>{yg(s,i,t)})}function _a(s,e){const t=Ls(e);if(t){let n=0;for(let i=0;i<t.length;i++)t[i].status!==2&&(t[n]=t[i],n++);t.length=n,sg(e,t.length>0?t:void 0)}fa(e,n=>{_a(s,n)})}function kA(s,e){const t=ur(mg(s,e)),n=lc(s.transactionQueueTree_,e);return dA(n,i=>{Za(s,i)}),Za(s,n),rg(n,i=>{Za(s,i)}),t}function Za(s,e){const t=Ls(e);if(t){const n=[];let i=[],r=-1;for(let o=0;o<t.length;o++)t[o].status===3||(t[o].status===1?(k(r===o-1,"All SENT items should be at beginning of queue."),r=o,t[o].status=3,t[o].abortReason="set"):(k(t[o].status===0,"Unexpected transaction status in abort"),t[o].unwatcher(),i=i.concat(is(s.serverSyncTree_,t[o].currentWriteId,!0)),t[o].onComplete&&n.push(t[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?sg(e,void 0):t.length=r+1,Bn(s.eventQueue_,ur(e),i);for(let o=0;o<n.length;o++)or(n[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function OA(s){let e="";const t=s.split("/");for(let n=0;n<t.length;n++)if(t[n].length>0){let i=t[n];try{i=decodeURIComponent(i.replace(/\+/g," "))}catch{}e+="/"+i}return e}function MA(s){const e={};s.charAt(0)==="?"&&(s=s.substring(1));for(const t of s.split("&")){if(t.length===0)continue;const n=t.split("=");n.length===2?e[decodeURIComponent(n[0])]=decodeURIComponent(n[1]):tt(`Invalid query segment '${t}' in query '${s}'`)}return e}const If=function(s,e){const t=FA(s),n=t.namespace;t.domain==="firebase.com"&&bt(t.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!n||n==="undefined")&&t.domain!=="localhost"&&bt("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),t.secure||Qv();const i=t.scheme==="ws"||t.scheme==="wss";return{repoInfo:new Im(t.host,t.secure,n,i,e,"",n!==t.subdomain),path:new ae(t.pathString)}},FA=function(s){let e="",t="",n="",i="",r="",o=!0,l="https",u=443;if(typeof s=="string"){let c=s.indexOf("//");c>=0&&(l=s.substring(0,c-1),s=s.substring(c+2));let f=s.indexOf("/");f===-1&&(f=s.length);let _=s.indexOf("?");_===-1&&(_=s.length),e=s.substring(0,Math.min(f,_)),f<_&&(i=OA(s.substring(f,_)));const m=MA(s.substring(Math.min(s.length,_)));c=e.indexOf(":"),c>=0?(o=l==="https"||l==="wss",u=parseInt(e.substring(c+1),10)):c=e.length;const I=e.slice(0,c);if(I.toLowerCase()==="localhost")t="localhost";else if(I.split(".").length<=2)t=I;else{const S=e.indexOf(".");n=e.substring(0,S).toLowerCase(),t=e.substring(S+1),r=n}"ns"in m&&(r=m.ns)}return{host:e,port:u,domain:t,subdomain:n,secure:o,scheme:l,pathString:i,namespace:r}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class LA{constructor(e,t,n,i){this.eventType=e,this.eventRegistration=t,this.snapshot=n,this.prevName=i}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+Pe(this.snapshot.exportVal())}}class UA{constructor(e,t,n){this.eventRegistration=e,this.error=t,this.path=n}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BA{constructor(e,t){this.snapshotCallback=e,this.cancelCallback=t}onValue(e,t){this.snapshotCallback.call(null,e,t)}onCancel(e){return k(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dc{constructor(e,t,n,i){this._repo=e,this._path=t,this._queryParams=n,this._orderByCalled=i}get key(){return H(this._path)?null:bm(this._path)}get ref(){return new an(this._repo,this._path)}get _queryIdentifier(){const e=sf(this._queryParams),t=Uu(e);return t==="{}"?"default":t}get _queryObject(){return sf(this._queryParams)}isEqual(e){if(e=He(e),!(e instanceof dc))return!1;const t=this._repo===e._repo,n=Gu(this._path,e._path),i=this._queryIdentifier===e._queryIdentifier;return t&&n&&i}toJSON(){return this.toString()}toString(){return this._repo.toString()+xT(this._path)}}class an extends dc{constructor(e,t){super(e,t,new $u,!1)}get parent(){const e=xm(this._path);return e===null?null:new an(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class No{constructor(e,t,n){this._node=e,this.ref=t,this._index=n}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const t=new ae(e),n=Bl(this.ref,e);return new No(this._node.getChild(t),n,ge)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(n,i)=>e(new No(i,Bl(this.ref,n),ge)))}hasChild(e){const t=new ae(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function pR(s,e){return s=He(s),s._checkNotDeleted("ref"),e!==void 0?Bl(s._root,e):s._root}function Bl(s,e){return s=He(s),Q(s._path)===null?gA("child","path",e):ug("child","path",e),new an(s._repo,we(s._path,e))}class fc{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,t){const n=t._queryParams.getIndex();return new LA("value",this,new No(e.snapshotNode,new an(t._repo,t._path),n))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new UA(this,e,t):null}matches(e){return e instanceof fc?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}function qA(s,e,t,n,i){const r=new BA(t,void 0),o=new fc(r);return bA(s._repo,s,o),()=>VA(s._repo,s,o)}function mR(s,e,t,n){return qA(s,"value",e)}qw(an);$w(an);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jA="FIREBASE_DATABASE_EMULATOR_HOST",ql={};let GA=!1;function zA(s,e,t,n){const i=e.lastIndexOf(":"),r=e.substring(0,i),o=Do(r);s.repoInfo_=new Im(e,o,s.repoInfo_.namespace,s.repoInfo_.webSocketOnly,s.repoInfo_.nodeAdmin,s.repoInfo_.persistenceKey,s.repoInfo_.includeNamespaceInQueryParams,!0,t),n&&(s.authTokenProvider_=n)}function KA(s,e,t,n,i){let r=n||s.options.databaseURL;r===void 0&&(s.options.projectId||bt("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),Fe("Using default host for project ",s.options.projectId),r=`${s.options.projectId}-default-rtdb.firebaseio.com`);let o=If(r,i),l=o.repoInfo,u;typeof process<"u"&&Ud&&(u=Ud[jA]),u?(r=`http://${u}?ns=${l.namespace}`,o=If(r,i),l=o.repoInfo):o.repoInfo.secure;const c=new rT(s.name,s.options,e);yA("Invalid Firebase Database URL",o),H(o.path)||bt("Database URL must point to the root of a Firebase Database (not including a child path).");const f=$A(l,s,c,new iT(s,t));return new QA(f,s)}function WA(s,e){const t=ql[e];(!t||t[s.key]!==s)&&bt(`Database ${e}(${s.repoInfo_}) has already been deleted.`),xA(s),delete t[s.key]}function $A(s,e,t,n){let i=ql[e.name];i||(i={},ql[e.name]=i);let r=i[s.toURLString()];return r&&bt("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new wA(s,GA,t,n),i[s.toURLString()]=r,r}class QA{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(AA(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new an(this._repo,ne())),this._rootInternal}_delete(){return this._rootInternal!==null&&(WA(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&bt("Cannot call "+e+" on a deleted database.")}}function gR(s=_y(),e){const t=Rf(s,"database").getImmediate({identifier:e});if(!t._instanceStarted){const n=fy("database");n&&HA(t,...n)}return t}function HA(s,e,t,n={}){s=He(s),s._checkNotDeleted("useEmulator");const i=`${e}:${t}`,r=s._repoInternal;if(s._instanceStarted){if(i===s._repoInternal.repoInfo_.host&&Cf(n,r.repoInfo_.emulatorOptions))return;bt("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(r.repoInfo_.nodeAdmin)n.mockUserToken&&bt('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new Yr(Yr.OWNER);else if(n.mockUserToken){const l=typeof n.mockUserToken=="string"?n.mockUserToken:py(n.mockUserToken,s.app.options.projectId);o=new Yr(l)}Do(e)&&(Sf(e),my("Database",!0)),zA(r,i,n,o)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function YA(s){jv(Vf),Tf(new wf("database",(e,{instanceIdentifier:t})=>{const n=e.getProvider("app").getImmediate(),i=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return KA(n,i,r,t)},"PUBLIC").setMultipleInstances(!0)),Xr(Bd,qd,s),Xr(Bd,qd,"esm2017")}Ct.prototype.simpleListen=function(s,e){this.sendRequest("q",{p:s},e)};Ct.prototype.echo=function(s,e){this.sendRequest("echo",{d:s},e)};YA();export{fR as a,cR as b,eR as c,Rv as d,uR as e,iR as f,gR as g,hR as h,tR as i,_R as j,oR as k,rR as l,mR as o,dR as p,nR as q,pR as r,aR as s,lR as u,sR as w};
