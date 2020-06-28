import React from 'react';
import { PageProps } from 'gatsby';

const NotFoundPage: React.FC<PageProps> = () => (
  <div>
    <h1>Oh no!</h1>
    <p>You just hit a route that doesn&#39;t exist :(</p>
  </div>
);

export default NotFoundPage;
