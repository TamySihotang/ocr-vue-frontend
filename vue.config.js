// const { defineConfig } = require('@vue/cli-service')
module.exports = {
  devServer: {
      proxy: {
          '/api': {
              target: 'http://localhost:7011',
              // changeOrigin: true,
              pathRewrite: {
                '^/api': ''
            }
        },
          
      }
  }
}
