/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ajn4zwso5l.ufs.sh',
        pathname: '/**', // Allows any path under this domain
      },
    ],
  },
};

export default nextConfig;