const path = require("path");
const entryPath = "src";
const entryFile = "index.js";


module.exports = {
  entry: ['whatwg-fetch', `./${entryPath}/${entryFile}`],
  output: {
    filename: "app2.js",
    path: path.resolve(__dirname, `public/`)
  },
  devServer: {
    contentBase: path.join(__dirname, `src/`),
    publicPath: "/build",
    compress: true,
    port: 3000
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
       test: /\.css$/i,
       use: ['style-loader', 'css-loader'],
     }
    ]
  }
};
