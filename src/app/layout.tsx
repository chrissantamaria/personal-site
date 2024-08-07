import { Open_Sans } from 'next/font/google';

import { Analytics } from '~/components/Analytics';

import '../styles/globals.css';

const font = Open_Sans({ subsets: ['latin'] });

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className={font.className}>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
};

export default Layout;
