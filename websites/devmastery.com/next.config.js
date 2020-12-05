const WatchExternalFilesPlugin = require("extra-watch-webpack-plugin");

module.exports = {
  i18n: {
    // These are all the locales you want to support in
    // your application
    locales: ["en", "fr"],
    // This is the default locale you want to be used when visiting
    // a non-locale prefixed path e.g. `/hello`
    defaultLocale: "en",
  },
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
