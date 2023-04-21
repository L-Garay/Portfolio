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
  isMobile: boolean;
  isDesktop: boolean;
  isAndroid: boolean;
  isIos: boolean;
  isWindows: boolean;
  useIsWindowWidthAboveOrBetweenThreshold: (
    minThreshold: number,
    maxThreshold?: number
  ) => boolean | undefined;
  isClientReady: boolean;
}

export const DeviceContext = createContext<DeviceContextProps>({
  windowWidth: 0,
  windowHeight: 0,
  isMobile: false,
  isDesktop: false,
  isAndroid: false,
  isIos: false,
  isWindows: false,
  useIsWindowWidthAboveOrBetweenThreshold: () => undefined,
  isClientReady: false,
} as DeviceContextProps);
export const DeviceProvider = ({ children }: { children: ReactNode }) => {
  console.log('HITTING THE CONTEXT');
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [isWindows, setIsWindows] = useState(false);
  const [isOpera, setIsOpera] = useState(false);
  const [isSSR, setIsSSR] = useState(false);

  function handleResize(e: Event) {
    const target = e.target as Window;
    setWindowWidth(target.innerWidth);
    setWindowHeight(target.innerHeight);
    console.log('handleResize', target.innerWidth, target.innerHeight);
  }

  useEffect(() => {
    setWindowHeight(window.innerHeight);
    setWindowWidth(window.innerWidth);
    console.log('useEffect', window.innerWidth, window.innerHeight);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const userAgent =
    typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;
  useEffect(() => {
    setIsAndroid(Boolean(userAgent.match(/Android/i)));
    setIsIos(Boolean(userAgent.match(/iPhone|iPad|iPod/i)));
    setIsOpera(Boolean(userAgent.match(/Opera Mini/i)));
    setIsWindows(Boolean(userAgent.match(/IEMobile/i)));
    setIsSSR(Boolean(userAgent.match(/SSR/i)));
    setIsMobile(Boolean(isAndroid || isIos || isOpera || isWindows));
    setIsDesktop(Boolean(!isMobile && !isSSR));
  }, [userAgent]);

  const useIsWindowWidthAboveOrBetweenThreshold = (
    minThreshold: number,
    maxThreshold: number | null = null
  ): boolean | undefined => {
    const [isWindowWidthAboveOrBetweenThreshold, calculate] = useState<
      boolean | undefined
    >(undefined);
    console.log(minThreshold, 'minThreshold');
    const handleWindowResize = useCallback((): void => {
      const width = window.innerWidth;
      console.log(width, 'width');
      calculate(
        maxThreshold !== null
          ? width >= minThreshold && width < maxThreshold
          : width >= minThreshold
      );
    }, [minThreshold, maxThreshold]);

    useEffect(() => {
      handleWindowResize();

      window.addEventListener('resize', handleWindowResize);

      return () => {
        window.removeEventListener('resize', handleWindowResize);
      };
    }, [handleWindowResize]);

    return isWindowWidthAboveOrBetweenThreshold;
  };

  const isClientReady =
    typeof window !== 'undefined' &&
    window.innerHeight > 0 &&
    window.innerWidth > 0;

  const state = {
    windowWidth,
    windowHeight,
    isMobile,
    isDesktop,
    isAndroid,
    isIos,
    isWindows,
    useIsWindowWidthAboveOrBetweenThreshold,
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
