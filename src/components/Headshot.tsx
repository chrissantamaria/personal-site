import React from 'react';
import clsx from 'clsx';
import Image from 'next/image';

import headshotImage from '../images/headshot.jpg';

interface Props {
  className?: string;
  width: number;
  height?: number;
}

const Headshot: React.FC<Props> = ({ className, width, height = width }) => (
  <span
    className={clsx(
      className,
      'isolate flex overflow-hidden rounded-full border-4 border-white'
    )}
  >
    <Image
      src={headshotImage}
      alt="Headshot of Chris"
      width={width}
      height={height}
      placeholder="blur"
    />
  </span>
);

export default Headshot;
