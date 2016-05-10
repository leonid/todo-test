webpackJsonp([1],[function(t,e,o){t.exports=o(6)},,,function(t,e,o){o(4),t.exports="LocalStorageModule"},function(t,e){var o=angular.isDefined,r=angular.isUndefined,n=angular.isNumber,i=angular.isObject,a=angular.isArray,s=angular.extend,c=angular.toJson;angular.module("LocalStorageModule",[]).provider("localStorageService",function(){this.prefix="ls",this.storageType="localStorage",this.cookie={expiry:30,path:"/"},this.notify={setItem:!0,removeItem:!1},this.setPrefix=function(t){return this.prefix=t,this},this.setStorageType=function(t){return this.storageType=t,this},this.setStorageCookie=function(t,e){return this.cookie.expiry=t,this.cookie.path=e,this},this.setStorageCookieDomain=function(t){return this.cookie.domain=t,this},this.setNotify=function(t,e){return this.notify={setItem:t,removeItem:e},this},this.$get=["$rootScope","$window","$document","$parse",function(t,e,u,l){var d,f=this,g=f.prefix,h=f.cookie,p=f.notify,m=f.storageType;u?u[0]&&(u=u[0]):u=document,"."!==g.substr(-1)&&(g=g?g+".":"");var v=function(t){return g+t},y=function(){try{var o=m in e&&null!==e[m],r=v("__"+Math.round(1e7*Math.random()));return o&&(d=e[m],d.setItem(r,""),d.removeItem(r)),o}catch(n){return m="cookie",t.$broadcast("LocalStorageModule.notification.error",n.message),!1}}(),S=function(e,o){if(o=r(o)?null:c(o),!y||"cookie"===f.storageType)return y||t.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),p.setItem&&t.$broadcast("LocalStorageModule.notification.setitem",{key:e,newvalue:o,storageType:"cookie"}),_(e,o);try{d&&d.setItem(v(e),o),p.setItem&&t.$broadcast("LocalStorageModule.notification.setitem",{key:e,newvalue:o,storageType:f.storageType})}catch(n){return t.$broadcast("LocalStorageModule.notification.error",n.message),_(e,o)}return!0},b=function(e){if(!y||"cookie"===f.storageType)return y||t.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),M(e);var o=d?d.getItem(v(e)):null;if(!o||"null"===o)return null;try{return JSON.parse(o)}catch(r){return o}},T=function(){var e,o;for(e=0;e<arguments.length;e++)if(o=arguments[e],y&&"cookie"!==f.storageType)try{d.removeItem(v(o)),p.removeItem&&t.$broadcast("LocalStorageModule.notification.removeitem",{key:o,storageType:f.storageType})}catch(r){t.$broadcast("LocalStorageModule.notification.error",r.message),L(o)}else y||t.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),p.removeItem&&t.$broadcast("LocalStorageModule.notification.removeitem",{key:o,storageType:"cookie"}),L(o)},k=function(){if(!y)return t.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),[];var e=g.length,o=[];for(var r in d)if(r.substr(0,e)===g)try{o.push(r.substr(e))}catch(n){return t.$broadcast("LocalStorageModule.notification.error",n.Description),[]}return o},O=function(e){var o=g?RegExp("^"+g):RegExp(),r=e?RegExp(e):RegExp();if(!y||"cookie"===f.storageType)return y||t.$broadcast("LocalStorageModule.notification.warning","LOCAL_STORAGE_NOT_SUPPORTED"),$();var n=g.length;for(var i in d)if(o.test(i)&&r.test(i.substr(n)))try{T(i.substr(n))}catch(a){return t.$broadcast("LocalStorageModule.notification.error",a.message),$()}return!0},x=function(){try{return e.navigator.cookieEnabled||"cookie"in u&&(u.cookie.length>0||(u.cookie="test").indexOf.call(u.cookie,"test")>-1)}catch(o){return t.$broadcast("LocalStorageModule.notification.error",o.message),!1}}(),_=function(e,o,s){if(r(o))return!1;if((a(o)||i(o))&&(o=c(o)),!x)return t.$broadcast("LocalStorageModule.notification.error","COOKIES_NOT_SUPPORTED"),!1;try{var l="",d=new Date,f="";if(null===o?(d.setTime(d.getTime()+-864e5),l="; expires="+d.toGMTString(),o=""):n(s)&&0!==s?(d.setTime(d.getTime()+24*s*60*60*1e3),l="; expires="+d.toGMTString()):0!==h.expiry&&(d.setTime(d.getTime()+24*h.expiry*60*60*1e3),l="; expires="+d.toGMTString()),e){var g="; path="+h.path;h.domain&&(f="; domain="+h.domain),u.cookie=v(e)+"="+encodeURIComponent(o)+l+g+f}}catch(p){return t.$broadcast("LocalStorageModule.notification.error",p.message),!1}return!0},M=function(e){if(!x)return t.$broadcast("LocalStorageModule.notification.error","COOKIES_NOT_SUPPORTED"),!1;for(var o=u.cookie&&u.cookie.split(";")||[],r=0;r<o.length;r++){for(var n=o[r];" "===n.charAt(0);)n=n.substring(1,n.length);if(0===n.indexOf(v(e)+"=")){var i=decodeURIComponent(n.substring(g.length+e.length+1,n.length));try{return JSON.parse(i)}catch(a){return i}}}return null},L=function(t){_(t,null)},$=function(){for(var t=null,e=g.length,o=u.cookie.split(";"),r=0;r<o.length;r++){for(t=o[r];" "===t.charAt(0);)t=t.substring(1,t.length);var n=t.substring(e,t.indexOf("="));L(n)}},E=function(){return m},I=function(t,e,r,n){n=n||e;var a=b(n);return null===a&&o(r)?a=r:i(a)&&i(r)&&(a=s(a,r)),l(e).assign(t,a),t.$watch(e,function(t){S(n,t)},i(t[e]))},P=function(){for(var t=0,o=e[m],r=0;r<o.length;r++)0===o.key(r).indexOf(g)&&t++;return t};return{isSupported:y,getStorageType:E,set:S,add:S,get:b,keys:k,remove:T,clearAll:O,bind:I,deriveKey:v,length:P,cookie:{isSupported:x,set:_,add:_,get:M,remove:L,clearAll:$}}}]})},,function(t,e,o){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}o(12);var n=o(2),i=r(n);o(1),o(3);var a=o(7),s=r(a),c=o(8),u=r(c);i["default"].module("app",["ui.router","LocalStorageModule",u["default"]]).config(s["default"])},function(t,e){"use strict";function o(t,e){e.html5Mode(!0),t.otherwise("/")}Object.defineProperty(e,"__esModule",{value:!0}),e["default"]=o,o.$inject=["$urlRouterProvider","$locationProvider"]},function(t,e,o){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}Object.defineProperty(e,"__esModule",{value:!0}),o(11);var n=o(10),i=r(n),a=o(9),s=r(a);e["default"]=angular.module("app.todo",[]).config(i["default"]).controller("TodoController",s["default"]).name},function(t,e){"use strict";function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(t,e){for(var o=0;o<e.length;o++){var r=e[o];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,o,r){return o&&t(e.prototype,o),r&&t(e,r),e}}(),n=function(){function t(){o(this,t),this.saved=localStorage.getItem("todos"),this.todos=null!==localStorage.getItem("todos")?JSON.parse(this.saved):[{text:"Learn AngularJS",done:!1},{text:"Build an Angular app",done:!1}],localStorage.setItem("todos",JSON.stringify(this.todos))}return r(t,[{key:"addTodo",value:function(){var t=this.todoText||"Заголовок";this.todos.push({text:t,done:!1}),this.todoText="",localStorage.setItem("todos",JSON.stringify(this.todos))}},{key:"remaining",value:function(){var t=0;return angular.forEach(this.todos,function(e){t+=e.done?0:1}),t}},{key:"archive",value:function(){var t=this.todos;this.todos=[],angular.forEach(t,function(t){t.done||this.todos.push(t)}),localStorage.setItem("todos",JSON.stringify(this.todos))}},{key:"editTask",value:function(t){this.todos[t].isEdit=!0,this.editable=this.todos[t].text}},{key:"saveTask",value:function(t){this.todos[t].isEdit=!1,this.todos[t].text=this.editable,localStorage.setItem("todos",JSON.stringify(this.todos)),this.editable=""}}]),t}();e["default"]=n},function(t,e,o){"use strict";function r(t){return t&&t.__esModule?t:{"default":t}}function n(t){t.state("todo",{url:"/",template:a["default"],controller:"TodoController",controllerAs:"vm"})}Object.defineProperty(e,"__esModule",{value:!0}),e["default"]=n;var i=o(13),a=r(i);n.$inject=["$stateProvider"]},function(t,e){},11,function(t,e){t.exports='<div class=container> <section class=app-body> <section class=archive-control> <span>Осталось {{ vm.remaining() }} задач из {{ vm.todos.length }}</span> <p>[ <a href="" ng-click=vm.archive()>Удалить завершенные</a> ]</p> </section> <ul class=unstyled> <li data-ng-repeat="todo in vm.todos track by $index"> <input type=checkbox ng-model=vm.todo.done> <span ng-if=!todo.isEdit class="done-{{ todo.done }}" ng-click=vm.editTask($index)>{{ todo.text }}</span> <div ng-if=todo.isEdit> <input type=text ng-model=vm.editable /> <button class="btn btn-success" ng-click=vm.saveTask($index)>Изменить</button> </div> </li> </ul> <form ng-submit=vm.addTodo() class=todo-form> <input type=text ng-model=vm.todoText placeholder="Введите новую задачу"/> <br/> <input type=submit value="Добавить задачу"/> </form> </section> </div>'}]);