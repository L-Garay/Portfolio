import * as React from 'react';
import styled from 'styled-components';
import { Section, SectionContent } from '../components/shared/sections';
import { useDeviceContext } from '../contexts/deviceContext';
import SCREEN_SIZES from '../constants/screenSizes';

const Skills = () => {
  const {
    windowWidth,
    windowHeight,
    isMobile: isMobileDevice,
    useIsWindowWidthAboveOrBetweenThreshold,
  } = useDeviceContext();

  const isAboveSmall = useIsWindowWidthAboveOrBetweenThreshold(
    SCREEN_SIZES.SMALL
  );

  const isMobile = isMobileDevice && !isAboveSmall;

  return (
    <Section id="skills" height={isMobile ? windowHeight : undefined}>
      <SectionContent width={windowWidth - 200}>
        <h1 style={{ margin: 0 }}>skills section</h1>
      </SectionContent>
    </Section>
  );
};

export default Skills;
