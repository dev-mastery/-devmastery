/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const WatchExternalFilesPlugin = require("extra-watch-webpack-plugin");
const i18n = require("./locales.config");
module.exports = {
  i18n,
  images: {
    domains: ["cdn-images-1.medium.com"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  webpack: (config) => {
    // Note: we provide webpack above so you should not `require` it
    // Perform customizations to webpack config
    config.plugins.push(
      // BUG? rebuilds when content changes, but won't refresh the browser.
      new WatchExternalFilesPlugin({
        dirs: ["./documents/"],
      })
    );

    // Important: return the modified config
    return config;
  },
};
