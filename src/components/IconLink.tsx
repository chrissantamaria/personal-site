import React from 'react';
import OutboundLink from './OutboundLink';

type Props = {
  component: React.FC<React.SVGProps<SVGSVGElement>>;
  href: string;
};

const IconLink = ({ component: Component, href }: Props) => (
  <OutboundLink className="mx-4" href={href}>
    <Component className="h-9" />
  </OutboundLink>
);

export default IconLink;
