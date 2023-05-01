import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import Donut from '../components/About/donut';
import Pie from '../components/About/pie';
import Bar from '../components/About/bar';
import {
  barChartOneData,
  barChartTwoData,
} from '../utils/configs/aboutConfigs';

// NOTE
// the strokeDashValues do not need to equal 100 when combined
// think of it more as in, what percentage of the total pie chart should this slice take up?
// and then don't forget that the later elements in the array will be layered on top of the earlier elements
// ex. based on values of 100, 70, 50 and 30
// the first slice will fill 100% of the pie chart
// the second slice will fill 70% of the pie chart, overlapping the first 70% of the first slice
// this will make it appear as though the first slice is only 30% of the pie chart (100 - 70)
// the third slice will take up 50% of the pie chart, overlapping the first 50% of the second slice
// this would make it appear as though the first slice is 30% (100 - 70) and then the second slice is 20% (70 - 50)
// the fourth slice will take up 30% of the pie chart, overlapping the first 30% of the third slice
// this would make it appear as though the first slice is 30% (100 - 70) and then the second slice is 20% (70 - 50) and then the third slice is 20% (50 - 30)
// with the final slice being the remaining 30% of the pie chart
// NOTE so there will need to be some math involved in deciding the strokeDashValues
const pieChartOneData = [
  {
    name: 'slice 1',
    id: 'slice1',
    percentage: 50,
    strokeColor: 'blue',
    strokeDashValue: 100,
  },
  {
    name: 'slice 2',
    id: 'slice2',
    percentage: 15,
    strokeColor: 'orange',
    strokeDashValue: 75,
  },
  {
    name: 'slice 3',
    id: 'slice3',
    percentage: 15,
    strokeColor: 'red',
    strokeDashValue: 50,
  },
  {
    name: 'slice 4',
    id: 'slice4',
    percentage: 20,
    strokeColor: 'green',
    strokeDashValue: 40,
  },
  {
    name: 'slice 5',
    id: 'slice5',
    percentage: 20,
    strokeColor: 'purple',
    strokeDashValue: 20,
  },
];

// NOTE the width of each individual item will determine how far we need to position the items' left property
// TODO once the data visualization components are done and we know the sizes, we need to then finetune and fix the positioning of the items
const ITEM_CONFIG = [
  {
    index: 0,
    name: 'item 1',
    element: (activeIndex: number) => {
      const isActive = activeIndex === 0;
      return <Donut percentageFill={65} isActive={isActive} />;
    },
  },
  {
    index: 1,
    name: 'item 2',
    element: (activeIndex: number) => {
      const isActive = activeIndex === 1;
      return <Pie isActive={isActive} pieData={pieChartOneData} />;
    },
  },
  {
    index: 2,
    name: 'item 3',
    element: (activeIndex: number) => {
      const isActive = activeIndex === 2;
      return (
        <>
          <Bar barData={barChartOneData} isActive={isActive} />
          {/* <Bar barData={barChartTwoData} isActive={isActive} /> */}
        </>
      );
    },
  },
  {
    index: 3,
    name: 'item 4',
    element: (activeIndex: number) => {
      const isActive = activeIndex === 3;
      return (
        <div style={{ height: 400, width: 300, background: 'yellow' }}>
          item 4
        </div>
      );
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
