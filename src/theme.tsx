import React from 'react';
import { Global } from '@emotion/core';
import normalize from 'emotion-normalize';

type Props = {
  children: React.ReactNode;
};

const ThemeProvider = ({ children }: Props) => (
  <>
    <Global styles={normalize} />
    <Global
      styles={{
        'html, body, #___gatsby, #gatsby-focus-wrapper': {
          height: '100%',
        },
      }}
    />
    <Global
      styles={{
        body: {
          'font-family': '"Open Sans", Arial, Helvetica, sans-serif',
        },
      }}
    />
    {children}
  </>
);

export default ThemeProvider;