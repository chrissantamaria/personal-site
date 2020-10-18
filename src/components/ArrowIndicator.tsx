import React, { useEffect, useState } from 'react';
import { keyframes } from '@emotion/core';
import debounce from 'lodash/debounce';

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
  const [hasScrolled, setHasScrolled] = useState(false);

  const handleScroll = debounce(() => {
    setHasScrolled(window.scrollY > 20);
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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        css={{
          fill: 'white',
          height: 48,
          animation: `${float} 2s ease infinite`,
        }}
      >
        <path d="M12 16a1 1 0 0 1-.64-.23l-6-5a1 1 0 1 1 1.28-1.54L12 13.71l5.36-4.32a1 1 0 0 1 1.41.15 1 1 0 0 1-.14 1.46l-6 4.83A1 1 0 0 1 12 16z" />
      </svg>
    </a>
  );
};

export default ArrowIndicator;
