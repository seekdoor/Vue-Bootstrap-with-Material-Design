(function(e,t){"object"===typeof exports&&"object"===typeof module?module.exports=t():"function"===typeof define&&define.amd?define([],t):"object"===typeof exports?exports["mdbCardImage"]=t():e["mdbCardImage"]=t()})("undefined"!==typeof self?self:this,(function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s="fb15")}({3670:function(e,t,n){},"7efe":function(e,t,n){},8875:function(e,t,n){var r,i,o;(function(n,s){i=[],r=s,o="function"===typeof r?r.apply(t,i):r,void 0===o||(e.exports=o)})("undefined"!==typeof self&&self,(function(){function e(){if(document.currentScript)return document.currentScript;try{throw new Error}catch(l){var e,t,n,r=/.*at [^(]*\((.*):(.+):(.+)\)$/gi,i=/@([^@]*):(\d+):(\d+)\s*$/gi,o=r.exec(l.stack)||i.exec(l.stack),s=o&&o[1]||!1,a=o&&o[2]||!1,f=document.location.href.replace(document.location.hash,""),p=document.getElementsByTagName("script");s===f&&(e=document.documentElement.outerHTML,t=new RegExp("(?:[^\\n]+?\\n){0,"+(a-2)+"}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*","i"),n=e.replace(t,"$1").trim());for(var c=0;c<p.length;c++){if("interactive"===p[c].readyState)return p[c];if(p[c].src===s)return p[c];if(s===f&&p[c].innerHTML&&p[c].innerHTML.trim()===n)return p[c]}return null}}return e}))},9086:function(e,t,n){"use strict";var r=n("3670"),i=n.n(r);i.a},fb15:function(e,t,n){"use strict";if(n.r(t),n.d(t,"mdbCardImage",(function(){return p})),"undefined"!==typeof window){var r=window.document.currentScript,i=n("8875");r=i(),"currentScript"in document||Object.defineProperty(document,"currentScript",{get:i});var o=r&&r.src.match(/(.+\/)[^/]+\.js(\?.*)?$/);o&&(n.p=o[1])}var s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{class:{"ripple-parent":e.waves},on:{click:e.wave}},[n("img",{class:e.className,attrs:{src:e.src,alt:e.alt}})])},a=[],f=(n("7efe"),{props:{waves:{type:Boolean,default:!0},darkWaves:{type:Boolean,default:!1}},methods:{wave:function(e){this.waves&&(this.target=e.target.classList.contains("ripple-parent")?e.currentTarget:e.target.parentElement,this.getOffsets(e),this.waveData={top:e.pageY-this.offsetTop,left:e.pageX-this.offsetLeft,height:this.$el.offsetHeight,width:this.$el.offsetWidth},(this.wavesFixed||this.isNavFixed)&&(this.waveData.top=e.clientY-this.offsetTop),this.createRipple(),this.rippleAnimate(),this.rippleRemove(this.target,this.rippleElement))},getOffsets:function(){if(this.target.offsetParent){this.offsetLeft=this.target.offsetLeft,this.offsetTop=this.target.offsetTop,this.parentOffset=this.target.offsetParent;while(this.parentOffset)this.offsetLeft+=this.parentOffset.offsetLeft,this.offsetTop+=this.parentOffset.offsetTop,this.parentOffset=this.parentOffset.offsetParent}},createRipple:function(){this.rippleElement=document.createElement("div"),this.rippleElement.classList.add("ripple"),this.rippleElement.style.top=this.waveData.top-this.waveData.width/2+"px",this.rippleElement.style.left=this.waveData.left-this.waveData.width/2+"px",this.rippleElement.style.height=this.waveData.width+"px",this.rippleElement.style.width=this.waveData.width+"px",this.darkWaves&&(this.rippleElement.style.background="rgba(0, 0, 0, 0.2)"),this.target.appendChild(this.rippleElement)},rippleAnimate:function(){this.rippleElement.classList.add("is-reppling")},rippleRemove:function(e,t){this.remove=setTimeout((function(){e.removeChild(t)}),600)}}}),p={props:{src:{type:String,required:!0},alt:{type:String},waves:{type:Boolean,default:!1},top:{type:Boolean}},computed:{className:function(){return["img-fluid",this.top&&"card-img-top"]}},mixins:[f]},c=p,l=c;n("9086");function u(e,t,n,r,i,o,s,a){var f,p="function"===typeof e?e.options:e;if(t&&(p.render=t,p.staticRenderFns=n,p._compiled=!0),r&&(p.functional=!0),o&&(p._scopeId="data-v-"+o),s?(f=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"===typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),i&&i.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(s)},p._ssrRegister=f):i&&(f=a?function(){i.call(this,this.$root.$options.shadowRoot)}:i),f)if(p.functional){p._injectStyles=f;var c=p.render;p.render=function(e,t){return f.call(t),c(e,t)}}else{var l=p.beforeCreate;p.beforeCreate=l?[].concat(l,f):[f]}return{exports:e,options:p}}var d=u(l,s,a,!1,null,"41159e2c",null),h=d.exports;t["default"]=h}})["default"]}));
//# sourceMappingURL=index.umd.min.js.map