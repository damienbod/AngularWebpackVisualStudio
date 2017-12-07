const path = require('path');

module.exports = {

    devtool: 'inline-source-map',

    performance: {
        hints: false
    },

    resolve: {
        extensions: ['.ts', '.js']
    },

    module: {
        rules: [
            {
                //enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader',
                exclude: [
                    path.join(__dirname, 'node_modules/rxjs'),
                    path.join(__dirname, 'node_modules/@angular')
                ]
            },
            {
                test: /\.ts$/,
                use: [
                    'awesome-typescript-loader',
                    'angular2-template-loader',
                    'source-map-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                include: path.join(__dirname, 'angularApp/styles'),
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.scss$/,
                exclude: path.join(__dirname, 'angularApp/styles'),
                use: [
                    'raw-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.html$/,
                use: 'raw-loader'
            },
            {
                enforce: 'post',
                test: /\.(js|ts)$/,
                loader: 'istanbul-instrumenter-loader',
                include: path.join(__dirname, 'angularApp'),
                exclude: [
                    /\.(e2e|spec)\.ts$/,
                    /node_modules/
                ]
            }
        ],
        exprContextCritical: false
    }

};
