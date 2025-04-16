var path = require('path');
var version = require('./package.json').version;

var rules = [
    {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
    },
    {
        test: /\.(jpg|png|gif)$/,
        use: ['url-loader']
    },
];


module.exports = [
    {
        entry: './lib/extension.js',
        output: {
            filename: 'extension.js',
            path: path.resolve(__dirname, '..', 'ipytree', 'nbextension'),
            libraryTarget: 'amd',
        }
    },
    {
        entry: ['./amd-public-path.js', './lib/index.js',],
        output: {
            filename: 'index.js',
            path: path.resolve(__dirname, '..', 'ipytree', 'nbextension'),
            libraryTarget: 'amd',
            publicPath: '' // Set in amd-public-path.js
        },
        devtool: 'source-map',
        module: {
            rules: rules
        },
        // 'module' is the magic requirejs dependency used to set the publicPath
        externals: ['@jupyter-widgets/base', 'module']
    },
    {
        // The target bundle is always `dist/index.js`, which is the path
        // required by the custom widget embedder.
        entry: ['./amd-public-path.js', './lib/index.js'],
        output: {
            filename: 'index.js',
            path: path.resolve(__dirname, 'dist'),
            libraryTarget: 'amd',
            publicPath: '', // Set in amd-public-path.js
        },
        devtool: 'source-map',
        module: {
            rules: rules
        },
        // 'module' is the magic requirejs dependency used to set the publicPath
        externals: ['@jupyter-widgets/base', 'module']
    }
];
