module.exports = {
  entry: './src/index.js',
  output: {
    filename: './lib/index.js',
    library: 'puppeteer',
    libraryTarget: 'umd'
  },
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
            plugins: ["transform-object-rest-spread"]
          },
        }
      }
    ]
  }
};