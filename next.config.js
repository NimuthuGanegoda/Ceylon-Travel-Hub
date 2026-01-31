/** @type {import('next').NextConfig} */

// Dynamically set repo name for GitHub Pages
const repo = 'Ceylon-Travel-Hub'; // Update this if your repo name changes
const isProd = process.env.NODE_ENV === 'production';
const isLocalBuild = process.env.LOCAL_BUILD === 'true';

const basePath = isProd && !isLocalBuild ? `/${repo}` : '';

const nextConfig = {
  // output: 'export', // Disabled to enable API routes and Middleware for security features
  images: {
    unoptimized: true,
  },
  basePath: basePath,
  assetPrefix: isProd && !isLocalBuild ? `/${repo}/` : '',
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  }
};

module.exports = nextConfig;
