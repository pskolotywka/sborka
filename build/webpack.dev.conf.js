const webpack = require('webpack');
const merge = require('webpack-merge');

const baseWebpackConfig = require('./webpack.base.conf');
const devWebpackConfig = merge(baseWebpackConfig, {
    mode: 'development',
    devtool: "cheap-eval-source-map",
    devServer: {
        contentBase: baseWebpackConfig.externals.paths.dist,                     // Указываем где будет открываться вебпак, через такой путь мы берём путь с PATHS который находится в base
        port: 8081,
        overlay: {
            warnings: false,
            errors: true,
        },
    },
    plugins: [
        new webpack.SourceMapDevToolPlugin({
            filename: '[name].map',
        })
    ],
});

module.exports = new Promise((resolve, reject) => {
    resolve(devWebpackConfig);
});




