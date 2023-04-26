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

const ExperiencesContainer = styled.div<SharedPageProps>`
  background: lightgrey; //testing
  position: relative;
  margin-bottom: 10px;
  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 25%;
    height: ${(props) => (props.shouldChangeFlexDirection ? '10%' : '25%')};
    border-left: 1px solid ${theme.colors.ORANGE_1}; // testing
    border-bottom: 1px solid ${theme.colors.ORANGE_1}; // testing
  }
`;

const ExperiencesWrapper = styled.div<SharedPageProps>`
  background: lightblue; // testing
  border: 1px solid black; // testing
  display: flex;
`;

const Menu = styled.div<SharedPageProps>`
  background: lightgreen; // testing
  /* border: 1px solid black; // testing */
  max-width: 25%; // need to set a width in either the wrapper or container
`;

const Details = styled.div<SharedPageProps>`
  background: lightpink; // testing
  max-width: 75%; // need to set a width in either the wrapper or container
`;

const Experience = () => {
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
    <Section id="experience" height={isMobile ? windowHeight : undefined}>
      <SectionContent isMobile={isMobile} calculatedWidth={calcluatedWidth}>
        <ExperiencesContainer
          shouldChangeFlexDirection={shouldChangeFlexDirection}
        >
          <SectionTitleContainer>
            <SectionTitle>02. My Experiences</SectionTitle>
          </SectionTitleContainer>

          <ExperiencesWrapper>
            <Menu>Menu</Menu>
            <Details>Details</Details>
          </ExperiencesWrapper>
        </ExperiencesContainer>
      </SectionContent>
    </Section>
  );
};

export default Experience;
