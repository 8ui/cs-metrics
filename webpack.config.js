const path = require('path');

module.exports = {
  mode: "none",
  target: ['web', 'es5'],
  // "mode": "production",
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "index.js"
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src', 'index.js'),
        loader: require.resolve('babel-loader'),
        options: {
          babelrc: false,
          presets: ["@babel/preset-env"],
          // "plugins": [
          //   ["@babel/plugin-transform-arrow-functions", { "spec": true }]
          // ]
        }
      }
    ]
  }
};
