const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    target:'node',
    entry:{
        server:path.resolve('src','server.js')
    },
    output:{
        filename:path.join('server','[name].js'),
        publicPath:'/'
    },
    module:{
        rules:[
            {
                test:/\.js$/,
                include:path.resolve('src'),
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:[
                            'react'
                        ],
                        cacheDirectory:true
                    }
                }
            }
        ]
    },
    externals:[nodeExternals()],
    plugins:[
        new CleanWebpackPlugin(
            [
                'server'
            ],
            {
                root:     path.resolve(),
                verbose:  true
            }
        ),
    ]
};