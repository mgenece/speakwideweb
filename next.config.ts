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
    const isProd = process.env.NODE_ENV === 'production';

    const cspDirectives = isProd
      ? [
          "default-src 'self'",
          "script-src 'self' 'unsafe-inline' https://www.gstatic.com https://apis.google.com https://js.stripe.com",
          "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
          "font-src 'self' https://fonts.gstatic.com data:",
          "img-src 'self' data: blob: https://speak-wide.dedicateddevelopers.us https://d35se2nt0r15pc.cloudfront.net https://dn9kwwc18qqd2.cloudfront.net",
          "connect-src 'self' https://*.googleapis.com https://*.firebaseio.com https://fcm.googleapis.com wss://*.firebaseio.com https://*.stripe.com",
          "frame-src https://*.stripe.com https://withpersona.com",
          "worker-src 'self' blob:",
          "media-src 'self' blob:",
          "object-src 'none'",
          "base-uri 'self'",
          "form-action 'self'",
        ]
      : [
          // Development: restrict wildcards but allow localhost tooling
          "default-src 'self' localhost:* 127.0.0.1:*",
          "script-src 'self' 'unsafe-inline' 'unsafe-eval' localhost:* 127.0.0.1:* https://www.gstatic.com https://apis.google.com https://js.stripe.com",
          "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
          "font-src 'self' https://fonts.gstatic.com data:",
          "img-src 'self' data: blob: https:",
          "connect-src 'self' ws://localhost:* wss://localhost:* https: wss:",
          "frame-src https://*.stripe.com https://withpersona.com",
          "worker-src 'self' blob:",
          "media-src 'self' blob:",
          "object-src 'none'",
        ];

    const securityHeaders = [
      {
        key: 'Content-Security-Policy',
        value: cspDirectives.join('; '),
      },
      {
        key: 'X-Frame-Options',
        value: 'DENY',
      },
      {
        key: 'X-Content-Type-Options',
        value: 'nosniff',
      },
      {
        key: 'Referrer-Policy',
        value: 'strict-origin-when-cross-origin',
      },
      {
        key: 'Permissions-Policy',
        value: 'geolocation=(), microphone=(), camera=()',
      },
      ...(isProd
        ? [
            {
              key: 'Strict-Transport-Security',
              value: 'max-age=31536000; includeSubDomains',
            },
          ]
        : []),
    ];

    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
