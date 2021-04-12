import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';

type Props = {
  className?: string;
};

const Headshot = ({ className }: Props) => (
  <StaticImage
    src="../images/headshot.jpg"
    width={400}
    className={className}
    css={{
      border: '6px solid white',
      borderRadius: '50%',
      // Hacky fix to handle Safari not properly rendering rounded image
      // (manually creating a new stacking context)
      transform: 'translateZ(0)',
      // Prevent child placeholder img from having its own border
      '& img': {
        border: 0,
      },
    }}
    loading="eager"
    placeholder="blurred"
    quality={90}
    alt="Headshot"
  />
);

export default Headshot;
