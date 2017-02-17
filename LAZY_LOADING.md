
# Angular Lazy Loading with Webpack 2

This documentation shows how Angular lazy loading can be supported using Webpack 2 for both JIT and AOT builds. The Webpack loader <a href="https://github.com/brandonroberts/angular-router-loader">angular-router-loader</a> from Brandon Roberts is used to implement this.

A big thanks to <a href="https://twitter.com/robisim74">Roberto Simonetti</a> for his help in this.


<strong>Code:</strong> <a href="https://github.com/damienbod/Angular2WebpackVisualStudio">Visual Studio 2015 project</a> | <a href="https://github.com/damienbod/Angular2WebpackVisualStudio/tree/VisualStudio2017">Visual Studio 2017 project</a> 

<ul>	
    <li><a href="https://github.com/damienbod/Angular2WebpackVisualStudio/blob/master/README.md">Readme</a></li>
	<li><a href="https://github.com/damienbod/Angular2WebpackVisualStudio/blob/master/CHANGELOG.md">Changelog</a></li>
	<li><a href="https://github.com/damienbod/Angular2WebpackVisualStudio/blob/master/HMR.md">Hot Module Replacement</a></li>
    <li><a href="https://damienbod.com/2017/01/01/building-production-ready-angular-apps-with-visual-studio-and-asp-net-core/">Building production ready Angular apps with Visual Studio and ASP.NET Core</a></li>
</ul>

## First create an Angular module

In this example, the about module will be lazy loaded when the user clicks on the about tab. The about.module.ts is the entry point for this feature. The module has its own component and routing. 
The app will now be setup to lazy load the AboutModule.

```javascript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutes } from './about.routes';
import { AboutComponent } from './components/about.component';

@NgModule({
    imports: [
        CommonModule,
        AboutRoutes
    ],

    declarations: [
        AboutComponent
    ],

})

export class AboutModule { }
```

## Add the angular-router-loader Webpack loader to the packages.json file

To add lazy loading to the app, the angular-router-loader npm package needs to be added to the <a href="https://github.com/damienbod/Angular2WebpackVisualStudio/blob/master/src/Angular2WebpackVisualStudio/package.json">packages.json</a> npm file in the devDependencies. 

```javascript
"devDependencies": {
    "@types/node": "7.0.5",
    "angular2-template-loader": "^0.6.0",
    "angular-router-loader": "^0.5.0",
```

## Configure the Angular routing

The lazy loading routing can be added to the app.routes.ts file. The loadChildren defines the module and the class name of the module which can be lazy loaded. It is also possible to pre-load lazy load modules if required.

```javascript
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'about', loadChildren: './modules/about/about.module#AboutModule',
    }
];

export const AppRoutes = RouterModule.forRoot(routes);

```

## Update the tsconfig-aot.json and tsconfig.json files

Now the <a href="https://github.com/damienbod/Angular2WebpackVisualStudio/blob/master/src/Angular2WebpackVisualStudio/tsconfig.json">tsconfig.json</a> for development JIT builds and the <a href="https://github.com/damienbod/Angular2WebpackVisualStudio/blob/master/src/Angular2WebpackVisualStudio/tsconfig-aot.json">tsconfig-aot.json</a> for AOT production builds need to be configured to load the AboutModule module.

<em>AOT production build </em> 

The files property contains all the module entry points as well as the app entry file. The angularCompilerOptions property defines the folder where the AOT will be built into. This must match the configuration in the Webpack production config file. 

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
    "angularApp/app/about/about.module.ts",
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

<em>JIT development build</em> 

The modules and entry points are also defined for the JIT build.

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
    "angularApp/app/app.module.ts",
    "angularApp/app/about/about.module.ts",
    "angularApp/main.ts"
  ],
  "awesomeTypescriptLoaderOptions": {
    "useWebpackText": true
  },
  "compileOnSave": false,
  "buildOnSave": false
}

```

## Configure Webpack to chunk and use the router lazy loading

Now the webpack configuration needs to be updated for the lazy loading.

<em>AOT production build </em>

The <a href="https://github.com/damienbod/Angular2WebpackVisualStudio/blob/master/src/Angular2WebpackVisualStudio/webpack.prod.js">webpack.prod.js</a> file requires that the chunkFilename property is set in the output, so that webpack chunks the lazy load modules.

```javascript
output: {
        path: './wwwroot/',
        filename: 'dist/[name].[hash].bundle.js',
        chunkFilename: 'dist/[id].[hash].chunk.js',
        publicPath: '/'
},
```

The angular-router-loader is added to the loaders. The genDir folder defined here must match the definition in tsconfig-aot.json.

```javascript
 module: {
  rules: [
    {
        test: /\.ts$/,
        loaders: [
            'awesome-typescript-loader',
            'angular-router-loader?aot=true&genDir=aot/'
        ]
    },
```

<em>JIT development build</em>

The <a href="https://github.com/damienbod/Angular2WebpackVisualStudio/blob/master/src/Angular2WebpackVisualStudio/webpack.dev.js">webpack.dev.js</a> file requires that the chunkFilename property is set in the output, so that webpack chunks the lazy load modules.

```javascript
output: {
        path: './wwwroot/',
        filename: 'dist/[name].bundle.js',
        chunkFilename: 'dist/[id].chunk.js',
        publicPath: '/'
},
```

The angular-router-loader is added to the loaders.

```javascript
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
```

## Build and run

Now the application can be built using the npm build scripts and the dotnet command tool.

Open a command line in the root of the src files. Install the npm packages:

```javascript
npm install
```

Now build the production build. The build-production does a ngc build, and then a webpack production build.

```javascript
npm run build-production
```

You can see that Webpack creates an extra chunked file for the About Module.

<img src="https://damienbod.files.wordpress.com/2017/01/lazyloadingwebpack_01.png" alt="lazyloadingwebpack_01" width="581" height="534" class="alignnone size-full wp-image-8108" />

Then start the application. The server is implemented using ASP.NET Core 1.1.

```javascript
dotnet run
```

When the application is started, the AboutModule is not loaded.

<img src="https://damienbod.files.wordpress.com/2017/01/lazyloadingwebpack_02.png?w=587" alt="lazyloadingwebpack_02" width="587" height="600" class="alignnone size-medium wp-image-8109" />

When the about tab is clicked, the chunked AboutModule is loaded.

<img src="https://damienbod.files.wordpress.com/2017/01/lazyloadingwebpack_03.png?w=600" alt="lazyloadingwebpack_03" width="600" height="519" class="alignnone size-medium wp-image-8110" />

Absolutely fantastic. You could also pre-load the modules if required. See this <a href="https://vsavkin.com/angular-router-preloading-modules-ba3c75e424cb">blog</a>.

<strong>Links:</strong>

https://github.com/brandonroberts/angular-router-loader

https://www.npmjs.com/package/angular-router-loader

https://vsavkin.com/angular-router-preloading-modules-ba3c75e424cb

https://webpack.github.io/docs/
