/** @type {import('next').NextConfig} */

// Dynamically set repo name for GitHub Pages
const repo = 'Ceylon-Travel-Hub'; // Update this if your repo name changes
const isProd = process.env.NODE_ENV === 'production';
const isLocalBuild = process.env.LOCAL_BUILD === 'true';

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: isProd && !isLocalBuild ? `/${repo}` : '',
  assetPrefix: isProd && !isLocalBuild ? `/${repo}/` : '',
};

module.exports = nextConfig;
