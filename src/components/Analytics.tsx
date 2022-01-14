import React from 'react';
import Script from 'next/script';

const SEO: React.FC = () => (
  <Script
    src={`${process.env.NEXT_PUBLIC_UMAMI_URL}/umami.js`}
    strategy="afterInteractive"
    data-website-id={process.env.NEXT_PUBLIC_UMAMI_SITE_ID}
  />
);

export default SEO;
