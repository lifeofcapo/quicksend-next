import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  turbopack: {},
  
  // Настраиваем webpack для обработки серверных модулей
  webpack: (config, { isServer }) => {
    // Если это клиентская сборка, игнорируем серверные модули
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
        crypto: false,
        stream: false,
      };
    }
    return config;
  },
};

export default nextConfig;