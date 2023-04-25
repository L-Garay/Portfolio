import * as React from 'react';
import styled, { keyframes } from 'styled-components';
import { Section, SectionContent, SectionTitle } from '../components/sections';
import { useDeviceContext } from '../contexts/deviceContext';
import SCREEN_SIZES from '../constants/screenSizes';
import Marquee from '../components/Skills/marquee';

const SkillsContainer = styled.div`
  background: lightgrey; //testing
`;

const TitleContainer = styled.div`
  background: lightblue; //testing
`;

const QualitiesContainer = styled.div`
  background: lightpink; //testing
`;

const Skills = () => {
  const { windowWidth, windowHeight, isWindowWidthAboveOrBetweenThreshold } =
    useDeviceContext();

  const isAboveSmall = isWindowWidthAboveOrBetweenThreshold(
    SCREEN_SIZES.MOBILE
  );

  const isMobile = !isAboveSmall;

  const widthDeduction = isMobile ? 100 : 650; // the desktop value will need to change based on the screen size (650px is fine for large screens, but looks terrible on smaller screens)

  const calcluatedWidth = windowWidth - widthDeduction;
  const marqueeWidth = calcluatedWidth - 200;

  return (
    <Section id="skills" height={isMobile ? windowHeight : undefined}>
      <SectionContent isMobile={isMobile} calculatedWidth={calcluatedWidth}>
        <SkillsContainer>
          <TitleContainer>
            <SectionTitle>What I'm good at</SectionTitle>
          </TitleContainer>

          <QualitiesContainer>
            <p>qualities here</p>
          </QualitiesContainer>

          <Marquee isMobile={isMobile} marqueeWidth={marqueeWidth} />
        </SkillsContainer>
      </SectionContent>
    </Section>
  );
};

export default Skills;
