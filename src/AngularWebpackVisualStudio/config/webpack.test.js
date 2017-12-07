const helpers = require('./helpers');
const ProvidePlugin = require('webpack/lib/ProvidePlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');

const ENV = process.env.ENV = process.env.NODE_ENV = 'test';

module.exports = function (options) {
  return {

    devtool: 'inline-source-map',

    resolve: {

      extensions: ['.ts', '.js'],

      modules: [helpers.root('angularApp'), 'node_modules']

    },

    module: {

      rules: [

        {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'source-map-loader',
          exclude: [
            helpers.root('node_modules/rxjs'),
            helpers.root('node_modules/@angular')
          ]
        },
        {
          test: /\.ts$/,
          use: [
            {
              loader: 'awesome-typescript-loader',
              query: {
                sourceMap: false,
                inlineSourceMap: true,
                compilerOptions: {

                  removeComments: true

                }
              },
            },
            'angular2-template-loader'
          ],
          exclude: [/\.e2e\.ts$/]
        },
        {
          test: /\.css$/,
          loader: ['to-string-loader', 'css-loader'],
          exclude: [helpers.root('angularApp/index.html')]
        },
        {
            test: /\.scss$/,
            loader: ['raw-loader', 'sass-loader'],
            exclude: [helpers.root('angularApp/index.html')]
        },
        {
          test: /\.html$/,
          loader: 'raw-loader',
          exclude: [helpers.root('angularApp/index.html')]
        },
        {
          enforce: 'post',
          test: /\.(js|ts)$/,
          loader: 'istanbul-instrumenter-loader',
          include: helpers.root('angularApp'),
          exclude: [
            /\.(e2e|spec)\.ts$/,
            /node_modules/
          ]
        }

      ]
    },
    plugins: [

      new DefinePlugin({
        'ENV': JSON.stringify(ENV),
        'HMR': false,
        'process.env': {
          'ENV': JSON.stringify(ENV),
          'NODE_ENV': JSON.stringify(ENV),
          'HMR': false,
        }
      }),

      new ContextReplacementPlugin(

        /angular(\\|\/)core(\\|\/)@angular/,
        helpers.root('angularApp'), // location of your src
        {
        }
      ),

      new LoaderOptionsPlugin({
        debug: false,
        options: {
        }
      }),

    ],

    performance: {
      hints: false
    },

    node: {
      global: true,
      process: false,
      crypto: 'empty',
      module: false,
      clearImmediate: false,
      setImmediate: false
    }

  };
}
