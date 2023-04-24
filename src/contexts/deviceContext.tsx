import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
// import useIsWindowWidthAboveOrBetweenThreshold from '../utils/hooks/useDetectWindowWidth';

export interface DeviceContextProps {
  windowWidth: number;
  windowHeight: number;
  isWindowWidthAboveOrBetweenThreshold: (
    minThreshold: number,
    maxThreshold?: number
  ) => boolean | undefined;
  isClientReady: boolean;
}

export const DeviceContext = createContext<DeviceContextProps>({
  windowWidth: 0,
  windowHeight: 0,
  isWindowWidthAboveOrBetweenThreshold: () => undefined,
  isClientReady: false,
} as DeviceContextProps);
export const DeviceProvider = ({ children }: { children: ReactNode }) => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  function handleResize(e: Event) {
    const target = e.target as Window;
    setWindowWidth(target.innerWidth);
    setWindowHeight(target.innerHeight);
  }

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    setWindowWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isWindowWidthAboveOrBetweenThreshold = (
    minThreshold: number,
    maxThreshold: number | null = null
  ): boolean | undefined => {
    return maxThreshold !== null
      ? windowWidth >= minThreshold && windowWidth < maxThreshold
      : windowWidth >= minThreshold;
  };

  const isClientReady =
    typeof window !== 'undefined' &&
    window.innerHeight > 0 &&
    window.innerWidth > 0;

  const state = {
    windowWidth,
    windowHeight,
    isWindowWidthAboveOrBetweenThreshold,
    isClientReady,
  };

  return (
    <DeviceContext.Provider value={{ ...state }}>
      {children}
    </DeviceContext.Provider>
  );
};

const wrapWithDeviceContext = ({ element }: { element: ReactNode }) => {
  return <DeviceProvider>{element}</DeviceProvider>;
};

export default wrapWithDeviceContext;

export function useDeviceContext() {
  return useContext(DeviceContext);
}
