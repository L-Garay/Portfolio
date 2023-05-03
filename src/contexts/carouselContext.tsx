import React, { createContext, ReactNode, useContext } from 'react';
import {
  AboutCard,
  BarCard,
  DonutCard,
  PieCard,
} from '../components/About/cards';

const ITEM_CONFIG = [
  {
    index: 0,
    name: 'item 1',
    element: (activeIndex: number) => {
      const isActive = activeIndex === 0;
      return <AboutCard isActive={isActive} />;
    },
  },
  {
    index: 1,
    name: 'item 2',
    element: (activeIndex: number) => {
      const isActive = activeIndex === 1;
      return <PieCard isActive={isActive} />;
    },
  },
  {
    index: 2,
    name: 'item 3',
    element: (activeIndex: number) => {
      const isActive = activeIndex === 2;
      return <BarCard isActive={isActive} />;
    },
  },
  {
    index: 3,
    name: 'item 4',
    element: (activeIndex: number) => {
      const isActive = activeIndex === 3;
      return <DonutCard isActive={isActive} />;
    },
  },
];

export interface CarouselContextProps {
  activeIndex: number;
  isAnimated: boolean;
  action: 'previous' | 'next' | 'reset';
  nextAction: () => void;
  prevAction: () => void;
  nextCloneElement: (activeIndex: number) => JSX.Element;
  nextElement: (activeIndex: number) => JSX.Element;
  animatedNextElement: (activeIndex: number) => JSX.Element;
  activeElement: (activeIndex: number) => JSX.Element;
  animatedActiveElement: (activeIndex: number) => JSX.Element;
  prevElement: (activeIndex: number) => JSX.Element;
  animatedPrevElement: (activeIndex: number) => JSX.Element;
  prevCloneElement: (activeIndex: number) => JSX.Element;
}

export const CarouselContext = createContext<CarouselContextProps>({
  activeIndex: 0,
  isAnimated: false,
  action: 'reset',
  nextAction: () => {},
  prevAction: () => {},
  nextCloneElement: (activeIndex: number) => <div />,
  nextElement: (activeIndex: number) => <div />,
  animatedNextElement: (activeIndex: number) => <div />,
  activeElement: (activeIndex: number) => <div />,
  animatedActiveElement: (activeIndex: number) => <div />,
  prevElement: (activeIndex: number) => <div />,
  animatedPrevElement: (activeIndex: number) => <div />,
  prevCloneElement: (activeIndex: number) => <div />,
} as CarouselContextProps);

export const CarouselProvider = ({ children }: { children: ReactNode }) => {
  const [nextCloneIndex, setNextCloneIndex] = React.useState(2);
  const [nextIndex, setNextIndex] = React.useState(1);
  const [animatedNextIndex, setAnimatedNextIndex] = React.useState(1);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [animatedActiveIndex, setAnimatedActiveIndex] = React.useState(0);
  const [prevIndex, setPrevIndex] = React.useState(ITEM_CONFIG.length - 1);
  const [animatedPrevIndex, setAnimatedPrevIndex] = React.useState(
    ITEM_CONFIG.length - 1
  );
  const [prevCloneIndex, setPrevCloneIndex] = React.useState(
    ITEM_CONFIG.length - 2
  );
  const [isAnimated, setIsAnimated] = React.useState(false);
  const [action, setAction] = React.useState<'previous' | 'next' | 'reset'>(
    'reset'
  );

  const determineNextIndex = (activeIndex: number) => {
    if (activeIndex === ITEM_CONFIG.length - 1) {
      return 0;
    } else {
      return activeIndex + 1;
    }
  };

  const determinePreviousIndex = (activeIndex: number) => {
    if (activeIndex === 0) {
      return ITEM_CONFIG.length - 1;
    } else {
      return activeIndex - 1;
    }
  };

  const nextAction = () => {
    setIsAnimated(true);
    setAction('next');
    setNextIndex((prev) => determineNextIndex(prev));
    setActiveIndex((prev) => determineNextIndex(prev));
    setPrevIndex((prev) => determineNextIndex(prev));
    setTimeout(() => {
      setIsAnimated(false);
      setAction('reset');
      setAnimatedNextIndex((prev) => determineNextIndex(prev));
      setAnimatedActiveIndex((prev) => determineNextIndex(prev));
      setAnimatedPrevIndex((prev) => determineNextIndex(prev));
      setNextCloneIndex((prev) => determineNextIndex(prev));
      setPrevCloneIndex((prev) => determineNextIndex(prev));
    }, 200);
  };

  const prevAction = () => {
    setIsAnimated(true);
    setAction('previous');
    setNextIndex((prev) => determinePreviousIndex(prev));
    setActiveIndex((prev) => determinePreviousIndex(prev));
    setPrevIndex((prev) => determinePreviousIndex(prev));
    setTimeout(() => {
      setIsAnimated(false);
      setAction('reset');
      setAnimatedNextIndex((prev) => determinePreviousIndex(prev));
      setAnimatedActiveIndex((prev) => determinePreviousIndex(prev));
      setAnimatedPrevIndex((prev) => determinePreviousIndex(prev));
      setNextCloneIndex((prev) => determinePreviousIndex(prev));
      setPrevCloneIndex((prev) => determinePreviousIndex(prev));
    }, 200);
  };

  const nextCloneElement = ITEM_CONFIG[nextCloneIndex].element;
  const nextElement = ITEM_CONFIG[nextIndex].element;

  const animatedNextElement = ITEM_CONFIG[animatedNextIndex].element;
  const activeElement = ITEM_CONFIG[activeIndex].element;

  const animatedActiveElement = ITEM_CONFIG[animatedActiveIndex].element;
  const prevElement = ITEM_CONFIG[prevIndex].element;

  const animatedPrevElement = ITEM_CONFIG[animatedPrevIndex].element;
  const prevCloneElement = ITEM_CONFIG[prevCloneIndex].element;

  const state = {
    activeIndex,
    isAnimated,
    action,
    nextAction,
    prevAction,
    nextCloneElement,
    nextElement,
    animatedNextElement,
    activeElement,
    animatedActiveElement,
    prevElement,
    animatedPrevElement,
    prevCloneElement,
  };

  return (
    <CarouselContext.Provider value={{ ...state }}>
      {children}
    </CarouselContext.Provider>
  );
};

export function useCaourselContext() {
  return useContext(CarouselContext);
}