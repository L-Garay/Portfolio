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
  isAboveSmall?: boolean;
  isAboveMedium?: boolean;
  isAboveLarge?: boolean;
  shouldChangeFlexDirection?: boolean;
};

const SkillsContainer = styled.div<SkillsProps>`
  /* background: lightgrey; //testing */
  position: relative;
  margin-bottom: 10px;
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    right: 0;
    width: 25%;
    height: ${(props) => (props.shouldChangeFlexDirection ? '10%' : '25%')};
    border-right: 1px solid ${theme.colors.ORANGE_1}; // testing
    border-bottom: 1px solid ${theme.colors.ORANGE_1}; // testing
  }
`;

const Skills = () => {
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

  const flexWidthCutOff = SCREEN_SIZES.SMALL + 75;
  const shouldChangeFlexDirection = windowWidth < flexWidthCutOff;

  return (
    <Section id="skills" height={isMobile ? windowHeight : undefined}>
      <SectionContent isMobile={isMobile} calculatedWidth={calcluatedWidth}>
        <SkillsContainer shouldChangeFlexDirection={shouldChangeFlexDirection}>
          <SectionTitleContainer>
            <SectionTitle> 01. What I'm good at</SectionTitle>
          </SectionTitleContainer>

          <Qualities
            isAboveSmall={isAboveSmall}
            isAboveMedium={isAboveMedium}
            isAboveLarge={isAboveLarge}
            shouldChangeFlexDirection={shouldChangeFlexDirection}
          />
          <Languages
            isAboveSmall={isAboveSmall}
            isAboveMedium={isAboveMedium}
            isAboveLarge={isAboveLarge}
          />
        </SkillsContainer>
      </SectionContent>
    </Section>
  );
};

export default Skills;
