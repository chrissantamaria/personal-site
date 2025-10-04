/** @type {import('next').NextConfig} */
module.exports = {
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
