const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: path.resolve(__dirname, 'src/index.js'),
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js",
    },
    resolve: {
        modules : [path.join(__dirname, "src"), "node_modules"],
        alias: {
            react: path.join(__dirname, "node_modules", "react")
        }
    },
    devServer: {
        proxy: [
            {
                "context": ["/api"],
                "target": "http://localhost:8000"
            }
        ]
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
    plugins: [
        new HtmlWebpackPlugin({template: "./public/index.html"})
    ],
    performance: {
        hints: false,
    },
};