/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: '/registration',
        permanent: false,
      },
      {
        source: "/band-info",
        destination: `/band-info/%20`,
        permanent: false,
      },
      {
        source: "/song-request",
        destination: `/song-request/%20`,
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
