module.exports = {
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'ssd.jpl.nasa.gov',
        port: '',
        pathname: '/**',
      }
    ],
  },
};
