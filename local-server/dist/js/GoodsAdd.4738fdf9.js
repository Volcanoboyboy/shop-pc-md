(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["GoodsAdd"],{"057f":function(e,t,r){var n=r("fc6a"),a=r("241c").f,o={}.toString,i="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],s=function(e){try{return a(e)}catch(t){return i.slice()}};e.exports.f=function(e){return i&&"[object Window]"==o.call(e)?s(e):a(n(e))}},1276:function(e,t,r){"use strict";var n=r("d784"),a=r("44e7"),o=r("825a"),i=r("1d80"),s=r("4840"),c=r("8aa5"),u=r("50c4"),l=r("14c3"),d=r("9263"),f=r("d039"),p=[].push,g=Math.min,m=4294967295,v=!f((function(){return!RegExp(m,"y")}));n("split",2,(function(e,t,r){var n;return n="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(e,r){var n=String(i(this)),o=void 0===r?m:r>>>0;if(0===o)return[];if(void 0===e)return[n];if(!a(e))return t.call(n,e,o);var s,c,u,l=[],f=(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.unicode?"u":"")+(e.sticky?"y":""),g=0,v=new RegExp(e.source,f+"g");while(s=d.call(v,n)){if(c=v.lastIndex,c>g&&(l.push(n.slice(g,s.index)),s.length>1&&s.index<n.length&&p.apply(l,s.slice(1)),u=s[0].length,g=c,l.length>=o))break;v.lastIndex===s.index&&v.lastIndex++}return g===n.length?!u&&v.test("")||l.push(""):l.push(n.slice(g)),l.length>o?l.slice(0,o):l}:"0".split(void 0,0).length?function(e,r){return void 0===e&&0===r?[]:t.call(this,e,r)}:t,[function(t,r){var a=i(this),o=void 0==t?void 0:t[e];return void 0!==o?o.call(t,a,r):n.call(String(a),t,r)},function(e,a){var i=r(n,e,this,a,n!==t);if(i.done)return i.value;var d=o(e),f=String(this),p=s(d,RegExp),b=d.unicode,x=(d.ignoreCase?"i":"")+(d.multiline?"m":"")+(d.unicode?"u":"")+(v?"y":"g"),h=new p(v?d:"^(?:"+d.source+")",x),_=void 0===a?m:a>>>0;if(0===_)return[];if(0===f.length)return null===l(h,f)?[f]:[];var y=0,w=0,I=[];while(w<f.length){h.lastIndex=v?w:0;var S,j=l(h,v?f:f.slice(w));if(null===j||(S=g(u(h.lastIndex+(v?0:w)),f.length))===y)w=c(f,w,b);else{if(I.push(f.slice(y,w)),I.length===_)return I;for(var k=1;k<=j.length-1;k++)if(I.push(j[k]),I.length===_)return I;w=y=S}}return I.push(f.slice(y)),I}]}),!v)},"14c3":function(e,t,r){var n=r("c6b6"),a=r("9263");e.exports=function(e,t){var r=e.exec;if("function"===typeof r){var o=r.call(e,t);if("object"!==typeof o)throw TypeError("RegExp exec method returned something other than an Object or null");return o}if("RegExp"!==n(e))throw TypeError("RegExp#exec called on incompatible receiver");return a.call(e,t)}},"25f0":function(e,t,r){"use strict";var n=r("6eeb"),a=r("825a"),o=r("d039"),i=r("ad6d"),s="toString",c=RegExp.prototype,u=c[s],l=o((function(){return"/a/b"!=u.call({source:"a",flags:"b"})})),d=u.name!=s;(l||d)&&n(RegExp.prototype,s,(function(){var e=a(this),t=String(e.source),r=e.flags,n=String(void 0===r&&e instanceof RegExp&&!("flags"in c)?i.call(e):r);return"/"+t+"/"+n}),{unsafe:!0})},"3ca3":function(e,t,r){"use strict";var n=r("6547").charAt,a=r("69f3"),o=r("7dd0"),i="String Iterator",s=a.set,c=a.getterFor(i);o(String,"String",(function(e){s(this,{type:i,string:String(e),index:0})}),(function(){var e,t=c(this),r=t.string,a=t.index;return a>=r.length?{value:void 0,done:!0}:(e=n(r,a),t.index+=e.length,{value:e,done:!1})}))},"44e7":function(e,t,r){var n=r("861d"),a=r("c6b6"),o=r("b622"),i=o("match");e.exports=function(e){var t;return n(e)&&(void 0!==(t=e[i])?!!t:"RegExp"==a(e))}},"4df4":function(e,t,r){"use strict";var n=r("0366"),a=r("7b0b"),o=r("9bdd"),i=r("e95a"),s=r("50c4"),c=r("8418"),u=r("35a1");e.exports=function(e){var t,r,l,d,f,p,g=a(e),m="function"==typeof this?this:Array,v=arguments.length,b=v>1?arguments[1]:void 0,x=void 0!==b,h=u(g),_=0;if(x&&(b=n(b,v>2?arguments[2]:void 0,2)),void 0==h||m==Array&&i(h))for(t=s(g.length),r=new m(t);t>_;_++)p=x?b(g[_],_):g[_],c(r,_,p);else for(d=h.call(g),f=d.next,r=new m;!(l=f.call(d)).done;_++)p=x?o(d,b,[l.value,_],!0):l.value,c(r,_,p);return r.length=_,r}},6547:function(e,t,r){var n=r("a691"),a=r("1d80"),o=function(e){return function(t,r){var o,i,s=String(a(t)),c=n(r),u=s.length;return c<0||c>=u?e?"":void 0:(o=s.charCodeAt(c),o<55296||o>56319||c+1===u||(i=s.charCodeAt(c+1))<56320||i>57343?e?s.charAt(c):o:e?s.slice(c,c+2):i-56320+(o-55296<<10)+65536)}};e.exports={codeAt:o(!1),charAt:o(!0)}},"746f":function(e,t,r){var n=r("428f"),a=r("5135"),o=r("e538"),i=r("9bf2").f;e.exports=function(e){var t=n.Symbol||(n.Symbol={});a(t,e)||i(t,e,{value:o.f(e)})}},"8aa5":function(e,t,r){"use strict";var n=r("6547").charAt;e.exports=function(e,t,r){return t+(r?n(e,t).length:1)}},9263:function(e,t,r){"use strict";var n=r("ad6d"),a=r("9f7f"),o=RegExp.prototype.exec,i=String.prototype.replace,s=o,c=function(){var e=/a/,t=/b*/g;return o.call(e,"a"),o.call(t,"a"),0!==e.lastIndex||0!==t.lastIndex}(),u=a.UNSUPPORTED_Y||a.BROKEN_CARET,l=void 0!==/()??/.exec("")[1],d=c||l||u;d&&(s=function(e){var t,r,a,s,d=this,f=u&&d.sticky,p=n.call(d),g=d.source,m=0,v=e;return f&&(p=p.replace("y",""),-1===p.indexOf("g")&&(p+="g"),v=String(e).slice(d.lastIndex),d.lastIndex>0&&(!d.multiline||d.multiline&&"\n"!==e[d.lastIndex-1])&&(g="(?: "+g+")",v=" "+v,m++),r=new RegExp("^(?:"+g+")",p)),l&&(r=new RegExp("^"+g+"$(?!\\s)",p)),c&&(t=d.lastIndex),a=o.call(f?r:d,v),f?a?(a.input=a.input.slice(m),a[0]=a[0].slice(m),a.index=d.lastIndex,d.lastIndex+=a[0].length):d.lastIndex=0:c&&a&&(d.lastIndex=d.global?a.index+a[0].length:t),l&&a&&a.length>1&&i.call(a[0],r,(function(){for(s=1;s<arguments.length-2;s++)void 0===arguments[s]&&(a[s]=void 0)})),a}),e.exports=s},"9f7f":function(e,t,r){"use strict";var n=r("d039");function a(e,t){return RegExp(e,t)}t.UNSUPPORTED_Y=n((function(){var e=a("a","y");return e.lastIndex=2,null!=e.exec("abcd")})),t.BROKEN_CARET=n((function(){var e=a("^r","gy");return e.lastIndex=2,null!=e.exec("str")}))},a4d3:function(e,t,r){"use strict";var n=r("23e7"),a=r("da84"),o=r("d066"),i=r("c430"),s=r("83ab"),c=r("4930"),u=r("fdbf"),l=r("d039"),d=r("5135"),f=r("e8b5"),p=r("861d"),g=r("825a"),m=r("7b0b"),v=r("fc6a"),b=r("c04e"),x=r("5c6c"),h=r("7c73"),_=r("df75"),y=r("241c"),w=r("057f"),I=r("7418"),S=r("06cf"),j=r("9bf2"),k=r("d1e7"),E=r("9112"),R=r("6eeb"),O=r("5692"),A=r("f772"),$=r("d012"),C=r("90e3"),N=r("b622"),P=r("e538"),U=r("746f"),T=r("d44e"),D=r("69f3"),L=r("b727").forEach,q=A("hidden"),F="Symbol",M="prototype",J=N("toPrimitive"),B=D.set,G=D.getterFor(F),K=Object[M],z=a.Symbol,H=o("JSON","stringify"),Y=S.f,Q=j.f,W=w.f,X=k.f,V=O("symbols"),Z=O("op-symbols"),ee=O("string-to-symbol-registry"),te=O("symbol-to-string-registry"),re=O("wks"),ne=a.QObject,ae=!ne||!ne[M]||!ne[M].findChild,oe=s&&l((function(){return 7!=h(Q({},"a",{get:function(){return Q(this,"a",{value:7}).a}})).a}))?function(e,t,r){var n=Y(K,t);n&&delete K[t],Q(e,t,r),n&&e!==K&&Q(K,t,n)}:Q,ie=function(e,t){var r=V[e]=h(z[M]);return B(r,{type:F,tag:e,description:t}),s||(r.description=t),r},se=u?function(e){return"symbol"==typeof e}:function(e){return Object(e)instanceof z},ce=function(e,t,r){e===K&&ce(Z,t,r),g(e);var n=b(t,!0);return g(r),d(V,n)?(r.enumerable?(d(e,q)&&e[q][n]&&(e[q][n]=!1),r=h(r,{enumerable:x(0,!1)})):(d(e,q)||Q(e,q,x(1,{})),e[q][n]=!0),oe(e,n,r)):Q(e,n,r)},ue=function(e,t){g(e);var r=v(t),n=_(r).concat(ge(r));return L(n,(function(t){s&&!de.call(r,t)||ce(e,t,r[t])})),e},le=function(e,t){return void 0===t?h(e):ue(h(e),t)},de=function(e){var t=b(e,!0),r=X.call(this,t);return!(this===K&&d(V,t)&&!d(Z,t))&&(!(r||!d(this,t)||!d(V,t)||d(this,q)&&this[q][t])||r)},fe=function(e,t){var r=v(e),n=b(t,!0);if(r!==K||!d(V,n)||d(Z,n)){var a=Y(r,n);return!a||!d(V,n)||d(r,q)&&r[q][n]||(a.enumerable=!0),a}},pe=function(e){var t=W(v(e)),r=[];return L(t,(function(e){d(V,e)||d($,e)||r.push(e)})),r},ge=function(e){var t=e===K,r=W(t?Z:v(e)),n=[];return L(r,(function(e){!d(V,e)||t&&!d(K,e)||n.push(V[e])})),n};if(c||(z=function(){if(this instanceof z)throw TypeError("Symbol is not a constructor");var e=arguments.length&&void 0!==arguments[0]?String(arguments[0]):void 0,t=C(e),r=function(e){this===K&&r.call(Z,e),d(this,q)&&d(this[q],t)&&(this[q][t]=!1),oe(this,t,x(1,e))};return s&&ae&&oe(K,t,{configurable:!0,set:r}),ie(t,e)},R(z[M],"toString",(function(){return G(this).tag})),R(z,"withoutSetter",(function(e){return ie(C(e),e)})),k.f=de,j.f=ce,S.f=fe,y.f=w.f=pe,I.f=ge,P.f=function(e){return ie(N(e),e)},s&&(Q(z[M],"description",{configurable:!0,get:function(){return G(this).description}}),i||R(K,"propertyIsEnumerable",de,{unsafe:!0}))),n({global:!0,wrap:!0,forced:!c,sham:!c},{Symbol:z}),L(_(re),(function(e){U(e)})),n({target:F,stat:!0,forced:!c},{for:function(e){var t=String(e);if(d(ee,t))return ee[t];var r=z(t);return ee[t]=r,te[r]=t,r},keyFor:function(e){if(!se(e))throw TypeError(e+" is not a symbol");if(d(te,e))return te[e]},useSetter:function(){ae=!0},useSimple:function(){ae=!1}}),n({target:"Object",stat:!0,forced:!c,sham:!s},{create:le,defineProperty:ce,defineProperties:ue,getOwnPropertyDescriptor:fe}),n({target:"Object",stat:!0,forced:!c},{getOwnPropertyNames:pe,getOwnPropertySymbols:ge}),n({target:"Object",stat:!0,forced:l((function(){I.f(1)}))},{getOwnPropertySymbols:function(e){return I.f(m(e))}}),H){var me=!c||l((function(){var e=z();return"[null]"!=H([e])||"{}"!=H({a:e})||"{}"!=H(Object(e))}));n({target:"JSON",stat:!0,forced:me},{stringify:function(e,t,r){var n,a=[e],o=1;while(arguments.length>o)a.push(arguments[o++]);if(n=t,(p(t)||void 0!==e)&&!se(e))return f(t)||(t=function(e,t){if("function"==typeof n&&(t=n.call(this,e,t)),!se(t))return t}),a[1]=t,H.apply(null,a)}})}z[M][J]||E(z[M],J,z[M].valueOf),T(z,F),$[q]=!0},a630:function(e,t,r){var n=r("23e7"),a=r("4df4"),o=r("1c7e"),i=!o((function(e){Array.from(e)}));n({target:"Array",stat:!0,forced:i},{from:a})},ac1f:function(e,t,r){"use strict";var n=r("23e7"),a=r("9263");n({target:"RegExp",proto:!0,forced:/./.exec!==a},{exec:a})},ad6d:function(e,t,r){"use strict";var n=r("825a");e.exports=function(){var e=n(this),t="";return e.global&&(t+="g"),e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),e.dotAll&&(t+="s"),e.unicode&&(t+="u"),e.sticky&&(t+="y"),t}},c325:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"goods-add"},[r("el-breadcrumb",{attrs:{separator:"/"}},[r("el-breadcrumb-item",{attrs:{to:"/home"}},[e._v("首页")]),r("el-breadcrumb-item",{attrs:{to:"/goods"}},[e._v("商品管理")]),r("el-breadcrumb-item",{attrs:{to:"/goods"}},[e._v("商品列表")]),r("el-breadcrumb-item",[e._v("添加商品")])],1),r("el-card",{staticStyle:{"margin-top":"20px"}},[r("el-alert",{attrs:{title:"添加商品信息",type:"info","show-icon":"",closable:!1}}),r("el-row",{staticStyle:{margin:"20px 0"}},[r("el-col",[r("el-steps",{attrs:{active:e.currentIndex,"align-center":"","finish-status":"success","process-status":e.processStatus}},[r("el-step",{attrs:{title:"基本信息"}}),r("el-step",{attrs:{title:"商品参数"}}),r("el-step",{attrs:{title:"商品属性"}}),r("el-step",{attrs:{title:"商品图片"}}),r("el-step",{attrs:{title:"商品内容"}}),r("el-step",{attrs:{title:"完成"}})],1)],1)],1),r("el-row",{directives:[{name:"show",rawName:"v-show",value:0===e.currentIndex,expression:"currentIndex === 0"}]},[r("el-col",[r("el-form",{ref:"jbxxFormRef",attrs:{model:e.jbxx.form.data,rules:e.jbxx.form.rules,"label-position":"top"}},[r("el-form-item",{attrs:{label:"商品名称",prop:"goods_name"}},[r("el-input",{model:{value:e.jbxx.form.data.goods_name,callback:function(t){e.$set(e.jbxx.form.data,"goods_name",t)},expression:"jbxx.form.data.goods_name"}})],1),r("el-form-item",{attrs:{label:"商品价格",prop:"goods_price"}},[r("el-input",{attrs:{type:"number",min:"0"},model:{value:e.jbxx.form.data.goods_price,callback:function(t){e.$set(e.jbxx.form.data,"goods_price",e._n(t))},expression:"jbxx.form.data.goods_price"}})],1),r("el-form-item",{attrs:{label:"商品重量",prop:"goods_weight"}},[r("el-input",{attrs:{type:"number",min:"0"},model:{value:e.jbxx.form.data.goods_weight,callback:function(t){e.$set(e.jbxx.form.data,"goods_weight",e._n(t))},expression:"jbxx.form.data.goods_weight"}})],1),r("el-form-item",{attrs:{label:"商品数量",prop:"goods_number"}},[r("el-input",{attrs:{type:"number",min:"0"},model:{value:e.jbxx.form.data.goods_number,callback:function(t){e.$set(e.jbxx.form.data,"goods_number",e._n(t))},expression:"jbxx.form.data.goods_number"}})],1),r("el-form-item",{attrs:{label:"商品分类",prop:"goods_cat"}},[r("el-cascader",{attrs:{options:e.categories,props:{label:"cat_name",value:"cat_id"},clearable:""},on:{change:e.onChangeOfCategories},model:{value:e.jbxx.form.data.goods_cat,callback:function(t){e.$set(e.jbxx.form.data,"goods_cat",t)},expression:"jbxx.form.data.goods_cat"}})],1)],1)],1)],1),r("el-row",{directives:[{name:"show",rawName:"v-show",value:1===e.currentIndex,expression:"currentIndex === 1"}]},[r("el-col",[e._v(" 商品参数: "),r("div",[e._v(" "+e._s(e.spcs.list)+" ")]),r("el-form",{attrs:{"label-position":"top"}},e._l(e.spcs.list,(function(t){return r("el-form-item",{key:t.attr_id,attrs:{label:t.attr_name}},[r("el-checkbox-group",{model:{value:t._md_value,callback:function(r){e.$set(t,"_md_value",r)},expression:"v._md_value"}},e._l(t.attr_val_arr,(function(e){return r("el-checkbox",{key:e,attrs:{label:e,border:""}})})),1)],1)})),1)],1)],1),r("el-row",{directives:[{name:"show",rawName:"v-show",value:2===e.currentIndex,expression:"currentIndex === 2"}]},[r("el-col",[e._v(" 商品属性 "),r("div",[e._v(" "+e._s(e.spsx.list)+" ")]),r("el-form",{attrs:{"label-position":"top"}},e._l(e.spsx.list,(function(t){return r("el-form-item",{key:t.attr_id,attrs:{label:t.attr_name}},[r("el-input",{model:{value:t._md_value,callback:function(r){e.$set(t,"_md_value",r)},expression:"v._md_value"}})],1)})),1)],1)],1),r("el-row",{directives:[{name:"show",rawName:"v-show",value:3===e.currentIndex,expression:"currentIndex === 3"}]},[r("el-col",[r("el-upload",{staticClass:"upload-demo",attrs:{action:e.uploadURL,headers:e.uploadHeaders,"on-preview":e.onImgPreview,"on-remove":e.onImgRemove,"on-success":e.onImgSuccess,"list-type":"picture"},scopedSlots:e._u([{key:"default",fn:function(){return[r("el-button",{attrs:{size:"small",type:"primary"}},[e._v("点击上传")])]},proxy:!0},{key:"tip",fn:function(){return[r("div",{staticClass:"el-upload__tip"},[e._v("只能上传jpg/png文件，且不超过500kb")])]},proxy:!0}])})],1)],1),r("el-row",{directives:[{name:"show",rawName:"v-show",value:4===e.currentIndex,expression:"currentIndex === 4"}]},[r("el-col",[r("quill-editor",{model:{value:e.spnr.form.data.goods_introduce,callback:function(t){e.$set(e.spnr.form.data,"goods_introduce",t)},expression:"spnr.form.data.goods_introduce"}})],1)],1),r("el-row",{directives:[{name:"show",rawName:"v-show",value:5===e.currentIndex,expression:"currentIndex === 5"}]},[r("el-col",[e._v(" 完成 ")])],1),r("el-row",{staticStyle:{"margin-top":"20px"}},[r("el-col",{attrs:{span:12}},[r("el-button",{directives:[{name:"show",rawName:"v-show",value:0===e.currentIndex,expression:"currentIndex === 0"}],on:{click:e.back}},[e._v("返回")]),r("el-button",{directives:[{name:"show",rawName:"v-show",value:![0,5].includes(e.currentIndex),expression:"![0, 5].includes(currentIndex)"}],on:{click:e.prevStep}},[e._v("上一步")])],1),r("el-col",{staticStyle:{"text-align":"right"},attrs:{span:12}},[r("el-button",{directives:[{name:"show",rawName:"v-show",value:5!==e.currentIndex,expression:"currentIndex !== 5"}],on:{click:e.nextStep}},[e._v(" "+e._s(4===e.currentIndex?"提交":"下一步")+" ")]),r("el-button",{directives:[{name:"show",rawName:"v-show",value:5===e.currentIndex,expression:"currentIndex === 5"}],on:{click:e.back}},[e._v("完成")])],1)],1)],1),r("el-dialog",{attrs:{title:e.previewImgDialog.title,visible:e.previewImgDialog.visible},on:{"update:visible":function(t){return e.$set(e.previewImgDialog,"visible",t)}},scopedSlots:e._u([{key:"default",fn:function(){return[r("img",{attrs:{src:e.previewImgDialog.imgURL,alt:"",width:"100%"}})]},proxy:!0}])})],1)},a=[];r("99af"),r("4de4"),r("4160"),r("a15b"),r("d81d"),r("ac1f"),r("1276"),r("159b");function o(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r];return n}function i(e){if(Array.isArray(e))return o(e)}r("a4d3"),r("e01a"),r("d28b"),r("a630"),r("d3b7"),r("3ca3"),r("ddb0");function s(e){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(e))return Array.from(e)}r("fb6a"),r("b0c0"),r("25f0");function c(e,t){if(e){if("string"===typeof e)return o(e,t);var r=Object.prototype.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?o(e,t):void 0}}function u(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function l(e){return i(e)||s(e)||c(e)||u()}r("96cf");var d=r("1da1"),f={name:"GoodsAdd",data:function(){return{previewImgDialog:{title:"预览图片",visible:!1,imgURL:""},processStatus:"process",currentIndex:0,categories:[],jbxx:{form:{data:{goods_name:"",goods_price:"",goods_weight:"",goods_number:"",goods_cat:[]},rules:{goods_name:[{required:!0,message:"请输入商品名称"}],goods_price:[{required:!0,message:"请输入商品价格"}],goods_weight:[{required:!0,message:"请输入商品重量"}],goods_number:[{required:!0,message:"请输入商品数量"}],goods_cat:[{required:!0,message:"请输入商品分类"},{validator:function(e,t,r){if(!t||3!==t.length)return r(new Error("只能选择第三级分类"));r()}}]}}},spcs:{list:[],form:{data:{},rules:{}}},spsx:{list:[],form:{data:{},rules:{}}},sptp:{form:{data:{imgs:[]},rules:{}}},spnr:{form:{data:{goods_introduce:""},rules:{}}}}},computed:{catId:function(){return 3===this.jbxx.form.data.goods_cat.length?this.jbxx.form.data.goods_cat[this.jbxx.form.data.goods_cat.length-1]:null},uploadURL:function(){return"".concat(this.$request.defaults.baseURL,"upload")},uploadHeaders:function(){return{Authorization:sessionStorage.getItem("token")}}},methods:{onImgSuccess:function(e,t,r){200===e.meta.status?this.sptp.form.data.imgs.push({pic:"/"+e.data.tmp_path}):this.$message.error(e.meta.msg)},onImgRemove:function(e,t){this.sptp.form.data.imgs=this.sptp.form.data.imgs.filter((function(t){return t.pic!==e.response.data.tmp_path}))},onImgPreview:function(e){this.previewImgDialog.imgURL=e.url,this.previewImgDialog.visible=!0},loadManyOrOnlyList:function(e){var t=this;return Object(d["a"])(regeneratorRuntime.mark((function r(){var n;return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,t.$request.get("categories/".concat(t.catId,"/attributes"),{params:{sel:e}});case 2:if(n=r.sent,200!==n.data.meta.status){r.next=7;break}"many"===e?(n.data.data.forEach((function(e){e._md_value=[],e.attr_val_arr=""===e.attr_vals?[]:e.attr_vals.split(" ")})),t.spcs.list=n.data.data):"only"===e&&(n.data.data.forEach((function(e){e._md_value=e.attr_vals})),t.spsx.list=n.data.data),r.next=9;break;case 7:throw t.$message.error(n.data.meta.msg),new Error(n.data.mate.msg);case 9:case"end":return r.stop()}}),r)})))()},back:function(){this.$router.back()},onChangeOfCategories:function(){return Object(d["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)})))()},loadCategories:function(){var e=this;return Object(d["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$request.get("categories");case 2:r=t.sent,200===r.data.meta.status?e.categories=r.data.data:e.$message.error(r.data.meta.msg);case 4:case"end":return t.stop()}}),t)})))()},prevStep:function(){this.currentIndex--},nextStep:function(){var e=this;return Object(d["a"])(regeneratorRuntime.mark((function t(){var r,n,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(0!==e.currentIndex){t.next=12;break}return t.prev=1,t.next=4,e.$refs.jbxxFormRef.validate();case 4:e.loadManyOrOnlyList("many"),t.next=10;break;case 7:return t.prev=7,t.t0=t["catch"](1),t.abrupt("return");case 10:t.next=41;break;case 12:if(1!==e.currentIndex){t.next=16;break}e.loadManyOrOnlyList("only"),t.next=41;break;case 16:if(2!==e.currentIndex){t.next=19;break}t.next=41;break;case 19:if(3!==e.currentIndex){t.next=22;break}t.next=41;break;case 22:if(4!==e.currentIndex){t.next=40;break}return r=e.spcs.list.map((function(e){return{attr_id:e.attr_id,attr_value:e._md_value.join(" ")}})),n=e.spsx.list.map((function(e){return{attr_id:e.attr_id,attr_value:e._md_value}})),t.prev=25,t.next=28,e.$request.post("goods",{goods_name:e.jbxx.form.data.goods_name,goods_cat:e.jbxx.form.data.goods_cat.join(","),goods_price:e.jbxx.form.data.goods_price,goods_number:e.jbxx.form.data.goods_number,goods_weight:e.jbxx.form.data.goods_weight,goods_introduce:e.spnr.form.data.goods_introduce,pics:e.sptp.form.data.imgs,attrs:[].concat(l(r),l(n))});case 28:if(a=t.sent,201===a.data.meta.status){t.next=32;break}return e.$message.error(a.data.meta.msg),t.abrupt("return");case 32:e.processStatus="success",t.next=38;break;case 35:t.prev=35,t.t1=t["catch"](25),e.$message.error("添加失败，请稍后重试！");case 38:t.next=41;break;case 40:e.currentIndex;case 41:e.currentIndex++;case 42:case"end":return t.stop()}}),t,null,[[1,7],[25,35]])})))()}},created:function(){this.loadCategories()}},p=f,g=r("2877"),m=Object(g["a"])(p,n,a,!1,null,null,null);t["default"]=m.exports},d28b:function(e,t,r){var n=r("746f");n("iterator")},d784:function(e,t,r){"use strict";r("ac1f");var n=r("6eeb"),a=r("d039"),o=r("b622"),i=r("9263"),s=r("9112"),c=o("species"),u=!a((function(){var e=/./;return e.exec=function(){var e=[];return e.groups={a:"7"},e},"7"!=="".replace(e,"$<a>")})),l=function(){return"$0"==="a".replace(/./,"$0")}(),d=o("replace"),f=function(){return!!/./[d]&&""===/./[d]("a","$0")}(),p=!a((function(){var e=/(?:)/,t=e.exec;e.exec=function(){return t.apply(this,arguments)};var r="ab".split(e);return 2!==r.length||"a"!==r[0]||"b"!==r[1]}));e.exports=function(e,t,r,d){var g=o(e),m=!a((function(){var t={};return t[g]=function(){return 7},7!=""[e](t)})),v=m&&!a((function(){var t=!1,r=/a/;return"split"===e&&(r={},r.constructor={},r.constructor[c]=function(){return r},r.flags="",r[g]=/./[g]),r.exec=function(){return t=!0,null},r[g](""),!t}));if(!m||!v||"replace"===e&&(!u||!l||f)||"split"===e&&!p){var b=/./[g],x=r(g,""[e],(function(e,t,r,n,a){return t.exec===i?m&&!a?{done:!0,value:b.call(t,r,n)}:{done:!0,value:e.call(r,t,n)}:{done:!1}}),{REPLACE_KEEPS_$0:l,REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE:f}),h=x[0],_=x[1];n(String.prototype,e,h),n(RegExp.prototype,g,2==t?function(e,t){return _.call(e,this,t)}:function(e){return _.call(e,this)})}d&&s(RegExp.prototype[g],"sham",!0)}},d81d:function(e,t,r){"use strict";var n=r("23e7"),a=r("b727").map,o=r("1dde"),i=r("ae40"),s=o("map"),c=i("map");n({target:"Array",proto:!0,forced:!s||!c},{map:function(e){return a(this,e,arguments.length>1?arguments[1]:void 0)}})},ddb0:function(e,t,r){var n=r("da84"),a=r("fdbc"),o=r("e260"),i=r("9112"),s=r("b622"),c=s("iterator"),u=s("toStringTag"),l=o.values;for(var d in a){var f=n[d],p=f&&f.prototype;if(p){if(p[c]!==l)try{i(p,c,l)}catch(m){p[c]=l}if(p[u]||i(p,u,d),a[d])for(var g in o)if(p[g]!==o[g])try{i(p,g,o[g])}catch(m){p[g]=o[g]}}}},e01a:function(e,t,r){"use strict";var n=r("23e7"),a=r("83ab"),o=r("da84"),i=r("5135"),s=r("861d"),c=r("9bf2").f,u=r("e893"),l=o.Symbol;if(a&&"function"==typeof l&&(!("description"in l.prototype)||void 0!==l().description)){var d={},f=function(){var e=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),t=this instanceof f?new l(e):void 0===e?l():l(e);return""===e&&(d[t]=!0),t};u(f,l);var p=f.prototype=l.prototype;p.constructor=f;var g=p.toString,m="Symbol(test)"==String(l("test")),v=/^Symbol\((.*)\)[^)]+$/;c(p,"description",{configurable:!0,get:function(){var e=s(this)?this.valueOf():this,t=g.call(e);if(i(d,e))return"";var r=m?t.slice(7,-1):t.replace(v,"$1");return""===r?void 0:r}}),n({global:!0,forced:!0},{Symbol:f})}},e538:function(e,t,r){var n=r("b622");t.f=n},fb6a:function(e,t,r){"use strict";var n=r("23e7"),a=r("861d"),o=r("e8b5"),i=r("23cb"),s=r("50c4"),c=r("fc6a"),u=r("8418"),l=r("b622"),d=r("1dde"),f=r("ae40"),p=d("slice"),g=f("slice",{ACCESSORS:!0,0:0,1:2}),m=l("species"),v=[].slice,b=Math.max;n({target:"Array",proto:!0,forced:!p||!g},{slice:function(e,t){var r,n,l,d=c(this),f=s(d.length),p=i(e,f),g=i(void 0===t?f:t,f);if(o(d)&&(r=d.constructor,"function"!=typeof r||r!==Array&&!o(r.prototype)?a(r)&&(r=r[m],null===r&&(r=void 0)):r=void 0,r===Array||void 0===r))return v.call(d,p,g);for(n=new(void 0===r?Array:r)(b(g-p,0)),l=0;p<g;p++,l++)p in d&&u(n,l,d[p]);return n.length=l,n}})}}]);
//# sourceMappingURL=GoodsAdd.4738fdf9.js.map