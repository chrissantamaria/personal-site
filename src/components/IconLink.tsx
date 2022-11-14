interface Props {
  component: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  href: string;
}

const IconLink = ({ component: Component, href }: Props) => (
  <a target="_blank" rel="noreferrer" className="mx-4" href={href}>
    <Component className="h-9" />
  </a>
);

export default IconLink;
