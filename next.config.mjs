/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  images: {
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
    ],
  },

  async redirects() {
    return [
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