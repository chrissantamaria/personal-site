/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/resume.pdf',
        destination:
          'http://github.com/chrissantamaria/resume/releases/latest/download/resume.pdf',
        permanent: true,
      },
      {
        source: '/call',
        destination: 'https://calendly.com/chrissantamaria',
        permanent: true,
      },
    ];
  },
};
