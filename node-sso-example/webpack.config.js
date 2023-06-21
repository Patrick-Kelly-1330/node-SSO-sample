import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

var SRC_DIR = path.join(__dirname, "/routes");
var DIST_DIR = path.join(__dirname, "/client/dist");


export default {
  mode: "development",
  devtool: "inline-source-map",
  entry: `${SRC_DIR}/index.js`,
  output: {
    filename: "bundle.js",
    path: DIST_DIR
  },
  resolve: {
    fallback: {
      crypto: false,
      url: false,
      path: false,
      util: false,
      stream: false,
      buffer: false,
      string_decoder: false,
      querystring: false,
      http: false,
      zlib: false,
    }
  },
  module: {
    rules: [
      {
        test: [/\.jsx$/],
        exclude: /node_modules/,
        use:{
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader"}
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.ejs$/,
        use: [
            {
              loader: "ejs-webpack-loader",
              options: {
                data: {title: "New Title", someVar:"hello world"},
                htmlmin: true
              }
            }
        ]
    }
    ]
  }
};