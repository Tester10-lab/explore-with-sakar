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
      // 1. Packages legacy redirects
      {
        source: '/packages',
        destination: '/experiences',
        permanent: true,
      },
      {
        source: '/packages/:slug',
        destination: '/experiences',
        permanent: true,
      },
      // 2. Specific blog test redirect
      {
        source: '/blog/test-by-diplon',
        destination: '/blog/bound-by-a-thread-eliza-and-sakar',
        permanent: true,
      },
      // 3. Old /services/... Experience redirects
      {
        source: '/services/beyond-the-map',
        destination: '/experiences/beyond-the-map',
        permanent: true,
      },
      {
        source: '/service/beyond-the-map',
        destination: '/experiences/beyond-the-map',
        permanent: true,
      },
      {
        source: '/services/beyond-a-map',
        destination: '/experiences/beyond-the-map',
        permanent: true,
      },
      {
        source: '/service/beyond-a-map',
        destination: '/experiences/beyond-the-map',
        permanent: true,
      },
      {
        source: '/services/go-beyond',
        destination: '/experiences/beyond-the-map',
        permanent: true,
      },
      {
        source: '/service/go-beyond',
        destination: '/experiences/beyond-the-map',
        permanent: true,
      },
      {
        source: '/services/spiritual-wellness',
        destination: '/experiences/spiritual-wellness',
        permanent: true,
      },
      {
        source: '/service/spiritual-wellness',
        destination: '/experiences/spiritual-wellness',
        permanent: true,
      },
      {
        source: '/services/go-spiritual',
        destination: '/experiences/spiritual-wellness',
        permanent: true,
      },
      {
        source: '/service/go-spiritual',
        destination: '/experiences/spiritual-wellness',
        permanent: true,
      },
      {
        source: '/services/homestays',
        destination: '/experiences/homestays',
        permanent: true,
      },
      {
        source: '/service/homestays',
        destination: '/experiences/homestays',
        permanent: true,
      },
      {
        source: '/services/feel-closer',
        destination: '/experiences/homestays',
        permanent: true,
      },
      {
        source: '/service/feel-closer',
        destination: '/experiences/homestays',
        permanent: true,
      },
      {
        source: '/services/leave-a-mark',
        destination: '/experiences/leave-a-mark',
        permanent: true,
      },
      {
        source: '/service/leave-a-mark',
        destination: '/experiences/leave-a-mark',
        permanent: true,
      },
      {
        source: '/services/custom-journeys',
        destination: '/experiences/custom-journeys',
        permanent: true,
      },
      {
        source: '/service/custom-journeys',
        destination: '/experiences/custom-journeys',
        permanent: true,
      },
      {
        source: '/services/custom-private-journeys',
        destination: '/experiences/custom-journeys',
        permanent: true,
      },
      {
        source: '/service/custom-private-journeys',
        destination: '/experiences/custom-journeys',
        permanent: true,
      },
      {
        source: '/services/culture',
        destination: '/experiences',
        permanent: true,
      },
      {
        source: '/services/trekking',
        destination: '/experiences/beyond-the-map',
        permanent: true,
      },
      {
        source: '/services',
        destination: '/experiences',
        permanent: true,
      },
      {
        source: '/service',
        destination: '/experiences',
        permanent: true,
      },
      {
        source: '/services/:slug',
        destination: '/experiences/:slug',
        permanent: true,
      },
      {
        source: '/service/:slug',
        destination: '/experiences/:slug',
        permanent: true,
      },
      // 4. Old singular /experience/... redirects to canonical /experiences/...
      {
        source: '/experience',
        destination: '/experiences',
        permanent: true,
      },
      {
        source: '/experience/all-curated-experiences',
        destination: '/experiences',
        permanent: true,
      },
      {
        source: '/experience/go-beyond',
        destination: '/experiences/beyond-the-map',
        permanent: true,
      },
      {
        source: '/experience/beyond-the-map',
        destination: '/experiences/beyond-the-map',
        permanent: true,
      },
      {
        source: '/experience/go-spiritual',
        destination: '/experiences/spiritual-wellness',
        permanent: true,
      },
      {
        source: '/experience/spiritual-wellness',
        destination: '/experiences/spiritual-wellness',
        permanent: true,
      },
      {
        source: '/experience/feel-closer',
        destination: '/experiences/homestays',
        permanent: true,
      },
      {
        source: '/experience/homestays',
        destination: '/experiences/homestays',
        permanent: true,
      },
      {
        source: '/experience/leave-a-mark',
        destination: '/experiences/leave-a-mark',
        permanent: true,
      },
      {
        source: '/experience/custom-private-journeys',
        destination: '/experiences/custom-journeys',
        permanent: true,
      },
      {
        source: '/experience/custom-journeys',
        destination: '/experiences/custom-journeys',
        permanent: true,
      },
      {
        source: '/experience/:slug',
        destination: '/experiences/:slug',
        permanent: true,
      },
      // 4. Admin blog route alias
      {
        source: '/admin/blog',
        destination: '/admin/blogs',
        permanent: false,
      },
      {
        source: '/admin/blog/:slug*',
        destination: '/admin/blogs/:slug*',
        permanent: false,
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
