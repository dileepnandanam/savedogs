const path = require('path')

module.exports = {
  resolve: {
    alias: {
      'src': path.resolve(__dirname, '..', '..', 'app/javascript/packs/src'),
      'components': path.resolve(__dirname, '..', '..', 'app/javascript/packs/components')
    }
  }
}
