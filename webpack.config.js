const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = (env) => ({
    devtool: 'cheap-module-source-map',
    entry: {
        content: "./src/js/content.ts",
        background: "./src/js/background.ts",
    },
    output: {
        filename: "[name].js",
        path: `${__dirname}/dist/${env.mode}/js`,
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                include: `${__dirname}/src/js`,
                use: ["awesome-typescript-loader"],
            },
        ],
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: "manifest-template.json",
                to: `${__dirname}/dist/${env.mode}/manifest.json`,
                transform (content, path) {
                    return content.toString().replace(/PACKAGE_JSON_VERSION/, require("./package.json").version);
                },
            },
            {
                from: "./src/res",
                to: `${__dirname}/dist/${env.mode}`,
            },
        ]),
    ],
    optimization: {
        minimizer: [new UglifyJsPlugin({})],
    },
});
