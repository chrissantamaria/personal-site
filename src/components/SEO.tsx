import React from 'react';
import Head from 'next/head';

const TITLE = 'Chris Santamaria';
const DESCRIPTION = 'Student, fullstack web developer and avid learner';

const SEO: React.FC = () => (
  <Head>
    <title>{TITLE}</title>
    <meta name="description" content={DESCRIPTION} />

    <meta property="og:title" content={TITLE} />
    <meta property="og:description" content={DESCRIPTION} />
    <meta property="og:type" content="website" />
    <meta name="twitter:card" content="summary" />
    <meta
      name="twitter:creator"
      content="Chris Santamaria <chris@santamaria.me>"
    />
    <meta name="twitter:title" content={TITLE} />
    <meta name="twitter:description" content={DESCRIPTION} />

    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="manifest" href="/site.webmanifest" />
    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#333333" />
    <meta name="theme-color" content="#543f79" />
  </Head>
);

export default SEO;
