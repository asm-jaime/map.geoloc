const path = require('path');
const webpack = require('webpack');

const productionURL = 'http://geopos.online:8081';
const developmentURL = 'http://localhost:8081';

const URL = process.env.NODE_ENV === 'production' ? productionURL : developmentURL;

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'public/build.js',
    sourceMapFilename: 'public/build.map'
  },
  resolve: {
    modules: [__dirname, 'node_modules'],
    alias: {
      vue: 'vue/dist/vue.js'
    }
  },
  module: {
    loaders: [{
      test: /\.vue$/,
      loader: 'vue-loader'
    }, {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }, {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'file',
      query: {
        name: '[name].[ext]?[hash]'
      }
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader',
    }]
  },
  devtool: '#eval-source-map',
};

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map';
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      API_URL: JSON.stringify(URL),
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin()
  ]);
} else {
  module.exports.devtool = '#source-map';
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      API_URL: JSON.stringify(URL),
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),
  ]);
}
