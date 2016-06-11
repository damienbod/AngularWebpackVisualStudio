/// <binding ProjectOpened='Run - Development' />
var path = require('path');
var webpack = require('webpack');

var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var Autoprefixer = require('autoprefixer');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var isProd = (process.env.NODE_ENV === 'production');

module.exports = function makeWebpackConfig() {

    var config = {};
    var outputfilename = 'dist/[name].js';
    if (isProd) {
        //config.devtool = 'source-map';
        outputfilename = 'dist/[name].[hash].js';
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
        publicPath: isProd ? '' : 'http://localhost:5000/',
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
            {
                test: /\.css$/,
                exclude: root('angular2App', 'app'),
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss')
            },
            {
                test: /\.css$/,
                include: root('angular2App', 'app'),
                loader: 'raw!postcss'
            },
            {
                test: /\.css$/,
                include: root('angular2App', 'css'),
                loader: ExtractTextPlugin.extract("style", "css!sass")
            },
            {
                test: /\.scss$/,
                exclude: root('angular2App', 'app'),
                loader: ExtractTextPlugin.extract('style', 'css?sourceMap!postcss!sass')
            },
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
        //new ExtractTextPlugin('css/[name].[hash].css', { disable: !isProd })
        new ExtractTextPlugin('css/hallelujah.css'),
        new CopyWebpackPlugin([

            // copy all images to [rootFolder]/images
            { from: root('angular2App/images'), to: 'images' },

            // copy all css to [rootFolder]/css
            { from: root('angular2App/css'), to: 'css' },

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
} ();

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
