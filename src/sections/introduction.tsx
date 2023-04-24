import * as React from 'react';
import styled from 'styled-components';
import { Section, SectionContent } from '../components/sections';
import theme from '../styles/theme';
import { Heading2, Paragraph } from '../components/shared';
import { useDeviceContext } from '../contexts/deviceContext';
import SCREEN_SIZES from '../constants/screenSizes';

const IntroductionContent = styled.div`
  text-align: start;
`;

const Heading = styled.h1`
  margin: 0;
  font-size: clamp(2.5rem, 4vw, 4.5rem);
  color: ${theme.colors.BLUE_1};
  font-family: ${theme.fonts.robotoMono};
`;

const IntroParagraph = styled(Paragraph)`
  font-size: max(0.8rem, 1.1vw);
`;

const IntroHeading2 = styled(Heading2)`
  font-size: clamp(1.75rem, 3vw, 3.5rem);
  color: ${theme.colors.ORANGE_1};
`;

const Introduction = () => {
  const { windowWidth, windowHeight, isWindowWidthAboveOrBetweenThreshold } =
    useDeviceContext();

  const isAboveSmall = isWindowWidthAboveOrBetweenThreshold(
    SCREEN_SIZES.MOBILE
  );

  const isMobile = !isAboveSmall;

  return (
    <Section id="introduction" height={isMobile ? windowHeight : undefined}>
      <SectionContent width={windowWidth - 200}>
        <IntroductionContent>
          <IntroParagraph>My name is, </IntroParagraph>
          <Heading>Logan Garay</Heading>
          <IntroHeading2>I am a Software Developer</IntroHeading2>
          <IntroParagraph>
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
