const path = require('path');
const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');
//const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    target:'web',
    entry:{
        app:path.resolve('src','client.js')
        //TODO vendors
    },
    output:{
        filename:path.join('public','[name].js'),
        publicPath:'/'
    },
    resolve:{
        alias:{
            root:path.resolve(),
            public:path.resolve('public'),
            src:path.resolve('src'),
            components:path.resolve('src','components'),
            styles:path.resolve('src','assets','styles'),
            fonts:path.resolve('src','assets','fonts'),
            img:path.resolve('src','assets','images')
        }
    },
    module:{
        rules:[
            {
                enforce: 'pre',
                test: /\.js$/,
                use: 'eslint-loader',
                include: [
                    path.resolve('src')
                ]
            },
            {
                test:/\.js$/,
                include:path.resolve('src'),
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:[
                            'env',//https://babeljs.io/docs/plugins/preset-env/
                            'react',
                            'stage-3'//https://babeljs.io/docs/plugins/preset-stage-3/
                        ],
                        plugins:[

                        ],
                        cacheDirectory:true
                    }
                }
            },
            {
                test: /\.(gif|png|jpe?g|svg|ico)$/i,
                use: {
                    loader: 'file-loader',
                    options: {
                        name:path.join('public','images','[name].js')
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /fonts\/.*\.(eot|svg|ttf|woff|woff2)$/i,
                use: {
                    loader: 'file-loader',
                    options: {
                        name:path.join('public','fonts','[name].js')
                    }
                }
            }
        ]
    },
    // devServer:{
    //     port:3000,
    //     open:true,
    //     historyApiFallback: true
    // },
    plugins:[
        new CleanWebpackPlugin(
            [
                'public'
            ],
            {
                root:     path.resolve(),
                verbose:  true
            }
        ),
        // new HtmlWebpackPlugin({
        //     inject:false,
        //     template: path.resolve('templates','index.html.ejs'),
        //     filename:'index.html'
        // })
    ]
};