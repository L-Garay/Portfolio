import * as React from 'react';
import styled from 'styled-components';
import { Section, SectionContent } from '../components/sections';
import { useDeviceContext } from '../contexts/deviceContext';
import SCREEN_SIZES from '../constants/screenSizes';

const Skills = () => {
  const { windowWidth, windowHeight, isWindowWidthAboveOrBetweenThreshold } =
    useDeviceContext();

  const isAboveSmall = isWindowWidthAboveOrBetweenThreshold(
    SCREEN_SIZES.MOBILE
  );

  const isMobile = !isAboveSmall;

  return (
    <Section id="skills" height={isMobile ? windowHeight : undefined}>
      <SectionContent isMobile={isMobile} calculatedWidth={windowWidth - 200}>
        <h1 style={{ margin: 0 }}>skills section</h1>
      </SectionContent>
    </Section>
  );
};

export default Skills;
