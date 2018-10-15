const path = require('path');
const WebpackNotifierPlugin = require('webpack-notifier');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: [
        path.resolve(__dirname, 'src', 'assets', 'js', 'app.js'),
        path.resolve(__dirname, 'src', 'assets', 'sass', 'app.scss')
    ],
    output: {
        filename: path.join('js', 'app.js'),
        path: path.resolve(__dirname, 'public')
    },
    module: {
        rules: [
            {
                test: /\.(sass|scss)$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                url: false,
                                minimize: process.env.NODE_ENV === 'production',
                                importLoaders: 1
                            }
                        },
                        {
                            loader: 'sass-loader'
                        }
                    ]
                })
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    plugins: [
        new WebpackNotifierPlugin({
            alwaysNotify: process.env.NODE_ENV === 'development',
            skipFirstNotification: process.env.NODE_ENV === 'production'
        }),
        new ExtractTextPlugin({
            filename: path.join('css', 'app.css'),
            allChunks: true
        })
    ],
    devtool: 'source-map'
};
