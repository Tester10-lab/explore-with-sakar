/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/explore-with-sakar/:path*',
        destination: '/:path*',
      },
    ];
  },
};

export default nextConfig;
