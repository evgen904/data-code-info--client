const { defineConfig } = require("@vue/cli-service");
const path = require("path");
const PrerenderSPAPlugin = require('prerender-spa-plugin-next');
const webpack = require("webpack");

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
    : "http://localhost:8088";

module.exports = defineConfig({
  devServer: {
    port: 5000
  },
  pages: {
    index: {
      entry: "./src/index.js",
    },
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
  },
  configureWebpack: {
    plugins: [
      // ...pluginsWebpack,
      new webpack.container.ModuleFederationPlugin({
        name: "app_general",
        filename: "remoteEntry.js",
        remotes: {
          calendar: `calendar@${remotesCalendar}/js/remoteEntry.js`,
        },
        shared: {
          vue: {
            singleton: true,
          },
        },
      }),
    ],
  },
  publicPath:
    process.env.NODE_ENV === "production" ? process.env.VUE_APP_BASEPATH : "/", //"./",
  productionSourceMap: true,
  assetsDir: "./assets",
});
