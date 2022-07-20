/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  experimental: {
    images: {
      allowFutureImage: true,
    },
  },
  images: {
    domains: ['picsum.photos', 'kr.object.ncloudstorage.com'],
  },
};

module.exports = nextConfig;
