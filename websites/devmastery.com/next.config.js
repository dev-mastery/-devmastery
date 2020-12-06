const WatchExternalFilesPlugin = require("extra-watch-webpack-plugin");
const i18n = require("./locales.config");
module.exports = {
  i18n,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    config.plugins.push(
      // BUG? rebuilds when content changes, but won't refresh the browser.
      new WatchExternalFilesPlugin({
        dirs: ["./content/"],
      })
    );

    // Important: return the modified config
    return config;
  },
};
