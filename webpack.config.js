
const path = require('path');

const config = {
  context: path.resolve(__dirname, 'src'),  
  entry: {
    // removing 'src' directory from entry point, since 'context' is taking care of that
    app: './index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
}

module.exports = config;