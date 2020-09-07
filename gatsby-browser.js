import React from 'react';
import SEO from './src/components/SEO';

export const wrapPageElement = ({ element }) => (
  <>
    <SEO />
    {element}
  </>
);
