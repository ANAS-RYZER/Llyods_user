const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: [
      'images.unsplash.com',
      'fastly.picsum.photos',
      'i.pinimg.com',
      'embla.com',
      'example.com',
      'storage.googleapis.com',
      'picsum.photos',
      'media.istockphoto.com',
      'flagsapi.com',
      'ryzer-v2.s3.ap-south-1.amazonaws.com',
      'www.pexels.com',
      'www.ryzer.app',
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000'],
    },
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }

    // 👇 add this alias so async-storage won't break your build
    config.resolve.alias["@react-native-async-storage/async-storage"] = path.resolve(
      __dirname,
      "utils/emptyModule.js"
    );

    return config;
  },
}

module.exports = nextConfig;
