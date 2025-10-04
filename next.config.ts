import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // eslint-disable-next-line @typescript-eslint/require-await
  async redirects() {
    return [
      {
        source: '/resume.pdf',
        destination:
          'https://github.com/chrissantamaria/resume/releases/latest/download/resume.pdf',
        permanent: false,
      },
      {
        source: '/call',
        destination: 'https://cal.com/chrissantamaria/30min',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
