const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "[name].[chunkhash].bundle.js",
        chunkFilename: '[name].[chunkhash].bundle.js',
    },
    resolve: {
        modules : [path.join(__dirname, "src"), "node_modules"],
        alias: {
            react: path.join(__dirname, "node_modules", "react")
        }
    },
    devServer: {
        proxy: {
            "/api": "http://localhost:8000"
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.css$/,
                use: [                  
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                    }
                ]
            }
        ]
    },
    optimization: {
        splitChunks: {
          cacheGroups: {
            vendors: {
              test: /node_modules\/(?!prime\/).*/,
              name: "vendors",
              chunks: "all",
            },
            prime: {
              test: /node_modules\/(prime\/).*/,
              name: "prime",
              chunks: "all",
            },
          },
        },
        runtimeChunk: {
          name: "manifest",
        },
    },
    plugins: [
        new HtmlWebpackPlugin({template: "./public/index.html"}),
        new Dotenv({path: "../.env"}),
    ]
};