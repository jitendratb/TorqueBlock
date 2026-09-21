/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
    qualities: [25, 50, 70, 75, 85, 90, 100],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.torqueblock.com',
      },
      {
        protocol: 'https',
        hostname: 'torqueblock.com',
      },
      {
        protocol: 'https',
        hostname: '**.torqueblock.com',
      },
      {
        protocol: 'https',
        hostname: 'i.postimg.cc',
      },
      {
        protocol: 'https',
        hostname: '**.postimg.cc',
      },
      {
        protocol: 'https',
        hostname: 'postimage.me',
      },
      {
        protocol: 'https',
        hostname: '**.postimage.me',
      },
    ],
  },

  async redirects() {
    return [
      {
        source: '/en-us',
        destination: '/',
        permanent: true,
      },
      {
        source: '/tyres/ceat-gripp-rad-steel/140-80-r17',
        destination: '/tyres/ceat-gripp-xl-rad-steel/140-80-r17',
        permanent: true,
      },
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.torqeblock.com',
          },
        ],
        destination: 'https://torqeblock.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;