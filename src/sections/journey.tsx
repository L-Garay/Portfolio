import * as React from 'react';
import styled from 'styled-components';
import { Section, SectionContent } from '../components/sections';
import { useDeviceContext } from '../contexts/deviceContext';
import SCREEN_SIZES from '../constants/screenSizes';

const Journey = () => {
  const {
    windowWidth,
    windowHeight,
    isMobileDevice,
    isWindowWidthAboveOrBetweenThreshold,
  } = useDeviceContext();

  const isAboveSmall = isWindowWidthAboveOrBetweenThreshold(SCREEN_SIZES.SMALL);

  const isMobile = isMobileDevice && !isAboveSmall;

  return (
    <Section id="journey" height={isMobile ? windowHeight : undefined}>
      <SectionContent width={windowWidth - 200}>
        <h1 style={{ margin: 0 }}>Journey section</h1>
      </SectionContent>
    </Section>
  );
};

export default Journey;
