import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import preventScroll from '../utils/preventScroll';

export interface IntroContextProps {
  hasMounted: boolean;
  hasSeenIntro: boolean;
  setHasSeenIntro: (hasSeenIntro: boolean) => void;
}

export const IntroContext = createContext<IntroContextProps>({
  hasMounted: false,
  hasSeenIntro: false,
  setHasSeenIntro: () => {},
} as IntroContextProps);
export const IntroProvider = ({ children }: { children: ReactNode }) => {
  const [hasMounted, setHasMounted] = useState(false);
  const [hasSeenIntro, setHasSeenIntro] = useState(false);
  console.log(hasSeenIntro, 'hasSeenIntro');

  React.useEffect(() => {
    setHasMounted(true);
    console.log(window.innerHeight, window.innerWidth);
    preventScroll(true); // NOTE there seems to be like .25s gap between when it mounts and when it actually prevents scroll
  }, []);

  const state = {
    hasMounted,
    hasSeenIntro,
    setHasSeenIntro,
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
