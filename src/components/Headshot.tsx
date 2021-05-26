import React from 'react';
import clsx from 'clsx';
import { StaticImage } from 'gatsby-plugin-image';

type Props = {
  className?: string;
};

const Headshot = ({ className }: Props) => (
  <StaticImage
    src="../images/headshot.jpg"
    width={400}
    className={clsx(className, 'rounded-full border-4 border-white isolate')}
    // Prevent child placeholder img from having its own border
    imgClassName="border-0"
    loading="eager"
    placeholder="blurred"
    quality={90}
    alt="Headshot"
  />
);

export default Headshot;
