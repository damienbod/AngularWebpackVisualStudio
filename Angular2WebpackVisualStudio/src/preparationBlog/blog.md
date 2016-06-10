This article shows how <a href="http://webpack.github.io/docs/">Webpack </a>could be used together with <a href="https://www.visualstudio.com/">Visual Studio</a> ASP.NET Core and <a href="https://angular.io/docs/ts/latest/quickstart.html">Angular2</a>. Both the client and the server side of the application is implemented inside one ASP.NET Core project which makes it easier to deploy.

<img src="https://damienbod.files.wordpress.com/2016/06/vs_webpack_angular2.png?w=600" alt="vs_webpack_angular2" width="600" height="225" class="alignnone size-medium wp-image-6700" />

<strong>Code:</strong> https://github.com/damienbod/Angular2WebpackVisualStudio

<strong>Authors</strong> <em>Fabian Gosebrink, Damien Bowden</em>
This post is hosted on both http://damienbod.com and http://offering.solutions/

<strong>Setting up the application</strong>

The ASP.NET Core application contains both the server side API services and also hosts the Angular 2 client application. The source code for the Angular 2 application is implemented in the angular2App folder. Webpack is then used to deploy the application, using the development build or a production, which deploys the application to the wwwroot folder. This makes it easy to deploy the application using the standard tools from Visual Studio.

<strong>npm configuration</strong>

npm is configuration to load all the required packages for Angular 2 and also for Webpack. The Webpack packages are all added to the devDependencies. A npm build script and also a npm buildProduction are also added so that the client application can be built using webpack from the cmd line using "npm build" or "npm buildProduction". These two scipts just call the same cmd as well Webpack task runner.
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
        "jquery": "^2.2.0",
        "ts-loader": "0.8.2",
        "typescript": "1.8.10",
        "typings": "1.0.4",
        "webpack": "1.13.0",
        "copy-webpack-plugin": "^2.1.3",
        "extract-text-webpack-plugin": "^1.0.1",
        "url-loader": "^0.5.6",
        "json-loader": "^0.5.3",
        "node-sass": "^3.4.2",
        "null-loader": "0.1.1",
        "css-loader": "^0.23.0",
        "postcss-loader": "^0.9.1",
        "rimraf": "^2.5.1",
        "file-loader": "^0.8.4",
        "html-loader": "^0.4.0",
        "html-webpack-plugin": "^2.8.1",
        "raw-loader": "0.5.1",
        "sass-loader": "^3.1.2",
        "style-loader": "^0.13.0",
        "ts-helpers": "^1.1.1"
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

<strong>Webpack development build</strong>

The webpack development build <em>&gt;webpack -d</em> just uses the source files and creates outputs for development.  The production build copies everything required for the client application to the wwwroot folder, and uglifies the js files. The webpack -d --watch can be used to automatically build the dist files if a source file is changed.

The webpack config file was built using the excellent gihub repository https://github.com/preboot/angular2-webpack. Thanks for this. Small changes were made to this, such as the process.env.NODE_ENV and this project uses different source and output folders to match the ASP.NET Core project. If you decide to use two different projects, one for server, and one for client,  preboot or angular-cli, or both together would be a good choice for the client application.

Full webpack.config file
```javascript
/// <binding ProjectOpened='Run - Development' />
var path = require('path');
var webpack = require('webpack');

// Webpack Plugins
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var isProd = (process.env.NODE_ENV === 'production');

module.exports = function makeWebpackConfig() {

    var config = {};
    var outputfilename = 'dist/[name].js';
    if (isProd) {
        //config.devtool = 'source-map';
        outputfilename = 'dist/[name].[hash].js'
    } else {
        config.devtool = 'eval-source-map';
    }

    // add debug messages
    config.debug = !isProd;

    config.entry = {
        'polyfills': './angular2App/polyfills.ts',
        'vendor': './angular2App/vendor.ts',
        'app': './angular2App/boot.ts' // our angular app
    };


    config.output = {
        path: root('./wwwroot'),
        publicPath: isProd ? '/' : 'http://localhost:5000/',
        filename: outputfilename,
        chunkFilename: isProd ? '[id].[hash].chunk.js' : '[id].chunk.js'
    };

    config.resolve = {
        cache: true,
        root: root(),
        extensions: ['', '.ts', '.js', '.json', '.css', '.scss', '.html'],
        alias: {
            'app': 'angular2App/app',
            'common': 'angular2App/common'
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
                    2502  // 2502 -> Referenced directly or indirectly
                  ]
              },
              exclude: [ /node_modules\/(?!(ng2-.+))/]
          },

          // copy those assets to output
          { test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/, loader: 'file?name=fonts/[name].[hash].[ext]?' },

          // Support for *.json files.
          { test: /\.json$/, loader: 'json' },
          {
              test: /\.css$/,
              exclude: root('angular2App', 'app'),
              loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss')
          },
          { test: /\.css$/, include: root('angular2App', 'app'), loader: 'raw!postcss' },
          {
              test: /\.scss$/,
              exclude: root('angular2App', 'app'),
              loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss!sass')
          },
          { test: /\.scss$/, exclude: root('angular2App', 'style'), loader: 'raw!postcss!sass' },
          { test: /\.html$/, loader: 'raw' }
        ],
        postLoaders: [],
        noParse: [/.+zone\.js\/dist\/.+/, /.+angular2\/bundles\/.+/, /angular2-polyfills\.js/]
    };


    config.plugins = [
      new webpack.DefinePlugin({
          'process.env': {
              NODE_ENV: JSON.stringify("production")
          }
      })
    ];

  
    config.plugins.push(
        new CommonsChunkPlugin({
            name: ['vendor', 'polyfills']
        }),
        new HtmlWebpackPlugin({
            template: './angular2App/public/index.html',
            inject: 'body',
            chunksSortMode: packageSort(['polyfills', 'vendor', 'app'])
        }),
        new ExtractTextPlugin('css/[name].[hash].css', { disable: !isProd })
    );
    

    // Add build specific plugins
    if (isProd) {
        config.plugins.push(
          new webpack.NoErrorsPlugin(),
          new webpack.optimize.DedupePlugin(),
          new webpack.optimize.UglifyJsPlugin(),
          new CopyWebpackPlugin([{
              from: root('angular2App/public')
          }])
        );
    }

    config.postcss = [
      autoprefixer({
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

<strong>Angular 2 index.html</strong>

The index.html contains all the references required for the Angular 2 client. The scripts are added as part of the build and not manually. The developer only needs to use the imports.

Source index.html in the angular2App/public folder
[code language="html"]
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
</body>
</html>

```

Build file in the wwwroot folder. The scripts for the app, vender and boot have been added using webpack. Hashes are used in a production build for cache busting.
[code language="html"]
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


<strong>Angular 2 component files</strong>

The angualr 2 components are slightly different to the standard example components. The templates and the styles use require, which added the html or the css, scss to the file directly using webpack, or as an external link depending on the webpack config.

```javascript
import {Component, OnInit} from '@angular/core';
import {Routes, Router, ROUTER_DIRECTIVES} from '@angular/router';

// Components.
import { HomeComponent } from './home/home.component';

@Component({
    selector: 'my-app',
    template: require( './app.component.html'),
    styles: [require('./app.component.scss')],
    directives: [ROUTER_DIRECTIVES]
})

@Routes([
    { path: '/home', component: HomeComponent }
])

export class AppComponent {

    constructor(
        private router: Router
    ) {
    }

    ngOnInit() {

        this.router.navigate(['/home']);
    }
}
```


<strong>Visual Studio tools</strong>

<img src="https://damienbod.files.wordpress.com/2016/06/vs_webpack_angular2_02.png?w=600" alt="vs_webpack_angular2_02" width="600" height="431" class="alignnone size-medium wp-image-6716" />

<img src="https://damienbod.files.wordpress.com/2016/06/vs_webpack_angular2_03.png?w=600" alt="vs_webpack_angular2_03" width="600" height="231" class="alignnone size-medium wp-image-6717" />
<strong>Webpack SASS</strong>

SASS is used to style the SPA application. The SASS files can be built using the SASS loader. Webpack can build all the styles inline or as a external file, depending on your Webpack config.

```javascript
{
  test: /\.scss$/,
  exclude: root('angular2App', 'app'),
  loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss!sass')
},
```

<strong>Notes:</strong>

Debugging the Angular 2 in Visual Studio is not possible with this setup. The SPA app can be debugged in chrome. 

<strong>Links:</strong>

https://github.com/preboot/angular2-webpack

https://webpack.github.io/docs/

https://github.com/jtangelder/sass-loader