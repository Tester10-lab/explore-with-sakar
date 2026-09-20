/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'explorewithsakar.com',
      },
      {
        protocol: 'https',
        hostname: 'www.explorewithsakar.com',
      },
    ],
  },
  experimental: {
    outputFileTracingIncludes: {
      '/**/*': ['./data/**/*'],
    },
  },
  async redirects() {
    return [
      {
        source: '/blog/test-by-diplon',
        destination: '/blog/bound-by-a-thread-eliza-and-sakar',
        permanent: true,
      },
      {
        source: '/services/beyond-the-map',
        destination: '/experience/go-beyond',
        permanent: true,
      },
      {
        source: '/service/beyond-the-map',
        destination: '/experience/go-beyond',
        permanent: true,
      },
      {
        source: '/services/spiritual-wellness',
        destination: '/experience/go-spiritual',
        permanent: true,
      },
      {
        source: '/service/spiritual-wellness',
        destination: '/experience/go-spiritual',
        permanent: true,
      },
      {
        source: '/services/homestays',
        destination: '/experience/feel-closer',
        permanent: true,
      },
      {
        source: '/service/homestays',
        destination: '/experience/feel-closer',
        permanent: true,
      },
      {
        source: '/services/leave-a-mark',
        destination: '/experience/leave-a-mark',
        permanent: true,
      },
      {
        source: '/service/leave-a-mark',
        destination: '/experience/leave-a-mark',
        permanent: true,
      },
      {
        source: '/services/custom-journeys',
        destination: '/experience/custom-private-journeys',
        permanent: true,
      },
      {
        source: '/service/custom-journeys',
        destination: '/experience/custom-private-journeys',
        permanent: true,
      },
      {
        source: '/services',
        destination: '/experience',
        permanent: true,
      },
      {
        source: '/service',
        destination: '/experience',
        permanent: true,
      },
      {
        source: '/experiences',
        destination: '/experience',
        permanent: true,
      },
      {
        source: '/experiences/:slug',
        destination: '/experience/:slug',
        permanent: true,
      },
      {
        source: '/services/:slug',
        destination: '/experience/:slug',
        permanent: true,
      },
      {
        source: '/service/:slug',
        destination: '/experience/:slug',
        permanent: true,
      },
    ];
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
