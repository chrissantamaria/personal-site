import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';

import { description, title } from './shared';

import '../styles/globals.css';

const font = Open_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title,
  description,
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className={font.className}>
      <body>{children}</body>
    </html>
  );
};

export default Layout;
