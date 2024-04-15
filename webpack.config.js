const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'spin.js',
        library: 'spin'
    },
    resolve: {
        fallback: {
          "path": require.resolve("path-browserify"),
          "util": require.resolve("util/"),
          "crypto": require.resolve("crypto-browserify"),
          "os": require.resolve("os-browserify/browser"),
          "stream": require.resolve("stream-browserify"),
          "fs": false,  // 'fs' is often not needed in the browser, set to false or adjust as necessary
          "assert": require.resolve("assert/"),
          "constants": require.resolve("constants-browserify"),
          "http": require.resolve("stream-http"),
          "https": require.resolve("https-browserify"),
          "zlib": require.resolve("browserify-zlib"),
          "vm": require.resolve("vm-browserify")
        }
    },
    optimization: {
        minimize: false
    },
};
