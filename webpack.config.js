const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/index.js',
    experiments: {
        outputModule: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/, // Apply the loader to all JS files
                use: [
                    {
                        loader: path.resolve('./loaders/replaceNodeImportLoader.js')
                    }
                ]
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        fallback: {
            zlib: require.resolve('@react-pdf/zlib'),
            stream: require.resolve('stream-browserify'),
            buffer: require.resolve('buffer'),
            util: require.resolve('util'),
            'process/browser': require.resolve('process/browser'),
            os: require.resolve("os-browserify/browser"),
            "http": require.resolve("stream-http"),
            "https": require.resolve("https-browserify"),
            "path": require.resolve("path-browserify"),
            fs: false,
            tls: false,
            net: false,
            constants: false,
            'crypto-browserify': false,
            crypto: false,
            querystring: false,
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
        }),
        new webpack.ProvidePlugin({
            process: 'process/browser',
        }),
    ],
    output: {
        path: path.resolve(__dirname, './'),
        filename: 'dist.js',
        module: true,
        library: {
            type: "module",
        }
    },
    externals: {
        "wasi:http/types@0.2.0": "wasi:http/types@0.2.0",
        "fermyon:spin/llm@2.0.0": "fermyon:spin/llm@2.0.0",
        "fermyon:spin/variables@2.0.0": "fermyon:spin/variables@2.0.0",
        "fermyon:spin/redis@2.0.0": "fermyon:spin/redis@2.0.0",
        "fermyon:spin/key-value@2.0.0": "fermyon:spin/key-value@2.0.0",
        "fermyon:spin/sqlite@2.0.0": "fermyon:spin/sqlite@2.0.0",
        "fermyon:spin/postgres@2.0.0": "fermyon:spin/postgres@2.0.0",
        "fermyon:spin/mysql@2.0.0": "fermyon:spin/mysql@2.0.0",
        "fermyon:spin/mqtt@2.0.0": "fermyon:spin/mqtt@2.0.0"

    },
    optimization: {
        minimize: false
    },
};