/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  poweredByHeader: false,
  reactStrictMode: false,
  sassOptions: { silenceDeprecations: ['legacy-js-api'] }
};

export default nextConfig;
