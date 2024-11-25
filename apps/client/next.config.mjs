/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: true,
  poweredByHeader: false,
  reactStrictMode: false,
  sassOptions: { silenceDeprecations: ['legacy-js-api'] },
  eslint: {
    ignoreDuringBuilds: true
  },
  typescript: {
    tsconfigPath: './tsconfig.build.json'
  },
  rewrites: async () => {
    return [
      {
        source: '/nest-api/:path*',
        destination: `${process.env.NEXT_PUBILC_API_SERVER}/:path*`
      }
    ];
  },
  webpack: (config, { dev }) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: 'preset-default',
                  params: {
                    overrides: { removeViewBox: false }
                  }
                }
              ]
            }
          }
        }
      ]
    });

    if (!dev) {
      config.devtool = 'hidden-source-map';
    }

    return config;
  },
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: [
            {
              loader: '@svgr/webpack',
              options: {
                svgoConfig: {
                  plugins: [
                    {
                      name: 'preset-default',
                      params: {
                        overrides: {
                          removeViewBox: false
                        }
                      }
                    }
                  ]
                }
              }
            }
          ],
          as: '*.js'
        }
      }
    }
  }
};

export default nextConfig;
