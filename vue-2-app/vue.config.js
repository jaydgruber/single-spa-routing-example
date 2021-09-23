module.exports = {
  chainWebpack: (config) => {
    config.externals(['single-spa']);
  },
  runtimeCompiler: true,
  devServer: {
    port: 8081
  }
};