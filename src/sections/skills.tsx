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
import { InViewProps } from '../constants/sharedTypes';

export type SkillsProps = {
  isAboveMobile?: boolean;
  isAboveSmall?: boolean;
  isAboveMedium?: boolean;
  isAboveLarge?: boolean;
  shouldChangeFlexDirection?: boolean;
  inView?: boolean;
};

type BorderProps = {
  inView: boolean;
  isAbove925?: boolean;
  isAboveLarge?: boolean;
};

const BottomLeftBorder = styled.div<BorderProps>`
  position: absolute;
  bottom: 2.5%;
  left: 8.5%;
  z-index: -1;
  ${({ isAbove925 }) => {
    if (isAbove925) {
      return `
      height: 45%;
      width: 1%;
      border-left: 1px solid ${theme.colors.ORANGE_1};
      `;
    } else {
      return `
        height: 0;
        width: 0;
        border: none;
      `;
    }
  }}
  ${({ inView }) => {
    if (inView) {
      return `
        opacity: 1;
        transform: translateY(0);
      `;
    } else {
      return `
        opacity: 0;
        transform: translateY(50px);
      `;
    }
  }}
  transition: opacity 0.75s linear 0.25s, transform 0.75s linear 0.25s;
`;

const TopRightBorder = styled.div<BorderProps>`
  position: absolute;
  top: 2.5%;
  height: 45%;
  width: 1%;
  border-right: 1px solid ${theme.colors.ORANGE_1};
  z-index: -1;
  ${({ isAbove925, isAboveLarge }) => {
    if (isAboveLarge) {
      return `
        right: 8.5%;
      `;
    } else if (isAbove925) {
      return `
        right: 9.5%;
      `;
    } else {
      return `
        height: 0;
        width: 0;
        border: none;
      `;
    }
  }}
  ${({ inView }) => {
    if (inView) {
      return `
        opacity: 1;
        transform: translateY(0);
      `;
    } else {
      return `
        opacity: 0;
        transform: translateY(-50px);
      `;
    }
  }}
  transition: opacity 0.75s linear 0.25s, transform 0.75s linear 0.25s;
`;

const SkillsContainer = styled.div<SkillsProps>`
  position: relative;
  margin-bottom: 10px;
`;

const StyledSectionTitle = styled(SectionTitle)<InViewProps>`
  ${({ inView }) => {
    if (inView) {
      return `
        opacity: 1;
        transform: translateX(0);
      `;
    } else {
      return `
        opacity: 0;
        transform: translateX(-50px);
      `;
    }
  }};
  transition: all 0.5s linear 0.25s;
`;

const Skills = React.forwardRef<HTMLDivElement, InViewProps>(
  ({ inView }, ref) => {
    const { windowWidth, windowHeight, isWindowWidthAboveOrBetweenThreshold } =
      useDeviceContext();

    const isAboveMobile = isWindowWidthAboveOrBetweenThreshold(
      SCREEN_SIZES.MOBILE
    );
    const isAbove925 = isWindowWidthAboveOrBetweenThreshold(925);
    const isAboveMedium = isWindowWidthAboveOrBetweenThreshold(
      SCREEN_SIZES.MEDIUM
    );
    const isAboveLarge = isWindowWidthAboveOrBetweenThreshold(
      SCREEN_SIZES.LARGE
    );

    const isMobile = !isAboveMobile;

    const widthDeduction = isAboveLarge ? 450 : isAboveMedium ? 300 : 200;

    const calcluatedWidth = windowWidth - widthDeduction;

    const flexWidthCutOff = SCREEN_SIZES.SMALL + 75;
    const shouldChangeFlexDirection = windowWidth < flexWidthCutOff;

    return (
      <Section
        id="skills"
        height={isMobile ? windowHeight : undefined}
        ref={ref}
      >
        <BottomLeftBorder
          inView={inView}
          isAbove925={isAbove925}
          isAboveLarge={isAboveLarge}
        />
        <TopRightBorder
          inView={inView}
          isAbove925={isAbove925}
          isAboveLarge={isAboveLarge}
        />
        <SectionContent isMobile={isMobile} calculatedWidth={calcluatedWidth}>
          <SkillsContainer
            shouldChangeFlexDirection={shouldChangeFlexDirection}
          >
            <SectionTitleContainer>
              <StyledSectionTitle inView={inView}>
                {' '}
                02. What I'm good at
              </StyledSectionTitle>
            </SectionTitleContainer>

            <Qualities
              isAboveMobile={isAboveMobile}
              isAboveMedium={isAboveMedium}
              isAboveLarge={isAboveLarge}
              shouldChangeFlexDirection={shouldChangeFlexDirection}
              inView={inView}
            />
            <Languages
              isAboveMobile={isAboveMobile}
              isAboveMedium={isAboveMedium}
              isAboveLarge={isAboveLarge}
              inView={inView}
            />
          </SkillsContainer>
        </SectionContent>
      </Section>
    );
  }
);

export default Skills;
