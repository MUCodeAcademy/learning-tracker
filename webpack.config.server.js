const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
 
const entry = path.join(__dirname, './server.js')
 
module.exports = {
    mode: 'development',
    devtool: false,
    externals: [
        nodeExternals()
    ],
    name : 'server',
    target: 'node',
    entry: entry,
    output: {
        publicPath: './',
        path: path.resolve(__dirname, './'),
        filename: 'server.prod.js',
        libraryTarget: "commonjs2"
    },
    resolve: {
        extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
        modules: [
            path.resolve(__dirname, 'node_modules')
        ]
    },
    module : {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: "babel-loader",
                options : {
                    babelrc : true
                }
            }
        ],
    },
    node: {
        console: false,
        global: false,
        process: false,
        Buffer: false,
        __filename: false,
        __dirname: false,
    }
};