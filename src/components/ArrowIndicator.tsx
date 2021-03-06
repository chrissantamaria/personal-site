import React, { useLayoutEffect, useState } from 'react';
import clsx from 'clsx';
import debounce from 'just-debounce';

import ArrowIcon from './icons/ArrowIcon';

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
      className={clsx(
        'absolute bottom-2 left-1/2 transform -translate-x-1/2 transition-opacity duration-500 cursor-pointer',
        {
          'opacity-100 pointer-events-auto': !hasScrolled,
          'opacity-0 pointer-events-none': hasScrolled,
        }
      )}
      href="#about"
    >
      <ArrowIcon className="text-white fill-current h-12 animate-float" />
    </a>
  );
};

export default ArrowIndicator;
