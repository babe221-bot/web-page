const { i18n } = require('./next-i18next.config.js');
import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  i18n,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/daorsmusic-app.firebasestorage.app/**',
      },
      {
        protocol: 'https' ,
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/website3324/**',
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      }
    ],
  },
};

export default nextConfig;
