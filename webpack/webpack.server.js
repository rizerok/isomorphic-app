const path = require('path');
module.exports = {
    target:'node',
    entry:{
        server:path.resolve('src','server.js')
    },
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
                            'react'
                        ],
                        cacheDirectory:true
                    }
                }
            }
        ]
    }
};