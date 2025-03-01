declare module "cesium" {
  export * from "cesium";
}

// Extend the global Window interface to include CESIUM_BASE_URL
declare global {
  interface Window {
    CESIUM_BASE_URL?: string;
  }
}

// Declare module for CSS files
declare module "*.css";

export {};