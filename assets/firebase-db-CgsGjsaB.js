import{L as Xd,_ as Jd,C as Zd,r as Ur,a as ef,F as Rg,b as dt,c as tf,d as nf,i as Ao,p as sf,e as rf,g as Br,f as Cg,h as Sg,j as of,k as ut,S as af,l as D,s as Se,m as Al,n as Ct,o as ns,q as qr,t as Pg,u as bg,v as xg,w as Fi,x as lf,D as uf,y as Ng,z as Vg,A as Dg,B as Qc,E as cf,G as kg,H as Og,I as Ro,J as Mg,K as Fg,M as Lg,N as Ug,O as Bg,P as qg}from"./firebase-core-CsWAQJdo.js";var Hc=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Lt,hf;(function(){var s;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(I,g){function E(){}E.prototype=g.prototype,I.D=g.prototype,I.prototype=new E,I.prototype.constructor=I,I.C=function(T,w,C){for(var y=Array(arguments.length-2),mt=2;mt<arguments.length;mt++)y[mt-2]=arguments[mt];return g.prototype[w].apply(T,y)}}function t(){this.blockSize=-1}function n(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(n,t),n.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function i(I,g,E){E||(E=0);var T=Array(16);if(typeof g=="string")for(var w=0;16>w;++w)T[w]=g.charCodeAt(E++)|g.charCodeAt(E++)<<8|g.charCodeAt(E++)<<16|g.charCodeAt(E++)<<24;else for(w=0;16>w;++w)T[w]=g[E++]|g[E++]<<8|g[E++]<<16|g[E++]<<24;g=I.g[0],E=I.g[1],w=I.g[2];var C=I.g[3],y=g+(C^E&(w^C))+T[0]+3614090360&4294967295;g=E+(y<<7&4294967295|y>>>25),y=C+(w^g&(E^w))+T[1]+3905402710&4294967295,C=g+(y<<12&4294967295|y>>>20),y=w+(E^C&(g^E))+T[2]+606105819&4294967295,w=C+(y<<17&4294967295|y>>>15),y=E+(g^w&(C^g))+T[3]+3250441966&4294967295,E=w+(y<<22&4294967295|y>>>10),y=g+(C^E&(w^C))+T[4]+4118548399&4294967295,g=E+(y<<7&4294967295|y>>>25),y=C+(w^g&(E^w))+T[5]+1200080426&4294967295,C=g+(y<<12&4294967295|y>>>20),y=w+(E^C&(g^E))+T[6]+2821735955&4294967295,w=C+(y<<17&4294967295|y>>>15),y=E+(g^w&(C^g))+T[7]+4249261313&4294967295,E=w+(y<<22&4294967295|y>>>10),y=g+(C^E&(w^C))+T[8]+1770035416&4294967295,g=E+(y<<7&4294967295|y>>>25),y=C+(w^g&(E^w))+T[9]+2336552879&4294967295,C=g+(y<<12&4294967295|y>>>20),y=w+(E^C&(g^E))+T[10]+4294925233&4294967295,w=C+(y<<17&4294967295|y>>>15),y=E+(g^w&(C^g))+T[11]+2304563134&4294967295,E=w+(y<<22&4294967295|y>>>10),y=g+(C^E&(w^C))+T[12]+1804603682&4294967295,g=E+(y<<7&4294967295|y>>>25),y=C+(w^g&(E^w))+T[13]+4254626195&4294967295,C=g+(y<<12&4294967295|y>>>20),y=w+(E^C&(g^E))+T[14]+2792965006&4294967295,w=C+(y<<17&4294967295|y>>>15),y=E+(g^w&(C^g))+T[15]+1236535329&4294967295,E=w+(y<<22&4294967295|y>>>10),y=g+(w^C&(E^w))+T[1]+4129170786&4294967295,g=E+(y<<5&4294967295|y>>>27),y=C+(E^w&(g^E))+T[6]+3225465664&4294967295,C=g+(y<<9&4294967295|y>>>23),y=w+(g^E&(C^g))+T[11]+643717713&4294967295,w=C+(y<<14&4294967295|y>>>18),y=E+(C^g&(w^C))+T[0]+3921069994&4294967295,E=w+(y<<20&4294967295|y>>>12),y=g+(w^C&(E^w))+T[5]+3593408605&4294967295,g=E+(y<<5&4294967295|y>>>27),y=C+(E^w&(g^E))+T[10]+38016083&4294967295,C=g+(y<<9&4294967295|y>>>23),y=w+(g^E&(C^g))+T[15]+3634488961&4294967295,w=C+(y<<14&4294967295|y>>>18),y=E+(C^g&(w^C))+T[4]+3889429448&4294967295,E=w+(y<<20&4294967295|y>>>12),y=g+(w^C&(E^w))+T[9]+568446438&4294967295,g=E+(y<<5&4294967295|y>>>27),y=C+(E^w&(g^E))+T[14]+3275163606&4294967295,C=g+(y<<9&4294967295|y>>>23),y=w+(g^E&(C^g))+T[3]+4107603335&4294967295,w=C+(y<<14&4294967295|y>>>18),y=E+(C^g&(w^C))+T[8]+1163531501&4294967295,E=w+(y<<20&4294967295|y>>>12),y=g+(w^C&(E^w))+T[13]+2850285829&4294967295,g=E+(y<<5&4294967295|y>>>27),y=C+(E^w&(g^E))+T[2]+4243563512&4294967295,C=g+(y<<9&4294967295|y>>>23),y=w+(g^E&(C^g))+T[7]+1735328473&4294967295,w=C+(y<<14&4294967295|y>>>18),y=E+(C^g&(w^C))+T[12]+2368359562&4294967295,E=w+(y<<20&4294967295|y>>>12),y=g+(E^w^C)+T[5]+4294588738&4294967295,g=E+(y<<4&4294967295|y>>>28),y=C+(g^E^w)+T[8]+2272392833&4294967295,C=g+(y<<11&4294967295|y>>>21),y=w+(C^g^E)+T[11]+1839030562&4294967295,w=C+(y<<16&4294967295|y>>>16),y=E+(w^C^g)+T[14]+4259657740&4294967295,E=w+(y<<23&4294967295|y>>>9),y=g+(E^w^C)+T[1]+2763975236&4294967295,g=E+(y<<4&4294967295|y>>>28),y=C+(g^E^w)+T[4]+1272893353&4294967295,C=g+(y<<11&4294967295|y>>>21),y=w+(C^g^E)+T[7]+4139469664&4294967295,w=C+(y<<16&4294967295|y>>>16),y=E+(w^C^g)+T[10]+3200236656&4294967295,E=w+(y<<23&4294967295|y>>>9),y=g+(E^w^C)+T[13]+681279174&4294967295,g=E+(y<<4&4294967295|y>>>28),y=C+(g^E^w)+T[0]+3936430074&4294967295,C=g+(y<<11&4294967295|y>>>21),y=w+(C^g^E)+T[3]+3572445317&4294967295,w=C+(y<<16&4294967295|y>>>16),y=E+(w^C^g)+T[6]+76029189&4294967295,E=w+(y<<23&4294967295|y>>>9),y=g+(E^w^C)+T[9]+3654602809&4294967295,g=E+(y<<4&4294967295|y>>>28),y=C+(g^E^w)+T[12]+3873151461&4294967295,C=g+(y<<11&4294967295|y>>>21),y=w+(C^g^E)+T[15]+530742520&4294967295,w=C+(y<<16&4294967295|y>>>16),y=E+(w^C^g)+T[2]+3299628645&4294967295,E=w+(y<<23&4294967295|y>>>9),y=g+(w^(E|~C))+T[0]+4096336452&4294967295,g=E+(y<<6&4294967295|y>>>26),y=C+(E^(g|~w))+T[7]+1126891415&4294967295,C=g+(y<<10&4294967295|y>>>22),y=w+(g^(C|~E))+T[14]+2878612391&4294967295,w=C+(y<<15&4294967295|y>>>17),y=E+(C^(w|~g))+T[5]+4237533241&4294967295,E=w+(y<<21&4294967295|y>>>11),y=g+(w^(E|~C))+T[12]+1700485571&4294967295,g=E+(y<<6&4294967295|y>>>26),y=C+(E^(g|~w))+T[3]+2399980690&4294967295,C=g+(y<<10&4294967295|y>>>22),y=w+(g^(C|~E))+T[10]+4293915773&4294967295,w=C+(y<<15&4294967295|y>>>17),y=E+(C^(w|~g))+T[1]+2240044497&4294967295,E=w+(y<<21&4294967295|y>>>11),y=g+(w^(E|~C))+T[8]+1873313359&4294967295,g=E+(y<<6&4294967295|y>>>26),y=C+(E^(g|~w))+T[15]+4264355552&4294967295,C=g+(y<<10&4294967295|y>>>22),y=w+(g^(C|~E))+T[6]+2734768916&4294967295,w=C+(y<<15&4294967295|y>>>17),y=E+(C^(w|~g))+T[13]+1309151649&4294967295,E=w+(y<<21&4294967295|y>>>11),y=g+(w^(E|~C))+T[4]+4149444226&4294967295,g=E+(y<<6&4294967295|y>>>26),y=C+(E^(g|~w))+T[11]+3174756917&4294967295,C=g+(y<<10&4294967295|y>>>22),y=w+(g^(C|~E))+T[2]+718787259&4294967295,w=C+(y<<15&4294967295|y>>>17),y=E+(C^(w|~g))+T[9]+3951481745&4294967295,I.g[0]=I.g[0]+g&4294967295,I.g[1]=I.g[1]+(w+(y<<21&4294967295|y>>>11))&4294967295,I.g[2]=I.g[2]+w&4294967295,I.g[3]=I.g[3]+C&4294967295}n.prototype.u=function(I,g){g===void 0&&(g=I.length);for(var E=g-this.blockSize,T=this.B,w=this.h,C=0;C<g;){if(w==0)for(;C<=E;)i(this,I,C),C+=this.blockSize;if(typeof I=="string"){for(;C<g;)if(T[w++]=I.charCodeAt(C++),w==this.blockSize){i(this,T),w=0;break}}else for(;C<g;)if(T[w++]=I[C++],w==this.blockSize){i(this,T),w=0;break}}this.h=w,this.o+=g},n.prototype.v=function(){var I=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);I[0]=128;for(var g=1;g<I.length-8;++g)I[g]=0;var E=8*this.o;for(g=I.length-8;g<I.length;++g)I[g]=E&255,E/=256;for(this.u(I),I=Array(16),g=E=0;4>g;++g)for(var T=0;32>T;T+=8)I[E++]=this.g[g]>>>T&255;return I};function r(I,g){var E=l;return Object.prototype.hasOwnProperty.call(E,I)?E[I]:E[I]=g(I)}function o(I,g){this.h=g;for(var E=[],T=!0,w=I.length-1;0<=w;w--){var C=I[w]|0;T&&C==g||(E[w]=C,T=!1)}this.g=E}var l={};function u(I){return-128<=I&&128>I?r(I,function(g){return new o([g|0],0>g?-1:0)}):new o([I|0],0>I?-1:0)}function h(I){if(isNaN(I)||!isFinite(I))return p;if(0>I)return V(h(-I));for(var g=[],E=1,T=0;I>=E;T++)g[T]=I/E|0,E*=4294967296;return new o(g,0)}function f(I,g){if(I.length==0)throw Error("number format error: empty string");if(g=g||10,2>g||36<g)throw Error("radix out of range: "+g);if(I.charAt(0)=="-")return V(f(I.substring(1),g));if(0<=I.indexOf("-"))throw Error('number format error: interior "-" character');for(var E=h(Math.pow(g,8)),T=p,w=0;w<I.length;w+=8){var C=Math.min(8,I.length-w),y=parseInt(I.substring(w,w+C),g);8>C?(C=h(Math.pow(g,C)),T=T.j(C).add(h(y))):(T=T.j(E),T=T.add(h(y)))}return T}var p=u(0),m=u(1),v=u(16777216);s=o.prototype,s.m=function(){if(N(this))return-V(this).m();for(var I=0,g=1,E=0;E<this.g.length;E++){var T=this.i(E);I+=(0<=T?T:4294967296+T)*g,g*=4294967296}return I},s.toString=function(I){if(I=I||10,2>I||36<I)throw Error("radix out of range: "+I);if(S(this))return"0";if(N(this))return"-"+V(this).toString(I);for(var g=h(Math.pow(I,6)),E=this,T="";;){var w=J(E,g).g;E=K(E,w.j(g));var C=((0<E.g.length?E.g[0]:E.h)>>>0).toString(I);if(E=w,S(E))return C+T;for(;6>C.length;)C="0"+C;T=C+T}},s.i=function(I){return 0>I?0:I<this.g.length?this.g[I]:this.h};function S(I){if(I.h!=0)return!1;for(var g=0;g<I.g.length;g++)if(I.g[g]!=0)return!1;return!0}function N(I){return I.h==-1}s.l=function(I){return I=K(this,I),N(I)?-1:S(I)?0:1};function V(I){for(var g=I.g.length,E=[],T=0;T<g;T++)E[T]=~I.g[T];return new o(E,~I.h).add(m)}s.abs=function(){return N(this)?V(this):this},s.add=function(I){for(var g=Math.max(this.g.length,I.g.length),E=[],T=0,w=0;w<=g;w++){var C=T+(this.i(w)&65535)+(I.i(w)&65535),y=(C>>>16)+(this.i(w)>>>16)+(I.i(w)>>>16);T=y>>>16,C&=65535,y&=65535,E[w]=y<<16|C}return new o(E,E[E.length-1]&-2147483648?-1:0)};function K(I,g){return I.add(V(g))}s.j=function(I){if(S(this)||S(I))return p;if(N(this))return N(I)?V(this).j(V(I)):V(V(this).j(I));if(N(I))return V(this.j(V(I)));if(0>this.l(v)&&0>I.l(v))return h(this.m()*I.m());for(var g=this.g.length+I.g.length,E=[],T=0;T<2*g;T++)E[T]=0;for(T=0;T<this.g.length;T++)for(var w=0;w<I.g.length;w++){var C=this.i(T)>>>16,y=this.i(T)&65535,mt=I.i(w)>>>16,Cs=I.i(w)&65535;E[2*T+2*w]+=y*Cs,j(E,2*T+2*w),E[2*T+2*w+1]+=C*Cs,j(E,2*T+2*w+1),E[2*T+2*w+1]+=y*mt,j(E,2*T+2*w+1),E[2*T+2*w+2]+=C*mt,j(E,2*T+2*w+2)}for(T=0;T<g;T++)E[T]=E[2*T+1]<<16|E[2*T];for(T=g;T<2*g;T++)E[T]=0;return new o(E,0)};function j(I,g){for(;(I[g]&65535)!=I[g];)I[g+1]+=I[g]>>>16,I[g]&=65535,g++}function B(I,g){this.g=I,this.h=g}function J(I,g){if(S(g))throw Error("division by zero");if(S(I))return new B(p,p);if(N(I))return g=J(V(I),g),new B(V(g.g),V(g.h));if(N(g))return g=J(I,V(g)),new B(V(g.g),g.h);if(30<I.g.length){if(N(I)||N(g))throw Error("slowDivide_ only works with positive integers.");for(var E=m,T=g;0>=T.l(I);)E=le(E),T=le(T);var w=Z(E,1),C=Z(T,1);for(T=Z(T,2),E=Z(E,2);!S(T);){var y=C.add(T);0>=y.l(I)&&(w=w.add(E),C=y),T=Z(T,1),E=Z(E,1)}return g=K(I,w.j(g)),new B(w,g)}for(w=p;0<=I.l(g);){for(E=Math.max(1,Math.floor(I.m()/g.m())),T=Math.ceil(Math.log(E)/Math.LN2),T=48>=T?1:Math.pow(2,T-48),C=h(E),y=C.j(g);N(y)||0<y.l(I);)E-=T,C=h(E),y=C.j(g);S(C)&&(C=m),w=w.add(C),I=K(I,y)}return new B(w,I)}s.A=function(I){return J(this,I).h},s.and=function(I){for(var g=Math.max(this.g.length,I.g.length),E=[],T=0;T<g;T++)E[T]=this.i(T)&I.i(T);return new o(E,this.h&I.h)},s.or=function(I){for(var g=Math.max(this.g.length,I.g.length),E=[],T=0;T<g;T++)E[T]=this.i(T)|I.i(T);return new o(E,this.h|I.h)},s.xor=function(I){for(var g=Math.max(this.g.length,I.g.length),E=[],T=0;T<g;T++)E[T]=this.i(T)^I.i(T);return new o(E,this.h^I.h)};function le(I){for(var g=I.g.length+1,E=[],T=0;T<g;T++)E[T]=I.i(T)<<1|I.i(T-1)>>>31;return new o(E,I.h)}function Z(I,g){var E=g>>5;g%=32;for(var T=I.g.length-E,w=[],C=0;C<T;C++)w[C]=0<g?I.i(C+E)>>>g|I.i(C+E+1)<<32-g:I.i(C+E);return new o(w,I.h)}n.prototype.digest=n.prototype.v,n.prototype.reset=n.prototype.s,n.prototype.update=n.prototype.u,hf=n,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.A,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=h,o.fromString=f,Lt=o}).apply(typeof Hc<"u"?Hc:typeof self<"u"?self:typeof window<"u"?window:{});var mr=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var df,Zs,ff,Cr,Fa,pf,_f,mf;(function(){var s,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(a,c,d){return a==Array.prototype||a==Object.prototype||(a[c]=d.value),a};function t(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof mr=="object"&&mr];for(var c=0;c<a.length;++c){var d=a[c];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var n=t(this);function i(a,c){if(c)e:{var d=n;a=a.split(".");for(var _=0;_<a.length-1;_++){var R=a[_];if(!(R in d))break e;d=d[R]}a=a[a.length-1],_=d[a],c=c(_),c!=_&&c!=null&&e(d,a,{configurable:!0,writable:!0,value:c})}}function r(a,c){a instanceof String&&(a+="");var d=0,_=!1,R={next:function(){if(!_&&d<a.length){var P=d++;return{value:c(P,a[P]),done:!1}}return _=!0,{done:!0,value:void 0}}};return R[Symbol.iterator]=function(){return R},R}i("Array.prototype.values",function(a){return a||function(){return r(this,function(c,d){return d})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var o=o||{},l=this||self;function u(a){var c=typeof a;return c=c!="object"?c:a?Array.isArray(a)?"array":c:"null",c=="array"||c=="object"&&typeof a.length=="number"}function h(a){var c=typeof a;return c=="object"&&a!=null||c=="function"}function f(a,c,d){return a.call.apply(a.bind,arguments)}function p(a,c,d){if(!a)throw Error();if(2<arguments.length){var _=Array.prototype.slice.call(arguments,2);return function(){var R=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(R,_),a.apply(c,R)}}return function(){return a.apply(c,arguments)}}function m(a,c,d){return m=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?f:p,m.apply(null,arguments)}function v(a,c){var d=Array.prototype.slice.call(arguments,1);return function(){var _=d.slice();return _.push.apply(_,arguments),a.apply(this,_)}}function S(a,c){function d(){}d.prototype=c.prototype,a.aa=c.prototype,a.prototype=new d,a.prototype.constructor=a,a.Qb=function(_,R,P){for(var k=Array(arguments.length-2),re=2;re<arguments.length;re++)k[re-2]=arguments[re];return c.prototype[R].apply(_,k)}}function N(a){const c=a.length;if(0<c){const d=Array(c);for(let _=0;_<c;_++)d[_]=a[_];return d}return[]}function V(a,c){for(let d=1;d<arguments.length;d++){const _=arguments[d];if(u(_)){const R=a.length||0,P=_.length||0;a.length=R+P;for(let k=0;k<P;k++)a[R+k]=_[k]}else a.push(_)}}class K{constructor(c,d){this.i=c,this.j=d,this.h=0,this.g=null}get(){let c;return 0<this.h?(this.h--,c=this.g,this.g=c.next,c.next=null):c=this.i(),c}}function j(a){return/^[\s\xa0]*$/.test(a)}function B(){var a=l.navigator;return a&&(a=a.userAgent)?a:""}function J(a){return J[" "](a),a}J[" "]=function(){};var le=B().indexOf("Gecko")!=-1&&!(B().toLowerCase().indexOf("webkit")!=-1&&B().indexOf("Edge")==-1)&&!(B().indexOf("Trident")!=-1||B().indexOf("MSIE")!=-1)&&B().indexOf("Edge")==-1;function Z(a,c,d){for(const _ in a)c.call(d,a[_],_,a)}function I(a,c){for(const d in a)c.call(void 0,a[d],d,a)}function g(a){const c={};for(const d in a)c[d]=a[d];return c}const E="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function T(a,c){let d,_;for(let R=1;R<arguments.length;R++){_=arguments[R];for(d in _)a[d]=_[d];for(let P=0;P<E.length;P++)d=E[P],Object.prototype.hasOwnProperty.call(_,d)&&(a[d]=_[d])}}function w(a){var c=1;a=a.split(":");const d=[];for(;0<c&&a.length;)d.push(a.shift()),c--;return a.length&&d.push(a.join(":")),d}function C(a){l.setTimeout(()=>{throw a},0)}function y(){var a=Jo;let c=null;return a.g&&(c=a.g,a.g=a.g.next,a.g||(a.h=null),c.next=null),c}class mt{constructor(){this.h=this.g=null}add(c,d){const _=Cs.get();_.set(c,d),this.h?this.h.next=_:this.g=_,this.h=_}}var Cs=new K(()=>new Gm,a=>a.reset());class Gm{constructor(){this.next=this.g=this.h=null}set(c,d){this.h=c,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let Ss,Ps=!1,Jo=new mt,Qu=()=>{const a=l.Promise.resolve(void 0);Ss=()=>{a.then(Km)}};var Km=()=>{for(var a;a=y();){try{a.h.call(a.g)}catch(d){C(d)}var c=Cs;c.j(a),100>c.h&&(c.h++,a.next=c.g,c.g=a)}Ps=!1};function bt(){this.s=this.s,this.C=this.C}bt.prototype.s=!1,bt.prototype.ma=function(){this.s||(this.s=!0,this.N())},bt.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function xe(a,c){this.type=a,this.g=this.target=c,this.defaultPrevented=!1}xe.prototype.h=function(){this.defaultPrevented=!0};var Wm=function(){if(!l.addEventListener||!Object.defineProperty)return!1;var a=!1,c=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const d=()=>{};l.addEventListener("test",d,c),l.removeEventListener("test",d,c)}catch{}return a}();function bs(a,c){if(xe.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a){var d=this.type=a.type,_=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;if(this.target=a.target||a.srcElement,this.g=c,c=a.relatedTarget){if(le){e:{try{J(c.nodeName);var R=!0;break e}catch{}R=!1}R||(c=null)}}else d=="mouseover"?c=a.fromElement:d=="mouseout"&&(c=a.toElement);this.relatedTarget=c,_?(this.clientX=_.clientX!==void 0?_.clientX:_.pageX,this.clientY=_.clientY!==void 0?_.clientY:_.pageY,this.screenX=_.screenX||0,this.screenY=_.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=typeof a.pointerType=="string"?a.pointerType:$m[a.pointerType]||"",this.state=a.state,this.i=a,a.defaultPrevented&&bs.aa.h.call(this)}}S(bs,xe);var $m={2:"touch",3:"pen",4:"mouse"};bs.prototype.h=function(){bs.aa.h.call(this);var a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var Xi="closure_listenable_"+(1e6*Math.random()|0),Qm=0;function Hm(a,c,d,_,R){this.listener=a,this.proxy=null,this.src=c,this.type=d,this.capture=!!_,this.ha=R,this.key=++Qm,this.da=this.fa=!1}function Ji(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function Zi(a){this.src=a,this.g={},this.h=0}Zi.prototype.add=function(a,c,d,_,R){var P=a.toString();a=this.g[P],a||(a=this.g[P]=[],this.h++);var k=ea(a,c,_,R);return-1<k?(c=a[k],d||(c.fa=!1)):(c=new Hm(c,this.src,P,!!_,R),c.fa=d,a.push(c)),c};function Zo(a,c){var d=c.type;if(d in a.g){var _=a.g[d],R=Array.prototype.indexOf.call(_,c,void 0),P;(P=0<=R)&&Array.prototype.splice.call(_,R,1),P&&(Ji(c),a.g[d].length==0&&(delete a.g[d],a.h--))}}function ea(a,c,d,_){for(var R=0;R<a.length;++R){var P=a[R];if(!P.da&&P.listener==c&&P.capture==!!d&&P.ha==_)return R}return-1}var ta="closure_lm_"+(1e6*Math.random()|0),na={};function Hu(a,c,d,_,R){if(Array.isArray(c)){for(var P=0;P<c.length;P++)Hu(a,c[P],d,_,R);return null}return d=Ju(d),a&&a[Xi]?a.K(c,d,h(_)?!!_.capture:!1,R):Ym(a,c,d,!1,_,R)}function Ym(a,c,d,_,R,P){if(!c)throw Error("Invalid event type");var k=h(R)?!!R.capture:!!R,re=ia(a);if(re||(a[ta]=re=new Zi(a)),d=re.add(c,d,_,k,P),d.proxy)return d;if(_=Xm(),d.proxy=_,_.src=a,_.listener=d,a.addEventListener)Wm||(R=k),R===void 0&&(R=!1),a.addEventListener(c.toString(),_,R);else if(a.attachEvent)a.attachEvent(Xu(c.toString()),_);else if(a.addListener&&a.removeListener)a.addListener(_);else throw Error("addEventListener and attachEvent are unavailable.");return d}function Xm(){function a(d){return c.call(a.src,a.listener,d)}const c=Jm;return a}function Yu(a,c,d,_,R){if(Array.isArray(c))for(var P=0;P<c.length;P++)Yu(a,c[P],d,_,R);else _=h(_)?!!_.capture:!!_,d=Ju(d),a&&a[Xi]?(a=a.i,c=String(c).toString(),c in a.g&&(P=a.g[c],d=ea(P,d,_,R),-1<d&&(Ji(P[d]),Array.prototype.splice.call(P,d,1),P.length==0&&(delete a.g[c],a.h--)))):a&&(a=ia(a))&&(c=a.g[c.toString()],a=-1,c&&(a=ea(c,d,_,R)),(d=-1<a?c[a]:null)&&sa(d))}function sa(a){if(typeof a!="number"&&a&&!a.da){var c=a.src;if(c&&c[Xi])Zo(c.i,a);else{var d=a.type,_=a.proxy;c.removeEventListener?c.removeEventListener(d,_,a.capture):c.detachEvent?c.detachEvent(Xu(d),_):c.addListener&&c.removeListener&&c.removeListener(_),(d=ia(c))?(Zo(d,a),d.h==0&&(d.src=null,c[ta]=null)):Ji(a)}}}function Xu(a){return a in na?na[a]:na[a]="on"+a}function Jm(a,c){if(a.da)a=!0;else{c=new bs(c,this);var d=a.listener,_=a.ha||a.src;a.fa&&sa(a),a=d.call(_,c)}return a}function ia(a){return a=a[ta],a instanceof Zi?a:null}var ra="__closure_events_fn_"+(1e9*Math.random()>>>0);function Ju(a){return typeof a=="function"?a:(a[ra]||(a[ra]=function(c){return a.handleEvent(c)}),a[ra])}function Ne(){bt.call(this),this.i=new Zi(this),this.M=this,this.F=null}S(Ne,bt),Ne.prototype[Xi]=!0,Ne.prototype.removeEventListener=function(a,c,d,_){Yu(this,a,c,d,_)};function qe(a,c){var d,_=a.F;if(_)for(d=[];_;_=_.F)d.push(_);if(a=a.M,_=c.type||c,typeof c=="string")c=new xe(c,a);else if(c instanceof xe)c.target=c.target||a;else{var R=c;c=new xe(_,a),T(c,R)}if(R=!0,d)for(var P=d.length-1;0<=P;P--){var k=c.g=d[P];R=er(k,_,!0,c)&&R}if(k=c.g=a,R=er(k,_,!0,c)&&R,R=er(k,_,!1,c)&&R,d)for(P=0;P<d.length;P++)k=c.g=d[P],R=er(k,_,!1,c)&&R}Ne.prototype.N=function(){if(Ne.aa.N.call(this),this.i){var a=this.i,c;for(c in a.g){for(var d=a.g[c],_=0;_<d.length;_++)Ji(d[_]);delete a.g[c],a.h--}}this.F=null},Ne.prototype.K=function(a,c,d,_){return this.i.add(String(a),c,!1,d,_)},Ne.prototype.L=function(a,c,d,_){return this.i.add(String(a),c,!0,d,_)};function er(a,c,d,_){if(c=a.i.g[String(c)],!c)return!0;c=c.concat();for(var R=!0,P=0;P<c.length;++P){var k=c[P];if(k&&!k.da&&k.capture==d){var re=k.listener,Pe=k.ha||k.src;k.fa&&Zo(a.i,k),R=re.call(Pe,_)!==!1&&R}}return R&&!_.defaultPrevented}function Zu(a,c,d){if(typeof a=="function")d&&(a=m(a,d));else if(a&&typeof a.handleEvent=="function")a=m(a.handleEvent,a);else throw Error("Invalid listener argument");return 2147483647<Number(c)?-1:l.setTimeout(a,c||0)}function ec(a){a.g=Zu(()=>{a.g=null,a.i&&(a.i=!1,ec(a))},a.l);const c=a.h;a.h=null,a.m.apply(null,c)}class Zm extends bt{constructor(c,d){super(),this.m=c,this.l=d,this.h=null,this.i=!1,this.g=null}j(c){this.h=arguments,this.g?this.i=!0:ec(this)}N(){super.N(),this.g&&(l.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function xs(a){bt.call(this),this.h=a,this.g={}}S(xs,bt);var tc=[];function nc(a){Z(a.g,function(c,d){this.g.hasOwnProperty(d)&&sa(c)},a),a.g={}}xs.prototype.N=function(){xs.aa.N.call(this),nc(this)},xs.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var oa=l.JSON.stringify,eg=l.JSON.parse,tg=class{stringify(a){return l.JSON.stringify(a,void 0)}parse(a){return l.JSON.parse(a,void 0)}};function aa(){}aa.prototype.h=null;function sc(a){return a.h||(a.h=a.i())}function ic(){}var Ns={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function la(){xe.call(this,"d")}S(la,xe);function ua(){xe.call(this,"c")}S(ua,xe);var en={},rc=null;function tr(){return rc=rc||new Ne}en.La="serverreachability";function oc(a){xe.call(this,en.La,a)}S(oc,xe);function Vs(a){const c=tr();qe(c,new oc(c))}en.STAT_EVENT="statevent";function ac(a,c){xe.call(this,en.STAT_EVENT,a),this.stat=c}S(ac,xe);function je(a){const c=tr();qe(c,new ac(c,a))}en.Ma="timingevent";function lc(a,c){xe.call(this,en.Ma,a),this.size=c}S(lc,xe);function Ds(a,c){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return l.setTimeout(function(){a()},c)}function ks(){this.g=!0}ks.prototype.xa=function(){this.g=!1};function ng(a,c,d,_,R,P){a.info(function(){if(a.g)if(P)for(var k="",re=P.split("&"),Pe=0;Pe<re.length;Pe++){var ee=re[Pe].split("=");if(1<ee.length){var Ve=ee[0];ee=ee[1];var De=Ve.split("_");k=2<=De.length&&De[1]=="type"?k+(Ve+"="+ee+"&"):k+(Ve+"=redacted&")}}else k=null;else k=P;return"XMLHTTP REQ ("+_+") [attempt "+R+"]: "+c+`
`+d+`
`+k})}function sg(a,c,d,_,R,P,k){a.info(function(){return"XMLHTTP RESP ("+_+") [ attempt "+R+"]: "+c+`
`+d+`
`+P+" "+k})}function kn(a,c,d,_){a.info(function(){return"XMLHTTP TEXT ("+c+"): "+rg(a,d)+(_?" "+_:"")})}function ig(a,c){a.info(function(){return"TIMEOUT: "+c})}ks.prototype.info=function(){};function rg(a,c){if(!a.g)return c;if(!c)return null;try{var d=JSON.parse(c);if(d){for(a=0;a<d.length;a++)if(Array.isArray(d[a])){var _=d[a];if(!(2>_.length)){var R=_[1];if(Array.isArray(R)&&!(1>R.length)){var P=R[0];if(P!="noop"&&P!="stop"&&P!="close")for(var k=1;k<R.length;k++)R[k]=""}}}}return oa(d)}catch{return c}}var nr={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},uc={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},ca;function sr(){}S(sr,aa),sr.prototype.g=function(){return new XMLHttpRequest},sr.prototype.i=function(){return{}},ca=new sr;function xt(a,c,d,_){this.j=a,this.i=c,this.l=d,this.R=_||1,this.U=new xs(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new cc}function cc(){this.i=null,this.g="",this.h=!1}var hc={},ha={};function da(a,c,d){a.L=1,a.v=ar(gt(c)),a.m=d,a.P=!0,dc(a,null)}function dc(a,c){a.F=Date.now(),ir(a),a.A=gt(a.v);var d=a.A,_=a.R;Array.isArray(_)||(_=[String(_)]),Cc(d.i,"t",_),a.C=0,d=a.j.J,a.h=new cc,a.g=Gc(a.j,d?c:null,!a.m),0<a.O&&(a.M=new Zm(m(a.Y,a,a.g),a.O)),c=a.U,d=a.g,_=a.ca;var R="readystatechange";Array.isArray(R)||(R&&(tc[0]=R.toString()),R=tc);for(var P=0;P<R.length;P++){var k=Hu(d,R[P],_||c.handleEvent,!1,c.h||c);if(!k)break;c.g[k.key]=k}c=a.H?g(a.H):{},a.m?(a.u||(a.u="POST"),c["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.A,a.u,a.m,c)):(a.u="GET",a.g.ea(a.A,a.u,null,c)),Vs(),ng(a.i,a.u,a.A,a.l,a.R,a.m)}xt.prototype.ca=function(a){a=a.target;const c=this.M;c&&yt(a)==3?c.j():this.Y(a)},xt.prototype.Y=function(a){try{if(a==this.g)e:{const De=yt(this.g);var c=this.g.Ba();const Fn=this.g.Z();if(!(3>De)&&(De!=3||this.g&&(this.h.h||this.g.oa()||Dc(this.g)))){this.J||De!=4||c==7||(c==8||0>=Fn?Vs(3):Vs(2)),fa(this);var d=this.g.Z();this.X=d;t:if(fc(this)){var _=Dc(this.g);a="";var R=_.length,P=yt(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){tn(this),Os(this);var k="";break t}this.h.i=new l.TextDecoder}for(c=0;c<R;c++)this.h.h=!0,a+=this.h.i.decode(_[c],{stream:!(P&&c==R-1)});_.length=0,this.h.g+=a,this.C=0,k=this.h.g}else k=this.g.oa();if(this.o=d==200,sg(this.i,this.u,this.A,this.l,this.R,De,d),this.o){if(this.T&&!this.K){t:{if(this.g){var re,Pe=this.g;if((re=Pe.g?Pe.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!j(re)){var ee=re;break t}}ee=null}if(d=ee)kn(this.i,this.l,d,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,pa(this,d);else{this.o=!1,this.s=3,je(12),tn(this),Os(this);break e}}if(this.P){d=!0;let nt;for(;!this.J&&this.C<k.length;)if(nt=og(this,k),nt==ha){De==4&&(this.s=4,je(14),d=!1),kn(this.i,this.l,null,"[Incomplete Response]");break}else if(nt==hc){this.s=4,je(15),kn(this.i,this.l,k,"[Invalid Chunk]"),d=!1;break}else kn(this.i,this.l,nt,null),pa(this,nt);if(fc(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),De!=4||k.length!=0||this.h.h||(this.s=1,je(16),d=!1),this.o=this.o&&d,!d)kn(this.i,this.l,k,"[Invalid Chunked Response]"),tn(this),Os(this);else if(0<k.length&&!this.W){this.W=!0;var Ve=this.j;Ve.g==this&&Ve.ba&&!Ve.M&&(Ve.j.info("Great, no buffering proxy detected. Bytes received: "+k.length),Ia(Ve),Ve.M=!0,je(11))}}else kn(this.i,this.l,k,null),pa(this,k);De==4&&tn(this),this.o&&!this.J&&(De==4?Bc(this.j,this):(this.o=!1,ir(this)))}else wg(this.g),d==400&&0<k.indexOf("Unknown SID")?(this.s=3,je(12)):(this.s=0,je(13)),tn(this),Os(this)}}}catch{}finally{}};function fc(a){return a.g?a.u=="GET"&&a.L!=2&&a.j.Ca:!1}function og(a,c){var d=a.C,_=c.indexOf(`
`,d);return _==-1?ha:(d=Number(c.substring(d,_)),isNaN(d)?hc:(_+=1,_+d>c.length?ha:(c=c.slice(_,_+d),a.C=_+d,c)))}xt.prototype.cancel=function(){this.J=!0,tn(this)};function ir(a){a.S=Date.now()+a.I,pc(a,a.I)}function pc(a,c){if(a.B!=null)throw Error("WatchDog timer not null");a.B=Ds(m(a.ba,a),c)}function fa(a){a.B&&(l.clearTimeout(a.B),a.B=null)}xt.prototype.ba=function(){this.B=null;const a=Date.now();0<=a-this.S?(ig(this.i,this.A),this.L!=2&&(Vs(),je(17)),tn(this),this.s=2,Os(this)):pc(this,this.S-a)};function Os(a){a.j.G==0||a.J||Bc(a.j,a)}function tn(a){fa(a);var c=a.M;c&&typeof c.ma=="function"&&c.ma(),a.M=null,nc(a.U),a.g&&(c=a.g,a.g=null,c.abort(),c.ma())}function pa(a,c){try{var d=a.j;if(d.G!=0&&(d.g==a||_a(d.h,a))){if(!a.K&&_a(d.h,a)&&d.G==3){try{var _=d.Da.g.parse(c)}catch{_=null}if(Array.isArray(_)&&_.length==3){var R=_;if(R[0]==0){e:if(!d.u){if(d.g)if(d.g.F+3e3<a.F)fr(d),hr(d);else break e;Ea(d),je(18)}}else d.za=R[1],0<d.za-d.T&&37500>R[2]&&d.F&&d.v==0&&!d.C&&(d.C=Ds(m(d.Za,d),6e3));if(1>=gc(d.h)&&d.ca){try{d.ca()}catch{}d.ca=void 0}}else sn(d,11)}else if((a.K||d.g==a)&&fr(d),!j(c))for(R=d.Da.g.parse(c),c=0;c<R.length;c++){let ee=R[c];if(d.T=ee[0],ee=ee[1],d.G==2)if(ee[0]=="c"){d.K=ee[1],d.ia=ee[2];const Ve=ee[3];Ve!=null&&(d.la=Ve,d.j.info("VER="+d.la));const De=ee[4];De!=null&&(d.Aa=De,d.j.info("SVER="+d.Aa));const Fn=ee[5];Fn!=null&&typeof Fn=="number"&&0<Fn&&(_=1.5*Fn,d.L=_,d.j.info("backChannelRequestTimeoutMs_="+_)),_=d;const nt=a.g;if(nt){const _r=nt.g?nt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(_r){var P=_.h;P.g||_r.indexOf("spdy")==-1&&_r.indexOf("quic")==-1&&_r.indexOf("h2")==-1||(P.j=P.l,P.g=new Set,P.h&&(ma(P,P.h),P.h=null))}if(_.D){const Ta=nt.g?nt.g.getResponseHeader("X-HTTP-Session-Id"):null;Ta&&(_.ya=Ta,ce(_.I,_.D,Ta))}}d.G=3,d.l&&d.l.ua(),d.ba&&(d.R=Date.now()-a.F,d.j.info("Handshake RTT: "+d.R+"ms")),_=d;var k=a;if(_.qa=zc(_,_.J?_.ia:null,_.W),k.K){yc(_.h,k);var re=k,Pe=_.L;Pe&&(re.I=Pe),re.B&&(fa(re),ir(re)),_.g=k}else Lc(_);0<d.i.length&&dr(d)}else ee[0]!="stop"&&ee[0]!="close"||sn(d,7);else d.G==3&&(ee[0]=="stop"||ee[0]=="close"?ee[0]=="stop"?sn(d,7):ya(d):ee[0]!="noop"&&d.l&&d.l.ta(ee),d.v=0)}}Vs(4)}catch{}}var ag=class{constructor(a,c){this.g=a,this.map=c}};function _c(a){this.l=a||10,l.PerformanceNavigationTiming?(a=l.performance.getEntriesByType("navigation"),a=0<a.length&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(l.chrome&&l.chrome.loadTimes&&l.chrome.loadTimes()&&l.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function mc(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function gc(a){return a.h?1:a.g?a.g.size:0}function _a(a,c){return a.h?a.h==c:a.g?a.g.has(c):!1}function ma(a,c){a.g?a.g.add(c):a.h=c}function yc(a,c){a.h&&a.h==c?a.h=null:a.g&&a.g.has(c)&&a.g.delete(c)}_c.prototype.cancel=function(){if(this.i=Ec(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function Ec(a){if(a.h!=null)return a.i.concat(a.h.D);if(a.g!=null&&a.g.size!==0){let c=a.i;for(const d of a.g.values())c=c.concat(d.D);return c}return N(a.i)}function lg(a){if(a.V&&typeof a.V=="function")return a.V();if(typeof Map<"u"&&a instanceof Map||typeof Set<"u"&&a instanceof Set)return Array.from(a.values());if(typeof a=="string")return a.split("");if(u(a)){for(var c=[],d=a.length,_=0;_<d;_++)c.push(a[_]);return c}c=[],d=0;for(_ in a)c[d++]=a[_];return c}function ug(a){if(a.na&&typeof a.na=="function")return a.na();if(!a.V||typeof a.V!="function"){if(typeof Map<"u"&&a instanceof Map)return Array.from(a.keys());if(!(typeof Set<"u"&&a instanceof Set)){if(u(a)||typeof a=="string"){var c=[];a=a.length;for(var d=0;d<a;d++)c.push(d);return c}c=[],d=0;for(const _ in a)c[d++]=_;return c}}}function Ic(a,c){if(a.forEach&&typeof a.forEach=="function")a.forEach(c,void 0);else if(u(a)||typeof a=="string")Array.prototype.forEach.call(a,c,void 0);else for(var d=ug(a),_=lg(a),R=_.length,P=0;P<R;P++)c.call(void 0,_[P],d&&d[P],a)}var Tc=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function cg(a,c){if(a){a=a.split("&");for(var d=0;d<a.length;d++){var _=a[d].indexOf("="),R=null;if(0<=_){var P=a[d].substring(0,_);R=a[d].substring(_+1)}else P=a[d];c(P,R?decodeURIComponent(R.replace(/\+/g," ")):"")}}}function nn(a){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,a instanceof nn){this.h=a.h,rr(this,a.j),this.o=a.o,this.g=a.g,or(this,a.s),this.l=a.l;var c=a.i,d=new Ls;d.i=c.i,c.g&&(d.g=new Map(c.g),d.h=c.h),vc(this,d),this.m=a.m}else a&&(c=String(a).match(Tc))?(this.h=!1,rr(this,c[1]||"",!0),this.o=Ms(c[2]||""),this.g=Ms(c[3]||"",!0),or(this,c[4]),this.l=Ms(c[5]||"",!0),vc(this,c[6]||"",!0),this.m=Ms(c[7]||"")):(this.h=!1,this.i=new Ls(null,this.h))}nn.prototype.toString=function(){var a=[],c=this.j;c&&a.push(Fs(c,wc,!0),":");var d=this.g;return(d||c=="file")&&(a.push("//"),(c=this.o)&&a.push(Fs(c,wc,!0),"@"),a.push(encodeURIComponent(String(d)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.s,d!=null&&a.push(":",String(d))),(d=this.l)&&(this.g&&d.charAt(0)!="/"&&a.push("/"),a.push(Fs(d,d.charAt(0)=="/"?fg:dg,!0))),(d=this.i.toString())&&a.push("?",d),(d=this.m)&&a.push("#",Fs(d,_g)),a.join("")};function gt(a){return new nn(a)}function rr(a,c,d){a.j=d?Ms(c,!0):c,a.j&&(a.j=a.j.replace(/:$/,""))}function or(a,c){if(c){if(c=Number(c),isNaN(c)||0>c)throw Error("Bad port number "+c);a.s=c}else a.s=null}function vc(a,c,d){c instanceof Ls?(a.i=c,mg(a.i,a.h)):(d||(c=Fs(c,pg)),a.i=new Ls(c,a.h))}function ce(a,c,d){a.i.set(c,d)}function ar(a){return ce(a,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),a}function Ms(a,c){return a?c?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function Fs(a,c,d){return typeof a=="string"?(a=encodeURI(a).replace(c,hg),d&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function hg(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var wc=/[#\/\?@]/g,dg=/[#\?:]/g,fg=/[#\?]/g,pg=/[#\?@]/g,_g=/#/g;function Ls(a,c){this.h=this.g=null,this.i=a||null,this.j=!!c}function Nt(a){a.g||(a.g=new Map,a.h=0,a.i&&cg(a.i,function(c,d){a.add(decodeURIComponent(c.replace(/\+/g," ")),d)}))}s=Ls.prototype,s.add=function(a,c){Nt(this),this.i=null,a=On(this,a);var d=this.g.get(a);return d||this.g.set(a,d=[]),d.push(c),this.h+=1,this};function Ac(a,c){Nt(a),c=On(a,c),a.g.has(c)&&(a.i=null,a.h-=a.g.get(c).length,a.g.delete(c))}function Rc(a,c){return Nt(a),c=On(a,c),a.g.has(c)}s.forEach=function(a,c){Nt(this),this.g.forEach(function(d,_){d.forEach(function(R){a.call(c,R,_,this)},this)},this)},s.na=function(){Nt(this);const a=Array.from(this.g.values()),c=Array.from(this.g.keys()),d=[];for(let _=0;_<c.length;_++){const R=a[_];for(let P=0;P<R.length;P++)d.push(c[_])}return d},s.V=function(a){Nt(this);let c=[];if(typeof a=="string")Rc(this,a)&&(c=c.concat(this.g.get(On(this,a))));else{a=Array.from(this.g.values());for(let d=0;d<a.length;d++)c=c.concat(a[d])}return c},s.set=function(a,c){return Nt(this),this.i=null,a=On(this,a),Rc(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[c]),this.h+=1,this},s.get=function(a,c){return a?(a=this.V(a),0<a.length?String(a[0]):c):c};function Cc(a,c,d){Ac(a,c),0<d.length&&(a.i=null,a.g.set(On(a,c),N(d)),a.h+=d.length)}s.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],c=Array.from(this.g.keys());for(var d=0;d<c.length;d++){var _=c[d];const P=encodeURIComponent(String(_)),k=this.V(_);for(_=0;_<k.length;_++){var R=P;k[_]!==""&&(R+="="+encodeURIComponent(String(k[_]))),a.push(R)}}return this.i=a.join("&")};function On(a,c){return c=String(c),a.j&&(c=c.toLowerCase()),c}function mg(a,c){c&&!a.j&&(Nt(a),a.i=null,a.g.forEach(function(d,_){var R=_.toLowerCase();_!=R&&(Ac(this,_),Cc(this,R,d))},a)),a.j=c}function gg(a,c){const d=new ks;if(l.Image){const _=new Image;_.onload=v(Vt,d,"TestLoadImage: loaded",!0,c,_),_.onerror=v(Vt,d,"TestLoadImage: error",!1,c,_),_.onabort=v(Vt,d,"TestLoadImage: abort",!1,c,_),_.ontimeout=v(Vt,d,"TestLoadImage: timeout",!1,c,_),l.setTimeout(function(){_.ontimeout&&_.ontimeout()},1e4),_.src=a}else c(!1)}function yg(a,c){const d=new ks,_=new AbortController,R=setTimeout(()=>{_.abort(),Vt(d,"TestPingServer: timeout",!1,c)},1e4);fetch(a,{signal:_.signal}).then(P=>{clearTimeout(R),P.ok?Vt(d,"TestPingServer: ok",!0,c):Vt(d,"TestPingServer: server error",!1,c)}).catch(()=>{clearTimeout(R),Vt(d,"TestPingServer: error",!1,c)})}function Vt(a,c,d,_,R){try{R&&(R.onload=null,R.onerror=null,R.onabort=null,R.ontimeout=null),_(d)}catch{}}function Eg(){this.g=new tg}function Ig(a,c,d){const _=d||"";try{Ic(a,function(R,P){let k=R;h(R)&&(k=oa(R)),c.push(_+P+"="+encodeURIComponent(k))})}catch(R){throw c.push(_+"type="+encodeURIComponent("_badmap")),R}}function lr(a){this.l=a.Ub||null,this.j=a.eb||!1}S(lr,aa),lr.prototype.g=function(){return new ur(this.l,this.j)},lr.prototype.i=function(a){return function(){return a}}({});function ur(a,c){Ne.call(this),this.D=a,this.o=c,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}S(ur,Ne),s=ur.prototype,s.open=function(a,c){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=a,this.A=c,this.readyState=1,Bs(this)},s.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const c={headers:this.u,method:this.B,credentials:this.m,cache:void 0};a&&(c.body=a),(this.D||l).fetch(new Request(this.A,c)).then(this.Sa.bind(this),this.ga.bind(this))},s.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Us(this)),this.readyState=0},s.Sa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,Bs(this)),this.g&&(this.readyState=3,Bs(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof l.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;Sc(this)}else a.text().then(this.Ra.bind(this),this.ga.bind(this))};function Sc(a){a.j.read().then(a.Pa.bind(a)).catch(a.ga.bind(a))}s.Pa=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var c=a.value?a.value:new Uint8Array(0);(c=this.v.decode(c,{stream:!a.done}))&&(this.response=this.responseText+=c)}a.done?Us(this):Bs(this),this.readyState==3&&Sc(this)}},s.Ra=function(a){this.g&&(this.response=this.responseText=a,Us(this))},s.Qa=function(a){this.g&&(this.response=a,Us(this))},s.ga=function(){this.g&&Us(this)};function Us(a){a.readyState=4,a.l=null,a.j=null,a.v=null,Bs(a)}s.setRequestHeader=function(a,c){this.u.append(a,c)},s.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},s.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],c=this.h.entries();for(var d=c.next();!d.done;)d=d.value,a.push(d[0]+": "+d[1]),d=c.next();return a.join(`\r
`)};function Bs(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(ur.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function Pc(a){let c="";return Z(a,function(d,_){c+=_,c+=":",c+=d,c+=`\r
`}),c}function ga(a,c,d){e:{for(_ in d){var _=!1;break e}_=!0}_||(d=Pc(d),typeof a=="string"?d!=null&&encodeURIComponent(String(d)):ce(a,c,d))}function pe(a){Ne.call(this),this.headers=new Map,this.o=a||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}S(pe,Ne);var Tg=/^https?$/i,vg=["POST","PUT"];s=pe.prototype,s.Ha=function(a){this.J=a},s.ea=function(a,c,d,_){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);c=c?c.toUpperCase():"GET",this.D=a,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():ca.g(),this.v=this.o?sc(this.o):sc(ca),this.g.onreadystatechange=m(this.Ea,this);try{this.B=!0,this.g.open(c,String(a),!0),this.B=!1}catch(P){bc(this,P);return}if(a=d||"",d=new Map(this.headers),_)if(Object.getPrototypeOf(_)===Object.prototype)for(var R in _)d.set(R,_[R]);else if(typeof _.keys=="function"&&typeof _.get=="function")for(const P of _.keys())d.set(P,_.get(P));else throw Error("Unknown input type for opt_headers: "+String(_));_=Array.from(d.keys()).find(P=>P.toLowerCase()=="content-type"),R=l.FormData&&a instanceof l.FormData,!(0<=Array.prototype.indexOf.call(vg,c,void 0))||_||R||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[P,k]of d)this.g.setRequestHeader(P,k);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Vc(this),this.u=!0,this.g.send(a),this.u=!1}catch(P){bc(this,P)}};function bc(a,c){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=c,a.m=5,xc(a),cr(a)}function xc(a){a.A||(a.A=!0,qe(a,"complete"),qe(a,"error"))}s.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=a||7,qe(this,"complete"),qe(this,"abort"),cr(this))},s.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),cr(this,!0)),pe.aa.N.call(this)},s.Ea=function(){this.s||(this.B||this.u||this.j?Nc(this):this.bb())},s.bb=function(){Nc(this)};function Nc(a){if(a.h&&typeof o<"u"&&(!a.v[1]||yt(a)!=4||a.Z()!=2)){if(a.u&&yt(a)==4)Zu(a.Ea,0,a);else if(qe(a,"readystatechange"),yt(a)==4){a.h=!1;try{const k=a.Z();e:switch(k){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var c=!0;break e;default:c=!1}var d;if(!(d=c)){var _;if(_=k===0){var R=String(a.D).match(Tc)[1]||null;!R&&l.self&&l.self.location&&(R=l.self.location.protocol.slice(0,-1)),_=!Tg.test(R?R.toLowerCase():"")}d=_}if(d)qe(a,"complete"),qe(a,"success");else{a.m=6;try{var P=2<yt(a)?a.g.statusText:""}catch{P=""}a.l=P+" ["+a.Z()+"]",xc(a)}}finally{cr(a)}}}}function cr(a,c){if(a.g){Vc(a);const d=a.g,_=a.v[0]?()=>{}:null;a.g=null,a.v=null,c||qe(a,"ready");try{d.onreadystatechange=_}catch{}}}function Vc(a){a.I&&(l.clearTimeout(a.I),a.I=null)}s.isActive=function(){return!!this.g};function yt(a){return a.g?a.g.readyState:0}s.Z=function(){try{return 2<yt(this)?this.g.status:-1}catch{return-1}},s.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},s.Oa=function(a){if(this.g){var c=this.g.responseText;return a&&c.indexOf(a)==0&&(c=c.substring(a.length)),eg(c)}};function Dc(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.H){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function wg(a){const c={};a=(a.g&&2<=yt(a)&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let _=0;_<a.length;_++){if(j(a[_]))continue;var d=w(a[_]);const R=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const P=c[R]||[];c[R]=P,P.push(d)}I(c,function(_){return _.join(", ")})}s.Ba=function(){return this.m},s.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function qs(a,c,d){return d&&d.internalChannelParams&&d.internalChannelParams[a]||c}function kc(a){this.Aa=0,this.i=[],this.j=new ks,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=qs("failFast",!1,a),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=qs("baseRetryDelayMs",5e3,a),this.cb=qs("retryDelaySeedMs",1e4,a),this.Wa=qs("forwardChannelMaxRetries",2,a),this.wa=qs("forwardChannelRequestTimeoutMs",2e4,a),this.pa=a&&a.xmlHttpFactory||void 0,this.Xa=a&&a.Tb||void 0,this.Ca=a&&a.useFetchStreams||!1,this.L=void 0,this.J=a&&a.supportsCrossDomainXhr||!1,this.K="",this.h=new _c(a&&a.concurrentRequestLimit),this.Da=new Eg,this.P=a&&a.fastHandshake||!1,this.O=a&&a.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=a&&a.Rb||!1,a&&a.xa&&this.j.xa(),a&&a.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&a&&a.detectBufferingProxy||!1,this.ja=void 0,a&&a.longPollingTimeout&&0<a.longPollingTimeout&&(this.ja=a.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}s=kc.prototype,s.la=8,s.G=1,s.connect=function(a,c,d,_){je(0),this.W=a,this.H=c||{},d&&_!==void 0&&(this.H.OSID=d,this.H.OAID=_),this.F=this.X,this.I=zc(this,null,this.W),dr(this)};function ya(a){if(Oc(a),a.G==3){var c=a.U++,d=gt(a.I);if(ce(d,"SID",a.K),ce(d,"RID",c),ce(d,"TYPE","terminate"),js(a,d),c=new xt(a,a.j,c),c.L=2,c.v=ar(gt(d)),d=!1,l.navigator&&l.navigator.sendBeacon)try{d=l.navigator.sendBeacon(c.v.toString(),"")}catch{}!d&&l.Image&&(new Image().src=c.v,d=!0),d||(c.g=Gc(c.j,null),c.g.ea(c.v)),c.F=Date.now(),ir(c)}jc(a)}function hr(a){a.g&&(Ia(a),a.g.cancel(),a.g=null)}function Oc(a){hr(a),a.u&&(l.clearTimeout(a.u),a.u=null),fr(a),a.h.cancel(),a.s&&(typeof a.s=="number"&&l.clearTimeout(a.s),a.s=null)}function dr(a){if(!mc(a.h)&&!a.s){a.s=!0;var c=a.Ga;Ss||Qu(),Ps||(Ss(),Ps=!0),Jo.add(c,a),a.B=0}}function Ag(a,c){return gc(a.h)>=a.h.j-(a.s?1:0)?!1:a.s?(a.i=c.D.concat(a.i),!0):a.G==1||a.G==2||a.B>=(a.Va?0:a.Wa)?!1:(a.s=Ds(m(a.Ga,a,c),qc(a,a.B)),a.B++,!0)}s.Ga=function(a){if(this.s)if(this.s=null,this.G==1){if(!a){this.U=Math.floor(1e5*Math.random()),a=this.U++;const R=new xt(this,this.j,a);let P=this.o;if(this.S&&(P?(P=g(P),T(P,this.S)):P=this.S),this.m!==null||this.O||(R.H=P,P=null),this.P)e:{for(var c=0,d=0;d<this.i.length;d++){t:{var _=this.i[d];if("__data__"in _.map&&(_=_.map.__data__,typeof _=="string")){_=_.length;break t}_=void 0}if(_===void 0)break;if(c+=_,4096<c){c=d;break e}if(c===4096||d===this.i.length-1){c=d+1;break e}}c=1e3}else c=1e3;c=Fc(this,R,c),d=gt(this.I),ce(d,"RID",a),ce(d,"CVER",22),this.D&&ce(d,"X-HTTP-Session-Id",this.D),js(this,d),P&&(this.O?c="headers="+encodeURIComponent(String(Pc(P)))+"&"+c:this.m&&ga(d,this.m,P)),ma(this.h,R),this.Ua&&ce(d,"TYPE","init"),this.P?(ce(d,"$req",c),ce(d,"SID","null"),R.T=!0,da(R,d,null)):da(R,d,c),this.G=2}}else this.G==3&&(a?Mc(this,a):this.i.length==0||mc(this.h)||Mc(this))};function Mc(a,c){var d;c?d=c.l:d=a.U++;const _=gt(a.I);ce(_,"SID",a.K),ce(_,"RID",d),ce(_,"AID",a.T),js(a,_),a.m&&a.o&&ga(_,a.m,a.o),d=new xt(a,a.j,d,a.B+1),a.m===null&&(d.H=a.o),c&&(a.i=c.D.concat(a.i)),c=Fc(a,d,1e3),d.I=Math.round(.5*a.wa)+Math.round(.5*a.wa*Math.random()),ma(a.h,d),da(d,_,c)}function js(a,c){a.H&&Z(a.H,function(d,_){ce(c,_,d)}),a.l&&Ic({},function(d,_){ce(c,_,d)})}function Fc(a,c,d){d=Math.min(a.i.length,d);var _=a.l?m(a.l.Na,a.l,a):null;e:{var R=a.i;let P=-1;for(;;){const k=["count="+d];P==-1?0<d?(P=R[0].g,k.push("ofs="+P)):P=0:k.push("ofs="+P);let re=!0;for(let Pe=0;Pe<d;Pe++){let ee=R[Pe].g;const Ve=R[Pe].map;if(ee-=P,0>ee)P=Math.max(0,R[Pe].g-100),re=!1;else try{Ig(Ve,k,"req"+ee+"_")}catch{_&&_(Ve)}}if(re){_=k.join("&");break e}}}return a=a.i.splice(0,d),c.D=a,_}function Lc(a){if(!a.g&&!a.u){a.Y=1;var c=a.Fa;Ss||Qu(),Ps||(Ss(),Ps=!0),Jo.add(c,a),a.v=0}}function Ea(a){return a.g||a.u||3<=a.v?!1:(a.Y++,a.u=Ds(m(a.Fa,a),qc(a,a.v)),a.v++,!0)}s.Fa=function(){if(this.u=null,Uc(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var a=2*this.R;this.j.info("BP detection timer enabled: "+a),this.A=Ds(m(this.ab,this),a)}},s.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,je(10),hr(this),Uc(this))};function Ia(a){a.A!=null&&(l.clearTimeout(a.A),a.A=null)}function Uc(a){a.g=new xt(a,a.j,"rpc",a.Y),a.m===null&&(a.g.H=a.o),a.g.O=0;var c=gt(a.qa);ce(c,"RID","rpc"),ce(c,"SID",a.K),ce(c,"AID",a.T),ce(c,"CI",a.F?"0":"1"),!a.F&&a.ja&&ce(c,"TO",a.ja),ce(c,"TYPE","xmlhttp"),js(a,c),a.m&&a.o&&ga(c,a.m,a.o),a.L&&(a.g.I=a.L);var d=a.g;a=a.ia,d.L=1,d.v=ar(gt(c)),d.m=null,d.P=!0,dc(d,a)}s.Za=function(){this.C!=null&&(this.C=null,hr(this),Ea(this),je(19))};function fr(a){a.C!=null&&(l.clearTimeout(a.C),a.C=null)}function Bc(a,c){var d=null;if(a.g==c){fr(a),Ia(a),a.g=null;var _=2}else if(_a(a.h,c))d=c.D,yc(a.h,c),_=1;else return;if(a.G!=0){if(c.o)if(_==1){d=c.m?c.m.length:0,c=Date.now()-c.F;var R=a.B;_=tr(),qe(_,new lc(_,d)),dr(a)}else Lc(a);else if(R=c.s,R==3||R==0&&0<c.X||!(_==1&&Ag(a,c)||_==2&&Ea(a)))switch(d&&0<d.length&&(c=a.h,c.i=c.i.concat(d)),R){case 1:sn(a,5);break;case 4:sn(a,10);break;case 3:sn(a,6);break;default:sn(a,2)}}}function qc(a,c){let d=a.Ta+Math.floor(Math.random()*a.cb);return a.isActive()||(d*=2),d*c}function sn(a,c){if(a.j.info("Error code "+c),c==2){var d=m(a.fb,a),_=a.Xa;const R=!_;_=new nn(_||"//www.google.com/images/cleardot.gif"),l.location&&l.location.protocol=="http"||rr(_,"https"),ar(_),R?gg(_.toString(),d):yg(_.toString(),d)}else je(2);a.G=0,a.l&&a.l.sa(c),jc(a),Oc(a)}s.fb=function(a){a?(this.j.info("Successfully pinged google.com"),je(2)):(this.j.info("Failed to ping google.com"),je(1))};function jc(a){if(a.G=0,a.ka=[],a.l){const c=Ec(a.h);(c.length!=0||a.i.length!=0)&&(V(a.ka,c),V(a.ka,a.i),a.h.i.length=0,N(a.i),a.i.length=0),a.l.ra()}}function zc(a,c,d){var _=d instanceof nn?gt(d):new nn(d);if(_.g!="")c&&(_.g=c+"."+_.g),or(_,_.s);else{var R=l.location;_=R.protocol,c=c?c+"."+R.hostname:R.hostname,R=+R.port;var P=new nn(null);_&&rr(P,_),c&&(P.g=c),R&&or(P,R),d&&(P.l=d),_=P}return d=a.D,c=a.ya,d&&c&&ce(_,d,c),ce(_,"VER",a.la),js(a,_),_}function Gc(a,c,d){if(c&&!a.J)throw Error("Can't create secondary domain capable XhrIo object.");return c=a.Ca&&!a.pa?new pe(new lr({eb:d})):new pe(a.pa),c.Ha(a.J),c}s.isActive=function(){return!!this.l&&this.l.isActive(this)};function Kc(){}s=Kc.prototype,s.ua=function(){},s.ta=function(){},s.sa=function(){},s.ra=function(){},s.isActive=function(){return!0},s.Na=function(){};function pr(){}pr.prototype.g=function(a,c){return new Ye(a,c)};function Ye(a,c){Ne.call(this),this.g=new kc(c),this.l=a,this.h=c&&c.messageUrlParams||null,a=c&&c.messageHeaders||null,c&&c.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=c&&c.initMessageHeaders||null,c&&c.messageContentType&&(a?a["X-WebChannel-Content-Type"]=c.messageContentType:a={"X-WebChannel-Content-Type":c.messageContentType}),c&&c.va&&(a?a["X-WebChannel-Client-Profile"]=c.va:a={"X-WebChannel-Client-Profile":c.va}),this.g.S=a,(a=c&&c.Sb)&&!j(a)&&(this.g.m=a),this.v=c&&c.supportsCrossDomainXhr||!1,this.u=c&&c.sendRawJson||!1,(c=c&&c.httpSessionIdParam)&&!j(c)&&(this.g.D=c,a=this.h,a!==null&&c in a&&(a=this.h,c in a&&delete a[c])),this.j=new Mn(this)}S(Ye,Ne),Ye.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Ye.prototype.close=function(){ya(this.g)},Ye.prototype.o=function(a){var c=this.g;if(typeof a=="string"){var d={};d.__data__=a,a=d}else this.u&&(d={},d.__data__=oa(a),a=d);c.i.push(new ag(c.Ya++,a)),c.G==3&&dr(c)},Ye.prototype.N=function(){this.g.l=null,delete this.j,ya(this.g),delete this.g,Ye.aa.N.call(this)};function Wc(a){la.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var c=a.__sm__;if(c){e:{for(const d in c){a=d;break e}a=void 0}(this.i=a)&&(a=this.i,c=c!==null&&a in c?c[a]:void 0),this.data=c}else this.data=a}S(Wc,la);function $c(){ua.call(this),this.status=1}S($c,ua);function Mn(a){this.g=a}S(Mn,Kc),Mn.prototype.ua=function(){qe(this.g,"a")},Mn.prototype.ta=function(a){qe(this.g,new Wc(a))},Mn.prototype.sa=function(a){qe(this.g,new $c)},Mn.prototype.ra=function(){qe(this.g,"b")},pr.prototype.createWebChannel=pr.prototype.g,Ye.prototype.send=Ye.prototype.o,Ye.prototype.open=Ye.prototype.m,Ye.prototype.close=Ye.prototype.close,mf=function(){return new pr},_f=function(){return tr()},pf=en,Fa={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},nr.NO_ERROR=0,nr.TIMEOUT=8,nr.HTTP_ERROR=6,Cr=nr,uc.COMPLETE="complete",ff=uc,ic.EventType=Ns,Ns.OPEN="a",Ns.CLOSE="b",Ns.ERROR="c",Ns.MESSAGE="d",Ne.prototype.listen=Ne.prototype.K,Zs=ic,pe.prototype.listenOnce=pe.prototype.L,pe.prototype.getLastError=pe.prototype.Ka,pe.prototype.getLastErrorCode=pe.prototype.Ba,pe.prototype.getStatus=pe.prototype.Z,pe.prototype.getResponseJson=pe.prototype.Oa,pe.prototype.getResponseText=pe.prototype.oa,pe.prototype.send=pe.prototype.ea,pe.prototype.setWithCredentials=pe.prototype.Ha,df=pe}).apply(typeof mr<"u"?mr:typeof self<"u"?self:typeof window<"u"?window:{});const Yc="@firebase/firestore",Xc="4.8.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */let Es="11.10.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yn=new Xd("@firebase/firestore");function Kn(){return yn.logLevel}function x(s,...e){if(yn.logLevel<=dt.DEBUG){const t=e.map(Rl);yn.debug(`Firestore (${Es}): ${s}`,...t)}}function Te(s,...e){if(yn.logLevel<=dt.ERROR){const t=e.map(Rl);yn.error(`Firestore (${Es}): ${s}`,...t)}}function zt(s,...e){if(yn.logLevel<=dt.WARN){const t=e.map(Rl);yn.warn(`Firestore (${Es}): ${s}`,...t)}}function Rl(s){if(typeof s=="string")return s;try{/**
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
 */function F(s,e,t){let n="Unexpected state";typeof e=="string"?n=e:t=e,gf(s,n,t)}function gf(s,e,t){let n=`FIRESTORE (${Es}) INTERNAL ASSERTION FAILED: ${e} (ID: ${s.toString(16)})`;if(t!==void 0)try{n+=" CONTEXT: "+JSON.stringify(t)}catch{n+=" CONTEXT: "+t}throw Te(n),new Error(n)}function L(s,e,t,n){let i="Unexpected state";typeof t=="string"?i=t:n=t,s||gf(e,i,n)}function U(s,e){return s}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const b={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class M extends Rg{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ut{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jg{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class zg{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(Oe.UNAUTHENTICATED))}shutdown(){}}class Gg{constructor(e){this.t=e,this.currentUser=Oe.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){L(this.o===void 0,42304);let n=this.i;const i=u=>this.i!==n?(n=this.i,t(u)):Promise.resolve();let r=new Ut;this.o=()=>{this.i++,this.currentUser=this.u(),r.resolve(),r=new Ut,e.enqueueRetryable(()=>i(this.currentUser))};const o=()=>{const u=r;e.enqueueRetryable(async()=>{await u.promise,await i(this.currentUser)})},l=u=>{x("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit(u=>l(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?l(u):(x("FirebaseAuthCredentialsProvider","Auth not yet detected"),r.resolve(),r=new Ut)}},0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(n=>this.i!==e?(x("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):n?(L(typeof n.accessToken=="string",31837,{l:n}),new jg(n.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return L(e===null||typeof e=="string",2055,{h:e}),new Oe(e)}}class Kg{constructor(e,t,n){this.P=e,this.T=t,this.I=n,this.type="FirstParty",this.user=Oe.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class Wg{constructor(e,t,n){this.P=e,this.T=t,this.I=n}getToken(){return Promise.resolve(new Kg(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable(()=>t(Oe.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Jc{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class $g{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,ef(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){L(this.o===void 0,3512);const n=r=>{r.error!=null&&x("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${r.error.message}`);const o=r.token!==this.m;return this.m=r.token,x("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(r.token):Promise.resolve()};this.o=r=>{e.enqueueRetryable(()=>n(r))};const i=r=>{x("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=r,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit(r=>i(r)),setTimeout(()=>{if(!this.appCheck){const r=this.V.getImmediate({optional:!0});r?i(r):x("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){if(this.p)return Promise.resolve(new Jc(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(L(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new Jc(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
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
 */function Qg(s){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(s);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let n=0;n<s;n++)t[n]=Math.floor(256*Math.random());return t}/**
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
 */function yf(){return new TextEncoder}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cl{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let n="";for(;n.length<20;){const i=Qg(40);for(let r=0;r<i.length;++r)n.length<20&&i[r]<t&&(n+=e.charAt(i[r]%62))}return n}}function z(s,e){return s<e?-1:s>e?1:0}function La(s,e){let t=0;for(;t<s.length&&t<e.length;){const n=s.codePointAt(t),i=e.codePointAt(t);if(n!==i){if(n<128&&i<128)return z(n,i);{const r=yf(),o=Hg(r.encode(Zc(s,t)),r.encode(Zc(e,t)));return o!==0?o:z(n,i)}}t+=n>65535?2:1}return z(s.length,e.length)}function Zc(s,e){return s.codePointAt(e)>65535?s.substring(e,e+2):s.substring(e,e+1)}function Hg(s,e){for(let t=0;t<s.length&&t<e.length;++t)if(s[t]!==e[t])return z(s[t],e[t]);return z(s.length,e.length)}function ss(s,e,t){return s.length===e.length&&s.every((n,i)=>t(n,e[i]))}function Ef(s){return s+"\0"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eh="__name__";class ct{constructor(e,t,n){t===void 0?t=0:t>e.length&&F(637,{offset:t,range:e.length}),n===void 0?n=e.length-t:n>e.length-t&&F(1746,{length:n,range:e.length-t}),this.segments=e,this.offset=t,this.len=n}get length(){return this.len}isEqual(e){return ct.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof ct?e.forEach(n=>{t.push(n)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,n=this.limit();t<n;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const n=Math.min(e.length,t.length);for(let i=0;i<n;i++){const r=ct.compareSegments(e.get(i),t.get(i));if(r!==0)return r}return z(e.length,t.length)}static compareSegments(e,t){const n=ct.isNumericId(e),i=ct.isNumericId(t);return n&&!i?-1:!n&&i?1:n&&i?ct.extractNumericId(e).compare(ct.extractNumericId(t)):La(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return Lt.fromString(e.substring(4,e.length-2))}}class oe extends ct{construct(e,t,n){return new oe(e,t,n)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const n of e){if(n.indexOf("//")>=0)throw new M(b.INVALID_ARGUMENT,`Invalid segment (${n}). Paths must not contain // in them.`);t.push(...n.split("/").filter(i=>i.length>0))}return new oe(t)}static emptyPath(){return new oe([])}}const Yg=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class de extends ct{construct(e,t,n){return new de(e,t,n)}static isValidIdentifier(e){return Yg.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),de.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===eh}static keyField(){return new de([eh])}static fromServerFormat(e){const t=[];let n="",i=0;const r=()=>{if(n.length===0)throw new M(b.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(n),n=""};let o=!1;for(;i<e.length;){const l=e[i];if(l==="\\"){if(i+1===e.length)throw new M(b.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[i+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new M(b.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);n+=u,i+=2}else l==="`"?(o=!o,i++):l!=="."||o?(n+=l,i++):(r(),i++)}if(r(),o)throw new M(b.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new de(t)}static emptyPath(){return new de([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class O{constructor(e){this.path=e}static fromPath(e){return new O(oe.fromString(e))}static fromName(e){return new O(oe.fromString(e).popFirst(5))}static empty(){return new O(oe.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&oe.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return oe.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new O(new oe(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xg(s,e,t){if(!t)throw new M(b.INVALID_ARGUMENT,`Function ${s}() cannot be called with an empty ${e}.`)}function Jg(s,e,t,n){if(e===!0&&n===!0)throw new M(b.INVALID_ARGUMENT,`${s} and ${t} cannot be used together.`)}function th(s){if(!O.isDocumentKey(s))throw new M(b.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${s} has ${s.length}.`)}function If(s){return typeof s=="object"&&s!==null&&(Object.getPrototypeOf(s)===Object.prototype||Object.getPrototypeOf(s)===null)}function Sl(s){if(s===void 0)return"undefined";if(s===null)return"null";if(typeof s=="string")return s.length>20&&(s=`${s.substring(0,20)}...`),JSON.stringify(s);if(typeof s=="number"||typeof s=="boolean")return""+s;if(typeof s=="object"){if(s instanceof Array)return"an array";{const e=function(n){return n.constructor?n.constructor.name:null}(s);return e?`a custom ${e} object`:"an object"}}return typeof s=="function"?"a function":F(12329,{type:typeof s})}function jr(s,e){if("_delegate"in s&&(s=s._delegate),!(s instanceof e)){if(e.name===s.constructor.name)throw new M(b.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=Sl(s);throw new M(b.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return s}/**
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
 */function Ie(s,e){const t={typeString:s};return e&&(t.value=e),t}function Li(s,e){if(!If(s))throw new M(b.INVALID_ARGUMENT,"JSON must be an object");let t;for(const n in e)if(e[n]){const i=e[n].typeString,r="value"in e[n]?{value:e[n].value}:void 0;if(!(n in s)){t=`JSON missing required field: '${n}'`;break}const o=s[n];if(i&&typeof o!==i){t=`JSON field '${n}' must be a ${i}.`;break}if(r!==void 0&&o!==r.value){t=`Expected '${n}' field to equal '${r.value}'`;break}}if(t)throw new M(b.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nh=-62135596800,sh=1e6;class se{static now(){return se.fromMillis(Date.now())}static fromDate(e){return se.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),n=Math.floor((e-1e3*t)*sh);return new se(t,n)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new M(b.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new M(b.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<nh)throw new M(b.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new M(b.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/sh}_compareTo(e){return this.seconds===e.seconds?z(this.nanoseconds,e.nanoseconds):z(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:se._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(Li(e,se._jsonSchema))return new se(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-nh;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}se._jsonSchemaVersion="firestore/timestamp/1.0",se._jsonSchema={type:Ie("string",se._jsonSchemaVersion),seconds:Ie("number"),nanoseconds:Ie("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */const is=-1;class zr{constructor(e,t,n,i){this.indexId=e,this.collectionGroup=t,this.fields=n,this.indexState=i}}function Ua(s){return s.fields.find(e=>e.kind===2)}function on(s){return s.fields.filter(e=>e.kind!==2)}zr.UNKNOWN_ID=-1;class Sr{constructor(e,t){this.fieldPath=e,this.kind=t}}class yi{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new yi(0,et.min())}}function Tf(s,e){const t=s.toTimestamp().seconds,n=s.toTimestamp().nanoseconds+1,i=q.fromTimestamp(n===1e9?new se(t+1,0):new se(t,n));return new et(i,O.empty(),e)}function vf(s){return new et(s.readTime,s.key,is)}class et{constructor(e,t,n){this.readTime=e,this.documentKey=t,this.largestBatchId=n}static min(){return new et(q.min(),O.empty(),is)}static max(){return new et(q.max(),O.empty(),is)}}function Pl(s,e){let t=s.readTime.compareTo(e.readTime);return t!==0?t:(t=O.comparator(s.documentKey,e.documentKey),t!==0?t:z(s.largestBatchId,e.largestBatchId))}/**
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
 */const wf="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class Af{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function bn(s){if(s.code!==b.FAILED_PRECONDITION||s.message!==wf)throw s;x("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class A{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&F(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new A((n,i)=>{this.nextCallback=r=>{this.wrapSuccess(e,r).next(n,i)},this.catchCallback=r=>{this.wrapFailure(t,r).next(n,i)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof A?t:A.resolve(t)}catch(t){return A.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):A.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):A.reject(t)}static resolve(e){return new A((t,n)=>{t(e)})}static reject(e){return new A((t,n)=>{n(e)})}static waitFor(e){return new A((t,n)=>{let i=0,r=0,o=!1;e.forEach(l=>{++i,l.next(()=>{++r,o&&r===i&&t()},u=>n(u))}),o=!0,r===i&&t()})}static or(e){let t=A.resolve(!1);for(const n of e)t=t.next(i=>i?A.resolve(i):n());return t}static forEach(e,t){const n=[];return e.forEach((i,r)=>{n.push(t.call(this,i,r))}),this.waitFor(n)}static mapArray(e,t){return new A((n,i)=>{const r=e.length,o=new Array(r);let l=0;for(let u=0;u<r;u++){const h=u;t(e[h]).next(f=>{o[h]=f,++l,l===r&&n(o)},f=>i(f))}})}static doWhile(e,t){return new A((n,i)=>{const r=()=>{e()===!0?t().next(()=>{r()},i):n()};r()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xe="SimpleDb";class Co{static open(e,t,n,i){try{return new Co(t,e.transaction(i,n))}catch(r){throw new si(t,r)}}constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.S=new Ut,this.transaction.oncomplete=()=>{this.S.resolve()},this.transaction.onabort=()=>{t.error?this.S.reject(new si(e,t.error)):this.S.resolve()},this.transaction.onerror=n=>{const i=bl(n.target.error);this.S.reject(new si(e,i))}}get D(){return this.S.promise}abort(e){e&&this.S.reject(e),this.aborted||(x(Xe,"Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}v(){const e=this.transaction;this.aborted||typeof e.commit!="function"||e.commit()}store(e){const t=this.transaction.objectStore(e);return new ey(t)}}class Bt{static delete(e){return x(Xe,"Removing database:",e),un(Cg().indexedDB.deleteDatabase(e)).toPromise()}static C(){if(!Sg())return!1;if(Bt.F())return!0;const e=Br(),t=Bt.M(e),n=0<t&&t<10,i=Rf(e),r=0<i&&i<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||n||r)}static F(){var e;return typeof process<"u"&&((e=process.__PRIVATE_env)===null||e===void 0?void 0:e.O)==="YES"}static N(e,t){return e.store(t)}static M(e){const t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),n=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(n)}constructor(e,t,n){this.name=e,this.version=t,this.B=n,this.L=null,Bt.M(Br())===12.2&&Te("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}async k(e){return this.db||(x(Xe,"Opening database:",this.name),this.db=await new Promise((t,n)=>{const i=indexedDB.open(this.name,this.version);i.onsuccess=r=>{const o=r.target.result;t(o)},i.onblocked=()=>{n(new si(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},i.onerror=r=>{const o=r.target.error;o.name==="VersionError"?n(new M(b.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):o.name==="InvalidStateError"?n(new M(b.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+o)):n(new si(e,o))},i.onupgradeneeded=r=>{x(Xe,'Database "'+this.name+'" requires upgrade from version:',r.oldVersion);const o=r.target.result;if(this.L!==null&&this.L!==r.oldVersion)throw new Error(`refusing to open IndexedDB database due to potential corruption of the IndexedDB database data; this corruption could be caused by clicking the "clear site data" button in a web browser; try reloading the web page to re-initialize the IndexedDB database: lastClosedDbVersion=${this.L}, event.oldVersion=${r.oldVersion}, event.newVersion=${r.newVersion}, db.version=${o.version}`);this.B.q(o,i.transaction,r.oldVersion,this.version).next(()=>{x(Xe,"Database upgrade to version "+this.version+" complete")})}}),this.db.addEventListener("close",t=>{const n=t.target;this.L=n.version},{passive:!0})),this.db.addEventListener("versionchange",t=>{var n;t.newVersion===null&&(zt('Received "versionchange" event with newVersion===null; notifying the registered DatabaseDeletedListener, if any'),(n=this.databaseDeletedListener)===null||n===void 0||n.call(this))},{passive:!0}),this.db}setDatabaseDeletedListener(e){if(this.databaseDeletedListener)throw new Error("setDatabaseDeletedListener() may only be called once, and it has already been called");this.databaseDeletedListener=e}async runTransaction(e,t,n,i){const r=t==="readonly";let o=0;for(;;){++o;try{this.db=await this.k(e);const l=Co.open(this.db,e,r?"readonly":"readwrite",n),u=i(l).next(h=>(l.v(),h)).catch(h=>(l.abort(h),A.reject(h))).toPromise();return u.catch(()=>{}),await l.D,u}catch(l){const u=l,h=u.name!=="FirebaseError"&&o<3;if(x(Xe,"Transaction failed with error:",u.message,"Retrying:",h),this.close(),!h)return Promise.reject(u)}}}close(){this.db&&this.db.close(),this.db=void 0}}function Rf(s){const e=s.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}class Zg{constructor(e){this.$=e,this.U=!1,this.K=null}get isDone(){return this.U}get W(){return this.K}set cursor(e){this.$=e}done(){this.U=!0}G(e){this.K=e}delete(){return un(this.$.delete())}}class si extends M{constructor(e,t){super(b.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function Xt(s){return s.name==="IndexedDbTransactionError"}class ey{constructor(e){this.store=e}put(e,t){let n;return t!==void 0?(x(Xe,"PUT",this.store.name,e,t),n=this.store.put(t,e)):(x(Xe,"PUT",this.store.name,"<auto-key>",e),n=this.store.put(e)),un(n)}add(e){return x(Xe,"ADD",this.store.name,e,e),un(this.store.add(e))}get(e){return un(this.store.get(e)).next(t=>(t===void 0&&(t=null),x(Xe,"GET",this.store.name,e,t),t))}delete(e){return x(Xe,"DELETE",this.store.name,e),un(this.store.delete(e))}count(){return x(Xe,"COUNT",this.store.name),un(this.store.count())}j(e,t){const n=this.options(e,t),i=n.index?this.store.index(n.index):this.store;if(typeof i.getAll=="function"){const r=i.getAll(n.range);return new A((o,l)=>{r.onerror=u=>{l(u.target.error)},r.onsuccess=u=>{o(u.target.result)}})}{const r=this.cursor(n),o=[];return this.J(r,(l,u)=>{o.push(u)}).next(()=>o)}}H(e,t){const n=this.store.getAll(e,t===null?void 0:t);return new A((i,r)=>{n.onerror=o=>{r(o.target.error)},n.onsuccess=o=>{i(o.target.result)}})}Y(e,t){x(Xe,"DELETE ALL",this.store.name);const n=this.options(e,t);n.Z=!1;const i=this.cursor(n);return this.J(i,(r,o,l)=>l.delete())}X(e,t){let n;t?n=e:(n={},t=e);const i=this.cursor(n);return this.J(i,t)}ee(e){const t=this.cursor({});return new A((n,i)=>{t.onerror=r=>{const o=bl(r.target.error);i(o)},t.onsuccess=r=>{const o=r.target.result;o?e(o.primaryKey,o.value).next(l=>{l?o.continue():n()}):n()}})}J(e,t){const n=[];return new A((i,r)=>{e.onerror=o=>{r(o.target.error)},e.onsuccess=o=>{const l=o.target.result;if(!l)return void i();const u=new Zg(l),h=t(l.primaryKey,l.value,u);if(h instanceof A){const f=h.catch(p=>(u.done(),A.reject(p)));n.push(f)}u.isDone?i():u.W===null?l.continue():l.continue(u.W)}}).next(()=>A.waitFor(n))}options(e,t){let n;return e!==void 0&&(typeof e=="string"?n=e:t=e),{index:n,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){const n=this.store.index(e.index);return e.Z?n.openKeyCursor(e.range,t):n.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function un(s){return new A((e,t)=>{s.onsuccess=n=>{const i=n.target.result;e(i)},s.onerror=n=>{const i=bl(n.target.error);t(i)}})}let ih=!1;function bl(s){const e=Bt.M(Br());if(e>=12.2&&e<13){const t="An internal error was encountered in the Indexed Database server";if(s.message.indexOf(t)>=0){const n=new M("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return ih||(ih=!0,setTimeout(()=>{throw n},0)),n}}return s}const ii="IndexBackfiller";class ty{constructor(e,t){this.asyncQueue=e,this.te=t,this.task=null}start(){this.ne(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}ne(e){x(ii,`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,async()=>{this.task=null;try{const t=await this.te.re();x(ii,`Documents written: ${t}`)}catch(t){Xt(t)?x(ii,"Ignoring IndexedDB error during index backfill: ",t):await bn(t)}await this.ne(6e4)})}}class ny{constructor(e,t){this.localStore=e,this.persistence=t}async re(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",t=>this.ie(t,e))}ie(e,t){const n=new Set;let i=t,r=!0;return A.doWhile(()=>r===!0&&i>0,()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next(o=>{if(o!==null&&!n.has(o))return x(ii,`Processing collection: ${o}`),this.se(e,o,i).next(l=>{i-=l,n.add(o)});r=!1})).next(()=>t-i)}se(e,t,n){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next(i=>this.localStore.localDocuments.getNextDocuments(e,t,i,n).next(r=>{const o=r.changes;return this.localStore.indexManager.updateIndexEntries(e,o).next(()=>this.oe(i,r)).next(l=>(x(ii,`Updating offset: ${l}`),this.localStore.indexManager.updateCollectionGroup(e,t,l))).next(()=>o.size)}))}oe(e,t){let n=e;return t.changes.forEach((i,r)=>{const o=vf(r);Pl(o,n)>0&&(n=o)}),new et(n.readTime,n.documentKey,Math.max(t.batchId,e.largestBatchId))}}/**
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
 */class Ge{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=n=>this._e(n),this.ae=n=>t.writeSequenceNumber(n))}_e(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ae&&this.ae(e),e}}Ge.ue=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _n=-1;function So(s){return s==null}function Ei(s){return s===0&&1/s==-1/0}function Cf(s){return typeof s=="number"&&Number.isInteger(s)&&!Ei(s)&&s<=Number.MAX_SAFE_INTEGER&&s>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gr="";function Be(s){let e="";for(let t=0;t<s.length;t++)e.length>0&&(e=rh(e)),e=sy(s.get(t),e);return rh(e)}function sy(s,e){let t=e;const n=s.length;for(let i=0;i<n;i++){const r=s.charAt(i);switch(r){case"\0":t+="";break;case Gr:t+="";break;default:t+=r}}return t}function rh(s){return s+Gr+""}function ft(s){const e=s.length;if(L(e>=2,64408,{path:s}),e===2)return L(s.charAt(0)===Gr&&s.charAt(1)==="",56145,{path:s}),oe.emptyPath();const t=e-2,n=[];let i="";for(let r=0;r<e;){const o=s.indexOf(Gr,r);switch((o<0||o>t)&&F(50515,{path:s}),s.charAt(o+1)){case"":const l=s.substring(r,o);let u;i.length===0?u=l:(i+=l,u=i,i=""),n.push(u);break;case"":i+=s.substring(r,o),i+="\0";break;case"":i+=s.substring(r,o+1);break;default:F(61167,{path:s})}r=o+2}return new oe(n)}/**
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
 */const an="remoteDocuments",Ui="owner",Ln="owner",Ii="mutationQueues",iy="userId",st="mutations",oh="batchId",fn="userMutationsIndex",ah=["userId","batchId"];/**
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
 */function Pr(s,e){return[s,Be(e)]}function Sf(s,e,t){return[s,Be(e),t]}const ry={},rs="documentMutations",Kr="remoteDocumentsV14",oy=["prefixPath","collectionGroup","readTime","documentId"],br="documentKeyIndex",ay=["prefixPath","collectionGroup","documentId"],Pf="collectionGroupIndex",ly=["collectionGroup","readTime","prefixPath","documentId"],Ti="remoteDocumentGlobal",Ba="remoteDocumentGlobalKey",os="targets",bf="queryTargetsIndex",uy=["canonicalId","targetId"],as="targetDocuments",cy=["targetId","path"],xl="documentTargetsIndex",hy=["path","targetId"],Wr="targetGlobalKey",mn="targetGlobal",vi="collectionParents",dy=["collectionId","parent"],ls="clientMetadata",fy="clientId",Po="bundles",py="bundleId",bo="namedQueries",_y="name",Nl="indexConfiguration",my="indexId",qa="collectionGroupIndex",gy="collectionGroup",ri="indexState",yy=["indexId","uid"],xf="sequenceNumberIndex",Ey=["uid","sequenceNumber"],oi="indexEntries",Iy=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],Nf="documentKeyIndex",Ty=["indexId","uid","orderedDocumentKey"],xo="documentOverlays",vy=["userId","collectionPath","documentId"],ja="collectionPathOverlayIndex",wy=["userId","collectionPath","largestBatchId"],Vf="collectionGroupOverlayIndex",Ay=["userId","collectionGroup","largestBatchId"],Vl="globals",Ry="name",Df=[Ii,st,rs,an,os,Ui,mn,as,ls,Ti,vi,Po,bo],Cy=[...Df,xo],kf=[Ii,st,rs,Kr,os,Ui,mn,as,ls,Ti,vi,Po,bo,xo],Of=kf,Dl=[...Of,Nl,ri,oi],Sy=Dl,Mf=[...Dl,Vl],Py=Mf;/**
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
 */class za extends Af{constructor(e,t){super(),this.ce=e,this.currentSequenceNumber=t}}function we(s,e){const t=U(s);return Bt.N(t.ce,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lh(s){let e=0;for(const t in s)Object.prototype.hasOwnProperty.call(s,t)&&e++;return e}function xn(s,e){for(const t in s)Object.prototype.hasOwnProperty.call(s,t)&&e(t,s[t])}function Ff(s){for(const e in s)if(Object.prototype.hasOwnProperty.call(s,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let fe=class Ga{constructor(e,t){this.comparator=e,this.root=t||qt.EMPTY}insert(e,t){return new Ga(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,qt.BLACK,null,null))}remove(e){return new Ga(this.comparator,this.root.remove(e,this.comparator).copy(null,null,qt.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const n=this.comparator(e,t.key);if(n===0)return t.value;n<0?t=t.left:n>0&&(t=t.right)}return null}indexOf(e){let t=0,n=this.root;for(;!n.isEmpty();){const i=this.comparator(e,n.key);if(i===0)return t+n.left.size;i<0?n=n.left:(t+=n.left.size+1,n=n.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,n)=>(e(t,n),!1))}toString(){const e=[];return this.inorderTraversal((t,n)=>(e.push(`${t}:${n}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new gr(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new gr(this.root,e,this.comparator,!1)}getReverseIterator(){return new gr(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new gr(this.root,e,this.comparator,!0)}},gr=class{constructor(e,t,n,i){this.isReverse=i,this.nodeStack=[];let r=1;for(;!e.isEmpty();)if(r=t?n(e.key,t):1,t&&i&&(r*=-1),r<0)e=this.isReverse?e.left:e.right;else{if(r===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}},qt=class Et{constructor(e,t,n,i,r){this.key=e,this.value=t,this.color=n??Et.RED,this.left=i??Et.EMPTY,this.right=r??Et.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,n,i,r){return new Et(e??this.key,t??this.value,n??this.color,i??this.left,r??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let i=this;const r=n(e,i.key);return i=r<0?i.copy(null,null,null,i.left.insert(e,t,n),null):r===0?i.copy(null,t,null,null,null):i.copy(null,null,null,null,i.right.insert(e,t,n)),i.fixUp()}removeMin(){if(this.left.isEmpty())return Et.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let n,i=this;if(t(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),t(e,i.key)===0){if(i.right.isEmpty())return Et.EMPTY;n=i.right.min(),i=i.copy(n.key,n.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Et.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Et.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw F(43730,{key:this.key,value:this.value});if(this.right.isRed())throw F(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw F(27949);return e+(this.isRed()?0:1)}};qt.EMPTY=null,qt.RED=!0,qt.BLACK=!1;qt.EMPTY=new class{constructor(){this.size=0}get key(){throw F(57766)}get value(){throw F(16141)}get color(){throw F(16727)}get left(){throw F(29726)}get right(){throw F(36894)}copy(e,t,n,i,r){return this}insert(e,t,n){return new qt(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ne{constructor(e){this.comparator=e,this.data=new fe(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,n)=>(e(t),!1))}forEachInRange(e,t){const n=this.data.getIteratorFrom(e[0]);for(;n.hasNext();){const i=n.getNext();if(this.comparator(i.key,e[1])>=0)return;t(i.key)}}forEachWhile(e,t){let n;for(n=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();n.hasNext();)if(!e(n.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new uh(this.data.getIterator())}getIteratorFrom(e){return new uh(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(n=>{t=t.add(n)}),t}isEqual(e){if(!(e instanceof ne)||this.size!==e.size)return!1;const t=this.data.getIterator(),n=e.data.getIterator();for(;t.hasNext();){const i=t.getNext().key,r=n.getNext().key;if(this.comparator(i,r)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new ne(this.comparator);return t.data=e,t}}class uh{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function Un(s){return s.hasNext()?s.getNext():void 0}/**
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
 */class Ke{constructor(e){this.fields=e,e.sort(de.comparator)}static empty(){return new Ke([])}unionWith(e){let t=new ne(de.comparator);for(const n of this.fields)t=t.add(n);for(const n of e)t=t.add(n);return new Ke(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return ss(this.fields,e.fields,(t,n)=>t.isEqual(n))}}/**
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
 */class Lf extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class ge{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(i){try{return atob(i)}catch(r){throw typeof DOMException<"u"&&r instanceof DOMException?new Lf("Invalid base64 string: "+r):r}}(e);return new ge(t)}static fromUint8Array(e){const t=function(i){let r="";for(let o=0;o<i.length;++o)r+=String.fromCharCode(i[o]);return r}(e);return new ge(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const n=new Uint8Array(t.length);for(let i=0;i<t.length;i++)n[i]=t.charCodeAt(i);return n}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return z(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}ge.EMPTY_BYTE_STRING=new ge("");const by=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Gt(s){if(L(!!s,39018),typeof s=="string"){let e=0;const t=by.exec(s);if(L(!!t,46558,{timestamp:s}),t[1]){let i=t[1];i=(i+"000000000").substr(0,9),e=Number(i)}const n=new Date(s);return{seconds:Math.floor(n.getTime()/1e3),nanos:e}}return{seconds:Ee(s.seconds),nanos:Ee(s.nanos)}}function Ee(s){return typeof s=="number"?s:typeof s=="string"?Number(s):0}function Kt(s){return typeof s=="string"?ge.fromBase64String(s):ge.fromUint8Array(s)}/**
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
 */const Uf="server_timestamp",Bf="__type__",qf="__previous_value__",jf="__local_write_time__";function kl(s){var e,t;return((t=(((e=s==null?void 0:s.mapValue)===null||e===void 0?void 0:e.fields)||{})[Bf])===null||t===void 0?void 0:t.stringValue)===Uf}function Ol(s){const e=s.mapValue.fields[qf];return kl(e)?Ol(e):e}function $r(s){const e=Gt(s.mapValue.fields[jf].timestampValue);return new se(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xy{constructor(e,t,n,i,r,o,l,u,h,f){this.databaseId=e,this.appId=t,this.persistenceKey=n,this.host=i,this.ssl=r,this.forceLongPolling=o,this.autoDetectLongPolling=l,this.longPollingOptions=u,this.useFetchStreams=h,this.isUsingEmulator=f}}const Qr="(default)";class us{constructor(e,t){this.projectId=e,this.database=t||Qr}static empty(){return new us("","")}get isDefaultDatabase(){return this.database===Qr}isEqual(e){return e instanceof us&&e.projectId===this.projectId&&e.database===this.database}}/**
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
 */const Ml="__type__",zf="__max__",Ft={mapValue:{fields:{__type__:{stringValue:zf}}}},Fl="__vector__",wi="value",xr={nullValue:"NULL_VALUE"};function En(s){return"nullValue"in s?0:"booleanValue"in s?1:"integerValue"in s||"doubleValue"in s?2:"timestampValue"in s?3:"stringValue"in s?5:"bytesValue"in s?6:"referenceValue"in s?7:"geoPointValue"in s?8:"arrayValue"in s?9:"mapValue"in s?kl(s)?4:Gf(s)?9007199254740991:No(s)?10:11:F(28295,{value:s})}function _t(s,e){if(s===e)return!0;const t=En(s);if(t!==En(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return s.booleanValue===e.booleanValue;case 4:return $r(s).isEqual($r(e));case 3:return function(i,r){if(typeof i.timestampValue=="string"&&typeof r.timestampValue=="string"&&i.timestampValue.length===r.timestampValue.length)return i.timestampValue===r.timestampValue;const o=Gt(i.timestampValue),l=Gt(r.timestampValue);return o.seconds===l.seconds&&o.nanos===l.nanos}(s,e);case 5:return s.stringValue===e.stringValue;case 6:return function(i,r){return Kt(i.bytesValue).isEqual(Kt(r.bytesValue))}(s,e);case 7:return s.referenceValue===e.referenceValue;case 8:return function(i,r){return Ee(i.geoPointValue.latitude)===Ee(r.geoPointValue.latitude)&&Ee(i.geoPointValue.longitude)===Ee(r.geoPointValue.longitude)}(s,e);case 2:return function(i,r){if("integerValue"in i&&"integerValue"in r)return Ee(i.integerValue)===Ee(r.integerValue);if("doubleValue"in i&&"doubleValue"in r){const o=Ee(i.doubleValue),l=Ee(r.doubleValue);return o===l?Ei(o)===Ei(l):isNaN(o)&&isNaN(l)}return!1}(s,e);case 9:return ss(s.arrayValue.values||[],e.arrayValue.values||[],_t);case 10:case 11:return function(i,r){const o=i.mapValue.fields||{},l=r.mapValue.fields||{};if(lh(o)!==lh(l))return!1;for(const u in o)if(o.hasOwnProperty(u)&&(l[u]===void 0||!_t(o[u],l[u])))return!1;return!0}(s,e);default:return F(52216,{left:s})}}function Ai(s,e){return(s.values||[]).find(t=>_t(t,e))!==void 0}function Wt(s,e){if(s===e)return 0;const t=En(s),n=En(e);if(t!==n)return z(t,n);switch(t){case 0:case 9007199254740991:return 0;case 1:return z(s.booleanValue,e.booleanValue);case 2:return function(r,o){const l=Ee(r.integerValue||r.doubleValue),u=Ee(o.integerValue||o.doubleValue);return l<u?-1:l>u?1:l===u?0:isNaN(l)?isNaN(u)?0:-1:1}(s,e);case 3:return ch(s.timestampValue,e.timestampValue);case 4:return ch($r(s),$r(e));case 5:return La(s.stringValue,e.stringValue);case 6:return function(r,o){const l=Kt(r),u=Kt(o);return l.compareTo(u)}(s.bytesValue,e.bytesValue);case 7:return function(r,o){const l=r.split("/"),u=o.split("/");for(let h=0;h<l.length&&h<u.length;h++){const f=z(l[h],u[h]);if(f!==0)return f}return z(l.length,u.length)}(s.referenceValue,e.referenceValue);case 8:return function(r,o){const l=z(Ee(r.latitude),Ee(o.latitude));return l!==0?l:z(Ee(r.longitude),Ee(o.longitude))}(s.geoPointValue,e.geoPointValue);case 9:return hh(s.arrayValue,e.arrayValue);case 10:return function(r,o){var l,u,h,f;const p=r.fields||{},m=o.fields||{},v=(l=p[wi])===null||l===void 0?void 0:l.arrayValue,S=(u=m[wi])===null||u===void 0?void 0:u.arrayValue,N=z(((h=v==null?void 0:v.values)===null||h===void 0?void 0:h.length)||0,((f=S==null?void 0:S.values)===null||f===void 0?void 0:f.length)||0);return N!==0?N:hh(v,S)}(s.mapValue,e.mapValue);case 11:return function(r,o){if(r===Ft.mapValue&&o===Ft.mapValue)return 0;if(r===Ft.mapValue)return 1;if(o===Ft.mapValue)return-1;const l=r.fields||{},u=Object.keys(l),h=o.fields||{},f=Object.keys(h);u.sort(),f.sort();for(let p=0;p<u.length&&p<f.length;++p){const m=La(u[p],f[p]);if(m!==0)return m;const v=Wt(l[u[p]],h[f[p]]);if(v!==0)return v}return z(u.length,f.length)}(s.mapValue,e.mapValue);default:throw F(23264,{le:t})}}function ch(s,e){if(typeof s=="string"&&typeof e=="string"&&s.length===e.length)return z(s,e);const t=Gt(s),n=Gt(e),i=z(t.seconds,n.seconds);return i!==0?i:z(t.nanos,n.nanos)}function hh(s,e){const t=s.values||[],n=e.values||[];for(let i=0;i<t.length&&i<n.length;++i){const r=Wt(t[i],n[i]);if(r)return r}return z(t.length,n.length)}function cs(s){return Ka(s)}function Ka(s){return"nullValue"in s?"null":"booleanValue"in s?""+s.booleanValue:"integerValue"in s?""+s.integerValue:"doubleValue"in s?""+s.doubleValue:"timestampValue"in s?function(t){const n=Gt(t);return`time(${n.seconds},${n.nanos})`}(s.timestampValue):"stringValue"in s?s.stringValue:"bytesValue"in s?function(t){return Kt(t).toBase64()}(s.bytesValue):"referenceValue"in s?function(t){return O.fromName(t).toString()}(s.referenceValue):"geoPointValue"in s?function(t){return`geo(${t.latitude},${t.longitude})`}(s.geoPointValue):"arrayValue"in s?function(t){let n="[",i=!0;for(const r of t.values||[])i?i=!1:n+=",",n+=Ka(r);return n+"]"}(s.arrayValue):"mapValue"in s?function(t){const n=Object.keys(t.fields||{}).sort();let i="{",r=!0;for(const o of n)r?r=!1:i+=",",i+=`${o}:${Ka(t.fields[o])}`;return i+"}"}(s.mapValue):F(61005,{value:s})}function Nr(s){switch(En(s)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=Ol(s);return e?16+Nr(e):16;case 5:return 2*s.stringValue.length;case 6:return Kt(s.bytesValue).approximateByteSize();case 7:return s.referenceValue.length;case 9:return function(n){return(n.values||[]).reduce((i,r)=>i+Nr(r),0)}(s.arrayValue);case 10:case 11:return function(n){let i=0;return xn(n.fields,(r,o)=>{i+=r.length+Nr(o)}),i}(s.mapValue);default:throw F(13486,{value:s})}}function Ll(s,e){return{referenceValue:`projects/${s.projectId}/databases/${s.database}/documents/${e.path.canonicalString()}`}}function Wa(s){return!!s&&"integerValue"in s}function Ri(s){return!!s&&"arrayValue"in s}function dh(s){return!!s&&"nullValue"in s}function fh(s){return!!s&&"doubleValue"in s&&isNaN(Number(s.doubleValue))}function Vr(s){return!!s&&"mapValue"in s}function No(s){var e,t;return((t=(((e=s==null?void 0:s.mapValue)===null||e===void 0?void 0:e.fields)||{})[Ml])===null||t===void 0?void 0:t.stringValue)===Fl}function ai(s){if(s.geoPointValue)return{geoPointValue:Object.assign({},s.geoPointValue)};if(s.timestampValue&&typeof s.timestampValue=="object")return{timestampValue:Object.assign({},s.timestampValue)};if(s.mapValue){const e={mapValue:{fields:{}}};return xn(s.mapValue.fields,(t,n)=>e.mapValue.fields[t]=ai(n)),e}if(s.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(s.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=ai(s.arrayValue.values[t]);return e}return Object.assign({},s)}function Gf(s){return(((s.mapValue||{}).fields||{}).__type__||{}).stringValue===zf}const Kf={mapValue:{fields:{[Ml]:{stringValue:Fl},[wi]:{arrayValue:{}}}}};function Ny(s){return"nullValue"in s?xr:"booleanValue"in s?{booleanValue:!1}:"integerValue"in s||"doubleValue"in s?{doubleValue:NaN}:"timestampValue"in s?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in s?{stringValue:""}:"bytesValue"in s?{bytesValue:""}:"referenceValue"in s?Ll(us.empty(),O.empty()):"geoPointValue"in s?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in s?{arrayValue:{}}:"mapValue"in s?No(s)?Kf:{mapValue:{}}:F(35942,{value:s})}function Vy(s){return"nullValue"in s?{booleanValue:!1}:"booleanValue"in s?{doubleValue:NaN}:"integerValue"in s||"doubleValue"in s?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in s?{stringValue:""}:"stringValue"in s?{bytesValue:""}:"bytesValue"in s?Ll(us.empty(),O.empty()):"referenceValue"in s?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in s?{arrayValue:{}}:"arrayValue"in s?Kf:"mapValue"in s?No(s)?{mapValue:{}}:Ft:F(61959,{value:s})}function ph(s,e){const t=Wt(s.value,e.value);return t!==0?t:s.inclusive&&!e.inclusive?-1:!s.inclusive&&e.inclusive?1:0}function _h(s,e){const t=Wt(s.value,e.value);return t!==0?t:s.inclusive&&!e.inclusive?1:!s.inclusive&&e.inclusive?-1:0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ue{constructor(e){this.value=e}static empty(){return new Ue({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let n=0;n<e.length-1;++n)if(t=(t.mapValue.fields||{})[e.get(n)],!Vr(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=ai(t)}setAll(e){let t=de.emptyPath(),n={},i=[];e.forEach((o,l)=>{if(!t.isImmediateParentOf(l)){const u=this.getFieldsMap(t);this.applyChanges(u,n,i),n={},i=[],t=l.popLast()}o?n[l.lastSegment()]=ai(o):i.push(l.lastSegment())});const r=this.getFieldsMap(t);this.applyChanges(r,n,i)}delete(e){const t=this.field(e.popLast());Vr(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return _t(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let n=0;n<e.length;++n){let i=t.mapValue.fields[e.get(n)];Vr(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},t.mapValue.fields[e.get(n)]=i),t=i}return t.mapValue.fields}applyChanges(e,t,n){xn(t,(i,r)=>e[i]=r);for(const i of n)delete e[i]}clone(){return new Ue(ai(this.value))}}function Wf(s){const e=[];return xn(s.fields,(t,n)=>{const i=new de([t]);if(Vr(n)){const r=Wf(n.mapValue).fields;if(r.length===0)e.push(i);else for(const o of r)e.push(i.child(o))}else e.push(i)}),new Ke(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _e{constructor(e,t,n,i,r,o,l){this.key=e,this.documentType=t,this.version=n,this.readTime=i,this.createTime=r,this.data=o,this.documentState=l}static newInvalidDocument(e){return new _e(e,0,q.min(),q.min(),q.min(),Ue.empty(),0)}static newFoundDocument(e,t,n,i){return new _e(e,1,t,q.min(),n,i,0)}static newNoDocument(e,t){return new _e(e,2,t,q.min(),q.min(),Ue.empty(),0)}static newUnknownDocument(e,t){return new _e(e,3,t,q.min(),q.min(),Ue.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(q.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Ue.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Ue.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=q.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof _e&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new _e(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class hs{constructor(e,t){this.position=e,this.inclusive=t}}function mh(s,e,t){let n=0;for(let i=0;i<s.position.length;i++){const r=e[i],o=s.position[i];if(r.field.isKeyField()?n=O.comparator(O.fromName(o.referenceValue),t.key):n=Wt(o,t.data.field(r.field)),r.dir==="desc"&&(n*=-1),n!==0)break}return n}function gh(s,e){if(s===null)return e===null;if(e===null||s.inclusive!==e.inclusive||s.position.length!==e.position.length)return!1;for(let t=0;t<s.position.length;t++)if(!_t(s.position[t],e.position[t]))return!1;return!0}/**
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
 */class Hr{constructor(e,t="asc"){this.field=e,this.dir=t}}function Dy(s,e){return s.dir===e.dir&&s.field.isEqual(e.field)}/**
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
 */class $f{}class Y extends $f{constructor(e,t,n){super(),this.field=e,this.op=t,this.value=n}static create(e,t,n){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,n):new ky(e,t,n):t==="array-contains"?new Fy(e,n):t==="in"?new Zf(e,n):t==="not-in"?new Ly(e,n):t==="array-contains-any"?new Uy(e,n):new Y(e,t,n)}static createKeyFieldInFilter(e,t,n){return t==="in"?new Oy(e,n):new My(e,n)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(Wt(t,this.value)):t!==null&&En(this.value)===En(t)&&this.matchesComparison(Wt(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return F(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class ie extends $f{constructor(e,t){super(),this.filters=e,this.op=t,this.he=null}static create(e,t){return new ie(e,t)}matches(e){return ds(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.he!==null||(this.he=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.he}getFilters(){return Object.assign([],this.filters)}}function ds(s){return s.op==="and"}function $a(s){return s.op==="or"}function Ul(s){return Qf(s)&&ds(s)}function Qf(s){for(const e of s.filters)if(e instanceof ie)return!1;return!0}function Qa(s){if(s instanceof Y)return s.field.canonicalString()+s.op.toString()+cs(s.value);if(Ul(s))return s.filters.map(e=>Qa(e)).join(",");{const e=s.filters.map(t=>Qa(t)).join(",");return`${s.op}(${e})`}}function Hf(s,e){return s instanceof Y?function(n,i){return i instanceof Y&&n.op===i.op&&n.field.isEqual(i.field)&&_t(n.value,i.value)}(s,e):s instanceof ie?function(n,i){return i instanceof ie&&n.op===i.op&&n.filters.length===i.filters.length?n.filters.reduce((r,o,l)=>r&&Hf(o,i.filters[l]),!0):!1}(s,e):void F(19439)}function Yf(s,e){const t=s.filters.concat(e);return ie.create(t,s.op)}function Xf(s){return s instanceof Y?function(t){return`${t.field.canonicalString()} ${t.op} ${cs(t.value)}`}(s):s instanceof ie?function(t){return t.op.toString()+" {"+t.getFilters().map(Xf).join(" ,")+"}"}(s):"Filter"}class ky extends Y{constructor(e,t,n){super(e,t,n),this.key=O.fromName(n.referenceValue)}matches(e){const t=O.comparator(e.key,this.key);return this.matchesComparison(t)}}class Oy extends Y{constructor(e,t){super(e,"in",t),this.keys=Jf("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class My extends Y{constructor(e,t){super(e,"not-in",t),this.keys=Jf("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function Jf(s,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(n=>O.fromName(n.referenceValue))}class Fy extends Y{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Ri(t)&&Ai(t.arrayValue,this.value)}}class Zf extends Y{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Ai(this.value.arrayValue,t)}}class Ly extends Y{constructor(e,t){super(e,"not-in",t)}matches(e){if(Ai(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!Ai(this.value.arrayValue,t)}}class Uy extends Y{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Ri(t)||!t.arrayValue.values)&&t.arrayValue.values.some(n=>Ai(this.value.arrayValue,n))}}/**
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
 */class By{constructor(e,t=null,n=[],i=[],r=null,o=null,l=null){this.path=e,this.collectionGroup=t,this.orderBy=n,this.filters=i,this.limit=r,this.startAt=o,this.endAt=l,this.Pe=null}}function Ha(s,e=null,t=[],n=[],i=null,r=null,o=null){return new By(s,e,t,n,i,r,o)}function In(s){const e=U(s);if(e.Pe===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(n=>Qa(n)).join(","),t+="|ob:",t+=e.orderBy.map(n=>function(r){return r.field.canonicalString()+r.dir}(n)).join(","),So(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(n=>cs(n)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(n=>cs(n)).join(",")),e.Pe=t}return e.Pe}function Bi(s,e){if(s.limit!==e.limit||s.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<s.orderBy.length;t++)if(!Dy(s.orderBy[t],e.orderBy[t]))return!1;if(s.filters.length!==e.filters.length)return!1;for(let t=0;t<s.filters.length;t++)if(!Hf(s.filters[t],e.filters[t]))return!1;return s.collectionGroup===e.collectionGroup&&!!s.path.isEqual(e.path)&&!!gh(s.startAt,e.startAt)&&gh(s.endAt,e.endAt)}function Yr(s){return O.isDocumentKey(s.path)&&s.collectionGroup===null&&s.filters.length===0}function Xr(s,e){return s.filters.filter(t=>t instanceof Y&&t.field.isEqual(e))}function yh(s,e,t){let n=xr,i=!0;for(const r of Xr(s,e)){let o=xr,l=!0;switch(r.op){case"<":case"<=":o=Ny(r.value);break;case"==":case"in":case">=":o=r.value;break;case">":o=r.value,l=!1;break;case"!=":case"not-in":o=xr}ph({value:n,inclusive:i},{value:o,inclusive:l})<0&&(n=o,i=l)}if(t!==null){for(let r=0;r<s.orderBy.length;++r)if(s.orderBy[r].field.isEqual(e)){const o=t.position[r];ph({value:n,inclusive:i},{value:o,inclusive:t.inclusive})<0&&(n=o,i=t.inclusive);break}}return{value:n,inclusive:i}}function Eh(s,e,t){let n=Ft,i=!0;for(const r of Xr(s,e)){let o=Ft,l=!0;switch(r.op){case">=":case">":o=Vy(r.value),l=!1;break;case"==":case"in":case"<=":o=r.value;break;case"<":o=r.value,l=!1;break;case"!=":case"not-in":o=Ft}_h({value:n,inclusive:i},{value:o,inclusive:l})>0&&(n=o,i=l)}if(t!==null){for(let r=0;r<s.orderBy.length;++r)if(s.orderBy[r].field.isEqual(e)){const o=t.position[r];_h({value:n,inclusive:i},{value:o,inclusive:t.inclusive})>0&&(n=o,i=t.inclusive);break}}return{value:n,inclusive:i}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vo{constructor(e,t=null,n=[],i=[],r=null,o="F",l=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=n,this.filters=i,this.limit=r,this.limitType=o,this.startAt=l,this.endAt=u,this.Te=null,this.Ie=null,this.de=null,this.startAt,this.endAt}}function ep(s,e,t,n,i,r,o,l){return new Vo(s,e,t,n,i,r,o,l)}function Bl(s){return new Vo(s)}function Ih(s){return s.filters.length===0&&s.limit===null&&s.startAt==null&&s.endAt==null&&(s.explicitOrderBy.length===0||s.explicitOrderBy.length===1&&s.explicitOrderBy[0].field.isKeyField())}function qy(s){return s.collectionGroup!==null}function li(s){const e=U(s);if(e.Te===null){e.Te=[];const t=new Set;for(const r of e.explicitOrderBy)e.Te.push(r),t.add(r.field.canonicalString());const n=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let l=new ne(de.comparator);return o.filters.forEach(u=>{u.getFlattenedFilters().forEach(h=>{h.isInequality()&&(l=l.add(h.field))})}),l})(e).forEach(r=>{t.has(r.canonicalString())||r.isKeyField()||e.Te.push(new Hr(r,n))}),t.has(de.keyField().canonicalString())||e.Te.push(new Hr(de.keyField(),n))}return e.Te}function tt(s){const e=U(s);return e.Ie||(e.Ie=jy(e,li(s))),e.Ie}function jy(s,e){if(s.limitType==="F")return Ha(s.path,s.collectionGroup,e,s.filters,s.limit,s.startAt,s.endAt);{e=e.map(i=>{const r=i.dir==="desc"?"asc":"desc";return new Hr(i.field,r)});const t=s.endAt?new hs(s.endAt.position,s.endAt.inclusive):null,n=s.startAt?new hs(s.startAt.position,s.startAt.inclusive):null;return Ha(s.path,s.collectionGroup,e,s.filters,s.limit,t,n)}}function Ya(s,e,t){return new Vo(s.path,s.collectionGroup,s.explicitOrderBy.slice(),s.filters.slice(),e,t,s.startAt,s.endAt)}function ql(s,e){return Bi(tt(s),tt(e))&&s.limitType===e.limitType}function tp(s){return`${In(tt(s))}|lt:${s.limitType}`}function zs(s){return`Query(target=${function(t){let n=t.path.canonicalString();return t.collectionGroup!==null&&(n+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(n+=`, filters: [${t.filters.map(i=>Xf(i)).join(", ")}]`),So(t.limit)||(n+=", limit: "+t.limit),t.orderBy.length>0&&(n+=`, orderBy: [${t.orderBy.map(i=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(i)).join(", ")}]`),t.startAt&&(n+=", startAt: ",n+=t.startAt.inclusive?"b:":"a:",n+=t.startAt.position.map(i=>cs(i)).join(",")),t.endAt&&(n+=", endAt: ",n+=t.endAt.inclusive?"a:":"b:",n+=t.endAt.position.map(i=>cs(i)).join(",")),`Target(${n})`}(tt(s))}; limitType=${s.limitType})`}function qi(s,e){return e.isFoundDocument()&&function(n,i){const r=i.key.path;return n.collectionGroup!==null?i.key.hasCollectionId(n.collectionGroup)&&n.path.isPrefixOf(r):O.isDocumentKey(n.path)?n.path.isEqual(r):n.path.isImmediateParentOf(r)}(s,e)&&function(n,i){for(const r of li(n))if(!r.field.isKeyField()&&i.data.field(r.field)===null)return!1;return!0}(s,e)&&function(n,i){for(const r of n.filters)if(!r.matches(i))return!1;return!0}(s,e)&&function(n,i){return!(n.startAt&&!function(o,l,u){const h=mh(o,l,u);return o.inclusive?h<=0:h<0}(n.startAt,li(n),i)||n.endAt&&!function(o,l,u){const h=mh(o,l,u);return o.inclusive?h>=0:h>0}(n.endAt,li(n),i))}(s,e)}function np(s){return s.collectionGroup||(s.path.length%2==1?s.path.lastSegment():s.path.get(s.path.length-2))}function sp(s){return(e,t)=>{let n=!1;for(const i of li(s)){const r=zy(i,e,t);if(r!==0)return r;n=n||i.field.isKeyField()}return 0}}function zy(s,e,t){const n=s.field.isKeyField()?O.comparator(e.key,t.key):function(r,o,l){const u=o.data.field(r),h=l.data.field(r);return u!==null&&h!==null?Wt(u,h):F(42886)}(s.field,e,t);switch(s.dir){case"asc":return n;case"desc":return-1*n;default:return F(19790,{direction:s.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class St{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),n=this.inner[t];if(n!==void 0){for(const[i,r]of n)if(this.equalsFn(i,e))return r}}has(e){return this.get(e)!==void 0}set(e,t){const n=this.mapKeyFn(e),i=this.inner[n];if(i===void 0)return this.inner[n]=[[e,t]],void this.innerSize++;for(let r=0;r<i.length;r++)if(this.equalsFn(i[r][0],e))return void(i[r]=[e,t]);i.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),n=this.inner[t];if(n===void 0)return!1;for(let i=0;i<n.length;i++)if(this.equalsFn(n[i][0],e))return n.length===1?delete this.inner[t]:n.splice(i,1),this.innerSize--,!0;return!1}forEach(e){xn(this.inner,(t,n)=>{for(const[i,r]of n)e(i,r)})}isEmpty(){return Ff(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gy=new fe(O.comparator);function Je(){return Gy}const ip=new fe(O.comparator);function ei(...s){let e=ip;for(const t of s)e=e.insert(t.key,t);return e}function rp(s){let e=ip;return s.forEach((t,n)=>e=e.insert(t,n.overlayedDocument)),e}function pt(){return ui()}function op(){return ui()}function ui(){return new St(s=>s.toString(),(s,e)=>s.isEqual(e))}const Ky=new fe(O.comparator),Wy=new ne(O.comparator);function W(...s){let e=Wy;for(const t of s)e=e.add(t);return e}const $y=new ne(z);function jl(){return $y}/**
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
 */function zl(s,e){if(s.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Ei(e)?"-0":e}}function ap(s){return{integerValue:""+s}}function Qy(s,e){return Cf(e)?ap(e):zl(s,e)}/**
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
 */class Do{constructor(){this._=void 0}}function Hy(s,e,t){return s instanceof Ci?function(i,r){const o={fields:{[Bf]:{stringValue:Uf},[jf]:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return r&&kl(r)&&(r=Ol(r)),r&&(o.fields[qf]=r),{mapValue:o}}(t,e):s instanceof fs?up(s,e):s instanceof ps?cp(s,e):function(i,r){const o=lp(i,r),l=Th(o)+Th(i.Ee);return Wa(o)&&Wa(i.Ee)?ap(l):zl(i.serializer,l)}(s,e)}function Yy(s,e,t){return s instanceof fs?up(s,e):s instanceof ps?cp(s,e):t}function lp(s,e){return s instanceof Si?function(n){return Wa(n)||function(r){return!!r&&"doubleValue"in r}(n)}(e)?e:{integerValue:0}:null}class Ci extends Do{}class fs extends Do{constructor(e){super(),this.elements=e}}function up(s,e){const t=hp(e);for(const n of s.elements)t.some(i=>_t(i,n))||t.push(n);return{arrayValue:{values:t}}}class ps extends Do{constructor(e){super(),this.elements=e}}function cp(s,e){let t=hp(e);for(const n of s.elements)t=t.filter(i=>!_t(i,n));return{arrayValue:{values:t}}}class Si extends Do{constructor(e,t){super(),this.serializer=e,this.Ee=t}}function Th(s){return Ee(s.integerValue||s.doubleValue)}function hp(s){return Ri(s)&&s.arrayValue.values?s.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xy{constructor(e,t){this.field=e,this.transform=t}}function Jy(s,e){return s.field.isEqual(e.field)&&function(n,i){return n instanceof fs&&i instanceof fs||n instanceof ps&&i instanceof ps?ss(n.elements,i.elements,_t):n instanceof Si&&i instanceof Si?_t(n.Ee,i.Ee):n instanceof Ci&&i instanceof Ci}(s.transform,e.transform)}class Zy{constructor(e,t){this.version=e,this.transformResults=t}}class We{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new We}static exists(e){return new We(void 0,e)}static updateTime(e){return new We(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Dr(s,e){return s.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(s.updateTime):s.exists===void 0||s.exists===e.isFoundDocument()}class ko{}function dp(s,e){if(!s.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return s.isNoDocument()?new Gl(s.key,We.none()):new Is(s.key,s.data,We.none());{const t=s.data,n=Ue.empty();let i=new ne(de.comparator);for(let r of e.fields)if(!i.has(r)){let o=t.field(r);o===null&&r.length>1&&(r=r.popLast(),o=t.field(r)),o===null?n.delete(r):n.set(r,o),i=i.add(r)}return new Pt(s.key,n,new Ke(i.toArray()),We.none())}}function eE(s,e,t){s instanceof Is?function(i,r,o){const l=i.value.clone(),u=wh(i.fieldTransforms,r,o.transformResults);l.setAll(u),r.convertToFoundDocument(o.version,l).setHasCommittedMutations()}(s,e,t):s instanceof Pt?function(i,r,o){if(!Dr(i.precondition,r))return void r.convertToUnknownDocument(o.version);const l=wh(i.fieldTransforms,r,o.transformResults),u=r.data;u.setAll(fp(i)),u.setAll(l),r.convertToFoundDocument(o.version,u).setHasCommittedMutations()}(s,e,t):function(i,r,o){r.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,t)}function ci(s,e,t,n){return s instanceof Is?function(r,o,l,u){if(!Dr(r.precondition,o))return l;const h=r.value.clone(),f=Ah(r.fieldTransforms,u,o);return h.setAll(f),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),null}(s,e,t,n):s instanceof Pt?function(r,o,l,u){if(!Dr(r.precondition,o))return l;const h=Ah(r.fieldTransforms,u,o),f=o.data;return f.setAll(fp(r)),f.setAll(h),o.convertToFoundDocument(o.version,f).setHasLocalMutations(),l===null?null:l.unionWith(r.fieldMask.fields).unionWith(r.fieldTransforms.map(p=>p.field))}(s,e,t,n):function(r,o,l){return Dr(r.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):l}(s,e,t)}function tE(s,e){let t=null;for(const n of s.fieldTransforms){const i=e.data.field(n.field),r=lp(n.transform,i||null);r!=null&&(t===null&&(t=Ue.empty()),t.set(n.field,r))}return t||null}function vh(s,e){return s.type===e.type&&!!s.key.isEqual(e.key)&&!!s.precondition.isEqual(e.precondition)&&!!function(n,i){return n===void 0&&i===void 0||!(!n||!i)&&ss(n,i,(r,o)=>Jy(r,o))}(s.fieldTransforms,e.fieldTransforms)&&(s.type===0?s.value.isEqual(e.value):s.type!==1||s.data.isEqual(e.data)&&s.fieldMask.isEqual(e.fieldMask))}class Is extends ko{constructor(e,t,n,i=[]){super(),this.key=e,this.value=t,this.precondition=n,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class Pt extends ko{constructor(e,t,n,i,r=[]){super(),this.key=e,this.data=t,this.fieldMask=n,this.precondition=i,this.fieldTransforms=r,this.type=1}getFieldMask(){return this.fieldMask}}function fp(s){const e=new Map;return s.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const n=s.data.field(t);e.set(t,n)}}),e}function wh(s,e,t){const n=new Map;L(s.length===t.length,32656,{Ae:t.length,Re:s.length});for(let i=0;i<t.length;i++){const r=s[i],o=r.transform,l=e.data.field(r.field);n.set(r.field,Yy(o,l,t[i]))}return n}function Ah(s,e,t){const n=new Map;for(const i of s){const r=i.transform,o=t.data.field(i.field);n.set(i.field,Hy(r,o,e))}return n}class Gl extends ko{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class pp extends ko{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kl{constructor(e,t,n,i){this.batchId=e,this.localWriteTime=t,this.baseMutations=n,this.mutations=i}applyToRemoteDocument(e,t){const n=t.mutationResults;for(let i=0;i<this.mutations.length;i++){const r=this.mutations[i];r.key.isEqual(e.key)&&eE(r,e,n[i])}}applyToLocalView(e,t){for(const n of this.baseMutations)n.key.isEqual(e.key)&&(t=ci(n,e,t,this.localWriteTime));for(const n of this.mutations)n.key.isEqual(e.key)&&(t=ci(n,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const n=op();return this.mutations.forEach(i=>{const r=e.get(i.key),o=r.overlayedDocument;let l=this.applyToLocalView(o,r.mutatedFields);l=t.has(i.key)?null:l;const u=dp(o,l);u!==null&&n.set(i.key,u),o.isValidDocument()||o.convertToNoDocument(q.min())}),n}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),W())}isEqual(e){return this.batchId===e.batchId&&ss(this.mutations,e.mutations,(t,n)=>vh(t,n))&&ss(this.baseMutations,e.baseMutations,(t,n)=>vh(t,n))}}class Wl{constructor(e,t,n,i){this.batch=e,this.commitVersion=t,this.mutationResults=n,this.docVersions=i}static from(e,t,n){L(e.mutations.length===n.length,58842,{Ve:e.mutations.length,me:n.length});let i=function(){return Ky}();const r=e.mutations;for(let o=0;o<r.length;o++)i=i.insert(r[o].key,n[o].version);return new Wl(e,t,n,i)}}/**
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
 */class $l{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
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
 */class nE{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ye,X;function sE(s){switch(s){case b.OK:return F(64938);case b.CANCELLED:case b.UNKNOWN:case b.DEADLINE_EXCEEDED:case b.RESOURCE_EXHAUSTED:case b.INTERNAL:case b.UNAVAILABLE:case b.UNAUTHENTICATED:return!1;case b.INVALID_ARGUMENT:case b.NOT_FOUND:case b.ALREADY_EXISTS:case b.PERMISSION_DENIED:case b.FAILED_PRECONDITION:case b.ABORTED:case b.OUT_OF_RANGE:case b.UNIMPLEMENTED:case b.DATA_LOSS:return!0;default:return F(15467,{code:s})}}function _p(s){if(s===void 0)return Te("GRPC error has no .code"),b.UNKNOWN;switch(s){case ye.OK:return b.OK;case ye.CANCELLED:return b.CANCELLED;case ye.UNKNOWN:return b.UNKNOWN;case ye.DEADLINE_EXCEEDED:return b.DEADLINE_EXCEEDED;case ye.RESOURCE_EXHAUSTED:return b.RESOURCE_EXHAUSTED;case ye.INTERNAL:return b.INTERNAL;case ye.UNAVAILABLE:return b.UNAVAILABLE;case ye.UNAUTHENTICATED:return b.UNAUTHENTICATED;case ye.INVALID_ARGUMENT:return b.INVALID_ARGUMENT;case ye.NOT_FOUND:return b.NOT_FOUND;case ye.ALREADY_EXISTS:return b.ALREADY_EXISTS;case ye.PERMISSION_DENIED:return b.PERMISSION_DENIED;case ye.FAILED_PRECONDITION:return b.FAILED_PRECONDITION;case ye.ABORTED:return b.ABORTED;case ye.OUT_OF_RANGE:return b.OUT_OF_RANGE;case ye.UNIMPLEMENTED:return b.UNIMPLEMENTED;case ye.DATA_LOSS:return b.DATA_LOSS;default:return F(39323,{code:s})}}(X=ye||(ye={}))[X.OK=0]="OK",X[X.CANCELLED=1]="CANCELLED",X[X.UNKNOWN=2]="UNKNOWN",X[X.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",X[X.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",X[X.NOT_FOUND=5]="NOT_FOUND",X[X.ALREADY_EXISTS=6]="ALREADY_EXISTS",X[X.PERMISSION_DENIED=7]="PERMISSION_DENIED",X[X.UNAUTHENTICATED=16]="UNAUTHENTICATED",X[X.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",X[X.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",X[X.ABORTED=10]="ABORTED",X[X.OUT_OF_RANGE=11]="OUT_OF_RANGE",X[X.UNIMPLEMENTED=12]="UNIMPLEMENTED",X[X.INTERNAL=13]="INTERNAL",X[X.UNAVAILABLE=14]="UNAVAILABLE",X[X.DATA_LOSS=15]="DATA_LOSS";/**
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
 */const iE=new Lt([4294967295,4294967295],0);function Rh(s){const e=yf().encode(s),t=new hf;return t.update(e),new Uint8Array(t.digest())}function Ch(s){const e=new DataView(s.buffer),t=e.getUint32(0,!0),n=e.getUint32(4,!0),i=e.getUint32(8,!0),r=e.getUint32(12,!0);return[new Lt([t,n],0),new Lt([i,r],0)]}class Ql{constructor(e,t,n){if(this.bitmap=e,this.padding=t,this.hashCount=n,t<0||t>=8)throw new ti(`Invalid padding: ${t}`);if(n<0)throw new ti(`Invalid hash count: ${n}`);if(e.length>0&&this.hashCount===0)throw new ti(`Invalid hash count: ${n}`);if(e.length===0&&t!==0)throw new ti(`Invalid padding when bitmap length is 0: ${t}`);this.fe=8*e.length-t,this.ge=Lt.fromNumber(this.fe)}pe(e,t,n){let i=e.add(t.multiply(Lt.fromNumber(n)));return i.compare(iE)===1&&(i=new Lt([i.getBits(0),i.getBits(1)],0)),i.modulo(this.ge).toNumber()}ye(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.fe===0)return!1;const t=Rh(e),[n,i]=Ch(t);for(let r=0;r<this.hashCount;r++){const o=this.pe(n,i,r);if(!this.ye(o))return!1}return!0}static create(e,t,n){const i=e%8==0?0:8-e%8,r=new Uint8Array(Math.ceil(e/8)),o=new Ql(r,i,t);return n.forEach(l=>o.insert(l)),o}insert(e){if(this.fe===0)return;const t=Rh(e),[n,i]=Ch(t);for(let r=0;r<this.hashCount;r++){const o=this.pe(n,i,r);this.we(o)}}we(e){const t=Math.floor(e/8),n=e%8;this.bitmap[t]|=1<<n}}class ti extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ji{constructor(e,t,n,i,r){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=n,this.documentUpdates=i,this.resolvedLimboDocuments=r}static createSynthesizedRemoteEventForCurrentChange(e,t,n){const i=new Map;return i.set(e,zi.createSynthesizedTargetChangeForCurrentChange(e,t,n)),new ji(q.min(),i,new fe(z),Je(),W())}}class zi{constructor(e,t,n,i,r){this.resumeToken=e,this.current=t,this.addedDocuments=n,this.modifiedDocuments=i,this.removedDocuments=r}static createSynthesizedTargetChangeForCurrentChange(e,t,n){return new zi(n,t,W(),W(),W())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kr{constructor(e,t,n,i){this.Se=e,this.removedTargetIds=t,this.key=n,this.be=i}}class mp{constructor(e,t){this.targetId=e,this.De=t}}class gp{constructor(e,t,n=ge.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=t,this.resumeToken=n,this.cause=i}}class Sh{constructor(){this.ve=0,this.Ce=Ph(),this.Fe=ge.EMPTY_BYTE_STRING,this.Me=!1,this.xe=!0}get current(){return this.Me}get resumeToken(){return this.Fe}get Oe(){return this.ve!==0}get Ne(){return this.xe}Be(e){e.approximateByteSize()>0&&(this.xe=!0,this.Fe=e)}Le(){let e=W(),t=W(),n=W();return this.Ce.forEach((i,r)=>{switch(r){case 0:e=e.add(i);break;case 2:t=t.add(i);break;case 1:n=n.add(i);break;default:F(38017,{changeType:r})}}),new zi(this.Fe,this.Me,e,t,n)}ke(){this.xe=!1,this.Ce=Ph()}qe(e,t){this.xe=!0,this.Ce=this.Ce.insert(e,t)}Qe(e){this.xe=!0,this.Ce=this.Ce.remove(e)}$e(){this.ve+=1}Ue(){this.ve-=1,L(this.ve>=0,3241,{ve:this.ve})}Ke(){this.xe=!0,this.Me=!0}}class rE{constructor(e){this.We=e,this.Ge=new Map,this.ze=Je(),this.je=yr(),this.Je=yr(),this.He=new fe(z)}Ye(e){for(const t of e.Se)e.be&&e.be.isFoundDocument()?this.Ze(t,e.be):this.Xe(t,e.key,e.be);for(const t of e.removedTargetIds)this.Xe(t,e.key,e.be)}et(e){this.forEachTarget(e,t=>{const n=this.tt(t);switch(e.state){case 0:this.nt(t)&&n.Be(e.resumeToken);break;case 1:n.Ue(),n.Oe||n.ke(),n.Be(e.resumeToken);break;case 2:n.Ue(),n.Oe||this.removeTarget(t);break;case 3:this.nt(t)&&(n.Ke(),n.Be(e.resumeToken));break;case 4:this.nt(t)&&(this.rt(t),n.Be(e.resumeToken));break;default:F(56790,{state:e.state})}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Ge.forEach((n,i)=>{this.nt(i)&&t(i)})}it(e){const t=e.targetId,n=e.De.count,i=this.st(t);if(i){const r=i.target;if(Yr(r))if(n===0){const o=new O(r.path);this.Xe(t,o,_e.newNoDocument(o,q.min()))}else L(n===1,20013,{expectedCount:n});else{const o=this.ot(t);if(o!==n){const l=this._t(e),u=l?this.ut(l,e,o):1;if(u!==0){this.rt(t);const h=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.He=this.He.insert(t,h)}}}}}_t(e){const t=e.De.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:n="",padding:i=0},hashCount:r=0}=t;let o,l;try{o=Kt(n).toUint8Array()}catch(u){if(u instanceof Lf)return zt("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{l=new Ql(o,i,r)}catch(u){return zt(u instanceof ti?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return l.fe===0?null:l}ut(e,t,n){return t.De.count===n-this.ht(e,t.targetId)?0:2}ht(e,t){const n=this.We.getRemoteKeysForTarget(t);let i=0;return n.forEach(r=>{const o=this.We.lt(),l=`projects/${o.projectId}/databases/${o.database}/documents/${r.path.canonicalString()}`;e.mightContain(l)||(this.Xe(t,r,null),i++)}),i}Pt(e){const t=new Map;this.Ge.forEach((r,o)=>{const l=this.st(o);if(l){if(r.current&&Yr(l.target)){const u=new O(l.target.path);this.Tt(u).has(o)||this.It(o,u)||this.Xe(o,u,_e.newNoDocument(u,e))}r.Ne&&(t.set(o,r.Le()),r.ke())}});let n=W();this.Je.forEach((r,o)=>{let l=!0;o.forEachWhile(u=>{const h=this.st(u);return!h||h.purpose==="TargetPurposeLimboResolution"||(l=!1,!1)}),l&&(n=n.add(r))}),this.ze.forEach((r,o)=>o.setReadTime(e));const i=new ji(e,t,this.He,this.ze,n);return this.ze=Je(),this.je=yr(),this.Je=yr(),this.He=new fe(z),i}Ze(e,t){if(!this.nt(e))return;const n=this.It(e,t.key)?2:0;this.tt(e).qe(t.key,n),this.ze=this.ze.insert(t.key,t),this.je=this.je.insert(t.key,this.Tt(t.key).add(e)),this.Je=this.Je.insert(t.key,this.dt(t.key).add(e))}Xe(e,t,n){if(!this.nt(e))return;const i=this.tt(e);this.It(e,t)?i.qe(t,1):i.Qe(t),this.Je=this.Je.insert(t,this.dt(t).delete(e)),this.Je=this.Je.insert(t,this.dt(t).add(e)),n&&(this.ze=this.ze.insert(t,n))}removeTarget(e){this.Ge.delete(e)}ot(e){const t=this.tt(e).Le();return this.We.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}$e(e){this.tt(e).$e()}tt(e){let t=this.Ge.get(e);return t||(t=new Sh,this.Ge.set(e,t)),t}dt(e){let t=this.Je.get(e);return t||(t=new ne(z),this.Je=this.Je.insert(e,t)),t}Tt(e){let t=this.je.get(e);return t||(t=new ne(z),this.je=this.je.insert(e,t)),t}nt(e){const t=this.st(e)!==null;return t||x("WatchChangeAggregator","Detected inactive target",e),t}st(e){const t=this.Ge.get(e);return t&&t.Oe?null:this.We.Et(e)}rt(e){this.Ge.set(e,new Sh),this.We.getRemoteKeysForTarget(e).forEach(t=>{this.Xe(e,t,null)})}It(e,t){return this.We.getRemoteKeysForTarget(e).has(t)}}function yr(){return new fe(O.comparator)}function Ph(){return new fe(O.comparator)}const oE={asc:"ASCENDING",desc:"DESCENDING"},aE={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},lE={and:"AND",or:"OR"};class uE{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function Xa(s,e){return s.useProto3Json||So(e)?e:{value:e}}function _s(s,e){return s.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function yp(s,e){return s.useProto3Json?e.toBase64():e.toUint8Array()}function cE(s,e){return _s(s,e.toTimestamp())}function ze(s){return L(!!s,49232),q.fromTimestamp(function(t){const n=Gt(t);return new se(n.seconds,n.nanos)}(s))}function Hl(s,e){return Ja(s,e).canonicalString()}function Ja(s,e){const t=function(i){return new oe(["projects",i.projectId,"databases",i.database])}(s).child("documents");return e===void 0?t:t.child(e)}function Ep(s){const e=oe.fromString(s);return L(EE(e),10190,{key:e.toString()}),e}function Jr(s,e){return Hl(s.databaseId,e.path)}function gn(s,e){const t=Ep(e);if(t.get(1)!==s.databaseId.projectId)throw new M(b.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+s.databaseId.projectId);if(t.get(3)!==s.databaseId.database)throw new M(b.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+s.databaseId.database);return new O(vp(t))}function Ip(s,e){return Hl(s.databaseId,e)}function Tp(s){const e=Ep(s);return e.length===4?oe.emptyPath():vp(e)}function Za(s){return new oe(["projects",s.databaseId.projectId,"databases",s.databaseId.database]).canonicalString()}function vp(s){return L(s.length>4&&s.get(4)==="documents",29091,{key:s.toString()}),s.popFirst(5)}function bh(s,e,t){return{name:Jr(s,e),fields:t.value.mapValue.fields}}function hE(s,e,t){const n=gn(s,e.name),i=ze(e.updateTime),r=e.createTime?ze(e.createTime):q.min(),o=new Ue({mapValue:{fields:e.fields}}),l=_e.newFoundDocument(n,i,r,o);return t&&l.setHasCommittedMutations(),t?l.setHasCommittedMutations():l}function dE(s,e){let t;if("targetChange"in e){e.targetChange;const n=function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:F(39313,{state:h})}(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],r=function(h,f){return h.useProto3Json?(L(f===void 0||typeof f=="string",58123),ge.fromBase64String(f||"")):(L(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),ge.fromUint8Array(f||new Uint8Array))}(s,e.targetChange.resumeToken),o=e.targetChange.cause,l=o&&function(h){const f=h.code===void 0?b.UNKNOWN:_p(h.code);return new M(f,h.message||"")}(o);t=new gp(n,i,r,l||null)}else if("documentChange"in e){e.documentChange;const n=e.documentChange;n.document,n.document.name,n.document.updateTime;const i=gn(s,n.document.name),r=ze(n.document.updateTime),o=n.document.createTime?ze(n.document.createTime):q.min(),l=new Ue({mapValue:{fields:n.document.fields}}),u=_e.newFoundDocument(i,r,o,l),h=n.targetIds||[],f=n.removedTargetIds||[];t=new kr(h,f,u.key,u)}else if("documentDelete"in e){e.documentDelete;const n=e.documentDelete;n.document;const i=gn(s,n.document),r=n.readTime?ze(n.readTime):q.min(),o=_e.newNoDocument(i,r),l=n.removedTargetIds||[];t=new kr([],l,o.key,o)}else if("documentRemove"in e){e.documentRemove;const n=e.documentRemove;n.document;const i=gn(s,n.document),r=n.removedTargetIds||[];t=new kr([],r,i,null)}else{if(!("filter"in e))return F(11601,{At:e});{e.filter;const n=e.filter;n.targetId;const{count:i=0,unchangedNames:r}=n,o=new nE(i,r),l=n.targetId;t=new mp(l,o)}}return t}function Zr(s,e){let t;if(e instanceof Is)t={update:bh(s,e.key,e.value)};else if(e instanceof Gl)t={delete:Jr(s,e.key)};else if(e instanceof Pt)t={update:bh(s,e.key,e.data),updateMask:yE(e.fieldMask)};else{if(!(e instanceof pp))return F(16599,{Rt:e.type});t={verify:Jr(s,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(n=>function(r,o){const l=o.transform;if(l instanceof Ci)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(l instanceof fs)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:l.elements}};if(l instanceof ps)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:l.elements}};if(l instanceof Si)return{fieldPath:o.field.canonicalString(),increment:l.Ee};throw F(20930,{transform:o.transform})}(0,n))),e.precondition.isNone||(t.currentDocument=function(i,r){return r.updateTime!==void 0?{updateTime:cE(i,r.updateTime)}:r.exists!==void 0?{exists:r.exists}:F(27497)}(s,e.precondition)),t}function el(s,e){const t=e.currentDocument?function(r){return r.updateTime!==void 0?We.updateTime(ze(r.updateTime)):r.exists!==void 0?We.exists(r.exists):We.none()}(e.currentDocument):We.none(),n=e.updateTransforms?e.updateTransforms.map(i=>function(o,l){let u=null;if("setToServerValue"in l)L(l.setToServerValue==="REQUEST_TIME",16630,{proto:l}),u=new Ci;else if("appendMissingElements"in l){const f=l.appendMissingElements.values||[];u=new fs(f)}else if("removeAllFromArray"in l){const f=l.removeAllFromArray.values||[];u=new ps(f)}else"increment"in l?u=new Si(o,l.increment):F(16584,{proto:l});const h=de.fromServerFormat(l.fieldPath);return new Xy(h,u)}(s,i)):[];if(e.update){e.update.name;const i=gn(s,e.update.name),r=new Ue({mapValue:{fields:e.update.fields}});if(e.updateMask){const o=function(u){const h=u.fieldPaths||[];return new Ke(h.map(f=>de.fromServerFormat(f)))}(e.updateMask);return new Pt(i,r,o,t,n)}return new Is(i,r,t,n)}if(e.delete){const i=gn(s,e.delete);return new Gl(i,t)}if(e.verify){const i=gn(s,e.verify);return new pp(i,t)}return F(1463,{proto:e})}function fE(s,e){return s&&s.length>0?(L(e!==void 0,14353),s.map(t=>function(i,r){let o=i.updateTime?ze(i.updateTime):ze(r);return o.isEqual(q.min())&&(o=ze(r)),new Zy(o,i.transformResults||[])}(t,e))):[]}function wp(s,e){return{documents:[Ip(s,e.path)]}}function Ap(s,e){const t={structuredQuery:{}},n=e.path;let i;e.collectionGroup!==null?(i=n,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(i=n.popLast(),t.structuredQuery.from=[{collectionId:n.lastSegment()}]),t.parent=Ip(s,i);const r=function(h){if(h.length!==0)return Sp(ie.create(h,"and"))}(e.filters);r&&(t.structuredQuery.where=r);const o=function(h){if(h.length!==0)return h.map(f=>function(m){return{field:Wn(m.field),direction:_E(m.dir)}}(f))}(e.orderBy);o&&(t.structuredQuery.orderBy=o);const l=Xa(s,e.limit);return l!==null&&(t.structuredQuery.limit=l),e.startAt&&(t.structuredQuery.startAt=function(h){return{before:h.inclusive,values:h.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(h){return{before:!h.inclusive,values:h.position}}(e.endAt)),{Vt:t,parent:i}}function Rp(s){let e=Tp(s.parent);const t=s.structuredQuery,n=t.from?t.from.length:0;let i=null;if(n>0){L(n===1,65062);const f=t.from[0];f.allDescendants?i=f.collectionId:e=e.child(f.collectionId)}let r=[];t.where&&(r=function(p){const m=Cp(p);return m instanceof ie&&Ul(m)?m.getFilters():[m]}(t.where));let o=[];t.orderBy&&(o=function(p){return p.map(m=>function(S){return new Hr($n(S.field),function(V){switch(V){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(S.direction))}(m))}(t.orderBy));let l=null;t.limit&&(l=function(p){let m;return m=typeof p=="object"?p.value:p,So(m)?null:m}(t.limit));let u=null;t.startAt&&(u=function(p){const m=!!p.before,v=p.values||[];return new hs(v,m)}(t.startAt));let h=null;return t.endAt&&(h=function(p){const m=!p.before,v=p.values||[];return new hs(v,m)}(t.endAt)),ep(e,i,o,r,l,"F",u,h)}function pE(s,e){const t=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return F(28987,{purpose:i})}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function Cp(s){return s.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const n=$n(t.unaryFilter.field);return Y.create(n,"==",{doubleValue:NaN});case"IS_NULL":const i=$n(t.unaryFilter.field);return Y.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const r=$n(t.unaryFilter.field);return Y.create(r,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=$n(t.unaryFilter.field);return Y.create(o,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return F(61313);default:return F(60726)}}(s):s.fieldFilter!==void 0?function(t){return Y.create($n(t.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return F(58110);default:return F(50506)}}(t.fieldFilter.op),t.fieldFilter.value)}(s):s.compositeFilter!==void 0?function(t){return ie.create(t.compositeFilter.filters.map(n=>Cp(n)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return F(1026)}}(t.compositeFilter.op))}(s):F(30097,{filter:s})}function _E(s){return oE[s]}function mE(s){return aE[s]}function gE(s){return lE[s]}function Wn(s){return{fieldPath:s.canonicalString()}}function $n(s){return de.fromServerFormat(s.fieldPath)}function Sp(s){return s instanceof Y?function(t){if(t.op==="=="){if(fh(t.value))return{unaryFilter:{field:Wn(t.field),op:"IS_NAN"}};if(dh(t.value))return{unaryFilter:{field:Wn(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(fh(t.value))return{unaryFilter:{field:Wn(t.field),op:"IS_NOT_NAN"}};if(dh(t.value))return{unaryFilter:{field:Wn(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Wn(t.field),op:mE(t.op),value:t.value}}}(s):s instanceof ie?function(t){const n=t.getFilters().map(i=>Sp(i));return n.length===1?n[0]:{compositeFilter:{op:gE(t.op),filters:n}}}(s):F(54877,{filter:s})}function yE(s){const e=[];return s.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function EE(s){return s.length>=4&&s.get(0)==="projects"&&s.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class It{constructor(e,t,n,i,r=q.min(),o=q.min(),l=ge.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=n,this.sequenceNumber=i,this.snapshotVersion=r,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=l,this.expectedCount=u}withSequenceNumber(e){return new It(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new It(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new It(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new It(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pp{constructor(e){this.gt=e}}function IE(s,e){let t;if(e.document)t=hE(s.gt,e.document,!!e.hasCommittedMutations);else if(e.noDocument){const n=O.fromSegments(e.noDocument.path),i=vn(e.noDocument.readTime);t=_e.newNoDocument(n,i),e.hasCommittedMutations&&t.setHasCommittedMutations()}else{if(!e.unknownDocument)return F(56709);{const n=O.fromSegments(e.unknownDocument.path),i=vn(e.unknownDocument.version);t=_e.newUnknownDocument(n,i)}}return e.readTime&&t.setReadTime(function(i){const r=new se(i[0],i[1]);return q.fromTimestamp(r)}(e.readTime)),t}function xh(s,e){const t=e.key,n={prefixPath:t.getCollectionPath().popLast().toArray(),collectionGroup:t.collectionGroup,documentId:t.path.lastSegment(),readTime:eo(e.readTime),hasCommittedMutations:e.hasCommittedMutations};if(e.isFoundDocument())n.document=function(r,o){return{name:Jr(r,o.key),fields:o.data.value.mapValue.fields,updateTime:_s(r,o.version.toTimestamp()),createTime:_s(r,o.createTime.toTimestamp())}}(s.gt,e);else if(e.isNoDocument())n.noDocument={path:t.path.toArray(),readTime:Tn(e.version)};else{if(!e.isUnknownDocument())return F(57904,{document:e});n.unknownDocument={path:t.path.toArray(),version:Tn(e.version)}}return n}function eo(s){const e=s.toTimestamp();return[e.seconds,e.nanoseconds]}function Tn(s){const e=s.toTimestamp();return{seconds:e.seconds,nanoseconds:e.nanoseconds}}function vn(s){const e=new se(s.seconds,s.nanoseconds);return q.fromTimestamp(e)}function cn(s,e){const t=(e.baseMutations||[]).map(r=>el(s.gt,r));for(let r=0;r<e.mutations.length-1;++r){const o=e.mutations[r];if(r+1<e.mutations.length&&e.mutations[r+1].transform!==void 0){const l=e.mutations[r+1];o.updateTransforms=l.transform.fieldTransforms,e.mutations.splice(r+1,1),++r}}const n=e.mutations.map(r=>el(s.gt,r)),i=se.fromMillis(e.localWriteTimeMs);return new Kl(e.batchId,i,t,n)}function ni(s){const e=vn(s.readTime),t=s.lastLimboFreeSnapshotVersion!==void 0?vn(s.lastLimboFreeSnapshotVersion):q.min();let n;return n=function(r){return r.documents!==void 0}(s.query)?function(r){const o=r.documents.length;return L(o===1,1966,{count:o}),tt(Bl(Tp(r.documents[0])))}(s.query):function(r){return tt(Rp(r))}(s.query),new It(n,s.targetId,"TargetPurposeListen",s.lastListenSequenceNumber,e,t,ge.fromBase64String(s.resumeToken))}function bp(s,e){const t=Tn(e.snapshotVersion),n=Tn(e.lastLimboFreeSnapshotVersion);let i;i=Yr(e.target)?wp(s.gt,e.target):Ap(s.gt,e.target).Vt;const r=e.resumeToken.toBase64();return{targetId:e.targetId,canonicalId:In(e.target),readTime:t,resumeToken:r,lastListenSequenceNumber:e.sequenceNumber,lastLimboFreeSnapshotVersion:n,query:i}}function xp(s){const e=Rp({parent:s.parent,structuredQuery:s.structuredQuery});return s.limitType==="LAST"?Ya(e,e.limit,"L"):e}function va(s,e){return new $l(e.largestBatchId,el(s.gt,e.overlayMutation))}function Nh(s,e){const t=e.path.lastSegment();return[s,Be(e.path.popLast()),t]}function Vh(s,e,t,n){return{indexId:s,uid:e,sequenceNumber:t,readTime:Tn(n.readTime),documentKey:Be(n.documentKey.path),largestBatchId:n.largestBatchId}}/**
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
 */class TE{getBundleMetadata(e,t){return Dh(e).get(t).next(n=>{if(n)return function(r){return{id:r.bundleId,createTime:vn(r.createTime),version:r.version}}(n)})}saveBundleMetadata(e,t){return Dh(e).put(function(i){return{bundleId:i.id,createTime:Tn(ze(i.createTime)),version:i.version}}(t))}getNamedQuery(e,t){return kh(e).get(t).next(n=>{if(n)return function(r){return{name:r.name,query:xp(r.bundledQuery),readTime:vn(r.readTime)}}(n)})}saveNamedQuery(e,t){return kh(e).put(function(i){return{name:i.name,readTime:Tn(ze(i.readTime)),bundledQuery:i.bundledQuery}}(t))}}function Dh(s){return we(s,Po)}function kh(s){return we(s,bo)}/**
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
 */class Oo{constructor(e,t){this.serializer=e,this.userId=t}static yt(e,t){const n=t.uid||"";return new Oo(e,n)}getOverlay(e,t){return Gs(e).get(Nh(this.userId,t)).next(n=>n?va(this.serializer,n):null)}getOverlays(e,t){const n=pt();return A.forEach(t,i=>this.getOverlay(e,i).next(r=>{r!==null&&n.set(i,r)})).next(()=>n)}saveOverlays(e,t,n){const i=[];return n.forEach((r,o)=>{const l=new $l(t,o);i.push(this.wt(e,l))}),A.waitFor(i)}removeOverlaysForBatchId(e,t,n){const i=new Set;t.forEach(o=>i.add(Be(o.getCollectionPath())));const r=[];return i.forEach(o=>{const l=IDBKeyRange.bound([this.userId,o,n],[this.userId,o,n+1],!1,!0);r.push(Gs(e).Y(ja,l))}),A.waitFor(r)}getOverlaysForCollection(e,t,n){const i=pt(),r=Be(t),o=IDBKeyRange.bound([this.userId,r,n],[this.userId,r,Number.POSITIVE_INFINITY],!0);return Gs(e).j(ja,o).next(l=>{for(const u of l){const h=va(this.serializer,u);i.set(h.getKey(),h)}return i})}getOverlaysForCollectionGroup(e,t,n,i){const r=pt();let o;const l=IDBKeyRange.bound([this.userId,t,n],[this.userId,t,Number.POSITIVE_INFINITY],!0);return Gs(e).X({index:Vf,range:l},(u,h,f)=>{const p=va(this.serializer,h);r.size()<i||p.largestBatchId===o?(r.set(p.getKey(),p),o=p.largestBatchId):f.done()}).next(()=>r)}wt(e,t){return Gs(e).put(function(i,r,o){const[l,u,h]=Nh(r,o.mutation.key);return{userId:r,collectionPath:u,documentId:h,collectionGroup:o.mutation.key.getCollectionGroup(),largestBatchId:o.largestBatchId,overlayMutation:Zr(i.gt,o.mutation)}}(this.serializer,this.userId,t))}}function Gs(s){return we(s,xo)}/**
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
 */class vE{St(e){return we(e,Vl)}getSessionToken(e){return this.St(e).get("sessionToken").next(t=>{const n=t==null?void 0:t.value;return n?ge.fromUint8Array(n):ge.EMPTY_BYTE_STRING})}setSessionToken(e,t){return this.St(e).put({name:"sessionToken",value:t.toUint8Array()})}}/**
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
 */class hn{constructor(){}bt(e,t){this.Dt(e,t),t.vt()}Dt(e,t){if("nullValue"in e)this.Ct(t,5);else if("booleanValue"in e)this.Ct(t,10),t.Ft(e.booleanValue?1:0);else if("integerValue"in e)this.Ct(t,15),t.Ft(Ee(e.integerValue));else if("doubleValue"in e){const n=Ee(e.doubleValue);isNaN(n)?this.Ct(t,13):(this.Ct(t,15),Ei(n)?t.Ft(0):t.Ft(n))}else if("timestampValue"in e){let n=e.timestampValue;this.Ct(t,20),typeof n=="string"&&(n=Gt(n)),t.Mt(`${n.seconds||""}`),t.Ft(n.nanos||0)}else if("stringValue"in e)this.xt(e.stringValue,t),this.Ot(t);else if("bytesValue"in e)this.Ct(t,30),t.Nt(Kt(e.bytesValue)),this.Ot(t);else if("referenceValue"in e)this.Bt(e.referenceValue,t);else if("geoPointValue"in e){const n=e.geoPointValue;this.Ct(t,45),t.Ft(n.latitude||0),t.Ft(n.longitude||0)}else"mapValue"in e?Gf(e)?this.Ct(t,Number.MAX_SAFE_INTEGER):No(e)?this.Lt(e.mapValue,t):(this.kt(e.mapValue,t),this.Ot(t)):"arrayValue"in e?(this.qt(e.arrayValue,t),this.Ot(t)):F(19022,{Qt:e})}xt(e,t){this.Ct(t,25),this.$t(e,t)}$t(e,t){t.Mt(e)}kt(e,t){const n=e.fields||{};this.Ct(t,55);for(const i of Object.keys(n))this.xt(i,t),this.Dt(n[i],t)}Lt(e,t){var n,i;const r=e.fields||{};this.Ct(t,53);const o=wi,l=((i=(n=r[o].arrayValue)===null||n===void 0?void 0:n.values)===null||i===void 0?void 0:i.length)||0;this.Ct(t,15),t.Ft(Ee(l)),this.xt(o,t),this.Dt(r[o],t)}qt(e,t){const n=e.values||[];this.Ct(t,50);for(const i of n)this.Dt(i,t)}Bt(e,t){this.Ct(t,37),O.fromName(e).path.forEach(n=>{this.Ct(t,60),this.$t(n,t)})}Ct(e,t){e.Ft(t)}Ot(e){e.Ft(2)}}hn.Ut=new hn;/**
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
 */const Bn=255;function wE(s){if(s===0)return 8;let e=0;return s>>4||(e+=4,s<<=4),s>>6||(e+=2,s<<=2),s>>7||(e+=1),e}function Oh(s){const e=64-function(n){let i=0;for(let r=0;r<8;++r){const o=wE(255&n[r]);if(i+=o,o!==8)break}return i}(s);return Math.ceil(e/8)}class AE{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Kt(e){const t=e[Symbol.iterator]();let n=t.next();for(;!n.done;)this.Wt(n.value),n=t.next();this.Gt()}zt(e){const t=e[Symbol.iterator]();let n=t.next();for(;!n.done;)this.jt(n.value),n=t.next();this.Jt()}Ht(e){for(const t of e){const n=t.charCodeAt(0);if(n<128)this.Wt(n);else if(n<2048)this.Wt(960|n>>>6),this.Wt(128|63&n);else if(t<"\uD800"||"\uDBFF"<t)this.Wt(480|n>>>12),this.Wt(128|63&n>>>6),this.Wt(128|63&n);else{const i=t.codePointAt(0);this.Wt(240|i>>>18),this.Wt(128|63&i>>>12),this.Wt(128|63&i>>>6),this.Wt(128|63&i)}}this.Gt()}Yt(e){for(const t of e){const n=t.charCodeAt(0);if(n<128)this.jt(n);else if(n<2048)this.jt(960|n>>>6),this.jt(128|63&n);else if(t<"\uD800"||"\uDBFF"<t)this.jt(480|n>>>12),this.jt(128|63&n>>>6),this.jt(128|63&n);else{const i=t.codePointAt(0);this.jt(240|i>>>18),this.jt(128|63&i>>>12),this.jt(128|63&i>>>6),this.jt(128|63&i)}}this.Jt()}Zt(e){const t=this.Xt(e),n=Oh(t);this.en(1+n),this.buffer[this.position++]=255&n;for(let i=t.length-n;i<t.length;++i)this.buffer[this.position++]=255&t[i]}tn(e){const t=this.Xt(e),n=Oh(t);this.en(1+n),this.buffer[this.position++]=~(255&n);for(let i=t.length-n;i<t.length;++i)this.buffer[this.position++]=~(255&t[i])}nn(){this.rn(Bn),this.rn(255)}sn(){this._n(Bn),this._n(255)}reset(){this.position=0}seed(e){this.en(e.length),this.buffer.set(e,this.position),this.position+=e.length}an(){return this.buffer.slice(0,this.position)}Xt(e){const t=function(r){const o=new DataView(new ArrayBuffer(8));return o.setFloat64(0,r,!1),new Uint8Array(o.buffer)}(e),n=!!(128&t[0]);t[0]^=n?255:128;for(let i=1;i<t.length;++i)t[i]^=n?255:0;return t}Wt(e){const t=255&e;t===0?(this.rn(0),this.rn(255)):t===Bn?(this.rn(Bn),this.rn(0)):this.rn(t)}jt(e){const t=255&e;t===0?(this._n(0),this._n(255)):t===Bn?(this._n(Bn),this._n(0)):this._n(e)}Gt(){this.rn(0),this.rn(1)}Jt(){this._n(0),this._n(1)}rn(e){this.en(1),this.buffer[this.position++]=e}_n(e){this.en(1),this.buffer[this.position++]=~e}en(e){const t=e+this.position;if(t<=this.buffer.length)return;let n=2*this.buffer.length;n<t&&(n=t);const i=new Uint8Array(n);i.set(this.buffer),this.buffer=i}}class RE{constructor(e){this.un=e}Nt(e){this.un.Kt(e)}Mt(e){this.un.Ht(e)}Ft(e){this.un.Zt(e)}vt(){this.un.nn()}}class CE{constructor(e){this.un=e}Nt(e){this.un.zt(e)}Mt(e){this.un.Yt(e)}Ft(e){this.un.tn(e)}vt(){this.un.sn()}}class Ks{constructor(){this.un=new AE,this.cn=new RE(this.un),this.ln=new CE(this.un)}seed(e){this.un.seed(e)}hn(e){return e===0?this.cn:this.ln}an(){return this.un.an()}reset(){this.un.reset()}}/**
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
 */class dn{constructor(e,t,n,i){this.Pn=e,this.Tn=t,this.In=n,this.dn=i}En(){const e=this.dn.length,t=e===0||this.dn[e-1]===255?e+1:e,n=new Uint8Array(t);return n.set(this.dn,0),t!==e?n.set([0],this.dn.length):++n[n.length-1],new dn(this.Pn,this.Tn,this.In,n)}An(e,t,n){return{indexId:this.Pn,uid:e,arrayValue:Or(this.In),directionalValue:Or(this.dn),orderedDocumentKey:Or(t),documentKey:n.path.toArray()}}Rn(e,t,n){const i=this.An(e,t,n);return[i.indexId,i.uid,i.arrayValue,i.directionalValue,i.orderedDocumentKey,i.documentKey]}}function Dt(s,e){let t=s.Pn-e.Pn;return t!==0?t:(t=Mh(s.In,e.In),t!==0?t:(t=Mh(s.dn,e.dn),t!==0?t:O.comparator(s.Tn,e.Tn)))}function Mh(s,e){for(let t=0;t<s.length&&t<e.length;++t){const n=s[t]-e[t];if(n!==0)return n}return s.length-e.length}function Or(s){return of()?function(t){let n="";for(let i=0;i<t.length;i++)n+=String.fromCharCode(t[i]);return n}(s):s}function Fh(s){return typeof s!="string"?s:function(t){const n=new Uint8Array(t.length);for(let i=0;i<t.length;i++)n[i]=t.charCodeAt(i);return n}(s)}class Lh{constructor(e){this.Vn=new ne((t,n)=>de.comparator(t.field,n.field)),this.collectionId=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment(),this.mn=e.orderBy,this.fn=[];for(const t of e.filters){const n=t;n.isInequality()?this.Vn=this.Vn.add(n):this.fn.push(n)}}get gn(){return this.Vn.size>1}pn(e){if(L(e.collectionGroup===this.collectionId,49279),this.gn)return!1;const t=Ua(e);if(t!==void 0&&!this.yn(t))return!1;const n=on(e);let i=new Set,r=0,o=0;for(;r<n.length&&this.yn(n[r]);++r)i=i.add(n[r].fieldPath.canonicalString());if(r===n.length)return!0;if(this.Vn.size>0){const l=this.Vn.getIterator().getNext();if(!i.has(l.field.canonicalString())){const u=n[r];if(!this.wn(l,u)||!this.Sn(this.mn[o++],u))return!1}++r}for(;r<n.length;++r){const l=n[r];if(o>=this.mn.length||!this.Sn(this.mn[o++],l))return!1}return!0}bn(){if(this.gn)return null;let e=new ne(de.comparator);const t=[];for(const n of this.fn)if(!n.field.isKeyField())if(n.op==="array-contains"||n.op==="array-contains-any")t.push(new Sr(n.field,2));else{if(e.has(n.field))continue;e=e.add(n.field),t.push(new Sr(n.field,0))}for(const n of this.mn)n.field.isKeyField()||e.has(n.field)||(e=e.add(n.field),t.push(new Sr(n.field,n.dir==="asc"?0:1)));return new zr(zr.UNKNOWN_ID,this.collectionId,t,yi.empty())}yn(e){for(const t of this.fn)if(this.wn(t,e))return!0;return!1}wn(e,t){if(e===void 0||!e.field.isEqual(t.fieldPath))return!1;const n=e.op==="array-contains"||e.op==="array-contains-any";return t.kind===2===n}Sn(e,t){return!!e.field.isEqual(t.fieldPath)&&(t.kind===0&&e.dir==="asc"||t.kind===1&&e.dir==="desc")}}/**
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
 */function Np(s){var e,t;if(L(s instanceof Y||s instanceof ie,20012),s instanceof Y){if(s instanceof Zf){const i=((t=(e=s.value.arrayValue)===null||e===void 0?void 0:e.values)===null||t===void 0?void 0:t.map(r=>Y.create(s.field,"==",r)))||[];return ie.create(i,"or")}return s}const n=s.filters.map(i=>Np(i));return ie.create(n,s.op)}function SE(s){if(s.getFilters().length===0)return[];const e=sl(Np(s));return L(Vp(e),7391),tl(e)||nl(e)?[e]:e.getFilters()}function tl(s){return s instanceof Y}function nl(s){return s instanceof ie&&Ul(s)}function Vp(s){return tl(s)||nl(s)||function(t){if(t instanceof ie&&$a(t)){for(const n of t.getFilters())if(!tl(n)&&!nl(n))return!1;return!0}return!1}(s)}function sl(s){if(L(s instanceof Y||s instanceof ie,34018),s instanceof Y)return s;if(s.filters.length===1)return sl(s.filters[0]);const e=s.filters.map(n=>sl(n));let t=ie.create(e,s.op);return t=to(t),Vp(t)?t:(L(t instanceof ie,64498),L(ds(t),40251),L(t.filters.length>1,57927),t.filters.reduce((n,i)=>Yl(n,i)))}function Yl(s,e){let t;return L(s instanceof Y||s instanceof ie,38388),L(e instanceof Y||e instanceof ie,25473),t=s instanceof Y?e instanceof Y?function(i,r){return ie.create([i,r],"and")}(s,e):Uh(s,e):e instanceof Y?Uh(e,s):function(i,r){if(L(i.filters.length>0&&r.filters.length>0,48005),ds(i)&&ds(r))return Yf(i,r.getFilters());const o=$a(i)?i:r,l=$a(i)?r:i,u=o.filters.map(h=>Yl(h,l));return ie.create(u,"or")}(s,e),to(t)}function Uh(s,e){if(ds(e))return Yf(e,s.getFilters());{const t=e.filters.map(n=>Yl(s,n));return ie.create(t,"or")}}function to(s){if(L(s instanceof Y||s instanceof ie,11850),s instanceof Y)return s;const e=s.getFilters();if(e.length===1)return to(e[0]);if(Qf(s))return s;const t=e.map(i=>to(i)),n=[];return t.forEach(i=>{i instanceof Y?n.push(i):i instanceof ie&&(i.op===s.op?n.push(...i.filters):n.push(i))}),n.length===1?n[0]:ie.create(n,s.op)}/**
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
 */class PE{constructor(){this.Dn=new Xl}addToCollectionParentIndex(e,t){return this.Dn.add(t),A.resolve()}getCollectionParents(e,t){return A.resolve(this.Dn.getEntries(t))}addFieldIndex(e,t){return A.resolve()}deleteFieldIndex(e,t){return A.resolve()}deleteAllFieldIndexes(e){return A.resolve()}createTargetIndexes(e,t){return A.resolve()}getDocumentsMatchingTarget(e,t){return A.resolve(null)}getIndexType(e,t){return A.resolve(0)}getFieldIndexes(e,t){return A.resolve([])}getNextCollectionGroupToUpdate(e){return A.resolve(null)}getMinOffset(e,t){return A.resolve(et.min())}getMinOffsetFromCollectionGroup(e,t){return A.resolve(et.min())}updateCollectionGroup(e,t,n){return A.resolve()}updateIndexEntries(e,t){return A.resolve()}}class Xl{constructor(){this.index={}}add(e){const t=e.lastSegment(),n=e.popLast(),i=this.index[t]||new ne(oe.comparator),r=!i.has(n);return this.index[t]=i.add(n),r}has(e){const t=e.lastSegment(),n=e.popLast(),i=this.index[t];return i&&i.has(n)}getEntries(e){return(this.index[e]||new ne(oe.comparator)).toArray()}}/**
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
 */const Bh="IndexedDbIndexManager",Er=new Uint8Array(0);class bE{constructor(e,t){this.databaseId=t,this.vn=new Xl,this.Cn=new St(n=>In(n),(n,i)=>Bi(n,i)),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.vn.has(t)){const n=t.lastSegment(),i=t.popLast();e.addOnCommittedListener(()=>{this.vn.add(t)});const r={collectionId:n,parent:Be(i)};return qh(e).put(r)}return A.resolve()}getCollectionParents(e,t){const n=[],i=IDBKeyRange.bound([t,""],[Ef(t),""],!1,!0);return qh(e).j(i).next(r=>{for(const o of r){if(o.collectionId!==t)break;n.push(ft(o.parent))}return n})}addFieldIndex(e,t){const n=Ws(e),i=function(l){return{indexId:l.indexId,collectionGroup:l.collectionGroup,fields:l.fields.map(u=>[u.fieldPath.canonicalString(),u.kind])}}(t);delete i.indexId;const r=n.add(i);if(t.indexState){const o=jn(e);return r.next(l=>{o.put(Vh(l,this.uid,t.indexState.sequenceNumber,t.indexState.offset))})}return r.next()}deleteFieldIndex(e,t){const n=Ws(e),i=jn(e),r=qn(e);return n.delete(t.indexId).next(()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))).next(()=>r.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))}deleteAllFieldIndexes(e){const t=Ws(e),n=qn(e),i=jn(e);return t.Y().next(()=>n.Y()).next(()=>i.Y())}createTargetIndexes(e,t){return A.forEach(this.Fn(t),n=>this.getIndexType(e,n).next(i=>{if(i===0||i===1){const r=new Lh(n).bn();if(r!=null)return this.addFieldIndex(e,r)}}))}getDocumentsMatchingTarget(e,t){const n=qn(e);let i=!0;const r=new Map;return A.forEach(this.Fn(t),o=>this.Mn(e,o).next(l=>{i&&(i=!!l),r.set(o,l)})).next(()=>{if(i){let o=W();const l=[];return A.forEach(r,(u,h)=>{x(Bh,`Using index ${function(B){return`id=${B.indexId}|cg=${B.collectionGroup}|f=${B.fields.map(J=>`${J.fieldPath}:${J.kind}`).join(",")}`}(u)} to execute ${In(t)}`);const f=function(B,J){const le=Ua(J);if(le===void 0)return null;for(const Z of Xr(B,le.fieldPath))switch(Z.op){case"array-contains-any":return Z.value.arrayValue.values||[];case"array-contains":return[Z.value]}return null}(h,u),p=function(B,J){const le=new Map;for(const Z of on(J))for(const I of Xr(B,Z.fieldPath))switch(I.op){case"==":case"in":le.set(Z.fieldPath.canonicalString(),I.value);break;case"not-in":case"!=":return le.set(Z.fieldPath.canonicalString(),I.value),Array.from(le.values())}return null}(h,u),m=function(B,J){const le=[];let Z=!0;for(const I of on(J)){const g=I.kind===0?yh(B,I.fieldPath,B.startAt):Eh(B,I.fieldPath,B.startAt);le.push(g.value),Z&&(Z=g.inclusive)}return new hs(le,Z)}(h,u),v=function(B,J){const le=[];let Z=!0;for(const I of on(J)){const g=I.kind===0?Eh(B,I.fieldPath,B.endAt):yh(B,I.fieldPath,B.endAt);le.push(g.value),Z&&(Z=g.inclusive)}return new hs(le,Z)}(h,u),S=this.xn(u,h,m),N=this.xn(u,h,v),V=this.On(u,h,p),K=this.Nn(u.indexId,f,S,m.inclusive,N,v.inclusive,V);return A.forEach(K,j=>n.H(j,t.limit).next(B=>{B.forEach(J=>{const le=O.fromSegments(J.documentKey);o.has(le)||(o=o.add(le),l.push(le))})}))}).next(()=>l)}return A.resolve(null)})}Fn(e){let t=this.Cn.get(e);return t||(e.filters.length===0?t=[e]:t=SE(ie.create(e.filters,"and")).map(n=>Ha(e.path,e.collectionGroup,e.orderBy,n.getFilters(),e.limit,e.startAt,e.endAt)),this.Cn.set(e,t),t)}Nn(e,t,n,i,r,o,l){const u=(t!=null?t.length:1)*Math.max(n.length,r.length),h=u/(t!=null?t.length:1),f=[];for(let p=0;p<u;++p){const m=t?this.Bn(t[p/h]):Er,v=this.Ln(e,m,n[p%h],i),S=this.kn(e,m,r[p%h],o),N=l.map(V=>this.Ln(e,m,V,!0));f.push(...this.createRange(v,S,N))}return f}Ln(e,t,n,i){const r=new dn(e,O.empty(),t,n);return i?r:r.En()}kn(e,t,n,i){const r=new dn(e,O.empty(),t,n);return i?r.En():r}Mn(e,t){const n=new Lh(t),i=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,i).next(r=>{let o=null;for(const l of r)n.pn(l)&&(!o||l.fields.length>o.fields.length)&&(o=l);return o})}getIndexType(e,t){let n=2;const i=this.Fn(t);return A.forEach(i,r=>this.Mn(e,r).next(o=>{o?n!==0&&o.fields.length<function(u){let h=new ne(de.comparator),f=!1;for(const p of u.filters)for(const m of p.getFlattenedFilters())m.field.isKeyField()||(m.op==="array-contains"||m.op==="array-contains-any"?f=!0:h=h.add(m.field));for(const p of u.orderBy)p.field.isKeyField()||(h=h.add(p.field));return h.size+(f?1:0)}(r)&&(n=1):n=0})).next(()=>function(o){return o.limit!==null}(t)&&i.length>1&&n===2?1:n)}qn(e,t){const n=new Ks;for(const i of on(e)){const r=t.data.field(i.fieldPath);if(r==null)return null;const o=n.hn(i.kind);hn.Ut.bt(r,o)}return n.an()}Bn(e){const t=new Ks;return hn.Ut.bt(e,t.hn(0)),t.an()}Qn(e,t){const n=new Ks;return hn.Ut.bt(Ll(this.databaseId,t),n.hn(function(r){const o=on(r);return o.length===0?0:o[o.length-1].kind}(e))),n.an()}On(e,t,n){if(n===null)return[];let i=[];i.push(new Ks);let r=0;for(const o of on(e)){const l=n[r++];for(const u of i)if(this.$n(t,o.fieldPath)&&Ri(l))i=this.Un(i,o,l);else{const h=u.hn(o.kind);hn.Ut.bt(l,h)}}return this.Kn(i)}xn(e,t,n){return this.On(e,t,n.position)}Kn(e){const t=[];for(let n=0;n<e.length;++n)t[n]=e[n].an();return t}Un(e,t,n){const i=[...e],r=[];for(const o of n.arrayValue.values||[])for(const l of i){const u=new Ks;u.seed(l.an()),hn.Ut.bt(o,u.hn(t.kind)),r.push(u)}return r}$n(e,t){return!!e.filters.find(n=>n instanceof Y&&n.field.isEqual(t)&&(n.op==="in"||n.op==="not-in"))}getFieldIndexes(e,t){const n=Ws(e),i=jn(e);return(t?n.j(qa,IDBKeyRange.bound(t,t)):n.j()).next(r=>{const o=[];return A.forEach(r,l=>i.get([l.indexId,this.uid]).next(u=>{o.push(function(f,p){const m=p?new yi(p.sequenceNumber,new et(vn(p.readTime),new O(ft(p.documentKey)),p.largestBatchId)):yi.empty(),v=f.fields.map(([S,N])=>new Sr(de.fromServerFormat(S),N));return new zr(f.indexId,f.collectionGroup,v,m)}(l,u))})).next(()=>o)})}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next(t=>t.length===0?null:(t.sort((n,i)=>{const r=n.indexState.sequenceNumber-i.indexState.sequenceNumber;return r!==0?r:z(n.collectionGroup,i.collectionGroup)}),t[0].collectionGroup))}updateCollectionGroup(e,t,n){const i=Ws(e),r=jn(e);return this.Wn(e).next(o=>i.j(qa,IDBKeyRange.bound(t,t)).next(l=>A.forEach(l,u=>r.put(Vh(u.indexId,this.uid,o,n)))))}updateIndexEntries(e,t){const n=new Map;return A.forEach(t,(i,r)=>{const o=n.get(i.collectionGroup);return(o?A.resolve(o):this.getFieldIndexes(e,i.collectionGroup)).next(l=>(n.set(i.collectionGroup,l),A.forEach(l,u=>this.Gn(e,i,u).next(h=>{const f=this.zn(r,u);return h.isEqual(f)?A.resolve():this.jn(e,r,u,h,f)}))))})}Jn(e,t,n,i){return qn(e).put(i.An(this.uid,this.Qn(n,t.key),t.key))}Hn(e,t,n,i){return qn(e).delete(i.Rn(this.uid,this.Qn(n,t.key),t.key))}Gn(e,t,n){const i=qn(e);let r=new ne(Dt);return i.X({index:Nf,range:IDBKeyRange.only([n.indexId,this.uid,Or(this.Qn(n,t))])},(o,l)=>{r=r.add(new dn(n.indexId,t,Fh(l.arrayValue),Fh(l.directionalValue)))}).next(()=>r)}zn(e,t){let n=new ne(Dt);const i=this.qn(t,e);if(i==null)return n;const r=Ua(t);if(r!=null){const o=e.data.field(r.fieldPath);if(Ri(o))for(const l of o.arrayValue.values||[])n=n.add(new dn(t.indexId,e.key,this.Bn(l),i))}else n=n.add(new dn(t.indexId,e.key,Er,i));return n}jn(e,t,n,i,r){x(Bh,"Updating index entries for document '%s'",t.key);const o=[];return function(u,h,f,p,m){const v=u.getIterator(),S=h.getIterator();let N=Un(v),V=Un(S);for(;N||V;){let K=!1,j=!1;if(N&&V){const B=f(N,V);B<0?j=!0:B>0&&(K=!0)}else N!=null?j=!0:K=!0;K?(p(V),V=Un(S)):j?(m(N),N=Un(v)):(N=Un(v),V=Un(S))}}(i,r,Dt,l=>{o.push(this.Jn(e,t,n,l))},l=>{o.push(this.Hn(e,t,n,l))}),A.waitFor(o)}Wn(e){let t=1;return jn(e).X({index:xf,reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},(n,i,r)=>{r.done(),t=i.sequenceNumber+1}).next(()=>t)}createRange(e,t,n){n=n.sort((o,l)=>Dt(o,l)).filter((o,l,u)=>!l||Dt(o,u[l-1])!==0);const i=[];i.push(e);for(const o of n){const l=Dt(o,e),u=Dt(o,t);if(l===0)i[0]=e.En();else if(l>0&&u<0)i.push(o),i.push(o.En());else if(u>0)break}i.push(t);const r=[];for(let o=0;o<i.length;o+=2){if(this.Yn(i[o],i[o+1]))return[];const l=i[o].Rn(this.uid,Er,O.empty()),u=i[o+1].Rn(this.uid,Er,O.empty());r.push(IDBKeyRange.bound(l,u))}return r}Yn(e,t){return Dt(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(jh)}getMinOffset(e,t){return A.mapArray(this.Fn(t),n=>this.Mn(e,n).next(i=>i||F(44426))).next(jh)}}function qh(s){return we(s,vi)}function qn(s){return we(s,oi)}function Ws(s){return we(s,Nl)}function jn(s){return we(s,ri)}function jh(s){L(s.length!==0,28825);let e=s[0].indexState.offset,t=e.largestBatchId;for(let n=1;n<s.length;n++){const i=s[n].indexState.offset;Pl(i,e)<0&&(e=i),t<i.largestBatchId&&(t=i.largestBatchId)}return new et(e.readTime,e.documentKey,t)}/**
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
 */const zh={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},Dp=41943040;class Me{static withCacheSize(e){return new Me(e,Me.DEFAULT_COLLECTION_PERCENTILE,Me.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,n){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=n}}/**
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
 */function kp(s,e,t){const n=s.store(st),i=s.store(rs),r=[],o=IDBKeyRange.only(t.batchId);let l=0;const u=n.X({range:o},(f,p,m)=>(l++,m.delete()));r.push(u.next(()=>{L(l===1,47070,{batchId:t.batchId})}));const h=[];for(const f of t.mutations){const p=Sf(e,f.key.path,t.batchId);r.push(i.delete(p)),h.push(f.key)}return A.waitFor(r).next(()=>h)}function no(s){if(!s)return 0;let e;if(s.document)e=s.document;else if(s.unknownDocument)e=s.unknownDocument;else{if(!s.noDocument)throw F(14731);e=s.noDocument}return JSON.stringify(e).length}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Me.DEFAULT_COLLECTION_PERCENTILE=10,Me.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Me.DEFAULT=new Me(Dp,Me.DEFAULT_COLLECTION_PERCENTILE,Me.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Me.DISABLED=new Me(-1,0,0);class Mo{constructor(e,t,n,i){this.userId=e,this.serializer=t,this.indexManager=n,this.referenceDelegate=i,this.Zn={}}static yt(e,t,n,i){L(e.uid!=="",64387);const r=e.isAuthenticated()?e.uid:"";return new Mo(r,t,n,i)}checkEmpty(e){let t=!0;const n=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return kt(e).X({index:fn,range:n},(i,r,o)=>{t=!1,o.done()}).next(()=>t)}addMutationBatch(e,t,n,i){const r=Qn(e),o=kt(e);return o.add({}).next(l=>{L(typeof l=="number",49019);const u=new Kl(l,t,n,i),h=function(v,S,N){const V=N.baseMutations.map(j=>Zr(v.gt,j)),K=N.mutations.map(j=>Zr(v.gt,j));return{userId:S,batchId:N.batchId,localWriteTimeMs:N.localWriteTime.toMillis(),baseMutations:V,mutations:K}}(this.serializer,this.userId,u),f=[];let p=new ne((m,v)=>z(m.canonicalString(),v.canonicalString()));for(const m of i){const v=Sf(this.userId,m.key.path,l);p=p.add(m.key.path.popLast()),f.push(o.put(h)),f.push(r.put(v,ry))}return p.forEach(m=>{f.push(this.indexManager.addToCollectionParentIndex(e,m))}),e.addOnCommittedListener(()=>{this.Zn[l]=u.keys()}),A.waitFor(f).next(()=>u)})}lookupMutationBatch(e,t){return kt(e).get(t).next(n=>n?(L(n.userId===this.userId,48,"Unexpected user for mutation batch",{userId:n.userId,batchId:t}),cn(this.serializer,n)):null)}Xn(e,t){return this.Zn[t]?A.resolve(this.Zn[t]):this.lookupMutationBatch(e,t).next(n=>{if(n){const i=n.keys();return this.Zn[t]=i,i}return null})}getNextMutationBatchAfterBatchId(e,t){const n=t+1,i=IDBKeyRange.lowerBound([this.userId,n]);let r=null;return kt(e).X({index:fn,range:i},(o,l,u)=>{l.userId===this.userId&&(L(l.batchId>=n,47524,{er:n}),r=cn(this.serializer,l)),u.done()}).next(()=>r)}getHighestUnacknowledgedBatchId(e){const t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let n=_n;return kt(e).X({index:fn,range:t,reverse:!0},(i,r,o)=>{n=r.batchId,o.done()}).next(()=>n)}getAllMutationBatches(e){const t=IDBKeyRange.bound([this.userId,_n],[this.userId,Number.POSITIVE_INFINITY]);return kt(e).j(fn,t).next(n=>n.map(i=>cn(this.serializer,i)))}getAllMutationBatchesAffectingDocumentKey(e,t){const n=Pr(this.userId,t.path),i=IDBKeyRange.lowerBound(n),r=[];return Qn(e).X({range:i},(o,l,u)=>{const[h,f,p]=o,m=ft(f);if(h===this.userId&&t.path.isEqual(m))return kt(e).get(p).next(v=>{if(!v)throw F(61480,{tr:o,batchId:p});L(v.userId===this.userId,10503,"Unexpected user for mutation batch",{userId:v.userId,batchId:p}),r.push(cn(this.serializer,v))});u.done()}).next(()=>r)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new ne(z);const i=[];return t.forEach(r=>{const o=Pr(this.userId,r.path),l=IDBKeyRange.lowerBound(o),u=Qn(e).X({range:l},(h,f,p)=>{const[m,v,S]=h,N=ft(v);m===this.userId&&r.path.isEqual(N)?n=n.add(S):p.done()});i.push(u)}),A.waitFor(i).next(()=>this.nr(e,n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,i=n.length+1,r=Pr(this.userId,n),o=IDBKeyRange.lowerBound(r);let l=new ne(z);return Qn(e).X({range:o},(u,h,f)=>{const[p,m,v]=u,S=ft(m);p===this.userId&&n.isPrefixOf(S)?S.length===i&&(l=l.add(v)):f.done()}).next(()=>this.nr(e,l))}nr(e,t){const n=[],i=[];return t.forEach(r=>{i.push(kt(e).get(r).next(o=>{if(o===null)throw F(35274,{batchId:r});L(o.userId===this.userId,9748,"Unexpected user for mutation batch",{userId:o.userId,batchId:r}),n.push(cn(this.serializer,o))}))}),A.waitFor(i).next(()=>n)}removeMutationBatch(e,t){return kp(e.ce,this.userId,t).next(n=>(e.addOnCommittedListener(()=>{this.rr(t.batchId)}),A.forEach(n,i=>this.referenceDelegate.markPotentiallyOrphaned(e,i))))}rr(e){delete this.Zn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next(t=>{if(!t)return A.resolve();const n=IDBKeyRange.lowerBound(function(o){return[o]}(this.userId)),i=[];return Qn(e).X({range:n},(r,o,l)=>{if(r[0]===this.userId){const u=ft(r[1]);i.push(u)}else l.done()}).next(()=>{L(i.length===0,56720,{ir:i.map(r=>r.canonicalString())})})})}containsKey(e,t){return Op(e,this.userId,t)}sr(e){return Mp(e).get(this.userId).next(t=>t||{userId:this.userId,lastAcknowledgedBatchId:_n,lastStreamToken:""})}}function Op(s,e,t){const n=Pr(e,t.path),i=n[1],r=IDBKeyRange.lowerBound(n);let o=!1;return Qn(s).X({range:r,Z:!0},(l,u,h)=>{const[f,p,m]=l;f===e&&p===i&&(o=!0),h.done()}).next(()=>o)}function kt(s){return we(s,st)}function Qn(s){return we(s,rs)}function Mp(s){return we(s,Ii)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wn{constructor(e){this._r=e}next(){return this._r+=2,this._r}static ar(){return new wn(0)}static ur(){return new wn(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xE{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.cr(e).next(t=>{const n=new wn(t.highestTargetId);return t.highestTargetId=n.next(),this.lr(e,t).next(()=>t.highestTargetId)})}getLastRemoteSnapshotVersion(e){return this.cr(e).next(t=>q.fromTimestamp(new se(t.lastRemoteSnapshotVersion.seconds,t.lastRemoteSnapshotVersion.nanoseconds)))}getHighestSequenceNumber(e){return this.cr(e).next(t=>t.highestListenSequenceNumber)}setTargetsMetadata(e,t,n){return this.cr(e).next(i=>(i.highestListenSequenceNumber=t,n&&(i.lastRemoteSnapshotVersion=n.toTimestamp()),t>i.highestListenSequenceNumber&&(i.highestListenSequenceNumber=t),this.lr(e,i)))}addTargetData(e,t){return this.hr(e,t).next(()=>this.cr(e).next(n=>(n.targetCount+=1,this.Pr(t,n),this.lr(e,n))))}updateTargetData(e,t){return this.hr(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next(()=>zn(e).delete(t.targetId)).next(()=>this.cr(e)).next(n=>(L(n.targetCount>0,8065),n.targetCount-=1,this.lr(e,n)))}removeTargets(e,t,n){let i=0;const r=[];return zn(e).X((o,l)=>{const u=ni(l);u.sequenceNumber<=t&&n.get(u.targetId)===null&&(i++,r.push(this.removeTargetData(e,u)))}).next(()=>A.waitFor(r)).next(()=>i)}forEachTarget(e,t){return zn(e).X((n,i)=>{const r=ni(i);t(r)})}cr(e){return Gh(e).get(Wr).next(t=>(L(t!==null,2888),t))}lr(e,t){return Gh(e).put(Wr,t)}hr(e,t){return zn(e).put(bp(this.serializer,t))}Pr(e,t){let n=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,n=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,n=!0),n}getTargetCount(e){return this.cr(e).next(t=>t.targetCount)}getTargetData(e,t){const n=In(t),i=IDBKeyRange.bound([n,Number.NEGATIVE_INFINITY],[n,Number.POSITIVE_INFINITY]);let r=null;return zn(e).X({range:i,index:bf},(o,l,u)=>{const h=ni(l);Bi(t,h.target)&&(r=h,u.done())}).next(()=>r)}addMatchingKeys(e,t,n){const i=[],r=Mt(e);return t.forEach(o=>{const l=Be(o.path);i.push(r.put({targetId:n,path:l})),i.push(this.referenceDelegate.addReference(e,n,o))}),A.waitFor(i)}removeMatchingKeys(e,t,n){const i=Mt(e);return A.forEach(t,r=>{const o=Be(r.path);return A.waitFor([i.delete([n,o]),this.referenceDelegate.removeReference(e,n,r)])})}removeMatchingKeysForTargetId(e,t){const n=Mt(e),i=IDBKeyRange.bound([t],[t+1],!1,!0);return n.delete(i)}getMatchingKeysForTargetId(e,t){const n=IDBKeyRange.bound([t],[t+1],!1,!0),i=Mt(e);let r=W();return i.X({range:n,Z:!0},(o,l,u)=>{const h=ft(o[1]),f=new O(h);r=r.add(f)}).next(()=>r)}containsKey(e,t){const n=Be(t.path),i=IDBKeyRange.bound([n],[Ef(n)],!1,!0);let r=0;return Mt(e).X({index:xl,Z:!0,range:i},([o,l],u,h)=>{o!==0&&(r++,h.done())}).next(()=>r>0)}Et(e,t){return zn(e).get(t).next(n=>n?ni(n):null)}}function zn(s){return we(s,os)}function Gh(s){return we(s,mn)}function Mt(s){return we(s,as)}/**
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
 */const Kh="LruGarbageCollector",Fp=1048576;function Wh([s,e],[t,n]){const i=z(s,t);return i===0?z(e,n):i}class NE{constructor(e){this.Tr=e,this.buffer=new ne(Wh),this.Ir=0}dr(){return++this.Ir}Er(e){const t=[e,this.dr()];if(this.buffer.size<this.Tr)this.buffer=this.buffer.add(t);else{const n=this.buffer.last();Wh(t,n)<0&&(this.buffer=this.buffer.delete(n).add(t))}}get maxValue(){return this.buffer.last()[0]}}class Lp{constructor(e,t,n){this.garbageCollector=e,this.asyncQueue=t,this.localStore=n,this.Ar=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Rr(6e4)}stop(){this.Ar&&(this.Ar.cancel(),this.Ar=null)}get started(){return this.Ar!==null}Rr(e){x(Kh,`Garbage collection scheduled in ${e}ms`),this.Ar=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,async()=>{this.Ar=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){Xt(t)?x(Kh,"Ignoring IndexedDB error during garbage collection: ",t):await bn(t)}await this.Rr(3e5)})}}class VE{constructor(e,t){this.Vr=e,this.params=t}calculateTargetCount(e,t){return this.Vr.mr(e).next(n=>Math.floor(t/100*n))}nthSequenceNumber(e,t){if(t===0)return A.resolve(Ge.ue);const n=new NE(t);return this.Vr.forEachTarget(e,i=>n.Er(i.sequenceNumber)).next(()=>this.Vr.gr(e,i=>n.Er(i))).next(()=>n.maxValue)}removeTargets(e,t,n){return this.Vr.removeTargets(e,t,n)}removeOrphanedDocuments(e,t){return this.Vr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(x("LruGarbageCollector","Garbage collection skipped; disabled"),A.resolve(zh)):this.getCacheSize(e).next(n=>n<this.params.cacheSizeCollectionThreshold?(x("LruGarbageCollector",`Garbage collection skipped; Cache size ${n} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),zh):this.pr(e,t))}getCacheSize(e){return this.Vr.getCacheSize(e)}pr(e,t){let n,i,r,o,l,u,h;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next(p=>(p>this.params.maximumSequenceNumbersToCollect?(x("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),i=this.params.maximumSequenceNumbersToCollect):i=p,o=Date.now(),this.nthSequenceNumber(e,i))).next(p=>(n=p,l=Date.now(),this.removeTargets(e,n,t))).next(p=>(r=p,u=Date.now(),this.removeOrphanedDocuments(e,n))).next(p=>(h=Date.now(),Kn()<=dt.DEBUG&&x("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-f}ms
	Determined least recently used ${i} in `+(l-o)+`ms
	Removed ${r} targets in `+(u-l)+`ms
	Removed ${p} documents in `+(h-u)+`ms
Total Duration: ${h-f}ms`),A.resolve({didRun:!0,sequenceNumbersCollected:i,targetsRemoved:r,documentsRemoved:p})))}}function Up(s,e){return new VE(s,e)}/**
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
 */class DE{constructor(e,t){this.db=e,this.garbageCollector=Up(this,t)}mr(e){const t=this.yr(e);return this.db.getTargetCache().getTargetCount(e).next(n=>t.next(i=>n+i))}yr(e){let t=0;return this.gr(e,n=>{t++}).next(()=>t)}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}gr(e,t){return this.wr(e,(n,i)=>t(i))}addReference(e,t,n){return Ir(e,n)}removeReference(e,t,n){return Ir(e,n)}removeTargets(e,t,n){return this.db.getTargetCache().removeTargets(e,t,n)}markPotentiallyOrphaned(e,t){return Ir(e,t)}Sr(e,t){return function(i,r){let o=!1;return Mp(i).ee(l=>Op(i,l,r).next(u=>(u&&(o=!0),A.resolve(!u)))).next(()=>o)}(e,t)}removeOrphanedDocuments(e,t){const n=this.db.getRemoteDocumentCache().newChangeBuffer(),i=[];let r=0;return this.wr(e,(o,l)=>{if(l<=t){const u=this.Sr(e,o).next(h=>{if(!h)return r++,n.getEntry(e,o).next(()=>(n.removeEntry(o,q.min()),Mt(e).delete(function(p){return[0,Be(p.path)]}(o))))});i.push(u)}}).next(()=>A.waitFor(i)).next(()=>n.apply(e)).next(()=>r)}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,n)}updateLimboDocument(e,t){return Ir(e,t)}wr(e,t){const n=Mt(e);let i,r=Ge.ue;return n.X({index:xl},([o,l],{path:u,sequenceNumber:h})=>{o===0?(r!==Ge.ue&&t(new O(ft(i)),r),r=h,i=u):r=Ge.ue}).next(()=>{r!==Ge.ue&&t(new O(ft(i)),r)})}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function Ir(s,e){return Mt(s).put(function(n,i){return{targetId:0,path:Be(n.path),sequenceNumber:i}}(e,s.currentSequenceNumber))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bp{constructor(){this.changes=new St(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,_e.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const n=this.changes.get(t);return n!==void 0?A.resolve(n):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kE{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,n){return rn(e).put(n)}removeEntry(e,t,n){return rn(e).delete(function(r,o){const l=r.path.toArray();return[l.slice(0,l.length-2),l[l.length-2],eo(o),l[l.length-1]]}(t,n))}updateMetadata(e,t){return this.getMetadata(e).next(n=>(n.byteSize+=t,this.br(e,n)))}getEntry(e,t){let n=_e.newInvalidDocument(t);return rn(e).X({index:br,range:IDBKeyRange.only($s(t))},(i,r)=>{n=this.Dr(t,r)}).next(()=>n)}vr(e,t){let n={size:0,document:_e.newInvalidDocument(t)};return rn(e).X({index:br,range:IDBKeyRange.only($s(t))},(i,r)=>{n={document:this.Dr(t,r),size:no(r)}}).next(()=>n)}getEntries(e,t){let n=Je();return this.Cr(e,t,(i,r)=>{const o=this.Dr(i,r);n=n.insert(i,o)}).next(()=>n)}Fr(e,t){let n=Je(),i=new fe(O.comparator);return this.Cr(e,t,(r,o)=>{const l=this.Dr(r,o);n=n.insert(r,l),i=i.insert(r,no(o))}).next(()=>({documents:n,Mr:i}))}Cr(e,t,n){if(t.isEmpty())return A.resolve();let i=new ne(Hh);t.forEach(u=>i=i.add(u));const r=IDBKeyRange.bound($s(i.first()),$s(i.last())),o=i.getIterator();let l=o.getNext();return rn(e).X({index:br,range:r},(u,h,f)=>{const p=O.fromSegments([...h.prefixPath,h.collectionGroup,h.documentId]);for(;l&&Hh(l,p)<0;)n(l,null),l=o.getNext();l&&l.isEqual(p)&&(n(l,h),l=o.hasNext()?o.getNext():null),l?f.G($s(l)):f.done()}).next(()=>{for(;l;)n(l,null),l=o.hasNext()?o.getNext():null})}getDocumentsMatchingQuery(e,t,n,i,r){const o=t.path,l=[o.popLast().toArray(),o.lastSegment(),eo(n.readTime),n.documentKey.path.isEmpty()?"":n.documentKey.path.lastSegment()],u=[o.popLast().toArray(),o.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return rn(e).j(IDBKeyRange.bound(l,u,!0)).next(h=>{r==null||r.incrementDocumentReadCount(h.length);let f=Je();for(const p of h){const m=this.Dr(O.fromSegments(p.prefixPath.concat(p.collectionGroup,p.documentId)),p);m.isFoundDocument()&&(qi(t,m)||i.has(m.key))&&(f=f.insert(m.key,m))}return f})}getAllFromCollectionGroup(e,t,n,i){let r=Je();const o=Qh(t,n),l=Qh(t,et.max());return rn(e).X({index:Pf,range:IDBKeyRange.bound(o,l,!0)},(u,h,f)=>{const p=this.Dr(O.fromSegments(h.prefixPath.concat(h.collectionGroup,h.documentId)),h);r=r.insert(p.key,p),r.size===i&&f.done()}).next(()=>r)}newChangeBuffer(e){return new OE(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next(t=>t.byteSize)}getMetadata(e){return $h(e).get(Ba).next(t=>(L(!!t,20021),t))}br(e,t){return $h(e).put(Ba,t)}Dr(e,t){if(t){const n=IE(this.serializer,t);if(!(n.isNoDocument()&&n.version.isEqual(q.min())))return n}return _e.newInvalidDocument(e)}}function qp(s){return new kE(s)}class OE extends Bp{constructor(e,t){super(),this.Or=e,this.trackRemovals=t,this.Nr=new St(n=>n.toString(),(n,i)=>n.isEqual(i))}applyChanges(e){const t=[];let n=0,i=new ne((r,o)=>z(r.canonicalString(),o.canonicalString()));return this.changes.forEach((r,o)=>{const l=this.Nr.get(r);if(t.push(this.Or.removeEntry(e,r,l.readTime)),o.isValidDocument()){const u=xh(this.Or.serializer,o);i=i.add(r.path.popLast());const h=no(u);n+=h-l.size,t.push(this.Or.addEntry(e,r,u))}else if(n-=l.size,this.trackRemovals){const u=xh(this.Or.serializer,o.convertToNoDocument(q.min()));t.push(this.Or.addEntry(e,r,u))}}),i.forEach(r=>{t.push(this.Or.indexManager.addToCollectionParentIndex(e,r))}),t.push(this.Or.updateMetadata(e,n)),A.waitFor(t)}getFromCache(e,t){return this.Or.vr(e,t).next(n=>(this.Nr.set(t,{size:n.size,readTime:n.document.readTime}),n.document))}getAllFromCache(e,t){return this.Or.Fr(e,t).next(({documents:n,Mr:i})=>(i.forEach((r,o)=>{this.Nr.set(r,{size:o,readTime:n.get(r).readTime})}),n))}}function $h(s){return we(s,Ti)}function rn(s){return we(s,Kr)}function $s(s){const e=s.path.toArray();return[e.slice(0,e.length-2),e[e.length-2],e[e.length-1]]}function Qh(s,e){const t=e.documentKey.path.toArray();return[s,eo(e.readTime),t.slice(0,t.length-2),t.length>0?t[t.length-1]:""]}function Hh(s,e){const t=s.path.toArray(),n=e.path.toArray();let i=0;for(let r=0;r<t.length-2&&r<n.length-2;++r)if(i=z(t[r],n[r]),i)return i;return i=z(t.length,n.length),i||(i=z(t[t.length-2],n[n.length-2]),i||z(t[t.length-1],n[n.length-1]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class ME{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jp{constructor(e,t,n,i){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=n,this.indexManager=i}getDocument(e,t){let n=null;return this.documentOverlayCache.getOverlay(e,t).next(i=>(n=i,this.remoteDocumentCache.getEntry(e,t))).next(i=>(n!==null&&ci(n.mutation,i,Ke.empty(),se.now()),i))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(n=>this.getLocalViewOfDocuments(e,n,W()).next(()=>n))}getLocalViewOfDocuments(e,t,n=W()){const i=pt();return this.populateOverlays(e,i,t).next(()=>this.computeViews(e,t,i,n).next(r=>{let o=ei();return r.forEach((l,u)=>{o=o.insert(l,u.overlayedDocument)}),o}))}getOverlayedDocuments(e,t){const n=pt();return this.populateOverlays(e,n,t).next(()=>this.computeViews(e,t,n,W()))}populateOverlays(e,t,n){const i=[];return n.forEach(r=>{t.has(r)||i.push(r)}),this.documentOverlayCache.getOverlays(e,i).next(r=>{r.forEach((o,l)=>{t.set(o,l)})})}computeViews(e,t,n,i){let r=Je();const o=ui(),l=function(){return ui()}();return t.forEach((u,h)=>{const f=n.get(h.key);i.has(h.key)&&(f===void 0||f.mutation instanceof Pt)?r=r.insert(h.key,h):f!==void 0?(o.set(h.key,f.mutation.getFieldMask()),ci(f.mutation,h,f.mutation.getFieldMask(),se.now())):o.set(h.key,Ke.empty())}),this.recalculateAndSaveOverlays(e,r).next(u=>(u.forEach((h,f)=>o.set(h,f)),t.forEach((h,f)=>{var p;return l.set(h,new ME(f,(p=o.get(h))!==null&&p!==void 0?p:null))}),l))}recalculateAndSaveOverlays(e,t){const n=ui();let i=new fe((o,l)=>o-l),r=W();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(o=>{for(const l of o)l.keys().forEach(u=>{const h=t.get(u);if(h===null)return;let f=n.get(u)||Ke.empty();f=l.applyToLocalView(h,f),n.set(u,f);const p=(i.get(l.batchId)||W()).add(u);i=i.insert(l.batchId,p)})}).next(()=>{const o=[],l=i.getReverseIterator();for(;l.hasNext();){const u=l.getNext(),h=u.key,f=u.value,p=op();f.forEach(m=>{if(!r.has(m)){const v=dp(t.get(m),n.get(m));v!==null&&p.set(m,v),r=r.add(m)}}),o.push(this.documentOverlayCache.saveOverlays(e,h,p))}return A.waitFor(o)}).next(()=>n)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(n=>this.recalculateAndSaveOverlays(e,n))}getDocumentsMatchingQuery(e,t,n,i){return function(o){return O.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):qy(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,n,i):this.getDocumentsMatchingCollectionQuery(e,t,n,i)}getNextDocuments(e,t,n,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,n,i).next(r=>{const o=i-r.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,n.largestBatchId,i-r.size):A.resolve(pt());let l=is,u=r;return o.next(h=>A.forEach(h,(f,p)=>(l<p.largestBatchId&&(l=p.largestBatchId),r.get(f)?A.resolve():this.remoteDocumentCache.getEntry(e,f).next(m=>{u=u.insert(f,m)}))).next(()=>this.populateOverlays(e,h,r)).next(()=>this.computeViews(e,u,h,W())).next(f=>({batchId:l,changes:rp(f)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new O(t)).next(n=>{let i=ei();return n.isFoundDocument()&&(i=i.insert(n.key,n)),i})}getDocumentsMatchingCollectionGroupQuery(e,t,n,i){const r=t.collectionGroup;let o=ei();return this.indexManager.getCollectionParents(e,r).next(l=>A.forEach(l,u=>{const h=function(p,m){return new Vo(m,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)}(t,u.child(r));return this.getDocumentsMatchingCollectionQuery(e,h,n,i).next(f=>{f.forEach((p,m)=>{o=o.insert(p,m)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,t,n,i){let r;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,n.largestBatchId).next(o=>(r=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,n,r,i))).next(o=>{r.forEach((u,h)=>{const f=h.getKey();o.get(f)===null&&(o=o.insert(f,_e.newInvalidDocument(f)))});let l=ei();return o.forEach((u,h)=>{const f=r.get(u);f!==void 0&&ci(f.mutation,h,Ke.empty(),se.now()),qi(t,h)&&(l=l.insert(u,h))}),l})}}/**
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
 */class FE{constructor(e){this.serializer=e,this.Br=new Map,this.Lr=new Map}getBundleMetadata(e,t){return A.resolve(this.Br.get(t))}saveBundleMetadata(e,t){return this.Br.set(t.id,function(i){return{id:i.id,version:i.version,createTime:ze(i.createTime)}}(t)),A.resolve()}getNamedQuery(e,t){return A.resolve(this.Lr.get(t))}saveNamedQuery(e,t){return this.Lr.set(t.name,function(i){return{name:i.name,query:xp(i.bundledQuery),readTime:ze(i.readTime)}}(t)),A.resolve()}}/**
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
 */class LE{constructor(){this.overlays=new fe(O.comparator),this.kr=new Map}getOverlay(e,t){return A.resolve(this.overlays.get(t))}getOverlays(e,t){const n=pt();return A.forEach(t,i=>this.getOverlay(e,i).next(r=>{r!==null&&n.set(i,r)})).next(()=>n)}saveOverlays(e,t,n){return n.forEach((i,r)=>{this.wt(e,t,r)}),A.resolve()}removeOverlaysForBatchId(e,t,n){const i=this.kr.get(n);return i!==void 0&&(i.forEach(r=>this.overlays=this.overlays.remove(r)),this.kr.delete(n)),A.resolve()}getOverlaysForCollection(e,t,n){const i=pt(),r=t.length+1,o=new O(t.child("")),l=this.overlays.getIteratorFrom(o);for(;l.hasNext();){const u=l.getNext().value,h=u.getKey();if(!t.isPrefixOf(h.path))break;h.path.length===r&&u.largestBatchId>n&&i.set(u.getKey(),u)}return A.resolve(i)}getOverlaysForCollectionGroup(e,t,n,i){let r=new fe((h,f)=>h-f);const o=this.overlays.getIterator();for(;o.hasNext();){const h=o.getNext().value;if(h.getKey().getCollectionGroup()===t&&h.largestBatchId>n){let f=r.get(h.largestBatchId);f===null&&(f=pt(),r=r.insert(h.largestBatchId,f)),f.set(h.getKey(),h)}}const l=pt(),u=r.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((h,f)=>l.set(h,f)),!(l.size()>=i)););return A.resolve(l)}wt(e,t,n){const i=this.overlays.get(n.key);if(i!==null){const o=this.kr.get(i.largestBatchId).delete(n.key);this.kr.set(i.largestBatchId,o)}this.overlays=this.overlays.insert(n.key,new $l(t,n));let r=this.kr.get(t);r===void 0&&(r=W(),this.kr.set(t,r)),this.kr.set(t,r.add(n.key))}}/**
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
 */class UE{constructor(){this.sessionToken=ge.EMPTY_BYTE_STRING}getSessionToken(e){return A.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,A.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jl{constructor(){this.qr=new ne(Re.Qr),this.$r=new ne(Re.Ur)}isEmpty(){return this.qr.isEmpty()}addReference(e,t){const n=new Re(e,t);this.qr=this.qr.add(n),this.$r=this.$r.add(n)}Kr(e,t){e.forEach(n=>this.addReference(n,t))}removeReference(e,t){this.Wr(new Re(e,t))}Gr(e,t){e.forEach(n=>this.removeReference(n,t))}zr(e){const t=new O(new oe([])),n=new Re(t,e),i=new Re(t,e+1),r=[];return this.$r.forEachInRange([n,i],o=>{this.Wr(o),r.push(o.key)}),r}jr(){this.qr.forEach(e=>this.Wr(e))}Wr(e){this.qr=this.qr.delete(e),this.$r=this.$r.delete(e)}Jr(e){const t=new O(new oe([])),n=new Re(t,e),i=new Re(t,e+1);let r=W();return this.$r.forEachInRange([n,i],o=>{r=r.add(o.key)}),r}containsKey(e){const t=new Re(e,0),n=this.qr.firstAfterOrEqual(t);return n!==null&&e.isEqual(n.key)}}class Re{constructor(e,t){this.key=e,this.Hr=t}static Qr(e,t){return O.comparator(e.key,t.key)||z(e.Hr,t.Hr)}static Ur(e,t){return z(e.Hr,t.Hr)||O.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BE{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.er=1,this.Yr=new ne(Re.Qr)}checkEmpty(e){return A.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,n,i){const r=this.er;this.er++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new Kl(r,t,n,i);this.mutationQueue.push(o);for(const l of i)this.Yr=this.Yr.add(new Re(l.key,r)),this.indexManager.addToCollectionParentIndex(e,l.key.path.popLast());return A.resolve(o)}lookupMutationBatch(e,t){return A.resolve(this.Zr(t))}getNextMutationBatchAfterBatchId(e,t){const n=t+1,i=this.Xr(n),r=i<0?0:i;return A.resolve(this.mutationQueue.length>r?this.mutationQueue[r]:null)}getHighestUnacknowledgedBatchId(){return A.resolve(this.mutationQueue.length===0?_n:this.er-1)}getAllMutationBatches(e){return A.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const n=new Re(t,0),i=new Re(t,Number.POSITIVE_INFINITY),r=[];return this.Yr.forEachInRange([n,i],o=>{const l=this.Zr(o.Hr);r.push(l)}),A.resolve(r)}getAllMutationBatchesAffectingDocumentKeys(e,t){let n=new ne(z);return t.forEach(i=>{const r=new Re(i,0),o=new Re(i,Number.POSITIVE_INFINITY);this.Yr.forEachInRange([r,o],l=>{n=n.add(l.Hr)})}),A.resolve(this.ei(n))}getAllMutationBatchesAffectingQuery(e,t){const n=t.path,i=n.length+1;let r=n;O.isDocumentKey(r)||(r=r.child(""));const o=new Re(new O(r),0);let l=new ne(z);return this.Yr.forEachWhile(u=>{const h=u.key.path;return!!n.isPrefixOf(h)&&(h.length===i&&(l=l.add(u.Hr)),!0)},o),A.resolve(this.ei(l))}ei(e){const t=[];return e.forEach(n=>{const i=this.Zr(n);i!==null&&t.push(i)}),t}removeMutationBatch(e,t){L(this.ti(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let n=this.Yr;return A.forEach(t.mutations,i=>{const r=new Re(i.key,t.batchId);return n=n.delete(r),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)}).next(()=>{this.Yr=n})}rr(e){}containsKey(e,t){const n=new Re(t,0),i=this.Yr.firstAfterOrEqual(n);return A.resolve(t.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,A.resolve()}ti(e,t){return this.Xr(e)}Xr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Zr(e){const t=this.Xr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qE{constructor(e){this.ni=e,this.docs=function(){return new fe(O.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const n=t.key,i=this.docs.get(n),r=i?i.size:0,o=this.ni(t);return this.docs=this.docs.insert(n,{document:t.mutableCopy(),size:o}),this.size+=o-r,this.indexManager.addToCollectionParentIndex(e,n.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const n=this.docs.get(t);return A.resolve(n?n.document.mutableCopy():_e.newInvalidDocument(t))}getEntries(e,t){let n=Je();return t.forEach(i=>{const r=this.docs.get(i);n=n.insert(i,r?r.document.mutableCopy():_e.newInvalidDocument(i))}),A.resolve(n)}getDocumentsMatchingQuery(e,t,n,i){let r=Je();const o=t.path,l=new O(o.child("__id-9223372036854775808__")),u=this.docs.getIteratorFrom(l);for(;u.hasNext();){const{key:h,value:{document:f}}=u.getNext();if(!o.isPrefixOf(h.path))break;h.path.length>o.length+1||Pl(vf(f),n)<=0||(i.has(f.key)||qi(t,f))&&(r=r.insert(f.key,f.mutableCopy()))}return A.resolve(r)}getAllFromCollectionGroup(e,t,n,i){F(9500)}ri(e,t){return A.forEach(this.docs,n=>t(n))}newChangeBuffer(e){return new jE(this)}getSize(e){return A.resolve(this.size)}}class jE extends Bp{constructor(e){super(),this.Or=e}applyChanges(e){const t=[];return this.changes.forEach((n,i)=>{i.isValidDocument()?t.push(this.Or.addEntry(e,i)):this.Or.removeEntry(n)}),A.waitFor(t)}getFromCache(e,t){return this.Or.getEntry(e,t)}getAllFromCache(e,t){return this.Or.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zE{constructor(e){this.persistence=e,this.ii=new St(t=>In(t),Bi),this.lastRemoteSnapshotVersion=q.min(),this.highestTargetId=0,this.si=0,this.oi=new Jl,this.targetCount=0,this._i=wn.ar()}forEachTarget(e,t){return this.ii.forEach((n,i)=>t(i)),A.resolve()}getLastRemoteSnapshotVersion(e){return A.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return A.resolve(this.si)}allocateTargetId(e){return this.highestTargetId=this._i.next(),A.resolve(this.highestTargetId)}setTargetsMetadata(e,t,n){return n&&(this.lastRemoteSnapshotVersion=n),t>this.si&&(this.si=t),A.resolve()}hr(e){this.ii.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this._i=new wn(t),this.highestTargetId=t),e.sequenceNumber>this.si&&(this.si=e.sequenceNumber)}addTargetData(e,t){return this.hr(t),this.targetCount+=1,A.resolve()}updateTargetData(e,t){return this.hr(t),A.resolve()}removeTargetData(e,t){return this.ii.delete(t.target),this.oi.zr(t.targetId),this.targetCount-=1,A.resolve()}removeTargets(e,t,n){let i=0;const r=[];return this.ii.forEach((o,l)=>{l.sequenceNumber<=t&&n.get(l.targetId)===null&&(this.ii.delete(o),r.push(this.removeMatchingKeysForTargetId(e,l.targetId)),i++)}),A.waitFor(r).next(()=>i)}getTargetCount(e){return A.resolve(this.targetCount)}getTargetData(e,t){const n=this.ii.get(t)||null;return A.resolve(n)}addMatchingKeys(e,t,n){return this.oi.Kr(t,n),A.resolve()}removeMatchingKeys(e,t,n){this.oi.Gr(t,n);const i=this.persistence.referenceDelegate,r=[];return i&&t.forEach(o=>{r.push(i.markPotentiallyOrphaned(e,o))}),A.waitFor(r)}removeMatchingKeysForTargetId(e,t){return this.oi.zr(t),A.resolve()}getMatchingKeysForTargetId(e,t){const n=this.oi.Jr(t);return A.resolve(n)}containsKey(e,t){return A.resolve(this.oi.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zl{constructor(e,t){this.ai={},this.overlays={},this.ui=new Ge(0),this.ci=!1,this.ci=!0,this.li=new UE,this.referenceDelegate=e(this),this.hi=new zE(this),this.indexManager=new PE,this.remoteDocumentCache=function(i){return new qE(i)}(n=>this.referenceDelegate.Pi(n)),this.serializer=new Pp(t),this.Ti=new FE(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.ci=!1,Promise.resolve()}get started(){return this.ci}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new LE,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let n=this.ai[e.toKey()];return n||(n=new BE(t,this.referenceDelegate),this.ai[e.toKey()]=n),n}getGlobalsCache(){return this.li}getTargetCache(){return this.hi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ti}runTransaction(e,t,n){x("MemoryPersistence","Starting transaction:",e);const i=new GE(this.ui.next());return this.referenceDelegate.Ii(),n(i).next(r=>this.referenceDelegate.di(i).next(()=>r)).toPromise().then(r=>(i.raiseOnCommittedEvent(),r))}Ei(e,t){return A.or(Object.values(this.ai).map(n=>()=>n.containsKey(e,t)))}}class GE extends Af{constructor(e){super(),this.currentSequenceNumber=e}}class Fo{constructor(e){this.persistence=e,this.Ai=new Jl,this.Ri=null}static Vi(e){return new Fo(e)}get mi(){if(this.Ri)return this.Ri;throw F(60996)}addReference(e,t,n){return this.Ai.addReference(n,t),this.mi.delete(n.toString()),A.resolve()}removeReference(e,t,n){return this.Ai.removeReference(n,t),this.mi.add(n.toString()),A.resolve()}markPotentiallyOrphaned(e,t){return this.mi.add(t.toString()),A.resolve()}removeTarget(e,t){this.Ai.zr(t.targetId).forEach(i=>this.mi.add(i.toString()));const n=this.persistence.getTargetCache();return n.getMatchingKeysForTargetId(e,t.targetId).next(i=>{i.forEach(r=>this.mi.add(r.toString()))}).next(()=>n.removeTargetData(e,t))}Ii(){this.Ri=new Set}di(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return A.forEach(this.mi,n=>{const i=O.fromPath(n);return this.fi(e,i).next(r=>{r||t.removeEntry(i,q.min())})}).next(()=>(this.Ri=null,t.apply(e)))}updateLimboDocument(e,t){return this.fi(e,t).next(n=>{n?this.mi.delete(t.toString()):this.mi.add(t.toString())})}Pi(e){return 0}fi(e,t){return A.or([()=>A.resolve(this.Ai.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ei(e,t)])}}class so{constructor(e,t){this.persistence=e,this.gi=new St(n=>Be(n.path),(n,i)=>n.isEqual(i)),this.garbageCollector=Up(this,t)}static Vi(e,t){return new so(e,t)}Ii(){}di(e){return A.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}mr(e){const t=this.yr(e);return this.persistence.getTargetCache().getTargetCount(e).next(n=>t.next(i=>n+i))}yr(e){let t=0;return this.gr(e,n=>{t++}).next(()=>t)}gr(e,t){return A.forEach(this.gi,(n,i)=>this.Sr(e,n,i).next(r=>r?A.resolve():t(i)))}removeTargets(e,t,n){return this.persistence.getTargetCache().removeTargets(e,t,n)}removeOrphanedDocuments(e,t){let n=0;const i=this.persistence.getRemoteDocumentCache(),r=i.newChangeBuffer();return i.ri(e,o=>this.Sr(e,o,t).next(l=>{l||(n++,r.removeEntry(o,q.min()))})).next(()=>r.apply(e)).next(()=>n)}markPotentiallyOrphaned(e,t){return this.gi.set(t,e.currentSequenceNumber),A.resolve()}removeTarget(e,t){const n=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,n)}addReference(e,t,n){return this.gi.set(n,e.currentSequenceNumber),A.resolve()}removeReference(e,t,n){return this.gi.set(n,e.currentSequenceNumber),A.resolve()}updateLimboDocument(e,t){return this.gi.set(t,e.currentSequenceNumber),A.resolve()}Pi(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Nr(e.data.value)),t}Sr(e,t,n){return A.or([()=>this.persistence.Ei(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const i=this.gi.get(t);return A.resolve(i!==void 0&&i>n)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
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
 */class KE{constructor(e){this.serializer=e}q(e,t,n,i){const r=new Co("createOrUpgrade",t);n<1&&i>=1&&(function(u){u.createObjectStore(Ui)}(e),function(u){u.createObjectStore(Ii,{keyPath:iy}),u.createObjectStore(st,{keyPath:oh,autoIncrement:!0}).createIndex(fn,ah,{unique:!0}),u.createObjectStore(rs)}(e),Yh(e),function(u){u.createObjectStore(an)}(e));let o=A.resolve();return n<3&&i>=3&&(n!==0&&(function(u){u.deleteObjectStore(as),u.deleteObjectStore(os),u.deleteObjectStore(mn)}(e),Yh(e)),o=o.next(()=>function(u){const h=u.store(mn),f={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:q.min().toTimestamp(),targetCount:0};return h.put(Wr,f)}(r))),n<4&&i>=4&&(n!==0&&(o=o.next(()=>function(u,h){return h.store(st).j().next(p=>{u.deleteObjectStore(st),u.createObjectStore(st,{keyPath:oh,autoIncrement:!0}).createIndex(fn,ah,{unique:!0});const m=h.store(st),v=p.map(S=>m.put(S));return A.waitFor(v)})}(e,r))),o=o.next(()=>{(function(u){u.createObjectStore(ls,{keyPath:fy})})(e)})),n<5&&i>=5&&(o=o.next(()=>this.pi(r))),n<6&&i>=6&&(o=o.next(()=>(function(u){u.createObjectStore(Ti)}(e),this.yi(r)))),n<7&&i>=7&&(o=o.next(()=>this.wi(r))),n<8&&i>=8&&(o=o.next(()=>this.Si(e,r))),n<9&&i>=9&&(o=o.next(()=>{(function(u){u.objectStoreNames.contains("remoteDocumentChanges")&&u.deleteObjectStore("remoteDocumentChanges")})(e)})),n<10&&i>=10&&(o=o.next(()=>this.bi(r))),n<11&&i>=11&&(o=o.next(()=>{(function(u){u.createObjectStore(Po,{keyPath:py})})(e),function(u){u.createObjectStore(bo,{keyPath:_y})}(e)})),n<12&&i>=12&&(o=o.next(()=>{(function(u){const h=u.createObjectStore(xo,{keyPath:vy});h.createIndex(ja,wy,{unique:!1}),h.createIndex(Vf,Ay,{unique:!1})})(e)})),n<13&&i>=13&&(o=o.next(()=>function(u){const h=u.createObjectStore(Kr,{keyPath:oy});h.createIndex(br,ay),h.createIndex(Pf,ly)}(e)).next(()=>this.Di(e,r)).next(()=>e.deleteObjectStore(an))),n<14&&i>=14&&(o=o.next(()=>this.Ci(e,r))),n<15&&i>=15&&(o=o.next(()=>function(u){u.createObjectStore(Nl,{keyPath:my,autoIncrement:!0}).createIndex(qa,gy,{unique:!1}),u.createObjectStore(ri,{keyPath:yy}).createIndex(xf,Ey,{unique:!1}),u.createObjectStore(oi,{keyPath:Iy}).createIndex(Nf,Ty,{unique:!1})}(e))),n<16&&i>=16&&(o=o.next(()=>{t.objectStore(ri).clear()}).next(()=>{t.objectStore(oi).clear()})),n<17&&i>=17&&(o=o.next(()=>{(function(u){u.createObjectStore(Vl,{keyPath:Ry})})(e)})),n<18&&i>=18&&of()&&(o=o.next(()=>{t.objectStore(ri).clear()}).next(()=>{t.objectStore(oi).clear()})),o}yi(e){let t=0;return e.store(an).X((n,i)=>{t+=no(i)}).next(()=>{const n={byteSize:t};return e.store(Ti).put(Ba,n)})}pi(e){const t=e.store(Ii),n=e.store(st);return t.j().next(i=>A.forEach(i,r=>{const o=IDBKeyRange.bound([r.userId,_n],[r.userId,r.lastAcknowledgedBatchId]);return n.j(fn,o).next(l=>A.forEach(l,u=>{L(u.userId===r.userId,18650,"Cannot process batch from unexpected user",{batchId:u.batchId});const h=cn(this.serializer,u);return kp(e,r.userId,h).next(()=>{})}))}))}wi(e){const t=e.store(as),n=e.store(an);return e.store(mn).get(Wr).next(i=>{const r=[];return n.X((o,l)=>{const u=new oe(o),h=function(p){return[0,Be(p)]}(u);r.push(t.get(h).next(f=>f?A.resolve():(p=>t.put({targetId:0,path:Be(p),sequenceNumber:i.highestListenSequenceNumber}))(u)))}).next(()=>A.waitFor(r))})}Si(e,t){e.createObjectStore(vi,{keyPath:dy});const n=t.store(vi),i=new Xl,r=o=>{if(i.add(o)){const l=o.lastSegment(),u=o.popLast();return n.put({collectionId:l,parent:Be(u)})}};return t.store(an).X({Z:!0},(o,l)=>{const u=new oe(o);return r(u.popLast())}).next(()=>t.store(rs).X({Z:!0},([o,l,u],h)=>{const f=ft(l);return r(f.popLast())}))}bi(e){const t=e.store(os);return t.X((n,i)=>{const r=ni(i),o=bp(this.serializer,r);return t.put(o)})}Di(e,t){const n=t.store(an),i=[];return n.X((r,o)=>{const l=t.store(Kr),u=function(p){return p.document?new O(oe.fromString(p.document.name).popFirst(5)):p.noDocument?O.fromSegments(p.noDocument.path):p.unknownDocument?O.fromSegments(p.unknownDocument.path):F(36783)}(o).path.toArray(),h={prefixPath:u.slice(0,u.length-2),collectionGroup:u[u.length-2],documentId:u[u.length-1],readTime:o.readTime||[0,0],unknownDocument:o.unknownDocument,noDocument:o.noDocument,document:o.document,hasCommittedMutations:!!o.hasCommittedMutations};i.push(l.put(h))}).next(()=>A.waitFor(i))}Ci(e,t){const n=t.store(st),i=qp(this.serializer),r=new Zl(Fo.Vi,this.serializer.gt);return n.j().next(o=>{const l=new Map;return o.forEach(u=>{var h;let f=(h=l.get(u.userId))!==null&&h!==void 0?h:W();cn(this.serializer,u).keys().forEach(p=>f=f.add(p)),l.set(u.userId,f)}),A.forEach(l,(u,h)=>{const f=new Oe(h),p=Oo.yt(this.serializer,f),m=r.getIndexManager(f),v=Mo.yt(f,this.serializer,m,r.referenceDelegate);return new jp(i,v,p,m).recalculateAndSaveOverlaysForDocumentKeys(new za(t,Ge.ue),u).next()})})}}function Yh(s){s.createObjectStore(as,{keyPath:cy}).createIndex(xl,hy,{unique:!0}),s.createObjectStore(os,{keyPath:"targetId"}).createIndex(bf,uy,{unique:!0}),s.createObjectStore(mn)}const Ot="IndexedDbPersistence",wa=18e5,Aa=5e3,Ra="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.",WE="main";class eu{constructor(e,t,n,i,r,o,l,u,h,f,p=18){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=n,this.Fi=r,this.window=o,this.document=l,this.Mi=h,this.xi=f,this.Oi=p,this.ui=null,this.ci=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Ni=null,this.inForeground=!1,this.Bi=null,this.Li=null,this.ki=Number.NEGATIVE_INFINITY,this.qi=m=>Promise.resolve(),!eu.C())throw new M(b.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new DE(this,i),this.Qi=t+WE,this.serializer=new Pp(u),this.$i=new Bt(this.Qi,this.Oi,new KE(this.serializer)),this.li=new vE,this.hi=new xE(this.referenceDelegate,this.serializer),this.remoteDocumentCache=qp(this.serializer),this.Ti=new TE,this.window&&this.window.localStorage?this.Ui=this.window.localStorage:(this.Ui=null,f===!1&&Te(Ot,"LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.Ki().then(()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new M(b.FAILED_PRECONDITION,Ra);return this.Wi(),this.Gi(),this.zi(),this.runTransaction("getHighestListenSequenceNumber","readonly",e=>this.hi.getHighestSequenceNumber(e))}).then(e=>{this.ui=new Ge(e,this.Mi)}).then(()=>{this.ci=!0}).catch(e=>(this.$i&&this.$i.close(),Promise.reject(e)))}ji(e){return this.qi=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.$i.setDatabaseDeletedListener(e)}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.Fi.enqueueAndForget(async()=>{this.started&&await this.Ki()}))}Ki(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",e=>Tr(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next(()=>{if(this.isPrimary)return this.Ji(e).next(t=>{t||(this.isPrimary=!1,this.Fi.enqueueRetryable(()=>this.qi(!1)))})}).next(()=>this.Hi(e)).next(t=>this.isPrimary&&!t?this.Yi(e).next(()=>!1):!!t&&this.Zi(e).next(()=>!0))).catch(e=>{if(Xt(e))return x(Ot,"Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return x(Ot,"Releasing owner lease after error during lease refresh",e),!1}).then(e=>{this.isPrimary!==e&&this.Fi.enqueueRetryable(()=>this.qi(e)),this.isPrimary=e})}Ji(e){return Qs(e).get(Ln).next(t=>A.resolve(this.Xi(t)))}es(e){return Tr(e).delete(this.clientId)}async ts(){if(this.isPrimary&&!this.ns(this.ki,wa)){this.ki=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",t=>{const n=we(t,ls);return n.j().next(i=>{const r=this.rs(i,wa),o=i.filter(l=>r.indexOf(l)===-1);return A.forEach(o,l=>n.delete(l.clientId)).next(()=>o)})}).catch(()=>[]);if(this.Ui)for(const t of e)this.Ui.removeItem(this.ss(t.clientId))}}zi(){this.Li=this.Fi.enqueueAfterDelay("client_metadata_refresh",4e3,()=>this.Ki().then(()=>this.ts()).then(()=>this.zi()))}Xi(e){return!!e&&e.ownerId===this.clientId}Hi(e){return this.xi?A.resolve(!0):Qs(e).get(Ln).next(t=>{if(t!==null&&this.ns(t.leaseTimestampMs,Aa)&&!this._s(t.ownerId)){if(this.Xi(t)&&this.networkEnabled)return!0;if(!this.Xi(t)){if(!t.allowTabSynchronization)throw new M(b.FAILED_PRECONDITION,Ra);return!1}}return!(!this.networkEnabled||!this.inForeground)||Tr(e).j().next(n=>this.rs(n,Aa).find(i=>{if(this.clientId!==i.clientId){const r=!this.networkEnabled&&i.networkEnabled,o=!this.inForeground&&i.inForeground,l=this.networkEnabled===i.networkEnabled;if(r||o&&l)return!0}return!1})===void 0)}).next(t=>(this.isPrimary!==t&&x(Ot,`Client ${t?"is":"is not"} eligible for a primary lease.`),t))}async shutdown(){this.ci=!1,this.us(),this.Li&&(this.Li.cancel(),this.Li=null),this.cs(),this.ls(),await this.$i.runTransaction("shutdown","readwrite",[Ui,ls],e=>{const t=new za(e,Ge.ue);return this.Yi(t).next(()=>this.es(t))}),this.$i.close(),this.hs()}rs(e,t){return e.filter(n=>this.ns(n.updateTimeMs,t)&&!this._s(n.clientId))}Ps(){return this.runTransaction("getActiveClients","readonly",e=>Tr(e).j().next(t=>this.rs(t,wa).map(n=>n.clientId)))}get started(){return this.ci}getGlobalsCache(){return this.li}getMutationQueue(e,t){return Mo.yt(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.hi}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new bE(e,this.serializer.gt.databaseId)}getDocumentOverlayCache(e){return Oo.yt(this.serializer,e)}getBundleCache(){return this.Ti}runTransaction(e,t,n){x(Ot,"Starting transaction:",e);const i=t==="readonly"?"readonly":"readwrite",r=function(u){return u===18?Py:u===17?Mf:u===16?Sy:u===15?Dl:u===14?Of:u===13?kf:u===12?Cy:u===11?Df:void F(60245)}(this.Oi);let o;return this.$i.runTransaction(e,i,r,l=>(o=new za(l,this.ui?this.ui.next():Ge.ue),t==="readwrite-primary"?this.Ji(o).next(u=>!!u||this.Hi(o)).next(u=>{if(!u)throw Te(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.Fi.enqueueRetryable(()=>this.qi(!1)),new M(b.FAILED_PRECONDITION,wf);return n(o)}).next(u=>this.Zi(o).next(()=>u)):this.Ts(o).next(()=>n(o)))).then(l=>(o.raiseOnCommittedEvent(),l))}Ts(e){return Qs(e).get(Ln).next(t=>{if(t!==null&&this.ns(t.leaseTimestampMs,Aa)&&!this._s(t.ownerId)&&!this.Xi(t)&&!(this.xi||this.allowTabSynchronization&&t.allowTabSynchronization))throw new M(b.FAILED_PRECONDITION,Ra)})}Zi(e){const t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return Qs(e).put(Ln,t)}static C(){return Bt.C()}Yi(e){const t=Qs(e);return t.get(Ln).next(n=>this.Xi(n)?(x(Ot,"Releasing primary lease."),t.delete(Ln)):A.resolve())}ns(e,t){const n=Date.now();return!(e<n-t)&&(!(e>n)||(Te(`Detected an update time that is in the future: ${e} > ${n}`),!1))}Wi(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.Bi=()=>{this.Fi.enqueueAndForget(()=>(this.inForeground=this.document.visibilityState==="visible",this.Ki()))},this.document.addEventListener("visibilitychange",this.Bi),this.inForeground=this.document.visibilityState==="visible")}cs(){this.Bi&&(this.document.removeEventListener("visibilitychange",this.Bi),this.Bi=null)}Gi(){var e;typeof((e=this.window)===null||e===void 0?void 0:e.addEventListener)=="function"&&(this.Ni=()=>{this.us();const t=/(?:Version|Mobile)\/1[456]/;rf()&&(navigator.appVersion.match(t)||navigator.userAgent.match(t))&&this.Fi.enterRestrictedMode(!0),this.Fi.enqueueAndForget(()=>this.shutdown())},this.window.addEventListener("pagehide",this.Ni))}ls(){this.Ni&&(this.window.removeEventListener("pagehide",this.Ni),this.Ni=null)}_s(e){var t;try{const n=((t=this.Ui)===null||t===void 0?void 0:t.getItem(this.ss(e)))!==null;return x(Ot,`Client '${e}' ${n?"is":"is not"} zombied in LocalStorage`),n}catch(n){return Te(Ot,"Failed to get zombied client id.",n),!1}}us(){if(this.Ui)try{this.Ui.setItem(this.ss(this.clientId),String(Date.now()))}catch(e){Te("Failed to set zombie client id.",e)}}hs(){if(this.Ui)try{this.Ui.removeItem(this.ss(this.clientId))}catch{}}ss(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function Qs(s){return we(s,Ui)}function Tr(s){return we(s,ls)}function zp(s,e){let t=s.projectId;return s.isDefaultDatabase||(t+="."+s.database),"firestore/"+e+"/"+t+"/"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tu{constructor(e,t,n,i){this.targetId=e,this.fromCache=t,this.Is=n,this.ds=i}static Es(e,t){let n=W(),i=W();for(const r of t.docChanges)switch(r.type){case 0:n=n.add(r.doc.key);break;case 1:i=i.add(r.doc.key)}return new tu(e,t.fromCache,n,i)}}/**
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
 */class $E{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class Gp{constructor(){this.As=!1,this.Rs=!1,this.Vs=100,this.fs=function(){return rf()?8:Rf(Br())>0?6:4}()}initialize(e,t){this.gs=e,this.indexManager=t,this.As=!0}getDocumentsMatchingQuery(e,t,n,i){const r={result:null};return this.ps(e,t).next(o=>{r.result=o}).next(()=>{if(!r.result)return this.ys(e,t,i,n).next(o=>{r.result=o})}).next(()=>{if(r.result)return;const o=new $E;return this.ws(e,t,o).next(l=>{if(r.result=l,this.Rs)return this.Ss(e,t,o,l.size)})}).next(()=>r.result)}Ss(e,t,n,i){return n.documentReadCount<this.Vs?(Kn()<=dt.DEBUG&&x("QueryEngine","SDK will not create cache indexes for query:",zs(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Vs,"documents"),A.resolve()):(Kn()<=dt.DEBUG&&x("QueryEngine","Query:",zs(t),"scans",n.documentReadCount,"local documents and returns",i,"documents as results."),n.documentReadCount>this.fs*i?(Kn()<=dt.DEBUG&&x("QueryEngine","The SDK decides to create cache indexes for query:",zs(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,tt(t))):A.resolve())}ps(e,t){if(Ih(t))return A.resolve(null);let n=tt(t);return this.indexManager.getIndexType(e,n).next(i=>i===0?null:(t.limit!==null&&i===1&&(t=Ya(t,null,"F"),n=tt(t)),this.indexManager.getDocumentsMatchingTarget(e,n).next(r=>{const o=W(...r);return this.gs.getDocuments(e,o).next(l=>this.indexManager.getMinOffset(e,n).next(u=>{const h=this.bs(t,l);return this.Ds(t,h,o,u.readTime)?this.ps(e,Ya(t,null,"F")):this.vs(e,h,t,u)}))})))}ys(e,t,n,i){return Ih(t)||i.isEqual(q.min())?A.resolve(null):this.gs.getDocuments(e,n).next(r=>{const o=this.bs(t,r);return this.Ds(t,o,n,i)?A.resolve(null):(Kn()<=dt.DEBUG&&x("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),zs(t)),this.vs(e,o,t,Tf(i,is)).next(l=>l))})}bs(e,t){let n=new ne(sp(e));return t.forEach((i,r)=>{qi(e,r)&&(n=n.add(r))}),n}Ds(e,t,n,i){if(e.limit===null)return!1;if(n.size!==t.size)return!0;const r=e.limitType==="F"?t.last():t.first();return!!r&&(r.hasPendingWrites||r.version.compareTo(i)>0)}ws(e,t,n){return Kn()<=dt.DEBUG&&x("QueryEngine","Using full collection scan to execute query:",zs(t)),this.gs.getDocumentsMatchingQuery(e,t,et.min(),n)}vs(e,t,n,i){return this.gs.getDocumentsMatchingQuery(e,n,i).next(r=>(t.forEach(o=>{r=r.insert(o.key,o)}),r))}}/**
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
 */const nu="LocalStore",QE=3e8;class HE{constructor(e,t,n,i){this.persistence=e,this.Cs=t,this.serializer=i,this.Fs=new fe(z),this.Ms=new St(r=>In(r),Bi),this.xs=new Map,this.Os=e.getRemoteDocumentCache(),this.hi=e.getTargetCache(),this.Ti=e.getBundleCache(),this.Ns(n)}Ns(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new jp(this.Os,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Os.setIndexManager(this.indexManager),this.Cs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.Fs))}}function Kp(s,e,t,n){return new HE(s,e,t,n)}async function Wp(s,e){const t=U(s);return await t.persistence.runTransaction("Handle user change","readonly",n=>{let i;return t.mutationQueue.getAllMutationBatches(n).next(r=>(i=r,t.Ns(e),t.mutationQueue.getAllMutationBatches(n))).next(r=>{const o=[],l=[];let u=W();for(const h of i){o.push(h.batchId);for(const f of h.mutations)u=u.add(f.key)}for(const h of r){l.push(h.batchId);for(const f of h.mutations)u=u.add(f.key)}return t.localDocuments.getDocuments(n,u).next(h=>({Bs:h,removedBatchIds:o,addedBatchIds:l}))})})}function YE(s,e){const t=U(s);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",n=>{const i=e.batch.keys(),r=t.Os.newChangeBuffer({trackRemovals:!0});return function(l,u,h,f){const p=h.batch,m=p.keys();let v=A.resolve();return m.forEach(S=>{v=v.next(()=>f.getEntry(u,S)).next(N=>{const V=h.docVersions.get(S);L(V!==null,48541),N.version.compareTo(V)<0&&(p.applyToRemoteDocument(N,h),N.isValidDocument()&&(N.setReadTime(h.commitVersion),f.addEntry(N)))})}),v.next(()=>l.mutationQueue.removeMutationBatch(u,p))}(t,n,e,r).next(()=>r.apply(n)).next(()=>t.mutationQueue.performConsistencyCheck(n)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(n,i,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(n,function(l){let u=W();for(let h=0;h<l.mutationResults.length;++h)l.mutationResults[h].transformResults.length>0&&(u=u.add(l.batch.mutations[h].key));return u}(e))).next(()=>t.localDocuments.getDocuments(n,i))})}function $p(s){const e=U(s);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.hi.getLastRemoteSnapshotVersion(t))}function XE(s,e){const t=U(s),n=e.snapshotVersion;let i=t.Fs;return t.persistence.runTransaction("Apply remote event","readwrite-primary",r=>{const o=t.Os.newChangeBuffer({trackRemovals:!0});i=t.Fs;const l=[];e.targetChanges.forEach((f,p)=>{const m=i.get(p);if(!m)return;l.push(t.hi.removeMatchingKeys(r,f.removedDocuments,p).next(()=>t.hi.addMatchingKeys(r,f.addedDocuments,p)));let v=m.withSequenceNumber(r.currentSequenceNumber);e.targetMismatches.get(p)!==null?v=v.withResumeToken(ge.EMPTY_BYTE_STRING,q.min()).withLastLimboFreeSnapshotVersion(q.min()):f.resumeToken.approximateByteSize()>0&&(v=v.withResumeToken(f.resumeToken,n)),i=i.insert(p,v),function(N,V,K){return N.resumeToken.approximateByteSize()===0||V.snapshotVersion.toMicroseconds()-N.snapshotVersion.toMicroseconds()>=QE?!0:K.addedDocuments.size+K.modifiedDocuments.size+K.removedDocuments.size>0}(m,v,f)&&l.push(t.hi.updateTargetData(r,v))});let u=Je(),h=W();if(e.documentUpdates.forEach(f=>{e.resolvedLimboDocuments.has(f)&&l.push(t.persistence.referenceDelegate.updateLimboDocument(r,f))}),l.push(JE(r,o,e.documentUpdates).next(f=>{u=f.Ls,h=f.ks})),!n.isEqual(q.min())){const f=t.hi.getLastRemoteSnapshotVersion(r).next(p=>t.hi.setTargetsMetadata(r,r.currentSequenceNumber,n));l.push(f)}return A.waitFor(l).next(()=>o.apply(r)).next(()=>t.localDocuments.getLocalViewOfDocuments(r,u,h)).next(()=>u)}).then(r=>(t.Fs=i,r))}function JE(s,e,t){let n=W(),i=W();return t.forEach(r=>n=n.add(r)),e.getEntries(s,n).next(r=>{let o=Je();return t.forEach((l,u)=>{const h=r.get(l);u.isFoundDocument()!==h.isFoundDocument()&&(i=i.add(l)),u.isNoDocument()&&u.version.isEqual(q.min())?(e.removeEntry(l,u.readTime),o=o.insert(l,u)):!h.isValidDocument()||u.version.compareTo(h.version)>0||u.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(u),o=o.insert(l,u)):x(nu,"Ignoring outdated watch update for ",l,". Current version:",h.version," Watch version:",u.version)}),{Ls:o,ks:i}})}function ZE(s,e){const t=U(s);return t.persistence.runTransaction("Get next mutation batch","readonly",n=>(e===void 0&&(e=_n),t.mutationQueue.getNextMutationBatchAfterBatchId(n,e)))}function il(s,e){const t=U(s);return t.persistence.runTransaction("Allocate target","readwrite",n=>{let i;return t.hi.getTargetData(n,e).next(r=>r?(i=r,A.resolve(i)):t.hi.allocateTargetId(n).next(o=>(i=new It(e,o,"TargetPurposeListen",n.currentSequenceNumber),t.hi.addTargetData(n,i).next(()=>i))))}).then(n=>{const i=t.Fs.get(n.targetId);return(i===null||n.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(t.Fs=t.Fs.insert(n.targetId,n),t.Ms.set(e,n.targetId)),n})}async function Lo(s,e,t){const n=U(s),i=n.Fs.get(e),r=t?"readwrite":"readwrite-primary";try{t||await n.persistence.runTransaction("Release target",r,o=>n.persistence.referenceDelegate.removeTarget(o,i))}catch(o){if(!Xt(o))throw o;x(nu,`Failed to update sequence numbers for target ${e}: ${o}`)}n.Fs=n.Fs.remove(e),n.Ms.delete(i.target)}function rl(s,e,t){const n=U(s);let i=q.min(),r=W();return n.persistence.runTransaction("Execute query","readwrite",o=>function(u,h,f){const p=U(u),m=p.Ms.get(f);return m!==void 0?A.resolve(p.Fs.get(m)):p.hi.getTargetData(h,f)}(n,o,tt(e)).next(l=>{if(l)return i=l.lastLimboFreeSnapshotVersion,n.hi.getMatchingKeysForTargetId(o,l.targetId).next(u=>{r=u})}).next(()=>n.Cs.getDocumentsMatchingQuery(o,e,t?i:q.min(),t?r:W())).next(l=>(Yp(n,np(e),l),{documents:l,qs:r})))}function Qp(s,e){const t=U(s),n=U(t.hi),i=t.Fs.get(e);return i?Promise.resolve(i.target):t.persistence.runTransaction("Get target data","readonly",r=>n.Et(r,e).next(o=>o?o.target:null))}function Hp(s,e){const t=U(s),n=t.xs.get(e)||q.min();return t.persistence.runTransaction("Get new document changes","readonly",i=>t.Os.getAllFromCollectionGroup(i,e,Tf(n,is),Number.MAX_SAFE_INTEGER)).then(i=>(Yp(t,e,i),i))}function Yp(s,e,t){let n=s.xs.get(e)||q.min();t.forEach((i,r)=>{r.readTime.compareTo(n)>0&&(n=r.readTime)}),s.xs.set(e,n)}/**
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
 */const Xp="firestore_clients";function Xh(s,e){return`${Xp}_${s}_${e}`}const Jp="firestore_mutations";function Jh(s,e,t){let n=`${Jp}_${s}_${t}`;return e.isAuthenticated()&&(n+=`_${e.uid}`),n}const Zp="firestore_targets";function Ca(s,e){return`${Zp}_${s}_${e}`}/**
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
 */const ht="SharedClientState";class io{constructor(e,t,n,i){this.user=e,this.batchId=t,this.state=n,this.error=i}static Ks(e,t,n){const i=JSON.parse(n);let r,o=typeof i=="object"&&["pending","acknowledged","rejected"].indexOf(i.state)!==-1&&(i.error===void 0||typeof i.error=="object");return o&&i.error&&(o=typeof i.error.message=="string"&&typeof i.error.code=="string",o&&(r=new M(i.error.code,i.error.message))),o?new io(e,t,i.state,r):(Te(ht,`Failed to parse mutation state for ID '${t}': ${n}`),null)}Ws(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class hi{constructor(e,t,n){this.targetId=e,this.state=t,this.error=n}static Ks(e,t){const n=JSON.parse(t);let i,r=typeof n=="object"&&["not-current","current","rejected"].indexOf(n.state)!==-1&&(n.error===void 0||typeof n.error=="object");return r&&n.error&&(r=typeof n.error.message=="string"&&typeof n.error.code=="string",r&&(i=new M(n.error.code,n.error.message))),r?new hi(e,n.state,i):(Te(ht,`Failed to parse target state for ID '${e}': ${t}`),null)}Ws(){const e={state:this.state,updateTimeMs:Date.now()};return this.error&&(e.error={code:this.error.code,message:this.error.message}),JSON.stringify(e)}}class ro{constructor(e,t){this.clientId=e,this.activeTargetIds=t}static Ks(e,t){const n=JSON.parse(t);let i=typeof n=="object"&&n.activeTargetIds instanceof Array,r=jl();for(let o=0;i&&o<n.activeTargetIds.length;++o)i=Cf(n.activeTargetIds[o]),r=r.add(n.activeTargetIds[o]);return i?new ro(e,r):(Te(ht,`Failed to parse client data for instance '${e}': ${t}`),null)}}class su{constructor(e,t){this.clientId=e,this.onlineState=t}static Ks(e){const t=JSON.parse(e);return typeof t=="object"&&["Unknown","Online","Offline"].indexOf(t.onlineState)!==-1&&typeof t.clientId=="string"?new su(t.clientId,t.onlineState):(Te(ht,`Failed to parse online state: ${e}`),null)}}class ol{constructor(){this.activeTargetIds=jl()}Gs(e){this.activeTargetIds=this.activeTargetIds.add(e)}zs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Ws(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class Sa{constructor(e,t,n,i,r){this.window=e,this.Fi=t,this.persistenceKey=n,this.js=i,this.syncEngine=null,this.onlineStateHandler=null,this.sequenceNumberHandler=null,this.Js=this.Hs.bind(this),this.Ys=new fe(z),this.started=!1,this.Zs=[];const o=n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");this.storage=this.window.localStorage,this.currentUser=r,this.Xs=Xh(this.persistenceKey,this.js),this.eo=function(u){return`firestore_sequence_number_${u}`}(this.persistenceKey),this.Ys=this.Ys.insert(this.js,new ol),this.no=new RegExp(`^${Xp}_${o}_([^_]*)$`),this.ro=new RegExp(`^${Jp}_${o}_(\\d+)(?:_(.*))?$`),this.io=new RegExp(`^${Zp}_${o}_(\\d+)$`),this.so=function(u){return`firestore_online_state_${u}`}(this.persistenceKey),this.oo=function(u){return`firestore_bundle_loaded_v2_${u}`}(this.persistenceKey),this.window.addEventListener("storage",this.Js)}static C(e){return!(!e||!e.localStorage)}async start(){const e=await this.syncEngine.Ps();for(const n of e){if(n===this.js)continue;const i=this.getItem(Xh(this.persistenceKey,n));if(i){const r=ro.Ks(n,i);r&&(this.Ys=this.Ys.insert(r.clientId,r))}}this._o();const t=this.storage.getItem(this.so);if(t){const n=this.ao(t);n&&this.uo(n)}for(const n of this.Zs)this.Hs(n);this.Zs=[],this.window.addEventListener("pagehide",()=>this.shutdown()),this.started=!0}writeSequenceNumber(e){this.setItem(this.eo,JSON.stringify(e))}getAllActiveQueryTargets(){return this.co(this.Ys)}isActiveQueryTarget(e){let t=!1;return this.Ys.forEach((n,i)=>{i.activeTargetIds.has(e)&&(t=!0)}),t}addPendingMutation(e){this.lo(e,"pending")}updateMutationState(e,t,n){this.lo(e,t,n),this.ho(e)}addLocalQueryTarget(e,t=!0){let n="not-current";if(this.isActiveQueryTarget(e)){const i=this.storage.getItem(Ca(this.persistenceKey,e));if(i){const r=hi.Ks(e,i);r&&(n=r.state)}}return t&&this.Po.Gs(e),this._o(),n}removeLocalQueryTarget(e){this.Po.zs(e),this._o()}isLocalQueryTarget(e){return this.Po.activeTargetIds.has(e)}clearQueryState(e){this.removeItem(Ca(this.persistenceKey,e))}updateQueryState(e,t,n){this.To(e,t,n)}handleUserChange(e,t,n){t.forEach(i=>{this.ho(i)}),this.currentUser=e,n.forEach(i=>{this.addPendingMutation(i)})}setOnlineState(e){this.Io(e)}notifyBundleLoaded(e){this.Eo(e)}shutdown(){this.started&&(this.window.removeEventListener("storage",this.Js),this.removeItem(this.Xs),this.started=!1)}getItem(e){const t=this.storage.getItem(e);return x(ht,"READ",e,t),t}setItem(e,t){x(ht,"SET",e,t),this.storage.setItem(e,t)}removeItem(e){x(ht,"REMOVE",e),this.storage.removeItem(e)}Hs(e){const t=e;if(t.storageArea===this.storage){if(x(ht,"EVENT",t.key,t.newValue),t.key===this.Xs)return void Te("Received WebStorage notification for local change. Another client might have garbage-collected our state");this.Fi.enqueueRetryable(async()=>{if(this.started){if(t.key!==null){if(this.no.test(t.key)){if(t.newValue==null){const n=this.Ao(t.key);return this.Ro(n,null)}{const n=this.Vo(t.key,t.newValue);if(n)return this.Ro(n.clientId,n)}}else if(this.ro.test(t.key)){if(t.newValue!==null){const n=this.mo(t.key,t.newValue);if(n)return this.fo(n)}}else if(this.io.test(t.key)){if(t.newValue!==null){const n=this.po(t.key,t.newValue);if(n)return this.yo(n)}}else if(t.key===this.so){if(t.newValue!==null){const n=this.ao(t.newValue);if(n)return this.uo(n)}}else if(t.key===this.eo){const n=function(r){let o=Ge.ue;if(r!=null)try{const l=JSON.parse(r);L(typeof l=="number",30636,{wo:r}),o=l}catch(l){Te(ht,"Failed to read sequence number from WebStorage",l)}return o}(t.newValue);n!==Ge.ue&&this.sequenceNumberHandler(n)}else if(t.key===this.oo){const n=this.So(t.newValue);await Promise.all(n.map(i=>this.syncEngine.bo(i)))}}}else this.Zs.push(t)})}}get Po(){return this.Ys.get(this.js)}_o(){this.setItem(this.Xs,this.Po.Ws())}lo(e,t,n){const i=new io(this.currentUser,e,t,n),r=Jh(this.persistenceKey,this.currentUser,e);this.setItem(r,i.Ws())}ho(e){const t=Jh(this.persistenceKey,this.currentUser,e);this.removeItem(t)}Io(e){const t={clientId:this.js,onlineState:e};this.storage.setItem(this.so,JSON.stringify(t))}To(e,t,n){const i=Ca(this.persistenceKey,e),r=new hi(e,t,n);this.setItem(i,r.Ws())}Eo(e){const t=JSON.stringify(Array.from(e));this.setItem(this.oo,t)}Ao(e){const t=this.no.exec(e);return t?t[1]:null}Vo(e,t){const n=this.Ao(e);return ro.Ks(n,t)}mo(e,t){const n=this.ro.exec(e),i=Number(n[1]),r=n[2]!==void 0?n[2]:null;return io.Ks(new Oe(r),i,t)}po(e,t){const n=this.io.exec(e),i=Number(n[1]);return hi.Ks(i,t)}ao(e){return su.Ks(e)}So(e){return JSON.parse(e)}async fo(e){if(e.user.uid===this.currentUser.uid)return this.syncEngine.Do(e.batchId,e.state,e.error);x(ht,`Ignoring mutation for non-active user ${e.user.uid}`)}yo(e){return this.syncEngine.vo(e.targetId,e.state,e.error)}Ro(e,t){const n=t?this.Ys.insert(e,t):this.Ys.remove(e),i=this.co(this.Ys),r=this.co(n),o=[],l=[];return r.forEach(u=>{i.has(u)||o.push(u)}),i.forEach(u=>{r.has(u)||l.push(u)}),this.syncEngine.Co(o,l).then(()=>{this.Ys=n})}uo(e){this.Ys.get(e.clientId)&&this.onlineStateHandler(e.onlineState)}co(e){let t=jl();return e.forEach((n,i)=>{t=t.unionWith(i.activeTargetIds)}),t}}class e_{constructor(){this.Fo=new ol,this.Mo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,n){}addLocalQueryTarget(e,t=!0){return t&&this.Fo.Gs(e),this.Mo[e]||"not-current"}updateQueryState(e,t,n){this.Mo[e]=t}removeLocalQueryTarget(e){this.Fo.zs(e)}isLocalQueryTarget(e){return this.Fo.activeTargetIds.has(e)}clearQueryState(e){delete this.Mo[e]}getAllActiveQueryTargets(){return this.Fo.activeTargetIds}isActiveQueryTarget(e){return this.Fo.activeTargetIds.has(e)}start(){return this.Fo=new ol,Promise.resolve()}handleUserChange(e,t,n){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class eI{xo(e){}shutdown(){}}/**
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
 */const Zh="ConnectivityMonitor";class ed{constructor(){this.Oo=()=>this.No(),this.Bo=()=>this.Lo(),this.ko=[],this.qo()}xo(e){this.ko.push(e)}shutdown(){window.removeEventListener("online",this.Oo),window.removeEventListener("offline",this.Bo)}qo(){window.addEventListener("online",this.Oo),window.addEventListener("offline",this.Bo)}No(){x(Zh,"Network connectivity changed: AVAILABLE");for(const e of this.ko)e(0)}Lo(){x(Zh,"Network connectivity changed: UNAVAILABLE");for(const e of this.ko)e(1)}static C(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let vr=null;function al(){return vr===null?vr=function(){return 268435456+Math.round(2147483648*Math.random())}():vr++,"0x"+vr.toString(16)}/**
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
 */const Pa="RestConnection",tI={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class nI{get Qo(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",n=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.$o=t+"://"+e.host,this.Uo=`projects/${n}/databases/${i}`,this.Ko=this.databaseId.database===Qr?`project_id=${n}`:`project_id=${n}&database_id=${i}`}Wo(e,t,n,i,r){const o=al(),l=this.Go(e,t.toUriEncodedString());x(Pa,`Sending RPC '${e}' ${o}:`,l,n);const u={"google-cloud-resource-prefix":this.Uo,"x-goog-request-params":this.Ko};this.zo(u,i,r);const{host:h}=new URL(l),f=Ao(h);return this.jo(e,l,u,n,f).then(p=>(x(Pa,`Received RPC '${e}' ${o}: `,p),p),p=>{throw zt(Pa,`RPC '${e}' ${o} failed with error: `,p,"url: ",l,"request:",n),p})}Jo(e,t,n,i,r,o){return this.Wo(e,t,n,i,r)}zo(e,t,n){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Es}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach((i,r)=>e[r]=i),n&&n.headers.forEach((i,r)=>e[r]=i)}Go(e,t){const n=tI[e];return`${this.$o}/v1/${t}:${n}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sI{constructor(e){this.Ho=e.Ho,this.Yo=e.Yo}Zo(e){this.Xo=e}e_(e){this.t_=e}n_(e){this.r_=e}onMessage(e){this.i_=e}close(){this.Yo()}send(e){this.Ho(e)}s_(){this.Xo()}o_(){this.t_()}__(e){this.r_(e)}a_(e){this.i_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ke="WebChannelConnection";class iI extends nI{constructor(e){super(e),this.u_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}jo(e,t,n,i,r){const o=al();return new Promise((l,u)=>{const h=new df;h.setWithCredentials(!0),h.listenOnce(ff.COMPLETE,()=>{try{switch(h.getLastErrorCode()){case Cr.NO_ERROR:const p=h.getResponseJson();x(ke,`XHR for RPC '${e}' ${o} received:`,JSON.stringify(p)),l(p);break;case Cr.TIMEOUT:x(ke,`RPC '${e}' ${o} timed out`),u(new M(b.DEADLINE_EXCEEDED,"Request time out"));break;case Cr.HTTP_ERROR:const m=h.getStatus();if(x(ke,`RPC '${e}' ${o} failed with status:`,m,"response text:",h.getResponseText()),m>0){let v=h.getResponseJson();Array.isArray(v)&&(v=v[0]);const S=v==null?void 0:v.error;if(S&&S.status&&S.message){const N=function(K){const j=K.toLowerCase().replace(/_/g,"-");return Object.values(b).indexOf(j)>=0?j:b.UNKNOWN}(S.status);u(new M(N,S.message))}else u(new M(b.UNKNOWN,"Server responded with status "+h.getStatus()))}else u(new M(b.UNAVAILABLE,"Connection failed."));break;default:F(9055,{c_:e,streamId:o,l_:h.getLastErrorCode(),h_:h.getLastError()})}}finally{x(ke,`RPC '${e}' ${o} completed.`)}});const f=JSON.stringify(i);x(ke,`RPC '${e}' ${o} sending request:`,i),h.send(t,"POST",f,n,15)})}P_(e,t,n){const i=al(),r=[this.$o,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=mf(),l=_f(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(u.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(u.useFetchStreams=!0),this.zo(u.initMessageHeaders,t,n),u.encodeInitMessageHeaders=!0;const f=r.join("");x(ke,`Creating RPC '${e}' stream ${i}: ${f}`,u);const p=o.createWebChannel(f,u);this.T_(p);let m=!1,v=!1;const S=new sI({Ho:V=>{v?x(ke,`Not sending because RPC '${e}' stream ${i} is closed:`,V):(m||(x(ke,`Opening RPC '${e}' stream ${i} transport.`),p.open(),m=!0),x(ke,`RPC '${e}' stream ${i} sending:`,V),p.send(V))},Yo:()=>p.close()}),N=(V,K,j)=>{V.listen(K,B=>{try{j(B)}catch(J){setTimeout(()=>{throw J},0)}})};return N(p,Zs.EventType.OPEN,()=>{v||(x(ke,`RPC '${e}' stream ${i} transport opened.`),S.s_())}),N(p,Zs.EventType.CLOSE,()=>{v||(v=!0,x(ke,`RPC '${e}' stream ${i} transport closed`),S.__(),this.I_(p))}),N(p,Zs.EventType.ERROR,V=>{v||(v=!0,zt(ke,`RPC '${e}' stream ${i} transport errored. Name:`,V.name,"Message:",V.message),S.__(new M(b.UNAVAILABLE,"The operation could not be completed")))}),N(p,Zs.EventType.MESSAGE,V=>{var K;if(!v){const j=V.data[0];L(!!j,16349);const B=j,J=(B==null?void 0:B.error)||((K=B[0])===null||K===void 0?void 0:K.error);if(J){x(ke,`RPC '${e}' stream ${i} received error:`,J);const le=J.status;let Z=function(E){const T=ye[E];if(T!==void 0)return _p(T)}(le),I=J.message;Z===void 0&&(Z=b.INTERNAL,I="Unknown error status: "+le+" with message "+J.message),v=!0,S.__(new M(Z,I)),p.close()}else x(ke,`RPC '${e}' stream ${i} received:`,j),S.a_(j)}}),N(l,pf.STAT_EVENT,V=>{V.stat===Fa.PROXY?x(ke,`RPC '${e}' stream ${i} detected buffering proxy`):V.stat===Fa.NOPROXY&&x(ke,`RPC '${e}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{S.o_()},0),S}terminate(){this.u_.forEach(e=>e.close()),this.u_=[]}T_(e){this.u_.push(e)}I_(e){this.u_=this.u_.filter(t=>t===e)}}/**
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
 */function t_(){return typeof window<"u"?window:null}function Mr(){return typeof document<"u"?document:null}/**
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
 */function Uo(s){return new uE(s,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class n_{constructor(e,t,n=1e3,i=1.5,r=6e4){this.Fi=e,this.timerId=t,this.d_=n,this.E_=i,this.A_=r,this.R_=0,this.V_=null,this.m_=Date.now(),this.reset()}reset(){this.R_=0}f_(){this.R_=this.A_}g_(e){this.cancel();const t=Math.floor(this.R_+this.p_()),n=Math.max(0,Date.now()-this.m_),i=Math.max(0,t-n);i>0&&x("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.R_} ms, delay with jitter: ${t} ms, last attempt: ${n} ms ago)`),this.V_=this.Fi.enqueueAfterDelay(this.timerId,i,()=>(this.m_=Date.now(),e())),this.R_*=this.E_,this.R_<this.d_&&(this.R_=this.d_),this.R_>this.A_&&(this.R_=this.A_)}y_(){this.V_!==null&&(this.V_.skipDelay(),this.V_=null)}cancel(){this.V_!==null&&(this.V_.cancel(),this.V_=null)}p_(){return(Math.random()-.5)*this.R_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const td="PersistentStream";class s_{constructor(e,t,n,i,r,o,l,u){this.Fi=e,this.w_=n,this.S_=i,this.connection=r,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=l,this.listener=u,this.state=0,this.b_=0,this.D_=null,this.v_=null,this.stream=null,this.C_=0,this.F_=new n_(e,t)}M_(){return this.state===1||this.state===5||this.x_()}x_(){return this.state===2||this.state===3}start(){this.C_=0,this.state!==4?this.auth():this.O_()}async stop(){this.M_()&&await this.close(0)}N_(){this.state=0,this.F_.reset()}B_(){this.x_()&&this.D_===null&&(this.D_=this.Fi.enqueueAfterDelay(this.w_,6e4,()=>this.L_()))}k_(e){this.q_(),this.stream.send(e)}async L_(){if(this.x_())return this.close(0)}q_(){this.D_&&(this.D_.cancel(),this.D_=null)}Q_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.q_(),this.Q_(),this.F_.cancel(),this.b_++,e!==4?this.F_.reset():t&&t.code===b.RESOURCE_EXHAUSTED?(Te(t.toString()),Te("Using maximum backoff delay to prevent overloading the backend."),this.F_.f_()):t&&t.code===b.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.U_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.n_(t)}U_(){}auth(){this.state=1;const e=this.K_(this.b_),t=this.b_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([n,i])=>{this.b_===t&&this.W_(n,i)},n=>{e(()=>{const i=new M(b.UNKNOWN,"Fetching auth token failed: "+n.message);return this.G_(i)})})}W_(e,t){const n=this.K_(this.b_);this.stream=this.z_(e,t),this.stream.Zo(()=>{n(()=>this.listener.Zo())}),this.stream.e_(()=>{n(()=>(this.state=2,this.v_=this.Fi.enqueueAfterDelay(this.S_,1e4,()=>(this.x_()&&(this.state=3),Promise.resolve())),this.listener.e_()))}),this.stream.n_(i=>{n(()=>this.G_(i))}),this.stream.onMessage(i=>{n(()=>++this.C_==1?this.j_(i):this.onNext(i))})}O_(){this.state=5,this.F_.g_(async()=>{this.state=0,this.start()})}G_(e){return x(td,`close with error: ${e}`),this.stream=null,this.close(4,e)}K_(e){return t=>{this.Fi.enqueueAndForget(()=>this.b_===e?t():(x(td,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class rI extends s_{constructor(e,t,n,i,r,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,n,i,o),this.serializer=r}z_(e,t){return this.connection.P_("Listen",e,t)}j_(e){return this.onNext(e)}onNext(e){this.F_.reset();const t=dE(this.serializer,e),n=function(r){if(!("targetChange"in r))return q.min();const o=r.targetChange;return o.targetIds&&o.targetIds.length?q.min():o.readTime?ze(o.readTime):q.min()}(e);return this.listener.J_(t,n)}H_(e){const t={};t.database=Za(this.serializer),t.addTarget=function(r,o){let l;const u=o.target;if(l=Yr(u)?{documents:wp(r,u)}:{query:Ap(r,u).Vt},l.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){l.resumeToken=yp(r,o.resumeToken);const h=Xa(r,o.expectedCount);h!==null&&(l.expectedCount=h)}else if(o.snapshotVersion.compareTo(q.min())>0){l.readTime=_s(r,o.snapshotVersion.toTimestamp());const h=Xa(r,o.expectedCount);h!==null&&(l.expectedCount=h)}return l}(this.serializer,e);const n=pE(this.serializer,e);n&&(t.labels=n),this.k_(t)}Y_(e){const t={};t.database=Za(this.serializer),t.removeTarget=e,this.k_(t)}}class oI extends s_{constructor(e,t,n,i,r,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,n,i,o),this.serializer=r}get Z_(){return this.C_>0}start(){this.lastStreamToken=void 0,super.start()}U_(){this.Z_&&this.X_([])}z_(e,t){return this.connection.P_("Write",e,t)}j_(e){return L(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,L(!e.writeResults||e.writeResults.length===0,55816),this.listener.ea()}onNext(e){L(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.F_.reset();const t=fE(e.writeResults,e.commitTime),n=ze(e.commitTime);return this.listener.ta(n,t)}na(){const e={};e.database=Za(this.serializer),this.k_(e)}X_(e){const t={streamToken:this.lastStreamToken,writes:e.map(n=>Zr(this.serializer,n))};this.k_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aI{}class lI extends aI{constructor(e,t,n,i){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=n,this.serializer=i,this.ra=!1}ia(){if(this.ra)throw new M(b.FAILED_PRECONDITION,"The client has already been terminated.")}Wo(e,t,n,i){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([r,o])=>this.connection.Wo(e,Ja(t,n),i,r,o)).catch(r=>{throw r.name==="FirebaseError"?(r.code===b.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),r):new M(b.UNKNOWN,r.toString())})}Jo(e,t,n,i,r){return this.ia(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,l])=>this.connection.Jo(e,Ja(t,n),i,o,l,r)).catch(o=>{throw o.name==="FirebaseError"?(o.code===b.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new M(b.UNKNOWN,o.toString())})}terminate(){this.ra=!0,this.connection.terminate()}}class uI{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.sa=0,this.oa=null,this._a=!0}aa(){this.sa===0&&(this.ua("Unknown"),this.oa=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.oa=null,this.ca("Backend didn't respond within 10 seconds."),this.ua("Offline"),Promise.resolve())))}la(e){this.state==="Online"?this.ua("Unknown"):(this.sa++,this.sa>=1&&(this.ha(),this.ca(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ua("Offline")))}set(e){this.ha(),this.sa=0,e==="Online"&&(this._a=!1),this.ua(e)}ua(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}ca(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this._a?(Te(t),this._a=!1):x("OnlineStateTracker",t)}ha(){this.oa!==null&&(this.oa.cancel(),this.oa=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const An="RemoteStore";class cI{constructor(e,t,n,i,r){this.localStore=e,this.datastore=t,this.asyncQueue=n,this.remoteSyncer={},this.Pa=[],this.Ta=new Map,this.Ia=new Set,this.da=[],this.Ea=r,this.Ea.xo(o=>{n.enqueueAndForget(async()=>{Nn(this)&&(x(An,"Restarting streams for network reachability change."),await async function(u){const h=U(u);h.Ia.add(4),await Gi(h),h.Aa.set("Unknown"),h.Ia.delete(4),await Bo(h)}(this))})}),this.Aa=new uI(n,i)}}async function Bo(s){if(Nn(s))for(const e of s.da)await e(!0)}async function Gi(s){for(const e of s.da)await e(!1)}function iu(s,e){const t=U(s);t.Ta.has(e.targetId)||(t.Ta.set(e.targetId,e),au(t)?ou(t):vs(t).x_()&&ru(t,e))}function oo(s,e){const t=U(s),n=vs(t);t.Ta.delete(e),n.x_()&&i_(t,e),t.Ta.size===0&&(n.x_()?n.B_():Nn(t)&&t.Aa.set("Unknown"))}function ru(s,e){if(s.Ra.$e(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(q.min())>0){const t=s.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}vs(s).H_(e)}function i_(s,e){s.Ra.$e(e),vs(s).Y_(e)}function ou(s){s.Ra=new rE({getRemoteKeysForTarget:e=>s.remoteSyncer.getRemoteKeysForTarget(e),Et:e=>s.Ta.get(e)||null,lt:()=>s.datastore.serializer.databaseId}),vs(s).start(),s.Aa.aa()}function au(s){return Nn(s)&&!vs(s).M_()&&s.Ta.size>0}function Nn(s){return U(s).Ia.size===0}function r_(s){s.Ra=void 0}async function hI(s){s.Aa.set("Online")}async function dI(s){s.Ta.forEach((e,t)=>{ru(s,e)})}async function fI(s,e){r_(s),au(s)?(s.Aa.la(e),ou(s)):s.Aa.set("Unknown")}async function pI(s,e,t){if(s.Aa.set("Online"),e instanceof gp&&e.state===2&&e.cause)try{await async function(i,r){const o=r.cause;for(const l of r.targetIds)i.Ta.has(l)&&(await i.remoteSyncer.rejectListen(l,o),i.Ta.delete(l),i.Ra.removeTarget(l))}(s,e)}catch(n){x(An,"Failed to remove targets %s: %s ",e.targetIds.join(","),n),await ao(s,n)}else if(e instanceof kr?s.Ra.Ye(e):e instanceof mp?s.Ra.it(e):s.Ra.et(e),!t.isEqual(q.min()))try{const n=await $p(s.localStore);t.compareTo(n)>=0&&await function(r,o){const l=r.Ra.Pt(o);return l.targetChanges.forEach((u,h)=>{if(u.resumeToken.approximateByteSize()>0){const f=r.Ta.get(h);f&&r.Ta.set(h,f.withResumeToken(u.resumeToken,o))}}),l.targetMismatches.forEach((u,h)=>{const f=r.Ta.get(u);if(!f)return;r.Ta.set(u,f.withResumeToken(ge.EMPTY_BYTE_STRING,f.snapshotVersion)),i_(r,u);const p=new It(f.target,u,h,f.sequenceNumber);ru(r,p)}),r.remoteSyncer.applyRemoteEvent(l)}(s,t)}catch(n){x(An,"Failed to raise snapshot:",n),await ao(s,n)}}async function ao(s,e,t){if(!Xt(e))throw e;s.Ia.add(1),await Gi(s),s.Aa.set("Offline"),t||(t=()=>$p(s.localStore)),s.asyncQueue.enqueueRetryable(async()=>{x(An,"Retrying IndexedDB access"),await t(),s.Ia.delete(1),await Bo(s)})}function o_(s,e){return e().catch(t=>ao(s,t,e))}async function Ts(s){const e=U(s),t=$t(e);let n=e.Pa.length>0?e.Pa[e.Pa.length-1].batchId:_n;for(;_I(e);)try{const i=await ZE(e.localStore,n);if(i===null){e.Pa.length===0&&t.B_();break}n=i.batchId,mI(e,i)}catch(i){await ao(e,i)}a_(e)&&l_(e)}function _I(s){return Nn(s)&&s.Pa.length<10}function mI(s,e){s.Pa.push(e);const t=$t(s);t.x_()&&t.Z_&&t.X_(e.mutations)}function a_(s){return Nn(s)&&!$t(s).M_()&&s.Pa.length>0}function l_(s){$t(s).start()}async function gI(s){$t(s).na()}async function yI(s){const e=$t(s);for(const t of s.Pa)e.X_(t.mutations)}async function EI(s,e,t){const n=s.Pa.shift(),i=Wl.from(n,e,t);await o_(s,()=>s.remoteSyncer.applySuccessfulWrite(i)),await Ts(s)}async function II(s,e){e&&$t(s).Z_&&await async function(n,i){if(function(o){return sE(o)&&o!==b.ABORTED}(i.code)){const r=n.Pa.shift();$t(n).N_(),await o_(n,()=>n.remoteSyncer.rejectFailedWrite(r.batchId,i)),await Ts(n)}}(s,e),a_(s)&&l_(s)}async function nd(s,e){const t=U(s);t.asyncQueue.verifyOperationInProgress(),x(An,"RemoteStore received new credentials");const n=Nn(t);t.Ia.add(3),await Gi(t),n&&t.Aa.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ia.delete(3),await Bo(t)}async function ll(s,e){const t=U(s);e?(t.Ia.delete(2),await Bo(t)):e||(t.Ia.add(2),await Gi(t),t.Aa.set("Unknown"))}function vs(s){return s.Va||(s.Va=function(t,n,i){const r=U(t);return r.ia(),new rI(n,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,i)}(s.datastore,s.asyncQueue,{Zo:hI.bind(null,s),e_:dI.bind(null,s),n_:fI.bind(null,s),J_:pI.bind(null,s)}),s.da.push(async e=>{e?(s.Va.N_(),au(s)?ou(s):s.Aa.set("Unknown")):(await s.Va.stop(),r_(s))})),s.Va}function $t(s){return s.ma||(s.ma=function(t,n,i){const r=U(t);return r.ia(),new oI(n,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,i)}(s.datastore,s.asyncQueue,{Zo:()=>Promise.resolve(),e_:gI.bind(null,s),n_:II.bind(null,s),ea:yI.bind(null,s),ta:EI.bind(null,s)}),s.da.push(async e=>{e?(s.ma.N_(),await Ts(s)):(await s.ma.stop(),s.Pa.length>0&&(x(An,`Stopping write stream with ${s.Pa.length} pending writes`),s.Pa=[]))})),s.ma}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lu{constructor(e,t,n,i,r){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=n,this.op=i,this.removalCallback=r,this.deferred=new Ut,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,n,i,r){const o=Date.now()+n,l=new lu(e,t,o,i,r);return l.start(n),l}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new M(b.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function u_(s,e){if(Te("AsyncQueue",`${e}: ${s}`),Xt(s))return new M(b.UNAVAILABLE,`${e}: ${s}`);throw s}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xn{static emptySet(e){return new Xn(e.comparator)}constructor(e){this.comparator=e?(t,n)=>e(t,n)||O.comparator(t.key,n.key):(t,n)=>O.comparator(t.key,n.key),this.keyedMap=ei(),this.sortedSet=new fe(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,n)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Xn)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),n=e.sortedSet.getIterator();for(;t.hasNext();){const i=t.getNext().key,r=n.getNext().key;if(!i.isEqual(r))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const n=new Xn;return n.comparator=this.comparator,n.keyedMap=e,n.sortedSet=t,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class sd{constructor(){this.fa=new fe(O.comparator)}track(e){const t=e.doc.key,n=this.fa.get(t);n?e.type!==0&&n.type===3?this.fa=this.fa.insert(t,e):e.type===3&&n.type!==1?this.fa=this.fa.insert(t,{type:n.type,doc:e.doc}):e.type===2&&n.type===2?this.fa=this.fa.insert(t,{type:2,doc:e.doc}):e.type===2&&n.type===0?this.fa=this.fa.insert(t,{type:0,doc:e.doc}):e.type===1&&n.type===0?this.fa=this.fa.remove(t):e.type===1&&n.type===2?this.fa=this.fa.insert(t,{type:1,doc:n.doc}):e.type===0&&n.type===1?this.fa=this.fa.insert(t,{type:2,doc:e.doc}):F(63341,{At:e,ga:n}):this.fa=this.fa.insert(t,e)}pa(){const e=[];return this.fa.inorderTraversal((t,n)=>{e.push(n)}),e}}class lo{constructor(e,t,n,i,r,o,l,u,h){this.query=e,this.docs=t,this.oldDocs=n,this.docChanges=i,this.mutatedKeys=r,this.fromCache=o,this.syncStateChanged=l,this.excludesMetadataChanges=u,this.hasCachedResults=h}static fromInitialDocuments(e,t,n,i,r){const o=[];return t.forEach(l=>{o.push({type:0,doc:l})}),new lo(e,t,Xn.emptySet(t),o,n,i,!0,!1,r)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&ql(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,n=e.docChanges;if(t.length!==n.length)return!1;for(let i=0;i<t.length;i++)if(t[i].type!==n[i].type||!t[i].doc.isEqual(n[i].doc))return!1;return!0}}class TI{constructor(){this.queries=id(),this.onlineState="Unknown",this.Da=new Set}terminate(){(function(t,n){const i=U(t),r=i.queries;i.queries=id(),r.forEach((o,l)=>{for(const u of l.wa)u.onError(n)})})(this,new M(b.ABORTED,"Firestore shutting down"))}}function id(){return new St(s=>tp(s),ql)}function vI(s,e){const t=U(s);let n=!1;for(const i of e){const r=i.query,o=t.queries.get(r);if(o){for(const l of o.wa)l.Ca(i)&&(n=!0);o.ya=i}}n&&c_(t)}function wI(s,e,t){const n=U(s),i=n.queries.get(e);if(i)for(const r of i.wa)r.onError(t);n.queries.delete(e)}function c_(s){s.Da.forEach(e=>{e.next()})}var rd,od;(od=rd||(rd={})).Fa="default",od.Cache="cache";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class h_{constructor(e){this.key=e}}class d_{constructor(e){this.key=e}}class AI{constructor(e,t){this.query=e,this.Ha=t,this.Ya=null,this.hasCachedResults=!1,this.current=!1,this.Za=W(),this.mutatedKeys=W(),this.Xa=sp(e),this.eu=new Xn(this.Xa)}get tu(){return this.Ha}nu(e,t){const n=t?t.ru:new sd,i=t?t.eu:this.eu;let r=t?t.mutatedKeys:this.mutatedKeys,o=i,l=!1;const u=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,h=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal((f,p)=>{const m=i.get(f),v=qi(this.query,p)?p:null,S=!!m&&this.mutatedKeys.has(m.key),N=!!v&&(v.hasLocalMutations||this.mutatedKeys.has(v.key)&&v.hasCommittedMutations);let V=!1;m&&v?m.data.isEqual(v.data)?S!==N&&(n.track({type:3,doc:v}),V=!0):this.iu(m,v)||(n.track({type:2,doc:v}),V=!0,(u&&this.Xa(v,u)>0||h&&this.Xa(v,h)<0)&&(l=!0)):!m&&v?(n.track({type:0,doc:v}),V=!0):m&&!v&&(n.track({type:1,doc:m}),V=!0,(u||h)&&(l=!0)),V&&(v?(o=o.add(v),r=N?r.add(f):r.delete(f)):(o=o.delete(f),r=r.delete(f)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const f=this.query.limitType==="F"?o.last():o.first();o=o.delete(f.key),r=r.delete(f.key),n.track({type:1,doc:f})}return{eu:o,ru:n,Ds:l,mutatedKeys:r}}iu(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,n,i){const r=this.eu;this.eu=e.eu,this.mutatedKeys=e.mutatedKeys;const o=e.ru.pa();o.sort((f,p)=>function(v,S){const N=V=>{switch(V){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return F(20277,{At:V})}};return N(v)-N(S)}(f.type,p.type)||this.Xa(f.doc,p.doc)),this.su(n),i=i!=null&&i;const l=t&&!i?this.ou():[],u=this.Za.size===0&&this.current&&!i?1:0,h=u!==this.Ya;return this.Ya=u,o.length!==0||h?{snapshot:new lo(this.query,e.eu,r,o,e.mutatedKeys,u===0,h,!1,!!n&&n.resumeToken.approximateByteSize()>0),_u:l}:{_u:l}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({eu:this.eu,ru:new sd,mutatedKeys:this.mutatedKeys,Ds:!1},!1)):{_u:[]}}au(e){return!this.Ha.has(e)&&!!this.eu.has(e)&&!this.eu.get(e).hasLocalMutations}su(e){e&&(e.addedDocuments.forEach(t=>this.Ha=this.Ha.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Ha=this.Ha.delete(t)),this.current=e.current)}ou(){if(!this.current)return[];const e=this.Za;this.Za=W(),this.eu.forEach(n=>{this.au(n.key)&&(this.Za=this.Za.add(n.key))});const t=[];return e.forEach(n=>{this.Za.has(n)||t.push(new d_(n))}),this.Za.forEach(n=>{e.has(n)||t.push(new h_(n))}),t}uu(e){this.Ha=e.qs,this.Za=W();const t=this.nu(e.documents);return this.applyChanges(t,!0)}cu(){return lo.fromInitialDocuments(this.query,this.eu,this.mutatedKeys,this.Ya===0,this.hasCachedResults)}}const ws="SyncEngine";class RI{constructor(e,t,n){this.query=e,this.targetId=t,this.view=n}}class CI{constructor(e){this.key=e,this.lu=!1}}class SI{constructor(e,t,n,i,r,o){this.localStore=e,this.remoteStore=t,this.eventManager=n,this.sharedClientState=i,this.currentUser=r,this.maxConcurrentLimboResolutions=o,this.hu={},this.Pu=new St(l=>tp(l),ql),this.Tu=new Map,this.Iu=new Set,this.du=new fe(O.comparator),this.Eu=new Map,this.Au=new Jl,this.Ru={},this.Vu=new Map,this.mu=wn.ur(),this.onlineState="Unknown",this.fu=void 0}get isPrimaryClient(){return this.fu===!0}}async function f_(s,e,t,n,i){s.gu=(p,m,v)=>async function(N,V,K,j){let B=V.view.nu(K);B.Ds&&(B=await rl(N.localStore,V.query,!1).then(({documents:I})=>V.view.nu(I,B)));const J=j&&j.targetChanges.get(V.targetId),le=j&&j.targetMismatches.get(V.targetId)!=null,Z=V.view.applyChanges(B,N.isPrimaryClient,J,le);return ul(N,V.targetId,Z._u),Z.snapshot}(s,p,m,v);const r=await rl(s.localStore,e,!0),o=new AI(e,r.qs),l=o.nu(r.documents),u=zi.createSynthesizedTargetChangeForCurrentChange(t,n,i),h=o.applyChanges(l,s.isPrimaryClient,u);ul(s,t,h._u);const f=new RI(e,t,o);return s.Pu.set(e,f),s.Tu.has(t)?s.Tu.get(t).push(e):s.Tu.set(t,[e]),h.snapshot}async function PI(s,e,t){const n=du(s);try{const i=await function(o,l){const u=U(o),h=se.now(),f=l.reduce((v,S)=>v.add(S.key),W());let p,m;return u.persistence.runTransaction("Locally write mutations","readwrite",v=>{let S=Je(),N=W();return u.Os.getEntries(v,f).next(V=>{S=V,S.forEach((K,j)=>{j.isValidDocument()||(N=N.add(K))})}).next(()=>u.localDocuments.getOverlayedDocuments(v,S)).next(V=>{p=V;const K=[];for(const j of l){const B=tE(j,p.get(j.key).overlayedDocument);B!=null&&K.push(new Pt(j.key,B,Wf(B.value.mapValue),We.exists(!0)))}return u.mutationQueue.addMutationBatch(v,h,K,l)}).next(V=>{m=V;const K=V.applyToLocalDocumentSet(p,N);return u.documentOverlayCache.saveOverlays(v,V.batchId,K)})}).then(()=>({batchId:m.batchId,changes:rp(p)}))}(n.localStore,e);n.sharedClientState.addPendingMutation(i.batchId),function(o,l,u){let h=o.Ru[o.currentUser.toKey()];h||(h=new fe(z)),h=h.insert(l,u),o.Ru[o.currentUser.toKey()]=h}(n,i.batchId,t),await Jt(n,i.changes),await Ts(n.remoteStore)}catch(i){const r=u_(i,"Failed to persist write");t.reject(r)}}async function p_(s,e){const t=U(s);try{const n=await XE(t.localStore,e);e.targetChanges.forEach((i,r)=>{const o=t.Eu.get(r);o&&(L(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1,22616),i.addedDocuments.size>0?o.lu=!0:i.modifiedDocuments.size>0?L(o.lu,14607):i.removedDocuments.size>0&&(L(o.lu,42227),o.lu=!1))}),await Jt(t,n,e)}catch(n){await bn(n)}}function ad(s,e,t){const n=U(s);if(n.isPrimaryClient&&t===0||!n.isPrimaryClient&&t===1){const i=[];n.Pu.forEach((r,o)=>{const l=o.view.va(e);l.snapshot&&i.push(l.snapshot)}),function(o,l){const u=U(o);u.onlineState=l;let h=!1;u.queries.forEach((f,p)=>{for(const m of p.wa)m.va(l)&&(h=!0)}),h&&c_(u)}(n.eventManager,e),i.length&&n.hu.J_(i),n.onlineState=e,n.isPrimaryClient&&n.sharedClientState.setOnlineState(e)}}async function bI(s,e,t){const n=U(s);n.sharedClientState.updateQueryState(e,"rejected",t);const i=n.Eu.get(e),r=i&&i.key;if(r){let o=new fe(O.comparator);o=o.insert(r,_e.newNoDocument(r,q.min()));const l=W().add(r),u=new ji(q.min(),new Map,new fe(z),o,l);await p_(n,u),n.du=n.du.remove(r),n.Eu.delete(e),hu(n)}else await Lo(n.localStore,e,!1).then(()=>qo(n,e,t)).catch(bn)}async function xI(s,e){const t=U(s),n=e.batch.batchId;try{const i=await YE(t.localStore,e);cu(t,n,null),uu(t,n),t.sharedClientState.updateMutationState(n,"acknowledged"),await Jt(t,i)}catch(i){await bn(i)}}async function NI(s,e,t){const n=U(s);try{const i=await function(o,l){const u=U(o);return u.persistence.runTransaction("Reject batch","readwrite-primary",h=>{let f;return u.mutationQueue.lookupMutationBatch(h,l).next(p=>(L(p!==null,37113),f=p.keys(),u.mutationQueue.removeMutationBatch(h,p))).next(()=>u.mutationQueue.performConsistencyCheck(h)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(h,f,l)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,f)).next(()=>u.localDocuments.getDocuments(h,f))})}(n.localStore,e);cu(n,e,t),uu(n,e),n.sharedClientState.updateMutationState(e,"rejected",t),await Jt(n,i)}catch(i){await bn(i)}}function uu(s,e){(s.Vu.get(e)||[]).forEach(t=>{t.resolve()}),s.Vu.delete(e)}function cu(s,e,t){const n=U(s);let i=n.Ru[n.currentUser.toKey()];if(i){const r=i.get(e);r&&(t?r.reject(t):r.resolve(),i=i.remove(e)),n.Ru[n.currentUser.toKey()]=i}}function qo(s,e,t=null){s.sharedClientState.removeLocalQueryTarget(e);for(const n of s.Tu.get(e))s.Pu.delete(n),t&&s.hu.pu(n,t);s.Tu.delete(e),s.isPrimaryClient&&s.Au.zr(e).forEach(n=>{s.Au.containsKey(n)||__(s,n)})}function __(s,e){s.Iu.delete(e.path.canonicalString());const t=s.du.get(e);t!==null&&(oo(s.remoteStore,t),s.du=s.du.remove(e),s.Eu.delete(t),hu(s))}function ul(s,e,t){for(const n of t)n instanceof h_?(s.Au.addReference(n.key,e),VI(s,n)):n instanceof d_?(x(ws,"Document no longer in limbo: "+n.key),s.Au.removeReference(n.key,e),s.Au.containsKey(n.key)||__(s,n.key)):F(19791,{yu:n})}function VI(s,e){const t=e.key,n=t.path.canonicalString();s.du.get(t)||s.Iu.has(n)||(x(ws,"New document in limbo: "+t),s.Iu.add(n),hu(s))}function hu(s){for(;s.Iu.size>0&&s.du.size<s.maxConcurrentLimboResolutions;){const e=s.Iu.values().next().value;s.Iu.delete(e);const t=new O(oe.fromString(e)),n=s.mu.next();s.Eu.set(n,new CI(t)),s.du=s.du.insert(t,n),iu(s.remoteStore,new It(tt(Bl(t.path)),n,"TargetPurposeLimboResolution",Ge.ue))}}async function Jt(s,e,t){const n=U(s),i=[],r=[],o=[];n.Pu.isEmpty()||(n.Pu.forEach((l,u)=>{o.push(n.gu(u,e,t).then(h=>{var f;if((h||t)&&n.isPrimaryClient){const p=h?!h.fromCache:(f=t==null?void 0:t.targetChanges.get(u.targetId))===null||f===void 0?void 0:f.current;n.sharedClientState.updateQueryState(u.targetId,p?"current":"not-current")}if(h){i.push(h);const p=tu.Es(u.targetId,h);r.push(p)}}))}),await Promise.all(o),n.hu.J_(i),await async function(u,h){const f=U(u);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",p=>A.forEach(h,m=>A.forEach(m.Is,v=>f.persistence.referenceDelegate.addReference(p,m.targetId,v)).next(()=>A.forEach(m.ds,v=>f.persistence.referenceDelegate.removeReference(p,m.targetId,v)))))}catch(p){if(!Xt(p))throw p;x(nu,"Failed to update sequence numbers: "+p)}for(const p of h){const m=p.targetId;if(!p.fromCache){const v=f.Fs.get(m),S=v.snapshotVersion,N=v.withLastLimboFreeSnapshotVersion(S);f.Fs=f.Fs.insert(m,N)}}}(n.localStore,r))}async function DI(s,e){const t=U(s);if(!t.currentUser.isEqual(e)){x(ws,"User change. New user:",e.toKey());const n=await Wp(t.localStore,e);t.currentUser=e,function(r,o){r.Vu.forEach(l=>{l.forEach(u=>{u.reject(new M(b.CANCELLED,o))})}),r.Vu.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,n.removedBatchIds,n.addedBatchIds),await Jt(t,n.Bs)}}function kI(s,e){const t=U(s),n=t.Eu.get(e);if(n&&n.lu)return W().add(n.key);{let i=W();const r=t.Tu.get(e);if(!r)return i;for(const o of r){const l=t.Pu.get(o);i=i.unionWith(l.view.tu)}return i}}async function OI(s,e){const t=U(s),n=await rl(t.localStore,e.query,!0),i=e.view.uu(n);return t.isPrimaryClient&&ul(t,e.targetId,i._u),i}async function MI(s,e){const t=U(s);return Hp(t.localStore,e).then(n=>Jt(t,n))}async function FI(s,e,t,n){const i=U(s),r=await function(l,u){const h=U(l),f=U(h.mutationQueue);return h.persistence.runTransaction("Lookup mutation documents","readonly",p=>f.Xn(p,u).next(m=>m?h.localDocuments.getDocuments(p,m):A.resolve(null)))}(i.localStore,e);r!==null?(t==="pending"?await Ts(i.remoteStore):t==="acknowledged"||t==="rejected"?(cu(i,e,n||null),uu(i,e),function(l,u){U(U(l).mutationQueue).rr(u)}(i.localStore,e)):F(6720,"Unknown batchState",{wu:t}),await Jt(i,r)):x(ws,"Cannot apply mutation batch with id: "+e)}async function LI(s,e){const t=U(s);if(g_(t),du(t),e===!0&&t.fu!==!0){const n=t.sharedClientState.getAllActiveQueryTargets(),i=await ld(t,n.toArray());t.fu=!0,await ll(t.remoteStore,!0);for(const r of i)iu(t.remoteStore,r)}else if(e===!1&&t.fu!==!1){const n=[];let i=Promise.resolve();t.Tu.forEach((r,o)=>{t.sharedClientState.isLocalQueryTarget(o)?n.push(o):i=i.then(()=>(qo(t,o),Lo(t.localStore,o,!0))),oo(t.remoteStore,o)}),await i,await ld(t,n),function(o){const l=U(o);l.Eu.forEach((u,h)=>{oo(l.remoteStore,h)}),l.Au.jr(),l.Eu=new Map,l.du=new fe(O.comparator)}(t),t.fu=!1,await ll(t.remoteStore,!1)}}async function ld(s,e,t){const n=U(s),i=[],r=[];for(const o of e){let l;const u=n.Tu.get(o);if(u&&u.length!==0){l=await il(n.localStore,tt(u[0]));for(const h of u){const f=n.Pu.get(h),p=await OI(n,f);p.snapshot&&r.push(p.snapshot)}}else{const h=await Qp(n.localStore,o);l=await il(n.localStore,h),await f_(n,m_(h),o,!1,l.resumeToken)}i.push(l)}return n.hu.J_(r),i}function m_(s){return ep(s.path,s.collectionGroup,s.orderBy,s.filters,s.limit,"F",s.startAt,s.endAt)}function UI(s){return function(t){return U(U(t).persistence).Ps()}(U(s).localStore)}async function BI(s,e,t,n){const i=U(s);if(i.fu)return void x(ws,"Ignoring unexpected query state notification.");const r=i.Tu.get(e);if(r&&r.length>0)switch(t){case"current":case"not-current":{const o=await Hp(i.localStore,np(r[0])),l=ji.createSynthesizedRemoteEventForCurrentChange(e,t==="current",ge.EMPTY_BYTE_STRING);await Jt(i,o,l);break}case"rejected":await Lo(i.localStore,e,!0),qo(i,e,n);break;default:F(64155,t)}}async function qI(s,e,t){const n=g_(s);if(n.fu){for(const i of e){if(n.Tu.has(i)&&n.sharedClientState.isActiveQueryTarget(i)){x(ws,"Adding an already active target "+i);continue}const r=await Qp(n.localStore,i),o=await il(n.localStore,r);await f_(n,m_(r),o.targetId,!1,o.resumeToken),iu(n.remoteStore,o)}for(const i of t)n.Tu.has(i)&&await Lo(n.localStore,i,!1).then(()=>{oo(n.remoteStore,i),qo(n,i)}).catch(bn)}}function g_(s){const e=U(s);return e.remoteStore.remoteSyncer.applyRemoteEvent=p_.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=kI.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=bI.bind(null,e),e.hu.J_=vI.bind(null,e.eventManager),e.hu.pu=wI.bind(null,e.eventManager),e}function du(s){const e=U(s);return e.remoteStore.remoteSyncer.applySuccessfulWrite=xI.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=NI.bind(null,e),e}class Pi{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Uo(e.databaseInfo.databaseId),this.sharedClientState=this.bu(e),this.persistence=this.Du(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Cu(e,this.localStore),this.indexBackfillerScheduler=this.Fu(e,this.localStore)}Cu(e,t){return null}Fu(e,t){return null}vu(e){return Kp(this.persistence,new Gp,e.initialUser,this.serializer)}Du(e){return new Zl(Fo.Vi,this.serializer)}bu(e){return new e_}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}Pi.provider={build:()=>new Pi};class jI extends Pi{constructor(e){super(),this.cacheSizeBytes=e}Cu(e,t){L(this.persistence.referenceDelegate instanceof so,46915);const n=this.persistence.referenceDelegate.garbageCollector;return new Lp(n,e.asyncQueue,t)}Du(e){const t=this.cacheSizeBytes!==void 0?Me.withCacheSize(this.cacheSizeBytes):Me.DEFAULT;return new Zl(n=>so.Vi(n,t),this.serializer)}}class y_ extends Pi{constructor(e,t,n){super(),this.Mu=e,this.cacheSizeBytes=t,this.forceOwnership=n,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.Mu.initialize(this,e),await du(this.Mu.syncEngine),await Ts(this.Mu.remoteStore),await this.persistence.ji(()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve()))}vu(e){return Kp(this.persistence,new Gp,e.initialUser,this.serializer)}Cu(e,t){const n=this.persistence.referenceDelegate.garbageCollector;return new Lp(n,e.asyncQueue,t)}Fu(e,t){const n=new ny(t,this.persistence);return new ty(e.asyncQueue,n)}Du(e){const t=zp(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),n=this.cacheSizeBytes!==void 0?Me.withCacheSize(this.cacheSizeBytes):Me.DEFAULT;return new eu(this.synchronizeTabs,t,e.clientId,n,e.asyncQueue,t_(),Mr(),this.serializer,this.sharedClientState,!!this.forceOwnership)}bu(e){return new e_}}class zI extends y_{constructor(e,t){super(e,t,!1),this.Mu=e,this.cacheSizeBytes=t,this.synchronizeTabs=!0}async initialize(e){await super.initialize(e);const t=this.Mu.syncEngine;this.sharedClientState instanceof Sa&&(this.sharedClientState.syncEngine={Do:FI.bind(null,t),vo:BI.bind(null,t),Co:qI.bind(null,t),Ps:UI.bind(null,t),bo:MI.bind(null,t)},await this.sharedClientState.start()),await this.persistence.ji(async n=>{await LI(this.Mu.syncEngine,n),this.gcScheduler&&(n&&!this.gcScheduler.started?this.gcScheduler.start():n||this.gcScheduler.stop()),this.indexBackfillerScheduler&&(n&&!this.indexBackfillerScheduler.started?this.indexBackfillerScheduler.start():n||this.indexBackfillerScheduler.stop())})}bu(e){const t=t_();if(!Sa.C(t))throw new M(b.UNIMPLEMENTED,"IndexedDB persistence is only available on platforms that support LocalStorage.");const n=zp(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey);return new Sa(t,e.asyncQueue,n,e.clientId,e.initialUser)}}class bi{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=n=>ad(this.syncEngine,n,1),this.remoteStore.remoteSyncer.handleCredentialChange=DI.bind(null,this.syncEngine),await ll(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new TI}()}createDatastore(e){const t=Uo(e.databaseInfo.databaseId),n=function(r){return new iI(r)}(e.databaseInfo);return function(r,o,l,u){return new lI(r,o,l,u)}(e.authCredentials,e.appCheckCredentials,n,t)}createRemoteStore(e){return function(n,i,r,o,l){return new cI(n,i,r,o,l)}(this.localStore,this.datastore,e.asyncQueue,t=>ad(this.syncEngine,t,0),function(){return ed.C()?new ed:new eI}())}createSyncEngine(e,t){return function(i,r,o,l,u,h,f){const p=new SI(i,r,o,l,u,h);return f&&(p.fu=!0),p}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(i){const r=U(i);x(An,"RemoteStore shutting down."),r.Ia.add(5),await Gi(r),r.Ea.shutdown(),r.Aa.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}bi.provider={build:()=>new bi};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qt="FirestoreClient";class GI{constructor(e,t,n,i,r){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=n,this.databaseInfo=i,this.user=Oe.UNAUTHENTICATED,this.clientId=Cl.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=r,this.authCredentials.start(n,async o=>{x(Qt,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o}),this.appCheckCredentials.start(n,o=>(x(Qt,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Ut;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const n=u_(t,"Failed to shutdown persistence");e.reject(n)}}),e.promise}}async function ba(s,e){s.asyncQueue.verifyOperationInProgress(),x(Qt,"Initializing OfflineComponentProvider");const t=s.configuration;await e.initialize(t);let n=t.initialUser;s.setCredentialChangeListener(async i=>{n.isEqual(i)||(await Wp(e.localStore,i),n=i)}),e.persistence.setDatabaseDeletedListener(()=>{zt("Terminating Firestore due to IndexedDb database deletion"),s.terminate().then(()=>{x("Terminating Firestore due to IndexedDb database deletion completed successfully")}).catch(i=>{zt("Terminating Firestore due to IndexedDb database deletion failed",i)})}),s._offlineComponents=e}async function ud(s,e){s.asyncQueue.verifyOperationInProgress();const t=await KI(s);x(Qt,"Initializing OnlineComponentProvider"),await e.initialize(t,s.configuration),s.setCredentialChangeListener(n=>nd(e.remoteStore,n)),s.setAppCheckTokenChangeListener((n,i)=>nd(e.remoteStore,i)),s._onlineComponents=e}async function KI(s){if(!s._offlineComponents)if(s._uninitializedComponentsProvider){x(Qt,"Using user provided OfflineComponentProvider");try{await ba(s,s._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(i){return i.name==="FirebaseError"?i.code===b.FAILED_PRECONDITION||i.code===b.UNIMPLEMENTED:!(typeof DOMException<"u"&&i instanceof DOMException)||i.code===22||i.code===20||i.code===11}(t))throw t;zt("Error using user provided cache. Falling back to memory cache: "+t),await ba(s,new Pi)}}else x(Qt,"Using default OfflineComponentProvider"),await ba(s,new jI(void 0));return s._offlineComponents}async function WI(s){return s._onlineComponents||(s._uninitializedComponentsProvider?(x(Qt,"Using user provided OnlineComponentProvider"),await ud(s,s._uninitializedComponentsProvider._online)):(x(Qt,"Using default OnlineComponentProvider"),await ud(s,new bi))),s._onlineComponents}function $I(s){return WI(s).then(e=>e.syncEngine)}/**
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
 */function E_(s){const e={};return s.timeoutSeconds!==void 0&&(e.timeoutSeconds=s.timeoutSeconds),e}/**
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
 */const cd=new Map;/**
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
 */const QI="firestore.googleapis.com",hd=!0;class dd{constructor(e){var t,n;if(e.host===void 0){if(e.ssl!==void 0)throw new M(b.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=QI,this.ssl=hd}else this.host=e.host,this.ssl=(t=e.ssl)!==null&&t!==void 0?t:hd;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=Dp;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Fp)throw new M(b.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}Jg("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=E_((n=e.experimentalLongPollingOptions)!==null&&n!==void 0?n:{}),function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new M(b.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new M(b.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new M(b.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(n,i){return n.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class I_{constructor(e,t,n,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=n,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new dd({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new M(b.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new M(b.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new dd(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=function(n){if(!n)return new zg;switch(n.type){case"firstParty":return new Wg(n.sessionIndex||"0",n.iamToken||null,n.authTokenFactory||null);case"provider":return n.client;default:throw new M(b.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const n=cd.get(t);n&&(x("ComponentProvider","Removing Datastore"),cd.delete(t),n.terminate())}(this),Promise.resolve()}}/**
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
 */class fu{constructor(e,t,n){this.converter=t,this._query=n,this.type="query",this.firestore=e}withConverter(e){return new fu(this.firestore,e,this._query)}}class be{constructor(e,t,n){this.converter=t,this._key=n,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new xi(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new be(this.firestore,e,this._key)}toJSON(){return{type:be._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,n){if(Li(t,be._jsonSchema))return new be(e,n||null,new O(oe.fromString(t.referencePath)))}}be._jsonSchemaVersion="firestore/documentReference/1.0",be._jsonSchema={type:Ie("string",be._jsonSchemaVersion),referencePath:Ie("string")};class xi extends fu{constructor(e,t,n){super(e,t,Bl(n)),this._path=n,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new be(this.firestore,null,new O(e))}withConverter(e){return new xi(this.firestore,e,this._path)}}function wA(s,e,...t){if(s=ut(s),arguments.length===1&&(e=Cl.newId()),Xg("doc","path",e),s instanceof I_){const n=oe.fromString(e,...t);return th(n),new be(s,null,new O(n))}{if(!(s instanceof be||s instanceof xi))throw new M(b.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const n=s._path.child(oe.fromString(e,...t));return th(n),new be(s.firestore,s instanceof xi?s.converter:null,new O(n))}}/**
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
 */const fd="AsyncQueue";class pd{constructor(e=Promise.resolve()){this.Zu=[],this.Xu=!1,this.ec=[],this.tc=null,this.nc=!1,this.rc=!1,this.sc=[],this.F_=new n_(this,"async_queue_retry"),this.oc=()=>{const n=Mr();n&&x(fd,"Visibility state changed to "+n.visibilityState),this.F_.y_()},this._c=e;const t=Mr();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.oc)}get isShuttingDown(){return this.Xu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.ac(),this.uc(e)}enterRestrictedMode(e){if(!this.Xu){this.Xu=!0,this.rc=e||!1;const t=Mr();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.oc)}}enqueue(e){if(this.ac(),this.Xu)return new Promise(()=>{});const t=new Ut;return this.uc(()=>this.Xu&&this.rc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Zu.push(e),this.cc()))}async cc(){if(this.Zu.length!==0){try{await this.Zu[0](),this.Zu.shift(),this.F_.reset()}catch(e){if(!Xt(e))throw e;x(fd,"Operation failed with retryable error: "+e)}this.Zu.length>0&&this.F_.g_(()=>this.cc())}}uc(e){const t=this._c.then(()=>(this.nc=!0,e().catch(n=>{throw this.tc=n,this.nc=!1,Te("INTERNAL UNHANDLED ERROR: ",_d(n)),n}).then(n=>(this.nc=!1,n))));return this._c=t,t}enqueueAfterDelay(e,t,n){this.ac(),this.sc.indexOf(e)>-1&&(t=0);const i=lu.createAndSchedule(this,e,t,n,r=>this.lc(r));return this.ec.push(i),i}ac(){this.tc&&F(47125,{hc:_d(this.tc)})}verifyOperationInProgress(){}async Pc(){let e;do e=this._c,await e;while(e!==this._c)}Tc(e){for(const t of this.ec)if(t.timerId===e)return!0;return!1}Ic(e){return this.Pc().then(()=>{this.ec.sort((t,n)=>t.targetTimeMs-n.targetTimeMs);for(const t of this.ec)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Pc()})}dc(e){this.sc.push(e)}lc(e){const t=this.ec.indexOf(e);this.ec.splice(t,1)}}function _d(s){let e=s.message||"";return s.stack&&(e=s.stack.includes(s.message)?s.stack:s.message+`
`+s.stack),e}class pu extends I_{constructor(e,t,n,i){super(e,t,n,i),this.type="firestore",this._queue=new pd,this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new pd(e),this._firestoreClient=void 0,await e}}}function AA(s,e,t){t||(t=Qr);const n=tf(s,"firestore");if(n.isInitialized(t)){const i=n.getImmediate({identifier:t}),r=n.getOptions(t);if(nf(r,e))return i;throw new M(b.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(e.cacheSizeBytes!==void 0&&e.localCache!==void 0)throw new M(b.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(e.cacheSizeBytes!==void 0&&e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Fp)throw new M(b.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return e.host&&Ao(e.host)&&sf(e.host),n.initialize({options:e,instanceIdentifier:t})}function HI(s){if(s._terminated)throw new M(b.FAILED_PRECONDITION,"The client has already been terminated.");return s._firestoreClient||YI(s),s._firestoreClient}function YI(s){var e,t,n;const i=s._freezeSettings(),r=function(l,u,h,f){return new xy(l,u,h,f.host,f.ssl,f.experimentalForceLongPolling,f.experimentalAutoDetectLongPolling,E_(f.experimentalLongPollingOptions),f.useFetchStreams,f.isUsingEmulator)}(s._databaseId,((e=s._app)===null||e===void 0?void 0:e.options.appId)||"",s._persistenceKey,i);s._componentsProvider||!((t=i.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((n=i.localCache)===null||n===void 0)&&n._onlineComponentProvider)&&(s._componentsProvider={_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider}),s._firestoreClient=new GI(s._authCredentials,s._appCheckCredentials,s._queue,r,s._componentsProvider&&function(l){const u=l==null?void 0:l._online.build();return{_offline:l==null?void 0:l._offline.build(u),_online:u}}(s._componentsProvider))}/**
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
 */class it{constructor(e){this._byteString=e}static fromBase64String(e){try{return new it(ge.fromBase64String(e))}catch(t){throw new M(b.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new it(ge.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:it._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(Li(e,it._jsonSchema))return it.fromBase64String(e.bytes)}}it._jsonSchemaVersion="firestore/bytes/1.0",it._jsonSchema={type:Ie("string",it._jsonSchemaVersion),bytes:Ie("string")};/**
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
 */class jo{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new M(b.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new de(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
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
 */class _u{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vt{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new M(b.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new M(b.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return z(this._lat,e._lat)||z(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:vt._jsonSchemaVersion}}static fromJSON(e){if(Li(e,vt._jsonSchema))return new vt(e.latitude,e.longitude)}}vt._jsonSchemaVersion="firestore/geoPoint/1.0",vt._jsonSchema={type:Ie("string",vt._jsonSchemaVersion),latitude:Ie("number"),longitude:Ie("number")};/**
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
 */class wt{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(n,i){if(n.length!==i.length)return!1;for(let r=0;r<n.length;++r)if(n[r]!==i[r])return!1;return!0}(this._values,e._values)}toJSON(){return{type:wt._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(Li(e,wt._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every(t=>typeof t=="number"))return new wt(e.vectorValues);throw new M(b.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}wt._jsonSchemaVersion="firestore/vectorValue/1.0",wt._jsonSchema={type:Ie("string",wt._jsonSchemaVersion),vectorValues:Ie("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const XI=/^__.*__$/;class JI{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return this.fieldMask!==null?new Pt(e,this.data,this.fieldMask,t,this.fieldTransforms):new Is(e,this.data,t,this.fieldTransforms)}}class T_{constructor(e,t,n){this.data=e,this.fieldMask=t,this.fieldTransforms=n}toMutation(e,t){return new Pt(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function v_(s){switch(s){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw F(40011,{Ec:s})}}class mu{constructor(e,t,n,i,r,o){this.settings=e,this.databaseId=t,this.serializer=n,this.ignoreUndefinedProperties=i,r===void 0&&this.Ac(),this.fieldTransforms=r||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Ec(){return this.settings.Ec}Rc(e){return new mu(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Vc(e){var t;const n=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.Rc({path:n,mc:!1});return i.fc(e),i}gc(e){var t;const n=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.Rc({path:n,mc:!1});return i.Ac(),i}yc(e){return this.Rc({path:void 0,mc:!0})}wc(e){return uo(e,this.settings.methodName,this.settings.Sc||!1,this.path,this.settings.bc)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}Ac(){if(this.path)for(let e=0;e<this.path.length;e++)this.fc(this.path.get(e))}fc(e){if(e.length===0)throw this.wc("Document fields must not be empty");if(v_(this.Ec)&&XI.test(e))throw this.wc('Document fields cannot begin and end with "__"')}}class ZI{constructor(e,t,n){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=n||Uo(e)}Dc(e,t,n,i=!1){return new mu({Ec:e,methodName:t,bc:n,path:de.emptyPath(),mc:!1,Sc:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function w_(s){const e=s._freezeSettings(),t=Uo(s._databaseId);return new ZI(s._databaseId,!!e.ignoreUndefinedProperties,t)}function eT(s,e,t,n,i,r={}){const o=s.Dc(r.merge||r.mergeFields?2:0,e,t,i);gu("Data must be an object, but it was:",o,n);const l=A_(n,o);let u,h;if(r.merge)u=new Ke(o.fieldMask),h=o.fieldTransforms;else if(r.mergeFields){const f=[];for(const p of r.mergeFields){const m=cl(e,p,t);if(!o.contains(m))throw new M(b.INVALID_ARGUMENT,`Field '${m}' is specified in your field mask but missing from your input data.`);C_(f,m)||f.push(m)}u=new Ke(f),h=o.fieldTransforms.filter(p=>u.covers(p.field))}else u=null,h=o.fieldTransforms;return new JI(new Ue(l),u,h)}class zo extends _u{_toFieldTransform(e){if(e.Ec!==2)throw e.Ec===1?e.wc(`${this._methodName}() can only appear at the top level of your update data`):e.wc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof zo}}function tT(s,e,t,n){const i=s.Dc(1,e,t);gu("Data must be an object, but it was:",i,n);const r=[],o=Ue.empty();xn(n,(u,h)=>{const f=yu(e,u,t);h=ut(h);const p=i.gc(f);if(h instanceof zo)r.push(f);else{const m=Go(h,p);m!=null&&(r.push(f),o.set(f,m))}});const l=new Ke(r);return new T_(o,l,i.fieldTransforms)}function nT(s,e,t,n,i,r){const o=s.Dc(1,e,t),l=[cl(e,n,t)],u=[i];if(r.length%2!=0)throw new M(b.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let m=0;m<r.length;m+=2)l.push(cl(e,r[m])),u.push(r[m+1]);const h=[],f=Ue.empty();for(let m=l.length-1;m>=0;--m)if(!C_(h,l[m])){const v=l[m];let S=u[m];S=ut(S);const N=o.gc(v);if(S instanceof zo)h.push(v);else{const V=Go(S,N);V!=null&&(h.push(v),f.set(v,V))}}const p=new Ke(h);return new T_(f,p,o.fieldTransforms)}function Go(s,e){if(R_(s=ut(s)))return gu("Unsupported field value:",e,s),A_(s,e);if(s instanceof _u)return function(n,i){if(!v_(i.Ec))throw i.wc(`${n._methodName}() can only be used with update() and set()`);if(!i.path)throw i.wc(`${n._methodName}() is not currently supported inside arrays`);const r=n._toFieldTransform(i);r&&i.fieldTransforms.push(r)}(s,e),null;if(s===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),s instanceof Array){if(e.settings.mc&&e.Ec!==4)throw e.wc("Nested arrays are not supported");return function(n,i){const r=[];let o=0;for(const l of n){let u=Go(l,i.yc(o));u==null&&(u={nullValue:"NULL_VALUE"}),r.push(u),o++}return{arrayValue:{values:r}}}(s,e)}return function(n,i){if((n=ut(n))===null)return{nullValue:"NULL_VALUE"};if(typeof n=="number")return Qy(i.serializer,n);if(typeof n=="boolean")return{booleanValue:n};if(typeof n=="string")return{stringValue:n};if(n instanceof Date){const r=se.fromDate(n);return{timestampValue:_s(i.serializer,r)}}if(n instanceof se){const r=new se(n.seconds,1e3*Math.floor(n.nanoseconds/1e3));return{timestampValue:_s(i.serializer,r)}}if(n instanceof vt)return{geoPointValue:{latitude:n.latitude,longitude:n.longitude}};if(n instanceof it)return{bytesValue:yp(i.serializer,n._byteString)};if(n instanceof be){const r=i.databaseId,o=n.firestore._databaseId;if(!o.isEqual(r))throw i.wc(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${r.projectId}/${r.database}`);return{referenceValue:Hl(n.firestore._databaseId||i.databaseId,n._key.path)}}if(n instanceof wt)return function(o,l){return{mapValue:{fields:{[Ml]:{stringValue:Fl},[wi]:{arrayValue:{values:o.toArray().map(h=>{if(typeof h!="number")throw l.wc("VectorValues must only contain numeric values.");return zl(l.serializer,h)})}}}}}}(n,i);throw i.wc(`Unsupported field value: ${Sl(n)}`)}(s,e)}function A_(s,e){const t={};return Ff(s)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):xn(s,(n,i)=>{const r=Go(i,e.Vc(n));r!=null&&(t[n]=r)}),{mapValue:{fields:t}}}function R_(s){return!(typeof s!="object"||s===null||s instanceof Array||s instanceof Date||s instanceof se||s instanceof vt||s instanceof it||s instanceof be||s instanceof _u||s instanceof wt)}function gu(s,e,t){if(!R_(t)||!If(t)){const n=Sl(t);throw n==="an object"?e.wc(s+" a custom object"):e.wc(s+" "+n)}}function cl(s,e,t){if((e=ut(e))instanceof jo)return e._internalPath;if(typeof e=="string")return yu(s,e);throw uo("Field path arguments must be of type string or ",s,!1,void 0,t)}const sT=new RegExp("[~\\*/\\[\\]]");function yu(s,e,t){if(e.search(sT)>=0)throw uo(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,s,!1,void 0,t);try{return new jo(...e.split("."))._internalPath}catch{throw uo(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,s,!1,void 0,t)}}function uo(s,e,t,n,i){const r=n&&!n.isEmpty(),o=i!==void 0;let l=`Function ${e}() called with invalid data`;t&&(l+=" (via `toFirestore()`)"),l+=". ";let u="";return(r||o)&&(u+=" (found",r&&(u+=` in field ${n}`),o&&(u+=` in document ${i}`),u+=")"),new M(b.INVALID_ARGUMENT,l+s+u)}function C_(s,e){return s.some(t=>t.isEqual(e))}/**
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
 */class S_{constructor(e,t,n,i,r){this._firestore=e,this._userDataWriter=t,this._key=n,this._document=i,this._converter=r}get id(){return this._key.path.lastSegment()}get ref(){return new be(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new iT(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(P_("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class iT extends S_{data(){return super.data()}}function P_(s,e){return typeof e=="string"?yu(s,e):e instanceof jo?e._internalPath:e._delegate._internalPath}/**
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
 */function rT(s,e,t){let n;return n=s?t&&(t.merge||t.mergeFields)?s.toFirestore(e,t):s.toFirestore(e):e,n}class wr{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Jn extends S_{constructor(e,t,n,i,r,o){super(e,t,n,i,o),this._firestore=e,this._firestoreImpl=e,this.metadata=r}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Fr(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const n=this._document.data.field(P_("DocumentSnapshot.get",e));if(n!==null)return this._userDataWriter.convertValue(n,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new M(b.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=Jn._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}Jn._jsonSchemaVersion="firestore/documentSnapshot/1.0",Jn._jsonSchema={type:Ie("string",Jn._jsonSchemaVersion),bundleSource:Ie("string","DocumentSnapshot"),bundleName:Ie("string"),bundle:Ie("string")};class Fr extends Jn{data(e={}){return super.data(e)}}class di{constructor(e,t,n,i){this._firestore=e,this._userDataWriter=t,this._snapshot=i,this.metadata=new wr(i.hasPendingWrites,i.fromCache),this.query=n}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(n=>{e.call(t,new Fr(this._firestore,this._userDataWriter,n.key,n,new wr(this._snapshot.mutatedKeys.has(n.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new M(b.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(i,r){if(i._snapshot.oldDocs.isEmpty()){let o=0;return i._snapshot.docChanges.map(l=>{const u=new Fr(i._firestore,i._userDataWriter,l.doc.key,l.doc,new wr(i._snapshot.mutatedKeys.has(l.doc.key),i._snapshot.fromCache),i.query.converter);return l.doc,{type:"added",doc:u,oldIndex:-1,newIndex:o++}})}{let o=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(l=>r||l.type!==3).map(l=>{const u=new Fr(i._firestore,i._userDataWriter,l.doc.key,l.doc,new wr(i._snapshot.mutatedKeys.has(l.doc.key),i._snapshot.fromCache),i.query.converter);let h=-1,f=-1;return l.type!==0&&(h=o.indexOf(l.doc.key),o=o.delete(l.doc.key)),l.type!==1&&(o=o.add(l.doc),f=o.indexOf(l.doc.key)),{type:oT(l.type),doc:u,oldIndex:h,newIndex:f}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new M(b.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=di._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=Cl.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],n=[],i=[];return this.docs.forEach(r=>{r._document!==null&&(t.push(r._document),n.push(this._userDataWriter.convertObjectMap(r._document.data.value.mapValue.fields,"previous")),i.push(r.ref.path))}),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function oT(s){switch(s){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return F(61501,{type:s})}}di._jsonSchemaVersion="firestore/querySnapshot/1.0",di._jsonSchema={type:Ie("string",di._jsonSchemaVersion),bundleSource:Ie("string","QuerySnapshot"),bundleName:Ie("string"),bundle:Ie("string")};function RA(s,e,t){s=jr(s,be);const n=jr(s.firestore,pu),i=rT(s.converter,e,t);return b_(n,[eT(w_(n),"setDoc",s._key,i,s.converter!==null,t).toMutation(s._key,We.none())])}function CA(s,e,t,...n){s=jr(s,be);const i=jr(s.firestore,pu),r=w_(i);let o;return o=typeof(e=ut(e))=="string"||e instanceof jo?nT(r,"updateDoc",s._key,e,t,n):tT(r,"updateDoc",s._key,e),b_(i,[o.toMutation(s._key,We.exists(!0))])}function b_(s,e){return function(n,i){const r=new Ut;return n.asyncQueue.enqueueAndForget(async()=>PI(await $I(n),i,r)),r.promise}(HI(s),e)}class aT{constructor(e){let t;this.kind="persistent",e!=null&&e.tabManager?(e.tabManager._initialize(e),t=e.tabManager):(t=cT(),t._initialize(e)),this._onlineComponentProvider=t._onlineComponentProvider,this._offlineComponentProvider=t._offlineComponentProvider}toJSON(){return{kind:this.kind}}}function SA(s){return new aT(s)}class lT{constructor(e){this.forceOwnership=e,this.kind="persistentSingleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=bi.provider,this._offlineComponentProvider={build:t=>new y_(t,e==null?void 0:e.cacheSizeBytes,this.forceOwnership)}}}class uT{constructor(){this.kind="PersistentMultipleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=bi.provider,this._offlineComponentProvider={build:t=>new zI(t,e==null?void 0:e.cacheSizeBytes)}}}function cT(s){return new lT(void 0)}function PA(){return new uT}(function(e,t=!0){(function(i){Es=i})(af),Jd(new Zd("firestore",(n,{instanceIdentifier:i,options:r})=>{const o=n.getProvider("app").getImmediate(),l=new pu(new Gg(n.getProvider("auth-internal")),new $g(o,n.getProvider("app-check-internal")),function(h,f){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new M(b.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new us(h.options.projectId,f)}(o,i),o);return r=Object.assign({useFetchStreams:t},r),l._setSettings(r),l},"PUBLIC").setMultipleInstances(!0)),Ur(Yc,Xc,e),Ur(Yc,Xc,"esm2017")})();var md={};const gd="@firebase/database",yd="1.0.20";/**
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
 */let x_="";function hT(s){x_=s}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dT{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){t==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),Se(t))}get(e){const t=this.domStorage_.getItem(this.prefixedName_(e));return t==null?null:Al(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fT{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){t==null?delete this.cache_[e]:this.cache_[e]=t}get(e){return Ct(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const N_=function(s){try{if(typeof window<"u"&&typeof window[s]<"u"){const e=window[s];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new dT(e)}}catch{}return new fT},pn=N_("localStorage"),pT=N_("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zn=new Xd("@firebase/database"),_T=function(){let s=1;return function(){return s++}}(),V_=function(s){const e=Pg(s),t=new bg;t.update(e);const n=t.digest();return xg.encodeByteArray(n)},Ki=function(...s){let e="";for(let t=0;t<s.length;t++){const n=s[t];Array.isArray(n)||n&&typeof n=="object"&&typeof n.length=="number"?e+=Ki.apply(null,n):typeof n=="object"?e+=Se(n):e+=n,e+=" "}return e};let fi=null,Ed=!0;const mT=function(s,e){D(!0,"Can't turn on custom loggers persistently."),Zn.logLevel=dt.VERBOSE,fi=Zn.log.bind(Zn)},Fe=function(...s){if(Ed===!0&&(Ed=!1,fi===null&&pT.get("logging_enabled")===!0&&mT()),fi){const e=Ki.apply(null,s);fi(e)}},Wi=function(s){return function(...e){Fe(s,...e)}},hl=function(...s){const e="FIREBASE INTERNAL ERROR: "+Ki(...s);Zn.error(e)},Rt=function(...s){const e=`FIREBASE FATAL ERROR: ${Ki(...s)}`;throw Zn.error(e),new Error(e)},Ze=function(...s){const e="FIREBASE WARNING: "+Ki(...s);Zn.warn(e)},gT=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&Ze("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},D_=function(s){return typeof s=="number"&&(s!==s||s===Number.POSITIVE_INFINITY||s===Number.NEGATIVE_INFINITY)},yT=function(s){if(document.readyState==="complete")s();else{let e=!1;const t=function(){if(!document.body){setTimeout(t,Math.floor(10));return}e||(e=!0,s())};document.addEventListener?(document.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("load",t,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&t()}),window.attachEvent("onload",t))}},ms="[MIN_NAME]",Rn="[MAX_NAME]",As=function(s,e){if(s===e)return 0;if(s===ms||e===Rn)return-1;if(e===ms||s===Rn)return 1;{const t=Id(s),n=Id(e);return t!==null?n!==null?t-n===0?s.length-e.length:t-n:-1:n!==null?1:s<e?-1:1}},ET=function(s,e){return s===e?0:s<e?-1:1},Hs=function(s,e){if(e&&s in e)return e[s];throw new Error("Missing required key ("+s+") in object: "+Se(e))},Eu=function(s){if(typeof s!="object"||s===null)return Se(s);const e=[];for(const n in s)e.push(n);e.sort();let t="{";for(let n=0;n<e.length;n++)n!==0&&(t+=","),t+=Se(e[n]),t+=":",t+=Eu(s[e[n]]);return t+="}",t},k_=function(s,e){const t=s.length;if(t<=e)return[s];const n=[];for(let i=0;i<t;i+=e)i+e>t?n.push(s.substring(i,t)):n.push(s.substring(i,i+e));return n};function He(s,e){for(const t in s)s.hasOwnProperty(t)&&e(t,s[t])}const O_=function(s){D(!D_(s),"Invalid JSON number");const e=11,t=52,n=(1<<e-1)-1;let i,r,o,l,u;s===0?(r=0,o=0,i=1/s===-1/0?1:0):(i=s<0,s=Math.abs(s),s>=Math.pow(2,1-n)?(l=Math.min(Math.floor(Math.log(s)/Math.LN2),n),r=l+n,o=Math.round(s*Math.pow(2,t-l)-Math.pow(2,t))):(r=0,o=Math.round(s/Math.pow(2,1-n-t))));const h=[];for(u=t;u;u-=1)h.push(o%2?1:0),o=Math.floor(o/2);for(u=e;u;u-=1)h.push(r%2?1:0),r=Math.floor(r/2);h.push(i?1:0),h.reverse();const f=h.join("");let p="";for(u=0;u<64;u+=8){let m=parseInt(f.substr(u,8),2).toString(16);m.length===1&&(m="0"+m),p=p+m}return p.toLowerCase()},IT=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},TT=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function vT(s,e){let t="Unknown Error";s==="too_big"?t="The data requested exceeds the maximum size that can be accessed with a single request.":s==="permission_denied"?t="Client doesn't have permission to access the desired data.":s==="unavailable"&&(t="The service is unavailable");const n=new Error(s+" at "+e._path.toString()+": "+t);return n.code=s.toUpperCase(),n}const wT=new RegExp("^-?(0*)\\d{1,10}$"),AT=-2147483648,RT=2147483647,Id=function(s){if(wT.test(s)){const e=Number(s);if(e>=AT&&e<=RT)return e}return null},$i=function(s){try{s()}catch(e){setTimeout(()=>{const t=e.stack||"";throw Ze("Exception was thrown by user callback.",t),e},Math.floor(0))}},CT=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},pi=function(s,e){const t=setTimeout(s,e);return typeof t=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(t):typeof t=="object"&&t.unref&&t.unref(),t};/**
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
 */class ST{constructor(e,t){this.appCheckProvider=t,this.appName=e.name,ef(e)&&e.settings.appCheckToken&&(this.serverAppAppCheckToken=e.settings.appCheckToken),this.appCheck=t==null?void 0:t.getImmediate({optional:!0}),this.appCheck||t==null||t.get().then(n=>this.appCheck=n)}getToken(e){if(this.serverAppAppCheckToken){if(e)throw new Error("Attempted reuse of `FirebaseServerApp.appCheckToken` after previous usage failed.");return Promise.resolve({token:this.serverAppAppCheckToken})}return this.appCheck?this.appCheck.getToken(e):new Promise((t,n)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(t,n):t(null)},0)})}addTokenChangeListener(e){var t;(t=this.appCheckProvider)===null||t===void 0||t.get().then(n=>n.addTokenListener(e))}notifyForInvalidToken(){Ze(`Provided AppCheck credentials for the app named "${this.appName}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class PT{constructor(e,t,n){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=n,this.auth_=null,this.auth_=n.getImmediate({optional:!0}),this.auth_||n.onInit(i=>this.auth_=i)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(t=>t&&t.code==="auth/token-not-initialized"?(Fe("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(t)):new Promise((t,n)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(t,n):t(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(t=>t.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(t=>t.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',Ze(e)}}class Lr{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}Lr.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Iu="5",M_="v",F_="s",L_="r",U_="f",B_=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,q_="ls",j_="p",dl="ac",z_="websocket",G_="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class K_{constructor(e,t,n,i,r=!1,o="",l=!1,u=!1,h=null){this.secure=t,this.namespace=n,this.webSocketOnly=i,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=l,this.isUsingEmulator=u,this.emulatorOptions=h,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=pn.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&pn.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}}function bT(s){return s.host!==s.internalHost||s.isCustomHost()||s.includeNamespaceInQueryParams}function W_(s,e,t){D(typeof e=="string","typeof type must == string"),D(typeof t=="object","typeof params must == object");let n;if(e===z_)n=(s.secure?"wss://":"ws://")+s.internalHost+"/.ws?";else if(e===G_)n=(s.secure?"https://":"http://")+s.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);bT(s)&&(t.ns=s.namespace);const i=[];return He(t,(r,o)=>{i.push(r+"="+o)}),n+i.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xT{constructor(){this.counters_={}}incrementCounter(e,t=1){Ct(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return Og(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const xa={},Na={};function Tu(s){const e=s.toString();return xa[e]||(xa[e]=new xT),xa[e]}function NT(s,e){const t=s.toString();return Na[t]||(Na[t]=e()),Na[t]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class VT{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){const n=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let i=0;i<n.length;++i)n[i]&&$i(()=>{this.onMessage_(n[i])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Td="start",DT="close",kT="pLPCommand",OT="pRTLPCB",$_="id",Q_="pw",H_="ser",MT="cb",FT="seg",LT="ts",UT="d",BT="dframe",Y_=1870,X_=30,qT=Y_-X_,jT=25e3,zT=3e4;class Hn{constructor(e,t,n,i,r,o,l){this.connId=e,this.repoInfo=t,this.applicationId=n,this.appCheckToken=i,this.authToken=r,this.transportSessionId=o,this.lastSessionId=l,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=Wi(e),this.stats_=Tu(t),this.urlFn=u=>(this.appCheckToken&&(u[dl]=this.appCheckToken),W_(t,G_,u))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new VT(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(zT)),yT(()=>{if(this.isClosed_)return;this.scriptTagHolder=new vu((...r)=>{const[o,l,u,h,f]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===Td)this.id=l,this.password=u;else if(o===DT)l?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(l,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,l]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,l)},()=>{this.onClosed_()},this.urlFn);const n={};n[Td]="t",n[H_]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(n[MT]=this.scriptTagHolder.uniqueCallbackIdentifier),n[M_]=Iu,this.transportSessionId&&(n[F_]=this.transportSessionId),this.lastSessionId&&(n[q_]=this.lastSessionId),this.applicationId&&(n[j_]=this.applicationId),this.appCheckToken&&(n[dl]=this.appCheckToken),typeof location<"u"&&location.hostname&&B_.test(location.hostname)&&(n[L_]=U_);const i=this.urlFn(n);this.log_("Connecting via long-poll to "+i),this.scriptTagHolder.addTag(i,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){Hn.forceAllow_=!0}static forceDisallow(){Hn.forceDisallow_=!0}static isAvailable(){return Hn.forceAllow_?!0:!Hn.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!IT()&&!TT()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const t=Se(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const n=Mg(t),i=k_(n,qT);for(let r=0;r<i.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,i.length,i[r]),this.curSegmentNum++}addDisconnectPingFrame(e,t){this.myDisconnFrame=document.createElement("iframe");const n={};n[BT]="t",n[$_]=e,n[Q_]=t,this.myDisconnFrame.src=this.urlFn(n),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const t=Se(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}}class vu{constructor(e,t,n,i){this.onDisconnect=n,this.urlFn=i,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=_T(),window[kT+this.uniqueCallbackIdentifier]=e,window[OT+this.uniqueCallbackIdentifier]=t,this.myIFrame=vu.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(l){Fe("frame writing exception"),l.stack&&Fe(l.stack),Fe(l)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||Fe("No IE domain setting required")}catch{const n=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+n+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[$_]=this.myID,e[Q_]=this.myPW,e[H_]=this.currentSerial;let t=this.urlFn(e),n="",i=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+X_+n.length<=Y_;){const o=this.pendingSegs.shift();n=n+"&"+FT+i+"="+o.seg+"&"+LT+i+"="+o.ts+"&"+UT+i+"="+o.d,i++}return t=t+n,this.addLongPollTag_(t,this.currentSerial),!0}else return!1}enqueueSegment(e,t,n){this.pendingSegs.push({seg:e,ts:t,d:n}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);const n=()=>{this.outstandingRequests.delete(t),this.newRequest_()},i=setTimeout(n,Math.floor(jT)),r=()=>{clearTimeout(i),n()};this.addTag(e,r)}addTag(e,t){setTimeout(()=>{try{if(!this.sendNewPolls)return;const n=this.myIFrame.doc.createElement("script");n.type="text/javascript",n.async=!0,n.src=e,n.onload=n.onreadystatechange=function(){const i=n.readyState;(!i||i==="loaded"||i==="complete")&&(n.onload=n.onreadystatechange=null,n.parentNode&&n.parentNode.removeChild(n),t())},n.onerror=()=>{Fe("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(n)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const GT=16384,KT=45e3;let co=null;typeof MozWebSocket<"u"?co=MozWebSocket:typeof WebSocket<"u"&&(co=WebSocket);class rt{constructor(e,t,n,i,r,o,l){this.connId=e,this.applicationId=n,this.appCheckToken=i,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=Wi(this.connId),this.stats_=Tu(t),this.connURL=rt.connectionURL_(t,o,l,i,n),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,n,i,r){const o={};return o[M_]=Iu,typeof location<"u"&&location.hostname&&B_.test(location.hostname)&&(o[L_]=U_),t&&(o[F_]=t),n&&(o[q_]=n),i&&(o[dl]=i),r&&(o[j_]=r),W_(e,z_,o)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,pn.set("previous_websocket_failure",!0);try{let n;Fg(),this.mySock=new co(this.connURL,[],n)}catch(n){this.log_("Error instantiating WebSocket.");const i=n.message||n.data;i&&this.log_(i),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=n=>{this.handleIncomingFrame(n)},this.mySock.onerror=n=>{this.log_("WebSocket error.  Closing connection.");const i=n.message||n.data;i&&this.log_(i),this.onClosed_()}}start(){}static forceDisallow(){rt.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const t=/Android ([0-9]{0,}\.[0-9]{0,})/,n=navigator.userAgent.match(t);n&&n.length>1&&parseFloat(n[1])<4.4&&(e=!0)}return!e&&co!==null&&!rt.forceDisallow_}static previouslyFailed(){return pn.isInMemoryStorage||pn.get("previous_websocket_failure")===!0}markConnectionHealthy(){pn.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const t=this.frames.join("");this.frames=null;const n=Al(t);this.onMessage(n)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(D(this.frames===null,"We already have a frame buffer"),e.length<=6){const t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(t);else{const n=this.extractFrameCount_(t);n!==null&&this.appendFrame_(n)}}send(e){this.resetKeepAlive();const t=Se(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const n=k_(t,GT);n.length>1&&this.sendString_(String(n.length));for(let i=0;i<n.length;i++)this.sendString_(n[i])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(KT))}sendString_(e){try{this.mySock.send(e)}catch(t){this.log_("Exception thrown from WebSocket.send():",t.message||t.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}rt.responsesRequiredToBeHealthy=2;rt.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ni{static get ALL_TRANSPORTS(){return[Hn,rt]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}constructor(e){this.initTransports_(e)}initTransports_(e){const t=rt&&rt.isAvailable();let n=t&&!rt.previouslyFailed();if(e.webSocketOnly&&(t||Ze("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),n=!0),n)this.transports_=[rt];else{const i=this.transports_=[];for(const r of Ni.ALL_TRANSPORTS)r&&r.isAvailable()&&i.push(r);Ni.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}Ni.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const WT=6e4,$T=5e3,QT=10*1024,HT=100*1024,Va="t",vd="d",YT="s",wd="r",XT="e",Ad="o",Rd="a",Cd="n",Sd="p",JT="h";class ZT{constructor(e,t,n,i,r,o,l,u,h,f){this.id=e,this.repoInfo_=t,this.applicationId_=n,this.appCheckToken_=i,this.authToken_=r,this.onMessage_=o,this.onReady_=l,this.onDisconnect_=u,this.onKill_=h,this.lastSessionId=f,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=Wi("c:"+this.id+":"),this.transportManager_=new Ni(t),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.conn_),n=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(t,n)},Math.floor(0));const i=e.healthyTimeout||0;i>0&&(this.healthyTimeout_=pi(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>HT?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>QT?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(i)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){const t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(Va in e){const t=e[Va];t===Rd?this.upgradeIfSecondaryHealthy_():t===wd?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):t===Ad&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const t=Hs("t",e),n=Hs("d",e);if(t==="c")this.onSecondaryControl_(n);else if(t==="d")this.pendingDataMessages.push(n);else throw new Error("Unknown protocol layer: "+t)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:Sd,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:Rd,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:Cd,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const t=Hs("t",e),n=Hs("d",e);t==="c"?this.onControl_(n):t==="d"&&this.onDataMessage_(n)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const t=Hs(Va,e);if(vd in e){const n=e[vd];if(t===JT){const i=Object.assign({},n);this.repoInfo_.isUsingEmulator&&(i.h=this.repoInfo_.host),this.onHandshake_(i)}else if(t===Cd){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let i=0;i<this.pendingDataMessages.length;++i)this.onDataMessage_(this.pendingDataMessages[i]);this.pendingDataMessages=[],this.tryCleanupConnection()}else t===YT?this.onConnectionShutdown_(n):t===wd?this.onReset_(n):t===XT?hl("Server Error: "+n):t===Ad?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):hl("Unknown control packet command: "+t)}}onHandshake_(e){const t=e.ts,n=e.v,i=e.h;this.sessionId=e.s,this.repoInfo_.host=i,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),Iu!==n&&Ze("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.secondaryConn_),n=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,n),pi(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(WT))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):pi(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor($T))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:Sd,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(pn.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class J_{put(e,t,n,i){}merge(e,t,n,i){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,n){}onDisconnectMerge(e,t,n){}onDisconnectCancel(e,t){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Z_{constructor(e){this.allowedEvents_=e,this.listeners_={},D(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){const n=[...this.listeners_[e]];for(let i=0;i<n.length;i++)n[i].callback.apply(n[i].context,t)}}on(e,t,n){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:n});const i=this.getInitialEvent(e);i&&t.apply(n,i)}off(e,t,n){this.validateEventType_(e);const i=this.listeners_[e]||[];for(let r=0;r<i.length;r++)if(i[r].callback===t&&(!n||n===i[r].context)){i.splice(r,1);return}}validateEventType_(e){D(this.allowedEvents_.find(t=>t===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ho extends Z_{static getInstance(){return new ho}constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!cf()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}getInitialEvent(e){return D(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pd=32,bd=768;class ae{constructor(e,t){if(t===void 0){this.pieces_=e.split("/");let n=0;for(let i=0;i<this.pieces_.length;i++)this.pieces_[i].length>0&&(this.pieces_[n]=this.pieces_[i],n++);this.pieces_.length=n,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)this.pieces_[t]!==""&&(e+="/"+this.pieces_[t]);return e||"/"}}function te(){return new ae("")}function Q(s){return s.pieceNum_>=s.pieces_.length?null:s.pieces_[s.pieceNum_]}function Ht(s){return s.pieces_.length-s.pieceNum_}function ue(s){let e=s.pieceNum_;return e<s.pieces_.length&&e++,new ae(s.pieces_,e)}function em(s){return s.pieceNum_<s.pieces_.length?s.pieces_[s.pieces_.length-1]:null}function ev(s){let e="";for(let t=s.pieceNum_;t<s.pieces_.length;t++)s.pieces_[t]!==""&&(e+="/"+encodeURIComponent(String(s.pieces_[t])));return e||"/"}function tm(s,e=0){return s.pieces_.slice(s.pieceNum_+e)}function nm(s){if(s.pieceNum_>=s.pieces_.length)return null;const e=[];for(let t=s.pieceNum_;t<s.pieces_.length-1;t++)e.push(s.pieces_[t]);return new ae(e,0)}function ve(s,e){const t=[];for(let n=s.pieceNum_;n<s.pieces_.length;n++)t.push(s.pieces_[n]);if(e instanceof ae)for(let n=e.pieceNum_;n<e.pieces_.length;n++)t.push(e.pieces_[n]);else{const n=e.split("/");for(let i=0;i<n.length;i++)n[i].length>0&&t.push(n[i])}return new ae(t,0)}function H(s){return s.pieceNum_>=s.pieces_.length}function $e(s,e){const t=Q(s),n=Q(e);if(t===null)return e;if(t===n)return $e(ue(s),ue(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+s+")")}function wu(s,e){if(Ht(s)!==Ht(e))return!1;for(let t=s.pieceNum_,n=e.pieceNum_;t<=s.pieces_.length;t++,n++)if(s.pieces_[t]!==e.pieces_[n])return!1;return!0}function ot(s,e){let t=s.pieceNum_,n=e.pieceNum_;if(Ht(s)>Ht(e))return!1;for(;t<s.pieces_.length;){if(s.pieces_[t]!==e.pieces_[n])return!1;++t,++n}return!0}class tv{constructor(e,t){this.errorPrefix_=t,this.parts_=tm(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let n=0;n<this.parts_.length;n++)this.byteLength_+=Ro(this.parts_[n]);sm(this)}}function nv(s,e){s.parts_.length>0&&(s.byteLength_+=1),s.parts_.push(e),s.byteLength_+=Ro(e),sm(s)}function sv(s){const e=s.parts_.pop();s.byteLength_-=Ro(e),s.parts_.length>0&&(s.byteLength_-=1)}function sm(s){if(s.byteLength_>bd)throw new Error(s.errorPrefix_+"has a key path longer than "+bd+" bytes ("+s.byteLength_+").");if(s.parts_.length>Pd)throw new Error(s.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+Pd+") or object contains a cycle "+ln(s))}function ln(s){return s.parts_.length===0?"":"in property '"+s.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Au extends Z_{static getInstance(){return new Au}constructor(){super(["visible"]);let e,t;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(t="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(t="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(t="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,()=>{const n=!document[e];n!==this.visible_&&(this.visible_=n,this.trigger("visible",n))},!1)}getInitialEvent(e){return D(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ys=1e3,iv=60*5*1e3,xd=30*1e3,rv=1.3,ov=3e4,av="server_kill",Nd=3;class At extends J_{constructor(e,t,n,i,r,o,l,u){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=n,this.onConnectStatus_=i,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=l,this.authOverride_=u,this.id=At.nextPersistentConnectionId_++,this.log_=Wi("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=Ys,this.maxReconnectDelay_=iv,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,u)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");Au.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&ho.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,n){const i=++this.requestNumber_,r={r:i,a:e,b:t};this.log_(Se(r)),D(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),n&&(this.requestCBHash_[i]=n)}get(e){this.initConnection_();const t=new uf,i={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const l=o.d;o.s==="ok"?t.resolve(l):t.reject(l)}};this.outstandingGets_.push(i),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),t.promise}listen(e,t,n,i){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),D(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),D(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const l={onComplete:i,hashFn:t,query:e,tag:n};this.listens.get(o).set(r,l),this.connected_&&this.sendListen_(l)}sendGet_(e){const t=this.outstandingGets_[e];this.sendRequest("g",t.request,n=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(n)})}sendListen_(e){const t=e.query,n=t._path.toString(),i=t._queryIdentifier;this.log_("Listen on "+n+" for "+i);const r={p:n},o="q";e.tag&&(r.q=t._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,l=>{const u=l.d,h=l.s;At.warnOnListenWarnings_(u,t),(this.listens.get(n)&&this.listens.get(n).get(i))===e&&(this.log_("listen response",l),h!=="ok"&&this.removeListen_(n,i),e.onComplete&&e.onComplete(h,u))})}static warnOnListenWarnings_(e,t){if(e&&typeof e=="object"&&Ct(e,"w")){const n=ns(e,"w");if(Array.isArray(n)&&~n.indexOf("no_index")){const i='".indexOn": "'+t._queryParams.getIndex().toString()+'"',r=t._path.toString();Ze(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${i} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||Vg(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=xd)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,t=Dg(e)?"auth":"gauth",n={cred:e};this.authOverride_===null?n.noauth=!0:typeof this.authOverride_=="object"&&(n.authvar=this.authOverride_),this.sendRequest(t,n,i=>{const r=i.s,o=i.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const t=e.s,n=e.d||"error";t==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,n)})}unlisten(e,t){const n=e._path.toString(),i=e._queryIdentifier;this.log_("Unlisten called for "+n+" "+i),D(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(n,i)&&this.connected_&&this.sendUnlisten_(n,i,e._queryObject,t)}sendUnlisten_(e,t,n,i){this.log_("Unlisten on "+e+" for "+t);const r={p:e},o="n";i&&(r.q=n,r.t=i),this.sendRequest(o,r)}onDisconnectPut(e,t,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:n})}onDisconnectMerge(e,t,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:n})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,n,i){const r={p:t,d:n};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{i&&setTimeout(()=>{i(o.s,o.d)},Math.floor(0))})}put(e,t,n,i){this.putInternal("p",e,t,n,i)}merge(e,t,n,i){this.putInternal("m",e,t,n,i)}putInternal(e,t,n,i,r){this.initConnection_();const o={p:t,d:n};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:i}),this.outstandingPutCount_++;const l=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(l):this.log_("Buffering put: "+t)}sendPut_(e){const t=this.outstandingPuts_[e].action,n=this.outstandingPuts_[e].request,i=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,n,r=>{this.log_(t+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),i&&i(r.s,r.d)})}reportStats(e){if(this.connected_){const t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,n=>{if(n.s!=="ok"){const r=n.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+Se(e));const t=e.r,n=this.requestCBHash_[t];n&&(delete this.requestCBHash_[t],n(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),e==="d"?this.onDataUpdate_(t.p,t.d,!1,t.t):e==="m"?this.onDataUpdate_(t.p,t.d,!0,t.t):e==="c"?this.onListenRevoked_(t.p,t.q):e==="ac"?this.onAuthRevoked_(t.s,t.d):e==="apc"?this.onAppCheckRevoked_(t.s,t.d):e==="sd"?this.onSecurityDebugPacket_(t):hl("Unrecognized action received from server: "+Se(e)+`
Are you using the latest client?`)}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){D(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=Ys,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=Ys,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>ov&&(this.reconnectDelay_=Ys),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=Math.max(0,new Date().getTime()-this.lastConnectionAttemptTime_);let t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*rv)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),n=this.onRealtimeDisconnect_.bind(this),i=this.id+":"+At.nextConnectionId_++,r=this.lastSessionId;let o=!1,l=null;const u=function(){l?l.close():(o=!0,n())},h=function(p){D(l,"sendRequest call when we're not connected not allowed."),l.sendRequest(p)};this.realtime_={close:u,sendRequest:h};const f=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[p,m]=await Promise.all([this.authTokenProvider_.getToken(f),this.appCheckTokenProvider_.getToken(f)]);o?Fe("getToken() completed but was canceled"):(Fe("getToken() completed. Creating connection."),this.authToken_=p&&p.accessToken,this.appCheckToken_=m&&m.token,l=new ZT(i,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,n,v=>{Ze(v+" ("+this.repoInfo_.toString()+")"),this.interrupt(av)},r))}catch(p){this.log_("Failed to get token: "+p),o||(this.repoInfo_.nodeAdmin&&Ze(p),u())}}}interrupt(e){Fe("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){Fe("Resuming connection for reason: "+e),delete this.interruptReasons_[e],Qc(this.interruptReasons_)&&(this.reconnectDelay_=Ys,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const t=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let n;t?n=t.map(r=>Eu(r)).join("$"):n="default";const i=this.removeListen_(e,n);i&&i.onComplete&&i.onComplete("permission_denied")}removeListen_(e,t){const n=new ae(e).toString();let i;if(this.listens.has(n)){const r=this.listens.get(n);i=r.get(t),r.delete(t),r.size===0&&this.listens.delete(n)}else i=void 0;return i}onAuthRevoked_(e,t){Fe("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=Nd&&(this.reconnectDelay_=xd,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){Fe("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=Nd&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let t="js";e["sdk."+t+"."+x_.replace(/\./g,"-")]=1,cf()?e["framework.cordova"]=1:kg()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=ho.getInstance().currentlyOnline();return Qc(this.interruptReasons_)&&e}}At.nextPersistentConnectionId_=0;At.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 */class Ko{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){const n=new $(ms,e),i=new $(ms,t);return this.compare(n,i)!==0}minPost(){return $.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ar;class im extends Ko{static get __EMPTY_NODE(){return Ar}static set __EMPTY_NODE(e){Ar=e}compare(e,t){return As(e.name,t.name)}isDefinedOn(e){throw Fi("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return $.MIN}maxPost(){return new $(Rn,Ar)}makePost(e,t){return D(typeof e=="string","KeyIndex indexValue must always be a string."),new $(e,Ar)}toString(){return".key"}}const es=new im;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rr{constructor(e,t,n,i,r=null){this.isReverse_=i,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=t?n(e.key,t):1,i&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),t;if(this.resultGenerator_?t=this.resultGenerator_(e.key,e.value):t={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return t}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class Ce{constructor(e,t,n,i,r){this.key=e,this.value=t,this.color=n??Ce.RED,this.left=i??Qe.EMPTY_NODE,this.right=r??Qe.EMPTY_NODE}copy(e,t,n,i,r){return new Ce(e??this.key,t??this.value,n??this.color,i??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,n){let i=this;const r=n(e,i.key);return r<0?i=i.copy(null,null,null,i.left.insert(e,t,n),null):r===0?i=i.copy(null,t,null,null,null):i=i.copy(null,null,null,null,i.right.insert(e,t,n)),i.fixUp_()}removeMin_(){if(this.left.isEmpty())return Qe.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let n,i;if(n=this,t(e,n.key)<0)!n.left.isEmpty()&&!n.left.isRed_()&&!n.left.left.isRed_()&&(n=n.moveRedLeft_()),n=n.copy(null,null,null,n.left.remove(e,t),null);else{if(n.left.isRed_()&&(n=n.rotateRight_()),!n.right.isEmpty()&&!n.right.isRed_()&&!n.right.left.isRed_()&&(n=n.moveRedRight_()),t(e,n.key)===0){if(n.right.isEmpty())return Qe.EMPTY_NODE;i=n.right.min_(),n=n.copy(i.key,i.value,null,null,n.right.removeMin_())}n=n.copy(null,null,null,null,n.right.remove(e,t))}return n.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,Ce.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,Ce.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}Ce.RED=!0;Ce.BLACK=!1;class lv{copy(e,t,n,i,r){return this}insert(e,t,n){return new Ce(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class Qe{constructor(e,t=Qe.EMPTY_NODE){this.comparator_=e,this.root_=t}insert(e,t){return new Qe(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,Ce.BLACK,null,null))}remove(e){return new Qe(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,Ce.BLACK,null,null))}get(e){let t,n=this.root_;for(;!n.isEmpty();){if(t=this.comparator_(e,n.key),t===0)return n.value;t<0?n=n.left:t>0&&(n=n.right)}return null}getPredecessorKey(e){let t,n=this.root_,i=null;for(;!n.isEmpty();)if(t=this.comparator_(e,n.key),t===0){if(n.left.isEmpty())return i?i.key:null;for(n=n.left;!n.right.isEmpty();)n=n.right;return n.key}else t<0?n=n.left:t>0&&(i=n,n=n.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new Rr(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new Rr(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new Rr(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new Rr(this.root_,null,this.comparator_,!0,e)}}Qe.EMPTY_NODE=new lv;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function uv(s,e){return As(s.name,e.name)}function Ru(s,e){return As(s,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let fl;function cv(s){fl=s}const rm=function(s){return typeof s=="number"?"number:"+O_(s):"string:"+s},om=function(s){if(s.isLeafNode()){const e=s.val();D(typeof e=="string"||typeof e=="number"||typeof e=="object"&&Ct(e,".sv"),"Priority must be a string or number.")}else D(s===fl||s.isEmpty(),"priority of unexpected type.");D(s===fl||s.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Vd;class Ae{static set __childrenNodeConstructor(e){Vd=e}static get __childrenNodeConstructor(){return Vd}constructor(e,t=Ae.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=t,this.lazyHash_=null,D(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),om(this.priorityNode_)}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new Ae(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:Ae.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return H(e)?this:Q(e)===".priority"?this.priorityNode_:Ae.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return e===".priority"?this.updatePriority(t):t.isEmpty()&&e!==".priority"?this:Ae.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){const n=Q(e);return n===null?t:t.isEmpty()&&n!==".priority"?this:(D(n!==".priority"||Ht(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(n,Ae.__childrenNodeConstructor.EMPTY_NODE.updateChild(ue(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+rm(this.priorityNode_.val())+":");const t=typeof this.value_;e+=t+":",t==="number"?e+=O_(this.value_):e+=this.value_,this.lazyHash_=V_(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===Ae.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof Ae.__childrenNodeConstructor?-1:(D(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const t=typeof e.value_,n=typeof this.value_,i=Ae.VALUE_TYPE_ORDER.indexOf(t),r=Ae.VALUE_TYPE_ORDER.indexOf(n);return D(i>=0,"Unknown leaf type: "+t),D(r>=0,"Unknown leaf type: "+n),i===r?n==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-i}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}else return!1}}Ae.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let am,lm;function hv(s){am=s}function dv(s){lm=s}class fv extends Ko{compare(e,t){const n=e.node.getPriority(),i=t.node.getPriority(),r=n.compareTo(i);return r===0?As(e.name,t.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return $.MIN}maxPost(){return new $(Rn,new Ae("[PRIORITY-POST]",lm))}makePost(e,t){const n=am(e);return new $(t,new Ae("[PRIORITY-POST]",n))}toString(){return".priority"}}const me=new fv;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pv=Math.log(2);class _v{constructor(e){const t=r=>parseInt(Math.log(r)/pv,10),n=r=>parseInt(Array(r+1).join("1"),2);this.count=t(e+1),this.current_=this.count-1;const i=n(this.count);this.bits_=e+1&i}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const fo=function(s,e,t,n){s.sort(e);const i=function(u,h){const f=h-u;let p,m;if(f===0)return null;if(f===1)return p=s[u],m=t?t(p):p,new Ce(m,p.node,Ce.BLACK,null,null);{const v=parseInt(f/2,10)+u,S=i(u,v),N=i(v+1,h);return p=s[v],m=t?t(p):p,new Ce(m,p.node,Ce.BLACK,S,N)}},r=function(u){let h=null,f=null,p=s.length;const m=function(S,N){const V=p-S,K=p;p-=S;const j=i(V+1,K),B=s[V],J=t?t(B):B;v(new Ce(J,B.node,N,null,j))},v=function(S){h?(h.left=S,h=S):(f=S,h=S)};for(let S=0;S<u.count;++S){const N=u.nextBitIsOne(),V=Math.pow(2,u.count-(S+1));N?m(V,Ce.BLACK):(m(V,Ce.BLACK),m(V,Ce.RED))}return f},o=new _v(s.length),l=r(o);return new Qe(n||e,l)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Da;const Gn={};class Tt{static get Default(){return D(Gn&&me,"ChildrenNode.ts has not been loaded"),Da=Da||new Tt({".priority":Gn},{".priority":me}),Da}constructor(e,t){this.indexes_=e,this.indexSet_=t}get(e){const t=ns(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof Qe?t:null}hasIndex(e){return Ct(this.indexSet_,e.toString())}addIndex(e,t){D(e!==es,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const n=[];let i=!1;const r=t.getIterator($.Wrap);let o=r.getNext();for(;o;)i=i||e.isDefinedOn(o.node),n.push(o),o=r.getNext();let l;i?l=fo(n,e.getCompare()):l=Gn;const u=e.toString(),h=Object.assign({},this.indexSet_);h[u]=e;const f=Object.assign({},this.indexes_);return f[u]=l,new Tt(f,h)}addToIndexes(e,t){const n=qr(this.indexes_,(i,r)=>{const o=ns(this.indexSet_,r);if(D(o,"Missing index implementation for "+r),i===Gn)if(o.isDefinedOn(e.node)){const l=[],u=t.getIterator($.Wrap);let h=u.getNext();for(;h;)h.name!==e.name&&l.push(h),h=u.getNext();return l.push(e),fo(l,o.getCompare())}else return Gn;else{const l=t.get(e.name);let u=i;return l&&(u=u.remove(new $(e.name,l))),u.insert(e,e.node)}});return new Tt(n,this.indexSet_)}removeFromIndexes(e,t){const n=qr(this.indexes_,i=>{if(i===Gn)return i;{const r=t.get(e.name);return r?i.remove(new $(e.name,r)):i}});return new Tt(n,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Xs;class G{static get EMPTY_NODE(){return Xs||(Xs=new G(new Qe(Ru),null,Tt.Default))}constructor(e,t,n){this.children_=e,this.priorityNode_=t,this.indexMap_=n,this.lazyHash_=null,this.priorityNode_&&om(this.priorityNode_),this.children_.isEmpty()&&D(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}isLeafNode(){return!1}getPriority(){return this.priorityNode_||Xs}updatePriority(e){return this.children_.isEmpty()?this:new G(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const t=this.children_.get(e);return t===null?Xs:t}}getChild(e){const t=Q(e);return t===null?this:this.getImmediateChild(t).getChild(ue(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,t){if(D(t,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(t);{const n=new $(e,t);let i,r;t.isEmpty()?(i=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(n,this.children_)):(i=this.children_.insert(e,t),r=this.indexMap_.addToIndexes(n,this.children_));const o=i.isEmpty()?Xs:this.priorityNode_;return new G(i,o,r)}}updateChild(e,t){const n=Q(e);if(n===null)return t;{D(Q(e)!==".priority"||Ht(e)===1,".priority must be the last token in a path");const i=this.getImmediateChild(n).updateChild(ue(e),t);return this.updateImmediateChild(n,i)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const t={};let n=0,i=0,r=!0;if(this.forEachChild(me,(o,l)=>{t[o]=l.val(e),n++,r&&G.INTEGER_REGEXP_.test(o)?i=Math.max(i,Number(o)):r=!1}),!e&&r&&i<2*n){const o=[];for(const l in t)o[l]=t[l];return o}else return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+rm(this.getPriority().val())+":"),this.forEachChild(me,(t,n)=>{const i=n.hash();i!==""&&(e+=":"+t+":"+i)}),this.lazyHash_=e===""?"":V_(e)}return this.lazyHash_}getPredecessorChildName(e,t,n){const i=this.resolveIndex_(n);if(i){const r=i.getPredecessorKey(new $(e,t));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const t=this.resolveIndex_(e);if(t){const n=t.minKey();return n&&n.name}else return this.children_.minKey()}getFirstChild(e){const t=this.getFirstChildName(e);return t?new $(t,this.children_.get(t)):null}getLastChildName(e){const t=this.resolveIndex_(e);if(t){const n=t.maxKey();return n&&n.name}else return this.children_.maxKey()}getLastChild(e){const t=this.getLastChildName(e);return t?new $(t,this.children_.get(t)):null}forEachChild(e,t){const n=this.resolveIndex_(e);return n?n.inorderTraversal(i=>t(i.name,i.node)):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){const n=this.resolveIndex_(t);if(n)return n.getIteratorFrom(e,i=>i);{const i=this.children_.getIteratorFrom(e.name,$.Wrap);let r=i.peek();for(;r!=null&&t.compare(r,e)<0;)i.getNext(),r=i.peek();return i}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){const n=this.resolveIndex_(t);if(n)return n.getReverseIteratorFrom(e,i=>i);{const i=this.children_.getReverseIteratorFrom(e.name,$.Wrap);let r=i.peek();for(;r!=null&&t.compare(r,e)>0;)i.getNext(),r=i.peek();return i}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===Qi?-1:0}withIndex(e){if(e===es||this.indexMap_.hasIndex(e))return this;{const t=this.indexMap_.addIndex(e,this.children_);return new G(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===es||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const t=e;if(this.getPriority().equals(t.getPriority()))if(this.children_.count()===t.children_.count()){const n=this.getIterator(me),i=t.getIterator(me);let r=n.getNext(),o=i.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=n.getNext(),o=i.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===es?null:this.indexMap_.get(e.toString())}}G.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class mv extends G{constructor(){super(new Qe(Ru),G.EMPTY_NODE,Tt.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return G.EMPTY_NODE}isEmpty(){return!1}}const Qi=new mv;Object.defineProperties($,{MIN:{value:new $(ms,G.EMPTY_NODE)},MAX:{value:new $(Rn,Qi)}});im.__EMPTY_NODE=G.EMPTY_NODE;Ae.__childrenNodeConstructor=G;cv(Qi);dv(Qi);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gv=!0;function Le(s,e=null){if(s===null)return G.EMPTY_NODE;if(typeof s=="object"&&".priority"in s&&(e=s[".priority"]),D(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof s=="object"&&".value"in s&&s[".value"]!==null&&(s=s[".value"]),typeof s!="object"||".sv"in s){const t=s;return new Ae(t,Le(e))}if(!(s instanceof Array)&&gv){const t=[];let n=!1;if(He(s,(o,l)=>{if(o.substring(0,1)!=="."){const u=Le(l);u.isEmpty()||(n=n||!u.getPriority().isEmpty(),t.push(new $(o,u)))}}),t.length===0)return G.EMPTY_NODE;const r=fo(t,uv,o=>o.name,Ru);if(n){const o=fo(t,me.getCompare());return new G(r,Le(e),new Tt({".priority":o},{".priority":me}))}else return new G(r,Le(e),Tt.Default)}else{let t=G.EMPTY_NODE;return He(s,(n,i)=>{if(Ct(s,n)&&n.substring(0,1)!=="."){const r=Le(i);(r.isLeafNode()||!r.isEmpty())&&(t=t.updateImmediateChild(n,r))}}),t.updatePriority(Le(e))}}hv(Le);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yv extends Ko{constructor(e){super(),this.indexPath_=e,D(!H(e)&&Q(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){const n=this.extractChild(e.node),i=this.extractChild(t.node),r=n.compareTo(i);return r===0?As(e.name,t.name):r}makePost(e,t){const n=Le(e),i=G.EMPTY_NODE.updateChild(this.indexPath_,n);return new $(t,i)}maxPost(){const e=G.EMPTY_NODE.updateChild(this.indexPath_,Qi);return new $(Rn,e)}toString(){return tm(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ev extends Ko{compare(e,t){const n=e.node.compareTo(t.node);return n===0?As(e.name,t.name):n}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return $.MIN}maxPost(){return $.MAX}makePost(e,t){const n=Le(e);return new $(t,n)}toString(){return".value"}}const Iv=new Ev;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function um(s){return{type:"value",snapshotNode:s}}function gs(s,e){return{type:"child_added",snapshotNode:e,childName:s}}function Vi(s,e){return{type:"child_removed",snapshotNode:e,childName:s}}function Di(s,e,t){return{type:"child_changed",snapshotNode:e,childName:s,oldSnap:t}}function Tv(s,e){return{type:"child_moved",snapshotNode:e,childName:s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cu{constructor(e){this.index_=e}updateChild(e,t,n,i,r,o){D(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const l=e.getImmediateChild(t);return l.getChild(i).equals(n.getChild(i))&&l.isEmpty()===n.isEmpty()||(o!=null&&(n.isEmpty()?e.hasChild(t)?o.trackChildChange(Vi(t,l)):D(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):l.isEmpty()?o.trackChildChange(gs(t,n)):o.trackChildChange(Di(t,n,l))),e.isLeafNode()&&n.isEmpty())?e:e.updateImmediateChild(t,n).withIndex(this.index_)}updateFullNode(e,t,n){return n!=null&&(e.isLeafNode()||e.forEachChild(me,(i,r)=>{t.hasChild(i)||n.trackChildChange(Vi(i,r))}),t.isLeafNode()||t.forEachChild(me,(i,r)=>{if(e.hasChild(i)){const o=e.getImmediateChild(i);o.equals(r)||n.trackChildChange(Di(i,r,o))}else n.trackChildChange(gs(i,r))})),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?G.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ki{constructor(e){this.indexedFilter_=new Cu(e.getIndex()),this.index_=e.getIndex(),this.startPost_=ki.getStartPost_(e),this.endPost_=ki.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const t=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,n=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return t&&n}updateChild(e,t,n,i,r,o){return this.matches(new $(t,n))||(n=G.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,n,i,r,o)}updateFullNode(e,t,n){t.isLeafNode()&&(t=G.EMPTY_NODE);let i=t.withIndex(this.index_);i=i.updatePriority(G.EMPTY_NODE);const r=this;return t.forEachChild(me,(o,l)=>{r.matches(new $(o,l))||(i=i.updateImmediateChild(o,G.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,i,n)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vv{constructor(e){this.withinDirectionalStart=t=>this.reverse_?this.withinEndPost(t):this.withinStartPost(t),this.withinDirectionalEnd=t=>this.reverse_?this.withinStartPost(t):this.withinEndPost(t),this.withinStartPost=t=>{const n=this.index_.compare(this.rangedFilter_.getStartPost(),t);return this.startIsInclusive_?n<=0:n<0},this.withinEndPost=t=>{const n=this.index_.compare(t,this.rangedFilter_.getEndPost());return this.endIsInclusive_?n<=0:n<0},this.rangedFilter_=new ki(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,n,i,r,o){return this.rangedFilter_.matches(new $(t,n))||(n=G.EMPTY_NODE),e.getImmediateChild(t).equals(n)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,n,i,r,o):this.fullLimitUpdateChild_(e,t,n,r,o)}updateFullNode(e,t,n){let i;if(t.isLeafNode()||t.isEmpty())i=G.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<t.numChildren()&&t.isIndexed(this.index_)){i=G.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const l=r.getNext();if(this.withinDirectionalStart(l))if(this.withinDirectionalEnd(l))i=i.updateImmediateChild(l.name,l.node),o++;else break;else continue}}else{i=t.withIndex(this.index_),i=i.updatePriority(G.EMPTY_NODE);let r;this.reverse_?r=i.getReverseIterator(this.index_):r=i.getIterator(this.index_);let o=0;for(;r.hasNext();){const l=r.getNext();o<this.limit_&&this.withinDirectionalStart(l)&&this.withinDirectionalEnd(l)?o++:i=i.updateImmediateChild(l.name,G.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,i,n)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,n,i,r){let o;if(this.reverse_){const p=this.index_.getCompare();o=(m,v)=>p(v,m)}else o=this.index_.getCompare();const l=e;D(l.numChildren()===this.limit_,"");const u=new $(t,n),h=this.reverse_?l.getFirstChild(this.index_):l.getLastChild(this.index_),f=this.rangedFilter_.matches(u);if(l.hasChild(t)){const p=l.getImmediateChild(t);let m=i.getChildAfterChild(this.index_,h,this.reverse_);for(;m!=null&&(m.name===t||l.hasChild(m.name));)m=i.getChildAfterChild(this.index_,m,this.reverse_);const v=m==null?1:o(m,u);if(f&&!n.isEmpty()&&v>=0)return r!=null&&r.trackChildChange(Di(t,n,p)),l.updateImmediateChild(t,n);{r!=null&&r.trackChildChange(Vi(t,p));const N=l.updateImmediateChild(t,G.EMPTY_NODE);return m!=null&&this.rangedFilter_.matches(m)?(r!=null&&r.trackChildChange(gs(m.name,m.node)),N.updateImmediateChild(m.name,m.node)):N}}else return n.isEmpty()?e:f&&o(h,u)>=0?(r!=null&&(r.trackChildChange(Vi(h.name,h.node)),r.trackChildChange(gs(t,n))),l.updateImmediateChild(t,n).updateImmediateChild(h.name,G.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Su{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=me}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return D(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return D(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:ms}hasEnd(){return this.endSet_}getIndexEndValue(){return D(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return D(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:Rn}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return D(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===me}copy(){const e=new Su;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function wv(s){return s.loadsAllData()?new Cu(s.getIndex()):s.hasLimit()?new vv(s):new ki(s)}function Dd(s){const e={};if(s.isDefault())return e;let t;if(s.index_===me?t="$priority":s.index_===Iv?t="$value":s.index_===es?t="$key":(D(s.index_ instanceof yv,"Unrecognized index type!"),t=s.index_.toString()),e.orderBy=Se(t),s.startSet_){const n=s.startAfterSet_?"startAfter":"startAt";e[n]=Se(s.indexStartValue_),s.startNameSet_&&(e[n]+=","+Se(s.indexStartName_))}if(s.endSet_){const n=s.endBeforeSet_?"endBefore":"endAt";e[n]=Se(s.indexEndValue_),s.endNameSet_&&(e[n]+=","+Se(s.indexEndName_))}return s.limitSet_&&(s.isViewFromLeft()?e.limitToFirst=s.limit_:e.limitToLast=s.limit_),e}function kd(s){const e={};if(s.startSet_&&(e.sp=s.indexStartValue_,s.startNameSet_&&(e.sn=s.indexStartName_),e.sin=!s.startAfterSet_),s.endSet_&&(e.ep=s.indexEndValue_,s.endNameSet_&&(e.en=s.indexEndName_),e.ein=!s.endBeforeSet_),s.limitSet_){e.l=s.limit_;let t=s.viewFrom_;t===""&&(s.isViewFromLeft()?t="l":t="r"),e.vf=t}return s.index_!==me&&(e.i=s.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class po extends J_{reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return t!==void 0?"tag$"+t:(D(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}constructor(e,t,n,i){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=n,this.appCheckTokenProvider_=i,this.log_=Wi("p:rest:"),this.listens_={}}listen(e,t,n,i){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=po.getListenId_(e,n),l={};this.listens_[o]=l;const u=Dd(e._queryParams);this.restRequest_(r+".json",u,(h,f)=>{let p=f;if(h===404&&(p=null,h=null),h===null&&this.onDataUpdate_(r,p,!1,n),ns(this.listens_,o)===l){let m;h?h===401?m="permission_denied":m="rest_error:"+h:m="ok",i(m,null)}})}unlisten(e,t){const n=po.getListenId_(e,t);delete this.listens_[n]}get(e){const t=Dd(e._queryParams),n=e._path.toString(),i=new uf;return this.restRequest_(n+".json",t,(r,o)=>{let l=o;r===404&&(l=null,r=null),r===null?(this.onDataUpdate_(n,l,!1,null),i.resolve(l)):i.reject(new Error(l))}),i.promise}refreshAuthToken(e){}restRequest_(e,t={},n){return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([i,r])=>{i&&i.accessToken&&(t.auth=i.accessToken),r&&r.token&&(t.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+Ng(t);this.log_("Sending REST request for "+o);const l=new XMLHttpRequest;l.onreadystatechange=()=>{if(n&&l.readyState===4){this.log_("REST Response for "+o+" received. status:",l.status,"response:",l.responseText);let u=null;if(l.status>=200&&l.status<300){try{u=Al(l.responseText)}catch{Ze("Failed to parse JSON response for "+o+": "+l.responseText)}n(null,u)}else l.status!==401&&l.status!==404&&Ze("Got unsuccessful REST response for "+o+" Status: "+l.status),n(l.status);n=null}},l.open("GET",o,!0),l.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Av{constructor(){this.rootNode_=G.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _o(){return{value:null,children:new Map}}function cm(s,e,t){if(H(e))s.value=t,s.children.clear();else if(s.value!==null)s.value=s.value.updateChild(e,t);else{const n=Q(e);s.children.has(n)||s.children.set(n,_o());const i=s.children.get(n);e=ue(e),cm(i,e,t)}}function pl(s,e,t){s.value!==null?t(e,s.value):Rv(s,(n,i)=>{const r=new ae(e.toString()+"/"+n);pl(i,r,t)})}function Rv(s,e){s.children.forEach((t,n)=>{e(n,t)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cv{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),t=Object.assign({},e);return this.last_&&He(this.last_,(n,i)=>{t[n]=t[n]-i}),this.last_=e,t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Od=10*1e3,Sv=30*1e3,Pv=5*60*1e3;class bv{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new Cv(e);const n=Od+(Sv-Od)*Math.random();pi(this.reportStats_.bind(this),Math.floor(n))}reportStats_(){const e=this.statsListener_.get(),t={};let n=!1;He(e,(i,r)=>{r>0&&Ct(this.statsToReport_,i)&&(t[i]=r,n=!0)}),n&&this.server_.reportStats(t),pi(this.reportStats_.bind(this),Math.floor(Math.random()*2*Pv))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var at;(function(s){s[s.OVERWRITE=0]="OVERWRITE",s[s.MERGE=1]="MERGE",s[s.ACK_USER_WRITE=2]="ACK_USER_WRITE",s[s.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(at||(at={}));function hm(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function Pu(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function bu(s){return{fromUser:!1,fromServer:!0,queryId:s,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mo{constructor(e,t,n){this.path=e,this.affectedTree=t,this.revert=n,this.type=at.ACK_USER_WRITE,this.source=hm()}operationForChild(e){if(H(this.path)){if(this.affectedTree.value!=null)return D(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const t=this.affectedTree.subtree(new ae(e));return new mo(te(),t,this.revert)}}else return D(Q(this.path)===e,"operationForChild called for unrelated child."),new mo(ue(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oi{constructor(e,t){this.source=e,this.path=t,this.type=at.LISTEN_COMPLETE}operationForChild(e){return H(this.path)?new Oi(this.source,te()):new Oi(this.source,ue(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cn{constructor(e,t,n){this.source=e,this.path=t,this.snap=n,this.type=at.OVERWRITE}operationForChild(e){return H(this.path)?new Cn(this.source,te(),this.snap.getImmediateChild(e)):new Cn(this.source,ue(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mi{constructor(e,t,n){this.source=e,this.path=t,this.children=n,this.type=at.MERGE}operationForChild(e){if(H(this.path)){const t=this.children.subtree(new ae(e));return t.isEmpty()?null:t.value?new Cn(this.source,te(),t.value):new Mi(this.source,te(),t)}else return D(Q(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new Mi(this.source,ue(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sn{constructor(e,t,n){this.node_=e,this.fullyInitialized_=t,this.filtered_=n}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(H(e))return this.isFullyInitialized()&&!this.filtered_;const t=Q(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xv{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function Nv(s,e,t,n){const i=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&s.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(Tv(o.childName,o.snapshotNode))}),Js(s,i,"child_removed",e,n,t),Js(s,i,"child_added",e,n,t),Js(s,i,"child_moved",r,n,t),Js(s,i,"child_changed",e,n,t),Js(s,i,"value",e,n,t),i}function Js(s,e,t,n,i,r){const o=n.filter(l=>l.type===t);o.sort((l,u)=>Dv(s,l,u)),o.forEach(l=>{const u=Vv(s,l,r);i.forEach(h=>{h.respondsTo(l.type)&&e.push(h.createEvent(u,s.query_))})})}function Vv(s,e,t){return e.type==="value"||e.type==="child_removed"||(e.prevName=t.getPredecessorChildName(e.childName,e.snapshotNode,s.index_)),e}function Dv(s,e,t){if(e.childName==null||t.childName==null)throw Fi("Should only compare child_ events.");const n=new $(e.childName,e.snapshotNode),i=new $(t.childName,t.snapshotNode);return s.index_.compare(n,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wo(s,e){return{eventCache:s,serverCache:e}}function _i(s,e,t,n){return Wo(new Sn(e,t,n),s.serverCache)}function dm(s,e,t,n){return Wo(s.eventCache,new Sn(e,t,n))}function _l(s){return s.eventCache.isFullyInitialized()?s.eventCache.getNode():null}function Pn(s){return s.serverCache.isFullyInitialized()?s.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ka;const kv=()=>(ka||(ka=new Qe(ET)),ka);class he{static fromObject(e){let t=new he(null);return He(e,(n,i)=>{t=t.set(new ae(n),i)}),t}constructor(e,t=kv()){this.value=e,this.children=t}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(this.value!=null&&t(this.value))return{path:te(),value:this.value};if(H(e))return null;{const n=Q(e),i=this.children.get(n);if(i!==null){const r=i.findRootMostMatchingPathAndValue(ue(e),t);return r!=null?{path:ve(new ae(n),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(H(e))return this;{const t=Q(e),n=this.children.get(t);return n!==null?n.subtree(ue(e)):new he(null)}}set(e,t){if(H(e))return new he(t,this.children);{const n=Q(e),r=(this.children.get(n)||new he(null)).set(ue(e),t),o=this.children.insert(n,r);return new he(this.value,o)}}remove(e){if(H(e))return this.children.isEmpty()?new he(null):new he(null,this.children);{const t=Q(e),n=this.children.get(t);if(n){const i=n.remove(ue(e));let r;return i.isEmpty()?r=this.children.remove(t):r=this.children.insert(t,i),this.value===null&&r.isEmpty()?new he(null):new he(this.value,r)}else return this}}get(e){if(H(e))return this.value;{const t=Q(e),n=this.children.get(t);return n?n.get(ue(e)):null}}setTree(e,t){if(H(e))return t;{const n=Q(e),r=(this.children.get(n)||new he(null)).setTree(ue(e),t);let o;return r.isEmpty()?o=this.children.remove(n):o=this.children.insert(n,r),new he(this.value,o)}}fold(e){return this.fold_(te(),e)}fold_(e,t){const n={};return this.children.inorderTraversal((i,r)=>{n[i]=r.fold_(ve(e,i),t)}),t(e,this.value,n)}findOnPath(e,t){return this.findOnPath_(e,te(),t)}findOnPath_(e,t,n){const i=this.value?n(t,this.value):!1;if(i)return i;if(H(e))return null;{const r=Q(e),o=this.children.get(r);return o?o.findOnPath_(ue(e),ve(t,r),n):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,te(),t)}foreachOnPath_(e,t,n){if(H(e))return this;{this.value&&n(t,this.value);const i=Q(e),r=this.children.get(i);return r?r.foreachOnPath_(ue(e),ve(t,i),n):new he(null)}}foreach(e){this.foreach_(te(),e)}foreach_(e,t){this.children.inorderTraversal((n,i)=>{i.foreach_(ve(e,n),t)}),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal((t,n)=>{n.value&&e(t,n.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lt{constructor(e){this.writeTree_=e}static empty(){return new lt(new he(null))}}function mi(s,e,t){if(H(e))return new lt(new he(t));{const n=s.writeTree_.findRootMostValueAndPath(e);if(n!=null){const i=n.path;let r=n.value;const o=$e(i,e);return r=r.updateChild(o,t),new lt(s.writeTree_.set(i,r))}else{const i=new he(t),r=s.writeTree_.setTree(e,i);return new lt(r)}}}function Md(s,e,t){let n=s;return He(t,(i,r)=>{n=mi(n,ve(e,i),r)}),n}function Fd(s,e){if(H(e))return lt.empty();{const t=s.writeTree_.setTree(e,new he(null));return new lt(t)}}function ml(s,e){return Vn(s,e)!=null}function Vn(s,e){const t=s.writeTree_.findRootMostValueAndPath(e);return t!=null?s.writeTree_.get(t.path).getChild($e(t.path,e)):null}function Ld(s){const e=[],t=s.writeTree_.value;return t!=null?t.isLeafNode()||t.forEachChild(me,(n,i)=>{e.push(new $(n,i))}):s.writeTree_.children.inorderTraversal((n,i)=>{i.value!=null&&e.push(new $(n,i.value))}),e}function jt(s,e){if(H(e))return s;{const t=Vn(s,e);return t!=null?new lt(new he(t)):new lt(s.writeTree_.subtree(e))}}function gl(s){return s.writeTree_.isEmpty()}function ys(s,e){return fm(te(),s.writeTree_,e)}function fm(s,e,t){if(e.value!=null)return t.updateChild(s,e.value);{let n=null;return e.children.inorderTraversal((i,r)=>{i===".priority"?(D(r.value!==null,"Priority writes must always be leaf nodes"),n=r.value):t=fm(ve(s,i),r,t)}),!t.getChild(s).isEmpty()&&n!==null&&(t=t.updateChild(ve(s,".priority"),n)),t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xu(s,e){return gm(e,s)}function Ov(s,e,t,n,i){D(n>s.lastWriteId,"Stacking an older write on top of newer ones"),i===void 0&&(i=!0),s.allWrites.push({path:e,snap:t,writeId:n,visible:i}),i&&(s.visibleWrites=mi(s.visibleWrites,e,t)),s.lastWriteId=n}function Mv(s,e){for(let t=0;t<s.allWrites.length;t++){const n=s.allWrites[t];if(n.writeId===e)return n}return null}function Fv(s,e){const t=s.allWrites.findIndex(l=>l.writeId===e);D(t>=0,"removeWrite called with nonexistent writeId.");const n=s.allWrites[t];s.allWrites.splice(t,1);let i=n.visible,r=!1,o=s.allWrites.length-1;for(;i&&o>=0;){const l=s.allWrites[o];l.visible&&(o>=t&&Lv(l,n.path)?i=!1:ot(n.path,l.path)&&(r=!0)),o--}if(i){if(r)return Uv(s),!0;if(n.snap)s.visibleWrites=Fd(s.visibleWrites,n.path);else{const l=n.children;He(l,u=>{s.visibleWrites=Fd(s.visibleWrites,ve(n.path,u))})}return!0}else return!1}function Lv(s,e){if(s.snap)return ot(s.path,e);for(const t in s.children)if(s.children.hasOwnProperty(t)&&ot(ve(s.path,t),e))return!0;return!1}function Uv(s){s.visibleWrites=pm(s.allWrites,Bv,te()),s.allWrites.length>0?s.lastWriteId=s.allWrites[s.allWrites.length-1].writeId:s.lastWriteId=-1}function Bv(s){return s.visible}function pm(s,e,t){let n=lt.empty();for(let i=0;i<s.length;++i){const r=s[i];if(e(r)){const o=r.path;let l;if(r.snap)ot(t,o)?(l=$e(t,o),n=mi(n,l,r.snap)):ot(o,t)&&(l=$e(o,t),n=mi(n,te(),r.snap.getChild(l)));else if(r.children){if(ot(t,o))l=$e(t,o),n=Md(n,l,r.children);else if(ot(o,t))if(l=$e(o,t),H(l))n=Md(n,te(),r.children);else{const u=ns(r.children,Q(l));if(u){const h=u.getChild(ue(l));n=mi(n,te(),h)}}}else throw Fi("WriteRecord should have .snap or .children")}}return n}function _m(s,e,t,n,i){if(!n&&!i){const r=Vn(s.visibleWrites,e);if(r!=null)return r;{const o=jt(s.visibleWrites,e);if(gl(o))return t;if(t==null&&!ml(o,te()))return null;{const l=t||G.EMPTY_NODE;return ys(o,l)}}}else{const r=jt(s.visibleWrites,e);if(!i&&gl(r))return t;if(!i&&t==null&&!ml(r,te()))return null;{const o=function(h){return(h.visible||i)&&(!n||!~n.indexOf(h.writeId))&&(ot(h.path,e)||ot(e,h.path))},l=pm(s.allWrites,o,e),u=t||G.EMPTY_NODE;return ys(l,u)}}}function qv(s,e,t){let n=G.EMPTY_NODE;const i=Vn(s.visibleWrites,e);if(i)return i.isLeafNode()||i.forEachChild(me,(r,o)=>{n=n.updateImmediateChild(r,o)}),n;if(t){const r=jt(s.visibleWrites,e);return t.forEachChild(me,(o,l)=>{const u=ys(jt(r,new ae(o)),l);n=n.updateImmediateChild(o,u)}),Ld(r).forEach(o=>{n=n.updateImmediateChild(o.name,o.node)}),n}else{const r=jt(s.visibleWrites,e);return Ld(r).forEach(o=>{n=n.updateImmediateChild(o.name,o.node)}),n}}function jv(s,e,t,n,i){D(n||i,"Either existingEventSnap or existingServerSnap must exist");const r=ve(e,t);if(ml(s.visibleWrites,r))return null;{const o=jt(s.visibleWrites,r);return gl(o)?i.getChild(t):ys(o,i.getChild(t))}}function zv(s,e,t,n){const i=ve(e,t),r=Vn(s.visibleWrites,i);if(r!=null)return r;if(n.isCompleteForChild(t)){const o=jt(s.visibleWrites,i);return ys(o,n.getNode().getImmediateChild(t))}else return null}function Gv(s,e){return Vn(s.visibleWrites,e)}function Kv(s,e,t,n,i,r,o){let l;const u=jt(s.visibleWrites,e),h=Vn(u,te());if(h!=null)l=h;else if(t!=null)l=ys(u,t);else return[];if(l=l.withIndex(o),!l.isEmpty()&&!l.isLeafNode()){const f=[],p=o.getCompare(),m=r?l.getReverseIteratorFrom(n,o):l.getIteratorFrom(n,o);let v=m.getNext();for(;v&&f.length<i;)p(v,n)!==0&&f.push(v),v=m.getNext();return f}else return[]}function Wv(){return{visibleWrites:lt.empty(),allWrites:[],lastWriteId:-1}}function go(s,e,t,n){return _m(s.writeTree,s.treePath,e,t,n)}function Nu(s,e){return qv(s.writeTree,s.treePath,e)}function Ud(s,e,t,n){return jv(s.writeTree,s.treePath,e,t,n)}function yo(s,e){return Gv(s.writeTree,ve(s.treePath,e))}function $v(s,e,t,n,i,r){return Kv(s.writeTree,s.treePath,e,t,n,i,r)}function Vu(s,e,t){return zv(s.writeTree,s.treePath,e,t)}function mm(s,e){return gm(ve(s.treePath,e),s.writeTree)}function gm(s,e){return{treePath:s,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qv{constructor(){this.changeMap=new Map}trackChildChange(e){const t=e.type,n=e.childName;D(t==="child_added"||t==="child_changed"||t==="child_removed","Only child changes supported for tracking"),D(n!==".priority","Only non-priority child changes can be tracked.");const i=this.changeMap.get(n);if(i){const r=i.type;if(t==="child_added"&&r==="child_removed")this.changeMap.set(n,Di(n,e.snapshotNode,i.snapshotNode));else if(t==="child_removed"&&r==="child_added")this.changeMap.delete(n);else if(t==="child_removed"&&r==="child_changed")this.changeMap.set(n,Vi(n,i.oldSnap));else if(t==="child_changed"&&r==="child_added")this.changeMap.set(n,gs(n,e.snapshotNode));else if(t==="child_changed"&&r==="child_changed")this.changeMap.set(n,Di(n,e.snapshotNode,i.oldSnap));else throw Fi("Illegal combination of changes: "+e+" occurred after "+i)}else this.changeMap.set(n,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hv{getCompleteChild(e){return null}getChildAfterChild(e,t,n){return null}}const ym=new Hv;class Du{constructor(e,t,n=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=n}getCompleteChild(e){const t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{const n=this.optCompleteServerCache_!=null?new Sn(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return Vu(this.writes_,e,n)}}getChildAfterChild(e,t,n){const i=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:Pn(this.viewCache_),r=$v(this.writes_,i,t,1,n,e);return r.length===0?null:r[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yv(s){return{filter:s}}function Xv(s,e){D(e.eventCache.getNode().isIndexed(s.filter.getIndex()),"Event snap not indexed"),D(e.serverCache.getNode().isIndexed(s.filter.getIndex()),"Server snap not indexed")}function Jv(s,e,t,n,i){const r=new Qv;let o,l;if(t.type===at.OVERWRITE){const h=t;h.source.fromUser?o=yl(s,e,h.path,h.snap,n,i,r):(D(h.source.fromServer,"Unknown source."),l=h.source.tagged||e.serverCache.isFiltered()&&!H(h.path),o=Eo(s,e,h.path,h.snap,n,i,l,r))}else if(t.type===at.MERGE){const h=t;h.source.fromUser?o=ew(s,e,h.path,h.children,n,i,r):(D(h.source.fromServer,"Unknown source."),l=h.source.tagged||e.serverCache.isFiltered(),o=El(s,e,h.path,h.children,n,i,l,r))}else if(t.type===at.ACK_USER_WRITE){const h=t;h.revert?o=sw(s,e,h.path,n,i,r):o=tw(s,e,h.path,h.affectedTree,n,i,r)}else if(t.type===at.LISTEN_COMPLETE)o=nw(s,e,t.path,n,r);else throw Fi("Unknown operation type: "+t.type);const u=r.getChanges();return Zv(e,o,u),{viewCache:o,changes:u}}function Zv(s,e,t){const n=e.eventCache;if(n.isFullyInitialized()){const i=n.getNode().isLeafNode()||n.getNode().isEmpty(),r=_l(s);(t.length>0||!s.eventCache.isFullyInitialized()||i&&!n.getNode().equals(r)||!n.getNode().getPriority().equals(r.getPriority()))&&t.push(um(_l(e)))}}function Em(s,e,t,n,i,r){const o=e.eventCache;if(yo(n,t)!=null)return e;{let l,u;if(H(t))if(D(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const h=Pn(e),f=h instanceof G?h:G.EMPTY_NODE,p=Nu(n,f);l=s.filter.updateFullNode(e.eventCache.getNode(),p,r)}else{const h=go(n,Pn(e));l=s.filter.updateFullNode(e.eventCache.getNode(),h,r)}else{const h=Q(t);if(h===".priority"){D(Ht(t)===1,"Can't have a priority with additional path components");const f=o.getNode();u=e.serverCache.getNode();const p=Ud(n,t,f,u);p!=null?l=s.filter.updatePriority(f,p):l=o.getNode()}else{const f=ue(t);let p;if(o.isCompleteForChild(h)){u=e.serverCache.getNode();const m=Ud(n,t,o.getNode(),u);m!=null?p=o.getNode().getImmediateChild(h).updateChild(f,m):p=o.getNode().getImmediateChild(h)}else p=Vu(n,h,e.serverCache);p!=null?l=s.filter.updateChild(o.getNode(),h,p,f,i,r):l=o.getNode()}}return _i(e,l,o.isFullyInitialized()||H(t),s.filter.filtersNodes())}}function Eo(s,e,t,n,i,r,o,l){const u=e.serverCache;let h;const f=o?s.filter:s.filter.getIndexedFilter();if(H(t))h=f.updateFullNode(u.getNode(),n,null);else if(f.filtersNodes()&&!u.isFiltered()){const v=u.getNode().updateChild(t,n);h=f.updateFullNode(u.getNode(),v,null)}else{const v=Q(t);if(!u.isCompleteForPath(t)&&Ht(t)>1)return e;const S=ue(t),V=u.getNode().getImmediateChild(v).updateChild(S,n);v===".priority"?h=f.updatePriority(u.getNode(),V):h=f.updateChild(u.getNode(),v,V,S,ym,null)}const p=dm(e,h,u.isFullyInitialized()||H(t),f.filtersNodes()),m=new Du(i,p,r);return Em(s,p,t,i,m,l)}function yl(s,e,t,n,i,r,o){const l=e.eventCache;let u,h;const f=new Du(i,e,r);if(H(t))h=s.filter.updateFullNode(e.eventCache.getNode(),n,o),u=_i(e,h,!0,s.filter.filtersNodes());else{const p=Q(t);if(p===".priority")h=s.filter.updatePriority(e.eventCache.getNode(),n),u=_i(e,h,l.isFullyInitialized(),l.isFiltered());else{const m=ue(t),v=l.getNode().getImmediateChild(p);let S;if(H(m))S=n;else{const N=f.getCompleteChild(p);N!=null?em(m)===".priority"&&N.getChild(nm(m)).isEmpty()?S=N:S=N.updateChild(m,n):S=G.EMPTY_NODE}if(v.equals(S))u=e;else{const N=s.filter.updateChild(l.getNode(),p,S,m,f,o);u=_i(e,N,l.isFullyInitialized(),s.filter.filtersNodes())}}}return u}function Bd(s,e){return s.eventCache.isCompleteForChild(e)}function ew(s,e,t,n,i,r,o){let l=e;return n.foreach((u,h)=>{const f=ve(t,u);Bd(e,Q(f))&&(l=yl(s,l,f,h,i,r,o))}),n.foreach((u,h)=>{const f=ve(t,u);Bd(e,Q(f))||(l=yl(s,l,f,h,i,r,o))}),l}function qd(s,e,t){return t.foreach((n,i)=>{e=e.updateChild(n,i)}),e}function El(s,e,t,n,i,r,o,l){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let u=e,h;H(t)?h=n:h=new he(null).setTree(t,n);const f=e.serverCache.getNode();return h.children.inorderTraversal((p,m)=>{if(f.hasChild(p)){const v=e.serverCache.getNode().getImmediateChild(p),S=qd(s,v,m);u=Eo(s,u,new ae(p),S,i,r,o,l)}}),h.children.inorderTraversal((p,m)=>{const v=!e.serverCache.isCompleteForChild(p)&&m.value===null;if(!f.hasChild(p)&&!v){const S=e.serverCache.getNode().getImmediateChild(p),N=qd(s,S,m);u=Eo(s,u,new ae(p),N,i,r,o,l)}}),u}function tw(s,e,t,n,i,r,o){if(yo(i,t)!=null)return e;const l=e.serverCache.isFiltered(),u=e.serverCache;if(n.value!=null){if(H(t)&&u.isFullyInitialized()||u.isCompleteForPath(t))return Eo(s,e,t,u.getNode().getChild(t),i,r,l,o);if(H(t)){let h=new he(null);return u.getNode().forEachChild(es,(f,p)=>{h=h.set(new ae(f),p)}),El(s,e,t,h,i,r,l,o)}else return e}else{let h=new he(null);return n.foreach((f,p)=>{const m=ve(t,f);u.isCompleteForPath(m)&&(h=h.set(f,u.getNode().getChild(m)))}),El(s,e,t,h,i,r,l,o)}}function nw(s,e,t,n,i){const r=e.serverCache,o=dm(e,r.getNode(),r.isFullyInitialized()||H(t),r.isFiltered());return Em(s,o,t,n,ym,i)}function sw(s,e,t,n,i,r){let o;if(yo(n,t)!=null)return e;{const l=new Du(n,e,i),u=e.eventCache.getNode();let h;if(H(t)||Q(t)===".priority"){let f;if(e.serverCache.isFullyInitialized())f=go(n,Pn(e));else{const p=e.serverCache.getNode();D(p instanceof G,"serverChildren would be complete if leaf node"),f=Nu(n,p)}f=f,h=s.filter.updateFullNode(u,f,r)}else{const f=Q(t);let p=Vu(n,f,e.serverCache);p==null&&e.serverCache.isCompleteForChild(f)&&(p=u.getImmediateChild(f)),p!=null?h=s.filter.updateChild(u,f,p,ue(t),l,r):e.eventCache.getNode().hasChild(f)?h=s.filter.updateChild(u,f,G.EMPTY_NODE,ue(t),l,r):h=u,h.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=go(n,Pn(e)),o.isLeafNode()&&(h=s.filter.updateFullNode(h,o,r)))}return o=e.serverCache.isFullyInitialized()||yo(n,te())!=null,_i(e,h,o,s.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class iw{constructor(e,t){this.query_=e,this.eventRegistrations_=[];const n=this.query_._queryParams,i=new Cu(n.getIndex()),r=wv(n);this.processor_=Yv(r);const o=t.serverCache,l=t.eventCache,u=i.updateFullNode(G.EMPTY_NODE,o.getNode(),null),h=r.updateFullNode(G.EMPTY_NODE,l.getNode(),null),f=new Sn(u,o.isFullyInitialized(),i.filtersNodes()),p=new Sn(h,l.isFullyInitialized(),r.filtersNodes());this.viewCache_=Wo(p,f),this.eventGenerator_=new xv(this.query_)}get query(){return this.query_}}function rw(s){return s.viewCache_.serverCache.getNode()}function ow(s,e){const t=Pn(s.viewCache_);return t&&(s.query._queryParams.loadsAllData()||!H(e)&&!t.getImmediateChild(Q(e)).isEmpty())?t.getChild(e):null}function jd(s){return s.eventRegistrations_.length===0}function aw(s,e){s.eventRegistrations_.push(e)}function zd(s,e,t){const n=[];if(t){D(e==null,"A cancel should cancel all event registrations.");const i=s.query._path;s.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(t,i);o&&n.push(o)})}if(e){let i=[];for(let r=0;r<s.eventRegistrations_.length;++r){const o=s.eventRegistrations_[r];if(!o.matches(e))i.push(o);else if(e.hasAnyCallback()){i=i.concat(s.eventRegistrations_.slice(r+1));break}}s.eventRegistrations_=i}else s.eventRegistrations_=[];return n}function Gd(s,e,t,n){e.type===at.MERGE&&e.source.queryId!==null&&(D(Pn(s.viewCache_),"We should always have a full cache before handling merges"),D(_l(s.viewCache_),"Missing event cache, even though we have a server cache"));const i=s.viewCache_,r=Jv(s.processor_,i,e,t,n);return Xv(s.processor_,r.viewCache),D(r.viewCache.serverCache.isFullyInitialized()||!i.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),s.viewCache_=r.viewCache,Im(s,r.changes,r.viewCache.eventCache.getNode(),null)}function lw(s,e){const t=s.viewCache_.eventCache,n=[];return t.getNode().isLeafNode()||t.getNode().forEachChild(me,(r,o)=>{n.push(gs(r,o))}),t.isFullyInitialized()&&n.push(um(t.getNode())),Im(s,n,t.getNode(),e)}function Im(s,e,t,n){const i=n?[n]:s.eventRegistrations_;return Nv(s.eventGenerator_,e,t,i)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Io;class uw{constructor(){this.views=new Map}}function cw(s){D(!Io,"__referenceConstructor has already been defined"),Io=s}function hw(){return D(Io,"Reference.ts has not been loaded"),Io}function dw(s){return s.views.size===0}function ku(s,e,t,n){const i=e.source.queryId;if(i!==null){const r=s.views.get(i);return D(r!=null,"SyncTree gave us an op for an invalid query."),Gd(r,e,t,n)}else{let r=[];for(const o of s.views.values())r=r.concat(Gd(o,e,t,n));return r}}function fw(s,e,t,n,i){const r=e._queryIdentifier,o=s.views.get(r);if(!o){let l=go(t,i?n:null),u=!1;l?u=!0:n instanceof G?(l=Nu(t,n),u=!1):(l=G.EMPTY_NODE,u=!1);const h=Wo(new Sn(l,u,!1),new Sn(n,i,!1));return new iw(e,h)}return o}function pw(s,e,t,n,i,r){const o=fw(s,e,n,i,r);return s.views.has(e._queryIdentifier)||s.views.set(e._queryIdentifier,o),aw(o,t),lw(o,t)}function _w(s,e,t,n){const i=e._queryIdentifier,r=[];let o=[];const l=Yt(s);if(i==="default")for(const[u,h]of s.views.entries())o=o.concat(zd(h,t,n)),jd(h)&&(s.views.delete(u),h.query._queryParams.loadsAllData()||r.push(h.query));else{const u=s.views.get(i);u&&(o=o.concat(zd(u,t,n)),jd(u)&&(s.views.delete(i),u.query._queryParams.loadsAllData()||r.push(u.query)))}return l&&!Yt(s)&&r.push(new(hw())(e._repo,e._path)),{removed:r,events:o}}function Tm(s){const e=[];for(const t of s.views.values())t.query._queryParams.loadsAllData()||e.push(t);return e}function ts(s,e){let t=null;for(const n of s.views.values())t=t||ow(n,e);return t}function vm(s,e){if(e._queryParams.loadsAllData())return $o(s);{const n=e._queryIdentifier;return s.views.get(n)}}function wm(s,e){return vm(s,e)!=null}function Yt(s){return $o(s)!=null}function $o(s){for(const e of s.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let To;function mw(s){D(!To,"__referenceConstructor has already been defined"),To=s}function gw(){return D(To,"Reference.ts has not been loaded"),To}let yw=1;class Kd{constructor(e){this.listenProvider_=e,this.syncPointTree_=new he(null),this.pendingWriteTree_=Wv(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Ew(s,e,t,n,i){return Ov(s.pendingWriteTree_,e,t,n,i),i?Hi(s,new Cn(hm(),e,t)):[]}function Yn(s,e,t=!1){const n=Mv(s.pendingWriteTree_,e);if(Fv(s.pendingWriteTree_,e)){let r=new he(null);return n.snap!=null?r=r.set(te(),!0):He(n.children,o=>{r=r.set(new ae(o),!0)}),Hi(s,new mo(n.path,r,t))}else return[]}function Qo(s,e,t){return Hi(s,new Cn(Pu(),e,t))}function Iw(s,e,t){const n=he.fromObject(t);return Hi(s,new Mi(Pu(),e,n))}function Tw(s,e){return Hi(s,new Oi(Pu(),e))}function vw(s,e,t){const n=Ou(s,t);if(n){const i=Mu(n),r=i.path,o=i.queryId,l=$e(r,e),u=new Oi(bu(o),l);return Fu(s,r,u)}else return[]}function Il(s,e,t,n,i=!1){const r=e._path,o=s.syncPointTree_.get(r);let l=[];if(o&&(e._queryIdentifier==="default"||wm(o,e))){const u=_w(o,e,t,n);dw(o)&&(s.syncPointTree_=s.syncPointTree_.remove(r));const h=u.removed;if(l=u.events,!i){const f=h.findIndex(m=>m._queryParams.loadsAllData())!==-1,p=s.syncPointTree_.findOnPath(r,(m,v)=>Yt(v));if(f&&!p){const m=s.syncPointTree_.subtree(r);if(!m.isEmpty()){const v=Rw(m);for(let S=0;S<v.length;++S){const N=v[S],V=N.query,K=Sm(s,N);s.listenProvider_.startListening(gi(V),vo(s,V),K.hashFn,K.onComplete)}}}!p&&h.length>0&&!n&&(f?s.listenProvider_.stopListening(gi(e),null):h.forEach(m=>{const v=s.queryToTagMap.get(Ho(m));s.listenProvider_.stopListening(gi(m),v)}))}Cw(s,h)}return l}function ww(s,e,t,n){const i=Ou(s,n);if(i!=null){const r=Mu(i),o=r.path,l=r.queryId,u=$e(o,e),h=new Cn(bu(l),u,t);return Fu(s,o,h)}else return[]}function Aw(s,e,t,n){const i=Ou(s,n);if(i){const r=Mu(i),o=r.path,l=r.queryId,u=$e(o,e),h=he.fromObject(t),f=new Mi(bu(l),u,h);return Fu(s,o,f)}else return[]}function Wd(s,e,t,n=!1){const i=e._path;let r=null,o=!1;s.syncPointTree_.foreachOnPath(i,(m,v)=>{const S=$e(m,i);r=r||ts(v,S),o=o||Yt(v)});let l=s.syncPointTree_.get(i);l?(o=o||Yt(l),r=r||ts(l,te())):(l=new uw,s.syncPointTree_=s.syncPointTree_.set(i,l));let u;r!=null?u=!0:(u=!1,r=G.EMPTY_NODE,s.syncPointTree_.subtree(i).foreachChild((v,S)=>{const N=ts(S,te());N&&(r=r.updateImmediateChild(v,N))}));const h=wm(l,e);if(!h&&!e._queryParams.loadsAllData()){const m=Ho(e);D(!s.queryToTagMap.has(m),"View does not exist, but we have a tag");const v=Sw();s.queryToTagMap.set(m,v),s.tagToQueryMap.set(v,m)}const f=xu(s.pendingWriteTree_,i);let p=pw(l,e,t,f,r,u);if(!h&&!o&&!n){const m=vm(l,e);p=p.concat(Pw(s,e,m))}return p}function Am(s,e,t){const i=s.pendingWriteTree_,r=s.syncPointTree_.findOnPath(e,(o,l)=>{const u=$e(o,e),h=ts(l,u);if(h)return h});return _m(i,e,r,t,!0)}function Hi(s,e){return Rm(e,s.syncPointTree_,null,xu(s.pendingWriteTree_,te()))}function Rm(s,e,t,n){if(H(s.path))return Cm(s,e,t,n);{const i=e.get(te());t==null&&i!=null&&(t=ts(i,te()));let r=[];const o=Q(s.path),l=s.operationForChild(o),u=e.children.get(o);if(u&&l){const h=t?t.getImmediateChild(o):null,f=mm(n,o);r=r.concat(Rm(l,u,h,f))}return i&&(r=r.concat(ku(i,s,n,t))),r}}function Cm(s,e,t,n){const i=e.get(te());t==null&&i!=null&&(t=ts(i,te()));let r=[];return e.children.inorderTraversal((o,l)=>{const u=t?t.getImmediateChild(o):null,h=mm(n,o),f=s.operationForChild(o);f&&(r=r.concat(Cm(f,l,u,h)))}),i&&(r=r.concat(ku(i,s,n,t))),r}function Sm(s,e){const t=e.query,n=vo(s,t);return{hashFn:()=>(rw(e)||G.EMPTY_NODE).hash(),onComplete:i=>{if(i==="ok")return n?vw(s,t._path,n):Tw(s,t._path);{const r=vT(i,t);return Il(s,t,null,r)}}}}function vo(s,e){const t=Ho(e);return s.queryToTagMap.get(t)}function Ho(s){return s._path.toString()+"$"+s._queryIdentifier}function Ou(s,e){return s.tagToQueryMap.get(e)}function Mu(s){const e=s.indexOf("$");return D(e!==-1&&e<s.length-1,"Bad queryKey."),{queryId:s.substr(e+1),path:new ae(s.substr(0,e))}}function Fu(s,e,t){const n=s.syncPointTree_.get(e);D(n,"Missing sync point for query tag that we're tracking");const i=xu(s.pendingWriteTree_,e);return ku(n,t,i,null)}function Rw(s){return s.fold((e,t,n)=>{if(t&&Yt(t))return[$o(t)];{let i=[];return t&&(i=Tm(t)),He(n,(r,o)=>{i=i.concat(o)}),i}})}function gi(s){return s._queryParams.loadsAllData()&&!s._queryParams.isDefault()?new(gw())(s._repo,s._path):s}function Cw(s,e){for(let t=0;t<e.length;++t){const n=e[t];if(!n._queryParams.loadsAllData()){const i=Ho(n),r=s.queryToTagMap.get(i);s.queryToTagMap.delete(i),s.tagToQueryMap.delete(r)}}}function Sw(){return yw++}function Pw(s,e,t){const n=e._path,i=vo(s,e),r=Sm(s,t),o=s.listenProvider_.startListening(gi(e),i,r.hashFn,r.onComplete),l=s.syncPointTree_.subtree(n);if(i)D(!Yt(l.value),"If we're adding a query, it shouldn't be shadowed");else{const u=l.fold((h,f,p)=>{if(!H(h)&&f&&Yt(f))return[$o(f).query];{let m=[];return f&&(m=m.concat(Tm(f).map(v=>v.query))),He(p,(v,S)=>{m=m.concat(S)}),m}});for(let h=0;h<u.length;++h){const f=u[h];s.listenProvider_.stopListening(gi(f),vo(s,f))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lu{constructor(e){this.node_=e}getImmediateChild(e){const t=this.node_.getImmediateChild(e);return new Lu(t)}node(){return this.node_}}class Uu{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){const t=ve(this.path_,e);return new Uu(this.syncTree_,t)}node(){return Am(this.syncTree_,this.path_)}}const bw=function(s){return s=s||{},s.timestamp=s.timestamp||new Date().getTime(),s},$d=function(s,e,t){if(!s||typeof s!="object")return s;if(D(".sv"in s,"Unexpected leaf node or priority contents"),typeof s[".sv"]=="string")return xw(s[".sv"],e,t);if(typeof s[".sv"]=="object")return Nw(s[".sv"],e);D(!1,"Unexpected server value: "+JSON.stringify(s,null,2))},xw=function(s,e,t){switch(s){case"timestamp":return t.timestamp;default:D(!1,"Unexpected server value: "+s)}},Nw=function(s,e,t){s.hasOwnProperty("increment")||D(!1,"Unexpected server value: "+JSON.stringify(s,null,2));const n=s.increment;typeof n!="number"&&D(!1,"Unexpected increment value: "+n);const i=e.node();if(D(i!==null&&typeof i<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!i.isLeafNode())return n;const o=i.getValue();return typeof o!="number"?n:o+n},Vw=function(s,e,t,n){return Bu(e,new Uu(t,s),n)},Dw=function(s,e,t){return Bu(s,new Lu(e),t)};function Bu(s,e,t){const n=s.getPriority().val(),i=$d(n,e.getImmediateChild(".priority"),t);let r;if(s.isLeafNode()){const o=s,l=$d(o.getValue(),e,t);return l!==o.getValue()||i!==o.getPriority().val()?new Ae(l,Le(i)):s}else{const o=s;return r=o,i!==o.getPriority().val()&&(r=r.updatePriority(new Ae(i))),o.forEachChild(me,(l,u)=>{const h=Bu(u,e.getImmediateChild(l),t);h!==u&&(r=r.updateImmediateChild(l,h))}),r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qu{constructor(e="",t=null,n={children:{},childCount:0}){this.name=e,this.parent=t,this.node=n}}function ju(s,e){let t=e instanceof ae?e:new ae(e),n=s,i=Q(t);for(;i!==null;){const r=ns(n.node.children,i)||{children:{},childCount:0};n=new qu(i,n,r),t=ue(t),i=Q(t)}return n}function Rs(s){return s.node.value}function Pm(s,e){s.node.value=e,Tl(s)}function bm(s){return s.node.childCount>0}function kw(s){return Rs(s)===void 0&&!bm(s)}function Yo(s,e){He(s.node.children,(t,n)=>{e(new qu(t,s,n))})}function xm(s,e,t,n){t&&e(s),Yo(s,i=>{xm(i,e,!0)})}function Ow(s,e,t){let n=s.parent;for(;n!==null;){if(e(n))return!0;n=n.parent}return!1}function Yi(s){return new ae(s.parent===null?s.name:Yi(s.parent)+"/"+s.name)}function Tl(s){s.parent!==null&&Mw(s.parent,s.name,s)}function Mw(s,e,t){const n=kw(t),i=Ct(s.node.children,e);n&&i?(delete s.node.children[e],s.node.childCount--,Tl(s)):!n&&!i&&(s.node.children[e]=t.node,s.node.childCount++,Tl(s))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fw=/[\[\].#$\/\u0000-\u001F\u007F]/,Lw=/[\[\].#$\u0000-\u001F\u007F]/,Oa=10*1024*1024,Nm=function(s){return typeof s=="string"&&s.length!==0&&!Fw.test(s)},Vm=function(s){return typeof s=="string"&&s.length!==0&&!Lw.test(s)},Uw=function(s){return s&&(s=s.replace(/^\/*\.info(\/|$)/,"/")),Vm(s)},Dm=function(s,e,t){const n=t instanceof ae?new tv(t,s):t;if(e===void 0)throw new Error(s+"contains undefined "+ln(n));if(typeof e=="function")throw new Error(s+"contains a function "+ln(n)+" with contents = "+e.toString());if(D_(e))throw new Error(s+"contains "+e.toString()+" "+ln(n));if(typeof e=="string"&&e.length>Oa/3&&Ro(e)>Oa)throw new Error(s+"contains a string greater than "+Oa+" utf8 bytes "+ln(n)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let i=!1,r=!1;if(He(e,(o,l)=>{if(o===".value")i=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!Nm(o)))throw new Error(s+" contains an invalid key ("+o+") "+ln(n)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);nv(n,o),Dm(s,l,n),sv(n)}),i&&r)throw new Error(s+' contains ".value" child '+ln(n)+" in addition to actual children.")}},km=function(s,e,t,n){if(!Vm(t))throw new Error(lf(s,e)+'was an invalid path = "'+t+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},Bw=function(s,e,t,n){t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),km(s,e,t)},qw=function(s,e){const t=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!Nm(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||t.length!==0&&!Uw(t))throw new Error(lf(s,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jw{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function Om(s,e){let t=null;for(let n=0;n<e.length;n++){const i=e[n],r=i.getPath();t!==null&&!wu(r,t.path)&&(s.eventLists_.push(t),t=null),t===null&&(t={events:[],path:r}),t.events.push(i)}t&&s.eventLists_.push(t)}function Mm(s,e,t){Om(s,t),Fm(s,n=>wu(n,e))}function Dn(s,e,t){Om(s,t),Fm(s,n=>ot(n,e)||ot(e,n))}function Fm(s,e){s.recursionDepth_++;let t=!0;for(let n=0;n<s.eventLists_.length;n++){const i=s.eventLists_[n];if(i){const r=i.path;e(r)?(zw(s.eventLists_[n]),s.eventLists_[n]=null):t=!1}}t&&(s.eventLists_=[]),s.recursionDepth_--}function zw(s){for(let e=0;e<s.events.length;e++){const t=s.events[e];if(t!==null){s.events[e]=null;const n=t.getEventRunner();fi&&Fe("event: "+t.toString()),$i(n)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gw="repo_interrupt",Kw=25;class Ww{constructor(e,t,n,i){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=n,this.appCheckProvider_=i,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new jw,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=_o(),this.transactionQueueTree_=new qu,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function $w(s,e,t){if(s.stats_=Tu(s.repoInfo_),s.forceRestClient_||CT())s.server_=new po(s.repoInfo_,(n,i,r,o)=>{Qd(s,n,i,r,o)},s.authTokenProvider_,s.appCheckProvider_),setTimeout(()=>Hd(s,!0),0);else{if(typeof t<"u"&&t!==null){if(typeof t!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{Se(t)}catch(n){throw new Error("Invalid authOverride provided: "+n)}}s.persistentConnection_=new At(s.repoInfo_,e,(n,i,r,o)=>{Qd(s,n,i,r,o)},n=>{Hd(s,n)},n=>{Hw(s,n)},s.authTokenProvider_,s.appCheckProvider_,t),s.server_=s.persistentConnection_}s.authTokenProvider_.addTokenChangeListener(n=>{s.server_.refreshAuthToken(n)}),s.appCheckProvider_.addTokenChangeListener(n=>{s.server_.refreshAppCheckToken(n.token)}),s.statsReporter_=NT(s.repoInfo_,()=>new bv(s.stats_,s.server_)),s.infoData_=new Av,s.infoSyncTree_=new Kd({startListening:(n,i,r,o)=>{let l=[];const u=s.infoData_.getNode(n._path);return u.isEmpty()||(l=Qo(s.infoSyncTree_,n._path,u),setTimeout(()=>{o("ok")},0)),l},stopListening:()=>{}}),zu(s,"connected",!1),s.serverSyncTree_=new Kd({startListening:(n,i,r,o)=>(s.server_.listen(n,r,i,(l,u)=>{const h=o(l,u);Dn(s.eventQueue_,n._path,h)}),[]),stopListening:(n,i)=>{s.server_.unlisten(n,i)}})}function Qw(s){const t=s.infoData_.getNode(new ae(".info/serverTimeOffset")).val()||0;return new Date().getTime()+t}function Lm(s){return bw({timestamp:Qw(s)})}function Qd(s,e,t,n,i){s.dataUpdateCount++;const r=new ae(e);t=s.interceptServerDataCallback_?s.interceptServerDataCallback_(e,t):t;let o=[];if(i)if(n){const u=qr(t,h=>Le(h));o=Aw(s.serverSyncTree_,r,u,i)}else{const u=Le(t);o=ww(s.serverSyncTree_,r,u,i)}else if(n){const u=qr(t,h=>Le(h));o=Iw(s.serverSyncTree_,r,u)}else{const u=Le(t);o=Qo(s.serverSyncTree_,r,u)}let l=r;o.length>0&&(l=Ku(s,r)),Dn(s.eventQueue_,l,o)}function Hd(s,e){zu(s,"connected",e),e===!1&&Xw(s)}function Hw(s,e){He(e,(t,n)=>{zu(s,t,n)})}function zu(s,e,t){const n=new ae("/.info/"+e),i=Le(t);s.infoData_.updateSnapshot(n,i);const r=Qo(s.infoSyncTree_,n,i);Dn(s.eventQueue_,n,r)}function Yw(s){return s.nextWriteId_++}function Xw(s){Um(s,"onDisconnectEvents");const e=Lm(s),t=_o();pl(s.onDisconnect_,te(),(i,r)=>{const o=Vw(i,r,s.serverSyncTree_,e);cm(t,i,o)});let n=[];pl(t,te(),(i,r)=>{n=n.concat(Qo(s.serverSyncTree_,i,r));const o=sA(s,i);Ku(s,o)}),s.onDisconnect_=_o(),Dn(s.eventQueue_,te(),n)}function Jw(s,e,t){let n;Q(e._path)===".info"?n=Wd(s.infoSyncTree_,e,t):n=Wd(s.serverSyncTree_,e,t),Mm(s.eventQueue_,e._path,n)}function Zw(s,e,t){let n;Q(e._path)===".info"?n=Il(s.infoSyncTree_,e,t):n=Il(s.serverSyncTree_,e,t),Mm(s.eventQueue_,e._path,n)}function eA(s){s.persistentConnection_&&s.persistentConnection_.interrupt(Gw)}function Um(s,...e){let t="";s.persistentConnection_&&(t=s.persistentConnection_.id+":"),Fe(t,...e)}function Bm(s,e,t){return Am(s.serverSyncTree_,e,t)||G.EMPTY_NODE}function Gu(s,e=s.transactionQueueTree_){if(e||Xo(s,e),Rs(e)){const t=jm(s,e);D(t.length>0,"Sending zero length transaction queue"),t.every(i=>i.status===0)&&tA(s,Yi(e),t)}else bm(e)&&Yo(e,t=>{Gu(s,t)})}function tA(s,e,t){const n=t.map(h=>h.currentWriteId),i=Bm(s,e,n);let r=i;const o=i.hash();for(let h=0;h<t.length;h++){const f=t[h];D(f.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),f.status=1,f.retryCount++;const p=$e(e,f.path);r=r.updateChild(p,f.currentOutputSnapshotRaw)}const l=r.val(!0),u=e;s.server_.put(u.toString(),l,h=>{Um(s,"transaction put response",{path:u.toString(),status:h});let f=[];if(h==="ok"){const p=[];for(let m=0;m<t.length;m++)t[m].status=2,f=f.concat(Yn(s.serverSyncTree_,t[m].currentWriteId)),t[m].onComplete&&p.push(()=>t[m].onComplete(null,!0,t[m].currentOutputSnapshotResolved)),t[m].unwatcher();Xo(s,ju(s.transactionQueueTree_,e)),Gu(s,s.transactionQueueTree_),Dn(s.eventQueue_,e,f);for(let m=0;m<p.length;m++)$i(p[m])}else{if(h==="datastale")for(let p=0;p<t.length;p++)t[p].status===3?t[p].status=4:t[p].status=0;else{Ze("transaction at "+u.toString()+" failed: "+h);for(let p=0;p<t.length;p++)t[p].status=4,t[p].abortReason=h}Ku(s,e)}},o)}function Ku(s,e){const t=qm(s,e),n=Yi(t),i=jm(s,t);return nA(s,i,n),n}function nA(s,e,t){if(e.length===0)return;const n=[];let i=[];const o=e.filter(l=>l.status===0).map(l=>l.currentWriteId);for(let l=0;l<e.length;l++){const u=e[l],h=$e(t,u.path);let f=!1,p;if(D(h!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),u.status===4)f=!0,p=u.abortReason,i=i.concat(Yn(s.serverSyncTree_,u.currentWriteId,!0));else if(u.status===0)if(u.retryCount>=Kw)f=!0,p="maxretry",i=i.concat(Yn(s.serverSyncTree_,u.currentWriteId,!0));else{const m=Bm(s,u.path,o);u.currentInputSnapshot=m;const v=e[l].update(m.val());if(v!==void 0){Dm("transaction failed: Data returned ",v,u.path);let S=Le(v);typeof v=="object"&&v!=null&&Ct(v,".priority")||(S=S.updatePriority(m.getPriority()));const V=u.currentWriteId,K=Lm(s),j=Dw(S,m,K);u.currentOutputSnapshotRaw=S,u.currentOutputSnapshotResolved=j,u.currentWriteId=Yw(s),o.splice(o.indexOf(V),1),i=i.concat(Ew(s.serverSyncTree_,u.path,j,u.currentWriteId,u.applyLocally)),i=i.concat(Yn(s.serverSyncTree_,V,!0))}else f=!0,p="nodata",i=i.concat(Yn(s.serverSyncTree_,u.currentWriteId,!0))}Dn(s.eventQueue_,t,i),i=[],f&&(e[l].status=2,function(m){setTimeout(m,Math.floor(0))}(e[l].unwatcher),e[l].onComplete&&(p==="nodata"?n.push(()=>e[l].onComplete(null,!1,e[l].currentInputSnapshot)):n.push(()=>e[l].onComplete(new Error(p),!1,null))))}Xo(s,s.transactionQueueTree_);for(let l=0;l<n.length;l++)$i(n[l]);Gu(s,s.transactionQueueTree_)}function qm(s,e){let t,n=s.transactionQueueTree_;for(t=Q(e);t!==null&&Rs(n)===void 0;)n=ju(n,t),e=ue(e),t=Q(e);return n}function jm(s,e){const t=[];return zm(s,e,t),t.sort((n,i)=>n.order-i.order),t}function zm(s,e,t){const n=Rs(e);if(n)for(let i=0;i<n.length;i++)t.push(n[i]);Yo(e,i=>{zm(s,i,t)})}function Xo(s,e){const t=Rs(e);if(t){let n=0;for(let i=0;i<t.length;i++)t[i].status!==2&&(t[n]=t[i],n++);t.length=n,Pm(e,t.length>0?t:void 0)}Yo(e,n=>{Xo(s,n)})}function sA(s,e){const t=Yi(qm(s,e)),n=ju(s.transactionQueueTree_,e);return Ow(n,i=>{Ma(s,i)}),Ma(s,n),xm(n,i=>{Ma(s,i)}),t}function Ma(s,e){const t=Rs(e);if(t){const n=[];let i=[],r=-1;for(let o=0;o<t.length;o++)t[o].status===3||(t[o].status===1?(D(r===o-1,"All SENT items should be at beginning of queue."),r=o,t[o].status=3,t[o].abortReason="set"):(D(t[o].status===0,"Unexpected transaction status in abort"),t[o].unwatcher(),i=i.concat(Yn(s.serverSyncTree_,t[o].currentWriteId,!0)),t[o].onComplete&&n.push(t[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?Pm(e,void 0):t.length=r+1,Dn(s.eventQueue_,Yi(e),i);for(let o=0;o<n.length;o++)$i(n[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function iA(s){let e="";const t=s.split("/");for(let n=0;n<t.length;n++)if(t[n].length>0){let i=t[n];try{i=decodeURIComponent(i.replace(/\+/g," "))}catch{}e+="/"+i}return e}function rA(s){const e={};s.charAt(0)==="?"&&(s=s.substring(1));for(const t of s.split("&")){if(t.length===0)continue;const n=t.split("=");n.length===2?e[decodeURIComponent(n[0])]=decodeURIComponent(n[1]):Ze(`Invalid query segment '${t}' in query '${s}'`)}return e}const Yd=function(s,e){const t=oA(s),n=t.namespace;t.domain==="firebase.com"&&Rt(t.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!n||n==="undefined")&&t.domain!=="localhost"&&Rt("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),t.secure||gT();const i=t.scheme==="ws"||t.scheme==="wss";return{repoInfo:new K_(t.host,t.secure,n,i,e,"",n!==t.subdomain),path:new ae(t.pathString)}},oA=function(s){let e="",t="",n="",i="",r="",o=!0,l="https",u=443;if(typeof s=="string"){let h=s.indexOf("//");h>=0&&(l=s.substring(0,h-1),s=s.substring(h+2));let f=s.indexOf("/");f===-1&&(f=s.length);let p=s.indexOf("?");p===-1&&(p=s.length),e=s.substring(0,Math.min(f,p)),f<p&&(i=iA(s.substring(f,p)));const m=rA(s.substring(Math.min(s.length,p)));h=e.indexOf(":"),h>=0?(o=l==="https"||l==="wss",u=parseInt(e.substring(h+1),10)):h=e.length;const v=e.slice(0,h);if(v.toLowerCase()==="localhost")t="localhost";else if(v.split(".").length<=2)t=v;else{const S=e.indexOf(".");n=e.substring(0,S).toLowerCase(),t=e.substring(S+1),r=n}"ns"in m&&(r=m.ns)}return{host:e,port:u,domain:t,subdomain:n,secure:o,scheme:l,pathString:i,namespace:r}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aA{constructor(e,t,n,i){this.eventType=e,this.eventRegistration=t,this.snapshot=n,this.prevName=i}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+Se(this.snapshot.exportVal())}}class lA{constructor(e,t,n){this.eventRegistration=e,this.error=t,this.path=n}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class uA{constructor(e,t){this.snapshotCallback=e,this.cancelCallback=t}onValue(e,t){this.snapshotCallback.call(null,e,t)}onCancel(e){return D(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
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
 */class Wu{constructor(e,t,n,i){this._repo=e,this._path=t,this._queryParams=n,this._orderByCalled=i}get key(){return H(this._path)?null:em(this._path)}get ref(){return new Zt(this._repo,this._path)}get _queryIdentifier(){const e=kd(this._queryParams),t=Eu(e);return t==="{}"?"default":t}get _queryObject(){return kd(this._queryParams)}isEqual(e){if(e=ut(e),!(e instanceof Wu))return!1;const t=this._repo===e._repo,n=wu(this._path,e._path),i=this._queryIdentifier===e._queryIdentifier;return t&&n&&i}toJSON(){return this.toString()}toString(){return this._repo.toString()+ev(this._path)}}class Zt extends Wu{constructor(e,t){super(e,t,new Su,!1)}get parent(){const e=nm(this._path);return e===null?null:new Zt(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class wo{constructor(e,t,n){this._node=e,this.ref=t,this._index=n}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const t=new ae(e),n=vl(this.ref,e);return new wo(this._node.getChild(t),n,me)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(n,i)=>e(new wo(i,vl(this.ref,n),me)))}hasChild(e){const t=new ae(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function bA(s,e){return s=ut(s),s._checkNotDeleted("ref"),e!==void 0?vl(s._root,e):s._root}function vl(s,e){return s=ut(s),Q(s._path)===null?Bw("child","path",e):km("child","path",e),new Zt(s._repo,ve(s._path,e))}class $u{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,t){const n=t._queryParams.getIndex();return new aA("value",this,new wo(e.snapshotNode,new Zt(t._repo,t._path),n))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new lA(this,e,t):null}matches(e){return e instanceof $u?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}function cA(s,e,t,n,i){const r=new uA(t,void 0),o=new $u(r);return Jw(s._repo,s,o),()=>Zw(s._repo,s,o)}function xA(s,e,t,n){return cA(s,"value",e)}cw(Zt);mw(Zt);/**
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
 */const hA="FIREBASE_DATABASE_EMULATOR_HOST",wl={};let dA=!1;function fA(s,e,t,n){const i=e.lastIndexOf(":"),r=e.substring(0,i),o=Ao(r);s.repoInfo_=new K_(e,o,s.repoInfo_.namespace,s.repoInfo_.webSocketOnly,s.repoInfo_.nodeAdmin,s.repoInfo_.persistenceKey,s.repoInfo_.includeNamespaceInQueryParams,!0,t),n&&(s.authTokenProvider_=n)}function pA(s,e,t,n,i){let r=n||s.options.databaseURL;r===void 0&&(s.options.projectId||Rt("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),Fe("Using default host for project ",s.options.projectId),r=`${s.options.projectId}-default-rtdb.firebaseio.com`);let o=Yd(r,i),l=o.repoInfo,u;typeof process<"u"&&md&&(u=md[hA]),u?(r=`http://${u}?ns=${l.namespace}`,o=Yd(r,i),l=o.repoInfo):o.repoInfo.secure;const h=new PT(s.name,s.options,e);qw("Invalid Firebase Database URL",o),H(o.path)||Rt("Database URL must point to the root of a Firebase Database (not including a child path).");const f=mA(l,s,h,new ST(s,t));return new gA(f,s)}function _A(s,e){const t=wl[e];(!t||t[s.key]!==s)&&Rt(`Database ${e}(${s.repoInfo_}) has already been deleted.`),eA(s),delete t[s.key]}function mA(s,e,t,n){let i=wl[e.name];i||(i={},wl[e.name]=i);let r=i[s.toURLString()];return r&&Rt("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new Ww(s,dA,t,n),i[s.toURLString()]=r,r}class gA{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||($w(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new Zt(this._repo,te())),this._rootInternal}_delete(){return this._rootInternal!==null&&(_A(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&Rt("Cannot call "+e+" on a deleted database.")}}function NA(s=Ug(),e){const t=tf(s,"database").getImmediate({identifier:e});if(!t._instanceStarted){const n=Lg("database");n&&yA(t,...n)}return t}function yA(s,e,t,n={}){s=ut(s),s._checkNotDeleted("useEmulator");const i=`${e}:${t}`,r=s._repoInternal;if(s._instanceStarted){if(i===s._repoInternal.repoInfo_.host&&nf(n,r.repoInfo_.emulatorOptions))return;Rt("connectDatabaseEmulator() cannot initialize or alter the emulator configuration after the database instance has started.")}let o;if(r.repoInfo_.nodeAdmin)n.mockUserToken&&Rt('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),o=new Lr(Lr.OWNER);else if(n.mockUserToken){const l=typeof n.mockUserToken=="string"?n.mockUserToken:Bg(n.mockUserToken,s.app.options.projectId);o=new Lr(l)}Ao(e)&&(sf(e),qg("Database",!0)),fA(r,i,n,o)}/**
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
 */function EA(s){hT(af),Jd(new Zd("database",(e,{instanceIdentifier:t})=>{const n=e.getProvider("app").getImmediate(),i=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return pA(n,i,r,t)},"PUBLIC").setMultipleInstances(!0)),Ur(gd,yd,s),Ur(gd,yd,"esm2017")}At.prototype.simpleListen=function(s,e){this.sendRequest("q",{p:s},e)};At.prototype.echo=function(s,e){this.sendRequest("echo",{d:s},e)};EA();export{PA as a,wA as d,NA as g,AA as i,xA as o,SA as p,bA as r,RA as s,CA as u};
