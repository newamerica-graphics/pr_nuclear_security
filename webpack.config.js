const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

module.exports = env => {
  return {
    entry: ["./src/index.js"],
    output: {
      path: path.join(__dirname, "public"),
      filename: `bundle.${env.deploy ? "[contenthash]." : ""}js`
    },
    externals: {
      react: "React",
      "react-dom": "ReactDOM",
      redux: "Redux",
      "react-redux": "ReactRedux",
      newamericadotorg: "newamericadotorg"
    },
    plugins: [
      env.deploy === "development" && new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        title: "",
        chartIDs: ["unga", "npt"],
        inject: false,
        template: path.resolve(__dirname, "src/index.html")
      }),
      env.deploy &&
        new CompressionPlugin({
          test: /\.(js|css)$/,
          filename: "[path].gz[query]",
          algorithm: "gzip",
          deleteOriginalAssets: false
        })
    ].filter(plugin => plugin),
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loaders: "babel-loader",
          options: {
            presets: ["@babel/env", "@babel/preset-react"],
            plugins: [
              "@babel/plugin-proposal-class-properties",
              "@babel/plugin-proposal-object-rest-spread"
            ]
          }
        },
        {
          test: /\.s?css/,
          use: [
            "style-loader",
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                plugins: loader => [
                  require("autoprefixer")(),
                  require("cssnano")()
                ]
              }
            },
            "sass-loader"
          ]
        }
      ]
    }
  };
};
