This article shows how <a href="http://webpack.github.io/docs/">Webpack </a>could be used together with <a href="https://www.visualstudio.com/">Visual Studio</a> ASP.NET Core and <a href="https://angular.io/docs/ts/latest/quickstart.html">Angular2</a>. Both the client and the server side of the application is implemented inside one ASP.NET Core project which makes it easier to deploy.

<img src="https://damienbod.files.wordpress.com/2016/06/vs_webpack_angular2.png?w=600" alt="vs_webpack_angular2" width="600" height="225" class="alignnone size-medium wp-image-6700" />

## Code
[https://github.com/damienbod/Angular2WebpackVisualStudio](https://github.com/damienbod/Angular2WebpackVisualStudio)

## Authors
<img src="https://avatars.githubusercontent.com/u/11268349?v=3" width="70">
<img src="https://avatars.githubusercontent.com/u/3442158?v=3" width="70">
<img src="https://pbs.twimg.com/profile_images/707847627992338432/ytT_FxUY_400x400.jpg" width="70" alt="Roberto Simonetti">

_[Fabian Gosebrink](https://twitter.com/FabianGosebrink), [Damien Bowden](https://twitter.com/damien_bod), [Roberto Simonetti](https://twitter.com/robisim74)_.
This post is hosted on both [http://damienbod.com](http://damienbod.com) and [http://offering.solutions/](http://offering.solutions/)

* **2016.12.20:** Updated to Angular 2.4.0
* **2016.11.16:** Updated to Angular 2.2.0
* **2016.10.24:** Using AoT, tree shaking, updated to webpack 2, switched to @types: removed tsd & typings
* **2016.10.16:** Updated to Angular 2.1.0, typings, Webpack SASS build
* **2016.10.01** Updated to Angular 2.0.1, typings
* **2016.09.15** Updated to Angular2 release and ASP.NET Core 1.0.1
* **2016.09.03** Updated to Angular2 rc.6
* **2016.08.12** Updated to Angular2 rc.5 and split webpack file.
* **2016.07.02** Updated to Angular2 rc.4
* **2016.06.29** Updated to ASP.NET Core RTM
* **2016.06.26** Updated to Angular 2 rc.3 and new routing
* **2016.06.17** Updated to Angular 2 rc.2

## Setting up the application

The ASP.NET Core application contains both the server side API services and also hosts the Angular client application. The source code for the Angular application is implemented in the angular2App folder. Webpack is then used to deploy the application, using the development build or a production build, which deploys the application to the wwwroot folder. This makes it easy to deploy the application using the standard tools from Visual Studio with the standard configurations.

## npm configuration

The npm package.json configuration loads all the required packages for Angular and Webpack. The Webpack packages are all added to the devDependencies. A "npm build" script and also a "npm buildProduction" are also configured, so that the client application can be built using Webpack from the cmd line using "npm build" or "npm buildProduction". These two scripts just call the same cmd as the Webpack task runner.

```javascript
{
    "version": "1.0.0",
    "description": "",
    "main": "wwwroot/index.html",
    "author": "",
    "license": "ISC",
    "scripts": {
        "ngc": "ngc -p ./tsconfig-aot.json",
        "start": "concurrently \"webpack-dev-server --inline --progress --port 8080\" \"dotnet run\" ",
        "webpack-dev": "set NODE_ENV=development&& webpack",
        "webpack-prod": "set NODE_ENV=production&& webpack",
        "build": "npm run webpack-dev",
        "buildProduction": "npm run ngc && npm run webpack-prod"
    },
    "dependencies": {
        "@angular/common": "~2.4.0",
        "@angular/compiler": "~2.4.0",
        "@angular/core": "~2.4.0",
        "@angular/forms": "~2.4.0",
        "@angular/http": "~2.4.0",
        "@angular/platform-browser": "~2.4.0",
        "@angular/platform-browser-dynamic": "~2.4.0",
        "@angular/router": "~3.4.0",
        "@angular/upgrade": "~2.4.0",
        "angular-in-memory-web-api": "~0.1.15",
        "core-js": "^2.4.1",
        "reflect-metadata": "^0.1.8",
        "rxjs": "5.0.1",
        "zone.js": "^0.7.4",
        "@angular/compiler-cli": "2.4.0",
        "@angular/platform-server": "~2.4.0",
        "bootstrap": "^3.3.7",
        "ie-shim": "^0.1.0"
    },
    "devDependencies": {
        "@types/node": "^6.0.52",
        "angular2-template-loader": "^0.5.0",
        "awesome-typescript-loader": "^2.2.4",
        "clean-webpack-plugin": "^0.1.9",
        "concurrently": "^3.1.0",
        "copy-webpack-plugin": "^2.1.3",
        "css-loader": "^0.23.0",
        "file-loader": "^0.8.4",
        "html-webpack-plugin": "^2.8.1",
        "jquery": "^2.2.0",
        "json-loader": "^0.5.3",
        "node-sass": "^3.10.1",
        "raw-loader": "^0.5.1",
        "rimraf": "^2.5.2",
        "sass-loader": "^4.0.2",
        "source-map-loader": "^0.1.5",
        "style-loader": "^0.13.0",
        "ts-helpers": "^1.1.1",
        "typescript": "2.0.3",
        "url-loader": "^0.5.6",
        "webpack": "^2.2.0-rc.1",
        "webpack-dev-server": "^1.16.2"
    }
}
```


## tsconfig configuration

The tsconfig is configured to use commonjs as the module. The types are configured in this file, so typings are no longer required.

```javascript
{
  "compilerOptions": {
    "target": "es5",
    "module": "es2015",
    "moduleResolution": "node",
    "sourceMap": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "removeComments": true,
    "noImplicitAny": true,
    "skipLibCheck": true,
    "lib": [
      "es2015",
      "dom"
    ],
    "types": [
      "node"
    ]
  },
  "files": [
    "angular2App/app/app.module.ts",
    "angular2App/main.ts"
  ],
  "awesomeTypescriptLoaderOptions": {
    "useWebpackText": true
  },
  "compileOnSave": false,
  "buildOnSave": false
}

```

## Webpack build

The Webpack development build <em>&gt;webpack -d</em> just uses the source files and creates outputs for development. The production build copies everything required for the client application to the wwwroot folder, and uglifies the js files. The <em>webpack -d --watch</em> can be used to automatically build the dist files if a source file is changed.

The Webpack config file was created using the excellent github repository https://github.com/preboot/angular2-webpack. Thanks for this. Small changes were made to this, such as the process.env.NODE_ENV and Webpack uses different source and output folders to match the ASP.NET Core project. If you decide to use two different projects, one for server, and one for client,  preboot or angular-cli, or both together would be a good choice for the client application.

### webpack.config.js


```javascript
/// <binding ProjectOpened='Run - Development' />

var environment = (process.env.NODE_ENV || "development").trim();

if (environment === "development") {
    module.exports = require('./webpack.dev.js');
} else {
    module.exports = require('./webpack.prod.js');
}

```

### webpack.dev.js


```javascript
var path = require('path');

var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

console.log("@@@@@@@@@ USING DEVELOPMENT @@@@@@@@@@@@@@@");

module.exports = {

    devtool: 'source-map',
    performance: {
        hints: false
    },
    entry: {
        'app': './angular2App/main.ts' // JiT compilation
    },

    output: {
        path: "./wwwroot/",
        filename: 'dist/[name].bundle.js',
        publicPath: "/"
    },

    resolve: {
        extensions: ['.ts', '.js', '.json', '.css', '.scss', '.html']
    },

    devServer: {
        historyApiFallback: true,
        stats: 'minimal',
        outputPath: path.join(__dirname, 'wwwroot/')
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: [
                    'awesome-typescript-loader',
                    'angular2-template-loader',
                    'source-map-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|woff|woff2|ttf|svg|eot)$/,
                loader: "file-loader?name=assets/[name]-[hash:6].[ext]",
            },
            {
                test: /favicon.ico$/,
                loader: "file-loader?name=/[name].[ext]",
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.html$/,
                loader: 'raw-loader'
            }
        ],
        exprContextCritical: false
    },

    plugins: [
        new CleanWebpackPlugin(
            [
                './wwwroot/dist',
                './wwwroot/assets'
            ]
        ),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            inject: 'body',
            template: 'angular2App/index.html'
        }),

        new CopyWebpackPlugin([
            { from: './angular2App/images/*.*', to: "assets/", flatten: true }
        ])
    ]

};
```

### webpack.prod.js


```javascript
var path = require('path');

var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var helpers = require('./webpack.helpers');

console.log("@@@@@@@@@ USING PRODUCTION @@@@@@@@@@@@@@@");

module.exports = {

    entry: {
        'vendor': './angular2App/vendor.ts',
        'app': './angular2App/main-aot.ts' // AoT compilation
    },

    output: {
        path: "./wwwroot/",
        filename: 'dist/[name].[hash].bundle.js',
        publicPath: "/"
    },

    resolve: {
        extensions: ['.ts', '.js', '.json', '.css', '.scss', '.html']
    },

    devServer: {
        historyApiFallback: true,
        stats: 'minimal',
        outputPath: path.join(__dirname, 'wwwroot/')
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: [
                    'awesome-typescript-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|woff|woff2|ttf|svg|eot)$/,
                loader: "file-loader?name=assets/[name]-[hash:6].[ext]",
            },
            {
                test: /favicon.ico$/,
                loader: "file-loader?name=/[name].[ext]",
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.html$/,
                loader: 'raw-loader'
            }
        ],
        exprContextCritical: false
    },

    plugins: [
        new CleanWebpackPlugin(
            [
                './wwwroot/dist',
                './wwwroot/assets'
            ]
        ),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            },
            sourceMap: false
        }),
        new webpack.optimize.CommonsChunkPlugin(
            {
                name: ['vendor']
            }),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            inject: 'body',
            chunksSortMode: helpers.packageSort(['vendor', 'app']),
            template: 'angular2App/index.html'
        }),

        new CopyWebpackPlugin([
            { from: './angular2App/images/*.*', to: "assets/", flatten: true }
        ])
    ]
};
```


## Webpack Production build

The production build has to be run from the command line. At present ngc, the angular compiler, can only be used from the command line. 

https://github.com/angular/angular/tree/master/modules/%40angular/compiler-cli

See also (Using ngc) http://blog.mgechev.com/2016/06/26/tree-shaking-angular2-production-build-rollup-javascript/ 

It can be run using npm run buildProduction which is configured in the package.json.

```
"buildProduction": "npm run ngc && npm run webpack-prod"
```


The production build uses tsconfig-aot.json and main-aot.ts as an entry point.

```javascript
{
  "compilerOptions": {
    "target": "es5",
    "module": "es2015",
    "moduleResolution": "node",
    "sourceMap": false,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "removeComments": true,
    "noImplicitAny": true,
    "suppressImplicitAnyIndexErrors": true,
    "skipLibCheck": true,
    "lib": [
      "es2015",
      "dom"
    ]
  },
  "files": [
    "angular2App/app/app.module.ts",
    "angular2App/main-aot.ts"
  ],
  "angularCompilerOptions": {
    "genDir": "aot",
    "skipMetadataEmit": true
  },
  "compileOnSave": false,
  "buildOnSave": false
}
```


Lets dive into the webpack.dev.js a bit:

Firstly, all plugins are loaded which are required to process all the js, ts, ... files which are included, or used in the project.


```javascript
var path = require('path');

var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
```

The npm environment variable NODE_ENV is used to define the type of build, either a development build or a production build. The entries are configured depending on this parameter.

```javascript
    entry: {
        'app': './angular2App/main.ts' // JiT compilation
    },
```

for webpack.prod.js

```javascript
    entry: {
        'app': './angular2App/main-aot.ts' // AoT compilation
    },
```

The entries provide Webpack with the required information, where to start from, or where to hook in to.

Webpack knows which paths to run and includes the corresponding files and packages.

The "loaders" section and the "modules" section in the configuration provides Webpack with the following information: which files it needs to get and how to read the files. The modules tells Webpack what to do with the files exactly. Like minifying or whatever.

In this project configuration, if a production node parameter is set, different plugins are pushed into the sections because the files should be treated differently.

### The output
```javascript
output: {
        path: "./wwwroot/",
        filename: 'dist/[name].bundle.js',
        publicPath: "/"
    },
```

output for production adds a hash:

```javascript
output: {
        path: "./wwwroot/",
        filename: 'dist/[name].[hash].bundle.js',
        publicPath: "/"
    },
```

tells webpack where to put the files in the end. You can use like wildcards to use the "name" or an "hash" or something like that.


### The module loaders

```javascript
module: {
        rules: [
           //...loaders here
        ]
    },
```

tell webpack how to react when a certain file extension comes into play. It will then use loaders to handle that file.

The plugins you are providing in the end are necessary to configure how the files should be processed.

```javascript

    plugins: [
        //...loaders here
    ]

```

## Angular index.html

The index.html contains all the references required for the Angular client. The scripts are added as part of the build and not manually. The developer only needs to use the imports.

Source index.html file in the angular2App/public folder:

```
<!doctype html>
<html>
<head>
    <base href="./">

    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Angular Webpack Template</title>

    <meta http-equiv="content-type" content="text/html; charset=utf-8" />

    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

</head>
<body>
    <my-app>Loading...</my-app>
</body>
</html>
```

And the produced build file in the wwwroot folder. The script for the app has been added using Webpack. Hashes are used in a production build for cache busting.

```
<!doctype html>
<html>
<head>
    <base href="./">

    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Angular Webpack Template</title>

    <meta http-equiv="content-type" content="text/html; charset=utf-8" />

    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <link rel="stylesheet" href="css/bootstrap.css">
</head>
<body>
    <my-app>Loading...</my-app>
<script type="text/javascript" src="/dist/app.bundle.js"></script></body>
</html>

```


## Visual Studio Tools

<a href="https://visualstudiogallery.msdn.microsoft.com/5497fd10-b1ba-474c-8991-1438ae47012a">Webpack task runner </a> from Mads Kristensen can be downloaded and used to send Webpack commands using the webpack.config.js file. The node NODE_ENV parameter is used to define the build type. The parameter can be set to "development", or "production". 

<img src="https://damienbod.files.wordpress.com/2016/06/vs_webpack_angular2_02.png?w=600" alt="vs_webpack_angular2_02" width="600" height="431" class="alignnone size-medium wp-image-6716" />

The Webpack task runner can also be used by double clicking the task. The execution results are then displayed in the task runner console.

<img src="https://damienbod.files.wordpress.com/2016/06/vs_webpack_angular2_03.png?w=600" alt="vs_webpack_angular2_03" width="600" height="231" class="alignnone size-medium wp-image-6717" />

This runner provides a number of useful commands which can be activated automatically. These tasks can be attached to Visual Studio events by right clicking the task and selecting a binding. This adds a binding tag to the webpack.config.js file.

```
/// <binding ProjectOpened='Run - Development' />
```

### Webpack SASS

<a href="http://sass-lang.com/">SASS</a> is used to style the SPA application. The SASS files can be built using the SASS. Webpack can build all the styles inline or as an external file, depending on your Webpack config.

```javascript
{
  test: /\.scss$/,
  exclude: /node_modules/,
  loaders: ["style", "css", "sass"]
},
```

See: https://damienbod.com/2016/10/14/using-sass-with-webpack-angular2-and-visual-studio/

### Webpack Clean

<a href="https://github.com/johnagan/clean-webpack-plugin/">clean-webpack-plugin</a> is used to clean up the deployment folder inside the wwwroot. This ensures that the application uses the latest files.


The clean task can be configured as follows:

```javascript
var CleanWebpackPlugin = require('clean-webpack-plugin');

```

And used in Webpack.

```javascript
  new CleanWebpackPlugin(['./wwwroot/dist']),
```

## Angular component files


Note: require cannot be used because AoT does not work with this.

```javascript
import { Component, OnInit } from '@angular/core';
import { TestDataService } from '../services/testDataService';

@Component({
    selector: 'home-component',
    templateUrl: 'home.component.html',
    providers: [TestDataService]
})

export class HomeComponent implements OnInit {

    public message: string;
    public values: any[];

    constructor(private _dataService: TestDataService) {
        this.message = "Hello from HomeComponent constructor";
    }

    ngOnInit() {
        this._dataService
            .GetAll()
            .subscribe(
            data => this.values = data,
            error => console.log(error),
            () => console.log('Get all complete')
            );
    }
}

```

## The ASP.NET Core API

The ASP.NET Core API is quite small and tiny. It just provides a demo CRUD service.


```
 [Route("api/[controller]")]
    public class ValuesController : Microsoft.AspNetCore.Mvc.Controller
    {
        // GET: api/values
        [HttpGet]
        public IActionResult Get()
        {
            return new JsonResult(new string[] { "value1", "value2" });
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            return new JsonResult("value");
        }

        // POST api/values
        [HttpPost]
        public IActionResult Post([FromBody]string value)
        {
            return new CreatedAtRouteResult("anyroute", null);
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]string value)
        {
            return new OkResult();
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            return new NoContentResult();
        }
    }
```

### The Angular Http-Service

Note that in a normal environment, you should always return the typed classes and never the plain HTTP response like here. This application only has strings to return, and this is enough for the demo.


```
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Configuration } from '../app.constants';

@Injectable()
export class DataService {

    private actionUrl: string;
    private headers: Headers;

    constructor(private _http: Http, private _configuration: Configuration) {

        this.actionUrl = _configuration.Server + 'api/values/';

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }

    public GetAll = (): Observable<any> => {
        return this._http.get(this.actionUrl).map((response: Response) => <any>response.json());
    }

    public GetSingle = (id: number): Observable<Response> => {
        return this._http.get(this.actionUrl + id).map(res => res.json());
    }

    public Add = (itemName: string): Observable<Response> => {
        var toAdd = JSON.stringify({ ItemName: itemName });

        return this._http.post(this.actionUrl, toAdd, { headers: this.headers }).map(res => res.json());
    }

    public Update = (id: number, itemToUpdate: any): Observable<Response> => {
        return this._http
            .put(this.actionUrl + id, JSON.stringify(itemToUpdate), { headers: this.headers })
            .map(res => res.json());
    }

    public Delete = (id: number): Observable<Response> => {
        return this._http.delete(this.actionUrl + id);
    }
}
```


## Notes

The Webpack configuration could also build all of the scss and css files to a separate app.css or app."hash".css which could be loaded as a single file in the distribution. Some of the vendor js and css could also be loaded directly in the html header using the index.html file and not included in the Webpack build.

If you are building both the client application and the server application in separate projects, you could also consider angular-cli of angular2-webpack for the client application.

Debugging the Angular in Visual Studio with breakpoints is not possible with this setup. The SPA app can be debugged in chrome. 



## Links

https://github.com/preboot/angular2-webpack

https://webpack.github.io/docs/

https://github.com/jtangelder/sass-loader

https://github.com/petehunt/webpack-howto/blob/master/README.md

http://www.sochix.ru/how-to-integrate-webpack-into-visual-studio-2015/

http://sass-lang.com/

<a href="https://visualstudiogallery.msdn.microsoft.com/5497fd10-b1ba-474c-8991-1438ae47012a">WebPack Task Runner </a> from Mads Kristensen

http://blog.thoughtram.io/angular/2016/06/08/component-relative-paths-in-angular-2.html

https://angular.io/docs/ts/latest/guide/webpack.html

http://blog.mgechev.com/2016/06/26/tree-shaking-angular2-production-build-rollup-javascript/
