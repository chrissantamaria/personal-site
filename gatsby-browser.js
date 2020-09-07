import React from 'react';
import ThemeProvider from './src/theme';
import SEO from './src/components/SEO';

export const wrapPageElement = ({ element }) => (
  <ThemeProvider>
    <SEO />
    {element}
  </ThemeProvider>
);
