/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // Remove the unrecognized option
  },
  // Configure redirects if needed
  async redirects() {
    return [];
  },
  // Configure headers if needed
  async headers() {
    return [];
  },
};

module.exports = nextConfig; 