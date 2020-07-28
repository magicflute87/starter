const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const copyWebpackPlugin = require("copy-webpack-plugin");


// Webpack uses this to work with directories
const path = require('path');


module.exports = {
  mode: 'development',
  entry: {
  app: './src/javascript/index.js'
},
  // Path and filename of your result bundle.
  // Webpack will bundle all JavaScript into this file
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },

    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }           
        },
        {
          // Apply rule for .sass, .scss or .css files
          test: /\.(sa|sc|c)ss$/,
    
          // Set loaders to transform files.
          // Loaders are applying from right to left(!)
          // The first loader will be applied after others
          use: [

              'style-loader', 'css-loader?url=false', 'sass-loader',

               ],
        },
        {
          // Now we apply rule for images
          test: /\.(png|jpe?g|gif|svg)$/,
          use: [
                 {
                   // Using file-loader for these files
                   loader: "file-loader",
    
                   // In options we can set different things like format
                   // and directory to save
                   options: {
                     outputPath: 'images'
                   }
                 }
               ]
        },
        {
          // Apply rule for fonts files
          test: /\.(woff|woff2|ttf|otf|eot)$/,
          use: [
                 {
                   // Using file-loader too
                   loader: "file-loader",
                   options: {
                     outputPath: 'fonts'
                   }
                 }
               ]
        }
      ]
    },
    

    plugins: [

      new MiniCssExtractPlugin({
        filename: "bundle.css"
      }),
      new copyWebpackPlugin({
        patterns: [
          {from: 'src/images', to: 'images'}
        ]
      })
    ],

  // Default mode for Webpack is production.
  // Depending on mode Webpack will apply different things
  // on final bundle. For now we don't need production's JavaScript 
  // minifying and other thing so let's set mode to development
};