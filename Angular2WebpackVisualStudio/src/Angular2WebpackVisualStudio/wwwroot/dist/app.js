webpackJsonp([0],{

/***/ 0:
/*!*****************************!*\
  !*** ./angular2App/boot.ts ***!
  \*****************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var platform_browser_dynamic_1 = __webpack_require__(/*! @angular/platform-browser-dynamic */ 1);
	var http_1 = __webpack_require__(/*! @angular/http */ 280);
	var router_1 = __webpack_require__(/*! @angular/router */ 301);
	var app_component_1 = __webpack_require__(/*! ./app/app.component */ 323);
	var app_constants_1 = __webpack_require__(/*! ./app/app.constants */ 328);
	platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [
	    router_1.ROUTER_PROVIDERS,
	    http_1.HTTP_PROVIDERS,
	    app_constants_1.Configuration,
	]);


/***/ },

/***/ 323:
/*!******************************************!*\
  !*** ./angular2App/app/app.component.ts ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(/*! @angular/core */ 7);
	var router_1 = __webpack_require__(/*! @angular/router */ 301);
	var home_component_1 = __webpack_require__(/*! ./home/home.component */ 324);
	var AppComponent = (function () {
	    function AppComponent(router) {
	        this.router = router;
	    }
	    AppComponent.prototype.ngOnInit = function () {
	        this.router.navigate(['/home']);
	    };
	    AppComponent = __decorate([
	        core_1.Component({
	            selector: 'my-app',
	            template: __webpack_require__(/*! ./app.component.html */ 326),
	            styles: [__webpack_require__(/*! ./app.component.scss */ 327)],
	            directives: [router_1.ROUTER_DIRECTIVES]
	        }),
	        router_1.Routes([
	            { path: '/home', component: home_component_1.HomeComponent }
	        ]), 
	        __metadata('design:paramtypes', [router_1.Router])
	    ], AppComponent);
	    return AppComponent;
	}());
	exports.AppComponent = AppComponent;


/***/ },

/***/ 324:
/*!************************************************!*\
  !*** ./angular2App/app/home/home.component.ts ***!
  \************************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(/*! @angular/core */ 7);
	var common_1 = __webpack_require__(/*! @angular/common */ 181);
	var HomeComponent = (function () {
	    function HomeComponent() {
	        this.message = "home.component";
	    }
	    HomeComponent.prototype.ngOnInit = function () {
	        console.log("ngOnInit HomeComponent");
	    };
	    HomeComponent = __decorate([
	        core_1.Component({
	            selector: 'homecomponent',
	            template: __webpack_require__(/*! ./home.component.html */ 325),
	            directives: [common_1.CORE_DIRECTIVES]
	        }), 
	        __metadata('design:paramtypes', [])
	    ], HomeComponent);
	    return HomeComponent;
	}());
	exports.HomeComponent = HomeComponent;


/***/ },

/***/ 325:
/*!**************************************************!*\
  !*** ./angular2App/app/home/home.component.html ***!
  \**************************************************/
/***/ function(module, exports) {

	module.exports = "<div class=\"panel-group\">\r\n\r\n    <p>hello home</p>\r\n\r\n</div>"

/***/ },

/***/ 326:
/*!********************************************!*\
  !*** ./angular2App/app/app.component.html ***!
  \********************************************/
/***/ function(module, exports) {

	module.exports = "<div class=\"container\" style=\"margin-top: 15px;\">\r\n   \r\n    <nav class=\"navbar navbar-inverse\">\r\n        <div class=\"container-fluid\">\r\n            <div class=\"navbar-header\">\r\n                <a [routerLink]=\"['/home']\" class=\"navbar-brand\"><img src=\"../images/damienbod.jpg\" height=\"40\" style=\"margin-top:-10px;\" /></a>\r\n            </div>\r\n            <ul class=\"nav navbar-nav\">\r\n                <li><a [routerLink]=\"['/home']\">Home</a></li>\r\n            </ul>\r\n        </div>\r\n    </nav>\r\n\r\n    <router-outlet></router-outlet>\r\n\r\n</div>\r\n\r\n\r\n"

/***/ },

/***/ 327:
/*!********************************************!*\
  !*** ./angular2App/app/app.component.scss ***!
  \********************************************/
/***/ function(module, exports) {

	module.exports = "body {\n  padding-top: 50px; }\n\n.starter-template {\n  padding: 40px 15px;\n  text-align: center; }\n\n.navigationLinkButton:hover {\n  cursor: pointer; }\n"

/***/ },

/***/ 328:
/*!******************************************!*\
  !*** ./angular2App/app/app.constants.ts ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
	    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	    return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
	var __metadata = (this && this.__metadata) || function (k, v) {
	    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
	var core_1 = __webpack_require__(/*! @angular/core */ 7);
	var Configuration = (function () {
	    function Configuration() {
	        this.Server = "http://localhost:5000/";
	    }
	    Configuration = __decorate([
	        core_1.Injectable(), 
	        __metadata('design:paramtypes', [])
	    ], Configuration);
	    return Configuration;
	}());
	exports.Configuration = Configuration;


/***/ }

});
//# sourceMappingURL=app.js.map