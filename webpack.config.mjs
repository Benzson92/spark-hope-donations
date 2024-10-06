import path from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from 'html-webpack-plugin'; // No need to import webpack anymore

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
  entry: './src/index.tsx',

  output: {
    publicPath: '/dist/',
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  },

  resolve: {
    // alias: {
    //   '@': path.resolve(__dirname, 'src'), // Shorten imports with alias
    // },
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },

  devtool: 'eval-source-map',

  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    hot: true, // Enable HMR, no need for the plugin
    host: '0.0.0.0',
    port: 3000,
    historyApiFallback: true,
    liveReload: true, // Enable live reload
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: [/node_modules/],
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
    }),
  ],

  mode: 'development',
};

export default config;
