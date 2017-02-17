# Hot Module Replacement

This article shows how HMR, or <a href="https://webpack.js.org/concepts/hot-module-replacement/">Hot Module Replacement </a>can be used together with Angular and Webpack.

<strong>Code:</strong> <a href="https://github.com/damienbod/Angular2WebpackVisualStudio">Visual Studio 2015 project</a> | <a href="https://github.com/damienbod/Angular2WebpackVisualStudio/tree/VisualStudio2017">Visual Studio 2017 project</a> 

<ul>	
    <li><a href="https://github.com/damienbod/Angular2WebpackVisualStudio/blob/master/README.md">Readme</a></li>
    <li><a href="https://github.com/damienbod/Angular2WebpackVisualStudio/blob/master/CHANGELOG.md">Changelog</a></li>
    <li><a href="https://github.com/damienbod/Angular2WebpackVisualStudio/blob/master/LAZY_LOADING.md">Lazy Loading</a></li>
    <li><a href="https://damienbod.com/2017/01/01/building-production-ready-angular-apps-with-visual-studio-and-asp-net-core/">Building production ready Angular apps with Visual Studio and ASP.NET Core</a></li>
</ul>

## package.json npm file

The <a href="https://webpack.js.org/configuration/dev-server/#devserver">webpack-dev-server</a> from <a href="https://twitter.com/keeskluskens">Kees Kluskens</a> is added to the devDependencies in the npm package.json file. The webpack-dev-server package implements and supports the HMR feature.
```javascript
"devDependencies": {
  ...
  "webpack": "^2.2.1",
  "webpack-dev-server": "2.2.1"
},
```

In the scripts section of the <a href="https://github.com/damienbod/Angular2WebpackVisualStudio/blob/master/src/Angular2WebpackVisualStudio/package.json">package.json</a>, the start command is configured to start the dotnet server and also the webpack-dev-server with the --hot and the --inline parameters.  

See the <a href="https://webpack.js.org/configuration/dev-server/#devserver">webpack-dev-server</a> documentation for more information about the possible parameters.

The dotnet server is only required because this demo application uses a Web API service implemented in ASP.NET Core.

```javascript
"start": "concurrently \"webpack-dev-server --hot --inline --port 8080\" \"dotnet run\" "
```

## webpack dev configuration

The devServer is added to the module.exports in the <a href="https://github.com/damienbod/Angular2WebpackVisualStudio/blob/master/src/Angular2WebpackVisualStudio/webpack.dev.js">webpack.dev.js</a>. This configures the webpack-dev-server as required. The webpack-dev-server configuration  can be set here as well as the command line options, so you as a developer can decide which is better for you.
```javascript
devServer: {
	historyApiFallback: true,
	contentBase: path.join(__dirname, '/wwwroot/'),
	watchOptions: {
		aggregateTimeout: 300,
		poll: 1000
	}
},
```

The output in the module.exports also needs to be configured correctly for the webpack-dev-server to work correctly. If the './' path is used in the path option of the output section, the webpack-dev-server will not start.
```javascript
output: {
	path: __dirname +  '/wwwroot/',
	filename: 'dist/[name].bundle.js',
	chunkFilename: 'dist/[id].chunk.js',
	publicPath: '/'
},
```

## Running the application

Build the application using the webpack dev build. This can be done in the commnad line. Before building, you need to install all the npm packages using npm install.
```javascript
$ npm run build-dev
```

The npm script build-dev is defined in the package.json file and uses the webpack-dev script which does a development build.
```javascript
"build-dev": "npm run webpack-dev",
"webpack-dev": "set NODE_ENV=development && webpack",
```

Now the server can be started using the start script.
```javascript
$ npm start
```

<img src="https://damienbod.files.wordpress.com/2017/02/hmr_angular_01.png?w=600" alt="hmr_angular_01" width="600" height="226" class="alignnone size-medium wp-image-8294" />

The application is now running on localhost with port 8080 as defined.

http://localhost:8080/home

If for example, the color is changed in the app.scss, the bundles will be reloaded in the browser without refreshing.
<img src="https://damienbod.files.wordpress.com/2017/02/hmr_angular2_03.gif?w=600" alt="hmr_angular2_03" width="600" height="401" class="alignnone size-medium wp-image-8302" />

## Links

https://webpack.js.org/concepts/hot-module-replacement/

https://webpack.js.org/configuration/dev-server/#devserver

https://github.com/webpack/webpack-dev-server

https://www.sitepoint.com/beginners-guide-to-webpack-2-and-module-bundling/

https://medium.com/@rajaraodv/webpack-hot-module-replacement-hmr-e756a726a07
