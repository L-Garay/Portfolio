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
import { useCaourselContext } from '../contexts/carouselContext';

const AboutMeTitle = styled(SectionTitle)`
  text-align: start;
`;

const CarouselContainer = styled.div`
  padding: 10px;
  background: lightgrey; // testing
`;

const CarouselWrapper = styled.div`
  display: flex;
  width: 1300px; // testing
  height: 800px; // testing
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

// NOTE the width of each individual item will determine how far we need to position the items' left property
// TODO once the data visualization components are done and we know the sizes, we need to then finetune and fix the positioning of the items
const NextItemClone = styled.div<ActionProps & VisibilityProps>`
  ${SHARED_ITEM_STYLES}
  height: 75%;
  ${({ action, isVisible }) => {
    return `
      left: ${action === 'next' ? '5%' : '2%'};
      opacity: ${isVisible ? '1' : '0'};
    `;
  }}
  transition: left .2s linear;
`;

const NextItem = styled.div<VisibilityProps>`
  ${SHARED_ITEM_STYLES}
  height: 75%;
  left: 5%; // may need to be 5%
  opacity: ${({ isVisible }) => (isVisible ? '1' : '0')};
`;

const AnimatedNextItem = styled.div<ActionProps & VisibilityProps>`
  ${SHARED_ITEM_STYLES}
  ${({ action, isVisible }) => {
    return `
      left: ${
        action === 'previous' ? '0%' : action === 'next' ? '38.5%' : '5%'
      };
      height: ${action === 'next' ? '100%' : '75%'};
      opacity: ${isVisible ? '1' : '0'};
    `;
  }}
  transition: left .2s linear;
`;

const ActiveItem = styled.div<VisibilityProps>`
  ${SHARED_ITEM_STYLES}
  left: 38.5%;
  height: 100%;
  opacity: ${({ isVisible }) => (isVisible ? '1' : '0')};
  z-index: 5;
`;

const AnimatedActiveItem = styled.div<ActionProps & VisibilityProps>`
  ${SHARED_ITEM_STYLES}
  ${({ action, isVisible }) => {
    return `
      left: ${
        action === 'previous' ? '5%' : action === 'next' ? '70%' : '38.5%'
      };
      height: ${action === 'next' || action === 'prev' ? '75%' : '100%'};
      opacity: ${isVisible ? '1' : '0'};
    `;
  }}
  transition: left .2s linear;
  z-index: 1;
`;

const PreviousItem = styled.div<VisibilityProps>`
  ${SHARED_ITEM_STYLES}
  height: 75%;
  left: 72.5%;
  opacity: ${({ isVisible }) => (isVisible ? '1' : '0')};
`;

const AnimatedPreviousItem = styled.div<ActionProps & VisibilityProps>`
  ${SHARED_ITEM_STYLES}
  ${({ action, isVisible }) => {
    return `
      left: ${
        action === 'previous' ? '38.5%' : action === 'next' ? '85%' : '72.5%'
      };
      height: ${action === 'prev' ? '100%' : '80%'};
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
      left: ${action === 'previous' ? '72.5%' : '85%'};
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

  const {
    isAnimated,
    action,
    nextAction,
    prevAction,
    nextCloneElement,
    nextElement,
    animatedNextElement,
    activeElement,
    animatedActiveElement,
    prevCloneElement,
    prevElement,
    animatedPrevElement,
  } = useCaourselContext();

  const NextCloneElement = nextCloneElement();
  const NextElement = nextElement();
  const AnimatedNextElement = animatedNextElement();
  const ActiveElment = activeElement();
  const AnimatedActiveElement = animatedActiveElement();
  const PrevCloneElement = prevCloneElement();
  const PrevElement = prevElement();
  const AnimatedPrevElement = animatedPrevElement();

  return (
    <Section
      id="about"
      height={isMobile ? windowHeight : undefined}
      style={{ paddingBottom: 80 }}
    >
      <SectionContent isMobile={isMobile} calculatedWidth={calcluatedWidth}>
        <SectionTitleContainer>
          <AboutMeTitle>05. About Me</AboutMeTitle>
        </SectionTitleContainer>
        <CarouselContainer>
          <CarouselWrapper>
            <OverflowContainer>
              <Carousel>
                <NextItemClone action={action} isVisible={isAnimated}>
                  <NextCloneElement />
                </NextItemClone>
                <NextItem isVisible={!isAnimated}>
                  <NextElement />
                </NextItem>
                <AnimatedNextItem action={action} isVisible={isAnimated}>
                  <AnimatedNextElement />
                </AnimatedNextItem>
                <ActiveItem isVisible={!isAnimated}>
                  <ActiveElment isActive />
                </ActiveItem>
                <AnimatedActiveItem action={action} isVisible={isAnimated}>
                  <AnimatedActiveElement />
                </AnimatedActiveItem>
                <PreviousItem isVisible={!isAnimated}>
                  <PrevElement />
                </PreviousItem>
                <AnimatedPreviousItem action={action} isVisible={isAnimated}>
                  <AnimatedPrevElement />
                </AnimatedPreviousItem>
                <PreviousItemClone action={action} isVisible={isAnimated}>
                  <PrevCloneElement />
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
