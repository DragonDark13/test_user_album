const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const path = require('path');

module.exports = {
    plugins: [
        new CleanWebpackPlugin({
            dangerouslyAllowCleanPatternsOutsideProject:true,
            dry:true,
            cleanOnceBeforeBuildPatterns: ['dist/*', '!dist/bundle.js'],
        }),
    ],
};