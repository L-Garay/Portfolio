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
import {
  AboutCard,
  BarCard,
  ContactCard,
  DonutCard,
} from '../components/About/cards';
import { InViewProps } from 'src/constants/sharedTypes';

const AboutMeTitle = styled(SectionTitle)`
  text-align: start;
`;

type BorderProps = {
  isAboveMobile?: boolean;
  isAbove925?: boolean;
};

const TopLeftBorder = styled.div<BorderProps>`
  position: absolute;
  top: 5%;
  left: 7.5%;
  border-left: 1px solid ${theme.colors.ORANGE_1};
  border-top: 1px solid ${theme.colors.ORANGE_1};
  z-index: -1;
  ${({ isAbove925 }) => {
    if (isAbove925) {
      return `
        height: 10%;
        width: 5.5%;
      `;
    } else {
      return `
      height: 0;
        width: 0;
        border: none;
      `;
    }
  }}
`;

const BottomLeftBorder = styled.div<BorderProps>`
  position: absolute;
  bottom: 1.5%;
  left: 7.5%;
  border-left: 1px solid ${theme.colors.ORANGE_1};
  border-bottom: 1px solid ${theme.colors.ORANGE_1};
  z-index: -1;
  ${({ isAbove925 }) => {
    if (isAbove925) {
      return `
        height: 10%;
        width: 5.5%;
      `;
    } else {
      return `
      height: 0;
        width: 0;
        border: none;
      `;
    }
  }}
`;

const TopRightBorder = styled.div<BorderProps>`
  position: absolute;
  top: 5%;
  right: 7.5%;
  border-right: 1px solid ${theme.colors.ORANGE_1};
  border-top: 1px solid ${theme.colors.ORANGE_1};
  z-index: -1;
  ${({ isAbove925 }) => {
    if (isAbove925) {
      return `
        height: 10%;
        width: 5.5%;
      `;
    } else {
      return `
      height: 0;
        width: 0;
        border: none;
      `;
    }
  }}
`;

const BottomRightBorder = styled.div<BorderProps>`
  position: absolute;
  bottom: 1.5%;
  right: 7.5%;
  border-right: 1px solid ${theme.colors.ORANGE_1};
  border-bottom: 1px solid ${theme.colors.ORANGE_1};
  z-index: -1;
  ${({ isAbove925 }) => {
    if (isAbove925) {
      return `
        height: 10%;
        width: 5.5%;
      `;
    } else {
      return `
      height: 0;
        width: 0;
        border: none;
      `;
    }
  }}
`;

const CarouselContainer = styled.div`
  height: 675px; // testing
`;

type DeviceProps = {
  isAboveLarge: boolean;
};

const CarouselWrapper = styled.div<DeviceProps>`
  display: flex;
  min-width: 769px; // I think if we choose this value (the value at which I think we should switch TO the carousel, meaning below this value we should use the static version); we'll need to adjust the positioning of the carousel items
  /* NOTE that the width of the carousel is specified for the MEDIUM screen size of 992px */
  /* BELOW 992px THERE SHOULD BE NO CAROUSEL */
  /* The carousel can get larger than 769px obviously, but below a screen size of 992px and a carousel size of 769px and the carousel should not be rendered */
  min-width: ${({ isAboveLarge }) => {
    if (isAboveLarge) {
      return `1200px;`;
    } else {
      return `769px;`;
    }
  }};
  height: 90%; // testing
  margin: 0 auto;
`;

const OverflowContainer = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 12.5px;
  border: 5px solid ${theme.colors.BLUE_5};
  background-color: rgb(80, 218, 252, 0.1);
  box-shadow: 0px 7.5px 20px 5px ${theme.colors.BLUE_5};

  /* &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 80px;
    border-radius: 7.5px;
    z-index: 1;
    background: linear-gradient(to left, transparent, ${theme.colors.ORANGE_1});
  }
  &:after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    height: 100%;
    width: 80px;
    border-radius: 7.5px;
    z-index: 1;
    background: linear-gradient(
      to right,
      transparent,
      ${theme.colors.ORANGE_1}
    );
  } */
`;

const Carousel = styled.div`
  display: flex;
  position: absolute;
  left: -57.5%;
  height: 100%;
  width: 200%;
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
  isAboveLarge: boolean;
};

const NextItemClone = styled.div<ActionProps & VisibilityProps>`
  ${SHARED_ITEM_STYLES}
  height: 75%;
  ${({ action, isVisible, isAboveLarge }) => {
    if (isAboveLarge) {
      return `
      left: ${action === 'next' ? '0%' : '-15%'};
      opacity: ${isVisible ? '1' : '0'};
    `;
    } else {
      return `
      left: ${action === 'next' ? '-17.5%' : '-35%'};
      opacity: ${isVisible ? '1' : '0'};
    `;
    }
  }}
  transition: left .2s linear;
`;

const NextItem = styled.div<VisibilityProps>`
  ${SHARED_ITEM_STYLES}
  height: 75%;
  ${({ isAboveLarge }) => {
    if (isAboveLarge) {
      return `
        left: 0%;
      `;
    } else {
      return `
        left: -17.5%;
      `;
    }
  }}
  opacity: ${({ isVisible }) => (isVisible ? '1' : '0')};
`;

const AnimatedNextItem = styled.div<ActionProps & VisibilityProps>`
  ${SHARED_ITEM_STYLES}
  ${({ action, isVisible }) => {
    return `
      height: ${action === 'next' ? '100%' : '75%'};
      opacity: ${isVisible ? '1' : '0'};
    `;
  }}
  ${({ isAboveLarge, action }) => {
    if (isAboveLarge) {
      return `
      left: ${
        action === 'previous' ? '-15%' : action === 'next' ? '38.5%' : '0%'
      };
      `;
    } else {
      return `
      left: ${
        action === 'previous' ? '-35%' : action === 'next' ? '33.5%' : '-17.5%'
      };
      `;
    }
  }}
  transition: left .2s linear;
`;

const ActiveItem = styled.div<VisibilityProps>`
  ${SHARED_ITEM_STYLES}
  left: ${({ isAboveLarge }) => (isAboveLarge ? '38.5%' : '33.5%')};
  height: 100%;
  opacity: ${({ isVisible }) => (isVisible ? '1' : '0')};
  z-index: 5;
`;

const AnimatedActiveItem = styled.div<ActionProps & VisibilityProps>`
  ${SHARED_ITEM_STYLES}
  ${({ action, isVisible }) => {
    return `
      height: ${action === 'next' || action === 'prev' ? '75%' : '100%'};
      opacity: ${isVisible ? '1' : '0'};
    `;
  }}
  ${({ isAboveLarge, action }) => {
    if (isAboveLarge) {
      return `
      left: ${
        action === 'previous' ? '5%' : action === 'next' ? '70%' : '38.5%'
      };
      `;
    } else {
      return `
      left: ${
        action === 'previous' ? '-17.5%' : action === 'next' ? '70%' : '33.5%'
      };
      `;
    }
  }}
  transition: left .2s linear;
  z-index: 1;
`;

const PreviousItem = styled.div<VisibilityProps>`
  ${SHARED_ITEM_STYLES}
  height: 75%;
  left: ${({ isAboveLarge }) => (isAboveLarge ? '76%' : '90%')};
  opacity: ${({ isVisible }) => (isVisible ? '1' : '0')};
`;

const AnimatedPreviousItem = styled.div<ActionProps & VisibilityProps>`
  ${SHARED_ITEM_STYLES}
  ${({ action, isVisible }) => {
    return `
      
      height: ${action === 'prev' ? '100%' : '80%'};
      opacity: ${isVisible ? '1' : '0'};
    `;
  }}
  ${({ isAboveLarge, action }) => {
    if (isAboveLarge) {
      return `
      left: ${
        action === 'previous' ? '38.5%' : action === 'next' ? '85%' : '76%'
      };
      `;
    } else {
      return `
      left: ${
        action === 'previous' ? '33.5%' : action === 'next' ? '115%' : '90%'
      };
      `;
    }
  }}
  transition: left .2s linear;
`;

const PreviousItemClone = styled.div<ActionProps & VisibilityProps>`
  ${SHARED_ITEM_STYLES}
  height: 75%;
  opacity: ${({ isVisible }) => (isVisible ? '1' : '0')};
  ${({ isAboveLarge, action }) => {
    if (isAboveLarge) {
      return `
      left: ${action === 'previous' ? '76%' : '85%'};
      `;
    } else {
      return `
      left: ${action === 'previous' ? '90%' : '115%'};
      `;
    }
  }}
  transition: left .2s linear;
`;

const ButtonWrapper = styled.div`
  width: 80%;
  margin: 40px auto 0 auto;
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

const StaticCardContainer = styled.div``;

const StaticCardWrapper = styled.div`
  margin: 30px 0;
`;

const About = React.forwardRef<HTMLDivElement, InViewProps>(
  ({ inView }, ref) => {
    const { windowWidth, windowHeight, isWindowWidthAboveOrBetweenThreshold } =
      useDeviceContext();

    const isAboveMobile = isWindowWidthAboveOrBetweenThreshold(
      SCREEN_SIZES.MOBILE
    );
    const isAboveSmall = isWindowWidthAboveOrBetweenThreshold(
      SCREEN_SIZES.SMALL
    );
    const isAboveMedium = isWindowWidthAboveOrBetweenThreshold(
      SCREEN_SIZES.MEDIUM
    );
    const isAboveLarge = isWindowWidthAboveOrBetweenThreshold(
      SCREEN_SIZES.LARGE
    );
    const isAbove1450 = isWindowWidthAboveOrBetweenThreshold(1450);
    const above1450 = isAbove1450 ? isAbove1450 : false;
    const isAbove925 = isWindowWidthAboveOrBetweenThreshold(925);
    const above925 = isAbove925 ? isAbove925 : false;

    const isMobile = !isAboveMobile;

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
        marginTop={isAboveSmall ? 225 : 0}
        style={{ paddingBottom: 80 }}
        ref={ref}
      >
        <TopLeftBorder isAbove925={isAbove925} isAboveMobile={isAboveMobile} />
        <BottomLeftBorder
          isAbove925={isAbove925}
          isAboveMobile={isAboveMobile}
        />
        <TopRightBorder isAbove925={isAbove925} isAboveMobile={isAboveMobile} />
        <BottomRightBorder
          isAbove925={isAbove925}
          isAboveMobile={isAboveMobile}
        />
        <SectionContent isMobile={isMobile} calculatedWidth={calcluatedWidth}>
          <SectionTitleContainer>
            <AboutMeTitle>04. About Me</AboutMeTitle>
          </SectionTitleContainer>
          {above925 ? (
            <CarouselContainer>
              <CarouselWrapper isAboveLarge={above1450}>
                <OverflowContainer>
                  <Carousel>
                    <NextItemClone
                      action={action}
                      isVisible={isAnimated}
                      isAboveLarge={above1450}
                    >
                      <NextCloneElement />
                    </NextItemClone>
                    <NextItem isVisible={!isAnimated} isAboveLarge={above1450}>
                      <NextElement />
                    </NextItem>
                    <AnimatedNextItem
                      action={action}
                      isVisible={isAnimated}
                      isAboveLarge={above1450}
                    >
                      <AnimatedNextElement />
                    </AnimatedNextItem>
                    <ActiveItem
                      isVisible={!isAnimated}
                      isAboveLarge={above1450}
                    >
                      <ActiveElment isActive />
                    </ActiveItem>
                    <AnimatedActiveItem
                      action={action}
                      isVisible={isAnimated}
                      isAboveLarge={above1450}
                    >
                      <AnimatedActiveElement />
                    </AnimatedActiveItem>
                    <PreviousItem
                      isVisible={!isAnimated}
                      isAboveLarge={above1450}
                    >
                      <PrevElement />
                    </PreviousItem>
                    <AnimatedPreviousItem
                      action={action}
                      isVisible={isAnimated}
                      isAboveLarge={above1450}
                    >
                      <AnimatedPrevElement />
                    </AnimatedPreviousItem>
                    <PreviousItemClone
                      action={action}
                      isVisible={isAnimated}
                      isAboveLarge={above1450}
                    >
                      <PrevCloneElement />
                    </PreviousItemClone>
                  </Carousel>
                </OverflowContainer>
              </CarouselWrapper>
              <ButtonWrapper>
                <CarouselButton onClick={() => nextAction()}>
                  Previous
                </CarouselButton>
                <CarouselButton onClick={() => prevAction()}>
                  Next
                </CarouselButton>
              </ButtonWrapper>
            </CarouselContainer>
          ) : (
            <StaticCardContainer>
              <StaticCardWrapper>
                <AboutCard />
              </StaticCardWrapper>
              <StaticCardWrapper>
                <DonutCard isActive />
              </StaticCardWrapper>
              <StaticCardWrapper>
                <BarCard isActive />
              </StaticCardWrapper>
              <StaticCardWrapper>
                <ContactCard />
              </StaticCardWrapper>
            </StaticCardContainer>
          )}
        </SectionContent>
      </Section>
    );
  }
);

export default About;
