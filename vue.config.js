
const webpack = require('webpack');
module.exports = {
    lintOnSave: false,
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                'window.Quill': 'quill/dist/quill.js',
                'Quill': 'quill/dist/quill.js'
            })
        ],
    },
    pwa: {
        iconPaths: {
            favicon32: './public/favicon.ico',
            favicon16: './public/favicon.ico',
            appleTouchTcom: './public/favicon.ico',
            maskIcon: './public/favicon.ico',
            msTileImage: './public/favicon.ico'
        }
    }
}

