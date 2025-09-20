/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Enable static exports
  output: 'export',
  // Base path for production
  basePath: process.env.NODE_ENV === 'production' ? '' : undefined,
  // Configure images for static export
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com'],
  },
  // Webpack configuration
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  // Environment variables
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://your-site-name.netlify.app',
  },
  // Disable image optimization during export
  experimental: {
    images: {
      unoptimized: true,
    },
  },
};

module.exports = nextConfig;
