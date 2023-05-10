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
import { SharedPageProps } from '../constants/sharedTypes';
import { Details, Menu } from '../components/Experiences/';

export type ExperiencesProps = SharedPageProps & {
  calculatedWidth?: number;
};

type BorderProps = {
  isAbove925?: boolean;
  isAboveMedium?: boolean;
  isAboveLarge?: boolean;
};

const BottomLeftBorder = styled.div<BorderProps>`
  position: absolute;
  bottom: 10%;
  left: 15%;
  border-left: 1px solid ${theme.colors.ORANGE_1};
  border-bottom: 1px solid ${theme.colors.ORANGE_1};
  z-index: -1;
  ${({ isAboveMedium, isAbove925, isAboveLarge }) => {
    if (isAboveLarge) {
      return `
        height: 35%;
        width: 25%;
      `;
    } else if (isAboveMedium) {
      return `
        height: 20%;
        width: 15%;
        bottom: 20%;
        left: 10%;
      `;
    } else if (isAbove925) {
      return `
        height: 20%;
        width: 15%;
        left: 7.5%;
        bottom: 15%;
      `;
    } else {
      return `
        height: 0;
        width: 0;
        border: none;
      `;
    }
  }}
`;

const TopRightBorder = styled.div<BorderProps>`
  position: absolute;
  top: 7.5%;
  right: 15%;
  border-right: 1px solid ${theme.colors.ORANGE_1};
  border-top: 1px solid ${theme.colors.ORANGE_1};
  z-index: -1;
  ${({ isAboveMedium, isAbove925, isAboveLarge }) => {
    if (isAboveLarge) {
      return `
        height: 35%;
        width: 25%;
      `;
    } else if (isAboveMedium) {
      return `
        height: 20%;
        width: 15%;
        top: 10%;
        right: 10%;
      `;
    } else if (isAbove925) {
      return `
        height: 20%;
        width: 15%;
        right: 9%;
      `;
    } else {
      return `
        height: 0;
        width: 0;
        border: none;
      `;
    }
  }}
`;

const ExperiencesContainer = styled.div<ExperiencesProps>`
  position: relative;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
`;

const ExperiencesTitle = styled(SectionTitle)`
  text-align: start;
`;

const ExperiencesWrapper = styled.div<ExperiencesProps>`
  display: flex;
  flex-direction: ${(props) => (props.isAboveSmall ? 'row' : 'column')};
  justify-content: end;
  max-width: 820px;
  transition: all 0.2s linear;
`;

const Experience = () => {
  const [currentButtonId, setCurrentButtonId] = React.useState<string>(
    'hinge-health-button'
  );
  const { windowWidth, windowHeight, isWindowWidthAboveOrBetweenThreshold } =
    useDeviceContext();

  const isAboveMobile = isWindowWidthAboveOrBetweenThreshold(
    SCREEN_SIZES.MOBILE
  );
  const isAboveSmall = isWindowWidthAboveOrBetweenThreshold(SCREEN_SIZES.SMALL);
  const isAbove925 = isWindowWidthAboveOrBetweenThreshold(925);
  const isAboveMedium = isWindowWidthAboveOrBetweenThreshold(
    SCREEN_SIZES.MEDIUM
  );
  const isAboveLarge = isWindowWidthAboveOrBetweenThreshold(SCREEN_SIZES.LARGE);

  const isMobile = !isAboveSmall;

  const widthDeduction = isAboveLarge
    ? 650
    : isAboveMedium
    ? 300
    : isAboveMobile
    ? 200
    : 100;

  const calcluatedWidth = windowWidth - widthDeduction;

  const flexWidthCutOff = SCREEN_SIZES.SMALL + 75;
  const shouldChangeFlexDirection = windowWidth < flexWidthCutOff;

  return (
    <Section id="experience" height={isMobile ? windowHeight : undefined}>
      <BottomLeftBorder
        isAbove925={isAbove925}
        isAboveMedium={isAboveMedium}
        isAboveLarge={isAboveLarge}
      />
      <TopRightBorder
        isAbove925={isAbove925}
        isAboveMedium={isAboveMedium}
        isAboveLarge={isAboveLarge}
      />
      <SectionContent isMobile={isMobile} calculatedWidth={calcluatedWidth}>
        <ExperiencesContainer
          shouldChangeFlexDirection={shouldChangeFlexDirection}
          calculatedWidth={calcluatedWidth}
        >
          <SectionTitleContainer>
            <ExperiencesTitle>03. My Experiences</ExperiencesTitle>
          </SectionTitleContainer>

          <ExperiencesWrapper isAboveSmall={isAboveSmall}>
            <Menu
              isAboveSmall={isAboveSmall}
              setCurrentButtonId={setCurrentButtonId}
              currentButtonId={currentButtonId}
            />
            <Details
              isAboveSmall={isAboveSmall}
              currentButtonId={currentButtonId}
            />
          </ExperiencesWrapper>
        </ExperiencesContainer>
      </SectionContent>
    </Section>
  );
};

export default Experience;
