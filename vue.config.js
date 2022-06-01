const { defineConfig } = require("@vue/cli-service");
const path = require("path");

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  chainWebpack: (config) => {
    config.resolve.alias.set(
      "modules",
      path.resolve(__dirname, "node_modules/")
    );
    config.resolve.alias.set("@", path.resolve(__dirname, "src/"));
    config.resolve.alias.set("assets", path.resolve(__dirname, "src/assets"));
  },
  publicPath:
    process.env.NODE_ENV === "production" ? process.env.VUE_APP_BASEPATH : "/", //"./",
  productionSourceMap: true,
  assetsDir: "./assets",
});
