const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = env => ({
    devtool: "cheap-module-source-map",
    entry: {
        popup: "./src/js/popup.ts",
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
                use: ["ts-loader"],
            },
        ],
    },
    plugins: [
        new CopyWebpackPlugin([
            {
                from: "manifest-template.json",
                to: `${__dirname}/dist/${env.mode}/manifest.json`,
                transform(content, path) {
                    return content
                        .toString()
                        .replace(
                            /PACKAGE_JSON_VERSION/,
                            require("./package.json").version,
                        );
                },
            },
            {
                from: "./src/res",
                to: `${__dirname}/dist/${env.mode}`,
            },
        ]),
    ],
    optimization: {
        minimize: env.mode === "production",
    },
});
