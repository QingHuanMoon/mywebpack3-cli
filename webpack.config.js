const path = require('path');
const glob = require('glob');
const PurifyCssPlugin = require('purifycss-webpack');
const uglify = require('uglifyjs-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');
console.log( encodeURIComponent(process.env.type) );
if(process.env.type === "build") {
    var website = {
        publicPath:"http://test.wp:8888/"
    }
    console.log(website)
} else {
    var website = {
        publicPath:"http://127.0.0.1:1717/"
    }
    console.log(website)
}
// const glob = require('glob');
// const PurifyCSSPlugin = require("purifycss-webpack");
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
        new webpack.ProvidePlugin({
            $: 'jquery',
            'Vue': 'vue'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'jquery',
            filename: 'assets/js/[name].js',
            minChunks:2
        }),
        new copyWebpackPlugin([{
            from:__dirname+'/src/public',
            to:'./public'
        }]),
        new PurifyCssPlugin({
            paths:glob.sync(path.join(__dirname,'src/*.html')),
        })
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
    },

    resolve: {
        alias: {
            'vue': 'vue/dist/vue.common.js'
        }
    }
}
