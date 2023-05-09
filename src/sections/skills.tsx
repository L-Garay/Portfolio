import * as React from 'react';
import styled from 'styled-components';
import {
  Section,
  SectionContent,
  SectionTitle,
  SectionTitleContainer,
} from '../components/sections';
import { useDeviceContext } from '../contexts/deviceContext';
import SCREEN_SIZES from '../constants/screenSizes';
import theme from '../styles/theme';
import { Languages, Qualities } from '../components/Skills/';

export type SkillsProps = {
  isAboveMobile?: boolean;
  isAboveMedium?: boolean;
  isAboveLarge?: boolean;
  shouldChangeFlexDirection?: boolean;
};

const BottomLeftBorder = styled.div`
  position: absolute;
  bottom: 2.5%;
  left: 7.5%;
  height: 50%;
  width: 1%;
  border-left: 1px solid ${theme.colors.ORANGE_1};
  z-index: -1;
`;

const TopRightBorder = styled.div`
  position: absolute;
  top: 2.5%;
  right: 7.5%;
  height: 50%;
  width: 1%;
  border-right: 1px solid ${theme.colors.ORANGE_1};
  z-index: -1;
`;

const SkillsContainer = styled.div<SkillsProps>`
  position: relative;
  margin-bottom: 10px;
`;

const Skills = () => {
  const { windowWidth, windowHeight, isWindowWidthAboveOrBetweenThreshold } =
    useDeviceContext();

  const isAboveMobile = isWindowWidthAboveOrBetweenThreshold(
    SCREEN_SIZES.MOBILE
  );
  const isAboveMedium = isWindowWidthAboveOrBetweenThreshold(
    SCREEN_SIZES.MEDIUM
  );
  const isAboveLarge = isWindowWidthAboveOrBetweenThreshold(SCREEN_SIZES.LARGE);

  const isMobile = !isAboveMobile;

  const widthDeduction = isAboveLarge ? 450 : isAboveMedium ? 300 : 200;

  const calcluatedWidth = windowWidth - widthDeduction;

  const flexWidthCutOff = SCREEN_SIZES.SMALL + 75;
  const shouldChangeFlexDirection = windowWidth < flexWidthCutOff;

  return (
    <Section id="skills" height={isMobile ? windowHeight : undefined}>
      <BottomLeftBorder />
      <TopRightBorder />
      <SectionContent isMobile={isMobile} calculatedWidth={calcluatedWidth}>
        <SkillsContainer shouldChangeFlexDirection={shouldChangeFlexDirection}>
          <SectionTitleContainer>
            <SectionTitle> 01. What I'm good at</SectionTitle>
          </SectionTitleContainer>

          <Qualities
            isAboveMobile={isAboveMobile}
            isAboveMedium={isAboveMedium}
            isAboveLarge={isAboveLarge}
            shouldChangeFlexDirection={shouldChangeFlexDirection}
          />
          <Languages
            isAboveMobile={isAboveMobile}
            isAboveMedium={isAboveMedium}
            isAboveLarge={isAboveLarge}
          />
        </SkillsContainer>
      </SectionContent>
    </Section>
  );
};

export default Skills;
