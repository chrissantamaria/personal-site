import type { AppProps } from 'next/app';
import 'fontsource-open-sans/latin.css';

import Analytics from '../components/Analytics';
import SEO from '../components/SEO';
import '../styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => (
  <>
    <Analytics />
    <SEO />
    <Component {...pageProps} />
  </>
);

export default App;
