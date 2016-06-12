This article shows how <a href="http://webpack.github.io/docs/">Webpack </a>could be used together with <a href="https://www.visualstudio.com/">Visual Studio</a> ASP.NET Core and <a href="https://angular.io/docs/ts/latest/quickstart.html">Angular2</a>. Both the client and the server side of the application is implemented inside one ASP.NET Core project which makes it easier to deploy.

<img src="https://damienbod.files.wordpress.com/2016/06/vs_webpack_angular2.png?w=600" alt="vs_webpack_angular2" width="600" height="225" class="alignnone size-medium wp-image-6700" />

<strong>Code:</strong> https://github.com/damienbod/Angular2WebpackVisualStudio

<strong>Authors</strong> <em>Fabian Gosebrink, Damien Bowden</em>.
This post is hosted on both http://damienbod.com and http://offering.solutions/ and will be hosted on http://blog.noser.com afterwards.

<strong>Setting up the application</strong>

The ASP.NET Core application contains both the server side API services and also hosts the Angular 2 client application. The source code for the Angular 2 application is implemented in the angular2App folder. Webpack is then used to deploy the application, using the development build or a production build, which deploys the application to the wwwroot folder. This makes it easy to deploy the application using the standard tools from Visual Studio with the standard configurations.

<strong>npm configuration</strong>

The npm package.json configuration loads all the required packages for Angular 2 and Webpack. The Webpack packages are all added to the devDependencies. A "npm build" script and also a "npm buildProduction" are also configured, so that the client application can be built using Webpack from the cmd line using "npm build" or "npm buildProduction". These two scripts just call the same cmd as the Webpack task runner.

```javascript
{
  "version": "1.0.0",
  "description": "",
  "main": "wwwroot/index.html",
  "author": "",
  "license": "ISC",
    "scripts": {
        "build": "SET NODE_ENV=development && webpack -d --color",
        "buildProduction": "SET NODE_ENV=production && webpack -d --color",
        "tsc": "tsc",
        "tsc:w": "tsc -w",
        "typings": "typings",
        "postinstall": "typings install"
    },
  "dependencies": {
    "@angular/common": "2.0.0-rc.1",
    "@angular/compiler": "2.0.0-rc.1",
    "@angular/core": "2.0.0-rc.1",
    "@angular/http": "2.0.0-rc.1",
    "@angular/platform-browser": "2.0.0-rc.1",
    "@angular/platform-browser-dynamic": "2.0.0-rc.1",
    "@angular/router": "2.0.0-rc.1",
    "bootstrap": "^3.3.6",
    "core-js": "^2.4.0",
    "extract-text-webpack-plugin": "^1.0.1",
    "reflect-metadata": "^0.1.3",
    "rxjs": "5.0.0-beta.6",
    "zone.js": "^0.6.12"
  },
  "devDependencies": {
    "autoprefixer": "^6.3.2",
    "clean-webpack-plugin": "^0.1.9",
    "copy-webpack-plugin": "^2.1.3",
    "css-loader": "^0.23.0",
    "extract-text-webpack-plugin": "^1.0.1",
    "file-loader": "^0.8.4",
    "html-loader": "^0.4.0",
    "html-webpack-plugin": "^2.8.1",
    "jquery": "^2.2.0",
    "json-loader": "^0.5.3",
    "node-sass": "^3.4.2",
    "null-loader": "0.1.1",
    "postcss-loader": "^0.9.1",
    "raw-loader": "0.5.1",
    "rimraf": "^2.5.1",
    "sass-loader": "^3.1.2",
    "style-loader": "^0.13.0",
    "ts-helpers": "^1.1.1",
    "ts-loader": "0.8.2",
    "typescript": "1.8.10",
    "typings": "1.0.4",
    "url-loader": "^0.5.6",
    "webpack": "1.13.0"
    }
}

```

<strong>typings configuration</strong>

The typings are configured for webpack builds.

```javascript

  "globalDependencies": {
    "core-js": "registry:dt/core-js#0.0.0+20160317120654", 
    "node": "registry:dt/node#4.0.0+20160501135006"
  }
}
```

<strong>tsconfig configuration</strong>

The tsconfig is configured to use commonjs as the module.

```javascript
{
    "compilerOptions": {
        "target": "es5",
        "module": "commonjs",
        "moduleResolution":  "node",
        "removeComments": true,
        "emitDecoratorMetadata": true,
        "experimentalDecorators": true,
        "noEmitHelpers": false,
        "sourceMap": true
    },
    "exclude": [
        "node_modules"
    ],
    "compileOnSave": false,
    "buildOnSave": false
}
```

<strong>Webpack build</strong>

The Webpack development build <em>&gt;webpack -d</em> just uses the source files and creates outputs for development. The production build copies everything required for the client application to the wwwroot folder, and uglifies the js files. The <em>webpack -d --watch</em> can be used to automatically build the dist files if a source file is changed.

The Webpack config file was created using the excellent gihub repository https://github.com/preboot/angular2-webpack. Thanks for this. Small changes were made to this, such as the process.env.NODE_ENV and Webpack uses different source and output folders to match the ASP.NET Core project. If you decide to use two different projects, one for server, and one for client,  preboot or angular-cli, or both together would be a good choice for the client application.

Full webpack.config file

```javascript
/// <binding ProjectOpened='Run - Development' />
var path = require('path');
var webpack = require('webpack');

var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var Autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var isProd = (process.env.NODE_ENV === 'production');

module.exports = function makeWebpackConfig() {

    var config = {};

    // add debug messages
    config.debug = !isProd;

    // clarify output filenames
    var outputfilename = 'dist/[name].js';
    if (isProd) {
        //config.devtool = 'source-map';
        outputfilename = 'dist/[name].[hash].js';
    }

    if (!isProd) {
        config.devtool = 'eval-source-map';
    }


    config.entry = {
        'polyfills': './angular2App/polyfills.ts',
        'vendor': './angular2App/vendor.ts',
        'app': './angular2App/boot.ts' // our angular app
    };


    config.output = {
        path: root('./wwwroot'),
        publicPath: isProd ? '' : 'http://localhost:5000/',
        filename: outputfilename,
        chunkFilename: isProd ? '[id].[hash].chunk.js' : '[id].chunk.js'
    };

    config.resolve = {
        cache: true,
        root: root(),
        extensions: ['', '.ts', '.js', '.json', '.css', '.scss', '.html'],
        alias: {
            'app': 'angular2App/app'
        }
    };

    config.module = {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'ts',
                query: {
                    'ignoreDiagnostics': [
                        2403, // 2403 -> Subsequent variable declarations
                        2300, // 2300 -> Duplicate identifier
                        2374, // 2374 -> Duplicate number index signature
                        2375, // 2375 -> Duplicate string index signature
                        2502 // 2502 -> Referenced directly or indirectly
                    ]
                },
                exclude: [/node_modules\/(?!(ng2-.+))/]
            },

            // copy those assets to output
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file?name=fonts/[name].[hash].[ext]?'
            },

            // Support for *.json files.
            {
                test: /\.json$/,
                loader: 'json'
            },

            // Load css files which are required in vendor.ts
            {
                test: /\.css$/,
                exclude: root('angular2App', 'app'),
                loader: "style!css"
            },

            // Extract all files without the files for specific app components
            {
                test: /\.scss$/,
                exclude: root('angular2App', 'app'),
                loader: 'raw!postcss!sass'
            },

            // Extract all files for specific app components
            {
                test: /\.scss$/,
                exclude: root('angular2App', 'style'),
                loader: 'raw!postcss!sass'
            },

            {
                test: /\.html$/,
                loader: 'raw'
            }
        ],
        postLoaders: [],
        noParse: [/.+zone\.js\/dist\/.+/, /.+angular2\/bundles\/.+/, /angular2-polyfills\.js/]
    };


    config.plugins = [
        new CleanWebpackPlugin(['./wwwroot/dist']),
       
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify("production")
            }
        }),

        new CommonsChunkPlugin({
            name: ['vendor', 'polyfills']
        }),

        new HtmlWebpackPlugin({
            template: './angular2App/index.html',
            inject: 'body',
            chunksSortMode: packageSort(['polyfills', 'vendor', 'app'])
        }),

        new CopyWebpackPlugin([

            // copy all images to [rootFolder]/images
            { from: root('angular2App/images'), to: 'images' },

            // copy all fonts to [rootFolder]/fonts
            { from: root('angular2App/fonts'), to: 'fonts' }
        ])
    ];


    // Add build specific plugins
    if (isProd) {
        config.plugins.push(
            new webpack.NoErrorsPlugin(),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.UglifyJsPlugin()
        );
    }

    config.postcss = [
        Autoprefixer({
            browsers: ['last 2 version']
        })
    ];

    config.sassLoader = {
        //includePaths: [path.resolve(__dirname, "node_modules/foundation-sites/scss")]
    };

    return config;
}();

// Helper functions
function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [__dirname].concat(args));
}

function rootNode(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return root.apply(path, ['node_modules'].concat(args));
}

function packageSort(packages) {
    // packages = ['polyfills', 'vendor', 'app']
    var len = packages.length - 1;
    var first = packages[0];
    var last = packages[len];
    return function sort(a, b) {
        // polyfills always first
        if (a.names[0] === first) {
            return -1;
        }
        // main always last
        if (a.names[0] === last) {
            return 1;
        }
        // vendor before app
        if (a.names[0] !== first && b.names[0] === last) {
            return -1;
        } else {
            return 1;
        }
    }
}

```

Lets dive into this a bit:

Firstly, all plugins are loaded which are required to process all the js, ts, ... files which are included, or used in the project.


```javascript
var path = require('path');
var webpack = require('webpack');

var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var Autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

var isProd = (process.env.NODE_ENV === 'production');
```

The npm environment variable NODE_ENV is used to define the type of build, either a development build or a production build. The entries are configured depending on this parameter.

```javascript
    config.entry = {
        'polyfills': './angular2App/polyfills.ts',
        'vendor': './angular2App/vendor.ts',
        'app': './angular2App/boot.ts' // our angular app
    };
```

The entries provide Webpack with the required information, where to start from, or where to hook in to. Three entry points are defined in this configuration. These strings point to the files required in the solution. The starting point for the app itself is provided in one of these files, boot.ts as a starting-point and also all vendor scripts minified in one file, the vendor.ts. 


```typescript
// Polyfill(s) for older browsers.
import 'core-js/client/core';

// Reflect Metadata.
import 'reflect-metadata';
// RxJS.
import 'rxjs';
// Zone.
import 'zone.js/dist/zone';

// Angular 2.
import '@angular/common';
import '@angular/compiler';
import '@angular/core';
import '@angular/http';
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/router';

// Other libraries.
import 'jquery/src/jquery';
import 'bootstrap/dist/js/bootstrap';


import './css/bootstrap.css';
import './css/bootstrap-theme.css';
```

Webpack knows which paths to run and includes the corresponding files and packages.

The "loaders" section and the "modules" section in the configuration provides Webpack with the following information: which files it needs to get and how to read the files. The modules tells Webpack what to do with the files exactly. Like minifying or whatever.

In this project configuration, if a production node parameter is set, different plugins are pushed into the sections because the files should be treated differently.

<strong>Angular 2 index.html</strong>

The index.html contains all the references required for the Angular 2 client. The scripts are added as part of the build and not manually. The developer only needs to use the imports.

Source index.html file in the angular2App/public folder:
```javascript
<!doctype html>
<html>
<head>
    <base href="./">

    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Angular 2 Webpack Demo</title>

    <meta http-equiv="content-type" content="text/html; charset=utf-8" />

    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

</head>
<body>
    <my-app>Loading...</my-app>
</body>
</html>


```

And the produced build file in the wwwroot folder. The scripts for the app, vendor and boot have been added using Webpack. Hashes are used in a production build for cache busting.

```javascript
<!doctype html>
<html>
<head>
    <base href="./">

    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Angular 2 Webpack Demo</title>

    <meta http-equiv="content-type" content="text/html; charset=utf-8" />

    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <link rel="stylesheet" href="css/bootstrap.css">
</head>
<body>
    <my-app>Loading...</my-app>
<script type="text/javascript" src="http://localhost:5000/dist/polyfills.js"></script><script type="text/javascript" src="http://localhost:5000/dist/vendor.js"></script><script type="text/javascript" src="http://localhost:5000/dist/app.js"></script></body>
</html>

```


<strong>Visual Studio tools</strong>

<a href="https://visualstudiogallery.msdn.microsoft.com/5497fd10-b1ba-474c-8991-1438ae47012a">Webpack task runner </a> from Mads Kristensen can be downloaded and used to send Webpack commands using the webpack.config.js file. The node NODE_ENV parameter is used to define the build type. The parameter can be set to "development", or "production". 

<img src="https://damienbod.files.wordpress.com/2016/06/vs_webpack_angular2_02.png?w=600" alt="vs_webpack_angular2_02" width="600" height="431" class="alignnone size-medium wp-image-6716" />

The Webpack task runner can also be used by double clicking the task. The execution results are then displayed in the task runner console.

<img src="https://damienbod.files.wordpress.com/2016/06/vs_webpack_angular2_03.png?w=600" alt="vs_webpack_angular2_03" width="600" height="231" class="alignnone size-medium wp-image-6717" />

This runner provides a number of useful commands which can be activated automatically. These tasks can be attached to Visual Studio events by right clicking the task and selecting a binding. This adds a binding tag to the webpack.config.js file.

```
/// <binding ProjectOpened='Run - Development' />
```

<strong>Webpack SASS</strong>

<a href="http://sass-lang.com/">SASS</a> is used to style the SPA application. The SASS files can be built using the SASS loader. Webpack can build all the styles inline or as an external file, depending on your Webpack config.

```javascript
{
  test: /\.scss$/,
  exclude: root('angular2App', 'app'),
  loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss!sass')
},
```

<strong>Webpack Clean</strong>

<a href="https://github.com/johnagan/clean-webpack-plugin/">clean-webpack-plugin</a> is used to clean up the deployment folder inside the wwwroot. This ensures that the application uses the latest files.


The clean task can be configured as follows:

```javascript
var CleanWebpackPlugin = require('clean-webpack-plugin');

```

And used in Webpack.

```javascript
  new CleanWebpackPlugin(['./wwwroot/dist']),
```

<strong>Angular 2 component files</strong>

The Angular 2 components are slightly different to the standard example components. The templates and the styles use require, which adds the html or the css, scss to the file directly using Webpack, or as an external link depending on the Webpack config.

```javascript
import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { Http } from '@angular/http';
import { DataService } from '../services/DataService';


@Component({
    selector: 'homecomponent',
    template: require('./home.component.html'),
    directives: [CORE_DIRECTIVES],
    providers: [DataService]
})

export class HomeComponent implements OnInit {

    public message: string;
    public values: any[];

    constructor(private _dataService: DataService) {
        this.message = "Hello from HomeComponent constructor";
    }

    ngOnInit() {
        this._dataService
            .GetAll()
            .subscribe(data => this.values = data,
            error => console.log(error),
            () => console.log('Get all complete'));
    }
}
```

<strong>The ASP.NET Core API</strong>

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

<strong>The Angular2 Http-Service</strong>

Note that in a normal environment, you should always return the typed classes and never the plain HTTP response like here. This application only has strings to return, and this is enough for the demo.


```
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map'
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


<strong>Notes:</strong>

The Webpack configuration could also build all of the scss and css files to a separate app.css or app."hash".css which could be loaded as a single file in the distribution. Some of the vendor js and css could also be loaded directly in the html header using the index.html file and not included in the Webpack build.

If you are building both the client application and the server application in separate projects, you could also consider angular-cli of angular2-webpack for the client application.

Debugging the Angular 2 in Visual Studio with breakpoints is not possible with this setup. The SPA app can be debugged in chrome. 



<strong>Links:</strong>

https://github.com/preboot/angular2-webpack

https://webpack.github.io/docs/

https://github.com/jtangelder/sass-loader

https://github.com/petehunt/webpack-howto/blob/master/README.md

http://www.sochix.ru/how-to-integrate-webpack-into-visual-studio-2015/

http://sass-lang.com/

<a href="https://visualstudiogallery.msdn.microsoft.com/5497fd10-b1ba-474c-8991-1438ae47012a">WebPack Task Runner </a> from Mads Kristensen

http://blog.thoughtram.io/angular/2016/06/08/component-relative-paths-in-angular-2.html

https://angular.io/docs/ts/latest/guide/webpack.html