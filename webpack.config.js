const path = require('path');

module.exports = {
 "mode": "none",
 "entry": "./src/index.js",
 "output": {
   // "library": "Metrics",
   // "libraryExport": "Metrics1",
   // "scriptType": "text/javascript",
   // "libraryTarget": "this",
   "path": __dirname + '/dist',
   "filename": "index.js"
 },
 // devtool: 'cheap-module-eval-source-map',
 devServer: {
   contentBase: path.join(__dirname, 'dist')
 },
 "module": {
   "rules": [
     {
       "test": /\.js$/,
       "exclude": /node_modules/,
       "use": {
         "loader": "babel-loader",
         "options": {
           "presets": [
             "@babel/preset-env",
           ],
           "sourceType": "unambiguous"
         }
       }
     },
   ]
 }
};
