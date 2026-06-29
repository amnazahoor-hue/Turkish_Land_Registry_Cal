/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/about-us", destination: "/tapu-harci-hakkinda", permanent: true },
      { source: "/author", destination: "/tapu-harci-yazar", permanent: true },
      { source: "/contact", destination: "/tapu-harci-iletisim", permanent: true },
      { source: "/disclaimer", destination: "/tapu-harci-feragatname", permanent: true },
      { source: "/privacy-policy", destination: "/tapu-harci-gizlilik", permanent: true },
      {
        source: "/terms-and-conditions",
        destination: "/tapu-harci-sartlar",
        permanent: true,
      },
    ];
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = { type: "memory" };
    }
    return config;
  },
};

export default nextConfig;
