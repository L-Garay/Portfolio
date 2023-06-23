import * as React from 'react';
import styled from 'styled-components';
import {
  Section,
  SectionContent,
  SectionTitle,
  SectionTitleContainer
} from '../components/sections';
import { useDeviceContext } from '../contexts/deviceContext';
import SCREEN_SIZES from '../constants/screenSizes';
import theme from '../styles/theme';
import { InViewProps, SharedPageProps } from '../constants/sharedTypes';
import { Details, Menu } from '../components/Experiences/';
import { graphql, useStaticQuery } from 'gatsby';

export type ExperiencesProps = SharedPageProps & {
  calculatedWidth?: number;
};

type BorderProps = {
  inView: boolean;
  isAbove925?: boolean;
  isAboveMedium?: boolean;
  isAboveLarge?: boolean;
};

const BottomLeftBorder = styled.div<BorderProps>`
  position: absolute;
  bottom: 13.5%;
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
  }}
  transition: opacity 0.75s linear 0.25s, transform 0.75s linear 0.25s;
`;

const TopRightBorder = styled.div<BorderProps>`
  position: absolute;
  top: 5%;
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
        top: 7%;
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
  ${({ inView }) => {
    if (inView) {
      return `
        opacity: 1;
        transform: translateX(0);
      `;
    } else {
      return `
        opacity: 0;
        transform: translateX(50px);
      `;
    }
  }}
  transition: opacity 0.75s linear 0.25s, transform 0.75s linear 0.25s;
`;

const ExperiencesContainer = styled.div<ExperiencesProps>`
  position: relative;
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
`;

const StyledSectionTitle = styled(SectionTitle)<InViewProps>`
  text-align: start;
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
  transition: all 0.75s linear 0.25s;
`;

const ExperiencesWrapper = styled.div<ExperiencesProps & InViewProps>`
  display: flex;
  flex-direction: ${props => (props.isAboveSmall ? 'row' : 'column')};
  justify-content: end;
  max-width: 820px;
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
  transition: all 0.75s linear 0.25s;
`;

const Experience = React.forwardRef<HTMLDivElement, InViewProps>(
  ({ inView }, ref) => {
    const [currentButtonId, setCurrentButtonId] = React.useState<string>(
      'hinge-health-button'
    );
    const { windowWidth, windowHeight, isWindowWidthAboveOrBetweenThreshold } =
      useDeviceContext();

    const isAboveMobile = isWindowWidthAboveOrBetweenThreshold(
      SCREEN_SIZES.MOBILE
    );
    const isAboveSmall = isWindowWidthAboveOrBetweenThreshold(
      SCREEN_SIZES.SMALL
    );
    const isAbove925 = isWindowWidthAboveOrBetweenThreshold(925);
    const isAboveMedium = isWindowWidthAboveOrBetweenThreshold(
      SCREEN_SIZES.MEDIUM
    );
    const isAboveLarge = isWindowWidthAboveOrBetweenThreshold(
      SCREEN_SIZES.LARGE
    );

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

    const contentfulSectionTitles = graphql`
      query {
        contentfulSectionTitles(shortTitle: { eq: "Experiences" }) {
          id
          longTitle
          number
        }
      }
    `;

    const { contentfulSectionTitles: contentfulContent } = useStaticQuery(
      contentfulSectionTitles
    );

    return (
      <Section
        id="experiences"
        height={isMobile ? windowHeight : undefined}
        marginTop={isAboveSmall ? 225 : 0}
        ref={ref}
      >
        <BottomLeftBorder
          inView={inView}
          isAbove925={isAbove925}
          isAboveMedium={isAboveMedium}
          isAboveLarge={isAboveLarge}
        />
        <TopRightBorder
          inView={inView}
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
              <StyledSectionTitle inView={inView}>
                {contentfulContent.number} {contentfulContent.longTitle}
              </StyledSectionTitle>
            </SectionTitleContainer>

            <ExperiencesWrapper isAboveSmall={isAboveSmall} inView={inView}>
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
  }
);

export default Experience;
