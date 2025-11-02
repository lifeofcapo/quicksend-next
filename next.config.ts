import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    webpackBuildWorker: true,
  },
  output: "standalone",
  
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      type: "asset/resource",
      generator: {
        filename: "static/fonts/[name][ext]",
      },
    });
    
    return config;
  },
};

export default nextConfig;