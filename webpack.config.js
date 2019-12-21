const Dotenv = require('dotenv-webpack');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  mode: "development",
  target: 'node',
  resolve: {
    extensions: [".ts", ".js"],
    mainFields: ['main']
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
  plugins: [
    new Dotenv()
  ],
};
