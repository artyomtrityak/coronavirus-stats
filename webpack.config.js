const path = require("path"); // eslint-disable-line @typescript-eslint/no-var-requires

module.exports = {
  entry: [
    "@babel/polyfill",
    "./public/src/index.tsx"
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 9000,
    hot: true
  },
  output: {
    path: path.join(__dirname, "/public/src"),
    filename: "app.bundle.js",
    publicPath: "/public/src/"
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"]
  },
  devtool: "eval-source-map"
};
