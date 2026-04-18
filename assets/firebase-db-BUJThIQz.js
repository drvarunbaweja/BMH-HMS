import{L as pf,_ as mf,C as gf,r as Xr,a as yf,F as Kg,b as dt,c as Ef,d as If,i as No,p as vf,e as Tf,g as Jr,f as Wg,h as $g,j as wf,k as tt,S as Af,l as k,s as Pe,m as Ml,n as bt,o as ls,q as Zr,t as Qg,u as Hg,v as Yg,w as $i,x as Rf,D as Sf,y as Xg,z as Jg,A as Zg,B as uh,E as Cf,G as ey,H as ty,I as Do,J as ny,K as sy,M as iy,N as ry,O as oy,P as ay}from"./firebase-core-CsWAQJdo.js";var ch=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var qt,Pf;(function(){var s;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(I,g){function E(){}E.prototype=g.prototype,I.D=g.prototype,I.prototype=new E,I.prototype.constructor=I,I.C=function(v,w,S){for(var y=Array(arguments.length-2),yt=2;yt<arguments.length;yt++)y[yt-2]=arguments[yt];return g.prototype[w].apply(v,y)}}function t(){this.blockSize=-1}function n(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(n,t),n.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(I,g,E){E||(E=0);var v=Array(16);if(typeof g=="string")for(var w=0;16>w;++w)v[w]=g.charCodeAt(E++)|g.charCodeAt(E++)<<8|g.charCodeAt(E++)<<16|g.charCodeAt(E++)<<24;else for(w=0;16>w;++w)v[w]=g[E++]|g[E++]<<8|g[E++]<<16|g[E++]<<24;g=I.g[0],E=I.g[1],w=I.g[2];var S=I.g[3],y=g+(S^E&(w^S))+v[0]+3614090360&4294967295;g=E+(y<<7&4294967295|y>>>25),y=S+(w^g&(E^w))+v[1]+3905402710&4294967295,S=g+(y<<12&4294967295|y>>>20),y=w+(E^S&(g^E))+v[2]+606105819&4294967295,w=S+(y<<17&4294967295|y>>>15),y=E+(g^w&(S^g))+v[3]+3250441966&4294967295,E=w+(y<<22&4294967295|y>>>10),y=g+(S^E&(w^S))+v[4]+4118548399&4294967295,g=E+(y<<7&4294967295|y>>>25),y=S+(w^g&(E^w))+v[5]+1200080426&4294967295,S=g+(y<<12&4294967295|y>>>20),y=w+(E^S&(g^E))+v[6]+2821735955&4294967295,w=S+(y<<17&4294967295|y>>>15),y=E+(g^w&(S^g))+v[7]+4249261313&4294967295,E=w+(y<<22&4294967295|y>>>10),y=g+(S^E&(w^S))+v[8]+1770035416&4294967295,g=E+(y<<7&4294967295|y>>>25),y=S+(w^g&(E^w))+v[9]+2336552879&4294967295,S=g+(y<<12&4294967295|y>>>20),y=w+(E^S&(g^E))+v[10]+4294925233&4294967295,w=S+(y<<17&4294967295|y>>>15),y=E+(g^w&(S^g))+v[11]+2304563134&4294967295,E=w+(y<<22&4294967295|y>>>10),y=g+(S^E&(w^S))+v[12]+1804603682&4294967295,g=E+(y<<7&4294967295|y>>>25),y=S+(w^g&(E^w))+v[13]+4254626195&4294967295,S=g+(y<<12&4294967295|y>>>20),y=w+(E^S&(g^E))+v[14]+2792965006&4294967295,w=S+(y<<17&4294967295|y>>>15),y=E+(g^w&(S^g))+v[15]+1236535329&4294967295,E=w+(y<<22&4294967295|y>>>10),y=g+(w^S&(E^w))+v[1]+4129170786&4294967295,g=E+(y<<5&4294967295|y>>>27),y=S+(E^w&(g^E))+v[6]+3225465664&4294967295,S=g+(y<<9&4294967295|y>>>23),y=w+(g^E&(S^g))+v[11]+643717713&4294967295,w=S+(y<<14&4294967295|y>>>18),y=E+(S^g&(w^S))+v[0]+3921069994&4294967295,E=w+(y<<20&4294967295|y>>>12),y=g+(w^S&(E^w))+v[5]+3593408605&4294967295,g=E+(y<<5&4294967295|y>>>27),y=S+(E^w&(g^E))+v[10]+38016083&4294967295,S=g+(y<<9&4294967295|y>>>23),y=w+(g^E&(S^g))+v[15]+3634488961&4294967295,w=S+(y<<14&4294967295|y>>>18),y=E+(S^g&(w^S))+v[4]+3889429448&4294967295,E=w+(y<<20&4294967295|y>>>12),y=g+(w^S&(E^w))+v[9]+568446438&4294967295,g=E+(y<<5&4294967295|y>>>27),y=S+(E^w&(g^E))+v[14]+3275163606&4294967295,S=g+(y<<9&4294967295|y>>>23),y=w+(g^E&(S^g))+v[3]+4107603335&4294967295,w=S+(y<<14&4294967295|y>>>18),y=E+(S^g&(w^S))+v[8]+1163531501&4294967295,E=w+(y<<20&4294967295|y>>>12),y=g+(w^S&(E^w))+v[13]+2850285829&4294967295,g=E+(y<<5&4294967295|y>>>27),y=S+(E^w&(g^E))+v[2]+4243563512&4294967295,S=g+(y<<9&4294967295|y>>>23),y=w+(g^E&(S^g))+v[7]+1735328473&4294967295,w=S+(y<<14&4294967295|y>>>18),y=E+(S^g&(w^S))+v[12]+2368359562&4294967295,E=w+(y<<20&4294967295|y>>>12),y=g+(E^w^S)+v[5]+4294588738&4294967295,g=E+(y<<4&4294967295|y>>>28),y=S+(g^E^w)+v[8]+2272392833&4294967295,S=g+(y<<11&4294967295|y>>>21),y=w+(S^g^E)+v[11]+1839030562&4294967295,w=S+(y<<16&4294967295|y>>>16),y=E+(w^S^g)+v[14]+4259657740&4294967295,E=w+(y<<23&4294967295|y>>>9),y=g+(E^w^S)+v[1]+2763975236&4294967295,g=E+(y<<4&4294967295|y>>>28),y=S+(g^E^w)+v[4]+1272893353&4294967295,S=g+(y<<11&4294967295|y>>>21),y=w+(S^g^E)+v[7]+4139469664&4294967295,w=S+(y<<16&4294967295|y>>>16),y=E+(w^S^g)+v[10]+3200236656&4294967295,E=w+(y<<23&4294967295|y>>>9),y=g+(E^w^S)+v[13]+681279174&4294967295,g=E+(y<<4&4294967295|y>>>28),y=S+(g^E^w)+v[0]+3936430074&4294967295,S=g+(y<<11&4294967295|y>>>21),y=w+(S^g^E)+v[3]+3572445317&4294967295,w=S+(y<<16&4294967295|y>>>16),y=E+(w^S^g)+v[6]+76029189&4294967295,E=w+(y<<23&4294967295|y>>>9),y=g+(E^w^S)+v[9]+3654602809&4294967295,g=E+(y<<4&4294967295|y>>>28),y=S+(g^E^w)+v[12]+3873151461&4294967295,S=g+(y<<11&4294967295|y>>>21),y=w+(S^g^E)+v[15]+530742520&4294967295,w=S+(y<<16&4294967295|y>>>16),y=E+(w^S^g)+v[2]+3299628645&4294967295,E=w+(y<<23&4294967295|y>>>9),y=g+(w^(E|~S))+v[0]+4096336452&4294967295,g=E+(y<<6&4294967295|y>>>26),y=S+(E^(g|~w))+v[7]+1126891415&4294967295,S=g+(y<<10&4294967295|y>>>22),y=w+(g^(S|~E))+v[14]+2878612391&4294967295,w=S+(y<<15&4294967295|y>>>17),y=E+(S^(w|~g))+v[5]+4237533241&4294967295,E=w+(y<<21&4294967295|y>>>11),y=g+(w^(E|~S))+v[12]+1700485571&4294967295,g=E+(y<<6&4294967295|y>>>26),y=S+(E^(g|~w))+v[3]+2399980690&4294967295,S=g+(y<<10&4294967295|y>>>22),y=w+(g^(S|~E))+v[10]+4293915773&4294967295,w=S+(y<<15&4294967295|y>>>17),y=E+(S^(w|~g))+v[1]+2240044497&4294967295,E=w+(y<<21&4294967295|y>>>11),y=g+(w^(E|~S))+v[8]+1873313359&4294967295,g=E+(y<<6&4294967295|y>>>26),y=S+(E^(g|~w))+v[15]+4264355552&4294967295,S=g+(y<<10&4294967295|y>>>22),y=w+(g^(S|~E))+v[6]+2734768916&4294967295,w=S+(y<<15&4294967295|y>>>17),y=E+(S^(w|~g))+v[13]+1309151649&4294967295,E=w+(y<<21&4294967295|y>>>11),y=g+(w^(E|~S))+v[4]+4149444226&4294967295,g=E+(y<<6&4294967295|y>>>26),y=S+(E^(g|~w))+v[11]+3174756917&4294967295,S=g+(y<<10&4294967295|y>>>22),y=w+(g^(S|~E))+v[2]+718787259&4294967295,w=S+(y<<15&4294967295|y>>>17),y=E+(S^(w|~g))+v[9]+3951481745&4294967295,I.g[0]=I.g[0]+g&4294967295,I.g[1]=I.g[1]+(w+(y<<21&4294967295|y>>>11))&4294967295,I.g[2]=I.g[2]+w&4294967295,I.g[3]=I.g[3]+S&4294967295}n.prototype.u=function(I,g){g===void 0&&(g=I.length);for(var E=g-this.blockSize,v=this.B,w=this.h,S=0;S<g;){if(w==0)for(;S<=E;)i(this,I,S),S+=this.blockSize;if(typeof I=="string"){for(;S<g;)if(v[w++]=I.charCodeAt(S++),w==this.blockSize){i(this,v),w=0;break}}else for(;S<g;)if(v[w++]=I[S++],w==this.blockSize){i(this,v),w=0;break}}this.h=w,this.o+=g},n.prototype.v=function(){var I=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);I[0]=128;for(var g=1;g<I.length-8;++g)I[g]=0;var E=8*this.o;for(g=I.length-8;g<I.length;++g)I[g]=E&255,E/=256;for(this.u(I),I=Array(16),g=E=0;4>g;++g)for(var v=0;32>v;v+=8)I[E++]=this.g[g]>>>v&255;return I};function r(I,g){var E=l;return Object.prototype.hasOwnProperty.call(E,I)?E[I]:E[I]=g(I)}function o(I,g){this.h=g;for(var E=[],v=!0,w=I.length-1;0<=w;w--){var S=I[w]|0;v&&S==g||(E[w]=S,v=!1)}this.g=E}var l={};function u(I){return-128<=I&&128>I?r(I,function(g){return new o([g|0],0>g?-1:0)}):new o([I|0],0>I?-1:0)}function c(I){if(isNaN(I)||!isFinite(I))return _;if(0>I)return N(c(-I));for(var g=[],E=1,v=0;I>=E;v++)g[v]=I/E|0,E*=4294967296;return new o(g,0)}function f(I,g){if(I.length==0)throw Error("number format error: empty string");if(g=g||10,2>g||36<g)throw Error("radix out of range: "+g);if(I.charAt(0)=="-")return N(f(I.substring(1),g));if(0<=I.indexOf("-"))throw Error('number format error: interior "-" character');for(var E=c(Math.pow(g,8)),v=_,w=0;w<I.length;w+=8){var S=Math.min(8,I.length-w),y=parseInt(I.substring(w,w+S),g);8>S?(S=c(Math.pow(g,S)),v=v.j(S).add(c(y))):(v=v.j(E),v=v.add(c(y)))}return v}var _=u(0),m=u(1),T=u(16777216);s=o.prototype,s.m=function(){if(V(this))return-N(this).m();for(var I=0,g=1,E=0;E<this.g.length;E++){var v=this.i(E);I+=(0<=v?v:4294967296+v)*g,g*=4294967296}return I},s.toString=function(I){if(I=I||10,2>I||36<I)throw Error("radix out of range: "+I);if(C(this))return"0";if(V(this))return"-"+N(this).toString(I);for(var g=c(Math.pow(I,6)),E=this,v="";;){var w=J(E,g).g;E=K(E,w.j(g));var S=((0<E.g.length?E.g[0]:E.h)>>>0).toString(I);if(E=w,C(E))return S+v;for(;6>S.length;)S="0"+S;v=S+v}},s.i=function(I){return 0>I?0:I<this.g.length?this.g[I]:this.h};function C(I){if(I.h!=0)return!1;for(var g=0;g<I.g.length;g++)if(I.g[g]!=0)return!1;return!0}function V(I){return I.h==-1}s.l=function(I){return I=K(this,I),V(I)?-1:C(I)?0:1};function N(I){for(var g=I.g.length,E=[],v=0;v<g;v++)E[v]=~I.g[v];return new o(E,~I.h).add(m)}s.abs=function(){return V(this)?N(this):this},s.add=function(I){for(var g=Math.max(this.g.length,I.g.length),E=[],v=0,w=0;w<=g;w++){var S=v+(this.i(w)&65535)+(I.i(w)&65535),y=(S>>>16)+(this.i(w)>>>16)+(I.i(w)>>>16);v=y>>>16,S&=65535,y&=65535,E[w]=y<<16|S}return new o(E,E[E.length-1]&-2147483648?-1:0)};function K(I,g){return I.add(N(g))}s.j=function(I){if(C(this)||C(I))return _;if(V(this))return V(I)?N(this).j(N(I)):N(N(this).j(I));if(V(I))return N(this.j(N(I)));if(0>this.l(T)&&0>I.l(T))return c(this.m()*I.m());for(var g=this.g.length+I.g.length,E=[],v=0;v<2*g;v++)E[v]=0;for(v=0;v<this.g.length;v++)for(var w=0;w<I.g.length;w++){var S=this.i(v)>>>16,y=this.i(v)&65535,yt=I.i(w)>>>16,Ls=I.i(w)&65535;E[2*v+2*w]+=y*Ls,j(E,2*v+2*w),E[2*v+2*w+1]+=S*Ls,j(E,2*v+2*w+1),E[2*v+2*w+1]+=y*yt,j(E,2*v+2*w+1),E[2*v+2*w+2]+=S*yt,j(E,2*v+2*w+2)}for(v=0;v<g;v++)E[v]=E[2*v+1]<<16|E[2*v];for(v=g;v<2*g;v++)E[v]=0;return new o(E,0)};function j(I,g){for(;(I[g]&65535)!=I[g];)I[g+1]+=I[g]>>>16,I[g]&=65535,g++}function B(I,g){this.g=I,this.h=g}function J(I,g){if(C(g))throw Error("division by zero");if(C(I))return new B(_,_);if(V(I))return g=J(N(I),g),new B(N(g.g),N(g.h));if(V(g))return g=J(I,N(g)),new B(N(g.g),g.h);if(30<I.g.length){if(V(I)||V(g))throw Error("slowDivide_ only works with positive integers.");for(var E=m,v=g;0>=v.l(I);)E=le(E),v=le(v);var w=Z(E,1),S=Z(v,1);for(v=Z(v,2),E=Z(E,2);!C(v);){var y=S.add(v);0>=y.l(I)&&(w=w.add(E),S=y),v=Z(v,1),E=Z(E,1)}return g=K(I,w.j(g)),new B(w,g)}for(w=_;0<=I.l(g);){for(E=Math.max(1,Math.floor(I.m()/g.m())),v=Math.ceil(Math.log(E)/Math.LN2),v=48>=v?1:Math.pow(2,v-48),S=c(E),y=S.j(g);V(y)||0<y.l(I);)E-=v,S=c(E),y=S.j(g);C(S)&&(S=m),w=w.add(S),I=K(I,y)}return new B(w,I)}s.A=function(I){return J(this,I).h},s.and=function(I){for(var g=Math.max(this.g.length,I.g.length),E=[],v=0;v<g;v++)E[v]=this.i(v)&I.i(v);return new o(E,this.h&I.h)},s.or=function(I){for(var g=Math.max(this.g.length,I.g.length),E=[],v=0;v<g;v++)E[v]=this.i(v)|I.i(v);return new o(E,this.h|I.h)},s.xor=function(I){for(var g=Math.max(this.g.length,I.g.length),E=[],v=0;v<g;v++)E[v]=this.i(v)^I.i(v);return new o(E,this.h^I.h)};function le(I){for(var g=I.g.length+1,E=[],v=0;v<g;v++)E[v]=I.i(v)<<1|I.i(v-1)>>>31;return new o(E,I.h)}function Z(I,g){var E=g>>5;g%=32;for(var v=I.g.length-E,w=[],S=0;S<v;S++)w[S]=0<g?I.i(S+E)>>>g|I.i(S+E+1)<<32-g:I.i(S+E);return new o(w,I.h)}n.prototype.digest=n.prototype.v,n.prototype.reset=n.prototype.s,n.prototype.update=n.prototype.u,Pf=n,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=c,o.fromString=f,qt=o}).apply(typeof ch<"u"?ch:typeof self<"u"?self:typeof window<"u"?window:{});var Pr=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var bf,ci,Vf,Lr,Qa,xf,Nf,Df;(function(){var s,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,h,d){return a==Array.prototype||a==Object.prototype||(a[h]=d.value),a};function t(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof Pr=="object"&&Pr];for(var h=0;h<a.length;++h){var d=a[h];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var n=t(this);function i(a,h){if(h)e:{var d=n;a=a.split(".");for(var p=0;p<a.length-1;p++){var R=a[p];if(!(R in d))break e;d=d[R]}a=a[a.length-1],p=d[a],h=h(p),h!=p&&h!=null&&e(d,a,{configurable:!0,writable:!0,value:h})}}function r(a,h){a instanceof String&&(a+="");var d=0,p=!1,R={next:function(){if(!p&&d<a.length){var P=d++;return{value:h(P,a[P]),done:!1}}return p=!0,{done:!0,value:void 0}}};return R[Symbol.iterator]=function(){return R},R}i("Array.prototype.values",function(a){return a||function(){return r(this,function(h,d){return d})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},l=this||self;function u(a){var h=typeof a;return h=h!="object"?h:a?Array.isArray(a)?"array":h:"null",h=="array"||h=="object"&&typeof a.length=="number"}function c(a){var h=typeof a;return h=="object"&&a!=null||h=="function"}function f(a,h,d){return a.call.apply(a.bind,arguments)}function _(a,h,d){if(!a)throw Error();if(2<arguments.length){var p=Array.prototype.slice.call(arguments,2);return function(){var R=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(R,p),a.apply(h,R)}}return function(){return a.apply(h,arguments)}}function m(a,h,d){return m=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?f:_,m.apply(null,arguments)}function T(a,h){var d=Array.prototype.slice.call(arguments,1);return function(){var p=d.slice();return p.push.apply(p,arguments),a.apply(this,p)}}function C(a,h){function d(){}d.prototype=h.prototype,a.aa=h.prototype,a.prototype=new d,a.prototype.constructor=a,a.Qb=function(p,R,P){for(var O=Array(arguments.length-2),oe=2;oe<arguments.length;oe++)O[oe-2]=arguments[oe];return h.prototype[R].apply(p,O)}}function V(a){const h=a.length;if(0<h){const d=Array(h);for(let p=0;p<h;p++)d[p]=a[p];return d}return[]}function N(a,h){for(let d=1;d<arguments.length;d++){const p=arguments[d];if(u(p)){const R=a.length||0,P=p.length||0;a.length=R+P;for(let O=0;O<P;O++)a[R+O]=p[O]}else a.push(p)}}class K{constructor(h,d){this.i=h,this.j=d,this.h=0,this.g=null}get(){let h;return 0<this.h?(this.h--,h=this.g,this.g=h.next,h.next=null):h=this.i(),h}}function j(a){return/^[\s\xa0]*$/.test(a)}function B(){var a=l.navigator;return a&&(a=a.userAgent)?a:""}function J(a){return J[" "](a),a}J[" "]=function(){};var le=B().indexOf("Gecko")!=-1&&!(B().toLowerCase().indexOf("webkit")!=-1&&B().indexOf("Edge")==-1)&&!(B().indexOf("Trident")!=-1||B().indexOf("MSIE")!=-1)&&B().indexOf("Edge")==-1;function Z(a,h,d){for(const p in a)h.call(d,a[p],p,a)}function I(a,h){for(const d in a)h.call(void 0,a[d],d,a)}function g(a){const h={};for(const d in a)h[d]=a[d];return h}const E="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function v(a,h){let d,p;for(let R=1;R<arguments.length;R++){p=arguments[R];for(d in p)a[d]=p[d];for(let P=0;P<E.length;P++)d=E[P],Object.prototype.hasOwnProperty.call(p,d)&&(a[d]=p[d])}}function w(a){var h=1;a=a.split(":");const d=[];for(;0<h&&a.length;)d.push(a.shift()),h--;return a.length&&d.push(a.join(":")),d}function S(a){l.setTimeout(()=>{throw a},0)}function y(){var a=ua;let h=null;return a.g&&(h=a.g,a.g=a.g.next,a.g||(a.h=null),h.next=null),h}class yt{constructor(){this.h=this.g=null}add(h,d){const p=Ls.get();p.set(h,d),this.h?this.h.next=p:this.g=p,this.h=p}}var Ls=new K(()=>new cg,a=>a.reset());class cg{constructor(){this.next=this.g=this.h=null}set(h,d){this.h=h,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let Us,Bs=!1,ua=new yt,uc=()=>{const a=l.Promise.resolve(void 0);Us=()=>{a.then(hg)}};var hg=()=>{for(var a;a=y();){try{a.h.call(a.g)}catch(d){S(d)}var h=Ls;h.j(a),100>h.h&&(h.h++,a.next=h.g,h.g=a)}Bs=!1};function Nt(){this.s=this.s,this.C=this.C}Nt.prototype.s=!1,Nt.prototype.ma=function(){this.s||(this.s=!0,this.N())},Nt.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function Ve(a,h){this.type=a,this.g=this.target=h,this.defaultPrevented=!1}Ve.prototype.h=function(){this.defaultPrevented=!0};var dg=function(){if(!l.addEventListener||!Object.defineProperty)return!1;var a=!1,h=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const d=()=>{};l.addEventListener("test",d,h),l.removeEventListener("test",d,h)}catch{}return a}();function qs(a,h){if(Ve.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a){var d=this.type=a.type,p=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;if(this.target=a.target||a.srcElement,this.g=h,h=a.relatedTarget){if(le){e:{try{J(h.nodeName);var R=!0;break e}catch{}R=!1}R||(h=null)}}else d=="mouseover"?h=a.fromElement:d=="mouseout"&&(h=a.toElement);this.relatedTarget=h,p?(this.clientX=p.clientX!==void 0?p.clientX:p.pageX,this.clientY=p.clientY!==void 0?p.clientY:p.pageY,this.screenX=p.screenX||0,this.screenY=p.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=typeof a.pointerType=="string"?a.pointerType:fg[a.pointerType]||"",this.state=a.state,this.i=a,a.defaultPrevented&&qs.aa.h.call(this)}}C(qs,Ve);var fg={2:"touch",3:"pen",4:"mouse"};qs.prototype.h=function(){qs.aa.h.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var ur="closure_listenable_"+(1e6*Math.random()|0),_g=0;function pg(a,h,d,p,R){this.listener=a,this.proxy=null,this.src=h,this.type=d,this.capture=!!p,this.ha=R,this.key=++_g,this.da=this.fa=!1}function cr(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function hr(a){this.src=a,this.g={},this.h=0}hr.prototype.add=function(a,h,d,p,R){var P=a.toString();a=this.g[P],a||(a=this.g[P]=[],this.h++);var O=ha(a,h,p,R);return-1<O?(h=a[O],d||(h.fa=!1)):(h=new pg(h,this.src,P,!!p,R),h.fa=d,a.push(h)),h};function ca(a,h){var d=h.type;if(d in a.g){var p=a.g[d],R=Array.prototype.indexOf.call(p,h,void 0),P;(P=0<=R)&&Array.prototype.splice.call(p,R,1),P&&(cr(h),a.g[d].length==0&&(delete a.g[d],a.h--))}}function ha(a,h,d,p){for(var R=0;R<a.length;++R){var P=a[R];if(!P.da&&P.listener==h&&P.capture==!!d&&P.ha==p)return R}return-1}var da="closure_lm_"+(1e6*Math.random()|0),fa={};function cc(a,h,d,p,R){if(Array.isArray(h)){for(var P=0;P<h.length;P++)cc(a,h[P],d,p,R);return null}return d=fc(d),a&&a[ur]?a.K(h,d,c(p)?!!p.capture:!1,R):mg(a,h,d,!1,p,R)}function mg(a,h,d,p,R,P){if(!h)throw Error("Invalid event type");var O=c(R)?!!R.capture:!!R,oe=pa(a);if(oe||(a[da]=oe=new hr(a)),d=oe.add(h,d,p,O,P),d.proxy)return d;if(p=gg(),d.proxy=p,p.src=a,p.listener=d,a.addEventListener)dg||(R=O),R===void 0&&(R=!1),a.addEventListener(h.toString(),p,R);else if(a.attachEvent)a.attachEvent(dc(h.toString()),p);else if(a.addListener&&a.removeListener)a.addListener(p);else throw Error("addEventListener and attachEvent are unavailable.");return d}function gg(){function a(d){return h.call(a.src,a.listener,d)}const h=yg;return a}function hc(a,h,d,p,R){if(Array.isArray(h))for(var P=0;P<h.length;P++)hc(a,h[P],d,p,R);else p=c(p)?!!p.capture:!!p,d=fc(d),a&&a[ur]?(a=a.i,h=String(h).toString(),h in a.g&&(P=a.g[h],d=ha(P,d,p,R),-1<d&&(cr(P[d]),Array.prototype.splice.call(P,d,1),P.length==0&&(delete a.g[h],a.h--)))):a&&(a=pa(a))&&(h=a.g[h.toString()],a=-1,h&&(a=ha(h,d,p,R)),(d=-1<a?h[a]:null)&&_a(d))}function _a(a){if(typeof a!="number"&&a&&!a.da){var h=a.src;if(h&&h[ur])ca(h.i,a);else{var d=a.type,p=a.proxy;h.removeEventListener?h.removeEventListener(d,p,a.capture):h.detachEvent?h.detachEvent(dc(d),p):h.addListener&&h.removeListener&&h.removeListener(p),(d=pa(h))?(ca(d,a),d.h==0&&(d.src=null,h[da]=null)):cr(a)}}}function dc(a){return a in fa?fa[a]:fa[a]="on"+a}function yg(a,h){if(a.da)a=!0;else{h=new qs(h,this);var d=a.listener,p=a.ha||a.src;a.fa&&_a(a),a=d.call(p,h)}return a}function pa(a){return a=a[da],a instanceof hr?a:null}var ma="__closure_events_fn_"+(1e9*Math.random()>>>0);function fc(a){return typeof a=="function"?a:(a[ma]||(a[ma]=function(h){return a.handleEvent(h)}),a[ma])}function xe(){Nt.call(this),this.i=new hr(this),this.M=this,this.F=null}C(xe,Nt),xe.prototype[ur]=!0,xe.prototype.removeEventListener=function(a,h,d,p){hc(this,a,h,d,p)};function qe(a,h){var d,p=a.F;if(p)for(d=[];p;p=p.F)d.push(p);if(a=a.M,p=h.type||h,typeof h=="string")h=new Ve(h,a);else if(h instanceof Ve)h.target=h.target||a;else{var R=h;h=new Ve(p,a),v(h,R)}if(R=!0,d)for(var P=d.length-1;0<=P;P--){var O=h.g=d[P];R=dr(O,p,!0,h)&&R}if(O=h.g=a,R=dr(O,p,!0,h)&&R,R=dr(O,p,!1,h)&&R,d)for(P=0;P<d.length;P++)O=h.g=d[P],R=dr(O,p,!1,h)&&R}xe.prototype.N=function(){if(xe.aa.N.call(this),this.i){var a=this.i,h;for(h in a.g){for(var d=a.g[h],p=0;p<d.length;p++)cr(d[p]);delete a.g[h],a.h--}}this.F=null},xe.prototype.K=function(a,h,d,p){return this.i.add(String(a),h,!1,d,p)},xe.prototype.L=function(a,h,d,p){return this.i.add(String(a),h,!0,d,p)};function dr(a,h,d,p){if(h=a.i.g[String(h)],!h)return!0;h=h.concat();for(var R=!0,P=0;P<h.length;++P){var O=h[P];if(O&&!O.da&&O.capture==d){var oe=O.listener,be=O.ha||O.src;O.fa&&ca(a.i,O),R=oe.call(be,p)!==!1&&R}}return R&&!p.defaultPrevented}function _c(a,h,d){if(typeof a=="function")d&&(a=m(a,d));else if(a&&typeof a.handleEvent=="function")a=m(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(h)?-1:l.setTimeout(a,h||0)}function pc(a){a.g=_c(()=>{a.g=null,a.i&&(a.i=!1,pc(a))},a.l);const h=a.h;a.h=null,a.m.apply(null,h)}class Eg extends Nt{constructor(h,d){super(),this.m=h,this.l=d,this.h=null,this.i=!1,this.g=null}j(h){this.h=arguments,this.g?this.i=!0:pc(this)}N(){super.N(),this.g&&(l.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function js(a){Nt.call(this),this.h=a,this.g={}}C(js,Nt);var mc=[];function gc(a){Z(a.g,function(h,d){this.g.hasOwnProperty(d)&&_a(h)},a),a.g={}}js.prototype.N=function(){js.aa.N.call(this),gc(this)},js.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var ga=l.JSON.stringify,Ig=l.JSON.parse,vg=class{stringify(a){return l.JSON.stringify(a,void 0)}parse(a){return l.JSON.parse(a,void 0)}};function ya(){}ya.prototype.h=null;function yc(a){return a.h||(a.h=a.i())}function Ec(){}var Gs={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Ea(){Ve.call(this,"d")}C(Ea,Ve);function Ia(){Ve.call(this,"c")}C(Ia,Ve);var rn={},Ic=null;function fr(){return Ic=Ic||new xe}rn.La="serverreachability";function vc(a){Ve.call(this,rn.La,a)}C(vc,Ve);function zs(a){const h=fr();qe(h,new vc(h))}rn.STAT_EVENT="statevent";function Tc(a,h){Ve.call(this,rn.STAT_EVENT,a),this.stat=h}C(Tc,Ve);function je(a){const h=fr();qe(h,new Tc(h,a))}rn.Ma="timingevent";function wc(a,h){Ve.call(this,rn.Ma,a),this.size=h}C(wc,Ve);function Ks(a,h){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){a()},h)}function Ws(){this.g=!0}Ws.prototype.xa=function(){this.g=!1};function Tg(a,h,d,p,R,P){a.info(function(){if(a.g)if(P)for(var O="",oe=P.split("&"),be=0;be<oe.length;be++){var ee=oe[be].split("=");if(1<ee.length){var Ne=ee[0];ee=ee[1];var De=Ne.split("_");O=2<=De.length&&De[1]=="type"?O+(Ne+"="+ee+"&"):O+(Ne+"=redacted&")}}else O=null;else O=P;return"XMLHTTP REQ ("+p+") [attempt "+R+"]: "+h+`
`+d+`
`+O})}function wg(a,h,d,p,R,P,O){a.info(function(){return"XMLHTTP RESP ("+p+") [ attempt "+R+"]: "+h+`
`+d+`
`+P+" "+O})}function Ln(a,h,d,p){a.info(function(){return"XMLHTTP TEXT ("+h+"): "+Rg(a,d)+(p?" "+p:"")})}function Ag(a,h){a.info(function(){return"TIMEOUT: "+h})}Ws.prototype.info=function(){};function Rg(a,h){if(!a.g)return h;if(!h)return null;try{var d=JSON.parse(h);if(d){for(a=0;a<d.length;a++)if(Array.isArray(d[a])){var p=d[a];if(!(2>p.length)){var R=p[1];if(Array.isArray(R)&&!(1>R.length)){var P=R[0];if(P!="noop"&&P!="stop"&&P!="close")for(var O=1;O<R.length;O++)R[O]=""}}}}return ga(d)}catch{return h}}var _r={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},Ac={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},va;function pr(){}C(pr,ya),pr.prototype.g=function(){return new XMLHttpRequest},pr.prototype.i=function(){return{}},va=new pr;function Dt(a,h,d,p){this.j=a,this.i=h,this.l=d,this.R=p||1,this.U=new js(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new Rc}function Rc(){this.i=null,this.g="",this.h=!1}var Sc={},Ta={};function wa(a,h,d){a.L=1,a.v=Er(Et(h)),a.m=d,a.P=!0,Cc(a,null)}function Cc(a,h){a.F=Date.now(),mr(a),a.A=Et(a.v);var d=a.A,p=a.R;Array.isArray(p)||(p=[String(p)]),qc(d.i,"t",p),a.C=0,d=a.j.J,a.h=new Rc,a.g=rh(a.j,d?h:null,!a.m),0<a.O&&(a.M=new Eg(m(a.Y,a,a.g),a.O)),h=a.U,d=a.g,p=a.ca;var R="readystatechange";Array.isArray(R)||(R&&(mc[0]=R.toString()),R=mc);for(var P=0;P<R.length;P++){var O=cc(d,R[P],p||h.handleEvent,!1,h.h||h);if(!O)break;h.g[O.key]=O}h=a.H?g(a.H):{},a.m?(a.u||(a.u="POST"),h["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.A,a.u,a.m,h)):(a.u="GET",a.g.ea(a.A,a.u,null,h)),zs(),Tg(a.i,a.u,a.A,a.l,a.R,a.m)}Dt.prototype.ca=function(a){a=a.target;const h=this.M;h&&It(a)==3?h.j():this.Y(a)},Dt.prototype.Y=function(a){try{if(a==this.g)e:{const De=It(this.g);var h=this.g.Ba();const qn=this.g.Z();if(!(3>De)&&(De!=3||this.g&&(this.h.h||this.g.oa()||Qc(this.g)))){this.J||De!=4||h==7||(h==8||0>=qn?zs(3):zs(2)),Aa(this);var d=this.g.Z();this.X=d;t:if(Pc(this)){var p=Qc(this.g);a="";var R=p.length,P=It(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){on(this),$s(this);var O="";break t}this.h.i=new l.TextDecoder}for(h=0;h<R;h++)this.h.h=!0,a+=this.h.i.decode(p[h],{stream:!(P&&h==R-1)});p.length=0,this.h.g+=a,this.C=0,O=this.h.g}else O=this.g.oa();if(this.o=d==200,wg(this.i,this.u,this.A,this.l,this.R,De,d),this.o){if(this.T&&!this.K){t:{if(this.g){var oe,be=this.g;if((oe=be.g?be.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!j(oe)){var ee=oe;break t}}ee=null}if(d=ee)Ln(this.i,this.l,d,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Ra(this,d);else{this.o=!1,this.s=3,je(12),on(this),$s(this);break e}}if(this.P){d=!0;let it;for(;!this.J&&this.C<O.length;)if(it=Sg(this,O),it==Ta){De==4&&(this.s=4,je(14),d=!1),Ln(this.i,this.l,null,"[Incomplete Response]");break}else if(it==Sc){this.s=4,je(15),Ln(this.i,this.l,O,"[Invalid Chunk]"),d=!1;break}else Ln(this.i,this.l,it,null),Ra(this,it);if(Pc(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),De!=4||O.length!=0||this.h.h||(this.s=1,je(16),d=!1),this.o=this.o&&d,!d)Ln(this.i,this.l,O,"[Invalid Chunked Response]"),on(this),$s(this);else if(0<O.length&&!this.W){this.W=!0;var Ne=this.j;Ne.g==this&&Ne.ba&&!Ne.M&&(Ne.j.info("Great, no buffering proxy detected. Bytes received: "+O.length),xa(Ne),Ne.M=!0,je(11))}}else Ln(this.i,this.l,O,null),Ra(this,O);De==4&&on(this),this.o&&!this.J&&(De==4?th(this.j,this):(this.o=!1,mr(this)))}else Gg(this.g),d==400&&0<O.indexOf("Unknown SID")?(this.s=3,je(12)):(this.s=0,je(13)),on(this),$s(this)}}}catch{}finally{}};function Pc(a){return a.g?a.u=="GET"&&a.L!=2&&a.j.Ca:!1}function Sg(a,h){var d=a.C,p=h.indexOf(`
`,d);return p==-1?Ta:(d=Number(h.substring(d,p)),isNaN(d)?Sc:(p+=1,p+d>h.length?Ta:(h=h.slice(p,p+d),a.C=p+d,h)))}Dt.prototype.cancel=function(){this.J=!0,on(this)};function mr(a){a.S=Date.now()+a.I,bc(a,a.I)}function bc(a,h){if(a.B!=null)throw Error("WatchDog timer not null");a.B=Ks(m(a.ba,a),h)}function Aa(a){a.B&&(l.clearTimeout(a.B),a.B=null)}Dt.prototype.ba=function(){this.B=null;const a=Date.now();0<=a-this.S?(Ag(this.i,this.A),this.L!=2&&(zs(),je(17)),on(this),this.s=2,$s(this)):bc(this,this.S-a)};function $s(a){a.j.G==0||a.J||th(a.j,a)}function on(a){Aa(a);var h=a.M;h&&typeof h.ma=="function"&&h.ma(),a.M=null,gc(a.U),a.g&&(h=a.g,a.g=null,h.abort(),h.ma())}function Ra(a,h){try{var d=a.j;if(d.G!=0&&(d.g==a||Sa(d.h,a))){if(!a.K&&Sa(d.h,a)&&d.G==3){try{var p=d.Da.g.parse(h)}catch{p=null}if(Array.isArray(p)&&p.length==3){var R=p;if(R[0]==0){e:if(!d.u){if(d.g)if(d.g.F+3e3<a.F)Rr(d),wr(d);else break e;Va(d),je(18)}}else d.za=R[1],0<d.za-d.T&&37500>R[2]&&d.F&&d.v==0&&!d.C&&(d.C=Ks(m(d.Za,d),6e3));if(1>=Nc(d.h)&&d.ca){try{d.ca()}catch{}d.ca=void 0}}else ln(d,11)}else if((a.K||d.g==a)&&Rr(d),!j(h))for(R=d.Da.g.parse(h),h=0;h<R.length;h++){let ee=R[h];if(d.T=ee[0],ee=ee[1],d.G==2)if(ee[0]=="c"){d.K=ee[1],d.ia=ee[2];const Ne=ee[3];Ne!=null&&(d.la=Ne,d.j.info("VER="+d.la));const De=ee[4];De!=null&&(d.Aa=De,d.j.info("SVER="+d.Aa));const qn=ee[5];qn!=null&&typeof qn=="number"&&0<qn&&(p=1.5*qn,d.L=p,d.j.info("backChannelRequestTimeoutMs_="+p)),p=d;const it=a.g;if(it){const Cr=it.g?it.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Cr){var P=p.h;P.g||Cr.indexOf("spdy")==-1&&Cr.indexOf("quic")==-1&&Cr.indexOf("h2")==-1||(P.j=P.l,P.g=new Set,P.h&&(Ca(P,P.h),P.h=null))}if(p.D){const Na=it.g?it.g.getResponseHeader("X-HTTP-Session-Id"):null;Na&&(p.ya=Na,ce(p.I,p.D,Na))}}d.G=3,d.l&&d.l.ua(),d.ba&&(d.R=Date.now()-a.F,d.j.info("Handshake RTT: "+d.R+"ms")),p=d;var O=a;if(p.qa=ih(p,p.J?p.ia:null,p.W),O.K){Dc(p.h,O);var oe=O,be=p.L;be&&(oe.I=be),oe.B&&(Aa(oe),mr(oe)),p.g=O}else Zc(p);0<d.i.length&&Ar(d)}else ee[0]!="stop"&&ee[0]!="close"||ln(d,7);else d.G==3&&(ee[0]=="stop"||ee[0]=="close"?ee[0]=="stop"?ln(d,7):ba(d):ee[0]!="noop"&&d.l&&d.l.ta(ee),d.v=0)}}zs(4)}catch{}}var Cg=class{constructor(a,h){this.g=a,this.map=h}};function Vc(a){this.l=a||10,l.PerformanceNavigationTiming?(a=l.performance.getEntriesByType("navigation"),a=0<a.length&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(l.chrome&&l.chrome.loadTimes&&l.chrome.loadTimes()&&l.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function xc(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function Nc(a){return a.h?1:a.g?a.g.size:0}function Sa(a,h){return a.h?a.h==h:a.g?a.g.has(h):!1}function Ca(a,h){a.g?a.g.add(h):a.h=h}function Dc(a,h){a.h&&a.h==h?a.h=null:a.g&&a.g.has(h)&&a.g.delete(h)}Vc.prototype.cancel=function(){if(this.i=kc(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function kc(a){if(a.h!=null)return a.i.concat(a.h.D);if(a.g!=null&&a.g.size!==0){let h=a.i;for(const d of a.g.values())h=h.concat(d.D);return h}return V(a.i)}function Pg(a){if(a.V&&typeof a.V=="function")return a.V();if(typeof Map<"u"&&a instanceof Map||typeof Set<"u"&&a instanceof Set)return Array.from(a.values());if(typeof a=="string")return a.split("");if(u(a)){for(var h=[],d=a.length,p=0;p<d;p++)h.push(a[p]);return h}h=[],d=0;for(p in a)h[d++]=a[p];return h}function bg(a){if(a.na&&typeof a.na=="function")return a.na();if(!a.V||typeof a.V!="function"){if(typeof Map<"u"&&a instanceof Map)return Array.from(a.keys());if(!(typeof Set<"u"&&a instanceof Set)){if(u(a)||typeof a=="string"){var h=[];a=a.length;for(var d=0;d<a;d++)h.push(d);return h}h=[],d=0;for(const p in a)h[d++]=p;return h}}}function Oc(a,h){if(a.forEach&&typeof a.forEach=="function")a.forEach(h,void 0);else if(u(a)||typeof a=="string")Array.prototype.forEach.call(a,h,void 0);else for(var d=bg(a),p=Pg(a),R=p.length,P=0;P<R;P++)h.call(void 0,p[P],d&&d[P],a)}var Mc=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Vg(a,h){if(a){a=a.split("&");for(var d=0;d<a.length;d++){var p=a[d].indexOf("="),R=null;if(0<=p){var P=a[d].substring(0,p);R=a[d].substring(p+1)}else P=a[d];h(P,R?decodeURIComponent(R.replace(/\+/g," ")):"")}}}function an(a){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,a instanceof an){this.h=a.h,gr(this,a.j),this.o=a.o,this.g=a.g,yr(this,a.s),this.l=a.l;var h=a.i,d=new Ys;d.i=h.i,h.g&&(d.g=new Map(h.g),d.h=h.h),Fc(this,d),this.m=a.m}else a&&(h=String(a).match(Mc))?(this.h=!1,gr(this,h[1]||"",!0),this.o=Qs(h[2]||""),this.g=Qs(h[3]||"",!0),yr(this,h[4]),this.l=Qs(h[5]||"",!0),Fc(this,h[6]||"",!0),this.m=Qs(h[7]||"")):(this.h=!1,this.i=new Ys(null,this.h))}an.prototype.toString=function(){var a=[],h=this.j;h&&a.push(Hs(h,Lc,!0),":");var d=this.g;return(d||h=="file")&&(a.push("//"),(h=this.o)&&a.push(Hs(h,Lc,!0),"@"),a.push(encodeURIComponent(String(d)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.s,d!=null&&a.push(":",String(d))),(d=this.l)&&(this.g&&d.charAt(0)!="/"&&a.push("/"),a.push(Hs(d,d.charAt(0)=="/"?Dg:Ng,!0))),(d=this.i.toString())&&a.push("?",d),(d=this.m)&&a.push("#",Hs(d,Og)),a.join("")};function Et(a){return new an(a)}function gr(a,h,d){a.j=d?Qs(h,!0):h,a.j&&(a.j=a.j.replace(/:$/,""))}function yr(a,h){if(h){if(h=Number(h),isNaN(h)||0>h)throw Error("Bad port number "+h);a.s=h}else a.s=null}function Fc(a,h,d){h instanceof Ys?(a.i=h,Mg(a.i,a.h)):(d||(h=Hs(h,kg)),a.i=new Ys(h,a.h))}function ce(a,h,d){a.i.set(h,d)}function Er(a){return ce(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),a}function Qs(a,h){return a?h?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function Hs(a,h,d){return typeof a=="string"?(a=encodeURI(a).replace(h,xg),d&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function xg(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var Lc=/[#\/\?@]/g,Ng=/[#\?:]/g,Dg=/[#\?]/g,kg=/[#\?@]/g,Og=/#/g;function Ys(a,h){this.h=this.g=null,this.i=a||null,this.j=!!h}function kt(a){a.g||(a.g=new Map,a.h=0,a.i&&Vg(a.i,function(h,d){a.add(decodeURIComponent(h.replace(/\+/g," ")),d)}))}s=Ys.prototype,s.add=function(a,h){kt(this),this.i=null,a=Un(this,a);var d=this.g.get(a);return d||this.g.set(a,d=[]),d.push(h),this.h+=1,this};function Uc(a,h){kt(a),h=Un(a,h),a.g.has(h)&&(a.i=null,a.h-=a.g.get(h).length,a.g.delete(h))}function Bc(a,h){return kt(a),h=Un(a,h),a.g.has(h)}s.forEach=function(a,h){kt(this),this.g.forEach(function(d,p){d.forEach(function(R){a.call(h,R,p,this)},this)},this)},s.na=function(){kt(this);const a=Array.from(this.g.values()),h=Array.from(this.g.keys()),d=[];for(let p=0;p<h.length;p++){const R=a[p];for(let P=0;P<R.length;P++)d.push(h[p])}return d},s.V=function(a){kt(this);let h=[];if(typeof a=="string")Bc(this,a)&&(h=h.concat(this.g.get(Un(this,a))));else{a=Array.from(this.g.values());for(let d=0;d<a.length;d++)h=h.concat(a[d])}return h},s.set=function(a,h){return kt(this),this.i=null,a=Un(this,a),Bc(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[h]),this.h+=1,this},s.get=function(a,h){return a?(a=this.V(a),0<a.length?String(a[0]):h):h};function qc(a,h,d){Uc(a,h),0<d.length&&(a.i=null,a.g.set(Un(a,h),V(d)),a.h+=d.length)}s.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],h=Array.from(this.g.keys());for(var d=0;d<h.length;d++){var p=h[d];const P=encodeURIComponent(String(p)),O=this.V(p);for(p=0;p<O.length;p++){var R=P;O[p]!==""&&(R+="="+encodeURIComponent(String(O[p]))),a.push(R)}}return this.i=a.join("&")};function Un(a,h){return h=String(h),a.j&&(h=h.toLowerCase()),h}function Mg(a,h){h&&!a.j&&(kt(a),a.i=null,a.g.forEach(function(d,p){var R=p.toLowerCase();p!=R&&(Uc(this,p),qc(this,R,d))},a)),a.j=h}function Fg(a,h){const d=new Ws;if(l.Image){const p=new Image;p.onload=T(Ot,d,"TestLoadImage: loaded",!0,h,p),p.onerror=T(Ot,d,"TestLoadImage: error",!1,h,p),p.onabort=T(Ot,d,"TestLoadImage: abort",!1,h,p),p.ontimeout=T(Ot,d,"TestLoadImage: timeout",!1,h,p),l.setTimeout(function(){p.ontimeout&&p.ontimeout()},1e4),p.src=a}else h(!1)}function Lg(a,h){const d=new Ws,p=new AbortController,R=setTimeout(()=>{p.abort(),Ot(d,"TestPingServer: timeout",!1,h)},1e4);fetch(a,{signal:p.signal}).then(P=>{clearTimeout(R),P.ok?Ot(d,"TestPingServer: ok",!0,h):Ot(d,"TestPingServer: server error",!1,h)}).catch(()=>{clearTimeout(R),Ot(d,"TestPingServer: error",!1,h)})}function Ot(a,h,d,p,R){try{R&&(R.onload=null,R.onerror=null,R.onabort=null,R.ontimeout=null),p(d)}catch{}}function Ug(){this.g=new vg}function Bg(a,h,d){const p=d||"";try{Oc(a,function(R,P){let O=R;c(R)&&(O=ga(R)),h.push(p+P+"="+encodeURIComponent(O))})}catch(R){throw h.push(p+"type="+encodeURIComponent("_badmap")),R}}function Ir(a){this.l=a.Ub||null,this.j=a.eb||!1}C(Ir,ya),Ir.prototype.g=function(){return new vr(this.l,this.j)},Ir.prototype.i=function(a){return function(){return a}}({});function vr(a,h){xe.call(this),this.D=a,this.o=h,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}C(vr,xe),s=vr.prototype,s.open=function(a,h){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=a,this.A=h,this.readyState=1,Js(this)},s.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const h={headers:this.u,method:this.B,credentials:this.m,cache:void 0};a&&(h.body=a),(this.D||l).fetch(new Request(this.A,h)).then(this.Sa.bind(this),this.ga.bind(this))},s.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Xs(this)),this.readyState=0},s.Sa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,Js(this)),this.g&&(this.readyState=3,Js(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof l.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;jc(this)}else a.text().then(this.Ra.bind(this),this.ga.bind(this))};function jc(a){a.j.read().then(a.Pa.bind(a)).catch(a.ga.bind(a))}s.Pa=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var h=a.value?a.value:new Uint8Array(0);(h=this.v.decode(h,{stream:!a.done}))&&(this.response=this.responseText+=h)}a.done?Xs(this):Js(this),this.readyState==3&&jc(this)}},s.Ra=function(a){this.g&&(this.response=this.responseText=a,Xs(this))},s.Qa=function(a){this.g&&(this.response=a,Xs(this))},s.ga=function(){this.g&&Xs(this)};function Xs(a){a.readyState=4,a.l=null,a.j=null,a.v=null,Js(a)}s.setRequestHeader=function(a,h){this.u.append(a,h)},s.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},s.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],h=this.h.entries();for(var d=h.next();!d.done;)d=d.value,a.push(d[0]+": "+d[1]),d=h.next();return a.join(`\r
`)};function Js(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(vr.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function Gc(a){let h="";return Z(a,function(d,p){h+=p,h+=":",h+=d,h+=`\r
`}),h}function Pa(a,h,d){e:{for(p in d){var p=!1;break e}p=!0}p||(d=Gc(d),typeof a=="string"?d!=null&&encodeURIComponent(String(d)):ce(a,h,d))}function pe(a){xe.call(this),this.headers=new Map,this.o=a||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}C(pe,xe);var qg=/^https?$/i,jg=["POST","PUT"];s=pe.prototype,s.Ha=function(a){this.J=a},s.ea=function(a,h,d,p){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);h=h?h.toUpperCase():"GET",this.D=a,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():va.g(),this.v=this.o?yc(this.o):yc(va),this.g.onreadystatechange=m(this.Ea,this);try{this.B=!0,this.g.open(h,String(a),!0),this.B=!1}catch(P){zc(this,P);return}if(a=d||"",d=new Map(this.headers),p)if(Object.getPrototypeOf(p)===Object.prototype)for(var R in p)d.set(R,p[R]);else if(typeof p.keys=="function"&&typeof p.get=="function")for(const P of p.keys())d.set(P,p.get(P));else throw Error("Unknown input type for opt_headers: "+String(p));p=Array.from(d.keys()).find(P=>P.toLowerCase()=="content-type"),R=l.FormData&&a instanceof l.FormData,!(0<=Array.prototype.indexOf.call(jg,h,void 0))||p||R||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[P,O]of d)this.g.setRequestHeader(P,O);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{$c(this),this.u=!0,this.g.send(a),this.u=!1}catch(P){zc(this,P)}};function zc(a,h){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=h,a.m=5,Kc(a),Tr(a)}function Kc(a){a.A||(a.A=!0,qe(a,"complete"),qe(a,"error"))}s.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=a||7,qe(this,"complete"),qe(this,"abort"),Tr(this))},s.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Tr(this,!0)),pe.aa.N.call(this)},s.Ea=function(){this.s||(this.B||this.u||this.j?Wc(this):this.bb())},s.bb=function(){Wc(this)};function Wc(a){if(a.h&&typeof o<"u"&&(!a.v[1]||It(a)!=4||a.Z()!=2)){if(a.u&&It(a)==4)_c(a.Ea,0,a);else if(qe(a,"readystatechange"),It(a)==4){a.h=!1;try{const O=a.Z();e:switch(O){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var h=!0;break e;default:h=!1}var d;if(!(d=h)){var p;if(p=O===0){var R=String(a.D).match(Mc)[1]||null;!R&&l.self&&l.self.location&&(R=l.self.location.protocol.slice(0,-1)),p=!qg.test(R?R.toLowerCase():"")}d=p}if(d)qe(a,"complete"),qe(a,"success");else{a.m=6;try{var P=2<It(a)?a.g.statusText:""}catch{P=""}a.l=P+" ["+a.Z()+"]",Kc(a)}}finally{Tr(a)}}}}function Tr(a,h){if(a.g){$c(a);const d=a.g,p=a.v[0]?()=>{}:null;a.g=null,a.v=null,h||qe(a,"ready");try{d.onreadystatechange=p}catch{}}}function $c(a){a.I&&(l.clearTimeout(a.I),a.I=null)}s.isActive=function(){return!!this.g};function It(a){return a.g?a.g.readyState:0}s.Z=function(){try{return 2<It(this)?this.g.status:-1}catch{return-1}},s.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},s.Oa=function(a){if(this.g){var h=this.g.responseText;return a&&h.indexOf(a)==0&&(h=h.substring(a.length)),Ig(h)}};function Qc(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.H){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function Gg(a){const h={};a=(a.g&&2<=It(a)&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let p=0;p<a.length;p++){if(j(a[p]))continue;var d=w(a[p]);const R=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const P=h[R]||[];h[R]=P,P.push(d)}I(h,function(p){return p.join(", ")})}s.Ba=function(){return this.m},s.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Zs(a,h,d){return d&&d.internalChannelParams&&d.internalChannelParams[a]||h}function Hc(a){this.Aa=0,this.i=[],this.j=new Ws,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Zs("failFast",!1,a),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Zs("baseRetryDelayMs",5e3,a),this.cb=Zs("retryDelaySeedMs",1e4,a),this.Wa=Zs("forwardChannelMaxRetries",2,a),this.wa=Zs("forwardChannelRequestTimeoutMs",2e4,a),this.pa=a&&a.xmlHttpFactory||void 0,this.Xa=a&&a.Tb||void 0,this.Ca=a&&a.useFetchStreams||!1,this.L=void 0,this.J=a&&a.supportsCrossDomainXhr||!1,this.K="",this.h=new Vc(a&&a.concurrentRequestLimit),this.Da=new Ug,this.P=a&&a.fastHandshake||!1,this.O=a&&a.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=a&&a.Rb||!1,a&&a.xa&&this.j.xa(),a&&a.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&a&&a.detectBufferingProxy||!1,this.ja=void 0,a&&a.longPollingTimeout&&0<a.longPollingTimeout&&(this.ja=a.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}s=Hc.prototype,s.la=8,s.G=1,s.connect=function(a,h,d,p){je(0),this.W=a,this.H=h||{},d&&p!==void 0&&(this.H.OSID=d,this.H.OAID=p),this.F=this.X,this.I=ih(this,null,this.W),Ar(this)};function ba(a){if(Yc(a),a.G==3){var h=a.U++,d=Et(a.I);if(ce(d,"SID",a.K),ce(d,"RID",h),ce(d,"TYPE","terminate"),ei(a,d),h=new Dt(a,a.j,h),h.L=2,h.v=Er(Et(d)),d=!1,l.navigator&&l.navigator.sendBeacon)try{d=l.navigator.sendBeacon(h.v.toString(),"")}catch{}!d&&l.Image&&(new Image().src=h.v,d=!0),d||(h.g=rh(h.j,null),h.g.ea(h.v)),h.F=Date.now(),mr(h)}sh(a)}function wr(a){a.g&&(xa(a),a.g.cancel(),a.g=null)}function Yc(a){wr(a),a.u&&(l.clearTimeout(a.u),a.u=null),Rr(a),a.h.cancel(),a.s&&(typeof a.s=="number"&&l.clearTimeout(a.s),a.s=null)}function Ar(a){if(!xc(a.h)&&!a.s){a.s=!0;var h=a.Ga;Us||uc(),Bs||(Us(),Bs=!0),ua.add(h,a),a.B=0}}function zg(a,h){return Nc(a.h)>=a.h.j-(a.s?1:0)?!1:a.s?(a.i=h.D.concat(a.i),!0):a.G==1||a.G==2||a.B>=(a.Va?0:a.Wa)?!1:(a.s=Ks(m(a.Ga,a,h),nh(a,a.B)),a.B++,!0)}s.Ga=function(a){if(this.s)if(this.s=null,this.G==1){if(!a){this.U=Math.floor(1e5*Math.random()),a=this.U++;const R=new Dt(this,this.j,a);let P=this.o;if(this.S&&(P?(P=g(P),v(P,this.S)):P=this.S),this.m!==null||this.O||(R.H=P,P=null),this.P)e:{for(var h=0,d=0;d<this.i.length;d++){t:{var p=this.i[d];if("__data__"in p.map&&(p=p.map.__data__,typeof p=="string")){p=p.length;break t}p=void 0}if(p===void 0)break;if(h+=p,4096<h){h=d;break e}if(h===4096||d===this.i.length-1){h=d+1;break e}}h=1e3}else h=1e3;h=Jc(this,R,h),d=Et(this.I),ce(d,"RID",a),ce(d,"CVER",22),this.D&&ce(d,"X-HTTP-Session-Id",this.D),ei(this,d),P&&(this.O?h="headers="+encodeURIComponent(String(Gc(P)))+"&"+h:this.m&&Pa(d,this.m,P)),Ca(this.h,R),this.Ua&&ce(d,"TYPE","init"),this.P?(ce(d,"$req",h),ce(d,"SID","null"),R.T=!0,wa(R,d,null)):wa(R,d,h),this.G=2}}else this.G==3&&(a?Xc(this,a):this.i.length==0||xc(this.h)||Xc(this))};function Xc(a,h){var d;h?d=h.l:d=a.U++;const p=Et(a.I);ce(p,"SID",a.K),ce(p,"RID",d),ce(p,"AID",a.T),ei(a,p),a.m&&a.o&&Pa(p,a.m,a.o),d=new Dt(a,a.j,d,a.B+1),a.m===null&&(d.H=a.o),h&&(a.i=h.D.concat(a.i)),h=Jc(a,d,1e3),d.I=Math.round(.5*a.wa)+Math.round(.5*a.wa*Math.random()),Ca(a.h,d),wa(d,p,h)}function ei(a,h){a.H&&Z(a.H,function(d,p){ce(h,p,d)}),a.l&&Oc({},function(d,p){ce(h,p,d)})}function Jc(a,h,d){d=Math.min(a.i.length,d);var p=a.l?m(a.l.Na,a.l,a):null;e:{var R=a.i;let P=-1;for(;;){const O=["count="+d];P==-1?0<d?(P=R[0].g,O.push("ofs="+P)):P=0:O.push("ofs="+P);let oe=!0;for(let be=0;be<d;be++){let ee=R[be].g;const Ne=R[be].map;if(ee-=P,0>ee)P=Math.max(0,R[be].g-100),oe=!1;else try{Bg(Ne,O,"req"+ee+"_")}catch{p&&p(Ne)}}if(oe){p=O.join("&");break e}}}return a=a.i.splice(0,d),h.D=a,p}function Zc(a){if(!a.g&&!a.u){a.Y=1;var h=a.Fa;Us||uc(),Bs||(Us(),Bs=!0),ua.add(h,a),a.v=0}}function Va(a){return a.g||a.u||3<=a.v?!1:(a.Y++,a.u=Ks(m(a.Fa,a),nh(a,a.v)),a.v++,!0)}s.Fa=function(){if(this.u=null,eh(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var a=2*this.R;this.j.info("BP detection timer enabled: "+a),this.A=Ks(m(this.ab,this),a)}},s.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,je(10),wr(this),eh(this))};function xa(a){a.A!=null&&(l.clearTimeout(a.A),a.A=null)}function eh(a){a.g=new Dt(a,a.j,"rpc",a.Y),a.m===null&&(a.g.H=a.o),a.g.O=0;var h=Et(a.qa);ce(h,"RID","rpc"),ce(h,"SID",a.K),ce(h,"AID",a.T),ce(h,"CI",a.F?"0":"1"),!a.F&&a.ja&&ce(h,"TO",a.ja),ce(h,"TYPE","xmlhttp"),ei(a,h),a.m&&a.o&&Pa(h,a.m,a.o),a.L&&(a.g.I=a.L);var d=a.g;a=a.ia,d.L=1,d.v=Er(Et(h)),d.m=null,d.P=!0,Cc(d,a)}s.Za=function(){this.C!=null&&(this.C=null,wr(this),Va(this),je(19))};function Rr(a){a.C!=null&&(l.clearTimeout(a.C),a.C=null)}function th(a,h){var d=null;if(a.g==h){Rr(a),xa(a),a.g=null;var p=2}else if(Sa(a.h,h))d=h.D,Dc(a.h,h),p=1;else return;if(a.G!=0){if(h.o)if(p==1){d=h.m?h.m.length:0,h=Date.now()-h.F;var R=a.B;p=fr(),qe(p,new wc(p,d)),Ar(a)}else Zc(a);else if(R=h.s,R==3||R==0&&0<h.X||!(p==1&&zg(a,h)||p==2&&Va(a)))switch(d&&0<d.length&&(h=a.h,h.i=h.i.concat(d)),R){case 1:ln(a,5);break;case 4:ln(a,10);break;case 3:ln(a,6);break;default:ln(a,2)}}}function nh(a,h){let d=a.Ta+Math.floor(Math.random()*a.cb);return a.isActive()||(d*=2),d*h}function ln(a,h){if(a.j.info("Error code "+h),h==2){var d=m(a.fb,a),p=a.Xa;const R=!p;p=new an(p||"//www.google.com/images/cleardot.gif"),l.location&&l.location.protocol=="http"||gr(p,"https"),Er(p),R?Fg(p.toString(),d):Lg(p.toString(),d)}else je(2);a.G=0,a.l&&a.l.sa(h),sh(a),Yc(a)}s.fb=function(a){a?(this.j.info("Successfully pinged google.com"),je(2)):(this.j.info("Failed to ping google.com"),je(1))};function sh(a){if(a.G=0,a.ka=[],a.l){const h=kc(a.h);(h.length!=0||a.i.length!=0)&&(N(a.ka,h),N(a.ka,a.i),a.h.i.length=0,V(a.i),a.i.length=0),a.l.ra()}}function ih(a,h,d){var p=d instanceof an?Et(d):new an(d);if(p.g!="")h&&(p.g=h+"."+p.g),yr(p,p.s);else{var R=l.location;p=R.protocol,h=h?h+"."+R.hostname:R.hostname,R=+R.port;var P=new an(null);p&&gr(P,p),h&&(P.g=h),R&&yr(P,R),d&&(P.l=d),p=P}return d=a.D,h=a.ya,d&&h&&ce(p,d,h),ce(p,"VER",a.la),ei(a,p),p}function rh(a,h,d){if(h&&!a.J)throw Error("Can't create secondary domain capable XhrIo object.");return h=a.Ca&&!a.pa?new pe(new Ir({eb:d})):new pe(a.pa),h.Ha(a.J),h}s.isActive=function(){return!!this.l&&this.l.isActive(this)};function oh(){}s=oh.prototype,s.ua=function(){},s.ta=function(){},s.sa=function(){},s.ra=function(){},s.isActive=function(){return!0},s.Na=function(){};function Sr(){}Sr.prototype.g=function(a,h){return new Ye(a,h)};function Ye(a,h){xe.call(this),this.g=new Hc(h),this.l=a,this.h=h&&h.messageUrlParams||null,a=h&&h.messageHeaders||null,h&&h.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=h&&h.initMessageHeaders||null,h&&h.messageContentType&&(a?a["X-WebChannel-Content-Type"]=h.messageContentType:a={"X-WebChannel-Content-Type":h.messageContentType}),h&&h.va&&(a?a["X-WebChannel-Client-Profile"]=h.va:a={"X-WebChannel-Client-Profile":h.va}),this.g.S=a,(a=h&&h.Sb)&&!j(a)&&(this.g.m=a),this.v=h&&h.supportsCrossDomainXhr||!1,this.u=h&&h.sendRawJson||!1,(h=h&&h.httpSessionIdParam)&&!j(h)&&(this.g.D=h,a=this.h,a!==null&&h in a&&(a=this.h,h in a&&delete a[h])),this.j=new Bn(this)}C(Ye,xe),Ye.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Ye.prototype.close=function(){ba(this.g)},Ye.prototype.o=function(a){var h=this.g;if(typeof a=="string"){var d={};d.__data__=a,a=d}else this.u&&(d={},d.__data__=ga(a),a=d);h.i.push(new Cg(h.Ya++,a)),h.G==3&&Ar(h)},Ye.prototype.N=function(){this.g.l=null,delete this.j,ba(this.g),delete this.g,Ye.aa.N.call(this)};function ah(a){Ea.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var h=a.__sm__;if(h){e:{for(const d in h){a=d;break e}a=void 0}(this.i=a)&&(a=this.i,h=h!==null&&a in h?h[a]:void 0),this.data=h}else this.data=a}C(ah,Ea);function lh(){Ia.call(this),this.status=1}C(lh,Ia);function Bn(a){this.g=a}C(Bn,oh),Bn.prototype.ua=function(){qe(this.g,"a")},Bn.prototype.ta=function(a){qe(this.g,new ah(a))},Bn.prototype.sa=function(a){qe(this.g,new lh)},Bn.prototype.ra=function(){qe(this.g,"b")},Sr.prototype.createWebChannel=Sr.prototype.g,Ye.prototype.send=Ye.prototype.o,Ye.prototype.open=Ye.prototype.m,Ye.prototype.close=Ye.prototype.close,Df=function(){return new Sr},Nf=function(){return fr()},xf=rn,Qa={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},_r.NO_ERROR=0,_r.TIMEOUT=8,_r.HTTP_ERROR=6,Lr=_r,Ac.COMPLETE="complete",Vf=Ac,Ec.EventType=Gs,Gs.OPEN="a",Gs.CLOSE="b",Gs.ERROR="c",Gs.MESSAGE="d",xe.prototype.listen=xe.prototype.K,ci=Ec,pe.prototype.listenOnce=pe.prototype.L,pe.prototype.getLastError=pe.prototype.Ka,pe.prototype.getLastErrorCode=pe.prototype.Ba,pe.prototype.getStatus=pe.prototype.Z,pe.prototype.getResponseJson=pe.prototype.Oa,pe.prototype.getResponseText=pe.prototype.oa,pe.prototype.send=pe.prototype.ea,pe.prototype.setWithCredentials=pe.prototype.Ha,bf=pe}).apply(typeof Pr<"u"?Pr:typeof self<"u"?self:typeof window<"u"?window:{});const hh="@firebase/firestore",dh="4.8.0";/**
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
 */let Vs="11.10.0";/**
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
 */const Tn=new pf("@firebase/firestore");function Hn(){return Tn.logLevel}function x(s,...e){if(Tn.logLevel<=dt.DEBUG){const t=e.map(Fl);Tn.debug(`Firestore (${Vs}): ${s}`,...t)}}function ye(s,...e){if(Tn.logLevel<=dt.ERROR){const t=e.map(Fl);Tn.error(`Firestore (${Vs}): ${s}`,...t)}}function Wt(s,...e){if(Tn.logLevel<=dt.WARN){const t=e.map(Fl);Tn.warn(`Firestore (${Vs}): ${s}`,...t)}}function Fl(s){if(typeof s=="string")return s;try{/**
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
 */function F(s,e,t){let n="Unexpected state";typeof e=="string"?n=e:t=e,kf(s,n,t)}function kf(s,e,t){let n=`FIRESTORE (${Vs}) INTERNAL ASSERTION FAILED: ${e} (ID: ${s.toString(16)})`;if(t!==void 0)try{n+=" CONTEXT: "+JSON.stringify(t)}catch{n+=" CONTEXT: "+t}throw ye(n),new Error(n)}function U(s,e,t,n){let i="Unexpected state";typeof t=="string"?i=t:n=t,s||kf(e,i,n)}function L(s,e){return s}/**
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
 */const b={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class D extends Kg{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class At{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
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
 */class ly{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class uy{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(Oe.UNAUTHENTICATED))}shutdown(){}}class cy{constructor(e){this.t=e,this.currentUser=Oe.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){U(this.o===void 0,42304);let n=this.i;const i=u=>this.i!==n?(n=this.i,t(u)):Promise.resolve();let r=new At;this.o=()=>{this.i++,this.currentUser=this.u(),r.resolve(),r=new At,e.enqueueRetryable(()=>i(this.currentUser))};const o=()=>{const u=r;e.enqueueRetryable(async()=>{await u.promise,await i(this.currentUser)})},l=u=>{x("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(u=>l(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?l(u):(x("FirebaseAuthCredentialsProvider","Auth not yet detected"),r.resolve(),r=new At)}},0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(n=>this.i!==e?(x("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):n?(U(typeof n.accessToken=="string",31837,{l:n}),new ly(n.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return U(e===null||typeof e=="string",2055,{h:e}),new Oe(e)}}class hy{constructor(e,t,n){this.P=e,this.T=t,this.I=n,this.type="FirstParty",this.user=Oe.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class dy{constructor(e,t,n){this.P=e,this.T=t,this.I=n}getToken(){return Promise.resolve(new hy(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(Oe.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class fh{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class fy{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,yf(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){U(this.o===void 0,3512);const n=r=>{r.error!=null&&x("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${r.error.message}`);const o=r.token!==this.m;return this.m=r.token,x("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(r.token):Promise.resolve()};this.o=r=>{e.enqueueRetryable(()=>n(r))};const i=r=>{x("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=r,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(r=>i(r)),setTimeout(()=>{if(!this.appCheck){const r=this.V.getImmediate({optional:!0});r?i(r):x("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new fh(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(U(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new fh(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
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
 */function _y(s){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(s);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let n=0;n<s;n++)t[n]=Math.floor(256*Math.random());return t}/**
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
 */function Of(){return new TextEncoder}/**
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
 */class Ll{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let n="";for(;n.length<20;){const i=_y(40);for(let r=0;r<i.length;++r)n.length<20&&i[r]<t&&(n+=e.charAt(i[r]%62))}return n}}function G(s,e){return s<e?-1:s>e?1:0}function Ha(s,e){let t=0;for(;t<s.length&&t<e.length;){const n=s.codePointAt(t),i=e.codePointAt(t);if(n!==i){if(n<128&&i<128)return G(n,i);{const r=Of(),o=py(r.encode(_h(s,t)),r.encode(_h(e,t)));return o!==0?o:G(n,i)}}t+=n>65535?2:1}return G(s.length,e.length)}function _h(s,e){return s.codePointAt(e)>65535?s.substring(e,e+2):s.substring(e,e+1)}function py(s,e){for(let t=0;t<s.length&&t<e.length;++t)if(s[t]!==e[t])return G(s[t],e[t]);return G(s.length,e.length)}function us(s,e,t){return s.length===e.length&&s.every((n,i)=>t(n,e[i]))}function Mf(s){return s+"\0"}/**
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
 */const ph="__name__";class ct{constructor(e,t,n){t===void 0?t=0:t>e.length&&F(637,{offset:t,range:e.length}),n===void 0?n=e.length-t:n>e.length-t&&F(1746,{length:n,range:e.length-t}),this.segments=e,this.offset=t,this.len=n}get length(){return this.len}isEqual(e){return ct.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof ct?e.forEach(n=>{t.push(n)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,n=this.limit();t<n;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const n=Math.min(e.length,t.length);for(let i=0;i<n;i++){const r=ct.compareSegments(e.get(i),t.get(i));if(r!==0)return r}return G(e.length,t.length)}static compareSegments(e,t){const n=ct.isNumericId(e),i=ct.isNumericId(t);return n&&!i?-1:!n&&i?1:n&&i?ct.extractNumericId(e).compare(ct.extractNumericId(t)):Ha(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return qt.fromString(e.substring(4,e.length-2))}}class te extends ct{construct(e,t,n){return new te(e,t,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const n of e){if(n.indexOf("//")>=0)throw new D(b.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);t.push(...n.split("/").filter(i=>i.length>0))}return new te(t)}static emptyPath(){return new te([])}}const my=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class fe extends ct{construct(e,t,n){return new fe(e,t,n)}static isValidIdentifier(e){return my.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),fe.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===ph}static keyField(){return new fe([ph])}static fromServerFormat(e){const t=[];let n="",i=0;const r=()=>{if(n.length===0)throw new D(b.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(n),n=""};let o=!1;for(;i<e.length;){const l=e[i];if(l==="\\"){if(i+1===e.length)throw new D(b.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[i+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new D(b.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);n+=u,i+=2}else l==="`"?(o=!o,i++):l!=="."||o?(n+=l,i++):(r(),i++)}if(r(),o)throw new D(b.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new fe(t)}static emptyPath(){return new fe([])}}/**
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
 */function Ff(s,e,t){if(!t)throw new D(b.INVALID_ARGUMENT,`Function ${s}() cannot be called with an empty ${e}.`)}function gy(s,e,t,n){if(e===!0&&n===!0)throw new D(b.INVALID_ARGUMENT,`${s} and ${t} cannot be used together.`)}function mh(s){if(!M.isDocumentKey(s))throw new D(b.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${s} has ${s.length}.`)}function gh(s){if(M.isDocumentKey(s))throw new D(b.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${s} has ${s.length}.`)}function Lf(s){return typeof s=="object"&&s!==null&&(Object.getPrototypeOf(s)===Object.prototype||Object.getPrototypeOf(s)===null)}function ko(s){if(s===void 0)return"undefined";if(s===null)return"null";if(typeof s=="string")return s.length>20&&(s=`${s.substring(0,20)}...`),JSON.stringify(s);if(typeof s=="number"||typeof s=="boolean")return""+s;if(typeof s=="object"){if(s instanceof Array)return"an array";{const e=function(n){return n.constructor?n.constructor.name:null}(s);return e?`a custom ${e} object`:"an object"}}return typeof s=="function"?"a function":F(12329,{type:typeof s})}function wn(s,e){if("_delegate"in s&&(s=s._delegate),!(s instanceof e)){if(e.name===s.constructor.name)throw new D(b.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=ko(s);throw new D(b.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return s}/**
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
 */function ve(s,e){const t={typeString:s};return e&&(t.value=e),t}function Qi(s,e){if(!Lf(s))throw new D(b.INVALID_ARGUMENT,"JSON must be an object");let t;for(const n in e)if(e[n]){const i=e[n].typeString,r="value"in e[n]?{value:e[n].value}:void 0;if(!(n in s)){t=`JSON missing required field: '${n}'`;break}const o=s[n];if(i&&typeof o!==i){t=`JSON field '${n}' must be a ${i}.`;break}if(r!==void 0&&o!==r.value){t=`Expected '${n}' field to equal '${r.value}'`;break}}if(t)throw new D(b.INVALID_ARGUMENT,t);return!0}/**
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
 */const yh=-62135596800,Eh=1e6;class se{static now(){return se.fromMillis(Date.now())}static fromDate(e){return se.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),n=Math.floor((e-1e3*t)*Eh);return new se(t,n)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new D(b.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new D(b.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<yh)throw new D(b.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new D(b.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Eh}_compareTo(e){return this.seconds===e.seconds?G(this.nanoseconds,e.nanoseconds):G(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:se._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Qi(e,se._jsonSchema))return new se(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-yh;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}se._jsonSchemaVersion="firestore/timestamp/1.0",se._jsonSchema={type:ve("string",se._jsonSchemaVersion),seconds:ve("number"),nanoseconds:ve("number")};/**
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
 */const cs=-1;class eo{constructor(e,t,n,i){this.indexId=e,this.collectionGroup=t,this.fields=n,this.indexState=i}}function Ya(s){return s.fields.find(e=>e.kind===2)}function cn(s){return s.fields.filter(e=>e.kind!==2)}eo.UNKNOWN_ID=-1;class Ur{constructor(e,t){this.fieldPath=e,this.kind=t}}class Pi{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new Pi(0,nt.min())}}function Uf(s,e){const t=s.toTimestamp().seconds,n=s.toTimestamp().nanoseconds+1,i=q.fromTimestamp(n===1e9?new se(t+1,0):new se(t,n));return new nt(i,M.empty(),e)}function Bf(s){return new nt(s.readTime,s.key,cs)}class nt{constructor(e,t,n){this.readTime=e,this.documentKey=t,this.largestBatchId=n}static min(){return new nt(q.min(),M.empty(),cs)}static max(){return new nt(q.max(),M.empty(),cs)}}function Ul(s,e){let t=s.readTime.compareTo(e.readTime);return t!==0?t:(t=M.comparator(s.documentKey,e.documentKey),t!==0?t:G(s.largestBatchId,e.largestBatchId))}/**
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
 */const qf="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class jf{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
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
 */async function Zt(s){if(s.code!==b.FAILED_PRECONDITION||s.message!==qf)throw s;x("LocalStore","Unexpectedly lost primary lease")}/**
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
 */const Xe="SimpleDb";class Oo{static open(e,t,n,i){try{return new Oo(t,e.transaction(i,n))}catch(r){throw new _i(t,r)}}constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.S=new At,this.transaction.oncomplete=()=>{this.S.resolve()},this.transaction.onabort=()=>{t.error?this.S.reject(new _i(e,t.error)):this.S.resolve()},this.transaction.onerror=n=>{const i=Bl(n.target.error);this.S.reject(new _i(e,i))}}get D(){return this.S.promise}abort(e){e&&this.S.reject(e),this.aborted||(x(Xe,"Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}v(){const e=this.transaction;this.aborted||typeof e.commit!="function"||e.commit()}store(e){const t=this.transaction.objectStore(e);return new Ey(t)}}class jt{static delete(e){return x(Xe,"Removing database:",e),fn(Wg().indexedDB.deleteDatabase(e)).toPromise()}static C(){if(!$g())return!1;if(jt.F())return!0;const e=Jr(),t=jt.M(e),n=0<t&&t<10,i=Gf(e),r=0<i&&i<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||n||r)}static F(){var e;return typeof process<"u"&&((e=process.__PRIVATE_env)===null||e===void 0?void 0:e.O)==="YES"}static N(e,t){return e.store(t)}static M(e){const t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),n=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(n)}constructor(e,t,n){this.name=e,this.version=t,this.B=n,this.L=null,jt.M(Jr())===12.2&&ye("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}async k(e){return this.db||(x(Xe,"Opening database:",this.name),this.db=await new Promise((t,n)=>{const i=indexedDB.open(this.name,this.version);i.onsuccess=r=>{const o=r.target.result;t(o)},i.onblocked=()=>{n(new _i(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},i.onerror=r=>{const o=r.target.error;o.name==="VersionError"?n(new D(b.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):o.name==="InvalidStateError"?n(new D(b.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+o)):n(new _i(e,o))},i.onupgradeneeded=r=>{x(Xe,'Database "'+this.name+'" requires upgrade from version:',r.oldVersion);const o=r.target.result;if(this.L!==null&&this.L!==r.oldVersion)throw new Error(`refusing to open IndexedDB database due to potential corruption of the IndexedDB database data; this corruption could be caused by clicking the "clear site data" button in a web browser; try reloading the web page to re-initialize the IndexedDB database: lastClosedDbVersion=${this.L}, event.oldVersion=${r.oldVersion}, event.newVersion=${r.newVersion}, db.version=${o.version}`);this.B.q(o,i.transaction,r.oldVersion,this.version).next(()=>{x(Xe,"Database upgrade to version "+this.version+" complete")})}}),this.db.addEventListener("close",t=>{const n=t.target;this.L=n.version},{passive:!0})),this.db.addEventListener("versionchange",t=>{var n;t.newVersion===null&&(Wt('Received "versionchange" event with newVersion===null; notifying the registered DatabaseDeletedListener, if any'),(n=this.databaseDeletedListener)===null||n===void 0||n.call(this))},{passive:!0}),this.db}setDatabaseDeletedListener(e){if(this.databaseDeletedListener)throw new Error("setDatabaseDeletedListener() may only be called once, and it has already been called");this.databaseDeletedListener=e}async runTransaction(e,t,n,i){const r=t==="readonly";let o=0;for(;;){++o;try{this.db=await this.k(e);const l=Oo.open(this.db,e,r?"readonly":"readwrite",n),u=i(l).next(c=>(l.v(),c)).catch(c=>(l.abort(c),A.reject(c))).toPromise();return u.catch(()=>{}),await l.D,u}catch(l){const u=l,c=u.name!=="FirebaseError"&&o<3;if(x(Xe,"Transaction failed with error:",u.message,"Retrying:",c),this.close(),!c)return Promise.reject(u)}}}close(){this.db&&this.db.close(),this.db=void 0}}function Gf(s){const e=s.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}class yy{constructor(e){this.$=e,this.U=!1,this.K=null}get isDone(){return this.U}get W(){return this.K}set cursor(e){this.$=e}done(){this.U=!0}G(e){this.K=e}delete(){return fn(this.$.delete())}}class _i extends D{constructor(e,t){super(b.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function en(s){return s.name==="IndexedDbTransactionError"}class Ey{constructor(e){this.store=e}put(e,t){let n;return t!==void 0?(x(Xe,"PUT",this.store.name,e,t),n=this.store.put(t,e)):(x(Xe,"PUT",this.store.name,"<auto-key>",e),n=this.store.put(e)),fn(n)}add(e){return x(Xe,"ADD",this.store.name,e,e),fn(this.store.add(e))}get(e){return fn(this.store.get(e)).next(t=>(t===void 0&&(t=null),x(Xe,"GET",this.store.name,e,t),t))}delete(e){return x(Xe,"DELETE",this.store.name,e),fn(this.store.delete(e))}count(){return x(Xe,"COUNT",this.store.name),fn(this.store.count())}j(e,t){const n=this.options(e,t),i=n.index?this.store.index(n.index):this.store;if(typeof i.getAll=="function"){const r=i.getAll(n.range);return new A((o,l)=>{r.onerror=u=>{l(u.target.error)},r.onsuccess=u=>{o(u.target.result)}})}{const r=this.cursor(n),o=[];return this.J(r,(l,u)=>{o.push(u)}).next(()=>o)}}H(e,t){const n=this.store.getAll(e,t===null?void 0:t);return new A((i,r)=>{n.onerror=o=>{r(o.target.error)},n.onsuccess=o=>{i(o.target.result)}})}Y(e,t){x(Xe,"DELETE ALL",this.store.name);const n=this.options(e,t);n.Z=!1;const i=this.cursor(n);return this.J(i,(r,o,l)=>l.delete())}X(e,t){let n;t?n=e:(n={},t=e);const i=this.cursor(n);return this.J(i,t)}ee(e){const t=this.cursor({});return new A((n,i)=>{t.onerror=r=>{const o=Bl(r.target.error);i(o)},t.onsuccess=r=>{const o=r.target.result;o?e(o.primaryKey,o.value).next(l=>{l?o.continue():n()}):n()}})}J(e,t){const n=[];return new A((i,r)=>{e.onerror=o=>{r(o.target.error)},e.onsuccess=o=>{const l=o.target.result;if(!l)return void i();const u=new yy(l),c=t(l.primaryKey,l.value,u);if(c instanceof A){const f=c.catch(_=>(u.done(),A.reject(_)));n.push(f)}u.isDone?i():u.W===null?l.continue():l.continue(u.W)}}).next(()=>A.waitFor(n))}options(e,t){let n;return e!==void 0&&(typeof e=="string"?n=e:t=e),{index:n,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){const n=this.store.index(e.index);return e.Z?n.openKeyCursor(e.range,t):n.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function fn(s){return new A((e,t)=>{s.onsuccess=n=>{const i=n.target.result;e(i)},s.onerror=n=>{const i=Bl(n.target.error);t(i)}})}let Ih=!1;function Bl(s){const e=jt.M(Jr());if(e>=12.2&&e<13){const t="An internal error was encountered in the Indexed Database server";if(s.message.indexOf(t)>=0){const n=new D("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return Ih||(Ih=!0,setTimeout(()=>{throw n},0)),n}}return s}const pi="IndexBackfiller";class Iy{constructor(e,t){this.asyncQueue=e,this.te=t,this.task=null}start(){this.ne(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}ne(e){x(pi,`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,async()=>{this.task=null;try{const t=await this.te.re();x(pi,`Documents written: ${t}`)}catch(t){en(t)?x(pi,"Ignoring IndexedDB error during index backfill: ",t):await Zt(t)}await this.ne(6e4)})}}class vy{constructor(e,t){this.localStore=e,this.persistence=t}async re(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",t=>this.ie(t,e))}ie(e,t){const n=new Set;let i=t,r=!0;return A.doWhile(()=>r===!0&&i>0,()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next(o=>{if(o!==null&&!n.has(o))return x(pi,`Processing collection: ${o}`),this.se(e,o,i).next(l=>{i-=l,n.add(o)});r=!1})).next(()=>t-i)}se(e,t,n){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next(i=>this.localStore.localDocuments.getNextDocuments(e,t,i,n).next(r=>{const o=r.changes;return this.localStore.indexManager.updateIndexEntries(e,o).next(()=>this.oe(i,r)).next(l=>(x(pi,`Updating offset: ${l}`),this.localStore.indexManager.updateCollectionGroup(e,t,l))).next(()=>o.size)}))}oe(e,t){let n=e;return t.changes.forEach((i,r)=>{const o=Bf(r);Ul(o,n)>0&&(n=o)}),new nt(n.readTime,n.documentKey,Math.max(t.batchId,e.largestBatchId))}}/**
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
 */const En=-1;function Mo(s){return s==null}function bi(s){return s===0&&1/s==-1/0}function zf(s){return typeof s=="number"&&Number.isInteger(s)&&!bi(s)&&s<=Number.MAX_SAFE_INTEGER&&s>=Number.MIN_SAFE_INTEGER}/**
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
 */const to="";function Be(s){let e="";for(let t=0;t<s.length;t++)e.length>0&&(e=vh(e)),e=Ty(s.get(t),e);return vh(e)}function Ty(s,e){let t=e;const n=s.length;for(let i=0;i<n;i++){const r=s.charAt(i);switch(r){case"\0":t+="";break;case to:t+="";break;default:t+=r}}return t}function vh(s){return s+to+""}function ft(s){const e=s.length;if(U(e>=2,64408,{path:s}),e===2)return U(s.charAt(0)===to&&s.charAt(1)==="",56145,{path:s}),te.emptyPath();const t=e-2,n=[];let i="";for(let r=0;r<e;){const o=s.indexOf(to,r);switch((o<0||o>t)&&F(50515,{path:s}),s.charAt(o+1)){case"":const l=s.substring(r,o);let u;i.length===0?u=l:(i+=l,u=i,i=""),n.push(u);break;case"":i+=s.substring(r,o),i+="\0";break;case"":i+=s.substring(r,o+1);break;default:F(61167,{path:s})}r=o+2}return new te(n)}/**
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
 */const hn="remoteDocuments",Hi="owner",jn="owner",Vi="mutationQueues",wy="userId",rt="mutations",Th="batchId",gn="userMutationsIndex",wh=["userId","batchId"];/**
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
 */function Br(s,e){return[s,Be(e)]}function Kf(s,e,t){return[s,Be(e),t]}const Ay={},hs="documentMutations",no="remoteDocumentsV14",Ry=["prefixPath","collectionGroup","readTime","documentId"],qr="documentKeyIndex",Sy=["prefixPath","collectionGroup","documentId"],Wf="collectionGroupIndex",Cy=["collectionGroup","readTime","prefixPath","documentId"],xi="remoteDocumentGlobal",Xa="remoteDocumentGlobalKey",ds="targets",$f="queryTargetsIndex",Py=["canonicalId","targetId"],fs="targetDocuments",by=["targetId","path"],ql="documentTargetsIndex",Vy=["path","targetId"],so="targetGlobalKey",In="targetGlobal",Ni="collectionParents",xy=["collectionId","parent"],_s="clientMetadata",Ny="clientId",Fo="bundles",Dy="bundleId",Lo="namedQueries",ky="name",jl="indexConfiguration",Oy="indexId",Ja="collectionGroupIndex",My="collectionGroup",mi="indexState",Fy=["indexId","uid"],Qf="sequenceNumberIndex",Ly=["uid","sequenceNumber"],gi="indexEntries",Uy=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],Hf="documentKeyIndex",By=["indexId","uid","orderedDocumentKey"],Uo="documentOverlays",qy=["userId","collectionPath","documentId"],Za="collectionPathOverlayIndex",jy=["userId","collectionPath","largestBatchId"],Yf="collectionGroupOverlayIndex",Gy=["userId","collectionGroup","largestBatchId"],Gl="globals",zy="name",Xf=[Vi,rt,hs,hn,ds,Hi,In,fs,_s,xi,Ni,Fo,Lo],Ky=[...Xf,Uo],Jf=[Vi,rt,hs,no,ds,Hi,In,fs,_s,xi,Ni,Fo,Lo,Uo],Zf=Jf,zl=[...Zf,jl,mi,gi],Wy=zl,e_=[...zl,Gl],$y=e_;/**
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
 */class el extends jf{constructor(e,t){super(),this.ce=e,this.currentSequenceNumber=t}}function Ae(s,e){const t=L(s);return jt.N(t.ce,e)}/**
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
 */function Ah(s){let e=0;for(const t in s)Object.prototype.hasOwnProperty.call(s,t)&&e++;return e}function tn(s,e){for(const t in s)Object.prototype.hasOwnProperty.call(s,t)&&e(t,s[t])}function t_(s){for(const e in s)if(Object.prototype.hasOwnProperty.call(s,e))return!1;return!0}/**
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
 */let _e=class tl{constructor(e,t){this.comparator=e,this.root=t||Gt.EMPTY}insert(e,t){return new tl(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Gt.BLACK,null,null))}remove(e){return new tl(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Gt.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const n=this.comparator(e,t.key);if(n===0)return t.value;n<0?t=t.left:n>0&&(t=t.right)}return null}indexOf(e){let t=0,n=this.root;for(;!n.isEmpty();){const i=this.comparator(e,n.key);if(i===0)return t+n.left.size;i<0?n=n.left:(t+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,n)=>(e(t,n),!1))}toString(){const e=[];return this.inorderTraversal((t,n)=>(e.push(`${t}:${n}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new br(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new br(this.root,e,this.comparator,!1)}getReverseIterator(){return new br(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new br(this.root,e,this.comparator,!0)}},br=class{constructor(e,t,n,i){this.isReverse=i,this.nodeStack=[];let r=1;for(;!e.isEmpty();)if(r=t?n(e.key,t):1,t&&i&&(r*=-1),r<0)e=this.isReverse?e.left:e.right;else{if(r===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}},Gt=class vt{constructor(e,t,n,i,r){this.key=e,this.value=t,this.color=n??vt.RED,this.left=i??vt.EMPTY,this.right=r??vt.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,n,i,r){return new vt(e??this.key,t??this.value,n??this.color,i??this.left,r??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let i=this;const r=n(e,i.key);return i=r<0?i.copy(null,null,null,i.left.insert(e,t,n),null):r===0?i.copy(null,t,null,null,null):i.copy(null,null,null,null,i.right.insert(e,t,n)),i.fixUp()}removeMin(){if(this.left.isEmpty())return vt.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let n,i=this;if(t(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),t(e,i.key)===0){if(i.right.isEmpty())return vt.EMPTY;n=i.right.min(),i=i.copy(n.key,n.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,vt.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,vt.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw F(43730,{key:this.key,value:this.value});if(this.right.isRed())throw F(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw F(27949);return e+(this.isRed()?0:1)}};Gt.EMPTY=null,Gt.RED=!0,Gt.BLACK=!1;Gt.EMPTY=new class{constructor(){this.size=0}get key(){throw F(57766)}get value(){throw F(16141)}get color(){throw F(16727)}get left(){throw F(29726)}get right(){throw F(36894)}copy(e,t,n,i,r){return this}insert(e,t,n){return new Gt(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class re{constructor(e){this.comparator=e,this.data=new _e(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,n)=>(e(t),!1))}forEachInRange(e,t){const n=this.data.getIteratorFrom(e[0]);for(;n.hasNext();){const i=n.getNext();if(this.comparator(i.key,e[1])>=0)return;t(i.key)}}forEachWhile(e,t){let n;for(n=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();n.hasNext();)if(!e(n.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Rh(this.data.getIterator())}getIteratorFrom(e){return new Rh(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(n=>{t=t.add(n)}),t}isEqual(e){if(!(e instanceof re)||this.size!==e.size)return!1;const t=this.data.getIterator(),n=e.data.getIterator();for(;t.hasNext();){const i=t.getNext().key,r=n.getNext().key;if(this.comparator(i,r)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new re(this.comparator);return t.data=e,t}}class Rh{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function Gn(s){return s.hasNext()?s.getNext():void 0}/**
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
 */class We{constructor(e){this.fields=e,e.sort(fe.comparator)}static empty(){return new We([])}unionWith(e){let t=new re(fe.comparator);for(const n of this.fields)t=t.add(n);for(const n of e)t=t.add(n);return new We(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return us(this.fields,e.fields,(t,n)=>t.isEqual(n))}}/**
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
 */class n_ extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class Ee{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(i){try{return atob(i)}catch(r){throw typeof DOMException<"u"&&r instanceof DOMException?new n_("Invalid base64 string: "+r):r}}(e);return new Ee(t)}static fromUint8Array(e){const t=function(i){let r="";for(let o=0;o<i.length;++o)r+=String.fromCharCode(i[o]);return r}(e);return new Ee(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const n=new Uint8Array(t.length);for(let i=0;i<t.length;i++)n[i]=t.charCodeAt(i);return n}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return G(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Ee.EMPTY_BYTE_STRING=new Ee("");const Qy=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function St(s){if(U(!!s,39018),typeof s=="string"){let e=0;const t=Qy.exec(s);if(U(!!t,46558,{timestamp:s}),t[1]){let i=t[1];i=(i+"000000000").substr(0,9),e=Number(i)}const n=new Date(s);return{seconds:Math.floor(n.getTime()/1e3),nanos:e}}return{seconds:de(s.seconds),nanos:de(s.nanos)}}function de(s){return typeof s=="number"?s:typeof s=="string"?Number(s):0}function Ct(s){return typeof s=="string"?Ee.fromBase64String(s):Ee.fromUint8Array(s)}/**
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
 */const s_="server_timestamp",i_="__type__",r_="__previous_value__",o_="__local_write_time__";function Kl(s){var e,t;return((t=(((e=s==null?void 0:s.mapValue)===null||e===void 0?void 0:e.fields)||{})[i_])===null||t===void 0?void 0:t.stringValue)===s_}function Bo(s){const e=s.mapValue.fields[r_];return Kl(e)?Bo(e):e}function Di(s){const e=St(s.mapValue.fields[o_].timestampValue);return new se(e.seconds,e.nanos)}/**
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
 */class Hy{constructor(e,t,n,i,r,o,l,u,c,f){this.databaseId=e,this.appId=t,this.persistenceKey=n,this.host=i,this.ssl=r,this.forceLongPolling=o,this.autoDetectLongPolling=l,this.longPollingOptions=u,this.useFetchStreams=c,this.isUsingEmulator=f}}const io="(default)";class An{constructor(e,t){this.projectId=e,this.database=t||io}static empty(){return new An("","")}get isDefaultDatabase(){return this.database===io}isEqual(e){return e instanceof An&&e.projectId===this.projectId&&e.database===this.database}}/**
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
 */const Wl="__type__",a_="__max__",Bt={mapValue:{fields:{__type__:{stringValue:a_}}}},$l="__vector__",ps="value",jr={nullValue:"NULL_VALUE"};function $t(s){return"nullValue"in s?0:"booleanValue"in s?1:"integerValue"in s||"doubleValue"in s?2:"timestampValue"in s?3:"stringValue"in s?5:"bytesValue"in s?6:"referenceValue"in s?7:"geoPointValue"in s?8:"arrayValue"in s?9:"mapValue"in s?Kl(s)?4:l_(s)?9007199254740991:qo(s)?10:11:F(28295,{value:s})}function gt(s,e){if(s===e)return!0;const t=$t(s);if(t!==$t(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return s.booleanValue===e.booleanValue;case 4:return Di(s).isEqual(Di(e));case 3:return function(i,r){if(typeof i.timestampValue=="string"&&typeof r.timestampValue=="string"&&i.timestampValue.length===r.timestampValue.length)return i.timestampValue===r.timestampValue;const o=St(i.timestampValue),l=St(r.timestampValue);return o.seconds===l.seconds&&o.nanos===l.nanos}(s,e);case 5:return s.stringValue===e.stringValue;case 6:return function(i,r){return Ct(i.bytesValue).isEqual(Ct(r.bytesValue))}(s,e);case 7:return s.referenceValue===e.referenceValue;case 8:return function(i,r){return de(i.geoPointValue.latitude)===de(r.geoPointValue.latitude)&&de(i.geoPointValue.longitude)===de(r.geoPointValue.longitude)}(s,e);case 2:return function(i,r){if("integerValue"in i&&"integerValue"in r)return de(i.integerValue)===de(r.integerValue);if("doubleValue"in i&&"doubleValue"in r){const o=de(i.doubleValue),l=de(r.doubleValue);return o===l?bi(o)===bi(l):isNaN(o)&&isNaN(l)}return!1}(s,e);case 9:return us(s.arrayValue.values||[],e.arrayValue.values||[],gt);case 10:case 11:return function(i,r){const o=i.mapValue.fields||{},l=r.mapValue.fields||{};if(Ah(o)!==Ah(l))return!1;for(const u in o)if(o.hasOwnProperty(u)&&(l[u]===void 0||!gt(o[u],l[u])))return!1;return!0}(s,e);default:return F(52216,{left:s})}}function ki(s,e){return(s.values||[]).find(t=>gt(t,e))!==void 0}function Qt(s,e){if(s===e)return 0;const t=$t(s),n=$t(e);if(t!==n)return G(t,n);switch(t){case 0:case 9007199254740991:return 0;case 1:return G(s.booleanValue,e.booleanValue);case 2:return function(r,o){const l=de(r.integerValue||r.doubleValue),u=de(o.integerValue||o.doubleValue);return l<u?-1:l>u?1:l===u?0:isNaN(l)?isNaN(u)?0:-1:1}(s,e);case 3:return Sh(s.timestampValue,e.timestampValue);case 4:return Sh(Di(s),Di(e));case 5:return Ha(s.stringValue,e.stringValue);case 6:return function(r,o){const l=Ct(r),u=Ct(o);return l.compareTo(u)}(s.bytesValue,e.bytesValue);case 7:return function(r,o){const l=r.split("/"),u=o.split("/");for(let c=0;c<l.length&&c<u.length;c++){const f=G(l[c],u[c]);if(f!==0)return f}return G(l.length,u.length)}(s.referenceValue,e.referenceValue);case 8:return function(r,o){const l=G(de(r.latitude),de(o.latitude));return l!==0?l:G(de(r.longitude),de(o.longitude))}(s.geoPointValue,e.geoPointValue);case 9:return Ch(s.arrayValue,e.arrayValue);case 10:return function(r,o){var l,u,c,f;const _=r.fields||{},m=o.fields||{},T=(l=_[ps])===null||l===void 0?void 0:l.arrayValue,C=(u=m[ps])===null||u===void 0?void 0:u.arrayValue,V=G(((c=T==null?void 0:T.values)===null||c===void 0?void 0:c.length)||0,((f=C==null?void 0:C.values)===null||f===void 0?void 0:f.length)||0);return V!==0?V:Ch(T,C)}(s.mapValue,e.mapValue);case 11:return function(r,o){if(r===Bt.mapValue&&o===Bt.mapValue)return 0;if(r===Bt.mapValue)return 1;if(o===Bt.mapValue)return-1;const l=r.fields||{},u=Object.keys(l),c=o.fields||{},f=Object.keys(c);u.sort(),f.sort();for(let _=0;_<u.length&&_<f.length;++_){const m=Ha(u[_],f[_]);if(m!==0)return m;const T=Qt(l[u[_]],c[f[_]]);if(T!==0)return T}return G(u.length,f.length)}(s.mapValue,e.mapValue);default:throw F(23264,{le:t})}}function Sh(s,e){if(typeof s=="string"&&typeof e=="string"&&s.length===e.length)return G(s,e);const t=St(s),n=St(e),i=G(t.seconds,n.seconds);return i!==0?i:G(t.nanos,n.nanos)}function Ch(s,e){const t=s.values||[],n=e.values||[];for(let i=0;i<t.length&&i<n.length;++i){const r=Qt(t[i],n[i]);if(r)return r}return G(t.length,n.length)}function ms(s){return nl(s)}function nl(s){return"nullValue"in s?"null":"booleanValue"in s?""+s.booleanValue:"integerValue"in s?""+s.integerValue:"doubleValue"in s?""+s.doubleValue:"timestampValue"in s?function(t){const n=St(t);return`time(${n.seconds},${n.nanos})`}(s.timestampValue):"stringValue"in s?s.stringValue:"bytesValue"in s?function(t){return Ct(t).toBase64()}(s.bytesValue):"referenceValue"in s?function(t){return M.fromName(t).toString()}(s.referenceValue):"geoPointValue"in s?function(t){return`geo(${t.latitude},${t.longitude})`}(s.geoPointValue):"arrayValue"in s?function(t){let n="[",i=!0;for(const r of t.values||[])i?i=!1:n+=",",n+=nl(r);return n+"]"}(s.arrayValue):"mapValue"in s?function(t){const n=Object.keys(t.fields||{}).sort();let i="{",r=!0;for(const o of n)r?r=!1:i+=",",i+=`${o}:${nl(t.fields[o])}`;return i+"}"}(s.mapValue):F(61005,{value:s})}function Gr(s){switch($t(s)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=Bo(s);return e?16+Gr(e):16;case 5:return 2*s.stringValue.length;case 6:return Ct(s.bytesValue).approximateByteSize();case 7:return s.referenceValue.length;case 9:return function(n){return(n.values||[]).reduce((i,r)=>i+Gr(r),0)}(s.arrayValue);case 10:case 11:return function(n){let i=0;return tn(n.fields,(r,o)=>{i+=r.length+Gr(o)}),i}(s.mapValue);default:throw F(13486,{value:s})}}function Oi(s,e){return{referenceValue:`projects/${s.projectId}/databases/${s.database}/documents/${e.path.canonicalString()}`}}function sl(s){return!!s&&"integerValue"in s}function Mi(s){return!!s&&"arrayValue"in s}function Ph(s){return!!s&&"nullValue"in s}function bh(s){return!!s&&"doubleValue"in s&&isNaN(Number(s.doubleValue))}function zr(s){return!!s&&"mapValue"in s}function qo(s){var e,t;return((t=(((e=s==null?void 0:s.mapValue)===null||e===void 0?void 0:e.fields)||{})[Wl])===null||t===void 0?void 0:t.stringValue)===$l}function yi(s){if(s.geoPointValue)return{geoPointValue:Object.assign({},s.geoPointValue)};if(s.timestampValue&&typeof s.timestampValue=="object")return{timestampValue:Object.assign({},s.timestampValue)};if(s.mapValue){const e={mapValue:{fields:{}}};return tn(s.mapValue.fields,(t,n)=>e.mapValue.fields[t]=yi(n)),e}if(s.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(s.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=yi(s.arrayValue.values[t]);return e}return Object.assign({},s)}function l_(s){return(((s.mapValue||{}).fields||{}).__type__||{}).stringValue===a_}const u_={mapValue:{fields:{[Wl]:{stringValue:$l},[ps]:{arrayValue:{}}}}};function Yy(s){return"nullValue"in s?jr:"booleanValue"in s?{booleanValue:!1}:"integerValue"in s||"doubleValue"in s?{doubleValue:NaN}:"timestampValue"in s?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in s?{stringValue:""}:"bytesValue"in s?{bytesValue:""}:"referenceValue"in s?Oi(An.empty(),M.empty()):"geoPointValue"in s?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in s?{arrayValue:{}}:"mapValue"in s?qo(s)?u_:{mapValue:{}}:F(35942,{value:s})}function Xy(s){return"nullValue"in s?{booleanValue:!1}:"booleanValue"in s?{doubleValue:NaN}:"integerValue"in s||"doubleValue"in s?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in s?{stringValue:""}:"stringValue"in s?{bytesValue:""}:"bytesValue"in s?Oi(An.empty(),M.empty()):"referenceValue"in s?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in s?{arrayValue:{}}:"arrayValue"in s?u_:"mapValue"in s?qo(s)?{mapValue:{}}:Bt:F(61959,{value:s})}function Vh(s,e){const t=Qt(s.value,e.value);return t!==0?t:s.inclusive&&!e.inclusive?-1:!s.inclusive&&e.inclusive?1:0}function xh(s,e){const t=Qt(s.value,e.value);return t!==0?t:s.inclusive&&!e.inclusive?1:!s.inclusive&&e.inclusive?-1:0}/**
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
 */class Ue{constructor(e){this.value=e}static empty(){return new Ue({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let n=0;n<e.length-1;++n)if(t=(t.mapValue.fields||{})[e.get(n)],!zr(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=yi(t)}setAll(e){let t=fe.emptyPath(),n={},i=[];e.forEach((o,l)=>{if(!t.isImmediateParentOf(l)){const u=this.getFieldsMap(t);this.applyChanges(u,n,i),n={},i=[],t=l.popLast()}o?n[l.lastSegment()]=yi(o):i.push(l.lastSegment())});const r=this.getFieldsMap(t);this.applyChanges(r,n,i)}delete(e){const t=this.field(e.popLast());zr(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return gt(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let n=0;n<e.length;++n){let i=t.mapValue.fields[e.get(n)];zr(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},t.mapValue.fields[e.get(n)]=i),t=i}return t.mapValue.fields}applyChanges(e,t,n){tn(t,(i,r)=>e[i]=r);for(const i of n)delete e[i]}clone(){return new Ue(yi(this.value))}}function c_(s){const e=[];return tn(s.fields,(t,n)=>{const i=new fe([t]);if(zr(n)){const r=c_(n.mapValue).fields;if(r.length===0)e.push(i);else for(const o of r)e.push(i.child(o))}else e.push(i)}),new We(e)}/**
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
 */class gs{constructor(e,t){this.position=e,this.inclusive=t}}function Nh(s,e,t){let n=0;for(let i=0;i<s.position.length;i++){const r=e[i],o=s.position[i];if(r.field.isKeyField()?n=M.comparator(M.fromName(o.referenceValue),t.key):n=Qt(o,t.data.field(r.field)),r.dir==="desc"&&(n*=-1),n!==0)break}return n}function Dh(s,e){if(s===null)return e===null;if(e===null||s.inclusive!==e.inclusive||s.position.length!==e.position.length)return!1;for(let t=0;t<s.position.length;t++)if(!gt(s.position[t],e.position[t]))return!1;return!0}/**
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
 */class Fi{constructor(e,t="asc"){this.field=e,this.dir=t}}function Jy(s,e){return s.dir===e.dir&&s.field.isEqual(e.field)}/**
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
 */class h_{}class Y extends h_{constructor(e,t,n){super(),this.field=e,this.op=t,this.value=n}static create(e,t,n){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,n):new Zy(e,t,n):t==="array-contains"?new nE(e,n):t==="in"?new g_(e,n):t==="not-in"?new sE(e,n):t==="array-contains-any"?new iE(e,n):new Y(e,t,n)}static createKeyFieldInFilter(e,t,n){return t==="in"?new eE(e,n):new tE(e,n)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(Qt(t,this.value)):t!==null&&$t(this.value)===$t(t)&&this.matchesComparison(Qt(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return F(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class ie extends h_{constructor(e,t){super(),this.filters=e,this.op=t,this.he=null}static create(e,t){return new ie(e,t)}matches(e){return ys(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.he!==null||(this.he=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.he}getFilters(){return Object.assign([],this.filters)}}function ys(s){return s.op==="and"}function il(s){return s.op==="or"}function Ql(s){return d_(s)&&ys(s)}function d_(s){for(const e of s.filters)if(e instanceof ie)return!1;return!0}function rl(s){if(s instanceof Y)return s.field.canonicalString()+s.op.toString()+ms(s.value);if(Ql(s))return s.filters.map(e=>rl(e)).join(",");{const e=s.filters.map(t=>rl(t)).join(",");return`${s.op}(${e})`}}function f_(s,e){return s instanceof Y?function(n,i){return i instanceof Y&&n.op===i.op&&n.field.isEqual(i.field)&&gt(n.value,i.value)}(s,e):s instanceof ie?function(n,i){return i instanceof ie&&n.op===i.op&&n.filters.length===i.filters.length?n.filters.reduce((r,o,l)=>r&&f_(o,i.filters[l]),!0):!1}(s,e):void F(19439)}function __(s,e){const t=s.filters.concat(e);return ie.create(t,s.op)}function p_(s){return s instanceof Y?function(t){return`${t.field.canonicalString()} ${t.op} ${ms(t.value)}`}(s):s instanceof ie?function(t){return t.op.toString()+" {"+t.getFilters().map(p_).join(" ,")+"}"}(s):"Filter"}class Zy extends Y{constructor(e,t,n){super(e,t,n),this.key=M.fromName(n.referenceValue)}matches(e){const t=M.comparator(e.key,this.key);return this.matchesComparison(t)}}class eE extends Y{constructor(e,t){super(e,"in",t),this.keys=m_("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class tE extends Y{constructor(e,t){super(e,"not-in",t),this.keys=m_("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function m_(s,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(n=>M.fromName(n.referenceValue))}class nE extends Y{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Mi(t)&&ki(t.arrayValue,this.value)}}class g_ extends Y{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&ki(this.value.arrayValue,t)}}class sE extends Y{constructor(e,t){super(e,"not-in",t)}matches(e){if(ki(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!ki(this.value.arrayValue,t)}}class iE extends Y{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Mi(t)||!t.arrayValue.values)&&t.arrayValue.values.some(n=>ki(this.value.arrayValue,n))}}/**
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
 */class rE{constructor(e,t=null,n=[],i=[],r=null,o=null,l=null){this.path=e,this.collectionGroup=t,this.orderBy=n,this.filters=i,this.limit=r,this.startAt=o,this.endAt=l,this.Pe=null}}function ol(s,e=null,t=[],n=[],i=null,r=null,o=null){return new rE(s,e,t,n,i,r,o)}function Rn(s){const e=L(s);if(e.Pe===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(n=>rl(n)).join(","),t+="|ob:",t+=e.orderBy.map(n=>function(r){return r.field.canonicalString()+r.dir}(n)).join(","),Mo(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(n=>ms(n)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(n=>ms(n)).join(",")),e.Pe=t}return e.Pe}function Yi(s,e){if(s.limit!==e.limit||s.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<s.orderBy.length;t++)if(!Jy(s.orderBy[t],e.orderBy[t]))return!1;if(s.filters.length!==e.filters.length)return!1;for(let t=0;t<s.filters.length;t++)if(!f_(s.filters[t],e.filters[t]))return!1;return s.collectionGroup===e.collectionGroup&&!!s.path.isEqual(e.path)&&!!Dh(s.startAt,e.startAt)&&Dh(s.endAt,e.endAt)}function ro(s){return M.isDocumentKey(s.path)&&s.collectionGroup===null&&s.filters.length===0}function oo(s,e){return s.filters.filter(t=>t instanceof Y&&t.field.isEqual(e))}function kh(s,e,t){let n=jr,i=!0;for(const r of oo(s,e)){let o=jr,l=!0;switch(r.op){case"<":case"<=":o=Yy(r.value);break;case"==":case"in":case">=":o=r.value;break;case">":o=r.value,l=!1;break;case"!=":case"not-in":o=jr}Vh({value:n,inclusive:i},{value:o,inclusive:l})<0&&(n=o,i=l)}if(t!==null){for(let r=0;r<s.orderBy.length;++r)if(s.orderBy[r].field.isEqual(e)){const o=t.position[r];Vh({value:n,inclusive:i},{value:o,inclusive:t.inclusive})<0&&(n=o,i=t.inclusive);break}}return{value:n,inclusive:i}}function Oh(s,e,t){let n=Bt,i=!0;for(const r of oo(s,e)){let o=Bt,l=!0;switch(r.op){case">=":case">":o=Xy(r.value),l=!1;break;case"==":case"in":case"<=":o=r.value;break;case"<":o=r.value,l=!1;break;case"!=":case"not-in":o=Bt}xh({value:n,inclusive:i},{value:o,inclusive:l})>0&&(n=o,i=l)}if(t!==null){for(let r=0;r<s.orderBy.length;++r)if(s.orderBy[r].field.isEqual(e)){const o=t.position[r];xh({value:n,inclusive:i},{value:o,inclusive:t.inclusive})>0&&(n=o,i=t.inclusive);break}}return{value:n,inclusive:i}}/**
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
 */class xs{constructor(e,t=null,n=[],i=[],r=null,o="F",l=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=n,this.filters=i,this.limit=r,this.limitType=o,this.startAt=l,this.endAt=u,this.Te=null,this.Ie=null,this.de=null,this.startAt,this.endAt}}function y_(s,e,t,n,i,r,o,l){return new xs(s,e,t,n,i,r,o,l)}function Hl(s){return new xs(s)}function Mh(s){return s.filters.length===0&&s.limit===null&&s.startAt==null&&s.endAt==null&&(s.explicitOrderBy.length===0||s.explicitOrderBy.length===1&&s.explicitOrderBy[0].field.isKeyField())}function E_(s){return s.collectionGroup!==null}function Ei(s){const e=L(s);if(e.Te===null){e.Te=[];const t=new Set;for(const r of e.explicitOrderBy)e.Te.push(r),t.add(r.field.canonicalString());const n=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let l=new re(fe.comparator);return o.filters.forEach(u=>{u.getFlattenedFilters().forEach(c=>{c.isInequality()&&(l=l.add(c.field))})}),l})(e).forEach(r=>{t.has(r.canonicalString())||r.isKeyField()||e.Te.push(new Fi(r,n))}),t.has(fe.keyField().canonicalString())||e.Te.push(new Fi(fe.keyField(),n))}return e.Te}function Ze(s){const e=L(s);return e.Ie||(e.Ie=oE(e,Ei(s))),e.Ie}function oE(s,e){if(s.limitType==="F")return ol(s.path,s.collectionGroup,e,s.filters,s.limit,s.startAt,s.endAt);{e=e.map(i=>{const r=i.dir==="desc"?"asc":"desc";return new Fi(i.field,r)});const t=s.endAt?new gs(s.endAt.position,s.endAt.inclusive):null,n=s.startAt?new gs(s.startAt.position,s.startAt.inclusive):null;return ol(s.path,s.collectionGroup,e,s.filters,s.limit,t,n)}}function al(s,e){const t=s.filters.concat([e]);return new xs(s.path,s.collectionGroup,s.explicitOrderBy.slice(),t,s.limit,s.limitType,s.startAt,s.endAt)}function ll(s,e,t){return new xs(s.path,s.collectionGroup,s.explicitOrderBy.slice(),s.filters.slice(),e,t,s.startAt,s.endAt)}function jo(s,e){return Yi(Ze(s),Ze(e))&&s.limitType===e.limitType}function I_(s){return`${Rn(Ze(s))}|lt:${s.limitType}`}function Yn(s){return`Query(target=${function(t){let n=t.path.canonicalString();return t.collectionGroup!==null&&(n+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(n+=`, filters: [${t.filters.map(i=>p_(i)).join(", ")}]`),Mo(t.limit)||(n+=", limit: "+t.limit),t.orderBy.length>0&&(n+=`, orderBy: [${t.orderBy.map(i=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(i)).join(", ")}]`),t.startAt&&(n+=", startAt: ",n+=t.startAt.inclusive?"b:":"a:",n+=t.startAt.position.map(i=>ms(i)).join(",")),t.endAt&&(n+=", endAt: ",n+=t.endAt.inclusive?"a:":"b:",n+=t.endAt.position.map(i=>ms(i)).join(",")),`Target(${n})`}(Ze(s))}; limitType=${s.limitType})`}function Xi(s,e){return e.isFoundDocument()&&function(n,i){const r=i.key.path;return n.collectionGroup!==null?i.key.hasCollectionId(n.collectionGroup)&&n.path.isPrefixOf(r):M.isDocumentKey(n.path)?n.path.isEqual(r):n.path.isImmediateParentOf(r)}(s,e)&&function(n,i){for(const r of Ei(n))if(!r.field.isKeyField()&&i.data.field(r.field)===null)return!1;return!0}(s,e)&&function(n,i){for(const r of n.filters)if(!r.matches(i))return!1;return!0}(s,e)&&function(n,i){return!(n.startAt&&!function(o,l,u){const c=Nh(o,l,u);return o.inclusive?c<=0:c<0}(n.startAt,Ei(n),i)||n.endAt&&!function(o,l,u){const c=Nh(o,l,u);return o.inclusive?c>=0:c>0}(n.endAt,Ei(n),i))}(s,e)}function v_(s){return s.collectionGroup||(s.path.length%2==1?s.path.lastSegment():s.path.get(s.path.length-2))}function T_(s){return(e,t)=>{let n=!1;for(const i of Ei(s)){const r=aE(i,e,t);if(r!==0)return r;n=n||i.field.isKeyField()}return 0}}function aE(s,e,t){const n=s.field.isKeyField()?M.comparator(e.key,t.key):function(r,o,l){const u=o.data.field(r),c=l.data.field(r);return u!==null&&c!==null?Qt(u,c):F(42886)}(s.field,e,t);switch(s.dir){case"asc":return n;case"desc":return-1*n;default:return F(19790,{direction:s.dir})}}/**
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
 */class Vt{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),n=this.inner[t];if(n!==void 0){for(const[i,r]of n)if(this.equalsFn(i,e))return r}}has(e){return this.get(e)!==void 0}set(e,t){const n=this.mapKeyFn(e),i=this.inner[n];if(i===void 0)return this.inner[n]=[[e,t]],void this.innerSize++;for(let r=0;r<i.length;r++)if(this.equalsFn(i[r][0],e))return void(i[r]=[e,t]);i.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),n=this.inner[t];if(n===void 0)return!1;for(let i=0;i<n.length;i++)if(this.equalsFn(n[i][0],e))return n.length===1?delete this.inner[t]:n.splice(i,1),this.innerSize--,!0;return!1}forEach(e){tn(this.inner,(t,n)=>{for(const[i,r]of n)e(i,r)})}isEmpty(){return t_(this.inner)}size(){return this.innerSize}}/**
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
 */const lE=new _e(M.comparator);function Je(){return lE}const w_=new _e(M.comparator);function hi(...s){let e=w_;for(const t of s)e=e.insert(t.key,t);return e}function A_(s){let e=w_;return s.forEach((t,n)=>e=e.insert(t,n.overlayedDocument)),e}function _t(){return Ii()}function R_(){return Ii()}function Ii(){return new Vt(s=>s.toString(),(s,e)=>s.isEqual(e))}const uE=new _e(M.comparator),cE=new re(M.comparator);function W(...s){let e=cE;for(const t of s)e=e.add(t);return e}const hE=new re(G);function Yl(){return hE}/**
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
 */function Xl(s,e){if(s.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:bi(e)?"-0":e}}function S_(s){return{integerValue:""+s}}function dE(s,e){return zf(e)?S_(e):Xl(s,e)}/**
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
 */class Go{constructor(){this._=void 0}}function fE(s,e,t){return s instanceof Es?function(i,r){const o={fields:{[i_]:{stringValue:s_},[o_]:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return r&&Kl(r)&&(r=Bo(r)),r&&(o.fields[r_]=r),{mapValue:o}}(t,e):s instanceof Is?P_(s,e):s instanceof vs?b_(s,e):function(i,r){const o=C_(i,r),l=Fh(o)+Fh(i.Ee);return sl(o)&&sl(i.Ee)?S_(l):Xl(i.serializer,l)}(s,e)}function _E(s,e,t){return s instanceof Is?P_(s,e):s instanceof vs?b_(s,e):t}function C_(s,e){return s instanceof Li?function(n){return sl(n)||function(r){return!!r&&"doubleValue"in r}(n)}(e)?e:{integerValue:0}:null}class Es extends Go{}class Is extends Go{constructor(e){super(),this.elements=e}}function P_(s,e){const t=V_(e);for(const n of s.elements)t.some(i=>gt(i,n))||t.push(n);return{arrayValue:{values:t}}}class vs extends Go{constructor(e){super(),this.elements=e}}function b_(s,e){let t=V_(e);for(const n of s.elements)t=t.filter(i=>!gt(i,n));return{arrayValue:{values:t}}}class Li extends Go{constructor(e,t){super(),this.serializer=e,this.Ee=t}}function Fh(s){return de(s.integerValue||s.doubleValue)}function V_(s){return Mi(s)&&s.arrayValue.values?s.arrayValue.values.slice():[]}/**
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
 */class x_{constructor(e,t){this.field=e,this.transform=t}}function pE(s,e){return s.field.isEqual(e.field)&&function(n,i){return n instanceof Is&&i instanceof Is||n instanceof vs&&i instanceof vs?us(n.elements,i.elements,gt):n instanceof Li&&i instanceof Li?gt(n.Ee,i.Ee):n instanceof Es&&i instanceof Es}(s.transform,e.transform)}class mE{constructor(e,t){this.version=e,this.transformResults=t}}class Ge{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Ge}static exists(e){return new Ge(void 0,e)}static updateTime(e){return new Ge(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Kr(s,e){return s.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(s.updateTime):s.exists===void 0||s.exists===e.isFoundDocument()}class zo{}function N_(s,e){if(!s.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return s.isNoDocument()?new Jl(s.key,Ge.none()):new Ns(s.key,s.data,Ge.none());{const t=s.data,n=Ue.empty();let i=new re(fe.comparator);for(let r of e.fields)if(!i.has(r)){let o=t.field(r);o===null&&r.length>1&&(r=r.popLast(),o=t.field(r)),o===null?n.delete(r):n.set(r,o),i=i.add(r)}return new xt(s.key,n,new We(i.toArray()),Ge.none())}}function gE(s,e,t){s instanceof Ns?function(i,r,o){const l=i.value.clone(),u=Uh(i.fieldTransforms,r,o.transformResults);l.setAll(u),r.convertToFoundDocument(o.version,l).setHasCommittedMutations()}(s,e,t):s instanceof xt?function(i,r,o){if(!Kr(i.precondition,r))return void r.convertToUnknownDocument(o.version);const l=Uh(i.fieldTransforms,r,o.transformResults),u=r.data;u.setAll(D_(i)),u.setAll(l),r.convertToFoundDocument(o.version,u).setHasCommittedMutations()}(s,e,t):function(i,r,o){r.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,t)}function vi(s,e,t,n){return s instanceof Ns?function(r,o,l,u){if(!Kr(r.precondition,o))return l;const c=r.value.clone(),f=Bh(r.fieldTransforms,u,o);return c.setAll(f),o.convertToFoundDocument(o.version,c).setHasLocalMutations(),null}(s,e,t,n):s instanceof xt?function(r,o,l,u){if(!Kr(r.precondition,o))return l;const c=Bh(r.fieldTransforms,u,o),f=o.data;return f.setAll(D_(r)),f.setAll(c),o.convertToFoundDocument(o.version,f).setHasLocalMutations(),l===null?null:l.unionWith(r.fieldMask.fields).unionWith(r.fieldTransforms.map(_=>_.field))}(s,e,t,n):function(r,o,l){return Kr(r.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):l}(s,e,t)}function yE(s,e){let t=null;for(const n of s.fieldTransforms){const i=e.data.field(n.field),r=C_(n.transform,i||null);r!=null&&(t===null&&(t=Ue.empty()),t.set(n.field,r))}return t||null}function Lh(s,e){return s.type===e.type&&!!s.key.isEqual(e.key)&&!!s.precondition.isEqual(e.precondition)&&!!function(n,i){return n===void 0&&i===void 0||!(!n||!i)&&us(n,i,(r,o)=>pE(r,o))}(s.fieldTransforms,e.fieldTransforms)&&(s.type===0?s.value.isEqual(e.value):s.type!==1||s.data.isEqual(e.data)&&s.fieldMask.isEqual(e.fieldMask))}class Ns extends zo{constructor(e,t,n,i=[]){super(),this.key=e,this.value=t,this.precondition=n,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class xt extends zo{constructor(e,t,n,i,r=[]){super(),this.key=e,this.data=t,this.fieldMask=n,this.precondition=i,this.fieldTransforms=r,this.type=1}getFieldMask(){return this.fieldMask}}function D_(s){const e=new Map;return s.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const n=s.data.field(t);e.set(t,n)}}),e}function Uh(s,e,t){const n=new Map;U(s.length===t.length,32656,{Ae:t.length,Re:s.length});for(let i=0;i<t.length;i++){const r=s[i],o=r.transform,l=e.data.field(r.field);n.set(r.field,_E(o,l,t[i]))}return n}function Bh(s,e,t){const n=new Map;for(const i of s){const r=i.transform,o=t.data.field(i.field);n.set(i.field,fE(r,o,e))}return n}class Jl extends zo{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class k_ extends zo{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class Zl{constructor(e,t,n,i){this.batchId=e,this.localWriteTime=t,this.baseMutations=n,this.mutations=i}applyToRemoteDocument(e,t){const n=t.mutationResults;for(let i=0;i<this.mutations.length;i++){const r=this.mutations[i];r.key.isEqual(e.key)&&gE(r,e,n[i])}}applyToLocalView(e,t){for(const n of this.baseMutations)n.key.isEqual(e.key)&&(t=vi(n,e,t,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(e.key)&&(t=vi(n,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const n=R_();return this.mutations.forEach(i=>{const r=e.get(i.key),o=r.overlayedDocument;let l=this.applyToLocalView(o,r.mutatedFields);l=t.has(i.key)?null:l;const u=N_(o,l);u!==null&&n.set(i.key,u),o.isValidDocument()||o.convertToNoDocument(q.min())}),n}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),W())}isEqual(e){return this.batchId===e.batchId&&us(this.mutations,e.mutations,(t,n)=>Lh(t,n))&&us(this.baseMutations,e.baseMutations,(t,n)=>Lh(t,n))}}class eu{constructor(e,t,n,i){this.batch=e,this.commitVersion=t,this.mutationResults=n,this.docVersions=i}static from(e,t,n){U(e.mutations.length===n.length,58842,{Ve:e.mutations.length,me:n.length});let i=function(){return uE}();const r=e.mutations;for(let o=0;o<r.length;o++)i=i.insert(r[o].key,n[o].version);return new eu(e,t,n,i)}}/**
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
 */class tu{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
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
 */class EE{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
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
 */var Ie,X;function IE(s){switch(s){case b.OK:return F(64938);case b.CANCELLED:case b.UNKNOWN:case b.DEADLINE_EXCEEDED:case b.RESOURCE_EXHAUSTED:case b.INTERNAL:case b.UNAVAILABLE:case b.UNAUTHENTICATED:return!1;case b.INVALID_ARGUMENT:case b.NOT_FOUND:case b.ALREADY_EXISTS:case b.PERMISSION_DENIED:case b.FAILED_PRECONDITION:case b.ABORTED:case b.OUT_OF_RANGE:case b.UNIMPLEMENTED:case b.DATA_LOSS:return!0;default:return F(15467,{code:s})}}function O_(s){if(s===void 0)return ye("GRPC error has no .code"),b.UNKNOWN;switch(s){case Ie.OK:return b.OK;case Ie.CANCELLED:return b.CANCELLED;case Ie.UNKNOWN:return b.UNKNOWN;case Ie.DEADLINE_EXCEEDED:return b.DEADLINE_EXCEEDED;case Ie.RESOURCE_EXHAUSTED:return b.RESOURCE_EXHAUSTED;case Ie.INTERNAL:return b.INTERNAL;case Ie.UNAVAILABLE:return b.UNAVAILABLE;case Ie.UNAUTHENTICATED:return b.UNAUTHENTICATED;case Ie.INVALID_ARGUMENT:return b.INVALID_ARGUMENT;case Ie.NOT_FOUND:return b.NOT_FOUND;case Ie.ALREADY_EXISTS:return b.ALREADY_EXISTS;case Ie.PERMISSION_DENIED:return b.PERMISSION_DENIED;case Ie.FAILED_PRECONDITION:return b.FAILED_PRECONDITION;case Ie.ABORTED:return b.ABORTED;case Ie.OUT_OF_RANGE:return b.OUT_OF_RANGE;case Ie.UNIMPLEMENTED:return b.UNIMPLEMENTED;case Ie.DATA_LOSS:return b.DATA_LOSS;default:return F(39323,{code:s})}}(X=Ie||(Ie={}))[X.OK=0]="OK",X[X.CANCELLED=1]="CANCELLED",X[X.UNKNOWN=2]="UNKNOWN",X[X.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",X[X.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",X[X.NOT_FOUND=5]="NOT_FOUND",X[X.ALREADY_EXISTS=6]="ALREADY_EXISTS",X[X.PERMISSION_DENIED=7]="PERMISSION_DENIED",X[X.UNAUTHENTICATED=16]="UNAUTHENTICATED",X[X.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",X[X.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",X[X.ABORTED=10]="ABORTED",X[X.OUT_OF_RANGE=11]="OUT_OF_RANGE",X[X.UNIMPLEMENTED=12]="UNIMPLEMENTED",X[X.INTERNAL=13]="INTERNAL",X[X.UNAVAILABLE=14]="UNAVAILABLE",X[X.DATA_LOSS=15]="DATA_LOSS";/**
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
 */const vE=new qt([4294967295,4294967295],0);function qh(s){const e=Of().encode(s),t=new Pf;return t.update(e),new Uint8Array(t.digest())}function jh(s){const e=new DataView(s.buffer),t=e.getUint32(0,!0),n=e.getUint32(4,!0),i=e.getUint32(8,!0),r=e.getUint32(12,!0);return[new qt([t,n],0),new qt([i,r],0)]}class nu{constructor(e,t,n){if(this.bitmap=e,this.padding=t,this.hashCount=n,t<0||t>=8)throw new di(`Invalid padding: ${t}`);if(n<0)throw new di(`Invalid hash count: ${n}`);if(e.length>0&&this.hashCount===0)throw new di(`Invalid hash count: ${n}`);if(e.length===0&&t!==0)throw new di(`Invalid padding when bitmap length is 0: ${t}`);this.fe=8*e.length-t,this.ge=qt.fromNumber(this.fe)}pe(e,t,n){let i=e.add(t.multiply(qt.fromNumber(n)));return i.compare(vE)===1&&(i=new qt([i.getBits(0),i.getBits(1)],0)),i.modulo(this.ge).toNumber()}ye(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.fe===0)return!1;const t=qh(e),[n,i]=jh(t);for(let r=0;r<this.hashCount;r++){const o=this.pe(n,i,r);if(!this.ye(o))return!1}return!0}static create(e,t,n){const i=e%8==0?0:8-e%8,r=new Uint8Array(Math.ceil(e/8)),o=new nu(r,i,t);return n.forEach(l=>o.insert(l)),o}insert(e){if(this.fe===0)return;const t=qh(e),[n,i]=jh(t);for(let r=0;r<this.hashCount;r++){const o=this.pe(n,i,r);this.we(o)}}we(e){const t=Math.floor(e/8),n=e%8;this.bitmap[t]|=1<<n}}class di extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class Ji{constructor(e,t,n,i,r){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=n,this.documentUpdates=i,this.resolvedLimboDocuments=r}static createSynthesizedRemoteEventForCurrentChange(e,t,n){const i=new Map;return i.set(e,Zi.createSynthesizedTargetChangeForCurrentChange(e,t,n)),new Ji(q.min(),i,new _e(G),Je(),W())}}class Zi{constructor(e,t,n,i,r){this.resumeToken=e,this.current=t,this.addedDocuments=n,this.modifiedDocuments=i,this.removedDocuments=r}static createSynthesizedTargetChangeForCurrentChange(e,t,n){return new Zi(n,t,W(),W(),W())}}/**
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
 */class Wr{constructor(e,t,n,i){this.Se=e,this.removedTargetIds=t,this.key=n,this.be=i}}class M_{constructor(e,t){this.targetId=e,this.De=t}}class F_{constructor(e,t,n=Ee.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=t,this.resumeToken=n,this.cause=i}}class Gh{constructor(){this.ve=0,this.Ce=zh(),this.Fe=Ee.EMPTY_BYTE_STRING,this.Me=!1,this.xe=!0}get current(){return this.Me}get resumeToken(){return this.Fe}get Oe(){return this.ve!==0}get Ne(){return this.xe}Be(e){e.approximateByteSize()>0&&(this.xe=!0,this.Fe=e)}Le(){let e=W(),t=W(),n=W();return this.Ce.forEach((i,r)=>{switch(r){case 0:e=e.add(i);break;case 2:t=t.add(i);break;case 1:n=n.add(i);break;default:F(38017,{changeType:r})}}),new Zi(this.Fe,this.Me,e,t,n)}ke(){this.xe=!1,this.Ce=zh()}qe(e,t){this.xe=!0,this.Ce=this.Ce.insert(e,t)}Qe(e){this.xe=!0,this.Ce=this.Ce.remove(e)}$e(){this.ve+=1}Ue(){this.ve-=1,U(this.ve>=0,3241,{ve:this.ve})}Ke(){this.xe=!0,this.Me=!0}}class TE{constructor(e){this.We=e,this.Ge=new Map,this.ze=Je(),this.je=Vr(),this.Je=Vr(),this.He=new _e(G)}Ye(e){for(const t of e.Se)e.be&&e.be.isFoundDocument()?this.Ze(t,e.be):this.Xe(t,e.key,e.be);for(const t of e.removedTargetIds)this.Xe(t,e.key,e.be)}et(e){this.forEachTarget(e,t=>{const n=this.tt(t);switch(e.state){case 0:this.nt(t)&&n.Be(e.resumeToken);break;case 1:n.Ue(),n.Oe||n.ke(),n.Be(e.resumeToken);break;case 2:n.Ue(),n.Oe||this.removeTarget(t);break;case 3:this.nt(t)&&(n.Ke(),n.Be(e.resumeToken));break;case 4:this.nt(t)&&(this.rt(t),n.Be(e.resumeToken));break;default:F(56790,{state:e.state})}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Ge.forEach((n,i)=>{this.nt(i)&&t(i)})}it(e){const t=e.targetId,n=e.De.count,i=this.st(t);if(i){const r=i.target;if(ro(r))if(n===0){const o=new M(r.path);this.Xe(t,o,me.newNoDocument(o,q.min()))}else U(n===1,20013,{expectedCount:n});else{const o=this.ot(t);if(o!==n){const l=this._t(e),u=l?this.ut(l,e,o):1;if(u!==0){this.rt(t);const c=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.He=this.He.insert(t,c)}}}}}_t(e){const t=e.De.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:n="",padding:i=0},hashCount:r=0}=t;let o,l;try{o=Ct(n).toUint8Array()}catch(u){if(u instanceof n_)return Wt("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{l=new nu(o,i,r)}catch(u){return Wt(u instanceof di?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return l.fe===0?null:l}ut(e,t,n){return t.De.count===n-this.ht(e,t.targetId)?0:2}ht(e,t){const n=this.We.getRemoteKeysForTarget(t);let i=0;return n.forEach(r=>{const o=this.We.lt(),l=`projects/${o.projectId}/databases/${o.database}/documents/${r.path.canonicalString()}`;e.mightContain(l)||(this.Xe(t,r,null),i++)}),i}Pt(e){const t=new Map;this.Ge.forEach((r,o)=>{const l=this.st(o);if(l){if(r.current&&ro(l.target)){const u=new M(l.target.path);this.Tt(u).has(o)||this.It(o,u)||this.Xe(o,u,me.newNoDocument(u,e))}r.Ne&&(t.set(o,r.Le()),r.ke())}});let n=W();this.Je.forEach((r,o)=>{let l=!0;o.forEachWhile(u=>{const c=this.st(u);return!c||c.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)}),l&&(n=n.add(r))}),this.ze.forEach((r,o)=>o.setReadTime(e));const i=new Ji(e,t,this.He,this.ze,n);return this.ze=Je(),this.je=Vr(),this.Je=Vr(),this.He=new _e(G),i}Ze(e,t){if(!this.nt(e))return;const n=this.It(e,t.key)?2:0;this.tt(e).qe(t.key,n),this.ze=this.ze.insert(t.key,t),this.je=this.je.insert(t.key,this.Tt(t.key).add(e)),this.Je=this.Je.insert(t.key,this.dt(t.key).add(e))}Xe(e,t,n){if(!this.nt(e))return;const i=this.tt(e);this.It(e,t)?i.qe(t,1):i.Qe(t),this.Je=this.Je.insert(t,this.dt(t).delete(e)),this.Je=this.Je.insert(t,this.dt(t).add(e)),n&&(this.ze=this.ze.insert(t,n))}removeTarget(e){this.Ge.delete(e)}ot(e){const t=this.tt(e).Le();return this.We.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}$e(e){this.tt(e).$e()}tt(e){let t=this.Ge.get(e);return t||(t=new Gh,this.Ge.set(e,t)),t}dt(e){let t=this.Je.get(e);return t||(t=new re(G),this.Je=this.Je.insert(e,t)),t}Tt(e){let t=this.je.get(e);return t||(t=new re(G),this.je=this.je.insert(e,t)),t}nt(e){const t=this.st(e)!==null;return t||x("WatchChangeAggregator","Detected inactive target",e),t}st(e){const t=this.Ge.get(e);return t&&t.Oe?null:this.We.Et(e)}rt(e){this.Ge.set(e,new Gh),this.We.getRemoteKeysForTarget(e).forEach(t=>{this.Xe(e,t,null)})}It(e,t){return this.We.getRemoteKeysForTarget(e).has(t)}}function Vr(){return new _e(M.comparator)}function zh(){return new _e(M.comparator)}const wE={asc:"ASCENDING",desc:"DESCENDING"},AE={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},RE={and:"AND",or:"OR"};class SE{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function ul(s,e){return s.useProto3Json||Mo(e)?e:{value:e}}function Ts(s,e){return s.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function L_(s,e){return s.useProto3Json?e.toBase64():e.toUint8Array()}function CE(s,e){return Ts(s,e.toTimestamp())}function ze(s){return U(!!s,49232),q.fromTimestamp(function(t){const n=St(t);return new se(n.seconds,n.nanos)}(s))}function su(s,e){return cl(s,e).canonicalString()}function cl(s,e){const t=function(i){return new te(["projects",i.projectId,"databases",i.database])}(s).child("documents");return e===void 0?t:t.child(e)}function U_(s){const e=te.fromString(s);return U(Q_(e),10190,{key:e.toString()}),e}function ao(s,e){return su(s.databaseId,e.path)}function vn(s,e){const t=U_(e);if(t.get(1)!==s.databaseId.projectId)throw new D(b.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+s.databaseId.projectId);if(t.get(3)!==s.databaseId.database)throw new D(b.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+s.databaseId.database);return new M(j_(t))}function B_(s,e){return su(s.databaseId,e)}function q_(s){const e=U_(s);return e.length===4?te.emptyPath():j_(e)}function hl(s){return new te(["projects",s.databaseId.projectId,"databases",s.databaseId.database]).canonicalString()}function j_(s){return U(s.length>4&&s.get(4)==="documents",29091,{key:s.toString()}),s.popFirst(5)}function Kh(s,e,t){return{name:ao(s,e),fields:t.value.mapValue.fields}}function PE(s,e,t){const n=vn(s,e.name),i=ze(e.updateTime),r=e.createTime?ze(e.createTime):q.min(),o=new Ue({mapValue:{fields:e.fields}}),l=me.newFoundDocument(n,i,r,o);return t&&l.setHasCommittedMutations(),t?l.setHasCommittedMutations():l}function bE(s,e){let t;if("targetChange"in e){e.targetChange;const n=function(c){return c==="NO_CHANGE"?0:c==="ADD"?1:c==="REMOVE"?2:c==="CURRENT"?3:c==="RESET"?4:F(39313,{state:c})}(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],r=function(c,f){return c.useProto3Json?(U(f===void 0||typeof f=="string",58123),Ee.fromBase64String(f||"")):(U(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),Ee.fromUint8Array(f||new Uint8Array))}(s,e.targetChange.resumeToken),o=e.targetChange.cause,l=o&&function(c){const f=c.code===void 0?b.UNKNOWN:O_(c.code);return new D(f,c.message||"")}(o);t=new F_(n,i,r,l||null)}else if("documentChange"in e){e.documentChange;const n=e.documentChange;n.document,n.document.name,n.document.updateTime;const i=vn(s,n.document.name),r=ze(n.document.updateTime),o=n.document.createTime?ze(n.document.createTime):q.min(),l=new Ue({mapValue:{fields:n.document.fields}}),u=me.newFoundDocument(i,r,o,l),c=n.targetIds||[],f=n.removedTargetIds||[];t=new Wr(c,f,u.key,u)}else if("documentDelete"in e){e.documentDelete;const n=e.documentDelete;n.document;const i=vn(s,n.document),r=n.readTime?ze(n.readTime):q.min(),o=me.newNoDocument(i,r),l=n.removedTargetIds||[];t=new Wr([],l,o.key,o)}else if("documentRemove"in e){e.documentRemove;const n=e.documentRemove;n.document;const i=vn(s,n.document),r=n.removedTargetIds||[];t=new Wr([],r,i,null)}else{if(!("filter"in e))return F(11601,{At:e});{e.filter;const n=e.filter;n.targetId;const{count:i=0,unchangedNames:r}=n,o=new EE(i,r),l=n.targetId;t=new M_(l,o)}}return t}function lo(s,e){let t;if(e instanceof Ns)t={update:Kh(s,e.key,e.value)};else if(e instanceof Jl)t={delete:ao(s,e.key)};else if(e instanceof xt)t={update:Kh(s,e.key,e.data),updateMask:OE(e.fieldMask)};else{if(!(e instanceof k_))return F(16599,{Rt:e.type});t={verify:ao(s,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(n=>function(r,o){const l=o.transform;if(l instanceof Es)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof Is)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof vs)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof Li)return{fieldPath:o.field.canonicalString(),increment:l.Ee};throw F(20930,{transform:o.transform})}(0,n))),e.precondition.isNone||(t.currentDocument=function(i,r){return r.updateTime!==void 0?{updateTime:CE(i,r.updateTime)}:r.exists!==void 0?{exists:r.exists}:F(27497)}(s,e.precondition)),t}function dl(s,e){const t=e.currentDocument?function(r){return r.updateTime!==void 0?Ge.updateTime(ze(r.updateTime)):r.exists!==void 0?Ge.exists(r.exists):Ge.none()}(e.currentDocument):Ge.none(),n=e.updateTransforms?e.updateTransforms.map(i=>function(o,l){let u=null;if("setToServerValue"in l)U(l.setToServerValue==="REQUEST_TIME",16630,{proto:l}),u=new Es;else if("appendMissingElements"in l){const f=l.appendMissingElements.values||[];u=new Is(f)}else if("removeAllFromArray"in l){const f=l.removeAllFromArray.values||[];u=new vs(f)}else"increment"in l?u=new Li(o,l.increment):F(16584,{proto:l});const c=fe.fromServerFormat(l.fieldPath);return new x_(c,u)}(s,i)):[];if(e.update){e.update.name;const i=vn(s,e.update.name),r=new Ue({mapValue:{fields:e.update.fields}});if(e.updateMask){const o=function(u){const c=u.fieldPaths||[];return new We(c.map(f=>fe.fromServerFormat(f)))}(e.updateMask);return new xt(i,r,o,t,n)}return new Ns(i,r,t,n)}if(e.delete){const i=vn(s,e.delete);return new Jl(i,t)}if(e.verify){const i=vn(s,e.verify);return new k_(i,t)}return F(1463,{proto:e})}function VE(s,e){return s&&s.length>0?(U(e!==void 0,14353),s.map(t=>function(i,r){let o=i.updateTime?ze(i.updateTime):ze(r);return o.isEqual(q.min())&&(o=ze(r)),new mE(o,i.transformResults||[])}(t,e))):[]}function G_(s,e){return{documents:[B_(s,e.path)]}}function z_(s,e){const t={structuredQuery:{}},n=e.path;let i;e.collectionGroup!==null?(i=n,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=n.popLast(),t.structuredQuery.from=[{collectionId:n.lastSegment()}]),t.parent=B_(s,i);const r=function(c){if(c.length!==0)return $_(ie.create(c,"and"))}(e.filters);r&&(t.structuredQuery.where=r);const o=function(c){if(c.length!==0)return c.map(f=>function(m){return{field:Xn(m.field),direction:NE(m.dir)}}(f))}(e.orderBy);o&&(t.structuredQuery.orderBy=o);const l=ul(s,e.limit);return l!==null&&(t.structuredQuery.limit=l),e.startAt&&(t.structuredQuery.startAt=function(c){return{before:c.inclusive,values:c.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(c){return{before:!c.inclusive,values:c.position}}(e.endAt)),{Vt:t,parent:i}}function K_(s){let e=q_(s.parent);const t=s.structuredQuery,n=t.from?t.from.length:0;let i=null;if(n>0){U(n===1,65062);const f=t.from[0];f.allDescendants?i=f.collectionId:e=e.child(f.collectionId)}let r=[];t.where&&(r=function(_){const m=W_(_);return m instanceof ie&&Ql(m)?m.getFilters():[m]}(t.where));let o=[];t.orderBy&&(o=function(_){return _.map(m=>function(C){return new Fi(Jn(C.field),function(N){switch(N){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(C.direction))}(m))}(t.orderBy));let l=null;t.limit&&(l=function(_){let m;return m=typeof _=="object"?_.value:_,Mo(m)?null:m}(t.limit));let u=null;t.startAt&&(u=function(_){const m=!!_.before,T=_.values||[];return new gs(T,m)}(t.startAt));let c=null;return t.endAt&&(c=function(_){const m=!_.before,T=_.values||[];return new gs(T,m)}(t.endAt)),y_(e,i,o,r,l,"F",u,c)}function xE(s,e){const t=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return F(28987,{purpose:i})}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function W_(s){return s.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const n=Jn(t.unaryFilter.field);return Y.create(n,"==",{doubleValue:NaN});case"IS_NULL":const i=Jn(t.unaryFilter.field);return Y.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const r=Jn(t.unaryFilter.field);return Y.create(r,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=Jn(t.unaryFilter.field);return Y.create(o,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return F(61313);default:return F(60726)}}(s):s.fieldFilter!==void 0?function(t){return Y.create(Jn(t.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return F(58110);default:return F(50506)}}(t.fieldFilter.op),t.fieldFilter.value)}(s):s.compositeFilter!==void 0?function(t){return ie.create(t.compositeFilter.filters.map(n=>W_(n)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return F(1026)}}(t.compositeFilter.op))}(s):F(30097,{filter:s})}function NE(s){return wE[s]}function DE(s){return AE[s]}function kE(s){return RE[s]}function Xn(s){return{fieldPath:s.canonicalString()}}function Jn(s){return fe.fromServerFormat(s.fieldPath)}function $_(s){return s instanceof Y?function(t){if(t.op==="=="){if(bh(t.value))return{unaryFilter:{field:Xn(t.field),op:"IS_NAN"}};if(Ph(t.value))return{unaryFilter:{field:Xn(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(bh(t.value))return{unaryFilter:{field:Xn(t.field),op:"IS_NOT_NAN"}};if(Ph(t.value))return{unaryFilter:{field:Xn(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Xn(t.field),op:DE(t.op),value:t.value}}}(s):s instanceof ie?function(t){const n=t.getFilters().map(i=>$_(i));return n.length===1?n[0]:{compositeFilter:{op:kE(t.op),filters:n}}}(s):F(54877,{filter:s})}function OE(s){const e=[];return s.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function Q_(s){return s.length>=4&&s.get(0)==="projects"&&s.get(2)==="databases"}/**
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
 */class Tt{constructor(e,t,n,i,r=q.min(),o=q.min(),l=Ee.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=n,this.sequenceNumber=i,this.snapshotVersion=r,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=l,this.expectedCount=u}withSequenceNumber(e){return new Tt(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new Tt(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new Tt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new Tt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
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
 */class H_{constructor(e){this.gt=e}}function ME(s,e){let t;if(e.document)t=PE(s.gt,e.document,!!e.hasCommittedMutations);else if(e.noDocument){const n=M.fromSegments(e.noDocument.path),i=Cn(e.noDocument.readTime);t=me.newNoDocument(n,i),e.hasCommittedMutations&&t.setHasCommittedMutations()}else{if(!e.unknownDocument)return F(56709);{const n=M.fromSegments(e.unknownDocument.path),i=Cn(e.unknownDocument.version);t=me.newUnknownDocument(n,i)}}return e.readTime&&t.setReadTime(function(i){const r=new se(i[0],i[1]);return q.fromTimestamp(r)}(e.readTime)),t}function Wh(s,e){const t=e.key,n={prefixPath:t.getCollectionPath().popLast().toArray(),collectionGroup:t.collectionGroup,documentId:t.path.lastSegment(),readTime:uo(e.readTime),hasCommittedMutations:e.hasCommittedMutations};if(e.isFoundDocument())n.document=function(r,o){return{name:ao(r,o.key),fields:o.data.value.mapValue.fields,updateTime:Ts(r,o.version.toTimestamp()),createTime:Ts(r,o.createTime.toTimestamp())}}(s.gt,e);else if(e.isNoDocument())n.noDocument={path:t.path.toArray(),readTime:Sn(e.version)};else{if(!e.isUnknownDocument())return F(57904,{document:e});n.unknownDocument={path:t.path.toArray(),version:Sn(e.version)}}return n}function uo(s){const e=s.toTimestamp();return[e.seconds,e.nanoseconds]}function Sn(s){const e=s.toTimestamp();return{seconds:e.seconds,nanoseconds:e.nanoseconds}}function Cn(s){const e=new se(s.seconds,s.nanoseconds);return q.fromTimestamp(e)}function _n(s,e){const t=(e.baseMutations||[]).map(r=>dl(s.gt,r));for(let r=0;r<e.mutations.length-1;++r){const o=e.mutations[r];if(r+1<e.mutations.length&&e.mutations[r+1].transform!==void 0){const l=e.mutations[r+1];o.updateTransforms=l.transform.fieldTransforms,e.mutations.splice(r+1,1),++r}}const n=e.mutations.map(r=>dl(s.gt,r)),i=se.fromMillis(e.localWriteTimeMs);return new Zl(e.batchId,i,t,n)}function fi(s){const e=Cn(s.readTime),t=s.lastLimboFreeSnapshotVersion!==void 0?Cn(s.lastLimboFreeSnapshotVersion):q.min();let n;return n=function(r){return r.documents!==void 0}(s.query)?function(r){const o=r.documents.length;return U(o===1,1966,{count:o}),Ze(Hl(q_(r.documents[0])))}(s.query):function(r){return Ze(K_(r))}(s.query),new Tt(n,s.targetId,"TargetPurposeListen",s.lastListenSequenceNumber,e,t,Ee.fromBase64String(s.resumeToken))}function Y_(s,e){const t=Sn(e.snapshotVersion),n=Sn(e.lastLimboFreeSnapshotVersion);let i;i=ro(e.target)?G_(s.gt,e.target):z_(s.gt,e.target).Vt;const r=e.resumeToken.toBase64();return{targetId:e.targetId,canonicalId:Rn(e.target),readTime:t,resumeToken:r,lastListenSequenceNumber:e.sequenceNumber,lastLimboFreeSnapshotVersion:n,query:i}}function X_(s){const e=K_({parent:s.parent,structuredQuery:s.structuredQuery});return s.limitType==="LAST"?ll(e,e.limit,"L"):e}function Da(s,e){return new tu(e.largestBatchId,dl(s.gt,e.overlayMutation))}function $h(s,e){const t=e.path.lastSegment();return[s,Be(e.path.popLast()),t]}function Qh(s,e,t,n){return{indexId:s,uid:e,sequenceNumber:t,readTime:Sn(n.readTime),documentKey:Be(n.documentKey.path),largestBatchId:n.largestBatchId}}/**
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
 */class FE{getBundleMetadata(e,t){return Hh(e).get(t).next(n=>{if(n)return function(r){return{id:r.bundleId,createTime:Cn(r.createTime),version:r.version}}(n)})}saveBundleMetadata(e,t){return Hh(e).put(function(i){return{bundleId:i.id,createTime:Sn(ze(i.createTime)),version:i.version}}(t))}getNamedQuery(e,t){return Yh(e).get(t).next(n=>{if(n)return function(r){return{name:r.name,query:X_(r.bundledQuery),readTime:Cn(r.readTime)}}(n)})}saveNamedQuery(e,t){return Yh(e).put(function(i){return{name:i.name,readTime:Sn(ze(i.readTime)),bundledQuery:i.bundledQuery}}(t))}}function Hh(s){return Ae(s,Fo)}function Yh(s){return Ae(s,Lo)}/**
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
 */class Ko{constructor(e,t){this.serializer=e,this.userId=t}static yt(e,t){const n=t.uid||"";return new Ko(e,n)}getOverlay(e,t){return ti(e).get($h(this.userId,t)).next(n=>n?Da(this.serializer,n):null)}getOverlays(e,t){const n=_t();return A.forEach(t,i=>this.getOverlay(e,i).next(r=>{r!==null&&n.set(i,r)})).next(()=>n)}saveOverlays(e,t,n){const i=[];return n.forEach((r,o)=>{const l=new tu(t,o);i.push(this.wt(e,l))}),A.waitFor(i)}removeOverlaysForBatchId(e,t,n){const i=new Set;t.forEach(o=>i.add(Be(o.getCollectionPath())));const r=[];return i.forEach(o=>{const l=IDBKeyRange.bound([this.userId,o,n],[this.userId,o,n+1],!1,!0);r.push(ti(e).Y(Za,l))}),A.waitFor(r)}getOverlaysForCollection(e,t,n){const i=_t(),r=Be(t),o=IDBKeyRange.bound([this.userId,r,n],[this.userId,r,Number.POSITIVE_INFINITY],!0);return ti(e).j(Za,o).next(l=>{for(const u of l){const c=Da(this.serializer,u);i.set(c.getKey(),c)}return i})}getOverlaysForCollectionGroup(e,t,n,i){const r=_t();let o;const l=IDBKeyRange.bound([this.userId,t,n],[this.userId,t,Number.POSITIVE_INFINITY],!0);return ti(e).X({index:Yf,range:l},(u,c,f)=>{const _=Da(this.serializer,c);r.size()<i||_.largestBatchId===o?(r.set(_.getKey(),_),o=_.largestBatchId):f.done()}).next(()=>r)}wt(e,t){return ti(e).put(function(i,r,o){const[l,u,c]=$h(r,o.mutation.key);return{userId:r,collectionPath:u,documentId:c,collectionGroup:o.mutation.key.getCollectionGroup(),largestBatchId:o.largestBatchId,overlayMutation:lo(i.gt,o.mutation)}}(this.serializer,this.userId,t))}}function ti(s){return Ae(s,Uo)}/**
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
 */class LE{St(e){return Ae(e,Gl)}getSessionToken(e){return this.St(e).get("sessionToken").next(t=>{const n=t==null?void 0:t.value;return n?Ee.fromUint8Array(n):Ee.EMPTY_BYTE_STRING})}setSessionToken(e,t){return this.St(e).put({name:"sessionToken",value:t.toUint8Array()})}}/**
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
 */class pn{constructor(){}bt(e,t){this.Dt(e,t),t.vt()}Dt(e,t){if("nullValue"in e)this.Ct(t,5);else if("booleanValue"in e)this.Ct(t,10),t.Ft(e.booleanValue?1:0);else if("integerValue"in e)this.Ct(t,15),t.Ft(de(e.integerValue));else if("doubleValue"in e){const n=de(e.doubleValue);isNaN(n)?this.Ct(t,13):(this.Ct(t,15),bi(n)?t.Ft(0):t.Ft(n))}else if("timestampValue"in e){let n=e.timestampValue;this.Ct(t,20),typeof n=="string"&&(n=St(n)),t.Mt(`${n.seconds||""}`),t.Ft(n.nanos||0)}else if("stringValue"in e)this.xt(e.stringValue,t),this.Ot(t);else if("bytesValue"in e)this.Ct(t,30),t.Nt(Ct(e.bytesValue)),this.Ot(t);else if("referenceValue"in e)this.Bt(e.referenceValue,t);else if("geoPointValue"in e){const n=e.geoPointValue;this.Ct(t,45),t.Ft(n.latitude||0),t.Ft(n.longitude||0)}else"mapValue"in e?l_(e)?this.Ct(t,Number.MAX_SAFE_INTEGER):qo(e)?this.Lt(e.mapValue,t):(this.kt(e.mapValue,t),this.Ot(t)):"arrayValue"in e?(this.qt(e.arrayValue,t),this.Ot(t)):F(19022,{Qt:e})}xt(e,t){this.Ct(t,25),this.$t(e,t)}$t(e,t){t.Mt(e)}kt(e,t){const n=e.fields||{};this.Ct(t,55);for(const i of Object.keys(n))this.xt(i,t),this.Dt(n[i],t)}Lt(e,t){var n,i;const r=e.fields||{};this.Ct(t,53);const o=ps,l=((i=(n=r[o].arrayValue)===null||n===void 0?void 0:n.values)===null||i===void 0?void 0:i.length)||0;this.Ct(t,15),t.Ft(de(l)),this.xt(o,t),this.Dt(r[o],t)}qt(e,t){const n=e.values||[];this.Ct(t,50);for(const i of n)this.Dt(i,t)}Bt(e,t){this.Ct(t,37),M.fromName(e).path.forEach(n=>{this.Ct(t,60),this.$t(n,t)})}Ct(e,t){e.Ft(t)}Ot(e){e.Ft(2)}}pn.Ut=new pn;/**
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
 */const zn=255;function UE(s){if(s===0)return 8;let e=0;return s>>4||(e+=4,s<<=4),s>>6||(e+=2,s<<=2),s>>7||(e+=1),e}function Xh(s){const e=64-function(n){let i=0;for(let r=0;r<8;++r){const o=UE(255&n[r]);if(i+=o,o!==8)break}return i}(s);return Math.ceil(e/8)}class BE{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Kt(e){const t=e[Symbol.iterator]();let n=t.next();for(;!n.done;)this.Wt(n.value),n=t.next();this.Gt()}zt(e){const t=e[Symbol.iterator]();let n=t.next();for(;!n.done;)this.jt(n.value),n=t.next();this.Jt()}Ht(e){for(const t of e){const n=t.charCodeAt(0);if(n<128)this.Wt(n);else if(n<2048)this.Wt(960|n>>>6),this.Wt(128|63&n);else if(t<"\uD800"||"\uDBFF"<t)this.Wt(480|n>>>12),this.Wt(128|63&n>>>6),this.Wt(128|63&n);else{const i=t.codePointAt(0);this.Wt(240|i>>>18),this.Wt(128|63&i>>>12),this.Wt(128|63&i>>>6),this.Wt(128|63&i)}}this.Gt()}Yt(e){for(const t of e){const n=t.charCodeAt(0);if(n<128)this.jt(n);else if(n<2048)this.jt(960|n>>>6),this.jt(128|63&n);else if(t<"\uD800"||"\uDBFF"<t)this.jt(480|n>>>12),this.jt(128|63&n>>>6),this.jt(128|63&n);else{const i=t.codePointAt(0);this.jt(240|i>>>18),this.jt(128|63&i>>>12),this.jt(128|63&i>>>6),this.jt(128|63&i)}}this.Jt()}Zt(e){const t=this.Xt(e),n=Xh(t);this.en(1+n),this.buffer[this.position++]=255&n;for(let i=t.length-n;i<t.length;++i)this.buffer[this.position++]=255&t[i]}tn(e){const t=this.Xt(e),n=Xh(t);this.en(1+n),this.buffer[this.position++]=~(255&n);for(let i=t.length-n;i<t.length;++i)this.buffer[this.position++]=~(255&t[i])}nn(){this.rn(zn),this.rn(255)}sn(){this._n(zn),this._n(255)}reset(){this.position=0}seed(e){this.en(e.length),this.buffer.set(e,this.position),this.position+=e.length}an(){return this.buffer.slice(0,this.position)}Xt(e){const t=function(r){const o=new DataView(new ArrayBuffer(8));return o.setFloat64(0,r,!1),new Uint8Array(o.buffer)}(e),n=!!(128&t[0]);t[0]^=n?255:128;for(let i=1;i<t.length;++i)t[i]^=n?255:0;return t}Wt(e){const t=255&e;t===0?(this.rn(0),this.rn(255)):t===zn?(this.rn(zn),this.rn(0)):this.rn(t)}jt(e){const t=255&e;t===0?(this._n(0),this._n(255)):t===zn?(this._n(zn),this._n(0)):this._n(e)}Gt(){this.rn(0),this.rn(1)}Jt(){this._n(0),this._n(1)}rn(e){this.en(1),this.buffer[this.position++]=e}_n(e){this.en(1),this.buffer[this.position++]=~e}en(e){const t=e+this.position;if(t<=this.buffer.length)return;let n=2*this.buffer.length;n<t&&(n=t);const i=new Uint8Array(n);i.set(this.buffer),this.buffer=i}}class qE{constructor(e){this.un=e}Nt(e){this.un.Kt(e)}Mt(e){this.un.Ht(e)}Ft(e){this.un.Zt(e)}vt(){this.un.nn()}}class jE{constructor(e){this.un=e}Nt(e){this.un.zt(e)}Mt(e){this.un.Yt(e)}Ft(e){this.un.tn(e)}vt(){this.un.sn()}}class ni{constructor(){this.un=new BE,this.cn=new qE(this.un),this.ln=new jE(this.un)}seed(e){this.un.seed(e)}hn(e){return e===0?this.cn:this.ln}an(){return this.un.an()}reset(){this.un.reset()}}/**
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
 */class mn{constructor(e,t,n,i){this.Pn=e,this.Tn=t,this.In=n,this.dn=i}En(){const e=this.dn.length,t=e===0||this.dn[e-1]===255?e+1:e,n=new Uint8Array(t);return n.set(this.dn,0),t!==e?n.set([0],this.dn.length):++n[n.length-1],new mn(this.Pn,this.Tn,this.In,n)}An(e,t,n){return{indexId:this.Pn,uid:e,arrayValue:$r(this.In),directionalValue:$r(this.dn),orderedDocumentKey:$r(t),documentKey:n.path.toArray()}}Rn(e,t,n){const i=this.An(e,t,n);return[i.indexId,i.uid,i.arrayValue,i.directionalValue,i.orderedDocumentKey,i.documentKey]}}function Mt(s,e){let t=s.Pn-e.Pn;return t!==0?t:(t=Jh(s.In,e.In),t!==0?t:(t=Jh(s.dn,e.dn),t!==0?t:M.comparator(s.Tn,e.Tn)))}function Jh(s,e){for(let t=0;t<s.length&&t<e.length;++t){const n=s[t]-e[t];if(n!==0)return n}return s.length-e.length}function $r(s){return wf()?function(t){let n="";for(let i=0;i<t.length;i++)n+=String.fromCharCode(t[i]);return n}(s):s}function Zh(s){return typeof s!="string"?s:function(t){const n=new Uint8Array(t.length);for(let i=0;i<t.length;i++)n[i]=t.charCodeAt(i);return n}(s)}class ed{constructor(e){this.Vn=new re((t,n)=>fe.comparator(t.field,n.field)),this.collectionId=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment(),this.mn=e.orderBy,this.fn=[];for(const t of e.filters){const n=t;n.isInequality()?this.Vn=this.Vn.add(n):this.fn.push(n)}}get gn(){return this.Vn.size>1}pn(e){if(U(e.collectionGroup===this.collectionId,49279),this.gn)return!1;const t=Ya(e);if(t!==void 0&&!this.yn(t))return!1;const n=cn(e);let i=new Set,r=0,o=0;for(;r<n.length&&this.yn(n[r]);++r)i=i.add(n[r].fieldPath.canonicalString());if(r===n.length)return!0;if(this.Vn.size>0){const l=this.Vn.getIterator().getNext();if(!i.has(l.field.canonicalString())){const u=n[r];if(!this.wn(l,u)||!this.Sn(this.mn[o++],u))return!1}++r}for(;r<n.length;++r){const l=n[r];if(o>=this.mn.length||!this.Sn(this.mn[o++],l))return!1}return!0}bn(){if(this.gn)return null;let e=new re(fe.comparator);const t=[];for(const n of this.fn)if(!n.field.isKeyField())if(n.op==="array-contains"||n.op==="array-contains-any")t.push(new Ur(n.field,2));else{if(e.has(n.field))continue;e=e.add(n.field),t.push(new Ur(n.field,0))}for(const n of this.mn)n.field.isKeyField()||e.has(n.field)||(e=e.add(n.field),t.push(new Ur(n.field,n.dir==="asc"?0:1)));return new eo(eo.UNKNOWN_ID,this.collectionId,t,Pi.empty())}yn(e){for(const t of this.fn)if(this.wn(t,e))return!0;return!1}wn(e,t){if(e===void 0||!e.field.isEqual(t.fieldPath))return!1;const n=e.op==="array-contains"||e.op==="array-contains-any";return t.kind===2===n}Sn(e,t){return!!e.field.isEqual(t.fieldPath)&&(t.kind===0&&e.dir==="asc"||t.kind===1&&e.dir==="desc")}}/**
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
 */function J_(s){var e,t;if(U(s instanceof Y||s instanceof ie,20012),s instanceof Y){if(s instanceof g_){const i=((t=(e=s.value.arrayValue)===null||e===void 0?void 0:e.values)===null||t===void 0?void 0:t.map(r=>Y.create(s.field,"==",r)))||[];return ie.create(i,"or")}return s}const n=s.filters.map(i=>J_(i));return ie.create(n,s.op)}function GE(s){if(s.getFilters().length===0)return[];const e=pl(J_(s));return U(Z_(e),7391),fl(e)||_l(e)?[e]:e.getFilters()}function fl(s){return s instanceof Y}function _l(s){return s instanceof ie&&Ql(s)}function Z_(s){return fl(s)||_l(s)||function(t){if(t instanceof ie&&il(t)){for(const n of t.getFilters())if(!fl(n)&&!_l(n))return!1;return!0}return!1}(s)}function pl(s){if(U(s instanceof Y||s instanceof ie,34018),s instanceof Y)return s;if(s.filters.length===1)return pl(s.filters[0]);const e=s.filters.map(n=>pl(n));let t=ie.create(e,s.op);return t=co(t),Z_(t)?t:(U(t instanceof ie,64498),U(ys(t),40251),U(t.filters.length>1,57927),t.filters.reduce((n,i)=>iu(n,i)))}function iu(s,e){let t;return U(s instanceof Y||s instanceof ie,38388),U(e instanceof Y||e instanceof ie,25473),t=s instanceof Y?e instanceof Y?function(i,r){return ie.create([i,r],"and")}(s,e):td(s,e):e instanceof Y?td(e,s):function(i,r){if(U(i.filters.length>0&&r.filters.length>0,48005),ys(i)&&ys(r))return __(i,r.getFilters());const o=il(i)?i:r,l=il(i)?r:i,u=o.filters.map(c=>iu(c,l));return ie.create(u,"or")}(s,e),co(t)}function td(s,e){if(ys(e))return __(e,s.getFilters());{const t=e.filters.map(n=>iu(s,n));return ie.create(t,"or")}}function co(s){if(U(s instanceof Y||s instanceof ie,11850),s instanceof Y)return s;const e=s.getFilters();if(e.length===1)return co(e[0]);if(d_(s))return s;const t=e.map(i=>co(i)),n=[];return t.forEach(i=>{i instanceof Y?n.push(i):i instanceof ie&&(i.op===s.op?n.push(...i.filters):n.push(i))}),n.length===1?n[0]:ie.create(n,s.op)}/**
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
 */class zE{constructor(){this.Dn=new ru}addToCollectionParentIndex(e,t){return this.Dn.add(t),A.resolve()}getCollectionParents(e,t){return A.resolve(this.Dn.getEntries(t))}addFieldIndex(e,t){return A.resolve()}deleteFieldIndex(e,t){return A.resolve()}deleteAllFieldIndexes(e){return A.resolve()}createTargetIndexes(e,t){return A.resolve()}getDocumentsMatchingTarget(e,t){return A.resolve(null)}getIndexType(e,t){return A.resolve(0)}getFieldIndexes(e,t){return A.resolve([])}getNextCollectionGroupToUpdate(e){return A.resolve(null)}getMinOffset(e,t){return A.resolve(nt.min())}getMinOffsetFromCollectionGroup(e,t){return A.resolve(nt.min())}updateCollectionGroup(e,t,n){return A.resolve()}updateIndexEntries(e,t){return A.resolve()}}class ru{constructor(){this.index={}}add(e){const t=e.lastSegment(),n=e.popLast(),i=this.index[t]||new re(te.comparator),r=!i.has(n);return this.index[t]=i.add(n),r}has(e){const t=e.lastSegment(),n=e.popLast(),i=this.index[t];return i&&i.has(n)}getEntries(e){return(this.index[e]||new re(te.comparator)).toArray()}}/**
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
 */const nd="IndexedDbIndexManager",xr=new Uint8Array(0);class KE{constructor(e,t){this.databaseId=t,this.vn=new ru,this.Cn=new Vt(n=>Rn(n),(n,i)=>Yi(n,i)),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.vn.has(t)){const n=t.lastSegment(),i=t.popLast();e.addOnCommittedListener(()=>{this.vn.add(t)});const r={collectionId:n,parent:Be(i)};return sd(e).put(r)}return A.resolve()}getCollectionParents(e,t){const n=[],i=IDBKeyRange.bound([t,""],[Mf(t),""],!1,!0);return sd(e).j(i).next(r=>{for(const o of r){if(o.collectionId!==t)break;n.push(ft(o.parent))}return n})}addFieldIndex(e,t){const n=si(e),i=function(l){return{indexId:l.indexId,collectionGroup:l.collectionGroup,fields:l.fields.map(u=>[u.fieldPath.canonicalString(),u.kind])}}(t);delete i.indexId;const r=n.add(i);if(t.indexState){const o=Wn(e);return r.next(l=>{o.put(Qh(l,this.uid,t.indexState.sequenceNumber,t.indexState.offset))})}return r.next()}deleteFieldIndex(e,t){const n=si(e),i=Wn(e),r=Kn(e);return n.delete(t.indexId).next(()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))).next(()=>r.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))}deleteAllFieldIndexes(e){const t=si(e),n=Kn(e),i=Wn(e);return t.Y().next(()=>n.Y()).next(()=>i.Y())}createTargetIndexes(e,t){return A.forEach(this.Fn(t),n=>this.getIndexType(e,n).next(i=>{if(i===0||i===1){const r=new ed(n).bn();if(r!=null)return this.addFieldIndex(e,r)}}))}getDocumentsMatchingTarget(e,t){const n=Kn(e);let i=!0;const r=new Map;return A.forEach(this.Fn(t),o=>this.Mn(e,o).next(l=>{i&&(i=!!l),r.set(o,l)})).next(()=>{if(i){let o=W();const l=[];return A.forEach(r,(u,c)=>{x(nd,`Using index ${function(B){return`id=${B.indexId}|cg=${B.collectionGroup}|f=${B.fields.map(J=>`${J.fieldPath}:${J.kind}`).join(",")}`}(u)} to execute ${Rn(t)}`);const f=function(B,J){const le=Ya(J);if(le===void 0)return null;for(const Z of oo(B,le.fieldPath))switch(Z.op){case"array-contains-any":return Z.value.arrayValue.values||[];case"array-contains":return[Z.value]}return null}(c,u),_=function(B,J){const le=new Map;for(const Z of cn(J))for(const I of oo(B,Z.fieldPath))switch(I.op){case"==":case"in":le.set(Z.fieldPath.canonicalString(),I.value);break;case"not-in":case"!=":return le.set(Z.fieldPath.canonicalString(),I.value),Array.from(le.values())}return null}(c,u),m=function(B,J){const le=[];let Z=!0;for(const I of cn(J)){const g=I.kind===0?kh(B,I.fieldPath,B.startAt):Oh(B,I.fieldPath,B.startAt);le.push(g.value),Z&&(Z=g.inclusive)}return new gs(le,Z)}(c,u),T=function(B,J){const le=[];let Z=!0;for(const I of cn(J)){const g=I.kind===0?Oh(B,I.fieldPath,B.endAt):kh(B,I.fieldPath,B.endAt);le.push(g.value),Z&&(Z=g.inclusive)}return new gs(le,Z)}(c,u),C=this.xn(u,c,m),V=this.xn(u,c,T),N=this.On(u,c,_),K=this.Nn(u.indexId,f,C,m.inclusive,V,T.inclusive,N);return A.forEach(K,j=>n.H(j,t.limit).next(B=>{B.forEach(J=>{const le=M.fromSegments(J.documentKey);o.has(le)||(o=o.add(le),l.push(le))})}))}).next(()=>l)}return A.resolve(null)})}Fn(e){let t=this.Cn.get(e);return t||(e.filters.length===0?t=[e]:t=GE(ie.create(e.filters,"and")).map(n=>ol(e.path,e.collectionGroup,e.orderBy,n.getFilters(),e.limit,e.startAt,e.endAt)),this.Cn.set(e,t),t)}Nn(e,t,n,i,r,o,l){const u=(t!=null?t.length:1)*Math.max(n.length,r.length),c=u/(t!=null?t.length:1),f=[];for(let _=0;_<u;++_){const m=t?this.Bn(t[_/c]):xr,T=this.Ln(e,m,n[_%c],i),C=this.kn(e,m,r[_%c],o),V=l.map(N=>this.Ln(e,m,N,!0));f.push(...this.createRange(T,C,V))}return f}Ln(e,t,n,i){const r=new mn(e,M.empty(),t,n);return i?r:r.En()}kn(e,t,n,i){const r=new mn(e,M.empty(),t,n);return i?r.En():r}Mn(e,t){const n=new ed(t),i=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,i).next(r=>{let o=null;for(const l of r)n.pn(l)&&(!o||l.fields.length>o.fields.length)&&(o=l);return o})}getIndexType(e,t){let n=2;const i=this.Fn(t);return A.forEach(i,r=>this.Mn(e,r).next(o=>{o?n!==0&&o.fields.length<function(u){let c=new re(fe.comparator),f=!1;for(const _ of u.filters)for(const m of _.getFlattenedFilters())m.field.isKeyField()||(m.op==="array-contains"||m.op==="array-contains-any"?f=!0:c=c.add(m.field));for(const _ of u.orderBy)_.field.isKeyField()||(c=c.add(_.field));return c.size+(f?1:0)}(r)&&(n=1):n=0})).next(()=>function(o){return o.limit!==null}(t)&&i.length>1&&n===2?1:n)}qn(e,t){const n=new ni;for(const i of cn(e)){const r=t.data.field(i.fieldPath);if(r==null)return null;const o=n.hn(i.kind);pn.Ut.bt(r,o)}return n.an()}Bn(e){const t=new ni;return pn.Ut.bt(e,t.hn(0)),t.an()}Qn(e,t){const n=new ni;return pn.Ut.bt(Oi(this.databaseId,t),n.hn(function(r){const o=cn(r);return o.length===0?0:o[o.length-1].kind}(e))),n.an()}On(e,t,n){if(n===null)return[];let i=[];i.push(new ni);let r=0;for(const o of cn(e)){const l=n[r++];for(const u of i)if(this.$n(t,o.fieldPath)&&Mi(l))i=this.Un(i,o,l);else{const c=u.hn(o.kind);pn.Ut.bt(l,c)}}return this.Kn(i)}xn(e,t,n){return this.On(e,t,n.position)}Kn(e){const t=[];for(let n=0;n<e.length;++n)t[n]=e[n].an();return t}Un(e,t,n){const i=[...e],r=[];for(const o of n.arrayValue.values||[])for(const l of i){const u=new ni;u.seed(l.an()),pn.Ut.bt(o,u.hn(t.kind)),r.push(u)}return r}$n(e,t){return!!e.filters.find(n=>n instanceof Y&&n.field.isEqual(t)&&(n.op==="in"||n.op==="not-in"))}getFieldIndexes(e,t){const n=si(e),i=Wn(e);return(t?n.j(Ja,IDBKeyRange.bound(t,t)):n.j()).next(r=>{const o=[];return A.forEach(r,l=>i.get([l.indexId,this.uid]).next(u=>{o.push(function(f,_){const m=_?new Pi(_.sequenceNumber,new nt(Cn(_.readTime),new M(ft(_.documentKey)),_.largestBatchId)):Pi.empty(),T=f.fields.map(([C,V])=>new Ur(fe.fromServerFormat(C),V));return new eo(f.indexId,f.collectionGroup,T,m)}(l,u))})).next(()=>o)})}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next(t=>t.length===0?null:(t.sort((n,i)=>{const r=n.indexState.sequenceNumber-i.indexState.sequenceNumber;return r!==0?r:G(n.collectionGroup,i.collectionGroup)}),t[0].collectionGroup))}updateCollectionGroup(e,t,n){const i=si(e),r=Wn(e);return this.Wn(e).next(o=>i.j(Ja,IDBKeyRange.bound(t,t)).next(l=>A.forEach(l,u=>r.put(Qh(u.indexId,this.uid,o,n)))))}updateIndexEntries(e,t){const n=new Map;return A.forEach(t,(i,r)=>{const o=n.get(i.collectionGroup);return(o?A.resolve(o):this.getFieldIndexes(e,i.collectionGroup)).next(l=>(n.set(i.collectionGroup,l),A.forEach(l,u=>this.Gn(e,i,u).next(c=>{const f=this.zn(r,u);return c.isEqual(f)?A.resolve():this.jn(e,r,u,c,f)}))))})}Jn(e,t,n,i){return Kn(e).put(i.An(this.uid,this.Qn(n,t.key),t.key))}Hn(e,t,n,i){return Kn(e).delete(i.Rn(this.uid,this.Qn(n,t.key),t.key))}Gn(e,t,n){const i=Kn(e);let r=new re(Mt);return i.X({index:Hf,range:IDBKeyRange.only([n.indexId,this.uid,$r(this.Qn(n,t))])},(o,l)=>{r=r.add(new mn(n.indexId,t,Zh(l.arrayValue),Zh(l.directionalValue)))}).next(()=>r)}zn(e,t){let n=new re(Mt);const i=this.qn(t,e);if(i==null)return n;const r=Ya(t);if(r!=null){const o=e.data.field(r.fieldPath);if(Mi(o))for(const l of o.arrayValue.values||[])n=n.add(new mn(t.indexId,e.key,this.Bn(l),i))}else n=n.add(new mn(t.indexId,e.key,xr,i));return n}jn(e,t,n,i,r){x(nd,"Updating index entries for document '%s'",t.key);const o=[];return function(u,c,f,_,m){const T=u.getIterator(),C=c.getIterator();let V=Gn(T),N=Gn(C);for(;V||N;){let K=!1,j=!1;if(V&&N){const B=f(V,N);B<0?j=!0:B>0&&(K=!0)}else V!=null?j=!0:K=!0;K?(_(N),N=Gn(C)):j?(m(V),V=Gn(T)):(V=Gn(T),N=Gn(C))}}(i,r,Mt,l=>{o.push(this.Jn(e,t,n,l))},l=>{o.push(this.Hn(e,t,n,l))}),A.waitFor(o)}Wn(e){let t=1;return Wn(e).X({index:Qf,reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},(n,i,r)=>{r.done(),t=i.sequenceNumber+1}).next(()=>t)}createRange(e,t,n){n=n.sort((o,l)=>Mt(o,l)).filter((o,l,u)=>!l||Mt(o,u[l-1])!==0);const i=[];i.push(e);for(const o of n){const l=Mt(o,e),u=Mt(o,t);if(l===0)i[0]=e.En();else if(l>0&&u<0)i.push(o),i.push(o.En());else if(u>0)break}i.push(t);const r=[];for(let o=0;o<i.length;o+=2){if(this.Yn(i[o],i[o+1]))return[];const l=i[o].Rn(this.uid,xr,M.empty()),u=i[o+1].Rn(this.uid,xr,M.empty());r.push(IDBKeyRange.bound(l,u))}return r}Yn(e,t){return Mt(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(id)}getMinOffset(e,t){return A.mapArray(this.Fn(t),n=>this.Mn(e,n).next(i=>i||F(44426))).next(id)}}function sd(s){return Ae(s,Ni)}function Kn(s){return Ae(s,gi)}function si(s){return Ae(s,jl)}function Wn(s){return Ae(s,mi)}function id(s){U(s.length!==0,28825);let e=s[0].indexState.offset,t=e.largestBatchId;for(let n=1;n<s.length;n++){const i=s[n].indexState.offset;Ul(i,e)<0&&(e=i),t<i.largestBatchId&&(t=i.largestBatchId)}return new nt(e.readTime,e.documentKey,t)}/**
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
 */const rd={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},ep=41943040;class Me{static withCacheSize(e){return new Me(e,Me.DEFAULT_COLLECTION_PERCENTILE,Me.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,n){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=n}}/**
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
 */function tp(s,e,t){const n=s.store(rt),i=s.store(hs),r=[],o=IDBKeyRange.only(t.batchId);let l=0;const u=n.X({range:o},(f,_,m)=>(l++,m.delete()));r.push(u.next(()=>{U(l===1,47070,{batchId:t.batchId})}));const c=[];for(const f of t.mutations){const _=Kf(e,f.key.path,t.batchId);r.push(i.delete(_)),c.push(f.key)}return A.waitFor(r).next(()=>c)}function ho(s){if(!s)return 0;let e;if(s.document)e=s.document;else if(s.unknownDocument)e=s.unknownDocument;else{if(!s.noDocument)throw F(14731);e=s.noDocument}return JSON.stringify(e).length}/**
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
 */Me.DEFAULT_COLLECTION_PERCENTILE=10,Me.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Me.DEFAULT=new Me(ep,Me.DEFAULT_COLLECTION_PERCENTILE,Me.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Me.DISABLED=new Me(-1,0,0);class Wo{constructor(e,t,n,i){this.userId=e,this.serializer=t,this.indexManager=n,this.referenceDelegate=i,this.Zn={}}static yt(e,t,n,i){U(e.uid!=="",64387);const r=e.isAuthenticated()?e.uid:"";return new Wo(r,t,n,i)}checkEmpty(e){let t=!0;const n=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return Ft(e).X({index:gn,range:n},(i,r,o)=>{t=!1,o.done()}).next(()=>t)}addMutationBatch(e,t,n,i){const r=Zn(e),o=Ft(e);return o.add({}).next(l=>{U(typeof l=="number",49019);const u=new Zl(l,t,n,i),c=function(T,C,V){const N=V.baseMutations.map(j=>lo(T.gt,j)),K=V.mutations.map(j=>lo(T.gt,j));return{userId:C,batchId:V.batchId,localWriteTimeMs:V.localWriteTime.toMillis(),baseMutations:N,mutations:K}}(this.serializer,this.userId,u),f=[];let _=new re((m,T)=>G(m.canonicalString(),T.canonicalString()));for(const m of i){const T=Kf(this.userId,m.key.path,l);_=_.add(m.key.path.popLast()),f.push(o.put(c)),f.push(r.put(T,Ay))}return _.forEach(m=>{f.push(this.indexManager.addToCollectionParentIndex(e,m))}),e.addOnCommittedListener(()=>{this.Zn[l]=u.keys()}),A.waitFor(f).next(()=>u)})}lookupMutationBatch(e,t){return Ft(e).get(t).next(n=>n?(U(n.userId===this.userId,48,"Unexpected user for mutation batch",{userId:n.userId,batchId:t}),_n(this.serializer,n)):null)}Xn(e,t){return this.Zn[t]?A.resolve(this.Zn[t]):this.lookupMutationBatch(e,t).next(n=>{if(n){const i=n.keys();return this.Zn[t]=i,i}return null})}getNextMutationBatchAfterBatchId(e,t){const n=t+1,i=IDBKeyRange.lowerBound([this.userId,n]);let r=null;return Ft(e).X({index:gn,range:i},(o,l,u)=>{l.userId===this.userId&&(U(l.batchId>=n,47524,{er:n}),r=_n(this.serializer,l)),u.done()}).next(()=>r)}getHighestUnacknowledgedBatchId(e){const t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let n=En;return Ft(e).X({index:gn,range:t,reverse:!0},(i,r,o)=>{n=r.batchId,o.done()}).next(()=>n)}getAllMutationBatches(e){const t=IDBKeyRange.bound([this.userId,En],[this.userId,Number.POSITIVE_INFINITY]);return Ft(e).j(gn,t).next(n=>n.map(i=>_n(this.serializer,i)))}getAllMutationBatchesAffectingDocumentKey(e,t){const n=Br(this.userId,t.path),i=IDBKeyRange.lowerBound(n),r=[];return Zn(e).X({range:i},(o,l,u)=>{const[c,f,_]=o,m=ft(f);if(c===this.userId&&t.path.isEqual(m))return Ft(e).get(_).next(T=>{if(!T)throw F(61480,{tr:o,batchId:_});U(T.userId===this.userId,10503,"Unexpected user for mutation batch",{userId:T.userId,batchId:_}),r.push(_n(this.serializer,T))});u.done()}).next(()=>r)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new re(G);const i=[];return t.forEach(r=>{const o=Br(this.userId,r.path),l=IDBKeyRange.lowerBound(o),u=Zn(e).X({range:l},(c,f,_)=>{const[m,T,C]=c,V=ft(T);m===this.userId&&r.path.isEqual(V)?n=n.add(C):_.done()});i.push(u)}),A.waitFor(i).next(()=>this.nr(e,n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,i=n.length+1,r=Br(this.userId,n),o=IDBKeyRange.lowerBound(r);let l=new re(G);return Zn(e).X({range:o},(u,c,f)=>{const[_,m,T]=u,C=ft(m);_===this.userId&&n.isPrefixOf(C)?C.length===i&&(l=l.add(T)):f.done()}).next(()=>this.nr(e,l))}nr(e,t){const n=[],i=[];return t.forEach(r=>{i.push(Ft(e).get(r).next(o=>{if(o===null)throw F(35274,{batchId:r});U(o.userId===this.userId,9748,"Unexpected user for mutation batch",{userId:o.userId,batchId:r}),n.push(_n(this.serializer,o))}))}),A.waitFor(i).next(()=>n)}removeMutationBatch(e,t){return tp(e.ce,this.userId,t).next(n=>(e.addOnCommittedListener(()=>{this.rr(t.batchId)}),A.forEach(n,i=>this.referenceDelegate.markPotentiallyOrphaned(e,i))))}rr(e){delete this.Zn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next(t=>{if(!t)return A.resolve();const n=IDBKeyRange.lowerBound(function(o){return[o]}(this.userId)),i=[];return Zn(e).X({range:n},(r,o,l)=>{if(r[0]===this.userId){const u=ft(r[1]);i.push(u)}else l.done()}).next(()=>{U(i.length===0,56720,{ir:i.map(r=>r.canonicalString())})})})}containsKey(e,t){return np(e,this.userId,t)}sr(e){return sp(e).get(this.userId).next(t=>t||{userId:this.userId,lastAcknowledgedBatchId:En,lastStreamToken:""})}}function np(s,e,t){const n=Br(e,t.path),i=n[1],r=IDBKeyRange.lowerBound(n);let o=!1;return Zn(s).X({range:r,Z:!0},(l,u,c)=>{const[f,_,m]=l;f===e&&_===i&&(o=!0),c.done()}).next(()=>o)}function Ft(s){return Ae(s,rt)}function Zn(s){return Ae(s,hs)}function sp(s){return Ae(s,Vi)}/**
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
 */class Pn{constructor(e){this._r=e}next(){return this._r+=2,this._r}static ar(){return new Pn(0)}static ur(){return new Pn(-1)}}/**
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
 */class WE{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.cr(e).next(t=>{const n=new Pn(t.highestTargetId);return t.highestTargetId=n.next(),this.lr(e,t).next(()=>t.highestTargetId)})}getLastRemoteSnapshotVersion(e){return this.cr(e).next(t=>q.fromTimestamp(new se(t.lastRemoteSnapshotVersion.seconds,t.lastRemoteSnapshotVersion.nanoseconds)))}getHighestSequenceNumber(e){return this.cr(e).next(t=>t.highestListenSequenceNumber)}setTargetsMetadata(e,t,n){return this.cr(e).next(i=>(i.highestListenSequenceNumber=t,n&&(i.lastRemoteSnapshotVersion=n.toTimestamp()),t>i.highestListenSequenceNumber&&(i.highestListenSequenceNumber=t),this.lr(e,i)))}addTargetData(e,t){return this.hr(e,t).next(()=>this.cr(e).next(n=>(n.targetCount+=1,this.Pr(t,n),this.lr(e,n))))}updateTargetData(e,t){return this.hr(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next(()=>$n(e).delete(t.targetId)).next(()=>this.cr(e)).next(n=>(U(n.targetCount>0,8065),n.targetCount-=1,this.lr(e,n)))}removeTargets(e,t,n){let i=0;const r=[];return $n(e).X((o,l)=>{const u=fi(l);u.sequenceNumber<=t&&n.get(u.targetId)===null&&(i++,r.push(this.removeTargetData(e,u)))}).next(()=>A.waitFor(r)).next(()=>i)}forEachTarget(e,t){return $n(e).X((n,i)=>{const r=fi(i);t(r)})}cr(e){return od(e).get(so).next(t=>(U(t!==null,2888),t))}lr(e,t){return od(e).put(so,t)}hr(e,t){return $n(e).put(Y_(this.serializer,t))}Pr(e,t){let n=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,n=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,n=!0),n}getTargetCount(e){return this.cr(e).next(t=>t.targetCount)}getTargetData(e,t){const n=Rn(t),i=IDBKeyRange.bound([n,Number.NEGATIVE_INFINITY],[n,Number.POSITIVE_INFINITY]);let r=null;return $n(e).X({range:i,index:$f},(o,l,u)=>{const c=fi(l);Yi(t,c.target)&&(r=c,u.done())}).next(()=>r)}addMatchingKeys(e,t,n){const i=[],r=Ut(e);return t.forEach(o=>{const l=Be(o.path);i.push(r.put({targetId:n,path:l})),i.push(this.referenceDelegate.addReference(e,n,o))}),A.waitFor(i)}removeMatchingKeys(e,t,n){const i=Ut(e);return A.forEach(t,r=>{const o=Be(r.path);return A.waitFor([i.delete([n,o]),this.referenceDelegate.removeReference(e,n,r)])})}removeMatchingKeysForTargetId(e,t){const n=Ut(e),i=IDBKeyRange.bound([t],[t+1],!1,!0);return n.delete(i)}getMatchingKeysForTargetId(e,t){const n=IDBKeyRange.bound([t],[t+1],!1,!0),i=Ut(e);let r=W();return i.X({range:n,Z:!0},(o,l,u)=>{const c=ft(o[1]),f=new M(c);r=r.add(f)}).next(()=>r)}containsKey(e,t){const n=Be(t.path),i=IDBKeyRange.bound([n],[Mf(n)],!1,!0);let r=0;return Ut(e).X({index:ql,Z:!0,range:i},([o,l],u,c)=>{o!==0&&(r++,c.done())}).next(()=>r>0)}Et(e,t){return $n(e).get(t).next(n=>n?fi(n):null)}}function $n(s){return Ae(s,ds)}function od(s){return Ae(s,In)}function Ut(s){return Ae(s,fs)}/**
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
 */const ad="LruGarbageCollector",ip=1048576;function ld([s,e],[t,n]){const i=G(s,t);return i===0?G(e,n):i}class $E{constructor(e){this.Tr=e,this.buffer=new re(ld),this.Ir=0}dr(){return++this.Ir}Er(e){const t=[e,this.dr()];if(this.buffer.size<this.Tr)this.buffer=this.buffer.add(t);else{const n=this.buffer.last();ld(t,n)<0&&(this.buffer=this.buffer.delete(n).add(t))}}get maxValue(){return this.buffer.last()[0]}}class rp{constructor(e,t,n){this.garbageCollector=e,this.asyncQueue=t,this.localStore=n,this.Ar=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Rr(6e4)}stop(){this.Ar&&(this.Ar.cancel(),this.Ar=null)}get started(){return this.Ar!==null}Rr(e){x(ad,`Garbage collection scheduled in ${e}ms`),this.Ar=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Ar=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){en(t)?x(ad,"Ignoring IndexedDB error during garbage collection: ",t):await Zt(t)}await this.Rr(3e5)})}}class QE{constructor(e,t){this.Vr=e,this.params=t}calculateTargetCount(e,t){return this.Vr.mr(e).next(n=>Math.floor(t/100*n))}nthSequenceNumber(e,t){if(t===0)return A.resolve(Ke.ue);const n=new $E(t);return this.Vr.forEachTarget(e,i=>n.Er(i.sequenceNumber)).next(()=>this.Vr.gr(e,i=>n.Er(i))).next(()=>n.maxValue)}removeTargets(e,t,n){return this.Vr.removeTargets(e,t,n)}removeOrphanedDocuments(e,t){return this.Vr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(x("LruGarbageCollector","Garbage collection skipped; disabled"),A.resolve(rd)):this.getCacheSize(e).next(n=>n<this.params.cacheSizeCollectionThreshold?(x("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),rd):this.pr(e,t))}getCacheSize(e){return this.Vr.getCacheSize(e)}pr(e,t){let n,i,r,o,l,u,c;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(_=>(_>this.params.maximumSequenceNumbersToCollect?(x("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${_}`),i=this.params.maximumSequenceNumbersToCollect):i=_,o=Date.now(),this.nthSequenceNumber(e,i))).next(_=>(n=_,l=Date.now(),this.removeTargets(e,n,t))).next(_=>(r=_,u=Date.now(),this.removeOrphanedDocuments(e,n))).next(_=>(c=Date.now(),Hn()<=dt.DEBUG&&x("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-f}ms
	Determined least recently used ${i} in `+(l-o)+`ms
	Removed ${r} targets in `+(u-l)+`ms
	Removed ${_} documents in `+(c-u)+`ms
Total Duration: ${c-f}ms`),A.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:r,documentsRemoved:_})))}}function op(s,e){return new QE(s,e)}/**
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
 */class HE{constructor(e,t){this.db=e,this.garbageCollector=op(this,t)}mr(e){const t=this.yr(e);return this.db.getTargetCache().getTargetCount(e).next(n=>t.next(i=>n+i))}yr(e){let t=0;return this.gr(e,n=>{t++}).next(()=>t)}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}gr(e,t){return this.wr(e,(n,i)=>t(i))}addReference(e,t,n){return Nr(e,n)}removeReference(e,t,n){return Nr(e,n)}removeTargets(e,t,n){return this.db.getTargetCache().removeTargets(e,t,n)}markPotentiallyOrphaned(e,t){return Nr(e,t)}Sr(e,t){return function(i,r){let o=!1;return sp(i).ee(l=>np(i,l,r).next(u=>(u&&(o=!0),A.resolve(!u)))).next(()=>o)}(e,t)}removeOrphanedDocuments(e,t){const n=this.db.getRemoteDocumentCache().newChangeBuffer(),i=[];let r=0;return this.wr(e,(o,l)=>{if(l<=t){const u=this.Sr(e,o).next(c=>{if(!c)return r++,n.getEntry(e,o).next(()=>(n.removeEntry(o,q.min()),Ut(e).delete(function(_){return[0,Be(_.path)]}(o))))});i.push(u)}}).next(()=>A.waitFor(i)).next(()=>n.apply(e)).next(()=>r)}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,n)}updateLimboDocument(e,t){return Nr(e,t)}wr(e,t){const n=Ut(e);let i,r=Ke.ue;return n.X({index:ql},([o,l],{path:u,sequenceNumber:c})=>{o===0?(r!==Ke.ue&&t(new M(ft(i)),r),r=c,i=u):r=Ke.ue}).next(()=>{r!==Ke.ue&&t(new M(ft(i)),r)})}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function Nr(s,e){return Ut(s).put(function(n,i){return{targetId:0,path:Be(n.path),sequenceNumber:i}}(e,s.currentSequenceNumber))}/**
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
 */class ap{constructor(){this.changes=new Vt(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,me.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const n=this.changes.get(t);return n!==void 0?A.resolve(n):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
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
 */class YE{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,n){return un(e).put(n)}removeEntry(e,t,n){return un(e).delete(function(r,o){const l=r.path.toArray();return[l.slice(0,l.length-2),l[l.length-2],uo(o),l[l.length-1]]}(t,n))}updateMetadata(e,t){return this.getMetadata(e).next(n=>(n.byteSize+=t,this.br(e,n)))}getEntry(e,t){let n=me.newInvalidDocument(t);return un(e).X({index:qr,range:IDBKeyRange.only(ii(t))},(i,r)=>{n=this.Dr(t,r)}).next(()=>n)}vr(e,t){let n={size:0,document:me.newInvalidDocument(t)};return un(e).X({index:qr,range:IDBKeyRange.only(ii(t))},(i,r)=>{n={document:this.Dr(t,r),size:ho(r)}}).next(()=>n)}getEntries(e,t){let n=Je();return this.Cr(e,t,(i,r)=>{const o=this.Dr(i,r);n=n.insert(i,o)}).next(()=>n)}Fr(e,t){let n=Je(),i=new _e(M.comparator);return this.Cr(e,t,(r,o)=>{const l=this.Dr(r,o);n=n.insert(r,l),i=i.insert(r,ho(o))}).next(()=>({documents:n,Mr:i}))}Cr(e,t,n){if(t.isEmpty())return A.resolve();let i=new re(hd);t.forEach(u=>i=i.add(u));const r=IDBKeyRange.bound(ii(i.first()),ii(i.last())),o=i.getIterator();let l=o.getNext();return un(e).X({index:qr,range:r},(u,c,f)=>{const _=M.fromSegments([...c.prefixPath,c.collectionGroup,c.documentId]);for(;l&&hd(l,_)<0;)n(l,null),l=o.getNext();l&&l.isEqual(_)&&(n(l,c),l=o.hasNext()?o.getNext():null),l?f.G(ii(l)):f.done()}).next(()=>{for(;l;)n(l,null),l=o.hasNext()?o.getNext():null})}getDocumentsMatchingQuery(e,t,n,i,r){const o=t.path,l=[o.popLast().toArray(),o.lastSegment(),uo(n.readTime),n.documentKey.path.isEmpty()?"":n.documentKey.path.lastSegment()],u=[o.popLast().toArray(),o.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return un(e).j(IDBKeyRange.bound(l,u,!0)).next(c=>{r==null||r.incrementDocumentReadCount(c.length);let f=Je();for(const _ of c){const m=this.Dr(M.fromSegments(_.prefixPath.concat(_.collectionGroup,_.documentId)),_);m.isFoundDocument()&&(Xi(t,m)||i.has(m.key))&&(f=f.insert(m.key,m))}return f})}getAllFromCollectionGroup(e,t,n,i){let r=Je();const o=cd(t,n),l=cd(t,nt.max());return un(e).X({index:Wf,range:IDBKeyRange.bound(o,l,!0)},(u,c,f)=>{const _=this.Dr(M.fromSegments(c.prefixPath.concat(c.collectionGroup,c.documentId)),c);r=r.insert(_.key,_),r.size===i&&f.done()}).next(()=>r)}newChangeBuffer(e){return new XE(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next(t=>t.byteSize)}getMetadata(e){return ud(e).get(Xa).next(t=>(U(!!t,20021),t))}br(e,t){return ud(e).put(Xa,t)}Dr(e,t){if(t){const n=ME(this.serializer,t);if(!(n.isNoDocument()&&n.version.isEqual(q.min())))return n}return me.newInvalidDocument(e)}}function lp(s){return new YE(s)}class XE extends ap{constructor(e,t){super(),this.Or=e,this.trackRemovals=t,this.Nr=new Vt(n=>n.toString(),(n,i)=>n.isEqual(i))}applyChanges(e){const t=[];let n=0,i=new re((r,o)=>G(r.canonicalString(),o.canonicalString()));return this.changes.forEach((r,o)=>{const l=this.Nr.get(r);if(t.push(this.Or.removeEntry(e,r,l.readTime)),o.isValidDocument()){const u=Wh(this.Or.serializer,o);i=i.add(r.path.popLast());const c=ho(u);n+=c-l.size,t.push(this.Or.addEntry(e,r,u))}else if(n-=l.size,this.trackRemovals){const u=Wh(this.Or.serializer,o.convertToNoDocument(q.min()));t.push(this.Or.addEntry(e,r,u))}}),i.forEach(r=>{t.push(this.Or.indexManager.addToCollectionParentIndex(e,r))}),t.push(this.Or.updateMetadata(e,n)),A.waitFor(t)}getFromCache(e,t){return this.Or.vr(e,t).next(n=>(this.Nr.set(t,{size:n.size,readTime:n.document.readTime}),n.document))}getAllFromCache(e,t){return this.Or.Fr(e,t).next(({documents:n,Mr:i})=>(i.forEach((r,o)=>{this.Nr.set(r,{size:o,readTime:n.get(r).readTime})}),n))}}function ud(s){return Ae(s,xi)}function un(s){return Ae(s,no)}function ii(s){const e=s.path.toArray();return[e.slice(0,e.length-2),e[e.length-2],e[e.length-1]]}function cd(s,e){const t=e.documentKey.path.toArray();return[s,uo(e.readTime),t.slice(0,t.length-2),t.length>0?t[t.length-1]:""]}function hd(s,e){const t=s.path.toArray(),n=e.path.toArray();let i=0;for(let r=0;r<t.length-2&&r<n.length-2;++r)if(i=G(t[r],n[r]),i)return i;return i=G(t.length,n.length),i||(i=G(t[t.length-2],n[n.length-2]),i||G(t[t.length-1],n[n.length-1]))}/**
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
 */class JE{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
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
 */class up{constructor(e,t,n,i){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=n,this.indexManager=i}getDocument(e,t){let n=null;return this.documentOverlayCache.getOverlay(e,t).next(i=>(n=i,this.remoteDocumentCache.getEntry(e,t))).next(i=>(n!==null&&vi(n.mutation,i,We.empty(),se.now()),i))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(n=>this.getLocalViewOfDocuments(e,n,W()).next(()=>n))}getLocalViewOfDocuments(e,t,n=W()){const i=_t();return this.populateOverlays(e,i,t).next(()=>this.computeViews(e,t,i,n).next(r=>{let o=hi();return r.forEach((l,u)=>{o=o.insert(l,u.overlayedDocument)}),o}))}getOverlayedDocuments(e,t){const n=_t();return this.populateOverlays(e,n,t).next(()=>this.computeViews(e,t,n,W()))}populateOverlays(e,t,n){const i=[];return n.forEach(r=>{t.has(r)||i.push(r)}),this.documentOverlayCache.getOverlays(e,i).next(r=>{r.forEach((o,l)=>{t.set(o,l)})})}computeViews(e,t,n,i){let r=Je();const o=Ii(),l=function(){return Ii()}();return t.forEach((u,c)=>{const f=n.get(c.key);i.has(c.key)&&(f===void 0||f.mutation instanceof xt)?r=r.insert(c.key,c):f!==void 0?(o.set(c.key,f.mutation.getFieldMask()),vi(f.mutation,c,f.mutation.getFieldMask(),se.now())):o.set(c.key,We.empty())}),this.recalculateAndSaveOverlays(e,r).next(u=>(u.forEach((c,f)=>o.set(c,f)),t.forEach((c,f)=>{var _;return l.set(c,new JE(f,(_=o.get(c))!==null&&_!==void 0?_:null))}),l))}recalculateAndSaveOverlays(e,t){const n=Ii();let i=new _e((o,l)=>o-l),r=W();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(o=>{for(const l of o)l.keys().forEach(u=>{const c=t.get(u);if(c===null)return;let f=n.get(u)||We.empty();f=l.applyToLocalView(c,f),n.set(u,f);const _=(i.get(l.batchId)||W()).add(u);i=i.insert(l.batchId,_)})}).next(()=>{const o=[],l=i.getReverseIterator();for(;l.hasNext();){const u=l.getNext(),c=u.key,f=u.value,_=R_();f.forEach(m=>{if(!r.has(m)){const T=N_(t.get(m),n.get(m));T!==null&&_.set(m,T),r=r.add(m)}}),o.push(this.documentOverlayCache.saveOverlays(e,c,_))}return A.waitFor(o)}).next(()=>n)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(n=>this.recalculateAndSaveOverlays(e,n))}getDocumentsMatchingQuery(e,t,n,i){return function(o){return M.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):E_(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,n,i):this.getDocumentsMatchingCollectionQuery(e,t,n,i)}getNextDocuments(e,t,n,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,n,i).next(r=>{const o=i-r.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,n.largestBatchId,i-r.size):A.resolve(_t());let l=cs,u=r;return o.next(c=>A.forEach(c,(f,_)=>(l<_.largestBatchId&&(l=_.largestBatchId),r.get(f)?A.resolve():this.remoteDocumentCache.getEntry(e,f).next(m=>{u=u.insert(f,m)}))).next(()=>this.populateOverlays(e,c,r)).next(()=>this.computeViews(e,u,c,W())).next(f=>({batchId:l,changes:A_(f)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new M(t)).next(n=>{let i=hi();return n.isFoundDocument()&&(i=i.insert(n.key,n)),i})}getDocumentsMatchingCollectionGroupQuery(e,t,n,i){const r=t.collectionGroup;let o=hi();return this.indexManager.getCollectionParents(e,r).next(l=>A.forEach(l,u=>{const c=function(_,m){return new xs(m,null,_.explicitOrderBy.slice(),_.filters.slice(),_.limit,_.limitType,_.startAt,_.endAt)}(t,u.child(r));return this.getDocumentsMatchingCollectionQuery(e,c,n,i).next(f=>{f.forEach((_,m)=>{o=o.insert(_,m)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,t,n,i){let r;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,n.largestBatchId).next(o=>(r=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,n,r,i))).next(o=>{r.forEach((u,c)=>{const f=c.getKey();o.get(f)===null&&(o=o.insert(f,me.newInvalidDocument(f)))});let l=hi();return o.forEach((u,c)=>{const f=r.get(u);f!==void 0&&vi(f.mutation,c,We.empty(),se.now()),Xi(t,c)&&(l=l.insert(u,c))}),l})}}/**
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
 */class ZE{constructor(e){this.serializer=e,this.Br=new Map,this.Lr=new Map}getBundleMetadata(e,t){return A.resolve(this.Br.get(t))}saveBundleMetadata(e,t){return this.Br.set(t.id,function(i){return{id:i.id,version:i.version,createTime:ze(i.createTime)}}(t)),A.resolve()}getNamedQuery(e,t){return A.resolve(this.Lr.get(t))}saveNamedQuery(e,t){return this.Lr.set(t.name,function(i){return{name:i.name,query:X_(i.bundledQuery),readTime:ze(i.readTime)}}(t)),A.resolve()}}/**
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
 */class eI{constructor(){this.overlays=new _e(M.comparator),this.kr=new Map}getOverlay(e,t){return A.resolve(this.overlays.get(t))}getOverlays(e,t){const n=_t();return A.forEach(t,i=>this.getOverlay(e,i).next(r=>{r!==null&&n.set(i,r)})).next(()=>n)}saveOverlays(e,t,n){return n.forEach((i,r)=>{this.wt(e,t,r)}),A.resolve()}removeOverlaysForBatchId(e,t,n){const i=this.kr.get(n);return i!==void 0&&(i.forEach(r=>this.overlays=this.overlays.remove(r)),this.kr.delete(n)),A.resolve()}getOverlaysForCollection(e,t,n){const i=_t(),r=t.length+1,o=new M(t.child("")),l=this.overlays.getIteratorFrom(o);for(;l.hasNext();){const u=l.getNext().value,c=u.getKey();if(!t.isPrefixOf(c.path))break;c.path.length===r&&u.largestBatchId>n&&i.set(u.getKey(),u)}return A.resolve(i)}getOverlaysForCollectionGroup(e,t,n,i){let r=new _e((c,f)=>c-f);const o=this.overlays.getIterator();for(;o.hasNext();){const c=o.getNext().value;if(c.getKey().getCollectionGroup()===t&&c.largestBatchId>n){let f=r.get(c.largestBatchId);f===null&&(f=_t(),r=r.insert(c.largestBatchId,f)),f.set(c.getKey(),c)}}const l=_t(),u=r.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((c,f)=>l.set(c,f)),!(l.size()>=i)););return A.resolve(l)}wt(e,t,n){const i=this.overlays.get(n.key);if(i!==null){const o=this.kr.get(i.largestBatchId).delete(n.key);this.kr.set(i.largestBatchId,o)}this.overlays=this.overlays.insert(n.key,new tu(t,n));let r=this.kr.get(t);r===void 0&&(r=W(),this.kr.set(t,r)),this.kr.set(t,r.add(n.key))}}/**
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
 */class tI{constructor(){this.sessionToken=Ee.EMPTY_BYTE_STRING}getSessionToken(e){return A.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,A.resolve()}}/**
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
 */class ou{constructor(){this.qr=new re(Se.Qr),this.$r=new re(Se.Ur)}isEmpty(){return this.qr.isEmpty()}addReference(e,t){const n=new Se(e,t);this.qr=this.qr.add(n),this.$r=this.$r.add(n)}Kr(e,t){e.forEach(n=>this.addReference(n,t))}removeReference(e,t){this.Wr(new Se(e,t))}Gr(e,t){e.forEach(n=>this.removeReference(n,t))}zr(e){const t=new M(new te([])),n=new Se(t,e),i=new Se(t,e+1),r=[];return this.$r.forEachInRange([n,i],o=>{this.Wr(o),r.push(o.key)}),r}jr(){this.qr.forEach(e=>this.Wr(e))}Wr(e){this.qr=this.qr.delete(e),this.$r=this.$r.delete(e)}Jr(e){const t=new M(new te([])),n=new Se(t,e),i=new Se(t,e+1);let r=W();return this.$r.forEachInRange([n,i],o=>{r=r.add(o.key)}),r}containsKey(e){const t=new Se(e,0),n=this.qr.firstAfterOrEqual(t);return n!==null&&e.isEqual(n.key)}}class Se{constructor(e,t){this.key=e,this.Hr=t}static Qr(e,t){return M.comparator(e.key,t.key)||G(e.Hr,t.Hr)}static Ur(e,t){return G(e.Hr,t.Hr)||M.comparator(e.key,t.key)}}/**
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
 */class nI{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.er=1,this.Yr=new re(Se.Qr)}checkEmpty(e){return A.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,n,i){const r=this.er;this.er++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new Zl(r,t,n,i);this.mutationQueue.push(o);for(const l of i)this.Yr=this.Yr.add(new Se(l.key,r)),this.indexManager.addToCollectionParentIndex(e,l.key.path.popLast());return A.resolve(o)}lookupMutationBatch(e,t){return A.resolve(this.Zr(t))}getNextMutationBatchAfterBatchId(e,t){const n=t+1,i=this.Xr(n),r=i<0?0:i;return A.resolve(this.mutationQueue.length>r?this.mutationQueue[r]:null)}getHighestUnacknowledgedBatchId(){return A.resolve(this.mutationQueue.length===0?En:this.er-1)}getAllMutationBatches(e){return A.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const n=new Se(t,0),i=new Se(t,Number.POSITIVE_INFINITY),r=[];return this.Yr.forEachInRange([n,i],o=>{const l=this.Zr(o.Hr);r.push(l)}),A.resolve(r)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new re(G);return t.forEach(i=>{const r=new Se(i,0),o=new Se(i,Number.POSITIVE_INFINITY);this.Yr.forEachInRange([r,o],l=>{n=n.add(l.Hr)})}),A.resolve(this.ei(n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,i=n.length+1;let r=n;M.isDocumentKey(r)||(r=r.child(""));const o=new Se(new M(r),0);let l=new re(G);return this.Yr.forEachWhile(u=>{const c=u.key.path;return!!n.isPrefixOf(c)&&(c.length===i&&(l=l.add(u.Hr)),!0)},o),A.resolve(this.ei(l))}ei(e){const t=[];return e.forEach(n=>{const i=this.Zr(n);i!==null&&t.push(i)}),t}removeMutationBatch(e,t){U(this.ti(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let n=this.Yr;return A.forEach(t.mutations,i=>{const r=new Se(i.key,t.batchId);return n=n.delete(r),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)}).next(()=>{this.Yr=n})}rr(e){}containsKey(e,t){const n=new Se(t,0),i=this.Yr.firstAfterOrEqual(n);return A.resolve(t.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,A.resolve()}ti(e,t){return this.Xr(e)}Xr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Zr(e){const t=this.Xr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
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
 */class sI{constructor(e){this.ni=e,this.docs=function(){return new _e(M.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const n=t.key,i=this.docs.get(n),r=i?i.size:0,o=this.ni(t);return this.docs=this.docs.insert(n,{document:t.mutableCopy(),size:o}),this.size+=o-r,this.indexManager.addToCollectionParentIndex(e,n.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const n=this.docs.get(t);return A.resolve(n?n.document.mutableCopy():me.newInvalidDocument(t))}getEntries(e,t){let n=Je();return t.forEach(i=>{const r=this.docs.get(i);n=n.insert(i,r?r.document.mutableCopy():me.newInvalidDocument(i))}),A.resolve(n)}getDocumentsMatchingQuery(e,t,n,i){let r=Je();const o=t.path,l=new M(o.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(l);for(;u.hasNext();){const{key:c,value:{document:f}}=u.getNext();if(!o.isPrefixOf(c.path))break;c.path.length>o.length+1||Ul(Bf(f),n)<=0||(i.has(f.key)||Xi(t,f))&&(r=r.insert(f.key,f.mutableCopy()))}return A.resolve(r)}getAllFromCollectionGroup(e,t,n,i){F(9500)}ri(e,t){return A.forEach(this.docs,n=>t(n))}newChangeBuffer(e){return new iI(this)}getSize(e){return A.resolve(this.size)}}class iI extends ap{constructor(e){super(),this.Or=e}applyChanges(e){const t=[];return this.changes.forEach((n,i)=>{i.isValidDocument()?t.push(this.Or.addEntry(e,i)):this.Or.removeEntry(n)}),A.waitFor(t)}getFromCache(e,t){return this.Or.getEntry(e,t)}getAllFromCache(e,t){return this.Or.getEntries(e,t)}}/**
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
 */class rI{constructor(e){this.persistence=e,this.ii=new Vt(t=>Rn(t),Yi),this.lastRemoteSnapshotVersion=q.min(),this.highestTargetId=0,this.si=0,this.oi=new ou,this.targetCount=0,this._i=Pn.ar()}forEachTarget(e,t){return this.ii.forEach((n,i)=>t(i)),A.resolve()}getLastRemoteSnapshotVersion(e){return A.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return A.resolve(this.si)}allocateTargetId(e){return this.highestTargetId=this._i.next(),A.resolve(this.highestTargetId)}setTargetsMetadata(e,t,n){return n&&(this.lastRemoteSnapshotVersion=n),t>this.si&&(this.si=t),A.resolve()}hr(e){this.ii.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this._i=new Pn(t),this.highestTargetId=t),e.sequenceNumber>this.si&&(this.si=e.sequenceNumber)}addTargetData(e,t){return this.hr(t),this.targetCount+=1,A.resolve()}updateTargetData(e,t){return this.hr(t),A.resolve()}removeTargetData(e,t){return this.ii.delete(t.target),this.oi.zr(t.targetId),this.targetCount-=1,A.resolve()}removeTargets(e,t,n){let i=0;const r=[];return this.ii.forEach((o,l)=>{l.sequenceNumber<=t&&n.get(l.targetId)===null&&(this.ii.delete(o),r.push(this.removeMatchingKeysForTargetId(e,l.targetId)),i++)}),A.waitFor(r).next(()=>i)}getTargetCount(e){return A.resolve(this.targetCount)}getTargetData(e,t){const n=this.ii.get(t)||null;return A.resolve(n)}addMatchingKeys(e,t,n){return this.oi.Kr(t,n),A.resolve()}removeMatchingKeys(e,t,n){this.oi.Gr(t,n);const i=this.persistence.referenceDelegate,r=[];return i&&t.forEach(o=>{r.push(i.markPotentiallyOrphaned(e,o))}),A.waitFor(r)}removeMatchingKeysForTargetId(e,t){return this.oi.zr(t),A.resolve()}getMatchingKeysForTargetId(e,t){const n=this.oi.Jr(t);return A.resolve(n)}containsKey(e,t){return A.resolve(this.oi.containsKey(t))}}/**
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
 */class au{constructor(e,t){this.ai={},this.overlays={},this.ui=new Ke(0),this.ci=!1,this.ci=!0,this.li=new tI,this.referenceDelegate=e(this),this.hi=new rI(this),this.indexManager=new zE,this.remoteDocumentCache=function(i){return new sI(i)}(n=>this.referenceDelegate.Pi(n)),this.serializer=new H_(t),this.Ti=new ZE(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ci=!1,Promise.resolve()}get started(){return this.ci}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new eI,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let n=this.ai[e.toKey()];return n||(n=new nI(t,this.referenceDelegate),this.ai[e.toKey()]=n),n}getGlobalsCache(){return this.li}getTargetCache(){return this.hi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ti}runTransaction(e,t,n){x("MemoryPersistence","Starting transaction:",e);const i=new oI(this.ui.next());return this.referenceDelegate.Ii(),n(i).next(r=>this.referenceDelegate.di(i).next(()=>r)).toPromise().then(r=>(i.raiseOnCommittedEvent(),r))}Ei(e,t){return A.or(Object.values(this.ai).map(n=>()=>n.containsKey(e,t)))}}class oI extends jf{constructor(e){super(),this.currentSequenceNumber=e}}class $o{constructor(e){this.persistence=e,this.Ai=new ou,this.Ri=null}static Vi(e){return new $o(e)}get mi(){if(this.Ri)return this.Ri;throw F(60996)}addReference(e,t,n){return this.Ai.addReference(n,t),this.mi.delete(n.toString()),A.resolve()}removeReference(e,t,n){return this.Ai.removeReference(n,t),this.mi.add(n.toString()),A.resolve()}markPotentiallyOrphaned(e,t){return this.mi.add(t.toString()),A.resolve()}removeTarget(e,t){this.Ai.zr(t.targetId).forEach(i=>this.mi.add(i.toString()));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(e,t.targetId).next(i=>{i.forEach(r=>this.mi.add(r.toString()))}).next(()=>n.removeTargetData(e,t))}Ii(){this.Ri=new Set}di(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return A.forEach(this.mi,n=>{const i=M.fromPath(n);return this.fi(e,i).next(r=>{r||t.removeEntry(i,q.min())})}).next(()=>(this.Ri=null,t.apply(e)))}updateLimboDocument(e,t){return this.fi(e,t).next(n=>{n?this.mi.delete(t.toString()):this.mi.add(t.toString())})}Pi(e){return 0}fi(e,t){return A.or([()=>A.resolve(this.Ai.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ei(e,t)])}}class fo{constructor(e,t){this.persistence=e,this.gi=new Vt(n=>Be(n.path),(n,i)=>n.isEqual(i)),this.garbageCollector=op(this,t)}static Vi(e,t){return new fo(e,t)}Ii(){}di(e){return A.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}mr(e){const t=this.yr(e);return this.persistence.getTargetCache().getTargetCount(e).next(n=>t.next(i=>n+i))}yr(e){let t=0;return this.gr(e,n=>{t++}).next(()=>t)}gr(e,t){return A.forEach(this.gi,(n,i)=>this.Sr(e,n,i).next(r=>r?A.resolve():t(i)))}removeTargets(e,t,n){return this.persistence.getTargetCache().removeTargets(e,t,n)}removeOrphanedDocuments(e,t){let n=0;const i=this.persistence.getRemoteDocumentCache(),r=i.newChangeBuffer();return i.ri(e,o=>this.Sr(e,o,t).next(l=>{l||(n++,r.removeEntry(o,q.min()))})).next(()=>r.apply(e)).next(()=>n)}markPotentiallyOrphaned(e,t){return this.gi.set(t,e.currentSequenceNumber),A.resolve()}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,n)}addReference(e,t,n){return this.gi.set(n,e.currentSequenceNumber),A.resolve()}removeReference(e,t,n){return this.gi.set(n,e.currentSequenceNumber),A.resolve()}updateLimboDocument(e,t){return this.gi.set(t,e.currentSequenceNumber),A.resolve()}Pi(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Gr(e.data.value)),t}Sr(e,t,n){return A.or([()=>this.persistence.Ei(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const i=this.gi.get(t);return A.resolve(i!==void 0&&i>n)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
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
 */class aI{constructor(e){this.serializer=e}q(e,t,n,i){const r=new Oo("createOrUpgrade",t);n<1&&i>=1&&(function(u){u.createObjectStore(Hi)}(e),function(u){u.createObjectStore(Vi,{keyPath:wy}),u.createObjectStore(rt,{keyPath:Th,autoIncrement:!0}).createIndex(gn,wh,{unique:!0}),u.createObjectStore(hs)}(e),dd(e),function(u){u.createObjectStore(hn)}(e));let o=A.resolve();return n<3&&i>=3&&(n!==0&&(function(u){u.deleteObjectStore(fs),u.deleteObjectStore(ds),u.deleteObjectStore(In)}(e),dd(e)),o=o.next(()=>function(u){const c=u.store(In),f={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:q.min().toTimestamp(),targetCount:0};return c.put(so,f)}(r))),n<4&&i>=4&&(n!==0&&(o=o.next(()=>function(u,c){return c.store(rt).j().next(_=>{u.deleteObjectStore(rt),u.createObjectStore(rt,{keyPath:Th,autoIncrement:!0}).createIndex(gn,wh,{unique:!0});const m=c.store(rt),T=_.map(C=>m.put(C));return A.waitFor(T)})}(e,r))),o=o.next(()=>{(function(u){u.createObjectStore(_s,{keyPath:Ny})})(e)})),n<5&&i>=5&&(o=o.next(()=>this.pi(r))),n<6&&i>=6&&(o=o.next(()=>(function(u){u.createObjectStore(xi)}(e),this.yi(r)))),n<7&&i>=7&&(o=o.next(()=>this.wi(r))),n<8&&i>=8&&(o=o.next(()=>this.Si(e,r))),n<9&&i>=9&&(o=o.next(()=>{(function(u){u.objectStoreNames.contains("remoteDocumentChanges")&&u.deleteObjectStore("remoteDocumentChanges")})(e)})),n<10&&i>=10&&(o=o.next(()=>this.bi(r))),n<11&&i>=11&&(o=o.next(()=>{(function(u){u.createObjectStore(Fo,{keyPath:Dy})})(e),function(u){u.createObjectStore(Lo,{keyPath:ky})}(e)})),n<12&&i>=12&&(o=o.next(()=>{(function(u){const c=u.createObjectStore(Uo,{keyPath:qy});c.createIndex(Za,jy,{unique:!1}),c.createIndex(Yf,Gy,{unique:!1})})(e)})),n<13&&i>=13&&(o=o.next(()=>function(u){const c=u.createObjectStore(no,{keyPath:Ry});c.createIndex(qr,Sy),c.createIndex(Wf,Cy)}(e)).next(()=>this.Di(e,r)).next(()=>e.deleteObjectStore(hn))),n<14&&i>=14&&(o=o.next(()=>this.Ci(e,r))),n<15&&i>=15&&(o=o.next(()=>function(u){u.createObjectStore(jl,{keyPath:Oy,autoIncrement:!0}).createIndex(Ja,My,{unique:!1}),u.createObjectStore(mi,{keyPath:Fy}).createIndex(Qf,Ly,{unique:!1}),u.createObjectStore(gi,{keyPath:Uy}).createIndex(Hf,By,{unique:!1})}(e))),n<16&&i>=16&&(o=o.next(()=>{t.objectStore(mi).clear()}).next(()=>{t.objectStore(gi).clear()})),n<17&&i>=17&&(o=o.next(()=>{(function(u){u.createObjectStore(Gl,{keyPath:zy})})(e)})),n<18&&i>=18&&wf()&&(o=o.next(()=>{t.objectStore(mi).clear()}).next(()=>{t.objectStore(gi).clear()})),o}yi(e){let t=0;return e.store(hn).X((n,i)=>{t+=ho(i)}).next(()=>{const n={byteSize:t};return e.store(xi).put(Xa,n)})}pi(e){const t=e.store(Vi),n=e.store(rt);return t.j().next(i=>A.forEach(i,r=>{const o=IDBKeyRange.bound([r.userId,En],[r.userId,r.lastAcknowledgedBatchId]);return n.j(gn,o).next(l=>A.forEach(l,u=>{U(u.userId===r.userId,18650,"Cannot process batch from unexpected user",{batchId:u.batchId});const c=_n(this.serializer,u);return tp(e,r.userId,c).next(()=>{})}))}))}wi(e){const t=e.store(fs),n=e.store(hn);return e.store(In).get(so).next(i=>{const r=[];return n.X((o,l)=>{const u=new te(o),c=function(_){return[0,Be(_)]}(u);r.push(t.get(c).next(f=>f?A.resolve():(_=>t.put({targetId:0,path:Be(_),sequenceNumber:i.highestListenSequenceNumber}))(u)))}).next(()=>A.waitFor(r))})}Si(e,t){e.createObjectStore(Ni,{keyPath:xy});const n=t.store(Ni),i=new ru,r=o=>{if(i.add(o)){const l=o.lastSegment(),u=o.popLast();return n.put({collectionId:l,parent:Be(u)})}};return t.store(hn).X({Z:!0},(o,l)=>{const u=new te(o);return r(u.popLast())}).next(()=>t.store(hs).X({Z:!0},([o,l,u],c)=>{const f=ft(l);return r(f.popLast())}))}bi(e){const t=e.store(ds);return t.X((n,i)=>{const r=fi(i),o=Y_(this.serializer,r);return t.put(o)})}Di(e,t){const n=t.store(hn),i=[];return n.X((r,o)=>{const l=t.store(no),u=function(_){return _.document?new M(te.fromString(_.document.name).popFirst(5)):_.noDocument?M.fromSegments(_.noDocument.path):_.unknownDocument?M.fromSegments(_.unknownDocument.path):F(36783)}(o).path.toArray(),c={prefixPath:u.slice(0,u.length-2),collectionGroup:u[u.length-2],documentId:u[u.length-1],readTime:o.readTime||[0,0],unknownDocument:o.unknownDocument,noDocument:o.noDocument,document:o.document,hasCommittedMutations:!!o.hasCommittedMutations};i.push(l.put(c))}).next(()=>A.waitFor(i))}Ci(e,t){const n=t.store(rt),i=lp(this.serializer),r=new au($o.Vi,this.serializer.gt);return n.j().next(o=>{const l=new Map;return o.forEach(u=>{var c;let f=(c=l.get(u.userId))!==null&&c!==void 0?c:W();_n(this.serializer,u).keys().forEach(_=>f=f.add(_)),l.set(u.userId,f)}),A.forEach(l,(u,c)=>{const f=new Oe(c),_=Ko.yt(this.serializer,f),m=r.getIndexManager(f),T=Wo.yt(f,this.serializer,m,r.referenceDelegate);return new up(i,T,_,m).recalculateAndSaveOverlaysForDocumentKeys(new el(t,Ke.ue),u).next()})})}}function dd(s){s.createObjectStore(fs,{keyPath:by}).createIndex(ql,Vy,{unique:!0}),s.createObjectStore(ds,{keyPath:"targetId"}).createIndex($f,Py,{unique:!0}),s.createObjectStore(In)}const Lt="IndexedDbPersistence",ka=18e5,Oa=5e3,Ma="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.",lI="main";class lu{constructor(e,t,n,i,r,o,l,u,c,f,_=18){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=n,this.Fi=r,this.window=o,this.document=l,this.Mi=c,this.xi=f,this.Oi=_,this.ui=null,this.ci=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Ni=null,this.inForeground=!1,this.Bi=null,this.Li=null,this.ki=Number.NEGATIVE_INFINITY,this.qi=m=>Promise.resolve(),!lu.C())throw new D(b.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new HE(this,i),this.Qi=t+lI,this.serializer=new H_(u),this.$i=new jt(this.Qi,this.Oi,new aI(this.serializer)),this.li=new LE,this.hi=new WE(this.referenceDelegate,this.serializer),this.remoteDocumentCache=lp(this.serializer),this.Ti=new FE,this.window&&this.window.localStorage?this.Ui=this.window.localStorage:(this.Ui=null,f===!1&&ye(Lt,"LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.Ki().then(()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new D(b.FAILED_PRECONDITION,Ma);return this.Wi(),this.Gi(),this.zi(),this.runTransaction("getHighestListenSequenceNumber","readonly",e=>this.hi.getHighestSequenceNumber(e))}).then(e=>{this.ui=new Ke(e,this.Mi)}).then(()=>{this.ci=!0}).catch(e=>(this.$i&&this.$i.close(),Promise.reject(e)))}ji(e){return this.qi=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.$i.setDatabaseDeletedListener(e)}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.Fi.enqueueAndForget(async()=>{this.started&&await this.Ki()}))}Ki(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",e=>Dr(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next(()=>{if(this.isPrimary)return this.Ji(e).next(t=>{t||(this.isPrimary=!1,this.Fi.enqueueRetryable(()=>this.qi(!1)))})}).next(()=>this.Hi(e)).next(t=>this.isPrimary&&!t?this.Yi(e).next(()=>!1):!!t&&this.Zi(e).next(()=>!0))).catch(e=>{if(en(e))return x(Lt,"Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return x(Lt,"Releasing owner lease after error during lease refresh",e),!1}).then(e=>{this.isPrimary!==e&&this.Fi.enqueueRetryable(()=>this.qi(e)),this.isPrimary=e})}Ji(e){return ri(e).get(jn).next(t=>A.resolve(this.Xi(t)))}es(e){return Dr(e).delete(this.clientId)}async ts(){if(this.isPrimary&&!this.ns(this.ki,ka)){this.ki=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",t=>{const n=Ae(t,_s);return n.j().next(i=>{const r=this.rs(i,ka),o=i.filter(l=>r.indexOf(l)===-1);return A.forEach(o,l=>n.delete(l.clientId)).next(()=>o)})}).catch(()=>[]);if(this.Ui)for(const t of e)this.Ui.removeItem(this.ss(t.clientId))}}zi(){this.Li=this.Fi.enqueueAfterDelay("client_metadata_refresh",4e3,()=>this.Ki().then(()=>this.ts()).then(()=>this.zi()))}Xi(e){return!!e&&e.ownerId===this.clientId}Hi(e){return this.xi?A.resolve(!0):ri(e).get(jn).next(t=>{if(t!==null&&this.ns(t.leaseTimestampMs,Oa)&&!this._s(t.ownerId)){if(this.Xi(t)&&this.networkEnabled)return!0;if(!this.Xi(t)){if(!t.allowTabSynchronization)throw new D(b.FAILED_PRECONDITION,Ma);return!1}}return!(!this.networkEnabled||!this.inForeground)||Dr(e).j().next(n=>this.rs(n,Oa).find(i=>{if(this.clientId!==i.clientId){const r=!this.networkEnabled&&i.networkEnabled,o=!this.inForeground&&i.inForeground,l=this.networkEnabled===i.networkEnabled;if(r||o&&l)return!0}return!1})===void 0)}).next(t=>(this.isPrimary!==t&&x(Lt,`Client ${t?"is":"is not"} eligible for a primary lease.`),t))}async shutdown(){this.ci=!1,this.us(),this.Li&&(this.Li.cancel(),this.Li=null),this.cs(),this.ls(),await this.$i.runTransaction("shutdown","readwrite",[Hi,_s],e=>{const t=new el(e,Ke.ue);return this.Yi(t).next(()=>this.es(t))}),this.$i.close(),this.hs()}rs(e,t){return e.filter(n=>this.ns(n.updateTimeMs,t)&&!this._s(n.clientId))}Ps(){return this.runTransaction("getActiveClients","readonly",e=>Dr(e).j().next(t=>this.rs(t,ka).map(n=>n.clientId)))}get started(){return this.ci}getGlobalsCache(){return this.li}getMutationQueue(e,t){return Wo.yt(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.hi}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new KE(e,this.serializer.gt.databaseId)}getDocumentOverlayCache(e){return Ko.yt(this.serializer,e)}getBundleCache(){return this.Ti}runTransaction(e,t,n){x(Lt,"Starting transaction:",e);const i=t==="readonly"?"readonly":"readwrite",r=function(u){return u===18?$y:u===17?e_:u===16?Wy:u===15?zl:u===14?Zf:u===13?Jf:u===12?Ky:u===11?Xf:void F(60245)}(this.Oi);let o;return this.$i.runTransaction(e,i,r,l=>(o=new el(l,this.ui?this.ui.next():Ke.ue),t==="readwrite-primary"?this.Ji(o).next(u=>!!u||this.Hi(o)).next(u=>{if(!u)throw ye(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.Fi.enqueueRetryable(()=>this.qi(!1)),new D(b.FAILED_PRECONDITION,qf);return n(o)}).next(u=>this.Zi(o).next(()=>u)):this.Ts(o).next(()=>n(o)))).then(l=>(o.raiseOnCommittedEvent(),l))}Ts(e){return ri(e).get(jn).next(t=>{if(t!==null&&this.ns(t.leaseTimestampMs,Oa)&&!this._s(t.ownerId)&&!this.Xi(t)&&!(this.xi||this.allowTabSynchronization&&t.allowTabSynchronization))throw new D(b.FAILED_PRECONDITION,Ma)})}Zi(e){const t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return ri(e).put(jn,t)}static C(){return jt.C()}Yi(e){const t=ri(e);return t.get(jn).next(n=>this.Xi(n)?(x(Lt,"Releasing primary lease."),t.delete(jn)):A.resolve())}ns(e,t){const n=Date.now();return!(e<n-t)&&(!(e>n)||(ye(`Detected an update time that is in the future: ${e} > ${n}`),!1))}Wi(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.Bi=()=>{this.Fi.enqueueAndForget(()=>(this.inForeground=this.document.visibilityState==="visible",this.Ki()))},this.document.addEventListener("visibilitychange",this.Bi),this.inForeground=this.document.visibilityState==="visible")}cs(){this.Bi&&(this.document.removeEventListener("visibilitychange",this.Bi),this.Bi=null)}Gi(){var e;typeof((e=this.window)===null||e===void 0?void 0:e.addEventListener)=="function"&&(this.Ni=()=>{this.us();const t=/(?:Version|Mobile)\/1[456]/;Tf()&&(navigator.appVersion.match(t)||navigator.userAgent.match(t))&&this.Fi.enterRestrictedMode(!0),this.Fi.enqueueAndForget(()=>this.shutdown())},this.window.addEventListener("pagehide",this.Ni))}ls(){this.Ni&&(this.window.removeEventListener("pagehide",this.Ni),this.Ni=null)}_s(e){var t;try{const n=((t=this.Ui)===null||t===void 0?void 0:t.getItem(this.ss(e)))!==null;return x(Lt,`Client '${e}' ${n?"is":"is not"} zombied in LocalStorage`),n}catch(n){return ye(Lt,"Failed to get zombied client id.",n),!1}}us(){if(this.Ui)try{this.Ui.setItem(this.ss(this.clientId),String(Date.now()))}catch(e){ye("Failed to set zombie client id.",e)}}hs(){if(this.Ui)try{this.Ui.removeItem(this.ss(this.clientId))}catch{}}ss(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function ri(s){return Ae(s,Hi)}function Dr(s){return Ae(s,_s)}function cp(s,e){let t=s.projectId;return s.isDefaultDatabase||(t+="."+s.database),"firestore/"+e+"/"+t+"/"}/**
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
 */class uu{constructor(e,t,n,i){this.targetId=e,this.fromCache=t,this.Is=n,this.ds=i}static Es(e,t){let n=W(),i=W();for(const r of t.docChanges)switch(r.type){case 0:n=n.add(r.doc.key);break;case 1:i=i.add(r.doc.key)}return new uu(e,t.fromCache,n,i)}}/**
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
 */class uI{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class hp{constructor(){this.As=!1,this.Rs=!1,this.Vs=100,this.fs=function(){return Tf()?8:Gf(Jr())>0?6:4}()}initialize(e,t){this.gs=e,this.indexManager=t,this.As=!0}getDocumentsMatchingQuery(e,t,n,i){const r={result:null};return this.ps(e,t).next(o=>{r.result=o}).next(()=>{if(!r.result)return this.ys(e,t,i,n).next(o=>{r.result=o})}).next(()=>{if(r.result)return;const o=new uI;return this.ws(e,t,o).next(l=>{if(r.result=l,this.Rs)return this.Ss(e,t,o,l.size)})}).next(()=>r.result)}Ss(e,t,n,i){return n.documentReadCount<this.Vs?(Hn()<=dt.DEBUG&&x("QueryEngine","SDK will not create cache indexes for query:",Yn(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),A.resolve()):(Hn()<=dt.DEBUG&&x("QueryEngine","Query:",Yn(t),"scans",n.documentReadCount,"local documents and returns",i,"documents as results."),n.documentReadCount>this.fs*i?(Hn()<=dt.DEBUG&&x("QueryEngine","The SDK decides to create cache indexes for query:",Yn(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,Ze(t))):A.resolve())}ps(e,t){if(Mh(t))return A.resolve(null);let n=Ze(t);return this.indexManager.getIndexType(e,n).next(i=>i===0?null:(t.limit!==null&&i===1&&(t=ll(t,null,"F"),n=Ze(t)),this.indexManager.getDocumentsMatchingTarget(e,n).next(r=>{const o=W(...r);return this.gs.getDocuments(e,o).next(l=>this.indexManager.getMinOffset(e,n).next(u=>{const c=this.bs(t,l);return this.Ds(t,c,o,u.readTime)?this.ps(e,ll(t,null,"F")):this.vs(e,c,t,u)}))})))}ys(e,t,n,i){return Mh(t)||i.isEqual(q.min())?A.resolve(null):this.gs.getDocuments(e,n).next(r=>{const o=this.bs(t,r);return this.Ds(t,o,n,i)?A.resolve(null):(Hn()<=dt.DEBUG&&x("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),Yn(t)),this.vs(e,o,t,Uf(i,cs)).next(l=>l))})}bs(e,t){let n=new re(T_(e));return t.forEach((i,r)=>{Xi(e,r)&&(n=n.add(r))}),n}Ds(e,t,n,i){if(e.limit===null)return!1;if(n.size!==t.size)return!0;const r=e.limitType==="F"?t.last():t.first();return!!r&&(r.hasPendingWrites||r.version.compareTo(i)>0)}ws(e,t,n){return Hn()<=dt.DEBUG&&x("QueryEngine","Using full collection scan to execute query:",Yn(t)),this.gs.getDocumentsMatchingQuery(e,t,nt.min(),n)}vs(e,t,n,i){return this.gs.getDocumentsMatchingQuery(e,n,i).next(r=>(t.forEach(o=>{r=r.insert(o.key,o)}),r))}}/**
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
 */const cu="LocalStore",cI=3e8;class hI{constructor(e,t,n,i){this.persistence=e,this.Cs=t,this.serializer=i,this.Fs=new _e(G),this.Ms=new Vt(r=>Rn(r),Yi),this.xs=new Map,this.Os=e.getRemoteDocumentCache(),this.hi=e.getTargetCache(),this.Ti=e.getBundleCache(),this.Ns(n)}Ns(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new up(this.Os,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Os.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Fs))}}function dp(s,e,t,n){return new hI(s,e,t,n)}async function fp(s,e){const t=L(s);return await t.persistence.runTransaction("Handle user change","readonly",n=>{let i;return t.mutationQueue.getAllMutationBatches(n).next(r=>(i=r,t.Ns(e),t.mutationQueue.getAllMutationBatches(n))).next(r=>{const o=[],l=[];let u=W();for(const c of i){o.push(c.batchId);for(const f of c.mutations)u=u.add(f.key)}for(const c of r){l.push(c.batchId);for(const f of c.mutations)u=u.add(f.key)}return t.localDocuments.getDocuments(n,u).next(c=>({Bs:c,removedBatchIds:o,addedBatchIds:l}))})})}function dI(s,e){const t=L(s);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",n=>{const i=e.batch.keys(),r=t.Os.newChangeBuffer({trackRemovals:!0});return function(l,u,c,f){const _=c.batch,m=_.keys();let T=A.resolve();return m.forEach(C=>{T=T.next(()=>f.getEntry(u,C)).next(V=>{const N=c.docVersions.get(C);U(N!==null,48541),V.version.compareTo(N)<0&&(_.applyToRemoteDocument(V,c),V.isValidDocument()&&(V.setReadTime(c.commitVersion),f.addEntry(V)))})}),T.next(()=>l.mutationQueue.removeMutationBatch(u,_))}(t,n,e,r).next(()=>r.apply(n)).next(()=>t.mutationQueue.performConsistencyCheck(n)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(n,i,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(n,function(l){let u=W();for(let c=0;c<l.mutationResults.length;++c)l.mutationResults[c].transformResults.length>0&&(u=u.add(l.batch.mutations[c].key));return u}(e))).next(()=>t.localDocuments.getDocuments(n,i))})}function _p(s){const e=L(s);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.hi.getLastRemoteSnapshotVersion(t))}function fI(s,e){const t=L(s),n=e.snapshotVersion;let i=t.Fs;return t.persistence.runTransaction("Apply remote event","readwrite-primary",r=>{const o=t.Os.newChangeBuffer({trackRemovals:!0});i=t.Fs;const l=[];e.targetChanges.forEach((f,_)=>{const m=i.get(_);if(!m)return;l.push(t.hi.removeMatchingKeys(r,f.removedDocuments,_).next(()=>t.hi.addMatchingKeys(r,f.addedDocuments,_)));let T=m.withSequenceNumber(r.currentSequenceNumber);e.targetMismatches.get(_)!==null?T=T.withResumeToken(Ee.EMPTY_BYTE_STRING,q.min()).withLastLimboFreeSnapshotVersion(q.min()):f.resumeToken.approximateByteSize()>0&&(T=T.withResumeToken(f.resumeToken,n)),i=i.insert(_,T),function(V,N,K){return V.resumeToken.approximateByteSize()===0||N.snapshotVersion.toMicroseconds()-V.snapshotVersion.toMicroseconds()>=cI?!0:K.addedDocuments.size+K.modifiedDocuments.size+K.removedDocuments.size>0}(m,T,f)&&l.push(t.hi.updateTargetData(r,T))});let u=Je(),c=W();if(e.documentUpdates.forEach(f=>{e.resolvedLimboDocuments.has(f)&&l.push(t.persistence.referenceDelegate.updateLimboDocument(r,f))}),l.push(_I(r,o,e.documentUpdates).next(f=>{u=f.Ls,c=f.ks})),!n.isEqual(q.min())){const f=t.hi.getLastRemoteSnapshotVersion(r).next(_=>t.hi.setTargetsMetadata(r,r.currentSequenceNumber,n));l.push(f)}return A.waitFor(l).next(()=>o.apply(r)).next(()=>t.localDocuments.getLocalViewOfDocuments(r,u,c)).next(()=>u)}).then(r=>(t.Fs=i,r))}function _I(s,e,t){let n=W(),i=W();return t.forEach(r=>n=n.add(r)),e.getEntries(s,n).next(r=>{let o=Je();return t.forEach((l,u)=>{const c=r.get(l);u.isFoundDocument()!==c.isFoundDocument()&&(i=i.add(l)),u.isNoDocument()&&u.version.isEqual(q.min())?(e.removeEntry(l,u.readTime),o=o.insert(l,u)):!c.isValidDocument()||u.version.compareTo(c.version)>0||u.version.compareTo(c.version)===0&&c.hasPendingWrites?(e.addEntry(u),o=o.insert(l,u)):x(cu,"Ignoring outdated watch update for ",l,". Current version:",c.version," Watch version:",u.version)}),{Ls:o,ks:i}})}function pI(s,e){const t=L(s);return t.persistence.runTransaction("Get next mutation batch","readonly",n=>(e===void 0&&(e=En),t.mutationQueue.getNextMutationBatchAfterBatchId(n,e)))}function _o(s,e){const t=L(s);return t.persistence.runTransaction("Allocate target","readwrite",n=>{let i;return t.hi.getTargetData(n,e).next(r=>r?(i=r,A.resolve(i)):t.hi.allocateTargetId(n).next(o=>(i=new Tt(e,o,"TargetPurposeListen",n.currentSequenceNumber),t.hi.addTargetData(n,i).next(()=>i))))}).then(n=>{const i=t.Fs.get(n.targetId);return(i===null||n.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(t.Fs=t.Fs.insert(n.targetId,n),t.Ms.set(e,n.targetId)),n})}async function ws(s,e,t){const n=L(s),i=n.Fs.get(e),r=t?"readwrite":"readwrite-primary";try{t||await n.persistence.runTransaction("Release target",r,o=>n.persistence.referenceDelegate.removeTarget(o,i))}catch(o){if(!en(o))throw o;x(cu,`Failed to update sequence numbers for target ${e}: ${o}`)}n.Fs=n.Fs.remove(e),n.Ms.delete(i.target)}function ml(s,e,t){const n=L(s);let i=q.min(),r=W();return n.persistence.runTransaction("Execute query","readwrite",o=>function(u,c,f){const _=L(u),m=_.Ms.get(f);return m!==void 0?A.resolve(_.Fs.get(m)):_.hi.getTargetData(c,f)}(n,o,Ze(e)).next(l=>{if(l)return i=l.lastLimboFreeSnapshotVersion,n.hi.getMatchingKeysForTargetId(o,l.targetId).next(u=>{r=u})}).next(()=>n.Cs.getDocumentsMatchingQuery(o,e,t?i:q.min(),t?r:W())).next(l=>(gp(n,v_(e),l),{documents:l,qs:r})))}function pp(s,e){const t=L(s),n=L(t.hi),i=t.Fs.get(e);return i?Promise.resolve(i.target):t.persistence.runTransaction("Get target data","readonly",r=>n.Et(r,e).next(o=>o?o.target:null))}function mp(s,e){const t=L(s),n=t.xs.get(e)||q.min();return t.persistence.runTransaction("Get new document changes","readonly",i=>t.Os.getAllFromCollectionGroup(i,e,Uf(n,cs),Number.MAX_SAFE_INTEGER)).then(i=>(gp(t,e,i),i))}function gp(s,e,t){let n=s.xs.get(e)||q.min();t.forEach((i,r)=>{r.readTime.compareTo(n)>0&&(n=r.readTime)}),s.xs.set(e,n)}/**
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
 */const yp="firestore_clients";function fd(s,e){return`${yp}_${s}_${e}`}const Ep="firestore_mutations";function _d(s,e,t){let n=`${Ep}_${s}_${t}`;return e.isAuthenticated()&&(n+=`_${e.uid}`),n}const Ip="firestore_targets";function Fa(s,e){return`${Ip}_${s}_${e}`}/**
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
 */const ht="SharedClientState";class po{constructor(e,t,n,i){this.user=e,this.batchId=t,this.state=n,this.error=i}static Ks(e,t,n){const i=JSON.parse(n);let r,o=typeof i=="object"&&["pending","acknowledged","rejected"].indexOf(i.state)!==-1&&(i.error===void 0||typeof i.error=="object");return o&&i.error&&(o=typeof i.error.message=="string"&&typeof i.error.code=="string",o&&(r=new D(i.error.code,i.error.message))),o?new po(e,t,i.state,r):(ye(ht,`Failed to parse mutation state for ID '${t}': ${n}`),null)}Ws(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class Ti{constructor(e,t,n){this.targetId=e,this.state=t,this.error=n}static Ks(e,t){const n=JSON.parse(t);let i,r=typeof n=="object"&&["not-current","current","rejected"].indexOf(n.state)!==-1&&(n.error===void 0||typeof n.error=="object");return r&&n.error&&(r=typeof n.error.message=="string"&&typeof n.error.code=="string",r&&(i=new D(n.error.code,n.error.message))),r?new Ti(e,n.state,i):(ye(ht,`Failed to parse target state for ID '${e}': ${t}`),null)}Ws(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class mo{constructor(e,t){this.clientId=e,this.activeTargetIds=t}static Ks(e,t){const n=JSON.parse(t);let i=typeof n=="object"&&n.activeTargetIds instanceof Array,r=Yl();for(let o=0;i&&o<n.activeTargetIds.length;++o)i=zf(n.activeTargetIds[o]),r=r.add(n.activeTargetIds[o]);return i?new mo(e,r):(ye(ht,`Failed to parse client data for instance '${e}': ${t}`),null)}}class hu{constructor(e,t){this.clientId=e,this.onlineState=t}static Ks(e){const t=JSON.parse(e);return typeof t=="object"&&["Unknown","Online","Offline"].indexOf(t.onlineState)!==-1&&typeof t.clientId=="string"?new hu(t.clientId,t.onlineState):(ye(ht,`Failed to parse online state: ${e}`),null)}}class gl{constructor(){this.activeTargetIds=Yl()}Gs(e){this.activeTargetIds=this.activeTargetIds.add(e)}zs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class La{constructor(e,t,n,i,r){this.window=e,this.Fi=t,this.persistenceKey=n,this.js=i,this.syncEngine=null,this.onlineStateHandler=null,this.sequenceNumberHandler=null,this.Js=this.Hs.bind(this),this.Ys=new _e(G),this.started=!1,this.Zs=[];const o=n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");this.storage=this.window.localStorage,this.currentUser=r,this.Xs=fd(this.persistenceKey,this.js),this.eo=function(u){return`firestore_sequence_number_${u}`}(this.persistenceKey),this.Ys=this.Ys.insert(this.js,new gl),this.no=new RegExp(`^${yp}_${o}_([^_]*)$`),this.ro=new RegExp(`^${Ep}_${o}_(\\d+)(?:_(.*))?$`),this.io=new RegExp(`^${Ip}_${o}_(\\d+)$`),this.so=function(u){return`firestore_online_state_${u}`}(this.persistenceKey),this.oo=function(u){return`firestore_bundle_loaded_v2_${u}`}(this.persistenceKey),this.window.addEventListener("storage",this.Js)}static C(e){return!(!e||!e.localStorage)}async start(){const e=await this.syncEngine.Ps();for(const n of e){if(n===this.js)continue;const i=this.getItem(fd(this.persistenceKey,n));if(i){const r=mo.Ks(n,i);r&&(this.Ys=this.Ys.insert(r.clientId,r))}}this._o();const t=this.storage.getItem(this.so);if(t){const n=this.ao(t);n&&this.uo(n)}for(const n of this.Zs)this.Hs(n);this.Zs=[],this.window.addEventListener("pagehide",()=>this.shutdown()),this.started=!0}writeSequenceNumber(e){this.setItem(this.eo,JSON.stringify(e))}getAllActiveQueryTargets(){return this.co(this.Ys)}isActiveQueryTarget(e){let t=!1;return this.Ys.forEach((n,i)=>{i.activeTargetIds.has(e)&&(t=!0)}),t}addPendingMutation(e){this.lo(e,"pending")}updateMutationState(e,t,n){this.lo(e,t,n),this.ho(e)}addLocalQueryTarget(e,t=!0){let n="not-current";if(this.isActiveQueryTarget(e)){const i=this.storage.getItem(Fa(this.persistenceKey,e));if(i){const r=Ti.Ks(e,i);r&&(n=r.state)}}return t&&this.Po.Gs(e),this._o(),n}removeLocalQueryTarget(e){this.Po.zs(e),this._o()}isLocalQueryTarget(e){return this.Po.activeTargetIds.has(e)}clearQueryState(e){this.removeItem(Fa(this.persistenceKey,e))}updateQueryState(e,t,n){this.To(e,t,n)}handleUserChange(e,t,n){t.forEach(i=>{this.ho(i)}),this.currentUser=e,n.forEach(i=>{this.addPendingMutation(i)})}setOnlineState(e){this.Io(e)}notifyBundleLoaded(e){this.Eo(e)}shutdown(){this.started&&(this.window.removeEventListener("storage",this.Js),this.removeItem(this.Xs),this.started=!1)}getItem(e){const t=this.storage.getItem(e);return x(ht,"READ",e,t),t}setItem(e,t){x(ht,"SET",e,t),this.storage.setItem(e,t)}removeItem(e){x(ht,"REMOVE",e),this.storage.removeItem(e)}Hs(e){const t=e;if(t.storageArea===this.storage){if(x(ht,"EVENT",t.key,t.newValue),t.key===this.Xs)return void ye("Received WebStorage notification for local change. Another client might have garbage-collected our state");this.Fi.enqueueRetryable(async()=>{if(this.started){if(t.key!==null){if(this.no.test(t.key)){if(t.newValue==null){const n=this.Ao(t.key);return this.Ro(n,null)}{const n=this.Vo(t.key,t.newValue);if(n)return this.Ro(n.clientId,n)}}else if(this.ro.test(t.key)){if(t.newValue!==null){const n=this.mo(t.key,t.newValue);if(n)return this.fo(n)}}else if(this.io.test(t.key)){if(t.newValue!==null){const n=this.po(t.key,t.newValue);if(n)return this.yo(n)}}else if(t.key===this.so){if(t.newValue!==null){const n=this.ao(t.newValue);if(n)return this.uo(n)}}else if(t.key===this.eo){const n=function(r){let o=Ke.ue;if(r!=null)try{const l=JSON.parse(r);U(typeof l=="number",30636,{wo:r}),o=l}catch(l){ye(ht,"Failed to read sequence number from WebStorage",l)}return o}(t.newValue);n!==Ke.ue&&this.sequenceNumberHandler(n)}else if(t.key===this.oo){const n=this.So(t.newValue);await Promise.all(n.map(i=>this.syncEngine.bo(i)))}}}else this.Zs.push(t)})}}get Po(){return this.Ys.get(this.js)}_o(){this.setItem(this.Xs,this.Po.Ws())}lo(e,t,n){const i=new po(this.currentUser,e,t,n),r=_d(this.persistenceKey,this.currentUser,e);this.setItem(r,i.Ws())}ho(e){const t=_d(this.persistenceKey,this.currentUser,e);this.removeItem(t)}Io(e){const t={clientId:this.js,onlineState:e};this.storage.setItem(this.so,JSON.stringify(t))}To(e,t,n){const i=Fa(this.persistenceKey,e),r=new Ti(e,t,n);this.setItem(i,r.Ws())}Eo(e){const t=JSON.stringify(Array.from(e));this.setItem(this.oo,t)}Ao(e){const t=this.no.exec(e);return t?t[1]:null}Vo(e,t){const n=this.Ao(e);return mo.Ks(n,t)}mo(e,t){const n=this.ro.exec(e),i=Number(n[1]),r=n[2]!==void 0?n[2]:null;return po.Ks(new Oe(r),i,t)}po(e,t){const n=this.io.exec(e),i=Number(n[1]);return Ti.Ks(i,t)}ao(e){return hu.Ks(e)}So(e){return JSON.parse(e)}async fo(e){if(e.user.uid===this.currentUser.uid)return this.syncEngine.Do(e.batchId,e.state,e.error);x(ht,`Ignoring mutation for non-active user ${e.user.uid}`)}yo(e){return this.syncEngine.vo(e.targetId,e.state,e.error)}Ro(e,t){const n=t?this.Ys.insert(e,t):this.Ys.remove(e),i=this.co(this.Ys),r=this.co(n),o=[],l=[];return r.forEach(u=>{i.has(u)||o.push(u)}),i.forEach(u=>{r.has(u)||l.push(u)}),this.syncEngine.Co(o,l).then(()=>{this.Ys=n})}uo(e){this.Ys.get(e.clientId)&&this.onlineStateHandler(e.onlineState)}co(e){let t=Yl();return e.forEach((n,i)=>{t=t.unionWith(i.activeTargetIds)}),t}}class vp{constructor(){this.Fo=new gl,this.Mo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,n){}addLocalQueryTarget(e,t=!0){return t&&this.Fo.Gs(e),this.Mo[e]||"not-current"}updateQueryState(e,t,n){this.Mo[e]=t}removeLocalQueryTarget(e){this.Fo.zs(e)}isLocalQueryTarget(e){return this.Fo.activeTargetIds.has(e)}clearQueryState(e){delete this.Mo[e]}getAllActiveQueryTargets(){return this.Fo.activeTargetIds}isActiveQueryTarget(e){return this.Fo.activeTargetIds.has(e)}start(){return this.Fo=new gl,Promise.resolve()}handleUserChange(e,t,n){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class mI{xo(e){}shutdown(){}}/**
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
 */const pd="ConnectivityMonitor";class md{constructor(){this.Oo=()=>this.No(),this.Bo=()=>this.Lo(),this.ko=[],this.qo()}xo(e){this.ko.push(e)}shutdown(){window.removeEventListener("online",this.Oo),window.removeEventListener("offline",this.Bo)}qo(){window.addEventListener("online",this.Oo),window.addEventListener("offline",this.Bo)}No(){x(pd,"Network connectivity changed: AVAILABLE");for(const e of this.ko)e(0)}Lo(){x(pd,"Network connectivity changed: UNAVAILABLE");for(const e of this.ko)e(1)}static C(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let kr=null;function yl(){return kr===null?kr=function(){return 268435456+Math.round(2147483648*Math.random())}():kr++,"0x"+kr.toString(16)}/**
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
 */const Ua="RestConnection",gI={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class yI{get Qo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",n=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.$o=t+"://"+e.host,this.Uo=`projects/${n}/databases/${i}`,this.Ko=this.databaseId.database===io?`project_id=${n}`:`project_id=${n}&database_id=${i}`}Wo(e,t,n,i,r){const o=yl(),l=this.Go(e,t.toUriEncodedString());x(Ua,`Sending RPC '${e}' ${o}:`,l,n);const u={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.Ko};this.zo(u,i,r);const{host:c}=new URL(l),f=No(c);return this.jo(e,l,u,n,f).then(_=>(x(Ua,`Received RPC '${e}' ${o}: `,_),_),_=>{throw Wt(Ua,`RPC '${e}' ${o} failed with error: `,_,"url: ",l,"request:",n),_})}Jo(e,t,n,i,r,o){return this.Wo(e,t,n,i,r)}zo(e,t,n){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Vs}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((i,r)=>e[r]=i),n&&n.headers.forEach((i,r)=>e[r]=i)}Go(e,t){const n=gI[e];return`${this.$o}/v1/${t}:${n}`}terminate(){}}/**
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
 */class EI{constructor(e){this.Ho=e.Ho,this.Yo=e.Yo}Zo(e){this.Xo=e}e_(e){this.t_=e}n_(e){this.r_=e}onMessage(e){this.i_=e}close(){this.Yo()}send(e){this.Ho(e)}s_(){this.Xo()}o_(){this.t_()}__(e){this.r_(e)}a_(e){this.i_(e)}}/**
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
 */const ke="WebChannelConnection";class II extends yI{constructor(e){super(e),this.u_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}jo(e,t,n,i,r){const o=yl();return new Promise((l,u)=>{const c=new bf;c.setWithCredentials(!0),c.listenOnce(Vf.COMPLETE,()=>{try{switch(c.getLastErrorCode()){case Lr.NO_ERROR:const _=c.getResponseJson();x(ke,`XHR for RPC '${e}' ${o} received:`,JSON.stringify(_)),l(_);break;case Lr.TIMEOUT:x(ke,`RPC '${e}' ${o} timed out`),u(new D(b.DEADLINE_EXCEEDED,"Request time out"));break;case Lr.HTTP_ERROR:const m=c.getStatus();if(x(ke,`RPC '${e}' ${o} failed with status:`,m,"response text:",c.getResponseText()),m>0){let T=c.getResponseJson();Array.isArray(T)&&(T=T[0]);const C=T==null?void 0:T.error;if(C&&C.status&&C.message){const V=function(K){const j=K.toLowerCase().replace(/_/g,"-");return Object.values(b).indexOf(j)>=0?j:b.UNKNOWN}(C.status);u(new D(V,C.message))}else u(new D(b.UNKNOWN,"Server responded with status "+c.getStatus()))}else u(new D(b.UNAVAILABLE,"Connection failed."));break;default:F(9055,{c_:e,streamId:o,l_:c.getLastErrorCode(),h_:c.getLastError()})}}finally{x(ke,`RPC '${e}' ${o} completed.`)}});const f=JSON.stringify(i);x(ke,`RPC '${e}' ${o} sending request:`,i),c.send(t,"POST",f,n,15)})}P_(e,t,n){const i=yl(),r=[this.$o,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=Df(),l=Nf(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},c=this.longPollingOptions.timeoutSeconds;c!==void 0&&(u.longPollingTimeout=Math.round(1e3*c)),this.useFetchStreams&&(u.useFetchStreams=!0),this.zo(u.initMessageHeaders,t,n),u.encodeInitMessageHeaders=!0;const f=r.join("");x(ke,`Creating RPC '${e}' stream ${i}: ${f}`,u);const _=o.createWebChannel(f,u);this.T_(_);let m=!1,T=!1;const C=new EI({Ho:N=>{T?x(ke,`Not sending because RPC '${e}' stream ${i} is closed:`,N):(m||(x(ke,`Opening RPC '${e}' stream ${i} transport.`),_.open(),m=!0),x(ke,`RPC '${e}' stream ${i} sending:`,N),_.send(N))},Yo:()=>_.close()}),V=(N,K,j)=>{N.listen(K,B=>{try{j(B)}catch(J){setTimeout(()=>{throw J},0)}})};return V(_,ci.EventType.OPEN,()=>{T||(x(ke,`RPC '${e}' stream ${i} transport opened.`),C.s_())}),V(_,ci.EventType.CLOSE,()=>{T||(T=!0,x(ke,`RPC '${e}' stream ${i} transport closed`),C.__(),this.I_(_))}),V(_,ci.EventType.ERROR,N=>{T||(T=!0,Wt(ke,`RPC '${e}' stream ${i} transport errored. Name:`,N.name,"Message:",N.message),C.__(new D(b.UNAVAILABLE,"The operation could not be completed")))}),V(_,ci.EventType.MESSAGE,N=>{var K;if(!T){const j=N.data[0];U(!!j,16349);const B=j,J=(B==null?void 0:B.error)||((K=B[0])===null||K===void 0?void 0:K.error);if(J){x(ke,`RPC '${e}' stream ${i} received error:`,J);const le=J.status;let Z=function(E){const v=Ie[E];if(v!==void 0)return O_(v)}(le),I=J.message;Z===void 0&&(Z=b.INTERNAL,I="Unknown error status: "+le+" with message "+J.message),T=!0,C.__(new D(Z,I)),_.close()}else x(ke,`RPC '${e}' stream ${i} received:`,j),C.a_(j)}}),V(l,xf.STAT_EVENT,N=>{N.stat===Qa.PROXY?x(ke,`RPC '${e}' stream ${i} detected buffering proxy`):N.stat===Qa.NOPROXY&&x(ke,`RPC '${e}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{C.o_()},0),C}terminate(){this.u_.forEach(e=>e.close()),this.u_=[]}T_(e){this.u_.push(e)}I_(e){this.u_=this.u_.filter(t=>t===e)}}/**
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
 */function Tp(){return typeof window<"u"?window:null}function Qr(){return typeof document<"u"?document:null}/**
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
 */function Qo(s){return new SE(s,!0)}/**
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
 */class wp{constructor(e,t,n=1e3,i=1.5,r=6e4){this.Fi=e,this.timerId=t,this.d_=n,this.E_=i,this.A_=r,this.R_=0,this.V_=null,this.m_=Date.now(),this.reset()}reset(){this.R_=0}f_(){this.R_=this.A_}g_(e){this.cancel();const t=Math.floor(this.R_+this.p_()),n=Math.max(0,Date.now()-this.m_),i=Math.max(0,t-n);i>0&&x("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.R_} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`),this.V_=this.Fi.enqueueAfterDelay(this.timerId,i,()=>(this.m_=Date.now(),e())),this.R_*=this.E_,this.R_<this.d_&&(this.R_=this.d_),this.R_>this.A_&&(this.R_=this.A_)}y_(){this.V_!==null&&(this.V_.skipDelay(),this.V_=null)}cancel(){this.V_!==null&&(this.V_.cancel(),this.V_=null)}p_(){return(Math.random()-.5)*this.R_}}/**
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
 */const gd="PersistentStream";class Ap{constructor(e,t,n,i,r,o,l,u){this.Fi=e,this.w_=n,this.S_=i,this.connection=r,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=l,this.listener=u,this.state=0,this.b_=0,this.D_=null,this.v_=null,this.stream=null,this.C_=0,this.F_=new wp(e,t)}M_(){return this.state===1||this.state===5||this.x_()}x_(){return this.state===2||this.state===3}start(){this.C_=0,this.state!==4?this.auth():this.O_()}async stop(){this.M_()&&await this.close(0)}N_(){this.state=0,this.F_.reset()}B_(){this.x_()&&this.D_===null&&(this.D_=this.Fi.enqueueAfterDelay(this.w_,6e4,()=>this.L_()))}k_(e){this.q_(),this.stream.send(e)}async L_(){if(this.x_())return this.close(0)}q_(){this.D_&&(this.D_.cancel(),this.D_=null)}Q_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.q_(),this.Q_(),this.F_.cancel(),this.b_++,e!==4?this.F_.reset():t&&t.code===b.RESOURCE_EXHAUSTED?(ye(t.toString()),ye("Using maximum backoff delay to prevent overloading the backend."),this.F_.f_()):t&&t.code===b.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.U_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.n_(t)}U_(){}auth(){this.state=1;const e=this.K_(this.b_),t=this.b_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([n,i])=>{this.b_===t&&this.W_(n,i)},n=>{e(()=>{const i=new D(b.UNKNOWN,"Fetching auth token failed: "+n.message);return this.G_(i)})})}W_(e,t){const n=this.K_(this.b_);this.stream=this.z_(e,t),this.stream.Zo(()=>{n(()=>this.listener.Zo())}),this.stream.e_(()=>{n(()=>(this.state=2,this.v_=this.Fi.enqueueAfterDelay(this.S_,1e4,()=>(this.x_()&&(this.state=3),Promise.resolve())),this.listener.e_()))}),this.stream.n_(i=>{n(()=>this.G_(i))}),this.stream.onMessage(i=>{n(()=>++this.C_==1?this.j_(i):this.onNext(i))})}O_(){this.state=5,this.F_.g_(async()=>{this.state=0,this.start()})}G_(e){return x(gd,`close with error: ${e}`),this.stream=null,this.close(4,e)}K_(e){return t=>{this.Fi.enqueueAndForget(()=>this.b_===e?t():(x(gd,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class vI extends Ap{constructor(e,t,n,i,r,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,n,i,o),this.serializer=r}z_(e,t){return this.connection.P_("Listen",e,t)}j_(e){return this.onNext(e)}onNext(e){this.F_.reset();const t=bE(this.serializer,e),n=function(r){if(!("targetChange"in r))return q.min();const o=r.targetChange;return o.targetIds&&o.targetIds.length?q.min():o.readTime?ze(o.readTime):q.min()}(e);return this.listener.J_(t,n)}H_(e){const t={};t.database=hl(this.serializer),t.addTarget=function(r,o){let l;const u=o.target;if(l=ro(u)?{documents:G_(r,u)}:{query:z_(r,u).Vt},l.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){l.resumeToken=L_(r,o.resumeToken);const c=ul(r,o.expectedCount);c!==null&&(l.expectedCount=c)}else if(o.snapshotVersion.compareTo(q.min())>0){l.readTime=Ts(r,o.snapshotVersion.toTimestamp());const c=ul(r,o.expectedCount);c!==null&&(l.expectedCount=c)}return l}(this.serializer,e);const n=xE(this.serializer,e);n&&(t.labels=n),this.k_(t)}Y_(e){const t={};t.database=hl(this.serializer),t.removeTarget=e,this.k_(t)}}class TI extends Ap{constructor(e,t,n,i,r,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,n,i,o),this.serializer=r}get Z_(){return this.C_>0}start(){this.lastStreamToken=void 0,super.start()}U_(){this.Z_&&this.X_([])}z_(e,t){return this.connection.P_("Write",e,t)}j_(e){return U(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,U(!e.writeResults||e.writeResults.length===0,55816),this.listener.ea()}onNext(e){U(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.F_.reset();const t=VE(e.writeResults,e.commitTime),n=ze(e.commitTime);return this.listener.ta(n,t)}na(){const e={};e.database=hl(this.serializer),this.k_(e)}X_(e){const t={streamToken:this.lastStreamToken,writes:e.map(n=>lo(this.serializer,n))};this.k_(t)}}/**
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
 */class wI{}class AI extends wI{constructor(e,t,n,i){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=n,this.serializer=i,this.ra=!1}ia(){if(this.ra)throw new D(b.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,t,n,i){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([r,o])=>this.connection.Wo(e,cl(t,n),i,r,o)).catch(r=>{throw r.name==="FirebaseError"?(r.code===b.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),r):new D(b.UNKNOWN,r.toString())})}Jo(e,t,n,i,r){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,l])=>this.connection.Jo(e,cl(t,n),i,o,l,r)).catch(o=>{throw o.name==="FirebaseError"?(o.code===b.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new D(b.UNKNOWN,o.toString())})}terminate(){this.ra=!0,this.connection.terminate()}}class RI{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.sa=0,this.oa=null,this._a=!0}aa(){this.sa===0&&(this.ua("Unknown"),this.oa=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.oa=null,this.ca("Backend didn't respond within 10 seconds."),this.ua("Offline"),Promise.resolve())))}la(e){this.state==="Online"?this.ua("Unknown"):(this.sa++,this.sa>=1&&(this.ha(),this.ca(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ua("Offline")))}set(e){this.ha(),this.sa=0,e==="Online"&&(this._a=!1),this.ua(e)}ua(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}ca(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this._a?(ye(t),this._a=!1):x("OnlineStateTracker",t)}ha(){this.oa!==null&&(this.oa.cancel(),this.oa=null)}}/**
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
 */const bn="RemoteStore";class SI{constructor(e,t,n,i,r){this.localStore=e,this.datastore=t,this.asyncQueue=n,this.remoteSyncer={},this.Pa=[],this.Ta=new Map,this.Ia=new Set,this.da=[],this.Ea=r,this.Ea.xo(o=>{n.enqueueAndForget(async()=>{kn(this)&&(x(bn,"Restarting streams for network reachability change."),await async function(u){const c=L(u);c.Ia.add(4),await er(c),c.Aa.set("Unknown"),c.Ia.delete(4),await Ho(c)}(this))})}),this.Aa=new RI(n,i)}}async function Ho(s){if(kn(s))for(const e of s.da)await e(!0)}async function er(s){for(const e of s.da)await e(!1)}function Yo(s,e){const t=L(s);t.Ta.has(e.targetId)||(t.Ta.set(e.targetId,e),_u(t)?fu(t):ks(t).x_()&&du(t,e))}function As(s,e){const t=L(s),n=ks(t);t.Ta.delete(e),n.x_()&&Rp(t,e),t.Ta.size===0&&(n.x_()?n.B_():kn(t)&&t.Aa.set("Unknown"))}function du(s,e){if(s.Ra.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(q.min())>0){const t=s.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}ks(s).H_(e)}function Rp(s,e){s.Ra.$e(e),ks(s).Y_(e)}function fu(s){s.Ra=new TE({getRemoteKeysForTarget:e=>s.remoteSyncer.getRemoteKeysForTarget(e),Et:e=>s.Ta.get(e)||null,lt:()=>s.datastore.serializer.databaseId}),ks(s).start(),s.Aa.aa()}function _u(s){return kn(s)&&!ks(s).M_()&&s.Ta.size>0}function kn(s){return L(s).Ia.size===0}function Sp(s){s.Ra=void 0}async function CI(s){s.Aa.set("Online")}async function PI(s){s.Ta.forEach((e,t)=>{du(s,e)})}async function bI(s,e){Sp(s),_u(s)?(s.Aa.la(e),fu(s)):s.Aa.set("Unknown")}async function VI(s,e,t){if(s.Aa.set("Online"),e instanceof F_&&e.state===2&&e.cause)try{await async function(i,r){const o=r.cause;for(const l of r.targetIds)i.Ta.has(l)&&(await i.remoteSyncer.rejectListen(l,o),i.Ta.delete(l),i.Ra.removeTarget(l))}(s,e)}catch(n){x(bn,"Failed to remove targets %s: %s ",e.targetIds.join(","),n),await go(s,n)}else if(e instanceof Wr?s.Ra.Ye(e):e instanceof M_?s.Ra.it(e):s.Ra.et(e),!t.isEqual(q.min()))try{const n=await _p(s.localStore);t.compareTo(n)>=0&&await function(r,o){const l=r.Ra.Pt(o);return l.targetChanges.forEach((u,c)=>{if(u.resumeToken.approximateByteSize()>0){const f=r.Ta.get(c);f&&r.Ta.set(c,f.withResumeToken(u.resumeToken,o))}}),l.targetMismatches.forEach((u,c)=>{const f=r.Ta.get(u);if(!f)return;r.Ta.set(u,f.withResumeToken(Ee.EMPTY_BYTE_STRING,f.snapshotVersion)),Rp(r,u);const _=new Tt(f.target,u,c,f.sequenceNumber);du(r,_)}),r.remoteSyncer.applyRemoteEvent(l)}(s,t)}catch(n){x(bn,"Failed to raise snapshot:",n),await go(s,n)}}async function go(s,e,t){if(!en(e))throw e;s.Ia.add(1),await er(s),s.Aa.set("Offline"),t||(t=()=>_p(s.localStore)),s.asyncQueue.enqueueRetryable(async()=>{x(bn,"Retrying IndexedDB access"),await t(),s.Ia.delete(1),await Ho(s)})}function Cp(s,e){return e().catch(t=>go(s,t,e))}async function Ds(s){const e=L(s),t=Ht(e);let n=e.Pa.length>0?e.Pa[e.Pa.length-1].batchId:En;for(;xI(e);)try{const i=await pI(e.localStore,n);if(i===null){e.Pa.length===0&&t.B_();break}n=i.batchId,NI(e,i)}catch(i){await go(e,i)}Pp(e)&&bp(e)}function xI(s){return kn(s)&&s.Pa.length<10}function NI(s,e){s.Pa.push(e);const t=Ht(s);t.x_()&&t.Z_&&t.X_(e.mutations)}function Pp(s){return kn(s)&&!Ht(s).M_()&&s.Pa.length>0}function bp(s){Ht(s).start()}async function DI(s){Ht(s).na()}async function kI(s){const e=Ht(s);for(const t of s.Pa)e.X_(t.mutations)}async function OI(s,e,t){const n=s.Pa.shift(),i=eu.from(n,e,t);await Cp(s,()=>s.remoteSyncer.applySuccessfulWrite(i)),await Ds(s)}async function MI(s,e){e&&Ht(s).Z_&&await async function(n,i){if(function(o){return IE(o)&&o!==b.ABORTED}(i.code)){const r=n.Pa.shift();Ht(n).N_(),await Cp(n,()=>n.remoteSyncer.rejectFailedWrite(r.batchId,i)),await Ds(n)}}(s,e),Pp(s)&&bp(s)}async function yd(s,e){const t=L(s);t.asyncQueue.verifyOperationInProgress(),x(bn,"RemoteStore received new credentials");const n=kn(t);t.Ia.add(3),await er(t),n&&t.Aa.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ia.delete(3),await Ho(t)}async function El(s,e){const t=L(s);e?(t.Ia.delete(2),await Ho(t)):e||(t.Ia.add(2),await er(t),t.Aa.set("Unknown"))}function ks(s){return s.Va||(s.Va=function(t,n,i){const r=L(t);return r.ia(),new vI(n,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,i)}(s.datastore,s.asyncQueue,{Zo:CI.bind(null,s),e_:PI.bind(null,s),n_:bI.bind(null,s),J_:VI.bind(null,s)}),s.da.push(async e=>{e?(s.Va.N_(),_u(s)?fu(s):s.Aa.set("Unknown")):(await s.Va.stop(),Sp(s))})),s.Va}function Ht(s){return s.ma||(s.ma=function(t,n,i){const r=L(t);return r.ia(),new TI(n,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,i)}(s.datastore,s.asyncQueue,{Zo:()=>Promise.resolve(),e_:DI.bind(null,s),n_:MI.bind(null,s),ea:kI.bind(null,s),ta:OI.bind(null,s)}),s.da.push(async e=>{e?(s.ma.N_(),await Ds(s)):(await s.ma.stop(),s.Pa.length>0&&(x(bn,`Stopping write stream with ${s.Pa.length} pending writes`),s.Pa=[]))})),s.ma}/**
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
 */class pu{constructor(e,t,n,i,r){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=n,this.op=i,this.removalCallback=r,this.deferred=new At,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,n,i,r){const o=Date.now()+n,l=new pu(e,t,o,i,r);return l.start(n),l}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new D(b.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function mu(s,e){if(ye("AsyncQueue",`${e}: ${s}`),en(s))return new D(b.UNAVAILABLE,`${e}: ${s}`);throw s}/**
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
 */class ns{static emptySet(e){return new ns(e.comparator)}constructor(e){this.comparator=e?(t,n)=>e(t,n)||M.comparator(t.key,n.key):(t,n)=>M.comparator(t.key,n.key),this.keyedMap=hi(),this.sortedSet=new _e(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,n)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof ns)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),n=e.sortedSet.getIterator();for(;t.hasNext();){const i=t.getNext().key,r=n.getNext().key;if(!i.isEqual(r))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const n=new ns;return n.comparator=this.comparator,n.keyedMap=e,n.sortedSet=t,n}}/**
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
 */class Ed{constructor(){this.fa=new _e(M.comparator)}track(e){const t=e.doc.key,n=this.fa.get(t);n?e.type!==0&&n.type===3?this.fa=this.fa.insert(t,e):e.type===3&&n.type!==1?this.fa=this.fa.insert(t,{type:n.type,doc:e.doc}):e.type===2&&n.type===2?this.fa=this.fa.insert(t,{type:2,doc:e.doc}):e.type===2&&n.type===0?this.fa=this.fa.insert(t,{type:0,doc:e.doc}):e.type===1&&n.type===0?this.fa=this.fa.remove(t):e.type===1&&n.type===2?this.fa=this.fa.insert(t,{type:1,doc:n.doc}):e.type===0&&n.type===1?this.fa=this.fa.insert(t,{type:2,doc:e.doc}):F(63341,{At:e,ga:n}):this.fa=this.fa.insert(t,e)}pa(){const e=[];return this.fa.inorderTraversal((t,n)=>{e.push(n)}),e}}class Rs{constructor(e,t,n,i,r,o,l,u,c){this.query=e,this.docs=t,this.oldDocs=n,this.docChanges=i,this.mutatedKeys=r,this.fromCache=o,this.syncStateChanged=l,this.excludesMetadataChanges=u,this.hasCachedResults=c}static fromInitialDocuments(e,t,n,i,r){const o=[];return t.forEach(l=>{o.push({type:0,doc:l})}),new Rs(e,t,ns.emptySet(t),o,n,i,!0,!1,r)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&jo(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,n=e.docChanges;if(t.length!==n.length)return!1;for(let i=0;i<t.length;i++)if(t[i].type!==n[i].type||!t[i].doc.isEqual(n[i].doc))return!1;return!0}}/**
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
 */class FI{constructor(){this.ya=void 0,this.wa=[]}Sa(){return this.wa.some(e=>e.ba())}}class LI{constructor(){this.queries=Id(),this.onlineState="Unknown",this.Da=new Set}terminate(){(function(t,n){const i=L(t),r=i.queries;i.queries=Id(),r.forEach((o,l)=>{for(const u of l.wa)u.onError(n)})})(this,new D(b.ABORTED,"Firestore shutting down"))}}function Id(){return new Vt(s=>I_(s),jo)}async function UI(s,e){const t=L(s);let n=3;const i=e.query;let r=t.queries.get(i);r?!r.Sa()&&e.ba()&&(n=2):(r=new FI,n=e.ba()?0:1);try{switch(n){case 0:r.ya=await t.onListen(i,!0);break;case 1:r.ya=await t.onListen(i,!1);break;case 2:await t.onFirstRemoteStoreListen(i)}}catch(o){const l=mu(o,`Initialization of query '${Yn(e.query)}' failed`);return void e.onError(l)}t.queries.set(i,r),r.wa.push(e),e.va(t.onlineState),r.ya&&e.Ca(r.ya)&&gu(t)}async function BI(s,e){const t=L(s),n=e.query;let i=3;const r=t.queries.get(n);if(r){const o=r.wa.indexOf(e);o>=0&&(r.wa.splice(o,1),r.wa.length===0?i=e.ba()?0:1:!r.Sa()&&e.ba()&&(i=2))}switch(i){case 0:return t.queries.delete(n),t.onUnlisten(n,!0);case 1:return t.queries.delete(n),t.onUnlisten(n,!1);case 2:return t.onLastRemoteStoreUnlisten(n);default:return}}function qI(s,e){const t=L(s);let n=!1;for(const i of e){const r=i.query,o=t.queries.get(r);if(o){for(const l of o.wa)l.Ca(i)&&(n=!0);o.ya=i}}n&&gu(t)}function jI(s,e,t){const n=L(s),i=n.queries.get(e);if(i)for(const r of i.wa)r.onError(t);n.queries.delete(e)}function gu(s){s.Da.forEach(e=>{e.next()})}var Il,vd;(vd=Il||(Il={})).Fa="default",vd.Cache="cache";class GI{constructor(e,t,n){this.query=e,this.Ma=t,this.xa=!1,this.Oa=null,this.onlineState="Unknown",this.options=n||{}}Ca(e){if(!this.options.includeMetadataChanges){const n=[];for(const i of e.docChanges)i.type!==3&&n.push(i);e=new Rs(e.query,e.docs,e.oldDocs,n,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.xa?this.Na(e)&&(this.Ma.next(e),t=!0):this.Ba(e,this.onlineState)&&(this.La(e),t=!0),this.Oa=e,t}onError(e){this.Ma.error(e)}va(e){this.onlineState=e;let t=!1;return this.Oa&&!this.xa&&this.Ba(this.Oa,e)&&(this.La(this.Oa),t=!0),t}Ba(e,t){if(!e.fromCache||!this.ba())return!0;const n=t!=="Offline";return(!this.options.ka||!n)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Na(e){if(e.docChanges.length>0)return!0;const t=this.Oa&&this.Oa.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}La(e){e=Rs.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.xa=!0,this.Ma.next(e)}ba(){return this.options.source!==Il.Cache}}/**
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
 */class Vp{constructor(e){this.key=e}}class xp{constructor(e){this.key=e}}class zI{constructor(e,t){this.query=e,this.Ha=t,this.Ya=null,this.hasCachedResults=!1,this.current=!1,this.Za=W(),this.mutatedKeys=W(),this.Xa=T_(e),this.eu=new ns(this.Xa)}get tu(){return this.Ha}nu(e,t){const n=t?t.ru:new Ed,i=t?t.eu:this.eu;let r=t?t.mutatedKeys:this.mutatedKeys,o=i,l=!1;const u=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,c=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal((f,_)=>{const m=i.get(f),T=Xi(this.query,_)?_:null,C=!!m&&this.mutatedKeys.has(m.key),V=!!T&&(T.hasLocalMutations||this.mutatedKeys.has(T.key)&&T.hasCommittedMutations);let N=!1;m&&T?m.data.isEqual(T.data)?C!==V&&(n.track({type:3,doc:T}),N=!0):this.iu(m,T)||(n.track({type:2,doc:T}),N=!0,(u&&this.Xa(T,u)>0||c&&this.Xa(T,c)<0)&&(l=!0)):!m&&T?(n.track({type:0,doc:T}),N=!0):m&&!T&&(n.track({type:1,doc:m}),N=!0,(u||c)&&(l=!0)),N&&(T?(o=o.add(T),r=V?r.add(f):r.delete(f)):(o=o.delete(f),r=r.delete(f)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const f=this.query.limitType==="F"?o.last():o.first();o=o.delete(f.key),r=r.delete(f.key),n.track({type:1,doc:f})}return{eu:o,ru:n,Ds:l,mutatedKeys:r}}iu(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,n,i){const r=this.eu;this.eu=e.eu,this.mutatedKeys=e.mutatedKeys;const o=e.ru.pa();o.sort((f,_)=>function(T,C){const V=N=>{switch(N){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return F(20277,{At:N})}};return V(T)-V(C)}(f.type,_.type)||this.Xa(f.doc,_.doc)),this.su(n),i=i!=null&&i;const l=t&&!i?this.ou():[],u=this.Za.size===0&&this.current&&!i?1:0,c=u!==this.Ya;return this.Ya=u,o.length!==0||c?{snapshot:new Rs(this.query,e.eu,r,o,e.mutatedKeys,u===0,c,!1,!!n&&n.resumeToken.approximateByteSize()>0),_u:l}:{_u:l}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({eu:this.eu,ru:new Ed,mutatedKeys:this.mutatedKeys,Ds:!1},!1)):{_u:[]}}au(e){return!this.Ha.has(e)&&!!this.eu.has(e)&&!this.eu.get(e).hasLocalMutations}su(e){e&&(e.addedDocuments.forEach(t=>this.Ha=this.Ha.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Ha=this.Ha.delete(t)),this.current=e.current)}ou(){if(!this.current)return[];const e=this.Za;this.Za=W(),this.eu.forEach(n=>{this.au(n.key)&&(this.Za=this.Za.add(n.key))});const t=[];return e.forEach(n=>{this.Za.has(n)||t.push(new xp(n))}),this.Za.forEach(n=>{e.has(n)||t.push(new Vp(n))}),t}uu(e){this.Ha=e.qs,this.Za=W();const t=this.nu(e.documents);return this.applyChanges(t,!0)}cu(){return Rs.fromInitialDocuments(this.query,this.eu,this.mutatedKeys,this.Ya===0,this.hasCachedResults)}}const Os="SyncEngine";class KI{constructor(e,t,n){this.query=e,this.targetId=t,this.view=n}}class WI{constructor(e){this.key=e,this.lu=!1}}class $I{constructor(e,t,n,i,r,o){this.localStore=e,this.remoteStore=t,this.eventManager=n,this.sharedClientState=i,this.currentUser=r,this.maxConcurrentLimboResolutions=o,this.hu={},this.Pu=new Vt(l=>I_(l),jo),this.Tu=new Map,this.Iu=new Set,this.du=new _e(M.comparator),this.Eu=new Map,this.Au=new ou,this.Ru={},this.Vu=new Map,this.mu=Pn.ur(),this.onlineState="Unknown",this.fu=void 0}get isPrimaryClient(){return this.fu===!0}}async function QI(s,e,t=!0){const n=Xo(s);let i;const r=n.Pu.get(e);return r?(n.sharedClientState.addLocalQueryTarget(r.targetId),i=r.view.cu()):i=await Np(n,e,t,!0),i}async function HI(s,e){const t=Xo(s);await Np(t,e,!0,!1)}async function Np(s,e,t,n){const i=await _o(s.localStore,Ze(e)),r=i.targetId,o=s.sharedClientState.addLocalQueryTarget(r,t);let l;return n&&(l=await yu(s,e,r,o==="current",i.resumeToken)),s.isPrimaryClient&&t&&Yo(s.remoteStore,i),l}async function yu(s,e,t,n,i){s.gu=(_,m,T)=>async function(V,N,K,j){let B=N.view.nu(K);B.Ds&&(B=await ml(V.localStore,N.query,!1).then(({documents:I})=>N.view.nu(I,B)));const J=j&&j.targetChanges.get(N.targetId),le=j&&j.targetMismatches.get(N.targetId)!=null,Z=N.view.applyChanges(B,V.isPrimaryClient,J,le);return vl(V,N.targetId,Z._u),Z.snapshot}(s,_,m,T);const r=await ml(s.localStore,e,!0),o=new zI(e,r.qs),l=o.nu(r.documents),u=Zi.createSynthesizedTargetChangeForCurrentChange(t,n&&s.onlineState!=="Offline",i),c=o.applyChanges(l,s.isPrimaryClient,u);vl(s,t,c._u);const f=new KI(e,t,o);return s.Pu.set(e,f),s.Tu.has(t)?s.Tu.get(t).push(e):s.Tu.set(t,[e]),c.snapshot}async function YI(s,e,t){const n=L(s),i=n.Pu.get(e),r=n.Tu.get(i.targetId);if(r.length>1)return n.Tu.set(i.targetId,r.filter(o=>!jo(o,e))),void n.Pu.delete(e);n.isPrimaryClient?(n.sharedClientState.removeLocalQueryTarget(i.targetId),n.sharedClientState.isActiveQueryTarget(i.targetId)||await ws(n.localStore,i.targetId,!1).then(()=>{n.sharedClientState.clearQueryState(i.targetId),t&&As(n.remoteStore,i.targetId),Ss(n,i.targetId)}).catch(Zt)):(Ss(n,i.targetId),await ws(n.localStore,i.targetId,!0))}async function XI(s,e){const t=L(s),n=t.Pu.get(e),i=t.Tu.get(n.targetId);t.isPrimaryClient&&i.length===1&&(t.sharedClientState.removeLocalQueryTarget(n.targetId),As(t.remoteStore,n.targetId))}async function JI(s,e,t){const n=Tu(s);try{const i=await function(o,l){const u=L(o),c=se.now(),f=l.reduce((T,C)=>T.add(C.key),W());let _,m;return u.persistence.runTransaction("Locally write mutations","readwrite",T=>{let C=Je(),V=W();return u.Os.getEntries(T,f).next(N=>{C=N,C.forEach((K,j)=>{j.isValidDocument()||(V=V.add(K))})}).next(()=>u.localDocuments.getOverlayedDocuments(T,C)).next(N=>{_=N;const K=[];for(const j of l){const B=yE(j,_.get(j.key).overlayedDocument);B!=null&&K.push(new xt(j.key,B,c_(B.value.mapValue),Ge.exists(!0)))}return u.mutationQueue.addMutationBatch(T,c,K,l)}).next(N=>{m=N;const K=N.applyToLocalDocumentSet(_,V);return u.documentOverlayCache.saveOverlays(T,N.batchId,K)})}).then(()=>({batchId:m.batchId,changes:A_(_)}))}(n.localStore,e);n.sharedClientState.addPendingMutation(i.batchId),function(o,l,u){let c=o.Ru[o.currentUser.toKey()];c||(c=new _e(G)),c=c.insert(l,u),o.Ru[o.currentUser.toKey()]=c}(n,i.batchId,t),await nn(n,i.changes),await Ds(n.remoteStore)}catch(i){const r=mu(i,"Failed to persist write");t.reject(r)}}async function Dp(s,e){const t=L(s);try{const n=await fI(t.localStore,e);e.targetChanges.forEach((i,r)=>{const o=t.Eu.get(r);o&&(U(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1,22616),i.addedDocuments.size>0?o.lu=!0:i.modifiedDocuments.size>0?U(o.lu,14607):i.removedDocuments.size>0&&(U(o.lu,42227),o.lu=!1))}),await nn(t,n,e)}catch(n){await Zt(n)}}function Td(s,e,t){const n=L(s);if(n.isPrimaryClient&&t===0||!n.isPrimaryClient&&t===1){const i=[];n.Pu.forEach((r,o)=>{const l=o.view.va(e);l.snapshot&&i.push(l.snapshot)}),function(o,l){const u=L(o);u.onlineState=l;let c=!1;u.queries.forEach((f,_)=>{for(const m of _.wa)m.va(l)&&(c=!0)}),c&&gu(u)}(n.eventManager,e),i.length&&n.hu.J_(i),n.onlineState=e,n.isPrimaryClient&&n.sharedClientState.setOnlineState(e)}}async function ZI(s,e,t){const n=L(s);n.sharedClientState.updateQueryState(e,"rejected",t);const i=n.Eu.get(e),r=i&&i.key;if(r){let o=new _e(M.comparator);o=o.insert(r,me.newNoDocument(r,q.min()));const l=W().add(r),u=new Ji(q.min(),new Map,new _e(G),o,l);await Dp(n,u),n.du=n.du.remove(r),n.Eu.delete(e),vu(n)}else await ws(n.localStore,e,!1).then(()=>Ss(n,e,t)).catch(Zt)}async function ev(s,e){const t=L(s),n=e.batch.batchId;try{const i=await dI(t.localStore,e);Iu(t,n,null),Eu(t,n),t.sharedClientState.updateMutationState(n,"acknowledged"),await nn(t,i)}catch(i){await Zt(i)}}async function tv(s,e,t){const n=L(s);try{const i=await function(o,l){const u=L(o);return u.persistence.runTransaction("Reject batch","readwrite-primary",c=>{let f;return u.mutationQueue.lookupMutationBatch(c,l).next(_=>(U(_!==null,37113),f=_.keys(),u.mutationQueue.removeMutationBatch(c,_))).next(()=>u.mutationQueue.performConsistencyCheck(c)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(c,f,l)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(c,f)).next(()=>u.localDocuments.getDocuments(c,f))})}(n.localStore,e);Iu(n,e,t),Eu(n,e),n.sharedClientState.updateMutationState(e,"rejected",t),await nn(n,i)}catch(i){await Zt(i)}}function Eu(s,e){(s.Vu.get(e)||[]).forEach(t=>{t.resolve()}),s.Vu.delete(e)}function Iu(s,e,t){const n=L(s);let i=n.Ru[n.currentUser.toKey()];if(i){const r=i.get(e);r&&(t?r.reject(t):r.resolve(),i=i.remove(e)),n.Ru[n.currentUser.toKey()]=i}}function Ss(s,e,t=null){s.sharedClientState.removeLocalQueryTarget(e);for(const n of s.Tu.get(e))s.Pu.delete(n),t&&s.hu.pu(n,t);s.Tu.delete(e),s.isPrimaryClient&&s.Au.zr(e).forEach(n=>{s.Au.containsKey(n)||kp(s,n)})}function kp(s,e){s.Iu.delete(e.path.canonicalString());const t=s.du.get(e);t!==null&&(As(s.remoteStore,t),s.du=s.du.remove(e),s.Eu.delete(t),vu(s))}function vl(s,e,t){for(const n of t)n instanceof Vp?(s.Au.addReference(n.key,e),nv(s,n)):n instanceof xp?(x(Os,"Document no longer in limbo: "+n.key),s.Au.removeReference(n.key,e),s.Au.containsKey(n.key)||kp(s,n.key)):F(19791,{yu:n})}function nv(s,e){const t=e.key,n=t.path.canonicalString();s.du.get(t)||s.Iu.has(n)||(x(Os,"New document in limbo: "+t),s.Iu.add(n),vu(s))}function vu(s){for(;s.Iu.size>0&&s.du.size<s.maxConcurrentLimboResolutions;){const e=s.Iu.values().next().value;s.Iu.delete(e);const t=new M(te.fromString(e)),n=s.mu.next();s.Eu.set(n,new WI(t)),s.du=s.du.insert(t,n),Yo(s.remoteStore,new Tt(Ze(Hl(t.path)),n,"TargetPurposeLimboResolution",Ke.ue))}}async function nn(s,e,t){const n=L(s),i=[],r=[],o=[];n.Pu.isEmpty()||(n.Pu.forEach((l,u)=>{o.push(n.gu(u,e,t).then(c=>{var f;if((c||t)&&n.isPrimaryClient){const _=c?!c.fromCache:(f=t==null?void 0:t.targetChanges.get(u.targetId))===null||f===void 0?void 0:f.current;n.sharedClientState.updateQueryState(u.targetId,_?"current":"not-current")}if(c){i.push(c);const _=uu.Es(u.targetId,c);r.push(_)}}))}),await Promise.all(o),n.hu.J_(i),await async function(u,c){const f=L(u);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",_=>A.forEach(c,m=>A.forEach(m.Is,T=>f.persistence.referenceDelegate.addReference(_,m.targetId,T)).next(()=>A.forEach(m.ds,T=>f.persistence.referenceDelegate.removeReference(_,m.targetId,T)))))}catch(_){if(!en(_))throw _;x(cu,"Failed to update sequence numbers: "+_)}for(const _ of c){const m=_.targetId;if(!_.fromCache){const T=f.Fs.get(m),C=T.snapshotVersion,V=T.withLastLimboFreeSnapshotVersion(C);f.Fs=f.Fs.insert(m,V)}}}(n.localStore,r))}async function sv(s,e){const t=L(s);if(!t.currentUser.isEqual(e)){x(Os,"User change. New user:",e.toKey());const n=await fp(t.localStore,e);t.currentUser=e,function(r,o){r.Vu.forEach(l=>{l.forEach(u=>{u.reject(new D(b.CANCELLED,o))})}),r.Vu.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,n.removedBatchIds,n.addedBatchIds),await nn(t,n.Bs)}}function iv(s,e){const t=L(s),n=t.Eu.get(e);if(n&&n.lu)return W().add(n.key);{let i=W();const r=t.Tu.get(e);if(!r)return i;for(const o of r){const l=t.Pu.get(o);i=i.unionWith(l.view.tu)}return i}}async function rv(s,e){const t=L(s),n=await ml(t.localStore,e.query,!0),i=e.view.uu(n);return t.isPrimaryClient&&vl(t,e.targetId,i._u),i}async function ov(s,e){const t=L(s);return mp(t.localStore,e).then(n=>nn(t,n))}async function av(s,e,t,n){const i=L(s),r=await function(l,u){const c=L(l),f=L(c.mutationQueue);return c.persistence.runTransaction("Lookup mutation documents","readonly",_=>f.Xn(_,u).next(m=>m?c.localDocuments.getDocuments(_,m):A.resolve(null)))}(i.localStore,e);r!==null?(t==="pending"?await Ds(i.remoteStore):t==="acknowledged"||t==="rejected"?(Iu(i,e,n||null),Eu(i,e),function(l,u){L(L(l).mutationQueue).rr(u)}(i.localStore,e)):F(6720,"Unknown batchState",{wu:t}),await nn(i,r)):x(Os,"Cannot apply mutation batch with id: "+e)}async function lv(s,e){const t=L(s);if(Xo(t),Tu(t),e===!0&&t.fu!==!0){const n=t.sharedClientState.getAllActiveQueryTargets(),i=await wd(t,n.toArray());t.fu=!0,await El(t.remoteStore,!0);for(const r of i)Yo(t.remoteStore,r)}else if(e===!1&&t.fu!==!1){const n=[];let i=Promise.resolve();t.Tu.forEach((r,o)=>{t.sharedClientState.isLocalQueryTarget(o)?n.push(o):i=i.then(()=>(Ss(t,o),ws(t.localStore,o,!0))),As(t.remoteStore,o)}),await i,await wd(t,n),function(o){const l=L(o);l.Eu.forEach((u,c)=>{As(l.remoteStore,c)}),l.Au.jr(),l.Eu=new Map,l.du=new _e(M.comparator)}(t),t.fu=!1,await El(t.remoteStore,!1)}}async function wd(s,e,t){const n=L(s),i=[],r=[];for(const o of e){let l;const u=n.Tu.get(o);if(u&&u.length!==0){l=await _o(n.localStore,Ze(u[0]));for(const c of u){const f=n.Pu.get(c),_=await rv(n,f);_.snapshot&&r.push(_.snapshot)}}else{const c=await pp(n.localStore,o);l=await _o(n.localStore,c),await yu(n,Op(c),o,!1,l.resumeToken)}i.push(l)}return n.hu.J_(r),i}function Op(s){return y_(s.path,s.collectionGroup,s.orderBy,s.filters,s.limit,"F",s.startAt,s.endAt)}function uv(s){return function(t){return L(L(t).persistence).Ps()}(L(s).localStore)}async function cv(s,e,t,n){const i=L(s);if(i.fu)return void x(Os,"Ignoring unexpected query state notification.");const r=i.Tu.get(e);if(r&&r.length>0)switch(t){case"current":case"not-current":{const o=await mp(i.localStore,v_(r[0])),l=Ji.createSynthesizedRemoteEventForCurrentChange(e,t==="current",Ee.EMPTY_BYTE_STRING);await nn(i,o,l);break}case"rejected":await ws(i.localStore,e,!0),Ss(i,e,n);break;default:F(64155,t)}}async function hv(s,e,t){const n=Xo(s);if(n.fu){for(const i of e){if(n.Tu.has(i)&&n.sharedClientState.isActiveQueryTarget(i)){x(Os,"Adding an already active target "+i);continue}const r=await pp(n.localStore,i),o=await _o(n.localStore,r);await yu(n,Op(r),o.targetId,!1,o.resumeToken),Yo(n.remoteStore,o)}for(const i of t)n.Tu.has(i)&&await ws(n.localStore,i,!1).then(()=>{As(n.remoteStore,i),Ss(n,i)}).catch(Zt)}}function Xo(s){const e=L(s);return e.remoteStore.remoteSyncer.applyRemoteEvent=Dp.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=iv.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=ZI.bind(null,e),e.hu.J_=qI.bind(null,e.eventManager),e.hu.pu=jI.bind(null,e.eventManager),e}function Tu(s){const e=L(s);return e.remoteStore.remoteSyncer.applySuccessfulWrite=ev.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=tv.bind(null,e),e}class Ui{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Qo(e.databaseInfo.databaseId),this.sharedClientState=this.bu(e),this.persistence=this.Du(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Cu(e,this.localStore),this.indexBackfillerScheduler=this.Fu(e,this.localStore)}Cu(e,t){return null}Fu(e,t){return null}vu(e){return dp(this.persistence,new hp,e.initialUser,this.serializer)}Du(e){return new au($o.Vi,this.serializer)}bu(e){return new vp}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Ui.provider={build:()=>new Ui};class dv extends Ui{constructor(e){super(),this.cacheSizeBytes=e}Cu(e,t){U(this.persistence.referenceDelegate instanceof fo,46915);const n=this.persistence.referenceDelegate.garbageCollector;return new rp(n,e.asyncQueue,t)}Du(e){const t=this.cacheSizeBytes!==void 0?Me.withCacheSize(this.cacheSizeBytes):Me.DEFAULT;return new au(n=>fo.Vi(n,t),this.serializer)}}class Mp extends Ui{constructor(e,t,n){super(),this.Mu=e,this.cacheSizeBytes=t,this.forceOwnership=n,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.Mu.initialize(this,e),await Tu(this.Mu.syncEngine),await Ds(this.Mu.remoteStore),await this.persistence.ji(()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve()))}vu(e){return dp(this.persistence,new hp,e.initialUser,this.serializer)}Cu(e,t){const n=this.persistence.referenceDelegate.garbageCollector;return new rp(n,e.asyncQueue,t)}Fu(e,t){const n=new vy(t,this.persistence);return new Iy(e.asyncQueue,n)}Du(e){const t=cp(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),n=this.cacheSizeBytes!==void 0?Me.withCacheSize(this.cacheSizeBytes):Me.DEFAULT;return new lu(this.synchronizeTabs,t,e.clientId,n,e.asyncQueue,Tp(),Qr(),this.serializer,this.sharedClientState,!!this.forceOwnership)}bu(e){return new vp}}class fv extends Mp{constructor(e,t){super(e,t,!1),this.Mu=e,this.cacheSizeBytes=t,this.synchronizeTabs=!0}async initialize(e){await super.initialize(e);const t=this.Mu.syncEngine;this.sharedClientState instanceof La&&(this.sharedClientState.syncEngine={Do:av.bind(null,t),vo:cv.bind(null,t),Co:hv.bind(null,t),Ps:uv.bind(null,t),bo:ov.bind(null,t)},await this.sharedClientState.start()),await this.persistence.ji(async n=>{await lv(this.Mu.syncEngine,n),this.gcScheduler&&(n&&!this.gcScheduler.started?this.gcScheduler.start():n||this.gcScheduler.stop()),this.indexBackfillerScheduler&&(n&&!this.indexBackfillerScheduler.started?this.indexBackfillerScheduler.start():n||this.indexBackfillerScheduler.stop())})}bu(e){const t=Tp();if(!La.C(t))throw new D(b.UNIMPLEMENTED,"IndexedDB persistence is only available on platforms that support LocalStorage.");const n=cp(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey);return new La(t,e.asyncQueue,n,e.clientId,e.initialUser)}}class Bi{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=n=>Td(this.syncEngine,n,1),this.remoteStore.remoteSyncer.handleCredentialChange=sv.bind(null,this.syncEngine),await El(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new LI}()}createDatastore(e){const t=Qo(e.databaseInfo.databaseId),n=function(r){return new II(r)}(e.databaseInfo);return function(r,o,l,u){return new AI(r,o,l,u)}(e.authCredentials,e.appCheckCredentials,n,t)}createRemoteStore(e){return function(n,i,r,o,l){return new SI(n,i,r,o,l)}(this.localStore,this.datastore,e.asyncQueue,t=>Td(this.syncEngine,t,0),function(){return md.C()?new md:new mI}())}createSyncEngine(e,t){return function(i,r,o,l,u,c,f){const _=new $I(i,r,o,l,u,c);return f&&(_.fu=!0),_}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(i){const r=L(i);x(bn,"RemoteStore shutting down."),r.Ia.add(5),await er(r),r.Ea.shutdown(),r.Aa.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}Bi.provider={build:()=>new Bi};/**
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
 */class _v{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.xu(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.xu(this.observer.error,e):ye("Uncaught Error in snapshot listener:",e.toString()))}Ou(){this.muted=!0}xu(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
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
 */const Yt="FirestoreClient";class pv{constructor(e,t,n,i,r){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=n,this.databaseInfo=i,this.user=Oe.UNAUTHENTICATED,this.clientId=Ll.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=r,this.authCredentials.start(n,async o=>{x(Yt,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(n,o=>(x(Yt,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new At;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const n=mu(t,"Failed to shutdown persistence");e.reject(n)}}),e.promise}}async function Ba(s,e){s.asyncQueue.verifyOperationInProgress(),x(Yt,"Initializing OfflineComponentProvider");const t=s.configuration;await e.initialize(t);let n=t.initialUser;s.setCredentialChangeListener(async i=>{n.isEqual(i)||(await fp(e.localStore,i),n=i)}),e.persistence.setDatabaseDeletedListener(()=>{Wt("Terminating Firestore due to IndexedDb database deletion"),s.terminate().then(()=>{x("Terminating Firestore due to IndexedDb database deletion completed successfully")}).catch(i=>{Wt("Terminating Firestore due to IndexedDb database deletion failed",i)})}),s._offlineComponents=e}async function Ad(s,e){s.asyncQueue.verifyOperationInProgress();const t=await mv(s);x(Yt,"Initializing OnlineComponentProvider"),await e.initialize(t,s.configuration),s.setCredentialChangeListener(n=>yd(e.remoteStore,n)),s.setAppCheckTokenChangeListener((n,i)=>yd(e.remoteStore,i)),s._onlineComponents=e}async function mv(s){if(!s._offlineComponents)if(s._uninitializedComponentsProvider){x(Yt,"Using user provided OfflineComponentProvider");try{await Ba(s,s._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(i){return i.name==="FirebaseError"?i.code===b.FAILED_PRECONDITION||i.code===b.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11}(t))throw t;Wt("Error using user provided cache. Falling back to memory cache: "+t),await Ba(s,new Ui)}}else x(Yt,"Using default OfflineComponentProvider"),await Ba(s,new dv(void 0));return s._offlineComponents}async function Fp(s){return s._onlineComponents||(s._uninitializedComponentsProvider?(x(Yt,"Using user provided OnlineComponentProvider"),await Ad(s,s._uninitializedComponentsProvider._online)):(x(Yt,"Using default OnlineComponentProvider"),await Ad(s,new Bi))),s._onlineComponents}function gv(s){return Fp(s).then(e=>e.syncEngine)}async function yv(s){const e=await Fp(s),t=e.eventManager;return t.onListen=QI.bind(null,e.syncEngine),t.onUnlisten=YI.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=HI.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=XI.bind(null,e.syncEngine),t}function Ev(s,e,t={}){const n=new At;return s.asyncQueue.enqueueAndForget(async()=>function(r,o,l,u,c){const f=new _v({next:m=>{f.Ou(),o.enqueueAndForget(()=>BI(r,_)),m.fromCache&&u.source==="server"?c.reject(new D(b.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):c.resolve(m)},error:m=>c.reject(m)}),_=new GI(l,f,{includeMetadataChanges:!0,ka:!0});return UI(r,_)}(await yv(s),s.asyncQueue,e,t,n)),n.promise}/**
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
 */function Lp(s){const e={};return s.timeoutSeconds!==void 0&&(e.timeoutSeconds=s.timeoutSeconds),e}/**
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
 */const Rd=new Map;/**
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
 */const Iv="firestore.googleapis.com",Sd=!0;class Cd{constructor(e){var t,n;if(e.host===void 0){if(e.ssl!==void 0)throw new D(b.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=Iv,this.ssl=Sd}else this.host=e.host,this.ssl=(t=e.ssl)!==null&&t!==void 0?t:Sd;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=ep;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<ip)throw new D(b.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}gy("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Lp((n=e.experimentalLongPollingOptions)!==null&&n!==void 0?n:{}),function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new D(b.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new D(b.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new D(b.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(n,i){return n.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class wu{constructor(e,t,n,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=n,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Cd({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new D(b.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new D(b.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Cd(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(n){if(!n)return new uy;switch(n.type){case"firstParty":return new dy(n.sessionIndex||"0",n.iamToken||null,n.authTokenFactory||null);case"provider":return n.client;default:throw new D(b.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const n=Rd.get(t);n&&(x("ComponentProvider","Removing Datastore"),Rd.delete(t),n.terminate())}(this),Promise.resolve()}}/**
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
 */class On{constructor(e,t,n){this.converter=t,this._query=n,this.type="query",this.firestore=e}withConverter(e){return new On(this.firestore,e,this._query)}}class Te{constructor(e,t,n){this.converter=t,this._key=n,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new zt(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Te(this.firestore,e,this._key)}toJSON(){return{type:Te._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,n){if(Qi(t,Te._jsonSchema))return new Te(e,n||null,new M(te.fromString(t.referencePath)))}}Te._jsonSchemaVersion="firestore/documentReference/1.0",Te._jsonSchema={type:ve("string",Te._jsonSchemaVersion),referencePath:ve("string")};class zt extends On{constructor(e,t,n){super(e,t,Hl(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Te(this.firestore,null,new M(e))}withConverter(e){return new zt(this.firestore,e,this._path)}}function XA(s,e,...t){if(s=tt(s),Ff("collection","path",e),s instanceof wu){const n=te.fromString(e,...t);return gh(n),new zt(s,null,n)}{if(!(s instanceof Te||s instanceof zt))throw new D(b.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=s._path.child(te.fromString(e,...t));return gh(n),new zt(s.firestore,null,n)}}function vv(s,e,...t){if(s=tt(s),arguments.length===1&&(e=Ll.newId()),Ff("doc","path",e),s instanceof wu){const n=te.fromString(e,...t);return mh(n),new Te(s,null,new M(n))}{if(!(s instanceof Te||s instanceof zt))throw new D(b.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=s._path.child(te.fromString(e,...t));return mh(n),new Te(s.firestore,s instanceof zt?s.converter:null,new M(n))}}/**
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
 */const Pd="AsyncQueue";class bd{constructor(e=Promise.resolve()){this.Zu=[],this.Xu=!1,this.ec=[],this.tc=null,this.nc=!1,this.rc=!1,this.sc=[],this.F_=new wp(this,"async_queue_retry"),this.oc=()=>{const n=Qr();n&&x(Pd,"Visibility state changed to "+n.visibilityState),this.F_.y_()},this._c=e;const t=Qr();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.oc)}get isShuttingDown(){return this.Xu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.ac(),this.uc(e)}enterRestrictedMode(e){if(!this.Xu){this.Xu=!0,this.rc=e||!1;const t=Qr();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.oc)}}enqueue(e){if(this.ac(),this.Xu)return new Promise(()=>{});const t=new At;return this.uc(()=>this.Xu&&this.rc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Zu.push(e),this.cc()))}async cc(){if(this.Zu.length!==0){try{await this.Zu[0](),this.Zu.shift(),this.F_.reset()}catch(e){if(!en(e))throw e;x(Pd,"Operation failed with retryable error: "+e)}this.Zu.length>0&&this.F_.g_(()=>this.cc())}}uc(e){const t=this._c.then(()=>(this.nc=!0,e().catch(n=>{throw this.tc=n,this.nc=!1,ye("INTERNAL UNHANDLED ERROR: ",Vd(n)),n}).then(n=>(this.nc=!1,n))));return this._c=t,t}enqueueAfterDelay(e,t,n){this.ac(),this.sc.indexOf(e)>-1&&(t=0);const i=pu.createAndSchedule(this,e,t,n,r=>this.lc(r));return this.ec.push(i),i}ac(){this.tc&&F(47125,{hc:Vd(this.tc)})}verifyOperationInProgress(){}async Pc(){let e;do e=this._c,await e;while(e!==this._c)}Tc(e){for(const t of this.ec)if(t.timerId===e)return!0;return!1}Ic(e){return this.Pc().then(()=>{this.ec.sort((t,n)=>t.targetTimeMs-n.targetTimeMs);for(const t of this.ec)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Pc()})}dc(e){this.sc.push(e)}lc(e){const t=this.ec.indexOf(e);this.ec.splice(t,1)}}function Vd(s){let e=s.message||"";return s.stack&&(e=s.stack.includes(s.message)?s.stack:s.message+`
`+s.stack),e}class tr extends wu{constructor(e,t,n,i){super(e,t,n,i),this.type="firestore",this._queue=new bd,this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new bd(e),this._firestoreClient=void 0,await e}}}function JA(s,e,t){t||(t=io);const n=Ef(s,"firestore");if(n.isInitialized(t)){const i=n.getImmediate({identifier:t}),r=n.getOptions(t);if(If(r,e))return i;throw new D(b.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(e.cacheSizeBytes!==void 0&&e.localCache!==void 0)throw new D(b.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(e.cacheSizeBytes!==void 0&&e.cacheSizeBytes!==-1&&e.cacheSizeBytes<ip)throw new D(b.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return e.host&&No(e.host)&&vf(e.host),n.initialize({options:e,instanceIdentifier:t})}function Up(s){if(s._terminated)throw new D(b.FAILED_PRECONDITION,"The client has already been terminated.");return s._firestoreClient||Tv(s),s._firestoreClient}function Tv(s){var e,t,n;const i=s._freezeSettings(),r=function(l,u,c,f){return new Hy(l,u,c,f.host,f.ssl,f.experimentalForceLongPolling,f.experimentalAutoDetectLongPolling,Lp(f.experimentalLongPollingOptions),f.useFetchStreams,f.isUsingEmulator)}(s._databaseId,((e=s._app)===null||e===void 0?void 0:e.options.appId)||"",s._persistenceKey,i);s._componentsProvider||!((t=i.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((n=i.localCache)===null||n===void 0)&&n._onlineComponentProvider)&&(s._componentsProvider={_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider}),s._firestoreClient=new pv(s._authCredentials,s._appCheckCredentials,s._queue,r,s._componentsProvider&&function(l){const u=l==null?void 0:l._online.build();return{_offline:l==null?void 0:l._offline.build(u),_online:u}}(s._componentsProvider))}/**
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
 */class st{constructor(e){this._byteString=e}static fromBase64String(e){try{return new st(Ee.fromBase64String(e))}catch(t){throw new D(b.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new st(Ee.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:st._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(Qi(e,st._jsonSchema))return st.fromBase64String(e.bytes)}}st._jsonSchemaVersion="firestore/bytes/1.0",st._jsonSchema={type:ve("string",st._jsonSchemaVersion),bytes:ve("string")};/**
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
 */class Jo{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new D(b.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new fe(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
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
 */class Zo{constructor(e){this._methodName=e}}/**
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
 */class pt{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new D(b.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new D(b.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return G(this._lat,e._lat)||G(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:pt._jsonSchemaVersion}}static fromJSON(e){if(Qi(e,pt._jsonSchema))return new pt(e.latitude,e.longitude)}}pt._jsonSchemaVersion="firestore/geoPoint/1.0",pt._jsonSchema={type:ve("string",pt._jsonSchemaVersion),latitude:ve("number"),longitude:ve("number")};/**
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
 */class mt{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(n,i){if(n.length!==i.length)return!1;for(let r=0;r<n.length;++r)if(n[r]!==i[r])return!1;return!0}(this._values,e._values)}toJSON(){return{type:mt._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Qi(e,mt._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(t=>typeof t=="number"))return new mt(e.vectorValues);throw new D(b.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}mt._jsonSchemaVersion="firestore/vectorValue/1.0",mt._jsonSchema={type:ve("string",mt._jsonSchemaVersion),vectorValues:ve("object")};/**
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
 */const wv=/^__.*__$/;class Av{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return this.fieldMask!==null?new xt(e,this.data,this.fieldMask,t,this.fieldTransforms):new Ns(e,this.data,t,this.fieldTransforms)}}class Bp{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return new xt(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function qp(s){switch(s){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw F(40011,{Ec:s})}}class Au{constructor(e,t,n,i,r,o){this.settings=e,this.databaseId=t,this.serializer=n,this.ignoreUndefinedProperties=i,r===void 0&&this.Ac(),this.fieldTransforms=r||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Ec(){return this.settings.Ec}Rc(e){return new Au(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Vc(e){var t;const n=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.Rc({path:n,mc:!1});return i.fc(e),i}gc(e){var t;const n=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.Rc({path:n,mc:!1});return i.Ac(),i}yc(e){return this.Rc({path:void 0,mc:!0})}wc(e){return yo(e,this.settings.methodName,this.settings.Sc||!1,this.path,this.settings.bc)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}Ac(){if(this.path)for(let e=0;e<this.path.length;e++)this.fc(this.path.get(e))}fc(e){if(e.length===0)throw this.wc("Document fields must not be empty");if(qp(this.Ec)&&wv.test(e))throw this.wc('Document fields cannot begin and end with "__"')}}class Rv{constructor(e,t,n){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=n||Qo(e)}Dc(e,t,n,i=!1){return new Au({Ec:e,methodName:t,bc:n,path:fe.emptyPath(),mc:!1,Sc:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function ea(s){const e=s._freezeSettings(),t=Qo(s._databaseId);return new Rv(s._databaseId,!!e.ignoreUndefinedProperties,t)}function jp(s,e,t,n,i,r={}){const o=s.Dc(r.merge||r.mergeFields?2:0,e,t,i);Su("Data must be an object, but it was:",o,n);const l=Gp(n,o);let u,c;if(r.merge)u=new We(o.fieldMask),c=o.fieldTransforms;else if(r.mergeFields){const f=[];for(const _ of r.mergeFields){const m=Tl(e,_,t);if(!o.contains(m))throw new D(b.INVALID_ARGUMENT,`Field '${m}' is specified in your field mask but missing from your input data.`);Kp(f,m)||f.push(m)}u=new We(f),c=o.fieldTransforms.filter(_=>u.covers(_.field))}else u=null,c=o.fieldTransforms;return new Av(new Ue(l),u,c)}class ta extends Zo{_toFieldTransform(e){if(e.Ec!==2)throw e.Ec===1?e.wc(`${this._methodName}() can only appear at the top level of your update data`):e.wc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof ta}}class Ru extends Zo{_toFieldTransform(e){return new x_(e.path,new Es)}isEqual(e){return e instanceof Ru}}function Sv(s,e,t,n){const i=s.Dc(1,e,t);Su("Data must be an object, but it was:",i,n);const r=[],o=Ue.empty();tn(n,(u,c)=>{const f=Cu(e,u,t);c=tt(c);const _=i.gc(f);if(c instanceof ta)r.push(f);else{const m=nr(c,_);m!=null&&(r.push(f),o.set(f,m))}});const l=new We(r);return new Bp(o,l,i.fieldTransforms)}function Cv(s,e,t,n,i,r){const o=s.Dc(1,e,t),l=[Tl(e,n,t)],u=[i];if(r.length%2!=0)throw new D(b.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let m=0;m<r.length;m+=2)l.push(Tl(e,r[m])),u.push(r[m+1]);const c=[],f=Ue.empty();for(let m=l.length-1;m>=0;--m)if(!Kp(c,l[m])){const T=l[m];let C=u[m];C=tt(C);const V=o.gc(T);if(C instanceof ta)c.push(T);else{const N=nr(C,V);N!=null&&(c.push(T),f.set(T,N))}}const _=new We(c);return new Bp(f,_,o.fieldTransforms)}function Pv(s,e,t,n=!1){return nr(t,s.Dc(n?4:3,e))}function nr(s,e){if(zp(s=tt(s)))return Su("Unsupported field value:",e,s),Gp(s,e);if(s instanceof Zo)return function(n,i){if(!qp(i.Ec))throw i.wc(`${n._methodName}() can only be used with update() and set()`);if(!i.path)throw i.wc(`${n._methodName}() is not currently supported inside arrays`);const r=n._toFieldTransform(i);r&&i.fieldTransforms.push(r)}(s,e),null;if(s===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),s instanceof Array){if(e.settings.mc&&e.Ec!==4)throw e.wc("Nested arrays are not supported");return function(n,i){const r=[];let o=0;for(const l of n){let u=nr(l,i.yc(o));u==null&&(u={nullValue:"NULL_VALUE"}),r.push(u),o++}return{arrayValue:{values:r}}}(s,e)}return function(n,i){if((n=tt(n))===null)return{nullValue:"NULL_VALUE"};if(typeof n=="number")return dE(i.serializer,n);if(typeof n=="boolean")return{booleanValue:n};if(typeof n=="string")return{stringValue:n};if(n instanceof Date){const r=se.fromDate(n);return{timestampValue:Ts(i.serializer,r)}}if(n instanceof se){const r=new se(n.seconds,1e3*Math.floor(n.nanoseconds/1e3));return{timestampValue:Ts(i.serializer,r)}}if(n instanceof pt)return{geoPointValue:{latitude:n.latitude,longitude:n.longitude}};if(n instanceof st)return{bytesValue:L_(i.serializer,n._byteString)};if(n instanceof Te){const r=i.databaseId,o=n.firestore._databaseId;if(!o.isEqual(r))throw i.wc(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${r.projectId}/${r.database}`);return{referenceValue:su(n.firestore._databaseId||i.databaseId,n._key.path)}}if(n instanceof mt)return function(o,l){return{mapValue:{fields:{[Wl]:{stringValue:$l},[ps]:{arrayValue:{values:o.toArray().map(c=>{if(typeof c!="number")throw l.wc("VectorValues must only contain numeric values.");return Xl(l.serializer,c)})}}}}}}(n,i);throw i.wc(`Unsupported field value: ${ko(n)}`)}(s,e)}function Gp(s,e){const t={};return t_(s)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):tn(s,(n,i)=>{const r=nr(i,e.Vc(n));r!=null&&(t[n]=r)}),{mapValue:{fields:t}}}function zp(s){return!(typeof s!="object"||s===null||s instanceof Array||s instanceof Date||s instanceof se||s instanceof pt||s instanceof st||s instanceof Te||s instanceof Zo||s instanceof mt)}function Su(s,e,t){if(!zp(t)||!Lf(t)){const n=ko(t);throw n==="an object"?e.wc(s+" a custom object"):e.wc(s+" "+n)}}function Tl(s,e,t){if((e=tt(e))instanceof Jo)return e._internalPath;if(typeof e=="string")return Cu(s,e);throw yo("Field path arguments must be of type string or ",s,!1,void 0,t)}const bv=new RegExp("[~\\*/\\[\\]]");function Cu(s,e,t){if(e.search(bv)>=0)throw yo(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,s,!1,void 0,t);try{return new Jo(...e.split("."))._internalPath}catch{throw yo(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,s,!1,void 0,t)}}function yo(s,e,t,n,i){const r=n&&!n.isEmpty(),o=i!==void 0;let l=`Function ${e}() called with invalid data`;t&&(l+=" (via `toFirestore()`)"),l+=". ";let u="";return(r||o)&&(u+=" (found",r&&(u+=` in field ${n}`),o&&(u+=` in document ${i}`),u+=")"),new D(b.INVALID_ARGUMENT,l+s+u)}function Kp(s,e){return s.some(t=>t.isEqual(e))}/**
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
 */class Wp{constructor(e,t,n,i,r){this._firestore=e,this._userDataWriter=t,this._key=n,this._document=i,this._converter=r}get id(){return this._key.path.lastSegment()}get ref(){return new Te(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new Vv(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(Pu("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class Vv extends Wp{data(){return super.data()}}function Pu(s,e){return typeof e=="string"?Cu(s,e):e instanceof Jo?e._internalPath:e._delegate._internalPath}/**
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
 */function xv(s){if(s.limitType==="L"&&s.explicitOrderBy.length===0)throw new D(b.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class bu{}class $p extends bu{}function ZA(s,e,...t){let n=[];e instanceof bu&&n.push(e),n=n.concat(t),function(r){const o=r.filter(u=>u instanceof xu).length,l=r.filter(u=>u instanceof Vu).length;if(o>1||o>0&&l>0)throw new D(b.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(n);for(const i of n)s=i._apply(s);return s}class Vu extends $p{constructor(e,t,n){super(),this._field=e,this._op=t,this._value=n,this.type="where"}static _create(e,t,n){return new Vu(e,t,n)}_apply(e){const t=this._parse(e);return Qp(e._query,t),new On(e.firestore,e.converter,al(e._query,t))}_parse(e){const t=ea(e.firestore);return function(r,o,l,u,c,f,_){let m;if(c.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new D(b.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){Nd(_,f);const C=[];for(const V of _)C.push(xd(u,r,V));m={arrayValue:{values:C}}}else m=xd(u,r,_)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||Nd(_,f),m=Pv(l,o,_,f==="in"||f==="not-in");return Y.create(c,f,m)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}class xu extends bu{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new xu(e,t)}_parse(e){const t=this._queryConstraints.map(n=>n._parse(e)).filter(n=>n.getFilters().length>0);return t.length===1?t[0]:ie.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(i,r){let o=i;const l=r.getFlattenedFilters();for(const u of l)Qp(o,u),o=al(o,u)}(e._query,t),new On(e.firestore,e.converter,al(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}class Nu extends $p{constructor(e,t){super(),this._field=e,this._direction=t,this.type="orderBy"}static _create(e,t){return new Nu(e,t)}_apply(e){const t=function(i,r,o){if(i.startAt!==null)throw new D(b.INVALID_ARGUMENT,"Invalid query. You must not call startAt() or startAfter() before calling orderBy().");if(i.endAt!==null)throw new D(b.INVALID_ARGUMENT,"Invalid query. You must not call endAt() or endBefore() before calling orderBy().");return new Fi(r,o)}(e._query,this._field,this._direction);return new On(e.firestore,e.converter,function(i,r){const o=i.explicitOrderBy.concat([r]);return new xs(i.path,i.collectionGroup,o,i.filters.slice(),i.limit,i.limitType,i.startAt,i.endAt)}(e._query,t))}}function eR(s,e="asc"){const t=e,n=Pu("orderBy",s);return Nu._create(n,t)}function xd(s,e,t){if(typeof(t=tt(t))=="string"){if(t==="")throw new D(b.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!E_(e)&&t.indexOf("/")!==-1)throw new D(b.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const n=e.path.child(te.fromString(t));if(!M.isDocumentKey(n))throw new D(b.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${n}' is not because it has an odd number of segments (${n.length}).`);return Oi(s,new M(n))}if(t instanceof Te)return Oi(s,t._key);throw new D(b.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${ko(t)}.`)}function Nd(s,e){if(!Array.isArray(s)||s.length===0)throw new D(b.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Qp(s,e){const t=function(i,r){for(const o of i)for(const l of o.getFlattenedFilters())if(r.indexOf(l.op)>=0)return l.op;return null}(s.filters,function(i){switch(i){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new D(b.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new D(b.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}class Nv{convertValue(e,t="none"){switch($t(e)){case 0:return null;case 1:return e.booleanValue;case 2:return de(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Ct(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw F(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const n={};return tn(e,(i,r)=>{n[i]=this.convertValue(r,t)}),n}convertVectorValue(e){var t,n,i;const r=(i=(n=(t=e.fields)===null||t===void 0?void 0:t[ps].arrayValue)===null||n===void 0?void 0:n.values)===null||i===void 0?void 0:i.map(o=>de(o.doubleValue));return new mt(r)}convertGeoPoint(e){return new pt(de(e.latitude),de(e.longitude))}convertArray(e,t){return(e.values||[]).map(n=>this.convertValue(n,t))}convertServerTimestamp(e,t){switch(t){case"previous":const n=Bo(e);return n==null?null:this.convertValue(n,t);case"estimate":return this.convertTimestamp(Di(e));default:return null}}convertTimestamp(e){const t=St(e);return new se(t.seconds,t.nanos)}convertDocumentKey(e,t){const n=te.fromString(e);U(Q_(n),9688,{name:e});const i=new An(n.get(1),n.get(3)),r=new M(n.popFirst(5));return i.isEqual(t)||ye(`Document ${r} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),r}}/**
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
 */function Hp(s,e,t){let n;return n=s?t&&(t.merge||t.mergeFields)?s.toFirestore(e,t):s.toFirestore(e):e,n}class Or{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class ss extends Wp{constructor(e,t,n,i,r,o){super(e,t,n,i,o),this._firestore=e,this._firestoreImpl=e,this.metadata=r}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Hr(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const n=this._document.data.field(Pu("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new D(b.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=ss._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}ss._jsonSchemaVersion="firestore/documentSnapshot/1.0",ss._jsonSchema={type:ve("string",ss._jsonSchemaVersion),bundleSource:ve("string","DocumentSnapshot"),bundleName:ve("string"),bundle:ve("string")};class Hr extends ss{data(e={}){return super.data(e)}}class is{constructor(e,t,n,i){this._firestore=e,this._userDataWriter=t,this._snapshot=i,this.metadata=new Or(i.hasPendingWrites,i.fromCache),this.query=n}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(n=>{e.call(t,new Hr(this._firestore,this._userDataWriter,n.key,n,new Or(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new D(b.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(i,r){if(i._snapshot.oldDocs.isEmpty()){let o=0;return i._snapshot.docChanges.map(l=>{const u=new Hr(i._firestore,i._userDataWriter,l.doc.key,l.doc,new Or(i._snapshot.mutatedKeys.has(l.doc.key),i._snapshot.fromCache),i.query.converter);return l.doc,{type:"added",doc:u,oldIndex:-1,newIndex:o++}})}{let o=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(l=>r||l.type!==3).map(l=>{const u=new Hr(i._firestore,i._userDataWriter,l.doc.key,l.doc,new Or(i._snapshot.mutatedKeys.has(l.doc.key),i._snapshot.fromCache),i.query.converter);let c=-1,f=-1;return l.type!==0&&(c=o.indexOf(l.doc.key),o=o.delete(l.doc.key)),l.type!==1&&(o=o.add(l.doc),f=o.indexOf(l.doc.key)),{type:Dv(l.type),doc:u,oldIndex:c,newIndex:f}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new D(b.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=is._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=Ll.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],n=[],i=[];return this.docs.forEach(r=>{r._document!==null&&(t.push(r._document),n.push(this._userDataWriter.convertObjectMap(r._document.data.value.mapValue.fields,"previous")),i.push(r.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function Dv(s){switch(s){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return F(61501,{type:s})}}is._jsonSchemaVersion="firestore/querySnapshot/1.0",is._jsonSchema={type:ve("string",is._jsonSchemaVersion),bundleSource:ve("string","QuerySnapshot"),bundleName:ve("string"),bundle:ve("string")};class kv extends Nv{constructor(e){super(),this.firestore=e}convertBytes(e){return new st(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Te(this.firestore,null,t)}}function tR(s){s=wn(s,On);const e=wn(s.firestore,tr),t=Up(e),n=new kv(e);return xv(s._query),Ev(t,s._query).then(i=>new is(e,n,s,i))}function nR(s,e,t){s=wn(s,Te);const n=wn(s.firestore,tr),i=Hp(s.converter,e,t);return Du(n,[jp(ea(n),"setDoc",s._key,i,s.converter!==null,t).toMutation(s._key,Ge.none())])}function sR(s,e,t,...n){s=wn(s,Te);const i=wn(s.firestore,tr),r=ea(i);let o;return o=typeof(e=tt(e))=="string"||e instanceof Jo?Cv(r,"updateDoc",s._key,e,t,n):Sv(r,"updateDoc",s._key,e),Du(i,[o.toMutation(s._key,Ge.exists(!0))])}function iR(s,e){const t=wn(s.firestore,tr),n=vv(s),i=Hp(s.converter,e);return Du(t,[jp(ea(s.firestore),"addDoc",n._key,i,s.converter!==null,{}).toMutation(n._key,Ge.exists(!1))]).then(()=>n)}function Du(s,e){return function(n,i){const r=new At;return n.asyncQueue.enqueueAndForget(async()=>JI(await gv(n),i,r)),r.promise}(Up(s),e)}class Ov{constructor(e){let t;this.kind="persistent",e!=null&&e.tabManager?(e.tabManager._initialize(e),t=e.tabManager):(t=Lv(),t._initialize(e)),this._onlineComponentProvider=t._onlineComponentProvider,this._offlineComponentProvider=t._offlineComponentProvider}toJSON(){return{kind:this.kind}}}function rR(s){return new Ov(s)}class Mv{constructor(e){this.forceOwnership=e,this.kind="persistentSingleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=Bi.provider,this._offlineComponentProvider={build:t=>new Mp(t,e==null?void 0:e.cacheSizeBytes,this.forceOwnership)}}}class Fv{constructor(){this.kind="PersistentMultipleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=Bi.provider,this._offlineComponentProvider={build:t=>new fv(t,e==null?void 0:e.cacheSizeBytes)}}}function Lv(s){return new Mv(void 0)}function oR(){return new Fv}function aR(){return new Ru("serverTimestamp")}(function(e,t=!0){(function(i){Vs=i})(Af),mf(new gf("firestore",(n,{instanceIdentifier:i,options:r})=>{const o=n.getProvider("app").getImmediate(),l=new tr(new cy(n.getProvider("auth-internal")),new fy(o,n.getProvider("app-check-internal")),function(c,f){if(!Object.prototype.hasOwnProperty.apply(c.options,["projectId"]))throw new D(b.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new An(c.options.projectId,f)}(o,i),o);return r=Object.assign({useFetchStreams:t},r),l._setSettings(r),l},"PUBLIC").setMultipleInstances(!0)),Xr(hh,dh,e),Xr(hh,dh,"esm2017")})();var Dd={};const kd="@firebase/database",Od="1.0.20";/**
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
 */let Yp="";function Uv(s){Yp=s}/**
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
 */class Bv{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){t==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),Pe(t))}get(e){const t=this.domStorage_.getItem(this.prefixedName_(e));return t==null?null:Ml(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
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
 */class qv{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){t==null?delete this.cache_[e]:this.cache_[e]=t}get(e){return bt(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
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
 */const Xp=function(s){try{if(typeof window<"u"&&typeof window[s]<"u"){const e=window[s];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new Bv(e)}}catch{}return new qv},yn=Xp("localStorage"),jv=Xp("sessionStorage");/**
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
 */const rs=new pf("@firebase/database"),Gv=function(){let s=1;return function(){return s++}}(),Jp=function(s){const e=Qg(s),t=new Hg;t.update(e);const n=t.digest();return Yg.encodeByteArray(n)},sr=function(...s){let e="";for(let t=0;t<s.length;t++){const n=s[t];Array.isArray(n)||n&&typeof n=="object"&&typeof n.length=="number"?e+=sr.apply(null,n):typeof n=="object"?e+=Pe(n):e+=n,e+=" "}return e};let wi=null,Md=!0;const zv=function(s,e){k(!0,"Can't turn on custom loggers persistently."),rs.logLevel=dt.VERBOSE,wi=rs.log.bind(rs)},Fe=function(...s){if(Md===!0&&(Md=!1,wi===null&&jv.get("logging_enabled")===!0&&zv()),wi){const e=sr.apply(null,s);wi(e)}},ir=function(s){return function(...e){Fe(s,...e)}},wl=function(...s){const e="FIREBASE INTERNAL ERROR: "+sr(...s);rs.error(e)},Pt=function(...s){const e=`FIREBASE FATAL ERROR: ${sr(...s)}`;throw rs.error(e),new Error(e)},et=function(...s){const e="FIREBASE WARNING: "+sr(...s);rs.warn(e)},Kv=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&et("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},Zp=function(s){return typeof s=="number"&&(s!==s||s===Number.POSITIVE_INFINITY||s===Number.NEGATIVE_INFINITY)},Wv=function(s){if(document.readyState==="complete")s();else{let e=!1;const t=function(){if(!document.body){setTimeout(t,Math.floor(10));return}e||(e=!0,s())};document.addEventListener?(document.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("load",t,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&t()}),window.attachEvent("onload",t))}},Cs="[MIN_NAME]",Vn="[MAX_NAME]",Ms=function(s,e){if(s===e)return 0;if(s===Cs||e===Vn)return-1;if(e===Cs||s===Vn)return 1;{const t=Fd(s),n=Fd(e);return t!==null?n!==null?t-n===0?s.length-e.length:t-n:-1:n!==null?1:s<e?-1:1}},$v=function(s,e){return s===e?0:s<e?-1:1},oi=function(s,e){if(e&&s in e)return e[s];throw new Error("Missing required key ("+s+") in object: "+Pe(e))},ku=function(s){if(typeof s!="object"||s===null)return Pe(s);const e=[];for(const n in s)e.push(n);e.sort();let t="{";for(let n=0;n<e.length;n++)n!==0&&(t+=","),t+=Pe(e[n]),t+=":",t+=ku(s[e[n]]);return t+="}",t},em=function(s,e){const t=s.length;if(t<=e)return[s];const n=[];for(let i=0;i<t;i+=e)i+e>t?n.push(s.substring(i,t)):n.push(s.substring(i,i+e));return n};function He(s,e){for(const t in s)s.hasOwnProperty(t)&&e(t,s[t])}const tm=function(s){k(!Zp(s),"Invalid JSON number");const e=11,t=52,n=(1<<e-1)-1;let i,r,o,l,u;s===0?(r=0,o=0,i=1/s===-1/0?1:0):(i=s<0,s=Math.abs(s),s>=Math.pow(2,1-n)?(l=Math.min(Math.floor(Math.log(s)/Math.LN2),n),r=l+n,o=Math.round(s*Math.pow(2,t-l)-Math.pow(2,t))):(r=0,o=Math.round(s/Math.pow(2,1-n-t))));const c=[];for(u=t;u;u-=1)c.push(o%2?1:0),o=Math.floor(o/2);for(u=e;u;u-=1)c.push(r%2?1:0),r=Math.floor(r/2);c.push(i?1:0),c.reverse();const f=c.join("");let _="";for(u=0;u<64;u+=8){let m=parseInt(f.substr(u,8),2).toString(16);m.length===1&&(m="0"+m),_=_+m}return _.toLowerCase()},Qv=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},Hv=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function Yv(s,e){let t="Unknown Error";s==="too_big"?t="The data requested exceeds the maximum size that can be accessed with a single request.":s==="permission_denied"?t="Client doesn't have permission to access the desired data.":s==="unavailable"&&(t="The service is unavailable");const n=new Error(s+" at "+e._path.toString()+": "+t);return n.code=s.toUpperCase(),n}const Xv=new RegExp("^-?(0*)\\d{1,10}$"),Jv=-2147483648,Zv=2147483647,Fd=function(s){if(Xv.test(s)){const e=Number(s);if(e>=Jv&&e<=Zv)return e}return null},rr=function(s){try{s()}catch(e){setTimeout(()=>{const t=e.stack||"";throw et("Exception was thrown by user callback.",t),e},Math.floor(0))}},eT=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},Ai=function(s,e){const t=setTimeout(s,e);return typeof t=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(t):typeof t=="object"&&t.unref&&t.unref(),t};/**
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
 */class tT{constructor(e,t){this.appCheckProvider=t,this.appName=e.name,yf(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=t==null?void 0:t.getImmediate({optional:!0}),this.appCheck||t==null||t.get().then(n=>this.appCheck=n)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((t,n)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(t,n):t(null)},0)})}addTokenChangeListener(e){var t;(t=this.appCheckProvider)===null||t===void 0||t.get().then(n=>n.addTokenListener(e))}notifyForInvalidToken(){et(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
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
 */class nT{constructor(e,t,n){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=n,this.auth_=null,this.auth_=n.getImmediate({optional:!0}),this.auth_||n.onInit(i=>this.auth_=i)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(t=>t&&t.code==="auth/token-not-initialized"?(Fe("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(t)):new Promise((t,n)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(t,n):t(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(t=>t.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(t=>t.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',et(e)}}class Yr{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}Yr.OWNER="owner";/**
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
 */const Ou="5",nm="v",sm="s",im="r",rm="f",om=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,am="ls",lm="p",Al="ac",um="websocket",cm="long_polling";/**
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
 */class hm{constructor(e,t,n,i,r=!1,o="",l=!1,u=!1,c=null){this.secure=t,this.namespace=n,this.webSocketOnly=i,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=l,this.isUsingEmulator=u,this.emulatorOptions=c,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=yn.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&yn.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}}function sT(s){return s.host!==s.internalHost||s.isCustomHost()||s.includeNamespaceInQueryParams}function dm(s,e,t){k(typeof e=="string","typeof type must == string"),k(typeof t=="object","typeof params must == object");let n;if(e===um)n=(s.secure?"wss://":"ws://")+s.internalHost+"/.ws?";else if(e===cm)n=(s.secure?"https://":"http://")+s.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);sT(s)&&(t.ns=s.namespace);const i=[];return He(t,(r,o)=>{i.push(r+"="+o)}),n+i.join("&")}/**
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
 */class iT{constructor(){this.counters_={}}incrementCounter(e,t=1){bt(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return ty(this.counters_)}}/**
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
 */const qa={},ja={};function Mu(s){const e=s.toString();return qa[e]||(qa[e]=new iT),qa[e]}function rT(s,e){const t=s.toString();return ja[t]||(ja[t]=e()),ja[t]}/**
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
 */class oT{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){const n=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let i=0;i<n.length;++i)n[i]&&rr(()=>{this.onMessage_(n[i])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
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
 */const Ld="start",aT="close",lT="pLPCommand",uT="pRTLPCB",fm="id",_m="pw",pm="ser",cT="cb",hT="seg",dT="ts",fT="d",_T="dframe",mm=1870,gm=30,pT=mm-gm,mT=25e3,gT=3e4;class es{constructor(e,t,n,i,r,o,l){this.connId=e,this.repoInfo=t,this.applicationId=n,this.appCheckToken=i,this.authToken=r,this.transportSessionId=o,this.lastSessionId=l,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=ir(e),this.stats_=Mu(t),this.urlFn=u=>(this.appCheckToken&&(u[Al]=this.appCheckToken),dm(t,cm,u))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new oT(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(gT)),Wv(()=>{if(this.isClosed_)return;this.scriptTagHolder=new Fu((...r)=>{const[o,l,u,c,f]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===Ld)this.id=l,this.password=u;else if(o===aT)l?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(l,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,l]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,l)},()=>{this.onClosed_()},this.urlFn);const n={};n[Ld]="t",n[pm]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(n[cT]=this.scriptTagHolder.uniqueCallbackIdentifier),n[nm]=Ou,this.transportSessionId&&(n[sm]=this.transportSessionId),this.lastSessionId&&(n[am]=this.lastSessionId),this.applicationId&&(n[lm]=this.applicationId),this.appCheckToken&&(n[Al]=this.appCheckToken),typeof location<"u"&&location.hostname&&om.test(location.hostname)&&(n[im]=rm);const i=this.urlFn(n);this.log_("Connecting via long-poll to "+i),this.scriptTagHolder.addTag(i,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){es.forceAllow_=!0}static forceDisallow(){es.forceDisallow_=!0}static isAvailable(){return es.forceAllow_?!0:!es.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!Qv()&&!Hv()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const t=Pe(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const n=ny(t),i=em(n,pT);for(let r=0;r<i.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,i.length,i[r]),this.curSegmentNum++}addDisconnectPingFrame(e,t){this.myDisconnFrame=document.createElement("iframe");const n={};n[_T]="t",n[fm]=e,n[_m]=t,this.myDisconnFrame.src=this.urlFn(n),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const t=Pe(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}}class Fu{constructor(e,t,n,i){this.onDisconnect=n,this.urlFn=i,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=Gv(),window[lT+this.uniqueCallbackIdentifier]=e,window[uT+this.uniqueCallbackIdentifier]=t,this.myIFrame=Fu.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(l){Fe("frame writing exception"),l.stack&&Fe(l.stack),Fe(l)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||Fe("No IE domain setting required")}catch{const n=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+n+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[fm]=this.myID,e[_m]=this.myPW,e[pm]=this.currentSerial;let t=this.urlFn(e),n="",i=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+gm+n.length<=mm;){const o=this.pendingSegs.shift();n=n+"&"+hT+i+"="+o.seg+"&"+dT+i+"="+o.ts+"&"+fT+i+"="+o.d,i++}return t=t+n,this.addLongPollTag_(t,this.currentSerial),!0}else return!1}enqueueSegment(e,t,n){this.pendingSegs.push({seg:e,ts:t,d:n}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);const n=()=>{this.outstandingRequests.delete(t),this.newRequest_()},i=setTimeout(n,Math.floor(mT)),r=()=>{clearTimeout(i),n()};this.addTag(e,r)}addTag(e,t){setTimeout(()=>{try{if(!this.sendNewPolls)return;const n=this.myIFrame.doc.createElement("script");n.type="text/javascript",n.async=!0,n.src=e,n.onload=n.onreadystatechange=function(){const i=n.readyState;(!i||i==="loaded"||i==="complete")&&(n.onload=n.onreadystatechange=null,n.parentNode&&n.parentNode.removeChild(n),t())},n.onerror=()=>{Fe("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(n)}catch{}},Math.floor(1))}}/**
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
 */const yT=16384,ET=45e3;let Eo=null;typeof MozWebSocket<"u"?Eo=MozWebSocket:typeof WebSocket<"u"&&(Eo=WebSocket);class ot{constructor(e,t,n,i,r,o,l){this.connId=e,this.applicationId=n,this.appCheckToken=i,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=ir(this.connId),this.stats_=Mu(t),this.connURL=ot.connectionURL_(t,o,l,i,n),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,n,i,r){const o={};return o[nm]=Ou,typeof location<"u"&&location.hostname&&om.test(location.hostname)&&(o[im]=rm),t&&(o[sm]=t),n&&(o[am]=n),i&&(o[Al]=i),r&&(o[lm]=r),dm(e,um,o)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,yn.set("previous_websocket_failure",!0);try{let n;sy(),this.mySock=new Eo(this.connURL,[],n)}catch(n){this.log_("Error instantiating WebSocket.");const i=n.message||n.data;i&&this.log_(i),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=n=>{this.handleIncomingFrame(n)},this.mySock.onerror=n=>{this.log_("WebSocket error.  Closing connection.");const i=n.message||n.data;i&&this.log_(i),this.onClosed_()}}start(){}static forceDisallow(){ot.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const t=/Android ([0-9]{0,}\.[0-9]{0,})/,n=navigator.userAgent.match(t);n&&n.length>1&&parseFloat(n[1])<4.4&&(e=!0)}return!e&&Eo!==null&&!ot.forceDisallow_}static previouslyFailed(){return yn.isInMemoryStorage||yn.get("previous_websocket_failure")===!0}markConnectionHealthy(){yn.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const t=this.frames.join("");this.frames=null;const n=Ml(t);this.onMessage(n)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(k(this.frames===null,"We already have a frame buffer"),e.length<=6){const t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(t);else{const n=this.extractFrameCount_(t);n!==null&&this.appendFrame_(n)}}send(e){this.resetKeepAlive();const t=Pe(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const n=em(t,yT);n.length>1&&this.sendString_(String(n.length));for(let i=0;i<n.length;i++)this.sendString_(n[i])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(ET))}sendString_(e){try{this.mySock.send(e)}catch(t){this.log_("Exception thrown from WebSocket.send():",t.message||t.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}ot.responsesRequiredToBeHealthy=2;ot.healthyTimeout=3e4;/**
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
 */class qi{static get ALL_TRANSPORTS(){return[es,ot]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const t=ot&&ot.isAvailable();let n=t&&!ot.previouslyFailed();if(e.webSocketOnly&&(t||et("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),n=!0),n)this.transports_=[ot];else{const i=this.transports_=[];for(const r of qi.ALL_TRANSPORTS)r&&r.isAvailable()&&i.push(r);qi.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}qi.globalTransportInitialized_=!1;/**
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
 */const IT=6e4,vT=5e3,TT=10*1024,wT=100*1024,Ga="t",Ud="d",AT="s",Bd="r",RT="e",qd="o",jd="a",Gd="n",zd="p",ST="h";class CT{constructor(e,t,n,i,r,o,l,u,c,f){this.id=e,this.repoInfo_=t,this.applicationId_=n,this.appCheckToken_=i,this.authToken_=r,this.onMessage_=o,this.onReady_=l,this.onDisconnect_=u,this.onKill_=c,this.lastSessionId=f,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=ir("c:"+this.id+":"),this.transportManager_=new qi(t),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.conn_),n=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(t,n)},Math.floor(0));const i=e.healthyTimeout||0;i>0&&(this.healthyTimeout_=Ai(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>wT?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>TT?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(i)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){const t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(Ga in e){const t=e[Ga];t===jd?this.upgradeIfSecondaryHealthy_():t===Bd?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):t===qd&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const t=oi("t",e),n=oi("d",e);if(t==="c")this.onSecondaryControl_(n);else if(t==="d")this.pendingDataMessages.push(n);else throw new Error("Unknown protocol layer: "+t)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:zd,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:jd,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:Gd,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const t=oi("t",e),n=oi("d",e);t==="c"?this.onControl_(n):t==="d"&&this.onDataMessage_(n)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const t=oi(Ga,e);if(Ud in e){const n=e[Ud];if(t===ST){const i=Object.assign({},n);this.repoInfo_.isUsingEmulator&&(i.h=this.repoInfo_.host),this.onHandshake_(i)}else if(t===Gd){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let i=0;i<this.pendingDataMessages.length;++i)this.onDataMessage_(this.pendingDataMessages[i]);this.pendingDataMessages=[],this.tryCleanupConnection()}else t===AT?this.onConnectionShutdown_(n):t===Bd?this.onReset_(n):t===RT?wl("Server Error: "+n):t===qd?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):wl("Unknown control packet command: "+t)}}onHandshake_(e){const t=e.ts,n=e.v,i=e.h;this.sessionId=e.s,this.repoInfo_.host=i,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),Ou!==n&&et("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.secondaryConn_),n=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,n),Ai(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(IT))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):Ai(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(vT))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:zd,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(yn.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
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
 */class ym{put(e,t,n,i){}merge(e,t,n,i){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,n){}onDisconnectMerge(e,t,n){}onDisconnectCancel(e,t){}reportStats(e){}}/**
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
 */class Em{constructor(e){this.allowedEvents_=e,this.listeners_={},k(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){const n=[...this.listeners_[e]];for(let i=0;i<n.length;i++)n[i].callback.apply(n[i].context,t)}}on(e,t,n){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:n});const i=this.getInitialEvent(e);i&&t.apply(n,i)}off(e,t,n){this.validateEventType_(e);const i=this.listeners_[e]||[];for(let r=0;r<i.length;r++)if(i[r].callback===t&&(!n||n===i[r].context)){i.splice(r,1);return}}validateEventType_(e){k(this.allowedEvents_.find(t=>t===e),"Unknown event: "+e)}}/**
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
 */class Io extends Em{static getInstance(){return new Io}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!Cf()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return k(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
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
 */const Kd=32,Wd=768;class ae{constructor(e,t){if(t===void 0){this.pieces_=e.split("/");let n=0;for(let i=0;i<this.pieces_.length;i++)this.pieces_[i].length>0&&(this.pieces_[n]=this.pieces_[i],n++);this.pieces_.length=n,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)this.pieces_[t]!==""&&(e+="/"+this.pieces_[t]);return e||"/"}}function ne(){return new ae("")}function Q(s){return s.pieceNum_>=s.pieces_.length?null:s.pieces_[s.pieceNum_]}function Xt(s){return s.pieces_.length-s.pieceNum_}function ue(s){let e=s.pieceNum_;return e<s.pieces_.length&&e++,new ae(s.pieces_,e)}function Im(s){return s.pieceNum_<s.pieces_.length?s.pieces_[s.pieces_.length-1]:null}function PT(s){let e="";for(let t=s.pieceNum_;t<s.pieces_.length;t++)s.pieces_[t]!==""&&(e+="/"+encodeURIComponent(String(s.pieces_[t])));return e||"/"}function vm(s,e=0){return s.pieces_.slice(s.pieceNum_+e)}function Tm(s){if(s.pieceNum_>=s.pieces_.length)return null;const e=[];for(let t=s.pieceNum_;t<s.pieces_.length-1;t++)e.push(s.pieces_[t]);return new ae(e,0)}function we(s,e){const t=[];for(let n=s.pieceNum_;n<s.pieces_.length;n++)t.push(s.pieces_[n]);if(e instanceof ae)for(let n=e.pieceNum_;n<e.pieces_.length;n++)t.push(e.pieces_[n]);else{const n=e.split("/");for(let i=0;i<n.length;i++)n[i].length>0&&t.push(n[i])}return new ae(t,0)}function H(s){return s.pieceNum_>=s.pieces_.length}function $e(s,e){const t=Q(s),n=Q(e);if(t===null)return e;if(t===n)return $e(ue(s),ue(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+s+")")}function Lu(s,e){if(Xt(s)!==Xt(e))return!1;for(let t=s.pieceNum_,n=e.pieceNum_;t<=s.pieces_.length;t++,n++)if(s.pieces_[t]!==e.pieces_[n])return!1;return!0}function at(s,e){let t=s.pieceNum_,n=e.pieceNum_;if(Xt(s)>Xt(e))return!1;for(;t<s.pieces_.length;){if(s.pieces_[t]!==e.pieces_[n])return!1;++t,++n}return!0}class bT{constructor(e,t){this.errorPrefix_=t,this.parts_=vm(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let n=0;n<this.parts_.length;n++)this.byteLength_+=Do(this.parts_[n]);wm(this)}}function VT(s,e){s.parts_.length>0&&(s.byteLength_+=1),s.parts_.push(e),s.byteLength_+=Do(e),wm(s)}function xT(s){const e=s.parts_.pop();s.byteLength_-=Do(e),s.parts_.length>0&&(s.byteLength_-=1)}function wm(s){if(s.byteLength_>Wd)throw new Error(s.errorPrefix_+"has a key path longer than "+Wd+" bytes ("+s.byteLength_+").");if(s.parts_.length>Kd)throw new Error(s.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+Kd+") or object contains a cycle "+dn(s))}function dn(s){return s.parts_.length===0?"":"in property '"+s.parts_.join(".")+"'"}/**
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
 */class Uu extends Em{static getInstance(){return new Uu}constructor(){super(["visible"]);let e,t;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(t="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(t="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(t="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,()=>{const n=!document[e];n!==this.visible_&&(this.visible_=n,this.trigger("visible",n))},!1)}getInitialEvent(e){return k(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
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
 */const ai=1e3,NT=60*5*1e3,$d=30*1e3,DT=1.3,kT=3e4,OT="server_kill",Qd=3;class Rt extends ym{constructor(e,t,n,i,r,o,l,u){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=n,this.onConnectStatus_=i,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=l,this.authOverride_=u,this.id=Rt.nextPersistentConnectionId_++,this.log_=ir("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=ai,this.maxReconnectDelay_=NT,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,u)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");Uu.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&Io.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,n){const i=++this.requestNumber_,r={r:i,a:e,b:t};this.log_(Pe(r)),k(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),n&&(this.requestCBHash_[i]=n)}get(e){this.initConnection_();const t=new Sf,i={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const l=o.d;o.s==="ok"?t.resolve(l):t.reject(l)}};this.outstandingGets_.push(i),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),t.promise}listen(e,t,n,i){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),k(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),k(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const l={onComplete:i,hashFn:t,query:e,tag:n};this.listens.get(o).set(r,l),this.connected_&&this.sendListen_(l)}sendGet_(e){const t=this.outstandingGets_[e];this.sendRequest("g",t.request,n=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(n)})}sendListen_(e){const t=e.query,n=t._path.toString(),i=t._queryIdentifier;this.log_("Listen on "+n+" for "+i);const r={p:n},o="q";e.tag&&(r.q=t._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,l=>{const u=l.d,c=l.s;Rt.warnOnListenWarnings_(u,t),(this.listens.get(n)&&this.listens.get(n).get(i))===e&&(this.log_("listen response",l),c!=="ok"&&this.removeListen_(n,i),e.onComplete&&e.onComplete(c,u))})}static warnOnListenWarnings_(e,t){if(e&&typeof e=="object"&&bt(e,"w")){const n=ls(e,"w");if(Array.isArray(n)&&~n.indexOf("no_index")){const i='".indexOn": "'+t._queryParams.getIndex().toString()+'"',r=t._path.toString();et(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${i} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||Jg(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=$d)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,t=Zg(e)?"auth":"gauth",n={cred:e};this.authOverride_===null?n.noauth=!0:typeof this.authOverride_=="object"&&(n.authvar=this.authOverride_),this.sendRequest(t,n,i=>{const r=i.s,o=i.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const t=e.s,n=e.d||"error";t==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,n)})}unlisten(e,t){const n=e._path.toString(),i=e._queryIdentifier;this.log_("Unlisten called for "+n+" "+i),k(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(n,i)&&this.connected_&&this.sendUnlisten_(n,i,e._queryObject,t)}sendUnlisten_(e,t,n,i){this.log_("Unlisten on "+e+" for "+t);const r={p:e},o="n";i&&(r.q=n,r.t=i),this.sendRequest(o,r)}onDisconnectPut(e,t,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:n})}onDisconnectMerge(e,t,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:n})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,n,i){const r={p:t,d:n};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{i&&setTimeout(()=>{i(o.s,o.d)},Math.floor(0))})}put(e,t,n,i){this.putInternal("p",e,t,n,i)}merge(e,t,n,i){this.putInternal("m",e,t,n,i)}putInternal(e,t,n,i,r){this.initConnection_();const o={p:t,d:n};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:i}),this.outstandingPutCount_++;const l=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(l):this.log_("Buffering put: "+t)}sendPut_(e){const t=this.outstandingPuts_[e].action,n=this.outstandingPuts_[e].request,i=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,n,r=>{this.log_(t+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),i&&i(r.s,r.d)})}reportStats(e){if(this.connected_){const t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,n=>{if(n.s!=="ok"){const r=n.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+Pe(e));const t=e.r,n=this.requestCBHash_[t];n&&(delete this.requestCBHash_[t],n(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),e==="d"?this.onDataUpdate_(t.p,t.d,!1,t.t):e==="m"?this.onDataUpdate_(t.p,t.d,!0,t.t):e==="c"?this.onListenRevoked_(t.p,t.q):e==="ac"?this.onAuthRevoked_(t.s,t.d):e==="apc"?this.onAppCheckRevoked_(t.s,t.d):e==="sd"?this.onSecurityDebugPacket_(t):wl("Unrecognized action received from server: "+Pe(e)+`
Are you using the latest client?`)}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){k(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=ai,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=ai,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>kT&&(this.reconnectDelay_=ai),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*DT)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),n=this.onRealtimeDisconnect_.bind(this),i=this.id+":"+Rt.nextConnectionId_++,r=this.lastSessionId;let o=!1,l=null;const u=function(){l?l.close():(o=!0,n())},c=function(_){k(l,"sendRequest call when we're not connected not allowed."),l.sendRequest(_)};this.realtime_={close:u,sendRequest:c};const f=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[_,m]=await Promise.all([this.authTokenProvider_.getToken(f),this.appCheckTokenProvider_.getToken(f)]);o?Fe("getToken() completed but was canceled"):(Fe("getToken() completed. Creating connection."),this.authToken_=_&&_.accessToken,this.appCheckToken_=m&&m.token,l=new CT(i,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,n,T=>{et(T+" ("+this.repoInfo_.toString()+")"),this.interrupt(OT)},r))}catch(_){this.log_("Failed to get token: "+_),o||(this.repoInfo_.nodeAdmin&&et(_),u())}}}interrupt(e){Fe("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){Fe("Resuming connection for reason: "+e),delete this.interruptReasons_[e],uh(this.interruptReasons_)&&(this.reconnectDelay_=ai,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const t=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let n;t?n=t.map(r=>ku(r)).join("$"):n="default";const i=this.removeListen_(e,n);i&&i.onComplete&&i.onComplete("permission_denied")}removeListen_(e,t){const n=new ae(e).toString();let i;if(this.listens.has(n)){const r=this.listens.get(n);i=r.get(t),r.delete(t),r.size===0&&this.listens.delete(n)}else i=void 0;return i}onAuthRevoked_(e,t){Fe("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=Qd&&(this.reconnectDelay_=$d,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){Fe("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=Qd&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let t="js";e["sdk."+t+"."+Yp.replace(/\./g,"-")]=1,Cf()?e["framework.cordova"]=1:ey()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=Io.getInstance().currentlyOnline();return uh(this.interruptReasons_)&&e}}Rt.nextPersistentConnectionId_=0;Rt.nextConnectionId_=0;/**
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
 */class na{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){const n=new $(Cs,e),i=new $(Cs,t);return this.compare(n,i)!==0}minPost(){return $.MIN}}/**
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
 */let Mr;class Am extends na{static get __EMPTY_NODE(){return Mr}static set __EMPTY_NODE(e){Mr=e}compare(e,t){return Ms(e.name,t.name)}isDefinedOn(e){throw $i("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return $.MIN}maxPost(){return new $(Vn,Mr)}makePost(e,t){return k(typeof e=="string","KeyIndex indexValue must always be a string."),new $(e,Mr)}toString(){return".key"}}const os=new Am;/**
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
 */class Fr{constructor(e,t,n,i,r=null){this.isReverse_=i,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=t?n(e.key,t):1,i&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),t;if(this.resultGenerator_?t=this.resultGenerator_(e.key,e.value):t={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return t}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class Ce{constructor(e,t,n,i,r){this.key=e,this.value=t,this.color=n??Ce.RED,this.left=i??Qe.EMPTY_NODE,this.right=r??Qe.EMPTY_NODE}copy(e,t,n,i,r){return new Ce(e??this.key,t??this.value,n??this.color,i??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let i=this;const r=n(e,i.key);return r<0?i=i.copy(null,null,null,i.left.insert(e,t,n),null):r===0?i=i.copy(null,t,null,null,null):i=i.copy(null,null,null,null,i.right.insert(e,t,n)),i.fixUp_()}removeMin_(){if(this.left.isEmpty())return Qe.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let n,i;if(n=this,t(e,n.key)<0)!n.left.isEmpty()&&!n.left.isRed_()&&!n.left.left.isRed_()&&(n=n.moveRedLeft_()),n=n.copy(null,null,null,n.left.remove(e,t),null);else{if(n.left.isRed_()&&(n=n.rotateRight_()),!n.right.isEmpty()&&!n.right.isRed_()&&!n.right.left.isRed_()&&(n=n.moveRedRight_()),t(e,n.key)===0){if(n.right.isEmpty())return Qe.EMPTY_NODE;i=n.right.min_(),n=n.copy(i.key,i.value,null,null,n.right.removeMin_())}n=n.copy(null,null,null,null,n.right.remove(e,t))}return n.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,Ce.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,Ce.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}Ce.RED=!0;Ce.BLACK=!1;class MT{copy(e,t,n,i,r){return this}insert(e,t,n){return new Ce(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class Qe{constructor(e,t=Qe.EMPTY_NODE){this.comparator_=e,this.root_=t}insert(e,t){return new Qe(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,Ce.BLACK,null,null))}remove(e){return new Qe(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,Ce.BLACK,null,null))}get(e){let t,n=this.root_;for(;!n.isEmpty();){if(t=this.comparator_(e,n.key),t===0)return n.value;t<0?n=n.left:t>0&&(n=n.right)}return null}getPredecessorKey(e){let t,n=this.root_,i=null;for(;!n.isEmpty();)if(t=this.comparator_(e,n.key),t===0){if(n.left.isEmpty())return i?i.key:null;for(n=n.left;!n.right.isEmpty();)n=n.right;return n.key}else t<0?n=n.left:t>0&&(i=n,n=n.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new Fr(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new Fr(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new Fr(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new Fr(this.root_,null,this.comparator_,!0,e)}}Qe.EMPTY_NODE=new MT;/**
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
 */function FT(s,e){return Ms(s.name,e.name)}function Bu(s,e){return Ms(s,e)}/**
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
 */let Rl;function LT(s){Rl=s}const Rm=function(s){return typeof s=="number"?"number:"+tm(s):"string:"+s},Sm=function(s){if(s.isLeafNode()){const e=s.val();k(typeof e=="string"||typeof e=="number"||typeof e=="object"&&bt(e,".sv"),"Priority must be a string or number.")}else k(s===Rl||s.isEmpty(),"priority of unexpected type.");k(s===Rl||s.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
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
 */let Hd;class Re{static set __childrenNodeConstructor(e){Hd=e}static get __childrenNodeConstructor(){return Hd}constructor(e,t=Re.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=t,this.lazyHash_=null,k(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),Sm(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new Re(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:Re.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return H(e)?this:Q(e)===".priority"?this.priorityNode_:Re.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return e===".priority"?this.updatePriority(t):t.isEmpty()&&e!==".priority"?this:Re.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){const n=Q(e);return n===null?t:t.isEmpty()&&n!==".priority"?this:(k(n!==".priority"||Xt(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(n,Re.__childrenNodeConstructor.EMPTY_NODE.updateChild(ue(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+Rm(this.priorityNode_.val())+":");const t=typeof this.value_;e+=t+":",t==="number"?e+=tm(this.value_):e+=this.value_,this.lazyHash_=Jp(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===Re.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof Re.__childrenNodeConstructor?-1:(k(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const t=typeof e.value_,n=typeof this.value_,i=Re.VALUE_TYPE_ORDER.indexOf(t),r=Re.VALUE_TYPE_ORDER.indexOf(n);return k(i>=0,"Unknown leaf type: "+t),k(r>=0,"Unknown leaf type: "+n),i===r?n==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-i}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}else return!1}}Re.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
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
 */let Cm,Pm;function UT(s){Cm=s}function BT(s){Pm=s}class qT extends na{compare(e,t){const n=e.node.getPriority(),i=t.node.getPriority(),r=n.compareTo(i);return r===0?Ms(e.name,t.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return $.MIN}maxPost(){return new $(Vn,new Re("[PRIORITY-POST]",Pm))}makePost(e,t){const n=Cm(e);return new $(t,new Re("[PRIORITY-POST]",n))}toString(){return".priority"}}const ge=new qT;/**
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
 */const jT=Math.log(2);class GT{constructor(e){const t=r=>parseInt(Math.log(r)/jT,10),n=r=>parseInt(Array(r+1).join("1"),2);this.count=t(e+1),this.current_=this.count-1;const i=n(this.count);this.bits_=e+1&i}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const vo=function(s,e,t,n){s.sort(e);const i=function(u,c){const f=c-u;let _,m;if(f===0)return null;if(f===1)return _=s[u],m=t?t(_):_,new Ce(m,_.node,Ce.BLACK,null,null);{const T=parseInt(f/2,10)+u,C=i(u,T),V=i(T+1,c);return _=s[T],m=t?t(_):_,new Ce(m,_.node,Ce.BLACK,C,V)}},r=function(u){let c=null,f=null,_=s.length;const m=function(C,V){const N=_-C,K=_;_-=C;const j=i(N+1,K),B=s[N],J=t?t(B):B;T(new Ce(J,B.node,V,null,j))},T=function(C){c?(c.left=C,c=C):(f=C,c=C)};for(let C=0;C<u.count;++C){const V=u.nextBitIsOne(),N=Math.pow(2,u.count-(C+1));V?m(N,Ce.BLACK):(m(N,Ce.BLACK),m(N,Ce.RED))}return f},o=new GT(s.length),l=r(o);return new Qe(n||e,l)};/**
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
 */let za;const Qn={};class wt{static get Default(){return k(Qn&&ge,"ChildrenNode.ts has not been loaded"),za=za||new wt({".priority":Qn},{".priority":ge}),za}constructor(e,t){this.indexes_=e,this.indexSet_=t}get(e){const t=ls(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof Qe?t:null}hasIndex(e){return bt(this.indexSet_,e.toString())}addIndex(e,t){k(e!==os,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const n=[];let i=!1;const r=t.getIterator($.Wrap);let o=r.getNext();for(;o;)i=i||e.isDefinedOn(o.node),n.push(o),o=r.getNext();let l;i?l=vo(n,e.getCompare()):l=Qn;const u=e.toString(),c=Object.assign({},this.indexSet_);c[u]=e;const f=Object.assign({},this.indexes_);return f[u]=l,new wt(f,c)}addToIndexes(e,t){const n=Zr(this.indexes_,(i,r)=>{const o=ls(this.indexSet_,r);if(k(o,"Missing index implementation for "+r),i===Qn)if(o.isDefinedOn(e.node)){const l=[],u=t.getIterator($.Wrap);let c=u.getNext();for(;c;)c.name!==e.name&&l.push(c),c=u.getNext();return l.push(e),vo(l,o.getCompare())}else return Qn;else{const l=t.get(e.name);let u=i;return l&&(u=u.remove(new $(e.name,l))),u.insert(e,e.node)}});return new wt(n,this.indexSet_)}removeFromIndexes(e,t){const n=Zr(this.indexes_,i=>{if(i===Qn)return i;{const r=t.get(e.name);return r?i.remove(new $(e.name,r)):i}});return new wt(n,this.indexSet_)}}/**
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
 */let li;class z{static get EMPTY_NODE(){return li||(li=new z(new Qe(Bu),null,wt.Default))}constructor(e,t,n){this.children_=e,this.priorityNode_=t,this.indexMap_=n,this.lazyHash_=null,this.priorityNode_&&Sm(this.priorityNode_),this.children_.isEmpty()&&k(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||li}updatePriority(e){return this.children_.isEmpty()?this:new z(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const t=this.children_.get(e);return t===null?li:t}}getChild(e){const t=Q(e);return t===null?this:this.getImmediateChild(t).getChild(ue(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,t){if(k(t,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(t);{const n=new $(e,t);let i,r;t.isEmpty()?(i=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(n,this.children_)):(i=this.children_.insert(e,t),r=this.indexMap_.addToIndexes(n,this.children_));const o=i.isEmpty()?li:this.priorityNode_;return new z(i,o,r)}}updateChild(e,t){const n=Q(e);if(n===null)return t;{k(Q(e)!==".priority"||Xt(e)===1,".priority must be the last token in a path");const i=this.getImmediateChild(n).updateChild(ue(e),t);return this.updateImmediateChild(n,i)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const t={};let n=0,i=0,r=!0;if(this.forEachChild(ge,(o,l)=>{t[o]=l.val(e),n++,r&&z.INTEGER_REGEXP_.test(o)?i=Math.max(i,Number(o)):r=!1}),!e&&r&&i<2*n){const o=[];for(const l in t)o[l]=t[l];return o}else return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+Rm(this.getPriority().val())+":"),this.forEachChild(ge,(t,n)=>{const i=n.hash();i!==""&&(e+=":"+t+":"+i)}),this.lazyHash_=e===""?"":Jp(e)}return this.lazyHash_}getPredecessorChildName(e,t,n){const i=this.resolveIndex_(n);if(i){const r=i.getPredecessorKey(new $(e,t));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const t=this.resolveIndex_(e);if(t){const n=t.minKey();return n&&n.name}else return this.children_.minKey()}getFirstChild(e){const t=this.getFirstChildName(e);return t?new $(t,this.children_.get(t)):null}getLastChildName(e){const t=this.resolveIndex_(e);if(t){const n=t.maxKey();return n&&n.name}else return this.children_.maxKey()}getLastChild(e){const t=this.getLastChildName(e);return t?new $(t,this.children_.get(t)):null}forEachChild(e,t){const n=this.resolveIndex_(e);return n?n.inorderTraversal(i=>t(i.name,i.node)):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){const n=this.resolveIndex_(t);if(n)return n.getIteratorFrom(e,i=>i);{const i=this.children_.getIteratorFrom(e.name,$.Wrap);let r=i.peek();for(;r!=null&&t.compare(r,e)<0;)i.getNext(),r=i.peek();return i}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){const n=this.resolveIndex_(t);if(n)return n.getReverseIteratorFrom(e,i=>i);{const i=this.children_.getReverseIteratorFrom(e.name,$.Wrap);let r=i.peek();for(;r!=null&&t.compare(r,e)>0;)i.getNext(),r=i.peek();return i}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===or?-1:0}withIndex(e){if(e===os||this.indexMap_.hasIndex(e))return this;{const t=this.indexMap_.addIndex(e,this.children_);return new z(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===os||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const t=e;if(this.getPriority().equals(t.getPriority()))if(this.children_.count()===t.children_.count()){const n=this.getIterator(ge),i=t.getIterator(ge);let r=n.getNext(),o=i.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=n.getNext(),o=i.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===os?null:this.indexMap_.get(e.toString())}}z.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class zT extends z{constructor(){super(new Qe(Bu),z.EMPTY_NODE,wt.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return z.EMPTY_NODE}isEmpty(){return!1}}const or=new zT;Object.defineProperties($,{MIN:{value:new $(Cs,z.EMPTY_NODE)},MAX:{value:new $(Vn,or)}});Am.__EMPTY_NODE=z.EMPTY_NODE;Re.__childrenNodeConstructor=z;LT(or);BT(or);/**
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
 */const KT=!0;function Le(s,e=null){if(s===null)return z.EMPTY_NODE;if(typeof s=="object"&&".priority"in s&&(e=s[".priority"]),k(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof s=="object"&&".value"in s&&s[".value"]!==null&&(s=s[".value"]),typeof s!="object"||".sv"in s){const t=s;return new Re(t,Le(e))}if(!(s instanceof Array)&&KT){const t=[];let n=!1;if(He(s,(o,l)=>{if(o.substring(0,1)!=="."){const u=Le(l);u.isEmpty()||(n=n||!u.getPriority().isEmpty(),t.push(new $(o,u)))}}),t.length===0)return z.EMPTY_NODE;const r=vo(t,FT,o=>o.name,Bu);if(n){const o=vo(t,ge.getCompare());return new z(r,Le(e),new wt({".priority":o},{".priority":ge}))}else return new z(r,Le(e),wt.Default)}else{let t=z.EMPTY_NODE;return He(s,(n,i)=>{if(bt(s,n)&&n.substring(0,1)!=="."){const r=Le(i);(r.isLeafNode()||!r.isEmpty())&&(t=t.updateImmediateChild(n,r))}}),t.updatePriority(Le(e))}}UT(Le);/**
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
 */class WT extends na{constructor(e){super(),this.indexPath_=e,k(!H(e)&&Q(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){const n=this.extractChild(e.node),i=this.extractChild(t.node),r=n.compareTo(i);return r===0?Ms(e.name,t.name):r}makePost(e,t){const n=Le(e),i=z.EMPTY_NODE.updateChild(this.indexPath_,n);return new $(t,i)}maxPost(){const e=z.EMPTY_NODE.updateChild(this.indexPath_,or);return new $(Vn,e)}toString(){return vm(this.indexPath_,0).join("/")}}/**
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
 */class $T extends na{compare(e,t){const n=e.node.compareTo(t.node);return n===0?Ms(e.name,t.name):n}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return $.MIN}maxPost(){return $.MAX}makePost(e,t){const n=Le(e);return new $(t,n)}toString(){return".value"}}const QT=new $T;/**
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
 */function bm(s){return{type:"value",snapshotNode:s}}function Ps(s,e){return{type:"child_added",snapshotNode:e,childName:s}}function ji(s,e){return{type:"child_removed",snapshotNode:e,childName:s}}function Gi(s,e,t){return{type:"child_changed",snapshotNode:e,childName:s,oldSnap:t}}function HT(s,e){return{type:"child_moved",snapshotNode:e,childName:s}}/**
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
 */class qu{constructor(e){this.index_=e}updateChild(e,t,n,i,r,o){k(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const l=e.getImmediateChild(t);return l.getChild(i).equals(n.getChild(i))&&l.isEmpty()===n.isEmpty()||(o!=null&&(n.isEmpty()?e.hasChild(t)?o.trackChildChange(ji(t,l)):k(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):l.isEmpty()?o.trackChildChange(Ps(t,n)):o.trackChildChange(Gi(t,n,l))),e.isLeafNode()&&n.isEmpty())?e:e.updateImmediateChild(t,n).withIndex(this.index_)}updateFullNode(e,t,n){return n!=null&&(e.isLeafNode()||e.forEachChild(ge,(i,r)=>{t.hasChild(i)||n.trackChildChange(ji(i,r))}),t.isLeafNode()||t.forEachChild(ge,(i,r)=>{if(e.hasChild(i)){const o=e.getImmediateChild(i);o.equals(r)||n.trackChildChange(Gi(i,r,o))}else n.trackChildChange(Ps(i,r))})),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?z.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
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
 */class zi{constructor(e){this.indexedFilter_=new qu(e.getIndex()),this.index_=e.getIndex(),this.startPost_=zi.getStartPost_(e),this.endPost_=zi.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const t=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,n=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return t&&n}updateChild(e,t,n,i,r,o){return this.matches(new $(t,n))||(n=z.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,n,i,r,o)}updateFullNode(e,t,n){t.isLeafNode()&&(t=z.EMPTY_NODE);let i=t.withIndex(this.index_);i=i.updatePriority(z.EMPTY_NODE);const r=this;return t.forEachChild(ge,(o,l)=>{r.matches(new $(o,l))||(i=i.updateImmediateChild(o,z.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,i,n)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}else return e.getIndex().maxPost()}}/**
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
 */class YT{constructor(e){this.withinDirectionalStart=t=>this.reverse_?this.withinEndPost(t):this.withinStartPost(t),this.withinDirectionalEnd=t=>this.reverse_?this.withinStartPost(t):this.withinEndPost(t),this.withinStartPost=t=>{const n=this.index_.compare(this.rangedFilter_.getStartPost(),t);return this.startIsInclusive_?n<=0:n<0},this.withinEndPost=t=>{const n=this.index_.compare(t,this.rangedFilter_.getEndPost());return this.endIsInclusive_?n<=0:n<0},this.rangedFilter_=new zi(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,n,i,r,o){return this.rangedFilter_.matches(new $(t,n))||(n=z.EMPTY_NODE),e.getImmediateChild(t).equals(n)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,n,i,r,o):this.fullLimitUpdateChild_(e,t,n,r,o)}updateFullNode(e,t,n){let i;if(t.isLeafNode()||t.isEmpty())i=z.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<t.numChildren()&&t.isIndexed(this.index_)){i=z.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const l=r.getNext();if(this.withinDirectionalStart(l))if(this.withinDirectionalEnd(l))i=i.updateImmediateChild(l.name,l.node),o++;else break;else continue}}else{i=t.withIndex(this.index_),i=i.updatePriority(z.EMPTY_NODE);let r;this.reverse_?r=i.getReverseIterator(this.index_):r=i.getIterator(this.index_);let o=0;for(;r.hasNext();){const l=r.getNext();o<this.limit_&&this.withinDirectionalStart(l)&&this.withinDirectionalEnd(l)?o++:i=i.updateImmediateChild(l.name,z.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,i,n)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,n,i,r){let o;if(this.reverse_){const _=this.index_.getCompare();o=(m,T)=>_(T,m)}else o=this.index_.getCompare();const l=e;k(l.numChildren()===this.limit_,"");const u=new $(t,n),c=this.reverse_?l.getFirstChild(this.index_):l.getLastChild(this.index_),f=this.rangedFilter_.matches(u);if(l.hasChild(t)){const _=l.getImmediateChild(t);let m=i.getChildAfterChild(this.index_,c,this.reverse_);for(;m!=null&&(m.name===t||l.hasChild(m.name));)m=i.getChildAfterChild(this.index_,m,this.reverse_);const T=m==null?1:o(m,u);if(f&&!n.isEmpty()&&T>=0)return r!=null&&r.trackChildChange(Gi(t,n,_)),l.updateImmediateChild(t,n);{r!=null&&r.trackChildChange(ji(t,_));const V=l.updateImmediateChild(t,z.EMPTY_NODE);return m!=null&&this.rangedFilter_.matches(m)?(r!=null&&r.trackChildChange(Ps(m.name,m.node)),V.updateImmediateChild(m.name,m.node)):V}}else return n.isEmpty()?e:f&&o(c,u)>=0?(r!=null&&(r.trackChildChange(ji(c.name,c.node)),r.trackChildChange(Ps(t,n))),l.updateImmediateChild(t,n).updateImmediateChild(c.name,z.EMPTY_NODE)):e}}/**
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
 */class ju{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=ge}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return k(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return k(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:Cs}hasEnd(){return this.endSet_}getIndexEndValue(){return k(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return k(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:Vn}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return k(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===ge}copy(){const e=new ju;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function XT(s){return s.loadsAllData()?new qu(s.getIndex()):s.hasLimit()?new YT(s):new zi(s)}function Yd(s){const e={};if(s.isDefault())return e;let t;if(s.index_===ge?t="$priority":s.index_===QT?t="$value":s.index_===os?t="$key":(k(s.index_ instanceof WT,"Unrecognized index type!"),t=s.index_.toString()),e.orderBy=Pe(t),s.startSet_){const n=s.startAfterSet_?"startAfter":"startAt";e[n]=Pe(s.indexStartValue_),s.startNameSet_&&(e[n]+=","+Pe(s.indexStartName_))}if(s.endSet_){const n=s.endBeforeSet_?"endBefore":"endAt";e[n]=Pe(s.indexEndValue_),s.endNameSet_&&(e[n]+=","+Pe(s.indexEndName_))}return s.limitSet_&&(s.isViewFromLeft()?e.limitToFirst=s.limit_:e.limitToLast=s.limit_),e}function Xd(s){const e={};if(s.startSet_&&(e.sp=s.indexStartValue_,s.startNameSet_&&(e.sn=s.indexStartName_),e.sin=!s.startAfterSet_),s.endSet_&&(e.ep=s.indexEndValue_,s.endNameSet_&&(e.en=s.indexEndName_),e.ein=!s.endBeforeSet_),s.limitSet_){e.l=s.limit_;let t=s.viewFrom_;t===""&&(s.isViewFromLeft()?t="l":t="r"),e.vf=t}return s.index_!==ge&&(e.i=s.index_.toString()),e}/**
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
 */class To extends ym{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return t!==void 0?"tag$"+t:(k(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,t,n,i){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=n,this.appCheckTokenProvider_=i,this.log_=ir("p:rest:"),this.listens_={}}listen(e,t,n,i){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=To.getListenId_(e,n),l={};this.listens_[o]=l;const u=Yd(e._queryParams);this.restRequest_(r+".json",u,(c,f)=>{let _=f;if(c===404&&(_=null,c=null),c===null&&this.onDataUpdate_(r,_,!1,n),ls(this.listens_,o)===l){let m;c?c===401?m="permission_denied":m="rest_error:"+c:m="ok",i(m,null)}})}unlisten(e,t){const n=To.getListenId_(e,t);delete this.listens_[n]}get(e){const t=Yd(e._queryParams),n=e._path.toString(),i=new Sf;return this.restRequest_(n+".json",t,(r,o)=>{let l=o;r===404&&(l=null,r=null),r===null?(this.onDataUpdate_(n,l,!1,null),i.resolve(l)):i.reject(new Error(l))}),i.promise}refreshAuthToken(e){}restRequest_(e,t={},n){return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([i,r])=>{i&&i.accessToken&&(t.auth=i.accessToken),r&&r.token&&(t.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+Xg(t);this.log_("Sending REST request for "+o);const l=new XMLHttpRequest;l.onreadystatechange=()=>{if(n&&l.readyState===4){this.log_("REST Response for "+o+" received. status:",l.status,"response:",l.responseText);let u=null;if(l.status>=200&&l.status<300){try{u=Ml(l.responseText)}catch{et("Failed to parse JSON response for "+o+": "+l.responseText)}n(null,u)}else l.status!==401&&l.status!==404&&et("Got unsuccessful REST response for "+o+" Status: "+l.status),n(l.status);n=null}},l.open("GET",o,!0),l.send()})}}/**
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
 */class JT{constructor(){this.rootNode_=z.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}}/**
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
 */function wo(){return{value:null,children:new Map}}function Vm(s,e,t){if(H(e))s.value=t,s.children.clear();else if(s.value!==null)s.value=s.value.updateChild(e,t);else{const n=Q(e);s.children.has(n)||s.children.set(n,wo());const i=s.children.get(n);e=ue(e),Vm(i,e,t)}}function Sl(s,e,t){s.value!==null?t(e,s.value):ZT(s,(n,i)=>{const r=new ae(e.toString()+"/"+n);Sl(i,r,t)})}function ZT(s,e){s.children.forEach((t,n)=>{e(n,t)})}/**
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
 */class ew{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),t=Object.assign({},e);return this.last_&&He(this.last_,(n,i)=>{t[n]=t[n]-i}),this.last_=e,t}}/**
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
 */const Jd=10*1e3,tw=30*1e3,nw=5*60*1e3;class sw{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new ew(e);const n=Jd+(tw-Jd)*Math.random();Ai(this.reportStats_.bind(this),Math.floor(n))}reportStats_(){const e=this.statsListener_.get(),t={};let n=!1;He(e,(i,r)=>{r>0&&bt(this.statsToReport_,i)&&(t[i]=r,n=!0)}),n&&this.server_.reportStats(t),Ai(this.reportStats_.bind(this),Math.floor(Math.random()*2*nw))}}/**
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
 */var lt;(function(s){s[s.OVERWRITE=0]="OVERWRITE",s[s.MERGE=1]="MERGE",s[s.ACK_USER_WRITE=2]="ACK_USER_WRITE",s[s.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(lt||(lt={}));function xm(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function Gu(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function zu(s){return{fromUser:!1,fromServer:!0,queryId:s,tagged:!0}}/**
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
 */class Ao{constructor(e,t,n){this.path=e,this.affectedTree=t,this.revert=n,this.type=lt.ACK_USER_WRITE,this.source=xm()}operationForChild(e){if(H(this.path)){if(this.affectedTree.value!=null)return k(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const t=this.affectedTree.subtree(new ae(e));return new Ao(ne(),t,this.revert)}}else return k(Q(this.path)===e,"operationForChild called for unrelated child."),new Ao(ue(this.path),this.affectedTree,this.revert)}}/**
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
 */class Ki{constructor(e,t){this.source=e,this.path=t,this.type=lt.LISTEN_COMPLETE}operationForChild(e){return H(this.path)?new Ki(this.source,ne()):new Ki(this.source,ue(this.path))}}/**
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
 */class xn{constructor(e,t,n){this.source=e,this.path=t,this.snap=n,this.type=lt.OVERWRITE}operationForChild(e){return H(this.path)?new xn(this.source,ne(),this.snap.getImmediateChild(e)):new xn(this.source,ue(this.path),this.snap)}}/**
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
 */class Wi{constructor(e,t,n){this.source=e,this.path=t,this.children=n,this.type=lt.MERGE}operationForChild(e){if(H(this.path)){const t=this.children.subtree(new ae(e));return t.isEmpty()?null:t.value?new xn(this.source,ne(),t.value):new Wi(this.source,ne(),t)}else return k(Q(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new Wi(this.source,ue(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
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
 */class Nn{constructor(e,t,n){this.node_=e,this.fullyInitialized_=t,this.filtered_=n}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(H(e))return this.isFullyInitialized()&&!this.filtered_;const t=Q(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
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
 */class iw{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function rw(s,e,t,n){const i=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&s.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(HT(o.childName,o.snapshotNode))}),ui(s,i,"child_removed",e,n,t),ui(s,i,"child_added",e,n,t),ui(s,i,"child_moved",r,n,t),ui(s,i,"child_changed",e,n,t),ui(s,i,"value",e,n,t),i}function ui(s,e,t,n,i,r){const o=n.filter(l=>l.type===t);o.sort((l,u)=>aw(s,l,u)),o.forEach(l=>{const u=ow(s,l,r);i.forEach(c=>{c.respondsTo(l.type)&&e.push(c.createEvent(u,s.query_))})})}function ow(s,e,t){return e.type==="value"||e.type==="child_removed"||(e.prevName=t.getPredecessorChildName(e.childName,e.snapshotNode,s.index_)),e}function aw(s,e,t){if(e.childName==null||t.childName==null)throw $i("Should only compare child_ events.");const n=new $(e.childName,e.snapshotNode),i=new $(t.childName,t.snapshotNode);return s.index_.compare(n,i)}/**
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
 */function sa(s,e){return{eventCache:s,serverCache:e}}function Ri(s,e,t,n){return sa(new Nn(e,t,n),s.serverCache)}function Nm(s,e,t,n){return sa(s.eventCache,new Nn(e,t,n))}function Cl(s){return s.eventCache.isFullyInitialized()?s.eventCache.getNode():null}function Dn(s){return s.serverCache.isFullyInitialized()?s.serverCache.getNode():null}/**
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
 */let Ka;const lw=()=>(Ka||(Ka=new Qe($v)),Ka);class he{static fromObject(e){let t=new he(null);return He(e,(n,i)=>{t=t.set(new ae(n),i)}),t}constructor(e,t=lw()){this.value=e,this.children=t}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(this.value!=null&&t(this.value))return{path:ne(),value:this.value};if(H(e))return null;{const n=Q(e),i=this.children.get(n);if(i!==null){const r=i.findRootMostMatchingPathAndValue(ue(e),t);return r!=null?{path:we(new ae(n),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(H(e))return this;{const t=Q(e),n=this.children.get(t);return n!==null?n.subtree(ue(e)):new he(null)}}set(e,t){if(H(e))return new he(t,this.children);{const n=Q(e),r=(this.children.get(n)||new he(null)).set(ue(e),t),o=this.children.insert(n,r);return new he(this.value,o)}}remove(e){if(H(e))return this.children.isEmpty()?new he(null):new he(null,this.children);{const t=Q(e),n=this.children.get(t);if(n){const i=n.remove(ue(e));let r;return i.isEmpty()?r=this.children.remove(t):r=this.children.insert(t,i),this.value===null&&r.isEmpty()?new he(null):new he(this.value,r)}else return this}}get(e){if(H(e))return this.value;{const t=Q(e),n=this.children.get(t);return n?n.get(ue(e)):null}}setTree(e,t){if(H(e))return t;{const n=Q(e),r=(this.children.get(n)||new he(null)).setTree(ue(e),t);let o;return r.isEmpty()?o=this.children.remove(n):o=this.children.insert(n,r),new he(this.value,o)}}fold(e){return this.fold_(ne(),e)}fold_(e,t){const n={};return this.children.inorderTraversal((i,r)=>{n[i]=r.fold_(we(e,i),t)}),t(e,this.value,n)}findOnPath(e,t){return this.findOnPath_(e,ne(),t)}findOnPath_(e,t,n){const i=this.value?n(t,this.value):!1;if(i)return i;if(H(e))return null;{const r=Q(e),o=this.children.get(r);return o?o.findOnPath_(ue(e),we(t,r),n):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,ne(),t)}foreachOnPath_(e,t,n){if(H(e))return this;{this.value&&n(t,this.value);const i=Q(e),r=this.children.get(i);return r?r.foreachOnPath_(ue(e),we(t,i),n):new he(null)}}foreach(e){this.foreach_(ne(),e)}foreach_(e,t){this.children.inorderTraversal((n,i)=>{i.foreach_(we(e,n),t)}),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal((t,n)=>{n.value&&e(t,n.value)})}}/**
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
 */class ut{constructor(e){this.writeTree_=e}static empty(){return new ut(new he(null))}}function Si(s,e,t){if(H(e))return new ut(new he(t));{const n=s.writeTree_.findRootMostValueAndPath(e);if(n!=null){const i=n.path;let r=n.value;const o=$e(i,e);return r=r.updateChild(o,t),new ut(s.writeTree_.set(i,r))}else{const i=new he(t),r=s.writeTree_.setTree(e,i);return new ut(r)}}}function Zd(s,e,t){let n=s;return He(t,(i,r)=>{n=Si(n,we(e,i),r)}),n}function ef(s,e){if(H(e))return ut.empty();{const t=s.writeTree_.setTree(e,new he(null));return new ut(t)}}function Pl(s,e){return Mn(s,e)!=null}function Mn(s,e){const t=s.writeTree_.findRootMostValueAndPath(e);return t!=null?s.writeTree_.get(t.path).getChild($e(t.path,e)):null}function tf(s){const e=[],t=s.writeTree_.value;return t!=null?t.isLeafNode()||t.forEachChild(ge,(n,i)=>{e.push(new $(n,i))}):s.writeTree_.children.inorderTraversal((n,i)=>{i.value!=null&&e.push(new $(n,i.value))}),e}function Kt(s,e){if(H(e))return s;{const t=Mn(s,e);return t!=null?new ut(new he(t)):new ut(s.writeTree_.subtree(e))}}function bl(s){return s.writeTree_.isEmpty()}function bs(s,e){return Dm(ne(),s.writeTree_,e)}function Dm(s,e,t){if(e.value!=null)return t.updateChild(s,e.value);{let n=null;return e.children.inorderTraversal((i,r)=>{i===".priority"?(k(r.value!==null,"Priority writes must always be leaf nodes"),n=r.value):t=Dm(we(s,i),r,t)}),!t.getChild(s).isEmpty()&&n!==null&&(t=t.updateChild(we(s,".priority"),n)),t}}/**
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
 */function Ku(s,e){return Fm(e,s)}function uw(s,e,t,n,i){k(n>s.lastWriteId,"Stacking an older write on top of newer ones"),i===void 0&&(i=!0),s.allWrites.push({path:e,snap:t,writeId:n,visible:i}),i&&(s.visibleWrites=Si(s.visibleWrites,e,t)),s.lastWriteId=n}function cw(s,e){for(let t=0;t<s.allWrites.length;t++){const n=s.allWrites[t];if(n.writeId===e)return n}return null}function hw(s,e){const t=s.allWrites.findIndex(l=>l.writeId===e);k(t>=0,"removeWrite called with nonexistent writeId.");const n=s.allWrites[t];s.allWrites.splice(t,1);let i=n.visible,r=!1,o=s.allWrites.length-1;for(;i&&o>=0;){const l=s.allWrites[o];l.visible&&(o>=t&&dw(l,n.path)?i=!1:at(n.path,l.path)&&(r=!0)),o--}if(i){if(r)return fw(s),!0;if(n.snap)s.visibleWrites=ef(s.visibleWrites,n.path);else{const l=n.children;He(l,u=>{s.visibleWrites=ef(s.visibleWrites,we(n.path,u))})}return!0}else return!1}function dw(s,e){if(s.snap)return at(s.path,e);for(const t in s.children)if(s.children.hasOwnProperty(t)&&at(we(s.path,t),e))return!0;return!1}function fw(s){s.visibleWrites=km(s.allWrites,_w,ne()),s.allWrites.length>0?s.lastWriteId=s.allWrites[s.allWrites.length-1].writeId:s.lastWriteId=-1}function _w(s){return s.visible}function km(s,e,t){let n=ut.empty();for(let i=0;i<s.length;++i){const r=s[i];if(e(r)){const o=r.path;let l;if(r.snap)at(t,o)?(l=$e(t,o),n=Si(n,l,r.snap)):at(o,t)&&(l=$e(o,t),n=Si(n,ne(),r.snap.getChild(l)));else if(r.children){if(at(t,o))l=$e(t,o),n=Zd(n,l,r.children);else if(at(o,t))if(l=$e(o,t),H(l))n=Zd(n,ne(),r.children);else{const u=ls(r.children,Q(l));if(u){const c=u.getChild(ue(l));n=Si(n,ne(),c)}}}else throw $i("WriteRecord should have .snap or .children")}}return n}function Om(s,e,t,n,i){if(!n&&!i){const r=Mn(s.visibleWrites,e);if(r!=null)return r;{const o=Kt(s.visibleWrites,e);if(bl(o))return t;if(t==null&&!Pl(o,ne()))return null;{const l=t||z.EMPTY_NODE;return bs(o,l)}}}else{const r=Kt(s.visibleWrites,e);if(!i&&bl(r))return t;if(!i&&t==null&&!Pl(r,ne()))return null;{const o=function(c){return(c.visible||i)&&(!n||!~n.indexOf(c.writeId))&&(at(c.path,e)||at(e,c.path))},l=km(s.allWrites,o,e),u=t||z.EMPTY_NODE;return bs(l,u)}}}function pw(s,e,t){let n=z.EMPTY_NODE;const i=Mn(s.visibleWrites,e);if(i)return i.isLeafNode()||i.forEachChild(ge,(r,o)=>{n=n.updateImmediateChild(r,o)}),n;if(t){const r=Kt(s.visibleWrites,e);return t.forEachChild(ge,(o,l)=>{const u=bs(Kt(r,new ae(o)),l);n=n.updateImmediateChild(o,u)}),tf(r).forEach(o=>{n=n.updateImmediateChild(o.name,o.node)}),n}else{const r=Kt(s.visibleWrites,e);return tf(r).forEach(o=>{n=n.updateImmediateChild(o.name,o.node)}),n}}function mw(s,e,t,n,i){k(n||i,"Either existingEventSnap or existingServerSnap must exist");const r=we(e,t);if(Pl(s.visibleWrites,r))return null;{const o=Kt(s.visibleWrites,r);return bl(o)?i.getChild(t):bs(o,i.getChild(t))}}function gw(s,e,t,n){const i=we(e,t),r=Mn(s.visibleWrites,i);if(r!=null)return r;if(n.isCompleteForChild(t)){const o=Kt(s.visibleWrites,i);return bs(o,n.getNode().getImmediateChild(t))}else return null}function yw(s,e){return Mn(s.visibleWrites,e)}function Ew(s,e,t,n,i,r,o){let l;const u=Kt(s.visibleWrites,e),c=Mn(u,ne());if(c!=null)l=c;else if(t!=null)l=bs(u,t);else return[];if(l=l.withIndex(o),!l.isEmpty()&&!l.isLeafNode()){const f=[],_=o.getCompare(),m=r?l.getReverseIteratorFrom(n,o):l.getIteratorFrom(n,o);let T=m.getNext();for(;T&&f.length<i;)_(T,n)!==0&&f.push(T),T=m.getNext();return f}else return[]}function Iw(){return{visibleWrites:ut.empty(),allWrites:[],lastWriteId:-1}}function Ro(s,e,t,n){return Om(s.writeTree,s.treePath,e,t,n)}function Wu(s,e){return pw(s.writeTree,s.treePath,e)}function nf(s,e,t,n){return mw(s.writeTree,s.treePath,e,t,n)}function So(s,e){return yw(s.writeTree,we(s.treePath,e))}function vw(s,e,t,n,i,r){return Ew(s.writeTree,s.treePath,e,t,n,i,r)}function $u(s,e,t){return gw(s.writeTree,s.treePath,e,t)}function Mm(s,e){return Fm(we(s.treePath,e),s.writeTree)}function Fm(s,e){return{treePath:s,writeTree:e}}/**
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
 */class Tw{constructor(){this.changeMap=new Map}trackChildChange(e){const t=e.type,n=e.childName;k(t==="child_added"||t==="child_changed"||t==="child_removed","Only child changes supported for tracking"),k(n!==".priority","Only non-priority child changes can be tracked.");const i=this.changeMap.get(n);if(i){const r=i.type;if(t==="child_added"&&r==="child_removed")this.changeMap.set(n,Gi(n,e.snapshotNode,i.snapshotNode));else if(t==="child_removed"&&r==="child_added")this.changeMap.delete(n);else if(t==="child_removed"&&r==="child_changed")this.changeMap.set(n,ji(n,i.oldSnap));else if(t==="child_changed"&&r==="child_added")this.changeMap.set(n,Ps(n,e.snapshotNode));else if(t==="child_changed"&&r==="child_changed")this.changeMap.set(n,Gi(n,e.snapshotNode,i.oldSnap));else throw $i("Illegal combination of changes: "+e+" occurred after "+i)}else this.changeMap.set(n,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
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
 */class ww{getCompleteChild(e){return null}getChildAfterChild(e,t,n){return null}}const Lm=new ww;class Qu{constructor(e,t,n=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=n}getCompleteChild(e){const t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{const n=this.optCompleteServerCache_!=null?new Nn(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return $u(this.writes_,e,n)}}getChildAfterChild(e,t,n){const i=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:Dn(this.viewCache_),r=vw(this.writes_,i,t,1,n,e);return r.length===0?null:r[0]}}/**
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
 */function Aw(s){return{filter:s}}function Rw(s,e){k(e.eventCache.getNode().isIndexed(s.filter.getIndex()),"Event snap not indexed"),k(e.serverCache.getNode().isIndexed(s.filter.getIndex()),"Server snap not indexed")}function Sw(s,e,t,n,i){const r=new Tw;let o,l;if(t.type===lt.OVERWRITE){const c=t;c.source.fromUser?o=Vl(s,e,c.path,c.snap,n,i,r):(k(c.source.fromServer,"Unknown source."),l=c.source.tagged||e.serverCache.isFiltered()&&!H(c.path),o=Co(s,e,c.path,c.snap,n,i,l,r))}else if(t.type===lt.MERGE){const c=t;c.source.fromUser?o=Pw(s,e,c.path,c.children,n,i,r):(k(c.source.fromServer,"Unknown source."),l=c.source.tagged||e.serverCache.isFiltered(),o=xl(s,e,c.path,c.children,n,i,l,r))}else if(t.type===lt.ACK_USER_WRITE){const c=t;c.revert?o=xw(s,e,c.path,n,i,r):o=bw(s,e,c.path,c.affectedTree,n,i,r)}else if(t.type===lt.LISTEN_COMPLETE)o=Vw(s,e,t.path,n,r);else throw $i("Unknown operation type: "+t.type);const u=r.getChanges();return Cw(e,o,u),{viewCache:o,changes:u}}function Cw(s,e,t){const n=e.eventCache;if(n.isFullyInitialized()){const i=n.getNode().isLeafNode()||n.getNode().isEmpty(),r=Cl(s);(t.length>0||!s.eventCache.isFullyInitialized()||i&&!n.getNode().equals(r)||!n.getNode().getPriority().equals(r.getPriority()))&&t.push(bm(Cl(e)))}}function Um(s,e,t,n,i,r){const o=e.eventCache;if(So(n,t)!=null)return e;{let l,u;if(H(t))if(k(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const c=Dn(e),f=c instanceof z?c:z.EMPTY_NODE,_=Wu(n,f);l=s.filter.updateFullNode(e.eventCache.getNode(),_,r)}else{const c=Ro(n,Dn(e));l=s.filter.updateFullNode(e.eventCache.getNode(),c,r)}else{const c=Q(t);if(c===".priority"){k(Xt(t)===1,"Can't have a priority with additional path components");const f=o.getNode();u=e.serverCache.getNode();const _=nf(n,t,f,u);_!=null?l=s.filter.updatePriority(f,_):l=o.getNode()}else{const f=ue(t);let _;if(o.isCompleteForChild(c)){u=e.serverCache.getNode();const m=nf(n,t,o.getNode(),u);m!=null?_=o.getNode().getImmediateChild(c).updateChild(f,m):_=o.getNode().getImmediateChild(c)}else _=$u(n,c,e.serverCache);_!=null?l=s.filter.updateChild(o.getNode(),c,_,f,i,r):l=o.getNode()}}return Ri(e,l,o.isFullyInitialized()||H(t),s.filter.filtersNodes())}}function Co(s,e,t,n,i,r,o,l){const u=e.serverCache;let c;const f=o?s.filter:s.filter.getIndexedFilter();if(H(t))c=f.updateFullNode(u.getNode(),n,null);else if(f.filtersNodes()&&!u.isFiltered()){const T=u.getNode().updateChild(t,n);c=f.updateFullNode(u.getNode(),T,null)}else{const T=Q(t);if(!u.isCompleteForPath(t)&&Xt(t)>1)return e;const C=ue(t),N=u.getNode().getImmediateChild(T).updateChild(C,n);T===".priority"?c=f.updatePriority(u.getNode(),N):c=f.updateChild(u.getNode(),T,N,C,Lm,null)}const _=Nm(e,c,u.isFullyInitialized()||H(t),f.filtersNodes()),m=new Qu(i,_,r);return Um(s,_,t,i,m,l)}function Vl(s,e,t,n,i,r,o){const l=e.eventCache;let u,c;const f=new Qu(i,e,r);if(H(t))c=s.filter.updateFullNode(e.eventCache.getNode(),n,o),u=Ri(e,c,!0,s.filter.filtersNodes());else{const _=Q(t);if(_===".priority")c=s.filter.updatePriority(e.eventCache.getNode(),n),u=Ri(e,c,l.isFullyInitialized(),l.isFiltered());else{const m=ue(t),T=l.getNode().getImmediateChild(_);let C;if(H(m))C=n;else{const V=f.getCompleteChild(_);V!=null?Im(m)===".priority"&&V.getChild(Tm(m)).isEmpty()?C=V:C=V.updateChild(m,n):C=z.EMPTY_NODE}if(T.equals(C))u=e;else{const V=s.filter.updateChild(l.getNode(),_,C,m,f,o);u=Ri(e,V,l.isFullyInitialized(),s.filter.filtersNodes())}}}return u}function sf(s,e){return s.eventCache.isCompleteForChild(e)}function Pw(s,e,t,n,i,r,o){let l=e;return n.foreach((u,c)=>{const f=we(t,u);sf(e,Q(f))&&(l=Vl(s,l,f,c,i,r,o))}),n.foreach((u,c)=>{const f=we(t,u);sf(e,Q(f))||(l=Vl(s,l,f,c,i,r,o))}),l}function rf(s,e,t){return t.foreach((n,i)=>{e=e.updateChild(n,i)}),e}function xl(s,e,t,n,i,r,o,l){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let u=e,c;H(t)?c=n:c=new he(null).setTree(t,n);const f=e.serverCache.getNode();return c.children.inorderTraversal((_,m)=>{if(f.hasChild(_)){const T=e.serverCache.getNode().getImmediateChild(_),C=rf(s,T,m);u=Co(s,u,new ae(_),C,i,r,o,l)}}),c.children.inorderTraversal((_,m)=>{const T=!e.serverCache.isCompleteForChild(_)&&m.value===null;if(!f.hasChild(_)&&!T){const C=e.serverCache.getNode().getImmediateChild(_),V=rf(s,C,m);u=Co(s,u,new ae(_),V,i,r,o,l)}}),u}function bw(s,e,t,n,i,r,o){if(So(i,t)!=null)return e;const l=e.serverCache.isFiltered(),u=e.serverCache;if(n.value!=null){if(H(t)&&u.isFullyInitialized()||u.isCompleteForPath(t))return Co(s,e,t,u.getNode().getChild(t),i,r,l,o);if(H(t)){let c=new he(null);return u.getNode().forEachChild(os,(f,_)=>{c=c.set(new ae(f),_)}),xl(s,e,t,c,i,r,l,o)}else return e}else{let c=new he(null);return n.foreach((f,_)=>{const m=we(t,f);u.isCompleteForPath(m)&&(c=c.set(f,u.getNode().getChild(m)))}),xl(s,e,t,c,i,r,l,o)}}function Vw(s,e,t,n,i){const r=e.serverCache,o=Nm(e,r.getNode(),r.isFullyInitialized()||H(t),r.isFiltered());return Um(s,o,t,n,Lm,i)}function xw(s,e,t,n,i,r){let o;if(So(n,t)!=null)return e;{const l=new Qu(n,e,i),u=e.eventCache.getNode();let c;if(H(t)||Q(t)===".priority"){let f;if(e.serverCache.isFullyInitialized())f=Ro(n,Dn(e));else{const _=e.serverCache.getNode();k(_ instanceof z,"serverChildren would be complete if leaf node"),f=Wu(n,_)}f=f,c=s.filter.updateFullNode(u,f,r)}else{const f=Q(t);let _=$u(n,f,e.serverCache);_==null&&e.serverCache.isCompleteForChild(f)&&(_=u.getImmediateChild(f)),_!=null?c=s.filter.updateChild(u,f,_,ue(t),l,r):e.eventCache.getNode().hasChild(f)?c=s.filter.updateChild(u,f,z.EMPTY_NODE,ue(t),l,r):c=u,c.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=Ro(n,Dn(e)),o.isLeafNode()&&(c=s.filter.updateFullNode(c,o,r)))}return o=e.serverCache.isFullyInitialized()||So(n,ne())!=null,Ri(e,c,o,s.filter.filtersNodes())}}/**
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
 */class Nw{constructor(e,t){this.query_=e,this.eventRegistrations_=[];const n=this.query_._queryParams,i=new qu(n.getIndex()),r=XT(n);this.processor_=Aw(r);const o=t.serverCache,l=t.eventCache,u=i.updateFullNode(z.EMPTY_NODE,o.getNode(),null),c=r.updateFullNode(z.EMPTY_NODE,l.getNode(),null),f=new Nn(u,o.isFullyInitialized(),i.filtersNodes()),_=new Nn(c,l.isFullyInitialized(),r.filtersNodes());this.viewCache_=sa(_,f),this.eventGenerator_=new iw(this.query_)}get query(){return this.query_}}function Dw(s){return s.viewCache_.serverCache.getNode()}function kw(s,e){const t=Dn(s.viewCache_);return t&&(s.query._queryParams.loadsAllData()||!H(e)&&!t.getImmediateChild(Q(e)).isEmpty())?t.getChild(e):null}function of(s){return s.eventRegistrations_.length===0}function Ow(s,e){s.eventRegistrations_.push(e)}function af(s,e,t){const n=[];if(t){k(e==null,"A cancel should cancel all event registrations.");const i=s.query._path;s.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(t,i);o&&n.push(o)})}if(e){let i=[];for(let r=0;r<s.eventRegistrations_.length;++r){const o=s.eventRegistrations_[r];if(!o.matches(e))i.push(o);else if(e.hasAnyCallback()){i=i.concat(s.eventRegistrations_.slice(r+1));break}}s.eventRegistrations_=i}else s.eventRegistrations_=[];return n}function lf(s,e,t,n){e.type===lt.MERGE&&e.source.queryId!==null&&(k(Dn(s.viewCache_),"We should always have a full cache before handling merges"),k(Cl(s.viewCache_),"Missing event cache, even though we have a server cache"));const i=s.viewCache_,r=Sw(s.processor_,i,e,t,n);return Rw(s.processor_,r.viewCache),k(r.viewCache.serverCache.isFullyInitialized()||!i.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),s.viewCache_=r.viewCache,Bm(s,r.changes,r.viewCache.eventCache.getNode(),null)}function Mw(s,e){const t=s.viewCache_.eventCache,n=[];return t.getNode().isLeafNode()||t.getNode().forEachChild(ge,(r,o)=>{n.push(Ps(r,o))}),t.isFullyInitialized()&&n.push(bm(t.getNode())),Bm(s,n,t.getNode(),e)}function Bm(s,e,t,n){const i=n?[n]:s.eventRegistrations_;return rw(s.eventGenerator_,e,t,i)}/**
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
 */let Po;class Fw{constructor(){this.views=new Map}}function Lw(s){k(!Po,"__referenceConstructor has already been defined"),Po=s}function Uw(){return k(Po,"Reference.ts has not been loaded"),Po}function Bw(s){return s.views.size===0}function Hu(s,e,t,n){const i=e.source.queryId;if(i!==null){const r=s.views.get(i);return k(r!=null,"SyncTree gave us an op for an invalid query."),lf(r,e,t,n)}else{let r=[];for(const o of s.views.values())r=r.concat(lf(o,e,t,n));return r}}function qw(s,e,t,n,i){const r=e._queryIdentifier,o=s.views.get(r);if(!o){let l=Ro(t,i?n:null),u=!1;l?u=!0:n instanceof z?(l=Wu(t,n),u=!1):(l=z.EMPTY_NODE,u=!1);const c=sa(new Nn(l,u,!1),new Nn(n,i,!1));return new Nw(e,c)}return o}function jw(s,e,t,n,i,r){const o=qw(s,e,n,i,r);return s.views.has(e._queryIdentifier)||s.views.set(e._queryIdentifier,o),Ow(o,t),Mw(o,t)}function Gw(s,e,t,n){const i=e._queryIdentifier,r=[];let o=[];const l=Jt(s);if(i==="default")for(const[u,c]of s.views.entries())o=o.concat(af(c,t,n)),of(c)&&(s.views.delete(u),c.query._queryParams.loadsAllData()||r.push(c.query));else{const u=s.views.get(i);u&&(o=o.concat(af(u,t,n)),of(u)&&(s.views.delete(i),u.query._queryParams.loadsAllData()||r.push(u.query)))}return l&&!Jt(s)&&r.push(new(Uw())(e._repo,e._path)),{removed:r,events:o}}function qm(s){const e=[];for(const t of s.views.values())t.query._queryParams.loadsAllData()||e.push(t);return e}function as(s,e){let t=null;for(const n of s.views.values())t=t||kw(n,e);return t}function jm(s,e){if(e._queryParams.loadsAllData())return ia(s);{const n=e._queryIdentifier;return s.views.get(n)}}function Gm(s,e){return jm(s,e)!=null}function Jt(s){return ia(s)!=null}function ia(s){for(const e of s.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
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
 */let bo;function zw(s){k(!bo,"__referenceConstructor has already been defined"),bo=s}function Kw(){return k(bo,"Reference.ts has not been loaded"),bo}let Ww=1;class uf{constructor(e){this.listenProvider_=e,this.syncPointTree_=new he(null),this.pendingWriteTree_=Iw(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function $w(s,e,t,n,i){return uw(s.pendingWriteTree_,e,t,n,i),i?ar(s,new xn(xm(),e,t)):[]}function ts(s,e,t=!1){const n=cw(s.pendingWriteTree_,e);if(hw(s.pendingWriteTree_,e)){let r=new he(null);return n.snap!=null?r=r.set(ne(),!0):He(n.children,o=>{r=r.set(new ae(o),!0)}),ar(s,new Ao(n.path,r,t))}else return[]}function ra(s,e,t){return ar(s,new xn(Gu(),e,t))}function Qw(s,e,t){const n=he.fromObject(t);return ar(s,new Wi(Gu(),e,n))}function Hw(s,e){return ar(s,new Ki(Gu(),e))}function Yw(s,e,t){const n=Yu(s,t);if(n){const i=Xu(n),r=i.path,o=i.queryId,l=$e(r,e),u=new Ki(zu(o),l);return Ju(s,r,u)}else return[]}function Nl(s,e,t,n,i=!1){const r=e._path,o=s.syncPointTree_.get(r);let l=[];if(o&&(e._queryIdentifier==="default"||Gm(o,e))){const u=Gw(o,e,t,n);Bw(o)&&(s.syncPointTree_=s.syncPointTree_.remove(r));const c=u.removed;if(l=u.events,!i){const f=c.findIndex(m=>m._queryParams.loadsAllData())!==-1,_=s.syncPointTree_.findOnPath(r,(m,T)=>Jt(T));if(f&&!_){const m=s.syncPointTree_.subtree(r);if(!m.isEmpty()){const T=Zw(m);for(let C=0;C<T.length;++C){const V=T[C],N=V.query,K=$m(s,V);s.listenProvider_.startListening(Ci(N),Vo(s,N),K.hashFn,K.onComplete)}}}!_&&c.length>0&&!n&&(f?s.listenProvider_.stopListening(Ci(e),null):c.forEach(m=>{const T=s.queryToTagMap.get(oa(m));s.listenProvider_.stopListening(Ci(m),T)}))}eA(s,c)}return l}function Xw(s,e,t,n){const i=Yu(s,n);if(i!=null){const r=Xu(i),o=r.path,l=r.queryId,u=$e(o,e),c=new xn(zu(l),u,t);return Ju(s,o,c)}else return[]}function Jw(s,e,t,n){const i=Yu(s,n);if(i){const r=Xu(i),o=r.path,l=r.queryId,u=$e(o,e),c=he.fromObject(t),f=new Wi(zu(l),u,c);return Ju(s,o,f)}else return[]}function cf(s,e,t,n=!1){const i=e._path;let r=null,o=!1;s.syncPointTree_.foreachOnPath(i,(m,T)=>{const C=$e(m,i);r=r||as(T,C),o=o||Jt(T)});let l=s.syncPointTree_.get(i);l?(o=o||Jt(l),r=r||as(l,ne())):(l=new Fw,s.syncPointTree_=s.syncPointTree_.set(i,l));let u;r!=null?u=!0:(u=!1,r=z.EMPTY_NODE,s.syncPointTree_.subtree(i).foreachChild((T,C)=>{const V=as(C,ne());V&&(r=r.updateImmediateChild(T,V))}));const c=Gm(l,e);if(!c&&!e._queryParams.loadsAllData()){const m=oa(e);k(!s.queryToTagMap.has(m),"View does not exist, but we have a tag");const T=tA();s.queryToTagMap.set(m,T),s.tagToQueryMap.set(T,m)}const f=Ku(s.pendingWriteTree_,i);let _=jw(l,e,t,f,r,u);if(!c&&!o&&!n){const m=jm(l,e);_=_.concat(nA(s,e,m))}return _}function zm(s,e,t){const i=s.pendingWriteTree_,r=s.syncPointTree_.findOnPath(e,(o,l)=>{const u=$e(o,e),c=as(l,u);if(c)return c});return Om(i,e,r,t,!0)}function ar(s,e){return Km(e,s.syncPointTree_,null,Ku(s.pendingWriteTree_,ne()))}function Km(s,e,t,n){if(H(s.path))return Wm(s,e,t,n);{const i=e.get(ne());t==null&&i!=null&&(t=as(i,ne()));let r=[];const o=Q(s.path),l=s.operationForChild(o),u=e.children.get(o);if(u&&l){const c=t?t.getImmediateChild(o):null,f=Mm(n,o);r=r.concat(Km(l,u,c,f))}return i&&(r=r.concat(Hu(i,s,n,t))),r}}function Wm(s,e,t,n){const i=e.get(ne());t==null&&i!=null&&(t=as(i,ne()));let r=[];return e.children.inorderTraversal((o,l)=>{const u=t?t.getImmediateChild(o):null,c=Mm(n,o),f=s.operationForChild(o);f&&(r=r.concat(Wm(f,l,u,c)))}),i&&(r=r.concat(Hu(i,s,n,t))),r}function $m(s,e){const t=e.query,n=Vo(s,t);return{hashFn:()=>(Dw(e)||z.EMPTY_NODE).hash(),onComplete:i=>{if(i==="ok")return n?Yw(s,t._path,n):Hw(s,t._path);{const r=Yv(i,t);return Nl(s,t,null,r)}}}}function Vo(s,e){const t=oa(e);return s.queryToTagMap.get(t)}function oa(s){return s._path.toString()+"$"+s._queryIdentifier}function Yu(s,e){return s.tagToQueryMap.get(e)}function Xu(s){const e=s.indexOf("$");return k(e!==-1&&e<s.length-1,"Bad queryKey."),{queryId:s.substr(e+1),path:new ae(s.substr(0,e))}}function Ju(s,e,t){const n=s.syncPointTree_.get(e);k(n,"Missing sync point for query tag that we're tracking");const i=Ku(s.pendingWriteTree_,e);return Hu(n,t,i,null)}function Zw(s){return s.fold((e,t,n)=>{if(t&&Jt(t))return[ia(t)];{let i=[];return t&&(i=qm(t)),He(n,(r,o)=>{i=i.concat(o)}),i}})}function Ci(s){return s._queryParams.loadsAllData()&&!s._queryParams.isDefault()?new(Kw())(s._repo,s._path):s}function eA(s,e){for(let t=0;t<e.length;++t){const n=e[t];if(!n._queryParams.loadsAllData()){const i=oa(n),r=s.queryToTagMap.get(i);s.queryToTagMap.delete(i),s.tagToQueryMap.delete(r)}}}function tA(){return Ww++}function nA(s,e,t){const n=e._path,i=Vo(s,e),r=$m(s,t),o=s.listenProvider_.startListening(Ci(e),i,r.hashFn,r.onComplete),l=s.syncPointTree_.subtree(n);if(i)k(!Jt(l.value),"If we're adding a query, it shouldn't be shadowed");else{const u=l.fold((c,f,_)=>{if(!H(c)&&f&&Jt(f))return[ia(f).query];{let m=[];return f&&(m=m.concat(qm(f).map(T=>T.query))),He(_,(T,C)=>{m=m.concat(C)}),m}});for(let c=0;c<u.length;++c){const f=u[c];s.listenProvider_.stopListening(Ci(f),Vo(s,f))}}return o}/**
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
 */class Zu{constructor(e){this.node_=e}getImmediateChild(e){const t=this.node_.getImmediateChild(e);return new Zu(t)}node(){return this.node_}}class ec{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){const t=we(this.path_,e);return new ec(this.syncTree_,t)}node(){return zm(this.syncTree_,this.path_)}}const sA=function(s){return s=s||{},s.timestamp=s.timestamp||new Date().getTime(),s},hf=function(s,e,t){if(!s||typeof s!="object")return s;if(k(".sv"in s,"Unexpected leaf node or priority contents"),typeof s[".sv"]=="string")return iA(s[".sv"],e,t);if(typeof s[".sv"]=="object")return rA(s[".sv"],e);k(!1,"Unexpected server value: "+JSON.stringify(s,null,2))},iA=function(s,e,t){switch(s){case"timestamp":return t.timestamp;default:k(!1,"Unexpected server value: "+s)}},rA=function(s,e,t){s.hasOwnProperty("increment")||k(!1,"Unexpected server value: "+JSON.stringify(s,null,2));const n=s.increment;typeof n!="number"&&k(!1,"Unexpected increment value: "+n);const i=e.node();if(k(i!==null&&typeof i<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!i.isLeafNode())return n;const o=i.getValue();return typeof o!="number"?n:o+n},oA=function(s,e,t,n){return tc(e,new ec(t,s),n)},aA=function(s,e,t){return tc(s,new Zu(e),t)};function tc(s,e,t){const n=s.getPriority().val(),i=hf(n,e.getImmediateChild(".priority"),t);let r;if(s.isLeafNode()){const o=s,l=hf(o.getValue(),e,t);return l!==o.getValue()||i!==o.getPriority().val()?new Re(l,Le(i)):s}else{const o=s;return r=o,i!==o.getPriority().val()&&(r=r.updatePriority(new Re(i))),o.forEachChild(ge,(l,u)=>{const c=tc(u,e.getImmediateChild(l),t);c!==u&&(r=r.updateImmediateChild(l,c))}),r}}/**
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
 */class nc{constructor(e="",t=null,n={children:{},childCount:0}){this.name=e,this.parent=t,this.node=n}}function sc(s,e){let t=e instanceof ae?e:new ae(e),n=s,i=Q(t);for(;i!==null;){const r=ls(n.node.children,i)||{children:{},childCount:0};n=new nc(i,n,r),t=ue(t),i=Q(t)}return n}function Fs(s){return s.node.value}function Qm(s,e){s.node.value=e,Dl(s)}function Hm(s){return s.node.childCount>0}function lA(s){return Fs(s)===void 0&&!Hm(s)}function aa(s,e){He(s.node.children,(t,n)=>{e(new nc(t,s,n))})}function Ym(s,e,t,n){t&&e(s),aa(s,i=>{Ym(i,e,!0)})}function uA(s,e,t){let n=s.parent;for(;n!==null;){if(e(n))return!0;n=n.parent}return!1}function lr(s){return new ae(s.parent===null?s.name:lr(s.parent)+"/"+s.name)}function Dl(s){s.parent!==null&&cA(s.parent,s.name,s)}function cA(s,e,t){const n=lA(t),i=bt(s.node.children,e);n&&i?(delete s.node.children[e],s.node.childCount--,Dl(s)):!n&&!i&&(s.node.children[e]=t.node,s.node.childCount++,Dl(s))}/**
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
 */const hA=/[\[\].#$\/\u0000-\u001F\u007F]/,dA=/[\[\].#$\u0000-\u001F\u007F]/,Wa=10*1024*1024,Xm=function(s){return typeof s=="string"&&s.length!==0&&!hA.test(s)},Jm=function(s){return typeof s=="string"&&s.length!==0&&!dA.test(s)},fA=function(s){return s&&(s=s.replace(/^\/*\.info(\/|$)/,"/")),Jm(s)},Zm=function(s,e,t){const n=t instanceof ae?new bT(t,s):t;if(e===void 0)throw new Error(s+"contains undefined "+dn(n));if(typeof e=="function")throw new Error(s+"contains a function "+dn(n)+" with contents = "+e.toString());if(Zp(e))throw new Error(s+"contains "+e.toString()+" "+dn(n));if(typeof e=="string"&&e.length>Wa/3&&Do(e)>Wa)throw new Error(s+"contains a string greater than "+Wa+" utf8 bytes "+dn(n)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let i=!1,r=!1;if(He(e,(o,l)=>{if(o===".value")i=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!Xm(o)))throw new Error(s+" contains an invalid key ("+o+") "+dn(n)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);VT(n,o),Zm(s,l,n),xT(n)}),i&&r)throw new Error(s+' contains ".value" child '+dn(n)+" in addition to actual children.")}},eg=function(s,e,t,n){if(!Jm(t))throw new Error(Rf(s,e)+'was an invalid path = "'+t+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},_A=function(s,e,t,n){t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),eg(s,e,t)},pA=function(s,e){const t=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!Xm(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||t.length!==0&&!fA(t))throw new Error(Rf(s,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
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
 */class mA{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function tg(s,e){let t=null;for(let n=0;n<e.length;n++){const i=e[n],r=i.getPath();t!==null&&!Lu(r,t.path)&&(s.eventLists_.push(t),t=null),t===null&&(t={events:[],path:r}),t.events.push(i)}t&&s.eventLists_.push(t)}function ng(s,e,t){tg(s,t),sg(s,n=>Lu(n,e))}function Fn(s,e,t){tg(s,t),sg(s,n=>at(n,e)||at(e,n))}function sg(s,e){s.recursionDepth_++;let t=!0;for(let n=0;n<s.eventLists_.length;n++){const i=s.eventLists_[n];if(i){const r=i.path;e(r)?(gA(s.eventLists_[n]),s.eventLists_[n]=null):t=!1}}t&&(s.eventLists_=[]),s.recursionDepth_--}function gA(s){for(let e=0;e<s.events.length;e++){const t=s.events[e];if(t!==null){s.events[e]=null;const n=t.getEventRunner();wi&&Fe("event: "+t.toString()),rr(n)}}}/**
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
 */const yA="repo_interrupt",EA=25;class IA{constructor(e,t,n,i){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=n,this.appCheckProvider_=i,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new mA,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=wo(),this.transactionQueueTree_=new nc,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function vA(s,e,t){if(s.stats_=Mu(s.repoInfo_),s.forceRestClient_||eT())s.server_=new To(s.repoInfo_,(n,i,r,o)=>{df(s,n,i,r,o)},s.authTokenProvider_,s.appCheckProvider_),setTimeout(()=>ff(s,!0),0);else{if(typeof t<"u"&&t!==null){if(typeof t!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{Pe(t)}catch(n){throw new Error("Invalid authOverride provided: "+n)}}s.persistentConnection_=new Rt(s.repoInfo_,e,(n,i,r,o)=>{df(s,n,i,r,o)},n=>{ff(s,n)},n=>{wA(s,n)},s.authTokenProvider_,s.appCheckProvider_,t),s.server_=s.persistentConnection_}s.authTokenProvider_.addTokenChangeListener(n=>{s.server_.refreshAuthToken(n)}),s.appCheckProvider_.addTokenChangeListener(n=>{s.server_.refreshAppCheckToken(n.token)}),s.statsReporter_=rT(s.repoInfo_,()=>new sw(s.stats_,s.server_)),s.infoData_=new JT,s.infoSyncTree_=new uf({startListening:(n,i,r,o)=>{let l=[];const u=s.infoData_.getNode(n._path);return u.isEmpty()||(l=ra(s.infoSyncTree_,n._path,u),setTimeout(()=>{o("ok")},0)),l},stopListening:()=>{}}),ic(s,"connected",!1),s.serverSyncTree_=new uf({startListening:(n,i,r,o)=>(s.server_.listen(n,r,i,(l,u)=>{const c=o(l,u);Fn(s.eventQueue_,n._path,c)}),[]),stopListening:(n,i)=>{s.server_.unlisten(n,i)}})}function TA(s){const t=s.infoData_.getNode(new ae(".info/serverTimeOffset")).val()||0;return new Date().getTime()+t}function ig(s){return sA({timestamp:TA(s)})}function df(s,e,t,n,i){s.dataUpdateCount++;const r=new ae(e);t=s.interceptServerDataCallback_?s.interceptServerDataCallback_(e,t):t;let o=[];if(i)if(n){const u=Zr(t,c=>Le(c));o=Jw(s.serverSyncTree_,r,u,i)}else{const u=Le(t);o=Xw(s.serverSyncTree_,r,u,i)}else if(n){const u=Zr(t,c=>Le(c));o=Qw(s.serverSyncTree_,r,u)}else{const u=Le(t);o=ra(s.serverSyncTree_,r,u)}let l=r;o.length>0&&(l=oc(s,r)),Fn(s.eventQueue_,l,o)}function ff(s,e){ic(s,"connected",e),e===!1&&RA(s)}function wA(s,e){He(e,(t,n)=>{ic(s,t,n)})}function ic(s,e,t){const n=new ae("/.info/"+e),i=Le(t);s.infoData_.updateSnapshot(n,i);const r=ra(s.infoSyncTree_,n,i);Fn(s.eventQueue_,n,r)}function AA(s){return s.nextWriteId_++}function RA(s){rg(s,"onDisconnectEvents");const e=ig(s),t=wo();Sl(s.onDisconnect_,ne(),(i,r)=>{const o=oA(i,r,s.serverSyncTree_,e);Vm(t,i,o)});let n=[];Sl(t,ne(),(i,r)=>{n=n.concat(ra(s.serverSyncTree_,i,r));const o=xA(s,i);oc(s,o)}),s.onDisconnect_=wo(),Fn(s.eventQueue_,ne(),n)}function SA(s,e,t){let n;Q(e._path)===".info"?n=cf(s.infoSyncTree_,e,t):n=cf(s.serverSyncTree_,e,t),ng(s.eventQueue_,e._path,n)}function CA(s,e,t){let n;Q(e._path)===".info"?n=Nl(s.infoSyncTree_,e,t):n=Nl(s.serverSyncTree_,e,t),ng(s.eventQueue_,e._path,n)}function PA(s){s.persistentConnection_&&s.persistentConnection_.interrupt(yA)}function rg(s,...e){let t="";s.persistentConnection_&&(t=s.persistentConnection_.id+":"),Fe(t,...e)}function og(s,e,t){return zm(s.serverSyncTree_,e,t)||z.EMPTY_NODE}function rc(s,e=s.transactionQueueTree_){if(e||la(s,e),Fs(e)){const t=lg(s,e);k(t.length>0,"Sending zero length transaction queue"),t.every(i=>i.status===0)&&bA(s,lr(e),t)}else Hm(e)&&aa(e,t=>{rc(s,t)})}function bA(s,e,t){const n=t.map(c=>c.currentWriteId),i=og(s,e,n);let r=i;const o=i.hash();for(let c=0;c<t.length;c++){const f=t[c];k(f.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),f.status=1,f.retryCount++;const _=$e(e,f.path);r=r.updateChild(_,f.currentOutputSnapshotRaw)}const l=r.val(!0),u=e;s.server_.put(u.toString(),l,c=>{rg(s,"transaction put response",{path:u.toString(),status:c});let f=[];if(c==="ok"){const _=[];for(let m=0;m<t.length;m++)t[m].status=2,f=f.concat(ts(s.serverSyncTree_,t[m].currentWriteId)),t[m].onComplete&&_.push(()=>t[m].onComplete(null,!0,t[m].currentOutputSnapshotResolved)),t[m].unwatcher();la(s,sc(s.transactionQueueTree_,e)),rc(s,s.transactionQueueTree_),Fn(s.eventQueue_,e,f);for(let m=0;m<_.length;m++)rr(_[m])}else{if(c==="datastale")for(let _=0;_<t.length;_++)t[_].status===3?t[_].status=4:t[_].status=0;else{et("transaction at "+u.toString()+" failed: "+c);for(let _=0;_<t.length;_++)t[_].status=4,t[_].abortReason=c}oc(s,e)}},o)}function oc(s,e){const t=ag(s,e),n=lr(t),i=lg(s,t);return VA(s,i,n),n}function VA(s,e,t){if(e.length===0)return;const n=[];let i=[];const o=e.filter(l=>l.status===0).map(l=>l.currentWriteId);for(let l=0;l<e.length;l++){const u=e[l],c=$e(t,u.path);let f=!1,_;if(k(c!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),u.status===4)f=!0,_=u.abortReason,i=i.concat(ts(s.serverSyncTree_,u.currentWriteId,!0));else if(u.status===0)if(u.retryCount>=EA)f=!0,_="maxretry",i=i.concat(ts(s.serverSyncTree_,u.currentWriteId,!0));else{const m=og(s,u.path,o);u.currentInputSnapshot=m;const T=e[l].update(m.val());if(T!==void 0){Zm("transaction failed: Data returned ",T,u.path);let C=Le(T);typeof T=="object"&&T!=null&&bt(T,".priority")||(C=C.updatePriority(m.getPriority()));const N=u.currentWriteId,K=ig(s),j=aA(C,m,K);u.currentOutputSnapshotRaw=C,u.currentOutputSnapshotResolved=j,u.currentWriteId=AA(s),o.splice(o.indexOf(N),1),i=i.concat($w(s.serverSyncTree_,u.path,j,u.currentWriteId,u.applyLocally)),i=i.concat(ts(s.serverSyncTree_,N,!0))}else f=!0,_="nodata",i=i.concat(ts(s.serverSyncTree_,u.currentWriteId,!0))}Fn(s.eventQueue_,t,i),i=[],f&&(e[l].status=2,function(m){setTimeout(m,Math.floor(0))}(e[l].unwatcher),e[l].onComplete&&(_==="nodata"?n.push(()=>e[l].onComplete(null,!1,e[l].currentInputSnapshot)):n.push(()=>e[l].onComplete(new Error(_),!1,null))))}la(s,s.transactionQueueTree_);for(let l=0;l<n.length;l++)rr(n[l]);rc(s,s.transactionQueueTree_)}function ag(s,e){let t,n=s.transactionQueueTree_;for(t=Q(e);t!==null&&Fs(n)===void 0;)n=sc(n,t),e=ue(e),t=Q(e);return n}function lg(s,e){const t=[];return ug(s,e,t),t.sort((n,i)=>n.order-i.order),t}function ug(s,e,t){const n=Fs(e);if(n)for(let i=0;i<n.length;i++)t.push(n[i]);aa(e,i=>{ug(s,i,t)})}function la(s,e){const t=Fs(e);if(t){let n=0;for(let i=0;i<t.length;i++)t[i].status!==2&&(t[n]=t[i],n++);t.length=n,Qm(e,t.length>0?t:void 0)}aa(e,n=>{la(s,n)})}function xA(s,e){const t=lr(ag(s,e)),n=sc(s.transactionQueueTree_,e);return uA(n,i=>{$a(s,i)}),$a(s,n),Ym(n,i=>{$a(s,i)}),t}function $a(s,e){const t=Fs(e);if(t){const n=[];let i=[],r=-1;for(let o=0;o<t.length;o++)t[o].status===3||(t[o].status===1?(k(r===o-1,"All SENT items should be at beginning of queue."),r=o,t[o].status=3,t[o].abortReason="set"):(k(t[o].status===0,"Unexpected transaction status in abort"),t[o].unwatcher(),i=i.concat(ts(s.serverSyncTree_,t[o].currentWriteId,!0)),t[o].onComplete&&n.push(t[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?Qm(e,void 0):t.length=r+1,Fn(s.eventQueue_,lr(e),i);for(let o=0;o<n.length;o++)rr(n[o])}}/**
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
 */function NA(s){let e="";const t=s.split("/");for(let n=0;n<t.length;n++)if(t[n].length>0){let i=t[n];try{i=decodeURIComponent(i.replace(/\+/g," "))}catch{}e+="/"+i}return e}function DA(s){const e={};s.charAt(0)==="?"&&(s=s.substring(1));for(const t of s.split("&")){if(t.length===0)continue;const n=t.split("=");n.length===2?e[decodeURIComponent(n[0])]=decodeURIComponent(n[1]):et(`Invalid query segment '${t}' in query '${s}'`)}return e}const _f=function(s,e){const t=kA(s),n=t.namespace;t.domain==="firebase.com"&&Pt(t.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!n||n==="undefined")&&t.domain!=="localhost"&&Pt("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),t.secure||Kv();const i=t.scheme==="ws"||t.scheme==="wss";return{repoInfo:new hm(t.host,t.secure,n,i,e,"",n!==t.subdomain),path:new ae(t.pathString)}},kA=function(s){let e="",t="",n="",i="",r="",o=!0,l="https",u=443;if(typeof s=="string"){let c=s.indexOf("//");c>=0&&(l=s.substring(0,c-1),s=s.substring(c+2));let f=s.indexOf("/");f===-1&&(f=s.length);let _=s.indexOf("?");_===-1&&(_=s.length),e=s.substring(0,Math.min(f,_)),f<_&&(i=NA(s.substring(f,_)));const m=DA(s.substring(Math.min(s.length,_)));c=e.indexOf(":"),c>=0?(o=l==="https"||l==="wss",u=parseInt(e.substring(c+1),10)):c=e.length;const T=e.slice(0,c);if(T.toLowerCase()==="localhost")t="localhost";else if(T.split(".").length<=2)t=T;else{const C=e.indexOf(".");n=e.substring(0,C).toLowerCase(),t=e.substring(C+1),r=n}"ns"in m&&(r=m.ns)}return{host:e,port:u,domain:t,subdomain:n,secure:o,scheme:l,pathString:i,namespace:r}};/**
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
 */class OA{constructor(e,t,n,i){this.eventType=e,this.eventRegistration=t,this.snapshot=n,this.prevName=i}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+Pe(this.snapshot.exportVal())}}class MA{constructor(e,t,n){this.eventRegistration=e,this.error=t,this.path=n}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
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
 */class FA{constructor(e,t){this.snapshotCallback=e,this.cancelCallback=t}onValue(e,t){this.snapshotCallback.call(null,e,t)}onCancel(e){return k(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
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
 */class ac{constructor(e,t,n,i){this._repo=e,this._path=t,this._queryParams=n,this._orderByCalled=i}get key(){return H(this._path)?null:Im(this._path)}get ref(){return new sn(this._repo,this._path)}get _queryIdentifier(){const e=Xd(this._queryParams),t=ku(e);return t==="{}"?"default":t}get _queryObject(){return Xd(this._queryParams)}isEqual(e){if(e=tt(e),!(e instanceof ac))return!1;const t=this._repo===e._repo,n=Lu(this._path,e._path),i=this._queryIdentifier===e._queryIdentifier;return t&&n&&i}toJSON(){return this.toString()}toString(){return this._repo.toString()+PT(this._path)}}class sn extends ac{constructor(e,t){super(e,t,new ju,!1)}get parent(){const e=Tm(this._path);return e===null?null:new sn(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class xo{constructor(e,t,n){this._node=e,this.ref=t,this._index=n}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const t=new ae(e),n=kl(this.ref,e);return new xo(this._node.getChild(t),n,ge)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(n,i)=>e(new xo(i,kl(this.ref,n),ge)))}hasChild(e){const t=new ae(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function lR(s,e){return s=tt(s),s._checkNotDeleted("ref"),e!==void 0?kl(s._root,e):s._root}function kl(s,e){return s=tt(s),Q(s._path)===null?_A("child","path",e):eg("child","path",e),new sn(s._repo,we(s._path,e))}class lc{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,t){const n=t._queryParams.getIndex();return new OA("value",this,new xo(e.snapshotNode,new sn(t._repo,t._path),n))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new MA(this,e,t):null}matches(e){return e instanceof lc?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}function LA(s,e,t,n,i){const r=new FA(t,void 0),o=new lc(r);return SA(s._repo,s,o),()=>CA(s._repo,s,o)}function uR(s,e,t,n){return LA(s,"value",e)}Lw(sn);zw(sn);/**
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
 */const UA="FIREBASE_DATABASE_EMULATOR_HOST",Ol={};let BA=!1;function qA(s,e,t,n){const i=e.lastIndexOf(":"),r=e.substring(0,i),o=No(r);s.repoInfo_=new hm(e,o,s.repoInfo_.namespace,s.repoInfo_.webSocketOnly,s.repoInfo_.nodeAdmin,s.repoInfo_.persistenceKey,s.repoInfo_.includeNamespaceInQueryParams,!0,t),n&&(s.authTokenProvider_=n)}function jA(s,e,t,n,i){let r=n||s.options.databaseURL;r===void 0&&(s.options.projectId||Pt("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),Fe("Using default host for project ",s.options.projectId),r=`${s.options.projectId}-default-rtdb.firebaseio.com`);let o=_f(r,i),l=o.repoInfo,u;typeof process<"u"&&Dd&&(u=Dd[UA]),u?(r=`http://${u}?ns=${l.namespace}`,o=_f(r,i),l=o.repoInfo):o.repoInfo.secure;const c=new nT(s.name,s.options,e);pA("Invalid Firebase Database URL",o),H(o.path)||Pt("Database URL must point to the root of a Firebase Database (not including a child path).");const f=zA(l,s,c,new tT(s,t));return new KA(f,s)}function GA(s,e){const t=Ol[e];(!t||t[s.key]!==s)&&Pt(`Database ${e}(${s.repoInfo_}) has already been deleted.`),PA(s),delete t[s.key]}function zA(s,e,t,n){let i=Ol[e.name];i||(i={},Ol[e.name]=i);let r=i[s.toURLString()];return r&&Pt("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new IA(s,BA,t,n),i[s.toURLString()]=r,r}class KA{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(vA(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new sn(this._repo,ne())),this._rootInternal}_delete(){return this._rootInternal!==null&&(GA(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&Pt("Cannot call "+e+" on a deleted database.")}}function cR(s=ry(),e){const t=Ef(s,"database").getImmediate({identifier:e});if(!t._instanceStarted){const n=iy("database");n&&WA(t,...n)}return t}function WA(s,e,t,n={}){s=tt(s),s._checkNotDeleted("useEmulator");const i=`${e}:${t}`,r=s._repoInternal;if(s._instanceStarted){if(i===s._repoInternal.repoInfo_.host&&If(n,r.repoInfo_.emulatorOptions))return;Pt("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(r.repoInfo_.nodeAdmin)n.mockUserToken&&Pt('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new Yr(Yr.OWNER);else if(n.mockUserToken){const l=typeof n.mockUserToken=="string"?n.mockUserToken:oy(n.mockUserToken,s.app.options.projectId);o=new Yr(l)}No(e)&&(vf(e),ay("Database",!0)),qA(r,i,n,o)}/**
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
 */function $A(s){Uv(Af),mf(new gf("database",(e,{instanceIdentifier:t})=>{const n=e.getProvider("app").getImmediate(),i=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return jA(n,i,r,t)},"PUBLIC").setMultipleInstances(!0)),Xr(kd,Od,s),Xr(kd,Od,"esm2017")}Rt.prototype.simpleListen=function(s,e){this.sendRequest("q",{p:s},e)};Rt.prototype.echo=function(s,e){this.sendRequest("echo",{d:s},e)};$A();export{oR as a,aR as b,iR as c,vv as d,XA as e,eR as f,cR as g,tR as h,JA as i,uR as o,rR as p,ZA as q,lR as r,nR as s,sR as u};
