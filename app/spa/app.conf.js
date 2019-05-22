

module.exports = {
  publicPath: '',
  proxy: {
    '/api': {
      target: 'http://localhost:7000'
      // secure: false
      // pathRewrite: { '^/api': '' }
    },
    '/public/upload': {
      target: 'http://localhost:9000'
      // secure: false
    }
  }
}
