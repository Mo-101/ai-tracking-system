import fs from 'fs';
import path from 'path';

let userConfig;
async function loadUserConfig() {
  try {
    const mod = await import("./v0-user-next.config.js");
    userConfig = mod.default;
  } catch (e) {
  }
}
await loadUserConfig()

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    webpack: async (config) => {
      try {
        /**
         * Imports the Cesium package.json file as a JSON module.
         * 
         * @constant {Object} cesiumPath - The JSON content of the Cesium package.json file.
         * @async
         * @returns {Promise<Object>} A promise that resolves to the JSON content of the Cesium package.json file.
         */
        const cesiumPath = await import("cesium/package.json", { assert: { type: "json" } });

        const cesiumPackagePath = path.resolve('node_modules', 'cesium', 'package.json');
        const cesiumPackage = JSON.parse(fs.readFileSync(cesiumPackagePath, 'utf8'));

        config.resolve.alias = {
          ...config.resolve.alias,
          cesium: cesiumPackage.name,
        };

        return config;
      } catch (e) {
      }
    },
  },
};
export default { ...nextConfig, ...userConfig };
