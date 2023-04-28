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

const ExperiencesContainer = styled.div<ExperiencesProps>`
  position: relative;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  /* TODO  move this to the section and then just adjust how far down and left/right it goes */
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 25%;
    height: ${(props) => (props.shouldChangeFlexDirection ? '10%' : '25%')};
    border-left: 1px solid ${theme.colors.ORANGE_1};
    border-bottom: 1px solid ${theme.colors.ORANGE_1};
  }
`;

const ExperiencesTitle = styled(SectionTitle)`
  text-align: end;
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
      <SectionContent isMobile={isMobile} calculatedWidth={calcluatedWidth}>
        <ExperiencesContainer
          shouldChangeFlexDirection={shouldChangeFlexDirection}
          calculatedWidth={calcluatedWidth}
        >
          <SectionTitleContainer>
            <ExperiencesTitle>02. My Experiences</ExperiencesTitle>
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
