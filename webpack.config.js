const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  mode: "development",
  resolve: {
    extensions: [".ts", ".js"]
  },
  entry: "./src/app.ts",
  output: {
    path: `${__dirname}/dist`,
    filename: "app.js"
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader"
      }
    ]
  },
  devtool: isProduction ? false : 'inline-cheap-source-map',
};
