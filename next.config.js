/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Enable static exports for Netlify
  output: 'export',
  // Base path for GitHub Pages deployment
  basePath: process.env.NODE_ENV === 'production' ? '' : undefined,
  // Enable static HTML export
  images: {
    unoptimized: true, // Required for static exports
    domains: ['images.unsplash.com'],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  // Optional: Add environment variables that should be available at build time
  env: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || 'https://your-site-name.netlify.app',
  },
};

module.exports = nextConfig;
