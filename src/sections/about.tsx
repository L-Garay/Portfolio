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
import theme from '../styles/theme';

const AboutMeTitle = styled(SectionTitle)`
  text-align: start;
`;

const CarouselContainer = styled.div`
  background: lightgrey; // testing
  height: 675px; // testing
`;

const CarouselWrapper = styled.div`
  display: flex;
  width: 1300px; // TODO can't set a fixed 'width'
  height: 90%; // testing
  margin: 0 auto;
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
      left: ${action === 'next' ? '5%' : '-15%'};
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
        action === 'previous' ? '-15%' : action === 'next' ? '38.5%' : '5%'
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

const ButtonWrapper = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`;

const CarouselButton = styled.button`
  padding: 4px 8px;
  outline: none;
  border: none;
  background: none;
  font-size: 1.3rem;
  color: ${theme.colors.ORANGE_1};
  cursor: pointer;

  &:hover {
    color: ${theme.colors.BLUE_2};
    transform: scale(1.2);
  }

  &:focus-visible {
    color: ${theme.colors.BLUE_2};
    transform: scale(1.2);
    border: 2px solid ${theme.colors.BLUE_2};
  }
  transition: all 0.2s linear;
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
          <ButtonWrapper>
            <CarouselButton onClick={() => prevAction()}>
              Previous
            </CarouselButton>
            <CarouselButton onClick={() => nextAction()}>Next</CarouselButton>
          </ButtonWrapper>
        </CarouselContainer>
      </SectionContent>
    </Section>
  );
};

export default About;
