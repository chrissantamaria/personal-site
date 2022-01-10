import { useEffect } from 'react';
import galite from 'ga-lite';

const useInitAnalytics = () => {
  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      galite('create', 'UA-180731745-1', 'auto');
      galite('send', 'pageview');
    }
  }, []);
};

export default useInitAnalytics;
