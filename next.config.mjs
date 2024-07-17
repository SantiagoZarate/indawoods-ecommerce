/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.mrporter.com',
        port: '',
        pathname: '/variants/images/**',
      },
      {
        protocol: 'https',
        hostname: 'www.collinsdictionary.com',
        port: '',
        pathname: '/images/full/**',
      },
    ],
  },
};

export default nextConfig;
