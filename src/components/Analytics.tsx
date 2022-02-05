import Script from 'next/script';

const SEO = () => (
  <Script
    src={`${process.env.NEXT_PUBLIC_UMAMI_URL}/stats.js`}
    strategy="afterInteractive"
    data-website-id={process.env.NEXT_PUBLIC_UMAMI_SITE_ID}
  />
);

export default SEO;
