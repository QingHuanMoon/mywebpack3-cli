const path = require('path');
const uglify = require('uglifyjs-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');
if(process.env.type== "build"){
    var website={
        publicPath:"http://127.0.0.1:1717/"
    }
}else{
    var website={
        publicPath:"http://www.sop1ay.com:7777/"
    }
}
const glob = require('glob');
const PurifyCSSPlugin = require("purifycss-webpack");
const webpack = require('webpack');
const copyWebpackPlugin= require("copy-webpack-plugin");



module.exports = {
    devtool: "eval-source-map",
    entry:{
        entry: './src/main.js',
        jquery: 'jquery'
    },

    output:{
        path: path.resolve(__dirname,'dist'),
        filename: '[name].js',
        publicPath: website.publicPath
    },

    module:{
        rules: [
            {
                test: /\.css$/,
                use: extractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        { loader: 'css-loader', options: { importLoaders: 1 } },
                        'postcss-loader'
                    ]
                })
            },
            {
                test: /\.(png|jpg|gif)/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 500000,
                        outputPath: 'images/'
                    }
                }]
            },
            {
                test: /\.(htm|html)$/i,
                use:['html-withimg-loader']
            },
            {
                test: /\.less$/,
                use: extractTextPlugin.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "less-loader"
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            },
            {
                test: /\.scss$/,
                use: extractTextPlugin.extract({
                    use: [{
                        loader: "css-loader"
                    }, {
                        loader: "sass-loader"
                    }],
                    // use style-loader in development
                    fallback: "style-loader"
                })
            },
            {
                test:/\.(jsx|js)$/,
                use:{
                    loader: 'babel-loader',
                },
                exclude: /node_modules/
            }
        ]
    },

    plugins:[
        new uglify(),
        new htmlPlugin({
            minify: {
                removeAttributeQuotes: true,
            },
            hash: true,
            template: './src/index.html'
        }),
        new extractTextPlugin('css/index.css'),
        new PurifyCSSPlugin({
            path: glob.sync(path.join(__dirname,'src/*.html'))
        }),
        new webpack.ProvidePlugin({
            $: 'jquery'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'jquery',
            filename: 'assets/js/[name].js',
            minChunks:2
        }),
        new copyWebpackPlugin([{
            from:__dirname+'/src/public',
            to:'./public'
        }])
    ],

    devServer:{
        contentBase: path.resolve(__dirname,'dist'),
        host: 'localhost',
        compress: true,
        port: 1717
    },
    watchOptions: {
        poll: 1000,
        aggregateTimeout : 500,
        ignored: /node_modules/,
    }
}
