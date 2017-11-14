const path = require('path')

const config = {
  node: {
    fs: 'empty'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ["transform-object-rest-spread"],
          },
        },
      },
    ],
  },
}

const main = Object.assign({}, config, {
  entry: './src/index.js',
  output: {
    filename: './lib/index.js',
    library: 'puppeteer',
    libraryTarget: 'umd'
  },
})

const example = Object.assign({}, config,{
  entry: './example/index.js',
  output: {
    filename: './example/bundle.js',
  },
  devServer: {
    contentBase: './example',
    compress: true,
    port: 5000
  },
})

module.exports = env => {
  if (env && env.example) return example
  return main
}
