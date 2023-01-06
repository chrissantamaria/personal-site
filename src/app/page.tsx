import ArrowIndicator from '~/components/ArrowIndicator';
import Headshot from '~/components/Headshot';
import IconLink from '~/components/IconLink';
import EmailIcon from '~/components/icons/EmailIcon';
import GitHubIcon from '~/components/icons/GitHubIcon';
import LinkedInIcon from '~/components/icons/LinkedInIcon';
import ResumeIcon from '~/components/icons/ResumeIcon';

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

const Page = () => (
  <>
    <div className="flex flex-col">
      <div
        className="relative flex flex-col items-center justify-center bg-primary px-8 text-center text-white"
        style={{ height: 'calc(100vh - 2rem)' }}
      >
        <Headshot className="mb-4" width={400} />
        <h1 className="mb-2 text-5xl font-bold">Chris Santamaria</h1>
        <h2 className="text-3xl font-light">
          Student, software engineer, and avid learner
        </h2>
        <ArrowIndicator />
      </div>
      <div className="my-16 mx-auto max-w-4xl px-8" id="about">
        <h3 className="mb-4 text-3xl font-semibold leading-8">
          Hi, I&apos;m Chris! 👋
        </h3>
        <p className={CLASSNAME_PARAGRAPH}>
          I&apos;m a student at the University of Virginia studying computer
          science, passionate about building impactful web experiences.
        </p>
        <p className={CLASSNAME_PARAGRAPH}>
          Feel free to reach out through any of the platforms below or view my
          resume. I&apos;d love to get in touch!
        </p>
        <div className="mx-auto mt-8 flex max-w-sm justify-between">
          {icons.map((props) => (
            <IconLink key={props.href} {...props} />
          ))}
        </div>
      </div>
    </div>
  </>
);

export default Page;
