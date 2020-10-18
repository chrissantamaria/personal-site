import React from 'react';
import OutboundLink from './OutboundLink';

type Props = {
  component: React.FC;
  href: string;
};

const IconLink = ({ component: Component, href }: Props) => (
  <OutboundLink href={href} css={{ margin: '0 1rem' }}>
    <Component css={{ height: 36 }} />
  </OutboundLink>
);

export default IconLink;
