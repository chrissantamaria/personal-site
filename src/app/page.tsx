import ArrowIndicator from '~/components/ArrowIndicator';
import Headshot from '~/components/Headshot';
import IconLink from '~/components/IconLink';
import EmailIcon from '~/components/icons/EmailIcon';
import GitHubIcon from '~/components/icons/GitHubIcon';
import LinkedInIcon from '~/components/icons/LinkedInIcon';
import ResumeIcon from '~/components/icons/ResumeIcon';

import { description, title } from './shared';

const CLASSNAME_PARAGRAPH = 'text-xl font-light leading-8';

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

const Page = () => (
  <>
    <div className="flex flex-col">
      <div
        className="bg-primary relative flex flex-col items-center justify-center px-8 text-center text-white"
        style={{ height: 'calc(100vh - 2rem)' }}
      >
        <Headshot className="mb-4" width={400} />
        <h1 className="mb-2 text-5xl font-bold">{title}</h1>
        <h2 className="text-3xl font-light">{description}</h2>
        <ArrowIndicator />
      </div>
      <div
        className="mx-auto my-12 flex max-w-4xl flex-col gap-8 px-8"
        id="about"
      >
        <div className="flex flex-col gap-4">
          <p className={CLASSNAME_PARAGRAPH}>
            i'm a software engineer currently working at figma. i also work on{' '}
            <a
              className="underline"
              href="https://toontownrewritten.com/"
              target="_blank"
            >
              toontown rewritten
            </a>
            .
          </p>
          <p className={CLASSNAME_PARAGRAPH}>
            feel free to reach out through any of the platforms below. i'd love
            to get in touch!
          </p>
        </div>
        <div className="mx-auto flex max-w-sm justify-between">
          {icons.map((props) => (
            <IconLink key={props.href} {...props} />
          ))}
        </div>
      </div>
    </div>
  </>
);

export default Page;
