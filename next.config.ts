import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  // https://developers.cloudflare.com/images/transform-images/integrate-with-frameworks/#global-loader
  images: {
    loader: 'custom',
    loaderFile: './imageLoader.ts',
  },
};

export default nextConfig;
