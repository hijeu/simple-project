var Xt=Object.defineProperty;var Qe=n=>{throw TypeError(n)};var Yt=(n,t,e)=>t in n?Xt(n,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):n[t]=e;var C=(n,t,e)=>Yt(n,typeof t!="symbol"?t+"":t,e),Te=(n,t,e)=>t.has(n)||Qe("Cannot "+e);var m=(n,t,e)=>(Te(n,t,"read from private field"),e?e.call(n):t.get(n)),x=(n,t,e)=>t.has(n)?Qe("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(n):t.set(n,e),b=(n,t,e,r)=>(Te(n,t,"write to private field"),r?r.call(n,e):t.set(n,e),e),p=(n,t,e)=>(Te(n,t,"access private method"),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function e(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=e(i);fetch(i.href,s)}})();function en(n){for(var t=[],e=0;e<n.length;){var r=n[e];if(r==="*"||r==="+"||r==="?"){t.push({type:"MODIFIER",index:e,value:n[e++]});continue}if(r==="\\"){t.push({type:"ESCAPED_CHAR",index:e++,value:n[e++]});continue}if(r==="{"){t.push({type:"OPEN",index:e,value:n[e++]});continue}if(r==="}"){t.push({type:"CLOSE",index:e,value:n[e++]});continue}if(r===":"){for(var i="",s=e+1;s<n.length;){var o=n.charCodeAt(s);if(o>=48&&o<=57||o>=65&&o<=90||o>=97&&o<=122||o===95){i+=n[s++];continue}break}if(!i)throw new TypeError("Missing parameter name at ".concat(e));t.push({type:"NAME",index:e,value:i}),e=s;continue}if(r==="("){var c=1,a="",s=e+1;if(n[s]==="?")throw new TypeError('Pattern cannot start with "?" at '.concat(s));for(;s<n.length;){if(n[s]==="\\"){a+=n[s++]+n[s++];continue}if(n[s]===")"){if(c--,c===0){s++;break}}else if(n[s]==="("&&(c++,n[s+1]!=="?"))throw new TypeError("Capturing groups are not allowed at ".concat(s));a+=n[s++]}if(c)throw new TypeError("Unbalanced pattern at ".concat(e));if(!a)throw new TypeError("Missing pattern at ".concat(e));t.push({type:"PATTERN",index:e,value:a}),e=s;continue}t.push({type:"CHAR",index:e,value:n[e++]})}return t.push({type:"END",index:e,value:""}),t}function Ge(n,t){t===void 0&&(t={});for(var e=en(n),r=t.prefixes,i=r===void 0?"./":r,s=t.delimiter,o=s===void 0?"/#?":s,c=[],a=0,u=0,h="",l=function(S){if(u<e.length&&e[u].type===S)return e[u++].value},f=function(S){var E=l(S);if(E!==void 0)return E;var M=e[u],Ue=M.type,Qt=M.index;throw new TypeError("Unexpected ".concat(Ue," at ").concat(Qt,", expected ").concat(S))},g=function(){for(var S="",E;E=l("CHAR")||l("ESCAPED_CHAR");)S+=E;return S},_=function(S){for(var E=0,M=o;E<M.length;E++){var Ue=M[E];if(S.indexOf(Ue)>-1)return!0}return!1},$=function(S){var E=c[c.length-1],M=S||(E&&typeof E=="string"?E:"");if(E&&!M)throw new TypeError('Must have text between two parameters, missing text after "'.concat(E.name,'"'));return!M||_(M)?"[^".concat(N(o),"]+?"):"(?:(?!".concat(N(M),")[^").concat(N(o),"])+?")};u<e.length;){var v=l("CHAR"),w=l("NAME"),Y=l("PATTERN");if(w||Y){var P=v||"";i.indexOf(P)===-1&&(h+=P,P=""),h&&(c.push(h),h=""),c.push({name:w||a++,prefix:P,suffix:"",pattern:Y||$(P),modifier:l("MODIFIER")||""});continue}var y=v||l("ESCAPED_CHAR");if(y){h+=y;continue}h&&(c.push(h),h="");var W=l("OPEN");if(W){var P=g(),I=l("NAME")||"",se=l("PATTERN")||"",ee=g();f("CLOSE"),c.push({name:I||(se?a++:""),pattern:I&&!se?$(P):se,prefix:P,suffix:ee,modifier:l("MODIFIER")||""});continue}f("END")}return c}function At(n,t){return Et(Ge(n,t),t)}function Et(n,t){t===void 0&&(t={});var e=qe(t),r=t.encode,i=r===void 0?function(a){return a}:r,s=t.validate,o=s===void 0?!0:s,c=n.map(function(a){if(typeof a=="object")return new RegExp("^(?:".concat(a.pattern,")$"),e)});return function(a){for(var u="",h=0;h<n.length;h++){var l=n[h];if(typeof l=="string"){u+=l;continue}var f=a?a[l.name]:void 0,g=l.modifier==="?"||l.modifier==="*",_=l.modifier==="*"||l.modifier==="+";if(Array.isArray(f)){if(!_)throw new TypeError('Expected "'.concat(l.name,'" to not repeat, but got an array'));if(f.length===0){if(g)continue;throw new TypeError('Expected "'.concat(l.name,'" to not be empty'))}for(var $=0;$<f.length;$++){var v=i(f[$],l);if(o&&!c[h].test(v))throw new TypeError('Expected all "'.concat(l.name,'" to match "').concat(l.pattern,'", but got "').concat(v,'"'));u+=l.prefix+v+l.suffix}continue}if(typeof f=="string"||typeof f=="number"){var v=i(String(f),l);if(o&&!c[h].test(v))throw new TypeError('Expected "'.concat(l.name,'" to match "').concat(l.pattern,'", but got "').concat(v,'"'));u+=l.prefix+v+l.suffix;continue}if(!g){var w=_?"an array":"a string";throw new TypeError('Expected "'.concat(l.name,'" to be ').concat(w))}}return u}}function N(n){return n.replace(/([.+*?=^!:${}()[\]|/\\])/g,"\\$1")}function qe(n){return n&&n.sensitive?"":"i"}function tn(n,t){if(!t)return n;for(var e=/\((?:\?<(.*?)>)?(?!\?)/g,r=0,i=e.exec(n.source);i;)t.push({name:i[1]||r++,prefix:"",suffix:"",modifier:"",pattern:""}),i=e.exec(n.source);return n}function nn(n,t,e){var r=n.map(function(i){return bt(i,t,e).source});return new RegExp("(?:".concat(r.join("|"),")"),qe(e))}function rn(n,t,e){return sn(Ge(n,e),t,e)}function sn(n,t,e){e===void 0&&(e={});for(var r=e.strict,i=r===void 0?!1:r,s=e.start,o=s===void 0?!0:s,c=e.end,a=c===void 0?!0:c,u=e.encode,h=u===void 0?function(E){return E}:u,l=e.delimiter,f=l===void 0?"/#?":l,g=e.endsWith,_=g===void 0?"":g,$="[".concat(N(_),"]|$"),v="[".concat(N(f),"]"),w=o?"^":"",Y=0,P=n;Y<P.length;Y++){var y=P[Y];if(typeof y=="string")w+=N(h(y));else{var W=N(h(y.prefix)),I=N(h(y.suffix));if(y.pattern)if(t&&t.push(y),W||I)if(y.modifier==="+"||y.modifier==="*"){var se=y.modifier==="*"?"?":"";w+="(?:".concat(W,"((?:").concat(y.pattern,")(?:").concat(I).concat(W,"(?:").concat(y.pattern,"))*)").concat(I,")").concat(se)}else w+="(?:".concat(W,"(").concat(y.pattern,")").concat(I,")").concat(y.modifier);else{if(y.modifier==="+"||y.modifier==="*")throw new TypeError('Can not repeat "'.concat(y.name,'" without a prefix and suffix'));w+="(".concat(y.pattern,")").concat(y.modifier)}else w+="(?:".concat(W).concat(I,")").concat(y.modifier)}}if(a)i||(w+="".concat(v,"?")),w+=e.endsWith?"(?=".concat($,")"):"$";else{var ee=n[n.length-1],S=typeof ee=="string"?v.indexOf(ee[ee.length-1])>-1:ee===void 0;i||(w+="(?:".concat(v,"(?=").concat($,"))?")),S||(w+="(?=".concat(v,"|").concat($,")"))}return new RegExp(w,qe(e))}function bt(n,t,e){return n instanceof RegExp?tn(n,t):Array.isArray(n)?nn(n,t,e):rn(n,t,e)}function G(n){return typeof n=="object"&&!!n}function ue(n){return typeof n=="function"}function L(n){return typeof n=="string"}function be(n=[]){return Array.isArray(n)?n:[n]}function B(n){return`[Vaadin.Router] ${n}`}class Rt extends Error{constructor(e){super(B(`Page not found (${e.pathname})`));C(this,"code");C(this,"context");this.context=e,this.code=404}}const Q=Symbol("NotFoundResult");function St(n){return new Rt(n)}function xt(n){return(Array.isArray(n)?n[0]:n)??""}function Re(n){return xt(n==null?void 0:n.path)}function on(n){return Array.isArray(n)&&n.length>0?n:void 0}const He=new Map;He.set("|false",{keys:[],pattern:/(?:)/u});function Xe(n){try{return decodeURIComponent(n)}catch{return n}}function an(n,t,e=!1,r=[],i){const s=`${n}|${String(e)}`,o=xt(t);let c=He.get(s);if(!c){const h=[];c={keys:h,pattern:bt(n,h,{end:e,strict:n===""})},He.set(s,c)}const a=c.pattern.exec(o);if(!a)return null;const u={...i};for(let h=1;h<a.length;h++){const l=c.keys[h-1],f=l.name,g=a[h];(g!==void 0||!Object.hasOwn(u,f))&&(l.modifier==="+"||l.modifier==="*"?u[f]=g?g.split(/[/?#]/u).map(Xe):[]:u[f]=g&&Xe(g))}return{keys:[...r,...c.keys],params:u,path:a[0]}}var cn=an;function Pt(n,t,e,r,i){let s,o,c=0,a=Re(n);return a.startsWith("/")&&(e&&(a=a.substring(1)),e=!0),{next(u){if(n===u)return{done:!0,value:void 0};n.__children??(n.__children=on(n.children));const h=n.__children??[],l=!n.__children&&!n.children;if(!s&&(s=cn(a,t,l,r,i),s))return{value:{keys:s.keys,params:s.params,path:s.path,route:n}};if(s&&h.length>0)for(;c<h.length;){if(!o){const g=h[c];g.parent=n;let _=s.path.length;_>0&&t.charAt(_)==="/"&&(_+=1),o=Pt(g,t.substring(_),e,s.keys,s.params)}const f=o.next(u);if(!f.done)return{done:!1,value:f.value};o=null,c+=1}return{done:!0,value:void 0}}}}var ln=Pt;function hn(n){if(ue(n.route.action))return n.route.action(n)}function un(n,t){let e=n;for(;e;)if(e=e.parent,e===t)return!0;return!1}function dn(n){return!!n&&typeof n=="object"&&"next"in n&&"params"in n&&"result"in n&&"route"in n}class fn extends Error{constructor(e,r){let i=`Path '${e.pathname}' is not properly resolved due to an error.`;const s=Re(e.route);s&&(i+=` Resolution had failed on route: '${s}'`);super(i,r);C(this,"code");C(this,"context");this.code=r==null?void 0:r.code,this.context=e}warn(){console.warn(this.message)}}function pn(n,t){var i;const{path:e,route:r}=t;if(r&&!r.__synthetic){const s={path:e,route:r};if(r.parent&&n.chain)for(let o=n.chain.length-1;o>=0&&n.chain[o].route!==r.parent;o--)n.chain.pop();(i=n.chain)==null||i.push(s)}}var Z,R;class Ct{constructor(t,{baseUrl:e="",context:r,errorHandler:i,resolveRoute:s=hn}={}){C(this,"baseUrl");x(this,Z);C(this,"errorHandler");C(this,"resolveRoute");x(this,R);if(Object(t)!==t)throw new TypeError("Invalid routes");this.baseUrl=e,this.errorHandler=i,this.resolveRoute=s,Array.isArray(t)?b(this,R,{__children:t,__synthetic:!0,action:()=>{},path:""}):b(this,R,{...t,parent:void 0}),b(this,Z,{...r,hash:"",async next(){return Q},params:{},pathname:"",resolver:this,route:m(this,R),search:"",chain:[]})}get root(){return m(this,R)}get context(){return m(this,Z)}get __effectiveBaseUrl(){return this.baseUrl?new URL(this.baseUrl,document.baseURI||document.URL).href.replace(/[^/]*$/u,""):""}getRoutes(){return[...m(this,R).__children??[]]}removeRoutes(){m(this,R).__children=[]}async resolve(t){const e=this,r={...m(this,Z),...L(t)?{pathname:t}:t,next:u},i=ln(m(this,R),this.__normalizePathname(r.pathname)??r.pathname,!!this.baseUrl),s=this.resolveRoute;let o=null,c=null,a=r;async function u(h=!1,l=(g=>(g=o==null?void 0:o.value)==null?void 0:g.route)(),f){var v,w;const _=f===null?(v=o==null?void 0:o.value)==null?void 0:v.route:void 0;if(o=c??i.next(_),c=null,!h&&(o.done||!un(o.value.route,l)))return c=o,Q;if(o.done)throw St(r);a={...r,params:o.value.params,route:o.value.route,chain:(w=a.chain)==null?void 0:w.slice()},pn(a,o.value);const $=await s(a);return $!=null&&$!==Q?(a.result=dn($)?$.result:$,b(e,Z,a),a):await u(h,l,$)}try{return await u(!0,m(this,R))}catch(h){const l=h instanceof Rt?h:new fn(a,{code:500,cause:h});if(this.errorHandler)return a.result=this.errorHandler(l),a;throw h}}setRoutes(t){m(this,R).__children=[...be(t)]}__normalizePathname(t){if(!this.baseUrl)return t;const e=this.__effectiveBaseUrl,r=t.startsWith("/")?new URL(e).origin+t:`./${t}`,i=new URL(r,e).href;if(i.startsWith(e))return i.slice(e.length)}addRoutes(t){return m(this,R).__children=[...m(this,R).__children??[],...be(t)],this.getRoutes()}}Z=new WeakMap,R=new WeakMap;function Ut(n,t,e,r){var s;const i=t.name??(r==null?void 0:r(t));if(i&&(n.has(i)?(s=n.get(i))==null||s.push(t):n.set(i,[t])),Array.isArray(e))for(const o of e)o.parent=t,Ut(n,o,o.__children??o.children,r)}function Ye(n,t){const e=n.get(t);if(e){if(e.length>1)throw new Error(`Duplicate route with name "${t}". Try seting unique 'name' route properties.`);return e[0]}}function mn(n,t={}){if(!(n instanceof Ct))throw new TypeError("An instance of Resolver is expected");const e=new Map,r=new Map;return(i,s)=>{let o=Ye(r,i);if(!o&&(r.clear(),Ut(r,n.root,n.root.__children,t.cacheKeyProvider),o=Ye(r,i),!o))throw new Error(`Route "${i}" not found`);let c=o.fullPath?e.get(o.fullPath):void 0;if(!c){let h=Re(o),l=o.parent;for(;l;){const _=Re(l);_&&(h=`${_.replace(/\/$/u,"")}/${h.replace(/^\//u,"")}`),l=l.parent}const f=Ge(h),g=Object.create(null);for(const _ of f)L(_)||(g[_.name]=!0);c={keys:g,tokens:f},e.set(h,c),o.fullPath=h}let u=Et(c.tokens,{encode:encodeURIComponent,...t})(s)||"/";if(t.stringifyQueryParams&&s){const h={};for(const[f,g]of Object.entries(s))!(f in c.keys)&&g&&(h[f]=g);const l=t.stringifyQueryParams(h);l&&(u+=l.startsWith("?")?l:`?${l}`)}return u}}var gn=mn;const _n=/\/\*[\*!]\s+vaadin-dev-mode:start([\s\S]*)vaadin-dev-mode:end\s+\*\*\//i,ye=window.Vaadin&&window.Vaadin.Flow&&window.Vaadin.Flow.clients;function yn(){function n(){return!0}return Tt(n)}function $n(){try{return vn()?!0:wn()?ye?!An():!yn():!1}catch{return!1}}function vn(){return localStorage.getItem("vaadin.developmentmode.force")}function wn(){return["localhost","127.0.0.1"].indexOf(window.location.hostname)>=0}function An(){return!!(ye&&Object.keys(ye).map(t=>ye[t]).filter(t=>t.productionMode).length>0)}function Tt(n,t){if(typeof n!="function")return;const e=_n.exec(n.toString());if(e)try{n=new Function(e[1])}catch(r){console.log("vaadin-development-mode-detector: uncommentAndRun() failed",r)}return n(t)}window.Vaadin=window.Vaadin||{};const et=function(n,t){if(window.Vaadin.developmentMode)return Tt(n,t)};window.Vaadin.developmentMode===void 0&&(window.Vaadin.developmentMode=$n());function En(){/*! vaadin-dev-mode:start
  (function () {
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var getPolymerVersion = function getPolymerVersion() {
  return window.Polymer && window.Polymer.version;
};

var StatisticsGatherer = function () {
  function StatisticsGatherer(logger) {
    classCallCheck(this, StatisticsGatherer);

    this.now = new Date().getTime();
    this.logger = logger;
  }

  createClass(StatisticsGatherer, [{
    key: 'frameworkVersionDetectors',
    value: function frameworkVersionDetectors() {
      return {
        'Flow': function Flow() {
          if (window.Vaadin && window.Vaadin.Flow && window.Vaadin.Flow.clients) {
            var flowVersions = Object.keys(window.Vaadin.Flow.clients).map(function (key) {
              return window.Vaadin.Flow.clients[key];
            }).filter(function (client) {
              return client.getVersionInfo;
            }).map(function (client) {
              return client.getVersionInfo().flow;
            });
            if (flowVersions.length > 0) {
              return flowVersions[0];
            }
          }
        },
        'Vaadin Framework': function VaadinFramework() {
          if (window.vaadin && window.vaadin.clients) {
            var frameworkVersions = Object.values(window.vaadin.clients).filter(function (client) {
              return client.getVersionInfo;
            }).map(function (client) {
              return client.getVersionInfo().vaadinVersion;
            });
            if (frameworkVersions.length > 0) {
              return frameworkVersions[0];
            }
          }
        },
        'AngularJs': function AngularJs() {
          if (window.angular && window.angular.version && window.angular.version) {
            return window.angular.version.full;
          }
        },
        'Angular': function Angular() {
          if (window.ng) {
            var tags = document.querySelectorAll("[ng-version]");
            if (tags.length > 0) {
              return tags[0].getAttribute("ng-version");
            }
            return "Unknown";
          }
        },
        'Backbone.js': function BackboneJs() {
          if (window.Backbone) {
            return window.Backbone.VERSION;
          }
        },
        'React': function React() {
          var reactSelector = '[data-reactroot], [data-reactid]';
          if (!!document.querySelector(reactSelector)) {
            // React does not publish the version by default
            return "unknown";
          }
        },
        'Ember': function Ember() {
          if (window.Em && window.Em.VERSION) {
            return window.Em.VERSION;
          } else if (window.Ember && window.Ember.VERSION) {
            return window.Ember.VERSION;
          }
        },
        'jQuery': function (_jQuery) {
          function jQuery() {
            return _jQuery.apply(this, arguments);
          }

          jQuery.toString = function () {
            return _jQuery.toString();
          };

          return jQuery;
        }(function () {
          if (typeof jQuery === 'function' && jQuery.prototype.jquery !== undefined) {
            return jQuery.prototype.jquery;
          }
        }),
        'Polymer': function Polymer() {
          var version = getPolymerVersion();
          if (version) {
            return version;
          }
        },
        'LitElement': function LitElement() {
          var version = window.litElementVersions && window.litElementVersions[0];
          if (version) {
            return version;
          }
        },
        'LitHtml': function LitHtml() {
          var version = window.litHtmlVersions && window.litHtmlVersions[0];
          if (version) {
            return version;
          }
        },
        'Vue.js': function VueJs() {
          if (window.Vue) {
            return window.Vue.version;
          }
        }
      };
    }
  }, {
    key: 'getUsedVaadinElements',
    value: function getUsedVaadinElements(elements) {
      var version = getPolymerVersion();
      var elementClasses = void 0;
      // NOTE: In case you edit the code here, YOU MUST UPDATE any statistics reporting code in Flow.
      // Check all locations calling the method getEntries() in
      // https://github.com/vaadin/flow/blob/master/flow-server/src/main/java/com/vaadin/flow/internal/UsageStatistics.java#L106
      // Currently it is only used by BootstrapHandler.
      if (version && version.indexOf('2') === 0) {
        // Polymer 2: components classes are stored in window.Vaadin
        elementClasses = Object.keys(window.Vaadin).map(function (c) {
          return window.Vaadin[c];
        }).filter(function (c) {
          return c.is;
        });
      } else {
        // Polymer 3: components classes are stored in window.Vaadin.registrations
        elementClasses = window.Vaadin.registrations || [];
      }
      elementClasses.forEach(function (klass) {
        var version = klass.version ? klass.version : "0.0.0";
        elements[klass.is] = { version: version };
      });
    }
  }, {
    key: 'getUsedVaadinThemes',
    value: function getUsedVaadinThemes(themes) {
      ['Lumo', 'Material'].forEach(function (themeName) {
        var theme;
        var version = getPolymerVersion();
        if (version && version.indexOf('2') === 0) {
          // Polymer 2: themes are stored in window.Vaadin
          theme = window.Vaadin[themeName];
        } else {
          // Polymer 3: themes are stored in custom element registry
          theme = customElements.get('vaadin-' + themeName.toLowerCase() + '-styles');
        }
        if (theme && theme.version) {
          themes[themeName] = { version: theme.version };
        }
      });
    }
  }, {
    key: 'getFrameworks',
    value: function getFrameworks(frameworks) {
      var detectors = this.frameworkVersionDetectors();
      Object.keys(detectors).forEach(function (framework) {
        var detector = detectors[framework];
        try {
          var version = detector();
          if (version) {
            frameworks[framework] = { version: version };
          }
        } catch (e) {}
      });
    }
  }, {
    key: 'gather',
    value: function gather(storage) {
      var storedStats = storage.read();
      var gatheredStats = {};
      var types = ["elements", "frameworks", "themes"];

      types.forEach(function (type) {
        gatheredStats[type] = {};
        if (!storedStats[type]) {
          storedStats[type] = {};
        }
      });

      var previousStats = JSON.stringify(storedStats);

      this.getUsedVaadinElements(gatheredStats.elements);
      this.getFrameworks(gatheredStats.frameworks);
      this.getUsedVaadinThemes(gatheredStats.themes);

      var now = this.now;
      types.forEach(function (type) {
        var keys = Object.keys(gatheredStats[type]);
        keys.forEach(function (key) {
          if (!storedStats[type][key] || _typeof(storedStats[type][key]) != _typeof({})) {
            storedStats[type][key] = { firstUsed: now };
          }
          // Discards any previously logged version number
          storedStats[type][key].version = gatheredStats[type][key].version;
          storedStats[type][key].lastUsed = now;
        });
      });

      var newStats = JSON.stringify(storedStats);
      storage.write(newStats);
      if (newStats != previousStats && Object.keys(storedStats).length > 0) {
        this.logger.debug("New stats: " + newStats);
      }
    }
  }]);
  return StatisticsGatherer;
}();

var StatisticsStorage = function () {
  function StatisticsStorage(key) {
    classCallCheck(this, StatisticsStorage);

    this.key = key;
  }

  createClass(StatisticsStorage, [{
    key: 'read',
    value: function read() {
      var localStorageStatsString = localStorage.getItem(this.key);
      try {
        return JSON.parse(localStorageStatsString ? localStorageStatsString : '{}');
      } catch (e) {
        return {};
      }
    }
  }, {
    key: 'write',
    value: function write(data) {
      localStorage.setItem(this.key, data);
    }
  }, {
    key: 'clear',
    value: function clear() {
      localStorage.removeItem(this.key);
    }
  }, {
    key: 'isEmpty',
    value: function isEmpty() {
      var storedStats = this.read();
      var empty = true;
      Object.keys(storedStats).forEach(function (key) {
        if (Object.keys(storedStats[key]).length > 0) {
          empty = false;
        }
      });

      return empty;
    }
  }]);
  return StatisticsStorage;
}();

var StatisticsSender = function () {
  function StatisticsSender(url, logger) {
    classCallCheck(this, StatisticsSender);

    this.url = url;
    this.logger = logger;
  }

  createClass(StatisticsSender, [{
    key: 'send',
    value: function send(data, errorHandler) {
      var logger = this.logger;

      if (navigator.onLine === false) {
        logger.debug("Offline, can't send");
        errorHandler();
        return;
      }
      logger.debug("Sending data to " + this.url);

      var req = new XMLHttpRequest();
      req.withCredentials = true;
      req.addEventListener("load", function () {
        // Stats sent, nothing more to do
        logger.debug("Response: " + req.responseText);
      });
      req.addEventListener("error", function () {
        logger.debug("Send failed");
        errorHandler();
      });
      req.addEventListener("abort", function () {
        logger.debug("Send aborted");
        errorHandler();
      });
      req.open("POST", this.url);
      req.setRequestHeader("Content-Type", "application/json");
      req.send(data);
    }
  }]);
  return StatisticsSender;
}();

var StatisticsLogger = function () {
  function StatisticsLogger(id) {
    classCallCheck(this, StatisticsLogger);

    this.id = id;
  }

  createClass(StatisticsLogger, [{
    key: '_isDebug',
    value: function _isDebug() {
      return localStorage.getItem("vaadin." + this.id + ".debug");
    }
  }, {
    key: 'debug',
    value: function debug(msg) {
      if (this._isDebug()) {
        console.info(this.id + ": " + msg);
      }
    }
  }]);
  return StatisticsLogger;
}();

var UsageStatistics = function () {
  function UsageStatistics() {
    classCallCheck(this, UsageStatistics);

    this.now = new Date();
    this.timeNow = this.now.getTime();
    this.gatherDelay = 10; // Delay between loading this file and gathering stats
    this.initialDelay = 24 * 60 * 60;

    this.logger = new StatisticsLogger("statistics");
    this.storage = new StatisticsStorage("vaadin.statistics.basket");
    this.gatherer = new StatisticsGatherer(this.logger);
    this.sender = new StatisticsSender("https://tools.vaadin.com/usage-stats/submit", this.logger);
  }

  createClass(UsageStatistics, [{
    key: 'maybeGatherAndSend',
    value: function maybeGatherAndSend() {
      var _this = this;

      if (localStorage.getItem(UsageStatistics.optOutKey)) {
        return;
      }
      this.gatherer.gather(this.storage);
      setTimeout(function () {
        _this.maybeSend();
      }, this.gatherDelay * 1000);
    }
  }, {
    key: 'lottery',
    value: function lottery() {
      return true;
    }
  }, {
    key: 'currentMonth',
    value: function currentMonth() {
      return this.now.getYear() * 12 + this.now.getMonth();
    }
  }, {
    key: 'maybeSend',
    value: function maybeSend() {
      var firstUse = Number(localStorage.getItem(UsageStatistics.firstUseKey));
      var monthProcessed = Number(localStorage.getItem(UsageStatistics.monthProcessedKey));

      if (!firstUse) {
        // Use a grace period to avoid interfering with tests, incognito mode etc
        firstUse = this.timeNow;
        localStorage.setItem(UsageStatistics.firstUseKey, firstUse);
      }

      if (this.timeNow < firstUse + this.initialDelay * 1000) {
        this.logger.debug("No statistics will be sent until the initial delay of " + this.initialDelay + "s has passed");
        return;
      }
      if (this.currentMonth() <= monthProcessed) {
        this.logger.debug("This month has already been processed");
        return;
      }
      localStorage.setItem(UsageStatistics.monthProcessedKey, this.currentMonth());
      // Use random sampling
      if (this.lottery()) {
        this.logger.debug("Congratulations, we have a winner!");
      } else {
        this.logger.debug("Sorry, no stats from you this time");
        return;
      }

      this.send();
    }
  }, {
    key: 'send',
    value: function send() {
      // Ensure we have the latest data
      this.gatherer.gather(this.storage);

      // Read, send and clean up
      var data = this.storage.read();
      data["firstUse"] = Number(localStorage.getItem(UsageStatistics.firstUseKey));
      data["usageStatisticsVersion"] = UsageStatistics.version;
      var info = 'This request contains usage statistics gathered from the application running in development mode. \n\nStatistics gathering is automatically disabled and excluded from production builds.\n\nFor details and to opt-out, see https://github.com/vaadin/vaadin-usage-statistics.\n\n\n\n';
      var self = this;
      this.sender.send(info + JSON.stringify(data), function () {
        // Revert the 'month processed' flag
        localStorage.setItem(UsageStatistics.monthProcessedKey, self.currentMonth() - 1);
      });
    }
  }], [{
    key: 'version',
    get: function get$1() {
      return '2.1.2';
    }
  }, {
    key: 'firstUseKey',
    get: function get$1() {
      return 'vaadin.statistics.firstuse';
    }
  }, {
    key: 'monthProcessedKey',
    get: function get$1() {
      return 'vaadin.statistics.monthProcessed';
    }
  }, {
    key: 'optOutKey',
    get: function get$1() {
      return 'vaadin.statistics.optout';
    }
  }]);
  return UsageStatistics;
}();

try {
  window.Vaadin = window.Vaadin || {};
  window.Vaadin.usageStatsChecker = window.Vaadin.usageStatsChecker || new UsageStatistics();
  window.Vaadin.usageStatsChecker.maybeGatherAndSend();
} catch (e) {
  // Intentionally ignored as this is not a problem in the app being developed
}

}());

  vaadin-dev-mode:end **/}const bn=function(){if(typeof et=="function")return et(En)};function Rn(n,t=window.Vaadin??(window.Vaadin={})){t.registrations??(t.registrations=[]),t.registrations.push({is:"@vaadin/router",version:"2.0.0"})}Rn();bn();const Sn=n=>{const t=getComputedStyle(n).getPropertyValue("animation-name");return t&&t!=="none"},xn=(n,t)=>{const e=()=>{n.removeEventListener("animationend",e),t()};n.addEventListener("animationend",e)};async function Pn(n,t){return n.classList.add(t),await new Promise(e=>{if(Sn(n)){const r=n.getBoundingClientRect(),i=`height: ${r.bottom-r.top}px; width: ${r.right-r.left}px`;n.setAttribute("style",`position: absolute; ${i}`),xn(n,()=>{n.classList.remove(t),n.removeAttribute("style"),e()})}else n.classList.remove(t),e()})}var tt=Pn;function Mt(n){if(!n||!L(n.path))throw new Error(B('Expected route config to be an object with a "path" string property, or an array of such objects'));if(!ue(n.action)&&!Array.isArray(n.children)&&!ue(n.children)&&!L(n.component)&&!L(n.redirect))throw new Error(B(`Expected route config "${n.path}" to include either "component, redirect" or "action" function but none found.`));n.redirect&&["bundle","component"].forEach(t=>{t in n&&console.warn(B(`Route config "${String(n.path)}" has both "redirect" and "${t}" properties, and "redirect" will always override the latter. Did you mean to only use "${t}"?`))})}function nt(n){be(n).forEach(t=>Mt(t))}function Cn({next:n,...t}){return t}function $e(n,t){const e=t.__effectiveBaseUrl;return e?new URL(n.replace(/^\//u,""),e).pathname:n}function Ot(n){return n.map(t=>t.path).reduce((t,e)=>e.length?`${t.replace(/\/$/u,"")}/${e.replace(/^\//u,"")}`:t,"")}function Un(n){return Ot(n.map(t=>t.route))}function U({chain:n=[],hash:t="",params:e={},pathname:r="",redirectFrom:i,resolver:s,search:o=""},c){const a=n.map(u=>u.route);return{baseUrl:(s==null?void 0:s.baseUrl)??"",getUrl:(u={})=>s?$e(At(Un(n))({...e,...u}),s):"",hash:t,params:e,pathname:r,redirectFrom:i,route:c??(Array.isArray(a)?a.at(-1):void 0)??null,routes:a,search:o,searchParams:new URLSearchParams(o)}}function rt(n,t){const e={...n.params};return{redirect:{from:n.pathname,params:e,pathname:t}}}function Tn(n,t){if(t.location=U(n),n.chain){const e=n.chain.map(r=>r.route).indexOf(n.route);n.chain[e].element=t}return t}function ve(n,t,...e){if(typeof n=="function")return n.apply(t,e)}function it(n,t,...e){return r=>r&&G(r)&&("cancel"in r||"redirect"in r)?r:ve(t==null?void 0:t[n],t,...e)}function Mn(n,t){if(!Array.isArray(n)&&!G(n))throw new Error(B(`Incorrect "children" value for the route ${String(t.path)}: expected array or object, but got ${String(n)}`));const e=be(n);e.forEach(r=>Mt(r)),t.__children=e}function ce(n,t){return!window.dispatchEvent(new CustomEvent(`vaadin-router-${n}`,{cancelable:n==="go",detail:t}))}function On(n){if(typeof n!="object")return String(n);const[t="Unknown"]=/ (.*)\]$/u.exec(String(n))??[];return t==="Object"||t==="Array"?`${t} ${JSON.stringify(n)}`:t}function Ln(n){const{port:t,protocol:e}=n,s=e==="http:"&&t==="80"||e==="https:"&&t==="443"?n.hostname:n.host;return`${e}//${s}`}function st(n){if(n instanceof Element)return n.nodeName.toLowerCase()}function ot(n){if(n.defaultPrevented||n.button!==0||n.shiftKey||n.ctrlKey||n.altKey||n.metaKey)return;let t=n.target;const e=n instanceof MouseEvent?n.composedPath():n.path??[];for(let a=0;a<e.length;a++){const u=e[a];if("nodeName"in u&&u.nodeName.toLowerCase()==="a"){t=u;break}}for(;t&&t instanceof Node&&st(t)!=="a";)t=t.parentNode;if(!t||st(t)!=="a")return;const r=t;if(r.target&&r.target.toLowerCase()!=="_self"||r.hasAttribute("download")||r.hasAttribute("router-ignore")||r.pathname===window.location.pathname&&r.hash!==""||(r.origin||Ln(r))!==window.location.origin)return;const{hash:s,pathname:o,search:c}=r;ce("go",{hash:s,pathname:o,search:c})&&n instanceof MouseEvent&&(n.preventDefault(),n.type==="click"&&window.scrollTo(0,0))}const In={activate(){window.document.addEventListener("click",ot)},inactivate(){window.document.removeEventListener("click",ot)}};var Hn=In;function at(n){if(n.state==="vaadin-router-ignore")return;const{hash:t,pathname:e,search:r}=window.location;ce("go",{hash:t,pathname:e,search:r})}const Nn={activate(){window.addEventListener("popstate",at)},inactivate(){window.removeEventListener("popstate",at)}};var Fn=Nn;let ct=[];const Dn={CLICK:Hn,POPSTATE:Fn};function lt(n=[]){ct.forEach(t=>t.inactivate()),n.forEach(t=>t.activate()),ct=n}const kn=256;function oe(){return{cancel:!0}}const ht={__renderId:-1,params:{},route:{__synthetic:!0,children:[],path:"",action(){}},pathname:"",async next(){return Q}};var me,ne,ge,K,k,J,O,T,d,Lt,It,we,Ne,Ht,Nt,Fe,De,ke,H,Be,Ve,Ae,ze,Ft,Dt,kt,Bt,Vt,zt,We;class Bn extends Ct{constructor(e,r){const i=document.head.querySelector("base"),s=i==null?void 0:i.getAttribute("href");super([],{baseUrl:s?new URL(s,document.URL).href.replace(/[^/]*$/u,""):void 0,...r,resolveRoute:async o=>await p(this,d,Lt).call(this,o)});x(this,d);C(this,"location",U({resolver:this}));C(this,"ready",Promise.resolve(this.location));x(this,me,new WeakSet);x(this,ne,new WeakSet);x(this,ge,p(this,d,We).bind(this));x(this,K,0);x(this,k);C(this,"__previousContext");x(this,J);x(this,O,null);x(this,T,null);lt(Object.values(Dn)),this.setOutlet(e),this.subscribe()}setOutlet(e){e&&p(this,d,Ve).call(this,e),b(this,k,e)}getOutlet(){return m(this,k)}async setRoutes(e,r=!1){return this.__previousContext=void 0,b(this,J,void 0),nt(e),super.setRoutes(e),r||p(this,d,We).call(this),await this.ready}addRoutes(e){return nt(e),super.addRoutes(e)}async render(e,r=!1){b(this,K,m(this,K)+1);const i=m(this,K),s={...ht,...L(e)?{hash:"",search:"",pathname:e}:e,__renderId:i};return this.ready=p(this,d,It).call(this,s,r),await this.ready}subscribe(){window.addEventListener("vaadin-router-go",m(this,ge))}unsubscribe(){window.removeEventListener("vaadin-router-go",m(this,ge))}static setTriggers(...e){lt(e)}urlForName(e,r){return m(this,J)||b(this,J,gn(this,{cacheKeyProvider(i){return"component"in i&&typeof i.component=="string"?i.component:void 0}})),$e(m(this,J).call(this,e,r??void 0),this)}urlForPath(e,r){return $e(At(e)(r??void 0),this)}static go(e){const{pathname:r,search:i,hash:s}=L(e)?new URL(e,"http://a"):e;return ce("go",{pathname:r,search:i,hash:s})}}me=new WeakMap,ne=new WeakMap,ge=new WeakMap,K=new WeakMap,k=new WeakMap,J=new WeakMap,O=new WeakMap,T=new WeakMap,d=new WeakSet,Lt=async function(e){const{route:r}=e;if(ue(r.children)){let s=await r.children(Cn(e));ue(r.children)||({children:s}=r),Mn(s,r)}const i={component:s=>{const o=document.createElement(s);return m(this,ne).add(o),o},prevent:oe,redirect:s=>rt(e,s)};return await Promise.resolve().then(async()=>{if(p(this,d,H).call(this,e))return await ve(r.action,r,e,i)}).then(s=>{if(s!=null&&(typeof s=="object"||typeof s=="symbol")&&(s instanceof HTMLElement||s===Q||G(s)&&"redirect"in s))return s;if(L(r.redirect))return i.redirect(r.redirect)}).then(s=>{if(s!=null)return s;if(L(r.component))return i.component(r.component)})},It=async function(e,r){var s;const{__renderId:i}=e;try{const o=await this.resolve(e),c=await p(this,d,we).call(this,o);if(!p(this,d,H).call(this,c))return this.location;const a=this.__previousContext;if(c===a)return p(this,d,Ae).call(this,a,!0),this.location;if(this.location=U(c),r&&p(this,d,Ae).call(this,c,i===1),ce("location-changed",{router:this,location:this.location}),c.__skipAttach)return p(this,d,ze).call(this,c,a),this.__previousContext=c,this.location;p(this,d,Ft).call(this,c,a);const u=p(this,d,zt).call(this,c);if(p(this,d,Vt).call(this,c),p(this,d,Bt).call(this,c,a),await u,p(this,d,H).call(this,c))return p(this,d,Dt).call(this),this.__previousContext=c,this.location}catch(o){if(i===m(this,K)){r&&p(this,d,Ae).call(this,this.context);for(const c of((s=m(this,k))==null?void 0:s.children)??[])c.remove();throw this.location=U(Object.assign(e,{resolver:this})),ce("error",{router:this,error:o,...e}),o}}return this.location},we=async function(e,r=e){const i=await p(this,d,Ne).call(this,r),o=i!==r?i:e,a=$e(Ot(i.chain??[]),this)===i.pathname,u=async(l,f=l.route,g)=>{const _=await l.next(!1,f,g);return _===null||_===Q?a?l:f.parent!=null?await u(l,f.parent,_):_:_},h=await u(i);if(h==null||h===Q)throw St(o);return h!==i?await p(this,d,we).call(this,o,h):await p(this,d,Ht).call(this,i)},Ne=async function(e){const{result:r}=e;if(r instanceof HTMLElement)return Tn(e,r),e;if(r&&"redirect"in r){const i=await p(this,d,Be).call(this,r.redirect,e.__redirectCount,e.__renderId);return await p(this,d,Ne).call(this,i)}throw r instanceof Error?r:new Error(B(`Invalid route resolution result for path "${e.pathname}". Expected redirect object or HTML element, but got: "${On(r)}". Double check the action return value for the route.`))},Ht=async function(e){return await p(this,d,Nt).call(this,e).then(async r=>r===this.__previousContext||r===e?r:await p(this,d,we).call(this,r))},Nt=async function(e){const r=this.__previousContext??{},i=r.chain??[],s=e.chain??[];let o=Promise.resolve(void 0);const c=a=>rt(e,a);if(e.__divergedChainIndex=0,e.__skipAttach=!1,i.length){for(let a=0;a<Math.min(i.length,s.length)&&!(i[a].route!==s[a].route||i[a].path!==s[a].path&&i[a].element!==s[a].element||!p(this,d,ke).call(this,i[a].element,s[a].element));e.__divergedChainIndex++,a++);if(e.__skipAttach=s.length===i.length&&e.__divergedChainIndex===s.length&&p(this,d,ke).call(this,e.result,r.result),e.__skipAttach){for(let a=s.length-1;a>=0;a--)o=p(this,d,Fe).call(this,o,e,{prevent:oe},i[a]);for(let a=0;a<s.length;a++)o=p(this,d,De).call(this,o,e,{prevent:oe,redirect:c},s[a]),i[a].element.location=U(e,i[a].route)}else for(let a=i.length-1;a>=e.__divergedChainIndex;a--)o=p(this,d,Fe).call(this,o,e,{prevent:oe},i[a])}if(!e.__skipAttach)for(let a=0;a<s.length;a++)a<e.__divergedChainIndex?a<i.length&&i[a].element&&(i[a].element.location=U(e,i[a].route)):(o=p(this,d,De).call(this,o,e,{prevent:oe,redirect:c},s[a]),s[a].element&&(s[a].element.location=U(e,s[a].route)));return await o.then(async a=>{if(a&&G(a)){if("cancel"in a&&this.__previousContext)return this.__previousContext.__renderId=e.__renderId,this.__previousContext;if("redirect"in a)return await p(this,d,Be).call(this,a.redirect,e.__redirectCount,e.__renderId)}return e})},Fe=async function(e,r,i,s){const o=U(r);let c=await e;if(p(this,d,H).call(this,r)&&(c=it("onBeforeLeave",s.element,o,i,this)(c)),!(G(c)&&"redirect"in c))return c},De=async function(e,r,i,s){const o=U(r,s.route),c=await e;if(p(this,d,H).call(this,r))return it("onBeforeEnter",s.element,o,i,this)(c)},ke=function(e,r){return e instanceof Element&&r instanceof Element?m(this,ne).has(e)&&m(this,ne).has(r)?e.localName===r.localName:e===r:!1},H=function(e){return e.__renderId===m(this,K)},Be=async function(e,r=0,i=0){if(r>kn)throw new Error(B(`Too many redirects when rendering ${e.from}`));return await this.resolve({...ht,pathname:this.urlForPath(e.pathname,e.params),redirectFrom:e.from,__redirectCount:r+1,__renderId:i})},Ve=function(e=m(this,k)){if(!(e instanceof Element||e instanceof DocumentFragment))throw new TypeError(B(`Expected router outlet to be a valid DOM Element | DocumentFragment (but got ${e})`))},Ae=function({pathname:e,search:r="",hash:i=""},s){if(window.location.pathname!==e||window.location.search!==r||window.location.hash!==i){const o=s?"replaceState":"pushState";window.history[o](null,document.title,e+r+i),window.dispatchEvent(new PopStateEvent("popstate",{state:"vaadin-router-ignore"}))}},ze=function(e,r){var s;let i=m(this,k);for(let o=0;o<(e.__divergedChainIndex??0);o++){const c=(s=r==null?void 0:r.chain)==null?void 0:s[o].element;if(c)if(c.parentNode===i)e.chain[o].element=c,i=c;else break}return i},Ft=function(e,r){var o;p(this,d,Ve).call(this),p(this,d,kt).call(this);const i=p(this,d,ze).call(this,e,r);b(this,O,[]),b(this,T,Array.from((i==null?void 0:i.children)??[]).filter(c=>m(this,me).has(c)&&c!==e.result));let s=i;for(let c=e.__divergedChainIndex??0;c<(((o=e.chain)==null?void 0:o.length)??0);c++){const a=e.chain[c].element;a&&(s==null||s.appendChild(a),m(this,me).add(a),s===i&&m(this,O).push(a),s=a)}},Dt=function(){if(m(this,T))for(const e of m(this,T))e.remove();b(this,T,null),b(this,O,null)},kt=function(){if(m(this,T)&&m(this,O)){for(const e of m(this,O))e.remove();b(this,T,null),b(this,O,null)}},Bt=function(e,r){var i;if(!(!(r!=null&&r.chain)||e.__divergedChainIndex==null))for(let s=r.chain.length-1;s>=e.__divergedChainIndex&&p(this,d,H).call(this,e);s--){const o=r.chain[s].element;if(o)try{const c=U(e);ve(o.onAfterLeave,o,c,{},this)}finally{if((i=m(this,T))!=null&&i.includes(o))for(const c of o.children)c.remove()}}},Vt=function(e){if(!(!e.chain||e.__divergedChainIndex==null))for(let r=e.__divergedChainIndex;r<e.chain.length&&p(this,d,H).call(this,e);r++){const i=e.chain[r].element;if(i){const s=U(e,e.chain[r].route);ve(i.onAfterEnter,i,s,{},this)}}},zt=async function(e){var a,u;const r=(a=m(this,T))==null?void 0:a[0],i=(u=m(this,O))==null?void 0:u[0],s=[],{chain:o=[]}=e;let c;for(let h=o.length-1;h>=0;h--)if(o[h].route.animate){c=o[h].route.animate;break}if(r&&i&&c){const h=G(c)&&c.leave?c.leave:"leaving",l=G(c)&&c.enter?c.enter:"entering";s.push(tt(r,h)),s.push(tt(i,l))}return await Promise.all(s),e},We=function(e){const{pathname:r,search:i,hash:s}=e instanceof CustomEvent?e.detail:window.location;L(this.__normalizePathname(r))&&(e!=null&&e.preventDefault&&e.preventDefault(),this.render({pathname:r,search:i,hash:s},!0))};/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Ee=globalThis,Ze=Ee.ShadowRoot&&(Ee.ShadyCSS===void 0||Ee.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Ke=Symbol(),ut=new WeakMap;let Wt=class{constructor(t,e,r){if(this._$cssResult$=!0,r!==Ke)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(Ze&&t===void 0){const r=e!==void 0&&e.length===1;r&&(t=ut.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),r&&ut.set(e,t))}return t}toString(){return this.cssText}};const Vn=n=>new Wt(typeof n=="string"?n:n+"",void 0,Ke),xe=(n,...t)=>{const e=n.length===1?n[0]:t.reduce((r,i,s)=>r+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+n[s+1],n[0]);return new Wt(e,n,Ke)},zn=(n,t)=>{if(Ze)n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const r=document.createElement("style"),i=Ee.litNonce;i!==void 0&&r.setAttribute("nonce",i),r.textContent=e.cssText,n.appendChild(r)}},dt=Ze?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(const r of t.cssRules)e+=r.cssText;return Vn(e)})(n):n;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:Wn,defineProperty:jn,getOwnPropertyDescriptor:Gn,getOwnPropertyNames:qn,getOwnPropertySymbols:Zn,getPrototypeOf:Kn}=Object,V=globalThis,ft=V.trustedTypes,Jn=ft?ft.emptyScript:"",Me=V.reactiveElementPolyfillSupport,le=(n,t)=>n,je={toAttribute(n,t){switch(t){case Boolean:n=n?Jn:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},jt=(n,t)=>!Wn(n,t),pt={attribute:!0,type:String,converter:je,reflect:!1,hasChanged:jt};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),V.litPropertyMetadata??(V.litPropertyMetadata=new WeakMap);class te extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=pt){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const r=Symbol(),i=this.getPropertyDescriptor(t,r,e);i!==void 0&&jn(this.prototype,t,i)}}static getPropertyDescriptor(t,e,r){const{get:i,set:s}=Gn(this.prototype,t)??{get(){return this[e]},set(o){this[e]=o}};return{get(){return i==null?void 0:i.call(this)},set(o){const c=i==null?void 0:i.call(this);s.call(this,o),this.requestUpdate(t,c,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??pt}static _$Ei(){if(this.hasOwnProperty(le("elementProperties")))return;const t=Kn(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(le("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(le("properties"))){const e=this.properties,r=[...qn(e),...Zn(e)];for(const i of r)this.createProperty(i,e[i])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[r,i]of e)this.elementProperties.set(r,i)}this._$Eh=new Map;for(const[e,r]of this.elementProperties){const i=this._$Eu(e,r);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const r=new Set(t.flat(1/0).reverse());for(const i of r)e.unshift(dt(i))}else t!==void 0&&e.push(dt(t));return e}static _$Eu(t,e){const r=e.attribute;return r===!1?void 0:typeof r=="string"?r:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const r of e.keys())this.hasOwnProperty(r)&&(t.set(r,this[r]),delete this[r]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return zn(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var r;return(r=e.hostConnected)==null?void 0:r.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var r;return(r=e.hostDisconnected)==null?void 0:r.call(e)})}attributeChangedCallback(t,e,r){this._$AK(t,r)}_$EC(t,e){var s;const r=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,r);if(i!==void 0&&r.reflect===!0){const o=(((s=r.converter)==null?void 0:s.toAttribute)!==void 0?r.converter:je).toAttribute(e,r.type);this._$Em=t,o==null?this.removeAttribute(i):this.setAttribute(i,o),this._$Em=null}}_$AK(t,e){var s;const r=this.constructor,i=r._$Eh.get(t);if(i!==void 0&&this._$Em!==i){const o=r.getPropertyOptions(i),c=typeof o.converter=="function"?{fromAttribute:o.converter}:((s=o.converter)==null?void 0:s.fromAttribute)!==void 0?o.converter:je;this._$Em=i,this[i]=c.fromAttribute(e,o.type),this._$Em=null}}requestUpdate(t,e,r){if(t!==void 0){if(r??(r=this.constructor.getPropertyOptions(t)),!(r.hasChanged??jt)(this[t],e))return;this.P(t,e,r)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(t,e,r){this._$AL.has(t)||this._$AL.set(t,e),r.reflect===!0&&this._$Em!==t&&(this._$Ej??(this._$Ej=new Set)).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var r;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[s,o]of this._$Ep)this[s]=o;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[s,o]of i)o.wrapped!==!0||this._$AL.has(s)||this[s]===void 0||this.P(s,this[s],o)}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(r=this._$EO)==null||r.forEach(i=>{var s;return(s=i.hostUpdate)==null?void 0:s.call(i)}),this.update(e)):this._$EU()}catch(i){throw t=!1,this._$EU(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(r=>{var i;return(i=r.hostUpdated)==null?void 0:i.call(r)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&(this._$Ej=this._$Ej.forEach(e=>this._$EC(e,this[e]))),this._$EU()}updated(t){}firstUpdated(t){}}te.elementStyles=[],te.shadowRootOptions={mode:"open"},te[le("elementProperties")]=new Map,te[le("finalized")]=new Map,Me==null||Me({ReactiveElement:te}),(V.reactiveElementVersions??(V.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const he=globalThis,Se=he.trustedTypes,mt=Se?Se.createPolicy("lit-html",{createHTML:n=>n}):void 0,Gt="$lit$",F=`lit$${Math.random().toFixed(9).slice(2)}$`,qt="?"+F,Qn=`<${qt}>`,X=document,de=()=>X.createComment(""),fe=n=>n===null||typeof n!="object"&&typeof n!="function",Je=Array.isArray,Xn=n=>Je(n)||typeof(n==null?void 0:n[Symbol.iterator])=="function",Oe=`[ 	
\f\r]`,ae=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,gt=/-->/g,_t=/>/g,j=RegExp(`>|${Oe}(?:([^\\s"'>=/]+)(${Oe}*=${Oe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),yt=/'/g,$t=/"/g,Zt=/^(?:script|style|textarea|title)$/i,Yn=n=>(t,...e)=>({_$litType$:n,strings:t,values:e}),Pe=Yn(1),re=Symbol.for("lit-noChange"),A=Symbol.for("lit-nothing"),vt=new WeakMap,q=X.createTreeWalker(X,129);function Kt(n,t){if(!Je(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return mt!==void 0?mt.createHTML(t):t}const er=(n,t)=>{const e=n.length-1,r=[];let i,s=t===2?"<svg>":t===3?"<math>":"",o=ae;for(let c=0;c<e;c++){const a=n[c];let u,h,l=-1,f=0;for(;f<a.length&&(o.lastIndex=f,h=o.exec(a),h!==null);)f=o.lastIndex,o===ae?h[1]==="!--"?o=gt:h[1]!==void 0?o=_t:h[2]!==void 0?(Zt.test(h[2])&&(i=RegExp("</"+h[2],"g")),o=j):h[3]!==void 0&&(o=j):o===j?h[0]===">"?(o=i??ae,l=-1):h[1]===void 0?l=-2:(l=o.lastIndex-h[2].length,u=h[1],o=h[3]===void 0?j:h[3]==='"'?$t:yt):o===$t||o===yt?o=j:o===gt||o===_t?o=ae:(o=j,i=void 0);const g=o===j&&n[c+1].startsWith("/>")?" ":"";s+=o===ae?a+Qn:l>=0?(r.push(u),a.slice(0,l)+Gt+a.slice(l)+F+g):a+F+(l===-2?c:g)}return[Kt(n,s+(n[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),r]};class pe{constructor({strings:t,_$litType$:e},r){let i;this.parts=[];let s=0,o=0;const c=t.length-1,a=this.parts,[u,h]=er(t,e);if(this.el=pe.createElement(u,r),q.currentNode=this.el.content,e===2||e===3){const l=this.el.content.firstChild;l.replaceWith(...l.childNodes)}for(;(i=q.nextNode())!==null&&a.length<c;){if(i.nodeType===1){if(i.hasAttributes())for(const l of i.getAttributeNames())if(l.endsWith(Gt)){const f=h[o++],g=i.getAttribute(l).split(F),_=/([.?@])?(.*)/.exec(f);a.push({type:1,index:s,name:_[2],strings:g,ctor:_[1]==="."?nr:_[1]==="?"?rr:_[1]==="@"?ir:Ce}),i.removeAttribute(l)}else l.startsWith(F)&&(a.push({type:6,index:s}),i.removeAttribute(l));if(Zt.test(i.tagName)){const l=i.textContent.split(F),f=l.length-1;if(f>0){i.textContent=Se?Se.emptyScript:"";for(let g=0;g<f;g++)i.append(l[g],de()),q.nextNode(),a.push({type:2,index:++s});i.append(l[f],de())}}}else if(i.nodeType===8)if(i.data===qt)a.push({type:2,index:s});else{let l=-1;for(;(l=i.data.indexOf(F,l+1))!==-1;)a.push({type:7,index:s}),l+=F.length-1}s++}}static createElement(t,e){const r=X.createElement("template");return r.innerHTML=t,r}}function ie(n,t,e=n,r){var o,c;if(t===re)return t;let i=r!==void 0?(o=e._$Co)==null?void 0:o[r]:e._$Cl;const s=fe(t)?void 0:t._$litDirective$;return(i==null?void 0:i.constructor)!==s&&((c=i==null?void 0:i._$AO)==null||c.call(i,!1),s===void 0?i=void 0:(i=new s(n),i._$AT(n,e,r)),r!==void 0?(e._$Co??(e._$Co=[]))[r]=i:e._$Cl=i),i!==void 0&&(t=ie(n,i._$AS(n,t.values),i,r)),t}class tr{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:r}=this._$AD,i=((t==null?void 0:t.creationScope)??X).importNode(e,!0);q.currentNode=i;let s=q.nextNode(),o=0,c=0,a=r[0];for(;a!==void 0;){if(o===a.index){let u;a.type===2?u=new _e(s,s.nextSibling,this,t):a.type===1?u=new a.ctor(s,a.name,a.strings,this,t):a.type===6&&(u=new sr(s,this,t)),this._$AV.push(u),a=r[++c]}o!==(a==null?void 0:a.index)&&(s=q.nextNode(),o++)}return q.currentNode=X,i}p(t){let e=0;for(const r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(t,r,e),e+=r.strings.length-2):r._$AI(t[e])),e++}}class _e{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,r,i){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=r,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=ie(this,t,e),fe(t)?t===A||t==null||t===""?(this._$AH!==A&&this._$AR(),this._$AH=A):t!==this._$AH&&t!==re&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):Xn(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==A&&fe(this._$AH)?this._$AA.nextSibling.data=t:this.T(X.createTextNode(t)),this._$AH=t}$(t){var s;const{values:e,_$litType$:r}=t,i=typeof r=="number"?this._$AC(t):(r.el===void 0&&(r.el=pe.createElement(Kt(r.h,r.h[0]),this.options)),r);if(((s=this._$AH)==null?void 0:s._$AD)===i)this._$AH.p(e);else{const o=new tr(i,this),c=o.u(this.options);o.p(e),this.T(c),this._$AH=o}}_$AC(t){let e=vt.get(t.strings);return e===void 0&&vt.set(t.strings,e=new pe(t)),e}k(t){Je(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let r,i=0;for(const s of t)i===e.length?e.push(r=new _e(this.O(de()),this.O(de()),this,this.options)):r=e[i],r._$AI(s),i++;i<e.length&&(this._$AR(r&&r._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var r;for((r=this._$AP)==null?void 0:r.call(this,!1,!0,e);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class Ce{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,r,i,s){this.type=1,this._$AH=A,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=s,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=A}_$AI(t,e=this,r,i){const s=this.strings;let o=!1;if(s===void 0)t=ie(this,t,e,0),o=!fe(t)||t!==this._$AH&&t!==re,o&&(this._$AH=t);else{const c=t;let a,u;for(t=s[0],a=0;a<s.length-1;a++)u=ie(this,c[r+a],e,a),u===re&&(u=this._$AH[a]),o||(o=!fe(u)||u!==this._$AH[a]),u===A?t=A:t!==A&&(t+=(u??"")+s[a+1]),this._$AH[a]=u}o&&!i&&this.j(t)}j(t){t===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class nr extends Ce{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===A?void 0:t}}class rr extends Ce{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==A)}}class ir extends Ce{constructor(t,e,r,i,s){super(t,e,r,i,s),this.type=5}_$AI(t,e=this){if((t=ie(this,t,e,0)??A)===re)return;const r=this._$AH,i=t===A&&r!==A||t.capture!==r.capture||t.once!==r.once||t.passive!==r.passive,s=t!==A&&(r===A||i);i&&this.element.removeEventListener(this.name,this,r),s&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class sr{constructor(t,e,r){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(t){ie(this,t)}}const Le=he.litHtmlPolyfillSupport;Le==null||Le(pe,_e),(he.litHtmlVersions??(he.litHtmlVersions=[])).push("3.2.1");const or=(n,t,e)=>{const r=(e==null?void 0:e.renderBefore)??t;let i=r._$litPart$;if(i===void 0){const s=(e==null?void 0:e.renderBefore)??null;r._$litPart$=i=new _e(t.insertBefore(de(),s),s,void 0,e??{})}return i._$AI(n),i};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class z extends te{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=or(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return re}}var wt;z._$litElement$=!0,z.finalized=!0,(wt=globalThis.litElementHydrateSupport)==null||wt.call(globalThis,{LitElement:z});const Ie=globalThis.litElementPolyfillSupport;Ie==null||Ie({LitElement:z});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.1.1");class ar extends z{render(){return Pe`<h1>Hello</h1>`}static get styles(){return xe`
			h1 {
				text-align: center;
			}
		`}}customElements.define("my-hello",ar);const cr="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20aria-hidden='true'%20role='img'%20class='iconify%20iconify--logos'%20width='25.6'%20height='32'%20preserveAspectRatio='xMidYMid%20meet'%20viewBox='0%200%20256%20320'%3e%3cpath%20fill='%2300E8FF'%20d='m64%20192l25.926-44.727l38.233-19.114l63.974%2063.974l10.833%2061.754L192%20320l-64-64l-38.074-25.615z'%3e%3c/path%3e%3cpath%20fill='%23283198'%20d='M128%20256V128l64-64v128l-64%2064ZM0%20256l64%2064l9.202-60.602L64%20192l-37.542%2023.71L0%20256Z'%3e%3c/path%3e%3cpath%20fill='%23324FFF'%20d='M64%20192V64l64-64v128l-64%2064Zm128%20128V192l64-64v128l-64%2064ZM0%20256V128l64%2064l-64%2064Z'%3e%3c/path%3e%3cpath%20fill='%230FF'%20d='M64%20320V192l64%2064z'%3e%3c/path%3e%3c/svg%3e",lr="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20xmlns:xlink='http://www.w3.org/1999/xlink'%20aria-hidden='true'%20role='img'%20class='iconify%20iconify--logos'%20width='31.88'%20height='32'%20preserveAspectRatio='xMidYMid%20meet'%20viewBox='0%200%20256%20257'%3e%3cdefs%3e%3clinearGradient%20id='IconifyId1813088fe1fbc01fb466'%20x1='-.828%25'%20x2='57.636%25'%20y1='7.652%25'%20y2='78.411%25'%3e%3cstop%20offset='0%25'%20stop-color='%2341D1FF'%3e%3c/stop%3e%3cstop%20offset='100%25'%20stop-color='%23BD34FE'%3e%3c/stop%3e%3c/linearGradient%3e%3clinearGradient%20id='IconifyId1813088fe1fbc01fb467'%20x1='43.376%25'%20x2='50.316%25'%20y1='2.242%25'%20y2='89.03%25'%3e%3cstop%20offset='0%25'%20stop-color='%23FFEA83'%3e%3c/stop%3e%3cstop%20offset='8.333%25'%20stop-color='%23FFDD35'%3e%3c/stop%3e%3cstop%20offset='100%25'%20stop-color='%23FFA800'%3e%3c/stop%3e%3c/linearGradient%3e%3c/defs%3e%3cpath%20fill='url(%23IconifyId1813088fe1fbc01fb466)'%20d='M255.153%2037.938L134.897%20252.976c-2.483%204.44-8.862%204.466-11.382.048L.875%2037.958c-2.746-4.814%201.371-10.646%206.827-9.67l120.385%2021.517a6.537%206.537%200%200%200%202.322-.004l117.867-21.483c5.438-.991%209.574%204.796%206.877%209.62Z'%3e%3c/path%3e%3cpath%20fill='url(%23IconifyId1813088fe1fbc01fb467)'%20d='M185.432.063L96.44%2017.501a3.268%203.268%200%200%200-2.634%203.014l-5.474%2092.456a3.268%203.268%200%200%200%203.997%203.378l24.777-5.718c2.318-.535%204.413%201.507%203.936%203.838l-7.361%2036.047c-.495%202.426%201.782%204.5%204.151%203.78l15.304-4.649c2.372-.72%204.652%201.36%204.15%203.788l-11.698%2056.621c-.732%203.542%203.979%205.473%205.943%202.437l1.313-2.028l72.516-144.72c1.215-2.423-.88-5.186-3.54-4.672l-25.505%204.922c-2.396.462-4.435-1.77-3.759-4.114l16.646-57.705c.677-2.35-1.37-4.583-3.769-4.113Z'%3e%3c/path%3e%3c/svg%3e";class hr extends z{static get properties(){return{docsHint:{type:String},count:{type:Number}}}constructor(){super(),this.docsHint="Click on the Vite and Lit logos to learn more",this.count=0}render(){return Pe`
			<div>
				<a href="https://vite.dev" router-ignore target="_blank">
					<img src=${lr} class="logo" alt="Vite logo" />
				</a>
				<a href="https://lit.dev" router-ignore target="_blank">
					<img src=${cr} class="logo lit" alt="Lit logo" />
				</a>
			</div>
			<slot></slot>
			<div class="card">
				<button @click=${this._onClick} part="button">
					count is ${this.count}
				</button>
			</div>
			<p class="read-the-docs">${this.docsHint}</p>
		`}_onClick(){this.count++}static get styles(){return xe`
			:host {
				max-width: 1280px;
				margin: 0 auto;
				padding: 2rem;
				text-align: center;
			}

			.logo {
				height: 6em;
				padding: 1.5em;
				will-change: filter;
				transition: filter 300ms;
			}
			.logo:hover {
				filter: drop-shadow(0 0 2em #646cffaa);
			}
			.logo.lit:hover {
				filter: drop-shadow(0 0 2em #325cffaa);
			}

			.card {
				padding: 2em;
			}

			.read-the-docs {
				color: #888;
			}

			a {
				font-weight: 500;
				color: #646cff;
				text-decoration: inherit;
			}
			a:hover {
				color: #535bf2;
			}

			::slotted(h1) {
				font-size: 3.2em;
				line-height: 1.1;
			}

			button {
				border-radius: 8px;
				border: 1px solid transparent;
				padding: 0.6em 1.2em;
				font-size: 1em;
				font-weight: 500;
				font-family: inherit;
				background-color: #1a1a1a;
				cursor: pointer;
				transition: border-color 0.25s;
			}
			button:hover {
				border-color: #646cff;
			}
			button:focus,
			button:focus-visible {
				outline: 4px auto -webkit-focus-ring-color;
			}

			@media (prefers-color-scheme: light) {
				a:hover {
					color: #747bff;
				}
				button {
					background-color: #f9f9f9;
				}
			}
		`}}window.customElements.define("my-element",hr);class ur extends z{connectedCallback(){super.connectedCallback(),this.userId=Jt.location.getUrl().split("/").pop()}render(){return Pe` <h1>Hello User ${this.userId}</h1>`}static get styles(){return xe`
			h1 {
				text-align: center;
			}
		`}}customElements.define("my-user",ur);const dr=document.querySelector("#outlet"),Jt=new Bn(dr),D="/simple-project/";Jt.setRoutes([{path:`${D}`,component:"my-hello"},{path:`${D}element`,component:"my-element"},{path:`${D}users/:user`,component:"my-user"}]);class fr extends z{render(){return Pe`
			<nav>
				<a href="${D}">Hello</a>
				<a href="${D}element">Counter</a>
				<a href="${D}users/1">User 1</a>
				<a href="${D}users/2">User 2</a>
				<a href="${D}users/5">User 5</a>
			</nav>
		`}static get styles(){return xe`
			nav {
				width: 100%;
				display: flex;
				justify-content: space-evenly;
				position: sticky;
				z-index: 1;
				align-items: center;
				background: blue;
				top: 0;
			}

			nav a {
				padding: 10px;
				flex-grow: 1;
				border: solid 1px lightblue;
				text-align: center;
			}
		`}}customElements.define("navigation-bar",fr);
