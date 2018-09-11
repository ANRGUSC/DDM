const path = require("path")
var webpack = require("webpack")

module.exports = {
    entry: {
        curl: "./src/curl.lib.js"
    },
    devtool: process.env.NODE_ENV === "production" ? undefined : "inline-source-map",
    mode: process.env.NODE_ENV || "development",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                options: {
                    presets: ["env"]
                }
            }
        ]
    },
    output: {
        path: __dirname + "/dist",
        publicPath: "/dist",
        filename: process.env.NODE_ENV === "production" ? "[name].lib.min.js" : "[name].lib.js",
        library: 'curl.lib.js',
        libraryTarget: 'umd'
    }
}
