import React from 'react';
import OutboundLink from './OutboundLink';

interface Props {
  component: React.FC<React.SVGProps<SVGSVGElement>>;
  href: string;
}

const IconLink: React.FC<Props> = ({ component: Component, href }) => (
  <OutboundLink className="mx-4" href={href}>
    <Component className="h-9" />
  </OutboundLink>
);

export default IconLink;
