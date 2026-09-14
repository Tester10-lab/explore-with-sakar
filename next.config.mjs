/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: '/explore-with-sakar/images/:path*',
        destination: '/images/:path*',
      },
    ];
  },
};

export default nextConfig;
