// Heavily borrowed from gatsby-plugin-google-analytics

import React from 'react';
import galite from 'ga-lite';

const OutboundLink = (props: React.HTMLProps<HTMLAnchorElement>) => (
  <a
    target="_blank"
    rel="noreferrer"
    onClick={() => {
      galite(`send`, `event`, {
        eventCategory: `Outbound Link`,
        eventAction: `click`,
        eventLabel: props.href,
        transport: 'beacon',
      });
    }}
    {...props}
  />
);

export default OutboundLink;
