import React, { useLayoutEffect, useState } from 'react';
import { keyframes } from '@emotion/react';
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

const ArrowIndicator = () => {
  // Setting default to true gives a nice fade-in while at the top of the page
  // while preventing an immediate fade-out for users refreshing at the bottom of the page
  const [hasScrolled, setHasScrolled] = useState(true);

  useLayoutEffect(() => {
    const updateHasScrolled = () => {
      setHasScrolled(window.scrollY > 20);
    };

    const handleScroll = debounce(updateHasScrolled, 100);

    // Checking true value after initial SSR render
    updateHasScrolled();

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
      style={{
        opacity: hasScrolled ? 0 : 1,
        pointerEvents: hasScrolled ? 'none' : 'auto',
      }}
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
