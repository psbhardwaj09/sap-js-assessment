const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
   entry: './src/js/index.js',
   output: {
      path: path.resolve(__dirname, 'public'),
      filename: 'bundle.js',
   },
   devServer: {
      contentBase: './public',
   },
   plugins: [
      new HtmlWebpackPlugin({
         filename: 'index.html',
         template: './public/index.html',
      }),
   ],
   module: {
      rules: [
         {
            test: /\.js$/, //using regex to tell babel exactly what files to transcompile
            exclude: /node_modules/, // files to be ignored
            use: {
               loader: 'babel-loader', // specify the loader
            },
         },
         {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
         },
      ],
   },
};
