import * as React from 'react';
import styled from 'styled-components';
import { Section, SectionContent } from '../components/sections';
import theme from '../styles/theme';
import { Heading2, Paragraph } from '../components/shared';
import { useDeviceContext } from '../contexts/deviceContext';
import { useIntroContext } from '../contexts/introContext';
import SCREEN_SIZES from '../constants/screenSizes';

type IntroductionProps = {
  hasSeenIntro: boolean;
};

const IntroductionContent = styled.div`
  text-align: start;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Heading = styled.h1<IntroductionProps>`
  margin: 0;
  font-size: clamp(2.5rem, 4vw, 4.5rem);
  color: ${theme.colors.BLUE_1};
  font-family: ${theme.fonts.robotoMono};
  opacity: ${({ hasSeenIntro }) => (hasSeenIntro ? 1 : 0)};
  transform: ${({ hasSeenIntro }) =>
    hasSeenIntro ? 'translateY(0)' : 'translateY(50px)'};
  transition: all 0.5s linear 1s;
`;

const IntroParagraph = styled(Paragraph)<IntroductionProps>`
  font-size: max(1rem, 1.1vw);
  opacity: ${({ hasSeenIntro }) => (hasSeenIntro ? 1 : 0)};
  transform: ${({ hasSeenIntro }) =>
    hasSeenIntro ? 'translateY(0)' : 'translateY(50px)'};
  transition: all 0.5s linear 0.75s;

  &.introduction2 {
    transition: all 0.5s linear 1.5s;
    font-size: max(0.9rem, 1.1vw);
  }
`;

const IntroHeading2 = styled(Heading2)<IntroductionProps>`
  font-size: clamp(1.75rem, 3vw, 3.5rem);
  color: ${theme.colors.ORANGE_1};
  opacity: ${({ hasSeenIntro }) => (hasSeenIntro ? 1 : 0)};
  transform: ${({ hasSeenIntro }) =>
    hasSeenIntro ? 'translateY(0)' : 'translateY(50px)'};
  transition: all 0.5s linear 1.25s;
`;

const Introduction = () => {
  const { hasSeenIntro } = useIntroContext();
  const { windowWidth, windowHeight, isWindowWidthAboveOrBetweenThreshold } =
    useDeviceContext();

  const isAboveSmall = isWindowWidthAboveOrBetweenThreshold(
    SCREEN_SIZES.MOBILE
  );

  const isMobile = !isAboveSmall;

  const widthDeduction = isMobile ? 100 : 200;

  return (
    <Section id="introduction" height={isMobile ? windowHeight : undefined}>
      <SectionContent
        isMobile={isMobile}
        calculatedWidth={windowWidth - widthDeduction}
      >
        <IntroductionContent>
          <IntroParagraph hasSeenIntro={hasSeenIntro}>
            My name is,{' '}
          </IntroParagraph>
          <Heading hasSeenIntro={hasSeenIntro}>Logan Garay</Heading>
          <IntroHeading2 hasSeenIntro={hasSeenIntro}>
            I am a Software Developer
          </IntroHeading2>
          <IntroParagraph hasSeenIntro={hasSeenIntro} className="introduction2">
            With a passion for creating simple and elogant digital experiences.
            <br />
            Looking to make tangible impact through code to better the world
            around us.
          </IntroParagraph>
        </IntroductionContent>
      </SectionContent>
    </Section>
  );
};

export default Introduction;
