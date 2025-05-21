import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        net: false,
        tls: false,
        fs: false,
        dns: false,
        child_process: false,
        aws4: false,
        'mongodb-client-encryption': false,
        'pbkdf2': false,
        'crypto': false,
        '@aws-sdk/credential-providers': false,
        'snappy': false,
        '@mongodb-js/zstd': false,
        'kerberos': false,
        'supports-color': false,
        'gcp-metadata': false,
        'socks': false,
        'timers/promises': false,
        'os': false,
        path: false,
        stream: false,
        zlib: false,
        http: false,
        https: false,
        url: false,
        util: false,
      };
    }
    if (isServer) {
      config.externals = [...(config.externals || []), 'mongodb-client-encryption'];
    }
    return config;
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
        ],
      },
    ];
  },
};

export default nextConfig;
