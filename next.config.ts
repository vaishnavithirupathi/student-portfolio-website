import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't bundle these packages on the client side
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
    
    // Optimize package size by excluding unnecessary packages
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
          { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ],
      },
    ];
  },
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default nextConfig;
