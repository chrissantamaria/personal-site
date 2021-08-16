import React from 'react';

import Headshot from '../components/Headshot';
import ArrowIndicator from '../components/ArrowIndicator';
import IconLink from '../components/IconLink';

import GitHubIcon from '../components/icons/GitHubIcon';
import LinkedInIcon from '../components/icons/LinkedInIcon';
import ResumeIcon from '../components/icons/ResumeIcon';
import EmailIcon from '../components/icons/EmailIcon';

const CLASSNAME_PARAGRAPH = 'my-4 text-xl font-light leading-8';

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
    href: 'mailto:chris@santamaria.me?subject=👋',
  },
];

const IndexPage = () => (
  <div className="flex flex-col">
    <div
      className="relative flex flex-col items-center justify-center px-8 bg-primary text-white text-center"
      style={{ height: 'calc(100vh - 2rem)' }}
    >
      <Headshot className="mb-4" />
      <h1 className="text-5xl font-bold mb-2">Chris Santamaria</h1>
      <h2 className="text-3xl font-light">
        Student, software engineer, and avid learner
      </h2>
      <ArrowIndicator />
    </div>
    <div className="my-16 mx-auto px-8 max-w-5xl" id="about">
      <h3 className="mb-4 text-3xl font-semibold leading-8">
        Hi, I&apos;m Chris! 👋
      </h3>
      <p className={CLASSNAME_PARAGRAPH}>
        I&apos;m a student at the University of Virginia studying computer
        science, previously at Lyft and Tinder.
      </p>
      <p className={CLASSNAME_PARAGRAPH}>
        Feel free to reach out through any of the platforms below or view my
        resume. I&apos;d love to get in touch!
      </p>
      <div className="flex justify-between max-w-sm mx-auto mt-8">
        {icons.map((props) => (
          <IconLink key={props.href} {...props} />
        ))}
      </div>
    </div>
  </div>
);

export default IndexPage;
