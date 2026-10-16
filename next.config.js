/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Allow external images (Unsplash)
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "dummyimages.netlify.app",
      },
    ],
  },

  // ADD THIS HEADERS SECTION
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },

  // Redirect configuration
  async redirects() {
    return [
      {
        source: '/about-us',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/blog',
        destination: '/blogs',
        permanent: true,
      },
      {
        source: '/blog/:slug*',
        destination: '/blogs/:slug*',
        permanent: true,
      },
      {
        source: '/portfolio/portfolio/:slug*',
        destination: '/portfolio/:slug*',
        permanent: true,
      },
      {
        source: '/portfolio/autoscholar',
        destination: '/portfolio/autoscholor',
        permanent: true,
      },
      {
        source: '/portfolio/healthanalyzer',
        destination: '/portfolio/healthanalyser',
        permanent: true,
      },
      {
        source: '/login',
        destination: '/mes',
        permanent: false,
      },
      {
        source: '/og-image.jpg',
        destination: '/og-image.png',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
