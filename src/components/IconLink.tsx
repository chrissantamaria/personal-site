import React from 'react';

type Props = {
  component: React.FC;
  href: string;
};

const IconLink = ({ component: Component, href }: Props) => (
  <a href={href} target="_blank" rel="noreferrer" css={{ margin: '0 1rem' }}>
    <Component css={{ height: 36 }} />
  </a>
);

export default IconLink;
