import * as React from 'react';
import styled from 'styled-components';
import {
  Section,
  SectionContent,
  SectionTitleContainer,
  SectionTitle,
} from '../components/sections';
import { useDeviceContext } from '../contexts/deviceContext';
import SCREEN_SIZES from '../constants/screenSizes';
import Donut from '../components/About/donut';

const AboutMeTitle = styled(SectionTitle)`
  text-align: start;
`;

const CarouselContainer = styled.div`
  padding: 10px;
  background: lightgrey; // testing
`;

const CarouselWrapper = styled.div`
  display: flex;
  /* max-width: 1000px; // may need to change */
  width: 1100px; // testing
  height: 550px; // testing
  margin: 0 auto;
  background: lightpink; // testing
`;

const OverflowContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 12.5px;
  border: 2px solid red;
`;

const Carousel = styled.div`
  display: flex;
  position: absolute;
  left: -57.5%;
  height: 100%;
  width: 200%;
  background: lightblue; // testing
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
`;

const SHARED_ITEM_STYLES = `
  display: flex;
  position: absolute;
  border: 1px solid black; // testing
  scroll-snap-align: start;
`;

type ActionProps = {
  action: string;
};

type VisibilityProps = {
  isVisible: boolean;
};

const NextItemClone = styled.div<ActionProps & VisibilityProps>`
  ${SHARED_ITEM_STYLES}
  height: 75%;
  ${({ action, isVisible }) => {
    return `
      left: ${action === 'next' ? '25%' : '10%'};
      opacity: ${isVisible ? '1' : '0'};
    `;
  }}
  transition: left .2s linear;
`;

const NextItem = styled.div<VisibilityProps>`
  ${SHARED_ITEM_STYLES}
  height: 75%;
  left: 25%;
  opacity: ${({ isVisible }) => (isVisible ? '1' : '0')};
`;

const AnimatedNextItem = styled.div<ActionProps & VisibilityProps>`
  ${SHARED_ITEM_STYLES}
  ${({ action, isVisible }) => {
    return `
      left: ${
        action === 'previous' ? '0%' : action === 'next' ? '46.62%' : '25%'
      };
      height: ${action === 'next' ? '100%' : '75%'};
      opacity: ${isVisible ? '1' : '0'};
    `;
  }}
  transition: left .2s linear;
`;

const ActiveItem = styled.div<VisibilityProps>`
  ${SHARED_ITEM_STYLES}
  left: 46.62%;
  height: 100%;
  opacity: ${({ isVisible }) => (isVisible ? '1' : '0')};
`;

const AnimatedActiveItem = styled.div<ActionProps & VisibilityProps>`
  ${SHARED_ITEM_STYLES}
  ${({ action, isVisible }) => {
    return `
      left: ${
        action === 'previous' ? '25%' : action === 'next' ? '70%' : '46.62%'
      };
      height: ${action === 'next' || action === 'prev' ? '75%' : '100%'};
      opacity: ${isVisible ? '1' : '0'};
    `;
  }}
  transition: left .2s linear;
`;

const PreviousItemClone = styled.div<ActionProps & VisibilityProps>`
  ${SHARED_ITEM_STYLES}
  height: 75%;
  ${({ action, isVisible }) => {
    return `
      left: ${action === 'previous' ? '70%' : '85%'};
      opacity: ${isVisible ? '1' : '0'};
    `;
  }}
  transition: left .2s linear;
`;

const PreviousItem = styled.div<VisibilityProps>`
  ${SHARED_ITEM_STYLES}
  height: 75%;
  left: 70%;
  opacity: ${({ isVisible }) => (isVisible ? '1' : '0')};
`;

const AnimatedPreviousItem = styled.div<ActionProps & VisibilityProps>`
  ${SHARED_ITEM_STYLES}
  ${({ action, isVisible }) => {
    return `
      left: ${
        action === 'previous' ? '46.62%' : action === 'next' ? '85%' : '70%'
      };
      height: ${action === 'prev' ? '100%' : '75%'};
      opacity: ${isVisible ? '1' : '0'};
    `;
  }}
  transition: left .2s linear;
`;

const About = () => {
  const { windowWidth, windowHeight, isWindowWidthAboveOrBetweenThreshold } =
    useDeviceContext();

  const isAboveSmall = isWindowWidthAboveOrBetweenThreshold(
    SCREEN_SIZES.MOBILE
  );
  const isAboveMedium = isWindowWidthAboveOrBetweenThreshold(
    SCREEN_SIZES.MEDIUM
  );
  const isAboveLarge = isWindowWidthAboveOrBetweenThreshold(SCREEN_SIZES.LARGE);

  const isMobile = !isAboveSmall;

  const widthDeduction = isAboveLarge ? 450 : isAboveMedium ? 300 : 200;

  const calcluatedWidth = windowWidth - widthDeduction;

  // NOTE the width of each individual item will determine how far we need to position the items' left property
  // TODO once the data visualization components are done and we know the sizes, we need to then finetune and fix the positioning of the items
  const itemConfig = [
    {
      index: 0,
      name: 'item 1',
      element: (
        <div style={{ height: 400, width: 300, background: 'blue' }}>
          item 1
        </div>
      ),
      // element: <Donut percentageFill={65} />,
    },
    {
      index: 1,
      name: 'item 2',
      element: (
        <div style={{ height: 400, width: 300, background: 'green' }}>
          item 2
        </div>
      ),
    },
    {
      index: 2,
      name: 'item 3',
      element: (
        <div style={{ height: 400, width: 300, background: 'red' }}>item 3</div>
      ),
    },
    {
      index: 3,
      name: 'item 4',
      element: (
        <div style={{ height: 400, width: 300, background: 'yellow' }}>
          item 4
        </div>
      ),
    },
  ];

  const configLength = itemConfig.length;

  const determineNextIndex = (activeIndex: number) => {
    if (activeIndex === configLength - 1) {
      return 0;
    } else {
      return activeIndex + 1;
    }
  };

  const determinePreviousIndex = (activeIndex: number) => {
    if (activeIndex === 0) {
      return configLength - 1;
    } else {
      return activeIndex - 1;
    }
  };

  const [nextCloneIndex, setNextCloneIndex] = React.useState(2);
  const [nextIndex, setNextIndex] = React.useState(1);
  const [animatedNextIndex, setAnimatedNextIndex] = React.useState(1);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [animatedActiveIndex, setAnimatedActiveIndex] = React.useState(0);
  const [prevIndex, setPrevIndex] = React.useState(configLength - 1);
  const [animatedPrevIndex, setAnimatedPrevIndex] = React.useState(
    configLength - 1
  );
  const [prevCloneIndex, setPrevCloneIndex] = React.useState(configLength - 2);
  const [isAnimated, setIsAnimated] = React.useState(false);
  const [action, setAction] = React.useState<'previous' | 'next' | 'reset'>(
    'reset'
  );

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

  const nextCloneElement = itemConfig[nextCloneIndex].element;
  const nextElement = itemConfig[nextIndex].element;

  const animatedNextElement = itemConfig[animatedNextIndex].element;
  const activeElement = itemConfig[activeIndex].element;

  const animatedActiveElement = itemConfig[animatedActiveIndex].element;
  const prevElement = itemConfig[prevIndex].element;

  const animatedPrevElement = itemConfig[animatedPrevIndex].element;
  const prevCloneElement = itemConfig[prevCloneIndex].element;

  return (
    <Section id="about" height={isMobile ? windowHeight : undefined}>
      <SectionContent isMobile={isMobile} calculatedWidth={calcluatedWidth}>
        <SectionTitleContainer>
          <AboutMeTitle>05. About Me</AboutMeTitle>
        </SectionTitleContainer>
        <CarouselContainer>
          <CarouselWrapper>
            <OverflowContainer>
              <Carousel>
                <NextItemClone action={action} isVisible={isAnimated}>
                  {nextCloneElement}
                </NextItemClone>
                <NextItem isVisible={!isAnimated}>{nextElement}</NextItem>
                <AnimatedNextItem action={action} isVisible={isAnimated}>
                  {animatedNextElement}
                </AnimatedNextItem>
                <ActiveItem isVisible={!isAnimated}>{activeElement}</ActiveItem>
                <AnimatedActiveItem action={action} isVisible={isAnimated}>
                  {animatedActiveElement}
                </AnimatedActiveItem>
                <PreviousItem isVisible={!isAnimated}>
                  {prevElement}
                </PreviousItem>
                <AnimatedPreviousItem action={action} isVisible={isAnimated}>
                  {animatedPrevElement}
                </AnimatedPreviousItem>
                <PreviousItemClone action={action} isVisible={isAnimated}>
                  {prevCloneElement}
                </PreviousItemClone>
              </Carousel>
            </OverflowContainer>
          </CarouselWrapper>
          <button onClick={() => prevAction()}>Previous</button>
          <button onClick={() => nextAction()}>Next</button>
        </CarouselContainer>
      </SectionContent>
    </Section>
  );
};

export default About;
