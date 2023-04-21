import * as React from 'react';
import styled from 'styled-components';
import { Section, SectionContent } from '../components/shared/sections';
import { useWindowDimensions } from '../utils/hooks/useWindowDimensions';
import theme from '../styles/theme';
import { Heading2, Paragraph } from '../components/shared';

const IntroductionContent = styled.div`
  text-align: start;
`;

const Heading = styled.h1`
  margin: 0;
  font-size: 5rem;
  color: ${theme.colors.BLUE_1};
  font-family: ${theme.fonts.robotoMono};
`;

const IntroParagraph = styled(Paragraph)``;

const IntroHeading2 = styled(Heading2)`
  color: ${theme.colors.ORANGE_1};
`;

const Introduction = () => {
  const { windowWidth, windowHeight } = useWindowDimensions();

  return (
    <Section id="introduction" height={windowHeight}>
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
