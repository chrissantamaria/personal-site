import React from 'react';

import Headshot from '../components/Headshot';
import ArrowIndicator from '../components/ArrowIndicator';
import {
  HeadshotContainer,
  LandingContainer,
  Subtitle,
  Title,
} from '../styles';

const IndexPage = () => (
  <LandingContainer>
    <HeadshotContainer>
      <Headshot />
    </HeadshotContainer>
    <Title>Chris Santamaria</Title>
    <Subtitle>Student, fullstack web developer, and avid learner</Subtitle>
    <ArrowIndicator />
  </LandingContainer>
);

export default IndexPage;
