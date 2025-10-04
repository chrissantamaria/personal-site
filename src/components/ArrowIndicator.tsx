'use client';

import { useLayoutEffect, useState } from 'react';
import clsx from 'clsx';
import debounce from 'just-debounce';

import ArrowIcon from '~/components/icons/ArrowIcon';

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
        'absolute bottom-2 left-1/2 -translate-x-1/2 transform cursor-pointer transition-opacity duration-500',
        {
          'pointer-events-auto opacity-100': !hasScrolled,
          'pointer-events-none opacity-0': hasScrolled,
        },
      )}
      href="#about"
    >
      <ArrowIcon className="h-12 animate-float fill-current text-white" />
    </a>
  );
};

export default ArrowIndicator;
