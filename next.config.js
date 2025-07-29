const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
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
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  allowedDevOrigins: [
    "https://*.cluster-6vyo4gb53jczovun3dxslzjahs.cloudworkstations.dev",
    "https://9004-firebase-studio-1752183138309.cluster-6vyo4gb53jczovun3dxslzjahs.cloudworkstations.dev",
    "https://6000-firebase-studio-1752183138309.cluster-6vyo4gb53jczovun3dxslzjahs.cloudworkstations.dev"
  ],
};

module.exports = withBundleAnalyzer(nextConfig);
