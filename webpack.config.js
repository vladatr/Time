const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + '/src/index.html',
    filename: 'index.html',
    inject: 'body'
})

const DEVELOPMENT = process.env.NODE_ENV === 'development'
const JS_LOADER = {
    test: /\.(js|jsx)$/,
    loaders: [
        'babel-loader'
    ],
    exclude: /node_modules/
}
const webpackConfig = {
    entry: [
        './src/index.js'
    ],
    devtool: 'inline-source-map',
    output: {
        path: __dirname + '/dist',
        filename: 'index_bundle.js',
        publicPath: '/'
    },
    module: {
        rules: [
            JS_LOADER,
            {
                test: /\.css$/,
                use: [{ loader: 'style-loader' }, { loader: 'css-loader' }]
            },
            {
                test: /\.(png|jp(e*)g|svg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8000, // Convert images < 8kb to base64 strings
                        name: 'images/[hash]-[name].[ext]'
                    }
                }]
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "fonts/[name].[ext]",
                    },
                },
            }
        ]
    },
    plugins: [
        HtmlWebpackPluginConfig
    ],
    devServer: {
        host: 'localhost',
        port: 8081,
        historyApiFallback: true
    },
    mode: "development"
}
module.exports = webpackConfig