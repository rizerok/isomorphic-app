const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let extractStylus = new ExtractTextPlugin({
    filename:path.join('public','[name].css')
});

module.exports = {
    devtool:'cheap-eval-source-map',
    devServer:{
        openPage:'',
    },
    module:{
        rules:[
            {
                test:/\.scss$/,
                exclude:path.resolve('assets','styles'),
                use:extractStylus.extract({
                    fallback: 'style-loader',
                    use:[{
                        loader: 'css-loader',
                        options: {
                            sourceMap:true,
                            modules: true,
                            importModules:2,
                            //https://github.com/webpack/loader-utils#interpolatename
                            localIdentName: '[name]__[local]-[hash:base64:5]'
                        }
                    },
                    {
                        loader:'postcss-loader',
                        options:{
                            sourceMap: true
                        }
                    },
                    {
                        loader:'sass-loader',
                        options:{

                        }
                    }]
                })
            },
            {
                test:/\.scss$/,
                include:path.resolve('assets','styles'),
                use:extractStylus.extract({
                    fallback: 'style-loader',
                    use:[{
                        loader: 'css-loader',
                        options: {
                            sourceMap:true,
                            importModules:2
                        }
                    },
                    {
                        loader:'postcss-loader',
                        options:{
                            sourceMap: true
                        }
                    },
                    {
                        loader:'sass-loader',
                        options:{

                        }
                    }]
                })
            }
        ]
    },
    plugins:[
        extractStylus
    ]
};