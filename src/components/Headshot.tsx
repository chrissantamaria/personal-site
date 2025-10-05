import { clsx } from 'clsx';
import Image from 'next/image';

import headshotImage from '~/images/headshot.png';

interface Props {
  className?: string;
  width: number;
  height?: number;
}

const Headshot = ({ className, width, height = width }: Props) => (
  <span
    className={clsx(
      className,
      'isolate flex overflow-hidden rounded-full border-4 border-white',
    )}
  >
    <Image
      className="select-none"
      src={headshotImage}
      alt="Headshot of Chris"
      width={width}
      height={height}
      placeholder="blur"
      draggable={false}
    />
  </span>
);

export default Headshot;
