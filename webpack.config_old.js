const path = require('path');
const webpack = require('webpack');

const clientConfig = {
    entry:{
        app:path.resolve('src','client.js')
    },
    target:'web',
    output:{
        filename:path.join('public','[name].js'),
        publicPath:'/'
    },
    resolve:{
        alias:{
            root:path.resolve(),
        }
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
                            'env',//https://babeljs.io/docs/plugins/preset-env/
                            'react',
                            'stage-3'//https://babeljs.io/docs/plugins/preset-stage-3/
                        ],
                        plugins:[
                            'transform-decorators-legacy',
                            'transform-async-to-generator'
                        ],
                        cacheDirectory:true
                    }
                }
            }
        ]
    }
};

const serverConfig = {
    entry:{
        server:path.resolve('src','server.js')
    },
    target:'node',
    output:{
        filename:path.join('public','[name].js'),
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
                            'react',
                        ],
                        plugins:[

                        ],
                        cacheDirectory:true
                    }
                }
            }
        ]
    }
};

module.exports = [clientConfig,serverConfig];