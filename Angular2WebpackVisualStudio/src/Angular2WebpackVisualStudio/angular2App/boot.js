"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var http_1 = require('@angular/http');
var router_1 = require('@angular/router');
var app_component_1 = require('./app/app.component');
var app_constants_1 = require('./app/app.constants');
platform_browser_dynamic_1.bootstrap(app_component_1.AppComponent, [
    router_1.ROUTER_PROVIDERS,
    http_1.HTTP_PROVIDERS,
    app_constants_1.Configuration,
]);
//# sourceMappingURL=boot.js.map