# Angular Visual Studio Webpack Starter

Template for <a href="http://webpack.github.io/docs/">Webpack </a> , <a href="https://www.visualstudio.com/">Visual Studio</a> ASP.NET Core and <a href="https://angular.io/docs/ts/latest/quickstart.html">Angular</a>. Both the client and the server side of the application is implemented inside one ASP.NET Core project which makes it easier to deploy.

|                           | Build                                                                                                                                                             |       
| ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| .NET Core, angular        | [![Build status](https://ci.appveyor.com/api/projects/status/3x6y01a8312x6o2p?svg=true)](https://ci.appveyor.com/project/damienbod/angular2webpackvisualstudio)   |


<img src="https://damienbod.files.wordpress.com/2016/06/vs_webpack_angular2.png?w=600" alt="vs_webpack_angular2" width="600" height="225" class="alignnone size-medium wp-image-6700" />


## Authors
<img src="https://avatars.githubusercontent.com/u/11268349?v=3" width="70"><img src="https://avatars.githubusercontent.com/u/3442158?v=3" width="70"><img src="https://pbs.twimg.com/profile_images/707847627992338432/ytT_FxUY_400x400.jpg" width="70" alt="Roberto Simonetti">

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

The npm package.json configuration loads all the required packages for Angular and Webpack. The Webpack packages are all added to the devDependencies. A "npm build" script and also a "npm buildProduction" are also configured, so that the client application can be built using Webpack from the cmd line using  "npm run build-production". These two scripts just call the same cmd as the NPM task runner.

## Production build

It can be run using npm run build-production which is configured in the package.json.

```
npm run webpack-production
```

## Dev build

```
npm run build-dev
```

## Hot module reload

It can be run using npm run build-production which is configured in the package.json.

```
npm start
```

## watch for development

```
npm run watch-webpack-dev
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

The watch-webpack-dev npm script can be automatically be started in Visual Studio by adding the following to the package.json

```
"-vs-binding": { "ProjectOpened": [ "watch-webpack-dev" ] }
```

## Testing

The XUnit test for ASP.NET Core API is in tests/AngularWebpackVisualStudio_Tests folder:

dotnet test

or from Visual Studio: Test > Run > All Tests

See this link for more details on XUnit testing in ASP.NET Core: https://docs.microsoft.com/it-it/dotnet/articles/core/testing/unit-testing-with-dotnet-test


The Angular test is in angularApp/tests folder. It uses Karma test runner and Jasmine test framework:

```
npm test
```

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
