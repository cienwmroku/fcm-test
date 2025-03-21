const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { library } = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = [
  {
    entry: {
      bundle: "./src/main.tsx",
      sw: "./src/firebase-messaging-sw.ts",
    },
    mode: "production",
    target: "web",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: (pathData) => {
        return pathData.chunk.name === "sw"
          ? "firebase-messaging-sw.js"
          : "[name].js";
      },
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [{ from: "./public/", to: "./" }],
      }),
      new HtmlWebpackPlugin({
        template: "./src/index.html",
        inject: false,
        //favicon: "./src/assets/img/logo_black_cloud.svg",
      }) /*
      new CopyWebpackPlugin({
        patterns: [{ from: path.resolve(__dirname, "src", "sitemap.xml") }],
      }),*/,
    ],
    resolve: {
      extensions: [".js", ".ts", ".tsx", ".jsx"],
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: "ts-loader",
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              preset: [
                "@babel/preset-env",
                "@babel/preset-react",
                "@babel/preset-typescript",
              ],
            },
          },
        } /*
        {
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/,
          use: ["@svgr/webpack"],
        },
        {
          test: /\.(ttf)$/i,
          type: "asset/resource",
        },*/,
      ],
    },
    devServer: {
      historyApiFallback: true,
      port: 5000,
    },
    performance: {
      hints: false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
  },
];
