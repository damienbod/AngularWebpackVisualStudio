This article shows how <a href="http://webpack.github.io/docs/">Webpack </a>could be used together with <a href="https://www.visualstudio.com/">Visual Studio</a> ASP.NET Core and <a href="https://angular.io/docs/ts/latest/quickstart.html">Angular</a>. Both the client and the server side of the application is implemented inside one ASP.NET Core project which makes it easier to deploy.

|                           | Build                                                                                                                                                             |       
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| .NET Core, angular        | [![Build status](https://ci.appveyor.com/api/projects/status/3x6y01a8312x6o2p?svg=true)](https://ci.appveyor.com/project/damienbod/angular2webpackvisualstudio)   |



<img src="https://damienbod.files.wordpress.com/2016/06/vs_webpack_angular2.png?w=600" alt="vs_webpack_angular2" width="600" height="225" class="alignnone size-medium wp-image-6700" />

Code <a href="https://github.com/damienbod/AngularWebpackVisualStudio">VS2017 angular 4.x</a> | <a href="https://github.com/damienbod/AngularWebpackVisualStudio/tree/VS2017-angular-2">VS2017 angular 2.x</a> 
## Authors
<img src="https://avatars.githubusercontent.com/u/11268349?v=3" width="70"><img src="https://avatars.githubusercontent.com/u/3442158?v=3" width="70"><img src="https://pbs.twimg.com/profile_images/707847627992338432/ytT_FxUY_400x400.jpg" width="70" alt="Roberto Simonetti">

_[Fabian Gosebrink](https://twitter.com/FabianGosebrink), [Damien Bowden](https://twitter.com/damien_bod), [Roberto Simonetti](https://twitter.com/robisim74)_.
This post is hosted on both <a href="https://damienbod.com/2016/06/12/asp-net-core-angular2-with-webpack-and-visual-studio/">damienbod.com</a> and <a href="http://offering.solutions/blog/articles/2016/06/12/asp-net-core-angular-webpack-visual-studio/">offering.solutions</a>.

<ul>	
	<li><a href="https://github.com/damienbod/Angular2WebpackVisualStudio/blob/master/CHANGELOG.md">Changelog</a></li>
	<li><a href="https://github.com/damienbod/Angular2WebpackVisualStudio/blob/master/LAZY_LOADING.md">Lazy Loading</a></li>
	<li><a href="https://github.com/damienbod/Angular2WebpackVisualStudio/blob/master/HMR.md">Hot Module Replacement</a></li>
	<li><a href="https://damienbod.com/2017/01/01/building-production-ready-angular-apps-with-visual-studio-and-asp-net-core/">Building production ready Angular apps with Visual Studio and ASP.NET Core</a></li>
</ul>

## Tools

yarn, nodejs and npm are required to run this solution.

Update to the latest versions:

npm install npm@latest -g 

npm install yarn -g

See this link for more details on yarn:

https://github.com/OfferingSolutions/Offering-Solutions-Angular-Course/tree/master/Angular-Course#yarn-not-necessary-but-nice-to-have

or

https://yarnpkg.com/en/docs/install

If you remove the yarn.lock file, you do not require yarn.

### Node Path in Visual Studio

The installed nodejs on your system needs to be used inside Visual Studio and not VS one. You need to set the path of you node before the VS node.

In Visual Studio Tools/Options/Projects and Solutions/Web Package Management/External Web Tools

More the $(Path) option above the Visual Studio one.

Also see:

https://github.com/madskristensen/NpmTaskRunner/issues/46

## Setting up the application

The ASP.NET Core application contains both the server side API services and also hosts the Angular client application. The source code for the Angular application is implemented in the angularApp folder. Webpack is then used to deploy the application, using the development build or a production build, which deploys the application to the wwwroot folder. This makes it easy to deploy the application using the standard tools from Visual Studio with the standard configurations.

## npm configuration

The npm package.json configuration loads all the required packages for Angular and Webpack. The Webpack packages are all added to the devDependencies. A "npm build" script and also a "npm buildProduction" are also configured, so that the client application can be built using Webpack from the cmd line using "npm build" or "npm buildProduction". These two scripts just call the same cmd as the Webpack task runner.

```javascript
{
  "name": "angular-webpack-visualstudio",
  "version": "1.0.0",
  "description": "An Angular VS template",
  "main": "wwwroot/index.html",
  "author": "",
  "license": "ISC",
    "repository": {
    "type": "git",
    "url": "https://github.com/damienbod/Angular2WebpackVisualStudio.git"
  },
  "scripts": {
    "ngc": "ngc -p ./tsconfig-aot.json",
    "start": "concurrently \"webpack-dev-server --hot --inline --port 8080\" \"dotnet run\" ",
    "webpack-dev": "set NODE_ENV=development && webpack",
    "webpack-production": "set NODE_ENV=production && webpack",
    "build-dev": "npm run webpack-dev",
    "build-production": "npm run ngc && npm run webpack-production",
    "watch-webpack-dev": "set NODE_ENV=development && webpack --watch --color",
    "watch-webpack-production": "npm run build-production --watch --color",
    "publish-for-iis": "npm run build-production && dotnet publish -c Release",
    "test": "karma start"
  },
  "dependencies": {
    "@angular/common": "4.1.0",
    "@angular/compiler": "4.1.0",
    "@angular/compiler-cli": "4.1.0",
    "@angular/platform-server": "4.1.0",
    "@angular/core": "4.1.0",
    "@angular/forms": "4.1.0",
    "@angular/http": "4.1.0",
    "@angular/platform-browser": "4.1.0",
    "@angular/platform-browser-dynamic": "4.1.0",
    "@angular/router": "4.1.0",
    "@angular/upgrade": "4.1.0",
    "@angular/animations": "4.1.0",
    "angular-in-memory-web-api": "0.3.1",
    "core-js": "2.4.1",
    "reflect-metadata": "0.1.10",
    "rxjs": "5.3.0",
    "zone.js": "0.8.8",
    "bootstrap": "^3.3.7",
    "ie-shim": "~0.1.0"
  },
  "devDependencies": {
    "@types/node": "7.0.12",
    "@types/jasmine": "2.5.46",
    "angular2-template-loader": "0.6.2",
    "angular-router-loader": "^0.6.0",
    "awesome-typescript-loader": "3.1.2",
    "clean-webpack-plugin": "^0.1.16",
    "concurrently": "^3.4.0",
    "copy-webpack-plugin": "^4.0.1",
    "css-loader": "^0.28.0",
    "file-loader": "^0.11.1",
    "html-webpack-plugin": "^2.28.0",
    "jquery": "^3.2.1",
    "json-loader": "^0.5.4",
    "node-sass": "^4.5.2",
    "raw-loader": "^0.5.1",
    "rimraf": "^2.6.1",
    "sass-loader": "^6.0.3",
    "source-map-loader": "^0.2.1",
    "style-loader": "^0.16.1",
    "ts-helpers": "^1.1.2",
    "tslint": "^5.0.0",
    "tslint-loader": "^3.5.2",
    "typescript": "2.2.2",
    "url-loader": "^0.5.8",
    "webpack": "^2.3.3",
    "webpack-dev-server": "2.4.2",
    "jasmine-core": "2.5.2",
    "karma": "1.6.0",
    "karma-chrome-launcher": "2.0.0",
    "karma-jasmine": "1.1.0",
    "karma-sourcemap-loader": "0.3.7",
    "karma-spec-reporter": "0.0.30",
    "karma-webpack": "2.0.3"
  },
  "-vs-binding": {
    "ProjectOpened": [
      "watch-webpack-dev"
    ]
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
      "node",
      "jasmine"
    ]
  },
  "exclude": [
    "node_modules",
    "aot",
    "angularApp/main-aot.ts"
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
var helpers = require('./webpack.helpers');

console.log('@@@@@@@@@ USING DEVELOPMENT @@@@@@@@@@@@@@@');

module.exports = {

    devtool: 'source-map',
    performance: {
        hints: false
    },
    entry: {
        'polyfills': './angularApp/polyfills.ts',
        'vendor': './angularApp/vendor.ts',
        'app': './angularApp/main.ts'
    },

    output: {
        path: __dirname + '/wwwroot/',
        filename: 'dist/[name].bundle.js',
        chunkFilename: 'dist/[id].chunk.js',
        publicPath: '/'
    },

    resolve: {
        extensions: ['.ts', '.js', '.json', '.css', '.scss', '.html']
    },

    devServer: {
        historyApiFallback: true,
        contentBase: path.join(__dirname, '/wwwroot/'),
        watchOptions: {
            aggregateTimeout: 300,
            poll: 1000
        }
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: [
                    'awesome-typescript-loader',
                    'angular-router-loader',
                    'angular2-template-loader',
                    'source-map-loader',
                    'tslint-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|woff|woff2|ttf|svg|eot)$/,
                loader: 'file-loader?name=assets/[name]-[hash:6].[ext]'
            },
            {
                test: /favicon.ico$/,
                loader: 'file-loader?name=/[name].[ext]'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.html$/,
                loader: 'raw-loader'
            }
        ],
        exprContextCritical: false
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ name: ['app', 'polyfills'] }),

        new CleanWebpackPlugin(
            [
                './wwwroot/dist',
                './wwwroot/assets'
            ]
        ),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            inject: 'body',
            template: 'angularApp/index.html'
        }),

        new CopyWebpackPlugin([
            { from: './angularApp/images/*.*', to: 'assets/', flatten: true }
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

console.log('@@@@@@@@@ USING PRODUCTION @@@@@@@@@@@@@@@');

module.exports = {

    entry: {
        'vendor': './angularApp/vendor.ts',
        'polyfills': './angularApp/polyfills.ts',
        'app': './angularApp/main-aot.ts' // AoT compilation
    },

    output: {
        path: __dirname + '/wwwroot/',
        filename: 'dist/[name].[hash].bundle.js',
        chunkFilename: 'dist/[id].[hash].chunk.js',
        publicPath: '/'
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
                    'angular-router-loader?aot=true&genDir=aot/'
                ]
            },
            {
                test: /\.(png|jpg|gif|woff|woff2|ttf|svg|eot)$/,
                loader: 'file-loader?name=assets/[name]-[hash:6].[ext]'
            },
            {
                test: /favicon.ico$/,
                loader: 'file-loader?name=/[name].[ext]'
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                loaders: ['style-loader', 'css-loader', 'sass-loader']
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
        new webpack.NoEmitOnErrorsPlugin(),
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
                name: ['vendor', 'polyfills']
            }),

        new HtmlWebpackPlugin({
            filename: 'index.html',
            inject: 'body',
            template: 'angularApp/index.html'
        }),

        new CopyWebpackPlugin([
            { from: './angularApp/images/*.*', to: 'assets/', flatten: true }
        ])
    ]
};


```


## Webpack Production build

The production build has to be run from the command line. At present ngc, the angular compiler, can only be used from the command line. 

https://github.com/angular/angular/tree/master/modules/%40angular/compiler-cli

See also (Using ngc) http://blog.mgechev.com/2016/06/26/tree-shaking-angular2-production-build-rollup-javascript/ 

It can be run using npm run build-production which is configured in the package.json.

```
"build-production": "npm run ngc && npm run webpack-prodroduction"
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
    "angularApp/app/app.module.ts",
    "angularApp/app/modules/about/about.module.ts",
    "angularApp/main-aot.ts"
  ],
  "angularCompilerOptions": {
    "genDir": "aot",
    "skipMetadataEmit": true
  },
  "compileOnSave": false,
  "buildOnSave": false
}
```

## webpack.dev.js 
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
        'app': './angularApp/main.ts' // JiT compilation
    },
```

for webpack.prod.js

```javascript
    entry: {
        'app': './angularApp/main-aot.ts' // AoT compilation
    },
```

The entries provide Webpack with the required information, where to start from, or where to hook in to.

Webpack knows which paths to run and includes the corresponding files and packages.

The "loaders" section and the "modules" section in the configuration provides Webpack with the following information: which files it needs to get and how to read the files. The modules tells Webpack what to do with the files exactly. Like minifying or whatever.

In this project configuration, if a production node parameter is set, different plugins are pushed into the sections because the files should be treated differently.

### The output
```javascript
output: {
        path: __dirname + '/wwwroot/',
        filename: 'dist/[name].bundle.js',
		chunkFilename: 'dist/[id].chunk.js',
        publicPath: "/"
    },
```

output for production adds a hash:

```javascript
output: {
        path: __dirname + '/wwwroot/',
        filename: 'dist/[name].[hash].bundle.js',
		chunkFilename: 'dist/[id].[hash].chunk.js',
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

Source index.html file in the angularApp/public folder:

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

### npm custom Task Runner

The NPM Task Runner can be used to build  the client SPA application from inside Visual Studio. This task runner can be downloaded from:

https://marketplace.visualstudio.com/items?itemName=MadsKristensen.NPMTaskRunner

The task runners need to be configured correctly. 
Go to Tools –> Options –> Projects and Solutions –> External Web Tools.

Check that are options are checked. See:

https://blogs.msdn.microsoft.com/webdev/2015/03/19/customize-external-web-tools-in-visual-studio-2015/


### npm scripts

The npm scripts are used to build, watch the client application as required. The scripts can be run from the command line or the npm task runner.

```javascript
"ngc": "ngc -p ./tsconfig-aot.json",
"start": "concurrently \"webpack-dev-server --hot --inline --port 8080\" \"dotnet run\" ",
"webpack-dev": "set NODE_ENV=development && webpack",
"webpack-production": "set NODE_ENV=production && webpack",
"build-dev": "npm run webpack-dev",
"build-production": "npm run ngc && npm run webpack-production",
"watch-webpack-dev": "set NODE_ENV=development && webpack --watch --color",
"watch-webpack-production": "npm run build-production --watch --color",
"publish-for-iis": "npm run build-production && dotnet publish -c Release",
"test": "karma start"
```

The watch-webpack-dev npm script can be automatically be started in Visual Studio by adding the following to the package.json

```
"-vs-binding": { "ProjectOpened": [ "watch-webpack-dev" ] }
```

<b>Note</b> Webpack task runner cannot be used to build the Angular webpack application as it uses the wrong options and cannot be used to do a production build due to the ngc.

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
import { ThingService } from './../../core/services/thing-data.service';
import { Thing } from './../../models/thing';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'home-component',
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {

    public message: string;
    public things: Thing[] = [];
    public thing: Thing = new Thing();

    constructor(private dataService: ThingService) {
        this.message = 'Things from the ASP.NET Core API';
    }

    ngOnInit() {
        this.getAllThings();
    }

    public addThing() {
        this.dataService
            .Add(this.thing)
            .subscribe(() => {
                this.getAllThings();
                this.thing = new Thing();
            }, (error) => {
                console.log(error);
            });
    }

    public deleteThing(thing: Thing) {
        this.dataService
            .Delete(thing.id)
            .subscribe(() => {
                this.getAllThings();
            }, (error) => {
                console.log(error);
            });
    }

    private getAllThings() {
        this.dataService
            .GetAll()
            .subscribe(
            data => this.things = data,
            error => console.log(error),
            () => console.log('Get all complete')
            );
    }
}
```

## tslint file

https://github.com/damienbod/Angular2WebpackVisualStudio/blob/master/src/Angular2WebpackVisualStudio/tslint.json

## The ASP.NET Core API

The ASP.NET Core API is quite small and tiny. It just provides a demo CRUD service.


```
using System.Linq;
using Angular2WebpackVisualStudio.Models;
using Angular2WebpackVisualStudio.Repositories.Things;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;

namespace Angular2WebpackVisualStudio.Controller
{
    [Route("api/[controller]")]
    public class ThingsController : Microsoft.AspNetCore.Mvc.Controller
    {
        private readonly IThingsRepository _thingsRepository;

        public ThingsController(IThingsRepository thingsRepository)
        {
            _thingsRepository = thingsRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_thingsRepository.GetAll());
        }

        [HttpPost]
        public IActionResult Add([FromBody] Thing thing)
        {
            if (thing == null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Thing newThing = _thingsRepository.Add(thing);

            return CreatedAtRoute("GetSingleThing", new { id = newThing.Id }, newThing);
        }

        [HttpPatch("{id:int}")]
        public IActionResult PartiallyUpdate(int id, [FromBody] JsonPatchDocument<Thing> patchDoc)
        {
            if (patchDoc == null)
            {
                return BadRequest();
            }

            Thing existingEntity = _thingsRepository.GetSingle(id);

            if (existingEntity == null)
            {
                return NotFound();
            }

            Thing thing = existingEntity;
            patchDoc.ApplyTo(thing, ModelState);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Thing updatedThing = _thingsRepository.Update(id, thing);

            return Ok(updatedThing);
        }

        [HttpGet]
        [Route("{id:int}", Name = "GetSingleThing")]
        public IActionResult Single(int id)
        {
            Thing thing = _thingsRepository.GetSingle(id);

            if (thing == null)
            {
                return NotFound();
            }

            return Ok(thing);
        }

        [HttpDelete]
        [Route("{id:int}")]
        public IActionResult Remove(int id)
        {
            Thing thing = _thingsRepository.GetSingle(id);

            if (thing == null)
            {
                return NotFound();
            }

            _thingsRepository.Delete(id);
            return NoContent();
        }

        [HttpPut]
        [Route("{id:int}")]
        public IActionResult Update(int id, [FromBody]Thing thing)
        {
            var thingToCheck = _thingsRepository.GetSingle(id);

            if (thingToCheck == null)
            {
                return NotFound();
            }

            if (id != thing.Id)
            {
                return BadRequest("Ids do not match");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Thing updatedThing = _thingsRepository.Update(id, thing);

            return Ok(updatedThing);
        }
    }
}


```

### The Angular Http-Service

Note that in a normal environment, you should always return the typed classes and never the plain HTTP response like here. This application only has strings to return, and this is enough for the demo.


```
import { Thing } from './../../models/thing';
import { Configuration } from './../../app.constants';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ThingService {

    private actionUrl: string;
    private headers: Headers;

    constructor(private http: Http, private configuration: Configuration) {

        this.actionUrl = configuration.Server + 'api/things/';

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
    }

    public GetAll = (): Observable<Thing[]> => {
        return this.http.post(this.actionUrl + 'all/', '', { headers: this.headers }).map((response: Response) => <Thing[]>response.json());
    }

    public GetSingle = (id: number): Observable<Thing> => {
        return this.http.get(this.actionUrl + id).map(res => <Thing>res.json());
    }

    public Add = (thingToAdd: Thing): Observable<Thing> => {
        let toAdd = JSON.stringify({ name: thingToAdd.name });

        return this.http.post(this.actionUrl, toAdd, { headers: this.headers }).map(res => <Thing>res.json());
    }

    public Update = (id: number, itemToUpdate: any): Observable<Thing> => {
        return this.http
            .put(this.actionUrl + id, JSON.stringify(itemToUpdate), { headers: this.headers })
            .map(res => <Thing>res.json());
    }

    public Delete = (id: number): Observable<any> => {
        return this.http.delete(this.actionUrl + id);
    }
}
```

## Testing

The XUnit test for ASP.NET Core API is in tests/AngularWebpackVisualStudio_Tests folder:

dotnet test

or from Visual Studio: Test > Run > All Tests

See this link for more details on XUnit testing in ASP.NET Core: https://docs.microsoft.com/it-it/dotnet/articles/core/testing/unit-testing-with-dotnet-test


The Angular test is in angularApp/tests folder. It uses Karma test runner and Jasmine test framework:

npm test

To enable debugging, you have to set to false the singleRun property in karma.conf.js file.

See this link for more details on Angular testing: https://angular.io/docs/ts/latest/guide/testing.html

## Notes

The Webpack configuration could also build all of the scss and css files to a separate app.css or app."hash".css which could be loaded as a single file in the distribution. Some of the vendor js and css could also be loaded directly in the html header using the index.html file and not included in the Webpack build.

If you are building both the client application and the server application in separate projects, you could also consider angular-cli of angular2-webpack for the client application.

Debugging the Angular in Visual Studio with breakpoints is not possible with this setup. The SPA app can be debugged in chrome. 



## Links

https://github.com/preboot/angular2-webpack

https://webpack.github.io/docs/

https://github.com/jtangelder/sass-loader

https://github.com/petehunt/webpack-howto/blob/master/README.md

https://blogs.msdn.microsoft.com/webdev/2015/03/19/customize-external-web-tools-in-visual-studio-2015/

https://marketplace.visualstudio.com/items?itemName=MadsKristensen.NPMTaskRunner

http://sass-lang.com/

http://blog.thoughtram.io/angular/2016/06/08/component-relative-paths-in-angular-2.html

https://angular.io/docs/ts/latest/guide/webpack.html

http://blog.mgechev.com/2016/06/26/tree-shaking-angular2-production-build-rollup-javascript/
