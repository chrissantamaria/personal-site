import React, { useEffect, useState } from 'react';
import { keyframes } from '@emotion/core';
import debounce from 'lodash/debounce';

import ArrowIcon from './icons/ArrowIcon';

const float = keyframes`
  0% {
    transform: translateY(0px);
  } 
  50% {
    transform: translateY(-8px);
  } 
  100% {
    transform: translateY(0px);
  }
`;

const checkHasScrolled = () => window.scrollY > 20;

const ArrowIndicator = () => {
  const [hasScrolled, setHasScrolled] = useState(checkHasScrolled());

  const handleScroll = debounce(() => {
    setHasScrolled(checkHasScrolled());
  }, 100);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <a
      css={{
        position: 'absolute',
        bottom: 8,
        left: '50%',
        transform: 'translateX(-50%)',
        cursor: 'pointer',
        transition: 'opacity 0.5s',
      }}
      style={{ opacity: hasScrolled ? 0 : 1 }}
      href="#about"
    >
      <ArrowIcon
        css={{
          fill: 'white',
          height: 48,
          animation: `${float} 2s ease infinite`,
        }}
      />
    </a>
  );
};

export default ArrowIndicator;
