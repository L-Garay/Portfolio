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
  isMobileDevice: boolean;
  isDesktopDevice: boolean;
  isWindowWidthAboveOrBetweenThreshold: (
    minThreshold: number,
    maxThreshold?: number
  ) => boolean | undefined;
  isClientReady: boolean;
}

export const DeviceContext = createContext<DeviceContextProps>({
  windowWidth: 0,
  windowHeight: 0,
  isMobileDevice: false,
  isDesktopDevice: false,
  isWindowWidthAboveOrBetweenThreshold: () => undefined,
  isClientReady: false,
} as DeviceContextProps);
export const DeviceProvider = ({ children }: { children: ReactNode }) => {
  console.log('HITTING THE CONTEXT');
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const [isMobileDevice, setIsMobile] = useState(false);
  const [isDesktopDevice, setIsDesktop] = useState(false);
  const [isAndroidDevice, setIsAndroid] = useState(false);
  const [isIosDevice, setIsIos] = useState(false);
  const [isWindowsDevice, setIsWindows] = useState(false);
  const [isOperaDevice, setIsOpera] = useState(false);
  const [isSSRDevice, setIsSSR] = useState(false);

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
    setIsMobile(
      Boolean(
        isAndroidDevice || isIosDevice || isOperaDevice || isWindowsDevice
      )
    );
    setIsDesktop(Boolean(!isMobileDevice && !isSSRDevice));
  }, [userAgent]);

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
    isMobileDevice,
    isDesktopDevice,
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
