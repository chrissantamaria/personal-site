import React from 'react';
import galite from 'ga-lite';
import 'typeface-open-sans';

import ThemeProvider from './src/theme';
import SEO from './src/components/SEO';

export const onClientEntry = () => {
  if (process.env.NODE_ENV === 'production') {
    galite('create', 'UA-180731745-1', 'auto');
    galite('send', 'pageview');
  }
};

export const wrapPageElement = ({ element }) => (
  <ThemeProvider>
    <SEO />
    {element}
  </ThemeProvider>
);
