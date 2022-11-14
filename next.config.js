/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
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
        destination: 'https://calendly.com/chrissantamaria',
        permanent: false,
      },
    ];
  },
};
