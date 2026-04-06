import { NextConfig } from 'next';
import path from 'path';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: [
      'speak-wide.dedicateddevelopers.us',
      'd35se2nt0r15pc.cloudfront.net',
      'dn9kwwc18qqd2.cloudfront.net',
    ],
  },
  compress: true,
  devIndicators: {
    buildActivityPosition: 'bottom-right',
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  env: {
    NEXT_APP_ENV: process.env.NEXT_APP_ENV,
    NEXT_APP_BASE_URL: process.env.NEXT_APP_BASE_URL,
    NEXT_APP_PROJECT_NAME: process.env.NEXT_APP_PROJECT_NAME,
    NEXT_APP_JWT: process.env.NEXT_APP_JWT,
    NEXT_APP_TOKEN_NAME: process.env.NEXT_APP_TOKEN_NAME,
    NEXT_APP_ENCRYPTION_KEY: process.env.NEXT_APP_ENCRYPTION_KEY,
    NEXT_APP_PERSONA_URL: process.env.NEXT_APP_PERSONA_URL,
    NEXT_PUBLIC_MAP_API_KEY: process.env.NEXT_PUBLIC_MAP_API_KEY,
  },

  async headers() {
    const headers: { source: string; headers: { key: string; value: string }[] }[] = [];

    if (process.env.NEXT_APP_ENV === 'development') {
      headers.push({
        source: '/(.*)', // apply to all routes
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
            default-src * 'unsafe-inline' 'unsafe-eval' data: blob:;
            script-src * 'unsafe-inline' 'unsafe-eval' data: blob:;
            style-src * 'unsafe-inline' data: blob:;
            img-src * data: blob:;
            font-src * data: blob:;
            connect-src * data: blob:;
            media-src * data: blob:;
            frame-src * data: blob:;
            `
              .replace(/\s{2,}/g, ' ')
              .trim(),
          },
        ],
      });
    }

    return headers;
  },
};

export default nextConfig;
