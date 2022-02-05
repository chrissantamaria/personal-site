import React from 'react';

interface Props extends React.HTMLProps<HTMLAnchorElement> {
  href: string;
}

const OutboundLink = (props: Props) => (
  <a
    target="_blank"
    rel="noreferrer"
    onClick={() => {
      umami.trackEvent(props.href, 'Outbound link');
    }}
    {...props}
  />
);

export default OutboundLink;
