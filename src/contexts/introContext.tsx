import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react';
import preventScroll from '../utils/preventScroll';

export interface IntroContextProps {
  hasMounted: boolean;
  hasSeenIntro: boolean;
  setHasSeenIntro: (hasSeenIntro: boolean) => void;
  shouldSkipIntro: boolean;
  setShouldSkipIntro: (shouldSkipIntro: boolean) => void;
}

export const IntroContext = createContext<IntroContextProps>({
  hasMounted: false,
  hasSeenIntro: false,
  setHasSeenIntro: () => {},
  shouldSkipIntro: false,
  setShouldSkipIntro: () => {}
} as IntroContextProps);
export const IntroProvider = ({ children }: { children: ReactNode }) => {
  const [hasMounted, setHasMounted] = useState(false);
  const [hasSeenIntro, setHasSeenIntro] = useState(false);
  const [shouldSkipIntro, setShouldSkipIntro] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    history.scrollRestoration = 'manual';
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    preventScroll(true); // may or may not need this
  }, [hasMounted]);

  const state = {
    hasMounted,
    hasSeenIntro,
    setHasSeenIntro,
    shouldSkipIntro,
    setShouldSkipIntro
  };

  return (
    <IntroContext.Provider value={{ ...state }}>
      {children}
    </IntroContext.Provider>
  );
};

const wrapWithIntroContext = ({ element }: { element: ReactNode }) => {
  return <IntroProvider>{element}</IntroProvider>;
};

export default wrapWithIntroContext;

export function useIntroContext() {
  return useContext(IntroContext);
}
