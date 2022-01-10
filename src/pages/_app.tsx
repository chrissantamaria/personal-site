import type { AppProps } from 'next/app';
import 'fontsource-open-sans/latin.css';

import SEO from '../components/SEO';
import useInitAnalytics from '../hooks/useInitAnalytics';
import '../styles/globals.css';

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  useInitAnalytics();

  return (
    <>
      <SEO />
      <Component {...pageProps} />
    </>
  );
};

export default App;
