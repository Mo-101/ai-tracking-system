
const path = require("path");
const webpack = require -("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  webpack: (config, { isServer }) => {
    // Fallback for browser-side dependencies
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        Buffer: false,
        http: false,
        https: false,
        zlib: false,
        url: false,
      };
    }

    // ✅ Define CESIUM_BASE_URL globally
    config.plugins.push(
      new webpack.DefinePlugin({
        CESIUM_BASE_URL: JSON.stringify("/cesium"), // ✅ Correct way to define a global variable
      })
    );


    // ✅ Copy Cesium assets to `public/cesium` (only for client-side builds)
    if (!isServer) {
      config.plugins.push(
        new CopyWebpackPlugin({
          patterns: [
            {
              from: path.resolve(__dirname, "node_modules/cesium/Build/Cesium"),
              to: path.resolve(__dirname, "public/cesium"),
            },
          ],
        })
      );
    }

    return config;
  },
};

module.exports = nextConfig;
