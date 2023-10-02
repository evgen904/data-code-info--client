const { defineConfig } = require("@vue/cli-service");
const path = require("path");
const PrerenderSPAPlugin = require('prerender-spa-plugin-next');

const pluginsWebpack = process.env.NODE_ENV === "production" ? [
    new PrerenderSPAPlugin({
      routes: [ '/test-render' ],
      postProcess: function (context) {
        var titles = {
          '/test-render': 'Test gallery'
        }
        context.html = context.html.replace(
          /<title>[^<]*<\/title>/i,
          '<title>' + titles[context.route] + '</title>'
        )
      },
      rendererOptions: {
        maxConcurrentRoutes: 1,
        renderAfterDocumentEvent: 'renderer-ready',
      }
    })
  ] : [];


let remotesCalendar =
  process.env.NODE_ENV === "production"
    ? "https://www.data-code-info.ru/repa1"
    : "http://localhost:8080";

module.exports = defineConfig({
  devServer: {
    port: 5000
  },
  transpileDependencies: true,
  lintOnSave: false,
  chainWebpack: (config) => {
    config.resolve.alias.set(
      "modules",
      path.resolve(__dirname, "node_modules/")
    );
    config.resolve.alias.set("@", path.resolve(__dirname, "src/"));
    config.resolve.alias.set("assets", path.resolve(__dirname, "src/assets"));
    config
      .plugin("module-federation-plugin")
      .use(require("webpack").container.ModuleFederationPlugin, [
        {
          remotes: {
            calendar: `calendar@${remotesCalendar}/remoteEntry.js`,
          },
        },
      ]);
  },
  configureWebpack: {
    plugins: pluginsWebpack,
  },
  publicPath:
    process.env.NODE_ENV === "production" ? process.env.VUE_APP_BASEPATH : "/", //"./",
  productionSourceMap: true,
  assetsDir: "./assets",
});
