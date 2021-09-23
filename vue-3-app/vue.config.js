module.exports = {
  chainWebpack: (config) => {
    config.externals(['single-spa']);
  },
  runtimeCompiler: true,
};