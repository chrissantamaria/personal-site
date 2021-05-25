import React from 'react';

import Headshot from '../components/Headshot';
import ArrowIndicator from '../components/ArrowIndicator';
import IconLink from '../components/IconLink';

import GitHubIcon from '../components/icons/GitHubIcon';
import LinkedInIcon from '../components/icons/LinkedInIcon';
import ResumeIcon from '../components/icons/ResumeIcon';
import EmailIcon from '../components/icons/EmailIcon';

import {
  AboutContainer,
  Header,
  IconRow,
  LandingContainer,
  Link,
  RootContainer,
  Subtitle,
  Text,
  Title,
} from '../styles';

const icons = [
  {
    component: GitHubIcon,
    href: 'https://github.com/chrissantamaria',
  },
  {
    component: LinkedInIcon,
    href: 'https://www.linkedin.com/in/chris-santamaria-10',
  },
  {
    component: ResumeIcon,
    href: '/resume.pdf',
  },
  {
    component: EmailIcon,
    href: 'mailto:chris@santamaria.me?subject=Hey!',
  },
];

const IndexPage = () => (
  <RootContainer>
    <LandingContainer>
      <Headshot css={{ marginBottom: '1rem' }} />
      <Title>Chris Santamaria</Title>
      <Subtitle>Student, software engineer, and avid learner</Subtitle>
      <ArrowIndicator />
    </LandingContainer>
    <AboutContainer id="about">
      <Header>Hi, I&apos;m Chris! 👋</Header>
      <Text>
        I&apos;m a student at the University of Virginia studying computer
        science, currently building web experiences at{' '}
        <Link href="https://lyft.com">Lyft</Link>.
      </Text>
      <Text>
        Feel free to reach out through any of the platforms below or view my
        resume. I&apos;d love to get in touch!
      </Text>
      <IconRow>
        {icons.map((props) => (
          <IconLink key={props.href} {...props} />
        ))}
      </IconRow>
    </AboutContainer>
  </RootContainer>
);

export default IndexPage;
